/**
 * Visualization registry - maps exercise base IDs (without language prefix)
 * to their React visualization components.
 *
 * Usage in exercise page:
 *   const baseId = exerciseId.replace(/^(js|ts)-/, '');
 *   const VizComponent = VISUALIZATIONS[baseId];
 *   if (VizComponent) { <VizComponent /> }
 */
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

// Lazy-load each visualization to avoid bloating the bundle
const BinarySearchViz = dynamic(() => import('./BinarySearchViz'), { ssr: false });
const BFSTreeViz = dynamic(() => import('./BFSTreeViz'), { ssr: false });
const DFSTreeViz = dynamic(() => import('./DFSTreeViz'), { ssr: false });
const SlidingWindowViz = dynamic(() => import('./SlidingWindowViz'), { ssr: false });
const SpiralMatrixViz = dynamic(() => import('./SpiralMatrixViz'), { ssr: false });
const StackViz = dynamic(() => import('./StackViz'), { ssr: false });
const TwoPointerViz = dynamic(() => import('./TwoPointerViz'), { ssr: false });
const LinkedListViz = dynamic(() => import('./LinkedListViz'), { ssr: false });

// Map exercise base ID (without js-/ts- prefix) to visualization component
export const VISUALIZATIONS: Record<string, ComponentType> = {
  'binary-search': BinarySearchViz,
  'binary-search-iterative': BinarySearchViz,
  'bfs-tree': BFSTreeViz,
  'bfs-traversal': BFSTreeViz,
  'dfs-tree': DFSTreeViz,
  'dfs-traversal': DFSTreeViz,
  'dfs-inorder': DFSTreeViz,
  'sliding-window': SlidingWindowViz,
  'sliding-window-max-sum': SlidingWindowViz,
  'spiral-matrix': SpiralMatrixViz,
  'stack-operations': StackViz,
  'two-pointer-palindrome': TwoPointerViz,
  'two-pointer-remove-dupes': TwoPointerViz,
  'linked-list-traverse': LinkedListViz,
  'linked-list-reverse': LinkedListViz,
};

/**
 * Get the visualization component for an exercise ID (with language prefix).
 * Returns null if no visualization is available.
 */
export function getVisualization(exerciseId: string): ComponentType | null {
  const baseId = exerciseId.replace(/^(js|ts)-/, '');
  return VISUALIZATIONS[baseId] || null;
}
