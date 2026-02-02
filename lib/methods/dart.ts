import type { Method } from '../types';

export const dartMethods: Method[] = [
  // ============================================================
  // List Methods
  // ============================================================
  {
    name: 'add',
    category: 'List Methods',
    syntax: 'list.add(value)',
    description: 'Adds a value to the end of the list, extending the length by one.',
    arguments: [{ name: 'value', type: 'E', description: 'The element to add to the list' }],
    returns: { type: 'void', description: 'Nothing; the list is modified in place' },
    examples: [
      {
        code: "var fruits = ['apple', 'banana'];\nfruits.add('cherry');\nprint(fruits);",
        output: '[apple, banana, cherry]',
        explanation: 'The string "cherry" is appended to the end of the list.',
      },
      {
        code: 'var numbers = <int>[];\nnumbers.add(42);\nprint(numbers);',
        output: '[42]',
      },
    ],
    timeComplexity: 'O(1) amortized',
    spaceComplexity: 'O(1)',
    relatedMethods: ['addAll', 'insert', 'remove'],
    sinceVersion: '1.0',
    notes: ['Throws UnsupportedError if the list is fixed-length.'],
  },
  {
    name: 'remove',
    category: 'List Methods',
    syntax: 'list.remove(value)',
    description:
      'Removes the first occurrence of a value from the list. Returns true if the value was found and removed.',
    arguments: [
      { name: 'value', type: 'Object?', description: 'The value to remove from the list' },
    ],
    returns: {
      type: 'bool',
      description: 'true if the element was found and removed, false otherwise',
    },
    examples: [
      {
        code: "var colors = ['red', 'green', 'blue', 'green'];\nvar removed = colors.remove('green');\nprint(removed);\nprint(colors);",
        output: 'true\n[red, blue, green]',
        explanation: 'Only the first occurrence of "green" is removed.',
      },
      {
        code: 'var nums = [1, 2, 3];\nprint(nums.remove(5));',
        output: 'false',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['removeAt', 'removeWhere', 'add'],
    sinceVersion: '1.0',
  },
  {
    name: 'contains',
    category: 'List Methods',
    syntax: 'list.contains(element)',
    description: 'Returns true if the list contains an element equal to the given element.',
    arguments: [{ name: 'element', type: 'Object?', description: 'The element to search for' }],
    returns: { type: 'bool', description: 'true if the element is found in the list' },
    examples: [
      {
        code: "var items = ['dart', 'flutter', 'pub'];\nprint(items.contains('flutter'));",
        output: 'true',
      },
      {
        code: "print(['a', 'b', 'c'].contains('z'));",
        output: 'false',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['indexOf', 'any', 'where'],
    sinceVersion: '1.0',
  },
  {
    name: 'sort',
    category: 'List Methods',
    syntax: 'list.sort([int compare(E a, E b)?])',
    description:
      'Sorts the list in place according to the provided compare function, or using the natural Comparable ordering if none is supplied.',
    arguments: [
      {
        name: 'compare',
        type: 'int Function(E, E)?',
        description: 'An optional comparison function. Returns negative, zero, or positive.',
        optional: true,
      },
    ],
    returns: { type: 'void', description: 'Nothing; the list is sorted in place' },
    examples: [
      {
        code: 'var nums = [3, 1, 4, 1, 5];\nnums.sort();\nprint(nums);',
        output: '[1, 1, 3, 4, 5]',
      },
      {
        code: 'var words = ["banana", "apple", "cherry"];\nwords.sort((a, b) => a.length.compareTo(b.length));\nprint(words);',
        output: '[apple, banana, cherry]',
        explanation: 'Sorts strings by length using a custom comparator.',
      },
    ],
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['reversed', 'shuffle'],
    sinceVersion: '1.0',
    notes: ['The sort is not guaranteed to be stable.'],
  },
  {
    name: 'sublist',
    category: 'List Methods',
    syntax: 'list.sublist(start, [end])',
    description:
      'Returns a new list containing the elements from start (inclusive) to end (exclusive). If end is omitted, it defaults to the length of the list.',
    arguments: [
      { name: 'start', type: 'int', description: 'The starting index (inclusive)' },
      {
        name: 'end',
        type: 'int',
        description: 'The ending index (exclusive)',
        optional: true,
      },
    ],
    returns: {
      type: 'List<E>',
      description: 'A new list containing the specified range of elements',
    },
    examples: [
      {
        code: "var letters = ['a', 'b', 'c', 'd', 'e'];\nprint(letters.sublist(1, 4));",
        output: '[b, c, d]',
      },
      {
        code: "var letters = ['a', 'b', 'c', 'd', 'e'];\nprint(letters.sublist(2));",
        output: '[c, d, e]',
        explanation: 'When end is omitted, returns from start to the end of the list.',
      },
    ],
    timeComplexity: 'O(k) where k is the size of the sublist',
    spaceComplexity: 'O(k)',
    relatedMethods: ['getRange', 'take', 'skip'],
    sinceVersion: '1.0',
    notes: ['Throws RangeError if start or end are out of bounds.'],
  },
  {
    name: 'indexOf',
    category: 'List Methods',
    syntax: 'list.indexOf(element, [start])',
    description:
      'Returns the first index of the given element in the list, or -1 if the element is not found. Optionally starts searching from a given index.',
    arguments: [
      { name: 'element', type: 'E', description: 'The element to search for' },
      {
        name: 'start',
        type: 'int',
        description: 'The index to start searching from',
        optional: true,
        defaultValue: '0',
      },
    ],
    returns: {
      type: 'int',
      description: 'The index of the first occurrence, or -1 if not found',
    },
    examples: [
      {
        code: "var list = ['a', 'b', 'c', 'b'];\nprint(list.indexOf('b'));",
        output: '1',
      },
      {
        code: "var list = ['a', 'b', 'c', 'b'];\nprint(list.indexOf('b', 2));",
        output: '3',
        explanation: 'Starting the search from index 2 skips the first "b".',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['lastIndexOf', 'contains', 'firstWhere'],
    sinceVersion: '1.0',
  },

  // ============================================================
  // String Methods
  // ============================================================
  {
    name: 'split',
    category: 'String Methods',
    syntax: 'string.split(pattern)',
    description:
      'Splits the string at matches of the specified pattern and returns a list of substrings.',
    arguments: [
      {
        name: 'pattern',
        type: 'Pattern',
        description: 'The pattern (String or RegExp) to split on',
      },
    ],
    returns: {
      type: 'List<String>',
      description: 'A list of substrings',
    },
    examples: [
      {
        code: "var csv = 'one,two,three';\nprint(csv.split(','));",
        output: '[one, two, three]',
      },
      {
        code: "var sentence = 'hello world';\nprint(sentence.split(' '));",
        output: '[hello, world]',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['splitMapJoin', 'trim', 'replaceAll'],
    sinceVersion: '1.0',
  },
  {
    name: 'trim',
    category: 'String Methods',
    syntax: 'string.trim()',
    description: 'Returns a new string without any leading or trailing whitespace.',
    arguments: [],
    returns: {
      type: 'String',
      description: 'The string with leading and trailing whitespace removed',
    },
    examples: [
      {
        code: "var padded = '  hello  ';\nprint(padded.trim());",
        output: 'hello',
      },
      {
        code: "print('\\tflutter\\n'.trim());",
        output: 'flutter',
        explanation: 'Tabs, newlines, and other whitespace characters are removed.',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['trimLeft', 'trimRight'],
    sinceVersion: '1.0',
  },
  {
    name: 'replaceAll',
    category: 'String Methods',
    syntax: 'string.replaceAll(from, replace)',
    description: 'Replaces all occurrences of a pattern in the string with a replacement string.',
    arguments: [
      { name: 'from', type: 'Pattern', description: 'The pattern to match' },
      { name: 'replace', type: 'String', description: 'The replacement string' },
    ],
    returns: {
      type: 'String',
      description: 'A new string with all matches replaced',
    },
    examples: [
      {
        code: "var text = 'hello world hello';\nprint(text.replaceAll('hello', 'hi'));",
        output: 'hi world hi',
      },
      {
        code: "var messy = 'a--b--c';\nprint(messy.replaceAll('--', '-'));",
        output: 'a-b-c',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['replaceFirst', 'replaceAllMapped', 'split'],
    sinceVersion: '1.0',
  },
  {
    name: 'substring',
    category: 'String Methods',
    syntax: 'string.substring(start, [end])',
    description:
      'Returns the substring of this string from start (inclusive) to end (exclusive). If end is omitted, it goes to the end of the string.',
    arguments: [
      { name: 'start', type: 'int', description: 'The starting index (inclusive)' },
      {
        name: 'end',
        type: 'int',
        description: 'The ending index (exclusive)',
        optional: true,
      },
    ],
    returns: {
      type: 'String',
      description: 'The extracted substring',
    },
    examples: [
      {
        code: "var s = 'dartlang';\nprint(s.substring(0, 4));",
        output: 'dart',
      },
      {
        code: "var s = 'dartlang';\nprint(s.substring(4));",
        output: 'lang',
      },
    ],
    timeComplexity: 'O(k) where k is the length of the substring',
    spaceComplexity: 'O(k)',
    relatedMethods: ['split', 'indexOf', 'contains'],
    sinceVersion: '1.0',
    notes: ['Throws RangeError if start or end are out of bounds.'],
  },
  {
    name: 'startsWith',
    category: 'String Methods',
    syntax: 'string.startsWith(pattern, [index])',
    description:
      'Returns true if this string starts with the given pattern, optionally beginning the check at a specified index.',
    arguments: [
      { name: 'pattern', type: 'Pattern', description: 'The pattern to check for' },
      {
        name: 'index',
        type: 'int',
        description: 'Position to start checking from',
        optional: true,
        defaultValue: '0',
      },
    ],
    returns: {
      type: 'bool',
      description: 'true if the string starts with the pattern',
    },
    examples: [
      {
        code: "print('dartlang'.startsWith('dart'));",
        output: 'true',
      },
      {
        code: "print('dartlang'.startsWith('lang', 4));",
        output: 'true',
        explanation: 'When index is 4, "lang" starts at that position.',
      },
    ],
    timeComplexity: 'O(k) where k is the pattern length',
    spaceComplexity: 'O(1)',
    relatedMethods: ['endsWith', 'contains', 'indexOf'],
    sinceVersion: '1.0',
  },

  // ============================================================
  // Map Methods
  // ============================================================
  {
    name: 'putIfAbsent',
    category: 'Map Methods',
    syntax: 'map.putIfAbsent(key, () => value)',
    description:
      'Looks up the key in the map. If the key is not present, calls ifAbsent to compute a value and inserts it. Returns the existing or newly computed value.',
    arguments: [
      { name: 'key', type: 'K', description: 'The key to look up' },
      {
        name: 'ifAbsent',
        type: 'V Function()',
        description: 'A function that returns the value to insert if the key is absent',
      },
    ],
    returns: {
      type: 'V',
      description: 'The value associated with the key',
    },
    examples: [
      {
        code: "var scores = {'alice': 100};\nscores.putIfAbsent('bob', () => 0);\nprint(scores);",
        output: '{alice: 100, bob: 0}',
      },
      {
        code: "var scores = {'alice': 100};\nvar existing = scores.putIfAbsent('alice', () => 50);\nprint(existing);",
        output: '100',
        explanation:
          'Since "alice" already exists, the factory is not called and the existing value is returned.',
      },
    ],
    timeComplexity: 'O(1) average for HashMap',
    spaceComplexity: 'O(1)',
    relatedMethods: ['update', 'containsKey', 'remove'],
    sinceVersion: '1.0',
  },
  {
    name: 'containsKey',
    category: 'Map Methods',
    syntax: 'map.containsKey(key)',
    description: 'Returns true if the map contains the given key.',
    arguments: [{ name: 'key', type: 'Object?', description: 'The key to check for' }],
    returns: {
      type: 'bool',
      description: 'true if the key exists in the map',
    },
    examples: [
      {
        code: "var m = {'a': 1, 'b': 2};\nprint(m.containsKey('a'));",
        output: 'true',
      },
      {
        code: "var m = {'a': 1, 'b': 2};\nprint(m.containsKey('z'));",
        output: 'false',
      },
    ],
    timeComplexity: 'O(1) average for HashMap',
    spaceComplexity: 'O(1)',
    relatedMethods: ['containsValue', 'putIfAbsent', 'keys'],
    sinceVersion: '1.0',
  },
  {
    name: 'forEach',
    category: 'Map Methods',
    syntax: 'map.forEach((key, value) { ... })',
    description: 'Applies the given function to each key-value pair in the map.',
    arguments: [
      {
        name: 'action',
        type: 'void Function(K key, V value)',
        description: 'The function to apply to each key-value pair',
      },
    ],
    returns: {
      type: 'void',
      description: 'Nothing; the action is applied for its side effects',
    },
    examples: [
      {
        code: "var capitals = {'France': 'Paris', 'Japan': 'Tokyo'};\ncapitals.forEach((k, v) {\n  print('$k -> $v');\n});",
        output: 'France -> Paris\nJapan -> Tokyo',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['entries', 'keys', 'values', 'map'],
    sinceVersion: '1.0',
    notes: [
      'The iteration order depends on the map implementation (insertion-order for LinkedHashMap, the default).',
    ],
  },
  {
    name: 'update',
    category: 'Map Methods',
    syntax: 'map.update(key, (value) => newValue, {ifAbsent: () => value})',
    description:
      'Updates the value for the given key. Calls update with the existing value, or ifAbsent if the key does not exist.',
    arguments: [
      { name: 'key', type: 'K', description: 'The key to update' },
      {
        name: 'update',
        type: 'V Function(V)',
        description: 'A function that computes the new value from the existing value',
      },
      {
        name: 'ifAbsent',
        type: 'V Function()?',
        description: 'A function that computes the value when the key is absent',
        optional: true,
      },
    ],
    returns: {
      type: 'V',
      description: 'The new value associated with the key',
    },
    examples: [
      {
        code: "var wordCount = {'hello': 1};\nwordCount.update('hello', (v) => v + 1);\nprint(wordCount);",
        output: '{hello: 2}',
      },
      {
        code: "var wordCount = <String, int>{};\nwordCount.update('hello', (v) => v + 1, ifAbsent: () => 1);\nprint(wordCount);",
        output: '{hello: 1}',
        explanation: 'When the key does not exist, ifAbsent provides the initial value.',
      },
    ],
    timeComplexity: 'O(1) average for HashMap',
    spaceComplexity: 'O(1)',
    relatedMethods: ['putIfAbsent', 'containsKey', 'remove'],
    sinceVersion: '2.0',
  },

  // ============================================================
  // Set Methods
  // ============================================================
  {
    name: 'union',
    category: 'Set Methods',
    syntax: 'set.union(other)',
    description: 'Returns a new set containing all elements from this set and the other set.',
    arguments: [
      { name: 'other', type: 'Set<E>', description: 'The other set to form a union with' },
    ],
    returns: {
      type: 'Set<E>',
      description: 'A new set containing elements from both sets',
    },
    examples: [
      {
        code: 'var a = {1, 2, 3};\nvar b = {3, 4, 5};\nprint(a.union(b));',
        output: '{1, 2, 3, 4, 5}',
      },
    ],
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(n + m)',
    relatedMethods: ['intersection', 'difference', 'contains'],
    sinceVersion: '1.0',
  },
  {
    name: 'intersection',
    category: 'Set Methods',
    syntax: 'set.intersection(other)',
    description:
      'Returns a new set containing only the elements that are in both this set and the other set.',
    arguments: [
      { name: 'other', type: 'Set<Object?>', description: 'The other set to intersect with' },
    ],
    returns: {
      type: 'Set<E>',
      description: 'A new set with elements common to both sets',
    },
    examples: [
      {
        code: 'var a = {1, 2, 3, 4};\nvar b = {3, 4, 5, 6};\nprint(a.intersection(b));',
        output: '{3, 4}',
      },
      {
        code: 'var a = {1, 2};\nvar b = {3, 4};\nprint(a.intersection(b));',
        output: '{}',
        explanation: 'Disjoint sets produce an empty intersection.',
      },
    ],
    timeComplexity: 'O(min(n, m))',
    spaceComplexity: 'O(min(n, m))',
    relatedMethods: ['union', 'difference', 'contains'],
    sinceVersion: '1.0',
  },
  {
    name: 'difference',
    category: 'Set Methods',
    syntax: 'set.difference(other)',
    description: 'Returns a new set containing elements in this set that are not in the other set.',
    arguments: [{ name: 'other', type: 'Set<Object?>', description: 'The other set to subtract' }],
    returns: {
      type: 'Set<E>',
      description: 'A new set containing elements only in this set',
    },
    examples: [
      {
        code: 'var a = {1, 2, 3, 4};\nvar b = {3, 4, 5};\nprint(a.difference(b));',
        output: '{1, 2}',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['union', 'intersection', 'contains'],
    sinceVersion: '1.0',
  },

  // ============================================================
  // Iterable Methods
  // ============================================================
  {
    name: 'map',
    category: 'Iterable Methods',
    syntax: 'iterable.map<T>(T f(E element))',
    description:
      'Returns a new lazy iterable with elements that are created by calling the supplied function on each element of the original iterable.',
    arguments: [
      {
        name: 'f',
        type: 'T Function(E)',
        description: 'A function applied to each element',
      },
    ],
    returns: {
      type: 'Iterable<T>',
      description: 'A lazy iterable of transformed elements',
    },
    examples: [
      {
        code: 'var nums = [1, 2, 3];\nvar doubled = nums.map((n) => n * 2);\nprint(doubled.toList());',
        output: '[2, 4, 6]',
      },
      {
        code: "var names = ['alice', 'bob'];\nprint(names.map((n) => n.toUpperCase()).toList());",
        output: '[ALICE, BOB]',
      },
    ],
    timeComplexity: 'O(n) when iterated',
    spaceComplexity: 'O(1) lazy; O(n) if converted to list',
    relatedMethods: ['where', 'fold', 'expand', 'toList'],
    sinceVersion: '1.0',
    notes: ['Returns a lazy iterable; call .toList() to materialize the results.'],
  },
  {
    name: 'where',
    category: 'Iterable Methods',
    syntax: 'iterable.where(bool test(E element))',
    description: 'Returns a new lazy iterable with all elements that satisfy the given predicate.',
    arguments: [
      {
        name: 'test',
        type: 'bool Function(E)',
        description: 'A predicate function that returns true for elements to keep',
      },
    ],
    returns: {
      type: 'Iterable<E>',
      description: 'A lazy iterable of elements that satisfy the predicate',
    },
    examples: [
      {
        code: 'var nums = [1, 2, 3, 4, 5, 6];\nvar even = nums.where((n) => n.isEven);\nprint(even.toList());',
        output: '[2, 4, 6]',
      },
      {
        code: "var words = ['dart', 'go', 'rust', 'c'];\nprint(words.where((w) => w.length > 2).toList());",
        output: '[dart, rust]',
      },
    ],
    timeComplexity: 'O(n) when iterated',
    spaceComplexity: 'O(1) lazy; O(n) if converted to list',
    relatedMethods: ['map', 'firstWhere', 'any', 'every'],
    sinceVersion: '1.0',
    notes: ['Returns a lazy iterable; elements are tested only when iterated.'],
  },
  {
    name: 'fold',
    category: 'Iterable Methods',
    syntax: 'iterable.fold<T>(T initialValue, T combine(T previous, E element))',
    description:
      'Reduces a collection to a single value by iteratively combining each element with an existing accumulator value, starting with the provided initial value.',
    arguments: [
      { name: 'initialValue', type: 'T', description: 'The initial accumulator value' },
      {
        name: 'combine',
        type: 'T Function(T, E)',
        description: 'A function that combines the accumulator with the current element',
      },
    ],
    returns: {
      type: 'T',
      description: 'The final accumulated value',
    },
    examples: [
      {
        code: 'var nums = [1, 2, 3, 4];\nvar sum = nums.fold<int>(0, (prev, n) => prev + n);\nprint(sum);',
        output: '10',
      },
      {
        code: "var words = ['hello', 'world'];\nvar joined = words.fold<String>('', (prev, w) => prev.isEmpty ? w : '$prev $w');\nprint(joined);",
        output: 'hello world',
        explanation: 'Builds a space-separated string by folding over the list.',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['reduce', 'map', 'where'],
    sinceVersion: '1.0',
    notes: ['Unlike reduce, fold works on empty iterables because an initial value is provided.'],
  },
  {
    name: 'any',
    category: 'Iterable Methods',
    syntax: 'iterable.any(bool test(E element))',
    description:
      'Returns true if any element of the iterable satisfies the given predicate. Stops iterating as soon as a match is found.',
    arguments: [
      {
        name: 'test',
        type: 'bool Function(E)',
        description: 'A predicate function to test each element',
      },
    ],
    returns: {
      type: 'bool',
      description: 'true if at least one element satisfies the predicate',
    },
    examples: [
      {
        code: 'var nums = [1, 3, 5, 8];\nprint(nums.any((n) => n.isEven));',
        output: 'true',
      },
      {
        code: 'var nums = [1, 3, 5];\nprint(nums.any((n) => n > 10));',
        output: 'false',
      },
    ],
    timeComplexity: 'O(n) worst case',
    spaceComplexity: 'O(1)',
    relatedMethods: ['every', 'where', 'firstWhere', 'contains'],
    sinceVersion: '1.0',
  },
  {
    name: 'every',
    category: 'Iterable Methods',
    syntax: 'iterable.every(bool test(E element))',
    description:
      'Returns true if every element of the iterable satisfies the given predicate. Stops iterating as soon as a non-match is found.',
    arguments: [
      {
        name: 'test',
        type: 'bool Function(E)',
        description: 'A predicate function to test each element',
      },
    ],
    returns: {
      type: 'bool',
      description: 'true if all elements satisfy the predicate',
    },
    examples: [
      {
        code: 'var nums = [2, 4, 6];\nprint(nums.every((n) => n.isEven));',
        output: 'true',
      },
      {
        code: 'var nums = [2, 4, 5];\nprint(nums.every((n) => n.isEven));',
        output: 'false',
      },
    ],
    timeComplexity: 'O(n) worst case',
    spaceComplexity: 'O(1)',
    relatedMethods: ['any', 'where', 'firstWhere'],
    sinceVersion: '1.0',
    notes: ['Returns true for an empty iterable (vacuous truth).'],
  },

  // ============================================================
  // Type Conversion
  // ============================================================
  {
    name: 'int.parse',
    category: 'Type Conversion',
    syntax: 'int.parse(source, {int? radix})',
    description:
      'Parses a string as an integer literal and returns the integer value. Optionally accepts a radix for different number bases.',
    arguments: [
      { name: 'source', type: 'String', description: 'The string to parse' },
      {
        name: 'radix',
        type: 'int?',
        description: 'The base (radix) for parsing; defaults to 10',
        optional: true,
      },
    ],
    returns: {
      type: 'int',
      description: 'The parsed integer value',
    },
    examples: [
      {
        code: "var n = int.parse('42');\nprint(n);",
        output: '42',
      },
      {
        code: "var hex = int.parse('ff', radix: 16);\nprint(hex);",
        output: '255',
        explanation: 'Parses "ff" as a hexadecimal number.',
      },
    ],
    timeComplexity: 'O(n) where n is the string length',
    spaceComplexity: 'O(1)',
    relatedMethods: ['int.tryParse', 'double.parse', 'toString'],
    sinceVersion: '1.0',
    notes: [
      'Throws FormatException if the source is not a valid integer string. Use int.tryParse for a null-safe alternative.',
    ],
  },
  {
    name: 'double.parse',
    category: 'Type Conversion',
    syntax: 'double.parse(source)',
    description:
      'Parses a string as a double-precision floating-point literal and returns the value.',
    arguments: [{ name: 'source', type: 'String', description: 'The string to parse' }],
    returns: {
      type: 'double',
      description: 'The parsed double value',
    },
    examples: [
      {
        code: "var d = double.parse('3.14');\nprint(d);",
        output: '3.14',
      },
      {
        code: "var d = double.parse('1e10');\nprint(d);",
        output: '10000000000.0',
        explanation: 'Scientific notation is supported.',
      },
    ],
    timeComplexity: 'O(n) where n is the string length',
    spaceComplexity: 'O(1)',
    relatedMethods: ['double.tryParse', 'int.parse', 'toString'],
    sinceVersion: '1.0',
    notes: [
      'Throws FormatException if the source is not a valid double string. Use double.tryParse for a null-safe alternative.',
    ],
  },
  {
    name: 'toList',
    category: 'Type Conversion',
    syntax: 'iterable.toList({bool growable = true})',
    description:
      'Creates a List containing the elements of this iterable. The list is growable by default.',
    arguments: [
      {
        name: 'growable',
        type: 'bool',
        description: 'Whether the returned list should be growable',
        optional: true,
        defaultValue: 'true',
      },
    ],
    returns: {
      type: 'List<E>',
      description: 'A new list containing all elements of the iterable',
    },
    examples: [
      {
        code: 'var s = {3, 1, 2};\nvar list = s.toList();\nprint(list);',
        output: '[3, 1, 2]',
      },
      {
        code: 'var mapped = [1, 2, 3].map((n) => n * 10);\nprint(mapped.toList());',
        output: '[10, 20, 30]',
        explanation: 'Materializes a lazy iterable into a concrete list.',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['toSet', 'map', 'where'],
    sinceVersion: '1.0',
  },

  // ============================================================
  // Async
  // ============================================================
  {
    name: 'Future.then',
    category: 'Async',
    syntax: 'future.then<R>(FutureOr<R> onValue(T value), {Function? onError})',
    description:
      'Registers a callback to be called when the Future completes with a value. Returns a new Future that completes with the result of the callback.',
    arguments: [
      {
        name: 'onValue',
        type: 'FutureOr<R> Function(T)',
        description: 'Callback invoked with the value when the future completes successfully',
      },
      {
        name: 'onError',
        type: 'Function?',
        description: 'Optional callback invoked if the future completes with an error',
        optional: true,
      },
    ],
    returns: {
      type: 'Future<R>',
      description: 'A new Future that completes with the callback result',
    },
    examples: [
      {
        code: "Future.value(42).then((value) {\n  print('Got: $value');\n});",
        output: 'Got: 42',
      },
      {
        code: "Future.value('hello')\n  .then((s) => s.toUpperCase())\n  .then((s) => print(s));",
        output: 'HELLO',
        explanation: 'Chaining .then() transforms the value step by step.',
      },
    ],
    timeComplexity: 'O(1) for registration',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Future.catchError', 'Future.whenComplete', 'Future.wait'],
    sinceVersion: '1.0',
    notes: ['Prefer async/await for readability in most cases.'],
  },
  {
    name: 'Future.wait',
    category: 'Async',
    syntax: 'Future.wait<T>(Iterable<Future<T>> futures, {bool eagerError = false})',
    description:
      'Waits for all provided futures to complete and collects their values into a list. If any future completes with an error, the returned future completes with that error.',
    arguments: [
      {
        name: 'futures',
        type: 'Iterable<Future<T>>',
        description: 'The futures to wait for',
      },
      {
        name: 'eagerError',
        type: 'bool',
        description:
          'If true, completes with the first error immediately instead of waiting for all futures',
        optional: true,
        defaultValue: 'false',
      },
    ],
    returns: {
      type: 'Future<List<T>>',
      description: 'A future that completes with a list of all results',
    },
    examples: [
      {
        code: 'var f1 = Future.value(1);\nvar f2 = Future.value(2);\nvar f3 = Future.value(3);\nFuture.wait([f1, f2, f3]).then((values) {\n  print(values);\n});',
        output: '[1, 2, 3]',
      },
    ],
    timeComplexity: 'O(n) where n is the number of futures',
    spaceComplexity: 'O(n)',
    relatedMethods: ['Future.then', 'Future.any', 'Future.forEach'],
    sinceVersion: '1.0',
    notes: ['Useful for running multiple async operations in parallel.'],
  },
  {
    name: 'Stream.listen',
    category: 'Async',
    syntax:
      'stream.listen(void onData(T event)?, {Function? onError, void onDone()?, bool? cancelOnError})',
    description:
      'Adds a subscription to this stream. Each time a data event is received, the onData handler is called. Returns a StreamSubscription that can be used to cancel the subscription.',
    arguments: [
      {
        name: 'onData',
        type: 'void Function(T)?',
        description: 'Callback invoked on each data event',
      },
      {
        name: 'onError',
        type: 'Function?',
        description: 'Callback invoked on error events',
        optional: true,
      },
      {
        name: 'onDone',
        type: 'void Function()?',
        description: 'Callback invoked when the stream is closed',
        optional: true,
      },
      {
        name: 'cancelOnError',
        type: 'bool?',
        description: 'Whether to cancel the subscription on first error',
        optional: true,
      },
    ],
    returns: {
      type: 'StreamSubscription<T>',
      description: 'A subscription object that can be used to pause, resume, or cancel',
    },
    examples: [
      {
        code: 'var stream = Stream.fromIterable([1, 2, 3]);\nstream.listen((value) {\n  print(value);\n});',
        output: '1\n2\n3',
      },
      {
        code: "var stream = Stream.fromIterable(['a', 'b']);\nstream.listen(\n  (data) => print(data),\n  onDone: () => print('done'),\n);",
        output: 'a\nb\ndone',
        explanation: 'The onDone callback fires after all events have been delivered.',
      },
    ],
    timeComplexity: 'O(1) for subscription setup',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Stream.map', 'Stream.where', 'StreamController'],
    sinceVersion: '1.0',
    notes: [
      'Only one listener is allowed on a single-subscription stream.',
      'Use a broadcast stream for multiple listeners.',
    ],
  },
];

export default dartMethods;
