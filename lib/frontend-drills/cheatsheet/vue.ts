import type { CheatsheetData } from '../types';

export const vueCheatsheet: CheatsheetData = {
  framework: 'vue',
  title: 'Vue Cheatsheet',
  lastUpdated: '2025-01',
  sections: [
    {
      id: 'overview',
      icon: '📋',
      title: 'Overview',
      description: 'What Vue is and how it works',
      content: [
        {
          type: 'text',
          content: `Vue is a progressive JavaScript framework for building user interfaces. It's designed to be incrementally adoptable — you can use as little or as much of Vue as you need. Uses a reactivity system that automatically tracks dependencies and efficiently updates the DOM.`,
        },
        {
          type: 'list',
          style: 'bullet',
          items: [
            'Fine-grained reactivity system with automatic dependency tracking',
            'Single-File Components (SFCs) combining template/script/style',
            'Composition API for flexible logic organization',
            'Progressive adoption from a script tag to a full SPA',
            'Template syntax with directives (v-if/v-for/v-bind/v-on)',
          ],
        },
        {
          type: 'tip',
          content:
            'Vue 3 with the Composition API is the recommended approach for new projects. The Options API is still supported for simpler components.',
        },
      ],
    },
    {
      id: 'core-concepts',
      icon: '🧠',
      title: 'Core Concepts',
      description: 'Reactivity, SFCs, and template syntax',
      content: [
        {
          type: 'subheading',
          text: 'Single-File Components',
        },
        {
          type: 'text',
          content:
            'Vue SFCs combine template, script, and style in a single .vue file. With <script setup>, you get a concise syntax where top-level bindings are automatically available in the template.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Single-File Component (Composition API)',
          code: `<script setup>
import { ref, computed } from 'vue'

const name = ref('World')
const greeting = computed(() => \`Hello, \${name.value}!\`)
</script>

<template>
  <div>
    <h1>{{ greeting }}</h1>
    <input v-model="name" placeholder="Your name" />
  </div>
</template>

<style scoped>
h1 { color: #42b883; }
</style>`,
        },
        {
          type: 'subheading',
          text: 'Reactivity Primitives',
        },
        {
          type: 'text',
          content:
            'ref() wraps a single value in a reactive reference. reactive() makes an entire object reactive. computed() creates a derived value that caches and auto-updates.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Reactivity System',
          code: `import { ref, reactive, computed, watch } from 'vue'

// ref for primitive values
const count = ref(0)
count.value++ // access with .value in script

// reactive for objects
const state = reactive({
  items: [],
  filter: 'all'
})

// computed — cached derived value
const activeItems = computed(() =>
  state.items.filter(i => !i.done)
)

// watch — react to changes
watch(count, (newVal, oldVal) => {
  console.log(\`Changed from \${oldVal} to \${newVal}\`)
})`,
        },
        {
          type: 'subheading',
          text: 'Template Syntax',
        },
        {
          type: 'code',
          language: 'html',
          title: 'Vue Template Directives',
          code: `<!-- Text interpolation -->
<p>{{ message }}</p>

<!-- Attribute binding -->
<img :src="imageUrl" :alt="imageAlt" />

<!-- Event handling -->
<button @click="handleClick">Click me</button>

<!-- Two-way binding -->
<input v-model="query" />

<!-- Conditional rendering -->
<div v-if="isLoading">Loading...</div>
<div v-else-if="error">Error: {{ error }}</div>
<div v-else>{{ data }}</div>

<!-- List rendering -->
<li v-for="item in items" :key="item.id">
  {{ item.name }}
</li>`,
        },
        {
          type: 'warning',
          content:
            "Always use :key with v-for. Without it, Vue uses an 'in-place patch' strategy that can cause subtle bugs when list items have state.",
        },
      ],
    },
    {
      id: 'key-apis',
      icon: '🔑',
      title: 'Key APIs',
      description: 'Essential Composition API functions',
      content: [
        {
          type: 'table',
          headers: ['API', 'Purpose', 'Example'],
          rows: [
            ['ref()', 'Reactive single value', 'const count = ref(0)'],
            ['reactive()', 'Reactive object', 'const state = reactive({ items: [] })'],
            [
              'computed()',
              'Cached derived value',
              'const total = computed(() => items.value.length)',
            ],
            ['watch()', 'React to changes', 'watch(source, (newVal) => { ... })'],
            [
              'watchEffect()',
              'Auto-tracked side effect',
              'watchEffect(() => console.log(count.value))',
            ],
            ['onMounted()', 'Lifecycle — after mount', 'onMounted(() => fetchData())'],
            [
              'provide() / inject()',
              'Cross-component data',
              'provide("key", value) / inject("key")',
            ],
            ['defineProps()', 'Component props', 'const props = defineProps<{ msg: string }>()'],
            ['defineEmits()', 'Component events', 'const emit = defineEmits(["update"])'],
          ],
        },
        {
          type: 'subheading',
          text: 'Lifecycle Hooks',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Composition API Lifecycle',
          code: `import {
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount,
} from 'vue'

onMounted(() => {
  console.log('Component mounted')
  fetchInitialData()
})

onUnmounted(() => {
  console.log('Cleaning up...')
  clearInterval(timerId)
})`,
        },
        {
          type: 'tip',
          content:
            'Use watchEffect() when you want automatic dependency tracking. Use watch() when you need access to old and new values or want to be explicit about sources.',
        },
      ],
    },
    {
      id: 'common-patterns',
      icon: '🔄',
      title: 'Common Patterns',
      description: 'Widely-used Vue patterns',
      content: [
        {
          type: 'subheading',
          text: 'Composables',
        },
        {
          type: 'text',
          content:
            'Composables are functions that encapsulate and reuse stateful logic using the Composition API. By convention, they start with "use".',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Composable — useMouse',
          code: `import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}`,
        },
        {
          type: 'subheading',
          text: 'Provide / Inject',
        },
        {
          type: 'text',
          content: 'Share data across deeply nested components without prop drilling.',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Provide / Inject Pattern',
          code: `// Parent component
const theme = ref('dark')
provide('theme', theme)

// Deep child component
const theme = inject('theme')
// theme is reactive — changes propagate automatically`,
        },
        {
          type: 'subheading',
          text: 'Async Components',
        },
        {
          type: 'code',
          language: 'javascript',
          title: 'Lazy Loading Components',
          code: `import { defineAsyncComponent } from 'vue'

const AsyncModal = defineAsyncComponent(() =>
  import('./components/HeavyModal.vue')
)

// With loading/error states
const AsyncDashboard = defineAsyncComponent({
  loader: () => import('./Dashboard.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200,
  timeout: 3000,
})`,
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
          title: 'Reactivity with ref()',
          description: 'Demonstrating reactive state with ref and computed.',
          defaultCode: `import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

function increment() {
  count.value++
}

function reset() {
  count.value = 0
}

// In template:
// <p>Count: {{ count }} (doubled: {{ doubled }})</p>
// <button @click="increment">+1</button>
// <button @click="reset">Reset</button>`,
        },
        {
          type: 'interactive-code',
          language: 'javascript',
          title: 'Computed Properties',
          description: 'Filtering a list with computed properties.',
          defaultCode: `import { ref, computed } from 'vue'

const todos = ref([
  { id: 1, text: 'Learn Vue', done: true },
  { id: 2, text: 'Build app', done: false },
  { id: 3, text: 'Deploy', done: false },
])

const filter = ref('all') // 'all' | 'active' | 'done'

const filteredTodos = computed(() => {
  if (filter.value === 'active') {
    return todos.value.filter(t => !t.done)
  }
  if (filter.value === 'done') {
    return todos.value.filter(t => t.done)
  }
  return todos.value
})

const remaining = computed(() =>
  todos.value.filter(t => !t.done).length
)`,
        },
        {
          type: 'interactive-code',
          language: 'javascript',
          title: 'Composable — useCounter',
          description: 'A reusable composable with encapsulated state and logic.',
          defaultCode: `import { ref, computed } from 'vue'

export function useCounter(initial = 0, step = 1) {
  const count = ref(initial)
  const isPositive = computed(() => count.value > 0)

  function increment() {
    count.value += step
  }

  function decrement() {
    count.value -= step
  }

  function reset() {
    count.value = initial
  }

  return { count, isPositive, increment, decrement, reset }
}

// Usage in a component:
// const { count, increment, reset } = useCounter(0, 2)`,
        },
      ],
    },
    {
      id: 'ecosystem',
      icon: '🌐',
      title: 'Ecosystem & Tools',
      description: 'Popular libraries and tools in the Vue ecosystem',
      content: [
        {
          type: 'table',
          headers: ['Tool', 'Category', 'Description'],
          rows: [
            [
              'Nuxt 3',
              'Framework',
              'Full-stack Vue framework with SSR, file-based routing, and auto-imports',
            ],
            [
              'Pinia',
              'State Management',
              'Official state management — intuitive, type-safe, and devtools-ready',
            ],
            ['VueUse', 'Utilities', 'Collection of 200+ composables for common tasks'],
            ['Vuetify', 'UI Library', 'Material Design component library for Vue'],
            ['PrimeVue', 'UI Library', 'Rich set of open-source UI components'],
            ['Vue Router', 'Routing', 'Official router with nested routes and navigation guards'],
            ['Vite', 'Build Tool', 'Fast build tool created by the Vue team'],
            ['Vitest', 'Testing', 'Vite-native test runner with Vue Test Utils integration'],
          ],
        },
        {
          type: 'tip',
          content:
            "Pinia has replaced Vuex as the official state management solution. It's simpler, fully typed, and works seamlessly with Vue 3.",
        },
      ],
    },
  ],
};
