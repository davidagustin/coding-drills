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
};

export function isValidLanguage(language: string): language is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(language as SupportedLanguage);
}
