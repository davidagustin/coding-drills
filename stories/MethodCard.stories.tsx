import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MethodCard } from '../components/MethodCard';

const meta = {
  title: 'Quiz/MethodCard',
  component: MethodCard,
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
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof MethodCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default unselected state
export const Default: Story = {
  args: {
    method: '.map()',
    description:
      'Creates a new array with the results of calling a function for every array element',
    isSelected: false,
    isCorrect: null,
    isRevealed: false,
    disabled: false,
  },
};

// Selected state (before reveal)
export const Selected: Story = {
  args: {
    ...Default.args,
    isSelected: true,
  },
};

// Correct answer revealed
export const Correct: Story = {
  args: {
    method: '.filter()',
    description: 'Creates a new array with all elements that pass the test',
    isSelected: true,
    isCorrect: true,
    isRevealed: true,
  },
};

// Incorrect answer revealed
export const Incorrect: Story = {
  args: {
    method: '.forEach()',
    description: 'Calls a function once for each element in an array',
    isSelected: true,
    isCorrect: false,
    isRevealed: true,
  },
};

// Unselected option after reveal (greyed out)
export const RevealedNotSelected: Story = {
  args: {
    method: '.reduce()',
    description: 'Reduces an array to a single value',
    isSelected: false,
    isCorrect: false,
    isRevealed: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

// Without description
export const NoDescription: Story = {
  args: {
    method: '.pop()',
    isSelected: false,
    isCorrect: null,
    isRevealed: false,
  },
};

// Multiple cards in a grid (simulating quiz)
export const QuizGrid: Story = {
  render: () => (
    <div className="space-y-3 max-w-md">
      <MethodCard
        method=".map()"
        description="Creates a new array with the results of calling a function"
        isSelected={false}
        isRevealed={false}
        onClick={() => {}}
      />
      <MethodCard
        method=".filter()"
        description="Creates a new array with elements that pass the test"
        isSelected={true}
        isRevealed={false}
        onClick={() => {}}
      />
      <MethodCard
        method=".reduce()"
        description="Reduces an array to a single value"
        isSelected={false}
        isRevealed={false}
        onClick={() => {}}
      />
      <MethodCard
        method=".forEach()"
        description="Calls a function once for each element"
        isSelected={false}
        isRevealed={false}
        onClick={() => {}}
      />
    </div>
  ),
};

// Quiz grid after reveal
export const QuizGridRevealed: Story = {
  render: () => (
    <div className="space-y-3 max-w-md">
      <MethodCard
        method=".map()"
        description="Creates a new array with the results of calling a function"
        isSelected={false}
        isCorrect={true}
        isRevealed={true}
        onClick={() => {}}
      />
      <MethodCard
        method=".filter()"
        description="Creates a new array with elements that pass the test"
        isSelected={true}
        isCorrect={false}
        isRevealed={true}
        onClick={() => {}}
      />
      <MethodCard
        method=".reduce()"
        description="Reduces an array to a single value"
        isSelected={false}
        isCorrect={false}
        isRevealed={true}
        onClick={() => {}}
      />
      <MethodCard
        method=".forEach()"
        description="Calls a function once for each element"
        isSelected={false}
        isCorrect={false}
        isRevealed={true}
        onClick={() => {}}
      />
    </div>
  ),
};
