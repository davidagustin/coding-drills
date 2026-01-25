/**
 * Go Cheatsheet
 *
 * Essential Go methods and patterns for coding interviews.
 * Covers slices, maps, strings, sorting, and common idioms.
 */

import type { CheatsheetEntry } from './types';

export const goCheatsheet: CheatsheetEntry[] = [
  // ===== ARRAYS (SLICES) =====
  {
    name: 'make (slice)',
    category: 'arrays',
    syntax: 'make([]T, length, capacity)',
    description: 'Create a slice with specified length and optional capacity',
    example: {
      code: `s := make([]int, 5, 10)
fmt.Println(len(s), cap(s)) // 5 10`,
      output: '5 10',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    gotchas: ['Length is initialized to zero values', 'Capacity is optional, defaults to length'],
    interviewTip: 'Pre-allocate capacity when you know the final size to avoid reallocations',
    priority: 'essential',
  },
  {
    name: 'append',
    category: 'arrays',
    syntax: 'append(slice, elements...)',
    description: 'Append elements to a slice, returns new slice',
    example: {
      code: `s := []int{1, 2}
s = append(s, 3, 4)
fmt.Println(s) // [1 2 3 4]`,
      output: '[1 2 3 4]',
    },
    timeComplexity: 'O(1) amortized, O(n) when growing',
    spaceComplexity: 'O(1) amortized',
    gotchas: ['Must reassign result: s = append(s, x)', 'May allocate new backing array'],
    interviewTip: 'Append returns a new slice header; always capture the return value',
    priority: 'essential',
  },
  {
    name: 'copy',
    category: 'arrays',
    syntax: 'copy(dst, src)',
    description: 'Copy elements from src to dst slice, returns count copied',
    example: {
      code: `src := []int{1, 2, 3}
dst := make([]int, 3)
n := copy(dst, src)
fmt.Println(dst, n) // [1 2 3] 3`,
      output: '[1 2 3] 3',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    gotchas: ['Copies min(len(dst), len(src)) elements', 'dst must be pre-allocated'],
    interviewTip: 'Use copy to clone a slice and avoid shared backing array issues',
    priority: 'essential',
  },
  {
    name: 'len',
    category: 'arrays',
    syntax: 'len(slice)',
    description: 'Return the number of elements in a slice, array, map, string, or channel',
    example: {
      code: `s := []int{1, 2, 3}
fmt.Println(len(s)) // 3`,
      output: '3',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    interviewTip: 'len() is a built-in that works on multiple types',
    priority: 'essential',
  },
  {
    name: 'cap',
    category: 'arrays',
    syntax: 'cap(slice)',
    description: 'Return the capacity of a slice or array',
    example: {
      code: `s := make([]int, 3, 10)
fmt.Println(cap(s)) // 10`,
      output: '10',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: ['Capacity >= length always'],
    interviewTip: 'Understanding capacity helps optimize slice operations',
    priority: 'common',
  },
  {
    name: 'slice expression',
    category: 'arrays',
    syntax: 'slice[low:high] or slice[low:high:max]',
    description: 'Create a sub-slice from index low to high-1',
    example: {
      code: `s := []int{0, 1, 2, 3, 4}
fmt.Println(s[1:4]) // [1 2 3]
fmt.Println(s[:3])  // [0 1 2]
fmt.Println(s[2:])  // [2 3 4]`,
      output: '[1 2 3]\n[0 1 2]\n[2 3 4]',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: ['Shares backing array with original', 'Third index limits capacity'],
    interviewTip: 'Slicing creates a view, not a copy; modifications affect original',
    priority: 'essential',
  },
  {
    name: 'delete element (slice)',
    category: 'arrays',
    syntax: 'append(s[:i], s[i+1:]...)',
    description: 'Remove element at index i from slice',
    example: {
      code: `s := []int{1, 2, 3, 4}
i := 2
s = append(s[:i], s[i+1:]...)
fmt.Println(s) // [1 2 4]`,
      output: '[1 2 4]',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    gotchas: ['Modifies original slice', 'Order-preserving but slow'],
    interviewTip:
      'For unordered removal, swap with last element: s[i] = s[len(s)-1]; s = s[:len(s)-1]',
    priority: 'essential',
  },
  {
    name: 'insert element (slice)',
    category: 'arrays',
    syntax: 'append(s[:i], append([]T{x}, s[i:]...)...)',
    description: 'Insert element x at index i',
    example: {
      code: `s := []int{1, 2, 4}
i, x := 2, 3
s = append(s[:i], append([]int{x}, s[i:]...)...)
fmt.Println(s) // [1 2 3 4]`,
      output: '[1 2 3 4]',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    gotchas: ['Creates intermediate slice', 'Can use slices.Insert in Go 1.21+'],
    interviewTip: 'In Go 1.21+, use slices.Insert(s, i, x) from the slices package',
    priority: 'common',
  },
  {
    name: 'reverse slice',
    category: 'arrays',
    syntax: 'for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 { s[i], s[j] = s[j], s[i] }',
    description: 'Reverse a slice in-place using two-pointer technique',
    example: {
      code: `s := []int{1, 2, 3, 4}
for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
    s[i], s[j] = s[j], s[i]
}
fmt.Println(s) // [4 3 2 1]`,
      output: '[4 3 2 1]',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    interviewTip: 'Classic two-pointer pattern; use slices.Reverse in Go 1.21+',
    priority: 'essential',
  },

  // ===== MAPS =====
  {
    name: 'make (map)',
    category: 'maps',
    syntax: 'make(map[K]V) or make(map[K]V, hint)',
    description: 'Create a map with optional size hint',
    example: {
      code: `m := make(map[string]int)
m["a"] = 1
fmt.Println(m) // map[a:1]`,
      output: 'map[a:1]',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    gotchas: ['nil map panics on write', 'Size hint is just a hint, not a limit'],
    interviewTip: 'Always initialize maps with make() or literal syntax before use',
    priority: 'essential',
  },
  {
    name: 'map literal',
    category: 'maps',
    syntax: 'map[K]V{k1: v1, k2: v2}',
    description: 'Create and initialize a map with literal syntax',
    example: {
      code: `m := map[string]int{"a": 1, "b": 2}
fmt.Println(m["a"]) // 1`,
      output: '1',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    interviewTip: 'Preferred for small, known maps; cleaner than make + assignments',
    priority: 'essential',
  },
  {
    name: 'map access',
    category: 'maps',
    syntax: 'value, ok := m[key]',
    description: 'Access map value with existence check',
    example: {
      code: `m := map[string]int{"a": 1}
v, ok := m["a"]
fmt.Println(v, ok) // 1 true
v, ok = m["b"]
fmt.Println(v, ok) // 0 false`,
      output: '1 true\n0 false',
    },
    timeComplexity: 'O(1) average',
    spaceComplexity: 'O(1)',
    gotchas: ['Missing key returns zero value', 'Always use ok idiom when existence matters'],
    interviewTip: 'The comma-ok idiom distinguishes missing keys from zero values',
    priority: 'essential',
  },
  {
    name: 'delete (map)',
    category: 'maps',
    syntax: 'delete(m, key)',
    description: 'Remove a key-value pair from a map',
    example: {
      code: `m := map[string]int{"a": 1, "b": 2}
delete(m, "a")
fmt.Println(m) // map[b:2]`,
      output: 'map[b:2]',
    },
    timeComplexity: 'O(1) average',
    spaceComplexity: 'O(1)',
    gotchas: ['No-op if key does not exist', 'Does not return a value'],
    interviewTip: 'Safe to call on non-existent keys; no error or panic',
    priority: 'essential',
  },
  {
    name: 'range (map)',
    category: 'maps',
    syntax: 'for key, value := range m { }',
    description: 'Iterate over map keys and values',
    example: {
      code: `m := map[string]int{"a": 1, "b": 2}
for k, v := range m {
    fmt.Printf("%s:%d ", k, v)
}`,
      output: 'a:1 b:2 (order may vary)',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    gotchas: ['Iteration order is random', 'Safe to delete during iteration'],
    interviewTip: 'Map iteration order is intentionally randomized; sort keys if order matters',
    priority: 'essential',
  },

  // ===== STRINGS =====
  {
    name: 'strings.Contains',
    category: 'strings',
    syntax: 'strings.Contains(s, substr)',
    description: 'Check if string contains substring',
    example: {
      code: `import "strings"
fmt.Println(strings.Contains("hello", "ell")) // true`,
      output: 'true',
    },
    timeComplexity: 'O(n*m)',
    spaceComplexity: 'O(1)',
    interviewTip:
      'Use for simple substring checks; for repeated searches, consider other approaches',
    priority: 'essential',
  },
  {
    name: 'strings.Split',
    category: 'strings',
    syntax: 'strings.Split(s, sep)',
    description: 'Split string by separator into slice',
    example: {
      code: `parts := strings.Split("a,b,c", ",")
fmt.Println(parts) // [a b c]`,
      output: '[a b c]',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    gotchas: ['Empty string returns [""]', 'Empty sep splits into characters'],
    interviewTip: 'Use strings.Fields for whitespace splitting',
    priority: 'essential',
  },
  {
    name: 'strings.Join',
    category: 'strings',
    syntax: 'strings.Join(slice, sep)',
    description: 'Join string slice with separator',
    example: {
      code: `s := strings.Join([]string{"a", "b", "c"}, "-")
fmt.Println(s) // a-b-c`,
      output: 'a-b-c',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    interviewTip: 'More efficient than concatenating in a loop',
    priority: 'essential',
  },
  {
    name: 'strings.Replace',
    category: 'strings',
    syntax: 'strings.Replace(s, old, new, n)',
    description: 'Replace first n occurrences (n=-1 for all)',
    example: {
      code: `s := strings.Replace("aaa", "a", "b", 2)
fmt.Println(s) // bba
s = strings.ReplaceAll("aaa", "a", "b")
fmt.Println(s) // bbb`,
      output: 'bba\nbbb',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    gotchas: ['n=-1 replaces all; use ReplaceAll for clarity'],
    interviewTip: 'strings.ReplaceAll is clearer than Replace with n=-1',
    priority: 'common',
  },
  {
    name: 'strings.Index',
    category: 'strings',
    syntax: 'strings.Index(s, substr)',
    description: 'Find index of first occurrence of substring (-1 if not found)',
    example: {
      code: `i := strings.Index("hello", "l")
fmt.Println(i) // 2`,
      output: '2',
    },
    timeComplexity: 'O(n*m)',
    spaceComplexity: 'O(1)',
    gotchas: ['Returns -1 if not found', 'Use LastIndex for last occurrence'],
    interviewTip: 'Check for -1 return value before using the index',
    priority: 'essential',
  },
  {
    name: 'strings.ToLower/ToUpper',
    category: 'strings',
    syntax: 'strings.ToLower(s) / strings.ToUpper(s)',
    description: 'Convert string to lowercase or uppercase',
    example: {
      code: `fmt.Println(strings.ToLower("HELLO")) // hello
fmt.Println(strings.ToUpper("hello")) // HELLO`,
      output: 'hello\nHELLO',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    interviewTip: 'Use for case-insensitive comparisons',
    priority: 'essential',
  },
  {
    name: 'strings.TrimSpace',
    category: 'strings',
    syntax: 'strings.TrimSpace(s)',
    description: 'Remove leading and trailing whitespace',
    example: {
      code: `s := strings.TrimSpace("  hello  ")
fmt.Println(s) // "hello"`,
      output: 'hello',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    gotchas: ['Only trims Unicode whitespace', 'Use Trim for custom characters'],
    interviewTip: 'Essential for cleaning user input or file data',
    priority: 'common',
  },
  {
    name: 'strings.HasPrefix/HasSuffix',
    category: 'strings',
    syntax: 'strings.HasPrefix(s, prefix) / strings.HasSuffix(s, suffix)',
    description: 'Check if string starts or ends with given substring',
    example: {
      code: `fmt.Println(strings.HasPrefix("hello", "he")) // true
fmt.Println(strings.HasSuffix("hello", "lo")) // true`,
      output: 'true\ntrue',
    },
    timeComplexity: 'O(k) where k is prefix/suffix length',
    spaceComplexity: 'O(1)',
    interviewTip: 'More efficient than slicing and comparing for prefix/suffix checks',
    priority: 'common',
  },
  {
    name: 'string to []byte',
    category: 'strings',
    syntax: '[]byte(s)',
    description: 'Convert string to byte slice for mutation',
    example: {
      code: `s := "hello"
b := []byte(s)
b[0] = 'H'
fmt.Println(string(b)) // Hello`,
      output: 'Hello',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    gotchas: ['Strings are immutable; must convert to []byte to modify', 'Creates a copy'],
    interviewTip: 'Convert to []byte for in-place modifications, then back to string',
    priority: 'essential',
  },
  {
    name: 'string to []rune',
    category: 'strings',
    syntax: '[]rune(s)',
    description: 'Convert string to rune slice for Unicode-safe operations',
    example: {
      code: `s := "hello"
r := []rune(s)
fmt.Println(len(r)) // 5 (character count)`,
      output: '5',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    gotchas: ['Use for Unicode strings', 'len([]rune(s)) gives character count'],
    interviewTip: 'Use []rune for Unicode-safe indexing and manipulation',
    priority: 'essential',
  },
  {
    name: 'strings.Builder',
    category: 'strings',
    syntax: 'var sb strings.Builder; sb.WriteString(s)',
    description: 'Efficiently build strings with minimal allocations',
    example: {
      code: `var sb strings.Builder
sb.WriteString("hello")
sb.WriteString(" world")
fmt.Println(sb.String()) // hello world`,
      output: 'hello world',
    },
    timeComplexity: 'O(1) amortized per write',
    spaceComplexity: 'O(n)',
    gotchas: ['More efficient than += for loops', 'Use Grow() to pre-allocate'],
    interviewTip: 'Use strings.Builder instead of += in loops for O(n) instead of O(n^2)',
    priority: 'essential',
  },

  // ===== SORTING =====
  {
    name: 'sort.Ints',
    category: 'sorting',
    syntax: 'sort.Ints(slice)',
    description: 'Sort int slice in ascending order in-place',
    example: {
      code: `s := []int{3, 1, 4, 1, 5}
sort.Ints(s)
fmt.Println(s) // [1 1 3 4 5]`,
      output: '[1 1 3 4 5]',
    },
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    gotchas: ['Sorts in-place', 'For descending, use sort.Sort(sort.Reverse(...))'],
    interviewTip: 'Go 1.21+ has slices.Sort for generic sorting',
    priority: 'essential',
  },
  {
    name: 'sort.Strings',
    category: 'sorting',
    syntax: 'sort.Strings(slice)',
    description: 'Sort string slice in ascending order in-place',
    example: {
      code: `s := []string{"c", "a", "b"}
sort.Strings(s)
fmt.Println(s) // [a b c]`,
      output: '[a b c]',
    },
    timeComplexity: 'O(n log n * k) where k is string length',
    spaceComplexity: 'O(log n)',
    interviewTip: 'Sorts lexicographically by default',
    priority: 'essential',
  },
  {
    name: 'sort.Slice',
    category: 'sorting',
    syntax: 'sort.Slice(slice, less func(i, j int) bool)',
    description: 'Sort slice with custom comparison function',
    example: {
      code: `s := []int{3, 1, 4, 1, 5}
sort.Slice(s, func(i, j int) bool {
    return s[i] > s[j] // descending
})
fmt.Println(s) // [5 4 3 1 1]`,
      output: '[5 4 3 1 1]',
    },
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    gotchas: ['Not stable; use sort.SliceStable for stability'],
    interviewTip: 'Most flexible sorting option; use for custom ordering',
    priority: 'essential',
  },
  {
    name: 'sort.Search',
    category: 'searching',
    syntax: 'sort.Search(n, f func(i int) bool)',
    description: 'Binary search for smallest index where f(i) is true',
    example: {
      code: `s := []int{1, 2, 3, 4, 5}
i := sort.Search(len(s), func(i int) bool {
    return s[i] >= 3
})
fmt.Println(i) // 2`,
      output: '2',
    },
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    gotchas: ['Slice must be sorted', 'Returns n if not found'],
    interviewTip: 'Generic binary search; condition must transition from false to true',
    priority: 'essential',
  },
  {
    name: 'sort.SearchInts',
    category: 'searching',
    syntax: 'sort.SearchInts(slice, x)',
    description: 'Binary search for x in sorted int slice',
    example: {
      code: `s := []int{1, 2, 3, 4, 5}
i := sort.SearchInts(s, 3)
fmt.Println(i) // 2`,
      output: '2',
    },
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    gotchas: ['Returns insertion point if not found', 'Slice must be sorted'],
    interviewTip: 'Check if s[i] == x to confirm element exists',
    priority: 'common',
  },

  // ===== TYPE CONVERSION =====
  {
    name: 'strconv.Itoa',
    category: 'type-conversion',
    syntax: 'strconv.Itoa(i)',
    description: 'Convert int to string',
    example: {
      code: `s := strconv.Itoa(42)
fmt.Println(s) // "42"`,
      output: '42',
    },
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(log n)',
    interviewTip: 'Shorthand for strconv.FormatInt(int64(i), 10)',
    priority: 'essential',
  },
  {
    name: 'strconv.Atoi',
    category: 'type-conversion',
    syntax: 'strconv.Atoi(s)',
    description: 'Convert string to int (returns error if invalid)',
    example: {
      code: `n, err := strconv.Atoi("42")
if err == nil {
    fmt.Println(n) // 42
}`,
      output: '42',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    gotchas: ['Returns error for invalid input', 'Use ParseInt for more control'],
    interviewTip: 'Always handle the error return value',
    priority: 'essential',
  },
  {
    name: 'strconv.ParseInt',
    category: 'type-conversion',
    syntax: 'strconv.ParseInt(s, base, bitSize)',
    description: 'Parse string to int64 with base and bit size control',
    example: {
      code: `n, _ := strconv.ParseInt("101", 2, 64)
fmt.Println(n) // 5 (binary)`,
      output: '5',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    gotchas: ['base 0 auto-detects from prefix (0x, 0, etc.)'],
    interviewTip: 'Use for parsing binary, hex, or other bases',
    priority: 'common',
  },
  {
    name: 'fmt.Sprintf',
    category: 'type-conversion',
    syntax: 'fmt.Sprintf(format, args...)',
    description: 'Format values into a string',
    example: {
      code: `s := fmt.Sprintf("%d + %d = %d", 1, 2, 3)
fmt.Println(s) // 1 + 2 = 3`,
      output: '1 + 2 = 3',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    gotchas: ['%v for default format', '%+v for structs with field names'],
    interviewTip: 'Versatile string formatting; know common verbs: %d, %s, %v, %t',
    priority: 'essential',
  },

  // ===== MATH =====
  {
    name: 'math.Max/Min (float64)',
    category: 'math',
    syntax: 'math.Max(a, b) / math.Min(a, b)',
    description: 'Return max/min of two float64 values',
    example: {
      code: `fmt.Println(math.Max(3.0, 5.0)) // 5
fmt.Println(math.Min(3.0, 5.0)) // 3`,
      output: '5\n3',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: ['Only works with float64', 'For int, write your own: if a > b { return a }'],
    interviewTip: 'Go has no generic max/min for int; write a helper or use Go 1.21+ max/min',
    priority: 'essential',
  },
  {
    name: 'math.Abs',
    category: 'math',
    syntax: 'math.Abs(x)',
    description: 'Return absolute value of float64',
    example: {
      code: `fmt.Println(math.Abs(-5.0)) // 5`,
      output: '5',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: ['Only float64; for int use: if x < 0 { x = -x }'],
    interviewTip: 'Remember to handle int abs manually',
    priority: 'common',
  },
  {
    name: 'math.Sqrt',
    category: 'math',
    syntax: 'math.Sqrt(x)',
    description: 'Return square root of x',
    example: {
      code: `fmt.Println(math.Sqrt(16)) // 4`,
      output: '4',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    interviewTip: 'Useful for distance calculations and prime checking',
    priority: 'common',
  },
  {
    name: 'math.Pow',
    category: 'math',
    syntax: 'math.Pow(x, y)',
    description: 'Return x raised to power y',
    example: {
      code: `fmt.Println(math.Pow(2, 10)) // 1024`,
      output: '1024',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: ['Returns float64', 'For int powers, consider bit shifting for powers of 2'],
    interviewTip: 'Cast result to int if needed: int(math.Pow(2, 10))',
    priority: 'common',
  },

  // ===== ITERATION =====
  {
    name: 'for range (slice)',
    category: 'iteration',
    syntax: 'for i, v := range slice { }',
    description: 'Iterate over slice with index and value',
    example: {
      code: `for i, v := range []int{1, 2, 3} {
    fmt.Printf("%d:%d ", i, v)
}`,
      output: '0:1 1:2 2:3',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    gotchas: ['v is a copy, not a reference', 'Use _ to ignore index or value'],
    interviewTip: 'Modifying v does not modify the slice; use index: s[i] = newVal',
    priority: 'essential',
  },
  {
    name: 'for range (string)',
    category: 'iteration',
    syntax: 'for i, r := range s { }',
    description: 'Iterate over string runes (Unicode code points)',
    example: {
      code: `for i, r := range "hello" {
    fmt.Printf("%d:%c ", i, r)
}`,
      output: '0:h 1:e 2:l 3:l 4:o',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    gotchas: ['Index is byte position, not rune index', 'r is rune type'],
    interviewTip: 'For byte-by-byte iteration, use for i := 0; i < len(s); i++',
    priority: 'essential',
  },

  // ===== CONCURRENCY =====
  {
    name: 'go (goroutine)',
    category: 'concurrency',
    syntax: 'go func() { }()',
    description: 'Launch a new goroutine',
    example: {
      code: `go func() {
    fmt.Println("concurrent")
}()
time.Sleep(time.Millisecond)`,
      output: 'concurrent',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1) stack initially',
    gotchas: ['Goroutine may not complete before main exits', 'Capture loop variables properly'],
    interviewTip: 'Use WaitGroup or channels to synchronize goroutines',
    priority: 'common',
  },
  {
    name: 'make (channel)',
    category: 'concurrency',
    syntax: 'make(chan T) or make(chan T, buffer)',
    description: 'Create unbuffered or buffered channel',
    example: {
      code: `ch := make(chan int, 1)
ch <- 42
v := <-ch
fmt.Println(v) // 42`,
      output: '42',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(buffer)',
    gotchas: [
      'Unbuffered channels block until both sender and receiver ready',
      'Close channels when done',
    ],
    interviewTip: 'Buffered channels for producer-consumer; unbuffered for synchronization',
    priority: 'common',
  },
  {
    name: 'sync.WaitGroup',
    category: 'concurrency',
    syntax: 'var wg sync.WaitGroup; wg.Add(n); wg.Done(); wg.Wait()',
    description: 'Wait for a collection of goroutines to finish',
    example: {
      code: `var wg sync.WaitGroup
wg.Add(1)
go func() {
    defer wg.Done()
    fmt.Println("done")
}()
wg.Wait()`,
      output: 'done',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: ['Add before launching goroutine', 'Done decrements counter'],
    interviewTip: 'Essential for coordinating multiple goroutines',
    priority: 'common',
  },
  {
    name: 'sync.Mutex',
    category: 'concurrency',
    syntax: 'var mu sync.Mutex; mu.Lock(); mu.Unlock()',
    description: 'Mutual exclusion lock for protecting shared data',
    example: {
      code: `var mu sync.Mutex
var count int
mu.Lock()
count++
mu.Unlock()`,
      output: '(count safely incremented)',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: ['Always unlock with defer mu.Unlock()', 'RWMutex for read-heavy workloads'],
    interviewTip: 'Use defer mu.Unlock() immediately after Lock() for safety',
    priority: 'common',
  },

  // ===== ERROR HANDLING =====
  {
    name: 'error handling',
    category: 'error-handling',
    syntax: 'if err != nil { return err }',
    description: 'Standard Go error handling pattern',
    example: {
      code: `n, err := strconv.Atoi("abc")
if err != nil {
    fmt.Println("error:", err)
}`,
      output: 'error: strconv.Atoi: parsing "abc": invalid syntax',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: ['Always check errors', 'errors.Is and errors.As for wrapped errors'],
    interviewTip: 'Never ignore errors; handle or propagate them',
    priority: 'essential',
  },
  {
    name: 'defer',
    category: 'error-handling',
    syntax: 'defer func()',
    description: 'Schedule function call to run when surrounding function returns',
    example: {
      code: `func example() {
    defer fmt.Println("cleanup")
    fmt.Println("work")
}
// Output: work, then cleanup`,
      output: 'work\ncleanup',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: ['LIFO order for multiple defers', 'Arguments evaluated immediately'],
    interviewTip: 'Use defer for cleanup: closing files, unlocking mutexes',
    priority: 'essential',
  },

  // ===== COLLECTIONS (heap) =====
  {
    name: 'container/heap',
    category: 'collections',
    syntax: 'heap.Push(h, x); heap.Pop(h)',
    description: 'Min-heap operations (implement heap.Interface)',
    example: {
      code: `// Implement heap.Interface on IntHeap
h := &IntHeap{3, 1, 4}
heap.Init(h)
heap.Push(h, 2)
fmt.Println(heap.Pop(h)) // 1 (min)`,
      output: '1',
    },
    timeComplexity: 'O(log n) push/pop',
    spaceComplexity: 'O(n)',
    gotchas: ['Must implement 5 methods', 'Default is min-heap; negate for max-heap'],
    interviewTip: 'Know heap.Interface: Len, Less, Swap, Push, Pop',
    priority: 'common',
  },
  {
    name: 'container/list',
    category: 'collections',
    syntax: 'list.New(); l.PushBack(x); l.PushFront(x)',
    description: 'Doubly linked list',
    example: {
      code: `l := list.New()
l.PushBack(1)
l.PushBack(2)
fmt.Println(l.Front().Value) // 1`,
      output: '1',
    },
    timeComplexity: 'O(1) insert/delete',
    spaceComplexity: 'O(n)',
    interviewTip: 'Use for LRU cache implementation',
    priority: 'useful',
  },

  // ===== USEFUL PATTERNS =====
  {
    name: 'two-pointer technique',
    category: 'arrays',
    syntax: 'for l, r := 0, len(s)-1; l < r; l, r = l+1, r-1 { }',
    description: 'Common pattern for array/string problems',
    example: {
      code: `// Check palindrome
s := "racecar"
isPalindrome := true
for l, r := 0, len(s)-1; l < r; l, r = l+1, r-1 {
    if s[l] != s[r] {
        isPalindrome = false
        break
    }
}
fmt.Println(isPalindrome) // true`,
      output: 'true',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    interviewTip: 'Classic pattern for palindrome, two-sum (sorted), container problems',
    priority: 'essential',
  },
  {
    name: 'sliding window',
    category: 'arrays',
    syntax: 'for r := 0; r < len(s); r++ { /* expand */ for condition { l++ /* shrink */ } }',
    description: 'Pattern for subarray/substring problems',
    example: {
      code: `// Max sum subarray of size k
s := []int{1, 2, 3, 4, 5}
k, sum, maxSum := 3, 0, 0
for i := 0; i < len(s); i++ {
    sum += s[i]
    if i >= k {
        sum -= s[i-k]
    }
    if i >= k-1 && sum > maxSum {
        maxSum = sum
    }
}
fmt.Println(maxSum) // 12`,
      output: '12',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    interviewTip: 'Use for subarray sum, longest substring, and window-based problems',
    priority: 'essential',
  },
];
