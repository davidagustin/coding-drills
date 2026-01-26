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

## Overview

**Coding Drills** is a comprehensive, interactive learning platform that transforms programming syntax mastery into an engaging, game-like experience. Built with modern web technologies, it provides hands-on practice across **24 programming languages** through multiple learning modes, real-time code validation, and extensive problem databases.

### The Problem

Learning programming syntax is like learning vocabulary in a new language—you need **repetition** and **active recall**, not passive reading. Most developers:

- Forget method syntax minutes after looking it up
- Rely on autocomplete without understanding what methods do
- Can't write code fluently without constant documentation checks

### The Solution

**Coding Drills** addresses this through interactive, hands-on practice with:
- **Real-time code execution** and validation
- **Anti-hardcoding protection** to ensure genuine learning
- **Multiple learning modes** tailored to different learning styles
- **Comprehensive problem databases** with 3,400+ coding challenges
- **Progress tracking** with detailed analytics

---

## Key Features

### 🎯 Seven Learning Modes

| Mode | Description |
|------|-------------|
| **Drill Mode** | Type code solutions with Monaco Editor (VS Code's editor) featuring syntax highlighting and IntelliSense. Real-time execution for JavaScript/TypeScript with scoring based on speed and streaks. Browse problems and jump to individual practice sessions. |
| **Quiz Mode** | Timed card selection matching inputs to methods. Supports unlimited time option, shows method arguments for context. Scoring system with streaks and leaderboards. |
| **Problems** | LeetCode-style browsable problem list with filtering by category, difficulty, and completion status. Individual problem pages with split-view layout (description + code editor), prev/next navigation, and progress tracking. |
| **AI Mock Interview** | Practice coding interviews with AI-powered feedback. Simulates real interview scenarios with hints and explanations. Quick access from homepage for popular languages. |
| **Algorithm Exercises** | Master traversal patterns (DFS, BFS), recursion, prime generation, Fibonacci, and iteration control. |
| **Method Reference** | Browse 469+ methods with full documentation, examples, and complexity analysis. |
| **Cheatsheets** | Comprehensive language cheatsheets covering syntax, data structures, common patterns, and best practices for all 24 languages. |

### 🌍 Twenty-Four Languages Supported

<div align="center">

| | | | |
|:---:|:---:|:---:|:---:|
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white) | ![Java](https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white) |
| ![C++](https://img.shields.io/badge/C++-00599C?style=flat-square&logo=cplusplus&logoColor=white) | ![C#](https://img.shields.io/badge/C%23-239120?style=flat-square&logo=csharp&logoColor=white) | ![Go](https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white) | ![Ruby](https://img.shields.io/badge/Ruby-CC342D?style=flat-square&logo=ruby&logoColor=white) |
| ![C](https://img.shields.io/badge/C-A8B9CC?style=flat-square&logo=c&logoColor=black) | ![PHP](https://img.shields.io/badge/PHP-777BB4?style=flat-square&logo=php&logoColor=white) | ![Kotlin](https://img.shields.io/badge/Kotlin-7F52FF?style=flat-square&logo=kotlin&logoColor=white) | ![Rust](https://img.shields.io/badge/Rust-000000?style=flat-square&logo=rust&logoColor=white) |
| ![Swift](https://img.shields.io/badge/Swift-FA7343?style=flat-square&logo=swift&logoColor=white) | ![Scala](https://img.shields.io/badge/Scala-DC322F?style=flat-square&logo=scala&logoColor=white) | ![R](https://img.shields.io/badge/R-276DC3?style=flat-square&logo=r&logoColor=white) | ![Perl](https://img.shields.io/badge/Perl-39457E?style=flat-square&logo=perl&logoColor=white) |
| ![Lua](https://img.shields.io/badge/Lua-2C2D72?style=flat-square&logo=lua&logoColor=white) | ![Haskell](https://img.shields.io/badge/Haskell-5D4F85?style=flat-square&logo=haskell&logoColor=white) | ![Elixir](https://img.shields.io/badge/Elixir-4B275F?style=flat-square&logo=elixir&logoColor=white) | ![Dart](https://img.shields.io/badge/Dart-0175C2?style=flat-square&logo=dart&logoColor=white) |
| ![Clojure](https://img.shields.io/badge/Clojure-5881D8?style=flat-square&logo=clojure&logoColor=white) | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white) | ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white) | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) |

</div>

### 🛡️ Anti-Hardcoding Protection

Our validation system ensures you actually **learn** the methods, not just memorize outputs:

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
| **Testing** | Playwright (8,000+ lines of E2E tests) |
| **State Management** | React Context + Zustand + localStorage |
| **Code Execution** | Browser-based JS execution, pattern matching for compiled languages |
| **AI Integration** | OpenAI SDK + Web LLM for offline AI interviews |
| **Build Tool** | Turbopack (Next.js) |
| **Code Quality** | ESLint + Biome + TypeScript strict mode |

### Architecture Highlights

- **Server Components** for static generation with `generateStaticParams()`
- **Client Components** for interactive drills with real-time validation
- **Type-safe** throughout with comprehensive TypeScript interfaces
- **Responsive** design from mobile to desktop
- **Dark mode** by default with theme provider
- **SEO optimized** with sitemap.ts and robots.ts
- **Comprehensive E2E testing** with 100% coverage for database languages

---

## Project Statistics

<div align="center">

| Metric | Count |
|--------|-------|
| **Languages Supported** | 24 |
| **Coding Problems** | 3,417 |
| **Method References** | 469 |
| **Cheatsheets** | 24 |
| **E2E Test Lines** | 8,156 |
| **Total Lines of Code** | 137,554+ |

</div>

### Problem Distribution by Language

| Language | Problems | Language | Problems |
|----------|----------|----------|----------|
| JavaScript | 738 | TypeScript | 679 |
| Python | 235 | Java | 196 |
| Kotlin | 170 | Go | 169 |
| PHP | 155 | C# | 147 |
| Ruby | 136 | MongoDB | 130 |
| Rust | 113 | Dart | 91 |
| C | 90 | Elixir | 84 |
| MySQL | 70 | PostgreSQL | 63 |
| R | 56 | Clojure | 50 |
| Haskell | 50 | Lua | 50 |
| Perl | 50 | Scala | 50 |
| Swift | 50 | C++ | 46 |

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
pnpm test:e2e:problems  # Individual problem tests
```

### Development Commands

```bash
pnpm dev              # Start dev server with Turbopack
pnpm build           # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm lint:biome       # Run Biome linter
pnpm typecheck        # TypeScript type checking
pnpm validate         # Run all validation checks
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
│   │   │   └── [problemId]/ # Individual problem pages
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
│   ├── problems/             # 3,417 coding problems (24 languages)
│   ├── methods/              # 469 method references (10 languages)
│   ├── cheatsheets/          # Comprehensive cheatsheets (24 languages)
│   ├── exercises/            # Algorithm exercise definitions
│   ├── constants/            # Shared constants (difficulty colors, etc.)
│   ├── codeValidator.ts      # Anti-hardcoding validation
│   ├── codeRunner.ts         # Code execution engine
│   ├── quizGenerator.ts      # Quiz question generation
│   └── types.ts              # TypeScript interfaces
├── hooks/
│   ├── useDrill.ts           # Drill mode state management
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

### ✅ Completed Features

- [x] **Monaco Editor** - Syntax highlighting and IntelliSense in drill mode
- [x] **Scoring System** - Points based on speed, difficulty, and streaks
- [x] **JS/TS Toggle** - Practice JavaScript and TypeScript together
- [x] **Data Management** - Clear saved data with selective deletion dialog
- [x] **24 Languages** - Full support for 24 programming languages including databases
- [x] **LeetCode-style Problems** - Browsable problem list with individual problem pages
- [x] **AI Mock Interview** - Practice coding interviews with AI feedback
- [x] **Cheatsheets** - Comprehensive language reference guides
- [x] **Unlimited Quiz Time** - Option for untimed practice
- [x] **SEO Optimization** - Sitemap and robots.txt generation
- [x] **Comprehensive E2E Testing** - 8,000+ lines of test coverage

### 🚀 Planned Features

- [ ] **User Accounts** - Cloud sync for progress across devices
- [ ] **Spaced Repetition** - Smart review scheduling based on performance
- [ ] **Multiplayer Mode** - Race against friends in real-time
- [ ] **Mobile App** - Native iOS/Android apps
- [ ] **API** - Public API for integration with other learning platforms
- [ ] **Problem Database Expansion** - Adding more problems per language

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Inspired by [LeetCode](https://leetcode.com/), [Exercism](https://exercism.org/), and [Typing.io](https://typing.io/)
- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)
- Code editor powered by [Monaco Editor](https://microsoft.github.io/monaco-editor/)

---

<div align="center">

**Built with ❤️ for developers who want to code faster**

[⬆ Back to Top](#coding-drills)

</div>
