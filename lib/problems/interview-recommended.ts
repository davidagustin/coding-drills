/**
 * Curated list of interview-recommended problems.
 *
 * These are the problems most likely to appear in technical interviews
 * or that test concepts interviewers frequently assess. The selection
 * prioritizes core language fluency, common algorithmic patterns, and
 * topics that distinguish strong candidates.
 *
 * Organized by language so the drill / problems pages can look up
 * membership in O(1) via a Set.
 */

// ---------------------------------------------------------------------------
// JavaScript – interview essentials (130 problems)
// ---------------------------------------------------------------------------

const JS_INTERVIEW_IDS: string[] = [
  // -- Array Methods (25 problems - core interview staple) --
  'js-filter-001',
  'js-filter-002',
  'js-filter-003',
  'js-filter-004',
  'js-filter-005',
  'js-map-001',
  'js-map-002',
  'js-map-003',
  'js-map-004',
  'js-map-005',
  'js-reduce-001',
  'js-reduce-002',
  'js-reduce-003',
  'js-reduce-004',
  'js-reduce-005',
  'js-find-001',
  'js-find-002',
  'js-findIndex-001',
  'js-some-001',
  'js-some-002',
  'js-every-001',
  'js-every-002',
  'js-sort-001',
  'js-sort-002',
  'js-sort-003',
  'js-sort-004',
  'js-slice-001',
  'js-slice-002',
  'js-slice-003',
  'js-includes-001',
  'js-indexOf-001',
  'js-concat-001',
  'js-join-001',
  'js-reverse-001',
  'js-flat-001',
  'js-flat-002',
  'js-flatMap-001',
  'js-chain-001',
  'js-chain-002',
  'js-chain-003',
  'js-advanced-001',
  'js-advanced-002',
  'js-advanced-003',
  'js-advanced-005',
  'js-advanced-006',

  // -- Advanced Array Manipulation (10 problems) --
  'js-arr-adv-001',
  'js-arr-adv-002',
  'js-arr-adv-003',
  'js-arr-adv-004',
  'js-arr-adv-005',
  'js-arr-adv-006',
  'js-arr-adv-009',
  'js-arr-adv-010',
  'js-arr-adv-013',
  'js-arr-adv-015',

  // -- String Methods (6 problems) --
  'js-string-001',
  'js-string-002',
  'js-string-003',
  'js-string-004',
  'js-string-005',
  'js-string-006',

  // -- String Manipulation (10 problems) --
  'js-str-001',
  'js-str-002',
  'js-str-003',
  'js-str-004',
  'js-str-005',
  'js-str-006',
  'js-str-009',
  'js-str-013',
  'js-str-017',
  'js-str-021',

  // -- String Parsing (8 problems) --
  'js-regex-017',
  'js-regex-021',
  'js-regex-025',
  'js-regex-032',
  'js-regex-036',
  'js-regex-043',
  'js-regex-047',
  'js-regex-052',

  // -- Object Methods (10 problems) --
  'js-object-001',
  'js-object-002',
  'js-object-003',
  'js-object-004',
  'js-object-005',
  'js-object-006',
  'js-advanced-004',
  'js-math-001',
  'js-math-002',
  'js-math-003',

  // -- Object Manipulation (10 problems) --
  'js-obj-001',
  'js-obj-002',
  'js-obj-003',
  'js-obj-004',
  'js-obj-005',
  'js-obj-006',
  'js-obj-009',
  'js-obj-013',
  'js-obj-017',
  'js-obj-021',

  // -- Map and Set (10 problems) --
  'js-map-set-001',
  'js-map-set-002',
  'js-map-set-003',
  'js-map-set-005',
  'js-map-set-006',
  'js-map-set-009',
  'js-map-set-013',
  'js-map-set-017',
  'js-map-set-021',
  'js-map-set-025',

  // -- Set Methods (3 problems) --
  'js-set-001',
  'js-set-002',
  'js-set-003',

  // -- Closures (6 problems - critical interview topic) --
  'js-functional-008',
  'js-functional-021',
  'js-functional-028',
  'js-functional-052',
  'js-functional-083',
  'js-functional-097',

  // -- Higher-Order Functions (12 problems) --
  'js-functional-003',
  'js-functional-004',
  'js-functional-005',
  'js-functional-011',
  'js-functional-012',
  'js-functional-016',
  'js-functional-022',
  'js-functional-023',
  'js-functional-030',
  'js-functional-041',
  'js-functional-045',
  'js-functional-055',

  // -- Functional Programming (10 problems) --
  'js-functional-001',
  'js-functional-002',
  'js-functional-006',
  'js-functional-007',
  'js-functional-009',
  'js-functional-010',
  'js-functional-013',
  'js-functional-015',
  'js-functional-019',
  'js-functional-024',

  // -- Recursion (9 problems - classic interview topic) --
  'js-functional-036',
  'js-functional-037',
  'js-functional-038',
  'js-functional-061',
  'js-functional-062',
  'js-functional-070',
  'js-functional-071',
  'js-functional-080',
  'js-functional-106',

  // -- Promises (15 problems - core async interview topic) --
  'js-async-001',
  'js-async-002',
  'js-async-004',
  'js-async-005',
  'js-async-007',
  'js-async-008',
  'js-async-011',
  'js-async-012',
  'js-async-014',
  'js-async-017',
  'js-async-021',
  'js-async-024',
  'js-async-026',
  'js-async-030',
  'js-async-034',

  // -- Async Patterns (10 problems) --
  'js-async-003',
  'js-async-006',
  'js-async-010',
  'js-async-013',
  'js-async-020',
  'js-async-029',
  'js-async-033',
  'js-async-039',
  'js-async-046',
  'js-async-053',

  // -- Event Loop (8 problems - critical JS interview topic) --
  'js-async-028',
  'js-async-038',
  'js-async-045',
  'js-async-052',
  'js-async-059',
  'js-async-064',
  'js-async-069',
  'js-async-074',

  // -- Error Handling (10 problems) --
  'js-error-001',
  'js-error-002',
  'js-error-003',
  'js-error-006',
  'js-error-008',
  'js-error-036',
  'js-error-037',
  'js-error-040',
  'js-error-043',
  'js-error-046',

  // -- Control Flow (8 problems) --
  'js-error-004',
  'js-error-005',
  'js-error-007',
  'js-error-009',
  'js-error-011',
  'js-error-013',
  'js-error-039',
  'js-error-042',

  // -- Exceptions (4 problems) --
  'js-error-026',
  'js-error-027',
  'js-error-028',
  'js-error-029',

  // -- Regular Expressions (8 problems) --
  'js-regex-001',
  'js-regex-002',
  'js-regex-003',
  'js-regex-005',
  'js-regex-009',
  'js-regex-013',
  'js-regex-026',
  'js-regex-030',
];

// ---------------------------------------------------------------------------
// TypeScript – interview essentials (145 problems)
// ---------------------------------------------------------------------------

const TS_INTERVIEW_IDS: string[] = [
  // -- Generics (15 problems - core TS interview topic) --
  'ts-generic-001',
  'ts-generic-002',
  'ts-generic-003',
  'ts-generic-004',
  'ts-generic-005',
  'ts-generic-006',
  'ts-generic-007',
  'ts-generic-008',
  'ts-generic-009',
  'ts-generic-010',
  'ts-generic-021',
  'ts-generic-024',
  'ts-generic-028',
  'ts-generic-032',
  'ts-generic-036',

  // -- Generic Constraints (10 problems) --
  'ts-generic-011',
  'ts-generic-012',
  'ts-generic-013',
  'ts-generic-014',
  'ts-generic-015',
  'ts-generic-016',
  'ts-generic-017',
  'ts-generic-018',
  'ts-generic-019',
  'ts-generic-020',

  // -- Generic Inference (8 problems) --
  'ts-generic-037',
  'ts-generic-038',
  'ts-generic-039',
  'ts-generic-040',
  'ts-generic-041',
  'ts-generic-042',
  'ts-generic-043',
  'ts-generic-051',

  // -- Generic Methods (5 problems) --
  'ts-generic-array-method',
  'ts-generic-map-entries',
  'ts-generic-tuple-swap',
  'ts-generic-filter-type',
  'ts-generic-default-param',

  // -- Generic Patterns (3 problems) --
  'ts-generic-identity',
  'ts-generic-array-first',
  'ts-generic-keyof-constraint',

  // -- Type Guards (17 problems - critical interview topic) --
  'ts-typeof-guard-string',
  'ts-typeof-guard-function',
  'ts-instanceof-guard-date',
  'ts-instanceof-guard-array',
  'ts-in-guard-property',
  'ts-custom-type-guard',
  'ts-type-guard-assertion',
  'ts-guard-770',
  'ts-guard-771',
  'ts-guard-772',
  'ts-guard-773',
  'ts-guard-774',
  'ts-guard-775',
  'ts-guard-776',
  'ts-guard-777',
  'ts-guard-778',
  'ts-guard-779',

  // -- Utility Types (25 problems) --
  'ts-partial-update',
  'ts-pick-subset',
  'ts-omit-exclude-props',
  'ts-record-create-map',
  'ts-required-make-mandatory',
  'ts-readonly-immutable',
  'ts-extract-union-member',
  'ts-exclude-union-member',
  'ts-nonnullable-type',
  'ts-utility-returntype',
  'ts-utility-parameters',
  'ts-utility-awaited',
  'ts-utility-record-enum',
  'ts-utility-omit-multiple',
  'ts-utility-001',
  'ts-utility-005',
  'ts-utility-010',
  'ts-utility-015',
  'ts-utility-020',
  'ts-utility-025',
  'ts-utility-030',
  'ts-utility-035',
  'ts-utility-040',
  'ts-util-790',
  'ts-util-793',

  // -- Discriminated Unions (13 problems - important pattern) --
  'ts-type-discriminated-shape',
  'ts-type-discriminated-fetch',
  'ts-type-discriminated-exhaustive',
  'ts-discrim-760',
  'ts-discrim-761',
  'ts-discrim-762',
  'ts-discrim-763',
  'ts-discrim-764',
  'ts-discrim-765',
  'ts-discrim-766',
  'ts-discrim-767',
  'ts-discrim-768',
  'ts-discrim-769',

  // -- Conditional Types (10 problems) --
  'ts-conditional-basic',
  'ts-conditional-infer',
  'ts-conditional-exclude-null',
  'ts-conditional-function-return',
  'ts-conditional-distributive',
  'ts-cond-730',
  'ts-cond-732',
  'ts-cond-734',
  'ts-cond-736',
  'ts-cond-738',

  // -- Mapped Types (15 problems) --
  'ts-keyof-basic',
  'ts-mapped-readonly',
  'ts-mapped-optional',
  'ts-mapped-value-transform',
  'ts-keyof-index-access',
  'ts-mapped-720',
  'ts-mapped-721',
  'ts-mapped-722',
  'ts-mapped-723',
  'ts-mapped-724',
  'ts-mapped-725',
  'ts-mapped-726',
  'ts-mapped-727',
  'ts-mapped-728',
  'ts-mapped-729',

  // -- Type Assertions (5 problems) --
  'ts-as-assertion',
  'ts-satisfies-operator',
  'ts-const-assertion',
  'ts-type-assertion-unknown',
  'ts-type-guard-vs-assertion',

  // -- Type Narrowing (3 problems) --
  'ts-type-narrowing-null-check',
  'ts-type-narrowing-truthiness',
  'ts-type-narrowing-equality',

  // -- Branded Types (6 problems) --
  'ts-type-branded-id',
  'ts-type-branded-positive',
  'ts-type-branded-json-string',
  'ts-branded-780',
  'ts-branded-782',
  'ts-branded-784',

  // -- Infer Keyword (7 problems) --
  'ts-type-infer-constructor-params',
  'ts-type-infer-instance-type',
  'ts-type-infer-this-param',
  'ts-infer-740',
  'ts-infer-742',
  'ts-infer-744',
  'ts-infer-746',

  // -- Recursive Types (6 problems) --
  'ts-type-recursive-deep-partial',
  'ts-type-recursive-path',
  'ts-type-recursive-linked-list',
  'ts-recursive-750',
  'ts-recursive-752',
  'ts-recursive-754',

  // -- Template Literal Types (6 problems) --
  'ts-type-template-event-handler',
  'ts-type-template-css-property',
  'ts-type-template-route-params',
  'ts-type-template-getter-setter',
  'ts-type-template-kebab-case',
  'ts-template-710',

  // -- Function Types (12 problems) --
  'ts-func-001',
  'ts-func-002',
  'ts-func-003',
  'ts-func-004',
  'ts-func-005',
  'ts-func-010',
  'ts-func-015',
  'ts-func-020',
  'ts-func-025',
  'ts-func-030',
  'ts-func-035',
  'ts-func-040',

  // -- Overloads (6 problems) --
  'ts-func-037',
  'ts-func-038',
  'ts-func-039',
  'ts-func-040',
  'ts-func-046',
  'ts-func-051',

  // -- Classes (8 problems) --
  'ts-class-001',
  'ts-class-002',
  'ts-class-003',
  'ts-class-004',
  'ts-class-005',
  'ts-class-010',
  'ts-class-015',
  'ts-class-020',

  // -- OOP Patterns (8 problems) --
  'ts-class-029',
  'ts-class-035',
  'ts-class-040',
  'ts-class-045',
  'ts-class-050',
  'ts-class-055',
  'ts-class-060',
  'ts-class-065',

  // -- Type-Safe Array Methods (12 problems) --
  'ts-filter-type-guard-nullish',
  'ts-filter-type-guard-numbers',
  'ts-filter-type-guard-objects',
  'ts-filter-discriminated-union',
  'ts-map-type-inference-basic',
  'ts-map-object-transformation',
  'ts-map-with-index',
  'ts-reduce-sum',
  'ts-reduce-to-object',
  'ts-reduce-group-by',
  'ts-find-with-predicate',
  'ts-find-with-assertion',

  // -- Object Operations (5 problems) --
  'ts-object-keys-assertion',
  'ts-object-entries-typed',
  'ts-object-values',
  'ts-object-fromentries',
  'ts-object-assign-typed',

  // -- Typed Array Operations (10 problems) --
  'ts-arr-generic-map',
  'ts-arr-generic-filter',
  'ts-arr-generic-reduce-accumulator',
  'ts-arr-generic-find-or-default',
  'ts-arr-readonly-basic',
  'ts-arr-readonly-methods',
  'ts-arr-tuple-basic',
  'ts-arr-tuple-rest',
  'ts-arr-narrow-nonempty',
  'ts-arr-reduce-to-map',

  // -- Readonly Patterns (2 problems) --
  'ts-type-readonly-mapped',
  'ts-type-deep-readonly',

  // -- Advanced Generics (15 problems) --
  'ts-generics-001',
  'ts-generics-005',
  'ts-generics-010',
  'ts-generics-015',
  'ts-generics-020',
  'ts-generics-025',
  'ts-generics-030',
  'ts-generics-035',
  'ts-generics-040',
  'ts-generics-045',
  'ts-generics-050',
  'ts-adv-gen-700',
  'ts-adv-gen-702',
  'ts-adv-gen-704',
  'ts-adv-gen-706',
];

// ---------------------------------------------------------------------------
// Lookup Sets – O(1) membership checks
// ---------------------------------------------------------------------------

const jsSet = new Set(JS_INTERVIEW_IDS);
const tsSet = new Set(TS_INTERVIEW_IDS);

const INTERVIEW_SETS: Record<string, Set<string>> = {
  javascript: jsSet,
  typescript: tsSet,
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Returns true if the given problem ID is interview-recommended for
 * the specified language.
 */
export function isInterviewRecommended(language: string, problemId: string): boolean {
  return INTERVIEW_SETS[language]?.has(problemId) ?? false;
}

/**
 * Returns the Set of interview-recommended IDs for a language.
 * Returns an empty set for languages without curated lists.
 */
export function getInterviewRecommendedIds(language: string): Set<string> {
  return INTERVIEW_SETS[language] ?? new Set();
}

/**
 * Returns the count of interview-recommended problems for a language.
 * If siblingLanguage is provided, includes those as well.
 */
export function getInterviewRecommendedCount(language: string, siblingLanguage?: string): number {
  let count = INTERVIEW_SETS[language]?.size ?? 0;
  if (siblingLanguage) {
    count += INTERVIEW_SETS[siblingLanguage]?.size ?? 0;
  }
  return count;
}

/**
 * Returns true if the language has any interview-recommended problems.
 */
export function hasInterviewRecommended(language: string): boolean {
  return (INTERVIEW_SETS[language]?.size ?? 0) > 0;
}
