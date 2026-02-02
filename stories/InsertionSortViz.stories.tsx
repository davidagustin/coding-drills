import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import InsertionSortViz from '../components/visualizations/InsertionSortViz';

const meta = {
  title: 'Visualizations/Sorting/InsertionSort',
  component: InsertionSortViz,
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
} satisfies Meta<typeof InsertionSortViz>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
