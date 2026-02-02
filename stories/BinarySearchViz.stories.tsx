import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BinarySearchViz from '../components/visualizations/BinarySearchViz';

const meta = {
  title: 'Visualizations/Searching/BinarySearch',
  component: BinarySearchViz,
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
} satisfies Meta<typeof BinarySearchViz>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
