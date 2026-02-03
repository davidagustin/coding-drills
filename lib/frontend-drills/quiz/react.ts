import type { FrontendQuizQuestion } from '../types';

export const reactQuizQuestions: FrontendQuizQuestion[] = [
  {
    id: 'react-q1',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'When should you use useReducer instead of useState?',
    options: [
      'When state logic is complex or involves multiple sub-values that depend on each other',
      'When you need better performance',
      'When you want to store objects instead of primitives',
      'useReducer is always better than useState',
    ],
    correctAnswer:
      'When state logic is complex or involves multiple sub-values that depend on each other',
    explanation:
      'useReducer is preferable when you have complex state logic involving multiple sub-values, or when the next state depends on the previous one. It makes state transitions more predictable and testable.',
  },
  {
    id: 'react-q2',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'What happens if you omit the dependency array in useEffect?',
    codeSnippet: `useEffect(() => {
  // effect code
});`,
    options: [
      'The effect runs after every render',
      'The effect only runs once on mount',
      'The effect never runs',
      'React throws an error',
    ],
    correctAnswer: 'The effect runs after every render',
    explanation:
      'Omitting the dependency array means the effect runs after every render. An empty array [] runs only on mount. Including dependencies runs when those dependencies change.',
  },
  {
    id: 'react-q3',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What is the primary use case for useRef?',
    options: [
      "Accessing DOM elements and storing mutable values that don't trigger re-renders",
      'Managing component state',
      'Triggering re-renders',
      'Creating side effects',
    ],
    correctAnswer:
      "Accessing DOM elements and storing mutable values that don't trigger re-renders",
    explanation:
      'useRef returns a mutable ref object whose .current property persists across renders without causing re-renders when changed. Common uses: accessing DOM nodes, storing previous values, and keeping mutable values.',
  },
  {
    id: 'react-q4',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'What is the difference between useMemo and useCallback?',
    options: [
      'useMemo memoizes a computed value, useCallback memoizes a function',
      'useMemo is for components, useCallback is for hooks',
      'useCallback is faster than useMemo',
      'They are identical, just different names',
    ],
    correctAnswer: 'useMemo memoizes a computed value, useCallback memoizes a function',
    explanation:
      'useMemo(() => computeValue(a, b), [a, b]) memoizes the result of a computation. useCallback(() => doSomething(a, b), [a, b]) memoizes the function itself. useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).',
  },
  {
    id: 'react-q5',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What does React.memo do?',
    codeSnippet: `const MemoizedComponent = React.memo(MyComponent);`,
    options: [
      "Prevents re-renders if props haven't changed (shallow comparison)",
      "Memoizes the component's state",
      "Improves the component's performance by caching DOM nodes",
      'Automatically applies useMemo to all props',
    ],
    correctAnswer: "Prevents re-renders if props haven't changed (shallow comparison)",
    explanation:
      'React.memo is a higher-order component that memoizes the result. It only re-renders if props change (shallow comparison). Useful for expensive components that receive the same props frequently.',
  },
  {
    id: 'react-q6',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'medium',
    question: "How does React's Virtual DOM reconciliation work?",
    options: [
      'React compares the new Virtual DOM with the previous one and updates only the changed parts in the real DOM',
      'React replaces the entire DOM tree on every render',
      'React uses browser APIs to detect DOM changes automatically',
      'React stores all DOM states in memory',
    ],
    correctAnswer:
      'React compares the new Virtual DOM with the previous one and updates only the changed parts in the real DOM',
    explanation:
      'React creates a Virtual DOM tree, compares it with the previous tree (diffing), calculates the minimal set of changes needed, and updates only those parts in the real DOM (reconciliation).',
  },
  {
    id: 'react-q7',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'Why do list items in React need keys?',
    codeSnippet: `{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}`,
    options: [
      'To help React identify which items changed, were added, or removed for efficient reconciliation',
      'To make the list sortable',
      'To improve CSS styling',
      'To enable event handling',
    ],
    correctAnswer:
      'To help React identify which items changed, were added, or removed for efficient reconciliation',
    explanation:
      'Keys help React identify which items in a list have changed, been added, or removed. This enables efficient reconciliation and preserves component state. Keys should be stable, unique, and not array indices.',
  },
  {
    id: 'react-q8',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'What is the difference between controlled and uncontrolled components?',
    options: [
      'Controlled components have their state managed by React, uncontrolled components manage their own state via DOM',
      'Controlled components are faster than uncontrolled components',
      'Uncontrolled components can only be used with forms',
      "Controlled components don't work with TypeScript",
    ],
    correctAnswer:
      'Controlled components have their state managed by React, uncontrolled components manage their own state via DOM',
    explanation:
      'Controlled components have their form data handled by React state (value + onChange). Uncontrolled components store data in the DOM itself, accessed via refs. Controlled components are generally recommended.',
  },
  {
    id: 'react-q9',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'What is the purpose of the cleanup function in useEffect?',
    codeSnippet: `useEffect(() => {
  const subscription = subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, []);`,
    options: [
      'To clean up side effects (remove listeners, cancel subscriptions) before the component unmounts or before the effect runs again',
      'To reset component state',
      'To improve performance',
      'To prevent memory leaks in useState',
    ],
    correctAnswer:
      'To clean up side effects (remove listeners, cancel subscriptions) before the component unmounts or before the effect runs again',
    explanation:
      'The cleanup function returned from useEffect runs before the component unmounts and before the effect runs again (if dependencies change). Essential for removing event listeners, canceling subscriptions, and clearing timeouts.',
  },
  {
    id: 'react-q10',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'When does React batch state updates?',
    options: [
      'In event handlers and lifecycle methods (automatic batching in React 18+)',
      'Never, each setState causes an immediate re-render',
      'Only when using useReducer',
      'Only in class components',
    ],
    correctAnswer: 'In event handlers and lifecycle methods (automatic batching in React 18+)',
    explanation:
      'React batches multiple setState calls within event handlers and lifecycle methods into a single re-render for performance. React 18 extends automatic batching to timeouts, promises, and native event handlers.',
  },
  // ===== DOM & Events (react-q11 to react-q27) =====
  {
    id: 'react-q11',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'What are synthetic events in React?',
    options: [
      'Cross-browser wrappers around native browser events that provide a consistent API',
      'Custom events that only exist in React and have no native equivalent',
      'Events that are generated synthetically by test libraries',
      'Events that bypass the browser event system entirely',
    ],
    correctAnswer:
      'Cross-browser wrappers around native browser events that provide a consistent API',
    explanation:
      'React synthetic events wrap native browser events to normalize behavior across browsers. They follow the W3C spec and provide a consistent interface regardless of which browser is running the code.',
  },
  {
    id: 'react-q12',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'medium',
    question:
      'What is the difference between event.target and event.currentTarget in a React event handler?',
    codeSnippet: `function Parent() {
  const handleClick = (e) => {
    console.log(e.target);        // ???
    console.log(e.currentTarget); // ???
  };
  return (
    <div onClick={handleClick}>
      <button>Click me</button>
    </div>
  );
}`,
    options: [
      'target is the element that triggered the event (button), currentTarget is the element the handler is attached to (div)',
      'target and currentTarget always refer to the same element',
      'target is the parent element, currentTarget is the child element',
      'currentTarget is the element that triggered the event, target is the element the handler is attached to',
    ],
    correctAnswer:
      'target is the element that triggered the event (button), currentTarget is the element the handler is attached to (div)',
    explanation:
      'event.target refers to the element that initiated the event (the clicked button), while event.currentTarget refers to the element the event handler is attached to (the div with onClick).',
  },
  {
    id: 'react-q13',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'How does React handle event delegation internally?',
    options: [
      'React attaches event listeners to the root DOM container rather than individual elements',
      'React attaches a separate event listener to each DOM element',
      'React uses the browser MutationObserver API for all events',
      'React polls the DOM for changes on every animation frame',
    ],
    correctAnswer:
      'React attaches event listeners to the root DOM container rather than individual elements',
    explanation:
      'React uses event delegation by attaching a single event listener for each event type at the root container. When an event fires, React maps it to the correct component handler using its internal fiber tree.',
  },
  {
    id: 'react-q14',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'How do you access a DOM element directly in a React functional component?',
    codeSnippet: `function MyComponent() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} />;
}`,
    options: [
      'Use useRef to create a ref and attach it to the element via the ref attribute',
      'Use document.getElementById inside the component',
      'Use this.refs to access elements',
      'Use the useDOM hook provided by React',
    ],
    correctAnswer: 'Use useRef to create a ref and attach it to the element via the ref attribute',
    explanation:
      'useRef creates a mutable ref object whose .current property is set to the DOM node when attached via the ref attribute. This is the recommended way to directly access DOM elements in functional components.',
  },
  {
    id: 'react-q15',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'hard',
    question: 'How do events behave when fired inside a React Portal?',
    codeSnippet: `function Parent() {
  const handleClick = () => console.log('Parent clicked');
  return (
    <div onClick={handleClick}>
      {createPortal(
        <button>Portal Button</button>,
        document.getElementById('portal-root')
      )}
    </div>
  );
}`,
    options: [
      'The event bubbles through the React tree (to Parent), not the DOM tree, so handleClick fires',
      'The event only bubbles through the DOM tree, so handleClick never fires',
      'Portal events do not bubble at all',
      'React throws an error when attaching event handlers to portal parents',
    ],
    correctAnswer:
      'The event bubbles through the React tree (to Parent), not the DOM tree, so handleClick fires',
    explanation:
      'Even though portals render into a different DOM node, events bubble through the React component tree, not the actual DOM tree. So clicking the portal button triggers the parent onClick handler.',
  },
  {
    id: 'react-q16',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'What is the difference between onBlur and onFocusOut in React?',
    options: [
      'React uses onBlur which does not bubble, while onFocusOut is not a standard React event',
      'onBlur bubbles and onFocusOut does not',
      'They are identical in React',
      'onFocusOut is the recommended way to handle focus loss in React',
    ],
    correctAnswer:
      'React uses onBlur which does not bubble, while onFocusOut is not a standard React event',
    explanation:
      'React provides onBlur (which matches the native blur event that does not bubble) and onFocus. React does not provide onFocusOut as a prop. For detecting focus leaving a container, use onBlur with relatedTarget checks.',
  },
  {
    id: 'react-q17',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'How does onChange in React differ from the native change event?',
    codeSnippet: `<input onChange={(e) => console.log(e.target.value)} />`,
    options: [
      'React onChange fires on every keystroke like the native input event, not just on blur like the native change event',
      'React onChange fires only on blur, identical to the native change event',
      'React onChange fires on form submission only',
      'There is no difference; React onChange is identical to the native change event',
    ],
    correctAnswer:
      'React onChange fires on every keystroke like the native input event, not just on blur like the native change event',
    explanation:
      'React onChange fires on every input change (each keystroke), which matches the native input event behavior. The native change event on text inputs only fires when the element loses focus.',
  },
  {
    id: 'react-q18',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'hard',
    question: 'How do you listen for events during the capture phase in React?',
    codeSnippet: `<div onClickCapture={(e) => console.log('captured!')}>
  <button onClick={() => console.log('clicked!')}>
    Click
  </button>
</div>`,
    options: [
      'Append "Capture" to the event handler name, e.g. onClickCapture',
      'Pass a { capture: true } option as the third argument to the handler',
      'Call event.setCapture() inside the handler',
      'React does not support capture phase event handling',
    ],
    correctAnswer: 'Append "Capture" to the event handler name, e.g. onClickCapture',
    explanation:
      'React supports capture phase event handlers by appending "Capture" to the event name. In the example, onClickCapture fires during the capture phase before the bubble phase onClick on the button.',
  },
  {
    id: 'react-q19',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'How do you prevent the default browser behavior in a React event handler?',
    codeSnippet: `function handleSubmit(e) {
  e.preventDefault();
  // handle form
}`,
    options: [
      'Call e.preventDefault() on the synthetic event object',
      'Return false from the event handler',
      'Set event.defaultPrevented = true',
      'Pass prevent={true} as a prop to the element',
    ],
    correctAnswer: 'Call e.preventDefault() on the synthetic event object',
    explanation:
      'In React, you call e.preventDefault() on the synthetic event. Unlike vanilla HTML, returning false from a handler does not prevent default behavior in React.',
  },
  {
    id: 'react-q20',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'What is a ref callback in React and when would you use it?',
    codeSnippet: `function MeasureComponent() {
  const [height, setHeight] = useState(0);

  const measuredRef = (node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  };

  return <div ref={measuredRef}>Content</div>;
}`,
    options: [
      'A function passed to ref that receives the DOM node, useful when you need to perform actions when the ref is attached or detached',
      'A callback that fires when a useRef value changes',
      'An async function that resolves when the ref is ready',
      'A pattern that replaces useRef in all cases',
    ],
    correctAnswer:
      'A function passed to ref that receives the DOM node, useful when you need to perform actions when the ref is attached or detached',
    explanation:
      'A ref callback is a function passed to the ref attribute. React calls it with the DOM node when mounting and with null when unmounting. It is useful for measuring elements or performing setup when the node becomes available.',
  },
  {
    id: 'react-q21',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'How do you stop event propagation in React?',
    codeSnippet: `function handleClick(e) {
  e.stopPropagation();
  console.log('Button clicked');
}`,
    options: [
      'Call e.stopPropagation() on the synthetic event',
      'Return false from the handler function',
      'Set bubbles={false} on the element',
      'Wrap the element in a React.StopPropagation component',
    ],
    correctAnswer: 'Call e.stopPropagation() on the synthetic event',
    explanation:
      'Calling e.stopPropagation() on the synthetic event prevents the event from bubbling up to parent handlers in the React tree, just like its native counterpart.',
  },
  {
    id: 'react-q22',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'hard',
    question:
      'What happens to synthetic event objects after the event handler completes in React 16 vs React 17+?',
    options: [
      'In React 16, synthetic events were pooled and nullified after the handler; in React 17+, pooling was removed so events persist',
      'Synthetic events are always available after the handler in all React versions',
      'Synthetic events are always nullified in all React versions',
      'In React 17+, events are pooled more aggressively for better performance',
    ],
    correctAnswer:
      'In React 16, synthetic events were pooled and nullified after the handler; in React 17+, pooling was removed so events persist',
    explanation:
      'React 16 reused synthetic event objects (event pooling) and nullified properties after the callback. React 17 removed pooling, so event properties remain accessible after the handler completes.',
  },
  {
    id: 'react-q23',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'How do you handle drag and drop events in React?',
    codeSnippet: `<div
  draggable
  onDragStart={(e) => e.dataTransfer.setData('text', id)}
  onDragOver={(e) => e.preventDefault()}
  onDrop={(e) => handleDrop(e.dataTransfer.getData('text'))}
>
  Drag me
</div>`,
    options: [
      'Use onDragStart, onDragOver, onDrop and similar synthetic drag event handlers with the dataTransfer API',
      'Use a special useDrag hook built into React',
      'Drag and drop is not supported with React synthetic events',
      'Use onMouseDown and onMouseMove to implement drag and drop manually',
    ],
    correctAnswer:
      'Use onDragStart, onDragOver, onDrop and similar synthetic drag event handlers with the dataTransfer API',
    explanation:
      'React provides synthetic event wrappers for all HTML5 drag and drop events. You must call e.preventDefault() in onDragOver to allow dropping, and use e.dataTransfer to transfer data between drag and drop targets.',
  },
  {
    id: 'react-q24',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'Which of the following is the correct way to attach a click handler in JSX?',
    options: [
      '<button onClick={handleClick}>Click</button>',
      '<button onclick={handleClick}>Click</button>',
      '<button onclick="handleClick()">Click</button>',
      '<button onClick="handleClick()">Click</button>',
    ],
    correctAnswer: '<button onClick={handleClick}>Click</button>',
    explanation:
      'React uses camelCase for event handler props (onClick, not onclick). The handler should be passed as a function reference in curly braces, not as a string.',
  },
  {
    id: 'react-q25',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'hard',
    question:
      'What happens when you add an event listener directly to a DOM element via useEffect alongside a React event handler?',
    codeSnippet: `function MyButton() {
  const btnRef = useRef(null);

  useEffect(() => {
    btnRef.current.addEventListener('click', () => {
      console.log('native');
    });
  }, []);

  return (
    <button ref={btnRef} onClick={() => console.log('react')}>
      Click
    </button>
  );
}`,
    options: [
      'Both handlers fire, but the native listener fires before the React handler because React uses event delegation at the root',
      'Only the React handler fires; native listeners are overridden',
      'Only the native listener fires; React detects the conflict',
      'React throws an error when both are present',
    ],
    correctAnswer:
      'Both handlers fire, but the native listener fires before the React handler because React uses event delegation at the root',
    explanation:
      'Native event listeners attached directly to a DOM node fire during normal propagation. React event handlers fire when the event reaches the root (delegation). So the native listener on the button fires first.',
  },
  {
    id: 'react-q26',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'How do you handle touch events in React?',
    codeSnippet: `<div
  onTouchStart={(e) => handleTouchStart(e)}
  onTouchMove={(e) => handleTouchMove(e)}
  onTouchEnd={(e) => handleTouchEnd(e)}
>
  Touch here
</div>`,
    options: [
      'Use onTouchStart, onTouchMove, and onTouchEnd synthetic event handlers',
      'Touch events are not supported in React; use a third-party library',
      'Use onClick which automatically handles both click and touch',
      'Use the useTouchEvents hook from React',
    ],
    correctAnswer: 'Use onTouchStart, onTouchMove, and onTouchEnd synthetic event handlers',
    explanation:
      'React provides synthetic event wrappers for touch events including onTouchStart, onTouchMove, onTouchEnd, and onTouchCancel. They work like other React event handlers and provide a consistent cross-browser API.',
  },
  {
    id: 'react-q27',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'hard',
    question: 'What is the purpose of e.persist() in React 16 event handlers?',
    codeSnippet: `function handleChange(e) {
  e.persist();
  setTimeout(() => {
    console.log(e.target.value); // works in React 16
  }, 1000);
}`,
    options: [
      'It removes the event from the pool so its properties remain accessible asynchronously in React 16',
      'It persists the event to localStorage for later retrieval',
      'It prevents the event from being garbage collected in any React version',
      'It saves the event to React DevTools for debugging',
    ],
    correctAnswer:
      'It removes the event from the pool so its properties remain accessible asynchronously in React 16',
    explanation:
      'In React 16, synthetic events were pooled and properties nullified after the callback. Calling e.persist() removed the event from the pool, allowing asynchronous access. This is unnecessary in React 17+ which removed pooling.',
  },
  // ===== State & Lifecycle (react-q28 to react-q44) =====
  {
    id: 'react-q28',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What does useState batching mean in React 18?',
    codeSnippet: `function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // How many re-renders happen?
}`,
    options: [
      'React groups multiple state updates into a single re-render, even inside promises and timeouts in React 18',
      'Each setState call causes an immediate re-render',
      'Batching only works inside React event handlers, not in promises or timeouts',
      'Batching must be opted into via ReactDOM.unstable_batchedUpdates',
    ],
    correctAnswer:
      'React groups multiple state updates into a single re-render, even inside promises and timeouts in React 18',
    explanation:
      'React 18 introduced automatic batching for all state updates, including those inside promises, timeouts, and native event handlers. Previously, only React event handlers were batched automatically.',
  },
  {
    id: 'react-q29',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    question: 'What is lazy initialization of useState?',
    codeSnippet: `const [data, setData] = useState(() => {
  return expensiveComputation();
});`,
    options: [
      'Passing a function to useState so the initial value is computed only on the first render',
      'Deferring state creation until the component mounts',
      'Loading state from an API lazily',
      'Using React.lazy to load the state module on demand',
    ],
    correctAnswer:
      'Passing a function to useState so the initial value is computed only on the first render',
    explanation:
      'When you pass a function to useState, React calls it only on the first render to compute the initial state. This avoids running expensive computations on every re-render.',
  },
  {
    id: 'react-q30',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'Why does React.StrictMode invoke certain functions twice in development?',
    codeSnippet: `function MyComponent() {
  console.log('render'); // logs twice in dev

  useEffect(() => {
    console.log('effect'); // runs, cleans up, runs again in dev
    return () => console.log('cleanup');
  }, []);

  return <div>Hello</div>;
}`,
    options: [
      'To help detect impure renders and side effects by verifying components can handle being called multiple times',
      'It is a bug in React that only occurs in development mode',
      'To warm up the JIT compiler for better performance',
      'To pre-render components for faster initial paint',
    ],
    correctAnswer:
      'To help detect impure renders and side effects by verifying components can handle being called multiple times',
    explanation:
      'React.StrictMode intentionally double-invokes render functions, constructors, and effects in development to detect impure side effects. This helps catch bugs where code depends on being called exactly once.',
  },
  {
    id: 'react-q31',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'In what order do useEffect callbacks run when a parent and child both have effects?',
    codeSnippet: `function Parent() {
  useEffect(() => { console.log('parent effect'); });
  return <Child />;
}
function Child() {
  useEffect(() => { console.log('child effect'); });
  return <div />;
}`,
    options: [
      'Child effect runs first, then parent effect (bottom-up)',
      'Parent effect runs first, then child effect (top-down)',
      'They run simultaneously in parallel',
      'The order is non-deterministic',
    ],
    correctAnswer: 'Child effect runs first, then parent effect (bottom-up)',
    explanation:
      'React fires useEffect callbacks bottom-up: children effects run before parent effects. This ensures child DOM nodes are fully set up before the parent effect accesses them.',
  },
  {
    id: 'react-q32',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'What is a stale closure in React and how does it occur?',
    codeSnippet: `function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(count); // always logs 0
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <button onClick={() => setCount(c => c + 1)}>+</button>;
}`,
    options: [
      'The effect closure captures the initial count value (0) and never sees updates because count is not in the dependency array',
      'setInterval does not work inside useEffect',
      'count resets to 0 on every render',
      'useState does not work with closures',
    ],
    correctAnswer:
      'The effect closure captures the initial count value (0) and never sees updates because count is not in the dependency array',
    explanation:
      'A stale closure occurs when a function captures a variable from a previous render and the effect does not re-run because its dependency array is empty. Adding count to the deps array or using a ref can fix this.',
  },
  {
    id: 'react-q33',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What does useTransition do in React 18?',
    codeSnippet: `const [isPending, startTransition] = useTransition();

function handleChange(e) {
  startTransition(() => {
    setSearchQuery(e.target.value);
  });
}`,
    options: [
      'It marks a state update as non-urgent so React can keep the UI responsive by interrupting the update if needed',
      'It creates a CSS transition for state changes',
      'It delays a state update until the next animation frame',
      'It batches state updates across multiple components',
    ],
    correctAnswer:
      'It marks a state update as non-urgent so React can keep the UI responsive by interrupting the update if needed',
    explanation:
      'useTransition lets you mark state updates as transitions (non-urgent). React can interrupt rendering of the transition to handle more urgent updates like typing, keeping the UI responsive.',
  },
  {
    id: 'react-q34',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What is the purpose of useDeferredValue?',
    codeSnippet: `const deferredQuery = useDeferredValue(searchQuery);

// Use deferredQuery for expensive rendering
return <ExpensiveList query={deferredQuery} />;`,
    options: [
      'It returns a deferred version of a value that lags behind the latest value, allowing urgent updates to render first',
      'It debounces the value by a fixed time interval',
      'It caches the value permanently until the component unmounts',
      'It converts synchronous values to asynchronous promises',
    ],
    correctAnswer:
      'It returns a deferred version of a value that lags behind the latest value, allowing urgent updates to render first',
    explanation:
      'useDeferredValue creates a deferred copy of a value. During urgent updates, React shows the stale deferred value while preparing the new one in the background, similar to debouncing but integrated with concurrent rendering.',
  },
  {
    id: 'react-q35',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    question: 'What does useId generate?',
    codeSnippet: `function FormField() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Name</label>
      <input id={id} />
    </>
  );
}`,
    options: [
      'A unique, stable ID string that is consistent between server and client rendering',
      'A random UUID that changes on every render',
      'A sequential numeric ID based on component mount order',
      'A hash of the component props',
    ],
    correctAnswer:
      'A unique, stable ID string that is consistent between server and client rendering',
    explanation:
      'useId generates a unique ID that is stable across re-renders and consistent between server and client, preventing hydration mismatches. It is designed for accessibility attributes like htmlFor/id pairs.',
  },
  {
    id: 'react-q36',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'What is useSyncExternalStore used for?',
    codeSnippet: `const state = useSyncExternalStore(
  store.subscribe,
  store.getSnapshot,
  store.getServerSnapshot
);`,
    options: [
      'It subscribes to an external store in a way that is compatible with concurrent rendering and avoids tearing',
      'It synchronizes state between two React components',
      'It stores data in the browser localStorage synchronously',
      'It syncs React state with a backend database in real time',
    ],
    correctAnswer:
      'It subscribes to an external store in a way that is compatible with concurrent rendering and avoids tearing',
    explanation:
      'useSyncExternalStore is designed for libraries that manage state outside React. It ensures the UI stays consistent with the store during concurrent rendering by preventing tearing (different parts of the UI showing different store versions).',
  },
  {
    id: 'react-q37',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    question: 'What is the correct way to update state based on the previous state value?',
    codeSnippet: `// Which approach is correct?
// A:
setCount(count + 1);
// B:
setCount(prevCount => prevCount + 1);`,
    options: [
      'Use the functional updater form (B) to ensure you always have the latest state value',
      'Both approaches are always equivalent and interchangeable',
      'Use the direct value form (A) because it is faster',
      'Neither approach works; you must use useReducer for derived state',
    ],
    correctAnswer:
      'Use the functional updater form (B) to ensure you always have the latest state value',
    explanation:
      'The functional updater (prevState => newState) guarantees you are working with the most recent state. The direct form can use a stale value when multiple updates are batched or when called inside closures.',
  },
  {
    id: 'react-q38',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What pattern does useReducer follow and when is it preferred?',
    codeSnippet: `const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: return state;
  }
}`,
    options: [
      'It follows the Redux reducer pattern and is preferred when state transitions depend on the action type and previous state',
      'It is a performance optimization that replaces all useState calls',
      'It only works with numeric state values',
      'It is required when state is shared between components',
    ],
    correctAnswer:
      'It follows the Redux reducer pattern and is preferred when state transitions depend on the action type and previous state',
    explanation:
      'useReducer uses the (state, action) => newState pattern from Redux. It is preferred over useState when you have complex state logic, multiple sub-values, or when the next state depends on the previous one.',
  },
  {
    id: 'react-q39',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What happens if you call setState during the render phase?',
    codeSnippet: `function BadComponent() {
  const [count, setCount] = useState(0);
  setCount(1); // called during render
  return <div>{count}</div>;
}`,
    options: [
      'React allows it only if the new value differs from current and re-renders the component immediately, but it risks infinite loops',
      'React silently ignores the update',
      'React throws an error immediately',
      'The component renders with the old value and updates on the next frame',
    ],
    correctAnswer:
      'React allows it only if the new value differs from current and re-renders the component immediately, but it risks infinite loops',
    explanation:
      'React permits setState during render as a pattern for derived state, but only processes it if the value changed. If the value keeps changing, it causes an infinite re-render loop. This pattern should be used sparingly.',
  },
  {
    id: 'react-q40',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    question: 'How do you run a useEffect only once when the component mounts?',
    codeSnippet: `useEffect(() => {
  fetchData();
}, []); // empty dependency array`,
    options: [
      'Pass an empty dependency array [] as the second argument',
      'Do not pass any second argument',
      'Pass null as the second argument',
      'Use useEffect.once() instead',
    ],
    correctAnswer: 'Pass an empty dependency array [] as the second argument',
    explanation:
      'An empty dependency array tells React this effect has no dependencies that would cause it to re-run, so it only executes once after the initial render (mount) and cleans up on unmount.',
  },
  {
    id: 'react-q41',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'How does React 18 concurrent rendering differ from synchronous rendering?',
    options: [
      'Concurrent rendering allows React to interrupt, pause, and resume rendering work, prioritizing urgent updates over non-urgent ones',
      'Concurrent rendering uses Web Workers to render components in parallel threads',
      'Concurrent rendering skips rendering for components that have not changed',
      'Concurrent rendering pre-renders all possible states ahead of time',
    ],
    correctAnswer:
      'Concurrent rendering allows React to interrupt, pause, and resume rendering work, prioritizing urgent updates over non-urgent ones',
    explanation:
      'Concurrent rendering lets React work on multiple versions of the UI simultaneously. It can pause expensive rendering to handle urgent updates (like typing) and resume later, resulting in a more responsive UI.',
  },
  {
    id: 'react-q42',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What is the difference between useLayoutEffect and useEffect?',
    codeSnippet: `useLayoutEffect(() => {
  // Fires synchronously after DOM mutations
  const rect = ref.current.getBoundingClientRect();
  setPosition(rect);
});

useEffect(() => {
  // Fires after paint
});`,
    options: [
      'useLayoutEffect fires synchronously after DOM mutations but before the browser paints, while useEffect fires after paint',
      'useLayoutEffect is faster than useEffect',
      'useLayoutEffect works only in class components',
      'There is no practical difference between them',
    ],
    correctAnswer:
      'useLayoutEffect fires synchronously after DOM mutations but before the browser paints, while useEffect fires after paint',
    explanation:
      'useLayoutEffect runs synchronously after DOM changes but before the screen updates, useful for measuring layout. useEffect runs asynchronously after paint. Prefer useEffect unless you need to read layout or prevent visual flicker.',
  },
  {
    id: 'react-q43',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    question: 'What happens when you pass the same value to a useState setter?',
    codeSnippet: `const [count, setCount] = useState(0);
setCount(0); // same value`,
    options: [
      'React bails out and skips the re-render since the value has not changed (using Object.is comparison)',
      'React always re-renders the component regardless of the value',
      'React throws a warning about unnecessary updates',
      'React queues the update for the next tick',
    ],
    correctAnswer:
      'React bails out and skips the re-render since the value has not changed (using Object.is comparison)',
    explanation:
      'React uses Object.is to compare the new state with the current state. If they are the same, React skips re-rendering the component and its children, which is an automatic performance optimization.',
  },
  {
    id: 'react-q44',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'Why might useEffect with an object dependency cause infinite re-renders?',
    codeSnippet: `function Component({ userId }) {
  const [data, setData] = useState(null);
  const options = { userId, limit: 10 };

  useEffect(() => {
    fetchData(options).then(setData);
  }, [options]); // potential infinite loop
}`,
    options: [
      'The options object is recreated on every render with a new reference, causing useEffect to re-run every time',
      'Objects cannot be used as useEffect dependencies',
      'fetchData triggers a state update that changes userId',
      'React compares objects by deep equality which fails on nested objects',
    ],
    correctAnswer:
      'The options object is recreated on every render with a new reference, causing useEffect to re-run every time',
    explanation:
      'React uses Object.is (reference equality) for dependency comparison. Since a new object is created each render, it always differs from the previous one. Fix this with useMemo or by listing primitive values in the dependency array.',
  },
  // ===== Common Patterns (react-q45 to react-q61) =====
  {
    id: 'react-q45',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What is the key difference between Higher-Order Components (HOCs) and custom hooks?',
    codeSnippet: `// HOC
const withAuth = (Component) => (props) => {
  const auth = useAuth();
  return <Component {...props} auth={auth} />;
};

// Custom Hook
function useAuth() {
  const [user, setUser] = useState(null);
  // ... auth logic
  return { user };
}`,
    options: [
      'HOCs wrap a component and inject props, while custom hooks share logic without adding wrapper components to the tree',
      'HOCs are faster than custom hooks',
      'Custom hooks can only be used in class components',
      'HOCs are the recommended modern pattern; hooks are deprecated',
    ],
    correctAnswer:
      'HOCs wrap a component and inject props, while custom hooks share logic without adding wrapper components to the tree',
    explanation:
      'HOCs create wrapper components which add nesting to the component tree. Custom hooks extract reusable logic that components can call directly without wrappers, resulting in a flatter component tree and better composability.',
  },
  {
    id: 'react-q46',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'What is the compound components pattern in React?',
    codeSnippet: `<Select onChange={handleChange}>
  <Select.Option value="a">Option A</Select.Option>
  <Select.Option value="b">Option B</Select.Option>
  <Select.Trigger>Choose...</Select.Trigger>
</Select>`,
    options: [
      'A pattern where a parent component shares implicit state with related child components, allowing flexible composition',
      'A pattern for combining two components into one using React.merge',
      'A pattern for rendering multiple root elements without a wrapper',
      'A pattern that automatically generates child components from parent props',
    ],
    correctAnswer:
      'A pattern where a parent component shares implicit state with related child components, allowing flexible composition',
    explanation:
      'Compound components share state implicitly through context or React.Children, letting users compose flexible UIs. The parent manages shared state while children can be arranged and customized freely.',
  },
  {
    id: 'react-q47',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'easy',
    question: 'What is the difference between composition and inheritance in React?',
    options: [
      'React recommends composition (nesting components and passing children/props) over class inheritance for code reuse',
      'Inheritance is the recommended pattern for sharing behavior between React components',
      'Composition and inheritance are equally recommended in React',
      'Composition only works with functional components, inheritance only with class components',
    ],
    correctAnswer:
      'React recommends composition (nesting components and passing children/props) over class inheritance for code reuse',
    explanation:
      'React strongly favors composition over inheritance. Components can be composed by nesting, passing children, or passing components as props. The React team has found no use cases where class inheritance is recommended.',
  },
  {
    id: 'react-q48',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'When should you use React Context versus prop drilling?',
    options: [
      'Use Context for truly global data (theme, auth, locale) shared by many components at different nesting levels; use props for component-specific data',
      'Always use Context because prop drilling is an anti-pattern',
      'Never use Context because it causes performance issues',
      'Use Context only when you have more than 10 components',
    ],
    correctAnswer:
      'Use Context for truly global data (theme, auth, locale) shared by many components at different nesting levels; use props for component-specific data',
    explanation:
      'Context is designed for data that is global to a component subtree (theme, locale, auth). For component-specific data, props are simpler and more explicit. Overusing Context can make component reuse harder.',
  },
  {
    id: 'react-q49',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'How does code splitting with React.lazy and Suspense work?',
    codeSnippet: `const LazyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
}`,
    options: [
      'React.lazy dynamically imports a component, and Suspense shows a fallback UI while the component code loads',
      'React.lazy pre-loads all components at build time for faster rendering',
      'Suspense prevents the component from rendering until all data is fetched',
      'React.lazy converts class components to functional components lazily',
    ],
    correctAnswer:
      'React.lazy dynamically imports a component, and Suspense shows a fallback UI while the component code loads',
    explanation:
      'React.lazy takes a function that calls dynamic import() and returns a component that can be rendered inside Suspense. While the lazy component loads, Suspense displays the fallback UI.',
  },
  {
    id: 'react-q50',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'What is an error boundary and how do you create one?',
    codeSnippet: `class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logError(error, info);
  }

  render() {
    if (this.state.hasError) return <Fallback />;
    return this.props.children;
  }
}`,
    options: [
      'A class component that catches JavaScript errors in its child tree and renders a fallback UI instead of crashing',
      'A try-catch block that wraps JSX expressions',
      'A functional component that uses useErrorBoundary hook',
      'A special div element that prevents errors from propagating',
    ],
    correctAnswer:
      'A class component that catches JavaScript errors in its child tree and renders a fallback UI instead of crashing',
    explanation:
      'Error boundaries are class components that implement getDerivedStateFromError or componentDidCatch. They catch errors during rendering, in lifecycle methods, and in constructors of the child tree. There is no hook equivalent yet.',
  },
  {
    id: 'react-q51',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What is forwardRef used for?',
    codeSnippet: `const FancyInput = React.forwardRef((props, ref) => (
  <input ref={ref} className="fancy" {...props} />
));

// Parent can now access the input DOM node
const inputRef = useRef();
<FancyInput ref={inputRef} />`,
    options: [
      'It allows a parent component to pass a ref through a child component to access a grandchild DOM element',
      'It automatically forwards all props to child components',
      'It creates a reference to the component instance for performance monitoring',
      'It prevents ref from being garbage collected',
    ],
    correctAnswer:
      'It allows a parent component to pass a ref through a child component to access a grandchild DOM element',
    explanation:
      'forwardRef creates a component that can receive a ref from its parent and forward it to a child DOM node or component. This is essential for reusable component libraries where parents need direct DOM access.',
  },
  {
    id: 'react-q52',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'What does useImperativeHandle do and when should you use it?',
    codeSnippet: `const FancyInput = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; }
  }));

  return <input ref={inputRef} />;
});`,
    options: [
      'It customizes the instance value exposed to parent components when using forwardRef, limiting the available methods',
      'It imperatively updates the DOM without React reconciliation',
      'It forces an imperative re-render of the component',
      'It creates a handle for imperative animations',
    ],
    correctAnswer:
      'It customizes the instance value exposed to parent components when using forwardRef, limiting the available methods',
    explanation:
      'useImperativeHandle lets you control what value is exposed via ref when using forwardRef. Instead of exposing the full DOM node, you can expose a limited API, which provides better encapsulation.',
  },
  {
    id: 'react-q53',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'easy',
    question: 'What is the convention for naming custom hooks?',
    codeSnippet: `function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
}`,
    options: [
      'Custom hooks must start with "use" so React can enforce the rules of hooks',
      'Custom hooks must start with "hook" as a prefix',
      'Custom hooks must be named in ALL_CAPS',
      'There is no naming convention for custom hooks',
    ],
    correctAnswer: 'Custom hooks must start with "use" so React can enforce the rules of hooks',
    explanation:
      'Custom hooks must start with "use" (e.g., useWindowSize, useFetch). This convention lets React lint rules verify that hooks are called correctly and follow the rules of hooks (only call hooks at the top level).',
  },
  {
    id: 'react-q54',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What is the render props pattern?',
    codeSnippet: `<DataProvider render={(data) => (
  <Chart data={data} />
)} />

// Or using children as a function:
<DataProvider>
  {(data) => <Chart data={data} />}
</DataProvider>`,
    options: [
      'A pattern where a component receives a function prop that returns JSX, allowing the parent to control what is rendered with shared data',
      'A pattern for rendering props directly as HTML attributes',
      'A pattern where components render their own props automatically',
      'A pattern that replaces the render method in class components',
    ],
    correctAnswer:
      'A pattern where a component receives a function prop that returns JSX, allowing the parent to control what is rendered with shared data',
    explanation:
      'Render props is a technique where a component takes a function that returns React elements. This allows sharing behavior while letting the consumer decide what to render. Custom hooks have largely replaced this pattern.',
  },
  {
    id: 'react-q55',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'easy',
    question: 'What is the controlled component pattern for a text input?',
    codeSnippet: `function ControlledInput() {
  const [value, setValue] = useState('');
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}`,
    options: [
      'The input value is driven by React state and updated via an onChange handler',
      'The input is disabled and cannot be edited',
      'The input value is set once and never changes',
      'The input is controlled by a parent component via context',
    ],
    correctAnswer: 'The input value is driven by React state and updated via an onChange handler',
    explanation:
      'A controlled component has its value managed by React state. The value prop sets the displayed value, and onChange updates the state on each change, creating a single source of truth.',
  },
  {
    id: 'react-q56',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'How do you share state logic between multiple components without Context?',
    options: [
      'Extract the shared logic into a custom hook that each component can call independently',
      'Use global variables outside of React',
      'Copy and paste the state logic into each component',
      'Use React.cloneElement to inject state into children',
    ],
    correctAnswer:
      'Extract the shared logic into a custom hook that each component can call independently',
    explanation:
      'Custom hooks encapsulate reusable stateful logic that can be called by any component. Each component gets its own independent copy of the state, unlike Context which shares a single value.',
  },
  {
    id: 'react-q57',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'hard',
    question:
      'What problem does the "key" prop solve when conditionally rendering different component types?',
    codeSnippet: `// Without key - React reuses the DOM node
{isLogin ? <LoginForm /> : <SignupForm />}

// With key - React creates a fresh instance
{isLogin
  ? <LoginForm key="login" />
  : <SignupForm key="signup" />}`,
    options: [
      'Using different keys forces React to unmount and remount the component, resetting its state completely',
      'Keys are only needed for lists, not conditional rendering',
      'Keys improve rendering performance in conditional expressions',
      'Keys prevent React from throwing warnings in conditional renders',
    ],
    correctAnswer:
      'Using different keys forces React to unmount and remount the component, resetting its state completely',
    explanation:
      'When you give different keys to conditionally rendered components, React treats them as entirely different elements. This destroys the old instance and creates a new one, resetting all state.',
  },
  {
    id: 'react-q58',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'easy',
    question: 'What is the children prop in React?',
    codeSnippet: `function Card({ children }) {
  return <div className="card">{children}</div>;
}

<Card>
  <h2>Title</h2>
  <p>Content</p>
</Card>`,
    options: [
      'A special prop that contains the JSX elements nested between the opening and closing tags of a component',
      'A prop that must be explicitly passed as children={...}',
      'A prop that only accepts string values',
      'A prop that references the child components in the DOM tree',
    ],
    correctAnswer:
      'A special prop that contains the JSX elements nested between the opening and closing tags of a component',
    explanation:
      'The children prop automatically contains whatever JSX is placed between the opening and closing tags of a component. It enables composition by letting components wrap arbitrary content.',
  },
  {
    id: 'react-q59',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What is the provider pattern commonly used with React Context?',
    codeSnippet: `const ThemeContext = React.createContext('light');

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}`,
    options: [
      'Wrapping a subtree with a Context Provider that supplies a shared value to all descendants that consume it',
      'A pattern that provides all components with default props',
      'A dependency injection system that replaces imports',
      'A pattern for providing error boundaries to child components',
    ],
    correctAnswer:
      'Wrapping a subtree with a Context Provider that supplies a shared value to all descendants that consume it',
    explanation:
      'The provider pattern uses React Context to wrap a component subtree. Any descendant component can consume the context value using useContext without explicitly passing props through intermediate components.',
  },
  {
    id: 'react-q60',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'What problem does the "state colocation" principle solve?',
    options: [
      'It keeps state as close as possible to where it is used, reducing unnecessary re-renders of unrelated components',
      'It requires all state to be stored in a global store for consistency',
      'It mandates that state must always be in the root component',
      'It requires every component to have its own copy of all state',
    ],
    correctAnswer:
      'It keeps state as close as possible to where it is used, reducing unnecessary re-renders of unrelated components',
    explanation:
      'State colocation means placing state in the component closest to where it is needed. This prevents parent components from re-rendering when state changes only affect a specific child, improving performance and maintainability.',
  },
  {
    id: 'react-q61',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    question:
      'What is the difference between a controlled and uncontrolled component for file inputs?',
    codeSnippet: `// File inputs are always uncontrolled
function FileUpload() {
  const fileRef = useRef(null);

  const handleSubmit = () => {
    const file = fileRef.current.files[0];
    uploadFile(file);
  };

  return <input type="file" ref={fileRef} />;
}`,
    options: [
      'File inputs are always uncontrolled in React because their value is read-only for security reasons; you must use a ref to access files',
      'File inputs can be controlled with useState like text inputs',
      'File inputs require a special useFileState hook',
      'File inputs cannot be used in React components at all',
    ],
    correctAnswer:
      'File inputs are always uncontrolled in React because their value is read-only for security reasons; you must use a ref to access files',
    explanation:
      'HTML file inputs have a read-only value property for security. In React, you access the selected files via a ref (ref.current.files) or the event object in onChange, making them inherently uncontrolled.',
  },
  // ===== Rendering (react-q62 to react-q78) =====
  {
    id: 'react-q62',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'medium',
    question:
      'How does the React reconciliation algorithm decide when to update vs replace a DOM element?',
    options: [
      'If the element type changes (e.g., div to span), React destroys the old tree and builds a new one; if it stays the same, React updates the attributes',
      'React always destroys and rebuilds the entire subtree on any change',
      'React compares the innerHTML of elements to decide',
      'React only updates elements that have changed CSS classes',
    ],
    correctAnswer:
      'If the element type changes (e.g., div to span), React destroys the old tree and builds a new one; if it stays the same, React updates the attributes',
    explanation:
      'React compares element types during reconciliation. Different types trigger a full teardown and rebuild. Same types trigger an update of changed attributes. This heuristic makes diffing O(n) instead of O(n^3).',
  },
  {
    id: 'react-q63',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'hard',
    question: 'What is the React Fiber architecture?',
    options: [
      'A reimplementation of the React core algorithm that uses a linked-list tree of fiber nodes to enable incremental rendering and prioritization',
      'A networking layer in React for handling fiber-optic connections',
      'A CSS-in-JS solution built into React core',
      'A compiler that converts JSX to optimized machine code',
    ],
    correctAnswer:
      'A reimplementation of the React core algorithm that uses a linked-list tree of fiber nodes to enable incremental rendering and prioritization',
    explanation:
      'React Fiber, introduced in React 16, restructured the core algorithm around a tree of fiber nodes. Each fiber represents a unit of work that can be paused and resumed, enabling concurrent features and priority-based rendering.',
  },
  {
    id: 'react-q64',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'medium',
    question:
      'What happens when you use array index as a key for list items that can be reordered?',
    codeSnippet: `{items.map((item, index) => (
  <ListItem key={index} data={item} />
))}`,
    options: [
      'React may incorrectly reuse component instances and state when items are reordered, inserted, or deleted, causing bugs',
      'React handles index keys perfectly for all list operations',
      'React throws a warning but the behavior is correct',
      'Index keys cause the entire list to re-render on every change',
    ],
    correctAnswer:
      'React may incorrectly reuse component instances and state when items are reordered, inserted, or deleted, causing bugs',
    explanation:
      'When items are reordered, index-based keys stay the same for each position but point to different data. React reuses the component at each index, potentially preserving stale state. Use unique, stable IDs as keys instead.',
  },
  {
    id: 'react-q65',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'What is the difference between React.memo and useMemo?',
    codeSnippet: `// React.memo - wraps a component
const MemoComp = React.memo(MyComponent);

// useMemo - memoizes a value inside a component
const memoized = useMemo(() => expensiveCalc(a, b), [a, b]);`,
    options: [
      'React.memo memoizes a component to skip re-rendering when props are unchanged; useMemo memoizes a computed value within a component',
      'They are identical and interchangeable',
      'React.memo is for class components, useMemo is for functional components',
      'useMemo memoizes components, React.memo memoizes values',
    ],
    correctAnswer:
      'React.memo memoizes a component to skip re-rendering when props are unchanged; useMemo memoizes a computed value within a component',
    explanation:
      'React.memo is a HOC that prevents a component from re-rendering if its props have not changed. useMemo is a hook that memoizes the result of an expensive computation within a component between renders.',
  },
  {
    id: 'react-q66',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What is the purpose of React Fragments?',
    codeSnippet: `// Long form
<React.Fragment>
  <h1>Title</h1>
  <p>Content</p>
</React.Fragment>

// Short form
<>
  <h1>Title</h1>
  <p>Content</p>
</>`,
    options: [
      'Fragments let you group multiple elements without adding an extra DOM node to the tree',
      'Fragments improve rendering performance by 50%',
      'Fragments are required for server-side rendering',
      'Fragments prevent child components from re-rendering',
    ],
    correctAnswer:
      'Fragments let you group multiple elements without adding an extra DOM node to the tree',
    explanation:
      'React components must return a single element. Fragments let you return multiple elements without adding a wrapper div to the DOM. The short syntax <></> does not support keys; use <React.Fragment key={...}> when needed.',
  },
  {
    id: 'react-q67',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'hard',
    question: 'What is hydration in React and when does it occur?',
    options: [
      'Hydration is the process of attaching event handlers and React state to server-rendered HTML without re-creating the DOM',
      'Hydration is loading data from an API after the component mounts',
      'Hydration is the process of converting JSX to HTML strings',
      'Hydration is clearing the React component tree to free memory',
    ],
    correctAnswer:
      'Hydration is the process of attaching event handlers and React state to server-rendered HTML without re-creating the DOM',
    explanation:
      'During hydration, React walks the existing server-rendered DOM and attaches event listeners and component state to it. This avoids re-creating DOM nodes and provides a fast interactive experience after SSR.',
  },
  {
    id: 'react-q68',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'What does createPortal do in React?',
    codeSnippet: `import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    <div className="modal">{children}</div>,
    document.getElementById('modal-root')
  );
}`,
    options: [
      'It renders children into a different DOM node outside the parent component hierarchy',
      'It creates a new React root for independent rendering',
      'It teleports components between different React applications',
      'It creates an iframe to isolate the rendered content',
    ],
    correctAnswer:
      'It renders children into a different DOM node outside the parent component hierarchy',
    explanation:
      'createPortal renders children into a DOM node that exists outside the parent component DOM hierarchy. The component still behaves as a child in the React tree (events bubble up), but the DOM nodes appear elsewhere.',
  },
  {
    id: 'react-q69',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What is streaming SSR in React 18?',
    codeSnippet: `// Server code
import { renderToPipeableStream } from 'react-dom/server';

const { pipe } = renderToPipeableStream(<App />, {
  onShellReady() {
    response.setHeader('Content-Type', 'text/html');
    pipe(response);
  }
});`,
    options: [
      'It sends HTML to the browser in chunks as components render on the server, allowing earlier content to display before the entire page is ready',
      'It streams video content through React components',
      'It renders components on a separate server thread',
      'It caches rendered HTML in a stream buffer for reuse',
    ],
    correctAnswer:
      'It sends HTML to the browser in chunks as components render on the server, allowing earlier content to display before the entire page is ready',
    explanation:
      'Streaming SSR sends HTML progressively. The shell (layout) is sent first, and Suspense boundaries are filled in as their content resolves. This improves Time to First Byte and allows incremental hydration.',
  },
  {
    id: 'react-q70',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'When does a React component re-render?',
    options: [
      'When its state changes, when its parent re-renders, or when the context it consumes changes',
      'Only when its own state changes',
      'Only when its props change',
      'On every browser animation frame',
    ],
    correctAnswer:
      'When its state changes, when its parent re-renders, or when the context it consumes changes',
    explanation:
      'A component re-renders when: (1) its state is updated via setState, (2) its parent component re-renders (passing potentially new props), or (3) a context value it consumes changes.',
  },
  {
    id: 'react-q71',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'hard',
    question: 'What is concurrent rendering and how does it affect component rendering guarantees?',
    codeSnippet: `function SearchResults({ query }) {
  // In concurrent mode, this render may be interrupted
  const results = filterResults(query);
  return <List items={results} />;
}`,
    options: [
      'React may start rendering, pause to handle urgent updates, and resume or discard the work, meaning render functions may be called multiple times without committing',
      'Components always render exactly once per state update in concurrent mode',
      'Concurrent rendering runs all components in Web Worker threads',
      'Concurrent rendering only affects server components, not client components',
    ],
    correctAnswer:
      'React may start rendering, pause to handle urgent updates, and resume or discard the work, meaning render functions may be called multiple times without committing',
    explanation:
      'In concurrent rendering, React can interrupt in-progress renders. Render functions must be pure because they may execute multiple times before the result is committed to the DOM. Side effects should only happen in effects or event handlers.',
  },
  {
    id: 'react-q72',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'How does shouldComponentUpdate work and what replaced it in functional components?',
    codeSnippet: `class MyComponent extends React.PureComponent {
  // PureComponent implements shouldComponentUpdate
  // with shallow prop and state comparison
}

// Functional equivalent:
const MyFunctional = React.memo(function MyFunctional(props) {
  return <div>{props.value}</div>;
});`,
    options: [
      'shouldComponentUpdate returns a boolean to control re-rendering; React.memo and useMemo serve a similar purpose for functional components',
      'shouldComponentUpdate is called after rendering to decide if the DOM should update',
      'There is no equivalent for functional components',
      'shouldComponentUpdate was removed in React 18',
    ],
    correctAnswer:
      'shouldComponentUpdate returns a boolean to control re-rendering; React.memo and useMemo serve a similar purpose for functional components',
    explanation:
      'shouldComponentUpdate(nextProps, nextState) lets class components skip re-renders by returning false. PureComponent does a shallow comparison automatically. For functional components, React.memo provides similar behavior.',
  },
  {
    id: 'react-q73',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'What values can a React component return from its render?',
    options: [
      'JSX elements, arrays, fragments, strings, numbers, booleans, null, or undefined',
      'Only JSX elements and strings',
      'Only a single JSX element',
      'Only JSX elements, null, or undefined',
    ],
    correctAnswer:
      'JSX elements, arrays, fragments, strings, numbers, booleans, null, or undefined',
    explanation:
      'React components can return JSX, arrays of elements, fragments, strings, numbers, booleans (render nothing), null (render nothing), or undefined. Returning an array requires keys on each element.',
  },
  {
    id: 'react-q74',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What is the difference between React.createElement and JSX?',
    codeSnippet: `// JSX
const element = <h1 className="title">Hello</h1>;

// Equivalent createElement call
const element = React.createElement('h1', { className: 'title' }, 'Hello');`,
    options: [
      'JSX is syntactic sugar that gets compiled to React.createElement calls; they produce the same result',
      'JSX is faster than React.createElement',
      'React.createElement creates real DOM nodes while JSX creates virtual nodes',
      'JSX can express things that React.createElement cannot',
    ],
    correctAnswer:
      'JSX is syntactic sugar that gets compiled to React.createElement calls; they produce the same result',
    explanation:
      'JSX is compiled by Babel or similar tools into React.createElement (or the new JSX transform _jsx function) calls. They are functionally identical; JSX just provides a more readable HTML-like syntax.',
  },
  {
    id: 'react-q75',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'hard',
    question: 'What causes a hydration mismatch and how can you fix it?',
    codeSnippet: `function Timestamp() {
  // This causes a hydration mismatch because
  // server and client render different values
  return <span>{new Date().toLocaleString()}</span>;
}`,
    options: [
      'A mismatch occurs when server-rendered HTML differs from what the client renders during hydration; fix by using useEffect for client-only values or suppressHydrationWarning',
      'Hydration mismatches only occur with third-party libraries',
      'Hydration mismatches are automatically resolved by React',
      'Hydration mismatches only happen when using class components',
    ],
    correctAnswer:
      'A mismatch occurs when server-rendered HTML differs from what the client renders during hydration; fix by using useEffect for client-only values or suppressHydrationWarning',
    explanation:
      'Hydration mismatches occur when the server HTML does not match the initial client render. Common causes include timestamps, random values, or browser-only APIs. Use useEffect to defer client-only rendering or the suppressHydrationWarning prop.',
  },
  {
    id: 'react-q76',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'How does React handle rendering of boolean, null, and undefined values in JSX?',
    codeSnippet: `<div>
  {true}
  {false}
  {null}
  {undefined}
  {0}
  {''}
</div>`,
    options: [
      'true, false, null, and undefined render nothing; 0 renders as "0" and empty string renders nothing',
      'All falsy values render nothing',
      'All of these values render as their string representation',
      'React throws an error for null and undefined values in JSX',
    ],
    correctAnswer:
      'true, false, null, and undefined render nothing; 0 renders as "0" and empty string renders nothing',
    explanation:
      'React does not render true, false, null, or undefined. However, 0 is rendered as the string "0", which is a common gotcha with conditional rendering like {count && <Component />} when count is 0.',
  },
  {
    id: 'react-q77',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'hard',
    question: 'What is selective hydration in React 18?',
    options: [
      'React can hydrate parts of the page independently, prioritizing sections the user is interacting with, without waiting for all code to load',
      'React only hydrates components that are visible in the viewport',
      'React skips hydration for components that have not changed since server render',
      'React lets you manually select which components to hydrate via an API',
    ],
    correctAnswer:
      'React can hydrate parts of the page independently, prioritizing sections the user is interacting with, without waiting for all code to load',
    explanation:
      'Selective hydration in React 18 allows Suspense boundaries to hydrate independently. If a user interacts with a not-yet-hydrated section, React prioritizes hydrating that section first, making the page interactive faster.',
  },
  {
    id: 'react-q78',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'What happens when you render a list without providing keys?',
    codeSnippet: `{items.map(item => <li>{item.name}</li>)}`,
    options: [
      'React shows a console warning and falls back to using array indices as keys, which can cause issues with reordering',
      'React throws a runtime error and the component crashes',
      'React automatically generates unique keys using a built-in algorithm',
      'The list renders correctly with no warnings or issues',
    ],
    correctAnswer:
      'React shows a console warning and falls back to using array indices as keys, which can cause issues with reordering',
    explanation:
      'Without explicit keys, React warns in the console and uses array indices by default. This works for static lists but causes bugs with dynamic lists where items are reordered, inserted, or removed.',
  },
  // ===== Data Fetching (react-q79 to react-q95) =====
  {
    id: 'react-q79',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'easy',
    question: 'What is the basic pattern for fetching data with useEffect?',
    codeSnippet: `function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <Spinner />;
  return <div>{user.name}</div>;
}`,
    options: [
      'Call the fetch API inside useEffect with the relevant dependency, and store the result in state',
      'Call fetch directly in the component body outside useEffect',
      'Use the useFetch hook built into React',
      'Fetch data in the parent component and pass it as a global variable',
    ],
    correctAnswer:
      'Call the fetch API inside useEffect with the relevant dependency, and store the result in state',
    explanation:
      'Data fetching is a side effect and belongs in useEffect. Include the dependency that triggers re-fetching (like userId) in the dependency array, and manage loading/error states alongside the data.',
  },
  {
    id: 'react-q80',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'How can race conditions occur in React data fetching and how do you prevent them?',
    codeSnippet: `useEffect(() => {
  let cancelled = false;

  fetchData(query).then(result => {
    if (!cancelled) {
      setData(result);
    }
  });

  return () => { cancelled = true; };
}, [query]);`,
    options: [
      'Race conditions occur when a slow response arrives after a newer request; prevent them by using a cleanup flag or AbortController to ignore stale results',
      'Race conditions cannot occur in React because state updates are batched',
      'Race conditions only occur when using class components',
      'React automatically prevents race conditions in useEffect',
    ],
    correctAnswer:
      'Race conditions occur when a slow response arrives after a newer request; prevent them by using a cleanup flag or AbortController to ignore stale results',
    explanation:
      'If a user changes a query quickly, earlier (slower) requests may resolve after newer ones. The cleanup function sets a flag to discard stale results. AbortController can also cancel the fetch itself.',
  },
  {
    id: 'react-q81',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'How do you use AbortController to cancel fetch requests in React?',
    codeSnippet: `useEffect(() => {
  const controller = new AbortController();

  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(setData)
    .catch(err => {
      if (err.name !== 'AbortError') throw err;
    });

  return () => controller.abort();
}, []);`,
    options: [
      'Create an AbortController, pass its signal to fetch, and call abort() in the useEffect cleanup function',
      'Call fetch.cancel() in the useEffect cleanup',
      'Use the built-in React.abortFetch() utility',
      'Set a timeout on the fetch request to auto-cancel',
    ],
    correctAnswer:
      'Create an AbortController, pass its signal to fetch, and call abort() in the useEffect cleanup function',
    explanation:
      'AbortController provides a signal that can cancel fetch requests. Pass the signal to the fetch options, and call controller.abort() in the useEffect cleanup to cancel pending requests when the component unmounts or dependencies change.',
  },
  {
    id: 'react-q82',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'easy',
    question: 'What are the three common states to manage when fetching data in React?',
    options: [
      'Loading state, data/success state, and error state',
      'Pending, resolved, and cached states',
      'Idle, active, and complete states',
      'Request, response, and render states',
    ],
    correctAnswer: 'Loading state, data/success state, and error state',
    explanation:
      'Data fetching typically involves three states: loading (request in progress), data (successful response), and error (request failed). Managing all three ensures a good user experience with appropriate feedback.',
  },
  {
    id: 'react-q83',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'hard',
    question: 'How does Suspense for data fetching work conceptually?',
    codeSnippet: `function ProfilePage() {
  return (
    <Suspense fallback={<Spinner />}>
      <ProfileDetails />
    </Suspense>
  );
}

// ProfileDetails "suspends" while data loads
function ProfileDetails() {
  const data = resource.read(); // throws a promise if not ready
  return <div>{data.name}</div>;
}`,
    options: [
      'The component throws a promise when data is not ready; Suspense catches it and shows the fallback until the promise resolves',
      'Suspense automatically fetches data based on the component props',
      'Suspense delays rendering until all child components have loaded their data',
      'Suspense replaces useEffect for data fetching',
    ],
    correctAnswer:
      'The component throws a promise when data is not ready; Suspense catches it and shows the fallback until the promise resolves',
    explanation:
      'Suspense for data fetching relies on components throwing promises during render when data is not yet available. Suspense catches these promises, shows the fallback, and re-renders the component when the promise resolves.',
  },
  {
    id: 'react-q84',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'What problem do libraries like React Query and SWR solve?',
    options: [
      'They handle caching, deduplication, revalidation, and synchronization of server state, reducing boilerplate around useEffect-based fetching',
      'They replace the browser fetch API with a faster alternative',
      'They provide a built-in database for React applications',
      'They enable server-side rendering without a Node.js server',
    ],
    correctAnswer:
      'They handle caching, deduplication, revalidation, and synchronization of server state, reducing boilerplate around useEffect-based fetching',
    explanation:
      'React Query and SWR manage server state by providing automatic caching, background revalidation, request deduplication, optimistic updates, and pagination support, eliminating common boilerplate in data fetching.',
  },
  {
    id: 'react-q85',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'hard',
    question: 'What are React Server Components and how do they differ from client components?',
    options: [
      'Server Components render on the server with zero client-side JavaScript, can directly access server resources, and cannot use hooks or event handlers',
      'Server Components are components that fetch data from the server via useEffect',
      'Server Components are class components that run on the server',
      'Server Components are the same as SSR-rendered client components',
    ],
    correctAnswer:
      'Server Components render on the server with zero client-side JavaScript, can directly access server resources, and cannot use hooks or event handlers',
    explanation:
      'React Server Components (RSC) execute only on the server. They can access databases and file systems directly, add zero JavaScript to the bundle, but cannot use state, effects, or browser APIs. They differ from SSR which sends HTML but still hydrates client components.',
  },
  {
    id: 'react-q86',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'What is the stale-while-revalidate (SWR) pattern for data fetching?',
    options: [
      'Return cached (stale) data immediately while fetching fresh data in the background, then update the UI when the new data arrives',
      'Always show a loading spinner while waiting for fresh data',
      'Cache data permanently and never refetch',
      'Fetch data only when the cache has completely expired',
    ],
    correctAnswer:
      'Return cached (stale) data immediately while fetching fresh data in the background, then update the UI when the new data arrives',
    explanation:
      'SWR shows cached data instantly for a fast UI, then revalidates in the background. When fresh data arrives, the UI updates seamlessly. This pattern provides both speed and data freshness.',
  },
  {
    id: 'react-q87',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'easy',
    question: 'How do you handle errors when fetching data in a React component?',
    codeSnippet: `const [error, setError] = useState(null);

useEffect(() => {
  fetch('/api/data')
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    })
    .then(setData)
    .catch(setError);
}, []);

if (error) return <ErrorMessage error={error} />;`,
    options: [
      'Store the error in state using a catch handler and conditionally render an error UI',
      'Use a global try-catch around the entire component',
      'Errors in fetch are automatically caught by React error boundaries',
      'Use window.onerror to catch all fetch errors',
    ],
    correctAnswer:
      'Store the error in state using a catch handler and conditionally render an error UI',
    explanation:
      'Catch fetch errors with .catch() or try/catch in async functions, store the error in state, and render appropriate error UI. Note that fetch promise rejections are not caught by error boundaries since they are asynchronous.',
  },
  {
    id: 'react-q88',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'What is an optimistic update in React data fetching?',
    codeSnippet: `function toggleLike(postId) {
  // Immediately update UI
  setLiked(prev => !prev);

  // Send request in background
  api.toggleLike(postId).catch(() => {
    // Revert on failure
    setLiked(prev => !prev);
    showError('Failed to update');
  });
}`,
    options: [
      'Updating the UI immediately before the server confirms the change, then reverting if the request fails',
      'Waiting for the server response before updating any UI',
      'Sending multiple requests in parallel and using the first response',
      'Caching the result locally so it never needs to be fetched again',
    ],
    correctAnswer:
      'Updating the UI immediately before the server confirms the change, then reverting if the request fails',
    explanation:
      'Optimistic updates make the UI feel instant by applying changes immediately and rolling back on failure. This pattern improves perceived performance for actions that usually succeed, like toggling a like button.',
  },
  {
    id: 'react-q89',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'hard',
    question: 'What is cache invalidation in the context of React data fetching libraries?',
    options: [
      'Marking cached data as stale so it is refetched on the next access or automatically in the background',
      'Deleting the browser cache to force fresh page loads',
      'Preventing any data from being cached',
      'Encrypting cached data so it cannot be read by other components',
    ],
    correctAnswer:
      'Marking cached data as stale so it is refetched on the next access or automatically in the background',
    explanation:
      'Cache invalidation tells the data fetching library that cached data is outdated. Libraries like React Query provide methods like invalidateQueries to mark data stale, triggering automatic refetching when the data is next needed.',
  },
  {
    id: 'react-q90',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'easy',
    question:
      'Why should you avoid fetching data directly in the component body (outside useEffect)?',
    codeSnippet: `function BadComponent() {
  // DON'T: fetch in the render body
  const data = fetch('/api/data'); // wrong!

  return <div>{/* ... */}</div>;
}`,
    options: [
      'Fetching in the render body causes a new request on every render and does not allow cleanup or dependency tracking',
      'Fetching outside useEffect is faster but not supported',
      'The browser blocks fetch calls during React rendering',
      'React converts all fetch calls to synchronous requests during render',
    ],
    correctAnswer:
      'Fetching in the render body causes a new request on every render and does not allow cleanup or dependency tracking',
    explanation:
      'Fetch calls in the component body run on every render, causing duplicate requests, race conditions, and no ability to cancel or clean up. useEffect provides dependency tracking and cleanup to manage the fetch lifecycle correctly.',
  },
  {
    id: 'react-q91',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'How do you implement pagination with data fetching in React?',
    codeSnippet: `const [page, setPage] = useState(1);
const [items, setItems] = useState([]);

useEffect(() => {
  fetch(\`/api/items?page=\${page}\`)
    .then(res => res.json())
    .then(data => setItems(prev => [...prev, ...data]));
}, [page]);

return (
  <>
    <ItemList items={items} />
    <button onClick={() => setPage(p => p + 1)}>Load More</button>
  </>
);`,
    options: [
      'Track the current page in state, fetch when page changes, and append results for infinite scroll or replace results for traditional pagination',
      'Fetch all data at once and paginate on the client side only',
      'Use a built-in React.Pagination component',
      'Pagination requires server-side rendering and cannot be done client-side',
    ],
    correctAnswer:
      'Track the current page in state, fetch when page changes, and append results for infinite scroll or replace results for traditional pagination',
    explanation:
      'Pagination in React typically involves state for the current page, a useEffect that fetches when the page changes, and either appending new results (infinite scroll) or replacing them (page-based navigation).',
  },
  {
    id: 'react-q92',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'hard',
    question:
      'What is the "render-as-you-fetch" pattern and how does it differ from "fetch-on-render"?',
    options: [
      'Render-as-you-fetch starts fetching before the component renders (e.g., on navigation), while fetch-on-render waits for the component to mount before starting the fetch',
      'Render-as-you-fetch uses SSR, fetch-on-render uses CSR',
      'They are the same pattern with different names',
      'Render-as-you-fetch caches all data at build time',
    ],
    correctAnswer:
      'Render-as-you-fetch starts fetching before the component renders (e.g., on navigation), while fetch-on-render waits for the component to mount before starting the fetch',
    explanation:
      'Render-as-you-fetch initiates data fetching early (on route transition or user action) in parallel with code loading and rendering. This eliminates the waterfall where components must mount before fetching, improving load times.',
  },
  {
    id: 'react-q93',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'How do you deduplicate identical fetch requests in React?',
    options: [
      'Use a data fetching library like React Query or SWR that automatically deduplicates requests with the same key',
      'React automatically deduplicates all fetch calls',
      'Use a global Set to track in-flight URLs and skip duplicates',
      'Deduplication is handled by the browser cache headers only',
    ],
    correctAnswer:
      'Use a data fetching library like React Query or SWR that automatically deduplicates requests with the same key',
    explanation:
      'React Query and SWR deduplicate requests using cache keys. If multiple components request the same data simultaneously, only one network request is made and all components receive the result. This prevents redundant API calls.',
  },
  {
    id: 'react-q94',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'easy',
    question: 'What is the purpose of a loading skeleton in data fetching UIs?',
    options: [
      'It shows a placeholder that mimics the layout of the expected content, reducing perceived loading time and preventing layout shifts',
      'It loads the component skeleton before adding the real data',
      'It is a special React component that pre-renders content on the server',
      'It reduces the size of the JavaScript bundle',
    ],
    correctAnswer:
      'It shows a placeholder that mimics the layout of the expected content, reducing perceived loading time and preventing layout shifts',
    explanation:
      'Loading skeletons display a greyed-out version of the expected UI structure. This provides visual feedback, reduces perceived latency, and prevents layout shifts when data arrives, improving user experience over a simple spinner.',
  },
  {
    id: 'react-q95',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'hard',
    question: 'How do you handle dependent (waterfall) data fetching in React?',
    codeSnippet: `function UserPosts({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(setUser);
  }, [userId]);

  useEffect(() => {
    if (user?.blogId) {
      fetch(\`/api/blogs/\${user.blogId}/posts\`)
        .then(res => res.json())
        .then(setPosts);
    }
  }, [user?.blogId]);
}`,
    options: [
      'Chain useEffect hooks where the second depends on data from the first, but consider restructuring to fetch in parallel when possible',
      'Always fetch all data in a single useEffect to avoid waterfalls',
      'Dependent fetching is not possible in React hooks',
      'Use Promise.all for all data fetching regardless of dependencies',
    ],
    correctAnswer:
      'Chain useEffect hooks where the second depends on data from the first, but consider restructuring to fetch in parallel when possible',
    explanation:
      'Dependent fetching uses chained effects where one fetch depends on the result of another. While sometimes necessary, waterfalls increase loading time. Consider restructuring APIs or using parallel fetching when data dependencies allow.',
  },
  // ===== Forms & Validation (react-q96 to react-q112) =====
  {
    id: 'react-q96',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'easy',
    question: 'How do you create a controlled text input in React?',
    codeSnippet: `const [name, setName] = useState('');

<input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>`,
    options: [
      'Set the value prop to a state variable and update it via an onChange handler',
      'Set the defaultValue prop and let React manage updates',
      'Use the ref attribute to read and set the value',
      'Use the controlled={true} prop on the input',
    ],
    correctAnswer: 'Set the value prop to a state variable and update it via an onChange handler',
    explanation:
      'A controlled input uses the value prop bound to state and an onChange handler to update that state. React state is the single source of truth, and the input always reflects the current state value.',
  },
  {
    id: 'react-q97',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'How do you create an uncontrolled input using useRef?',
    codeSnippet: `function UncontrolledForm() {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue="initial" />
      <button type="submit">Submit</button>
    </form>
  );
}`,
    options: [
      'Use defaultValue instead of value, attach a ref to read the value on submit, and let the DOM manage the input state',
      'Omit both value and defaultValue and read innerHTML',
      'Use uncontrolled={true} as a prop',
      'Use onChange without useState to create an uncontrolled input',
    ],
    correctAnswer:
      'Use defaultValue instead of value, attach a ref to read the value on submit, and let the DOM manage the input state',
    explanation:
      'Uncontrolled inputs use defaultValue for the initial value and let the DOM handle updates. You read the current value via a ref when needed (e.g., on form submit). The DOM is the source of truth, not React state.',
  },
  {
    id: 'react-q98',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'easy',
    question: 'How do you handle form submission in React?',
    codeSnippet: `function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // process form data
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" />
      <button type="submit">Login</button>
    </form>
  );
}`,
    options: [
      'Attach an onSubmit handler to the form element and call e.preventDefault() to prevent the default page reload',
      'Attach onClick to the submit button and use action="javascript:void(0)"',
      'Use the onFormSubmit event handler',
      'Forms in React submit automatically without any handler',
    ],
    correctAnswer:
      'Attach an onSubmit handler to the form element and call e.preventDefault() to prevent the default page reload',
    explanation:
      'In React, handle form submission via the onSubmit event on the form element. Call e.preventDefault() to prevent the browser from reloading the page, then process the form data in JavaScript.',
  },
  {
    id: 'react-q99',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'What is the core concept behind React Hook Form?',
    codeSnippet: `import { useForm } from 'react-hook-form';

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} />
      {errors.email && <span>Email required</span>}
      <button type="submit">Submit</button>
    </form>
  );
}`,
    options: [
      'It uses uncontrolled inputs with refs under the hood, minimizing re-renders while providing validation and form state management',
      'It converts all inputs to controlled components for maximum control',
      'It replaces the HTML form element with a custom React component',
      'It stores all form data in React Context for global access',
    ],
    correctAnswer:
      'It uses uncontrolled inputs with refs under the hood, minimizing re-renders while providing validation and form state management',
    explanation:
      'React Hook Form uses uncontrolled inputs (refs) to minimize re-renders, making forms performant. It provides a register function to connect inputs, built-in validation, and form state tracking with minimal boilerplate.',
  },
  {
    id: 'react-q100',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'hard',
    question: 'How do you implement custom validation logic for a form field in React?',
    codeSnippet: `const [email, setEmail] = useState('');
const [error, setError] = useState('');

const validate = (value) => {
  if (!value) return 'Email is required';
  if (!/\\S+@\\S+\\.\\S+/.test(value)) return 'Invalid email format';
  return '';
};

const handleChange = (e) => {
  const val = e.target.value;
  setEmail(val);
  setError(validate(val));
};`,
    options: [
      'Create a validation function that returns error messages, call it on change or blur, and store errors in state to display alongside inputs',
      'Use the HTML5 required and pattern attributes exclusively',
      'Use React.validate() built-in utility',
      'Validation can only be done on form submission, not on individual field changes',
    ],
    correctAnswer:
      'Create a validation function that returns error messages, call it on change or blur, and store errors in state to display alongside inputs',
    explanation:
      'Custom validation involves writing functions that check values and return error messages. Call them on change, blur, or submit events, store results in state, and conditionally render error messages next to the relevant fields.',
  },
  {
    id: 'react-q101',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'hard',
    question: 'How do you implement async validation (e.g., checking if a username is taken)?',
    codeSnippet: `const [username, setUsername] = useState('');
const [checking, setChecking] = useState(false);
const [error, setError] = useState('');

useEffect(() => {
  if (!username) return;
  setChecking(true);
  const timer = setTimeout(async () => {
    const taken = await checkUsername(username);
    setError(taken ? 'Username is taken' : '');
    setChecking(false);
  }, 500);
  return () => clearTimeout(timer);
}, [username]);`,
    options: [
      'Debounce the input, then call an async validation function in useEffect, showing a checking indicator while the request is in flight',
      'Async validation is impossible in React and must be done on form submission only',
      'Use synchronous localStorage checks instead of async API calls',
      'React Hook Form handles all async validation automatically without any code',
    ],
    correctAnswer:
      'Debounce the input, then call an async validation function in useEffect, showing a checking indicator while the request is in flight',
    explanation:
      'Async validation typically debounces user input (using setTimeout in useEffect cleanup), sends an API request, and shows a loading indicator. The cleanup function prevents stale validations from overwriting current results.',
  },
  {
    id: 'react-q102',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'How do you handle a select dropdown in React?',
    codeSnippet: `const [color, setColor] = useState('blue');

<select value={color} onChange={(e) => setColor(e.target.value)}>
  <option value="red">Red</option>
  <option value="blue">Blue</option>
  <option value="green">Green</option>
</select>`,
    options: [
      'Use the value prop on the select element bound to state, not the selected attribute on option elements',
      'Add the selected attribute to the default option element',
      'Use a ref to read the selected index from the DOM',
      'Select elements cannot be controlled in React',
    ],
    correctAnswer:
      'Use the value prop on the select element bound to state, not the selected attribute on option elements',
    explanation:
      'In React, control a select by setting value on the select element itself. React manages which option is selected based on the value prop. Do not use the HTML selected attribute on individual option elements.',
  },
  {
    id: 'react-q103',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'easy',
    question: 'How do you handle a checkbox input in React?',
    codeSnippet: `const [agreed, setAgreed] = useState(false);

<input
  type="checkbox"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>`,
    options: [
      'Use the checked prop (not value) bound to a boolean state, and read e.target.checked in onChange',
      'Use the value prop set to true or false',
      'Use the selected prop to control checkbox state',
      'Checkboxes in React always use defaultChecked and cannot be controlled',
    ],
    correctAnswer:
      'Use the checked prop (not value) bound to a boolean state, and read e.target.checked in onChange',
    explanation:
      'Checkboxes use the checked prop (boolean) instead of value. The onChange handler reads e.target.checked to get the new boolean state. This makes checkboxes controlled components in React.',
  },
  {
    id: 'react-q104',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'How do you handle multiple form fields without creating separate state for each?',
    codeSnippet: `const [form, setForm] = useState({ name: '', email: '', age: '' });

const handleChange = (e) => {
  const { name, value } = e.target;
  setForm(prev => ({ ...prev, [name]: value }));
};

return (
  <form>
    <input name="name" value={form.name} onChange={handleChange} />
    <input name="email" value={form.email} onChange={handleChange} />
    <input name="age" value={form.age} onChange={handleChange} />
  </form>
);`,
    options: [
      'Use a single state object and a shared onChange handler that uses the input name attribute as the key with computed property names',
      'Create a separate useState call for every form field',
      'Use useReducer which is required for multiple fields',
      'Store form data in a ref object since state cannot hold objects',
    ],
    correctAnswer:
      'Use a single state object and a shared onChange handler that uses the input name attribute as the key with computed property names',
    explanation:
      'A single state object with a generic onChange handler using computed property names ([name]: value) reduces boilerplate. Each input needs a name attribute matching its state key. Spread the previous state to preserve other fields.',
  },
  {
    id: 'react-q105',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'hard',
    question: 'How do you handle file uploads in React?',
    codeSnippet: `function FileUploader() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>Upload</button>
    </div>
  );
}`,
    options: [
      'Use an onChange handler to capture the File object, then create a FormData instance and send it via fetch with the file appended',
      'Use a controlled input with value to manage the file path',
      'Read the file contents with innerHTML and send as JSON',
      'File uploads require a full page form submission; they cannot be done with JavaScript in React',
    ],
    correctAnswer:
      'Use an onChange handler to capture the File object, then create a FormData instance and send it via fetch with the file appended',
    explanation:
      'File uploads in React use the onChange event to capture the File object from e.target.files. Create a FormData object, append the file, and send it via fetch. Do not set Content-Type; the browser sets multipart/form-data automatically.',
  },
  {
    id: 'react-q106',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'What is the issue with using contentEditable in React?',
    codeSnippet: `<div
  contentEditable
  suppressContentEditableWarning
  onInput={(e) => setText(e.currentTarget.textContent)}
>
  Editable content
</div>`,
    options: [
      'React warns because contentEditable creates an uncontrolled DOM mutation that conflicts with React virtual DOM management',
      'contentEditable is not supported in any modern browser',
      'contentEditable causes memory leaks in React',
      'contentEditable only works in class components',
    ],
    correctAnswer:
      'React warns because contentEditable creates an uncontrolled DOM mutation that conflicts with React virtual DOM management',
    explanation:
      'contentEditable lets the browser modify DOM content directly, bypassing React. React shows a warning because it cannot reconcile these changes. Use suppressContentEditableWarning to silence it, but be careful with state synchronization.',
  },
  {
    id: 'react-q107',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'easy',
    question: 'How do you handle a textarea in React?',
    codeSnippet: `const [bio, setBio] = useState('');

<textarea
  value={bio}
  onChange={(e) => setBio(e.target.value)}
/>`,
    options: [
      'Use the value prop and onChange handler, just like a text input; do not place text content between the tags',
      'Place the default text between the opening and closing textarea tags',
      'Use the innerHTML prop to set textarea content',
      'Textareas cannot be controlled components in React',
    ],
    correctAnswer:
      'Use the value prop and onChange handler, just like a text input; do not place text content between the tags',
    explanation:
      'In React, textarea uses the value prop for its content (like input), not children between tags as in HTML. It follows the same controlled pattern: value bound to state plus an onChange handler.',
  },
  {
    id: 'react-q108',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'How do you implement input masking (e.g., phone number formatting) in React?',
    codeSnippet: `function PhoneInput() {
  const [phone, setPhone] = useState('');

  const formatPhone = (value) => {
    const digits = value.replace(/\\D/g, '').slice(0, 10);
    if (digits.length >= 6)
      return \`(\${digits.slice(0,3)}) \${digits.slice(3,6)}-\${digits.slice(6)}\`;
    if (digits.length >= 3)
      return \`(\${digits.slice(0,3)}) \${digits.slice(3)}\`;
    return digits;
  };

  return (
    <input
      value={phone}
      onChange={(e) => setPhone(formatPhone(e.target.value))}
    />
  );
}`,
    options: [
      'Use a controlled input with an onChange handler that strips and reformats the value before setting state',
      'Use the pattern attribute to enforce the mask at the browser level',
      'Use CSS to visually mask the input without changing the value',
      'Input masking requires a native HTML input type that is not available',
    ],
    correctAnswer:
      'Use a controlled input with an onChange handler that strips and reformats the value before setting state',
    explanation:
      'Input masking in React uses controlled inputs where the onChange handler processes the raw input (strips non-digits, formats) and sets the formatted value as state. The input always displays the formatted value.',
  },
  {
    id: 'react-q109',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'hard',
    question: 'What are the trade-offs between React Hook Form, Formik, and custom form handling?',
    options: [
      'React Hook Form has the best performance (uncontrolled inputs), Formik has the most mature ecosystem (controlled inputs), and custom handling gives full control but requires more boilerplate',
      'All three approaches have identical performance and features',
      'Custom handling is always the best approach for production applications',
      'Formik is the only option that supports TypeScript',
    ],
    correctAnswer:
      'React Hook Form has the best performance (uncontrolled inputs), Formik has the most mature ecosystem (controlled inputs), and custom handling gives full control but requires more boilerplate',
    explanation:
      'React Hook Form uses uncontrolled inputs for fewer re-renders. Formik uses controlled inputs with a comprehensive API and large ecosystem. Custom handling avoids dependencies but requires manually implementing validation, error tracking, and submission.',
  },
  {
    id: 'react-q110',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'easy',
    question: 'What is the difference between value and defaultValue on an input in React?',
    options: [
      'value makes the input controlled (React manages it), defaultValue sets only the initial value and lets the DOM manage subsequent changes (uncontrolled)',
      'value is for text inputs, defaultValue is for number inputs',
      'defaultValue overrides value when both are set',
      'There is no difference; they are aliases',
    ],
    correctAnswer:
      'value makes the input controlled (React manages it), defaultValue sets only the initial value and lets the DOM manage subsequent changes (uncontrolled)',
    explanation:
      'Setting value makes React the source of truth (controlled). Setting defaultValue only provides an initial value; the DOM handles changes (uncontrolled). Using both simultaneously will cause a warning.',
  },
  {
    id: 'react-q111',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'How do you validate a form on submit versus on field change?',
    codeSnippet: `// On submit validation
const handleSubmit = (e) => {
  e.preventDefault();
  const errors = validateAll(formData);
  if (Object.keys(errors).length === 0) submitForm(formData);
  else setErrors(errors);
};

// On change validation
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
};`,
    options: [
      'On-submit validation checks all fields when the user submits; on-change validation checks each field as the user types, providing immediate feedback',
      'On-submit validation is always better because it reduces re-renders',
      'On-change validation is impossible with controlled inputs',
      'React only supports on-submit validation natively',
    ],
    correctAnswer:
      'On-submit validation checks all fields when the user submits; on-change validation checks each field as the user types, providing immediate feedback',
    explanation:
      'Submit validation validates all fields at once on submission. Change validation gives instant feedback per field. A hybrid approach validates on blur (first interaction) then on change (subsequent edits) for the best user experience.',
  },
  {
    id: 'react-q112',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'hard',
    question: 'How do you handle multi-step (wizard) forms in React?',
    codeSnippet: `function WizardForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const updateFields = (fields) =>
    setFormData(prev => ({ ...prev, ...fields }));

  switch (step) {
    case 1: return <PersonalInfo data={formData} onUpdate={updateFields}
                     onNext={() => setStep(2)} />;
    case 2: return <Address data={formData} onUpdate={updateFields}
                     onBack={() => setStep(1)} onNext={() => setStep(3)} />;
    case 3: return <Review data={formData}
                     onBack={() => setStep(2)} onSubmit={handleSubmit} />;
  }
}`,
    options: [
      'Maintain shared form state in the parent, track the current step, and render step-specific components that update the shared state and navigate between steps',
      'Create separate forms for each step and merge data on the server',
      'Use browser sessionStorage to pass data between form steps',
      'Multi-step forms require a state management library like Redux',
    ],
    correctAnswer:
      'Maintain shared form state in the parent, track the current step, and render step-specific components that update the shared state and navigate between steps',
    explanation:
      'Multi-step forms lift all form state to a parent component. Each step receives current data and an update function. Step navigation is controlled by state. Validate per-step before advancing and review all data before final submission.',
  },

  // ============================================================================
  // React 19 & Modern Features (q113-q122)
  // ============================================================================
  {
    id: 'react-q113',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'What is the purpose of the `use()` hook in React 19?',
    codeSnippet: `function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);
  return comments.map(c => <p key={c.id}>{c.text}</p>);
}`,
    options: [
      'It unwraps promises and context values, enabling reading resources during render with Suspense integration',
      'It replaces useEffect for all side effects',
      'It creates a new state variable from any value',
      'It is an alias for useState',
    ],
    correctAnswer:
      'It unwraps promises and context values, enabling reading resources during render with Suspense integration',
    explanation:
      'The use() hook in React 19 can read promises (suspending until resolved) and context values. Unlike other hooks, it can be called conditionally. It integrates with Suspense for loading states.',
  },
  {
    id: 'react-q114',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'hard',
    question: 'What does useActionState (formerly useFormState) do in React 19?',
    codeSnippet: `async function submitForm(prevState, formData) {
  const result = await saveToServer(formData);
  return { success: true, data: result };
}

function Form() {
  const [state, formAction, isPending] = useActionState(submitForm, null);
  return <form action={formAction}>...</form>;
}`,
    options: [
      'It manages form state with server actions, providing previous state, a form action, and pending status',
      'It validates form fields automatically',
      'It stores form data in localStorage',
      'It replaces controlled inputs with uncontrolled ones',
    ],
    correctAnswer:
      'It manages form state with server actions, providing previous state, a form action, and pending status',
    explanation:
      'useActionState connects a form to a server action. It returns the current state (from the action return value), a form action to pass to <form action={}>, and isPending boolean for loading UI.',
  },
  {
    id: 'react-q115',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'What is useOptimistic used for in React 19?',
    codeSnippet: `function LikeButton({ likes, onLike }) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (current, newLike) => current + 1
  );

  async function handleLike() {
    addOptimisticLike(1);
    await onLike();
  }

  return <button onClick={handleLike}>{optimisticLikes} likes</button>;
}`,
    options: [
      'It shows an optimistic UI update immediately while an async action is in progress, reverting if it fails',
      'It optimizes component rendering performance',
      'It pre-fetches data before user interaction',
      'It caches previous state values',
    ],
    correctAnswer:
      'It shows an optimistic UI update immediately while an async action is in progress, reverting if it fails',
    explanation:
      'useOptimistic allows you to show a different state while an async action is underway. The optimistic value is shown immediately, and React automatically reverts to the actual value when the action completes or fails.',
  },
  {
    id: 'react-q116',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What is the difference between Server Components and Client Components in React?',
    options: [
      'Server Components render on the server with zero JS bundle size; Client Components hydrate on the client and can use hooks/state',
      'Server Components are faster; Client Components are slower',
      'Server Components cannot fetch data; Client Components can',
      'There is no difference; they are interchangeable',
    ],
    correctAnswer:
      'Server Components render on the server with zero JS bundle size; Client Components hydrate on the client and can use hooks/state',
    explanation:
      'Server Components (RSC) run only on the server, have no JS in the bundle, and can directly access databases/filesystems. Client Components run on both server (SSR) and client, can use useState/useEffect, and handle interactivity.',
  },
  {
    id: 'react-q117',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: "What does the 'use client' directive do?",
    codeSnippet: `'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`,
    options: [
      'It marks a component as a Client Component, enabling hooks and interactivity',
      'It makes the component render only in the browser',
      'It disables server-side rendering',
      'It enables client-side routing',
    ],
    correctAnswer: 'It marks a component as a Client Component, enabling hooks and interactivity',
    explanation:
      "'use client' at the top of a file marks it as a Client Component boundary. The component and its imports will be included in the JS bundle and can use React features like useState, useEffect, and event handlers.",
  },
  {
    id: 'react-q118',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'hard',
    question: 'How do Server Components handle data fetching differently from Client Components?',
    codeSnippet: `// Server Component - can be async!
async function UserProfile({ userId }) {
  const user = await db.users.find(userId);
  return <div>{user.name}</div>;
}`,
    options: [
      'Server Components can be async functions that await data directly without useEffect or state',
      'Server Components must use useEffect for data fetching',
      'Server Components cannot fetch data at all',
      'Server Components automatically cache all data forever',
    ],
    correctAnswer:
      'Server Components can be async functions that await data directly without useEffect or state',
    explanation:
      'Server Components can be async functions, allowing direct data fetching with await. No loading states, effects, or state management needed - the component simply renders with the data. This simplifies the data fetching pattern significantly.',
  },
  {
    id: 'react-q119',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What is React Compiler (formerly React Forget)?',
    options: [
      'An automatic optimization tool that adds memoization (useMemo, useCallback, memo) without manual code changes',
      'A tool that compiles React to native mobile apps',
      'A bundler replacement for webpack',
      'A TypeScript type checker for React',
    ],
    correctAnswer:
      'An automatic optimization tool that adds memoization (useMemo, useCallback, memo) without manual code changes',
    explanation:
      'React Compiler analyzes your code at build time and automatically inserts memoization where beneficial. It understands React semantics and can optimize without the cognitive overhead of manual useMemo/useCallback placement.',
  },
  {
    id: 'react-q120',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'What does the `ref` callback pattern provide over useRef?',
    codeSnippet: `function MeasuredBox() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return <div ref={measuredRef}>Content: {height}px tall</div>;
}`,
    options: [
      'It fires a callback when the ref is attached/detached, useful for measuring DOM nodes or triggering effects on mount',
      'It is faster than useRef',
      'It allows multiple refs on one element',
      'It prevents memory leaks automatically',
    ],
    correctAnswer:
      'It fires a callback when the ref is attached/detached, useful for measuring DOM nodes or triggering effects on mount',
    explanation:
      'Ref callbacks are called with the DOM node when attached and null when detached. Unlike useRef, this pattern lets you react to the ref being set, measure elements, or run setup/cleanup logic when a DOM node appears.',
  },
  {
    id: 'react-q121',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'What is useImperativeHandle used for?',
    codeSnippet: `const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; }
  }));

  return <input ref={inputRef} />;
});`,
    options: [
      'It customizes the instance value exposed to parent components when using forwardRef',
      'It creates imperative animations',
      'It handles form submission imperatively',
      'It replaces Redux for state management',
    ],
    correctAnswer:
      'It customizes the instance value exposed to parent components when using forwardRef',
    explanation:
      'useImperativeHandle lets you define which methods/properties the parent can access via ref. Instead of exposing the raw DOM node, you expose a custom API. Useful for component libraries needing programmatic control.',
  },
  {
    id: 'react-q122',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    question: 'What does flushSync do in React?',
    codeSnippet: `import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCount(c => c + 1);
  });
  // DOM is updated here
  console.log(document.getElementById('counter').textContent);
}`,
    options: [
      'It forces React to flush state updates synchronously, updating the DOM immediately',
      'It syncs state across multiple tabs',
      'It flushes the browser cache',
      'It synchronizes client and server state',
    ],
    correctAnswer:
      'It forces React to flush state updates synchronously, updating the DOM immediately',
    explanation:
      'flushSync forces React to process state updates and update the DOM synchronously before continuing. Normally React batches updates for performance. Use flushSync sparingly for cases needing immediate DOM measurement.',
  },

  // ============================================================================
  // Advanced Patterns & Testing (q123-q132)
  // ============================================================================
  {
    id: 'react-q123',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What is the Compound Component pattern?',
    codeSnippet: `<Select value={value} onChange={setValue}>
  <Select.Trigger>Choose an option</Select.Trigger>
  <Select.Options>
    <Select.Option value="a">Option A</Select.Option>
    <Select.Option value="b">Option B</Select.Option>
  </Select.Options>
</Select>`,
    options: [
      'A pattern where a parent component shares state with child components implicitly via Context, allowing flexible composition',
      'A pattern for combining multiple HOCs',
      'A pattern for composing CSS classes',
      'A pattern for server-side rendering',
    ],
    correctAnswer:
      'A pattern where a parent component shares state with child components implicitly via Context, allowing flexible composition',
    explanation:
      'Compound Components share implicit state through Context, letting users compose flexible UIs without prop drilling. The parent manages state while children access it via Context. Common in component libraries like Radix, Headless UI.',
  },
  {
    id: 'react-q124',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'What problem does the Render Props pattern solve?',
    codeSnippet: `<Mouse render={({ x, y }) => (
  <p>Mouse position: {x}, {y}</p>
)} />`,
    options: [
      'It allows sharing stateful logic between components by passing a function that receives the state and returns UI',
      'It improves rendering performance',
      'It prevents re-renders',
      'It replaces the need for CSS',
    ],
    correctAnswer:
      'It allows sharing stateful logic between components by passing a function that receives the state and returns UI',
    explanation:
      'Render props is a technique where a component receives a function prop that returns React elements. The component manages state/logic and passes it to the function, allowing code reuse. Custom hooks often replace this pattern now.',
  },
  {
    id: 'react-q125',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'When does React batch state updates?',
    options: [
      'React 18+ automatically batches all state updates, including those in promises, timeouts, and native event handlers',
      'React only batches updates inside onClick handlers',
      'React never batches updates',
      'React only batches updates when using Redux',
    ],
    correctAnswer:
      'React 18+ automatically batches all state updates, including those in promises, timeouts, and native event handlers',
    explanation:
      'React 18 introduced automatic batching for all updates. Multiple setState calls in any context (event handlers, promises, timeouts, etc.) are grouped into a single re-render. Previously, only React event handlers were batched.',
  },
  {
    id: 'react-q126',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'What is the stale-while-revalidate pattern in data fetching?',
    options: [
      'Show cached (stale) data immediately while fetching fresh data in the background, then update when complete',
      'Always wait for fresh data before showing anything',
      'Never cache any data',
      'Revalidate data only when the user refreshes the page',
    ],
    correctAnswer:
      'Show cached (stale) data immediately while fetching fresh data in the background, then update when complete',
    explanation:
      'SWR (stale-while-revalidate) shows cached data instantly for fast UX, then revalidates in the background. Libraries like SWR and React Query implement this pattern. It balances between freshness and perceived performance.',
  },
  {
    id: 'react-q127',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'What is event.currentTarget vs event.target?',
    codeSnippet: `<div onClick={handleClick}>
  <button>Click me</button>
</div>`,
    options: [
      'target is the element that triggered the event; currentTarget is the element the handler is attached to',
      'They are always the same element',
      'currentTarget is the parent; target is the child',
      'target is for mouse events; currentTarget is for keyboard events',
    ],
    correctAnswer:
      'target is the element that triggered the event; currentTarget is the element the handler is attached to',
    explanation:
      'event.target is the actual element clicked (could be a child). event.currentTarget is always the element with the event listener. In the example, clicking the button: target=button, currentTarget=div.',
  },
  {
    id: 'react-q128',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'easy',
    question: 'What is the difference between controlled and uncontrolled inputs?',
    options: [
      'Controlled inputs have their value managed by React state; uncontrolled inputs manage their own state via DOM',
      'Controlled inputs are faster; uncontrolled are slower',
      'Controlled inputs require TypeScript; uncontrolled do not',
      'There is no difference',
    ],
    correctAnswer:
      'Controlled inputs have their value managed by React state; uncontrolled inputs manage their own state via DOM',
    explanation:
      'Controlled: value={state} + onChange={setState}. React owns the source of truth. Uncontrolled: defaultValue + ref.current.value. The DOM owns the value. Controlled gives more control; uncontrolled is simpler for basic forms.',
  },
  {
    id: 'react-q129',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'hard',
    question: 'What causes an infinite loop in useEffect?',
    codeSnippet: `useEffect(() => {
  setData(fetchData());
}, [data]); // Infinite loop!`,
    options: [
      'The effect updates a dependency (data), causing the effect to re-run, which updates the dependency again',
      'useEffect cannot contain setState calls',
      'fetchData is called too quickly',
      'The dependency array syntax is wrong',
    ],
    correctAnswer:
      'The effect updates a dependency (data), causing the effect to re-run, which updates the dependency again',
    explanation:
      'When an effect updates state that is in its dependency array, it triggers a re-render, which re-runs the effect, updating state again, creating an infinite loop. Fix: remove from deps, use functional update, or add a condition.',
  },
  {
    id: 'react-q130',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What is the purpose of Error Boundaries?',
    codeSnippet: `class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) return <h1>Something went wrong.</h1>;
    return this.props.children;
  }
}`,
    options: [
      'They catch JavaScript errors in child components and display a fallback UI instead of crashing the whole app',
      'They handle async errors in promises',
      'They validate form input errors',
      'They catch HTTP request errors',
    ],
    correctAnswer:
      'They catch JavaScript errors in child components and display a fallback UI instead of crashing the whole app',
    explanation:
      'Error Boundaries catch errors during rendering, lifecycle methods, and constructors of child components. They log errors and show fallback UI. Note: they do NOT catch errors in event handlers, async code, or SSR.',
  },
  {
    id: 'react-q131',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'Why should you not call hooks inside loops or conditions?',
    codeSnippet: `// DON'T do this!
if (condition) {
  const [state, setState] = useState(0);
}`,
    options: [
      'React relies on hook call order to associate state with the correct hook; conditional calls break this mapping',
      'It causes memory leaks',
      'Hooks are too slow to run conditionally',
      'JavaScript does not support conditional function calls',
    ],
    correctAnswer:
      'React relies on hook call order to associate state with the correct hook; conditional calls break this mapping',
    explanation:
      'React tracks hooks by their call order, not by name. If a hook is called conditionally, the order changes between renders, causing hooks to return wrong state. Always call hooks at the top level unconditionally.',
  },
  {
    id: 'react-q132',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'What is the purpose of React.Fragment (or <>...</>)?',
    codeSnippet: `return (
  <>
    <Header />
    <Main />
    <Footer />
  </>
);`,
    options: [
      'It lets you group multiple elements without adding an extra DOM node',
      'It improves rendering performance',
      'It creates a document fragment in the DOM',
      'It is required for all JSX',
    ],
    correctAnswer: 'It lets you group multiple elements without adding an extra DOM node',
    explanation:
      'React components must return a single element. Fragment (<> or <React.Fragment>) groups children without adding a wrapper div to the DOM. Use <React.Fragment key={}> when you need keys in a list.',
  },

  // ============================================================================
  // Performance & Best Practices (q133-q142)
  // ============================================================================
  {
    id: 'react-q133',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'hard',
    question: 'What is reconciliation in React?',
    options: [
      'The algorithm React uses to diff the old and new virtual DOM trees and determine the minimum updates needed for the real DOM',
      'The process of combining multiple components',
      'The way React handles errors',
      'The method for syncing state between components',
    ],
    correctAnswer:
      'The algorithm React uses to diff the old and new virtual DOM trees and determine the minimum updates needed for the real DOM',
    explanation:
      "Reconciliation is React's diffing algorithm. It compares the new element tree with the previous one, identifies changes, and updates only the necessary DOM nodes. Keys help React identify which items changed in lists.",
  },
  {
    id: 'react-q134',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'Why should you avoid creating new objects/arrays in render for props?',
    codeSnippet: `// Causes child to re-render every time!
<Child style={{ color: 'red' }} items={[1, 2, 3]} />`,
    options: [
      'New object/array references are created each render, breaking memoization since props appear to have changed',
      'It uses too much memory',
      'React cannot serialize objects',
      'JavaScript does not support inline objects',
    ],
    correctAnswer:
      'New object/array references are created each render, breaking memoization since props appear to have changed',
    explanation:
      'Each render creates new {}/[] with different references. Even with React.memo, the shallow comparison sees different references and re-renders. Solution: useMemo, useCallback, or define constants outside the component.',
  },
  {
    id: 'react-q135',
    framework: 'react',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'How do you prevent race conditions in useEffect data fetching?',
    codeSnippet: `useEffect(() => {
  let cancelled = false;

  async function fetchData() {
    const result = await fetch(\`/api/user/\${userId}\`);
    if (!cancelled) setUser(result);
  }
  fetchData();

  return () => { cancelled = true; };
}, [userId]);`,
    options: [
      'Use a cleanup function with a cancelled flag or AbortController to ignore stale responses',
      'Always use synchronous fetch',
      'Disable concurrent requests in React',
      'Race conditions cannot happen in React',
    ],
    correctAnswer:
      'Use a cleanup function with a cancelled flag or AbortController to ignore stale responses',
    explanation:
      'If userId changes quickly, multiple fetches race. Without cleanup, a slow early request could overwrite a fast later one. The cleanup sets cancelled=true or aborts the request, so stale responses are ignored.',
  },
  {
    id: 'react-q136',
    framework: 'react',
    category: 'Common Patterns',
    difficulty: 'easy',
    question: 'What is prop drilling and how do you solve it?',
    options: [
      'Passing props through many component layers; solve with Context, state management, or component composition',
      'A security vulnerability in React',
      'A performance optimization technique',
      'Drilling holes in the virtual DOM',
    ],
    correctAnswer:
      'Passing props through many component layers; solve with Context, state management, or component composition',
    explanation:
      'Prop drilling is passing props through intermediate components that don\'t use them. Solutions: React Context for global state, state management libraries, or "composition" by passing components as children instead.',
  },
  {
    id: 'react-q137',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'What is a Portal in React?',
    codeSnippet: `createPortal(
  <Modal>Content</Modal>,
  document.getElementById('modal-root')
)`,
    options: [
      'It renders children into a DOM node outside the parent component hierarchy while preserving React context and event bubbling',
      'It creates a link between two components',
      'It teleports users to another page',
      'It is used for server-side rendering',
    ],
    correctAnswer:
      'It renders children into a DOM node outside the parent component hierarchy while preserving React context and event bubbling',
    explanation:
      'Portals render children to a different DOM node (like document.body) while maintaining React tree position. Events still bubble through the React tree, not DOM tree. Useful for modals, tooltips, and dropdowns.',
  },
  {
    id: 'react-q138',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'What is the difference between useLayoutEffect and useEffect?',
    options: [
      'useLayoutEffect fires synchronously after DOM mutations but before paint; useEffect fires after paint',
      'useLayoutEffect is for CSS; useEffect is for JavaScript',
      'useLayoutEffect is faster',
      'There is no difference',
    ],
    correctAnswer:
      'useLayoutEffect fires synchronously after DOM mutations but before paint; useEffect fires after paint',
    explanation:
      'useLayoutEffect blocks the browser from painting until complete - use for DOM measurements or mutations that must happen before the user sees anything. useEffect runs after paint asynchronously - use for most effects to avoid blocking.',
  },
  {
    id: 'react-q139',
    framework: 'react',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'How do you handle file uploads in React?',
    codeSnippet: `function FileUpload() {
  const handleChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    uploadFile(formData);
  };

  return <input type="file" onChange={handleChange} />;
}`,
    options: [
      'Use an uncontrolled input with onChange, access files via e.target.files, and upload with FormData',
      'File uploads require a special React library',
      'Use useState to store the file bytes',
      'React cannot handle file uploads',
    ],
    correctAnswer:
      'Use an uncontrolled input with onChange, access files via e.target.files, and upload with FormData',
    explanation:
      'File inputs are typically uncontrolled (no value prop). Access selected files via e.target.files, create FormData for the upload payload, and send via fetch/axios. For multiple files, iterate over the FileList.',
  },
  {
    id: 'react-q140',
    framework: 'react',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What is code splitting in React and how do you implement it?',
    codeSnippet: `const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyComponent />
    </Suspense>
  );
}`,
    options: [
      'Breaking the bundle into smaller chunks loaded on demand using React.lazy and dynamic imports with Suspense fallback',
      'Splitting code between server and client',
      'Dividing code into multiple files manually',
      'Using multiple React versions',
    ],
    correctAnswer:
      'Breaking the bundle into smaller chunks loaded on demand using React.lazy and dynamic imports with Suspense fallback',
    explanation:
      'Code splitting reduces initial bundle size. React.lazy() takes a dynamic import and returns a lazy component. Suspense shows a fallback while loading. Split at route level or for heavy components not needed immediately.',
  },
  {
    id: 'react-q141',
    framework: 'react',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    question: 'What is the functional update form of setState?',
    codeSnippet: `// Instead of: setCount(count + 1)
setCount(prevCount => prevCount + 1);`,
    options: [
      'Passing a function that receives the previous state and returns the new state, ensuring updates based on the latest value',
      'A faster version of setState',
      'A way to update state asynchronously',
      'A method to batch multiple updates',
    ],
    correctAnswer:
      'Passing a function that receives the previous state and returns the new state, ensuring updates based on the latest value',
    explanation:
      'The functional form ensures you always work with the latest state, avoiding stale closure issues. Essential when multiple updates happen before re-render, or when updating in intervals/callbacks.',
  },
  {
    id: 'react-q142',
    framework: 'react',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'What is the difference between onChange in React vs vanilla HTML?',
    options: [
      'React onChange fires on every keystroke; HTML onchange fires on blur (when focus is lost)',
      'There is no difference',
      'React onChange only works with forms',
      'HTML onchange is faster',
    ],
    correctAnswer:
      'React onChange fires on every keystroke; HTML onchange fires on blur (when focus is lost)',
    explanation:
      "React's onChange behaves like the HTML oninput event, firing for every change. HTML's native onchange only fires when the field loses focus. React chose this behavior for easier controlled input implementation.",
  },
];
