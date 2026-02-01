/**
 * Hand-crafted starter code for each UI pattern.
 * Each pattern gets individually authored boilerplate that is
 * syntactically valid and gives the user enough scaffolding
 * to focus on implementing business logic.
 */

import type { FrameworkId } from '../../types';
import { angularStarters } from './angular';
import { nativeJsStarters } from './native-js';
import { reactStarters } from './react';
import { vueStarters } from './vue';

const startersByFramework: Record<FrameworkId, Record<string, string>> = {
  react: reactStarters,
  vue: vueStarters,
  angular: angularStarters,
  'native-js': nativeJsStarters,
};

export function getStarterCode(framework: FrameworkId, patternId: string): string | undefined {
  return startersByFramework[framework]?.[patternId];
}
