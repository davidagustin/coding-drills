import type { CheatsheetData } from '../types';

export const nativeJsCheatsheet: CheatsheetData = {
  framework: 'native-js',
  title: 'Native JavaScript Cheatsheet',
  lastUpdated: '2025-01',
  sections: [
    {
      id: 'overview',
      icon: '📋',
      title: 'Overview',
      description: 'The web platform without frameworks',
      content: [
        {
          type: 'text',
          content: `Native JavaScript (vanilla JS) means building with the browser's built-in APIs — no frameworks or libraries. You work directly with the DOM, events, fetch, and modern ES2023+ features. This is the foundation that every framework is built on.`,
        },
        {
          type: 'list',
          style: 'bullet',
          items: [
            'Direct DOM manipulation with querySelector and friends',
            'Event handling with addEventListener and event delegation',
            'Fetch API for network requests',
            'ES modules for code organization',
            'No build step required — works directly in the browser',
          ],
        },
        {
          type: 'tip',
          content: `Understanding native JS makes you better at every framework. When you know what the browser provides natively, you can make informed decisions about when a framework adds real value.`,
        },
      ],
    },
    {
      id: 'core-concepts',
      icon: '🧠',
      title: 'Core Concepts',
      description: 'DOM manipulation, selectors, and events',
      content: [
        {
          type: 'subheading',
          text: 'DOM Selection',
        },
        {
          type: 'text',
          content: `The DOM is a tree of nodes representing the HTML document. Use selectors to find elements and methods to manipulate them.`,
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Selecting Elements',
          code: `// Single element
const header = document.querySelector('h1');
const btn = document.querySelector('#submit-btn');
const card = document.querySelector('.card.active');

// Multiple elements (returns NodeList)
const items = document.querySelectorAll('li.item');
const inputs = document.querySelectorAll('input[type="text"]');

// Traversal
const parent = element.parentElement;
const children = element.children;
const next = element.nextElementSibling;
const closest = element.closest('.container');`,
        },
        {
          type: 'subheading',
          text: 'DOM Manipulation',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Creating & Modifying Elements',
          code: `// Create elements
const div = document.createElement('div');
div.textContent = 'Hello';
div.classList.add('card', 'active');
div.setAttribute('data-id', '42');
div.style.color = 'blue';

// Insert into DOM
parent.appendChild(div);
parent.insertBefore(div, referenceNode);
element.insertAdjacentHTML('beforeend', '<p>New</p>');

// Remove
element.remove();

// Clone
const clone = element.cloneNode(true); // deep clone`,
        },
        {
          type: 'subheading',
          text: 'Event Handling',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Events',
          code: `// Add listener
button.addEventListener('click', (e) => {
  console.log('Clicked!', e.target);
});

// Remove listener
const handler = () => console.log('once');
button.addEventListener('click', handler);
button.removeEventListener('click', handler);

// Event options
element.addEventListener('scroll', handler, {
  passive: true,  // better scroll performance
  once: true,     // auto-remove after first call
  capture: true,  // capture phase
});`,
        },
        {
          type: 'warning',
          content: `Avoid inline event handlers (onclick='...'). Use addEventListener for separation of concerns and the ability to attach multiple handlers.`,
        },
      ],
    },
    {
      id: 'key-apis',
      icon: '🔑',
      title: 'Key APIs',
      description: 'Essential browser APIs',
      content: [
        {
          type: 'table',
          headers: ['API', 'Purpose', 'Example'],
          rows: [
            ['querySelector()', 'Find one element', 'document.querySelector(".card")'],
            ['querySelectorAll()', 'Find all matching elements', 'document.querySelectorAll("li")'],
            ['addEventListener()', 'Attach event handler', 'el.addEventListener("click", fn)'],
            ['fetch()', 'HTTP requests', 'fetch(url).then(r => r.json())'],
            ['classList', 'Toggle CSS classes', 'el.classList.add("active")'],
            ['dataset', 'Read data-* attributes', 'el.dataset.userId'],
            ['localStorage', 'Persistent key-value storage', 'localStorage.setItem("key", val)'],
            ['setTimeout/setInterval', 'Timers', 'setTimeout(() => {}, 1000)'],
            ['IntersectionObserver', 'Visibility detection', 'new IntersectionObserver(callback)'],
            ['MutationObserver', 'DOM change detection', 'new MutationObserver(callback)'],
          ],
        },
        {
          type: 'subheading',
          text: 'Fetch API',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Fetch Patterns',
          code: `// GET request
const response = await fetch('/api/users');
const users = await response.json();

// POST request
const res = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice', email: 'alice@example.com' }),
});

// Error handling
if (!response.ok) {
  throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
}

// AbortController for cancellation
const controller = new AbortController();
fetch(url, { signal: controller.signal });
controller.abort(); // cancel the request`,
        },
        {
          type: 'tip',
          content: `fetch() doesn't reject on HTTP errors (404, 500). Always check response.ok or response.status before parsing the body.`,
        },
      ],
    },
    {
      id: 'common-patterns',
      icon: '🔄',
      title: 'Common Patterns',
      description: 'Widely-used vanilla JS patterns',
      content: [
        {
          type: 'subheading',
          text: 'Event Delegation',
        },
        {
          type: 'text',
          content: `Instead of attaching listeners to every child, attach one to the parent and use event.target to determine which child was clicked. This is more efficient and handles dynamically added elements.`,
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Event Delegation',
          code: `document.querySelector('.todo-list').addEventListener('click', (e) => {
  const item = e.target.closest('li');
  if (!item) return;

  if (e.target.matches('.delete-btn')) {
    item.remove();
  } else if (e.target.matches('.toggle')) {
    item.classList.toggle('completed');
  }
});`,
        },
        {
          type: 'subheading',
          text: 'Module Pattern',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'ES Modules',
          code: `// math.js
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }
export const PI = 3.14159;

// app.js
import { add, multiply, PI } from './math.js';
console.log(add(2, 3)); // 5`,
        },
        {
          type: 'subheading',
          text: 'Debounce & Throttle',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Debounce Implementation',
          code: `function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Usage: only fire after user stops typing for 300ms
const searchInput = document.querySelector('#search');
searchInput.addEventListener('input', debounce((e) => {
  performSearch(e.target.value);
}, 300));`,
        },
        {
          type: 'subheading',
          text: 'Pub/Sub Pattern',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Simple Event Emitter',
          code: `class EventEmitter {
  #listeners = new Map();

  on(event, callback) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, new Set());
    }
    this.#listeners.get(event).add(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    this.#listeners.get(event)?.delete(callback);
  }

  emit(event, ...args) {
    this.#listeners.get(event)?.forEach(cb => cb(...args));
  }
}`,
        },
      ],
    },
    {
      id: 'code-examples',
      icon: '💻',
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
  li.innerHTML = \`
    <span>\${fruit}</span>
    <button class="remove">x</button>
  \`;
  list.appendChild(li);
});

// Single delegated listener handles all buttons
list.addEventListener('click', (e) => {
  if (e.target.matches('.remove')) {
    e.target.closest('li').remove();
  }
});`,
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
      throw new Error(\`HTTP \${response.status}\`);
    }

    const users = await response.json();

    users.slice(0, 3).forEach(user => {
      console.log(\`\${user.name} — \${user.email}\`);
    });

    return users;
  } catch (error) {
    console.error('Fetch failed:', error.message);
  }
}

fetchUsers();`,
        },
      ],
    },
    {
      id: 'ecosystem',
      icon: '🌐',
      title: 'Ecosystem & Tools',
      description: 'Tools for vanilla JavaScript development',
      content: [
        {
          type: 'table',
          headers: ['Tool', 'Category', 'Description'],
          rows: [
            ['Vite', 'Build Tool', 'Lightning-fast dev server and bundler with native ES modules'],
            ['esbuild', 'Bundler', 'Extremely fast JavaScript bundler written in Go'],
            ['ESLint', 'Linting', 'Static analysis tool for identifying problematic patterns'],
            ['Prettier', 'Formatting', 'Opinionated code formatter for consistent style'],
            [
              'TypeScript',
              'Type Safety',
              'Typed superset of JavaScript — use with or without a framework',
            ],
            ['Vitest', 'Testing', 'Fast test runner that works with vanilla JS projects'],
            ['Playwright', 'E2E Testing', 'Cross-browser end-to-end testing framework'],
            ['Web Components', 'Standards', 'Native browser APIs for reusable custom elements'],
          ],
        },
        {
          type: 'tip',
          content: `You can use TypeScript without a framework. Run \`tsc --init\` to set up a tsconfig.json, and Vite or esbuild can compile .ts files directly.`,
        },
      ],
    },
  ],
};
