/**
 * Go coding drill problems
 * Covers Slice, String, Map, and Sort operations
 */

import type { Problem } from '../types';

export const goProblems: Problem[] = [
  // ============================================================
  // Slice Operations
  // ============================================================

  // append()
  {
    id: 'go-slice-append-1',
    category: 'Slice Operations',
    difficulty: 'easy',
    title: 'Append Element to Slice',
    text: 'Use `append()` to add the number 4 to the slice.',
    setup: 'numbers := []int{1, 2, 3}',
    setupCode: 'numbers := []int{1, 2, 3}',
    expected: [1, 2, 3, 4],
    sample: 'append(numbers, 4)',
    hints: ['append returns a new slice', 'First arg is slice, rest are elements to add'],
    validPatterns: [
      /append\s*\(\s*numbers\s*,\s*4\s*\)/,
    ],
    tags: ['append', 'add', 'slice'],
  },
  {
    id: 'go-slice-append-2',
    category: 'Slice Operations',
    difficulty: 'easy',
    title: 'Append Multiple Elements',
    text: 'Use `append()` to add 4, 5, and 6 to the slice.',
    setup: 'numbers := []int{1, 2, 3}',
    setupCode: 'numbers := []int{1, 2, 3}',
    expected: [1, 2, 3, 4, 5, 6],
    sample: 'append(numbers, 4, 5, 6)',
    hints: ['append can take multiple values', 'All values are added at the end'],
    validPatterns: [
      /append\s*\(\s*numbers\s*,\s*4\s*,\s*5\s*,\s*6\s*\)/,
    ],
    tags: ['append', 'variadic', 'slice'],
  },
  {
    id: 'go-slice-append-3',
    category: 'Slice Operations',
    difficulty: 'medium',
    title: 'Append Slice to Slice',
    text: 'Use `append()` with the spread operator to combine two slices.',
    setup: 'a := []int{1, 2}\nb := []int{3, 4}',
    setupCode: 'a := []int{1, 2}\nb := []int{3, 4}',
    expected: [1, 2, 3, 4],
    sample: 'append(a, b...)',
    hints: ['Use ... to spread a slice', 'This unpacks b into individual elements'],
    validPatterns: [
      /append\s*\(\s*a\s*,\s*b\s*\.\.\.\s*\)/,
    ],
    tags: ['append', 'spread', 'concat'],
  },

  // len() / cap()
  {
    id: 'go-slice-len-1',
    category: 'Slice Operations',
    difficulty: 'easy',
    title: 'Get Slice Length',
    text: 'Use `len()` to get the number of elements in the slice.',
    setup: 'numbers := []int{10, 20, 30, 40, 50}',
    setupCode: 'numbers := []int{10, 20, 30, 40, 50}',
    expected: 5,
    sample: 'len(numbers)',
    hints: ['len() returns the number of elements'],
    validPatterns: [
      /len\s*\(\s*numbers\s*\)/,
    ],
    tags: ['len', 'length', 'size'],
  },
  {
    id: 'go-slice-cap-1',
    category: 'Slice Operations',
    difficulty: 'medium',
    title: 'Get Slice Capacity',
    text: 'Use `cap()` to get the capacity of the slice.',
    setup: 'numbers := make([]int, 3, 10)',
    setupCode: 'numbers := make([]int, 3, 10)',
    expected: 10,
    sample: 'cap(numbers)',
    hints: ['cap() returns the capacity', 'Capacity is max elements before reallocation'],
    validPatterns: [
      /cap\s*\(\s*numbers\s*\)/,
    ],
    tags: ['cap', 'capacity'],
  },

  // copy()
  {
    id: 'go-slice-copy-1',
    category: 'Slice Operations',
    difficulty: 'medium',
    title: 'Copy Slice Elements',
    text: 'Use `copy()` to copy elements from src to dst. Return number copied.',
    setup: 'src := []int{1, 2, 3}\ndst := make([]int, 3)',
    setupCode: 'src := []int{1, 2, 3}\ndst := make([]int, 3)',
    expected: 3,
    sample: 'copy(dst, src)',
    hints: ['copy(dst, src) copies from src to dst', 'Returns number of elements copied'],
    validPatterns: [
      /copy\s*\(\s*dst\s*,\s*src\s*\)/,
    ],
    tags: ['copy', 'duplicate'],
  },
  {
    id: 'go-slice-copy-2',
    category: 'Slice Operations',
    difficulty: 'medium',
    title: 'Partial Copy',
    text: 'Copy only 2 elements from src to dst using copy().',
    setup: 'src := []int{1, 2, 3, 4, 5}\ndst := make([]int, 2)',
    setupCode: 'src := []int{1, 2, 3, 4, 5}\ndst := make([]int, 2)',
    expected: 2,
    sample: 'copy(dst, src)',
    hints: ['copy copies min(len(dst), len(src)) elements', 'dst length limits the copy'],
    validPatterns: [
      /copy\s*\(\s*dst\s*,\s*src\s*\)/,
      /copy\s*\(\s*dst\s*,\s*src\[:2\]\s*\)/,
    ],
    tags: ['copy', 'partial'],
  },

  // slicing [start:end]
  {
    id: 'go-slice-slicing-1',
    category: 'Slice Operations',
    difficulty: 'easy',
    title: 'Slice from Index',
    text: 'Get elements from index 2 to the end of the slice.',
    setup: 'numbers := []int{10, 20, 30, 40, 50}',
    setupCode: 'numbers := []int{10, 20, 30, 40, 50}',
    expected: [30, 40, 50],
    sample: 'numbers[2:]',
    hints: ['[start:] gives elements from start to end', 'Index is 0-based'],
    validPatterns: [
      /numbers\s*\[\s*2\s*:\s*\]/,
    ],
    tags: ['slice', 'range'],
  },
  {
    id: 'go-slice-slicing-2',
    category: 'Slice Operations',
    difficulty: 'easy',
    title: 'Slice to Index',
    text: 'Get the first 3 elements of the slice.',
    setup: 'numbers := []int{10, 20, 30, 40, 50}',
    setupCode: 'numbers := []int{10, 20, 30, 40, 50}',
    expected: [10, 20, 30],
    sample: 'numbers[:3]',
    hints: ['[:end] gives elements from 0 to end-1', 'End index is exclusive'],
    validPatterns: [
      /numbers\s*\[\s*:\s*3\s*\]/,
    ],
    tags: ['slice', 'range'],
  },
  {
    id: 'go-slice-slicing-3',
    category: 'Slice Operations',
    difficulty: 'easy',
    title: 'Slice Range',
    text: 'Get elements from index 1 to 3 (exclusive).',
    setup: 'numbers := []int{10, 20, 30, 40, 50}',
    setupCode: 'numbers := []int{10, 20, 30, 40, 50}',
    expected: [20, 30],
    sample: 'numbers[1:3]',
    hints: ['[start:end] gives elements from start to end-1', 'Both indices are provided'],
    validPatterns: [
      /numbers\s*\[\s*1\s*:\s*3\s*\]/,
    ],
    tags: ['slice', 'range', 'subslice'],
  },
  {
    id: 'go-slice-slicing-4',
    category: 'Slice Operations',
    difficulty: 'medium',
    title: 'Get Last Element',
    text: 'Get the last element of the slice using len().',
    setup: 'numbers := []int{10, 20, 30, 40, 50}',
    setupCode: 'numbers := []int{10, 20, 30, 40, 50}',
    expected: 50,
    sample: 'numbers[len(numbers)-1]',
    hints: ['Use len() to get the length', 'Last index is len - 1'],
    validPatterns: [
      /numbers\s*\[\s*len\s*\(\s*numbers\s*\)\s*-\s*1\s*\]/,
    ],
    tags: ['slice', 'last', 'len'],
  },

  // make()
  {
    id: 'go-slice-make-1',
    category: 'Slice Operations',
    difficulty: 'easy',
    title: 'Create Slice with make',
    text: 'Use `make()` to create an int slice with length 5.',
    setup: '// Create a slice of 5 integers',
    setupCode: '// Create a slice of 5 integers',
    expected: [0, 0, 0, 0, 0],
    sample: 'make([]int, 5)',
    hints: ['make(type, length) creates a slice', 'Elements are initialized to zero value'],
    validPatterns: [
      /make\s*\(\s*\[\s*\]\s*int\s*,\s*5\s*\)/,
    ],
    tags: ['make', 'create', 'initialize'],
  },
  {
    id: 'go-slice-make-2',
    category: 'Slice Operations',
    difficulty: 'medium',
    title: 'Create Slice with Capacity',
    text: 'Use `make()` to create a string slice with length 3 and capacity 10.',
    setup: '// Create a slice with specific length and capacity',
    setupCode: '// Create a slice with specific length and capacity',
    expected: 'make([]string, 3, 10)',
    sample: 'make([]string, 3, 10)',
    hints: ['make(type, length, capacity)', 'Capacity pre-allocates memory'],
    validPatterns: [
      /make\s*\(\s*\[\s*\]\s*string\s*,\s*3\s*,\s*10\s*\)/,
    ],
    tags: ['make', 'capacity', 'preallocate'],
  },

  // ============================================================
  // String Operations
  // ============================================================

  // strings.Split() / strings.Join()
  {
    id: 'go-string-split-1',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Split String by Separator',
    text: 'Use `strings.Split()` to split the string by spaces.',
    setup: 'import "strings"\ns := "hello world go"',
    setupCode: 'import "strings"\ns := "hello world go"',
    expected: ['hello', 'world', 'go'],
    sample: 'strings.Split(s, " ")',
    hints: ['strings.Split(str, separator)', 'Returns a slice of strings'],
    validPatterns: [
      /strings\.Split\s*\(\s*s\s*,\s*["']\s*["']\s*\)/,
    ],
    tags: ['Split', 'tokenize', 'strings'],
  },
  {
    id: 'go-string-split-2',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Split by Comma',
    text: 'Use `strings.Split()` to split the CSV string.',
    setup: 'import "strings"\ncsv := "a,b,c,d"',
    setupCode: 'import "strings"\ncsv := "a,b,c,d"',
    expected: ['a', 'b', 'c', 'd'],
    sample: 'strings.Split(csv, ",")',
    hints: ['Use comma as separator'],
    validPatterns: [
      /strings\.Split\s*\(\s*csv\s*,\s*["'],["']\s*\)/,
    ],
    tags: ['Split', 'CSV'],
  },
  {
    id: 'go-string-join-1',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Join Strings with Separator',
    text: 'Use `strings.Join()` to combine the words with a dash.',
    setup: 'import "strings"\nwords := []string{"go", "is", "fun"}',
    setupCode: 'import "strings"\nwords := []string{"go", "is", "fun"}',
    expected: 'go-is-fun',
    sample: 'strings.Join(words, "-")',
    hints: ['strings.Join(slice, separator)', 'Returns a single string'],
    validPatterns: [
      /strings\.Join\s*\(\s*words\s*,\s*["']-["']\s*\)/,
    ],
    tags: ['Join', 'concatenate'],
  },

  // strings.Contains()
  {
    id: 'go-string-contains-1',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Check Substring',
    text: 'Use `strings.Contains()` to check if the string contains "world".',
    setup: 'import "strings"\ns := "hello world"',
    setupCode: 'import "strings"\ns := "hello world"',
    expected: true,
    sample: 'strings.Contains(s, "world")',
    hints: ['strings.Contains(str, substr)', 'Returns bool'],
    validPatterns: [
      /strings\.Contains\s*\(\s*s\s*,\s*["']world["']\s*\)/,
    ],
    tags: ['Contains', 'substring'],
  },

  // strings.HasPrefix() / strings.HasSuffix()
  {
    id: 'go-string-hasprefix-1',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Check String Prefix',
    text: 'Use `strings.HasPrefix()` to check if the string starts with "hello".',
    setup: 'import "strings"\ns := "hello world"',
    setupCode: 'import "strings"\ns := "hello world"',
    expected: true,
    sample: 'strings.HasPrefix(s, "hello")',
    hints: ['strings.HasPrefix(str, prefix)', 'Returns bool'],
    validPatterns: [
      /strings\.HasPrefix\s*\(\s*s\s*,\s*["']hello["']\s*\)/,
    ],
    tags: ['HasPrefix', 'prefix'],
  },
  {
    id: 'go-string-hassuffix-1',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Check String Suffix',
    text: 'Use `strings.HasSuffix()` to check if the string ends with ".go".',
    setup: 'import "strings"\nfilename := "main.go"',
    setupCode: 'import "strings"\nfilename := "main.go"',
    expected: true,
    sample: 'strings.HasSuffix(filename, ".go")',
    hints: ['strings.HasSuffix(str, suffix)', 'Returns bool'],
    validPatterns: [
      /strings\.HasSuffix\s*\(\s*filename\s*,\s*["']\.go["']\s*\)/,
    ],
    tags: ['HasSuffix', 'suffix'],
  },

  // strings.ToUpper() / strings.ToLower()
  {
    id: 'go-string-toupper-1',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Convert to Uppercase',
    text: 'Use `strings.ToUpper()` to convert the string to uppercase.',
    setup: 'import "strings"\ns := "hello"',
    setupCode: 'import "strings"\ns := "hello"',
    expected: 'HELLO',
    sample: 'strings.ToUpper(s)',
    hints: ['strings.ToUpper(str)', 'Returns uppercase string'],
    validPatterns: [
      /strings\.ToUpper\s*\(\s*s\s*\)/,
    ],
    tags: ['ToUpper', 'uppercase'],
  },
  {
    id: 'go-string-tolower-1',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Convert to Lowercase',
    text: 'Use `strings.ToLower()` to convert the string to lowercase.',
    setup: 'import "strings"\ns := "HELLO"',
    setupCode: 'import "strings"\ns := "HELLO"',
    expected: 'hello',
    sample: 'strings.ToLower(s)',
    hints: ['strings.ToLower(str)', 'Returns lowercase string'],
    validPatterns: [
      /strings\.ToLower\s*\(\s*s\s*\)/,
    ],
    tags: ['ToLower', 'lowercase'],
  },

  // strings.TrimSpace()
  {
    id: 'go-string-trimspace-1',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Trim Whitespace',
    text: 'Use `strings.TrimSpace()` to remove leading and trailing whitespace.',
    setup: 'import "strings"\ns := "  hello world  "',
    setupCode: 'import "strings"\ns := "  hello world  "',
    expected: 'hello world',
    sample: 'strings.TrimSpace(s)',
    hints: ['strings.TrimSpace(str)', 'Removes spaces, tabs, newlines'],
    validPatterns: [
      /strings\.TrimSpace\s*\(\s*s\s*\)/,
    ],
    tags: ['TrimSpace', 'trim'],
  },
  {
    id: 'go-string-trim-1',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Trim Specific Characters',
    text: 'Use `strings.Trim()` to remove leading/trailing dashes.',
    setup: 'import "strings"\ns := "--hello--"',
    setupCode: 'import "strings"\ns := "--hello--"',
    expected: 'hello',
    sample: 'strings.Trim(s, "-")',
    hints: ['strings.Trim(str, cutset)', 'cutset is characters to remove'],
    validPatterns: [
      /strings\.Trim\s*\(\s*s\s*,\s*["']-["']\s*\)/,
    ],
    tags: ['Trim', 'characters'],
  },

  // strings.Replace()
  {
    id: 'go-string-replace-1',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Replace All Occurrences',
    text: 'Use `strings.ReplaceAll()` to replace all spaces with underscores.',
    setup: 'import "strings"\ns := "hello world go"',
    setupCode: 'import "strings"\ns := "hello world go"',
    expected: 'hello_world_go',
    sample: 'strings.ReplaceAll(s, " ", "_")',
    hints: ['strings.ReplaceAll(str, old, new)', 'Replaces all occurrences'],
    validPatterns: [
      /strings\.ReplaceAll\s*\(\s*s\s*,\s*["']\s*["']\s*,\s*["']_["']\s*\)/,
      /strings\.Replace\s*\(\s*s\s*,\s*["']\s*["']\s*,\s*["']_["']\s*,\s*-1\s*\)/,
    ],
    tags: ['ReplaceAll', 'replace'],
  },
  {
    id: 'go-string-replace-2',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Replace First N Occurrences',
    text: 'Use `strings.Replace()` to replace only the first space.',
    setup: 'import "strings"\ns := "hello world go"',
    setupCode: 'import "strings"\ns := "hello world go"',
    expected: 'hello_world go',
    sample: 'strings.Replace(s, " ", "_", 1)',
    hints: ['strings.Replace(str, old, new, n)', 'n=1 replaces first occurrence'],
    validPatterns: [
      /strings\.Replace\s*\(\s*s\s*,\s*["']\s*["']\s*,\s*["']_["']\s*,\s*1\s*\)/,
    ],
    tags: ['Replace', 'first'],
  },

  // len() for strings
  {
    id: 'go-string-len-1',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Get String Length',
    text: 'Use `len()` to get the byte length of the string.',
    setup: 's := "hello"',
    setupCode: 's := "hello"',
    expected: 5,
    sample: 'len(s)',
    hints: ['len() returns byte count for strings', 'ASCII chars are 1 byte each'],
    validPatterns: [
      /len\s*\(\s*s\s*\)/,
    ],
    tags: ['len', 'length', 'bytes'],
  },
  {
    id: 'go-string-rune-count-1',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Count Unicode Characters',
    text: 'Use `utf8.RuneCountInString()` to count Unicode characters.',
    setup: 'import "unicode/utf8"\ns := "Hello"',
    setupCode: 'import "unicode/utf8"\ns := "Hello"',
    expected: 5,
    sample: 'utf8.RuneCountInString(s)',
    hints: ['RuneCountInString counts runes not bytes', 'Important for Unicode strings'],
    validPatterns: [
      /utf8\.RuneCountInString\s*\(\s*s\s*\)/,
      /len\s*\(\s*\[\s*\]\s*rune\s*\(\s*s\s*\)\s*\)/,
    ],
    tags: ['rune', 'unicode', 'count'],
  },

  // string conversion
  {
    id: 'go-string-convert-1',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Convert Int to String',
    text: 'Use `strconv.Itoa()` to convert an integer to a string.',
    setup: 'import "strconv"\nn := 42',
    setupCode: 'import "strconv"\nn := 42',
    expected: '42',
    sample: 'strconv.Itoa(n)',
    hints: ['strconv.Itoa = Integer to ASCII', 'Returns string representation'],
    validPatterns: [
      /strconv\.Itoa\s*\(\s*n\s*\)/,
      /fmt\.Sprintf\s*\(\s*["']%d["']\s*,\s*n\s*\)/,
    ],
    tags: ['Itoa', 'convert', 'strconv'],
  },
  {
    id: 'go-string-convert-2',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Convert String to Int',
    text: 'Use `strconv.Atoi()` to convert a string to an integer.',
    setup: 'import "strconv"\ns := "42"',
    setupCode: 'import "strconv"\ns := "42"',
    expected: 42,
    sample: 'strconv.Atoi(s)',
    hints: ['strconv.Atoi = ASCII to Integer', 'Returns (int, error)'],
    validPatterns: [
      /strconv\.Atoi\s*\(\s*s\s*\)/,
    ],
    tags: ['Atoi', 'parse', 'strconv'],
  },

  // ============================================================
  // Map Operations
  // ============================================================

  // make(map[K]V)
  {
    id: 'go-map-make-1',
    category: 'Map Operations',
    difficulty: 'easy',
    title: 'Create Map with make',
    text: 'Use `make()` to create a map with string keys and int values.',
    setup: '// Create an empty map',
    setupCode: '// Create an empty map',
    expected: 'make(map[string]int)',
    sample: 'make(map[string]int)',
    hints: ['make(map[KeyType]ValueType)', 'Creates an empty initialized map'],
    validPatterns: [
      /make\s*\(\s*map\s*\[\s*string\s*\]\s*int\s*\)/,
    ],
    tags: ['make', 'map', 'create'],
  },
  {
    id: 'go-map-literal-1',
    category: 'Map Operations',
    difficulty: 'easy',
    title: 'Map Literal',
    text: 'Create a map literal with "a": 1, "b": 2.',
    setup: '// Create a map with initial values',
    setupCode: '// Create a map with initial values',
    expected: { a: 1, b: 2 },
    sample: 'map[string]int{"a": 1, "b": 2}',
    hints: ['Use map[K]V{...} syntax', 'Key-value pairs separated by commas'],
    validPatterns: [
      /map\s*\[\s*string\s*\]\s*int\s*\{\s*["']a["']\s*:\s*1\s*,\s*["']b["']\s*:\s*2\s*\}/,
    ],
    tags: ['map', 'literal', 'initialize'],
  },

  // access / assignment
  {
    id: 'go-map-access-1',
    category: 'Map Operations',
    difficulty: 'easy',
    title: 'Access Map Value',
    text: 'Access the value for key "name" from the map.',
    setup: 'm := map[string]string{"name": "Alice", "city": "NYC"}',
    setupCode: 'm := map[string]string{"name": "Alice", "city": "NYC"}',
    expected: 'Alice',
    sample: 'm["name"]',
    hints: ['Use m[key] to access values', 'Returns zero value if key missing'],
    validPatterns: [
      /m\s*\[\s*["']name["']\s*\]/,
    ],
    tags: ['map', 'access', 'read'],
  },
  {
    id: 'go-map-access-2',
    category: 'Map Operations',
    difficulty: 'medium',
    title: 'Check Key Existence',
    text: 'Check if key "age" exists in the map using comma ok idiom.',
    setup: 'm := map[string]int{"name": 30}',
    setupCode: 'm := map[string]int{"name": 30}',
    expected: false,
    sample: '_, ok := m["age"]; ok',
    hints: ['Use v, ok := m[key]', 'ok is true if key exists'],
    validPatterns: [
      /_\s*,\s*ok\s*:=\s*m\s*\[\s*["']age["']\s*\]/,
      /if\s*_\s*,\s*ok\s*:=\s*m\s*\[\s*["']age["']\s*\]/,
    ],
    tags: ['map', 'exists', 'comma-ok'],
  },
  {
    id: 'go-map-assign-1',
    category: 'Map Operations',
    difficulty: 'easy',
    title: 'Assign Map Value',
    text: 'Set the value for key "score" to 100.',
    setup: 'm := make(map[string]int)',
    setupCode: 'm := make(map[string]int)',
    expected: { score: 100 },
    sample: 'm["score"] = 100',
    hints: ['Use m[key] = value', 'Creates or updates the key'],
    validPatterns: [
      /m\s*\[\s*["']score["']\s*\]\s*=\s*100/,
    ],
    tags: ['map', 'assign', 'set'],
  },

  // delete()
  {
    id: 'go-map-delete-1',
    category: 'Map Operations',
    difficulty: 'easy',
    title: 'Delete Map Entry',
    text: 'Use `delete()` to remove the "temp" key from the map.',
    setup: 'm := map[string]int{"score": 100, "temp": 50}',
    setupCode: 'm := map[string]int{"score": 100, "temp": 50}',
    expected: { score: 100 },
    sample: 'delete(m, "temp")',
    hints: ['delete(map, key)', 'No-op if key does not exist'],
    validPatterns: [
      /delete\s*\(\s*m\s*,\s*["']temp["']\s*\)/,
    ],
    tags: ['delete', 'remove', 'map'],
  },

  // range iteration
  {
    id: 'go-map-range-1',
    category: 'Map Operations',
    difficulty: 'medium',
    title: 'Iterate Map with range',
    text: 'Use `range` to iterate over map keys and values.',
    setup: 'm := map[string]int{"a": 1, "b": 2}',
    setupCode: 'm := map[string]int{"a": 1, "b": 2}',
    expected: 'for k, v := range m',
    sample: 'for k, v := range m { fmt.Println(k, v) }',
    hints: ['for key, value := range map', 'Order is not guaranteed'],
    validPatterns: [
      /for\s+\w+\s*,\s*\w+\s*:=\s*range\s+m/,
    ],
    tags: ['range', 'iterate', 'loop'],
  },
  {
    id: 'go-map-range-2',
    category: 'Map Operations',
    difficulty: 'medium',
    title: 'Iterate Map Keys Only',
    text: 'Use `range` to iterate over only the map keys.',
    setup: 'm := map[string]int{"a": 1, "b": 2}',
    setupCode: 'm := map[string]int{"a": 1, "b": 2}',
    expected: 'for k := range m',
    sample: 'for k := range m { fmt.Println(k) }',
    hints: ['for key := range map', 'Omit value variable'],
    validPatterns: [
      /for\s+\w+\s*:=\s*range\s+m/,
    ],
    tags: ['range', 'keys', 'loop'],
  },
  {
    id: 'go-map-len-1',
    category: 'Map Operations',
    difficulty: 'easy',
    title: 'Get Map Length',
    text: 'Use `len()` to get the number of entries in the map.',
    setup: 'm := map[string]int{"a": 1, "b": 2, "c": 3}',
    setupCode: 'm := map[string]int{"a": 1, "b": 2, "c": 3}',
    expected: 3,
    sample: 'len(m)',
    hints: ['len() works on maps', 'Returns number of key-value pairs'],
    validPatterns: [
      /len\s*\(\s*m\s*\)/,
    ],
    tags: ['len', 'size', 'map'],
  },

  // ============================================================
  // Sort Package
  // ============================================================

  // sort.Ints()
  {
    id: 'go-sort-ints-1',
    category: 'Sort Package',
    difficulty: 'easy',
    title: 'Sort Integer Slice',
    text: 'Use `sort.Ints()` to sort the slice in ascending order.',
    setup: 'import "sort"\nnumbers := []int{5, 2, 8, 1, 9}',
    setupCode: 'import "sort"\nnumbers := []int{5, 2, 8, 1, 9}',
    expected: [1, 2, 5, 8, 9],
    sample: 'sort.Ints(numbers)',
    hints: ['sort.Ints(slice)', 'Sorts in place, ascending order'],
    validPatterns: [
      /sort\.Ints\s*\(\s*numbers\s*\)/,
    ],
    tags: ['sort', 'Ints', 'ascending'],
  },
  {
    id: 'go-sort-ints-2',
    category: 'Sort Package',
    difficulty: 'medium',
    title: 'Sort Integers Descending',
    text: 'Sort the slice in descending order using sort.Sort with Reverse.',
    setup: 'import "sort"\nnumbers := []int{5, 2, 8, 1, 9}',
    setupCode: 'import "sort"\nnumbers := []int{5, 2, 8, 1, 9}',
    expected: [9, 8, 5, 2, 1],
    sample: 'sort.Sort(sort.Reverse(sort.IntSlice(numbers)))',
    hints: ['Use sort.Reverse() wrapper', 'IntSlice converts []int to sortable'],
    validPatterns: [
      /sort\.Sort\s*\(\s*sort\.Reverse\s*\(\s*sort\.IntSlice\s*\(\s*numbers\s*\)\s*\)\s*\)/,
    ],
    tags: ['sort', 'descending', 'Reverse'],
  },

  // sort.Strings()
  {
    id: 'go-sort-strings-1',
    category: 'Sort Package',
    difficulty: 'easy',
    title: 'Sort String Slice',
    text: 'Use `sort.Strings()` to sort the slice alphabetically.',
    setup: 'import "sort"\nwords := []string{"go", "python", "java", "rust"}',
    setupCode: 'import "sort"\nwords := []string{"go", "python", "java", "rust"}',
    expected: ['go', 'java', 'python', 'rust'],
    sample: 'sort.Strings(words)',
    hints: ['sort.Strings(slice)', 'Sorts alphabetically in place'],
    validPatterns: [
      /sort\.Strings\s*\(\s*words\s*\)/,
    ],
    tags: ['sort', 'Strings', 'alphabetical'],
  },

  // sort.Slice()
  {
    id: 'go-sort-slice-1',
    category: 'Sort Package',
    difficulty: 'medium',
    title: 'Custom Sort with sort.Slice',
    text: 'Use `sort.Slice()` to sort by string length (shortest first).',
    setup: 'import "sort"\nwords := []string{"golang", "is", "awesome"}',
    setupCode: 'import "sort"\nwords := []string{"golang", "is", "awesome"}',
    expected: ['is', 'golang', 'awesome'],
    sample: 'sort.Slice(words, func(i, j int) bool { return len(words[i]) < len(words[j]) })',
    hints: ['sort.Slice(slice, lessFn)', 'lessFn returns true if i should come before j'],
    validPatterns: [
      /sort\.Slice\s*\(\s*words\s*,\s*func\s*\(\s*i\s*,\s*j\s+int\s*\)\s*bool\s*\{\s*return\s+len\s*\(\s*words\s*\[\s*i\s*\]\s*\)\s*<\s*len\s*\(\s*words\s*\[\s*j\s*\]\s*\)/,
    ],
    tags: ['sort', 'Slice', 'custom'],
  },
  {
    id: 'go-sort-slice-2',
    category: 'Sort Package',
    difficulty: 'medium',
    title: 'Sort Structs by Field',
    text: 'Use `sort.Slice()` to sort people by age.',
    setup: 'import "sort"\ntype Person struct { Name string; Age int }\npeople := []Person{{"Alice", 30}, {"Bob", 25}, {"Carol", 35}}',
    setupCode: 'import "sort"\ntype Person struct { Name string; Age int }\npeople := []Person{{"Alice", 30}, {"Bob", 25}, {"Carol", 35}}',
    expected: [{ Name: 'Bob', Age: 25 }, { Name: 'Alice', Age: 30 }, { Name: 'Carol', Age: 35 }],
    sample: 'sort.Slice(people, func(i, j int) bool { return people[i].Age < people[j].Age })',
    hints: ['Access struct fields in comparison', 'Compare .Age for sorting'],
    validPatterns: [
      /sort\.Slice\s*\(\s*people\s*,\s*func\s*\(\s*i\s*,\s*j\s+int\s*\)\s*bool\s*\{\s*return\s+people\s*\[\s*i\s*\]\.Age\s*<\s*people\s*\[\s*j\s*\]\.Age/,
    ],
    tags: ['sort', 'struct', 'custom'],
  },

  // sort.SearchInts() - binary search
  {
    id: 'go-sort-search-1',
    category: 'Sort Package',
    difficulty: 'medium',
    title: 'Binary Search in Sorted Slice',
    text: 'Use `sort.SearchInts()` to find the index where 5 should be inserted.',
    setup: 'import "sort"\nnumbers := []int{1, 3, 5, 7, 9}',
    setupCode: 'import "sort"\nnumbers := []int{1, 3, 5, 7, 9}',
    expected: 2,
    sample: 'sort.SearchInts(numbers, 5)',
    hints: ['sort.SearchInts(slice, value)', 'Slice must be sorted', 'Returns insertion index'],
    validPatterns: [
      /sort\.SearchInts\s*\(\s*numbers\s*,\s*5\s*\)/,
    ],
    tags: ['search', 'binary', 'SearchInts'],
  },

  // sort.IsSorted()
  {
    id: 'go-sort-issorted-1',
    category: 'Sort Package',
    difficulty: 'easy',
    title: 'Check if Slice is Sorted',
    text: 'Use `sort.IntsAreSorted()` to check if the slice is sorted.',
    setup: 'import "sort"\nnumbers := []int{1, 2, 3, 4, 5}',
    setupCode: 'import "sort"\nnumbers := []int{1, 2, 3, 4, 5}',
    expected: true,
    sample: 'sort.IntsAreSorted(numbers)',
    hints: ['sort.IntsAreSorted(slice)', 'Returns true if ascending order'],
    validPatterns: [
      /sort\.IntsAreSorted\s*\(\s*numbers\s*\)/,
    ],
    tags: ['sort', 'check', 'IsSorted'],
  },

  // Additional utility problems
  {
    id: 'go-slice-remove-1',
    category: 'Slice Operations',
    difficulty: 'hard',
    title: 'Remove Element from Slice',
    text: 'Remove the element at index 2 from the slice.',
    setup: 'numbers := []int{1, 2, 3, 4, 5}',
    setupCode: 'numbers := []int{1, 2, 3, 4, 5}',
    expected: [1, 2, 4, 5],
    sample: 'append(numbers[:2], numbers[3:]...)',
    hints: ['Combine slice before and after index', 'Use append with spread operator'],
    validPatterns: [
      /append\s*\(\s*numbers\s*\[\s*:\s*2\s*\]\s*,\s*numbers\s*\[\s*3\s*:\s*\]\s*\.\.\.\s*\)/,
    ],
    tags: ['slice', 'remove', 'append'],
  },
  {
    id: 'go-slice-insert-1',
    category: 'Slice Operations',
    difficulty: 'hard',
    title: 'Insert Element into Slice',
    text: 'Insert 99 at index 2 in the slice.',
    setup: 'numbers := []int{1, 2, 3, 4}',
    setupCode: 'numbers := []int{1, 2, 3, 4}',
    expected: [1, 2, 99, 3, 4],
    sample: 'append(numbers[:2], append([]int{99}, numbers[2:]...)...)',
    hints: ['Create slice with new element', 'Append rest of original slice'],
    validPatterns: [
      /append\s*\(\s*numbers\s*\[\s*:\s*2\s*\]\s*,\s*append\s*\(\s*\[\s*\]\s*int\s*\{\s*99\s*\}\s*,\s*numbers\s*\[\s*2\s*:\s*\]\s*\.\.\.\s*\)\s*\.\.\.\s*\)/,
    ],
    tags: ['slice', 'insert', 'append'],
  },
];

export default goProblems;
