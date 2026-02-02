import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TwoPointerViz from '../components/visualizations/TwoPointerViz';

const meta = {
  title: 'Visualizations/Patterns/TwoPointers',
  component: TwoPointerViz,
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
} satisfies Meta<typeof TwoPointerViz>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
