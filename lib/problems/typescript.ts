import type { Problem } from '../types';

/**
 * TypeScript-specific coding drill problems
 * Focuses on type-safe patterns while including standard JS methods with proper typing
 */

export const typescriptProblems: Problem[] = [
  // ============================================================
  // Type-Safe Array Methods - Filter with Type Guards
  // ============================================================
  {
    id: 'ts-filter-type-guard-nullish',
    category: 'Type-Safe Array Methods',
    difficulty: 'easy',
    title: 'Filter Nullish Values with Type Guard',
    text: 'Filter out null and undefined values from the array using a type guard predicate',
    setup: 'const items: (string | null | undefined)[] = ["a", null, "b", undefined, "c"];',
    setupCode: 'const items: (string | null | undefined)[] = ["a", null, "b", undefined, "c"];',
    expected: ['a', 'b', 'c'],
    sample: 'items.filter((x): x is string => x != null)',
    hints: [
      'Use a type guard predicate: (x): x is Type => ...',
      'x != null checks for both null and undefined',
    ],
    validPatterns: [
      /\.filter\s*\(\s*\([^)]*\)\s*:\s*\w+\s+is\s+string/,
      /!=\s*null|!==\s*null\s*&&[^)]*!==\s*undefined/,
    ],
    tags: ['filter', 'type-guard', 'nullish'],
  },
  {
    id: 'ts-filter-type-guard-numbers',
    category: 'Type-Safe Array Methods',
    difficulty: 'easy',
    title: 'Filter Numbers from Mixed Array',
    text: 'Filter only number values from the mixed array using a type guard',
    setup: 'const mixed: (string | number)[] = [1, "two", 3, "four", 5];',
    setupCode: 'const mixed: (string | number)[] = [1, "two", 3, "four", 5];',
    expected: [1, 3, 5],
    sample: 'mixed.filter((x): x is number => typeof x === "number")',
    hints: [
      'Use typeof to check for number type',
      'The type guard predicate narrows the result type',
    ],
    validPatterns: [
      /\.filter\s*\(\s*\([^)]*\)\s*:\s*\w+\s+is\s+number/,
      /typeof\s+\w+\s*===?\s*["']number["']/,
    ],
    tags: ['filter', 'type-guard', 'typeof'],
  },
  {
    id: 'ts-filter-type-guard-objects',
    category: 'Type-Safe Array Methods',
    difficulty: 'medium',
    title: 'Filter Objects with Specific Property',
    text: 'Filter items that have an "active" property set to true using a type guard',
    setup:
      'interface Item { name: string; active?: boolean; }\nconst items: Item[] = [{name: "a", active: true}, {name: "b"}, {name: "c", active: true}, {name: "d", active: false}];',
    setupCode:
      'interface Item { name: string; active?: boolean; }\nconst items: Item[] = [{name: "a", active: true}, {name: "b"}, {name: "c", active: true}, {name: "d", active: false}];',
    expected: [
      { name: 'a', active: true },
      { name: 'c', active: true },
    ],
    sample: 'items.filter((item): item is Item & { active: true } => item.active === true)',
    hints: [
      'Use intersection type to narrow the active property',
      'Check for active === true explicitly',
    ],
    validPatterns: [/\.filter\s*\(/, /active\s*===?\s*true/],
    tags: ['filter', 'type-guard', 'objects'],
  },
  {
    id: 'ts-filter-discriminated-union',
    category: 'Type-Safe Array Methods',
    difficulty: 'medium',
    title: 'Filter Discriminated Union by Type',
    text: 'Filter only "success" results from the array of discriminated union types',
    setup:
      'type Result = { type: "success"; data: string } | { type: "error"; message: string };\nconst results: Result[] = [{type: "success", data: "ok"}, {type: "error", message: "fail"}, {type: "success", data: "done"}];',
    setupCode:
      'type Result = { type: "success"; data: string } | { type: "error"; message: string };\nconst results: Result[] = [{type: "success", data: "ok"}, {type: "error", message: "fail"}, {type: "success", data: "done"}];',
    expected: [
      { type: 'success', data: 'ok' },
      { type: 'success', data: 'done' },
    ],
    sample:
      'results.filter((r): r is Extract<Result, { type: "success" }> => r.type === "success")',
    hints: [
      'Use Extract utility type to narrow discriminated unions',
      'Check the discriminant property (type)',
    ],
    validPatterns: [/\.filter\s*\(/, /type\s*===?\s*["']success["']/],
    tags: ['filter', 'type-guard', 'discriminated-union'],
  },

  // ============================================================
  // Type-Safe Array Methods - Map with Type Inference
  // ============================================================
  {
    id: 'ts-map-type-inference-basic',
    category: 'Type-Safe Array Methods',
    difficulty: 'easy',
    title: 'Map with Explicit Return Type',
    text: 'Map user objects to their names, ensuring the result is string[]',
    setup:
      'interface User { id: number; name: string; }\nconst users: User[] = [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}];',
    setupCode:
      'interface User { id: number; name: string; }\nconst users: User[] = [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}];',
    expected: ['Alice', 'Bob'],
    sample: 'users.map((user): string => user.name)',
    hints: [
      'Annotate the return type for clarity',
      'TypeScript will infer string[] for the result',
    ],
    validPatterns: [/\.map\s*\(\s*\([^)]*\)\s*(:\s*string)?\s*=>/, /\.name/],
    tags: ['map', 'type-inference'],
  },
  {
    id: 'ts-map-object-transformation',
    category: 'Type-Safe Array Methods',
    difficulty: 'medium',
    title: 'Map to New Object Shape',
    text: 'Transform users to a new shape with only id and fullName properties',
    setup:
      'interface User { id: number; firstName: string; lastName: string; email: string; }\nconst users: User[] = [{id: 1, firstName: "John", lastName: "Doe", email: "john@test.com"}];',
    setupCode:
      'interface User { id: number; firstName: string; lastName: string; email: string; }\nconst users: User[] = [{id: 1, firstName: "John", lastName: "Doe", email: "john@test.com"}];',
    expected: [{ id: 1, fullName: 'John Doe' }],
    sample:
      'users.map((u): { id: number; fullName: string } => ({ id: u.id, fullName: `${u.firstName} ${u.lastName}` }))',
    hints: [
      'Use object literal with explicit type annotation',
      'Template literals for string concatenation',
    ],
    validPatterns: [/\.map\s*\(/, /fullName/, /firstName.*lastName|lastName.*firstName/],
    tags: ['map', 'object-transformation'],
  },
  {
    id: 'ts-map-with-index',
    category: 'Type-Safe Array Methods',
    difficulty: 'easy',
    title: 'Map with Index Parameter',
    text: 'Map items to objects containing the value and its index',
    setup: 'const items: string[] = ["a", "b", "c"];',
    setupCode: 'const items: string[] = ["a", "b", "c"];',
    expected: [
      { value: 'a', index: 0 },
      { value: 'b', index: 1 },
      { value: 'c', index: 2 },
    ],
    sample: 'items.map((value, index) => ({ value, index }))',
    hints: ['map callback receives (value, index, array)', 'Use shorthand property syntax'],
    validPatterns: [/\.map\s*\(\s*\([^,]+,\s*\w+/, /index/i],
    tags: ['map', 'index'],
  },

  // ============================================================
  // Type-Safe Array Methods - Reduce with Explicit Types
  // ============================================================
  {
    id: 'ts-reduce-sum',
    category: 'Type-Safe Array Methods',
    difficulty: 'easy',
    title: 'Reduce to Sum with Explicit Type',
    text: 'Sum all numbers in the array using reduce with explicit type annotation',
    setup: 'const numbers: number[] = [1, 2, 3, 4, 5];',
    setupCode: 'const numbers: number[] = [1, 2, 3, 4, 5];',
    expected: 15,
    sample: 'numbers.reduce((acc: number, curr: number): number => acc + curr, 0)',
    hints: [
      'Provide type annotations for accumulator and current value',
      'Initial value should be 0 for sum',
    ],
    validPatterns: [/\.reduce\s*\(/, /\+/, /,\s*0\s*\)/],
    tags: ['reduce', 'sum'],
  },
  {
    id: 'ts-reduce-to-object',
    category: 'Type-Safe Array Methods',
    difficulty: 'medium',
    title: 'Reduce Array to Object Map',
    text: 'Convert array of users to an object keyed by id',
    setup:
      'interface User { id: number; name: string; }\nconst users: User[] = [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}];',
    setupCode:
      'interface User { id: number; name: string; }\nconst users: User[] = [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}];',
    expected: { 1: { id: 1, name: 'Alice' }, 2: { id: 2, name: 'Bob' } },
    sample: 'users.reduce<Record<number, User>>((acc, user) => ({ ...acc, [user.id]: user }), {})',
    hints: [
      'Use generic parameter reduce<T> to specify accumulator type',
      'Record<K, V> is useful for object maps',
    ],
    validPatterns: [/\.reduce\s*(<[^>]+>)?\s*\(/, /\[.*\.id\]/],
    tags: ['reduce', 'object', 'record'],
  },
  {
    id: 'ts-reduce-group-by',
    category: 'Type-Safe Array Methods',
    difficulty: 'hard',
    title: 'Reduce to Group By Category',
    text: 'Group items by their category property',
    setup:
      'interface Item { name: string; category: string; }\nconst items: Item[] = [{name: "a", category: "x"}, {name: "b", category: "y"}, {name: "c", category: "x"}];',
    setupCode:
      'interface Item { name: string; category: string; }\nconst items: Item[] = [{name: "a", category: "x"}, {name: "b", category: "y"}, {name: "c", category: "x"}];',
    expected: {
      x: [
        { name: 'a', category: 'x' },
        { name: 'c', category: 'x' },
      ],
      y: [{ name: 'b', category: 'y' }],
    },
    sample:
      'items.reduce<Record<string, Item[]>>((acc, item) => ({ ...acc, [item.category]: [...(acc[item.category] || []), item] }), {})',
    hints: [
      'Use Record<string, Item[]> for grouped structure',
      'Handle case where category key does not exist yet',
    ],
    validPatterns: [/\.reduce/, /category/, /\[\s*item\.category\s*\]/],
    tags: ['reduce', 'group-by'],
  },

  // ============================================================
  // Type-Safe Array Methods - Find with Type Narrowing
  // ============================================================
  {
    id: 'ts-find-with-predicate',
    category: 'Type-Safe Array Methods',
    difficulty: 'easy',
    title: 'Find Element with Predicate',
    text: 'Find the first user with age greater than 25',
    setup:
      'interface User { name: string; age: number; }\nconst users: User[] = [{name: "Alice", age: 20}, {name: "Bob", age: 30}, {name: "Carol", age: 25}];',
    setupCode:
      'interface User { name: string; age: number; }\nconst users: User[] = [{name: "Alice", age: 20}, {name: "Bob", age: 30}, {name: "Carol", age: 25}];',
    expected: { name: 'Bob', age: 30 },
    sample: 'users.find((user) => user.age > 25)',
    hints: ['find returns T | undefined', 'Use a simple predicate function'],
    validPatterns: [/\.find\s*\(/, /age\s*>\s*25/],
    tags: ['find', 'predicate'],
  },
  {
    id: 'ts-find-with-assertion',
    category: 'Type-Safe Array Methods',
    difficulty: 'medium',
    title: 'Find with Non-Null Assertion',
    text: 'Find the admin user (guaranteed to exist) using non-null assertion',
    setup:
      'interface User { name: string; role: "admin" | "user"; }\nconst users: User[] = [{name: "Alice", role: "user"}, {name: "Bob", role: "admin"}];',
    setupCode:
      'interface User { name: string; role: "admin" | "user"; }\nconst users: User[] = [{name: "Alice", role: "user"}, {name: "Bob", role: "admin"}];',
    expected: { name: 'Bob', role: 'admin' },
    sample: 'users.find((u) => u.role === "admin")!',
    hints: [
      'Use ! for non-null assertion when you know the value exists',
      'Be careful: this bypasses type safety',
    ],
    validPatterns: [/\.find\s*\([^)]+\)\s*!/, /role\s*===?\s*["']admin["']/],
    tags: ['find', 'non-null-assertion'],
  },

  // ============================================================
  // Utility Types in Practice
  // ============================================================
  {
    id: 'ts-partial-update',
    category: 'Utility Types',
    difficulty: 'easy',
    title: 'Partial for Optional Updates',
    text: 'Use Partial<T> to create an update object with only name changed',
    setup:
      'interface User { id: number; name: string; email: string; }\nconst user: User = { id: 1, name: "Alice", email: "alice@test.com" };',
    setupCode:
      'interface User { id: number; name: string; email: string; }\nconst user: User = { id: 1, name: "Alice", email: "alice@test.com" };',
    expected: { id: 1, name: 'Bob', email: 'alice@test.com' },
    sample: '({ ...user, ...({ name: "Bob" } as Partial<User>) })',
    hints: [
      'Partial<T> makes all properties optional',
      'Spread the partial update over the original',
    ],
    validPatterns: [/Partial\s*<\s*User\s*>/, /name.*Bob|Bob.*name/],
    tags: ['partial', 'utility-types'],
  },
  {
    id: 'ts-pick-subset',
    category: 'Utility Types',
    difficulty: 'easy',
    title: 'Pick Specific Properties',
    text: 'Create an object with only id and name from the user using Pick',
    setup:
      'interface User { id: number; name: string; email: string; age: number; }\nconst user: User = { id: 1, name: "Alice", email: "a@test.com", age: 30 };',
    setupCode:
      'interface User { id: number; name: string; email: string; age: number; }\nconst user: User = { id: 1, name: "Alice", email: "a@test.com", age: 30 };',
    expected: { id: 1, name: 'Alice' },
    sample: '(({ id, name }): Pick<User, "id" | "name"> => ({ id, name }))(user)',
    hints: [
      'Pick<T, K> extracts only specified properties',
      'Destructure to get only needed properties',
    ],
    validPatterns: [/Pick\s*<\s*User/, /["']id["'].*["']name["']|["']name["'].*["']id["']/],
    tags: ['pick', 'utility-types'],
  },
  {
    id: 'ts-omit-exclude-props',
    category: 'Utility Types',
    difficulty: 'easy',
    title: 'Omit Sensitive Properties',
    text: 'Create a safe user object without password using Omit',
    setup:
      'interface User { id: number; name: string; password: string; }\nconst user: User = { id: 1, name: "Alice", password: "secret123" };',
    setupCode:
      'interface User { id: number; name: string; password: string; }\nconst user: User = { id: 1, name: "Alice", password: "secret123" };',
    expected: { id: 1, name: 'Alice' },
    sample: '(({ password, ...rest }): Omit<User, "password"> => rest)(user)',
    hints: [
      'Omit<T, K> removes specified properties',
      'Destructure with rest to exclude properties',
    ],
    validPatterns: [/Omit\s*<\s*User/, /password/],
    tags: ['omit', 'utility-types'],
  },
  {
    id: 'ts-record-create-map',
    category: 'Utility Types',
    difficulty: 'medium',
    title: 'Record for Type-Safe Object Map',
    text: 'Create a Record mapping status strings to boolean values',
    setup: 'type Status = "pending" | "active" | "completed";',
    setupCode: 'type Status = "pending" | "active" | "completed";',
    expected: { pending: false, active: true, completed: false },
    sample: '({ pending: false, active: true, completed: false } as Record<Status, boolean>)',
    hints: [
      'Record<K, V> creates an object type with keys K and values V',
      'All keys from the union must be present',
    ],
    validPatterns: [/Record\s*<\s*Status\s*,\s*boolean\s*>/, /pending.*active.*completed/],
    tags: ['record', 'utility-types'],
  },
  {
    id: 'ts-required-make-mandatory',
    category: 'Utility Types',
    difficulty: 'medium',
    title: 'Required to Remove Optional',
    text: 'Convert partial config to required config, providing all values',
    setup:
      'interface Config { host?: string; port?: number; debug?: boolean; }\nconst partial: Partial<Config> = { host: "localhost" };',
    setupCode:
      'interface Config { host?: string; port?: number; debug?: boolean; }\nconst partial: Partial<Config> = { host: "localhost" };',
    expected: { host: 'localhost', port: 3000, debug: false },
    sample:
      '({ host: partial.host || "localhost", port: partial.port || 3000, debug: partial.debug || false } as Required<Config>)',
    hints: [
      'Required<T> makes all properties mandatory',
      'Provide default values for missing properties',
    ],
    validPatterns: [/Required\s*<\s*Config\s*>/, /host.*port.*debug/],
    tags: ['required', 'utility-types'],
  },
  {
    id: 'ts-readonly-immutable',
    category: 'Utility Types',
    difficulty: 'easy',
    title: 'Readonly for Immutable Data',
    text: 'Create a readonly version of the config object',
    setup:
      'interface Config { apiKey: string; timeout: number; }\nconst config: Config = { apiKey: "abc123", timeout: 5000 };',
    setupCode:
      'interface Config { apiKey: string; timeout: number; }\nconst config: Config = { apiKey: "abc123", timeout: 5000 };',
    expected: { apiKey: 'abc123', timeout: 5000 },
    sample: '(config as Readonly<Config>)',
    hints: ['Readonly<T> makes all properties readonly', 'Prevents accidental mutations'],
    validPatterns: [/Readonly\s*<\s*Config\s*>/],
    tags: ['readonly', 'utility-types'],
  },
  {
    id: 'ts-extract-union-member',
    category: 'Utility Types',
    difficulty: 'medium',
    title: 'Extract Union Members',
    text: 'Extract only string types from the union',
    setup: 'type Mixed = string | number | boolean | null;\nconst value: Mixed = "hello";',
    setupCode: 'type Mixed = string | number | boolean | null;\nconst value: Mixed = "hello";',
    expected: 'hello',
    sample: '(value as Extract<Mixed, string>)',
    hints: [
      'Extract<T, U> extracts types from T that are assignable to U',
      'Useful for narrowing union types',
    ],
    validPatterns: [/Extract\s*<\s*Mixed\s*,\s*string\s*>/],
    tags: ['extract', 'utility-types'],
  },
  {
    id: 'ts-exclude-union-member',
    category: 'Utility Types',
    difficulty: 'medium',
    title: 'Exclude Union Members',
    text: 'Create a type excluding null from the union and cast the value',
    setup: 'type MaybeString = string | null;\nconst value: MaybeString = "hello";',
    setupCode: 'type MaybeString = string | null;\nconst value: MaybeString = "hello";',
    expected: 'hello',
    sample: '(value as Exclude<MaybeString, null>)',
    hints: [
      'Exclude<T, U> removes types from T that are assignable to U',
      'Commonly used to remove null or undefined',
    ],
    validPatterns: [/Exclude\s*<\s*MaybeString\s*,\s*null\s*>/],
    tags: ['exclude', 'utility-types'],
  },
  {
    id: 'ts-nonnullable-type',
    category: 'Utility Types',
    difficulty: 'easy',
    title: 'NonNullable for Non-Null Values',
    text: 'Assert that the value is non-nullable',
    setup: 'type Maybe<T> = T | null | undefined;\nconst value: Maybe<string> = "hello";',
    setupCode: 'type Maybe<T> = T | null | undefined;\nconst value: Maybe<string> = "hello";',
    expected: 'hello',
    sample: '(value as NonNullable<Maybe<string>>)',
    hints: [
      'NonNullable<T> removes null and undefined from T',
      'Equivalent to Exclude<T, null | undefined>',
    ],
    validPatterns: [/NonNullable\s*</],
    tags: ['nonnullable', 'utility-types'],
  },

  // ============================================================
  // Object Operations
  // ============================================================
  {
    id: 'ts-object-keys-assertion',
    category: 'Object Operations',
    difficulty: 'medium',
    title: 'Object.keys with Type Assertion',
    text: 'Get typed keys of the object using Object.keys with assertion',
    setup:
      'interface User { name: string; age: number; }\nconst user: User = { name: "Alice", age: 30 };',
    setupCode:
      'interface User { name: string; age: number; }\nconst user: User = { name: "Alice", age: 30 };',
    expected: ['name', 'age'],
    sample: '(Object.keys(user) as (keyof User)[])',
    hints: ['Object.keys returns string[], not keyof T[]', 'Cast to (keyof T)[] for type safety'],
    validPatterns: [/Object\.keys\s*\(/, /as\s*\(\s*keyof\s+User\s*\)\s*\[\s*\]/],
    tags: ['object-keys', 'type-assertion'],
  },
  {
    id: 'ts-object-entries-typed',
    category: 'Object Operations',
    difficulty: 'medium',
    title: 'Object.entries with Types',
    text: 'Get typed entries of the scores object',
    setup: 'const scores: Record<string, number> = { alice: 100, bob: 85 };',
    setupCode: 'const scores: Record<string, number> = { alice: 100, bob: 85 };',
    expected: [
      ['alice', 100],
      ['bob', 85],
    ],
    sample: 'Object.entries(scores) as [string, number][]',
    hints: [
      'Object.entries returns [string, unknown][]',
      'Cast to specific tuple type for better typing',
    ],
    validPatterns: [/Object\.entries\s*\(/, /as\s*\[\s*string\s*,\s*number\s*\]\s*\[\s*\]/],
    tags: ['object-entries', 'type-assertion'],
  },
  {
    id: 'ts-object-values',
    category: 'Object Operations',
    difficulty: 'easy',
    title: 'Object.values with Type',
    text: 'Get all values from the config object',
    setup: 'const config: Record<string, string> = { host: "localhost", env: "dev" };',
    setupCode: 'const config: Record<string, string> = { host: "localhost", env: "dev" };',
    expected: ['localhost', 'dev'],
    sample: 'Object.values(config)',
    hints: ['Object.values extracts all values', 'Return type is inferred from Record value type'],
    validPatterns: [/Object\.values\s*\(\s*config\s*\)/],
    tags: ['object-values'],
  },
  {
    id: 'ts-object-fromentries',
    category: 'Object Operations',
    difficulty: 'medium',
    title: 'Object.fromEntries with Type',
    text: 'Create an object from key-value pairs with proper typing',
    setup: 'const entries: [string, number][] = [["a", 1], ["b", 2]];',
    setupCode: 'const entries: [string, number][] = [["a", 1], ["b", 2]];',
    expected: { a: 1, b: 2 },
    sample: 'Object.fromEntries(entries) as Record<string, number>',
    hints: ['Object.fromEntries converts entries to object', 'Cast to Record for better typing'],
    validPatterns: [/Object\.fromEntries\s*\(/],
    tags: ['object-fromEntries'],
  },
  {
    id: 'ts-object-assign-typed',
    category: 'Object Operations',
    difficulty: 'medium',
    title: 'Object.assign with Type Safety',
    text: 'Merge objects with type safety',
    setup:
      'interface Base { id: number; }\ninterface Extended extends Base { name: string; }\nconst base: Base = { id: 1 };',
    setupCode:
      'interface Base { id: number; }\ninterface Extended extends Base { name: string; }\nconst base: Base = { id: 1 };',
    expected: { id: 1, name: 'Alice' },
    sample: 'Object.assign({}, base, { name: "Alice" }) as Extended',
    hints: ['Object.assign merges objects left to right', 'Cast to the extended type'],
    validPatterns: [/Object\.assign\s*\(/, /name.*Alice/],
    tags: ['object-assign'],
  },

  // ============================================================
  // Standard Array Methods (with Types)
  // ============================================================
  {
    id: 'ts-array-some',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Array some with Predicate',
    text: 'Check if any number is greater than 10',
    setup: 'const numbers: number[] = [1, 5, 8, 12, 3];',
    setupCode: 'const numbers: number[] = [1, 5, 8, 12, 3];',
    expected: true,
    sample: 'numbers.some((n) => n > 10)',
    hints: ['some returns true if any element passes the test', 'Short-circuits on first true'],
    validPatterns: [/\.some\s*\(/, />\s*10/],
    tags: ['some', 'predicate'],
  },
  {
    id: 'ts-array-every',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Array every with Predicate',
    text: 'Check if all numbers are positive',
    setup: 'const numbers: number[] = [1, 5, 8, 12, 3];',
    setupCode: 'const numbers: number[] = [1, 5, 8, 12, 3];',
    expected: true,
    sample: 'numbers.every((n) => n > 0)',
    hints: ['every returns true if all elements pass the test', 'Short-circuits on first false'],
    validPatterns: [/\.every\s*\(/, />\s*0/],
    tags: ['every', 'predicate'],
  },
  {
    id: 'ts-array-includes',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Array includes Check',
    text: 'Check if the array includes the value 5',
    setup: 'const numbers: number[] = [1, 2, 3, 4, 5];',
    setupCode: 'const numbers: number[] = [1, 2, 3, 4, 5];',
    expected: true,
    sample: 'numbers.includes(5)',
    hints: ['includes uses strict equality', 'Returns boolean'],
    validPatterns: [/\.includes\s*\(\s*5\s*\)/],
    tags: ['includes'],
  },
  {
    id: 'ts-array-findindex',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Find Index of Element',
    text: 'Find the index of the first even number',
    setup: 'const numbers: number[] = [1, 3, 4, 7, 8];',
    setupCode: 'const numbers: number[] = [1, 3, 4, 7, 8];',
    expected: 2,
    sample: 'numbers.findIndex((n) => n % 2 === 0)',
    hints: ['findIndex returns -1 if not found', 'Returns index of first matching element'],
    validPatterns: [/\.findIndex\s*\(/, /%\s*2\s*===?\s*0/],
    tags: ['findIndex'],
  },
  {
    id: 'ts-array-flat',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Flatten Nested Array',
    text: 'Flatten the nested array by one level',
    setup: 'const nested: number[][] = [[1, 2], [3, 4], [5]];',
    setupCode: 'const nested: number[][] = [[1, 2], [3, 4], [5]];',
    expected: [1, 2, 3, 4, 5],
    sample: 'nested.flat()',
    hints: ['flat() flattens by depth 1 by default', 'Pass depth for deeper flattening'],
    validPatterns: [/\.flat\s*\(/],
    tags: ['flat'],
  },
  {
    id: 'ts-array-flatmap',
    category: 'Array Methods',
    difficulty: 'medium',
    title: 'FlatMap Array',
    text: 'Double each number and flatten the result',
    setup: 'const numbers: number[] = [1, 2, 3];',
    setupCode: 'const numbers: number[] = [1, 2, 3];',
    expected: [1, 1, 2, 2, 3, 3],
    sample: 'numbers.flatMap((n) => [n, n])',
    hints: ['flatMap = map + flat(1)', 'Return an array from the callback'],
    validPatterns: [/\.flatMap\s*\(/, /\[\s*n\s*,\s*n\s*\]/],
    tags: ['flatMap'],
  },
  {
    id: 'ts-array-slice',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Slice Array',
    text: 'Get elements from index 1 to 3 (exclusive)',
    setup: 'const arr: string[] = ["a", "b", "c", "d", "e"];',
    setupCode: 'const arr: string[] = ["a", "b", "c", "d", "e"];',
    expected: ['b', 'c'],
    sample: 'arr.slice(1, 3)',
    hints: ['slice(start, end) - end is exclusive', 'Does not modify original array'],
    validPatterns: [/\.slice\s*\(\s*1\s*,\s*3\s*\)/],
    tags: ['slice'],
  },
  {
    id: 'ts-array-concat',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Concatenate Arrays',
    text: 'Concatenate two number arrays',
    setup: 'const a: number[] = [1, 2];\nconst b: number[] = [3, 4];',
    setupCode: 'const a: number[] = [1, 2];\nconst b: number[] = [3, 4];',
    expected: [1, 2, 3, 4],
    sample: 'a.concat(b)',
    hints: ['concat creates a new array', 'Can also use spread: [...a, ...b]'],
    validPatterns: [/\.concat\s*\(|\.\.\.a.*\.\.\.b/],
    tags: ['concat'],
  },
  {
    id: 'ts-array-join',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Join Array Elements',
    text: 'Join array elements with a comma and space',
    setup: 'const words: string[] = ["Hello", "World"];',
    setupCode: 'const words: string[] = ["Hello", "World"];',
    expected: 'Hello, World',
    sample: 'words.join(", ")',
    hints: ['join converts array to string', 'Separator defaults to comma'],
    validPatterns: [/\.join\s*\(\s*["'],\s*["']\s*\)/],
    tags: ['join'],
  },
  {
    id: 'ts-array-reverse',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Reverse Array (Non-Mutating)',
    text: 'Reverse the array without mutating the original',
    setup: 'const arr: number[] = [1, 2, 3, 4, 5];',
    setupCode: 'const arr: number[] = [1, 2, 3, 4, 5];',
    expected: [5, 4, 3, 2, 1],
    sample: '[...arr].reverse()',
    hints: ['reverse() mutates the original array', 'Spread first to create a copy'],
    validPatterns: [/\[\s*\.\.\.arr\s*\]\.reverse\s*\(\)|arr\.slice\s*\(\s*\)\.reverse\s*\(\)/],
    tags: ['reverse', 'immutable'],
  },
  {
    id: 'ts-array-sort-numbers',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Sort Numbers Correctly',
    text: 'Sort numbers in ascending order',
    setup: 'const numbers: number[] = [10, 2, 30, 4, 5];',
    setupCode: 'const numbers: number[] = [10, 2, 30, 4, 5];',
    expected: [2, 4, 5, 10, 30],
    sample: '[...numbers].sort((a, b) => a - b)',
    hints: ['Default sort converts to strings', 'Use compare function for numbers'],
    validPatterns: [/\.sort\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>\s*\w+\s*-\s*\w+\s*\)/],
    tags: ['sort', 'numbers'],
  },
  {
    id: 'ts-array-fill',
    category: 'Array Methods',
    difficulty: 'easy',
    title: 'Fill Array with Value',
    text: 'Create an array of 5 zeros',
    setup: 'const size: number = 5;',
    setupCode: 'const size: number = 5;',
    expected: [0, 0, 0, 0, 0],
    sample: 'new Array(size).fill(0)',
    hints: ['Array(n) creates empty array of length n', 'fill fills all elements with value'],
    validPatterns: [/Array\s*\(\s*size\s*\)\.fill\s*\(\s*0\s*\)|Array\.from\s*\(/],
    tags: ['fill', 'array-creation'],
  },
  {
    id: 'ts-array-from-range',
    category: 'Array Methods',
    difficulty: 'medium',
    title: 'Create Range Array',
    text: 'Create an array [0, 1, 2, 3, 4] using Array.from',
    setup: 'const length: number = 5;',
    setupCode: 'const length: number = 5;',
    expected: [0, 1, 2, 3, 4],
    sample: 'Array.from({ length }, (_, i) => i)',
    hints: ['Array.from accepts array-like object', 'Second argument is map function'],
    validPatterns: [/Array\.from\s*\(\s*\{\s*length/],
    tags: ['Array.from', 'range'],
  },

  // ============================================================
  // String Methods
  // ============================================================
  {
    id: 'ts-string-split',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Split String to Array',
    text: 'Split the string by spaces',
    setup: 'const str: string = "Hello World TypeScript";',
    setupCode: 'const str: string = "Hello World TypeScript";',
    expected: ['Hello', 'World', 'TypeScript'],
    sample: 'str.split(" ")',
    hints: ['split returns string[]', 'Separator can be string or RegExp'],
    validPatterns: [/\.split\s*\(\s*["']\s*["']\s*\)/],
    tags: ['split'],
  },
  {
    id: 'ts-string-trim',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Trim Whitespace',
    text: 'Remove leading and trailing whitespace',
    setup: 'const str: string = "  Hello World  ";',
    setupCode: 'const str: string = "  Hello World  ";',
    expected: 'Hello World',
    sample: 'str.trim()',
    hints: [
      'trim removes both leading and trailing whitespace',
      'trimStart and trimEnd for one side only',
    ],
    validPatterns: [/\.trim\s*\(\s*\)/],
    tags: ['trim'],
  },
  {
    id: 'ts-string-replace',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Replace Substring',
    text: 'Replace "World" with "TypeScript"',
    setup: 'const str: string = "Hello World";',
    setupCode: 'const str: string = "Hello World";',
    expected: 'Hello TypeScript',
    sample: 'str.replace("World", "TypeScript")',
    hints: ['replace only replaces first occurrence', 'Use replaceAll for all occurrences'],
    validPatterns: [/\.replace\s*\(\s*["']World["']\s*,\s*["']TypeScript["']\s*\)/],
    tags: ['replace'],
  },
  {
    id: 'ts-string-startswith',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Check String Start',
    text: 'Check if the string starts with "Hello"',
    setup: 'const str: string = "Hello World";',
    setupCode: 'const str: string = "Hello World";',
    expected: true,
    sample: 'str.startsWith("Hello")',
    hints: ['startsWith is case-sensitive', 'Returns boolean'],
    validPatterns: [/\.startsWith\s*\(\s*["']Hello["']\s*\)/],
    tags: ['startsWith'],
  },
  {
    id: 'ts-string-padstart',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Pad String Start',
    text: 'Pad the number string to 5 characters with zeros',
    setup: 'const num: string = "42";',
    setupCode: 'const num: string = "42";',
    expected: '00042',
    sample: 'num.padStart(5, "0")',
    hints: ['padStart adds padding at the beginning', 'First arg is target length'],
    validPatterns: [/\.padStart\s*\(\s*5\s*,\s*["']0["']\s*\)/],
    tags: ['padStart'],
  },
  {
    id: 'ts-string-repeat',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Repeat String',
    text: 'Repeat the string 3 times',
    setup: 'const str: string = "ab";',
    setupCode: 'const str: string = "ab";',
    expected: 'ababab',
    sample: 'str.repeat(3)',
    hints: ['repeat returns new string', 'Count must be non-negative'],
    validPatterns: [/\.repeat\s*\(\s*3\s*\)/],
    tags: ['repeat'],
  },

  // ============================================================
  // Set Operations
  // ============================================================
  {
    id: 'ts-set-from-array',
    category: 'Set Operations',
    difficulty: 'easy',
    title: 'Create Set from Array',
    text: 'Create a Set from the array to get unique values',
    setup: 'const arr: number[] = [1, 2, 2, 3, 3, 3];',
    setupCode: 'const arr: number[] = [1, 2, 2, 3, 3, 3];',
    expected: [1, 2, 3],
    sample: '[...new Set(arr)]',
    hints: ['Set automatically removes duplicates', 'Spread to convert back to array'],
    validPatterns: [/new\s+Set\s*\(\s*arr\s*\)/, /\[\s*\.\.\./],
    tags: ['Set', 'unique'],
  },
  {
    id: 'ts-set-has',
    category: 'Set Operations',
    difficulty: 'easy',
    title: 'Check Set Membership',
    text: 'Check if the set contains the value 3',
    setup: 'const set: Set<number> = new Set([1, 2, 3, 4, 5]);',
    setupCode: 'const set: Set<number> = new Set([1, 2, 3, 4, 5]);',
    expected: true,
    sample: 'set.has(3)',
    hints: ['has returns boolean', 'O(1) lookup time'],
    validPatterns: [/\.has\s*\(\s*3\s*\)/],
    tags: ['Set', 'has'],
  },
  {
    id: 'ts-set-intersection',
    category: 'Set Operations',
    difficulty: 'medium',
    title: 'Set Intersection',
    text: 'Find common elements between two sets',
    setup:
      'const setA: Set<number> = new Set([1, 2, 3]);\nconst setB: Set<number> = new Set([2, 3, 4]);',
    setupCode:
      'const setA: Set<number> = new Set([1, 2, 3]);\nconst setB: Set<number> = new Set([2, 3, 4]);',
    expected: [2, 3],
    sample: '[...setA].filter((x) => setB.has(x))',
    hints: ['Convert to array and filter', 'Check membership with has()'],
    validPatterns: [/\.filter\s*\(/, /\.has\s*\(/],
    tags: ['Set', 'intersection'],
  },
  {
    id: 'ts-set-difference',
    category: 'Set Operations',
    difficulty: 'medium',
    title: 'Set Difference',
    text: 'Find elements in setA that are not in setB',
    setup:
      'const setA: Set<number> = new Set([1, 2, 3]);\nconst setB: Set<number> = new Set([2, 3, 4]);',
    setupCode:
      'const setA: Set<number> = new Set([1, 2, 3]);\nconst setB: Set<number> = new Set([2, 3, 4]);',
    expected: [1],
    sample: '[...setA].filter((x) => !setB.has(x))',
    hints: ['Filter elements not in the other set', 'Use negation with has()'],
    validPatterns: [/\.filter\s*\(/, /!\s*setB\.has|!setB\.has/],
    tags: ['Set', 'difference'],
  },

  // ============================================================
  // Map Operations
  // ============================================================
  {
    id: 'ts-map-create',
    category: 'Map Operations',
    difficulty: 'easy',
    title: 'Create Map from Entries',
    text: 'Create a Map from the array of key-value pairs',
    setup: 'const entries: [string, number][] = [["a", 1], ["b", 2]];',
    setupCode: 'const entries: [string, number][] = [["a", 1], ["b", 2]];',
    expected: { a: 1, b: 2 },
    sample: 'Object.fromEntries(new Map(entries))',
    hints: ['Map constructor accepts array of entries', 'Convert to object for comparison'],
    validPatterns: [/new\s+Map\s*\(\s*entries\s*\)/],
    tags: ['Map', 'create'],
  },
  {
    id: 'ts-map-get-set',
    category: 'Map Operations',
    difficulty: 'easy',
    title: 'Map Get and Set',
    text: 'Get the value for key "name" from the map',
    setup: 'const map: Map<string, string> = new Map([["name", "Alice"], ["role", "admin"]]);',
    setupCode: 'const map: Map<string, string> = new Map([["name", "Alice"], ["role", "admin"]]);',
    expected: 'Alice',
    sample: 'map.get("name")',
    hints: ['get returns T | undefined', 'Use has() to check existence first'],
    validPatterns: [/\.get\s*\(\s*["']name["']\s*\)/],
    tags: ['Map', 'get'],
  },
  {
    id: 'ts-map-to-object',
    category: 'Map Operations',
    difficulty: 'medium',
    title: 'Convert Map to Object',
    text: 'Convert the Map to a plain object',
    setup: 'const map: Map<string, number> = new Map([["x", 1], ["y", 2]]);',
    setupCode: 'const map: Map<string, number> = new Map([["x", 1], ["y", 2]]);',
    expected: { x: 1, y: 2 },
    sample: 'Object.fromEntries(map)',
    hints: ['Object.fromEntries works with Map directly', 'Map is iterable as entries'],
    validPatterns: [/Object\.fromEntries\s*\(\s*map\s*\)/],
    tags: ['Map', 'conversion'],
  },
  {
    id: 'ts-map-keys-values',
    category: 'Map Operations',
    difficulty: 'easy',
    title: 'Get Map Keys as Array',
    text: 'Get all keys from the map as an array',
    setup: 'const map: Map<string, number> = new Map([["a", 1], ["b", 2], ["c", 3]]);',
    setupCode: 'const map: Map<string, number> = new Map([["a", 1], ["b", 2], ["c", 3]]);',
    expected: ['a', 'b', 'c'],
    sample: '[...map.keys()]',
    hints: ['keys() returns an iterator', 'Spread to convert to array'],
    validPatterns: [/\.keys\s*\(\s*\)/, /\[\s*\.\.\./],
    tags: ['Map', 'keys'],
  },

  // ============================================================
  // Generic Patterns
  // ============================================================
  {
    id: 'ts-generic-identity',
    category: 'Generic Patterns',
    difficulty: 'easy',
    title: 'Generic Identity Function',
    text: 'Call the identity function with explicit type parameter',
    setup: 'function identity<T>(value: T): T { return value; }',
    setupCode: 'function identity<T>(value: T): T { return value; }',
    expected: 'hello',
    sample: 'identity<string>("hello")',
    hints: [
      'Specify type parameter with <Type>',
      'Type inference can also work without explicit type',
    ],
    validPatterns: [/identity\s*<\s*string\s*>\s*\(\s*["']hello["']\s*\)/],
    tags: ['generics', 'identity'],
  },
  {
    id: 'ts-generic-array-first',
    category: 'Generic Patterns',
    difficulty: 'medium',
    title: 'Generic First Element',
    text: 'Get the first element using the generic function',
    setup:
      'function first<T>(arr: T[]): T | undefined { return arr[0]; }\nconst nums: number[] = [10, 20, 30];',
    setupCode:
      'function first<T>(arr: T[]): T | undefined { return arr[0]; }\nconst nums: number[] = [10, 20, 30];',
    expected: 10,
    sample: 'first(nums)',
    hints: ['Type is inferred from argument', 'Return type is T | undefined'],
    validPatterns: [/first\s*\(\s*nums\s*\)/],
    tags: ['generics', 'array'],
  },
  {
    id: 'ts-generic-keyof-constraint',
    category: 'Generic Patterns',
    difficulty: 'hard',
    title: 'Generic with keyof Constraint',
    text: 'Get the "name" property from the object using the generic getter',
    setup:
      'function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key]; }\nconst user = { name: "Alice", age: 30 };',
    setupCode:
      'function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key]; }\nconst user = { name: "Alice", age: 30 };',
    expected: 'Alice',
    sample: 'getProperty(user, "name")',
    hints: ['K is constrained to keys of T', 'Return type T[K] is the value type'],
    validPatterns: [/getProperty\s*\(\s*user\s*,\s*["']name["']\s*\)/],
    tags: ['generics', 'keyof'],
  },

  // ============================================================
  // Type Assertions and Casts
  // ============================================================
  {
    id: 'ts-as-assertion',
    category: 'Type Assertions',
    difficulty: 'easy',
    title: 'Type Assertion with as',
    text: 'Assert the unknown value as a string',
    setup: 'const value: unknown = "hello";',
    setupCode: 'const value: unknown = "hello";',
    expected: 'hello',
    sample: 'value as string',
    hints: ['as syntax for type assertion', 'Use when you know more than the compiler'],
    validPatterns: [/value\s+as\s+string/],
    tags: ['type-assertion', 'as'],
  },
  {
    id: 'ts-satisfies-operator',
    category: 'Type Assertions',
    difficulty: 'medium',
    title: 'Satisfies Operator',
    text: 'Use satisfies to validate the object matches the type while preserving literal types',
    setup: 'type Colors = Record<string, [number, number, number]>;',
    setupCode: 'type Colors = Record<string, [number, number, number]>;',
    expected: { red: [255, 0, 0] },
    sample: '({ red: [255, 0, 0] } satisfies Colors)',
    hints: ['satisfies validates without widening types', 'Preserves literal type information'],
    validPatterns: [/satisfies\s+Colors/],
    tags: ['satisfies', 'type-checking'],
  },
  {
    id: 'ts-const-assertion',
    category: 'Type Assertions',
    difficulty: 'medium',
    title: 'Const Assertion',
    text: 'Create a readonly tuple using const assertion',
    setup: 'const tuple = ["hello", 42] as const;',
    setupCode: 'const tuple = ["hello", 42] as const;',
    expected: ['hello', 42],
    sample: '[...tuple]',
    hints: ['as const makes values deeply readonly', 'Arrays become readonly tuples'],
    validPatterns: [/\[\s*\.\.\.tuple\s*\]/],
    tags: ['const-assertion', 'readonly'],
  },
];

// Helper functions
export function getTypescriptProblemById(id: string): Problem | undefined {
  return typescriptProblems.find((p) => p.id === id);
}

export function getTypescriptProblemsByCategory(category: string): Problem[] {
  return typescriptProblems.filter((p) => p.category === category);
}

export function getTypescriptProblemsByDifficulty(difficulty: Problem['difficulty']): Problem[] {
  return typescriptProblems.filter((p) => p.difficulty === difficulty);
}

export function getTypescriptProblemsByTag(tag: string): Problem[] {
  return typescriptProblems.filter((p) => p.tags?.includes(tag));
}

export function getTypescriptCategories(): string[] {
  return [...new Set(typescriptProblems.map((p) => p.category))];
}

export default typescriptProblems;
