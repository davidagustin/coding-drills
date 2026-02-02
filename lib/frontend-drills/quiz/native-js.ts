import type { FrontendQuizQuestion } from '../types';

export const nativeJsQuizQuestions: FrontendQuizQuestion[] = [
  {
    id: 'njs-q1',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'What is the difference between querySelector and querySelectorAll?',
    options: [
      'querySelector returns a live NodeList, querySelectorAll returns a static NodeList',
      'querySelector returns the first matching element, querySelectorAll returns all matching elements as a static NodeList',
      'querySelector is faster but less flexible than querySelectorAll',
      'querySelectorAll can only select by class, querySelector can use any CSS selector',
    ],
    correctAnswer:
      'querySelector returns the first matching element, querySelectorAll returns all matching elements as a static NodeList',
    explanation:
      'querySelector returns only the first element that matches the CSS selector, or null if none found. querySelectorAll returns a static (non-live) NodeList of all matching elements.',
  },
  {
    id: 'njs-q2',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'hard',
    question: 'What is event delegation and why is it useful?',
    options: [
      'Attaching event listeners to parent elements instead of individual children to handle events efficiently',
      'Passing events from one element to another manually',
      'Preventing events from bubbling up the DOM tree',
      'Delegating event handling to the browser instead of JavaScript',
    ],
    correctAnswer:
      'Attaching event listeners to parent elements instead of individual children to handle events efficiently',
    explanation:
      'Event delegation leverages event bubbling by attaching a single listener to a parent element instead of multiple listeners to children. This improves performance and handles dynamically added elements automatically.',
  },
  {
    id: 'njs-q3',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'What is the difference between event bubbling and event capturing?',
    codeSnippet: `element.addEventListener('click', handler, { capture: true });`,
    options: [
      'Bubbling goes from target to root, capturing goes from root to target',
      'Bubbling is faster than capturing',
      'Capturing is the default, bubbling requires explicit opt-in',
      'Bubbling works on all events, capturing only works on mouse events',
    ],
    correctAnswer: 'Bubbling goes from target to root, capturing goes from root to target',
    explanation:
      'Event bubbling (default) propagates from the target element up to the root. Event capturing (set with capture: true) propagates from the root down to the target element.',
  },
  {
    id: 'njs-q4',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'Which method creates a new DOM element?',
    options: [
      'document.createElement()',
      'document.querySelector()',
      'document.createNode()',
      'document.newElement()',
    ],
    correctAnswer: 'document.createElement()',
    explanation:
      'document.createElement(tagName) creates a new HTML element of the specified type. You then need to append it to the DOM using methods like appendChild() or append().',
  },
  {
    id: 'njs-q5',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'hard',
    question: 'What does the "once" option do in addEventListener?',
    codeSnippet: `button.addEventListener('click', handler, { once: true });`,
    options: [
      'Ensures the event fires only once per page load',
      'Automatically removes the listener after it fires once',
      'Prevents multiple rapid clicks (debouncing)',
      'Makes the event non-cancelable',
    ],
    correctAnswer: 'Automatically removes the listener after it fires once',
    explanation:
      'The { once: true } option automatically removes the event listener after it fires for the first time, eliminating the need to manually call removeEventListener().',
  },
  {
    id: 'njs-q6',
    framework: 'native-js',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What is the difference between localStorage and sessionStorage?',
    options: [
      'localStorage persists across browser sessions, sessionStorage is cleared when the tab closes',
      'localStorage is faster than sessionStorage',
      'sessionStorage has more storage capacity than localStorage',
      'localStorage is synchronous, sessionStorage is asynchronous',
    ],
    correctAnswer:
      'localStorage persists across browser sessions, sessionStorage is cleared when the tab closes',
    explanation:
      'localStorage data persists even after the browser is closed and reopened. sessionStorage data is only available for the duration of the page session (until the tab/window is closed).',
  },
  {
    id: 'njs-q7',
    framework: 'native-js',
    category: 'Rendering',
    difficulty: 'hard',
    question: 'When should you use requestAnimationFrame?',
    options: [
      "For smooth animations that sync with the browser's repaint cycle (60fps)",
      'For delayed execution like setTimeout',
      'For handling user input events',
      'For making HTTP requests',
    ],
    correctAnswer: "For smooth animations that sync with the browser's repaint cycle (60fps)",
    explanation:
      'requestAnimationFrame schedules a callback before the next browser repaint, ensuring smooth animations at 60fps. It automatically pauses when the tab is inactive, saving resources.',
  },
  {
    id: 'njs-q8',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'What does event.stopPropagation() do?',
    codeSnippet: `element.addEventListener('click', (e) => {
  e.stopPropagation();
  // ...
});`,
    options: [
      'Prevents the event from bubbling up to parent elements',
      'Prevents the default browser action',
      'Stops all other event listeners on the same element',
      'Cancels the event entirely',
    ],
    correctAnswer: 'Prevents the event from bubbling up to parent elements',
    explanation:
      'stopPropagation() stops the event from propagating up (bubbling) or down (capturing) the DOM tree. It does not prevent the default action (use preventDefault() for that).',
  },
  {
    id: 'njs-q9',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'Which property accesses the text content of an element without HTML tags?',
    options: ['element.textContent', 'element.innerHTML', 'element.innerText', 'element.value'],
    correctAnswer: 'element.textContent',
    explanation:
      'textContent returns the raw text content without HTML tags. innerHTML returns HTML markup. innerText returns visible text (considers CSS styling). value is for form inputs.',
  },
  {
    id: 'njs-q10',
    framework: 'native-js',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What is the purpose of DocumentFragment?',
    options: [
      'A lightweight container for building DOM structures off-screen before inserting them',
      'A way to fragment large documents into smaller pieces',
      'A method for partial page updates',
      'A storage mechanism for DOM references',
    ],
    correctAnswer:
      'A lightweight container for building DOM structures off-screen before inserting them',
    explanation:
      'DocumentFragment is a minimal document object that can hold DOM nodes. Building DOM structures in a fragment and then appending the fragment causes only one reflow, improving performance.',
  },
  // ─── DOM & Events (njs-q11 – njs-q27) ────────────────────────
  {
    id: 'njs-q11',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'Which property returns the parent node of a DOM element?',
    codeSnippet: `const child = document.querySelector('.child');
console.log(child.???);`,
    options: [
      'parentNode',
      'parentElement',
      'parentNode (returns any node) and parentElement (returns only Element nodes) both exist, but parentNode is the most general',
      'parent',
    ],
    correctAnswer: 'parentNode',
    explanation:
      'parentNode returns the parent of the specified node in the DOM tree. It can return any node type (Element, Document, DocumentFragment). parentElement is similar but returns null if the parent is not an Element.',
  },
  {
    id: 'njs-q12',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'What does element.classList.toggle() do?',
    codeSnippet: `button.classList.toggle('active');`,
    options: [
      'Adds the class if absent, removes it if present',
      'Always adds the class',
      'Replaces one class with another',
      'Toggles the element visibility',
    ],
    correctAnswer: 'Adds the class if absent, removes it if present',
    explanation:
      'classList.toggle(className) adds the class if the element does not have it and removes it if it does. It returns true if the class was added, false if removed.',
  },
  {
    id: 'njs-q13',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'How do you access custom data-* attributes on a DOM element?',
    codeSnippet: `<div id="user" data-user-id="42" data-role="admin"></div>`,
    options: [
      'element.dataset.userId and element.dataset.role',
      'element.data.userId and element.data.role',
      'element.getAttribute("userId") and element.getAttribute("role")',
      'element.customData.userId and element.customData.role',
    ],
    correctAnswer: 'element.dataset.userId and element.dataset.role',
    explanation:
      'The dataset API provides read/write access to data-* attributes. Hyphenated names are converted to camelCase: data-user-id becomes dataset.userId.',
  },
  {
    id: 'njs-q14',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'hard',
    question: 'What does MutationObserver allow you to do?',
    codeSnippet: `const observer = new MutationObserver((mutations) => {
  mutations.forEach(m => console.log(m.type));
});
observer.observe(targetNode, { childList: true, subtree: true });`,
    options: [
      'Watch for changes to the DOM tree such as added/removed nodes and attribute changes',
      'Observe changes to JavaScript variables',
      'Monitor network requests made by the page',
      'Track CSS style computations in real time',
    ],
    correctAnswer:
      'Watch for changes to the DOM tree such as added/removed nodes and attribute changes',
    explanation:
      'MutationObserver provides a way to asynchronously observe changes to the DOM. You can watch for child node additions/removals (childList), attribute changes (attributes), and text content changes (characterData).',
  },
  {
    id: 'njs-q15',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'hard',
    question: 'What does IntersectionObserver detect?',
    codeSnippet: `const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Element is visible');
    }
  });
}, { threshold: 0.5 });`,
    options: [
      'When an element enters or exits the viewport (or a specified root element)',
      'When two DOM elements overlap each other',
      'When a CSS animation completes on an element',
      'When the user hovers over an element',
    ],
    correctAnswer: 'When an element enters or exits the viewport (or a specified root element)',
    explanation:
      'IntersectionObserver asynchronously observes changes in the intersection of a target element with an ancestor element or the viewport. The threshold option specifies what percentage of visibility triggers the callback.',
  },
  {
    id: 'njs-q16',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'What is the purpose of ResizeObserver?',
    options: [
      'To observe changes to the dimensions of a DOM element',
      'To resize the browser window programmatically',
      'To detect screen orientation changes',
      'To observe changes to the viewport size only',
    ],
    correctAnswer: 'To observe changes to the dimensions of a DOM element',
    explanation:
      "ResizeObserver reports changes to the content rect dimensions of observed elements. Unlike the window resize event, it works on individual elements and fires when an element's size changes for any reason.",
  },
  {
    id: 'njs-q17',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'medium',
    question:
      'Which pointer event property tells you whether the input is from a mouse, pen, or touch?',
    codeSnippet: `element.addEventListener('pointerdown', (e) => {
  console.log(e.???); // "mouse", "pen", or "touch"
});`,
    options: ['pointerType', 'inputType', 'deviceType', 'sourceType'],
    correctAnswer: 'pointerType',
    explanation:
      'The pointerType property of PointerEvent indicates the device type that caused the event. Values include "mouse", "pen", and "touch".',
  },
  {
    id: 'njs-q18',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'medium',
    question:
      'Which keyboard event property should you use to identify the key pressed, regardless of keyboard layout?',
    codeSnippet: `document.addEventListener('keydown', (e) => {
  // Which property gives a layout-independent identifier?
});`,
    options: ['e.code', 'e.key', 'e.keyCode', 'e.charCode'],
    correctAnswer: 'e.code',
    explanation:
      'event.code represents the physical key on the keyboard (e.g., "KeyA") and is layout-independent. event.key represents the character produced (e.g., "a" or "q" on AZERTY). keyCode and charCode are deprecated.',
  },
  {
    id: 'njs-q19',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'What is the difference between the focus and focusin events?',
    options: [
      'focusin bubbles up the DOM tree, focus does not',
      'focus bubbles up the DOM tree, focusin does not',
      'focus works only on inputs, focusin works on any element',
      'They are identical and interchangeable',
    ],
    correctAnswer: 'focusin bubbles up the DOM tree, focus does not',
    explanation:
      'The focus event does not bubble, so you cannot use event delegation with it. The focusin event does bubble, making it suitable for delegation. The same relationship exists between blur (no bubble) and focusout (bubbles).',
  },
  {
    id: 'njs-q20',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'How do you create and dispatch a custom event with data?',
    codeSnippet: `const event = new CustomEvent('userLogin', {
  detail: { userId: 42 },
  bubbles: true
});
element.dispatchEvent(event);`,
    options: [
      'Use new CustomEvent() with a detail property, then call dispatchEvent()',
      'Use new Event() with a data property, then call emit()',
      'Use document.createEvent() and set the payload property',
      'Use element.trigger() with a data object',
    ],
    correctAnswer: 'Use new CustomEvent() with a detail property, then call dispatchEvent()',
    explanation:
      'CustomEvent accepts an optional second argument with detail (custom data), bubbles, and cancelable properties. The event is fired via dispatchEvent(). Listeners access the data through event.detail.',
  },
  {
    id: 'njs-q21',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'Which method returns the next sibling element (skipping text nodes)?',
    options: ['nextElementSibling', 'nextSibling', 'nextNode', 'siblingElement'],
    correctAnswer: 'nextElementSibling',
    explanation:
      'nextElementSibling returns the next sibling that is an Element, skipping text and comment nodes. nextSibling returns the very next sibling node, which may be a text or comment node.',
  },
  {
    id: 'njs-q22',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'hard',
    question: 'What does event.composedPath() return?',
    codeSnippet: `document.addEventListener('click', (e) => {
  console.log(e.composedPath());
});`,
    options: [
      'An array of objects representing the event propagation path from target to window',
      'The CSS selector path of the clicked element',
      'An array of all event listeners attached to the target',
      'The DOM tree path from document root to the element',
    ],
    correctAnswer:
      'An array of objects representing the event propagation path from target to window',
    explanation:
      'composedPath() returns an array of EventTargets representing the path the event will travel during propagation. It includes shadow DOM boundaries when the event is composed.',
  },
  {
    id: 'njs-q23',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'How do you detect when the user scrolls to the bottom of a page?',
    codeSnippet: `window.addEventListener('scroll', () => {
  const atBottom = ???;
});`,
    options: [
      'window.innerHeight + window.scrollY >= document.body.offsetHeight',
      'window.scrollTop >= document.body.scrollHeight',
      'document.scrollY === document.maxScroll',
      'window.pageOffset >= document.body.clientHeight',
    ],
    correctAnswer: 'window.innerHeight + window.scrollY >= document.body.offsetHeight',
    explanation:
      'window.innerHeight is the viewport height, window.scrollY is how far the page has been scrolled. When their sum equals or exceeds document.body.offsetHeight (the full page height), the user has reached the bottom.',
  },
  {
    id: 'njs-q24',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'easy',
    question:
      'Which property of a touch event gives you the list of all current touches on the screen?',
    options: ['event.touches', 'event.touchList', 'event.fingers', 'event.contacts'],
    correctAnswer: 'event.touches',
    explanation:
      'The touches property returns a TouchList of all current points of contact on the touch surface. changedTouches gives touches that changed in this event, and targetTouches gives touches on the target element.',
  },
  {
    id: 'njs-q25',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'What does element.closest() do?',
    codeSnippet: `const card = event.target.closest('.card');`,
    options: [
      'Traverses up from the element and returns the first ancestor that matches the selector',
      'Returns the nearest sibling element matching the selector',
      'Finds the closest child element matching the selector',
      'Returns the element with the shortest distance on screen',
    ],
    correctAnswer:
      'Traverses up from the element and returns the first ancestor that matches the selector',
    explanation:
      'closest() walks up the DOM tree from the current element (including itself) and returns the first element that matches the given CSS selector. It returns null if no match is found.',
  },
  {
    id: 'njs-q26',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'hard',
    question: 'What is the difference between childNodes and children?',
    codeSnippet: `const parent = document.getElementById('list');
console.log(parent.childNodes.length); // e.g. 7
console.log(parent.children.length);   // e.g. 3`,
    options: [
      'childNodes includes all node types (text, comment, element); children includes only Element nodes',
      'childNodes is a static collection; children is a live collection',
      'children includes text nodes; childNodes includes only elements',
      'childNodes is deprecated in favor of children',
    ],
    correctAnswer:
      'childNodes includes all node types (text, comment, element); children includes only Element nodes',
    explanation:
      'childNodes returns a live NodeList containing all child nodes, including text nodes (whitespace) and comments. children returns a live HTMLCollection containing only child elements. This is why their lengths often differ.',
  },
  {
    id: 'njs-q27',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'Which classList method checks if an element has a specific CSS class?',
    codeSnippet: `if (element.classList.??('active')) {
  // do something
}`,
    options: ['contains', 'has', 'includes', 'check'],
    correctAnswer: 'contains',
    explanation:
      'classList.contains(className) returns true if the element has the specified class, false otherwise. Despite Array having includes(), DOMTokenList uses contains().',
  },
  // ─── State & Lifecycle (njs-q28 – njs-q44) ───────────────────
  {
    id: 'njs-q28',
    framework: 'native-js',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    question: 'What happens when you store an object in localStorage?',
    codeSnippet: `localStorage.setItem('user', { name: 'Alice' });
console.log(localStorage.getItem('user'));`,
    options: [
      'The object is converted to the string "[object Object]"',
      'The object is automatically serialized to JSON',
      'An error is thrown because only strings are allowed',
      'The object is stored as-is and can be retrieved directly',
    ],
    correctAnswer: 'The object is converted to the string "[object Object]"',
    explanation:
      'localStorage.setItem() calls toString() on the value. For objects, this produces "[object Object]". To store objects, you must explicitly use JSON.stringify() when setting and JSON.parse() when getting.',
  },
  {
    id: 'njs-q29',
    framework: 'native-js',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'How do you navigate the browser history without a full page reload?',
    codeSnippet: `history.pushState({ page: 2 }, '', '/page/2');`,
    options: [
      'history.pushState() adds an entry to the session history stack without reloading the page',
      'history.navigate() changes the URL and updates the DOM',
      'window.location.replace() updates the URL without reloading',
      'document.location.push() adds to the history stack',
    ],
    correctAnswer:
      'history.pushState() adds an entry to the session history stack without reloading the page',
    explanation:
      'history.pushState(state, title, url) adds a new entry to the browser history. The URL in the address bar changes but no page load occurs. The popstate event fires when the user navigates back/forward.',
  },
  {
    id: 'njs-q30',
    framework: 'native-js',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'How do you parse and modify query parameters with the URL API?',
    codeSnippet: `const url = new URL('https://example.com?page=1&sort=name');
url.searchParams.set('page', '2');
url.searchParams.append('filter', 'active');
console.log(url.toString());`,
    options: [
      '"https://example.com/?page=2&sort=name&filter=active"',
      '"https://example.com?page=1&sort=name&page=2&filter=active"',
      '"https://example.com/?page=2&filter=active"',
      'An error because URL objects are immutable',
    ],
    correctAnswer: '"https://example.com/?page=2&sort=name&filter=active"',
    explanation:
      'URLSearchParams.set() replaces the value if the key exists. append() adds a new key-value pair. The URL object is mutable, and toString() returns the full updated URL.',
  },
  {
    id: 'njs-q31',
    framework: 'native-js',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'What does the Performance API method performance.mark() do?',
    codeSnippet: `performance.mark('start-render');
// ... rendering work ...
performance.mark('end-render');
performance.measure('render-time', 'start-render', 'end-render');`,
    options: [
      'Creates a named timestamp in the performance timeline for measuring durations',
      'Pauses execution and marks the current call stack for profiling',
      'Adds a visual marker in the browser DevTools timeline',
      'Sets a breakpoint for the performance profiler',
    ],
    correctAnswer: 'Creates a named timestamp in the performance timeline for measuring durations',
    explanation:
      'performance.mark() creates a named PerformanceEntry in the performance timeline. performance.measure() then calculates the duration between two marks. These entries can be retrieved with performance.getEntriesByName().',
  },
  {
    id: 'njs-q32',
    framework: 'native-js',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What does the Page Visibility API allow you to detect?',
    codeSnippet: `document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    // pause video, save state
  }
});`,
    options: [
      'Whether the page is currently visible to the user or hidden (e.g., tab switched)',
      'Whether an element is visible within the viewport',
      'Whether the user is actively looking at the screen',
      'Whether the browser window is minimized or maximized',
    ],
    correctAnswer:
      'Whether the page is currently visible to the user or hidden (e.g., tab switched)',
    explanation:
      'The Page Visibility API fires a visibilitychange event when the user switches tabs or minimizes the window. document.visibilityState is either "visible" or "hidden". This is useful for pausing media, reducing network usage, or saving state.',
  },
  {
    id: 'njs-q33',
    framework: 'native-js',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'When does the beforeunload event fire?',
    codeSnippet: `window.addEventListener('beforeunload', (e) => {
  e.preventDefault();
  e.returnValue = '';
});`,
    options: [
      'Just before the page is unloaded (navigating away, closing tab, or refreshing)',
      'After the DOM has been completely removed from memory',
      'When the browser starts loading a new page',
      'When the user clicks the back button only',
    ],
    correctAnswer: 'Just before the page is unloaded (navigating away, closing tab, or refreshing)',
    explanation:
      'beforeunload fires when the window is about to be unloaded. Setting e.returnValue to a non-empty string (or calling e.preventDefault()) triggers a browser confirmation dialog asking the user if they really want to leave.',
  },
  {
    id: 'njs-q34',
    framework: 'native-js',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    question: 'What is the difference between DOMContentLoaded and the load event?',
    options: [
      'DOMContentLoaded fires when HTML is parsed; load fires after all resources (images, styles) finish loading',
      'load fires first, then DOMContentLoaded fires',
      'DOMContentLoaded fires when CSS is ready; load fires when JavaScript is ready',
      'They fire at the same time but on different targets',
    ],
    correctAnswer:
      'DOMContentLoaded fires when HTML is parsed; load fires after all resources (images, styles) finish loading',
    explanation:
      'DOMContentLoaded fires when the HTML document has been completely parsed and all deferred scripts have run, without waiting for images or stylesheets. The load event fires only after all resources have finished loading.',
  },
  {
    id: 'njs-q35',
    framework: 'native-js',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'What is requestIdleCallback used for?',
    codeSnippet: `requestIdleCallback((deadline) => {
  while (deadline.timeRemaining() > 0) {
    doNonCriticalWork();
  }
});`,
    options: [
      'Scheduling low-priority work to run when the browser is idle between frames',
      'Detecting when the user is inactive for a period of time',
      'Requesting the browser to enter an idle/sleep state',
      'Pausing all JavaScript execution until the next user interaction',
    ],
    correctAnswer: 'Scheduling low-priority work to run when the browser is idle between frames',
    explanation:
      'requestIdleCallback schedules a callback to run during idle periods between frames. The deadline parameter tells you how much time remains. This is ideal for analytics, pre-fetching, or other non-critical tasks that should not block the main thread.',
  },
  {
    id: 'njs-q36',
    framework: 'native-js',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'How do you send a message to a Web Worker and receive a response?',
    codeSnippet: `// main.js
const worker = new Worker('worker.js');
worker.postMessage({ type: 'compute', data: [1, 2, 3] });
worker.onmessage = (e) => console.log(e.data);

// worker.js
self.onmessage = (e) => {
  const result = e.data.data.reduce((a, b) => a + b, 0);
  self.postMessage(result);
};`,
    options: [
      'Use postMessage() to send data and the onmessage handler to receive responses',
      'Use worker.send() and worker.on("response") for bidirectional communication',
      'Workers share the same scope as the main thread and can access variables directly',
      'Use SharedArrayBuffer as the only communication channel',
    ],
    correctAnswer: 'Use postMessage() to send data and the onmessage handler to receive responses',
    explanation:
      'Web Workers communicate via the postMessage()/onmessage pattern. Data is serialized (structured clone algorithm) when sent. Workers run on a separate thread and cannot access the DOM directly.',
  },
  {
    id: 'njs-q37',
    framework: 'native-js',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    question: 'What does sessionStorage.clear() do?',
    options: [
      'Removes all key-value pairs from sessionStorage for the current origin',
      'Removes all key-value pairs from both sessionStorage and localStorage',
      'Clears the browser cache for the current page',
      'Resets the session cookie',
    ],
    correctAnswer: 'Removes all key-value pairs from sessionStorage for the current origin',
    explanation:
      'sessionStorage.clear() removes all items stored in sessionStorage for the current origin. It does not affect localStorage or storage from other origins.',
  },
  {
    id: 'njs-q38',
    framework: 'native-js',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question:
      'What event fires when the user navigates using the browser back/forward buttons after pushState?',
    codeSnippet: `window.addEventListener('???', (event) => {
  console.log(event.state); // state object from pushState
});`,
    options: ['popstate', 'hashchange', 'navigate', 'statechange'],
    correctAnswer: 'popstate',
    explanation:
      'The popstate event fires when the user navigates through history entries created by pushState() or replaceState(). The event.state property contains the state object that was passed to pushState().',
  },
  {
    id: 'njs-q39',
    framework: 'native-js',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    question: 'How do you check the number of entries in localStorage?',
    options: [
      'localStorage.length',
      'localStorage.size',
      'localStorage.count()',
      'Object.keys(localStorage).length only; there is no length property',
    ],
    correctAnswer: 'localStorage.length',
    explanation:
      'localStorage.length returns the number of key-value pairs stored. You can also use localStorage.key(index) to get the key name at a specific index.',
  },
  {
    id: 'njs-q40',
    framework: 'native-js',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What is the correct order of script-related events during page load?',
    options: [
      'DOMContentLoaded fires first, then load on window',
      'load fires first, then DOMContentLoaded',
      'Both fire simultaneously when the DOM is ready',
      'DOMContentLoaded fires on document, load never fires on window',
    ],
    correctAnswer: 'DOMContentLoaded fires first, then load on window',
    explanation:
      'The page lifecycle order is: HTML parsing completes -> DOMContentLoaded fires on document -> all subresources (images, iframes, etc.) finish loading -> load fires on window.',
  },
  {
    id: 'njs-q41',
    framework: 'native-js',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'How does the "storage" event work for cross-tab communication?',
    codeSnippet: `// Tab A
localStorage.setItem('theme', 'dark');

// Tab B
window.addEventListener('storage', (e) => {
  console.log(e.key, e.oldValue, e.newValue);
});`,
    options: [
      'The storage event fires in OTHER tabs/windows of the same origin when localStorage changes',
      'The storage event fires in the SAME tab that made the change',
      'The storage event fires in all tabs including the one that made the change',
      'The storage event only works with sessionStorage, not localStorage',
    ],
    correctAnswer:
      'The storage event fires in OTHER tabs/windows of the same origin when localStorage changes',
    explanation:
      'The storage event is fired on the window object in every tab/window of the same origin EXCEPT the one that made the change. This makes it useful for cross-tab communication. The event includes key, oldValue, newValue, and storageArea.',
  },
  {
    id: 'njs-q42',
    framework: 'native-js',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What does performance.now() return?',
    codeSnippet: `const start = performance.now();
doExpensiveOperation();
const end = performance.now();
console.log(\`Took \${end - start}ms\`);`,
    options: [
      'A high-resolution timestamp in milliseconds since the page started loading (time origin)',
      'The current Unix timestamp in milliseconds',
      'The time since the browser was opened in seconds',
      'The CPU time consumed by the current script',
    ],
    correctAnswer:
      'A high-resolution timestamp in milliseconds since the page started loading (time origin)',
    explanation:
      'performance.now() returns a DOMHighResTimeStamp measured in milliseconds from the time origin (when the page started loading). Unlike Date.now(), it provides sub-millisecond precision and is monotonic (not affected by system clock changes).',
  },
  {
    id: 'njs-q43',
    framework: 'native-js',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    question: 'What attribute makes a <script> tag non-blocking during HTML parsing?',
    codeSnippet: `<script ??? src="app.js"></script>`,
    options: ['defer or async', 'nonblocking', 'lazy', 'background'],
    correctAnswer: 'defer or async',
    explanation:
      'The defer attribute downloads the script in parallel and executes it after HTML parsing completes (before DOMContentLoaded). The async attribute downloads in parallel and executes immediately when ready, potentially interrupting parsing.',
  },
  {
    id: 'njs-q44',
    framework: 'native-js',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'What happens when you import an ES module multiple times in different files?',
    codeSnippet: `// a.js
import { counter } from './module.js';
// b.js
import { counter } from './module.js';`,
    options: [
      'The module is executed only once; both imports share the same module instance',
      'The module is executed separately for each import, creating independent instances',
      'The second import throws an error for duplicate imports',
      'Each import gets a deep copy of the module exports',
    ],
    correctAnswer: 'The module is executed only once; both imports share the same module instance',
    explanation:
      'ES modules are singletons. The module code executes only once on first import. All subsequent imports in any file receive references to the same module instance. This is why module-level state is shared.',
  },
  // ─── Common Patterns (njs-q45 – njs-q61) ─────────────────────
  {
    id: 'njs-q45',
    framework: 'native-js',
    category: 'Common Patterns',
    difficulty: 'easy',
    question: 'What is a closure in JavaScript?',
    codeSnippet: `function makeCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}
const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2`,
    options: [
      'A function that retains access to variables from its outer (enclosing) scope even after that scope has returned',
      'A function that closes over the global scope only',
      'A self-invoking function that runs immediately',
      'A function that prevents garbage collection of all variables',
    ],
    correctAnswer:
      'A function that retains access to variables from its outer (enclosing) scope even after that scope has returned',
    explanation:
      'A closure is formed when an inner function captures variables from its outer function\'s scope. The inner function "closes over" those variables, keeping them alive even after the outer function has returned.',
  },
  {
    id: 'njs-q46',
    framework: 'native-js',
    category: 'Common Patterns',
    difficulty: 'easy',
    question: 'What is an IIFE (Immediately Invoked Function Expression)?',
    codeSnippet: `(function() {
  const privateVar = 'secret';
  console.log(privateVar);
})();`,
    options: [
      'A function that is defined and executed immediately, creating its own scope',
      'A function that is invoked only once and then deleted from memory',
      'A function that runs before the DOM is ready',
      'A named function that can only be called once',
    ],
    correctAnswer: 'A function that is defined and executed immediately, creating its own scope',
    explanation:
      'An IIFE is a function expression that is invoked immediately after creation. It creates a private scope, preventing variables from leaking into the global scope. Before ES6 modules, IIFEs were the primary way to create module-like encapsulation.',
  },
  {
    id: 'njs-q47',
    framework: 'native-js',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What does the Revealing Module Pattern accomplish?',
    codeSnippet: `const userModule = (function() {
  let _name = '';
  function setName(name) { _name = name; }
  function getName() { return _name; }
  return { setName, getName };
})();`,
    options: [
      'Exposes only selected functions/variables as a public API while keeping internal implementation private',
      'Reveals all internal variables for debugging purposes',
      'Automatically documents the module interface',
      'Creates a class-like structure with inheritance',
    ],
    correctAnswer:
      'Exposes only selected functions/variables as a public API while keeping internal implementation private',
    explanation:
      'The Revealing Module Pattern uses an IIFE with a return statement that maps private functions to public names. Internal variables like _name remain private, while setName and getName are exposed as the public API.',
  },
  {
    id: 'njs-q48',
    framework: 'native-js',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'How does the Observer pattern work in JavaScript?',
    codeSnippet: `class EventEmitter {
  constructor() { this.listeners = {}; }
  on(event, fn) {
    (this.listeners[event] ||= []).push(fn);
  }
  emit(event, data) {
    (this.listeners[event] || []).forEach(fn => fn(data));
  }
}`,
    options: [
      'Objects (observers) subscribe to events on a subject and are notified when events occur',
      'One object watches another for property changes using Object.observe()',
      'The browser observes DOM mutations automatically',
      'A single callback is registered to handle all events globally',
    ],
    correctAnswer:
      'Objects (observers) subscribe to events on a subject and are notified when events occur',
    explanation:
      'The Observer (pub/sub) pattern lets objects subscribe to events and be notified when those events occur. The subject maintains a list of observers and broadcasts to them. This decouples event producers from consumers.',
  },
  {
    id: 'njs-q49',
    framework: 'native-js',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'How can you implement a Singleton pattern in JavaScript?',
    codeSnippet: `class Database {
  constructor() {
    if (Database.instance) return Database.instance;
    this.connection = createConnection();
    Database.instance = this;
  }
}
const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2);`,
    options: [
      'true - both variables reference the same instance',
      'false - each new call creates a separate instance',
      'An error is thrown on the second instantiation',
      'true - but only because JavaScript caches all constructor calls',
    ],
    correctAnswer: 'true - both variables reference the same instance',
    explanation:
      'The Singleton pattern ensures only one instance exists. In this implementation, the constructor checks for an existing instance and returns it if found. Both db1 and db2 point to the same object.',
  },
  {
    id: 'njs-q50',
    framework: 'native-js',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What is the Factory pattern used for?',
    codeSnippet: `function createUser(type) {
  switch(type) {
    case 'admin': return new AdminUser();
    case 'editor': return new EditorUser();
    default: return new BasicUser();
  }
}`,
    options: [
      'Creating objects without specifying the exact class, delegating instantiation logic to a function',
      'Manufacturing DOM elements in bulk for performance',
      'Automatically generating getter and setter methods',
      'Creating a factory of event listeners',
    ],
    correctAnswer:
      'Creating objects without specifying the exact class, delegating instantiation logic to a function',
    explanation:
      'The Factory pattern encapsulates object creation logic. The caller does not need to know about specific classes; it just asks the factory for an object. This makes it easy to add new types without changing consuming code.',
  },
  {
    id: 'njs-q51',
    framework: 'native-js',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'How does the Strategy pattern work?',
    codeSnippet: `const strategies = {
  bubble: (arr) => { /* bubble sort */ },
  quick: (arr) => { /* quick sort */ },
  merge: (arr) => { /* merge sort */ },
};
function sort(arr, algorithm = 'quick') {
  return strategies[algorithm](arr);
}`,
    options: [
      'Defines a family of interchangeable algorithms and lets the client choose which one to use at runtime',
      'Selects the best algorithm automatically based on input size',
      'Chains multiple algorithms together in sequence',
      'Runs all algorithms in parallel and returns the fastest result',
    ],
    correctAnswer:
      'Defines a family of interchangeable algorithms and lets the client choose which one to use at runtime',
    explanation:
      'The Strategy pattern encapsulates algorithms in separate objects/functions and makes them interchangeable. The context (sort function) delegates to the chosen strategy, allowing the algorithm to vary independently from the code that uses it.',
  },
  {
    id: 'njs-q52',
    framework: 'native-js',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What is WeakMap commonly used for in JavaScript patterns?',
    codeSnippet: `const privateData = new WeakMap();
class User {
  constructor(name) {
    privateData.set(this, { name });
  }
  getName() {
    return privateData.get(this).name;
  }
}`,
    options: [
      'Storing private data associated with objects without preventing garbage collection',
      'Creating a faster version of Map for string keys',
      'Caching DOM elements for faster lookups',
      'Storing weak references to primitive values',
    ],
    correctAnswer:
      'Storing private data associated with objects without preventing garbage collection',
    explanation:
      'WeakMap holds weak references to its keys (which must be objects). When the key object is garbage collected, the entry is automatically removed. This makes WeakMap ideal for private data, metadata, or caching associated with objects.',
  },
  {
    id: 'njs-q53',
    framework: 'native-js',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'What is a practical use of Symbol in JavaScript?',
    codeSnippet: `const LOG_LEVEL = Symbol('logLevel');
class Logger {
  constructor(level) {
    this[LOG_LEVEL] = level; // truly private-ish property
  }
}
const logger = new Logger('debug');
console.log(Object.keys(logger)); // []`,
    options: [
      'Creating unique, non-enumerable property keys that avoid naming collisions',
      'Generating random unique IDs for database records',
      'Creating immutable string constants',
      'Encrypting property values for security',
    ],
    correctAnswer: 'Creating unique, non-enumerable property keys that avoid naming collisions',
    explanation:
      'Symbols are guaranteed unique primitives. Symbol-keyed properties do not appear in Object.keys(), for...in, or JSON.stringify(). They are useful for "hidden" properties, avoiding name collisions in shared objects, and defining well-known protocols (e.g., Symbol.iterator).',
  },
  {
    id: 'njs-q54',
    framework: 'native-js',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'How does the Decorator pattern work in JavaScript?',
    codeSnippet: `function withTimestamp(fn) {
  return function(...args) {
    console.log(\`[\${new Date().toISOString()}]\`);
    return fn.apply(this, args);
  };
}
const logMessage = withTimestamp(console.log);
logMessage('Hello');`,
    options: [
      'Wraps an existing function or object to extend its behavior without modifying its source code',
      'Adds CSS decorations to DOM elements',
      'Creates a subclass that overrides parent methods',
      'Applies TypeScript decorators at runtime',
    ],
    correctAnswer:
      'Wraps an existing function or object to extend its behavior without modifying its source code',
    explanation:
      'The Decorator pattern wraps a function or object with additional behavior. In JavaScript, higher-order functions (functions that take/return functions) are a natural way to implement decorators. The original function is unchanged.',
  },
  {
    id: 'njs-q55',
    framework: 'native-js',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'What does a JavaScript Proxy allow you to do?',
    codeSnippet: `const handler = {
  get(target, prop) {
    return prop in target ? target[prop] : \`Property "\${prop}" not found\`;
  },
  set(target, prop, value) {
    if (typeof value !== 'string') throw new TypeError('Only strings allowed');
    target[prop] = value;
    return true;
  }
};
const obj = new Proxy({}, handler);`,
    options: [
      'Intercept and customize fundamental operations on an object (get, set, delete, etc.)',
      'Create a network proxy for HTTP requests',
      'Clone an object with a different prototype',
      'Prevent all modifications to an object like Object.freeze()',
    ],
    correctAnswer:
      'Intercept and customize fundamental operations on an object (get, set, delete, etc.)',
    explanation:
      'Proxy wraps an object and lets you define traps (handler functions) for fundamental operations: get, set, has, deleteProperty, apply, construct, and more. This enables validation, logging, default values, and reactive systems.',
  },
  {
    id: 'njs-q56',
    framework: 'native-js',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'How do generators work in JavaScript?',
    codeSnippet: `function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}
const gen = range(1, 3);
console.log(gen.next()); // ?`,
    options: [
      '{ value: 1, done: false } - generators yield values one at a time and pause between yields',
      '{ value: [1, 2, 3], done: true } - generators return all values at once',
      '1 - generators return plain values',
      'undefined - the generator has not started yet',
    ],
    correctAnswer:
      '{ value: 1, done: false } - generators yield values one at a time and pause between yields',
    explanation:
      'Generator functions (function*) produce iterators. Each call to next() resumes execution until the next yield, returning { value, done }. The generator pauses at each yield, enabling lazy evaluation and custom iteration.',
  },
  {
    id: 'njs-q57',
    framework: 'native-js',
    category: 'Common Patterns',
    difficulty: 'easy',
    question: 'What is WeakSet used for?',
    options: [
      'Storing a set of objects with weak references, allowing garbage collection when no other references exist',
      'Storing a set of strings with weak comparison',
      'Creating a set that automatically removes duplicates by value',
      'A faster version of Set for small collections',
    ],
    correctAnswer:
      'Storing a set of objects with weak references, allowing garbage collection when no other references exist',
    explanation:
      'WeakSet holds weak references to objects (only objects, not primitives). If an object in a WeakSet has no other references, it can be garbage collected. Common uses include tracking visited objects or marking objects without modifying them.',
  },
  {
    id: 'njs-q58',
    framework: 'native-js',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What is the pub/sub pattern and how does it differ from the Observer pattern?',
    options: [
      'Pub/sub uses a central event bus/channel between publishers and subscribers, decoupling them more than direct Observer',
      'Pub/sub and Observer are identical patterns with different names',
      'Pub/sub is synchronous while Observer is asynchronous',
      'Observer uses a central bus while pub/sub requires direct references',
    ],
    correctAnswer:
      'Pub/sub uses a central event bus/channel between publishers and subscribers, decoupling them more than direct Observer',
    explanation:
      'In the Observer pattern, the subject directly notifies its observers. In pub/sub, publishers emit events to a central broker/bus, and subscribers listen on that bus. Neither knows about the other, providing greater decoupling.',
  },
  {
    id: 'njs-q59',
    framework: 'native-js',
    category: 'Common Patterns',
    difficulty: 'easy',
    question: 'What does Object.freeze() do to an object?',
    codeSnippet: `const config = Object.freeze({ api: '/v1', timeout: 3000 });
config.timeout = 5000;
console.log(config.timeout);`,
    options: [
      '3000 - Object.freeze() prevents any modifications to the object',
      '5000 - the assignment succeeds normally',
      'undefined - the property is deleted after freeze',
      'An error is always thrown',
    ],
    correctAnswer: '3000 - Object.freeze() prevents any modifications to the object',
    explanation:
      'Object.freeze() makes an object immutable: no adding, removing, or modifying properties. In non-strict mode, assignments silently fail. In strict mode, they throw a TypeError. Note: freeze is shallow; nested objects are not frozen.',
  },
  {
    id: 'njs-q60',
    framework: 'native-js',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'How can you implement the Iterator protocol to make a custom object iterable?',
    codeSnippet: `const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { done: true };
      }
    };
  }
};
console.log([...range]);`,
    options: [
      '[1, 2, 3, 4, 5] - implementing Symbol.iterator makes the object work with for...of and spread',
      'An error because plain objects cannot be iterable',
      '{ from: 1, to: 5 } - spread copies the object properties',
      '[1, 5] - only from and to values are yielded',
    ],
    correctAnswer:
      '[1, 2, 3, 4, 5] - implementing Symbol.iterator makes the object work with for...of and spread',
    explanation:
      'The Iterator protocol requires an object to have a [Symbol.iterator]() method returning an iterator with a next() method. This makes it work with for...of, spread, destructuring, Array.from(), and other iteration contexts.',
  },
  {
    id: 'njs-q61',
    framework: 'native-js',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What is the Module pattern (pre-ES6) and what problem does it solve?',
    codeSnippet: `const myModule = (function() {
  let _private = 0;
  return {
    increment() { _private++; },
    getCount() { return _private; }
  };
})();`,
    options: [
      'Uses an IIFE to create private scope, exposing only a public API through the returned object',
      'Uses ES6 import/export to share code between files',
      'Creates a global namespace object to avoid pollution',
      'Wraps code in a try/catch for error isolation',
    ],
    correctAnswer:
      'Uses an IIFE to create private scope, exposing only a public API through the returned object',
    explanation:
      'The Module pattern uses an IIFE to create closure-based privacy. Variables declared inside the IIFE are private. Only the returned object is accessible externally. This was the primary encapsulation mechanism before ES6 modules.',
  },
  // ─── Rendering (njs-q62 – njs-q78) ───────────────────────────
  {
    id: 'njs-q62',
    framework: 'native-js',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'What is the difference between innerHTML and textContent?',
    codeSnippet: `element.innerHTML = '<b>Hello</b>';  // renders bold text
element.textContent = '<b>Hello</b>'; // renders literal string`,
    options: [
      'innerHTML parses and renders HTML markup; textContent treats everything as plain text',
      'textContent is faster and parses HTML; innerHTML treats everything as plain text',
      'innerHTML works only on div elements; textContent works on all elements',
      'They are identical but innerHTML is deprecated',
    ],
    correctAnswer:
      'innerHTML parses and renders HTML markup; textContent treats everything as plain text',
    explanation:
      'innerHTML parses the string as HTML, creating DOM nodes. textContent sets raw text, escaping any HTML tags. textContent is safer (no XSS risk) and faster since it avoids HTML parsing.',
  },
  {
    id: 'njs-q63',
    framework: 'native-js',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What is the difference between textContent and innerText?',
    options: [
      'innerText is aware of CSS styling (ignores hidden elements); textContent returns all text regardless of styling',
      'textContent is aware of CSS styling; innerText returns raw text',
      'innerText is deprecated in favor of textContent',
      'They always return the same value',
    ],
    correctAnswer:
      'innerText is aware of CSS styling (ignores hidden elements); textContent returns all text regardless of styling',
    explanation:
      'textContent returns the text of all elements including hidden ones and <script>/<style> tags. innerText considers CSS: it skips hidden elements, triggers reflow, and returns text as it appears visually. textContent is generally faster.',
  },
  {
    id: 'njs-q64',
    framework: 'native-js',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'When should you use createDocumentFragment() instead of creating elements directly?',
    codeSnippet: `const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = \`Item \${i}\`;
  fragment.appendChild(li);
}
document.getElementById('list').appendChild(fragment);`,
    options: [
      'When adding many elements to the DOM at once, to batch them and trigger only one reflow',
      'When creating elements that need to be invisible',
      'When you need elements that persist across page navigations',
      'When creating elements for a different document',
    ],
    correctAnswer:
      'When adding many elements to the DOM at once, to batch them and trigger only one reflow',
    explanation:
      'DocumentFragment exists in memory, not in the DOM tree. Appending children to a fragment does not trigger reflow. When the fragment is appended to the DOM, only one reflow occurs. The fragment itself disappears; only its children are inserted.',
  },
  {
    id: 'njs-q65',
    framework: 'native-js',
    category: 'Rendering',
    difficulty: 'hard',
    question: 'What is the <template> element used for?',
    codeSnippet: `<template id="card-template">
  <div class="card">
    <h2 class="title"></h2>
    <p class="body"></p>
  </div>
</template>`,
    options: [
      'Holds HTML content that is not rendered on page load but can be cloned and inserted via JavaScript',
      'Defines a server-side template that is compiled before being sent to the browser',
      'Creates a reusable CSS template for styling components',
      'Defines placeholder content shown while the page loads',
    ],
    correctAnswer:
      'Holds HTML content that is not rendered on page load but can be cloned and inserted via JavaScript',
    explanation:
      'The <template> element holds client-side content that is parsed but not rendered. Its content is accessible via template.content (a DocumentFragment). You can clone it with cloneNode(true) and populate it dynamically.',
  },
  {
    id: 'njs-q66',
    framework: 'native-js',
    category: 'Rendering',
    difficulty: 'hard',
    question: 'What is the Shadow DOM and what problem does it solve?',
    codeSnippet: `const host = document.querySelector('#widget');
const shadow = host.attachShadow({ mode: 'open' });
shadow.innerHTML = \`
  <style>p { color: red; }</style>
  <p>Encapsulated content</p>
\`;`,
    options: [
      'Creates an encapsulated DOM subtree with scoped styles that do not leak in or out',
      'Creates a hidden copy of the DOM for performance comparison',
      'Renders content only when the element is in the viewport',
      'Provides a virtual DOM implementation built into the browser',
    ],
    correctAnswer:
      'Creates an encapsulated DOM subtree with scoped styles that do not leak in or out',
    explanation:
      'Shadow DOM provides DOM and style encapsulation. Styles defined inside a shadow root do not affect the outer page, and outer styles do not penetrate into the shadow DOM (unless using ::part() or CSS custom properties). This is foundational for Web Components.',
  },
  {
    id: 'njs-q67',
    framework: 'native-js',
    category: 'Rendering',
    difficulty: 'hard',
    question: 'How do you define a custom HTML element (Web Component)?',
    codeSnippet: `class MyCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<div class="card">Hello</div>';
  }
}
customElements.define('my-card', MyCard);`,
    options: [
      'Extend HTMLElement, implement lifecycle callbacks, and register with customElements.define()',
      'Create a new class and add it to document.registerElement()',
      'Use document.createElement() with a custom tag name',
      'Define a function component and render it with document.render()',
    ],
    correctAnswer:
      'Extend HTMLElement, implement lifecycle callbacks, and register with customElements.define()',
    explanation:
      'Custom elements extend HTMLElement and use lifecycle callbacks: connectedCallback (added to DOM), disconnectedCallback (removed), attributeChangedCallback (attribute changed), and adoptedCallback (moved to new document). They are registered with customElements.define().',
  },
  {
    id: 'njs-q68',
    framework: 'native-js',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What is "layout thrashing" and how do you avoid it?',
    codeSnippet: `// BAD - causes layout thrashing
for (const el of elements) {
  const height = el.offsetHeight; // forces layout
  el.style.height = height + 10 + 'px'; // invalidates layout
}`,
    options: [
      'Repeatedly reading layout properties and writing styles in the same loop, forcing the browser to recalculate layout multiple times',
      'Adding too many elements to the DOM at once',
      'Using too many CSS animations simultaneously',
      'Applying conflicting CSS rules to the same element',
    ],
    correctAnswer:
      'Repeatedly reading layout properties and writing styles in the same loop, forcing the browser to recalculate layout multiple times',
    explanation:
      'Layout thrashing occurs when you interleave reads (offsetHeight, clientWidth) and writes (style changes) in a loop. Each read after a write forces a synchronous layout recalculation. Fix it by batching all reads first, then all writes.',
  },
  {
    id: 'njs-q69',
    framework: 'native-js',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'How does requestAnimationFrame differ from setTimeout for animations?',
    options: [
      'requestAnimationFrame syncs with the display refresh rate and pauses in background tabs; setTimeout does neither',
      'setTimeout is more precise than requestAnimationFrame',
      'requestAnimationFrame runs at exactly 60fps regardless of system load',
      'setTimeout is preferred for animations because it allows custom intervals',
    ],
    correctAnswer:
      'requestAnimationFrame syncs with the display refresh rate and pauses in background tabs; setTimeout does neither',
    explanation:
      'requestAnimationFrame is called before each repaint, matching the display refresh rate (typically 60Hz). It automatically pauses in background tabs, saving CPU. setTimeout does not sync with repaint cycles and can cause visual jitter.',
  },
  {
    id: 'njs-q70',
    framework: 'native-js',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'What does element.insertAdjacentHTML() do?',
    codeSnippet: `element.insertAdjacentHTML('beforeend', '<span>New</span>');`,
    options: [
      'Parses HTML and inserts it at a specified position relative to the element without replacing existing content',
      'Replaces the element with the given HTML',
      'Inserts HTML only if the element is empty',
      'Adds HTML as a text node, not parsed markup',
    ],
    correctAnswer:
      'Parses HTML and inserts it at a specified position relative to the element without replacing existing content',
    explanation:
      'insertAdjacentHTML() parses the string as HTML and inserts it at one of four positions: "beforebegin" (before element), "afterbegin" (first child), "beforeend" (last child), or "afterend" (after element). Unlike innerHTML, it does not reparse existing content.',
  },
  {
    id: 'njs-q71',
    framework: 'native-js',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'What property tells you the computed (final) style of an element?',
    codeSnippet: `const styles = ???(element);
const color = styles.getPropertyValue('color');`,
    options: [
      'window.getComputedStyle(element)',
      'element.computedStyle',
      'element.style',
      'document.getStyle(element)',
    ],
    correctAnswer: 'window.getComputedStyle(element)',
    explanation:
      'window.getComputedStyle() returns a CSSStyleDeclaration containing all computed CSS properties after applying stylesheets, inheritance, and browser defaults. element.style only reflects inline styles.',
  },
  {
    id: 'njs-q72',
    framework: 'native-js',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What is the concept of virtual scrolling?',
    options: [
      'Rendering only the visible items in a long list and recycling DOM nodes as the user scrolls',
      'Using CSS overflow:scroll to create scrollable containers',
      'Loading content lazily as the user scrolls down the page',
      'Scrolling the page programmatically with JavaScript',
    ],
    correctAnswer:
      'Rendering only the visible items in a long list and recycling DOM nodes as the user scrolls',
    explanation:
      'Virtual scrolling (or windowing) renders only the items currently visible in the viewport plus a small buffer. As the user scrolls, DOM elements are recycled with new content. This dramatically improves performance for lists with thousands of items.',
  },
  {
    id: 'njs-q73',
    framework: 'native-js',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'How do you clone a DOM element including all its children?',
    codeSnippet: `const clone = original.cloneNode(???);`,
    options: [
      'true - cloneNode(true) performs a deep clone including children',
      'false - cloneNode(false) clones all descendants',
      '"deep" - cloneNode("deep") is the correct argument',
      'No argument is needed; cloneNode() always clones children',
    ],
    correctAnswer: 'true - cloneNode(true) performs a deep clone including children',
    explanation:
      'cloneNode(true) creates a deep copy of the node and all its descendants. cloneNode(false) or cloneNode() creates a shallow copy (the element only, no children). Event listeners are NOT cloned.',
  },
  {
    id: 'njs-q74',
    framework: 'native-js',
    category: 'Rendering',
    difficulty: 'hard',
    question: 'Which lifecycle callbacks are available in custom elements (Web Components)?',
    options: [
      'connectedCallback, disconnectedCallback, attributeChangedCallback, and adoptedCallback',
      'onMount, onUnmount, onUpdate, and onAdopt',
      'created, attached, detached, and attributeChanged',
      'init, render, destroy, and update',
    ],
    correctAnswer:
      'connectedCallback, disconnectedCallback, attributeChangedCallback, and adoptedCallback',
    explanation:
      'Custom elements have four lifecycle callbacks: connectedCallback (element added to DOM), disconnectedCallback (element removed), attributeChangedCallback (observed attribute changes), and adoptedCallback (element moved to a new document).',
  },
  {
    id: 'njs-q75',
    framework: 'native-js',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What does element.replaceWith() do?',
    codeSnippet: `const oldEl = document.getElementById('old');
const newEl = document.createElement('div');
newEl.textContent = 'New content';
oldEl.replaceWith(newEl);`,
    options: [
      'Replaces the element in its parent with one or more new nodes',
      'Replaces only the inner content of the element',
      'Swaps the element with a clone of the new element',
      'Replaces the element but keeps its attributes and event listeners',
    ],
    correctAnswer: 'Replaces the element in its parent with one or more new nodes',
    explanation:
      "replaceWith() replaces the element in its parent's children list with the given nodes or strings. The original element is removed from the DOM. It can accept multiple arguments (nodes or strings) as replacements.",
  },
  {
    id: 'njs-q76',
    framework: 'native-js',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What is the difference between element.append() and element.appendChild()?',
    options: [
      'append() accepts multiple nodes and strings; appendChild() accepts only a single node and returns it',
      'appendChild() accepts multiple nodes; append() accepts only one',
      'append() is asynchronous; appendChild() is synchronous',
      'They are identical; append() is just an alias for appendChild()',
    ],
    correctAnswer:
      'append() accepts multiple nodes and strings; appendChild() accepts only a single node and returns it',
    explanation:
      'append() can take multiple arguments (nodes and/or DOMStrings) and returns undefined. appendChild() takes only one Node argument and returns the appended node. append() is more modern and flexible.',
  },
  {
    id: 'njs-q77',
    framework: 'native-js',
    category: 'Rendering',
    difficulty: 'hard',
    question: 'How does CSS containment (contain property) help rendering performance?',
    codeSnippet: `.widget {
  contain: layout style paint;
}`,
    options: [
      'Tells the browser that changes inside the element do not affect the rest of the page, enabling rendering optimizations',
      'Prevents the element from being rendered until explicitly shown',
      'Contains CSS animations within the element boundaries',
      'Restricts which CSS properties can be applied to the element',
    ],
    correctAnswer:
      'Tells the browser that changes inside the element do not affect the rest of the page, enabling rendering optimizations',
    explanation:
      'CSS containment hints to the browser that an element\'s subtree is independent. "layout" means internal layout changes do not affect outside. "paint" means content does not paint outside bounds. "style" means counter/quote effects do not escape. This allows the browser to skip work when updating.',
  },
  {
    id: 'njs-q78',
    framework: 'native-js',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'What does element.remove() do?',
    options: [
      'Removes the element from the DOM',
      'Removes all child elements from the element',
      'Hides the element with display:none',
      'Removes all event listeners from the element',
    ],
    correctAnswer: 'Removes the element from the DOM',
    explanation:
      'element.remove() removes the element from its parent in the DOM. Before this method existed, you had to use element.parentNode.removeChild(element). The element object still exists in memory and can be re-inserted.',
  },
  // ─── Data Fetching (njs-q79 – njs-q95) ───────────────────────
  {
    id: 'njs-q79',
    framework: 'native-js',
    category: 'Data Fetching',
    difficulty: 'easy',
    question: 'What does the fetch() function return?',
    codeSnippet: `const response = await fetch('/api/data');`,
    options: [
      'A Promise that resolves to a Response object',
      'The response body as a string',
      'A Promise that resolves to parsed JSON',
      'An XMLHttpRequest object',
    ],
    correctAnswer: 'A Promise that resolves to a Response object',
    explanation:
      'fetch() returns a Promise that resolves to a Response object. You then call methods like response.json(), response.text(), or response.blob() to parse the body. fetch() only rejects on network errors, not HTTP error status codes.',
  },
  {
    id: 'njs-q80',
    framework: 'native-js',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'When does a fetch() Promise reject?',
    codeSnippet: `try {
  const res = await fetch('/api/data');
  // res.status might be 404 or 500
} catch (err) {
  // When does this catch block run?
}`,
    options: [
      'Only on network failures (DNS error, offline, CORS block); HTTP errors like 404 or 500 do NOT cause rejection',
      'On any HTTP status code >= 400',
      'On any HTTP status code >= 500',
      'On any response that is not valid JSON',
    ],
    correctAnswer:
      'Only on network failures (DNS error, offline, CORS block); HTTP errors like 404 or 500 do NOT cause rejection',
    explanation:
      'fetch() only rejects when the request cannot complete at all (network error, DNS failure, CORS block). HTTP error responses (4xx, 5xx) still resolve successfully. You must check response.ok or response.status to handle HTTP errors.',
  },
  {
    id: 'njs-q81',
    framework: 'native-js',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'How do you cancel a fetch request?',
    codeSnippet: `const controller = new AbortController();
fetch('/api/data', { signal: controller.signal });
// Later...
controller.abort();`,
    options: [
      'Create an AbortController, pass its signal to fetch, and call controller.abort() to cancel',
      'Call fetch.cancel() on the returned promise',
      'Set a timeout option in the fetch configuration',
      'Call response.close() on the response object',
    ],
    correctAnswer:
      'Create an AbortController, pass its signal to fetch, and call controller.abort() to cancel',
    explanation:
      'AbortController creates a signal that can be passed to fetch(). Calling controller.abort() triggers an AbortError on the fetch promise. A single controller can abort multiple requests. The signal can also be used with other APIs like addEventListener.',
  },
  {
    id: 'njs-q82',
    framework: 'native-js',
    category: 'Data Fetching',
    difficulty: 'hard',
    question: 'How do you read a fetch response body as a stream?',
    codeSnippet: `const response = await fetch('/api/large-file');
const reader = response.body.getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log('Received chunk:', value);
}`,
    options: [
      'Access response.body (a ReadableStream) and use getReader() to read chunks incrementally',
      'Use response.stream() to get an array of all chunks at once',
      'Pass { stream: true } to fetch() and iterate over response.chunks',
      'Use response.arrayBuffer() which automatically streams the data',
    ],
    correctAnswer:
      'Access response.body (a ReadableStream) and use getReader() to read chunks incrementally',
    explanation:
      'response.body is a ReadableStream. Calling getReader() returns a ReadableStreamDefaultReader. Each read() call returns { done, value } where value is a Uint8Array chunk. This enables processing large responses without loading everything into memory.',
  },
  {
    id: 'njs-q83',
    framework: 'native-js',
    category: 'Data Fetching',
    difficulty: 'easy',
    question: 'How do you send a POST request with JSON data using fetch?',
    codeSnippet: `fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: ???
});`,
    options: [
      'JSON.stringify({ name: "Alice" })',
      '{ name: "Alice" }',
      'new JSONBody({ name: "Alice" })',
      'encode({ name: "Alice" })',
    ],
    correctAnswer: 'JSON.stringify({ name: "Alice" })',
    explanation:
      'The fetch body must be a string, Blob, BufferSource, FormData, URLSearchParams, or ReadableStream. For JSON, you must manually stringify the object with JSON.stringify() and set the Content-Type header to application/json.',
  },
  {
    id: 'njs-q84',
    framework: 'native-js',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'What is the purpose of the Headers API in fetch?',
    codeSnippet: `const headers = new Headers();
headers.append('Authorization', 'Bearer token123');
headers.append('Accept', 'application/json');
fetch('/api/data', { headers });`,
    options: [
      'Provides an interface to create, read, and modify HTTP headers with methods like append, set, get, has, and delete',
      'Automatically sets all required headers for any request type',
      'Provides read-only access to response headers only',
      'A polyfill for browsers that do not support custom headers',
    ],
    correctAnswer:
      'Provides an interface to create, read, and modify HTTP headers with methods like append, set, get, has, and delete',
    explanation:
      'The Headers object provides methods to manipulate HTTP headers: append() adds a value, set() replaces it, get() retrieves, has() checks existence, delete() removes. Headers is iterable and can be used for both requests and responses.',
  },
  {
    id: 'njs-q85',
    framework: 'native-js',
    category: 'Data Fetching',
    difficulty: 'hard',
    question: 'How do WebSockets differ from regular HTTP requests?',
    codeSnippet: `const ws = new WebSocket('wss://example.com/socket');
ws.onopen = () => ws.send('Hello');
ws.onmessage = (event) => console.log(event.data);
ws.onclose = () => console.log('Disconnected');`,
    options: [
      'WebSockets provide a persistent, bidirectional connection; HTTP is request-response only',
      'WebSockets are faster because they skip the TCP handshake',
      'WebSockets use UDP while HTTP uses TCP',
      'WebSockets can only send text; HTTP can send any data type',
    ],
    correctAnswer:
      'WebSockets provide a persistent, bidirectional connection; HTTP is request-response only',
    explanation:
      'WebSockets establish a persistent full-duplex connection after an initial HTTP handshake upgrade. Both client and server can send messages at any time without the overhead of new HTTP requests. They are ideal for real-time applications like chat, live updates, and gaming.',
  },
  {
    id: 'njs-q86',
    framework: 'native-js',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'What are Server-Sent Events (SSE) and when should you use them?',
    codeSnippet: `const source = new EventSource('/api/stream');
source.onmessage = (event) => {
  console.log('New data:', event.data);
};
source.onerror = () => source.close();`,
    options: [
      'A one-way server-to-client streaming protocol over HTTP that auto-reconnects on failure',
      'A bidirectional streaming protocol similar to WebSockets',
      'A way for the client to push events to the server',
      'A polling mechanism that checks for updates every second',
    ],
    correctAnswer:
      'A one-way server-to-client streaming protocol over HTTP that auto-reconnects on failure',
    explanation:
      'Server-Sent Events use the EventSource API to receive a stream of events from the server over a single HTTP connection. Unlike WebSockets, SSE is unidirectional (server to client). The browser automatically handles reconnection.',
  },
  {
    id: 'njs-q87',
    framework: 'native-js',
    category: 'Data Fetching',
    difficulty: 'easy',
    question: 'What does the navigator.sendBeacon() method do?',
    codeSnippet: `window.addEventListener('unload', () => {
  navigator.sendBeacon('/api/analytics', JSON.stringify({ event: 'pageExit' }));
});`,
    options: [
      'Sends a small amount of data to a server asynchronously, guaranteed to be sent even during page unload',
      'Sends a periodic ping to keep the connection alive',
      'Broadcasts a message to all open tabs',
      'Sends a push notification to the user',
    ],
    correctAnswer:
      'Sends a small amount of data to a server asynchronously, guaranteed to be sent even during page unload',
    explanation:
      'navigator.sendBeacon() is designed for sending analytics or diagnostics data during page unload. Unlike fetch() or XMLHttpRequest, it is guaranteed to be sent without delaying page navigation. It uses POST and does not provide a response.',
  },
  {
    id: 'njs-q88',
    framework: 'native-js',
    category: 'Data Fetching',
    difficulty: 'hard',
    question: 'What is CORS and what triggers a preflight request?',
    options: [
      'CORS is a security mechanism; preflights (OPTIONS) are triggered by non-simple requests (custom headers, PUT/DELETE, non-standard content types)',
      'CORS only applies to WebSocket connections; all HTTP requests bypass it',
      'Preflight requests are sent for every cross-origin request regardless of method',
      'CORS is a server-side configuration that has no effect on the browser',
    ],
    correctAnswer:
      'CORS is a security mechanism; preflights (OPTIONS) are triggered by non-simple requests (custom headers, PUT/DELETE, non-standard content types)',
    explanation:
      'Cross-Origin Resource Sharing (CORS) restricts cross-origin HTTP requests. Simple requests (GET/POST with standard headers) go directly. Non-simple requests trigger a preflight OPTIONS request so the server can approve the actual request. The server responds with Access-Control-Allow-* headers.',
  },
  {
    id: 'njs-q89',
    framework: 'native-js',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'What does the credentials option in fetch control?',
    codeSnippet: `fetch('https://api.example.com/data', {
  credentials: 'include'
});`,
    options: [
      'Whether cookies and authentication headers are sent with cross-origin requests',
      'Whether to use HTTPS or HTTP for the request',
      'Whether the request includes a username and password in the URL',
      'Whether to encrypt the request body',
    ],
    correctAnswer: 'Whether cookies and authentication headers are sent with cross-origin requests',
    explanation:
      'The credentials option controls cookie/auth behavior: "omit" sends no cookies, "same-origin" (default) sends cookies only for same-origin, "include" sends cookies for all requests including cross-origin. The server must also allow credentials via CORS.',
  },
  {
    id: 'njs-q90',
    framework: 'native-js',
    category: 'Data Fetching',
    difficulty: 'hard',
    question: 'How does the Cache API work with fetch?',
    codeSnippet: `const cache = await caches.open('v1');
// Store a response
await cache.put('/api/data', response.clone());
// Retrieve later
const cached = await cache.match('/api/data');`,
    options: [
      'Provides a programmatic cache for Request/Response pairs, commonly used in service workers for offline support',
      'Automatically caches all fetch responses based on HTTP cache headers',
      'Is a browser-managed LRU cache that cannot be controlled by JavaScript',
      'Only works with GET requests and stores responses in localStorage',
    ],
    correctAnswer:
      'Provides a programmatic cache for Request/Response pairs, commonly used in service workers for offline support',
    explanation:
      'The Cache API (caches.open, cache.put, cache.match) gives full programmatic control over stored Request/Response pairs. It is independent of HTTP caching and is commonly used in service workers to implement offline-first strategies.',
  },
  {
    id: 'njs-q91',
    framework: 'native-js',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'How do you handle multiple concurrent fetch requests?',
    codeSnippet: `const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json())
]);`,
    options: [
      'Use Promise.all() to run requests in parallel and wait for all to complete',
      'Chain fetch calls with .then() to run them sequentially',
      'Use async/await in a loop to process them one at a time',
      'Use fetch.parallel() which is a built-in batch API',
    ],
    correctAnswer: 'Use Promise.all() to run requests in parallel and wait for all to complete',
    explanation:
      'Promise.all() executes all promises concurrently and resolves when all complete. For fetch, this means requests run in parallel. If any fails, Promise.all rejects. Use Promise.allSettled() if you want results regardless of individual failures.',
  },
  {
    id: 'njs-q92',
    framework: 'native-js',
    category: 'Data Fetching',
    difficulty: 'hard',
    question: 'How can a service worker intercept fetch requests?',
    codeSnippet: `// service-worker.js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cached =>
      cached || fetch(event.request)
    )
  );
});`,
    options: [
      'By listening for the "fetch" event and using event.respondWith() to provide a custom Response',
      'By overriding the global fetch function in the main thread',
      'By setting the "intercept" option when registering the service worker',
      'Service workers cannot intercept fetch; they only handle push notifications',
    ],
    correctAnswer:
      'By listening for the "fetch" event and using event.respondWith() to provide a custom Response',
    explanation:
      'Service workers sit between the page and network. They receive a "fetch" event for every network request. event.respondWith() lets you provide a custom Response (from cache, modified, or generated). This enables offline support, caching strategies, and request manipulation.',
  },
  {
    id: 'njs-q93',
    framework: 'native-js',
    category: 'Data Fetching',
    difficulty: 'easy',
    question: 'How do you check if a fetch response was successful?',
    codeSnippet: `const response = await fetch('/api/data');
if (???) {
  const data = await response.json();
}`,
    options: ['response.ok', 'response.success', 'response.status === 1', 'response.isValid()'],
    correctAnswer: 'response.ok',
    explanation:
      'response.ok is a boolean that is true when the HTTP status code is in the range 200-299. It is a shorthand for checking response.status >= 200 && response.status < 300.',
  },
  {
    id: 'njs-q94',
    framework: 'native-js',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'What is the Request object in the Fetch API?',
    codeSnippet: `const request = new Request('/api/data', {
  method: 'POST',
  headers: new Headers({ 'Content-Type': 'application/json' }),
  body: JSON.stringify({ key: 'value' })
});
const response = await fetch(request);`,
    options: [
      'An object representing a resource request with method, headers, body, and other settings that can be passed to fetch()',
      'A read-only representation of the incoming server request',
      'A wrapper around XMLHttpRequest for backward compatibility',
      'A configuration object that can only be used with service workers',
    ],
    correctAnswer:
      'An object representing a resource request with method, headers, body, and other settings that can be passed to fetch()',
    explanation:
      'The Request object encapsulates all properties of an HTTP request: URL, method, headers, body, mode, credentials, cache, redirect, etc. It can be passed directly to fetch() and is useful for cloning or modifying requests in service workers.',
  },
  {
    id: 'njs-q95',
    framework: 'native-js',
    category: 'Data Fetching',
    difficulty: 'easy',
    question: 'How do you extract different response body formats from a fetch Response?',
    options: [
      'Use response.json(), response.text(), response.blob(), response.arrayBuffer(), or response.formData()',
      'Use response.parse("json"), response.parse("text"), etc.',
      'Access response.body directly which auto-detects the format',
      'Use response.decode() with a format parameter',
    ],
    correctAnswer:
      'Use response.json(), response.text(), response.blob(), response.arrayBuffer(), or response.formData()',
    explanation:
      'The Response object provides methods to parse the body in various formats. Each returns a Promise. The body can only be consumed once; use response.clone() if you need to read it multiple times.',
  },
  // ─── Forms & Validation (njs-q96 – njs-q112) ─────────────────
  {
    id: 'njs-q96',
    framework: 'native-js',
    category: 'Forms & Validation',
    difficulty: 'easy',
    question: 'What does the Constraint Validation API provide?',
    options: [
      'Built-in browser methods and properties for validating form inputs (checkValidity, reportValidity, validity, setCustomValidity)',
      'A third-party validation library built into modern browsers',
      'CSS-only form validation without JavaScript',
      'Server-side validation triggered from the browser',
    ],
    correctAnswer:
      'Built-in browser methods and properties for validating form inputs (checkValidity, reportValidity, validity, setCustomValidity)',
    explanation:
      'The Constraint Validation API provides native form validation. checkValidity() returns boolean, reportValidity() shows browser UI messages, validity is a ValidityState object with boolean flags, and setCustomValidity() sets custom error messages.',
  },
  {
    id: 'njs-q97',
    framework: 'native-js',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'What properties does the ValidityState object contain?',
    codeSnippet: `const input = document.querySelector('input[required]');
console.log(input.validity.valueMissing); // true if empty`,
    options: [
      'Boolean flags like valueMissing, typeMismatch, patternMismatch, tooLong, tooShort, rangeUnderflow, rangeOverflow, stepMismatch, customError, and valid',
      'Only a single isValid boolean property',
      'Error message strings for each validation rule',
      'Numeric error codes for each type of validation failure',
    ],
    correctAnswer:
      'Boolean flags like valueMissing, typeMismatch, patternMismatch, tooLong, tooShort, rangeUnderflow, rangeOverflow, stepMismatch, customError, and valid',
    explanation:
      'The ValidityState object has boolean properties for each type of constraint: valueMissing (required), typeMismatch (email/url), patternMismatch (regex), tooLong/tooShort, rangeOverflow/rangeUnderflow (min/max), stepMismatch, customError, and valid (true if all pass).',
  },
  {
    id: 'njs-q98',
    framework: 'native-js',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'How does setCustomValidity() work?',
    codeSnippet: `const password = document.getElementById('password');
const confirm = document.getElementById('confirm');
confirm.addEventListener('input', () => {
  if (confirm.value !== password.value) {
    confirm.setCustomValidity('Passwords do not match');
  } else {
    confirm.setCustomValidity('');
  }
});`,
    options: [
      'Sets a custom validation message; passing an empty string clears the error and marks the input as valid',
      'Sets the placeholder text to show the expected format',
      'Overrides all built-in validation with a custom function',
      'Displays a toast notification with the error message',
    ],
    correctAnswer:
      'Sets a custom validation message; passing an empty string clears the error and marks the input as valid',
    explanation:
      'setCustomValidity(message) sets a custom error message. A non-empty string makes the input invalid (validity.customError becomes true). Passing an empty string ("") clears the custom error. The message is shown when reportValidity() is called.',
  },
  {
    id: 'njs-q99',
    framework: 'native-js',
    category: 'Forms & Validation',
    difficulty: 'easy',
    question: 'How do you create a FormData object from an existing form?',
    codeSnippet: `const form = document.querySelector('form');
const data = new FormData(???);`,
    options: [
      'new FormData(form) - pass the form element to the constructor',
      'FormData.fromForm(form)',
      'form.toFormData()',
      'new FormData(form.serialize())',
    ],
    correctAnswer: 'new FormData(form) - pass the form element to the constructor',
    explanation:
      "Passing an HTMLFormElement to the FormData constructor automatically populates it with all the form's named fields. You can also create an empty FormData() and add entries with append() or set().",
  },
  {
    id: 'njs-q100',
    framework: 'native-js',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'What HTML input types provide built-in browser UI widgets?',
    options: [
      'date, time, color, range, file, datetime-local, month, and week all render native UI controls',
      'Only text and password have native widgets; all others require JavaScript',
      'All input types render identical text fields in all browsers',
      'date and color only work with polyfills in modern browsers',
    ],
    correctAnswer:
      'date, time, color, range, file, datetime-local, month, and week all render native UI controls',
    explanation:
      'Modern browsers render native UI widgets for these input types: date (date picker), time (time picker), color (color picker), range (slider), file (file chooser), datetime-local, month, and week. Exact appearance varies by browser.',
  },
  {
    id: 'njs-q101',
    framework: 'native-js',
    category: 'Forms & Validation',
    difficulty: 'easy',
    question: 'What does the pattern attribute do on an input element?',
    codeSnippet: `<input type="text" pattern="[A-Za-z]{3}" title="Exactly 3 letters">`,
    options: [
      'Specifies a regular expression the input value must match for the form to be valid',
      'Sets a placeholder pattern shown in gray text',
      'Formats the input value automatically as the user types',
      'Defines a mask that restricts which characters can be typed',
    ],
    correctAnswer:
      'Specifies a regular expression the input value must match for the form to be valid',
    explanation:
      'The pattern attribute accepts a regex (without delimiters). If the value does not match, validity.patternMismatch becomes true and form submission is blocked. The title attribute provides the error message text.',
  },
  {
    id: 'njs-q102',
    framework: 'native-js',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'What is the difference between the "input" and "change" events on a text input?',
    codeSnippet: `input.addEventListener('input', () => console.log('input'));
input.addEventListener('change', () => console.log('change'));`,
    options: [
      'input fires on every keystroke/value change; change fires only when the field loses focus after its value changed',
      'change fires on every keystroke; input fires on blur',
      'input fires on paste only; change fires on typing',
      'They fire at the same time for text inputs',
    ],
    correctAnswer:
      'input fires on every keystroke/value change; change fires only when the field loses focus after its value changed',
    explanation:
      'The input event fires immediately whenever the value changes (typing, pasting, speech input). The change event fires when the element loses focus (blur) AND the value has changed since it gained focus. For checkboxes and selects, change fires immediately.',
  },
  {
    id: 'njs-q103',
    framework: 'native-js',
    category: 'Forms & Validation',
    difficulty: 'hard',
    question: 'How do you prevent default form submission and handle it with JavaScript?',
    codeSnippet: `form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (form.checkValidity()) {
    const data = new FormData(form);
    fetch('/api/submit', { method: 'POST', body: data });
  } else {
    form.reportValidity();
  }
});`,
    options: [
      'Call event.preventDefault() in the submit handler, then use checkValidity() and FormData for custom submission',
      'Set the form action attribute to "javascript:void(0)"',
      'Remove the submit button and use a regular button with onclick',
      'Return false from the onsubmit attribute',
    ],
    correctAnswer:
      'Call event.preventDefault() in the submit handler, then use checkValidity() and FormData for custom submission',
    explanation:
      'event.preventDefault() stops the native form submission. checkValidity() validates all fields programmatically. reportValidity() shows built-in error UI. FormData collects all field values for sending via fetch. This gives full control over submission logic.',
  },
  {
    id: 'njs-q104',
    framework: 'native-js',
    category: 'Forms & Validation',
    difficulty: 'easy',
    question: 'What does the "required" attribute do on a form input?',
    codeSnippet: `<input type="email" name="email" required>`,
    options: [
      'Prevents form submission if the field is empty and marks it as invalid',
      'Adds a red asterisk next to the input label',
      'Makes the field read-only so the user cannot change it',
      'Sends the field value even if the form is not submitted',
    ],
    correctAnswer: 'Prevents form submission if the field is empty and marks it as invalid',
    explanation:
      'The required attribute makes a field mandatory. If the field is empty when the form is submitted, validity.valueMissing becomes true, the browser shows an error message, and submission is blocked. The :required CSS pseudo-class can style these fields.',
  },
  {
    id: 'njs-q105',
    framework: 'native-js',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'How does the min and max attribute validation work?',
    codeSnippet: `<input type="number" min="1" max="100" value="150">`,
    options: [
      'The input is invalid because 150 exceeds max; validity.rangeOverflow is true',
      'The value is automatically clamped to 100',
      'The min and max attributes only affect the spinner UI, not validation',
      'An error is thrown when the page loads',
    ],
    correctAnswer: 'The input is invalid because 150 exceeds max; validity.rangeOverflow is true',
    explanation:
      'min and max set validation bounds. If the value exceeds max, validity.rangeOverflow is true. If below min, validity.rangeUnderflow is true. The value is NOT automatically clamped; the user can still type any number, but the form will not submit.',
  },
  {
    id: 'njs-q106',
    framework: 'native-js',
    category: 'Forms & Validation',
    difficulty: 'hard',
    question: 'How does the contentEditable attribute work?',
    codeSnippet: `<div contenteditable="true" id="editor">
  Edit this text directly in the browser.
</div>`,
    options: [
      'Makes any HTML element editable by the user, turning it into a rich-text editor that produces HTML markup',
      'Only works on input and textarea elements for plain text editing',
      'Makes the element editable only through JavaScript, not user interaction',
      'Creates a code editor with syntax highlighting',
    ],
    correctAnswer:
      'Makes any HTML element editable by the user, turning it into a rich-text editor that produces HTML markup',
    explanation:
      'contentEditable="true" makes any element editable. Users can type, paste, and format text. The content is stored as HTML in innerHTML. You can use document.execCommand() (deprecated) or the newer Input Events API for formatting controls.',
  },
  {
    id: 'njs-q107',
    framework: 'native-js',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'How do you read a selected file from an <input type="file">?',
    codeSnippet: `const input = document.querySelector('input[type="file"]');
input.addEventListener('change', () => {
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = (e) => console.log(e.target.result);
  reader.readAsText(file);
});`,
    options: [
      'Access input.files to get a FileList, then use FileReader to read the file contents',
      'Use input.value to get the file contents as a string',
      'Call input.readFile() which returns a Promise with the content',
      'Files are automatically uploaded; you cannot read them client-side',
    ],
    correctAnswer:
      'Access input.files to get a FileList, then use FileReader to read the file contents',
    explanation:
      'input.files returns a FileList of selected File objects. FileReader reads files asynchronously with methods like readAsText(), readAsDataURL(), readAsArrayBuffer(). The result is available in reader.result after the load event.',
  },
  {
    id: 'njs-q108',
    framework: 'native-js',
    category: 'Forms & Validation',
    difficulty: 'easy',
    question: 'What CSS pseudo-classes can style form validation states?',
    codeSnippet: `input:valid { border-color: green; }
input:invalid { border-color: red; }`,
    options: [
      ':valid and :invalid style fields based on their constraint validation state',
      ':success and :error are the correct pseudo-classes',
      ':checked and :unchecked handle all validation styling',
      'There are no CSS pseudo-classes for validation; you must use JavaScript',
    ],
    correctAnswer: ':valid and :invalid style fields based on their constraint validation state',
    explanation:
      ':valid matches elements that satisfy all their constraints. :invalid matches elements that do not. Additional pseudo-classes include :required, :optional, :in-range, :out-of-range, and :placeholder-shown for more specific styling.',
  },
  {
    id: 'njs-q109',
    framework: 'native-js',
    category: 'Forms & Validation',
    difficulty: 'hard',
    question: 'What is the difference between the submit event and the formdata event?',
    codeSnippet: `form.addEventListener('formdata', (e) => {
  e.formData.append('timestamp', Date.now().toString());
});`,
    options: [
      'submit fires when the form is submitted; formdata fires after submit and allows modifying the FormData before it is sent',
      'formdata fires before submit to collect data; submit fires after data is sent',
      'They are identical events with different names',
      'formdata is fired only on file inputs; submit fires on the form',
    ],
    correctAnswer:
      'submit fires when the form is submitted; formdata fires after submit and allows modifying the FormData before it is sent',
    explanation:
      'The formdata event fires after the submit event, just before the form data is sent. Its event.formData property lets you append, delete, or modify entries. This is useful for adding computed fields without handling the entire submission flow.',
  },
  {
    id: 'njs-q110',
    framework: 'native-js',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'How do you programmatically trigger form validation without submitting?',
    codeSnippet: `const form = document.querySelector('form');
const isValid = form.???();`,
    options: [
      'checkValidity() returns true/false; reportValidity() returns true/false and shows browser validation UI',
      'validate() runs all validation rules and returns a list of errors',
      'isValid() checks all fields and returns a boolean',
      'triggerValidation() fires validation events on all fields',
    ],
    correctAnswer:
      'checkValidity() returns true/false; reportValidity() returns true/false and shows browser validation UI',
    explanation:
      "checkValidity() silently checks if all form controls are valid and returns a boolean. reportValidity() does the same but also shows the browser's built-in validation messages for invalid fields. Both work on individual inputs and entire forms.",
  },
  {
    id: 'njs-q111',
    framework: 'native-js',
    category: 'Forms & Validation',
    difficulty: 'hard',
    question: 'How does FormData handle multiple files and checkboxes?',
    codeSnippet: `<input type="file" name="docs" multiple>
<input type="checkbox" name="colors" value="red" checked>
<input type="checkbox" name="colors" value="blue" checked>`,
    options: [
      'FormData.getAll("docs") returns all files; FormData.getAll("colors") returns ["red", "blue"]',
      'FormData automatically combines multiple values into a comma-separated string',
      'Only the first file and first checkbox value are captured',
      'Multiple values overwrite each other; only the last one is stored',
    ],
    correctAnswer:
      'FormData.getAll("docs") returns all files; FormData.getAll("colors") returns ["red", "blue"]',
    explanation:
      'FormData stores multiple values per key. get() returns only the first value, while getAll() returns an array of all values for that key. Multiple files, checkboxes with the same name, and repeated append() calls all create multiple entries.',
  },
  {
    id: 'njs-q112',
    framework: 'native-js',
    category: 'Forms & Validation',
    difficulty: 'easy',
    question: 'When does the blur event fire on a form input?',
    options: [
      'When the element loses focus (the user clicks or tabs away from it)',
      'When the element gains focus',
      'When the element value changes',
      'When the form is submitted',
    ],
    correctAnswer: 'When the element loses focus (the user clicks or tabs away from it)',
    explanation:
      'The blur event fires when an element loses focus. It does not bubble (use focusout for delegation). It is commonly used to trigger validation when the user finishes editing a field.',
  },
];
