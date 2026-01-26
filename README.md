<div align="center">

# Coding Drills

### Master Programming Languages Through Interactive Practice

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-45ba4b?style=for-the-badge&logo=playwright)](https://playwright.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Build muscle memory. Master methods. Become fluent in code.**

[Live Demo](https://coding-drills.vercel.app) · [Report Bug](https://github.com/davidagustin/coding-drills/issues) · [Request Feature](https://github.com/davidagustin/coding-drills/issues)

</div>

---

## The Problem

Learning programming syntax is like learning vocabulary in a new language—you need **repetition** and **active recall**, not passive reading. Most developers:

- Forget method syntax minutes after looking it up
- Rely on autocomplete without understanding what methods do
- Can't write code fluently without constant documentation checks

## The Solution

**Coding Drills** transforms syntax learning into an interactive, game-like experience. Practice typing real code, test your knowledge with timed quizzes, solve LeetCode-style problems, and prepare for interviews across **22 programming languages**.

### 📈 Problem Database Expansion

We're currently expanding our problem database with **500 new problems per language** (11,000+ total). See [PROBLEM_GENERATION_PLAN.md](./PROBLEM_GENERATION_PLAN.md) for the detailed roadmap and progress tracking.

---

## Features

### 🎯 Seven Learning Modes

| Mode | Description |
|------|-------------|
| **Drill Mode** | Type code solutions with Monaco Editor (syntax highlighting, IntelliSense). Real-time execution for JS/TS with scoring based on speed and streaks. Browse problems and jump to individual practice. |
| **Quiz Mode** | Timed card selection matching inputs to methods. Supports unlimited time option, shows method arguments for context. Scoring system with streaks and leaderboards. |
| **Problems** | LeetCode-style browsable problem list with filtering by category, difficulty, and completion status. Individual problem pages with split-view layout (description + code editor), prev/next navigation, and progress tracking. |
| **AI Mock Interview** | Practice coding interviews with AI-powered feedback. Simulates real interview scenarios with hints and explanations. Quick access from homepage for popular languages. |
| **Algorithm Exercises** | Master traversal patterns (DFS, BFS), recursion, prime generation, Fibonacci, and iteration control. |
| **Method Reference** | Browse 469+ methods with full documentation, examples, and complexity analysis. |
| **Problem Database** | 4,000+ coding problems across 22 languages, with 11,000+ more in development. |
| **Cheatsheets** | Comprehensive language cheatsheets covering syntax, data structures, common patterns, and best practices for all 21 languages. |

### 🌍 Twenty-One Languages Supported

<div align="center">

| | | | |
|:---:|:---:|:---:|:---:|
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white) | ![Java](https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white) |
| ![C++](https://img.shields.io/badge/C++-00599C?style=flat-square&logo=cplusplus&logoColor=white) | ![C#](https://img.shields.io/badge/C%23-239120?style=flat-square&logo=csharp&logoColor=white) | ![Go](https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white) | ![Ruby](https://img.shields.io/badge/Ruby-CC342D?style=flat-square&logo=ruby&logoColor=white) |
| ![C](https://img.shields.io/badge/C-A8B9CC?style=flat-square&logo=c&logoColor=black) | ![PHP](https://img.shields.io/badge/PHP-777BB4?style=flat-square&logo=php&logoColor=white) | ![Kotlin](https://img.shields.io/badge/Kotlin-7F52FF?style=flat-square&logo=kotlin&logoColor=white) | ![Rust](https://img.shields.io/badge/Rust-000000?style=flat-square&logo=rust&logoColor=white) |
| ![Swift](https://img.shields.io/badge/Swift-FA7343?style=flat-square&logo=swift&logoColor=white) | ![Scala](https://img.shields.io/badge/Scala-DC322F?style=flat-square&logo=scala&logoColor=white) | ![R](https://img.shields.io/badge/R-276DC3?style=flat-square&logo=r&logoColor=white) | ![Perl](https://img.shields.io/badge/Perl-39457E?style=flat-square&logo=perl&logoColor=white) |
| ![Lua](https://img.shields.io/badge/Lua-2C2D72?style=flat-square&logo=lua&logoColor=white) | ![Haskell](https://img.shields.io/badge/Haskell-5D4F85?style=flat-square&logo=haskell&logoColor=white) | ![Elixir](https://img.shields.io/badge/Elixir-4B275F?style=flat-square&logo=elixir&logoColor=white) | ![Dart](https://img.shields.io/badge/Dart-0175C2?style=flat-square&logo=dart&logoColor=white) |
| ![Clojure](https://img.shields.io/badge/Clojure-5881D8?style=flat-square&logo=clojure&logoColor=white) | | | |

</div>

### 🛡️ Anti-Hardcoding Protection

Our validation system ensures you actually **learn** the methods:

```javascript
// ❌ Rejected - hardcoded answer
"hello world"

// ❌ Rejected - doesn't use the required method
str.toLowerCase()

// ✅ Accepted - uses split() correctly
str.split(" ").join("-")
```

### 📊 Progress Tracking

- Track solved problems per language with localStorage persistence
- View accuracy percentages and streaks
- Filter problems by completion status (Solved/Attempted/New)
- Problem count badges showing progress at a glance
- Cross-tab synchronization

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Code Editor** | Monaco Editor (VS Code's editor) |
| **Testing** | Playwright (7,000+ lines of E2E tests) |
| **State** | React Context + localStorage |
| **Code Execution** | Browser-based JS execution, pattern matching for compiled languages |

### Architecture Highlights

- **Server Components** for static generation with `generateStaticParams()`
- **Client Components** for interactive drills with real-time validation
- **Type-safe** throughout with comprehensive TypeScript interfaces
- **Responsive** design from mobile to desktop
- **Dark mode** by default with theme provider
- **SEO optimized** with sitemap.ts and robots.ts

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/davidagustin/coding-drills.git
cd coding-drills

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000
```

### Running Tests

```bash
# Run all E2E tests
pnpm test:e2e

# Run with interactive UI
pnpm test:e2e:ui

# Run specific test suites
pnpm test:e2e:drill      # Drill mode tests
pnpm test:e2e:quiz       # Quiz mode tests
pnpm test:e2e:problems   # Individual problem tests
```

---

## Project Structure

```
coding-drills/
├── app/
│   ├── [language]/           # Dynamic routes per language
│   │   ├── drill/            # Drill mode - type code solutions
│   │   ├── quiz/             # Quiz mode - timed method matching
│   │   ├── problems/         # LeetCode-style problem browser
│   │   │   └── [problemId]/  # Individual problem pages
│   │   ├── interview/        # AI Mock Interview mode
│   │   ├── exercises/        # Algorithm exercises
│   │   │   └── [exerciseId]/ # Individual exercise pages
│   │   ├── reference/        # Method reference documentation
│   │   └── cheatsheet/       # Language cheatsheets
│   ├── layout.tsx            # Root layout with providers
│   ├── page.tsx              # Home page with language grid
│   ├── sitemap.ts            # SEO sitemap generation
│   └── robots.ts             # SEO robots.txt
├── components/
│   ├── ThemeProvider.tsx     # Dark/light mode context
│   ├── ProgressProvider.tsx  # Progress tracking context
│   ├── ErrorBoundary.tsx     # Error handling
│   └── ...                   # UI components
├── lib/
│   ├── problems/             # 3,500+ coding problems (21 languages)
│   ├── methods/              # 469 method references (10 languages)
│   ├── cheatsheets/          # Comprehensive cheatsheets (21 languages)
│   ├── exercises/            # Algorithm exercise definitions
│   ├── constants/            # Shared constants (difficulty colors, etc.)
│   ├── codeValidator.ts      # Anti-hardcoding validation
│   ├── quizGenerator.ts      # Quiz question generation
│   └── types.ts              # TypeScript interfaces
├── hooks/
│   ├── useDrill.ts           # Drill mode state management
│   ├── useQuiz.ts            # Quiz mode state management
│   ├── useProblemProgress.ts # Problem progress tracking
│   └── useProgress.ts        # General progress tracking hook
├── e2e/
│   ├── problems/             # Per-problem E2E tests
│   ├── drill-mode.spec.ts    # Drill mode tests
│   ├── quiz-mode.spec.ts     # Quiz mode tests
│   └── reference.spec.ts     # Reference page tests
└── playwright.config.ts      # E2E test configuration
```

---

## Contributing

We welcome contributions! This project is perfect for:

- **First-time contributors** - Add problems or method references
- **Frontend developers** - Improve UI/UX or add features
- **Language enthusiasts** - Add problems for your favorite language

### Ways to Contribute

| Contribution Type | Difficulty | Impact |
|-------------------|------------|--------|
| Add coding problems | 🟢 Easy | High |
| Add method documentation | 🟢 Easy | High |
| Add cheatsheet content | 🟢 Easy | High |
| Fix bugs | 🟡 Medium | Medium |
| Add new features | 🟡 Medium | High |
| Improve accessibility | 🟡 Medium | High |
| Add new languages | 🔴 Hard | Very High |

### Adding a New Problem

1. Navigate to `lib/problems/{language}.ts`
2. Add a problem following the `Problem` interface:

```typescript
{
  id: 'js-array-unique',
  title: 'Remove Duplicates',
  category: 'Array Methods',
  difficulty: 'medium',
  text: 'Remove duplicate values from an array',
  setup: 'const numbers = [1, 2, 2, 3, 3, 3, 4];',
  setupCode: 'const numbers = [1, 2, 2, 3, 3, 3, 4];',
  sample: '[...new Set(numbers)]',
  expected: [1, 2, 3, 4],
  hints: ['Consider using Set', 'Spread operator can convert Set back to array'],
  tags: ['set', 'spread', 'duplicates'],
  validPatterns: [/new Set/, /Set\(/],
}
```

3. Run tests: `pnpm test:e2e:problems`
4. Submit a PR!

### Development Workflow

```bash
# Create a feature branch
git checkout -b feature/add-new-problems

# Make your changes
# ...

# Run linting
pnpm lint

# Run tests
pnpm test:e2e

# Commit with conventional commits
git commit -m "feat: add 25 new Python dictionary problems"

# Push and create PR
git push origin feature/add-new-problems
```

---

## Roadmap

- [x] **Monaco Editor** - Syntax highlighting and IntelliSense in drill mode
- [x] **Scoring System** - Points based on speed, difficulty, and streaks
- [x] **JS/TS Toggle** - Practice JavaScript and TypeScript together
- [x] **Data Management** - Clear saved data with selective deletion dialog
- [x] **22 Languages** - JavaScript, TypeScript, Python, Java, C++, C#, Go, Ruby, C, PHP, Kotlin, Rust, Swift, Scala, R, Perl, Lua, Haskell, Elixir, Dart, Clojure, MySQL, PostgreSQL
- [ ] **Problem Database Expansion** - Adding 500 problems per language (11,000+ total) - See Problem Generation Plan below
- [x] **LeetCode-style Problems** - Browsable problem list with individual problem pages
- [x] **AI Mock Interview** - Practice coding interviews with AI feedback
- [x] **Cheatsheets** - Comprehensive language reference guides
- [x] **Unlimited Quiz Time** - Option for untimed practice
- [x] **SEO Optimization** - Sitemap and robots.txt generation
- [ ] **User Accounts** - Cloud sync for progress across devices
- [ ] **Spaced Repetition** - Smart review scheduling based on performance
- [ ] **Multiplayer Mode** - Race against friends in real-time
- [ ] **Mobile App** - Native iOS/Android apps
- [ ] **API** - Public API for integration with other learning platforms

---

## Stats

<div align="center">

| Metric | Count |
|--------|-------|
| **Languages** | 22 |
| **Coding Problems** | 4,000+ (11,000+ in expansion) |
| **Method References** | 469 |
| **Cheatsheets** | 22 |
| **Algorithm Exercises** | 15+ per language |
| **E2E Test Lines** | 7,000+ |
| **Total Lines of Code** | 126,000+ |

</div>

### Problem Distribution by Language

| Language | Problems | Language | Problems |
|----------|----------|----------|----------|
| JavaScript | 922 | TypeScript | 678 |
| Python | 235 | Java | 196 |
| Kotlin | 170 | Go | 169 |
| PHP | 155 | C# | 147 |
| Ruby | 136 | Rust | 113 |
| Dart | 91 | C | 90 |
| Elixir | 84 | R | 56 |
| Clojure | 50 | Haskell | 50 |
| Lua | 50 | Perl | 50 |
| Scala | 50 | Swift | 50 |
| C++ | 46 | | |

---

## Problem Generation Plan

### Overview
Goal: Add 500 new problems to each of the 22 supported languages, bringing the total to 11,000+ new problems.

### Current Problem Counts & Targets
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

### Agent Task Distribution

**Agent 1: JavaScript (500 problems)**
- Focus: Array Methods, String Methods, Object Methods, Async Patterns, Promises
- Difficulty: 40% easy, 40% medium, 20% hard

**Agent 2: TypeScript (500 problems)**
- Focus: Type system, Generics, Interfaces, Type Guards, Utility Types
- Difficulty: 30% easy, 45% medium, 25% hard

**Agent 3: Python (500 problems)**
- Focus: List comprehensions, Dictionary operations, Set methods, Generators, Decorators
- Difficulty: 35% easy, 40% medium, 25% hard

**Agent 4: Java & C++ (500 problems each)**
- Java: Collections, Streams, Lambda expressions, Optional, Concurrency
- C++: STL containers, Algorithms, Smart pointers, Templates, RAII
- Difficulty: 30% easy, 40% medium, 30% hard

**Agent 5: C# & Ruby (500 problems each)**
- C#: LINQ, Async/Await, Collections, Delegates, Extension methods
- Ruby: Enumerable methods, Blocks/Procs, Metaprogramming, String manipulation
- Difficulty: 35% easy, 40% medium, 25% hard

**Agent 6: Go, C, PHP (500 problems each)**
- Go: Slices, Maps, Goroutines, Channels, Interfaces, Error handling
- C: Pointers, Memory management, Arrays, Strings, Structs
- PHP: Array functions, String functions, OOP, Traits, Namespaces
- Difficulty: 40% easy, 35% medium, 25% hard

**Agent 7: Kotlin & Rust (500 problems each)**
- Kotlin: Collections, Extension functions, Coroutines, Null safety, Data classes
- Rust: Ownership, Borrowing, Slices, Enums, Pattern matching, Error handling
- Difficulty: 30% easy, 40% medium, 30% hard

**Agent 8: Swift, Scala, R (500 problems each)**
- Swift: Collections, Optionals, Closures, Protocols, Generics
- Scala: Collections, Pattern matching, Case classes, Higher-order functions
- R: Vector operations, Data frames, Statistical functions, Apply family
- Difficulty: 35% easy, 40% medium, 25% hard

**Agent 9: Perl, Lua, Haskell (500 problems each)**
- Perl: Regular expressions, String manipulation, Hash operations, File I/O
- Lua: Tables, String operations, Coroutines, Metatables
- Haskell: List operations, Higher-order functions, Monads, Pattern matching
- Difficulty: 30% easy, 40% medium, 30% hard

**Agent 10: Elixir, Dart, Clojure (500 problems each)**
- Elixir: Enum, Pipe operator, Pattern matching, Processes, GenServer
- Dart: Lists, Maps, Futures, Streams, Extension methods
- Clojure: Collections, Sequences, Higher-order functions, Macros
- Difficulty: 35% easy, 40% medium, 25% hard

**Agent 11: MySQL & PostgreSQL (500 problems each)**
- MySQL: JOINs, Subqueries, Window functions, JSON operations, Stored procedures
- PostgreSQL: JSONB, Arrays, CTEs, Window functions, Full-text search, Advanced aggregations
- Difficulty: 30% easy, 40% medium, 30% hard

### Problem Structure Template

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

### Quality Guidelines

1. **Uniqueness**: Each problem should be unique and not duplicate existing ones
2. **Progressive Difficulty**: Start with basics, progress to advanced concepts
3. **Real-world Relevance**: Problems should reflect real-world usage patterns
4. **Clear Instructions**: Text should be unambiguous
5. **Valid Solutions**: Sample solutions must be correct and testable
6. **Pattern Matching**: Include validPatterns for validation when possible
7. **Category Balance**: Distribute problems across all relevant categories

### Progress Tracking

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

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Inspired by [LeetCode](https://leetcode.com/), [Exercism](https://exercism.org/), and [Typing.io](https://typing.io/)
- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)

---

<div align="center">

**Built with ❤️ for developers who want to code faster**

[⬆ Back to Top](#coding-drills)

</div>
