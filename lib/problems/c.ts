import type { Problem } from '../types';

/**
 * C programming language coding drill problems
 * Focus on standard library functions and common patterns
 * Note: C problems use pattern matching since we cannot execute C in browser
 */

export const cProblems: Problem[] = [
  // ============================================================
  // String Functions (string.h)
  // ============================================================
  {
    id: 'c-strlen',
    category: 'String Functions',
    difficulty: 'easy',
    title: 'Get String Length with strlen',
    text: 'Get the length of the string "Hello" using strlen()',
    setup: '#include <string.h>\nchar str[] = "Hello";',
    setupCode: '#include <string.h>\nchar str[] = "Hello";',
    expected: 'strlen(str)',
    sample: 'strlen(str)',
    hints: [
      'strlen returns the number of characters before null terminator',
      'Return type is size_t',
    ],
    validPatterns: [
      /strlen\s*\(\s*str\s*\)/,
    ],
    tags: ['strlen', 'string.h'],
  },
  {
    id: 'c-strcpy',
    category: 'String Functions',
    difficulty: 'easy',
    title: 'Copy String with strcpy',
    text: 'Copy the source string to the destination buffer using strcpy()',
    setup: '#include <string.h>\nchar src[] = "Hello";\nchar dest[20];',
    setupCode: '#include <string.h>\nchar src[] = "Hello";\nchar dest[20];',
    expected: 'strcpy(dest, src)',
    sample: 'strcpy(dest, src)',
    hints: [
      'strcpy(destination, source)',
      'Destination must have enough space',
    ],
    validPatterns: [
      /strcpy\s*\(\s*dest\s*,\s*src\s*\)/,
    ],
    tags: ['strcpy', 'string.h'],
  },
  {
    id: 'c-strncpy',
    category: 'String Functions',
    difficulty: 'easy',
    title: 'Safe String Copy with strncpy',
    text: 'Copy at most 5 characters from source to destination using strncpy()',
    setup: '#include <string.h>\nchar src[] = "Hello World";\nchar dest[6];',
    setupCode: '#include <string.h>\nchar src[] = "Hello World";\nchar dest[6];',
    expected: 'strncpy(dest, src, 5)',
    sample: 'strncpy(dest, src, 5)',
    hints: [
      'strncpy(dest, src, n) copies at most n characters',
      'May not null-terminate if src is longer than n',
    ],
    validPatterns: [
      /strncpy\s*\(\s*dest\s*,\s*src\s*,\s*5\s*\)/,
    ],
    tags: ['strncpy', 'string.h', 'safe'],
  },
  {
    id: 'c-strcat',
    category: 'String Functions',
    difficulty: 'easy',
    title: 'Concatenate Strings with strcat',
    text: 'Append the source string to the destination using strcat()',
    setup: '#include <string.h>\nchar dest[20] = "Hello ";\nchar src[] = "World";',
    setupCode: '#include <string.h>\nchar dest[20] = "Hello ";\nchar src[] = "World";',
    expected: 'strcat(dest, src)',
    sample: 'strcat(dest, src)',
    hints: [
      'strcat appends src to the end of dest',
      'dest must have enough space for both strings',
    ],
    validPatterns: [
      /strcat\s*\(\s*dest\s*,\s*src\s*\)/,
    ],
    tags: ['strcat', 'string.h'],
  },
  {
    id: 'c-strncat',
    category: 'String Functions',
    difficulty: 'easy',
    title: 'Safe String Concatenation with strncat',
    text: 'Append at most 3 characters from source to destination using strncat()',
    setup: '#include <string.h>\nchar dest[20] = "Hello ";\nchar src[] = "World";',
    setupCode: '#include <string.h>\nchar dest[20] = "Hello ";\nchar src[] = "World";',
    expected: 'strncat(dest, src, 3)',
    sample: 'strncat(dest, src, 3)',
    hints: [
      'strncat appends at most n characters',
      'Always null-terminates the result',
    ],
    validPatterns: [
      /strncat\s*\(\s*dest\s*,\s*src\s*,\s*3\s*\)/,
    ],
    tags: ['strncat', 'string.h', 'safe'],
  },
  {
    id: 'c-strcmp',
    category: 'String Functions',
    difficulty: 'easy',
    title: 'Compare Strings with strcmp',
    text: 'Compare two strings using strcmp()',
    setup: '#include <string.h>\nchar str1[] = "apple";\nchar str2[] = "banana";',
    setupCode: '#include <string.h>\nchar str1[] = "apple";\nchar str2[] = "banana";',
    expected: 'strcmp(str1, str2)',
    sample: 'strcmp(str1, str2)',
    hints: [
      'Returns 0 if equal, negative if str1 < str2, positive if str1 > str2',
      'Comparison is lexicographic',
    ],
    validPatterns: [
      /strcmp\s*\(\s*str1\s*,\s*str2\s*\)/,
    ],
    tags: ['strcmp', 'string.h'],
  },
  {
    id: 'c-strncmp',
    category: 'String Functions',
    difficulty: 'easy',
    title: 'Compare N Characters with strncmp',
    text: 'Compare only the first 3 characters of the strings using strncmp()',
    setup: '#include <string.h>\nchar str1[] = "Hello World";\nchar str2[] = "Hello There";',
    setupCode: '#include <string.h>\nchar str1[] = "Hello World";\nchar str2[] = "Hello There";',
    expected: 'strncmp(str1, str2, 3)',
    sample: 'strncmp(str1, str2, 3)',
    hints: [
      'strncmp compares at most n characters',
      'Useful for prefix comparisons',
    ],
    validPatterns: [
      /strncmp\s*\(\s*str1\s*,\s*str2\s*,\s*3\s*\)/,
    ],
    tags: ['strncmp', 'string.h'],
  },
  {
    id: 'c-strchr',
    category: 'String Functions',
    difficulty: 'easy',
    title: 'Find Character with strchr',
    text: 'Find the first occurrence of character "o" in the string',
    setup: '#include <string.h>\nchar str[] = "Hello World";',
    setupCode: '#include <string.h>\nchar str[] = "Hello World";',
    expected: "strchr(str, 'o')",
    sample: "strchr(str, 'o')",
    hints: [
      'strchr returns pointer to first occurrence',
      'Returns NULL if not found',
    ],
    validPatterns: [
      /strchr\s*\(\s*str\s*,\s*['"]?o['"]?\s*\)/,
    ],
    tags: ['strchr', 'string.h'],
  },
  {
    id: 'c-strrchr',
    category: 'String Functions',
    difficulty: 'easy',
    title: 'Find Last Character with strrchr',
    text: 'Find the last occurrence of character "o" in the string',
    setup: '#include <string.h>\nchar str[] = "Hello World";',
    setupCode: '#include <string.h>\nchar str[] = "Hello World";',
    expected: "strrchr(str, 'o')",
    sample: "strrchr(str, 'o')",
    hints: [
      'strrchr searches from the end',
      'Returns pointer to last occurrence',
    ],
    validPatterns: [
      /strrchr\s*\(\s*str\s*,\s*['"]?o['"]?\s*\)/,
    ],
    tags: ['strrchr', 'string.h'],
  },
  {
    id: 'c-strstr',
    category: 'String Functions',
    difficulty: 'easy',
    title: 'Find Substring with strstr',
    text: 'Find the substring "World" in the string',
    setup: '#include <string.h>\nchar str[] = "Hello World";',
    setupCode: '#include <string.h>\nchar str[] = "Hello World";',
    expected: 'strstr(str, "World")',
    sample: 'strstr(str, "World")',
    hints: [
      'strstr returns pointer to first occurrence of substring',
      'Returns NULL if not found',
    ],
    validPatterns: [
      /strstr\s*\(\s*str\s*,\s*["']World["']\s*\)/,
    ],
    tags: ['strstr', 'string.h'],
  },
  {
    id: 'c-memcpy',
    category: 'Memory Functions',
    difficulty: 'medium',
    title: 'Copy Memory with memcpy',
    text: 'Copy 5 bytes from source to destination using memcpy()',
    setup: '#include <string.h>\nchar src[] = "Hello";\nchar dest[10];',
    setupCode: '#include <string.h>\nchar src[] = "Hello";\nchar dest[10];',
    expected: 'memcpy(dest, src, 5)',
    sample: 'memcpy(dest, src, 5)',
    hints: [
      'memcpy(dest, src, n) copies n bytes',
      'Does not handle overlapping memory',
    ],
    validPatterns: [
      /memcpy\s*\(\s*dest\s*,\s*src\s*,\s*5\s*\)/,
    ],
    tags: ['memcpy', 'string.h', 'memory'],
  },
  {
    id: 'c-memmove',
    category: 'Memory Functions',
    difficulty: 'medium',
    title: 'Move Memory with memmove',
    text: 'Safely copy overlapping memory regions using memmove()',
    setup: '#include <string.h>\nchar str[] = "Hello World";\n// Move "World" to start',
    setupCode: '#include <string.h>\nchar str[] = "Hello World";',
    expected: 'memmove(str, str + 6, 5)',
    sample: 'memmove(str, str + 6, 5)',
    hints: [
      'memmove handles overlapping memory safely',
      'Use when source and destination may overlap',
    ],
    validPatterns: [
      /memmove\s*\(\s*str\s*,\s*str\s*\+\s*6\s*,\s*5\s*\)/,
    ],
    tags: ['memmove', 'string.h', 'memory'],
  },
  {
    id: 'c-memset',
    category: 'Memory Functions',
    difficulty: 'easy',
    title: 'Initialize Memory with memset',
    text: 'Set the first 10 bytes of the buffer to zero using memset()',
    setup: '#include <string.h>\nchar buffer[20];',
    setupCode: '#include <string.h>\nchar buffer[20];',
    expected: 'memset(buffer, 0, 10)',
    sample: 'memset(buffer, 0, 10)',
    hints: [
      'memset(ptr, value, n) sets n bytes to value',
      'Commonly used for zeroing memory',
    ],
    validPatterns: [
      /memset\s*\(\s*buffer\s*,\s*0\s*,\s*10\s*\)/,
    ],
    tags: ['memset', 'string.h', 'memory'],
  },
  {
    id: 'c-memcmp',
    category: 'Memory Functions',
    difficulty: 'easy',
    title: 'Compare Memory with memcmp',
    text: 'Compare the first 5 bytes of two memory regions',
    setup: '#include <string.h>\nchar a[] = "Hello";\nchar b[] = "Hello World";',
    setupCode: '#include <string.h>\nchar a[] = "Hello";\nchar b[] = "Hello World";',
    expected: 'memcmp(a, b, 5)',
    sample: 'memcmp(a, b, 5)',
    hints: [
      'memcmp compares n bytes',
      'Returns 0 if equal, like strcmp',
    ],
    validPatterns: [
      /memcmp\s*\(\s*a\s*,\s*b\s*,\s*5\s*\)/,
    ],
    tags: ['memcmp', 'string.h', 'memory'],
  },

  // ============================================================
  // Standard Library (stdlib.h)
  // ============================================================
  {
    id: 'c-malloc',
    category: 'Memory Allocation',
    difficulty: 'medium',
    title: 'Allocate Memory with malloc',
    text: 'Allocate memory for 10 integers using malloc()',
    setup: '#include <stdlib.h>',
    setupCode: '#include <stdlib.h>',
    expected: 'malloc(10 * sizeof(int))',
    sample: 'int *arr = (int *)malloc(10 * sizeof(int))',
    hints: [
      'malloc returns void*, cast to appropriate type',
      'Always use sizeof for portability',
    ],
    validPatterns: [
      /malloc\s*\(\s*10\s*\*\s*sizeof\s*\(\s*int\s*\)\s*\)/,
    ],
    tags: ['malloc', 'stdlib.h', 'memory'],
  },
  {
    id: 'c-calloc',
    category: 'Memory Allocation',
    difficulty: 'medium',
    title: 'Allocate Zeroed Memory with calloc',
    text: 'Allocate and zero-initialize memory for 10 integers using calloc()',
    setup: '#include <stdlib.h>',
    setupCode: '#include <stdlib.h>',
    expected: 'calloc(10, sizeof(int))',
    sample: 'int *arr = (int *)calloc(10, sizeof(int))',
    hints: [
      'calloc(n, size) allocates n elements of size bytes',
      'Memory is zero-initialized',
    ],
    validPatterns: [
      /calloc\s*\(\s*10\s*,\s*sizeof\s*\(\s*int\s*\)\s*\)/,
    ],
    tags: ['calloc', 'stdlib.h', 'memory'],
  },
  {
    id: 'c-realloc',
    category: 'Memory Allocation',
    difficulty: 'medium',
    title: 'Resize Memory with realloc',
    text: 'Resize the allocated array to hold 20 integers using realloc()',
    setup: '#include <stdlib.h>\nint *arr = (int *)malloc(10 * sizeof(int));',
    setupCode: '#include <stdlib.h>\nint *arr = (int *)malloc(10 * sizeof(int));',
    expected: 'realloc(arr, 20 * sizeof(int))',
    sample: 'arr = (int *)realloc(arr, 20 * sizeof(int))',
    hints: [
      'realloc may move the memory block',
      'Original contents are preserved',
    ],
    validPatterns: [
      /realloc\s*\(\s*arr\s*,\s*20\s*\*\s*sizeof\s*\(\s*int\s*\)\s*\)/,
    ],
    tags: ['realloc', 'stdlib.h', 'memory'],
  },
  {
    id: 'c-free',
    category: 'Memory Allocation',
    difficulty: 'easy',
    title: 'Free Allocated Memory',
    text: 'Free the dynamically allocated memory',
    setup: '#include <stdlib.h>\nint *arr = (int *)malloc(10 * sizeof(int));',
    setupCode: '#include <stdlib.h>\nint *arr = (int *)malloc(10 * sizeof(int));',
    expected: 'free(arr)',
    sample: 'free(arr)',
    hints: [
      'Always free allocated memory when done',
      'Set pointer to NULL after freeing to avoid dangling pointer',
    ],
    validPatterns: [
      /free\s*\(\s*arr\s*\)/,
    ],
    tags: ['free', 'stdlib.h', 'memory'],
  },
  {
    id: 'c-atoi',
    category: 'Conversion Functions',
    difficulty: 'easy',
    title: 'Convert String to Integer with atoi',
    text: 'Convert the string "42" to an integer using atoi()',
    setup: '#include <stdlib.h>\nchar str[] = "42";',
    setupCode: '#include <stdlib.h>\nchar str[] = "42";',
    expected: 'atoi(str)',
    sample: 'int num = atoi(str)',
    hints: [
      'atoi returns 0 on failure',
      'Consider strtol for better error handling',
    ],
    validPatterns: [
      /atoi\s*\(\s*str\s*\)/,
    ],
    tags: ['atoi', 'stdlib.h', 'conversion'],
  },
  {
    id: 'c-atof',
    category: 'Conversion Functions',
    difficulty: 'easy',
    title: 'Convert String to Float with atof',
    text: 'Convert the string "3.14" to a double using atof()',
    setup: '#include <stdlib.h>\nchar str[] = "3.14";',
    setupCode: '#include <stdlib.h>\nchar str[] = "3.14";',
    expected: 'atof(str)',
    sample: 'double num = atof(str)',
    hints: [
      'atof returns double, not float',
      'Returns 0.0 on failure',
    ],
    validPatterns: [
      /atof\s*\(\s*str\s*\)/,
    ],
    tags: ['atof', 'stdlib.h', 'conversion'],
  },
  {
    id: 'c-strtol',
    category: 'Conversion Functions',
    difficulty: 'medium',
    title: 'Convert String to Long with strtol',
    text: 'Convert the string "255" to a long integer with base 10 using strtol()',
    setup: '#include <stdlib.h>\nchar str[] = "255";\nchar *endptr;',
    setupCode: '#include <stdlib.h>\nchar str[] = "255";\nchar *endptr;',
    expected: 'strtol(str, &endptr, 10)',
    sample: 'long num = strtol(str, &endptr, 10)',
    hints: [
      'strtol provides better error handling than atoi',
      'Third argument is the base (2-36, or 0 for auto)',
    ],
    validPatterns: [
      /strtol\s*\(\s*str\s*,\s*&?endptr\s*,\s*10\s*\)/,
      /strtol\s*\(\s*str\s*,\s*NULL\s*,\s*10\s*\)/,
    ],
    tags: ['strtol', 'stdlib.h', 'conversion'],
  },
  {
    id: 'c-abs',
    category: 'Math Functions',
    difficulty: 'easy',
    title: 'Absolute Value with abs',
    text: 'Get the absolute value of -42 using abs()',
    setup: '#include <stdlib.h>\nint num = -42;',
    setupCode: '#include <stdlib.h>\nint num = -42;',
    expected: 'abs(num)',
    sample: 'int result = abs(num)',
    hints: [
      'abs works with integers',
      'Use fabs from math.h for floating point',
    ],
    validPatterns: [
      /abs\s*\(\s*num\s*\)/,
    ],
    tags: ['abs', 'stdlib.h', 'math'],
  },
  {
    id: 'c-qsort',
    category: 'Algorithm Functions',
    difficulty: 'hard',
    title: 'Sort Array with qsort',
    text: 'Sort the integer array in ascending order using qsort()',
    setup: '#include <stdlib.h>\nint arr[] = {5, 2, 8, 1, 9};\nint n = 5;\n\nint compare(const void *a, const void *b) {\n    return (*(int*)a - *(int*)b);\n}',
    setupCode: '#include <stdlib.h>\nint arr[] = {5, 2, 8, 1, 9};\nint n = 5;\nint compare(const void *a, const void *b) { return (*(int*)a - *(int*)b); }',
    expected: 'qsort(arr, n, sizeof(int), compare)',
    sample: 'qsort(arr, n, sizeof(int), compare)',
    hints: [
      'qsort(array, count, size, comparator)',
      'Comparator returns negative, zero, or positive',
    ],
    validPatterns: [
      /qsort\s*\(\s*arr\s*,\s*n\s*,\s*sizeof\s*\(\s*int\s*\)\s*,\s*compare\s*\)/,
    ],
    tags: ['qsort', 'stdlib.h', 'sorting'],
  },
  {
    id: 'c-bsearch',
    category: 'Algorithm Functions',
    difficulty: 'hard',
    title: 'Binary Search with bsearch',
    text: 'Search for the value 5 in the sorted array using bsearch()',
    setup: '#include <stdlib.h>\nint arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 9};\nint n = 9;\nint key = 5;\n\nint compare(const void *a, const void *b) {\n    return (*(int*)a - *(int*)b);\n}',
    setupCode: '#include <stdlib.h>\nint arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 9};\nint n = 9;\nint key = 5;\nint compare(const void *a, const void *b) { return (*(int*)a - *(int*)b); }',
    expected: 'bsearch(&key, arr, n, sizeof(int), compare)',
    sample: 'int *result = (int *)bsearch(&key, arr, n, sizeof(int), compare)',
    hints: [
      'bsearch requires a sorted array',
      'Returns NULL if not found',
    ],
    validPatterns: [
      /bsearch\s*\(\s*&key\s*,\s*arr\s*,\s*n\s*,\s*sizeof\s*\(\s*int\s*\)\s*,\s*compare\s*\)/,
    ],
    tags: ['bsearch', 'stdlib.h', 'searching'],
  },
  {
    id: 'c-rand',
    category: 'Random Functions',
    difficulty: 'easy',
    title: 'Generate Random Number',
    text: 'Generate a random number between 0 and RAND_MAX',
    setup: '#include <stdlib.h>',
    setupCode: '#include <stdlib.h>',
    expected: 'rand()',
    sample: 'int random = rand()',
    hints: [
      'rand() returns int from 0 to RAND_MAX',
      'Use srand() to seed the generator',
    ],
    validPatterns: [
      /rand\s*\(\s*\)/,
    ],
    tags: ['rand', 'stdlib.h', 'random'],
  },
  {
    id: 'c-srand',
    category: 'Random Functions',
    difficulty: 'easy',
    title: 'Seed Random Generator',
    text: 'Seed the random number generator with current time',
    setup: '#include <stdlib.h>\n#include <time.h>',
    setupCode: '#include <stdlib.h>\n#include <time.h>',
    expected: 'srand(time(NULL))',
    sample: 'srand(time(NULL))',
    hints: [
      'srand sets the seed for rand()',
      'time(NULL) provides varying seed',
    ],
    validPatterns: [
      /srand\s*\(\s*time\s*\(\s*NULL\s*\)\s*\)/,
    ],
    tags: ['srand', 'stdlib.h', 'random'],
  },

  // ============================================================
  // stdio.h Patterns
  // ============================================================
  {
    id: 'c-sprintf',
    category: 'Format Functions',
    difficulty: 'medium',
    title: 'Format String with sprintf',
    text: 'Format an integer into a string buffer using sprintf()',
    setup: '#include <stdio.h>\nchar buffer[50];\nint num = 42;',
    setupCode: '#include <stdio.h>\nchar buffer[50];\nint num = 42;',
    expected: 'sprintf(buffer, "%d", num)',
    sample: 'sprintf(buffer, "%d", num)',
    hints: [
      'sprintf writes formatted output to string',
      'Buffer must be large enough',
    ],
    validPatterns: [
      /sprintf\s*\(\s*buffer\s*,\s*['"]\%d['"]\s*,\s*num\s*\)/,
    ],
    tags: ['sprintf', 'stdio.h', 'format'],
  },
  {
    id: 'c-snprintf',
    category: 'Format Functions',
    difficulty: 'medium',
    title: 'Safe Format with snprintf',
    text: 'Safely format a string with maximum buffer size using snprintf()',
    setup: '#include <stdio.h>\nchar buffer[20];\nint num = 42;',
    setupCode: '#include <stdio.h>\nchar buffer[20];\nint num = 42;',
    expected: 'snprintf(buffer, sizeof(buffer), "%d", num)',
    sample: 'snprintf(buffer, sizeof(buffer), "%d", num)',
    hints: [
      'snprintf prevents buffer overflow',
      'Second argument is maximum bytes to write',
    ],
    validPatterns: [
      /snprintf\s*\(\s*buffer\s*,\s*(sizeof\s*\(\s*buffer\s*\)|20)\s*,\s*['"]\%d['"]\s*,\s*num\s*\)/,
    ],
    tags: ['snprintf', 'stdio.h', 'format', 'safe'],
  },
  {
    id: 'c-sscanf',
    category: 'Format Functions',
    difficulty: 'medium',
    title: 'Parse String with sscanf',
    text: 'Parse an integer from a string using sscanf()',
    setup: '#include <stdio.h>\nchar str[] = "42";\nint num;',
    setupCode: '#include <stdio.h>\nchar str[] = "42";\nint num;',
    expected: 'sscanf(str, "%d", &num)',
    sample: 'sscanf(str, "%d", &num)',
    hints: [
      'sscanf reads formatted input from string',
      'Returns number of items successfully read',
    ],
    validPatterns: [
      /sscanf\s*\(\s*str\s*,\s*['"]\%d['"]\s*,\s*&num\s*\)/,
    ],
    tags: ['sscanf', 'stdio.h', 'parse'],
  },
  {
    id: 'c-printf-format',
    category: 'Format Functions',
    difficulty: 'easy',
    title: 'Printf with Multiple Format Specifiers',
    text: 'Print name and age using printf with format specifiers',
    setup: '#include <stdio.h>\nchar name[] = "Alice";\nint age = 30;',
    setupCode: '#include <stdio.h>\nchar name[] = "Alice";\nint age = 30;',
    expected: 'printf("%s is %d years old", name, age)',
    sample: 'printf("%s is %d years old\\n", name, age)',
    hints: [
      '%s for strings, %d for integers',
      'Arguments must match format specifiers',
    ],
    validPatterns: [
      /printf\s*\(\s*["'].*\%s.*\%d.*["']\s*,\s*name\s*,\s*age\s*\)/,
    ],
    tags: ['printf', 'stdio.h', 'format'],
  },

  // ============================================================
  // Array Operations (Manual Implementations)
  // ============================================================
  {
    id: 'c-array-max',
    category: 'Array Operations',
    difficulty: 'easy',
    title: 'Find Maximum in Array',
    text: 'Write code to find the maximum value in an integer array',
    setup: 'int arr[] = {3, 1, 4, 1, 5, 9, 2, 6};\nint n = 8;',
    setupCode: 'int arr[] = {3, 1, 4, 1, 5, 9, 2, 6};\nint n = 8;',
    expected: '9',
    sample: 'int max = arr[0];\nfor (int i = 1; i < n; i++) {\n    if (arr[i] > max) max = arr[i];\n}',
    hints: [
      'Initialize max with first element',
      'Compare each element with current max',
    ],
    validPatterns: [
      /for\s*\([^)]+\)/,
      /if\s*\([^)]*>\s*max/,
      /max\s*=\s*arr\s*\[/,
    ],
    tags: ['array', 'max', 'loop'],
  },
  {
    id: 'c-array-min',
    category: 'Array Operations',
    difficulty: 'easy',
    title: 'Find Minimum in Array',
    text: 'Write code to find the minimum value in an integer array',
    setup: 'int arr[] = {3, 1, 4, 1, 5, 9, 2, 6};\nint n = 8;',
    setupCode: 'int arr[] = {3, 1, 4, 1, 5, 9, 2, 6};\nint n = 8;',
    expected: '1',
    sample: 'int min = arr[0];\nfor (int i = 1; i < n; i++) {\n    if (arr[i] < min) min = arr[i];\n}',
    hints: [
      'Initialize min with first element',
      'Compare each element with current min',
    ],
    validPatterns: [
      /for\s*\([^)]+\)/,
      /if\s*\([^)]*<\s*min/,
      /min\s*=\s*arr\s*\[/,
    ],
    tags: ['array', 'min', 'loop'],
  },
  {
    id: 'c-array-sum',
    category: 'Array Operations',
    difficulty: 'easy',
    title: 'Sum Array Elements',
    text: 'Write code to calculate the sum of all elements in an integer array',
    setup: 'int arr[] = {1, 2, 3, 4, 5};\nint n = 5;',
    setupCode: 'int arr[] = {1, 2, 3, 4, 5};\nint n = 5;',
    expected: '15',
    sample: 'int sum = 0;\nfor (int i = 0; i < n; i++) {\n    sum += arr[i];\n}',
    hints: [
      'Initialize sum to 0',
      'Add each element to sum',
    ],
    validPatterns: [
      /for\s*\([^)]+\)/,
      /sum\s*\+=|sum\s*=\s*sum\s*\+/,
    ],
    tags: ['array', 'sum', 'loop'],
  },
  {
    id: 'c-array-reverse',
    category: 'Array Operations',
    difficulty: 'medium',
    title: 'Reverse Array In-Place',
    text: 'Write code to reverse an array in place',
    setup: 'int arr[] = {1, 2, 3, 4, 5};\nint n = 5;',
    setupCode: 'int arr[] = {1, 2, 3, 4, 5};\nint n = 5;',
    expected: '{5, 4, 3, 2, 1}',
    sample: 'for (int i = 0; i < n / 2; i++) {\n    int temp = arr[i];\n    arr[i] = arr[n - 1 - i];\n    arr[n - 1 - i] = temp;\n}',
    hints: [
      'Swap elements from both ends',
      'Only iterate to middle of array',
    ],
    validPatterns: [
      /for\s*\([^)]+n\s*\/\s*2/,
      /temp|swap/i,
      /arr\s*\[\s*n\s*-\s*1\s*-\s*i\s*\]/,
    ],
    tags: ['array', 'reverse', 'loop'],
  },
  {
    id: 'c-array-search-linear',
    category: 'Array Operations',
    difficulty: 'easy',
    title: 'Linear Search in Array',
    text: 'Write code to find the index of a target value in an array (-1 if not found)',
    setup: 'int arr[] = {10, 20, 30, 40, 50};\nint n = 5;\nint target = 30;',
    setupCode: 'int arr[] = {10, 20, 30, 40, 50};\nint n = 5;\nint target = 30;',
    expected: '2',
    sample: 'int index = -1;\nfor (int i = 0; i < n; i++) {\n    if (arr[i] == target) {\n        index = i;\n        break;\n    }\n}',
    hints: [
      'Initialize index to -1 for not found',
      'Break when element is found',
    ],
    validPatterns: [
      /for\s*\([^)]+\)/,
      /if\s*\([^)]*==\s*target/,
      /break/,
    ],
    tags: ['array', 'search', 'linear'],
  },
  {
    id: 'c-array-binary-search',
    category: 'Array Operations',
    difficulty: 'medium',
    title: 'Binary Search Implementation',
    text: 'Write a binary search to find target in sorted array (-1 if not found)',
    setup: 'int arr[] = {1, 3, 5, 7, 9, 11, 13};\nint n = 7;\nint target = 7;',
    setupCode: 'int arr[] = {1, 3, 5, 7, 9, 11, 13};\nint n = 7;\nint target = 7;',
    expected: '3',
    sample: 'int left = 0, right = n - 1, result = -1;\nwhile (left <= right) {\n    int mid = left + (right - left) / 2;\n    if (arr[mid] == target) { result = mid; break; }\n    else if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n}',
    hints: [
      'Use left, right, and mid pointers',
      'Avoid overflow: mid = left + (right - left) / 2',
    ],
    validPatterns: [
      /while\s*\([^)]*<=|for\s*\([^)]+\)/,
      /mid\s*=/,
      /left.*right|low.*high/i,
    ],
    tags: ['array', 'binary-search', 'algorithm'],
  },
  {
    id: 'c-array-copy',
    category: 'Array Operations',
    difficulty: 'easy',
    title: 'Copy Array Elements',
    text: 'Write code to copy elements from source array to destination array',
    setup: 'int src[] = {1, 2, 3, 4, 5};\nint dest[5];\nint n = 5;',
    setupCode: 'int src[] = {1, 2, 3, 4, 5};\nint dest[5];\nint n = 5;',
    expected: 'dest = {1, 2, 3, 4, 5}',
    sample: 'for (int i = 0; i < n; i++) {\n    dest[i] = src[i];\n}',
    hints: [
      'Iterate through all elements',
      'Can also use memcpy for this',
    ],
    validPatterns: [
      /for\s*\([^)]+\)/,
      /dest\s*\[\s*i\s*\]\s*=\s*src\s*\[\s*i\s*\]/,
    ],
    tags: ['array', 'copy', 'loop'],
  },
  {
    id: 'c-array-count-occurrences',
    category: 'Array Operations',
    difficulty: 'easy',
    title: 'Count Occurrences',
    text: 'Write code to count how many times a target value appears in the array',
    setup: 'int arr[] = {1, 2, 2, 3, 2, 4, 2};\nint n = 7;\nint target = 2;',
    setupCode: 'int arr[] = {1, 2, 2, 3, 2, 4, 2};\nint n = 7;\nint target = 2;',
    expected: '4',
    sample: 'int count = 0;\nfor (int i = 0; i < n; i++) {\n    if (arr[i] == target) count++;\n}',
    hints: [
      'Initialize counter to 0',
      'Increment when element matches target',
    ],
    validPatterns: [
      /for\s*\([^)]+\)/,
      /if\s*\([^)]*==\s*target/,
      /count\s*\+\+|count\s*\+=\s*1/,
    ],
    tags: ['array', 'count', 'loop'],
  },

  // ============================================================
  // Pointer Operations
  // ============================================================
  {
    id: 'c-pointer-swap',
    category: 'Pointer Operations',
    difficulty: 'medium',
    title: 'Swap Using Pointers',
    text: 'Write a swap function using pointers',
    setup: 'int a = 5, b = 10;',
    setupCode: 'int a = 5, b = 10;',
    expected: 'a = 10, b = 5',
    sample: 'void swap(int *x, int *y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n}\nswap(&a, &b);',
    hints: [
      'Use pointers to modify values in caller',
      'Dereference with * to access values',
    ],
    validPatterns: [
      /\*\s*\w+\s*=\s*\*\s*\w+/,
      /temp|tmp/i,
      /&\w+/,
    ],
    tags: ['pointer', 'swap', 'function'],
  },
  {
    id: 'c-pointer-array-traverse',
    category: 'Pointer Operations',
    difficulty: 'medium',
    title: 'Traverse Array with Pointer',
    text: 'Sum array elements using pointer arithmetic',
    setup: 'int arr[] = {1, 2, 3, 4, 5};\nint n = 5;',
    setupCode: 'int arr[] = {1, 2, 3, 4, 5};\nint n = 5;',
    expected: '15',
    sample: 'int sum = 0;\nint *ptr = arr;\nfor (int i = 0; i < n; i++) {\n    sum += *(ptr + i);\n}',
    hints: [
      'Array name is pointer to first element',
      'ptr + i points to arr[i]',
    ],
    validPatterns: [
      /\*\s*\(\s*ptr\s*\+|\*\s*ptr\s*\+\+|\*ptr\s*\+\+/,
      /ptr\s*=\s*arr/,
    ],
    tags: ['pointer', 'array', 'arithmetic'],
  },
];

// Helper functions
export function getCProblemById(id: string): Problem | undefined {
  return cProblems.find((p) => p.id === id);
}

export function getCProblemsByCategory(category: string): Problem[] {
  return cProblems.filter((p) => p.category === category);
}

export function getCProblemsByDifficulty(
  difficulty: Problem['difficulty']
): Problem[] {
  return cProblems.filter((p) => p.difficulty === difficulty);
}

export function getCProblemsByTag(tag: string): Problem[] {
  return cProblems.filter((p) => p.tags?.includes(tag));
}

export function getCCategories(): string[] {
  return [...new Set(cProblems.map((p) => p.category))];
}

export default cProblems;
