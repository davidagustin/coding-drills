/**
 * Type definitions for the UI Patterns feature.
 * Covers common UI patterns across 4 frameworks: Native JS, React, Angular, Vue.
 */

import type { FrameworkId } from '../types';

export type UIPatternCategory =
  | 'forms-input'
  | 'interactive'
  | 'data-display'
  | 'navigation'
  | 'advanced'
  | 'ui-components';

export type UIPatternDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface UIPattern {
  id: string;
  title: string;
  category: UIPatternCategory;
  difficulty: UIPatternDifficulty;
  description: string;
  /** Key concepts or techniques demonstrated by this pattern. */
  concepts: string[];
  framework: FrameworkId;
  /** Detailed prompt description for AI-assisted or guided implementations. */
  promptDescription?: string;
  /** URL to the live demo or reference implementation. */
  externalUrl?: string;
  /** Embedded demo code rendered in a sandboxed iframe preview. */
  demoCode?: {
    html: string;
    css: string;
    js: string;
  };
}

/** Display configuration for each UI pattern category. */
export const UI_PATTERN_CATEGORIES: Record<
  UIPatternCategory,
  {
    name: string;
    icon: string;
    description: string;
  }
> = {
  'forms-input': {
    name: 'Forms & Input',
    icon: 'form',
    description: 'Form validation, autocomplete, file upload, and input handling patterns',
  },
  interactive: {
    name: 'Interactive Elements',
    icon: 'interactive',
    description: 'Modals, drag-and-drop, carousels, tabs, and gesture-driven UI',
  },
  'data-display': {
    name: 'Data Display',
    icon: 'data',
    description: 'Tables, charts, galleries, search, and data visualization',
  },
  navigation: {
    name: 'Navigation & Layout',
    icon: 'nav',
    description: 'Navbars, sidebars, menus, breadcrumbs, and page layout patterns',
  },
  advanced: {
    name: 'Advanced Features',
    icon: 'advanced',
    description: 'Keyboard shortcuts, notifications, undo/redo, and complex interactions',
  },
  'ui-components': {
    name: 'UI Components',
    icon: 'component',
    description: 'Reusable UI primitives: loaders, toggles, image viewers, and empty states',
  },
};

export const UI_PATTERN_DIFFICULTY_CONFIG: Record<
  UIPatternDifficulty,
  {
    name: string;
    color: string;
    bgColor: string;
  }
> = {
  beginner: {
    name: 'Beginner',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
  },
  intermediate: {
    name: 'Intermediate',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
  },
  advanced: {
    name: 'Advanced',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
  },
};
