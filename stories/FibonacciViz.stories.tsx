import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FibonacciViz from '../components/visualizations/FibonacciViz';

const meta = {
  title: 'Visualizations/DynamicProgramming/Fibonacci',
  component: FibonacciViz,
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
} satisfies Meta<typeof FibonacciViz>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
