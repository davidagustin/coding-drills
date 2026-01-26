# Problem Generation Plan - 500 Problems Per Language

## Overview
Goal: Add 500 new problems to each of the 22 supported languages, bringing the total to 11,000+ new problems.

## Current Problem Counts
- JavaScript: 826 → 1,326 (need 500)
- TypeScript: 837 → 1,337 (need 500)
- Python: 235 → 735 (need 500)
- Java: 196 → 696 (need 500)
- C++: 46 → 546 (need 500)
- C#: 147 → 647 (need 500)
- Ruby: 136 → 636 (need 500)
- Go: 169 → 669 (need 500)
- C: 91 → 591 (need 500)
- PHP: 159 → 659 (need 500)
- Kotlin: 170 → 670 (need 500)
- Rust: 113 → 613 (need 500)
- Swift: 50 → 550 (need 500)
- Scala: 50 → 550 (need 500)
- R: 57 → 557 (need 500)
- Perl: 50 → 550 (need 500)
- Lua: 50 → 550 (need 500)
- Haskell: 50 → 550 (need 500)
- Elixir: 84 → 584 (need 500)
- Dart: 91 → 591 (need 500)
- Clojure: 50 → 550 (need 500)
- MySQL: 70 → 570 (need 500)
- PostgreSQL: 114 → 614 (need 500)

**Total: 11,000 new problems needed**

## Agent Task Distribution

### Agent 1: JavaScript (500 problems)
- Focus: Array Methods, String Methods, Object Methods, Async Patterns, Promises
- Categories: Expand existing categories with more variations
- Difficulty distribution: 40% easy, 40% medium, 20% hard

### Agent 2: TypeScript (500 problems)
- Focus: Type system, Generics, Interfaces, Type Guards, Utility Types
- Categories: Type-specific problems, advanced patterns
- Difficulty distribution: 30% easy, 45% medium, 25% hard

### Agent 3: Python (500 problems)
- Focus: List comprehensions, Dictionary operations, Set methods, Generators, Decorators
- Categories: Pythonic patterns, built-in functions
- Difficulty distribution: 35% easy, 40% medium, 25% hard

### Agent 4: Java & C++ (500 problems each)
- Java: Collections, Streams, Lambda expressions, Optional, Concurrency
- C++: STL containers, Algorithms, Smart pointers, Templates, RAII
- Difficulty distribution: 30% easy, 40% medium, 30% hard

### Agent 5: C# & Ruby (500 problems each)
- C#: LINQ, Async/Await, Collections, Delegates, Extension methods
- Ruby: Enumerable methods, Blocks/Procs, Metaprogramming, String manipulation
- Difficulty distribution: 35% easy, 40% medium, 25% hard

### Agent 6: Go, C, PHP (500 problems each)
- Go: Slices, Maps, Goroutines, Channels, Interfaces, Error handling
- C: Pointers, Memory management, Arrays, Strings, Structs
- PHP: Array functions, String functions, OOP, Traits, Namespaces
- Difficulty distribution: 40% easy, 35% medium, 25% hard

### Agent 7: Kotlin & Rust (500 problems each)
- Kotlin: Collections, Extension functions, Coroutines, Null safety, Data classes
- Rust: Ownership, Borrowing, Slices, Enums, Pattern matching, Error handling
- Difficulty distribution: 30% easy, 40% medium, 30% hard

### Agent 8: Swift, Scala, R (500 problems each)
- Swift: Collections, Optionals, Closures, Protocols, Generics
- Scala: Collections, Pattern matching, Case classes, Higher-order functions
- R: Vector operations, Data frames, Statistical functions, Apply family
- Difficulty distribution: 35% easy, 40% medium, 25% hard

### Agent 9: Perl, Lua, Haskell (500 problems each)
- Perl: Regular expressions, String manipulation, Hash operations, File I/O
- Lua: Tables, String operations, Coroutines, Metatables
- Haskell: List operations, Higher-order functions, Monads, Pattern matching
- Difficulty distribution: 30% easy, 40% medium, 30% hard

### Agent 10: Elixir, Dart, Clojure (500 problems each)
- Elixir: Enum, Pipe operator, Pattern matching, Processes, GenServer
- Dart: Lists, Maps, Futures, Streams, Extension methods
- Clojure: Collections, Sequences, Higher-order functions, Macros
- Difficulty distribution: 35% easy, 40% medium, 25% hard

### Agent 11: MySQL & PostgreSQL (500 problems each)
- MySQL: JOINs, Subqueries, Window functions, JSON operations, Stored procedures
- PostgreSQL: JSONB, Arrays, CTEs, Window functions, Full-text search, Advanced aggregations
- Difficulty distribution: 30% easy, 40% medium, 30% hard

## Problem Structure Template

Each problem must follow this structure:

```typescript
{
  id: 'lang-category-###', // e.g., 'js-array-501'
  category: 'Category Name',
  difficulty: 'easy' | 'medium' | 'hard',
  title: 'Clear, descriptive title',
  text: 'Problem description explaining what to do',
  setup: 'Context description',
  setupCode: 'Code that sets up the problem context',
  expected: <expected_output>, // Can be any type
  sample: 'Sample solution code',
  hints?: ['Hint 1', 'Hint 2'],
  validPatterns?: [/regex pattern 1/, /regex pattern 2/],
  tags?: ['tag1', 'tag2', 'tag3'],
}
```

## Quality Guidelines

1. **Uniqueness**: Each problem should be unique and not duplicate existing ones
2. **Progressive Difficulty**: Start with basics, progress to advanced concepts
3. **Real-world Relevance**: Problems should reflect real-world usage patterns
4. **Clear Instructions**: Text should be unambiguous
5. **Valid Solutions**: Sample solutions must be correct and testable
6. **Pattern Matching**: Include validPatterns for validation when possible
7. **Category Balance**: Distribute problems across all relevant categories

## Implementation Steps

1. ✅ Create task breakdown (this document)
2. ⏳ Generate problems for each language following the distribution
3. ⏳ Add problems to respective language files
4. ⏳ Update README.md with new statistics
5. ⏳ Test problem validation
6. ⏳ Commit and push changes

## Progress Tracking

- [ ] Agent 1: JavaScript (0/500)
- [ ] Agent 2: TypeScript (0/500)
- [ ] Agent 3: Python (0/500)
- [ ] Agent 4: Java (0/500)
- [ ] Agent 4: C++ (0/500)
- [ ] Agent 5: C# (0/500)
- [ ] Agent 5: Ruby (0/500)
- [ ] Agent 6: Go (0/500)
- [ ] Agent 6: C (0/500)
- [ ] Agent 6: PHP (0/500)
- [ ] Agent 7: Kotlin (0/500)
- [ ] Agent 7: Rust (0/500)
- [ ] Agent 8: Swift (0/500)
- [ ] Agent 8: Scala (0/500)
- [ ] Agent 8: R (0/500)
- [ ] Agent 9: Perl (0/500)
- [ ] Agent 9: Lua (0/500)
- [ ] Agent 9: Haskell (0/500)
- [ ] Agent 10: Elixir (0/500)
- [ ] Agent 10: Dart (0/500)
- [ ] Agent 10: Clojure (0/500)
- [ ] Agent 11: MySQL (0/500)
- [ ] Agent 11: PostgreSQL (0/500)

## Notes

- Problems should increment IDs sequentially from existing problems
- Maintain consistency with existing problem style
- Ensure all problems are syntactically correct for their language
- Test sample solutions before committing
