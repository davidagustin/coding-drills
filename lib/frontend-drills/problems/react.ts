import type { FrontendDrillProblem } from '../types';

export const reactProblems: FrontendDrillProblem[] = [
  {
    id: 'fe-react-usestate-basic',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'useState Basic Usage',
    text: 'Implement a mock useState that takes an initial value and returns [value, setterFn]. Call it with 42 and return just the state value (first element).',
    setup: 'No setup needed — implement useState yourself.',
    setupCode: ``,
    expected: 42,
    sample: `const useState = (initial) => [initial, (v) => v];
useState(42)[0]`,
    realWorldExample:
      'Every interactive component -- like a dark mode toggle on Twitter or a cart counter on Amazon -- stores its current state with useState.',
    hints: [
      'useState returns a two-element array: [currentValue, setterFunction]',
      'The state value is the first element (index 0)',
    ],
    tags: ['hooks', 'useState', 'basics'],
  },
  {
    id: 'fe-react-usestate-updater',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'useState Functional Update',
    text: 'Implement a mock setState that can accept either a direct value or a functional updater. When given a function, it should call it with the previous state (10). Call it with an updater that adds 5.',
    setup: 'The previous state value.',
    setupCode: `const prevState = 10;`,
    expected: 15,
    sample: `const setState = (updater) => {
  if (typeof updater === "function") {
    return updater(prevState);
  }
  return updater;
};
setState((prev) => prev + 5)`,
    realWorldExample:
      'When you rapidly click "Add to Cart" on Shopify, functional updates ensure each click increments from the true previous count, not a stale snapshot.',
    hints: [
      'setState can accept a function or a direct value',
      'When given a function, call it with the previous state as the argument',
    ],
    tags: ['hooks', 'useState', 'functional-update'],
  },
  {
    id: 'fe-react-useeffect-deps',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'useEffect Dependency Array',
    text: 'Implement a mock useEffect that takes an effect function and dependency array, calls the effect, and returns { effect: returnValue, deps }. Call it with an effect returning "cleanup" and deps [a, b].',
    setup: 'Dependency values.',
    setupCode: `const a = 1, b = 2;`,
    expected: { effect: 'cleanup', deps: [1, 2] },
    sample: `const useEffect = (effect, deps) => ({ effect: effect(), deps });
useEffect(() => "cleanup", [a, b])`,
    realWorldExample:
      'Netflix refetches movie recommendations when you change genres -- useEffect with a dependency array triggers side effects only when specific values change.',
    hints: [
      'useEffect should call the effect function and capture its return value',
      'Return an object with both the effect result and the dependency array',
    ],
    tags: ['hooks', 'useEffect', 'cleanup', 'dependencies'],
  },
  {
    id: 'fe-react-useref-init',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'useRef Initial Value',
    text: 'Implement a mock useRef function that takes an initial value and returns an object with a current property set to that value. Call it with "hello".',
    setup: 'No setup needed — implement useRef yourself.',
    setupCode: ``,
    expected: { current: 'hello' },
    sample: `const useRef = (initial) => ({ current: initial });
useRef("hello")`,
    realWorldExample:
      'VS Code uses refs to hold direct references to DOM elements like the editor textarea, enabling imperative focus management without triggering re-renders.',
    hints: [
      'useRef returns a plain object, not a special container',
      'The object has a single property called current',
    ],
    tags: ['hooks', 'useRef', 'refs'],
  },
  {
    id: 'fe-react-usememo-compute',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'useMemo Computation',
    text: 'Implement a mock useMemo that takes a computation function and deps, executes the computation, and returns the result. Use it to compute the sum of arr.',
    setup: 'An array of numbers.',
    setupCode: `const arr = [1, 2, 3, 4, 5];`,
    expected: 15,
    sample: `const useMemo = (fn, deps) => fn();
useMemo(() => arr.reduce((a, b) => a + b, 0), [arr])`,
    realWorldExample:
      'Google Sheets recalculates cell totals only when the referenced cells change -- useMemo prevents expensive recomputations on every render.',
    hints: [
      'useMemo caches a computed value — for the mock, just call the function',
      'Use reduce to sum the array elements',
    ],
    tags: ['hooks', 'useMemo', 'memoization', 'performance'],
  },
  {
    id: 'fe-react-usecallback-fn',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'useCallback Function Reference',
    text: 'Implement a mock useCallback that takes a callback function and deps, and returns the function unchanged. Create a callback that multiplies its argument by multiplier, then call the returned function with 7.',
    setup: 'A multiplier value.',
    setupCode: `const multiplier = 3;`,
    expected: 21,
    sample: `const useCallback = (fn, deps) => fn;
useCallback((x) => x * multiplier, [multiplier])(7)`,
    realWorldExample:
      'In Slack, memoized callback refs for message handlers prevent child components from re-rendering every time the parent channel list updates.',
    hints: [
      'useCallback returns the same function reference — for the mock, just return fn',
      'Call the returned function with 7: multiply 7 * 3',
    ],
    tags: ['hooks', 'useCallback', 'memoization', 'performance'],
  },
  {
    id: 'fe-react-conditional-render',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'Conditional Rendering Logic',
    text: 'Return "Loading..." if isLoading is true, otherwise return "Content: " + data.',
    setup: 'Variables isLoading and data are defined.',
    setupCode: `const isLoading = false;
const data = "Hello World";`,
    expected: 'Content: Hello World',
    sample: 'isLoading ? "Loading..." : "Content: " + data',
    realWorldExample:
      'Every app shows a loading spinner while fetching data, then swaps it with content -- that is conditional rendering based on isLoading state, just like GitHub loading a repo page.',
    hints: ['Use ternary operator', 'isLoading is false so return the else branch'],
    tags: ['rendering', 'conditional', 'ternary'],
  },
  {
    id: 'fe-react-list-keys',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'List Rendering with Keys',
    text: 'Map over items array to create an array of objects with shape { key: id, value: name }.',
    setup: 'An items array with id and name properties.',
    setupCode: `const items = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Cherry' }
];`,
    expected: [
      { key: 1, value: 'Apple' },
      { key: 2, value: 'Banana' },
      { key: 3, value: 'Cherry' },
    ],
    sample: 'items.map(item => ({ key: item.id, value: item.name }))',
    realWorldExample:
      'Amazon product listings map over an array of items, using product IDs as keys so React can efficiently reorder and update the list when filters change.',
    hints: ['Use map to transform the array', 'Create objects with key and value properties'],
    tags: ['rendering', 'lists', 'keys', 'map'],
  },
  {
    id: 'fe-react-async-state',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'Async Data State Pattern',
    text: 'Write an object literal that represents the initial state for async data fetching. It should have loading set to true, and both data and error set to null.',
    setup: 'No setup needed.',
    setupCode: ``,
    expected: { loading: true, data: null, error: null },
    sample: '{ loading: true, data: null, error: null }',
    realWorldExample:
      'When you open a Twitter profile, the app enters a loading state (spinner), then transitions to data (tweets) or error (failed to load) -- this pattern captures all three phases.',
    hints: [
      'Think about what state a component needs before data arrives',
      'Three properties: loading (boolean), data, and error (both start as null)',
    ],
    tags: ['data-fetching', 'async', 'state-pattern'],
  },
  {
    id: 'fe-react-form-controlled',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'easy',
    title: 'Controlled Input Pattern',
    text: 'Given inputValue and handleChange variables, construct the props object that a controlled input element needs. It should have value bound to inputValue and onChange bound to handleChange.',
    setup: 'Variables representing input state and handler.',
    setupCode: `const inputValue = "test@example.com";
const handleChange = "function";`,
    expected: { value: 'test@example.com', onChange: 'function' },
    sample: '{ value: inputValue, onChange: handleChange }',
    realWorldExample:
      'Gmail compose fields (To, Subject) are controlled inputs -- React owns the value so it can validate email addresses and auto-suggest contacts in real time.',
    hints: [
      'A controlled input has its value driven by state',
      'Both value and onChange props are required for controlled inputs',
    ],
    tags: ['forms', 'controlled-component', 'input'],
    validPatterns: [/value:\s*inputValue/, /onChange:\s*handleChange/],
  },
  {
    id: 'fe-react-event-handler',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Event Handler Binding',
    text: 'Write an event handler function that receives an event object and returns the input value from event.target.value. Test it by calling it with an event where the target value is "hello".',
    setup: 'No setup needed -- write the handler and call it.',
    setupCode: `// Write an input handler and call it with a mock event`,
    expected: 'hello',
    sample: '((event) => event.target.value)({ target: { value: "hello" } })',
    realWorldExample:
      'Every search bar on Google, Notion, or GitHub captures keystrokes through an event handler that reads event.target.value to update the search query.',
    hints: [
      'React event handlers receive a synthetic event object',
      'The input value is at event.target.value',
    ],
    tags: ['events', 'event-handler', 'synthetic-events'],
  },
  {
    id: 'fe-react-custom-hook',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Custom Hook Pattern',
    text: 'Call the custom hook useToggle with initial value false and return the resulting state object.',
    setup: 'A mock useToggle hook that returns [value, toggle function].',
    setupCode: `const useToggle = (initial) => [initial, "function"];`,
    expected: [false, 'function'],
    sample: 'useToggle(false)',
    realWorldExample:
      'Notion uses a useToggle hook for sidebar collapse, dark mode switches, and dropdown menus -- any boolean flip is a perfect custom hook candidate.',
    hints: [
      'Custom hooks return values like built-in hooks',
      'useToggle returns [boolean, function]',
    ],
    tags: ['hooks', 'custom-hooks', 'patterns'],
    validPatterns: [/useToggle\(false\)/],
  },
  {
    id: 'fe-react-props-destructure',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'easy',
    title: 'Props Destructuring',
    text: 'Destructure name and age from the props object and return them as a string: "name is age years old".',
    setup: 'A props object with name and age.',
    setupCode: `const props = { name: 'Alice', age: 30 };`,
    expected: 'Alice is 30 years old',
    // biome-ignore lint/suspicious/noTemplateCurlyInString: sample holds user solution code containing template literals
    sample: `(() => {
  const { name, age } = props;
  return \`\${name} is \${age} years old\`;
})()`,
    realWorldExample:
      'Every React component in a design system like Material UI destructures props (variant, size, color) at the top of the function for cleaner, more readable code.',
    hints: ['Use destructuring assignment', 'Combine with template literal'],
    tags: ['props', 'destructuring', 'patterns'],
  },
  {
    id: 'fe-react-effect-cleanup',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'useEffect Cleanup Function',
    text: 'Create an effect function that sets up a timer ID of 123 and returns a cleanup function that returns the string "cleared: 123".',
    setup: 'Mock useEffect available.',
    setupCode: `const useEffect = (effect, deps) => effect;`,
    expected: 'cleared: 123',
    sample: `useEffect(() => {
  const id = 123;
  return () => "cleared: " + id;
}, [])()()`,
    realWorldExample:
      'Slack cleans up WebSocket connections when you switch channels -- the cleanup function in useEffect prevents memory leaks by disconnecting the old subscription.',
    hints: [
      'Effect returns cleanup function',
      'Cleanup function should return "cleared: 123"',
      'Call the returned cleanup to get the result',
    ],
    tags: ['hooks', 'useEffect', 'cleanup', 'lifecycle'],
  },

  // ─── DOM & Events (17 problems) ────────────────────────────────

  {
    id: 'fe-react-event-bubbling',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Event Bubbling Order',
    text: 'Given parent and child handler functions that push to a log array, simulate event bubbling by calling them in the correct order. Return the log.',
    setup: 'Handler functions and a log array are provided.',
    setupCode: `// Call these handlers in bubbling order, then return log\nconst log = [];\nconst parentHandler = () => log.push("parent");\nconst childHandler = () => log.push("child");`,
    expected: ['child', 'parent'],
    sample: '(childHandler(), parentHandler(), log)',
    realWorldExample:
      'When you click a "Delete" button inside a card on Trello, both the button click and the card click fire -- understanding bubbling order prevents accidentally opening the card while deleting it.',
    hints: [
      'Events bubble from child to parent -- child fires first',
      'Call both handlers, then return the log array',
    ],
    tags: ['events', 'bubbling', 'propagation'],
  },
  {
    id: 'fe-react-stop-propagation',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: 'Stop Propagation',
    text: 'Given an event object with a stopPropagation method that sets a stopped flag, a log array, and handler functions: call the child handler, call stopPropagation, then only call the parent handler if propagation was not stopped. Return the log.',
    setup: 'An event object, stopped flag, log array, and handler functions.',
    setupCode: `// Use these to simulate stop propagation behavior\nconst log = [];\nlet stopped = false;\nconst event = { stopPropagation: () => { stopped = true; } };\nconst childHandler = () => log.push("child");\nconst parentHandler = () => log.push("parent");`,
    expected: ['child'],
    sample: '(childHandler(), event.stopPropagation(), stopped ? null : parentHandler(), log)',
    realWorldExample:
      'In a GitHub PR file list, clicking a "Copy path" button should not also expand/collapse the file diff -- stopPropagation prevents the click from reaching the parent row.',
    hints: [
      'Call childHandler first, then stopPropagation on the event',
      'Only call parentHandler if stopped is still false',
    ],
    tags: ['events', 'stopPropagation', 'bubbling'],
  },
  {
    id: 'fe-react-prevent-default',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Prevent Default Behavior',
    text: 'Write a function that takes an event object, calls preventDefault on it, and returns the string "prevented". Then call your function with mockEvent.',
    setup: 'A mock event object with preventDefault method.',
    setupCode: `// Use this mock event in your solution\nconst mockEvent = { preventDefault: () => {}, type: "submit" };`,
    expected: 'prevented',
    sample: `(() => {
  const handleSubmit = (e) => {
    e.preventDefault();
    return "prevented";
  };
  return handleSubmit(mockEvent);
})()`,
    realWorldExample:
      'When you submit a login form on GitHub, preventDefault stops the browser from doing a full page reload, letting React handle the submission via an API call instead.',
    hints: [
      'Define a handler function that calls e.preventDefault()',
      'Return the string "prevented" after calling preventDefault',
    ],
    tags: ['events', 'preventDefault', 'forms'],
  },
  {
    id: 'fe-react-synthetic-event',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: 'Synthetic Event Properties',
    text: 'Given a synthetic event object, write a function that extracts target.value, type, and bubbles into an object with keys { value, type, bubbles }. Call it with syntheticEvent.',
    setup: 'A mock synthetic event object.',
    setupCode: `// Extract properties from this event object\nconst syntheticEvent = {\n  target: { value: "hello" },\n  type: "change",\n  bubbles: true,\n  nativeEvent: {},\n  preventDefault: () => {},\n  stopPropagation: () => {}\n};`,
    expected: { value: 'hello', type: 'change', bubbles: true },
    sample: `((e) => ({
  value: e.target.value,
  type: e.type,
  bubbles: e.bubbles
}))(syntheticEvent)`,
    realWorldExample:
      'React wraps native browser events in SyntheticEvents so your onChange handler works identically in Chrome, Firefox, and Safari -- extracting properties like target.value is consistent across all browsers.',
    hints: [
      'Access nested target.value for the input value',
      'Read type and bubbles directly from the event',
    ],
    tags: ['events', 'synthetic-event', 'properties'],
  },
  {
    id: 'fe-react-event-delegation',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: 'Event Delegation Pattern',
    text: 'Write a click handler function that reads e.target.dataset.id and returns "item-" + id if an id exists, or "none" otherwise. Test it with the provided mockEvent.',
    setup: 'A mock event with dataset.',
    setupCode: `// Write a handler that reads the dataset id from this event\nconst mockEvent = { target: { dataset: { id: "3" } } };`,
    expected: 'item-3',
    sample: `((e) => {
  const id = e.target.dataset.id;
  return id ? "item-" + id : "none";
})(mockEvent)`,
    realWorldExample:
      'Notion attaches a single click handler to a page list container and reads dataset.id to determine which page was clicked, rather than adding separate handlers to hundreds of page rows.',
    hints: [
      'Access e.target.dataset.id to find which item was clicked',
      'Use a ternary to handle the case when id is missing',
    ],
    tags: ['events', 'delegation', 'performance'],
  },
  {
    id: 'fe-react-keyboard-event',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Keyboard Event Handler',
    text: 'Write a keydown handler function that checks e.key and returns "submitted" when Enter is pressed, or "ignored" otherwise. Call it with enterEvent.',
    setup: 'A mock keyboard event.',
    setupCode: `// Write a handler that checks the key property\nconst enterEvent = { key: "Enter" };`,
    expected: 'submitted',
    sample: '((e) => e.key === "Enter" ? "submitted" : "ignored")(enterEvent)',
    realWorldExample:
      'Pressing Enter in the Slack message input sends your message -- a keyboard event handler checks for the Enter key to trigger the submit action.',
    hints: [
      'Check e.key to identify which key was pressed',
      'Use a ternary operator to return the correct string',
    ],
    tags: ['events', 'keyboard', 'onKeyDown'],
  },
  {
    id: 'fe-react-event-currenttarget',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: 'Event target vs currentTarget',
    text: 'Given an event where target and currentTarget differ, write a function that extracts both ids into an object { target, currentTarget }. Call it with the provided event.',
    setup: 'A mock event where target and currentTarget differ.',
    setupCode: `// Extract the id from both target and currentTarget\nconst event = {\n  target: { id: "inner-span" },\n  currentTarget: { id: "outer-div" }\n};`,
    expected: { target: 'inner-span', currentTarget: 'outer-div' },
    sample: '((e) => ({ target: e.target.id, currentTarget: e.currentTarget.id }))(event)',
    realWorldExample:
      'In a Gmail email row, clicking the star icon (target) fires on the row handler (currentTarget) -- distinguishing them lets you star the email without opening it.',
    hints: [
      'target is the element that triggered the event',
      'currentTarget is the element the handler is attached to',
    ],
    tags: ['events', 'target', 'currentTarget'],
  },
  {
    id: 'fe-react-focus-blur',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Focus and Blur Events',
    text: 'Given onFocus and onBlur handler functions that push to a log array, call them in the correct order (focus first, then blur) and return the log.',
    setup: 'Handler functions and a log array.',
    setupCode: `// Call these handlers in focus/blur order, then return log\nconst log = [];\nconst onFocus = () => log.push("focused");\nconst onBlur = () => log.push("blurred");`,
    expected: ['focused', 'blurred'],
    sample: '(onFocus(), onBlur(), log)',
    realWorldExample:
      'LinkedIn highlights form fields with a blue border on focus and shows validation errors on blur -- these events drive the visual feedback for the profile edit form.',
    hints: [
      'Focus fires when element gains focus, blur when it loses focus',
      'Call onFocus first, then onBlur, then return log',
    ],
    tags: ['events', 'focus', 'blur'],
  },
  {
    id: 'fe-react-mouse-position',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: 'Mouse Event Coordinates',
    text: 'Write a function that takes a mouse event and returns an object { x, y } from its clientX and clientY properties. Call it with mouseEvent.',
    setup: 'A mock mouse event with coordinates.',
    setupCode: `// Extract coordinates from this mouse event\nconst mouseEvent = { clientX: 150, clientY: 200, type: "mousemove" };`,
    expected: { x: 150, y: 200 },
    sample: '((e) => ({ x: e.clientX, y: e.clientY }))(mouseEvent)',
    realWorldExample:
      'Figma tracks mouse coordinates to position cursor tooltips and render real-time collaborator cursors on the canvas at the exact pixel location.',
    hints: [
      'Mouse events expose clientX and clientY for coordinates',
      'Map them to x and y keys in the returned object',
    ],
    tags: ['events', 'mouse', 'coordinates'],
  },
  {
    id: 'fe-react-event-pooling',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'hard',
    title: 'Event Pooling and Persist',
    text: 'Given a factory that creates pooled events (which are nullified unless persist() is called), create an event with value "saved", call persist() on it, then access the value via _access(). Return the result.',
    setup: 'A pooled event factory.',
    setupCode: `// Create an event, persist it, then read the value\nconst createPooledEvent = (val) => {\n  let persisted = false;\n  let value = val;\n  return {\n    target: { value },\n    persist: () => { persisted = true; },\n    _access: () => persisted ? value : null\n  };\n};`,
    expected: 'saved',
    sample: `(() => {
  const evt = createPooledEvent("saved");
  evt.persist();
  return evt._access();
})()`,
    realWorldExample:
      'In older React versions, accessing event properties inside a setTimeout (like a debounced search) would fail unless you called persist() -- this was critical for async event handling in apps like Airbnb search.',
    hints: [
      'Create the event first, then call persist() before accessing',
      'Without persist(), _access() returns null due to pooling',
    ],
    tags: ['events', 'pooling', 'persist'],
  },
  {
    id: 'fe-react-touch-events',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: 'Touch Event Handler',
    text: 'Write a function that takes a touch event and extracts the first touch point coordinates as { x, y }. Call it with touchEvent.',
    setup: 'A mock touch event with touches array.',
    setupCode: `// Extract the first touch point from this event\nconst touchEvent = { touches: [{ clientX: 100, clientY: 250 }] };`,
    expected: { x: 100, y: 250 },
    sample: '((e) => ({ x: e.touches[0].clientX, y: e.touches[0].clientY }))(touchEvent)',
    realWorldExample:
      'Google Maps on mobile reads touch coordinates to let you pan and pinch-zoom the map -- extracting the first touch point drives the gesture interaction.',
    hints: [
      'Touch events store touch points in the touches array',
      'Access the first element with touches[0]',
    ],
    tags: ['events', 'touch', 'mobile'],
  },
  {
    id: 'fe-react-event-handler-args',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Passing Arguments to Event Handlers',
    text: 'Implement a handler factory function called createHandler that takes an id and returns a new function. The returned function should return the string "clicked-" + id. Call createHandler with 5 and invoke the result.',
    setup: 'No setup needed — implement createHandler yourself.',
    setupCode: ``,
    expected: 'clicked-5',
    sample: `const createHandler = (id) => () => "clicked-" + id;
createHandler(5)()`,
    realWorldExample:
      'In a Spotify playlist, each track row passes its track ID into a click handler factory so the "Play" button knows which specific track to start.',
    hints: [
      'Use a closure to capture the id parameter',
      'Return a function that concatenates "clicked-" with the captured id',
    ],
    tags: ['events', 'closures', 'handler-factory'],
  },
  {
    id: 'fe-react-debounce-handler',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'hard',
    title: 'Debounced Event Handler',
    text: 'Write a debounce function that wraps a callback. It should capture the latest arguments on each call but not execute. Add a flush() method that executes the callback with the last-captured arguments. Create a debounced identity function, call it 3 times with "first", "second", "third", then flush and return the result.',
    setup: 'No setup needed -- implement debounce from scratch.',
    setupCode: `// Implement debounce and use it below`,
    expected: 'third',
    sample: `(() => {
  const debounce = (fn) => {
    let lastArgs;
    const debounced = (...args) => { lastArgs = args; };
    debounced.flush = () => fn(...lastArgs);
    return debounced;
  };
  const handler = debounce((val) => val);
  handler("first");
  handler("second");
  handler("third");
  return handler.flush();
})()`,
    realWorldExample:
      'The Google search box debounces your keystrokes so it only fires an autocomplete API call after you pause typing, rather than on every single character.',
    hints: [
      'Store the latest arguments each time the debounced function is called',
      'flush() should call the original function with the stored arguments',
    ],
    tags: ['events', 'debounce', 'performance'],
  },
  {
    id: 'fe-react-throttle-handler',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'hard',
    title: 'Throttled Event Handler',
    text: 'Write a throttle function that wraps a callback. It should execute only on the first call and ignore subsequent calls, always returning the first result. Create a throttled identity function, call it 3 times with "first", "second", "third", and return the final returned value.',
    setup: 'No setup needed -- implement throttle from scratch.',
    setupCode: `// Implement throttle and use it below`,
    expected: 'first',
    sample: `(() => {
  const throttle = (fn) => {
    let called = false;
    let result;
    return (...args) => {
      if (!called) { called = true; result = fn(...args); }
      return result;
    };
  };
  const handler = throttle((val) => val);
  handler("first");
  handler("second");
  return handler("third");
})()`,
    realWorldExample:
      'Scroll-heavy pages like Twitter throttle their scroll event handlers so the "load more tweets" logic fires at most once per 200ms, preventing performance jank.',
    hints: [
      'Use a boolean flag to track if the function has already been called',
      'Store and return the result from the first invocation on all subsequent calls',
    ],
    tags: ['events', 'throttle', 'performance'],
  },
  {
    id: 'fe-react-event-composition',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: 'Composing Event Handlers',
    text: 'Write a compose function that takes any number of handler functions and returns a new function. When called, it runs each handler in order and returns the log. Use it to compose handler1 and handler2.',
    setup: 'Two handlers and a log array.',
    setupCode: `// Compose these handlers into one function\nconst log = [];\nconst handler1 = () => log.push("validated");\nconst handler2 = () => log.push("submitted");`,
    expected: ['validated', 'submitted'],
    sample: `(() => {
  const compose = (...fns) => () => {
    fns.forEach(fn => fn());
    return log;
  };
  return compose(handler1, handler2)();
})()`,
    realWorldExample:
      'A Stripe checkout form composes validation, analytics tracking, and submission handlers into a single onSubmit -- each runs in sequence when the user clicks "Pay".',
    hints: [
      'Use rest parameters (...fns) to accept multiple handlers',
      'Iterate over the functions array and call each one in order',
    ],
    tags: ['events', 'composition', 'patterns'],
  },
  {
    id: 'fe-react-drag-events',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: 'Drag Event Data Transfer',
    text: 'Given a dataTransfer object with setData and getData methods backed by a dataStore object, set "text/plain" data to "dragged-item-42" during dragstart, then retrieve it during drop. Return the retrieved value.',
    setup: 'A mock dataTransfer backed by a store.',
    setupCode: `// Use setData to store, then getData to retrieve\nconst dataStore = {};\nconst dataTransfer = {\n  setData: (type, val) => { dataStore[type] = val; },\n  getData: (type) => dataStore[type]\n};`,
    expected: 'dragged-item-42',
    sample:
      '(dataTransfer.setData("text/plain", "dragged-item-42"), dataTransfer.getData("text/plain"))',
    realWorldExample:
      'Trello uses drag-and-drop with dataTransfer to move cards between columns -- setData stores the card ID during dragstart, and getData retrieves it on drop.',
    hints: [
      'Call setData with a MIME type key and a value',
      'Call getData with the same key to retrieve the value',
    ],
    tags: ['events', 'drag-drop', 'dataTransfer'],
  },
  {
    id: 'fe-react-event-capture-phase',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Capture Phase vs Bubble Phase',
    text: 'Given capture and bubble handler functions that push to a log array, call them in the correct event flow order (capture first, then bubble) and return the log.',
    setup: 'Handler functions and a log array.',
    setupCode: `// Call these handlers in event flow order, then return log\nconst log = [];\nconst captureHandler = () => log.push("capture");\nconst bubbleHandler = () => log.push("bubble");`,
    expected: ['capture', 'bubble'],
    sample: '(captureHandler(), bubbleHandler(), log)',
    realWorldExample:
      'Analytics libraries like Mixpanel use capture-phase listeners to track clicks before any component can stopPropagation, ensuring no user interaction goes unrecorded.',
    hints: [
      'Capture phase runs top-down before bubble phase runs bottom-up',
      'In React, use onClickCapture for capture phase handlers',
    ],
    tags: ['events', 'capture', 'phases'],
  },

  // ─── State & Lifecycle (17 problems) ───────────────────────────

  {
    id: 'fe-react-usecontext-basic',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'useContext Basic Usage',
    text: 'Implement a mock useContext that reads _currentValue from a context object. Call it with ThemeContext to retrieve the current theme.',
    setup: 'A theme context object.',
    setupCode: `const ThemeContext = { _currentValue: "dark" };`,
    expected: 'dark',
    sample: `const useContext = (ctx) => ctx._currentValue;
useContext(ThemeContext)`,
    realWorldExample:
      'Spotify shares the current theme (dark/light) and logged-in user info across the entire app without prop drilling -- that is React Context consumed via useContext.',
    hints: [
      'Context objects store their current value in _currentValue',
      'useContext simply reads and returns that stored value',
    ],
    tags: ['hooks', 'useContext', 'context'],
  },
  {
    id: 'fe-react-reducer-dispatch',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'useReducer Dispatch Action',
    text: 'Implement a mock useReducer that takes a reducer and initial state. It should create internal state, define a dispatch function that applies the reducer, dispatch an INCREMENT action, and return [state, dispatch]. Call it with counterReducer and { count: 0 }, then return the state.',
    setup: 'A counter reducer with INCREMENT and DECREMENT actions.',
    setupCode: `const counterReducer = (state, action) => {\n  switch(action.type) {\n    case 'INCREMENT': return { count: state.count + 1 };\n    case 'DECREMENT': return { count: state.count - 1 };\n    default: return state;\n  }\n};`,
    expected: { count: 1 },
    sample: `const useReducer = (reducer, init) => {
  let state = init;
  const dispatch = (action) => { state = reducer(state, action); };
  dispatch({ type: "INCREMENT" });
  return [state, dispatch];
};
useReducer(counterReducer, { count: 0 })[0]`,
    realWorldExample:
      'A shopping cart on Amazon dispatches ADD_ITEM, REMOVE_ITEM, and UPDATE_QUANTITY actions through useReducer to manage complex state transitions predictably.',
    hints: [
      'useReducer creates local state and a dispatch function',
      'dispatch applies the reducer: state = reducer(state, action)',
    ],
    tags: ['hooks', 'useReducer', 'dispatch', 'actions'],
  },
  {
    id: 'fe-react-usestate-object',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'useState with Object Spread',
    text: 'Implement an updateState function that merges a partial update into an existing state object using the spread operator. Call it to update age to 31.',
    setup: 'The previous state object.',
    setupCode: `const prevState = { name: "Alice", age: 30, city: "NYC" };`,
    expected: { name: 'Alice', age: 31, city: 'NYC' },
    sample: `const updateState = (prev, partial) => ({ ...prev, ...partial });
updateState(prevState, { age: 31 })`,
    realWorldExample:
      'When you edit your GitHub profile (name, bio, company), the form updates one field at a time by spreading the old state and overriding just the changed field.',
    hints: [
      'Spread the previous state first, then spread the partial update',
      'Later properties override earlier ones in object spread',
    ],
    tags: ['hooks', 'useState', 'object-state', 'spread'],
  },
  {
    id: 'fe-react-usestate-array',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'useState Array Immutable Update',
    text: 'Implement an addItem function that adds a new item to an array immutably (without modifying the original). Use it to add "cherry" to items.',
    setup: 'An initial array of items.',
    setupCode: `const items = ["apple", "banana"];`,
    expected: ['apple', 'banana', 'cherry'],
    sample: `const addItem = (arr, item) => [...arr, item];
addItem(items, "cherry")`,
    realWorldExample:
      'Adding a new tag to a GitHub issue uses immutable array updates -- spread the existing tags and append the new one so React detects the state change and re-renders.',
    hints: [
      'Use the spread operator to create a new array',
      'Append the new item after spreading the original',
    ],
    tags: ['hooks', 'useState', 'immutable', 'arrays'],
  },
  {
    id: 'fe-react-usestate-lazy-init',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'useState Lazy Initialization',
    text: 'Implement a mock useState that supports lazy initialization. If init is a function, call it to get the value; otherwise use init directly. Return [value, setter]. Call it with a lazy initializer that computes 50 * 2.',
    setup: 'No setup needed — implement useState yourself.',
    setupCode: ``,
    expected: 100,
    sample: `const useState = (init) => {
  let val = init;
  if (typeof init === "function") { val = init(); }
  return [val, () => {}];
};
useState(() => 50 * 2)[0]`,
    realWorldExample:
      'VS Code initializes editor settings by reading from localStorage -- lazy initialization avoids parsing JSON on every re-render, running the expensive read only once.',
    hints: [
      'Check if init is a function using typeof',
      'If it is a function, call it to compute the initial value',
    ],
    tags: ['hooks', 'useState', 'lazy-init', 'performance'],
  },
  {
    id: 'fe-react-multiple-effects',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'Multiple useEffect Calls',
    text: 'Implement a mock useEffect that runs its callback and pushes the return value to a log array. Call useEffect three times with functions returning "effect-1", "effect-2", and "effect-3". Return the log.',
    setup: 'A log array to collect effect results.',
    setupCode: `const log = [];`,
    expected: ['effect-1', 'effect-2', 'effect-3'],
    sample: `const useEffect = (fn) => { log.push(fn()); };
(useEffect(() => "effect-1"), useEffect(() => "effect-2"), useEffect(() => "effect-3"), log)`,
    realWorldExample:
      'A Notion page component might have separate effects for fetching page data, setting up keyboard shortcuts, and syncing with real-time collaboration -- each concern lives in its own useEffect.',
    hints: [
      'useEffect should call fn() and push the result to the log',
      'Call useEffect three times with three different effect functions',
    ],
    tags: ['hooks', 'useEffect', 'multiple', 'lifecycle'],
  },
  {
    id: 'fe-react-uselayouteffect',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'useLayoutEffect vs useEffect Order',
    text: 'Given mock useLayoutEffect and useEffect that prefix results with "layout:" and "effect:", call useLayoutEffect with a function returning "measure" and useEffect with one returning "fetch" in the correct execution order. Return the log.',
    setup: 'Mock hooks and a log array.',
    setupCode: `// Call these hooks in the correct order\nconst log = [];\nconst useLayoutEffect = (fn) => { log.push("layout:" + fn()); };\nconst useEffect = (fn) => { log.push("effect:" + fn()); };`,
    expected: ['layout:measure', 'effect:fetch'],
    sample: '(useLayoutEffect(() => "measure"), useEffect(() => "fetch"), log)',
    realWorldExample:
      'Tooltips in Stripe Dashboard use useLayoutEffect to measure element dimensions and position the tooltip before the browser paints, preventing a visible "jump" that useEffect would cause.',
    hints: [
      'useLayoutEffect fires synchronously before useEffect',
      'Call useLayoutEffect first, then useEffect',
    ],
    tags: ['hooks', 'useLayoutEffect', 'lifecycle', 'order'],
  },
  {
    id: 'fe-react-context-provider-value',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'Context Provider Value',
    text: 'Given a createContext factory, create a context with default value "light", override it by calling Provider with "dark", then read the current value. Return it.',
    setup: 'A mock context factory.',
    setupCode: `// Create context, set provider value, then read\nconst createContext = (defaultVal) => {\n  let current = defaultVal;\n  return {\n    _currentValue: current,\n    Provider: (val) => { current = val; },\n    read: () => current\n  };\n};`,
    expected: 'dark',
    sample: `(() => {
  const ThemeCtx = createContext("light");
  ThemeCtx.Provider("dark");
  return ThemeCtx.read();
})()`,
    realWorldExample:
      'Apps like Discord wrap the component tree in a ThemeProvider that overrides the default theme -- deeply nested components read the theme without receiving it as props.',
    hints: [
      'Call createContext with the default value first',
      'Use Provider to override, then read to consume the current value',
    ],
    tags: ['context', 'provider', 'consumer'],
  },
  {
    id: 'fe-react-reducer-multiple-actions',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    title: 'useReducer Multiple Actions',
    text: 'Write a todoReducer that handles ADD_TODO (appends { id, text, done: false } to todos array) and TOGGLE_TODO (flips the done flag for matching id). Apply the provided actions array to it starting from { todos: [] } using Array.reduce. Return the final state.',
    setup: 'An array of actions to apply.',
    setupCode: `// Write a reducer and apply these actions\nconst actions = [\n  { type: 'ADD_TODO', id: 1, text: 'Learn React' },\n  { type: 'TOGGLE_TODO', id: 1 },\n  { type: 'ADD_TODO', id: 2, text: 'Build app' }\n];`,
    expected: {
      todos: [
        { id: 1, text: 'Learn React', done: true },
        { id: 2, text: 'Build app', done: false },
      ],
    },
    sample: `(() => {
  const todoReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TODO":
        return { ...state, todos: [...state.todos, { id: action.id, text: action.text, done: false }] };
      case "TOGGLE_TODO":
        return { ...state, todos: state.todos.map(t => t.id === action.id ? { ...t, done: !t.done } : t) };
      default:
        return state;
    }
  };
  return actions.reduce(todoReducer, { todos: [] });
})()`,
    realWorldExample:
      'Todoist processes a stream of user actions (add task, toggle complete, reorder) through a reducer, ensuring each state transition is predictable and debuggable via Redux DevTools.',
    hints: [
      'Use a switch statement to handle each action type',
      'Use Array.reduce to apply all actions sequentially to the initial state',
    ],
    tags: ['hooks', 'useReducer', 'complex-state', 'actions'],
  },
  {
    id: 'fe-react-useref-mutable',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'useRef Mutable Value',
    text: 'Given a mock useRef, create a ref with initial value 0, increment ref.current three times to simulate 3 renders, and return the final count.',
    setup: 'A mock useRef function.',
    setupCode: `// Create a ref and increment it 3 times\nconst useRef = (initial) => ({ current: initial });`,
    expected: 3,
    sample: `(() => {
  const renderCount = useRef(0);
  renderCount.current++;
  renderCount.current++;
  renderCount.current++;
  return renderCount.current;
})()`,
    realWorldExample:
      'Performance monitoring in the React DevTools Profiler uses ref-based render counters to show how many times each component re-renders without causing additional renders.',
    hints: [
      'useRef returns an object with a mutable current property',
      'Increment current with ++ to track renders',
    ],
    tags: ['hooks', 'useRef', 'mutable', 'render-count'],
  },
  {
    id: 'fe-react-use-imperative-handle',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    title: 'useImperativeHandle Pattern',
    text: 'Mock useImperativeHandle to expose a custom focus and scrollTo API via ref. Return the exposed methods object.',
    setup: 'A mock useImperativeHandle.',
    setupCode: `const useImperativeHandle = (ref, createHandle) => {\n  ref.current = createHandle();\n};\nconst ref = { current: null };\nuseImperativeHandle(ref, () => ({\n  focus: () => "focused",\n  scrollTo: (pos) => "scrolled-to-" + pos\n}));`,
    expected: { focus: 'focused', scrollTo: 'scrolled-to-top' },
    sample: '{ focus: ref.current.focus(), scrollTo: ref.current.scrollTo("top") }',
    realWorldExample:
      'Rich text editors like Draft.js expose focus() and insertText() methods via useImperativeHandle so parent toolbars can control the editor without accessing DOM internals directly.',
    hints: ['useImperativeHandle customizes the ref value', 'Return an object with custom methods'],
    tags: ['hooks', 'useImperativeHandle', 'forwardRef'],
  },
  {
    id: 'fe-react-state-batching',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    title: 'State Update Batching',
    text: 'Simulate React batching: multiple setState calls in one handler produce only one render. Return the render count and final state.',
    setup: 'A mock batching system.',
    setupCode: `let renderCount = 0;\nlet state = { a: 0, b: 0 };\nconst batch = (fn) => {\n  const updates = [];\n  const setState = (partial) => updates.push(partial);\n  fn(setState);\n  updates.forEach(u => { state = { ...state, ...u }; });\n  renderCount++;\n  return { renderCount, state };\n};`,
    expected: { renderCount: 1, state: { a: 1, b: 2 } },
    sample: 'batch((setState) => { setState({ a: 1 }); setState({ b: 2 }); })',
    realWorldExample:
      'React 18 automatically batches state updates inside event handlers -- clicking "Buy Now" on Amazon might update cart count and total price in a single render instead of two.',
    hints: [
      'Batching merges multiple setState calls into one render',
      'Only one render count increment',
    ],
    tags: ['state', 'batching', 'performance', 'rendering'],
  },
  {
    id: 'fe-react-usestate-toggle',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'useState Toggle Boolean',
    text: 'Given a mock useState, initialize state to true, then call setState with a functional updater that negates the previous value. Return the toggled state value.',
    setup: 'A mock useState function.',
    setupCode: `// Initialize with true, toggle using functional updater\nconst useState = (init) => {\n  let val = init;\n  const setState = (updater) => { val = typeof updater === 'function' ? updater(val) : updater; };\n  return [() => val, setState];\n};`,
    expected: false,
    sample: `(() => {
  const [getVal, setState] = useState(true);
  setState(prev => !prev);
  return getVal();
})()`,
    realWorldExample:
      'The hamburger menu on mobile Twitter toggles between open and closed with a single boolean state flip -- setState(prev => !prev) handles the toggle cleanly.',
    hints: [
      'Pass a function to setState that receives the previous value',
      'Use the logical NOT operator (!) to toggle a boolean',
    ],
    tags: ['hooks', 'useState', 'toggle', 'boolean'],
  },
  {
    id: 'fe-react-effect-deps-compare',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'Effect Dependency Comparison',
    text: 'A depsChanged function is provided that shallow-compares two dependency arrays using Object.is. Call it with the old and new deps to determine if the effect should re-run.',
    setup: 'A mock dependency comparison function.',
    setupCode: `const depsChanged = (oldDeps, newDeps) => {\n  if (!oldDeps) return true;\n  return oldDeps.some((dep, i) => !Object.is(dep, newDeps[i]));\n};\nconst oldDeps = [1, "hello", true];\nconst newDeps = [1, "hello", false];`,
    expected: true,
    sample: 'depsChanged(oldDeps, newDeps)',
    realWorldExample:
      'React internally uses Object.is to compare each dependency before re-running effects -- understanding this explains why passing a new object literal on every render causes infinite re-fetch loops.',
    hints: ['Compare each dependency with Object.is', 'If any differ, the effect should re-run'],
    tags: ['hooks', 'useEffect', 'dependencies', 'shallow-compare'],
  },
  {
    id: 'fe-react-usesyncexternalstore',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    title: 'useSyncExternalStore Pattern',
    text: 'A mock useSyncExternalStore and an external store are provided. Call useSyncExternalStore with the store subscribe function and a getSnapshot callback to read the current value.',
    setup: 'A mock external store and useSyncExternalStore.',
    setupCode: `const store = {\n  _value: 42,\n  getSnapshot: function() { return this._value; },\n  subscribe: function(cb) { return () => {}; }\n};\nconst useSyncExternalStore = (subscribe, getSnapshot) => getSnapshot();`,
    expected: 42,
    sample: 'useSyncExternalStore(store.subscribe, () => store.getSnapshot())',
    realWorldExample:
      'Libraries like Zustand and Redux use useSyncExternalStore to safely subscribe React components to external state without tearing issues during concurrent rendering.',
    hints: [
      'useSyncExternalStore takes subscribe and getSnapshot',
      'getSnapshot returns the current value',
    ],
    tags: ['hooks', 'useSyncExternalStore', 'external-store'],
  },
  {
    id: 'fe-react-usestate-counter-multiple',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'Multiple useState Hooks',
    text: 'Use separate useState calls for name and age. Return them as an object.',
    setup: 'Mock useState returns different values for each call.',
    setupCode: `let callIndex = 0;\nconst states = [["Alice", () => {}], [25, () => {}]];\nconst useState = (init) => states[callIndex++] || [init, () => {}];\nconst name = useState("")[0];\nconst age = useState(0)[0];`,
    expected: { name: 'Alice', age: 25 },
    sample: '{ name, age }',
    realWorldExample:
      'A user profile card on LinkedIn uses separate useState calls for name, headline, and avatar -- each piece of state updates independently without affecting the others.',
    hints: ['Each useState call is independent', 'React tracks hook calls by order'],
    tags: ['hooks', 'useState', 'multiple-state'],
  },
  {
    id: 'fe-react-reducer-init-function',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'useReducer with Init Function',
    text: 'Use useReducer with a third init argument function that transforms the initial arg. Return the initial state.',
    setup: 'A mock useReducer with lazy init.',
    setupCode: `const useReducer = (reducer, initArg, init) => {\n  const initialState = init ? init(initArg) : initArg;\n  return [initialState, () => {}];\n};\nconst init = (count) => ({ count, history: [count] });\nconst reducer = (s, a) => s;`,
    expected: { count: 10, history: [10] },
    sample: 'useReducer(reducer, 10, init)[0]',
    realWorldExample:
      'A data table component might accept a row count as a prop and use the init function to derive the full initial state (rows, sort order, page history) from that single number.',
    hints: ['The third argument transforms the initial arg', 'init(10) produces the initial state'],
    tags: ['hooks', 'useReducer', 'lazy-init'],
  },

  // ─── Common Patterns (17 problems) ─────────────────────────────

  {
    id: 'fe-react-hoc-pattern',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Higher-Order Component Pattern',
    text: 'Create an HOC that wraps a component and injects an "isAdmin" prop. Return the enhanced props.',
    setup: 'A mock HOC system.',
    setupCode: `const withAdmin = (Component) => (props) => Component({ ...props, isAdmin: true });\nconst MyComponent = (props) => props;\nconst Enhanced = withAdmin(MyComponent);`,
    expected: { name: 'Alice', isAdmin: true },
    sample: 'Enhanced({ name: "Alice" })',
    realWorldExample:
      'Redux connect() is a classic HOC that wraps your component and injects store data as props -- withAuth, withRouter, and withTheme all follow this exact pattern.',
    hints: ['HOC takes a component and returns a new one', 'Spread existing props and add isAdmin'],
    tags: ['patterns', 'hoc', 'higher-order-component'],
  },
  {
    id: 'fe-react-render-props',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Render Props Pattern',
    text: 'Use the render prop pattern to pass mouse coordinates to a render function. Return the rendered output.',
    setup: 'A mock component using render props.',
    setupCode: `const MouseTracker = (props) => {\n  const mouse = { x: 100, y: 200 };\n  return props.render(mouse);\n};`,
    expected: 'Mouse at 100, 200',
    sample: 'MouseTracker({ render: (mouse) => "Mouse at " + mouse.x + ", " + mouse.y })',
    realWorldExample:
      'Downshift (the autocomplete library used by Expedia) uses render props to share dropdown state, letting consumers fully customize how the suggestions list looks.',
    hints: [
      'Render props pass data to a render function',
      'The render function receives mouse coordinates',
    ],
    tags: ['patterns', 'render-props'],
  },
  {
    id: 'fe-react-compound-component',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'hard',
    title: 'Compound Component Pattern',
    text: 'Implement a compound component where parent shares state with children. Return the combined output.',
    setup: 'A mock compound component system.',
    setupCode: `const Tabs = (props) => {\n  const activeTab = props.defaultTab;\n  return props.children.map(child => child({ activeTab }));\n};\nconst Tab = (label) => ({ activeTab }) => activeTab === label ? label + ":active" : label + ":inactive";`,
    expected: ['home:active', 'profile:inactive', 'settings:inactive'],
    sample:
      'Tabs({ defaultTab: "home", children: [Tab("home"), Tab("profile"), Tab("settings")] })',
    realWorldExample:
      'Headless UI and Radix use compound components for Tab panels, Accordions, and Menus -- the parent (Tabs) shares active state with children (Tab, TabPanel) implicitly.',
    hints: ['Parent passes shared state to children', 'Each child receives activeTab prop'],
    tags: ['patterns', 'compound-components', 'composition'],
  },
  {
    id: 'fe-react-custom-hook-useprevious',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Custom Hook: usePrevious',
    text: 'Simulate usePrevious using a ref: create a ref object, read its current value as "previous", update it to the new value, and return previous. Call it twice (first with 5, then with 10) and return the second call result.',
    setup: 'A shared ref object for tracking previous values.',
    setupCode: `// Use this ref to track the previous value across calls\nconst ref = { current: undefined };`,
    expected: 5,
    sample: `(() => {
  const usePrevious = (value) => {
    const prev = ref.current;
    ref.current = value;
    return prev;
  };
  usePrevious(5);
  return usePrevious(10);
})()`,
    realWorldExample:
      'A stock ticker on Robinhood uses usePrevious to compare the current price with the last price and flash the number green (up) or red (down).',
    hints: [
      'Read ref.current before updating it to get the previous value',
      'The second call should return what was stored from the first call',
    ],
    tags: ['hooks', 'custom-hooks', 'usePrevious'],
  },
  {
    id: 'fe-react-portal-logic',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'easy',
    title: 'Portal Rendering Logic',
    text: 'Implement a mock createPortal function that takes children and a container name, returning a portal descriptor object with type, children, and container properties. Create a portal for "Modal Content" targeting "modal-root".',
    setup: 'No setup needed — implement createPortal yourself.',
    setupCode: ``,
    expected: { type: 'portal', children: 'Modal Content', container: 'modal-root' },
    sample: `const createPortal = (children, container) => ({ type: "portal", children, container });
createPortal("Modal Content", "modal-root")`,
    realWorldExample:
      'Modals, tooltips, and toasts on apps like Notion and Slack render via portals to escape parent overflow:hidden and z-index stacking contexts.',
    hints: [
      'createPortal returns an object describing where to render',
      'Include type: "portal", children, and container in the descriptor',
    ],
    tags: ['patterns', 'portal', 'createPortal'],
  },
  {
    id: 'fe-react-error-boundary-logic',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'hard',
    title: 'Error Boundary Pattern',
    text: 'Simulate an error boundary: start with state { hasError: false, error: null }. Write a getDerivedStateFromError function that takes an error and returns { hasError: true, error: error.message }. Then use try/catch to catch a thrown Error("Component crashed") and update state. Return the final state.',
    setup: 'No setup needed -- implement the error boundary logic.',
    setupCode: `// Implement the error boundary pattern from scratch`,
    expected: { hasError: true, error: 'Component crashed' },
    sample: `(() => {
  let state = { hasError: false, error: null };
  const getDerivedStateFromError = (error) => ({
    hasError: true,
    error: error.message
  });
  try {
    throw new Error("Component crashed");
  } catch (e) {
    state = getDerivedStateFromError(e);
  }
  return state;
})()`,
    realWorldExample:
      'Facebook wraps each News Feed post in an error boundary so a single broken post shows "Something went wrong" instead of crashing the entire page.',
    hints: [
      'Use try/catch to simulate catching a render error',
      'getDerivedStateFromError should return new state with the error message',
    ],
    tags: ['patterns', 'error-boundary', 'error-handling'],
  },
  {
    id: 'fe-react-context-selector',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Context Selector Pattern',
    text: 'Use a selector to read only a specific part of a context value. Return the selected value.',
    setup: 'A mock context with selector support.',
    setupCode: `const context = { user: { name: "Alice", age: 30 }, theme: "dark", lang: "en" };\nconst useContextSelector = (ctx, selector) => selector(ctx);`,
    expected: 'Alice',
    sample: 'useContextSelector(context, (ctx) => ctx.user.name)',
    realWorldExample:
      'In a large app like Figma, a context might hold user data, theme, and permissions -- a selector ensures the avatar component only re-renders when user.name changes, not when theme updates.',
    hints: ['Selector function extracts a specific value', 'Prevents unnecessary re-renders'],
    tags: ['context', 'selector', 'performance'],
  },
  {
    id: 'fe-react-controlled-uncontrolled',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'easy',
    title: 'Controlled vs Uncontrolled Check',
    text: 'Write a function that takes a props object and returns "controlled" if props.value is defined, or "uncontrolled" otherwise. Test it with controlledProps.',
    setup: 'Two sets of component props.',
    setupCode: `// Write a function to check these props\nconst controlledProps = { value: "test", onChange: () => {} };\nconst uncontrolledProps = { defaultValue: "test" };`,
    expected: 'controlled',
    sample:
      '((props) => props.value !== undefined ? "controlled" : "uncontrolled")(controlledProps)',
    realWorldExample:
      'Material UI TextField supports both modes -- passing a value prop makes it controlled (React owns the state), while defaultValue makes it uncontrolled (DOM owns the state).',
    hints: [
      'Controlled components have an explicit value prop',
      'Check if props.value is not undefined',
    ],
    tags: ['patterns', 'controlled', 'uncontrolled'],
  },
  {
    id: 'fe-react-provider-composition',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'hard',
    title: 'Provider Composition (Provider Hell Fix)',
    text: 'Write a composeProviders function that takes an array of [name, value] pairs and merges all values into a single object using reduce. Apply it to the providers array.',
    setup: 'An array of provider name/value pairs.',
    setupCode: `// Write composeProviders to merge these into one object\nconst providers = [\n  ["ThemeProvider", { theme: "dark" }],\n  ["AuthProvider", { user: "Alice" }],\n  ["LangProvider", { lang: "en" }]\n];`,
    expected: { theme: 'dark', user: 'Alice', lang: 'en' },
    sample: `(() => {
  const composeProviders = (provs) =>
    provs.reduce((acc, [name, value]) => ({ ...acc, ...value }), {});
  return composeProviders(providers);
})()`,
    realWorldExample:
      'Large Next.js apps often wrap the root in 5+ providers (Auth, Theme, Intl, Query, Analytics) -- composing them avoids deeply nested JSX known as "provider hell".',
    hints: [
      'Use Array.reduce to accumulate values from each provider',
      'Spread each value object into the accumulator',
    ],
    tags: ['patterns', 'providers', 'composition'],
  },
  {
    id: 'fe-react-custom-hook-uselocalstorage',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Custom Hook: useLocalStorage',
    text: 'Mock a useLocalStorage hook that reads from a mock storage. Return the stored value.',
    setup: 'A mock localStorage and useLocalStorage hook.',
    setupCode: `const mockStorage = { theme: "dark", lang: "en" };\nconst useLocalStorage = (key, defaultVal) => {\n  const stored = mockStorage[key];\n  return [stored !== undefined ? stored : defaultVal, (v) => { mockStorage[key] = v; }];\n};`,
    expected: 'dark',
    sample: 'useLocalStorage("theme", "light")[0]',
    realWorldExample:
      'Notion persists sidebar width and dark mode preference in localStorage -- useLocalStorage syncs React state with the browser so your settings survive page refreshes.',
    hints: ['Read from storage first', 'Fall back to default value'],
    tags: ['hooks', 'custom-hooks', 'localStorage'],
  },
  {
    id: 'fe-react-lazy-component',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'React.lazy Pattern',
    text: 'Mock React.lazy to create a lazily loaded component descriptor. Return the lazy component type.',
    setup: 'A mock React.lazy implementation.',
    setupCode: `const lazy = (importFn) => {\n  return { $$typeof: "lazy", _init: importFn, _status: "pending" };\n};\nconst LazyComponent = lazy(() => ({ default: "MyComponent" }));`,
    expected: { $$typeof: 'lazy', _status: 'pending' },
    sample: '{ $$typeof: LazyComponent.$$typeof, _status: LazyComponent._status }',
    realWorldExample:
      'GitHub loads the code editor, markdown preview, and diff viewer as lazy components so the initial page load is fast and heavy features are fetched only when needed.',
    hints: ['React.lazy wraps a dynamic import', 'Returns a special lazy type'],
    tags: ['patterns', 'lazy', 'code-splitting'],
  },
  {
    id: 'fe-react-custom-hook-usewindowsize',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'easy',
    title: 'Custom Hook: useWindowSize',
    text: 'Write a useWindowSize hook function that returns an object with width and height representing window dimensions. Use the provided mockWidth and mockHeight values. Return the size object.',
    setup: 'Mock window dimension values.',
    setupCode: `// Use these values in your useWindowSize implementation\nconst mockWidth = 1024;\nconst mockHeight = 768;`,
    expected: { width: 1024, height: 768 },
    sample: `(() => {
  const useWindowSize = () => ({ width: mockWidth, height: mockHeight });
  return useWindowSize();
})()`,
    realWorldExample:
      'Responsive dashboards like Grafana use useWindowSize to switch between compact mobile and full desktop layouts when the browser is resized.',
    hints: [
      'A custom hook is just a function that returns state',
      'Return an object with width and height properties',
    ],
    tags: ['hooks', 'custom-hooks', 'useWindowSize'],
  },
  {
    id: 'fe-react-custom-hook-usedebounce',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Custom Hook: useDebounce',
    text: 'Write a useDebounce hook function that takes a value and delay, and returns the value (simulating that the delay has passed). In a real implementation this would use useEffect and setTimeout. Call it with searchTerm and 500ms.',
    setup: 'A search term to debounce.',
    setupCode: `// Write useDebounce and call it with this value\nconst searchTerm = "react hooks";`,
    expected: 'react hooks',
    sample: '((value, delay) => value)(searchTerm, 500)',
    realWorldExample:
      'The npm package search on npmjs.com debounces search input with useDebounce so API calls only fire after the user stops typing for 300ms, reducing server load by 90%.',
    hints: [
      'In this simplified version, just return the value after the delay conceptually passes',
      'In a real hook, you would use useEffect with setTimeout to delay updates',
    ],
    tags: ['hooks', 'custom-hooks', 'useDebounce', 'debounce'],
  },
  {
    id: 'fe-react-slot-pattern',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'easy',
    title: 'Slot Pattern (Named Children)',
    text: 'Implement a Layout function that accepts a slots object with header, body, and footer properties, and returns them assembled into a layout object. Call it with appropriate slot content.',
    setup: 'No setup needed — implement Layout yourself.',
    setupCode: ``,
    expected: { header: 'My App', body: 'Content here', footer: '2024' },
    sample: `const Layout = (slots) => ({ header: slots.header, body: slots.body, footer: slots.footer });
Layout({ header: "My App", body: "Content here", footer: "2024" })`,
    realWorldExample:
      'Dashboard frameworks like Ant Design Pro use a slot pattern for layout -- pass header, sidebar, and content as named children to a PageLayout component.',
    hints: [
      'The Layout function destructures named slots from its argument',
      'Return an object with each slot mapped to its position',
    ],
    tags: ['patterns', 'slots', 'composition', 'layout'],
  },
  {
    id: 'fe-react-observer-pattern',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'hard',
    title: 'Observer Pattern for State',
    text: 'Write a createStore function that returns { subscribe(fn), emit(val), getValue() }. subscribe adds a listener, emit updates the value and calls all listeners. Create a store, subscribe two listeners that push "A:" and "B:" + value to results, emit 42, and return results.',
    setup: 'A results array for collecting listener output.',
    setupCode: `// Implement createStore and use it\nconst results = [];`,
    expected: ['A:42', 'B:42'],
    sample: `(() => {
  const createStore = (initial) => {
    let value = initial;
    const listeners = [];
    return {
      subscribe: (fn) => { listeners.push(fn); },
      emit: (val) => { value = val; listeners.forEach(fn => fn(val)); },
      getValue: () => value
    };
  };
  const store = createStore(0);
  store.subscribe(v => results.push("A:" + v));
  store.subscribe(v => results.push("B:" + v));
  store.emit(42);
  return results;
})()`,
    realWorldExample:
      'Zustand and MobX use the observer/pub-sub pattern at their core -- when a store value changes, all subscribed components are notified and re-render with fresh data.',
    hints: [
      'Store listeners in an array and iterate on emit',
      'Each listener receives the emitted value as an argument',
    ],
    tags: ['patterns', 'observer', 'pub-sub', 'store'],
  },
  {
    id: 'fe-react-children-map',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'React.Children.map Pattern',
    text: 'Use a mock Children.map to transform each child by adding an index property. Return the transformed children.',
    setup: 'A mock React.Children.map.',
    setupCode: `const Children = {\n  map: (children, fn) => children.map((child, index) => fn(child, index))\n};\nconst kids = ["Alice", "Bob", "Charlie"];`,
    expected: [
      { child: 'Alice', index: 0 },
      { child: 'Bob', index: 1 },
      { child: 'Charlie', index: 2 },
    ],
    sample: 'Children.map(kids, (child, index) => ({ child, index }))',
    realWorldExample:
      'A Carousel component in Ant Design uses React.Children.map to clone each child slide and inject an index prop for determining which slide is currently active.',
    hints: ['Children.map iterates over React children', 'Transform each child with the callback'],
    tags: ['patterns', 'children', 'React.Children'],
  },
  {
    id: 'fe-react-custom-hook-usefetch',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Custom Hook: useFetch',
    text: 'Write a useFetch hook function that takes a URL. Use the provided mockData map to simulate responses. If the URL matches a key, return { loading: false, data: mockData[url], error: null }. Otherwise return { loading: true, data: null, error: null }. Call with "/api/users".',
    setup: 'Mock data keyed by URL.',
    setupCode: `// Use this data map in your useFetch implementation\nconst mockData = { "/api/users": [{ id: 1, name: "Alice" }] };`,
    expected: { loading: false, data: [{ id: 1, name: 'Alice' }], error: null },
    sample: `((url) => {
  if (mockData[url]) {
    return { loading: false, data: mockData[url], error: null };
  }
  return { loading: true, data: null, error: null };
})("/api/users")`,
    realWorldExample:
      'TanStack Query (React Query) abstracts this useFetch pattern -- your component just calls useQuery("/api/users") and gets loading, data, and error states automatically.',
    hints: [
      'Check if the URL exists in the mock data map',
      'Return different states based on whether data is available',
    ],
    tags: ['hooks', 'custom-hooks', 'useFetch', 'data-fetching'],
  },

  // ─── Rendering (17 problems) ───────────────────────────────────

  {
    id: 'fe-react-fragment-usage',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'Fragment Grouping',
    text: 'Implement a mock Fragment function that takes any number of children and returns a fragment descriptor with type "fragment" and the children array. Use it to group "Hello", " ", and "World".',
    setup: 'No setup needed — implement Fragment yourself.',
    setupCode: ``,
    expected: { type: 'fragment', children: ['Hello', ' ', 'World'] },
    sample: `const Fragment = (...children) => ({ type: "fragment", children });
Fragment("Hello", " ", "World")`,
    realWorldExample:
      'When rendering a breadcrumb trail like "Home > Products > Shoes" in a nav bar, Fragments let you return multiple elements without wrapping them in an unnecessary div.',
    hints: [
      'Use rest parameters (...children) to collect all arguments',
      'Return an object with type: "fragment" and the children array',
    ],
    tags: ['rendering', 'fragment', 'jsx'],
  },
  {
    id: 'fe-react-memo-shallow',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'React.memo Shallow Comparison',
    text: 'Use shallowEqual to compare previous and next props. shallowEqual returns true if all props match (no re-render needed) or false if any prop differs (re-render needed). Return the comparison result.',
    setup: 'A mock props comparison function.',
    setupCode: `const shallowEqual = (prev, next) => {\n  const prevKeys = Object.keys(prev);\n  const nextKeys = Object.keys(next);\n  if (prevKeys.length !== nextKeys.length) return false;\n  return prevKeys.every(key => Object.is(prev[key], next[key]));\n};\nconst prevProps = { name: "Alice", count: 5 };\nconst nextProps = { name: "Alice", count: 6 };`,
    expected: false,
    sample: 'shallowEqual(prevProps, nextProps)',
    realWorldExample:
      'In a Twitter feed with thousands of tweet cards, React.memo prevents re-rendering cards whose props have not changed, keeping scroll performance smooth.',
    hints: ['Shallow comparison checks each prop with Object.is', 'count changed from 5 to 6'],
    tags: ['rendering', 'memo', 'shallow-compare', 'performance'],
  },
  {
    id: 'fe-react-key-reorder',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'Key-Based Reconciliation',
    text: 'Given an old list and a new reordered list, determine which items need to be moved based on keys. Return the moved item keys.',
    setup: 'A mock reconciliation diff.',
    setupCode: `const findMoved = (oldList, newList) => {\n  const oldOrder = oldList.map(i => i.key);\n  const newOrder = newList.map(i => i.key);\n  return newOrder.filter((key, i) => oldOrder[i] !== key);\n};\nconst oldList = [{ key: "a" }, { key: "b" }, { key: "c" }];\nconst newList = [{ key: "c" }, { key: "a" }, { key: "b" }];`,
    expected: ['c', 'a', 'b'],
    sample: 'findMoved(oldList, newList)',
    realWorldExample:
      'When you drag-reorder cards on a Trello board, React uses keys to reconcile the old and new positions, moving DOM nodes instead of destroying and recreating them.',
    hints: ['Compare positions by index', 'Items that changed position need to move'],
    tags: ['rendering', 'reconciliation', 'keys', 'virtual-dom'],
  },
  {
    id: 'fe-react-conditional-null',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'Conditional Render with null',
    text: 'Given shouldHide (true) and content variables, write an expression that returns null when shouldHide is true, or the content string otherwise.',
    setup: 'Variables for conditional rendering.',
    setupCode: `// Use these in a conditional expression\nconst shouldHide = true;\nconst content = "Visible Content";`,
    expected: null,
    sample: 'shouldHide ? null : content',
    realWorldExample:
      'Slack hides the unread badge by rendering null when the count is zero -- the component exists in the tree but produces no visible output.',
    hints: [
      'Use a ternary operator for inline conditional rendering',
      'Returning null tells React to render nothing',
    ],
    tags: ['rendering', 'conditional', 'null'],
  },
  {
    id: 'fe-react-short-circuit',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'Short-Circuit Rendering',
    text: 'Use the && operator for conditional rendering. Return the result of (hasItems && count).',
    setup: 'Variables for short-circuit rendering.',
    setupCode: `const items = [1, 2, 3];\nconst hasItems = items.length > 0;\nconst count = items.length;`,
    expected: 3,
    sample: 'hasItems && count',
    realWorldExample:
      'GitHub PR pages use short-circuit rendering: {hasConflicts && <ConflictWarning />} only shows the merge conflict banner when conflicts actually exist.',
    hints: ['&& returns the right side if left is truthy', 'items.length is 3 which is truthy'],
    tags: ['rendering', 'conditional', 'short-circuit'],
  },
  {
    id: 'fe-react-render-switch',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'Switch-Case Rendering',
    text: 'Implement a render function that returns different content based on a status value using a lookup map.',
    setup: 'A status-based renderer.',
    setupCode: `const renderByStatus = (status) => {\n  const views = {\n    loading: "Loading spinner",\n    error: "Error message",\n    success: "Data content",\n    empty: "No data"\n  };\n  return views[status] || "Unknown";\n};`,
    expected: 'Error message',
    sample: 'renderByStatus("error")',
    realWorldExample:
      'The Vercel deployment dashboard renders different views (building, ready, error, queued) based on deployment status -- an object lookup maps each status to its corresponding UI.',
    hints: ['Use an object lookup instead of switch-case', 'Map status to content'],
    tags: ['rendering', 'conditional', 'switch', 'patterns'],
  },
  {
    id: 'fe-react-list-filter-render',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'Filtered List Rendering',
    text: 'Filter and map a list of users to render only active users. Return the names of active users.',
    setup: 'A list of users with active status.',
    setupCode: `const users = [\n  { id: 1, name: "Alice", active: true },\n  { id: 2, name: "Bob", active: false },\n  { id: 3, name: "Charlie", active: true },\n  { id: 4, name: "Diana", active: false }\n];`,
    expected: ['Alice', 'Charlie'],
    sample: 'users.filter(u => u.active).map(u => u.name)',
    realWorldExample:
      'Slack filters the member list to show only "online" users in the sidebar -- filter(active).map(render) is the exact pattern for conditional list display.',
    hints: ['Filter first, then map', 'Only active users should be included'],
    tags: ['rendering', 'lists', 'filter', 'map'],
  },
  {
    id: 'fe-react-nested-list',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'Nested List Rendering',
    text: 'Render a nested data structure (categories with items). Return a flat array of "category: item" strings.',
    setup: 'A nested data structure.',
    setupCode: `const categories = [\n  { name: "Fruits", items: ["Apple", "Banana"] },\n  { name: "Vegs", items: ["Carrot"] }\n];`,
    expected: ['Fruits: Apple', 'Fruits: Banana', 'Vegs: Carrot'],
    sample: 'categories.flatMap(cat => cat.items.map(item => cat.name + ": " + item))',
    realWorldExample:
      'The Spotify library page renders nested playlists grouped by category (Made For You, Recently Played, etc.) -- flatMap flattens the two-level structure into a single renderable list.',
    hints: ['Use flatMap to flatten nested arrays', 'Combine category name with each item'],
    tags: ['rendering', 'lists', 'nested', 'flatMap'],
  },
  {
    id: 'fe-react-memo-custom-compare',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'hard',
    title: 'React.memo with Custom Comparator',
    text: 'Write an areEqual comparator function for React.memo that only compares the "id" prop, ignoring all other prop changes. Test it with prevProps { id: 1, name: "Alice" } and nextProps { id: 1, name: "Bob" }. Return whether the component should skip re-render.',
    setup: 'Two props objects to compare.',
    setupCode: `// Write areEqual and test with these props\nconst prevProps = { id: 1, name: "Alice" };\nconst nextProps = { id: 1, name: "Bob" };`,
    expected: true,
    sample: '((prev, next) => prev.id === next.id)(prevProps, nextProps)',
    realWorldExample:
      'A YouTube video thumbnail component might use a custom comparator that only checks videoId -- re-rendering for view count changes would be wasteful since the thumbnail image stays the same.',
    hints: [
      'areEqual returns true to skip re-render, false to re-render',
      'Only compare the id property, ignore other changes',
    ],
    tags: ['rendering', 'memo', 'performance', 'custom-compare'],
  },
  {
    id: 'fe-react-suspense-fallback',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'Suspense Fallback Logic',
    text: 'Simulate Suspense behavior: if the child throws a promise (is loading), show fallback. Otherwise show content.',
    setup: 'A mock Suspense component.',
    setupCode: `const Suspense = (props) => {\n  try {\n    const result = props.children();\n    return result;\n  } catch (e) {\n    if (e && typeof e.then === 'function') return props.fallback;\n    throw e;\n  }\n};\nconst Loading = "Loading...";\nconst pendingChild = () => { throw { then: () => {} }; };`,
    expected: 'Loading...',
    sample: 'Suspense({ children: pendingChild, fallback: Loading })',
    realWorldExample:
      'Next.js App Router uses Suspense boundaries to show skeleton loading states while server components stream in -- the user sees instant layout structure with content filling in progressively.',
    hints: ['Suspense catches thrown promises', 'Shows fallback while data is loading'],
    tags: ['rendering', 'suspense', 'fallback', 'async'],
  },
  {
    id: 'fe-react-element-type-check',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'React Element Type Check',
    text: 'Check if a value is a valid React element descriptor (has $$typeof symbol). Return true or false.',
    setup: 'Mock React element descriptors.',
    setupCode: `const REACT_ELEMENT_TYPE = "react.element";\nconst isValidElement = (obj) => obj !== null && typeof obj === 'object' && obj.$$typeof === REACT_ELEMENT_TYPE;\nconst element = { $$typeof: "react.element", type: "div", props: {} };\nconst notElement = { type: "div" };`,
    expected: true,
    sample: 'isValidElement(element)',
    realWorldExample:
      'Component libraries like Chakra UI use isValidElement to distinguish React elements from plain strings or numbers when processing children, enabling different rendering logic for each.',
    hints: ['React elements have $$typeof property', 'Check for the react.element symbol'],
    tags: ['rendering', 'elements', 'validation'],
  },
  {
    id: 'fe-react-vdom-diff',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'hard',
    title: 'Virtual DOM Diff',
    text: 'Compute a simple diff between old and new virtual DOM trees. Return the list of changes.',
    setup: 'A mock VDOM diff algorithm.',
    setupCode: `const diff = (oldNode, newNode) => {\n  const changes = [];\n  if (oldNode.type !== newNode.type) {\n    changes.push({ type: "REPLACE", path: "/" });\n  } else {\n    Object.keys(newNode.props || {}).forEach(key => {\n      if (oldNode.props[key] !== newNode.props[key]) {\n        changes.push({ type: "UPDATE", path: "/" + key, value: newNode.props[key] });\n      }\n    });\n  }\n  return changes;\n};\nconst oldTree = { type: "div", props: { className: "old", id: "main" } };\nconst newTree = { type: "div", props: { className: "new", id: "main" } };`,
    expected: [{ type: 'UPDATE', path: '/className', value: 'new' }],
    sample: 'diff(oldTree, newTree)',
    realWorldExample:
      'React internally diffs the previous and next virtual DOM trees to compute the minimal set of real DOM mutations -- this is why React apps update the screen efficiently without full page reloads.',
    hints: ['Compare each prop between old and new', 'Only className changed'],
    tags: ['rendering', 'virtual-dom', 'reconciliation', 'diff'],
  },
  {
    id: 'fe-react-render-callback',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'Children as Function (Render Callback)',
    text: 'Implement a DataProvider that passes fetched data to children as a function. Return the rendered output.',
    setup: 'A mock DataProvider using children as function.',
    setupCode: `const DataProvider = (props) => {\n  const data = { users: ["Alice", "Bob"] };\n  return props.children(data);\n};`,
    expected: 'Users: Alice, Bob',
    sample: 'DataProvider({ children: (data) => "Users: " + data.users.join(", ") })',
    realWorldExample:
      'React Spring uses the children-as-function pattern so animated values flow into your render function, giving you full control over how animated styles are applied.',
    hints: ['Children is a function that receives data', 'Invoke children with the fetched data'],
    tags: ['rendering', 'render-callback', 'children-as-function'],
  },
  {
    id: 'fe-react-conditional-classname',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'Dynamic className',
    text: 'Implement a cx (classnames) function that takes any number of class values, filters out falsy ones, and joins the rest with spaces. Use it with the provided state flags.',
    setup: 'Component state flags.',
    setupCode: `const isActive = true;\nconst isDisabled = false;\nconst isLarge = true;`,
    expected: 'btn active large',
    sample: `const cx = (...classes) => classes.filter(Boolean).join(" ");
cx("btn", isActive && "active", isDisabled && "disabled", isLarge && "large")`,
    realWorldExample:
      'Tailwind CSS projects use the clsx/classnames utility everywhere -- conditionally applying "bg-blue-500" when active or "opacity-50 cursor-not-allowed" when disabled.',
    hints: [
      'Use filter(Boolean) to remove falsy values (false, null, undefined, 0, "")',
      'Join the remaining truthy class names with a space',
    ],
    tags: ['rendering', 'className', 'conditional'],
  },
  {
    id: 'fe-react-vdom-create-element',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'createElement Pattern',
    text: 'Implement a mock createElement function that takes a type, props object, and children. Return an element descriptor with $$typeof: "react.element", type, and props (merged with children). Single child should be unwrapped from its array.',
    setup: 'No setup needed — implement createElement yourself.',
    setupCode: ``,
    expected: { $$typeof: 'react.element', type: 'div', props: { id: 'root', children: 'Hello' } },
    sample: `const createElement = (type, props, ...children) => ({
  $$typeof: "react.element",
  type,
  props: { ...props, children: children.length === 1 ? children[0] : children }
});
createElement("div", { id: "root" }, "Hello")`,
    realWorldExample:
      'Every JSX tag you write (<div id="root">Hello</div>) is compiled by Babel into a React.createElement call -- understanding this function reveals what JSX actually produces.',
    hints: [
      'Use rest parameters for children',
      'If there is exactly one child, unwrap it from the array',
    ],
    tags: ['rendering', 'createElement', 'virtual-dom'],
  },
  {
    id: 'fe-react-fiber-priority',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'hard',
    title: 'Fiber Priority Scheduling',
    text: 'Implement a schedule function that takes an array of task objects (each with name and priority) and returns the task names sorted by priority (lowest number = highest urgency).',
    setup: 'Priority constants and a list of tasks.',
    setupCode: `const PRIORITIES = { IMMEDIATE: 1, USER_BLOCKING: 2, NORMAL: 3, LOW: 4, IDLE: 5 };\nconst tasks = [\n  { name: "animation", priority: PRIORITIES.USER_BLOCKING },\n  { name: "data-fetch", priority: PRIORITIES.NORMAL },\n  { name: "analytics", priority: PRIORITIES.IDLE },\n  { name: "click-handler", priority: PRIORITIES.IMMEDIATE }\n];`,
    expected: ['click-handler', 'animation', 'data-fetch', 'analytics'],
    sample: `const schedule = (t) => [...t].sort((a, b) => a.priority - b.priority).map(t => t.name);
schedule(tasks)`,
    realWorldExample:
      'React 18 Concurrent Mode prioritizes user interactions (clicks, typing) over background work (analytics, prefetching) using a priority scheduler similar to this pattern.',
    hints: [
      'Sort tasks by priority number — lower number means higher urgency',
      'Use .map() to extract just the task names after sorting',
    ],
    tags: ['rendering', 'fiber', 'scheduling', 'priority'],
  },
  {
    id: 'fe-react-render-nothing',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'hard',
    title: 'Falsy Values in JSX',
    text: 'Write a willRender function that returns true for values React includes in JSX output. React silently skips exactly four values: false, null, undefined, and true. Everything else — including 0 and empty string — is rendered. Filter the provided values array using your function.',
    setup: 'An array of values to test.',
    setupCode: `// Write willRender and filter this array\nconst values = [false, 0, "", null, undefined, true, "hello"];`,
    expected: [0, '', 'hello'],
    sample: `(() => {
  const willRender = (val) => {
    if (val === false || val === null || val === undefined || val === true) return false;
    return true;
  };
  return values.filter(v => willRender(v));
})()`,
    realWorldExample:
      'A common React bug is writing {count && <Badge />} where count is 0 -- instead of rendering nothing, React renders a literal "0" on screen because 0 is a renderable falsy value.',
    hints: [
      'React skips exactly four values: false, null, undefined, and true',
      '0 and empty string are NOT skipped — they produce DOM text nodes despite being falsy',
      'Use strict equality checks to identify the four skipped values',
    ],
    tags: ['rendering', 'jsx', 'falsy-values'],
  },

  // ─── Data Fetching (17 problems) ───────────────────────────────

  {
    id: 'fe-react-fetch-loading-states',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'easy',
    title: 'Loading State Machine',
    text: 'Given a transitions map that defines valid state changes (idle->FETCH->loading, loading->SUCCESS->success, etc.), write a transition function that takes a current state and event, then returns the next state. Call it to transition from "idle" with "FETCH".',
    setup: 'A state machine transitions map.',
    setupCode: `// Write a transition function using this map\nconst transitions = {\n  idle: { FETCH: "loading" },\n  loading: { SUCCESS: "success", ERROR: "error" },\n  success: { FETCH: "loading" },\n  error: { FETCH: "loading", RESET: "idle" }\n};`,
    expected: 'loading',
    sample: '((state, event) => transitions[state][event] || state)("idle", "FETCH")',
    realWorldExample:
      'XState powers state machines in apps like Stately Studio -- modeling fetch flows as idle/loading/success/error prevents impossible states like showing data and an error simultaneously.',
    hints: [
      'Look up the current state in the transitions map, then the event',
      'Fall back to the current state if no valid transition exists',
    ],
    tags: ['data-fetching', 'state-machine', 'loading'],
  },
  {
    id: 'fe-react-fetch-error-handling',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'Fetch Error Handling Pattern',
    text: 'Write a simulateFetch function that takes a shouldFail boolean. If true, return { loading: false, data: null, error: "Network request failed" }. If false, return { loading: false, data: { id: 1 }, error: null }. Call it with true.',
    setup: 'No setup needed -- implement the fetch simulation.',
    setupCode: `// Implement simulateFetch and call it`,
    expected: { loading: false, data: null, error: 'Network request failed' },
    sample: `(() => {
  const simulateFetch = (shouldFail) => {
    if (shouldFail) {
      return { loading: false, data: null, error: "Network request failed" };
    }
    return { loading: false, data: { id: 1 }, error: null };
  };
  return simulateFetch(true);
})()`,
    realWorldExample:
      'When Stripe Dashboard fails to load payment data, it shows a clear error message with a "Retry" button -- this error state pattern ensures the UI gracefully handles network failures.',
    hints: [
      'Use an if/else or ternary based on the shouldFail flag',
      'The error state should have loading: false and data: null',
    ],
    tags: ['data-fetching', 'error-handling', 'state'],
  },
  {
    id: 'fe-react-fetch-cache',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'Simple Request Cache',
    text: 'Implement a simple cache that stores fetch results by URL. Retrieve a cached result. Return the cached data.',
    setup: 'A mock fetch cache.',
    setupCode: `const cache = {};\nconst cachedFetch = (url, data) => {\n  if (cache[url]) return { cached: true, data: cache[url] };\n  cache[url] = data;\n  return { cached: false, data };\n};\ncachedFetch("/api/users", ["Alice", "Bob"]);`,
    expected: { cached: true, data: ['Alice', 'Bob'] },
    sample: 'cachedFetch("/api/users", null)',
    realWorldExample:
      'TanStack Query and SWR cache API responses so navigating back to a previously visited page on Airbnb shows instant results from cache while revalidating in the background.',
    hints: ['Check cache first before fetching', 'Return cached data if available'],
    tags: ['data-fetching', 'cache', 'performance'],
  },
  {
    id: 'fe-react-fetch-abort',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'AbortController Pattern',
    text: 'Given a mock AbortController factory, create a controller, call abort() on it, then return controller.signal.aborted.',
    setup: 'A mock AbortController factory.',
    setupCode: `// Create a controller, abort it, check signal.aborted\nconst AbortController = () => {\n  let aborted = false;\n  return {\n    signal: { get aborted() { return aborted; } },\n    abort: () => { aborted = true; }\n  };\n};`,
    expected: true,
    sample: `(() => {
  const controller = AbortController();
  controller.abort();
  return controller.signal.aborted;
})()`,
    realWorldExample:
      'When you navigate away from a page on Netflix before movie data finishes loading, AbortController cancels the in-flight fetch to prevent updating state on an unmounted component.',
    hints: [
      'Create the controller first, then call abort()',
      'signal.aborted reflects whether abort() has been called',
    ],
    tags: ['data-fetching', 'abort', 'cleanup'],
  },
  {
    id: 'fe-react-fetch-retry',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'hard',
    title: 'Fetch with Retry Logic',
    text: 'Write a fetchWithRetry function that takes a maxRetries number. It has a tryFetch helper that increments an attempt counter: fails (returns { ok: false, attempt }) when attempt < 3, succeeds (returns { ok: true, data: "success", attempt }) on attempt 3+. Loop retrying until success or maxRetries reached. Call fetchWithRetry(5).',
    setup: 'No setup needed -- implement retry logic.',
    setupCode: `// Implement fetchWithRetry with a retry loop`,
    expected: { ok: true, data: 'success', attempt: 3 },
    sample: `(() => {
  const fetchWithRetry = (maxRetries) => {
    let attempt = 0;
    const tryFetch = () => {
      attempt++;
      if (attempt < 3) return { ok: false, attempt };
      return { ok: true, data: "success", attempt };
    };
    let result = tryFetch();
    while (!result.ok && attempt < maxRetries) { result = tryFetch(); }
    return result;
  };
  return fetchWithRetry(5);
})()`,
    realWorldExample:
      'GitHub Actions retries failed API calls up to 3 times with exponential backoff -- retry logic ensures transient network blips do not cause permanent failures.',
    hints: [
      'Use a while loop that continues while result.ok is false and attempts remain',
      'The tryFetch function succeeds when attempt reaches 3',
    ],
    tags: ['data-fetching', 'retry', 'resilience'],
  },
  {
    id: 'fe-react-fetch-race-condition',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'hard',
    title: 'Race Condition Prevention',
    text: 'Write a createFetchManager that tracks an auto-incrementing request ID. Its request(data) method increments the ID and returns { id, data }. Its isLatest(id) method checks if that id is still current. Create a manager, make two requests ("stale" then "fresh"), and return { isStale: true if the first request is no longer latest, isFresh: true if the second request is still latest }.',
    setup: 'No setup needed -- implement the fetch manager.',
    setupCode: `// Implement createFetchManager with ID tracking`,
    expected: { isStale: true, isFresh: true },
    sample: `(() => {
  const createFetchManager = () => {
    let currentId = 0;
    return {
      request: (data) => { const id = ++currentId; return { id, data }; },
      isLatest: (id) => id === currentId
    };
  };
  const manager = createFetchManager();
  const result1 = manager.request("stale");
  const result2 = manager.request("fresh");
  return { isStale: !manager.isLatest(result1.id), isFresh: manager.isLatest(result2.id) };
})()`,
    realWorldExample:
      'Rapidly switching between subreddits on Reddit can cause earlier, slower responses to arrive after newer ones -- a request ID tracker ensures only the latest search result is displayed.',
    hints: [
      'Each fetch call should increment and capture a unique ID',
      'isLatest compares a given ID against the current (most recent) ID',
    ],
    tags: ['data-fetching', 'race-condition', 'stale-data'],
  },
  {
    id: 'fe-react-fetch-pagination',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'Paginated Data Fetching',
    text: 'Write a createPagination function that manages state { items, page, hasMore }. Its fetchPage(page, newItems) method appends newItems to existing items, sets the page, and sets hasMore based on whether newItems is non-empty. Fetch page 1 with ["a","b"] and page 2 with ["c","d"], then return the state.',
    setup: 'No setup needed -- implement pagination state.',
    setupCode: `// Implement createPagination with fetchPage and getState`,
    expected: { items: ['a', 'b', 'c', 'd'], page: 2, hasMore: true },
    sample: `(() => {
  const createPagination = () => {
    let state = { items: [], page: 1, hasMore: true };
    const fetchPage = (page, newItems) => {
      state = { items: [...state.items, ...newItems], page, hasMore: newItems.length > 0 };
      return state;
    };
    return { fetchPage, getState: () => state };
  };
  const pager = createPagination();
  pager.fetchPage(1, ["a", "b"]);
  pager.fetchPage(2, ["c", "d"]);
  return pager.getState();
})()`,
    realWorldExample:
      'Twitter "Show more tweets" and GitHub issue lists load page-by-page -- paginated fetching accumulates results while tracking whether more pages exist.',
    hints: [
      'Spread existing items and new items together when fetching a new page',
      'hasMore is true when newItems array is non-empty',
    ],
    tags: ['data-fetching', 'pagination', 'state'],
  },
  {
    id: 'fe-react-fetch-dedupe',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'Request Deduplication',
    text: 'Write a dedupedFetch function that tracks pending requests and fetch counts. If a URL is already pending, return the pending result without incrementing the count. Otherwise, record a new fetch. Call it with "/api/users" twice and "/api/posts" once. Return the fetchCounts object.',
    setup: 'Tracking objects for counts and pending requests.',
    setupCode: `// Use these to track fetch state\nconst fetchCounts = {};\nconst pending = {};`,
    expected: { '/api/users': 1, '/api/posts': 1 },
    sample: `(() => {
  const dedupedFetch = (url) => {
    if (pending[url]) return pending[url];
    fetchCounts[url] = (fetchCounts[url] || 0) + 1;
    pending[url] = { data: url + "-data" };
    return pending[url];
  };
  dedupedFetch("/api/users");
  dedupedFetch("/api/users");
  dedupedFetch("/api/posts");
  return fetchCounts;
})()`,
    realWorldExample:
      'If 10 components on a Next.js page all request /api/user, SWR deduplicates them into a single network request -- saving bandwidth and preventing redundant server load.',
    hints: [
      'Check if the URL already exists in the pending map before counting',
      'Only increment fetchCounts for genuinely new requests',
    ],
    tags: ['data-fetching', 'deduplication', 'performance'],
  },
  {
    id: 'fe-react-fetch-optimistic',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'hard',
    title: 'Optimistic Update Pattern',
    text: 'Write an optimisticUpdate function that takes current state, optimistic state, and serverResult. Start with the optimistic state. If serverResult.ok, use serverResult.data; otherwise rollback to current. Test with a successful update where likes goes from 10 to 11.',
    setup: 'Data for testing the optimistic update.',
    setupCode: `// Implement optimisticUpdate and call it with these values\nconst current = { likes: 10 };\nconst optimistic = { likes: 11 };\nconst serverResult = { ok: true, data: { likes: 11 } };`,
    expected: { likes: 11 },
    sample: '((curr, opt, srv) => srv.ok ? srv.data : curr)(current, optimistic, serverResult)',
    realWorldExample:
      'When you like a tweet on Twitter, the heart turns red instantly (optimistic) before the server confirms -- if the API fails, it reverts back to unliked.',
    hints: [
      'Check serverResult.ok to decide between confirming or rolling back',
      'On success use server data, on failure revert to current',
    ],
    tags: ['data-fetching', 'optimistic-update', 'ux'],
  },
  {
    id: 'fe-react-fetch-stale-while-revalidate',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'Stale-While-Revalidate',
    text: 'Write an swr function that takes a URL and fresh data. It checks a cache for stale data, starts with { data: stale or null, isValidating: true }, then updates the cache and returns { data: freshData, isValidating: false }. Use the provided swrCache and call swr("/api/data", "fresh-data").',
    setup: 'A pre-populated SWR cache.',
    setupCode: `// Implement swr using this cache\nconst swrCache = { "/api/data": { data: "stale-data", timestamp: 1000 } };`,
    expected: { data: 'fresh-data', isValidating: false },
    sample: `(() => {
  const swr = (url, freshData) => {
    const cached = swrCache[url];
    const state = { data: cached ? cached.data : null, isValidating: true };
    swrCache[url] = { data: freshData, timestamp: 2000 };
    state.data = freshData;
    state.isValidating = false;
    return state;
  };
  return swr("/api/data", "fresh-data");
})()`,
    realWorldExample:
      'Vercel SWR shows cached dashboard metrics instantly on page load (stale) while silently fetching fresh data in the background -- users see content immediately without waiting.',
    hints: [
      'Read from cache first to get stale data',
      'Update the cache and state with fresh data, then set isValidating to false',
    ],
    tags: ['data-fetching', 'swr', 'caching', 'stale'],
  },
  {
    id: 'fe-react-fetch-transform',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'easy',
    title: 'Transform API Response',
    text: 'Given an API response with nested data.results containing objects with id, first_name, last_name, write a transform function that maps each result to { id, name } where name combines first and last name with a space. Apply it to apiResponse.',
    setup: 'A raw API response object.',
    setupCode: `// Transform this response into a simpler format\nconst apiResponse = {\n  status: 200,\n  data: {\n    results: [\n      { id: 1, first_name: "Alice", last_name: "Smith" },\n      { id: 2, first_name: "Bob", last_name: "Jones" }\n    ]\n  }\n};`,
    expected: [
      { id: 1, name: 'Alice Smith' },
      { id: 2, name: 'Bob Jones' },
    ],
    sample:
      '((res) => res.data.results.map(u => ({ id: u.id, name: u.first_name + " " + u.last_name })))(apiResponse)',
    realWorldExample:
      'APIs like the GitHub REST API return deeply nested responses -- transforming them into a flat, component-friendly shape prevents messy data.results.items[0].user.login access throughout your UI.',
    hints: [
      'Navigate to data.results to get the array',
      'Use .map() to reshape each object, combining first_name and last_name',
    ],
    tags: ['data-fetching', 'transform', 'api'],
  },
  {
    id: 'fe-react-fetch-polling',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'Polling Data Pattern',
    text: 'Write a poll function that takes a number of iterations. Starting from { count: 0, polls: 0 }, each iteration adds 10 to count and increments polls. Return the final state after calling poll(3).',
    setup: 'No setup needed -- implement the poll function.',
    setupCode: `// Implement poll(times) that simulates polling iterations`,
    expected: { count: 30, polls: 3 },
    sample: `(() => {
  const poll = (times) => {
    let state = { count: 0, polls: 0 };
    for (let i = 0; i < times; i++) {
      state.count += 10;
      state.polls++;
    }
    return state;
  };
  return poll(3);
})()`,
    realWorldExample:
      'Gmail polls for new emails every few seconds to update your inbox badge count -- the polling pattern fetches fresh data at regular intervals without requiring WebSockets.',
    hints: [
      'Use a for loop to simulate each polling iteration',
      'Each iteration should add 10 to count and increment polls by 1',
    ],
    tags: ['data-fetching', 'polling', 'interval'],
  },
  {
    id: 'fe-react-fetch-infinite-scroll',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'Infinite Scroll Data',
    text: 'Write an accumulate function that takes an array of page objects (each with data array and cursor). It should combine all data arrays into items, set nextCursor from the last page, and set hasMore based on whether nextCursor is non-null. Call it with the provided pages.',
    setup: 'Page data for infinite scroll.',
    setupCode: `// Write accumulate to combine these pages\nconst pages = [\n  { data: [1, 2], cursor: "c1" },\n  { data: [3, 4], cursor: "c2" },\n  { data: [5, 6], cursor: null }\n];`,
    expected: { items: [1, 2, 3, 4, 5, 6], nextCursor: null, hasMore: false },
    sample: `((pgs) => ({
  items: pgs.flatMap(p => p.data),
  nextCursor: pgs[pgs.length - 1].cursor,
  hasMore: pgs[pgs.length - 1].cursor !== null
}))(pages)`,
    realWorldExample:
      'Instagram accumulates posts as you scroll down your feed -- infinite scroll fetches the next cursor-based page and appends results to the existing list.',
    hints: [
      'Use flatMap to flatten all data arrays into one',
      'Check the last page cursor to determine hasMore',
    ],
    tags: ['data-fetching', 'infinite-scroll', 'pagination'],
  },
  {
    id: 'fe-react-fetch-normalize',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'Normalize API Data',
    text: 'Write a normalize function that takes an array of entity objects (each with an id) and returns { byId, allIds } where byId maps each id to its entity and allIds is an ordered array of ids. Apply it to entities.',
    setup: 'An array of entities to normalize.',
    setupCode: `// Write normalize to transform this array into { byId, allIds }\nconst entities = [\n  { id: "u1", name: "Alice" },\n  { id: "u2", name: "Bob" },\n  { id: "u3", name: "Charlie" }\n];`,
    expected: {
      byId: {
        u1: { id: 'u1', name: 'Alice' },
        u2: { id: 'u2', name: 'Bob' },
        u3: { id: 'u3', name: 'Charlie' },
      },
      allIds: ['u1', 'u2', 'u3'],
    },
    sample: `((items) => {
  const byId = {};
  const allIds = [];
  items.forEach(item => {
    byId[item.id] = item;
    allIds.push(item.id);
  });
  return { byId, allIds };
})(entities)`,
    realWorldExample:
      'Redux recommends normalizing API data into { byId, allIds } shape so looking up a specific user is O(1) instead of scanning an array -- this powers fast lookups in apps like Jira.',
    hints: [
      'Build a byId lookup object using each entity id as key',
      'Collect all ids into an array to maintain order',
    ],
    tags: ['data-fetching', 'normalize', 'state-management'],
  },
  {
    id: 'fe-react-fetch-parallel',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'easy',
    title: 'Parallel Data Fetching',
    text: 'Given two mock fetch functions (fetchUser returns { name: "Alice" }, fetchPosts returns [{ title: "Hello" }]), call both and combine their results into a single { user, posts } object.',
    setup: 'Mock fetch functions for user and posts.',
    setupCode: `// Call both and combine results\nconst fetchUser = () => ({ name: "Alice" });\nconst fetchPosts = () => ([{ title: "Hello" }]);`,
    expected: { user: { name: 'Alice' }, posts: [{ title: 'Hello' }] },
    sample: '{ user: fetchUser(), posts: fetchPosts() }',
    realWorldExample:
      'A GitHub profile page fetches user data and repositories in parallel with Promise.all -- loading both simultaneously instead of sequentially cuts perceived load time in half.',
    hints: [
      'Call each function to get its data',
      'Combine into one object with user and posts keys',
    ],
    tags: ['data-fetching', 'parallel', 'Promise.all'],
  },
  {
    id: 'fe-react-fetch-dependent',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'easy',
    title: 'Dependent Data Fetching',
    text: 'Given fetchUser (returns { id: 42, name: "Alice" }) and fetchUserPosts(userId) (returns posts array), fetch the user first, then use user.id to fetch posts. Return { user, posts }.',
    setup: 'Mock fetch functions with a dependency.',
    setupCode: `// Fetch user first, then use user.id to fetch posts\nconst fetchUser = () => ({ id: 42, name: "Alice" });\nconst fetchUserPosts = (userId) => [{ userId, title: "Post by " + userId }];`,
    expected: { user: { id: 42, name: 'Alice' }, posts: [{ userId: 42, title: 'Post by 42' }] },
    sample: `(() => {
  const user = fetchUser();
  const posts = fetchUserPosts(user.id);
  return { user, posts };
})()`,
    realWorldExample:
      'On Spotify, loading a playlist first fetches the playlist metadata, then uses the playlist ID to fetch the track list -- the second request depends on data from the first.',
    hints: [
      'The second fetch depends on data from the first',
      'Call fetchUser first, then pass user.id to fetchUserPosts',
    ],
    tags: ['data-fetching', 'dependent', 'waterfall'],
  },
  {
    id: 'fe-react-fetch-error-recovery',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'easy',
    title: 'Error Recovery State',
    text: 'Write an errorRecovery function that takes an error message and retryCount, returning { status: "error", message, retryCount, canRetry } where canRetry is true if retryCount < 3. Call it with "Timeout" and 1.',
    setup: 'No setup needed -- implement the error recovery function.',
    setupCode: `// Implement errorRecovery(error, retryCount)`,
    expected: { status: 'error', message: 'Timeout', retryCount: 1, canRetry: true },
    sample: `((error, retryCount) => ({
  status: "error",
  message: error,
  retryCount,
  canRetry: retryCount < 3
}))("Timeout", 1)`,
    realWorldExample:
      'Slack shows "Connecting..." with a retry counter when the WebSocket drops -- the error recovery state tracks attempt count and enables/disables the retry button accordingly.',
    hints: [
      'Build an object with the error details and retry information',
      'canRetry should be a boolean comparison against the max retry limit',
    ],
    tags: ['data-fetching', 'error', 'recovery', 'retry'],
  },

  // ─── Forms & Validation (17 problems) ──────────────────────────

  {
    id: 'fe-react-form-multifield',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Multi-Field Form State',
    text: 'Manage a form with multiple fields using a single state object. Update the email field and return the new state.',
    setup: 'A mock form state manager.',
    setupCode: `const formState = { name: "Alice", email: "", age: 25 };\nconst updateField = (state, field, value) => ({ ...state, [field]: value });`,
    expected: { name: 'Alice', email: 'alice@test.com', age: 25 },
    sample: 'updateField(formState, "email", "alice@test.com")',
    realWorldExample:
      'Formik manages multi-field forms with a single state object -- typing in the email field updates only that field while preserving name and age via spread operator.',
    hints: ['Use computed property names [field]', 'Spread existing state and override one field'],
    tags: ['forms', 'multi-field', 'state'],
  },
  {
    id: 'fe-react-form-validation-sync',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Synchronous Validation',
    text: 'Validate a form with rules: name required, email must contain @, age must be > 0. Return the errors object.',
    setup: 'A mock form validator.',
    setupCode: `const validate = (values) => {\n  const errors = {};\n  if (!values.name) errors.name = "Name is required";\n  if (!values.email.includes("@")) errors.email = "Invalid email";\n  if (values.age <= 0) errors.age = "Age must be positive";\n  return errors;\n};`,
    expected: { email: 'Invalid email' },
    sample: 'validate({ name: "Alice", email: "invalid", age: 25 })',
    realWorldExample:
      'Zod and Yup validation schemas run synchronous checks on every field before a Stripe checkout form allows submission -- missing @ in the email highlights the error instantly.',
    hints: ['Check each field against its rule', 'Only add errors for failing validations'],
    tags: ['forms', 'validation', 'synchronous'],
  },
  {
    id: 'fe-react-form-touched',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'easy',
    title: 'Field Touched State',
    text: 'Create a touched object to track which fields have been blurred. Write a touch function that sets touched[field] to true. Call it for "name" and "email", then return the touched object.',
    setup: 'No setup needed -- implement touched state tracking.',
    setupCode: `// Implement touched tracking from scratch`,
    expected: { name: true, email: true },
    sample: `(() => {
  const touched = {};
  const touch = (field) => { touched[field] = true; };
  touch("name");
  touch("email");
  return touched;
})()`,
    realWorldExample:
      'Formik only shows validation errors for fields the user has actually visited -- clicking into and out of the email field marks it as "touched", triggering error display.',
    hints: [
      'Use an object to store which fields have been visited',
      'Set each field key to true when the touch function is called',
    ],
    tags: ['forms', 'touched', 'field-state'],
  },
  {
    id: 'fe-react-form-dirty-check',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Form Dirty Check',
    text: 'Write an isDirty function that compares two objects (initial and current form values) and returns true if any field value differs. Test with the provided initial and current objects.',
    setup: 'Initial and current form values.',
    setupCode: `// Write isDirty to compare these objects\nconst initial = { name: "Alice", email: "alice@test.com" };\nconst current = { name: "Alice", email: "alice@new.com" };`,
    expected: true,
    sample:
      '((init, curr) => Object.keys(init).some(key => init[key] !== curr[key]))(initial, current)',
    realWorldExample:
      'Google Docs shows "Unsaved changes" and prompts before navigation when the document has been modified -- dirty checking compares current values against the last saved state.',
    hints: [
      'Iterate over the keys and compare each value',
      'Use .some() to check if any field differs',
    ],
    tags: ['forms', 'dirty', 'comparison'],
  },
  {
    id: 'fe-react-form-submit-handler',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'easy',
    title: 'Form Submit Handler',
    text: 'Write a handleSubmit function that takes values and a validate function. Call validate(values) to get errors. If errors object has keys, return { success: false, errors }. Otherwise return { success: true, data: values }. Test with { name: "Alice" } and a validator returning no errors.',
    setup: 'A validator that returns no errors.',
    setupCode: `// Write handleSubmit and test with this validator\nconst noErrors = () => ({});`,
    expected: { success: true, data: { name: 'Alice' } },
    sample: `(() => {
  const handleSubmit = (values, validate) => {
    const errors = validate(values);
    if (Object.keys(errors).length > 0) return { success: false, errors };
    return { success: true, data: values };
  };
  return handleSubmit({ name: "Alice" }, noErrors);
})()`,
    realWorldExample:
      'When you click "Place Order" on Amazon, the submit handler validates all fields (address, payment, etc.) and either shows errors or proceeds to order confirmation.',
    hints: [
      'Run validation first, then check if any errors exist',
      'Use Object.keys(errors).length to check for errors',
    ],
    tags: ['forms', 'submit', 'validation'],
  },
  {
    id: 'fe-react-form-dynamic-fields',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'hard',
    title: 'Dynamic Form Fields',
    text: 'Write a createFieldManager that starts with fields [{ id: 1, value: "first" }, { id: 2, value: "second" }]. It should have add(field) to append and remove(id) to filter out by id, both immutably. Create a manager, add { id: 3, value: "third" }, remove id 1, and return the fields.',
    setup: 'No setup needed -- implement the field manager.',
    setupCode: `// Implement createFieldManager with add, remove, getFields`,
    expected: [
      { id: 2, value: 'second' },
      { id: 3, value: 'third' },
    ],
    sample: `(() => {
  const createFieldManager = () => {
    let fields = [{ id: 1, value: "first" }, { id: 2, value: "second" }];
    return {
      add: (field) => { fields = [...fields, field]; },
      remove: (id) => { fields = fields.filter(f => f.id !== id); },
      getFields: () => fields
    };
  };
  const manager = createFieldManager();
  manager.add({ id: 3, value: "third" });
  manager.remove(1);
  return manager.getFields();
})()`,
    realWorldExample:
      'LinkedIn "Add Experience" section lets you dynamically add and remove job entries -- each click creates a new field group or removes one from the form array.',
    hints: [
      'Use spread to add and .filter() to remove immutably',
      'remove should filter out the field whose id matches',
    ],
    tags: ['forms', 'dynamic-fields', 'array-state'],
  },
  {
    id: 'fe-react-form-field-array',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Field Array Pattern',
    text: 'Write a fieldArray helper that takes initial values and returns { append(val), prepend(val), swap(a, b), getValues() }. Initialize with ["111", "222"], append "333", prepend "000", swap positions 0 and 3, then return the values.',
    setup: 'No setup needed -- implement the field array helper.',
    setupCode: `// Implement fieldArray with append, prepend, swap, getValues`,
    expected: ['333', '111', '222', '000'],
    sample: `(() => {
  const fieldArray = (initial) => {
    let arr = [...initial];
    return {
      append: (val) => { arr = [...arr, val]; },
      prepend: (val) => { arr = [val, ...arr]; },
      swap: (a, b) => { const temp = arr[a]; arr[a] = arr[b]; arr[b] = temp; },
      getValues: () => arr
    };
  };
  const phones = fieldArray(["111", "222"]);
  phones.append("333");
  phones.prepend("000");
  phones.swap(0, 3);
  return phones.getValues();
})()`,
    realWorldExample:
      'React Hook Form useFieldArray powers dynamic phone number inputs on contact forms -- append adds a new number, swap lets users drag-reorder, and remove deletes one.',
    hints: [
      'append spreads existing plus new at end, prepend puts new at start',
      'swap uses a temp variable to exchange two array indices',
    ],
    tags: ['forms', 'field-array', 'array-manipulation'],
  },
  {
    id: 'fe-react-form-async-validation',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'hard',
    title: 'Async Field Validation',
    text: 'Write a validateUsername function that checks if a lowercased username exists in the takenUsernames list. Return { valid: true, error: null } if available, or { valid: false, error: "Username already taken" } if taken. Test with "alice".',
    setup: 'A list of taken usernames.',
    setupCode: `// Write validateUsername using this list\nconst takenUsernames = ["alice", "bob", "admin"];`,
    expected: { valid: false, error: 'Username already taken' },
    sample: `((username) => {
  const isTaken = takenUsernames.includes(username.toLowerCase());
  return { valid: !isTaken, error: isTaken ? "Username already taken" : null };
})("alice")`,
    realWorldExample:
      'GitHub checks username availability as you type during signup -- an async validator hits the API to see if "cooldev123" is already taken before you submit the form.',
    hints: [
      'Lowercase the input before checking the list',
      'Use .includes() to check if the username is taken',
    ],
    tags: ['forms', 'async-validation', 'username'],
  },
  {
    id: 'fe-react-form-nested-object',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Nested Form Values',
    text: 'Update a deeply nested form value using a path string. Return the updated form state.',
    setup: 'A mock nested value setter.',
    setupCode: `const setNested = (obj, path, value) => {\n  const keys = path.split(".");\n  const result = JSON.parse(JSON.stringify(obj));\n  let current = result;\n  for (let i = 0; i < keys.length - 1; i++) {\n    current = current[keys[i]];\n  }\n  current[keys[keys.length - 1]] = value;\n  return result;\n};\nconst form = { user: { address: { city: "NYC", zip: "10001" } } };`,
    expected: { user: { address: { city: 'LA', zip: '10001' } } },
    sample: 'setNested(form, "user.address.city", "LA")',
    realWorldExample:
      'Formik and React Hook Form support dot-notation paths like "address.city" for deeply nested shipping address forms -- setNested updates the right level without flattening the structure.',
    hints: ['Split the path by dots', 'Navigate to the nested location and set the value'],
    tags: ['forms', 'nested', 'deep-update'],
  },
  {
    id: 'fe-react-form-radio-group',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'easy',
    title: 'Radio Group State',
    text: 'Write a radioGroup function that takes an options array and a selected value, returning { options, selected, isSelected(opt) }. Create a group with ["small", "medium", "large"] and "medium" selected. Return { options, selected }.',
    setup: 'No setup needed -- implement the radio group.',
    setupCode: `// Implement radioGroup and create one`,
    expected: { options: ['small', 'medium', 'large'], selected: 'medium' },
    sample: `(() => {
  const radioGroup = (options, selected) => ({
    options,
    selected,
    isSelected: (opt) => opt === selected
  });
  const sizes = radioGroup(["small", "medium", "large"], "medium");
  return { options: sizes.options, selected: sizes.selected };
})()`,
    realWorldExample:
      'Amazon product pages use radio groups for selecting size (S, M, L, XL) or color variants -- only one option can be active at a time, and the selected option drives the displayed price.',
    hints: [
      'A radio group allows only one selection at a time',
      'isSelected compares an option against the selected value',
    ],
    tags: ['forms', 'radio', 'selection'],
  },
  {
    id: 'fe-react-form-checkbox-group',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Checkbox Group State',
    text: 'Write a checkbox group manager using a Set. Implement a toggle function: if the item is in the set, remove it; otherwise add it. Toggle "react" and "vue", then return the selected items as a sorted array.',
    setup: 'No setup needed -- implement the checkbox group.',
    setupCode: `// Implement toggle logic using a Set`,
    expected: ['react', 'vue'],
    sample: `(() => {
  const selected = new Set();
  const toggle = (item) => {
    if (selected.has(item)) selected.delete(item);
    else selected.add(item);
  };
  toggle("react");
  toggle("vue");
  return Array.from(selected).sort();
})()`,
    realWorldExample:
      'GitHub issue label selectors let you toggle multiple labels (bug, enhancement, documentation) on and off -- a Set tracks which labels are currently applied.',
    hints: [
      'Use Set.has() to check membership, .add() and .delete() to toggle',
      'Convert the Set to an array and sort for consistent output',
    ],
    tags: ['forms', 'checkbox', 'multi-select'],
  },
  {
    id: 'fe-react-form-error-display',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Error Display Logic',
    text: 'Write a visibleErrors function that takes errors and touched objects. It should return only the errors for fields that are both touched AND have a non-null error. Test with the provided errors and touched.',
    setup: 'Errors and touched state objects.',
    setupCode: `// Write visibleErrors to filter these\nconst errors = { name: "Required", email: "Invalid email", age: null };\nconst touched = { name: true, email: false, age: true };`,
    expected: { name: 'Required' },
    sample: `((errs, tch) => {
  const result = {};
  Object.keys(errs).forEach(key => {
    if (tch[key] && errs[key]) result[key] = errs[key];
  });
  return result;
})(errors, touched)`,
    realWorldExample:
      'Stripe checkout only shows "Card number is invalid" after the user has actually interacted with that field -- showing all errors upfront would overwhelm users on a fresh form.',
    hints: [
      'Iterate over error keys and check both conditions',
      'A field must be touched AND have a truthy error to be visible',
    ],
    tags: ['forms', 'errors', 'touched', 'ux'],
  },
  {
    id: 'fe-react-form-multistep',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'hard',
    title: 'Multi-Step Form Wizard',
    text: 'Write a createWizard function that tracks a step counter and accumulated data. Its next(stepData) method merges stepData into the accumulated data and increments the step. Create a wizard, call next 3 times with different data objects, and return the final merged data.',
    setup: 'No setup needed -- implement the wizard.',
    setupCode: `// Implement createWizard with next and getData methods`,
    expected: {
      name: 'Alice',
      email: 'alice@test.com',
      plan: 'pro',
      billing: 'yearly',
      agree: true,
    },
    sample: `(() => {
  const createWizard = () => {
    let currentStep = 0;
    const data = {};
    return {
      next: (stepData) => { Object.assign(data, stepData); currentStep++; },
      getData: () => data
    };
  };
  const wizard = createWizard();
  wizard.next({ name: "Alice", email: "alice@test.com" });
  wizard.next({ plan: "pro", billing: "yearly" });
  wizard.next({ agree: true });
  return wizard.getData();
})()`,
    realWorldExample:
      'TurboTax walks you through Personal Info, Income, Deductions, and Review in a multi-step wizard -- each step merges its data into a single accumulated form state.',
    hints: [
      'Use Object.assign to merge each step data into the accumulated object',
      'getData returns the accumulated data from all steps',
    ],
    tags: ['forms', 'wizard', 'multi-step'],
  },
  {
    id: 'fe-react-form-select-multiple',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Multi-Select Dropdown',
    text: 'Write a multiSelect function that takes all options and selectedValues arrays, returning { options, selected, display } where display joins the selected values with ", ". Call it with ["JS", "TS", "Python", "Go"] and ["JS", "TS"].',
    setup: 'No setup needed -- implement multi-select state.',
    setupCode: `// Implement multiSelect(options, selectedValues)`,
    expected: { options: ['JS', 'TS', 'Python', 'Go'], selected: ['JS', 'TS'], display: 'JS, TS' },
    sample: `((options, selectedValues) => ({
  options,
  selected: selectedValues,
  display: selectedValues.join(", ")
}))(["JS", "TS", "Python", "Go"], ["JS", "TS"])`,
    realWorldExample:
      'LinkedIn job filters let you select multiple locations, job types, and experience levels from multi-select dropdowns -- the selected values are displayed as comma-separated chips.',
    hints: [
      'Use .join(", ") to create the display string from selected values',
      'Return all three properties in the result object',
    ],
    tags: ['forms', 'select', 'multi-select'],
  },
  {
    id: 'fe-react-form-password-validation',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Password Strength Validation',
    text: 'Write a validatePassword function that checks 3 rules: minimum 8 characters, has uppercase letter, has number. Count passing rules as strength. Return { strength, valid } where valid is true if all rules pass. Test with "Hello123".',
    setup: 'No setup needed -- implement password validation.',
    setupCode: `// Implement validatePassword and test with "Hello123"`,
    expected: { strength: 3, valid: true },
    sample: `(() => {
  const validatePassword = (password) => {
    const rules = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[0-9]/.test(password)
    ];
    const strength = rules.filter(Boolean).length;
    return { strength, valid: strength === rules.length };
  };
  return validatePassword("Hello123");
})()`,
    realWorldExample:
      '1Password and Bitwarden show a password strength meter (weak/fair/strong) as you type -- each passing rule (length, uppercase, digit, special char) increases the strength score.',
    hints: [
      'Use regex for uppercase (/[A-Z]/) and number (/[0-9]/) checks',
      'Count the number of passing rules to determine strength',
    ],
    tags: ['forms', 'password', 'strength', 'validation'],
  },
  {
    id: 'fe-react-form-debounced-validation',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'hard',
    title: 'Debounced Form Validation',
    text: 'Write a validate function that returns { valid: true } if input is >= 3 chars, or { valid: false, error: "Min 3 chars" } otherwise. Simulate debouncing by tracking the last value across calls to "a", "ab", "abc", then validate the final tracked value.',
    setup: 'No setup needed -- implement debounced validation.',
    setupCode: `// Implement validate and simulate debounced input`,
    expected: { valid: true },
    sample: `(() => {
  let lastValue = "";
  const validate = (val) => {
    lastValue = val;
    return val.length >= 3 ? { valid: true } : { valid: false, error: "Min 3 chars" };
  };
  validate("a");
  validate("ab");
  validate("abc");
  return validate(lastValue);
})()`,
    realWorldExample:
      'Algolia search validates and queries only after the user pauses typing -- debouncing validation prevents showing flickering error messages for every intermediate keystroke.',
    hints: [
      'Track the latest value on each call to simulate debouncing',
      'The final validation runs on the last captured value',
    ],
    tags: ['forms', 'debounce', 'validation'],
  },
  {
    id: 'fe-react-form-reset',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'easy',
    title: 'Form Reset Pattern',
    text: 'Write a createForm function that takes initialValues and returns { update(field, val), reset(), getValues() }. update sets a field, reset restores initial values. Create a form with { name: "", email: "" }, update both fields, reset, and return the values.',
    setup: 'No setup needed -- implement the form with reset.',
    setupCode: `// Implement createForm with update, reset, getValues`,
    expected: { name: '', email: '' },
    sample: `(() => {
  const createForm = (initialValues) => {
    let values = { ...initialValues };
    return {
      update: (field, val) => { values = { ...values, [field]: val }; },
      reset: () => { values = { ...initialValues }; },
      getValues: () => values
    };
  };
  const form = createForm({ name: "", email: "" });
  form.update("name", "Alice");
  form.update("email", "alice@test.com");
  form.reset();
  return form.getValues();
})()`,
    realWorldExample:
      'A "Clear Filters" button on Airbnb search resets price range, dates, and guest count back to their initial empty state -- form reset restores the original values in one action.',
    hints: [
      'Keep a copy of initialValues to restore on reset',
      'Use spread to create a fresh copy when resetting',
    ],
    tags: ['forms', 'reset', 'initial-values'],
  },
];
