import type { Method } from '../types';

export const rustMethods: Method[] = [
  // ============================================================
  // Vec Operations
  // ============================================================
  {
    name: 'Vec::push',
    category: 'Vec Operations',
    syntax: 'vec.push(value)',
    description:
      'Appends an element to the back of the vector. Panics if the number of elements overflows a usize.',
    arguments: [{ name: 'value', type: 'T', description: 'The value to append to the vector' }],
    returns: { type: '()', description: 'Nothing; the vector is modified in place' },
    examples: [
      {
        code: 'let mut v = vec![1, 2, 3];\nv.push(4);\nprintln!("{:?}", v);',
        output: '[1, 2, 3, 4]',
        explanation: 'Appends 4 to the end of the vector.',
      },
    ],
    timeComplexity: 'O(1) amortized',
    spaceComplexity: 'O(1) amortized',
    relatedMethods: ['Vec::pop', 'Vec::extend', 'Vec::insert'],
    sinceVersion: '1.0.0',
    notes: [
      'If the vector needs to reallocate, it will double its capacity.',
      'The vector must be declared as mutable with `let mut`.',
    ],
  },
  {
    name: 'Vec::pop',
    category: 'Vec Operations',
    syntax: 'vec.pop()',
    description:
      'Removes the last element from the vector and returns it wrapped in Some, or None if the vector is empty.',
    arguments: [],
    returns: {
      type: 'Option<T>',
      description: 'Some(value) if the vector was non-empty, None otherwise',
    },
    examples: [
      {
        code: 'let mut v = vec![1, 2, 3];\nlet last = v.pop();\nprintln!("{:?}, {:?}", last, v);',
        output: 'Some(3), [1, 2]',
        explanation: 'Removes and returns the last element.',
      },
      {
        code: 'let mut v: Vec<i32> = vec![];\nlet last = v.pop();\nprintln!("{:?}", last);',
        output: 'None',
        explanation: 'Returns None when the vector is empty.',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Vec::push', 'Vec::last', 'Vec::remove'],
    sinceVersion: '1.0.0',
  },
  {
    name: 'Vec::len',
    category: 'Vec Operations',
    syntax: 'vec.len()',
    description: 'Returns the number of elements in the vector, also referred to as its length.',
    arguments: [],
    returns: { type: 'usize', description: 'The number of elements in the vector' },
    examples: [
      {
        code: 'let v = vec![1, 2, 3];\nprintln!("{}", v.len());',
        output: '3',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Vec::is_empty', 'Vec::capacity'],
    sinceVersion: '1.0.0',
  },
  {
    name: 'Vec::iter',
    category: 'Vec Operations',
    syntax: 'vec.iter()',
    description:
      'Returns an iterator over immutable references to each element of the vector. The vector cannot be modified during iteration.',
    arguments: [],
    returns: {
      type: 'Iter<T>',
      description: 'An iterator yielding references (&T) to each element',
    },
    examples: [
      {
        code: 'let v = vec![1, 2, 3];\nlet doubled: Vec<i32> = v.iter().map(|x| x * 2).collect();\nprintln!("{:?}", doubled);',
        output: '[2, 4, 6]',
        explanation: 'Creates an iterator and maps each element, doubling its value.',
      },
    ],
    timeComplexity: 'O(1) to create; O(n) to fully consume',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Vec::iter_mut', 'Vec::into_iter'],
    sinceVersion: '1.0.0',
    notes: ['Use iter_mut() for mutable references, into_iter() to consume the vector.'],
  },
  {
    name: 'Vec::sort',
    category: 'Vec Operations',
    syntax: 'vec.sort()',
    description:
      'Sorts the vector in-place in ascending order. This sort is stable (preserves the order of equal elements) and uses a modified merge sort.',
    arguments: [],
    returns: { type: '()', description: 'Nothing; the vector is sorted in place' },
    examples: [
      {
        code: 'let mut v = vec![3, 1, 4, 1, 5, 9];\nv.sort();\nprintln!("{:?}", v);',
        output: '[1, 1, 3, 4, 5, 9]',
      },
    ],
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['Vec::sort_by', 'Vec::sort_unstable'],
    sinceVersion: '1.0.0',
    notes: [
      'Requires T: Ord. For floating-point types, use sort_by() with partial_cmp.',
      'sort_unstable() may be faster but does not preserve order of equal elements.',
    ],
  },
  {
    name: 'Vec::contains',
    category: 'Vec Operations',
    syntax: 'vec.contains(&value)',
    description:
      'Returns true if the vector contains an element equal to the given value. Uses linear search.',
    arguments: [
      {
        name: 'value',
        type: '&T',
        description: 'A reference to the value to search for',
      },
    ],
    returns: { type: 'bool', description: 'true if the value is found, false otherwise' },
    examples: [
      {
        code: 'let v = vec![1, 2, 3];\nprintln!("{}", v.contains(&2));\nprintln!("{}", v.contains(&5));',
        output: 'true\nfalse',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Vec::iter', 'Vec::binary_search'],
    sinceVersion: '1.0.0',
    notes: ['Requires T: PartialEq. For sorted vectors, binary_search() is more efficient.'],
  },

  // ============================================================
  // String Methods
  // ============================================================
  {
    name: 'String::from',
    category: 'String Methods',
    syntax: 'String::from(s)',
    description:
      'Creates a new heap-allocated String from a string slice (&str). This is one of the most common ways to create owned strings in Rust.',
    arguments: [
      {
        name: 's',
        type: '&str',
        description: 'The string slice to convert into an owned String',
      },
    ],
    returns: { type: 'String', description: 'A new heap-allocated String' },
    examples: [
      {
        code: 'let s = String::from("hello");\nprintln!("{}", s);',
        output: 'hello',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['str::to_string', 'str::to_owned'],
    sinceVersion: '1.0.0',
    notes: ['Equivalent to "hello".to_string() and "hello".to_owned().'],
  },
  {
    name: 'str::split',
    category: 'String Methods',
    syntax: 's.split(pattern)',
    description:
      'Returns an iterator over substrings of the string slice, separated by characters matched by a pattern.',
    arguments: [
      {
        name: 'pattern',
        type: 'Pattern',
        description: 'The pattern to split on (can be a &str, char, slice of chars, or closure)',
      },
    ],
    returns: {
      type: 'Split<P>',
      description: 'An iterator over the substrings',
    },
    examples: [
      {
        code: 'let s = "hello world rust";\nlet words: Vec<&str> = s.split(\' \').collect();\nprintln!("{:?}", words);',
        output: '["hello", "world", "rust"]',
      },
      {
        code: 'let csv = "a,b,c";\nlet fields: Vec<&str> = csv.split(\',\').collect();\nprintln!("{:?}", fields);',
        output: '["a", "b", "c"]',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) for the iterator; O(n) if collected',
    relatedMethods: ['str::splitn', 'str::split_whitespace', 'str::rsplit'],
    sinceVersion: '1.0.0',
  },
  {
    name: 'str::trim',
    category: 'String Methods',
    syntax: 's.trim()',
    description:
      'Returns a string slice with leading and trailing whitespace removed. Does not allocate a new string.',
    arguments: [],
    returns: {
      type: '&str',
      description: 'A string slice with whitespace removed from both ends',
    },
    examples: [
      {
        code: 'let s = "  hello  ";\nprintln!("\'{}\'", s.trim());',
        output: "'hello'",
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['str::trim_start', 'str::trim_end'],
    sinceVersion: '1.0.0',
    notes: ['Returns a sub-slice of the original; no heap allocation occurs.'],
  },
  {
    name: 'str::replace',
    category: 'String Methods',
    syntax: 's.replace(from, to)',
    description: 'Replaces all matches of a pattern with another string and returns a new String.',
    arguments: [
      {
        name: 'from',
        type: 'Pattern',
        description: 'The pattern to search for',
      },
      { name: 'to', type: '&str', description: 'The replacement string' },
    ],
    returns: {
      type: 'String',
      description: 'A new String with all occurrences replaced',
    },
    examples: [
      {
        code: 'let s = "hello world";\nlet new_s = s.replace("world", "rust");\nprintln!("{}", new_s);',
        output: 'hello rust',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['str::replacen'],
    sinceVersion: '1.0.0',
  },
  {
    name: 'str::to_uppercase',
    category: 'String Methods',
    syntax: 's.to_uppercase()',
    description:
      'Returns the uppercase equivalent of this string slice as a new String, according to Unicode rules.',
    arguments: [],
    returns: { type: 'String', description: 'A new String with all characters in uppercase' },
    examples: [
      {
        code: 'let s = "hello";\nprintln!("{}", s.to_uppercase());',
        output: 'HELLO',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['str::to_lowercase', 'str::to_ascii_uppercase'],
    sinceVersion: '1.2.0',
  },

  // ============================================================
  // Iterator Methods
  // ============================================================
  {
    name: 'Iterator::map',
    category: 'Iterator Methods',
    syntax: 'iter.map(|item| expression)',
    description:
      'Takes a closure and creates an iterator that calls that closure on each element. The map iterator is lazy and does nothing until consumed.',
    arguments: [
      {
        name: 'f',
        type: 'FnMut(T) -> U',
        description: 'A closure that transforms each element',
      },
    ],
    returns: {
      type: 'Map<Self, F>',
      description: 'A new iterator that yields transformed elements',
    },
    examples: [
      {
        code: 'let nums = vec![1, 2, 3];\nlet doubled: Vec<i32> = nums.iter().map(|x| x * 2).collect();\nprintln!("{:?}", doubled);',
        output: '[2, 4, 6]',
      },
    ],
    timeComplexity: 'O(n) when fully consumed',
    spaceComplexity: 'O(1) for the iterator adapter',
    relatedMethods: ['Iterator::filter', 'Iterator::flat_map', 'Iterator::for_each'],
    sinceVersion: '1.0.0',
    notes: [
      'Iterators are lazy in Rust; map does nothing until consumed by collect, for_each, etc.',
    ],
  },
  {
    name: 'Iterator::filter',
    category: 'Iterator Methods',
    syntax: 'iter.filter(|item| predicate)',
    description:
      'Creates an iterator that yields only the elements for which the closure returns true. The closure receives a reference to each element.',
    arguments: [
      {
        name: 'predicate',
        type: 'FnMut(&T) -> bool',
        description: 'A closure that returns true for elements to keep',
      },
    ],
    returns: {
      type: 'Filter<Self, P>',
      description: 'An iterator yielding only elements that satisfy the predicate',
    },
    examples: [
      {
        code: 'let nums = vec![1, 2, 3, 4, 5, 6];\nlet evens: Vec<&i32> = nums.iter().filter(|x| *x % 2 == 0).collect();\nprintln!("{:?}", evens);',
        output: '[2, 4, 6]',
      },
    ],
    timeComplexity: 'O(n) when fully consumed',
    spaceComplexity: 'O(1) for the iterator adapter',
    relatedMethods: ['Iterator::map', 'Iterator::find', 'Iterator::take_while'],
    sinceVersion: '1.0.0',
    notes: ['The closure receives &&T when used with iter(), so you may need to dereference.'],
  },
  {
    name: 'Iterator::collect',
    category: 'Iterator Methods',
    syntax: 'iter.collect::<TargetType>()',
    description:
      'Consumes the iterator and collects the resulting values into a collection. The target type can often be inferred by the compiler.',
    arguments: [],
    returns: {
      type: 'B: FromIterator<T>',
      description: 'A collection built from the iterator elements',
    },
    examples: [
      {
        code: 'let v: Vec<i32> = (1..=5).collect();\nprintln!("{:?}", v);',
        output: '[1, 2, 3, 4, 5]',
        explanation: 'Collects a range iterator into a Vec.',
      },
      {
        code: 'use std::collections::HashMap;\nlet map: HashMap<&str, i32> = vec![("a", 1), ("b", 2)].into_iter().collect();\nprintln!("{:?}", map);',
        output: '{"a": 1, "b": 2}',
        explanation: 'Collects key-value pairs into a HashMap.',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['Iterator::map', 'Iterator::filter'],
    sinceVersion: '1.0.0',
    notes: [
      'Can collect into Vec, HashMap, HashSet, String, Result, and more.',
      'Use turbofish syntax ::<Type>() when the compiler cannot infer the type.',
    ],
  },
  {
    name: 'Iterator::fold',
    category: 'Iterator Methods',
    syntax: 'iter.fold(init, |acc, item| expression)',
    description:
      'Applies a closure to each element, threading an accumulator value through the computation. Returns the final accumulated value.',
    arguments: [
      { name: 'init', type: 'B', description: 'The initial value for the accumulator' },
      {
        name: 'f',
        type: 'FnMut(B, T) -> B',
        description:
          'A closure that takes the accumulator and an element, returning the new accumulator',
      },
    ],
    returns: { type: 'B', description: 'The final accumulated value' },
    examples: [
      {
        code: 'let sum = vec![1, 2, 3, 4, 5].iter().fold(0, |acc, x| acc + x);\nprintln!("{}", sum);',
        output: '15',
        explanation: 'Sums all elements starting from 0.',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Iterator::reduce', 'Iterator::sum', 'Iterator::product'],
    sinceVersion: '1.0.0',
    notes: ['Unlike reduce(), fold() takes an initial value and never returns None.'],
  },
  {
    name: 'Iterator::enumerate',
    category: 'Iterator Methods',
    syntax: 'iter.enumerate()',
    description:
      'Creates an iterator that yields pairs of (index, element), where the index starts at 0.',
    arguments: [],
    returns: {
      type: 'Enumerate<Self>',
      description: 'An iterator yielding (usize, T) tuples',
    },
    examples: [
      {
        code: 'let v = vec!["a", "b", "c"];\nfor (i, val) in v.iter().enumerate() {\n    println!("{}: {}", i, val);\n}',
        output: '0: a\n1: b\n2: c',
      },
    ],
    timeComplexity: 'O(1) per element',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Iterator::zip', 'Iterator::map'],
    sinceVersion: '1.0.0',
  },
  {
    name: 'Iterator::zip',
    category: 'Iterator Methods',
    syntax: 'iter_a.zip(iter_b)',
    description:
      'Zips two iterators into a single iterator of pairs. The resulting iterator ends when either input iterator is exhausted.',
    arguments: [
      {
        name: 'other',
        type: 'IntoIterator',
        description: 'The second iterator to zip with',
      },
    ],
    returns: {
      type: 'Zip<Self, U::IntoIter>',
      description: 'An iterator of (A, B) pairs',
    },
    examples: [
      {
        code: 'let names = vec!["Alice", "Bob"];\nlet ages = vec![30, 25];\nlet zipped: Vec<(&&str, &i32)> = names.iter().zip(ages.iter()).collect();\nprintln!("{:?}", zipped);',
        output: '[("Alice", 30), ("Bob", 25)]',
      },
    ],
    timeComplexity: 'O(min(n, m)) when fully consumed',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Iterator::enumerate', 'Iterator::chain', 'Iterator::unzip'],
    sinceVersion: '1.0.0',
    notes: ['Stops at the shorter iterator. Use itertools::zip_longest for padding.'],
  },

  // ============================================================
  // HashMap Methods
  // ============================================================
  {
    name: 'HashMap::insert',
    category: 'HashMap Methods',
    syntax: 'map.insert(key, value)',
    description:
      'Inserts a key-value pair into the map. If the map already contained a value for this key, the old value is returned wrapped in Some.',
    arguments: [
      { name: 'key', type: 'K', description: 'The key to insert' },
      { name: 'value', type: 'V', description: 'The value to associate with the key' },
    ],
    returns: {
      type: 'Option<V>',
      description: 'Some(old_value) if the key was already present, None otherwise',
    },
    examples: [
      {
        code: 'use std::collections::HashMap;\nlet mut map = HashMap::new();\nmap.insert("key", 1);\nlet old = map.insert("key", 2);\nprintln!("{:?}, {:?}", old, map);',
        output: 'Some(1), {"key": 2}',
        explanation: 'Inserting with an existing key returns the previous value.',
      },
    ],
    timeComplexity: 'O(1) amortized',
    spaceComplexity: 'O(1) amortized',
    relatedMethods: ['HashMap::get', 'HashMap::entry', 'HashMap::remove'],
    sinceVersion: '1.0.0',
  },
  {
    name: 'HashMap::get',
    category: 'HashMap Methods',
    syntax: 'map.get(&key)',
    description:
      'Returns a reference to the value corresponding to the key, or None if the key is not present.',
    arguments: [
      {
        name: 'key',
        type: '&Q',
        description: 'A reference to the key to look up (where K: Borrow<Q>)',
      },
    ],
    returns: {
      type: 'Option<&V>',
      description: 'Some(&value) if found, None otherwise',
    },
    examples: [
      {
        code: 'use std::collections::HashMap;\nlet mut map = HashMap::new();\nmap.insert("name", "Rust");\nprintln!("{:?}", map.get("name"));\nprintln!("{:?}", map.get("age"));',
        output: 'Some("Rust")\nNone',
      },
    ],
    timeComplexity: 'O(1) average',
    spaceComplexity: 'O(1)',
    relatedMethods: ['HashMap::get_mut', 'HashMap::contains_key', 'HashMap::insert'],
    sinceVersion: '1.0.0',
  },
  {
    name: 'HashMap::remove',
    category: 'HashMap Methods',
    syntax: 'map.remove(&key)',
    description:
      'Removes a key from the map, returning the stored value if the key was previously in the map.',
    arguments: [
      {
        name: 'key',
        type: '&Q',
        description: 'A reference to the key to remove',
      },
    ],
    returns: {
      type: 'Option<V>',
      description: 'Some(value) if the key was present, None otherwise',
    },
    examples: [
      {
        code: 'use std::collections::HashMap;\nlet mut map = HashMap::new();\nmap.insert("key", 42);\nlet removed = map.remove("key");\nprintln!("{:?}, {:?}", removed, map.get("key"));',
        output: 'Some(42), None',
      },
    ],
    timeComplexity: 'O(1) average',
    spaceComplexity: 'O(1)',
    relatedMethods: ['HashMap::insert', 'HashMap::get'],
    sinceVersion: '1.0.0',
  },
  {
    name: 'HashMap::contains_key',
    category: 'HashMap Methods',
    syntax: 'map.contains_key(&key)',
    description: 'Returns true if the map contains a value for the specified key.',
    arguments: [
      {
        name: 'key',
        type: '&Q',
        description: 'A reference to the key to check',
      },
    ],
    returns: { type: 'bool', description: 'true if the key exists in the map' },
    examples: [
      {
        code: 'use std::collections::HashMap;\nlet mut map = HashMap::new();\nmap.insert("lang", "rust");\nprintln!("{}", map.contains_key("lang"));\nprintln!("{}", map.contains_key("version"));',
        output: 'true\nfalse',
      },
    ],
    timeComplexity: 'O(1) average',
    spaceComplexity: 'O(1)',
    relatedMethods: ['HashMap::get', 'HashMap::keys'],
    sinceVersion: '1.0.0',
  },

  // ============================================================
  // Option Methods
  // ============================================================
  {
    name: 'Option::unwrap',
    category: 'Option Methods',
    syntax: 'option.unwrap()',
    description:
      'Returns the contained Some value. Panics if the value is None with a generic panic message.',
    arguments: [],
    returns: { type: 'T', description: 'The contained value' },
    examples: [
      {
        code: 'let x: Option<i32> = Some(42);\nprintln!("{}", x.unwrap());',
        output: '42',
      },
      {
        code: 'let x: Option<i32> = None;\n// x.unwrap(); // This would panic!',
        output: 'panics with "called `Option::unwrap()` on a `None` value"',
        explanation: 'Calling unwrap on None causes a panic at runtime.',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Option::unwrap_or', 'Option::expect', 'Option::unwrap_or_default'],
    sinceVersion: '1.0.0',
    notes: [
      'Avoid in production code; prefer unwrap_or, unwrap_or_else, map, or pattern matching.',
      'Use expect() to provide a custom panic message.',
    ],
  },
  {
    name: 'Option::unwrap_or',
    category: 'Option Methods',
    syntax: 'option.unwrap_or(default)',
    description:
      'Returns the contained Some value, or a provided default value if the Option is None.',
    arguments: [
      {
        name: 'default',
        type: 'T',
        description: 'The default value to return if Option is None',
      },
    ],
    returns: { type: 'T', description: 'The contained value or the default' },
    examples: [
      {
        code: 'let x: Option<i32> = Some(42);\nprintln!("{}", x.unwrap_or(0));',
        output: '42',
      },
      {
        code: 'let x: Option<i32> = None;\nprintln!("{}", x.unwrap_or(0));',
        output: '0',
        explanation: 'Returns the default value 0 since the Option is None.',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Option::unwrap', 'Option::unwrap_or_else', 'Option::unwrap_or_default'],
    sinceVersion: '1.0.0',
    notes: ['The default value is eagerly evaluated. Use unwrap_or_else for lazy evaluation.'],
  },
  {
    name: 'Option::map',
    category: 'Option Methods',
    syntax: 'option.map(|value| expression)',
    description:
      'Maps an Option<T> to Option<U> by applying a function to the contained value (if Some), or returns None (if None).',
    arguments: [
      {
        name: 'f',
        type: 'FnOnce(T) -> U',
        description: 'A closure to apply to the contained value',
      },
    ],
    returns: {
      type: 'Option<U>',
      description: 'Some(f(value)) if Some, None if None',
    },
    examples: [
      {
        code: 'let x: Option<i32> = Some(5);\nlet doubled = x.map(|v| v * 2);\nprintln!("{:?}", doubled);',
        output: 'Some(10)',
      },
      {
        code: 'let x: Option<i32> = None;\nlet doubled = x.map(|v| v * 2);\nprintln!("{:?}", doubled);',
        output: 'None',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Option::and_then', 'Option::unwrap_or', 'Option::filter'],
    sinceVersion: '1.0.0',
  },
  {
    name: 'Option::and_then',
    category: 'Option Methods',
    syntax: 'option.and_then(|value| some_option)',
    description:
      'Returns None if the Option is None, otherwise calls the closure with the wrapped value and returns the result. Also known as flatmap in other languages.',
    arguments: [
      {
        name: 'f',
        type: 'FnOnce(T) -> Option<U>',
        description: 'A closure that returns an Option',
      },
    ],
    returns: {
      type: 'Option<U>',
      description: 'The result of the closure if Some, None otherwise',
    },
    examples: [
      {
        code: 'let x: Option<&str> = Some("42");\nlet parsed = x.and_then(|s| s.parse::<i32>().ok());\nprintln!("{:?}", parsed);',
        output: 'Some(42)',
        explanation: 'Chains an operation that might also return None.',
      },
      {
        code: 'let x: Option<&str> = Some("not_a_number");\nlet parsed = x.and_then(|s| s.parse::<i32>().ok());\nprintln!("{:?}", parsed);',
        output: 'None',
        explanation: 'The parse fails, returning None through the chain.',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Option::map', 'Option::or_else', 'Option::flatten'],
    sinceVersion: '1.0.0',
    notes: [
      'Use and_then instead of map when the closure itself returns an Option to avoid Option<Option<T>>.',
    ],
  },

  // ============================================================
  // Result Methods
  // ============================================================
  {
    name: 'Result::unwrap',
    category: 'Result Methods',
    syntax: 'result.unwrap()',
    description:
      'Returns the contained Ok value. Panics if the value is an Err, with the Err value as the panic message.',
    arguments: [],
    returns: { type: 'T', description: 'The contained Ok value' },
    examples: [
      {
        code: 'let x: Result<i32, &str> = Ok(42);\nprintln!("{}", x.unwrap());',
        output: '42',
      },
      {
        code: 'let x: Result<i32, &str> = Err("error");\n// x.unwrap(); // panics with "error"',
        output: 'panics with "called `Result::unwrap()` on an `Err` value: error"',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Result::expect', 'Result::unwrap_or', 'Result::unwrap_or_else'],
    sinceVersion: '1.0.0',
    notes: ['Avoid in production code; prefer the ? operator, map, and_then, or pattern matching.'],
  },
  {
    name: 'Result::map',
    category: 'Result Methods',
    syntax: 'result.map(|value| expression)',
    description:
      'Maps a Result<T, E> to Result<U, E> by applying a function to the contained Ok value, leaving an Err value untouched.',
    arguments: [
      {
        name: 'f',
        type: 'FnOnce(T) -> U',
        description: 'A closure to apply to the Ok value',
      },
    ],
    returns: {
      type: 'Result<U, E>',
      description: 'Ok(f(value)) if Ok, Err(e) unchanged if Err',
    },
    examples: [
      {
        code: 'let x: Result<i32, &str> = Ok(5);\nlet doubled = x.map(|v| v * 2);\nprintln!("{:?}", doubled);',
        output: 'Ok(10)',
      },
      {
        code: 'let x: Result<i32, &str> = Err("fail");\nlet doubled = x.map(|v| v * 2);\nprintln!("{:?}", doubled);',
        output: 'Err("fail")',
        explanation: 'The error passes through unchanged.',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Result::and_then', 'Result::map_err', 'Result::unwrap_or'],
    sinceVersion: '1.0.0',
  },
  {
    name: 'Result::and_then',
    category: 'Result Methods',
    syntax: 'result.and_then(|value| another_result)',
    description:
      'Calls the closure if the Result is Ok, otherwise returns the Err value unchanged. Useful for chaining operations that can each fail.',
    arguments: [
      {
        name: 'f',
        type: 'FnOnce(T) -> Result<U, E>',
        description: 'A closure that returns a Result',
      },
    ],
    returns: {
      type: 'Result<U, E>',
      description: 'The result of the closure if Ok, Err(e) unchanged if Err',
    },
    examples: [
      {
        code: 'fn parse_and_double(s: &str) -> Result<i32, std::num::ParseIntError> {\n    s.parse::<i32>().and_then(|n| Ok(n * 2))\n}\nprintln!("{:?}", parse_and_double("5"));\nprintln!("{:?}", parse_and_double("abc"));',
        output: 'Ok(10)\nErr(invalid digit found in string)',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Result::map', 'Result::or_else', 'Result::unwrap'],
    sinceVersion: '1.0.0',
    notes: ['Preferred over nested match statements for chaining fallible operations.'],
  },

  // ============================================================
  // Slice Methods
  // ============================================================
  {
    name: 'slice::binary_search',
    category: 'Slice Methods',
    syntax: 'slice.binary_search(&value)',
    description:
      'Binary searches a sorted slice for a given element. Returns Ok(index) if found, Err(index) if not found where index is where the element could be inserted to maintain sort order.',
    arguments: [
      {
        name: 'value',
        type: '&T',
        description: 'A reference to the value to search for',
      },
    ],
    returns: {
      type: 'Result<usize, usize>',
      description: 'Ok(index) if found, Err(insertion_index) if not found',
    },
    examples: [
      {
        code: 'let v = [1, 3, 5, 7, 9];\nprintln!("{:?}", v.binary_search(&5));\nprintln!("{:?}", v.binary_search(&4));',
        output: 'Ok(2)\nErr(2)',
        explanation: '5 is found at index 2. 4 is not found; it would be inserted at index 2.',
      },
    ],
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['slice::sort', 'Vec::contains', 'slice::binary_search_by'],
    sinceVersion: '1.0.0',
    notes: ['The slice must be sorted in ascending order before calling binary_search.'],
  },
  {
    name: 'slice::chunks',
    category: 'Slice Methods',
    syntax: 'slice.chunks(chunk_size)',
    description:
      'Returns an iterator over consecutive non-overlapping sub-slices of the given chunk size. The last chunk may have fewer elements if the slice length is not evenly divisible.',
    arguments: [
      {
        name: 'chunk_size',
        type: 'usize',
        description: 'The size of each chunk (must be greater than 0)',
      },
    ],
    returns: {
      type: 'Chunks<T>',
      description: 'An iterator over sub-slices of the given size',
    },
    examples: [
      {
        code: 'let v = [1, 2, 3, 4, 5];\nlet chunks: Vec<&[i32]> = v.chunks(2).collect();\nprintln!("{:?}", chunks);',
        output: '[[1, 2], [3, 4], [5]]',
        explanation: 'The slice is divided into chunks of 2; the last chunk has only 1 element.',
      },
    ],
    timeComplexity: 'O(1) per chunk',
    spaceComplexity: 'O(1)',
    relatedMethods: ['slice::chunks_exact', 'slice::windows', 'slice::split_at'],
    sinceVersion: '1.0.0',
    notes: ['Panics if chunk_size is 0.'],
  },
  {
    name: 'slice::windows',
    category: 'Slice Methods',
    syntax: 'slice.windows(window_size)',
    description:
      'Returns an iterator over all contiguous windows (overlapping sub-slices) of a given length. The windows overlap by window_size - 1 elements.',
    arguments: [
      {
        name: 'window_size',
        type: 'usize',
        description: 'The size of each window (must be greater than 0)',
      },
    ],
    returns: {
      type: 'Windows<T>',
      description: 'An iterator over overlapping sub-slices',
    },
    examples: [
      {
        code: 'let v = [1, 2, 3, 4];\nlet wins: Vec<&[i32]> = v.windows(2).collect();\nprintln!("{:?}", wins);',
        output: '[[1, 2], [2, 3], [3, 4]]',
        explanation: 'Sliding window of size 2 over the slice.',
      },
    ],
    timeComplexity: 'O(1) per window',
    spaceComplexity: 'O(1)',
    relatedMethods: ['slice::chunks', 'slice::split_at'],
    sinceVersion: '1.0.0',
    notes: [
      'Panics if window_size is 0.',
      'Returns an empty iterator if the slice is shorter than window_size.',
    ],
  },
];

export default rustMethods;
