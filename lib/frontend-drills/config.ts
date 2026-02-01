/**
 * Framework configuration for Frontend Drills.
 * Colors, icons, labels, and validation helpers.
 */

import type { FrameworkId } from './types';

export interface FrameworkConfig {
  id: FrameworkId;
  name: string;
  shortName: string;
  color: string;
  bgColor: string;
  borderColor: string;
  hoverBg: string;
  icon: string;
  description: string;
  version: string;
}

export const FRAMEWORK_CONFIG: Record<FrameworkId, FrameworkConfig> = {
  'native-js': {
    id: 'native-js',
    name: 'Native JavaScript',
    shortName: 'JS',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    hoverBg: 'hover:bg-yellow-500/20',
    icon: 'JS',
    description:
      'Master the DOM API, event handling, and vanilla JavaScript patterns used in every web project.',
    version: 'ES2024',
  },
  react: {
    id: 'react',
    name: 'React',
    shortName: 'Re',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10',
    borderColor: 'border-cyan-400/30',
    hoverBg: 'hover:bg-cyan-400/20',
    icon: '⚛',
    description:
      'Practice hooks, state management, component patterns, and the React rendering model.',
    version: '19',
  },
  angular: {
    id: 'angular',
    name: 'Angular',
    shortName: 'Ng',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    hoverBg: 'hover:bg-red-500/20',
    icon: 'Ng',
    description:
      'Drill Angular decorators, services, dependency injection, RxJS, and template syntax.',
    version: '19',
  },
  vue: {
    id: 'vue',
    name: 'Vue',
    shortName: 'Vu',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    hoverBg: 'hover:bg-emerald-500/20',
    icon: 'V',
    description:
      'Practice the Composition API, reactivity primitives, computed properties, and Vue directives.',
    version: '3.5',
  },
};

export const FRAMEWORK_IDS: FrameworkId[] = ['native-js', 'react', 'angular', 'vue'];

export function isValidFramework(value: string): value is FrameworkId {
  return FRAMEWORK_IDS.includes(value as FrameworkId);
}
