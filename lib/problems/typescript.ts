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

  // ============================================================
  // Type Guards - typeof, instanceof, in, custom
  // ============================================================
  {
    id: 'ts-typeof-guard-string',
    category: 'Type Guards',
    difficulty: 'easy',
    title: 'typeof Guard for Strings',
    text: 'Use typeof to check if the value is a string and return its uppercase, otherwise return "not a string"',
    setup: 'const value: string | number = "hello";',
    setupCode: 'const value: string | number = "hello";',
    expected: 'HELLO',
    sample: 'typeof value === "string" ? value.toUpperCase() : "not a string"',
    hints: [
      'typeof returns "string", "number", "boolean", etc.',
      'TypeScript narrows the type after the check',
    ],
    validPatterns: [/typeof\s+value\s*===?\s*["']string["']/, /\.toUpperCase\s*\(\s*\)/],
    tags: ['type-guard', 'typeof'],
  },
  {
    id: 'ts-typeof-guard-function',
    category: 'Type Guards',
    difficulty: 'easy',
    title: 'typeof Guard for Functions',
    text: 'Check if the value is a function using typeof and call it if so, otherwise return the value directly',
    setup: 'const value: string | (() => string) = () => "called";',
    setupCode: 'const value: string | (() => string) = () => "called";',
    expected: 'called',
    sample: 'typeof value === "function" ? value() : value',
    hints: [
      'typeof function returns "function"',
      'After the check, TypeScript knows value is callable',
    ],
    validPatterns: [/typeof\s+value\s*===?\s*["']function["']/, /value\s*\(\s*\)/],
    tags: ['type-guard', 'typeof', 'function'],
  },
  {
    id: 'ts-instanceof-guard-date',
    category: 'Type Guards',
    difficulty: 'easy',
    title: 'instanceof Guard for Date',
    text: 'Check if the value is a Date instance and return its year, otherwise return -1',
    setup: 'const value: Date | string = new Date("2024-01-15");',
    setupCode: 'const value: Date | string = new Date("2024-01-15");',
    expected: 2024,
    sample: 'value instanceof Date ? value.getFullYear() : -1',
    hints: [
      'instanceof checks the prototype chain',
      'Works with classes and built-in constructors',
    ],
    validPatterns: [/value\s+instanceof\s+Date/, /\.getFullYear\s*\(\s*\)/],
    tags: ['type-guard', 'instanceof'],
  },
  {
    id: 'ts-instanceof-guard-array',
    category: 'Type Guards',
    difficulty: 'easy',
    title: 'instanceof Guard for Array',
    text: 'Check if the value is an array and return its length, otherwise return 0',
    setup: 'const value: number[] | number = [1, 2, 3, 4, 5];',
    setupCode: 'const value: number[] | number = [1, 2, 3, 4, 5];',
    expected: 5,
    sample: 'Array.isArray(value) ? value.length : 0',
    hints: ['Array.isArray is preferred over instanceof Array', 'Works across different realms/frames'],
    validPatterns: [/Array\.isArray\s*\(\s*value\s*\)|value\s+instanceof\s+Array/, /\.length/],
    tags: ['type-guard', 'instanceof', 'array'],
  },
  {
    id: 'ts-in-guard-property',
    category: 'Type Guards',
    difficulty: 'medium',
    title: 'in Operator Type Guard',
    text: 'Use the "in" operator to check if the object has an "error" property and return its message, otherwise return "success"',
    setup:
      'type Success = { data: string };\ntype Failure = { error: string };\nconst result: Success | Failure = { error: "Something went wrong" };',
    setupCode:
      'type Success = { data: string };\ntype Failure = { error: string };\nconst result: Success | Failure = { error: "Something went wrong" };',
    expected: 'Something went wrong',
    sample: '"error" in result ? result.error : "success"',
    hints: [
      '"in" operator checks for property existence',
      'TypeScript narrows based on discriminating properties',
    ],
    validPatterns: [/["']error["']\s+in\s+result/, /result\.error/],
    tags: ['type-guard', 'in-operator'],
  },
  {
    id: 'ts-custom-type-guard',
    category: 'Type Guards',
    difficulty: 'medium',
    title: 'Custom Type Guard Function',
    text: 'Use the custom type guard to filter only Bird objects from the array',
    setup:
      'interface Bird { fly: () => void; species: string; }\ninterface Fish { swim: () => void; species: string; }\nfunction isBird(animal: Bird | Fish): animal is Bird { return "fly" in animal; }\nconst animals: (Bird | Fish)[] = [{fly: () => {}, species: "Eagle"}, {swim: () => {}, species: "Salmon"}, {fly: () => {}, species: "Sparrow"}];',
    setupCode:
      'interface Bird { fly: () => void; species: string; }\ninterface Fish { swim: () => void; species: string; }\nfunction isBird(animal: Bird | Fish): animal is Bird { return "fly" in animal; }\nconst animals: (Bird | Fish)[] = [{fly: () => {}, species: "Eagle"}, {swim: () => {}, species: "Salmon"}, {fly: () => {}, species: "Sparrow"}];',
    expected: ['Eagle', 'Sparrow'],
    sample: 'animals.filter(isBird).map(b => b.species)',
    hints: ['Custom type guards use "x is Type" syntax', 'filter with type guard narrows array type'],
    validPatterns: [/\.filter\s*\(\s*isBird\s*\)/, /\.map\s*\(/],
    tags: ['type-guard', 'custom', 'filter'],
  },
  {
    id: 'ts-type-guard-assertion',
    category: 'Type Guards',
    difficulty: 'hard',
    title: 'Assertion Type Guard',
    text: 'Use the assertion function to validate the user exists, then access the name',
    setup:
      'interface User { name: string; }\nfunction assertUser(value: unknown): asserts value is User { if (typeof value !== "object" || value === null || !("name" in value)) throw new Error("Not a user"); }\nconst data: unknown = { name: "Alice" };',
    setupCode:
      'interface User { name: string; }\nfunction assertUser(value: unknown): asserts value is User { if (typeof value !== "object" || value === null || !("name" in value)) throw new Error("Not a user"); }\nconst data: unknown = { name: "Alice" };',
    expected: 'Alice',
    sample: '(assertUser(data), (data as User).name)',
    hints: [
      'Assertion functions use "asserts x is Type"',
      'After assertion, the type is narrowed for the rest of the scope',
    ],
    validPatterns: [/assertUser\s*\(\s*data\s*\)/, /\.name/],
    tags: ['type-guard', 'assertion', 'asserts'],
  },

  // ============================================================
  // Utility Types - Advanced Usage
  // ============================================================
  {
    id: 'ts-utility-returntype',
    category: 'Utility Types',
    difficulty: 'medium',
    title: 'ReturnType Utility',
    text: 'Extract the return type of the function and create a value of that type',
    setup: 'function createUser() { return { id: 1, name: "Alice", active: true }; }',
    setupCode: 'function createUser() { return { id: 1, name: "Alice", active: true }; }',
    expected: { id: 2, name: 'Bob', active: false },
    sample: '({ id: 2, name: "Bob", active: false } as ReturnType<typeof createUser>)',
    hints: [
      'ReturnType<T> extracts the return type of a function type',
      'Use typeof to get the function type first',
    ],
    validPatterns: [/ReturnType\s*<\s*typeof\s+createUser\s*>/],
    tags: ['utility-types', 'returntype'],
  },
  {
    id: 'ts-utility-parameters',
    category: 'Utility Types',
    difficulty: 'medium',
    title: 'Parameters Utility',
    text: 'Extract the parameter types and create a tuple matching them',
    setup: 'function greet(name: string, age: number): string { return `${name} is ${age}`; }',
    setupCode: 'function greet(name: string, age: number): string { return `${name} is ${age}`; }',
    expected: ['Alice', 30],
    sample: '(["Alice", 30] as Parameters<typeof greet>)',
    hints: [
      'Parameters<T> returns a tuple of parameter types',
      'Useful for forwarding arguments',
    ],
    validPatterns: [/Parameters\s*<\s*typeof\s+greet\s*>/],
    tags: ['utility-types', 'parameters'],
  },
  {
    id: 'ts-utility-awaited',
    category: 'Utility Types',
    difficulty: 'medium',
    title: 'Awaited Utility',
    text: 'Get the resolved type of the promise',
    setup: 'const promise: Promise<{ data: string }> = Promise.resolve({ data: "hello" });',
    setupCode: 'const promise: Promise<{ data: string }> = Promise.resolve({ data: "hello" });',
    expected: { data: 'result' },
    sample: '({ data: "result" } as Awaited<typeof promise>)',
    hints: [
      'Awaited<T> unwraps Promise types recursively',
      'Works with nested promises too',
    ],
    validPatterns: [/Awaited\s*<\s*typeof\s+promise\s*>/],
    tags: ['utility-types', 'awaited', 'promise'],
  },
  {
    id: 'ts-utility-record-enum',
    category: 'Utility Types',
    difficulty: 'easy',
    title: 'Record with String Literal Union',
    text: 'Create a Record that maps each HTTP method to a handler function result',
    setup: 'type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";',
    setupCode: 'type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";',
    expected: { GET: 'get', POST: 'post', PUT: 'put', DELETE: 'delete' },
    sample: '({ GET: "get", POST: "post", PUT: "put", DELETE: "delete" } as Record<HttpMethod, string>)',
    hints: [
      'Record enforces all keys from the union',
      'Missing keys will cause a type error',
    ],
    validPatterns: [/Record\s*<\s*HttpMethod\s*,\s*string\s*>/],
    tags: ['utility-types', 'record', 'union'],
  },
  {
    id: 'ts-utility-omit-multiple',
    category: 'Utility Types',
    difficulty: 'easy',
    title: 'Omit Multiple Properties',
    text: 'Create a public user type by omitting password and secretKey',
    setup:
      'interface FullUser { id: number; name: string; password: string; secretKey: string; }\nconst user: FullUser = { id: 1, name: "Alice", password: "secret", secretKey: "key123" };',
    setupCode:
      'interface FullUser { id: number; name: string; password: string; secretKey: string; }\nconst user: FullUser = { id: 1, name: "Alice", password: "secret", secretKey: "key123" };',
    expected: { id: 1, name: 'Alice' },
    sample: '(({ id, name }) => ({ id, name }))(user) as Omit<FullUser, "password" | "secretKey">',
    hints: [
      'Omit accepts a union of keys to remove',
      'Use | to combine multiple keys',
    ],
    validPatterns: [/Omit\s*<\s*FullUser\s*,\s*["']password["']\s*\|\s*["']secretKey["']\s*>/],
    tags: ['utility-types', 'omit'],
  },

  // ============================================================
  // Generic Methods - Array, Map, Custom
  // ============================================================
  {
    id: 'ts-generic-array-method',
    category: 'Generic Methods',
    difficulty: 'easy',
    title: 'Generic Array Wrapper',
    text: 'Call the generic wrap function to put the value in an array',
    setup: 'function wrap<T>(value: T): T[] { return [value]; }',
    setupCode: 'function wrap<T>(value: T): T[] { return [value]; }',
    expected: [42],
    sample: 'wrap(42)',
    hints: ['Type parameter is inferred from argument', 'Result is T[] where T is inferred'],
    validPatterns: [/wrap\s*\(\s*42\s*\)/],
    tags: ['generics', 'array'],
  },
  {
    id: 'ts-generic-map-entries',
    category: 'Generic Methods',
    difficulty: 'medium',
    title: 'Generic Map Builder',
    text: 'Use the generic function to create a Map from the object',
    setup:
      'function toMap<K extends string, V>(obj: Record<K, V>): Map<K, V> { return new Map(Object.entries(obj) as [K, V][]); }\nconst scores = { alice: 100, bob: 85 };',
    setupCode:
      'function toMap<K extends string, V>(obj: Record<K, V>): Map<K, V> { return new Map(Object.entries(obj) as [K, V][]); }\nconst scores = { alice: 100, bob: 85 };',
    expected: { alice: 100, bob: 85 },
    sample: 'Object.fromEntries(toMap(scores))',
    hints: [
      'Generic constraints can use extends',
      'K extends string ensures keys are strings',
    ],
    validPatterns: [/toMap\s*\(\s*scores\s*\)/],
    tags: ['generics', 'map', 'record'],
  },
  {
    id: 'ts-generic-tuple-swap',
    category: 'Generic Methods',
    difficulty: 'medium',
    title: 'Generic Tuple Swap',
    text: 'Use the swap function to reverse the tuple elements',
    setup: 'function swap<A, B>(tuple: [A, B]): [B, A] { return [tuple[1], tuple[0]]; }\nconst pair: [string, number] = ["hello", 42];',
    setupCode: 'function swap<A, B>(tuple: [A, B]): [B, A] { return [tuple[1], tuple[0]]; }\nconst pair: [string, number] = ["hello", 42];',
    expected: [42, 'hello'],
    sample: 'swap(pair)',
    hints: ['Multiple type parameters can be used', 'Tuple types preserve position'],
    validPatterns: [/swap\s*\(\s*pair\s*\)/],
    tags: ['generics', 'tuple'],
  },
  {
    id: 'ts-generic-filter-type',
    category: 'Generic Methods',
    difficulty: 'hard',
    title: 'Generic Type Filter',
    text: 'Use the generic filterByType function to get only numbers from the array',
    setup:
      'function filterByType<T, U extends T>(arr: T[], guard: (x: T) => x is U): U[] { return arr.filter(guard); }\nconst mixed: (string | number)[] = [1, "a", 2, "b", 3];\nconst isNumber = (x: string | number): x is number => typeof x === "number";',
    setupCode:
      'function filterByType<T, U extends T>(arr: T[], guard: (x: T) => x is U): U[] { return arr.filter(guard); }\nconst mixed: (string | number)[] = [1, "a", 2, "b", 3];\nconst isNumber = (x: string | number): x is number => typeof x === "number";',
    expected: [1, 2, 3],
    sample: 'filterByType(mixed, isNumber)',
    hints: [
      'U extends T ensures U is a subtype of T',
      'Type guard function narrows the array type',
    ],
    validPatterns: [/filterByType\s*\(\s*mixed\s*,\s*isNumber\s*\)/],
    tags: ['generics', 'filter', 'type-guard'],
  },
  {
    id: 'ts-generic-default-param',
    category: 'Generic Methods',
    difficulty: 'easy',
    title: 'Generic with Default Type',
    text: 'Call the createContainer function without explicit type (uses default)',
    setup:
      'function createContainer<T = string>(value: T): { value: T } { return { value }; }',
    setupCode:
      'function createContainer<T = string>(value: T): { value: T } { return { value }; }',
    expected: { value: 'hello' },
    sample: 'createContainer("hello")',
    hints: ['Default type parameters use = syntax', 'Inferred type takes precedence over default'],
    validPatterns: [/createContainer\s*\(\s*["']hello["']\s*\)/],
    tags: ['generics', 'default'],
  },

  // ============================================================
  // Mapped Types and keyof
  // ============================================================
  {
    id: 'ts-keyof-basic',
    category: 'Mapped Types',
    difficulty: 'easy',
    title: 'keyof Type Operator',
    text: 'Use keyof to get a valid key for the user object',
    setup: 'interface User { name: string; age: number; email: string; }\nconst user: User = { name: "Alice", age: 30, email: "alice@example.com" };',
    setupCode: 'interface User { name: string; age: number; email: string; }\nconst user: User = { name: "Alice", age: 30, email: "alice@example.com" };',
    expected: 'Alice',
    sample: 'user["name" as keyof User]',
    hints: ['keyof creates a union of property names', 'Result is "name" | "age" | "email"'],
    validPatterns: [/keyof\s+User/, /\[\s*["']name["']/],
    tags: ['keyof', 'mapped-types'],
  },
  {
    id: 'ts-mapped-readonly',
    category: 'Mapped Types',
    difficulty: 'medium',
    title: 'Custom Readonly Mapped Type',
    text: 'Apply the custom MyReadonly type to make the config immutable',
    setup:
      'type MyReadonly<T> = { readonly [K in keyof T]: T[K] };\ninterface Config { host: string; port: number; }\nconst config: Config = { host: "localhost", port: 3000 };',
    setupCode:
      'type MyReadonly<T> = { readonly [K in keyof T]: T[K] };\ninterface Config { host: string; port: number; }\nconst config: Config = { host: "localhost", port: 3000 };',
    expected: { host: 'localhost', port: 3000 },
    sample: '(config as MyReadonly<Config>)',
    hints: [
      'Mapped types iterate over keys with [K in keyof T]',
      'readonly modifier makes properties immutable',
    ],
    validPatterns: [/MyReadonly\s*<\s*Config\s*>/],
    tags: ['mapped-types', 'readonly'],
  },
  {
    id: 'ts-mapped-optional',
    category: 'Mapped Types',
    difficulty: 'medium',
    title: 'Custom Partial Mapped Type',
    text: 'Use the custom MyPartial type to create an optional update object',
    setup:
      'type MyPartial<T> = { [K in keyof T]?: T[K] };\ninterface User { name: string; age: number; }\nconst user: User = { name: "Alice", age: 30 };',
    setupCode:
      'type MyPartial<T> = { [K in keyof T]?: T[K] };\ninterface User { name: string; age: number; }\nconst user: User = { name: "Alice", age: 30 };',
    expected: { name: 'Bob', age: 30 },
    sample: '({ ...user, ...({ name: "Bob" } as MyPartial<User>) })',
    hints: ['? modifier makes properties optional', 'Mapped types can add or remove modifiers'],
    validPatterns: [/MyPartial\s*<\s*User\s*>/],
    tags: ['mapped-types', 'optional'],
  },
  {
    id: 'ts-mapped-value-transform',
    category: 'Mapped Types',
    difficulty: 'hard',
    title: 'Mapped Type with Value Transformation',
    text: 'Use the Getters type to create an object with getter functions for each property',
    setup:
      'type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] };\ninterface Person { name: string; age: number; }',
    setupCode:
      'type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] };\ninterface Person { name: string; age: number; }',
    expected: { getName: 'Alice', getAge: 30 },
    sample: '({ getName: () => "Alice", getAge: () => 30 } as Getters<Person>).getName() + (({ getName: () => "Alice", getAge: () => 30 } as Getters<Person>).getAge())',
    hints: [
      'Key remapping uses "as" clause in mapped types',
      'Template literal types transform key names',
    ],
    validPatterns: [/Getters\s*<\s*Person\s*>/, /getName|getAge/],
    tags: ['mapped-types', 'template-literal'],
  },
  {
    id: 'ts-keyof-index-access',
    category: 'Mapped Types',
    difficulty: 'easy',
    title: 'Index Access Types',
    text: 'Use index access type to get the type of the name property',
    setup:
      'interface User { name: string; age: number; active: boolean; }\nconst userName: User["name"] = "Alice";',
    setupCode:
      'interface User { name: string; age: number; active: boolean; }\nconst userName: User["name"] = "Alice";',
    expected: 'Alice',
    sample: 'userName',
    hints: ['T["key"] accesses the type of a property', 'Can use union of keys: T["a" | "b"]'],
    validPatterns: [/userName/],
    tags: ['keyof', 'index-access'],
  },

  // ============================================================
  // Conditional Types
  // ============================================================
  {
    id: 'ts-conditional-basic',
    category: 'Conditional Types',
    difficulty: 'medium',
    title: 'Basic Conditional Type',
    text: 'Use the IsString type to check the type and return the appropriate value',
    setup:
      'type IsString<T> = T extends string ? "yes" : "no";\ntype Result = IsString<"hello">;',
    setupCode:
      'type IsString<T> = T extends string ? "yes" : "no";\ntype Result = IsString<"hello">;',
    expected: 'yes',
    sample: '("yes" as Result)',
    hints: [
      'Conditional types use T extends U ? X : Y syntax',
      'Similar to ternary operator but for types',
    ],
    validPatterns: [/as\s+Result/, /["']yes["']/],
    tags: ['conditional-types'],
  },
  {
    id: 'ts-conditional-infer',
    category: 'Conditional Types',
    difficulty: 'hard',
    title: 'Conditional Type with infer',
    text: 'Use the ArrayElement type to extract the element type from the array type',
    setup:
      'type ArrayElement<T> = T extends (infer U)[] ? U : never;\ntype NumberArray = number[];\ntype Element = ArrayElement<NumberArray>;',
    setupCode:
      'type ArrayElement<T> = T extends (infer U)[] ? U : never;\ntype NumberArray = number[];\ntype Element = ArrayElement<NumberArray>;',
    expected: 42,
    sample: '(42 as Element)',
    hints: [
      'infer keyword introduces a type variable in extends clause',
      'Extracts types from complex structures',
    ],
    validPatterns: [/as\s+Element/, /42/],
    tags: ['conditional-types', 'infer'],
  },
  {
    id: 'ts-conditional-exclude-null',
    category: 'Conditional Types',
    difficulty: 'medium',
    title: 'Conditional Type for NonNullable',
    text: 'Use the custom NonNull type to remove null from the union',
    setup:
      'type NonNull<T> = T extends null | undefined ? never : T;\ntype MaybeString = string | null | undefined;\ntype JustString = NonNull<MaybeString>;',
    setupCode:
      'type NonNull<T> = T extends null | undefined ? never : T;\ntype MaybeString = string | null | undefined;\ntype JustString = NonNull<MaybeString>;',
    expected: 'hello',
    sample: '("hello" as JustString)',
    hints: [
      'Conditional types distribute over unions',
      'never in a union disappears',
    ],
    validPatterns: [/as\s+JustString/, /["']hello["']/],
    tags: ['conditional-types', 'union'],
  },
  {
    id: 'ts-conditional-function-return',
    category: 'Conditional Types',
    difficulty: 'hard',
    title: 'Extract Function Return Type',
    text: 'Use the custom GetReturn type to extract the return type',
    setup:
      'type GetReturn<T> = T extends (...args: unknown[]) => infer R ? R : never;\ntype Fn = (x: number) => string;\ntype FnReturn = GetReturn<Fn>;',
    setupCode:
      'type GetReturn<T> = T extends (...args: unknown[]) => infer R ? R : never;\ntype Fn = (x: number) => string;\ntype FnReturn = GetReturn<Fn>;',
    expected: 'result',
    sample: '("result" as FnReturn)',
    hints: [
      'infer R captures the return type position',
      'This is how ReturnType utility is implemented',
    ],
    validPatterns: [/as\s+FnReturn/, /["']result["']/],
    tags: ['conditional-types', 'infer', 'function'],
  },
  {
    id: 'ts-conditional-distributive',
    category: 'Conditional Types',
    difficulty: 'hard',
    title: 'Distributive Conditional Types',
    text: 'Use the ToArray type that distributes over unions',
    setup:
      'type ToArray<T> = T extends unknown ? T[] : never;\ntype Union = string | number;\ntype Arrays = ToArray<Union>;',
    setupCode:
      'type ToArray<T> = T extends unknown ? T[] : never;\ntype Union = string | number;\ntype Arrays = ToArray<Union>;',
    expected: [1, 2, 3],
    sample: '([1, 2, 3] as Arrays)',
    hints: [
      'Conditional types distribute when T is a naked type parameter',
      'Result is string[] | number[], not (string | number)[]',
    ],
    validPatterns: [/as\s+Arrays/, /\[\s*1\s*,\s*2\s*,\s*3\s*\]/],
    tags: ['conditional-types', 'distributive'],
  },

  // ============================================================
  // Advanced Type Manipulation - Template Literal Types
  // ============================================================
  {
    id: 'ts-type-template-event-handler',
    category: 'Template Literal Types',
    difficulty: 'easy',
    title: 'Event Handler Template Literal',
    text: 'Create a typed event handler name using template literal types',
    setup:
      'type EventName = "click" | "focus" | "blur";\ntype Handler<E extends string> = `on${Capitalize<E>}`;\nconst handler: Handler<"click"> = "onClick";',
    setupCode:
      'type EventName = "click" | "focus" | "blur";\ntype Handler<E extends string> = `on${Capitalize<E>}`;\nconst handler: Handler<"click"> = "onClick";',
    expected: 'onClick',
    sample: 'handler',
    hints: [
      'Template literal types create string literal types from patterns',
      'Capitalize<T> uppercases the first character',
    ],
    validPatterns: [/handler/],
    tags: ['template-literal', 'capitalize', 'intrinsic-types'],
  },
  {
    id: 'ts-type-template-css-property',
    category: 'Template Literal Types',
    difficulty: 'medium',
    title: 'CSS Property Template Literal',
    text: 'Create CSS variable names using template literal types',
    setup:
      'type CSSVar<T extends string> = `--${T}`;\ntype Theme = "primary" | "secondary";\ntype ThemeVar = CSSVar<Theme>;\nconst cssVar: ThemeVar = "--primary";',
    setupCode:
      'type CSSVar<T extends string> = `--${T}`;\ntype Theme = "primary" | "secondary";\ntype ThemeVar = CSSVar<Theme>;\nconst cssVar: ThemeVar = "--primary";',
    expected: '--primary',
    sample: 'cssVar',
    hints: [
      'Template literals distribute over unions',
      'ThemeVar becomes "--primary" | "--secondary"',
    ],
    validPatterns: [/cssVar/],
    tags: ['template-literal', 'css', 'union'],
  },
  {
    id: 'ts-type-template-route-params',
    category: 'Template Literal Types',
    difficulty: 'hard',
    title: 'Extract Route Parameters',
    text: 'Use template literal inference to extract route parameters',
    setup:
      'type ExtractParam<T extends string> = T extends `${string}:${infer P}` ? P : never;\ntype Route = "/users/:id";\ntype Param = ExtractParam<Route>;\nconst param: Param = "id";',
    setupCode:
      'type ExtractParam<T extends string> = T extends `${string}:${infer P}` ? P : never;\ntype Route = "/users/:id";\ntype Param = ExtractParam<Route>;\nconst param: Param = "id";',
    expected: 'id',
    sample: 'param',
    hints: [
      'infer can capture parts of template literal types',
      'Useful for type-safe routing',
    ],
    validPatterns: [/param/],
    tags: ['template-literal', 'infer', 'routing'],
  },
  {
    id: 'ts-type-template-getter-setter',
    category: 'Template Literal Types',
    difficulty: 'medium',
    title: 'Getter and Setter Names',
    text: 'Generate getter and setter method names from property name',
    setup:
      'type PropMethods<T extends string> = `get${Capitalize<T>}` | `set${Capitalize<T>}`;\ntype NameMethods = PropMethods<"name">;\nconst method: NameMethods = "getName";',
    setupCode:
      'type PropMethods<T extends string> = `get${Capitalize<T>}` | `set${Capitalize<T>}`;\ntype NameMethods = PropMethods<"name">;\nconst method: NameMethods = "getName";',
    expected: 'getName',
    sample: 'method',
    hints: [
      'Union in template literal creates multiple patterns',
      'Result is "getName" | "setName"',
    ],
    validPatterns: [/method/],
    tags: ['template-literal', 'getter-setter', 'union'],
  },

  // ============================================================
  // Advanced Type Manipulation - Recursive Types
  // ============================================================
  {
    id: 'ts-type-recursive-deep-partial',
    category: 'Recursive Types',
    difficulty: 'medium',
    title: 'DeepPartial Recursive Type',
    text: 'Use DeepPartial to make all nested properties optional',
    setup:
      'type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;\ninterface Config { server: { host: string; port: number }; }\nconst partial: DeepPartial<Config> = { server: { host: "localhost" } };',
    setupCode:
      'type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;\ninterface Config { server: { host: string; port: number }; }\nconst partial: DeepPartial<Config> = { server: { host: "localhost" } };',
    expected: { server: { host: 'localhost' } },
    sample: 'partial',
    hints: [
      'DeepPartial recursively applies Partial to nested objects',
      'Base case is when T is not an object',
    ],
    validPatterns: [/partial/],
    tags: ['recursive-types', 'deep-partial', 'mapped-types'],
  },
  {
    id: 'ts-type-recursive-path',
    category: 'Recursive Types',
    difficulty: 'hard',
    title: 'Recursive Path Type',
    text: 'Use the Paths type to get all possible dot-notation paths',
    setup:
      'type Paths<T> = T extends object ? { [K in keyof T]: K extends string ? K | `${K}.${Paths<T[K]> & string}` : never }[keyof T] : never;\ninterface User { name: string; address: { city: string } }\ntype UserPaths = Paths<User>;\nconst path: UserPaths = "address.city";',
    setupCode:
      'type Paths<T> = T extends object ? { [K in keyof T]: K extends string ? K | `${K}.${Paths<T[K]> & string}` : never }[keyof T] : never;\ninterface User { name: string; address: { city: string } }\ntype UserPaths = Paths<User>;\nconst path: UserPaths = "address.city";',
    expected: 'address.city',
    sample: 'path',
    hints: [
      'Recursive types can generate nested paths',
      'Template literals join keys with dots',
    ],
    validPatterns: [/path/],
    tags: ['recursive-types', 'template-literal', 'paths'],
  },
  {
    id: 'ts-type-recursive-linked-list',
    category: 'Recursive Types',
    difficulty: 'easy',
    title: 'Linked List Type',
    text: 'Create a type-safe linked list using recursive types',
    setup:
      'type LinkedList<T> = { value: T; next: LinkedList<T> | null };\nconst list: LinkedList<number> = { value: 1, next: { value: 2, next: { value: 3, next: null } } };',
    setupCode:
      'type LinkedList<T> = { value: T; next: LinkedList<T> | null };\nconst list: LinkedList<number> = { value: 1, next: { value: 2, next: { value: 3, next: null } } };',
    expected: 1,
    sample: 'list.value',
    hints: [
      'Recursive types can reference themselves',
      'null terminates the recursion at runtime',
    ],
    validPatterns: [/list\.value/],
    tags: ['recursive-types', 'data-structures', 'linked-list'],
  },

  // ============================================================
  // Advanced Type Manipulation - Infer Keyword
  // ============================================================
  {
    id: 'ts-type-infer-constructor-params',
    category: 'Infer Keyword',
    difficulty: 'medium',
    title: 'Infer Constructor Parameters',
    text: 'Extract constructor parameter types using infer',
    setup:
      'type ConstructorParams<T> = T extends new (...args: infer P) => unknown ? P : never;\nclass User { constructor(public name: string, public age: number) {} }\ntype UserParams = ConstructorParams<typeof User>;\nconst params: UserParams = ["Alice", 30];',
    setupCode:
      'type ConstructorParams<T> = T extends new (...args: infer P) => unknown ? P : never;\nclass User { constructor(public name: string, public age: number) {} }\ntype UserParams = ConstructorParams<typeof User>;\nconst params: UserParams = ["Alice", 30];',
    expected: ['Alice', 30],
    sample: 'params',
    hints: [
      'new (...args: infer P) matches constructor signatures',
      'Similar to built-in ConstructorParameters<T>',
    ],
    validPatterns: [/params/],
    tags: ['infer', 'constructor', 'parameters'],
  },
  {
    id: 'ts-type-infer-instance-type',
    category: 'Infer Keyword',
    difficulty: 'easy',
    title: 'Infer Instance Type',
    text: 'Extract the instance type from a constructor using infer',
    setup:
      'type Instance<T> = T extends new (...args: unknown[]) => infer I ? I : never;\nclass User { name = "Alice"; }\ntype UserInstance = Instance<typeof User>;\nconst user: UserInstance = new User();',
    setupCode:
      'type Instance<T> = T extends new (...args: unknown[]) => infer I ? I : never;\nclass User { name = "Alice"; }\ntype UserInstance = Instance<typeof User>;\nconst user: UserInstance = new User();',
    expected: 'Alice',
    sample: 'user.name',
    hints: [
      'infer I captures what the constructor returns',
      'Similar to built-in InstanceType<T>',
    ],
    validPatterns: [/user\.name/],
    tags: ['infer', 'instance', 'class'],
  },
  {
    id: 'ts-type-infer-this-param',
    category: 'Infer Keyword',
    difficulty: 'medium',
    title: 'Infer This Parameter',
    text: 'Extract the this parameter type from a function',
    setup:
      'type ThisParam<T> = T extends (this: infer U, ...args: unknown[]) => unknown ? U : never;\nfunction greet(this: { name: string }) { return this.name; }\ntype Context = ThisParam<typeof greet>;\nconst ctx: Context = { name: "World" };',
    setupCode:
      'type ThisParam<T> = T extends (this: infer U, ...args: unknown[]) => unknown ? U : never;\nfunction greet(this: { name: string }) { return this.name; }\ntype Context = ThisParam<typeof greet>;\nconst ctx: Context = { name: "World" };',
    expected: 'World',
    sample: 'ctx.name',
    hints: [
      'Functions can have a typed this parameter',
      'infer extracts the this type',
    ],
    validPatterns: [/ctx\.name/],
    tags: ['infer', 'this', 'function'],
  },

  // ============================================================
  // Advanced Type Manipulation - Discriminated Unions
  // ============================================================
  {
    id: 'ts-type-discriminated-shape',
    category: 'Discriminated Unions',
    difficulty: 'easy',
    title: 'Shape Discriminated Union',
    text: 'Calculate area based on shape type using discriminated union',
    setup:
      'type Shape = { kind: "circle"; radius: number } | { kind: "square"; side: number };\nfunction area(shape: Shape): number { return shape.kind === "circle" ? Math.PI * shape.radius ** 2 : shape.side ** 2; }\nconst square: Shape = { kind: "square", side: 4 };',
    setupCode:
      'type Shape = { kind: "circle"; radius: number } | { kind: "square"; side: number };\nfunction area(shape: Shape): number { return shape.kind === "circle" ? Math.PI * shape.radius ** 2 : shape.side ** 2; }\nconst square: Shape = { kind: "square", side: 4 };',
    expected: 16,
    sample: 'area(square)',
    hints: [
      'Discriminated unions have a common literal property',
      'TypeScript narrows based on the discriminant check',
    ],
    validPatterns: [/area\s*\(\s*square\s*\)/],
    tags: ['discriminated-union', 'type-narrowing', 'shape'],
  },
  {
    id: 'ts-type-discriminated-fetch',
    category: 'Discriminated Unions',
    difficulty: 'medium',
    title: 'Fetch Result Discriminated Union',
    text: 'Handle loading states using discriminated union',
    setup:
      'type FetchState<T> = { status: "loading" } | { status: "success"; data: T } | { status: "error"; message: string };\nfunction getData(state: FetchState<string>): string { switch(state.status) { case "loading": return "Loading..."; case "success": return state.data; case "error": return state.message; } }\nconst state: FetchState<string> = { status: "success", data: "Hello" };',
    setupCode:
      'type FetchState<T> = { status: "loading" } | { status: "success"; data: T } | { status: "error"; message: string };\nfunction getData(state: FetchState<string>): string { switch(state.status) { case "loading": return "Loading..."; case "success": return state.data; case "error": return state.message; } }\nconst state: FetchState<string> = { status: "success", data: "Hello" };',
    expected: 'Hello',
    sample: 'getData(state)',
    hints: [
      'Generic discriminated unions can carry type-safe payloads',
      'Switch provides exhaustive checking',
    ],
    validPatterns: [/getData\s*\(\s*state\s*\)/],
    tags: ['discriminated-union', 'generic', 'fetch'],
  },
  {
    id: 'ts-type-discriminated-exhaustive',
    category: 'Discriminated Unions',
    difficulty: 'medium',
    title: 'Exhaustive Check with never',
    text: 'Ensure all union cases are handled using never',
    setup:
      'type Animal = { type: "dog"; bark: () => string } | { type: "cat"; meow: () => string };\nfunction assertNever(x: never): never { throw new Error("Unexpected"); }\nfunction sound(animal: Animal): string { switch(animal.type) { case "dog": return animal.bark(); case "cat": return animal.meow(); default: return assertNever(animal); } }\nconst dog: Animal = { type: "dog", bark: () => "Woof" };',
    setupCode:
      'type Animal = { type: "dog"; bark: () => string } | { type: "cat"; meow: () => string };\nfunction assertNever(x: never): never { throw new Error("Unexpected"); }\nfunction sound(animal: Animal): string { switch(animal.type) { case "dog": return animal.bark(); case "cat": return animal.meow(); default: return assertNever(animal); } }\nconst dog: Animal = { type: "dog", bark: () => "Woof" };',
    expected: 'Woof',
    sample: 'sound(dog)',
    hints: [
      'never type ensures all cases are handled',
      'Adding new union members causes compile error in default',
    ],
    validPatterns: [/sound\s*\(\s*dog\s*\)/],
    tags: ['discriminated-union', 'never', 'exhaustive'],
  },

  // ============================================================
  // Advanced Type Manipulation - Branded Types
  // ============================================================
  {
    id: 'ts-type-branded-id',
    category: 'Branded Types',
    difficulty: 'easy',
    title: 'Branded ID Types',
    text: 'Create type-safe IDs using branded types',
    setup:
      'type UserId = string & { readonly __brand: unique symbol };\ntype PostId = string & { readonly __brand: unique symbol };\nfunction createUserId(id: string): UserId { return id as UserId; }\nconst userId = createUserId("user-123");',
    setupCode:
      'type UserId = string & { readonly __brand: unique symbol };\ntype PostId = string & { readonly __brand: unique symbol };\nfunction createUserId(id: string): UserId { return id as UserId; }\nconst userId = createUserId("user-123");',
    expected: 'user-123',
    sample: 'userId',
    hints: [
      'Branded types prevent mixing semantically different values',
      'unique symbol ensures brands are incompatible',
    ],
    validPatterns: [/userId/],
    tags: ['branded-types', 'id', 'type-safety'],
  },
  {
    id: 'ts-type-branded-positive',
    category: 'Branded Types',
    difficulty: 'medium',
    title: 'Branded Positive Number',
    text: 'Create a validated positive number type',
    setup:
      'type Positive = number & { readonly __positive: true };\nfunction positive(n: number): Positive | null { return n > 0 ? n as Positive : null; }\nconst pos = positive(42);',
    setupCode:
      'type Positive = number & { readonly __positive: true };\nfunction positive(n: number): Positive | null { return n > 0 ? n as Positive : null; }\nconst pos = positive(42);',
    expected: 42,
    sample: 'pos',
    hints: [
      'Branded types can encode runtime validations in the type system',
      'Factory function performs validation',
    ],
    validPatterns: [/pos/],
    tags: ['branded-types', 'validation', 'number'],
  },
  {
    id: 'ts-type-branded-json-string',
    category: 'Branded Types',
    difficulty: 'medium',
    title: 'Branded JSON String',
    text: 'Create a type for validated JSON strings',
    setup:
      'type JSONString<T> = string & { readonly __json: T };\nfunction toJSON<T>(value: T): JSONString<T> { return JSON.stringify(value) as JSONString<T>; }\nconst json = toJSON({ name: "Alice" });',
    setupCode:
      'type JSONString<T> = string & { readonly __json: T };\nfunction toJSON<T>(value: T): JSONString<T> { return JSON.stringify(value) as JSONString<T>; }\nconst json = toJSON({ name: "Alice" });',
    expected: '{"name":"Alice"}',
    sample: 'json',
    hints: [
      'Branded types can carry type information',
      'The phantom type T tracks the serialized type',
    ],
    validPatterns: [/json/],
    tags: ['branded-types', 'json', 'phantom-types'],
  },

  // ============================================================
  // Advanced Type Manipulation - Type Narrowing
  // ============================================================
  {
    id: 'ts-type-narrowing-null-check',
    category: 'Type Narrowing',
    difficulty: 'easy',
    title: 'Null Check Narrowing',
    text: 'Narrow nullable type using null check',
    setup:
      'function getLength(value: string | null): number { if (value === null) return 0; return value.length; }\nconst result = getLength("hello");',
    setupCode:
      'function getLength(value: string | null): number { if (value === null) return 0; return value.length; }\nconst result = getLength("hello");',
    expected: 5,
    sample: 'result',
    hints: [
      'Null checks narrow the type to non-null',
      'After the check, value is just string',
    ],
    validPatterns: [/result/],
    tags: ['type-narrowing', 'null', 'control-flow'],
  },
  {
    id: 'ts-type-narrowing-truthiness',
    category: 'Type Narrowing',
    difficulty: 'easy',
    title: 'Truthiness Narrowing',
    text: 'Use truthiness to narrow optional values',
    setup:
      'function greet(name?: string): string { if (name) { return `Hello, ${name}!`; } return "Hello, stranger!"; }\nconst greeting = greet("Alice");',
    setupCode:
      'function greet(name?: string): string { if (name) { return `Hello, ${name}!`; } return "Hello, stranger!"; }\nconst greeting = greet("Alice");',
    expected: 'Hello, Alice!',
    sample: 'greeting',
    hints: [
      'Truthiness check narrows out null, undefined, empty string, 0',
      'Be careful with values that can be falsy',
    ],
    validPatterns: [/greeting/],
    tags: ['type-narrowing', 'truthiness', 'optional'],
  },
  {
    id: 'ts-type-narrowing-equality',
    category: 'Type Narrowing',
    difficulty: 'medium',
    title: 'Equality Narrowing',
    text: 'Narrow union by comparing to specific value',
    setup:
      'type Status = "pending" | "active" | "completed";\nfunction isActive(status: Status): boolean { return status === "active"; }\nconst active = isActive("active");',
    setupCode:
      'type Status = "pending" | "active" | "completed";\nfunction isActive(status: Status): boolean { return status === "active"; }\nconst active = isActive("active");',
    expected: true,
    sample: 'active',
    hints: [
      'Equality narrows to the specific literal type',
      'Works with string, number, and boolean literals',
    ],
    validPatterns: [/active/],
    tags: ['type-narrowing', 'equality', 'literal'],
  },

  // ============================================================
  // Advanced Type Manipulation - Readonly and DeepReadonly
  // ============================================================
  {
    id: 'ts-type-readonly-mapped',
    category: 'Readonly Patterns',
    difficulty: 'medium',
    title: 'Readonly Mapped Type',
    text: 'Create a custom readonly mapped type',
    setup:
      'type Immutable<T> = { readonly [K in keyof T]: T[K] };\ninterface User { name: string; age: number; }\nconst user: Immutable<User> = { name: "Alice", age: 30 };',
    setupCode:
      'type Immutable<T> = { readonly [K in keyof T]: T[K] };\ninterface User { name: string; age: number; }\nconst user: Immutable<User> = { name: "Alice", age: 30 };',
    expected: 'Alice',
    sample: 'user.name',
    hints: [
      'Mapped types can add readonly modifier',
      'Equivalent to built-in Readonly<T>',
    ],
    validPatterns: [/user\.name/],
    tags: ['readonly', 'mapped-types', 'immutable'],
  },
  {
    id: 'ts-type-deep-readonly',
    category: 'Readonly Patterns',
    difficulty: 'hard',
    title: 'DeepReadonly Implementation',
    text: 'Use DeepReadonly for nested immutable structures',
    setup:
      'type DeepReadonly<T> = T extends (infer U)[] ? ReadonlyArray<DeepReadonly<U>> : T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> } : T;\ninterface State { user: { name: string; settings: { theme: string } } }\nconst state: DeepReadonly<State> = { user: { name: "Alice", settings: { theme: "dark" } } };',
    setupCode:
      'type DeepReadonly<T> = T extends (infer U)[] ? ReadonlyArray<DeepReadonly<U>> : T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> } : T;\ninterface State { user: { name: string; settings: { theme: string } } }\nconst state: DeepReadonly<State> = { user: { name: "Alice", settings: { theme: "dark" } } };',
    expected: 'dark',
    sample: 'state.user.settings.theme',
    hints: [
      'DeepReadonly handles arrays and objects differently',
      'Recursively applies readonly to all levels',
    ],
    validPatterns: [/state\.user\.settings\.theme/],
    tags: ['readonly', 'deep-readonly', 'recursive-types'],
  },

  // ============================================================
  // Advanced Type Manipulation - Type Assertions vs Guards
  // ============================================================
  {
    id: 'ts-type-assertion-unknown',
    category: 'Type Assertions',
    difficulty: 'easy',
    title: 'Assertion from Unknown',
    text: 'Assert unknown value to a specific type',
    setup:
      'const data: unknown = { name: "Alice", age: 30 };\ninterface User { name: string; age: number; }',
    setupCode:
      'const data: unknown = { name: "Alice", age: 30 };\ninterface User { name: string; age: number; }',
    expected: 'Alice',
    sample: '(data as User).name',
    hints: [
      'Type assertions override the compiler',
      'Use when you know more than TypeScript',
    ],
    validPatterns: [/\(\s*data\s+as\s+User\s*\)\.name/],
    tags: ['type-assertion', 'unknown', 'as'],
  },
  {
    id: 'ts-type-guard-vs-assertion',
    category: 'Type Assertions',
    difficulty: 'medium',
    title: 'Type Guard for Runtime Safety',
    text: 'Use type guard instead of assertion for runtime safety',
    setup:
      'interface User { name: string; }\nfunction isUser(obj: unknown): obj is User { return typeof obj === "object" && obj !== null && "name" in obj && typeof (obj as User).name === "string"; }\nconst data: unknown = { name: "Alice" };',
    setupCode:
      'interface User { name: string; }\nfunction isUser(obj: unknown): obj is User { return typeof obj === "object" && obj !== null && "name" in obj && typeof (obj as User).name === "string"; }\nconst data: unknown = { name: "Alice" };',
    expected: true,
    sample: 'isUser(data)',
    hints: [
      'Type guards provide runtime validation',
      'Safer than assertions for external data',
    ],
    validPatterns: [/isUser\s*\(\s*data\s*\)/],
    tags: ['type-guard', 'type-assertion', 'runtime'],
  },
  {
    id: 'ts-type-template-kebab-case',
    category: 'Template Literal Types',
    difficulty: 'hard',
    title: 'Kebab-Case Conversion Type',
    text: 'Use template literal types to convert camelCase to kebab-case',
    setup:
      'type KebabCase<S extends string> = S extends `${infer First}${infer Rest}` ? First extends Lowercase<First> ? `${First}${KebabCase<Rest>}` : `-${Lowercase<First>}${KebabCase<Rest>}` : S;\ntype Result = KebabCase<"backgroundColor">;\nconst kebab: Result = "-background-color";',
    setupCode:
      'type KebabCase<S extends string> = S extends `${infer First}${infer Rest}` ? First extends Lowercase<First> ? `${First}${KebabCase<Rest>}` : `-${Lowercase<First>}${KebabCase<Rest>}` : S;\ntype Result = KebabCase<"backgroundColor">;\nconst kebab: Result = "-background-color";',
    expected: '-background-color',
    sample: 'kebab',
    hints: [
      'Template literal types can process strings character by character',
      'Lowercase<T> converts a string literal to lowercase',
    ],
    validPatterns: [/kebab/],
    tags: ['template-literal', 'recursive-types', 'string-manipulation'],
  },

  // ============================================================
  // Typed Array Operations - Generic Array Methods
  // ============================================================
  {
    id: 'ts-arr-generic-map',
    category: 'Typed Array Operations',
    difficulty: 'easy',
    title: 'Generic Array Map with Type Inference',
    text: 'Use a generic map function to transform numbers to strings with proper type inference',
    setup:
      'function mapArray<T, U>(arr: T[], fn: (item: T) => U): U[] { return arr.map(fn); }\nconst numbers: number[] = [1, 2, 3, 4, 5];',
    setupCode:
      'function mapArray<T, U>(arr: T[], fn: (item: T) => U): U[] { return arr.map(fn); }\nconst numbers: number[] = [1, 2, 3, 4, 5];',
    expected: ['1', '2', '3', '4', '5'],
    sample: 'mapArray(numbers, (n) => String(n))',
    hints: [
      'Generic functions infer types from arguments',
      'T is inferred as number, U as string',
    ],
    validPatterns: [/mapArray\s*\(\s*numbers/, /String\s*\(\s*n\s*\)|\.toString\s*\(\s*\)/],
    tags: ['generics', 'map', 'type-inference', 'typed-array'],
  },
  {
    id: 'ts-arr-generic-filter',
    category: 'Typed Array Operations',
    difficulty: 'easy',
    title: 'Generic Array Filter with Predicate',
    text: 'Use a generic filter function with a predicate to get even numbers',
    setup:
      'function filterArray<T>(arr: T[], predicate: (item: T) => boolean): T[] { return arr.filter(predicate); }\nconst nums: number[] = [1, 2, 3, 4, 5, 6];',
    setupCode:
      'function filterArray<T>(arr: T[], predicate: (item: T) => boolean): T[] { return arr.filter(predicate); }\nconst nums: number[] = [1, 2, 3, 4, 5, 6];',
    expected: [2, 4, 6],
    sample: 'filterArray(nums, (n) => n % 2 === 0)',
    hints: [
      'Predicate returns boolean for filtering',
      'Result type is same as input array type',
    ],
    validPatterns: [/filterArray\s*\(\s*nums/, /%\s*2\s*===?\s*0/],
    tags: ['generics', 'filter', 'predicate', 'typed-array'],
  },
  {
    id: 'ts-arr-generic-reduce-accumulator',
    category: 'Typed Array Operations',
    difficulty: 'medium',
    title: 'Generic Reduce with Typed Accumulator',
    text: 'Use the generic reduce function to count occurrences of each string',
    setup:
      'function reduceArray<T, U>(arr: T[], fn: (acc: U, item: T) => U, initial: U): U { return arr.reduce(fn, initial); }\nconst words: string[] = ["a", "b", "a", "c", "b", "a"];',
    setupCode:
      'function reduceArray<T, U>(arr: T[], fn: (acc: U, item: T) => U, initial: U): U { return arr.reduce(fn, initial); }\nconst words: string[] = ["a", "b", "a", "c", "b", "a"];',
    expected: { a: 3, b: 2, c: 1 },
    sample:
      'reduceArray(words, (acc, word) => ({ ...acc, [word]: (acc[word] || 0) + 1 }), {} as Record<string, number>)',
    hints: [
      'U is the accumulator type, different from T',
      'Initial value determines the accumulator type',
    ],
    validPatterns: [/reduceArray\s*\(\s*words/, /Record\s*<\s*string\s*,\s*number\s*>/],
    tags: ['generics', 'reduce', 'accumulator', 'typed-array'],
  },
  {
    id: 'ts-arr-generic-find-or-default',
    category: 'Typed Array Operations',
    difficulty: 'easy',
    title: 'Generic Find with Default Value',
    text: 'Use the generic findOrDefault function to find a user or return a default',
    setup:
      'function findOrDefault<T>(arr: T[], predicate: (item: T) => boolean, defaultValue: T): T { return arr.find(predicate) ?? defaultValue; }\ninterface User { id: number; name: string; }\nconst users: User[] = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];\nconst defaultUser: User = { id: 0, name: "Guest" };',
    setupCode:
      'function findOrDefault<T>(arr: T[], predicate: (item: T) => boolean, defaultValue: T): T { return arr.find(predicate) ?? defaultValue; }\ninterface User { id: number; name: string; }\nconst users: User[] = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];\nconst defaultUser: User = { id: 0, name: "Guest" };',
    expected: { id: 0, name: 'Guest' },
    sample: 'findOrDefault(users, (u) => u.id === 99, defaultUser)',
    hints: [
      'Nullish coalescing (??) provides the default',
      'Return type is T, not T | undefined',
    ],
    validPatterns: [/findOrDefault\s*\(\s*users/, /defaultUser/],
    tags: ['generics', 'find', 'default', 'typed-array'],
  },

  // ============================================================
  // Typed Array Operations - ReadonlyArray
  // ============================================================
  {
    id: 'ts-arr-readonly-basic',
    category: 'Typed Array Operations',
    difficulty: 'easy',
    title: 'ReadonlyArray Basic Usage',
    text: 'Use ReadonlyArray to create an immutable view and access elements',
    setup:
      'const mutable: number[] = [1, 2, 3, 4, 5];\nconst immutable: ReadonlyArray<number> = mutable;',
    setupCode:
      'const mutable: number[] = [1, 2, 3, 4, 5];\nconst immutable: ReadonlyArray<number> = mutable;',
    expected: 3,
    sample: 'immutable[2]',
    hints: [
      'ReadonlyArray allows reading but not mutating',
      'Index access still works on ReadonlyArray',
    ],
    validPatterns: [/immutable\s*\[\s*2\s*\]/],
    tags: ['readonly', 'array', 'immutable', 'typed-array'],
  },
  {
    id: 'ts-arr-readonly-methods',
    category: 'Typed Array Operations',
    difficulty: 'easy',
    title: 'ReadonlyArray Non-Mutating Methods',
    text: 'Use slice on ReadonlyArray to get a portion without mutation',
    setup: 'const items: ReadonlyArray<string> = ["a", "b", "c", "d", "e"];',
    setupCode: 'const items: ReadonlyArray<string> = ["a", "b", "c", "d", "e"];',
    expected: ['b', 'c', 'd'],
    sample: 'items.slice(1, 4)',
    hints: [
      'slice, map, filter are available on ReadonlyArray',
      'Methods that mutate (push, pop) are not available',
    ],
    validPatterns: [/items\.slice\s*\(\s*1\s*,\s*4\s*\)/],
    tags: ['readonly', 'array', 'slice', 'typed-array'],
  },
  {
    id: 'ts-arr-readonly-to-mutable',
    category: 'Typed Array Operations',
    difficulty: 'medium',
    title: 'Convert ReadonlyArray to Mutable',
    text: 'Create a mutable copy of the ReadonlyArray using spread',
    setup: 'const frozen: ReadonlyArray<number> = [10, 20, 30];',
    setupCode: 'const frozen: ReadonlyArray<number> = [10, 20, 30];',
    expected: [10, 20, 30, 40],
    sample: '[...frozen, 40]',
    hints: [
      'Spread creates a new mutable array',
      'The new array is number[], not ReadonlyArray',
    ],
    validPatterns: [/\[\s*\.\.\.frozen\s*,\s*40\s*\]/],
    tags: ['readonly', 'spread', 'mutable', 'typed-array'],
  },
  {
    id: 'ts-arr-readonly-deep',
    category: 'Typed Array Operations',
    difficulty: 'medium',
    title: 'Deep Readonly Array',
    text: 'Use the DeepReadonly type to create a deeply immutable structure and access nested data',
    setup:
      'type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };\ninterface Data { items: { name: string; value: number }[] }\nconst data: DeepReadonly<Data> = { items: [{ name: "a", value: 1 }, { name: "b", value: 2 }] };',
    setupCode:
      'type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };\ninterface Data { items: { name: string; value: number }[] }\nconst data: DeepReadonly<Data> = { items: [{ name: "a", value: 1 }, { name: "b", value: 2 }] };',
    expected: 'a',
    sample: 'data.items[0].name',
    hints: [
      'DeepReadonly recursively applies readonly',
      'Nested objects and arrays become immutable',
    ],
    validPatterns: [/data\.items\s*\[\s*0\s*\]\.name/],
    tags: ['readonly', 'deep', 'mapped-types', 'typed-array'],
  },

  // ============================================================
  // Typed Array Operations - Tuple Manipulation
  // ============================================================
  {
    id: 'ts-arr-tuple-basic',
    category: 'Typed Array Operations',
    difficulty: 'easy',
    title: 'Basic Tuple Type',
    text: 'Access elements from a typed tuple with different types',
    setup: 'const tuple: [string, number, boolean] = ["hello", 42, true];',
    setupCode: 'const tuple: [string, number, boolean] = ["hello", 42, true];',
    expected: ['hello', 42],
    sample: '[tuple[0], tuple[1]]',
    hints: [
      'Tuple elements have specific types by position',
      'Each index has its own inferred type',
    ],
    validPatterns: [/tuple\s*\[\s*0\s*\]/, /tuple\s*\[\s*1\s*\]/],
    tags: ['tuple', 'index-access', 'typed-array'],
  },
  {
    id: 'ts-arr-tuple-rest',
    category: 'Typed Array Operations',
    difficulty: 'medium',
    title: 'Tuple with Rest Element',
    text: 'Use a tuple with rest element to represent a function with variable arguments',
    setup:
      'type VarArgs = [first: string, ...rest: number[]];\nconst args: VarArgs = ["sum", 1, 2, 3, 4, 5];',
    setupCode:
      'type VarArgs = [first: string, ...rest: number[]];\nconst args: VarArgs = ["sum", 1, 2, 3, 4, 5];',
    expected: 15,
    sample: 'args.slice(1).reduce((a, b) => (a as number) + (b as number), 0)',
    hints: [
      'Rest element captures remaining items',
      'First element is string, rest are numbers',
    ],
    validPatterns: [/args\.slice\s*\(\s*1\s*\)/, /\.reduce\s*\(/],
    tags: ['tuple', 'rest', 'variadic', 'typed-array'],
  },
  {
    id: 'ts-arr-tuple-spread',
    category: 'Typed Array Operations',
    difficulty: 'medium',
    title: 'Tuple Spread and Concatenation',
    text: 'Concatenate two tuples using spread with proper typing',
    setup:
      'const tuple1: [number, string] = [1, "a"];\nconst tuple2: [boolean, null] = [true, null];',
    setupCode:
      'const tuple1: [number, string] = [1, "a"];\nconst tuple2: [boolean, null] = [true, null];',
    expected: [1, 'a', true, null],
    sample: '[...tuple1, ...tuple2] as [number, string, boolean, null]',
    hints: [
      'Spreading tuples preserves element types',
      'Result type is concatenation of tuple types',
    ],
    validPatterns: [/\[\s*\.\.\.tuple1\s*,\s*\.\.\.tuple2\s*\]/, /as\s*\[/],
    tags: ['tuple', 'spread', 'concatenation', 'typed-array'],
  },
  {
    id: 'ts-arr-tuple-destructure',
    category: 'Typed Array Operations',
    difficulty: 'easy',
    title: 'Tuple Destructuring with Types',
    text: 'Destructure a tuple and use the typed values',
    setup:
      'const point: [x: number, y: number, label: string] = [10, 20, "origin"];',
    setupCode:
      'const point: [x: number, y: number, label: string] = [10, 20, "origin"];',
    expected: { x: 10, y: 20, label: 'origin' },
    sample: '(([x, y, label]) => ({ x, y, label }))(point)',
    hints: [
      'Named tuple elements improve readability',
      'Destructuring preserves individual types',
    ],
    validPatterns: [/\[\s*x\s*,\s*y\s*,\s*label\s*\]/, /\(\s*point\s*\)/],
    tags: ['tuple', 'destructuring', 'named-elements', 'typed-array'],
  },
  {
    id: 'ts-arr-tuple-length',
    category: 'Typed Array Operations',
    difficulty: 'hard',
    title: 'Tuple Length Type',
    text: 'Use the Length type to get the compile-time length of a tuple',
    setup:
      'type Length<T extends readonly unknown[]> = T["length"];\nconst tuple = [1, 2, 3, 4, 5] as const;\ntype TupleLength = Length<typeof tuple>;',
    setupCode:
      'type Length<T extends readonly unknown[]> = T["length"];\nconst tuple = [1, 2, 3, 4, 5] as const;\ntype TupleLength = Length<typeof tuple>;',
    expected: 5,
    sample: '(5 as TupleLength)',
    hints: [
      'Tuple types have a literal length property',
      'as const creates a readonly tuple type',
    ],
    validPatterns: [/as\s+TupleLength/, /5/],
    tags: ['tuple', 'length', 'type-level', 'typed-array'],
  },

  // ============================================================
  // Typed Array Operations - Array Type Narrowing
  // ============================================================
  {
    id: 'ts-arr-narrow-nonempty',
    category: 'Typed Array Operations',
    difficulty: 'medium',
    title: 'Non-Empty Array Type Guard',
    text: 'Use the type guard to narrow to a non-empty array and access first element safely',
    setup:
      'type NonEmptyArray<T> = [T, ...T[]];\nfunction isNonEmpty<T>(arr: T[]): arr is NonEmptyArray<T> { return arr.length > 0; }\nconst items: string[] = ["first", "second", "third"];',
    setupCode:
      'type NonEmptyArray<T> = [T, ...T[]];\nfunction isNonEmpty<T>(arr: T[]): arr is NonEmptyArray<T> { return arr.length > 0; }\nconst items: string[] = ["first", "second", "third"];',
    expected: 'first',
    sample: 'isNonEmpty(items) ? items[0] : "empty"',
    hints: [
      'NonEmptyArray guarantees at least one element',
      'After the guard, items[0] is guaranteed to exist',
    ],
    validPatterns: [/isNonEmpty\s*\(\s*items\s*\)/, /items\s*\[\s*0\s*\]/],
    tags: ['type-guard', 'narrowing', 'non-empty', 'typed-array'],
  },
  {
    id: 'ts-arr-narrow-specific-length',
    category: 'Typed Array Operations',
    difficulty: 'medium',
    title: 'Specific Length Array Guard',
    text: 'Use the type guard to narrow to a pair (2-element tuple)',
    setup:
      'type Pair<T> = [T, T];\nfunction isPair<T>(arr: T[]): arr is Pair<T> { return arr.length === 2; }\nconst coords: number[] = [10, 20];',
    setupCode:
      'type Pair<T> = [T, T];\nfunction isPair<T>(arr: T[]): arr is Pair<T> { return arr.length === 2; }\nconst coords: number[] = [10, 20];',
    expected: 30,
    sample: 'isPair(coords) ? coords[0] + coords[1] : 0',
    hints: [
      'Pair type is a 2-element tuple',
      'After guard, both indices are safely accessible',
    ],
    validPatterns: [
      /isPair\s*\(\s*coords\s*\)/,
      /coords\s*\[\s*0\s*\]\s*\+\s*coords\s*\[\s*1\s*\]/,
    ],
    tags: ['type-guard', 'narrowing', 'tuple', 'typed-array'],
  },
  {
    id: 'ts-arr-narrow-array-of-type',
    category: 'Typed Array Operations',
    difficulty: 'medium',
    title: 'Array Element Type Guard',
    text: 'Use the isArrayOf guard to verify all elements are numbers',
    setup:
      'function isArrayOf<T>(arr: unknown[], guard: (x: unknown) => x is T): arr is T[] { return arr.every(guard); }\nfunction isNumber(x: unknown): x is number { return typeof x === "number"; }\nconst mixed: unknown[] = [1, 2, 3, 4, 5];',
    setupCode:
      'function isArrayOf<T>(arr: unknown[], guard: (x: unknown) => x is T): arr is T[] { return arr.every(guard); }\nfunction isNumber(x: unknown): x is number { return typeof x === "number"; }\nconst mixed: unknown[] = [1, 2, 3, 4, 5];',
    expected: 15,
    sample: 'isArrayOf(mixed, isNumber) ? mixed.reduce((a, b) => a + b, 0) : 0',
    hints: [
      'isArrayOf validates all elements match the type',
      'After guard, array is narrowed to T[]',
    ],
    validPatterns: [/isArrayOf\s*\(\s*mixed\s*,\s*isNumber\s*\)/, /\.reduce\s*\(/],
    tags: ['type-guard', 'narrowing', 'every', 'typed-array'],
  },

  // ============================================================
  // Typed Array Operations - Typed Reduce Operations
  // ============================================================
  {
    id: 'ts-arr-reduce-to-map',
    category: 'Typed Array Operations',
    difficulty: 'medium',
    title: 'Reduce to Map with Generics',
    text: 'Use reduce to convert array to a Map keyed by a property',
    setup:
      'interface Product { sku: string; name: string; price: number; }\nconst products: Product[] = [{ sku: "A1", name: "Widget", price: 10 }, { sku: "B2", name: "Gadget", price: 20 }];',
    setupCode:
      'interface Product { sku: string; name: string; price: number; }\nconst products: Product[] = [{ sku: "A1", name: "Widget", price: 10 }, { sku: "B2", name: "Gadget", price: 20 }];',
    expected: { A1: 'Widget', B2: 'Gadget' },
    sample:
      'Object.fromEntries(products.reduce<Map<string, string>>((map, p) => map.set(p.sku, p.name), new Map()))',
    hints: [
      'reduce<Map<K,V>> specifies accumulator type',
      'Map.set returns the Map for chaining',
    ],
    validPatterns: [/\.reduce\s*<\s*Map\s*</, /\.set\s*\(\s*p\.sku/],
    tags: ['reduce', 'map', 'generics', 'typed-array'],
  },
  {
    id: 'ts-arr-reduce-partition',
    category: 'Typed Array Operations',
    difficulty: 'hard',
    title: 'Reduce to Partition Array',
    text: 'Use reduce to partition numbers into even and odd arrays',
    setup: 'const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8];',
    setupCode: 'const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8];',
    expected: { even: [2, 4, 6, 8], odd: [1, 3, 5, 7] },
    sample:
      'numbers.reduce<{ even: number[]; odd: number[] }>((acc, n) => { n % 2 === 0 ? acc.even.push(n) : acc.odd.push(n); return acc; }, { even: [], odd: [] })',
    hints: [
      'Accumulator type is an object with two arrays',
      'Mutate accumulator for better performance',
    ],
    validPatterns: [/\.reduce\s*<\s*\{\s*even\s*:/, /even\.push|odd\.push/],
    tags: ['reduce', 'partition', 'generics', 'typed-array'],
  },
  {
    id: 'ts-arr-reduce-unique',
    category: 'Typed Array Operations',
    difficulty: 'medium',
    title: 'Reduce to Unique Array with Type',
    text: 'Use reduce with Set to get unique values maintaining type',
    setup: 'const items: string[] = ["a", "b", "a", "c", "b", "d", "a"];',
    setupCode: 'const items: string[] = ["a", "b", "a", "c", "b", "d", "a"];',
    expected: ['a', 'b', 'c', 'd'],
    sample:
      'items.reduce<string[]>((acc, item) => acc.includes(item) ? acc : [...acc, item], [])',
    hints: [
      'Check if item already exists before adding',
      'Alternative: [...new Set(items)]',
    ],
    validPatterns: [/\.reduce\s*<\s*string\s*\[\s*\]\s*>/, /\.includes\s*\(\s*item\s*\)/],
    tags: ['reduce', 'unique', 'dedup', 'typed-array'],
  },

  // ============================================================
  // Typed Array Operations - Array Assertion Functions
  // ============================================================
  {
    id: 'ts-arr-assert-nonempty',
    category: 'Typed Array Operations',
    difficulty: 'medium',
    title: 'Assert Non-Empty Array',
    text: 'Use the assertion function to guarantee the array is non-empty, then get first element',
    setup:
      'type NonEmptyArray<T> = [T, ...T[]];\nfunction assertNonEmpty<T>(arr: T[]): asserts arr is NonEmptyArray<T> { if (arr.length === 0) throw new Error("Array is empty"); }\nconst data: number[] = [10, 20, 30];',
    setupCode:
      'type NonEmptyArray<T> = [T, ...T[]];\nfunction assertNonEmpty<T>(arr: T[]): asserts arr is NonEmptyArray<T> { if (arr.length === 0) throw new Error("Array is empty"); }\nconst data: number[] = [10, 20, 30];',
    expected: 10,
    sample: '(assertNonEmpty(data), data[0])',
    hints: [
      'Assertion functions throw on failure',
      'After assertion, type is narrowed for rest of scope',
    ],
    validPatterns: [/assertNonEmpty\s*\(\s*data\s*\)/, /data\s*\[\s*0\s*\]/],
    tags: ['assertion', 'non-empty', 'asserts', 'typed-array'],
  },
  {
    id: 'ts-arr-assert-all-defined',
    category: 'Typed Array Operations',
    difficulty: 'hard',
    title: 'Assert All Elements Defined',
    text: 'Use the assertion function to guarantee no undefined elements exist',
    setup:
      'function assertAllDefined<T>(arr: (T | undefined)[]): asserts arr is T[] { if (arr.some(x => x === undefined)) throw new Error("Found undefined"); }\nconst maybeNumbers: (number | undefined)[] = [1, 2, 3, 4, 5];',
    setupCode:
      'function assertAllDefined<T>(arr: (T | undefined)[]): asserts arr is T[] { if (arr.some(x => x === undefined)) throw new Error("Found undefined"); }\nconst maybeNumbers: (number | undefined)[] = [1, 2, 3, 4, 5];',
    expected: 15,
    sample: '(assertAllDefined(maybeNumbers), maybeNumbers.reduce((a, b) => a + b, 0))',
    hints: [
      'asserts arr is T[] narrows away undefined',
      'After assertion, array elements are guaranteed defined',
    ],
    validPatterns: [/assertAllDefined\s*\(\s*maybeNumbers\s*\)/, /\.reduce\s*\(/],
    tags: ['assertion', 'defined', 'asserts', 'typed-array'],
  },

  // ============================================================
  // Typed Array Operations - as const with Arrays
  // ============================================================
  {
    id: 'ts-arr-const-literal',
    category: 'Typed Array Operations',
    difficulty: 'easy',
    title: 'Const Assertion for Literal Array',
    text: 'Use as const to create a readonly tuple with literal types',
    setup: 'const colors = ["red", "green", "blue"] as const;',
    setupCode: 'const colors = ["red", "green", "blue"] as const;',
    expected: 'green',
    sample: 'colors[1]',
    hints: [
      'as const creates readonly tuple with literal types',
      'Type is readonly ["red", "green", "blue"]',
    ],
    validPatterns: [/colors\s*\[\s*1\s*\]/],
    tags: ['const-assertion', 'literal', 'readonly', 'typed-array'],
  },
  {
    id: 'ts-arr-const-union',
    category: 'Typed Array Operations',
    difficulty: 'medium',
    title: 'Extract Union from Const Array',
    text: 'Use as const array to create a union type of its values',
    setup:
      'const statuses = ["pending", "active", "completed"] as const;\ntype Status = typeof statuses[number];',
    setupCode:
      'const statuses = ["pending", "active", "completed"] as const;\ntype Status = typeof statuses[number];',
    expected: 'active',
    sample: '("active" as Status)',
    hints: [
      'typeof arr[number] extracts union of element types',
      'Result is "pending" | "active" | "completed"',
    ],
    validPatterns: [/as\s+Status/, /["']active["']/],
    tags: ['const-assertion', 'union', 'typeof', 'typed-array'],
  },
  {
    id: 'ts-arr-const-object-array',
    category: 'Typed Array Operations',
    difficulty: 'medium',
    title: 'Const Assertion with Object Array',
    text: 'Use as const with an array of objects to preserve literal types',
    setup:
      'const routes = [{ path: "/", name: "home" }, { path: "/about", name: "about" }] as const;',
    setupCode:
      'const routes = [{ path: "/", name: "home" }, { path: "/about", name: "about" }] as const;',
    expected: '/',
    sample: 'routes[0].path',
    hints: [
      'as const makes nested objects readonly too',
      'Property types are literal, not widened to string',
    ],
    validPatterns: [/routes\s*\[\s*0\s*\]\.path/],
    tags: ['const-assertion', 'object', 'readonly', 'typed-array'],
  },

  // ============================================================
  // Typed Array Operations - Typed Filter with Predicates
  // ============================================================
  {
    id: 'ts-arr-filter-instance',
    category: 'Typed Array Operations',
    difficulty: 'medium',
    title: 'Filter by Instance Type',
    text: 'Filter array to only Error instances using type predicate',
    setup:
      'class CustomError extends Error { code: number = 0; }\nconst items: (string | Error | CustomError)[] = ["text", new Error("err"), new CustomError("custom")];',
    setupCode:
      'class CustomError extends Error { code: number = 0; }\nconst items: (string | Error | CustomError)[] = ["text", new Error("err"), new CustomError("custom")];',
    expected: ['err', 'custom'],
    sample: 'items.filter((x): x is Error => x instanceof Error).map(e => e.message)',
    hints: [
      'instanceof checks class hierarchy',
      'CustomError extends Error, so both match',
    ],
    validPatterns: [/\.filter\s*\(\s*\([^)]*\)\s*:\s*\w+\s+is\s+Error/, /instanceof\s+Error/],
    tags: ['filter', 'type-predicate', 'instanceof', 'typed-array'],
  },
  {
    id: 'ts-arr-filter-property',
    category: 'Typed Array Operations',
    difficulty: 'hard',
    title: 'Filter by Property Existence',
    text: 'Filter to objects that have an optional property defined',
    setup:
      'interface Item { id: number; metadata?: { timestamp: number } }\nconst items: Item[] = [{ id: 1 }, { id: 2, metadata: { timestamp: 100 } }, { id: 3, metadata: { timestamp: 200 } }];',
    setupCode:
      'interface Item { id: number; metadata?: { timestamp: number } }\nconst items: Item[] = [{ id: 1 }, { id: 2, metadata: { timestamp: 100 } }, { id: 3, metadata: { timestamp: 200 } }];',
    expected: [100, 200],
    sample:
      'items.filter((x): x is Item & { metadata: { timestamp: number } } => x.metadata !== undefined).map(x => x.metadata.timestamp)',
    hints: [
      'Use intersection type to add the required property',
      'After filter, metadata is guaranteed to exist',
    ],
    validPatterns: [/\.filter\s*\(\s*\([^)]*\)\s*:\s*\w+\s+is/, /metadata\s*!==\s*undefined/],
    tags: ['filter', 'type-predicate', 'optional', 'typed-array'],
  },
  {
    id: 'ts-arr-filter-narrow-union',
    category: 'Typed Array Operations',
    difficulty: 'hard',
    title: 'Filter and Narrow Union Array',
    text: 'Filter discriminated union array to specific variant and access its unique property',
    setup:
      'type Event = { type: "click"; x: number; y: number } | { type: "keypress"; key: string } | { type: "scroll"; delta: number };\nconst events: Event[] = [{ type: "click", x: 10, y: 20 }, { type: "keypress", key: "a" }, { type: "click", x: 30, y: 40 }];',
    setupCode:
      'type Event = { type: "click"; x: number; y: number } | { type: "keypress"; key: string } | { type: "scroll"; delta: number };\nconst events: Event[] = [{ type: "click", x: 10, y: 20 }, { type: "keypress", key: "a" }, { type: "click", x: 30, y: 40 }];',
    expected: [10, 30],
    sample:
      'events.filter((e): e is Extract<Event, { type: "click" }> => e.type === "click").map(e => e.x)',
    hints: [
      'Extract pulls specific variant from union',
      'After filter, only click events remain',
    ],
    validPatterns: [
      /\.filter\s*\(\s*\([^)]*\)\s*:\s*\w+\s+is\s+Extract/,
      /type\s*===?\s*["']click["']/,
    ],
    tags: ['filter', 'type-predicate', 'discriminated-union', 'typed-array'],
  },
  {
    id: 'ts-arr-filter-chain-narrow',
    category: 'Typed Array Operations',
    difficulty: 'hard',
    title: 'Chained Filter with Type Narrowing',
    text: 'Chain multiple filters with type predicates to progressively narrow the type',
    setup:
      'interface User { id: number; name?: string; email?: string; verified?: boolean }\nconst users: User[] = [{ id: 1, name: "Alice", email: "a@test.com", verified: true }, { id: 2, name: "Bob" }, { id: 3, email: "c@test.com", verified: true }, { id: 4, name: "Dave", email: "d@test.com", verified: true }];',
    setupCode:
      'interface User { id: number; name?: string; email?: string; verified?: boolean }\nconst users: User[] = [{ id: 1, name: "Alice", email: "a@test.com", verified: true }, { id: 2, name: "Bob" }, { id: 3, email: "c@test.com", verified: true }, { id: 4, name: "Dave", email: "d@test.com", verified: true }];',
    expected: ['Alice', 'Dave'],
    sample:
      'users.filter((u): u is User & { name: string } => u.name !== undefined).filter((u): u is User & { name: string; verified: true } => u.verified === true).map(u => u.name)',
    hints: [
      'Each filter narrows the type further',
      'Intersection types accumulate requirements',
    ],
    validPatterns: [/\.filter\s*\([^)]+\)\.filter\s*\(/, /u\s+is\s+User\s*&/],
    tags: ['filter', 'chaining', 'progressive-narrowing', 'typed-array'],
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
