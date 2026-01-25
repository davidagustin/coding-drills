import type { Problem } from '../types';

export const rustProblems: Problem[] = [
  // ========================================
  // ITERATORS - filter
  // ========================================
  {
    id: 'rust-iter-001',
    category: 'Iterators',
    difficulty: 'easy',
    title: 'Filter Even Numbers',
    text: 'Use the filter method to get only even numbers from the vector.',
    setup: 'let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];',
    setupCode: 'let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];',
    expected: [2, 4, 6, 8, 10],
    sample: 'numbers.iter().filter(|&x| x % 2 == 0).cloned().collect::<Vec<_>>()',
    hints: [
      'Use .iter() to get an iterator',
      'filter takes a closure with a reference',
      'Use .collect() to gather results',
    ],
    validPatterns: [/\.filter\s*\(/, /\.collect\s*::\s*<\s*Vec/],
    tags: ['filter', 'iterators', 'basics'],
  },
  {
    id: 'rust-iter-002',
    category: 'Iterators',
    difficulty: 'easy',
    title: 'Filter Positive Numbers',
    text: 'Filter the vector to get only positive numbers.',
    setup: 'let numbers = vec![-3, -1, 0, 2, 5, -4, 8];',
    setupCode: 'let numbers = vec![-3, -1, 0, 2, 5, -4, 8];',
    expected: [2, 5, 8],
    sample: 'numbers.iter().filter(|&&x| x > 0).cloned().collect::<Vec<_>>()',
    hints: [
      'Positive numbers are greater than 0',
      'Remember filter gives you a reference',
    ],
    validPatterns: [/\.filter\s*\(/, />\s*0/],
    tags: ['filter', 'comparison', 'iterators'],
  },

  // ========================================
  // ITERATORS - map
  // ========================================
  {
    id: 'rust-iter-003',
    category: 'Iterators',
    difficulty: 'easy',
    title: 'Double All Numbers',
    text: 'Use map to double every number in the vector.',
    setup: 'let numbers = vec![1, 2, 3, 4, 5];',
    setupCode: 'let numbers = vec![1, 2, 3, 4, 5];',
    expected: [2, 4, 6, 8, 10],
    sample: 'numbers.iter().map(|x| x * 2).collect::<Vec<_>>()',
    hints: ['map transforms each element', 'Multiply each element by 2'],
    validPatterns: [/\.map\s*\(\s*\|/, /\*\s*2/],
    tags: ['map', 'arithmetic', 'iterators'],
  },
  {
    id: 'rust-iter-004',
    category: 'Iterators',
    difficulty: 'easy',
    title: 'Square All Numbers',
    text: 'Use map to square every number in the vector.',
    setup: 'let numbers = vec![1, 2, 3, 4, 5];',
    setupCode: 'let numbers = vec![1, 2, 3, 4, 5];',
    expected: [1, 4, 9, 16, 25],
    sample: 'numbers.iter().map(|x| x * x).collect::<Vec<_>>()',
    hints: ['Square means multiply by itself', 'Use x * x or x.pow(2)'],
    validPatterns: [/\.map\s*\(\s*\|/, /\*\s*\w+\s*\)|\.pow\s*\(/],
    tags: ['map', 'arithmetic', 'iterators'],
  },
  {
    id: 'rust-iter-005',
    category: 'Iterators',
    difficulty: 'medium',
    title: 'Map to String Lengths',
    text: 'Use map to get the length of each string.',
    setup: 'let words = vec!["hello", "world", "rust", "programming"];',
    setupCode: 'let words = vec!["hello", "world", "rust", "programming"];',
    expected: [5, 5, 4, 11],
    sample: 'words.iter().map(|s| s.len()).collect::<Vec<_>>()',
    hints: ['Use .len() to get string length', 'map transforms to usize'],
    validPatterns: [/\.map\s*\(\s*\|/, /\.len\s*\(\s*\)/],
    tags: ['map', 'strings', 'iterators'],
  },

  // ========================================
  // ITERATORS - fold
  // ========================================
  {
    id: 'rust-iter-006',
    category: 'Iterators',
    difficulty: 'easy',
    title: 'Sum with Fold',
    text: 'Use fold to calculate the sum of all numbers.',
    setup: 'let numbers = vec![1, 2, 3, 4, 5];',
    setupCode: 'let numbers = vec![1, 2, 3, 4, 5];',
    expected: 15,
    sample: 'numbers.iter().fold(0, |acc, x| acc + x)',
    hints: [
      'fold takes initial value and accumulator function',
      'Start with 0, add each element',
    ],
    validPatterns: [/\.fold\s*\(\s*0/, /acc\s*\+/],
    tags: ['fold', 'sum', 'iterators'],
  },
  {
    id: 'rust-iter-007',
    category: 'Iterators',
    difficulty: 'medium',
    title: 'Product with Fold',
    text: 'Use fold to calculate the product of all numbers.',
    setup: 'let numbers = vec![1, 2, 3, 4, 5];',
    setupCode: 'let numbers = vec![1, 2, 3, 4, 5];',
    expected: 120,
    sample: 'numbers.iter().fold(1, |acc, x| acc * x)',
    hints: ['Start with 1 for multiplication', 'Multiply accumulator by each element'],
    validPatterns: [/\.fold\s*\(\s*1/, /acc\s*\*/],
    tags: ['fold', 'product', 'iterators'],
  },
  {
    id: 'rust-iter-008',
    category: 'Iterators',
    difficulty: 'hard',
    title: 'Find Maximum with Fold',
    text: 'Use fold to find the maximum value in the vector.',
    setup: 'let numbers = vec![3, 7, 2, 9, 4, 6];',
    setupCode: 'let numbers = vec![3, 7, 2, 9, 4, 6];',
    expected: 9,
    sample: 'numbers.iter().fold(i32::MIN, |max, &x| if x > max { x } else { max })',
    hints: [
      'Start with minimum possible value',
      'Compare each element to current max',
    ],
    validPatterns: [/\.fold\s*\(/, /if\s+\w+\s*>\s*\w+/],
    tags: ['fold', 'max', 'iterators'],
  },

  // ========================================
  // ITERATORS - collect
  // ========================================
  {
    id: 'rust-iter-009',
    category: 'Iterators',
    difficulty: 'easy',
    title: 'Collect to Vector',
    text: 'Convert a range iterator to a vector.',
    setup: 'let range = 1..6;',
    setupCode: 'let range = 1..6;',
    expected: [1, 2, 3, 4, 5],
    sample: 'range.collect::<Vec<_>>()',
    hints: ['Use turbofish syntax ::<Vec<_>>', 'Or let type inference work'],
    validPatterns: [/\.collect\s*::\s*<\s*Vec/, /\.collect\s*\(\s*\)/],
    tags: ['collect', 'range', 'iterators'],
  },
  {
    id: 'rust-iter-010',
    category: 'Iterators',
    difficulty: 'medium',
    title: 'Collect to HashSet',
    text: 'Collect the vector into a HashSet to remove duplicates.',
    setup: 'let numbers = vec![1, 2, 2, 3, 3, 3, 4];',
    setupCode: 'let numbers = vec![1, 2, 2, 3, 3, 3, 4];',
    expected: [1, 2, 3, 4],
    sample: 'numbers.into_iter().collect::<std::collections::HashSet<_>>()',
    hints: ['HashSet automatically removes duplicates', 'Import std::collections::HashSet'],
    validPatterns: [/\.collect\s*::\s*<.*HashSet/, /HashSet/],
    tags: ['collect', 'hashset', 'iterators'],
  },

  // ========================================
  // ITERATORS - enumerate
  // ========================================
  {
    id: 'rust-iter-011',
    category: 'Iterators',
    difficulty: 'easy',
    title: 'Enumerate Elements',
    text: 'Use enumerate to get (index, value) pairs.',
    setup: 'let letters = vec!["a", "b", "c", "d"];',
    setupCode: 'let letters = vec!["a", "b", "c", "d"];',
    expected: [[0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']],
    sample: 'letters.iter().enumerate().collect::<Vec<_>>()',
    hints: ['enumerate adds index to each element', 'Returns (usize, &T) pairs'],
    validPatterns: [/\.enumerate\s*\(\s*\)/],
    tags: ['enumerate', 'index', 'iterators'],
  },
  {
    id: 'rust-iter-012',
    category: 'Iterators',
    difficulty: 'medium',
    title: 'Find Index with Enumerate',
    text: 'Find the index of the first element greater than 5.',
    setup: 'let numbers = vec![1, 3, 7, 2, 9, 4];',
    setupCode: 'let numbers = vec![1, 3, 7, 2, 9, 4];',
    expected: 2,
    sample: 'numbers.iter().enumerate().find(|(_, &x)| x > 5).map(|(i, _)| i).unwrap()',
    hints: [
      'enumerate gives you the index',
      'Use find to locate the element',
      'Extract just the index',
    ],
    validPatterns: [/\.enumerate\s*\(\s*\)/, /\.find\s*\(/],
    tags: ['enumerate', 'find', 'iterators'],
  },

  // ========================================
  // ITERATORS - zip
  // ========================================
  {
    id: 'rust-iter-013',
    category: 'Iterators',
    difficulty: 'easy',
    title: 'Zip Two Vectors',
    text: 'Combine two vectors into pairs using zip.',
    setup: `let names = vec!["Alice", "Bob", "Charlie"];
let ages = vec![25, 30, 35];`,
    setupCode: `let names = vec!["Alice", "Bob", "Charlie"];
let ages = vec![25, 30, 35];`,
    expected: [['Alice', 25], ['Bob', 30], ['Charlie', 35]],
    sample: 'names.iter().zip(ages.iter()).collect::<Vec<_>>()',
    hints: ['zip pairs elements from two iterators', 'Stops at shortest iterator'],
    validPatterns: [/\.zip\s*\(/],
    tags: ['zip', 'pairs', 'iterators'],
  },
  {
    id: 'rust-iter-014',
    category: 'Iterators',
    difficulty: 'medium',
    title: 'Zip and Sum',
    text: 'Add corresponding elements from two vectors using zip.',
    setup: `let a = vec![1, 2, 3, 4, 5];
let b = vec![10, 20, 30, 40, 50];`,
    setupCode: `let a = vec![1, 2, 3, 4, 5];
let b = vec![10, 20, 30, 40, 50];`,
    expected: [11, 22, 33, 44, 55],
    sample: 'a.iter().zip(b.iter()).map(|(x, y)| x + y).collect::<Vec<_>>()',
    hints: ['zip pairs the elements', 'map to add each pair'],
    validPatterns: [/\.zip\s*\(/, /\.map\s*\(\s*\|\s*\(\s*\w+\s*,\s*\w+\s*\)\s*\|/],
    tags: ['zip', 'map', 'iterators'],
  },

  // ========================================
  // VECTOR OPERATIONS - push, pop
  // ========================================
  {
    id: 'rust-vec-001',
    category: 'Vector Operations',
    difficulty: 'easy',
    title: 'Push to Vector',
    text: 'Add the number 6 to the end of the vector.',
    setup: 'let mut numbers = vec![1, 2, 3, 4, 5];',
    setupCode: 'let mut numbers = vec![1, 2, 3, 4, 5];',
    expected: [1, 2, 3, 4, 5, 6],
    sample: 'numbers.push(6); numbers',
    hints: ['push adds to the end', 'Vector must be mutable'],
    validPatterns: [/\.push\s*\(\s*6\s*\)/],
    tags: ['push', 'vector', 'basics'],
  },
  {
    id: 'rust-vec-002',
    category: 'Vector Operations',
    difficulty: 'easy',
    title: 'Pop from Vector',
    text: 'Remove and return the last element from the vector.',
    setup: 'let mut numbers = vec![1, 2, 3, 4, 5];',
    setupCode: 'let mut numbers = vec![1, 2, 3, 4, 5];',
    expected: 5,
    sample: 'numbers.pop().unwrap()',
    hints: ['pop returns Option<T>', 'Use unwrap for the value'],
    validPatterns: [/\.pop\s*\(\s*\)/],
    tags: ['pop', 'vector', 'option'],
  },

  // ========================================
  // VECTOR OPERATIONS - len, is_empty
  // ========================================
  {
    id: 'rust-vec-003',
    category: 'Vector Operations',
    difficulty: 'easy',
    title: 'Get Vector Length',
    text: 'Get the number of elements in the vector.',
    setup: 'let numbers = vec![1, 2, 3, 4, 5, 6, 7];',
    setupCode: 'let numbers = vec![1, 2, 3, 4, 5, 6, 7];',
    expected: 7,
    sample: 'numbers.len()',
    hints: ['len() returns usize', 'Does not consume the vector'],
    validPatterns: [/\.len\s*\(\s*\)/],
    tags: ['len', 'vector', 'basics'],
  },
  {
    id: 'rust-vec-004',
    category: 'Vector Operations',
    difficulty: 'easy',
    title: 'Check Empty Vector',
    text: 'Check if the vector is empty.',
    setup: 'let numbers: Vec<i32> = vec![];',
    setupCode: 'let numbers: Vec<i32> = vec![];',
    expected: true,
    sample: 'numbers.is_empty()',
    hints: ['is_empty() returns bool', 'Equivalent to len() == 0'],
    validPatterns: [/\.is_empty\s*\(\s*\)/],
    tags: ['is_empty', 'vector', 'basics'],
  },

  // ========================================
  // VECTOR OPERATIONS - sort, reverse
  // ========================================
  {
    id: 'rust-vec-005',
    category: 'Vector Operations',
    difficulty: 'easy',
    title: 'Sort Vector Ascending',
    text: 'Sort the vector in ascending order.',
    setup: 'let mut numbers = vec![5, 2, 8, 1, 9, 3];',
    setupCode: 'let mut numbers = vec![5, 2, 8, 1, 9, 3];',
    expected: [1, 2, 3, 5, 8, 9],
    sample: 'numbers.sort(); numbers',
    hints: ['sort() modifies in place', 'Vector must be mutable'],
    validPatterns: [/\.sort\s*\(\s*\)/],
    tags: ['sort', 'vector', 'ordering'],
  },
  {
    id: 'rust-vec-006',
    category: 'Vector Operations',
    difficulty: 'medium',
    title: 'Sort Vector Descending',
    text: 'Sort the vector in descending order.',
    setup: 'let mut numbers = vec![5, 2, 8, 1, 9, 3];',
    setupCode: 'let mut numbers = vec![5, 2, 8, 1, 9, 3];',
    expected: [9, 8, 5, 3, 2, 1],
    sample: 'numbers.sort_by(|a, b| b.cmp(a)); numbers',
    hints: ['Use sort_by with reversed comparison', 'Or sort then reverse'],
    validPatterns: [/\.sort_by\s*\(|\.sort\s*\(\s*\).*\.reverse\s*\(\s*\)/],
    tags: ['sort', 'vector', 'descending'],
  },
  {
    id: 'rust-vec-007',
    category: 'Vector Operations',
    difficulty: 'easy',
    title: 'Reverse Vector',
    text: 'Reverse the order of elements in the vector.',
    setup: 'let mut numbers = vec![1, 2, 3, 4, 5];',
    setupCode: 'let mut numbers = vec![1, 2, 3, 4, 5];',
    expected: [5, 4, 3, 2, 1],
    sample: 'numbers.reverse(); numbers',
    hints: ['reverse() modifies in place', 'Vector must be mutable'],
    validPatterns: [/\.reverse\s*\(\s*\)/],
    tags: ['reverse', 'vector', 'ordering'],
  },
  {
    id: 'rust-vec-008',
    category: 'Vector Operations',
    difficulty: 'medium',
    title: 'Sort by Key',
    text: 'Sort the strings by their length.',
    setup: 'let mut words = vec!["elephant", "cat", "dog", "hippopotamus"];',
    setupCode: 'let mut words = vec!["elephant", "cat", "dog", "hippopotamus"];',
    expected: ['cat', 'dog', 'elephant', 'hippopotamus'],
    sample: 'words.sort_by_key(|s| s.len()); words',
    hints: ['Use sort_by_key with a key function', 'len() returns the length'],
    validPatterns: [/\.sort_by_key\s*\(\s*\|/, /\.len\s*\(\s*\)/],
    tags: ['sort_by_key', 'vector', 'strings'],
  },

  // ========================================
  // STRING METHODS - len, chars
  // ========================================
  {
    id: 'rust-string-001',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Get String Length',
    text: 'Get the byte length of the string.',
    setup: 'let text = "Hello, Rust!";',
    setupCode: 'let text = "Hello, Rust!";',
    expected: 12,
    sample: 'text.len()',
    hints: ['len() returns byte count', 'Not character count for UTF-8'],
    validPatterns: [/\.len\s*\(\s*\)/],
    tags: ['len', 'strings', 'basics'],
  },
  {
    id: 'rust-string-002',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Get Character Count',
    text: 'Count the number of characters in the string.',
    setup: 'let text = "Hello";',
    setupCode: 'let text = "Hello";',
    expected: 5,
    sample: 'text.chars().count()',
    hints: ['chars() gives character iterator', 'count() counts elements'],
    validPatterns: [/\.chars\s*\(\s*\)/, /\.count\s*\(\s*\)/],
    tags: ['chars', 'count', 'strings'],
  },
  {
    id: 'rust-string-003',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'Collect Characters to Vector',
    text: 'Convert the string into a vector of characters.',
    setup: 'let text = "rust";',
    setupCode: 'let text = "rust";',
    expected: ['r', 'u', 's', 't'],
    sample: 'text.chars().collect::<Vec<_>>()',
    hints: ['chars() returns an iterator', 'collect into Vec<char>'],
    validPatterns: [/\.chars\s*\(\s*\)/, /\.collect\s*::\s*<\s*Vec/],
    tags: ['chars', 'collect', 'strings'],
  },

  // ========================================
  // STRING METHODS - split, contains
  // ========================================
  {
    id: 'rust-string-004',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Split String by Space',
    text: 'Split the string into words by spaces.',
    setup: 'let sentence = "Hello World Rust";',
    setupCode: 'let sentence = "Hello World Rust";',
    expected: ['Hello', 'World', 'Rust'],
    sample: 'sentence.split(\' \').collect::<Vec<_>>()',
    hints: ['split takes a pattern', 'Collect results into a vector'],
    validPatterns: [/\.split\s*\(/, /\.collect\s*::\s*<\s*Vec/],
    tags: ['split', 'strings', 'basics'],
  },
  {
    id: 'rust-string-005',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Check String Contains',
    text: 'Check if the string contains "Rust".',
    setup: 'let text = "I love Rust programming";',
    setupCode: 'let text = "I love Rust programming";',
    expected: true,
    sample: 'text.contains("Rust")',
    hints: ['contains() returns bool', 'Case-sensitive search'],
    validPatterns: [/\.contains\s*\(\s*["']Rust["']\s*\)/],
    tags: ['contains', 'strings', 'search'],
  },
  {
    id: 'rust-string-006',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'Split and Filter Empty',
    text: 'Split by comma and filter out empty strings.',
    setup: 'let text = "a,,b,c,,d";',
    setupCode: 'let text = "a,,b,c,,d";',
    expected: ['a', 'b', 'c', 'd'],
    sample: 'text.split(\',\').filter(|s| !s.is_empty()).collect::<Vec<_>>()',
    hints: ['Split creates empty strings between consecutive delimiters', 'Filter them out'],
    validPatterns: [/\.split\s*\(/, /\.filter\s*\(/, /is_empty/],
    tags: ['split', 'filter', 'strings'],
  },

  // ========================================
  // STRING METHODS - replace, trim
  // ========================================
  {
    id: 'rust-string-007',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Replace Substring',
    text: 'Replace "World" with "Rust" in the string.',
    setup: 'let text = "Hello World";',
    setupCode: 'let text = "Hello World";',
    expected: 'Hello Rust',
    sample: 'text.replace("World", "Rust")',
    hints: ['replace returns a new String', 'Original is unchanged'],
    validPatterns: [/\.replace\s*\(\s*["']World["']\s*,\s*["']Rust["']\s*\)/],
    tags: ['replace', 'strings', 'transformation'],
  },
  {
    id: 'rust-string-008',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Trim Whitespace',
    text: 'Remove leading and trailing whitespace from the string.',
    setup: 'let text = "   Hello World   ";',
    setupCode: 'let text = "   Hello World   ";',
    expected: 'Hello World',
    sample: 'text.trim()',
    hints: ['trim() removes whitespace from both ends', 'Returns a &str'],
    validPatterns: [/\.trim\s*\(\s*\)/],
    tags: ['trim', 'whitespace', 'strings'],
  },
  {
    id: 'rust-string-009',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'Replace All Occurrences',
    text: 'Replace all occurrences of "a" with "o".',
    setup: 'let text = "banana";',
    setupCode: 'let text = "banana";',
    expected: 'bonono',
    sample: 'text.replace("a", "o")',
    hints: ['replace replaces all occurrences by default', 'Returns a new String'],
    validPatterns: [/\.replace\s*\(\s*["']a["']\s*,\s*["']o["']\s*\)/],
    tags: ['replace', 'strings', 'all'],
  },

  // ========================================
  // STRING METHODS - to_uppercase, to_lowercase
  // ========================================
  {
    id: 'rust-string-010',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Convert to Uppercase',
    text: 'Convert the string to uppercase.',
    setup: 'let text = "hello rust";',
    setupCode: 'let text = "hello rust";',
    expected: 'HELLO RUST',
    sample: 'text.to_uppercase()',
    hints: ['to_uppercase() returns a new String', 'Original is unchanged'],
    validPatterns: [/\.to_uppercase\s*\(\s*\)/],
    tags: ['to_uppercase', 'strings', 'case'],
  },
  {
    id: 'rust-string-011',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Convert to Lowercase',
    text: 'Convert the string to lowercase.',
    setup: 'let text = "HELLO RUST";',
    setupCode: 'let text = "HELLO RUST";',
    expected: 'hello rust',
    sample: 'text.to_lowercase()',
    hints: ['to_lowercase() returns a new String', 'Handles Unicode properly'],
    validPatterns: [/\.to_lowercase\s*\(\s*\)/],
    tags: ['to_lowercase', 'strings', 'case'],
  },

  // ========================================
  // OPTION/RESULT HANDLING - unwrap, expect
  // ========================================
  {
    id: 'rust-option-001',
    category: 'Option/Result Handling',
    difficulty: 'easy',
    title: 'Unwrap Some Value',
    text: 'Extract the value from the Some variant.',
    setup: 'let maybe_num: Option<i32> = Some(42);',
    setupCode: 'let maybe_num: Option<i32> = Some(42);',
    expected: 42,
    sample: 'maybe_num.unwrap()',
    hints: ['unwrap extracts the inner value', 'Panics if None'],
    validPatterns: [/\.unwrap\s*\(\s*\)/],
    tags: ['unwrap', 'option', 'basics'],
  },
  {
    id: 'rust-option-002',
    category: 'Option/Result Handling',
    difficulty: 'easy',
    title: 'Use Expect with Message',
    text: 'Extract the value with a custom panic message.',
    setup: 'let maybe_num: Option<i32> = Some(42);',
    setupCode: 'let maybe_num: Option<i32> = Some(42);',
    expected: 42,
    sample: 'maybe_num.expect("Should have a number")',
    hints: ['expect is like unwrap with a message', 'Better for debugging'],
    validPatterns: [/\.expect\s*\(/],
    tags: ['expect', 'option', 'error-handling'],
  },
  {
    id: 'rust-option-003',
    category: 'Option/Result Handling',
    difficulty: 'easy',
    title: 'Unwrap Or Default',
    text: 'Get the value or return 0 if None.',
    setup: 'let maybe_num: Option<i32> = None;',
    setupCode: 'let maybe_num: Option<i32> = None;',
    expected: 0,
    sample: 'maybe_num.unwrap_or(0)',
    hints: ['unwrap_or provides a default value', 'Does not panic on None'],
    validPatterns: [/\.unwrap_or\s*\(\s*0\s*\)/],
    tags: ['unwrap_or', 'option', 'default'],
  },

  // ========================================
  // OPTION/RESULT HANDLING - map, and_then
  // ========================================
  {
    id: 'rust-option-004',
    category: 'Option/Result Handling',
    difficulty: 'medium',
    title: 'Map Option Value',
    text: 'Double the value inside the Option.',
    setup: 'let maybe_num: Option<i32> = Some(21);',
    setupCode: 'let maybe_num: Option<i32> = Some(21);',
    expected: 42,
    sample: 'maybe_num.map(|x| x * 2).unwrap()',
    hints: ['map transforms the inner value', 'Returns Option<T>'],
    validPatterns: [/\.map\s*\(\s*\|/, /\*\s*2/],
    tags: ['map', 'option', 'transformation'],
  },
  {
    id: 'rust-option-005',
    category: 'Option/Result Handling',
    difficulty: 'medium',
    title: 'Chain Options with and_then',
    text: 'Parse string to number, then double it if successful.',
    setup: 'let text = "21";',
    setupCode: 'let text = "21";',
    expected: 42,
    sample: 'text.parse::<i32>().ok().and_then(|x| Some(x * 2)).unwrap()',
    hints: ['and_then flattens nested Options', 'Closure must return Option'],
    validPatterns: [/\.and_then\s*\(\s*\|/, /\.parse/],
    tags: ['and_then', 'option', 'chaining'],
  },
  {
    id: 'rust-option-006',
    category: 'Option/Result Handling',
    difficulty: 'hard',
    title: 'Option Filter',
    text: 'Keep the value only if it is greater than 10.',
    setup: 'let maybe_num: Option<i32> = Some(15);',
    setupCode: 'let maybe_num: Option<i32> = Some(15);',
    expected: 15,
    sample: 'maybe_num.filter(|&x| x > 10).unwrap()',
    hints: ['filter returns None if predicate is false', 'Closure receives reference'],
    validPatterns: [/\.filter\s*\(\s*\|/, />\s*10/],
    tags: ['filter', 'option', 'conditional'],
  },

  // ========================================
  // OPTION/RESULT HANDLING - ok_or
  // ========================================
  {
    id: 'rust-option-007',
    category: 'Option/Result Handling',
    difficulty: 'medium',
    title: 'Convert Option to Result',
    text: 'Convert the Option to a Result with an error message.',
    setup: 'let maybe_num: Option<i32> = Some(42);',
    setupCode: 'let maybe_num: Option<i32> = Some(42);',
    expected: 42,
    sample: 'maybe_num.ok_or("No value found").unwrap()',
    hints: ['ok_or converts Option to Result', 'None becomes Err'],
    validPatterns: [/\.ok_or\s*\(/],
    tags: ['ok_or', 'option', 'result'],
  },
  {
    id: 'rust-option-008',
    category: 'Option/Result Handling',
    difficulty: 'hard',
    title: 'Result Map Error',
    text: 'Parse the string and convert parse error to custom error.',
    setup: 'let text = "42";',
    setupCode: 'let text = "42";',
    expected: 42,
    sample: 'text.parse::<i32>().map_err(|_| "Invalid number").unwrap()',
    hints: ['map_err transforms the error type', 'Useful for error conversion'],
    validPatterns: [/\.map_err\s*\(\s*\|/, /\.parse/],
    tags: ['map_err', 'result', 'error-handling'],
  },

  // ========================================
  // SLICE OPERATIONS - first, last
  // ========================================
  {
    id: 'rust-slice-001',
    category: 'Slice Operations',
    difficulty: 'easy',
    title: 'Get First Element',
    text: 'Get the first element of the slice.',
    setup: 'let numbers = [1, 2, 3, 4, 5];',
    setupCode: 'let numbers = [1, 2, 3, 4, 5];',
    expected: 1,
    sample: 'numbers.first().unwrap()',
    hints: ['first() returns Option<&T>', 'Returns None for empty slice'],
    validPatterns: [/\.first\s*\(\s*\)/],
    tags: ['first', 'slice', 'basics'],
  },
  {
    id: 'rust-slice-002',
    category: 'Slice Operations',
    difficulty: 'easy',
    title: 'Get Last Element',
    text: 'Get the last element of the slice.',
    setup: 'let numbers = [1, 2, 3, 4, 5];',
    setupCode: 'let numbers = [1, 2, 3, 4, 5];',
    expected: 5,
    sample: 'numbers.last().unwrap()',
    hints: ['last() returns Option<&T>', 'Safe way to get last element'],
    validPatterns: [/\.last\s*\(\s*\)/],
    tags: ['last', 'slice', 'basics'],
  },

  // ========================================
  // SLICE OPERATIONS - get
  // ========================================
  {
    id: 'rust-slice-003',
    category: 'Slice Operations',
    difficulty: 'easy',
    title: 'Safe Index Access',
    text: 'Get the element at index 2 safely.',
    setup: 'let numbers = [10, 20, 30, 40, 50];',
    setupCode: 'let numbers = [10, 20, 30, 40, 50];',
    expected: 30,
    sample: 'numbers.get(2).unwrap()',
    hints: ['get() returns Option<&T>', 'Does not panic on out of bounds'],
    validPatterns: [/\.get\s*\(\s*2\s*\)/],
    tags: ['get', 'slice', 'safe-access'],
  },
  {
    id: 'rust-slice-004',
    category: 'Slice Operations',
    difficulty: 'medium',
    title: 'Get Range of Elements',
    text: 'Get elements from index 1 to 3 (inclusive).',
    setup: 'let numbers = [10, 20, 30, 40, 50];',
    setupCode: 'let numbers = [10, 20, 30, 40, 50];',
    expected: [20, 30, 40],
    sample: 'numbers.get(1..4).unwrap().to_vec()',
    hints: ['get accepts Range types', 'Range end is exclusive'],
    validPatterns: [/\.get\s*\(\s*1\s*\.\.\s*4\s*\)/],
    tags: ['get', 'range', 'slice'],
  },

  // ========================================
  // SLICE OPERATIONS - split_at
  // ========================================
  {
    id: 'rust-slice-005',
    category: 'Slice Operations',
    difficulty: 'medium',
    title: 'Split Slice at Index',
    text: 'Split the slice at index 3 and return the first part.',
    setup: 'let numbers = [1, 2, 3, 4, 5, 6];',
    setupCode: 'let numbers = [1, 2, 3, 4, 5, 6];',
    expected: [1, 2, 3],
    sample: 'let (first, _) = numbers.split_at(3); first.to_vec()',
    hints: ['split_at returns a tuple of two slices', 'Index becomes start of second slice'],
    validPatterns: [/\.split_at\s*\(\s*3\s*\)/],
    tags: ['split_at', 'slice', 'partition'],
  },
  {
    id: 'rust-slice-006',
    category: 'Slice Operations',
    difficulty: 'medium',
    title: 'Split and Get Second Half',
    text: 'Split the slice in half and return the second half.',
    setup: 'let numbers = [1, 2, 3, 4, 5, 6];',
    setupCode: 'let numbers = [1, 2, 3, 4, 5, 6];',
    expected: [4, 5, 6],
    sample: 'let (_, second) = numbers.split_at(numbers.len() / 2); second.to_vec()',
    hints: ['Calculate midpoint with len() / 2', 'Second element of tuple is second half'],
    validPatterns: [/\.split_at\s*\(/, /\.len\s*\(\s*\)\s*\/\s*2/],
    tags: ['split_at', 'slice', 'midpoint'],
  },

  // ========================================
  // SLICE OPERATIONS - chunks
  // ========================================
  {
    id: 'rust-slice-007',
    category: 'Slice Operations',
    difficulty: 'medium',
    title: 'Split into Chunks',
    text: 'Split the slice into chunks of 2 elements.',
    setup: 'let numbers = [1, 2, 3, 4, 5, 6];',
    setupCode: 'let numbers = [1, 2, 3, 4, 5, 6];',
    expected: [[1, 2], [3, 4], [5, 6]],
    sample: 'numbers.chunks(2).map(|c| c.to_vec()).collect::<Vec<_>>()',
    hints: ['chunks() creates an iterator of slices', 'Last chunk may be smaller'],
    validPatterns: [/\.chunks\s*\(\s*2\s*\)/],
    tags: ['chunks', 'slice', 'partition'],
  },
  {
    id: 'rust-slice-008',
    category: 'Slice Operations',
    difficulty: 'hard',
    title: 'Windows Iterator',
    text: 'Create overlapping windows of size 3.',
    setup: 'let numbers = [1, 2, 3, 4, 5];',
    setupCode: 'let numbers = [1, 2, 3, 4, 5];',
    expected: [[1, 2, 3], [2, 3, 4], [3, 4, 5]],
    sample: 'numbers.windows(3).map(|w| w.to_vec()).collect::<Vec<_>>()',
    hints: ['windows() creates sliding windows', 'Each window overlaps with previous'],
    validPatterns: [/\.windows\s*\(\s*3\s*\)/],
    tags: ['windows', 'slice', 'sliding'],
  },

  // ========================================
  // HASHMAP METHODS - insert, get
  // ========================================
  {
    id: 'rust-hashmap-001',
    category: 'HashMap Methods',
    difficulty: 'easy',
    title: 'Insert into HashMap',
    text: 'Insert the key "name" with value "Alice" into the HashMap.',
    setup: 'let mut map: std::collections::HashMap<&str, &str> = std::collections::HashMap::new();',
    setupCode: 'let mut map: std::collections::HashMap<&str, &str> = std::collections::HashMap::new();',
    expected: { name: 'Alice' },
    sample: 'map.insert("name", "Alice"); map',
    hints: ['insert takes key and value', 'Returns Option with old value if key existed'],
    validPatterns: [/\.insert\s*\(\s*["']name["']\s*,\s*["']Alice["']\s*\)/],
    tags: ['insert', 'hashmap', 'basics'],
  },
  {
    id: 'rust-hashmap-002',
    category: 'HashMap Methods',
    difficulty: 'easy',
    title: 'Get from HashMap',
    text: 'Get the value associated with the key "age".',
    setup: `let mut map = std::collections::HashMap::new();
map.insert("name", "Alice");
map.insert("age", "30");`,
    setupCode: `let mut map = std::collections::HashMap::new();
map.insert("name", "Alice");
map.insert("age", "30");`,
    expected: '30',
    sample: 'map.get("age").unwrap()',
    hints: ['get returns Option<&V>', 'Use unwrap or pattern matching'],
    validPatterns: [/\.get\s*\(\s*["']age["']\s*\)/],
    tags: ['get', 'hashmap', 'lookup'],
  },

  // ========================================
  // HASHMAP METHODS - contains_key, remove
  // ========================================
  {
    id: 'rust-hashmap-003',
    category: 'HashMap Methods',
    difficulty: 'easy',
    title: 'Check Key Exists',
    text: 'Check if the HashMap contains the key "name".',
    setup: `let mut map = std::collections::HashMap::new();
map.insert("name", "Alice");`,
    setupCode: `let mut map = std::collections::HashMap::new();
map.insert("name", "Alice");`,
    expected: true,
    sample: 'map.contains_key("name")',
    hints: ['contains_key returns bool', 'Does not require unwrapping'],
    validPatterns: [/\.contains_key\s*\(\s*["']name["']\s*\)/],
    tags: ['contains_key', 'hashmap', 'check'],
  },
  {
    id: 'rust-hashmap-004',
    category: 'HashMap Methods',
    difficulty: 'medium',
    title: 'Remove from HashMap',
    text: 'Remove the key "age" and return its value.',
    setup: `let mut map = std::collections::HashMap::new();
map.insert("name", "Alice");
map.insert("age", "30");`,
    setupCode: `let mut map = std::collections::HashMap::new();
map.insert("name", "Alice");
map.insert("age", "30");`,
    expected: '30',
    sample: 'map.remove("age").unwrap()',
    hints: ['remove returns Option<V>', 'Key is no longer in map after removal'],
    validPatterns: [/\.remove\s*\(\s*["']age["']\s*\)/],
    tags: ['remove', 'hashmap', 'delete'],
  },

  // ========================================
  // HASHMAP METHODS - keys, values
  // ========================================
  {
    id: 'rust-hashmap-005',
    category: 'HashMap Methods',
    difficulty: 'medium',
    title: 'Get All Keys',
    text: 'Get all keys from the HashMap as a vector.',
    setup: `let mut map = std::collections::HashMap::new();
map.insert("a", 1);
map.insert("b", 2);
map.insert("c", 3);`,
    setupCode: `let mut map = std::collections::HashMap::new();
map.insert("a", 1);
map.insert("b", 2);
map.insert("c", 3);`,
    expected: ['a', 'b', 'c'],
    sample: 'let mut keys: Vec<_> = map.keys().collect(); keys.sort(); keys',
    hints: ['keys() returns an iterator', 'HashMap order is not guaranteed'],
    validPatterns: [/\.keys\s*\(\s*\)/],
    tags: ['keys', 'hashmap', 'iteration'],
  },
  {
    id: 'rust-hashmap-006',
    category: 'HashMap Methods',
    difficulty: 'medium',
    title: 'Get All Values',
    text: 'Get all values from the HashMap as a vector.',
    setup: `let mut map = std::collections::HashMap::new();
map.insert("a", 1);
map.insert("b", 2);
map.insert("c", 3);`,
    setupCode: `let mut map = std::collections::HashMap::new();
map.insert("a", 1);
map.insert("b", 2);
map.insert("c", 3);`,
    expected: [1, 2, 3],
    sample: 'let mut values: Vec<_> = map.values().cloned().collect(); values.sort(); values',
    hints: ['values() returns an iterator', 'Use cloned() to get owned values'],
    validPatterns: [/\.values\s*\(\s*\)/],
    tags: ['values', 'hashmap', 'iteration'],
  },

  // ========================================
  // ADVANCED/HARD PROBLEMS
  // ========================================
  {
    id: 'rust-advanced-001',
    category: 'Iterators',
    difficulty: 'hard',
    title: 'Chain Iterators',
    text: 'Combine two vectors using chain and collect.',
    setup: `let a = vec![1, 2, 3];
let b = vec![4, 5, 6];`,
    setupCode: `let a = vec![1, 2, 3];
let b = vec![4, 5, 6];`,
    expected: [1, 2, 3, 4, 5, 6],
    sample: 'a.iter().chain(b.iter()).cloned().collect::<Vec<_>>()',
    hints: ['chain concatenates two iterators', 'Both iterators must have same Item type'],
    validPatterns: [/\.chain\s*\(/],
    tags: ['chain', 'iterators', 'combine'],
  },
  {
    id: 'rust-advanced-002',
    category: 'Iterators',
    difficulty: 'hard',
    title: 'Filter Map Combo',
    text: 'Parse strings to numbers, keeping only successful parses.',
    setup: 'let strings = vec!["1", "two", "3", "four", "5"];',
    setupCode: 'let strings = vec!["1", "two", "3", "four", "5"];',
    expected: [1, 3, 5],
    sample: 'strings.iter().filter_map(|s| s.parse::<i32>().ok()).collect::<Vec<_>>()',
    hints: ['filter_map filters and transforms in one step', 'Returns only Some values'],
    validPatterns: [/\.filter_map\s*\(\s*\|/],
    tags: ['filter_map', 'parse', 'iterators'],
  },
  {
    id: 'rust-advanced-003',
    category: 'Iterators',
    difficulty: 'hard',
    title: 'Take While',
    text: 'Take elements while they are less than 5.',
    setup: 'let numbers = vec![1, 2, 3, 4, 5, 6, 7, 1, 2];',
    setupCode: 'let numbers = vec![1, 2, 3, 4, 5, 6, 7, 1, 2];',
    expected: [1, 2, 3, 4],
    sample: 'numbers.iter().take_while(|&&x| x < 5).cloned().collect::<Vec<_>>()',
    hints: ['take_while stops at first false', 'Does not continue after'],
    validPatterns: [/\.take_while\s*\(\s*\|/],
    tags: ['take_while', 'iterators', 'conditional'],
  },
  {
    id: 'rust-advanced-004',
    category: 'Iterators',
    difficulty: 'hard',
    title: 'Skip While',
    text: 'Skip elements while they are less than 5.',
    setup: 'let numbers = vec![1, 2, 3, 4, 5, 6, 7, 1, 2];',
    setupCode: 'let numbers = vec![1, 2, 3, 4, 5, 6, 7, 1, 2];',
    expected: [5, 6, 7, 1, 2],
    sample: 'numbers.iter().skip_while(|&&x| x < 5).cloned().collect::<Vec<_>>()',
    hints: ['skip_while skips until first false', 'Then takes everything after'],
    validPatterns: [/\.skip_while\s*\(\s*\|/],
    tags: ['skip_while', 'iterators', 'conditional'],
  },
  {
    id: 'rust-advanced-005',
    category: 'HashMap Methods',
    difficulty: 'hard',
    title: 'Entry API Insert or Modify',
    text: 'Increment the count for "apple" or insert 1 if not present.',
    setup: `let mut counts: std::collections::HashMap<&str, i32> = std::collections::HashMap::new();
counts.insert("banana", 2);`,
    setupCode: `let mut counts: std::collections::HashMap<&str, i32> = std::collections::HashMap::new();
counts.insert("banana", 2);`,
    expected: { banana: 2, apple: 1 },
    sample: '*counts.entry("apple").or_insert(0) += 1; counts',
    hints: ['entry() gives mutable access', 'or_insert returns mutable reference'],
    validPatterns: [/\.entry\s*\(/, /\.or_insert\s*\(/],
    tags: ['entry', 'hashmap', 'advanced'],
  },
  {
    id: 'rust-advanced-006',
    category: 'Iterators',
    difficulty: 'hard',
    title: 'Partition Vector',
    text: 'Partition numbers into even and odd vectors.',
    setup: 'let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8];',
    setupCode: 'let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8];',
    expected: [[2, 4, 6, 8], [1, 3, 5, 7]],
    sample: 'let (evens, odds): (Vec<_>, Vec<_>) = numbers.iter().partition(|&&x| x % 2 == 0); vec![evens.into_iter().cloned().collect::<Vec<_>>(), odds.into_iter().cloned().collect::<Vec<_>>()]',
    hints: ['partition splits by predicate', 'Returns tuple of two collections'],
    validPatterns: [/\.partition\s*\(\s*\|/],
    tags: ['partition', 'iterators', 'split'],
  },
  {
    id: 'rust-advanced-007',
    category: 'Iterators',
    difficulty: 'hard',
    title: 'Flatten Nested Vectors',
    text: 'Flatten a vector of vectors into a single vector.',
    setup: 'let nested = vec![vec![1, 2], vec![3, 4], vec![5, 6]];',
    setupCode: 'let nested = vec![vec![1, 2], vec![3, 4], vec![5, 6]];',
    expected: [1, 2, 3, 4, 5, 6],
    sample: 'nested.into_iter().flatten().collect::<Vec<_>>()',
    hints: ['flatten removes one level of nesting', 'Works on iterators of iterators'],
    validPatterns: [/\.flatten\s*\(\s*\)/],
    tags: ['flatten', 'iterators', 'nested'],
  },
  {
    id: 'rust-advanced-008',
    category: 'Iterators',
    difficulty: 'hard',
    title: 'Dedup Consecutive',
    text: 'Remove consecutive duplicate elements.',
    setup: 'let mut numbers = vec![1, 1, 2, 2, 2, 3, 3, 1, 1];',
    setupCode: 'let mut numbers = vec![1, 1, 2, 2, 2, 3, 3, 1, 1];',
    expected: [1, 2, 3, 1],
    sample: 'numbers.dedup(); numbers',
    hints: ['dedup removes consecutive duplicates only', 'Vector must be mutable'],
    validPatterns: [/\.dedup\s*\(\s*\)/],
    tags: ['dedup', 'vector', 'unique'],
  },

  // ========================================
  // ADVANCED ITERATOR PATTERNS - Easy (8)
  // ========================================

  {
    id: 'rust-iter-cycle-basic',
    category: 'Advanced Iterator Patterns',
    difficulty: 'easy',
    title: 'Cycle Through Elements',
    text: 'Use `.cycle()` to repeat the pattern [1, 2, 3] and take 8 elements.',
    setup: 'let pattern = vec![1, 2, 3];',
    setupCode: 'let pattern = vec![1, 2, 3];',
    expected: [1, 2, 3, 1, 2, 3, 1, 2],
    sample: 'pattern.iter().cycle().take(8).cloned().collect::<Vec<_>>()',
    hints: [
      'cycle() repeats the iterator infinitely',
      'Always use take() with cycle() to limit results',
      'cycle() requires the iterator to be Clone',
    ],
    validPatterns: [/\.cycle\s*\(\s*\)/, /\.cycle\s*\(\s*\)\.take\s*\(/],
    tags: ['cycle', 'repeat', 'infinite', 'iterator-adapter'],
  },

  {
    id: 'rust-iter-chain-basic',
    category: 'Advanced Iterator Patterns',
    difficulty: 'easy',
    title: 'Chain Three Iterators',
    text: 'Use `.chain()` twice to combine three vectors into a single sequence.',
    setup: 'let a = vec![1, 2];\nlet b = vec![3, 4];\nlet c = vec![5, 6];',
    setupCode: 'let a = vec![1, 2];\nlet b = vec![3, 4];\nlet c = vec![5, 6];',
    expected: [1, 2, 3, 4, 5, 6],
    sample: 'a.iter().chain(b.iter()).chain(c.iter()).cloned().collect::<Vec<_>>()',
    hints: [
      'chain() concatenates two iterators',
      'You can chain multiple times',
      'All iterators must yield the same type',
    ],
    validPatterns: [/\.chain\s*\(.*\.chain\s*\(/, /\.chain\s*\(/],
    tags: ['chain', 'concatenate', 'iterator-adapter', 'combine'],
  },

  {
    id: 'rust-iter-enumerate-transform',
    category: 'Advanced Iterator Patterns',
    difficulty: 'easy',
    title: 'Enumerate and Transform',
    text: 'Use `.enumerate()` and `.map()` to multiply each element by its index.',
    setup: 'let numbers = vec![10, 20, 30, 40];',
    setupCode: 'let numbers = vec![10, 20, 30, 40];',
    expected: [0, 20, 60, 120],
    sample: 'numbers.iter().enumerate().map(|(i, &x)| i as i32 * x).collect::<Vec<_>>()',
    hints: [
      'enumerate() gives (index, &element) tuples',
      'Cast index to appropriate type if needed',
      'Destructure tuple in closure parameters',
    ],
    validPatterns: [/\.enumerate\s*\(\s*\)\.map\s*\(/, /\.enumerate\s*\(\s*\)/],
    tags: ['enumerate', 'map', 'index', 'iterator-adapter'],
  },

  {
    id: 'rust-iter-skip-take-range',
    category: 'Advanced Iterator Patterns',
    difficulty: 'easy',
    title: 'Skip and Take for Pagination',
    text: 'Implement pagination: get page 2 (0-indexed) with page size 3.',
    setup: 'let items = vec!["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];',
    setupCode: 'let items = vec!["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];',
    expected: ['g', 'h', 'i'],
    sample: 'items.iter().skip(2 * 3).take(3).cloned().collect::<Vec<_>>()',
    hints: [
      'skip(page * page_size) to get to the right page',
      'take(page_size) to limit results',
      'This is a common pagination pattern',
    ],
    validPatterns: [/\.skip\s*\(.*\)\.take\s*\(/, /\.skip\s*\(\s*6\s*\)\.take\s*\(\s*3\s*\)/],
    tags: ['skip', 'take', 'pagination', 'iterator-adapter'],
  },

  {
    id: 'rust-iter-peekable-basic',
    category: 'Advanced Iterator Patterns',
    difficulty: 'easy',
    title: 'Peek at Next Without Consuming',
    text: 'Use `.peekable()` to check the next element without consuming it.',
    setup: 'let numbers = vec![1, 2, 3, 4, 5];',
    setupCode: 'let numbers = vec![1, 2, 3, 4, 5];',
    expected: [1, 2],
    sample: `let mut iter = numbers.iter().peekable();
let first = *iter.peek().unwrap();
let first_consumed = *iter.next().unwrap();
vec![first, first_consumed]`,
    hints: [
      'peekable() wraps iterator with peek capability',
      'peek() returns Option<&&T> without consuming',
      'next() still consumes the element',
    ],
    validPatterns: [/\.peekable\s*\(\s*\)/, /\.peek\s*\(\s*\)/],
    tags: ['peekable', 'peek', 'lookahead', 'iterator-adapter'],
  },

  {
    id: 'rust-iter-rev-enumerate',
    category: 'Advanced Iterator Patterns',
    difficulty: 'easy',
    title: 'Reverse with Original Indices',
    text: 'Enumerate first, then reverse to get elements with their original indices in reverse order.',
    setup: 'let letters = vec!["a", "b", "c", "d"];',
    setupCode: 'let letters = vec!["a", "b", "c", "d"];',
    expected: [[3, 'd'], [2, 'c'], [1, 'b'], [0, 'a']],
    sample: 'letters.iter().enumerate().rev().map(|(i, &s)| (i, s)).collect::<Vec<_>>()',
    hints: [
      'Order of enumerate() and rev() matters',
      'Enumerate first preserves original indices',
      'Vec iterators are double-ended so rev() works',
    ],
    validPatterns: [/\.enumerate\s*\(\s*\)\.rev\s*\(\s*\)/, /\.rev\s*\(\s*\)/],
    tags: ['enumerate', 'rev', 'reverse', 'iterator-adapter'],
  },

  {
    id: 'rust-iter-for-each-basic',
    category: 'Advanced Iterator Patterns',
    difficulty: 'easy',
    title: 'For Each Side Effect',
    text: 'Use `.for_each()` to print each element (simulate by collecting into a mutable vector).',
    setup: 'let numbers = vec![1, 2, 3, 4, 5];\nlet mut result = Vec::new();',
    setupCode: 'let numbers = vec![1, 2, 3, 4, 5];\nlet mut result = Vec::new();',
    expected: [2, 4, 6, 8, 10],
    sample: 'numbers.iter().for_each(|&x| result.push(x * 2)); result',
    hints: [
      'for_each() consumes the iterator with side effects',
      'Does not return anything (returns ())',
      'Useful for actions like printing or pushing',
    ],
    validPatterns: [/\.for_each\s*\(\s*\|/, /for_each\s*\(/],
    tags: ['for_each', 'consuming', 'side-effect', 'iterator'],
  },

  {
    id: 'rust-iter-filter-map-option',
    category: 'Advanced Iterator Patterns',
    difficulty: 'easy',
    title: 'Filter Map with Option',
    text: 'Use `.filter_map()` to extract Some values and discard None.',
    setup: 'let options = vec![Some(1), None, Some(2), None, Some(3)];',
    setupCode: 'let options = vec![Some(1), None, Some(2), None, Some(3)];',
    expected: [1, 2, 3],
    sample: 'options.into_iter().filter_map(|x| x).collect::<Vec<_>>()',
    hints: [
      'filter_map with identity function filters None',
      'Option implements IntoIterator',
      'This is equivalent to .flatten() for Options',
    ],
    validPatterns: [/\.filter_map\s*\(\s*\|x\|\s*x\s*\)/, /\.filter_map\s*\(/],
    tags: ['filter_map', 'Option', 'None', 'iterator-adapter'],
  },

  // ========================================
  // ADVANCED ITERATOR PATTERNS - Medium (12)
  // ========================================

  {
    id: 'rust-iter-skip-while-take-while',
    category: 'Advanced Iterator Patterns',
    difficulty: 'medium',
    title: 'Skip While Then Take While',
    text: 'Skip leading negative numbers, then take numbers until you hit a negative again.',
    setup: 'let numbers = vec![-1, -2, 3, 4, 5, -6, 7, 8];',
    setupCode: 'let numbers = vec![-1, -2, 3, 4, 5, -6, 7, 8];',
    expected: [3, 4, 5],
    sample: 'numbers.iter().skip_while(|&&x| x < 0).take_while(|&&x| x >= 0).cloned().collect::<Vec<_>>()',
    hints: [
      'skip_while skips while condition is true',
      'take_while takes while condition is true',
      'Both stop checking after first condition change',
    ],
    validPatterns: [/\.skip_while\s*\(.*\)\.take_while\s*\(/, /skip_while.*take_while/],
    tags: ['skip_while', 'take_while', 'predicate', 'iterator-adapter'],
  },

  {
    id: 'rust-iter-fold-hashmap',
    category: 'Advanced Iterator Patterns',
    difficulty: 'medium',
    title: 'Fold into HashMap for Counting',
    text: 'Use `.fold()` to count occurrences of each character.',
    setup: 'use std::collections::HashMap;\nlet chars = vec![\'a\', \'b\', \'a\', \'c\', \'b\', \'a\'];',
    setupCode: 'use std::collections::HashMap;\nlet chars = vec![\'a\', \'b\', \'a\', \'c\', \'b\', \'a\'];',
    expected: { a: 3, b: 2, c: 1 },
    sample: `chars.iter().fold(HashMap::new(), |mut acc, &c| {
    *acc.entry(c).or_insert(0) += 1;
    acc
})`,
    hints: [
      'fold can build any collection type',
      'Use entry().or_insert() for safe counting',
      'Return the accumulator at the end of closure',
    ],
    validPatterns: [/\.fold\s*\(\s*HashMap::new\s*\(\s*\)/, /fold.*entry.*or_insert/],
    tags: ['fold', 'HashMap', 'counting', 'consuming'],
  },

  {
    id: 'rust-iter-collect-result',
    category: 'Advanced Iterator Patterns',
    difficulty: 'medium',
    title: 'Collect Results Short-Circuit',
    text: 'Parse numbers from strings, returning Err on first parse failure.',
    setup: 'let strings = vec!["1", "2", "three", "4"];',
    setupCode: 'let strings = vec!["1", "2", "three", "4"];',
    expected: { Err: 'ParseIntError' },
    sample: 'strings.iter().map(|s| s.parse::<i32>()).collect::<Result<Vec<_>, _>>().map_err(|_| "ParseIntError")',
    hints: [
      'collect can transpose Iterator<Result> to Result<Collection>',
      'Short-circuits on first Err',
      'Returns Ok only if all items succeed',
    ],
    validPatterns: [/collect\s*::\s*<\s*Result\s*<\s*Vec/, /\.collect\s*::\s*<\s*Result/],
    tags: ['collect', 'Result', 'short-circuit', 'error-handling'],
  },

  {
    id: 'rust-iter-partition-result',
    category: 'Advanced Iterator Patterns',
    difficulty: 'medium',
    title: 'Partition Results into Ok and Err',
    text: 'Parse strings, collecting successful parses and failed strings separately.',
    setup: 'let strings = vec!["1", "two", "3", "four", "5"];',
    setupCode: 'let strings = vec!["1", "two", "3", "four", "5"];',
    expected: { ok: [1, 3, 5], err: ['two', 'four'] },
    sample: `let (ok, err): (Vec<_>, Vec<_>) = strings.iter()
    .map(|s| s.parse::<i32>().map_err(|_| *s))
    .partition(Result::is_ok);
let ok: Vec<_> = ok.into_iter().map(|r| r.unwrap()).collect();
let err: Vec<_> = err.into_iter().map(|r| r.unwrap_err()).collect();
(ok, err)`,
    hints: [
      'partition splits by predicate Result::is_ok',
      'Need to unwrap after partitioning',
      'map_err preserves the original string on failure',
    ],
    validPatterns: [/\.partition\s*\(\s*Result::is_ok\s*\)/, /partition.*Result/],
    tags: ['partition', 'Result', 'error-handling', 'iterator-adapter'],
  },

  {
    id: 'rust-iter-scan-running',
    category: 'Advanced Iterator Patterns',
    difficulty: 'medium',
    title: 'Running Maximum with Scan',
    text: 'Use `.scan()` to compute running maximum at each position.',
    setup: 'let numbers = vec![3, 1, 4, 1, 5, 9, 2, 6];',
    setupCode: 'let numbers = vec![3, 1, 4, 1, 5, 9, 2, 6];',
    expected: [3, 3, 4, 4, 5, 9, 9, 9],
    sample: 'numbers.iter().scan(i32::MIN, |max, &x| { *max = (*max).max(x); Some(*max) }).collect::<Vec<_>>()',
    hints: [
      'scan() maintains state across iterations',
      'First argument is initial state',
      'Use .max() for comparison or if-else',
    ],
    validPatterns: [/\.scan\s*\(\s*i32::MIN/, /\.scan\s*\(.*\.max\s*\(/],
    tags: ['scan', 'running', 'stateful', 'iterator-adapter'],
  },

  {
    id: 'rust-iter-flat-map-expand',
    category: 'Advanced Iterator Patterns',
    difficulty: 'medium',
    title: 'Flat Map to Expand Elements',
    text: 'Use `.flat_map()` to repeat each number n times (where n is the number itself).',
    setup: 'let numbers = vec![1, 2, 3];',
    setupCode: 'let numbers = vec![1, 2, 3];',
    expected: [1, 2, 2, 3, 3, 3],
    sample: 'numbers.iter().flat_map(|&n| std::iter::repeat(n).take(n as usize)).collect::<Vec<_>>()',
    hints: [
      'flat_map maps then flattens',
      'std::iter::repeat creates infinite iterator',
      'Combine with take() to limit',
    ],
    validPatterns: [/\.flat_map\s*\(/, /flat_map.*repeat.*take/],
    tags: ['flat_map', 'repeat', 'expand', 'iterator-adapter'],
  },

  {
    id: 'rust-iter-inspect-debug',
    category: 'Advanced Iterator Patterns',
    difficulty: 'medium',
    title: 'Debug Pipeline with Inspect',
    text: 'Use `.inspect()` to log values at each stage (collect log messages instead of printing).',
    setup: 'let numbers = vec![1, 2, 3, 4, 5];\nlet mut log = Vec::new();',
    setupCode: 'let numbers = vec![1, 2, 3, 4, 5];\nlet mut log = Vec::new();',
    expected: {
      result: [4, 16],
      log_count: 4,
    },
    sample: `let result: Vec<_> = numbers.iter()
    .inspect(|x| log.push(format!("input: {}", x)))
    .filter(|&&x| x % 2 == 0)
    .inspect(|x| log.push(format!("after filter: {}", x)))
    .map(|&x| x * x)
    .collect();
(result, log.len())`,
    hints: [
      'inspect() is for side effects without modifying',
      'Receives &Item reference',
      'Useful for debugging iterator chains',
    ],
    validPatterns: [/\.inspect\s*\(\s*\|/, /inspect.*filter.*inspect/],
    tags: ['inspect', 'debug', 'side-effect', 'iterator-adapter'],
  },

  {
    id: 'rust-iter-step-by-interleave',
    category: 'Advanced Iterator Patterns',
    difficulty: 'medium',
    title: 'Interleave with Step By',
    text: 'Get elements at odd indices using skip and step_by.',
    setup: 'let numbers = vec![0, 1, 2, 3, 4, 5, 6, 7, 8, 9];',
    setupCode: 'let numbers = vec![0, 1, 2, 3, 4, 5, 6, 7, 8, 9];',
    expected: [1, 3, 5, 7, 9],
    sample: 'numbers.iter().skip(1).step_by(2).cloned().collect::<Vec<_>>()',
    hints: [
      'skip(1) starts at index 1',
      'step_by(2) takes every 2nd element',
      'Combine to get odd indices',
    ],
    validPatterns: [/\.skip\s*\(\s*1\s*\)\.step_by\s*\(\s*2\s*\)/, /step_by\s*\(\s*2\s*\)/],
    tags: ['step_by', 'skip', 'indices', 'iterator-adapter'],
  },

  {
    id: 'rust-iter-zip-unzip',
    category: 'Advanced Iterator Patterns',
    difficulty: 'medium',
    title: 'Unzip Paired Data',
    text: 'Use `.unzip()` to separate a list of tuples into two vectors.',
    setup: 'let pairs = vec![(1, "a"), (2, "b"), (3, "c"), (4, "d")];',
    setupCode: 'let pairs = vec![(1, "a"), (2, "b"), (3, "c"), (4, "d")];',
    expected: { nums: [1, 2, 3, 4], letters: ['a', 'b', 'c', 'd'] },
    sample: 'let (nums, letters): (Vec<_>, Vec<_>) = pairs.into_iter().unzip(); (nums, letters)',
    hints: [
      'unzip is the inverse of zip',
      'Requires type annotation for both collections',
      'Works on iterator of tuples',
    ],
    validPatterns: [/\.unzip\s*\(\s*\)/, /:\s*\(Vec<_>,\s*Vec<_>\)\s*=.*\.unzip/],
    tags: ['unzip', 'zip', 'tuples', 'consuming'],
  },

  {
    id: 'rust-iter-try-fold-early-exit',
    category: 'Advanced Iterator Patterns',
    difficulty: 'medium',
    title: 'Try Fold with Early Exit',
    text: 'Use `.try_fold()` to sum numbers but stop if running sum exceeds 15.',
    setup: 'let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8];',
    setupCode: 'let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8];',
    expected: { Err: 'Sum exceeded 15 at 21' },
    sample: `numbers.iter().try_fold(0, |acc, &x| {
    let sum = acc + x;
    if sum > 15 {
        Err(format!("Sum exceeded 15 at {}", sum))
    } else {
        Ok(sum)
    }
})`,
    hints: [
      'try_fold allows early termination',
      'Return Err to stop iteration',
      'Return Ok(acc) to continue',
    ],
    validPatterns: [/\.try_fold\s*\(/, /try_fold.*Err\s*\(/],
    tags: ['try_fold', 'Result', 'early-exit', 'consuming'],
  },

  {
    id: 'rust-iter-collect-string',
    category: 'Advanced Iterator Patterns',
    difficulty: 'medium',
    title: 'Collect Chars into String',
    text: 'Filter vowels and collect back into a String.',
    setup: 'let text = "Hello World";',
    setupCode: 'let text = "Hello World";',
    expected: 'Hll Wrld',
    sample: 'text.chars().filter(|c| !"aeiouAEIOU".contains(*c)).collect::<String>()',
    hints: [
      'String implements FromIterator<char>',
      'chars() gives char iterator',
      'collect::<String>() joins without separator',
    ],
    validPatterns: [/\.collect\s*::\s*<\s*String\s*>/, /chars\(\).*filter.*collect/],
    tags: ['collect', 'String', 'chars', 'filter'],
  },

  {
    id: 'rust-iter-peekable-group',
    category: 'Advanced Iterator Patterns',
    difficulty: 'medium',
    title: 'Group Consecutive with Peekable',
    text: 'Use `.peekable()` to count consecutive equal elements.',
    setup: 'let chars = vec![\'a\', \'a\', \'b\', \'b\', \'b\', \'c\'];',
    setupCode: 'let chars = vec![\'a\', \'a\', \'b\', \'b\', \'b\', \'c\'];',
    expected: [['a', 2], ['b', 3], ['c', 1]],
    sample: `let mut iter = chars.iter().peekable();
let mut result = Vec::new();
while let Some(&ch) = iter.next() {
    let mut count = 1;
    while iter.peek() == Some(&&ch) {
        iter.next();
        count += 1;
    }
    result.push((ch, count));
}
result`,
    hints: [
      'peekable() lets you look ahead',
      'Use while loop with peek() to count runs',
      'peek() returns Option<&&T>',
    ],
    validPatterns: [/\.peekable\s*\(\s*\)/, /while.*peek\s*\(\s*\)\s*==/],
    tags: ['peekable', 'grouping', 'consecutive', 'iterator-adapter'],
  },

  // ========================================
  // ADVANCED ITERATOR PATTERNS - Hard (5)
  // ========================================

  {
    id: 'rust-iter-custom-fibonacci',
    category: 'Advanced Iterator Patterns',
    difficulty: 'hard',
    title: 'Custom Fibonacci Iterator',
    text: 'Implement a Fibonacci iterator struct that yields the sequence.',
    setup: '// Define Fibonacci struct implementing Iterator',
    setupCode: '// Define Fibonacci struct implementing Iterator',
    expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34],
    sample: `struct Fibonacci {
    curr: u64,
    next: u64,
}

impl Fibonacci {
    fn new() -> Self {
        Fibonacci { curr: 0, next: 1 }
    }
}

impl Iterator for Fibonacci {
    type Item = u64;

    fn next(&mut self) -> Option<Self::Item> {
        let current = self.curr;
        self.curr = self.next;
        self.next = current + self.next;
        Some(current)
    }
}

Fibonacci::new().take(10).collect::<Vec<_>>()`,
    hints: [
      'Implement Iterator trait with type Item',
      'Store state for curr and next values',
      'next() updates state and returns current',
    ],
    validPatterns: [/impl\s+Iterator\s+for/, /type\s+Item\s*=/, /fn\s+next\s*\(/],
    tags: ['custom-iterator', 'Iterator', 'fibonacci', 'trait'],
  },

  {
    id: 'rust-iter-rayon-parallel-sum',
    category: 'Advanced Iterator Patterns',
    difficulty: 'hard',
    title: 'Parallel Sum with Rayon',
    text: 'Use rayon parallel iterators to sum a large vector in parallel.',
    setup: 'use rayon::prelude::*;\nlet numbers: Vec<i64> = (1..=1_000_000).collect();',
    setupCode: 'use rayon::prelude::*;\nlet numbers: Vec<i64> = (1..=1_000_000).collect();',
    expected: 500000500000,
    sample: 'numbers.par_iter().sum::<i64>()',
    hints: [
      'rayon::prelude::* brings par_iter into scope',
      'par_iter() creates parallel iterator',
      'sum() works on parallel iterators',
    ],
    validPatterns: [/\.par_iter\s*\(\s*\)\.sum/, /par_iter\(\)/],
    tags: ['rayon', 'parallel', 'sum', 'performance'],
  },

  {
    id: 'rust-iter-rayon-parallel-filter-map',
    category: 'Advanced Iterator Patterns',
    difficulty: 'hard',
    title: 'Parallel Filter Map with Rayon',
    text: 'Use rayon to filter even numbers and square them in parallel.',
    setup: 'use rayon::prelude::*;\nlet numbers: Vec<i64> = (1..=100).collect();',
    setupCode: 'use rayon::prelude::*;\nlet numbers: Vec<i64> = (1..=100).collect();',
    expected: 'Sum of squares of even numbers 1-100',
    sample: 'numbers.par_iter().filter(|&&x| x % 2 == 0).map(|&x| x * x).sum::<i64>()',
    hints: [
      'Parallel iterators support filter and map',
      'Order may differ but result is same',
      'Chain operations as with regular iterators',
    ],
    validPatterns: [/\.par_iter\s*\(\s*\)\.filter/, /par_iter.*filter.*map/],
    tags: ['rayon', 'parallel', 'filter', 'map', 'performance'],
  },

  {
    id: 'rust-iter-complex-pipeline',
    category: 'Advanced Iterator Patterns',
    difficulty: 'hard',
    title: 'Complex Data Processing Pipeline',
    text: 'Parse CSV-like data, filter valid rows, transform, and aggregate.',
    setup: `let data = vec![
    "Alice,30,Engineering",
    "Bob,invalid,Sales",
    "Carol,25,Engineering",
    "Dave,35,Marketing",
    "Eve,28,Engineering",
];`,
    setupCode: `let data = vec![
    "Alice,30,Engineering",
    "Bob,invalid,Sales",
    "Carol,25,Engineering",
    "Dave,35,Marketing",
    "Eve,28,Engineering",
];`,
    expected: { engineering_avg_age: 27, count: 3 },
    sample: `use std::collections::HashMap;

let result: Vec<_> = data.iter()
    .filter_map(|line| {
        let parts: Vec<&str> = line.split(',').collect();
        if parts.len() == 3 {
            parts[1].parse::<i32>().ok().map(|age| (parts[0], age, parts[2]))
        } else {
            None
        }
    })
    .filter(|(_, _, dept)| *dept == "Engineering")
    .collect();

let count = result.len();
let sum: i32 = result.iter().map(|(_, age, _)| age).sum();
let avg = if count > 0 { sum / count as i32 } else { 0 };
(avg, count)`,
    hints: [
      'Use filter_map to parse and filter invalid rows',
      'Split string and destructure result',
      'Chain filter for department',
      'Aggregate with map and sum',
    ],
    validPatterns: [/filter_map.*split.*parse/, /\.filter_map\s*\(.*\.filter\s*\(/],
    tags: ['filter_map', 'complex', 'pipeline', 'parsing', 'aggregation'],
  },

  {
    id: 'rust-iter-windows-patterns',
    category: 'Advanced Iterator Patterns',
    difficulty: 'hard',
    title: 'Find Patterns with Windows',
    text: 'Use `.windows()` to find all indices where three consecutive numbers are increasing.',
    setup: 'let numbers = vec![1, 3, 2, 4, 6, 5, 7, 8, 9, 3];',
    setupCode: 'let numbers = vec![1, 3, 2, 4, 6, 5, 7, 8, 9, 3];',
    expected: [2, 6, 7],
    sample: `numbers.windows(3)
    .enumerate()
    .filter(|(_, w)| w[0] < w[1] && w[1] < w[2])
    .map(|(i, _)| i)
    .collect::<Vec<_>>()`,
    hints: [
      'windows(3) gives overlapping 3-element slices',
      'enumerate() to track starting index',
      'Filter for strictly increasing pattern',
    ],
    validPatterns: [/\.windows\s*\(\s*3\s*\)\.enumerate\s*\(\s*\)/, /windows.*filter.*map/],
    tags: ['windows', 'enumerate', 'pattern', 'sliding-window'],
  },

  // ========================================
  // STRING OPERATIONS - String vs &str (Easy)
  // ========================================
  {
    id: 'rust-str-001',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Convert &str to String',
    text: 'Convert the string slice to an owned String.',
    setup: 'let slice: &str = "hello";',
    setupCode: 'let slice: &str = "hello";',
    expected: 'hello',
    sample: 'slice.to_string()',
    hints: [
      'Use .to_string() or String::from()',
      '&str is borrowed, String is owned',
      '.to_owned() also works',
    ],
    validPatterns: [/\.to_string\s*\(\s*\)/, /String::from\s*\(/, /\.to_owned\s*\(\s*\)/],
    tags: ['string', 'str', 'conversion', 'basics'],
  },
  {
    id: 'rust-str-002',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Convert String to &str',
    text: 'Borrow the String as a string slice.',
    setup: 'let owned = String::from("hello");',
    setupCode: 'let owned = String::from("hello");',
    expected: 'hello',
    sample: 'owned.as_str()',
    hints: [
      'Use .as_str() for explicit conversion',
      'Deref coercion also works: &owned',
      'String automatically derefs to &str',
    ],
    validPatterns: [/\.as_str\s*\(\s*\)/, /&\s*owned/],
    tags: ['string', 'str', 'borrowing', 'basics'],
  },
  {
    id: 'rust-str-003',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Create String with Capacity',
    text: 'Create a new String with pre-allocated capacity for 100 bytes.',
    setup: '// Create a String that can hold at least 100 bytes without reallocating',
    setupCode: '// Create a String that can hold at least 100 bytes without reallocating',
    expected: 0,
    sample: 'let s = String::with_capacity(100); s.len()',
    hints: [
      'String::with_capacity(n) pre-allocates memory',
      'Capacity is not the same as length',
      'Use .capacity() to check allocated size',
    ],
    validPatterns: [/String::with_capacity\s*\(\s*100\s*\)/],
    tags: ['string', 'capacity', 'allocation', 'basics'],
  },

  // ========================================
  // STRING OPERATIONS - push_str, insert, remove (Easy/Medium)
  // ========================================
  {
    id: 'rust-str-004',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Append String with push_str',
    text: 'Append " World" to the existing String.',
    setup: 'let mut s = String::from("Hello");',
    setupCode: 'let mut s = String::from("Hello");',
    expected: 'Hello World',
    sample: 's.push_str(" World"); s',
    hints: [
      'push_str appends a &str to the String',
      'The String must be mutable',
      'This modifies the String in place',
    ],
    validPatterns: [/\.push_str\s*\(\s*["'] World["']\s*\)/],
    tags: ['string', 'push_str', 'append', 'basics'],
  },
  {
    id: 'rust-str-005',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Push Single Character',
    text: 'Add an exclamation mark to the end of the String.',
    setup: 'let mut s = String::from("Hello");',
    setupCode: 'let mut s = String::from("Hello");',
    expected: 'Hello!',
    sample: "s.push('!'); s",
    hints: [
      'push adds a single char to the String',
      'Use single quotes for char literals',
      'Different from push_str which takes &str',
    ],
    validPatterns: [/\.push\s*\(\s*'!'\s*\)/],
    tags: ['string', 'push', 'char', 'basics'],
  },
  {
    id: 'rust-str-006',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Insert String at Position',
    text: 'Insert "beautiful " at byte index 7 (after "Hello, ").',
    setup: 'let mut s = String::from("Hello, world!");',
    setupCode: 'let mut s = String::from("Hello, world!");',
    expected: 'Hello, beautiful world!',
    sample: 's.insert_str(7, "beautiful "); s',
    hints: [
      'insert_str inserts a &str at byte index',
      'Index must be at a valid UTF-8 boundary',
      'Panics if index is out of bounds or not a char boundary',
    ],
    validPatterns: [/\.insert_str\s*\(\s*7\s*,\s*["']beautiful ["']\s*\)/],
    tags: ['string', 'insert_str', 'position', 'medium'],
  },
  {
    id: 'rust-str-007',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Remove Character at Index',
    text: 'Remove the character at byte index 5 (the comma).',
    setup: 'let mut s = String::from("Hello, World");',
    setupCode: 'let mut s = String::from("Hello, World");',
    expected: 'Hello World',
    sample: 's.remove(5); s',
    hints: [
      'remove() removes and returns the char at byte index',
      'Index must be at a valid char boundary',
      'This shifts all bytes after the removed char',
    ],
    validPatterns: [/\.remove\s*\(\s*5\s*\)/],
    tags: ['string', 'remove', 'char', 'medium'],
  },
  {
    id: 'rust-str-008',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Replace First Occurrence',
    text: 'Replace only the first occurrence of "a" with "o".',
    setup: 'let text = "banana";',
    setupCode: 'let text = "banana";',
    expected: 'bonana',
    sample: 'text.replacen("a", "o", 1)',
    hints: [
      'replacen limits the number of replacements',
      'Third argument is the maximum replacements',
      'Returns a new String',
    ],
    validPatterns: [/\.replacen\s*\(\s*["']a["']\s*,\s*["']o["']\s*,\s*1\s*\)/],
    tags: ['string', 'replacen', 'replace', 'medium'],
  },

  // ========================================
  // STRING OPERATIONS - Slicing and Borrowing (Easy/Medium)
  // ========================================
  {
    id: 'rust-str-009',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Slice First Five Bytes',
    text: 'Get the first 5 bytes of the string as a slice.',
    setup: 'let text = "Hello, World!";',
    setupCode: 'let text = "Hello, World!";',
    expected: 'Hello',
    sample: '&text[0..5]',
    hints: [
      'Use range syntax for slicing: [start..end]',
      'Slicing works on byte indices',
      'Be careful with UTF-8 multi-byte characters',
    ],
    validPatterns: [/&\s*text\s*\[\s*0\s*\.\.\s*5\s*\]/, /&\s*text\s*\[\s*\.\.\s*5\s*\]/],
    tags: ['string', 'slice', 'range', 'basics'],
  },
  {
    id: 'rust-str-010',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Slice from Middle to End',
    text: 'Get the substring starting from byte index 7 to the end.',
    setup: 'let text = "Hello, World!";',
    setupCode: 'let text = "Hello, World!";',
    expected: 'World!',
    sample: '&text[7..]',
    hints: [
      'Omit the end index to slice to the end',
      '[7..] means from index 7 to the end',
      'Remember indices are byte-based',
    ],
    validPatterns: [/&\s*text\s*\[\s*7\s*\.\.\s*\]/],
    tags: ['string', 'slice', 'range', 'medium'],
  },
  {
    id: 'rust-str-011',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Safe String Slicing with get',
    text: 'Safely get bytes 0..5 from the string, returning None if invalid.',
    setup: 'let text = "Hello, World!";',
    setupCode: 'let text = "Hello, World!";',
    expected: 'Hello',
    sample: 'text.get(0..5).unwrap()',
    hints: [
      '.get() returns Option<&str> for safe slicing',
      'Returns None if indices are invalid or not char boundaries',
      'Safer than direct indexing which can panic',
    ],
    validPatterns: [/\.get\s*\(\s*0\s*\.\.\s*5\s*\)/],
    tags: ['string', 'get', 'safe', 'option', 'medium'],
  },

  // ========================================
  // STRING OPERATIONS - Char Iteration (Easy/Medium/Hard)
  // ========================================
  {
    id: 'rust-str-012',
    category: 'String Operations',
    difficulty: 'hard',
    title: 'Count Vowels with chars',
    text: 'Count the number of vowels (a, e, i, o, u) in the string using iterator chain.',
    setup: 'let text = "Hello World";',
    setupCode: 'let text = "Hello World";',
    expected: 3,
    sample: 'text.chars().filter(|c| "aeiouAEIOU".contains(*c)).count()',
    hints: [
      'Use .chars() to iterate over Unicode characters',
      'Filter chars that match vowels',
      'Use .count() to get the total',
    ],
    validPatterns: [/\.chars\s*\(\s*\)/, /\.filter\s*\(/, /\.count\s*\(\s*\)/],
    tags: ['string', 'chars', 'filter', 'count', 'hard'],
  },
  {
    id: 'rust-str-013',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Reverse String via chars',
    text: 'Reverse the characters in the string.',
    setup: 'let text = "Hello";',
    setupCode: 'let text = "Hello";',
    expected: 'olleH',
    sample: 'text.chars().rev().collect::<String>()',
    hints: [
      '.chars() gives character iterator',
      '.rev() reverses the iterator',
      'Collect into String',
    ],
    validPatterns: [/\.chars\s*\(\s*\)/, /\.rev\s*\(\s*\)/, /\.collect\s*::\s*<\s*String\s*>/],
    tags: ['string', 'chars', 'reverse', 'medium'],
  },
  {
    id: 'rust-str-014',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Enumerate Characters with Indices',
    text: 'Get tuples of (byte_index, char) for each character.',
    setup: 'let text = "Hi!";',
    setupCode: 'let text = "Hi!";',
    expected: [[0, 'H'], [1, 'i'], [2, '!']],
    sample: 'text.char_indices().collect::<Vec<_>>()',
    hints: [
      '.char_indices() gives (byte_index, char) pairs',
      'Useful when you need both position and character',
      'Byte index may not equal char index for multi-byte chars',
    ],
    validPatterns: [/\.char_indices\s*\(\s*\)/],
    tags: ['string', 'char_indices', 'enumerate', 'medium'],
  },
  {
    id: 'rust-str-015',
    category: 'String Operations',
    difficulty: 'hard',
    title: 'Get Nth Character',
    text: 'Get the 3rd character (index 2) from the string.',
    setup: 'let text = "Hello";',
    setupCode: 'let text = "Hello";',
    expected: 'l',
    sample: 'text.chars().nth(2).unwrap()',
    hints: [
      '.nth(n) returns the nth element from iterator',
      'Returns Option<char>',
      'O(n) complexity for strings (no random access)',
    ],
    validPatterns: [/\.chars\s*\(\s*\)/, /\.nth\s*\(\s*2\s*\)/],
    tags: ['string', 'chars', 'nth', 'hard'],
  },

  // ========================================
  // STRING OPERATIONS - Unicode Handling (Medium/Hard)
  // ========================================
  {
    id: 'rust-str-016',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Count Unicode Characters',
    text: 'Count the actual characters in a string with emoji.',
    setup: 'let text = "Hi! \\u{1F44B}\\u{1F3FD}";',
    setupCode: 'let text = "Hi! \\u{1F44B}\\u{1F3FD}";',
    expected: 5,
    sample: 'text.chars().count()',
    hints: [
      '.len() returns bytes, not characters',
      '.chars().count() returns Unicode scalar values',
      'Emoji may be multiple Unicode scalars',
    ],
    validPatterns: [/\.chars\s*\(\s*\)/, /\.count\s*\(\s*\)/],
    tags: ['string', 'unicode', 'chars', 'count', 'medium'],
  },
  {
    id: 'rust-str-017',
    category: 'String Operations',
    difficulty: 'hard',
    title: 'Check if String is ASCII',
    text: 'Check if the string contains only ASCII characters.',
    setup: 'let text = "Hello World";',
    setupCode: 'let text = "Hello World";',
    expected: true,
    sample: 'text.is_ascii()',
    hints: [
      '.is_ascii() checks all bytes are ASCII',
      'ASCII is single-byte subset of UTF-8',
      'Returns false if any non-ASCII character exists',
    ],
    validPatterns: [/\.is_ascii\s*\(\s*\)/],
    tags: ['string', 'ascii', 'unicode', 'hard'],
  },
  {
    id: 'rust-str-018',
    category: 'String Operations',
    difficulty: 'hard',
    title: 'Iterate Bytes vs Chars',
    text: 'Get the byte length difference between bytes and chars for a Unicode string.',
    setup: 'let text = "cafe\\u{0301}";  // "cafe" with combining accent',
    setupCode: 'let text = "cafe\\u{0301}";  // "cafe" with combining accent',
    expected: 1,
    sample: 'text.len() - text.chars().count()',
    hints: [
      '.len() counts bytes',
      '.chars().count() counts Unicode scalar values',
      'Multi-byte characters create the difference',
    ],
    validPatterns: [/\.len\s*\(\s*\)/, /\.chars\s*\(\s*\)/, /\.count\s*\(\s*\)/],
    tags: ['string', 'unicode', 'bytes', 'hard'],
  },

  // ========================================
  // STRING OPERATIONS - Parsing (Easy/Medium)
  // ========================================
  {
    id: 'rust-str-019',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Parse String to Integer',
    text: 'Parse the string as an i32 integer.',
    setup: 'let text = "42";',
    setupCode: 'let text = "42";',
    expected: 42,
    sample: 'text.parse::<i32>().unwrap()',
    hints: [
      'Use .parse::<T>() with turbofish syntax',
      'Returns Result<T, ParseError>',
      'Type annotation required',
    ],
    validPatterns: [/\.parse\s*::\s*<\s*i32\s*>\s*\(\s*\)/],
    tags: ['string', 'parse', 'integer', 'basics'],
  },
  {
    id: 'rust-str-020',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Parse with Default on Error',
    text: 'Parse the string as i32, returning 0 if parsing fails.',
    setup: 'let text = "not_a_number";',
    setupCode: 'let text = "not_a_number";',
    expected: 0,
    sample: 'text.parse::<i32>().unwrap_or(0)',
    hints: [
      '.unwrap_or(default) provides fallback value',
      'Parsing invalid strings returns Err',
      'No panic on parse failure',
    ],
    validPatterns: [/\.parse\s*::\s*<\s*i32\s*>\s*\(\s*\)/, /\.unwrap_or\s*\(\s*0\s*\)/],
    tags: ['string', 'parse', 'unwrap_or', 'medium'],
  },
  {
    id: 'rust-str-021',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Parse Float from String',
    text: 'Parse the string as a f64 floating point number.',
    setup: 'let text = "3.14159";',
    setupCode: 'let text = "3.14159";',
    expected: 3.14159,
    sample: 'text.parse::<f64>().unwrap()',
    hints: [
      'Same parse method works for f32 and f64',
      'Handles decimal points and scientific notation',
      'Returns Result like integer parsing',
    ],
    validPatterns: [/\.parse\s*::\s*<\s*f64\s*>\s*\(\s*\)/],
    tags: ['string', 'parse', 'float', 'medium'],
  },

  // ========================================
  // STRING OPERATIONS - Format Macros (Easy/Medium/Hard)
  // ========================================
  {
    id: 'rust-str-022',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Format String with Variables',
    text: 'Create a formatted string with name and age.',
    setup: 'let name = "Alice"; let age = 30;',
    setupCode: 'let name = "Alice"; let age = 30;',
    expected: 'Alice is 30 years old',
    sample: 'format!("{} is {} years old", name, age)',
    hints: [
      'format! macro creates a String',
      '{} is a placeholder for values',
      'Values are inserted in order',
    ],
    validPatterns: [/format!\s*\(/],
    tags: ['string', 'format', 'macro', 'basics'],
  },
  {
    id: 'rust-str-023',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Format with Named Arguments',
    text: 'Create a formatted string using named placeholders.',
    setup: 'let item = "apple"; let count = 5;',
    setupCode: 'let item = "apple"; let count = 5;',
    expected: '5 apples',
    sample: 'format!("{count} {item}s")',
    hints: [
      'Use {name} for named placeholders',
      'Variables in scope can be captured directly',
      'Rust 2021 supports captured identifiers',
    ],
    validPatterns: [/format!\s*\(\s*["']\{count\}|\{item\}/],
    tags: ['string', 'format', 'named', 'medium'],
  },
  {
    id: 'rust-str-024',
    category: 'String Operations',
    difficulty: 'hard',
    title: 'Format with Padding and Alignment',
    text: 'Format the number with leading zeros to width 5.',
    setup: 'let num = 42;',
    setupCode: 'let num = 42;',
    expected: '00042',
    sample: 'format!("{:0>5}", num)',
    hints: [
      '{:0>5} pads with 0, right-aligned, width 5',
      '> means right-align, < means left-align',
      'The fill character comes before alignment',
    ],
    validPatterns: [/format!\s*\(\s*["']\{:0>5\}["']/],
    tags: ['string', 'format', 'padding', 'hard'],
  },

  // ========================================
  // STRING OPERATIONS - Concatenation Patterns (Easy/Medium/Hard)
  // ========================================
  {
    id: 'rust-str-025',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Join Vector of Strings',
    text: 'Join the words with a space separator.',
    setup: 'let words = vec!["Hello", "beautiful", "world"];',
    setupCode: 'let words = vec!["Hello", "beautiful", "world"];',
    expected: 'Hello beautiful world',
    sample: 'words.join(" ")',
    hints: [
      '.join() concatenates with separator',
      'Works on slices of &str or String',
      'Returns an owned String',
    ],
    validPatterns: [/\.join\s*\(\s*["'] ["']\s*\)/],
    tags: ['string', 'join', 'concatenation', 'medium'],
  },
];

export default rustProblems;
