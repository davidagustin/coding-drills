import type { CheatsheetData } from '../types';

export const vueCheatsheet: CheatsheetData = {
  framework: 'vue',
  title: 'Vue Cheatsheet',
  lastUpdated: '2026-02',
  sections: [
    // ================================================================
    // SECTION 1: OVERVIEW
    // ================================================================
    {
      id: 'overview',
      icon: '📋',
      title: 'Overview',
      description: 'What Vue is, its philosophy, and when to use it',
      content: [
        {
          type: 'text',
          content:
            'Vue is a progressive JavaScript framework for building user interfaces. Created by Evan You in 2014, it is designed to be incrementally adoptable: you can sprinkle it into a single page via a script tag, or scale it up to a full single-page application with routing, state management, and server-side rendering via Nuxt. Vue 3 (the current major version) uses a Proxy-based reactivity system that automatically tracks dependencies at a fine-grained level, making updates efficient without a virtual DOM diffing step for reactive state.',
        },
        {
          type: 'subheading',
          text: 'Progressive Philosophy',
        },
        {
          type: 'text',
          content:
            'Unlike opinionated frameworks that require full buy-in, Vue lets you adopt features incrementally. Start with just the template compiler and reactivity in a script tag. Add Single-File Components when you need build tooling. Layer in Vue Router for SPA navigation. Add Pinia for global state. Scale to server-side rendering with Nuxt. At each step you only pay for what you use.',
        },
        {
          type: 'list',
          style: 'bullet',
          items: [
            'Fine-grained Proxy-based reactivity with automatic dependency tracking',
            'Single-File Components (SFCs) combining template, script, and style in one .vue file',
            'Two API styles: Composition API (recommended) and Options API (simpler, class-like)',
            'Template syntax with powerful directives (v-if, v-for, v-bind, v-on, v-model, v-slot)',
            'First-class TypeScript support with type inference for props, emits, and slots',
            'Built-in transition system for enter/leave and list animations',
            'Incremental adoption from a CDN script tag to a full-stack Nuxt application',
          ],
        },
        {
          type: 'subheading',
          text: 'Composition API vs Options API',
        },
        {
          type: 'text',
          content:
            'Vue 3 offers two ways to author component logic. The Composition API (recommended) uses imported functions like ref(), computed(), and onMounted() inside a setup function or <script setup> block, enabling flexible logic composition and better TypeScript inference. The Options API organizes logic into an object with data(), computed, methods, and lifecycle hooks -- it is simpler for small components but harder to reuse across components.',
        },
        {
          type: 'table',
          headers: ['Aspect', 'Composition API', 'Options API'],
          rows: [
            [
              'Syntax',
              '<script setup> with imports',
              'export default { data(), methods, computed }',
            ],
            ['Logic reuse', 'Composables (useX functions)', 'Mixins (prone to naming conflicts)'],
            [
              'TypeScript',
              'Full inference, generic components',
              'Requires defineComponent() wrapper',
            ],
            [
              'Code organization',
              'Group by feature/concern',
              'Group by option type (data, methods...)',
            ],
            [
              'Learning curve',
              'Steeper (requires understanding refs)',
              'Gentler (familiar object structure)',
            ],
            ['Recommended for', 'Medium-to-large apps, libraries', 'Small apps, quick prototypes'],
          ],
        },
        {
          type: 'subheading',
          text: 'Reactivity Mental Model',
        },
        {
          type: 'text',
          content:
            "Vue 3 reactivity is built on ES2015 Proxies. When you create a ref() or reactive() object, Vue wraps it in a Proxy that intercepts property reads (to track which effect depends on that property) and writes (to trigger re-runs of dependent effects). This means dependency tracking is automatic -- you never manually declare dependencies like in React's useEffect. Computed values cache their result and only re-evaluate when a tracked dependency changes. Watchers run side effects when sources change. The entire system is lazy: nothing runs until something is actually read.",
        },
        {
          type: 'tip',
          content:
            'Vue 3 with <script setup> and the Composition API is the recommended approach for all new projects. The Options API remains fully supported and is a valid choice for simpler components or teams transitioning from Vue 2.',
        },
        {
          type: 'subheading',
          text: 'When to Use Vue',
        },
        {
          type: 'list',
          style: 'bullet',
          items: [
            'You want a gentle learning curve with excellent documentation',
            'You prefer HTML-based templates over JSX',
            'You need fine-grained reactivity without manual dependency arrays',
            'You want to incrementally adopt a framework in an existing project',
            'You value a cohesive ecosystem (Vue Router, Pinia, Nuxt) with official support',
            'You need first-class transition/animation support built into the framework',
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
            ['SFC', 'Single-File Component -- a .vue file combining template, script, and style'],
            [
              'Composition API',
              'Function-based API using ref(), computed(), watch(), lifecycle hooks',
            ],
            ['Options API', 'Object-based API using data(), methods, computed, watch options'],
            [
              'Reactivity',
              'Proxy-based system that tracks dependencies and triggers updates automatically',
            ],
            [
              'Directives',
              'Special attributes (v-if, v-for, v-bind, v-on, v-model) that extend HTML',
            ],
            [
              'Slots',
              'Content distribution mechanism for passing template fragments to child components',
            ],
            [
              'Composable',
              'A function using Composition API to encapsulate reusable stateful logic (useX)',
            ],
            [
              'Teleport',
              'Built-in component that renders its children in a different DOM location',
            ],
            [
              'Suspense',
              'Built-in component for orchestrating async dependencies in a component tree',
            ],
            [
              'Provide/Inject',
              'Dependency injection system for sharing data across component trees',
            ],
          ],
        },
      ],
    },

    // ================================================================
    // SECTION 2: CORE CONCEPTS
    // ================================================================
    {
      id: 'core-concepts',
      icon: '🧠',
      title: 'Core Concepts',
      description: 'SFCs, reactivity, templates, props, events, slots, and more',
      content: [
        // --- Single-File Components ---
        {
          type: 'subheading',
          text: 'Single-File Components (SFC)',
        },
        {
          type: 'text',
          content:
            'Vue SFCs combine template, script, and style in a single .vue file. The <script setup> syntax is the recommended approach -- all top-level bindings (variables, functions, imports) are automatically exposed to the template. You can use scoped styles to isolate CSS to the component, or CSS Modules for class-name hashing.',
        },
        {
          type: 'code',
          language: 'html',
          title: 'SFC with <script setup>, Scoped Styles, and CSS Modules',
          code: `<script setup lang="ts">
import { ref, computed } from 'vue'

const name = ref('World')
const greeting = computed(() => \`Hello, \${name.value}!\`)
</script>

<template>
  <div :class="$style.wrapper">
    <h1>{{ greeting }}</h1>
    <input v-model="name" placeholder="Your name" />
  </div>
</template>

<!-- Scoped styles: only apply to this component -->
<style scoped>
h1 { color: #42b883; }
</style>

<!-- CSS Modules: access via $style -->
<style module>
.wrapper {
  padding: 1rem;
  border: 1px solid #ddd;
}
</style>`,
        },
        {
          type: 'tip',
          content:
            'With <script setup>, there is no need to return anything or use defineComponent(). Imports, variables, and functions declared at the top level are automatically available in the template.',
        },

        // --- Reactivity System Deep Dive ---
        {
          type: 'subheading',
          text: 'Reactivity System Deep Dive',
        },
        {
          type: 'text',
          content:
            'Vue 3 reactivity is built on ES Proxies. ref() wraps a single value (access via .value in script, auto-unwrapped in templates). reactive() makes an entire object deeply reactive. computed() creates a cached derived value. There are also shallow variants, utility functions for type checking, and escape hatches for opting out of reactivity.',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Reactivity Primitives',
          code: `import {
  ref, reactive, computed, readonly,
  shallowRef, shallowReactive, triggerRef,
  toRef, toRefs, toRaw, markRaw,
  isRef, isReactive, isReadonly, isProxy,
  effectScope
} from 'vue'

// ref: reactive single value (access with .value)
const count = ref(0)
count.value++

// reactive: deep reactive object (no .value needed)
const state = reactive({ items: [] as string[], filter: 'all' })
state.items.push('learn Vue')

// computed: cached derived value, auto-tracks dependencies
const activeItems = computed(() =>
  state.items.filter(i => i !== 'done')
)

// readonly: read-only proxy (prevents mutations)
const readonlyState = readonly(state)

// shallowRef: only .value reassignment is reactive (not deep)
const config = shallowRef({ theme: 'dark', lang: 'en' })
// config.value.theme = 'light' -- NOT reactive
config.value = { theme: 'light', lang: 'en' } // reactive

// shallowReactive: only top-level properties are reactive
const shallow = shallowReactive({ nested: { deep: true } })
// shallow.nested = { deep: false } -- reactive
// shallow.nested.deep = false -- NOT reactive

// triggerRef: force trigger watchers for a shallowRef
triggerRef(config)

// toRef / toRefs: create refs from reactive object properties
const filterRef = toRef(state, 'filter')
const { items, filter } = toRefs(state)

// toRaw / markRaw: escape reactivity
const rawState = toRaw(state) // original object
const nonReactive = markRaw({ id: 1 }) // never made reactive

// Type checks
isRef(count)       // true
isReactive(state)  // true
isReadonly(readonlyState) // true
isProxy(state)     // true`,
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Watch and WatchEffect',
          code: `import { ref, watch, watchEffect, watchPostEffect, watchSyncEffect } from 'vue'

const query = ref('')
const page = ref(1)

// watch: explicit source, provides old + new values
watch(query, (newVal, oldVal) => {
  console.log(\`Query changed: "\${oldVal}" -> "\${newVal}"\`)
  page.value = 1 // reset page on new search
})

// watch multiple sources
watch([query, page], ([newQuery, newPage], [oldQuery, oldPage]) => {
  fetchResults(newQuery, newPage)
})

// watch with options
watch(query, (val) => { /* ... */ }, {
  immediate: true,  // run immediately with current value
  deep: true,       // deep watch for nested changes
  flush: 'post',    // run after DOM updates
  once: true,       // run only once then stop
})

// watchEffect: auto-tracks dependencies, runs immediately
const stop = watchEffect(() => {
  // any ref/reactive read inside is auto-tracked
  console.log(\`Search: \${query.value}, page: \${page.value}\`)
})
stop() // stop the watcher

// watchPostEffect: same as watchEffect with flush: 'post'
watchPostEffect(() => {
  // runs after DOM updates -- safe to read DOM here
})

// watchSyncEffect: same as watchEffect with flush: 'sync'
watchSyncEffect(() => {
  // runs synchronously on change -- use sparingly
})`,
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Effect Scope',
          code: `import { effectScope, ref, computed, watch, onScopeDispose } from 'vue'

// effectScope: group multiple reactive effects for batch disposal
const scope = effectScope()

scope.run(() => {
  const count = ref(0)
  const doubled = computed(() => count.value * 2)

  watch(count, (val) => console.log('count:', val))

  onScopeDispose(() => {
    console.log('scope disposed -- cleanup here')
  })
})

// dispose all effects created inside the scope
scope.stop()`,
        },
        {
          type: 'warning',
          content:
            'Do not destructure reactive() objects -- it breaks reactivity. Use toRefs() to convert properties to individual refs: const { x, y } = toRefs(reactiveObj).',
        },

        // --- Template Syntax ---
        {
          type: 'subheading',
          text: 'Template Syntax',
        },
        {
          type: 'text',
          content:
            'Vue templates are valid HTML enhanced with directives. The compiler transforms templates into optimized render functions. Vue supports text interpolation, attribute binding, event handling, conditionals, loops, slots, and more.',
        },
        {
          type: 'code',
          language: 'html',
          title: 'Complete Template Directives',
          code: `<!-- Text interpolation (Mustache syntax) -->
<p>{{ message }}</p>
<p>{{ count + 1 }}</p>
<p>{{ ok ? 'YES' : 'NO' }}</p>

<!-- v-text / v-html: set textContent / innerHTML -->
<span v-text="message"></span>
<div v-html="rawHtml"></div>

<!-- v-bind (shorthand :) -- attribute binding -->
<img :src="imageUrl" :alt="imageAlt" />
<div :class="{ active: isActive, error: hasError }"></div>
<div :class="[baseClass, isActive ? 'active' : '']"></div>
<div :style="{ color: textColor, fontSize: size + 'px' }"></div>
<div v-bind="objectOfAttrs"></div>

<!-- v-on (shorthand @) -- event handling -->
<button @click="handleClick">Click</button>
<button @click="count++">Inline</button>
<form @submit.prevent="onSubmit">...</form>
<input @keyup.enter="submitForm" />
<button @click.stop.prevent="doThat">Stop + Prevent</button>

<!-- v-model -- two-way binding -->
<input v-model="text" />
<input v-model.lazy="text" />
<input v-model.number="age" type="number" />
<input v-model.trim="name" />
<textarea v-model="bio"></textarea>
<select v-model="selected">
  <option v-for="opt in options" :key="opt" :value="opt">
    {{ opt }}
  </option>
</select>
<input type="checkbox" v-model="checked" />

<!-- v-if / v-else-if / v-else -- conditional rendering -->
<div v-if="status === 'loading'">Loading...</div>
<div v-else-if="status === 'error'">Error occurred</div>
<div v-else>{{ data }}</div>

<!-- v-show -- toggle CSS display (element stays in DOM) -->
<p v-show="isVisible">Visible when true</p>

<!-- v-for -- list rendering (always use :key) -->
<li v-for="item in items" :key="item.id">
  {{ item.name }}
</li>
<li v-for="(item, index) in items" :key="item.id">
  {{ index }}: {{ item.name }}
</li>
<div v-for="(value, key, index) in myObject" :key="key">
  {{ index }}. {{ key }}: {{ value }}
</div>

<!-- v-slot (shorthand #) -- slot content -->
<MyComponent v-slot="{ item }">
  <span>{{ item.name }}</span>
</MyComponent>

<!-- v-pre -- skip compilation for this element -->
<span v-pre>{{ this will not be compiled }}</span>

<!-- v-once -- render only once, skip future updates -->
<span v-once>{{ unchangingValue }}</span>

<!-- v-memo -- memoize a sub-tree (Vue 3.2+) -->
<div v-memo="[item.id, item.selected]">
  <!-- only re-renders when memo deps change -->
  {{ item.name }}
</div>

<!-- v-cloak -- hide until Vue compiles (use with CSS) -->
<div v-cloak>{{ message }}</div>`,
        },
        {
          type: 'warning',
          content:
            'Always use :key with v-for. Without it, Vue uses an in-place patch strategy that can cause subtle bugs when list items have state. Use a unique identifier, not the array index.',
        },

        // --- Component Props ---
        {
          type: 'subheading',
          text: 'Component Props',
        },
        {
          type: 'text',
          content:
            'Props are declared with defineProps() in <script setup>. Vue supports runtime type checking, default values via withDefaults(), Boolean casting, and full TypeScript generics.',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'defineProps with TypeScript',
          code: `<script setup lang="ts">
// Type-based declaration (recommended)
interface Props {
  title: string
  count?: number
  items?: string[]
  disabled?: boolean // Boolean props: <MyComp disabled /> -> true
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
  items: () => [],    // factory function for non-primitive defaults
  disabled: false,
})

// Access props
console.log(props.title, props.count)

// Runtime declaration (alternative)
// const props = defineProps({
//   title: { type: String, required: true },
//   count: { type: Number, default: 0 },
//   items: { type: Array as () => string[], default: () => [] },
//   callback: { type: Function as PropType<(id: number) => void> },
//   status: {
//     type: String,
//     validator: (value: string) => ['active', 'inactive'].includes(value)
//   },
// })
</script>`,
        },

        // --- Component Events ---
        {
          type: 'subheading',
          text: 'Component Events (Emits)',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'defineEmits with TypeScript',
          code: `<script setup lang="ts">
// Type-based declaration (recommended)
const emit = defineEmits<{
  (e: 'update', id: number, value: string): void
  (e: 'delete', id: number): void
  (e: 'close'): void
}>()

// Alternative 3.3+ shorthand
// const emit = defineEmits<{
//   update: [id: number, value: string]
//   delete: [id: number]
//   close: []
// }>()

function handleSave(id: number) {
  emit('update', id, 'new value')
}

function handleClose() {
  emit('close')
}
</script>`,
        },

        // --- Slots ---
        {
          type: 'subheading',
          text: 'Slots',
        },
        {
          type: 'text',
          content:
            'Slots let parent components pass template content to children. Vue supports default slots, named slots, scoped slots (which expose data back to the parent), and dynamic slot names.',
        },
        {
          type: 'code',
          language: 'html',
          title: 'Slots: Default, Named, and Scoped',
          code: `<!-- Child component: BaseLayout.vue -->
<template>
  <div class="layout">
    <header>
      <slot name="header">Default Header</slot>
    </header>
    <main>
      <slot>Default Content</slot>
    </main>
    <footer>
      <slot name="footer" :year="currentYear">
        Default Footer
      </slot>
    </footer>
  </div>
</template>

<!-- Parent usage -->
<BaseLayout>
  <template #header>
    <h1>My App</h1>
  </template>

  <!-- default slot content -->
  <p>Main content goes here</p>

  <!-- scoped slot: access child data -->
  <template #footer="{ year }">
    <p>Copyright {{ year }}</p>
  </template>
</BaseLayout>

<!-- Dynamic slot names -->
<template v-for="section in sections" :key="section">
  <template #[section]>
    <component :is="sectionComponents[section]" />
  </template>
</template>`,
        },
        {
          type: 'code',
          language: 'html',
          title: 'Renderless Component Pattern (Scoped Slots)',
          code: `<!-- Renderless component: provides logic, no DOM -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(e: MouseEvent) {
  x.value = e.pageX
  y.value = e.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))

defineSlots<{
  default(props: { x: number; y: number }): void
}>()
</script>

<template>
  <slot :x="x" :y="y" />
</template>

<!-- Usage: parent controls all rendering -->
<!-- <MouseTracker v-slot="{ x, y }">     -->
<!--   <p>Mouse: {{ x }}, {{ y }}</p>     -->
<!-- </MouseTracker>                       -->`,
        },

        // --- Component v-model ---
        {
          type: 'subheading',
          text: 'Component v-model',
        },
        {
          type: 'code',
          language: 'html',
          title: 'defineModel (Vue 3.4+) and Multiple v-model',
          code: `<!-- Single v-model with defineModel (Vue 3.4+) -->
<script setup lang="ts">
const modelValue = defineModel<string>()
// modelValue is a ref that auto-syncs with parent v-model
</script>

<template>
  <input :value="modelValue" @input="modelValue = ($event.target as HTMLInputElement).value" />
</template>

<!-- Usage: <MyInput v-model="name" /> -->

<!-- Multiple v-model bindings -->
<script setup lang="ts">
const firstName = defineModel<string>('firstName')
const lastName = defineModel<string>('lastName')
</script>

<template>
  <input :value="firstName" @input="firstName = ($event.target as HTMLInputElement).value" />
  <input :value="lastName" @input="lastName = ($event.target as HTMLInputElement).value" />
</template>

<!-- Usage: <NameForm v-model:firstName="first" v-model:lastName="last" /> -->`,
        },

        // --- Teleport ---
        {
          type: 'subheading',
          text: 'Teleport',
        },
        {
          type: 'text',
          content:
            "Teleport renders a component's DOM in a different location in the document. This is useful for modals, toasts, and tooltips that need to escape parent overflow or z-index contexts.",
        },
        {
          type: 'code',
          language: 'html',
          title: 'Teleport for Modals',
          code: `<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref(false)
</script>

<template>
  <button @click="showModal = true">Open Modal</button>

  <!-- Renders inside <body>, not inside current component -->
  <Teleport to="body">
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content">
        <h2>Modal Title</h2>
        <p>This is teleported to body.</p>
        <button @click="showModal = false">Close</button>
      </div>
    </div>
  </Teleport>
</template>`,
        },

        // --- Transitions ---
        {
          type: 'subheading',
          text: 'Transitions and Animations',
        },
        {
          type: 'code',
          language: 'html',
          title: 'Transition and TransitionGroup',
          code: `<!-- Single element transition -->
<Transition name="fade">
  <p v-if="show">Hello</p>
</Transition>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

<!-- List transition -->
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item.id">
    {{ item.text }}
  </li>
</TransitionGroup>

<style>
.list-enter-active, .list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-move {
  transition: transform 0.4s ease;
}
</style>

<!-- JavaScript hooks -->
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  :css="false"
>
  <div v-if="show">Animated with JS</div>
</Transition>`,
        },

        // --- Dynamic Components and KeepAlive ---
        {
          type: 'subheading',
          text: 'Dynamic Components and KeepAlive',
        },
        {
          type: 'code',
          language: 'html',
          title: 'Dynamic Components with KeepAlive',
          code: `<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import TabA from './TabA.vue'
import TabB from './TabB.vue'
import TabC from './TabC.vue'

const currentTab = shallowRef(TabA)
const tabs = { TabA, TabB, TabC }
</script>

<template>
  <button v-for="(comp, name) in tabs" :key="name" @click="currentTab = comp">
    {{ name }}
  </button>

  <!-- KeepAlive caches inactive component instances -->
  <KeepAlive :max="5">
    <component :is="currentTab" />
  </KeepAlive>
</template>`,
        },

        // --- Template Refs ---
        {
          type: 'subheading',
          text: 'Template Refs',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Template Refs and useTemplateRef (Vue 3.5+)',
          code: `<script setup lang="ts">
import { ref, onMounted, useTemplateRef } from 'vue'

// Classic approach: variable name matches ref attribute
const inputEl = ref<HTMLInputElement | null>(null)

// Vue 3.5+: useTemplateRef for explicit binding
const canvasEl = useTemplateRef<HTMLCanvasElement>('canvas')

onMounted(() => {
  inputEl.value?.focus()
  const ctx = canvasEl.value?.getContext('2d')
})
</script>

<template>
  <input ref="inputEl" />
  <canvas ref="canvas" width="400" height="300"></canvas>
</template>`,
        },
      ],
    },

    // ================================================================
    // SECTION 3: KEY APIs
    // ================================================================
    {
      id: 'key-apis',
      icon: '🔑',
      title: 'Key APIs',
      description: 'Complete Composition API, lifecycle hooks, macros, and utilities',
      content: [
        {
          type: 'subheading',
          text: 'Composition API -- Reactivity',
        },
        {
          type: 'table',
          headers: ['API', 'Purpose', 'Example'],
          rows: [
            ['ref()', 'Reactive single value (.value)', 'const n = ref(0)'],
            ['reactive()', 'Deep reactive object', 'const s = reactive({ count: 0 })'],
            ['computed()', 'Cached derived value', 'const d = computed(() => n.value * 2)'],
            ['readonly()', 'Read-only reactive proxy', 'const ro = readonly(state)'],
            ['watch()', 'Watch explicit sources', 'watch(n, (v) => log(v))'],
            ['watchEffect()', 'Auto-tracked side effect', 'watchEffect(() => log(n.value))'],
            [
              'watchPostEffect()',
              'watchEffect with flush: post',
              'watchPostEffect(() => readDOM())',
            ],
            [
              'watchSyncEffect()',
              'watchEffect with flush: sync',
              'watchSyncEffect(() => update())',
            ],
            [
              'shallowRef()',
              'Only .value assignment is reactive',
              'const c = shallowRef({ a: 1 })',
            ],
            [
              'shallowReactive()',
              'Only top-level props reactive',
              'const s = shallowReactive({ n: {} })',
            ],
            ['triggerRef()', 'Force watchers for shallowRef', 'triggerRef(shallowData)'],
            ['toRef()', 'Create ref from reactive prop', 'const x = toRef(state, "x")'],
            ['toRefs()', 'Destructure reactive to refs', 'const { x, y } = toRefs(state)'],
            ['toValue()', 'Unwrap ref or getter to value', 'const val = toValue(refOrGetter)'],
            ['toRaw()', 'Get original from reactive proxy', 'const raw = toRaw(state)'],
            ['markRaw()', 'Mark object as never-reactive', 'const obj = markRaw({ id: 1 })'],
            ['isRef()', 'Check if value is a ref', 'isRef(count) // true'],
            ['isReactive()', 'Check if value is reactive', 'isReactive(state) // true'],
            ['isReadonly()', 'Check if value is readonly', 'isReadonly(ro) // true'],
            ['isProxy()', 'Check if value is reactive or readonly', 'isProxy(state) // true'],
            ['effectScope()', 'Create a scope for grouped effects', 'const scope = effectScope()'],
            [
              'getCurrentScope()',
              'Get current active effect scope',
              'const scope = getCurrentScope()',
            ],
            [
              'onScopeDispose()',
              'Register cleanup in current scope',
              'onScopeDispose(() => cleanup())',
            ],
          ],
        },
        {
          type: 'subheading',
          text: 'Lifecycle Hooks',
        },
        {
          type: 'text',
          content:
            "Lifecycle hooks are called during specific stages of a component instance's lifecycle. In the Composition API, they are imported functions called inside setup() or <script setup>.",
        },
        {
          type: 'table',
          headers: ['Hook', 'When It Fires', 'Common Use'],
          rows: [
            ['onBeforeMount()', 'Before initial DOM mount', 'Last-minute state adjustments'],
            [
              'onMounted()',
              'After component is mounted to DOM',
              'Fetch data, start timers, access DOM',
            ],
            [
              'onBeforeUpdate()',
              'Before reactive state change triggers re-render',
              'Read DOM state before update',
            ],
            [
              'onUpdated()',
              'After DOM re-render from state change',
              'Access updated DOM (use sparingly)',
            ],
            ['onBeforeUnmount()', 'Before component is removed from DOM', 'Start cleanup'],
            [
              'onUnmounted()',
              'After component is removed from DOM',
              'Remove listeners, clear timers',
            ],
            [
              'onActivated()',
              'KeepAlive component becomes active',
              'Refresh data on re-activation',
            ],
            ['onDeactivated()', 'KeepAlive component becomes inactive', 'Pause ongoing processes'],
            ['onErrorCaptured()', 'Error from descendant component', 'Error boundaries, logging'],
            ['onRenderTracked()', 'Reactive dependency tracked (dev only)', 'Debug reactivity'],
            [
              'onRenderTriggered()',
              'Reactive dependency triggers re-render (dev only)',
              'Debug re-renders',
            ],
            [
              'onServerPrefetch()',
              'Before server-side rendering resolves',
              'SSR data fetching in Nuxt',
            ],
          ],
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Lifecycle Hooks in Practice',
          code: `import {
  onMounted, onUnmounted, onUpdated,
  onBeforeMount, onBeforeUpdate, onBeforeUnmount,
  onActivated, onDeactivated, onErrorCaptured,
} from 'vue'

// Fetch data on mount, cleanup on unmount
let timerId: ReturnType<typeof setInterval>

onBeforeMount(() => {
  console.log('About to mount -- DOM not yet available')
})

onMounted(() => {
  console.log('Mounted -- DOM is ready')
  fetchData()
  timerId = setInterval(poll, 5000)
})

onBeforeUpdate(() => {
  console.log('State changed, about to re-render')
})

onUpdated(() => {
  console.log('DOM updated after state change')
})

onBeforeUnmount(() => {
  console.log('About to unmount')
})

onUnmounted(() => {
  clearInterval(timerId)
  console.log('Cleaned up')
})

// Error boundary
onErrorCaptured((err, instance, info) => {
  console.error('Caught error:', err, info)
  return false // prevent further propagation
})`,
        },
        {
          type: 'subheading',
          text: 'Component Macros (<script setup>)',
        },
        {
          type: 'table',
          headers: ['Macro', 'Purpose', 'Example'],
          rows: [
            ['defineProps()', 'Declare component props', 'defineProps<{ msg: string }>()'],
            ['defineEmits()', 'Declare component events', 'defineEmits<{ click: [id: number] }>()'],
            ['defineModel()', 'Two-way binding (v-model) ref', 'const val = defineModel<string>()'],
            [
              'defineExpose()',
              'Expose properties to parent ref',
              'defineExpose({ reset, validate })',
            ],
            [
              'defineOptions()',
              'Set component options (name, inheritAttrs)',
              'defineOptions({ name: "MyComp" })',
            ],
            [
              'defineSlots()',
              'Type slot props for TypeScript',
              'defineSlots<{ default(p: { item: T }): void }>()',
            ],
            [
              'withDefaults()',
              'Set default values for typed props',
              'withDefaults(defineProps<P>(), { n: 0 })',
            ],
          ],
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'defineExpose and defineOptions',
          code: `<script setup lang="ts">
import { ref } from 'vue'

// defineOptions: set component name, inheritAttrs, etc.
defineOptions({
  name: 'MyForm',
  inheritAttrs: false,
})

const formData = ref({ name: '', email: '' })

function validate(): boolean {
  return formData.value.name.length > 0
}

function reset() {
  formData.value = { name: '', email: '' }
}

// defineExpose: make methods available to parent via template ref
defineExpose({ validate, reset })
</script>

<!-- Parent can now call: formRef.value?.validate() -->`,
        },
        {
          type: 'subheading',
          text: 'Provide / Inject (Dependency Injection)',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Type-Safe Provide/Inject with InjectionKey',
          code: `import { provide, inject, ref, type InjectionKey, type Ref } from 'vue'

// Define a typed injection key
interface UserContext {
  name: Ref<string>
  logout: () => void
}

export const UserKey: InjectionKey<UserContext> = Symbol('user')

// In ancestor component
const userName = ref('Alice')
provide(UserKey, {
  name: userName,
  logout: () => { userName.value = '' },
})

// In any descendant component
const user = inject(UserKey)
// user is UserContext | undefined (type-safe)

// With default value (avoids undefined)
const userWithDefault = inject(UserKey, {
  name: ref('Guest'),
  logout: () => {},
})`,
        },
        {
          type: 'subheading',
          text: 'nextTick',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'nextTick: Wait for DOM Update',
          code: `import { ref, nextTick } from 'vue'

const message = ref('Hello')
const messageEl = ref<HTMLElement | null>(null)

async function updateMessage() {
  message.value = 'Updated!'

  // DOM has NOT updated yet here
  console.log(messageEl.value?.textContent) // 'Hello'

  await nextTick()

  // DOM has now updated
  console.log(messageEl.value?.textContent) // 'Updated!'
}`,
        },
        {
          type: 'subheading',
          text: 'Custom Directives',
        },
        {
          type: 'text',
          content:
            'Custom directives provide low-level DOM access. They have lifecycle hooks similar to components: created, beforeMount, mounted, beforeUpdate, updated, beforeUnmount, unmounted.',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Custom Directive Lifecycle',
          code: `import type { Directive, DirectiveBinding } from 'vue'

// Full directive with all hooks
const vHighlight: Directive<HTMLElement, string> = {
  created(el, binding) {
    // called before element attributes or event listeners are applied
  },
  beforeMount(el, binding) {
    // called before element is inserted into DOM
  },
  mounted(el, binding: DirectiveBinding<string>) {
    // called after element is mounted
    el.style.backgroundColor = binding.value || 'yellow'
  },
  beforeUpdate(el, binding) {
    // called before parent component updates
  },
  updated(el, binding) {
    // called after parent component and children have updated
    el.style.backgroundColor = binding.value || 'yellow'
  },
  beforeUnmount(el) {
    // called before parent component unmounts
  },
  unmounted(el) {
    // called after parent component unmounts
  },
}

// Shorthand: function form maps to mounted + updated
const vColor: Directive<HTMLElement, string> = (el, binding) => {
  el.style.color = binding.value
}

// In <script setup>, prefix with v for auto-registration:
// const vFocus: Directive = { mounted: (el) => el.focus() }
// Then use: <input v-focus />`,
        },
        {
          type: 'tip',
          content:
            'Use watchEffect() when you want automatic dependency tracking (no need to list sources). Use watch() when you need old and new values, lazy execution, or deep/immediate options.',
        },
      ],
    },

    // ================================================================
    // SECTION 4: COMMON PATTERNS
    // ================================================================
    {
      id: 'common-patterns',
      icon: '🔄',
      title: 'Common Patterns',
      description: 'Composables, plugins, state management, error handling, and advanced patterns',
      content: [
        // --- Composables ---
        {
          type: 'subheading',
          text: 'Composables (useX Functions)',
        },
        {
          type: 'text',
          content:
            'Composables are the primary pattern for reusing stateful logic in Vue 3. By convention they start with "use" and encapsulate reactive state, computed properties, watchers, and lifecycle hooks. They can accept refs as arguments for reactive inputs.',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'useFetch Composable',
          code: `import { ref, watchEffect, toValue, type Ref, type MaybeRefOrGetter } from 'vue'

interface UseFetchReturn<T> {
  data: Ref<T | null>
  error: Ref<string | null>
  isLoading: Ref<boolean>
}

export function useFetch<T = unknown>(url: MaybeRefOrGetter<string>): UseFetchReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const error = ref<string | null>(null)
  const isLoading = ref(false)

  watchEffect(async () => {
    const resolvedUrl = toValue(url) // unwrap ref or getter
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch(resolvedUrl)
      if (!res.ok) throw new Error(res.statusText)
      data.value = await res.json()
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      isLoading.value = false
    }
  })

  return { data, error, isLoading }
}

// Usage:
// const { data, error, isLoading } = useFetch<User[]>('/api/users')
// Or with reactive URL:
// const id = ref(1)
// const { data } = useFetch(() => \`/api/users/\${id.value}\`)`,
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'useLocalStorage Composable',
          code: `import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  const stored = localStorage.getItem(key)
  const data = ref<T>(stored ? JSON.parse(stored) : defaultValue) as Ref<T>

  watch(data, (val) => {
    localStorage.setItem(key, JSON.stringify(val))
  }, { deep: true })

  return data
}

// Usage:
// const theme = useLocalStorage('theme', 'light')
// theme.value = 'dark' // auto-persisted`,
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'useEventListener Composable',
          code: `import { onMounted, onUnmounted, toValue, type MaybeRefOrGetter } from 'vue'

export function useEventListener<K extends keyof WindowEventMap>(
  target: MaybeRefOrGetter<EventTarget | null>,
  event: K,
  handler: (e: WindowEventMap[K]) => void
) {
  onMounted(() => {
    const el = toValue(target)
    el?.addEventListener(event, handler as EventListener)
  })

  onUnmounted(() => {
    const el = toValue(target)
    el?.removeEventListener(event, handler as EventListener)
  })
}

// Usage:
// useEventListener(window, 'resize', () => {
//   width.value = window.innerWidth
// })`,
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'useDebounce Composable',
          code: `import { ref, watch, type Ref } from 'vue'

export function useDebounce<T>(source: Ref<T>, delay = 300): Ref<T> {
  const debounced = ref(source.value) as Ref<T>
  let timeout: ReturnType<typeof setTimeout>

  watch(source, (val) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      debounced.value = val
    }, delay)
  })

  return debounced
}

// Usage:
// const query = ref('')
// const debouncedQuery = useDebounce(query, 500)
// watch(debouncedQuery, (val) => searchAPI(val))`,
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'useIntersectionObserver Composable',
          code: `import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useIntersectionObserver(
  target: Ref<HTMLElement | null>,
  options?: IntersectionObserverInit
) {
  const isIntersecting = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value) return
    observer = new IntersectionObserver(([entry]) => {
      isIntersecting.value = entry.isIntersecting
    }, options)
    observer.observe(target.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { isIntersecting }
}

// Usage:
// const el = ref<HTMLElement | null>(null)
// const { isIntersecting } = useIntersectionObserver(el)`,
        },

        // --- Provide / Inject Patterns ---
        {
          type: 'subheading',
          text: 'Provide / Inject Patterns',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Reactive Provide/Inject with Factory Pattern',
          code: `import { provide, inject, reactive, readonly, type InjectionKey } from 'vue'

// Factory function for creating a typed injection
interface NotificationService {
  readonly messages: string[]
  add: (msg: string) => void
  clear: () => void
}

const NotificationKey: InjectionKey<NotificationService> = Symbol('notifications')

// Provider composable (used in root/layout)
export function provideNotifications() {
  const state = reactive({ messages: [] as string[] })

  const service: NotificationService = {
    get messages() { return state.messages },
    add: (msg: string) => state.messages.push(msg),
    clear: () => { state.messages.length = 0 },
  }

  provide(NotificationKey, service)
  return service
}

// Consumer composable (used in any descendant)
export function useNotifications(): NotificationService {
  const service = inject(NotificationKey)
  if (!service) {
    throw new Error('useNotifications() called without provider')
  }
  return service
}`,
        },

        // --- Custom Directives ---
        {
          type: 'subheading',
          text: 'Custom Directive Patterns',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'v-focus, v-click-outside, v-intersection',
          code: `import type { Directive } from 'vue'

// v-focus: auto-focus an input on mount
export const vFocus: Directive = {
  mounted(el: HTMLElement) {
    el.focus()
  },
}

// v-click-outside: detect clicks outside element
export const vClickOutside: Directive<HTMLElement, () => void> = {
  mounted(el, binding) {
    const handler = (e: Event) => {
      if (!el.contains(e.target as Node)) {
        binding.value()
      }
    }
    ;(el as any).__clickOutside = handler
    document.addEventListener('click', handler)
  },
  unmounted(el) {
    document.removeEventListener('click', (el as any).__clickOutside)
  },
}

// v-intersection: trigger callback on visibility
export const vIntersection: Directive<HTMLElement, () => void> = {
  mounted(el, binding) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) binding.value()
    })
    observer.observe(el)
    ;(el as any).__observer = observer
  },
  unmounted(el) {
    ;(el as any).__observer?.disconnect()
  },
}

// In <script setup>, auto-registered by v-prefix name:
// const vFocus: Directive = { mounted: (el) => el.focus() }
// <input v-focus />`,
        },

        // --- Plugin Pattern ---
        {
          type: 'subheading',
          text: 'Plugin Pattern',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Creating and Using Plugins',
          code: `import type { App, Plugin } from 'vue'

interface ToastOptions {
  duration?: number
  position?: 'top' | 'bottom'
}

// Plugin with install function
export const ToastPlugin: Plugin = {
  install(app: App, options: ToastOptions = {}) {
    const defaultDuration = options.duration || 3000

    // Register a global component
    app.component('Toast', {
      template: '<div class="toast"><slot /></div>',
    })

    // Register a global directive
    app.directive('tooltip', {
      mounted(el, binding) {
        el.title = binding.value
      },
    })

    // Provide a global service via inject
    app.provide('toast', {
      show(msg: string, dur = defaultDuration) {
        console.log(\`Toast: \${msg} for \${dur}ms\`)
      },
    })

    // Add global properties (accessible via this in Options API)
    app.config.globalProperties.$toast = {
      show(msg: string) { console.log(msg) },
    }
  },
}

// main.ts
// import { createApp } from 'vue'
// const app = createApp(App)
// app.use(ToastPlugin, { duration: 5000 })
// app.mount('#app')`,
        },

        // --- State Management Without Pinia ---
        {
          type: 'subheading',
          text: 'State Management Without Pinia',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Simple Reactive Store Pattern',
          code: `import { reactive, readonly, computed } from 'vue'

// Lightweight store using reactive + readonly
interface Todo {
  id: number
  text: string
  done: boolean
}

const state = reactive({
  todos: [] as Todo[],
  filter: 'all' as 'all' | 'active' | 'done',
  nextId: 1,
})

// Getters as computed
const filteredTodos = computed(() => {
  if (state.filter === 'active') return state.todos.filter(t => !t.done)
  if (state.filter === 'done') return state.todos.filter(t => t.done)
  return state.todos
})

const remaining = computed(() => state.todos.filter(t => !t.done).length)

// Actions (mutations)
function addTodo(text: string) {
  state.todos.push({ id: state.nextId++, text, done: false })
}

function toggleTodo(id: number) {
  const todo = state.todos.find(t => t.id === id)
  if (todo) todo.done = !todo.done
}

function removeTodo(id: number) {
  const idx = state.todos.findIndex(t => t.id === id)
  if (idx !== -1) state.todos.splice(idx, 1)
}

// Export readonly state + actions
export const todoStore = {
  state: readonly(state),
  filteredTodos,
  remaining,
  addTodo,
  toggleTodo,
  removeTodo,
  setFilter: (f: 'all' | 'active' | 'done') => { state.filter = f },
}`,
        },

        // --- Error Handling ---
        {
          type: 'subheading',
          text: 'Error Handling',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'onErrorCaptured and Global Error Handler',
          code: `// Component-level error boundary with onErrorCaptured
import { ref, onErrorCaptured } from 'vue'

const error = ref<Error | null>(null)

onErrorCaptured((err: Error, instance, info: string) => {
  error.value = err
  console.error(\`Error in \${info}:\`, err)
  return false // stop propagation to parent error handlers
})

// Template:
// <div v-if="error">Something went wrong: {{ error.message }}</div>
// <slot v-else />

// ---

// Global error handler in main.ts
// app.config.errorHandler = (err, instance, info) => {
//   console.error('Global error:', err)
//   reportToService(err)
// }
//
// app.config.warnHandler = (msg, instance, trace) => {
//   console.warn('Vue warning:', msg)
// }`,
        },

        // --- Async Components with Suspense ---
        {
          type: 'subheading',
          text: 'Async Components with Suspense',
        },
        {
          type: 'code',
          language: 'html',
          title: 'Suspense with Async Setup',
          code: `<!-- AsyncProfile.vue: component with async setup -->
<script setup lang="ts">
const res = await fetch('/api/profile')
const profile = await res.json()
// Component won't render until await resolves
</script>

<template>
  <div>{{ profile.name }}</div>
</template>

<!-- Parent using Suspense -->
<template>
  <Suspense>
    <!-- default: shown when resolved -->
    <template #default>
      <AsyncProfile />
    </template>

    <!-- fallback: shown while loading -->
    <template #fallback>
      <div>Loading profile...</div>
    </template>
  </Suspense>
</template>`,
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'defineAsyncComponent with Error/Loading States',
          code: `import { defineAsyncComponent } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'
import ErrorFallback from './ErrorFallback.vue'

// Simple lazy load
const AsyncModal = defineAsyncComponent(() =>
  import('./components/HeavyModal.vue')
)

// With loading/error states and timeouts
const AsyncDashboard = defineAsyncComponent({
  loader: () => import('./Dashboard.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorFallback,
  delay: 200,     // delay before showing loading (ms)
  timeout: 10000, // timeout before showing error (ms)
})`,
        },

        // --- Global Event Alternatives ---
        {
          type: 'subheading',
          text: 'Global Event Bus Alternatives',
        },
        {
          type: 'text',
          content:
            'Vue 3 removed the built-in event bus ($on/$off/$emit). Instead, use provide/inject for component trees, Pinia stores for global state, or the tiny "mitt" library for a simple event emitter when needed.',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Event Emitter with mitt',
          code: `import mitt from 'mitt'

type Events = {
  'user:login': { id: number; name: string }
  'user:logout': void
  'notification': string
}

export const emitter = mitt<Events>()

// Subscribe
emitter.on('user:login', (user) => {
  console.log(\`Welcome, \${user.name}\`)
})

// Emit
emitter.emit('user:login', { id: 1, name: 'Alice' })

// Unsubscribe
const handler = (msg: string) => console.log(msg)
emitter.on('notification', handler)
emitter.off('notification', handler)`,
        },

        // --- Dynamic Imports and Code Splitting ---
        {
          type: 'subheading',
          text: 'Dynamic Imports and Route-Level Code Splitting',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Route-Level Code Splitting with Vue Router',
          code: `import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue'), // lazy loaded
    },
    {
      path: '/dashboard',
      component: () => import('./views/Dashboard.vue'),
      children: [
        {
          path: 'analytics',
          component: () => import('./views/Analytics.vue'),
        },
        {
          path: 'settings',
          component: () => import('./views/Settings.vue'),
        },
      ],
    },
    {
      path: '/admin',
      // Named chunk for grouping
      component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue'),
    },
  ],
})

export default router`,
        },
        {
          type: 'tip',
          content:
            'Composables are the Vue 3 equivalent of React hooks. Unlike mixins, composables have explicit inputs/outputs, no naming conflicts, and full TypeScript support. Prefer composables for all shared stateful logic.',
        },
      ],
    },

    // ================================================================
    // SECTION 5: CODE EXAMPLES
    // ================================================================
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
          title: 'Composable -- useCounter',
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
        {
          type: 'interactive-code',
          language: 'javascript',
          title: 'Form Handling with v-model and Validation',
          description: 'A form composable with field validation and submission.',
          defaultCode: `import { ref, reactive, computed } from 'vue'

// Composable for form handling
function useForm(initialValues) {
  const values = reactive({ ...initialValues })
  const errors = reactive({})
  const touched = reactive({})
  const isSubmitting = ref(false)

  const isValid = computed(() =>
    Object.keys(errors).every(key => !errors[key])
  )

  function setFieldValue(field, value) {
    values[field] = value
    touched[field] = true
    validateField(field, value)
  }

  function validateField(field, value) {
    if (field === 'email') {
      errors[field] = !value.includes('@')
        ? 'Invalid email address'
        : ''
    }
    if (field === 'name') {
      errors[field] = value.length < 2
        ? 'Name must be at least 2 characters'
        : ''
    }
    if (field === 'password') {
      errors[field] = value.length < 8
        ? 'Password must be at least 8 characters'
        : ''
    }
  }

  async function handleSubmit(onSubmit) {
    // Validate all fields
    Object.keys(values).forEach(key => {
      touched[key] = true
      validateField(key, values[key])
    })
    if (!isValid.value) return

    isSubmitting.value = true
    try {
      await onSubmit(values)
    } finally {
      isSubmitting.value = false
    }
  }

  return { values, errors, touched, isValid, isSubmitting, setFieldValue, handleSubmit }
}

// Usage:
const { values, errors, isValid, handleSubmit } = useForm({
  name: '',
  email: '',
  password: '',
})

// Template:
// <input :value="values.name" @input="setFieldValue('name', $event.target.value)" />
// <span v-if="errors.name">{{ errors.name }}</span>
// <button @click="handleSubmit(submitToAPI)" :disabled="!isValid">Submit</button>`,
        },
        {
          type: 'interactive-code',
          language: 'javascript',
          title: 'Provide/Inject Theme System',
          description: 'A theme system using provide/inject with reactive state.',
          defaultCode: `import { ref, computed, provide, inject, readonly } from 'vue'

// Theme provider composable
function useThemeProvider() {
  const mode = ref('light') // 'light' | 'dark'

  const theme = computed(() => ({
    bg: mode.value === 'dark' ? '#1a1a2e' : '#ffffff',
    text: mode.value === 'dark' ? '#eaeaea' : '#1a1a2e',
    primary: mode.value === 'dark' ? '#e94560' : '#0f3460',
    surface: mode.value === 'dark' ? '#16213e' : '#f5f5f5',
  }))

  function toggleTheme() {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
  }

  const themeContext = {
    mode: readonly(mode),
    theme,
    toggleTheme,
  }

  // Provide to all descendants
  provide('theme', themeContext)
  return themeContext
}

// Theme consumer composable
function useTheme() {
  const theme = inject('theme')
  if (!theme) throw new Error('useTheme() requires ThemeProvider ancestor')
  return theme
}

// In root: useThemeProvider()
// In any child: const { theme, toggleTheme } = useTheme()
// <div :style="{ background: theme.bg, color: theme.text }">
//   <button @click="toggleTheme">Toggle Theme</button>
// </div>`,
        },
        {
          type: 'interactive-code',
          language: 'javascript',
          title: 'Custom Directive -- v-longpress',
          description: 'A custom directive that triggers a callback after a long press.',
          defaultCode: `// Custom directive: v-longpress
// Fires callback after holding for 500ms

const vLongpress = {
  mounted(el, binding) {
    const duration = binding.arg ? parseInt(binding.arg) : 500
    let timer = null

    const start = () => {
      timer = setTimeout(() => {
        binding.value() // call the bound function
      }, duration)
    }

    const cancel = () => {
      clearTimeout(timer)
      timer = null
    }

    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)
    el.addEventListener('mouseup', cancel)
    el.addEventListener('mouseleave', cancel)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)

    // Store for cleanup
    el.__longpressCleanup = () => {
      el.removeEventListener('mousedown', start)
      el.removeEventListener('touchstart', start)
      el.removeEventListener('mouseup', cancel)
      el.removeEventListener('mouseleave', cancel)
      el.removeEventListener('touchend', cancel)
      el.removeEventListener('touchcancel', cancel)
    }
  },

  unmounted(el) {
    el.__longpressCleanup?.()
  },
}

// Usage in template:
// <button v-longpress="onLongPress">Hold Me</button>
// <button v-longpress:1000="onLongPress">Hold 1s</button>`,
        },
      ],
    },

    // ================================================================
    // SECTION 6: ECOSYSTEM
    // ================================================================
    {
      id: 'ecosystem',
      icon: '🌐',
      title: 'Ecosystem & Tools',
      description: 'Frameworks, libraries, and tools in the Vue ecosystem',
      content: [
        {
          type: 'subheading',
          text: 'Frameworks',
        },
        {
          type: 'table',
          headers: ['Framework', 'Description', 'Best For'],
          rows: [
            [
              'Nuxt 3',
              'Full-stack Vue framework with SSR, file-based routing, auto-imports, and server API routes',
              'Production SPAs, SSR/SSG, full-stack apps',
            ],
            [
              'Quasar',
              'Build responsive websites, PWAs, SSR, mobile (Cordova/Capacitor), and desktop (Electron) apps',
              'Cross-platform apps from one codebase',
            ],
            [
              'Ionic Vue',
              'Mobile-first UI components with Capacitor for native device access',
              'Hybrid mobile apps with native features',
            ],
          ],
        },
        {
          type: 'subheading',
          text: 'State Management',
        },
        {
          type: 'table',
          headers: ['Library', 'Description', 'When to Use'],
          rows: [
            [
              'Pinia',
              'Official store -- intuitive API, full TypeScript support, devtools integration',
              'All new Vue 3 projects needing shared state',
            ],
            [
              'VueUse',
              '200+ composables (state, sensors, browser, animation, utilities)',
              'Replace many one-off utilities and composables',
            ],
            [
              'Vuex 4',
              'Legacy official store with mutations/actions/getters pattern',
              'Maintaining existing Vue 2/3 apps using Vuex',
            ],
          ],
        },
        {
          type: 'subheading',
          text: 'UI Component Libraries',
        },
        {
          type: 'table',
          headers: ['Library', 'Style', 'Notes'],
          rows: [
            [
              'Vuetify 3',
              'Material Design',
              'Largest Vue component library, comprehensive theming, WCAG accessible',
            ],
            [
              'PrimeVue',
              'Multiple themes',
              '90+ components, unstyled mode available, enterprise-ready',
            ],
            [
              'Naive UI',
              'Custom design system',
              'TypeScript-first, tree-shakeable, 80+ components',
            ],
            [
              'Element Plus',
              'Enterprise/neutral',
              'Vue 3 version of Element UI, popular in Chinese market',
            ],
            [
              'Headless UI',
              'Unstyled/accessible',
              'From Tailwind Labs, fully accessible, bring your own styles',
            ],
            [
              'Radix Vue',
              'Unstyled/accessible',
              'Port of Radix UI primitives for Vue, WAI-ARIA compliant',
            ],
            [
              'shadcn-vue',
              'Copy-paste components',
              'Port of shadcn/ui for Vue, Tailwind CSS, customizable source code',
            ],
          ],
        },
        {
          type: 'subheading',
          text: 'Routing',
        },
        {
          type: 'table',
          headers: ['Library', 'Description', 'Notes'],
          rows: [
            [
              'Vue Router 4',
              'Official router with nested routes, navigation guards, and route-level code splitting',
              'Required for all SPAs; deep integration with Vue devtools',
            ],
            [
              'unplugin-vue-router',
              'File-based routing (like Nuxt) for Vite projects without Nuxt',
              'Auto-generates typed routes from file structure',
            ],
          ],
        },
        {
          type: 'subheading',
          text: 'Forms & Validation',
        },
        {
          type: 'table',
          headers: ['Library', 'Approach', 'Notes'],
          rows: [
            [
              'VeeValidate',
              'Composition API composables (useField, useForm)',
              'Best DX with Yup/Zod schema integration',
            ],
            [
              'FormKit',
              'Declarative form framework with schema-driven forms',
              'Opinionated but powerful; built-in validation, accessibility, theming',
            ],
            [
              'Vuelidate',
              'Model-based validation with composables',
              'Lightweight, pairs well with custom form logic',
            ],
          ],
        },
        {
          type: 'subheading',
          text: 'Testing',
        },
        {
          type: 'table',
          headers: ['Tool', 'Type', 'Notes'],
          rows: [
            [
              'Vitest',
              'Unit / integration',
              'Vite-native, Jest-compatible API, fast HMR-based watch mode',
            ],
            [
              'Vue Test Utils',
              'Component testing',
              'Official library for mounting and interacting with Vue components',
            ],
            [
              'Cypress Component Testing',
              'Component / E2E',
              'Mount Vue components in real browser, visual debugging',
            ],
            [
              'Playwright',
              'E2E',
              'Cross-browser E2E testing, Vue component testing via experimental CT mode',
            ],
          ],
        },
        {
          type: 'subheading',
          text: 'Developer Tools',
        },
        {
          type: 'table',
          headers: ['Tool', 'Purpose', 'Notes'],
          rows: [
            [
              'Vue DevTools',
              'Browser extension',
              'Inspect components, Pinia stores, routes, timeline, and performance',
            ],
            [
              'Volar / vue-tsc',
              'IDE support + type checking',
              'Official VS Code extension; vue-tsc for CI type checking',
            ],
            [
              'VitePress',
              'Static site generator',
              'Vue-powered, Markdown-based, ideal for documentation sites',
            ],
            [
              'Histoire',
              'Component stories/playground',
              'Vue-native alternative to Storybook, Vite-powered, fast HMR',
            ],
          ],
        },
        {
          type: 'subheading',
          text: 'Build Tools',
        },
        {
          type: 'table',
          headers: ['Tool', 'Purpose', 'Notes'],
          rows: [
            [
              'Vite',
              'Dev server + bundler',
              'Created by Evan You; instant HMR, Rollup-based production builds',
            ],
            [
              'Rollup',
              'Library bundler',
              'Tree-shakeable ES module output; used internally by Vite',
            ],
            [
              'unplugin ecosystem',
              'Universal plugins',
              'unplugin-vue-components (auto-import), unplugin-auto-import, unplugin-icons',
            ],
          ],
        },
        {
          type: 'subheading',
          text: 'Animation',
        },
        {
          type: 'table',
          headers: ['Library', 'Approach', 'Notes'],
          rows: [
            [
              'Vue Transition',
              'Built-in CSS/JS hooks',
              'Native <Transition> and <TransitionGroup> components, zero dependencies',
            ],
            [
              'GSAP',
              'Imperative JS animation',
              'Industry-standard timeline animations; use with onMounted + template refs',
            ],
            [
              'Motion One',
              'Web Animations API',
              'Lightweight, performant; @vueuse/motion provides Vue composables',
            ],
            [
              'AutoAnimate',
              'Automatic transitions',
              'One-line setup: add v-auto-animate directive for list/layout animations',
            ],
          ],
        },
        {
          type: 'tip',
          content:
            'Pinia has replaced Vuex as the official state management solution. It is simpler, fully typed, modular (no nested modules), and works seamlessly with Vue DevTools. All new projects should use Pinia.',
        },
        {
          type: 'tip',
          content:
            'VueUse is the Swiss Army knife of Vue composables. Before writing a custom composable, check if VueUse already has it -- it covers sensors, browser APIs, state, animations, and utilities.',
        },
      ],
    },
  ],
};
