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
];
