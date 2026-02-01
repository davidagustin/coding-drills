import type { FrontendDrillProblem } from '../types';

/**
 * Native JavaScript drill problems.
 * These problems use plain JS objects to simulate DOM structures
 * since the validator blocks window, document, fetch, and eval.
 */
export const nativeJsProblems: FrontendDrillProblem[] = [
  // DOM & Events
  {
    id: 'fe-js-query-class',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Query Elements by Class',
    text: 'Filter the elements array to find all elements with the class "active".',
    setup: 'An array of element objects with tagName, id, and classList properties.',
    setupCode: `const elements = [
  { tagName: "div", id: "a", classList: ["active", "card"] },
  { tagName: "span", id: "b", classList: ["hidden"] },
  { tagName: "div", id: "c", classList: ["active"] },
  { tagName: "p", id: "d", classList: [] }
];`,
    expected: [
      { tagName: 'div', id: 'a', classList: ['active', 'card'] },
      { tagName: 'div', id: 'c', classList: ['active'] },
    ],
    sample: 'elements.filter(el => el.classList.includes("active"))',
    hints: ['Use .filter() and .includes() methods', 'Check if classList array includes "active"'],
    tags: ['DOM', 'filter', 'classList', 'querySelector'],
  },

  {
    id: 'fe-js-event-delegation',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: 'Event Delegation Pattern',
    text: 'Given an array of click events (each with a target.id), filter only those where target.id starts with "btn-".',
    setup: 'An array of event objects with target.id properties.',
    setupCode: `const events = [
  { type: "click", target: { id: "btn-submit" } },
  { type: "click", target: { id: "link-home" } },
  { type: "click", target: { id: "btn-cancel" } },
  { type: "click", target: { id: "div-container" } },
  { type: "click", target: { id: "btn-delete" } }
];`,
    expected: [
      { type: 'click', target: { id: 'btn-submit' } },
      { type: 'click', target: { id: 'btn-cancel' } },
      { type: 'click', target: { id: 'btn-delete' } },
    ],
    sample: 'events.filter(e => e.target.id.startsWith("btn-"))',
    hints: ['Use .filter() with .startsWith()', 'Access target.id from each event object'],
    tags: ['events', 'delegation', 'filter', 'startsWith'],
  },

  // Common Patterns
  {
    id: 'fe-js-debounce-basic',
    framework: 'native-js',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Debounce Function',
    text: 'Implement a simple debounce function that delays execution until after a specified wait time.',
    setup: 'Return a debounce function that takes (func, wait) and returns a debounced version.',
    setupCode: `let callCount = 0;
const increment = () => { callCount++; };
const debounced = debounce(increment, 100);`,
    expected: 'function',
    sample: `function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}`,
    hints: [
      'Use setTimeout and clearTimeout',
      'Return a new function that clears previous timeout',
      'Store timeout in closure',
    ],
    tags: ['debounce', 'closure', 'setTimeout', 'performance'],
  },

  {
    id: 'fe-js-throttle-basic',
    framework: 'native-js',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Throttle Function',
    text: 'Implement a simple throttle function that ensures a function is called at most once per specified interval.',
    setup: 'Return a throttle function that takes (func, limit) and returns a throttled version.',
    setupCode: `let callCount = 0;
const increment = () => { callCount++; };
const throttled = throttle(increment, 100);`,
    expected: 'function',
    sample: `function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}`,
    hints: [
      'Use a flag to track throttle state',
      'Call function immediately if not throttled',
      'Reset flag after timeout',
    ],
    tags: ['throttle', 'closure', 'setTimeout', 'performance'],
  },

  {
    id: 'fe-js-localstorage-mock',
    framework: 'native-js',
    category: 'Common Patterns',
    difficulty: 'easy',
    title: 'LocalStorage Mock Operations',
    text: 'Using the provided storage object (a plain object), set "theme" to "dark" and return the value.',
    setup: 'A plain object simulating localStorage with setItem and getItem methods.',
    setupCode: `const storage = {
  data: {},
  setItem(key, value) { this.data[key] = value; },
  getItem(key) { return this.data[key]; }
};`,
    expected: 'dark',
    sample: `storage.setItem("theme", "dark");
const theme = storage.getItem("theme");`,
    hints: ['Call setItem to store the value', 'Call getItem to retrieve it'],
    tags: ['localStorage', 'storage', 'API'],
  },

  // Rendering
  {
    id: 'fe-js-build-html-string',
    framework: 'native-js',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'Build HTML String from Array',
    text: 'Given an array of items, create an HTML string of <li> elements.',
    setup: 'An array of fruit names.',
    setupCode: `const items = ["Apple", "Banana", "Cherry"];`,
    expected: '<li>Apple</li><li>Banana</li><li>Cherry</li>',
    sample: 'items.map(item => `<li>${item}</li>`).join("")',
    hints: [
      'Use .map() to transform each item',
      'Use template literals',
      'Join the array into a string',
    ],
    tags: ['innerHTML', 'map', 'template literals', 'rendering'],
  },

  {
    id: 'fe-js-create-element-object',
    framework: 'native-js',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'Create Element Object',
    text: 'Create an object representing a button element with tagName "button", textContent "Click me", and attributes object with class "btn-primary".',
    setup: 'Return an object that simulates a DOM element.',
    setupCode: `// Expected structure:
// { tagName: "button", textContent: "Click me", attributes: { class: "btn-primary" } }`,
    expected: {
      tagName: 'button',
      textContent: 'Click me',
      attributes: { class: 'btn-primary' },
    },
    sample: `const element = {
  tagName: "button",
  textContent: "Click me",
  attributes: { class: "btn-primary" }
};`,
    hints: ['Create a plain object with tagName, textContent, and attributes properties'],
    tags: ['createElement', 'DOM', 'object'],
  },

  // Data Fetching
  {
    id: 'fe-js-mock-fetch-promise',
    framework: 'native-js',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'Mock Fetch with Promise',
    text: 'Create a mockFetch function that returns a Promise resolving to { data: [1, 2, 3] } after 0ms.',
    setup: 'Return a function that returns a Promise.',
    setupCode: `// mockFetch should resolve to { data: [1, 2, 3] }`,
    expected: 'function',
    sample: `function mockFetch() {
  return Promise.resolve({ data: [1, 2, 3] });
}`,
    hints: [
      'Use Promise.resolve() to create a resolved promise',
      'Return an object with data property',
    ],
    tags: ['fetch', 'Promise', 'async', 'API'],
  },

  {
    id: 'fe-js-async-await-pattern',
    framework: 'native-js',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'Async/Await Data Extraction',
    text: 'Create an async function that calls mockFetch() and returns the data property from the result.',
    setup: 'A mockFetch function that returns Promise.resolve({ data: [1, 2, 3] }).',
    setupCode: `const mockFetch = () => Promise.resolve({ data: [1, 2, 3] });`,
    expected: 'function',
    sample: `async function getData() {
  const result = await mockFetch();
  return result.data;
}`,
    hints: [
      'Use async function keyword',
      'Use await to wait for the promise',
      'Return the data property',
    ],
    tags: ['async', 'await', 'Promise', 'data'],
  },

  // Forms & Validation
  {
    id: 'fe-js-email-validation',
    framework: 'native-js',
    category: 'Forms & Validation',
    difficulty: 'easy',
    title: 'Email Validation Function',
    text: 'Create a function isValidEmail(email) that returns true if the email contains "@" and ".", false otherwise.',
    setup: 'Return a validation function.',
    setupCode: `const testEmail = "user@example.com";`,
    expected: 'function',
    sample: `function isValidEmail(email) {
  return email.includes("@") && email.includes(".");
}`,
    hints: ['Use .includes() to check for both "@" and "."', 'Return a boolean'],
    tags: ['validation', 'forms', 'email', 'regex'],
  },

  {
    id: 'fe-js-form-data-extract',
    framework: 'native-js',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Extract Form Data from Array',
    text: 'Given an array of input objects with name and value properties, create an object mapping names to values.',
    setup: 'An array of form input objects.',
    setupCode: `const inputs = [
  { name: "username", value: "john" },
  { name: "email", value: "john@example.com" },
  { name: "age", value: "30" }
];`,
    expected: {
      username: 'john',
      email: 'john@example.com',
      age: '30',
    },
    sample: `inputs.reduce((acc, input) => {
  acc[input.name] = input.value;
  return acc;
}, {})`,
    hints: [
      'Use .reduce() to build an object',
      'Set acc[input.name] = input.value',
      'Start with empty object {}',
    ],
    tags: ['forms', 'reduce', 'object', 'FormData'],
  },

  {
    id: 'fe-js-password-strength',
    framework: 'native-js',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Password Strength Validator',
    text: 'Create a function checkPasswordStrength(password) that returns "weak" if length < 8, "medium" if length < 12, else "strong".',
    setup: 'Return a validation function.',
    setupCode: `const testPassword = "MyP@ssw0rd";`,
    expected: 'function',
    sample: `function checkPasswordStrength(password) {
  if (password.length < 8) return "weak";
  if (password.length < 12) return "medium";
  return "strong";
}`,
    hints: [
      'Check password.length',
      'Use if/else or ternary operators',
      'Return one of three strings',
    ],
    tags: ['validation', 'forms', 'password', 'security'],
  },
];
