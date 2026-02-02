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
    text: 'Write a function called ref that takes a value and wraps it in a reactive container object with a .value property. Call it with initialValue and return the result.',
    setup: 'An initial value is provided.',
    setupCode: `// The initial value to wrap in a ref
const initialValue = 42;`,
    expected: { value: 42 },
    sample: `function ref(val) {
  return { value: val };
}
ref(initialValue)`,
    hints: [
      'ref() wraps a value in an object with a .value property',
      'Return an object literal with value set to the argument',
    ],
    tags: ['reactivity', 'ref', 'basics'],
  },

  {
    id: 'fe-vue-reactive-object',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'Create Reactive Object',
    text: 'Write a function called reactive that takes a plain object and returns it as a reactive proxy (for this mock, just return the object). Then call it with an object containing name="Alice" and age=25, using the provided data.',
    setup: 'Initial data for the reactive object is provided.',
    setupCode: `// Data to make reactive
const userData = { name: "Alice", age: 25 };`,
    expected: { name: 'Alice', age: 25 },
    sample: `function reactive(obj) {
  return obj;
}
reactive(userData)`,
    hints: [
      'reactive() takes a plain object and returns a reactive version',
      'In this simplified mock, returning the object itself is sufficient',
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
    text: 'Write a function called onMounted that takes a callback and immediately executes it (simulating the hook firing). Then use it: declare a message variable, call onMounted with a callback that sets message to "Component mounted", and return { message }.',
    setup: 'No external setup needed.',
    setupCode: `// (empty - you implement onMounted yourself)`,
    expected: { message: 'Component mounted' },
    sample: `function onMounted(callback) {
  callback();
}
let message;
onMounted(() => { message = "Component mounted"; });
({ message })`,
    hints: [
      'onMounted() takes a callback function and calls it when the component mounts',
      'In this mock, just call the callback immediately',
      'Set a variable inside the callback and return it after',
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
    text: 'Implement a simple ref function, then simulate v-model two-way binding: create a ref for inputValue with initial value "hello", update its .value to "world" (simulating user input), and return { inputValue: inputValue.value }.',
    setup: 'Initial and updated values are provided.',
    setupCode: `// Values for the v-model simulation
const initialText = "hello";
const updatedText = "world";`,
    expected: { inputValue: 'world' },
    sample: `function ref(val) { return { value: val }; }
const inputValue = ref(initialText);
inputValue.value = updatedText;
({ inputValue: inputValue.value })`,
    hints: [
      'ref() wraps a value in an object with a .value property',
      'v-model creates two-way binding: the ref updates when input changes',
      'Assign to .value to simulate the input changing',
    ],
    tags: ['v-model', 'forms', 'two-way-binding'],
  },

  {
    id: 'fe-vue-async-setup',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'hard',
    title: 'Async Data Fetching Pattern',
    text: 'Simulate the async setup pattern for data fetching. Write a ref function. Create a ref for data starting at null. Write a loadData function that sets data.value to the result of calling fetchFn. Call loadData and return { data: data.value }.',
    setup: 'A mock fetch function that returns product data is provided.',
    setupCode: `// Simulated API call (synchronous for testing)
const fetchFn = () => ({id:1,name:"Product"});`,
    expected: { data: { id: 1, name: 'Product' } },
    sample: `function ref(val) { return { value: val }; }
const data = ref(null);
function loadData() {
  data.value = fetchFn();
}
loadData();
({ data: data.value })`,
    hints: [
      'Create a ref function that returns { value: val }',
      'Initialize data ref as null, then set it after "fetching"',
      'Call your loadData function to trigger the data assignment',
    ],
    tags: ['async', 'data-fetching', 'promises'],
  },

  {
    id: 'fe-vue-conditional-render',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'Conditional Rendering Logic',
    text: "Write a function called renderIf that takes a boolean condition and a content string. If the condition is true, return the content. If false, return null. This simulates Vue's v-if directive. Test it with the provided isVisible flag and message.",
    setup: 'A visibility flag and message are provided.',
    setupCode: `// v-if condition and content
const isVisible = true;
const message = "Hello";`,
    expected: 'Hello',
    sample: `function renderIf(condition, content) {
  return condition ? content : null;
}
renderIf(isVisible, message)`,
    hints: [
      'v-if conditionally renders based on truthiness',
      'Use a ternary operator to return content or null',
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
    text: 'Write a function called handleWithStop that takes an event object and simulates the Vue .stop modifier. It should call stopPropagation() on the event and return an object with { stopped: event.stopped }.',
    setup: 'A mock event object with a stopped flag and stopPropagation method is provided.',
    setupCode: `// Mock event object - stopPropagation() sets stopped to true
const event = { stopped: false, stopPropagation() { this.stopped = true; } };`,
    expected: { stopped: true },
    sample: `function handleWithStop(evt) {
  evt.stopPropagation();
  return { stopped: evt.stopped };
}
handleWithStop(event)`,
    hints: [
      'The .stop modifier calls event.stopPropagation() to prevent event bubbling',
      'Define a function that takes an event, calls stopPropagation, and returns the result',
    ],
    tags: ['events', 'modifiers', 'stop-propagation'],
  },

  {
    id: 'fe-vue-event-modifier-prevent',
    framework: 'vue',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Event Modifier: Prevent Default',
    text: 'Write a function called handleWithPrevent that takes an event object and simulates the Vue .prevent modifier. It should call preventDefault() on the event and return an object with { prevented: event.prevented }.',
    setup: 'A mock event object with a prevented flag and preventDefault method is provided.',
    setupCode: `// Mock event object - preventDefault() sets prevented to true
const event = { prevented: false, preventDefault() { this.prevented = true; } };`,
    expected: { prevented: true },
    sample: `function handleWithPrevent(evt) {
  evt.preventDefault();
  return { prevented: evt.prevented };
}
handleWithPrevent(event)`,
    hints: [
      'The .prevent modifier calls event.preventDefault() to stop the default browser action',
      'Define a function that takes an event, calls preventDefault, and returns the result',
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
    text: 'Write a function called checkKeyModifier that takes a keyboard event and a target key name (like "Enter"). It should return an object { isMatch: boolean } indicating whether the event key matches the target. Test it with the provided keyEvent and target "Enter".',
    setup: 'A mock keyboard event is provided.',
    setupCode: `// Mock keyboard event
const keyEvent = { key: "Enter" };`,
    expected: { isMatch: true },
    sample: `function checkKeyModifier(evt, targetKey) {
  return { isMatch: evt.key === targetKey };
}
checkKeyModifier(keyEvent, "Enter")`,
    hints: [
      'Vue key modifiers like @keyup.enter check event.key against a target key name',
      'Compare event.key to the target string to see if they match',
    ],
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
    text: 'Simulate parent-child communication with Vue\'s v-model pattern. Create an emit function that calls the parent handler for "update:modelValue". Then create a child component function that uses emit to send the value "new" to the parent. Call it and return { parentValue }.',
    setup: 'A parentValue variable is provided to capture the emitted value.',
    setupCode: `// Parent state to receive emitted value
let parentValue = "old";`,
    expected: { parentValue: 'new' },
    sample: `const emit = (eventName, val) => {
  if (eventName === "update:modelValue") parentValue = val;
};
function childUpdate(newVal) {
  emit("update:modelValue", newVal);
}
childUpdate("new");
({ parentValue })`,
    hints: [
      'Vue uses "update:modelValue" event for v-model on components',
      'Create an emit function that updates parentValue when the right event fires',
      'The child calls emit with the event name and new value',
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
    text: 'Implement a ref function, create a ref called isOpen starting at false, then write an inline toggle expression that flips isOpen.value using the ! operator. Return { isOpen: isOpen.value }.',
    setup: 'The initial toggle state is provided.',
    setupCode: `// Initial state for the toggle
const initialState = false;`,
    expected: { isOpen: true },
    sample: `function ref(val) { return { value: val }; }
const isOpen = ref(initialState);
isOpen.value = !isOpen.value;
({ isOpen: isOpen.value })`,
    hints: [
      'ref() wraps a value in { value: val }',
      'Toggle a boolean by assigning !currentValue back to the ref',
      'Vue inline handlers like @click="isOpen = !isOpen" use this pattern',
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
    text: 'Write a function called identifyMouseButton that takes a mouse event object and returns { button: name } where name is "left", "middle", or "right" based on the event.button number (0=left, 1=middle, 2=right). Test it with the provided mouseEvent.',
    setup: 'A mock mouse event object is provided.',
    setupCode: `// Mock mouse event with button property (0=left, 1=middle, 2=right)
const mouseEvent = { button: 2 };`,
    expected: { button: 'right' },
    sample: `function identifyMouseButton(evt) {
  const names = { 0: "left", 1: "middle", 2: "right" };
  return { button: names[evt.button] };
}
identifyMouseButton(mouseEvent)`,
    hints: [
      'Mouse button codes: 0 = left, 1 = middle, 2 = right',
      'Create a mapping object from button numbers to names',
      'Vue provides .left, .right, .middle modifiers that check these codes',
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
    text: 'Implement two functions: ref(val) creates { value, __isRef: true }, and reactive(obj) returns a new object where properties that are refs auto-unwrap (accessing them returns .value directly instead of the ref wrapper). Use Object.defineProperty with a getter. Test by creating reactive({ count: ref(10) }) and return { count: state.count }.',
    setup: 'The initial count value is provided.',
    setupCode: `// Value to wrap in a ref inside a reactive object
const initialCount = 10;`,
    expected: { count: 10 },
    sample: `function ref(val) {
  return { value: val, __isRef: true };
}
function reactive(obj) {
  const result = {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    Object.defineProperty(result, key, {
      get: () => val.__isRef ? val.value : val,
      enumerable: true
    });
  }
  return result;
}
const state = reactive({ count: ref(initialCount) });
({ count: state.count })`,
    hints: [
      'ref() should mark the object with __isRef: true',
      'reactive() should use Object.defineProperty with a getter',
      'In the getter, check __isRef to decide whether to unwrap',
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
    text: 'Write a function called readonly that takes an object and returns a frozen copy (use Object.freeze). Then create a readonly state from the sourceData, try to mutate it (which should throw), and return { name: state.name, frozen: true/false } indicating whether the mutation was blocked.',
    setup: 'Source data for the readonly state is provided.',
    setupCode: `// Data to make readonly
const sourceData = { name: "Alice" };`,
    expected: { name: 'Alice', frozen: true },
    sample: `function readonly(obj) {
  return Object.freeze({ ...obj });
}
const state = readonly(sourceData);
let frozen = false;
try { state.name = "Bob"; } catch(e) { frozen = true; }
({ name: state.name, frozen })`,
    hints: [
      'readonly() should return a frozen copy of the input object',
      'Object.freeze prevents property modifications',
      'Use try/catch to detect if the mutation was blocked',
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
    text: "Implement three functions: ref(val) creates { value, __isRef: true }, and unref(val) returns val.value if it's a ref (has __isRef), otherwise returns val as-is. Test unref with both a ref wrapping testValue and the plain testValue. Return { fromRef, fromPlain }.",
    setup: 'A test value is provided.',
    setupCode: `// Value to test with both ref and plain access
const testValue = 42;`,
    expected: { fromRef: 42, fromPlain: 42 },
    sample: `function ref(val) {
  return { value: val, __isRef: true };
}
function unref(val) {
  return (val && val.__isRef) ? val.value : val;
}
const r = ref(testValue);
({ fromRef: unref(r), fromPlain: unref(testValue) })`,
    hints: [
      'ref() creates an object with value and __isRef: true',
      'unref() checks if the value has __isRef and unwraps it',
      'For plain values, unref just returns them unchanged',
    ],
    tags: ['reactivity', 'unref', 'utility'],
  },

  {
    id: 'fe-vue-isref',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'isRef Type Guard',
    text: 'Implement three functions: ref(val) creates { value, __isRef: true }, and isRef(val) returns true only if the value has __isRef set to true. Test isRef with a ref created from refValue and with the plainObject. Return { refCheck, plainCheck }.',
    setup: 'Test values are provided.',
    setupCode: `// A ref value and a plain object that looks similar but is not a ref
const refValue = 10;
const plainObject = { value: 10 };`,
    expected: { refCheck: true, plainCheck: false },
    sample: `function ref(val) {
  return { value: val, __isRef: true };
}
function isRef(val) {
  return !!(val && val.__isRef);
}
const r = ref(refValue);
({ refCheck: isRef(r), plainCheck: isRef(plainObject) })`,
    hints: [
      'ref() should tag the object with __isRef: true',
      'isRef() checks for the __isRef flag using double negation for a boolean',
      'Plain objects with a value property should return false',
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
    text: 'Write a function called onUnmounted that takes a cleanup callback and immediately executes it (simulating component teardown). Then use it: declare a cleaned variable set to false, call onUnmounted with a callback that sets cleaned to true, and return { cleaned }.',
    setup: 'No external setup needed.',
    setupCode: `// (empty - you implement onUnmounted yourself)`,
    expected: { cleaned: true },
    sample: `function onUnmounted(fn) {
  fn();
}
let cleaned = false;
onUnmounted(() => { cleaned = true; });
({ cleaned })`,
    hints: [
      'onUnmounted runs when the component is removed from the DOM',
      'In this mock, call the cleanup function immediately',
      'Use it for cleanup tasks like removing event listeners or clearing timers',
    ],
    tags: ['lifecycle', 'onUnmounted', 'cleanup'],
  },

  {
    id: 'fe-vue-lifecycle-beforemount',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'Lifecycle Hook: onBeforeMount',
    text: 'Write a function called onBeforeMount that takes a callback and immediately runs it (simulating the pre-mount phase). Then use it: declare a status variable set to "idle", call onBeforeMount with a callback that sets status to "preparing", and return { status }.',
    setup: 'No external setup needed.',
    setupCode: `// (empty - you implement onBeforeMount yourself)`,
    expected: { status: 'preparing' },
    sample: `function onBeforeMount(fn) {
  fn();
}
let status = "idle";
onBeforeMount(() => { status = "preparing"; });
({ status })`,
    hints: [
      'onBeforeMount runs right before the component is mounted to the DOM',
      'In this mock, call the callback immediately to simulate the hook',
      'Update the status variable inside the callback',
    ],
    tags: ['lifecycle', 'onBeforeMount', 'hooks'],
  },

  {
    id: 'fe-vue-lifecycle-order',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'Lifecycle Hook Execution Order',
    text: 'Given four lifecycle hook registration functions, register callbacks for each in the correct Vue lifecycle order: beforeMount, mounted, beforeUpdate, updated. Each callback should push its hook name to the order array. Register them in order and return the order array.',
    setup:
      'Mock lifecycle hooks and an order-tracking array are provided. Each hook pushes its name to the array when registered.',
    setupCode: `// Tracks the order hooks are registered
const order = [];
// Each mock hook records its name when called
const onBeforeMount = (fn) => { order.push("beforeMount"); fn(); };
const onMounted = (fn) => { order.push("mounted"); fn(); };
const onBeforeUpdate = (fn) => { order.push("beforeUpdate"); fn(); };
const onUpdated = (fn) => { order.push("updated"); fn(); };`,
    expected: ['beforeMount', 'mounted', 'beforeUpdate', 'updated'],
    sample: `let result = null;
onBeforeMount(() => {});
onMounted(() => {});
onBeforeUpdate(() => {});
onUpdated(() => {});
result = order;
result`,
    hints: [
      'Vue lifecycle hooks run in a specific order during the component lifecycle',
      'The order is: beforeMount, mounted, beforeUpdate, updated',
      'Register each hook by calling its function with a callback',
    ],
    tags: ['lifecycle', 'order', 'hooks'],
  },

  {
    id: 'fe-vue-lifecycle-activated',
    framework: 'vue',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'KeepAlive Lifecycle: onActivated',
    text: 'Write two functions: onActivated(fn) and onDeactivated(fn) that simulate KeepAlive lifecycle hooks. Each should record its hook in the hooks object (set hooks.activated or hooks.deactivated to true) then call the callback. Register an onActivated callback that increments visits, and an onDeactivated callback. Return { activated, deactivated, visits }.',
    setup: 'A hooks tracking object is provided.',
    setupCode: `// Tracks which hooks have fired
const hooks = { activated: false, deactivated: false };`,
    expected: { activated: true, deactivated: true, visits: 1 },
    sample: `function onActivated(fn) { hooks.activated = true; fn(); }
function onDeactivated(fn) { hooks.deactivated = true; fn(); }
let visits = 0;
onActivated(() => { visits++; });
onDeactivated(() => {});
({ activated: hooks.activated, deactivated: hooks.deactivated, visits })`,
    hints: [
      'onActivated fires when a KeepAlive component becomes visible again',
      'onDeactivated fires when it is cached but hidden',
      'Both should set their flag on hooks and call the callback',
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
    text: 'Build a prop schema object for a component that accepts two props: "title" (type "String", required: true) and "count" (type "Number", default: 0). Pass this schema to defineProps and return the result.',
    setup: 'A mock defineProps function is provided that returns whatever schema you pass.',
    setupCode: `// Mock defineProps - returns the schema object
const defineProps = (schema) => schema;`,
    expected: { title: { type: 'String', required: true }, count: { type: 'Number', default: 0 } },
    sample: `const schema = {
  title: { type: "String", required: true },
  count: { type: "Number", default: 0 }
};
defineProps(schema)`,
    hints: [
      'defineProps declares which props a component accepts',
      'Each prop is an object with type, and optionally required or default',
      'Required props have required: true, optional props have a default value',
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
    text: 'Write two functions: vShow(visible) and vIf(condition). vShow always keeps the element in the DOM (inDOM: true) but toggles display between "block" and "none". vIf removes the element entirely when false (inDOM: false, display: null) and shows it when true (inDOM: true, display: "block"). Call both with false and return { vShow: ..., vIf: ... }.',
    setup: 'A visibility flag is provided.',
    setupCode: `// Both elements should be hidden (false)
const isVisible = false;`,
    expected: { vShow: { inDOM: true, display: 'none' }, vIf: { inDOM: false, display: null } },
    sample: `function vShow(visible) {
  return { inDOM: true, display: visible ? "block" : "none" };
}
function vIf(condition) {
  return condition ? { inDOM: true, display: "block" } : { inDOM: false, display: null };
}
({ vShow: vShow(isVisible), vIf: vIf(isVisible) })`,
    hints: [
      'v-show always keeps the element in the DOM but toggles CSS display',
      'v-if completely adds/removes the element from the DOM',
      'When hidden: v-show has inDOM: true + display: "none", v-if has inDOM: false + display: null',
    ],
    tags: ['v-show', 'v-if', 'rendering'],
  },

  {
    id: 'fe-vue-slots-default',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'Default Slot Content',
    text: 'Write a function called renderSlot that takes slotContent and a fallback string. If slotContent is not undefined, return it. Otherwise return the fallback. Then test it: call with "Custom" as content and with undefined as content, using "Default text" as fallback for both. Return { withContent, withFallback }.',
    setup: 'Fallback text is provided.',
    setupCode: `// Default fallback text when no slot content is provided
const fallbackText = "Default text";`,
    expected: { withContent: 'Custom', withFallback: 'Default text' },
    sample: `function renderSlot(slotContent, fallback) {
  return slotContent !== undefined ? slotContent : fallback;
}
const result = { withContent: renderSlot("Custom", fallbackText), withFallback: renderSlot(undefined, fallbackText) };
result`,
    hints: [
      'Slots allow parents to inject content into child components',
      'Check if slotContent is undefined to decide whether to use fallback',
      'The ternary operator works well for this check',
    ],
    tags: ['slots', 'default', 'rendering'],
  },

  {
    id: 'fe-vue-slots-named',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'Named Slots',
    text: 'Write a function called renderLayout that takes a slots object with optional keys: header, default, footer. For each slot, use the provided content or fall back to defaults ("Default Header", "Default Content", "Default Footer"). Return { header, content, footer }. Test with header="My Header", default="Body text", and no footer.',
    setup: 'Slot content values are provided.',
    setupCode: `// Slot content provided by parent component
const slotData = { header: "My Header", default: "Body text" };`,
    expected: { header: 'My Header', content: 'Body text', footer: 'Default Footer' },
    sample: `function renderLayout(slots) {
  return {
    header: slots.header || "Default Header",
    content: slots.default || "Default Content",
    footer: slots.footer || "Default Footer"
  };
}
renderLayout(slotData)`,
    hints: [
      'Named slots use the #slotName syntax in Vue templates',
      'Use the || operator to provide fallback values for missing slots',
      'The "default" key represents the default (unnamed) slot',
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
    text: 'Write a function called renderDynamic that takes a component name string and a components registry object. It should look up the component by name and call its render function. Return the render result. The registry maps names to functions that return { type, content }. Test with currentComponent and the registry.',
    setup: 'A component registry and the target component name are provided.',
    setupCode: `// Component registry - each component is a function returning its vnode
const registry = {
  Home: () => ({ type: "Home", content: "Welcome" }),
  About: () => ({ type: "About", content: "About us" }),
  Contact: () => ({ type: "Contact", content: "Get in touch" })
};
// Currently selected component
const currentComponent = "About";`,
    expected: { type: 'About', content: 'About us' },
    sample: `function renderDynamic(name, components) {
  const component = components[name];
  return component();
}
renderDynamic(currentComponent, registry)`,
    hints: [
      'Vue\'s <component :is="name"> renders different components dynamically',
      'Look up the component function by name in the registry object',
      'Call the function to get the rendered output',
    ],
    tags: ['dynamic-component', 'is', 'rendering'],
  },

  {
    id: 'fe-vue-transition-classes',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'Transition Classes',
    text: 'Write a function called transitionClasses that takes a transition name (like "fade") and returns an object with all six Vue transition class names: enterFrom, enterActive, enterTo, leaveFrom, leaveActive, leaveTo. Each class follows the pattern: name + "-enter-from", name + "-enter-active", etc. Call it with "fade".',
    setup: 'The transition name "fade" is provided as a constant.',
    setupCode: `// Transition name to generate classes for
const transitionName = "fade";`,
    expected: {
      enterFrom: 'fade-enter-from',
      enterActive: 'fade-enter-active',
      enterTo: 'fade-enter-to',
      leaveFrom: 'fade-leave-from',
      leaveActive: 'fade-leave-active',
      leaveTo: 'fade-leave-to',
    },
    sample: `function transitionClasses(name) {
  return {
    enterFrom: name + "-enter-from",
    enterActive: name + "-enter-active",
    enterTo: name + "-enter-to",
    leaveFrom: name + "-leave-from",
    leaveActive: name + "-leave-active",
    leaveTo: name + "-leave-to"
  };
}
transitionClasses(transitionName)`,
    hints: [
      'Vue transitions apply 6 classes: 3 for enter and 3 for leave',
      'The pattern is: name + "-enter-from", name + "-enter-active", name + "-enter-to" (and same for leave)',
      'Concatenate the transition name with each suffix',
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
    text: 'Write a function called renderListOrEmpty that takes an array of items (each with a name property). If the array is empty, return { type: "empty", text: "No items" }. If it has items, return { type: "list", items: [...names] } with just the name strings extracted. Test with both the filledItems and emptyItems arrays.',
    setup: 'Two test arrays are provided.',
    setupCode: `// Test data: one filled list, one empty
const filledItems = [{ name: "A" }, { name: "B" }];
const emptyItems = [];`,
    expected: {
      filled: { type: 'list', items: ['A', 'B'] },
      empty: { type: 'empty', text: 'No items' },
    },
    sample: `function renderListOrEmpty(items) {
  if (items.length === 0) return { type: "empty", text: "No items" };
  return { type: "list", items: items.map(i => i.name) };
}
const result = { filled: renderListOrEmpty(filledItems), empty: renderListOrEmpty(emptyItems) };
result`,
    hints: [
      'Check items.length to decide which branch to render',
      'Use .map() to extract the name property from each item',
      'Return different object shapes for empty vs filled lists',
    ],
    tags: ['rendering', 'conditional', 'list'],
  },

  {
    id: 'fe-vue-teleport',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'Teleport Simulation',
    text: 'Write a function called teleport that takes a CSS selector string (the target location) and content string, and returns an object with { target, content, teleported: true }. This simulates Vue\'s Teleport component. Call it with target "#modal" and content "Modal content".',
    setup: 'Target selector and content values are provided.',
    setupCode: `// Target DOM selector and content for teleport
const targetSelector = "#modal";
const teleportContent = "Modal content";`,
    expected: { target: '#modal', content: 'Modal content', teleported: true },
    sample: `function teleport(to, content) {
  return { target: to, content, teleported: true };
}
teleport(targetSelector, teleportContent)`,
    hints: [
      'Teleport renders content at a different DOM location specified by a CSS selector',
      'Return an object with target, content, and a teleported flag set to true',
    ],
    tags: ['teleport', 'rendering', 'portal'],
  },

  {
    id: 'fe-vue-fragment',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'Fragment - Multiple Root Nodes',
    text: 'Write an h() function that creates a vnode: h(tag, props, children) returns { tag, props, children }. Props defaults to {} and children defaults to null. Then simulate a Vue 3 fragment by returning an array of two vnodes: an h1 with content from heading and a p with content from body.',
    setup: 'Content strings for the fragment elements are provided.',
    setupCode: `// Content for the two root elements
const heading = "Title";
const body = "Body";`,
    expected: [
      { tag: 'h1', props: {}, children: 'Title' },
      { tag: 'p', props: {}, children: 'Body' },
    ],
    sample: `function h(tag, props, children) {
  return { tag, props: props || {}, children: children || null };
}
[h("h1", {}, heading), h("p", {}, body)]`,
    hints: [
      'h() creates virtual DOM nodes with tag, props, and children',
      'Vue 3 fragments are simply arrays of multiple vnodes',
      'Return an array with both elements to simulate multi-root',
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
    text: 'Write a function called range that takes a number n and returns an array of numbers from 1 to n (inclusive). This simulates Vue\'s v-for="i in n" which iterates from 1 to n. Call it with rangeSize.',
    setup: 'The range size is provided.',
    setupCode: `// Number of items to generate
const rangeSize = 5;`,
    expected: [1, 2, 3, 4, 5],
    sample: `function range(n) {
  return Array.from({ length: n }, (_, i) => i + 1);
}
range(rangeSize)`,
    hints: [
      'Vue\'s v-for="i in 5" generates numbers 1 through 5',
      'Use Array.from() with a length and a mapping function',
      'The index starts at 0, so add 1 to get 1-based numbers',
    ],
    tags: ['v-for', 'range', 'rendering'],
  },

  {
    id: 'fe-vue-render-class-binding',
    framework: 'vue',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'Dynamic Class Binding',
    text: 'Write two functions: objectClass(obj) takes an object where keys are class names and values are booleans, and returns a space-joined string of truthy class names. arrayClass(arr) takes an array of strings/falsy values and returns a space-joined string of truthy entries. Test objectClass with { active: true, error: false } and arrayClass with ["base", isActive && "active", hasError && "error"]. Return { objectResult, arrayResult }.',
    setup: 'Boolean flags for class conditions are provided.',
    setupCode: `// Condition flags for dynamic class binding
const isActive = true;
const hasError = false;`,
    expected: { objectResult: 'active', arrayResult: 'base active' },
    sample: `function objectClass(obj) {
  return Object.entries(obj).filter(([, v]) => v).map(([k]) => k).join(" ");
}
function arrayClass(arr) {
  return arr.filter(Boolean).join(" ");
}
const result = { objectResult: objectClass({ active: isActive, error: hasError }), arrayResult: arrayClass(["base", isActive && "active", hasError && "error"]) };
result`,
    hints: [
      'Object syntax: iterate entries, keep only truthy values, join the keys',
      'Array syntax: filter out falsy values, then join with spaces',
      'Object.entries() gives [key, value] pairs you can filter',
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
    text: 'Implement a ref function. Then simulate a data fetching lifecycle: create three refs (loading=true, data=null, error=null). Simulate the fetch completing by setting data to fetchResult and loading to false. Return { loading, data, error } with their .value properties.',
    setup: 'The fetched data result is provided.',
    setupCode: `// Simulated fetch result
const fetchResult = "fetched";`,
    expected: { loading: false, data: 'fetched', error: null },
    sample: `function ref(val) { return { value: val }; }
const loading = ref(true);
const data = ref(null);
const error = ref(null);
data.value = fetchResult;
loading.value = false;
({ loading: loading.value, data: data.value, error: error.value })`,
    hints: [
      'Create ref() to wrap values in { value: val }',
      'Start with loading=true, then set data and flip loading to false',
      'Error stays null on a successful fetch',
    ],
    tags: ['data-fetching', 'loading', 'state'],
  },

  {
    id: 'fe-vue-fetch-error',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'easy',
    title: 'Error State Pattern',
    text: 'Implement a ref function. Then simulate a failed data fetch: create three refs (loading=true, data=null, error=null). Simulate the error by setting error to errorMessage and loading to false. Data stays null on failure. Return { loading, data, error } with their .value properties.',
    setup: 'The error message is provided.',
    setupCode: `// Error message from a failed fetch
const errorMessage = "Network error";`,
    expected: { loading: false, data: null, error: 'Network error' },
    sample: `function ref(val) { return { value: val }; }
const loading = ref(true);
const data = ref(null);
const error = ref(null);
error.value = errorMessage;
loading.value = false;
({ loading: loading.value, data: data.value, error: error.value })`,
    hints: [
      'On error, set the error ref to the message and stop loading',
      'Data should remain null when the fetch fails',
      'Always set loading to false when the operation completes (success or error)',
    ],
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
    text: 'Write a function called suspense that takes an asyncFn (a function that returns data or throws) and a fallback string. Try calling asyncFn. If it succeeds, return { resolved: true, content: data, fallback: null }. If it throws, return { resolved: false, content: null, fallback: fallbackText }. Test with the provided loadData function and fallback.',
    setup: 'A data loader function and fallback text are provided.',
    setupCode: `// Simulated async data loader (succeeds synchronously for testing)
const loadData = () => "Loaded data";
// Fallback text shown while loading
const fallbackText = "Loading...";`,
    expected: { resolved: true, content: 'Loaded data', fallback: null },
    sample: `function suspense(asyncFn, fallback) {
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
}
suspense(loadData, fallbackText)`,
    hints: [
      'Suspense shows fallback content while waiting for async data',
      'Wrap the async call in try/catch to handle loading vs error states',
      'When resolved, content has data and fallback is null; when not resolved, it is reversed',
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
    text: 'Write a function called transformUsers that takes an array of user objects (each with id, name, age) and returns just their names as an array. Implement a ref function, store the transformed result in a data ref, and return { names: data.value }.',
    setup: 'Raw API response data is provided.',
    setupCode: `// Raw API response with user objects
const rawData = [{ id: 1, name: "Alice", age: 30 }, { id: 2, name: "Bob", age: 25 }];`,
    expected: { names: ['Alice', 'Bob'] },
    sample: `function ref(val) { return { value: val }; }
function transformUsers(users) {
  return users.map(u => u.name);
}
const data = ref(null);
data.value = transformUsers(rawData);
({ names: data.value })`,
    hints: [
      'Transform API responses to the shape your component needs',
      'Use .map() to extract the name property from each user',
      'Store the result in a ref for reactive state management',
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
    text: "Write a function called fetchUserWithPosts that chains two dependent data fetches. It should: (1) call getUserById with the given userId to get a user object, (2) use that user's id to call getPostsByUser, (3) return { user, posts }. Test with userId 42.",
    setup: 'Mock data-fetching functions and a user ID are provided.',
    setupCode: `// Mock API functions
const getUserById = (id) => ({ id: id, name: "Alice" });
const getPostsByUser = (userId) => [{ id: 1, userId, title: "Post 1" }];
// Target user
const userId = 42;`,
    expected: { user: { id: 42, name: 'Alice' }, posts: [{ id: 1, userId: 42, title: 'Post 1' }] },
    sample: `function fetchUserWithPosts(uid) {
  const user = getUserById(uid);
  const posts = getPostsByUser(user.id);
  return { user, posts };
}
fetchUserWithPosts(userId)`,
    hints: [
      'Dependent fetches chain: the second fetch needs data from the first',
      'First get the user, then use user.id to fetch their posts',
      'Return both results in a single object',
    ],
    tags: ['data-fetching', 'dependent', 'chained'],
  },

  {
    id: 'fe-vue-fetch-parallel',
    framework: 'vue',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'Parallel Data Fetching',
    text: 'Write a function called fetchAll that takes any number of fetch functions as arguments, calls each one, and returns an array of their results (simulating Promise.all). Then use it to fetch from both fetchUsers and fetchProducts, destructure the results, and return { users, products }.',
    setup: 'Mock data-fetching functions are provided.',
    setupCode: `// Mock API endpoints
const fetchUsers = () => ["Alice", "Bob"];
const fetchProducts = () => ["Widget", "Gadget"];`,
    expected: { users: ['Alice', 'Bob'], products: ['Widget', 'Gadget'] },
    sample: `function fetchAll() {
  const fns = Array.from(arguments);
  return fns.map(fn => fn());
}
const [users, products] = fetchAll(fetchUsers, fetchProducts);
({ users, products })`,
    hints: [
      'In real Vue code you would use Promise.all for parallel fetches',
      'fetchAll should call each function and collect results in an array',
      'Destructure the array result to get named variables',
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
    text: 'Implement a ref function. Simulate v-model on a select: create a ref called selected initialized to the first option in the options array, then change it to "banana" (simulating user selection). Return { selected: selected.value, options }.',
    setup: 'Select options are provided.',
    setupCode: `// Available options for the select input
const options = ["apple", "banana", "cherry"];`,
    expected: { selected: 'banana', options: ['apple', 'banana', 'cherry'] },
    sample: `function ref(val) { return { value: val }; }
const selected = ref(options[0]);
selected.value = "banana";
({ selected: selected.value, options })`,
    hints: [
      'ref() wraps a value in { value: val } for reactive state',
      'Initialize the ref with the first option from the array',
      'Update .value to simulate the user changing the select',
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
    text: 'Implement a ref function. Simulate v-model on radio buttons: create a ref called size starting at the initialSize, then change it to newSize (simulating user clicking a different radio). Return { selected: size.value }.',
    setup: 'Radio button values are provided.',
    setupCode: `// Radio group values
const initialSize = "small";
const newSize = "medium";`,
    expected: { selected: 'medium' },
    sample: `function ref(val) { return { value: val }; }
const size = ref(initialSize);
size.value = newSize;
({ selected: size.value })`,
    hints: [
      'Radio buttons bind to a single value via v-model',
      'Only one radio option is active at a time',
      'Changing the ref value simulates clicking a different radio button',
    ],
    tags: ['forms', 'radio', 'v-model'],
  },

  {
    id: 'fe-vue-form-async-validate',
    framework: 'vue',
    category: 'Forms & Validation',
    difficulty: 'hard',
    title: 'Async Form Validation',
    text: 'Write a function called checkUsername that takes a username string and checks it against the takenUsernames list. Return an object { username, available, error } where available is true if the name is NOT in the taken list, and error is "Username taken" if unavailable or null if available. Test with both "admin" (taken) and "alice" (free).',
    setup: 'A list of taken usernames is provided.',
    setupCode: `// Simulated database of taken usernames
const takenUsernames = ["admin", "root", "test"];`,
    expected: {
      taken: { username: 'admin', available: false, error: 'Username taken' },
      free: { username: 'alice', available: true, error: null },
    },
    sample: `function checkUsername(name) {
  const available = !takenUsernames.includes(name);
  return { username: name, available, error: available ? null : "Username taken" };
}
const result = { taken: checkUsername("admin"), free: checkUsername("alice") };
result`,
    hints: [
      'Use Array.includes() to check if the username is in the taken list',
      'Return an object with the username, availability boolean, and error message',
      'Error should be null when available, "Username taken" when not',
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
