import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LanguageIcon, LanguageIconGrid } from '../components/LanguageIcon';

const meta = {
  title: 'Components/LanguageIcon',
  component: LanguageIcon,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0f' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LanguageIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const JavaScript: Story = {
  args: {
    language: 'javascript',
    size: 'md',
    showLabel: false,
  },
};

export const TypeScript: Story = {
  args: {
    language: 'typescript',
    size: 'md',
    showLabel: false,
  },
};

export const Python: Story = {
  args: {
    language: 'python',
    size: 'md',
    showLabel: false,
  },
};

export const Java: Story = {
  args: {
    language: 'java',
    size: 'md',
    showLabel: false,
  },
};

export const Rust: Story = {
  args: {
    language: 'rust',
    size: 'md',
    showLabel: false,
  },
};

export const Go: Story = {
  args: {
    language: 'go',
    size: 'md',
    showLabel: false,
  },
};

// With label
export const WithLabel: Story = {
  args: {
    language: 'javascript',
    size: 'md',
    showLabel: true,
  },
};

// Size variants
export const SmallSize: Story = {
  args: {
    language: 'python',
    size: 'sm',
    showLabel: false,
  },
};

export const LargeSize: Story = {
  args: {
    language: 'python',
    size: 'lg',
    showLabel: false,
  },
};

export const ExtraLargeSize: Story = {
  args: {
    language: 'python',
    size: 'xl',
    showLabel: false,
  },
};

// All supported languages
export const AllLanguages: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-4">
      <LanguageIcon language="javascript" size="lg" />
      <LanguageIcon language="typescript" size="lg" />
      <LanguageIcon language="python" size="lg" />
      <LanguageIcon language="java" size="lg" />
      <LanguageIcon language="go" size="lg" />
      <LanguageIcon language="rust" size="lg" />
      <LanguageIcon language="ruby" size="lg" />
      <LanguageIcon language="php" size="lg" />
      <LanguageIcon language="swift" size="lg" />
      <LanguageIcon language="kotlin" size="lg" />
      <LanguageIcon language="csharp" size="lg" />
      <LanguageIcon language="cpp" size="lg" />
      <LanguageIcon language="c" size="lg" />
      <LanguageIcon language="scala" size="lg" />
      <LanguageIcon language="haskell" size="lg" />
      <LanguageIcon language="elixir" size="lg" />
      <LanguageIcon language="clojure" size="lg" />
      <LanguageIcon language="sql" size="lg" />
      <LanguageIcon language="html" size="lg" />
      <LanguageIcon language="css" size="lg" />
    </div>
  ),
};

// Language Icon Grid component
export const IconGrid: Story = {
  render: () => (
    <LanguageIconGrid
      languages={['javascript', 'typescript', 'python', 'java', 'go', 'rust']}
      selected="python"
      onSelect={(lang) => console.log('Selected:', lang)}
      size="lg"
    />
  ),
};
