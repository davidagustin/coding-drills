import type { Method } from '../types';

export const swiftMethods: Method[] = [
  // ============================================================
  // Array Methods
  // ============================================================
  {
    name: 'append',
    category: 'Array Methods',
    syntax: 'array.append(newElement)',
    description:
      'Adds a new element to the end of the array. The array must be declared with var to allow mutation.',
    arguments: [
      {
        name: 'newElement',
        type: 'Element',
        description: 'The element to append to the array',
      },
    ],
    returns: { type: 'Void', description: 'Modifies the array in place' },
    examples: [
      {
        code: 'var numbers = [1, 2, 3]\nnumbers.append(4)',
        output: '[1, 2, 3, 4]',
        explanation: 'Appends 4 to the end of the array',
      },
    ],
    timeComplexity: 'O(1) amortized',
    spaceComplexity: 'O(1) amortized',
    relatedMethods: ['insert', 'append(contentsOf:)'],
    sinceVersion: 'Swift 1.0',
    notes: ['The array must be mutable (declared with var, not let).'],
  },
  {
    name: 'remove(at:)',
    category: 'Array Methods',
    syntax: 'array.remove(at: index)',
    description:
      'Removes and returns the element at the specified position. The index must be valid.',
    arguments: [
      {
        name: 'index',
        type: 'Int',
        description: 'The position of the element to remove',
      },
    ],
    returns: {
      type: 'Element',
      description: 'The removed element',
    },
    examples: [
      {
        code: 'var letters = ["a", "b", "c", "d"]\nlet removed = letters.remove(at: 1)',
        output: 'removed = "b", letters = ["a", "c", "d"]',
        explanation: 'Removes the element at index 1 and shifts remaining elements',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['removeAll', 'removeLast', 'removeFirst'],
    sinceVersion: 'Swift 1.0',
    notes: ['Triggers a runtime error if the index is out of range.'],
  },
  {
    name: 'contains',
    category: 'Array Methods',
    syntax: 'array.contains(element)',
    description:
      'Returns a Boolean value indicating whether the sequence contains the given element. The element type must conform to Equatable.',
    arguments: [
      {
        name: 'element',
        type: 'Element',
        description: 'The element to search for',
      },
    ],
    returns: {
      type: 'Bool',
      description: 'true if the element is found, false otherwise',
    },
    examples: [
      {
        code: 'let names = ["Alice", "Bob", "Charlie"]\nnames.contains("Bob")',
        output: 'true',
      },
      {
        code: 'let numbers = [1, 2, 3]\nnumbers.contains(5)',
        output: 'false',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['contains(where:)', 'firstIndex(of:)'],
    sinceVersion: 'Swift 1.0',
  },
  {
    name: 'sorted',
    category: 'Array Methods',
    syntax: 'array.sorted()',
    description:
      'Returns the elements of the sequence sorted in ascending order. The element type must conform to Comparable.',
    arguments: [],
    returns: {
      type: '[Element]',
      description: 'A sorted array of the elements',
    },
    examples: [
      {
        code: 'let numbers = [3, 1, 4, 1, 5]\nnumbers.sorted()',
        output: '[1, 1, 3, 4, 5]',
      },
      {
        code: 'let names = ["Charlie", "Alice", "Bob"]\nnames.sorted()',
        output: '["Alice", "Bob", "Charlie"]',
      },
    ],
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['sorted(by:)', 'sort'],
    sinceVersion: 'Swift 1.0',
    notes: [
      'Returns a new array; does not modify the original.',
      'Use sort() for in-place sorting on mutable arrays.',
    ],
  },
  {
    name: 'map',
    category: 'Array Methods',
    syntax: 'array.map { transform }',
    description:
      'Returns an array containing the results of mapping the given closure over the sequence elements.',
    arguments: [
      {
        name: 'transform',
        type: '(Element) throws -> T',
        description: 'A mapping closure that accepts an element and returns a transformed value',
      },
    ],
    returns: {
      type: '[T]',
      description: 'An array of transformed elements',
    },
    examples: [
      {
        code: 'let numbers = [1, 2, 3, 4]\nnumbers.map { $0 * 2 }',
        output: '[2, 4, 6, 8]',
      },
      {
        code: 'let names = ["alice", "bob"]\nnames.map { $0.uppercased() }',
        output: '["ALICE", "BOB"]',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['compactMap', 'flatMap', 'filter'],
    sinceVersion: 'Swift 1.0',
  },
  {
    name: 'filter',
    category: 'Array Methods',
    syntax: 'array.filter { condition }',
    description:
      'Returns an array containing only the elements of the sequence that satisfy the given predicate.',
    arguments: [
      {
        name: 'isIncluded',
        type: '(Element) throws -> Bool',
        description: 'A closure that returns true if the element should be included',
      },
    ],
    returns: {
      type: '[Element]',
      description: 'An array of elements that satisfy the predicate',
    },
    examples: [
      {
        code: 'let numbers = [1, 2, 3, 4, 5, 6]\nnumbers.filter { $0 % 2 == 0 }',
        output: '[2, 4, 6]',
      },
      {
        code: 'let words = ["hello", "hi", "world"]\nwords.filter { $0.count > 2 }',
        output: '["hello", "world"]',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['map', 'reduce', 'compactMap'],
    sinceVersion: 'Swift 1.0',
  },

  // ============================================================
  // String Methods
  // ============================================================
  {
    name: 'hasPrefix',
    category: 'String Methods',
    syntax: 'string.hasPrefix(prefix)',
    description:
      'Returns a Boolean value indicating whether the string begins with the specified prefix.',
    arguments: [
      {
        name: 'prefix',
        type: 'String',
        description: 'A possible prefix to test against the string',
      },
    ],
    returns: {
      type: 'Bool',
      description: 'true if the string begins with prefix, false otherwise',
    },
    examples: [
      {
        code: 'let filename = "document.pdf"\nfilename.hasPrefix("doc")',
        output: 'true',
      },
      {
        code: '"Hello, World!".hasPrefix("hello")',
        output: 'false',
        explanation: 'Comparison is case-sensitive',
      },
    ],
    timeComplexity: 'O(m) where m is the prefix length',
    spaceComplexity: 'O(1)',
    relatedMethods: ['hasSuffix', 'starts(with:)'],
    sinceVersion: 'Swift 1.0',
  },
  {
    name: 'hasSuffix',
    category: 'String Methods',
    syntax: 'string.hasSuffix(suffix)',
    description:
      'Returns a Boolean value indicating whether the string ends with the specified suffix.',
    arguments: [
      {
        name: 'suffix',
        type: 'String',
        description: 'A possible suffix to test against the string',
      },
    ],
    returns: {
      type: 'Bool',
      description: 'true if the string ends with suffix, false otherwise',
    },
    examples: [
      {
        code: 'let filename = "photo.jpg"\nfilename.hasSuffix(".jpg")',
        output: 'true',
      },
    ],
    timeComplexity: 'O(m) where m is the suffix length',
    spaceComplexity: 'O(1)',
    relatedMethods: ['hasPrefix'],
    sinceVersion: 'Swift 1.0',
  },
  {
    name: 'lowercased',
    category: 'String Methods',
    syntax: 'string.lowercased()',
    description: 'Returns a lowercase version of the string.',
    arguments: [],
    returns: {
      type: 'String',
      description: 'A lowercase copy of the string',
    },
    examples: [
      {
        code: '"HELLO World".lowercased()',
        output: '"hello world"',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['uppercased', 'capitalized'],
    sinceVersion: 'Swift 1.0',
  },
  {
    name: 'uppercased',
    category: 'String Methods',
    syntax: 'string.uppercased()',
    description: 'Returns an uppercase version of the string.',
    arguments: [],
    returns: {
      type: 'String',
      description: 'An uppercase copy of the string',
    },
    examples: [
      {
        code: '"hello world".uppercased()',
        output: '"HELLO WORLD"',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['lowercased', 'capitalized'],
    sinceVersion: 'Swift 1.0',
  },
  {
    name: 'split(separator:)',
    category: 'String Methods',
    syntax: 'string.split(separator: character)',
    description:
      'Returns the longest possible subsequences of the string split around the given separator.',
    arguments: [
      {
        name: 'separator',
        type: 'Character',
        description: 'The character to split on',
      },
      {
        name: 'maxSplits',
        type: 'Int',
        description: 'Maximum number of splits',
        optional: true,
        defaultValue: 'Int.max',
      },
      {
        name: 'omittingEmptySubsequences',
        type: 'Bool',
        description: 'Whether to omit empty subsequences',
        optional: true,
        defaultValue: 'true',
      },
    ],
    returns: {
      type: '[Substring]',
      description: 'An array of substrings',
    },
    examples: [
      {
        code: 'let line = "one,two,three"\nline.split(separator: ",")',
        output: '["one", "two", "three"]',
      },
      {
        code: '"a::b::c".split(separator: ":")',
        output: '["a", "b", "c"]',
        explanation: 'Empty subsequences are omitted by default',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['components(separatedBy:)', 'joined(separator:)'],
    sinceVersion: 'Swift 4.0',
  },

  // ============================================================
  // Dictionary Methods
  // ============================================================
  {
    name: 'updateValue(_:forKey:)',
    category: 'Dictionary Methods',
    syntax: 'dict.updateValue(value, forKey: key)',
    description:
      'Updates the value stored in the dictionary for the given key, or adds a new key-value pair if the key does not exist. Returns the old value if the key existed.',
    arguments: [
      {
        name: 'value',
        type: 'Value',
        description: 'The new value to associate with the key',
      },
      {
        name: 'key',
        type: 'Key',
        description: 'The key to update or insert',
      },
    ],
    returns: {
      type: 'Value?',
      description: 'The old value if the key existed, or nil if the key is new',
    },
    examples: [
      {
        code: 'var scores = ["Alice": 90, "Bob": 85]\nlet old = scores.updateValue(95, forKey: "Alice")',
        output: 'old = Optional(90), scores = ["Alice": 95, "Bob": 85]',
        explanation: 'Returns the previous value for "Alice"',
      },
      {
        code: 'var scores = ["Alice": 90]\nlet old = scores.updateValue(80, forKey: "Charlie")',
        output: 'old = nil, scores = ["Alice": 90, "Charlie": 80]',
        explanation: 'Returns nil because "Charlie" was not in the dictionary',
      },
    ],
    timeComplexity: 'O(1) average',
    spaceComplexity: 'O(1)',
    relatedMethods: ['removeValue(forKey:)', 'subscript'],
    sinceVersion: 'Swift 1.0',
  },
  {
    name: 'removeValue(forKey:)',
    category: 'Dictionary Methods',
    syntax: 'dict.removeValue(forKey: key)',
    description:
      'Removes the given key and its associated value from the dictionary. Returns the removed value, or nil if the key was not found.',
    arguments: [
      {
        name: 'key',
        type: 'Key',
        description: 'The key to remove along with its associated value',
      },
    ],
    returns: {
      type: 'Value?',
      description: 'The value that was removed, or nil if the key was not present',
    },
    examples: [
      {
        code: 'var scores = ["Alice": 90, "Bob": 85]\nlet removed = scores.removeValue(forKey: "Bob")',
        output: 'removed = Optional(85), scores = ["Alice": 90]',
      },
    ],
    timeComplexity: 'O(1) average',
    spaceComplexity: 'O(1)',
    relatedMethods: ['updateValue(_:forKey:)', 'removeAll'],
    sinceVersion: 'Swift 1.0',
  },
  {
    name: 'mapValues',
    category: 'Dictionary Methods',
    syntax: 'dict.mapValues { transform }',
    description:
      'Returns a new dictionary containing the keys of this dictionary with the values transformed by the given closure.',
    arguments: [
      {
        name: 'transform',
        type: '(Value) throws -> T',
        description: 'A closure that transforms a value',
      },
    ],
    returns: {
      type: '[Key: T]',
      description: 'A dictionary with the same keys and transformed values',
    },
    examples: [
      {
        code: 'let prices = ["apple": 1.0, "banana": 0.5]\nprices.mapValues { $0 * 1.1 }',
        output: '["apple": 1.1, "banana": 0.55]',
        explanation: 'Applies a 10% markup to all prices',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['map', 'filter', 'compactMapValues'],
    sinceVersion: 'Swift 4.0',
  },
  {
    name: 'merge(_:uniquingKeysWith:)',
    category: 'Dictionary Methods',
    syntax: 'dict.merge(other, uniquingKeysWith: combine)',
    description:
      'Merges the key-value pairs from another dictionary or sequence into this dictionary, using a combining closure for duplicate keys.',
    arguments: [
      {
        name: 'other',
        type: 'S',
        description: 'A sequence of key-value pairs to merge',
      },
      {
        name: 'combine',
        type: '(Value, Value) throws -> Value',
        description:
          'A closure that takes the current and new values for duplicate keys and returns the value to use',
      },
    ],
    returns: { type: 'Void', description: 'Modifies the dictionary in place' },
    examples: [
      {
        code: 'var dict = ["a": 1, "b": 2]\ndict.merge(["b": 3, "c": 4]) { current, _ in current }',
        output: '["a": 1, "b": 2, "c": 4]',
        explanation: 'Keeps existing value for key "b"',
      },
      {
        code: 'var dict = ["a": 1, "b": 2]\ndict.merge(["b": 3, "c": 4]) { _, new in new }',
        output: '["a": 1, "b": 3, "c": 4]',
        explanation: 'Uses new value for key "b"',
      },
    ],
    timeComplexity: 'O(m) where m is the number of elements in other',
    spaceComplexity: 'O(m)',
    relatedMethods: ['merging(_:uniquingKeysWith:)', 'updateValue(_:forKey:)'],
    sinceVersion: 'Swift 4.0',
  },

  // ============================================================
  // Set Methods
  // ============================================================
  {
    name: 'insert (Set)',
    category: 'Set Methods',
    syntax: 'set.insert(newMember)',
    description:
      'Inserts the given element into the set if it is not already present. Returns a tuple indicating whether the element was inserted and the element after insertion.',
    arguments: [
      {
        name: 'newMember',
        type: 'Element',
        description: 'An element to insert into the set',
      },
    ],
    returns: {
      type: '(inserted: Bool, memberAfterInsert: Element)',
      description:
        'A tuple with a Boolean indicating if insertion occurred and the member in the set',
    },
    examples: [
      {
        code: 'var colors: Set = ["red", "green", "blue"]\nlet result = colors.insert("yellow")',
        output: 'result = (inserted: true, memberAfterInsert: "yellow")',
      },
      {
        code: 'var colors: Set = ["red", "green"]\nlet result = colors.insert("red")',
        output: 'result = (inserted: false, memberAfterInsert: "red")',
        explanation: '"red" already exists, so inserted is false',
      },
    ],
    timeComplexity: 'O(1) average',
    spaceComplexity: 'O(1)',
    relatedMethods: ['remove (Set)', 'contains (Set)', 'update(with:)'],
    sinceVersion: 'Swift 1.0',
  },
  {
    name: 'union',
    category: 'Set Methods',
    syntax: 'setA.union(setB)',
    description: 'Returns a new set with the elements of both this set and the given sequence.',
    arguments: [
      {
        name: 'other',
        type: 'S',
        description: 'A sequence of elements, often another set',
      },
    ],
    returns: {
      type: 'Set<Element>',
      description: 'A new set with elements from both sets',
    },
    examples: [
      {
        code: 'let a: Set = [1, 2, 3]\nlet b: Set = [3, 4, 5]\na.union(b)',
        output: '[1, 2, 3, 4, 5]',
      },
    ],
    timeComplexity: 'O(m + n)',
    spaceComplexity: 'O(m + n)',
    relatedMethods: ['intersection', 'subtracting', 'symmetricDifference'],
    sinceVersion: 'Swift 1.0',
  },
  {
    name: 'intersection',
    category: 'Set Methods',
    syntax: 'setA.intersection(setB)',
    description:
      'Returns a new set with the elements that are common to both this set and the given sequence.',
    arguments: [
      {
        name: 'other',
        type: 'S',
        description: 'A sequence of elements, often another set',
      },
    ],
    returns: {
      type: 'Set<Element>',
      description: 'A new set with only elements present in both sets',
    },
    examples: [
      {
        code: 'let a: Set = [1, 2, 3, 4]\nlet b: Set = [2, 4, 6, 8]\na.intersection(b)',
        output: '[2, 4]',
      },
    ],
    timeComplexity: 'O(min(m, n))',
    spaceComplexity: 'O(min(m, n))',
    relatedMethods: ['union', 'subtracting', 'symmetricDifference'],
    sinceVersion: 'Swift 1.0',
  },

  // ============================================================
  // Optional Handling
  // ============================================================
  {
    name: 'Optional map',
    category: 'Optional Handling',
    syntax: 'optional.map { transform }',
    description:
      'Evaluates the given closure when this Optional instance is not nil, passing the unwrapped value as a parameter. Returns nil if the optional is nil.',
    arguments: [
      {
        name: 'transform',
        type: '(Wrapped) throws -> U',
        description: 'A closure that takes the unwrapped value',
      },
    ],
    returns: {
      type: 'U?',
      description: 'The result of the transform wrapped in an Optional, or nil',
    },
    examples: [
      {
        code: 'let number: Int? = 42\nnumber.map { $0 * 2 }',
        output: 'Optional(84)',
      },
      {
        code: 'let number: Int? = nil\nnumber.map { $0 * 2 }',
        output: 'nil',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Optional flatMap', 'nil coalescing (??)'],
    sinceVersion: 'Swift 1.0',
    notes: ['Useful for transforming an optional value without explicitly unwrapping it.'],
  },
  {
    name: 'Optional flatMap',
    category: 'Optional Handling',
    syntax: 'optional.flatMap { transform }',
    description:
      'Evaluates the given closure when this Optional instance is not nil, passing the unwrapped value as a parameter. Unlike map, the closure itself returns an Optional, and flatMap prevents double-wrapping.',
    arguments: [
      {
        name: 'transform',
        type: '(Wrapped) throws -> U?',
        description: 'A closure that takes the unwrapped value and returns an Optional',
      },
    ],
    returns: {
      type: 'U?',
      description: 'The result of the transform, or nil',
    },
    examples: [
      {
        code: 'let str: String? = "42"\nstr.flatMap { Int($0) }',
        output: 'Optional(42)',
        explanation: 'Int("42") returns Int?, flatMap avoids Optional(Optional(42))',
      },
      {
        code: 'let str: String? = "abc"\nstr.flatMap { Int($0) }',
        output: 'nil',
        explanation: 'Int("abc") returns nil, so the result is nil',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Optional map', 'nil coalescing (??)'],
    sinceVersion: 'Swift 1.0',
    notes: ['Prevents double Optional wrapping (Optional<Optional<T>>).'],
  },
  {
    name: 'nil coalescing (??)',
    category: 'Optional Handling',
    syntax: 'optional ?? defaultValue',
    description:
      'Returns the unwrapped value of the optional if it is not nil, otherwise returns the default value. The right-hand side is evaluated lazily.',
    arguments: [
      {
        name: 'optional',
        type: 'T?',
        description: 'The optional value to unwrap',
      },
      {
        name: 'defaultValue',
        type: 'T',
        description: 'The value to use when the optional is nil',
      },
    ],
    returns: {
      type: 'T',
      description: 'The unwrapped value or the default value',
    },
    examples: [
      {
        code: 'let name: String? = nil\nname ?? "Anonymous"',
        output: '"Anonymous"',
      },
      {
        code: 'let name: String? = "Alice"\nname ?? "Anonymous"',
        output: '"Alice"',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Optional map', 'Optional flatMap'],
    sinceVersion: 'Swift 1.0',
    notes: [
      'The default value uses @autoclosure so it is only evaluated when needed.',
      'Can be chained: a ?? b ?? c.',
    ],
  },
  {
    name: 'optional chaining',
    category: 'Optional Handling',
    syntax: 'optional?.property',
    description:
      'Queries and calls properties, methods, and subscripts on an optional that might currently be nil. If the optional contains a value, the call succeeds; if it is nil, the call returns nil.',
    arguments: [],
    returns: {
      type: 'T?',
      description: 'The result of the access wrapped in an Optional, or nil',
    },
    examples: [
      {
        code: 'let name: String? = "Swift"\nname?.count',
        output: 'Optional(5)',
      },
      {
        code: 'let name: String? = nil\nname?.count',
        output: 'nil',
      },
      {
        code: 'let scores: [String: [Int]]? = ["Alice": [90, 85]]\nscores?["Alice"]?.first',
        output: 'Optional(90)',
        explanation: 'Multiple optional chaining links can be combined',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['nil coalescing (??)', 'Optional map'],
    sinceVersion: 'Swift 1.0',
    notes: ['The result is always optional regardless of how many links are in the chain.'],
  },

  // ============================================================
  // Higher-Order Functions
  // ============================================================
  {
    name: 'forEach',
    category: 'Higher-Order Functions',
    syntax: 'sequence.forEach { body }',
    description:
      'Calls the given closure on each element in the sequence in the same order as a for-in loop.',
    arguments: [
      {
        name: 'body',
        type: '(Element) throws -> Void',
        description: 'A closure that takes an element of the sequence',
      },
    ],
    returns: { type: 'Void', description: 'No return value' },
    examples: [
      {
        code: '[1, 2, 3].forEach { print($0) }',
        output: '1\n2\n3',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['map', 'filter', 'enumerated'],
    sinceVersion: 'Swift 1.0',
    notes: [
      'Unlike a for-in loop, you cannot use break or continue inside forEach.',
      'Using return inside the closure only exits the closure, not the enclosing function.',
    ],
  },
  {
    name: 'first(where:)',
    category: 'Higher-Order Functions',
    syntax: 'sequence.first(where: predicate)',
    description: 'Returns the first element of the sequence that satisfies the given predicate.',
    arguments: [
      {
        name: 'predicate',
        type: '(Element) throws -> Bool',
        description: 'A closure that takes an element and returns a Boolean value',
      },
    ],
    returns: {
      type: 'Element?',
      description: 'The first element that satisfies the predicate, or nil',
    },
    examples: [
      {
        code: 'let numbers = [3, 7, 2, 9, 4]\nnumbers.first(where: { $0 > 5 })',
        output: 'Optional(7)',
      },
      {
        code: '[1, 2, 3].first(where: { $0 > 10 })',
        output: 'nil',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['contains(where:)', 'firstIndex(where:)', 'last(where:)'],
    sinceVersion: 'Swift 3.0',
  },
  {
    name: 'allSatisfy',
    category: 'Higher-Order Functions',
    syntax: 'sequence.allSatisfy { predicate }',
    description:
      'Returns a Boolean value indicating whether every element of the sequence satisfies the given predicate.',
    arguments: [
      {
        name: 'predicate',
        type: '(Element) throws -> Bool',
        description: 'A closure that takes an element and returns a Boolean',
      },
    ],
    returns: {
      type: 'Bool',
      description: 'true if all elements satisfy the predicate, false otherwise',
    },
    examples: [
      {
        code: 'let scores = [80, 90, 75, 95]\nscores.allSatisfy { $0 >= 70 }',
        output: 'true',
      },
      {
        code: 'let ages = [18, 22, 15, 30]\nages.allSatisfy { $0 >= 18 }',
        output: 'false',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['contains(where:)', 'first(where:)'],
    sinceVersion: 'Swift 4.2',
    notes: ['Returns true for an empty sequence.'],
  },
  {
    name: 'contains(where:)',
    category: 'Higher-Order Functions',
    syntax: 'sequence.contains(where: predicate)',
    description:
      'Returns a Boolean value indicating whether the sequence contains an element that satisfies the given predicate.',
    arguments: [
      {
        name: 'predicate',
        type: '(Element) throws -> Bool',
        description: 'A closure that takes an element and returns a Boolean',
      },
    ],
    returns: {
      type: 'Bool',
      description: 'true if any element satisfies the predicate',
    },
    examples: [
      {
        code: 'let expenses = [21.37, 55.21, 9.32]\nexpenses.contains(where: { $0 > 50 })',
        output: 'true',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['allSatisfy', 'first(where:)', 'contains'],
    sinceVersion: 'Swift 3.0',
    notes: ['Stops iterating as soon as a matching element is found.'],
  },

  // ============================================================
  // Additional Array/Sequence Methods
  // ============================================================
  {
    name: 'reduce',
    category: 'Array Methods',
    syntax: 'array.reduce(initialResult) { partialResult, element in ... }',
    description:
      'Returns the result of combining the elements of the sequence using the given closure, starting with an initial value.',
    arguments: [
      {
        name: 'initialResult',
        type: 'Result',
        description: 'The value to use as the initial accumulating value',
      },
      {
        name: 'nextPartialResult',
        type: '(Result, Element) throws -> Result',
        description: 'A closure that combines an accumulating value with an element',
      },
    ],
    returns: {
      type: 'Result',
      description: 'The final accumulated value',
    },
    examples: [
      {
        code: 'let numbers = [1, 2, 3, 4, 5]\nnumbers.reduce(0, +)',
        output: '15',
        explanation: 'Sums all elements starting from 0',
      },
      {
        code: 'let words = ["Hello", " ", "World"]\nwords.reduce("") { $0 + $1 }',
        output: '"Hello World"',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['map', 'filter', 'reduce(into:)'],
    sinceVersion: 'Swift 1.0',
  },
  {
    name: 'compactMap',
    category: 'Array Methods',
    syntax: 'array.compactMap { transform }',
    description:
      'Returns an array containing the non-nil results of calling the given transformation with each element of the sequence.',
    arguments: [
      {
        name: 'transform',
        type: '(Element) throws -> T?',
        description: 'A closure that accepts an element and returns an optional value',
      },
    ],
    returns: {
      type: '[T]',
      description: 'An array of non-nil transformed values',
    },
    examples: [
      {
        code: 'let strings = ["1", "two", "3", "four"]\nstrings.compactMap { Int($0) }',
        output: '[1, 3]',
        explanation: 'Only successfully parsed integers are included',
      },
      {
        code: 'let numbers: [Int?] = [1, nil, 3, nil, 5]\nnumbers.compactMap { $0 }',
        output: '[1, 3, 5]',
        explanation: 'Filters out nil values from an array of optionals',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['map', 'flatMap', 'filter'],
    sinceVersion: 'Swift 4.1',
    notes: ['Replaces the old flatMap behavior that filtered nil values.'],
  },
  {
    name: 'enumerated',
    category: 'Higher-Order Functions',
    syntax: 'sequence.enumerated()',
    description:
      'Returns a sequence of pairs (n, x), where n represents a consecutive integer starting at zero and x represents an element of the sequence.',
    arguments: [],
    returns: {
      type: 'EnumeratedSequence<Self>',
      description: 'A sequence of (offset, element) tuples',
    },
    examples: [
      {
        code: 'let names = ["Alice", "Bob", "Charlie"]\nfor (index, name) in names.enumerated() {\n    print("\\(index): \\(name)")\n}',
        output: '0: Alice\n1: Bob\n2: Charlie',
      },
      {
        code: 'Array(["a", "b", "c"].enumerated())',
        output: '[(0, "a"), (1, "b"), (2, "c")]',
      },
    ],
    timeComplexity: 'O(1) for creation, O(n) for iteration',
    spaceComplexity: 'O(1)',
    relatedMethods: ['forEach', 'map', 'zip'],
    sinceVersion: 'Swift 1.0',
    notes: [
      'The offset value is not necessarily the index in the collection; it is always a contiguous integer starting from 0.',
    ],
  },
  {
    name: 'min',
    category: 'Higher-Order Functions',
    syntax: 'sequence.min()',
    description:
      'Returns the minimum element in the sequence. The element type must conform to Comparable.',
    arguments: [],
    returns: {
      type: 'Element?',
      description: 'The minimum element, or nil if the sequence is empty',
    },
    examples: [
      {
        code: 'let numbers = [3, 1, 4, 1, 5, 9]\nnumbers.min()',
        output: 'Optional(1)',
      },
      {
        code: 'let empty: [Int] = []\nempty.min()',
        output: 'nil',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['max', 'min(by:)', 'sorted'],
    sinceVersion: 'Swift 1.0',
  },
  {
    name: 'max',
    category: 'Higher-Order Functions',
    syntax: 'sequence.max()',
    description:
      'Returns the maximum element in the sequence. The element type must conform to Comparable.',
    arguments: [],
    returns: {
      type: 'Element?',
      description: 'The maximum element, or nil if the sequence is empty',
    },
    examples: [
      {
        code: 'let numbers = [3, 1, 4, 1, 5, 9]\nnumbers.max()',
        output: 'Optional(9)',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['min', 'max(by:)', 'sorted'],
    sinceVersion: 'Swift 1.0',
  },
];

export default swiftMethods;
