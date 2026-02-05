<div align="center">

<br />

# Coding Drills

### Build muscle memory. Master methods. Become fluent in code.

<br />

[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![License](https://img.shields.io/badge/MIT-green?style=for-the-badge&label=License)](LICENSE)

<br />

An interactive learning platform for mastering programming languages through hands-on practice.
**Thousands of problems** across **25 languages** and **4 frontend frameworks**, with real-time code execution, algorithm visualizations, AI mock interviews, regex training, frontend framework drills, and an algorithm pattern quiz.

<br />

[**Live Demo**](https://coding-drills.vercel.app) &nbsp;&middot;&nbsp; [Report Bug](https://github.com/davidagustin/coding-drills/issues) &nbsp;&middot;&nbsp; [Request Feature](https://github.com/davidagustin/coding-drills/issues)

<br />

</div>

---

## Overview

**Coding Drills** turns programming practice into an engaging, game-like experience. Learning syntax and patterns requires **repetition** and **active recall** — not passive reading. This platform provides the reps.

- **Drill** — Type solutions in a full Monaco Editor with real-time execution (JS/TS) or pattern validation.
- **Quiz** — Timed multiple-choice: methods, time/space complexity, and **algorithm pattern recognition** (170 LeetCode-style problems).
- **Study** — Self-paced flashcard review for focused recall. Flip through questions, reveal answers, and rate your confidence (Missed / Shaky / Knew It). Preview all Q&A before starting. Persistent progress via localStorage.
- **Method / Query Training** — Browse and solve problems by language; database languages use query training.
- **Building Blocks** — Structured algorithm exercises (traversal, recursion, DP, data structures) across **9 languages** (JavaScript, TypeScript, Python, Java, C++, C#, Go, Ruby, C) with **Learn** and **Practice** modes and **interactive visualizations**.
- **AI Exercise Tutor** — In-browser AI (WebLLM) for explanations, hints, and visualization walkthroughs; no API keys, privacy-first.
- **AI Mock Interview** — Algorithm and system design practice with an AI interviewer (offline WebLLM or cloud).
- **Regex Trainer** — Regex challenges with live matching and test validation.
- **Reference & Cheatsheets** — Method docs and language cheatsheets for quick lookup.
- **Frontend Drills** — Framework-specific practice for React, Angular, Vue, and Native JavaScript. **460 training problems** (each with a real-world context example), **448 quiz questions**, **616+ UI patterns** (each with starter code and behavioral tests), drill mode, and cheatsheets with interactive code examples.

---

## Learning Modes

### Drill Mode

Type code in a Monaco Editor (VS Code's engine) with syntax highlighting and IntelliSense. Real-time execution for JavaScript/TypeScript; pattern matching for other languages. Scoring uses speed, difficulty, and streaks.

**Filters:**
- **Beginner Mode** — Focus on fundamentals: loops, conditionals, and basic data structures. ~270 curated problems across all 24 languages.
- **Interview Recommended** — Curated problems commonly tested in technical interviews (JavaScript/TypeScript only).

### Quiz Mode

- **Methods** — Match inputs/outputs to the correct method (by language).
- **Time / Space Complexity** — Identify Big O from code snippets.
- **Pattern Quiz** — Recognize algorithm patterns (e.g. Two Pointers, Sliding Window, DP) from problem descriptions. 170 problems; timed; accessible from the home page or via `/[language]/quiz?type=pattern-recognition` → auto-redirects to the [Algorithm Pattern Quiz](app/[language]/pattern-quiz) with your settings.

### Method Training / Query Training

Browse coding challenges by language. Filter by category, difficulty, completion, and beginner/interview focus. Each problem has a dedicated page (description + code editor), prev/next navigation, and progress. Programming languages use "Method Training"; PostgreSQL, MySQL, and MongoDB use "Query Training".

### Building Blocks

Structured algorithm exercises across 9 languages: traversal (DFS, BFS), recursion, sorting, searching, DP, data structures, memoization, and combinatorics. 35 exercises per language (Java, C++, C#, Go, Ruby, C) plus larger sets for JavaScript, TypeScript, and Python. Each has:

- **Learn** — Explanations, steps, and an AI tutor.
- **Practice** — Code editor and test validation.
- **Interactive visualizations** — Animated, step-through algorithm execution (play/pause, step, speed, reset).

### AI Exercise Tutor

Runs in the browser via WebLLM (Llama-3.1-8B-Instruct, WebGPU). No API keys; model runs locally. Can explain concepts, walk through solution code, and narrate visualizations step by step. ~3 GB download on first use, then cached.

### AI Mock Interview

- **72 algorithm problems** and **28 system design questions**.
- **Solve mode** — AI presents a problem and guides you like a technical interview.
- **Guided breakdown** — Structured framework for tackling algorithm and system design problems.

Supports offline (WebLLM) and cloud (OpenAI) inference.

### Study Mode

Self-paced flashcard experience — no timers, no scoring, just focused recall. Available for both language routes (`/{language}/study`) and frontend routes (`/frontend-drills/{framework}/study`).

- **Setup** — Choose sources (methods, time/space complexity, patterns, frontend knowledge), filter by category and difficulty, set deck size, shuffle or sequential order, and optionally prioritize weak cards.
- **Preview Table** — Full-page Q&A browser with search, filter, and sort. Answers are hidden by default with a toggle to reveal them, so you can quiz yourself while browsing.
- **Studying** — Flip through cards: read the prompt (method name and description hidden), reveal the answer, then self-rate as **Missed**, **Shaky**, or **Knew It**. Keyboard shortcuts: `Space`/`Enter` to reveal, `1`/`2`/`3` to rate, `←` for previous card, `Esc` to exit.
- **Summary** — Session stats (cards reviewed, recall rate, time) with a breakdown chart and a "Review These Again" list of weak cards (answers hidden by default with a toggle).
- **Persistence** — Ratings and session history are stored in localStorage (`coding-drills-flashcards`). Weak cards surface first in future sessions when "Focus on cards I'm still learning" is enabled.

### Algorithm Pattern Quiz

Standalone pattern-recognition quiz: read LeetCode-style problem descriptions and choose the correct algorithm pattern. Configurable difficulty, category, number of questions, and time per question. **170 problems**. Accessible from the home page or from Quiz Mode (Pattern Quiz) with config passed via URL so the quiz starts immediately.

### Regex Trainer

Regex problems by category (character classes, quantifiers, anchors, groups, lookaround, etc.). Live pattern matching, test validation, and explanations. Accessible from the home page.

### Reference

Method reference with documentation, examples, and complexity notes for all 21 programming languages.

### Cheatsheet

Language cheatsheets: syntax, data structures, common patterns, and best practices (25 languages).

### Frontend Drills

Framework-specific training for **React**, **Angular**, **Vue**, and **Native JavaScript**. A persistent navigation bar (breadcrumbs + mode tabs) appears on all framework pages for easy switching between modes. Each framework offers four modes:

- **Training** — 460 framework-specific problems, each with hints, a real-world context example, and **auto-generated starter code** (function signatures and hint comments are scaffolded from the sample solution so users start with structure instead of a blank editor). All problem descriptions have been audited to accurately describe what the user should do, and the validator always wraps return expressions in parentheses to handle object literals safely.
- **Drill Mode** — Write code solutions to framework-specific challenges in a Monaco Editor.
- **Quiz Mode** — Multiple-choice questions testing framework concepts and API knowledge.
- **Study Mode** — Self-paced flashcard review for framework knowledge and algorithm patterns with confidence-based self-rating and persistent progress.
- **UI Patterns** — Catalog of 616+ UI patterns (forms, navigation, interactive elements, data display, advanced features, reusable components) with descriptions, difficulty ratings, key concepts, starter code, and behavioral test suites. Each pattern detail page features:
  - **Building Blocks** — Numbered concept checklist at the top showing what to master.
  - **Tabbed Code Editor** — HTML and CSS tabs (read-only reference) plus an editable JS tab with scaffolded starter code (full UI structure with correct class names and empty function stubs — users only implement business logic).
  - **Your Preview** — Live iframe that re-executes your code as you type, using the pattern's HTML/CSS.
  - **Live Demo** — Reference implementation running in a sandboxed iframe.
  - **AI Tutor** — In-browser AI for guidance, hints, and code review.
  - **Reset Button** — One-click reset to regenerate the starter skeleton.
  - All 616 patterns across 4 frameworks have interactive `demoCode` (HTML + CSS + JS) for Live Demo and scaffolded starter code auto-generated from reference implementations.
- **Cheatsheet** — Comprehensive quick-reference with 6 sections: Overview, Core Concepts, Key APIs, Common Patterns, Code Examples (interactive Monaco editors), and Ecosystem & Tools. Two-column layout with scroll spy, collapsible sections, SVG section icons, and material-inspired visual polish.

---

## Interactive Visualizations

Hundreds of algorithm exercises include step-through visualizations: play/pause, step forward/back, speed, reset. Categories include tree traversal, two pointers, sliding window, binary search, DP, data structures (stack, queue, heap, trie, LRU cache), sorting, graph algorithms, and backtracking. Implementations use a shared animation hook and control components; each viz is lazy-loaded to keep the bundle small.

---

## Languages

| | | | |
|:---:|:---:|:---:|:---:|
| JavaScript | TypeScript | Python | Java |
| C++ | C# | Go | Ruby |
| C | PHP | Kotlin | Rust |
| Swift | Scala | R | Perl |
| Lua | Haskell | Elixir | Dart |
| Clojure | PostgreSQL | MySQL | MongoDB |
| Redis | | | |

25 languages total. Database languages (PostgreSQL, MySQL, MongoDB, Redis) have Query Training and no method-based Quiz/Reference.

---

## Tech Stack

| Category | Technology |
|:---------|:-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 (strict) |
| **UI** | React 19 |
| **Styling** | Tailwind CSS 4 |
| **Editor** | Monaco Editor |
| **Animation** | Motion (Framer Motion) |
| **Testing** | Playwright (E2E), Vitest (unit) |
| **State** | React state, Zustand, localStorage |
| **Execution** | In-browser JS/TS; pattern matching for other languages |
| **AI** | WebLLM (offline), OpenAI SDK (cloud) |
| **Build** | Turbopack (dev) |
| **Lint / Format** | ESLint, Biome |
| **Validation** | Zod, React Hook Form |

- **App Router** — `generateStaticParams()` for static generation; client components for interactive drills.
- **Dynamic imports** for visualizations and heavy UI to keep initial bundle small.
- **Type-safe** — TypeScript across the codebase.
- **Responsive** — Fully mobile-optimized (375px+) to desktop; adaptive grids, touch-friendly targets (44px min), responsive typography, and compact spacing on small screens; dark default.
- **SEO** — `sitemap.ts`, `robots.ts`.

---

## Quick Start

```bash
git clone https://github.com/davidagustin/coding-drills.git
cd coding-drills
pnpm install
pnpm dev
# Open http://localhost:3000
```

### Commands

```bash
# Development
pnpm dev              # Dev server (Turbopack)
pnpm build            # Production build
pnpm start            # Production server

# Code quality
pnpm lint             # ESLint
pnpm lint:biome       # Biome
pnpm typecheck        # TypeScript
pnpm format           # Format with Biome
pnpm validate         # typecheck + lint:biome + lint

# Testing
pnpm test             # Unit (Vitest) — 13,995 tests
pnpm test:coverage    # Unit with coverage report
pnpm test:e2e        # E2E (Playwright)
pnpm test:e2e:ui     # Playwright UI
npx vitest run lib/__tests__/frontend-drills-validation.test.ts  # Validate all 460 frontend drill samples

# UI Pattern Starters
npx tsx scripts/generate-starters.ts  # Regenerate all 616 scaffolded starters from reference demoCode

# Visualizations (agent tooling)
pnpm viz:list         # List progress
pnpm viz:next [id]    # Next tasks
pnpm viz:generate <id> # Generate viz boilerplate
pnpm viz:status      # Status
```

---

## Project Structure

```
coding-drills/
├── app/
│   ├── [language]/           # Per-language routes
│   │   ├── drill/            # Drill mode
│   │   ├── quiz/             # Quiz (methods, complexity, pattern → redirects to pattern-quiz)
│   │   ├── pattern-quiz/     # Algorithm pattern recognition quiz
│   │   ├── problems/         # Method/query training browser
│   │   │   └── [problemId]/
│   │   ├── exercises/        # Building blocks
│   │   │   └── [exerciseId]/
│   │   ├── interview/         # AI mock interview (per-language entry)
│   │   ├── reference/        # Method reference
│   │   └── cheatsheet/       # Language cheatsheet
│   ├── interview/            # Standalone interview landing
│   ├── frontend-drills/        # Frontend framework drills
│   │   └── [framework]/        # Per-framework routes (react, angular, vue, native-js)
│   │       ├── layout.tsx       # Shared nav bar (breadcrumbs + mode tabs)
│   │       ├── drill/          # Drill mode
│   │       ├── quiz/           # Quiz mode
│   │       ├── ui-patterns/    # UI patterns catalog
│   │       └── cheatsheet/     # Interactive cheatsheet (SVG icons, material polish)
│   ├── regex/                # Regex trainer
│   ├── links/                # Other projects
│   ├── api/transpile/        # TypeScript transpilation API
│   ├── layout.tsx, page.tsx, sitemap.ts, robots.ts
├── components/
│   ├── visualizations/       # Algorithm viz components + registry
│   ├── PatternRecognitionGuide.tsx
│   ├── CodeEditor.tsx, GlobalNavbar.tsx, etc.
├── lib/
│   ├── problems/             # Problems by language
│   ├── algorithmPatterns.ts # 170 pattern-quiz problems
│   ├── complexityProblems.ts # Time/space complexity quiz
│   ├── exercises/            # Building block exercises
│   ├── interview/             # Algorithm + system design problems, prompts
│   ├── methods/              # Method reference data
│   ├── cheatsheets/          # Cheatsheet data
│   ├── frontend-drills/        # Frontend framework data (4 frameworks)
│   │   ├── cheatsheet/         # Cheatsheet data (react, angular, vue, native-js)
│   │   ├── ui-patterns/        # 616+ UI patterns with starters + behavioral tests
│   │   ├── problems/           # 460 training problems across frameworks
│   │   └── quiz/               # 448 quiz questions across frameworks
│   ├── regexTrainer/         # Regex problems and matcher
│   ├── quizGenerator.ts      # Quiz generation
│   ├── codeRunner.ts, codeValidator.ts
│   └── webllm.ts             # WebLLM integration
├── hooks/                    # useDrill, useQuiz, useTimer, etc.
├── e2e/                      # Playwright specs
└── playwright.config.ts
```

---

## Code Runner & Validation

The code runner (`lib/codeRunner.ts`) and validator (`lib/codeValidator.ts`) execute user-submitted JavaScript in a sandboxed `new Function()` environment. The validator supports both single-expression answers (e.g. `arr.map(x => x * 2)`) and multi-statement code (e.g. `const result = arr.filter(...); result`), automatically detecting statements and capturing the return value. TypeScript type annotations are stripped before execution without corrupting object literals or arrow function bodies.

All 460 frontend drill sample solutions are validated via `lib/__tests__/frontend-drills-validation.test.ts` (runs as part of the Vitest suite) to ensure they produce the expected output when pasted as-is.

## Anti-Hardcoding Validation

Solutions must use the intended method or pattern, not hardcoded answers. Problems define `validPatterns` (regex) and expected output; the validator checks both.

---

## Contributing

Contributions are welcome. See existing problem and visualization patterns in `lib/problems/`, `lib/algorithmPatterns.ts`, and `components/visualizations/`. For new problems, follow the `Problem` interface and add `validPatterns` and expected output. For new visualizations, use the viz scripts and the shared animation/control components.

### Adding a New Language

When adding a new programming or database language, update **all** the following locations. Missing any will cause bugs (wrong language displayed, missing from dropdowns, broken modes).

#### Checklist: All Languages

| # | File | What to Update |
|---|------|----------------|
| 1 | `lib/types.ts` | Add to `LanguageId` union type |
| 2 | `app/[language]/config.ts` | Add to `SUPPORTED_LANGUAGES` array |
| 3 | `app/[language]/config.ts` | Add entry to `LANGUAGE_CONFIG` object (name, colors, docsUrl, version) |
| 4 | `app/[language]/config.ts` | If database language: add to `isDatabaseLanguage()` function |
| 5 | `app/[language]/drill/page.tsx` | Add to local `SUPPORTED_LANGUAGES` array (~line 292) |
| 6 | `app/[language]/drill/page.tsx` | Add to `problemLoaders` object (~line 126) |
| 7 | `lib/problems/{language}.ts` | Create problems file with `{language}Problems` export |
| 8 | `lib/problems/index.ts` | Import and export the new problems array |
| 9 | `lib/cheatsheets/{language}.ts` | Create cheatsheet file with `{language}Cheatsheet` export |
| 10 | `lib/cheatsheets/index.ts` | Import and add to `cheatsheetsByLanguage` map |
| 11 | `lib/methods/{language}.ts` | Create methods file (programming languages only) |
| 12 | `lib/methods/index.ts` | Import and export (programming languages only) |

#### Checklist: Database Languages Only

Database languages (PostgreSQL, MySQL, MongoDB, Redis) have additional requirements:

| # | File | What to Update |
|---|------|----------------|
| 13 | `app/[language]/LanguageSwitcher.tsx` | Add to `DATABASE_LANGUAGES` array (~line 33) |
| 14 | `lib/codeValidator.ts` | Add to local `isDatabaseLanguage` check (~line 494) |
| 15 | `e2e/problems/all-problems-validation.spec.ts` | Add to `DATABASE_LANGUAGES` array and `EXPECTED_DATABASE_COUNTS` |
| 16 | `lib/__tests__/config.test.ts` | Add test case for `isDatabaseLanguage('{language}')` |

#### Verification

After adding a new language, run these checks:

```bash
pnpm typecheck                    # No TypeScript errors
pnpm test lib/__tests__/config    # Config tests pass
pnpm build                        # Build succeeds
```

Then manually verify:
- Language appears in the language switcher dropdown
- `/{language}` homepage shows correct name and colors
- `/{language}/drill` loads the correct problems (not JavaScript)
- `/{language}/cheatsheet` displays content
- For database languages: navbar shows only Drill, Quiz, Study, Problems, Regex, Cheatsheet (no Building Blocks, Reference, or Interview)

#### Why So Many Files?

The codebase has some duplicated language lists for historical and performance reasons (lazy loading, bundle splitting). The central config (`app/[language]/config.ts`) is the source of truth, but some files have local copies for code-splitting or test isolation. A future refactor could consolidate these, but for now, follow the checklist above.

---

## License

MIT — see [LICENSE](LICENSE).

---

## Acknowledgments

Inspired by [LeetCode](https://leetcode.com/), [Exercism](https://exercism.org/), and [Typing.io](https://typing.io/). Built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Monaco Editor](https://microsoft.github.io/monaco-editor/), and [Motion](https://motion.dev/).

<div align="center">

**Built for developers who want to code faster**

[Back to top](#coding-drills)

</div>
