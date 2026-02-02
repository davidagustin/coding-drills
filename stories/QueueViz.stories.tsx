import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import QueueViz from '../components/visualizations/QueueViz';

const meta = {
  title: 'Visualizations/DataStructures/Queue',
  component: QueueViz,
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
} satisfies Meta<typeof QueueViz>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
