import type { Method } from '../types';

export const clojureMethods: Method[] = [
  // ============================================================
  // Sequence Functions
  // ============================================================
  {
    name: 'map',
    category: 'Sequence Functions',
    syntax: '(map f coll)',
    description:
      'Returns a lazy sequence consisting of the result of applying f to each item in coll. When multiple collections are provided, f is applied to corresponding items from each collection.',
    arguments: [
      { name: 'f', type: 'IFn', description: 'Function to apply to each element' },
      { name: 'coll', type: 'Seqable', description: 'Collection to map over' },
      {
        name: 'colls',
        type: 'Seqable',
        description: 'Additional collections for multi-arity mapping',
        optional: true,
      },
    ],
    returns: { type: 'LazySeq', description: 'Lazy sequence of transformed values' },
    examples: [
      {
        code: '(map inc [1 2 3 4 5])',
        output: '(2 3 4 5 6)',
        explanation: 'Increments each element by 1',
      },
      {
        code: '(map + [1 2 3] [10 20 30])',
        output: '(11 22 33)',
        explanation: 'Adds corresponding elements from two collections',
      },
      {
        code: '(map #(str "Hello, " %) ["Alice" "Bob"])',
        output: '("Hello, Alice" "Hello, Bob")',
        explanation: 'Uses an anonymous function to transform strings',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n) when realized',
    relatedMethods: ['mapv', 'map-indexed', 'pmap', 'filter'],
    sinceVersion: '1.0',
    notes: [
      'Returns a lazy sequence; use mapv for an eager vector result.',
      'When given multiple collections, stops at the shortest one.',
    ],
  },
  {
    name: 'filter',
    category: 'Sequence Functions',
    syntax: '(filter pred coll)',
    description:
      'Returns a lazy sequence of the items in coll for which (pred item) returns a logically true value.',
    arguments: [
      { name: 'pred', type: 'IFn', description: 'Predicate function returning logical true/false' },
      { name: 'coll', type: 'Seqable', description: 'Collection to filter' },
    ],
    returns: { type: 'LazySeq', description: 'Lazy sequence of items satisfying the predicate' },
    examples: [
      {
        code: '(filter even? [1 2 3 4 5 6])',
        output: '(2 4 6)',
        explanation: 'Keeps only even numbers',
      },
      {
        code: '(filter #(> (count %) 3) ["hi" "hello" "hey" "world"])',
        output: '("hello" "world")',
        explanation: 'Keeps strings with more than 3 characters',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n) when realized',
    relatedMethods: ['filterv', 'remove', 'keep', 'take-while'],
    sinceVersion: '1.0',
    notes: [
      'Use filterv for an eager vector result.',
      'remove is the complement: it keeps items where pred returns false.',
    ],
  },
  {
    name: 'reduce',
    category: 'Sequence Functions',
    syntax: '(reduce f init coll)',
    description:
      'Reduces a collection to a single value by applying f, a function of two arguments, to an accumulator and each element. If init is not supplied, the first item of coll is used.',
    arguments: [
      {
        name: 'f',
        type: 'IFn',
        description: 'Reducing function of two arguments (accumulator, element)',
      },
      {
        name: 'init',
        type: 'any',
        description: 'Initial accumulator value',
        optional: true,
      },
      { name: 'coll', type: 'Seqable', description: 'Collection to reduce' },
    ],
    returns: { type: 'any', description: 'Accumulated result' },
    examples: [
      {
        code: '(reduce + [1 2 3 4 5])',
        output: '15',
        explanation: 'Sums all numbers without an initial value',
      },
      {
        code: '(reduce + 10 [1 2 3 4 5])',
        output: '25',
        explanation: 'Sums all numbers starting from 10',
      },
      {
        code: '(reduce conj [] #{1 2 3})',
        output: '[1 3 2]',
        explanation: 'Converts a set into a vector via reduce',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['reduce-kv', 'reductions', 'transduce'],
    sinceVersion: '1.0',
    notes: [
      'Use reduced to short-circuit a reduce early.',
      'reduce-kv is optimized for associative collections (maps, vectors).',
    ],
  },
  {
    name: 'first',
    category: 'Sequence Functions',
    syntax: '(first coll)',
    description: 'Returns the first item in the collection. If coll is nil or empty, returns nil.',
    arguments: [
      { name: 'coll', type: 'Seqable', description: 'Collection to take the first item from' },
    ],
    returns: { type: 'any', description: 'The first element, or nil' },
    examples: [
      { code: '(first [1 2 3])', output: '1' },
      { code: '(first "hello")', output: '\\h', explanation: 'Returns the first character' },
      { code: '(first [])', output: 'nil', explanation: 'Returns nil for empty collections' },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['rest', 'second', 'last', 'ffirst', 'nfirst'],
    sinceVersion: '1.0',
  },
  {
    name: 'rest',
    category: 'Sequence Functions',
    syntax: '(rest coll)',
    description:
      'Returns a possibly empty sequence of the items after the first. Returns an empty sequence (not nil) when there are no more items.',
    arguments: [{ name: 'coll', type: 'Seqable', description: 'Collection' }],
    returns: { type: 'ISeq', description: 'Sequence of remaining items' },
    examples: [
      { code: '(rest [1 2 3])', output: '(2 3)' },
      { code: '(rest [1])', output: '()', explanation: 'Returns empty sequence, not nil' },
      { code: '(rest nil)', output: '()' },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['first', 'next', 'butlast', 'nthrest'],
    sinceVersion: '1.0',
    notes: ['Unlike next, rest always returns a sequence (possibly empty), never nil.'],
  },
  {
    name: 'cons',
    category: 'Sequence Functions',
    syntax: '(cons x seq)',
    description: 'Returns a new seq where x is the first element and seq is the rest.',
    arguments: [
      { name: 'x', type: 'any', description: 'Element to prepend' },
      { name: 'seq', type: 'Seqable', description: 'Sequence to prepend to' },
    ],
    returns: { type: 'ISeq', description: 'New sequence with x at the front' },
    examples: [
      { code: '(cons 1 [2 3 4])', output: '(1 2 3 4)' },
      {
        code: '(cons 1 nil)',
        output: '(1)',
        explanation: 'Cons onto nil creates a single-element list',
      },
      {
        code: "(cons 0 '(1 2 3))",
        output: '(0 1 2 3)',
        explanation: 'Prepends to an existing list',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['conj', 'concat', 'list*'],
    sinceVersion: '1.0',
    notes: ['Always returns a seq, not a vector or other collection type.'],
  },
  {
    name: 'into',
    category: 'Sequence Functions',
    syntax: '(into to from)',
    description:
      'Returns a new collection consisting of to with all items from from conj-ed onto it. Supports an optional transducer.',
    arguments: [
      { name: 'to', type: 'Collection', description: 'Target collection' },
      {
        name: 'xform',
        type: 'Transducer',
        description: 'Optional transducer to apply',
        optional: true,
      },
      { name: 'from', type: 'Seqable', description: 'Source collection' },
    ],
    returns: { type: 'Collection', description: 'New collection with all items added' },
    examples: [
      {
        code: '(into [0] [1 2 3])',
        output: '[0 1 2 3]',
        explanation: 'Appends elements from second collection into the first',
      },
      {
        code: '(into {} [[:a 1] [:b 2]])',
        output: '{:a 1, :b 2}',
        explanation: 'Converts key-value pairs into a map',
      },
      {
        code: '(into #{} [1 1 2 2 3])',
        output: '#{1 2 3}',
        explanation: 'Converts a vector with duplicates into a set (print order may vary)',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['conj', 'reduce', 'concat'],
    sinceVersion: '1.0',
    notes: [
      'The type of the target collection determines the result type.',
      'Supports transducers for efficient transformation during transfer.',
    ],
  },

  // ============================================================
  // String Functions
  // ============================================================
  {
    name: 'clojure.string/split',
    category: 'String Functions',
    syntax: '(clojure.string/split s re)',
    description: 'Splits string s on a regular expression re. Returns a vector of strings.',
    arguments: [
      { name: 's', type: 'String', description: 'String to split' },
      { name: 're', type: 'Regex', description: 'Regular expression delimiter' },
      {
        name: 'limit',
        type: 'int',
        description: 'Maximum number of splits',
        optional: true,
      },
    ],
    returns: { type: 'Vector', description: 'Vector of substrings' },
    examples: [
      {
        code: '(clojure.string/split "hello world foo" #" ")',
        output: '["hello" "world" "foo"]',
      },
      {
        code: '(clojure.string/split "a,b,c,d" #"," 2)',
        output: '["a" "b,c,d"]',
        explanation: 'Limits to 2 splits',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['clojure.string/join', 'clojure.string/replace', 're-seq'],
    sinceVersion: '1.2',
    notes: ["Requires (require '[clojure.string :as str]) or full namespace."],
  },
  {
    name: 'clojure.string/join',
    category: 'String Functions',
    syntax: '(clojure.string/join separator coll)',
    description: 'Returns a string of all elements in coll, separated by an optional separator.',
    arguments: [
      {
        name: 'separator',
        type: 'String',
        description: 'Separator string placed between elements',
        optional: true,
      },
      { name: 'coll', type: 'Seqable', description: 'Collection of items to join' },
    ],
    returns: { type: 'String', description: 'Joined string' },
    examples: [
      {
        code: '(clojure.string/join ", " ["a" "b" "c"])',
        output: '"a, b, c"',
      },
      {
        code: '(clojure.string/join [1 2 3])',
        output: '"123"',
        explanation: 'Joins without separator',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['clojure.string/split', 'str', 'interpose'],
    sinceVersion: '1.2',
  },
  {
    name: 'clojure.string/trim',
    category: 'String Functions',
    syntax: '(clojure.string/trim s)',
    description: 'Removes leading and trailing whitespace from string s.',
    arguments: [{ name: 's', type: 'String', description: 'String to trim' }],
    returns: { type: 'String', description: 'Trimmed string' },
    examples: [
      { code: '(clojure.string/trim "  hello  ")', output: '"hello"' },
      {
        code: '(clojure.string/trim "\\n\\thello\\n")',
        output: '"hello"',
        explanation: 'Trims all whitespace characters including tabs and newlines',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['clojure.string/triml', 'clojure.string/trimr', 'clojure.string/trim-newline'],
    sinceVersion: '1.2',
  },
  {
    name: 'clojure.string/replace',
    category: 'String Functions',
    syntax: '(clojure.string/replace s match replacement)',
    description:
      'Replaces all instances of match with replacement in string s. Match can be a string or regex.',
    arguments: [
      { name: 's', type: 'String', description: 'Input string' },
      { name: 'match', type: 'String | Regex', description: 'Pattern to match' },
      {
        name: 'replacement',
        type: 'String | Function',
        description: 'Replacement string or function',
      },
    ],
    returns: { type: 'String', description: 'String with replacements applied' },
    examples: [
      {
        code: '(clojure.string/replace "hello world" "world" "clojure")',
        output: '"hello clojure"',
      },
      {
        code: '(clojure.string/replace "foo bar foo" #"foo" "baz")',
        output: '"baz bar baz"',
        explanation: 'Replaces all occurrences using regex',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['clojure.string/replace-first', 'clojure.string/split'],
    sinceVersion: '1.2',
  },

  // ============================================================
  // Map Functions
  // ============================================================
  {
    name: 'assoc',
    category: 'Map Functions',
    syntax: '(assoc map key val)',
    description:
      'Returns a new map with the given key-value pair(s) added or updated. When used with vectors, sets the value at the given index.',
    arguments: [
      { name: 'map', type: 'Associative', description: 'Map or vector to associate into' },
      { name: 'key', type: 'any', description: 'Key (or index for vectors)' },
      { name: 'val', type: 'any', description: 'Value to associate' },
    ],
    returns: { type: 'Associative', description: 'New collection with the association added' },
    examples: [
      {
        code: '(assoc {:a 1 :b 2} :c 3)',
        output: '{:a 1, :b 2, :c 3}',
        explanation: 'Adds a new key-value pair',
      },
      {
        code: '(assoc {:a 1} :a 99)',
        output: '{:a 99}',
        explanation: 'Updates an existing key',
      },
      {
        code: '(assoc [1 2 3] 1 :two)',
        output: '[1 :two 3]',
        explanation: 'Replaces value at index 1 in a vector',
      },
    ],
    timeComplexity: 'O(log32 n) for maps, O(1) amortized for vectors',
    spaceComplexity: 'O(log32 n)',
    relatedMethods: ['dissoc', 'assoc-in', 'update', 'merge'],
    sinceVersion: '1.0',
    notes: ['Does not mutate the original; returns a new persistent collection.'],
  },
  {
    name: 'dissoc',
    category: 'Map Functions',
    syntax: '(dissoc map key)',
    description:
      'Returns a new map without the entry for the given key(s). If the key is not present, returns the map unchanged.',
    arguments: [
      { name: 'map', type: 'Map', description: 'Map to dissociate from' },
      { name: 'key', type: 'any', description: 'Key(s) to remove' },
    ],
    returns: { type: 'Map', description: 'New map without the specified key(s)' },
    examples: [
      {
        code: '(dissoc {:a 1 :b 2 :c 3} :b)',
        output: '{:a 1, :c 3}',
      },
      {
        code: '(dissoc {:a 1 :b 2 :c 3} :b :c)',
        output: '{:a 1}',
        explanation: 'Removes multiple keys at once',
      },
    ],
    timeComplexity: 'O(log32 n)',
    spaceComplexity: 'O(log32 n)',
    relatedMethods: ['assoc', 'select-keys', 'dissoc-in'],
    sinceVersion: '1.0',
  },
  {
    name: 'get',
    category: 'Map Functions',
    syntax: '(get map key)',
    description:
      'Returns the value mapped to key in the associative collection. Returns not-found or nil if the key is not present.',
    arguments: [
      { name: 'map', type: 'Associative', description: 'Map, vector, set, or string to look up' },
      { name: 'key', type: 'any', description: 'Key to look up' },
      {
        name: 'not-found',
        type: 'any',
        description: 'Value to return if key is not found',
        optional: true,
        defaultValue: 'nil',
      },
    ],
    returns: { type: 'any', description: 'Value at key, or not-found/nil' },
    examples: [
      { code: '(get {:a 1 :b 2} :a)', output: '1' },
      {
        code: '(get {:a 1 :b 2} :c "default")',
        output: '"default"',
        explanation: 'Returns default when key not found',
      },
      {
        code: '(get [10 20 30] 1)',
        output: '20',
        explanation: 'Works on vectors with index as key',
      },
    ],
    timeComplexity: 'O(log32 n) for maps, O(1) for vectors',
    spaceComplexity: 'O(1)',
    relatedMethods: ['get-in', 'assoc', 'find', 'contains?'],
    sinceVersion: '1.0',
    notes: ['Keywords can also be used as functions: (:a {:a 1}) => 1.'],
  },
  {
    name: 'merge',
    category: 'Map Functions',
    syntax: '(merge & maps)',
    description:
      'Returns a map that consists of the rest of the maps conj-ed onto the first. If a key occurs in more than one map, the mapping from the latter map is used.',
    arguments: [{ name: 'maps', type: 'Map', description: 'One or more maps to merge together' }],
    returns: { type: 'Map', description: 'Merged map' },
    examples: [
      {
        code: '(merge {:a 1 :b 2} {:b 3 :c 4})',
        output: '{:a 1, :b 3, :c 4}',
        explanation: ':b from the second map overwrites the first',
      },
      {
        code: '(merge {:a 1} {:b 2} {:c 3})',
        output: '{:a 1, :b 2, :c 3}',
        explanation: 'Merges multiple maps',
      },
      {
        code: '(merge {:a 1} nil)',
        output: '{:a 1}',
        explanation: 'nil maps are ignored',
      },
    ],
    timeComplexity: 'O(n) where n is total entries across all maps',
    spaceComplexity: 'O(n)',
    relatedMethods: ['merge-with', 'assoc', 'into', 'conj'],
    sinceVersion: '1.0',
    notes: ['Use merge-with to control how duplicate keys are handled.'],
  },

  // ============================================================
  // Set Functions
  // ============================================================
  {
    name: 'conj',
    category: 'Set Functions',
    syntax: '(conj set x)',
    description:
      'Returns a new set with the element(s) added. conj is the primary way to add elements to any Clojure collection; for sets, duplicates are ignored.',
    arguments: [
      { name: 'set', type: 'Set', description: 'Set to add elements to' },
      { name: 'x', type: 'any', description: 'Element(s) to add' },
    ],
    returns: { type: 'Set', description: 'New set with elements added' },
    examples: [
      {
        code: '(conj #{1 2 3} 4)',
        output: '#{1 4 3 2}',
      },
      {
        code: '(conj #{1 2} 2 3)',
        output: '#{1 3 2}',
        explanation: 'Duplicate 2 is ignored, 3 is added',
      },
    ],
    timeComplexity: 'O(log32 n)',
    spaceComplexity: 'O(log32 n)',
    relatedMethods: ['disj', 'into', 'contains?'],
    sinceVersion: '1.0',
    notes: [
      'conj works on all collection types; behavior depends on the collection (appends to vectors, prepends to lists, adds to sets).',
    ],
  },
  {
    name: 'disj',
    category: 'Set Functions',
    syntax: '(disj set key)',
    description:
      'Returns a new set without the specified element(s). If the element is not present, returns the set unchanged.',
    arguments: [
      { name: 'set', type: 'Set', description: 'Set to remove elements from' },
      { name: 'key', type: 'any', description: 'Element(s) to remove' },
    ],
    returns: { type: 'Set', description: 'New set with elements removed' },
    examples: [
      {
        code: '(disj #{1 2 3} 2)',
        output: '#{1 3}',
      },
      {
        code: '(disj #{1 2 3} 2 3)',
        output: '#{1}',
        explanation: 'Removes multiple elements',
      },
      {
        code: '(disj #{1 2 3} 99)',
        output: '#{1 3 2}',
        explanation: 'No change when element is not in set',
      },
    ],
    timeComplexity: 'O(log32 n)',
    spaceComplexity: 'O(log32 n)',
    relatedMethods: ['conj', 'contains?', 'dissoc'],
    sinceVersion: '1.0',
  },
  {
    name: 'clojure.set/union',
    category: 'Set Functions',
    syntax: '(clojure.set/union s1 s2)',
    description:
      'Returns a set that is the union of the input sets: all elements from all sets combined.',
    arguments: [
      { name: 's1', type: 'Set', description: 'First set' },
      { name: 's2', type: 'Set', description: 'Second set' },
    ],
    returns: { type: 'Set', description: 'Union of all input sets' },
    examples: [
      {
        code: '(clojure.set/union #{1 2} #{2 3 4})',
        output: '#{1 4 3 2}',
      },
      {
        code: '(clojure.set/union #{:a :b} #{:b :c} #{:c :d})',
        output: '#{:c :b :d :a}',
        explanation: 'Unions multiple sets',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['clojure.set/intersection', 'clojure.set/difference', 'into'],
    sinceVersion: '1.0',
    notes: ["Requires (require '[clojure.set :as set])."],
  },

  // ============================================================
  // Higher-Order Functions
  // ============================================================
  {
    name: 'comp',
    category: 'Higher-Order Functions',
    syntax: '(comp f g)',
    description:
      'Takes a set of functions and returns a function that is the composition of those functions. The returned function takes a variable number of args, applies the rightmost function, then applies each remaining function to the result, right-to-left.',
    arguments: [
      { name: 'f', type: 'IFn', description: 'Outermost function' },
      { name: 'g', type: 'IFn', description: 'Inner function(s)' },
    ],
    returns: { type: 'IFn', description: 'Composed function' },
    examples: [
      {
        code: '((comp str inc) 1)',
        output: '"2"',
        explanation: 'First applies inc to 1 giving 2, then applies str giving "2"',
      },
      {
        code: '(map (comp keyword clojure.string/lower-case) ["FOO" "BAR"])',
        output: '(:foo :bar)',
        explanation: 'Composes lower-case and keyword conversion',
      },
    ],
    timeComplexity: 'O(k) where k is number of composed functions',
    spaceComplexity: 'O(1)',
    relatedMethods: ['partial', 'juxt', 'complement', 'identity'],
    sinceVersion: '1.0',
    notes: ['Functions are applied right-to-left: (comp f g h) means f(g(h(x))).'],
  },
  {
    name: 'partial',
    category: 'Higher-Order Functions',
    syntax: '(partial f arg1)',
    description:
      'Takes a function f and fewer than the normal arguments to f, and returns a function that takes the remaining arguments. When called, the returned function applies f to the original arguments followed by the new ones.',
    arguments: [
      { name: 'f', type: 'IFn', description: 'Function to partially apply' },
      { name: 'args', type: 'any', description: 'Arguments to partially apply' },
    ],
    returns: { type: 'IFn', description: 'Partially applied function' },
    examples: [
      {
        code: '(def add10 (partial + 10))\n(add10 5)',
        output: '15',
        explanation: 'Creates a function that adds 10 to its argument',
      },
      {
        code: '(map (partial * 2) [1 2 3 4])',
        output: '(2 4 6 8)',
        explanation: 'Partially applies * with 2, then maps over the collection',
      },
    ],
    timeComplexity: 'O(1) for creation',
    spaceComplexity: 'O(1)',
    relatedMethods: ['comp', 'juxt', 'apply', 'fnil'],
    sinceVersion: '1.0',
  },
  {
    name: 'juxt',
    category: 'Higher-Order Functions',
    syntax: '(juxt f g)',
    description:
      'Takes a set of functions and returns a function that is the juxtaposition of those functions. The returned function takes any number of args and returns a vector containing the result of applying each function to the args.',
    arguments: [
      { name: 'f', type: 'IFn', description: 'First function' },
      { name: 'g', type: 'IFn', description: 'Additional function(s)' },
    ],
    returns: { type: 'IFn', description: 'Function returning a vector of results' },
    examples: [
      {
        code: '((juxt :a :b) {:a 1 :b 2 :c 3})',
        output: '[1 2]',
        explanation: 'Extracts multiple values from a map at once',
      },
      {
        code: '((juxt inc dec str) 5)',
        output: '[6 4 "5"]',
        explanation: 'Applies three functions to the same value',
      },
      {
        code: '(map (juxt identity name) [:a :b :c])',
        output: '([:a "a"] [:b "b"] [:c "c"])',
        explanation: 'Maps a juxtaposed function over keywords',
      },
    ],
    timeComplexity: 'O(k) where k is number of functions',
    spaceComplexity: 'O(k)',
    relatedMethods: ['comp', 'partial', 'apply'],
    sinceVersion: '1.1',
    notes: ['Useful for extracting multiple fields from maps in one pass.'],
  },
  {
    name: 'apply',
    category: 'Higher-Order Functions',
    syntax: '(apply f args)',
    description:
      'Applies function f to the argument list formed by prepending any intervening arguments to args. The last argument must be a sequence.',
    arguments: [
      { name: 'f', type: 'IFn', description: 'Function to apply' },
      { name: 'args', type: 'Seqable', description: 'Arguments to spread into the function call' },
    ],
    returns: { type: 'any', description: 'Result of applying f to the arguments' },
    examples: [
      {
        code: '(apply + [1 2 3])',
        output: '6',
        explanation: 'Equivalent to (+ 1 2 3)',
      },
      {
        code: '(apply str ["hello" " " "world"])',
        output: '"hello world"',
        explanation: 'Spreads a vector of strings into str',
      },
      {
        code: '(apply max [3 1 4 1 5 9])',
        output: '9',
        explanation: 'Finds the maximum from a collection',
      },
    ],
    timeComplexity: 'O(n) for argument spreading',
    spaceComplexity: 'O(n)',
    relatedMethods: ['partial', 'comp', 'map'],
    sinceVersion: '1.0',
    notes: ['Essential for calling variadic functions with a collection of arguments.'],
  },

  // ============================================================
  // Predicate Functions
  // ============================================================
  {
    name: 'nil?',
    category: 'Predicate Functions',
    syntax: '(nil? x)',
    description: 'Returns true if x is nil, false otherwise.',
    arguments: [{ name: 'x', type: 'any', description: 'Value to test' }],
    returns: { type: 'boolean', description: 'true if x is nil' },
    examples: [
      { code: '(nil? nil)', output: 'true' },
      { code: '(nil? false)', output: 'false', explanation: 'false is not nil' },
      { code: '(nil? 0)', output: 'false' },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['some?', 'empty?', 'false?', 'true?'],
    sinceVersion: '1.0',
    notes: ['In Clojure, nil and false are the only falsy values.'],
  },
  {
    name: 'empty?',
    category: 'Predicate Functions',
    syntax: '(empty? coll)',
    description:
      'Returns true if coll has no items (its seq is nil). Works on collections, strings, and nil.',
    arguments: [{ name: 'coll', type: 'Seqable', description: 'Collection to test' }],
    returns: { type: 'boolean', description: 'true if the collection has no items' },
    examples: [
      { code: '(empty? [])', output: 'true' },
      { code: '(empty? [1 2 3])', output: 'false' },
      { code: '(empty? "")', output: 'true' },
      { code: '(empty? nil)', output: 'true' },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['seq', 'nil?', 'not-empty', 'count'],
    sinceVersion: '1.0',
    notes: [
      'Idiomatic Clojure often uses (seq coll) instead of (not (empty? coll)) for truthy checks.',
    ],
  },
  {
    name: 'every?',
    category: 'Predicate Functions',
    syntax: '(every? pred coll)',
    description: 'Returns true if (pred x) is logical true for every x in coll, else false.',
    arguments: [
      { name: 'pred', type: 'IFn', description: 'Predicate function' },
      { name: 'coll', type: 'Seqable', description: 'Collection to test' },
    ],
    returns: { type: 'boolean', description: 'true if all elements satisfy the predicate' },
    examples: [
      { code: '(every? even? [2 4 6])', output: 'true' },
      { code: '(every? even? [2 3 6])', output: 'false' },
      {
        code: '(every? string? ["a" "b" "c"])',
        output: 'true',
      },
      {
        code: '(every? pos? [])',
        output: 'true',
        explanation: 'Vacuously true for empty collections',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['some', 'not-any?', 'not-every?'],
    sinceVersion: '1.0',
    notes: ['Short-circuits on the first false result.'],
  },

  // ============================================================
  // Utility Functions
  // ============================================================
  {
    name: 'range',
    category: 'Utility Functions',
    syntax: '(range start end step)',
    description:
      'Returns a lazy sequence of numbers from start (inclusive) to end (exclusive), by step. With no arguments, returns an infinite sequence of natural numbers starting at 0.',
    arguments: [
      {
        name: 'start',
        type: 'Number',
        description: 'Start value (inclusive)',
        optional: true,
        defaultValue: '0',
      },
      { name: 'end', type: 'Number', description: 'End value (exclusive)', optional: true },
      {
        name: 'step',
        type: 'Number',
        description: 'Step increment',
        optional: true,
        defaultValue: '1',
      },
    ],
    returns: { type: 'LazySeq', description: 'Lazy sequence of numbers' },
    examples: [
      { code: '(range 5)', output: '(0 1 2 3 4)' },
      { code: '(range 2 8)', output: '(2 3 4 5 6 7)' },
      { code: '(range 0 10 3)', output: '(0 3 6 9)', explanation: 'Counts by 3' },
      {
        code: '(range 5 0 -1)',
        output: '(5 4 3 2 1)',
        explanation: 'Counts down with negative step',
      },
    ],
    timeComplexity: 'O(1) to create, O(n) to realize',
    spaceComplexity: 'O(n) when realized',
    relatedMethods: ['repeat', 'iterate', 'take', 'cycle'],
    sinceVersion: '1.0',
    notes: ['With no arguments, (range) produces an infinite lazy sequence.'],
  },
  {
    name: 'atom',
    category: 'Utility Functions',
    syntax: '(atom x)',
    description:
      'Creates and returns an Atom with an initial value of x. Atoms provide a way to manage shared, synchronous, independent state with atomic compare-and-set semantics.',
    arguments: [
      { name: 'x', type: 'any', description: 'Initial value of the atom' },
      {
        name: ':meta',
        type: 'Map',
        description: 'Optional metadata map',
        optional: true,
      },
      {
        name: ':validator',
        type: 'IFn',
        description: 'Optional validator function',
        optional: true,
      },
    ],
    returns: { type: 'Atom', description: 'A new Atom holding the value' },
    examples: [
      {
        code: '(def counter (atom 0))\n@counter',
        output: '0',
        explanation: 'Creates an atom and dereferences it with @',
      },
      {
        code: '(def state (atom {:count 0 :name "app"}))\n(:count @state)',
        output: '0',
        explanation: 'Atoms can hold any value, including maps',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['swap!', 'reset!', 'deref', 'add-watch'],
    sinceVersion: '1.0',
    notes: [
      'Atoms are the simplest Clojure reference type for managing mutable state.',
      'Use swap! to update and reset! to replace the value.',
    ],
  },
  {
    name: 'swap!',
    category: 'Utility Functions',
    syntax: '(swap! atom f args)',
    description:
      'Atomically swaps the value of atom to be (apply f current-value-of-atom args). Returns the new value. The function f should be free of side effects, as it may be called multiple times due to retries.',
    arguments: [
      { name: 'atom', type: 'Atom', description: 'Atom whose value to update' },
      { name: 'f', type: 'IFn', description: 'Function to apply to the current value' },
      {
        name: 'args',
        type: 'any',
        description: 'Additional arguments to pass to f',
        optional: true,
      },
    ],
    returns: { type: 'any', description: 'The new value of the atom' },
    examples: [
      {
        code: '(def counter (atom 0))\n(swap! counter inc)',
        output: '1',
        explanation: 'Atomically increments the counter',
      },
      {
        code: '(def state (atom {:count 0}))\n(swap! state update :count inc)',
        output: '{:count 1}',
        explanation: 'Updates a nested value in the atom',
      },
      {
        code: '(def items (atom []))\n(swap! items conj "hello")',
        output: '["hello"]',
        explanation: 'Appends an item to the atom holding a vector',
      },
    ],
    timeComplexity: 'O(1) amortized',
    spaceComplexity: 'O(1)',
    relatedMethods: ['atom', 'reset!', 'deref', 'compare-and-set!'],
    sinceVersion: '1.0',
    notes: [
      'f may be called multiple times due to compare-and-swap retries; keep it free of side effects.',
    ],
  },

  // ============================================================
  // Additional Sequence Functions
  // ============================================================
  {
    name: 'take',
    category: 'Sequence Functions',
    syntax: '(take n coll)',
    description:
      'Returns a lazy sequence of the first n items in coll, or all items if there are fewer than n.',
    arguments: [
      { name: 'n', type: 'int', description: 'Number of items to take' },
      { name: 'coll', type: 'Seqable', description: 'Collection to take from' },
    ],
    returns: { type: 'LazySeq', description: 'Lazy sequence of up to n items' },
    examples: [
      { code: '(take 3 [1 2 3 4 5])', output: '(1 2 3)' },
      {
        code: '(take 10 [1 2 3])',
        output: '(1 2 3)',
        explanation: 'Returns all items when n exceeds collection size',
      },
      {
        code: '(take 5 (range))',
        output: '(0 1 2 3 4)',
        explanation: 'Takes from an infinite lazy sequence',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n) when realized',
    relatedMethods: ['drop', 'take-while', 'take-nth', 'take-last'],
    sinceVersion: '1.0',
  },
  {
    name: 'sort',
    category: 'Sequence Functions',
    syntax: '(sort coll)',
    description:
      'Returns a sorted sequence of the items in coll. Uses natural ordering by default, or a custom comparator if provided.',
    arguments: [
      {
        name: 'comp',
        type: 'Comparator',
        description: 'Optional comparator function',
        optional: true,
      },
      { name: 'coll', type: 'Seqable', description: 'Collection to sort' },
    ],
    returns: { type: 'ISeq', description: 'Sorted sequence' },
    examples: [
      { code: '(sort [3 1 4 1 5 9 2 6])', output: '(1 1 2 3 4 5 6 9)' },
      {
        code: '(sort > [3 1 4 1 5 9 2 6])',
        output: '(9 6 5 4 3 2 1 1)',
        explanation: 'Sorts in descending order using > as comparator',
      },
      {
        code: '(sort-by count ["hello" "hi" "hey"])',
        output: '("hi" "hey" "hello")',
        explanation: 'sort-by sorts by a key function',
      },
    ],
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['sort-by', 'sorted-set', 'sorted-map', 'compare'],
    sinceVersion: '1.0',
    notes: ['sort is eager, not lazy. It realizes the entire collection.'],
  },

  // ============================================================
  // Additional Map Functions
  // ============================================================
  {
    name: 'update',
    category: 'Map Functions',
    syntax: '(update map key f args)',
    description:
      'Returns a new map with the value at key updated by applying function f to the old value and any additional args. If the key does not exist, f is applied to nil.',
    arguments: [
      { name: 'map', type: 'Map', description: 'Map to update' },
      { name: 'key', type: 'any', description: 'Key whose value to update' },
      { name: 'f', type: 'IFn', description: 'Function to apply to the current value' },
      { name: 'args', type: 'any', description: 'Additional arguments to f', optional: true },
    ],
    returns: { type: 'Map', description: 'New map with the updated value' },
    examples: [
      {
        code: '(update {:a 1 :b 2} :a inc)',
        output: '{:a 2, :b 2}',
        explanation: 'Increments the value at :a',
      },
      {
        code: '(update {:a 1} :a + 10)',
        output: '{:a 11}',
        explanation: 'Adds 10 to the value at :a',
      },
      {
        code: '(update {} :count (fnil inc 0))',
        output: '{:count 1}',
        explanation: 'Uses fnil to handle nil default when key is missing',
      },
    ],
    timeComplexity: 'O(log32 n)',
    spaceComplexity: 'O(log32 n)',
    relatedMethods: ['update-in', 'assoc', 'get', 'merge'],
    sinceVersion: '1.7',
  },

  // ============================================================
  // Additional Predicate Functions
  // ============================================================
  {
    name: 'some',
    category: 'Predicate Functions',
    syntax: '(some pred coll)',
    description:
      'Returns the first logical true value of (pred x) for any x in coll, else nil. Note: returns the value of (pred x), not x itself.',
    arguments: [
      { name: 'pred', type: 'IFn', description: 'Predicate or function to apply' },
      { name: 'coll', type: 'Seqable', description: 'Collection to search' },
    ],
    returns: { type: 'any', description: 'First truthy result of (pred x), or nil' },
    examples: [
      {
        code: '(some even? [1 3 5 6 7])',
        output: 'true',
        explanation: 'Returns true (the result of even? on 6)',
      },
      {
        code: '(some #{3 5} [1 2 3 4])',
        output: '3',
        explanation: 'Uses a set as a predicate to find the first matching element',
      },
      {
        code: '(some even? [1 3 5])',
        output: 'nil',
        explanation: 'Returns nil when no element satisfies the predicate',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['every?', 'not-any?', 'filter', 'first'],
    sinceVersion: '1.0',
    notes: [
      'Using a set as the predicate is idiomatic for checking membership.',
      'some is not a predicate itself: it returns the truthy value, not necessarily true/false.',
    ],
  },

  // ============================================================
  // Additional Higher-Order Functions
  // ============================================================
  {
    name: 'complement',
    category: 'Higher-Order Functions',
    syntax: '(complement f)',
    description:
      'Takes a function f and returns a function that takes the same arguments as f, has the same effects if any, and returns the opposite truth value.',
    arguments: [{ name: 'f', type: 'IFn', description: 'Function to negate' }],
    returns: { type: 'IFn', description: 'Function returning the logical complement of f' },
    examples: [
      {
        code: '(filter (complement nil?) [1 nil 2 nil 3])',
        output: '(1 2 3)',
        explanation: 'Filters out nil values using the complement of nil?',
      },
      {
        code: '(def odd? (complement even?))\n(odd? 3)',
        output: 'true',
      },
    ],
    timeComplexity: 'O(1) for creation',
    spaceComplexity: 'O(1)',
    relatedMethods: ['comp', 'partial', 'remove'],
    sinceVersion: '1.0',
    notes: ['remove is equivalent to (filter (complement pred) coll).'],
  },

  // ============================================================
  // Additional Utility Functions
  // ============================================================
  {
    name: 'let',
    category: 'Utility Functions',
    syntax: '(let [bindings] body)',
    description:
      'Evaluates the expressions in body with the local bindings established. Bindings are a vector of name-value pairs evaluated sequentially.',
    arguments: [
      {
        name: 'bindings',
        type: 'Vector',
        description: 'Vector of binding pairs [name1 val1 name2 val2 ...]',
      },
      { name: 'body', type: 'Expression', description: 'One or more expressions to evaluate' },
    ],
    returns: { type: 'any', description: 'Value of the last expression in body' },
    examples: [
      {
        code: '(let [x 5\n      y 10]\n  (+ x y))',
        output: '15',
        explanation: 'Binds x to 5 and y to 10, then adds them',
      },
      {
        code: '(let [name "World"]\n  (str "Hello, " name "!"))',
        output: '"Hello, World!"',
      },
      {
        code: '(let [[a b c] [1 2 3]]\n  (+ a b c))',
        output: '6',
        explanation: 'Destructuring binding unpacks a vector',
      },
    ],
    timeComplexity: 'N/A',
    spaceComplexity: 'N/A',
    relatedMethods: ['def', 'fn', 'loop', 'binding', 'if-let', 'when-let'],
    sinceVersion: '1.0',
    notes: [
      'Bindings are immutable within the let scope.',
      'Supports destructuring for maps and vectors.',
    ],
  },
  {
    name: 'loop/recur',
    category: 'Utility Functions',
    syntax: '(loop [bindings] body)',
    description:
      'Establishes local bindings and a recursion point. recur rebinds the loop variables and jumps back to the loop head, enabling efficient iteration without consuming stack.',
    arguments: [
      {
        name: 'bindings',
        type: 'Vector',
        description: 'Vector of binding pairs [name1 init1 name2 init2 ...]',
      },
      {
        name: 'body',
        type: 'Expression',
        description: 'Expressions that may include (recur new-bindings) to loop',
      },
    ],
    returns: { type: 'any', description: 'Value of the last expression when loop terminates' },
    examples: [
      {
        code: '(loop [i 0 acc 0]\n  (if (>= i 5)\n    acc\n    (recur (inc i) (+ acc i))))',
        output: '10',
        explanation: 'Sums 0+1+2+3+4 using loop/recur',
      },
      {
        code: '(loop [xs [1 2 3 4 5] result []]\n  (if (empty? xs)\n    result\n    (recur (rest xs) (conj result (* 2 (first xs))))))',
        output: '[2 4 6 8 10]',
        explanation: 'Doubles each element using explicit loop/recur',
      },
    ],
    timeComplexity: 'N/A (depends on loop body)',
    spaceComplexity: 'O(1) stack space due to tail-call optimization',
    relatedMethods: ['let', 'reduce', 'iterate', 'fn'],
    sinceVersion: '1.0',
    notes: [
      'recur must be in tail position.',
      'recur provides guaranteed constant-stack-space iteration.',
      'Prefer higher-order functions (map, reduce) when possible; use loop/recur for complex iteration logic.',
    ],
  },
];

export default clojureMethods;
