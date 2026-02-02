import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Link from 'next/link';
import { GoBackButton } from '../components/GoBackButton';

const meta = {
  title: 'Navigation/GoBackButton',
  component: GoBackButton,
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
} satisfies Meta<typeof GoBackButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default standalone button
export const Default: Story = {};

// Button inside a 404-style context
export const InNotFoundContext: Story = {
  render: () => (
    <div className="text-center space-y-6 max-w-md">
      <div className="w-20 h-20 mx-auto rounded-full bg-zinc-800 flex items-center justify-center">
        <span className="text-4xl font-bold text-zinc-500">404</span>
      </div>
      <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
      <p className="text-zinc-400">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex gap-3 justify-center">
        <GoBackButton />
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-200"
        >
          Go Home
        </Link>
      </div>
    </div>
  ),
};

// Button inside a header toolbar
export const InToolbar: Story = {
  render: () => (
    <div className="flex items-center gap-4 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-xl max-w-lg">
      <GoBackButton />
      <div className="h-6 w-px bg-zinc-700" />
      <h2 className="text-white font-semibold">JavaScript Quiz</h2>
      <span className="ml-auto text-sm text-zinc-400">Question 3 of 10</span>
    </div>
  ),
};

// Button inside an error page
export const InErrorPage: Story = {
  render: () => (
    <div className="text-center space-y-4 max-w-sm">
      <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-white">Something went wrong</h2>
      <p className="text-zinc-400 text-sm">
        This quiz could not be loaded. Please go back and try again.
      </p>
      <GoBackButton />
    </div>
  ),
};

// Button on light background
export const OnLightBackground: Story = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
};

// Multiple navigation options
export const WithOtherNavigation: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <p className="text-sm text-zinc-400">Navigate:</p>
      <div className="flex flex-col gap-3">
        <GoBackButton />
        <button
          type="button"
          className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold rounded-xl border border-zinc-700 transition-all duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Go Home
        </button>
      </div>
    </div>
  ),
};
