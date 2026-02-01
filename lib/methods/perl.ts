import type { Method } from '../types';

/**
 * Perl Methods Reference
 * Comprehensive coverage of Perl 5 built-in functions and operators
 */

export const perlMethods: Method[] = [
  // ============================================================
  // Array Functions
  // ============================================================
  {
    name: 'push',
    category: 'Array Functions',
    syntax: 'push(@array, LIST)',
    description:
      'Appends one or more elements to the end of an array. Returns the new number of elements in the array.',
    arguments: [
      { name: '@array', type: 'array', description: 'The array to append to' },
      {
        name: 'LIST',
        type: 'scalar|list',
        description: 'One or more values to append',
      },
    ],
    returns: {
      type: 'number',
      description: 'The new number of elements in the array',
    },
    examples: [
      {
        code: 'my @arr = (1, 2, 3);\npush(@arr, 4, 5);\nprint "@arr\\n";',
        output: '1 2 3 4 5',
        explanation: 'Appends 4 and 5 to the end of @arr',
      },
      {
        code: 'my @a = ("a");\nmy $len = push(@a, "b", "c");\nprint "$len\\n";',
        output: '3',
        explanation: 'Returns the new length of the array',
      },
    ],
    timeComplexity: 'O(k) where k is number of elements added',
    spaceComplexity: 'O(k)',
    relatedMethods: ['pop', 'unshift', 'shift', 'splice'],
    sinceVersion: 'Perl 1',
    notes: [
      'Modifies the array in place',
      'Can push an entire list or another array onto the target array',
    ],
  },
  {
    name: 'pop',
    category: 'Array Functions',
    syntax: 'pop(@array)',
    description:
      'Removes and returns the last element of an array. If the array is empty, returns undef.',
    arguments: [
      {
        name: '@array',
        type: 'array',
        description: 'The array to remove from',
      },
    ],
    returns: {
      type: 'scalar',
      description: 'The removed last element, or undef if the array is empty',
    },
    examples: [
      {
        code: 'my @arr = (1, 2, 3);\nmy $last = pop(@arr);\nprint "$last\\n";',
        output: '3',
        explanation: 'Removes and returns the last element',
      },
      {
        code: 'my @arr = (10, 20);\npop @arr;\nprint "@arr\\n";',
        output: '10',
        explanation: 'Array is modified in place after pop',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['push', 'shift', 'unshift'],
    sinceVersion: 'Perl 1',
    notes: [
      'Returns undef when called on an empty array',
      'Parentheses are optional: pop @arr is equivalent to pop(@arr)',
    ],
  },
  {
    name: 'shift',
    category: 'Array Functions',
    syntax: 'shift(@array)',
    description:
      'Removes and returns the first element of an array, shortening the array by one and shifting all indices down by one.',
    arguments: [
      {
        name: '@array',
        type: 'array',
        description: 'The array to remove from',
      },
    ],
    returns: {
      type: 'scalar',
      description: 'The removed first element, or undef if the array is empty',
    },
    examples: [
      {
        code: 'my @arr = ("a", "b", "c");\nmy $first = shift(@arr);\nprint "$first\\n";',
        output: 'a',
        explanation: 'Removes and returns the first element',
      },
      {
        code: 'my @arr = (10, 20, 30);\nshift @arr;\nprint "@arr\\n";',
        output: '20 30',
        explanation: 'Remaining elements shift down to fill the gap',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['unshift', 'pop', 'push'],
    sinceVersion: 'Perl 1',
    notes: [
      'When used without an argument inside a subroutine, shifts from @_',
      'Commonly used to extract arguments in subroutines: my $self = shift;',
    ],
  },
  {
    name: 'unshift',
    category: 'Array Functions',
    syntax: 'unshift(@array, LIST)',
    description:
      'Prepends one or more elements to the beginning of an array. Returns the new number of elements in the array.',
    arguments: [
      {
        name: '@array',
        type: 'array',
        description: 'The array to prepend to',
      },
      {
        name: 'LIST',
        type: 'scalar|list',
        description: 'One or more values to prepend',
      },
    ],
    returns: {
      type: 'number',
      description: 'The new number of elements in the array',
    },
    examples: [
      {
        code: 'my @arr = (3, 4, 5);\nunshift(@arr, 1, 2);\nprint "@arr\\n";',
        output: '1 2 3 4 5',
        explanation: 'Prepends 1 and 2 at the beginning',
      },
    ],
    timeComplexity: 'O(n + k) where k is number of elements added',
    spaceComplexity: 'O(k)',
    relatedMethods: ['shift', 'push', 'pop'],
    sinceVersion: 'Perl 1',
    notes: ['The prepended elements maintain their order in the result'],
  },
  {
    name: 'splice',
    category: 'Array Functions',
    syntax: 'splice(@array, OFFSET, LENGTH, LIST)',
    description:
      'Removes elements from an array and optionally replaces them with new elements. Returns the removed elements.',
    arguments: [
      {
        name: '@array',
        type: 'array',
        description: 'The array to modify',
      },
      {
        name: 'OFFSET',
        type: 'integer',
        description: 'Starting position (negative counts from end)',
      },
      {
        name: 'LENGTH',
        type: 'integer',
        description: 'Number of elements to remove',
        optional: true,
      },
      {
        name: 'LIST',
        type: 'list',
        description: 'Replacement elements',
        optional: true,
      },
    ],
    returns: {
      type: 'list',
      description: 'The removed elements',
    },
    examples: [
      {
        code: 'my @arr = (1, 2, 3, 4, 5);\nmy @removed = splice(@arr, 1, 2);\nprint "@arr\\n";     # remaining\nprint "@removed\\n"; # removed',
        output: '1 4 5\n2 3',
        explanation: 'Removes 2 elements starting at index 1',
      },
      {
        code: 'my @arr = ("a", "b", "c", "d");\nsplice(@arr, 1, 1, "X", "Y");\nprint "@arr\\n";',
        output: 'a X Y c d',
        explanation: 'Replaces 1 element at index 1 with "X" and "Y"',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k) where k is number of removed/added elements',
    relatedMethods: ['push', 'pop', 'shift', 'unshift'],
    sinceVersion: 'Perl 1',
    notes: [
      'Without LENGTH, removes everything from OFFSET to the end',
      'Negative OFFSET counts from the end of the array',
      'This is the Swiss-army knife of array manipulation in Perl',
    ],
  },
  {
    name: 'sort',
    category: 'Array Functions',
    syntax: 'sort BLOCK LIST\nsort LIST',
    description:
      'Sorts a list and returns the sorted list. By default sorts lexicographically. A custom comparison block using $a and $b can be provided.',
    arguments: [
      {
        name: 'BLOCK',
        type: 'code block',
        description: 'Optional comparison block using $a and $b; should return -1, 0, or 1',
        optional: true,
      },
      {
        name: 'LIST',
        type: 'list',
        description: 'The list to sort',
      },
    ],
    returns: {
      type: 'list',
      description: 'A new sorted list',
    },
    examples: [
      {
        code: 'my @sorted = sort("banana", "apple", "cherry");\nprint "@sorted\\n";',
        output: 'apple banana cherry',
        explanation: 'Default lexicographic sort',
      },
      {
        code: 'my @nums = sort { $a <=> $b } (3, 1, 4, 1, 5);\nprint "@nums\\n";',
        output: '1 1 3 4 5',
        explanation: 'Numeric sort using the spaceship operator',
      },
      {
        code: 'my @desc = sort { $b <=> $a } (3, 1, 4, 1, 5);\nprint "@desc\\n";',
        output: '5 4 3 1 1',
        explanation: 'Descending numeric sort by reversing $a and $b',
      },
    ],
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['reverse', 'grep', 'map'],
    sinceVersion: 'Perl 1',
    notes: [
      'Default sort is lexicographic (string comparison), not numeric',
      'Use <=> for numeric comparison and cmp for string comparison',
      '$a and $b are special package globals used by the sort block',
      'Does not modify the original array; returns a new sorted list',
    ],
  },

  // ============================================================
  // String Functions
  // ============================================================
  {
    name: 'chomp',
    category: 'String Functions',
    syntax: 'chomp(VARIABLE)\nchomp(LIST)',
    description:
      'Removes the trailing newline (or the value of $/) from a string. Modifies the variable in place and returns the number of characters removed.',
    arguments: [
      {
        name: 'VARIABLE',
        type: 'scalar|list',
        description: 'The string or list of strings to remove trailing newlines from',
      },
    ],
    returns: {
      type: 'number',
      description: 'The total number of characters removed',
    },
    examples: [
      {
        code: 'my $line = "Hello World\\n";\nchomp($line);\nprint "$line\\n";',
        output: 'Hello World',
        explanation: 'Removes the trailing newline character',
      },
      {
        code: 'my $str = "no newline";\nmy $removed = chomp($str);\nprint "$removed\\n";',
        output: '0',
        explanation: 'Returns 0 when there is no trailing newline to remove',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['chop', 'split'],
    sinceVersion: 'Perl 1',
    notes: [
      'Only removes the line ending (value of $/), not arbitrary whitespace',
      'Safer than chop because it only removes the input record separator',
      'Very commonly used when reading lines from a file: chomp(my $line = <STDIN>)',
    ],
  },
  {
    name: 'chop',
    category: 'String Functions',
    syntax: 'chop(VARIABLE)',
    description:
      'Removes and returns the last character of a string regardless of what it is. Modifies the variable in place.',
    arguments: [
      {
        name: 'VARIABLE',
        type: 'scalar',
        description: 'The string to remove the last character from',
      },
    ],
    returns: {
      type: 'string',
      description: 'The character that was removed',
    },
    examples: [
      {
        code: 'my $str = "Hello!";\nmy $ch = chop($str);\nprint "$str => removed \'$ch\'\\n";',
        output: "Hello => removed '!'",
        explanation: 'Removes the last character regardless of what it is',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['chomp', 'substr'],
    sinceVersion: 'Perl 1',
    notes: [
      'Generally prefer chomp over chop for removing line endings',
      'chop is indiscriminate -- it always removes the last character',
    ],
  },
  {
    name: 'split',
    category: 'String Functions',
    syntax: 'split(/PATTERN/, EXPR, LIMIT)',
    description:
      'Splits a string into a list of substrings based on a delimiter pattern. Returns the list of substrings.',
    arguments: [
      {
        name: 'PATTERN',
        type: 'regex',
        description: 'The delimiter pattern to split on',
      },
      {
        name: 'EXPR',
        type: 'string',
        description: 'The string to split',
        optional: true,
        defaultValue: '$_',
      },
      {
        name: 'LIMIT',
        type: 'integer',
        description: 'Maximum number of fields to produce',
        optional: true,
      },
    ],
    returns: {
      type: 'list',
      description: 'A list of substrings',
    },
    examples: [
      {
        code: 'my @words = split(/,/, "one,two,three");\nprint "@words\\n";',
        output: 'one two three',
        explanation: 'Splits a comma-separated string',
      },
      {
        code: 'my @parts = split(/\\s+/, "  hello   world  ");\nprint join("|", @parts) . "\\n";',
        output: '|hello|world',
        explanation: 'Splits on whitespace; leading whitespace creates an empty first field',
      },
      {
        code: 'my @chars = split(//, "abc");\nprint "@chars\\n";',
        output: 'a b c',
        explanation: 'Empty pattern splits into individual characters',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['join', 'index', 'substr'],
    sinceVersion: 'Perl 1',
    notes: [
      'The special pattern " " (a single space string) splits on any whitespace and strips leading whitespace',
      'Negative LIMIT keeps trailing empty fields',
    ],
  },
  {
    name: 'join',
    category: 'String Functions',
    syntax: 'join(EXPR, LIST)',
    description:
      'Joins the elements of a list into a single string, separated by the value of EXPR.',
    arguments: [
      {
        name: 'EXPR',
        type: 'string',
        description: 'The separator string',
      },
      {
        name: 'LIST',
        type: 'list',
        description: 'The list of values to join',
      },
    ],
    returns: {
      type: 'string',
      description: 'A single string with all elements joined by the separator',
    },
    examples: [
      {
        code: 'my $csv = join(",", "a", "b", "c");\nprint "$csv\\n";',
        output: 'a,b,c',
        explanation: 'Joins elements with a comma',
      },
      {
        code: 'my @words = ("Hello", "World");\nprint join(" ", @words) . "\\n";',
        output: 'Hello World',
        explanation: 'Joins array elements with a space',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['split'],
    sinceVersion: 'Perl 1',
    notes: ['The separator can be any string, including the empty string'],
  },
  {
    name: 'substr',
    category: 'String Functions',
    syntax: 'substr(EXPR, OFFSET, LENGTH, REPLACEMENT)',
    description:
      'Extracts a substring from a string. Can also replace part of the string when a REPLACEMENT is given.',
    arguments: [
      {
        name: 'EXPR',
        type: 'string',
        description: 'The source string',
      },
      {
        name: 'OFFSET',
        type: 'integer',
        description: 'Starting position (negative counts from end)',
      },
      {
        name: 'LENGTH',
        type: 'integer',
        description: 'Number of characters to extract',
        optional: true,
      },
      {
        name: 'REPLACEMENT',
        type: 'string',
        description: 'String to replace the extracted portion with',
        optional: true,
      },
    ],
    returns: {
      type: 'string',
      description: 'The extracted substring',
    },
    examples: [
      {
        code: 'my $str = "Hello, World!";\nprint substr($str, 7, 5) . "\\n";',
        output: 'World',
        explanation: 'Extracts 5 characters starting at index 7',
      },
      {
        code: 'my $str = "Hello, World!";\nprint substr($str, -6) . "\\n";',
        output: 'orld!',
        explanation: 'Negative offset counts from the end',
      },
      {
        code: 'my $str = "Hello";\nsubstr($str, 0, 5, "Goodbye");\nprint "$str\\n";',
        output: 'Goodbye',
        explanation: 'Replaces the substring in place with REPLACEMENT',
      },
    ],
    timeComplexity: 'O(k) where k is the length of the substring',
    spaceComplexity: 'O(k)',
    relatedMethods: ['index', 'rindex', 'length'],
    sinceVersion: 'Perl 1',
    notes: [
      'Can be used as an lvalue: substr($str, 0, 3) = "abc"',
      'Negative OFFSET counts from the end of the string',
    ],
  },
  {
    name: 'index',
    category: 'String Functions',
    syntax: 'index(STR, SUBSTR, POSITION)',
    description:
      'Returns the position of the first occurrence of SUBSTR in STR at or after POSITION. Returns -1 if not found.',
    arguments: [
      {
        name: 'STR',
        type: 'string',
        description: 'The string to search in',
      },
      {
        name: 'SUBSTR',
        type: 'string',
        description: 'The substring to search for',
      },
      {
        name: 'POSITION',
        type: 'integer',
        description: 'Starting position for the search',
        optional: true,
        defaultValue: '0',
      },
    ],
    returns: {
      type: 'integer',
      description: 'The position of the first match, or -1 if not found',
    },
    examples: [
      {
        code: 'my $pos = index("Hello, World!", "World");\nprint "$pos\\n";',
        output: '7',
        explanation: '"World" starts at index 7',
      },
      {
        code: 'my $pos = index("abcabc", "abc", 1);\nprint "$pos\\n";',
        output: '3',
        explanation: 'Searching from position 1 finds the second occurrence',
      },
      {
        code: 'my $pos = index("Hello", "xyz");\nprint "$pos\\n";',
        output: '-1',
        explanation: 'Returns -1 when substring is not found',
      },
    ],
    timeComplexity: 'O(n * m)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['rindex', 'substr'],
    sinceVersion: 'Perl 1',
    notes: ['For pattern-based searching, use regular expressions instead'],
  },

  // ============================================================
  // Hash Functions
  // ============================================================
  {
    name: 'keys',
    category: 'Hash Functions',
    syntax: 'keys(%hash)',
    description:
      'Returns a list of all the keys in a hash. The order is unpredictable but consistent with values() for the same unmodified hash.',
    arguments: [
      {
        name: '%hash',
        type: 'hash',
        description: 'The hash to extract keys from',
      },
    ],
    returns: {
      type: 'list',
      description: 'A list of all keys in the hash',
    },
    examples: [
      {
        code: 'my %h = (name => "Alice", age => 30, city => "NYC");\nmy @k = sort keys %h;\nprint "@k\\n";',
        output: 'age city name',
        explanation: 'Returns all keys (sorted here for predictable output)',
      },
      {
        code: 'my %h = (a => 1, b => 2, c => 3);\nprint scalar(keys %h) . "\\n";',
        output: '3',
        explanation: 'In scalar context, returns the number of key-value pairs',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['values', 'each', 'exists', 'delete'],
    sinceVersion: 'Perl 1',
    notes: [
      'The order of keys is not guaranteed and may vary between runs',
      'In scalar context, returns the number of entries in the hash',
    ],
  },
  {
    name: 'values',
    category: 'Hash Functions',
    syntax: 'values(%hash)',
    description:
      'Returns a list of all the values in a hash. The order corresponds to the order returned by keys() for the same unmodified hash.',
    arguments: [
      {
        name: '%hash',
        type: 'hash',
        description: 'The hash to extract values from',
      },
    ],
    returns: {
      type: 'list',
      description: 'A list of all values in the hash',
    },
    examples: [
      {
        code: 'my %h = (a => 1, b => 2, c => 3);\nmy @v = sort { $a <=> $b } values %h;\nprint "@v\\n";',
        output: '1 2 3',
        explanation: 'Returns all values (sorted here for predictable output)',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['keys', 'each'],
    sinceVersion: 'Perl 1',
    notes: ['Modifying the hash while iterating over values is not safe'],
  },
  {
    name: 'exists',
    category: 'Hash Functions',
    syntax: 'exists($hash{KEY})',
    description:
      'Checks whether a key exists in a hash. Returns true if the key is present, even if its value is undef.',
    arguments: [
      {
        name: '$hash{KEY}',
        type: 'hash element',
        description: 'The hash element to check for existence',
      },
    ],
    returns: {
      type: 'boolean',
      description: 'True if the key exists, false otherwise',
    },
    examples: [
      {
        code: 'my %h = (name => "Alice", age => undef);\nprint exists($h{name}) ? "yes" : "no";\nprint "\\n";',
        output: 'yes',
        explanation: 'Key "name" exists in the hash',
      },
      {
        code: 'my %h = (name => "Alice", age => undef);\nprint exists($h{age}) ? "yes" : "no";\nprint "\\n";',
        output: 'yes',
        explanation: 'Key "age" exists even though its value is undef',
      },
      {
        code: 'my %h = (name => "Alice");\nprint exists($h{email}) ? "yes" : "no";\nprint "\\n";',
        output: 'no',
        explanation: 'Key "email" does not exist in the hash',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['defined', 'delete', 'keys'],
    sinceVersion: 'Perl 5',
    notes: [
      'Different from defined: exists checks for key presence, defined checks if the value is not undef',
      'Can also be used with array elements: exists($arr[$index])',
    ],
  },
  {
    name: 'delete',
    category: 'Hash Functions',
    syntax: 'delete($hash{KEY})',
    description: 'Removes a key-value pair from a hash and returns the deleted value.',
    arguments: [
      {
        name: '$hash{KEY}',
        type: 'hash element',
        description: 'The hash element to delete',
      },
    ],
    returns: {
      type: 'scalar',
      description: 'The value associated with the deleted key, or undef if not found',
    },
    examples: [
      {
        code: 'my %h = (a => 1, b => 2, c => 3);\nmy $val = delete $h{b};\nprint "$val\\n";\nprint join(", ", sort keys %h) . "\\n";',
        output: '2\na, c',
        explanation: 'Removes key "b" and returns its value 2',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['exists', 'keys', 'values'],
    sinceVersion: 'Perl 1',
    notes: [
      'Can delete multiple keys: delete @hash{@keys}',
      'Can also be used with array elements: delete $arr[$index]',
    ],
  },

  // ============================================================
  // I/O Functions
  // ============================================================
  {
    name: 'print',
    category: 'I/O Functions',
    syntax: 'print FILEHANDLE LIST\nprint LIST',
    description:
      'Prints a string or a list of strings to a filehandle (STDOUT by default). Returns true on success, false on failure.',
    arguments: [
      {
        name: 'FILEHANDLE',
        type: 'filehandle',
        description: 'The filehandle to print to',
        optional: true,
        defaultValue: 'STDOUT',
      },
      {
        name: 'LIST',
        type: 'list',
        description: 'The values to print',
      },
    ],
    returns: {
      type: 'boolean',
      description: 'True on success, false on failure',
    },
    examples: [
      {
        code: 'print "Hello, World!\\n";',
        output: 'Hello, World!',
        explanation: 'Prints a string to STDOUT',
      },
      {
        code: 'my @items = ("a", "b", "c");\n$, = ", ";\nprint @items;\nprint "\\n";',
        output: 'a, b, c',
        explanation: 'List elements separated by $, (output field separator)',
      },
      {
        code: 'open(my $fh, ">", "output.txt") or die $!;\nprint $fh "written to file\\n";\nclose($fh);',
        output: '(writes "written to file" to output.txt)',
        explanation: 'Prints to a file handle instead of STDOUT',
      },
    ],
    relatedMethods: ['say', 'printf', 'warn'],
    sinceVersion: 'Perl 1',
    notes: [
      'Does not automatically append a newline (use say for that)',
      'The separator between FILEHANDLE and LIST is a space, not a comma',
      'Set $\\ (output record separator) to auto-append after each print',
    ],
  },
  {
    name: 'say',
    category: 'I/O Functions',
    syntax: 'say FILEHANDLE LIST\nsay LIST',
    description:
      'Like print, but automatically appends a newline at the end. Requires "use feature \'say\'" or "use v5.10".',
    arguments: [
      {
        name: 'FILEHANDLE',
        type: 'filehandle',
        description: 'The filehandle to print to',
        optional: true,
        defaultValue: 'STDOUT',
      },
      {
        name: 'LIST',
        type: 'list',
        description: 'The values to print',
      },
    ],
    returns: {
      type: 'boolean',
      description: 'True on success, false on failure',
    },
    examples: [
      {
        code: 'use v5.10;\nsay "Hello, World!";',
        output: 'Hello, World!',
        explanation: 'Prints with an automatic trailing newline',
      },
      {
        code: 'use feature "say";\nmy $name = "Perl";\nsay "Hello, $name!";',
        output: 'Hello, Perl!',
        explanation: 'Variable interpolation works as expected',
      },
    ],
    relatedMethods: ['print', 'warn'],
    sinceVersion: 'Perl 5.10',
    notes: [
      'Requires: use feature "say" or use v5.10 or higher',
      'Equivalent to print LIST, "\\n"',
    ],
  },
  {
    name: 'open',
    category: 'I/O Functions',
    syntax: 'open(FILEHANDLE, MODE, EXPR)',
    description:
      'Opens a file and associates it with a filehandle. Supports reading, writing, appending, and piping. Returns true on success.',
    arguments: [
      {
        name: 'FILEHANDLE',
        type: 'filehandle',
        description: 'The filehandle variable to associate with the opened file',
      },
      {
        name: 'MODE',
        type: 'string',
        description:
          'The open mode: "<" (read), ">" (write), ">>" (append), "|-" (pipe out), "-|" (pipe in)',
      },
      {
        name: 'EXPR',
        type: 'string',
        description: 'The file path or command',
      },
    ],
    returns: {
      type: 'boolean',
      description: 'True on success, false on failure (sets $! with error)',
    },
    examples: [
      {
        code: 'open(my $fh, "<", "data.txt") or die "Cannot open: $!";\nwhile (my $line = <$fh>) {\n    chomp $line;\n    print "$line\\n";\n}\nclose($fh);',
        output: '(contents of data.txt, line by line)',
        explanation: 'Opens a file for reading and iterates over lines',
      },
      {
        code: 'open(my $fh, ">", "output.txt") or die "Cannot open: $!";\nprint $fh "Hello, file!\\n";\nclose($fh);',
        output: '(writes to output.txt)',
        explanation: 'Opens a file for writing (creates or truncates)',
      },
      {
        code: 'open(my $fh, ">>", "log.txt") or die "Cannot open: $!";\nprint $fh "appended line\\n";\nclose($fh);',
        output: '(appends to log.txt)',
        explanation: 'Opens a file for appending',
      },
    ],
    relatedMethods: ['close', 'print', 'say'],
    sinceVersion: 'Perl 1',
    notes: [
      'Always use the three-argument form for security (avoids shell injection)',
      'Always check the return value: open(...) or die $!',
      'Use lexical filehandles (my $fh) instead of bareword filehandles',
    ],
  },

  // ============================================================
  // Regular Expressions
  // ============================================================
  {
    name: 'm//',
    category: 'Regular Expressions',
    syntax: 'm/PATTERN/FLAGS\n/PATTERN/FLAGS',
    description:
      'Matches a string against a regular expression pattern. Returns true if the pattern matches. The m can be omitted when using // delimiters.',
    arguments: [
      {
        name: 'PATTERN',
        type: 'regex',
        description: 'The regular expression pattern to match',
      },
      {
        name: 'FLAGS',
        type: 'string',
        description:
          'Modifier flags: i (case-insensitive), g (global), m (multiline), s (single-line), x (extended)',
        optional: true,
      },
    ],
    returns: {
      type: 'boolean|list',
      description:
        'In scalar context, true/false. In list context with /g, returns all matches. Capture groups populate $1, $2, etc.',
    },
    examples: [
      {
        code: 'my $str = "Hello, World!";\nif ($str =~ /World/) {\n    print "Found it!\\n";\n}',
        output: 'Found it!',
        explanation: 'Simple pattern match returns true',
      },
      {
        code: 'my $str = "The year is 2024";\nif ($str =~ /(\\d{4})/) {\n    print "Year: $1\\n";\n}',
        output: 'Year: 2024',
        explanation: 'Capture group stores matched text in $1',
      },
      {
        code: 'my $str = "one1two2three3";\nmy @nums = ($str =~ /(\\d+)/g);\nprint "@nums\\n";',
        output: '1 2 3',
        explanation: 'Global match with capture group returns all matches',
      },
    ],
    relatedMethods: ['s///', '=~'],
    sinceVersion: 'Perl 1',
    notes: [
      'The =~ operator binds the match to a specific variable (defaults to $_)',
      'Use !~ to negate the match',
      'The /x flag allows comments and whitespace in the pattern for readability',
      'Named captures: (?<name>pattern) accessible via $+{name}',
    ],
  },
  {
    name: 's///',
    category: 'Regular Expressions',
    syntax: 's/PATTERN/REPLACEMENT/FLAGS',
    description:
      'Searches for a pattern and replaces it with the replacement string. Modifies the string in place and returns the number of substitutions made.',
    arguments: [
      {
        name: 'PATTERN',
        type: 'regex',
        description: 'The regular expression pattern to search for',
      },
      {
        name: 'REPLACEMENT',
        type: 'string',
        description: 'The replacement string (can use $1, $2, etc. for backreferences)',
      },
      {
        name: 'FLAGS',
        type: 'string',
        description:
          'Modifier flags: g (global), i (case-insensitive), e (evaluate replacement as code), r (return modified copy)',
        optional: true,
      },
    ],
    returns: {
      type: 'number|string',
      description:
        'Number of substitutions made, or with /r flag, the modified string without changing the original',
    },
    examples: [
      {
        code: 'my $str = "Hello, World!";\n$str =~ s/World/Perl/;\nprint "$str\\n";',
        output: 'Hello, Perl!',
        explanation: 'Replaces first occurrence of "World" with "Perl"',
      },
      {
        code: 'my $str = "aaa bbb ccc";\n$str =~ s/[a-z]+/X/g;\nprint "$str\\n";',
        output: 'X X X',
        explanation: 'Global flag replaces all occurrences',
      },
      {
        code: 'my $str = "price: 100";\n$str =~ s/(\\d+)/$1 * 2/e;\nprint "$str\\n";',
        output: 'price: 200',
        explanation: 'The /e flag evaluates the replacement as Perl code',
      },
      {
        code: 'my $original = "Hello, World!";\nmy $copy = $original =~ s/World/Perl/r;\nprint "$original\\n$copy\\n";',
        output: 'Hello, World!\nHello, Perl!',
        explanation: 'The /r flag returns a modified copy, leaving the original unchanged',
      },
    ],
    relatedMethods: ['m//', 'tr///'],
    sinceVersion: 'Perl 1',
    notes: [
      'Without /g, only the first match is replaced',
      'The /r flag (Perl 5.14+) returns the modified string without altering the original',
      'The /e flag evaluates the replacement as a Perl expression',
      'Use \\1 in the pattern itself and $1 in the replacement',
    ],
  },
  {
    name: 'tr///',
    category: 'Regular Expressions',
    syntax: 'tr/SEARCHLIST/REPLACEMENTLIST/FLAGS\ny/SEARCHLIST/REPLACEMENTLIST/FLAGS',
    description:
      'Transliterates characters in a string. Each character in SEARCHLIST is replaced with the corresponding character in REPLACEMENTLIST. Returns the number of characters replaced or deleted.',
    arguments: [
      {
        name: 'SEARCHLIST',
        type: 'string',
        description: 'Characters to search for',
      },
      {
        name: 'REPLACEMENTLIST',
        type: 'string',
        description: 'Replacement characters (positionally mapped)',
      },
      {
        name: 'FLAGS',
        type: 'string',
        description: 'Flags: c (complement), d (delete), s (squash duplicates)',
        optional: true,
      },
    ],
    returns: {
      type: 'number',
      description: 'The number of characters replaced, deleted, or found',
    },
    examples: [
      {
        code: 'my $str = "Hello, World!";\n$str =~ tr/a-z/A-Z/;\nprint "$str\\n";',
        output: 'HELLO, WORLD!',
        explanation: 'Transliterates lowercase to uppercase',
      },
      {
        code: 'my $str = "Hello, World!";\nmy $count = ($str =~ tr/o//);  # count without modifying\nprint "$count\\n";',
        output: '2',
        explanation: 'Counts occurrences of "o" without modifying the string',
      },
      {
        code: 'my $str = "aabbcc";\n$str =~ tr/a-c/x/s;\nprint "$str\\n";',
        output: 'x',
        explanation: 'The /s flag squashes duplicate replacement characters',
      },
    ],
    relatedMethods: ['s///', 'uc', 'lc'],
    sinceVersion: 'Perl 1',
    notes: [
      'tr/// is not a regular expression; it operates on individual characters',
      'y/// is a synonym for tr///',
      'Commonly used to count characters: my $count = ($str =~ tr/a//)',
      'Use /d to delete characters not in the replacement list',
    ],
  },

  // ============================================================
  // Utility Functions
  // ============================================================
  {
    name: 'defined',
    category: 'Utility Functions',
    syntax: 'defined(EXPR)',
    description:
      'Returns true if the expression has a value other than undef. Used to check whether a variable has been assigned a value.',
    arguments: [
      {
        name: 'EXPR',
        type: 'scalar',
        description: 'The expression to check for definedness',
      },
    ],
    returns: {
      type: 'boolean',
      description: 'True if the expression is defined, false if undef',
    },
    examples: [
      {
        code: 'my $x = 42;\nprint defined($x) ? "defined" : "undef";\nprint "\\n";',
        output: 'defined',
        explanation: 'Variable with a value is defined',
      },
      {
        code: 'my $y;\nprint defined($y) ? "defined" : "undef";\nprint "\\n";',
        output: 'undef',
        explanation: 'Uninitialized variable is undef',
      },
      {
        code: 'my %h = (a => 1);\nprint defined($h{b}) ? "defined" : "undef";\nprint "\\n";',
        output: 'undef',
        explanation: 'Non-existent hash key returns undef',
      },
    ],
    relatedMethods: ['exists', 'ref', 'undef'],
    sinceVersion: 'Perl 1',
    notes: [
      'A value of 0 or "" (empty string) is defined but false',
      'Use the // (defined-or) operator for defaults: my $val = $x // "default"',
    ],
  },
  {
    name: 'ref',
    category: 'Utility Functions',
    syntax: 'ref(EXPR)',
    description:
      'Returns a string indicating the type of reference, or an empty string if the argument is not a reference. Used for runtime type checking.',
    arguments: [
      {
        name: 'EXPR',
        type: 'scalar',
        description: 'The value to check',
      },
    ],
    returns: {
      type: 'string',
      description:
        'The reference type: "SCALAR", "ARRAY", "HASH", "CODE", "REF", "GLOB", "REGEXP", or a blessed class name. Empty string if not a reference.',
    },
    examples: [
      {
        code: 'my $aref = [1, 2, 3];\nprint ref($aref) . "\\n";',
        output: 'ARRAY',
        explanation: 'An array reference returns "ARRAY"',
      },
      {
        code: 'my $href = { a => 1 };\nprint ref($href) . "\\n";',
        output: 'HASH',
        explanation: 'A hash reference returns "HASH"',
      },
      {
        code: 'my $code = sub { 1 };\nprint ref($code) . "\\n";',
        output: 'CODE',
        explanation: 'A code reference returns "CODE"',
      },
      {
        code: 'my $scalar = 42;\nprint ref($scalar) || "not a ref";\nprint "\\n";',
        output: 'not a ref',
        explanation: 'A plain scalar is not a reference',
      },
    ],
    relatedMethods: ['defined', 'blessed'],
    sinceVersion: 'Perl 5',
    notes: [
      'For blessed objects, ref returns the class name',
      'Use Scalar::Util::blessed() for more precise object type checking',
      'ref is often used in method dispatch and parameter validation',
    ],
  },
  {
    name: 'die',
    category: 'Utility Functions',
    syntax: 'die(LIST)',
    description:
      'Throws an exception. If not caught by eval, prints the message to STDERR and exits the program with a non-zero status. If LIST is a reference, it can be caught and inspected as a structured exception.',
    arguments: [
      {
        name: 'LIST',
        type: 'list|reference',
        description: 'The error message or exception object to throw',
      },
    ],
    returns: {
      type: 'void',
      description: 'Does not return; raises an exception',
    },
    examples: [
      {
        code: 'open(my $fh, "<", "missing.txt") or die "Cannot open: $!\\n";',
        output: 'Cannot open: No such file or directory',
        explanation: 'Common idiom: die on file open failure with $! error message',
      },
      {
        code: 'eval {\n    die "something went wrong";\n};\nif ($@) {\n    print "Caught: $@\\n";\n}',
        output: 'Caught: something went wrong at script.pl line 2.',
        explanation: 'die can be caught with eval { } and inspected via $@',
      },
      {
        code: 'eval {\n    die { code => 404, message => "Not Found" };\n};\nif (ref $@ eq "HASH") {\n    print "$@->{code}: $@->{message}\\n";\n}',
        output: '404: Not Found',
        explanation: 'Throwing a reference allows structured exception handling',
      },
    ],
    relatedMethods: ['warn', 'eval', 'Carp::croak'],
    sinceVersion: 'Perl 1',
    notes: [
      'If the message does not end in a newline, Perl appends file and line number',
      'End with \\n to suppress the automatic file/line annotation',
      'Use Carp::croak for errors reported from the caller perspective',
      'Commonly paired with eval for exception handling',
    ],
  },

  // ============================================================
  // Additional Array Functions
  // ============================================================
  {
    name: 'grep',
    category: 'Array Functions',
    syntax: 'grep BLOCK LIST\ngrep(EXPR, LIST)',
    description:
      'Filters a list by evaluating a block or expression for each element. Returns the list of elements for which the expression is true.',
    arguments: [
      {
        name: 'BLOCK',
        type: 'code block',
        description: 'A block that evaluates to true or false for each element (aliased as $_)',
      },
      {
        name: 'LIST',
        type: 'list',
        description: 'The list to filter',
      },
    ],
    returns: {
      type: 'list',
      description:
        'In list context, the matching elements. In scalar context, the count of matches.',
    },
    examples: [
      {
        code: 'my @evens = grep { $_ % 2 == 0 } (1, 2, 3, 4, 5, 6);\nprint "@evens\\n";',
        output: '2 4 6',
        explanation: 'Filters to keep only even numbers',
      },
      {
        code: 'my @words = ("apple", "banana", "avocado", "cherry");\nmy @a_words = grep { /^a/i } @words;\nprint "@a_words\\n";',
        output: 'apple avocado',
        explanation: 'Filters words starting with "a"',
      },
      {
        code: 'my @nums = (1, 2, 3, 4, 5);\nmy $count = grep { $_ > 3 } @nums;\nprint "$count\\n";',
        output: '2',
        explanation: 'In scalar context, returns the count of matching elements',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['map', 'sort'],
    sinceVersion: 'Perl 1',
    notes: [
      '$_ is aliased to each element, so modifying $_ modifies the original',
      'In scalar context, returns the number of matches (useful for counting)',
      'Similar to UNIX grep but operates on Perl lists, not file contents',
    ],
  },
  {
    name: 'map',
    category: 'Array Functions',
    syntax: 'map BLOCK LIST\nmap(EXPR, LIST)',
    description:
      'Applies a block or expression to each element of a list and returns the list of results. Each element is aliased as $_.',
    arguments: [
      {
        name: 'BLOCK',
        type: 'code block',
        description: 'A block to evaluate for each element, with $_ aliased to the current element',
      },
      {
        name: 'LIST',
        type: 'list',
        description: 'The list to transform',
      },
    ],
    returns: {
      type: 'list',
      description: 'A new list of transformed values',
    },
    examples: [
      {
        code: 'my @doubled = map { $_ * 2 } (1, 2, 3, 4);\nprint "@doubled\\n";',
        output: '2 4 6 8',
        explanation: 'Doubles each element',
      },
      {
        code: 'my @words = ("hello", "world");\nmy @upper = map { uc($_) } @words;\nprint "@upper\\n";',
        output: 'HELLO WORLD',
        explanation: 'Converts each word to uppercase',
      },
      {
        code: 'my @nums = (1, 2, 3);\nmy @expanded = map { ($_, $_ * 10) } @nums;\nprint "@expanded\\n";',
        output: '1 10 2 20 3 30',
        explanation: 'Each block can return multiple values, flattening into the result',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['grep', 'sort', 'foreach'],
    sinceVersion: 'Perl 1',
    notes: [
      'The block can return any number of values per element (including zero)',
      '$_ is aliased, so modifying $_ modifies the original list element',
      'Use map for transformations and grep for filtering',
    ],
  },

  // ============================================================
  // Additional String Functions
  // ============================================================
  {
    name: 'uc',
    category: 'String Functions',
    syntax: 'uc(EXPR)',
    description: 'Returns an uppercased version of EXPR. If EXPR is omitted, uses $_.',
    arguments: [
      {
        name: 'EXPR',
        type: 'string',
        description: 'The string to convert to uppercase',
        optional: true,
        defaultValue: '$_',
      },
    ],
    returns: {
      type: 'string',
      description: 'The uppercased string',
    },
    examples: [
      {
        code: 'print uc("hello, world!") . "\\n";',
        output: 'HELLO, WORLD!',
        explanation: 'Converts entire string to uppercase',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['lc', 'ucfirst', 'lcfirst'],
    sinceVersion: 'Perl 1',
    notes: [
      'Respects the current locale if "use locale" is in effect',
      'For Unicode-aware uppercasing, use "use utf8" and "use open":',
    ],
  },
  {
    name: 'lc',
    category: 'String Functions',
    syntax: 'lc(EXPR)',
    description: 'Returns a lowercased version of EXPR. If EXPR is omitted, uses $_.',
    arguments: [
      {
        name: 'EXPR',
        type: 'string',
        description: 'The string to convert to lowercase',
        optional: true,
        defaultValue: '$_',
      },
    ],
    returns: {
      type: 'string',
      description: 'The lowercased string',
    },
    examples: [
      {
        code: 'print lc("HELLO, WORLD!") . "\\n";',
        output: 'hello, world!',
        explanation: 'Converts entire string to lowercase',
      },
      {
        code: 'my $str = "Perl";\nprint lc($str) . "\\n";',
        output: 'perl',
        explanation: 'Lowercases a variable',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['uc', 'lcfirst', 'ucfirst'],
    sinceVersion: 'Perl 1',
    notes: ['Respects the current locale if "use locale" is in effect'],
  },

  // ============================================================
  // Additional Utility Functions
  // ============================================================
  {
    name: 'scalar',
    category: 'Utility Functions',
    syntax: 'scalar(EXPR)',
    description:
      'Forces EXPR to be evaluated in scalar context. Most commonly used to get the length of an array.',
    arguments: [
      {
        name: 'EXPR',
        type: 'any',
        description: 'The expression to evaluate in scalar context',
      },
    ],
    returns: {
      type: 'scalar',
      description: 'The scalar-context evaluation of the expression',
    },
    examples: [
      {
        code: 'my @arr = (1, 2, 3, 4, 5);\nprint scalar(@arr) . "\\n";',
        output: '5',
        explanation: 'Returns the number of elements in the array',
      },
      {
        code: 'my %h = (a => 1, b => 2);\nprint scalar(%h) . "\\n";',
        output: '2/8',
        explanation:
          'For a hash, shows used buckets / total buckets (Perl 5) or count (Perl 5.26+)',
      },
    ],
    relatedMethods: ['ref', 'defined'],
    sinceVersion: 'Perl 1',
    notes: [
      'Often unnecessary since Perl already evaluates in scalar context where expected',
      'scalar(@array) is the idiomatic way to get array length',
      'In Perl 5.26+, scalar(%hash) returns the number of key-value pairs',
    ],
  },
  {
    name: 'warn',
    category: 'Utility Functions',
    syntax: 'warn(LIST)',
    description:
      'Prints a warning message to STDERR. Unlike die, it does not throw an exception or exit the program.',
    arguments: [
      {
        name: 'LIST',
        type: 'list',
        description: 'The warning message(s) to print to STDERR',
      },
    ],
    returns: {
      type: 'boolean',
      description: 'Always returns true',
    },
    examples: [
      {
        code: 'warn "This is a warning\\n";',
        output: 'This is a warning',
        explanation: 'Prints warning to STDERR',
      },
      {
        code: 'warn "Something looks off";',
        output: 'Something looks off at script.pl line 1.',
        explanation: 'Without trailing newline, Perl appends file and line number',
      },
    ],
    relatedMethods: ['die', 'Carp::carp'],
    sinceVersion: 'Perl 1',
    notes: [
      'Output goes to STDERR, not STDOUT',
      'Can be intercepted with $SIG{__WARN__} handler',
      'Like die, appends file/line info unless the message ends with \\n',
      'Use Carp::carp for warnings reported from the caller perspective',
    ],
  },
];

export default perlMethods;
