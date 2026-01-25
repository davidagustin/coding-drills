import type { Method } from '../types';

export const typescriptMethods: Method[] = [
  // ============================================================
  // Utility Types
  // ============================================================
  {
    name: 'Partial<T>',
    category: 'Utility Types',
    syntax: 'type Result = Partial<Type>',
    description:
      'Constructs a type with all properties of Type set to optional. Useful for update operations where you only need to specify changed fields.',
    arguments: [
      {
        name: 'Type',
        type: 'object type',
        description: 'The type to make all properties optional',
      },
    ],
    returns: {
      type: 'Type with optional properties',
      description: 'Same type but with all properties marked as optional',
    },
    examples: [
      {
        code: 'interface User { name: string; age: number; }\ntype PartialUser = Partial<User>;\n// { name?: string; age?: number; }',
        output: 'All properties become optional',
      },
      {
        code: 'function updateUser(user: User, updates: Partial<User>) {\n  return { ...user, ...updates };\n}',
        output: 'Allows partial updates',
      },
    ],
    relatedMethods: ['Required', 'Pick', 'Omit'],
    sinceVersion: 'TypeScript 2.1',
  },
  {
    name: 'Required<T>',
    category: 'Utility Types',
    syntax: 'type Result = Required<Type>',
    description:
      'Constructs a type with all properties of Type set to required. The opposite of Partial.',
    arguments: [
      {
        name: 'Type',
        type: 'object type',
        description: 'The type to make all properties required',
      },
    ],
    returns: {
      type: 'Type with required properties',
      description: 'Same type but with all properties marked as required',
    },
    examples: [
      {
        code: 'interface Props { a?: number; b?: string; }\ntype RequiredProps = Required<Props>;\n// { a: number; b: string; }',
        output: 'All properties become required',
      },
    ],
    relatedMethods: ['Partial', 'Pick', 'Omit'],
    sinceVersion: 'TypeScript 2.8',
  },
  {
    name: 'Readonly<T>',
    category: 'Utility Types',
    syntax: 'type Result = Readonly<Type>',
    description:
      'Constructs a type with all properties of Type set to readonly. Prevents reassignment of properties.',
    arguments: [
      {
        name: 'Type',
        type: 'object type',
        description: 'The type to make all properties readonly',
      },
    ],
    returns: {
      type: 'Type with readonly properties',
      description: 'Same type but with all properties marked as readonly',
    },
    examples: [
      {
        code: 'interface Todo { title: string; }\nconst todo: Readonly<Todo> = { title: "Delete inactive users" };\ntodo.title = "Hello"; // Error!',
        output: 'Properties cannot be reassigned',
      },
    ],
    relatedMethods: ['Partial', 'as const'],
    sinceVersion: 'TypeScript 2.1',
  },
  {
    name: 'Record<K, T>',
    category: 'Utility Types',
    syntax: 'type Result = Record<Keys, Type>',
    description:
      'Constructs an object type whose property keys are Keys and whose property values are Type. Useful for mapping one type to another.',
    arguments: [
      { name: 'Keys', type: 'string | number | symbol', description: 'The keys of the record' },
      { name: 'Type', type: 'any', description: 'The type of values in the record' },
    ],
    returns: {
      type: 'Object type',
      description: 'An object type with specified keys and value types',
    },
    examples: [
      {
        code: 'type CatName = "miffy" | "boris";\ninterface CatInfo { age: number; }\nconst cats: Record<CatName, CatInfo> = {\n  miffy: { age: 10 },\n  boris: { age: 5 }\n};',
        output: 'Maps cat names to cat info',
      },
      { code: 'type StringMap = Record<string, string>;', output: '{ [key: string]: string }' },
    ],
    relatedMethods: ['Pick', 'Omit', 'Partial'],
    sinceVersion: 'TypeScript 2.1',
  },
  {
    name: 'Pick<T, K>',
    category: 'Utility Types',
    syntax: 'type Result = Pick<Type, Keys>',
    description: 'Constructs a type by picking the set of properties Keys from Type.',
    arguments: [
      { name: 'Type', type: 'object type', description: 'The source type to pick from' },
      { name: 'Keys', type: 'keyof Type', description: 'The property keys to pick' },
    ],
    returns: {
      type: 'Partial object type',
      description: 'Object type with only the specified properties',
    },
    examples: [
      {
        code: 'interface Todo { title: string; description: string; completed: boolean; }\ntype TodoPreview = Pick<Todo, "title" | "completed">;\n// { title: string; completed: boolean; }',
        output: 'Selects only specified properties',
      },
    ],
    relatedMethods: ['Omit', 'Partial', 'Record'],
    sinceVersion: 'TypeScript 2.1',
  },
  {
    name: 'Omit<T, K>',
    category: 'Utility Types',
    syntax: 'type Result = Omit<Type, Keys>',
    description: 'Constructs a type by picking all properties from Type and then removing Keys.',
    arguments: [
      { name: 'Type', type: 'object type', description: 'The source type' },
      { name: 'Keys', type: 'keyof any', description: 'The property keys to omit' },
    ],
    returns: {
      type: 'Partial object type',
      description: 'Object type with specified properties removed',
    },
    examples: [
      {
        code: 'interface Todo { title: string; description: string; completed: boolean; }\ntype TodoPreview = Omit<Todo, "description">;\n// { title: string; completed: boolean; }',
        output: 'Removes specified properties',
      },
    ],
    relatedMethods: ['Pick', 'Partial', 'Exclude'],
    sinceVersion: 'TypeScript 3.5',
  },
  {
    name: 'Exclude<T, U>',
    category: 'Utility Types',
    syntax: 'type Result = Exclude<UnionType, ExcludedMembers>',
    description:
      'Constructs a type by excluding from UnionType all union members that are assignable to ExcludedMembers.',
    arguments: [
      { name: 'UnionType', type: 'union type', description: 'The union type to filter' },
      { name: 'ExcludedMembers', type: 'type', description: 'Members to exclude from the union' },
    ],
    returns: {
      type: 'Filtered union type',
      description: 'Union type with excluded members removed',
    },
    examples: [
      {
        code: 'type T = Exclude<"a" | "b" | "c", "a">;\n// "b" | "c"',
        output: 'Removes "a" from union',
      },
      {
        code: 'type T = Exclude<string | number | (() => void), Function>;\n// string | number',
        output: 'Removes function types',
      },
    ],
    relatedMethods: ['Extract', 'Omit', 'NonNullable'],
    sinceVersion: 'TypeScript 2.8',
  },
  {
    name: 'Extract<T, U>',
    category: 'Utility Types',
    syntax: 'type Result = Extract<Type, Union>',
    description:
      'Constructs a type by extracting from Type all union members that are assignable to Union.',
    arguments: [
      { name: 'Type', type: 'union type', description: 'The union type to extract from' },
      { name: 'Union', type: 'type', description: 'The type to match against' },
    ],
    returns: { type: 'Filtered union type', description: 'Union type with only matching members' },
    examples: [
      {
        code: 'type T = Extract<"a" | "b" | "c", "a" | "f">;\n// "a"',
        output: 'Keeps only matching members',
      },
      {
        code: 'type T = Extract<string | number | (() => void), Function>;\n// () => void',
        output: 'Extracts function types',
      },
    ],
    relatedMethods: ['Exclude', 'Pick', 'NonNullable'],
    sinceVersion: 'TypeScript 2.8',
  },
  {
    name: 'NonNullable<T>',
    category: 'Utility Types',
    syntax: 'type Result = NonNullable<Type>',
    description: 'Constructs a type by excluding null and undefined from Type.',
    arguments: [{ name: 'Type', type: 'type', description: 'The type to filter' }],
    returns: { type: 'Filtered type', description: 'Type with null and undefined removed' },
    examples: [
      {
        code: 'type T = NonNullable<string | number | null | undefined>;\n// string | number',
        output: 'Removes null and undefined',
      },
    ],
    relatedMethods: ['Exclude', 'Required'],
    sinceVersion: 'TypeScript 2.8',
  },
  {
    name: 'ReturnType<T>',
    category: 'Utility Types',
    syntax: 'type Result = ReturnType<FunctionType>',
    description: 'Constructs a type consisting of the return type of function Type.',
    arguments: [
      {
        name: 'Type',
        type: 'function type',
        description: 'The function type to extract return type from',
      },
    ],
    returns: { type: 'Return type', description: 'The return type of the function' },
    examples: [
      {
        code: 'type T = ReturnType<() => string>;\n// string',
        output: 'Extracts string return type',
      },
      {
        code: 'function getUser() { return { name: "Alice", age: 30 }; }\ntype User = ReturnType<typeof getUser>;\n// { name: string; age: number; }',
        output: 'Infers return type from function',
      },
    ],
    relatedMethods: ['Parameters', 'InstanceType', 'typeof'],
    sinceVersion: 'TypeScript 2.8',
  },
  {
    name: 'Parameters<T>',
    category: 'Utility Types',
    syntax: 'type Result = Parameters<FunctionType>',
    description:
      'Constructs a tuple type from the types used in the parameters of a function type.',
    arguments: [
      {
        name: 'Type',
        type: 'function type',
        description: 'The function type to extract parameters from',
      },
    ],
    returns: { type: 'Tuple type', description: 'Tuple of the function parameter types' },
    examples: [
      {
        code: 'type T = Parameters<(s: string, n: number) => void>;\n// [s: string, n: number]',
        output: 'Extracts parameter types as tuple',
      },
      {
        code: 'function greet(name: string, age: number) {}\ntype GreetParams = Parameters<typeof greet>;\n// [name: string, age: number]',
        output: 'Infers from function',
      },
    ],
    relatedMethods: ['ReturnType', 'ConstructorParameters'],
    sinceVersion: 'TypeScript 3.1',
  },
  {
    name: 'Awaited<T>',
    category: 'Utility Types',
    syntax: 'type Result = Awaited<Type>',
    description:
      'Recursively unwraps the "awaited type" of a type. Useful for modeling await in async functions or Promise.all.',
    arguments: [
      { name: 'Type', type: 'type', description: 'The type to unwrap (typically a Promise)' },
    ],
    returns: {
      type: 'Unwrapped type',
      description: 'The type that would be returned after awaiting',
    },
    examples: [
      { code: 'type A = Awaited<Promise<string>>;\n// string', output: 'Unwraps single Promise' },
      {
        code: 'type B = Awaited<Promise<Promise<number>>>;\n// number',
        output: 'Recursively unwraps nested Promises',
      },
    ],
    relatedMethods: ['ReturnType', 'Promise'],
    sinceVersion: 'TypeScript 4.5',
  },

  // ============================================================
  // Type Guards and Assertions
  // ============================================================
  {
    name: 'typeof',
    category: 'Type Operators',
    syntax: 'type T = typeof expression',
    description:
      'Captures the type of a value or variable. Useful for inferring types from existing values.',
    arguments: [{ name: 'expression', type: 'any', description: 'A value or variable' }],
    returns: { type: 'Type', description: 'The type of the expression' },
    examples: [
      {
        code: 'const config = { port: 3000, host: "localhost" };\ntype Config = typeof config;\n// { port: number; host: string; }',
        output: 'Infers type from value',
      },
      {
        code: 'function createUser(name: string) { return { name, id: Date.now() }; }\ntype User = ReturnType<typeof createUser>;',
        output: 'Used with ReturnType',
      },
    ],
    relatedMethods: ['keyof', 'ReturnType', 'instanceof'],
    sinceVersion: 'TypeScript 2.1',
  },
  {
    name: 'keyof',
    category: 'Type Operators',
    syntax: 'type Keys = keyof Type',
    description: 'Produces a union of the property names (keys) of an object type.',
    arguments: [
      { name: 'Type', type: 'object type', description: 'The object type to get keys from' },
    ],
    returns: { type: 'Union type', description: 'Union of all property names as string literals' },
    examples: [
      {
        code: 'interface Person { name: string; age: number; }\ntype PersonKeys = keyof Person;\n// "name" | "age"',
        output: 'Gets property name union',
      },
      {
        code: 'function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}',
        output: 'Used for type-safe property access',
      },
    ],
    relatedMethods: ['typeof', 'indexed access types', 'mapped types'],
    sinceVersion: 'TypeScript 2.1',
  },
  {
    name: 'is (type predicate)',
    category: 'Type Guards',
    syntax: 'function isType(value: unknown): value is Type',
    description:
      'Defines a user-defined type guard. When the function returns true, TypeScript narrows the type.',
    arguments: [{ name: 'value', type: 'unknown', description: 'The value to check' }],
    returns: { type: 'boolean', description: 'True if value is of the specified type' },
    examples: [
      {
        code: 'function isString(value: unknown): value is string {\n  return typeof value === "string";\n}\nconst x: unknown = "hello";\nif (isString(x)) {\n  x.toUpperCase(); // x is string here\n}',
        output: 'Narrows type in if block',
      },
      {
        code: 'function isNonNull<T>(value: T): value is NonNullable<T> {\n  return value != null;\n}',
        output: 'Generic type guard',
      },
    ],
    relatedMethods: ['typeof', 'instanceof', 'in operator'],
    sinceVersion: 'TypeScript 1.6',
  },
  {
    name: 'asserts (assertion function)',
    category: 'Type Guards',
    syntax: 'function assert(condition: unknown): asserts condition',
    description:
      'Defines an assertion function that throws if condition is false. TypeScript narrows the type after the assertion.',
    arguments: [{ name: 'condition', type: 'unknown', description: 'The condition to assert' }],
    returns: { type: 'void', description: 'Returns nothing if assertion passes, throws otherwise' },
    examples: [
      {
        code: 'function assertDefined<T>(value: T): asserts value is NonNullable<T> {\n  if (value === undefined || value === null) {\n    throw new Error("Value is not defined");\n  }\n}\nlet x: string | null = getValue();\nassertDefined(x);\nx.toUpperCase(); // x is string here',
        output: 'Narrows type after assertion',
      },
    ],
    relatedMethods: ['is', 'type predicates'],
    sinceVersion: 'TypeScript 3.7',
  },
  {
    name: 'as const',
    category: 'Type Assertions',
    syntax: 'const value = expression as const',
    description:
      'Creates a readonly type with literal types instead of general types. Makes arrays become readonly tuples and objects deeply readonly.',
    arguments: [],
    returns: {
      type: 'Readonly literal type',
      description: 'Deeply readonly type with literal values',
    },
    examples: [
      {
        code: 'const colors = ["red", "green", "blue"] as const;\n// readonly ["red", "green", "blue"]',
        output: 'Creates readonly tuple with literal types',
      },
      {
        code: 'const config = {\n  endpoint: "/api",\n  timeout: 5000\n} as const;\n// { readonly endpoint: "/api"; readonly timeout: 5000; }',
        output: 'Deep readonly with literal values',
      },
    ],
    relatedMethods: ['Readonly', 'readonly keyword'],
    sinceVersion: 'TypeScript 3.4',
  },
  {
    name: 'satisfies',
    category: 'Type Assertions',
    syntax: 'const value = expression satisfies Type',
    description:
      'Validates that an expression is assignable to a type without changing the inferred type. Preserves literal types while ensuring type safety.',
    arguments: [{ name: 'Type', type: 'type', description: 'The type to validate against' }],
    returns: { type: 'Original type', description: 'The original inferred type (not widened)' },
    examples: [
      {
        code: "type Colors = Record<string, [number, number, number]>;\nconst palette = {\n  red: [255, 0, 0],\n  green: [0, 255, 0],\n} satisfies Colors;\npalette.red.map(c => c); // Still knows it's a tuple!",
        output: 'Validates type while preserving literals',
      },
      {
        code: 'const routes = {\n  home: "/",\n  about: "/about",\n} satisfies Record<string, string>;\nroutes.home; // Type is "/" not string',
        output: 'Preserves literal string types',
      },
    ],
    relatedMethods: ['as', 'as const'],
    sinceVersion: 'TypeScript 4.9',
  },

  // ============================================================
  // Mapped Types
  // ============================================================
  {
    name: 'Mapped Types',
    category: 'Advanced Types',
    syntax: 'type Mapped<T> = { [P in keyof T]: NewType }',
    description:
      'Creates a new type by transforming properties of an existing type. Foundation for utility types like Partial and Readonly.',
    arguments: [{ name: 'T', type: 'object type', description: 'The source type to map over' }],
    returns: { type: 'Transformed type', description: 'New type with transformed properties' },
    examples: [
      {
        code: 'type Optional<T> = {\n  [P in keyof T]?: T[P];\n};\n// Same as Partial<T>',
        output: 'Makes all properties optional',
      },
      {
        code: 'type Getters<T> = {\n  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];\n};\ninterface Person { name: string; age: number; }\ntype PersonGetters = Getters<Person>;\n// { getName: () => string; getAge: () => number; }',
        output: 'Transforms property names with template literals',
      },
    ],
    relatedMethods: ['keyof', 'Partial', 'Readonly'],
    sinceVersion: 'TypeScript 2.1',
  },
  {
    name: 'Conditional Types',
    category: 'Advanced Types',
    syntax: 'T extends U ? X : Y',
    description:
      'Creates a type that depends on a condition. If T extends U, the type is X, otherwise Y.',
    arguments: [
      { name: 'T', type: 'type', description: 'The type to check' },
      { name: 'U', type: 'type', description: 'The type to check against' },
    ],
    returns: { type: 'Conditional type', description: 'X if T extends U, otherwise Y' },
    examples: [
      {
        code: 'type IsString<T> = T extends string ? true : false;\ntype A = IsString<string>; // true\ntype B = IsString<number>; // false',
        output: 'Type-level conditional',
      },
      {
        code: 'type Flatten<T> = T extends Array<infer U> ? U : T;\ntype A = Flatten<number[]>; // number\ntype B = Flatten<string>; // string',
        output: 'Uses infer for extraction',
      },
    ],
    relatedMethods: ['infer', 'Extract', 'Exclude'],
    sinceVersion: 'TypeScript 2.8',
  },
  {
    name: 'infer',
    category: 'Advanced Types',
    syntax: 'T extends SomeType<infer U> ? U : DefaultType',
    description:
      'Declares a type variable within a conditional type that can be referenced in the true branch.',
    arguments: [],
    returns: { type: 'Inferred type', description: 'The inferred type from the pattern' },
    examples: [
      {
        code: 'type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;\ntype A = GetReturnType<() => string>; // string',
        output: 'Infers function return type',
      },
      {
        code: 'type UnpackPromise<T> = T extends Promise<infer U> ? U : T;\ntype A = UnpackPromise<Promise<number>>; // number',
        output: 'Unwraps Promise type',
      },
      {
        code: 'type First<T> = T extends [infer F, ...any[]] ? F : never;\ntype A = First<[1, 2, 3]>; // 1',
        output: 'Extracts first tuple element',
      },
    ],
    relatedMethods: ['conditional types', 'ReturnType', 'Parameters'],
    sinceVersion: 'TypeScript 2.8',
  },
  {
    name: 'Template Literal Types',
    category: 'Advanced Types',
    syntax: 'type T = `prefix${Type}suffix`',
    description:
      'Creates string literal types by interpolating other types. Enables powerful string manipulation at the type level.',
    arguments: [],
    returns: { type: 'String literal type', description: 'Computed string literal type' },
    examples: [
      {
        code: 'type Greeting = `Hello, ${string}!`;\nconst g: Greeting = "Hello, World!"; // Valid',
        output: 'Pattern matching strings',
      },
      {
        code: 'type EventName = "click" | "focus";\ntype Handler = `on${Capitalize<EventName>}`;\n// "onClick" | "onFocus"',
        output: 'Transforms union members',
      },
      {
        code: 'type PropGetter<T extends string> = `get${Capitalize<T>}`;\ntype A = PropGetter<"name">; // "getName"',
        output: 'Dynamic property names',
      },
    ],
    relatedMethods: ['Capitalize', 'Uncapitalize', 'Uppercase', 'Lowercase'],
    sinceVersion: 'TypeScript 4.1',
  },

  // ============================================================
  // String Manipulation Types
  // ============================================================
  {
    name: 'Uppercase<S>',
    category: 'String Types',
    syntax: 'type Result = Uppercase<StringType>',
    description: 'Converts each character in the string type to uppercase.',
    arguments: [
      {
        name: 'StringType',
        type: 'string literal type',
        description: 'The string type to transform',
      },
    ],
    returns: {
      type: 'Uppercase string literal',
      description: 'String with all characters uppercased',
    },
    examples: [
      { code: 'type T = Uppercase<"hello">; // "HELLO"', output: 'Transforms to uppercase' },
      {
        code: 'type Events = "click" | "focus";\ntype UpperEvents = Uppercase<Events>; // "CLICK" | "FOCUS"',
        output: 'Works with unions',
      },
    ],
    relatedMethods: ['Lowercase', 'Capitalize', 'Uncapitalize'],
    sinceVersion: 'TypeScript 4.1',
  },
  {
    name: 'Lowercase<S>',
    category: 'String Types',
    syntax: 'type Result = Lowercase<StringType>',
    description: 'Converts each character in the string type to lowercase.',
    arguments: [
      {
        name: 'StringType',
        type: 'string literal type',
        description: 'The string type to transform',
      },
    ],
    returns: {
      type: 'Lowercase string literal',
      description: 'String with all characters lowercased',
    },
    examples: [
      { code: 'type T = Lowercase<"HELLO">; // "hello"', output: 'Transforms to lowercase' },
    ],
    relatedMethods: ['Uppercase', 'Capitalize', 'Uncapitalize'],
    sinceVersion: 'TypeScript 4.1',
  },
  {
    name: 'Capitalize<S>',
    category: 'String Types',
    syntax: 'type Result = Capitalize<StringType>',
    description: 'Converts the first character of the string type to uppercase.',
    arguments: [
      {
        name: 'StringType',
        type: 'string literal type',
        description: 'The string type to transform',
      },
    ],
    returns: {
      type: 'Capitalized string literal',
      description: 'String with first character uppercased',
    },
    examples: [
      { code: 'type T = Capitalize<"hello">; // "Hello"', output: 'Capitalizes first letter' },
      {
        code: 'type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] };',
        output: 'Useful in mapped types',
      },
    ],
    relatedMethods: ['Uncapitalize', 'Uppercase', 'Lowercase'],
    sinceVersion: 'TypeScript 4.1',
  },
  {
    name: 'Uncapitalize<S>',
    category: 'String Types',
    syntax: 'type Result = Uncapitalize<StringType>',
    description: 'Converts the first character of the string type to lowercase.',
    arguments: [
      {
        name: 'StringType',
        type: 'string literal type',
        description: 'The string type to transform',
      },
    ],
    returns: {
      type: 'Uncapitalized string literal',
      description: 'String with first character lowercased',
    },
    examples: [
      { code: 'type T = Uncapitalize<"Hello">; // "hello"', output: 'Uncapitalizes first letter' },
    ],
    relatedMethods: ['Capitalize', 'Uppercase', 'Lowercase'],
    sinceVersion: 'TypeScript 4.1',
  },

  // ============================================================
  // Array/Tuple Types
  // ============================================================
  {
    name: 'Array<T>',
    category: 'Collection Types',
    syntax: 'type Result = Array<ElementType> | ElementType[]',
    description:
      'Represents an array of elements of type T. Both Array<T> and T[] syntaxes are equivalent.',
    arguments: [{ name: 'ElementType', type: 'type', description: 'The type of array elements' }],
    returns: { type: 'Array type', description: 'Array containing elements of the specified type' },
    examples: [
      {
        code: 'const numbers: Array<number> = [1, 2, 3];\nconst strings: string[] = ["a", "b"];',
        output: 'Both syntaxes are equivalent',
      },
      {
        code: 'type Matrix = Array<Array<number>>;\ntype Matrix2 = number[][];',
        output: 'Nested arrays',
      },
    ],
    relatedMethods: ['ReadonlyArray', 'tuple types'],
    sinceVersion: 'TypeScript 1.0',
  },
  {
    name: 'ReadonlyArray<T>',
    category: 'Collection Types',
    syntax: 'type Result = ReadonlyArray<ElementType> | readonly ElementType[]',
    description:
      'Represents an immutable array. Prevents push, pop, and direct element assignment.',
    arguments: [{ name: 'ElementType', type: 'type', description: 'The type of array elements' }],
    returns: { type: 'Readonly array type', description: 'Array that cannot be modified' },
    examples: [
      {
        code: 'const arr: ReadonlyArray<number> = [1, 2, 3];\narr.push(4); // Error!\narr[0] = 10; // Error!',
        output: 'Prevents mutations',
      },
      { code: 'const arr: readonly string[] = ["a", "b"];', output: 'Shorthand syntax' },
    ],
    relatedMethods: ['Array', 'Readonly', 'as const'],
    sinceVersion: 'TypeScript 3.4',
  },
  {
    name: 'Tuple Types',
    category: 'Collection Types',
    syntax: 'type Tuple = [Type1, Type2, ...]',
    description:
      'Fixed-length array where each element can have a different type. Position determines the type.',
    arguments: [],
    returns: { type: 'Tuple type', description: 'Fixed-length typed array' },
    examples: [
      {
        code: 'type Point = [number, number];\nconst p: Point = [10, 20];',
        output: 'Two-element number tuple',
      },
      {
        code: 'type Response = [number, string, boolean];\nconst r: Response = [200, "OK", true];',
        output: 'Mixed type tuple',
      },
      {
        code: 'type StringNumberPair = [string, number, ...boolean[]];\nconst x: StringNumberPair = ["hello", 1, true, false];',
        output: 'Rest elements in tuples',
      },
    ],
    relatedMethods: ['Array', 'readonly tuples', 'named tuples'],
    sinceVersion: 'TypeScript 1.0',
  },

  // ============================================================
  // Object Types
  // ============================================================
  {
    name: 'Index Signatures',
    category: 'Object Types',
    syntax: '{ [key: KeyType]: ValueType }',
    description:
      'Describes objects that can have any number of properties with the specified key and value types.',
    arguments: [
      { name: 'KeyType', type: 'string | number | symbol', description: 'Type of property keys' },
      { name: 'ValueType', type: 'type', description: 'Type of property values' },
    ],
    returns: { type: 'Index signature type', description: 'Object type accepting dynamic keys' },
    examples: [
      {
        code: 'interface StringMap {\n  [key: string]: string;\n}\nconst map: StringMap = { foo: "bar", baz: "qux" };',
        output: 'Any string keys with string values',
      },
      {
        code: 'interface NumberArray {\n  [index: number]: string;\n}\nconst arr: NumberArray = ["a", "b"];',
        output: 'Numeric index signature',
      },
    ],
    relatedMethods: ['Record', 'Map', 'keyof'],
    sinceVersion: 'TypeScript 1.0',
  },
  {
    name: 'PropertyKey',
    category: 'Object Types',
    syntax: 'type PropertyKey = string | number | symbol',
    description: 'Built-in type representing all possible property key types in JavaScript.',
    arguments: [],
    returns: { type: 'Union type', description: 'string | number | symbol' },
    examples: [
      {
        code: 'function getProperty(obj: object, key: PropertyKey) {\n  return (obj as any)[key];\n}',
        output: 'Accepts any valid key type',
      },
    ],
    relatedMethods: ['keyof', 'index signatures'],
    sinceVersion: 'TypeScript 2.9',
  },

  // ============================================================
  // Function Types
  // ============================================================
  {
    name: 'Function Overloads',
    category: 'Function Types',
    syntax:
      'function name(a: T1): R1;\nfunction name(a: T2): R2;\nfunction name(a: T1 | T2) { ... }',
    description:
      'Allows a function to have multiple type signatures. TypeScript selects the appropriate signature based on arguments.',
    arguments: [],
    returns: {
      type: 'Varies by overload',
      description: 'Return type depends on which overload matches',
    },
    examples: [
      {
        code: 'function greet(person: string): string;\nfunction greet(persons: string[]): string[];\nfunction greet(input: string | string[]) {\n  if (Array.isArray(input)) {\n    return input.map(p => `Hello, ${p}`);\n  }\n  return `Hello, ${input}`;\n}',
        output: 'Different behavior based on input type',
      },
    ],
    relatedMethods: ['generic functions', 'conditional types'],
    sinceVersion: 'TypeScript 1.0',
  },
  {
    name: 'Generic Functions',
    category: 'Function Types',
    syntax: 'function name<T>(arg: T): T',
    description:
      'Functions that work with multiple types while maintaining type relationships. Type parameters are inferred from arguments.',
    arguments: [
      { name: 'T', type: 'type parameter', description: 'Generic type that will be inferred' },
    ],
    returns: { type: 'Depends on T', description: 'Return type related to input type' },
    examples: [
      {
        code: 'function identity<T>(arg: T): T {\n  return arg;\n}\nconst str = identity("hello"); // type is string\nconst num = identity(42); // type is number',
        output: 'Type is inferred from argument',
      },
      {
        code: 'function firstElement<T>(arr: T[]): T | undefined {\n  return arr[0];\n}\nconst first = firstElement([1, 2, 3]); // number | undefined',
        output: 'Works with arrays',
      },
    ],
    relatedMethods: ['generic constraints', 'generic classes'],
    sinceVersion: 'TypeScript 1.0',
  },
  {
    name: 'Generic Constraints',
    category: 'Function Types',
    syntax: 'function name<T extends Constraint>(arg: T): T',
    description: 'Restricts generic type parameters to types that satisfy certain requirements.',
    arguments: [{ name: 'Constraint', type: 'type', description: 'The type that T must extend' }],
    returns: { type: 'Constrained generic', description: 'Type parameter limited to constraint' },
    examples: [
      {
        code: 'function getLength<T extends { length: number }>(arg: T): number {\n  return arg.length;\n}\ngetLength("hello"); // 5\ngetLength([1, 2, 3]); // 3',
        output: 'Constrains to types with length',
      },
      {
        code: 'function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\nconst user = { name: "Alice", age: 30 };\nconst name = getProperty(user, "name"); // string',
        output: 'Key must be property of object',
      },
    ],
    relatedMethods: ['keyof', 'extends'],
    sinceVersion: 'TypeScript 1.0',
  },

  // ============================================================
  // Class Types
  // ============================================================
  {
    name: 'InstanceType<T>',
    category: 'Utility Types',
    syntax: 'type Instance = InstanceType<ConstructorType>',
    description:
      'Constructs a type consisting of the instance type of a constructor function type.',
    arguments: [
      {
        name: 'Type',
        type: 'constructor type',
        description: 'A class or constructor function type',
      },
    ],
    returns: {
      type: 'Instance type',
      description: 'The type of instances created by the constructor',
    },
    examples: [
      {
        code: 'class User {\n  name: string;\n  constructor(name: string) { this.name = name; }\n}\ntype UserInstance = InstanceType<typeof User>;\n// User',
        output: 'Gets instance type from class',
      },
    ],
    relatedMethods: ['ConstructorParameters', 'typeof'],
    sinceVersion: 'TypeScript 2.8',
  },
  {
    name: 'ConstructorParameters<T>',
    category: 'Utility Types',
    syntax: 'type Params = ConstructorParameters<ConstructorType>',
    description:
      'Constructs a tuple type from the types of a constructor function parameter types.',
    arguments: [
      {
        name: 'Type',
        type: 'constructor type',
        description: 'A class or constructor function type',
      },
    ],
    returns: { type: 'Tuple type', description: 'Tuple of constructor parameter types' },
    examples: [
      {
        code: 'class User {\n  constructor(public name: string, public age: number) {}\n}\ntype UserParams = ConstructorParameters<typeof User>;\n// [name: string, age: number]',
        output: 'Extracts constructor params',
      },
    ],
    relatedMethods: ['InstanceType', 'Parameters'],
    sinceVersion: 'TypeScript 3.1',
  },
  {
    name: 'ThisType<T>',
    category: 'Utility Types',
    syntax: 'type WithThis = ObjectType & ThisType<T>',
    description:
      'Marks the contextual this type in an object literal. Useful for defining methods that have access to a specific this type.',
    arguments: [{ name: 'Type', type: 'type', description: 'The type to use for this' }],
    returns: {
      type: 'Marker type',
      description: 'Does not return a type, only marks this context',
    },
    examples: [
      {
        code: 'type ObjectDescriptor<D, M> = {\n  data?: D;\n  methods?: M & ThisType<D & M>;\n};\nfunction makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {\n  let data: object = desc.data || {};\n  let methods: object = desc.methods || {};\n  return { ...data, ...methods } as D & M;\n}',
        output: 'Methods have access to typed this',
      },
    ],
    relatedMethods: ['this parameter'],
    sinceVersion: 'TypeScript 2.3',
    notes: ['Requires noImplicitThis compiler option'],
  },
];

export default typescriptMethods;
