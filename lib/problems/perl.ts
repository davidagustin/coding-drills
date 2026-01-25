/**
 * Perl coding drill problems
 * Covers Array Functions, String Functions, Hash Operations, Regular Expressions, and File Operations
 */

import type { Problem } from '../types';

export const perlProblems: Problem[] = [
  // ============================================================
  // Array Functions (10 problems: 4 easy, 4 medium, 2 hard)
  // ============================================================

  // push
  {
    id: 'perl-array-001',
    category: 'Array Functions',
    difficulty: 'easy',
    title: 'Add Element to End with push',
    text: 'Use the `push` function to add the number 4 to the end of the array.',
    setup: 'my @numbers = (1, 2, 3);',
    setupCode: 'my @numbers = (1, 2, 3);',
    expected: [1, 2, 3, 4],
    sample: 'push @numbers, 4; @numbers',
    hints: ['push modifies the array in place', 'push ARRAY, LIST adds elements to the end'],
    validPatterns: [/push\s+@numbers\s*,\s*4/],
    tags: ['push', 'arrays', 'append'],
  },

  // pop
  {
    id: 'perl-array-002',
    category: 'Array Functions',
    difficulty: 'easy',
    title: 'Remove Last Element with pop',
    text: 'Use the `pop` function to remove and return the last element of the array.',
    setup: 'my @numbers = (1, 2, 3, 4);',
    setupCode: 'my @numbers = (1, 2, 3, 4);',
    expected: 4,
    sample: 'pop @numbers',
    hints: ['pop removes the last element', 'pop returns the removed element'],
    validPatterns: [/pop\s+@numbers/],
    tags: ['pop', 'arrays', 'remove'],
  },

  // shift
  {
    id: 'perl-array-003',
    category: 'Array Functions',
    difficulty: 'easy',
    title: 'Remove First Element with shift',
    text: 'Use the `shift` function to remove and return the first element of the array.',
    setup: 'my @numbers = (10, 20, 30);',
    setupCode: 'my @numbers = (10, 20, 30);',
    expected: 10,
    sample: 'shift @numbers',
    hints: ['shift removes from the beginning', 'shift returns the removed element'],
    validPatterns: [/shift\s+@numbers/],
    tags: ['shift', 'arrays', 'remove'],
  },

  // unshift
  {
    id: 'perl-array-004',
    category: 'Array Functions',
    difficulty: 'easy',
    title: 'Add Element to Start with unshift',
    text: 'Use the `unshift` function to add the number 0 to the beginning of the array.',
    setup: 'my @numbers = (1, 2, 3);',
    setupCode: 'my @numbers = (1, 2, 3);',
    expected: [0, 1, 2, 3],
    sample: 'unshift @numbers, 0; @numbers',
    hints: ['unshift adds to the beginning', 'unshift modifies the array in place'],
    validPatterns: [/unshift\s+@numbers\s*,\s*0/],
    tags: ['unshift', 'arrays', 'prepend'],
  },

  // sort (numeric)
  {
    id: 'perl-array-005',
    category: 'Array Functions',
    difficulty: 'medium',
    title: 'Sort Numbers Numerically',
    text: 'Use the `sort` function with a comparison to sort numbers in ascending order.',
    setup: 'my @numbers = (10, 2, 33, 4, 5);',
    setupCode: 'my @numbers = (10, 2, 33, 4, 5);',
    expected: [2, 4, 5, 10, 33],
    sample: 'sort { $a <=> $b } @numbers',
    hints: ['Use <=> for numeric comparison', '$a and $b are the elements being compared'],
    validPatterns: [/sort\s*\{\s*\$a\s*<=>\s*\$b\s*\}\s*@numbers/],
    tags: ['sort', 'arrays', 'numeric'],
  },

  // reverse
  {
    id: 'perl-array-006',
    category: 'Array Functions',
    difficulty: 'medium',
    title: 'Reverse Array Order',
    text: 'Use the `reverse` function to reverse the order of elements in the array.',
    setup: 'my @numbers = (1, 2, 3, 4, 5);',
    setupCode: 'my @numbers = (1, 2, 3, 4, 5);',
    expected: [5, 4, 3, 2, 1],
    sample: 'reverse @numbers',
    hints: ['reverse returns elements in opposite order', 'reverse does not modify the original array'],
    validPatterns: [/reverse\s+@numbers/],
    tags: ['reverse', 'arrays'],
  },

  // grep (filter even)
  {
    id: 'perl-array-007',
    category: 'Array Functions',
    difficulty: 'medium',
    title: 'Filter Even Numbers with grep',
    text: 'Use the `grep` function to filter only even numbers from the array.',
    setup: 'my @numbers = (1, 2, 3, 4, 5, 6);',
    setupCode: 'my @numbers = (1, 2, 3, 4, 5, 6);',
    expected: [2, 4, 6],
    sample: 'grep { $_ % 2 == 0 } @numbers',
    hints: ['grep filters elements that match condition', '$_ represents each element'],
    validPatterns: [/grep\s*\{\s*\$_\s*%\s*2\s*==\s*0\s*\}\s*@numbers/],
    tags: ['grep', 'arrays', 'filter'],
  },

  // map (double)
  {
    id: 'perl-array-008',
    category: 'Array Functions',
    difficulty: 'medium',
    title: 'Double Elements with map',
    text: 'Use the `map` function to double each number in the array.',
    setup: 'my @numbers = (1, 2, 3, 4);',
    setupCode: 'my @numbers = (1, 2, 3, 4);',
    expected: [2, 4, 6, 8],
    sample: 'map { $_ * 2 } @numbers',
    hints: ['map transforms each element', '$_ is the current element in the block'],
    validPatterns: [/map\s*\{\s*\$_\s*\*\s*2\s*\}\s*@numbers/],
    tags: ['map', 'arrays', 'transform'],
  },

  // grep and map chained
  {
    id: 'perl-array-009',
    category: 'Array Functions',
    difficulty: 'hard',
    title: 'Chain grep and map',
    text: 'Filter even numbers and then double them using `grep` and `map`.',
    setup: 'my @numbers = (1, 2, 3, 4, 5, 6);',
    setupCode: 'my @numbers = (1, 2, 3, 4, 5, 6);',
    expected: [4, 8, 12],
    sample: 'map { $_ * 2 } grep { $_ % 2 == 0 } @numbers',
    hints: ['Chain map after grep', 'grep filters, then map transforms'],
    validPatterns: [/map\s*\{[^}]+\}\s*grep\s*\{[^}]+\}\s*@numbers/],
    tags: ['grep', 'map', 'chaining'],
  },

  // sort by string length
  {
    id: 'perl-array-010',
    category: 'Array Functions',
    difficulty: 'hard',
    title: 'Sort by String Length',
    text: 'Sort the words by their length (shortest first) using `sort`.',
    setup: 'my @words = ("perl", "is", "awesome", "hi");',
    setupCode: 'my @words = ("perl", "is", "awesome", "hi");',
    expected: ['is', 'hi', 'perl', 'awesome'],
    sample: 'sort { length($a) <=> length($b) } @words',
    hints: ['Compare lengths with <=>', 'length() returns string length'],
    validPatterns: [/sort\s*\{\s*length\s*\(\s*\$a\s*\)\s*<=>\s*length\s*\(\s*\$b\s*\)\s*\}\s*@words/],
    tags: ['sort', 'arrays', 'length'],
  },

  // ============================================================
  // String Functions (10 problems: 4 easy, 4 medium, 2 hard)
  // ============================================================

  // length
  {
    id: 'perl-string-001',
    category: 'String Functions',
    difficulty: 'easy',
    title: 'Get String Length',
    text: 'Use the `length` function to get the length of the string.',
    setup: 'my $str = "Hello, Perl!";',
    setupCode: 'my $str = "Hello, Perl!";',
    expected: 12,
    sample: 'length $str',
    hints: ['length returns the number of characters', 'Spaces count as characters'],
    validPatterns: [/length\s+\$str/, /length\(\$str\)/],
    tags: ['length', 'strings'],
  },

  // uc (uppercase)
  {
    id: 'perl-string-002',
    category: 'String Functions',
    difficulty: 'easy',
    title: 'Convert to Uppercase',
    text: 'Use the `uc` function to convert the string to uppercase.',
    setup: 'my $str = "hello world";',
    setupCode: 'my $str = "hello world";',
    expected: 'HELLO WORLD',
    sample: 'uc $str',
    hints: ['uc converts all characters to uppercase'],
    validPatterns: [/uc\s+\$str/, /uc\(\$str\)/],
    tags: ['uc', 'strings', 'uppercase'],
  },

  // lc (lowercase)
  {
    id: 'perl-string-003',
    category: 'String Functions',
    difficulty: 'easy',
    title: 'Convert to Lowercase',
    text: 'Use the `lc` function to convert the string to lowercase.',
    setup: 'my $str = "HELLO WORLD";',
    setupCode: 'my $str = "HELLO WORLD";',
    expected: 'hello world',
    sample: 'lc $str',
    hints: ['lc converts all characters to lowercase'],
    validPatterns: [/lc\s+\$str/, /lc\(\$str\)/],
    tags: ['lc', 'strings', 'lowercase'],
  },

  // split (basic)
  {
    id: 'perl-string-004',
    category: 'String Functions',
    difficulty: 'easy',
    title: 'Split String by Space',
    text: 'Use the `split` function to break the string into words by spaces.',
    setup: 'my $str = "hello world perl";',
    setupCode: 'my $str = "hello world perl";',
    expected: ['hello', 'world', 'perl'],
    sample: 'split / /, $str',
    hints: ['split uses a pattern to divide string', 'Use / / to split by space'],
    validPatterns: [/split\s*\/\s*\/\s*,\s*\$str/, /split\s+' '\s*,\s*\$str/],
    tags: ['split', 'strings', 'words'],
  },

  // join
  {
    id: 'perl-string-005',
    category: 'String Functions',
    difficulty: 'medium',
    title: 'Join Array with Separator',
    text: 'Use the `join` function to combine array elements with a comma separator.',
    setup: 'my @words = ("apple", "banana", "cherry");',
    setupCode: 'my @words = ("apple", "banana", "cherry");',
    expected: 'apple, banana, cherry',
    sample: 'join ", ", @words',
    hints: ['join combines elements with separator', 'First argument is the separator'],
    validPatterns: [/join\s+["'],\s*["']\s*,\s*@words/, /join\(\s*["'],\s*["']\s*,\s*@words\s*\)/],
    tags: ['join', 'strings', 'arrays'],
  },

  // substr (extract)
  {
    id: 'perl-string-006',
    category: 'String Functions',
    difficulty: 'medium',
    title: 'Extract Substring',
    text: 'Use the `substr` function to extract the first 5 characters.',
    setup: 'my $str = "Hello, World!";',
    setupCode: 'my $str = "Hello, World!";',
    expected: 'Hello',
    sample: 'substr $str, 0, 5',
    hints: ['substr(STRING, OFFSET, LENGTH)', 'Index starts at 0'],
    validPatterns: [/substr\s+\$str\s*,\s*0\s*,\s*5/, /substr\(\$str\s*,\s*0\s*,\s*5\)/],
    tags: ['substr', 'strings', 'extract'],
  },

  // index
  {
    id: 'perl-string-007',
    category: 'String Functions',
    difficulty: 'medium',
    title: 'Find Substring Position',
    text: 'Use the `index` function to find the position of "world" in the string.',
    setup: 'my $str = "hello world";',
    setupCode: 'my $str = "hello world";',
    expected: 6,
    sample: 'index $str, "world"',
    hints: ['index returns position of substring', 'Returns -1 if not found'],
    validPatterns: [/index\s+\$str\s*,\s*["']world["']/, /index\(\$str\s*,\s*["']world["']\)/],
    tags: ['index', 'strings', 'search'],
  },

  // chomp
  {
    id: 'perl-string-008',
    category: 'String Functions',
    difficulty: 'medium',
    title: 'Remove Trailing Newline',
    text: 'Use the `chomp` function to remove the trailing newline from the string.',
    setup: 'my $str = "hello\\n";',
    setupCode: 'my $str = "hello\\n";',
    expected: 'hello',
    sample: 'chomp $str; $str',
    hints: ['chomp removes trailing newline', 'chomp modifies the variable in place'],
    validPatterns: [/chomp\s+\$str/, /chomp\(\$str\)/],
    tags: ['chomp', 'strings', 'newline'],
  },

  // substr (replace)
  {
    id: 'perl-string-009',
    category: 'String Functions',
    difficulty: 'hard',
    title: 'Replace Substring with substr',
    text: 'Use `substr` to replace "World" with "Perl" in the string.',
    setup: 'my $str = "Hello, World!";',
    setupCode: 'my $str = "Hello, World!";',
    expected: 'Hello, Perl!',
    sample: 'substr($str, 7, 5) = "Perl"; $str',
    hints: ['substr can be used as lvalue', 'substr(STR, POS, LEN) = NEW replaces substring'],
    validPatterns: [/substr\s*\(\s*\$str\s*,\s*7\s*,\s*5\s*\)\s*=\s*["']Perl["']/],
    tags: ['substr', 'strings', 'replace'],
  },

  // reverse string
  {
    id: 'perl-string-010',
    category: 'String Functions',
    difficulty: 'hard',
    title: 'Reverse a String',
    text: 'Use `reverse` in scalar context to reverse the characters in the string.',
    setup: 'my $str = "hello";',
    setupCode: 'my $str = "hello";',
    expected: 'olleh',
    sample: 'scalar reverse $str',
    hints: ['reverse in scalar context reverses string', 'Use scalar to force scalar context'],
    validPatterns: [/scalar\s+reverse\s+\$str/, /reverse\s+\$str/],
    tags: ['reverse', 'strings', 'scalar'],
  },

  // ============================================================
  // Hash Operations (10 problems: 4 easy, 4 medium, 2 hard)
  // ============================================================

  // keys
  {
    id: 'perl-hash-001',
    category: 'Hash Operations',
    difficulty: 'easy',
    title: 'Get Hash Keys',
    text: 'Use the `keys` function to get all keys from the hash.',
    setup: 'my %person = (name => "Alice", age => 30, city => "NYC");',
    setupCode: 'my %person = (name => "Alice", age => 30, city => "NYC");',
    expected: ['name', 'age', 'city'],
    sample: 'keys %person',
    hints: ['keys returns a list of all keys', 'Order is not guaranteed'],
    validPatterns: [/keys\s+%person/],
    tags: ['keys', 'hashes'],
  },

  // values
  {
    id: 'perl-hash-002',
    category: 'Hash Operations',
    difficulty: 'easy',
    title: 'Get Hash Values',
    text: 'Use the `values` function to get all values from the hash.',
    setup: 'my %scores = (math => 90, science => 85);',
    setupCode: 'my %scores = (math => 90, science => 85);',
    expected: [90, 85],
    sample: 'values %scores',
    hints: ['values returns a list of all values', 'Order corresponds to keys'],
    validPatterns: [/values\s+%scores/],
    tags: ['values', 'hashes'],
  },

  // exists
  {
    id: 'perl-hash-003',
    category: 'Hash Operations',
    difficulty: 'easy',
    title: 'Check if Key Exists',
    text: 'Use the `exists` function to check if the key "name" exists in the hash.',
    setup: 'my %person = (name => "Bob", age => 25);',
    setupCode: 'my %person = (name => "Bob", age => 25);',
    expected: true,
    sample: 'exists $person{name}',
    hints: ['exists checks for key presence', 'Returns true or false'],
    validPatterns: [/exists\s+\$person\{["']?name["']?\}/],
    tags: ['exists', 'hashes', 'check'],
  },

  // delete
  {
    id: 'perl-hash-004',
    category: 'Hash Operations',
    difficulty: 'easy',
    title: 'Delete Hash Key',
    text: 'Use the `delete` function to remove the "age" key and return its value.',
    setup: 'my %person = (name => "Alice", age => 30);',
    setupCode: 'my %person = (name => "Alice", age => 30);',
    expected: 30,
    sample: 'delete $person{age}',
    hints: ['delete removes key-value pair', 'Returns the deleted value'],
    validPatterns: [/delete\s+\$person\{["']?age["']?\}/],
    tags: ['delete', 'hashes', 'remove'],
  },

  // each
  {
    id: 'perl-hash-005',
    category: 'Hash Operations',
    difficulty: 'medium',
    title: 'Iterate with each',
    text: 'Use the `each` function to get the next key-value pair from the hash.',
    setup: 'my %data = (a => 1, b => 2);',
    setupCode: 'my %data = (a => 1, b => 2);',
    expected: ['a', 1],
    sample: 'each %data',
    hints: ['each returns (key, value) pair', 'Iterates through hash'],
    validPatterns: [/each\s+%data/],
    tags: ['each', 'hashes', 'iterate'],
  },

  // sort keys
  {
    id: 'perl-hash-006',
    category: 'Hash Operations',
    difficulty: 'medium',
    title: 'Sort Hash Keys',
    text: 'Get the keys of the hash in sorted alphabetical order.',
    setup: 'my %data = (cherry => 3, apple => 1, banana => 2);',
    setupCode: 'my %data = (cherry => 3, apple => 1, banana => 2);',
    expected: ['apple', 'banana', 'cherry'],
    sample: 'sort keys %data',
    hints: ['Combine sort with keys', 'sort orders alphabetically by default'],
    validPatterns: [/sort\s+keys\s+%data/],
    tags: ['sort', 'keys', 'hashes'],
  },

  // hash slice
  {
    id: 'perl-hash-007',
    category: 'Hash Operations',
    difficulty: 'medium',
    title: 'Get Hash Slice',
    text: 'Use hash slice syntax to get values for keys "a" and "c".',
    setup: 'my %data = (a => 1, b => 2, c => 3, d => 4);',
    setupCode: 'my %data = (a => 1, b => 2, c => 3, d => 4);',
    expected: [1, 3],
    sample: '@data{qw(a c)}',
    hints: ['Hash slice uses @ sigil', 'qw() creates a list of strings'],
    validPatterns: [/@data\{\s*qw\(\s*a\s+c\s*\)\s*\}/, /@data\{["']a["']\s*,\s*["']c["']\}/],
    tags: ['slice', 'hashes'],
  },

  // merge hashes
  {
    id: 'perl-hash-008',
    category: 'Hash Operations',
    difficulty: 'medium',
    title: 'Merge Two Hashes',
    text: 'Merge the two hashes, with the second hash values taking precedence.',
    setup: 'my %h1 = (a => 1, b => 2); my %h2 = (b => 3, c => 4);',
    setupCode: 'my %h1 = (a => 1, b => 2); my %h2 = (b => 3, c => 4);',
    expected: { a: 1, b: 3, c: 4 },
    sample: '(%h1, %h2)',
    hints: ['Later values override earlier ones', 'Combine hashes in a list'],
    validPatterns: [/\(\s*%h1\s*,\s*%h2\s*\)/, /\%h1\s*,\s*%h2/],
    tags: ['merge', 'hashes'],
  },

  // exists check for nested
  {
    id: 'perl-hash-009',
    category: 'Hash Operations',
    difficulty: 'hard',
    title: 'Check Nested Key Exists',
    text: 'Check if the nested key "city" exists in the "address" sub-hash.',
    setup: 'my %person = (name => "Alice", address => {city => "NYC", zip => "10001"});',
    setupCode: 'my %person = (name => "Alice", address => {city => "NYC", zip => "10001"});',
    expected: true,
    sample: 'exists $person{address}{city}',
    hints: ['Chain hash accesses for nested structures', 'Check existence at each level'],
    validPatterns: [/exists\s+\$person\{["']?address["']?\}\{["']?city["']?\}/],
    tags: ['exists', 'hashes', 'nested'],
  },

  // invert hash
  {
    id: 'perl-hash-010',
    category: 'Hash Operations',
    difficulty: 'hard',
    title: 'Invert Hash Keys and Values',
    text: 'Use the `reverse` function to swap keys and values in the hash.',
    setup: 'my %grades = (A => 90, B => 80, C => 70);',
    setupCode: 'my %grades = (A => 90, B => 80, C => 70);',
    expected: { 90: 'A', 80: 'B', 70: 'C' },
    sample: 'reverse %grades',
    hints: ['reverse on hash flattens then reverses pairs', 'Assign to new hash to invert'],
    validPatterns: [/reverse\s+%grades/],
    tags: ['reverse', 'hashes', 'invert'],
  },

  // ============================================================
  // Regular Expressions (10 problems: 4 easy, 4 medium, 2 hard)
  // ============================================================

  // match basic
  {
    id: 'perl-regex-001',
    category: 'Regular Expressions',
    difficulty: 'easy',
    title: 'Match Pattern in String',
    text: 'Use a regex match to check if the string contains "world".',
    setup: 'my $str = "hello world";',
    setupCode: 'my $str = "hello world";',
    expected: true,
    sample: '$str =~ /world/',
    hints: ['=~ is the binding operator', '/pattern/ matches against string'],
    validPatterns: [/\$str\s*=~\s*\/world\//],
    tags: ['match', 'regex'],
  },

  // match case insensitive
  {
    id: 'perl-regex-002',
    category: 'Regular Expressions',
    difficulty: 'easy',
    title: 'Case Insensitive Match',
    text: 'Use a case-insensitive regex to check if the string contains "HELLO".',
    setup: 'my $str = "Hello World";',
    setupCode: 'my $str = "Hello World";',
    expected: true,
    sample: '$str =~ /hello/i',
    hints: ['Use /i modifier for case insensitive', 'Modifiers go after closing /'],
    validPatterns: [/\$str\s*=~\s*\/[Hh][Ee][Ll][Ll][Oo]\/i/, /\$str\s*=~\s*\/hello\/i/i],
    tags: ['match', 'regex', 'case-insensitive'],
  },

  // substitution basic
  {
    id: 'perl-regex-003',
    category: 'Regular Expressions',
    difficulty: 'easy',
    title: 'Simple Substitution',
    text: 'Use `s///` to replace "world" with "perl" in the string.',
    setup: 'my $str = "hello world";',
    setupCode: 'my $str = "hello world";',
    expected: 'hello perl',
    sample: '$str =~ s/world/perl/; $str',
    hints: ['s/PATTERN/REPLACEMENT/', 'Modifies string in place'],
    validPatterns: [/\$str\s*=~\s*s\/world\/perl\//],
    tags: ['substitute', 'regex', 's///'],
  },

  // match digits
  {
    id: 'perl-regex-004',
    category: 'Regular Expressions',
    difficulty: 'easy',
    title: 'Match Digits',
    text: 'Use a regex to check if the string contains any digits.',
    setup: 'my $str = "abc123xyz";',
    setupCode: 'my $str = "abc123xyz";',
    expected: true,
    sample: '$str =~ /\\d/',
    hints: ['\\d matches any digit', 'Same as [0-9]'],
    validPatterns: [/\$str\s*=~\s*\/\\d\//, /\$str\s*=~\s*\/\[0-9\]\//],
    tags: ['match', 'regex', 'digits'],
  },

  // split with regex
  {
    id: 'perl-regex-005',
    category: 'Regular Expressions',
    difficulty: 'medium',
    title: 'Split with Regex Pattern',
    text: 'Use `split` with a regex to split on one or more spaces.',
    setup: 'my $str = "hello   world    perl";',
    setupCode: 'my $str = "hello   world    perl";',
    expected: ['hello', 'world', 'perl'],
    sample: 'split /\\s+/, $str',
    hints: ['\\s matches whitespace', '+ means one or more'],
    validPatterns: [/split\s*\/\\s\+\/\s*,\s*\$str/],
    tags: ['split', 'regex', 'whitespace'],
  },

  // global substitution
  {
    id: 'perl-regex-006',
    category: 'Regular Expressions',
    difficulty: 'medium',
    title: 'Global Substitution',
    text: 'Use `s///g` to replace all occurrences of "a" with "o".',
    setup: 'my $str = "banana";',
    setupCode: 'my $str = "banana";',
    expected: 'bonono',
    sample: '$str =~ s/a/o/g; $str',
    hints: ['Use /g modifier for global replacement', 'Without /g only first match is replaced'],
    validPatterns: [/\$str\s*=~\s*s\/a\/o\/g/],
    tags: ['substitute', 'regex', 'global'],
  },

  // capture groups
  {
    id: 'perl-regex-007',
    category: 'Regular Expressions',
    difficulty: 'medium',
    title: 'Capture Groups',
    text: 'Use parentheses to capture the digits from the string and return them.',
    setup: 'my $str = "Order #12345";',
    setupCode: 'my $str = "Order #12345";',
    expected: '12345',
    sample: '$str =~ /(\\d+)/; $1',
    hints: ['Parentheses create capture groups', '$1 contains first capture'],
    validPatterns: [/\$str\s*=~\s*\/\(\\d\+\)\/.*\$1/],
    tags: ['capture', 'regex', 'groups'],
  },

  // negation match
  {
    id: 'perl-regex-008',
    category: 'Regular Expressions',
    difficulty: 'medium',
    title: 'Negated Match',
    text: 'Use `!~` to check if the string does NOT contain any digits.',
    setup: 'my $str = "hello world";',
    setupCode: 'my $str = "hello world";',
    expected: true,
    sample: '$str !~ /\\d/',
    hints: ['!~ is the negated binding operator', 'Returns true if pattern does NOT match'],
    validPatterns: [/\$str\s*!~\s*\/\\d\//],
    tags: ['match', 'regex', 'negation'],
  },

  // match word boundaries
  {
    id: 'perl-regex-009',
    category: 'Regular Expressions',
    difficulty: 'hard',
    title: 'Match Word Boundaries',
    text: 'Use word boundaries to match "cat" as a whole word only.',
    setup: 'my $str = "the cat sat on the catalog";',
    setupCode: 'my $str = "the cat sat on the catalog";',
    expected: true,
    sample: '$str =~ /\\bcat\\b/',
    hints: ['\\b matches word boundary', 'Prevents matching "catalog"'],
    validPatterns: [/\$str\s*=~\s*\/\\bcat\\b\//],
    tags: ['match', 'regex', 'boundary'],
  },

  // substitution with capture
  {
    id: 'perl-regex-010',
    category: 'Regular Expressions',
    difficulty: 'hard',
    title: 'Substitution with Captured Text',
    text: 'Use capture groups to swap the first two words in the string.',
    setup: 'my $str = "Hello World";',
    setupCode: 'my $str = "Hello World";',
    expected: 'World Hello',
    sample: '$str =~ s/(\\w+) (\\w+)/$2 $1/; $str',
    hints: ['Capture groups in replacement use $1, $2', '\\w+ matches word characters'],
    validPatterns: [/\$str\s*=~\s*s\/\(\\w\+\)\s+\(\\w\+\)\/\$2\s+\$1\//],
    tags: ['substitute', 'regex', 'capture', 'swap'],
  },

  // ============================================================
  // File Operations (10 problems: 4 easy, 4 medium, 2 hard)
  // ============================================================

  // open for reading (syntax)
  {
    id: 'perl-file-001',
    category: 'File Operations',
    difficulty: 'easy',
    title: 'Open File for Reading',
    text: 'Write the correct `open` statement to open a file for reading.',
    setup: 'my $filename = "data.txt";',
    setupCode: 'my $filename = "data.txt";',
    expected: 'open(my $fh, "<", $filename)',
    sample: 'open(my $fh, "<", $filename)',
    hints: ['< is for reading', 'Three-argument open is recommended'],
    validPatterns: [/open\s*\(\s*my\s+\$\w+\s*,\s*["']<["']\s*,\s*\$filename\s*\)/],
    tags: ['open', 'files', 'read'],
  },

  // open for writing (syntax)
  {
    id: 'perl-file-002',
    category: 'File Operations',
    difficulty: 'easy',
    title: 'Open File for Writing',
    text: 'Write the correct `open` statement to open a file for writing (overwrite).',
    setup: 'my $filename = "output.txt";',
    setupCode: 'my $filename = "output.txt";',
    expected: 'open(my $fh, ">", $filename)',
    sample: 'open(my $fh, ">", $filename)',
    hints: ['> is for writing (overwrite)', 'Three-argument open is safest'],
    validPatterns: [/open\s*\(\s*my\s+\$\w+\s*,\s*["']>["']\s*,\s*\$filename\s*\)/],
    tags: ['open', 'files', 'write'],
  },

  // open for appending
  {
    id: 'perl-file-003',
    category: 'File Operations',
    difficulty: 'easy',
    title: 'Open File for Appending',
    text: 'Write the correct `open` statement to open a file for appending.',
    setup: 'my $filename = "log.txt";',
    setupCode: 'my $filename = "log.txt";',
    expected: 'open(my $fh, ">>", $filename)',
    sample: 'open(my $fh, ">>", $filename)',
    hints: ['>> is for appending', 'Adds to end of file without overwriting'],
    validPatterns: [/open\s*\(\s*my\s+\$\w+\s*,\s*["']>>["']\s*,\s*\$filename\s*\)/],
    tags: ['open', 'files', 'append'],
  },

  // close file
  {
    id: 'perl-file-004',
    category: 'File Operations',
    difficulty: 'easy',
    title: 'Close File Handle',
    text: 'Write the statement to close the file handle.',
    setup: 'my $fh;',
    setupCode: 'my $fh;',
    expected: 'close($fh)',
    sample: 'close($fh)',
    hints: ['close releases the file handle', 'Always close files when done'],
    validPatterns: [/close\s*\(\s*\$fh\s*\)/, /close\s+\$fh/],
    tags: ['close', 'files'],
  },

  // read entire file
  {
    id: 'perl-file-005',
    category: 'File Operations',
    difficulty: 'medium',
    title: 'Read Entire File into String',
    text: 'Write the expression to read the entire file into a single string using local $/.',
    setup: 'my $fh;',
    setupCode: 'my $fh;',
    expected: 'do { local $/; <$fh> }',
    sample: 'do { local $/; <$fh> }',
    hints: ['$/ is the input record separator', 'Setting to undef reads entire file'],
    validPatterns: [/do\s*\{\s*local\s+\$\/\s*;\s*<\$fh>\s*\}/, /local\s+\$\/\s*;\s*<\$fh>/],
    tags: ['read', 'files', 'slurp'],
  },

  // read lines into array
  {
    id: 'perl-file-006',
    category: 'File Operations',
    difficulty: 'medium',
    title: 'Read Lines into Array',
    text: 'Write the expression to read all lines from the file handle into an array.',
    setup: 'my $fh;',
    setupCode: 'my $fh;',
    expected: 'my @lines = <$fh>',
    sample: 'my @lines = <$fh>',
    hints: ['<> in list context reads all lines', 'Each line becomes an array element'],
    validPatterns: [/my\s+@\w+\s*=\s*<\$fh>/],
    tags: ['read', 'files', 'lines'],
  },

  // print to file
  {
    id: 'perl-file-007',
    category: 'File Operations',
    difficulty: 'medium',
    title: 'Print to File Handle',
    text: 'Write the statement to print "Hello, World!" to the file handle.',
    setup: 'my $fh;',
    setupCode: 'my $fh;',
    expected: 'print $fh "Hello, World!"',
    sample: 'print $fh "Hello, World!"',
    hints: ['print FILEHANDLE LIST', 'No comma between filehandle and text'],
    validPatterns: [/print\s+\$fh\s+["']Hello,\s*World!["']/],
    tags: ['print', 'files', 'write'],
  },

  // check file exists
  {
    id: 'perl-file-008',
    category: 'File Operations',
    difficulty: 'medium',
    title: 'Check if File Exists',
    text: 'Use the `-e` file test operator to check if the file exists.',
    setup: 'my $filename = "test.txt";',
    setupCode: 'my $filename = "test.txt";',
    expected: '-e $filename',
    sample: '-e $filename',
    hints: ['-e tests if file exists', 'File test operators return true/false'],
    validPatterns: [/-e\s+\$filename/, /-e\s+["']test\.txt["']/],
    tags: ['file-test', 'files', 'exists'],
  },

  // open with error handling
  {
    id: 'perl-file-009',
    category: 'File Operations',
    difficulty: 'hard',
    title: 'Open with Error Handling',
    text: 'Write an open statement with proper error handling using `or die`.',
    setup: 'my $filename = "data.txt";',
    setupCode: 'my $filename = "data.txt";',
    expected: 'open(my $fh, "<", $filename) or die "Cannot open: $!"',
    sample: 'open(my $fh, "<", $filename) or die "Cannot open: $!"',
    hints: ['or die handles open failures', '$! contains the error message'],
    validPatterns: [/open\s*\([^)]+\)\s+or\s+die/],
    tags: ['open', 'files', 'error-handling'],
  },

  // file size
  {
    id: 'perl-file-010',
    category: 'File Operations',
    difficulty: 'hard',
    title: 'Get File Size',
    text: 'Use the `-s` file test operator to get the size of the file in bytes.',
    setup: 'my $filename = "data.txt";',
    setupCode: 'my $filename = "data.txt";',
    expected: '-s $filename',
    sample: '-s $filename',
    hints: ['-s returns file size in bytes', 'Returns undef if file does not exist'],
    validPatterns: [/-s\s+\$filename/],
    tags: ['file-test', 'files', 'size'],
  },
];

export default perlProblems;
