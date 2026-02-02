import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CategoryPicker } from '../components/CategoryPicker';

const meta = {
  title: 'Components/CategoryPicker',
  component: CategoryPicker,
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
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof CategoryPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const programmingCategories = [
  { id: 'arrays', label: 'Arrays', icon: '📦', count: 42 },
  { id: 'strings', label: 'Strings', icon: '🔤', count: 38 },
  { id: 'objects', label: 'Objects', icon: '🗂', count: 27 },
  { id: 'functions', label: 'Functions', icon: '⚡', count: 35 },
  { id: 'async', label: 'Async/Await', icon: '🔄', count: 18 },
  { id: 'dom', label: 'DOM Manipulation', icon: '🌐', count: 24 },
  { id: 'algorithms', label: 'Algorithms', icon: '🧮', count: 31 },
  { id: 'data-structures', label: 'Data Structures', icon: '🏗', count: 22 },
];

const fewCategories = [
  { id: 'basics', label: 'Basics', icon: '📘', count: 15 },
  { id: 'advanced', label: 'Advanced', icon: '🎓', count: 8 },
];

const manyCategories = [
  { id: 'arrays', label: 'Arrays', icon: '📦', count: 42 },
  { id: 'strings', label: 'Strings', icon: '🔤', count: 38 },
  { id: 'objects', label: 'Objects', icon: '🗂', count: 27 },
  { id: 'functions', label: 'Functions', icon: '⚡', count: 35 },
  { id: 'async', label: 'Async/Await', icon: '🔄', count: 18 },
  { id: 'dom', label: 'DOM Manipulation', icon: '🌐', count: 24 },
  { id: 'algorithms', label: 'Algorithms', icon: '🧮', count: 31 },
  { id: 'data-structures', label: 'Data Structures', icon: '🏗', count: 22 },
  { id: 'closures', label: 'Closures', icon: '🔒', count: 12 },
  { id: 'promises', label: 'Promises', icon: '🤝', count: 16 },
  { id: 'generators', label: 'Generators', icon: '🔁', count: 9 },
  { id: 'proxies', label: 'Proxies', icon: '🛡', count: 6 },
  { id: 'iterators', label: 'Iterators', icon: '➡️', count: 11 },
  { id: 'regex', label: 'Regular Expressions', icon: '🔍', count: 14 },
  { id: 'error-handling', label: 'Error Handling', icon: '🚨', count: 10 },
];

const categoriesWithoutIcons = [
  { id: 'arrays', label: 'Arrays', count: 42 },
  { id: 'strings', label: 'Strings', count: 38 },
  { id: 'objects', label: 'Objects', count: 27 },
  { id: 'functions', label: 'Functions', count: 35 },
  { id: 'async', label: 'Async/Await', count: 18 },
];

// Default with some selected
export const Default: Story = {
  args: {
    categories: programmingCategories,
    selected: ['arrays', 'strings'],
    showCounts: false,
  },
};

// Some categories selected
export const WithSelection: Story = {
  args: {
    categories: programmingCategories,
    selected: ['arrays', 'functions', 'algorithms'],
    showCounts: true,
  },
};

// All categories selected
export const AllSelected: Story = {
  args: {
    categories: programmingCategories,
    selected: programmingCategories.map((c) => c.id),
    showCounts: true,
  },
};

// No categories selected
export const NoneSelected: Story = {
  args: {
    categories: programmingCategories,
    selected: [],
    showCounts: false,
  },
};

// Showing count badges
export const WithCounts: Story = {
  args: {
    categories: programmingCategories,
    selected: ['arrays', 'strings', 'objects'],
    showCounts: true,
  },
};

// Without count badges
export const WithoutCounts: Story = {
  args: {
    categories: programmingCategories,
    selected: ['arrays', 'strings'],
    showCounts: false,
  },
};

// Large number of categories to test wrapping
export const ManyCategories: Story = {
  args: {
    categories: manyCategories,
    selected: ['arrays', 'closures', 'regex'],
    showCounts: true,
  },
};

// Only two categories
export const FewCategories: Story = {
  args: {
    categories: fewCategories,
    selected: ['basics'],
    showCounts: true,
  },
};

// Empty categories list
export const EmptyCategories: Story = {
  args: {
    categories: [],
    selected: [],
    showCounts: false,
  },
};

// Categories without icons
export const NoIcons: Story = {
  args: {
    categories: categoriesWithoutIcons,
    selected: ['arrays', 'objects'],
    showCounts: true,
  },
};

// Single category selected
export const SingleSelected: Story = {
  args: {
    categories: programmingCategories,
    selected: ['dom'],
    showCounts: true,
  },
};

// All variants displayed together
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-10 max-w-lg">
      <div>
        <p className="text-xs text-zinc-500 mb-2">None selected</p>
        <CategoryPicker
          categories={programmingCategories}
          selected={[]}
          onChange={() => {}}
          showCounts={false}
        />
      </div>
      <div>
        <p className="text-xs text-zinc-500 mb-2">Some selected with counts</p>
        <CategoryPicker
          categories={programmingCategories}
          selected={['arrays', 'functions', 'algorithms']}
          onChange={() => {}}
          showCounts={true}
        />
      </div>
      <div>
        <p className="text-xs text-zinc-500 mb-2">All selected</p>
        <CategoryPicker
          categories={programmingCategories}
          selected={programmingCategories.map((c) => c.id)}
          onChange={() => {}}
          showCounts={true}
        />
      </div>
      <div>
        <p className="text-xs text-zinc-500 mb-2">Few categories</p>
        <CategoryPicker
          categories={fewCategories}
          selected={['basics']}
          onChange={() => {}}
          showCounts={true}
        />
      </div>
      <div>
        <p className="text-xs text-zinc-500 mb-2">Empty state</p>
        <CategoryPicker categories={[]} selected={[]} onChange={() => {}} showCounts={false} />
      </div>
    </div>
  ),
};
