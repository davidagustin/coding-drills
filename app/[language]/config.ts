// Supported languages configuration - shared between client and server components

export const SUPPORTED_LANGUAGES = [
  'javascript',
  'typescript',
  'python',
  'java',
  'cpp',
  'csharp',
  'go',
  'ruby',
  'c',
  'php',
  'kotlin',
  // New languages
  'rust',
  'swift',
  'scala',
  'r',
  'perl',
  'lua',
  'haskell',
  'elixir',
  'dart',
  'clojure',
  // Database languages
  'postgresql',
  'mysql',
  'mongodb',
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

// Language display configuration with colors, versions, and documentation links
export const LANGUAGE_CONFIG: Record<
  SupportedLanguage,
  {
    name: string;
    color: string;
    bgColor: string;
    borderColor: string;
    hoverBg: string;
    version: string;
    docsUrl: string;
  }
> = {
  javascript: {
    name: 'JavaScript',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    hoverBg: 'hover:bg-yellow-500/20',
    version: 'ES2024',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  typescript: {
    name: 'TypeScript',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    hoverBg: 'hover:bg-blue-500/20',
    version: '5.x',
    docsUrl: 'https://www.typescriptlang.org/docs/',
  },
  python: {
    name: 'Python',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    hoverBg: 'hover:bg-green-500/20',
    version: '3.12',
    docsUrl: 'https://docs.python.org/3/',
  },
  java: {
    name: 'Java',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    hoverBg: 'hover:bg-orange-500/20',
    version: '21 LTS',
    docsUrl: 'https://docs.oracle.com/en/java/',
  },
  cpp: {
    name: 'C++',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    hoverBg: 'hover:bg-purple-500/20',
    version: 'C++23',
    docsUrl: 'https://en.cppreference.com/w/',
  },
  csharp: {
    name: 'C#',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/30',
    hoverBg: 'hover:bg-violet-500/20',
    version: '12.0',
    docsUrl: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
  },
  go: {
    name: 'Go',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    hoverBg: 'hover:bg-cyan-500/20',
    version: '1.22',
    docsUrl: 'https://go.dev/doc/',
  },
  ruby: {
    name: 'Ruby',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    hoverBg: 'hover:bg-red-500/20',
    version: '3.3',
    docsUrl: 'https://ruby-doc.org/',
  },
  c: {
    name: 'C',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/30',
    hoverBg: 'hover:bg-gray-500/20',
    version: 'C23',
    docsUrl: 'https://en.cppreference.com/w/c',
  },
  php: {
    name: 'PHP',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    hoverBg: 'hover:bg-indigo-500/20',
    version: '8.3',
    docsUrl: 'https://www.php.net/docs.php',
  },
  kotlin: {
    name: 'Kotlin',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    hoverBg: 'hover:bg-purple-500/20',
    version: '2.0',
    docsUrl: 'https://kotlinlang.org/docs/home.html',
  },
  // New languages
  rust: {
    name: 'Rust',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    hoverBg: 'hover:bg-orange-500/20',
    version: '1.77',
    docsUrl: 'https://doc.rust-lang.org/book/',
  },
  swift: {
    name: 'Swift',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/30',
    hoverBg: 'hover:bg-orange-400/20',
    version: '5.10',
    docsUrl: 'https://swift.org/documentation/',
  },
  scala: {
    name: 'Scala',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    hoverBg: 'hover:bg-red-500/20',
    version: '3.4',
    docsUrl: 'https://docs.scala-lang.org/',
  },
  r: {
    name: 'R',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/30',
    hoverBg: 'hover:bg-blue-400/20',
    version: '4.4',
    docsUrl: 'https://www.r-project.org/other-docs.html',
  },
  perl: {
    name: 'Perl',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-400/10',
    borderColor: 'border-indigo-400/30',
    hoverBg: 'hover:bg-indigo-400/20',
    version: '5.38',
    docsUrl: 'https://perldoc.perl.org/',
  },
  lua: {
    name: 'Lua',
    color: 'text-blue-600',
    bgColor: 'bg-blue-600/10',
    borderColor: 'border-blue-600/30',
    hoverBg: 'hover:bg-blue-600/20',
    version: '5.4',
    docsUrl: 'https://www.lua.org/docs.html',
  },
  haskell: {
    name: 'Haskell',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    hoverBg: 'hover:bg-purple-500/20',
    version: 'GHC 9.8',
    docsUrl: 'https://www.haskell.org/documentation/',
  },
  elixir: {
    name: 'Elixir',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400/30',
    hoverBg: 'hover:bg-purple-400/20',
    version: '1.16',
    docsUrl: 'https://elixir-lang.org/docs.html',
  },
  dart: {
    name: 'Dart',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10',
    borderColor: 'border-cyan-400/30',
    hoverBg: 'hover:bg-cyan-400/20',
    version: '3.3',
    docsUrl: 'https://dart.dev/guides',
  },
  clojure: {
    name: 'Clojure',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    hoverBg: 'hover:bg-green-500/20',
    version: '1.11',
    docsUrl: 'https://clojure.org/reference/documentation',
  },
  // Database languages
  postgresql: {
    name: 'PostgreSQL',
    color: 'text-sky-500',
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-500/30',
    hoverBg: 'hover:bg-sky-500/20',
    version: '16',
    docsUrl: 'https://www.postgresql.org/docs/',
  },
  mysql: {
    name: 'MySQL',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/30',
    hoverBg: 'hover:bg-orange-400/20',
    version: '8.3',
    docsUrl: 'https://dev.mysql.com/doc/',
  },
  mongodb: {
    name: 'MongoDB',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    hoverBg: 'hover:bg-green-500/20',
    version: '7.0',
    docsUrl: 'https://www.mongodb.com/docs/',
  },
};

export function isValidLanguage(language: string): language is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(language as SupportedLanguage);
}

const DATABASE_LANGUAGES: ReadonlySet<string> = new Set(['postgresql', 'mysql', 'mongodb']);

export function isDatabaseLanguage(language: string): boolean {
  return DATABASE_LANGUAGES.has(language);
}

/** Returns "Query Training" for database languages, "Method Training" for programming languages. */
export function getTrainingLabel(language: string): string {
  return DATABASE_LANGUAGES.has(language) ? 'Query Training' : 'Method Training';
}

/** Returns a description appropriate for the language type. */
export function getTrainingDescription(language: string): string {
  return DATABASE_LANGUAGES.has(language)
    ? 'Train your ability to write queries, use operators, and master database patterns. Build muscle memory for common operations.'
    : 'Train your ability to use methods, transform data, and write clean solutions. Build muscle memory for common patterns.';
}
