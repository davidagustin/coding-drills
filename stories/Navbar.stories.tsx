import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { Navbar } from '../components/Navbar';
import { ThemeProvider } from '../components/ThemeProvider';

const meta = {
  title: 'Layout/Navbar',
  component: Navbar,
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
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="dark">
        <div style={{ minHeight: '200px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default navbar with no links
export const Default: Story = {
  args: {},
};

// Navbar with typical navigation links
export const WithLinks: Story = {
  args: {
    links: [
      { href: '/javascript', label: 'JavaScript' },
      { href: '/typescript', label: 'TypeScript' },
      { href: '/python', label: 'Python' },
    ],
  },
};

// Navbar showing language nav context with current language badge
export const WithLanguageNav: Story = {
  args: {
    links: [
      { href: '/javascript/drills', label: 'Drills' },
      { href: '/javascript/quiz', label: 'Quiz' },
      { href: '/javascript/exercises', label: 'Exercises' },
    ],
    showLanguageNav: true,
    currentLanguage: 'javascript',
  },
};

// Navbar with links and icons
export const WithIconLinks: Story = {
  args: {
    links: [
      {
        href: '/javascript',
        label: 'JavaScript',
        icon: React.createElement(
          'svg',
          {
            className: 'w-4 h-4',
            fill: 'none',
            viewBox: '0 0 24 24',
            stroke: 'currentColor',
            strokeWidth: 2,
          },
          React.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
          }),
        ),
      },
      {
        href: '/python',
        label: 'Python',
        icon: React.createElement(
          'svg',
          {
            className: 'w-4 h-4',
            fill: 'none',
            viewBox: '0 0 24 24',
            stroke: 'currentColor',
            strokeWidth: 2,
          },
          React.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M13 10V3L4 14h7v7l9-11h-7z',
          }),
        ),
      },
    ],
  },
};

// Navbar with many links to test overflow
export const ManyLinks: Story = {
  args: {
    links: [
      { href: '/javascript', label: 'JavaScript' },
      { href: '/typescript', label: 'TypeScript' },
      { href: '/python', label: 'Python' },
      { href: '/java', label: 'Java' },
      { href: '/cpp', label: 'C++' },
      { href: '/go', label: 'Go' },
      { href: '/rust', label: 'Rust' },
    ],
  },
};

// Navbar with language nav showing Python context
export const PythonLanguageContext: Story = {
  args: {
    links: [
      { href: '/python/drills', label: 'Drills' },
      { href: '/python/quiz', label: 'Quiz' },
      { href: '/python/exercises', label: 'Exercises' },
    ],
    showLanguageNav: true,
    currentLanguage: 'python',
  },
};

// Navbar with a single link
export const SingleLink: Story = {
  args: {
    links: [{ href: '/about', label: 'About' }],
  },
};

// Navbar with page content beneath to show scroll-based styling
export const WithPageContent: Story = {
  args: {
    links: [
      { href: '/javascript', label: 'JavaScript' },
      { href: '/typescript', label: 'TypeScript' },
      { href: '/python', label: 'Python' },
    ],
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="dark">
        <div>
          <Story />
          <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} style={{ color: '#94a3b8', marginBottom: '16px', lineHeight: '1.6' }}>
                Scroll down to see the navbar background change when the page is scrolled. The
                navbar transitions from transparent to a frosted glass effect with a subtle border
                and shadow. This behavior helps users maintain context while browsing content.
              </p>
            ))}
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};
