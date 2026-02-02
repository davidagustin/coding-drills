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
    sample: `(emit("update", {value:100}), lastEmit)`,
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

  // ─── DOM & Events (17 new problems) ─────────────────────────────

  {
    id: 'fe-vue-event-modifier-stop',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Event Modifier: Stop Propagation',
    text: 'Simulate the .stop modifier by creating a handler that marks an event as stopped. Given a mock event object, call stopPropagation and return whether it was called.',
    setup: 'A mock event with a stopPropagation flag is provided.',
    setupCode: `const event = { stopped: false, stopPropagation() { this.stopped = true; } };`,
    expected: { stopped: true },
    sample: `(event.stopPropagation(), { stopped: event.stopped })`,
    hints: ['.stop modifier calls event.stopPropagation()', 'Call the method on the event object'],
    tags: ['events', 'modifiers', 'stop-propagation'],
  },

  {
    id: 'fe-vue-event-modifier-prevent',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Event Modifier: Prevent Default',
    text: 'Simulate the .prevent modifier. Given a mock event, call preventDefault and return whether it was called.',
    setup: 'A mock event with a preventDefault flag is provided.',
    setupCode: `const event = { prevented: false, preventDefault() { this.prevented = true; } };`,
    expected: { prevented: true },
    sample: `(event.preventDefault(), { prevented: event.prevented })`,
    hints: [
      '.prevent modifier calls event.preventDefault()',
      'Call the method on the event object',
    ],
    tags: ['events', 'modifiers', 'prevent-default'],
  },

  {
    id: 'fe-vue-event-once',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: 'Event Modifier: Once',
    text: 'Simulate the .once modifier: create a handler wrapper that only allows a callback to execute once. Call it 3 times and return the call count.',
    setup: 'No setup needed.',
    setupCode: `const once = (fn) => { let called = false; return (...args) => { if (!called) { called = true; fn(...args); } }; };`,
    expected: { callCount: 1 },
    sample: `let callCount = 0;
const handler = once(() => { callCount++; });
handler(); handler(); handler();
({ callCount })`,
    hints: [
      'The .once modifier ensures a handler fires only once',
      'Use a boolean flag to track first call',
    ],
    tags: ['events', 'modifiers', 'once'],
  },

  {
    id: 'fe-vue-key-modifier',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Keyboard Event Modifier',
    text: 'Simulate @keyup.enter: given a mock keyboard event with key "Enter", check if the key matches and return a result.',
    setup: 'A mock keyboard event is provided.',
    setupCode: `const keyEvent = { key: "Enter" };`,
    expected: { isEnter: true },
    sample: `({ isEnter: keyEvent.key === "Enter" })`,
    hints: ['Vue key modifiers check event.key', 'Compare the key property to "Enter"'],
    tags: ['events', 'keyboard', 'key-modifiers'],
  },

  {
    id: 'fe-vue-event-bus',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: 'Simple Event Bus',
    text: 'Create a simple event bus with on() and emit() methods. Register a handler for "notify", emit with payload "hello", return the received payload.',
    setup: 'No external setup needed.',
    setupCode: `function createEventBus() {
  const listeners = {};
  return {
    on(event, fn) { (listeners[event] = listeners[event] || []).push(fn); },
    emit(event, payload) { (listeners[event] || []).forEach(fn => fn(payload)); }
  };
}`,
    expected: { received: 'hello' },
    sample: `const bus = createEventBus();
let received = null;
bus.on("notify", (val) => { received = val; });
bus.emit("notify", "hello");
({ received })`,
    hints: [
      'An event bus stores listeners by event name',
      'on() registers a handler, emit() calls all handlers',
    ],
    tags: ['events', 'event-bus', 'patterns'],
  },

  {
    id: 'fe-vue-custom-event-emit',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: 'defineEmits Pattern',
    text: 'Use defineEmits to declare events, emit "change" with value 42, and return the emitted event data.',
    setup: 'Mock defineEmits returns an emit function that records calls.',
    setupCode: `const emitLog = [];
const defineEmits = (events) => (event, ...args) => { emitLog.push({ event, args }); };`,
    expected: { event: 'change', args: [42] },
    sample: `const emit = defineEmits(["change"]);
emit("change", 42);
emitLog[0]`,
    hints: [
      'defineEmits declares which events a component can emit',
      'The returned function is used to emit events',
    ],
    tags: ['events', 'defineEmits', 'composition-api'],
  },

  {
    id: 'fe-vue-event-args',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Pass Arguments to Event Handler',
    text: 'Create a handler that receives an item id and action type. Call it with id=5 and action="delete". Return the received arguments.',
    setup: 'No external setup needed.',
    setupCode: `let result = null;`,
    expected: { id: 5, action: 'delete' },
    sample: `const handleAction = (id, action) => { result = { id, action }; };
handleAction(5, "delete");
result`,
    hints: [
      'In Vue templates you can pass arguments inline: @click="handler(id, type)"',
      'The handler receives the arguments directly',
    ],
    tags: ['events', 'arguments', 'handlers'],
  },

  {
    id: 'fe-vue-multiple-events',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: 'Multiple Event Handlers',
    text: 'Simulate attaching multiple handlers to one event. Create two handlers for "click": one increments count, another logs the click. Return both results after triggering.',
    setup: 'Mock event system provided.',
    setupCode: `function createEmitter() {
  const handlers = {};
  return {
    on(evt, fn) { (handlers[evt] = handlers[evt] || []).push(fn); },
    trigger(evt) { (handlers[evt] || []).forEach(fn => fn()); }
  };
}`,
    expected: { count: 1, logged: true },
    sample: `const emitter = createEmitter();
let count = 0;
let logged = false;
emitter.on("click", () => { count++; });
emitter.on("click", () => { logged = true; });
emitter.trigger("click");
({ count, logged })`,
    hints: [
      'Multiple handlers can be attached to the same event',
      'Both handlers fire when the event is triggered',
    ],
    tags: ['events', 'multiple-handlers'],
  },

  {
    id: 'fe-vue-event-debounce',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'hard',
    title: 'Debounced Event Handler',
    text: 'Create a debounce wrapper. When the debounced function is called 3 times immediately, only the last call should execute. Simulate by tracking call count with immediate flush.',
    setup: 'A simplified synchronous debounce mock that only runs the last call.',
    setupCode: `function debounce(fn) {
  let pending = null;
  const debounced = (...args) => { pending = args; };
  debounced.flush = () => { if (pending) { fn(...pending); pending = null; } };
  return debounced;
}`,
    expected: { callCount: 1, lastArg: 'c' },
    sample: `let callCount = 0;
let lastArg = null;
const handler = debounce((val) => { callCount++; lastArg = val; });
handler("a"); handler("b"); handler("c");
handler.flush();
({ callCount, lastArg })`,
    hints: [
      'Debounce delays execution until activity stops',
      'Only the last invocation should actually run',
      'Use flush() to execute the pending call',
    ],
    tags: ['events', 'debounce', 'performance'],
  },

  {
    id: 'fe-vue-event-throttle',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'hard',
    title: 'Throttled Event Handler',
    text: 'Create a throttle wrapper that allows at most one execution. Call it 3 times and verify only the first call executed.',
    setup: 'A simplified synchronous throttle mock.',
    setupCode: `function throttle(fn) {
  let blocked = false;
  return (...args) => { if (!blocked) { blocked = true; fn(...args); } };
}`,
    expected: { callCount: 1, firstArg: 'a' },
    sample: `let callCount = 0;
let firstArg = null;
const handler = throttle((val) => { callCount++; firstArg = val; });
handler("a"); handler("b"); handler("c");
({ callCount, firstArg })`,
    hints: [
      'Throttle limits execution frequency',
      'Only the first call in a period should execute',
    ],
    tags: ['events', 'throttle', 'performance'],
  },

  {
    id: 'fe-vue-parent-child-event',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: 'Parent-Child Communication via Events',
    text: 'Simulate parent-child communication: child emits "update:modelValue" with a new value, parent captures it. Return the value received by parent.',
    setup: 'Mock emit and parent handler.',
    setupCode: `let parentValue = "old";
const onUpdateModelValue = (val) => { parentValue = val; };`,
    expected: { parentValue: 'new' },
    sample: `(onUpdateModelValue("new"), { parentValue })`,
    hints: [
      'Vue uses update:modelValue event for v-model on components',
      'The parent handler receives the new value',
    ],
    tags: ['events', 'parent-child', 'v-model'],
  },

  {
    id: 'fe-vue-native-event-modifier',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: 'Event Modifier: Self',
    text: 'Simulate the .self modifier: handler only fires when event.target equals event.currentTarget. Test with matching and non-matching targets.',
    setup: 'Mock event objects provided.',
    setupCode: `const selfOnly = (fn) => (event) => { if (event.target === event.currentTarget) fn(event); };`,
    expected: { selfCount: 1 },
    sample: `let selfCount = 0;
const handler = selfOnly(() => { selfCount++; });
handler({ target: "btn", currentTarget: "btn" });
handler({ target: "child", currentTarget: "btn" });
({ selfCount })`,
    hints: [
      '.self modifier only fires when target matches currentTarget',
      'It prevents handlers from firing for bubbled events',
    ],
    tags: ['events', 'modifiers', 'self'],
  },

  {
    id: 'fe-vue-inline-handler',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Inline Handler Expression',
    text: 'Simulate an inline handler expression that toggles a boolean. Start with isOpen = false, toggle it, and return the result.',
    setup: 'Mock ref provided.',
    setupCode: `const ref = (val) => ({ value: val });`,
    expected: { isOpen: true },
    sample: `const isOpen = ref(false);
isOpen.value = !isOpen.value;
({ isOpen: isOpen.value })`,
    hints: [
      'Inline handlers in Vue can contain simple expressions',
      'Toggle a boolean with !value',
    ],
    tags: ['events', 'inline-handler', 'toggle'],
  },

  {
    id: 'fe-vue-event-capture',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: 'Event Modifier: Capture',
    text: 'Simulate event capture vs bubble phase. Create a system where capture handlers fire before bubble handlers. Return the execution order.',
    setup: 'Mock event system with capture support.',
    setupCode: `function createCaptureSystem() {
  const captureHandlers = [];
  const bubbleHandlers = [];
  return {
    onCapture(fn) { captureHandlers.push(fn); },
    onBubble(fn) { bubbleHandlers.push(fn); },
    dispatch() { const order = []; captureHandlers.forEach(fn => fn(order)); bubbleHandlers.forEach(fn => fn(order)); return order; }
  };
}`,
    expected: ['capture', 'bubble'],
    sample: `const sys = createCaptureSystem();
sys.onCapture((order) => order.push("capture"));
sys.onBubble((order) => order.push("bubble"));
sys.dispatch()`,
    hints: [
      '.capture modifier uses the capture phase instead of bubble',
      'Capture phase fires before bubble phase',
    ],
    tags: ['events', 'modifiers', 'capture'],
  },

  {
    id: 'fe-vue-event-exact',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: 'Event Modifier: Exact',
    text: 'Simulate the .exact modifier: handler only fires when exactly the specified modifier keys are pressed. Test with ctrl-only vs ctrl+shift.',
    setup: 'Mock event checker provided.',
    setupCode: `const exactModifier = (requiredKeys, fn) => (event) => {
  const eventKeys = Object.keys(event.modifiers).filter(k => event.modifiers[k]).sort();
  const required = [...requiredKeys].sort();
  if (JSON.stringify(eventKeys) === JSON.stringify(required)) fn();
};`,
    expected: { fireCount: 1 },
    sample: `let fireCount = 0;
const handler = exactModifier(["ctrl"], () => { fireCount++; });
handler({ modifiers: { ctrl: true } });
handler({ modifiers: { ctrl: true, shift: true } });
({ fireCount })`,
    hints: [
      '.exact ensures only the specified modifiers are active',
      'Extra modifier keys prevent the handler from firing',
    ],
    tags: ['events', 'modifiers', 'exact'],
  },

  {
    id: 'fe-vue-event-mouse-modifier',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Mouse Button Modifiers',
    text: 'Simulate mouse button modifiers (.left, .right, .middle). Given a click event with button=2 (right click), determine which button was pressed.',
    setup: 'Mock mouse event provided.',
    setupCode: `const mouseEvent = { button: 2 };
const buttonMap = { 0: "left", 1: "middle", 2: "right" };`,
    expected: { button: 'right' },
    sample: `({ button: buttonMap[mouseEvent.button] })`,
    hints: [
      'Mouse button 0 = left, 1 = middle, 2 = right',
      'Vue provides .left, .right, .middle modifiers',
    ],
    tags: ['events', 'mouse', 'modifiers'],
  },

  {
    id: 'fe-vue-event-emit-validate',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'hard',
    title: 'Emit with Validation',
    text: 'Create an emit system where events can have validators. Emit "submit" with value {name:""}. The validator rejects empty names. Return whether the emit succeeded.',
    setup: 'Mock validated emit system.',
    setupCode: `function createValidatedEmitter(validators) {
  return (event, payload) => {
    const validator = validators[event];
    if (validator && !validator(payload)) return { event, success: false };
    return { event, success: true };
  };
}`,
    expected: { event: 'submit', success: false },
    sample: `const emit = createValidatedEmitter({
  submit: (val) => val.name.length > 0
});
emit("submit", { name: "" })`,
    hints: [
      'Vue 3 allows emit validation in defineEmits',
      'Validators return true/false to allow/reject the emit',
    ],
    tags: ['events', 'validation', 'defineEmits'],
  },

  // ─── State & Lifecycle (17 new problems) ────────────────────────

  {
    id: 'fe-vue-ref-unwrap',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'Ref Unwrapping in Reactive',
    text: 'When a ref is nested inside a reactive object, it auto-unwraps. Simulate this: create a reactive object containing a ref, and access the value without .value.',
    setup: 'Mock ref and reactive with auto-unwrap behavior.',
    setupCode: `const ref = (val) => ({ value: val, __isRef: true });
const reactive = (obj) => {
  const result = {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    Object.defineProperty(result, key, {
      get: () => val.__isRef ? val.value : val,
      enumerable: true
    });
  }
  return result;
};`,
    expected: { count: 10 },
    sample: `const state = reactive({ count: ref(10) });
({ count: state.count })`,
    hints: [
      'Refs auto-unwrap when nested inside reactive objects',
      'You access the value directly without .value',
    ],
    tags: ['reactivity', 'ref', 'unwrapping'],
  },

  {
    id: 'fe-vue-shallowref',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'ShallowRef Reactivity',
    text: 'Create a shallowRef that only tracks the .value assignment, not deep changes. Mutate a nested property, then reassign .value. Return both states.',
    setup: 'Mock shallowRef that tracks replacement count.',
    setupCode: `const shallowRef = (val) => {
  let replacements = 0;
  return {
    get value() { return val; },
    set value(newVal) { val = newVal; replacements++; },
    get replacements() { return replacements; }
  };
};`,
    expected: { nested: 'changed', replacements: 1 },
    sample: `const data = shallowRef({ nested: "original" });
data.value.nested = "mutated";
data.value = { nested: "changed" };
({ nested: data.value.nested, replacements: data.replacements })`,
    hints: [
      'shallowRef only triggers on .value replacement',
      'Mutating nested properties does not trigger reactivity',
    ],
    tags: ['reactivity', 'shallowRef', 'shallow'],
  },

  {
    id: 'fe-vue-shallowreactive',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'ShallowReactive Object',
    text: 'Create a shallowReactive object. Only root-level properties are reactive. Return an object showing root and nested property values after mutations.',
    setup: 'Mock shallowReactive.',
    setupCode: `const shallowReactive = (obj) => ({ ...obj });`,
    expected: { name: 'Bob', nested: 'original' },
    sample: `const state = shallowReactive({ name: "Alice", details: { nested: "original" } });
state.name = "Bob";
({ name: state.name, nested: state.details.nested })`,
    hints: [
      'shallowReactive makes only root-level properties reactive',
      'Nested objects are not made reactive',
    ],
    tags: ['reactivity', 'shallowReactive', 'shallow'],
  },

  {
    id: 'fe-vue-readonly-state',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'Readonly Reactive State',
    text: 'Create a readonly wrapper around a reactive object. Attempt to mutate it and return whether the mutation was blocked.',
    setup: 'Mock readonly that freezes the object.',
    setupCode: `const readonly = (obj) => Object.freeze({ ...obj });`,
    expected: { name: 'Alice', frozen: true },
    sample: `const state = readonly({ name: "Alice" });
let frozen = false;
try { state.name = "Bob"; } catch(e) { frozen = true; }
({ name: state.name, frozen })`,
    hints: [
      'readonly() creates a read-only proxy of a reactive object',
      'Mutations should be blocked or warned against',
    ],
    tags: ['reactivity', 'readonly', 'immutability'],
  },

  {
    id: 'fe-vue-toref',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'toRef - Single Property Ref',
    text: 'Use toRef to create a ref linked to a single property of a reactive object. Modify the ref and verify the original object updates.',
    setup: 'Mock toRef implementation.',
    setupCode: `const reactive = (obj) => obj;
const toRef = (obj, key) => ({
  get value() { return obj[key]; },
  set value(val) { obj[key] = val; }
});`,
    expected: { refVal: 30, objVal: 30 },
    sample: `const state = reactive({ age: 25 });
const ageRef = toRef(state, "age");
ageRef.value = 30;
({ refVal: ageRef.value, objVal: state.age })`,
    hints: [
      'toRef creates a ref that syncs with a reactive object property',
      'Changes to the ref update the original object',
    ],
    tags: ['reactivity', 'toRef', 'property-ref'],
  },

  {
    id: 'fe-vue-torefs',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'toRefs - Destructure Reactive',
    text: 'Use toRefs to convert all properties of a reactive object to refs. Destructure and modify one, verify the original updates.',
    setup: 'Mock toRefs implementation.',
    setupCode: `const reactive = (obj) => obj;
const toRefs = (obj) => {
  const result = {};
  for (const key of Object.keys(obj)) {
    result[key] = {
      get value() { return obj[key]; },
      set value(val) { obj[key] = val; }
    };
  }
  return result;
};`,
    expected: { name: 'Bob', original: 'Bob' },
    sample: `const state = reactive({ name: "Alice", age: 25 });
const { name } = toRefs(state);
name.value = "Bob";
({ name: name.value, original: state.name })`,
    hints: [
      'toRefs converts each property to a ref',
      'Useful for destructuring reactive objects without losing reactivity',
    ],
    tags: ['reactivity', 'toRefs', 'destructuring'],
  },

  {
    id: 'fe-vue-unref',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'unref Utility',
    text: 'Use unref to safely get the value from a ref or a plain value. Test with both a ref and a plain number.',
    setup: 'Mock ref and unref.',
    setupCode: `const ref = (val) => ({ value: val, __isRef: true });
const unref = (val) => (val && val.__isRef) ? val.value : val;`,
    expected: { fromRef: 42, fromPlain: 42 },
    sample: `const r = ref(42);
({ fromRef: unref(r), fromPlain: unref(42) })`,
    hints: [
      'unref returns .value if given a ref, otherwise the value itself',
      'It is a safe way to handle both ref and non-ref values',
    ],
    tags: ['reactivity', 'unref', 'utility'],
  },

  {
    id: 'fe-vue-isref',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'isRef Type Guard',
    text: 'Use isRef to check if a value is a ref. Test with a ref and a plain object.',
    setup: 'Mock ref and isRef.',
    setupCode: `const ref = (val) => ({ value: val, __isRef: true });
const isRef = (val) => !!(val && val.__isRef);`,
    expected: { refCheck: true, plainCheck: false },
    sample: `const r = ref(10);
const plain = { value: 10 };
({ refCheck: isRef(r), plainCheck: isRef(plain) })`,
    hints: [
      'isRef returns true only for objects created by ref()',
      'Plain objects with a value property are not refs',
    ],
    tags: ['reactivity', 'isRef', 'type-guard'],
  },

  {
    id: 'fe-vue-triggerref',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'triggerRef - Force Update',
    text: 'Simulate triggerRef: manually trigger watchers on a shallowRef after mutating a nested value.',
    setup: 'Mock shallowRef with watcher support.',
    setupCode: `function createShallowRef(val) {
  const watchers = [];
  return {
    get value() { return val; },
    set value(v) { val = v; watchers.forEach(fn => fn(val)); },
    onTrigger(fn) { watchers.push(fn); },
    trigger() { watchers.forEach(fn => fn(val)); }
  };
}`,
    expected: { triggered: true, value: 'mutated' },
    sample: `const sRef = createShallowRef({ inner: "original" });
let triggered = false;
sRef.onTrigger(() => { triggered = true; });
sRef.value.inner = "mutated";
sRef.trigger();
({ triggered, value: sRef.value.inner })`,
    hints: [
      'triggerRef forces watchers to run on a shallowRef',
      'Useful after mutating nested properties of a shallowRef',
    ],
    tags: ['reactivity', 'triggerRef', 'shallowRef'],
  },

  {
    id: 'fe-vue-customref',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    title: 'customRef - Debounced Ref',
    text: 'Create a customRef that tracks get/set calls. Return the get and set counts after reading once and writing twice.',
    setup: 'Mock customRef factory.',
    setupCode: `function customRef(factory) {
  let value;
  const ref = factory(
    () => { ref._getCount++; },
    () => { ref._setCount++; }
  );
  ref._getCount = 0;
  ref._setCount = 0;
  return ref;
}`,
    expected: { getCount: 1, setCount: 2, value: 'final' },
    sample: `const myRef = customRef((track, trigger) => {
  let val = "initial";
  return {
    get value() { track(); return val; },
    set value(v) { val = v; trigger(); },
    _getCount: 0,
    _setCount: 0
  };
});
myRef.value = "middle";
myRef.value = "final";
const v = myRef.value;
({ getCount: myRef._getCount, setCount: myRef._setCount, value: v })`,
    hints: [
      'customRef gives you control over dependency tracking and triggering',
      'track() is called on get, trigger() on set',
    ],
    tags: ['reactivity', 'customRef', 'advanced'],
  },

  {
    id: 'fe-vue-lifecycle-unmounted',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'Lifecycle Hook: onUnmounted',
    text: 'Use onUnmounted to register a cleanup function. Simulate unmounting and return whether cleanup ran.',
    setup: 'Mock onUnmounted that stores and immediately runs the callback.',
    setupCode: `const onUnmounted = (fn) => fn();`,
    expected: { cleaned: true },
    sample: `let cleaned = false;
onUnmounted(() => { cleaned = true; });
({ cleaned })`,
    hints: [
      'onUnmounted runs when the component is removed from the DOM',
      'Use it for cleanup: remove listeners, clear timers',
    ],
    tags: ['lifecycle', 'onUnmounted', 'cleanup'],
  },

  {
    id: 'fe-vue-lifecycle-beforemount',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'Lifecycle Hook: onBeforeMount',
    text: 'Use onBeforeMount to set initial data before the component mounts. Return the prepared data.',
    setup: 'Mock onBeforeMount that immediately runs the callback.',
    setupCode: `const onBeforeMount = (fn) => fn();`,
    expected: { status: 'preparing' },
    sample: `let status = "idle";
onBeforeMount(() => { status = "preparing"; });
({ status })`,
    hints: [
      'onBeforeMount runs right before the component is mounted',
      'Use it for last-minute data preparation',
    ],
    tags: ['lifecycle', 'onBeforeMount', 'hooks'],
  },

  {
    id: 'fe-vue-lifecycle-order',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'Lifecycle Hook Execution Order',
    text: 'Register onBeforeMount, onMounted, onBeforeUpdate, and onUpdated hooks. Track their execution order and return it.',
    setup: 'Mock lifecycle hooks that run in Vue order.',
    setupCode: `const order = [];
const onBeforeMount = (fn) => { order.push("beforeMount"); fn(); };
const onMounted = (fn) => { order.push("mounted"); fn(); };
const onBeforeUpdate = (fn) => { order.push("beforeUpdate"); fn(); };
const onUpdated = (fn) => { order.push("updated"); fn(); };`,
    expected: ['beforeMount', 'mounted', 'beforeUpdate', 'updated'],
    sample: `(onBeforeMount(() => {}), onMounted(() => {}), onBeforeUpdate(() => {}), onUpdated(() => {}), order)`,
    hints: [
      'Vue lifecycle hooks run in a specific order',
      'beforeMount -> mounted -> beforeUpdate -> updated',
    ],
    tags: ['lifecycle', 'order', 'hooks'],
  },

  {
    id: 'fe-vue-lifecycle-activated',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'KeepAlive Lifecycle: onActivated',
    text: 'Simulate onActivated and onDeactivated hooks for a KeepAlive component. Track activation state.',
    setup: 'Mock KeepAlive lifecycle hooks.',
    setupCode: `const hooks = { activated: false, deactivated: false };
const onActivated = (fn) => { hooks.activated = true; fn(); };
const onDeactivated = (fn) => { hooks.deactivated = true; fn(); };`,
    expected: { activated: true, deactivated: true, visits: 1 },
    sample: `let visits = 0;
onActivated(() => { visits++; });
onDeactivated(() => {});
({ activated: hooks.activated, deactivated: hooks.deactivated, visits })`,
    hints: [
      'onActivated fires when a KeepAlive component becomes active',
      'onDeactivated fires when it is cached but no longer visible',
    ],
    tags: ['lifecycle', 'KeepAlive', 'onActivated'],
  },

  {
    id: 'fe-vue-nexttick',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'nextTick - Post-Update Callback',
    text: 'Use nextTick to run code after a state update. Simulate updating a ref, then reading the value in nextTick.',
    setup: 'Mock nextTick that runs the callback synchronously.',
    setupCode: `const ref = (val) => ({ value: val });
const nextTick = (fn) => fn ? fn() : undefined;`,
    expected: { value: 'updated', afterTick: true },
    sample: `const msg = ref("initial");
msg.value = "updated";
let afterTick = false;
nextTick(() => { afterTick = true; });
({ value: msg.value, afterTick })`,
    hints: [
      'nextTick runs a callback after the DOM has been updated',
      'Use it when you need to access the DOM after a state change',
    ],
    tags: ['lifecycle', 'nextTick', 'async'],
  },

  {
    id: 'fe-vue-effectscope',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    title: 'effectScope - Group Reactive Effects',
    text: 'Create an effectScope that groups multiple watchers. Run them, then stop the scope and verify all watchers are cleaned up.',
    setup: 'Mock effectScope implementation.',
    setupCode: `function effectScope() {
  const effects = [];
  let stopped = false;
  return {
    run(fn) { if (!stopped) { effects.push(fn); fn(); } },
    stop() { stopped = true; effects.length = 0; },
    get active() { return !stopped; },
    get count() { return effects.length; }
  };
}`,
    expected: { ran: 2, afterStop: 0, active: false },
    sample: `const scope = effectScope();
let ran = 0;
scope.run(() => { ran++; });
scope.run(() => { ran++; });
const beforeStop = scope.count;
scope.stop();
({ ran, afterStop: scope.count, active: scope.active })`,
    hints: [
      'effectScope groups reactive effects for collective disposal',
      'Calling stop() cleans up all effects in the scope',
    ],
    tags: ['reactivity', 'effectScope', 'cleanup'],
  },

  {
    id: 'fe-vue-reactive-array',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'Reactive Arrays',
    text: 'Create a reactive array, push items, and use splice. Return the final array state.',
    setup: 'Mock reactive for arrays.',
    setupCode: `const reactive = (arr) => arr;`,
    expected: ['a', 'c', 'd'],
    sample: `const items = reactive(["a", "b", "c"]);
items.splice(1, 1);
items.push("d");
items`,
    hints: [
      'Vue 3 reactive() works with arrays',
      'Array mutation methods like push, splice are reactive',
    ],
    tags: ['reactivity', 'arrays', 'mutation'],
  },

  // ─── Common Patterns (17 new problems) ──────────────────────────

  {
    id: 'fe-vue-computed-writable',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'hard',
    title: 'Writable Computed',
    text: 'Create a writable computed that splits/joins a fullName. Set fullName to "John Doe" and verify firstName and lastName refs update.',
    setup: 'Mock writable computed implementation.',
    setupCode: `const ref = (val) => ({ value: val });
function writableComputed(options) {
  return {
    get value() { return options.get(); },
    set value(val) { options.set(val); }
  };
}`,
    expected: { first: 'John', last: 'Doe', full: 'John Doe' },
    sample: `const firstName = ref("Jane");
const lastName = ref("Smith");
const fullName = writableComputed({
  get: () => firstName.value + " " + lastName.value,
  set: (val) => {
    const parts = val.split(" ");
    firstName.value = parts[0];
    lastName.value = parts[1];
  }
});
fullName.value = "John Doe";
({ first: firstName.value, last: lastName.value, full: fullName.value })`,
    hints: [
      'Writable computed has both get and set',
      'set receives the new value and updates dependencies',
    ],
    tags: ['computed', 'writable', 'advanced'],
  },

  {
    id: 'fe-vue-watcheffect',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'watchEffect - Auto Tracking',
    text: 'Use watchEffect to automatically track dependencies. Create a log that records the current count value.',
    setup: 'Mock watchEffect that runs immediately.',
    setupCode: `const ref = (val) => ({ value: val });
const watchEffect = (fn) => { fn(); return () => {}; };`,
    expected: { log: 'Count is 5' },
    sample: `const count = ref(5);
let log = "";
watchEffect(() => { log = "Count is " + count.value; });
({ log })`,
    hints: [
      'watchEffect runs immediately and re-runs when dependencies change',
      'It automatically tracks any reactive refs accessed inside',
    ],
    tags: ['watch', 'watchEffect', 'auto-tracking'],
  },

  {
    id: 'fe-vue-watch-multiple',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Watch Multiple Sources',
    text: 'Watch two refs simultaneously. When either changes, capture both values. Return the captured values.',
    setup: 'Mock watch that handles array of sources.',
    setupCode: `const ref = (val) => ({ value: val });
const watch = (sources, callback) => {
  if (Array.isArray(sources)) {
    callback(sources.map(s => s.value), sources.map(() => undefined));
  } else {
    callback(sources.value, undefined);
  }
};`,
    expected: { a: 1, b: 2 },
    sample: `const a = ref(1);
const b = ref(2);
let captured = {};
watch([a, b], ([aVal, bVal]) => { captured = { a: aVal, b: bVal }; });
captured`,
    hints: [
      'watch() can take an array of sources',
      'The callback receives arrays of [newValues] and [oldValues]',
    ],
    tags: ['watch', 'multiple-sources', 'reactivity'],
  },

  {
    id: 'fe-vue-watch-deep',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Deep Watch',
    text: 'Simulate deep watching on a nested object. Track when a nested property changes.',
    setup: 'Mock watch with deep option.',
    setupCode: `const reactive = (obj) => obj;
const watch = (source, callback, options) => {
  if (options && options.deep) {
    callback(source, undefined);
  }
};`,
    expected: { detected: true, name: 'Alice' },
    sample: `const state = reactive({ user: { name: "Alice" } });
let detected = false;
let name = "";
watch(state, (val) => { detected = true; name = val.user.name; }, { deep: true });
({ detected, name })`,
    hints: [
      'Pass { deep: true } as the third argument to watch()',
      'Deep watch tracks all nested property changes',
    ],
    tags: ['watch', 'deep', 'nested'],
  },

  {
    id: 'fe-vue-watch-immediate',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'easy',
    title: 'Watch with Immediate',
    text: 'Use watch with { immediate: true } to run the callback immediately. Return the initial captured value.',
    setup: 'Mock watch with immediate support.',
    setupCode: `const ref = (val) => ({ value: val });
const watch = (source, callback, options) => {
  if (options && options.immediate) {
    callback(source.value, undefined);
  }
};`,
    expected: { initial: 'hello' },
    sample: `const msg = ref("hello");
let initial = "";
watch(msg, (val) => { initial = val; }, { immediate: true });
({ initial })`,
    hints: [
      'The immediate option runs the callback right away',
      'Useful for initializing with the current value',
    ],
    tags: ['watch', 'immediate', 'options'],
  },

  {
    id: 'fe-vue-composable-counter',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'useCounter Composable with Reset',
    text: 'Create a useCounter composable with increment, decrement, and reset. Start at 0, increment 3 times, decrement once, then return the count.',
    setup: 'Mock ref provided.',
    setupCode: `const ref = (val) => ({ value: val });`,
    expected: { count: 2 },
    sample: `function useCounter(initial = 0) {
  const count = ref(initial);
  return {
    count,
    increment: () => { count.value++; },
    decrement: () => { count.value--; },
    reset: () => { count.value = initial; }
  };
}
const { count, increment, decrement } = useCounter(0);
increment(); increment(); increment(); decrement();
({ count: count.value })`,
    hints: [
      'Composables return reactive state and methods',
      'Use ref for the internal count state',
    ],
    tags: ['composables', 'useCounter', 'patterns'],
  },

  {
    id: 'fe-vue-composable-toggle',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'easy',
    title: 'useToggle Composable',
    text: 'Create a useToggle composable. Start with false, toggle twice, and return the final value.',
    setup: 'Mock ref provided.',
    setupCode: `const ref = (val) => ({ value: val });`,
    expected: { value: false },
    sample: `function useToggle(initial = false) {
  const state = ref(initial);
  const toggle = () => { state.value = !state.value; };
  return { state, toggle };
}
const { state, toggle } = useToggle(false);
toggle(); toggle();
({ value: state.value })`,
    hints: [
      'A toggle composable flips a boolean value',
      'Two toggles return to the original value',
    ],
    tags: ['composables', 'useToggle', 'boolean'],
  },

  {
    id: 'fe-vue-provide-inject',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Provide/Inject Pattern',
    text: 'Simulate provide/inject: a parent provides a theme value, a child injects it. Return the injected value.',
    setup: 'Mock provide/inject with a shared store.',
    setupCode: `const store = {};
const provide = (key, val) => { store[key] = val; };
const inject = (key, defaultVal) => store[key] !== undefined ? store[key] : defaultVal;`,
    expected: { theme: 'dark' },
    sample: `provide("theme", "dark");
const theme = inject("theme", "light");
({ theme })`,
    hints: [
      'provide() sets a value available to all descendant components',
      'inject() retrieves the value, with an optional default',
    ],
    tags: ['provide', 'inject', 'dependency-injection'],
  },

  {
    id: 'fe-vue-composable-localstorage',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'hard',
    title: 'useLocalStorage Composable',
    text: 'Create a useLocalStorage composable using a mock storage. Set a value, retrieve it, and verify persistence.',
    setup: 'Mock storage backend.',
    setupCode: `const mockStorage = {};
const ref = (val) => ({ value: val });
function useLocalStorage(key, defaultValue) {
  const stored = mockStorage[key];
  const data = ref(stored !== undefined ? JSON.parse(stored) : defaultValue);
  return {
    data,
    save() { mockStorage[key] = JSON.stringify(data.value); },
    load() { const v = mockStorage[key]; if (v !== undefined) data.value = JSON.parse(v); }
  };
}`,
    expected: { saved: 'persisted', loaded: 'persisted' },
    sample: `const { data, save, load } = useLocalStorage("test", "default");
data.value = "persisted";
save();
data.value = "changed";
load();
({ saved: mockStorage["test"].replace(/"/g, ""), loaded: data.value })`,
    hints: [
      'useLocalStorage syncs a ref with localStorage',
      'save() writes to storage, load() reads from storage',
    ],
    tags: ['composables', 'localStorage', 'persistence'],
  },

  {
    id: 'fe-vue-composable-debounce',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'hard',
    title: 'useDebounce Composable',
    text: 'Create a useDebounce composable that delays updating a ref. Simulate with a flush mechanism. Set value 3 times, flush, and return the final debounced value.',
    setup: 'Mock ref and debounce mechanism.',
    setupCode: `const ref = (val) => ({ value: val });
function useDebounce(initial) {
  const value = ref(initial);
  const debounced = ref(initial);
  let pending = null;
  return {
    value,
    debounced,
    update(val) { value.value = val; pending = val; },
    flush() { if (pending !== null) { debounced.value = pending; pending = null; } }
  };
}`,
    expected: { current: 'c', debounced: 'c' },
    sample: `const { value, debounced, update, flush } = useDebounce("init");
update("a"); update("b"); update("c");
flush();
({ current: value.value, debounced: debounced.value })`,
    hints: ['Debounce delays the output value', 'Only the last value is applied on flush'],
    tags: ['composables', 'useDebounce', 'debounce'],
  },

  {
    id: 'fe-vue-defineprops',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'easy',
    title: 'defineProps - Declare Props',
    text: 'Use defineProps to declare component props with types. Return the prop schema.',
    setup: 'Mock defineProps.',
    setupCode: `const defineProps = (schema) => schema;`,
    expected: { title: { type: 'String', required: true }, count: { type: 'Number', default: 0 } },
    sample: `defineProps({
  title: { type: "String", required: true },
  count: { type: "Number", default: 0 }
})`,
    hints: [
      'defineProps declares which props a component accepts',
      'Each prop can have type, required, and default',
    ],
    tags: ['props', 'defineProps', 'composition-api'],
  },

  {
    id: 'fe-vue-defineexpose',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'defineExpose - Expose Component Methods',
    text: 'Use defineExpose to make specific methods available to parent via template ref. Return what is exposed.',
    setup: 'Mock defineExpose.',
    setupCode: `let exposed = null;
const defineExpose = (obj) => { exposed = obj; };
const ref = (val) => ({ value: val });`,
    expected: { hasReset: true, hasFocus: true },
    sample: `const count = ref(0);
defineExpose({
  reset: () => { count.value = 0; },
  focus: () => "focused"
});
({ hasReset: typeof exposed.reset === "function", hasFocus: typeof exposed.focus === "function" })`,
    hints: [
      'defineExpose makes methods/properties available to parent via ref',
      'Only exposed members are accessible from outside',
    ],
    tags: ['defineExpose', 'composition-api', 'components'],
  },

  {
    id: 'fe-vue-watch-cleanup',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'hard',
    title: 'Watch Cleanup Function',
    text: 'Use the onCleanup parameter in watch to register cleanup logic. Simulate a watch that cleans up before re-running.',
    setup: 'Mock watch with onCleanup support.',
    setupCode: `const ref = (val) => ({ value: val });
const watch = (source, callback) => {
  let cleanupFn = null;
  const onCleanup = (fn) => { cleanupFn = fn; };
  callback(source.value, undefined, onCleanup);
  return { cleanup: () => cleanupFn && cleanupFn() };
};`,
    expected: { cleaned: true, value: 5 },
    sample: `const num = ref(5);
let cleaned = false;
const watcher = watch(num, (val, oldVal, onCleanup) => {
  onCleanup(() => { cleaned = true; });
});
watcher.cleanup();
({ cleaned, value: num.value })`,
    hints: [
      'The third argument to watch callback is onCleanup',
      'Register a function to run before the next watch execution',
    ],
    tags: ['watch', 'cleanup', 'side-effects'],
  },

  {
    id: 'fe-vue-computed-chain',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Chained Computed Properties',
    text: 'Create a chain of computed properties: price -> taxed price -> formatted price. Return the formatted result.',
    setup: 'Mock ref and computed.',
    setupCode: `const ref = (val) => ({ value: val });
const computed = (fn) => ({ get value() { return fn(); } });`,
    expected: { formatted: '$11.50' },
    sample: `const price = ref(10);
const taxRate = ref(0.15);
const taxedPrice = computed(() => price.value * (1 + taxRate.value));
const formatted = computed(() => "$" + taxedPrice.value.toFixed(2));
({ formatted: formatted.value })`,
    hints: [
      'Computed properties can depend on other computed properties',
      'They form a dependency chain that auto-updates',
    ],
    tags: ['computed', 'chain', 'derived-state'],
  },

  {
    id: 'fe-vue-composable-mouse',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'useMouse Composable',
    text: 'Create a useMouse composable that tracks x and y coordinates. Simulate a mouse move to (100, 200) and return the position.',
    setup: 'Mock ref and event system.',
    setupCode: `const ref = (val) => ({ value: val });
function useMouse() {
  const x = ref(0);
  const y = ref(0);
  const update = (newX, newY) => { x.value = newX; y.value = newY; };
  return { x, y, update };
}`,
    expected: { x: 100, y: 200 },
    sample: `const { x, y, update } = useMouse();
update(100, 200);
({ x: x.value, y: y.value })`,
    hints: [
      'useMouse tracks the current mouse position',
      'In real code, it adds a mousemove event listener',
    ],
    tags: ['composables', 'useMouse', 'events'],
  },

  {
    id: 'fe-vue-watch-stop',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Stop a Watcher',
    text: 'Create a watch that returns a stop function. Verify that after stopping, the callback no longer fires.',
    setup: 'Mock watch with stop support.',
    setupCode: `const ref = (val) => ({ value: val });
function watch(source, callback) {
  let active = true;
  const run = () => { if (active) callback(source.value, undefined); };
  run();
  return () => { active = false; };
}`,
    expected: { count: 1 },
    sample: `const num = ref(10);
let count = 0;
const stop = watch(num, () => { count++; });
stop();
({ count })`,
    hints: [
      'watch() returns a stop function',
      'Calling it stops the watcher from reacting to changes',
    ],
    tags: ['watch', 'stop', 'cleanup'],
  },

  {
    id: 'fe-vue-composable-previous',
    framework: 'vue',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'usePrevious Composable',
    text: 'Create a usePrevious composable that tracks the previous value of a ref. Update the value twice and return both current and previous.',
    setup: 'Mock ref and watch.',
    setupCode: `const ref = (val) => ({ value: val });
function usePrevious(source) {
  const previous = ref(undefined);
  let current = source.value;
  return {
    previous,
    update(newVal) {
      previous.value = current;
      current = newVal;
      source.value = newVal;
    }
  };
}`,
    expected: { current: 'c', previous: 'b' },
    sample: `const val = ref("a");
const { previous, update } = usePrevious(val);
update("b");
update("c");
({ current: val.value, previous: previous.value })`,
    hints: [
      'usePrevious stores the previous value before each update',
      'Useful for comparing old and new values',
    ],
    tags: ['composables', 'usePrevious', 'patterns'],
  },

  // ─── Rendering (17 new problems) ────────────────────────────────

  {
    id: 'fe-vue-render-h',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'Render Function with h()',
    text: 'Use the h() function to create a virtual node for a div with class "container" and text "Hello". Return the vnode structure.',
    setup: 'Mock h() function.',
    setupCode: `const h = (tag, props, children) => ({ tag, props: props || {}, children: children || null });`,
    expected: { tag: 'div', props: { class: 'container' }, children: 'Hello' },
    sample: `h("div", { class: "container" }, "Hello")`,
    hints: ['h() creates virtual DOM nodes', 'Arguments: tag, props, children'],
    tags: ['rendering', 'h', 'vnode'],
  },

  {
    id: 'fe-vue-render-nested',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'Nested Render Functions',
    text: 'Create nested vnodes: a ul containing two li items. Return the vnode tree.',
    setup: 'Mock h() function.',
    setupCode: `const h = (tag, props, children) => ({ tag, props: props || {}, children: children || null });`,
    expected: {
      tag: 'ul',
      props: {},
      children: [
        { tag: 'li', props: {}, children: 'Item 1' },
        { tag: 'li', props: {}, children: 'Item 2' },
      ],
    },
    sample: `h("ul", {}, [h("li", {}, "Item 1"), h("li", {}, "Item 2")])`,
    hints: ['Children can be an array of vnodes', 'Nest h() calls for tree structures'],
    tags: ['rendering', 'h', 'nested', 'vnode'],
  },

  {
    id: 'fe-vue-vfor-key',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'v-for with Key Mapping',
    text: 'Simulate v-for rendering with keys: map an array of items to vnode-like objects with key properties.',
    setup: 'Items array provided.',
    setupCode: `const items = [{ id: 1, text: "A" }, { id: 2, text: "B" }, { id: 3, text: "C" }];`,
    expected: [
      { key: 1, text: 'A' },
      { key: 2, text: 'B' },
      { key: 3, text: 'C' },
    ],
    sample: `items.map(item => ({ key: item.id, text: item.text }))`,
    hints: ['v-for should always have a :key binding', 'Map each item to include a key property'],
    tags: ['v-for', 'key', 'rendering'],
  },

  {
    id: 'fe-vue-vshow-logic',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'v-show vs v-if Logic',
    text: 'Simulate the difference between v-show and v-if. v-show toggles display, v-if removes from DOM. Return both element states when hidden.',
    setup: 'Mock element representations.',
    setupCode: `const vShow = (visible) => ({ inDOM: true, display: visible ? "block" : "none" });
const vIf = (condition) => condition ? { inDOM: true, display: "block" } : { inDOM: false, display: null };`,
    expected: { vShow: { inDOM: true, display: 'none' }, vIf: { inDOM: false, display: null } },
    sample: `({ vShow: vShow(false), vIf: vIf(false) })`,
    hints: [
      'v-show keeps the element in DOM but hides it with CSS',
      'v-if completely removes the element from DOM',
    ],
    tags: ['v-show', 'v-if', 'rendering'],
  },

  {
    id: 'fe-vue-slots-default',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'Default Slot Content',
    text: 'Simulate a component with a default slot. If no content is provided, use fallback text. Return the rendered content.',
    setup: 'Mock slot rendering.',
    setupCode: `function renderSlot(slotContent, fallback) {
  return slotContent !== undefined ? slotContent : fallback;
}`,
    expected: { withContent: 'Custom', withFallback: 'Default text' },
    sample: `({
  withContent: renderSlot("Custom", "Default text"),
  withFallback: renderSlot(undefined, "Default text")
})`,
    hints: [
      'Slots allow parent to inject content into child components',
      'Default slot has fallback content when nothing is provided',
    ],
    tags: ['slots', 'default', 'rendering'],
  },

  {
    id: 'fe-vue-slots-named',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'Named Slots',
    text: 'Simulate named slots: a layout component with "header", "default", and "footer" slots. Render all three.',
    setup: 'Mock named slot system.',
    setupCode: `function renderLayout(slots) {
  return {
    header: slots.header || "Default Header",
    content: slots.default || "Default Content",
    footer: slots.footer || "Default Footer"
  };
}`,
    expected: { header: 'My Header', content: 'Body text', footer: 'Default Footer' },
    sample: `renderLayout({ header: "My Header", default: "Body text" })`,
    hints: [
      'Named slots use the #slotName syntax in templates',
      'Each slot can have its own fallback content',
    ],
    tags: ['slots', 'named', 'layout'],
  },

  {
    id: 'fe-vue-slots-scoped',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'hard',
    title: 'Scoped Slots',
    text: 'Simulate a scoped slot: a list component passes each item to its slot function. The slot renders custom content per item.',
    setup: 'Mock scoped slot rendering.',
    setupCode: `function renderList(items, slotFn) {
  return items.map(item => slotFn(item));
}`,
    expected: ['[1] Apple', '[2] Banana', '[3] Cherry'],
    sample: `renderList(
  [{ id: 1, name: "Apple" }, { id: 2, name: "Banana" }, { id: 3, name: "Cherry" }],
  (item) => "[" + item.id + "] " + item.name
)`,
    hints: [
      'Scoped slots pass data from child back to parent',
      'The parent provides a function that receives slot props',
    ],
    tags: ['slots', 'scoped', 'rendering'],
  },

  {
    id: 'fe-vue-dynamic-component',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'Dynamic Component Rendering',
    text: 'Simulate the <component :is="..."> pattern. Given a component map and a current component name, render the appropriate component.',
    setup: 'Mock component map.',
    setupCode: `const components = {
  Home: () => ({ type: "Home", content: "Welcome" }),
  About: () => ({ type: "About", content: "About us" }),
  Contact: () => ({ type: "Contact", content: "Get in touch" })
};`,
    expected: { type: 'About', content: 'About us' },
    sample: `const currentComponent = "About";
components[currentComponent]()`,
    hints: [
      '<component :is="name"> renders different components dynamically',
      'Map component names to their render functions',
    ],
    tags: ['dynamic-component', 'is', 'rendering'],
  },

  {
    id: 'fe-vue-transition-classes',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'Transition Classes',
    text: 'Simulate Vue transition classes. Given a transition name "fade", generate the six transition class names.',
    setup: 'No external setup needed.',
    setupCode: `function transitionClasses(name) {
  return {
    enterFrom: name + "-enter-from",
    enterActive: name + "-enter-active",
    enterTo: name + "-enter-to",
    leaveFrom: name + "-leave-from",
    leaveActive: name + "-leave-active",
    leaveTo: name + "-leave-to"
  };
}`,
    expected: {
      enterFrom: 'fade-enter-from',
      enterActive: 'fade-enter-active',
      enterTo: 'fade-enter-to',
      leaveFrom: 'fade-leave-from',
      leaveActive: 'fade-leave-active',
      leaveTo: 'fade-leave-to',
    },
    sample: `transitionClasses("fade")`,
    hints: [
      'Vue transitions apply 6 classes during enter/leave',
      'Each is prefixed with the transition name',
    ],
    tags: ['transition', 'classes', 'animation'],
  },

  {
    id: 'fe-vue-vfor-index',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'v-for with Index',
    text: 'Simulate v-for with index: map an array of names to objects with index and name.',
    setup: 'Names array provided.',
    setupCode: `const names = ["Alice", "Bob", "Charlie"];`,
    expected: [
      { index: 0, name: 'Alice' },
      { index: 1, name: 'Bob' },
      { index: 2, name: 'Charlie' },
    ],
    sample: `names.map((name, index) => ({ index, name }))`,
    hints: ['v-for provides (item, index) in the template', 'Use .map with both parameters'],
    tags: ['v-for', 'index', 'rendering'],
  },

  {
    id: 'fe-vue-vfor-object',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'v-for over Object',
    text: 'Simulate v-for over an object: iterate over key-value pairs and return them as an array.',
    setup: 'Object provided.',
    setupCode: `const config = { theme: "dark", lang: "en", debug: "false" };`,
    expected: [
      { key: 'theme', value: 'dark' },
      { key: 'lang', value: 'en' },
      { key: 'debug', value: 'false' },
    ],
    sample: `Object.entries(config).map(([key, value]) => ({ key, value }))`,
    hints: [
      'v-for can iterate over object properties',
      'Use Object.entries() to get key-value pairs',
    ],
    tags: ['v-for', 'object', 'rendering'],
  },

  {
    id: 'fe-vue-render-conditional-list',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'Conditional List Rendering',
    text: 'Simulate rendering a list only when it has items. If empty, render a "No items" message. Test with both cases.',
    setup: 'Mock rendering functions.',
    setupCode: `function renderListOrEmpty(items) {
  if (items.length === 0) return { type: "empty", text: "No items" };
  return { type: "list", items: items.map(i => i.name) };
}`,
    expected: {
      filled: { type: 'list', items: ['A', 'B'] },
      empty: { type: 'empty', text: 'No items' },
    },
    sample: `({
  filled: renderListOrEmpty([{ name: "A" }, { name: "B" }]),
  empty: renderListOrEmpty([])
})`,
    hints: ['Check array length before rendering', 'Show fallback content when list is empty'],
    tags: ['rendering', 'conditional', 'list'],
  },

  {
    id: 'fe-vue-teleport',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'Teleport Simulation',
    text: 'Simulate Teleport: render content at a target location outside the component tree. Return the teleported content and target.',
    setup: 'Mock Teleport.',
    setupCode: `function teleport(to, content) {
  return { target: to, content, teleported: true };
}`,
    expected: { target: '#modal', content: 'Modal content', teleported: true },
    sample: `teleport("#modal", "Modal content")`,
    hints: [
      'Teleport renders content at a different DOM location',
      'The "to" prop specifies the target selector',
    ],
    tags: ['teleport', 'rendering', 'portal'],
  },

  {
    id: 'fe-vue-fragment',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'Fragment - Multiple Root Nodes',
    text: 'Vue 3 supports multiple root nodes (fragments). Simulate returning multiple elements from a component render.',
    setup: 'Mock fragment rendering.',
    setupCode: `const h = (tag, props, children) => ({ tag, props: props || {}, children: children || null });`,
    expected: [
      { tag: 'h1', props: {}, children: 'Title' },
      { tag: 'p', props: {}, children: 'Body' },
    ],
    sample: `[h("h1", {}, "Title"), h("p", {}, "Body")]`,
    hints: [
      'Vue 3 components can have multiple root elements',
      'Return an array of vnodes for fragments',
    ],
    tags: ['fragment', 'multi-root', 'rendering'],
  },

  {
    id: 'fe-vue-keepalive',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'hard',
    title: 'KeepAlive Caching',
    text: 'Simulate KeepAlive component caching. Switch between components and verify that cached state is preserved.',
    setup: 'Mock KeepAlive cache system.',
    setupCode: `function createKeepAlive() {
  const cache = {};
  return {
    activate(name, state) {
      if (cache[name]) return cache[name];
      cache[name] = state;
      return state;
    },
    deactivate(name) { /* state stays in cache */ },
    getCached(name) { return cache[name] || null; },
    get cacheSize() { return Object.keys(cache).length; }
  };
}`,
    expected: { restored: { count: 5 }, cacheSize: 2 },
    sample: `const keepAlive = createKeepAlive();
keepAlive.activate("CompA", { count: 5 });
keepAlive.activate("CompB", { text: "hello" });
keepAlive.deactivate("CompA");
const restored = keepAlive.activate("CompA", { count: 0 });
({ restored, cacheSize: keepAlive.cacheSize })`,
    hints: ['KeepAlive caches component instances', 'Cached state is restored when switching back'],
    tags: ['KeepAlive', 'caching', 'rendering'],
  },

  {
    id: 'fe-vue-vfor-range',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'v-for with Range',
    text: 'Simulate v-for with a numeric range: generate numbers 1 through 5.',
    setup: 'No external setup needed.',
    setupCode: `const range = (n) => Array.from({ length: n }, (_, i) => i + 1);`,
    expected: [1, 2, 3, 4, 5],
    sample: `range(5)`,
    hints: ['v-for="n in 5" iterates from 1 to 5', 'Use Array.from to generate the range'],
    tags: ['v-for', 'range', 'rendering'],
  },

  {
    id: 'fe-vue-render-class-binding',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'Dynamic Class Binding',
    text: 'Simulate Vue class binding with object and array syntax. Given isActive=true and hasError=false, compute the class string.',
    setup: 'Mock class binding helpers.',
    setupCode: `function objectClass(obj) {
  return Object.entries(obj).filter(([, v]) => v).map(([k]) => k).join(" ");
}
function arrayClass(arr) {
  return arr.filter(Boolean).join(" ");
}`,
    expected: { objectResult: 'active', arrayResult: 'base active' },
    sample: `({
  objectResult: objectClass({ active: true, error: false }),
  arrayResult: arrayClass(["base", true && "active", false && "error"])
})`,
    hints: [
      'Object syntax: truthy values include the class name',
      'Array syntax: falsy entries are filtered out',
    ],
    tags: ['rendering', 'class-binding', 'dynamic'],
  },

  // ─── Data Fetching (17 new problems) ────────────────────────────

  {
    id: 'fe-vue-fetch-loading',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'easy',
    title: 'Loading State Pattern',
    text: 'Create a data fetching pattern with loading state. Start loading, set data, stop loading. Return the final state.',
    setup: 'Mock ref provided.',
    setupCode: `const ref = (val) => ({ value: val });`,
    expected: { loading: false, data: 'fetched', error: null },
    sample: `const loading = ref(true);
const data = ref(null);
const error = ref(null);
data.value = "fetched";
loading.value = false;
({ loading: loading.value, data: data.value, error: error.value })`,
    hints: [
      'Track loading, data, and error states separately',
      'Set loading to false when data arrives',
    ],
    tags: ['data-fetching', 'loading', 'state'],
  },

  {
    id: 'fe-vue-fetch-error',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'easy',
    title: 'Error State Pattern',
    text: 'Simulate a failed data fetch. Set the error state and ensure loading is false. Return the final state.',
    setup: 'Mock ref provided.',
    setupCode: `const ref = (val) => ({ value: val });`,
    expected: { loading: false, data: null, error: 'Network error' },
    sample: `const loading = ref(true);
const data = ref(null);
const error = ref(null);
error.value = "Network error";
loading.value = false;
({ loading: loading.value, data: data.value, error: error.value })`,
    hints: ['On error, set the error ref and stop loading', 'Data should remain null on failure'],
    tags: ['data-fetching', 'error', 'state'],
  },

  {
    id: 'fe-vue-usefetch',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'useFetch Composable',
    text: 'Create a useFetch composable that manages loading, data, and error states. Simulate a successful fetch.',
    setup: 'Mock ref and fetch.',
    setupCode: `const ref = (val) => ({ value: val });
function useFetch(fetchFn) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);
  try {
    data.value = fetchFn();
    loading.value = false;
  } catch(e) {
    error.value = e.message;
    loading.value = false;
  }
  return { data, error, loading };
}`,
    expected: { data: { users: ['Alice'] }, loading: false, error: null },
    sample: `const { data, loading, error } = useFetch(() => ({ users: ["Alice"] }));
({ data: data.value, loading: loading.value, error: error.value })`,
    hints: [
      'useFetch wraps fetch logic with reactive state',
      'It manages loading, data, and error automatically',
    ],
    tags: ['composables', 'useFetch', 'data-fetching'],
  },

  {
    id: 'fe-vue-usefetch-error',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'useFetch Error Handling',
    text: 'Use the useFetch composable with a function that throws. Verify the error is captured.',
    setup: 'Mock useFetch with error handling.',
    setupCode: `const ref = (val) => ({ value: val });
function useFetch(fetchFn) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);
  try {
    data.value = fetchFn();
  } catch(e) {
    error.value = e.message || String(e);
  }
  loading.value = false;
  return { data, error, loading };
}`,
    expected: { data: null, error: 'Server down', loading: false },
    sample: `const { data, error, loading } = useFetch(() => { throw new Error("Server down"); });
({ data: data.value, error: error.value, loading: loading.value })`,
    hints: ['Wrap the fetch call in try/catch', 'Store the error message in the error ref'],
    tags: ['composables', 'useFetch', 'error-handling'],
  },

  {
    id: 'fe-vue-fetch-retry',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'hard',
    title: 'Fetch with Retry Logic',
    text: 'Create a fetch function that retries up to 3 times on failure. Simulate failure twice then success. Return attempt count and data.',
    setup: 'Mock fetch with configurable failure.',
    setupCode: `function createFetchWithRetry(maxRetries) {
  return function fetchWithRetry(fetchFn) {
    let attempts = 0;
    let data = null;
    let error = null;
    while (attempts < maxRetries) {
      attempts++;
      try {
        data = fetchFn(attempts);
        error = null;
        break;
      } catch(e) {
        error = e.message;
      }
    }
    return { data, error, attempts };
  };
}`,
    expected: { data: 'success', error: null, attempts: 3 },
    sample: `const fetchWithRetry = createFetchWithRetry(3);
const result = fetchWithRetry((attempt) => {
  if (attempt < 3) throw new Error("fail");
  return "success";
});
result`,
    hints: ['Retry logic loops until success or max retries', 'Track the number of attempts'],
    tags: ['data-fetching', 'retry', 'resilience'],
  },

  {
    id: 'fe-vue-fetch-abort',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'hard',
    title: 'Abortable Fetch Pattern',
    text: 'Create an abortable fetch pattern. Start a fetch, abort it, and verify the abort status.',
    setup: 'Mock AbortController pattern.',
    setupCode: `function createAbortable() {
  let aborted = false;
  return {
    abort() { aborted = true; },
    get signal() { return { aborted }; },
    execute(fn) {
      if (aborted) return { data: null, aborted: true };
      return { data: fn(), aborted: false };
    }
  };
}`,
    expected: { data: null, aborted: true },
    sample: `const controller = createAbortable();
controller.abort();
controller.execute(() => "data")`,
    hints: [
      'AbortController allows cancelling in-flight requests',
      'Check the signal.aborted flag before executing',
    ],
    tags: ['data-fetching', 'abort', 'AbortController'],
  },

  {
    id: 'fe-vue-fetch-cache',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'Cached Data Fetching',
    text: 'Create a fetch function with caching. Fetch the same URL twice and verify the cache is used on the second call.',
    setup: 'Mock cached fetch.',
    setupCode: `function createCachedFetch() {
  const cache = {};
  let fetchCount = 0;
  return {
    getData(url, fetchFn) {
      if (cache[url]) return { data: cache[url], fromCache: true };
      fetchCount++;
      const data = fetchFn();
      cache[url] = data;
      return { data, fromCache: false };
    },
    get fetchCount() { return fetchCount; }
  };
}`,
    expected: { first: false, second: true, fetchCount: 1 },
    sample: `const cached = createCachedFetch()
const r1 = cached.getData("/api/users", () => ["Alice"])
const r2 = cached.getData("/api/users", () => ["Alice"])
({ first: r1.fromCache, second: r2.fromCache, fetchCount: cached.fetchCount })`,
    hints: ['Cache responses by URL', 'Return cached data on subsequent requests'],
    tags: ['data-fetching', 'caching', 'performance'],
  },

  {
    id: 'fe-vue-suspense-pattern',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'hard',
    title: 'Suspense Pattern',
    text: 'Simulate the Suspense pattern: render a loading fallback while async data loads, then show content.',
    setup: 'Mock Suspense rendering.',
    setupCode: `function suspense(asyncFn, fallback) {
  let resolved = false;
  let data = null;
  try {
    data = asyncFn();
    resolved = true;
  } catch(e) {
    resolved = false;
  }
  return {
    resolved,
    content: resolved ? data : null,
    fallback: resolved ? null : fallback
  };
}`,
    expected: { resolved: true, content: 'Loaded data', fallback: null },
    sample: `suspense(() => "Loaded data", "Loading...")`,
    hints: [
      'Suspense shows fallback content while waiting for async setup',
      'Once resolved, it shows the actual content',
    ],
    tags: ['Suspense', 'async', 'data-fetching'],
  },

  {
    id: 'fe-vue-fetch-pagination',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'Paginated Data Fetching',
    text: 'Create a pagination composable. Fetch page 1 and page 2 of data. Return the current page items and total pages.',
    setup: 'Mock pagination system.',
    setupCode: `const ref = (val) => ({ value: val });
const allItems = ["a","b","c","d","e","f","g","h","i","j"];
function usePagination(pageSize) {
  const page = ref(1);
  const totalPages = Math.ceil(allItems.length / pageSize);
  const items = () => {
    const start = (page.value - 1) * pageSize;
    return allItems.slice(start, start + pageSize);
  };
  return { page, totalPages, items };
}`,
    expected: { page: 2, items: ['d', 'e', 'f'], totalPages: 4 },
    sample: `const { page, totalPages, items } = usePagination(3);
page.value = 2;
({ page: page.value, items: items(), totalPages })`,
    hints: [
      'Pagination splits data into pages of fixed size',
      'Calculate start index from page number and page size',
    ],
    tags: ['data-fetching', 'pagination', 'composable'],
  },

  {
    id: 'fe-vue-fetch-polling',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'Polling Pattern',
    text: 'Simulate a polling mechanism that fetches data at intervals. Track the number of polls and the latest data.',
    setup: 'Mock polling system.',
    setupCode: `function createPoller(fetchFn) {
  let pollCount = 0;
  let latestData = null;
  return {
    poll() { pollCount++; latestData = fetchFn(pollCount); },
    get pollCount() { return pollCount; },
    get latestData() { return latestData; }
  };
}`,
    expected: { pollCount: 3, latestData: 'data-3' },
    sample: `const poller = createPoller((n) => "data-" + n);
poller.poll(); poller.poll(); poller.poll();
({ pollCount: poller.pollCount, latestData: poller.latestData })`,
    hints: ['Polling repeatedly fetches data at intervals', 'Track poll count and latest data'],
    tags: ['data-fetching', 'polling', 'interval'],
  },

  {
    id: 'fe-vue-fetch-transform',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'easy',
    title: 'Transform Fetched Data',
    text: 'Fetch raw data and transform it before storing. Map user objects to just names. Return the transformed data.',
    setup: 'Mock fetch and transform.',
    setupCode: `const ref = (val) => ({ value: val });
const rawData = [{ id: 1, name: "Alice", age: 30 }, { id: 2, name: "Bob", age: 25 }];`,
    expected: { names: ['Alice', 'Bob'] },
    sample: `const data = ref(null);
data.value = rawData.map(u => u.name);
({ names: data.value })`,
    hints: [
      'Transform API responses to the shape your component needs',
      'Use .map() to extract specific fields',
    ],
    tags: ['data-fetching', 'transform', 'mapping'],
  },

  {
    id: 'fe-vue-fetch-conditional',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'Conditional Fetch',
    text: 'Create a composable that only fetches when a condition is true. Test with enabled=true and enabled=false.',
    setup: 'Mock conditional fetch.',
    setupCode: `const ref = (val) => ({ value: val });
function useConditionalFetch(enabled, fetchFn) {
  const data = ref(null);
  const fetched = ref(false);
  if (enabled) {
    data.value = fetchFn();
    fetched.value = true;
  }
  return { data, fetched };
}`,
    expected: {
      enabled: { data: 'result', fetched: true },
      disabled: { data: null, fetched: false },
    },
    sample: `const on = useConditionalFetch(true, () => "result")
const off = useConditionalFetch(false, () => "result")
({ enabled: { data: on.data.value, fetched: on.fetched.value }, disabled: { data: off.data.value, fetched: off.fetched.value } })`,
    hints: ['Only execute fetch when condition is truthy', 'Return empty state when disabled'],
    tags: ['data-fetching', 'conditional', 'composable'],
  },

  {
    id: 'fe-vue-fetch-stale',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'hard',
    title: 'Stale-While-Revalidate Pattern',
    text: 'Implement stale-while-revalidate: return cached data immediately, then update with fresh data. Track both stale and fresh values.',
    setup: 'Mock SWR pattern.',
    setupCode: `function createSWR() {
  const cache = {};
  return {
    getData(key, fetchFn) {
      const stale = cache[key] || null;
      const fresh = fetchFn();
      cache[key] = fresh;
      return { stale, fresh, hadCache: stale !== null };
    }
  };
}`,
    expected: {
      first: { stale: null, fresh: 'v1', hadCache: false },
      second: { stale: 'v1', fresh: 'v2', hadCache: true },
    },
    sample: `const swr = createSWR()
const first = swr.getData("key", () => "v1")
const second = swr.getData("key", () => "v2")
({ first, second })`,
    hints: [
      'SWR returns stale data immediately for fast UX',
      'Then revalidates with a fresh fetch',
    ],
    tags: ['data-fetching', 'swr', 'caching'],
  },

  {
    id: 'fe-vue-fetch-dependent',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'Dependent Fetches',
    text: 'Simulate dependent fetches: first fetch a user, then use their id to fetch their posts. Return both results.',
    setup: 'Mock dependent fetch functions.',
    setupCode: `const fetchUser = () => ({ id: 42, name: "Alice" });
const fetchPosts = (userId) => [{ id: 1, userId, title: "Post 1" }];`,
    expected: { user: { id: 42, name: 'Alice' }, posts: [{ id: 1, userId: 42, title: 'Post 1' }] },
    sample: `const user = fetchUser();
const posts = fetchPosts(user.id);
({ user, posts })`,
    hints: [
      'Dependent fetches use the result of one fetch in another',
      'First fetch the user, then use their id for posts',
    ],
    tags: ['data-fetching', 'dependent', 'chained'],
  },

  {
    id: 'fe-vue-fetch-parallel',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'Parallel Data Fetching',
    text: 'Fetch multiple resources in parallel (simulated). Combine results from fetching users and products.',
    setup: 'Mock parallel fetch.',
    setupCode: `const fetchUsers = () => ["Alice", "Bob"];
const fetchProducts = () => ["Widget", "Gadget"];
function fetchAll(...fns) {
  return fns.map(fn => fn());
}`,
    expected: { users: ['Alice', 'Bob'], products: ['Widget', 'Gadget'] },
    sample: `const [users, products] = fetchAll(fetchUsers, fetchProducts);
({ users, products })`,
    hints: [
      'Use Promise.all for parallel fetches in real code',
      'Here we simulate with synchronous calls',
    ],
    tags: ['data-fetching', 'parallel', 'Promise.all'],
  },

  {
    id: 'fe-vue-fetch-optimistic',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'hard',
    title: 'Optimistic Update Pattern',
    text: 'Implement optimistic update: update UI immediately, then rollback if the server rejects. Simulate a rejected update.',
    setup: 'Mock optimistic update system.',
    setupCode: `const ref = (val) => ({ value: val });
function optimisticUpdate(currentRef, newValue, serverFn) {
  const backup = currentRef.value;
  currentRef.value = newValue;
  const success = serverFn(newValue);
  if (!success) {
    currentRef.value = backup;
    return { rolledBack: true, value: currentRef.value };
  }
  return { rolledBack: false, value: currentRef.value };
}`,
    expected: { rolledBack: true, value: 'original' },
    sample: `const data = ref("original");
optimisticUpdate(data, "optimistic", () => false)`,
    hints: [
      'Optimistic updates show the result immediately',
      'If the server rejects, roll back to the previous value',
    ],
    tags: ['data-fetching', 'optimistic', 'rollback'],
  },

  {
    id: 'fe-vue-fetch-infinite',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'hard',
    title: 'Infinite Scroll Data Loading',
    text: 'Simulate infinite scroll: load page 1, then load page 2, appending results. Return the accumulated items.',
    setup: 'Mock infinite scroll fetcher.',
    setupCode: `const ref = (val) => ({ value: val });
const pages = { 1: ["a","b","c"], 2: ["d","e","f"], 3: ["g","h","i"] };
function useInfiniteScroll() {
  const items = ref([]);
  const page = ref(0);
  const loadMore = () => {
    page.value++;
    const newItems = pages[page.value] || [];
    items.value = [...items.value, ...newItems];
  };
  return { items, page, loadMore };
}`,
    expected: { items: ['a', 'b', 'c', 'd', 'e', 'f'], page: 2 },
    sample: `const { items, page, loadMore } = useInfiniteScroll();
loadMore(); loadMore();
({ items: items.value, page: page.value })`,
    hints: [
      'Infinite scroll appends new data to existing items',
      'Track the current page and load more on demand',
    ],
    tags: ['data-fetching', 'infinite-scroll', 'pagination'],
  },

  // ─── Forms & Validation (17 new problems) ───────────────────────

  {
    id: 'fe-vue-form-trim',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'easy',
    title: 'v-model.trim Modifier',
    text: 'Simulate the .trim modifier: create an input binding that automatically trims whitespace. Return the trimmed value.',
    setup: 'Mock ref with trim.',
    setupCode: `const ref = (val) => ({ value: val });
const withTrim = (r) => ({
  get value() { return r.value; },
  set value(v) { r.value = typeof v === "string" ? v.trim() : v; }
});`,
    expected: { value: 'hello' },
    sample: `const input = ref("");
const trimmed = withTrim(input);
trimmed.value = "  hello  ";
({ value: trimmed.value })`,
    hints: [
      '.trim modifier strips leading and trailing whitespace',
      'It is applied automatically to v-model',
    ],
    tags: ['v-model', 'trim', 'modifiers'],
  },

  {
    id: 'fe-vue-form-number',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'easy',
    title: 'v-model.number Modifier',
    text: 'Simulate the .number modifier: convert a string input to a number. Return the numeric value.',
    setup: 'Mock ref with number conversion.',
    setupCode: `const ref = (val) => ({ value: val });
const withNumber = (r) => ({
  get value() { return r.value; },
  set value(v) { r.value = Number(v); }
});`,
    expected: { value: 42, type: 'number' },
    sample: `const input = ref(0);
const numInput = withNumber(input);
numInput.value = "42";
({ value: numInput.value, type: typeof numInput.value })`,
    hints: ['.number modifier converts string input to a number', 'It uses Number() internally'],
    tags: ['v-model', 'number', 'modifiers'],
  },

  {
    id: 'fe-vue-form-lazy',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'easy',
    title: 'v-model.lazy Modifier',
    text: 'Simulate the .lazy modifier: update only on "change" event, not "input". Track which event triggers updates.',
    setup: 'Mock lazy binding.',
    setupCode: `const ref = (val) => ({ value: val });
function lazyModel(initial) {
  const value = ref(initial);
  const updateLog = [];
  return {
    value,
    onInput(v) { updateLog.push({ event: "input", ignored: true }); },
    onChange(v) { value.value = v; updateLog.push({ event: "change", applied: true }); },
    get log() { return updateLog; }
  };
}`,
    expected: { value: 'final', logLength: 3 },
    sample: `const model = lazyModel("");
model.onInput("typing");
model.onInput("more");
model.onChange("final");
({ value: model.value.value, logLength: model.log.length })`,
    hints: [
      '.lazy syncs on change instead of input events',
      'Input events are ignored, only change events update the value',
    ],
    tags: ['v-model', 'lazy', 'modifiers'],
  },

  {
    id: 'fe-vue-form-multifield',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Multi-Field Form State',
    text: 'Create a reactive form with name, email, and age fields. Validate that all fields are filled. Return the form state and validity.',
    setup: 'Mock reactive form.',
    setupCode: `const reactive = (obj) => obj;`,
    expected: { form: { name: 'Alice', email: 'alice@test.com', age: 30 }, valid: true },
    sample: `const form = reactive({ name: "", email: "", age: null });
form.name = "Alice";
form.email = "alice@test.com";
form.age = 30;
const valid = form.name !== "" && form.email !== "" && form.age !== null;
({ form: { ...form }, valid })`,
    hints: [
      'Use reactive() for form state with multiple fields',
      'Validate by checking each field',
    ],
    tags: ['forms', 'multi-field', 'validation'],
  },

  {
    id: 'fe-vue-form-rules',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Form Validation Rules',
    text: 'Create a validation rules system. Define rules for required, minLength(3), and email format. Validate "ab" against required and minLength. Return the errors.',
    setup: 'Mock validation rules.',
    setupCode: `const rules = {
  required: (val) => val.length > 0 ? null : "Required",
  minLength: (min) => (val) => val.length >= min ? null : "Min length " + min,
  email: (val) => val.includes("@") ? null : "Invalid email"
};
function validate(value, ruleFns) {
  return ruleFns.map(fn => fn(value)).filter(err => err !== null);
}`,
    expected: ['Min length 3'],
    sample: `validate("ab", [rules.required, rules.minLength(3)])`,
    hints: [
      'Validation rules return null on success or an error message',
      'Apply all rules and collect non-null results',
    ],
    tags: ['forms', 'validation', 'rules'],
  },

  {
    id: 'fe-vue-form-dirty',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Form Dirty Tracking',
    text: 'Track whether a form field has been modified (dirty). Start clean, modify the value, check dirty status.',
    setup: 'Mock dirty tracking.',
    setupCode: `const ref = (val) => ({ value: val });
function useField(initial) {
  const value = ref(initial);
  const original = initial;
  return {
    value,
    get dirty() { return value.value !== original; },
    reset() { value.value = original; }
  };
}`,
    expected: { dirty: true, value: 'changed' },
    sample: `const field = useField("initial");
field.value.value = "changed";
({ dirty: field.dirty, value: field.value.value })`,
    hints: [
      'A field is dirty when its current value differs from the original',
      'Track the original value for comparison',
    ],
    tags: ['forms', 'dirty', 'tracking'],
  },

  {
    id: 'fe-vue-form-touched',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'easy',
    title: 'Form Field Touched State',
    text: 'Track whether a field has been focused and blurred (touched). Show errors only for touched fields.',
    setup: 'Mock touched tracking.',
    setupCode: `function createField(value) {
  return {
    value,
    touched: false,
    error: null,
    blur() { this.touched = true; },
    validate() { this.error = this.value === "" ? "Required" : null; }
  };
}`,
    expected: { touched: true, error: 'Required', showError: true },
    sample: `const field = createField("");
field.blur();
field.validate();
({ touched: field.touched, error: field.error, showError: field.touched && field.error !== null })`,
    hints: [
      'Touched means the user has interacted with (blurred) the field',
      'Only show validation errors on touched fields',
    ],
    tags: ['forms', 'touched', 'ux'],
  },

  {
    id: 'fe-vue-form-submit',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Form Submit Handler',
    text: 'Create a form submit handler that validates all fields before submitting. If valid, return the form data. If invalid, return errors.',
    setup: 'Mock form submission.',
    setupCode: `function handleSubmit(form, rules) {
  const errors = {};
  for (const [field, value] of Object.entries(form)) {
    const rule = rules[field];
    if (rule) {
      const error = rule(value);
      if (error) errors[field] = error;
    }
  }
  const valid = Object.keys(errors).length === 0;
  return { valid, data: valid ? form : null, errors: valid ? null : errors };
}`,
    expected: { valid: false, data: null, errors: { email: 'Required' } },
    sample: `handleSubmit(
  { name: "Alice", email: "" },
  { name: (v) => v ? null : "Required", email: (v) => v ? null : "Required" }
)`,
    hints: ['Validate all fields before submitting', 'Return errors if any field fails validation'],
    tags: ['forms', 'submit', 'validation'],
  },

  {
    id: 'fe-vue-form-select',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'easy',
    title: 'Select Input Binding',
    text: 'Simulate v-model on a select input. Bind to a ref and change the selected option. Return the selected value.',
    setup: 'Mock ref and options.',
    setupCode: `const ref = (val) => ({ value: val });
const options = ["apple", "banana", "cherry"];`,
    expected: { selected: 'banana', options: ['apple', 'banana', 'cherry'] },
    sample: `const selected = ref("apple");
selected.value = "banana";
({ selected: selected.value, options })`,
    hints: [
      'v-model on select binds to the selected option value',
      'Changing the ref updates the selection',
    ],
    tags: ['forms', 'select', 'v-model'],
  },

  {
    id: 'fe-vue-form-checkbox-group',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Checkbox Group Binding',
    text: 'Simulate v-model on a checkbox group. Bind multiple checkboxes to an array ref. Toggle items on and off. Return the selected items.',
    setup: 'Mock ref and toggle logic.',
    setupCode: `const ref = (val) => ({ value: val });
function toggleItem(arr, item) {
  const idx = arr.value.indexOf(item);
  if (idx === -1) arr.value = [...arr.value, item];
  else arr.value = arr.value.filter(i => i !== item);
}`,
    expected: { selected: ['vue', 'svelte'] },
    sample: `const selected = ref([]);
toggleItem(selected, "vue");
toggleItem(selected, "react");
toggleItem(selected, "svelte");
toggleItem(selected, "react");
({ selected: selected.value })`,
    hints: ['Checkbox groups bind to an array', 'Toggle adds if absent, removes if present'],
    tags: ['forms', 'checkbox', 'array'],
  },

  {
    id: 'fe-vue-form-radio',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'easy',
    title: 'Radio Button Binding',
    text: 'Simulate v-model on radio buttons. Only one option can be selected. Change selection and return the result.',
    setup: 'Mock ref.',
    setupCode: `const ref = (val) => ({ value: val });`,
    expected: { selected: 'medium' },
    sample: `const size = ref("small");
size.value = "medium";
({ selected: size.value })`,
    hints: ['Radio buttons bind to a single value', 'Only one option is active at a time'],
    tags: ['forms', 'radio', 'v-model'],
  },

  {
    id: 'fe-vue-form-async-validate',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'hard',
    title: 'Async Form Validation',
    text: 'Create an async validation that checks username availability. Simulate a check where "admin" is taken. Return the validation result.',
    setup: 'Mock async validator.',
    setupCode: `const takenUsernames = ["admin", "root", "test"];
function checkUsername(name) {
  const available = !takenUsernames.includes(name);
  return { username: name, available, error: available ? null : "Username taken" };
}`,
    expected: {
      taken: { username: 'admin', available: false, error: 'Username taken' },
      free: { username: 'alice', available: true, error: null },
    },
    sample: `({
  taken: checkUsername("admin"),
  free: checkUsername("alice")
})`,
    hints: [
      'Async validation checks against a server/database',
      'Return availability status and error message',
    ],
    tags: ['forms', 'async-validation', 'username'],
  },

  {
    id: 'fe-vue-form-reset',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Form Reset',
    text: 'Create a form with a reset function that restores initial values. Modify fields, reset, and verify restoration.',
    setup: 'Mock resettable form.',
    setupCode: `function createForm(initial) {
  const values = { ...initial };
  return {
    values,
    set(field, val) { values[field] = val; },
    reset() { Object.assign(values, initial); },
    get() { return { ...values }; }
  };
}`,
    expected: { name: 'default', email: '' },
    sample: `const form = createForm({ name: "default", email: "" });
form.set("name", "changed");
form.set("email", "test@test.com");
form.reset();
form.get()`,
    hints: [
      'Store initial values to enable reset',
      'Reset restores all fields to their original values',
    ],
    tags: ['forms', 'reset', 'state'],
  },

  {
    id: 'fe-vue-form-field-array',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'hard',
    title: 'Dynamic Form Field Array',
    text: 'Create a dynamic form where fields can be added and removed. Add 3 fields, remove the second, return the remaining fields.',
    setup: 'Mock dynamic field array.',
    setupCode: `const ref = (val) => ({ value: val });
function useFieldArray() {
  const fields = ref([]);
  let nextId = 1;
  return {
    fields,
    add(value) { fields.value = [...fields.value, { id: nextId++, value }]; },
    remove(id) { fields.value = fields.value.filter(f => f.id !== id); },
    getValues() { return fields.value.map(f => f.value); }
  };
}`,
    expected: { values: ['first', 'third'], count: 2 },
    sample: `const { fields, add, remove, getValues } = useFieldArray();
add("first"); add("second"); add("third");
remove(2);
({ values: getValues(), count: fields.value.length })`,
    hints: [
      'Dynamic forms allow adding/removing fields at runtime',
      'Each field needs a unique id for stable rendering',
    ],
    tags: ['forms', 'dynamic', 'field-array'],
  },

  {
    id: 'fe-vue-form-cross-validate',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'hard',
    title: 'Cross-Field Validation',
    text: 'Validate that password and confirmPassword match. Return the validation result.',
    setup: 'Mock cross-field validator.',
    setupCode: `function crossValidate(form, rules) {
  const errors = [];
  for (const rule of rules) {
    const error = rule(form);
    if (error) errors.push(error);
  }
  return { valid: errors.length === 0, errors };
}`,
    expected: { valid: false, errors: ['Passwords do not match'] },
    sample: `crossValidate(
  { password: "abc123", confirmPassword: "abc124" },
  [(form) => form.password === form.confirmPassword ? null : "Passwords do not match"]
)`,
    hints: [
      'Cross-field validation compares multiple fields',
      'Rules receive the entire form object',
    ],
    tags: ['forms', 'cross-validation', 'password'],
  },

  {
    id: 'fe-vue-form-custom-component-vmodel',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'hard',
    title: 'Custom Component v-model',
    text: 'Implement v-model on a custom component. The component receives modelValue prop and emits update:modelValue. Simulate the binding.',
    setup: 'Mock component v-model pattern.',
    setupCode: `function createCustomInput(initialValue) {
  let modelValue = initialValue;
  const listeners = [];
  return {
    get modelValue() { return modelValue; },
    onUpdate(fn) { listeners.push(fn); },
    emitUpdate(newVal) {
      modelValue = newVal;
      listeners.forEach(fn => fn(newVal));
    }
  };
}`,
    expected: { parentValue: 'updated', componentValue: 'updated' },
    sample: `let parentValue = "initial";
const input = createCustomInput("initial");
input.onUpdate((val) => { parentValue = val; });
input.emitUpdate("updated");
({ parentValue, componentValue: input.modelValue })`,
    hints: [
      'Custom v-model uses modelValue prop + update:modelValue emit',
      'Parent binds with v-model, child emits updates',
    ],
    tags: ['forms', 'v-model', 'custom-component'],
  },

  {
    id: 'fe-vue-form-textarea',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'easy',
    title: 'Textarea Character Counter',
    text: 'Create a textarea binding with a character counter. Set text content and return the count. Max 100 characters.',
    setup: 'Mock ref and computed.',
    setupCode: `const ref = (val) => ({ value: val });
const computed = (fn) => ({ get value() { return fn(); } });`,
    expected: { text: 'Hello World', charCount: 11, remaining: 89, valid: true },
    sample: `const text = ref("Hello World");
const maxLength = 100;
const charCount = computed(() => text.value.length);
const remaining = computed(() => maxLength - charCount.value);
const valid = computed(() => charCount.value <= maxLength);
({ text: text.value, charCount: charCount.value, remaining: remaining.value, valid: valid.value })`,
    hints: [
      'Use computed to derive character count from the text ref',
      'Calculate remaining characters from max length',
    ],
    tags: ['forms', 'textarea', 'character-count'],
  },
];
