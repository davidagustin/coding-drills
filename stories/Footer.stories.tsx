import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Footer } from '../components/Footer';

const meta = {
  title: 'Layout/Footer',
  component: Footer,
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
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Full footer with brand, language links, social icons, and copyright bar
export const Default: Story = {
  args: {},
};

// Full footer explicitly enabled - shows all sections
export const FullFooter: Story = {
  args: {
    showFullFooter: true,
  },
};

// Compact footer - only the copyright/bottom bar, no brand or links
export const CompactFooter: Story = {
  args: {
    showFullFooter: false,
  },
};

// Footer with a custom CSS class applied
export const WithCustomClass: Story = {
  args: {
    showFullFooter: true,
    className: 'mt-16',
  },
};

// Footer on a light background
export const OnLightBackground: Story = {
  args: {
    showFullFooter: true,
  },
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
};
