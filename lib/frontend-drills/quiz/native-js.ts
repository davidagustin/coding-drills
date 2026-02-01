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
];
