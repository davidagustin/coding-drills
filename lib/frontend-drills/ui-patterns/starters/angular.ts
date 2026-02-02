/**
 * Hand-crafted starter code for Angular UI patterns.
 * Each entry provides syntactically valid boilerplate with state declarations,
 * TODO steps, and framework wrappers so users focus on business logic.
 */
export const angularStarters: Record<string, string> = {
  'ng-reactive-forms': `// Simulating Angular Reactive Forms behavior
const form = document.getElementById('ng-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

// Step 1: Create a validate() function
// It should accept an input element, an error element ID, and an array of rule objects
// Each rule has a test(value) function and a msg string
// Loop through rules, if any test fails, display the msg in the error element and return false
// If all pass, clear the error text and return true

// Step 2: Define validation rules for each field
// nameRules: require non-empty trimmed value
// emailRules: require non-empty value AND must contain '@'

// Step 3: Add 'input' event listeners on nameInput and emailInput
// Each should call validate() with the appropriate rules

// Step 4: Add 'submit' event listener on the form
// Prevent default, validate both fields
// If both valid, show the #result element with a welcome message`,

  'ng-template-forms': `// Simulating Angular template-driven forms with two-way binding
const username = document.getElementById('username');
const color = document.getElementById('color');
const agree = document.getElementById('agree');
const btn = document.getElementById('submit-btn');
const form = document.getElementById('tpl-form');
const hint = document.getElementById('username-hint');

// Step 1: Create a syncState() function
// Check if username has >= 2 chars, color is selected, and agree is checked
// Enable/disable the submit button based on validity
// Show hint text 'Min 2 characters' if username is non-empty but too short

// Step 2: Add 'input' listener on username, 'change' on color and agree
// All three should call syncState()

// Step 3: Add 'submit' listener on the form
// Prevent default, show #output element with a greeting that includes username and color`,

  'ng-custom-validators': `// Simulating Angular custom validators (sync + cross-field)
const pw = document.getElementById('password');
const cf = document.getElementById('confirm');
const form = document.getElementById('val-form');

// Password validation rules - each has an element reference and a test function
const rules = {
  len: { el: document.getElementById('rule-len'), test: null },
  upper: { el: document.getElementById('rule-upper'), test: null },
  num: { el: document.getElementById('rule-num'), test: null },
  special: { el: document.getElementById('rule-special'), test: null },
};

// Step 1: Fill in each rule's test function
// len: value.length >= 8
// upper: /[A-Z]/.test(value)
// num: /[0-9]/.test(value)
// special: /[!@#$%^&*]/.test(value)

// Step 2: Create validatePw() function
// Loop through rules, toggle 'pass' class on each rule element
// Show error in #pw-error if password has value but not all rules pass
// Return boolean indicating all rules pass

// Step 3: Create validateMatch() function
// Compare pw.value with cf.value
// Show error in #cf-error if confirm has value but doesn't match
// Return boolean

// Step 4: Add 'input' listeners on pw and cf
// pw input should call validatePw(), and also validateMatch() if cf has a value
// cf input should call validateMatch()

// Step 5: Add 'submit' listener on form
// Prevent default, if both validatePw() and validateMatch() pass, show #result`,

  'ng-autocomplete': `// Simulating Angular autocomplete with RxJS debounceTime + switchMap
const fruits = ['Apple','Apricot','Avocado','Banana','Blueberry','Cherry','Coconut','Cranberry','Dragon Fruit','Fig','Grape','Guava','Kiwi','Lemon','Lime','Mango','Melon','Nectarine','Orange','Papaya','Peach','Pear','Pineapple','Plum','Pomegranate','Raspberry','Strawberry','Watermelon'];
const input = document.getElementById('search');
const list = document.getElementById('results');
const spinner = document.getElementById('spinner');
let timer = null;

// Step 1: Create a highlight(text, query) function
// Find the query substring within text (case-insensitive)
// Wrap the matching portion in <mark> tags and return the result

// Step 2: Create a search(query) function
// Show the spinner, then use setTimeout (300ms) to simulate an async API call
// Filter fruits that include the query (case-insensitive)
// Render matches as <li> elements using highlight(), or show 'No results'
// Hide the spinner when done

// Step 3: Add 'input' listener on the input element
// Clear any existing timer (clearTimeout) and clear the results list
// If input is empty, hide spinner and return
// Set a new timer with 250ms delay (debounce) that calls search()

// Step 4: Add 'click' listener on the results list
// When a <li> is clicked, set input.value to the clicked text and clear the list`,

  'ng-file-upload': `// Simulating Angular HttpClient file upload with progress
const zone = document.getElementById('drop-zone');
const input = document.getElementById('file-input');
const list = document.getElementById('file-list');

// Step 1: Create a formatSize(bytes) function
// Return human-readable size: bytes as 'B', kilobytes as 'KB', megabytes as 'MB'

// Step 2: Add event listeners on the drop zone
// 'click' -> trigger input.click()
// 'dragover' -> preventDefault, add 'over' class
// 'dragleave' -> remove 'over' class
// 'drop' -> preventDefault, remove 'over' class, call handleFiles(e.dataTransfer.files)
// Also add 'change' listener on input to call handleFiles(input.files)

// Step 3: Create handleFiles(files) function
// For each file, create a div.file-item with:
//   - file name, formatted size, a progress bar (.fill at width:0%), and a status div
// Append to list, then call simulateUpload(item)

// Step 4: Create simulateUpload(item) function
// Use setInterval (200ms) to increment a percentage by random 5-20 each tick
// Update the .fill element width
// When >= 100%, clearInterval, set status to 'Upload complete'`,

  'ng-date-picker': `// Simulating Angular Material Datepicker
const input = document.getElementById('date-input');
const cal = document.getElementById('calendar');
const grid = document.getElementById('cal-grid');
const label = document.getElementById('month-label');
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const days = ['Su','Mo','Tu','We','Th','Fr','Sa'];
let current = new Date();
let selectedDate = null;

// Step 1: Create a toggle() function
// Toggle cal display between 'none' and 'block'
// If showing, call render()

// Step 2: Add click listeners on #cal-btn and input to call toggle()
// Add click listeners on #prev-month and #next-month
// prev-month: decrement current month, call render()
// next-month: increment current month, call render()

// Step 3: Create render() function
// Set label text to "Month Year"
// Render day-of-week labels (Su Mo Tu ... Sa) as .day-label divs
// Calculate first day of month and total days
// Add empty divs for offset, then .day divs for each date
// Mark today with 'today' class, selected date with 'selected' class

// Step 4: Add click listener on grid
// When a .day is clicked, set selectedDate, update input value (MM/DD/YYYY)
// Update #selected text, hide calendar

function render() {
  // Update the calendar grid based on current month/year
}

render();`,

  'ng-dynamic-forms': `// Simulating Angular dynamic form generation from schema
const form = document.getElementById('dynamic-form');
const submitBtn = document.getElementById('submit-btn');
let fieldId = 0;

// Step 1: Add click listener on .schema-bar
// Read e.target.dataset.type to determine field type (text, email, select, checkbox)
// Call addField(type) if a valid type is found

// Step 2: Create addField(type) function
// Increment fieldId, create a div.field element
// Based on type, generate appropriate HTML:
//   'select' -> <select> with placeholder and options A, B, C
//   'checkbox' -> <label> with <input type="checkbox">
//   'text'/'email' -> <input type="...">
// Add a .remove button, append to form, show submitBtn
// Add click listener on .remove to remove the field div

// Step 3: Add click listener on submitBtn
// Iterate all inputs/selects in the form
// Collect values (checkbox -> .checked, others -> .value)
// Display JSON in #output`,

  'ng-input-mask': `// Simulating Angular input mask directives via HostListener
const phone = document.getElementById('phone');
const card = document.getElementById('card');
const currency = document.getElementById('currency');
const vals = document.getElementById('values');

// Helper: strip all non-digit characters
function digits(v) { return v.replace(/\\D/g, ''); }

// Step 1: Add 'input' listener on phone
// Extract digits (max 10), format as (XXX) XXX-XXXX
// Set phone.value to the formatted string, call updateValues()

// Step 2: Add 'input' listener on card
// Extract digits (max 16), group into chunks of 4 separated by spaces
// Set card.value to the formatted string, call updateValues()

// Step 3: Add 'input' listener on currency
// Extract digits, divide by 100 to get dollar amount
// Format with $ prefix, 2 decimal places, and comma separators
// Set currency.value to the formatted string, call updateValues()

// Step 4: Create updateValues() function
// Display raw digit values for all three fields in the #values element`,

  'ng-select-dropdown': `// Simulating Angular custom select with ControlValueAccessor
const items = ['Angular','React','Vue','Svelte','Solid','Ember','Next.js','Nuxt','Remix','Astro'];
const trigger = document.getElementById('trigger');
const dropdown = document.getElementById('dropdown');
const optionsList = document.getElementById('options');
const filter = document.getElementById('filter');
const selText = document.getElementById('selected-text');
let selectedVal = '';
let activeIdx = -1;

// Step 1: Create renderOptions(query) function
// Filter items by query (case-insensitive)
// Render as <li> elements with data-value attribute
// Add 'selected' class if item matches selectedVal
// Add 'active' class if index matches activeIdx

// Step 2: Create open() and close() functions
// open: show dropdown, reset filter and activeIdx, call renderOptions(''), focus filter
// close: hide dropdown

// Step 3: Add click listener on trigger to toggle open/close
// Add input listener on filter to reset activeIdx and re-render options

// Step 4: Add click listener on optionsList
// When an option is clicked, set selectedVal, update selText, update #value-display, close()

// Step 5: Add keydown listener on document for keyboard navigation
// ArrowDown/ArrowUp: adjust activeIdx within bounds
// Enter: click the active option
// Escape: close the dropdown

// Step 6: Add click listener on document to close when clicking outside #select-wrap`,

  'ng-inline-edit': `// Simulating Angular inline editing with ControlValueAccessor
const data = [
  { name: 'Alice Johnson', role: 'Developer', email: 'alice@example.com' },
  { name: 'Bob Smith', role: 'Designer', email: 'bob@example.com' },
  { name: 'Carol White', role: 'Manager', email: 'carol@example.com' },
];
const tbody = document.getElementById('table-body');

// Step 1: Create render() function
// Generate table rows from data array
// Each <td> should have data-row (index) and data-col (field name) attributes

// Step 2: Add click listener on tbody
// Find the clicked <td>, skip if already editing
// Get the row index and column name from data attributes
// Store the original value
// Replace cell content with an <input> pre-filled with the original value
// Add 'editing' class, focus and select the input

// Step 3: Implement save and cancel behavior on the input
// 'Enter' key -> save: update data[row][col] with input value, re-render
// 'Escape' key -> cancel: restore original value, re-render
// 'blur' event -> save

function render() {
  // Render table rows from data
}

render();`,

  'ng-modal-dialog': `// Simulating Angular CDK Overlay modal dialog
const backdrop = document.getElementById('backdrop');
const status = document.getElementById('status');

// Step 1: Create openModal() function
// Set backdrop display to 'flex'

// Step 2: Create closeModal(msg) function
// Hide the backdrop, if msg is provided set status.textContent

// Step 3: Add click listeners
// #open-btn -> openModal()
// #close-x -> closeModal('Modal dismissed')
// #cancel-btn -> closeModal('Cancelled')
// #confirm-btn -> closeModal('Confirmed!')

// Step 4: Add click listener on backdrop
// If the click target is the backdrop itself (not modal content), dismiss

// Step 5: Add keydown listener on document
// If Escape is pressed while modal is visible, dismiss`,

  'ng-drag-drop': `// Simulating Angular CDK DragDrop
const tasks = [
  { text: 'Setup project', tag: 'config', col: 'todo' },
  { text: 'Design UI', tag: 'design', col: 'todo' },
  { text: 'Write API', tag: 'backend', col: 'todo' },
  { text: 'Auth module', tag: 'feature', col: 'progress' },
  { text: 'Unit tests', tag: 'testing', col: 'done' },
];

let dragIdx = null;

// Step 1: Create render() function
// For each column ('todo', 'progress', 'done'), get the zone element by ID
// Clear it, then create .card elements for tasks in that column
// Set draggable=true and data-idx to the task's index in the tasks array
// Each card shows the task text and a .tag span

// Step 2: Add dragstart listener on document
// If the dragged element is a .card, store its index in dragIdx
// Set opacity to 0.4 for visual feedback

// Step 3: Add dragend listener on document
// Restore opacity, remove 'over' class from all drop zones

// Step 4: For each .drop-zone element, add:
// 'dragover' -> preventDefault, add 'over' class
// 'dragleave' -> remove 'over' class
// 'drop' -> preventDefault, remove 'over', update tasks[dragIdx].col to zone.id, re-render

function render() {
  // Render task cards into their respective columns
}

render();`,

  'ng-data-table': `// Simulating Angular MatTable with MatSort and MatPaginator
const data = [
  {name:'Alice',age:28,city:'NYC'},{name:'Bob',age:35,city:'LA'},
  {name:'Carol',age:22,city:'Chicago'},{name:'Dave',age:41,city:'NYC'},
  {name:'Eve',age:30,city:'Boston'},{name:'Frank',age:27,city:'LA'},
  {name:'Grace',age:33,city:'Seattle'},{name:'Hank',age:45,city:'Denver'},
  {name:'Ivy',age:26,city:'Miami'},{name:'Jack',age:38,city:'Portland'},
  {name:'Kate',age:29,city:'Austin'},{name:'Leo',age:31,city:'Chicago'},
];
const pageSize = 4;
let page = 0;
let sortCol = null;
let sortDir = 'asc';

// Step 1: Create sorted() function
// If no sortCol, return a copy of data
// Otherwise sort by sortCol: numbers use subtraction, strings use localeCompare
// Flip comparison based on sortDir ('asc' vs 'desc')

// Step 2: Create render() function
// Get sorted data, slice for current page (page * pageSize)
// Render rows into #tbody
// Update #page-info text ("Page X of Y")
// Enable/disable #prev-btn and #next-btn
// Show sort indicator (triangle) in the active column's sort span

// Step 3: Add click listeners on th.sortable elements
// Toggle sortDir if same column, otherwise set new sortCol with 'asc'
// Reset page to 0, re-render

// Step 4: Add click listeners on #prev-btn and #next-btn
// Decrement/increment page, re-render

function render() {
  // Display current page of sorted data
}

render();`,

  'ng-tabs': `// Simulating Angular tab navigation with lazy loading
const panels = {
  overview: '<div class="panel-title">Project Overview</div><p class="panel-text">This is a comprehensive project management tool built with Angular. It provides real-time collaboration, task tracking, and team analytics.</p>',
  features: '<ul class="feature-list"><li>Real-time collaboration</li><li>Drag & drop Kanban board</li><li>Team analytics dashboard</li><li>Custom workflows</li><li>API integrations</li></ul>',
  pricing: '<div class="price-card"><div class="amount">$29</div><div class="period">/month per user</div><p class="panel-text" style="margin-top:12px">Includes all features, unlimited projects, and priority support.</p></div>'
};

const tabBar = document.getElementById('tab-bar');
const panel = document.getElementById('panel');
const loading = document.getElementById('loading');

// Step 1: Create switchTab(tabId) function
// Toggle 'active' class on tab buttons based on tabId
// Clear the panel content
// Show the loading indicator
// After a 300ms delay (simulating lazy load), hide loading and set panel HTML from panels object

// Step 2: Add click listener on tabBar
// When a .tab button is clicked, call switchTab with the tab's data-tab value

// Step 3: Initialize by calling switchTab('overview')`,

  'ng-accordion': `// Simulating Angular animations API accordion
const accordion = document.getElementById('accordion');
let openIdx = -1;

// Step 1: Add click listener on the accordion container
// Find the closest .panel-header from the click target
// Get the panel index from data-idx attribute
// Check if this panel was already open

// Step 2: Close all panels
// Remove 'open' class from all .panel-header and .panel-body elements

// Step 3: If the clicked panel was NOT already open, open it
// Add 'open' class to the header and its next sibling (.panel-body)
// Update openIdx accordingly (set to clicked index, or -1 if closing)`,

  'ng-stepper': `// Simulating Angular MatStepper wizard
const formData = { email: '', password: '', name: '', bio: '' };
const content = document.getElementById('step-content');
const stepsEl = document.getElementById('steps');
let current = 0;

// Step templates - each returns HTML for its step
const stepTemplates = [
  function() { return '<label>Email</label><input id="f-email" placeholder="you@example.com" value="' + formData.email + '" /><label>Password</label><input id="f-password" type="password" placeholder="Password" value="' + formData.password + '" />'; },
  function() { return '<label>Full Name</label><input id="f-name" placeholder="Your name" value="' + formData.name + '" /><label>Bio</label><input id="f-bio" placeholder="Short bio" value="' + formData.bio + '" />'; },
  function() { return '<div class="review-item"><strong>Email:</strong> ' + (formData.email || '(empty)') + '</div><div class="review-item"><strong>Name:</strong> ' + (formData.name || '(empty)') + '</div><div class="review-item"><strong>Bio:</strong> ' + (formData.bio || '(empty)') + '</div>'; }
];

// Step 1: Create saveStep() function
// Based on current step index, read input values and save to formData
// Step 0: read f-email and f-password
// Step 1: read f-name and f-bio

// Step 2: Create render() function
// Set content.innerHTML from stepTemplates[current]()
// Update step indicators: 'active' for current, 'done' for completed steps
// Show/hide #prev-step button (hide on first step)
// Change #next-step text to 'Finish' on last step

// Step 3: Add click listener on #next-step
// Call saveStep(), advance to next step and render
// On final step, show completion message

// Step 4: Add click listener on #prev-step
// Call saveStep(), go back one step and render

function render() {
  // Display current step content and update step indicators
}

render();`,

  'ng-carousel': `// Simulating Angular carousel with animations and auto-play
const slides = [
  { title: 'Angular Components', desc: 'Build reusable UI building blocks', bg: '#1e293b' },
  { title: 'RxJS Observables', desc: 'Handle async data streams elegantly', bg: '#172135' },
  { title: 'Dependency Injection', desc: 'Manage services with a hierarchical DI system', bg: '#1a2332' },
  { title: 'Angular CLI', desc: 'Scaffold, build, and deploy with ease', bg: '#1e293b' },
];

const track = document.getElementById('track');
const indicators = document.getElementById('indicators');
let current = 0;
let playing = true;
let timer;

// Step 1: Build the slide HTML
// Render slides into the track as .slide divs with background color, title, and description
// Render indicator dots into the indicators container, first dot active

// Step 2: Create goTo(idx) function
// Wrap index with modulo for looping
// Set track transform to translateX(-N%) where N = current * 100
// Toggle 'active' class on the corresponding indicator dot

// Step 3: Add click listeners
// #prev-btn -> goTo(current - 1)
// #next-btn -> goTo(current + 1)
// indicators -> when a .dot is clicked, goTo its data-idx

// Step 4: Create autoPlay() function
// Use setInterval (3000ms) to advance to next slide

// Step 5: Add click listener on #play-btn
// Toggle playing state, update button text ('Pause' / 'Play')
// Start or stop autoplay accordingly`,

  'ng-virtual-scroll': `// Simulating Angular CDK Virtual Scrolling
const TOTAL = 10000;
const ROW_HEIGHT = 40;
const viewport = document.getElementById('viewport');
const scrollContent = document.getElementById('scroll-content');
const renderedEl = document.getElementById('rendered');

// Set the scroll content height to TOTAL * ROW_HEIGHT
scrollContent.style.height = TOTAL * ROW_HEIGHT + 'px';

// Label generator for variety
function getLabel(i) {
  var names = ['Component','Service','Module','Directive','Pipe','Guard','Resolver','Interceptor'];
  return names[i % names.length] + ' #' + (i + 1);
}

// Step 1: Create renderVisible() function
// Calculate the visible range based on viewport.scrollTop and viewport.clientHeight
// startIdx = Math.floor(scrollTop / ROW_HEIGHT)
// endIdx = startIdx + Math.ceil(viewHeight / ROW_HEIGHT) + 2 (buffer), capped at TOTAL
// Generate .row divs with position:absolute and top set to i * ROW_HEIGHT
// Each row shows its index number and label
// Update renderedEl text with "Rendered: X of 10,000"

// Step 2: Add 'scroll' listener on viewport to call renderVisible()

// Step 3: Call renderVisible() on init`,

  'ng-context-menu': `// Simulating Angular CDK Overlay context menu
const menu = document.getElementById('context-menu');
const log = document.getElementById('log');
let targetItem = null;

// Step 1: Add 'contextmenu' listener on #items container
// Find the closest .item element from the event target
// Prevent default browser context menu
// Store the item's text in targetItem
// Show the custom menu, position it at the click coordinates
// Clamp position so menu doesn't overflow the viewport

// Step 2: Add click listener on the menu
// Read data-action from the clicked .menu-item
// Capitalize the action name and display it with the target item name in the log
// Hide the menu

// Step 3: Add click listener on document to hide the menu
// Step 4: Add keydown listener for Escape to hide the menu`,

  'ng-toast-notifications': `// Simulating Angular toast notification service with DI
const container = document.getElementById('toast-container');
const messages = {
  success: 'Operation completed successfully!',
  error: 'Something went wrong. Please try again.',
  warning: 'Please check your input values.',
  info: 'New updates are available.',
};
const icons = { success: '\\u2713', error: '\\u2717', warning: '\\u26A0', info: '\\u2139' };

// Step 1: Create showToast(type) function
// Create a div.toast with the type as a class
// Set innerHTML with icon, message, and a .close button
// Append to container
// Add click listener on .close to call removeToast()
// Set a 3500ms timeout to auto-remove the toast

// Step 2: Create removeToast(toast) function
// If toast is no longer in the DOM, return early
// Apply fadeOut animation, then remove element after 300ms

// Step 3: Add click listener on .btn-row
// Read data-type from the clicked button, call showToast(type)`,

  'ng-data-visualization': `// Simulating Angular data visualization (bar, line, pie charts)
const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const colors = ['#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899'];
let chartType = 'bar';

function randData() { return labels.map(function() { return Math.floor(Math.random() * 80) + 20; }); }
let data = randData();

// Step 1: Create drawBar() function
// Calculate bar width and positions with padding
// For each data point, draw a filled rectangle using ctx.fillRect
// Draw labels below and values above each bar

// Step 2: Create drawLine() function
// Plot data points connected by a line using ctx.beginPath/moveTo/lineTo/stroke
// Draw circles at each data point using ctx.arc
// Draw labels below each point

// Step 3: Create drawPie() function
// Calculate total, draw arcs proportional to each value using ctx.arc
// Label each slice around the outside of the pie

// Step 4: Create draw() function
// Clear the canvas with ctx.clearRect
// Call the appropriate drawing function based on chartType

// Step 5: Add click listener on .chart-tabs
// Update chartType from data-chart attribute, toggle 'active' class, call draw()

// Step 6: Add click listener on #refresh to regenerate data and redraw`,

  'ng-search-filter': `// Simulating Angular custom pipe for search filtering
const items = [
  {name:'Angular',cat:'framework'},{name:'React',cat:'framework'},
  {name:'Vue',cat:'framework'},{name:'Svelte',cat:'framework'},
  {name:'TypeScript',cat:'language'},{name:'JavaScript',cat:'language'},
  {name:'Python',cat:'language'},{name:'Rust',cat:'language'},
  {name:'Webpack',cat:'tool'},{name:'Vite',cat:'tool'},
  {name:'ESLint',cat:'tool'},{name:'Prettier',cat:'tool'},
];
const input = document.getElementById('search');
const list = document.getElementById('list');
const countEl = document.getElementById('count');
let activeCat = 'all';

// Step 1: Create highlight(text, query) function
// Find query within text (case-insensitive)
// Wrap the matching portion in <mark> tags

// Step 2: Create render() function
// Get search query from input, filter items by:
//   - activeCat matches item.cat (or 'all' shows everything)
//   - query matches item.name (case-insensitive)
// Render as <li> with highlighted name and category badge
// Update countEl with "X of Y items"

// Step 3: Add 'input' listener on input to call render()

// Step 4: Add click listener on .tags container
// Read data-cat from clicked tag, set activeCat, toggle 'active' class, render()

render();`,

  'ng-infinite-scroll': `// Simulating Angular infinite scroll with Intersection Observer
const container = document.getElementById('items');
const sentinel = document.getElementById('sentinel');
const loader = document.getElementById('loader');
const statusEl = document.getElementById('status');
const avatarColors = ['#ef4444','#f97316','#22c55e','#3b82f6','#8b5cf6','#ec4899'];
let page = 0;
let loading = false;
const BATCH = 8;
const MAX = 50;

// Step 1: Create genItems(start, count) function
// Generate HTML for item cards from start index
// Each card has a colored avatar with a letter, a name, and a description
// Stop at MAX items

// Step 2: Create loadMore() function
// If already loading or all items loaded, return
// Set loading flag, show loader element
// After a 500ms delay (simulating API call):
//   - Append generated HTML to container
//   - Increment page, clear loading flag, hide loader
//   - Update status text with "Loaded: X of 50 items"

// Step 3: Set up IntersectionObserver
// Observe the sentinel element within #scroll-area
// When sentinel is visible (isIntersecting), call loadMore()

// Step 4: Trigger initial loadMore()`,

  'ng-gallery': `// Simulating Angular image gallery with lightbox overlay
const images = [
  { emoji: '\\u{1F305}', label: 'Sunrise', bg: '#7c3aed' },
  { emoji: '\\u{1F3D4}', label: 'Mountain', bg: '#2563eb' },
  { emoji: '\\u{1F30A}', label: 'Ocean Wave', bg: '#0891b2' },
  { emoji: '\\u{1F33B}', label: 'Sunflower', bg: '#ca8a04' },
  { emoji: '\\u{1F30C}', label: 'Galaxy', bg: '#7c3aed' },
  { emoji: '\\u{1F308}', label: 'Rainbow', bg: '#059669' },
  { emoji: '\\u{1F3DE}', label: 'Landscape', bg: '#16a34a' },
  { emoji: '\\u{1F319}', label: 'Night Sky', bg: '#1e3a5f' },
  { emoji: '\\u{1F33F}', label: 'Nature', bg: '#15803d' },
];

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
let currentIdx = 0;

// Step 1: Render gallery thumbnails
// Create .thumb divs with background color, emoji, and data-idx attribute

// Step 2: Create showLightbox(idx) function
// Set currentIdx, update lbImg background and text content (emoji)
// Update lbCaption with label and position (e.g., "Sunrise (1/9)")
// Show lightbox

// Step 3: Create closeLightbox() function
// Hide the lightbox

// Step 4: Add click listener on gallery
// When a .thumb is clicked, call showLightbox with its data-idx

// Step 5: Add click listeners on lightbox controls
// #lb-close -> closeLightbox()
// #lb-prev -> show previous image (wrap around)
// #lb-next -> show next image (wrap around)
// Clicking lightbox backdrop -> closeLightbox()

// Step 6: Add keydown listener for keyboard navigation
// Escape -> close, ArrowLeft -> prev, ArrowRight -> next`,

  'ng-cards-grid': `// Simulating Angular Flex Layout responsive card grid
const cards = [
  { icon: '\\u{1F4E6}', title: 'Components', desc: 'Reusable building blocks for UI', tag: 'core' },
  { icon: '\\u{1F527}', title: 'Services', desc: 'Shared logic and data access', tag: 'core' },
  { icon: '\\u{1F6E1}', title: 'Guards', desc: 'Route protection and auth', tag: 'routing' },
  { icon: '\\u{1F4E1}', title: 'Interceptors', desc: 'HTTP request/response handling', tag: 'http' },
  { icon: '\\u{1F3AF}', title: 'Directives', desc: 'DOM manipulation utilities', tag: 'template' },
  { icon: '\\u{1F50D}', title: 'Pipes', desc: 'Data transformation in templates', tag: 'template' },
];

const grid = document.getElementById('grid');

// Step 1: Create render() function
// Generate .card elements from the cards array
// Each card has .card-icon, .card-title, .card-desc, and .card-tag sections

// Step 2: Add click listener on .toolbar
// Read data-cols from the clicked button
// Toggle 'active' class on column buttons
// Update grid.style.gridTemplateColumns to "repeat(N, 1fr)"

// Step 3: Call render() on init

function render() {
  // Render cards into the grid
}

render();`,

  'ng-sort-filter-table': `// Simulating Angular MatTableDataSource with custom filter predicate
const data = [
  {name:'Alice',dept:'Engineering',level:'senior',score:95},
  {name:'Bob',dept:'Design',level:'mid',score:82},
  {name:'Carol',dept:'Marketing',level:'junior',score:78},
  {name:'Dave',dept:'Engineering',level:'mid',score:88},
  {name:'Eve',dept:'Design',level:'senior',score:91},
  {name:'Frank',dept:'Marketing',level:'mid',score:74},
  {name:'Grace',dept:'Engineering',level:'junior',score:85},
  {name:'Hank',dept:'Design',level:'junior',score:69},
];

let sortCol = null, sortDir = 'asc';
const searchEl = document.getElementById('search');
const deptEl = document.getElementById('filter-dept');
const levelEl = document.getElementById('filter-level');

// Step 1: Create filtered() function
// Read search query, department filter, and level filter
// Filter data matching all active criteria (name search is case-insensitive)
// If sortCol is set, sort the results (numbers by subtraction, strings by localeCompare)
// Flip comparison based on sortDir

// Step 2: Create render() function
// Call filtered() to get the visible rows
// Render into #tbody, or show "No results" if empty
// Update #result-count with "X of Y records"

// Step 3: Add input/change listeners on searchEl, deptEl, levelEl to call render()

// Step 4: Add click listeners on th.sortable elements
// Toggle sort direction if same column, otherwise reset to 'asc'
// Call render()

function render() {
  // Display filtered and sorted data
}

render();`,

  'ng-dashboard': `// Simulating Angular CDK DragDrop dashboard with local storage
const widgetTypes = [
  { title: 'Revenue', value: '$12.4K', label: 'This month' },
  { title: 'Users', value: '1,284', label: 'Active users' },
  { title: 'Orders', value: '356', label: 'Pending orders' },
  { title: 'Uptime', value: '99.9%', label: 'Last 30 days' },
];

let widgets = JSON.parse(localStorage.getItem('ng-dash') || 'null') || widgetTypes.slice(0, 4).map(function(w, i) { return Object.assign({}, w, { id: i }); });
let nextId = widgets.length;

function save() { localStorage.setItem('ng-dash', JSON.stringify(widgets)); }

// Step 1: Create render() function
// Build .widget elements from the widgets array, each with:
//   - draggable="true" and data-id attribute
//   - .widget-header with title and .remove button
//   - .widget-body with .big-num (value) and .label
// If no widgets, show a placeholder message
// Call setupDrag() after rendering

// Step 2: Create setupDrag() function
// For each .widget, add drag event listeners:
//   dragstart: store the widget id, add 'dragging' class
//   dragend: remove 'dragging' and 'over' classes
//   dragover: preventDefault, add 'over' class
//   dragleave: remove 'over' class
//   drop: swap positions in the widgets array, save and re-render
// For each .remove button, add click listener to remove widget from array

// Step 3: Add click listener on #add-widget
// Add a new widget from widgetTypes (cycling), save and render

// Step 4: Add click listener on #reset-btn
// Reset widgets to initial 4, save and render

function render() {
  // Render widgets into the dashboard grid
}

render();`,

  'ng-sidebar': `// Simulating Angular collapsible sidebar with router
const sidebar = document.getElementById('sidebar');
const navList = document.getElementById('nav-list');
const subMenu = document.getElementById('sub-settings');
const pageTitle = document.getElementById('page-title');

// Step 1: Add click listener on #toggle-btn
// Toggle 'collapsed' class on the sidebar element

// Step 2: Add click listener on navList
// Find the clicked .nav-item
// If it has 'has-sub' class, toggle the sub-menu visibility and arrow rotation
// Otherwise, remove 'active' from all nav items, add 'active' to the clicked one
// Update pageTitle text to the route name (capitalized)`,

  'ng-navbar': `// Simulating Angular responsive navbar with route guards
let loggedIn = false;
const links = document.getElementById('nav-links');
const pageName = document.getElementById('page-name');
const userBadge = document.getElementById('user-badge');
const loginBtn = document.getElementById('login-btn');
const mobileMenu = document.getElementById('mobile-menu');
const hamburger = document.getElementById('hamburger');

// Step 1: Create navigate(route, el) function
// If route is 'pricing' and user is not logged in, show "Access Denied" message
// Otherwise, remove 'active' from all .nav-link elements
// If el is provided, add 'active' class to it
// Update pageName text (capitalize route name)
// Hide mobile menu

// Step 2: Add click listener on links container
// Call navigate with the clicked element's data-route

// Step 3: Add click listener on mobileMenu
// Call navigate with the clicked element's data-route

// Step 4: Add click listener on hamburger
// Toggle mobile menu display between 'none' and 'flex'

// Step 5: Add click listener on loginBtn
// Toggle loggedIn state
// Update button text ('Login' / 'Logout') and badge text ('Guest' / 'Admin')`,

  'ng-breadcrumbs': `// Simulating Angular auto-generated breadcrumbs from router config
const crumbsEl = document.getElementById('breadcrumbs');
let currentPath = 'home';

// Step 1: Create renderBreadcrumbs(path) function
// Split path by '/' into parts
// For each part, build a .crumb span with:
//   - data-path set to the full path up to that point
//   - 'current' class on the last part
//   - Separator '/' between crumbs
// Capitalize each part name

// Step 2: Create navigate(path) function
// Set currentPath, call renderBreadcrumbs(path)
// Toggle 'active' class on .route-item elements matching the path

// Step 3: Add click listener on .route-tree
// When a .route-item is clicked, call navigate with its data-path

// Step 4: Add click listener on crumbsEl
// When a non-current .crumb is clicked, navigate to its data-path

// Step 5: Initialize with navigate('home')`,

  'ng-bottom-nav': `// Simulating Angular mobile bottom navigation with routerLinkActive
const nav = document.getElementById('bottom-nav');
const title = document.getElementById('screen-title');
const body = document.getElementById('screen-body');

const screens = {
  home: 'Welcome to the app! Browse recent activity and updates.',
  search: 'Search for content, users, and more.',
  add: 'Create new content or start a new project.',
  inbox: 'You have 3 unread messages in your inbox.',
  profile: 'View and edit your profile settings.',
};

// Step 1: Add click listener on nav
// Find the clicked .bnav-item
// Get the route from data-route attribute
// Remove 'active' from all .bnav-item elements, add 'active' to clicked
// Update title text (capitalize route name)
// Update body text from the screens object`,

  'ng-mega-menu': `// Simulating Angular multi-level mega menu
const menus = {
  products: [
    { title: 'Analytics', items: ['Dashboard','Reports','Insights'] },
    { title: 'Automation', items: ['Workflows','Triggers','Scheduler'] },
    { title: 'Integrations', items: ['API','Webhooks','Plugins'] }
  ],
  solutions: [
    { title: 'Enterprise', items: ['Security','Compliance','SSO'] },
    { title: 'Startups', items: ['Free Tier','Growth Plan','Support'] },
    { title: 'Teams', items: ['Collaboration','Shared Workspace','Chat'] }
  ],
  resources: [
    { title: 'Learn', items: ['Documentation','Tutorials','Videos'] },
    { title: 'Community', items: ['Forum','Discord','Events'] },
    { title: 'Support', items: ['Contact Us','FAQ','Status Page'] }
  ]
};

const bar = document.getElementById('menu-bar');
const panel = document.getElementById('mega-panel');
let activeMenu = null;

// Step 1: Add click listener on bar
// Find the clicked .menu-trigger, get its data-menu value
// If same menu is already open, call closeMenu() and return
// Set activeMenu, toggle 'active' class on triggers
// Build mega panel HTML with .mega-columns grid
// Each column has an <h4> title and links from items array
// Show the panel

// Step 2: Create closeMenu() function
// Set activeMenu to null, hide panel, remove 'active' from all triggers

// Step 3: Add click listener on document
// If click is outside menu-bar and mega-panel, close menu

// Step 4: Add keydown listener for Escape to close menu`,

  'ng-pagination': `// Simulating Angular pagination with router query params
const allItems = Array.from({ length: 23 }, function(_, i) { return 'Item ' + (i + 1); });
let page = 1;
let pageSize = 5;

function totalPages() { return Math.ceil(allItems.length / pageSize); }

// Step 1: Create render() function
// Slice allItems for current page
// Render items as <li> elements in #item-list
// Build paginator HTML with prev button, numbered page buttons, and next button
// Add 'active' class to current page button
// Disable prev on first page, next on last page
// Update #url-bar with simulated URL "/items?page=X&size=Y"

// Step 2: Add click listener on #paginator (event delegation)
// Handle prev button, next button, and numbered page buttons
// Update page and re-render

// Step 3: Add change listener on #page-size select
// Update pageSize, reset page to 1, re-render

function render() {
  // Display current page of items with pagination controls
}

render();`,

  'ng-keyboard-shortcuts': `// Simulating Angular keyboard shortcut service with HostListener
const log = document.getElementById('log');
const overlay = document.getElementById('search-overlay');
let itemCount = 0;

// Shortcut definitions - each key maps to a handler function
const shortcuts = {
  'n': function() { itemCount++; return 'Created new item #' + itemCount; },
  's': function() { return 'Saved successfully!'; },
  'f': function() { overlay.style.display = 'block'; document.getElementById('search-input').focus(); return 'Search opened'; },
  'd': function() { return 'Item deleted'; },
};

// Step 1: Add keydown listener on document
// If Escape is pressed, hide the search overlay and show 'Cancelled' in log
// If Ctrl (or Meta on Mac) + key matches a shortcut:
//   - Prevent default browser behavior
//   - Execute the shortcut handler
//   - Display the returned message in the log`,

  'ng-settings-panel': `// Simulating Angular settings panel with localStorage persistence
let settings = JSON.parse(localStorage.getItem('ng-settings') || '{}');
settings = { theme: 'dark', accent: '#ef4444', fontSize: 14, notifications: false, ...settings };
const preview = document.getElementById('preview');

// Step 1: Create applySettings() function
// Update preview font size from settings.fontSize
// Update preview left border color from settings.accent
// Update #fs-value text display

// Step 2: Add click listener on .toggle-group (theme)
// Read data-theme from clicked .tg button
// Update settings.theme, toggle 'active' class on theme buttons

// Step 3: Add click listener on #color-options (accent color)
// Read data-color from clicked .color-dot
// Update settings.accent, toggle 'active' class, call applySettings()

// Step 4: Add input listener on #font-size range slider
// Update settings.fontSize, call applySettings()

// Step 5: Add click listener on #notif-switch
// Toggle settings.notifications, toggle 'on' class on the switch

// Step 6: Add click listener on #save-btn
// Save settings to localStorage as JSON
// Show #saved-msg briefly (2 seconds)

// Step 7: Initialize
// Call applySettings()
// Set initial 'on' class on notif-switch based on settings.notifications`,

  'ng-notifications-center': `// Simulating Angular notification center with RxJS Subject
const notifications = [
  { id: 1, text: 'New deployment succeeded', type: 'info', read: false, time: '2m ago' },
  { id: 2, text: 'Server CPU usage above 90%', type: 'alert', read: false, time: '5m ago' },
  { id: 3, text: 'User John signed up', type: 'info', read: true, time: '1h ago' },
  { id: 4, text: 'Payment failed for order #42', type: 'alert', read: true, time: '3h ago' },
];
let nextId = 5;
let filter = 'all';
const badge = document.getElementById('badge');

// Step 1: Create render() function
// Filter notifications based on current filter value:
//   'all' -> show all, 'unread' -> !read, 'info'/'alert' -> match type
// Render .notif divs with 'unread' class, colored dot, text, and time
// Update badge count (unread notifications), show/hide badge

// Step 2: Add click listener on #notif-list
// When a .notif is clicked, find the notification by data-id and mark it as read
// Re-render

// Step 3: Add click listener on .filter-tabs
// Update filter value, toggle 'active' class on filter buttons, render()

// Step 4: Add click listener on #mark-all
// Set all notifications to read, render()

// Step 5: Add click listener on #simulate-btn
// Add a random new notification to the beginning of the array
// Increment nextId, set read to false and time to 'now'
// Re-render

function render() {
  // Display filtered notifications and update badge
}

render();`,

  'ng-favorites': `// Simulating Angular favorites with NgRx-style state management
const items = ['Angular','React','Vue','Svelte','TypeScript','RxJS','NgRx','Tailwind'];
let favorites = JSON.parse(localStorage.getItem('ng-favs') || '[]');

function save() { localStorage.setItem('ng-favs', JSON.stringify(favorites)); }

// Step 1: Create render() function
// Render items grid: each .item-card has a name span and a .fav-btn button
// Button shows heart icon: filled (active) if in favorites, outline if not
// Render favorites list: each .fav-item has a name and a .remove-btn
// Update #fav-count with the number of favorites
// Show placeholder text if no favorites

// Step 2: Add click listener on #items container
// When a .fav-btn is clicked, toggle the item in/out of favorites array
// Save and re-render

// Step 3: Add click listener on #favorites container
// When a .remove-btn is clicked, remove the item from favorites
// Save and re-render

function render() {
  // Display items with favorite toggles and favorites list
}

render();`,

  'ng-undo-redo': `// Simulating Angular undo/redo with command pattern
const colors = ['#ef4444','#3b82f6','#22c55e','#f59e0b','#a855f7','#ec4899'];
let state = [];
let undoStack = [];
let redoStack = [];
const historyLog = document.getElementById('history-log');

function snapshot() { return JSON.parse(JSON.stringify(state)); }

// Step 1: Create execute(action, desc) function
// Push current state snapshot and description onto undoStack
// Clear redoStack (new action invalidates redo history)
// Execute the action function
// Update the UI and append description to history log

// Step 2: Add click listener on #add-btn
// Call execute with an action that pushes a random color to state

// Step 3: Add click listener on #color-btn
// If state is empty, return. Otherwise execute an action that changes the last item's color

// Step 4: Add click listener on #remove-btn
// If state is empty, return. Otherwise execute an action that pops the last item

// Step 5: Add click listener on #undo-btn
// Pop from undoStack, push current state to redoStack, restore the popped state

// Step 6: Add click listener on #redo-btn
// Pop from redoStack, push current state to undoStack, restore the popped state

// Step 7: Create updateUI() function
// Render colored .box divs from state array into #item-row
// Enable/disable undo and redo buttons based on stack lengths
// Update #history-info with stack counts

function updateUI() {
  // Render state boxes and update button states
}

updateUI();`,

  'ng-loading-states': `// Simulating Angular loading skeleton with structural directives
const content = document.getElementById('content');
const btn = document.getElementById('load-btn');
const people = [
  { name: 'Alice', role: 'Developer', email: 'alice@dev.io', color: '#ef4444' },
  { name: 'Bob', role: 'Designer', email: 'bob@design.io', color: '#3b82f6' },
];

let loaded = false;

// Step 1: Add click listener on btn
// If already loaded, reset to skeleton state:
//   - Replace content with skeleton-card HTML (shimmer animation placeholders)
//   - Set loaded = false, update button text to 'Load Data'
//   - Return early
// If not loaded:
//   - Disable button, set text to 'Loading...'
//   - After 1500ms delay, replace skeletons with real data cards
//   - Each .loaded-card has an .avatar (colored circle with initial), name, role, and email
//   - Re-enable button, set text to 'Reset', set loaded = true`,

  'ng-empty-states': `// Simulating Angular empty state with ng-content projection
const container = document.getElementById('empty-state');
const states = {
  'no-data': {
    icon: '\\u{1F4E6}',
    title: 'No items yet',
    desc: 'Get started by creating your first item. It only takes a few seconds.',
    actionLabel: 'Create First Item'
  },
  'no-results': {
    icon: '\\u{1F50D}',
    title: 'No results found',
    desc: 'Try adjusting your search or filters to find what you are looking for.',
    actionLabel: 'Clear Filters'
  },
  'error': {
    icon: '\\u{26A0}',
    title: 'Something went wrong',
    desc: 'We had trouble loading your data. Please check your connection and try again.',
    actionLabel: 'Retry'
  }
};

// Step 1: Create render(stateKey) function
// Look up the state object from states
// Set container innerHTML with:
//   - .empty-icon (the emoji)
//   - .empty-title
//   - .empty-desc
//   - .empty-action button(s) with appropriate label and click handler

// Step 2: Add click listener on .tabs container
// Read data-state from clicked .tab
// Toggle 'active' class on tabs
// Call render() with the new state key

// Step 3: Initialize with render('no-data')`,

  'ng-image-viewer': `// Simulating Angular CDK image viewer with zoom and pan
const viewer = document.getElementById('viewer');
const container = document.getElementById('image-container');
let scale = 1;
let panX = 0, panY = 0;
let dragging = false;
let startX, startY, startPanX, startPanY;

// Step 1: Create applyTransform() function
// Set container.style.transform using translate(panX, panY) and scale(scale)
// Update #zoom-level text with percentage (e.g., "100%")

// Step 2: Add mousedown listener on viewer
// Set dragging = true, record startX/Y (clientX/Y) and startPanX/Y

// Step 3: Add mousemove listener on document
// If dragging, update panX/panY based on mouse movement delta
// Call applyTransform()

// Step 4: Add mouseup listener on document
// Set dragging = false

// Step 5: Add wheel listener on viewer (with passive: false)
// Prevent default, calculate zoom delta from e.deltaY
// Clamp scale between 0.5 and 5
// Call applyTransform()

// Step 6: Add click listeners on zoom controls
// #zoom-in -> increase scale by 0.25 (max 5)
// #zoom-out -> decrease scale by 0.25 (min 0.5)
// #reset-btn -> reset scale=1, panX=0, panY=0
// Call applyTransform() after each

applyTransform();`,

  'ng-toggle-switch': `// Simulating Angular toggle switch with ControlValueAccessor
const state = { dark: false, notif: false, auto: true, premium: false };

// Step 1: Create updateDisplay() function
// For each key in state (except 'premium'):
//   - Find the .toggle element with matching data-key
//   - Toggle 'on' class based on state value
//   - Set aria-checked attribute
//   - Update the .status span text ('On' / 'Off')
// Update #form-value with JSON.stringify of state

// Step 2: Add click listeners on all .toggle:not(.disabled) elements
// Toggle the corresponding state value
// Call updateDisplay()

// Step 3: Add keydown listeners on the same toggle elements
// Space or Enter key should trigger a click (with preventDefault)

// Step 4: Call updateDisplay() on init`,

  // ---------------------------------------------------------------------------
  // forms-input starters
  // ---------------------------------------------------------------------------

  'ng-rating-stars': `// Simulating Angular star-rating component with ControlValueAccessor
const container = document.getElementById('stars');
const valueEl = document.getElementById('rating-value');
let rating = 0;
let hoverRating = 0;

// Step 1: Create render() function
// Generate 5 star spans inside the container
// Each star has data-val (1-5) and shows filled or empty depending on rating / hoverRating
// Update valueEl text with current rating

// Step 2: Add mouseover listener on the container
// Read data-val from hovered star, set hoverRating, re-render with hover highlight

// Step 3: Add mouseout listener on the container
// Reset hoverRating to 0 and re-render to show only the committed rating

// Step 4: Add click listener on the container
// Set rating to the clicked star's data-val, re-render
// Dispatch a custom 'ratingchange' event on the container`,

  'ng-tag-input': `// Simulating Angular tag/chip input with reactive forms
const input = document.getElementById('tag-input');
const tagsEl = document.getElementById('tags');
const suggestions = ['Angular','React','Vue','Svelte','TypeScript','JavaScript','RxJS','NgRx','Tailwind','Node'];
let tags = [];

// Step 1: Create render() function
// Render each tag as a .tag span with text and a .remove-btn
// Update #tag-count with current tag count

// Step 2: Add keydown listener on input for Enter and Backspace
// Enter: trim value, reject duplicates and empty, add to tags, clear input, re-render
// Backspace on empty input: remove last tag, re-render

// Step 3: Create showSuggestions(query) function
// Filter suggestions that start with query (case-insensitive) and are not already tags
// Render matching items in #suggestion-list as clickable <li> elements

// Step 4: Add input listener on the input to call showSuggestions
// Add click listener on #suggestion-list to add clicked suggestion as a tag

// Step 5: Add click listener on tagsEl to handle .remove-btn clicks
// Remove the corresponding tag from the array, re-render`,

  'ng-multi-select': `// Simulating Angular multi-select dropdown with checkboxes
const options = ['Engineering','Design','Marketing','Sales','Support','Legal','Finance','HR'];
const trigger = document.getElementById('ms-trigger');
const dropdown = document.getElementById('ms-dropdown');
let selected = [];

// Step 1: Create renderDropdown() function
// Render each option as a .ms-option div with a checkbox and label
// Check the checkbox if the option is in the selected array

// Step 2: Create updateTrigger() function
// If no selections, show placeholder text
// Otherwise show count ("N selected") or first two names + "+N more"

// Step 3: Add click listener on trigger to toggle dropdown visibility

// Step 4: Add change listener on dropdown (event delegation on checkboxes)
// Toggle the option in/out of the selected array, call updateTrigger()

// Step 5: Add click listener on document to close dropdown when clicking outside`,

  'ng-otp-input': `// Simulating Angular OTP input component
const otpContainer = document.getElementById('otp-container');
const resultEl = document.getElementById('otp-result');
const LENGTH = 6;

// Step 1: Create init() function
// Generate LENGTH input elements (type="text", maxlength="1") inside otpContainer
// Each input has a data-idx attribute

// Step 2: Add input listener on otpContainer (event delegation)
// When a digit is entered, auto-focus the next input
// If all inputs are filled, combine values and display in resultEl

// Step 3: Add keydown listener on otpContainer
// Backspace: clear current input and focus previous
// ArrowLeft/ArrowRight: navigate between inputs

// Step 4: Add paste listener on the first input
// Distribute pasted string across all inputs, focus the last filled input

// Step 5: Call init()`,

  'ng-credit-card-input': `// Simulating Angular credit card form with input masks
const cardNum = document.getElementById('cc-number');
const expiry = document.getElementById('cc-expiry');
const cvc = document.getElementById('cc-cvc');
const preview = document.getElementById('card-preview');

function digits(v) { return v.replace(/\\D/g, ''); }

// Step 1: Add input listener on cardNum
// Extract digits (max 16), format as groups of 4 separated by spaces
// Update the preview card number display
// Detect card type (Visa starts with 4, Mastercard 51-55) and update icon

// Step 2: Add input listener on expiry
// Extract digits (max 4), format as MM/YY
// Validate month is 01-12, update preview expiry

// Step 3: Add input listener on cvc
// Extract digits (max 4), update preview CVC

// Step 4: Create validate() function
// Check card number length (16 digits), expiry is valid future date, CVC is 3-4 digits
// Show/hide error messages for each field, return overall validity`,

  'ng-address-form': `// Simulating Angular address form with dependent dropdowns
const countryEl = document.getElementById('country');
const stateEl = document.getElementById('state');
const cityEl = document.getElementById('city');
const output = document.getElementById('address-output');

const data = {
  US: { states: ['California','New York','Texas'], cities: { California: ['LA','SF','SD'], 'New York': ['NYC','Buffalo'], Texas: ['Houston','Austin','Dallas'] }},
  UK: { states: ['England','Scotland','Wales'], cities: { England: ['London','Manchester'], Scotland: ['Edinburgh','Glasgow'], Wales: ['Cardiff','Swansea'] }},
};

// Step 1: Add change listener on countryEl
// Populate stateEl with states for the selected country
// Reset cityEl to empty, clear output

// Step 2: Add change listener on stateEl
// Populate cityEl with cities for the selected state within the chosen country

// Step 3: Add change listener on cityEl
// Display formatted address in output (city, state, country)

// Step 4: Add submit listener on #address-form
// Prevent default, validate all three selects have values, show complete address or error`,

  'ng-survey-form': `// Simulating Angular multi-step survey form
const steps = document.querySelectorAll('.survey-step');
const progress = document.getElementById('survey-progress');
const answers = {};
let currentStep = 0;

// Step 1: Create showStep(idx) function
// Hide all steps, show the step at idx
// Update progress bar width to (idx / total) * 100 percent
// Update step counter text "Step X of Y"

// Step 2: Add click listener on .survey-next buttons
// Collect answer from current step's input/select/radio
// Store in answers object keyed by question name
// Advance to next step or show summary if on last step

// Step 3: Add click listener on .survey-prev buttons
// Go back one step, re-populate the input with saved answer

// Step 4: Create showSummary() function
// Display all collected answers in #survey-summary as a formatted list
// Show a submit button that logs the answers object`,

  'ng-textarea-autogrow': `// Simulating Angular auto-growing textarea directive
const textarea = document.getElementById('auto-textarea');
const charCount = document.getElementById('char-count');
const MAX_CHARS = 500;

// Step 1: Create resize() function
// Reset textarea height to 'auto'
// Set height to scrollHeight + 'px' to fit content
// Clamp to a max-height of 300px, enable overflow-y scroll if exceeded

// Step 2: Add input listener on textarea
// Call resize()
// Update charCount text with "N / 500" characters
// Add 'warning' class if over 450 chars, 'error' class if over 500

// Step 3: Add keydown listener on textarea
// If at MAX_CHARS and key is not Backspace/Delete/arrow, prevent default

// Step 4: Call resize() on init to handle pre-filled content`,

  'ng-phone-input': `// Simulating Angular international phone input with country codes
const countrySelect = document.getElementById('phone-country');
const phoneInput = document.getElementById('phone-number');
const formatted = document.getElementById('phone-formatted');
const countries = [
  { code: '+1', name: 'US', format: '(XXX) XXX-XXXX' },
  { code: '+44', name: 'UK', format: 'XXXX XXX XXXX' },
  { code: '+91', name: 'IN', format: 'XXXXX XXXXX' },
];

// Step 1: Populate countrySelect with country options
// Each option shows flag emoji placeholder, name, and dial code

// Step 2: Create formatPhone(digits, pattern) function
// Replace each X in the pattern with the next digit
// Return the partially or fully formatted string

// Step 3: Add input listener on phoneInput
// Strip non-digits, limit to max digits for selected country format
// Apply formatPhone and set phoneInput.value
// Update formatted display with full international number

// Step 4: Add change listener on countrySelect
// Update placeholder to show the format, re-format existing digits`,

  'ng-currency-input': `// Simulating Angular currency input with locale formatting
const input = document.getElementById('currency-input');
const display = document.getElementById('currency-display');
const localeSelect = document.getElementById('locale-select');
let rawCents = 0;

const locales = {
  'en-US': { symbol: '$', sep: ',', dec: '.', prefix: true },
  'de-DE': { symbol: '\\u20AC', sep: '.', dec: ',', prefix: false },
  'ja-JP': { symbol: '\\u00A5', sep: ',', dec: '.', prefix: true },
};

// Step 1: Create formatCurrency(cents, locale) function
// Convert cents to major units (divide by 100)
// Format with thousands separators and decimal point per locale
// Prepend or append currency symbol based on locale config

// Step 2: Add input listener on the input
// Strip all non-digit characters, parse as integer cents
// Set rawCents, format and display in both input and display elements

// Step 3: Add change listener on localeSelect
// Re-format the current rawCents value with the new locale settings

// Step 4: Initialize with rawCents = 0 and render`,

  'ng-slider-range': `// Simulating Angular range slider with dual thumbs
const track = document.getElementById('slider-track');
const thumbMin = document.getElementById('thumb-min');
const thumbMax = document.getElementById('thumb-max');
const fill = document.getElementById('slider-fill');
const minVal = document.getElementById('min-value');
const maxVal = document.getElementById('max-value');
let min = 20, max = 80;
let dragging = null;

// Step 1: Create updateUI() function
// Position thumbMin and thumbMax as percentages along the track
// Set fill element left and width to span between min and max
// Update minVal and maxVal text displays

// Step 2: Add mousedown listeners on both thumbs
// Set dragging to 'min' or 'max', add 'active' class

// Step 3: Add mousemove listener on document
// If dragging, calculate new percentage from mouse position relative to track
// Clamp value 0-100, ensure min <= max with at least 5% gap
// Update min or max, call updateUI()

// Step 4: Add mouseup listener on document
// Clear dragging state, remove 'active' class

// Step 5: Call updateUI() on init`,

  'ng-toggle-group': `// Simulating Angular toggle button group component
const group = document.getElementById('toggle-group');
const output = document.getElementById('toggle-output');
let selected = [];
const mode = group.dataset.mode || 'multi'; // 'single' or 'multi'

// Step 1: Add click listener on group (event delegation)
// Find the clicked .toggle-btn
// In single mode: deselect all others, select clicked
// In multi mode: toggle clicked button's selected state

// Step 2: Create updateState() function
// Read all .toggle-btn elements, build selected array from those with 'active' class
// Update output text with selected values joined by comma
// Update aria-pressed attribute on each button

// Step 3: Add keydown listener on group
// Space/Enter on focused button toggles its state
// ArrowLeft/ArrowRight moves focus between buttons

// Step 4: Initialize by reading any pre-selected buttons`,

  'ng-segmented-control': `// Simulating Angular segmented control component
const control = document.getElementById('segmented-control');
const indicator = document.getElementById('segment-indicator');
const content = document.getElementById('segment-content');
const segments = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
let activeIdx = 0;

// Step 1: Create render() function
// Generate segment buttons inside the control
// Position the indicator element behind the active segment using translateX
// Update content area with data for the selected segment

// Step 2: Add click listener on control (event delegation)
// Find clicked segment button, get its index
// Animate indicator to new position using CSS transition
// Update activeIdx, re-render content

// Step 3: Add keydown listener for arrow key navigation
// ArrowLeft/ArrowRight moves active segment, wrapping at edges

// Step 4: Initialize with render()`,

  'ng-combobox': `// Simulating Angular combobox with typeahead and custom values
const input = document.getElementById('combo-input');
const listbox = document.getElementById('combo-listbox');
const options = ['Apple','Banana','Cherry','Date','Elderberry','Fig','Grape','Honeydew','Kiwi','Lemon'];
let filteredOptions = [];
let activeIdx = -1;
let selectedValue = '';

// Step 1: Create filter(query) function
// Filter options that contain query (case-insensitive)
// Render matches in listbox as .combo-option elements with data-idx
// Highlight active option, show "No matches" or "Press Enter to add" if empty

// Step 2: Add input listener on the input
// Call filter with current value, show listbox, reset activeIdx

// Step 3: Add keydown listener on input
// ArrowDown/ArrowUp: navigate filteredOptions, update activeIdx and scroll into view
// Enter: select active option or use typed custom value, close listbox
// Escape: close listbox, restore previous selectedValue

// Step 4: Add click listener on listbox to select clicked option

// Step 5: Add blur listener on input to close listbox after short delay`,

  'ng-mentions-input': `// Simulating Angular mentions input (@user) component
const editor = document.getElementById('mentions-editor');
const dropdown = document.getElementById('mentions-dropdown');
const users = ['Alice','Bob','Carol','Dave','Eve','Frank','Grace','Hank'];
let mentionStart = -1;

// Step 1: Add input listener on the editor
// Detect @ symbol followed by letters in the current text
// Extract the query after @, filter matching users
// Show dropdown positioned near the cursor with filtered user list

// Step 2: Add click listener on dropdown
// Insert selected username after the @ symbol
// Wrap the @username in a <span class="mention"> tag
// Close dropdown, reset mentionStart

// Step 3: Add keydown listener on editor
// ArrowDown/ArrowUp to navigate dropdown options
// Enter to select highlighted user
// Escape to close dropdown

// Step 4: Create getMentions() function
// Parse editor content and return array of mentioned usernames
// Display mentions list in #mentions-output`,

  'ng-code-input': `// Simulating Angular code/PIN input component
const codeContainer = document.getElementById('code-inputs');
const resultEl = document.getElementById('code-result');
const LENGTH = 4;

// Step 1: Create init() function
// Generate LENGTH input boxes (type="text", maxlength="1") in codeContainer
// Style each as a large centered character box

// Step 2: Add input listener on codeContainer (event delegation)
// Accept only alphanumeric characters, convert to uppercase
// Auto-focus next input after entry
// When all filled, combine and display in resultEl with a verify animation

// Step 3: Add keydown listener for navigation
// Backspace: clear and focus previous
// ArrowLeft/ArrowRight: move focus between inputs
// Delete: clear current input

// Step 4: Add paste listener to distribute pasted text across inputs

// Step 5: Call init()`,

  'ng-signature-pad': `// Simulating Angular signature pad with canvas drawing
const canvas = document.getElementById('sig-canvas');
const ctx = canvas.getContext('2d');
const output = document.getElementById('sig-output');
let drawing = false;
let paths = [];
let currentPath = [];

// Step 1: Configure canvas context
// Set strokeStyle, lineWidth, lineCap, lineJoin for smooth drawing

// Step 2: Add mousedown/touchstart listener on canvas
// Set drawing = true, start a new path, record starting point

// Step 3: Add mousemove/touchmove listener on canvas
// If drawing, get coordinates relative to canvas
// Draw line segment from last point to current point using ctx.lineTo/stroke
// Push point to currentPath

// Step 4: Add mouseup/touchend listener
// Set drawing = false, push currentPath to paths, reset currentPath

// Step 5: Add click listener on #sig-clear
// Clear canvas with ctx.clearRect, reset paths array

// Step 6: Add click listener on #sig-save
// Convert canvas to data URL with canvas.toDataURL()
// Display the base64 string preview in output element`,

  // ---------------------------------------------------------------------------
  // interactive starters
  // ---------------------------------------------------------------------------

  'ng-tooltip': `// Simulating Angular tooltip directive with CDK Overlay
const triggers = document.querySelectorAll('[data-tooltip]');
const tooltip = document.getElementById('tooltip');

// Step 1: Create showTooltip(el) function
// Read tooltip text from el.dataset.tooltip
// Set tooltip textContent, make it visible
// Position tooltip above the element, centered horizontally

// Step 2: Create hideTooltip() function
// Hide the tooltip element

// Step 3: Add mouseenter and mouseleave listeners on each trigger element
// mouseenter: call showTooltip(el)
// mouseleave: call hideTooltip()

// Step 4: Add focus and blur listeners for keyboard accessibility
// focus: show tooltip, blur: hide tooltip

// Step 5: Handle edge cases - reposition if tooltip overflows viewport edges`,

  'ng-popover': `// Simulating Angular popover component with CDK Overlay positioning
const popover = document.getElementById('popover');
const arrow = document.getElementById('popover-arrow');
let activeTrigger = null;

// Step 1: Create showPopover(triggerEl, content, placement) function
// Set popover innerHTML with content
// Position relative to triggerEl based on placement (top, bottom, left, right)
// Position the arrow element pointing toward the trigger

// Step 2: Create hidePopover() function
// Hide the popover and arrow, reset activeTrigger

// Step 3: Add click listeners on all [data-popover] elements
// Toggle popover: if same trigger clicked, hide; otherwise show with new content

// Step 4: Add click listener on document to close popover when clicking outside

// Step 5: Add keydown listener for Escape to close popover`,

  'ng-lightbox': `// Simulating Angular lightbox overlay for image/media viewing
const items = document.querySelectorAll('.lightbox-item');
const overlay = document.getElementById('lightbox-overlay');
const lbContent = document.getElementById('lb-content');
const lbCaption = document.getElementById('lb-caption');
const counter = document.getElementById('lb-counter');
let currentIdx = 0;
let itemList = [];

// Step 1: Create init() function
// Build itemList array from .lightbox-item elements (src, caption, type)

// Step 2: Create open(idx) function
// Set currentIdx, show overlay, render current item content
// Update caption and counter text ("1 of N")
// Trap focus within the overlay

// Step 3: Create navigate(direction) function
// Move currentIdx by direction (-1 or +1), wrap around
// Update content, caption, and counter

// Step 4: Add click listeners on items to open at their index
// Add click listeners on prev/next buttons and close button

// Step 5: Add keydown listener for Escape (close), ArrowLeft/Right (navigate)`,

  'ng-sortable-list': `// Simulating Angular CDK DragDrop sortable list
const list = document.getElementById('sortable-list');
const items = ['Configure CI/CD pipeline','Write unit tests','Deploy to staging','Code review','Update documentation'];
let dragIdx = null;
let dragOverIdx = null;

// Step 1: Create render() function
// Generate .sortable-item elements with drag handle, text, and data-idx
// Set draggable="true" on each item

// Step 2: Add dragstart listener on list (event delegation)
// Store dragged item index in dragIdx, set opacity and drag image

// Step 3: Add dragover listener on list
// Find the item being dragged over, add visual insertion indicator
// Determine if inserting above or below based on mouse Y position

// Step 4: Add drop listener on list
// Remove dragged item from array and insert at new position
// Re-render the list

// Step 5: Add dragend listener to clean up visual states`,

  'ng-resizable-panels': `// Simulating Angular resizable split panels
const container = document.getElementById('panel-container');
const leftPanel = document.getElementById('left-panel');
const rightPanel = document.getElementById('right-panel');
const divider = document.getElementById('panel-divider');
let dragging = false;
let startX, startLeftWidth;

// Step 1: Add mousedown listener on divider
// Set dragging = true, record startX and leftPanel width
// Add 'dragging' class for visual feedback

// Step 2: Add mousemove listener on document
// If dragging, calculate delta from startX
// Set leftPanel width to startLeftWidth + delta
// Clamp between min (150px) and max (container width - 150px)
// rightPanel takes remaining space

// Step 3: Add mouseup listener on document
// Set dragging = false, remove 'dragging' class

// Step 4: Add double-click listener on divider to reset to 50/50 split`,

  'ng-split-view': `// Simulating Angular split view with multiple panes
const splitContainer = document.getElementById('split-container');
const panes = [];
let activeDivider = null;
let startPos = 0;

// Step 1: Create initPanes() function
// Query all .split-pane elements, store references and initial sizes
// Create divider elements between panes

// Step 2: Add mousedown listener on dividers
// Record which divider is active and the starting mouse position
// Store sizes of adjacent panes

// Step 3: Add mousemove listener on document
// If activeDivider, calculate position delta
// Resize the two adjacent panes proportionally
// Enforce minimum pane size of 100px

// Step 4: Add mouseup listener to release the active divider

// Step 5: Add double-click on divider to distribute space equally among all panes`,

  'ng-kanban-board': `// Simulating Angular CDK DragDrop Kanban board
const columns = {
  backlog: ['Research competitors','Define user stories'],
  todo: ['Setup database','Design API schema'],
  progress: ['Implement auth'],
  review: ['Landing page'],
  done: ['Project setup']
};
let dragItem = null;
let sourceCol = null;

// Step 1: Create render() function
// For each column, render task cards with draggable="true"
// Show column task count in header
// Each card has data-col and data-idx attributes

// Step 2: Add dragstart listener (event delegation)
// Store dragged item text and source column, set visual feedback

// Step 3: Add dragover/dragleave on .kanban-column elements
// Show drop indicator line, highlight valid drop zone

// Step 4: Add drop listener on columns
// Remove item from source column array, insert into target column
// Re-render the board

// Step 5: Add click listener on #add-task button
// Prompt for task text, add to backlog column, re-render`,

  'ng-timeline': `// Simulating Angular timeline component with animations
const timelineEl = document.getElementById('timeline');
const events = [
  { date: '2024-01', title: 'Project Kickoff', desc: 'Initial planning and team formation', type: 'milestone' },
  { date: '2024-02', title: 'Design Phase', desc: 'UI/UX design and prototyping', type: 'task' },
  { date: '2024-03', title: 'Alpha Release', desc: 'First internal release for testing', type: 'milestone' },
  { date: '2024-04', title: 'Beta Testing', desc: 'Public beta with feedback collection', type: 'task' },
  { date: '2024-05', title: 'Launch', desc: 'Production release v1.0', type: 'milestone' },
];

// Step 1: Create render() function
// Generate .timeline-item elements alternating left/right
// Each has a .timeline-dot (colored by type), date, title, and description

// Step 2: Create animateOnScroll() function
// Use IntersectionObserver to add 'visible' class when items enter viewport
// Apply staggered fade-in animation

// Step 3: Add click listener on timeline items to expand/collapse description

// Step 4: Call render() and animateOnScroll() on init`,

  'ng-tree-view': `// Simulating Angular nested tree component with CDK Tree
const treeData = [
  { name: 'src', children: [
    { name: 'app', children: [
      { name: 'components', children: [{ name: 'header.ts' }, { name: 'footer.ts' }] },
      { name: 'services', children: [{ name: 'auth.ts' }, { name: 'api.ts' }] },
      { name: 'app.module.ts' }
    ]},
    { name: 'assets', children: [{ name: 'logo.svg' }] },
    { name: 'main.ts' }
  ]},
  { name: 'package.json' },
  { name: 'tsconfig.json' }
];
const treeEl = document.getElementById('tree');

// Step 1: Create renderNode(node, depth) function
// Create a .tree-node div with indentation based on depth
// If node has children, add an expand/collapse arrow icon
// Show folder or file icon based on whether node has children
// Return the HTML string

// Step 2: Create renderTree(nodes, depth) function
// Recursively render all nodes, children wrapped in a collapsible .tree-children div
// Initially collapse all children beyond depth 1

// Step 3: Add click listener on treeEl (event delegation)
// Toggle .tree-children visibility when arrow is clicked
// Rotate arrow icon and toggle 'expanded' class

// Step 4: Add double-click listener to select a file node
// Highlight selected node, display file path in #selected-file`,

  'ng-collapsible-panel': `// Simulating Angular collapsible/expandable panel with animations
const panelContainer = document.getElementById('panel-container');
const panels = [
  { title: 'Getting Started', content: 'Install the CLI with npm install -g @angular/cli, then run ng new my-app to create a new project.', icon: '\\u{1F680}' },
  { title: 'Components', content: 'Components are the building blocks of Angular applications. Each has a template, styles, and a class.', icon: '\\u{1F9E9}' },
  { title: 'Services', content: 'Services provide shared logic and data access. Use dependency injection to provide them to components.', icon: '\\u{2699}' },
  { title: 'Routing', content: 'The Angular Router enables navigation between views. Configure routes in a routing module.', icon: '\\u{1F517}' },
];

// Step 1: Create render() function
// Generate .collapsible-panel elements with header (icon, title, chevron) and body
// Body starts hidden with max-height: 0

// Step 2: Add click listener on panelContainer (event delegation on .panel-header)
// Toggle 'open' class on the panel
// Animate body height using max-height transition
// Rotate chevron icon

// Step 3: Implement accordion mode option
// If data-accordion="true" on container, close other panels when one opens`,

  'ng-drawer': `// Simulating Angular Material Sidenav / Drawer component
const drawer = document.getElementById('drawer');
const backdrop = document.getElementById('drawer-backdrop');
const content = document.getElementById('drawer-content');
let isOpen = false;

// Step 1: Create openDrawer(side) function
// Set drawer position (left or right) based on side parameter
// Add 'open' class to drawer, show backdrop
// Set isOpen = true, set aria-hidden="false"
// Trap focus within the drawer

// Step 2: Create closeDrawer() function
// Remove 'open' class, hide backdrop after transition
// Set isOpen = false, set aria-hidden="true"
// Return focus to the trigger element

// Step 3: Add click listeners on #open-left-btn and #open-right-btn
// Each calls openDrawer with the appropriate side

// Step 4: Add click listener on backdrop and #drawer-close to close
// Add keydown listener for Escape to close`,

  'ng-bottom-sheet': `// Simulating Angular Material Bottom Sheet component
const sheet = document.getElementById('bottom-sheet');
const sheetBackdrop = document.getElementById('sheet-backdrop');
const sheetContent = document.getElementById('sheet-content');
let isDragging = false;
let startY = 0;
let currentY = 0;

// Step 1: Create openSheet(contentHtml) function
// Set sheetContent innerHTML, show sheet and backdrop
// Animate sheet sliding up from bottom using transform

// Step 2: Create closeSheet() function
// Animate sheet sliding down, then hide sheet and backdrop

// Step 3: Add touch/mouse listeners on sheet header for drag-to-dismiss
// Track drag distance, if dragged down past threshold (40% of height), close
// Otherwise snap back to open position

// Step 4: Add click listeners on trigger buttons to open with different content
// Add click listener on backdrop to close

// Step 5: Handle snap points (half-open and full-open positions)`,

  'ng-command-palette': `// Simulating Angular command palette (Ctrl+K) component
const palette = document.getElementById('command-palette');
const paletteInput = document.getElementById('palette-input');
const paletteList = document.getElementById('palette-list');
const commands = [
  { name: 'Go to Dashboard', shortcut: 'G D', category: 'Navigation' },
  { name: 'Go to Settings', shortcut: 'G S', category: 'Navigation' },
  { name: 'Create New File', shortcut: 'Ctrl+N', category: 'Actions' },
  { name: 'Toggle Dark Mode', shortcut: 'Ctrl+D', category: 'Preferences' },
  { name: 'Search Users', shortcut: '/', category: 'Search' },
  { name: 'Open Terminal', shortcut: 'Ctrl+\\u0060', category: 'Actions' },
  { name: 'Show Keyboard Shortcuts', shortcut: '?', category: 'Help' },
];
let activeIdx = 0;

// Step 1: Create openPalette() function
// Show palette overlay, focus input, render all commands, reset activeIdx

// Step 2: Create closePalette() function
// Hide overlay, clear input

// Step 3: Create renderCommands(query) function
// Filter commands by name matching query (case-insensitive)
// Group by category, render as sections with .command-item elements
// Highlight active item

// Step 4: Add keydown listener on document for Ctrl+K / Cmd+K to toggle palette
// Add input listener on paletteInput to filter commands
// Add keydown listener on input for ArrowUp/Down navigation, Enter to execute, Escape to close`,

  'ng-spotlight-search': `// Simulating Angular spotlight search overlay
const spotlight = document.getElementById('spotlight');
const spotInput = document.getElementById('spot-input');
const spotResults = document.getElementById('spot-results');
const sections = {
  pages: ['Dashboard','Settings','Profile','Analytics','Reports'],
  actions: ['Create Project','Invite User','Export Data','Toggle Theme'],
  docs: ['Getting Started','API Reference','Changelog','FAQ'],
};
let activeIdx = 0;

// Step 1: Create open() and close() functions
// open: show spotlight, focus input, render all sections
// close: hide spotlight, clear input

// Step 2: Create search(query) function
// Filter items across all sections matching query
// Render grouped results with section headers and .spot-item elements
// Highlight the active item, show "No results" if empty

// Step 3: Add keydown listener on document for Ctrl+K or / to open
// Escape to close

// Step 4: Add input listener on spotInput to call search
// Add keydown on spotInput for ArrowUp/Down and Enter

// Step 5: Add click listener on spotResults to execute clicked item`,

  'ng-floating-action-btn': `// Simulating Angular floating action button (FAB) with speed dial
const fab = document.getElementById('fab-main');
const menu = document.getElementById('fab-menu');
const actions = [
  { icon: '\\u{1F4DD}', label: 'New Note', color: '#3b82f6' },
  { icon: '\\u{1F4F7}', label: 'Upload Photo', color: '#22c55e' },
  { icon: '\\u{1F4E7}', label: 'Send Email', color: '#f59e0b' },
];
let isOpen = false;

// Step 1: Create renderMenu() function
// Generate mini FAB buttons from actions array
// Position them in a vertical stack above the main FAB
// Each has icon, tooltip label, and data-action attribute

// Step 2: Create toggle() function
// Toggle isOpen state
// Animate menu items appearing/disappearing with stagger delay
// Rotate the main FAB icon (+ to x)

// Step 3: Add click listener on fab to call toggle()
// Add click listener on menu items to execute action and close menu

// Step 4: Add click listener on document to close menu when clicking outside`,

  'ng-skeleton-loader': `// Simulating Angular skeleton loading placeholder component
const container = document.getElementById('skeleton-container');
const loadBtn = document.getElementById('skeleton-load-btn');
let loaded = false;

// Step 1: Create renderSkeleton(type) function
// Based on type ('card', 'list', 'profile', 'table'), generate appropriate skeleton HTML
// Use .skeleton-line, .skeleton-circle, .skeleton-rect with shimmer animation class

// Step 2: Create renderContent(type) function
// Replace skeleton with real content based on type
// Cards show title, description, image placeholder
// Lists show items with avatars, profiles show user details

// Step 3: Add click listener on loadBtn
// If not loaded, show skeleton first, then after 1500ms delay replace with content
// If loaded, toggle back to skeleton state

// Step 4: Add click listener on .skeleton-type-btns to switch between types
// Re-render skeleton or content based on current loaded state`,

  'ng-progress-bar': `// Simulating Angular Material progress bar component
const progressBar = document.getElementById('progress-bar');
const fill = document.getElementById('progress-fill');
const label = document.getElementById('progress-label');
const valueEl = document.getElementById('progress-value');
let progress = 0;
let mode = 'determinate'; // 'determinate', 'indeterminate', 'buffer'

// Step 1: Create updateProgress(value) function
// Clamp value between 0 and 100
// Set fill width to value percent, update label text
// Add color classes: green (>66), yellow (33-66), red (<33)

// Step 2: Create setMode(newMode) function
// Switch between determinate, indeterminate, and buffer modes
// Indeterminate: add CSS animation class for sliding bar
// Buffer: show secondary buffer fill behind main fill

// Step 3: Add click listeners on control buttons
// +10, -10 to adjust progress, Reset to set to 0
// Mode toggle buttons to switch between modes

// Step 4: Create simulateProgress() function
// Increment progress by random amounts on interval
// Stop at 100 and show completion state`,

  // ---------------------------------------------------------------------------
  // data-display starters
  // ---------------------------------------------------------------------------

  'ng-badge': `// Simulating Angular badge/chip component
const badgeContainer = document.getElementById('badge-container');
const controls = document.getElementById('badge-controls');
let count = 3;

// Step 1: Create renderBadge(value, type) function
// Generate a .badge element with type class (info, success, warning, error)
// If value > 99, show "99+"
// If value is 0, hide the badge or show a dot variant
// Support 'dot' mode for notification indicators without numbers

// Step 2: Create updateBadge() function
// Re-render all badge instances with current count
// Animate badge when count changes (pulse effect)

// Step 3: Add click listeners on increment/decrement/clear buttons
// Update count and call updateBadge()

// Step 4: Add click listener on type selector to change badge color/style`,

  'ng-avatar': `// Simulating Angular avatar component with fallbacks
const avatarGrid = document.getElementById('avatar-grid');
const users = [
  { name: 'Alice Johnson', image: null, status: 'online' },
  { name: 'Bob Smith', image: null, status: 'offline' },
  { name: 'Carol White', image: null, status: 'busy' },
  { name: 'Dave Brown', image: null, status: 'away' },
];

// Step 1: Create renderAvatar(user, size) function
// If user has image, show image in circular container
// If no image, show initials (first letter of first and last name) on colored background
// Generate consistent color from name using simple hash
// Add status indicator dot (green/gray/red/yellow based on status)

// Step 2: Create render() function
// Show avatars in different sizes (sm, md, lg, xl)
// Show avatar group with overlapping style and "+N more" indicator

// Step 3: Add click listener on size toggle buttons to re-render at different sizes

// Step 4: Call render() on init`,

  'ng-stat-card': `// Simulating Angular statistics card component
const statsGrid = document.getElementById('stats-grid');
const stats = [
  { label: 'Total Revenue', value: 48250, prefix: '$', change: 12.5, icon: '\\u{1F4B0}' },
  { label: 'Active Users', value: 2847, prefix: '', change: -3.2, icon: '\\u{1F465}' },
  { label: 'Conversion Rate', value: 4.3, prefix: '', suffix: '%', change: 0.8, icon: '\\u{1F4C8}' },
  { label: 'Avg Response Time', value: 245, prefix: '', suffix: 'ms', change: -15.0, icon: '\\u{26A1}' },
];

// Step 1: Create formatNumber(num) function
// Format large numbers with K/M suffix, add commas for thousands
// Handle decimal places appropriately

// Step 2: Create renderCard(stat) function
// Generate .stat-card with icon, label, formatted value with prefix/suffix
// Show change indicator with arrow up/down and green/red coloring
// Add sparkline mini-chart placeholder

// Step 3: Create animateValue(el, start, end, duration) function
// Animate the value counting up from start to end over duration ms

// Step 4: Create render() function
// Render all stat cards, trigger count-up animation on each`,

  'ng-timeline-feed': `// Simulating Angular activity timeline/feed component
const feed = document.getElementById('timeline-feed');
const events = [
  { user: 'Alice', action: 'pushed to', target: 'main branch', time: '2 min ago', type: 'commit' },
  { user: 'Bob', action: 'opened', target: 'Issue #42', time: '15 min ago', type: 'issue' },
  { user: 'Carol', action: 'merged', target: 'PR #38', time: '1 hour ago', type: 'merge' },
  { user: 'Dave', action: 'commented on', target: 'Issue #35', time: '2 hours ago', type: 'comment' },
  { user: 'Eve', action: 'deployed to', target: 'production', time: '3 hours ago', type: 'deploy' },
];

// Step 1: Create renderEvent(event) function
// Generate .feed-item with avatar initial, action description, timestamp
// Color-code the dot/icon by event type

// Step 2: Create render() function
// Render all events connected by a vertical line
// Add 'new' animation class to recent items

// Step 3: Add click listener on #load-more to append new random events
// Generate random events and prepend with slide-in animation

// Step 4: Add click listener on .feed-filter buttons to filter by event type`,

  'ng-activity-log': `// Simulating Angular activity log with virtual scrolling
const logContainer = document.getElementById('activity-log');
const filterEl = document.getElementById('log-filter');
const levels = ['info', 'warn', 'error', 'debug'];
const entries = [];

function generateEntry(i) {
  var level = levels[i % levels.length];
  return { id: i, level: level, message: 'Event ' + (i+1) + ': ' + level + ' level activity recorded', timestamp: new Date(Date.now() - i * 60000).toISOString() };
}
for (var i = 0; i < 100; i++) entries.push(generateEntry(i));

// Step 1: Create render(filter) function
// Filter entries by level if filter is not 'all'
// Render visible entries as .log-entry elements with level badge, timestamp, message
// Color-code by level (blue=info, yellow=warn, red=error, gray=debug)

// Step 2: Add input listener on #log-search to filter entries by message text
// Combine with level filter

// Step 3: Add click listener on filterEl buttons to set level filter and re-render

// Step 4: Add click listener on #clear-log to clear all entries
// Add click listener on #export-log to output entries as JSON`,

  'ng-diff-viewer': `// Simulating Angular diff viewer component
const diffOutput = document.getElementById('diff-output');
const oldText = document.getElementById('old-text');
const newText = document.getElementById('new-text');

// Step 1: Create computeDiff(oldLines, newLines) function
// Split texts by newline, compare line by line
// Mark lines as 'added' (in new only), 'removed' (in old only), or 'unchanged'
// Return array of { type, content, lineNum } objects

// Step 2: Create renderDiff(diffLines, mode) function
// In 'unified' mode: show all lines with +/- prefixes, colored backgrounds
// In 'split' mode: show old and new side by side in two columns
// Add line numbers to each line

// Step 3: Add click listener on #diff-btn to compute and render diff
// Add click listener on mode toggle (unified/split) to re-render

// Step 4: Add click listener on .diff-line to highlight and show context`,

  'ng-code-block': `// Simulating Angular syntax-highlighted code block component
const codeEl = document.getElementById('code-block');
const langSelect = document.getElementById('lang-select');
const codeInput = document.getElementById('code-input');
const lineNums = document.getElementById('line-numbers');

const keywords = {
  js: ['const','let','var','function','return','if','else','for','while','class','import','export','async','await'],
  html: ['div','span','p','a','h1','h2','h3','ul','li','input','button','form'],
  css: ['color','background','margin','padding','display','flex','grid','border','font','position'],
};

// Step 1: Create highlight(code, lang) function
// Apply simple keyword highlighting by wrapping keywords in colored spans
// Highlight strings (quotes), comments (// and /* */), numbers
// Return the highlighted HTML string

// Step 2: Create render() function
// Get code from codeInput, highlight it, display in codeEl
// Generate line numbers in lineNums element
// Sync scroll between line numbers and code

// Step 3: Add click listener on #copy-btn to copy code to clipboard
// Show brief "Copied!" feedback

// Step 4: Add change listener on langSelect and input listener on codeInput to re-render`,

  'ng-markdown-preview': `// Simulating Angular markdown preview with live editing
const editor = document.getElementById('md-editor');
const preview = document.getElementById('md-preview');

// Step 1: Create parseMarkdown(text) function
// Convert markdown syntax to HTML:
// # headings (h1-h3), **bold**, *italic*, \`code\`
// - unordered lists, 1. ordered lists
// [links](url), ![images](url)
// --- horizontal rules, > blockquotes
// \`\`\` code blocks

// Step 2: Create render() function
// Get editor value, parse markdown, set preview innerHTML
// Sanitize output to prevent XSS (strip script tags)

// Step 3: Add input listener on editor to call render with debounce (200ms)

// Step 4: Add click listener on toolbar buttons to insert markdown syntax at cursor
// Bold, italic, heading, link, code, list buttons

// Step 5: Initialize with sample markdown content and render`,

  'ng-json-viewer': `// Simulating Angular JSON tree viewer component
const jsonInput = document.getElementById('json-input');
const treeOutput = document.getElementById('json-tree');

// Step 1: Create renderNode(key, value, depth) function
// For objects/arrays: show collapsible node with key name, type badge, and item count
// For primitives: show key-value pair with type-colored value
// Strings in green, numbers in blue, booleans in orange, null in gray
// Indent based on depth level

// Step 2: Create renderTree(data, depth) function
// Recursively render all nodes, wrap children in collapsible containers
// Initially expand first two levels, collapse deeper levels

// Step 3: Add click listener on treeOutput for expand/collapse toggling
// Rotate arrow icon and show/hide children

// Step 4: Add input listener on jsonInput (debounced)
// Try to parse JSON, render tree on success, show parse error on failure

// Step 5: Add buttons to expand all, collapse all, and copy formatted JSON`,

  'ng-comparison-table': `// Simulating Angular comparison table component
const tableEl = document.getElementById('comparison-table');
const plans = [
  { name: 'Free', price: 0, features: { Users: '1', Storage: '1 GB', API: false, Support: 'Community', Analytics: false } },
  { name: 'Pro', price: 29, features: { Users: '10', Storage: '50 GB', API: true, Support: 'Email', Analytics: true }, popular: true },
  { name: 'Enterprise', price: 99, features: { Users: 'Unlimited', Storage: '500 GB', API: true, Support: '24/7 Phone', Analytics: true } },
];

// Step 1: Create render() function
// Generate table with plans as columns and features as rows
// Show checkmarks for boolean true, X for false, text for strings
// Highlight the "popular" plan column

// Step 2: Add hover effect on columns to highlight entire column

// Step 3: Add click listener on plan headers to select/highlight a plan
// Show "Selected" badge on the chosen plan

// Step 4: Add sticky header behavior so plan names remain visible on scroll`,

  'ng-pricing-table': `// Simulating Angular pricing table with toggle and animations
const pricingGrid = document.getElementById('pricing-grid');
const billingToggle = document.getElementById('billing-toggle');
let annual = false;

const tiers = [
  { name: 'Starter', monthly: 9, features: ['5 Projects','1 GB Storage','Email Support'], cta: 'Start Free' },
  { name: 'Professional', monthly: 29, features: ['Unlimited Projects','50 GB Storage','Priority Support','API Access','Analytics'], cta: 'Start Trial', popular: true },
  { name: 'Enterprise', monthly: 79, features: ['Everything in Pro','500 GB Storage','24/7 Phone Support','SSO','Custom Integrations','SLA'], cta: 'Contact Sales' },
];

// Step 1: Create renderTier(tier) function
// Generate .pricing-card with name, price, feature list, and CTA button
// Calculate annual price as monthly * 10 (2 months free)
// Show savings badge for annual billing
// Add 'popular' class and badge to highlighted tier

// Step 2: Create render() function
// Render all tiers into pricingGrid, animate price change on toggle

// Step 3: Add click listener on billingToggle to switch annual/monthly and re-render

// Step 4: Add hover effects and click handlers on CTA buttons`,

  'ng-feature-list': `// Simulating Angular feature list/comparison component
const featureList = document.getElementById('feature-list');
const features = [
  { name: 'Real-time Sync', desc: 'Automatic syncing across all devices', status: 'available', icon: '\\u{1F504}' },
  { name: 'Offline Mode', desc: 'Work without internet connection', status: 'available', icon: '\\u{1F4F4}' },
  { name: 'AI Assistant', desc: 'Smart suggestions and automation', status: 'beta', icon: '\\u{1F916}' },
  { name: 'Custom Themes', desc: 'Personalize your workspace', status: 'coming', icon: '\\u{1F3A8}' },
  { name: 'Plugin System', desc: 'Extend with community plugins', status: 'coming', icon: '\\u{1F9E9}' },
];

// Step 1: Create renderFeature(feature) function
// Generate .feature-item with icon, name, description, and status badge
// Color status badge: green (available), yellow (beta), gray (coming soon)

// Step 2: Create render() function
// Render all features, group by status if grouped mode is on

// Step 3: Add click listener on .filter-btns to filter by status
// Add click listener on #group-toggle to toggle grouped/flat view

// Step 4: Add expand/collapse on feature items to show full description`,

  'ng-testimonials': `// Simulating Angular testimonials carousel component
const testimonialsEl = document.getElementById('testimonials');
const dots = document.getElementById('testimonial-dots');
const testimonials = [
  { name: 'Sarah Chen', role: 'CTO at TechCorp', text: 'This tool transformed our development workflow. Highly recommended!', rating: 5 },
  { name: 'Mike Ross', role: 'Lead Developer', text: 'The best developer experience I have ever had. Clean, fast, and intuitive.', rating: 5 },
  { name: 'Lisa Park', role: 'Product Manager', text: 'Our team productivity increased by 40% after adopting this solution.', rating: 4 },
];
let currentIdx = 0;
let autoTimer = null;

// Step 1: Create renderTestimonial(idx) function
// Show testimonial at idx with quote text, star rating, author name and role
// Add fade-in animation class

// Step 2: Create renderDots() function
// Generate dot indicators, highlight active dot

// Step 3: Add click listeners on prev/next buttons and dots to navigate
// Reset auto-rotation timer on manual navigation

// Step 4: Create autoRotate() function
// Set interval to advance every 5 seconds, call renderTestimonial`,

  'ng-team-grid': `// Simulating Angular team member grid component
const grid = document.getElementById('team-grid');
const modal = document.getElementById('member-modal');
const members = [
  { name: 'Alice Johnson', role: 'Engineering Lead', bio: 'Full-stack developer with 10 years experience.', skills: ['Angular','Node','Python'], color: '#ef4444' },
  { name: 'Bob Smith', role: 'UI Designer', bio: 'Passionate about creating beautiful user interfaces.', skills: ['Figma','CSS','React'], color: '#3b82f6' },
  { name: 'Carol White', role: 'DevOps Engineer', bio: 'Infrastructure and deployment automation expert.', skills: ['Docker','K8s','AWS'], color: '#22c55e' },
  { name: 'Dave Brown', role: 'QA Lead', bio: 'Ensuring quality through automated testing strategies.', skills: ['Cypress','Jest','Selenium'], color: '#f59e0b' },
];

// Step 1: Create renderGrid() function
// Generate .member-card elements with avatar (initials + color), name, role
// Add hover effect showing brief bio preview

// Step 2: Create openModal(member) function
// Populate modal with full profile: avatar, name, role, bio, skills as tags
// Show modal with fade-in animation

// Step 3: Add click listener on grid to open modal for clicked member
// Add click listeners to close modal (X button, backdrop, Escape key)

// Step 4: Add search input to filter members by name or role`,

  'ng-changelog': `// Simulating Angular changelog/release notes component
const changelogEl = document.getElementById('changelog');
const releases = [
  { version: '2.1.0', date: '2024-03-15', type: 'minor', changes: [
    { type: 'feat', text: 'Added dark mode support' },
    { type: 'feat', text: 'New dashboard widgets' },
    { type: 'fix', text: 'Fixed memory leak in data table' },
  ]},
  { version: '2.0.1', date: '2024-03-01', type: 'patch', changes: [
    { type: 'fix', text: 'Corrected timezone handling' },
    { type: 'fix', text: 'Fixed pagination off-by-one error' },
  ]},
  { version: '2.0.0', date: '2024-02-15', type: 'major', changes: [
    { type: 'feat', text: 'Complete UI redesign' },
    { type: 'breaking', text: 'Removed deprecated v1 API endpoints' },
    { type: 'feat', text: 'New plugin architecture' },
  ]},
];

// Step 1: Create renderRelease(release) function
// Generate .release-block with version badge (colored by type), date
// List changes with type badges (feat=green, fix=blue, breaking=red)

// Step 2: Create render() function
// Render all releases connected by a timeline line

// Step 3: Add click listener on filter buttons to show only feat/fix/breaking changes

// Step 4: Add expand/collapse on release blocks, latest expanded by default`,

  'ng-status-page': `// Simulating Angular status page component
const statusGrid = document.getElementById('status-grid');
const overallStatus = document.getElementById('overall-status');
const services = [
  { name: 'API Server', status: 'operational', uptime: 99.98 },
  { name: 'Web App', status: 'operational', uptime: 99.95 },
  { name: 'Database', status: 'degraded', uptime: 99.5 },
  { name: 'CDN', status: 'operational', uptime: 99.99 },
  { name: 'Email Service', status: 'outage', uptime: 97.2 },
  { name: 'Background Jobs', status: 'operational', uptime: 99.9 },
];

// Step 1: Create renderService(service) function
// Generate .status-card with name, status indicator dot, status text, uptime bar
// Color by status: green (operational), yellow (degraded), red (outage)
// Render uptime as a mini bar chart showing last 30 days

// Step 2: Create updateOverall() function
// Determine overall status from worst individual status
// Update overallStatus banner with appropriate color and message

// Step 3: Create render() function
// Render all services and update overall status
// Show incident log section below

// Step 4: Add click listener on #simulate-btn to randomly change a service status`,

  'ng-metric-dashboard': `// Simulating Angular metrics dashboard with live updates
const metricsEl = document.getElementById('metrics-dashboard');
const chartArea = document.getElementById('metric-chart');
let metrics = {
  requests: { value: 1247, history: [], label: 'Requests/min' },
  latency: { value: 45, history: [], label: 'Avg Latency (ms)' },
  errors: { value: 3, history: [], label: 'Error Rate (%)' },
  cpu: { value: 62, history: [], label: 'CPU Usage (%)' },
};
let activeMetric = 'requests';
let updateTimer = null;

// Step 1: Create renderCards() function
// Generate .metric-card for each metric with value, label, and trend indicator
// Highlight the active (selected) metric card

// Step 2: Create renderChart(metricKey) function
// Draw a simple line chart in chartArea using the metric's history array
// Show axes, labels, and current value marker

// Step 3: Create simulateUpdate() function
// Add slight random variation to each metric value
// Push new value to history (keep last 60 points)
// Re-render cards and chart

// Step 4: Add click listeners on metric cards to select and display their chart
// Add click listener on #toggle-live to start/stop live updates

// Step 5: Start live updates with setInterval(simulateUpdate, 1000)`,

  // ---------------------------------------------------------------------------
  // navigation starters
  // ---------------------------------------------------------------------------

  'ng-command-menu': `// Simulating Angular command menu with nested submenus
const menu = document.getElementById('cmd-menu');
const menuInput = document.getElementById('cmd-input');
const menuItems = document.getElementById('cmd-items');
const breadcrumb = document.getElementById('cmd-breadcrumb');
const menuData = {
  root: [
    { label: 'File', icon: '\\u{1F4C4}', submenu: 'file' },
    { label: 'Edit', icon: '\\u{270F}', submenu: 'edit' },
    { label: 'View', icon: '\\u{1F441}', submenu: 'view' },
    { label: 'Go to Line...', icon: '\\u{1F522}', action: 'goto-line' },
  ],
  file: [
    { label: 'New File', shortcut: 'Ctrl+N', action: 'new' },
    { label: 'Open File', shortcut: 'Ctrl+O', action: 'open' },
    { label: 'Save', shortcut: 'Ctrl+S', action: 'save' },
  ],
  edit: [
    { label: 'Undo', shortcut: 'Ctrl+Z', action: 'undo' },
    { label: 'Redo', shortcut: 'Ctrl+Y', action: 'redo' },
    { label: 'Find', shortcut: 'Ctrl+F', action: 'find' },
  ],
  view: [
    { label: 'Toggle Sidebar', action: 'sidebar' },
    { label: 'Toggle Terminal', action: 'terminal' },
  ],
};
let menuStack = ['root'];
let activeIdx = 0;

// Step 1: Create renderMenu(sectionKey, query) function
// Get items for the section, filter by query if provided
// Render .cmd-item elements with icon, label, shortcut or submenu arrow
// Update breadcrumb trail from menuStack

// Step 2: Add keydown listener for Ctrl+K / Cmd+K to toggle menu open/close

// Step 3: Add input listener on menuInput to filter current menu items

// Step 4: Add keydown listener on menuInput for navigation
// ArrowUp/Down: navigate items, Enter: execute action or enter submenu
// Backspace on empty input: go back to parent menu, Escape: close

// Step 5: Add click listener on menuItems for item selection`,

  'ng-mini-map': `// Simulating Angular document minimap navigation component
const content = document.getElementById('minimap-content');
const minimap = document.getElementById('minimap');
const viewport = document.getElementById('minimap-viewport');
const SCALE = 0.1;

// Step 1: Create renderMinimap() function
// Clone content structure into minimap at reduced scale
// Represent headings, paragraphs, and code blocks as colored bars
// Calculate proportional heights

// Step 2: Create updateViewport() function
// Calculate viewport indicator position and height based on scroll position
// Viewport height = (visible area / total content height) * minimap height
// Viewport top = (scrollTop / total content height) * minimap height

// Step 3: Add scroll listener on the content container
// Call updateViewport() to sync minimap indicator position

// Step 4: Add click listener on minimap
// Scroll content to the proportional position where user clicked

// Step 5: Add drag listener on viewport indicator for smooth scroll navigation`,

  'ng-scroll-to-top': `// Simulating Angular scroll-to-top button with smooth scrolling
const scrollBtn = document.getElementById('scroll-top-btn');
const scrollContainer = document.getElementById('scroll-container');
let isVisible = false;

// Step 1: Add scroll listener on scrollContainer
// Show button when scrolled past 300px, hide when near top
// Add fade-in/fade-out transition classes
// Update isVisible state

// Step 2: Add click listener on scrollBtn
// Smooth scroll to top using scrollTo with behavior: 'smooth'
// Add a brief spinning animation to the button icon during scroll

// Step 3: Create progress indicator on the button
// Show a circular progress ring indicating scroll percentage
// Update on each scroll event

// Step 4: Add keyboard shortcut (Home key) to trigger scroll to top`,

  'ng-anchor-links': `// Simulating Angular anchor link navigation with active tracking
const navLinks = document.getElementById('anchor-nav');
const sections = document.querySelectorAll('.anchor-section');
let activeSection = '';

// Step 1: Create renderNav() function
// Generate navigation links from .anchor-section elements
// Each link has href="#section-id" and shows the section title
// Highlight the active section link

// Step 2: Create setupObserver() function
// Use IntersectionObserver with threshold and rootMargin
// When a section enters the viewport, update activeSection
// Toggle 'active' class on the corresponding nav link

// Step 3: Add click listener on navLinks (event delegation)
// Prevent default, smooth scroll to the target section
// Update URL hash without jumping

// Step 4: Handle initial hash in URL to scroll to linked section on load`,

  'ng-table-of-contents': `// Simulating Angular table of contents auto-generated from headings
const tocEl = document.getElementById('toc');
const article = document.getElementById('article-content');
let headings = [];
let activeId = '';

// Step 1: Create generateTOC() function
// Query all h2 and h3 elements in article
// Build hierarchical structure (h3 nested under preceding h2)
// Render as nested <ul> lists with links to heading IDs
// Add IDs to headings that lack them

// Step 2: Create highlightActive() function
// Use IntersectionObserver to track which heading is in view
// Add 'active' class to the corresponding TOC link
// Auto-scroll TOC to keep active link visible

// Step 3: Add click listener on tocEl for smooth scrolling to headings
// Prevent default jump, use scrollIntoView with smooth behavior

// Step 4: Add resize listener to recalculate heading positions
// Handle dynamic content changes`,

  'ng-step-indicator': `// Simulating Angular step/progress indicator component
const stepsEl = document.getElementById('step-indicator');
const stepContent = document.getElementById('step-content');
const steps = ['Account', 'Profile', 'Preferences', 'Review', 'Complete'];
let currentStep = 0;

// Step 1: Create renderSteps() function
// Generate step circles connected by lines
// Mark steps as 'completed' (before current), 'active' (current), or 'pending'
// Completed steps show checkmark, active shows step number with pulse
// Animate the connecting line fill based on progress

// Step 2: Create renderContent(stepIdx) function
// Show appropriate form/content for the current step
// Animate content transition (slide or fade)

// Step 3: Add click listener on step circles to navigate to a step
// Only allow navigating to completed or current steps

// Step 4: Add click listeners on Next/Previous buttons
// Validate current step before advancing
// Update step states and content`,

  'ng-app-shell': `// Simulating Angular application shell with lazy-loaded regions
const header = document.getElementById('shell-header');
const sidebar = document.getElementById('shell-sidebar');
const main = document.getElementById('shell-main');
const footer = document.getElementById('shell-footer');
let sidebarOpen = true;

// Step 1: Create renderShell() function
// Render header with logo, nav links, and user menu
// Render sidebar with navigation items and collapse button
// Main area shows placeholder content
// Footer shows version and status

// Step 2: Create toggleSidebar() function
// Toggle sidebarOpen state, add/remove 'collapsed' class
// Animate sidebar width transition
// Adjust main content area width accordingly

// Step 3: Create loadContent(route) function
// Simulate lazy loading with skeleton placeholder, then replace with content after delay
// Update active states in sidebar and header navigation

// Step 4: Add click listeners for sidebar toggle, nav items, and responsive breakpoint
// Auto-collapse sidebar on small screens`,

  'ng-header-scroll-hide': `// Simulating Angular header that hides on scroll down, shows on scroll up
const header = document.getElementById('hide-header');
const scrollArea = document.getElementById('scroll-area');
let lastScrollTop = 0;
let headerVisible = true;
const THRESHOLD = 5;

// Step 1: Add scroll listener on scrollArea
// Calculate scroll direction by comparing current scrollTop to lastScrollTop
// If scrolling down past THRESHOLD and header is visible, hide it (transform translateY -100%)
// If scrolling up past THRESHOLD and header is hidden, show it (transform translateY 0)
// Update lastScrollTop

// Step 2: Add CSS transition for smooth slide in/out animation
// Set transition on transform property

// Step 3: Handle edge cases
// Always show header when at top of page (scrollTop < 50)
// Add shadow to header when not at top

// Step 4: Add debounce to avoid excessive updates during fast scrolling`,

  'ng-sticky-header': `// Simulating Angular sticky header with intersection observer
const stickyHeader = document.getElementById('sticky-header');
const sentinel = document.getElementById('sticky-sentinel');
const headerContent = document.getElementById('header-content');
let isStuck = false;

// Step 1: Create setupObserver() function
// Place sentinel element just above the header position
// Create IntersectionObserver watching the sentinel
// When sentinel leaves viewport (not intersecting), header becomes sticky
// When sentinel enters viewport, header unsticks

// Step 2: Create updateHeader(stuck) function
// Toggle 'stuck' class on stickyHeader
// When stuck: add shadow, compact padding, show minimal version
// When unstuck: remove shadow, restore full padding

// Step 3: Add scroll listener as fallback for browsers without IntersectionObserver

// Step 4: Handle resize events to recalculate sentinel position`,

  'ng-page-transitions': `// Simulating Angular route transition animations
const pageContainer = document.getElementById('page-container');
const pages = {
  home: { title: 'Home', content: 'Welcome to the home page with featured content and announcements.' },
  about: { title: 'About', content: 'Learn more about our mission, team, and values.' },
  contact: { title: 'Contact', content: 'Get in touch with us through email, phone, or our contact form.' },
};
let currentPage = 'home';
let transitioning = false;

// Step 1: Create transition(fromPage, toPage, type) function
// If already transitioning, return
// Set transitioning = true
// Apply exit animation to current content (fade-out, slide-out, or scale-down)
// After exit animation completes, swap content and apply enter animation
// Set transitioning = false when complete

// Step 2: Create renderPage(pageKey) function
// Set pageContainer innerHTML with page title and content
// Apply enter animation class

// Step 3: Add click listener on nav links to trigger transitions
// Determine transition type based on navigation direction (left/right slide)

// Step 4: Add transition type selector (fade, slide, scale, flip)`,

  'ng-route-guard': `// Simulating Angular route guards (canActivate, canDeactivate)
const pageEl = document.getElementById('guarded-page');
const statusEl = document.getElementById('guard-status');
const logEl = document.getElementById('guard-log');
let isAuthenticated = false;
let hasUnsavedChanges = false;

const routes = {
  home: { guard: null, content: 'Public home page' },
  dashboard: { guard: 'auth', content: 'Protected dashboard content' },
  admin: { guard: 'admin', content: 'Admin-only settings panel' },
  editor: { guard: null, content: 'Editor with unsaved changes tracking', deactivateGuard: true },
};

// Step 1: Create canActivate(route) function
// Check guard type: null (allow), 'auth' (require login), 'admin' (require admin role)
// Return { allowed: boolean, reason: string }
// Log the guard check result

// Step 2: Create canDeactivate(route) function
// If route has deactivateGuard and hasUnsavedChanges, show confirmation dialog
// Return boolean based on user choice

// Step 3: Create navigate(routeKey) function
// Run canDeactivate on current route, then canActivate on target route
// If both pass, render the new page content
// If blocked, show reason in statusEl

// Step 4: Add click listeners on nav links to trigger navigation
// Add click listener on login/logout toggle to change auth state`,

  'ng-nested-routes': `// Simulating Angular nested/child routes
const mainContent = document.getElementById('nested-main');
const childContent = document.getElementById('nested-child');
const mainNav = document.getElementById('main-nav');
const childNav = document.getElementById('child-nav');

const routeTree = {
  settings: {
    label: 'Settings',
    children: {
      profile: { label: 'Profile', content: 'Edit your name, email, and avatar.' },
      security: { label: 'Security', content: 'Manage passwords and two-factor authentication.' },
      notifications: { label: 'Notifications', content: 'Configure email and push notification preferences.' },
    }
  },
  team: {
    label: 'Team',
    children: {
      members: { label: 'Members', content: 'View and manage team members.' },
      roles: { label: 'Roles', content: 'Define roles and permissions.' },
    }
  },
};
let activePath = ['settings', 'profile'];

// Step 1: Create renderMainNav() function
// Render top-level route links, highlight active parent route

// Step 2: Create renderChildNav(parentKey) function
// Render child route links for the active parent, highlight active child

// Step 3: Create navigate(parent, child) function
// Update activePath, render both nav levels, show child content
// Update URL display with "/parent/child" path

// Step 4: Add click listeners on mainNav and childNav for navigation`,

  'ng-tab-router': `// Simulating Angular tab-based routing with preserved state
const tabBar = document.getElementById('tab-router-bar');
const tabContent = document.getElementById('tab-router-content');
const tabs = ['Dashboard', 'Analytics', 'Settings'];
let activeTab = 'Dashboard';
const tabState = {};

// Step 1: Create renderTabBar() function
// Generate tab buttons with close (x) icon, highlight active tab
// Show "+" button to add new tab

// Step 2: Create renderContent(tabName) function
// If tabState has saved content for this tab, restore it
// Otherwise render fresh default content
// Each tab has a text input so state preservation is testable

// Step 3: Create saveState(tabName) function
// Capture current input values and scroll position in tabState

// Step 4: Add click listener on tabBar for tab switching
// Save current tab state before switching, restore new tab state
// Handle close button to remove tabs (prevent closing last tab)

// Step 5: Update URL hash with active tab name`,

  'ng-deep-linking': `// Simulating Angular deep linking with query parameters
const contentEl = document.getElementById('deep-content');
const urlBar = document.getElementById('url-bar');
const filters = { category: 'all', sort: 'name', page: 1, search: '' };

const items = [
  { name: 'Angular', category: 'framework' },
  { name: 'React', category: 'framework' },
  { name: 'TypeScript', category: 'language' },
  { name: 'Webpack', category: 'tool' },
  { name: 'ESLint', category: 'tool' },
  { name: 'Python', category: 'language' },
];

// Step 1: Create parseURL() function
// Read hash fragment and extract query parameters
// Update filters object from URL parameters

// Step 2: Create updateURL() function
// Build URL hash string from current filters
// Only include non-default values
// Update urlBar display

// Step 3: Create render() function
// Filter and sort items based on current filters
// Render item list and active filter indicators
// Call updateURL() to keep URL in sync

// Step 4: Add change/input listeners on filter controls to update filters and re-render
// Add hashchange listener to handle browser back/forward navigation`,

  'ng-url-state': `// Simulating Angular URL-driven state management
const stateDisplay = document.getElementById('url-state-display');
const urlDisplay = document.getElementById('current-url');

const defaults = { view: 'grid', theme: 'light', collapsed: false, selected: null };
let state = Object.assign({}, defaults);

// Step 1: Create syncToURL() function
// Serialize state to URL search params, omitting default values
// Update browser hash (simulated via urlDisplay element)

// Step 2: Create syncFromURL() function
// Parse URL hash parameters
// Merge with defaults, update state object
// Return the parsed state

// Step 3: Create render() function
// Display current state as formatted key-value pairs
// Show which values differ from defaults
// Render content based on state (grid/list view, theme, etc.)

// Step 4: Add click listeners on control buttons to modify state
// Each change updates state, calls syncToURL() and render()

// Step 5: Add hashchange listener to call syncFromURL() and render()`,

  'ng-back-to-top': `// Simulating Angular back-to-top component with progress ring
const backBtn = document.getElementById('back-to-top');
const ring = document.getElementById('progress-ring');
const scrollArea = document.getElementById('btt-scroll-area');
const SHOW_AFTER = 200;

// Step 1: Create updateProgress() function
// Calculate scroll percentage (scrollTop / (scrollHeight - clientHeight))
// Update SVG circle stroke-dashoffset to show progress ring fill
// Show/hide button based on scroll position (visible after SHOW_AFTER px)

// Step 2: Add scroll listener on scrollArea
// Call updateProgress() on each scroll event
// Use requestAnimationFrame for smooth updates

// Step 3: Add click listener on backBtn
// Smooth scroll to top
// Add rotation animation to the button during scroll

// Step 4: Add CSS transitions for fade-in/fade-out of the button`,

  'ng-scroll-spy': `// Simulating Angular scroll spy directive for navigation highlighting
const spyNav = document.getElementById('spy-nav');
const spySections = document.querySelectorAll('.spy-section');
const scrollContainer = document.getElementById('spy-scroll');
let activeId = '';

// Step 1: Create buildNav() function
// Generate navigation links from spy-section elements
// Each link shows section title and has data-target attribute

// Step 2: Create setupScrollSpy() function
// Create IntersectionObserver with rootMargin to trigger slightly before section tops
// When a section enters the viewport, update activeId
// Toggle 'active' class on corresponding nav link
// Add smooth indicator animation (sliding underline or highlight bar)

// Step 3: Add click listener on spyNav
// Smooth scroll to target section on link click
// Temporarily disable observer to prevent flickering during programmatic scroll

// Step 4: Handle edge cases
// First and last sections at page boundaries
// Rapid scrolling that skips sections`,

  // ---------------------------------------------------------------------------
  // advanced starters
  // ---------------------------------------------------------------------------

  'ng-theme-switcher': `// Simulating Angular theme switcher service with CSS variables
const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const themeSelect = document.getElementById('theme-select');
const preview = document.getElementById('theme-preview');

const themes = {
  light: { '--bg': '#ffffff', '--text': '#1a1a2e', '--primary': '#3b82f6', '--surface': '#f1f5f9' },
  dark: { '--bg': '#0f172a', '--text': '#e2e8f0', '--primary': '#60a5fa', '--surface': '#1e293b' },
  ocean: { '--bg': '#0c1222', '--text': '#c7d2fe', '--primary': '#06b6d4', '--surface': '#1a2744' },
};
let currentTheme = localStorage.getItem('ng-theme') || 'light';

// Step 1: Create applyTheme(themeName) function
// Read theme object, set each CSS variable on root element
// Update currentTheme, save to localStorage
// Toggle 'dark' class on document body for system-level dark mode

// Step 2: Create render() function
// Update themeSelect to highlight the current theme
// Update preview card to show the current theme colors

// Step 3: Add click listener on themeBtn to cycle through themes
// Add click listener on themeSelect options to switch directly

// Step 4: Check prefers-color-scheme media query on init
// Use matchMedia to detect system preference and apply on first visit`,

  'ng-i18n-locale': `// Simulating Angular i18n/locale switching
const translations = {
  en: { greeting: 'Hello', welcome: 'Welcome to our app', submit: 'Submit', cancel: 'Cancel', items: '{count} item(s)', lang: 'English' },
  es: { greeting: 'Hola', welcome: 'Bienvenido a nuestra app', submit: 'Enviar', cancel: 'Cancelar', items: '{count} elemento(s)', lang: 'Espanol' },
  ja: { greeting: '\\u3053\\u3093\\u306B\\u3061\\u306F', welcome: '\\u30A2\\u30D7\\u30EA\\u3078\\u3088\\u3046\\u3053\\u305D', submit: '\\u9001\\u4FE1', cancel: '\\u30AD\\u30E3\\u30F3\\u30BB\\u30EB', items: '{count} \\u30A2\\u30A4\\u30C6\\u30E0', lang: '\\u65E5\\u672C\\u8A9E' },
};
let locale = 'en';

// Step 1: Create t(key, params) function
// Look up key in current locale translations
// Replace {param} placeholders with values from params object
// Fall back to English if key not found in current locale

// Step 2: Create render() function
// Update all elements with data-i18n attribute using t() function
// Update lang selector to show current locale
// Update document direction (ltr/rtl) based on locale

// Step 3: Add change listener on locale selector to switch language and re-render

// Step 4: Save locale preference to localStorage, restore on page load`,

  'ng-a11y-focus-trap': `// Simulating Angular CDK FocusTrap directive
const modal = document.getElementById('trap-modal');
const openBtn = document.getElementById('trap-open');
let previousFocus = null;

// Step 1: Create getFocusableElements(container) function
// Query all focusable elements: buttons, inputs, links, selects, textareas
// Filter out disabled and hidden elements
// Return ordered array of focusable elements

// Step 2: Create trapFocus(container) function
// Get first and last focusable elements
// Add keydown listener for Tab key
// If Tab on last element, focus first element (wrap forward)
// If Shift+Tab on first element, focus last element (wrap backward)

// Step 3: Create openModal() function
// Store document.activeElement as previousFocus
// Show modal, call trapFocus(modal)
// Focus the first focusable element inside the modal

// Step 4: Create closeModal() function
// Hide modal, remove Tab trap listener
// Restore focus to previousFocus element

// Step 5: Add click listener on openBtn and close buttons, Escape key to close`,

  'ng-a11y-live-region': `// Simulating Angular ARIA live region announcements
const liveRegion = document.getElementById('live-region');
const statusEl = document.getElementById('status-message');
const logEl = document.getElementById('announcement-log');
let announcements = [];

// Step 1: Create announce(message, priority) function
// Set liveRegion textContent to message
// priority 'polite' -> aria-live="polite" (waits for pause in speech)
// priority 'assertive' -> aria-live="assertive" (interrupts current speech)
// Log announcement with timestamp

// Step 2: Create clearAnnouncement() function
// Clear liveRegion after a delay to allow screen reader to finish
// Use setTimeout of 1000ms then set textContent to empty string

// Step 3: Add click listeners on action buttons
// Each triggers a different announcement with appropriate priority
// "Save" -> polite "Changes saved", "Error" -> assertive "Error occurred"

// Step 4: Render announcement log showing all past announcements with timestamps`,

  'ng-offline-indicator': `// Simulating Angular offline detection service
const indicator = document.getElementById('offline-indicator');
const statusText = document.getElementById('connection-status');
const queueEl = document.getElementById('offline-queue');
let isOnline = true;
let pendingActions = [];

// Step 1: Create updateStatus(online) function
// Set isOnline state, update indicator appearance
// Online: green dot, "Connected" text
// Offline: red dot, "Offline" text, show queued actions count

// Step 2: Create queueAction(action) function
// If offline, add action to pendingActions array with timestamp
// Update queue display showing pending action count and descriptions

// Step 3: Create flushQueue() function
// Process all pendingActions (simulate sending them)
// Show progress as actions are processed
// Clear queue when complete

// Step 4: Add click listener on #toggle-connection to simulate online/offline
// When going online, automatically call flushQueue()
// Add click listeners on action buttons that queue when offline`,

  'ng-websocket-chat': `// Simulating Angular WebSocket chat with RxJS
const messagesEl = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('chat-send');
const statusEl = document.getElementById('chat-status');
let messages = [];
let connected = false;
const users = ['Alice', 'Bob', 'System'];

// Step 1: Create connect() function
// Simulate WebSocket connection with setTimeout
// Update statusEl to "Connected"
// Start simulating incoming messages every 3-5 seconds

// Step 2: Create sendMessage(text) function
// Add message to messages array with sender "You", timestamp
// Render the new message, scroll to bottom
// Simulate echo response after short delay

// Step 3: Create renderMessage(msg) function
// Generate .chat-message element with sender avatar, name, text, and timestamp
// Style differently based on sender (own messages right-aligned)

// Step 4: Add click listener on sendBtn and Enter key on chatInput to send
// Add click listener on #connect-btn to toggle connection

// Step 5: Create typing indicator that shows when simulated user is "typing"`,

  'ng-optimistic-update': `// Simulating Angular optimistic UI update pattern
const listEl = document.getElementById('optimistic-list');
const addBtn = document.getElementById('optimistic-add');
let items = [
  { id: 1, text: 'First item', status: 'synced' },
  { id: 2, text: 'Second item', status: 'synced' },
];
let nextId = 3;

// Step 1: Create render() function
// Render items with status indicator (synced=green check, pending=spinner, failed=red x)
// Pending items shown with reduced opacity
// Failed items show retry button

// Step 2: Create addItem(text) function
// Immediately add item to list with status 'pending' and render (optimistic)
// Simulate API call with setTimeout (1-2s delay)
// On success (80% chance): update status to 'synced'
// On failure (20% chance): update status to 'failed'

// Step 3: Create retryItem(id) function
// Set item status back to 'pending', re-render
// Retry the simulated API call

// Step 4: Create deleteItem(id) function
// Optimistically remove from list, attempt simulated API delete
// On failure, restore the item with 'failed' status

// Step 5: Add click listeners for add, delete, and retry actions`,

  'ng-undo-manager': `// Simulating Angular undo/redo manager service
const canvas = document.getElementById('undo-canvas');
const historyEl = document.getElementById('undo-history');
const undoBtn = document.getElementById('undo-btn');
const redoBtn = document.getElementById('redo-btn');
let stateStack = [[]];
let redoStack = [];
let currentState = [];

// Step 1: Create pushState(description) function
// Deep-clone currentState and push to stateStack with description
// Clear redoStack (new action invalidates future states)
// Update history display and button states

// Step 2: Create undo() function
// If stateStack has more than 1 entry, pop last state
// Push current state to redoStack
// Restore the previous state, re-render canvas

// Step 3: Create redo() function
// If redoStack has entries, pop last entry
// Push current state to stateStack
// Restore the popped state, re-render canvas

// Step 4: Create renderHistory() function
// Show list of actions with timestamps in historyEl
// Highlight the current position in the history

// Step 5: Add keyboard shortcuts Ctrl+Z (undo) and Ctrl+Shift+Z (redo)
// Add click listeners on undo/redo buttons and action buttons`,

  'ng-clipboard-manager': `// Simulating Angular clipboard service with history
const clipInput = document.getElementById('clip-input');
const clipHistory = document.getElementById('clip-history');
const clipPreview = document.getElementById('clip-preview');
let history = JSON.parse(localStorage.getItem('ng-clipboard') || '[]');

// Step 1: Create copyToClipboard(text) function
// Use navigator.clipboard.writeText if available, fallback to execCommand
// Add entry to history with text, timestamp, and type detection (url, email, code, text)
// Save history to localStorage (keep last 20 entries)
// Show brief "Copied!" notification

// Step 2: Create render() function
// Render history entries with type icon, truncated text preview, and timestamp
// Add copy-again and delete buttons on each entry

// Step 3: Add click listener on #copy-btn to copy input text
// Add click listener on history items to re-copy or preview full text
// Add click listener on #clear-history to clear all entries

// Step 4: Add keyboard shortcut Ctrl+C detection to auto-capture clipboard content`,

  'ng-hotkey-manager': `// Simulating Angular hotkey/keyboard shortcut manager
const hotkeyList = document.getElementById('hotkey-list');
const logEl = document.getElementById('hotkey-log');
const shortcuts = [
  { keys: 'Ctrl+S', action: 'Save', category: 'File' },
  { keys: 'Ctrl+N', action: 'New File', category: 'File' },
  { keys: 'Ctrl+F', action: 'Find', category: 'Edit' },
  { keys: 'Ctrl+Shift+P', action: 'Command Palette', category: 'View' },
  { keys: 'Alt+1', action: 'Tab 1', category: 'Navigation' },
  { keys: 'Alt+2', action: 'Tab 2', category: 'Navigation' },
];
let recording = false;
let recordTarget = null;

// Step 1: Create renderShortcuts() function
// Group shortcuts by category
// Render each with key badges, action name, and an "Edit" button
// Show visual key combo representation

// Step 2: Create parseKeyEvent(e) function
// Build key string from event (e.g., "Ctrl+Shift+S")
// Handle Ctrl, Alt, Shift, Meta modifiers
// Return the formatted key string

// Step 3: Add keydown listener on document
// Match pressed keys against registered shortcuts
// Execute action and log to logEl with timestamp
// Prevent default browser behavior for matched shortcuts

// Step 4: Implement shortcut recording mode
// When "Edit" is clicked, enter recording mode
// Next key combo replaces that shortcut's keys
// Show visual feedback during recording`,

  'ng-idle-detector': `// Simulating Angular idle detection service
const statusEl = document.getElementById('idle-status');
const timerEl = document.getElementById('idle-timer');
const logEl = document.getElementById('idle-log');
const IDLE_TIMEOUT = 10000; // 10 seconds for demo
const WARNING_BEFORE = 5000; // 5 second warning
let idleTimer = null;
let warningTimer = null;
let isIdle = false;

// Step 1: Create resetTimer() function
// Clear existing timers
// Set warning timer at (IDLE_TIMEOUT - WARNING_BEFORE)
// Set idle timer at IDLE_TIMEOUT
// Update status to "Active" with green indicator

// Step 2: Create showWarning() function
// Update status to "Warning - Idle soon" with yellow indicator
// Start countdown display in timerEl

// Step 3: Create onIdle() function
// Set isIdle = true, update status to "Idle" with red indicator
// Log idle event with timestamp
// Show "Are you still there?" prompt

// Step 4: Add activity listeners (mousemove, keydown, click, scroll) to reset timer
// Throttle the reset calls to avoid excessive timer resets

// Step 5: Add click listener on the prompt button to dismiss idle state`,

  'ng-media-query-hook': `// Simulating Angular responsive breakpoint service
const bpDisplay = document.getElementById('breakpoint-display');
const bpIndicator = document.getElementById('bp-indicator');
const layoutEl = document.getElementById('responsive-layout');

const breakpoints = {
  xs: { min: 0, max: 575, label: 'Extra Small', icon: '\\u{1F4F1}' },
  sm: { min: 576, max: 767, label: 'Small', icon: '\\u{1F4F1}' },
  md: { min: 768, max: 991, label: 'Medium', icon: '\\u{1F4BB}' },
  lg: { min: 992, max: 1199, label: 'Large', icon: '\\u{1F5A5}' },
  xl: { min: 1200, max: Infinity, label: 'Extra Large', icon: '\\u{1F5A5}' },
};
let currentBp = '';

// Step 1: Create getCurrentBreakpoint() function
// Read window.innerWidth
// Find which breakpoint range contains the current width
// Return the breakpoint key

// Step 2: Create updateDisplay() function
// Get current breakpoint, update indicator with name and icon
// Highlight the active breakpoint in the breakpoint bar
// Render layout content appropriate for the breakpoint

// Step 3: Add resize listener with debounce to call updateDisplay
// Use requestAnimationFrame or setTimeout for throttling

// Step 4: Create manual width simulator with slider
// Allow testing different breakpoints without resizing the browser`,

  'ng-portal-demo': `// Simulating Angular CDK Portal for rendering content in different containers
const portalOutlet1 = document.getElementById('outlet-1');
const portalOutlet2 = document.getElementById('outlet-2');
const sourceContent = document.getElementById('portal-source');
let activeOutlet = null;

// Step 1: Create attachPortal(content, outlet) function
// Move or clone content into the target outlet
// Add entrance animation
// Track activeOutlet reference

// Step 2: Create detachPortal() function
// Remove content from current outlet with exit animation
// Set activeOutlet to null

// Step 3: Create transferPortal(fromOutlet, toOutlet) function
// Animate content leaving fromOutlet
// After animation, move content to toOutlet with entrance animation

// Step 4: Add click listeners on outlet selector buttons
// Attach to outlet 1, attach to outlet 2, detach, transfer
// Show visual indicator of which outlet is active`,

  'ng-error-boundary': `// Simulating Angular ErrorHandler service with error boundary
const appContent = document.getElementById('app-content');
const errorDisplay = document.getElementById('error-display');
const errorLog = document.getElementById('error-log');
let errors = [];

// Step 1: Create handleError(error, context) function
// Capture error details: message, stack trace, component context, timestamp
// Add to errors array
// Determine severity (warning, error, fatal) based on error type
// Show appropriate UI: inline warning, error banner, or full error boundary

// Step 2: Create renderErrorBoundary(error) function
// Replace appContent with friendly error message
// Show error details in collapsible section
// Provide "Retry" and "Report" buttons

// Step 3: Create renderErrorLog() function
// Display all captured errors in errorLog with severity badges
// Allow filtering by severity, clearing the log

// Step 4: Add click listeners on trigger buttons to simulate different error types
// Add click listener on "Retry" to reset error state and re-render app content`,

  'ng-retry-mechanism': `// Simulating Angular HTTP retry/backoff interceptor
const resultEl = document.getElementById('retry-result');
const logEl = document.getElementById('retry-log');
const progressEl = document.getElementById('retry-progress');
let failRate = 0.7; // 70% chance of failure for demo

// Step 1: Create simulateRequest(url) function
// Return a Promise that resolves or rejects randomly based on failRate
// Add artificial delay (200-500ms) to simulate network latency

// Step 2: Create retryWithBackoff(fn, maxRetries, baseDelay) function
// Call fn, if it fails:
//   - Log the attempt number and error
//   - Wait for baseDelay * 2^attempt ms (exponential backoff)
//   - Retry up to maxRetries times
//   - Show progress bar and attempt counter
// If all retries exhausted, throw final error

// Step 3: Create render(result) function
// Show success/failure state with details
// Display timing information (total time, attempts)
// Show backoff timeline visualization

// Step 4: Add click listener on #retry-btn to initiate a request with retry
// Add slider to adjust failRate for testing different scenarios`,

  'ng-virtual-list-advanced': `// Simulating Angular CDK advanced virtual scroll with variable height items
const viewport = document.getElementById('adv-viewport');
const scrollContent = document.getElementById('adv-scroll-content');
const statsEl = document.getElementById('adv-stats');
const TOTAL = 5000;
let items = [];
let scrollTop = 0;
let totalHeight = 0;
let positions = [];

// Step 1: Create generateItems() function
// Generate TOTAL items with variable heights (40-120px based on content)
// Pre-calculate positions array with { top, height } for each item
// Set totalHeight to sum of all heights

// Step 2: Create getVisibleRange() function
// Binary search positions array to find first visible item for current scrollTop
// Calculate last visible item based on viewport height plus buffer
// Return { start, end } indices

// Step 3: Create render() function
// Get visible range, generate HTML only for visible items
// Position items absolutely using pre-calculated top values
// Update scrollContent height to totalHeight
// Update stats display with visible count and range

// Step 4: Add scroll listener on viewport with requestAnimationFrame throttling
// Call render on each scroll frame

// Step 5: Call generateItems() and render() on init`,

  // ---------------------------------------------------------------------------
  // ui-components starters
  // ---------------------------------------------------------------------------

  'ng-spinner': `// Simulating Angular loading spinner component with variants
const spinnerArea = document.getElementById('spinner-area');
const sizeSelect = document.getElementById('spinner-size');
const typeSelect = document.getElementById('spinner-type');

// Step 1: Create renderSpinner(type, size, color) function
// Based on type, generate different spinner HTML:
//   'circle': rotating circle with arc gap (border-based)
//   'dots': three bouncing dots with staggered animation
//   'pulse': pulsing circle that grows and fades
//   'bars': vertical bars with wave animation
// Apply size (sm=20px, md=40px, lg=60px) and color

// Step 2: Create render() function
// Get current type and size from selects
// Render spinner in spinnerArea with label text below

// Step 3: Add change listeners on sizeSelect and typeSelect to re-render

// Step 4: Add click listener on #toggle-overlay to show spinner as full overlay
// Dismiss overlay on click or after 3 seconds`,

  'ng-chip': `// Simulating Angular Material chip/tag component
const chipContainer = document.getElementById('chip-container');
const chipInput = document.getElementById('chip-input');
let chips = ['Angular', 'TypeScript', 'RxJS'];
const presets = ['Angular','React','Vue','Svelte','TypeScript','JavaScript','Node','Deno'];

// Step 1: Create render() function
// Render each chip as a .chip span with text and remove (x) button
// Add 'selected' class to any chip that matches a preset
// Show chip count

// Step 2: Add keydown listener on chipInput
// Enter: add new chip if non-empty and not duplicate
// Backspace on empty input: remove last chip
// Comma or Tab: add chip and prevent default

// Step 3: Add click listener on chipContainer (event delegation)
// Click on .remove-btn removes that chip
// Click on chip itself toggles 'selected' class

// Step 4: Add input listener for autocomplete suggestions from presets
// Show dropdown of matching presets below input`,

  'ng-divider': `// Simulating Angular Material divider component with variants
const dividerDemo = document.getElementById('divider-demo');
const controls = document.getElementById('divider-controls');

// Step 1: Create renderDivider(options) function
// options: { type, orientation, inset, label }
// type 'solid': standard horizontal or vertical line
// type 'dashed': dashed line pattern
// type 'dotted': dotted line pattern
// orientation 'horizontal' or 'vertical'
// If inset, add left/right margins
// If label provided, show text centered on the divider

// Step 2: Create render() function
// Show examples of all divider variants in dividerDemo
// Horizontal dividers between content blocks
// Vertical divider between side-by-side columns
// Labeled dividers ("OR", "Section Break", etc.)

// Step 3: Add click listeners on control toggles to update divider options and re-render

// Step 4: Show responsive behavior - vertical dividers become horizontal on narrow screens`,

  'ng-alert-banner': `// Simulating Angular alert/banner notification component
const bannerArea = document.getElementById('banner-area');
const bannerTypes = ['info', 'success', 'warning', 'error'];

// Step 1: Create showBanner(type, message, options) function
// Generate .alert-banner with type class (info=blue, success=green, warning=yellow, error=red)
// Include icon based on type, message text, and optional action button
// options: { dismissible, autoClose, duration, position }
// If dismissible, show close (x) button
// If autoClose, hide after duration ms

// Step 2: Create dismissBanner(bannerEl) function
// Add exit animation (slide up or fade out)
// Remove element after animation completes

// Step 3: Add click listener on #show-banner-btn to create a new banner
// Read type and message from form inputs
// Stack multiple banners vertically

// Step 4: Add click listener on #dismiss-all to remove all active banners`,

  'ng-callout': `// Simulating Angular callout/admonition component
const calloutArea = document.getElementById('callout-area');
const callouts = [
  { type: 'info', title: 'Information', text: 'This feature requires Angular 16 or later.' },
  { type: 'tip', title: 'Tip', text: 'Use trackBy with ngFor for better performance with large lists.' },
  { type: 'warning', title: 'Warning', text: 'This API is deprecated and will be removed in the next major version.' },
  { type: 'danger', title: 'Danger', text: 'Never expose API keys in client-side code.' },
];

// Step 1: Create renderCallout(callout) function
// Generate .callout element with type-specific styling
// info=blue, tip=green, warning=amber, danger=red
// Include icon, title, and text content
// Add optional collapsible behavior for long content

// Step 2: Create render() function
// Render all callout examples in calloutArea

// Step 3: Add click listener on callout headers to toggle expanded/collapsed state

// Step 4: Add click listener on #add-callout to create custom callout from form inputs`,

  'ng-empty-state-v2': `// Simulating Angular empty state component with illustrations and actions
const emptyContainer = document.getElementById('empty-v2');
const templates = {
  'no-results': { icon: '\\u{1F50D}', title: 'No results found', desc: 'Try adjusting your filters or search terms.', actions: ['Clear Filters', 'Browse All'] },
  'no-data': { icon: '\\u{1F4E6}', title: 'No items yet', desc: 'Create your first item to get started.', actions: ['Create Item'] },
  'error': { icon: '\\u{26A0}', title: 'Something went wrong', desc: 'We encountered an error loading your data.', actions: ['Retry', 'Contact Support'] },
  'empty-cart': { icon: '\\u{1F6D2}', title: 'Your cart is empty', desc: 'Browse our products and add items to your cart.', actions: ['Browse Products'] },
  'offline': { icon: '\\u{1F4F4}', title: 'You are offline', desc: 'Check your connection and try again.', actions: ['Retry'] },
};

// Step 1: Create renderEmpty(templateKey) function
// Get template data, generate empty state with large icon, title, description
// Render action buttons styled appropriately (primary/secondary)
// Add subtle animation (float or fade-in)

// Step 2: Add click listener on template selector to switch between empty states

// Step 3: Add click listener on action buttons
// Each action simulates its behavior (clear filters, retry, etc.)
// Show brief loading state, then transition to content or same empty state

// Step 4: Support custom empty state via form inputs (icon, title, desc, actions)`,

  'ng-avatar-group': `// Simulating Angular avatar group/stack component
const groupEl = document.getElementById('avatar-group');
const controls = document.getElementById('group-controls');
const users = [
  { name: 'Alice', color: '#ef4444' },
  { name: 'Bob', color: '#3b82f6' },
  { name: 'Carol', color: '#22c55e' },
  { name: 'Dave', color: '#f59e0b' },
  { name: 'Eve', color: '#a855f7' },
  { name: 'Frank', color: '#ec4899' },
  { name: 'Grace', color: '#06b6d4' },
  { name: 'Hank', color: '#84cc16' },
];
let maxVisible = 4;

// Step 1: Create render() function
// Show first maxVisible avatars overlapping (negative margin)
// If more users than maxVisible, show "+N" overflow indicator
// Each avatar shows initial letter on colored circle background
// Add hover effect to spread avatars apart

// Step 2: Add hover listener on the overflow indicator
// Show tooltip or dropdown listing remaining hidden users

// Step 3: Add click listener on controls to change maxVisible (3, 4, 5, all)
// Re-render with new visibility setting

// Step 4: Add click listener on individual avatars to select/highlight them`,

  'ng-breadcrumb-overflow': `// Simulating Angular breadcrumb with overflow handling
const breadcrumbEl = document.getElementById('breadcrumb-overflow');
const paths = ['Home', 'Documents', 'Projects', 'Web Development', 'Angular', 'Components', 'UI Library', 'Current Page'];
let maxItems = 4;

// Step 1: Create render() function
// If paths length <= maxItems, show all breadcrumb items
// If paths length > maxItems, show first item, "..." dropdown, and last (maxItems-2) items
// Each item is clickable, last item is styled as current (non-clickable)
// Add separator (/ or >) between items

// Step 2: Create renderOverflowMenu(hiddenItems) function
// Show dropdown menu listing the hidden middle items
// Each item in the dropdown navigates when clicked

// Step 3: Add click listener on breadcrumb items to navigate
// Update the paths array to truncate at clicked position
// Re-render breadcrumbs

// Step 4: Add resize observer to dynamically adjust maxItems based on container width`,

  'ng-truncated-text': `// Simulating Angular text truncation directive with expand/collapse
const textItems = document.querySelectorAll('.truncate-item');
const CHAR_LIMIT = 100;
const LINE_LIMIT = 3;

// Step 1: Create truncateText(el, mode) function
// mode 'chars': truncate text at CHAR_LIMIT characters, add ellipsis
// mode 'lines': use CSS line-clamp to limit visible lines
// Add "Read more" button if text exceeds limit
// Store full text in data attribute

// Step 2: Create expandText(el) function
// Show full text content with smooth height transition
// Change button to "Read less"

// Step 3: Create collapseText(el) function
// Re-truncate text with reverse transition
// Change button to "Read more"

// Step 4: Add click listener on "Read more/less" buttons to toggle expansion
// Initialize all .truncate-item elements on page load`,

  'ng-responsive-grid': `// Simulating Angular responsive grid layout component
const gridEl = document.getElementById('responsive-grid');
const gridItems = Array.from({ length: 12 }, function(_, i) { return { id: i + 1, title: 'Item ' + (i + 1), height: Math.floor(Math.random() * 100) + 80 }; });
let columns = 3;
let gap = 16;

// Step 1: Create render() function
// Set grid-template-columns to "repeat(columns, 1fr)" with gap
// Render items as colored cards with title and varying heights
// Add responsive behavior: 4 cols on xl, 3 on lg, 2 on md, 1 on sm

// Step 2: Create updateLayout(cols) function
// Animate transition between column layouts
// Re-render grid with new column count

// Step 3: Add click listener on column selector buttons (1-4) to set columns
// Add range slider for gap adjustment

// Step 4: Add resize listener to auto-adjust columns based on container width`,

  'ng-masonry-layout': `// Simulating Angular masonry/waterfall layout component
const masonryEl = document.getElementById('masonry-grid');
const items = Array.from({ length: 15 }, function(_, i) {
  return { id: i + 1, title: 'Card ' + (i + 1), height: Math.floor(Math.random() * 150) + 100, color: ['#ef4444','#3b82f6','#22c55e','#f59e0b','#a855f7'][i % 5] };
});
let columnCount = 3;

// Step 1: Create layout() function
// Calculate column widths based on container width and columnCount
// Distribute items across columns, placing each item in the shortest column
// Position items absolutely with calculated top and left values

// Step 2: Create render() function
// Generate .masonry-item elements with title and colored background
// Set each item's height from data
// Call layout() to position items

// Step 3: Add resize listener to recalculate layout
// Use requestAnimationFrame for smooth repositioning

// Step 4: Add click listener on column buttons to change columnCount and re-layout
// Animate items moving to new positions`,

  'ng-aspect-ratio-box': `// Simulating Angular aspect ratio container component
const demoArea = document.getElementById('aspect-demo');
const ratios = ['1:1', '4:3', '16:9', '21:9', '3:4', '2:3'];
let activeRatio = '16:9';

// Step 1: Create renderBox(ratio) function
// Parse ratio string into width and height values
// Use padding-top percentage trick: (height/width) * 100%
// Render content inside the aspect ratio container
// Show the ratio label and calculated percentage

// Step 2: Create render() function
// Show the active ratio box with sample content (image placeholder, video frame)
// Display all ratio options as small preview thumbnails

// Step 3: Add click listener on ratio selector buttons to change active ratio
// Animate the box transitioning between ratios

// Step 4: Add resize listener to demonstrate responsive behavior
// Box maintains aspect ratio at any container width`,

  'ng-scroll-snap': `// Simulating Angular scroll snap container component
const snapContainer = document.getElementById('snap-container');
const indicators = document.getElementById('snap-indicators');
const slides = [
  { title: 'Welcome', content: 'Discover our features', bg: '#1e293b' },
  { title: 'Features', content: 'Built for performance', bg: '#172135' },
  { title: 'Pricing', content: 'Plans for every team', bg: '#1a2332' },
  { title: 'Get Started', content: 'Try it free today', bg: '#1e293b' },
];
let activeSlide = 0;

// Step 1: Create render() function
// Generate .snap-slide elements with scroll-snap-align: start
// Set snapContainer with scroll-snap-type: x mandatory
// Render dot indicators below

// Step 2: Add scroll listener on snapContainer
// Detect which slide is in view based on scrollLeft and slide width
// Update activeSlide and indicator dots

// Step 3: Add click listener on indicators to scroll to specific slide
// Use scrollTo with smooth behavior

// Step 4: Add touch/swipe gesture detection for mobile navigation`,

  'ng-parallax': `// Simulating Angular parallax scrolling effect directive
const parallaxContainer = document.getElementById('parallax-container');
const layers = [
  { speed: 0.2, content: 'Background Layer', bg: '#0f172a' },
  { speed: 0.5, content: 'Middle Layer', bg: '#1e293b' },
  { speed: 0.8, content: 'Foreground Layer', bg: '#334155' },
];

// Step 1: Create render() function
// Generate parallax layer elements with different z-index values
// Each layer has content and background color

// Step 2: Create updateParallax() function
// Read current scrollTop of the container
// For each layer, calculate translateY based on scrollTop * layer.speed
// Apply the transform to create depth illusion

// Step 3: Add scroll listener on parallaxContainer
// Call updateParallax() on each scroll event using requestAnimationFrame

// Step 4: Add toggle to switch between scroll-based and mouse-based parallax
// Mouse-based: layers respond to cursor position instead of scroll`,

  'ng-animated-counter': `// Simulating Angular animated number counter component
const counters = document.querySelectorAll('.counter');
const triggerBtn = document.getElementById('counter-trigger');
let hasAnimated = false;

// Step 1: Create animateCounter(el, start, end, duration, format) function
// Animate number from start to end over duration ms using requestAnimationFrame
// Apply easing function (ease-out) for natural deceleration
// Format: 'number' (plain), 'currency' ($X,XXX), 'percent' (X%)
// Update el.textContent on each frame

// Step 2: Create formatValue(value, format) function
// Apply thousands separators, currency symbol, or percent sign
// Handle decimal places appropriately

// Step 3: Create setupObserver() function
// Use IntersectionObserver to trigger animation when counters enter viewport
// Only animate once per counter (or re-animate on each scroll-in)

// Step 4: Add click listener on triggerBtn to manually re-trigger all counter animations
// Reset all counters to 0 first, then animate to target values`,

  'ng-confetti': `// Simulating Angular confetti celebration effect component
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
const triggerBtn = document.getElementById('confetti-trigger');
let particles = [];
let animationId = null;

canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;

const COLORS = ['#ef4444','#f59e0b','#22c55e','#3b82f6','#a855f7','#ec4899','#06b6d4'];

// Step 1: Create createParticle(x, y) function
// Return object with: x, y, vx (random -5 to 5), vy (random -15 to -5)
// color (random from COLORS), size (random 4-10), rotation, rotationSpeed
// shape: randomly choose 'circle', 'square', or 'strip'

// Step 2: Create burst(x, y, count) function
// Generate count particles at position (x, y)
// Add all to particles array
// Start animation loop if not running

// Step 3: Create animate() function
// Clear canvas, update each particle:
//   Apply gravity (vy += 0.3), air resistance (vx *= 0.99)
//   Update position, rotation
//   Draw particle shape with color
// Remove particles that fall below canvas
// Stop animation when no particles remain

// Step 4: Add click listener on triggerBtn to burst from center top
// Add click listener on canvas to burst at click position
// Add different burst patterns: fountain, explosion, rain`,
};
