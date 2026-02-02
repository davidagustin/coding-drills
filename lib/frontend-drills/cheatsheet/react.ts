import type { CheatsheetData } from '../types';

export const reactCheatsheet: CheatsheetData = {
  framework: 'react',
  title: 'React Cheatsheet',
  lastUpdated: '2026-02',
  sections: [
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 1 — OVERVIEW
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: 'overview',
      icon: '📋',
      title: 'Overview',
      description: 'What React is, how it thinks, and when to reach for it',
      content: [
        {
          type: 'text',
          content:
            'React is a declarative, component-based JavaScript library for building user interfaces. Created at Meta (formerly Facebook) in 2013, it has become the most widely adopted UI library in the JavaScript ecosystem. React focuses exclusively on the view layer, giving you the freedom to pair it with any backend, router, or state manager.',
        },
        {
          type: 'subheading',
          text: "React's Core Philosophy",
        },
        {
          type: 'list',
          style: 'bullet',
          items: [
            'Declarative: Describe WHAT your UI should look like for a given state, not HOW to update it. React handles the DOM mutations.',
            'Component-Based: Build encapsulated components that manage their own state, then compose them into complex UIs.',
            'Learn Once, Write Anywhere: The same mental model works for web (ReactDOM), mobile (React Native), desktop (Electron), VR (React 360), and terminal UIs (Ink).',
            'Unidirectional Data Flow: Data flows down through props, events flow up through callbacks. This makes data flow predictable and debuggable.',
          ],
        },
        {
          type: 'subheading',
          text: "React's Mental Model",
        },
        {
          type: 'text',
          content:
            'The fundamental equation of React is UI = f(state). Your component is a pure function of its props and state. When state changes, React calls your function again, gets a new description of the UI (a virtual DOM tree), diffs it against the previous one, and applies the minimal set of DOM mutations needed. This process is called reconciliation.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'The Mental Model in Code',
          code: "// React's core idea: your component is a function\n// that transforms data into UI\nfunction UserProfile({ user }) {\n  // State changes -> React re-calls this function\n  // -> new JSX returned -> diff with previous -> update DOM\n  return (\n    <div>\n      <h1>{user.name}</h1>\n      <p>{user.email}</p>\n    </div>\n  );\n}",
        },
        {
          type: 'subheading',
          text: 'How Reconciliation Works',
        },
        {
          type: 'text',
          content:
            'When state or props change, React creates a new virtual DOM tree and compares it with the previous one. It uses a heuristic O(n) diffing algorithm based on two assumptions: (1) elements of different types produce different trees, and (2) the developer can hint at which child elements are stable across renders with a key prop. React then applies only the minimal set of real DOM mutations needed.',
        },
        {
          type: 'list',
          style: 'numbered',
          items: [
            'Trigger: A state update is scheduled (setState, dispatch, etc.)',
            'Render: React calls your component function to get the new JSX tree',
            'Reconcile: React diffs the new tree against the previous one, identifying what changed',
            'Commit: React applies the minimal set of DOM mutations to make the real DOM match the new tree',
            'Effects: After the DOM is updated, useEffect callbacks run asynchronously',
          ],
        },
        {
          type: 'subheading',
          text: 'When to Use React',
        },
        {
          type: 'list',
          style: 'bullet',
          items: [
            'Interactive UIs with frequent state changes (dashboards, feeds, editors)',
            'Single-page applications (SPAs) with client-side routing',
            'Full-stack apps via frameworks (Next.js, Remix) with server-side rendering',
            'Mobile apps via React Native with a shared codebase',
            'Projects where a large hiring pool and ecosystem matter',
            'Applications requiring complex component hierarchies and shared logic via hooks',
          ],
        },
        {
          type: 'subheading',
          text: 'When Alternatives Might Be Better',
        },
        {
          type: 'list',
          style: 'bullet',
          items: [
            'Mostly static content with minimal interactivity: consider Astro or plain HTML/CSS',
            'Performance-critical apps with fine-grained reactivity: consider Svelte, SolidJS, or Vue',
            'Small scripts or widgets: vanilla JavaScript may be simpler',
            'Server-rendered content with sprinkles of interactivity: consider HTMX or Alpine.js',
            'Extremely bundle-size-sensitive projects: consider Preact (3KB React-compatible alternative)',
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
              'JSX',
              'Syntax extension that lets you write HTML-like markup inside JavaScript. Compiled to React.createElement() calls.',
            ],
            [
              'Virtual DOM',
              'A lightweight in-memory representation of the real DOM. React diffs old vs new to minimize real DOM updates.',
            ],
            [
              'Fiber',
              "React's internal reconciliation engine (React 16+). Enables interruptible rendering, time-slicing, and concurrent features.",
            ],
            [
              'Reconciliation',
              'The algorithm React uses to diff two virtual DOM trees and determine the minimal set of changes.',
            ],
            [
              'Hooks',
              'Functions (useState, useEffect, etc.) that let function components use state, side effects, context, and more.',
            ],
            [
              'Component',
              'A reusable piece of UI. In modern React, always a function that returns JSX.',
            ],
            [
              'Props',
              'Read-only inputs passed from a parent component to a child. Short for "properties".',
            ],
            [
              'State',
              'Mutable data managed inside a component. Changing state triggers a re-render.',
            ],
            [
              'Ref',
              'A mutable container (useRef) that persists across renders without causing re-renders. Used for DOM access and mutable values.',
            ],
            [
              'Context',
              'A mechanism for passing data through the component tree without prop drilling.',
            ],
            [
              'Suspense',
              'A component that lets you show a fallback while children are loading (lazy components, data fetching).',
            ],
            [
              'Concurrent Features',
              'Opt-in features (useTransition, useDeferredValue) that let React interrupt rendering to keep the UI responsive.',
            ],
            [
              'Server Components',
              'Components that run only on the server. They can directly access databases and filesystems, and send zero JS to the client.',
            ],
            [
              'SSR',
              'Server-Side Rendering. HTML is generated on the server for faster first paint and SEO.',
            ],
            [
              'Hydration',
              'The process where React attaches event listeners to server-rendered HTML, making it interactive on the client.',
            ],
          ],
        },
        {
          type: 'subheading',
          text: 'Version History Highlights',
        },
        {
          type: 'table',
          headers: ['Version', 'Year', 'Key Addition'],
          rows: [
            ['React 16', '2017', 'Fiber architecture, Portals, Error Boundaries, Fragment support'],
            [
              'React 16.8',
              '2019',
              'Hooks (useState, useEffect, etc.) — the biggest API change in React history',
            ],
            ['React 17', '2020', 'No new features — gradual upgrade support, new JSX transform'],
            [
              'React 18',
              '2022',
              'Concurrent rendering, automatic batching, useTransition, useDeferredValue, Suspense for SSR',
            ],
            [
              'React 19',
              '2024',
              'Actions, useFormStatus, useOptimistic, Server Components stabilized, ref as prop',
            ],
          ],
        },
        {
          type: 'subheading',
          text: 'Rules of Hooks',
        },
        {
          type: 'text',
          content:
            'Hooks are plain JavaScript functions, but they follow two strict rules that React enforces to keep state consistent across re-renders.',
        },
        {
          type: 'list',
          style: 'numbered',
          items: [
            'Only call hooks at the top level: Never call hooks inside loops, conditions, or nested functions. React relies on the ORDER of hook calls to match state slots to their hooks.',
            'Only call hooks from React functions: Call hooks from function components or custom hooks, never from regular JavaScript functions or class components.',
          ],
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Hooks Rules: Correct vs Incorrect',
          code: "// WRONG: conditional hook call\nfunction Bad({ isLoggedIn }) {\n  if (isLoggedIn) {\n    const [name, setName] = useState(''); // Hook inside condition!\n  }\n}\n\n// RIGHT: always call the hook, conditionally use the value\nfunction Good({ isLoggedIn }) {\n  const [name, setName] = useState('');\n  // Use name only when logged in\n  if (!isLoggedIn) return <LoginScreen />;\n  return <p>Hello, {name}</p>;\n}\n\n// WRONG: hook inside a loop\nfunction BadLoop({ items }) {\n  items.forEach(item => {\n    const [val, setVal] = useState(item); // Hook in loop!\n  });\n}\n\n// RIGHT: extract into a child component\nfunction GoodLoop({ items }) {\n  return items.map(item => <ItemRow key={item.id} item={item} />);\n}\nfunction ItemRow({ item }) {\n  const [val, setVal] = useState(item.value); // Each component gets its own hook\n  return <input value={val} onChange={e => setVal(e.target.value)} />;\n}",
        },
        {
          type: 'tip',
          content:
            'Install the eslint-plugin-react-hooks ESLint plugin. It enforces both rules automatically and catches hook dependency array issues. It is included by default in Create React App and Next.js.',
        },
        {
          type: 'tip',
          content:
            'React is a library, not a framework. For production apps, pair it with a framework like Next.js or Remix that handles routing, SSR, bundling, and deployment.',
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 2 — CORE CONCEPTS
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: 'core-concepts',
      icon: '🧠',
      title: 'Core Concepts',
      description: 'Components, props, state, events, rendering, and composition',
      content: [
        // ── Components & JSX ──────────────────────────────────────
        {
          type: 'subheading',
          text: 'Components & JSX',
        },
        {
          type: 'text',
          content:
            'A React component is a JavaScript function that returns JSX. JSX is syntactic sugar for React.createElement() calls. It looks like HTML but follows JavaScript rules: use className instead of class, htmlFor instead of for, and camelCase for attributes like onClick and tabIndex.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Function Component Basics',
          code: '// Basic component\nfunction Welcome() {\n  return <h1>Hello, World!</h1>;\n}\n\n// Arrow function component\nconst Goodbye = () => <h1>Goodbye!</h1>;\n\n// Component with expression in JSX\nfunction TimeDisplay() {\n  const now = new Date().toLocaleTimeString();\n  return <p>Current time: {now}</p>;\n}\n\n// Multi-line JSX must be wrapped in parentheses\nfunction Card() {\n  return (\n    <div className="card">\n      <h2>Title</h2>\n      <p>Content goes here</p>\n    </div>\n  );\n}',
        },
        {
          type: 'subheading',
          text: 'JSX Rules & Gotchas',
        },
        {
          type: 'table',
          headers: ['HTML', 'JSX Equivalent', 'Why'],
          rows: [
            ['class="..."', 'className="..."', 'class is a reserved word in JavaScript'],
            ['for="..."', 'htmlFor="..."', 'for is a reserved word in JavaScript'],
            ['onclick="..."', 'onClick={fn}', 'camelCase event handlers, pass function not string'],
            [
              'style="color: red"',
              "style={{ color: 'red' }}",
              'style takes an object, not a string',
            ],
            ['tabindex="0"', 'tabIndex={0}', 'camelCase attributes, number not string'],
            [
              '<!-- comment -->',
              '{/* comment */}',
              'JSX uses JavaScript comment syntax inside braces',
            ],
            ['<input>', '<input />', 'All tags must be closed in JSX'],
            ['<img src="...">', '<img src="..." />', 'Self-closing tags need the trailing slash'],
          ],
        },
        {
          type: 'text',
          content:
            'JSX requires a single root element. Use Fragments to avoid adding extra DOM nodes.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Fragments',
          code: "// Long syntax (required when you need a key prop)\nimport { Fragment } from 'react';\n\nfunction LongFragment() {\n  return (\n    <Fragment>\n      <h1>Title</h1>\n      <p>Paragraph</p>\n    </Fragment>\n  );\n}\n\n// Short syntax (preferred for most cases)\nfunction ShortFragment() {\n  return (\n    <>\n      <h1>Title</h1>\n      <p>Paragraph</p>\n    </>\n  );\n}\n\n// Keyed fragments (when mapping lists that return multiple elements)\nfunction Glossary({ items }) {\n  return (\n    <dl>\n      {items.map(item => (\n        <Fragment key={item.id}>\n          <dt>{item.term}</dt>\n          <dd>{item.definition}</dd>\n        </Fragment>\n      ))}\n    </dl>\n  );\n}",
        },
        {
          type: 'warning',
          content:
            'JSX expressions must return a single root element. Returning adjacent elements without a wrapper or Fragment is a syntax error. The short fragment syntax <></> cannot accept a key prop; use <Fragment key={...}> when you need keys.',
        },

        // ── Props ─────────────────────────────────────────────────
        {
          type: 'subheading',
          text: 'Props',
        },
        {
          type: 'text',
          content:
            'Props are the inputs to a component. They are read-only — a component must never modify its own props. Props flow down from parent to child (unidirectional data flow).',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Props: Destructuring, Defaults, Children, and Spread',
          code: "// Destructuring props directly with default values\nfunction Greeting({ name, age = 25, role = 'user' }) {\n  return <p>Hello, {name}! You are a {age}-year-old {role}.</p>;\n}\n\n// The children prop — whatever is between opening and closing tags\nfunction Card({ title, children }) {\n  return (\n    <div className=\"card\">\n      <h2>{title}</h2>\n      <div className=\"card-body\">{children}</div>\n    </div>\n  );\n}\n// Usage: <Card title=\"Info\"><p>Some content</p></Card>\n\n// Spread props to pass all properties to an element\nfunction Button({ children, variant = 'primary', ...rest }) {\n  return (\n    <button className={`btn btn-${variant}`} {...rest}>\n      {children}\n    </button>\n  );\n}\n// Usage: <Button onClick={fn} disabled variant=\"danger\">Delete</Button>\n\n// Render different content based on props\nfunction Alert({ type = 'info', message, onDismiss }) {\n  const colors = { info: 'blue', success: 'green', error: 'red' };\n  return (\n    <div style={{ borderLeft: `4px solid ${colors[type]}`, padding: 12 }}>\n      <p>{message}</p>\n      {onDismiss && <button onClick={onDismiss}>Dismiss</button>}\n    </div>\n  );\n}",
        },
        {
          type: 'tip',
          content:
            'Use TypeScript interfaces for props to get autocomplete and compile-time safety: interface GreetingProps { name: string; age?: number; } function Greeting({ name, age = 25 }: GreetingProps) { ... }',
        },

        // ── State ─────────────────────────────────────────────────
        {
          type: 'subheading',
          text: 'State with useState',
        },
        {
          type: 'text',
          content:
            'State is local, mutable data managed within a component. The useState hook returns a [value, setter] pair. Calling the setter schedules a re-render with the new value. State must be treated as immutable — always use the setter, never mutate directly.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'useState Patterns',
          code: "// Basic state\nconst [count, setCount] = useState(0);\n\n// Lazy initialization (expensive computation runs only on first render)\nconst [data, setData] = useState(() => expensiveComputation());\n\n// Functional update (when new state depends on previous state)\nsetCount(prev => prev + 1);\n\n// Object state — must spread to preserve other fields\nconst [form, setForm] = useState({ name: '', email: '' });\nsetForm(prev => ({ ...prev, name: 'Alice' }));\n\n// Array state — use immutable operations\nconst [items, setItems] = useState([]);\nsetItems(prev => [...prev, newItem]);           // add\nsetItems(prev => prev.filter(i => i.id !== id)); // remove\nsetItems(prev => prev.map(i =>                  // update\n  i.id === id ? { ...i, done: true } : i\n));\n\n// Multiple state variables vs single object\n// Prefer multiple useState calls for independent values:\nconst [name, setName] = useState('');\nconst [email, setEmail] = useState('');\nconst [age, setAge] = useState(0);\n// Use a single useState with an object when values change together:\nconst [position, setPosition] = useState({ x: 0, y: 0 });",
        },
        {
          type: 'warning',
          content:
            'React batches state updates within event handlers. If you call setCount three times in a row with the same value, only one re-render occurs. Use functional updates (setCount(prev => prev + 1)) when the new value depends on the previous one. Never mutate state directly (e.g., state.items.push(x)) — always create new objects/arrays.',
        },

        // ── Events ────────────────────────────────────────────────
        {
          type: 'subheading',
          text: 'Events',
        },
        {
          type: 'text',
          content:
            'React wraps native DOM events in SyntheticEvent objects for cross-browser consistency. Event handlers are camelCase (onClick, onChange, onSubmit). Events are delegated to the root — React uses a single listener, not one per element.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Event Handling Patterns',
          code: "// Inline handler\n<button onClick={() => setCount(count + 1)}>Click</button>\n\n// Named handler with event object\nfunction handleClick(e) {\n  e.preventDefault();\n  console.log('Button:', e.currentTarget);\n  console.log('Actual target:', e.target);\n}\n<button onClick={handleClick}>Click</button>\n\n// Passing arguments to handlers\n<button onClick={() => deleteItem(item.id)}>Delete</button>\n\n// Form submit event\nfunction handleSubmit(e) {\n  e.preventDefault();\n  const formData = new FormData(e.currentTarget);\n  const data = Object.fromEntries(formData);\n  console.log(data);\n}\n<form onSubmit={handleSubmit}>...</form>\n\n// Input change event\nfunction handleChange(e) {\n  setQuery(e.target.value);\n}\n<input type=\"text\" onChange={handleChange} />\n\n// Keyboard events\n<input onKeyDown={(e) => {\n  if (e.key === 'Enter' && !e.shiftKey) {\n    e.preventDefault();\n    handleSubmit();\n  }\n}} />\n\n// Mouse events\n<div\n  onMouseEnter={() => setHovered(true)}\n  onMouseLeave={() => setHovered(false)}\n/>",
        },
        {
          type: 'tip',
          content:
            'Common event types: onClick, onChange, onSubmit, onKeyDown, onKeyUp, onFocus, onBlur, onMouseEnter, onMouseLeave, onScroll, onDragStart, onDrop. All use SyntheticEvent which pools and recycles event objects for performance.',
        },

        // ── Conditional Rendering ─────────────────────────────────
        {
          type: 'subheading',
          text: 'Conditional Rendering',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'All Conditional Rendering Patterns',
          code: "// 1. Early return (guard clause)\nfunction Dashboard({ user }) {\n  if (!user) return <LoginPrompt />;\n  return <UserDashboard user={user} />;\n}\n\n// 2. Ternary operator (inline either/or)\nfunction Status({ isOnline }) {\n  return <span>{isOnline ? 'Online' : 'Offline'}</span>;\n}\n\n// 3. Logical AND (show or nothing)\nfunction Notification({ count }) {\n  return (\n    <div>\n      {count > 0 && <Badge count={count} />}\n    </div>\n  );\n}\n\n// 4. Switch / object lookup for multiple conditions\nfunction StatusIcon({ status }) {\n  const icons = {\n    success: <CheckIcon />,\n    error: <XIcon />,\n    loading: <Spinner />,\n    idle: <ClockIcon />,\n  };\n  return icons[status] ?? <DefaultIcon />;\n}\n\n// 5. IIFE for complex logic inline\nfunction ComplexStatus({ data }) {\n  return (\n    <div>\n      {(() => {\n        if (data.loading) return <Spinner />;\n        if (data.error) return <ErrorMessage error={data.error} />;\n        if (data.items.length === 0) return <EmptyState />;\n        return <ItemList items={data.items} />;\n      })()}\n    </div>\n  );\n}",
        },
        {
          type: 'warning',
          content:
            'Beware of {count && <Badge />} when count is 0. JavaScript renders 0 as visible text because 0 is falsy but not null/undefined. Use {count > 0 && <Badge />} or {!!count && <Badge />} instead.',
        },

        // ── Lists & Keys ──────────────────────────────────────────
        {
          type: 'subheading',
          text: 'Lists & Keys',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Rendering Lists',
          code: "// Basic list rendering\nfunction UserList({ users }) {\n  return (\n    <ul>\n      {users.map(user => (\n        <li key={user.id}>{user.name}</li>\n      ))}\n    </ul>\n  );\n}\n\n// Nested lists\nfunction CategoryList({ categories }) {\n  return categories.map(cat => (\n    <section key={cat.id}>\n      <h2>{cat.name}</h2>\n      <ul>\n        {cat.items.map(item => (\n          <li key={item.id}>{item.label}</li>\n        ))}\n      </ul>\n    </section>\n  ));\n}\n\n// Filtering + mapping\nfunction ActiveUsers({ users }) {\n  return (\n    <ul>\n      {users\n        .filter(u => u.isActive)\n        .map(u => <li key={u.id}>{u.name}</li>)}\n    </ul>\n  );\n}\n\n// Extracting list items into components\nfunction TodoItem({ todo, onToggle }) {\n  return (\n    <li onClick={() => onToggle(todo.id)}\n        style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>\n      {todo.text}\n    </li>\n  );\n}\n\nfunction TodoList({ todos, onToggle }) {\n  return (\n    <ul>\n      {todos.map(todo => (\n        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />\n      ))}\n    </ul>\n  );\n}",
        },
        {
          type: 'warning',
          content:
            'Always use a stable, unique key (like a database ID or UUID). Using array index as key causes bugs when items are reordered, removed, or inserted. React uses keys to match old and new elements — wrong keys lead to incorrect state preservation and DOM recycling.',
        },

        // ── Component Composition ─────────────────────────────────
        {
          type: 'subheading',
          text: 'Component Composition',
        },
        {
          type: 'text',
          content:
            'Composition is the primary way to reuse code in React. Prefer composition over inheritance. Use children for generic wrappers, named props for slot-like patterns, and compound components for complex coordinated UI.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Composition Patterns',
          code: '// 1. Children pattern — generic wrapper\nfunction Panel({ title, children }) {\n  return (\n    <div className="panel">\n      <h3>{title}</h3>\n      <div className="panel-body">{children}</div>\n    </div>\n  );\n}\n\n// 2. Slots pattern — named props for multiple insertion points\nfunction Layout({ header, sidebar, children }) {\n  return (\n    <div className="layout">\n      <header>{header}</header>\n      <aside>{sidebar}</aside>\n      <main>{children}</main>\n    </div>\n  );\n}\n// Usage:\n// <Layout header={<NavBar />} sidebar={<Menu />}>\n//   <Content />\n// </Layout>\n\n// 3. Specialization — one component configures another\nfunction Dialog({ title, message, children }) {\n  return (\n    <div className="dialog">\n      <h2>{title}</h2>\n      <p>{message}</p>\n      {children}\n    </div>\n  );\n}\n\nfunction ConfirmDialog({ onConfirm, onCancel }) {\n  return (\n    <Dialog title="Are you sure?" message="This cannot be undone.">\n      <button onClick={onConfirm}>Confirm</button>\n      <button onClick={onCancel}>Cancel</button>\n    </Dialog>\n  );\n}',
        },

        // ── Refs ──────────────────────────────────────────────────
        {
          type: 'subheading',
          text: 'Refs (useRef)',
        },
        {
          type: 'text',
          content:
            'useRef returns a mutable object { current: value } that persists for the full lifetime of the component. Unlike state, mutating a ref does NOT cause a re-render. Two main uses: accessing DOM elements and storing mutable values that should not trigger re-renders.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'useRef for DOM Access and Mutable Values',
          code: '// DOM access — auto-focus an input on mount\nfunction AutoFocusInput() {\n  const inputRef = useRef(null);\n\n  useEffect(() => {\n    inputRef.current.focus();\n  }, []);\n\n  return <input ref={inputRef} placeholder="Auto-focused" />;\n}\n\n// Mutable value — tracking previous state without re-renders\nfunction usePrevious(value) {\n  const ref = useRef();\n  useEffect(() => {\n    ref.current = value;\n  });\n  return ref.current;\n}\n\n// Mutable value — interval ID that persists across renders\nfunction StopWatch() {\n  const [time, setTime] = useState(0);\n  const intervalRef = useRef(null);\n\n  const start = () => {\n    if (intervalRef.current) return; // prevent multiple intervals\n    intervalRef.current = setInterval(() => {\n      setTime(t => t + 1);\n    }, 1000);\n  };\n\n  const stop = () => {\n    clearInterval(intervalRef.current);\n    intervalRef.current = null;\n  };\n\n  const reset = () => { stop(); setTime(0); };\n\n  return (\n    <div>\n      <p>{time}s</p>\n      <button onClick={start}>Start</button>\n      <button onClick={stop}>Stop</button>\n      <button onClick={reset}>Reset</button>\n    </div>\n  );\n}\n\n// Ref callback pattern — get notified when a ref is attached\nfunction MeasuredBox() {\n  const [height, setHeight] = useState(0);\n\n  const measuredRef = (node) => {\n    if (node !== null) {\n      setHeight(node.getBoundingClientRect().height);\n    }\n  };\n\n  return (\n    <>\n      <div ref={measuredRef}>Content to measure</div>\n      <p>Height: {Math.round(height)}px</p>\n    </>\n  );\n}',
        },

        // ── Context ───────────────────────────────────────────────
        {
          type: 'subheading',
          text: 'Context',
        },
        {
          type: 'text',
          content:
            'Context provides a way to pass data through the component tree without manually threading props at every level ("prop drilling"). Use it for truly global data: theme, locale, auth user, or a feature-specific state shared across many components.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Context: createContext + Provider + useContext',
          code: "import { createContext, useContext, useState } from 'react';\n\n// 1. Create context with a default value\nconst ThemeContext = createContext('light');\n\n// 2. Provider component wraps the tree\nfunction ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('light');\n  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light');\n\n  return (\n    <ThemeContext.Provider value={{ theme, toggle }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n\n// 3. Custom hook for clean consumption (with validation)\nfunction useTheme() {\n  const context = useContext(ThemeContext);\n  if (!context) throw new Error('useTheme must be inside ThemeProvider');\n  return context;\n}\n\n// 4. Consume in any deeply nested component\nfunction Header() {\n  const { theme, toggle } = useTheme();\n  return (\n    <header className={theme}>\n      <button onClick={toggle}>Toggle Theme</button>\n    </header>\n  );\n}",
        },
        {
          type: 'tip',
          content:
            'Context re-renders ALL consumers when the value changes. For high-frequency updates (mouse position, scroll), consider a state manager like Zustand or Jotai instead. Split contexts by domain (ThemeContext, AuthContext) to limit re-render scope. Memoize the context value object with useMemo to prevent unnecessary re-renders.',
        },

        // ── TypeScript with React ─────────────────────────────────
        {
          type: 'subheading',
          text: 'TypeScript with React',
        },
        {
          type: 'text',
          content:
            'TypeScript is the standard for React projects. It provides type safety for props, state, events, and hooks, catching bugs at compile time rather than runtime.',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'TypeScript Patterns for React',
          code: "// Props interface\ninterface ButtonProps {\n  label: string;\n  variant?: 'primary' | 'secondary' | 'danger';\n  disabled?: boolean;\n  onClick: () => void;\n  children?: React.ReactNode;\n}\n\nfunction Button({ label, variant = 'primary', onClick, children }: ButtonProps) {\n  return (\n    <button className={`btn-${variant}`} onClick={onClick}>\n      {children ?? label}\n    </button>\n  );\n}\n\n// Typing useState\nconst [count, setCount] = useState<number>(0);\nconst [user, setUser] = useState<User | null>(null);\nconst [items, setItems] = useState<string[]>([]);\n\n// Typing event handlers\nfunction handleChange(e: React.ChangeEvent<HTMLInputElement>) {\n  setQuery(e.target.value);\n}\n\nfunction handleSubmit(e: React.FormEvent<HTMLFormElement>) {\n  e.preventDefault();\n}\n\nfunction handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {\n  if (e.key === 'Enter') submit();\n}\n\n// Typing useRef\nconst inputRef = useRef<HTMLInputElement>(null);\nconst divRef = useRef<HTMLDivElement>(null);\nconst countRef = useRef<number>(0); // mutable value\n\n// Typing useReducer\ntype Action =\n  | { type: 'increment' }\n  | { type: 'decrement' }\n  | { type: 'set'; payload: number };\n\nfunction reducer(state: { count: number }, action: Action) {\n  switch (action.type) {\n    case 'increment': return { count: state.count + 1 };\n    case 'decrement': return { count: state.count - 1 };\n    case 'set': return { count: action.payload };\n  }\n}\n\n// Typing context\ninterface AuthContextType {\n  user: User | null;\n  login: (token: string) => Promise<void>;\n  logout: () => void;\n}\n\nconst AuthContext = createContext<AuthContextType | null>(null);",
        },
        {
          type: 'tip',
          content:
            'Use React.ReactNode for props that accept any renderable content (strings, numbers, elements, arrays, fragments, null). Use React.ReactElement when you need specifically a JSX element. Use React.FC sparingly — typing props directly on the function parameter is preferred.',
        },

        // ── Portals ───────────────────────────────────────────────
        {
          type: 'subheading',
          text: 'Portals',
        },
        {
          type: 'text',
          content:
            'Portals let you render children into a different DOM node, outside the parent component hierarchy. Useful for modals, tooltips, and dropdowns that need to break out of overflow:hidden or z-index stacking contexts. Events still bubble up through the React tree (not the DOM tree).',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Portal for Modals',
          code: 'import { createPortal } from \'react-dom\';\n\nfunction Modal({ isOpen, onClose, title, children }) {\n  if (!isOpen) return null;\n\n  return createPortal(\n    <div className="modal-overlay" onClick={onClose}>\n      <div\n        className="modal-content"\n        role="dialog"\n        aria-modal="true"\n        aria-label={title}\n        onClick={e => e.stopPropagation()}\n      >\n        <div className="modal-header">\n          <h2>{title}</h2>\n          <button onClick={onClose} aria-label="Close">X</button>\n        </div>\n        <div className="modal-body">{children}</div>\n      </div>\n    </div>,\n    document.getElementById(\'modal-root\')\n  );\n}\n\n// Usage:\n// function App() {\n//   const [showModal, setShowModal] = useState(false);\n//   return (\n//     <>\n//       <button onClick={() => setShowModal(true)}>Open</button>\n//       <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="My Modal">\n//         <p>Modal content here</p>\n//       </Modal>\n//     </>\n//   );\n// }',
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 3 — KEY APIs & HOOKS
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: 'key-apis',
      icon: '🔑',
      title: 'Key APIs & Hooks',
      description: 'Complete reference for all built-in hooks and essential APIs',
      content: [
        {
          type: 'subheading',
          text: 'Complete Built-in Hooks Reference',
        },
        {
          type: 'table',
          headers: ['Hook', 'Purpose', 'Signature'],
          rows: [
            ['useState', 'Local component state', 'const [val, set] = useState(initialValue)'],
            [
              'useEffect',
              'Side effects after render (fetch, subscriptions, DOM)',
              'useEffect(() => { ... return cleanup; }, [deps])',
            ],
            ['useContext', 'Read context value', 'const value = useContext(MyContext)'],
            [
              'useReducer',
              'Complex state with actions (like Redux)',
              'const [state, dispatch] = useReducer(reducer, init)',
            ],
            [
              'useCallback',
              'Memoize a function reference',
              'const fn = useCallback(() => {}, [deps])',
            ],
            ['useMemo', 'Memoize a computed value', 'const val = useMemo(() => compute(a), [a])'],
            [
              'useRef',
              'Mutable ref (DOM access or persistent value)',
              'const ref = useRef(initialValue)',
            ],
            [
              'useImperativeHandle',
              'Customize ref value exposed to parent',
              'useImperativeHandle(ref, () => ({ focus }), [])',
            ],
            [
              'useLayoutEffect',
              'Like useEffect but fires synchronously after DOM mutation',
              'useLayoutEffect(() => { measureDOM(); }, [])',
            ],
            [
              'useDebugValue',
              'Display a label in React DevTools for custom hooks',
              'useDebugValue(isOnline ? "Online" : "Offline")',
            ],
            ['useId', 'Generate unique IDs for accessibility (SSR-safe)', 'const id = useId()'],
            [
              'useTransition',
              'Mark state updates as non-urgent (keeps UI responsive)',
              'const [isPending, startTransition] = useTransition()',
            ],
            [
              'useDeferredValue',
              'Defer a value to keep UI responsive during re-renders',
              'const deferred = useDeferredValue(searchTerm)',
            ],
            [
              'useSyncExternalStore',
              'Subscribe to external stores (Redux, browser APIs)',
              'const val = useSyncExternalStore(subscribe, getSnapshot)',
            ],
            [
              'useInsertionEffect',
              'For CSS-in-JS libraries to inject styles before DOM reads',
              'useInsertionEffect(() => { injectStyle(); }, [])',
            ],
          ],
        },

        // ── useEffect ─────────────────────────────────────────────
        {
          type: 'subheading',
          text: 'useEffect Patterns',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Common useEffect Patterns',
          code: "// Run once on mount (empty dependency array)\nuseEffect(() => {\n  fetchInitialData();\n}, []);\n\n// Run when a dependency changes\nuseEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);\n\n// Cleanup on unmount (timers, subscriptions, listeners)\nuseEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, []);\n\n// Cleanup + re-subscribe when dependency changes\nuseEffect(() => {\n  const ws = new WebSocket(`wss://api.example.com/${roomId}`);\n  ws.onmessage = (e) => setMessages(m => [...m, e.data]);\n  return () => ws.close();\n}, [roomId]);\n\n// Abort controller for fetch cleanup\nuseEffect(() => {\n  const controller = new AbortController();\n  fetch(url, { signal: controller.signal })\n    .then(r => r.json())\n    .then(setData)\n    .catch(e => {\n      if (e.name !== 'AbortError') setError(e);\n    });\n  return () => controller.abort();\n}, [url]);\n\n// Event listener\nuseEffect(() => {\n  const handler = (e) => setWindowWidth(window.innerWidth);\n  window.addEventListener('resize', handler);\n  return () => window.removeEventListener('resize', handler);\n}, []);",
        },
        {
          type: 'tip',
          content:
            'useEffect with an empty dependency array [] runs once on mount. Omitting the array entirely runs after EVERY render (usually a bug). In StrictMode during development, effects run twice to help detect missing cleanup.',
        },

        // ── useReducer ────────────────────────────────────────────
        {
          type: 'subheading',
          text: 'useReducer',
        },
        {
          type: 'text',
          content:
            'useReducer is an alternative to useState for complex state logic. It is especially useful when the next state depends on the previous state, when state has multiple sub-values, or when you want to centralize update logic.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'useReducer for Complex State',
          code: "function reducer(state, action) {\n  switch (action.type) {\n    case 'increment':\n      return { ...state, count: state.count + 1 };\n    case 'decrement':\n      return { ...state, count: state.count - 1 };\n    case 'reset':\n      return { ...state, count: 0 };\n    default:\n      throw new Error(`Unknown action: ${action.type}`);\n  }\n}\n\nfunction Counter() {\n  const [state, dispatch] = useReducer(reducer, { count: 0 });\n\n  return (\n    <div>\n      <p>Count: {state.count}</p>\n      <button onClick={() => dispatch({ type: 'increment' })}>+</button>\n      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>\n      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>\n    </div>\n  );\n}",
        },

        // ── useCallback & useMemo ─────────────────────────────────
        {
          type: 'subheading',
          text: 'useCallback & useMemo',
        },
        {
          type: 'text',
          content:
            'useCallback memoizes a function reference; useMemo memoizes a computed value. Both accept a dependency array. They are performance optimizations, not semantic guarantees — React may discard memoized values under memory pressure.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Memoization Hooks',
          code: "// useMemo — avoid expensive recomputation\nfunction FilteredList({ items, query }) {\n  const filtered = useMemo(\n    () => items.filter(item => item.name.includes(query)),\n    [items, query]\n  );\n  return <List items={filtered} />;\n}\n\n// useCallback — stable function reference for child components\nfunction Parent() {\n  const [count, setCount] = useState(0);\n\n  const handleClick = useCallback(() => {\n    setCount(c => c + 1);\n  }, []);\n\n  return <MemoizedChild onClick={handleClick} />;\n}\n\nconst MemoizedChild = memo(function Child({ onClick }) {\n  console.log('Child rendered');\n  return <button onClick={onClick}>Click</button>;\n});",
        },
        {
          type: 'warning',
          content:
            'Do not wrap every function in useCallback or every value in useMemo. They add complexity and memory overhead. Use them only when passing callbacks to memoized children or avoiding genuinely expensive computations. Profile first with React DevTools Profiler.',
        },

        // ── useId ─────────────────────────────────────────────────
        {
          type: 'subheading',
          text: 'useId for Accessible Forms',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'useId for SSR-Safe Unique IDs',
          code: 'function LabeledInput({ label }) {\n  const id = useId();\n  return (\n    <div>\n      <label htmlFor={id}>{label}</label>\n      <input id={id} />\n    </div>\n  );\n}\n\n// Multiple related IDs from one useId call\nfunction PasswordField() {\n  const id = useId();\n  return (\n    <div>\n      <label htmlFor={`${id}-password`}>Password</label>\n      <input id={`${id}-password`} type="password"\n             aria-describedby={`${id}-hint`} />\n      <p id={`${id}-hint`}>Must be 8+ characters</p>\n    </div>\n  );\n}',
        },

        // ── useSyncExternalStore ──────────────────────────────────
        {
          type: 'subheading',
          text: 'useSyncExternalStore',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Subscribing to Browser APIs',
          code: "// Subscribe to window.navigator.onLine\nfunction useOnlineStatus() {\n  return useSyncExternalStore(\n    // subscribe: called with a callback to notify of changes\n    (callback) => {\n      window.addEventListener('online', callback);\n      window.addEventListener('offline', callback);\n      return () => {\n        window.removeEventListener('online', callback);\n        window.removeEventListener('offline', callback);\n      };\n    },\n    // getSnapshot: returns the current value\n    () => navigator.onLine,\n    // getServerSnapshot (optional): SSR value\n    () => true\n  );\n}\n\n// Usage:\n// const isOnline = useOnlineStatus();",
        },

        // ── forwardRef & useImperativeHandle ──────────────────────
        {
          type: 'subheading',
          text: 'forwardRef & useImperativeHandle',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Exposing DOM Methods to Parent',
          code: "import { forwardRef, useRef, useImperativeHandle } from 'react';\n\nconst FancyInput = forwardRef(function FancyInput(props, ref) {\n  const inputRef = useRef(null);\n\n  // Expose only specific methods to the parent\n  useImperativeHandle(ref, () => ({\n    focus: () => inputRef.current.focus(),\n    clear: () => { inputRef.current.value = ''; },\n    scrollIntoView: () => inputRef.current.scrollIntoView({ behavior: 'smooth' }),\n  }));\n\n  return <input ref={inputRef} {...props} />;\n});\n\n// Parent can call ref.current.focus(), .clear(), .scrollIntoView()\nfunction Form() {\n  const inputRef = useRef(null);\n  return (\n    <>\n      <FancyInput ref={inputRef} placeholder=\"Fancy input\" />\n      <button onClick={() => inputRef.current.focus()}>Focus</button>\n      <button onClick={() => inputRef.current.clear()}>Clear</button>\n    </>\n  );\n}",
        },

        // ── memo() ────────────────────────────────────────────────
        {
          type: 'subheading',
          text: 'React.memo for Component Memoization',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'memo() to Skip Re-renders',
          code: "import { memo } from 'react';\n\n// Only re-renders when props change (shallow comparison)\nconst ExpensiveList = memo(function ExpensiveList({ items }) {\n  return (\n    <ul>\n      {items.map(item => (\n        <li key={item.id}>{item.name}</li>\n      ))}\n    </ul>\n  );\n});\n\n// Custom comparison function\nconst Chart = memo(\n  function Chart({ data, config }) {\n    return <canvas>{/* expensive render */}</canvas>;\n  },\n  (prevProps, nextProps) => {\n    // Return true to SKIP re-render (opposite of shouldComponentUpdate)\n    return prevProps.data === nextProps.data;\n  }\n);",
        },

        // ── lazy + Suspense ───────────────────────────────────────
        {
          type: 'subheading',
          text: 'lazy() + Suspense for Code Splitting',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Lazy Loading Components',
          code: "import { lazy, Suspense } from 'react';\n\n// Dynamic import — component is loaded only when rendered\nconst HeavyChart = lazy(() => import('./HeavyChart'));\nconst AdminPanel = lazy(() => import('./AdminPanel'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<div>Loading chart...</div>}>\n      <HeavyChart />\n    </Suspense>\n  );\n}\n\n// Multiple lazy components with a single Suspense boundary\nfunction Dashboard() {\n  return (\n    <Suspense fallback={<Skeleton />}>\n      <HeavyChart />\n      <AdminPanel />\n    </Suspense>\n  );\n}\n\n// Route-based code splitting\nconst Home = lazy(() => import('./pages/Home'));\nconst About = lazy(() => import('./pages/About'));\nconst Settings = lazy(() => import('./pages/Settings'));\n\nfunction AppRouter() {\n  return (\n    <Suspense fallback={<PageSpinner />}>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/about\" element={<About />} />\n        <Route path=\"/settings\" element={<Settings />} />\n      </Routes>\n    </Suspense>\n  );\n}",
        },

        // ── Concurrent Features ───────────────────────────────────
        {
          type: 'subheading',
          text: 'Concurrent Features: useTransition & useDeferredValue',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Keeping UI Responsive with Transitions',
          code: "import { useState, useTransition, useDeferredValue } from 'react';\n\n// useTransition — mark a state update as non-urgent\nfunction SearchPage() {\n  const [query, setQuery] = useState('');\n  const [results, setResults] = useState([]);\n  const [isPending, startTransition] = useTransition();\n\n  function handleChange(e) {\n    setQuery(e.target.value);  // urgent: update input immediately\n    startTransition(() => {\n      setResults(search(e.target.value));  // non-urgent: can be interrupted\n    });\n  }\n\n  return (\n    <div>\n      <input value={query} onChange={handleChange} />\n      {isPending && <Spinner />}\n      <ResultList items={results} />\n    </div>\n  );\n}\n\n// useDeferredValue — defer an expensive derived render\nfunction FilteredList({ query, items }) {\n  const deferredQuery = useDeferredValue(query);\n  const isStale = query !== deferredQuery;\n  const filtered = items.filter(i => i.name.includes(deferredQuery));\n\n  return (\n    <div style={{ opacity: isStale ? 0.7 : 1 }}>\n      <List items={filtered} />\n    </div>\n  );\n}",
        },

        // ── useLayoutEffect ────────────────────────────────────────
        {
          type: 'subheading',
          text: 'useLayoutEffect vs useEffect',
        },
        {
          type: 'text',
          content:
            'useLayoutEffect fires synchronously after DOM mutations but before the browser paints. Use it when you need to read DOM layout (measurements) and synchronously re-render to avoid visual flicker. For everything else, use useEffect.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'useLayoutEffect for Measurements',
          code: "// Measure DOM element before browser paints — no flicker\nfunction Tooltip({ targetRef, children }) {\n  const [coords, setCoords] = useState({ top: 0, left: 0 });\n  const tooltipRef = useRef(null);\n\n  useLayoutEffect(() => {\n    if (!targetRef.current || !tooltipRef.current) return;\n    const rect = targetRef.current.getBoundingClientRect();\n    setCoords({\n      top: rect.top - tooltipRef.current.offsetHeight - 8,\n      left: rect.left + rect.width / 2,\n    });\n  }, [targetRef]);\n\n  return (\n    <div ref={tooltipRef}\n         style={{ position: 'fixed', top: coords.top, left: coords.left }}>\n      {children}\n    </div>\n  );\n}",
        },
        {
          type: 'table',
          headers: ['Feature', 'useEffect', 'useLayoutEffect'],
          rows: [
            ['Timing', 'After paint (asynchronous)', 'Before paint (synchronous)'],
            [
              'Use case',
              'Data fetching, subscriptions, logging',
              'DOM measurements, scroll position, preventing flicker',
            ],
            ['Performance', 'Non-blocking, preferred', 'Blocks painting, use sparingly'],
            [
              'SSR behavior',
              'Runs on client only',
              'Warning on SSR (use useEffect for SSR-safe code)',
            ],
          ],
        },

        // ── Performance Optimization Checklist ────────────────────
        {
          type: 'subheading',
          text: 'Performance Optimization Guide',
        },
        {
          type: 'text',
          content:
            'React is fast by default, but complex apps can benefit from targeted optimizations. Always measure first with React DevTools Profiler before optimizing.',
        },
        {
          type: 'list',
          style: 'numbered',
          items: [
            'Identify slow renders: Use React DevTools Profiler to find components that render too often or take too long.',
            'Push state down: Move state closer to where it is used so fewer components re-render.',
            'Lift content up: Pass expensive subtrees as children to avoid re-creating them on every render.',
            'Memoize components: Wrap pure components with React.memo() to skip re-renders when props have not changed.',
            'Memoize callbacks: Use useCallback for functions passed to memoized children.',
            'Memoize computations: Use useMemo for expensive derived values (sorting, filtering large lists).',
            'Virtualize long lists: Use react-window or @tanstack/react-virtual for lists with 100+ items.',
            'Code-split routes: Use lazy() + Suspense to load page components on demand.',
            'Debounce rapid updates: Use useDebounce or useDeferredValue for search inputs and filters.',
            'Use keys correctly: Stable keys prevent unnecessary unmount/remount of list items.',
          ],
        },
        {
          type: 'warning',
          content:
            'Premature optimization makes code harder to read and maintain. Profile first. Most React performance issues come from unnecessary re-renders or rendering too many DOM nodes, not from missing useMemo/useCallback.',
        },

        // ── StrictMode ────────────────────────────────────────────
        {
          type: 'subheading',
          text: 'StrictMode',
        },
        {
          type: 'text',
          content:
            'StrictMode is a development-only component that helps find bugs early. It double-invokes render functions, effects, and reducers to surface impure code. It also warns about deprecated APIs. There is zero runtime cost in production.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'StrictMode Usage',
          code: "import { StrictMode } from 'react';\nimport { createRoot } from 'react-dom/client';\n\ncreateRoot(document.getElementById('root')).render(\n  <StrictMode>\n    <App />\n  </StrictMode>\n);",
        },
        {
          type: 'tip',
          content:
            'If your useEffect runs twice in development, that is StrictMode verifying your cleanup works correctly. This is intentional and does not happen in production. Do not disable StrictMode to "fix" this — fix your effect cleanup instead.',
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 4 — COMMON PATTERNS
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: 'common-patterns',
      icon: '🔄',
      title: 'Common Patterns',
      description: 'Widely-used patterns for hooks, forms, state, error handling, and composition',
      content: [
        // ── Custom Hooks ──────────────────────────────────────────
        {
          type: 'subheading',
          text: 'Custom Hooks',
        },
        {
          type: 'text',
          content:
            'Custom hooks extract reusable stateful logic into functions. They must start with "use" and can call other hooks. They are the primary code reuse mechanism in modern React, replacing patterns like render props and HOCs.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'useLocalStorage',
          code: "function useLocalStorage(key, initialValue) {\n  const [value, setValue] = useState(() => {\n    try {\n      const stored = localStorage.getItem(key);\n      return stored !== null ? JSON.parse(stored) : initialValue;\n    } catch {\n      return initialValue;\n    }\n  });\n\n  useEffect(() => {\n    try {\n      localStorage.setItem(key, JSON.stringify(value));\n    } catch (e) {\n      console.warn('localStorage write failed:', e);\n    }\n  }, [key, value]);\n\n  return [value, setValue];\n}\n\n// Usage: const [theme, setTheme] = useLocalStorage('theme', 'light');",
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'useFetch with AbortController',
          code: "function useFetch(url) {\n  const [data, setData] = useState(null);\n  const [error, setError] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    const controller = new AbortController();\n    setLoading(true);\n    setError(null);\n\n    fetch(url, { signal: controller.signal })\n      .then(res => {\n        if (!res.ok) throw new Error(`HTTP ${res.status}`);\n        return res.json();\n      })\n      .then(setData)\n      .catch(err => {\n        if (err.name !== 'AbortError') setError(err);\n      })\n      .finally(() => setLoading(false));\n\n    return () => controller.abort();\n  }, [url]);\n\n  return { data, error, loading };\n}",
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'useDebounce',
          code: 'function useDebounce(value, delay = 300) {\n  const [debounced, setDebounced] = useState(value);\n\n  useEffect(() => {\n    const timer = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n\n  return debounced;\n}\n\n// Usage:\n// const debouncedSearch = useDebounce(searchTerm, 500);\n// useEffect(() => { fetchResults(debouncedSearch); }, [debouncedSearch]);',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'useMediaQuery',
          code: "function useMediaQuery(query) {\n  const [matches, setMatches] = useState(\n    () => window.matchMedia(query).matches\n  );\n\n  useEffect(() => {\n    const mql = window.matchMedia(query);\n    const handler = (e) => setMatches(e.matches);\n    mql.addEventListener('change', handler);\n    return () => mql.removeEventListener('change', handler);\n  }, [query]);\n\n  return matches;\n}\n\n// Usage: const isMobile = useMediaQuery('(max-width: 768px)');\n// Usage: const prefersLight = useMediaQuery('(prefers-color-scheme: light)');",
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'useOnClickOutside',
          code: "function useOnClickOutside(ref, handler) {\n  useEffect(() => {\n    function listener(event) {\n      if (!ref.current || ref.current.contains(event.target)) return;\n      handler(event);\n    }\n    document.addEventListener('mousedown', listener);\n    document.addEventListener('touchstart', listener);\n    return () => {\n      document.removeEventListener('mousedown', listener);\n      document.removeEventListener('touchstart', listener);\n    };\n  }, [ref, handler]);\n}\n\n// Usage:\n// const menuRef = useRef(null);\n// useOnClickOutside(menuRef, () => setIsOpen(false));\n// return <div ref={menuRef}>...</div>;",
        },

        // ── Controlled vs Uncontrolled ────────────────────────────
        {
          type: 'subheading',
          text: 'Controlled vs Uncontrolled Components',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Controlled vs Uncontrolled Inputs',
          code: '// CONTROLLED — React state is the single source of truth\nfunction Controlled() {\n  const [value, setValue] = useState(\'\');\n  return (\n    <input\n      value={value}\n      onChange={(e) => setValue(e.target.value)}\n    />\n  );\n}\n\n// UNCONTROLLED — DOM holds the state, read with a ref\nfunction Uncontrolled() {\n  const inputRef = useRef(null);\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    console.log(inputRef.current.value);\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input ref={inputRef} defaultValue="initial" />\n      <button type="submit">Submit</button>\n    </form>\n  );\n}\n\n// HYBRID — uncontrolled with FormData API\nfunction FormDataForm() {\n  function handleSubmit(e) {\n    e.preventDefault();\n    const data = new FormData(e.currentTarget);\n    console.log({\n      name: data.get(\'name\'),\n      email: data.get(\'email\'),\n    });\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input name="name" defaultValue="" />\n      <input name="email" type="email" defaultValue="" />\n      <button type="submit">Submit</button>\n    </form>\n  );\n}',
        },
        {
          type: 'tip',
          content:
            'Prefer controlled components when you need to validate on every keystroke, transform input (e.g., uppercase), or conditionally disable submit. Use uncontrolled + FormData for simple forms where you only need values on submit.',
        },

        // ── Compound Components ───────────────────────────────────
        {
          type: 'subheading',
          text: 'Compound Components',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Compound Component Pattern (Accordion Example)',
          code: 'const AccordionContext = createContext(null);\n\nfunction Accordion({ children, allowMultiple = false }) {\n  const [openItems, setOpenItems] = useState(new Set());\n\n  const toggle = (id) => {\n    setOpenItems(prev => {\n      const next = new Set(allowMultiple ? prev : []);\n      if (prev.has(id)) next.delete(id);\n      else next.add(id);\n      return next;\n    });\n  };\n\n  return (\n    <AccordionContext.Provider value={{ openItems, toggle }}>\n      <div className="accordion">{children}</div>\n    </AccordionContext.Provider>\n  );\n}\n\nfunction AccordionItem({ id, title, children }) {\n  const { openItems, toggle } = useContext(AccordionContext);\n  const isOpen = openItems.has(id);\n\n  return (\n    <div>\n      <button onClick={() => toggle(id)}\n              aria-expanded={isOpen}>\n        {title} {isOpen ? \'-\' : \'+\'}\n      </button>\n      {isOpen && <div className="accordion-body">{children}</div>}\n    </div>\n  );\n}\n\n// Usage:\n// <Accordion allowMultiple>\n//   <AccordionItem id="1" title="Section 1">Content 1</AccordionItem>\n//   <AccordionItem id="2" title="Section 2">Content 2</AccordionItem>\n// </Accordion>',
        },

        // ── Render Props ──────────────────────────────────────────
        {
          type: 'subheading',
          text: 'Render Props (Legacy but Still Useful)',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Render Props Pattern',
          code: "// A component that shares mouse position via render prop\nfunction MouseTracker({ render }) {\n  const [pos, setPos] = useState({ x: 0, y: 0 });\n\n  useEffect(() => {\n    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });\n    window.addEventListener('mousemove', handler);\n    return () => window.removeEventListener('mousemove', handler);\n  }, []);\n\n  return render(pos);\n}\n\n// Usage:\n// <MouseTracker render={({ x, y }) => (\n//   <p>Mouse: {x}, {y}</p>\n// )} />\n\n// Modern alternative: custom hook (preferred)\nfunction useMousePosition() {\n  const [pos, setPos] = useState({ x: 0, y: 0 });\n  useEffect(() => {\n    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });\n    window.addEventListener('mousemove', handler);\n    return () => window.removeEventListener('mousemove', handler);\n  }, []);\n  return pos;\n}",
        },

        // ── Higher-Order Components ───────────────────────────────
        {
          type: 'subheading',
          text: 'Higher-Order Components (HOC)',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'HOC Pattern',
          code: '// An HOC that adds loading state to any component\nfunction withLoading(WrappedComponent) {\n  return function WithLoadingComponent({ isLoading, ...props }) {\n    if (isLoading) return <Spinner />;\n    return <WrappedComponent {...props} />;\n  };\n}\n\n// Usage:\nconst UserListWithLoading = withLoading(UserList);\n// <UserListWithLoading isLoading={loading} users={users} />\n\n// An HOC that injects auth context\nfunction withAuth(WrappedComponent) {\n  return function WithAuthComponent(props) {\n    const auth = useAuth();\n    if (!auth.user) return <Navigate to="/login" />;\n    return <WrappedComponent {...props} auth={auth} />;\n  };\n}',
        },
        {
          type: 'tip',
          content:
            'Render props and HOCs were the primary code reuse patterns before hooks. In new code, prefer custom hooks. But these patterns still appear in many libraries and codebases, so understanding them is valuable.',
        },

        // ── Error Boundaries ──────────────────────────────────────
        {
          type: 'subheading',
          text: 'Error Boundaries',
        },
        {
          type: 'text',
          content:
            'Error boundaries are class components that catch JavaScript errors in their child tree, log them, and display a fallback UI. There is no hook equivalent (yet). For a hook-friendly API, use the react-error-boundary package.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Error Boundary Class Component',
          code: 'class ErrorBoundary extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { hasError: false, error: null };\n  }\n\n  static getDerivedStateFromError(error) {\n    return { hasError: true, error };\n  }\n\n  componentDidCatch(error, errorInfo) {\n    console.error(\'ErrorBoundary caught:\', error, errorInfo);\n    // Send to error reporting service (Sentry, LogRocket, etc.)\n  }\n\n  render() {\n    if (this.state.hasError) {\n      return (\n        <div role="alert">\n          <h2>Something went wrong.</h2>\n          <pre>{this.state.error?.message}</pre>\n          <button onClick={() => this.setState({ hasError: false })}>\n            Try again\n          </button>\n        </div>\n      );\n    }\n    return this.props.children;\n  }\n}\n\n// Usage: Wrap sections of your app to isolate failures\n// <ErrorBoundary>\n//   <Header />\n// </ErrorBoundary>\n// <ErrorBoundary>\n//   <MainContent />\n// </ErrorBoundary>',
        },
        {
          type: 'warning',
          content:
            'Error boundaries do NOT catch errors in: event handlers (use try/catch), asynchronous code (promises, setTimeout), server-side rendering, or errors thrown in the boundary itself. They only catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.',
        },

        // ── State Machines with useReducer ────────────────────────
        {
          type: 'subheading',
          text: 'State Machines with useReducer',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Fetch State Machine',
          code: "const initialState = { status: 'idle', data: null, error: null };\n\nfunction fetchReducer(state, action) {\n  switch (action.type) {\n    case 'fetch':\n      return { ...state, status: 'loading', error: null };\n    case 'success':\n      return { status: 'success', data: action.payload, error: null };\n    case 'error':\n      return { status: 'error', data: null, error: action.payload };\n    default:\n      return state;\n  }\n}\n\nfunction useFetchMachine(url) {\n  const [state, dispatch] = useReducer(fetchReducer, initialState);\n\n  useEffect(() => {\n    const controller = new AbortController();\n    dispatch({ type: 'fetch' });\n\n    fetch(url, { signal: controller.signal })\n      .then(r => r.json())\n      .then(data => dispatch({ type: 'success', payload: data }))\n      .catch(err => {\n        if (err.name !== 'AbortError') {\n          dispatch({ type: 'error', payload: err.message });\n        }\n      });\n\n    return () => controller.abort();\n  }, [url]);\n\n  return state; // { status, data, error }\n}\n\n// Usage in component:\n// const { status, data, error } = useFetchMachine('/api/users');\n// if (status === 'loading') return <Spinner />;\n// if (status === 'error') return <Error message={error} />;\n// return <UserList users={data} />;",
        },

        // ── Context + Reducer (Mini Redux) ────────────────────────
        {
          type: 'subheading',
          text: 'Context + Reducer (Mini Redux)',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Global State with Context + useReducer',
          code: "const AppContext = createContext(null);\n\nfunction appReducer(state, action) {\n  switch (action.type) {\n    case 'ADD_TODO':\n      return {\n        ...state,\n        todos: [...state.todos, {\n          id: Date.now(),\n          text: action.payload,\n          done: false,\n        }],\n      };\n    case 'TOGGLE_TODO':\n      return {\n        ...state,\n        todos: state.todos.map(t =>\n          t.id === action.payload ? { ...t, done: !t.done } : t\n        ),\n      };\n    case 'DELETE_TODO':\n      return {\n        ...state,\n        todos: state.todos.filter(t => t.id !== action.payload),\n      };\n    default:\n      return state;\n  }\n}\n\nfunction AppProvider({ children }) {\n  const [state, dispatch] = useReducer(appReducer, { todos: [] });\n  return (\n    <AppContext.Provider value={{ state, dispatch }}>\n      {children}\n    </AppContext.Provider>\n  );\n}\n\nfunction useApp() {\n  const context = useContext(AppContext);\n  if (!context) throw new Error('useApp must be inside AppProvider');\n  return context;\n}",
        },

        // ── Optimistic Updates ────────────────────────────────────
        {
          type: 'subheading',
          text: 'Optimistic Updates Pattern',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Optimistic Update with Rollback',
          code: "function useLike(postId) {\n  const [liked, setLiked] = useState(false);\n  const [count, setCount] = useState(0);\n\n  const toggleLike = async () => {\n    // Snapshot current state for rollback\n    const prevLiked = liked;\n    const prevCount = count;\n\n    // Optimistic update (instant UI feedback)\n    setLiked(!liked);\n    setCount(c => liked ? c - 1 : c + 1);\n\n    try {\n      await fetch(`/api/posts/${postId}/like`, {\n        method: liked ? 'DELETE' : 'POST',\n      });\n    } catch {\n      // Rollback on failure\n      setLiked(prevLiked);\n      setCount(prevCount);\n    }\n  };\n\n  return { liked, count, toggleLike };\n}",
        },

        // ── Lifting vs Pushing State ──────────────────────────────
        {
          type: 'subheading',
          text: 'Lifting State Up vs Pushing State Down',
        },
        {
          type: 'text',
          content:
            'Lifting state up: When two sibling components need to share state, move it to their closest common parent and pass down via props. Pushing state down: When only one part of a component uses certain state, extract that part into its own component so re-renders are more targeted.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Lifting State Up',
          code: '// BEFORE: Two components need to share temperature\n// AFTER: Lift state to parent\nfunction TemperatureConverter() {\n  const [celsius, setCelsius] = useState(0);\n  const fahrenheit = (celsius * 9) / 5 + 32;\n\n  return (\n    <div>\n      <CelsiusInput value={celsius} onChange={setCelsius} />\n      <FahrenheitDisplay value={fahrenheit} />\n    </div>\n  );\n}\n\n// PUSHING STATE DOWN: expensive render is isolated\n// BEFORE (bad): parent re-renders everything on color change\n// AFTER (good): only ColorPicker re-renders\nfunction Page() {\n  return (\n    <div>\n      <ColorPicker />  {/* owns its own color state */}\n      <ExpensiveTree />  {/* does not re-render on color change */}\n    </div>\n  );\n}',
        },

        // ── Code Splitting ─────────────────────────────────────────
        {
          type: 'subheading',
          text: 'Code Splitting Best Practices',
        },
        {
          type: 'text',
          content:
            'Code splitting reduces your initial bundle size by loading code only when needed. Split at route boundaries and for heavy components.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Nested Suspense Boundaries',
          code: '// Each Suspense boundary can show its own fallback\n// Inner components load independently\nfunction Dashboard() {\n  return (\n    <div className="dashboard">\n      <Suspense fallback={<HeaderSkeleton />}>\n        <Header />\n      </Suspense>\n\n      <div className="main">\n        <Suspense fallback={<SidebarSkeleton />}>\n          <Sidebar />\n        </Suspense>\n\n        <Suspense fallback={<ContentSkeleton />}>\n          <MainContent />\n        </Suspense>\n      </div>\n    </div>\n  );\n}\n\n// Lazy load heavy components\nconst RichTextEditor = lazy(() => import(\'./RichTextEditor\'));\nconst ChartDashboard = lazy(() => import(\'./ChartDashboard\'));\n\n// Preload on hover (user intent)\nfunction NavLink({ to, label, componentImport }) {\n  return (\n    <a href={to}\n       onMouseEnter={() => componentImport()}\n       onFocus={() => componentImport()}>\n      {label}\n    </a>\n  );\n}\n// Usage: <NavLink to="/charts" label="Charts"\n//          componentImport={() => import(\'./ChartDashboard\')} />',
        },

        // ── Accessibility Patterns ────────────────────────────────
        {
          type: 'subheading',
          text: 'Accessibility (a11y) Patterns',
        },
        {
          type: 'text',
          content:
            'React makes it easy to build accessible UIs. Use semantic HTML, ARIA attributes, keyboard handling, and focus management.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Common Accessibility Patterns',
          code: '// Use semantic HTML elements\nfunction Nav() {\n  return (\n    <nav aria-label="Main navigation">\n      <ul role="list">\n        <li><a href="/">Home</a></li>\n        <li><a href="/about">About</a></li>\n      </ul>\n    </nav>\n  );\n}\n\n// Accessible form with labels and error messages\nfunction AccessibleInput({ label, error, id, ...props }) {\n  const errorId = error ? `${id}-error` : undefined;\n  return (\n    <div>\n      <label htmlFor={id}>{label}</label>\n      <input\n        id={id}\n        aria-invalid={!!error}\n        aria-describedby={errorId}\n        {...props}\n      />\n      {error && <p id={errorId} role="alert">{error}</p>}\n    </div>\n  );\n}\n\n// Focus management for modals\nfunction useModalFocus(isOpen) {\n  const previousFocus = useRef(null);\n\n  useEffect(() => {\n    if (isOpen) {\n      previousFocus.current = document.activeElement;\n      // Focus first focusable element in modal\n    } else if (previousFocus.current) {\n      previousFocus.current.focus(); // Return focus on close\n    }\n  }, [isOpen]);\n}\n\n// Skip-to-content link\nfunction SkipLink() {\n  return (\n    <a href="#main-content" className="skip-link">\n      Skip to main content\n    </a>\n  );\n}',
        },
        {
          type: 'tip',
          content:
            'Use the axe DevTools browser extension or eslint-plugin-jsx-a11y to automatically catch accessibility issues. Test with keyboard navigation (Tab, Enter, Escape) and screen readers (VoiceOver on Mac, NVDA on Windows).',
        },

        // ── Data Fetching Patterns ────────────────────────────────
        {
          type: 'subheading',
          text: 'Data Fetching Patterns Comparison',
        },
        {
          type: 'table',
          headers: ['Approach', 'Pros', 'Cons', 'When to Use'],
          rows: [
            [
              'useEffect + fetch',
              'No dependencies, simple to understand',
              'No caching, dedup, retries, or devtools',
              'Prototypes, one-off fetches',
            ],
            [
              'TanStack Query / SWR',
              'Caching, dedup, retries, optimistic updates',
              'Extra dependency, learning curve',
              'Most production apps',
            ],
            [
              'Framework loader (Next.js, Remix)',
              'SSR, no waterfalls, built-in caching',
              'Framework lock-in, less portable',
              'Next.js / Remix apps',
            ],
            [
              'useSyncExternalStore',
              'Subscribe to any external store',
              'Low-level, manual implementation',
              'Custom store integrations',
            ],
          ],
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 5 — INTERACTIVE CODE EXAMPLES
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: 'code-examples',
      icon: '💻',
      title: 'Interactive Examples',
      description: 'Try editing these live examples',
      content: [
        // Example 1: Counter
        {
          type: 'interactive-code',
          language: 'javascript',
          title: 'Counter with useState',
          description:
            'A simple counter demonstrating state management with useState, functional updates, and reset.',
          defaultCode:
            'function Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(c => c + 1)}>\n        Increment\n      </button>\n      <button onClick={() => setCount(c => c - 1)}>\n        Decrement\n      </button>\n      <button onClick={() => setCount(0)}>\n        Reset\n      </button>\n    </div>\n  );\n}',
        },

        // Example 2: Timer with useEffect cleanup
        {
          type: 'interactive-code',
          language: 'javascript',
          title: 'Timer with useEffect Cleanup',
          description:
            'Demonstrates setting up and cleaning up an interval with useEffect. Notice how the cleanup function runs when "running" changes or the component unmounts.',
          defaultCode:
            "function Timer() {\n  const [seconds, setSeconds] = useState(0);\n  const [running, setRunning] = useState(false);\n\n  useEffect(() => {\n    if (!running) return;\n    const id = setInterval(() => {\n      setSeconds(s => s + 1);\n    }, 1000);\n    return () => clearInterval(id);\n  }, [running]);\n\n  return (\n    <div>\n      <p>Elapsed: {seconds}s</p>\n      <button onClick={() => setRunning(!running)}>\n        {running ? 'Stop' : 'Start'}\n      </button>\n      <button onClick={() => { setRunning(false); setSeconds(0); }}>\n        Reset\n      </button>\n    </div>\n  );\n}",
        },

        // Example 3: Custom Hook useFetch
        {
          type: 'interactive-code',
          language: 'javascript',
          title: 'Custom Hook -- useFetch',
          description:
            'A reusable data-fetching hook with loading, error, and success states. Uses a cancelled flag for cleanup.',
          defaultCode:
            "function useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    let cancelled = false;\n    setLoading(true);\n    fetch(url)\n      .then(res => res.json())\n      .then(json => {\n        if (!cancelled) {\n          setData(json);\n          setLoading(false);\n        }\n      })\n      .catch(err => {\n        if (!cancelled) {\n          setError(err);\n          setLoading(false);\n        }\n      });\n    return () => { cancelled = true; };\n  }, [url]);\n\n  return { data, loading, error };\n}\n\nfunction UserProfile({ userId }) {\n  const { data, loading, error } = useFetch(\n    'https://jsonplaceholder.typicode.com/users/' + userId\n  );\n\n  if (loading) return <p>Loading...</p>;\n  if (error) return <p>Error: {error.message}</p>;\n  return <h2>{data.name}</h2>;\n}",
        },

        // Example 4: Form with Validation
        {
          type: 'interactive-code',
          language: 'javascript',
          title: 'Form with Validation',
          description:
            'Controlled form with field-level validation, real-time error clearing, and submit handling.',
          defaultCode:
            "function SignupForm() {\n  const [form, setForm] = useState({\n    email: '',\n    password: '',\n  });\n  const [errors, setErrors] = useState({});\n  const [submitted, setSubmitted] = useState(false);\n\n  function validate(values) {\n    const errs = {};\n    if (!values.email) {\n      errs.email = 'Email is required';\n    } else if (!/\\S+@\\S+\\.\\S+/.test(values.email)) {\n      errs.email = 'Email is invalid';\n    }\n    if (!values.password) {\n      errs.password = 'Password is required';\n    } else if (values.password.length < 8) {\n      errs.password = 'Password must be 8+ characters';\n    }\n    return errs;\n  }\n\n  function handleChange(e) {\n    const { name, value } = e.target;\n    setForm(prev => ({ ...prev, [name]: value }));\n    // Clear error on change\n    if (errors[name]) {\n      setErrors(prev => ({ ...prev, [name]: undefined }));\n    }\n  }\n\n  function handleSubmit(e) {\n    e.preventDefault();\n    const errs = validate(form);\n    setErrors(errs);\n    if (Object.keys(errs).length === 0) {\n      setSubmitted(true);\n    }\n  }\n\n  if (submitted) return <p>Signed up as {form.email}!</p>;\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <div>\n        <input\n          name=\"email\"\n          value={form.email}\n          onChange={handleChange}\n          placeholder=\"Email\"\n        />\n        {errors.email && (\n          <span style={{ color: 'red' }}>{errors.email}</span>\n        )}\n      </div>\n      <div>\n        <input\n          name=\"password\"\n          type=\"password\"\n          value={form.password}\n          onChange={handleChange}\n          placeholder=\"Password\"\n        />\n        {errors.password && (\n          <span style={{ color: 'red' }}>{errors.password}</span>\n        )}\n      </div>\n      <button type=\"submit\">Sign Up</button>\n    </form>\n  );\n}",
        },

        // Example 5: Todo App with useReducer
        {
          type: 'interactive-code',
          language: 'javascript',
          title: 'Todo App with useReducer',
          description:
            'A complete todo app using useReducer for state management with add, toggle, and delete actions.',
          defaultCode:
            "function todoReducer(state, action) {\n  switch (action.type) {\n    case 'ADD':\n      return [\n        ...state,\n        { id: Date.now(), text: action.text, done: false },\n      ];\n    case 'TOGGLE':\n      return state.map(t =>\n        t.id === action.id ? { ...t, done: !t.done } : t\n      );\n    case 'DELETE':\n      return state.filter(t => t.id !== action.id);\n    default:\n      return state;\n  }\n}\n\nfunction TodoApp() {\n  const [todos, dispatch] = useReducer(todoReducer, []);\n  const [text, setText] = useState('');\n\n  function handleAdd(e) {\n    e.preventDefault();\n    if (!text.trim()) return;\n    dispatch({ type: 'ADD', text });\n    setText('');\n  }\n\n  return (\n    <div>\n      <form onSubmit={handleAdd}>\n        <input\n          value={text}\n          onChange={e => setText(e.target.value)}\n          placeholder=\"Add a todo...\"\n        />\n        <button type=\"submit\">Add</button>\n      </form>\n      <ul>\n        {todos.map(todo => (\n          <li key={todo.id}>\n            <span\n              onClick={() => dispatch({ type: 'TOGGLE', id: todo.id })}\n              style={{\n                textDecoration: todo.done ? 'line-through' : 'none',\n                cursor: 'pointer',\n              }}\n            >\n              {todo.text}\n            </span>\n            <button onClick={() => dispatch({ type: 'DELETE', id: todo.id })}>\n              X\n            </button>\n          </li>\n        ))}\n      </ul>\n      <p>{todos.filter(t => !t.done).length} remaining</p>\n    </div>\n  );\n}",
        },

        // Example 6: Theme Toggle with Context
        {
          type: 'interactive-code',
          language: 'javascript',
          title: 'Theme Toggle with Context',
          description:
            'Demonstrates the Context API for sharing theme state across components without prop drilling.',
          defaultCode:
            "const ThemeContext = createContext(null);\n\nfunction ThemeProvider({ children }) {\n  const [dark, setDark] = useState(false);\n  const toggle = () => setDark(d => !d);\n  const theme = {\n    dark,\n    toggle,\n    colors: dark\n      ? { bg: '#1a1a2e', text: '#eee', accent: '#e94560' }\n      : { bg: '#ffffff', text: '#333', accent: '#0066cc' },\n  };\n  return (\n    <ThemeContext.Provider value={theme}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n\nfunction useTheme() {\n  return useContext(ThemeContext);\n}\n\nfunction ThemedCard() {\n  const { colors } = useTheme();\n  return (\n    <div style={{\n      background: colors.bg,\n      color: colors.text,\n      padding: 16,\n      borderRadius: 8,\n      marginTop: 8,\n    }}>\n      <h3 style={{ color: colors.accent }}>Themed Card</h3>\n      <p>This card responds to theme changes.</p>\n    </div>\n  );\n}\n\nfunction ThemeToggleButton() {\n  const { dark, toggle } = useTheme();\n  return (\n    <button onClick={toggle}>\n      Switch to {dark ? 'Light' : 'Dark'} Mode\n    </button>\n  );\n}\n\nfunction App() {\n  return (\n    <ThemeProvider>\n      <ThemeToggleButton />\n      <ThemedCard />\n    </ThemeProvider>\n  );\n}",
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 6 — ECOSYSTEM & TOOLS
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: 'ecosystem',
      icon: '🌐',
      title: 'Ecosystem & Tools',
      description: 'Frameworks, state managers, data fetching, UI libraries, testing, and more',
      content: [
        // ── Frameworks ────────────────────────────────────────────
        {
          type: 'subheading',
          text: 'Frameworks',
        },
        {
          type: 'table',
          headers: ['Framework', 'Best For', 'Key Features'],
          rows: [
            [
              'Next.js',
              'Full-stack web apps, SSR/SSG',
              'App Router, Server Components, API routes, ISR, middleware, image optimization',
            ],
            [
              'Remix',
              'Web-standard full-stack apps',
              'Nested routes, loader/action pattern, progressive enhancement, form handling',
            ],
            [
              'Gatsby',
              'Content-rich static sites',
              'GraphQL data layer, plugin ecosystem, image optimization, incremental builds',
            ],
            [
              'Astro',
              'Content sites with islands of React',
              'Zero JS by default, island architecture, multi-framework support, fast builds',
            ],
            [
              'Expo',
              'React Native mobile + web apps',
              'Managed workflow, OTA updates, universal modules, EAS build/submit',
            ],
          ],
        },
        {
          type: 'tip',
          content:
            'The React team recommends using a framework (Next.js, Remix, or Expo) for new projects rather than setting up React from scratch. Frameworks handle routing, bundling, SSR, and deployment out of the box.',
        },

        // ── State Management ──────────────────────────────────────
        {
          type: 'subheading',
          text: 'State Management',
        },
        {
          type: 'table',
          headers: ['Library', 'Approach', 'Best For'],
          rows: [
            [
              'Zustand',
              'Minimal store with hooks',
              'Simple global state, small-to-medium apps, when Redux is overkill',
            ],
            [
              'Jotai',
              'Atomic state (bottom-up)',
              'Fine-grained reactivity, derived state, avoiding unnecessary re-renders',
            ],
            [
              'Redux Toolkit',
              'Flux pattern with slices',
              'Large teams, complex state logic, when you need middleware and devtools',
            ],
            [
              'Recoil',
              'Atomic state (Meta)',
              'Graph-based derived state, concurrent mode compatibility',
            ],
            [
              'Valtio',
              'Mutable proxy-based state',
              'Developers who prefer mutable APIs, simple mental model',
            ],
            [
              'XState',
              'Finite state machines',
              'Complex UI flows (wizards, multi-step forms), explicit states/transitions',
            ],
          ],
        },
        {
          type: 'tip',
          content:
            'Start with useState + Context. Add Zustand or Jotai when you need shared state across many components. Reach for Redux Toolkit only when you need middleware, devtools, or have a large team that benefits from strict patterns.',
        },

        // ── Data Fetching ─────────────────────────────────────────
        {
          type: 'subheading',
          text: 'Data Fetching',
        },
        {
          type: 'table',
          headers: ['Library', 'Approach', 'Key Features'],
          rows: [
            [
              'TanStack Query',
              'Async state manager',
              'Caching, background refetch, pagination, optimistic updates, devtools, mutations',
            ],
            [
              'SWR',
              'Stale-while-revalidate',
              'Lightweight, auto-revalidation, focus tracking, SSR support',
            ],
            [
              'tRPC',
              'End-to-end type-safe RPC',
              'Full TypeScript inference from backend to frontend, no code generation needed',
            ],
            [
              'Apollo Client',
              'GraphQL client',
              'Normalized cache, subscriptions, local state, devtools, SSR support',
            ],
          ],
        },

        // ── Routing ───────────────────────────────────────────────
        {
          type: 'subheading',
          text: 'Routing',
        },
        {
          type: 'table',
          headers: ['Library', 'Approach', 'Key Features'],
          rows: [
            [
              'React Router',
              'Component-based routing',
              'Nested routes, loaders/actions, URL params, lazy routes, v7 framework mode',
            ],
            [
              'TanStack Router',
              'Type-safe file-based routing',
              'Full TypeScript inference, search params validation, built-in caching, devtools',
            ],
          ],
        },

        // ── Forms ─────────────────────────────────────────────────
        {
          type: 'subheading',
          text: 'Forms',
        },
        {
          type: 'table',
          headers: ['Library', 'Approach', 'Key Features'],
          rows: [
            [
              'React Hook Form',
              'Uncontrolled with refs',
              'Minimal re-renders, great performance, Zod/Yup integration, DevTools',
            ],
            [
              'Formik',
              'Controlled state',
              'Mature ecosystem, validation helpers, field-level validation, wide adoption',
            ],
            [
              'Zod',
              'Schema validation (pairs with forms)',
              'TypeScript-first, composable schemas, parse-dont-validate, runtime type safety',
            ],
          ],
        },

        // ── UI Libraries ──────────────────────────────────────────
        {
          type: 'subheading',
          text: 'UI Component Libraries',
        },
        {
          type: 'table',
          headers: ['Library', 'Approach', 'Best For'],
          rows: [
            [
              'Tailwind CSS',
              'Utility-first CSS',
              'Custom designs, rapid prototyping, consistent spacing/colors',
            ],
            [
              'shadcn/ui',
              'Copy-paste Radix + Tailwind components',
              'Full control over code, no dependency lock-in, beautiful defaults',
            ],
            [
              'Radix UI',
              'Unstyled accessible primitives',
              'Building custom design systems with correct accessibility baked in',
            ],
            [
              'Headless UI',
              'Unstyled accessible components (Tailwind Labs)',
              'Tailwind projects needing accessible dropdowns, modals, tabs',
            ],
            [
              'MUI (Material UI)',
              'Material Design components',
              'Enterprise apps, comprehensive component library, powerful theming',
            ],
            [
              'Chakra UI',
              'Styled accessible components',
              'Rapid development with good defaults, accessible out of the box',
            ],
            [
              'Mantine',
              'Full-featured component library',
              '100+ components, hooks library, form handling, notifications system',
            ],
          ],
        },

        // ── Animation ─────────────────────────────────────────────
        {
          type: 'subheading',
          text: 'Animation',
        },
        {
          type: 'table',
          headers: ['Library', 'Approach', 'Best For'],
          rows: [
            [
              'Framer Motion',
              'Declarative animations with layout support',
              'Page transitions, gestures, layout animations, shared layout animations',
            ],
            [
              'React Spring',
              'Physics-based animations',
              'Natural-feeling animations, spring physics, complex choreography',
            ],
            [
              'Auto Animate',
              'Zero-config automatic animations',
              'Adding subtle animations to lists and layout changes with minimal effort',
            ],
          ],
        },

        // ── Testing ───────────────────────────────────────────────
        {
          type: 'subheading',
          text: 'Testing',
        },
        {
          type: 'table',
          headers: ['Tool', 'Type', 'Key Features'],
          rows: [
            [
              'Vitest',
              'Unit / Integration runner',
              'Vite-native, fast HMR, Jest-compatible API, in-source testing, code coverage',
            ],
            [
              'Jest',
              'Unit / Integration runner',
              'Mature ecosystem, snapshot testing, mocking, code coverage, large community',
            ],
            [
              'React Testing Library',
              'Component testing',
              'Tests behavior not implementation, queries by role/text, encourages a11y',
            ],
            [
              'Playwright',
              'End-to-end testing',
              'Multi-browser, auto-wait, codegen, visual comparisons, component testing',
            ],
            [
              'Cypress',
              'End-to-end testing',
              'Time-travel debugging, real browser, network stubbing, component testing',
            ],
            [
              'MSW (Mock Service Worker)',
              'API mocking',
              'Network-level interception, works in tests and browser, type-safe handlers',
            ],
          ],
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Testing Example with Vitest + React Testing Library',
          code: "import { render, screen, fireEvent } from '@testing-library/react';\nimport { describe, it, expect } from 'vitest';\nimport Counter from './Counter';\n\ndescribe('Counter', () => {\n  it('increments count on button click', () => {\n    render(<Counter />);\n\n    const button = screen.getByRole('button', { name: /increment/i });\n    expect(screen.getByText('Count: 0')).toBeDefined();\n\n    fireEvent.click(button);\n    expect(screen.getByText('Count: 1')).toBeDefined();\n\n    fireEvent.click(button);\n    expect(screen.getByText('Count: 2')).toBeDefined();\n  });\n\n  it('resets count', () => {\n    render(<Counter />);\n    fireEvent.click(screen.getByRole('button', { name: /increment/i }));\n    fireEvent.click(screen.getByRole('button', { name: /reset/i }));\n    expect(screen.getByText('Count: 0')).toBeDefined();\n  });\n});",
        },

        // ── Dev Tools ─────────────────────────────────────────────
        {
          type: 'subheading',
          text: 'Developer Tools',
        },
        {
          type: 'table',
          headers: ['Tool', 'Purpose', 'Key Features'],
          rows: [
            [
              'React DevTools',
              'Component inspection',
              'Component tree, props/state viewer, profiler, highlight re-renders',
            ],
            [
              'Storybook',
              'Component development / documentation',
              'Isolated component dev, visual testing, docs generation, addon ecosystem',
            ],
            [
              'Chromatic',
              'Visual regression testing',
              'Automatic screenshot diffing, Storybook integration, review workflow',
            ],
            [
              'React Scan',
              'Performance analysis',
              'Automatic render highlighting, performance metrics, zero-config setup',
            ],
            [
              'Why Did You Render',
              'Re-render debugging',
              'Logs unnecessary re-renders, identifies wasted renders, easy setup',
            ],
          ],
        },
        {
          type: 'subheading',
          text: 'Project Structure',
        },
        {
          type: 'text',
          content:
            'There is no single correct way to structure a React project, but these two approaches are the most common. Feature-based organization scales better for large projects.',
        },
        {
          type: 'code',
          language: 'text',
          title: 'Feature-Based Structure (Recommended for Medium-Large Projects)',
          code: 'src/\n  features/\n    auth/\n      components/      LoginForm.tsx, SignupForm.tsx\n      hooks/           useAuth.ts, useSession.ts\n      api/             authApi.ts\n      types.ts\n      index.ts         public exports\n    dashboard/\n      components/      Chart.tsx, StatCard.tsx\n      hooks/           useDashboardData.ts\n      api/             dashboardApi.ts\n      types.ts\n      index.ts\n  components/          shared/reusable components\n    ui/                Button.tsx, Input.tsx, Modal.tsx\n    layout/            Header.tsx, Sidebar.tsx, Footer.tsx\n  hooks/               shared hooks\n  lib/                 utilities, constants, config\n  types/               global type definitions',
        },
        {
          type: 'code',
          language: 'text',
          title: 'Layer-Based Structure (Simpler, Good for Small Projects)',
          code: 'src/\n  components/          all components\n  hooks/               all custom hooks\n  pages/               route-level components\n  api/                 API client functions\n  utils/               helper functions\n  types/               TypeScript types\n  context/             React context providers\n  styles/              global styles',
        },
        {
          type: 'tip',
          content:
            'Regardless of structure, co-locate related files. Keep a component, its styles, tests, and stories in the same directory. Use barrel exports (index.ts) to keep imports clean.',
        },
        {
          type: 'subheading',
          text: 'Recommended Starter Stacks',
        },
        {
          type: 'table',
          headers: ['Stack', 'Technologies', 'Best For'],
          rows: [
            [
              'Modern Full-Stack',
              'Next.js + Tailwind + shadcn/ui + TanStack Query + Zustand',
              'Production web apps with SSR and great DX',
            ],
            [
              'Type-Safe Full-Stack',
              'Next.js + tRPC + Prisma + Zod + Tailwind',
              'End-to-end type safety from database to UI',
            ],
            [
              'SPA + API',
              'Vite + React Router + TanStack Query + Zustand + Tailwind',
              'Client-rendered apps with separate backend',
            ],
            [
              'Mobile + Web',
              'Expo + React Navigation + Zustand + NativeWind',
              'Cross-platform apps sharing business logic',
            ],
            [
              'Static / Blog',
              'Astro + React islands + Tailwind + MDX',
              'Content-heavy sites with minimal JavaScript',
            ],
          ],
        },
        {
          type: 'tip',
          content:
            'For new projects, the most popular combination is Next.js (App Router) + Tailwind CSS + shadcn/ui + TanStack Query + Zustand + Vitest + React Testing Library. This stack covers most needs with excellent developer experience.',
        },
      ],
    },
  ],
};
