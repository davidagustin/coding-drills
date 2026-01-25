'use client';

type Language =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'java'
  | 'go'
  | 'rust'
  | 'ruby'
  | 'php'
  | 'swift'
  | 'kotlin'
  | 'csharp'
  | 'cpp'
  | 'c'
  | 'scala'
  | 'haskell'
  | 'elixir'
  | 'clojure'
  | 'sql'
  | 'html'
  | 'css';

type Size = 'sm' | 'md' | 'lg' | 'xl';

interface LanguageIconProps {
  language: Language | string;
  size?: Size;
  showLabel?: boolean;
}

const languageConfig: Record<string, { emoji: string; label: string; color: string }> = {
  javascript: { emoji: 'JS', label: 'JavaScript', color: 'bg-yellow-400 text-black' },
  typescript: { emoji: 'TS', label: 'TypeScript', color: 'bg-blue-600 text-white' },
  python: { emoji: 'Py', label: 'Python', color: 'bg-blue-500 text-yellow-400' },
  java: { emoji: 'Ja', label: 'Java', color: 'bg-red-600 text-white' },
  go: { emoji: 'Go', label: 'Go', color: 'bg-cyan-500 text-white' },
  rust: { emoji: 'Rs', label: 'Rust', color: 'bg-orange-700 text-white' },
  ruby: { emoji: 'Rb', label: 'Ruby', color: 'bg-red-500 text-white' },
  php: { emoji: 'Php', label: 'PHP', color: 'bg-indigo-500 text-white' },
  swift: { emoji: 'Sw', label: 'Swift', color: 'bg-orange-500 text-white' },
  kotlin: { emoji: 'Kt', label: 'Kotlin', color: 'bg-purple-600 text-white' },
  csharp: { emoji: 'C#', label: 'C#', color: 'bg-purple-700 text-white' },
  cpp: { emoji: 'C++', label: 'C++', color: 'bg-blue-700 text-white' },
  c: { emoji: 'C', label: 'C', color: 'bg-gray-600 text-white' },
  scala: { emoji: 'Sc', label: 'Scala', color: 'bg-red-700 text-white' },
  haskell: { emoji: 'Hs', label: 'Haskell', color: 'bg-purple-800 text-white' },
  elixir: { emoji: 'Ex', label: 'Elixir', color: 'bg-purple-500 text-white' },
  clojure: { emoji: 'Clj', label: 'Clojure', color: 'bg-green-600 text-white' },
  sql: { emoji: 'SQL', label: 'SQL', color: 'bg-blue-800 text-white' },
  html: { emoji: 'HTML', label: 'HTML', color: 'bg-orange-600 text-white' },
  css: { emoji: 'CSS', label: 'CSS', color: 'bg-blue-500 text-white' },
};

const sizeConfig: Record<Size, { container: string; text: string; labelText: string }> = {
  sm: { container: 'w-6 h-6', text: 'text-[8px]', labelText: 'text-xs' },
  md: { container: 'w-8 h-8', text: 'text-[10px]', labelText: 'text-sm' },
  lg: { container: 'w-10 h-10', text: 'text-xs', labelText: 'text-base' },
  xl: { container: 'w-14 h-14', text: 'text-sm', labelText: 'text-lg' },
};

export function LanguageIcon({ language, size = 'md', showLabel = false }: LanguageIconProps) {
  const normalizedLang = language.toLowerCase();
  const config = languageConfig[normalizedLang] || {
    emoji: language.slice(0, 2).toUpperCase(),
    label: language,
    color: 'bg-gray-500 text-white',
  };
  const sizes = sizeConfig[size];

  return (
    <div className="inline-flex items-center gap-2">
      {/* Icon container */}
      <div
        className={`
          ${sizes.container} ${config.color}
          rounded-lg flex items-center justify-center
          font-bold ${sizes.text}
          shadow-sm
          transition-transform duration-200 hover:scale-110
        `}
        title={config.label}
        role="img"
        aria-label={`${config.label} programming language`}
      >
        {config.emoji}
      </div>

      {/* Optional label */}
      {showLabel && (
        <span className={`font-medium text-gray-700 dark:text-gray-300 ${sizes.labelText}`}>
          {config.label}
        </span>
      )}
    </div>
  );
}

// Export a grid of language icons for selection
export function LanguageIconGrid({
  languages,
  selected,
  onSelect,
  size = 'md',
}: {
  languages: (Language | string)[];
  selected?: Language | string;
  onSelect?: (language: Language | string) => void;
  size?: Size;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {languages.map((lang) => {
        const isSelected = selected === lang;
        return (
          <button
            key={lang}
            onClick={() => onSelect?.(lang)}
            className={`
              p-1 rounded-lg transition-all duration-200
              ${
                isSelected
                  ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900'
                  : 'hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600'
              }
            `}
            aria-pressed={isSelected}
          >
            <LanguageIcon language={lang} size={size} />
          </button>
        );
      })}
    </div>
  );
}

export default LanguageIcon;
