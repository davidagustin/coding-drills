# Problem Generation Task Breakdown

## Overview
Goal: Create 500 additional problems for each of 21 languages (10,500 total problems)

## Current Problem Counts

| Language | Current | Target | Needed |
|----------|---------|--------|--------|
| JavaScript | 826 | 1326 | +500 |
| TypeScript | 837 | 1337 | +500 |
| Python | 235 | 735 | +500 |
| Java | 196 | 696 | +500 |
| C++ | 46 | 546 | +500 |
| C# | 147 | 647 | +500 |
| Go | 169 | 669 | +500 |
| Ruby | 136 | 636 | +500 |
| C | 91 | 591 | +500 |
| PHP | 159 | 659 | +500 |
| Kotlin | 170 | 670 | +500 |
| Rust | 113 | 613 | +500 |
| Swift | 50 | 550 | +500 |
| Scala | 50 | 550 | +500 |
| R | 57 | 557 | +500 |
| Perl | 50 | 550 | +500 |
| Lua | 50 | 550 | +500 |
| Haskell | 50 | 550 | +500 |
| Elixir | 84 | 584 | +500 |
| Dart | 91 | 591 | +500 |
| Clojure | 50 | 550 | +500 |
| MySQL | 70 | 570 | +500 |
| PostgreSQL | 114 | 614 | +500 |

**Total: 10,500 problems to generate**

## Task Distribution (Split Among Agents)

### Agent 1: Core Web Languages (1,500 problems)
- [ ] JavaScript: +500 problems
- [ ] TypeScript: +500 problems  
- [ ] Python: +500 problems

### Agent 2: JVM Languages (1,500 problems)
- [ ] Java: +500 problems
- [ ] Kotlin: +500 problems
- [ ] Scala: +500 problems

### Agent 3: Systems Languages (1,500 problems)
- [ ] C++: +500 problems
- [ ] C: +500 problems
- [ ] Rust: +500 problems

### Agent 4: Microsoft Stack (1,000 problems)
- [ ] C#: +500 problems
- [ ] TypeScript: (if not covered by Agent 1)

### Agent 5: Modern Languages (1,500 problems)
- [ ] Go: +500 problems
- [ ] Swift: +500 problems
- [ ] Dart: +500 problems

### Agent 6: Scripting Languages (1,500 problems)
- [ ] Ruby: +500 problems
- [ ] PHP: +500 problems
- [ ] Perl: +500 problems

### Agent 7: Functional Languages (1,500 problems)
- [ ] Haskell: +500 problems
- [ ] Elixir: +500 problems
- [ ] Clojure: +500 problems

### Agent 8: Specialized Languages (1,000 problems)
- [ ] R: +500 problems
- [ ] Lua: +500 problems

### Agent 9: Database Languages (1,000 problems)
- [ ] MySQL: +500 problems
- [ ] PostgreSQL: +500 problems

## Problem Structure Template

Each problem must follow this structure:

```typescript
{
  id: '{lang}-{category}-{number}',
  category: 'Category Name',
  difficulty: 'easy' | 'medium' | 'hard',
  title: 'Problem Title',
  text: 'Problem description',
  setup: 'Initial code/variables',
  setupCode: 'Initial code/variables (same as setup)',
  expected: expectedOutput,
  sample: 'sample solution code',
  hints?: ['hint1', 'hint2'],
  validPatterns?: [/regex pattern/],
  tags?: ['tag1', 'tag2'],
}
```

## Problem Distribution Guidelines

### Difficulty Distribution (per 500 problems)
- Easy: ~200 problems (40%)
- Medium: ~200 problems (40%)
- Hard: ~100 problems (20%)

### Category Distribution
Problems should be distributed across all language-specific categories. Refer to `lib/languages.ts` for category lists.

### Quality Requirements
1. Each problem must have a clear, unique title
2. Setup code must be valid and executable
3. Expected output must match the problem description
4. Sample solution should demonstrate best practices
5. Hints should guide without giving away the answer
6. Valid patterns (for JS/TS) should prevent hardcoding

## Progress Tracking

Update this file as you complete each language:
- [x] Language name - Date completed
- [ ] Language name - In progress
- [ ] Language name - Not started

## Notes
- Maintain consistency with existing problem style
- Ensure problems cover various use cases
- Include edge cases and real-world scenarios
- Test that setup code runs without errors
- Verify expected outputs are correct
