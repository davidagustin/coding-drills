/**
 * Curated list of beginner problems.
 *
 * These problems focus on fundamental programming concepts:
 * - For loops and iteration
 * - Conditional statements (if/else, switch)
 * - Basic data structures (arrays, Map, Set)
 * - Simple function definitions
 *
 * For database languages:
 * - Basic SELECT queries
 * - Simple WHERE clauses
 * - INSERT and UPDATE statements
 *
 * Organized by language for O(1) lookup via Sets.
 */

// ---------------------------------------------------------------------------
// JavaScript – beginner essentials (~15 problems)
// ---------------------------------------------------------------------------

const JS_BEGINNER_IDS: string[] = [
  // -- For Loops & Iteration (5 problems) --
  'js-beginner-loop-001',
  'js-beginner-loop-002',
  'js-beginner-loop-003',
  'js-beginner-loop-004',
  'js-beginner-loop-005',

  // -- Conditionals (4 problems) --
  'js-beginner-cond-001',
  'js-beginner-cond-002',
  'js-beginner-cond-003',
  'js-beginner-cond-004',

  // -- Arrays (3 problems) --
  'js-beginner-array-001',
  'js-beginner-array-002',
  'js-beginner-array-003',

  // -- Map/Set (2 problems) --
  'js-beginner-map-001',
  'js-beginner-map-002',

  // -- Functions (2 problems) --
  'js-beginner-func-001',
  'js-beginner-func-002',
];

// ---------------------------------------------------------------------------
// TypeScript – beginner essentials (~15 problems)
// ---------------------------------------------------------------------------

const TS_BEGINNER_IDS: string[] = [
  // -- For Loops & Iteration (5 problems) --
  'ts-beginner-loop-001',
  'ts-beginner-loop-002',
  'ts-beginner-loop-003',
  'ts-beginner-loop-004',
  'ts-beginner-loop-005',

  // -- Conditionals (4 problems) --
  'ts-beginner-cond-001',
  'ts-beginner-cond-002',
  'ts-beginner-cond-003',
  'ts-beginner-cond-004',

  // -- Arrays (3 problems) --
  'ts-beginner-array-001',
  'ts-beginner-array-002',
  'ts-beginner-array-003',

  // -- Map/Set (2 problems) --
  'ts-beginner-map-001',
  'ts-beginner-map-002',

  // -- Functions (2 problems) --
  'ts-beginner-func-001',
  'ts-beginner-func-002',
];

// ---------------------------------------------------------------------------
// Python – beginner essentials (~15 problems)
// ---------------------------------------------------------------------------

const PY_BEGINNER_IDS: string[] = [
  // -- For Loops & Iteration (5 problems) --
  'py-beginner-loop-001',
  'py-beginner-loop-002',
  'py-beginner-loop-003',
  'py-beginner-loop-004',
  'py-beginner-loop-005',

  // -- Conditionals (4 problems) --
  'py-beginner-cond-001',
  'py-beginner-cond-002',
  'py-beginner-cond-003',
  'py-beginner-cond-004',

  // -- Lists (3 problems) --
  'py-beginner-list-001',
  'py-beginner-list-002',
  'py-beginner-list-003',

  // -- Dictionaries (2 problems) --
  'py-beginner-dict-001',
  'py-beginner-dict-002',

  // -- Functions (2 problems) --
  'py-beginner-func-001',
  'py-beginner-func-002',
];

// ---------------------------------------------------------------------------
// Java – beginner essentials (~12 problems)
// ---------------------------------------------------------------------------

const JAVA_BEGINNER_IDS: string[] = [
  // -- For Loops (4 problems) --
  'java-beginner-loop-001',
  'java-beginner-loop-002',
  'java-beginner-loop-003',
  'java-beginner-loop-004',

  // -- Conditionals (3 problems) --
  'java-beginner-cond-001',
  'java-beginner-cond-002',
  'java-beginner-cond-003',

  // -- Arrays (3 problems) --
  'java-beginner-array-001',
  'java-beginner-array-002',
  'java-beginner-array-003',

  // -- Collections (2 problems) --
  'java-beginner-collection-001',
  'java-beginner-collection-002',
];

// ---------------------------------------------------------------------------
// C++ – beginner essentials (~12 problems)
// ---------------------------------------------------------------------------

const CPP_BEGINNER_IDS: string[] = [
  // -- For Loops (4 problems) --
  'cpp-beginner-loop-001',
  'cpp-beginner-loop-002',
  'cpp-beginner-loop-003',
  'cpp-beginner-loop-004',

  // -- Conditionals (3 problems) --
  'cpp-beginner-cond-001',
  'cpp-beginner-cond-002',
  'cpp-beginner-cond-003',

  // -- Arrays/Vectors (3 problems) --
  'cpp-beginner-array-001',
  'cpp-beginner-array-002',
  'cpp-beginner-array-003',

  // -- Maps (2 problems) --
  'cpp-beginner-map-001',
  'cpp-beginner-map-002',
];

// ---------------------------------------------------------------------------
// C# – beginner essentials (~12 problems)
// ---------------------------------------------------------------------------

const CSHARP_BEGINNER_IDS: string[] = [
  // -- For Loops (4 problems) --
  'cs-beginner-loop-001',
  'cs-beginner-loop-002',
  'cs-beginner-loop-003',
  'cs-beginner-loop-004',

  // -- Conditionals (3 problems) --
  'cs-beginner-cond-001',
  'cs-beginner-cond-002',
  'cs-beginner-cond-003',

  // -- Arrays/Lists (3 problems) --
  'cs-beginner-array-001',
  'cs-beginner-array-002',
  'cs-beginner-array-003',

  // -- Dictionaries (2 problems) --
  'cs-beginner-dict-001',
  'cs-beginner-dict-002',
];

// ---------------------------------------------------------------------------
// Go – beginner essentials (~12 problems)
// ---------------------------------------------------------------------------

const GO_BEGINNER_IDS: string[] = [
  // -- For Loops (4 problems) --
  'go-beginner-loop-001',
  'go-beginner-loop-002',
  'go-beginner-loop-003',
  'go-beginner-loop-004',

  // -- Conditionals (3 problems) --
  'go-beginner-cond-001',
  'go-beginner-cond-002',
  'go-beginner-cond-003',

  // -- Slices (3 problems) --
  'go-beginner-slice-001',
  'go-beginner-slice-002',
  'go-beginner-slice-003',

  // -- Maps (2 problems) --
  'go-beginner-map-001',
  'go-beginner-map-002',
];

// ---------------------------------------------------------------------------
// Ruby – beginner essentials (~12 problems)
// ---------------------------------------------------------------------------

const RUBY_BEGINNER_IDS: string[] = [
  // -- Loops (4 problems) --
  'rb-beginner-loop-001',
  'rb-beginner-loop-002',
  'rb-beginner-loop-003',
  'rb-beginner-loop-004',

  // -- Conditionals (3 problems) --
  'rb-beginner-cond-001',
  'rb-beginner-cond-002',
  'rb-beginner-cond-003',

  // -- Arrays (3 problems) --
  'rb-beginner-array-001',
  'rb-beginner-array-002',
  'rb-beginner-array-003',

  // -- Hashes (2 problems) --
  'rb-beginner-hash-001',
  'rb-beginner-hash-002',
];

// ---------------------------------------------------------------------------
// PHP – beginner essentials (~12 problems)
// ---------------------------------------------------------------------------

const PHP_BEGINNER_IDS: string[] = [
  // -- Loops (4 problems) --
  'php-beginner-loop-001',
  'php-beginner-loop-002',
  'php-beginner-loop-003',
  'php-beginner-loop-004',

  // -- Conditionals (3 problems) --
  'php-beginner-cond-001',
  'php-beginner-cond-002',
  'php-beginner-cond-003',

  // -- Arrays (3 problems) --
  'php-beginner-array-001',
  'php-beginner-array-002',
  'php-beginner-array-003',

  // -- Associative Arrays (2 problems) --
  'php-beginner-assoc-001',
  'php-beginner-assoc-002',
];

// ---------------------------------------------------------------------------
// Kotlin – beginner essentials (~12 problems)
// ---------------------------------------------------------------------------

const KOTLIN_BEGINNER_IDS: string[] = [
  // -- Loops (4 problems) --
  'kt-beginner-loop-001',
  'kt-beginner-loop-002',
  'kt-beginner-loop-003',
  'kt-beginner-loop-004',

  // -- Conditionals (3 problems) --
  'kt-beginner-cond-001',
  'kt-beginner-cond-002',
  'kt-beginner-cond-003',

  // -- Lists (3 problems) --
  'kt-beginner-list-001',
  'kt-beginner-list-002',
  'kt-beginner-list-003',

  // -- Maps (2 problems) --
  'kt-beginner-map-001',
  'kt-beginner-map-002',
];

// ---------------------------------------------------------------------------
// Swift – beginner essentials (~12 problems)
// ---------------------------------------------------------------------------

const SWIFT_BEGINNER_IDS: string[] = [
  // -- Loops (4 problems) --
  'swift-beginner-loop-001',
  'swift-beginner-loop-002',
  'swift-beginner-loop-003',
  'swift-beginner-loop-004',

  // -- Conditionals (3 problems) --
  'swift-beginner-cond-001',
  'swift-beginner-cond-002',
  'swift-beginner-cond-003',

  // -- Arrays (3 problems) --
  'swift-beginner-array-001',
  'swift-beginner-array-002',
  'swift-beginner-array-003',

  // -- Dictionaries (2 problems) --
  'swift-beginner-dict-001',
  'swift-beginner-dict-002',
];

// ---------------------------------------------------------------------------
// Dart – beginner essentials (~12 problems)
// ---------------------------------------------------------------------------

const DART_BEGINNER_IDS: string[] = [
  // -- Loops (4 problems) --
  'dart-beginner-loop-001',
  'dart-beginner-loop-002',
  'dart-beginner-loop-003',
  'dart-beginner-loop-004',

  // -- Conditionals (3 problems) --
  'dart-beginner-cond-001',
  'dart-beginner-cond-002',
  'dart-beginner-cond-003',

  // -- Lists (3 problems) --
  'dart-beginner-list-001',
  'dart-beginner-list-002',
  'dart-beginner-list-003',

  // -- Maps (2 problems) --
  'dart-beginner-map-001',
  'dart-beginner-map-002',
];

// ---------------------------------------------------------------------------
// Rust – beginner essentials (~12 problems)
// ---------------------------------------------------------------------------

const RUST_BEGINNER_IDS: string[] = [
  // -- Loops (4 problems) --
  'rs-beginner-loop-001',
  'rs-beginner-loop-002',
  'rs-beginner-loop-003',
  'rs-beginner-loop-004',

  // -- Conditionals (3 problems) --
  'rs-beginner-cond-001',
  'rs-beginner-cond-002',
  'rs-beginner-cond-003',

  // -- Vectors (3 problems) --
  'rs-beginner-vec-001',
  'rs-beginner-vec-002',
  'rs-beginner-vec-003',

  // -- HashMaps (2 problems) --
  'rs-beginner-hashmap-001',
  'rs-beginner-hashmap-002',
];

// ---------------------------------------------------------------------------
// Scala – beginner essentials (~10 problems)
// ---------------------------------------------------------------------------

const SCALA_BEGINNER_IDS: string[] = [
  // -- Loops (3 problems) --
  'scala-beginner-loop-001',
  'scala-beginner-loop-002',
  'scala-beginner-loop-003',

  // -- Conditionals (3 problems) --
  'scala-beginner-cond-001',
  'scala-beginner-cond-002',
  'scala-beginner-cond-003',

  // -- Collections (2 problems) --
  'scala-beginner-list-001',
  'scala-beginner-list-002',

  // -- Maps (2 problems) --
  'scala-beginner-map-001',
  'scala-beginner-map-002',
];

// ---------------------------------------------------------------------------
// R – beginner essentials (~10 problems)
// ---------------------------------------------------------------------------

const R_BEGINNER_IDS: string[] = [
  // -- Loops (3 problems) --
  'r-beginner-loop-001',
  'r-beginner-loop-002',
  'r-beginner-loop-003',

  // -- Conditionals (3 problems) --
  'r-beginner-cond-001',
  'r-beginner-cond-002',
  'r-beginner-cond-003',

  // -- Vectors (2 problems) --
  'r-beginner-vector-001',
  'r-beginner-vector-002',

  // -- Lists (2 problems) --
  'r-beginner-list-001',
  'r-beginner-list-002',
];

// ---------------------------------------------------------------------------
// Perl – beginner essentials (~10 problems)
// ---------------------------------------------------------------------------

const PERL_BEGINNER_IDS: string[] = [
  // -- Loops (3 problems) --
  'perl-beginner-loop-001',
  'perl-beginner-loop-002',
  'perl-beginner-loop-003',

  // -- Conditionals (3 problems) --
  'perl-beginner-cond-001',
  'perl-beginner-cond-002',
  'perl-beginner-cond-003',

  // -- Arrays (2 problems) --
  'perl-beginner-array-001',
  'perl-beginner-array-002',

  // -- Hashes (2 problems) --
  'perl-beginner-hash-001',
  'perl-beginner-hash-002',
];

// ---------------------------------------------------------------------------
// Lua – beginner essentials (~10 problems)
// ---------------------------------------------------------------------------

const LUA_BEGINNER_IDS: string[] = [
  // -- Loops (3 problems) --
  'lua-beginner-loop-001',
  'lua-beginner-loop-002',
  'lua-beginner-loop-003',

  // -- Conditionals (3 problems) --
  'lua-beginner-cond-001',
  'lua-beginner-cond-002',
  'lua-beginner-cond-003',

  // -- Tables (4 problems) --
  'lua-beginner-table-001',
  'lua-beginner-table-002',
  'lua-beginner-table-003',
  'lua-beginner-table-004',
];

// ---------------------------------------------------------------------------
// Haskell – beginner essentials (~10 problems)
// ---------------------------------------------------------------------------

const HASKELL_BEGINNER_IDS: string[] = [
  // -- Recursion/Iteration (3 problems) --
  'hs-beginner-recursion-001',
  'hs-beginner-recursion-002',
  'hs-beginner-recursion-003',

  // -- Pattern Matching (3 problems) --
  'hs-beginner-pattern-001',
  'hs-beginner-pattern-002',
  'hs-beginner-pattern-003',

  // -- Lists (4 problems) --
  'hs-beginner-list-001',
  'hs-beginner-list-002',
  'hs-beginner-list-003',
  'hs-beginner-list-004',
];

// ---------------------------------------------------------------------------
// Elixir – beginner essentials (~10 problems)
// ---------------------------------------------------------------------------

const ELIXIR_BEGINNER_IDS: string[] = [
  // -- Recursion/Iteration (3 problems) --
  'ex-beginner-recursion-001',
  'ex-beginner-recursion-002',
  'ex-beginner-recursion-003',

  // -- Pattern Matching (3 problems) --
  'ex-beginner-pattern-001',
  'ex-beginner-pattern-002',
  'ex-beginner-pattern-003',

  // -- Lists (2 problems) --
  'ex-beginner-list-001',
  'ex-beginner-list-002',

  // -- Maps (2 problems) --
  'ex-beginner-map-001',
  'ex-beginner-map-002',
];

// ---------------------------------------------------------------------------
// Clojure – beginner essentials (~10 problems)
// ---------------------------------------------------------------------------

const CLOJURE_BEGINNER_IDS: string[] = [
  // -- Recursion/Iteration (3 problems) --
  'clj-beginner-recursion-001',
  'clj-beginner-recursion-002',
  'clj-beginner-recursion-003',

  // -- Conditionals (3 problems) --
  'clj-beginner-cond-001',
  'clj-beginner-cond-002',
  'clj-beginner-cond-003',

  // -- Sequences (2 problems) --
  'clj-beginner-seq-001',
  'clj-beginner-seq-002',

  // -- Maps (2 problems) --
  'clj-beginner-map-001',
  'clj-beginner-map-002',
];

// ---------------------------------------------------------------------------
// C – beginner essentials (~10 problems)
// ---------------------------------------------------------------------------

const C_BEGINNER_IDS: string[] = [
  // -- Loops (4 problems) --
  'c-beginner-loop-001',
  'c-beginner-loop-002',
  'c-beginner-loop-003',
  'c-beginner-loop-004',

  // -- Conditionals (3 problems) --
  'c-beginner-cond-001',
  'c-beginner-cond-002',
  'c-beginner-cond-003',

  // -- Arrays (3 problems) --
  'c-beginner-array-001',
  'c-beginner-array-002',
  'c-beginner-array-003',
];

// ---------------------------------------------------------------------------
// MySQL – beginner essentials (~10 problems)
// ---------------------------------------------------------------------------

const MYSQL_BEGINNER_IDS: string[] = [
  // -- SELECT (4 problems) --
  'mysql-beginner-select-001',
  'mysql-beginner-select-002',
  'mysql-beginner-select-003',
  'mysql-beginner-select-004',

  // -- WHERE (3 problems) --
  'mysql-beginner-where-001',
  'mysql-beginner-where-002',
  'mysql-beginner-where-003',

  // -- INSERT (2 problems) --
  'mysql-beginner-insert-001',
  'mysql-beginner-insert-002',

  // -- UPDATE (1 problem) --
  'mysql-beginner-update-001',
];

// ---------------------------------------------------------------------------
// PostgreSQL – beginner essentials (~10 problems)
// ---------------------------------------------------------------------------

const POSTGRESQL_BEGINNER_IDS: string[] = [
  // -- SELECT (4 problems) --
  'pg-beginner-select-001',
  'pg-beginner-select-002',
  'pg-beginner-select-003',
  'pg-beginner-select-004',

  // -- WHERE (3 problems) --
  'pg-beginner-where-001',
  'pg-beginner-where-002',
  'pg-beginner-where-003',

  // -- INSERT (2 problems) --
  'pg-beginner-insert-001',
  'pg-beginner-insert-002',

  // -- UPDATE (1 problem) --
  'pg-beginner-update-001',
];

// ---------------------------------------------------------------------------
// MongoDB – beginner essentials (~10 problems)
// ---------------------------------------------------------------------------

const MONGODB_BEGINNER_IDS: string[] = [
  // -- Find (4 problems) --
  'mongo-beginner-find-001',
  'mongo-beginner-find-002',
  'mongo-beginner-find-003',
  'mongo-beginner-find-004',

  // -- Query Operators (3 problems) --
  'mongo-beginner-query-001',
  'mongo-beginner-query-002',
  'mongo-beginner-query-003',

  // -- Insert (2 problems) --
  'mongo-beginner-insert-001',
  'mongo-beginner-insert-002',

  // -- Update (1 problem) --
  'mongo-beginner-update-001',
];

// ---------------------------------------------------------------------------
// Lookup Sets – O(1) membership checks
// ---------------------------------------------------------------------------

const jsSet = new Set(JS_BEGINNER_IDS);
const tsSet = new Set(TS_BEGINNER_IDS);
const pySet = new Set(PY_BEGINNER_IDS);
const javaSet = new Set(JAVA_BEGINNER_IDS);
const cppSet = new Set(CPP_BEGINNER_IDS);
const csharpSet = new Set(CSHARP_BEGINNER_IDS);
const goSet = new Set(GO_BEGINNER_IDS);
const rubySet = new Set(RUBY_BEGINNER_IDS);
const phpSet = new Set(PHP_BEGINNER_IDS);
const kotlinSet = new Set(KOTLIN_BEGINNER_IDS);
const swiftSet = new Set(SWIFT_BEGINNER_IDS);
const dartSet = new Set(DART_BEGINNER_IDS);
const rustSet = new Set(RUST_BEGINNER_IDS);
const scalaSet = new Set(SCALA_BEGINNER_IDS);
const rSet = new Set(R_BEGINNER_IDS);
const perlSet = new Set(PERL_BEGINNER_IDS);
const luaSet = new Set(LUA_BEGINNER_IDS);
const haskellSet = new Set(HASKELL_BEGINNER_IDS);
const elixirSet = new Set(ELIXIR_BEGINNER_IDS);
const clojureSet = new Set(CLOJURE_BEGINNER_IDS);
const cSet = new Set(C_BEGINNER_IDS);
const mysqlSet = new Set(MYSQL_BEGINNER_IDS);
const postgresqlSet = new Set(POSTGRESQL_BEGINNER_IDS);
const mongodbSet = new Set(MONGODB_BEGINNER_IDS);

const BEGINNER_SETS: Record<string, Set<string>> = {
  javascript: jsSet,
  typescript: tsSet,
  python: pySet,
  java: javaSet,
  cpp: cppSet,
  csharp: csharpSet,
  go: goSet,
  ruby: rubySet,
  php: phpSet,
  kotlin: kotlinSet,
  swift: swiftSet,
  dart: dartSet,
  rust: rustSet,
  scala: scalaSet,
  r: rSet,
  perl: perlSet,
  lua: luaSet,
  haskell: haskellSet,
  elixir: elixirSet,
  clojure: clojureSet,
  c: cSet,
  mysql: mysqlSet,
  postgresql: postgresqlSet,
  mongodb: mongodbSet,
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Returns true if the given problem ID is a beginner problem for
 * the specified language.
 */
export function isBeginnerProblem(language: string, problemId: string): boolean {
  return BEGINNER_SETS[language]?.has(problemId) ?? false;
}

/**
 * Returns the Set of beginner problem IDs for a language.
 * Returns an empty set for languages without curated lists.
 */
export function getBeginnerProblemIds(language: string): Set<string> {
  return BEGINNER_SETS[language] ?? new Set();
}

/**
 * Returns the count of beginner problems for a language.
 * If siblingLanguage is provided, includes those as well.
 */
export function getBeginnerProblemCount(language: string, siblingLanguage?: string): number {
  let count = BEGINNER_SETS[language]?.size ?? 0;
  if (siblingLanguage) {
    count += BEGINNER_SETS[siblingLanguage]?.size ?? 0;
  }
  return count;
}

/**
 * Returns true if the language has any beginner problems.
 */
export function hasBeginnerProblems(language: string): boolean {
  return (BEGINNER_SETS[language]?.size ?? 0) > 0;
}
