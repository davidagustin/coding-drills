import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Timer } from '../components/Timer';

const meta = {
  title: 'Components/Timer',
  component: Timer,
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
  argTypes: {
    onComplete: { action: 'timer completed' },
  },
} satisfies Meta<typeof Timer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default countdown timer
export const Countdown: Story = {
  args: {
    mode: 'countdown',
    initialTime: 60,
  },
};

// Stopwatch timer
export const Stopwatch: Story = {
  args: {
    mode: 'stopwatch',
  },
};

// Short countdown (warning state)
export const WarningState: Story = {
  args: {
    mode: 'countdown',
    initialTime: 25,
  },
};

// Very short countdown (critical state)
export const CriticalState: Story = {
  args: {
    mode: 'countdown',
    initialTime: 8,
  },
};

// Long countdown
export const LongCountdown: Story = {
  args: {
    mode: 'countdown',
    initialTime: 300,
  },
};

// Multiple timers
export const MultipleTimers: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <div>
        <p className="text-white text-sm mb-2 text-center">Normal</p>
        <Timer mode="countdown" initialTime={60} />
      </div>
      <div>
        <p className="text-white text-sm mb-2 text-center">Warning</p>
        <Timer mode="countdown" initialTime={25} />
      </div>
      <div>
        <p className="text-white text-sm mb-2 text-center">Critical</p>
        <Timer mode="countdown" initialTime={8} />
      </div>
    </div>
  ),
};
