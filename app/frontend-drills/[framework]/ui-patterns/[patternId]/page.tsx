'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { LivePreview } from '@/components/LivePreview';
import type { Exercise, ExerciseCategory, ExerciseDifficulty } from '@/lib/exercises/types';
import {
  FRAMEWORK_CONFIG,
  type FrameworkId,
  getUIPatternById,
  getUIPatterns,
  isValidFramework,
  UI_PATTERN_CATEGORIES,
  UI_PATTERN_DIFFICULTY_CONFIG,
  type UIPattern,
} from '@/lib/frontend-drills';
import { getStarterCode } from '@/lib/frontend-drills/ui-patterns/starters';
import { buildTestRunnerScript, getPatternTests } from '@/lib/frontend-drills/ui-patterns/tests';

const CodeEditor = dynamic(
  () => import('@/components/CodeEditor').then((mod) => mod.default || mod),
  { ssr: false },
);
const CodeDisplay = dynamic(
  () => import('@/components/CodeDisplay').then((mod) => mod.default || mod),
  { ssr: false },
);
const ExerciseTutor = dynamic(() => import('@/components/ExerciseTutor'), { ssr: false });

function formatCSSForDisplay(raw: string): string {
  return raw
    .replace(/\{([^}]+)\}/g, (_match, body: string) => {
      const props = body
        .split(';')
        .map((p: string) => p.trim())
        .filter(Boolean)
        .map((p: string) => `  ${p};`)
        .join('\n');
      return `{\n${props}\n}`;
    })
    .replace(/\}\s*/g, '}\n\n')
    .trim();
}

function getImplementationHint(concept: string, framework: string): string {
  const hints: Record<string, string> = {
    'form validation':
      'Use input event listeners + error display; check .value, .length, and regex patterns',
    'constraint validation':
      'Use el.setCustomValidity(), el.checkValidity(), and el.validity properties',
    'state management': 'Design the component state structure and update flows',
    'error handling': 'Add try/catch, error boundaries, and user-friendly error messages',
    accessibility: 'Add aria-label, aria-expanded, aria-selected, role attributes',
    'keyboard navigation': 'Listen for keydown — handle ArrowUp/Down, Enter, Escape, Tab',
    debouncing:
      'Use clearTimeout + setTimeout pattern: clearTimeout(timer); timer = setTimeout(fn, delay)',
    'focus management': 'Use el.focus(), tabIndex, and track which element should receive focus',
    'aria attributes': 'Add role, aria-label, aria-live, aria-expanded, aria-selected as needed',
    'visual feedback': 'Toggle CSS classes for states: .loading, .success, .error, .active',
    'async operations': 'Use async/await with try/catch, show loading state, handle errors',
    'drag and drop': 'Listen for dragstart, dragover, dragend, drop events; use e.dataTransfer',
    animation: 'Use CSS transitions/keyframes or element.animate() for smooth effects',
    'responsive design': 'Use CSS media queries or container queries for breakpoints',
    'event delegation':
      'Attach listener to parent, use e.target.closest(selector) to find the element',
    'dom manipulation': 'Use createElement, appendChild, remove(), insertBefore, innerHTML',
    navigation: 'Track active tab/view in state, render conditionally based on selection',
    'state persistence': 'Use localStorage.setItem/getItem with JSON.stringify/parse',
    filtering: 'Use array.filter() to match items against search input',
    sorting: 'Use array.sort() with a compare function, track sort direction in state',
    pagination: 'Slice the array with .slice(start, end), track currentPage and pageSize',
    'search/filter': 'Filter items with .filter(item => item.toLowerCase().includes(query))',
    'input masking': 'Intercept input events, format the value, and set it back on the input',
    'date parsing': 'Use new Date(), toLocaleDateString(), or manual string parsing',
    'clipboard api': 'Use navigator.clipboard.writeText(text) with async/await',
    'form events': 'Listen for submit, input, change, focus, blur events on form elements',
    'inline editing': 'Toggle between display and edit mode, save on blur or Enter',
    'lazy loading': 'Use IntersectionObserver to detect when elements enter the viewport',
    'infinite scroll':
      'Detect scroll near bottom with scrollTop + clientHeight >= scrollHeight - threshold',
    'file upload': 'Use input type="file" change event, read files from e.target.files',
    'custom select': 'Build a button + dropdown list, manage open/close state and selection',
    'password strength':
      'Test against regex patterns for length, uppercase, lowercase, numbers, symbols',
    'real-time': 'Use setInterval or requestAnimationFrame for periodic updates',
    'toast notification': 'Create element, append to body, auto-remove with setTimeout',
    animations: 'Use CSS transitions/keyframes or element.animate() for smooth effects',

    // Touch & gesture events
    'touch events': 'Listen for touchstart/touchmove/touchend; use e.touches[0] for coordinates',
    'touch gestures': 'Listen for touchstart/touchmove/touchend; track start position and delta',
    'mobile patterns': 'Use fixed positioning, hide on scroll-down, show on scroll-up',
    'pointer events': 'Listen for pointerdown/pointermove/pointerup; use e.clientX/Y',
    'mouse events': 'Listen for mousedown/mousemove/mouseup; use e.clientX/Y for position',
    'scroll events': 'Listen for scroll event; compare scrollTop to detect direction or position',
    'event throttling': 'Use requestAnimationFrame or a flag to limit event handler frequency',

    // CSS & visual
    'css transforms':
      'Use el.style.transform = "translateX(...)" or "scale(...)" for visual changes',
    'css transitions': 'Add transition property in CSS; toggle classes for animated state changes',
    'css grid': 'Use display:grid with grid-template-columns for responsive layouts',
    'css animations': 'Use CSS @keyframes and animation property, or element.animate()',
    transitions: 'Use CSS transitions or element.animate() for smooth state changes',
    'grid layouts': 'Use CSS Grid or Flexbox with gap property for card/image grids',
    styling: 'Apply conditional CSS classes based on state for visual feedback',

    // Component & architecture patterns
    'component composition': 'Break UI into smaller reusable components, pass data via props',
    'progressive disclosure': 'Show basic info first, reveal details on user interaction',
    'portal rendering': 'Render content outside the component DOM tree (modals, tooltips)',
    'dynamic forms': 'Generate form fields from a schema/config array dynamically',
    'modal dialogs': 'Create overlay + centered content, trap focus, close on Escape/backdrop',
    accordion: 'Toggle visibility of content panels, track open/closed state per section',
    tooltips: 'Show floating text on hover/focus, position relative to trigger element',

    // Data patterns
    'list rendering': 'Map over an array to render items; use unique keys for each element',
    'list manipulation': 'Use splice, filter, or map to add/remove/reorder items in an array',
    'data formatting': 'Use Intl.NumberFormat, Intl.DateTimeFormat, or template literals',
    'data transformation': 'Use map/reduce/filter to reshape data for display',
    'data visualization': 'Render charts/graphs using Canvas API, SVG, or computed dimensions',
    'data management': 'Track items in state, provide CRUD operations (add, edit, delete)',
    'data organization': 'Group/categorize items, provide sorting and filtering controls',
    'virtual scrolling':
      'Calculate visible range from scrollTop/itemHeight; render only visible items',

    // User experience
    'user experience': 'Provide loading states, smooth transitions, and clear feedback',
    'user feedback': 'Show success/error messages, highlight changes, use visual indicators',
    'user guidance': 'Add placeholder text, labels, progress indicators, and step instructions',
    'user preferences': 'Save settings to localStorage; apply theme/language/layout preferences',
    'progress tracking': 'Track completed steps or percentage; update a progress bar/indicator',
    'loading states': 'Show spinner or skeleton while loading; hide on completion',
    'empty states': 'Show helpful message with icon and call-to-action when no data exists',

    // Validation & security
    validation: 'Check input values against rules; display error messages for invalid fields',
    'input parsing': 'Extract and transform raw input into structured data',
    'input events': 'Listen for input, change, blur events to process user text in real-time',
    'cursor position': 'Use input.selectionStart/End and setSelectionRange() to restore cursor',
    'string manipulation': 'Use slice, replace, padStart, and template literals for formatting',
    security: 'Validate and sanitize input, prevent XSS, use proper encoding',

    // File & media
    'file handling': 'Read files from input.files or e.dataTransfer.files; use FileReader API',
    'file api': 'Use input type="file" change event; read with FileReader or URL.createObjectURL',
    'image loading': 'Use loading="lazy" attribute or IntersectionObserver for deferred loading',
    'image optimization': 'Use appropriate image sizes, lazy loading, and placeholder images',
    'image preview': 'Use URL.createObjectURL(file) or FileReader to show selected images',
    'image manipulation': 'Clone elements, scale with CSS transform, track mouse for offset',
    'progress events':
      'Track upload/download progress with XMLHttpRequest or simulate with setInterval',

    // Timer & async patterns
    timers:
      'Use setTimeout for delays, setInterval for repeating, requestAnimationFrame for animation',
    'auto-play': 'Use setInterval to advance automatically; pause on hover or interaction',
    'context menus': 'Listen for contextmenu event; use e.preventDefault() to show custom menu',

    // State & history
    'history tracking': 'Maintain an array of states with a position index for undo/redo',
    'command pattern':
      'Store actions as objects with execute/undo methods; maintain a history stack',
    'url state': 'Sync component state with URL query params using URLSearchParams',

    // Layout & navigation
    positioning: 'Use absolute/fixed positioning with top/left; clamp to viewport bounds',
    'mobile menus': 'Toggle hamburger menu, use CSS transform for slide-in animation',
    'component organization': 'Group related UI into sections with clear visual hierarchy',
    routing: 'Track active view in state, render conditionally based on selection',

    // Keyboard & shortcuts
    'keyboard shortcuts': 'Listen for keydown, check e.ctrlKey/metaKey + e.key for combinations',
    'keyboard events':
      'Listen for keydown/keyup, handle specific keys like Enter, Escape, Arrow keys',
    'key combinations': 'Check modifier keys (ctrlKey, shiftKey, altKey) combined with e.key',

    // Canvas & SVG
    'canvas api': 'Get context with getContext("2d"); use fillRect, beginPath, arc, fill, stroke',
    svg: 'Create SVG elements with proper namespace; set attributes for shapes and paths',

    // Framework-specific: Vue
    'v-model': 'Bind form inputs with v-model; use .lazy/.number/.trim modifiers',
    computed: 'Use computed() for derived state that auto-updates when dependencies change',
    reactive: 'Use reactive() for objects/arrays, ref() for primitives; access with .value',
    'composition api': 'Organize logic in setup(), return exposed properties and methods',
    teleport: 'Use Teleport to render content outside the component DOM tree',
    slots: 'Use named slots for customizable component content areas',
    pinia: 'Define stores with defineStore(); use storeToRefs() for reactive destructuring',
    'provide/inject': 'Use provide() in parent and inject() in child for dependency injection',
    'transition group': 'Use TransitionGroup for list enter/leave/move animations',
    watch: 'Use watch() or watchEffect() to react to reactive state changes',
    'custom directives': 'Register directives with app.directive(); use mounted/updated hooks',
    'vue router': 'Use useRouter() and useRoute() composables for navigation and route params',
    'lifecycle hooks': 'Use onMounted(), onUnmounted(), onUpdated() in setup()',
    'keep-alive': 'Wrap dynamic components to preserve state across toggles',
    'async components': 'Use defineAsyncComponent() for code-splitting and lazy loading',
    refs: 'Use ref() for reactive primitives, template refs with ref="name"',
    'scoped slots': 'Use scoped slots to pass data from child to parent template',
    modifiers: 'Use event modifiers (.prevent, .stop) and v-model modifiers (.lazy, .number)',
    'dynamic components': 'Use component :is="..." for runtime component switching',

    // Framework-specific: Angular
    rxjs: 'Use RxJS operators like map, filter, switchMap, debounceTime with pipe()',
    observables: 'Subscribe to Observables; manage subscriptions; use async pipe in templates',
    formbuilder: 'Use FormBuilder to create FormGroup with FormControls and validators',
    validators: 'Use Validators.required, Validators.email, or custom validator functions',
    ngmodel: 'Use [(ngModel)] for two-way binding between template and component',
    'angular cdk': 'Use CDK utilities like Overlay, DragDrop, ScrollingModule, Portal',
    'dependency injection': 'Register with providedIn and inject into constructors',
    services: 'Create @Injectable services and inject via constructor parameters',
    pipes: 'Implement PipeTransform interface with transform() method',
    directives: 'Use @Directive decorator; handle DOM via ElementRef and HostListener',
    'structural directives': 'Use *ngIf, *ngFor, *ngSwitch or create custom structural directives',
    overlay: 'Use CDK Overlay to create floating panels positioned relative to triggers',
    'content projection': 'Use ng-content for content projection; select attribute for slots',
    router: 'Use RouterModule with Routes array, routerLink, and ActivatedRoute',

    // API patterns
    'feature detection': 'Check if API exists: "clipboard" in navigator, "Notification" in window',
    'permissions api': 'Use Notification.requestPermission() or navigator.permissions.query()',
    'notification api': 'Use new Notification(title, options) after permission granted',
    'history api': 'Use history.pushState() and popstate event for URL state sync',
    'dialog element': 'Use native dialog element with showModal()/close() methods',

    // DOM patterns
    'template literals': 'Use backtick strings with ${expression} to build dynamic HTML',
    'regular expressions':
      'Use /pattern/.test(value) for validation, .replace() for transformation',
    contenteditable: 'Set contentEditable="true"; use execCommand or Selection API',
    'selection api': 'Use window.getSelection() and Range objects to manipulate text selections',
    'dom recycling': 'Reuse existing DOM elements by updating content instead of recreating',
    'array methods': 'Use filter(), sort(), slice(), map(), reduce() for data transformation',
    'csv export': 'Build CSV string with headers + rows; create Blob and download via anchor',
    serialization: 'Use JSON.stringify() to save and JSON.parse() to restore objects',
    'storage events': 'Listen for window storage event for cross-tab synchronization',
    interactivity: 'Add click, hover, and keyboard handlers for interactive behavior',
    'auto-save': 'Debounce changes with setTimeout; save to localStorage or API',
    'performance optimization': 'Minimize DOM operations; batch updates; use requestAnimationFrame',
  };

  const lower = concept.toLowerCase();
  for (const [key, hint] of Object.entries(hints)) {
    if (lower.includes(key) || key.includes(lower)) return hint;
  }
  return `Implement ${concept} using ${framework} patterns and best practices`;
}

/** Extract regex patterns and key APIs from demo code as hints for the starter */
function extractDemoHints(js: string): string[] {
  const hints: string[] = [];

  // Extract regex literals (skip simple ones like /g or /i flags alone)
  const regexMatches = js.match(/\/[^/\n]{2,}\/[gimsuy]*/g);
  if (regexMatches) {
    const unique = [...new Set(regexMatches)];
    if (unique.length > 0) {
      hints.push(`Useful regex: ${unique.join('  ')}`);
    }
  }

  // Extract key DOM/JS APIs used
  const apis: string[] = [];
  if (js.includes('.setCustomValidity') || js.includes('.checkValidity'))
    apis.push('Constraint Validation API (setCustomValidity, checkValidity)');
  if (js.includes('.closest(')) apis.push('el.closest(selector)');
  if (js.includes('.matches(')) apis.push('el.matches(selector)');
  if (js.includes('.dataset')) apis.push('el.dataset');
  if (js.includes('localStorage')) apis.push('localStorage');
  if (js.includes('.animate(')) apis.push('el.animate()');
  if (js.includes('IntersectionObserver')) apis.push('IntersectionObserver');
  if (js.includes('MutationObserver')) apis.push('MutationObserver');
  if (js.includes('navigator.clipboard')) apis.push('navigator.clipboard');
  if (js.includes('URL.createObjectURL')) apis.push('URL.createObjectURL');
  if (js.includes('FileReader')) apis.push('FileReader');
  if (js.includes('requestAnimationFrame')) apis.push('requestAnimationFrame');
  if (js.includes('AbortController')) apis.push('AbortController');

  if (apis.length > 0) {
    hints.push(`Key APIs: ${apis.join(', ')}`);
  }

  return hints;
}

/**
 * Determine if a line is "setup" — structural code the user needs to see
 * but doesn't need to write (imports, state declarations, DOM references).
 */
function isSkeletonSetup(t: string): boolean {
  // Framework imports: const { useState, ... } = React
  if (/^const\s*\{.*\}\s*=\s*(React|Vue)/.test(t)) return true;
  // React component signature: function MyComponent() {
  if (/^function\s+[A-Z]\w*\s*\(/.test(t)) return true;
  // Vue createApp / setup
  if (/^createApp\s*\(\s*\{/.test(t) || /^setup\s*\(\)\s*\{/.test(t)) return true;
  // State hooks: const [x, setX] = useState(...)
  if (/useState\(|useRef\(|useMemo\(/.test(t) && /^(const|let)\s/.test(t)) return true;
  // Vue reactivity: const x = ref(...)
  if (/\bref\(|reactive\(/.test(t) && /^(const|let)\s/.test(t)) return true;
  // DOM references: const el = document.getElementById(...)
  if (/document\.getElementById/.test(t) && /^(const|let|var)\s/.test(t)) return true;
  // Simple value declarations (not arrow functions)
  if (
    /^(const|let|var)\s+\w+\s*=\s*('|"|`|-?\d|true|false|null|undefined|\[|\{|new\s)/.test(t) &&
    !/=>\s*[{(]/.test(t)
  )
    return true;
  // Destructuring with useState
  if (/^(const|let)\s+\[/.test(t) && /useState/.test(t)) return true;
  // Angular simulation comment
  if (/^\/\/\s*Simulating/.test(t)) return true;
  // querySelector / querySelectorAll on variable declarations
  if (/\.querySelector(All)?\s*\(/.test(t) && /^(const|let|var)\s/.test(t)) return true;
  // Array.from expressions
  if (/Array\.from\s*\(/.test(t) && /^(const|let|var)\s/.test(t)) return true;
  // Math.* expressions
  if (/Math\.\w+\s*\(/.test(t) && /^(const|let|var)\s/.test(t)) return true;
  // JSON.parse expressions
  if (/JSON\.parse\s*\(/.test(t) && /^(const|let|var)\s/.test(t)) return true;
  // Uninitialized variable declarations: let x, y, z;
  if (/^(let|var)\s+\w+(,\s*\w+)*\s*;/.test(t)) return true;
  return false;
}

/**
 * Build framework-specific teardown (return statement, mounting, template).
 */
function buildSkeletonTeardown(
  js: string,
  lines: string[],
  framework: string,
  indent: string,
): string[] {
  const result: string[] = [];

  if (framework === 'react') {
    // Prefer 'App' as mount target; fall back to last PascalCase function
    const appMatch = js.match(/function\s+(App)\b/);
    const allFuncs = [...js.matchAll(/function\s+([A-Z]\w*)/g)];
    const name = appMatch?.[1] || allFuncs[allFuncs.length - 1]?.[1] || 'App';
    result.push(
      `${indent}return (`,
      `${indent}  <div>`,
      `${indent}    {/* Build your UI here */}`,
      `${indent}  </div>`,
      `${indent});`,
      `}`,
      ``,
      `ReactDOM.createRoot(document.getElementById('app')).render(<${name} />);`,
    );
  } else if (framework === 'vue') {
    // Preserve the return statement (shows what variables/functions to expose)
    const returnLine = lines.find((l) => /^\s*return\s*\{/.test(l.trim()));
    result.push(returnLine || `    return {};`);

    // Check if there's an inline template
    const tmplStart = lines.findIndex((l) => /template:\s*`/.test(l));
    if (tmplStart >= 0) {
      result.push(`  },`);
      for (let i = tmplStart; i < lines.length; i++) {
        result.push(lines[i]);
        if (i > tmplStart && /`\s*$/.test(lines[i].trim())) break;
      }
      result.push(`}).mount('#app');`);
    } else {
      result.push(`  }`);
      result.push(`}).mount('#app');`);
    }
  } else {
    // Vanilla JS / Angular
    if (/function\s+render\w*\s*\(/.test(js) || /\nrender\w*\([^)]*\);?\s*$/.test(js)) {
      result.push(
        `function render() {`,
        `  app.innerHTML = \``,
        `    <div>`,
        `      <!-- Build your HTML here -->`,
        `    </div>`,
        `  \`;`,
        ``,
        `  // Wire up event listeners after rendering`,
        `}`,
        ``,
        `render();`,
      );
    }
  }

  return result;
}

/**
 * Create a learning skeleton from demoCode JS: keeps the setup structure
 * (imports, state, DOM refs) that matches the Live Demo, but replaces
 * implementation logic with concept-based TODO steps.
 */
function skeletonizeDemo(js: string, concepts: string[], framework: string): string {
  const lines = js.split('\n');

  // Phase 1: Collect setup lines from the top
  const setup: string[] = [];
  let bracketDepth = 0;
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    // Continue consuming lines inside multi-line array/object literals
    if (bracketDepth > 0) {
      setup.push(lines[i]);
      bracketDepth += (t.match(/[[{(]/g) || []).length - (t.match(/[\]})]/g) || []).length;
      continue;
    }
    if (!t || t.startsWith('//')) {
      setup.push(lines[i]);
    } else if (isSkeletonSetup(t)) {
      setup.push(lines[i]);
      // Only track bracket depth for value declarations (const/let/var name = ...)
      // to handle multi-line arrays/objects. Don't track for function declarations
      // or framework constructs (createApp, setup) which would consume entire blocks.
      if (/^(const|let|var)\s+\w+\s*=/.test(t)) {
        bracketDepth += (t.match(/[[{(]/g) || []).length - (t.match(/[\]})]/g) || []).length;
      }
    } else {
      break;
    }
  }
  // Trim trailing empty lines from setup
  while (setup.length > 0 && !setup[setup.length - 1].trim()) setup.pop();

  // Phase 2: Build TODO steps from pattern concepts with specific hints
  const indent = framework === 'vue' ? '    ' : framework === 'react' ? '  ' : '';
  const frameworkName =
    framework === 'react'
      ? 'React'
      : framework === 'vue'
        ? 'Vue'
        : framework === 'angular'
          ? 'Angular'
          : 'Native JavaScript';
  const stepLines: string[] = [''];
  for (let i = 0; i < concepts.length; i++) {
    const hint = getImplementationHint(concepts[i], frameworkName);
    stepLines.push(`${indent}// Step ${i + 1}: ${concepts[i]}`);
    stepLines.push(`${indent}// ${hint}`);
    if (i < concepts.length - 1) stepLines.push('');
  }

  // Phase 2b: Extract regex patterns and key APIs from the demo as bonus hints
  const demoHints = extractDemoHints(js);
  stepLines.push('');
  for (const h of demoHints) {
    stepLines.push(`${indent}// ${h}`);
  }
  const todos = stepLines;

  // Phase 3: Framework-specific teardown (return, mounting, template)
  const teardown = buildSkeletonTeardown(js, lines, framework, indent);

  return [...setup, ...todos, '', ...teardown].join('\n');
}

function generateStarterCode(pattern: UIPattern, framework: string): string {
  // Use hand-crafted starter code when available (preferred)
  const handCrafted = getStarterCode(framework as FrameworkId, pattern.id);
  if (handCrafted) return handCrafted;

  // Fallback: auto-generate skeleton from demoCode
  if (pattern.demoCode?.js?.trim()) {
    return skeletonizeDemo(pattern.demoCode.js, pattern.concepts, framework);
  }

  // Fallback: generate category-based scaffold when no demoCode exists
  const frameworkName = FRAMEWORK_CONFIG[framework as FrameworkId]?.name || framework;
  const componentName = pattern.title
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');

  const steps = pattern.concepts
    .map((c, i) => `  // Step ${i + 1}: ${c}\n  // ${getImplementationHint(c, frameworkName)}`)
    .join('\n\n');

  if (framework === 'react') return reactStarter(pattern, componentName, steps);
  if (framework === 'vue') return vueStarter(pattern, componentName, steps);
  return vanillaStarter(pattern, componentName, steps, framework);
}

function reactStarter(pattern: UIPattern, name: string, steps: string): string {
  const hooks = new Set(['useState']);
  const joined = pattern.concepts.join(' ').toLowerCase();
  if (/memo|computed|derived|strength|filter|calculate/.test(joined)) hooks.add('useMemo');
  if (/effect|lifecycle|async|fetch|timer|mount|load/.test(joined)) hooks.add('useEffect');
  if (/callback|debounce|throttle/.test(joined)) hooks.add('useCallback');
  if (/ref|dom|focus|scroll|element/.test(joined)) hooks.add('useRef');

  let stateLines: string[] = [];
  if (pattern.demoCode?.js) {
    stateLines = pattern.demoCode.js
      .split('\n')
      .filter((l) => /^\s*const\s+\[.*\]\s*=\s*useState/.test(l))
      .map((l) => l.replace(/^\s+/, '  '));
  }
  if (stateLines.length === 0) {
    if (pattern.category === 'interactive') {
      stateLines = [`  const [isOpen, setIsOpen] = useState(false);`];
    } else if (pattern.category === 'data-display') {
      stateLines = [`  const [items, setItems] = useState([]);`];
    } else {
      stateLines = [`  const [value, setValue] = useState('');`];
    }
  }

  let funcName = name;
  if (pattern.demoCode?.js) {
    const match = pattern.demoCode.js.match(/function\s+([A-Z]\w*)/);
    if (match) funcName = match[1];
  }

  // Category-specific JSX for a real rendered preview
  let jsx: string;
  switch (pattern.category) {
    case 'forms-input':
      jsx = `    <form onSubmit={e => { e.preventDefault(); }}>
      <div style={{marginBottom: 16}}>
        <label style={{display:'block', marginBottom: 4, fontSize: 14, color: '#94a3b8'}}>Input</label>
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Type here..."
          style={{width:'100%', padding:'10px 12px', borderRadius: 8, border:'1px solid #334155', background:'#1e293b', color:'#e2e8f0', outline:'none'}}
        />
      </div>
      <button type="submit" style={{width:'100%', padding: 12, borderRadius: 8, border:'none', background:'#3b82f6', color:'white', fontWeight: 600, cursor:'pointer'}}>
        Submit
      </button>
    </form>`;
      break;
    case 'interactive':
      jsx = `    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{padding:'10px 20px', borderRadius: 8, border:'1px solid #334155', background: isOpen ? '#3b82f6' : '#1e293b', color:'white', cursor:'pointer', fontWeight: 600}}
      >
        {isOpen ? 'Close' : 'Open'}
      </button>
      {isOpen && (
        <div style={{marginTop: 12, padding: 16, borderRadius: 8, border:'1px solid #334155', background:'#1e293b'}}>
          <p style={{color:'#e2e8f0'}}>Interactive content here</p>
        </div>
      )}
    </div>`;
      break;
    case 'data-display':
      jsx = `    <div>
      <h3 style={{color:'white', marginBottom: 12}}>${pattern.title}</h3>
      <div style={{display:'grid', gap: 8}}>
        {items.length === 0
          ? <p style={{color:'#64748b', textAlign:'center', padding: 24}}>No items yet</p>
          : items.map((item, i) => (
            <div key={i} style={{padding: 12, borderRadius: 8, border:'1px solid #334155', background:'#1e293b', color:'#e2e8f0'}}>{item}</div>
          ))}
      </div>
    </div>`;
      break;
    default:
      jsx = `    <div>
      <h3 style={{color:'white', marginBottom: 12}}>${pattern.title}</h3>
      <div style={{padding: 16, borderRadius: 8, border:'1px solid #334155', background:'#1e293b', color:'#e2e8f0'}}>
        {/* Build your implementation here */}
      </div>
    </div>`;
  }

  return `const { ${Array.from(hooks).join(', ')} } = React;

function ${funcName}() {
${stateLines.join('\n')}

${steps}

  return (
${jsx}
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<${funcName} />);`;
}

function vueStarter(pattern: UIPattern, name: string, steps: string): string {
  const imports = new Set(['createApp', 'ref']);
  const joined = pattern.concepts.join(' ').toLowerCase();
  if (/computed|derived|filter|calculate|strength/.test(joined)) imports.add('computed');
  if (/reactive|form|object|group/.test(joined)) imports.add('reactive');
  if (/watch|effect|async|lifecycle/.test(joined)) imports.add('watch');

  let stateLines: string[] = [];
  if (pattern.demoCode?.js) {
    stateLines = pattern.demoCode.js
      .split('\n')
      .filter((l) => /^\s*const\s+\w+\s*=\s*(ref|reactive)\(/.test(l))
      .map((l) => '    ' + l.trim());
  }
  if (stateLines.length === 0) {
    if (pattern.category === 'interactive') {
      stateLines = [`    const isOpen = ref(false);`];
    } else if (pattern.category === 'data-display') {
      stateLines = [`    const items = ref([]);`];
    } else {
      stateLines = [`    const value = ref('');`];
    }
  }

  const varNames = stateLines
    .map((l) => l.match(/const\s+(\w+)/)?.[1])
    .filter((v): v is string => !!v);

  const indentedSteps = steps.replace(/^ {2}/gm, '    ');

  // Category-specific Vue templates
  let tmpl: string;
  switch (pattern.category) {
    case 'forms-input':
      varNames.push('handleSubmit');
      tmpl = `    <form @submit.prevent="handleSubmit">
      <div style="margin-bottom: 16px">
        <label style="display:block; margin-bottom: 4px; font-size: 14px; color: #94a3b8">Input</label>
        <input v-model="value" placeholder="Type here..." style="width:100%; padding:10px 12px; border-radius:8px; border:1px solid #334155; background:#1e293b; color:#e2e8f0; outline:none" />
      </div>
      <button type="submit" style="width:100%; padding:12px; border-radius:8px; border:none; background:#3b82f6; color:white; font-weight:600; cursor:pointer">Submit</button>
    </form>`;
      break;
    case 'interactive':
      tmpl = `    <div>
      <button @click="isOpen = !isOpen" :style="{padding:'10px 20px', borderRadius:'8px', border:'1px solid #334155', background: isOpen ? '#3b82f6' : '#1e293b', color:'white', cursor:'pointer', fontWeight:'600'}">
        {{ isOpen ? 'Close' : 'Open' }}
      </button>
      <div v-if="isOpen" style="margin-top:12px; padding:16px; border-radius:8px; border:1px solid #334155; background:#1e293b">
        <p style="color:#e2e8f0">Interactive content here</p>
      </div>
    </div>`;
      break;
    default:
      tmpl = `    <div>
      <h3 style="color:white; margin-bottom:12px">${pattern.title}</h3>
      <div style="padding:16px; border-radius:8px; border:1px solid #334155; background:#1e293b; color:#e2e8f0">
        <!-- Build your implementation here -->
      </div>
    </div>`;
  }

  // Add handler stubs
  let handlers = '';
  if (pattern.category === 'forms-input') {
    handlers = `\n    const handleSubmit = () => {\n      // TODO: Handle form submission\n    };\n`;
  }

  return `const { ${Array.from(imports).join(', ')} } = Vue;

createApp({
  setup() {
${stateLines.join('\n')}
${handlers}
${indentedSteps}

    return { ${varNames.join(', ')} };
  },
  template: \`
${tmpl}
  \`
}).mount('#app');`;
}

function vanillaStarter(
  pattern: UIPattern,
  name: string,
  steps: string,
  framework: string,
): string {
  const prefix = framework === 'angular' ? `// Simulating Angular ${pattern.title}\n` : '';

  let stateLines: string[] = [];
  if (pattern.demoCode?.js) {
    stateLines = pattern.demoCode.js
      .split('\n')
      .filter((l) => {
        const t = l.trim();
        return (
          /^(let|const)\s+\w+\s*=\s*/.test(t) &&
          !t.includes('document.') &&
          !t.includes('function') &&
          !/=\s*\(/.test(t)
        );
      })
      .slice(0, 6)
      .map((l) => l.trim());
  }
  if (stateLines.length === 0) {
    stateLines = [`let value = '';`];
  }

  const unindentedSteps = steps.replace(/^ {2}/gm, '');

  // Category-specific HTML and event wiring for vanilla JS
  let htmlBlock: string;
  let eventBlock: string;
  switch (pattern.category) {
    case 'forms-input':
      htmlBlock = `    <form id="main-form">
      <div style="margin-bottom:16px">
        <label style="display:block;margin-bottom:4px;font-size:14px;color:#94a3b8">Input</label>
        <input id="main-input" placeholder="Type here..." style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid #334155;background:#1e293b;color:#e2e8f0;outline:none" />
      </div>
      <button type="submit" style="width:100%;padding:12px;border-radius:8px;border:none;background:#3b82f6;color:white;font-weight:600;cursor:pointer">Submit</button>
    </form>`;
      eventBlock = `  // Wire up events
  const form = document.getElementById('main-form');
  const input = document.getElementById('main-input');
  input.value = value;
  input.addEventListener('input', e => { value = e.target.value; });
  form.addEventListener('submit', e => {
    e.preventDefault();
    // TODO: Handle form submission
  });`;
      break;
    case 'interactive':
      if (!stateLines.some((l) => /isOpen/.test(l))) {
        stateLines.push(`let isOpen = false;`);
      }
      htmlBlock = `    <div>
      <button id="toggle-btn" style="padding:10px 20px;border-radius:8px;border:1px solid #334155;background:\${isOpen ? '#3b82f6' : '#1e293b'};color:white;cursor:pointer;font-weight:600">
        \${isOpen ? 'Close' : 'Open'}
      </button>
      \${isOpen ? '<div style="margin-top:12px;padding:16px;border-radius:8px;border:1px solid #334155;background:#1e293b"><p style="color:#e2e8f0">Interactive content here</p></div>' : ''}
    </div>`;
      eventBlock = `  // Wire up events
  document.getElementById('toggle-btn').addEventListener('click', () => {
    isOpen = !isOpen;
    render();
  });`;
      break;
    case 'data-display':
      if (!stateLines.some((l) => /items/.test(l))) {
        stateLines.push(`let items = [];`);
      }
      htmlBlock = `    <div>
      <h3 style="color:white;margin-bottom:12px">${pattern.title}</h3>
      <div style="display:grid;gap:8px">
        \${items.length === 0
          ? '<p style="color:#64748b;text-align:center;padding:24px">No items yet</p>'
          : items.map(item => '<div style="padding:12px;border-radius:8px;border:1px solid #334155;background:#1e293b;color:#e2e8f0">' + item + '</div>').join('')}
      </div>
    </div>`;
      eventBlock = `  // TODO: Add event listeners for data actions`;
      break;
    default:
      htmlBlock = `    <div>
      <h3 style="color:white;margin-bottom:12px">${pattern.title}</h3>
      <div style="padding:16px;border-radius:8px;border:1px solid #334155;background:#1e293b;color:#e2e8f0">
        <!-- Build your implementation here -->
      </div>
    </div>`;
      eventBlock = `  // TODO: Add event listeners`;
  }

  return `${prefix}const app = document.getElementById('app');

// State
${stateLines.join('\n')}

${unindentedSteps}

// Render
function render() {
  app.innerHTML = \`
${htmlBlock}
  \`;

${eventBlock}
}

render();`;
}

function patternToExercise(pattern: UIPattern, frameworkName: string): Exercise {
  return {
    id: pattern.id,
    title: pattern.title,
    category: pattern.category as unknown as ExerciseCategory,
    difficulty: pattern.difficulty as unknown as ExerciseDifficulty,
    description: pattern.description,
    explanation:
      pattern.promptDescription ||
      `Build a ${pattern.title} component using ${frameworkName}. Focus on implementing each building block step by step.`,
    instructions: pattern.concepts.map((c, i) => `Step ${i + 1}: Implement ${c}`),
    starterCode: generateStarterCode(pattern, pattern.framework),
    solutionCode: pattern.demoCode
      ? `// HTML:\n${pattern.demoCode.html}\n\n// CSS:\n${pattern.demoCode.css}\n\n// JS:\n${pattern.demoCode.js}`
      : `// No reference solution available yet`,
    testCases: [],
    hints: pattern.concepts.map((c) => `Focus on implementing: ${c}`),
    concepts: pattern.concepts,
  };
}

export default function UIPatternDetail() {
  const params = useParams();
  const framework = params.framework as string;
  const patternId = params.patternId as string;
  const [mounted, setMounted] = useState(false);
  // Initialize with starter code synchronously to avoid race condition with
  // the dynamically-imported CodeEditor mounting before the useEffect fires.
  const [userCode, setUserCode] = useState(() => {
    if (!isValidFramework(framework)) return '';
    const p = getUIPatternById(framework as FrameworkId, patternId);
    return p ? generateStarterCode(p, framework) : '';
  });
  const [editorTab, setEditorTab] = useState<'html' | 'css' | 'js'>('js');
  const [previewKey, setPreviewKey] = useState(0);
  const [hintsOpen, setHintsOpen] = useState(false);
  const [testResults, setTestResults] = useState<Array<{
    name: string;
    id: number;
    pass: boolean;
    error?: string;
  }> | null>(null);
  const [testsRunning, setTestsRunning] = useState(false);
  const previewIframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect -- hydration safety
  }, []);

  // Listen for test results from sandbox iframe
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'pattern-test-results') {
        setTestResults(e.data.results);
        setTestsRunning(false);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  // Reset test results when user code changes
  useEffect(() => {
    setTestResults(null); // eslint-disable-line react-hooks/set-state-in-effect -- Reset tests on code change
  }, [userCode]);

  const handleRunTests = useCallback(() => {
    if (previewIframeRef.current?.contentWindow) {
      setTestsRunning(true);
      setTestResults(null);
      // Give the iframe a moment to finish rendering, then run tests
      previewIframeRef.current.contentWindow.postMessage({ type: 'run-pattern-tests' }, '*');
    }
  }, []);

  const patternTests = useMemo(
    () =>
      isValidFramework(framework)
        ? getPatternTests(framework as FrameworkId, patternId)
        : undefined,
    [framework, patternId],
  );

  // Re-initialize starter code when navigating between patterns.
  // The initial value is set synchronously in useState above;
  // this effect handles subsequent pattern/framework changes.
  const starterCodeKey = `${framework}:${patternId}`;
  const prevStarterKeyRef = useRef(starterCodeKey);
  useEffect(() => {
    if (prevStarterKeyRef.current === starterCodeKey) return;
    prevStarterKeyRef.current = starterCodeKey;
    if (!isValidFramework(framework)) return;
    const p = getUIPatternById(framework as FrameworkId, patternId);
    if (p) {
      setUserCode(generateStarterCode(p, framework)); // eslint-disable-line react-hooks/set-state-in-effect -- Reset code on pattern navigation
    }
  }, [starterCodeKey, framework, patternId]);

  // Build a preview document from the user's code + pattern HTML/CSS
  // Must be before early returns to satisfy rules of hooks
  const patternForPreview = useMemo(
    () =>
      isValidFramework(framework) ? getUIPatternById(framework as FrameworkId, patternId) : null,
    [framework, patternId],
  );

  const userPreviewSrcdoc = useMemo(() => {
    if (!userCode.trim()) return '';

    const frameworkScripts: Record<string, string> = {
      'native-js': '',
      react: `
        <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>`,
      vue: `<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>`,
      angular: `<script src="https://unpkg.com/zone.js"></script>`,
    };

    const scriptType = framework === 'react' ? 'text/babel' : 'text/javascript';
    const scripts = frameworkScripts[framework] || '';
    const patternHtml = patternForPreview?.demoCode?.html || '';
    // Always include #app div for user code to mount into
    const previewHtml = patternHtml.includes('id="app"')
      ? patternHtml
      : `${patternHtml}\n<div id="app"></div>`;
    const previewCss = patternForPreview?.demoCode?.css || '';

    // Use string concatenation for userCode to avoid breaking the template
    // literal if the user's code contains backticks or ${...} expressions
    const head = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 16px;
      background: #0f172a;
      color: #e2e8f0;
      line-height: 1.6;
    }
    input, select, textarea, button { font-family: inherit; font-size: inherit; }
    ${previewCss}
  </style>
  ${scripts}
</head>
<body>
  ${previewHtml}
  <script type="${scriptType}">
try {
`;
    // Build test runner script if test cases exist for this pattern
    const tests = isValidFramework(framework)
      ? getPatternTests(framework as FrameworkId, patternId)
      : undefined;
    const testRunnerHtml = tests?.length
      ? `\n  <script type="text/javascript">\n${buildTestRunnerScript(tests)}\nwindow.addEventListener('message', function(e) { if (e.data && e.data.type === 'run-pattern-tests' && window.__runTests) { setTimeout(window.__runTests, 300); } });\n  </script>`
      : '';

    const tail = `
} catch(e) { document.body.innerHTML = '<pre style="color:#ef4444;padding:16px;">' + e.message + '</pre>'; }
  </script>${testRunnerHtml}
</body>
</html>`;
    return head + userCode + tail;
  }, [userCode, framework, patternForPreview, patternId]);

  // Debounce iframe remount so it doesn't flicker on every keystroke
  useEffect(() => {
    if (!userPreviewSrcdoc) return;
    const timer = setTimeout(() => setPreviewKey((k) => k + 1), 400);
    return () => clearTimeout(timer);
  }, [userPreviewSrcdoc]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-pulse text-zinc-500">Loading pattern...</div>
      </div>
    );
  }

  if (!isValidFramework(framework)) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
          <h1 className="text-2xl font-bold mb-4">Framework Not Found</h1>
          <Link
            href="/frontend-drills"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Back to Frontend Drills
          </Link>
        </div>
      </div>
    );
  }

  const frameworkConfig = FRAMEWORK_CONFIG[framework];
  const pattern = getUIPatternById(framework, patternId);

  const patterns = getUIPatterns(framework);
  const patternIndex = patterns.findIndex((p) => p.id === patternId);
  const prevPattern = patternIndex > 0 ? patterns[patternIndex - 1] : null;
  const nextPattern = patternIndex < patterns.length - 1 ? patterns[patternIndex + 1] : null;

  if (!pattern) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
          <h1 className="text-2xl font-bold mb-4">Pattern Not Found</h1>
          <p className="text-zinc-400 mb-6">
            The pattern you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>
          <Link
            href={`/frontend-drills/${framework}/ui-patterns`}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to UI Patterns
          </Link>
        </div>
      </div>
    );
  }

  const diffConfig = UI_PATTERN_DIFFICULTY_CONFIG[pattern.difficulty];
  const categoryConfig = UI_PATTERN_CATEGORIES[pattern.category];
  const editorLanguage =
    framework === 'angular' || framework === 'react' ? 'typescript' : 'javascript';
  // React needs 'typescriptreact' so Monaco understands JSX syntax
  const monacoLanguage = framework === 'react' ? 'typescriptreact' : undefined;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumbs and Exit Button */}
        <div className="flex items-center justify-between mb-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Frontend Drills', href: '/frontend-drills' },
              { label: frameworkConfig.name, href: `/frontend-drills/${framework}` },
              { label: 'UI Patterns', href: `/frontend-drills/${framework}/ui-patterns` },
              { label: pattern.title },
            ]}
            className="text-sm"
          />
          <Link
            href={`/frontend-drills/${framework}/ui-patterns`}
            className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/50 flex-shrink-0"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              role="img"
              aria-label="Exit"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-sm font-medium">Exit</span>
          </Link>
        </div>

        {/* Compact Hero Section */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {pattern.title}
            </h1>
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full ${diffConfig.bgColor} ${diffConfig.color} whitespace-nowrap`}
            >
              {diffConfig.name}
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-700/50 text-zinc-300 whitespace-nowrap">
              {categoryConfig.name}
            </span>
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full ${frameworkConfig.bgColor} ${frameworkConfig.color} whitespace-nowrap`}
            >
              {frameworkConfig.name}
            </span>
          </div>
          <p className="text-zinc-400 text-base leading-relaxed max-w-3xl">{pattern.description}</p>
        </div>

        {/* Building Blocks */}
        <div className="bg-zinc-800/30 rounded-2xl p-5 border border-zinc-700/30 backdrop-blur-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-white">Building Blocks</h2>
              <p className="text-xs text-zinc-500">
                {pattern.concepts.length} {pattern.concepts.length === 1 ? 'step' : 'steps'} to
                master
              </p>
            </div>
          </div>

          <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin scrollbar-track-zinc-800/50 scrollbar-thumb-zinc-700/50">
            {pattern.concepts.map((concept, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-zinc-900/50 rounded-lg p-3 border border-zinc-700/30 hover:border-zinc-600/50 transition-all group"
              >
                <div
                  className={`w-7 h-7 rounded-lg ${frameworkConfig.bgColor} ${frameworkConfig.color} flex items-center justify-center font-bold text-xs flex-shrink-0`}
                >
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm group-hover:text-blue-300 transition-colors">
                    {concept}
                  </h3>
                  <p className="text-zinc-500 text-xs leading-relaxed mt-0.5">
                    {getImplementationHint(concept, frameworkConfig.name)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 1: Code Editor (left) + Your Preview (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          {/* Code Editor Section - Takes 3 columns (60%) */}
          <div className="lg:col-span-3">
            <div className="bg-zinc-800/30 rounded-2xl p-5 border border-zinc-700/30 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                  <svg
                    className="w-5 h-5 text-amber-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-white">Your Implementation</h2>
                  <p className="text-xs text-zinc-500">Write your JS — HTML & CSS are provided</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setUserCode(generateStarterCode(pattern, framework));
                    setEditorTab('js');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-700/50 transition-colors cursor-pointer"
                  title="Reset to starter code"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
                    />
                  </svg>
                  Reset
                </button>
              </div>

              {/* Expandable Hints */}
              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => setHintsOpen((prev) => !prev)}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg bg-zinc-900/50 border border-zinc-700/30 hover:border-zinc-600/50 transition-all cursor-pointer group"
                >
                  <svg
                    className={`w-3.5 h-3.5 text-amber-400 transition-transform duration-200 ${hintsOpen ? 'rotate-90' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                  <svg
                    className="w-4 h-4 text-amber-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                    />
                  </svg>
                  <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                    Hints
                  </span>
                  <span className="text-xs text-zinc-500">
                    ({pattern.concepts.length} {pattern.concepts.length === 1 ? 'hint' : 'hints'})
                  </span>
                </button>
                {hintsOpen && (
                  <div className="mt-2 space-y-2 pl-2 border-l-2 border-amber-500/30 ml-[7px]">
                    {pattern.concepts.map((concept, index) => (
                      <div key={index} className="pl-3 py-1.5">
                        <p className="text-xs font-medium text-amber-300/90">
                          Step {index + 1}: {concept}
                        </p>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          {getImplementationHint(concept, frameworkConfig.name)}
                        </p>
                      </div>
                    ))}
                    {pattern.demoCode?.js &&
                      extractDemoHints(pattern.demoCode.js).map((hint, i) => (
                        <div key={`demo-${i}`} className="pl-3 py-1.5">
                          <p className="text-xs text-amber-400/70 font-mono">{hint}</p>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Editor Tabs */}
              {pattern.demoCode && (
                <div className="flex items-center gap-1 mb-3 border-b border-zinc-700/30 pb-2">
                  {(['html', 'css', 'js'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setEditorTab(tab)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                        editorTab === tab
                          ? 'bg-zinc-700 text-white'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                      }`}
                    >
                      {tab === 'js'
                        ? framework === 'react'
                          ? 'JSX'
                          : framework === 'vue'
                            ? 'Vue'
                            : framework === 'angular'
                              ? 'TS'
                              : 'JS'
                        : tab.toUpperCase()}
                      {tab !== 'js' && (
                        <span className="ml-1.5 text-[10px] text-zinc-500">(read-only)</span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Tab Content */}
              <div className="flex-1 min-h-0">
                {editorTab === 'js' ? (
                  <CodeEditor
                    code={userCode}
                    onChange={setUserCode}
                    language={editorLanguage}
                    height={320}
                    autoFocus={false}
                    monacoLanguageOverride={monacoLanguage}
                  />
                ) : (
                  <CodeDisplay
                    code={
                      editorTab === 'html'
                        ? pattern.demoCode?.html || '<!-- No HTML -->'
                        : formatCSSForDisplay(pattern.demoCode?.css || '/* No CSS */')
                    }
                    language="javascript"
                    monacoLanguageOverride={editorTab === 'html' ? 'html' : 'css'}
                    height={320}
                    maxHeight={320}
                    lineNumbers={true}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Your Preview - directly to the right, stretches to match editor height */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-800/30 rounded-2xl p-5 border border-zinc-700/30 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-sm font-medium text-zinc-300">Your Preview</span>
              </div>
              {userPreviewSrcdoc ? (
                <div className="rounded-lg overflow-hidden border border-zinc-700/50 bg-zinc-950/50 flex-1">
                  <iframe
                    ref={previewIframeRef}
                    key={previewKey}
                    srcDoc={userPreviewSrcdoc}
                    sandbox="allow-scripts"
                    title="Your implementation preview"
                    className="w-full h-full border-0 bg-zinc-950"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center flex-1 text-zinc-600 text-xs rounded-lg border border-dashed border-zinc-700/40">
                  Start typing code to see your preview here
                </div>
              )}

              {/* Test Runner */}
              {patternTests?.length ? (
                <div className="mt-3">
                  {/* Test checklist – always visible so users know what will be tested */}
                  <div className="mb-2 rounded-lg bg-zinc-900/60 border border-zinc-700/30 p-3 space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-zinc-400">
                        {testResults
                          ? `${testResults.filter((r) => r.pass).length}/${testResults.length} passing`
                          : `${patternTests.length} ${patternTests.length === 1 ? 'test' : 'tests'}`}
                      </span>
                      {testResults?.every((r) => r.pass) && (
                        <span className="text-xs text-emerald-400 font-medium">
                          All tests pass!
                        </span>
                      )}
                    </div>
                    {testResults
                      ? testResults.map((r) => (
                          <div
                            key={r.id}
                            className={`flex items-start gap-2 text-xs py-1 ${r.pass ? 'text-emerald-400' : 'text-red-400'}`}
                          >
                            <span className="mt-0.5 flex-shrink-0">
                              {r.pass ? '\u2713' : '\u2717'}
                            </span>
                            <span>
                              {r.name}
                              {r.error && <span className="text-red-500/70 ml-1">({r.error})</span>}
                            </span>
                          </div>
                        ))
                      : patternTests.map((t, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-xs py-1 text-zinc-500"
                          >
                            <span className="mt-0.5 flex-shrink-0">○</span>
                            <span>{t.name}</span>
                          </div>
                        ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleRunTests}
                    disabled={testsRunning || !userPreviewSrcdoc}
                    className="w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {testsRunning ? 'Running Tests...' : 'Run Tests'}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Row 2: AI Tutor (left) + Live Demo & Building Blocks (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8 lg:items-start">
          {/* AI Tutor Section - Left (60%) */}
          <div className="lg:col-span-3">
            <ExerciseTutor
              exercise={patternToExercise(pattern, frameworkConfig.name)}
              hasVisualization={!!pattern.demoCode}
              userCode={userCode}
              languageConfig={{
                color: frameworkConfig.color,
                bgColor: frameworkConfig.bgColor,
                borderColor: frameworkConfig.borderColor,
              }}
            />
          </div>

          {/* Right Column - Live Demo + Building Blocks */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Live Demo */}
            {pattern.demoCode ? (
              <div className="bg-gradient-to-br from-emerald-950/40 via-zinc-900/60 to-zinc-900/80 rounded-3xl p-1.5 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
                <div className="bg-zinc-900/90 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-white">Live Demo</h2>
                      <p className="text-xs text-emerald-400/80">Reference answer</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                      Running
                    </span>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-zinc-700/50 bg-zinc-950/50">
                    <LivePreview
                      html={pattern.demoCode.html}
                      css={pattern.demoCode.css}
                      js={pattern.demoCode.js}
                      framework={framework as FrameworkId}
                      height={250}
                      showCodeTabs={['js']}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-800/20 rounded-3xl p-8 border-2 border-dashed border-zinc-700/40 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-xl bg-zinc-800/50 flex items-center justify-center mb-4 rotate-3 shadow-xl">
                  <svg
                    className="w-7 h-7 text-zinc-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                    />
                  </svg>
                </div>
                <p className="text-zinc-500 text-sm font-medium mb-1">Live demo coming soon</p>
                <p className="text-zinc-600 text-xs max-w-xs">
                  Use the AI tutor to get guidance on building this pattern
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer: Navigation + External Link */}
        <div className="flex flex-col gap-4 pt-6 border-t border-zinc-800/50">
          {/* Prev / Next Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {prevPattern ? (
                <Link
                  href={`/frontend-drills/${framework}/ui-patterns/${prevPattern.id}`}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-all ${frameworkConfig.borderColor} ${frameworkConfig.color} hover:bg-zinc-800/50`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                  <span className="hidden sm:inline truncate max-w-[200px]">
                    {prevPattern.title}
                  </span>
                  <span className="sm:hidden">Previous</span>
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border border-zinc-700/30 text-zinc-600 cursor-not-allowed">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                  Previous
                </span>
              )}
            </div>

            <div className="flex flex-col items-center gap-1 px-4">
              <span className="text-xs text-zinc-500 font-medium">
                {patternIndex + 1} of {patterns.length}
              </span>
              <Link
                href={`/frontend-drills/${framework}/ui-patterns`}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                All Patterns
              </Link>
            </div>

            <div className="flex-1 flex justify-end">
              {nextPattern ? (
                <Link
                  href={`/frontend-drills/${framework}/ui-patterns/${nextPattern.id}`}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-all ${frameworkConfig.borderColor} ${frameworkConfig.color} hover:bg-zinc-800/50`}
                >
                  <span className="hidden sm:inline truncate max-w-[200px]">
                    {nextPattern.title}
                  </span>
                  <span className="sm:hidden">Next</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border border-zinc-700/30 text-zinc-600 cursor-not-allowed">
                  Next
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              )}
            </div>
          </div>

          {/* External Reference Link */}
          {pattern.externalUrl && (
            <div className="flex justify-center">
              <a
                href={pattern.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-blue-400 transition-colors group"
              >
                <svg
                  className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
                View reference implementation
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
