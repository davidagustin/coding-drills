import type { CheatsheetData } from '../types';

export const nativeJsCheatsheet: CheatsheetData = {
  framework: 'native-js',
  title: 'Native JavaScript Cheatsheet',
  lastUpdated: '2026-02',
  sections: [
    // ────────────────────────────────────────────────────────────
    // SECTION 1: OVERVIEW
    // ────────────────────────────────────────────────────────────
    {
      id: 'overview',
      icon: '\u{1F4CB}',
      title: 'Overview',
      description: 'The web platform without frameworks',
      content: [
        {
          type: 'subheading',
          text: 'Philosophy',
        },
        {
          type: 'text',
          content:
            'Native JavaScript (vanilla JS) means building directly on the web platform using only the APIs the browser provides. There are no abstractions, no virtual DOM, no compiler step required. You get maximum control, zero dependencies, and a deep understanding of how the web actually works. Every framework you will ever use is built on top of these primitives.',
        },
        {
          type: 'list',
          style: 'bullet',
          items: [
            'Understand the platform first -- frameworks come and go, the web platform is forever',
            'Zero dependencies means zero supply-chain risk and zero kilobytes of library code shipped',
            'Maximum control over rendering, event handling, and performance optimization',
            'No build step required -- a single HTML file with a <script type="module"> tag is a valid app',
            'Debugging is straightforward -- no framework-specific devtools or source-map layers needed',
          ],
        },
        {
          type: 'subheading',
          text: 'When Vanilla JS Is the Right Choice',
        },
        {
          type: 'list',
          style: 'bullet',
          items: [
            'Small projects, landing pages, and marketing sites where bundle size matters',
            'Learning and teaching -- understand the fundamentals before adding abstractions',
            'Performance-critical widgets (editors, canvases, animations) where framework overhead is measurable',
            'Web Components and design systems intended to be framework-agnostic',
            'Embedded widgets or third-party scripts that must not conflict with a host page',
            'Server-rendered pages that need light interactivity (progressive enhancement)',
            'Micro-frontends that must stay small and dependency-free',
          ],
        },
        {
          type: 'subheading',
          text: 'Modern JS Landscape (ES2023+)',
        },
        {
          type: 'text',
          content:
            'Modern JavaScript has closed the gap that once made frameworks essential. ES modules provide code organization, the Fetch API handles networking, the Proxy object enables reactivity, Web Components give you encapsulated custom elements, and CSS custom properties handle theming. Combined with modern tooling like Vite (optional for dev ergonomics), vanilla JS is a first-class choice for many projects.',
        },
        {
          type: 'list',
          style: 'bullet',
          items: [
            'ES modules (import/export) work natively in all modern browsers',
            'Top-level await, optional chaining (?.), nullish coalescing (??), and Array.at() are all baseline',
            'structuredClone() for deep copying, Object.groupBy() for grouping, Set methods for set operations',
            'Import maps let you use bare specifiers without a bundler: <script type="importmap">',
            'No build step is possible for development and even production with HTTP/2 and native modules',
          ],
        },
        {
          type: 'subheading',
          text: 'Key Terminology',
        },
        {
          type: 'table',
          headers: ['Term', 'Definition'],
          rows: [
            [
              'DOM (Document Object Model)',
              'Tree-structured API representing the HTML document as programmable nodes',
            ],
            [
              'BOM (Browser Object Model)',
              'Browser APIs outside the document: window, navigator, location, history, screen',
            ],
            [
              'Event Loop',
              'The mechanism that processes the call stack, microtask queue, and macrotask queue',
            ],
            [
              'Shadow DOM',
              'Encapsulated DOM tree attached to a custom element, isolating styles and markup',
            ],
            [
              'Web Components',
              'Suite of APIs (Custom Elements, Shadow DOM, Templates, Slots) for reusable elements',
            ],
            [
              'Service Worker',
              'Background script that intercepts network requests, enabling offline support and caching',
            ],
            [
              'Web Worker',
              'Background thread for CPU-intensive work without blocking the main thread',
            ],
            [
              'ES Module',
              'Native JavaScript module system using import/export with static analysis support',
            ],
            [
              'Microtask',
              'High-priority async callback (Promises, queueMicrotask) that runs before the next render',
            ],
            [
              'Macrotask',
              'Lower-priority async callback (setTimeout, setInterval, I/O) that runs after microtasks',
            ],
            [
              'CORS',
              'Cross-Origin Resource Sharing -- browser security policy for cross-domain requests',
            ],
            [
              'Progressive Enhancement',
              'Strategy of building on a working HTML baseline, layering JS on top',
            ],
          ],
        },
        {
          type: 'tip',
          content:
            'Understanding native JS makes you better at every framework. When you know what the browser provides natively, you can make informed decisions about when a framework adds real value versus unnecessary complexity.',
        },
      ],
    },

    // ────────────────────────────────────────────────────────────
    // SECTION 2: CORE CONCEPTS
    // ────────────────────────────────────────────────────────────
    {
      id: 'core-concepts',
      icon: '\u{1F9E0}',
      title: 'Core Concepts',
      description: 'DOM manipulation, selectors, events, forms, and CSS',
      content: [
        // --- DOM Tree & Node Types ---
        {
          type: 'subheading',
          text: 'DOM Tree & Node Types',
        },
        {
          type: 'text',
          content:
            'The DOM is a tree of nodes. Every piece of the document is a node -- elements, text, comments, even the document itself. Understanding node types is fundamental to traversal and manipulation.',
        },
        {
          type: 'table',
          headers: ['Node Type', 'nodeType', 'Example', 'Notes'],
          rows: [
            ['Element', '1', '<div>, <p>, <span>', 'Most common -- what querySelector returns'],
            [
              'Text',
              '3',
              'The text inside an element',
              'Created automatically; use textContent to read',
            ],
            ['Comment', '8', '<!-- comment -->', 'Accessible via childNodes, skipped by children'],
            ['Document', '9', 'document', 'The root node; entry point for all queries'],
            [
              'DocumentFragment',
              '11',
              'document.createDocumentFragment()',
              'Lightweight container for batch DOM operations',
            ],
            ['DocumentType', '10', '<!DOCTYPE html>', 'The doctype declaration node'],
          ],
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Working with DocumentFragment for Batch Inserts',
          code: `// Build many nodes off-DOM, then insert once (single reflow)
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = \`Item \${i + 1}\`;
  fragment.appendChild(li);
}

document.querySelector('ul').appendChild(fragment);`,
        },

        // --- DOM Selection Deep Dive ---
        {
          type: 'subheading',
          text: 'DOM Selection Deep Dive',
        },
        {
          type: 'table',
          headers: ['Method', 'Returns', 'Live?', 'Use When'],
          rows: [
            [
              'querySelector(sel)',
              'Element | null',
              'No',
              'Finding a single element by any CSS selector',
            ],
            [
              'querySelectorAll(sel)',
              'NodeList',
              'No',
              'Finding multiple elements by CSS selector',
            ],
            ['getElementById(id)', 'Element | null', 'No', 'Fast lookup by id attribute'],
            [
              'getElementsByClassName(cls)',
              'HTMLCollection',
              'Yes',
              'Need a live collection that auto-updates',
            ],
            [
              'getElementsByTagName(tag)',
              'HTMLCollection',
              'Yes',
              'Need a live collection of a specific tag',
            ],
            ['closest(sel)', 'Element | null', 'No', 'Walking UP the tree to find an ancestor'],
            ['matches(sel)', 'boolean', 'N/A', 'Testing if an element matches a selector'],
            ['contains(node)', 'boolean', 'N/A', 'Checking if a node is a descendant'],
          ],
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Selection Methods',
          code: `// querySelector -- first match only
const header = document.querySelector('h1');
const activeCard = document.querySelector('.card.active');
const dataEl = document.querySelector('[data-id="42"]');

// querySelectorAll -- all matches (static NodeList)
const items = document.querySelectorAll('li.item');
items.forEach(item => item.classList.add('processed'));

// getElementById -- fastest single-element lookup
const main = document.getElementById('main-content');

// closest -- find nearest ancestor matching selector
const form = button.closest('form');

// matches -- test an element against a selector
if (event.target.matches('.delete-btn')) {
  handleDelete(event.target);
}

// contains -- check parent-child relationship
if (dropdown.contains(event.target)) {
  // click was inside the dropdown
}`,
        },
        {
          type: 'warning',
          content:
            'getElementsByClassName and getElementsByTagName return LIVE HTMLCollections. Modifying the DOM during iteration can cause elements to be skipped or counted twice. Convert to an array first with Array.from() or use querySelectorAll which returns a static NodeList.',
        },

        // --- DOM Manipulation ---
        {
          type: 'subheading',
          text: 'DOM Manipulation',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Creating & Inserting Elements',
          code: `// Create
const div = document.createElement('div');
div.textContent = 'Hello World';
div.classList.add('card', 'active');
div.setAttribute('data-id', '42');

// appendChild -- add as last child
parent.appendChild(div);

// insertBefore -- add before a reference node
parent.insertBefore(div, referenceNode);

// insertAdjacentHTML -- parse HTML string at position
element.insertAdjacentHTML('beforebegin', '<p>Before</p>');
element.insertAdjacentHTML('afterbegin', '<p>First child</p>');
element.insertAdjacentHTML('beforeend', '<p>Last child</p>');
element.insertAdjacentHTML('afterend', '<p>After</p>');

// insertAdjacentElement -- insert an existing element
element.insertAdjacentElement('beforebegin', otherElement);

// insertAdjacentText -- insert text without parsing HTML
element.insertAdjacentText('beforeend', 'Plain text');

// Modern: append/prepend accept multiple nodes and strings
parent.append(el1, el2, 'text');
parent.prepend(el1, 'text');

// Replace
parent.replaceChild(newChild, oldChild);
oldChild.replaceWith(newChild);  // modern

// Remove
element.remove();                         // modern
parent.removeChild(element);              // classic

// Clone
const shallow = element.cloneNode(false);
const deep = element.cloneNode(true);`,
        },
        {
          type: 'subheading',
          text: 'textContent vs innerHTML vs innerText',
        },
        {
          type: 'table',
          headers: ['Property', 'Parses HTML?', 'Performance', 'Security', 'Use When'],
          rows: [
            ['textContent', 'No', 'Fast', 'Safe (no XSS)', 'Setting/reading plain text content'],
            [
              'innerHTML',
              'Yes',
              'Slower (parsing)',
              'XSS risk with user input',
              'Setting HTML markup from trusted sources',
            ],
            [
              'innerText',
              'No',
              'Slowest (triggers reflow)',
              'Safe',
              'Reading visible text (respects CSS display)',
            ],
          ],
        },
        {
          type: 'warning',
          content:
            'Never use innerHTML with unsanitized user input -- it creates XSS vulnerabilities. Use textContent for plain text, or the DOM API (createElement/append) for structured content. If you must use innerHTML, sanitize with DOMPurify or the Sanitizer API.',
        },

        // --- DOM Traversal ---
        {
          type: 'subheading',
          text: 'DOM Traversal',
        },
        {
          type: 'table',
          headers: ['Property', 'Returns', 'Includes Text/Comment Nodes?'],
          rows: [
            ['parentElement', 'Element | null', 'No -- element parent only'],
            ['parentNode', 'Node | null', 'Yes -- could be Document'],
            ['children', 'HTMLCollection', 'No -- elements only'],
            ['childNodes', 'NodeList', 'Yes -- all node types'],
            ['firstElementChild', 'Element | null', 'No'],
            ['firstChild', 'Node | null', 'Yes'],
            ['lastElementChild', 'Element | null', 'No'],
            ['lastChild', 'Node | null', 'Yes'],
            ['nextElementSibling', 'Element | null', 'No'],
            ['nextSibling', 'Node | null', 'Yes'],
            ['previousElementSibling', 'Element | null', 'No'],
            ['previousSibling', 'Node | null', 'Yes'],
          ],
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Traversal Examples',
          code: `const list = document.querySelector('ul');

// Iterate direct element children
for (const child of list.children) {
  console.log(child.tagName); // LI, LI, LI ...
}

// Walk up to find a specific ancestor
let current = deeplyNestedElement;
while (current && !current.classList.contains('root')) {
  current = current.parentElement;
}

// Walk siblings
let sibling = firstItem.nextElementSibling;
while (sibling) {
  sibling.classList.add('after-first');
  sibling = sibling.nextElementSibling;
}`,
        },
        {
          type: 'tip',
          content:
            'Prefer the "Element" variants (children, firstElementChild, nextElementSibling) over the "Node" variants (childNodes, firstChild, nextSibling). The Node variants include whitespace text nodes, which are almost never what you want.',
        },

        // --- CSS Manipulation ---
        {
          type: 'subheading',
          text: 'CSS Manipulation',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Working with CSS from JavaScript',
          code: `// classList -- add, remove, toggle, contains, replace
element.classList.add('active', 'visible');
element.classList.remove('hidden');
element.classList.toggle('expanded');       // add or remove
element.classList.toggle('dark', isDark);   // force add/remove
element.classList.replace('old', 'new');
const isActive = element.classList.contains('active');

// Inline styles (use sparingly -- prefer classes)
element.style.color = 'blue';
element.style.backgroundColor = 'white';
element.style.setProperty('--accent', '#3b82f6');
element.style.removeProperty('color');
const color = element.style.color; // only reads inline

// Read computed styles (all styles, not just inline)
const computed = getComputedStyle(element);
const fontSize = computed.fontSize;     // e.g. '16px'
const display = computed.display;       // e.g. 'flex'

// CSS Custom Properties (CSS Variables)
document.documentElement.style.setProperty('--primary', '#0070f3');
const primary = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary');

// Media query matching
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
if (prefersDark.matches) {
  document.body.classList.add('dark');
}
prefersDark.addEventListener('change', (e) => {
  document.body.classList.toggle('dark', e.matches);
});`,
        },

        // --- Attribute Handling ---
        {
          type: 'subheading',
          text: 'Attribute Handling & data-* Attributes',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Attributes and Dataset',
          code: `// Generic attribute methods
element.setAttribute('aria-label', 'Close dialog');
const role = element.getAttribute('role');
element.removeAttribute('hidden');
const hasId = element.hasAttribute('id');

// data-* attributes via dataset
// <div data-user-id="42" data-role="admin">
element.dataset.userId;     // '42' (camelCase mapping)
element.dataset.role;       // 'admin'
element.dataset.newProp = 'value'; // sets data-new-prop="value"
delete element.dataset.role;       // removes data-role

// Boolean attributes
element.disabled = true;    // <input disabled>
element.hidden = false;     // removes hidden attribute
element.required = true;`,
        },

        // --- Event System Deep Dive ---
        {
          type: 'subheading',
          text: 'Event System Deep Dive',
        },
        {
          type: 'text',
          content:
            'DOM events propagate in three phases: capture (top-down from document to target), target (the element itself), and bubble (bottom-up from target to document). Most handlers use the bubble phase by default. Understanding propagation is key to event delegation and preventing unintended behavior.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Event Handling',
          code: `// Basic listener
button.addEventListener('click', (e) => {
  console.log('Clicked!', e.target);
});

// Remove listener (must use same function reference)
const handler = () => console.log('once');
button.addEventListener('click', handler);
button.removeEventListener('click', handler);

// Event options object
element.addEventListener('scroll', handler, {
  passive: true,   // promise not to call preventDefault (scroll perf)
  once: true,      // auto-remove after first invocation
  capture: true,   // listen during capture phase
  signal: controller.signal,  // abort to remove listener
});

// AbortController for removing listeners
const controller = new AbortController();
element.addEventListener('click', handler, { signal: controller.signal });
// later: remove the listener
controller.abort();

// Propagation control
event.stopPropagation();          // stop bubbling/capturing
event.stopImmediatePropagation(); // stop + prevent other same-element listeners
event.preventDefault();           // cancel default browser behavior

// Custom events
const myEvent = new CustomEvent('user:login', {
  detail: { userId: 42, name: 'Alice' },
  bubbles: true,
  composed: true,  // crosses Shadow DOM boundaries
});
element.dispatchEvent(myEvent);

// Listen for custom event
document.addEventListener('user:login', (e) => {
  console.log('Logged in:', e.detail.name);
});`,
        },
        {
          type: 'subheading',
          text: 'Event Types Reference',
        },
        {
          type: 'table',
          headers: ['Category', 'Events', 'Notes'],
          rows: [
            [
              'Mouse',
              'click, dblclick, mousedown, mouseup, mousemove, mouseenter, mouseleave, mouseover, mouseout, contextmenu',
              'mouseenter/mouseleave do NOT bubble',
            ],
            [
              'Keyboard',
              'keydown, keyup (keypress is deprecated)',
              'Use event.key ("Enter", "Escape") not event.keyCode',
            ],
            [
              'Touch',
              'touchstart, touchmove, touchend, touchcancel',
              'Use pointer events for unified mouse+touch handling',
            ],
            [
              'Pointer',
              'pointerdown, pointermove, pointerup, pointerenter, pointerleave, pointercancel',
              'Unified API for mouse, touch, pen',
            ],
            [
              'Focus',
              'focus, blur, focusin, focusout',
              'focus/blur do NOT bubble; focusin/focusout do',
            ],
            [
              'Form',
              'submit, reset, change, input, invalid',
              'input fires on every keystroke; change fires on commit',
            ],
            [
              'Drag',
              'dragstart, drag, dragenter, dragover, dragleave, drop, dragend',
              'Must call preventDefault on dragover to allow drop',
            ],
            ['Clipboard', 'copy, cut, paste', 'Access data via event.clipboardData'],
            ['Scroll', 'scroll, scrollend', 'Use passive: true for performance'],
            ['Resize', 'resize', 'Fires on window; use ResizeObserver for elements'],
            [
              'Load',
              'load, DOMContentLoaded, beforeunload, unload',
              'DOMContentLoaded fires before images/styles load',
            ],
            [
              'Animation',
              'animationstart, animationend, animationiteration, transitionend, transitionstart',
              'For tracking CSS animations/transitions',
            ],
          ],
        },

        // --- Forms ---
        {
          type: 'subheading',
          text: 'Forms & Validation',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Form Handling',
          code: `// Access form elements
const form = document.querySelector('#signup-form');
const email = form.elements.email;          // by name attribute
const password = form.elements['password']; // bracket notation
const allInputs = form.elements;            // HTMLFormControlsCollection

// FormData -- extract all values at once
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const email = data.get('email');
  const entries = Object.fromEntries(data); // plain object
  console.log(entries);
  // Send to server:
  fetch('/api/signup', { method: 'POST', body: data });
});

// Constraint Validation API
const input = document.querySelector('#email');
input.checkValidity();    // returns boolean, fires 'invalid' event
input.reportValidity();   // shows browser tooltip if invalid
input.setCustomValidity('Email already taken'); // custom message
input.setCustomValidity(''); // clear custom error

// Validity state object
const v = input.validity;
v.valueMissing;    // required but empty
v.typeMismatch;    // wrong type (e.g. email without @)
v.patternMismatch; // fails pattern attribute regex
v.tooLong;         // exceeds maxlength
v.tooShort;        // below minlength
v.rangeUnderflow;  // below min
v.rangeOverflow;   // above max
v.stepMismatch;    // does not match step
v.valid;           // true if all constraints pass

// Real-time validation feedback
input.addEventListener('input', () => {
  if (input.validity.typeMismatch) {
    input.setCustomValidity('Please enter a valid email');
  } else {
    input.setCustomValidity('');
  }
});`,
        },
        {
          type: 'warning',
          content:
            'Avoid inline event handlers (onclick="..."). Use addEventListener for separation of concerns, the ability to attach multiple handlers, and proper access to event options (capture, passive, once, signal).',
        },
      ],
    },

    // ────────────────────────────────────────────────────────────
    // SECTION 3: KEY APIS
    // ────────────────────────────────────────────────────────────
    {
      id: 'key-apis',
      icon: '\u{1F511}',
      title: 'Key APIs',
      description: 'Essential browser APIs for building applications',
      content: [
        {
          type: 'subheading',
          text: 'Core Browser APIs',
        },
        {
          type: 'table',
          headers: ['API', 'Purpose', 'Example'],
          rows: [
            [
              'querySelector()',
              'Find one element by CSS selector',
              'document.querySelector(".card")',
            ],
            ['querySelectorAll()', 'Find all matching elements', 'document.querySelectorAll("li")'],
            ['fetch()', 'HTTP requests (Promise-based)', 'fetch(url).then(r => r.json())'],
            [
              'localStorage',
              'Persistent key-value store (~5MB)',
              'localStorage.setItem("key", val)',
            ],
            ['sessionStorage', 'Session-scoped key-value store', 'sessionStorage.getItem("token")'],
            ['history', 'Browser history manipulation', 'history.pushState(state, "", url)'],
            ['location', 'Current URL info and navigation', 'location.href, location.search'],
            ['navigator', 'Browser/device info', 'navigator.userAgent, navigator.language'],
            ['performance', 'High-res timing and metrics', 'performance.now(), performance.mark()'],
            ['crypto', 'Cryptographic operations', 'crypto.randomUUID(), crypto.subtle'],
            ['URL', 'URL parsing and construction', 'new URL(href), url.searchParams'],
            ['URLSearchParams', 'Query string manipulation', 'new URLSearchParams(search)'],
            ['AbortController', 'Cancel async operations', 'new AbortController(); ctrl.abort()'],
            ['structuredClone()', 'Deep clone any value', 'structuredClone(complexObject)'],
            ['queueMicrotask()', 'Schedule microtask callback', 'queueMicrotask(() => cleanup())'],
            [
              'requestAnimationFrame()',
              'Run before next repaint (~60fps)',
              'requestAnimationFrame(animate)',
            ],
            [
              'requestIdleCallback()',
              'Run when browser is idle',
              'requestIdleCallback(lowPriWork)',
            ],
            ['setTimeout/setInterval', 'Delayed/repeated execution', 'setTimeout(fn, 1000)'],
            ['matchMedia()', 'Respond to CSS media queries', 'matchMedia("(max-width:768px)")'],
          ],
        },

        // --- Observer APIs ---
        {
          type: 'subheading',
          text: 'Observer APIs',
        },
        {
          type: 'text',
          content:
            'Observer APIs provide efficient, callback-based monitoring of DOM and browser state changes without polling. They are essential for performance-sensitive features.',
        },
        {
          type: 'table',
          headers: ['Observer', 'Watches For', 'Common Use Cases'],
          rows: [
            [
              'IntersectionObserver',
              'Element visibility in viewport or container',
              'Lazy loading images, infinite scroll, analytics impressions, fade-in animations',
            ],
            [
              'MutationObserver',
              'DOM tree changes (attributes, children, text)',
              'Third-party script monitoring, dynamic content tracking, undo systems',
            ],
            [
              'ResizeObserver',
              'Element size changes',
              'Responsive components, chart resizing, container queries (polyfill)',
            ],
            [
              'PerformanceObserver',
              'Performance entries (LCP, FID, CLS)',
              'Core Web Vitals monitoring, custom performance metrics',
            ],
            [
              'ReportingObserver',
              'Browser deprecations and interventions',
              'Monitoring deprecated API usage in production',
            ],
          ],
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Observer Examples',
          code: `// IntersectionObserver -- lazy load images
const imgObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      imgObserver.unobserve(img);
    }
  });
}, { rootMargin: '200px' });

document.querySelectorAll('img[data-src]').forEach(img => {
  imgObserver.observe(img);
});

// MutationObserver -- watch for DOM changes
const mutObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      console.log('Children changed:', mutation.addedNodes);
    }
  }
});
mutObserver.observe(container, { childList: true, subtree: true });

// ResizeObserver -- respond to size changes
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { width, height } = entry.contentRect;
    console.log(\`Size: \${width}x\${height}\`);
  }
});
resizeObserver.observe(element);`,
        },

        // --- Storage APIs ---
        {
          type: 'subheading',
          text: 'Storage APIs',
        },
        {
          type: 'table',
          headers: ['API', 'Capacity', 'Persistence', 'Sync/Async', 'Best For'],
          rows: [
            [
              'localStorage',
              '~5MB',
              'Until cleared',
              'Sync',
              'Small key-value data (preferences, tokens)',
            ],
            [
              'sessionStorage',
              '~5MB',
              'Until tab closes',
              'Sync',
              'Tab-specific state, form drafts',
            ],
            [
              'IndexedDB',
              'Hundreds of MB+',
              'Until cleared',
              'Async',
              'Large datasets, offline data, blobs',
            ],
            [
              'Cache API',
              'Varies (quota)',
              'Until cleared',
              'Async (Promise)',
              'HTTP response caching for offline support',
            ],
            [
              'Cookies',
              '~4KB per cookie',
              'Configurable (expires)',
              'Sync',
              'Server-readable state, auth tokens',
            ],
          ],
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Storage Patterns',
          code: `// localStorage -- simple key-value
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme'); // 'dark'
localStorage.removeItem('theme');

// Store objects (must serialize to JSON)
const user = { name: 'Alice', prefs: { lang: 'en' } };
localStorage.setItem('user', JSON.stringify(user));
const restored = JSON.parse(localStorage.getItem('user'));

// IndexedDB -- basics
const request = indexedDB.open('myDB', 1);
request.onupgradeneeded = (e) => {
  const db = e.target.result;
  db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
};
request.onsuccess = (e) => {
  const db = e.target.result;
  const tx = db.transaction('notes', 'readwrite');
  tx.objectStore('notes').add({ title: 'Hello', body: 'World' });
};

// Cache API -- store HTTP responses
const cache = await caches.open('v1');
await cache.put('/api/data', new Response(JSON.stringify(data)));
const cached = await cache.match('/api/data');`,
        },

        // --- Fetch API Deep Dive ---
        {
          type: 'subheading',
          text: 'Fetch API Deep Dive',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Fetch Patterns',
          code: `// GET with JSON response
const response = await fetch('/api/users');
if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
const users = await response.json();

// POST with JSON body
const res = await fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  },
  body: JSON.stringify({ name: 'Alice', email: 'alice@example.com' }),
});

// POST with FormData (multipart -- no Content-Type header needed)
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('name', 'document.pdf');
await fetch('/api/upload', { method: 'POST', body: formData });

// AbortController for timeout/cancellation
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);
try {
  const res = await fetch(url, { signal: controller.signal });
  clearTimeout(timeoutId);
  return await res.json();
} catch (err) {
  if (err.name === 'AbortError') console.log('Request timed out');
  else throw err;
}

// Streaming a response body
const response = await fetch('/api/large-file');
const reader = response.body.getReader();
const decoder = new TextDecoder();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log(decoder.decode(value, { stream: true }));
}

// CORS -- fetch to a different origin
await fetch('https://api.example.com/data', {
  mode: 'cors',          // default for cross-origin
  credentials: 'include', // send cookies cross-origin
});`,
        },
        {
          type: 'tip',
          content:
            'fetch() does NOT reject on HTTP errors (404, 500). It only rejects on network failures. Always check response.ok or response.status before parsing the body.',
        },

        // --- History API ---
        {
          type: 'subheading',
          text: 'History API & SPA Routing',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'History API',
          code: `// Push a new history entry (URL changes, no page reload)
history.pushState({ page: 'about' }, '', '/about');

// Replace the current entry (no new back-button entry)
history.replaceState({ page: 'home' }, '', '/');

// Navigate programmatically
history.back();
history.forward();
history.go(-2); // go back 2 entries

// Listen for back/forward navigation
window.addEventListener('popstate', (e) => {
  console.log('Navigated to:', location.pathname);
  console.log('State:', e.state);
  renderRoute(location.pathname);
});`,
        },

        // --- URL & URLSearchParams ---
        {
          type: 'subheading',
          text: 'URL & URLSearchParams',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'URL Manipulation',
          code: `// Parse a URL
const url = new URL('https://example.com/path?q=hello&page=2#section');
url.hostname;     // 'example.com'
url.pathname;     // '/path'
url.search;       // '?q=hello&page=2'
url.hash;         // '#section'
url.searchParams; // URLSearchParams object

// URLSearchParams
const params = new URLSearchParams(location.search);
params.get('q');          // 'hello'
params.has('page');       // true
params.set('page', '3'); // update
params.append('tag', 'js');
params.delete('q');
params.toString();        // 'page=3&tag=js'

// Build URL with params
const apiUrl = new URL('https://api.example.com/search');
apiUrl.searchParams.set('q', 'javascript');
apiUrl.searchParams.set('limit', '10');
fetch(apiUrl); // https://api.example.com/search?q=javascript&limit=10`,
        },

        // --- Web Workers ---
        {
          type: 'subheading',
          text: 'Web Workers',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Worker Communication',
          code: `// main.js -- create and communicate with a worker
const worker = new Worker('worker.js');
worker.postMessage({ type: 'compute', data: largeArray });
worker.addEventListener('message', (e) => {
  console.log('Result:', e.data);
});
worker.addEventListener('error', (e) => {
  console.error('Worker error:', e.message);
});
worker.terminate(); // stop the worker

// worker.js -- runs in a separate thread
self.addEventListener('message', (e) => {
  const { type, data } = e.data;
  if (type === 'compute') {
    const result = heavyComputation(data);
    self.postMessage(result);
  }
});

// Inline worker (no separate file needed)
const blob = new Blob([\`
  self.onmessage = (e) => {
    const result = e.data.map(n => n * 2);
    self.postMessage(result);
  };
\`], { type: 'application/javascript' });
const inlineWorker = new Worker(URL.createObjectURL(blob));`,
        },

        // --- Service Workers ---
        {
          type: 'subheading',
          text: 'Service Workers',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Service Worker Basics',
          code: `// Register in main script
if ('serviceWorker' in navigator) {
  const reg = await navigator.serviceWorker.register('/sw.js');
  console.log('SW registered, scope:', reg.scope);
}

// sw.js -- lifecycle events
const CACHE_NAME = 'v1';
const ASSETS = ['/', '/index.html', '/styles.css', '/app.js'];

// Install -- cache assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Activate -- clean old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(k => k !== CACHE_NAME)
        .map(k => caches.delete(k))
      )
    )
  );
});

// Fetch -- cache-first strategy
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(cached => cached || fetch(e.request))
  );
});`,
        },

        // --- Web Components ---
        {
          type: 'subheading',
          text: 'Web Components',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Custom Elements & Shadow DOM',
          code: `// Define a custom element
class UserCard extends HTMLElement {
  static observedAttributes = ['name', 'role'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) this.render();
  }

  render() {
    const name = this.getAttribute('name') || 'Unknown';
    const role = this.getAttribute('role') || 'User';
    this.shadowRoot.innerHTML = \`
      <style>
        :host { display: block; padding: 1rem; border: 1px solid #ddd; }
        :host([highlighted]) { border-color: #3b82f6; }
        h3 { margin: 0 0 0.5rem; }
        ::slotted(p) { color: #666; }
      </style>
      <h3>\${name}</h3>
      <span>\${role}</span>
      <slot></slot>
    \`;
  }
}

customElements.define('user-card', UserCard);
// Usage: <user-card name="Alice" role="Admin"><p>Bio here</p></user-card>`,
        },

        // --- Intl API ---
        {
          type: 'subheading',
          text: 'Intl (Internationalization) API',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Internationalization',
          code: `// Date formatting
new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long', timeStyle: 'short'
}).format(new Date());
// "January 15, 2026 at 3:30 PM"

// Number formatting
new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD'
}).format(1234.56);
// "$1,234.56"

// Relative time
new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  .format(-1, 'day');
// "yesterday"

// List formatting
new Intl.ListFormat('en', { style: 'long', type: 'conjunction' })
  .format(['Alice', 'Bob', 'Charlie']);
// "Alice, Bob, and Charlie"

// Plural rules
const pr = new Intl.PluralRules('en');
pr.select(0);  // "other"
pr.select(1);  // "one"
pr.select(2);  // "other"

// Collator (locale-aware sorting)
const collator = new Intl.Collator('de');
['Z', 'a', 'z', 'A'].sort(collator.compare);`,
        },

        // --- Performance API ---
        {
          type: 'subheading',
          text: 'Performance API',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Performance Measurement',
          code: `// High-resolution timestamp
const start = performance.now();
doExpensiveWork();
const duration = performance.now() - start;
console.log(\`Took \${duration.toFixed(2)}ms\`);

// User Timing API -- named marks and measures
performance.mark('render-start');
renderApp();
performance.mark('render-end');
performance.measure('render', 'render-start', 'render-end');

const [measure] = performance.getEntriesByName('render');
console.log(\`Render took \${measure.duration.toFixed(2)}ms\`);

// PerformanceObserver -- monitor metrics
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(entry.name, entry.duration);
  }
});
observer.observe({ type: 'measure', buffered: true });`,
        },

        // --- Canvas Basics ---
        {
          type: 'subheading',
          text: 'Canvas 2D API Basics',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Canvas Drawing',
          code: `const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Shapes
ctx.fillStyle = '#3b82f6';
ctx.fillRect(10, 10, 100, 80);          // filled rectangle
ctx.strokeStyle = '#1d4ed8';
ctx.lineWidth = 2;
ctx.strokeRect(10, 10, 100, 80);        // outlined rectangle

// Paths
ctx.beginPath();
ctx.arc(200, 50, 40, 0, Math.PI * 2);   // circle
ctx.fill();

// Text
ctx.font = '16px sans-serif';
ctx.fillStyle = '#000';
ctx.fillText('Hello Canvas', 10, 130);

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // draw frame...
  requestAnimationFrame(animate);
}
animate();`,
        },

        // --- WebSocket ---
        {
          type: 'subheading',
          text: 'WebSocket Basics',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'WebSocket Communication',
          code: `const ws = new WebSocket('wss://echo.websocket.org');

ws.addEventListener('open', () => {
  console.log('Connected');
  ws.send(JSON.stringify({ type: 'hello', data: 'world' }));
});

ws.addEventListener('message', (e) => {
  const msg = JSON.parse(e.data);
  console.log('Received:', msg);
});

ws.addEventListener('close', (e) => {
  console.log(\`Closed: \${e.code} \${e.reason}\`);
});

ws.addEventListener('error', (e) => {
  console.error('WebSocket error:', e);
});

// Close connection
ws.close(1000, 'Done');`,
        },

        // --- Clipboard & Geolocation ---
        {
          type: 'subheading',
          text: 'Clipboard & Geolocation APIs',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Clipboard and Geolocation',
          code: `// Clipboard API (requires user gesture + HTTPS)
await navigator.clipboard.writeText('Copied text!');
const text = await navigator.clipboard.readText();

// Clipboard with rich content
const blob = new Blob(['<b>Bold</b>'], { type: 'text/html' });
await navigator.clipboard.write([
  new ClipboardItem({ 'text/html': blob })
]);

// Geolocation API
navigator.geolocation.getCurrentPosition(
  (pos) => {
    const { latitude, longitude, accuracy } = pos.coords;
    console.log(\`Lat: \${latitude}, Lng: \${longitude} (+/- \${accuracy}m)\`);
  },
  (err) => console.error(err.message),
  { enableHighAccuracy: true, timeout: 10000 }
);

// Watch position (continuous)
const watchId = navigator.geolocation.watchPosition(onSuccess, onError);
navigator.geolocation.clearWatch(watchId);`,
        },
        {
          type: 'tip',
          content:
            'Many powerful APIs (Clipboard, Geolocation, Notifications, Camera) require HTTPS and an explicit user gesture (like a click). They will silently fail or throw in insecure contexts.',
        },
      ],
    },

    // ────────────────────────────────────────────────────────────
    // SECTION 4: COMMON PATTERNS
    // ────────────────────────────────────────────────────────────
    {
      id: 'common-patterns',
      icon: '\u{1F504}',
      title: 'Common Patterns',
      description: 'Widely-used vanilla JS patterns and idioms',
      content: [
        // --- Event Delegation ---
        {
          type: 'subheading',
          text: 'Event Delegation',
        },
        {
          type: 'text',
          content:
            'Instead of attaching listeners to every child, attach one to the parent and use event.target to determine which child was interacted with. This is more efficient and handles dynamically added elements automatically.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Event Delegation with matches/closest',
          code: `// Using closest() for reliable delegation
document.querySelector('.todo-list').addEventListener('click', (e) => {
  const item = e.target.closest('li');
  if (!item) return; // click was not inside an <li>

  if (e.target.matches('.delete-btn')) {
    item.remove();
  } else if (e.target.matches('.toggle')) {
    item.classList.toggle('completed');
  } else if (e.target.closest('.edit-area')) {
    enterEditMode(item);
  }
});

// Generic delegation helper
function delegate(parent, selector, event, handler) {
  parent.addEventListener(event, (e) => {
    const target = e.target.closest(selector);
    if (target && parent.contains(target)) {
      handler.call(target, e);
    }
  });
}

// Usage
delegate(document.body, '.card', 'click', function (e) {
  console.log('Card clicked:', this.dataset.id);
});`,
        },

        // --- Module Pattern ---
        {
          type: 'subheading',
          text: 'Module Pattern (ES Modules)',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'ES Modules & Dynamic Import',
          code: `// math.js -- named exports
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }
export const PI = 3.14159;

// utils.js -- default export
export default class Logger {
  log(msg) { console.log(\`[LOG] \${msg}\`); }
}

// app.js -- importing
import { add, multiply, PI } from './math.js';
import Logger from './utils.js';
import * as math from './math.js'; // namespace import

// Dynamic import -- code splitting / lazy loading
async function loadEditor() {
  const { Editor } = await import('./editor.js');
  return new Editor();
}

// Conditional import
if (featureFlags.analytics) {
  import('./analytics.js').then(m => m.init());
}

// In HTML (no bundler needed)
// <script type="module" src="./app.js"></script>
// <script type="importmap">
// { "imports": { "lodash": "/node_modules/lodash-es/lodash.js" } }
// </script>`,
        },

        // --- Debounce & Throttle ---
        {
          type: 'subheading',
          text: 'Debounce & Throttle',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Debounce & Throttle Implementations',
          code: `// Debounce -- wait until activity stops
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Usage: only search after user stops typing for 300ms
const search = document.querySelector('#search');
search.addEventListener('input', debounce((e) => {
  performSearch(e.target.value);
}, 300));

// Throttle -- at most once per interval
function throttle(fn, interval) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// Usage: update position at most every 16ms (~60fps)
window.addEventListener('scroll', throttle(() => {
  updateScrollIndicator();
}, 16));`,
        },

        // --- Pub/Sub ---
        {
          type: 'subheading',
          text: 'Pub/Sub / EventEmitter',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Event Emitter Pattern',
          code: `class EventEmitter {
  #listeners = new Map();

  on(event, callback) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, new Set());
    }
    this.#listeners.get(event).add(callback);
    // Return unsubscribe function
    return () => this.off(event, callback);
  }

  once(event, callback) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      callback(...args);
    };
    return this.on(event, wrapper);
  }

  off(event, callback) {
    this.#listeners.get(event)?.delete(callback);
  }

  emit(event, ...args) {
    this.#listeners.get(event)?.forEach(cb => cb(...args));
  }
}

// Usage
const bus = new EventEmitter();
const unsub = bus.on('user:login', (user) => {
  console.log(\`Welcome, \${user.name}\`);
});
bus.emit('user:login', { name: 'Alice' });
unsub(); // clean up`,
        },

        // --- Observer Pattern ---
        {
          type: 'subheading',
          text: 'Observer Pattern',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Observable with Subscriptions',
          code: `class Observable {
  #observers = new Set();

  subscribe(observer) {
    this.#observers.add(observer);
    return { unsubscribe: () => this.#observers.delete(observer) };
  }

  notify(data) {
    this.#observers.forEach(obs => obs(data));
  }
}

// Usage
const priceStream = new Observable();
const sub1 = priceStream.subscribe(price =>
  console.log(\`Display: $\${price}\`)
);
const sub2 = priceStream.subscribe(price => {
  if (price < 10) console.log('Buy signal!');
});
priceStream.notify(9.99);
sub1.unsubscribe();`,
        },

        // --- Reactive State with Proxy ---
        {
          type: 'subheading',
          text: 'Reactive State Management (Proxy)',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Simple Reactive Store',
          code: `function createStore(initialState) {
  const listeners = new Set();

  const state = new Proxy(initialState, {
    set(target, key, value) {
      const oldValue = target[key];
      target[key] = value;
      if (oldValue !== value) {
        listeners.forEach(fn => fn(key, value, oldValue));
      }
      return true;
    },
  });

  return {
    state,
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    getSnapshot() {
      return { ...state };
    },
  };
}

// Usage
const store = createStore({ count: 0, name: 'World' });

store.subscribe((key, val) => {
  console.log(\`\${key} changed to \${val}\`);
  document.querySelector('#count').textContent = store.state.count;
});

store.state.count++;   // triggers subscriber
store.state.name = 'Alice'; // triggers subscriber`,
        },

        // --- Custom Router ---
        {
          type: 'subheading',
          text: 'Custom SPA Router',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Hash-based and History API Router',
          code: `// Hash-based router (simplest, no server config needed)
class HashRouter {
  #routes = new Map();

  route(path, handler) {
    this.#routes.set(path, handler);
    return this;
  }

  start() {
    const handleHash = () => {
      const path = location.hash.slice(1) || '/';
      const handler = this.#routes.get(path);
      if (handler) handler();
      else this.#routes.get('*')?.();
    };
    window.addEventListener('hashchange', handleHash);
    handleHash(); // handle initial route
  }
}

const router = new HashRouter();
router
  .route('/', () => renderPage('Home'))
  .route('/about', () => renderPage('About'))
  .route('*', () => renderPage('404 Not Found'))
  .start();

// History API router (clean URLs, needs server fallback)
class HistoryRouter {
  #routes = new Map();

  route(path, handler) {
    this.#routes.set(path, handler);
    return this;
  }

  navigate(path) {
    history.pushState(null, '', path);
    this.#resolve(path);
  }

  #resolve(path) {
    const handler = this.#routes.get(path);
    if (handler) handler();
    else this.#routes.get('*')?.();
  }

  start() {
    window.addEventListener('popstate', () => {
      this.#resolve(location.pathname);
    });
    // Intercept link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-route]');
      if (link) {
        e.preventDefault();
        this.navigate(link.getAttribute('href'));
      }
    });
    this.#resolve(location.pathname);
  }
}`,
        },

        // --- Template Rendering ---
        {
          type: 'subheading',
          text: 'Template Rendering',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Template Patterns',
          code: `// Tagged template literal for safe HTML
function html(strings, ...values) {
  const escaped = values.map(v =>
    String(v)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  );
  return strings.reduce((result, str, i) =>
    result + str + (escaped[i] || ''), ''
  );
}

// Usage -- user input is automatically escaped
const userInput = '<script>alert("xss")</script>';
const safe = html\`<p>Hello, \${userInput}!</p>\`;
// <p>Hello, &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;!</p>

// DocumentFragment for efficient list rendering
function renderList(items, container) {
  const fragment = document.createDocumentFragment();
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.name;
    li.dataset.id = item.id;
    fragment.appendChild(li);
  });
  container.innerHTML = '';
  container.appendChild(fragment);
}

// <template> element (parsed but not rendered until cloned)
// <template id="card-tpl"><div class="card"><h3></h3><p></p></div></template>
const template = document.querySelector('#card-tpl');
const clone = template.content.cloneNode(true);
clone.querySelector('h3').textContent = 'Title';
clone.querySelector('p').textContent = 'Body text';
document.body.appendChild(clone);`,
        },

        // --- Lazy Loading ---
        {
          type: 'subheading',
          text: 'Lazy Loading (IntersectionObserver + Dynamic Import)',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Lazy Loading Patterns',
          code: `// Lazy load images with IntersectionObserver
const imageObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      obs.unobserve(img);
    }
  });
}, { rootMargin: '300px' });

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});

// Lazy load modules when element becomes visible
const sectionObserver = new IntersectionObserver(async (entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const section = entry.target;
      const modulePath = section.dataset.module;
      const mod = await import(modulePath);
      mod.init(section);
      sectionObserver.unobserve(section);
    }
  }
});

document.querySelectorAll('[data-module]').forEach(el => {
  sectionObserver.observe(el);
});

// Native lazy loading (simplest)
// <img src="photo.jpg" loading="lazy" alt="Photo">
// <iframe src="video.html" loading="lazy"></iframe>`,
        },

        // --- Infinite Scroll ---
        {
          type: 'subheading',
          text: 'Infinite Scroll',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Infinite Scroll Pattern',
          code: `class InfiniteScroller {
  #page = 1;
  #loading = false;
  #done = false;

  constructor(container, sentinel, fetchFn) {
    this.container = container;
    this.fetchFn = fetchFn;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !this.#loading && !this.#done) {
        this.loadMore();
      }
    });
    observer.observe(sentinel);
  }

  async loadMore() {
    this.#loading = true;
    const items = await this.fetchFn(this.#page);

    if (items.length === 0) {
      this.#done = true;
    } else {
      const fragment = document.createDocumentFragment();
      items.forEach(item => {
        const el = document.createElement('div');
        el.textContent = item.title;
        fragment.appendChild(el);
      });
      this.container.appendChild(fragment);
      this.#page++;
    }
    this.#loading = false;
  }
}

// Usage
new InfiniteScroller(
  document.querySelector('#feed'),
  document.querySelector('#sentinel'),
  (page) => fetch(\`/api/posts?page=\${page}\`).then(r => r.json())
);`,
        },

        // --- Drag and Drop ---
        {
          type: 'subheading',
          text: 'Native Drag and Drop',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Drag & Drop API',
          code: `// Make elements draggable
// <div draggable="true" data-id="1">Drag me</div>

document.querySelectorAll('[draggable]').forEach(el => {
  el.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', el.dataset.id);
    e.dataTransfer.effectAllowed = 'move';
    el.classList.add('dragging');
  });

  el.addEventListener('dragend', () => {
    el.classList.remove('dragging');
  });
});

// Drop zone
const dropZone = document.querySelector('.drop-zone');
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault(); // REQUIRED to allow drop
  e.dataTransfer.dropEffect = 'move';
  dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const dragged = document.querySelector(\`[data-id="\${id}"]\`);
  dropZone.appendChild(dragged);
  dropZone.classList.remove('drag-over');
});`,
        },

        // --- Form Validation Pattern ---
        {
          type: 'subheading',
          text: 'Form Validation Pattern',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Custom Form Validation',
          code: `class FormValidator {
  #rules = new Map();
  #errors = new Map();

  addRule(field, validate, message) {
    if (!this.#rules.has(field)) this.#rules.set(field, []);
    this.#rules.get(field).push({ validate, message });
    return this;
  }

  validate(form) {
    this.#errors.clear();
    for (const [field, rules] of this.#rules) {
      const input = form.elements[field];
      for (const rule of rules) {
        if (!rule.validate(input.value, form)) {
          if (!this.#errors.has(field)) this.#errors.set(field, []);
          this.#errors.get(field).push(rule.message);
        }
      }
    }
    return this.#errors.size === 0;
  }

  getErrors(field) {
    return field ? this.#errors.get(field) || [] : this.#errors;
  }
}

// Usage
const validator = new FormValidator()
  .addRule('email', v => v.includes('@'), 'Invalid email')
  .addRule('email', v => v.length > 0, 'Email is required')
  .addRule('password', v => v.length >= 8, 'Min 8 characters')
  .addRule('password', v => /[A-Z]/.test(v), 'Need uppercase letter');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validator.validate(form)) {
    submitForm(form);
  } else {
    showErrors(validator.getErrors());
  }
});`,
        },

        // --- Error Handling ---
        {
          type: 'subheading',
          text: 'Error Handling Patterns',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Comprehensive Error Handling',
          code: `// try/catch with specific error types
try {
  const data = JSON.parse(userInput);
} catch (err) {
  if (err instanceof SyntaxError) {
    console.error('Invalid JSON:', err.message);
  } else {
    throw err; // re-throw unexpected errors
  }
}

// Global error handlers
window.addEventListener('error', (e) => {
  console.error('Uncaught error:', e.message, e.filename, e.lineno);
  reportToServer({ type: 'error', message: e.message });
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  reportToServer({ type: 'rejection', reason: String(e.reason) });
  e.preventDefault(); // suppress default console error
});

// Custom error classes
class AppError extends Error {
  constructor(message, code, context) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.context = context;
  }
}

class NetworkError extends AppError {
  constructor(status, url) {
    super(\`HTTP \${status} from \${url}\`, 'NETWORK_ERROR', { status, url });
    this.name = 'NetworkError';
  }
}`,
        },

        // --- Singleton & Factory ---
        {
          type: 'subheading',
          text: 'Singleton & Factory Patterns',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Singleton and Factory',
          code: `// Singleton (ES module -- the module IS the singleton)
// db.js
let connection = null;

export async function getConnection() {
  if (!connection) {
    connection = await createConnection();
  }
  return connection;
}

// Factory pattern
function createComponent(type, props) {
  const creators = {
    button: (p) => {
      const btn = document.createElement('button');
      btn.textContent = p.label;
      btn.className = \`btn btn-\${p.variant || 'default'}\`;
      return btn;
    },
    input: (p) => {
      const input = document.createElement('input');
      input.type = p.type || 'text';
      input.placeholder = p.placeholder || '';
      return input;
    },
    card: (p) => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = \`<h3>\${p.title || ''}</h3><p>\${p.body || ''}</p>\`;
      return div;
    },
  };

  const creator = creators[type];
  if (!creator) throw new Error(\`Unknown component: \${type}\`);
  return creator(props);
}

// Usage
document.body.append(
  createComponent('button', { label: 'Click me', variant: 'primary' }),
  createComponent('card', { title: 'Hello', body: 'Factory pattern' })
);`,
        },

        // --- Promise Patterns ---
        {
          type: 'subheading',
          text: 'Promise Patterns',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Promise Combinators & Patterns',
          code: `// Promise.all -- wait for ALL to resolve (fails fast on rejection)
const [users, posts, comments] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/comments').then(r => r.json()),
]);

// Promise.allSettled -- wait for ALL to complete (never rejects)
const results = await Promise.allSettled([
  fetch('/api/a').then(r => r.json()),
  fetch('/api/b').then(r => r.json()),
  fetch('/api/c').then(r => r.json()),
]);
const succeeded = results.filter(r => r.status === 'fulfilled');
const failed = results.filter(r => r.status === 'rejected');

// Promise.race -- first to settle wins
const data = await Promise.race([
  fetch('/api/data').then(r => r.json()),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), 5000)
  ),
]);

// Promise.any -- first to RESOLVE wins (ignores rejections)
const fastest = await Promise.any([
  fetch('https://cdn1.example.com/data.json'),
  fetch('https://cdn2.example.com/data.json'),
  fetch('https://cdn3.example.com/data.json'),
]);

// Sequential execution
async function sequential(urls) {
  const results = [];
  for (const url of urls) {
    const res = await fetch(url);
    results.push(await res.json());
  }
  return results;
}

// Concurrent with limit
async function concurrentLimit(tasks, limit) {
  const results = [];
  const executing = new Set();
  for (const task of tasks) {
    const p = task().then(r => { executing.delete(p); return r; });
    executing.add(p);
    results.push(p);
    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }
  return Promise.all(results);
}`,
        },
        {
          type: 'tip',
          content:
            'Use Promise.allSettled when you want to handle partial failures gracefully. Use Promise.all when all results are required. Use Promise.any when you want the fastest successful result from multiple sources.',
        },
      ],
    },

    // ────────────────────────────────────────────────────────────
    // SECTION 5: INTERACTIVE CODE EXAMPLES
    // ────────────────────────────────────────────────────────────
    {
      id: 'code-examples',
      icon: '\u{1F4BB}',
      title: 'Interactive Examples',
      description: 'Try editing these live examples',
      content: [
        {
          type: 'interactive-code',
          language: 'javascript',
          title: 'DOM Manipulation',
          description: 'Creating elements and modifying the DOM programmatically.',
          defaultCode: `// Create a card element
const card = document.createElement('div');
card.className = 'card';

const title = document.createElement('h2');
title.textContent = 'Hello World';

const body = document.createElement('p');
body.textContent = 'Created with vanilla JS';

card.appendChild(title);
card.appendChild(body);

// Add interactive behavior
card.addEventListener('click', () => {
  card.classList.toggle('highlighted');
});

// Insert into document
document.body.appendChild(card);`,
        },
        {
          type: 'interactive-code',
          language: 'javascript',
          title: 'Event Handling & Delegation',
          description: 'Efficient event handling using delegation on a parent element.',
          defaultCode: `const list = document.createElement('ul');

// Add items
['Apple', 'Banana', 'Cherry'].forEach(fruit => {
  const li = document.createElement('li');
  li.textContent = fruit;

  const btn = document.createElement('button');
  btn.className = 'remove';
  btn.textContent = 'x';
  li.appendChild(btn);

  list.appendChild(li);
});

// Single delegated listener handles all buttons
list.addEventListener('click', (e) => {
  if (e.target.matches('.remove')) {
    e.target.closest('li').remove();
  }
});

document.body.appendChild(list);`,
        },
        {
          type: 'interactive-code',
          language: 'javascript',
          title: 'Fetch API Usage',
          description: 'Making HTTP requests with the Fetch API and async/await.',
          defaultCode: `async function fetchUsers() {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/users'
    );

    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }

    const users = await response.json();

    users.slice(0, 3).forEach(user => {
      console.log(user.name + ' -- ' + user.email);
    });

    return users;
  } catch (error) {
    console.error('Fetch failed:', error.message);
  }
}

fetchUsers();`,
        },
        {
          type: 'interactive-code',
          language: 'javascript',
          title: 'Simple SPA Router (Hash-Based)',
          description:
            'A minimal hash-based router that renders different views without page reloads.',
          defaultCode: `// Simple hash router
const app = document.createElement('div');
const nav = document.createElement('nav');
const view = document.createElement('main');

// Create navigation links
['#/', '#/about', '#/contact'].forEach(hash => {
  const a = document.createElement('a');
  a.href = hash;
  a.textContent = hash.replace('#/', '') || 'Home';
  a.style.marginRight = '1rem';
  nav.appendChild(a);
});

// Define routes
const routes = {
  '/': () => '<h1>Home</h1><p>Welcome to the SPA!</p>',
  '/about': () => '<h1>About</h1><p>Built with vanilla JS.</p>',
  '/contact': () => '<h1>Contact</h1><p>hello@example.com</p>',
};

// Route handler
function handleRoute() {
  const path = location.hash.slice(1) || '/';
  const render = routes[path];
  view.innerHTML = render
    ? render()
    : '<h1>404</h1><p>Page not found.</p>';
}

window.addEventListener('hashchange', handleRoute);
app.appendChild(nav);
app.appendChild(view);
document.body.appendChild(app);
handleRoute();`,
        },
        {
          type: 'interactive-code',
          language: 'javascript',
          title: 'Reactive State Store (Proxy)',
          description: 'A reactive store that automatically updates the DOM when state changes.',
          defaultCode: `// Create reactive store
function createStore(initial) {
  const listeners = new Set();
  const state = new Proxy(initial, {
    set(target, key, value) {
      target[key] = value;
      listeners.forEach(fn => fn(key, value));
      return true;
    },
  });
  return {
    state,
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}

// Build UI
const app = document.createElement('div');
const counter = document.createElement('h2');
const incBtn = document.createElement('button');
const decBtn = document.createElement('button');
incBtn.textContent = '+';
decBtn.textContent = '-';

// Create store and bind to UI
const store = createStore({ count: 0 });

store.subscribe((key, value) => {
  if (key === 'count') {
    counter.textContent = 'Count: ' + value;
  }
});

incBtn.addEventListener('click', () => store.state.count++);
decBtn.addEventListener('click', () => store.state.count--);

counter.textContent = 'Count: 0';
app.append(counter, decBtn, document.createTextNode(' '), incBtn);
document.body.appendChild(app);`,
        },
        {
          type: 'interactive-code',
          language: 'javascript',
          title: 'Web Component (Custom Element)',
          description: 'A reusable custom element with Shadow DOM encapsulation.',
          defaultCode: `// Define a counter web component
class CounterElement extends HTMLElement {
  constructor() {
    super();
    this.count = 0;
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('.inc')
      .addEventListener('click', () => {
        this.count++;
        this.render();
      });
    this.shadowRoot.querySelector('.dec')
      .addEventListener('click', () => {
        this.count--;
        this.render();
      });
  }

  render() {
    const label = this.getAttribute('label') || 'Counter';
    this.shadowRoot.innerHTML =
      '<style>' +
      ':host { display: block; padding: 1rem; font-family: sans-serif; }' +
      'button { font-size: 1.2rem; padding: 0.25rem 0.75rem; }' +
      'span { margin: 0 1rem; font-size: 1.5rem; }' +
      '</style>' +
      '<h3>' + label + '</h3>' +
      '<button class="dec">-</button>' +
      '<span>' + this.count + '</span>' +
      '<button class="inc">+</button>';

    // Re-attach listeners after innerHTML replace
    this.shadowRoot.querySelector('.inc')
      .addEventListener('click', () => { this.count++; this.render(); });
    this.shadowRoot.querySelector('.dec')
      .addEventListener('click', () => { this.count--; this.render(); });
  }
}

customElements.define('my-counter', CounterElement);

const el = document.createElement('my-counter');
el.setAttribute('label', 'My Counter');
document.body.appendChild(el);`,
        },
      ],
    },

    // ────────────────────────────────────────────────────────────
    // SECTION 6: ECOSYSTEM
    // ────────────────────────────────────────────────────────────
    {
      id: 'ecosystem',
      icon: '\u{1F310}',
      title: 'Ecosystem & Tools',
      description: 'The modern tooling landscape for vanilla JavaScript development',
      content: [
        {
          type: 'subheading',
          text: 'Build Tools',
        },
        {
          type: 'table',
          headers: ['Tool', 'Language', 'Highlights'],
          rows: [
            [
              'Vite',
              'JS/Go',
              'Lightning-fast HMR, native ESM dev server, Rollup-based production builds',
            ],
            [
              'esbuild',
              'Go',
              'Extremely fast bundler/minifier, used under the hood by Vite and others',
            ],
            ['Rollup', 'JS', 'Tree-shaking pioneer, ideal for libraries, plugin-rich ecosystem'],
            ['Parcel', 'Rust/JS', 'Zero-config bundler with built-in support for many file types'],
            [
              'Webpack',
              'JS',
              'Mature, highly configurable, massive plugin ecosystem, code splitting',
            ],
            [
              'Turbopack',
              'Rust',
              'Incremental bundler by Vercel, successor to Webpack, used in Next.js',
            ],
          ],
        },

        {
          type: 'subheading',
          text: 'Linting & Formatting',
        },
        {
          type: 'table',
          headers: ['Tool', 'Purpose', 'Notes'],
          rows: [
            [
              'ESLint',
              'Linting',
              'Industry standard, flat config (eslint.config.js), huge plugin ecosystem',
            ],
            [
              'Prettier',
              'Formatting',
              'Opinionated formatter, works alongside ESLint, supports many languages',
            ],
            [
              'Biome',
              'Lint + Format',
              'Rust-based all-in-one linter/formatter, extremely fast, ESLint-compatible',
            ],
            [
              'oxlint',
              'Linting',
              'Rust-based ESLint alternative from the Oxc project, 50-100x faster',
            ],
          ],
        },

        {
          type: 'subheading',
          text: 'Type Safety',
        },
        {
          type: 'table',
          headers: ['Approach', 'Description', 'When to Use'],
          rows: [
            [
              'TypeScript',
              'Full type system with compiler, .ts/.tsx files',
              'Most projects -- best DX, strongest guarantees',
            ],
            [
              'JSDoc Types',
              'Type annotations in comments, no build step',
              'When you want types but cannot add a compile step',
            ],
            [
              '// @ts-check',
              'Enable TS checking in plain .js files',
              'Gradual adoption -- add to individual files',
            ],
          ],
        },

        {
          type: 'subheading',
          text: 'Testing',
        },
        {
          type: 'table',
          headers: ['Tool', 'Type', 'Highlights'],
          rows: [
            [
              'Vitest',
              'Unit / Integration',
              'Vite-native, Jest-compatible API, fast HMR-based re-runs',
            ],
            [
              'Jest',
              'Unit / Integration',
              'Mature, widely used, built-in mocking, snapshot testing',
            ],
            [
              'Playwright',
              'E2E / Browser',
              'Cross-browser (Chromium, Firefox, WebKit), auto-waiting, codegen',
            ],
            [
              'Cypress',
              'E2E / Component',
              'Real browser testing, time-travel debugging, component testing',
            ],
            [
              'Testing Library',
              'DOM Testing',
              'User-centric queries (getByRole, getByText), framework adapters',
            ],
            [
              'Happy DOM',
              'DOM Emulation',
              'Lightweight browser-like DOM for unit tests, faster than jsdom',
            ],
            ['jsdom', 'DOM Emulation', 'Node.js DOM implementation for testing without a browser'],
          ],
        },

        {
          type: 'subheading',
          text: 'Lightweight UI Libraries',
        },
        {
          type: 'table',
          headers: ['Library', 'Size', 'Approach'],
          rows: [
            [
              'HTMX',
              '~14KB',
              'HTML attributes for AJAX, WebSockets, SSE -- no JS authoring needed',
            ],
            ['Alpine.js', '~15KB', 'Reactive x-data/x-on attributes directly in HTML markup'],
            ['Lit', '~5KB', 'Google-backed Web Components library with reactive templates'],
            ['Stencil', 'Compiler', 'Web Components compiler with JSX, lazy-loading, SSR support'],
            ['Svelte', 'Compiler', 'Compile-time reactivity, no virtual DOM, very small runtime'],
            ['Preact', '~3KB', 'React-compatible API in 3KB, great for progressive enhancement'],
          ],
        },

        {
          type: 'subheading',
          text: 'Animation',
        },
        {
          type: 'table',
          headers: ['Tool', 'Type', 'Best For'],
          rows: [
            [
              'Web Animations API',
              'Native',
              'Simple keyframe animations via element.animate(), no library needed',
            ],
            [
              'GSAP',
              'Library',
              'Professional-grade animation, timeline sequencing, scroll triggers',
            ],
            [
              'Motion One',
              'Library',
              'Modern, small (~3KB), Web Animations API-based with spring physics',
            ],
            ['Anime.js', 'Library', 'Lightweight with powerful timeline and stagger support'],
            [
              'View Transitions API',
              'Native',
              'Smooth page/state transitions, SPA and MPA support (Chrome)',
            ],
          ],
        },

        {
          type: 'subheading',
          text: 'CSS Tools',
        },
        {
          type: 'table',
          headers: ['Tool', 'Type', 'Description'],
          rows: [
            [
              'PostCSS',
              'Processor',
              'CSS transformation pipeline with plugins (autoprefixer, nesting)',
            ],
            [
              'Tailwind CSS',
              'Utility-first',
              'Utility classes, JIT compiler, design system in class names',
            ],
            [
              'Lightning CSS',
              'Compiler',
              'Rust-based CSS bundler/minifier/transformer, extremely fast',
            ],
            [
              'Open Props',
              'Variables',
              'Pre-made CSS custom properties for colors, spacing, easing, etc.',
            ],
            ['CSS Modules', 'Scoping', 'Locally-scoped class names, works with most bundlers'],
            [
              'vanilla-extract',
              'CSS-in-TS',
              'Type-safe styles authored in TypeScript, zero runtime',
            ],
          ],
        },

        {
          type: 'subheading',
          text: 'Package Managers',
        },
        {
          type: 'table',
          headers: ['Manager', 'Speed', 'Notable Features'],
          rows: [
            ['npm', 'Moderate', 'Default with Node.js, largest registry, workspaces support'],
            [
              'pnpm',
              'Fast',
              'Content-addressable store, strict dependency resolution, saves disk space',
            ],
            ['Yarn', 'Fast', 'Plug n Play (PnP), zero-installs, constraints for monorepos'],
            ['Bun', 'Fastest', 'Built into Bun runtime, native lockfile, extremely fast installs'],
          ],
        },

        {
          type: 'subheading',
          text: 'JavaScript Runtimes',
        },
        {
          type: 'table',
          headers: ['Runtime', 'Engine', 'Key Differentiator'],
          rows: [
            ['Node.js', 'V8', 'Industry standard, massive ecosystem (npm), LTS releases'],
            [
              'Deno',
              'V8',
              'Secure by default (permissions), native TypeScript, Web API compatibility',
            ],
            [
              'Bun',
              'JavaScriptCore',
              'Fastest startup, built-in bundler/test runner/package manager',
            ],
            [
              'Cloudflare Workers',
              'V8 isolates',
              'Edge computing, sub-millisecond cold starts, global deployment',
            ],
          ],
        },

        {
          type: 'tip',
          content:
            'You can use TypeScript without any framework. Run tsc --init to set up a tsconfig.json, and Vite or esbuild can compile .ts files directly. For the lightest approach, use JSDoc type annotations with // @ts-check in plain .js files -- zero build step, full editor intelligence.',
        },
      ],
    },
  ],
};
