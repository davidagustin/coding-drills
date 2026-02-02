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
  {
    id: 'vue-q11',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'What is the shorthand for v-on:click in Vue templates?',
    codeSnippet: `<!-- Which is the shorthand? -->
<button v-on:click="handleClick">Click</button>`,
    options: [
      '@click="handleClick"',
      '#click="handleClick"',
      '$click="handleClick"',
      '&click="handleClick"',
    ],
    correctAnswer: '@click="handleClick"',
    explanation:
      'The @ symbol is the shorthand for v-on:. So @click is equivalent to v-on:click. Similarly, @input is shorthand for v-on:input, @submit for v-on:submit, etc.',
  },
  {
    id: 'vue-q12',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'What does the .prevent event modifier do?',
    codeSnippet: `<form @submit.prevent="onSubmit">
  <button type="submit">Submit</button>
</form>`,
    options: [
      'Calls event.preventDefault() automatically',
      'Prevents the event from firing more than once',
      'Prevents the component from re-rendering',
      'Stops event propagation to parent elements',
    ],
    correctAnswer: 'Calls event.preventDefault() automatically',
    explanation:
      'The .prevent modifier calls event.preventDefault() on the triggered event. This is commonly used with form submissions to prevent the default browser reload behavior.',
  },
  {
    id: 'vue-q13',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'What does the .stop event modifier do?',
    codeSnippet: `<div @click="outerClick">
  <button @click.stop="innerClick">Click</button>
</div>`,
    options: [
      'Calls event.stopPropagation() to prevent the event from bubbling up',
      'Prevents the default browser behavior',
      'Stops the component from updating',
      'Removes the event listener after first trigger',
    ],
    correctAnswer: 'Calls event.stopPropagation() to prevent the event from bubbling up',
    explanation:
      'The .stop modifier calls event.stopPropagation(). In this example, clicking the button triggers innerClick but outerClick will NOT fire because propagation is stopped.',
  },
  {
    id: 'vue-q14',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'What does the .capture event modifier do?',
    codeSnippet: `<div @click.capture="handleCapture">
  <button @click="handleClick">Click</button>
</div>`,
    options: [
      'Adds the event listener in capture mode so the parent handler fires before the child',
      'Captures the event object and stores it in a variable',
      'Takes a screenshot of the element when clicked',
      'Prevents the event from reaching child elements',
    ],
    correctAnswer:
      'Adds the event listener in capture mode so the parent handler fires before the child',
    explanation:
      'The .capture modifier uses capture mode (addEventListener with capture: true). Events targeting inner elements are handled by the outer element first, then propagate inward. So handleCapture fires before handleClick.',
  },
  {
    id: 'vue-q15',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'What does the .self event modifier do?',
    codeSnippet: `<div @click.self="handleClick">
  <button>Click me</button>
</div>`,
    options: [
      'Only triggers the handler if event.target is the element itself, not a child',
      'Binds the handler to the component instance (this)',
      'Prevents the event from being emitted to parent components',
      'Makes the event handler a self-invoking function',
    ],
    correctAnswer: 'Only triggers the handler if event.target is the element itself, not a child',
    explanation:
      'The .self modifier ensures the handler only fires when event.target equals the element the listener is attached to. Clicking the button inside the div will NOT trigger handleClick because event.target is the button, not the div.',
  },
  {
    id: 'vue-q16',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'What does the .once event modifier do?',
    codeSnippet: `<button @click.once="doOnce">Click</button>`,
    options: [
      'The event listener fires only once and then is automatically removed',
      'The button can only be clicked once before being disabled',
      'The handler runs synchronously only once per tick',
      'The event is throttled to fire once per second',
    ],
    correctAnswer: 'The event listener fires only once and then is automatically removed',
    explanation:
      'The .once modifier causes the event listener to fire at most once. After the first trigger, the listener is automatically removed. This is equivalent to addEventListener with { once: true }.',
  },
  {
    id: 'vue-q17',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'medium',
    question:
      'How do you access a DOM element directly using template refs in Vue 3 Composition API?',
    codeSnippet: `<template>
  <input ref="inputRef" />
</template>
<script setup>
import { ref, onMounted } from 'vue';
const inputRef = ref(null);
onMounted(() => {
  // How to focus?
});
</script>`,
    options: [
      'inputRef.value.focus()',
      'inputRef.focus()',
      '$refs.inputRef.focus()',
      'this.$refs.inputRef.focus()',
    ],
    correctAnswer: 'inputRef.value.focus()',
    explanation:
      'In Composition API, template refs are declared with ref(null) and accessed via .value. The ref name in the template must match the variable name. After mounting, inputRef.value holds the DOM element.',
  },
  {
    id: 'vue-q18',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'What is nextTick used for in Vue?',
    codeSnippet: `import { nextTick, ref } from 'vue';
const message = ref('Hello');
message.value = 'Updated';
await nextTick();
// DOM is now updated`,
    options: [
      'Waits for the DOM to update after a reactive state change before executing code',
      'Delays code execution by one animation frame',
      'Schedules a callback for the next event loop iteration like setTimeout(fn, 0)',
      'Forces an immediate synchronous re-render of the component',
    ],
    correctAnswer:
      'Waits for the DOM to update after a reactive state change before executing code',
    explanation:
      'Vue batches DOM updates. When you change reactive state, the DOM does not update synchronously. nextTick() returns a promise that resolves after the DOM has been updated, allowing you to read the updated DOM.',
  },
  {
    id: 'vue-q19',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'hard',
    question: 'How do you chain multiple event modifiers in Vue?',
    codeSnippet: `<!-- Which is the correct chaining syntax? -->`,
    options: [
      '@click.stop.prevent="handler"',
      '@click.stop+prevent="handler"',
      '@click.stop,prevent="handler"',
      '@click.stop&prevent="handler"',
    ],
    correctAnswer: '@click.stop.prevent="handler"',
    explanation:
      'Event modifiers can be chained by concatenating them with dots. @click.stop.prevent calls both stopPropagation() and preventDefault(). The order of modifiers matters as they are applied in the same order.',
  },
  {
    id: 'vue-q20',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'How do you listen for a specific key press in Vue?',
    codeSnippet: `<input @keyup.enter="submit" />`,
    options: [
      'Use key modifiers like .enter, .tab, .delete, .esc, .space, .up, .down, .left, .right',
      'Check event.key inside the handler manually',
      'Use a v-key directive with the key name',
      'Use @keypress:enter syntax',
    ],
    correctAnswer:
      'Use key modifiers like .enter, .tab, .delete, .esc, .space, .up, .down, .left, .right',
    explanation:
      'Vue provides key modifiers for common keys. You can use @keyup.enter, @keydown.esc, etc. Vue also supports system modifier keys like .ctrl, .alt, .shift, and .meta for combinations like @keyup.ctrl.enter.',
  },
  {
    id: 'vue-q21',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'hard',
    question: 'What does the .passive event modifier do and when should you use it?',
    codeSnippet: `<div @scroll.passive="onScroll">...</div>`,
    options: [
      'Tells the browser the handler will never call preventDefault(), improving scroll performance',
      'Makes the event handler run in a passive (background) thread',
      'Reduces the frequency of event firing for performance',
      'Prevents the event from triggering any reactive updates',
    ],
    correctAnswer:
      'Tells the browser the handler will never call preventDefault(), improving scroll performance',
    explanation:
      'The .passive modifier maps to addEventListener with { passive: true }. It promises the browser the handler will not call preventDefault(), allowing the browser to optimize scroll/touch performance by not waiting for the handler to complete.',
  },
  {
    id: 'vue-q22',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'How do you emit a custom event from a child component in Vue 3?',
    codeSnippet: `<!-- ChildComponent.vue -->
<script setup>
const emit = defineEmits(['update']);
function handleClick() {
  // How to emit?
}
</script>`,
    options: [
      "emit('update', payload)",
      "this.$emit('update', payload)",
      "$emit('update', payload)",
      "defineEmits.emit('update', payload)",
    ],
    correctAnswer: "emit('update', payload)",
    explanation:
      'In <script setup>, defineEmits returns an emit function. You call it directly: emit(\'eventName\', payload). The parent listens with @update="handler". this.$emit is the Options API approach and is not available in <script setup>.',
  },
  {
    id: 'vue-q23',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'hard',
    question: 'How does component v-model work internally in Vue 3?',
    codeSnippet: `<!-- Parent -->
<MyInput v-model="text" />
<!-- Equivalent to: -->
<MyInput :modelValue="text" @update:modelValue="text = $event" />`,
    options: [
      'v-model on a component binds a modelValue prop and listens for an update:modelValue event',
      'v-model on a component uses two-way data binding via a shared reactive store',
      'v-model on a component directly mutates the parent state from inside the child',
      'v-model on a component creates a synced copy of the data in both parent and child',
    ],
    correctAnswer:
      'v-model on a component binds a modelValue prop and listens for an update:modelValue event',
    explanation:
      'In Vue 3, v-model on a component is syntactic sugar for :modelValue="value" @update:modelValue="value = $event". The child receives modelValue as a prop and emits update:modelValue to communicate changes back.',
  },
  {
    id: 'vue-q24',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'hard',
    question: 'What is the difference between $emit and native DOM events in Vue components?',
    options: [
      '$emit creates Vue custom events that follow component hierarchy, native DOM events bubble through the actual DOM tree',
      '$emit and native DOM events are exactly the same thing',
      'Native DOM events cannot be used inside Vue components',
      '$emit is synchronous while native DOM events are always asynchronous',
    ],
    correctAnswer:
      '$emit creates Vue custom events that follow component hierarchy, native DOM events bubble through the actual DOM tree',
    explanation:
      'Vue custom events via $emit do not bubble -- they only communicate between a child and its direct parent. Native DOM events bubble through the DOM tree. Vue components can listen to native events using the .native modifier (Vue 2) or by inheriting attributes (Vue 3).',
  },
  {
    id: 'vue-q25',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'How do you bind a dynamic attribute in Vue templates?',
    codeSnippet: `<!-- How to dynamically bind the href? -->
<a ???="url">Link</a>`,
    options: [':href="url" or v-bind:href="url"', 'href="{{ url }}"', 'href={url}', '@href="url"'],
    correctAnswer: ':href="url" or v-bind:href="url"',
    explanation:
      'v-bind (shorthand :) dynamically binds an attribute to an expression. :href="url" evaluates the url variable and sets the href attribute. The @ shorthand is for v-on (events), not v-bind.',
  },
  {
    id: 'vue-q26',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'hard',
    question: 'What happens when you use template refs on a component instead of a native element?',
    codeSnippet: `<template>
  <ChildComponent ref="childRef" />
</template>
<script setup>
import { ref, onMounted } from 'vue';
const childRef = ref(null);
onMounted(() => {
  console.log(childRef.value);
});
</script>`,
    options: [
      'The ref holds the component instance, but only properties exposed via defineExpose are accessible',
      'The ref holds the root DOM element of the child component',
      'The ref holds the full component instance with all data and methods',
      'Template refs cannot be used on components, only native elements',
    ],
    correctAnswer:
      'The ref holds the component instance, but only properties exposed via defineExpose are accessible',
    explanation:
      'When using <script setup>, the component is closed by default. The parent ref gets a component instance, but can only access properties explicitly exposed via defineExpose(). Without defineExpose, the ref object will be empty.',
  },
  {
    id: 'vue-q27',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'medium',
    question:
      'How do you listen to a native click event on the root element of a child component in Vue 3?',
    codeSnippet: `<!-- Parent template -->
<ChildComponent @click="handleClick" />`,
    options: [
      'In Vue 3, native event listeners fall through as part of attrs to the component root element automatically',
      'You must use @click.native="handleClick"',
      'Native events cannot be listened to on components',
      'You need to use a wrapper div around the component',
    ],
    correctAnswer:
      'In Vue 3, native event listeners fall through as part of attrs to the component root element automatically',
    explanation:
      'Vue 3 removed the .native modifier. Event listeners that are not declared in emits automatically fall through to the root element of the child component via $attrs. If the child has multiple root nodes, you must bind $attrs explicitly.',
  },
  {
    id: 'vue-q28',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What is the difference between shallowRef and ref?',
    codeSnippet: `const obj = shallowRef({ count: 0 });
obj.value.count = 1; // Does this trigger reactivity?
obj.value = { count: 1 }; // What about this?`,
    options: [
      'shallowRef only tracks .value replacement, not deep property changes; ref tracks all nested changes',
      'shallowRef is the same as ref but uses less memory',
      'shallowRef only works with primitive values',
      'shallowRef tracks changes asynchronously while ref is synchronous',
    ],
    correctAnswer:
      'shallowRef only tracks .value replacement, not deep property changes; ref tracks all nested changes',
    explanation:
      'shallowRef only triggers reactivity when .value itself is replaced. Mutating nested properties (obj.value.count = 1) will NOT trigger updates. You must replace the entire value (obj.value = { count: 1 }) to trigger reactivity.',
  },
  {
    id: 'vue-q29',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What does toRefs do in Vue 3?',
    codeSnippet: `const state = reactive({ foo: 1, bar: 2 });
const { foo, bar } = toRefs(state);`,
    options: [
      'Converts each property of a reactive object into individual refs that stay in sync with the source',
      'Creates a deep copy of the reactive object as plain refs',
      'Converts refs back into a reactive object',
      'Makes all properties of the object readonly',
    ],
    correctAnswer:
      'Converts each property of a reactive object into individual refs that stay in sync with the source',
    explanation:
      'toRefs converts every property of a reactive object into a ref that is connected to the original. This allows destructuring without losing reactivity. Changes to the refs update the original reactive object and vice versa.',
  },
  {
    id: 'vue-q30',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What does toRef do and how does it differ from toRefs?',
    codeSnippet: `const state = reactive({ count: 0 });
const countRef = toRef(state, 'count');`,
    options: [
      'toRef creates a ref for a single property of a reactive object; toRefs does it for all properties',
      'toRef creates a copy while toRefs creates a reference',
      'toRef works only with primitives while toRefs works with objects',
      'There is no difference; toRef is just an alias for toRefs',
    ],
    correctAnswer:
      'toRef creates a ref for a single property of a reactive object; toRefs does it for all properties',
    explanation:
      'toRef(obj, key) creates a ref for a single property that stays synced with the source. toRefs(obj) creates refs for all properties. toRef is useful when you want to pass a single reactive property to a composable.',
  },
  {
    id: 'vue-q31',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    question: 'What does the readonly utility do in Vue 3?',
    codeSnippet: `const original = reactive({ count: 0 });
const copy = readonly(original);
copy.count++; // What happens?`,
    options: [
      'Creates a readonly proxy that warns in development if you try to mutate it',
      'Freezes the object using Object.freeze()',
      'Makes the object immutable permanently with no warnings',
      'Prevents the object from being passed as a prop',
    ],
    correctAnswer: 'Creates a readonly proxy that warns in development if you try to mutate it',
    explanation:
      'readonly() creates a reactive proxy that prevents mutations. In development mode, attempting to mutate triggers a console warning. The readonly copy still reacts to changes in the original reactive source.',
  },
  {
    id: 'vue-q32',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'What does triggerRef do and when would you use it?',
    codeSnippet: `const shallow = shallowRef({ count: 0 });
shallow.value.count = 1;
triggerRef(shallow);`,
    options: [
      'Manually triggers reactivity for a shallowRef after mutating its inner value without replacing .value',
      'Triggers all watchers associated with any ref in the application',
      'Converts a regular ref to a shallowRef',
      'Forces a component re-render regardless of ref changes',
    ],
    correctAnswer:
      'Manually triggers reactivity for a shallowRef after mutating its inner value without replacing .value',
    explanation:
      'triggerRef forces an update notification for a shallowRef. Since shallowRef does not track deep mutations, you can mutate inner properties and then call triggerRef to manually trigger dependent effects and re-renders.',
  },
  {
    id: 'vue-q33',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'What is customRef used for in Vue 3?',
    codeSnippet: `function useDebouncedRef(value, delay = 200) {
  let timeout;
  return customRef((track, trigger) => ({
    get() { track(); return value; },
    set(newValue) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        value = newValue;
        trigger();
      }, delay);
    }
  }));
}`,
    options: [
      'Creates a ref with explicit control over dependency tracking and update triggering',
      'Creates a ref that can only hold custom object types',
      'Creates a ref with a custom serialization format',
      'Creates a readonly ref with a custom getter',
    ],
    correctAnswer:
      'Creates a ref with explicit control over dependency tracking and update triggering',
    explanation:
      'customRef() creates a ref where you control when track() (register dependency) and trigger() (notify dependents) are called. This enables advanced patterns like debounced refs, validated refs, or refs with side effects.',
  },
  {
    id: 'vue-q34',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    question: 'When does the onMounted hook fire?',
    options: [
      'After the component has been mounted and its DOM elements are available',
      'Before the component template is compiled',
      'When the component receives new props',
      'When the component is created but before the DOM is rendered',
    ],
    correctAnswer: 'After the component has been mounted and its DOM elements are available',
    explanation:
      'onMounted is called after the component has been mounted to the DOM. At this point, all child components have also been mounted and the DOM tree is accessible. It is commonly used for DOM manipulation and data fetching.',
  },
  {
    id: 'vue-q35',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What is the difference between onMounted and onBeforeMount?',
    options: [
      'onBeforeMount fires before the DOM is created, onMounted fires after the DOM is available',
      'onBeforeMount is for server-side rendering only',
      'onMounted fires first, then onBeforeMount fires',
      'There is no practical difference between the two hooks',
    ],
    correctAnswer:
      'onBeforeMount fires before the DOM is created, onMounted fires after the DOM is available',
    explanation:
      'onBeforeMount is called right before the component DOM is about to be created -- you cannot access DOM elements yet. onMounted is called after the DOM has been created and inserted, making DOM elements accessible via template refs.',
  },
  {
    id: 'vue-q36',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'When does onUpdated fire and what should you avoid doing inside it?',
    options: [
      'Fires after a reactive state change causes the DOM to update; avoid mutating reactive state inside it to prevent infinite loops',
      'Fires before the DOM updates; you can safely change state inside it',
      'Fires only once when the component first renders',
      'Fires whenever a parent component re-renders, regardless of state changes',
    ],
    correctAnswer:
      'Fires after a reactive state change causes the DOM to update; avoid mutating reactive state inside it to prevent infinite loops',
    explanation:
      'onUpdated is called after any reactive state change causes the component DOM to re-render. Mutating reactive state inside onUpdated can cause an infinite update loop because the state change triggers another update.',
  },
  {
    id: 'vue-q37',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    question: 'What is the purpose of <script setup> in Vue 3?',
    codeSnippet: `<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>`,
    options: [
      'A compile-time syntactic sugar that auto-exposes top-level bindings to the template without a return statement',
      'A way to run setup code on the server before the component loads',
      'A script block that runs only once when the app initializes',
      'A special block for defining global state',
    ],
    correctAnswer:
      'A compile-time syntactic sugar that auto-exposes top-level bindings to the template without a return statement',
    explanation:
      '<script setup> is compile-time sugar for using Composition API. Top-level variables, functions, and imports are automatically available in the template. It produces more concise code and offers better runtime performance and TypeScript inference.',
  },
  {
    id: 'vue-q38',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'What is shallowReactive and how does it differ from reactive?',
    codeSnippet: `const state = shallowReactive({
  nested: { count: 0 }
});
state.nested.count = 1; // Reactive?
state.nested = { count: 1 }; // Reactive?`,
    options: [
      'shallowReactive only makes root-level properties reactive; nested objects are not converted to reactive proxies',
      'shallowReactive freezes nested objects to prevent mutations',
      'shallowReactive and reactive behave identically',
      'shallowReactive converts nested objects to readonly proxies',
    ],
    correctAnswer:
      'shallowReactive only makes root-level properties reactive; nested objects are not converted to reactive proxies',
    explanation:
      'shallowReactive only creates reactivity at the root level. state.nested = newObj triggers updates, but state.nested.count = 1 does NOT because the nested object is a plain (non-reactive) object. Use it for performance optimization with large objects.',
  },
  {
    id: 'vue-q39',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'When does setup() execute relative to lifecycle hooks?',
    options: [
      'setup() runs before any lifecycle hooks, effectively replacing beforeCreate and created',
      'setup() runs after onMounted',
      'setup() runs between onBeforeMount and onMounted',
      'setup() runs simultaneously with all lifecycle hooks',
    ],
    correctAnswer:
      'setup() runs before any lifecycle hooks, effectively replacing beforeCreate and created',
    explanation:
      'setup() is called before the component instance is fully created, between beforeCreate and created in Options API terms. There is no need for beforeCreate or created hooks in Composition API because code in setup() runs at that same timing.',
  },
  {
    id: 'vue-q40',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    question: 'How do you create a reactive primitive value in Vue 3 Composition API?',
    codeSnippet: `// Which creates a reactive primitive?`,
    options: [
      'const count = ref(0)',
      'const count = reactive(0)',
      'const count = computed(0)',
      'const count = observable(0)',
    ],
    correctAnswer: 'const count = ref(0)',
    explanation:
      'ref() is used for reactive primitives (numbers, strings, booleans). reactive() only works with objects and will warn if passed a primitive. ref wraps the value in { value: T } to make it reactive.',
  },
  {
    id: 'vue-q41',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What happens if you destructure a reactive object without using toRefs?',
    codeSnippet: `const state = reactive({ count: 0, name: 'Vue' });
const { count, name } = state;
// Are count and name reactive?`,
    options: [
      'The destructured variables lose reactivity and become plain non-reactive values',
      'The destructured variables remain reactive',
      'Vue throws a runtime error when destructuring reactive objects',
      'The destructured variables become readonly',
    ],
    correctAnswer:
      'The destructured variables lose reactivity and become plain non-reactive values',
    explanation:
      'Destructuring a reactive object breaks the reactive connection. The resulting variables are plain values, not reactive. Use toRefs(state) to destructure while maintaining reactivity: const { count, name } = toRefs(state).',
  },
  {
    id: 'vue-q42',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'How does provide/inject work in Vue 3 Composition API?',
    codeSnippet: `// Parent
provide('theme', ref('dark'));

// Deeply nested child
const theme = inject('theme');`,
    options: [
      'provide makes data available to all descendant components; inject retrieves it without prop drilling',
      'provide/inject creates a global store accessible from any component',
      'provide sends data to parent components and inject receives from children',
      'provide/inject is only for plugins, not regular components',
    ],
    correctAnswer:
      'provide makes data available to all descendant components; inject retrieves it without prop drilling',
    explanation:
      'provide/inject enables dependency injection across the component tree. A parent provides values that any descendant (not just direct children) can inject. If you provide a ref, the injected value remains reactive.',
  },
  {
    id: 'vue-q43',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'easy',
    question: 'What is Teleport used for in Vue 3?',
    codeSnippet: `<Teleport to="body">
  <div class="modal">Modal content</div>
</Teleport>`,
    options: [
      "Renders a component's content in a different DOM location outside its parent hierarchy",
      'Teleports data between components without events',
      'Moves components between routes without re-mounting',
      'Transfers component state to another component instance',
    ],
    correctAnswer:
      "Renders a component's content in a different DOM location outside its parent hierarchy",
    explanation:
      'Teleport renders its slot content into a specified DOM element (via CSS selector) outside the component tree. Useful for modals, tooltips, and toasts that need to break out of parent CSS constraints like overflow:hidden.',
  },
  {
    id: 'vue-q44',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What does KeepAlive do in Vue?',
    codeSnippet: `<KeepAlive>
  <component :is="currentTab" />
</KeepAlive>`,
    options: [
      'Caches inactive component instances instead of destroying them, preserving their state',
      'Keeps the component alive by preventing garbage collection',
      'Ensures the component always stays mounted even during route changes',
      'Prevents the component from being unmounted by parent v-if conditions',
    ],
    correctAnswer:
      'Caches inactive component instances instead of destroying them, preserving their state',
    explanation:
      'KeepAlive caches component instances when they are toggled out, so their state is preserved when toggled back. It adds two lifecycle hooks: onActivated and onDeactivated. You can limit cached instances with max prop.',
  },
  {
    id: 'vue-q45',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'How does Suspense work in Vue 3?',
    codeSnippet: `<Suspense>
  <template #default>
    <AsyncComponent />
  </template>
  <template #fallback>
    <LoadingSpinner />
  </template>
</Suspense>`,
    options: [
      'Suspense shows fallback content while waiting for async dependencies (async setup or async components) to resolve',
      'Suspense catches errors thrown by child components and shows a fallback',
      'Suspense lazy-loads components only when they become visible in the viewport',
      'Suspense pauses rendering until all child components have fetched their data via onMounted',
    ],
    correctAnswer:
      'Suspense shows fallback content while waiting for async dependencies (async setup or async components) to resolve',
    explanation:
      'Suspense handles async dependencies in the component tree. It shows the #fallback slot while waiting for async components or components with async setup() to resolve, then switches to the #default slot. It is still an experimental feature.',
  },
  {
    id: 'vue-q46',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'easy',
    question: 'What does defineProps do in <script setup>?',
    codeSnippet: `<script setup>
const props = defineProps({
  title: String,
  count: { type: Number, default: 0 }
});
</script>`,
    options: [
      'Declares the props that the component accepts, with optional type validation and defaults',
      'Defines global properties accessible by all components',
      'Creates computed properties from external data sources',
      'Defines dynamic properties that change based on route params',
    ],
    correctAnswer:
      'Declares the props that the component accepts, with optional type validation and defaults',
    explanation:
      'defineProps is a compiler macro in <script setup> that declares component props. It supports runtime declaration (object syntax) and type-only declaration (TypeScript generics). It does not need to be imported.',
  },
  {
    id: 'vue-q47',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What does defineExpose do in <script setup>?',
    codeSnippet: `<script setup>
import { ref } from 'vue';
const count = ref(0);
const reset = () => { count.value = 0; };
defineExpose({ count, reset });
</script>`,
    options: [
      'Explicitly exposes properties to the parent component when accessed via template ref',
      'Makes properties available in the template',
      'Exposes properties to all child components via provide',
      'Makes properties accessible in the browser DevTools only',
    ],
    correctAnswer:
      'Explicitly exposes properties to the parent component when accessed via template ref',
    explanation:
      'Components using <script setup> are closed by default. defineExpose explicitly declares which properties the parent can access through a template ref. Without it, the parent ref gets an empty object.',
  },
  {
    id: 'vue-q48',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What are useSlots and useAttrs used for in Vue 3?',
    codeSnippet: `<script setup>
import { useSlots, useAttrs } from 'vue';
const slots = useSlots();
const attrs = useAttrs();
</script>`,
    options: [
      'useSlots provides access to passed slots and useAttrs provides access to fallthrough attributes in <script setup>',
      'useSlots creates new slot outlets and useAttrs defines new attributes',
      'They are used to pass slots and attributes to child components',
      'useSlots and useAttrs are deprecated in favor of defineProps',
    ],
    correctAnswer:
      'useSlots provides access to passed slots and useAttrs provides access to fallthrough attributes in <script setup>',
    explanation:
      'useSlots() returns the slots object (equivalent to this.$slots in Options API). useAttrs() returns the attrs object (equivalent to this.$attrs). These helpers are used in <script setup> when you need programmatic access to slots or fallthrough attributes.',
  },
  {
    id: 'vue-q49',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'Why are composables preferred over mixins in Vue 3?',
    options: [
      'Composables have explicit data flow, no naming conflicts, better TypeScript support, and clear source of values',
      'Composables are faster at runtime than mixins',
      'Mixins are not supported in Vue 3 at all',
      'Composables automatically cache their return values while mixins do not',
    ],
    correctAnswer:
      'Composables have explicit data flow, no naming conflicts, better TypeScript support, and clear source of values',
    explanation:
      'Mixins suffer from unclear source of properties, namespace collisions, and poor TypeScript support. Composables solve all of these: values are explicitly returned and destructured, naming conflicts are impossible, and TypeScript can fully infer types.',
  },
  {
    id: 'vue-q50',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'How do you create a Vue plugin?',
    codeSnippet: `const myPlugin = {
  install(app, options) {
    app.config.globalProperties.$myMethod = () => {};
    app.provide('myKey', options.value);
    app.component('MyGlobal', MyComponent);
  }
};
app.use(myPlugin, { value: 42 });`,
    options: [
      'A plugin is an object with an install method that receives the app instance and options',
      'A plugin is a special component that is mounted at the app root',
      'A plugin is a composable that is imported globally',
      'A plugin is an npm package that extends the Vue prototype',
    ],
    correctAnswer:
      'A plugin is an object with an install method that receives the app instance and options',
    explanation:
      'Vue plugins are objects with an install(app, options) method. Inside install, you can register global components, directives, provide values, or add global properties. Plugins are registered with app.use(plugin, options).',
  },
  {
    id: 'vue-q51',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'easy',
    question: 'How do you define default values for props in <script setup> with TypeScript?',
    codeSnippet: `<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string;
  count?: number;
}>(), {
  count: 0
});
</script>`,
    options: [
      'Use withDefaults() wrapping defineProps with a TypeScript generic type',
      'Pass defaults directly inside the generic type parameter',
      'Use a separate defineDefaults() macro',
      'Defaults cannot be defined when using TypeScript with defineProps',
    ],
    correctAnswer: 'Use withDefaults() wrapping defineProps with a TypeScript generic type',
    explanation:
      'When using TypeScript generics with defineProps, you use the withDefaults() compiler macro to provide default values. This allows full type inference while still supporting default prop values.',
  },
  {
    id: 'vue-q52',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'What is the Pinia store pattern for defining a store with the setup syntax?',
    codeSnippet: `export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const doubled = computed(() => count.value * 2);
  function increment() { count.value++; }
  return { count, doubled, increment };
});`,
    options: [
      'Pass a function (setup store) to defineStore that uses Composition API and returns state, getters, and actions',
      'Use defineStore with an options object containing state, getters, and actions properties',
      'Create a reactive object and export it as the store',
      'Use createPinia() with a store configuration object',
    ],
    correctAnswer:
      'Pass a function (setup store) to defineStore that uses Composition API and returns state, getters, and actions',
    explanation:
      'Pinia supports two syntaxes: options stores (with state/getters/actions) and setup stores (a function using Composition API). Setup stores use ref for state, computed for getters, and functions for actions, returning all of them.',
  },
  {
    id: 'vue-q53',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'How do you provide a reactive value that descendants should not be able to mutate?',
    codeSnippet: `import { provide, readonly, ref } from 'vue';
const count = ref(0);
provide('count', ???);`,
    options: [
      "provide('count', readonly(count)) -- wrap the ref in readonly before providing",
      "provide('count', count.value) -- provide the raw value instead",
      "provide('count', Object.freeze(count)) -- freeze the ref object",
      "provide('count', computed(() => count.value)) -- use a computed ref",
    ],
    correctAnswer: "provide('count', readonly(count)) -- wrap the ref in readonly before providing",
    explanation:
      'Wrapping a reactive value in readonly() before providing it ensures descendants can read and react to changes but cannot mutate it. This enforces one-way data flow, a recommended pattern for provide/inject.',
  },
  {
    id: 'vue-q54',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'easy',
    question: 'What is defineEmits used for in <script setup>?',
    codeSnippet: `<script setup>
const emit = defineEmits(['change', 'update']);
emit('change', newValue);
</script>`,
    options: [
      'Declares the custom events that the component can emit to its parent',
      'Defines global events that any component can listen to',
      'Creates event bus channels for cross-component communication',
      'Defines event handlers for DOM events on the root element',
    ],
    correctAnswer: 'Declares the custom events that the component can emit to its parent',
    explanation:
      'defineEmits is a compiler macro that declares which events a component emits. It returns an emit function used to fire events. Declaring emits also prevents them from falling through to the root element as native event listeners.',
  },
  {
    id: 'vue-q55',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'medium',
    question: "How does Vue's virtual DOM diffing algorithm work at a high level?",
    options: [
      'Vue compares old and new VNode trees, finds minimal changes, and patches only the changed parts of the real DOM',
      'Vue replaces the entire DOM tree on every state change for simplicity',
      'Vue uses a shadow DOM to isolate component updates',
      'Vue diffs the actual DOM against a string template on every render',
    ],
    correctAnswer:
      'Vue compares old and new VNode trees, finds minimal changes, and patches only the changed parts of the real DOM',
    explanation:
      'Vue creates a virtual DOM (VNode tree) representation. On state changes, it creates a new VNode tree, diffs it against the old one, and applies only the necessary DOM mutations. This minimizes expensive real DOM operations.',
  },
  {
    id: 'vue-q56',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'hard',
    question: 'What does the h() function do in Vue 3?',
    codeSnippet: `import { h } from 'vue';
export default {
  render() {
    return h('div', { class: 'container' }, [
      h('h1', 'Hello'),
      h('p', 'World')
    ]);
  }
};`,
    options: [
      'Creates VNodes (virtual DOM nodes) programmatically as an alternative to templates',
      'Hides elements from the DOM similar to v-show',
      'Creates HTML strings for server-side rendering',
      'Hydrates server-rendered HTML into reactive components',
    ],
    correctAnswer:
      'Creates VNodes (virtual DOM nodes) programmatically as an alternative to templates',
    explanation:
      'h() (hyperscript) creates VNodes programmatically. It takes a tag/component, optional props, and children. Render functions using h() provide full JavaScript power for dynamic rendering scenarios that are difficult to express in templates.',
  },
  {
    id: 'vue-q57',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What is the key difference between v-if and v-for when used on the same element?',
    codeSnippet: `<!-- Vue 3: Is this recommended? -->
<li v-for="item in items" v-if="item.active">
  {{ item.name }}
</li>`,
    options: [
      'In Vue 3, v-if has higher priority and cannot access v-for variables; use a computed property or wrap in <template v-for>',
      'v-for has higher priority so it works fine to filter items this way',
      'v-if and v-for cannot be used on the same element and will throw an error',
      'The order depends on which directive is written first in the attribute list',
    ],
    correctAnswer:
      'In Vue 3, v-if has higher priority and cannot access v-for variables; use a computed property or wrap in <template v-for>',
    explanation:
      'In Vue 3 (unlike Vue 2), v-if has higher priority than v-for. This means the v-if condition cannot access the v-for variable. The recommended approach is to use a computed property to pre-filter the list or wrap the v-for in a <template> tag.',
  },
  {
    id: 'vue-q58',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'What are scoped slots used for in Vue?',
    codeSnippet: `<!-- Parent -->
<MyList :items="items">
  <template #default="{ item }">
    <span>{{ item.name }}</span>
  </template>
</MyList>`,
    options: [
      'Allow a parent to customize child rendering while the child provides the data to render',
      'Scope CSS styles to the slot content only',
      'Create isolated scope for slot variables to prevent naming collisions',
      'Pass slot content only to components within the same scope',
    ],
    correctAnswer:
      'Allow a parent to customize child rendering while the child provides the data to render',
    explanation:
      'Scoped slots let a child component pass data back to the parent for rendering. The child defines what data is available (slot props), and the parent decides how to render it. This is a powerful pattern for renderless/headless components.',
  },
  {
    id: 'vue-q59',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What is a dynamic component in Vue and how do you use it?',
    codeSnippet: `<component :is="currentComponent" />`,
    options: [
      'A component that dynamically switches between different components based on the value bound to the :is prop',
      'A component that dynamically generates its template at runtime',
      'A component that loads dynamically from a remote server',
      'A component whose props change dynamically based on user input',
    ],
    correctAnswer:
      'A component that dynamically switches between different components based on the value bound to the :is prop',
    explanation:
      'The <component :is="..."> element dynamically renders different components based on the value of :is (a component name string or component object). Combined with KeepAlive, state can be preserved during switches.',
  },
  {
    id: 'vue-q60',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'How do you define an async component in Vue 3?',
    codeSnippet: `import { defineAsyncComponent } from 'vue';
const AsyncComp = defineAsyncComponent(() =>
  import('./MyComponent.vue')
);`,
    options: [
      'Use defineAsyncComponent with a loader function that returns a dynamic import promise',
      'Use async/await in the component setup function',
      'Add an async: true option to the component definition',
      'Use <Suspense> to wrap any regular component to make it async',
    ],
    correctAnswer:
      'Use defineAsyncComponent with a loader function that returns a dynamic import promise',
    explanation:
      'defineAsyncComponent creates a component that is loaded lazily. It accepts a loader function returning a promise (typically a dynamic import). It also supports options for loading/error components, delay, and timeout.',
  },
  {
    id: 'vue-q61',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'hard',
    question:
      'What are functional components in Vue 3 and how do they differ from stateful components?',
    codeSnippet: `function MyFunctionalComp(props, { slots, emit, attrs }) {
  return h('div', attrs, slots.default());
}
MyFunctionalComp.props = ['msg'];`,
    options: [
      'Functional components are plain functions with no internal state, lifecycle, or instance -- they just receive props and return VNodes',
      'Functional components are components that use only computed properties',
      'Functional components are components defined using the Composition API exclusively',
      'Functional components are components that can only be rendered on the server',
    ],
    correctAnswer:
      'Functional components are plain functions with no internal state, lifecycle, or instance -- they just receive props and return VNodes',
    explanation:
      'In Vue 3, functional components are plain functions. They receive props and a context object (slots, emit, attrs) and return VNodes. They have no instance, no lifecycle hooks, and no reactive state. In Vue 3 the performance difference vs stateful components is negligible.',
  },
  {
    id: 'vue-q62',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'What is the purpose of the <template> tag when used with v-for or v-if?',
    codeSnippet: `<template v-for="item in items" :key="item.id">
  <h2>{{ item.title }}</h2>
  <p>{{ item.body }}</p>
</template>`,
    options: [
      'It acts as an invisible wrapper to apply directives to multiple elements without adding an extra DOM node',
      'It creates a reusable template fragment that can be referenced elsewhere',
      'It defines a slot template for child components',
      'It pre-compiles the HTML for faster rendering',
    ],
    correctAnswer:
      'It acts as an invisible wrapper to apply directives to multiple elements without adding an extra DOM node',
    explanation:
      'The <template> element in Vue is not rendered to the DOM. It serves as an invisible wrapper when you need to apply v-for or v-if to a group of elements without introducing an unnecessary parent element in the output.',
  },
  {
    id: 'vue-q63',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'hard',
    question: "How does Vue's template compiler optimize rendering performance?",
    options: [
      'It marks static content, hoists static VNodes, patches only dynamic bindings, and uses block tree optimization',
      'It converts templates to Web Components for native browser optimization',
      'It pre-renders all possible states and caches them in memory',
      'It compiles templates to Web Assembly for near-native performance',
    ],
    correctAnswer:
      'It marks static content, hoists static VNodes, patches only dynamic bindings, and uses block tree optimization',
    explanation:
      'Vue 3 compiler performs static analysis: it hoists static nodes out of render functions, marks dynamic bindings with patch flags, flattens block trees to skip static children during diffing, and caches event handlers. These reduce the work needed during updates.',
  },
  {
    id: 'vue-q64',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What happens if you use v-for without providing a key attribute?',
    options: [
      'Vue uses an in-place patch strategy which is efficient but can cause issues with component state and transitions',
      'Vue throws a compilation error and refuses to render',
      'Vue automatically generates unique keys based on array index',
      'The list will render but will never update when data changes',
    ],
    correctAnswer:
      'Vue uses an in-place patch strategy which is efficient but can cause issues with component state and transitions',
    explanation:
      'Without keys, Vue patches each element in-place by index. This is efficient for simple lists but can cause problems when items are reordered, because component state (like input values) stays attached to the index position, not the data item.',
  },
  {
    id: 'vue-q65',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'How do you render raw HTML in a Vue template?',
    codeSnippet: `<div v-html="rawHtml"></div>`,
    options: [
      'Use the v-html directive to render a string as raw HTML content',
      'Use {{ }} with the html pipe filter',
      'Use v-text with an html flag',
      'Use the innerHTML prop on the element',
    ],
    correctAnswer: 'Use the v-html directive to render a string as raw HTML content',
    explanation:
      'v-html sets the innerHTML of the element to the given string. It bypasses Vue template compilation. WARNING: Using v-html with user-provided content can lead to XSS attacks. Only use it with trusted content.',
  },
  {
    id: 'vue-q66',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'hard',
    question: 'What is the render function approach vs templates and when would you prefer it?',
    codeSnippet: `export default {
  render() {
    return h('div', [
      this.items.map(item =>
        h(item.isHeader ? 'h1' : 'p', item.text)
      )
    ]);
  }
};`,
    options: [
      'Render functions use h() for full JavaScript flexibility; prefer them for highly dynamic rendering, component libraries, or when template syntax is limiting',
      'Render functions are always faster than templates',
      'Templates are compiled to render functions, so there is no reason to use render functions directly',
      'Render functions are only needed when building Vue itself',
    ],
    correctAnswer:
      'Render functions use h() for full JavaScript flexibility; prefer them for highly dynamic rendering, component libraries, or when template syntax is limiting',
    explanation:
      'Templates compile down to render functions. Writing render functions directly gives full JavaScript control -- useful for dynamic tag names, complex conditional structures, or component libraries. Templates are preferred for most cases due to readability and compiler optimizations.',
  },
  {
    id: 'vue-q67',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What is the difference between v-text and mustache interpolation {{ }}?',
    codeSnippet: `<span v-text="message"></span>
<span>{{ message }}</span>`,
    options: [
      'v-text replaces the entire text content of the element; {{ }} can be used inline with other text',
      'v-text renders HTML while {{ }} renders plain text',
      'There is no functional difference between them',
      '{{ }} is slower because it uses a watcher while v-text uses a computed property',
    ],
    correctAnswer:
      'v-text replaces the entire text content of the element; {{ }} can be used inline with other text',
    explanation:
      'v-text sets the element textContent, replacing all existing content. Mustache {{ }} interpolation can be placed inline: <span>Hello {{ name }}!</span>. Both escape HTML. v-text is rarely used since {{ }} is more flexible.',
  },
  {
    id: 'vue-q68',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'How do you conditionally apply a CSS class in Vue?',
    codeSnippet: `<div :class="{ active: isActive, 'text-danger': hasError }">
  Content
</div>`,
    options: [
      'Use :class with an object where keys are class names and values are boolean expressions',
      'Use v-if to conditionally render elements with different classes',
      'Use a computed property that returns a CSS string',
      'Use the classList directive with conditional expressions',
    ],
    correctAnswer:
      'Use :class with an object where keys are class names and values are boolean expressions',
    explanation:
      'Vue supports object syntax for :class where keys are class names and values are truthy/falsy. It also supports array syntax: :class="[activeClass, errorClass]" and can be combined with static class attributes.',
  },
  {
    id: 'vue-q69',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'easy',
    question: 'What is the most common pattern for fetching data when a component mounts in Vue 3?',
    codeSnippet: `<script setup>
import { ref, onMounted } from 'vue';
const data = ref(null);
const loading = ref(true);

onMounted(async () => {
  const res = await fetch('/api/data');
  data.value = await res.json();
  loading.value = false;
});
</script>`,
    options: [
      'Use onMounted with async/await to fetch data after the component DOM is ready',
      'Use onBeforeMount because it fires before the DOM and is faster',
      'Fetch data in the template expression directly',
      'Use a global beforeEach route guard for all data fetching',
    ],
    correctAnswer: 'Use onMounted with async/await to fetch data after the component DOM is ready',
    explanation:
      'The standard pattern is to fetch data in onMounted. The callback itself cannot be async (the hook is sync), but you can call an async function inside it. Use ref variables for loading and error states alongside the data.',
  },
  {
    id: 'vue-q70',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'How do you use async setup with Suspense for data fetching?',
    codeSnippet: `<!-- MyComponent.vue -->
<script setup>
const res = await fetch('/api/data');
const data = await res.json();
</script>

<!-- Parent -->
<Suspense>
  <MyComponent />
  <template #fallback>Loading...</template>
</Suspense>`,
    options: [
      'Use top-level await in <script setup> and wrap the component with Suspense to show a loading fallback',
      'Suspense automatically detects fetch calls and pauses rendering',
      'You must use a special useSuspense composable to enable this',
      'Async setup is not supported in Vue 3',
    ],
    correctAnswer:
      'Use top-level await in <script setup> and wrap the component with Suspense to show a loading fallback',
    explanation:
      'Top-level await in <script setup> makes the component an async dependency. Suspense detects this and shows the #fallback slot until the async setup resolves. This allows a clean loading pattern without manual loading state management.',
  },
  {
    id: 'vue-q71',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'How do you create a reusable useFetch composable?',
    codeSnippet: `function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);

  fetch(url)
    .then(res => res.json())
    .then(json => { data.value = json; })
    .catch(err => { error.value = err; })
    .finally(() => { loading.value = false; });

  return { data, error, loading };
}`,
    options: [
      'Create a function returning reactive refs for data, error, and loading that trigger the fetch internally',
      'Create a class that extends Vue.Component with fetch logic in mounted',
      'Use a mixin with a fetch method in the created hook',
      'Create a global plugin that intercepts all HTTP requests',
    ],
    correctAnswer:
      'Create a function returning reactive refs for data, error, and loading that trigger the fetch internally',
    explanation:
      'A useFetch composable encapsulates fetching logic and returns reactive state. Any component using it gets reactive data, error, and loading refs. This pattern makes fetch logic reusable and testable across components.',
  },
  {
    id: 'vue-q72',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'easy',
    question: 'How do you handle loading states during data fetching in Vue?',
    codeSnippet: `<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>{{ data }}</div>
</template>`,
    options: [
      'Use reactive boolean refs (loading, error) and conditional rendering with v-if/v-else-if/v-else',
      'Use CSS transitions to show/hide a loading spinner',
      'Use setTimeout to simulate loading states',
      'Use the built-in Vue loading directive v-loading',
    ],
    correctAnswer:
      'Use reactive boolean refs (loading, error) and conditional rendering with v-if/v-else-if/v-else',
    explanation:
      'The standard pattern uses ref booleans for loading and error states, toggling them during the fetch lifecycle. v-if/v-else chains in the template conditionally render the appropriate UI state. This provides a clear user experience.',
  },
  {
    id: 'vue-q73',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'How do you re-fetch data when a reactive dependency changes using a watcher?',
    codeSnippet: `const userId = ref(1);
const userData = ref(null);

watch(userId, async (newId) => {
  const res = await fetch(\`/api/users/\${newId}\`);
  userData.value = await res.json();
}, { immediate: true });`,
    options: [
      'Use watch with the reactive source and { immediate: true } to fetch on mount and on every change',
      'Use watchEffect to automatically detect the dependency',
      'Use onUpdated to detect when userId changes',
      'Use a computed property with async getter',
    ],
    correctAnswer:
      'Use watch with the reactive source and { immediate: true } to fetch on mount and on every change',
    explanation:
      'watch with { immediate: true } executes the callback immediately on setup and then again whenever the watched source changes. This is ideal for fetching data that depends on a reactive parameter like a route param or selected ID.',
  },
  {
    id: 'vue-q74',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'hard',
    question: 'How do you implement debounced data fetching in Vue 3?',
    codeSnippet: `import { ref, watch } from 'vue';

const searchQuery = ref('');
const results = ref([]);
let timeout;

watch(searchQuery, (query) => {
  clearTimeout(timeout);
  timeout = setTimeout(async () => {
    if (query) {
      const res = await fetch(\`/api/search?q=\${query}\`);
      results.value = await res.json();
    }
  }, 300);
});`,
    options: [
      'Use a watcher with a manual setTimeout/clearTimeout debounce (or a debounce utility) to delay the fetch',
      'Use the built-in .debounce modifier on the watcher',
      'Use watchEffect which automatically debounces rapid changes',
      'Use v-model.debounce on the input to delay the reactive update',
    ],
    correctAnswer:
      'Use a watcher with a manual setTimeout/clearTimeout debounce (or a debounce utility) to delay the fetch',
    explanation:
      'Vue does not have a built-in debounce for watchers. The standard approach is to use setTimeout/clearTimeout inside a watcher, or use a utility like lodash debounce or a useDebouncedRef composable. This prevents excessive API calls during rapid input.',
  },
  {
    id: 'vue-q75',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'How do you handle errors in async data fetching with try/catch in Vue 3?',
    codeSnippet: `const data = ref(null);
const error = ref(null);

async function fetchData() {
  try {
    error.value = null;
    const res = await fetch('/api/data');
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    data.value = await res.json();
  } catch (e) {
    error.value = e;
  }
}`,
    options: [
      'Wrap fetch in try/catch, store the error in a reactive ref, and display it conditionally in the template',
      'Use a global error handler registered via app.config.errorHandler',
      'Errors in async functions are automatically caught by Vue and displayed',
      'Use onErrorCaptured lifecycle hook in the fetching component',
    ],
    correctAnswer:
      'Wrap fetch in try/catch, store the error in a reactive ref, and display it conditionally in the template',
    explanation:
      'The standard pattern wraps async calls in try/catch, stores errors in a ref, and renders error UI conditionally. You should also check res.ok for HTTP errors. For global handling, app.config.errorHandler and onErrorCaptured can supplement this.',
  },
  {
    id: 'vue-q76',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'easy',
    question: 'How do you integrate axios with Vue 3 for data fetching?',
    codeSnippet: `import axios from 'axios';
import { ref, onMounted } from 'vue';

const data = ref(null);
onMounted(async () => {
  const response = await axios.get('/api/data');
  data.value = response.data;
});`,
    options: [
      'Import axios and use it directly in composables or lifecycle hooks -- it returns response.data',
      'Register axios as a Vue plugin with app.use(axios)',
      'Use a special vue-axios adapter package',
      'Configure axios in the Vue config before creating the app',
    ],
    correctAnswer:
      'Import axios and use it directly in composables or lifecycle hooks -- it returns response.data',
    explanation:
      'Axios integrates naturally with Vue 3. Simply import it and call axios.get/post/etc in your Composition API code. The response object wraps the data in response.data. Many teams create a configured axios instance for base URL and interceptors.',
  },
  {
    id: 'vue-q77',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'hard',
    question: 'What is the pattern for implementing pagination with data fetching in Vue?',
    codeSnippet: `const page = ref(1);
const items = ref([]);
const totalPages = ref(0);

async function loadPage(p) {
  const res = await fetch(\`/api/items?page=\${p}\`);
  const json = await res.json();
  items.value = json.items;
  totalPages.value = json.totalPages;
}

watch(page, (newPage) => loadPage(newPage), { immediate: true });`,
    options: [
      'Track a reactive page ref, watch it for changes, and fetch the corresponding page of data',
      'Fetch all data at once and slice it in computed properties for each page',
      'Use a built-in Vue pagination component from the core library',
      'Use router query params as the only source of page state',
    ],
    correctAnswer:
      'Track a reactive page ref, watch it for changes, and fetch the corresponding page of data',
    explanation:
      'Server-side pagination uses a reactive page ref. When the page changes (via user interaction), a watcher triggers a new fetch for that page. The response includes the page data and total pages for rendering pagination controls.',
  },
  {
    id: 'vue-q78',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'How does watchEffect differ from watch for reactive data fetching?',
    codeSnippet: `const userId = ref(1);
const data = ref(null);

watchEffect(async () => {
  const res = await fetch(\`/api/users/\${userId.value}\`);
  data.value = await res.json();
});`,
    options: [
      'watchEffect automatically tracks reactive dependencies used inside it and runs immediately; watch requires explicit sources',
      'watchEffect does not support async callbacks',
      'watchEffect only runs once while watch runs on every change',
      'There is no practical difference for data fetching',
    ],
    correctAnswer:
      'watchEffect automatically tracks reactive dependencies used inside it and runs immediately; watch requires explicit sources',
    explanation:
      'watchEffect auto-tracks dependencies (like userId.value) during execution and re-runs when they change. It always runs immediately. watch requires you to declare sources explicitly. For fetching, watchEffect is more concise but does not provide old/new values.',
  },
  {
    id: 'vue-q79',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'hard',
    question:
      'How do you cancel an in-flight request when the component unmounts or the dependency changes?',
    codeSnippet: `const data = ref(null);

watchEffect((onCleanup) => {
  const controller = new AbortController();
  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(json => { data.value = json; });

  onCleanup(() => controller.abort());
});`,
    options: [
      'Use AbortController with the fetch signal option and abort in the watcher cleanup function (onCleanup)',
      'Set a flag variable and check it before updating state',
      'Use clearTimeout to cancel the request',
      'Vue automatically cancels pending requests when components unmount',
    ],
    correctAnswer:
      'Use AbortController with the fetch signal option and abort in the watcher cleanup function (onCleanup)',
    explanation:
      'watchEffect and watch provide an onCleanup callback that runs before the next re-execution and on unmount. Using AbortController with fetch signal allows you to properly cancel in-flight requests, preventing state updates on unmounted components.',
  },
  {
    id: 'vue-q80',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'easy',
    question:
      'What is the purpose of the { immediate: true } option in a watcher used for data fetching?',
    codeSnippet: `watch(searchTerm, fetchResults, { immediate: true });`,
    options: [
      'Executes the watcher callback immediately when the watcher is created, not just on subsequent changes',
      'Makes the watcher respond to changes instantly without batching',
      'Fetches data synchronously instead of asynchronously',
      'Prevents the watcher from being lazy and enables deep watching',
    ],
    correctAnswer:
      'Executes the watcher callback immediately when the watcher is created, not just on subsequent changes',
    explanation:
      'By default, watch is lazy -- it only fires when the source changes. { immediate: true } makes it fire right away with the current value, which is useful for fetching initial data on component mount while also reacting to future changes.',
  },
  {
    id: 'vue-q81',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'hard',
    question: 'What pattern should you use for SSR data fetching in a Vue 3 app with Nuxt?',
    options: [
      'Use useAsyncData or useFetch composables which fetch on the server and serialize state for client hydration',
      'Use onMounted for all data fetching since SSR runs all lifecycle hooks',
      'Use a global store populated before the Vue app mounts',
      'Fetch data in a middleware and pass it to the component via props',
    ],
    correctAnswer:
      'Use useAsyncData or useFetch composables which fetch on the server and serialize state for client hydration',
    explanation:
      'Nuxt 3 provides useAsyncData and useFetch composables that work in SSR. They fetch on the server, serialize the response into the HTML payload, and hydrate on the client without refetching. This ensures SEO-friendly initial loads with no data flash.',
  },
  {
    id: 'vue-q82',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'How do you prevent duplicate fetches when a component re-renders rapidly?',
    options: [
      'Track the latest request with a counter or use AbortController to cancel outdated requests',
      'Vue automatically deduplicates fetch requests',
      'Use v-once on the component to prevent re-rendering',
      'Wrap the fetch in a computed property which caches results',
    ],
    correctAnswer:
      'Track the latest request with a counter or use AbortController to cancel outdated requests',
    explanation:
      'Race conditions occur when multiple fetches are in-flight and an older one resolves after a newer one. Solutions include: incrementing a request counter and ignoring stale responses, using AbortController to cancel previous requests, or using libraries like TanStack Query that handle this automatically.',
  },
  {
    id: 'vue-q83',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'How do you implement optimistic updates in Vue?',
    codeSnippet: `async function toggleLike(postId) {
  // Optimistic update
  const post = posts.value.find(p => p.id === postId);
  post.liked = !post.liked;

  try {
    await axios.post(\`/api/posts/\${postId}/like\`);
  } catch {
    // Revert on failure
    post.liked = !post.liked;
  }
}`,
    options: [
      'Update the local reactive state immediately before the API call, and revert on failure',
      'Wait for the API response before making any UI changes',
      'Use a two-phase commit protocol with the server',
      'Store the optimistic state in localStorage until the server confirms',
    ],
    correctAnswer:
      'Update the local reactive state immediately before the API call, and revert on failure',
    explanation:
      'Optimistic updates improve perceived performance by updating the UI immediately. The API call happens in the background, and if it fails, the local state is reverted. This pattern works well for likes, toggles, and other quick user actions.',
  },
  {
    id: 'vue-q84',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'easy',
    question: 'What does the .lazy modifier do on v-model?',
    codeSnippet: `<input v-model.lazy="message" />`,
    options: [
      'Syncs the value on the change event instead of the input event, updating only when the field loses focus',
      'Delays the sync by 300ms as a built-in debounce',
      'Makes the binding one-way (component to view only)',
      'Lazily initializes the ref only when the input is first focused',
    ],
    correctAnswer:
      'Syncs the value on the change event instead of the input event, updating only when the field loses focus',
    explanation:
      'By default, v-model syncs on every input event (keystroke). The .lazy modifier switches to the change event, which fires when the input loses focus or the user presses Enter. This reduces update frequency for text inputs.',
  },
  {
    id: 'vue-q85',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'easy',
    question: 'What does the .number modifier do on v-model?',
    codeSnippet: `<input v-model.number="age" type="number" />`,
    options: [
      'Automatically parses the input value as a number using parseFloat',
      'Restricts input to only numeric characters',
      'Formats the displayed value with thousand separators',
      'Validates that the input is a valid number and shows an error if not',
    ],
    correctAnswer: 'Automatically parses the input value as a number using parseFloat',
    explanation:
      'The .number modifier applies parseFloat to the input value. If the value cannot be parsed, the raw string is returned. This is useful because HTML inputs always return strings, even with type="number".',
  },
  {
    id: 'vue-q86',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'easy',
    question: 'What does the .trim modifier do on v-model?',
    codeSnippet: `<input v-model.trim="username" />`,
    options: [
      'Automatically trims whitespace from the beginning and end of the input value',
      'Limits the input to a maximum number of characters',
      'Removes all spaces from the input value',
      'Trims the input visually but keeps the original value',
    ],
    correctAnswer: 'Automatically trims whitespace from the beginning and end of the input value',
    explanation:
      'The .trim modifier automatically strips leading and trailing whitespace from the bound value. The user can still type spaces, but the reactive value will have them trimmed. This is useful for username and email fields.',
  },
  {
    id: 'vue-q87',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'How do you implement a custom component that supports v-model in Vue 3?',
    codeSnippet: `<!-- CustomInput.vue -->
<script setup>
defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
</script>
<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>`,
    options: [
      'Accept a modelValue prop and emit update:modelValue events',
      'Use a two-way binding directive inside the component',
      'Implement a .sync modifier on the internal data',
      'Register the component as a form element with Vue',
    ],
    correctAnswer: 'Accept a modelValue prop and emit update:modelValue events',
    explanation:
      'For custom v-model, the component must accept a modelValue prop and emit update:modelValue. The parent uses <CustomInput v-model="value" /> which is sugar for :modelValue="value" @update:modelValue="value = $event".',
  },
  {
    id: 'vue-q88',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'How do you use multiple v-models on a single component in Vue 3?',
    codeSnippet: `<!-- Parent -->
<UserForm
  v-model:first-name="firstName"
  v-model:last-name="lastName"
/>

<!-- UserForm.vue -->
<script setup>
defineProps(['firstName', 'lastName']);
defineEmits(['update:firstName', 'update:lastName']);
</script>`,
    options: [
      'Use v-model:propName syntax for each model, with matching prop names and update:propName events',
      'You can only use one v-model per component in Vue 3',
      'Use an array of v-model values on the component',
      'Pass an object to a single v-model and destructure inside',
    ],
    correctAnswer:
      'Use v-model:propName syntax for each model, with matching prop names and update:propName events',
    explanation:
      'Vue 3 supports multiple v-models using the v-model:name syntax. Each one maps to a named prop and a corresponding update:name event. This replaced the .sync modifier from Vue 2 with a more consistent API.',
  },
  {
    id: 'vue-q89',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'hard',
    question: 'How do you implement form validation with VeeValidate in Vue 3?',
    codeSnippet: `<template>
  <Form @submit="onSubmit">
    <Field name="email" rules="required|email" />
    <ErrorMessage name="email" />
    <button type="submit">Submit</button>
  </Form>
</template>`,
    options: [
      'Use Form and Field components from VeeValidate with declarative validation rules',
      'Use a custom directive v-validate on each input',
      'Register validation rules globally in main.ts and they apply automatically',
      'Use native HTML5 validation attributes which VeeValidate enhances',
    ],
    correctAnswer:
      'Use Form and Field components from VeeValidate with declarative validation rules',
    explanation:
      'VeeValidate 4 (for Vue 3) provides Form, Field, and ErrorMessage components. Field accepts a rules prop (string or function) for validation. VeeValidate also supports Yup/Zod schemas for complex validation. It integrates naturally with Composition API via useForm/useField.',
  },
  {
    id: 'vue-q90',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'How do you handle dynamic form fields in Vue?',
    codeSnippet: `<script setup>
const fields = ref([{ id: 1, value: '' }]);
let nextId = 2;

function addField() {
  fields.value.push({ id: nextId++, value: '' });
}
function removeField(id) {
  fields.value = fields.value.filter(f => f.id !== id);
}
</script>
<template>
  <div v-for="field in fields" :key="field.id">
    <input v-model="field.value" />
    <button @click="removeField(field.id)">Remove</button>
  </div>
  <button @click="addField">Add Field</button>
</template>`,
    options: [
      'Store fields in a reactive array, use v-for with unique keys, and provide add/remove functions',
      'Use a fixed maximum number of inputs and toggle visibility with v-show',
      'Create a new component instance for each field dynamically',
      'Use a single input with comma-separated values',
    ],
    correctAnswer:
      'Store fields in a reactive array, use v-for with unique keys, and provide add/remove functions',
    explanation:
      'Dynamic forms use a reactive array of field objects rendered with v-for. Each field needs a unique key (not array index) for proper DOM recycling. v-model on each input binds to the field object property. Add/remove functions modify the array.',
  },
  {
    id: 'vue-q91',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'hard',
    question: 'How do you handle file uploads in Vue?',
    codeSnippet: `<template>
  <input type="file" @change="handleFile" />
</template>
<script setup>
function handleFile(event) {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  fetch('/api/upload', { method: 'POST', body: formData });
}
</script>`,
    options: [
      'Use a file input with @change handler, access files via event.target.files, and send with FormData',
      'Use v-model on the file input to get the File object directly',
      'Use a special v-file directive for file uploads',
      'Convert the file to base64 and send it as JSON in the request body',
    ],
    correctAnswer:
      'Use a file input with @change handler, access files via event.target.files, and send with FormData',
    explanation:
      'v-model does not work with file inputs. You must use @change to handle file selection, read event.target.files, create a FormData object, and send it via fetch or axios. For drag-and-drop, listen to dragover and drop events.',
  },
  {
    id: 'vue-q92',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'easy',
    question: 'How does v-model work with checkboxes in Vue?',
    codeSnippet: `<input type="checkbox" v-model="isAgreed" />
<!-- For multiple checkboxes -->
<input type="checkbox" value="vue" v-model="frameworks" />
<input type="checkbox" value="react" v-model="frameworks" />`,
    options: [
      'A single checkbox binds to a boolean; multiple checkboxes with the same v-model bind to an array of values',
      'Checkboxes always bind to string values',
      'v-model does not work with checkboxes; use @change instead',
      'Each checkbox requires its own separate v-model variable',
    ],
    correctAnswer:
      'A single checkbox binds to a boolean; multiple checkboxes with the same v-model bind to an array of values',
    explanation:
      'With a single checkbox, v-model binds to a boolean (true/false). When multiple checkboxes share the same v-model, it binds to an array. Checked boxes add their value attribute to the array; unchecked ones are removed.',
  },
  {
    id: 'vue-q93',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'How does v-model work with radio buttons in Vue?',
    codeSnippet: `<input type="radio" value="one" v-model="picked" />
<input type="radio" value="two" v-model="picked" />`,
    options: [
      "All radios with the same v-model bind to a single value matching the selected radio's value attribute",
      'Each radio button needs its own separate v-model variable',
      'v-model on radios binds to a boolean indicating if the radio is checked',
      'Radio buttons require v-bind instead of v-model in Vue',
    ],
    correctAnswer:
      "All radios with the same v-model bind to a single value matching the selected radio's value attribute",
    explanation:
      "Radio buttons with the same v-model share a single reactive value. When a radio is selected, the v-model variable is set to that radio's value attribute. Only one radio in the group can be selected at a time.",
  },
  {
    id: 'vue-q94',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'How do you handle select dropdowns with v-model in Vue?',
    codeSnippet: `<select v-model="selected">
  <option disabled value="">Please select</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>`,
    options: [
      'v-model on select binds to the value of the currently selected option',
      'v-model on select binds to the index of the selected option',
      'You must use @change instead of v-model for select elements',
      'v-model on select only works with the multiple attribute',
    ],
    correctAnswer: 'v-model on select binds to the value of the currently selected option',
    explanation:
      'v-model on a <select> binds the reactive variable to the value of the selected <option>. For multi-select (<select multiple>), v-model binds to an array. A disabled placeholder option with empty value is a common pattern.',
  },
  {
    id: 'vue-q95',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'hard',
    question: 'How does FormKit differ from VeeValidate for Vue form handling?',
    options: [
      'FormKit provides a complete form framework with inputs, validation, schema generation, and styling; VeeValidate focuses on validation logic only',
      'FormKit is faster but only supports simple forms',
      'VeeValidate is deprecated in favor of FormKit',
      'FormKit only works with Vue 2 while VeeValidate supports Vue 3',
    ],
    correctAnswer:
      'FormKit provides a complete form framework with inputs, validation, schema generation, and styling; VeeValidate focuses on validation logic only',
    explanation:
      'FormKit is a full form framework: it provides styled input components, validation, form generation from schemas, and i18n support. VeeValidate focuses specifically on validation and works with any input components. Choose based on whether you want a full framework or just validation.',
  },
  {
    id: 'vue-q96',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'hard',
    question: 'How do you implement custom validation rules for v-model inputs?',
    codeSnippet: `<script setup>
const email = ref('');
const emailError = ref('');

function validateEmail(value) {
  if (!value) return 'Email is required';
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value))
    return 'Invalid email format';
  return '';
}

watch(email, (val) => {
  emailError.value = validateEmail(val);
});
</script>`,
    options: [
      'Use watchers or computed properties to run validation functions on reactive form data and store error messages',
      'Use HTML5 native validation with the pattern attribute exclusively',
      'Override the v-model directive to add validation logic',
      'Use a built-in Vue validation directive v-validate',
    ],
    correctAnswer:
      'Use watchers or computed properties to run validation functions on reactive form data and store error messages',
    explanation:
      'Custom validation uses watchers (or computed properties) to evaluate form values against validation functions. Error messages are stored in reactive refs and displayed conditionally. For complex forms, use VeeValidate or Zod schemas.',
  },
  {
    id: 'vue-q97',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'How do you prevent form submission and validate all fields before submitting?',
    codeSnippet: `<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="name" />
    <span v-if="errors.name">{{ errors.name }}</span>
    <button type="submit">Submit</button>
  </form>
</template>`,
    options: [
      'Use @submit.prevent to stop default submission, validate all fields in the handler, and only proceed if valid',
      'Use the required attribute on all inputs and let the browser handle it',
      'Disable the submit button until all fields pass validation',
      'Use a v-validate directive on the form element',
    ],
    correctAnswer:
      'Use @submit.prevent to stop default submission, validate all fields in the handler, and only proceed if valid',
    explanation:
      'The .prevent modifier stops the default form submission. In the handleSubmit function, validate all fields, populate error refs, and only call the API if there are no errors. This gives full control over validation timing and error display.',
  },
  {
    id: 'vue-q98',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'easy',
    question: 'How do you bind a textarea to reactive data in Vue?',
    codeSnippet: `<textarea v-model="message"></textarea>`,
    options: [
      'Use v-model on the textarea element just like a text input',
      'Use {{ message }} inside the textarea tags',
      'Use :value and @input separately since v-model does not work on textarea',
      'Use v-text on the textarea element',
    ],
    correctAnswer: 'Use v-model on the textarea element just like a text input',
    explanation:
      'v-model works on <textarea> the same way as <input>. It creates two-way binding. Note: interpolation inside textarea (<textarea>{{ msg }}</textarea>) does not work in Vue -- always use v-model instead.',
  },
  {
    id: 'vue-q99',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'hard',
    question: 'How do you implement a custom v-model modifier on a component?',
    codeSnippet: `<!-- Parent -->
<MyInput v-model.capitalize="text" />

<!-- MyInput.vue -->
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
});
const emit = defineEmits(['update:modelValue']);

function onInput(e) {
  let value = e.target.value;
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1);
  }
  emit('update:modelValue', value);
}
</script>`,
    options: [
      'Accept a modelModifiers prop (object of booleans), check for the modifier key, and transform the value before emitting',
      'Register custom modifiers globally via app.directive',
      'Use a special defineModifiers compiler macro',
      'Custom modifiers are not supported on component v-model',
    ],
    correctAnswer:
      'Accept a modelModifiers prop (object of booleans), check for the modifier key, and transform the value before emitting',
    explanation:
      'Vue passes custom v-model modifiers to the component as a modelModifiers prop (e.g., { capitalize: true }). The component checks this object and transforms the value accordingly before emitting. For named v-models, the prop is named argNameModifiers.',
  },
  {
    id: 'vue-q100',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What is the difference between provide/inject and props for passing data?',
    options: [
      'Props pass data one level down; provide/inject passes data to any depth without intermediate components forwarding it',
      'provide/inject is faster than props',
      'Props are reactive but provide/inject values are not',
      'provide/inject replaces props entirely in Vue 3',
    ],
    correctAnswer:
      'Props pass data one level down; provide/inject passes data to any depth without intermediate components forwarding it',
    explanation:
      'Props require each intermediate component to explicitly forward data (prop drilling). provide/inject skips the intermediates -- a parent provides a value and any descendant at any depth can inject it. Both can be reactive if you provide refs.',
  },
  {
    id: 'vue-q101',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'easy',
    question: 'How do you register a component globally in Vue 3?',
    codeSnippet: `import { createApp } from 'vue';
import MyComponent from './MyComponent.vue';

const app = createApp(App);
app.component('MyComponent', MyComponent);
app.mount('#app');`,
    options: [
      'Use app.component(name, component) on the application instance before mounting',
      'Export the component as default and it is automatically global',
      'Add the component to a global components array in vue.config.js',
      'Use Vue.component(name, component) in Vue 3',
    ],
    correctAnswer: 'Use app.component(name, component) on the application instance before mounting',
    explanation:
      'In Vue 3, global components are registered on the app instance via app.component(). Unlike Vue 2 (Vue.component()), this scopes the registration to the specific app. Global components can be used in any template without importing.',
  },
  {
    id: 'vue-q102',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'How do you implement the render slot pattern (renderless/headless components)?',
    codeSnippet: `<!-- MouseTracker.vue (renderless) -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const x = ref(0);
const y = ref(0);

function update(e) { x.value = e.pageX; y.value = e.pageY; }
onMounted(() => window.addEventListener('mousemove', update));
onUnmounted(() => window.removeEventListener('mousemove', update));
</script>
<template>
  <slot :x="x" :y="y" />
</template>`,
    options: [
      'Create a component with only logic (no UI) that exposes data through scoped slots for the parent to render',
      'Create a component that renders nothing and uses provide to share state',
      'Use a mixin to share the logic between components',
      'Create an abstract component using the abstract: true option',
    ],
    correctAnswer:
      'Create a component with only logic (no UI) that exposes data through scoped slots for the parent to render',
    explanation:
      'Renderless (headless) components encapsulate logic and expose data via scoped slots, letting the consumer decide the UI. The component provides behavior (mouse tracking, form handling, etc.) while the parent provides the presentation. In Vue 3, composables often replace this pattern.',
  },
  {
    id: 'vue-q103',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'How does the KeepAlive include/exclude prop work?',
    codeSnippet: `<KeepAlive include="ComponentA,ComponentB">
  <component :is="currentView" />
</KeepAlive>`,
    options: [
      'include/exclude specifies which components to cache by name (string, regex, or array)',
      'include/exclude filters which props are passed to cached components',
      'include adds components to the DOM; exclude removes them',
      'include/exclude controls which lifecycle hooks fire on cached components',
    ],
    correctAnswer:
      'include/exclude specifies which components to cache by name (string, regex, or array)',
    explanation:
      'KeepAlive include/exclude accepts comma-delimited strings, regex, or arrays of component names. Only components whose name matches include (and does not match exclude) will be cached. The max prop limits the number of cached instances.',
  },
  {
    id: 'vue-q104',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What is the purpose of the v-memo directive in Vue 3.2+?',
    codeSnippet: `<div v-for="item in list" :key="item.id" v-memo="[item.selected]">
  <p>{{ item.name }}</p>
  <p>{{ item.selected ? 'Selected' : 'Not selected' }}</p>
</div>`,
    options: [
      'Memoizes the sub-tree rendering, skipping updates unless specified dependencies change',
      'Stores the rendered HTML in memory for faster hydration during SSR',
      'Caches the component instance similar to KeepAlive',
      'Memorizes user interactions for undo/redo functionality',
    ],
    correctAnswer:
      'Memoizes the sub-tree rendering, skipping updates unless specified dependencies change',
    explanation:
      'v-memo accepts a dependency array. If all values match the previous render, the entire sub-tree update is skipped. Combined with v-for, it can dramatically improve performance for large lists where only some items change.',
  },
  {
    id: 'vue-q105',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'What does v-once do?',
    codeSnippet: `<h1 v-once>{{ title }}</h1>`,
    options: [
      'Renders the element/component only once and skips all future updates, treating it as static content',
      'Renders the element only on the first visit to the page',
      'Makes the element respond to only the first user interaction',
      'Applies the binding once and then removes the directive',
    ],
    correctAnswer:
      'Renders the element/component only once and skips all future updates, treating it as static content',
    explanation:
      'v-once renders the element and its children once. After initial render, the element is treated as static content and skipped during updates. Useful for content that never changes, like headers with an initial value.',
  },
  {
    id: 'vue-q106',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'hard',
    question: 'How does Vue 3 handle fragments (multiple root nodes) differently from Vue 2?',
    codeSnippet: `<!-- Vue 3: This is valid -->
<template>
  <h1>Title</h1>
  <p>Paragraph</p>
</template>`,
    options: [
      'Vue 3 supports fragments natively, allowing multiple root nodes without a wrapper; Vue 2 required a single root element',
      'Vue 3 wraps multiple root nodes in a hidden div automatically',
      'Fragments work the same way in both Vue 2 and Vue 3',
      'Vue 3 requires importing a Fragment component to use multiple roots',
    ],
    correctAnswer:
      'Vue 3 supports fragments natively, allowing multiple root nodes without a wrapper; Vue 2 required a single root element',
    explanation:
      'Vue 3 supports multi-root templates (fragments) natively. Vue 2 required every component template to have a single root element. With fragments, you need to explicitly bind $attrs if the component receives fallthrough attributes.',
  },
  {
    id: 'vue-q107',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'easy',
    question: 'What is the difference between fetching in setup vs onMounted?',
    codeSnippet: `// Option A: in setup
const res = await fetch('/api');
const data = ref(await res.json());

// Option B: in onMounted
const data = ref(null);
onMounted(async () => {
  const res = await fetch('/api');
  data.value = await res.json();
});`,
    options: [
      'Setup fetch blocks component rendering (use with Suspense); onMounted fetch happens after DOM is ready and does not block',
      'There is no difference; both execute at the same time',
      'onMounted fetch is always faster because the DOM is ready',
      'Setup fetch runs on the server while onMounted runs only on the client',
    ],
    correctAnswer:
      'Setup fetch blocks component rendering (use with Suspense); onMounted fetch happens after DOM is ready and does not block',
    explanation:
      'Top-level await in setup makes the component async, requiring Suspense. The component will not render until the await resolves. onMounted fetch runs after the component renders, so you need manual loading state. Choose based on your UX preference.',
  },
  {
    id: 'vue-q108',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'hard',
    question: 'How do you implement infinite scroll with data fetching in Vue?',
    codeSnippet: `const items = ref([]);
const page = ref(1);
const loading = ref(false);

async function loadMore() {
  if (loading.value) return;
  loading.value = true;
  const res = await fetch(\`/api/items?page=\${page.value}\`);
  const newItems = await res.json();
  items.value.push(...newItems);
  page.value++;
  loading.value = false;
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) loadMore();
  });
  observer.observe(sentinel.value);
});`,
    options: [
      'Use IntersectionObserver on a sentinel element at the bottom to trigger fetching the next page and appending results',
      'Use the scroll event on window and calculate distance to bottom manually',
      'Use a v-infinite-scroll directive built into Vue',
      'Load all data upfront and render items progressively with requestAnimationFrame',
    ],
    correctAnswer:
      'Use IntersectionObserver on a sentinel element at the bottom to trigger fetching the next page and appending results',
    explanation:
      'IntersectionObserver is the modern approach for infinite scroll. A sentinel element at the bottom triggers loading when it becomes visible. New items are appended to the array. A loading flag prevents duplicate requests. Clean up the observer on unmount.',
  },
  {
    id: 'vue-q109',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    question: 'What does onUnmounted do and what is it commonly used for?',
    options: [
      'Fires when the component is removed from the DOM; used for cleanup like removing event listeners, timers, or subscriptions',
      'Fires before the component is mounted for the first time',
      'Fires when the component data is reset to defaults',
      'Fires when the user navigates away from the page',
    ],
    correctAnswer:
      'Fires when the component is removed from the DOM; used for cleanup like removing event listeners, timers, or subscriptions',
    explanation:
      'onUnmounted is called after the component has been unmounted. Use it to clean up side effects: remove event listeners, clear intervals/timeouts, cancel pending requests, and unsubscribe from stores or observables.',
  },
  {
    id: 'vue-q110',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'What is the difference between ref() and reactive() when used with arrays?',
    codeSnippet: `const listRef = ref([1, 2, 3]);
listRef.value = [4, 5, 6]; // Works

const listReactive = reactive([1, 2, 3]);
// listReactive = [4, 5, 6]; // DOES NOT WORK`,
    options: [
      'ref allows replacing the entire array via .value; reactive cannot be reassigned since the proxy reference would be lost',
      'reactive arrays are faster than ref arrays',
      'ref arrays do not track push/pop operations',
      'There is no difference; both handle arrays identically',
    ],
    correctAnswer:
      'ref allows replacing the entire array via .value; reactive cannot be reassigned since the proxy reference would be lost',
    explanation:
      'With ref, you can replace the entire array: listRef.value = newArray. With reactive, the variable holds the proxy itself; reassigning it loses reactivity. You must mutate in-place (push, splice, etc.) or use Object.assign with reactive objects.',
  },
  {
    id: 'vue-q111',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What are the onActivated and onDeactivated lifecycle hooks used for?',
    codeSnippet: `<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>

<!-- Inside a kept-alive component -->
<script setup>
import { onActivated, onDeactivated } from 'vue';
onActivated(() => { /* re-entered */ });
onDeactivated(() => { /* left but cached */ });
</script>`,
    options: [
      'They fire when a KeepAlive cached component is shown (activated) or hidden (deactivated) instead of mounted/unmounted',
      'They fire when the browser tab becomes visible or hidden',
      'They fire when a component transitions from loading to loaded state',
      'They are used for activating and deactivating form validation',
    ],
    correctAnswer:
      'They fire when a KeepAlive cached component is shown (activated) or hidden (deactivated) instead of mounted/unmounted',
    explanation:
      'Components inside KeepAlive are not unmounted when toggled away; they are deactivated. onActivated fires each time the component becomes visible, onDeactivated when it is hidden. Use these to refresh data or pause timers for cached components.',
  },
  {
    id: 'vue-q112',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'How do you use system modifier keys with event listeners in Vue?',
    codeSnippet: `<!-- Ctrl+Click -->
<button @click.ctrl="handleCtrlClick">Click</button>
<!-- Alt+Enter on input -->
<input @keyup.alt.enter="handleAltEnter" />`,
    options: [
      'Chain system modifiers (.ctrl, .alt, .shift, .meta) with event modifiers or key modifiers',
      'Check event.ctrlKey inside the handler manually; Vue does not support system modifiers',
      'Use a custom directive for keyboard combination handling',
      'Use @keycombo:ctrl+click syntax',
    ],
    correctAnswer:
      'Chain system modifiers (.ctrl, .alt, .shift, .meta) with event modifiers or key modifiers',
    explanation:
      'Vue provides system modifier keys: .ctrl, .alt, .shift, and .meta. They can be combined with other modifiers: @click.ctrl fires only on Ctrl+Click, @keyup.alt.enter fires on Alt+Enter. The .exact modifier ensures ONLY the specified modifiers are pressed.',
  },
];
