import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import StackViz from '../components/visualizations/StackViz';

const meta = {
  title: 'Visualizations/DataStructures/Stack',
  component: StackViz,
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
} satisfies Meta<typeof StackViz>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
