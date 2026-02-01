/**
 * Cheatsheet — public API.
 * Provides cheatsheet data for each frontend framework.
 */

import type { CheatsheetData, FrameworkId } from '../types';
import { angularCheatsheet } from './angular';
import { nativeJsCheatsheet } from './native-js';
import { reactCheatsheet } from './react';
import { vueCheatsheet } from './vue';

const cheatsheetsByFramework: Record<FrameworkId, CheatsheetData> = {
  'native-js': nativeJsCheatsheet,
  react: reactCheatsheet,
  angular: angularCheatsheet,
  vue: vueCheatsheet,
};

/** Get the full cheatsheet data for a framework. */
export function getCheatsheet(framework: FrameworkId): CheatsheetData {
  return cheatsheetsByFramework[framework];
}

/** Get the number of sections in a framework's cheatsheet. */
export function getCheatsheetSectionCount(framework: FrameworkId): number {
  return cheatsheetsByFramework[framework].sections.length;
}
