import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LivePreview } from '../components/LivePreview';

const meta = {
  title: 'Code/LivePreview',
  component: LivePreview,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0f' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LivePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Realistic code snippets ──────────────────────────────────

const htmlSnippet = `<div class="card">
  <h2 class="card-title">Hello World</h2>
  <p class="card-body">This is a live preview component.</p>
  <button class="btn" id="counter-btn">Click me: 0</button>
</div>`;

const cssSnippet = `
.card {
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
}
.card-title {
  color: #f1f5f9;
  font-size: 1.5rem;
  margin-bottom: 8px;
}
.card-body {
  color: #94a3b8;
  margin-bottom: 16px;
}
.btn {
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.15s ease;
}
.btn:hover {
  transform: scale(1.05);
}`;

const jsSnippet = `let count = 0;
const btn = document.getElementById('counter-btn');
btn.addEventListener('click', () => {
  count++;
  btn.textContent = 'Click me: ' + count;
});`;

const reactHtml = `<div id="root"></div>`;

const reactCss = `
.counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 32px;
}
.counter h1 {
  color: #f1f5f9;
  font-size: 2rem;
}
.counter .count {
  font-size: 4rem;
  font-weight: bold;
  color: #818cf8;
}
.counter .buttons {
  display: flex;
  gap: 12px;
}
.counter button {
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.15s;
}
.counter button:hover {
  transform: scale(1.1);
}
.counter .dec {
  background: #ef4444;
  color: white;
}
.counter .inc {
  background: #22c55e;
  color: white;
}`;

const reactJs = `const { useState } = React;

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h1>React Counter</h1>
      <div className="count">{count}</div>
      <div className="buttons">
        <button className="dec" onClick={() => setCount(c => c - 1)}>-</button>
        <button className="inc" onClick={() => setCount(c => c + 1)}>+</button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Counter />);`;

const vueHtml = `<div id="app"></div>`;

const vueCss = `
.todo-app {
  max-width: 400px;
  padding: 24px;
}
.todo-app h2 {
  color: #f1f5f9;
  margin-bottom: 16px;
}
.todo-app input {
  width: 100%;
  padding: 10px 14px;
  background: #1e293b;
  border: 1px solid #475569;
  border-radius: 8px;
  color: #e2e8f0;
  margin-bottom: 12px;
}
.todo-app ul {
  list-style: none;
  padding: 0;
}
.todo-app li {
  padding: 10px 14px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #cbd5e1;
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.todo-app li button {
  background: #ef4444;
  border: none;
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
}`;

const vueJs = `const { createApp, ref } = Vue;

createApp({
  setup() {
    const newTodo = ref('');
    const todos = ref(['Learn Vue', 'Build an app', 'Deploy to production']);

    function addTodo() {
      if (newTodo.value.trim()) {
        todos.value.push(newTodo.value.trim());
        newTodo.value = '';
      }
    }
    function removeTodo(index) {
      todos.value.splice(index, 1);
    }

    return { newTodo, todos, addTodo, removeTodo };
  },
  template: \`
    <div class="todo-app">
      <h2>Vue Todo List</h2>
      <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a task..." />
      <ul>
        <li v-for="(todo, i) in todos" :key="i">
          {{ todo }}
          <button @click="removeTodo(i)">Remove</button>
        </li>
      </ul>
    </div>
  \`
}).mount('#app');`;

const angularHtml = `<div id="app">
  <h2 style="color: #f1f5f9;">Angular Preview</h2>
  <p style="color: #94a3b8;">Angular components require a full build pipeline. This preview shows a simplified version.</p>
  <div class="timer-display">
    <span id="timer-value">00:00</span>
  </div>
  <div class="timer-controls">
    <button class="timer-btn start" id="start-btn">Start</button>
    <button class="timer-btn stop" id="stop-btn">Stop</button>
    <button class="timer-btn reset" id="reset-btn">Reset</button>
  </div>
</div>`;

const angularCss = `
.timer-display {
  text-align: center;
  padding: 32px;
}
#timer-value {
  font-size: 3rem;
  font-weight: bold;
  color: #818cf8;
  font-family: monospace;
}
.timer-controls {
  display: flex;
  gap: 12px;
  justify-content: center;
}
.timer-btn {
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  color: white;
}
.timer-btn.start { background: #22c55e; }
.timer-btn.stop { background: #ef4444; }
.timer-btn.reset { background: #6366f1; }`;

const angularJs = `let seconds = 0;
let interval = null;
const display = document.getElementById('timer-value');

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return m + ':' + sec;
}

document.getElementById('start-btn').addEventListener('click', () => {
  if (!interval) {
    interval = setInterval(() => {
      seconds++;
      display.textContent = formatTime(seconds);
    }, 1000);
  }
});

document.getElementById('stop-btn').addEventListener('click', () => {
  clearInterval(interval);
  interval = null;
});

document.getElementById('reset-btn').addEventListener('click', () => {
  clearInterval(interval);
  interval = null;
  seconds = 0;
  display.textContent = formatTime(seconds);
});`;

// ── Stories ──────────────────────────────────────────────────

// Native JS: card with counter button
export const HTMLPreview: Story = {
  args: {
    html: htmlSnippet,
    css: cssSnippet,
    js: jsSnippet,
    framework: 'native-js',
  },
};

// CSS-focused: styled card without interactivity
export const CSSPreview: Story = {
  args: {
    html: `<div class="gradient-box">
  <div class="inner">
    <h3>CSS Gradient Card</h3>
    <p>Beautiful gradients with pure CSS</p>
  </div>
</div>`,
    css: `
.gradient-box {
  padding: 3px;
  border-radius: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  max-width: 350px;
}
.inner {
  background: #0f172a;
  border-radius: 14px;
  padding: 32px;
}
.inner h3 {
  color: #e2e8f0;
  font-size: 1.25rem;
  margin-bottom: 8px;
}
.inner p {
  color: #94a3b8;
  font-size: 0.875rem;
}`,
    js: '',
    framework: 'native-js',
  },
};

// JavaScript-focused: DOM manipulation demo
export const JavaScriptPreview: Story = {
  args: {
    html: `<div class="js-demo">
  <input type="text" id="search-input" placeholder="Type to filter..." />
  <ul id="fruit-list">
    <li>Apple</li>
    <li>Banana</li>
    <li>Cherry</li>
    <li>Date</li>
    <li>Elderberry</li>
    <li>Fig</li>
    <li>Grape</li>
  </ul>
  <p id="result-count">7 items</p>
</div>`,
    css: `
.js-demo {
  max-width: 300px;
}
.js-demo input {
  width: 100%;
  padding: 10px 14px;
  background: #1e293b;
  border: 1px solid #475569;
  border-radius: 8px;
  color: #e2e8f0;
  margin-bottom: 12px;
  font-size: 0.875rem;
}
.js-demo ul {
  list-style: none;
  padding: 0;
}
.js-demo li {
  padding: 8px 12px;
  color: #cbd5e1;
  border-bottom: 1px solid #1e293b;
  transition: background 0.15s;
}
.js-demo li:hover {
  background: #1e293b;
}
.js-demo li.hidden {
  display: none;
}
#result-count {
  color: #64748b;
  font-size: 0.75rem;
  margin-top: 8px;
}`,
    js: `const input = document.getElementById('search-input');
const items = document.querySelectorAll('#fruit-list li');
const count = document.getElementById('result-count');

input.addEventListener('input', () => {
  const query = input.value.toLowerCase();
  let visible = 0;
  items.forEach(li => {
    const match = li.textContent.toLowerCase().includes(query);
    li.classList.toggle('hidden', !match);
    if (match) visible++;
  });
  count.textContent = visible + ' item' + (visible !== 1 ? 's' : '');
});`,
    framework: 'native-js',
  },
};

// React framework preview
export const ReactPreview: Story = {
  args: {
    html: reactHtml,
    css: reactCss,
    js: reactJs,
    framework: 'react',
  },
};

// Vue framework preview
export const VuePreview: Story = {
  args: {
    html: vueHtml,
    css: vueCss,
    js: vueJs,
    framework: 'vue',
  },
};

// Angular framework preview
export const AngularPreview: Story = {
  args: {
    html: angularHtml,
    css: angularCss,
    js: angularJs,
    framework: 'angular',
  },
};

// Custom height (taller)
export const CustomHeight: Story = {
  args: {
    html: htmlSnippet,
    css: cssSnippet,
    js: jsSnippet,
    framework: 'native-js',
    height: 600,
  },
};

// Only show specific code tabs (HTML + JS, no CSS tab)
export const WithShowCodeTabs: Story = {
  args: {
    html: htmlSnippet,
    css: cssSnippet,
    js: jsSnippet,
    framework: 'native-js',
    showCodeTabs: ['html', 'js'],
  },
};

// Preview-only: minimal tabs, just showing the rendered output
export const PreviewOnly: Story = {
  args: {
    html: `<div style="text-align:center; padding: 48px;">
  <h1 style="color: #f1f5f9; font-size: 2rem; margin-bottom: 8px;">Preview Only Mode</h1>
  <p style="color: #94a3b8;">No code tabs shown - just the live output.</p>
</div>`,
    css: '',
    js: '',
    framework: 'native-js',
    showCodeTabs: [],
  },
};

// Small height preview
export const CompactPreview: Story = {
  args: {
    html: `<p style="color: #e2e8f0; text-align: center; padding: 16px;">Compact preview with reduced height</p>`,
    css: '',
    js: '',
    framework: 'native-js',
    height: 200,
  },
};
