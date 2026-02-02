import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from '@storybook/test';
import { ClearDataDialog } from '../components/ClearDataDialog';

const meta = {
  title: 'Overlays/ClearDataDialog',
  component: ClearDataDialog,
  parameters: {
    layout: 'fullscreen',
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
    onClose: { action: 'closed' },
  },
} satisfies Meta<typeof ClearDataDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to seed localStorage with realistic coding-drills data
function seedLocalStorage() {
  const languages = ['javascript', 'typescript', 'python', 'java', 'go', 'rust'];

  // Training progress per language
  for (const lang of languages) {
    const progress = {
      completedProblems: Array.from(
        { length: Math.floor(Math.random() * 50) },
        (_, i) => `problem-${i}`,
      ),
      streaks: { current: Math.floor(Math.random() * 14), best: Math.floor(Math.random() * 30) },
      lastPracticed: new Date().toISOString(),
    };
    localStorage.setItem(`coding-drills-problems-${lang}`, JSON.stringify(progress));
  }

  // Exercise progress per language
  for (const lang of languages.slice(0, 4)) {
    const exercises = {
      completed: Array.from({ length: Math.floor(Math.random() * 20) }, (_, i) => `exercise-${i}`),
      inProgress: [`exercise-${Math.floor(Math.random() * 100)}`],
    };
    localStorage.setItem(`coding-drills-exercises-${lang}`, JSON.stringify(exercises));
  }

  // Stats per language
  for (const lang of languages.slice(0, 3)) {
    const stats = {
      totalAttempts: Math.floor(Math.random() * 200),
      correctAnswers: Math.floor(Math.random() * 150),
      averageTime: Math.floor(Math.random() * 60) + 10,
    };
    localStorage.setItem(`coding-drills-stats-${lang}`, JSON.stringify(stats));
  }

  // Global progress
  localStorage.setItem(
    'coding-drills-progress',
    JSON.stringify({ totalDrills: 347, quizzes: 42, lastSession: new Date().toISOString() }),
  );

  // Leaderboard
  localStorage.setItem(
    'coding-drills-leaderboard',
    JSON.stringify([
      { name: 'User', score: 9850, date: '2026-01-15' },
      { name: 'User', score: 9200, date: '2026-01-10' },
    ]),
  );

  // Settings
  localStorage.setItem(
    'coding-drills-settings',
    JSON.stringify({ fontSize: 14, autoSave: true, notifications: false }),
  );

  // Theme
  localStorage.setItem('coding-drills-theme', 'dark');
}

// Dialog in open state with seeded localStorage data
export const Open: Story = {
  args: {
    isOpen: true,
    onClose: fn(),
  },
  decorators: [
    (Story) => {
      seedLocalStorage();
      return <Story />;
    },
  ],
};

// Dialog closed (renders nothing - included for completeness)
export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: fn(),
  },
};

// Dialog with no saved data - shows empty state
export const EmptyState: Story = {
  args: {
    isOpen: true,
    onClose: fn(),
  },
  decorators: [
    (Story) => {
      // Clear all coding-drills keys so the dialog shows the empty state
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('coding-drills-')) {
          keysToRemove.push(key);
        }
      }
      for (const key of keysToRemove) {
        localStorage.removeItem(key);
      }
      return <Story />;
    },
  ],
};

// Dialog with minimal data - only one category populated
export const MinimalData: Story = {
  args: {
    isOpen: true,
    onClose: fn(),
  },
  decorators: [
    (Story) => {
      // Clear existing
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('coding-drills-')) {
          keysToRemove.push(key);
        }
      }
      for (const key of keysToRemove) {
        localStorage.removeItem(key);
      }
      // Only seed one category
      localStorage.setItem(
        'coding-drills-problems-javascript',
        JSON.stringify({
          completedProblems: ['p1', 'p2', 'p3'],
          streaks: { current: 5, best: 12 },
        }),
      );
      return <Story />;
    },
  ],
};

// Dialog with data across many categories
export const FullData: Story = {
  args: {
    isOpen: true,
    onClose: fn(),
  },
  decorators: [
    (Story) => {
      seedLocalStorage();
      return <Story />;
    },
  ],
};

// Dialog on light background
export const OnLightBackground: Story = {
  args: {
    isOpen: true,
    onClose: fn(),
  },
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
  decorators: [
    (Story) => {
      seedLocalStorage();
      return <Story />;
    },
  ],
};
