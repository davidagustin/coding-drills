import type { Problem } from '../types';

export const javascriptProblems: Problem[] = [
  // ========================================
  // ARRAY METHODS - filter
  // ========================================
  {
    id: 'js-filter-001',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Filter Even Numbers',
    text: 'Use the filter method to get only even numbers from the array.',
    setup: 'const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];',
    setupCode: 'const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];',
    expected: [2, 4, 6, 8, 10],
    sample: 'numbers.filter(n => n % 2 === 0)',
    hints: ['Use the modulo operator %', 'Even numbers have remainder 0 when divided by 2'],
    validPatterns: [
      /\.filter\s*\(\s*\w*\s*=>\s*\w*\s*%\s*2\s*(===?|!==?)\s*0\s*\)/,
      /\.filter\s*\(\s*function\s*\(\s*\w+\s*\)\s*\{\s*return\s+\w+\s*%\s*2\s*(===?|!==?)\s*0/,
    ],
    tags: ['filter', 'modulo', 'basics'],
  },
  {
    id: 'js-filter-002',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Filter Strings by Length',
    text: 'Filter the array to get only strings with more than 4 characters.',
    setup: 'const words = ["cat", "elephant", "dog", "hippopotamus", "ant", "tiger"];',
    setupCode: 'const words = ["cat", "elephant", "dog", "hippopotamus", "ant", "tiger"];',
    expected: ['elephant', 'hippopotamus', 'tiger'],
    sample: 'words.filter(w => w.length > 4)',
    hints: ['Use the .length property', 'Compare length to 4'],
    validPatterns: [
      /\.filter\s*\(\s*\w+\s*=>\s*\w+\.length\s*>\s*4\s*\)/,
      /\.filter\s*\(\s*\(\s*\w+\s*\)\s*=>\s*\w+\.length\s*>\s*4\s*\)/,
    ],
    tags: ['filter', 'length', 'strings'],
  },
  {
    id: 'js-filter-003',
    category: 'Array Methods',
    difficulty: 'medium',
    title: 'Filter Objects by Property',
    text: 'Filter the users array to get only users who are active.',
    setup: `const users = [
  { name: "Alice", active: true },
  { name: "Bob", active: false },
  { name: "Charlie", active: true },
  { name: "Diana", active: false }
];`,
    setupCode: `const users = [
  { name: "Alice", active: true },
  { name: "Bob", active: false },
  { name: "Charlie", active: true },
  { name: "Diana", active: false }
];`,
    expected: [
      { name: 'Alice', active: true },
      { name: 'Charlie', active: true },
    ],
    sample: 'users.filter(u => u.active)',
    hints: ['Access the active property', 'Boolean values work directly in conditions'],
    validPatterns: [
      /\.filter\s*\(\s*\w+\s*=>\s*\w+\.active\s*\)/,
      /\.filter\s*\(\s*\w+\s*=>\s*\w+\.active\s*(===?)\s*true\s*\)/,
      /\.filter\s*\(\s*\{\s*active\s*\}\s*=>\s*active\s*\)/,
    ],
    tags: ['filter', 'objects', 'property-access'],
  },
  {
    id: 'js-filter-004',
    category: 'Array Methods',
    difficulty: 'medium',
    title: 'Filter Unique Values',
    text: 'Use filter with indexOf to get unique values from the array.',
    setup: 'const numbers = [1, 2, 2, 3, 4, 4, 5, 1, 3];',
    setupCode: 'const numbers = [1, 2, 2, 3, 4, 4, 5, 1, 3];',
    expected: [1, 2, 3, 4, 5],
    sample: 'numbers.filter((n, i) => numbers.indexOf(n) === i)',
    hints: [
      'indexOf returns the first occurrence index',
      'Compare current index with first occurrence',
    ],
    validPatterns: [
      /\.filter\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>\s*\w+\.indexOf\s*\(\s*\w+\s*\)\s*===?\s*\w+\s*\)/,
    ],
    tags: ['filter', 'indexOf', 'unique'],
  },
  {
    id: 'js-filter-005',
    category: 'Array Methods',
    difficulty: 'hard',
    title: 'Filter with Multiple Conditions',
    text: 'Filter products that are in stock AND cost less than $50.',
    setup: `const products = [
  { name: "Laptop", price: 999, inStock: true },
  { name: "Mouse", price: 29, inStock: true },
  { name: "Keyboard", price: 49, inStock: false },
  { name: "Monitor", price: 299, inStock: true },
  { name: "USB Cable", price: 9, inStock: true }
];`,
    setupCode: `const products = [
  { name: "Laptop", price: 999, inStock: true },
  { name: "Mouse", price: 29, inStock: true },
  { name: "Keyboard", price: 49, inStock: false },
  { name: "Monitor", price: 299, inStock: true },
  { name: "USB Cable", price: 9, inStock: true }
];`,
    expected: [
      { name: 'Mouse', price: 29, inStock: true },
      { name: 'USB Cable', price: 9, inStock: true },
    ],
    sample: 'products.filter(p => p.inStock && p.price < 50)',
    hints: ['Use && for multiple conditions', 'Check both inStock and price'],
    validPatterns: [
      /\.filter\s*\(\s*\w+\s*=>\s*\w+\.inStock\s*&&\s*\w+\.price\s*<\s*50\s*\)/,
      /\.filter\s*\(\s*\w+\s*=>\s*\w+\.price\s*<\s*50\s*&&\s*\w+\.inStock\s*\)/,
    ],
    tags: ['filter', 'objects', 'conditions'],
  },

  // ========================================
  // ARRAY METHODS - map
  // ========================================
  {
    id: 'js-map-001',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Double All Numbers',
    text: 'Use map to double every number in the array.',
    setup: 'const numbers = [1, 2, 3, 4, 5];',
    setupCode: 'const numbers = [1, 2, 3, 4, 5];',
    expected: [2, 4, 6, 8, 10],
    sample: 'numbers.map(n => n * 2)',
    hints: ['Multiply each element by 2', 'map returns a new array'],
    validPatterns: [
      /\.map\s*\(\s*\w+\s*=>\s*\w+\s*\*\s*2\s*\)/,
      /\.map\s*\(\s*\(\s*\w+\s*\)\s*=>\s*\w+\s*\*\s*2\s*\)/,
    ],
    tags: ['map', 'arithmetic', 'basics'],
  },
  {
    id: 'js-map-002',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Extract Property Values',
    text: 'Use map to get an array of just the names from the users array.',
    setup: `const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 }
];`,
    setupCode: `const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 }
];`,
    expected: ['Alice', 'Bob', 'Charlie'],
    sample: 'users.map(u => u.name)',
    hints: ['Access the name property', 'map transforms each element'],
    validPatterns: [
      /\.map\s*\(\s*\w+\s*=>\s*\w+\.name\s*\)/,
      /\.map\s*\(\s*\{\s*name\s*\}\s*=>\s*name\s*\)/,
    ],
    tags: ['map', 'objects', 'property-access'],
  },
  {
    id: 'js-map-003',
    category: 'Array Methods',
    difficulty: 'medium',
    title: 'Transform to New Object Shape',
    text: 'Transform each user into an object with fullName and isAdult properties.',
    setup: `const users = [
  { firstName: "John", lastName: "Doe", age: 17 },
  { firstName: "Jane", lastName: "Smith", age: 25 },
  { firstName: "Bob", lastName: "Brown", age: 16 }
];`,
    setupCode: `const users = [
  { firstName: "John", lastName: "Doe", age: 17 },
  { firstName: "Jane", lastName: "Smith", age: 25 },
  { firstName: "Bob", lastName: "Brown", age: 16 }
];`,
    expected: [
      { fullName: 'John Doe', isAdult: false },
      { fullName: 'Jane Smith', isAdult: true },
      { fullName: 'Bob Brown', isAdult: false },
    ],
    sample: 'users.map(u => ({ fullName: `${u.firstName} ${u.lastName}`, isAdult: u.age >= 18 }))',
    hints: [
      'Create a new object in map',
      'Concatenate firstName and lastName',
      'Check if age >= 18',
    ],
    validPatterns: [/\.map\s*\(\s*\w+\s*=>\s*\(\s*\{/],
    tags: ['map', 'objects', 'transformation'],
  },
  {
    id: 'js-map-004',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Convert to Uppercase',
    text: 'Use map to convert all strings to uppercase.',
    setup: 'const words = ["hello", "world", "javascript"];',
    setupCode: 'const words = ["hello", "world", "javascript"];',
    expected: ['HELLO', 'WORLD', 'JAVASCRIPT'],
    sample: 'words.map(w => w.toUpperCase())',
    hints: ['Use the toUpperCase() method', 'map returns a new array'],
    validPatterns: [/\.map\s*\(\s*\w+\s*=>\s*\w+\.toUpperCase\s*\(\s*\)\s*\)/],
    tags: ['map', 'strings', 'toUpperCase'],
  },
  {
    id: 'js-map-005',
    category: 'Array Methods',
    difficulty: 'medium',
    title: 'Map with Index',
    text: 'Create an array of objects with value and index properties.',
    setup: 'const letters = ["a", "b", "c", "d"];',
    setupCode: 'const letters = ["a", "b", "c", "d"];',
    expected: [
      { value: 'a', index: 0 },
      { value: 'b', index: 1 },
      { value: 'c', index: 2 },
      { value: 'd', index: 3 },
    ],
    sample: 'letters.map((value, index) => ({ value, index }))',
    hints: ['map callback receives index as second argument', 'Use shorthand property syntax'],
    validPatterns: [/\.map\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>/],
    tags: ['map', 'index', 'objects'],
  },

  // ========================================
  // ARRAY METHODS - reduce
  // ========================================
  {
    id: 'js-reduce-001',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Sum All Numbers',
    text: 'Use reduce to calculate the sum of all numbers.',
    setup: 'const numbers = [1, 2, 3, 4, 5];',
    setupCode: 'const numbers = [1, 2, 3, 4, 5];',
    expected: 15,
    sample: 'numbers.reduce((sum, n) => sum + n, 0)',
    hints: ['Start with initial value 0', 'Add each number to the accumulator'],
    validPatterns: [/\.reduce\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>\s*\w+\s*\+\s*\w+\s*,\s*0\s*\)/],
    tags: ['reduce', 'sum', 'basics'],
  },
  {
    id: 'js-reduce-002',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Find Maximum Value',
    text: 'Use reduce to find the maximum value in the array.',
    setup: 'const numbers = [5, 2, 9, 1, 7, 3];',
    setupCode: 'const numbers = [5, 2, 9, 1, 7, 3];',
    expected: 9,
    sample: 'numbers.reduce((max, n) => n > max ? n : max, numbers[0])',
    hints: ['Compare each number to the current max', 'Use ternary operator or Math.max'],
    validPatterns: [
      /\.reduce\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>/,
      /Math\.max\s*\(\s*\.\.\.\w+\s*\)/,
    ],
    tags: ['reduce', 'max', 'comparison'],
  },
  {
    id: 'js-reduce-003',
    category: 'Array Methods',
    difficulty: 'medium',
    title: 'Count Occurrences',
    text: 'Use reduce to count how many times each fruit appears.',
    setup: 'const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];',
    setupCode: 'const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];',
    expected: { apple: 3, banana: 2, orange: 1 },
    sample: 'fruits.reduce((acc, fruit) => ({ ...acc, [fruit]: (acc[fruit] || 0) + 1 }), {})',
    hints: [
      'Start with an empty object',
      'Use computed property names [fruit]',
      'Initialize count to 0 if undefined',
    ],
    validPatterns: [/\.reduce\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>/],
    tags: ['reduce', 'counting', 'objects'],
  },
  {
    id: 'js-reduce-004',
    category: 'Array Methods',
    difficulty: 'medium',
    title: 'Flatten Nested Arrays',
    text: 'Use reduce to flatten the nested array one level deep.',
    setup: 'const nested = [[1, 2], [3, 4], [5, 6]];',
    setupCode: 'const nested = [[1, 2], [3, 4], [5, 6]];',
    expected: [1, 2, 3, 4, 5, 6],
    sample: 'nested.reduce((flat, arr) => [...flat, ...arr], [])',
    hints: ['Spread each inner array', 'Start with empty array'],
    validPatterns: [
      /\.reduce\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>\s*\[\s*\.\.\.\w+\s*,\s*\.\.\.\w+\s*\]/,
      /\.reduce\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>\s*\w+\.concat\s*\(\s*\w+\s*\)/,
      /\.flat\s*\(\s*\)/,
    ],
    tags: ['reduce', 'flatten', 'spread'],
  },
  {
    id: 'js-reduce-005',
    category: 'Array Methods',
    difficulty: 'hard',
    title: 'Group By Property',
    text: 'Use reduce to group users by their department.',
    setup: `const employees = [
  { name: "Alice", department: "Engineering" },
  { name: "Bob", department: "Marketing" },
  { name: "Charlie", department: "Engineering" },
  { name: "Diana", department: "Marketing" },
  { name: "Eve", department: "Sales" }
];`,
    setupCode: `const employees = [
  { name: "Alice", department: "Engineering" },
  { name: "Bob", department: "Marketing" },
  { name: "Charlie", department: "Engineering" },
  { name: "Diana", department: "Marketing" },
  { name: "Eve", department: "Sales" }
];`,
    expected: {
      Engineering: [
        { name: 'Alice', department: 'Engineering' },
        { name: 'Charlie', department: 'Engineering' },
      ],
      Marketing: [
        { name: 'Bob', department: 'Marketing' },
        { name: 'Diana', department: 'Marketing' },
      ],
      Sales: [{ name: 'Eve', department: 'Sales' }],
    },
    sample: `employees.reduce((groups, emp) => {
  const key = emp.department;
  groups[key] = groups[key] || [];
  groups[key].push(emp);
  return groups;
}, {})`,
    hints: [
      'Use department as the key',
      'Initialize empty array for new departments',
      'Push employee to appropriate group',
    ],
    validPatterns: [/\.reduce\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>/],
    tags: ['reduce', 'groupBy', 'objects'],
  },

  // ========================================
  // ARRAY METHODS - find and findIndex
  // ========================================
  {
    id: 'js-find-001',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Find First Even Number',
    text: 'Use find to get the first even number in the array.',
    setup: 'const numbers = [1, 3, 5, 8, 9, 10];',
    setupCode: 'const numbers = [1, 3, 5, 8, 9, 10];',
    expected: 8,
    sample: 'numbers.find(n => n % 2 === 0)',
    hints: ['find returns the first matching element', 'Use modulo to check for even'],
    validPatterns: [/\.find\s*\(\s*\w+\s*=>\s*\w+\s*%\s*2\s*===?\s*0\s*\)/],
    tags: ['find', 'modulo', 'basics'],
  },
  {
    id: 'js-find-002',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Find User by ID',
    text: 'Use find to get the user with id 3.',
    setup: `const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Diana" }
];`,
    setupCode: `const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Diana" }
];`,
    expected: { id: 3, name: 'Charlie' },
    sample: 'users.find(u => u.id === 3)',
    hints: ['Compare id property to 3', 'find returns the matching object'],
    validPatterns: [/\.find\s*\(\s*\w+\s*=>\s*\w+\.id\s*===?\s*3\s*\)/],
    tags: ['find', 'objects', 'property-access'],
  },
  {
    id: 'js-findIndex-001',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Find Index of First Negative',
    text: 'Use findIndex to get the index of the first negative number.',
    setup: 'const numbers = [5, 3, -2, 8, -6, 1];',
    setupCode: 'const numbers = [5, 3, -2, 8, -6, 1];',
    expected: 2,
    sample: 'numbers.findIndex(n => n < 0)',
    hints: ['findIndex returns the index, not the element', 'Negative numbers are less than 0'],
    validPatterns: [/\.findIndex\s*\(\s*\w+\s*=>\s*\w+\s*<\s*0\s*\)/],
    tags: ['findIndex', 'comparison', 'basics'],
  },

  // ========================================
  // ARRAY METHODS - some and every
  // ========================================
  {
    id: 'js-some-001',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Check for Any Negative',
    text: 'Use some to check if any number is negative.',
    setup: 'const numbers = [1, 5, -3, 8, 2];',
    setupCode: 'const numbers = [1, 5, -3, 8, 2];',
    expected: true,
    sample: 'numbers.some(n => n < 0)',
    hints: [
      'some returns true if at least one element matches',
      'Negative numbers are less than 0',
    ],
    validPatterns: [/\.some\s*\(\s*\w+\s*=>\s*\w+\s*<\s*0\s*\)/],
    tags: ['some', 'comparison', 'basics'],
  },
  {
    id: 'js-some-002',
    category: 'Array Methods',
    difficulty: 'medium',
    title: 'Check for Admin User',
    text: 'Use some to check if any user is an admin.',
    setup: `const users = [
  { name: "Alice", role: "user" },
  { name: "Bob", role: "admin" },
  { name: "Charlie", role: "user" }
];`,
    setupCode: `const users = [
  { name: "Alice", role: "user" },
  { name: "Bob", role: "admin" },
  { name: "Charlie", role: "user" }
];`,
    expected: true,
    sample: 'users.some(u => u.role === "admin")',
    hints: ['Check the role property', 'Compare to "admin"'],
    validPatterns: [/\.some\s*\(\s*\w+\s*=>\s*\w+\.role\s*===?\s*['"]admin['"]\s*\)/],
    tags: ['some', 'objects', 'property-access'],
  },
  {
    id: 'js-every-001',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Check All Positive',
    text: 'Use every to check if all numbers are positive.',
    setup: 'const numbers = [1, 5, 3, 8, 2];',
    setupCode: 'const numbers = [1, 5, 3, 8, 2];',
    expected: true,
    sample: 'numbers.every(n => n > 0)',
    hints: ['every returns true if ALL elements match', 'Positive numbers are greater than 0'],
    validPatterns: [/\.every\s*\(\s*\w+\s*=>\s*\w+\s*>\s*0\s*\)/],
    tags: ['every', 'comparison', 'basics'],
  },
  {
    id: 'js-every-002',
    category: 'Array Methods',
    difficulty: 'medium',
    title: 'Check All Valid Emails',
    text: 'Use every to check if all strings contain "@".',
    setup: 'const emails = ["alice@test.com", "bob@example.org", "charlie@demo.net"];',
    setupCode: 'const emails = ["alice@test.com", "bob@example.org", "charlie@demo.net"];',
    expected: true,
    sample: 'emails.every(e => e.includes("@"))',
    hints: ['Use the includes method', 'Check for @ symbol'],
    validPatterns: [/\.every\s*\(\s*\w+\s*=>\s*\w+\.includes\s*\(\s*['"]@['"]\s*\)\s*\)/],
    tags: ['every', 'includes', 'strings'],
  },

  // ========================================
  // ARRAY METHODS - sort
  // ========================================
  {
    id: 'js-sort-001',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Sort Numbers Ascending',
    text: 'Sort the numbers in ascending order.',
    setup: 'const numbers = [5, 2, 8, 1, 9, 3];',
    setupCode: 'const numbers = [5, 2, 8, 1, 9, 3];',
    expected: [1, 2, 3, 5, 8, 9],
    sample: 'numbers.sort((a, b) => a - b)',
    hints: ['Default sort converts to strings', 'Use comparison function for numbers'],
    validPatterns: [/\.sort\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>\s*\w+\s*-\s*\w+\s*\)/],
    tags: ['sort', 'numbers', 'comparison'],
  },
  {
    id: 'js-sort-002',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Sort Numbers Descending',
    text: 'Sort the numbers in descending order.',
    setup: 'const numbers = [5, 2, 8, 1, 9, 3];',
    setupCode: 'const numbers = [5, 2, 8, 1, 9, 3];',
    expected: [9, 8, 5, 3, 2, 1],
    sample: 'numbers.sort((a, b) => b - a)',
    hints: ['Reverse the subtraction order', 'b - a gives descending'],
    validPatterns: [/\.sort\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>\s*\w+\s*-\s*\w+\s*\)/],
    tags: ['sort', 'numbers', 'descending'],
  },
  {
    id: 'js-sort-003',
    category: 'Array Methods',
    difficulty: 'medium',
    title: 'Sort by Object Property',
    text: 'Sort the users by age in ascending order.',
    setup: `const users = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 }
];`,
    setupCode: `const users = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 }
];`,
    expected: [
      { name: 'Bob', age: 25 },
      { name: 'Alice', age: 30 },
      { name: 'Charlie', age: 35 },
    ],
    sample: 'users.sort((a, b) => a.age - b.age)',
    hints: ['Access the age property', 'Subtract ages for comparison'],
    validPatterns: [/\.sort\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>\s*\w+\.age\s*-\s*\w+\.age\s*\)/],
    tags: ['sort', 'objects', 'property-access'],
  },
  {
    id: 'js-sort-004',
    category: 'Array Methods',
    difficulty: 'medium',
    title: 'Sort Strings Alphabetically',
    text: 'Sort the words alphabetically (case-insensitive).',
    setup: 'const words = ["Banana", "apple", "Cherry", "date"];',
    setupCode: 'const words = ["Banana", "apple", "Cherry", "date"];',
    expected: ['apple', 'Banana', 'Cherry', 'date'],
    sample: 'words.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))',
    hints: ['Convert to lowercase for comparison', 'Use localeCompare for strings'],
    validPatterns: [
      /\.sort\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>\s*\w+\.toLowerCase\s*\(\s*\)\.localeCompare/,
    ],
    tags: ['sort', 'strings', 'localeCompare'],
  },

  // ========================================
  // ARRAY METHODS - slice and splice
  // ========================================
  {
    id: 'js-slice-001',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Get First Three Elements',
    text: 'Use slice to get the first 3 elements.',
    setup: 'const numbers = [1, 2, 3, 4, 5, 6, 7];',
    setupCode: 'const numbers = [1, 2, 3, 4, 5, 6, 7];',
    expected: [1, 2, 3],
    sample: 'numbers.slice(0, 3)',
    hints: ['slice(start, end) - end is exclusive', 'Start at 0, end at 3'],
    validPatterns: [/\.slice\s*\(\s*0\s*,\s*3\s*\)/],
    tags: ['slice', 'basics'],
  },
  {
    id: 'js-slice-002',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Get Last Two Elements',
    text: 'Use slice to get the last 2 elements.',
    setup: 'const numbers = [1, 2, 3, 4, 5];',
    setupCode: 'const numbers = [1, 2, 3, 4, 5];',
    expected: [4, 5],
    sample: 'numbers.slice(-2)',
    hints: ['Negative index counts from end', '-2 means last 2 elements'],
    validPatterns: [/\.slice\s*\(\s*-2\s*\)/],
    tags: ['slice', 'negative-index'],
  },
  {
    id: 'js-slice-003',
    category: 'Array Methods',
    difficulty: 'medium',
    title: 'Get Middle Elements',
    text: 'Use slice to get elements from index 2 to 4 (inclusive).',
    setup: 'const letters = ["a", "b", "c", "d", "e", "f"];',
    setupCode: 'const letters = ["a", "b", "c", "d", "e", "f"];',
    expected: ['c', 'd', 'e'],
    sample: 'letters.slice(2, 5)',
    hints: ['slice end is exclusive', 'To include index 4, use 5 as end'],
    validPatterns: [/\.slice\s*\(\s*2\s*,\s*5\s*\)/],
    tags: ['slice', 'range'],
  },

  // ========================================
  // ARRAY METHODS - includes, indexOf
  // ========================================
  {
    id: 'js-includes-001',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Check Array Contains Value',
    text: 'Check if the array includes the number 5.',
    setup: 'const numbers = [1, 2, 3, 4, 5, 6];',
    setupCode: 'const numbers = [1, 2, 3, 4, 5, 6];',
    expected: true,
    sample: 'numbers.includes(5)',
    hints: ['includes returns true/false', 'Direct method call'],
    validPatterns: [/\.includes\s*\(\s*5\s*\)/],
    tags: ['includes', 'search', 'basics'],
  },
  {
    id: 'js-indexOf-001',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Find Index of Element',
    text: 'Find the index of "orange" in the array.',
    setup: 'const fruits = ["apple", "banana", "orange", "grape"];',
    setupCode: 'const fruits = ["apple", "banana", "orange", "grape"];',
    expected: 2,
    sample: 'fruits.indexOf("orange")',
    hints: ['indexOf returns the index', 'Returns -1 if not found'],
    validPatterns: [/\.indexOf\s*\(\s*['"]orange['"]\s*\)/],
    tags: ['indexOf', 'search'],
  },

  // ========================================
  // ARRAY METHODS - concat, join, reverse
  // ========================================
  {
    id: 'js-concat-001',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Combine Two Arrays',
    text: 'Use concat to combine both arrays.',
    setup: `const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];`,
    setupCode: `const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];`,
    expected: [1, 2, 3, 4, 5, 6],
    sample: 'arr1.concat(arr2)',
    hints: ['concat returns a new array', 'Does not modify original'],
    validPatterns: [/arr1\.concat\s*\(\s*arr2\s*\)/, /\[\s*\.\.\.arr1\s*,\s*\.\.\.arr2\s*\]/],
    tags: ['concat', 'combine', 'basics'],
  },
  {
    id: 'js-join-001',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Join with Separator',
    text: 'Use join to create a string separated by " - ".',
    setup: 'const words = ["Hello", "World", "JavaScript"];',
    setupCode: 'const words = ["Hello", "World", "JavaScript"];',
    expected: 'Hello - World - JavaScript',
    sample: 'words.join(" - ")',
    hints: ['join takes a separator string', 'Returns a string'],
    validPatterns: [/\.join\s*\(\s*['"]\s*-\s*['"]\s*\)/],
    tags: ['join', 'strings'],
  },
  {
    id: 'js-reverse-001',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Reverse Array',
    text: 'Reverse the array without modifying the original (use slice first).',
    setup: 'const numbers = [1, 2, 3, 4, 5];',
    setupCode: 'const numbers = [1, 2, 3, 4, 5];',
    expected: [5, 4, 3, 2, 1],
    sample: 'numbers.slice().reverse()',
    hints: ['reverse modifies the original', 'Use slice() to copy first'],
    validPatterns: [
      /\.slice\s*\(\s*\)\.reverse\s*\(\s*\)/,
      /\[\s*\.\.\.numbers\s*\]\.reverse\s*\(\s*\)/,
    ],
    tags: ['reverse', 'slice', 'immutable'],
  },

  // ========================================
  // ARRAY METHODS - flat, flatMap
  // ========================================
  {
    id: 'js-flat-001',
    category: 'Array Methods',
    difficulty: 'medium',
    title: 'Flatten Nested Array',
    text: 'Use flat to flatten the nested array.',
    setup: 'const nested = [1, [2, 3], [4, [5, 6]]];',
    setupCode: 'const nested = [1, [2, 3], [4, [5, 6]]];',
    expected: [1, 2, 3, 4, [5, 6]],
    sample: 'nested.flat()',
    hints: ['flat() flattens one level by default', 'Returns new array'],
    validPatterns: [/\.flat\s*\(\s*\)/, /\.flat\s*\(\s*1\s*\)/],
    tags: ['flat', 'nested'],
  },
  {
    id: 'js-flat-002',
    category: 'Array Methods',
    difficulty: 'medium',
    title: 'Flatten All Levels',
    text: 'Use flat to completely flatten the deeply nested array.',
    setup: 'const deep = [1, [2, [3, [4, [5]]]]];',
    setupCode: 'const deep = [1, [2, [3, [4, [5]]]]];',
    expected: [1, 2, 3, 4, 5],
    sample: 'deep.flat(Infinity)',
    hints: ['Use Infinity for complete flattening', 'Or use a large number'],
    validPatterns: [/\.flat\s*\(\s*Infinity\s*\)/, /\.flat\s*\(\s*\d+\s*\)/],
    tags: ['flat', 'deep-nested'],
  },
  {
    id: 'js-flatMap-001',
    category: 'Array Methods',
    difficulty: 'medium',
    title: 'FlatMap Example',
    text: 'Use flatMap to double each number into a pair [n, n*2].',
    setup: 'const numbers = [1, 2, 3];',
    setupCode: 'const numbers = [1, 2, 3];',
    expected: [1, 2, 2, 4, 3, 6],
    sample: 'numbers.flatMap(n => [n, n * 2])',
    hints: ['flatMap combines map and flat', 'Return an array from callback'],
    validPatterns: [/\.flatMap\s*\(\s*\w+\s*=>\s*\[\s*\w+\s*,\s*\w+\s*\*\s*2\s*\]\s*\)/],
    tags: ['flatMap', 'transform'],
  },

  // ========================================
  // STRING METHODS
  // ========================================
  {
    id: 'js-string-001',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Split String into Array',
    text: 'Split the string into an array of words.',
    setup: 'const sentence = "Hello World JavaScript";',
    setupCode: 'const sentence = "Hello World JavaScript";',
    expected: ['Hello', 'World', 'JavaScript'],
    sample: 'sentence.split(" ")',
    hints: ['split takes a separator', 'Space character separates words'],
    validPatterns: [/\.split\s*\(\s*['"] ['"]\s*\)/, /\.split\s*\(\s*\/\s+\/\s*\)/],
    tags: ['split', 'strings', 'basics'],
  },
  {
    id: 'js-string-002',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Trim Whitespace',
    text: 'Remove leading and trailing whitespace from the string.',
    setup: 'const text = "   Hello World   ";',
    setupCode: 'const text = "   Hello World   ";',
    expected: 'Hello World',
    sample: 'text.trim()',
    hints: ['trim removes whitespace from both ends', 'Does not affect middle spaces'],
    validPatterns: [/\.trim\s*\(\s*\)/],
    tags: ['trim', 'whitespace'],
  },
  {
    id: 'js-string-003',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Replace Substring',
    text: 'Replace "World" with "JavaScript" in the string.',
    setup: 'const greeting = "Hello World";',
    setupCode: 'const greeting = "Hello World";',
    expected: 'Hello JavaScript',
    sample: 'greeting.replace("World", "JavaScript")',
    hints: ['replace takes search and replacement', 'Returns new string'],
    validPatterns: [/\.replace\s*\(\s*['"]World['"]\s*,\s*['"]JavaScript['"]\s*\)/],
    tags: ['replace', 'strings'],
  },
  {
    id: 'js-string-004',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'Replace All Occurrences',
    text: 'Replace all occurrences of "a" with "o".',
    setup: 'const text = "banana";',
    setupCode: 'const text = "banana";',
    expected: 'bonono',
    sample: 'text.replaceAll("a", "o")',
    hints: ['replaceAll replaces all matches', 'Or use replace with global regex'],
    validPatterns: [
      /\.replaceAll\s*\(\s*['"]a['"]\s*,\s*['"]o['"]\s*\)/,
      /\.replace\s*\(\s*\/a\/g\s*,\s*['"]o['"]\s*\)/,
    ],
    tags: ['replaceAll', 'strings'],
  },
  {
    id: 'js-string-005',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Check String Includes',
    text: 'Check if the string includes "script".',
    setup: 'const lang = "JavaScript";',
    setupCode: 'const lang = "JavaScript";',
    expected: true,
    sample: 'lang.toLowerCase().includes("script")',
    hints: ['includes is case-sensitive', 'Convert to lowercase for case-insensitive'],
    validPatterns: [
      /\.toLowerCase\s*\(\s*\)\.includes\s*\(\s*['"]script['"]\s*\)/,
      /\.includes\s*\(\s*['"]Script['"]\s*\)/,
    ],
    tags: ['includes', 'strings'],
  },
  {
    id: 'js-string-006',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'String Starts With',
    text: 'Check if the string starts with "Hello".',
    setup: 'const greeting = "Hello World";',
    setupCode: 'const greeting = "Hello World";',
    expected: true,
    sample: 'greeting.startsWith("Hello")',
    hints: ['startsWith checks the beginning', 'Case-sensitive'],
    validPatterns: [/\.startsWith\s*\(\s*['"]Hello['"]\s*\)/],
    tags: ['startsWith', 'strings'],
  },
  {
    id: 'js-string-007',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'String Ends With',
    text: 'Check if the filename ends with ".js".',
    setup: 'const filename = "app.js";',
    setupCode: 'const filename = "app.js";',
    expected: true,
    sample: 'filename.endsWith(".js")',
    hints: ['endsWith checks the ending', 'Include the dot'],
    validPatterns: [/\.endsWith\s*\(\s*['"]\.js['"]\s*\)/],
    tags: ['endsWith', 'strings'],
  },
  {
    id: 'js-string-008',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'Pad String Start',
    text: 'Pad the number string to 5 characters with leading zeros.',
    setup: 'const num = "42";',
    setupCode: 'const num = "42";',
    expected: '00042',
    sample: 'num.padStart(5, "0")',
    hints: ['padStart adds to the beginning', 'Second argument is the fill string'],
    validPatterns: [/\.padStart\s*\(\s*5\s*,\s*['"]0['"]\s*\)/],
    tags: ['padStart', 'formatting'],
  },
  {
    id: 'js-string-009',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'Repeat String',
    text: 'Repeat the string 3 times.',
    setup: 'const star = "* ";',
    setupCode: 'const star = "* ";',
    expected: '* * * ',
    sample: 'star.repeat(3)',
    hints: ['repeat takes a count', 'Returns new string'],
    validPatterns: [/\.repeat\s*\(\s*3\s*\)/],
    tags: ['repeat', 'strings'],
  },
  {
    id: 'js-string-010',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'Get Character at Index',
    text: 'Get the character at index 4.',
    setup: 'const word = "JavaScript";',
    setupCode: 'const word = "JavaScript";',
    expected: 'S',
    sample: 'word.charAt(4)',
    hints: ['charAt returns single character', 'Index starts at 0'],
    validPatterns: [/\.charAt\s*\(\s*4\s*\)/, /word\s*\[\s*4\s*\]/],
    tags: ['charAt', 'indexing'],
  },
  {
    id: 'js-string-011',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'Extract Substring',
    text: 'Extract "World" from the string using substring.',
    setup: 'const greeting = "Hello World";',
    setupCode: 'const greeting = "Hello World";',
    expected: 'World',
    sample: 'greeting.substring(6)',
    hints: ['substring(start, end)', 'Or just start to get rest'],
    validPatterns: [
      /\.substring\s*\(\s*6\s*\)/,
      /\.substring\s*\(\s*6\s*,\s*11\s*\)/,
      /\.slice\s*\(\s*6\s*\)/,
    ],
    tags: ['substring', 'extraction'],
  },

  // ========================================
  // OBJECT METHODS
  // ========================================
  {
    id: 'js-object-001',
    category: 'Object Methods',
    difficulty: 'easy',
    title: 'Get Object Keys',
    text: 'Get an array of the object keys.',
    setup: 'const person = { name: "Alice", age: 30, city: "NYC" };',
    setupCode: 'const person = { name: "Alice", age: 30, city: "NYC" };',
    expected: ['name', 'age', 'city'],
    sample: 'Object.keys(person)',
    hints: ['Object.keys returns array of keys', 'Static method on Object'],
    validPatterns: [/Object\.keys\s*\(\s*person\s*\)/],
    tags: ['Object.keys', 'objects'],
  },
  {
    id: 'js-object-002',
    category: 'Object Methods',
    difficulty: 'easy',
    title: 'Get Object Values',
    text: 'Get an array of the object values.',
    setup: 'const person = { name: "Alice", age: 30, city: "NYC" };',
    setupCode: 'const person = { name: "Alice", age: 30, city: "NYC" };',
    expected: ['Alice', 30, 'NYC'],
    sample: 'Object.values(person)',
    hints: ['Object.values returns array of values', 'Static method on Object'],
    validPatterns: [/Object\.values\s*\(\s*person\s*\)/],
    tags: ['Object.values', 'objects'],
  },
  {
    id: 'js-object-003',
    category: 'Object Methods',
    difficulty: 'easy',
    title: 'Get Object Entries',
    text: 'Get an array of [key, value] pairs.',
    setup: 'const person = { name: "Alice", age: 30 };',
    setupCode: 'const person = { name: "Alice", age: 30 };',
    expected: [
      ['name', 'Alice'],
      ['age', 30],
    ],
    sample: 'Object.entries(person)',
    hints: ['Object.entries returns array of pairs', 'Each pair is [key, value]'],
    validPatterns: [/Object\.entries\s*\(\s*person\s*\)/],
    tags: ['Object.entries', 'objects'],
  },
  {
    id: 'js-object-004',
    category: 'Object Methods',
    difficulty: 'medium',
    title: 'Create Object from Entries',
    text: 'Convert the array of pairs back to an object.',
    setup: 'const entries = [["a", 1], ["b", 2], ["c", 3]];',
    setupCode: 'const entries = [["a", 1], ["b", 2], ["c", 3]];',
    expected: { a: 1, b: 2, c: 3 },
    sample: 'Object.fromEntries(entries)',
    hints: ['Object.fromEntries is inverse of entries', 'Takes array of pairs'],
    validPatterns: [/Object\.fromEntries\s*\(\s*entries\s*\)/],
    tags: ['Object.fromEntries', 'objects'],
  },
  {
    id: 'js-object-005',
    category: 'Object Methods',
    difficulty: 'medium',
    title: 'Merge Objects',
    text: 'Merge the two objects into one (second overwrites first).',
    setup: `const defaults = { theme: "light", fontSize: 14 };
const userPrefs = { theme: "dark" };`,
    setupCode: `const defaults = { theme: "light", fontSize: 14 };
const userPrefs = { theme: "dark" };`,
    expected: { theme: 'dark', fontSize: 14 },
    sample: '{ ...defaults, ...userPrefs }',
    hints: ['Use spread operator', 'Later values overwrite earlier'],
    validPatterns: [
      /\{\s*\.\.\.defaults\s*,\s*\.\.\.userPrefs\s*\}/,
      /Object\.assign\s*\(\s*\{\s*\}\s*,\s*defaults\s*,\s*userPrefs\s*\)/,
    ],
    tags: ['spread', 'merge', 'objects'],
  },
  {
    id: 'js-object-006',
    category: 'Object Methods',
    difficulty: 'medium',
    title: 'Check Property Exists',
    text: 'Check if the object has its own "name" property.',
    setup: 'const person = { name: "Alice", age: 30 };',
    setupCode: 'const person = { name: "Alice", age: 30 };',
    expected: true,
    sample: 'Object.hasOwn(person, "name")',
    hints: ['Object.hasOwn is the modern way', 'Or use hasOwnProperty'],
    validPatterns: [
      /Object\.hasOwn\s*\(\s*person\s*,\s*['"]name['"]\s*\)/,
      /person\.hasOwnProperty\s*\(\s*['"]name['"]\s*\)/,
      /['"]name['"]\s*in\s*person/,
    ],
    tags: ['hasOwn', 'property-check'],
  },

  // ========================================
  // SET METHODS
  // ========================================
  {
    id: 'js-set-001',
    category: 'Set Methods',
    difficulty: 'easy',
    title: 'Create Set from Array',
    text: 'Create a Set from the array to remove duplicates, then convert back to array.',
    setup: 'const numbers = [1, 2, 2, 3, 3, 3, 4];',
    setupCode: 'const numbers = [1, 2, 2, 3, 3, 3, 4];',
    expected: [1, 2, 3, 4],
    sample: '[...new Set(numbers)]',
    hints: ['Set automatically removes duplicates', 'Spread to convert back to array'],
    validPatterns: [
      /\[\s*\.\.\.new\s+Set\s*\(\s*numbers\s*\)\s*\]/,
      /Array\.from\s*\(\s*new\s+Set\s*\(\s*numbers\s*\)\s*\)/,
    ],
    tags: ['Set', 'unique', 'duplicates'],
  },
  {
    id: 'js-set-002',
    category: 'Set Methods',
    difficulty: 'medium',
    title: 'Set Intersection',
    text: 'Find common elements between two arrays using Set.',
    setup: `const arr1 = [1, 2, 3, 4, 5];
const arr2 = [4, 5, 6, 7, 8];`,
    setupCode: `const arr1 = [1, 2, 3, 4, 5];
const arr2 = [4, 5, 6, 7, 8];`,
    expected: [4, 5],
    sample: 'arr1.filter(x => new Set(arr2).has(x))',
    hints: ['Convert one array to Set', 'Filter the other by membership'],
    validPatterns: [
      /\.filter\s*\(\s*\w+\s*=>\s*new\s+Set\s*\(\s*\w+\s*\)\.has\s*\(\s*\w+\s*\)\s*\)/,
    ],
    tags: ['Set', 'intersection', 'filter'],
  },
  {
    id: 'js-set-003',
    category: 'Set Methods',
    difficulty: 'medium',
    title: 'Set Difference',
    text: 'Find elements in arr1 that are not in arr2.',
    setup: `const arr1 = [1, 2, 3, 4, 5];
const arr2 = [4, 5, 6, 7, 8];`,
    setupCode: `const arr1 = [1, 2, 3, 4, 5];
const arr2 = [4, 5, 6, 7, 8];`,
    expected: [1, 2, 3],
    sample: 'arr1.filter(x => !new Set(arr2).has(x))',
    hints: ['Use Set.has for O(1) lookup', 'Negate the condition for difference'],
    validPatterns: [
      /\.filter\s*\(\s*\w+\s*=>\s*!new\s+Set\s*\(\s*\w+\s*\)\.has\s*\(\s*\w+\s*\)\s*\)/,
    ],
    tags: ['Set', 'difference', 'filter'],
  },

  // ========================================
  // MATH OPERATIONS
  // ========================================
  {
    id: 'js-math-001',
    category: 'Math Operations',
    difficulty: 'easy',
    title: 'Find Maximum',
    text: 'Find the maximum value in the array.',
    setup: 'const numbers = [5, 2, 9, 1, 7, 3];',
    setupCode: 'const numbers = [5, 2, 9, 1, 7, 3];',
    expected: 9,
    sample: 'Math.max(...numbers)',
    hints: ['Math.max takes individual arguments', 'Use spread to expand array'],
    validPatterns: [/Math\.max\s*\(\s*\.\.\.numbers\s*\)/],
    tags: ['Math.max', 'spread'],
  },
  {
    id: 'js-math-002',
    category: 'Math Operations',
    difficulty: 'easy',
    title: 'Find Minimum',
    text: 'Find the minimum value in the array.',
    setup: 'const numbers = [5, 2, 9, 1, 7, 3];',
    setupCode: 'const numbers = [5, 2, 9, 1, 7, 3];',
    expected: 1,
    sample: 'Math.min(...numbers)',
    hints: ['Math.min finds smallest', 'Spread the array'],
    validPatterns: [/Math\.min\s*\(\s*\.\.\.numbers\s*\)/],
    tags: ['Math.min', 'spread'],
  },
  {
    id: 'js-math-003',
    category: 'Math Operations',
    difficulty: 'easy',
    title: 'Round Number',
    text: 'Round the number to the nearest integer.',
    setup: 'const num = 4.7;',
    setupCode: 'const num = 4.7;',
    expected: 5,
    sample: 'Math.round(num)',
    hints: ['Math.round rounds to nearest', '4.5 and up rounds up'],
    validPatterns: [/Math\.round\s*\(\s*num\s*\)/],
    tags: ['Math.round', 'rounding'],
  },
  {
    id: 'js-math-004',
    category: 'Math Operations',
    difficulty: 'easy',
    title: 'Floor Number',
    text: 'Round down to the nearest integer.',
    setup: 'const num = 4.9;',
    setupCode: 'const num = 4.9;',
    expected: 4,
    sample: 'Math.floor(num)',
    hints: ['Math.floor always rounds down', 'Towards negative infinity'],
    validPatterns: [/Math\.floor\s*\(\s*num\s*\)/],
    tags: ['Math.floor', 'rounding'],
  },
  {
    id: 'js-math-005',
    category: 'Math Operations',
    difficulty: 'easy',
    title: 'Ceil Number',
    text: 'Round up to the nearest integer.',
    setup: 'const num = 4.1;',
    setupCode: 'const num = 4.1;',
    expected: 5,
    sample: 'Math.ceil(num)',
    hints: ['Math.ceil always rounds up', 'Towards positive infinity'],
    validPatterns: [/Math\.ceil\s*\(\s*num\s*\)/],
    tags: ['Math.ceil', 'rounding'],
  },
  {
    id: 'js-math-006',
    category: 'Math Operations',
    difficulty: 'medium',
    title: 'Absolute Value',
    text: 'Get the absolute value of the number.',
    setup: 'const num = -42;',
    setupCode: 'const num = -42;',
    expected: 42,
    sample: 'Math.abs(num)',
    hints: ['Math.abs removes sign', 'Always returns positive'],
    validPatterns: [/Math\.abs\s*\(\s*num\s*\)/],
    tags: ['Math.abs', 'absolute'],
  },
  {
    id: 'js-math-007',
    category: 'Math Operations',
    difficulty: 'medium',
    title: 'Power Calculation',
    text: 'Calculate 2 to the power of 10.',
    setup: 'const base = 2, exponent = 10;',
    setupCode: 'const base = 2, exponent = 10;',
    expected: 1024,
    sample: 'Math.pow(base, exponent)',
    hints: ['Math.pow(base, exponent)', 'Or use ** operator'],
    validPatterns: [
      /Math\.pow\s*\(\s*base\s*,\s*exponent\s*\)/,
      /base\s*\*\*\s*exponent/,
      /2\s*\*\*\s*10/,
    ],
    tags: ['Math.pow', 'exponent'],
  },
  {
    id: 'js-math-008',
    category: 'Math Operations',
    difficulty: 'medium',
    title: 'Square Root',
    text: 'Calculate the square root of 144.',
    setup: 'const num = 144;',
    setupCode: 'const num = 144;',
    expected: 12,
    sample: 'Math.sqrt(num)',
    hints: ['Math.sqrt for square root', 'Returns the positive root'],
    validPatterns: [/Math\.sqrt\s*\(\s*num\s*\)/, /Math\.sqrt\s*\(\s*144\s*\)/],
    tags: ['Math.sqrt', 'root'],
  },

  // ========================================
  // CHAINED METHODS
  // ========================================
  {
    id: 'js-chain-001',
    category: 'Array Methods',
    difficulty: 'medium',
    title: 'Filter and Map Chain',
    text: 'Get the names of users who are 30 or older.',
    setup: `const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
  { name: "Diana", age: 28 }
];`,
    setupCode: `const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
  { name: "Diana", age: 28 }
];`,
    expected: ['Bob', 'Charlie'],
    sample: 'users.filter(u => u.age >= 30).map(u => u.name)',
    hints: ['Filter first, then map', 'Chain the methods'],
    validPatterns: [/\.filter\s*\([^)]+\)\.map\s*\([^)]+\)/],
    tags: ['filter', 'map', 'chaining'],
  },
  {
    id: 'js-chain-002',
    category: 'Array Methods',
    difficulty: 'hard',
    title: 'Complex Chain',
    text: 'Get the total price of all in-stock items, with 10% discount applied.',
    setup: `const items = [
  { name: "Laptop", price: 1000, inStock: true },
  { name: "Phone", price: 500, inStock: false },
  { name: "Tablet", price: 300, inStock: true },
  { name: "Watch", price: 200, inStock: true }
];`,
    setupCode: `const items = [
  { name: "Laptop", price: 1000, inStock: true },
  { name: "Phone", price: 500, inStock: false },
  { name: "Tablet", price: 300, inStock: true },
  { name: "Watch", price: 200, inStock: true }
];`,
    expected: 1350,
    sample: 'items.filter(i => i.inStock).map(i => i.price * 0.9).reduce((sum, p) => sum + p, 0)',
    hints: ['Filter in-stock items', 'Map to apply discount', 'Reduce to sum'],
    validPatterns: [
      /\.filter\s*\([^)]+\)\.map\s*\([^)]+\)\.reduce\s*\([^)]+\)/,
      /\.filter\s*\([^)]+\)\.reduce\s*\([^)]+\)/,
    ],
    tags: ['filter', 'map', 'reduce', 'chaining'],
  },
  {
    id: 'js-chain-003',
    category: 'Array Methods',
    difficulty: 'hard',
    title: 'Sort and Slice',
    text: 'Get the top 3 highest scores.',
    setup: 'const scores = [85, 92, 78, 96, 88, 91, 73];',
    setupCode: 'const scores = [85, 92, 78, 96, 88, 91, 73];',
    expected: [96, 92, 91],
    sample: 'scores.slice().sort((a, b) => b - a).slice(0, 3)',
    hints: ['Sort descending first', 'Slice to get top 3', 'Use slice() to avoid mutation'],
    validPatterns: [/\.sort\s*\([^)]+\)\.slice\s*\(\s*0\s*,\s*3\s*\)/],
    tags: ['sort', 'slice', 'chaining'],
  },

  // ========================================
  // ADVANCED PROBLEMS
  // ========================================
  {
    id: 'js-advanced-001',
    category: 'Array Methods',
    difficulty: 'hard',
    title: 'Partition Array',
    text: 'Partition the array into [evens, odds].',
    setup: 'const numbers = [1, 2, 3, 4, 5, 6, 7, 8];',
    setupCode: 'const numbers = [1, 2, 3, 4, 5, 6, 7, 8];',
    expected: [
      [2, 4, 6, 8],
      [1, 3, 5, 7],
    ],
    sample: '[numbers.filter(n => n % 2 === 0), numbers.filter(n => n % 2 !== 0)]',
    hints: ['Create two filtered arrays', 'Use modulo to check even/odd'],
    validPatterns: [
      /\[\s*numbers\.filter\s*\([^)]+\)\s*,\s*numbers\.filter\s*\([^)]+\)\s*\]/,
      /\.reduce\s*\([^)]+\[\s*\w+\s*%\s*2/,
    ],
    tags: ['partition', 'filter', 'advanced'],
  },
  {
    id: 'js-advanced-002',
    category: 'Array Methods',
    difficulty: 'hard',
    title: 'Zip Two Arrays',
    text: 'Combine two arrays into pairs.',
    setup: `const keys = ["a", "b", "c"];
const values = [1, 2, 3];`,
    setupCode: `const keys = ["a", "b", "c"];
const values = [1, 2, 3];`,
    expected: [
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ],
    sample: 'keys.map((k, i) => [k, values[i]])',
    hints: ['Use map with index', 'Access values by same index'],
    validPatterns: [
      /\.map\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>\s*\[\s*\w+\s*,\s*values\s*\[\s*\w+\s*\]\s*\]\s*\)/,
    ],
    tags: ['zip', 'map', 'index'],
  },
  {
    id: 'js-advanced-003',
    category: 'Array Methods',
    difficulty: 'hard',
    title: 'Running Total',
    text: 'Create an array of running totals.',
    setup: 'const numbers = [1, 2, 3, 4, 5];',
    setupCode: 'const numbers = [1, 2, 3, 4, 5];',
    expected: [1, 3, 6, 10, 15],
    sample: 'numbers.map((n, i) => numbers.slice(0, i + 1).reduce((a, b) => a + b, 0))',
    hints: ['For each position, sum all previous', 'Or use reduce to track running total'],
    validPatterns: [/\.map\s*\(/, /\.reduce\s*\(/],
    tags: ['running-total', 'reduce', 'advanced'],
  },
  {
    id: 'js-advanced-004',
    category: 'Object Methods',
    difficulty: 'hard',
    title: 'Invert Object',
    text: 'Swap keys and values in the object.',
    setup: 'const obj = { a: 1, b: 2, c: 3 };',
    setupCode: 'const obj = { a: 1, b: 2, c: 3 };',
    expected: { 1: 'a', 2: 'b', 3: 'c' },
    sample: 'Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]))',
    hints: [
      'Use Object.entries to get pairs',
      'Swap positions in each pair',
      'Use Object.fromEntries to rebuild',
    ],
    validPatterns: [/Object\.fromEntries\s*\(\s*Object\.entries\s*\([^)]+\)\.map/],
    tags: ['Object.entries', 'Object.fromEntries', 'transform'],
  },
  {
    id: 'js-advanced-005',
    category: 'Array Methods',
    difficulty: 'hard',
    title: 'Frequency Map',
    text: 'Count the frequency of each character.',
    setup: 'const str = "hello";',
    setupCode: 'const str = "hello";',
    expected: { h: 1, e: 1, l: 2, o: 1 },
    sample: 'str.split("").reduce((acc, char) => ({ ...acc, [char]: (acc[char] || 0) + 1 }), {})',
    hints: ['Split string into array', 'Use reduce to count'],
    validPatterns: [/\.split\s*\(\s*['"]{2}\s*\)\.reduce/, /\[\s*\.\.\.str\s*\]\.reduce/],
    tags: ['frequency', 'reduce', 'strings'],
  },
  {
    id: 'js-advanced-006',
    category: 'Array Methods',
    difficulty: 'medium',
    title: 'Array to Object',
    text: 'Convert the array of users to an object keyed by id.',
    setup: `const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];`,
    setupCode: `const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];`,
    expected: {
      1: { id: 1, name: 'Alice' },
      2: { id: 2, name: 'Bob' },
      3: { id: 3, name: 'Charlie' },
    },
    sample: 'Object.fromEntries(users.map(u => [u.id, u]))',
    hints: ['Map to [id, user] pairs', 'Use Object.fromEntries'],
    validPatterns: [/Object\.fromEntries\s*\(\s*users\.map/, /users\.reduce\s*\(/],
    tags: ['Object.fromEntries', 'map', 'transform'],
  },

  // ========================================
  // ARRAY METHODS - Modern ES2022+ Methods
  // ========================================
  {
    id: 'js-at-001',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Access Last Element with at()',
    text: 'Use the at() method to get the last element of the array.',
    setup: 'const colors = ["red", "green", "blue", "yellow"];',
    setupCode: 'const colors = ["red", "green", "blue", "yellow"];',
    expected: 'yellow',
    sample: 'colors.at(-1)',
    hints: ['at() accepts negative indices', '-1 refers to the last element'],
    validPatterns: [/\.at\s*\(\s*-1\s*\)/],
    tags: ['at', 'array', 'ES2022'],
  },
  {
    id: 'js-at-002',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Access Second-to-Last with at()',
    text: 'Use the at() method to get the second-to-last element.',
    setup: 'const numbers = [10, 20, 30, 40, 50];',
    setupCode: 'const numbers = [10, 20, 30, 40, 50];',
    expected: 40,
    sample: 'numbers.at(-2)',
    hints: ['Negative indices count from the end', '-2 is second from last'],
    validPatterns: [/\.at\s*\(\s*-2\s*\)/],
    tags: ['at', 'array', 'negative-index'],
  },
  {
    id: 'js-findLast-001',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Find Last Even Number',
    text: 'Use findLast to get the last even number in the array.',
    setup: 'const numbers = [1, 2, 3, 4, 5, 6, 7, 8];',
    setupCode: 'const numbers = [1, 2, 3, 4, 5, 6, 7, 8];',
    expected: 8,
    sample: 'numbers.findLast(n => n % 2 === 0)',
    hints: ['findLast searches from the end', 'Returns the last matching element'],
    validPatterns: [/\.findLast\s*\(\s*\w+\s*=>\s*\w+\s*%\s*2\s*===?\s*0\s*\)/],
    tags: ['findLast', 'array', 'ES2023'],
  },
  {
    id: 'js-findLast-002',
    category: 'Array Methods',
    difficulty: 'medium',
    title: 'Find Last User by Role',
    text: 'Use findLast to get the last user with role "admin".',
    setup: `const users = [
  { name: "Alice", role: "admin" },
  { name: "Bob", role: "user" },
  { name: "Charlie", role: "admin" },
  { name: "Diana", role: "user" }
];`,
    setupCode: `const users = [
  { name: "Alice", role: "admin" },
  { name: "Bob", role: "user" },
  { name: "Charlie", role: "admin" },
  { name: "Diana", role: "user" }
];`,
    expected: { name: 'Charlie', role: 'admin' },
    sample: 'users.findLast(u => u.role === "admin")',
    hints: ['findLast returns the element, not index', 'Compare role property'],
    validPatterns: [/\.findLast\s*\(\s*\w+\s*=>\s*\w+\.role\s*===?\s*['"]admin['"]\s*\)/],
    tags: ['findLast', 'objects', 'ES2023'],
  },
  {
    id: 'js-findLastIndex-001',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Find Last Index of Negative',
    text: 'Use findLastIndex to get the index of the last negative number.',
    setup: 'const numbers = [5, -3, 8, -2, 1, -7, 4];',
    setupCode: 'const numbers = [5, -3, 8, -2, 1, -7, 4];',
    expected: 5,
    sample: 'numbers.findLastIndex(n => n < 0)',
    hints: ['findLastIndex returns the index', 'Searches from end of array'],
    validPatterns: [/\.findLastIndex\s*\(\s*\w+\s*=>\s*\w+\s*<\s*0\s*\)/],
    tags: ['findLastIndex', 'array', 'ES2023'],
  },
  {
    id: 'js-toSorted-001',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Sort Without Mutation',
    text: 'Use toSorted to sort the array without modifying the original.',
    setup: 'const numbers = [5, 2, 8, 1, 9];',
    setupCode: 'const numbers = [5, 2, 8, 1, 9];',
    expected: [1, 2, 5, 8, 9],
    sample: 'numbers.toSorted((a, b) => a - b)',
    hints: ['toSorted returns a new sorted array', 'Original array remains unchanged'],
    validPatterns: [/\.toSorted\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>\s*\w+\s*-\s*\w+\s*\)/],
    tags: ['toSorted', 'immutable', 'ES2023'],
  },
  {
    id: 'js-toSorted-002',
    category: 'Array Methods',
    difficulty: 'medium',
    title: 'toSorted with Objects',
    text: 'Use toSorted to sort users by name alphabetically without mutation.',
    setup: `const users = [
  { name: "Charlie", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 35 }
];`,
    setupCode: `const users = [
  { name: "Charlie", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 35 }
];`,
    expected: [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 },
      { name: 'Charlie', age: 30 },
    ],
    sample: 'users.toSorted((a, b) => a.name.localeCompare(b.name))',
    hints: ['Use localeCompare for string sorting', 'toSorted does not modify original'],
    validPatterns: [/\.toSorted\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>\s*\w+\.name\.localeCompare/],
    tags: ['toSorted', 'objects', 'localeCompare'],
  },
  {
    id: 'js-toReversed-001',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Reverse Without Mutation',
    text: 'Use toReversed to reverse the array without modifying the original.',
    setup: 'const letters = ["a", "b", "c", "d", "e"];',
    setupCode: 'const letters = ["a", "b", "c", "d", "e"];',
    expected: ['e', 'd', 'c', 'b', 'a'],
    sample: 'letters.toReversed()',
    hints: ['toReversed returns a new reversed array', 'Original stays unchanged'],
    validPatterns: [/\.toReversed\s*\(\s*\)/],
    tags: ['toReversed', 'immutable', 'ES2023'],
  },
  {
    id: 'js-flatMap-002',
    category: 'Array Methods',
    difficulty: 'medium',
    title: 'FlatMap to Split Words',
    text: 'Use flatMap to split each sentence into individual words.',
    setup: 'const sentences = ["Hello World", "JavaScript is awesome"];',
    setupCode: 'const sentences = ["Hello World", "JavaScript is awesome"];',
    expected: ['Hello', 'World', 'JavaScript', 'is', 'awesome'],
    sample: 'sentences.flatMap(s => s.split(" "))',
    hints: ['flatMap combines map and flat(1)', 'Split each sentence by space'],
    validPatterns: [/\.flatMap\s*\(\s*\w+\s*=>\s*\w+\.split\s*\(\s*['"] ['"]\s*\)\s*\)/],
    tags: ['flatMap', 'split', 'transform'],
  },
  {
    id: 'js-flatMap-003',
    category: 'Array Methods',
    difficulty: 'hard',
    title: 'FlatMap with Filter Effect',
    text: 'Use flatMap to double even numbers and remove odd numbers.',
    setup: 'const numbers = [1, 2, 3, 4, 5, 6];',
    setupCode: 'const numbers = [1, 2, 3, 4, 5, 6];',
    expected: [4, 8, 12],
    sample: 'numbers.flatMap(n => n % 2 === 0 ? [n * 2] : [])',
    hints: ['Return empty array to filter out', 'Return array with value to keep'],
    validPatterns: [/\.flatMap\s*\(\s*\w+\s*=>\s*\w+\s*%\s*2\s*===?\s*0\s*\?\s*\[/],
    tags: ['flatMap', 'filter', 'conditional'],
  },

  // ========================================
  // STRING METHODS - Modern
  // ========================================
  {
    id: 'js-string-at-001',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'String at() Method',
    text: 'Use at() to get the last character of the string.',
    setup: 'const word = "JavaScript";',
    setupCode: 'const word = "JavaScript";',
    expected: 't',
    sample: 'word.at(-1)',
    hints: ['at() works on strings too', 'Negative index counts from end'],
    validPatterns: [/\.at\s*\(\s*-1\s*\)/],
    tags: ['at', 'string', 'ES2022'],
  },
  {
    id: 'js-string-padEnd-001',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Pad String End',
    text: 'Pad the string to 10 characters with dots at the end.',
    setup: 'const text = "Hello";',
    setupCode: 'const text = "Hello";',
    expected: 'Hello.....',
    sample: 'text.padEnd(10, ".")',
    hints: ['padEnd adds characters to the end', 'First arg is target length'],
    validPatterns: [/\.padEnd\s*\(\s*10\s*,\s*['"]\.['"]s*\)/],
    tags: ['padEnd', 'formatting', 'strings'],
  },
  {
    id: 'js-string-normalize-001',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'Normalize Unicode String',
    text: 'Normalize the string to NFC form and get its length.',
    setup: 'const text = "cafe\\u0301";',
    setupCode: 'const text = "cafe\\u0301";',
    expected: 4,
    sample: 'text.normalize("NFC").length',
    hints: ['normalize() handles Unicode normalization', 'NFC combines characters'],
    validPatterns: [/\.normalize\s*\(\s*['"]NFC['"]\s*\)\.length/],
    tags: ['normalize', 'unicode', 'strings'],
  },
  {
    id: 'js-string-repeat-002',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'Create Pattern with Repeat',
    text: 'Create a border pattern by repeating "-=" 10 times.',
    setup: 'const unit = "-=";',
    setupCode: 'const unit = "-=";',
    expected: '-=-=-=-=-=-=-=-=-=-=',
    sample: 'unit.repeat(10)',
    hints: ['repeat() duplicates the string', 'Returns new string'],
    validPatterns: [/\.repeat\s*\(\s*10\s*\)/],
    tags: ['repeat', 'pattern', 'strings'],
  },

  // ========================================
  // OBJECT METHODS - Modern
  // ========================================
  {
    id: 'js-object-groupBy-001',
    category: 'Object Methods',
    difficulty: 'medium',
    title: 'Group Array by Property',
    text: 'Use Object.groupBy to group products by their category.',
    setup: `const products = [
  { name: "Apple", category: "fruit" },
  { name: "Carrot", category: "vegetable" },
  { name: "Banana", category: "fruit" },
  { name: "Broccoli", category: "vegetable" }
];`,
    setupCode: `const products = [
  { name: "Apple", category: "fruit" },
  { name: "Carrot", category: "vegetable" },
  { name: "Banana", category: "fruit" },
  { name: "Broccoli", category: "vegetable" }
];`,
    expected: {
      fruit: [
        { name: 'Apple', category: 'fruit' },
        { name: 'Banana', category: 'fruit' },
      ],
      vegetable: [
        { name: 'Carrot', category: 'vegetable' },
        { name: 'Broccoli', category: 'vegetable' },
      ],
    },
    sample: 'Object.groupBy(products, p => p.category)',
    hints: ['Object.groupBy is ES2024', 'Returns object with grouped arrays'],
    validPatterns: [/Object\.groupBy\s*\(\s*products\s*,\s*\w+\s*=>\s*\w+\.category\s*\)/],
    tags: ['Object.groupBy', 'grouping', 'ES2024'],
  },
  {
    id: 'js-object-groupBy-002',
    category: 'Object Methods',
    difficulty: 'hard',
    title: 'Group Numbers by Range',
    text: 'Use Object.groupBy to group numbers into "small" (< 10), "medium" (10-50), and "large" (> 50).',
    setup: 'const numbers = [5, 15, 3, 42, 8, 67, 23, 99, 2];',
    setupCode: 'const numbers = [5, 15, 3, 42, 8, 67, 23, 99, 2];',
    expected: {
      small: [5, 3, 8, 2],
      medium: [15, 42, 23],
      large: [67, 99],
    },
    sample: 'Object.groupBy(numbers, n => n < 10 ? "small" : n <= 50 ? "medium" : "large")',
    hints: ['Use ternary operators for ranges', 'Return the group name string'],
    validPatterns: [/Object\.groupBy\s*\(\s*numbers\s*,/],
    tags: ['Object.groupBy', 'conditional', 'ranges'],
  },
  {
    id: 'js-object-fromEntries-002',
    category: 'Object Methods',
    difficulty: 'medium',
    title: 'Transform Object Values',
    text: 'Double all values in the object using entries, map, and fromEntries.',
    setup: 'const prices = { apple: 1, banana: 2, orange: 3 };',
    setupCode: 'const prices = { apple: 1, banana: 2, orange: 3 };',
    expected: { apple: 2, banana: 4, orange: 6 },
    sample: 'Object.fromEntries(Object.entries(prices).map(([k, v]) => [k, v * 2]))',
    hints: ['entries gives [key, value] pairs', 'map to transform values', 'fromEntries rebuilds object'],
    validPatterns: [/Object\.fromEntries\s*\(\s*Object\.entries\s*\(\s*prices\s*\)\.map/],
    tags: ['Object.fromEntries', 'Object.entries', 'transform'],
  },

  // ========================================
  // SET METHODS - ES2025
  // ========================================
  {
    id: 'js-set-union-001',
    category: 'Set Methods',
    difficulty: 'medium',
    title: 'Set Union',
    text: 'Use the Set union() method to combine two sets.',
    setup: `const set1 = new Set([1, 2, 3]);
const set2 = new Set([3, 4, 5]);`,
    setupCode: `const set1 = new Set([1, 2, 3]);
const set2 = new Set([3, 4, 5]);`,
    expected: [1, 2, 3, 4, 5],
    sample: '[...set1.union(set2)]',
    hints: ['union() combines both sets', 'Duplicates are automatically removed'],
    validPatterns: [/set1\.union\s*\(\s*set2\s*\)/, /\[\s*\.\.\.set1\.union/],
    tags: ['Set', 'union', 'ES2025'],
  },
  {
    id: 'js-set-intersection-001',
    category: 'Set Methods',
    difficulty: 'medium',
    title: 'Set Intersection',
    text: 'Use the Set intersection() method to find common elements.',
    setup: `const set1 = new Set([1, 2, 3, 4]);
const set2 = new Set([3, 4, 5, 6]);`,
    setupCode: `const set1 = new Set([1, 2, 3, 4]);
const set2 = new Set([3, 4, 5, 6]);`,
    expected: [3, 4],
    sample: '[...set1.intersection(set2)]',
    hints: ['intersection() finds common elements', 'Returns a new Set'],
    validPatterns: [/set1\.intersection\s*\(\s*set2\s*\)/, /\[\s*\.\.\.set1\.intersection/],
    tags: ['Set', 'intersection', 'ES2025'],
  },
  {
    id: 'js-set-difference-001',
    category: 'Set Methods',
    difficulty: 'medium',
    title: 'Set Difference',
    text: 'Use the Set difference() method to find elements only in the first set.',
    setup: `const set1 = new Set([1, 2, 3, 4]);
const set2 = new Set([3, 4, 5, 6]);`,
    setupCode: `const set1 = new Set([1, 2, 3, 4]);
const set2 = new Set([3, 4, 5, 6]);`,
    expected: [1, 2],
    sample: '[...set1.difference(set2)]',
    hints: ['difference() removes elements found in second set', 'Order matters for difference'],
    validPatterns: [/set1\.difference\s*\(\s*set2\s*\)/, /\[\s*\.\.\.set1\.difference/],
    tags: ['Set', 'difference', 'ES2025'],
  },

  // ========================================
  // PROMISE METHODS
  // ========================================
  {
    id: 'js-promise-allSettled-001',
    category: 'Promise Methods',
    difficulty: 'hard',
    title: 'Handle Multiple Promises with allSettled',
    text: 'Use Promise.allSettled to get results of all promises regardless of rejection.',
    setup: `const promises = [
  Promise.resolve(1),
  Promise.reject("error"),
  Promise.resolve(3)
];`,
    setupCode: `const promises = [
  Promise.resolve(1),
  Promise.reject("error"),
  Promise.resolve(3)
];`,
    expected: [
      { status: 'fulfilled', value: 1 },
      { status: 'rejected', reason: 'error' },
      { status: 'fulfilled', value: 3 },
    ],
    sample: 'await Promise.allSettled(promises)',
    hints: ['allSettled never rejects', 'Returns status and value/reason for each'],
    validPatterns: [/Promise\.allSettled\s*\(\s*promises\s*\)/],
    tags: ['Promise.allSettled', 'async', 'error-handling'],
  },
  {
    id: 'js-promise-any-001',
    category: 'Promise Methods',
    difficulty: 'hard',
    title: 'Get First Successful Promise',
    text: 'Use Promise.any to get the first successfully resolved promise.',
    setup: `const promises = [
  new Promise((_, reject) => setTimeout(() => reject("fail1"), 100)),
  new Promise(resolve => setTimeout(() => resolve("success"), 50)),
  new Promise((_, reject) => setTimeout(() => reject("fail2"), 75))
];`,
    setupCode: `const promises = [
  new Promise((_, reject) => setTimeout(() => reject("fail1"), 100)),
  new Promise(resolve => setTimeout(() => resolve("success"), 50)),
  new Promise((_, reject) => setTimeout(() => reject("fail2"), 75))
];`,
    expected: 'success',
    sample: 'await Promise.any(promises)',
    hints: ['any() returns first fulfilled promise', 'Ignores rejections until all fail'],
    validPatterns: [/Promise\.any\s*\(\s*promises\s*\)/],
    tags: ['Promise.any', 'async', 'racing'],
  },
  {
    id: 'js-promise-race-001',
    category: 'Promise Methods',
    difficulty: 'medium',
    title: 'Race Promises for First Result',
    text: 'Use Promise.race to get the result of the fastest promise.',
    setup: `const fast = new Promise(resolve => setTimeout(() => resolve("fast"), 50));
const slow = new Promise(resolve => setTimeout(() => resolve("slow"), 100));
const promises = [fast, slow];`,
    setupCode: `const fast = new Promise(resolve => setTimeout(() => resolve("fast"), 50));
const slow = new Promise(resolve => setTimeout(() => resolve("slow"), 100));
const promises = [fast, slow];`,
    expected: 'fast',
    sample: 'await Promise.race(promises)',
    hints: ['race() returns first settled promise', 'Can be fulfilled or rejected'],
    validPatterns: [/Promise\.race\s*\(\s*promises\s*\)/],
    tags: ['Promise.race', 'async', 'performance'],
  },
  {
    id: 'js-promise-race-002',
    category: 'Promise Methods',
    difficulty: 'hard',
    title: 'Timeout with Promise.race',
    text: 'Use Promise.race to implement a timeout that rejects if operation takes too long.',
    setup: `const operation = new Promise(resolve => setTimeout(() => resolve("done"), 200));
const timeout = new Promise((_, reject) => setTimeout(() => reject("timeout"), 100));
const promises = [operation, timeout];`,
    setupCode: `const operation = new Promise(resolve => setTimeout(() => resolve("done"), 200));
const timeout = new Promise((_, reject) => setTimeout(() => reject("timeout"), 100));
const promises = [operation, timeout];`,
    expected: 'timeout',
    sample: 'await Promise.race(promises).catch(e => e)',
    hints: ['race settles with first promise', 'timeout rejects faster than operation'],
    validPatterns: [/Promise\.race\s*\(\s*promises\s*\)/],
    tags: ['Promise.race', 'timeout', 'error-handling'],
  },

  // ========================================
  // ADVANCED ARRAY MANIPULATION
  // ========================================
  {
    id: 'js-arr-adv-001',
    category: 'Advanced Array Manipulation',
    difficulty: 'easy',
    title: 'Filter and Map Chain',
    text: 'Filter the numbers to get only positive values, then double each one using method chaining.',
    setup: 'const numbers = [-3, 1, -7, 4, 5, -2, 8];',
    setupCode: 'const numbers = [-3, 1, -7, 4, 5, -2, 8];',
    expected: [2, 8, 10, 16],
    sample: 'numbers.filter(n => n > 0).map(n => n * 2)',
    hints: ['Chain filter() before map()', 'Filter for positive numbers first'],
    validPatterns: [
      /\.filter\s*\([^)]+\)\s*\.map\s*\([^)]+\)/,
    ],
    tags: ['filter', 'map', 'chaining', 'array-methods'],
  },
  {
    id: 'js-arr-adv-002',
    category: 'Advanced Array Manipulation',
    difficulty: 'easy',
    title: 'Extract and Transform with Destructuring',
    text: 'Use map with destructuring to extract only the names from the users array.',
    setup: `const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 }
];`,
    setupCode: `const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 }
];`,
    expected: ['Alice', 'Bob', 'Charlie'],
    sample: 'users.map(({ name }) => name)',
    hints: ['Use destructuring in the callback parameter', 'Extract just the name property'],
    validPatterns: [
      /\.map\s*\(\s*\{\s*name\s*\}\s*=>\s*name\s*\)/,
      /\.map\s*\(\s*\(\s*\{\s*name\s*\}\s*\)\s*=>\s*name\s*\)/,
    ],
    tags: ['map', 'destructuring', 'objects', 'array-methods'],
  },
  {
    id: 'js-arr-adv-003',
    category: 'Advanced Array Manipulation',
    difficulty: 'easy',
    title: 'Flatten Nested Array One Level',
    text: 'Flatten the nested array by one level using the flat() method.',
    setup: 'const nested = [[1, 2], [3, 4], [5, [6, 7]]];',
    setupCode: 'const nested = [[1, 2], [3, 4], [5, [6, 7]]];',
    expected: [1, 2, 3, 4, 5, [6, 7]],
    sample: 'nested.flat()',
    hints: ['flat() with no argument flattens one level', 'Default depth is 1'],
    validPatterns: [
      /\.flat\s*\(\s*\)/,
      /\.flat\s*\(\s*1\s*\)/,
    ],
    tags: ['flat', 'nested-arrays', 'flattening'],
  },
  {
    id: 'js-arr-adv-004',
    category: 'Advanced Array Manipulation',
    difficulty: 'easy',
    title: 'Sum Array with Reduce',
    text: 'Use reduce to calculate the sum of all numbers in the array.',
    setup: 'const numbers = [10, 20, 30, 40, 50];',
    setupCode: 'const numbers = [10, 20, 30, 40, 50];',
    expected: 150,
    sample: 'numbers.reduce((sum, n) => sum + n, 0)',
    hints: ['reduce takes an accumulator and current value', 'Start with initial value of 0'],
    validPatterns: [
      /\.reduce\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>\s*\w+\s*\+\s*\w+\s*,\s*0\s*\)/,
    ],
    tags: ['reduce', 'sum', 'accumulator', 'basics'],
  },
  {
    id: 'js-arr-adv-005',
    category: 'Advanced Array Manipulation',
    difficulty: 'easy',
    title: 'Sort Strings Alphabetically with localeCompare',
    text: 'Sort the array of names alphabetically using localeCompare for proper string comparison.',
    setup: 'const names = ["Zoe", "alice", "Bob", "charlie"];',
    setupCode: 'const names = ["Zoe", "alice", "Bob", "charlie"];',
    expected: ['alice', 'Bob', 'charlie', 'Zoe'],
    sample: 'names.sort((a, b) => a.localeCompare(b))',
    hints: ['localeCompare handles case-insensitive sorting', 'Returns -1, 0, or 1'],
    validPatterns: [
      /\.sort\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>\s*\w+\.localeCompare\s*\(\s*\w+\s*\)\s*\)/,
    ],
    tags: ['sort', 'localeCompare', 'strings', 'alphabetical'],
  },
  {
    id: 'js-arr-adv-006',
    category: 'Advanced Array Manipulation',
    difficulty: 'easy',
    title: 'Find Duplicates in Array',
    text: 'Find all duplicate values in the array (values that appear more than once).',
    setup: 'const numbers = [1, 2, 3, 2, 4, 3, 5, 1];',
    setupCode: 'const numbers = [1, 2, 3, 2, 4, 3, 5, 1];',
    expected: [2, 3, 1],
    sample: 'numbers.filter((n, i) => numbers.indexOf(n) !== i && numbers.lastIndexOf(n) === i)',
    hints: ['Compare indexOf with current index', 'Use lastIndexOf to avoid duplicates in result'],
    validPatterns: [
      /\.filter\s*\([^)]*indexOf[^)]*\)/,
    ],
    tags: ['filter', 'indexOf', 'duplicates', 'array-methods'],
  },
  {
    id: 'js-arr-adv-007',
    category: 'Advanced Array Manipulation',
    difficulty: 'easy',
    title: 'Deep Flatten Array',
    text: 'Completely flatten the deeply nested array using flat() with Infinity.',
    setup: 'const deep = [1, [2, [3, [4, [5]]]]];',
    setupCode: 'const deep = [1, [2, [3, [4, [5]]]]];',
    expected: [1, 2, 3, 4, 5],
    sample: 'deep.flat(Infinity)',
    hints: ['Use Infinity as the depth argument', 'flat(Infinity) flattens all levels'],
    validPatterns: [
      /\.flat\s*\(\s*Infinity\s*\)/,
    ],
    tags: ['flat', 'nested-arrays', 'infinity', 'deep-flatten'],
  },
  {
    id: 'js-arr-adv-008',
    category: 'Advanced Array Manipulation',
    difficulty: 'easy',
    title: 'Filter Map Reduce Chain',
    text: 'Filter products in stock, get their prices, then sum the total value.',
    setup: `const products = [
  { name: "A", price: 10, inStock: true },
  { name: "B", price: 20, inStock: false },
  { name: "C", price: 30, inStock: true },
  { name: "D", price: 40, inStock: true }
];`,
    setupCode: `const products = [
  { name: "A", price: 10, inStock: true },
  { name: "B", price: 20, inStock: false },
  { name: "C", price: 30, inStock: true },
  { name: "D", price: 40, inStock: true }
];`,
    expected: 80,
    sample: 'products.filter(p => p.inStock).map(p => p.price).reduce((sum, p) => sum + p, 0)',
    hints: ['Chain filter -> map -> reduce', 'Filter for inStock first, then extract prices'],
    validPatterns: [
      /\.filter\s*\([^)]+\)\s*\.map\s*\([^)]+\)\s*\.reduce\s*\([^)]+\)/,
    ],
    tags: ['filter', 'map', 'reduce', 'chaining', 'method-chaining'],
  },
  {
    id: 'js-arr-adv-009',
    category: 'Advanced Array Manipulation',
    difficulty: 'medium',
    title: 'Group Array by Property',
    text: 'Group the people array by their department using reduce.',
    setup: `const people = [
  { name: "Alice", department: "Engineering" },
  { name: "Bob", department: "Sales" },
  { name: "Charlie", department: "Engineering" },
  { name: "Diana", department: "Sales" },
  { name: "Eve", department: "Marketing" }
];`,
    setupCode: `const people = [
  { name: "Alice", department: "Engineering" },
  { name: "Bob", department: "Sales" },
  { name: "Charlie", department: "Engineering" },
  { name: "Diana", department: "Sales" },
  { name: "Eve", department: "Marketing" }
];`,
    expected: {
      Engineering: [
        { name: 'Alice', department: 'Engineering' },
        { name: 'Charlie', department: 'Engineering' },
      ],
      Sales: [
        { name: 'Bob', department: 'Sales' },
        { name: 'Diana', department: 'Sales' },
      ],
      Marketing: [{ name: 'Eve', department: 'Marketing' }],
    },
    sample: `people.reduce((groups, person) => {
  const dept = person.department;
  groups[dept] = groups[dept] || [];
  groups[dept].push(person);
  return groups;
}, {})`,
    hints: [
      'Use reduce with an object as accumulator',
      'Create array for each department if it does not exist',
    ],
    validPatterns: [
      /\.reduce\s*\([^)]*department[^)]*\{[^}]*\}\s*\)/,
    ],
    tags: ['reduce', 'grouping', 'objects', 'accumulator'],
  },
  {
    id: 'js-arr-adv-010',
    category: 'Advanced Array Manipulation',
    difficulty: 'medium',
    title: 'Chunk Array into Groups',
    text: 'Split the array into chunks of size 3.',
    setup: 'const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];',
    setupCode: 'const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];',
    expected: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]],
    sample: `numbers.reduce((chunks, item, index) => {
  const chunkIndex = Math.floor(index / 3);
  chunks[chunkIndex] = chunks[chunkIndex] || [];
  chunks[chunkIndex].push(item);
  return chunks;
}, [])`,
    hints: [
      'Use Math.floor(index / chunkSize) to determine chunk index',
      'Use reduce to build the chunked array',
    ],
    validPatterns: [
      /\.reduce\s*\([^)]*Math\.floor[^)]*\)/,
      /Array\.from\s*\([^)]*slice[^)]*\)/,
    ],
    tags: ['reduce', 'chunking', 'windowing', 'array-transformation'],
  },
  {
    id: 'js-arr-adv-011',
    category: 'Advanced Array Manipulation',
    difficulty: 'medium',
    title: 'Transform to Object with Reduce',
    text: 'Convert the array of pairs into an object using reduce.',
    setup: `const pairs = [["name", "Alice"], ["age", 30], ["city", "NYC"]];`,
    setupCode: `const pairs = [["name", "Alice"], ["age", 30], ["city", "NYC"]];`,
    expected: { name: 'Alice', age: 30, city: 'NYC' },
    sample: 'pairs.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})',
    hints: [
      'Use destructuring in the callback to get key and value',
      'Use computed property names [key]',
    ],
    validPatterns: [
      /\.reduce\s*\(\s*\(\s*\w+\s*,\s*\[\s*\w+\s*,\s*\w+\s*\]\s*\)/,
    ],
    tags: ['reduce', 'destructuring', 'object-creation', 'computed-properties'],
  },
  {
    id: 'js-arr-adv-012',
    category: 'Advanced Array Manipulation',
    difficulty: 'medium',
    title: 'Sliding Window Average',
    text: 'Calculate the sliding window average with window size 3 (average of each consecutive 3 elements).',
    setup: 'const numbers = [1, 2, 3, 4, 5, 6, 7];',
    setupCode: 'const numbers = [1, 2, 3, 4, 5, 6, 7];',
    expected: [2, 3, 4, 5, 6],
    sample: `numbers.slice(0, -2).map((_, i) =>
  (numbers[i] + numbers[i + 1] + numbers[i + 2]) / 3
)`,
    hints: [
      'Window size 3 means you stop at length - 2',
      'For each position, average current and next 2 elements',
    ],
    validPatterns: [
      /\.map\s*\([^)]*\+[^)]*\+[^)]*\/\s*3/,
      /\.slice\s*\([^)]*\)\s*\.map/,
    ],
    tags: ['map', 'slice', 'windowing', 'sliding-window', 'average'],
  },
  {
    id: 'js-arr-adv-013',
    category: 'Advanced Array Manipulation',
    difficulty: 'medium',
    title: 'Sort Objects by Multiple Properties',
    text: 'Sort users first by age (ascending), then by name (alphabetically) for same ages.',
    setup: `const users = [
  { name: "Charlie", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Diana", age: 25 }
];`,
    setupCode: `const users = [
  { name: "Charlie", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Diana", age: 25 }
];`,
    expected: [
      { name: 'Alice', age: 25 },
      { name: 'Diana', age: 25 },
      { name: 'Bob', age: 30 },
      { name: 'Charlie', age: 30 },
    ],
    sample: 'users.sort((a, b) => a.age - b.age || a.name.localeCompare(b.name))',
    hints: [
      'Use || to chain sort conditions',
      'First compare by age, then by name if ages are equal',
    ],
    validPatterns: [
      /\.sort\s*\([^)]*age[^)]*\|\|[^)]*localeCompare[^)]*\)/,
      /\.sort\s*\([^)]*age[^)]*name[^)]*\)/,
    ],
    tags: ['sort', 'localeCompare', 'multiple-sort', 'objects'],
  },
  {
    id: 'js-arr-adv-014',
    category: 'Advanced Array Manipulation',
    difficulty: 'medium',
    title: 'FlatMap for Transformation',
    text: 'Use flatMap to duplicate each number and flatten the result.',
    setup: 'const numbers = [1, 2, 3, 4];',
    setupCode: 'const numbers = [1, 2, 3, 4];',
    expected: [1, 1, 2, 2, 3, 3, 4, 4],
    sample: 'numbers.flatMap(n => [n, n])',
    hints: ['flatMap combines map and flat(1)', 'Return an array from the callback'],
    validPatterns: [
      /\.flatMap\s*\(\s*\w+\s*=>\s*\[\s*\w+\s*,\s*\w+\s*\]\s*\)/,
    ],
    tags: ['flatMap', 'flat', 'map', 'transformation'],
  },
  {
    id: 'js-arr-adv-015',
    category: 'Advanced Array Manipulation',
    difficulty: 'medium',
    title: 'Count Occurrences with Reduce',
    text: 'Count the occurrences of each fruit in the array using reduce.',
    setup: 'const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];',
    setupCode: 'const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];',
    expected: { apple: 3, banana: 2, orange: 1 },
    sample: `fruits.reduce((counts, fruit) => {
  counts[fruit] = (counts[fruit] || 0) + 1;
  return counts;
}, {})`,
    hints: [
      'Use an object as the accumulator',
      'Initialize count to 0 if fruit not seen before',
    ],
    validPatterns: [
      /\.reduce\s*\([^)]*\|\|\s*0[^)]*\+\s*1/,
    ],
    tags: ['reduce', 'counting', 'frequency', 'objects'],
  },
  {
    id: 'js-arr-adv-016',
    category: 'Advanced Array Manipulation',
    difficulty: 'medium',
    title: 'Find Unique Combinations',
    text: 'Find all unique pairs of numbers that sum to 10.',
    setup: 'const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];',
    setupCode: 'const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];',
    expected: [[1, 9], [2, 8], [3, 7], [4, 6]],
    sample: `numbers
  .filter((n, i) => numbers.slice(i + 1).includes(10 - n))
  .map(n => [n, 10 - n])`,
    hints: [
      'For each number, check if its complement (10 - n) exists',
      'Only check numbers after current to avoid duplicates',
    ],
    validPatterns: [
      /\.filter\s*\([^)]*10\s*-\s*\w+[^)]*\)/,
      /\.flatMap\s*\([^)]*10\s*-/,
    ],
    tags: ['filter', 'map', 'combinations', 'pairs', 'sum'],
  },
  {
    id: 'js-arr-adv-017',
    category: 'Advanced Array Manipulation',
    difficulty: 'medium',
    title: 'Nested Destructuring in Map',
    text: 'Extract the city from nested address objects using map with nested destructuring.',
    setup: `const users = [
  { name: "Alice", address: { city: "NYC", zip: "10001" } },
  { name: "Bob", address: { city: "LA", zip: "90001" } },
  { name: "Charlie", address: { city: "Chicago", zip: "60601" } }
];`,
    setupCode: `const users = [
  { name: "Alice", address: { city: "NYC", zip: "10001" } },
  { name: "Bob", address: { city: "LA", zip: "90001" } },
  { name: "Charlie", address: { city: "Chicago", zip: "60601" } }
];`,
    expected: ['NYC', 'LA', 'Chicago'],
    sample: 'users.map(({ address: { city } }) => city)',
    hints: [
      'Use nested destructuring pattern',
      'Destructure address first, then city from address',
    ],
    validPatterns: [
      /\.map\s*\(\s*\{\s*address\s*:\s*\{\s*city\s*\}\s*\}\s*=>\s*city\s*\)/,
      /\.map\s*\(\s*\(\s*\{\s*address\s*:\s*\{\s*city\s*\}\s*\}\s*\)\s*=>\s*city\s*\)/,
    ],
    tags: ['map', 'destructuring', 'nested', 'objects'],
  },
  {
    id: 'js-arr-adv-018',
    category: 'Advanced Array Manipulation',
    difficulty: 'medium',
    title: 'Partition Array',
    text: 'Partition the numbers into two arrays: even and odd numbers using reduce.',
    setup: 'const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];',
    setupCode: 'const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];',
    expected: [[2, 4, 6, 8, 10], [1, 3, 5, 7, 9]],
    sample: `numbers.reduce(
  ([evens, odds], n) => n % 2 === 0
    ? [[...evens, n], odds]
    : [evens, [...odds, n]],
  [[], []]
)`,
    hints: [
      'Use reduce with an array of two arrays as accumulator',
      'Destructure the accumulator into evens and odds',
    ],
    validPatterns: [
      /\.reduce\s*\(\s*\(\s*\[\s*\w+\s*,\s*\w+\s*\]\s*,\s*\w+\s*\)/,
    ],
    tags: ['reduce', 'partition', 'destructuring', 'arrays'],
  },
  {
    id: 'js-arr-adv-019',
    category: 'Advanced Array Manipulation',
    difficulty: 'medium',
    title: 'Zip Two Arrays',
    text: 'Combine two arrays into an array of pairs using map.',
    setup: `const names = ["Alice", "Bob", "Charlie"];
const ages = [25, 30, 35];`,
    setupCode: `const names = ["Alice", "Bob", "Charlie"];
const ages = [25, 30, 35];`,
    expected: [
      ['Alice', 25],
      ['Bob', 30],
      ['Charlie', 35],
    ],
    sample: 'names.map((name, i) => [name, ages[i]])',
    hints: ['Use the index parameter in map', 'Access the corresponding element from ages'],
    validPatterns: [
      /\.map\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>\s*\[\s*\w+\s*,\s*\w+\s*\[\s*\w+\s*\]\s*\]\s*\)/,
    ],
    tags: ['map', 'zip', 'pairs', 'index'],
  },
  {
    id: 'js-arr-adv-020',
    category: 'Advanced Array Manipulation',
    difficulty: 'medium',
    title: 'Running Total with Reduce',
    text: 'Calculate the running total (cumulative sum) of the numbers.',
    setup: 'const numbers = [1, 2, 3, 4, 5];',
    setupCode: 'const numbers = [1, 2, 3, 4, 5];',
    expected: [1, 3, 6, 10, 15],
    sample: 'numbers.reduce((acc, n) => [...acc, (acc[acc.length - 1] || 0) + n], [])',
    hints: [
      'Build an array as the accumulator',
      'Each new element is sum of last element plus current',
    ],
    validPatterns: [
      /\.reduce\s*\([^)]*acc\[acc\.length\s*-\s*1\][^)]*\)/,
      /\.map\s*\([^)]*slice\s*\([^)]*reduce/,
    ],
    tags: ['reduce', 'running-total', 'cumulative', 'accumulator'],
  },
  {
    id: 'js-arr-adv-021',
    category: 'Advanced Array Manipulation',
    difficulty: 'hard',
    title: 'Group and Aggregate',
    text: 'Group orders by customer and calculate total spent per customer.',
    setup: `const orders = [
  { customer: "Alice", amount: 50 },
  { customer: "Bob", amount: 30 },
  { customer: "Alice", amount: 25 },
  { customer: "Charlie", amount: 100 },
  { customer: "Bob", amount: 45 }
];`,
    setupCode: `const orders = [
  { customer: "Alice", amount: 50 },
  { customer: "Bob", amount: 30 },
  { customer: "Alice", amount: 25 },
  { customer: "Charlie", amount: 100 },
  { customer: "Bob", amount: 45 }
];`,
    expected: { Alice: 75, Bob: 75, Charlie: 100 },
    sample: `orders.reduce((totals, { customer, amount }) => ({
  ...totals,
  [customer]: (totals[customer] || 0) + amount
}), {})`,
    hints: [
      'Use reduce with object accumulator',
      'Destructure customer and amount in callback',
      'Add to existing total or start from 0',
    ],
    validPatterns: [
      /\.reduce\s*\([^)]*customer[^)]*amount[^)]*\)/,
    ],
    tags: ['reduce', 'grouping', 'aggregation', 'destructuring'],
  },
  {
    id: 'js-arr-adv-022',
    category: 'Advanced Array Manipulation',
    difficulty: 'hard',
    title: 'Complex Pipeline Transformation',
    text: 'Filter active users, group by role, and count users per role.',
    setup: `const users = [
  { name: "Alice", role: "admin", active: true },
  { name: "Bob", role: "user", active: false },
  { name: "Charlie", role: "admin", active: true },
  { name: "Diana", role: "user", active: true },
  { name: "Eve", role: "moderator", active: true },
  { name: "Frank", role: "user", active: true }
];`,
    setupCode: `const users = [
  { name: "Alice", role: "admin", active: true },
  { name: "Bob", role: "user", active: false },
  { name: "Charlie", role: "admin", active: true },
  { name: "Diana", role: "user", active: true },
  { name: "Eve", role: "moderator", active: true },
  { name: "Frank", role: "user", active: true }
];`,
    expected: { admin: 2, user: 2, moderator: 1 },
    sample: `users
  .filter(u => u.active)
  .reduce((counts, { role }) => ({
    ...counts,
    [role]: (counts[role] || 0) + 1
  }), {})`,
    hints: [
      'First filter for active users',
      'Then reduce to count by role',
      'Use destructuring to extract role',
    ],
    validPatterns: [
      /\.filter\s*\([^)]+\)\s*\.reduce\s*\([^)]*role[^)]*\)/,
    ],
    tags: ['filter', 'reduce', 'grouping', 'counting', 'pipeline'],
  },
  {
    id: 'js-arr-adv-023',
    category: 'Advanced Array Manipulation',
    difficulty: 'hard',
    title: 'Intersection of Multiple Arrays',
    text: 'Find elements that exist in all three arrays.',
    setup: `const arr1 = [1, 2, 3, 4, 5];
const arr2 = [2, 3, 4, 5, 6];
const arr3 = [3, 4, 5, 6, 7];
const arrays = [arr1, arr2, arr3];`,
    setupCode: `const arr1 = [1, 2, 3, 4, 5];
const arr2 = [2, 3, 4, 5, 6];
const arr3 = [3, 4, 5, 6, 7];
const arrays = [arr1, arr2, arr3];`,
    expected: [3, 4, 5],
    sample: 'arrays.reduce((common, arr) => common.filter(x => arr.includes(x)))',
    hints: [
      'Use reduce to progressively filter common elements',
      'Start with first array and filter against subsequent arrays',
    ],
    validPatterns: [
      /\.reduce\s*\([^)]*\.filter\s*\([^)]*\.includes\s*\([^)]*\)\s*\)/,
    ],
    tags: ['reduce', 'filter', 'includes', 'intersection', 'sets'],
  },
  {
    id: 'js-arr-adv-024',
    category: 'Advanced Array Manipulation',
    difficulty: 'hard',
    title: 'Transpose 2D Array',
    text: 'Transpose the matrix (swap rows and columns).',
    setup: `const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];`,
    setupCode: `const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];`,
    expected: [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ],
    sample: 'matrix[0].map((_, colIdx) => matrix.map(row => row[colIdx]))',
    hints: [
      'Map over column indices',
      'For each column, collect elements from each row',
    ],
    validPatterns: [
      /\.map\s*\([^)]*colIdx[^)]*\)\s*=>\s*\w+\.map\s*\([^)]*\[\s*colIdx\s*\]/,
      /\.map\s*\(\s*\(\s*_\s*,\s*\w+\s*\)\s*=>[^)]*\.map/,
    ],
    tags: ['map', 'matrix', 'transpose', '2d-array'],
  },
  {
    id: 'js-arr-adv-025',
    category: 'Advanced Array Manipulation',
    difficulty: 'hard',
    title: 'Complex Sort with Null Handling',
    text: 'Sort products by price (ascending), with null prices at the end, then by name.',
    setup: `const products = [
  { name: "Banana", price: null },
  { name: "Apple", price: 1.5 },
  { name: "Cherry", price: 3.0 },
  { name: "Date", price: null },
  { name: "Elderberry", price: 1.5 }
];`,
    setupCode: `const products = [
  { name: "Banana", price: null },
  { name: "Apple", price: 1.5 },
  { name: "Cherry", price: 3.0 },
  { name: "Date", price: null },
  { name: "Elderberry", price: 1.5 }
];`,
    expected: [
      { name: 'Apple', price: 1.5 },
      { name: 'Elderberry', price: 1.5 },
      { name: 'Cherry', price: 3.0 },
      { name: 'Banana', price: null },
      { name: 'Date', price: null },
    ],
    sample: `products.sort((a, b) => {
  if (a.price === null && b.price === null) return a.name.localeCompare(b.name);
  if (a.price === null) return 1;
  if (b.price === null) return -1;
  return a.price - b.price || a.name.localeCompare(b.name);
})`,
    hints: [
      'Handle null cases first',
      'Return 1 to push null to end',
      'Chain price comparison with name comparison',
    ],
    validPatterns: [
      /\.sort\s*\([^)]*null[^)]*\)/,
      /\.sort\s*\([^)]*===\s*null[^)]*localeCompare/,
    ],
    tags: ['sort', 'null-handling', 'localeCompare', 'complex-sort'],
  },

  // ========================================
  // MAP AND SET OPERATIONS
  // ========================================
  {
    id: 'js-map-set-001',
    category: 'Map and Set',
    difficulty: 'easy',
    title: 'Create and Populate a Map',
    text: 'Create a Map from the given key-value pairs and retrieve the value for "apple".',
    setup: `const entries = [["apple", 3], ["banana", 5], ["orange", 2]];`,
    setupCode: `const entries = [["apple", 3], ["banana", 5], ["orange", 2]];`,
    expected: 3,
    sample: 'new Map(entries).get("apple")',
    hints: ['Map constructor accepts an array of [key, value] pairs', 'Use get() to retrieve values'],
    validPatterns: [
      /new\s+Map\s*\(\s*entries\s*\)\.get\s*\(\s*['"]apple['"]\s*\)/,
    ],
    tags: ['Map', 'get', 'constructor', 'basics'],
  },
  {
    id: 'js-map-set-002',
    category: 'Map and Set',
    difficulty: 'easy',
    title: 'Check Map Key Existence',
    text: 'Check if the Map has the key "grape".',
    setup: `const fruitMap = new Map([["apple", 3], ["banana", 5], ["orange", 2]]);`,
    setupCode: `const fruitMap = new Map([["apple", 3], ["banana", 5], ["orange", 2]]);`,
    expected: false,
    sample: 'fruitMap.has("grape")',
    hints: ['has() returns a boolean', 'Returns true if key exists, false otherwise'],
    validPatterns: [
      /fruitMap\.has\s*\(\s*['"]grape['"]\s*\)/,
    ],
    tags: ['Map', 'has', 'existence-check', 'basics'],
  },
  {
    id: 'js-map-set-003',
    category: 'Map and Set',
    difficulty: 'easy',
    title: 'Get Map Size',
    text: 'Get the number of entries in the Map.',
    setup: `const colors = new Map([["red", "#FF0000"], ["green", "#00FF00"], ["blue", "#0000FF"]]);`,
    setupCode: `const colors = new Map([["red", "#FF0000"], ["green", "#00FF00"], ["blue", "#0000FF"]]);`,
    expected: 3,
    sample: 'colors.size',
    hints: ['Use the size property, not length', 'size is a property, not a method'],
    validPatterns: [
      /colors\.size/,
    ],
    tags: ['Map', 'size', 'property', 'basics'],
  },
  {
    id: 'js-map-set-004',
    category: 'Map and Set',
    difficulty: 'easy',
    title: 'Create Set for Deduplication',
    text: 'Remove duplicates from the array using a Set and convert back to an array.',
    setup: `const numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5];`,
    setupCode: `const numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5];`,
    expected: [1, 2, 3, 4, 5],
    sample: '[...new Set(numbers)]',
    hints: ['Set automatically removes duplicates', 'Use spread operator to convert Set to array'],
    validPatterns: [
      /\[\s*\.\.\.new\s+Set\s*\(\s*numbers\s*\)\s*\]/,
      /Array\.from\s*\(\s*new\s+Set\s*\(\s*numbers\s*\)\s*\)/,
    ],
    tags: ['Set', 'deduplication', 'spread', 'basics'],
  },
  {
    id: 'js-map-set-005',
    category: 'Map and Set',
    difficulty: 'easy',
    title: 'Set Add and Check',
    text: 'Add "mango" to the set and check if it exists.',
    setup: `const fruits = new Set(["apple", "banana", "orange"]);`,
    setupCode: `const fruits = new Set(["apple", "banana", "orange"]);`,
    expected: true,
    sample: 'fruits.add("mango").has("mango")',
    hints: ['add() returns the Set itself (chainable)', 'has() checks for existence'],
    validPatterns: [
      /fruits\.add\s*\(\s*['"]mango['"]\s*\)\.has\s*\(\s*['"]mango['"]\s*\)/,
      /fruits\.add\s*\(\s*['"]mango['"]\s*\)\s*[,;]?\s*fruits\.has\s*\(\s*['"]mango['"]\s*\)/,
    ],
    tags: ['Set', 'add', 'has', 'chaining'],
  },
  {
    id: 'js-map-set-006',
    category: 'Map and Set',
    difficulty: 'easy',
    title: 'Delete from Set',
    text: 'Delete "banana" from the set and return the result of the delete operation.',
    setup: `const fruits = new Set(["apple", "banana", "orange"]);`,
    setupCode: `const fruits = new Set(["apple", "banana", "orange"]);`,
    expected: true,
    sample: 'fruits.delete("banana")',
    hints: ['delete() returns true if element was present', 'Returns false if element was not in Set'],
    validPatterns: [
      /fruits\.delete\s*\(\s*['"]banana['"]\s*\)/,
    ],
    tags: ['Set', 'delete', 'mutation', 'basics'],
  },
  {
    id: 'js-map-set-007',
    category: 'Map and Set',
    difficulty: 'easy',
    title: 'Convert Map to Array of Entries',
    text: 'Convert the Map to an array of [key, value] pairs.',
    setup: `const userAges = new Map([["Alice", 25], ["Bob", 30], ["Charlie", 35]]);`,
    setupCode: `const userAges = new Map([["Alice", 25], ["Bob", 30], ["Charlie", 35]]);`,
    expected: [['Alice', 25], ['Bob', 30], ['Charlie', 35]],
    sample: '[...userAges.entries()]',
    hints: ['entries() returns an iterator of [key, value] pairs', 'Spread or Array.from to convert to array'],
    validPatterns: [
      /\[\s*\.\.\.userAges\.entries\s*\(\s*\)\s*\]/,
      /\[\s*\.\.\.userAges\s*\]/,
      /Array\.from\s*\(\s*userAges\.entries\s*\(\s*\)\s*\)/,
      /Array\.from\s*\(\s*userAges\s*\)/,
    ],
    tags: ['Map', 'entries', 'array-conversion', 'iterator'],
  },
  {
    id: 'js-map-set-008',
    category: 'Map and Set',
    difficulty: 'easy',
    title: 'Get Map Keys as Array',
    text: 'Get all keys from the Map as an array.',
    setup: `const inventory = new Map([["apples", 50], ["bananas", 30], ["oranges", 45]]);`,
    setupCode: `const inventory = new Map([["apples", 50], ["bananas", 30], ["oranges", 45]]);`,
    expected: ['apples', 'bananas', 'oranges'],
    sample: '[...inventory.keys()]',
    hints: ['keys() returns an iterator', 'Use spread or Array.from to convert'],
    validPatterns: [
      /\[\s*\.\.\.inventory\.keys\s*\(\s*\)\s*\]/,
      /Array\.from\s*\(\s*inventory\.keys\s*\(\s*\)\s*\)/,
    ],
    tags: ['Map', 'keys', 'array-conversion', 'iterator'],
  },
  {
    id: 'js-map-set-009',
    category: 'Map and Set',
    difficulty: 'medium',
    title: 'Map forEach Iteration',
    text: 'Use forEach to sum all values in the Map.',
    setup: `const scores = new Map([["Alice", 85], ["Bob", 92], ["Charlie", 78]]);
let total = 0;`,
    setupCode: `const scores = new Map([["Alice", 85], ["Bob", 92], ["Charlie", 78]]);
let total = 0;`,
    expected: 255,
    sample: 'scores.forEach(value => total += value); total',
    hints: ['forEach callback receives (value, key, map)', 'Accumulate values into total variable'],
    validPatterns: [
      /scores\.forEach\s*\(\s*\(?value\)?\s*=>\s*total\s*\+=\s*value\s*\)/,
      /scores\.forEach\s*\(\s*\(\s*\w+\s*\)\s*=>\s*\{\s*total\s*\+=\s*\w+/,
    ],
    tags: ['Map', 'forEach', 'iteration', 'accumulator'],
  },
  {
    id: 'js-map-set-010',
    category: 'Map and Set',
    difficulty: 'medium',
    title: 'Object to Map Conversion',
    text: 'Convert the object to a Map.',
    setup: `const person = { name: "Alice", age: 30, city: "NYC" };`,
    setupCode: `const person = { name: "Alice", age: 30, city: "NYC" };`,
    expected: 'Map(3) {"name" => "Alice", "age" => 30, "city" => "NYC"}',
    sample: 'new Map(Object.entries(person))',
    hints: ['Object.entries returns [key, value] pairs', 'Map constructor accepts arrays of pairs'],
    validPatterns: [
      /new\s+Map\s*\(\s*Object\.entries\s*\(\s*person\s*\)\s*\)/,
    ],
    tags: ['Map', 'Object.entries', 'conversion', 'interop'],
  },
  {
    id: 'js-map-set-011',
    category: 'Map and Set',
    difficulty: 'medium',
    title: 'Map to Object Conversion',
    text: 'Convert the Map to a plain object.',
    setup: `const userMap = new Map([["name", "Bob"], ["age", 25], ["role", "admin"]]);`,
    setupCode: `const userMap = new Map([["name", "Bob"], ["age", 25], ["role", "admin"]]);`,
    expected: { name: 'Bob', age: 25, role: 'admin' },
    sample: 'Object.fromEntries(userMap)',
    hints: ['Object.fromEntries accepts iterables of [key, value] pairs', 'Map is iterable as [key, value] pairs'],
    validPatterns: [
      /Object\.fromEntries\s*\(\s*userMap\s*\)/,
      /Object\.fromEntries\s*\(\s*userMap\.entries\s*\(\s*\)\s*\)/,
    ],
    tags: ['Map', 'Object.fromEntries', 'conversion', 'interop'],
  },
  {
    id: 'js-map-set-012',
    category: 'Map and Set',
    difficulty: 'medium',
    title: 'Map as Cache Pattern',
    text: 'Use the Map as a cache: return cached value if exists, otherwise compute, store, and return.',
    setup: `const cache = new Map();
const key = "result";
const computeValue = () => 42;`,
    setupCode: `const cache = new Map();
const key = "result";
const computeValue = () => 42;`,
    expected: 42,
    sample: 'cache.has(key) ? cache.get(key) : cache.set(key, computeValue()).get(key)',
    hints: ['Check with has() before getting', 'set() returns the Map, allowing chaining with get()'],
    validPatterns: [
      /cache\.has\s*\(\s*key\s*\)\s*\?\s*cache\.get\s*\(\s*key\s*\)\s*:\s*cache\.set/,
      /cache\.get\s*\(\s*key\s*\)\s*\?\?\s*cache\.set\s*\([^)]+\)\.get\s*\(\s*key\s*\)/,
    ],
    tags: ['Map', 'cache', 'memoization', 'pattern'],
  },
  {
    id: 'js-map-set-013',
    category: 'Map and Set',
    difficulty: 'medium',
    title: 'Set Iteration with for...of',
    text: 'Iterate over the Set and create an array of uppercase strings.',
    setup: `const words = new Set(["hello", "world", "javascript"]);`,
    setupCode: `const words = new Set(["hello", "world", "javascript"]);`,
    expected: ['HELLO', 'WORLD', 'JAVASCRIPT'],
    sample: '[...words].map(w => w.toUpperCase())',
    hints: ['Convert Set to array first', 'Then use map for transformation'],
    validPatterns: [
      /\[\s*\.\.\.words\s*\]\.map\s*\(\s*\w+\s*=>\s*\w+\.toUpperCase\s*\(\s*\)\s*\)/,
      /Array\.from\s*\(\s*words\s*,\s*\w+\s*=>\s*\w+\.toUpperCase\s*\(\s*\)\s*\)/,
    ],
    tags: ['Set', 'iteration', 'map', 'transformation'],
  },
  {
    id: 'js-map-set-014',
    category: 'Map and Set',
    difficulty: 'medium',
    title: 'Count Unique Values',
    text: 'Count how many unique characters are in the string.',
    setup: `const str = "abracadabra";`,
    setupCode: `const str = "abracadabra";`,
    expected: 5,
    sample: 'new Set(str).size',
    hints: ['Strings are iterable', 'Set constructor accepts any iterable'],
    validPatterns: [
      /new\s+Set\s*\(\s*str\s*\)\.size/,
      /new\s+Set\s*\(\s*str\.split\s*\(\s*['"]{2}\s*\)\s*\)\.size/,
    ],
    tags: ['Set', 'size', 'unique', 'strings'],
  },
  {
    id: 'js-map-set-015',
    category: 'Map and Set',
    difficulty: 'medium',
    title: 'Map vs Object - Non-String Keys',
    text: 'Create a Map with object keys and retrieve a value using an object key.',
    setup: `const user1 = { id: 1 };
const user2 = { id: 2 };
const userScores = new Map([[user1, 100], [user2, 200]]);`,
    setupCode: `const user1 = { id: 1 };
const user2 = { id: 2 };
const userScores = new Map([[user1, 100], [user2, 200]]);`,
    expected: 100,
    sample: 'userScores.get(user1)',
    hints: ['Maps can use any value as keys', 'Object references work as Map keys'],
    validPatterns: [
      /userScores\.get\s*\(\s*user1\s*\)/,
    ],
    tags: ['Map', 'object-keys', 'reference', 'comparison'],
  },
  {
    id: 'js-map-set-016',
    category: 'Map and Set',
    difficulty: 'medium',
    title: 'Set Union with Spread',
    text: 'Create a union of two Sets (combine all unique elements).',
    setup: `const set1 = new Set([1, 2, 3, 4]);
const set2 = new Set([3, 4, 5, 6]);`,
    setupCode: `const set1 = new Set([1, 2, 3, 4]);
const set2 = new Set([3, 4, 5, 6]);`,
    expected: [1, 2, 3, 4, 5, 6],
    sample: '[...new Set([...set1, ...set2])]',
    hints: ['Spread both Sets into an array', 'Create new Set to remove duplicates'],
    validPatterns: [
      /\[\s*\.\.\.new\s+Set\s*\(\s*\[\s*\.\.\.set1\s*,\s*\.\.\.set2\s*\]\s*\)\s*\]/,
    ],
    tags: ['Set', 'union', 'spread', 'combination'],
  },
  {
    id: 'js-map-set-017',
    category: 'Map and Set',
    difficulty: 'medium',
    title: 'Set Intersection',
    text: 'Find elements that exist in both Sets.',
    setup: `const setA = new Set([1, 2, 3, 4, 5]);
const setB = new Set([4, 5, 6, 7, 8]);`,
    setupCode: `const setA = new Set([1, 2, 3, 4, 5]);
const setB = new Set([4, 5, 6, 7, 8]);`,
    expected: [4, 5],
    sample: '[...setA].filter(x => setB.has(x))',
    hints: ['Convert one Set to array', 'Filter elements that exist in other Set'],
    validPatterns: [
      /\[\s*\.\.\.setA\s*\]\.filter\s*\(\s*\w+\s*=>\s*setB\.has\s*\(\s*\w+\s*\)\s*\)/,
    ],
    tags: ['Set', 'intersection', 'filter', 'has'],
  },
  {
    id: 'js-map-set-018',
    category: 'Map and Set',
    difficulty: 'medium',
    title: 'Map Transformation with Array Methods',
    text: 'Double all values in the Map and return as a new Map.',
    setup: `const numbers = new Map([["a", 1], ["b", 2], ["c", 3]]);`,
    setupCode: `const numbers = new Map([["a", 1], ["b", 2], ["c", 3]]);`,
    expected: 'Map(3) {"a" => 2, "b" => 4, "c" => 6}',
    sample: 'new Map([...numbers].map(([k, v]) => [k, v * 2]))',
    hints: ['Spread Map to array of entries', 'Map over entries and transform values', 'Create new Map from result'],
    validPatterns: [
      /new\s+Map\s*\(\s*\[\s*\.\.\.numbers\s*\]\.map\s*\(\s*\[\s*\w+\s*,\s*\w+\s*\]\s*=>\s*\[\s*\w+\s*,\s*\w+\s*\*\s*2\s*\]\s*\)\s*\)/,
    ],
    tags: ['Map', 'transformation', 'array-methods', 'spread'],
  },
  {
    id: 'js-map-set-019',
    category: 'Map and Set',
    difficulty: 'medium',
    title: 'WeakMap for Private Data',
    text: 'Store private data using WeakMap. Get the private name for the user object.',
    setup: `const privateData = new WeakMap();
const user = { id: 1 };
privateData.set(user, { name: "Secret Alice" });`,
    setupCode: `const privateData = new WeakMap();
const user = { id: 1 };
privateData.set(user, { name: "Secret Alice" });`,
    expected: 'Secret Alice',
    sample: 'privateData.get(user).name',
    hints: ['WeakMap uses object references as keys', 'get() retrieves the stored value'],
    validPatterns: [
      /privateData\.get\s*\(\s*user\s*\)\.name/,
    ],
    tags: ['WeakMap', 'private-data', 'encapsulation', 'pattern'],
  },
  {
    id: 'js-map-set-020',
    category: 'Map and Set',
    difficulty: 'medium',
    title: 'Filter Map Entries',
    text: 'Filter the Map to only include entries where value is greater than 50.',
    setup: `const scores = new Map([["Alice", 85], ["Bob", 42], ["Charlie", 91], ["Diana", 38]]);`,
    setupCode: `const scores = new Map([["Alice", 85], ["Bob", 42], ["Charlie", 91], ["Diana", 38]]);`,
    expected: 'Map(2) {"Alice" => 85, "Charlie" => 91}',
    sample: 'new Map([...scores].filter(([k, v]) => v > 50))',
    hints: ['Convert Map to array of entries', 'Filter entries by value', 'Create new Map from filtered entries'],
    validPatterns: [
      /new\s+Map\s*\(\s*\[\s*\.\.\.scores\s*\]\.filter\s*\(\s*\[\s*\w+\s*,\s*\w+\s*\]\s*=>\s*\w+\s*>\s*50\s*\)\s*\)/,
    ],
    tags: ['Map', 'filter', 'destructuring', 'transformation'],
  },
  {
    id: 'js-map-set-021',
    category: 'Map and Set',
    difficulty: 'hard',
    title: 'Group Array into Map',
    text: 'Group the items array by category into a Map.',
    setup: `const items = [
  { name: "Apple", category: "fruit" },
  { name: "Carrot", category: "vegetable" },
  { name: "Banana", category: "fruit" },
  { name: "Broccoli", category: "vegetable" },
  { name: "Cherry", category: "fruit" }
];`,
    setupCode: `const items = [
  { name: "Apple", category: "fruit" },
  { name: "Carrot", category: "vegetable" },
  { name: "Banana", category: "fruit" },
  { name: "Broccoli", category: "vegetable" },
  { name: "Cherry", category: "fruit" }
];`,
    expected: 'Map(2) {"fruit" => [...3 items], "vegetable" => [...2 items]}',
    sample: `items.reduce((map, item) => {
  const group = map.get(item.category) || [];
  group.push(item);
  return map.set(item.category, group);
}, new Map())`,
    hints: ['Use reduce with Map as accumulator', 'Get existing group or create empty array', 'set() returns the Map for chaining'],
    validPatterns: [
      /\.reduce\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>[^)]*\.set\s*\([^)]+\)\s*,\s*new\s+Map\s*\(\s*\)\s*\)/,
    ],
    tags: ['Map', 'reduce', 'grouping', 'accumulator'],
  },
  {
    id: 'js-map-set-022',
    category: 'Map and Set',
    difficulty: 'hard',
    title: 'Memoization with Map',
    text: 'Create a memoized factorial function using Map as cache. Calculate factorial of 5.',
    setup: `const cache = new Map();
const factorial = n => {
  if (n <= 1) return 1;
  if (cache.has(n)) return cache.get(n);
  const result = n * factorial(n - 1);
  cache.set(n, result);
  return result;
};`,
    setupCode: `const cache = new Map();
const factorial = n => {
  if (n <= 1) return 1;
  if (cache.has(n)) return cache.get(n);
  const result = n * factorial(n - 1);
  cache.set(n, result);
  return result;
};`,
    expected: 120,
    sample: 'factorial(5)',
    hints: ['Call the memoized function', 'Cache stores computed results'],
    validPatterns: [
      /factorial\s*\(\s*5\s*\)/,
    ],
    tags: ['Map', 'memoization', 'cache', 'recursion'],
  },
  {
    id: 'js-map-set-023',
    category: 'Map and Set',
    difficulty: 'hard',
    title: 'WeakSet for Visited Tracking',
    text: 'Check if the user object has been visited. Mark as visited and check again.',
    setup: `const visited = new WeakSet();
const user = { id: 1, name: "Alice" };`,
    setupCode: `const visited = new WeakSet();
const user = { id: 1, name: "Alice" };`,
    expected: [false, true],
    sample: '[visited.has(user), (visited.add(user), visited.has(user))]',
    hints: ['WeakSet tracks object references', 'add() returns the WeakSet', 'Check before and after adding'],
    validPatterns: [
      /\[\s*visited\.has\s*\(\s*user\s*\)\s*,\s*\(\s*visited\.add\s*\(\s*user\s*\)\s*,\s*visited\.has\s*\(\s*user\s*\)\s*\)\s*\]/,
    ],
    tags: ['WeakSet', 'tracking', 'has', 'add'],
  },
  {
    id: 'js-map-set-024',
    category: 'Map and Set',
    difficulty: 'hard',
    title: 'Merge Multiple Maps',
    text: 'Merge three Maps into one, with later Maps overwriting earlier values for duplicate keys.',
    setup: `const map1 = new Map([["a", 1], ["b", 2]]);
const map2 = new Map([["b", 3], ["c", 4]]);
const map3 = new Map([["c", 5], ["d", 6]]);`,
    setupCode: `const map1 = new Map([["a", 1], ["b", 2]]);
const map2 = new Map([["b", 3], ["c", 4]]);
const map3 = new Map([["c", 5], ["d", 6]]);`,
    expected: 'Map(4) {"a" => 1, "b" => 3, "c" => 5, "d" => 6}',
    sample: 'new Map([...map1, ...map2, ...map3])',
    hints: ['Spread all Maps into a single array', 'Later entries overwrite earlier ones', 'Map constructor deduplicates by key'],
    validPatterns: [
      /new\s+Map\s*\(\s*\[\s*\.\.\.map1\s*,\s*\.\.\.map2\s*,\s*\.\.\.map3\s*\]\s*\)/,
    ],
    tags: ['Map', 'merge', 'spread', 'overwrite'],
  },
  {
    id: 'js-map-set-025',
    category: 'Map and Set',
    difficulty: 'hard',
    title: 'Symmetric Difference of Sets',
    text: 'Find elements that are in either Set but not in both (symmetric difference).',
    setup: `const setX = new Set([1, 2, 3, 4, 5]);
const setY = new Set([4, 5, 6, 7, 8]);`,
    setupCode: `const setX = new Set([1, 2, 3, 4, 5]);
const setY = new Set([4, 5, 6, 7, 8]);`,
    expected: [1, 2, 3, 6, 7, 8],
    sample: '[...new Set([...[...setX].filter(x => !setY.has(x)), ...[...setY].filter(x => !setX.has(x))])]',
    hints: ['Find elements in X not in Y', 'Find elements in Y not in X', 'Combine both results'],
    validPatterns: [
      /\[\s*\.\.\.\[\s*\.\.\.setX\s*\]\.filter[^]]*\.\.\.\[\s*\.\.\.setY\s*\]\.filter/,
      /filter\s*\(\s*\w+\s*=>\s*!set[XY]\.has\s*\(\s*\w+\s*\)\s*\)/,
    ],
    tags: ['Set', 'symmetric-difference', 'filter', 'has'],
  },

  // ========================================
  // STRING MANIPULATION - Advanced
  // ========================================
  {
    id: 'js-str-001',
    category: 'String Manipulation',
    difficulty: 'easy',
    title: 'Template Literal Basics',
    text: 'Use a template literal to create a greeting message combining name and age.',
    setup: `const name = "Alice";
const age = 25;`,
    setupCode: `const name = "Alice";
const age = 25;`,
    expected: 'Hello, Alice! You are 25 years old.',
    sample: '`Hello, ${name}! You are ${age} years old.`',
    hints: ['Use backticks for template literals', 'Use ${} for interpolation'],
    validPatterns: [/`.*\$\{name\}.*\$\{age\}.*`/, /`.*\$\{age\}.*\$\{name\}.*`/],
    tags: ['template-literal', 'interpolation', 'basics'],
  },
  {
    id: 'js-str-002',
    category: 'String Manipulation',
    difficulty: 'easy',
    title: 'Multi-line Template Literal',
    text: 'Create a multi-line string using template literals.',
    setup: `const title = "Report";
const date = "2024-01-15";`,
    setupCode: `const title = "Report";
const date = "2024-01-15";`,
    expected: `Title: Report
Date: 2024-01-15`,
    sample: '`Title: ${title}\\nDate: ${date}`',
    hints: ['Template literals preserve newlines', 'Or use \\n for explicit newlines'],
    validPatterns: [/`.*\$\{title\}[\s\S]*\$\{date\}.*`/],
    tags: ['template-literal', 'multiline', 'basics'],
  },
  {
    id: 'js-str-003',
    category: 'String Manipulation',
    difficulty: 'easy',
    title: 'String padStart',
    text: 'Pad the number string to 5 characters with leading zeros.',
    setup: 'const num = "42";',
    setupCode: 'const num = "42";',
    expected: '00042',
    sample: 'num.padStart(5, "0")',
    hints: ['padStart adds padding to the beginning', 'First arg is target length'],
    validPatterns: [/\.padStart\s*\(\s*5\s*,\s*['"]0['"]\s*\)/],
    tags: ['padStart', 'formatting', 'basics'],
  },
  {
    id: 'js-str-004',
    category: 'String Manipulation',
    difficulty: 'easy',
    title: 'String padEnd',
    text: 'Pad the text to 10 characters with dots at the end.',
    setup: 'const label = "Price";',
    setupCode: 'const label = "Price";',
    expected: 'Price.....',
    sample: 'label.padEnd(10, ".")',
    hints: ['padEnd adds padding to the end', 'Creates fixed-width output'],
    validPatterns: [/\.padEnd\s*\(\s*10\s*,\s*['"]\.?['"]\s*\)/],
    tags: ['padEnd', 'formatting', 'basics'],
  },
  {
    id: 'js-str-005',
    category: 'String Manipulation',
    difficulty: 'easy',
    title: 'trimStart and trimEnd',
    text: 'Remove only the leading whitespace from the string.',
    setup: 'const text = "   Hello World   ";',
    setupCode: 'const text = "   Hello World   ";',
    expected: 'Hello World   ',
    sample: 'text.trimStart()',
    hints: ['trimStart removes leading whitespace only', 'trimEnd removes trailing only'],
    validPatterns: [/\.trimStart\s*\(\s*\)/, /\.trimLeft\s*\(\s*\)/],
    tags: ['trimStart', 'whitespace', 'basics'],
  },
  {
    id: 'js-str-006',
    category: 'String Manipulation',
    difficulty: 'easy',
    title: 'URL Encoding',
    text: 'Encode the URL parameter for safe transmission.',
    setup: 'const param = "hello world & more";',
    setupCode: 'const param = "hello world & more";',
    expected: 'hello%20world%20%26%20more',
    sample: 'encodeURIComponent(param)',
    hints: ['encodeURIComponent encodes special characters', 'Safe for URL query parameters'],
    validPatterns: [/encodeURIComponent\s*\(\s*param\s*\)/],
    tags: ['url-encoding', 'encodeURIComponent', 'basics'],
  },
  {
    id: 'js-str-007',
    category: 'String Manipulation',
    difficulty: 'easy',
    title: 'URL Decoding',
    text: 'Decode the URL-encoded string back to readable text.',
    setup: 'const encoded = "hello%20world%20%26%20more";',
    setupCode: 'const encoded = "hello%20world%20%26%20more";',
    expected: 'hello world & more',
    sample: 'decodeURIComponent(encoded)',
    hints: ['decodeURIComponent reverses encoding', 'Converts %20 back to spaces'],
    validPatterns: [/decodeURIComponent\s*\(\s*encoded\s*\)/],
    tags: ['url-decoding', 'decodeURIComponent', 'basics'],
  },
  {
    id: 'js-str-008',
    category: 'String Manipulation',
    difficulty: 'easy',
    title: 'Base64 Encoding',
    text: 'Encode the text string to Base64.',
    setup: 'const text = "Hello World";',
    setupCode: 'const text = "Hello World";',
    expected: 'SGVsbG8gV29ybGQ=',
    sample: 'btoa(text)',
    hints: ['btoa encodes to Base64', 'Only works with ASCII characters'],
    validPatterns: [/btoa\s*\(\s*text\s*\)/],
    tags: ['base64', 'encoding', 'basics'],
  },
  {
    id: 'js-str-009',
    category: 'String Manipulation',
    difficulty: 'medium',
    title: 'Regex Match All Occurrences',
    text: 'Extract all numbers from the string using matchAll.',
    setup: 'const text = "Order 123 shipped on day 45 with 7 items";',
    setupCode: 'const text = "Order 123 shipped on day 45 with 7 items";',
    expected: ['123', '45', '7'],
    sample: '[...text.matchAll(/\\d+/g)].map(m => m[0])',
    hints: ['matchAll returns an iterator', 'Spread or Array.from to convert', 'Need global flag /g'],
    validPatterns: [/\.matchAll\s*\(\s*\/\\d\+\/g\s*\)/, /\[\.\.\..*matchAll/],
    tags: ['matchAll', 'regex', 'extraction'],
  },
  {
    id: 'js-str-010',
    category: 'String Manipulation',
    difficulty: 'medium',
    title: 'Replace with Function',
    text: 'Replace all numbers with their doubled values using a replacement function.',
    setup: 'const prices = "Apple: $5, Banana: $3, Orange: $4";',
    setupCode: 'const prices = "Apple: $5, Banana: $3, Orange: $4";',
    expected: 'Apple: $10, Banana: $6, Orange: $8',
    sample: 'prices.replace(/\\d+/g, match => String(Number(match) * 2))',
    hints: ['replace accepts a function as second argument', 'Function receives matched text'],
    validPatterns: [/\.replace\s*\(\s*\/\\d\+\/g\s*,\s*\w*\s*=>/],
    tags: ['replace', 'regex', 'function-callback'],
  },
  {
    id: 'js-str-011',
    category: 'String Manipulation',
    difficulty: 'medium',
    title: 'Tagged Template Literal',
    text: 'Create a tagged template that uppercases all interpolated values.',
    setup: `function upperTag(strings, ...values) {
  return strings.reduce((result, str, i) =>
    result + str + (values[i] !== undefined ? String(values[i]).toUpperCase() : ''), '');
}
const name = "alice";
const city = "paris";`,
    setupCode: `function upperTag(strings, ...values) {
  return strings.reduce((result, str, i) =>
    result + str + (values[i] !== undefined ? String(values[i]).toUpperCase() : ''), '');
}
const name = "alice";
const city = "paris";`,
    expected: 'Hello ALICE from PARIS!',
    sample: 'upperTag`Hello ${name} from ${city}!`',
    hints: ['Tagged templates use function before backticks', 'No parentheses needed'],
    validPatterns: [/upperTag\s*`.*\$\{name\}.*\$\{city\}.*`/],
    tags: ['tagged-template', 'template-literal', 'advanced'],
  },
  {
    id: 'js-str-012',
    category: 'String Manipulation',
    difficulty: 'medium',
    title: 'String Iterator',
    text: 'Convert the string to an array of characters using the spread operator.',
    setup: 'const emoji = "Hello";',
    setupCode: 'const emoji = "Hello";',
    expected: ['H', 'e', 'l', 'l', 'o'],
    sample: '[...emoji]',
    hints: ['Strings are iterable', 'Spread operator iterates over characters'],
    validPatterns: [/\[\s*\.\.\.emoji\s*\]/, /Array\.from\s*\(\s*emoji\s*\)/],
    tags: ['spread', 'iterator', 'characters'],
  },
  {
    id: 'js-str-013',
    category: 'String Manipulation',
    difficulty: 'medium',
    title: 'Regex Capture Groups',
    text: 'Extract the area code and number from the phone string using capture groups.',
    setup: 'const phone = "(555) 123-4567";',
    setupCode: 'const phone = "(555) 123-4567";',
    expected: { areaCode: '555', number: '123-4567' },
    sample: 'const m = phone.match(/\\((\\d+)\\)\\s*(\\d+-\\d+)/); ({ areaCode: m[1], number: m[2] })',
    hints: ['Parentheses create capture groups', 'Access groups via array indices'],
    validPatterns: [/\.match\s*\(\s*\/.*\(.*\).*\/\s*\)/],
    tags: ['regex', 'capture-groups', 'extraction'],
  },
  {
    id: 'js-str-014',
    category: 'String Manipulation',
    difficulty: 'medium',
    title: 'Named Capture Groups',
    text: 'Extract date parts using named capture groups.',
    setup: 'const dateStr = "2024-01-15";',
    setupCode: 'const dateStr = "2024-01-15";',
    expected: { year: '2024', month: '01', day: '15' },
    sample: 'dateStr.match(/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/).groups',
    hints: ['Use (?<name>...) for named groups', 'Access via .groups property'],
    validPatterns: [/\(\?<\w+>.*\)/, /\.groups/],
    tags: ['regex', 'named-groups', 'extraction'],
  },
  {
    id: 'js-str-015',
    category: 'String Manipulation',
    difficulty: 'medium',
    title: 'Intl.Collator String Comparison',
    text: 'Sort the names array alphabetically with proper locale handling.',
    setup: 'const names = ["Zebra", "apple", "Banana", "cherry"];',
    setupCode: 'const names = ["Zebra", "apple", "Banana", "cherry"];',
    expected: ['apple', 'Banana', 'cherry', 'Zebra'],
    sample: 'names.sort(new Intl.Collator("en", { sensitivity: "base" }).compare)',
    hints: ['Intl.Collator handles locale-aware sorting', 'sensitivity: base ignores case'],
    validPatterns: [/Intl\.Collator/, /\.sort\s*\(.*compare\s*\)/],
    tags: ['Intl.Collator', 'sorting', 'locale'],
  },
  {
    id: 'js-str-016',
    category: 'String Manipulation',
    difficulty: 'medium',
    title: 'Unicode Normalization',
    text: 'Normalize the string so that different representations of the same character are equal.',
    setup: `const str1 = "caf\\u00e9";  // e with acute
const str2 = "cafe\\u0301"; // e + combining acute`,
    setupCode: `const str1 = "caf\\u00e9";
const str2 = "cafe\\u0301";`,
    expected: true,
    sample: 'str1.normalize() === str2.normalize()',
    hints: ['normalize() standardizes Unicode representations', 'NFC form is default'],
    validPatterns: [/\.normalize\s*\(\s*\)/],
    tags: ['unicode', 'normalize', 'comparison'],
  },
  {
    id: 'js-str-017',
    category: 'String Manipulation',
    difficulty: 'medium',
    title: 'Template Literal Expression',
    text: 'Use a template literal to create a conditional message.',
    setup: `const score = 85;
const passingScore = 70;`,
    setupCode: `const score = 85;
const passingScore = 70;`,
    expected: 'You scored 85 - PASSED',
    sample: '`You scored ${score} - ${score >= passingScore ? "PASSED" : "FAILED"}`',
    hints: ['Template literals can contain any expression', 'Ternary operators work inside ${}'],
    validPatterns: [/`.*\$\{.*\?.*:.*\}.*`/],
    tags: ['template-literal', 'conditional', 'ternary'],
  },
  {
    id: 'js-str-018',
    category: 'String Manipulation',
    difficulty: 'medium',
    title: 'String.raw for Escaped Strings',
    text: 'Use String.raw to preserve backslashes in the path string.',
    setup: 'const path = String.raw`C:\\Users\\Admin\\Documents`;',
    setupCode: 'const path = String.raw`C:\\Users\\Admin\\Documents`;',
    expected: 'C:\\Users\\Admin\\Documents',
    sample: 'path',
    hints: ['String.raw preserves escape sequences', 'Useful for file paths and regex'],
    validPatterns: [/String\.raw\s*`.*`/, /path/],
    tags: ['String.raw', 'escape-sequences', 'paths'],
  },
  {
    id: 'js-str-019',
    category: 'String Manipulation',
    difficulty: 'medium',
    title: 'Replace All with Regex',
    text: 'Replace all whitespace sequences with a single space.',
    setup: 'const messy = "Hello    World   JavaScript";',
    setupCode: 'const messy = "Hello    World   JavaScript";',
    expected: 'Hello World JavaScript',
    sample: 'messy.replace(/\\s+/g, " ")',
    hints: ['\\s+ matches one or more whitespace', 'Global flag replaces all'],
    validPatterns: [/\.replace\s*\(\s*\/\\s\+\/g\s*,\s*['"] ['"]\s*\)/],
    tags: ['replace', 'regex', 'whitespace'],
  },
  {
    id: 'js-str-020',
    category: 'String Manipulation',
    difficulty: 'medium',
    title: 'Base64 Decode',
    text: 'Decode the Base64 encoded string back to plain text.',
    setup: 'const encoded = "SGVsbG8gV29ybGQ=";',
    setupCode: 'const encoded = "SGVsbG8gV29ybGQ=";',
    expected: 'Hello World',
    sample: 'atob(encoded)',
    hints: ['atob decodes Base64', 'Reverse of btoa'],
    validPatterns: [/atob\s*\(\s*encoded\s*\)/],
    tags: ['base64', 'decoding', 'atob'],
  },
  {
    id: 'js-str-021',
    category: 'String Manipulation',
    difficulty: 'hard',
    title: 'Complex Replace with Callback',
    text: 'Transform camelCase to kebab-case using replace with a callback.',
    setup: 'const camelCase = "backgroundColor";',
    setupCode: 'const camelCase = "backgroundColor";',
    expected: 'background-color',
    sample: 'camelCase.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)',
    hints: ['Match uppercase letters', 'Prepend hyphen and lowercase'],
    validPatterns: [/\.replace\s*\(\s*\/\[A-Z\]\/g\s*,\s*\w*\s*=>/],
    tags: ['replace', 'regex', 'case-conversion'],
  },
  {
    id: 'js-str-022',
    category: 'String Manipulation',
    difficulty: 'hard',
    title: 'matchAll with Named Groups',
    text: 'Extract all key-value pairs from the CSS-like string using matchAll with named groups.',
    setup: 'const css = "color: red; font-size: 16px; margin: 10px;";',
    setupCode: 'const css = "color: red; font-size: 16px; margin: 10px;";',
    expected: [
      { property: 'color', value: 'red' },
      { property: 'font-size', value: '16px' },
      { property: 'margin', value: '10px' },
    ],
    sample: '[...css.matchAll(/(?<property>[\\w-]+):\\s*(?<value>[^;]+)/g)].map(m => ({ property: m.groups.property, value: m.groups.value }))',
    hints: ['Use named capture groups (?<name>...)', 'matchAll returns iterator with groups'],
    validPatterns: [/matchAll\s*\(\s*\/.*\(\?<\w+>.*\).*\/g\s*\)/],
    tags: ['matchAll', 'named-groups', 'parsing'],
  },
  {
    id: 'js-str-023',
    category: 'String Manipulation',
    difficulty: 'hard',
    title: 'Unicode-aware String Reversal',
    text: 'Reverse the string while properly handling emoji and combined characters.',
    setup: 'const text = "Hello";',
    setupCode: 'const text = "Hello";',
    expected: 'olleH',
    sample: '[...text].reverse().join("")',
    hints: ['Spread operator handles Unicode properly', 'split("") can break emoji'],
    validPatterns: [/\[\s*\.\.\.text\s*\]\.reverse\s*\(\s*\)\.join\s*\(\s*['"]['"]?\s*\)/],
    tags: ['unicode', 'reverse', 'spread'],
  },
  {
    id: 'js-str-024',
    category: 'String Manipulation',
    difficulty: 'hard',
    title: 'Lookahead and Lookbehind Assertions',
    text: 'Extract numbers that are followed by "px" but do not include "px" in the result.',
    setup: 'const css = "width: 100px; height: 50px; opacity: 0.5;";',
    setupCode: 'const css = "width: 100px; height: 50px; opacity: 0.5;";',
    expected: ['100', '50'],
    sample: 'css.match(/\\d+(?=px)/g)',
    hints: ['(?=px) is a positive lookahead', 'Matches position before px without consuming'],
    validPatterns: [/\.match\s*\(\s*\/\\d\+\(\?=px\)\/g\s*\)/],
    tags: ['regex', 'lookahead', 'assertions'],
  },
  {
    id: 'js-str-025',
    category: 'String Manipulation',
    difficulty: 'hard',
    title: 'Template Literal Tag for HTML Escaping',
    text: 'Use the htmlEscape tagged template to safely escape HTML entities.',
    setup: `function htmlEscape(strings, ...values) {
  const escape = str => String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return strings.reduce((result, str, i) =>
    result + str + (values[i] !== undefined ? escape(values[i]) : ''), '');
}
const userInput = '<script>alert("xss")</script>';`,
    setupCode: `function htmlEscape(strings, ...values) {
  const escape = str => String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return strings.reduce((result, str, i) =>
    result + str + (values[i] !== undefined ? escape(values[i]) : ''), '');
}
const userInput = '<script>alert("xss")</script>';`,
    expected: 'User said: &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
    sample: 'htmlEscape`User said: ${userInput}`',
    hints: ['Tagged templates can transform interpolated values', 'Useful for security'],
    validPatterns: [/htmlEscape\s*`.*\$\{userInput\}.*`/],
    tags: ['tagged-template', 'security', 'html-escape'],
  },

  // ========================================
  // OBJECT MANIPULATION
  // ========================================
  // Easy (8 problems)
  {
    id: 'js-obj-001',
    category: 'Object Manipulation',
    difficulty: 'easy',
    title: 'Count Object Properties',
    text: 'Count how many properties the object has using Object.keys.',
    setup:
      'const car = { make: "Toyota", model: "Camry", year: 2022, color: "blue" };',
    setupCode:
      'const car = { make: "Toyota", model: "Camry", year: 2022, color: "blue" };',
    expected: 4,
    sample: 'Object.keys(car).length',
    hints: [
      'Object.keys returns array of keys',
      'Arrays have a length property',
    ],
    validPatterns: [
      /Object\.keys\s*\(\s*car\s*\)\.length/,
      /Object\.entries\s*\(\s*car\s*\)\.length/,
    ],
    tags: ['Object.keys', 'length', 'basics'],
  },
  {
    id: 'js-obj-002',
    category: 'Object Manipulation',
    difficulty: 'easy',
    title: 'Sum Object Values',
    text: 'Calculate the sum of all numeric values in the object.',
    setup:
      'const scores = { math: 95, science: 88, english: 92, history: 87 };',
    setupCode:
      'const scores = { math: 95, science: 88, english: 92, history: 87 };',
    expected: 362,
    sample: 'Object.values(scores).reduce((sum, n) => sum + n, 0)',
    hints: ['Object.values extracts all values', 'Use reduce to sum them'],
    validPatterns: [/Object\.values\s*\(\s*scores\s*\)\.reduce/],
    tags: ['Object.values', 'reduce', 'sum'],
  },
  {
    id: 'js-obj-003',
    category: 'Object Manipulation',
    difficulty: 'easy',
    title: 'Clone Object with Spread',
    text: 'Create a shallow copy of the object using the spread operator.',
    setup: 'const original = { a: 1, b: 2, c: 3 };',
    setupCode: 'const original = { a: 1, b: 2, c: 3 };',
    expected: { a: 1, b: 2, c: 3 },
    sample: '{ ...original }',
    hints: [
      'Spread operator copies properties',
      'Creates a new object reference',
    ],
    validPatterns: [/\{\s*\.\.\.original\s*\}/],
    tags: ['spread', 'clone', 'shallow-copy'],
  },
  {
    id: 'js-obj-004',
    category: 'Object Manipulation',
    difficulty: 'easy',
    title: 'Add Property with Spread',
    text: 'Create a new object with all properties from person plus a new "country" property set to "USA".',
    setup: 'const person = { name: "Alice", age: 30 };',
    setupCode: 'const person = { name: "Alice", age: 30 };',
    expected: { name: 'Alice', age: 30, country: 'USA' },
    sample: '{ ...person, country: "USA" }',
    hints: ['Spread existing properties first', 'Add new property after spread'],
    validPatterns: [/\{\s*\.\.\.person\s*,\s*country\s*:\s*['"]USA['"]\s*\}/],
    tags: ['spread', 'extend', 'immutable'],
  },
  {
    id: 'js-obj-005',
    category: 'Object Manipulation',
    difficulty: 'easy',
    title: 'Override Property with Spread',
    text: 'Create a new object with age updated to 35 while keeping other properties.',
    setup: 'const person = { name: "Bob", age: 25, city: "NYC" };',
    setupCode: 'const person = { name: "Bob", age: 25, city: "NYC" };',
    expected: { name: 'Bob', age: 35, city: 'NYC' },
    sample: '{ ...person, age: 35 }',
    hints: [
      'Later properties override earlier ones',
      'Spread first, then override',
    ],
    validPatterns: [/\{\s*\.\.\.person\s*,\s*age\s*:\s*35\s*\}/],
    tags: ['spread', 'override', 'immutable'],
  },
  {
    id: 'js-obj-006',
    category: 'Object Manipulation',
    difficulty: 'easy',
    title: 'Check if Object is Empty',
    text: 'Check if the object has no properties.',
    setup: 'const empty = {};',
    setupCode: 'const empty = {};',
    expected: true,
    sample: 'Object.keys(empty).length === 0',
    hints: ['Empty object has no keys', 'Check if keys array length is 0'],
    validPatterns: [
      /Object\.keys\s*\(\s*empty\s*\)\.length\s*===?\s*0/,
      /Object\.entries\s*\(\s*empty\s*\)\.length\s*===?\s*0/,
    ],
    tags: ['Object.keys', 'empty-check', 'validation'],
  },
  {
    id: 'js-obj-007',
    category: 'Object Manipulation',
    difficulty: 'easy',
    title: 'Convert Entries to Object',
    text: 'Convert the array of key-value pairs into an object.',
    setup:
      'const pairs = [["name", "Charlie"], ["role", "developer"], ["level", "senior"]];',
    setupCode:
      'const pairs = [["name", "Charlie"], ["role", "developer"], ["level", "senior"]];',
    expected: { name: 'Charlie', role: 'developer', level: 'senior' },
    sample: 'Object.fromEntries(pairs)',
    hints: [
      'Object.fromEntries takes array of pairs',
      'Each pair is [key, value]',
    ],
    validPatterns: [/Object\.fromEntries\s*\(\s*pairs\s*\)/],
    tags: ['Object.fromEntries', 'conversion', 'basics'],
  },
  {
    id: 'js-obj-008',
    category: 'Object Manipulation',
    difficulty: 'easy',
    title: 'Object.assign Basic',
    text: 'Merge source into target using Object.assign.',
    setup: `const target = { a: 1 };
const source = { b: 2, c: 3 };`,
    setupCode: `const target = { a: 1 };
const source = { b: 2, c: 3 };`,
    expected: { a: 1, b: 2, c: 3 },
    sample: 'Object.assign({}, target, source)',
    hints: [
      'Object.assign merges objects',
      'First arg is target, rest are sources',
    ],
    validPatterns: [
      /Object\.assign\s*\(\s*\{\s*\}\s*,\s*target\s*,\s*source\s*\)/,
      /Object\.assign\s*\(\s*\{\s*\}\s*,\s*source\s*,\s*target\s*\)/,
    ],
    tags: ['Object.assign', 'merge', 'basics'],
  },

  // Medium (12 problems)
  {
    id: 'js-obj-009',
    category: 'Object Manipulation',
    difficulty: 'medium',
    title: 'Filter Object Properties',
    text: 'Create a new object containing only properties where the value is greater than 50.',
    setup: 'const scores = { alice: 85, bob: 42, charlie: 91, diana: 38 };',
    setupCode: 'const scores = { alice: 85, bob: 42, charlie: 91, diana: 38 };',
    expected: { alice: 85, charlie: 91 },
    sample:
      'Object.fromEntries(Object.entries(scores).filter(([_, v]) => v > 50))',
    hints: [
      'Use entries to get [key, value] pairs',
      'Filter pairs, then fromEntries',
    ],
    validPatterns: [
      /Object\.fromEntries\s*\(\s*Object\.entries\s*\(\s*scores\s*\)\.filter/,
    ],
    tags: ['Object.fromEntries', 'Object.entries', 'filter'],
  },
  {
    id: 'js-obj-010',
    category: 'Object Manipulation',
    difficulty: 'medium',
    title: 'Rename Object Keys',
    text: 'Transform object keys from snake_case to camelCase.',
    setup:
      'const user = { first_name: "John", last_name: "Doe", user_age: 30 };',
    setupCode:
      'const user = { first_name: "John", last_name: "Doe", user_age: 30 };',
    expected: { firstName: 'John', lastName: 'Doe', userAge: 30 },
    sample:
      'Object.fromEntries(Object.entries(user).map(([k, v]) => [k.replace(/_([a-z])/g, (_, c) => c.toUpperCase()), v]))',
    hints: [
      'Use entries and map to transform keys',
      'Replace _x with uppercase X',
    ],
    validPatterns: [
      /Object\.fromEntries\s*\(\s*Object\.entries\s*\(\s*user\s*\)\.map/,
    ],
    tags: ['Object.fromEntries', 'transform', 'camelCase'],
  },
  {
    id: 'js-obj-011',
    category: 'Object Manipulation',
    difficulty: 'medium',
    title: 'Swap Keys and Values',
    text: 'Create a new object with keys and values swapped.',
    setup: 'const original = { a: "x", b: "y", c: "z" };',
    setupCode: 'const original = { a: "x", b: "y", c: "z" };',
    expected: { x: 'a', y: 'b', z: 'c' },
    sample:
      'Object.fromEntries(Object.entries(original).map(([k, v]) => [v, k]))',
    hints: [
      'Map entries to flip the pairs',
      'Return [value, key] instead of [key, value]',
    ],
    validPatterns: [
      /Object\.fromEntries\s*\(\s*Object\.entries\s*\(\s*original\s*\)\.map\s*\(\s*\[\s*\w+\s*,\s*\w+\s*\]\s*=>\s*\[\s*\w+\s*,\s*\w+\s*\]\s*\)/,
    ],
    tags: ['Object.fromEntries', 'swap', 'transform'],
  },
  {
    id: 'js-obj-012',
    category: 'Object Manipulation',
    difficulty: 'medium',
    title: 'Pick Specific Properties',
    text: 'Extract only the "name" and "email" properties from the user object.',
    setup:
      'const user = { name: "Alice", email: "alice@example.com", age: 30, role: "admin" };',
    setupCode:
      'const user = { name: "Alice", email: "alice@example.com", age: 30, role: "admin" };',
    expected: { name: 'Alice', email: 'alice@example.com' },
    sample: '(({ name, email }) => ({ name, email }))(user)',
    hints: [
      'Destructure desired properties',
      'Return new object with only those',
    ],
    validPatterns: [
      /\(\s*\{\s*name\s*,\s*email\s*\}\s*=\s*user/,
      /\(\s*\(\s*\{\s*name\s*,\s*email\s*\}\s*\)\s*=>/,
    ],
    tags: ['destructuring', 'pick', 'subset'],
  },
  {
    id: 'js-obj-013',
    category: 'Object Manipulation',
    difficulty: 'medium',
    title: 'Omit Specific Properties',
    text: 'Create a new object without the "password" property using rest syntax.',
    setup:
      'const user = { name: "Bob", email: "bob@example.com", password: "secret123" };',
    setupCode:
      'const user = { name: "Bob", email: "bob@example.com", password: "secret123" };',
    expected: { name: 'Bob', email: 'bob@example.com' },
    sample: '(({ password, ...rest }) => rest)(user)',
    hints: [
      'Destructure the property to omit',
      'Use rest operator for remaining',
    ],
    validPatterns: [
      /\{\s*password\s*,\s*\.\.\.rest\s*\}/,
      /\{\s*password\s*,\s*\.\.\.(\w+)\s*\}/,
    ],
    tags: ['rest', 'omit', 'destructuring'],
  },
  {
    id: 'js-obj-014',
    category: 'Object Manipulation',
    difficulty: 'medium',
    title: 'Merge Multiple Objects',
    text: 'Merge three objects where later values override earlier ones.',
    setup: `const defaults = { theme: "light", lang: "en", size: "medium" };
const userPrefs = { theme: "dark" };
const sessionPrefs = { size: "large" };`,
    setupCode: `const defaults = { theme: "light", lang: "en", size: "medium" };
const userPrefs = { theme: "dark" };
const sessionPrefs = { size: "large" };`,
    expected: { theme: 'dark', lang: 'en', size: 'large' },
    sample: '{ ...defaults, ...userPrefs, ...sessionPrefs }',
    hints: ['Spread in order of priority', 'Later spreads override earlier'],
    validPatterns: [
      /\{\s*\.\.\.defaults\s*,\s*\.\.\.userPrefs\s*,\s*\.\.\.sessionPrefs\s*\}/,
      /Object\.assign\s*\(\s*\{\s*\}\s*,\s*defaults\s*,\s*userPrefs\s*,\s*sessionPrefs\s*\)/,
    ],
    tags: ['spread', 'merge', 'multiple'],
  },
  {
    id: 'js-obj-015',
    category: 'Object Manipulation',
    difficulty: 'medium',
    title: 'Uppercase All Values',
    text: 'Transform all string values in the object to uppercase.',
    setup:
      'const words = { greeting: "hello", farewell: "goodbye", question: "how" };',
    setupCode:
      'const words = { greeting: "hello", farewell: "goodbye", question: "how" };',
    expected: { greeting: 'HELLO', farewell: 'GOODBYE', question: 'HOW' },
    sample:
      'Object.fromEntries(Object.entries(words).map(([k, v]) => [k, v.toUpperCase()]))',
    hints: [
      'Use entries to iterate with keys',
      'Map and transform values',
      'Rebuild with fromEntries',
    ],
    validPatterns: [
      /Object\.fromEntries\s*\(\s*Object\.entries\s*\(\s*words\s*\)\.map/,
    ],
    tags: ['Object.fromEntries', 'transform', 'toUpperCase'],
  },
  {
    id: 'js-obj-016',
    category: 'Object Manipulation',
    difficulty: 'medium',
    title: 'Object.assign with Getter',
    text: 'Use Object.assign to copy including computed property. Get the merged result.',
    setup: `const base = { x: 10, y: 20 };
const extension = { z: 30 };`,
    setupCode: `const base = { x: 10, y: 20 };
const extension = { z: 30 };`,
    expected: { x: 10, y: 20, z: 30 },
    sample: 'Object.assign({}, base, extension)',
    hints: [
      'Object.assign copies enumerable properties',
      'First arg is target object',
    ],
    validPatterns: [
      /Object\.assign\s*\(\s*\{\s*\}\s*,\s*base\s*,\s*extension\s*\)/,
    ],
    tags: ['Object.assign', 'merge', 'copy'],
  },
  {
    id: 'js-obj-017',
    category: 'Object Manipulation',
    difficulty: 'medium',
    title: 'Find Max Value Key',
    text: 'Find the key that has the highest numeric value.',
    setup:
      'const prices = { apple: 1.5, banana: 0.75, mango: 2.5, orange: 1.25 };',
    setupCode:
      'const prices = { apple: 1.5, banana: 0.75, mango: 2.5, orange: 1.25 };',
    expected: 'mango',
    sample: 'Object.entries(prices).reduce((a, b) => b[1] > a[1] ? b : a)[0]',
    hints: [
      'Use entries to get [key, value] pairs',
      'Reduce to find max, then extract key',
    ],
    validPatterns: [
      /Object\.entries\s*\(\s*prices\s*\)\.reduce/,
      /Object\.keys\s*\(\s*prices\s*\)\.reduce/,
    ],
    tags: ['Object.entries', 'reduce', 'max'],
  },
  {
    id: 'js-obj-018',
    category: 'Object Manipulation',
    difficulty: 'medium',
    title: 'Object to Query String',
    text: 'Convert the object to a URL query string format.',
    setup: 'const params = { page: 1, limit: 10, sort: "name" };',
    setupCode: 'const params = { page: 1, limit: 10, sort: "name" };',
    expected: 'page=1&limit=10&sort=name',
    sample: 'Object.entries(params).map(([k, v]) => `${k}=${v}`).join("&")',
    hints: [
      'Use entries to get key-value pairs',
      'Map to "key=value" strings',
      'Join with &',
    ],
    validPatterns: [
      /Object\.entries\s*\(\s*params\s*\)\.map/,
      /new\s+URLSearchParams\s*\(\s*params\s*\)\.toString\s*\(\s*\)/,
    ],
    tags: ['Object.entries', 'transform', 'query-string'],
  },
  {
    id: 'js-obj-019',
    category: 'Object Manipulation',
    difficulty: 'medium',
    title: 'Deep Merge Nested Objects',
    text: 'Merge nested objects where inner objects are also merged (not replaced).',
    setup: `const target = { user: { name: "Alice", settings: { theme: "light" } } };
const source = { user: { settings: { fontSize: 14 } } };`,
    setupCode: `const target = { user: { name: "Alice", settings: { theme: "light" } } };
const source = { user: { settings: { fontSize: 14 } } };`,
    expected: {
      user: { name: 'Alice', settings: { theme: 'light', fontSize: 14 } },
    },
    sample:
      '{ user: { ...target.user, settings: { ...target.user.settings, ...source.user.settings } } }',
    hints: [
      'Spread alone does shallow merge',
      'Manually spread nested objects',
    ],
    validPatterns: [
      /\.\.\.target\.user\.settings\s*,\s*\.\.\.source\.user\.settings/,
      /\.\.\.source\.user\.settings\s*,\s*\.\.\.target\.user\.settings/,
    ],
    tags: ['spread', 'deep-merge', 'nested'],
  },
  {
    id: 'js-obj-020',
    category: 'Object Manipulation',
    difficulty: 'medium',
    title: 'Freeze Object',
    text: 'Freeze the object to prevent modifications. Return whether the object is frozen.',
    setup: 'const config = { apiKey: "abc123", maxRetries: 3 };',
    setupCode: 'const config = { apiKey: "abc123", maxRetries: 3 };',
    expected: true,
    sample: 'Object.freeze(config); Object.isFrozen(config)',
    hints: [
      'Object.freeze prevents changes',
      'Object.isFrozen checks freeze status',
    ],
    validPatterns: [
      /Object\.freeze\s*\(\s*config\s*\)/,
      /Object\.isFrozen\s*\(\s*config\s*\)/,
    ],
    tags: ['Object.freeze', 'Object.isFrozen', 'immutability'],
  },

  // Hard (5 problems)
  {
    id: 'js-obj-021',
    category: 'Object Manipulation',
    difficulty: 'hard',
    title: 'Define Computed Property',
    text: 'Use Object.defineProperty to add a read-only "fullName" property that computes from firstName and lastName.',
    setup: 'const person = { firstName: "John", lastName: "Doe" };',
    setupCode: 'const person = { firstName: "John", lastName: "Doe" };',
    expected: 'John Doe',
    sample:
      'Object.defineProperty(person, "fullName", { get() { return `${this.firstName} ${this.lastName}`; }, enumerable: true }); person.fullName',
    hints: [
      'defineProperty adds/modifies properties',
      'Use getter for computed value',
    ],
    validPatterns: [
      /Object\.defineProperty\s*\(\s*person\s*,\s*['"]fullName['"]/,
    ],
    tags: ['Object.defineProperty', 'getter', 'computed'],
  },
  {
    id: 'js-obj-022',
    category: 'Object Manipulation',
    difficulty: 'hard',
    title: 'Property Descriptor Analysis',
    text: 'Get the property descriptor for the "name" property and check if it is writable.',
    setup: `const obj = {};
Object.defineProperty(obj, "name", { value: "Immutable", writable: false, enumerable: true, configurable: false });`,
    setupCode: `const obj = {};
Object.defineProperty(obj, "name", { value: "Immutable", writable: false, enumerable: true, configurable: false });`,
    expected: false,
    sample: 'Object.getOwnPropertyDescriptor(obj, "name").writable',
    hints: [
      'getOwnPropertyDescriptor returns descriptor object',
      'Check the writable property',
    ],
    validPatterns: [
      /Object\.getOwnPropertyDescriptor\s*\(\s*obj\s*,\s*['"]name['"]\s*\)\.writable/,
    ],
    tags: ['getOwnPropertyDescriptor', 'property-descriptor', 'introspection'],
  },
  {
    id: 'js-obj-023',
    category: 'Object Manipulation',
    difficulty: 'hard',
    title: 'Basic Proxy Trap',
    text: 'Create a proxy that returns "Property not found" for any non-existent property access.',
    setup: 'const target = { name: "Alice", age: 30 };',
    setupCode: 'const target = { name: "Alice", age: 30 };',
    expected: 'Property not found',
    sample:
      'new Proxy(target, { get(obj, prop) { return prop in obj ? obj[prop] : "Property not found"; } }).missing',
    hints: [
      'Proxy intercepts operations',
      'get trap handles property access',
      'Check if property exists',
    ],
    validPatterns: [/new\s+Proxy\s*\(\s*target\s*,\s*\{[^}]*get\s*\(/],
    tags: ['Proxy', 'trap', 'get'],
  },
  {
    id: 'js-obj-024',
    category: 'Object Manipulation',
    difficulty: 'hard',
    title: 'Validation Proxy',
    text: 'Create a proxy that only allows setting numeric values (throws error otherwise). Set age to 25 and return it.',
    setup: 'const target = { age: 0 };',
    setupCode: 'const target = { age: 0 };',
    expected: 25,
    sample:
      'const proxy = new Proxy(target, { set(obj, prop, value) { if (typeof value !== "number") throw new TypeError("Must be a number"); obj[prop] = value; return true; } }); proxy.age = 25; proxy.age',
    hints: [
      'set trap intercepts assignments',
      'Validate before setting',
      'Return true on success',
    ],
    validPatterns: [/new\s+Proxy\s*\(\s*target\s*,\s*\{[^}]*set\s*\(/],
    tags: ['Proxy', 'validation', 'set-trap'],
  },
  {
    id: 'js-obj-025',
    category: 'Object Manipulation',
    difficulty: 'hard',
    title: 'Reflect and Proxy Combined',
    text: 'Create a proxy that logs property access and uses Reflect.get for the actual retrieval. Access the name property.',
    setup: `const target = { name: "Bob", role: "developer" };
const logs = [];`,
    setupCode: `const target = { name: "Bob", role: "developer" };
const logs = [];`,
    expected: 'Bob',
    sample:
      'const proxy = new Proxy(target, { get(obj, prop, receiver) { logs.push(`Accessed: ${prop}`); return Reflect.get(obj, prop, receiver); } }); proxy.name',
    hints: [
      'Reflect.get is the default get behavior',
      'Use it inside proxy trap',
      'Log before returning',
    ],
    validPatterns: [
      /Reflect\.get\s*\(\s*\w+\s*,\s*\w+/,
      /new\s+Proxy\s*\(\s*target\s*,\s*\{[^}]*Reflect\.get/,
    ],
    tags: ['Proxy', 'Reflect', 'logging'],
  },
];

export default javascriptProblems;
