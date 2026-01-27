import type { RegexCheatsheetEntry } from './types';

export const REGEX_CHEATSHEET: RegexCheatsheetEntry[] = [
  // ── Character Classes ──────────────────────────────────────────────
  {
    pattern: 'abc',
    description: 'Matches the literal characters abc',
    category: 'Character Classes',
  },
  {
    pattern: '123',
    description: 'Matches the literal digits 123',
    category: 'Character Classes',
  },
  {
    pattern: '\\d',
    description: 'Matches any digit (0-9)',
    example: '\\d matches "3" in "file3"',
    category: 'Character Classes',
  },
  {
    pattern: '\\D',
    description: 'Matches any non-digit character',
    example: '\\D matches "f" in "f3"',
    category: 'Character Classes',
  },
  {
    pattern: '.',
    description: 'Matches any character except newline',
    example: '.at matches "cat", "bat"',
    category: 'Character Classes',
  },
  {
    pattern: '\\.',
    description: 'Matches a literal period (dot)',
    example: '\\. matches "." in "index.html"',
    category: 'Character Classes',
  },
  {
    pattern: '[abc]',
    description: 'Matches any one of a, b, or c',
    example: '[aeiou] matches vowels',
    category: 'Character Classes',
  },
  {
    pattern: '[^abc]',
    description: 'Matches any character NOT a, b, or c',
    example: '[^0-9] matches non-digits',
    category: 'Character Classes',
  },
  {
    pattern: '[a-z]',
    description: 'Matches any lowercase letter',
    example: '[a-z]+ matches "hello"',
    category: 'Character Classes',
  },
  {
    pattern: '[0-9]',
    description: 'Matches any digit (same as \\d)',
    example: '[0-9]{3} matches "123"',
    category: 'Character Classes',
  },
  {
    pattern: '\\w',
    description: 'Matches word character [a-zA-Z0-9_]',
    example: '\\w+ matches "hello_world"',
    category: 'Character Classes',
  },
  {
    pattern: '\\W',
    description: 'Matches non-word character',
    example: '\\W matches " " in "hello world"',
    category: 'Character Classes',
  },
  {
    pattern: '\\s',
    description: 'Matches whitespace (space, tab, newline)',
    example: '\\s+ matches spaces',
    category: 'Character Classes',
  },
  {
    pattern: '\\S',
    description: 'Matches non-whitespace character',
    example: '\\S+ matches "hello"',
    category: 'Character Classes',
  },

  // ── Quantifiers ────────────────────────────────────────────────────
  {
    pattern: '{m}',
    description: 'Matches exactly m times',
    example: '\\d{3} matches "123"',
    category: 'Quantifiers',
  },
  {
    pattern: '{m,n}',
    description: 'Matches between m and n times',
    example: '\\d{2,4} matches "12", "123", "1234"',
    category: 'Quantifiers',
  },
  {
    pattern: '*',
    description: 'Matches 0 or more times (greedy)',
    example: 'a* matches "", "a", "aaa"',
    category: 'Quantifiers',
  },
  {
    pattern: '+',
    description: 'Matches 1 or more times (greedy)',
    example: 'a+ matches "a", "aaa"',
    category: 'Quantifiers',
  },
  {
    pattern: '?',
    description: 'Matches 0 or 1 time (optional)',
    example: 'colou?r matches "color", "colour"',
    category: 'Quantifiers',
  },
  {
    pattern: '*?',
    description: 'Matches 0 or more times (lazy)',
    example: '<.*?> matches single tags',
    category: 'Quantifiers',
  },
  {
    pattern: '+?',
    description: 'Matches 1 or more times (lazy)',
    example: '".+?" matches quoted strings',
    category: 'Quantifiers',
  },

  // ── Anchors ────────────────────────────────────────────────────────
  {
    pattern: '^',
    description: 'Matches start of string/line',
    example: '^Hello matches "Hello world"',
    category: 'Anchors',
  },
  {
    pattern: '$',
    description: 'Matches end of string/line',
    example: 'world$ matches "Hello world"',
    category: 'Anchors',
  },
  {
    pattern: '\\b',
    description: 'Matches word boundary',
    example: '\\bcat\\b matches "cat" not "catch"',
    category: 'Anchors',
  },
  {
    pattern: '\\B',
    description: 'Matches non-word boundary',
    example: '\\Bcat matches "cat" in "scat"',
    category: 'Anchors',
  },

  // ── Groups & Alternation ───────────────────────────────────────────
  {
    pattern: '(...)',
    description: 'Capturing group',
    example: '(abc) captures "abc"',
    category: 'Groups & Alternation',
  },
  {
    pattern: '(a(bc))',
    description: 'Nested capturing group',
    example: 'captures "abc" and "bc"',
    category: 'Groups & Alternation',
  },
  {
    pattern: '(.*)',
    description: 'Captures any content',
    example: '"(.*)" captures text in quotes',
    category: 'Groups & Alternation',
  },
  {
    pattern: '(abc|def)',
    description: 'Alternation — matches abc or def',
    example: '(cat|dog) matches either',
    category: 'Groups & Alternation',
  },
  {
    pattern: '(?:...)',
    description: 'Non-capturing group',
    example: '(?:abc)+ groups without capturing',
    category: 'Groups & Alternation',
  },
  {
    pattern: '(?<name>...)',
    description: 'Named capturing group',
    example: '(?<year>\\d{4}) captures year',
    category: 'Groups & Alternation',
  },

  // ── Lookaround ─────────────────────────────────────────────────────
  {
    pattern: '(?=...)',
    description: 'Positive lookahead',
    example: '\\d(?=px) matches "5" in "5px"',
    category: 'Lookaround',
  },
  {
    pattern: '(?!...)',
    description: 'Negative lookahead',
    example: '\\d(?!px) matches "3" in "3em"',
    category: 'Lookaround',
  },
  {
    pattern: '(?<=...)',
    description: 'Positive lookbehind',
    example: '(?<=\\$)\\d+ matches "50" in "$50"',
    category: 'Lookaround',
  },
  {
    pattern: '(?<!...)',
    description: 'Negative lookbehind',
    example: '(?<!\\$)\\d+ matches "50" in "€50"',
    category: 'Lookaround',
  },

  // ── Escaping & Special ─────────────────────────────────────────────
  {
    pattern: '\\.',
    description: 'Escaped period (literal dot)',
    example: 'file\\.txt matches "file.txt"',
    category: 'Escaping & Special',
  },
  {
    pattern: '\\\\',
    description: 'Escaped backslash',
    example: '\\\\n matches literal "\\n"',
    category: 'Escaping & Special',
  },
  {
    pattern: '\\n',
    description: 'Newline character',
    example: 'matches line breaks',
    category: 'Escaping & Special',
  },
  {
    pattern: '\\t',
    description: 'Tab character',
    example: 'matches tab characters',
    category: 'Escaping & Special',
  },
];
