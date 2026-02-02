import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LanguageGrid } from '../components/LanguageGrid';

const meta = {
  title: 'Layout/LanguageGrid',
  component: LanguageGrid,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0f' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LanguageGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

// Realistic language data from the codebase
const allLanguages = [
  {
    name: 'JavaScript',
    subtitle: '+ TypeScript in Drill Mode',
    slug: 'javascript',
    icon: 'JS',
    bgGradient: 'from-yellow-500/20 to-yellow-600/10',
    borderColor: 'border-yellow-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]',
    iconBg: 'bg-yellow-500',
    iconText: 'text-black font-bold',
  },
  {
    name: 'TypeScript',
    subtitle: '+ JavaScript in Drill Mode',
    slug: 'typescript',
    icon: 'TS',
    bgGradient: 'from-blue-500/20 to-blue-600/10',
    borderColor: 'border-blue-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]',
    iconBg: 'bg-blue-600',
    iconText: 'text-white font-bold',
  },
  {
    name: 'Python',
    slug: 'python',
    icon: 'Py',
    bgGradient: 'from-blue-500/20 via-yellow-500/10 to-blue-600/10',
    borderColor: 'border-blue-400/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]',
    iconBg: 'bg-gradient-to-br from-blue-500 to-yellow-400',
    iconText: 'text-white font-bold',
  },
  {
    name: 'Java',
    slug: 'java',
    icon: 'Ja',
    bgGradient: 'from-red-500/20 to-orange-500/10',
    borderColor: 'border-red-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]',
    iconBg: 'bg-gradient-to-br from-red-500 to-orange-500',
    iconText: 'text-white font-bold',
  },
  {
    name: 'C++',
    slug: 'cpp',
    icon: '</>',
    bgGradient: 'from-blue-600/20 to-blue-700/10',
    borderColor: 'border-blue-600/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]',
    iconBg: 'bg-blue-700',
    iconText: 'text-white font-mono text-sm',
  },
  {
    name: 'C#',
    slug: 'csharp',
    icon: '#',
    bgGradient: 'from-purple-500/20 to-purple-600/10',
    borderColor: 'border-purple-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]',
    iconBg: 'bg-purple-600',
    iconText: 'text-white font-bold text-2xl',
  },
  {
    name: 'Go',
    slug: 'go',
    icon: 'Go',
    bgGradient: 'from-cyan-500/20 to-cyan-600/10',
    borderColor: 'border-cyan-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]',
    iconBg: 'bg-cyan-500',
    iconText: 'text-white font-bold',
  },
  {
    name: 'Ruby',
    slug: 'ruby',
    icon: 'Rb',
    bgGradient: 'from-red-600/20 to-red-700/10',
    borderColor: 'border-red-600/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]',
    iconBg: 'bg-red-600',
    iconText: 'text-white font-bold',
  },
  {
    name: 'Rust',
    slug: 'rust',
    icon: 'Rs',
    bgGradient: 'from-orange-600/20 to-red-700/10',
    borderColor: 'border-orange-600/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(234,88,12,0.4)]',
    iconBg: 'bg-gradient-to-br from-orange-600 to-red-700',
    iconText: 'text-white font-bold',
  },
  {
    name: 'Swift',
    slug: 'swift',
    icon: 'Sw',
    bgGradient: 'from-orange-500/20 to-red-500/10',
    borderColor: 'border-orange-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]',
    iconBg: 'bg-gradient-to-br from-orange-500 to-red-500',
    iconText: 'text-white font-bold',
  },
  {
    name: 'Kotlin',
    slug: 'kotlin',
    icon: 'K',
    bgGradient: 'from-violet-500/20 to-orange-500/10',
    borderColor: 'border-violet-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]',
    iconBg: 'bg-gradient-to-br from-violet-500 to-orange-400',
    iconText: 'text-white font-bold',
  },
  {
    name: 'PHP',
    slug: 'php',
    icon: 'PHP',
    bgGradient: 'from-indigo-500/20 to-indigo-600/10',
    borderColor: 'border-indigo-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]',
    iconBg: 'bg-indigo-600',
    iconText: 'text-white font-bold text-sm',
  },
];

const problemCounts: Record<string, number> = {
  javascript: 245,
  typescript: 198,
  python: 312,
  java: 276,
  cpp: 187,
  csharp: 143,
  go: 112,
  ruby: 95,
  rust: 78,
  swift: 64,
  kotlin: 89,
  php: 102,
};

// Default: all languages, no problem counts
export const Default: Story = {
  args: {
    languages: allLanguages,
  },
};

// All languages with problem counts shown
export const WithProblemCounts: Story = {
  args: {
    languages: allLanguages,
    problemCounts,
  },
};

// Only a few languages - small grid
export const FewLanguages: Story = {
  args: {
    languages: allLanguages.slice(0, 3),
    problemCounts: {
      javascript: 245,
      typescript: 198,
      python: 312,
    },
  },
};

// Many languages - full grid
export const ManyLanguages: Story = {
  args: {
    languages: allLanguages,
    problemCounts,
  },
};

// Languages with very high problem counts
export const WithHighCounts: Story = {
  args: {
    languages: allLanguages.slice(0, 6),
    problemCounts: {
      javascript: 1247,
      typescript: 983,
      python: 2150,
      java: 1876,
      cpp: 1534,
      csharp: 892,
    },
  },
};

// Single language card
export const SingleLanguage: Story = {
  args: {
    languages: [allLanguages[0]],
    problemCounts: {
      javascript: 245,
    },
  },
};

// Languages without subtitles
export const WithoutSubtitles: Story = {
  args: {
    languages: allLanguages.slice(2, 8),
    problemCounts: {
      python: 312,
      java: 276,
      cpp: 187,
      csharp: 143,
      go: 112,
      ruby: 95,
    },
  },
};

// Two languages side by side
export const TwoLanguages: Story = {
  args: {
    languages: allLanguages.slice(0, 2),
    problemCounts: {
      javascript: 245,
      typescript: 198,
    },
  },
};
