import type { RegexProblem } from './types';

export const regexProblems: RegexProblem[] = [
  // =====================================================================
  // CHARACTER CLASSES (11)
  // =====================================================================

  // cc-easy-1
  {
    id: 'cc-easy-1',
    category: 'Character Classes',
    difficulty: 'easy',
    title: 'Find All Digits',
    prompt: 'Match every individual digit in the text.',
    sampleText: 'Order #4521 placed on 2024-01-15 for $99.50',
    sampleSolutions: ['\\d'],
    hints: [
      'Use \\d to match a single digit',
      "You don't need quantifiers \u2014 match each digit individually",
    ],
    expectedMatches: [
      { start: 7, end: 8, text: '4' },
      { start: 8, end: 9, text: '5' },
      { start: 9, end: 10, text: '2' },
      { start: 10, end: 11, text: '1' },
      { start: 22, end: 23, text: '2' },
      { start: 23, end: 24, text: '0' },
      { start: 24, end: 25, text: '2' },
      { start: 25, end: 26, text: '4' },
      { start: 27, end: 28, text: '0' },
      { start: 28, end: 29, text: '1' },
      { start: 30, end: 31, text: '1' },
      { start: 31, end: 32, text: '5' },
      { start: 38, end: 39, text: '9' },
      { start: 39, end: 40, text: '9' },
      { start: 41, end: 42, text: '5' },
      { start: 42, end: 43, text: '0' },
    ],
  },

  // cc-easy-2
  {
    id: 'cc-easy-2',
    category: 'Character Classes',
    difficulty: 'easy',
    title: 'Match Vowels',
    prompt: 'Match all lowercase vowels (a, e, i, o, u).',
    sampleText: 'The quick brown fox jumps over the lazy dog.',
    sampleSolutions: ['[aeiou]'],
    hints: ['Use a character class [...]', 'List all vowels inside square brackets'],
    expectedMatches: [
      { start: 2, end: 3, text: 'e' },
      { start: 5, end: 6, text: 'u' },
      { start: 6, end: 7, text: 'i' },
      { start: 12, end: 13, text: 'o' },
      { start: 17, end: 18, text: 'o' },
      { start: 21, end: 22, text: 'u' },
      { start: 26, end: 27, text: 'o' },
      { start: 28, end: 29, text: 'e' },
      { start: 33, end: 34, text: 'e' },
      { start: 36, end: 37, text: 'a' },
      { start: 41, end: 42, text: 'o' },
    ],
  },

  // cc-easy-3
  {
    id: 'cc-easy-3',
    category: 'Character Classes',
    difficulty: 'easy',
    title: 'Find Whitespace',
    prompt: 'Match all whitespace characters.',
    sampleText: 'hello world\tfoo\nbar baz',
    sampleSolutions: ['\\s'],
    hints: [
      '\\s matches spaces, tabs, and newlines',
      'Each whitespace character is a separate match',
    ],
    expectedMatches: [
      { start: 5, end: 6, text: ' ' },
      { start: 11, end: 12, text: '\t' },
      { start: 15, end: 16, text: '\n' },
      { start: 19, end: 20, text: ' ' },
    ],
  },

  // cc-easy-4
  {
    id: 'cc-easy-4',
    category: 'Character Classes',
    difficulty: 'easy',
    title: 'Match Word Characters',
    prompt: 'Match all sequences of word characters (letters, digits, underscores).',
    sampleText: "user_name = 'john123'; // set name",
    sampleSolutions: ['\\w+'],
    hints: ['\\w matches letters, digits, and underscores', 'Use + to match one or more'],
    expectedMatches: [
      { start: 0, end: 9, text: 'user_name' },
      { start: 13, end: 20, text: 'john123' },
      { start: 26, end: 29, text: 'set' },
      { start: 30, end: 34, text: 'name' },
    ],
  },

  // cc-easy-5
  {
    id: 'cc-easy-5',
    category: 'Character Classes',
    difficulty: 'easy',
    title: 'Find Non-Digits',
    prompt: 'Match every character that is NOT a digit.',
    sampleText: 'abc123def456',
    sampleSolutions: ['\\D', '[^0-9]'],
    hints: ['\\D is the opposite of \\d', 'Alternatively, use [^0-9]'],
    expectedMatches: [
      { start: 0, end: 1, text: 'a' },
      { start: 1, end: 2, text: 'b' },
      { start: 2, end: 3, text: 'c' },
      { start: 6, end: 7, text: 'd' },
      { start: 7, end: 8, text: 'e' },
      { start: 8, end: 9, text: 'f' },
    ],
  },

  // cc-medium-1
  {
    id: 'cc-medium-1',
    category: 'Character Classes',
    difficulty: 'medium',
    title: 'Match Hex Colors',
    prompt: 'Match valid 3 or 6-digit hex color codes (like #fff or #a1b2c3).',
    sampleText: 'Colors: #fff, #000000, #a1b2c3, #zzzzzz, #12ab, #F00',
    sampleSolutions: [
      '#[0-9a-fA-F]{6}\\b|#[0-9a-fA-F]{3}\\b',
      '#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\\b',
    ],
    hints: [
      'Hex digits are [0-9a-fA-F]',
      'Use alternation for 3 vs 6 digits',
      'Use \\b to avoid partial matches',
    ],
    expectedMatches: [
      { start: 8, end: 12, text: '#fff' },
      { start: 14, end: 21, text: '#000000' },
      { start: 23, end: 30, text: '#a1b2c3' },
      { start: 48, end: 52, text: '#F00' },
    ],
  },

  // cc-medium-2
  {
    id: 'cc-medium-2',
    category: 'Character Classes',
    difficulty: 'medium',
    title: 'Uppercase Words',
    prompt: 'Match words that are entirely uppercase (at least 2 letters).',
    sampleText: 'The NASA team at MIT launched the ISS module OK.',
    sampleSolutions: ['\\b[A-Z]{2,}\\b'],
    hints: [
      'Use [A-Z] for uppercase letters',
      'Use {2,} for two or more',
      '\\b ensures word boundaries',
    ],
    expectedMatches: [
      { start: 4, end: 8, text: 'NASA' },
      { start: 17, end: 20, text: 'MIT' },
      { start: 34, end: 37, text: 'ISS' },
      { start: 45, end: 47, text: 'OK' },
    ],
  },

  // cc-medium-3
  {
    id: 'cc-medium-3',
    category: 'Character Classes',
    difficulty: 'medium',
    title: 'Mixed Case Words',
    prompt: 'Match words that start with an uppercase letter followed by lowercase letters.',
    sampleText: 'The Quick BROWN Fox Jumps over THE Lazy Dog',
    sampleSolutions: ['\\b[A-Z][a-z]+\\b'],
    hints: [
      'Start with [A-Z] for uppercase',
      'Follow with [a-z]+ for lowercase',
      '\\b marks word boundaries',
    ],
    expectedMatches: [
      { start: 0, end: 3, text: 'The' },
      { start: 4, end: 9, text: 'Quick' },
      { start: 16, end: 19, text: 'Fox' },
      { start: 20, end: 25, text: 'Jumps' },
      { start: 35, end: 39, text: 'Lazy' },
      { start: 40, end: 43, text: 'Dog' },
    ],
  },

  // cc-medium-4
  {
    id: 'cc-medium-4',
    category: 'Character Classes',
    difficulty: 'medium',
    title: 'Find Special Characters',
    prompt: 'Match characters that are NOT letters, digits, or whitespace.',
    sampleText: 'Hello, World! Price: $45.99 (50% off) \u2014 deal!',
    sampleSolutions: ['[^\\w\\s]'],
    hints: ['Combine \\w and \\s in a negated class', '[^...] negates a character class'],
    expectedMatches: [
      { start: 5, end: 6, text: ',' },
      { start: 12, end: 13, text: '!' },
      { start: 19, end: 20, text: ':' },
      { start: 21, end: 22, text: '$' },
      { start: 24, end: 25, text: '.' },
      { start: 28, end: 29, text: '(' },
      { start: 31, end: 32, text: '%' },
      { start: 36, end: 37, text: ')' },
      { start: 38, end: 39, text: '\u2014' },
      { start: 44, end: 45, text: '!' },
    ],
  },

  // cc-hard-1
  {
    id: 'cc-hard-1',
    category: 'Character Classes',
    difficulty: 'hard',
    title: 'Match Variable Names',
    prompt:
      'Match valid JavaScript variable names (start with letter or underscore, followed by word characters).',
    sampleText: "let _count = 0; const MAX = 9; var 2fast = 'no'; let myVar_2 = true; let x = 1;",
    sampleSolutions: ['\\b[a-zA-Z_]\\w*\\b'],
    hints: [
      'Variables start with a letter or underscore',
      'Followed by zero or more word characters',
      'Be careful not to match the ones starting with digits',
    ],
    tags: ['javascript'],
    expectedMatches: [
      { start: 0, end: 3, text: 'let' },
      { start: 4, end: 10, text: '_count' },
      { start: 16, end: 21, text: 'const' },
      { start: 22, end: 25, text: 'MAX' },
      { start: 31, end: 34, text: 'var' },
      { start: 44, end: 46, text: 'no' },
      { start: 49, end: 52, text: 'let' },
      { start: 53, end: 60, text: 'myVar_2' },
      { start: 63, end: 67, text: 'true' },
      { start: 69, end: 72, text: 'let' },
      { start: 73, end: 74, text: 'x' },
    ],
  },

  // cc-hard-2
  {
    id: 'cc-hard-2',
    category: 'Character Classes',
    difficulty: 'hard',
    title: 'Match Consonants Only',
    prompt: 'Match only lowercase consonant characters (letters that are NOT vowels).',
    sampleText: 'the quick brown fox jumps over the lazy dog',
    sampleSolutions: ['[b-df-hj-np-tv-z]'],
    hints: [
      'Use character class ranges to exclude vowels',
      'Build ranges: b-d, f-h, j-n, p-t, v-z',
    ],
    expectedMatches: [
      { start: 0, end: 1, text: 't' },
      { start: 1, end: 2, text: 'h' },
      { start: 4, end: 5, text: 'q' },
      { start: 7, end: 8, text: 'c' },
      { start: 8, end: 9, text: 'k' },
      { start: 10, end: 11, text: 'b' },
      { start: 11, end: 12, text: 'r' },
      { start: 13, end: 14, text: 'w' },
      { start: 14, end: 15, text: 'n' },
      { start: 16, end: 17, text: 'f' },
      { start: 18, end: 19, text: 'x' },
      { start: 20, end: 21, text: 'j' },
      { start: 22, end: 23, text: 'm' },
      { start: 23, end: 24, text: 'p' },
      { start: 24, end: 25, text: 's' },
      { start: 27, end: 28, text: 'v' },
      { start: 29, end: 30, text: 'r' },
      { start: 31, end: 32, text: 't' },
      { start: 32, end: 33, text: 'h' },
      { start: 35, end: 36, text: 'l' },
      { start: 37, end: 38, text: 'z' },
      { start: 38, end: 39, text: 'y' },
      { start: 40, end: 41, text: 'd' },
      { start: 42, end: 43, text: 'g' },
    ],
  },

  // =====================================================================
  // QUANTIFIERS (10)
  // =====================================================================

  // q-easy-1
  {
    id: 'q-easy-1',
    category: 'Quantifiers',
    difficulty: 'easy',
    title: 'Match 3-Letter Words',
    prompt: 'Match words that are exactly 3 letters long.',
    sampleText: 'The cat sat on the mat and ate the ham',
    sampleSolutions: ['\\b[a-zA-Z]{3}\\b'],
    hints: [
      'Use {3} for exactly 3 repetitions',
      '\\b for word boundaries',
      'Use [a-zA-Z] for letters only',
    ],
    expectedMatches: [
      { start: 0, end: 3, text: 'The' },
      { start: 4, end: 7, text: 'cat' },
      { start: 8, end: 11, text: 'sat' },
      { start: 15, end: 18, text: 'the' },
      { start: 19, end: 22, text: 'mat' },
      { start: 23, end: 26, text: 'and' },
      { start: 27, end: 30, text: 'ate' },
      { start: 31, end: 34, text: 'the' },
      { start: 35, end: 38, text: 'ham' },
    ],
  },

  // q-easy-2
  {
    id: 'q-easy-2',
    category: 'Quantifiers',
    difficulty: 'easy',
    title: 'Find Repeated Letters',
    prompt: 'Match any letter that appears 2 or more times in a row.',
    sampleText: 'balloon, coffee, bees, llama, rabbit, deep pool',
    sampleSolutions: ['([a-zA-Z])\\1+'],
    hints: [
      'Use backreference \\1 to match the same character again',
      'Capture a letter with (...) then use \\1+',
    ],
    expectedMatches: [
      { start: 2, end: 4, text: 'll' },
      { start: 4, end: 6, text: 'oo' },
      { start: 11, end: 13, text: 'ff' },
      { start: 13, end: 15, text: 'ee' },
      { start: 18, end: 20, text: 'ee' },
      { start: 23, end: 25, text: 'll' },
      { start: 32, end: 34, text: 'bb' },
      { start: 39, end: 41, text: 'ee' },
      { start: 44, end: 46, text: 'oo' },
    ],
  },

  // q-easy-3
  {
    id: 'q-easy-3',
    category: 'Quantifiers',
    difficulty: 'easy',
    title: 'Optional Plurals',
    prompt: "Match both 'file' and 'files'.",
    sampleText: 'Upload your file or files to the file server. Multiple files accepted.',
    sampleSolutions: ['files?'],
    hints: ['Use ? to make a character optional', "? means 'zero or one' of the preceding element"],
    expectedMatches: [
      { start: 12, end: 16, text: 'file' },
      { start: 20, end: 25, text: 'files' },
      { start: 33, end: 37, text: 'file' },
      { start: 55, end: 60, text: 'files' },
    ],
  },

  // q-easy-4
  {
    id: 'q-easy-4',
    category: 'Quantifiers',
    difficulty: 'easy',
    title: 'Match Numbers',
    prompt: 'Match all whole numbers (sequences of digits).',
    sampleText: 'I have 42 apples, 7 oranges, and 100 bananas worth $3 each',
    sampleSolutions: ['\\d+'],
    hints: ['\\d matches a digit', '+ means one or more'],
    expectedMatches: [
      { start: 7, end: 9, text: '42' },
      { start: 18, end: 19, text: '7' },
      { start: 33, end: 36, text: '100' },
      { start: 52, end: 53, text: '3' },
    ],
  },

  // q-medium-1
  {
    id: 'q-medium-1',
    category: 'Quantifiers',
    difficulty: 'medium',
    title: 'Match Phone Digits',
    prompt: 'Match sequences of exactly 3 or 4 digits.',
    sampleText: 'Call 555-1234 or 800-555-9876. Ext: 42, Code: 98765',
    sampleSolutions: ['\\b\\d{3,4}\\b'],
    hints: ['Use {3,4} for 3 to 4 repetitions', '\\b prevents matching within longer numbers'],
    expectedMatches: [
      { start: 5, end: 8, text: '555' },
      { start: 9, end: 13, text: '1234' },
      { start: 17, end: 20, text: '800' },
      { start: 21, end: 24, text: '555' },
      { start: 25, end: 29, text: '9876' },
    ],
  },

  // q-medium-2
  {
    id: 'q-medium-2',
    category: 'Quantifiers',
    difficulty: 'medium',
    title: 'Lazy Quoted Strings',
    prompt: 'Match text within double quotes (including the quotes).',
    sampleText: 'She said "hello" and then "goodbye" to "everyone".',
    sampleSolutions: ['"[^"]*"', '".*?"'],
    hints: [
      'Use lazy quantifier *? or a negated class',
      '".*?" matches the shortest string between quotes',
    ],
    expectedMatches: [
      { start: 9, end: 16, text: '"hello"' },
      { start: 26, end: 35, text: '"goodbye"' },
      { start: 39, end: 49, text: '"everyone"' },
    ],
  },

  // q-medium-3
  {
    id: 'q-medium-3',
    category: 'Quantifiers',
    difficulty: 'medium',
    title: 'Match IP-like Segments',
    prompt: 'Match groups of 1 to 3 digits separated by dots (like IP octets).',
    sampleText: 'Server at 192.168.1.100 and backup at 10.0.0.1 not 999.999.999.999',
    sampleSolutions: ['\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}'],
    hints: ['Each octet is \\d{1,3}', 'Dots must be escaped as \\.', 'Connect 4 groups with \\.'],
    expectedMatches: [
      { start: 10, end: 23, text: '192.168.1.100' },
      { start: 38, end: 46, text: '10.0.0.1' },
      { start: 51, end: 66, text: '999.999.999.999' },
    ],
  },

  // q-medium-4
  {
    id: 'q-medium-4',
    category: 'Quantifiers',
    difficulty: 'medium',
    title: 'At Least 5 Characters',
    prompt: 'Match words with 5 or more characters.',
    sampleText: 'The quick brown fox jumps over a lazy dog in park',
    sampleSolutions: ['\\b[a-zA-Z]{5,}\\b', '\\b\\w{5,}\\b'],
    hints: ['Use {5,} for 5 or more', '\\b for word boundaries'],
    expectedMatches: [
      { start: 4, end: 9, text: 'quick' },
      { start: 10, end: 15, text: 'brown' },
      { start: 20, end: 25, text: 'jumps' },
    ],
  },

  // q-hard-1
  {
    id: 'q-hard-1',
    category: 'Quantifiers',
    difficulty: 'hard',
    title: 'Match CSS Values',
    prompt:
      'Match CSS numeric values with optional decimal and unit (like 10px, 1.5em, 100%, .5rem).',
    sampleText: 'margin: 10px; font-size: 1.5em; width: 100%; padding: .5rem; top: 0;',
    sampleSolutions: ['\\d*\\.?\\d+(?:px|em|rem|%)'],
    hints: [
      'Handle optional leading digits and decimal point',
      'Use alternation for units: px|em|rem|%',
      '\\d*\\.?\\d+ handles both 10 and 1.5 and .5',
    ],
    expectedMatches: [
      { start: 8, end: 12, text: '10px' },
      { start: 25, end: 30, text: '1.5em' },
      { start: 39, end: 43, text: '100%' },
      { start: 54, end: 59, text: '.5rem' },
    ],
  },

  // q-hard-2
  {
    id: 'q-hard-2',
    category: 'Quantifiers',
    difficulty: 'hard',
    title: 'Match Markdown Bold',
    prompt: 'Match text wrapped in double asterisks (**bold text**).',
    sampleText: 'This is **bold** and this is **also bold** but *not this* or **extra**',
    sampleSolutions: ['\\*\\*[^*]+\\*\\*'],
    hints: [
      'Asterisks must be escaped: \\*\\*',
      'Match content between them with [^*]+',
      'Ensure non-empty content between the asterisks',
    ],
    expectedMatches: [
      { start: 8, end: 16, text: '**bold**' },
      { start: 29, end: 42, text: '**also bold**' },
      { start: 61, end: 70, text: '**extra**' },
    ],
  },

  // =====================================================================
  // ANCHORS (8)
  // =====================================================================

  // a-easy-1
  {
    id: 'a-easy-1',
    category: 'Anchors',
    difficulty: 'easy',
    title: 'Lines Starting With #',
    prompt: 'Match lines that start with # (markdown headings).',
    sampleText: '# Title\nSome text\n## Subtitle\nMore text\n### Section',
    sampleSolutions: ['^#.*$'],
    hints: [
      '^ matches start of line (with m flag)',
      '$ matches end of line',
      'Use the m (multiline) flag',
    ],
    tags: ['multiline'],
    expectedMatches: [
      { start: 0, end: 7, text: '# Title' },
      { start: 18, end: 29, text: '## Subtitle' },
      { start: 40, end: 51, text: '### Section' },
    ],
  },

  // a-easy-2
  {
    id: 'a-easy-2',
    category: 'Anchors',
    difficulty: 'easy',
    title: 'Ends With Punctuation',
    prompt: 'Match lines that end with a period, exclamation mark, or question mark.',
    sampleText: 'Hello world.\nHow are you?\nGreat!\nNo ending\nDone.',
    sampleSolutions: ['^.*[.!?]$'],
    hints: [
      '$ matches end of line',
      'Use [.!?] for the punctuation characters',
      'Enable multiline mode',
    ],
    tags: ['multiline'],
    expectedMatches: [
      { start: 0, end: 12, text: 'Hello world.' },
      { start: 13, end: 25, text: 'How are you?' },
      { start: 26, end: 32, text: 'Great!' },
      { start: 43, end: 48, text: 'Done.' },
    ],
  },

  // a-easy-3
  {
    id: 'a-easy-3',
    category: 'Anchors',
    difficulty: 'easy',
    title: 'Whole Word Match',
    prompt: "Match the word 'cat' only as a whole word, not inside other words.",
    sampleText: "The cat sat on the caterpillar's mat. A cat is not a bobcat.",
    sampleSolutions: ['\\bcat\\b'],
    hints: ['\\b is a word boundary anchor', 'It matches at the start or end of a word'],
    expectedMatches: [
      { start: 4, end: 7, text: 'cat' },
      { start: 40, end: 43, text: 'cat' },
    ],
  },

  // a-medium-1
  {
    id: 'a-medium-1',
    category: 'Anchors',
    difficulty: 'medium',
    title: 'Sentence Starts',
    prompt: 'Match the first word of each sentence (capital letter after . or start of text).',
    sampleText: 'Hello world. This is great. Another sentence here. Wow.',
    sampleSolutions: ['(?:^|(?<=\\.\\s))[A-Z][a-z]*'],
    hints: [
      "A sentence starts at ^ or after '. '",
      'Use lookbehind (?<=...) for after period-space',
    ],
    expectedMatches: [
      { start: 0, end: 5, text: 'Hello' },
      { start: 13, end: 17, text: 'This' },
      { start: 28, end: 35, text: 'Another' },
      { start: 51, end: 54, text: 'Wow' },
    ],
  },

  // a-medium-2
  {
    id: 'a-medium-2',
    category: 'Anchors',
    difficulty: 'medium',
    title: 'Lines With Only Numbers',
    prompt: 'Match entire lines that contain only digits.',
    sampleText: 'abc\n12345\nhello\n42\nworld99\n0',
    sampleSolutions: ['^\\d+$'],
    hints: [
      '^ and $ match start/end of line in multiline mode',
      '\\d+ matches one or more digits',
      'No other characters allowed',
    ],
    tags: ['multiline'],
    expectedMatches: [
      { start: 4, end: 9, text: '12345' },
      { start: 16, end: 18, text: '42' },
      { start: 27, end: 28, text: '0' },
    ],
  },

  // a-medium-3
  {
    id: 'a-medium-3',
    category: 'Anchors',
    difficulty: 'medium',
    title: 'Not At Word Boundary',
    prompt: "Match 'the' only when it appears INSIDE another word.",
    sampleText: 'the other breathe weather the these bathe',
    sampleSolutions: ['\\Bthe\\B'],
    hints: ['\\B is a non-word boundary', 'It matches where \\b would NOT match'],
    expectedMatches: [
      { start: 5, end: 8, text: 'the' },
      { start: 21, end: 24, text: 'the' },
    ],
  },

  // a-hard-1
  {
    id: 'a-hard-1',
    category: 'Anchors',
    difficulty: 'hard',
    title: 'Empty Lines',
    prompt: 'Match empty lines (lines with no content).',
    sampleText: 'Hello\n\nWorld\n\n\nEnd',
    sampleSolutions: ['^$'],
    hints: ['An empty line has nothing between ^ and $', 'Use multiline mode'],
    tags: ['multiline'],
    expectedMatches: [
      { start: 6, end: 6, text: '' },
      { start: 13, end: 13, text: '' },
      { start: 14, end: 14, text: '' },
    ],
  },

  // a-hard-2
  {
    id: 'a-hard-2',
    category: 'Anchors',
    difficulty: 'hard',
    title: 'Lines Starting and Ending With Same Char',
    prompt: 'Match lines where the first and last character are the same letter.',
    sampleText: 'abcda\nhello\nrevolver\ntest\nmadam\nworld',
    sampleSolutions: ['^(.).*\\1$', '^([a-z]).*\\1$'],
    hints: [
      'Capture the first character with (.)',
      'Use \\1 backreference at the end',
      'Use multiline mode',
    ],
    tags: ['multiline'],
    expectedMatches: [
      { start: 0, end: 5, text: 'abcda' },
      { start: 12, end: 20, text: 'revolver' },
      { start: 21, end: 25, text: 'test' },
      { start: 26, end: 31, text: 'madam' },
    ],
  },

  // =====================================================================
  // GROUPS & ALTERNATION (10)
  // =====================================================================

  // ga-easy-1
  {
    id: 'ga-easy-1',
    category: 'Groups & Alternation',
    difficulty: 'easy',
    title: 'Match Cat or Dog',
    prompt: "Match the words 'cat' or 'dog'.",
    sampleText: 'I have a cat and a dog. My cat plays with the dog.',
    sampleSolutions: ['cat|dog', '\\b(?:cat|dog)\\b'],
    hints: ['Use | for alternation (OR)', 'cat|dog matches either word'],
    expectedMatches: [
      { start: 9, end: 12, text: 'cat' },
      { start: 19, end: 22, text: 'dog' },
      { start: 27, end: 30, text: 'cat' },
      { start: 46, end: 49, text: 'dog' },
    ],
  },

  // ga-easy-2
  {
    id: 'ga-easy-2',
    category: 'Groups & Alternation',
    difficulty: 'easy',
    title: 'Color Variants',
    prompt: 'Match both American and British spellings: color/colour, gray/grey.',
    sampleText: 'The color grey and colour gray are the same as color and grey.',
    sampleSolutions: ['colou?r|gr[ae]y'],
    hints: ["Use ? for the optional 'u' in colour", 'Use [ae] for the varying vowel in gray/grey'],
    expectedMatches: [
      { start: 4, end: 9, text: 'color' },
      { start: 10, end: 14, text: 'grey' },
      { start: 19, end: 25, text: 'colour' },
      { start: 26, end: 30, text: 'gray' },
      { start: 47, end: 52, text: 'color' },
      { start: 57, end: 61, text: 'grey' },
    ],
  },

  // ga-easy-3
  {
    id: 'ga-easy-3',
    category: 'Groups & Alternation',
    difficulty: 'easy',
    title: 'Repeated Word Groups',
    prompt: "Match the word 'ha' repeated 2 or more times (like 'haha', 'hahaha').",
    sampleText: 'He said ha and haha and hahaha but not h or ah',
    sampleSolutions: ['(?:ha){2,}'],
    hints: ["Group 'ha' with (?:...)", 'Use {2,} for 2 or more repetitions'],
    expectedMatches: [
      { start: 15, end: 19, text: 'haha' },
      { start: 24, end: 30, text: 'hahaha' },
    ],
  },

  // ga-medium-1
  {
    id: 'ga-medium-1',
    category: 'Groups & Alternation',
    difficulty: 'medium',
    title: 'Date Formats',
    prompt: 'Match dates in MM/DD/YYYY or MM-DD-YYYY format.',
    sampleText: 'Dates: 01/15/2024, 12-25-2023, 2024/01/15, 06/30/2024, 13/32/2000',
    sampleSolutions: ['\\d{2}[/-]\\d{2}[/-]\\d{4}'],
    hints: ['Use [/-] to match either separator', '\\d{2} for month/day, \\d{4} for year'],
    expectedMatches: [
      { start: 7, end: 17, text: '01/15/2024' },
      { start: 19, end: 29, text: '12-25-2023' },
      { start: 43, end: 53, text: '06/30/2024' },
      { start: 55, end: 65, text: '13/32/2000' },
    ],
  },

  // ga-medium-2
  {
    id: 'ga-medium-2',
    category: 'Groups & Alternation',
    difficulty: 'medium',
    title: 'HTML Tags',
    prompt: 'Match opening HTML tags (like <div>, <p>, <span class="foo">).',
    sampleText: '<div>Hello</div><p class="intro">World</p><br/><img src="photo.jpg">',
    sampleSolutions: ['<[a-zA-Z][^>]*>'],
    hints: [
      'Tags start with < and end with >',
      'Tag name starts with a letter',
      "Attributes are anything that's not >",
    ],
    expectedMatches: [
      { start: 0, end: 5, text: '<div>' },
      { start: 16, end: 33, text: '<p class="intro">' },
      { start: 42, end: 47, text: '<br/>' },
      { start: 47, end: 68, text: '<img src="photo.jpg">' },
    ],
  },

  // ga-medium-3
  {
    id: 'ga-medium-3',
    category: 'Groups & Alternation',
    difficulty: 'medium',
    title: 'Capture Domain',
    prompt: 'Match domain names in email addresses.',
    sampleText: 'Contact us at info@example.com or support@my-site.org or admin@test.co.uk',
    sampleSolutions: ['@([\\w.-]+)', '@[\\w.-]+'],
    hints: [
      'Domains come after @',
      'Domain chars include letters, digits, dots, hyphens',
      'Use [\\w.-]+ to match the domain',
    ],
    expectedMatches: [
      { start: 18, end: 30, text: '@example.com' },
      { start: 41, end: 53, text: '@my-site.org' },
      { start: 62, end: 73, text: '@test.co.uk' },
    ],
  },

  // ga-medium-4
  {
    id: 'ga-medium-4',
    category: 'Groups & Alternation',
    difficulty: 'medium',
    title: 'File Extensions',
    prompt: 'Match filenames with .js, .ts, .jsx, or .tsx extensions.',
    sampleText: 'Files: app.js, utils.ts, Component.jsx, Page.tsx, style.css, index.html, main.js',
    sampleSolutions: ['\\b[\\w.-]+\\.(?:jsx?|tsx?)\\b', '[\\w.-]+\\.(?:js|ts|jsx|tsx)\\b'],
    hints: [
      'Use alternation for extensions: js|ts|jsx|tsx',
      '(?:...) groups without capturing',
      'jsx? matches both js and jsx',
    ],
    expectedMatches: [
      { start: 7, end: 13, text: 'app.js' },
      { start: 15, end: 23, text: 'utils.ts' },
      { start: 25, end: 38, text: 'Component.jsx' },
      { start: 40, end: 48, text: 'Page.tsx' },
      { start: 73, end: 80, text: 'main.js' },
    ],
  },

  // ga-hard-1
  {
    id: 'ga-hard-1',
    category: 'Groups & Alternation',
    difficulty: 'hard',
    title: 'Nested Parentheses Content',
    prompt: 'Match content within parentheses (including the parentheses).',
    sampleText: 'func(arg1, arg2) and method(x) plus empty() and no match',
    sampleSolutions: ['\\([^)]*\\)'],
    hints: [
      'Escape parentheses: \\( and \\)',
      'Match content with [^)]*',
      'This captures the innermost parentheses',
    ],
    expectedMatches: [
      { start: 4, end: 16, text: '(arg1, arg2)' },
      { start: 27, end: 30, text: '(x)' },
      { start: 41, end: 43, text: '()' },
    ],
  },

  // ga-hard-2
  {
    id: 'ga-hard-2',
    category: 'Groups & Alternation',
    difficulty: 'hard',
    title: 'Key-Value Pairs',
    prompt: 'Match key=value pairs where key is a word and value is a word or number.',
    sampleText: 'name=John age=30 city=NYC score=99.5 =invalid novalue=',
    sampleSolutions: ['\\b\\w+=\\w[\\w.]*\\b'],
    hints: [
      'Key is \\w+ before the =',
      'Value is \\w+ after the =',
      'Word boundaries prevent partial matches',
    ],
    expectedMatches: [
      { start: 0, end: 9, text: 'name=John' },
      { start: 10, end: 16, text: 'age=30' },
      { start: 17, end: 25, text: 'city=NYC' },
      { start: 26, end: 36, text: 'score=99.5' },
    ],
  },

  // ga-hard-3
  {
    id: 'ga-hard-3',
    category: 'Groups & Alternation',
    difficulty: 'hard',
    title: 'Balanced Quotes',
    prompt: 'Match text wrapped in matching quotes (single or double).',
    sampleText: 'He said "hello" and \'goodbye\' and "world" but not \'broken',
    sampleSolutions: ['(["\'])(?:(?!\\1).)*\\1'],
    hints: [
      'Capture the opening quote with (["\'])',
      'Use backreference \\1 to match the closing quote',
      "Match content that isn't the quote character",
    ],
    expectedMatches: [
      { start: 8, end: 15, text: '"hello"' },
      { start: 20, end: 29, text: "'goodbye'" },
      { start: 34, end: 41, text: '"world"' },
    ],
  },

  // =====================================================================
  // LOOKAROUND (7)
  // =====================================================================

  // la-medium-1
  {
    id: 'la-medium-1',
    category: 'Lookaround',
    difficulty: 'medium',
    title: "Digits Before 'px'",
    prompt: "Match numbers that are followed by 'px'.",
    sampleText: 'width: 100px; height: 50px; margin: 10em; padding: 20px; font: 16pt',
    sampleSolutions: ['\\d+(?=px)'],
    hints: [
      'Positive lookahead (?=...) checks what follows',
      "\\d+(?=px) matches digits before 'px'",
      "The 'px' itself is not included in the match",
    ],
    expectedMatches: [
      { start: 7, end: 10, text: '100' },
      { start: 22, end: 24, text: '50' },
      { start: 51, end: 53, text: '20' },
    ],
  },

  // la-medium-2
  {
    id: 'la-medium-2',
    category: 'Lookaround',
    difficulty: 'medium',
    title: 'Price Values',
    prompt: 'Match numbers that come after a $ sign.',
    sampleText: 'Prices: $50, $100.99, \u20AC30, $5, \u00A320, $0.50',
    sampleSolutions: ['(?<=\\$)\\d+\\.?\\d*', '(?<=\\$)[\\d.]+'],
    hints: [
      'Positive lookbehind (?<=...) checks what precedes',
      'The $ must be escaped in the lookbehind',
      'Match digits and optional decimal after $',
    ],
    expectedMatches: [
      { start: 9, end: 11, text: '50' },
      { start: 14, end: 20, text: '100.99' },
      { start: 28, end: 29, text: '5' },
      { start: 37, end: 41, text: '0.50' },
    ],
  },

  // la-medium-3
  {
    id: 'la-medium-3',
    category: 'Lookaround',
    difficulty: 'medium',
    title: 'Words Not Followed By Comma',
    prompt: 'Match words that are NOT followed by a comma.',
    sampleText: 'apple, banana orange, grape kiwi, mango',
    sampleSolutions: ['\\b\\w+\\b(?!,)'],
    hints: [
      'Negative lookahead (?!...) excludes what follows',
      '\\b\\w+\\b matches whole words',
      '(?!,) ensures no comma after',
    ],
    expectedMatches: [
      { start: 7, end: 13, text: 'banana' },
      { start: 22, end: 27, text: 'grape' },
      { start: 34, end: 39, text: 'mango' },
    ],
  },

  // la-hard-1
  {
    id: 'la-hard-1',
    category: 'Lookaround',
    difficulty: 'hard',
    title: 'Password Digit Check',
    prompt: 'Match strings of 8+ characters that contain at least one digit.',
    sampleText: 'pass1234 abcdefgh hello12 short1 longpassword secret99',
    sampleSolutions: ['\\b(?=\\w*\\d)\\w{8,}\\b'],
    hints: [
      'Use lookahead (?=\\w*\\d) to assert a digit exists within the word',
      'Then match 8+ word characters',
      'Lookahead checks without consuming',
    ],
    expectedMatches: [
      { start: 0, end: 8, text: 'pass1234' },
      { start: 46, end: 54, text: 'secret99' },
    ],
  },

  // la-hard-2
  {
    id: 'la-hard-2',
    category: 'Lookaround',
    difficulty: 'hard',
    title: 'Capitalize After Period',
    prompt: 'Match the space after a period that is followed by a lowercase letter.',
    sampleText: 'Hello world. this is wrong. This is right. also wrong. Fine here.',
    sampleSolutions: ['(?<=\\.)\\s(?=[a-z])'],
    hints: [
      'Lookbehind for period: (?<=\\.)',
      'Lookahead for lowercase: (?=[a-z])',
      'We match the space between them',
    ],
    expectedMatches: [
      { start: 12, end: 13, text: ' ' },
      { start: 42, end: 43, text: ' ' },
    ],
  },

  // la-hard-3
  {
    id: 'la-hard-3',
    category: 'Lookaround',
    difficulty: 'hard',
    title: 'Not Preceded By Backslash',
    prompt: 'Match double quotes that are NOT preceded by a backslash.',
    sampleText: 'Text with "quotes" and escaped \\" and \\"more\\" here "end"',
    sampleSolutions: ['(?<!\\\\)"'],
    hints: [
      'Negative lookbehind: (?<!\\\\)',
      'Matches " not preceded by \\',
      'The backslash itself needs escaping in regex',
    ],
    expectedMatches: [
      { start: 10, end: 11, text: '"' },
      { start: 17, end: 18, text: '"' },
      { start: 52, end: 53, text: '"' },
      { start: 56, end: 57, text: '"' },
    ],
  },

  // la-hard-4
  {
    id: 'la-hard-4',
    category: 'Lookaround',
    difficulty: 'hard',
    title: 'Words Between Specific Words',
    prompt: "Match words that appear between 'start' and 'end'.",
    sampleText: 'start hello world end other start foo bar end more',
    sampleSolutions: ['(?<=start ).*?(?= end)'],
    hints: [
      "Use lookbehind for 'start ' and lookahead for ' end'",
      'Use .*? (lazy) to match content between them',
    ],
    expectedMatches: [
      { start: 6, end: 17, text: 'hello world' },
      { start: 34, end: 41, text: 'foo bar' },
    ],
  },

  // =====================================================================
  // COMMON PATTERNS (12)
  // =====================================================================

  // cp-easy-1
  {
    id: 'cp-easy-1',
    category: 'Common Patterns',
    difficulty: 'easy',
    title: 'Simple Email-like',
    prompt: 'Match strings that look like email addresses.',
    sampleText: 'Email me at john@example.com or jane.doe@company.org not @invalid or broken@',
    sampleSolutions: ['[\\w.+-]+@[\\w.-]+\\.[a-zA-Z]{2,}'],
    hints: [
      'Local part: word chars, dots, plus, hyphens',
      '@ symbol in the middle',
      'Domain: word chars with dots, ending in 2+ letters',
    ],
    expectedMatches: [
      { start: 12, end: 28, text: 'john@example.com' },
      { start: 32, end: 52, text: 'jane.doe@company.org' },
    ],
  },

  // cp-easy-2
  {
    id: 'cp-easy-2',
    category: 'Common Patterns',
    difficulty: 'easy',
    title: 'Find URLs',
    prompt: 'Match http or https URLs.',
    sampleText: 'Visit https://example.com or http://test.org/path?q=1 not ftp://other.com',
    sampleSolutions: ['https?://\\S+'],
    hints: [
      'Start with https?://',
      'URL chars include letters, digits, dots, slashes',
      's? makes the s optional',
    ],
    expectedMatches: [
      { start: 6, end: 25, text: 'https://example.com' },
      { start: 29, end: 53, text: 'http://test.org/path?q=1' },
    ],
  },

  // cp-easy-3
  {
    id: 'cp-easy-3',
    category: 'Common Patterns',
    difficulty: 'easy',
    title: 'Hashtags',
    prompt: 'Match hashtags (# followed by word characters).',
    sampleText: 'Check out #coding and #regex101! Also #learn_more but not # alone or #',
    sampleSolutions: ['#\\w+'],
    hints: [
      'Hashtags start with #',
      'Followed by one or more word characters',
      '\\w+ matches letters, digits, underscores',
    ],
    expectedMatches: [
      { start: 10, end: 17, text: '#coding' },
      { start: 22, end: 31, text: '#regex101' },
      { start: 38, end: 49, text: '#learn_more' },
    ],
  },

  // cp-easy-4
  {
    id: 'cp-easy-4',
    category: 'Common Patterns',
    difficulty: 'easy',
    title: 'Match Numbers with Commas',
    prompt: 'Match numbers formatted with commas (like 1,000 or 1,000,000).',
    sampleText: 'Population: 1,000,000 and 50,000 but not 1,00 or ,500 or 999',
    sampleSolutions: ['\\d{1,3}(?:,\\d{3})+'],
    hints: [
      'Start with 1-3 digits',
      'Followed by groups of comma + 3 digits',
      '(?:,\\d{3})+ repeats the comma-group pattern',
    ],
    expectedMatches: [
      { start: 12, end: 21, text: '1,000,000' },
      { start: 26, end: 32, text: '50,000' },
    ],
  },

  // cp-medium-1
  {
    id: 'cp-medium-1',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'IPv4 Addresses',
    prompt: 'Match valid-format IPv4 addresses (4 groups of 1-3 digits separated by dots).',
    sampleText: 'Server 192.168.1.1 and 10.0.0.255 and 8.8.8.8 not 999.999.999.999.9',
    sampleSolutions: ['\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b'],
    hints: [
      'Four groups of \\d{1,3}',
      'Separated by escaped dots \\.',
      'Use \\b for word boundaries',
    ],
    expectedMatches: [
      { start: 7, end: 18, text: '192.168.1.1' },
      { start: 23, end: 33, text: '10.0.0.255' },
      { start: 38, end: 45, text: '8.8.8.8' },
      { start: 50, end: 65, text: '999.999.999.999' },
    ],
  },

  // cp-medium-2
  {
    id: 'cp-medium-2',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Time Format',
    prompt: 'Match times in HH:MM or HH:MM:SS format (24-hour).',
    sampleText: 'Meeting at 09:30, lunch at 12:00:00, done by 17:45. Not 25:99 or 3:5.',
    sampleSolutions: ['\\b\\d{2}:\\d{2}(?::\\d{2})?\\b'],
    hints: [
      'Hours and minutes: \\d{2}:\\d{2}',
      'Optional seconds: (?::\\d{2})?',
      'Word boundaries prevent partial matches',
    ],
    expectedMatches: [
      { start: 11, end: 16, text: '09:30' },
      { start: 27, end: 35, text: '12:00:00' },
      { start: 45, end: 50, text: '17:45' },
      { start: 56, end: 61, text: '25:99' },
    ],
  },

  // cp-medium-3
  {
    id: 'cp-medium-3',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'CSS Hex Colors',
    prompt: 'Match CSS hex color codes (# followed by 3 or 6 hex digits).',
    sampleText: 'body { color: #333; background: #f0f0f0; border: #abcdef; } not #xyz or #12',
    sampleSolutions: ['#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\\b'],
    hints: ['Start with #', 'Hex digits: [0-9a-fA-F]', 'Either 6 or 3 digits (check 6 first)'],
    expectedMatches: [
      { start: 14, end: 18, text: '#333' },
      { start: 32, end: 39, text: '#f0f0f0' },
      { start: 49, end: 56, text: '#abcdef' },
    ],
  },

  // cp-medium-4
  {
    id: 'cp-medium-4',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Markdown Links',
    prompt: 'Match markdown links in [text](url) format.',
    sampleText: 'Click [here](https://example.com) or [docs](http://docs.io) not [broken] or (url)',
    sampleSolutions: ['\\[[^\\]]+\\]\\([^)]+\\)'],
    hints: ['Square brackets: \\[...\\]', 'Parentheses: \\(...\\)', 'Content: [^\\]]+ and [^)]+'],
    expectedMatches: [
      { start: 6, end: 33, text: '[here](https://example.com)' },
      { start: 37, end: 59, text: '[docs](http://docs.io)' },
    ],
  },

  // cp-hard-1
  {
    id: 'cp-hard-1',
    category: 'Common Patterns',
    difficulty: 'hard',
    title: 'Semantic Version',
    prompt: 'Match semantic version numbers (like 1.0.0, 2.1.3, 10.20.30).',
    sampleText: 'Versions: 1.0.0, 2.1.3, update to 10.20.30, not 1.0 or just 1',
    sampleSolutions: ['\\b\\d+\\.\\d+\\.\\d+\\b'],
    hints: ['Three groups of digits', 'Separated by dots', 'Use \\b for boundaries'],
    expectedMatches: [
      { start: 10, end: 15, text: '1.0.0' },
      { start: 17, end: 22, text: '2.1.3' },
      { start: 34, end: 42, text: '10.20.30' },
    ],
  },

  // cp-hard-2
  {
    id: 'cp-hard-2',
    category: 'Common Patterns',
    difficulty: 'hard',
    title: 'Strong Password',
    prompt:
      'Match passwords that are 8+ chars with at least one uppercase, one lowercase, and one digit.',
    sampleText: 'Abc12345 ALLCAPS1 alllower1 Ab1 GoodPass1 weakpass NoDigits TestPass9',
    sampleSolutions: ['\\b(?=\\w*[A-Z])(?=\\w*[a-z])(?=\\w*\\d)[A-Za-z\\d]{8,}\\b'],
    hints: [
      'Use multiple lookaheads to assert requirements',
      '(?=\\w*[A-Z]) asserts uppercase exists within the word',
      '(?=\\w*[a-z]) asserts lowercase exists within the word',
    ],
    expectedMatches: [
      { start: 0, end: 8, text: 'Abc12345' },
      { start: 32, end: 41, text: 'GoodPass1' },
      { start: 60, end: 69, text: 'TestPass9' },
    ],
  },

  // cp-hard-3
  {
    id: 'cp-hard-3',
    category: 'Common Patterns',
    difficulty: 'hard',
    title: 'JSON String Values',
    prompt: 'Match string values in JSON-like text (double-quoted strings after colons).',
    sampleText: '{"name": "John", "age": 30, "city": "New York", "active": true}',
    sampleSolutions: ['(?<=:\\s*)"[^"]*"'],
    hints: [
      'Values come after : with optional space',
      'String values are in double quotes',
      'Use lookbehind for the colon',
    ],
    expectedMatches: [
      { start: 9, end: 15, text: '"John"' },
      { start: 36, end: 46, text: '"New York"' },
    ],
  },

  // cp-hard-4
  {
    id: 'cp-hard-4',
    category: 'Common Patterns',
    difficulty: 'hard',
    title: 'Camel Case Words',
    prompt: 'Match camelCase or PascalCase identifiers (multi-word, no underscores).',
    sampleText:
      'let myVariable = getValue(); const HelloWorld = new ClassName(); not single or ALL_CAPS',
    sampleSolutions: ['\\b[a-zA-Z][a-z]+(?:[A-Z][a-z]+)+\\b'],
    hints: [
      'Starts with a letter followed by lowercase',
      'Contains at least one uppercase transition',
      "Each 'word' is [A-Z][a-z]+",
    ],
    expectedMatches: [
      { start: 4, end: 14, text: 'myVariable' },
      { start: 17, end: 25, text: 'getValue' },
      { start: 35, end: 45, text: 'HelloWorld' },
      { start: 52, end: 61, text: 'ClassName' },
    ],
  },

  // =====================================================================
  // ESCAPING & SPECIAL (7)
  // =====================================================================

  // es-easy-1
  {
    id: 'es-easy-1',
    category: 'Escaping & Special',
    difficulty: 'easy',
    title: 'Match Literal Dots',
    prompt: 'Match literal period characters only.',
    sampleText: 'Hello world. End of line. Price is $3.50. Done.',
    sampleSolutions: ['\\.'],
    hints: ['The dot has special meaning in regex', 'Escape it with \\ to match literally'],
    expectedMatches: [
      { start: 11, end: 12, text: '.' },
      { start: 24, end: 25, text: '.' },
      { start: 37, end: 38, text: '.' },
      { start: 40, end: 41, text: '.' },
      { start: 46, end: 47, text: '.' },
    ],
  },

  // es-easy-2
  {
    id: 'es-easy-2',
    category: 'Escaping & Special',
    difficulty: 'easy',
    title: 'Match Dollar Signs',
    prompt: 'Match literal $ characters.',
    sampleText: 'Price: $50, Cost: $100, $$bonus$$, not a regex$',
    sampleSolutions: ['\\$'],
    hints: ['$ is a special regex character (end anchor)', 'Escape it with \\ to match literally'],
    expectedMatches: [
      { start: 7, end: 8, text: '$' },
      { start: 18, end: 19, text: '$' },
      { start: 24, end: 25, text: '$' },
      { start: 25, end: 26, text: '$' },
      { start: 31, end: 32, text: '$' },
      { start: 32, end: 33, text: '$' },
      { start: 46, end: 47, text: '$' },
    ],
  },

  // es-easy-3
  {
    id: 'es-easy-3',
    category: 'Escaping & Special',
    difficulty: 'easy',
    title: 'Match Asterisks',
    prompt: 'Match literal * characters.',
    sampleText: '5 * 3 = 15; **bold** and *italic* and 2*2',
    sampleSolutions: ['\\*'],
    hints: ['* is a quantifier in regex', 'Escape it with \\ to match literally'],
    expectedMatches: [
      { start: 2, end: 3, text: '*' },
      { start: 12, end: 13, text: '*' },
      { start: 13, end: 14, text: '*' },
      { start: 18, end: 19, text: '*' },
      { start: 19, end: 20, text: '*' },
      { start: 25, end: 26, text: '*' },
      { start: 32, end: 33, text: '*' },
      { start: 39, end: 40, text: '*' },
    ],
  },

  // es-medium-1
  {
    id: 'es-medium-1',
    category: 'Escaping & Special',
    difficulty: 'medium',
    title: 'Match File Paths',
    prompt: 'Match Unix-style file paths starting with /.',
    sampleText: 'Files at /usr/local/bin and /home/user/docs/file.txt or /tmp/test',
    sampleSolutions: ['/[\\w./]+'],
    hints: ['Paths start with /', 'Can contain letters, digits, dots, and more /', 'Use [\\w./]+'],
    expectedMatches: [
      { start: 9, end: 23, text: '/usr/local/bin' },
      { start: 28, end: 52, text: '/home/user/docs/file.txt' },
      { start: 56, end: 65, text: '/tmp/test' },
    ],
  },

  // es-medium-2
  {
    id: 'es-medium-2',
    category: 'Escaping & Special',
    difficulty: 'medium',
    title: 'Match Parenthesized Text',
    prompt: 'Match text within parentheses including the parentheses.',
    sampleText: 'This (is) a (test) with (some content) inside parens',
    sampleSolutions: ['\\([^)]*\\)'],
    hints: ['Parentheses are special in regex', 'Escape them: \\( and \\)', 'Content: [^)]*'],
    expectedMatches: [
      { start: 5, end: 9, text: '(is)' },
      { start: 12, end: 18, text: '(test)' },
      { start: 24, end: 38, text: '(some content)' },
    ],
  },

  // es-hard-1
  {
    id: 'es-hard-1',
    category: 'Escaping & Special',
    difficulty: 'hard',
    title: 'Match Regex-Like Patterns',
    prompt: 'Match patterns that look like regex literals (text between forward slashes).',
    sampleText: 'The regex /\\d+/ matches digits and /[a-z]/g matches lowercase. Not a/b or /alone',
    sampleSolutions: ['/[^/\\s]+/[gimsuy]*'],
    hints: [
      "Forward slashes don't need escaping in character classes",
      'Content between slashes: [^/\\s]+',
      'Optional flags after closing slash',
    ],
    expectedMatches: [
      { start: 10, end: 15, text: '/\\d+/' },
      { start: 35, end: 43, text: '/[a-z]/g' },
    ],
  },

  // es-hard-2
  {
    id: 'es-hard-2',
    category: 'Escaping & Special',
    difficulty: 'hard',
    title: 'Escaped Characters in Strings',
    prompt: 'Match escape sequences like \\n, \\t, \\\\, \\", \\\'.',
    sampleText: 'Text with \\n newline and \\t tab and \\\\ backslash and \\" quote',
    sampleSolutions: ['\\\\[nt\\\\"\']'],
    hints: [
      'Escape sequences start with backslash',
      'In regex, \\\\ matches a literal backslash',
      'The character after: [nt\\\\"\']',
    ],
    expectedMatches: [
      { start: 10, end: 12, text: '\\n' },
      { start: 25, end: 27, text: '\\t' },
      { start: 36, end: 38, text: '\\\\' },
      { start: 53, end: 55, text: '\\"' },
    ],
  },

  // =====================================================================
  // NEW PROBLEMS BATCH
  // =====================================================================

  // cc-easy-7
  {
    id: 'cc-easy-7',
    category: 'Character Classes',
    difficulty: 'easy',
    title: 'Lowercase Letters Only',
    prompt: 'Match every individual lowercase letter in the text.',
    sampleText: 'Hi 5 fox BIG z!',
    sampleSolutions: ['[a-z]'],
    hints: [
      'Use [a-z] to match a single lowercase letter',
      'This will not match uppercase, digits, or symbols',
    ],
    expectedMatches: [
      { start: 1, end: 2, text: 'i' },
      { start: 5, end: 6, text: 'f' },
      { start: 6, end: 7, text: 'o' },
      { start: 7, end: 8, text: 'x' },
      { start: 13, end: 14, text: 'z' },
    ],
  },

  // cc-medium-6
  {
    id: 'cc-medium-6',
    category: 'Character Classes',
    difficulty: 'medium',
    title: 'Digits or Lowercase Only',
    prompt:
      'Match characters that are either digits or lowercase letters (no uppercase, no special characters).',
    sampleText: 'Hi 5 fox BIG z9!',
    sampleSolutions: ['[a-z0-9]', '[0-9a-z]'],
    hints: [
      'Combine two ranges inside one character class',
      '[a-z] matches lowercase, [0-9] matches digits',
      'Put them together: [a-z0-9]',
    ],
    expectedMatches: [
      { start: 1, end: 2, text: 'i' },
      { start: 3, end: 4, text: '5' },
      { start: 5, end: 6, text: 'f' },
      { start: 6, end: 7, text: 'o' },
      { start: 7, end: 8, text: 'x' },
      { start: 13, end: 14, text: 'z' },
      { start: 14, end: 15, text: '9' },
    ],
  },

  // q-easy-6
  {
    id: 'q-easy-6',
    category: 'Quantifiers',
    difficulty: 'easy',
    title: 'Spaces Between Words',
    prompt: 'Match one or more consecutive space characters between words.',
    sampleText: 'hello  world   foo bar',
    sampleSolutions: [' +'],
    hints: [
      'A literal space followed by + matches one or more spaces',
      'Each group of consecutive spaces is a single match',
    ],
    expectedMatches: [
      { start: 5, end: 7, text: '  ' },
      { start: 12, end: 15, text: '   ' },
      { start: 18, end: 19, text: ' ' },
    ],
  },

  // q-medium-6
  {
    id: 'q-medium-6',
    category: 'Quantifiers',
    difficulty: 'medium',
    title: 'Capitalized Words',
    prompt:
      'Match words that start with a capital letter followed by one or more lowercase letters.',
    sampleText: 'Hello WORLD Foo bar Baz QUX Test OK',
    sampleSolutions: ['\\b[A-Z][a-z]+\\b'],
    hints: [
      'Start with [A-Z] for the capital letter',
      'Follow with [a-z]+ for one or more lowercase letters',
      'Use \\b for word boundaries to avoid partial matches',
    ],
    expectedMatches: [
      { start: 0, end: 5, text: 'Hello' },
      { start: 12, end: 15, text: 'Foo' },
      { start: 20, end: 23, text: 'Baz' },
      { start: 28, end: 32, text: 'Test' },
    ],
  },

  // a-easy-5
  {
    id: 'a-easy-5',
    category: 'Anchors',
    difficulty: 'easy',
    title: 'Last Word of Each Line',
    prompt: 'Match the last word on each line.',
    sampleText: 'hello world\nfoo bar baz\nonly',
    sampleSolutions: ['\\w+$'],
    hints: [
      '$ matches the end of a line in multiline mode',
      '\\w+ matches one or more word characters',
      'Together they match the last word before end of line',
    ],
    tags: ['multiline'],
    expectedMatches: [
      { start: 6, end: 11, text: 'world' },
      { start: 20, end: 23, text: 'baz' },
      { start: 24, end: 28, text: 'only' },
    ],
  },

  // a-medium-5
  {
    id: 'a-medium-5',
    category: 'Anchors',
    difficulty: 'medium',
    title: 'Comment Lines',
    prompt: 'Match entire lines that start with a # character (comment lines).',
    sampleText: '# comment\ncode here\n# another\nnot this',
    sampleSolutions: ['^#.*$'],
    hints: [
      '^ matches the start of a line in multiline mode',
      '# is a literal character (not special in regex)',
      '.* matches the rest of the line',
    ],
    tags: ['multiline'],
    expectedMatches: [
      { start: 0, end: 9, text: '# comment' },
      { start: 20, end: 29, text: '# another' },
    ],
  },

  // ga-easy-5
  {
    id: 'ga-easy-5',
    category: 'Groups & Alternation',
    difficulty: 'easy',
    title: 'File Extensions',
    prompt: 'Match file extensions .js, .ts, .py, or .go (including the dot).',
    sampleText: 'app.js util.ts main.py run.go style.css',
    sampleSolutions: ['\\.(js|ts|py|go)\\b', '\\.(?:js|ts|py|go)\\b'],
    hints: [
      'The dot must be escaped: \\.',
      'Use alternation (|) for the different extensions',
      'Group the alternatives with (...) or (?:...)',
    ],
    expectedMatches: [
      { start: 3, end: 6, text: '.js' },
      { start: 11, end: 14, text: '.ts' },
      { start: 19, end: 22, text: '.py' },
      { start: 26, end: 29, text: '.go' },
    ],
  },

  // ga-medium-6
  {
    id: 'ga-medium-6',
    category: 'Groups & Alternation',
    difficulty: 'medium',
    title: 'Name=Value Pairs',
    prompt:
      'Match name=value pairs where both name and value are word characters. Ignore malformed pairs.',
    sampleText: 'name=Alice age=30 city=NYC =bad no_val=',
    sampleSolutions: ['\\b\\w+=\\w+\\b'],
    hints: [
      '\\w+ matches one or more word characters for the name',
      'A literal = separates name from value',
      '\\w+ again for the value; \\b prevents partial matches',
    ],
    expectedMatches: [
      { start: 0, end: 10, text: 'name=Alice' },
      { start: 11, end: 17, text: 'age=30' },
      { start: 18, end: 26, text: 'city=NYC' },
    ],
  },

  // ga-hard-5
  {
    id: 'ga-hard-5',
    category: 'Groups & Alternation',
    difficulty: 'hard',
    title: 'Function Calls',
    prompt:
      'Match function calls with their parentheses and arguments, like foo() or bar(x) or baz(1, 2).',
    sampleText: 'foo() bar(x) baz(1, 2) not_func test()',
    sampleSolutions: ['\\b\\w+\\([^)]*\\)'],
    hints: [
      'A function name is \\w+ (word characters)',
      'Parentheses must be escaped: \\( and \\)',
      'Arguments inside are anything except ): [^)]*',
    ],
    expectedMatches: [
      { start: 0, end: 5, text: 'foo()' },
      { start: 6, end: 12, text: 'bar(x)' },
      { start: 13, end: 22, text: 'baz(1, 2)' },
      { start: 32, end: 38, text: 'test()' },
    ],
  },

  // es-easy-6
  {
    id: 'es-easy-6',
    category: 'Escaping & Special',
    difficulty: 'easy',
    title: 'Match Plus Signs',
    prompt: 'Match every literal + character in the text.',
    sampleText: '3+5 = 8, C++ is great, 1+1+1 = 3',
    sampleSolutions: ['\\+'],
    hints: [
      '+ is a quantifier in regex (means "one or more")',
      'Escape it with \\ to match a literal plus sign',
    ],
    expectedMatches: [
      { start: 1, end: 2, text: '+' },
      { start: 10, end: 11, text: '+' },
      { start: 11, end: 12, text: '+' },
      { start: 24, end: 25, text: '+' },
      { start: 26, end: 27, text: '+' },
    ],
  },

  // es-medium-4
  {
    id: 'es-medium-4',
    category: 'Escaping & Special',
    difficulty: 'medium',
    title: 'Parenthesized Content',
    prompt: 'Match content between parentheses, including the parentheses themselves.',
    sampleText: 'say (hello) and (world) then (42) done',
    sampleSolutions: ['\\([^)]*\\)'],
    hints: [
      'Parentheses are special in regex (they create groups)',
      'Escape them with \\: use \\( and \\)',
      'Match content inside with [^)]* (anything except closing paren)',
    ],
    expectedMatches: [
      { start: 4, end: 11, text: '(hello)' },
      { start: 16, end: 23, text: '(world)' },
      { start: 29, end: 33, text: '(42)' },
    ],
  },

  // es-hard-4
  {
    id: 'es-hard-4',
    category: 'Escaping & Special',
    difficulty: 'hard',
    title: 'Arithmetic Expressions',
    prompt:
      'Match simple arithmetic expressions: a number, an operator (+, -, *, /), and another number.',
    sampleText: '3+5 and 10*2 and 8/4 and 7-3 not abc',
    sampleSolutions: ['\\d+[+\\-*/]\\d+'],
    hints: [
      '\\d+ matches one or more digits on each side',
      'The operator is one of +, -, *, /',
      'Inside a character class, - should be escaped or placed at start/end',
    ],
    expectedMatches: [
      { start: 0, end: 3, text: '3+5' },
      { start: 8, end: 12, text: '10*2' },
      { start: 17, end: 20, text: '8/4' },
      { start: 25, end: 28, text: '7-3' },
    ],
  },

  // cp-easy-7
  {
    id: 'cp-easy-7',
    category: 'Common Patterns',
    difficulty: 'easy',
    title: '3-Letter Country Codes',
    prompt: 'Match 3-letter country codes (exactly 3 uppercase letters as whole words).',
    sampleText: 'Codes: USA GBR JP FRANCE DEU BR CAN',
    sampleSolutions: ['\\b[A-Z]{3}\\b'],
    hints: [
      '[A-Z] matches uppercase letters',
      '{3} means exactly 3 repetitions',
      '\\b ensures whole-word matching so longer strings are excluded',
    ],
    expectedMatches: [
      { start: 7, end: 10, text: 'USA' },
      { start: 11, end: 14, text: 'GBR' },
      { start: 25, end: 28, text: 'DEU' },
      { start: 32, end: 35, text: 'CAN' },
    ],
  },

  // cp-medium-9
  {
    id: 'cp-medium-9',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'US Phone Numbers',
    prompt: 'Match phone numbers in (xxx) xxx-xxxx format.',
    sampleText: 'Call (555) 123-4567 or (800) 555-1234 not 555-1234',
    sampleSolutions: ['\\(\\d{3}\\) \\d{3}-\\d{4}'],
    hints: [
      'Parentheses must be escaped: \\( and \\)',
      'Area code is \\d{3} inside the parens',
      'A space, then \\d{3}-\\d{4} for the rest of the number',
    ],
    expectedMatches: [
      { start: 5, end: 19, text: '(555) 123-4567' },
      { start: 23, end: 37, text: '(800) 555-1234' },
    ],
  },

  // =====================================================================
  // COMMON PATTERNS (10 more)
  // =====================================================================

  // cp-easy-5
  {
    id: 'cp-easy-5',
    category: 'Common Patterns',
    difficulty: 'easy',
    title: 'Simple Time Format',
    prompt:
      'Match simple time formats in HH:MM (like 09:30 or 14:45). Only match two-digit hours and minutes.',
    sampleText: 'Meet at 09:30 and leave by 14:45 ok? Not 9:5.',
    sampleSolutions: ['\\b\\d{2}:\\d{2}\\b'],
    hints: [
      'Hours and minutes are each exactly two digits',
      'They are separated by a colon',
      'Use \\d{2} for exactly two digits',
    ],
    expectedMatches: [
      { start: 8, end: 13, text: '09:30' },
      { start: 27, end: 32, text: '14:45' },
    ],
  },

  // cp-easy-6
  {
    id: 'cp-easy-6',
    category: 'Common Patterns',
    difficulty: 'easy',
    title: 'Find Hashtags',
    prompt: 'Match hashtags: a # followed by one or more word characters.',
    sampleText: 'Trending: #AI and #web3 and #100DaysOfCode! Not # alone.',
    sampleSolutions: ['#\\w+'],
    hints: [
      'Hashtags start with #',
      'Followed by one or more word characters (\\w+)',
      '# alone with no following word chars should not match',
    ],
    expectedMatches: [
      { start: 10, end: 13, text: '#AI' },
      { start: 18, end: 23, text: '#web3' },
      { start: 28, end: 42, text: '#100DaysOfCode' },
    ],
  },

  // cp-medium-5
  {
    id: 'cp-medium-5',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Match IPv4 Addresses',
    prompt: 'Match IPv4 addresses (four groups of 1-3 digits separated by dots).',
    sampleText: 'IPs: 192.168.0.1 and 10.0.0.1 and 255.255.255.0 here.',
    sampleSolutions: ['\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b'],
    hints: [
      'Each octet is 1 to 3 digits: \\d{1,3}',
      'Dots must be escaped: \\.',
      'Use \\b for word boundaries to avoid partial matches',
    ],
    expectedMatches: [
      { start: 5, end: 16, text: '192.168.0.1' },
      { start: 21, end: 29, text: '10.0.0.1' },
      { start: 34, end: 47, text: '255.255.255.0' },
    ],
  },

  // cp-medium-6
  {
    id: 'cp-medium-6',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Date MM/DD/YYYY',
    prompt:
      'Match dates in MM/DD/YYYY format (two-digit month and day, four-digit year, separated by forward slashes).',
    sampleText: 'Dates: 01/15/2024 and 12/25/2023 not 2024-01-15.',
    sampleSolutions: ['\\b\\d{2}/\\d{2}/\\d{4}\\b'],
    hints: [
      'Month and day are each two digits: \\d{2}',
      'Year is four digits: \\d{4}',
      'Separated by forward slashes (no escaping needed for /)',
    ],
    expectedMatches: [
      { start: 7, end: 17, text: '01/15/2024' },
      { start: 22, end: 32, text: '12/25/2023' },
    ],
  },

  // cp-medium-7
  {
    id: 'cp-medium-7',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'CSS Hex Color Codes',
    prompt: 'Match CSS hex color codes: # followed by exactly 3 or 6 hex digits (0-9, a-f, A-F).',
    sampleText: 'Colors: #fff, #a1b2c3, #000, #F0F not #xyz or #12.',
    sampleSolutions: ['#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\\b'],
    hints: [
      'Hex digits are [0-9a-fA-F]',
      'Use alternation: 6 digits OR 3 digits (check 6 first)',
      'Use \\b to prevent matching partial sequences',
    ],
    expectedMatches: [
      { start: 8, end: 12, text: '#fff' },
      { start: 14, end: 21, text: '#a1b2c3' },
      { start: 23, end: 27, text: '#000' },
      { start: 29, end: 33, text: '#F0F' },
    ],
  },

  // cp-medium-8
  {
    id: 'cp-medium-8',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'HTML Opening Tags',
    prompt:
      'Match simple HTML opening tags like <div>, <span>, <p>. Do not match closing tags like </div>.',
    sampleText: '<div>hello</div> <span>world</span> <p>text</p>',
    sampleSolutions: ['<[a-z]+>'],
    hints: [
      'Opening tags start with < followed by letters',
      'Closing tags have a / after < so they will not match [a-z]',
      'Tag names are lowercase letters: [a-z]+',
    ],
    expectedMatches: [
      { start: 0, end: 5, text: '<div>' },
      { start: 17, end: 23, text: '<span>' },
      { start: 36, end: 39, text: '<p>' },
    ],
  },

  // cp-hard-5
  {
    id: 'cp-hard-5',
    category: 'Common Patterns',
    difficulty: 'hard',
    title: 'Credit Card Numbers',
    prompt:
      'Match credit card numbers formatted as 4 groups of 4 digits separated by hyphens or spaces.',
    sampleText: 'Cards: 1234-5678-9012-3456 and 9876 5432 1098 7654 not 1234-567.',
    sampleSolutions: ['\\b\\d{4}[- ]\\d{4}[- ]\\d{4}[- ]\\d{4}\\b'],
    hints: [
      'Each group is exactly 4 digits: \\d{4}',
      'Groups are separated by a hyphen or space: [- ]',
      'Use \\b to ensure full number boundaries',
    ],
    expectedMatches: [
      { start: 7, end: 26, text: '1234-5678-9012-3456' },
      { start: 31, end: 50, text: '9876 5432 1098 7654' },
    ],
  },

  // cp-hard-6
  {
    id: 'cp-hard-6',
    category: 'Common Patterns',
    difficulty: 'hard',
    title: 'URLs with Protocol',
    prompt:
      'Match URLs that start with http:// or https://. Do not match other protocols like ftp://.',
    sampleText: 'Go to https://example.com or http://test.org/page not ftp://x.co.',
    sampleSolutions: ['https?://[\\w./?&#=-]+'],
    hints: [
      'Start with https?:// to match http or https',
      'URL characters include word chars, dots, slashes, query params',
      'Use a character class for URL-safe characters',
    ],
    expectedMatches: [
      { start: 6, end: 25, text: 'https://example.com' },
      { start: 29, end: 49, text: 'http://test.org/page' },
    ],
  },

  // cp-hard-7
  {
    id: 'cp-hard-7',
    category: 'Common Patterns',
    difficulty: 'hard',
    title: 'Currency Amounts',
    prompt:
      'Match US dollar amounts in $1,234.56 format. The dollar sign is required, commas separate thousands, and cents are optional.',
    sampleText: 'Costs: $1,234.56 and $99.99 and $1,000 not 12.34.',
    sampleSolutions: ['\\$\\d{1,3}(?:,\\d{3})*(?:\\.\\d{2})?\\b'],
    hints: [
      'Start with escaped dollar sign: \\$',
      'First group is 1-3 digits, then optional comma-separated groups of 3',
      'Optional cents: (?:\\.\\d{2})?',
    ],
    expectedMatches: [
      { start: 7, end: 16, text: '$1,234.56' },
      { start: 21, end: 27, text: '$99.99' },
      { start: 32, end: 38, text: '$1,000' },
    ],
  },

  // cp-hard-8
  {
    id: 'cp-hard-8',
    category: 'Common Patterns',
    difficulty: 'hard',
    title: 'Semantic Version Numbers',
    prompt:
      'Match semantic version numbers in MAJOR.MINOR.PATCH format (like 1.2.3 or 10.0.1). Do not match partial versions like 1.2.',
    sampleText: 'Versions: 1.2.3 and 10.0.1 and 0.9.99 not 1.2 or 3.',
    sampleSolutions: ['\\b\\d+\\.\\d+\\.\\d+\\b'],
    hints: [
      'Three groups of digits separated by dots',
      'Each group is one or more digits: \\d+',
      'Dots must be escaped: \\.',
    ],
    expectedMatches: [
      { start: 10, end: 15, text: '1.2.3' },
      { start: 20, end: 26, text: '10.0.1' },
      { start: 31, end: 37, text: '0.9.99' },
    ],
  },

  // =====================================================================
  // ESCAPING & SPECIAL (4 more)
  // =====================================================================

  // es-easy-4
  {
    id: 'es-easy-4',
    category: 'Escaping & Special',
    difficulty: 'easy',
    title: 'Literal Dollar Signs',
    prompt: 'Match every literal $ character in the text.',
    sampleText: 'Prices: $5 and $100 and $$VIP$$ for sale.',
    sampleSolutions: ['\\$'],
    hints: [
      '$ normally means end-of-string in regex',
      'Escape it with a backslash to match it literally',
      'Each $ is a separate match',
    ],
    expectedMatches: [
      { start: 8, end: 9, text: '$' },
      { start: 15, end: 16, text: '$' },
      { start: 24, end: 25, text: '$' },
      { start: 25, end: 26, text: '$' },
      { start: 29, end: 30, text: '$' },
      { start: 30, end: 31, text: '$' },
    ],
  },

  // es-easy-5
  {
    id: 'es-easy-5',
    category: 'Escaping & Special',
    difficulty: 'easy',
    title: 'Literal Square Brackets',
    prompt: 'Match every literal [ or ] character.',
    sampleText: 'Array[0] and map[key] and empty[] here.',
    sampleSolutions: ['[\\[\\]]'],
    hints: [
      'Square brackets define character classes in regex',
      'You must escape them: \\[ and \\]',
      'Put them inside a character class: [\\[\\]]',
    ],
    expectedMatches: [
      { start: 5, end: 6, text: '[' },
      { start: 7, end: 8, text: ']' },
      { start: 16, end: 17, text: '[' },
      { start: 20, end: 21, text: ']' },
      { start: 31, end: 32, text: '[' },
      { start: 32, end: 33, text: ']' },
    ],
  },

  // es-medium-3
  {
    id: 'es-medium-3',
    category: 'Escaping & Special',
    difficulty: 'medium',
    title: 'Strings Containing Dots',
    prompt:
      'Match word sequences that contain a literal dot in the middle (like filenames: app.js, test.py). The dot must be between word characters.',
    sampleText: 'Files: app.js and test.py and README not dotless.',
    sampleSolutions: ['\\w+\\.\\w+'],
    hints: [
      'Use \\. to match a literal dot (not a wildcard)',
      'Word characters on both sides: \\w+',
      'A trailing period after a word has no \\w after it, so it will not match',
    ],
    expectedMatches: [
      { start: 7, end: 13, text: 'app.js' },
      { start: 18, end: 25, text: 'test.py' },
    ],
  },

  // es-hard-3
  {
    id: 'es-hard-3',
    category: 'Escaping & Special',
    difficulty: 'hard',
    title: 'Regex-Like Patterns in Text',
    prompt:
      'Match patterns that look like regex literals: non-whitespace content between forward slashes, with optional flags (g, i, m, s, u, y) after the closing slash.',
    sampleText: 'Use /\\d+/ and /[a-z]/g in code, not a/b.',
    sampleSolutions: ['/[^/\\s]+/[gimsuy]*'],
    hints: [
      'Forward slashes delimit the pattern',
      'Content between slashes: [^/\\s]+ (no slashes or whitespace)',
      'Optional flags after the closing slash: [gimsuy]*',
    ],
    expectedMatches: [
      { start: 4, end: 9, text: '/\\d+/' },
      { start: 14, end: 22, text: '/[a-z]/g' },
    ],
  },

  // =====================================================================
  // LOOKAROUND (4 more)
  // =====================================================================

  // la-medium-5
  {
    id: 'la-medium-5',
    category: 'Lookaround',
    difficulty: 'medium',
    title: 'Words Before Exclamation',
    prompt:
      'Match words that are immediately followed by an exclamation mark. Do not include the exclamation mark in the match.',
    sampleText: 'Wow! Great job! Hello there. Stop! Go now.',
    sampleSolutions: ['\\w+(?=!)'],
    hints: [
      'Positive lookahead (?=!) checks for ! without consuming it',
      '\\w+ matches the word itself',
      'The ! is asserted but not included in the match',
    ],
    expectedMatches: [
      { start: 0, end: 3, text: 'Wow' },
      { start: 11, end: 14, text: 'job' },
      { start: 29, end: 33, text: 'Stop' },
    ],
  },

  // la-medium-6
  {
    id: 'la-medium-6',
    category: 'Lookaround',
    difficulty: 'medium',
    title: 'Digits Not After Minus',
    prompt: 'Match numbers (sequences of digits) that are NOT preceded by a minus sign.',
    sampleText: 'Temps: 5 and -3 and 10 and -7 and 0 here.',
    sampleSolutions: ['(?<!-)\\b\\d+'],
    hints: [
      'Negative lookbehind (?<!-) ensures no minus before the match',
      '\\b ensures we match whole numbers',
      '-3 and -7 should be excluded',
    ],
    expectedMatches: [
      { start: 7, end: 8, text: '5' },
      { start: 20, end: 22, text: '10' },
      { start: 34, end: 35, text: '0' },
    ],
  },

  // la-hard-6
  {
    id: 'la-hard-6',
    category: 'Lookaround',
    difficulty: 'hard',
    title: 'Middle Words Only',
    prompt:
      'Match words that are both preceded by a space and followed by a space (words in the middle of the text, not the first or last word).',
    sampleText: 'the quick brown fox jumps over dogs',
    sampleSolutions: ['(?<= )\\w+(?= )'],
    hints: [
      'Positive lookbehind (?<= ) asserts a space before',
      'Positive lookahead (?= ) asserts a space after',
      'The first and last words are excluded because they lack a space on one side',
    ],
    expectedMatches: [
      { start: 4, end: 9, text: 'quick' },
      { start: 10, end: 15, text: 'brown' },
      { start: 16, end: 19, text: 'fox' },
      { start: 20, end: 25, text: 'jumps' },
      { start: 26, end: 30, text: 'over' },
    ],
  },

  // la-hard-7
  {
    id: 'la-hard-7',
    category: 'Lookaround',
    difficulty: 'hard',
    title: 'Capitalized Non-Sentence-Start',
    prompt:
      'Match capitalized words (uppercase letter followed by lowercase letters) that do NOT appear at the start of a sentence. A sentence starts at the beginning of the text or after a period and space.',
    sampleText: 'I saw Bob in Paris. She met Alice there.',
    sampleSolutions: ['(?<!^)(?<!\\. )[A-Z][a-z]+'],
    hints: [
      'Use negative lookbehind (?<!^) to exclude start of text',
      'Use negative lookbehind (?<!\\. ) to exclude after period-space',
      '[A-Z][a-z]+ matches a capitalized word (excludes single-letter words like I)',
    ],
    tags: ['multiline'],
    expectedMatches: [
      { start: 6, end: 9, text: 'Bob' },
      { start: 13, end: 18, text: 'Paris' },
      { start: 28, end: 33, text: 'Alice' },
    ],
  },

  // =====================================================================
  // CHARACTER CLASSES (batch 4)
  // =====================================================================

  // cc-easy-6
  {
    id: 'cc-easy-6',
    category: 'Character Classes',
    difficulty: 'easy',
    title: 'Match Uppercase Letters',
    prompt: 'Match every individual uppercase letter in the text.',
    sampleText: 'Hello WORLD, Today IS a GREAT Day!',
    sampleSolutions: ['[A-Z]'],
    hints: [
      'Use [A-Z] to match a single uppercase letter',
      'This matches one character at a time, not whole words',
    ],
    expectedMatches: [
      { start: 0, end: 1, text: 'H' },
      { start: 6, end: 7, text: 'W' },
      { start: 7, end: 8, text: 'O' },
      { start: 8, end: 9, text: 'R' },
      { start: 9, end: 10, text: 'L' },
      { start: 10, end: 11, text: 'D' },
      { start: 13, end: 14, text: 'T' },
      { start: 19, end: 20, text: 'I' },
      { start: 20, end: 21, text: 'S' },
      { start: 24, end: 25, text: 'G' },
      { start: 25, end: 26, text: 'R' },
      { start: 26, end: 27, text: 'E' },
      { start: 27, end: 28, text: 'A' },
      { start: 28, end: 29, text: 'T' },
      { start: 30, end: 31, text: 'D' },
    ],
  },

  // cc-medium-5
  {
    id: 'cc-medium-5',
    category: 'Character Classes',
    difficulty: 'medium',
    title: 'Alphanumeric Only',
    prompt:
      'Match every individual alphanumeric character (letters and digits only, no underscores, spaces, or punctuation).',
    sampleText: 'user_42 says: "Hello, World!" @ 2024.',
    sampleSolutions: ['[a-zA-Z0-9]', '[^\\W_]'],
    hints: [
      'Use [a-zA-Z0-9] to match letters and digits',
      'Note that \\w includes underscores, so [a-zA-Z0-9] is more precise here',
    ],
    expectedMatches: [
      { start: 0, end: 1, text: 'u' },
      { start: 1, end: 2, text: 's' },
      { start: 2, end: 3, text: 'e' },
      { start: 3, end: 4, text: 'r' },
      { start: 5, end: 6, text: '4' },
      { start: 6, end: 7, text: '2' },
      { start: 8, end: 9, text: 's' },
      { start: 9, end: 10, text: 'a' },
      { start: 10, end: 11, text: 'y' },
      { start: 11, end: 12, text: 's' },
      { start: 15, end: 16, text: 'H' },
      { start: 16, end: 17, text: 'e' },
      { start: 17, end: 18, text: 'l' },
      { start: 18, end: 19, text: 'l' },
      { start: 19, end: 20, text: 'o' },
      { start: 22, end: 23, text: 'W' },
      { start: 23, end: 24, text: 'o' },
      { start: 24, end: 25, text: 'r' },
      { start: 25, end: 26, text: 'l' },
      { start: 26, end: 27, text: 'd' },
      { start: 32, end: 33, text: '2' },
      { start: 33, end: 34, text: '0' },
      { start: 34, end: 35, text: '2' },
      { start: 35, end: 36, text: '4' },
    ],
  },

  // cc-hard-3
  {
    id: 'cc-hard-3',
    category: 'Character Classes',
    difficulty: 'hard',
    title: 'Punctuation Only',
    prompt:
      'Match any character that is NOT a letter, digit, underscore, or whitespace (punctuation and symbols only).',
    sampleText: 'Price: $5.99 (50% off!) #deal',
    sampleSolutions: ['[^\\w\\s]', '[^a-zA-Z0-9_\\s]'],
    hints: [
      '\\w matches letters, digits, and underscores',
      '\\s matches whitespace',
      '[^\\w\\s] negates both classes to match everything else',
    ],
    expectedMatches: [
      { start: 5, end: 6, text: ':' },
      { start: 7, end: 8, text: '$' },
      { start: 9, end: 10, text: '.' },
      { start: 13, end: 14, text: '(' },
      { start: 16, end: 17, text: '%' },
      { start: 21, end: 22, text: '!' },
      { start: 22, end: 23, text: ')' },
      { start: 24, end: 25, text: '#' },
    ],
  },

  // cc-hard-4
  {
    id: 'cc-hard-4',
    category: 'Character Classes',
    difficulty: 'hard',
    title: 'Identical Adjacent Pairs',
    prompt: 'Match pairs of identical adjacent letters (e.g., "ll" in balloon, "oo" in pool).',
    sampleText: 'balloon coffee deep pool apple room',
    sampleSolutions: ['([a-zA-Z])\\1'],
    hints: [
      'Capture a letter with ([a-zA-Z])',
      'Use \\1 backreference to match the same character again',
      'This finds doubled letters like ll, oo, ff, ee, pp',
    ],
    expectedMatches: [
      { start: 2, end: 4, text: 'll' },
      { start: 4, end: 6, text: 'oo' },
      { start: 10, end: 12, text: 'ff' },
      { start: 12, end: 14, text: 'ee' },
      { start: 16, end: 18, text: 'ee' },
      { start: 21, end: 23, text: 'oo' },
      { start: 26, end: 28, text: 'pp' },
      { start: 32, end: 34, text: 'oo' },
    ],
  },

  // =====================================================================
  // QUANTIFIERS (batch 4)
  // =====================================================================

  // q-easy-5
  {
    id: 'q-easy-5',
    category: 'Quantifiers',
    difficulty: 'easy',
    title: 'Four-Letter Words',
    prompt: 'Match words that are exactly 4 letters long.',
    sampleText: 'The cats like fish and play with yarn each day',
    sampleSolutions: ['\\b[a-zA-Z]{4}\\b'],
    hints: [
      'Use {4} for exactly 4 repetitions',
      '\\b ensures word boundaries so you do not match inside longer words',
      'Use [a-zA-Z] for letters only',
    ],
    expectedMatches: [
      { start: 4, end: 8, text: 'cats' },
      { start: 9, end: 13, text: 'like' },
      { start: 14, end: 18, text: 'fish' },
      { start: 23, end: 27, text: 'play' },
      { start: 28, end: 32, text: 'with' },
      { start: 33, end: 37, text: 'yarn' },
      { start: 38, end: 42, text: 'each' },
    ],
  },

  // q-medium-5
  {
    id: 'q-medium-5',
    category: 'Quantifiers',
    difficulty: 'medium',
    title: 'Multi-Digit Numbers',
    prompt: 'Match sequences of 2 or more consecutive digits.',
    sampleText: 'Code 7 zip 42 port 8080 id 3 val 100',
    sampleSolutions: ['\\d{2,}'],
    hints: [
      'Use {2,} to mean "2 or more"',
      '\\d matches a single digit',
      'Single digits like 7 and 3 should NOT match',
    ],
    expectedMatches: [
      { start: 11, end: 13, text: '42' },
      { start: 19, end: 23, text: '8080' },
      { start: 33, end: 36, text: '100' },
    ],
  },

  // q-hard-3
  {
    id: 'q-hard-3',
    category: 'Quantifiers',
    difficulty: 'hard',
    title: 'Quoted Strings (Non-Greedy)',
    prompt:
      'Match text enclosed in double quotes, including the quotes themselves. Use a non-greedy match to avoid matching across multiple quoted sections.',
    sampleText: 'She said "hi" and "hello world" then "bye"',
    sampleSolutions: ['".*?"', '"[^"]*"'],
    hints: [
      'Use .*? for a non-greedy (lazy) match between quotes',
      'Alternatively, [^"]* matches any character except a double quote',
      'Both approaches prevent matching from the first " to the last "',
    ],
    expectedMatches: [
      { start: 9, end: 13, text: '"hi"' },
      { start: 18, end: 31, text: '"hello world"' },
      { start: 37, end: 42, text: '"bye"' },
    ],
  },

  // q-hard-4
  {
    id: 'q-hard-4',
    category: 'Quantifiers',
    difficulty: 'hard',
    title: 'Words of 5 to 8 Letters',
    prompt: 'Match words that are between 5 and 8 letters long (inclusive).',
    sampleText: 'Go to the store and find every orange there',
    sampleSolutions: ['\\b[a-zA-Z]{5,8}\\b'],
    hints: [
      'Use {5,8} for between 5 and 8 repetitions',
      '\\b marks word boundaries',
      'Words shorter than 5 or longer than 8 letters should not match',
    ],
    expectedMatches: [
      { start: 10, end: 15, text: 'store' },
      { start: 25, end: 30, text: 'every' },
      { start: 31, end: 37, text: 'orange' },
      { start: 38, end: 43, text: 'there' },
    ],
  },

  // =====================================================================
  // ANCHORS (batch 4)
  // =====================================================================

  // a-easy-4
  {
    id: 'a-easy-4',
    category: 'Anchors',
    difficulty: 'easy',
    title: 'First Word of Each Line',
    prompt: 'Match the first word at the beginning of each line.',
    sampleText: 'Hello world\nGoodbye moon\nSee you',
    sampleSolutions: ['^\\w+'],
    hints: [
      '^ matches the start of a line in multiline mode',
      '\\w+ matches one or more word characters',
      'Combine them to grab the first word on each line',
    ],
    tags: ['multiline'],
    expectedMatches: [
      { start: 0, end: 5, text: 'Hello' },
      { start: 12, end: 19, text: 'Goodbye' },
      { start: 25, end: 28, text: 'See' },
    ],
  },

  // a-medium-4
  {
    id: 'a-medium-4',
    category: 'Anchors',
    difficulty: 'medium',
    title: 'Lines Ending With Period',
    prompt: 'Match entire lines that end with a period.',
    sampleText: 'I am done.\nNot this one\nAlso here.\nReally? Nope',
    sampleSolutions: ['^.*\\.$'],
    hints: [
      '$ matches the end of a line in multiline mode',
      '\\. matches a literal period',
      '^.*\\.$ matches any line whose last character is a period',
    ],
    tags: ['multiline'],
    expectedMatches: [
      { start: 0, end: 10, text: 'I am done.' },
      { start: 24, end: 34, text: 'Also here.' },
    ],
  },

  // a-hard-3
  {
    id: 'a-hard-3',
    category: 'Anchors',
    difficulty: 'hard',
    title: 'Digit-Only Lines',
    prompt: 'Match entire lines that contain only digits (no letters or other characters).',
    sampleText: 'abc\n123\nhello\n456\n78x\n9',
    sampleSolutions: ['^\\d+$'],
    hints: [
      '^ and $ match start and end of each line in multiline mode',
      '\\d+ matches one or more digits',
      'Lines with any non-digit character should not match',
    ],
    tags: ['multiline'],
    expectedMatches: [
      { start: 4, end: 7, text: '123' },
      { start: 14, end: 17, text: '456' },
      { start: 22, end: 23, text: '9' },
    ],
  },

  // =====================================================================
  // GROUPS & ALTERNATION (batch 4)
  // =====================================================================

  // ga-easy-4
  {
    id: 'ga-easy-4',
    category: 'Groups & Alternation',
    difficulty: 'easy',
    title: 'Color Words',
    prompt: "Match the color words 'red', 'green', or 'blue' as whole words.",
    sampleText: 'I like red and green but not yellow or blue',
    sampleSolutions: ['\\b(?:red|green|blue)\\b', 'red|green|blue'],
    hints: [
      'Use | (pipe) for alternation to match one of several options',
      '\\b ensures you match whole words only',
      '(?:...) groups without capturing',
    ],
    expectedMatches: [
      { start: 7, end: 10, text: 'red' },
      { start: 15, end: 20, text: 'green' },
      { start: 39, end: 43, text: 'blue' },
    ],
  },

  // ga-medium-5
  {
    id: 'ga-medium-5',
    category: 'Groups & Alternation',
    difficulty: 'medium',
    title: 'Repeated Words',
    prompt:
      'Match cases where the same word appears twice in a row, separated by whitespace (e.g., "the the").',
    sampleText: 'the the cat sat sat on on the mat',
    sampleSolutions: ['\\b(\\w+)\\s+\\1\\b'],
    hints: [
      'Capture a word with (\\w+)',
      'Use \\1 backreference to match the same word again',
      '\\s+ matches the whitespace between the repeated words',
    ],
    expectedMatches: [
      { start: 0, end: 7, text: 'the the' },
      { start: 12, end: 19, text: 'sat sat' },
      { start: 20, end: 25, text: 'on on' },
    ],
  },

  // ga-hard-4
  {
    id: 'ga-hard-4',
    category: 'Groups & Alternation',
    difficulty: 'hard',
    title: 'Simple Parenthesized Content',
    prompt: 'Match content within non-nested parentheses, including the parentheses themselves.',
    sampleText: 'f(x) and g(42, y) plus h() ok',
    sampleSolutions: ['\\([^()]*\\)'],
    hints: [
      'Escape the parentheses with \\( and \\)',
      'Use [^()]* to match any character except parentheses',
      'This avoids matching nested parentheses',
    ],
    expectedMatches: [
      { start: 1, end: 4, text: '(x)' },
      { start: 10, end: 17, text: '(42, y)' },
      { start: 24, end: 26, text: '()' },
    ],
  },

  // =====================================================================
  // LOOKAROUND (batch 4)
  // =====================================================================

  // la-easy-1
  {
    id: 'la-easy-1',
    category: 'Lookaround',
    difficulty: 'easy',
    title: 'Digits Before Percent',
    prompt:
      'Match numbers that are immediately followed by a percent sign (%), without including the % in the match.',
    sampleText: 'Score: 95%, got 80% but need 70 points',
    sampleSolutions: ['\\d+(?=%)'],
    hints: [
      '(?=%) is a positive lookahead that checks for % without consuming it',
      '\\d+ matches one or more digits',
      'The % itself should not be part of the match',
    ],
    expectedMatches: [
      { start: 7, end: 9, text: '95' },
      { start: 16, end: 18, text: '80' },
    ],
  },

  // la-easy-2
  {
    id: 'la-easy-2',
    category: 'Lookaround',
    difficulty: 'easy',
    title: 'Names After Title',
    prompt:
      'Match words that are immediately preceded by "Dr. " or "Mr. " (do not include the title in the match).',
    sampleText: 'Meet Dr. Smith and Mr. Jones today',
    sampleSolutions: ['(?<=(?:Dr|Mr)\\.\\s)\\w+', '(?<=Dr\\. |Mr\\. )\\w+'],
    hints: [
      '(?<=...) is a positive lookbehind',
      'Use alternation inside the lookbehind for Dr or Mr',
      'Remember to escape the period with \\.',
    ],
    expectedMatches: [
      { start: 9, end: 14, text: 'Smith' },
      { start: 23, end: 28, text: 'Jones' },
    ],
  },

  // la-medium-4
  {
    id: 'la-medium-4',
    category: 'Lookaround',
    difficulty: 'medium',
    title: 'Words Not Before Comma',
    prompt: 'Match whole words that are NOT immediately followed by a comma.',
    sampleText: 'red, green blue, orange yellow',
    sampleSolutions: ['\\b\\w+\\b(?!,)'],
    hints: [
      '(?!,) is a negative lookahead that rejects matches followed by a comma',
      '\\b\\w+\\b matches whole words',
      'Words like "red" and "blue" that precede a comma should be excluded',
    ],
    expectedMatches: [
      { start: 5, end: 10, text: 'green' },
      { start: 17, end: 23, text: 'orange' },
      { start: 24, end: 30, text: 'yellow' },
    ],
  },

  // la-hard-5
  {
    id: 'la-hard-5',
    category: 'Lookaround',
    difficulty: 'hard',
    title: 'Password With Digit and Uppercase',
    prompt:
      'Match words of 8 or more characters that contain at least one digit AND at least one uppercase letter. Use lookaheads to assert both conditions.',
    sampleText: 'Pass1word ALLCAPS hello2go Xy3abcde short1',
    sampleSolutions: ['\\b(?=\\w*[A-Z])(?=\\w*\\d)\\w{8,}\\b'],
    hints: [
      'Use (?=\\w*[A-Z]) to assert at least one uppercase letter exists',
      'Use (?=\\w*\\d) to assert at least one digit exists',
      'Combine multiple lookaheads at the start before matching \\w{8,}',
    ],
    expectedMatches: [
      { start: 0, end: 9, text: 'Pass1word' },
      { start: 27, end: 35, text: 'Xy3abcde' },
    ],
  },
];
