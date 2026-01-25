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
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

// Language display configuration with colors and names
export const LANGUAGE_CONFIG: Record<
  SupportedLanguage,
  {
    name: string;
    color: string;
    bgColor: string;
    borderColor: string;
    hoverBg: string;
  }
> = {
  javascript: {
    name: 'JavaScript',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    hoverBg: 'hover:bg-yellow-500/20',
  },
  typescript: {
    name: 'TypeScript',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    hoverBg: 'hover:bg-blue-500/20',
  },
  python: {
    name: 'Python',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    hoverBg: 'hover:bg-green-500/20',
  },
  java: {
    name: 'Java',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    hoverBg: 'hover:bg-orange-500/20',
  },
  cpp: {
    name: 'C++',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    hoverBg: 'hover:bg-purple-500/20',
  },
  csharp: {
    name: 'C#',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/30',
    hoverBg: 'hover:bg-violet-500/20',
  },
  go: {
    name: 'Go',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    hoverBg: 'hover:bg-cyan-500/20',
  },
  ruby: {
    name: 'Ruby',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    hoverBg: 'hover:bg-red-500/20',
  },
  c: {
    name: 'C',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/30',
    hoverBg: 'hover:bg-gray-500/20',
  },
  php: {
    name: 'PHP',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    hoverBg: 'hover:bg-indigo-500/20',
  },
  kotlin: {
    name: 'Kotlin',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    hoverBg: 'hover:bg-purple-500/20',
  },
  // New languages
  rust: {
    name: 'Rust',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    hoverBg: 'hover:bg-orange-500/20',
  },
  swift: {
    name: 'Swift',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/30',
    hoverBg: 'hover:bg-orange-400/20',
  },
  scala: {
    name: 'Scala',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    hoverBg: 'hover:bg-red-500/20',
  },
  r: {
    name: 'R',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/30',
    hoverBg: 'hover:bg-blue-400/20',
  },
  perl: {
    name: 'Perl',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-400/10',
    borderColor: 'border-indigo-400/30',
    hoverBg: 'hover:bg-indigo-400/20',
  },
  lua: {
    name: 'Lua',
    color: 'text-blue-600',
    bgColor: 'bg-blue-600/10',
    borderColor: 'border-blue-600/30',
    hoverBg: 'hover:bg-blue-600/20',
  },
  haskell: {
    name: 'Haskell',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    hoverBg: 'hover:bg-purple-500/20',
  },
  elixir: {
    name: 'Elixir',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400/30',
    hoverBg: 'hover:bg-purple-400/20',
  },
  dart: {
    name: 'Dart',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10',
    borderColor: 'border-cyan-400/30',
    hoverBg: 'hover:bg-cyan-400/20',
  },
  clojure: {
    name: 'Clojure',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    hoverBg: 'hover:bg-green-500/20',
  },
};

export function isValidLanguage(language: string): language is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(language as SupportedLanguage);
}
