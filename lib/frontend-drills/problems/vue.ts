import type { FrontendDrillProblem } from '../types';

/**
 * Vue drill problems covering reactive state, composables, lifecycle, and common patterns.
 * All problems use mock implementations since window/document/fetch are blocked in codeValidator.
 */

export const vueProblems: FrontendDrillProblem[] = [
  {
    id: 'fe-vue-ref-basic',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'Create a Reactive Ref',
    text: 'Use the ref() function to create a reactive reference with initial value 42.',
    setup: 'A mock ref function that wraps a value in { value: ... }.',
    setupCode: `const ref = (val) => ({ value: val });`,
    expected: { value: 42 },
    sample: 'ref(42)',
    hints: [
      'ref() wraps a value in an object with a .value property',
      'Pass the initial value as an argument',
    ],
    tags: ['reactivity', 'ref', 'basics'],
  },

  {
    id: 'fe-vue-reactive-object',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'Create Reactive Object',
    text: 'Use reactive() to create a reactive object with properties: name = "Alice", age = 25.',
    setup:
      'A mock reactive function that returns a proxy-like object (simplified as the same object).',
    setupCode: `const reactive = (obj) => obj;`,
    expected: { name: 'Alice', age: 25 },
    sample: 'reactive({ name: "Alice", age: 25 })',
    hints: [
      'reactive() takes an object and returns it (in our mock)',
      'Create an object literal with the two properties',
    ],
    tags: ['reactivity', 'reactive', 'objects'],
  },

  {
    id: 'fe-vue-computed-double',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Computed Property',
    text: 'Create a computed property that doubles the value of count. Return the computed value when count = 10.',
    setup:
      'Mock computed() takes a getter function and returns { value: result }. A count ref is provided.',
    setupCode: `const ref = (val) => ({ value: val });
const computed = (fn) => ({ value: fn() });
const count = ref(10);`,
    expected: { value: 20 },
    sample: 'computed(() => count.value * 2)',
    hints: [
      'computed() takes a function that returns a value',
      'Access count.value to get the current count',
      'Return count.value * 2',
    ],
    tags: ['computed', 'reactivity', 'getter'],
  },

  {
    id: 'fe-vue-watch-effect',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Watch a Reactive Property',
    text: 'Use watch() to track changes to a ref. When the ref changes from 5 to 10, capture the new value. Return an object with the captured value.',
    setup:
      'Mock watch() executes the callback immediately with (newVal, oldVal). A counter ref is provided.',
    setupCode: `const ref = (val) => ({ value: val });
const watch = (source, callback) => {
  const newVal = typeof source === 'function' ? source() : source.value;
  callback(newVal, undefined);
};
const counter = ref(10);`,
    expected: { captured: 10 },
    sample: `let captured;
watch(counter, (newVal) => { captured = newVal; });
({ captured })`,
    hints: [
      'watch() takes a source (ref or getter) and a callback',
      'The callback receives (newValue, oldValue)',
      'Store the new value in a variable and return it',
    ],
    tags: ['watch', 'reactivity', 'side-effects'],
  },

  {
    id: 'fe-vue-lifecycle-mounted',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'Lifecycle Hook: onMounted',
    text: 'Use onMounted() to set a message to "Component mounted". Return an object with the message.',
    setup: 'Mock onMounted() immediately executes the callback.',
    setupCode: `const onMounted = (callback) => callback();`,
    expected: { message: 'Component mounted' },
    sample: `let message;
onMounted(() => { message = "Component mounted"; });
({ message })`,
    hints: [
      'onMounted() takes a callback function',
      'Execute code inside the callback',
      'Store the result and return it',
    ],
    tags: ['lifecycle', 'onMounted', 'hooks'],
  },

  {
    id: 'fe-vue-v-for-filter',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'Render Filtered List',
    text: 'Simulate v-for with a filter: given items = [{id:1,done:true},{id:2,done:false},{id:3,done:true}], return only the completed items (done:true).',
    setup: 'A mock items array is provided.',
    setupCode: `const items = [{id:1,done:true},{id:2,done:false},{id:3,done:true}];`,
    expected: [
      { id: 1, done: true },
      { id: 3, done: true },
    ],
    sample: 'items.filter(item => item.done)',
    hints: [
      'Use .filter() to select items where done is true',
      'v-for in Vue uses JavaScript array methods',
    ],
    tags: ['v-for', 'filtering', 'rendering'],
  },

  {
    id: 'fe-vue-event-handler',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: 'Event Handler Pattern',
    text: 'Create a click handler that increments a counter. Start at 0, simulate 3 clicks, and return the final count.',
    setup: 'Mock ref and a handleClick function to simulate v-on:click.',
    setupCode: `const ref = (val) => ({ value: val });`,
    expected: { count: 3 },
    sample: `const count = ref(0);
const handleClick = () => { count.value++; };
handleClick(); handleClick(); handleClick();
({ count: count.value })`,
    hints: [
      'Create a ref for count starting at 0',
      'Define a handler function that increments count.value',
      'Call the handler 3 times',
    ],
    tags: ['events', 'v-on', 'click', 'handlers'],
  },

  {
    id: 'fe-vue-emit-pattern',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: 'Component Emit Pattern',
    text: 'Simulate $emit by creating an event emitter. Emit "update" with payload {value:100}, then return the emitted event data.',
    setup: 'Mock emit function that stores the last emitted event.',
    setupCode: `let lastEmit = null;
const emit = (eventName, payload) => { lastEmit = { eventName, payload }; };`,
    expected: { eventName: 'update', payload: { value: 100 } },
    sample: `emit("update", {value:100});
lastEmit`,
    hints: [
      'Call emit() with event name and payload',
      'The function stores the event data',
      'Return lastEmit',
    ],
    tags: ['emit', 'events', 'component-communication'],
  },

  {
    id: 'fe-vue-composable',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'hard',
    title: 'Create a Composable',
    text: 'Create a useCounter() composable that returns { count, increment }. Start count at 0, increment it twice, and return the final count value.',
    setup: 'Mock ref function provided.',
    setupCode: `const ref = (val) => ({ value: val });`,
    expected: { count: 2 },
    sample: `function useCounter() {
  const count = ref(0);
  const increment = () => { count.value++; };
  return { count, increment };
}
const { count, increment } = useCounter();
increment(); increment();
({ count: count.value })`,
    hints: [
      'A composable is a function that returns reactive state and methods',
      'Use ref() for the count',
      'Return an object with count and increment',
      'Call increment() to test it',
    ],
    tags: ['composables', 'composition-api', 'reusability'],
  },

  {
    id: 'fe-vue-v-model-pattern',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Two-Way Binding Pattern',
    text: 'Simulate v-model: create a ref for inputValue starting at "hello", update it to "world", and return the new value.',
    setup: 'Mock ref function provided.',
    setupCode: `const ref = (val) => ({ value: val });`,
    expected: { inputValue: 'world' },
    sample: `const inputValue = ref("hello");
inputValue.value = "world";
({ inputValue: inputValue.value })`,
    hints: [
      'v-model creates two-way binding with a ref',
      'Create a ref with initial value',
      'Update .value property to simulate input change',
    ],
    tags: ['v-model', 'forms', 'two-way-binding'],
  },

  {
    id: 'fe-vue-async-setup',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'hard',
    title: 'Async Data Fetching Pattern',
    text: 'Simulate async data fetching: create a ref for data starting at null, then set it to {id:1,name:"Product"}. Return the final data value.',
    setup: 'Mock ref and a simulated async fetch function.',
    setupCode: `const ref = (val) => ({ value: val });
const fetchData = () => Promise.resolve({id:1,name:"Product"});`,
    expected: { data: { id: 1, name: 'Product' } },
    sample: `const data = ref(null);
fetchData().then(result => { data.value = result; });
// In real async we'd await, but for sync validation:
data.value = {id:1,name:"Product"};
({ data: data.value })`,
    hints: [
      'Create a ref initialized to null',
      'Simulate fetching by setting data.value to the result',
      'Return the final data value',
    ],
    tags: ['async', 'data-fetching', 'promises'],
  },

  {
    id: 'fe-vue-conditional-render',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'Conditional Rendering Logic',
    text: 'Simulate v-if: given isVisible = true and message = "Hello", return the message only if isVisible is true. If false, return null.',
    setup: 'Variables isVisible and message provided.',
    setupCode: `const isVisible = true;
const message = "Hello";`,
    expected: 'Hello',
    sample: 'isVisible ? message : null',
    hints: [
      'Use a ternary operator',
      'v-if conditionally renders based on truthiness',
      'Return message if true, null if false',
    ],
    tags: ['v-if', 'conditional-rendering', 'ternary'],
  },
];
