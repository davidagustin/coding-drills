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

**Coding Drills** transforms syntax learning into an interactive, game-like experience. Practice typing real code, test your knowledge with timed quizzes, and build lasting muscle memory across **9 programming languages**.

---

## Features

### 🎯 Four Learning Modes

| Mode | Description |
|------|-------------|
| **Drill Mode** | Type code solutions to method challenges. Real-time execution for JS/TS with anti-hardcoding validation. |
| **Quiz Mode** | Timed card selection matching inputs to methods. Scoring system with streaks and leaderboards. |
| **Algorithm Exercises** | Master traversal patterns (DFS, BFS), recursion, prime generation, Fibonacci, and iteration control. |
| **Method Reference** | Browse 717+ methods with full documentation, examples, and complexity analysis. |

### 🌍 Nine Languages Supported

<div align="center">

| | | |
|:---:|:---:|:---:|
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white) |
| ![Java](https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white) | ![C++](https://img.shields.io/badge/C++-00599C?style=flat-square&logo=cplusplus&logoColor=white) | ![C#](https://img.shields.io/badge/C%23-239120?style=flat-square&logo=csharp&logoColor=white) |
| ![Go](https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white) | ![Ruby](https://img.shields.io/badge/Ruby-CC342D?style=flat-square&logo=ruby&logoColor=white) | ![C](https://img.shields.io/badge/C-A8B9CC?style=flat-square&logo=c&logoColor=black) |

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

- Track solved problems per language
- View accuracy percentages and streaks
- Export/import progress data
- Cross-tab synchronization via localStorage

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Testing** | Playwright (3,000+ lines of E2E tests) |
| **State** | React Context + localStorage |
| **Code Execution** | Browser-based JS execution, pattern matching for compiled languages |

### Architecture Highlights

- **Server Components** for static generation with `generateStaticParams()`
- **Client Components** for interactive drills with real-time validation
- **Type-safe** throughout with comprehensive TypeScript interfaces
- **Responsive** design from mobile to desktop
- **Dark mode** by default with theme provider

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
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with interactive UI
npm run test:e2e:ui

# Run specific test suites
npm run test:e2e:drill      # Drill mode tests
npm run test:e2e:quiz       # Quiz mode tests
npm run test:e2e:problems   # Individual problem tests
```

---

## Project Structure

```
coding-drills/
├── app/
│   ├── [language]/           # Dynamic routes per language
│   │   ├── drill/            # Drill mode page
│   │   ├── quiz/             # Quiz mode page
│   │   ├── exercises/        # Algorithm exercises
│   │   │   └── [exerciseId]/ # Individual exercise pages
│   │   └── reference/        # Method reference documentation
│   ├── layout.tsx            # Root layout with providers
│   └── page.tsx              # Home page with language grid
├── components/
│   ├── ThemeProvider.tsx     # Dark/light mode context
│   ├── ProgressProvider.tsx  # Progress tracking context
│   ├── ErrorBoundary.tsx     # Error handling
│   └── ...                   # UI components
├── lib/
│   ├── problems/             # 450+ coding problems (9 languages)
│   ├── methods/              # 717 method references (9 languages)
│   ├── exercises/            # Algorithm exercise definitions
│   ├── codeValidator.ts      # Anti-hardcoding validation
│   ├── quizGenerator.ts      # Quiz question generation
│   └── types.ts              # TypeScript interfaces
├── hooks/
│   ├── useDrill.ts           # Drill mode state management
│   ├── useQuiz.ts            # Quiz mode state management
│   └── useProgress.ts        # Progress tracking hook
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
  description: 'Remove duplicate values from an array',
  setup: 'const numbers = [1, 2, 2, 3, 3, 3, 4];',
  solution: '[...new Set(numbers)]',
  expectedOutput: '[1, 2, 3, 4]',
  hints: ['Consider using Set', 'Spread operator can convert Set back to array'],
  tags: ['set', 'spread', 'duplicates'],
  validPatterns: ['new Set', 'Set('],
}
```

3. Run tests: `npm run test:e2e:problems`
4. Submit a PR!

### Development Workflow

```bash
# Create a feature branch
git checkout -b feature/add-rust-support

# Make your changes
# ...

# Run linting
npm run lint

# Run tests
npm run test:e2e

# Commit with conventional commits
git commit -m "feat: add Rust language support with 50 problems"

# Push and create PR
git push origin feature/add-rust-support
```

---

## Roadmap

- [ ] **Monaco Editor** - Syntax highlighting and IntelliSense in drill mode
- [ ] **User Accounts** - Cloud sync for progress across devices
- [ ] **Spaced Repetition** - Smart review scheduling based on performance
- [ ] **Multiplayer Mode** - Race against friends in real-time
- [ ] **More Languages** - Rust, Kotlin, Swift, PHP, Scala
- [ ] **Mobile App** - Native iOS/Android apps
- [ ] **API** - Public API for integration with other learning platforms

---

## Stats

<div align="center">

| Metric | Count |
|--------|-------|
| **Languages** | 9 |
| **Coding Problems** | 450+ |
| **Method References** | 717 |
| **Algorithm Exercises** | 15+ per language |
| **E2E Test Lines** | 3,000+ |
| **Total Lines of Code** | 39,000+ |

</div>

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
