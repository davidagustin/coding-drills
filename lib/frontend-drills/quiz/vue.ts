import type { FrontendQuizQuestion } from '../types';

export const vueQuizQuestions: FrontendQuizQuestion[] = [
  {
    id: 'vue-q1',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What is the difference between ref and reactive in Vue 3 Composition API?',
    codeSnippet: `const count = ref(0);
const state = reactive({ count: 0 });`,
    options: [
      "ref is for primitives and needs .value access, reactive is for objects and doesn't need .value",
      'reactive is faster than ref',
      'ref is deprecated in Vue 3',
      'reactive only works with arrays',
    ],
    correctAnswer:
      "ref is for primitives and needs .value access, reactive is for objects and doesn't need .value",
    explanation:
      'ref() wraps values in an object with a .value property (works for primitives and objects). reactive() creates a reactive proxy for objects only (no .value needed). In templates, both auto-unwrap.',
  },
  {
    id: 'vue-q2',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What is the difference between computed and methods in Vue?',
    options: [
      'computed properties are cached based on reactive dependencies, methods run on every call',
      'methods are faster than computed properties',
      "computed properties can't accept parameters",
      "methods don't have access to component data",
    ],
    correctAnswer:
      'computed properties are cached based on reactive dependencies, methods run on every call',
    explanation:
      "Computed properties are cached and only re-evaluate when their reactive dependencies change. Methods run every time they're called. Use computed for derived state, methods for actions.",
  },
  {
    id: 'vue-q3',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'What is the difference between watch and watchEffect?',
    codeSnippet: `watch(source, (newVal, oldVal) => {});
watchEffect(() => {});`,
    options: [
      'watch requires explicit sources and provides old/new values, watchEffect automatically tracks dependencies and runs immediately',
      'watchEffect is deprecated',
      'watch is for primitives, watchEffect is for objects',
      'watchEffect is always faster',
    ],
    correctAnswer:
      'watch requires explicit sources and provides old/new values, watchEffect automatically tracks dependencies and runs immediately',
    explanation:
      'watch requires you to specify what to watch and provides old/new values. watchEffect automatically tracks reactive dependencies and runs immediately. Use watch for specific data, watchEffect for side effects.',
  },
  {
    id: 'vue-q4',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What is the difference between Composition API and Options API?',
    options: [
      'Composition API organizes code by logical concerns using functions, Options API organizes by option types (data, methods, etc.)',
      'Composition API is only for Vue 3',
      'Options API is faster',
      "Composition API doesn't support reactivity",
    ],
    correctAnswer:
      'Composition API organizes code by logical concerns using functions, Options API organizes by option types (data, methods, etc.)',
    explanation:
      'Options API uses object properties (data, methods, computed, etc.). Composition API uses setup() with composition functions, allowing better code organization by feature and improved TypeScript support.',
  },
  {
    id: 'vue-q5',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'easy',
    question: 'What does v-model do?',
    codeSnippet: `<input v-model="message" />`,
    options: [
      'Creates two-way data binding between form inputs and component state',
      'Validates form input',
      'Styles the input element',
      'Prevents form submission',
    ],
    correctAnswer: 'Creates two-way data binding between form inputs and component state',
    explanation:
      "v-model creates two-way binding on form inputs. It's syntactic sugar for :value and @input (or :checked and @change for checkboxes). Changes in the input update the data, and vice versa.",
  },
  {
    id: 'vue-q6',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What is the difference between v-if and v-show?',
    codeSnippet: `<div v-if="isVisible">A</div>
<div v-show="isVisible">B</div>`,
    options: [
      'v-if conditionally renders elements (adds/removes from DOM), v-show toggles CSS display property',
      'v-show is faster than v-if',
      "v-if doesn't work with components",
      'v-show removes elements from the DOM',
    ],
    correctAnswer:
      'v-if conditionally renders elements (adds/removes from DOM), v-show toggles CSS display property',
    explanation:
      'v-if conditionally adds/removes elements from the DOM (higher toggle cost, lazy). v-show always renders elements but toggles CSS display (lower toggle cost). Use v-if for infrequent changes, v-show for frequent toggling.',
  },
  {
    id: 'vue-q7',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What is the order of Vue 3 lifecycle hooks in the Composition API?',
    options: [
      'setup → onBeforeMount → onMounted → onBeforeUpdate → onUpdated → onBeforeUnmount → onUnmounted',
      'setup → onMounted → onUpdated → onUnmounted',
      'onMounted → setup → onUnmounted',
      'All hooks run simultaneously',
    ],
    correctAnswer:
      'setup → onBeforeMount → onMounted → onBeforeUpdate → onUpdated → onBeforeUnmount → onUnmounted',
    explanation:
      'Composition API lifecycle: setup (before creation) → onBeforeMount → onMounted (after DOM created) → onBeforeUpdate/onUpdated (on reactive changes) → onBeforeUnmount/onUnmounted (cleanup).',
  },
  {
    id: 'vue-q8',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'What is Pinia and how does it differ from Vuex?',
    options: [
      "Pinia is Vue's new official state management with better TypeScript support, simpler API, and no mutations",
      'Pinia is a routing library',
      'Pinia only works with Vue 2',
      'Pinia and Vuex are identical',
    ],
    correctAnswer:
      "Pinia is Vue's new official state management with better TypeScript support, simpler API, and no mutations",
    explanation:
      'Pinia is the recommended state management for Vue 3. Compared to Vuex: no mutations (actions can be async/sync), better TypeScript inference, modular by design, supports DevTools.',
  },
  {
    id: 'vue-q9',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'What does the key attribute do in v-for?',
    codeSnippet: `<li v-for="item in items" :key="item.id">
  {{ item.name }}
</li>`,
    options: [
      'Helps Vue identify which items changed, were added, or removed for efficient DOM updates',
      'Makes the list sortable',
      'Adds CSS styling',
      'Enables event handling',
    ],
    correctAnswer:
      'Helps Vue identify which items changed, were added, or removed for efficient DOM updates',
    explanation:
      "The key attribute gives Vue a hint about each item's identity, enabling efficient reordering and updates. Without keys, Vue uses in-place patch strategy. Keys should be unique and stable.",
  },
  {
    id: 'vue-q10',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What are Vue composables and when should you use them?',
    codeSnippet: `function useCounter() {
  const count = ref(0);
  const increment = () => count.value++;
  return { count, increment };
}`,
    options: [
      'Reusable composition functions that encapsulate and share stateful logic across components',
      'Components that can be composed together',
      'CSS modules for Vue',
      'A way to compose templates',
    ],
    correctAnswer:
      'Reusable composition functions that encapsulate and share stateful logic across components',
    explanation:
      'Composables are functions that leverage Composition API to encapsulate and reuse stateful logic. They\'re the Vue 3 equivalent of mixins/HOCs but more flexible and explicit. Convention: name starts with "use".',
  },
];
