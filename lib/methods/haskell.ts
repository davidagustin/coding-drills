import type { Method } from '../types';

export const haskellMethods: Method[] = [
  // ============================================================
  // List Functions
  // ============================================================
  {
    name: 'map',
    category: 'List Functions',
    syntax: 'map :: (a -> b) -> [a] -> [b]',
    description:
      'Applies a function to every element of a list, returning a new list of the results.',
    arguments: [
      { name: 'f', type: '(a -> b)', description: 'Function to apply to each element' },
      { name: 'xs', type: '[a]', description: 'Input list' },
    ],
    returns: { type: '[b]', description: 'List with the function applied to each element' },
    examples: [
      {
        code: 'map (+1) [1, 2, 3]',
        output: '[2, 3, 4]',
        explanation: 'Adds 1 to each element in the list',
      },
      {
        code: 'map (*2) [10, 20, 30]',
        output: '[20, 40, 60]',
        explanation: 'Doubles each element',
      },
      {
        code: 'map toUpper "hello"',
        output: '"HELLO"',
        explanation: 'Strings are lists of Char, so map works on them directly',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['filter', 'fmap', 'concatMap'],
    notes: [
      'map is a specialization of fmap for lists.',
      'Lazily evaluated: elements are computed only when consumed.',
    ],
  },
  {
    name: 'filter',
    category: 'List Functions',
    syntax: 'filter :: (a -> Bool) -> [a] -> [a]',
    description: 'Returns a list of elements that satisfy the given predicate.',
    arguments: [
      { name: 'p', type: '(a -> Bool)', description: 'Predicate function' },
      { name: 'xs', type: '[a]', description: 'Input list' },
    ],
    returns: { type: '[a]', description: 'List of elements satisfying the predicate' },
    examples: [
      {
        code: 'filter even [1, 2, 3, 4, 5]',
        output: '[2, 4]',
        explanation: 'Keeps only even numbers',
      },
      {
        code: 'filter (> 3) [1, 2, 3, 4, 5]',
        output: '[4, 5]',
        explanation: 'Keeps elements greater than 3',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['map', 'partition', 'takeWhile'],
    notes: ['Lazily evaluated, so it works on infinite lists when combined with take or similar.'],
  },
  {
    name: 'foldl',
    category: 'List Functions',
    syntax: 'foldl :: (b -> a -> b) -> b -> [a] -> b',
    description:
      'Left-associative fold of a list. Reduces a list to a single value by applying a binary function from the left with an initial accumulator.',
    arguments: [
      {
        name: 'f',
        type: '(b -> a -> b)',
        description: 'Binary function taking accumulator and element',
      },
      { name: 'z', type: 'b', description: 'Initial accumulator value' },
      { name: 'xs', type: '[a]', description: 'Input list' },
    ],
    returns: { type: 'b', description: 'Final accumulated value' },
    examples: [
      {
        code: 'foldl (+) 0 [1, 2, 3, 4]',
        output: '10',
        explanation: 'Sums all elements: ((((0+1)+2)+3)+4)',
      },
      {
        code: 'foldl (\\acc x -> acc ++ [x]) [] [1, 2, 3]',
        output: '[1, 2, 3]',
        explanation: 'Builds a list from left to right',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['foldr', "foldl'", 'scanl'],
    notes: [
      "foldl is lazy in the accumulator, which can cause space leaks on large lists. Prefer foldl' (strict) from Data.List for most use cases.",
    ],
  },
  {
    name: 'foldr',
    category: 'List Functions',
    syntax: 'foldr :: (a -> b -> b) -> b -> [a] -> b',
    description:
      'Right-associative fold of a list. Reduces a list by applying a binary function from the right with an initial accumulator.',
    arguments: [
      {
        name: 'f',
        type: '(a -> b -> b)',
        description: 'Binary function taking element and accumulator',
      },
      { name: 'z', type: 'b', description: 'Initial accumulator value' },
      { name: 'xs', type: '[a]', description: 'Input list' },
    ],
    returns: { type: 'b', description: 'Final accumulated value' },
    examples: [
      {
        code: 'foldr (:) [] [1, 2, 3]',
        output: '[1, 2, 3]',
        explanation: 'Reconstructs the list using cons operator: 1:(2:(3:[]))',
      },
      {
        code: 'foldr (++) "" ["Hello", " ", "World"]',
        output: '"Hello World"',
        explanation: 'Concatenates strings from right to left',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['foldl', 'scanr', 'foldr1'],
    notes: [
      'foldr can work on infinite lists if the combining function is lazy in its second argument.',
      'Often more natural than foldl for building data structures.',
    ],
  },
  {
    name: 'head',
    category: 'List Functions',
    syntax: 'head :: [a] -> a',
    description: 'Returns the first element of a non-empty list. Throws an error on an empty list.',
    arguments: [{ name: 'xs', type: '[a]', description: 'Non-empty input list' }],
    returns: { type: 'a', description: 'The first element of the list' },
    examples: [
      { code: 'head [1, 2, 3]', output: '1' },
      { code: 'head "hello"', output: "'h'" },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['tail', 'last', 'init'],
    notes: [
      'Partial function: crashes on empty list. Use listToMaybe or pattern matching for safe access.',
    ],
  },
  {
    name: 'tail',
    category: 'List Functions',
    syntax: 'tail :: [a] -> [a]',
    description:
      'Returns all elements of a non-empty list except the first. Throws an error on an empty list.',
    arguments: [{ name: 'xs', type: '[a]', description: 'Non-empty input list' }],
    returns: { type: '[a]', description: 'The list without its first element' },
    examples: [
      { code: 'tail [1, 2, 3]', output: '[2, 3]' },
      { code: 'tail "hello"', output: '"ello"' },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['head', 'init', 'last', 'drop'],
    notes: [
      'Partial function: crashes on empty list. Use pattern matching or drop 1 for safe alternatives.',
    ],
  },
  {
    name: 'zip',
    category: 'List Functions',
    syntax: 'zip :: [a] -> [b] -> [(a, b)]',
    description:
      'Takes two lists and returns a list of pairs, pairing elements at the same position. Stops at the shorter list.',
    arguments: [
      { name: 'xs', type: '[a]', description: 'First input list' },
      { name: 'ys', type: '[b]', description: 'Second input list' },
    ],
    returns: { type: '[(a, b)]', description: 'List of pairs' },
    examples: [
      {
        code: 'zip [1, 2, 3] ["a", "b", "c"]',
        output: '[(1,"a"), (2,"b"), (3,"c")]',
      },
      {
        code: 'zip [1, 2] [10, 20, 30]',
        output: '[(1,10), (2,20)]',
        explanation: 'Truncates to the length of the shorter list',
      },
    ],
    timeComplexity: 'O(min(n, m))',
    spaceComplexity: 'O(min(n, m))',
    relatedMethods: ['unzip', 'zipWith', 'zip3'],
    notes: ['Commonly used with [0..] to add indices: zip [0..] xs'],
  },

  // ============================================================
  // String Functions
  // ============================================================
  {
    name: 'words',
    category: 'String Functions',
    syntax: 'words :: String -> [String]',
    description:
      'Splits a string into a list of words, delimited by whitespace. Consecutive whitespace is treated as a single delimiter.',
    arguments: [{ name: 's', type: 'String', description: 'Input string' }],
    returns: { type: '[String]', description: 'List of words' },
    examples: [
      { code: 'words "hello world"', output: '["hello","world"]' },
      {
        code: 'words "  foo   bar  "',
        output: '["foo","bar"]',
        explanation: 'Leading, trailing, and repeated whitespace is ignored',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['unwords', 'lines', 'unlines'],
  },
  {
    name: 'unwords',
    category: 'String Functions',
    syntax: 'unwords :: [String] -> String',
    description: 'Joins a list of words into a single string with spaces between them.',
    arguments: [{ name: 'ws', type: '[String]', description: 'List of words' }],
    returns: { type: 'String', description: 'Single string with words joined by spaces' },
    examples: [
      { code: 'unwords ["hello", "world"]', output: '"hello world"' },
      { code: 'unwords ["one"]', output: '"one"' },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['words', 'unlines', 'intercalate'],
  },
  {
    name: 'lines',
    category: 'String Functions',
    syntax: 'lines :: String -> [String]',
    description: 'Splits a string on newline characters, returning a list of lines.',
    arguments: [{ name: 's', type: 'String', description: 'Input string' }],
    returns: { type: '[String]', description: 'List of lines' },
    examples: [
      {
        code: 'lines "hello\\nworld"',
        output: '["hello","world"]',
      },
      {
        code: 'lines "one\\ntwo\\nthree"',
        output: '["one","two","three"]',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['unlines', 'words', 'unwords'],
  },
  {
    name: 'show',
    category: 'String Functions',
    syntax: 'show :: Show a => a -> String',
    description:
      'Converts a value to its String representation. The type must be an instance of the Show type class.',
    arguments: [
      { name: 'x', type: 'a', description: 'Value to convert (must have Show instance)' },
    ],
    returns: { type: 'String', description: 'String representation of the value' },
    examples: [
      { code: 'show 42', output: '"42"' },
      { code: 'show True', output: '"True"' },
      { code: 'show [1, 2, 3]', output: '"[1,2,3]"' },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['read', 'print'],
    notes: ['Part of the Show type class. Derivable automatically with deriving Show.'],
  },

  // ============================================================
  // Maybe/Either Functions
  // ============================================================
  {
    name: 'fromMaybe',
    category: 'Maybe/Either',
    syntax: 'fromMaybe :: a -> Maybe a -> a',
    description: 'Extracts the value from a Maybe, returning a default value if it is Nothing.',
    arguments: [
      { name: 'def', type: 'a', description: 'Default value to use if Nothing' },
      { name: 'mx', type: 'Maybe a', description: 'Maybe value to unwrap' },
    ],
    returns: { type: 'a', description: 'The contained value or the default' },
    examples: [
      { code: 'fromMaybe 0 (Just 5)', output: '5' },
      { code: 'fromMaybe 0 Nothing', output: '0' },
      {
        code: 'fromMaybe "unknown" (lookup "name" [("name","Alice")])',
        output: '"Alice"',
      },
    ],
    relatedMethods: ['maybe', 'isJust', 'isNothing'],
    sinceVersion: 'Data.Maybe',
    notes: ['Imported from Data.Maybe. A concise alternative to pattern matching on Maybe.'],
  },
  {
    name: 'isJust',
    category: 'Maybe/Either',
    syntax: 'isJust :: Maybe a -> Bool',
    description: 'Returns True if the Maybe value is Just, False if it is Nothing.',
    arguments: [{ name: 'mx', type: 'Maybe a', description: 'Maybe value to test' }],
    returns: { type: 'Bool', description: 'True if Just, False if Nothing' },
    examples: [
      { code: 'isJust (Just 3)', output: 'True' },
      { code: 'isJust Nothing', output: 'False' },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['isNothing', 'fromMaybe', 'maybe'],
    sinceVersion: 'Data.Maybe',
  },
  {
    name: 'isNothing',
    category: 'Maybe/Either',
    syntax: 'isNothing :: Maybe a -> Bool',
    description: 'Returns True if the Maybe value is Nothing, False if it is Just.',
    arguments: [{ name: 'mx', type: 'Maybe a', description: 'Maybe value to test' }],
    returns: { type: 'Bool', description: 'True if Nothing, False if Just' },
    examples: [
      { code: 'isNothing Nothing', output: 'True' },
      { code: 'isNothing (Just 3)', output: 'False' },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['isJust', 'fromMaybe', 'maybe'],
    sinceVersion: 'Data.Maybe',
  },
  {
    name: 'either',
    category: 'Maybe/Either',
    syntax: 'either :: (a -> c) -> (b -> c) -> Either a b -> c',
    description:
      'Case analysis on Either. Applies the first function to Left values and the second function to Right values.',
    arguments: [
      { name: 'f', type: '(a -> c)', description: 'Function to apply to Left values' },
      { name: 'g', type: '(b -> c)', description: 'Function to apply to Right values' },
      { name: 'e', type: 'Either a b', description: 'Either value to deconstruct' },
    ],
    returns: { type: 'c', description: 'Result of applying the matching function' },
    examples: [
      {
        code: 'either length (+1) (Left "hello")',
        output: '5',
        explanation: 'Applies length to the Left value "hello"',
      },
      {
        code: 'either length (+1) (Right 41)',
        output: '42',
        explanation: 'Applies (+1) to the Right value 41',
      },
    ],
    relatedMethods: ['fromMaybe', 'maybe'],
    notes: ['Defined in Data.Either. Equivalent to pattern matching on Left/Right constructors.'],
  },

  // ============================================================
  // Higher-Order Functions
  // ============================================================
  {
    name: '(.)',
    category: 'Higher-Order Functions',
    syntax: '(.) :: (b -> c) -> (a -> b) -> a -> c',
    description:
      'Function composition operator. Composes two functions so that (f . g) x equals f (g x).',
    arguments: [
      { name: 'f', type: '(b -> c)', description: 'Outer function' },
      { name: 'g', type: '(a -> b)', description: 'Inner function' },
    ],
    returns: { type: '(a -> c)', description: 'Composed function' },
    examples: [
      {
        code: '(negate . abs) (-5)',
        output: '-5',
        explanation: 'First applies abs, then negate: negate (abs (-5))',
      },
      {
        code: 'map (show . (+1)) [1, 2, 3]',
        output: '["2","3","4"]',
        explanation: 'Composes (+1) and show, then maps over the list',
      },
    ],
    relatedMethods: ['($)', 'id', 'flip'],
    notes: [
      'One of the most fundamental Haskell operators for building point-free (tacit) style.',
      '(.) is right-associative: f . g . h equals f . (g . h).',
    ],
  },
  {
    name: '($)',
    category: 'Higher-Order Functions',
    syntax: '($) :: (a -> b) -> a -> b',
    description:
      'Application operator. Applies a function to an argument. Has the lowest precedence and is right-associative, so it is commonly used to avoid parentheses.',
    arguments: [
      { name: 'f', type: '(a -> b)', description: 'Function to apply' },
      { name: 'x', type: 'a', description: 'Argument' },
    ],
    returns: { type: 'b', description: 'Result of applying f to x' },
    examples: [
      {
        code: 'show $ 1 + 2',
        output: '"3"',
        explanation: 'Equivalent to show (1 + 2), avoiding parentheses',
      },
      {
        code: 'map ($ 3) [(+1), (*2), (^2)]',
        output: '[4, 6, 9]',
        explanation: 'Applies each function in the list to 3',
      },
    ],
    relatedMethods: ['(.)', 'id'],
    notes: [
      '($) has fixity infixr 0, the lowest possible precedence.',
      'f $ g $ h x is equivalent to f (g (h x)).',
    ],
  },
  {
    name: 'flip',
    category: 'Higher-Order Functions',
    syntax: 'flip :: (a -> b -> c) -> b -> a -> c',
    description: 'Takes a binary function and returns a version with the argument order reversed.',
    arguments: [{ name: 'f', type: '(a -> b -> c)', description: 'Binary function to flip' }],
    returns: { type: '(b -> a -> c)', description: 'Function with swapped argument order' },
    examples: [
      {
        code: 'flip (++) "world" "hello "',
        output: '"hello world"',
        explanation: 'Flips (++) so the second argument comes first',
      },
      {
        code: 'flip const 1 2',
        output: '2',
        explanation: 'flip const ignores its first argument',
      },
    ],
    relatedMethods: ['(.)', 'const', 'id'],
  },
  {
    name: 'const',
    category: 'Higher-Order Functions',
    syntax: 'const :: a -> b -> a',
    description: 'Returns a function that always returns its first argument, ignoring the second.',
    arguments: [
      { name: 'x', type: 'a', description: 'Value to always return' },
      { name: '_', type: 'b', description: 'Ignored argument' },
    ],
    returns: { type: 'a', description: 'The first argument, unchanged' },
    examples: [
      { code: 'const 5 "anything"', output: '5' },
      {
        code: 'map (const 0) [1, 2, 3]',
        output: '[0, 0, 0]',
        explanation: 'Replaces every element with 0',
      },
    ],
    relatedMethods: ['id', 'flip'],
    notes: ['Useful as a combinator: const x is a function that always returns x.'],
  },

  // ============================================================
  // Tuple Functions
  // ============================================================
  {
    name: 'fst',
    category: 'Tuple Functions',
    syntax: 'fst :: (a, b) -> a',
    description: 'Extracts the first component of a pair (2-tuple).',
    arguments: [{ name: 'pair', type: '(a, b)', description: 'Input pair' }],
    returns: { type: 'a', description: 'The first element of the pair' },
    examples: [
      { code: 'fst (1, "hello")', output: '1' },
      {
        code: 'map fst [(1,"a"), (2,"b"), (3,"c")]',
        output: '[1, 2, 3]',
        explanation: 'Extracts first elements from a list of pairs',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['snd', 'swap'],
  },
  {
    name: 'snd',
    category: 'Tuple Functions',
    syntax: 'snd :: (a, b) -> b',
    description: 'Extracts the second component of a pair (2-tuple).',
    arguments: [{ name: 'pair', type: '(a, b)', description: 'Input pair' }],
    returns: { type: 'b', description: 'The second element of the pair' },
    examples: [
      { code: 'snd (1, "hello")', output: '"hello"' },
      {
        code: 'map snd [(1,"a"), (2,"b"), (3,"c")]',
        output: '["a", "b", "c"]',
        explanation: 'Extracts second elements from a list of pairs',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['fst', 'swap'],
  },
  {
    name: 'swap',
    category: 'Tuple Functions',
    syntax: 'swap :: (a, b) -> (b, a)',
    description: 'Swaps the components of a pair.',
    arguments: [{ name: 'pair', type: '(a, b)', description: 'Input pair' }],
    returns: { type: '(b, a)', description: 'Pair with elements swapped' },
    examples: [
      { code: 'swap (1, "hello")', output: '("hello", 1)' },
      { code: 'swap (True, False)', output: '(False, True)' },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['fst', 'snd'],
    sinceVersion: 'Data.Tuple',
    notes: ['Imported from Data.Tuple, not in Prelude.'],
  },

  // ============================================================
  // Type Class Functions
  // ============================================================
  {
    name: 'compare',
    category: 'Type Class Functions',
    syntax: 'compare :: Ord a => a -> a -> Ordering',
    description:
      'Compares two values and returns an Ordering (LT, EQ, or GT). Part of the Ord type class.',
    arguments: [
      { name: 'x', type: 'a', description: 'First value' },
      { name: 'y', type: 'a', description: 'Second value' },
    ],
    returns: { type: 'Ordering', description: 'LT if x < y, EQ if x == y, GT if x > y' },
    examples: [
      { code: 'compare 1 2', output: 'LT' },
      { code: 'compare 3 3', output: 'EQ' },
      { code: 'compare "b" "a"', output: 'GT' },
    ],
    timeComplexity: 'O(1) for primitives',
    relatedMethods: ['min', 'max'],
    notes: [
      'Part of the Ord type class. Derivable automatically with deriving Ord.',
      'Lists and tuples compare lexicographically.',
    ],
  },
  {
    name: 'min',
    category: 'Type Class Functions',
    syntax: 'min :: Ord a => a -> a -> a',
    description: 'Returns the smaller of two values. Part of the Ord type class.',
    arguments: [
      { name: 'x', type: 'a', description: 'First value' },
      { name: 'y', type: 'a', description: 'Second value' },
    ],
    returns: { type: 'a', description: 'The smaller value' },
    examples: [
      { code: 'min 3 7', output: '3' },
      { code: 'min "apple" "banana"', output: '"apple"' },
    ],
    timeComplexity: 'O(1) for primitives',
    relatedMethods: ['max', 'compare', 'minimum'],
  },
  {
    name: 'max',
    category: 'Type Class Functions',
    syntax: 'max :: Ord a => a -> a -> a',
    description: 'Returns the larger of two values. Part of the Ord type class.',
    arguments: [
      { name: 'x', type: 'a', description: 'First value' },
      { name: 'y', type: 'a', description: 'Second value' },
    ],
    returns: { type: 'a', description: 'The larger value' },
    examples: [
      { code: 'max 3 7', output: '7' },
      { code: 'max "apple" "banana"', output: '"banana"' },
    ],
    timeComplexity: 'O(1) for primitives',
    relatedMethods: ['min', 'compare', 'maximum'],
  },
  {
    name: 'succ',
    category: 'Type Class Functions',
    syntax: 'succ :: Enum a => a -> a',
    description:
      'Returns the successor of a value. Part of the Enum type class. Throws an error if there is no successor.',
    arguments: [{ name: 'x', type: 'a', description: 'Value to get successor of' }],
    returns: { type: 'a', description: 'The successor value' },
    examples: [
      { code: 'succ 5', output: '6' },
      { code: "succ 'a'", output: "'b'" },
      { code: 'succ LT', output: 'EQ' },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['pred', 'toEnum', 'fromEnum'],
    notes: ['Calling succ on maxBound for bounded types throws an error.'],
  },

  // ============================================================
  // I/O Functions
  // ============================================================
  {
    name: 'putStrLn',
    category: 'I/O Functions',
    syntax: 'putStrLn :: String -> IO ()',
    description: 'Writes a string to standard output, followed by a newline character.',
    arguments: [{ name: 's', type: 'String', description: 'String to print' }],
    returns: { type: 'IO ()', description: 'IO action that prints the string' },
    examples: [
      {
        code: 'putStrLn "Hello, World!"',
        output: 'Hello, World!',
        explanation: 'Prints the string followed by a newline',
      },
      {
        code: 'mapM_ putStrLn ["line1", "line2", "line3"]',
        output: 'line1\nline2\nline3',
        explanation: 'Prints each string on its own line using mapM_',
      },
    ],
    relatedMethods: ['putStr', 'print', 'getLine'],
    notes: [
      'Unlike print, putStrLn does not add quotes around the output.',
      'putStr is the variant without the trailing newline.',
    ],
  },
  {
    name: 'getLine',
    category: 'I/O Functions',
    syntax: 'getLine :: IO String',
    description: 'Reads a line of input from standard input, stripping the trailing newline.',
    arguments: [],
    returns: { type: 'IO String', description: 'IO action that produces the input string' },
    examples: [
      {
        code: 'do\n  name <- getLine\n  putStrLn ("Hello, " ++ name)',
        output: 'Hello, <user input>',
        explanation: 'Reads a line and uses it in a greeting',
      },
    ],
    relatedMethods: ['putStrLn', 'getContents', 'readLn'],
    notes: ['Blocks until a full line (terminated by newline) is available on stdin.'],
  },
  {
    name: 'print',
    category: 'I/O Functions',
    syntax: 'print :: Show a => a -> IO ()',
    description:
      'Outputs a value to standard output using its Show instance, followed by a newline. Equivalent to putStrLn . show.',
    arguments: [{ name: 'x', type: 'a', description: 'Value to print (must have Show instance)' }],
    returns: { type: 'IO ()', description: 'IO action that prints the value' },
    examples: [
      {
        code: 'print 42',
        output: '42',
      },
      {
        code: 'print [1, 2, 3]',
        output: '[1,2,3]',
      },
      {
        code: 'print "hello"',
        output: '"hello"',
        explanation: 'Strings are shown with quotes, unlike putStrLn',
      },
    ],
    relatedMethods: ['putStrLn', 'show', 'putStr'],
    notes: [
      'print adds quotes around strings because it uses show. Use putStrLn for raw string output.',
    ],
  },

  // ============================================================
  // Additional List Functions
  // ============================================================
  {
    name: 'take',
    category: 'List Functions',
    syntax: 'take :: Int -> [a] -> [a]',
    description:
      'Returns the first n elements of a list. If the list has fewer than n elements, returns the entire list.',
    arguments: [
      { name: 'n', type: 'Int', description: 'Number of elements to take' },
      { name: 'xs', type: '[a]', description: 'Input list' },
    ],
    returns: { type: '[a]', description: 'Prefix of the list with at most n elements' },
    examples: [
      { code: 'take 3 [1, 2, 3, 4, 5]', output: '[1, 2, 3]' },
      { code: 'take 10 [1, 2]', output: '[1, 2]' },
      {
        code: 'take 5 (cycle [1, 2, 3])',
        output: '[1, 2, 3, 1, 2]',
        explanation: 'Works with infinite lists',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['drop', 'splitAt', 'takeWhile'],
  },
  {
    name: 'drop',
    category: 'List Functions',
    syntax: 'drop :: Int -> [a] -> [a]',
    description:
      'Drops the first n elements of a list and returns the rest. If the list has fewer than n elements, returns an empty list.',
    arguments: [
      { name: 'n', type: 'Int', description: 'Number of elements to drop' },
      { name: 'xs', type: '[a]', description: 'Input list' },
    ],
    returns: { type: '[a]', description: 'List with the first n elements removed' },
    examples: [
      { code: 'drop 3 [1, 2, 3, 4, 5]', output: '[4, 5]' },
      { code: 'drop 10 [1, 2]', output: '[]' },
      { code: 'drop 0 [1, 2, 3]', output: '[1, 2, 3]' },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['take', 'splitAt', 'dropWhile'],
  },
  {
    name: 'concat',
    category: 'List Functions',
    syntax: 'concat :: [[a]] -> [a]',
    description: 'Concatenates a list of lists into a single list.',
    arguments: [{ name: 'xss', type: '[[a]]', description: 'List of lists to concatenate' }],
    returns: { type: '[a]', description: 'Flattened list' },
    examples: [
      { code: 'concat [[1, 2], [3, 4], [5]]', output: '[1, 2, 3, 4, 5]' },
      { code: 'concat ["hello", " ", "world"]', output: '"hello world"' },
    ],
    timeComplexity: 'O(n) where n is total elements',
    spaceComplexity: 'O(n)',
    relatedMethods: ['concatMap', '(++)', 'join'],
    notes: ['concat is equivalent to foldr (++) [].'],
  },
  {
    name: 'reverse',
    category: 'List Functions',
    syntax: 'reverse :: [a] -> [a]',
    description: 'Returns the elements of a list in reverse order.',
    arguments: [{ name: 'xs', type: '[a]', description: 'Input list' }],
    returns: { type: '[a]', description: 'Reversed list' },
    examples: [
      { code: 'reverse [1, 2, 3]', output: '[3, 2, 1]' },
      { code: 'reverse "hello"', output: '"olleh"' },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['sort', 'transpose'],
  },
  {
    name: 'length',
    category: 'List Functions',
    syntax: 'length :: Foldable t => t a -> Int',
    description: 'Returns the number of elements in a foldable structure (commonly a list).',
    arguments: [{ name: 'xs', type: 't a', description: 'Input foldable (e.g. list)' }],
    returns: { type: 'Int', description: 'Number of elements' },
    examples: [
      { code: 'length [1, 2, 3, 4]', output: '4' },
      { code: 'length "hello"', output: '5' },
      { code: 'length []', output: '0' },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['null', 'elem'],
    notes: [
      'Traverses the entire list to compute the length. For checking emptiness, prefer null.',
      'Generalized to Foldable in GHC 7.10+.',
    ],
  },
  {
    name: 'elem',
    category: 'List Functions',
    syntax: 'elem :: (Foldable t, Eq a) => a -> t a -> Bool',
    description: 'Tests whether an element is in a foldable structure (commonly a list).',
    arguments: [
      { name: 'x', type: 'a', description: 'Element to search for' },
      { name: 'xs', type: 't a', description: 'Foldable to search in' },
    ],
    returns: { type: 'Bool', description: 'True if the element is found' },
    examples: [
      { code: 'elem 3 [1, 2, 3, 4]', output: 'True' },
      { code: 'elem 5 [1, 2, 3, 4]', output: 'False' },
      {
        code: '\'e\' `elem` "hello"',
        output: 'True',
        explanation: 'Infix syntax with backticks is idiomatic',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['notElem', 'find', 'lookup'],
    notes: ['Uses linear search. For frequent lookups, consider Data.Set or Data.Map.'],
  },

  // ============================================================
  // Additional Higher-Order / Prelude Functions
  // ============================================================
  {
    name: 'id',
    category: 'Higher-Order Functions',
    syntax: 'id :: a -> a',
    description: 'The identity function. Returns its argument unchanged.',
    arguments: [{ name: 'x', type: 'a', description: 'Any value' }],
    returns: { type: 'a', description: 'The same value, unchanged' },
    examples: [
      { code: 'id 42', output: '42' },
      { code: 'id "hello"', output: '"hello"' },
      {
        code: 'map id [1, 2, 3]',
        output: '[1, 2, 3]',
        explanation: 'Mapping id over a list returns the same list',
      },
    ],
    relatedMethods: ['const', '(.)', '($)'],
    notes: [
      'The identity element for function composition: f . id == id . f == f.',
      'Useful as a default or placeholder function argument.',
    ],
  },
  {
    name: 'concatMap',
    category: 'List Functions',
    syntax: 'concatMap :: (a -> [b]) -> [a] -> [b]',
    description:
      'Maps a function over a list and concatenates the results. Equivalent to concat . map f.',
    arguments: [
      { name: 'f', type: '(a -> [b])', description: 'Function returning a list for each element' },
      { name: 'xs', type: '[a]', description: 'Input list' },
    ],
    returns: { type: '[b]', description: 'Concatenated results' },
    examples: [
      {
        code: 'concatMap (\\x -> [x, x*2]) [1, 2, 3]',
        output: '[1, 2, 2, 4, 3, 6]',
        explanation: 'Each element produces a two-element list, all concatenated',
      },
      {
        code: 'concatMap (replicate 3) [1, 2, 3]',
        output: '[1, 1, 1, 2, 2, 2, 3, 3, 3]',
      },
    ],
    timeComplexity: 'O(n * m) where m is average output length per element',
    spaceComplexity: 'O(n * m)',
    relatedMethods: ['concat', 'map', '(>>=)'],
    notes: [
      'concatMap f is equivalent to (>>= f) for the list monad.',
      'Generalized to Foldable in recent GHC versions.',
    ],
  },
];

export default haskellMethods;
