import type { CheatsheetData } from '../types';

export const reactCheatsheet: CheatsheetData = {
  framework: 'react',
  title: 'React Cheatsheet',
  lastUpdated: '2025-01',
  sections: [
    {
      id: 'overview',
      icon: '📋',
      title: 'Overview',
      description: 'What React is and how it works',
      content: [
        {
          type: 'text',
          content:
            'A declarative, component-based JavaScript library for building user interfaces. Created by Meta. Uses virtual DOM for efficient updates and JSX for describing UI structure.',
        },
        {
          type: 'list',
          style: 'bullet',
          items: [
            'Virtual DOM diffing for efficient updates',
            'Component-based architecture with unidirectional data flow',
            'JSX syntax combining HTML-like markup with JavaScript',
            'Rich ecosystem with hooks for state and side effects',
            'Server-side rendering support via frameworks like Next.js',
          ],
        },
        {
          type: 'tip',
          content:
            'React is a library, not a framework. It handles the view layer and pairs with other tools for routing, state management, and data fetching.',
        },
      ],
    },
    {
      id: 'core-concepts',
      icon: '🧠',
      title: 'Core Concepts',
      description: 'Components, props, state, and JSX',
      content: [
        {
          type: 'subheading',
          text: 'Components & JSX',
        },
        {
          type: 'text',
          content:
            'React components are JavaScript functions that return JSX. Props flow down from parent to child (unidirectional). State is local data managed within a component.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Function Component with Props',
          code: `function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}`,
        },
        {
          type: 'subheading',
          text: 'State Management',
        },
        {
          type: 'text',
          content:
            'useState returns a [value, setter] pair. State updates trigger re-renders. State is immutable — always use the setter.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'State with useState',
          code: `function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicks: {count}
    </button>
  );
}`,
        },
        {
          type: 'subheading',
          text: 'Conditional Rendering & Lists',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Conditional Rendering & Lists',
          code: `function UserList({ users, isLoading }) {
  if (isLoading) return <Spinner />;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
        },
        {
          type: 'warning',
          content:
            'Always provide a stable `key` prop when rendering lists. Using array index as key causes bugs when items are reordered or removed.',
        },
      ],
    },
    {
      id: 'key-apis',
      icon: '🔑',
      title: 'Key APIs & Hooks',
      description: 'Essential hooks and APIs',
      content: [
        {
          type: 'table',
          headers: ['Hook', 'Purpose', 'Example'],
          rows: [
            ['useState', 'Local component state', 'const [val, setVal] = useState(initial)'],
            [
              'useEffect',
              'Side effects (fetch, subscriptions, DOM)',
              'useEffect(() => { ... }, [deps])',
            ],
            ['useRef', 'Mutable ref that persists across renders', 'const ref = useRef(null)'],
            [
              'useMemo',
              'Memoize expensive computations',
              'const val = useMemo(() => compute(a), [a])',
            ],
            [
              'useCallback',
              'Memoize callback functions',
              'const fn = useCallback(() => {}, [deps])',
            ],
            [
              'useReducer',
              'Complex state logic',
              'const [state, dispatch] = useReducer(reducer, init)',
            ],
            [
              'useContext',
              'Consume context without nesting',
              'const value = useContext(MyContext)',
            ],
          ],
        },
        {
          type: 'subheading',
          text: 'useEffect Patterns',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Common useEffect Patterns',
          code: `// Run once on mount
useEffect(() => {
  fetchData();
}, []);

// Run when dependency changes
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);

// Cleanup on unmount
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);`,
        },
        {
          type: 'tip',
          content:
            'useEffect with an empty dependency array `[]` runs once on mount. Omitting the array runs on every render — usually a bug.',
        },
      ],
    },
    {
      id: 'common-patterns',
      icon: '🔄',
      title: 'Common Patterns',
      description: 'Widely-used React patterns',
      content: [
        {
          type: 'subheading',
          text: 'Custom Hooks',
        },
        {
          type: 'text',
          content:
            'Extract reusable stateful logic into custom hooks. They must start with `use` and can call other hooks.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Custom Hook — useLocalStorage',
          code: `function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}`,
        },
        {
          type: 'subheading',
          text: 'Controlled Forms',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Controlled Form Input',
          code: `function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
}`,
        },
        {
          type: 'subheading',
          text: 'Error Boundaries',
        },
        {
          type: 'text',
          content:
            "Class components that catch JavaScript errors in their child tree. There's no hook equivalent yet.",
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Error Boundary Pattern',
          code: `class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
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
          title: 'Counter with useState',
          description: 'A simple counter demonstrating state management with useState.',
          defaultCode: `function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}`,
        },
        {
          type: 'interactive-code',
          language: 'javascript',
          title: 'useEffect with Cleanup',
          description: 'Demonstrates setting up and cleaning up a timer with useEffect.',
          defaultCode: `function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div>
      <p>Elapsed: {seconds}s</p>
      <button onClick={() => setRunning(!running)}>
        {running ? 'Stop' : 'Start'}
      </button>
    </div>
  );
}`,
        },
        {
          type: 'interactive-code',
          language: 'javascript',
          title: 'Custom Hook — useFetch',
          description: 'A reusable data-fetching hook with loading and error states.',
          defaultCode: `function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}`,
        },
      ],
    },
    {
      id: 'ecosystem',
      icon: '🌐',
      title: 'Ecosystem & Tools',
      description: 'Popular libraries and tools in the React ecosystem',
      content: [
        {
          type: 'table',
          headers: ['Tool', 'Category', 'Description'],
          rows: [
            [
              'Next.js',
              'Framework',
              'Full-stack React framework with SSR, routing, and API routes',
            ],
            [
              'Remix',
              'Framework',
              'Full-stack framework focused on web standards and nested routing',
            ],
            [
              'Zustand',
              'State Management',
              'Lightweight state management with minimal boilerplate',
            ],
            ['Redux Toolkit', 'State Management', 'Official Redux toolset with simplified APIs'],
            ['TanStack Query', 'Data Fetching', 'Powerful async state management for server data'],
            ['React Router', 'Routing', 'Declarative client-side routing for React'],
            ['Tailwind CSS', 'Styling', 'Utility-first CSS framework commonly used with React'],
            ['Vitest', 'Testing', 'Fast Vite-native test runner with React Testing Library'],
          ],
        },
        {
          type: 'tip',
          content:
            'For new projects, consider starting with Next.js or Remix — they provide routing, SSR, and best practices out of the box.',
        },
      ],
    },
  ],
};
