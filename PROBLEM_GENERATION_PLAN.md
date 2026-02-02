# Problem Generation Plan - 500 Problems Per Language

## Overview
Goal: Add 500 new problems to each of 24 languages (21 programming languages + 3 database languages)

**Total Target: 12,000 new problems**

## Current Status

| Language | Current | Target | Needed |
|----------|---------|--------|--------|
| JavaScript | 826 | 1,326 | 500 |
| TypeScript | 837 | 1,337 | 500 |
| Python | 235 | 735 | 500 |
| Java | 196 | 696 | 500 |
| C++ | 46 | 546 | 500 |
| C# | 147 | 647 | 500 |
| Go | 169 | 669 | 500 |
| Ruby | 136 | 636 | 500 |
| C | 91 | 591 | 500 |
| PHP | 159 | 659 | 500 |
| Kotlin | 170 | 670 | 500 |
| Rust | 113 | 613 | 500 |
| Swift | 50 | 550 | 500 |
| Scala | 50 | 550 | 500 |
| R | 57 | 557 | 500 |
| Perl | 50 | 550 | 500 |
| Lua | 50 | 550 | 500 |
| Haskell | 50 | 550 | 500 |
| Elixir | 84 | 584 | 500 |
| Dart | 91 | 591 | 500 |
| Clojure | 50 | 550 | 500 |
| MySQL | 70 | 570 | 500 |
| PostgreSQL | 114 | 614 | 500 |

## Task Distribution Strategy

### Agent 1: Core Web Languages (1,500 problems)
- JavaScript: 500 problems
- TypeScript: 500 problems  
- Python: 500 problems

### Agent 2: JVM Languages (1,500 problems)
- Java: 500 problems
- Kotlin: 500 problems
- Scala: 500 problems

### Agent 3: Systems Languages (1,500 problems)
- C++: 500 problems
- C: 500 problems
- Rust: 500 problems

### Agent 4: Modern Languages (1,500 problems)
- Go: 500 problems
- Swift: 500 problems
- Dart: 500 problems

### Agent 5: Scripting Languages (1,500 problems)
- Ruby: 500 problems
- PHP: 500 problems
- Perl: 500 problems

### Agent 6: Functional Languages (1,500 problems)
- Haskell: 500 problems
- Elixir: 500 problems
- Clojure: 500 problems
- Lua: 500 problems (functional aspects)

### Agent 7: Data Languages (1,500 problems)
- R: 500 problems
- MySQL: 500 problems
- PostgreSQL: 500 problems

### Agent 8: C# (500 problems)
- C#: 500 problems

## Problem Distribution by Category

For each language, distribute 500 problems across categories:

### JavaScript/TypeScript Categories:
- Array Methods: 80 problems
- String Methods: 60 problems
- Object Methods: 50 problems
- Promises/Async: 50 problems
- DOM Manipulation: 40 problems
- Functional Programming: 40 problems
- Regular Expressions: 30 problems
- Browser APIs: 30 problems
- Events: 30 problems
- Error Handling: 30 problems
- Closures: 20 problems
- Recursion: 20 problems
- Other: 20 problems

### Python Categories:
- List Methods: 100 problems
- String Methods: 80 problems
- Dictionary Methods: 80 problems
- Set Methods: 50 problems
- List Comprehensions: 50 problems
- Built-in Functions: 50 problems
- Generators: 30 problems
- Decorators: 20 problems
- Context Managers: 20 problems
- Other: 20 problems

### Java Categories:
- ArrayList Methods: 100 problems
- Stream API: 100 problems
- String Methods: 80 problems
- Collections Framework: 60 problems
- Optional: 40 problems
- Lambda Expressions: 40 problems
- Method References: 20 problems
- Other: 60 problems

### Other Languages:
- Follow similar distribution patterns based on language-specific features
- Focus on core language constructs, standard library methods, and common patterns

## Problem Structure Template

```typescript
{
  id: '{lang}-{category}-{number}',
  category: 'Category Name',
  difficulty: 'easy' | 'medium' | 'hard',
  title: 'Descriptive Title',
  text: 'Clear problem description',
  setup: 'Initial code/variables',
  setupCode: 'Initial code/variables (same as setup)',
  expected: expectedOutput,
  sample: 'solution code',
  hints: ['hint1', 'hint2'],
  validPatterns: [/pattern1/, /pattern2/],
  tags: ['tag1', 'tag2'],
}
```

## Difficulty Distribution

For each language's 500 problems:
- Easy: 200 problems (40%)
- Medium: 200 problems (40%)
- Hard: 100 problems (20%)

## Quality Guidelines

1. **Uniqueness**: Each problem should be distinct and teach something new
2. **Progressive Difficulty**: Start simple, build complexity
3. **Real-world Relevance**: Problems should reflect actual coding scenarios
4. **Clear Instructions**: Text should be unambiguous
5. **Valid Patterns**: Include regex patterns to prevent hardcoding
6. **Helpful Hints**: Provide guidance without giving away the solution
7. **Proper Categorization**: Place problems in appropriate categories

## Implementation Steps

1. ✅ Create task distribution plan
2. ⏳ Generate problems for Agent 1 languages (JavaScript, TypeScript, Python)
3. ⏳ Generate problems for Agent 2 languages (Java, Kotlin, Scala)
4. ⏳ Generate problems for Agent 3 languages (C++, C, Rust)
5. ⏳ Generate problems for Agent 4 languages (Go, Swift, Dart)
6. ⏳ Generate problems for Agent 5 languages (Ruby, PHP, Perl)
7. ⏳ Generate problems for Agent 6 languages (Haskell, Elixir, Clojure, Lua)
8. ⏳ Generate problems for Agent 7 languages (R, MySQL, PostgreSQL)
9. ⏳ Generate problems for C#
10. ⏳ Update README.md with new statistics
11. ⏳ Verify all problems compile and work correctly

## Notes

- Each agent can work independently on their assigned languages
- Problems should be added to the end of existing problem arrays
- Maintain consistent ID numbering (continue from highest existing ID)
- Test problems to ensure they work with the validation system
- Update problem counts in README after completion
