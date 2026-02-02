import type { FrontendDrillProblem } from '../types';

export const angularProblems: FrontendDrillProblem[] = [
  {
    id: 'fe-ng-component-decorator',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'Component Decorator',
    text: 'Write an Angular @Component decorator with selector "app-hello" and a template containing "<h1>Hello World</h1>".',
    setup: 'Write the full @Component({...}) decorator call.',
    setupCode: `const componentConfig = {};`,
    expected: '@Component decorator with selector and template',
    sample: `@Component({
  selector: 'app-hello',
  template: '<h1>Hello World</h1>'
})`,
    validPatterns: [
      /@Component\s*\(\s*\{[^}]*selector\s*:\s*['"]app-hello['"][^}]*template\s*:/,
      /@Component\s*\(\s*\{[^}]*template\s*:[^}]*selector\s*:\s*['"]app-hello['"]/,
    ],
    realWorldExample:
      "Every Angular app starts with a root component -- Gmail's entire inbox view is a single @Component with a selector and template.",
    hints: ['Use @Component({...}) with selector and template properties'],
    tags: ['decorator', 'component'],
  },
  {
    id: 'fe-ng-event-binding',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Event Binding',
    text: 'Write an Angular template: a <button> with text "Click Me" that calls handleClick() on click using (click) event binding.',
    setup: 'Write the full HTML template string with Angular event binding syntax.',
    setupCode: `const template = '';`,
    expected: 'Template with (click) event binding',
    sample: `<button (click)="handleClick()">Click Me</button>`,
    validPatterns: [/<button[^>]*\(click\)\s*=\s*["']handleClick\(\)["'][^>]*>/],
    realWorldExample:
      "The 'Send' button in Slack fires a (click) event that triggers message delivery -- Angular's event binding wires UI actions to component logic.",
    hints: ['Use Angular event binding syntax: (eventName)="handler()"'],
    editorLanguage: 'html',
    tags: ['events', 'template'],
  },
  {
    id: 'fe-ng-input-decorator',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: '@Input Decorator',
    text: 'A child component needs to receive a "name" value (a string) from its parent. Declare the property with the appropriate decorator so Angular passes data down.',
    setup:
      'You have a component that needs to accept a name property from its parent component. Write the decorated property declaration.',
    setupCode: `class MyComponent {}`,
    expected: '@Input decorated property',
    sample: `@Input() name: string;`,
    validPatterns: [/@Input\s*\(\s*\)\s+name\s*:\s*string/, /@Input\s*\(\s*\)\s+name\s*[;:]/],
    realWorldExample:
      'In a YouTube-style app, a VideoCard component receives a video title and thumbnail URL from its parent via @Input -- this is how parent components pass data down to children.',
    hints: [
      'Angular uses a decorator to mark properties as receivable from parent components',
      'Place the decorator directly before the property declaration with its type annotation',
    ],
    tags: ['input', 'decorator', 'props'],
  },
  {
    id: 'fe-ng-output-eventemitter',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: '@Output and EventEmitter',
    text: 'A child component needs to emit string events to its parent through a property called "notify". Declare and initialize the property so the parent can bind to it.',
    setup:
      'You have a component that needs to send string data upward to its parent. Set up the output property with the correct decorator and event emitter type.',
    setupCode: `class MyComponent {}`,
    expected: '@Output with EventEmitter<string>',
    sample: `@Output() notify = new EventEmitter<string>();`,
    validPatterns: [
      /@Output\s*\(\s*\)\s+notify\s*=\s*new\s+EventEmitter\s*<\s*string\s*>\s*\(\s*\)/,
      /@Output\s*\(\s*\)\s+notify:\s*EventEmitter<string>\s*=\s*new\s+EventEmitter/,
    ],
    realWorldExample:
      "When you click 'Add to Cart' on Amazon, the product component emits an event to the parent cart system -- @Output with EventEmitter enables child-to-parent communication.",
    hints: [
      'Angular uses a decorator to mark properties as event outputs',
      'The property must be initialized with an event emitter that specifies the emitted data type',
    ],
    tags: ['output', 'events', 'eventemitter'],
  },
  {
    id: 'fe-ng-ngfor-directive',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'easy',
    title: '*ngFor Directive',
    text: 'Write an Angular template: a <li> element with *ngFor="let item of items" that displays each item using {{ item }} interpolation.',
    setup: 'Write the full <li> element with *ngFor directive and interpolation.',
    setupCode: `const items = ['apple', 'banana', 'cherry'];`,
    expected: 'Template with *ngFor loop',
    sample: `<li *ngFor="let item of items">{{ item }}</li>`,
    validPatterns: [/<li[^>]*\*ngFor\s*=\s*["']let\s+\w+\s+of\s+items["'][^>]*>/],
    realWorldExample:
      'Your Twitter/X feed renders each tweet by looping through an array of posts -- *ngFor iterates over data to generate repeated UI elements.',
    hints: ['Use *ngFor="let item of items" syntax'],
    editorLanguage: 'html',
    tags: ['ngfor', 'loops', 'template'],
  },
  {
    id: 'fe-ng-ngif-directive',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'easy',
    title: '*ngIf Directive',
    text: 'Write an Angular template: a <p> element with *ngIf="isVisible" that shows any text content (e.g. "I am visible!").',
    setup: 'Write the full <p> element with *ngIf directive.',
    setupCode: `const isVisible = true;`,
    expected: 'Template with *ngIf',
    sample: `<p *ngIf="isVisible">I am visible!</p>`,
    validPatterns: [/<p[^>]*\*ngIf\s*=\s*["']isVisible["'][^>]*>/],
    realWorldExample:
      "Netflix shows a 'Continue Watching' section only if you have unfinished shows -- *ngIf conditionally renders UI based on your data.",
    hints: ['Use *ngIf="condition" on the element'],
    editorLanguage: 'html',
    tags: ['ngif', 'conditional', 'template'],
  },
  {
    id: 'fe-ng-service-injectable',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: '@Injectable Decorator',
    text: 'Write an @Injectable({ providedIn: \'root\' }) decorator followed by the class declaration "class DataService {}".',
    setup: 'Write the full @Injectable decorator and class declaration.',
    setupCode: `class DataService {}`,
    expected: '@Injectable service with providedIn: root',
    sample: `@Injectable({
  providedIn: 'root'
})
class DataService {}`,
    validPatterns: [/@Injectable\s*\(\s*\{[^}]*providedIn\s*:\s*['"]root['"]/],
    realWorldExample:
      "Spotify's music player needs a single AudioService shared across every component -- @Injectable({ providedIn: 'root' }) creates an app-wide singleton service.",
    hints: ["Use @Injectable({ providedIn: 'root' })"],
    tags: ['injectable', 'service', 'di'],
  },
  {
    id: 'fe-ng-ngoninit-lifecycle',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'ngOnInit Lifecycle',
    text: 'Implement the lifecycle hook method that runs once after Angular initializes the component\'s data-bound properties. Log "Component initialized" inside it.',
    setup:
      'A component needs to perform initialization logic after its inputs are first set. Implement the appropriate lifecycle method.',
    setupCode: `class MyComponent {}`,
    expected: 'ngOnInit method implementation',
    sample: `ngOnInit() {
  console.log('Component initialized');
}`,
    validPatterns: [
      /ngOnInit\s*\(\s*\)\s*\{[^}]*console\.log/,
      /ngOnInit\s*\(\s*\)\s*:\s*void\s*\{/,
    ],
    realWorldExample:
      "When GitHub's dashboard component loads, ngOnInit fetches your repositories and activity feed -- it is the standard place for initialization logic after inputs are set.",
    hints: [
      'Angular has a lifecycle hook that fires once after the first change detection',
      'The method name follows the pattern ng + lifecycle event name',
    ],
    tags: ['lifecycle', 'hooks', 'ngoninit'],
  },
  {
    id: 'fe-ng-httpclient-get',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'HttpClient GET Request',
    text: 'Fetch data from the "/api/users" endpoint using the Angular HTTP client and log the response. The "http" object is already available.',
    setup: 'Make a GET request and handle the response by subscribing to the returned observable.',
    setupCode: `const http = { get: (url: string) => ({ subscribe: (fn: any) => fn([]) }) };`,
    expected: 'http.get() with subscribe',
    sample: `http.get('/api/users').subscribe(data => {
  console.log(data);
});`,
    validPatterns: [/http\.get\s*\(\s*['"]\/api\/users['"]\s*\)\.subscribe/],
    realWorldExample:
      "When Spotify loads your playlists on app startup, it makes an HTTP GET request to the API -- Angular's HttpClient returns an Observable you subscribe to for the response.",
    hints: [
      'Angular HTTP methods return Observables that must be subscribed to',
      'Chain the subscription directly after the HTTP call',
    ],
    tags: ['http', 'httpclient', 'api'],
  },
  {
    id: 'fe-ng-rxjs-pipe-map',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'RxJS pipe and map',
    text: 'Transform the source$ observable so every emitted number is doubled. Use the RxJS operator composition pattern.',
    setup:
      'You have a source$ observable emitting numbers. Apply a transformation operator that multiplies each value by 2.',
    setupCode: `const source$ = { pipe: (...args: any[]) => source$ };
const map = (fn: any) => fn;`,
    expected: 'pipe() with map() operator',
    sample: `source$.pipe(
  map(x => x * 2)
)`,
    validPatterns: [
      /source\$\.pipe\s*\(\s*map\s*\(/,
      /\.pipe\s*\([^)]*map\s*\([^)]*=>\s*[^)]*\*\s*2/,
    ],
    realWorldExample:
      'Google Maps transforms raw GPS coordinates into human-readable addresses -- RxJS pipe with map lets you reshape each value flowing through a stream.',
    hints: [
      'Use the pipe method on the observable to compose operators',
      'The transformation operator takes a callback that receives each value and returns the transformed result',
    ],
    tags: ['rxjs', 'observable', 'pipe', 'map'],
  },
  {
    id: 'fe-ng-two-way-binding',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'easy',
    title: 'Two-Way Binding',
    text: 'Write an Angular template: an <input> element with [(ngModel)]="username" for two-way data binding.',
    setup: 'Write the full <input> element with banana-in-a-box syntax.',
    setupCode: `const username = '';`,
    expected: 'Input with [(ngModel)]',
    sample: `<input [(ngModel)]="username" />`,
    validPatterns: [/<input[^>]*\[\(ngModel\)\]\s*=\s*["']username["'][^>]*>/],
    realWorldExample:
      'Google Search keeps the search bar text and the underlying query model perfectly in sync as you type -- [(ngModel)] provides that instant two-way data binding.',
    hints: ['Use [(ngModel)]="propertyName" for two-way binding'],
    editorLanguage: 'html',
    tags: ['ngmodel', 'forms', 'two-way'],
  },
  {
    id: 'fe-ng-formcontrol',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Reactive FormControl',
    text: 'Create a reactive form control called "emailControl" for an email field. Initialize it with an empty string as the default value.',
    setup:
      'You need a standalone reactive form control for an email input. Declare it as a const using the appropriate class.',
    setupCode: `const FormControl = class { constructor(value: any) {} };`,
    expected: 'new FormControl with initial value',
    sample: `const emailControl = new FormControl('');`,
    validPatterns: [
      /const\s+emailControl\s*=\s*new\s+FormControl\s*\(/,
      /emailControl\s*=\s*new\s+FormControl\s*\(\s*['"]{2}\s*\)/,
    ],
    realWorldExample:
      "A Mailchimp signup form tracks each input field independently -- FormControl wraps a single field's value, validation, and dirty/touched state.",
    hints: [
      'Reactive forms use a class to wrap individual form field values',
      'Pass the initial value as the constructor argument',
    ],
    tags: ['reactive-forms', 'formcontrol'],
  },
  {
    id: 'fe-ng-dependency-injection',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Constructor Dependency Injection',
    text: "Write a constructor that injects a UserService dependency using Angular's shorthand syntax for automatic property assignment.",
    setup:
      'A component needs to use UserService. Inject it via the constructor so it becomes available as a class property.',
    setupCode: `class MyComponent {}
class UserService {}`,
    expected: 'Constructor with private injected service',
    sample: `constructor(private userService: UserService) {}`,
    validPatterns: [/constructor\s*\(\s*private\s+\w+\s*:\s*UserService\s*\)/],
    realWorldExample:
      "Every page on GitHub that shows user data injects a UserService through the constructor -- Angular's DI wires shared services into components automatically.",
    hints: [
      'Angular can auto-assign constructor parameters as class properties',
      'Use the private/public modifier before the parameter name and type',
    ],
    tags: ['di', 'constructor', 'injection'],
  },
  {
    id: 'fe-ng-template-reference-variable',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: 'Template Reference Variable',
    text: 'Write an Angular template with two elements: (1) an <input> with #nameInput reference variable and type="text", (2) a <button> with (click)="logValue(nameInput.value)" and text "Log".',
    setup: 'Write both elements using Angular template reference variable syntax.',
    setupCode: `const logValue = (val: string) => console.log(val);`,
    expected: 'Template with #ref and usage',
    sample: `<input #nameInput type="text">
<button (click)="logValue(nameInput.value)">Log</button>`,
    validPatterns: [/<input[^>]*#nameInput/, /nameInput\.value/],
    realWorldExample:
      "In Notion's search box, clicking the 'Clear' button reads the input value directly via a template reference -- #refs give you direct DOM access without component code.",
    hints: ['Use #variableName to create a reference, then use it in event bindings'],
    editorLanguage: 'html',
    tags: ['template-ref', 'reference-variable'],
  },

  // ═══════════════════════════════════════════════════════════════
  // DOM & Events (17 new problems)
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'fe-ng-property-binding',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Property Binding',
    text: 'Write an Angular template: an <img> element with property binding [src]="imageUrl" and [alt]="imageAlt".',
    setup: 'Write the <img> element using Angular property binding syntax.',
    setupCode: `const template = '';`,
    expected: 'Template with [src] and [alt] property binding',
    sample: `<img [src]="imageUrl" [alt]="imageAlt" />`,
    validPatterns: [
      /<img[^>]*\[src\]\s*=\s*["']imageUrl["'][^>]*\[alt\]\s*=\s*["']imageAlt["']/,
      /<img[^>]*\[alt\]\s*=\s*["']imageAlt["'][^>]*\[src\]\s*=\s*["']imageUrl["']/,
    ],
    editorLanguage: 'html',
    realWorldExample:
      "Netflix dynamically sets each movie poster's [src] from its API data -- property binding lets you drive HTML attributes from component state.",
    hints: ['Use [property]="expression" syntax for property binding'],
    tags: ['property-binding', 'template'],
  },
  {
    id: 'fe-ng-interpolation',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'String Interpolation',
    text: 'Write an Angular template: a <p> element displaying "Hello, {{ name }}!" using interpolation.',
    setup: 'Write the <p> element using Angular interpolation.',
    setupCode: `const template = '';`,
    expected: 'Template with {{ name }} interpolation',
    sample: `<p>Hello, {{ name }}!</p>`,
    validPatterns: [/<p>[^<]*\{\{\s*name\s*\}\}[^<]*<\/p>/],
    editorLanguage: 'html',
    realWorldExample:
      "GitHub displays 'Hello, {{ username }}' in the top-right corner after login -- string interpolation injects dynamic values directly into HTML text.",
    hints: ['Use {{ expression }} for interpolation inside element content'],
    tags: ['interpolation', 'template'],
  },
  {
    id: 'fe-ng-keyup-event',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Key Event Binding',
    text: 'Write an Angular template: an <input> with (keyup.enter)="onSubmit()" to handle the Enter key.',
    setup: 'Write the <input> element with keyup.enter event binding.',
    setupCode: `const template = '';`,
    expected: 'Template with (keyup.enter) event binding',
    sample: `<input (keyup.enter)="onSubmit()" />`,
    validPatterns: [/<input[^>]*\(keyup\.enter\)\s*=\s*["']onSubmit\(\)["'][^>]*>/],
    editorLanguage: 'html',
    realWorldExample:
      "Pressing Enter in Slack's message input sends your message instantly -- (keyup.enter) binds the Enter key to a specific action without checking keycodes manually.",
    hints: ['Use (keyup.enter)="handler()" for Enter key events'],
    tags: ['events', 'keyup', 'template'],
  },
  {
    id: 'fe-ng-event-object',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Passing $event Object',
    text: 'Write an Angular template: an <input> with (input)="onInput($event)" to pass the event object to the handler.',
    setup: 'Write the <input> element passing $event.',
    setupCode: `const template = '';`,
    expected: 'Template passing $event to handler',
    sample: `<input (input)="onInput($event)" />`,
    validPatterns: [/<input[^>]*\(input\)\s*=\s*["']onInput\(\$event\)["'][^>]*>/],
    editorLanguage: 'html',
    realWorldExample:
      'Google Docs tracks every keystroke by passing $event to calculate cursor position and formatting -- the event object carries details like which key was pressed and the input value.',
    hints: ['Use $event to pass the native DOM event to your handler'],
    tags: ['events', '$event', 'template'],
  },
  {
    id: 'fe-ng-host-listener',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: '@HostListener Decorator',
    text: 'Create a method called "onClick" that listens for click events on the host element and receives the native DOM event as a parameter. Use the appropriate decorator.',
    setup:
      'A directive needs to react when the user clicks its host element. Decorate a method so it automatically fires on clicks and receives the event object.',
    setupCode: `class MyDirective {}`,
    expected: '@HostListener with click event',
    sample: `@HostListener('click', ['$event'])
onClick(event: Event) {}`,
    validPatterns: [/@HostListener\s*\(\s*['"]click['"][^)]*\$event[^)]*\)/],
    realWorldExample:
      "VS Code's web editor uses host listeners on its panel containers to detect clicks for focus management -- @HostListener binds DOM events directly to directive methods.",
    hints: [
      'There is a decorator that binds a method to a DOM event on the host element',
      'The decorator takes the event name and an array of arguments to pass to the method',
    ],
    tags: ['host-listener', 'directive', 'events'],
  },
  {
    id: 'fe-ng-host-binding',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: '@HostBinding Decorator',
    text: 'Bind a boolean property "isActive" (initially false) to the host element so that the CSS class "active" is toggled based on its value. Use the appropriate decorator.',
    setup:
      'A directive needs to conditionally add the "active" class to its host element based on a component property. Decorate the property to create this binding.',
    setupCode: `class MyDirective {}`,
    expected: '@HostBinding with class.active',
    sample: `@HostBinding('class.active') isActive = false;`,
    validPatterns: [/@HostBinding\s*\(\s*['"]class\.active['"]\s*\)\s+isActive/],
    realWorldExample:
      "A Trello card directive toggles an 'active' CSS class on hover to show a blue border -- @HostBinding dynamically controls host element properties from directive state.",
    hints: [
      'There is a decorator that binds a class property to a host element property',
      'Use the "class.className" syntax to target a specific CSS class',
    ],
    tags: ['host-binding', 'directive'],
  },
  {
    id: 'fe-ng-ngclass-directive',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: '[ngClass] Directive',
    text: "Write an Angular template: a <div> with [ngClass]=\"{ 'active': isActive, 'disabled': isDisabled }\".",
    setup: 'Write the <div> element using [ngClass] with an object expression.',
    setupCode: `const template = '';`,
    expected: 'Template with [ngClass] object binding',
    sample: `<div [ngClass]="{ 'active': isActive, 'disabled': isDisabled }"></div>`,
    validPatterns: [/<div[^>]*\[ngClass\]\s*=\s*["']\{[^}]*active[^}]*isActive[^}]*\}["']/],
    editorLanguage: 'html',
    realWorldExample:
      'Gmail highlights the active folder with a bold style and background color -- [ngClass] conditionally applies CSS classes based on which mailbox is selected.',
    hints: ['Use [ngClass]="{ className: condition }" for conditional classes'],
    tags: ['ngclass', 'template', 'styling'],
  },
  {
    id: 'fe-ng-ngstyle-directive',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: '[ngStyle] Directive',
    text: "Write an Angular template: a <div> with [ngStyle]=\"{ 'color': textColor, 'font-size': fontSize }\".",
    setup: 'Write the <div> element using [ngStyle] with an object expression.',
    setupCode: `const template = '';`,
    expected: 'Template with [ngStyle] object binding',
    sample: `<div [ngStyle]="{ 'color': textColor, 'font-size': fontSize }"></div>`,
    validPatterns: [/<div[^>]*\[ngStyle\]\s*=\s*["']\{[^}]*color[^}]*textColor[^}]*\}["']/],
    editorLanguage: 'html',
    realWorldExample:
      "Figma's color picker dynamically sets the preview swatch's background color based on user selection -- [ngStyle] drives inline styles from component data.",
    hints: ['Use [ngStyle]="{ styleProp: expression }" for dynamic styles'],
    tags: ['ngstyle', 'template', 'styling'],
  },
  {
    id: 'fe-ng-class-binding',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Single Class Binding',
    text: 'Write an Angular template: a <div> with [class.highlight]="isHighlighted" for a single class toggle.',
    setup: 'Write the <div> element using single class binding.',
    setupCode: `const template = '';`,
    expected: 'Template with [class.highlight] binding',
    sample: `<div [class.highlight]="isHighlighted"></div>`,
    validPatterns: [/<div[^>]*\[class\.highlight\]\s*=\s*["']isHighlighted["'][^>]*>/],
    editorLanguage: 'html',
    realWorldExample:
      "GitHub toggles a 'selected' class on each file in a diff view when you click its checkbox -- [class.highlight] is a concise way to toggle one CSS class.",
    hints: ['Use [class.className]="condition" to toggle a single class'],
    tags: ['class-binding', 'template'],
  },
  {
    id: 'fe-ng-style-binding',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Single Style Binding',
    text: 'Write an Angular template: a <div> with [style.background-color]="bgColor" for a single style property.',
    setup: 'Write the <div> element using single style binding.',
    setupCode: `const template = '';`,
    expected: 'Template with [style.background-color] binding',
    sample: `<div [style.background-color]="bgColor"></div>`,
    validPatterns: [/<div[^>]*\[style\.background-color\]\s*=\s*["']bgColor["'][^>]*>/],
    editorLanguage: 'html',
    realWorldExample:
      "A Canva design tool sets each element's background-color from the user's palette selection -- [style.background-color] binds a single CSS property to a dynamic value.",
    hints: ['Use [style.property]="expression" to bind a single style'],
    tags: ['style-binding', 'template'],
  },
  {
    id: 'fe-ng-viewchild',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: '@ViewChild Decorator',
    text: 'Get a reference to a template element marked with #myInput so you can access it programmatically. Store it in a property called "inputRef" typed as ElementRef.',
    setup:
      'A component has an input element with a template reference variable #myInput. You need to access this element in the component class.',
    setupCode: `class MyComponent {}`,
    expected: '@ViewChild with template reference',
    sample: `@ViewChild('myInput') inputRef: ElementRef;`,
    validPatterns: [/@ViewChild\s*\(\s*['"]myInput['"]\s*\)\s+inputRef\s*:\s*ElementRef/],
    realWorldExample:
      'Notion auto-focuses the title input when you create a new page -- @ViewChild grabs a reference to that input element so the component can call .focus() on it.',
    hints: [
      'Angular provides a decorator to query a single child element from the view',
      'Pass the template reference variable name as a string to the decorator',
    ],
    tags: ['viewchild', 'dom-access'],
  },
  {
    id: 'fe-ng-viewchildren',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: '@ViewChildren Decorator',
    text: 'Query all instances of ItemComponent in the view and store them in a property called "items". The result should be a live list that updates when children are added or removed.',
    setup:
      'A parent component renders multiple ItemComponent children. You need a reference to all of them as a queryable collection.',
    setupCode: `class MyComponent {}\nclass ItemComponent {}`,
    expected: '@ViewChildren with QueryList',
    sample: `@ViewChildren(ItemComponent) items: QueryList<ItemComponent>;`,
    validPatterns: [
      /@ViewChildren\s*\(\s*ItemComponent\s*\)\s+items\s*:\s*QueryList\s*<\s*ItemComponent\s*>/,
    ],
    realWorldExample:
      'A Kanban board like Trello needs references to all card components in a column to calculate drag-drop positions -- @ViewChildren returns a live QueryList of matching children.',
    hints: [
      'There is a decorator that queries multiple child elements/components from the view',
      'The property type should be a QueryList parameterized with the component type',
    ],
    tags: ['viewchildren', 'querylist'],
  },
  {
    id: 'fe-ng-renderer2-setattr',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'hard',
    title: 'Renderer2 setAttribute',
    text: 'Using the Renderer2 API, set the "role" attribute to "button" on the directive\'s host element. Access the native element through this.el.nativeElement.',
    setup:
      'A directive has Renderer2 injected as this.renderer and ElementRef as this.el. Use the safe DOM manipulation API to set an attribute.',
    setupCode: `class MyDirective {}`,
    expected: 'Renderer2 setAttribute call',
    sample: `this.renderer.setAttribute(this.el.nativeElement, 'role', 'button');`,
    validPatterns: [
      /this\.renderer\.setAttribute\s*\(\s*this\.el\.nativeElement\s*,\s*['"]role['"]\s*,\s*['"]button['"]\s*\)/,
    ],
    realWorldExample:
      'Accessibility-critical apps like gov.uk set ARIA roles programmatically on custom widgets -- Renderer2 safely manipulates the DOM without breaking server-side rendering.',
    hints: [
      'Renderer2 provides methods like setAttribute for safe DOM manipulation',
      'The method takes the target element, attribute name, and attribute value as arguments',
    ],
    tags: ['renderer2', 'dom', 'safe-access'],
  },
  {
    id: 'fe-ng-attribute-directive',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'hard',
    title: 'Custom Attribute Directive',
    text: "Write a @Directive decorator with selector '[appHighlight]' for a custom attribute directive.",
    setup: 'Write the full @Directive({...}) decorator.',
    setupCode: `class HighlightDirective {}`,
    expected: '@Directive with [appHighlight] selector',
    sample: `@Directive({
  selector: '[appHighlight]'
})`,
    validPatterns: [/@Directive\s*\(\s*\{[^}]*selector\s*:\s*['"]\[appHighlight\]['"]/],
    realWorldExample:
      'Medium highlights text when you select it for quoting -- a custom [appHighlight] directive can apply visual effects to any element it decorates.',
    hints: ['Attribute directive selectors use [bracketSyntax]'],
    tags: ['directive', 'attribute-directive', 'decorator'],
  },
  {
    id: 'fe-ng-mouseover-event',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Mouse Event Binding',
    text: 'Write an Angular template: a <div> with (mouseenter)="onHover()" and (mouseleave)="onLeave()" event bindings.',
    setup: 'Write the <div> element with both mouse event bindings.',
    setupCode: `const template = '';`,
    expected: 'Template with mouseenter and mouseleave bindings',
    sample: `<div (mouseenter)="onHover()" (mouseleave)="onLeave()"></div>`,
    validPatterns: [
      /<div[^>]*\(mouseenter\)\s*=\s*["']onHover\(\)["'][^>]*\(mouseleave\)\s*=\s*["']onLeave\(\)["']/,
      /<div[^>]*\(mouseleave\)\s*=\s*["']onLeave\(\)["'][^>]*\(mouseenter\)\s*=\s*["']onHover\(\)["']/,
    ],
    editorLanguage: 'html',
    realWorldExample:
      'Amazon product cards show a quick-view overlay on hover and hide it when you move away -- (mouseenter) and (mouseleave) handle these hover interactions.',
    hints: ['Use (mouseenter) and (mouseleave) for hover events'],
    tags: ['events', 'mouse', 'template'],
  },
  {
    id: 'fe-ng-contentchild',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'medium',
    title: '@ContentChild Decorator',
    text: 'Access a projected content element marked with #header. Store it in a property called "headerContent" typed as TemplateRef<any>.',
    setup:
      'A component uses ng-content and the parent projects a template tagged with #header. You need to access this projected content in the component class.',
    setupCode: `class MyComponent {}`,
    expected: '@ContentChild with TemplateRef',
    sample: `@ContentChild('header') headerContent: TemplateRef<any>;`,
    validPatterns: [/@ContentChild\s*\(\s*['"]header['"]\s*\)\s+headerContent\s*:\s*TemplateRef/],
    realWorldExample:
      "A reusable modal component in an Angular Material-style library accesses the projected header template via @ContentChild to position it in the modal's title bar.",
    hints: [
      'There is a decorator for querying a single projected content element',
      'It works like the view query decorator but targets content projected via ng-content',
    ],
    tags: ['contentchild', 'content-projection'],
  },
  {
    id: 'fe-ng-structural-directive',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'hard',
    title: 'Custom Structural Directive',
    text: "Write a @Directive decorator with selector '[appUnless]' and a constructor that injects TemplateRef<any> and ViewContainerRef.",
    setup: 'Write the decorator and constructor with injected dependencies.',
    setupCode: `class UnlessDirective {}`,
    expected: 'Structural directive with TemplateRef and ViewContainerRef',
    sample: `@Directive({ selector: '[appUnless]' })
class UnlessDirective {
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) {}
}`,
    validPatterns: [
      /@Directive\s*\(\s*\{[^}]*selector\s*:\s*['"]\[appUnless\]['"]/,
      /constructor\s*\([^)]*TemplateRef[^)]*ViewContainerRef[^)]*\)/,
    ],
    realWorldExample:
      'A feature-flag system like LaunchDarkly might use an *appUnless directive to hide beta features for non-enrolled users -- custom structural directives control whether DOM elements exist.',
    hints: ['Structural directives need TemplateRef and ViewContainerRef injected'],
    tags: ['structural-directive', 'directive', 'advanced'],
  },

  // ═══════════════════════════════════════════════════════════════
  // State & Lifecycle (17 new problems)
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'fe-ng-ngonchanges',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'ngOnChanges Lifecycle',
    text: 'Write an ngOnChanges(changes: SimpleChanges) method that logs changes.name.currentValue when changes.name exists.',
    setup: 'Write the full ngOnChanges method implementation.',
    setupCode: `class MyComponent {}`,
    expected: 'ngOnChanges with SimpleChanges parameter',
    sample: `ngOnChanges(changes: SimpleChanges) {
  if (changes.name) {
    console.log(changes.name.currentValue);
  }
}`,
    validPatterns: [
      /ngOnChanges\s*\(\s*changes\s*:\s*SimpleChanges\s*\)\s*\{/,
      /changes\.\w+\.currentValue/,
    ],
    realWorldExample:
      'When you switch profiles on Netflix, the ProfileHeader component detects the name @Input changed and re-fetches the avatar -- ngOnChanges reacts to every input property update.',
    hints: ['SimpleChanges provides currentValue and previousValue for each changed input'],
    tags: ['lifecycle', 'ngonchanges', 'simplechanges'],
  },
  {
    id: 'fe-ng-ngdocheck',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'ngDoCheck Lifecycle',
    text: 'Write an ngDoCheck() method that uses a KeyValueDiffers check: log "Object changed" if this.differ.diff(this.data) is truthy.',
    setup: 'Write the full ngDoCheck method.',
    setupCode: `class MyComponent {}`,
    expected: 'ngDoCheck with differ check',
    sample: `ngDoCheck() {
  const changes = this.differ.diff(this.data);
  if (changes) {
    console.log('Object changed');
  }
}`,
    validPatterns: [/ngDoCheck\s*\(\s*\)\s*\{/, /differ\.diff\s*\(/],
    realWorldExample:
      "A Google Sheets cell editor must detect deep mutations in a cell's formatting object that Angular's default check misses -- ngDoCheck with KeyValueDiffers catches those subtle changes.",
    hints: ['ngDoCheck runs on every change detection cycle; use Differs for deep comparison'],
    tags: ['lifecycle', 'ngdocheck', 'change-detection'],
  },
  {
    id: 'fe-ng-afterviewinit',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'ngAfterViewInit Lifecycle',
    text: "Implement the lifecycle hook that fires after the component's view is fully initialized. Inside it, programmatically focus an input element referenced by this.inputRef.",
    setup:
      'A component has a ViewChild reference called inputRef pointing to an input element. You need to focus it once the view DOM is ready.',
    setupCode: `class MyComponent {}`,
    expected: 'ngAfterViewInit with nativeElement access',
    sample: `ngAfterViewInit() {
  this.inputRef.nativeElement.focus();
}`,
    validPatterns: [/ngAfterViewInit\s*\(\s*\)\s*\{/, /nativeElement\.focus\s*\(\s*\)/],
    realWorldExample:
      'When Notion opens a new page, the title input auto-focuses after the view renders -- ngAfterViewInit is the safe place to interact with DOM elements via ViewChild references.',
    hints: [
      'Angular has a lifecycle hook that signals the view DOM is ready for interaction',
      'Access the underlying DOM element through the nativeElement property of ElementRef',
    ],
    tags: ['lifecycle', 'afterviewinit', 'dom-access'],
  },
  {
    id: 'fe-ng-aftercontentinit',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'ngAfterContentInit Lifecycle',
    text: 'Write an ngAfterContentInit() method that logs this.contentChild.length to check projected content.',
    setup: 'Write the full ngAfterContentInit method.',
    setupCode: `class MyComponent {}`,
    expected: 'ngAfterContentInit accessing projected content',
    sample: `ngAfterContentInit() {
  console.log(this.contentChild.length);
}`,
    validPatterns: [/ngAfterContentInit\s*\(\s*\)\s*\{/, /this\.contentChild/],
    realWorldExample:
      'An Angular Material tab group counts how many tab panels were projected into it so it can build the tab header bar -- ngAfterContentInit fires once projected content is ready.',
    hints: ['ngAfterContentInit fires after projected content (ng-content) is initialized'],
    tags: ['lifecycle', 'aftercontentinit', 'content-projection'],
  },
  {
    id: 'fe-ng-ondestroy',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'ngOnDestroy Cleanup',
    text: 'Implement the lifecycle hook that fires when a component is about to be removed from the DOM. Clean up this.subscription to prevent memory leaks.',
    setup:
      'A component subscribes to an Observable and stores the subscription as this.subscription. Write the cleanup method that runs on component destruction.',
    setupCode: `class MyComponent {}`,
    expected: 'ngOnDestroy with unsubscribe cleanup',
    sample: `ngOnDestroy() {
  this.subscription.unsubscribe();
}`,
    validPatterns: [/ngOnDestroy\s*\(\s*\)\s*\{/, /\.unsubscribe\s*\(\s*\)/],
    realWorldExample:
      'When you navigate away from a Slack channel, the component unsubscribes from the real-time message stream to prevent memory leaks -- ngOnDestroy is the cleanup hook.',
    hints: [
      'Angular has a lifecycle hook for cleanup before a component is destroyed',
      'Call the method on the subscription object that stops it from receiving further values',
    ],
    tags: ['lifecycle', 'ondestroy', 'cleanup'],
  },
  {
    id: 'fe-ng-afterviewchecked',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'ngAfterViewChecked Lifecycle',
    text: 'Write an ngAfterViewChecked() method that compares this.prevHeight to this.container.nativeElement.scrollHeight and updates this.prevHeight.',
    setup: 'Write the full ngAfterViewChecked method.',
    setupCode: `class MyComponent {}`,
    expected: 'ngAfterViewChecked comparing DOM measurements',
    sample: `ngAfterViewChecked() {
  const newHeight = this.container.nativeElement.scrollHeight;
  if (newHeight !== this.prevHeight) {
    this.prevHeight = newHeight;
  }
}`,
    validPatterns: [/ngAfterViewChecked\s*\(\s*\)\s*\{/, /nativeElement\.scrollHeight/],
    realWorldExample:
      "A Discord-like chat auto-scrolls to the bottom when new messages arrive by checking if the container's scrollHeight changed -- ngAfterViewChecked detects post-render DOM changes.",
    hints: [
      'ngAfterViewChecked runs after every check of the view — avoid changing bound properties here',
    ],
    tags: ['lifecycle', 'afterviewchecked'],
  },
  {
    id: 'fe-ng-input-setter',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: '@Input with Setter',
    text: 'Write an @Input() set name(value: string) setter that trims the value and stores it in _name.',
    setup: 'Write the full @Input() setter.',
    setupCode: `class MyComponent { private _name = ''; }`,
    expected: '@Input setter with transformation',
    sample: `@Input()
set name(value: string) {
  this._name = value.trim();
}`,
    validPatterns: [
      /@Input\s*\(\s*\)\s*\n?\s*set\s+name\s*\(\s*value\s*:\s*string\s*\)/,
      /this\._name\s*=\s*value\.trim\(\)/,
    ],
    realWorldExample:
      'A username display component trims whitespace from the input before rendering it -- @Input with a setter lets you sanitize or transform incoming data on arrival.',
    hints: ['Use a setter on @Input to intercept and transform incoming values'],
    tags: ['input', 'setter', 'state'],
  },
  {
    id: 'fe-ng-signal-basic',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'Signal Basics',
    text: 'Create a reactive signal called "count" with an initial value of 0, then directly replace its value with 5.',
    setup:
      'You need a reactive primitive (Angular 16+) to hold a numeric counter. Create it and then overwrite its value.',
    setupCode: `const signal = (val: any) => ({ set: (v: any) => v, update: (fn: any) => fn(val) });`,
    expected: 'Signal creation and set',
    sample: `const count = signal(0);
count.set(5);`,
    validPatterns: [/const\s+count\s*=\s*signal\s*\(\s*0\s*\)/, /count\.set\s*\(\s*5\s*\)/],
    realWorldExample:
      'A shopping cart badge on Amazon updates its item count reactively -- Angular Signals provide fine-grained reactivity without RxJS for simple UI state like counters.',
    hints: [
      'Angular 16+ introduced a reactive primitive that wraps values',
      'To replace the value entirely, use the setter method on the signal',
    ],
    tags: ['signals', 'state', 'angular16'],
  },
  {
    id: 'fe-ng-computed-signal',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'Computed Signal',
    text: 'Create a derived signal called "doubleCount" that automatically returns twice the value of the "count" signal whenever count changes.',
    setup:
      'You have a signal called count. Create a read-only derived signal that always reflects double the current count value.',
    setupCode: `const signal = (val: any) => { const s = () => val; s.set = (v: any) => { val = v; }; return s; };\nconst computed = (fn: any) => fn;\nconst count = signal(5);`,
    expected: 'Computed signal deriving from another signal',
    sample: `const doubleCount = computed(() => count() * 2);`,
    validPatterns: [
      /const\s+doubleCount\s*=\s*computed\s*\(\s*\(\s*\)\s*=>\s*count\s*\(\s*\)\s*\*\s*2\s*\)/,
    ],
    realWorldExample:
      'An e-commerce checkout automatically recalculates the total price whenever item quantities change -- computed signals derive values that stay in sync with their sources.',
    hints: [
      'Angular 16+ has a function for creating derived read-only signals',
      "Read a signal's value by calling it as a function inside the derivation callback",
    ],
    tags: ['signals', 'computed', 'angular16'],
  },
  {
    id: 'fe-ng-effect-signal',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: 'Signal Effect',
    text: 'Set up a reactive side effect that logs "Count:" followed by the current count value every time the count signal changes.',
    setup:
      'You have a signal called count. Register a side effect that runs automatically whenever any signal it reads changes.',
    setupCode: `const signal = (val: any) => { const s = () => val; s.set = (v: any) => { val = v; }; return s; };\nconst effect = (fn: any) => fn;\nconst count = signal(0);`,
    expected: 'Effect reacting to signal changes',
    sample: `effect(() => console.log("Count:", count()));`,
    validPatterns: [/effect\s*\(\s*\(\s*\)\s*=>\s*console\.log\s*\([^)]*count\s*\(\s*\)/],
    realWorldExample:
      'Google Analytics tracks page views by running a side effect whenever the current route signal changes -- effect() automatically re-runs when any signal it reads updates.',
    hints: [
      'Angular 16+ provides a function for registering reactive side effects',
      'Inside the callback, reading a signal creates a dependency that triggers re-execution',
    ],
    tags: ['signals', 'effect', 'angular16'],
  },
  {
    id: 'fe-ng-signal-update',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'Signal Update',
    text: 'Increment the "count" signal by 1 using a method that derives the new value from the current value.',
    setup:
      'You have a signal called count. Instead of reading and then setting, use the method that lets you transform the current value with a function.',
    setupCode: `const signal = (val: any) => { const s = () => val; s.set = (v: any) => { val = v; }; s.update = (fn: any) => { val = fn(val); }; return s; };\nconst count = signal(10);`,
    expected: 'Signal update with function',
    sample: `count.update(v => v + 1);`,
    validPatterns: [/count\.update\s*\(\s*v\s*=>\s*v\s*\+\s*1\s*\)/],
    realWorldExample:
      "A 'Like' button on Instagram increments a counter based on the current value -- signal.update() derives the new state from the old without a separate read step.",
    hints: [
      'Signals have a method that takes a callback receiving the current value',
      'The callback should return the new value',
    ],
    tags: ['signals', 'update', 'angular16'],
  },
  {
    id: 'fe-ng-onpush-strategy',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    title: 'OnPush Change Detection',
    text: 'Write a @Component decorator with changeDetection: ChangeDetectionStrategy.OnPush and selector "app-list".',
    setup: 'Write the full @Component decorator with OnPush strategy.',
    setupCode: `class ListComponent {}`,
    expected: '@Component with OnPush change detection',
    sample: `@Component({
  selector: 'app-list',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})`,
    validPatterns: [
      /@Component\s*\(\s*\{[^}]*changeDetection\s*:\s*ChangeDetectionStrategy\.OnPush/,
    ],
    realWorldExample:
      'A Twitter/X timeline with thousands of tweet components uses OnPush so Angular only re-renders a tweet when its data reference actually changes, avoiding unnecessary DOM updates.',
    hints: ['OnPush only runs change detection when @Input references change or events fire'],
    tags: ['change-detection', 'onpush', 'performance'],
  },
  {
    id: 'fe-ng-markforcheck',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    title: 'ChangeDetectorRef markForCheck',
    text: 'Write a method called "refresh" that tells Angular to re-check this OnPush component on the next change detection cycle. The ChangeDetectorRef is available as this.cdr.',
    setup:
      'An OnPush component updated its state from a non-Angular event (e.g., WebSocket). The view is stale. Mark the component so Angular includes it in the next check.',
    setupCode: `class MyComponent {}`,
    expected: 'markForCheck for manual change detection',
    sample: `refresh() {
  this.cdr.markForCheck();
}`,
    validPatterns: [/this\.cdr\.markForCheck\s*\(\s*\)/],
    realWorldExample:
      "A Slack-like chat receives WebSocket messages outside Angular's zone -- markForCheck() tells Angular the OnPush component has new data to display on the next cycle.",
    hints: [
      'ChangeDetectorRef has a method that marks a component for checking on the next cycle',
      'This is different from immediately running change detection',
    ],
    tags: ['change-detection', 'markforcheck', 'cdr'],
  },
  {
    id: 'fe-ng-detectchanges',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    title: 'ChangeDetectorRef detectChanges',
    text: 'Write a method called "forceUpdate" that immediately and synchronously runs change detection on this component and its children. The ChangeDetectorRef is available as this.cdr.',
    setup:
      'You need to force an immediate view update rather than waiting for the next change detection cycle. Use the synchronous method on ChangeDetectorRef.',
    setupCode: `class MyComponent {}`,
    expected: 'detectChanges for immediate change detection',
    sample: `forceUpdate() {
  this.cdr.detectChanges();
}`,
    validPatterns: [/this\.cdr\.detectChanges\s*\(\s*\)/],
    realWorldExample:
      'A real-time stock ticker must update prices immediately when data arrives, not on the next cycle -- detectChanges() forces a synchronous re-render of the component subtree.',
    hints: [
      'ChangeDetectorRef has a method that synchronously triggers change detection',
      'Unlike marking for check, this runs immediately on the component subtree',
    ],
    tags: ['change-detection', 'detectchanges', 'cdr'],
  },
  {
    id: 'fe-ng-takeuntil-destroy',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    title: 'takeUntil Pattern for Unsubscribe',
    text: 'Declare a private destroy$ = new Subject<void>(); then in ngOnDestroy, call this.destroy$.next() and this.destroy$.complete().',
    setup: 'Write the property declaration and ngOnDestroy method.',
    setupCode: `class MyComponent {}`,
    expected: 'takeUntil destroy pattern',
    sample: `private destroy$ = new Subject<void>();

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}`,
    validPatterns: [
      /destroy\$\s*=\s*new\s+Subject<void>\s*\(\s*\)/,
      /this\.destroy\$\.next\s*\(\s*\)/,
      /this\.destroy\$\.complete\s*\(\s*\)/,
    ],
    realWorldExample:
      'A dashboard with 10+ real-time data subscriptions uses destroy$ to clean up all of them at once when the user navigates away -- this pattern prevents memory leaks at scale.',
    hints: ['The takeUntil(destroy$) pattern auto-unsubscribes all observables on destroy'],
    tags: ['rxjs', 'takeuntil', 'lifecycle', 'cleanup'],
  },
  {
    id: 'fe-ng-input-transform',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    title: '@Input with Transform (v16+)',
    text: 'Write an @Input({ transform: booleanAttribute }) decorator for property disabled: boolean.',
    setup: 'Write the full @Input decorator with transform option.',
    setupCode: `class MyComponent {}`,
    expected: '@Input with booleanAttribute transform',
    sample: `@Input({ transform: booleanAttribute }) disabled: boolean = false;`,
    validPatterns: [/@Input\s*\(\s*\{[^}]*transform\s*:\s*booleanAttribute[^}]*\}\s*\)\s+disabled/],
    realWorldExample:
      "An Angular Material button accepts a 'disabled' string attribute from HTML and coerces it to a boolean -- @Input({ transform: booleanAttribute }) automates that conversion.",
    hints: ['Angular 16+ allows transform functions on @Input to coerce values'],
    tags: ['input', 'transform', 'angular16'],
  },
  {
    id: 'fe-ng-input-required',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    title: 'Required @Input (v16+)',
    text: 'Write an @Input({ required: true }) decorator for property title: string.',
    setup: 'Write the full required @Input decorator.',
    setupCode: `class MyComponent {}`,
    expected: '@Input with required option',
    sample: `@Input({ required: true }) title!: string;`,
    validPatterns: [/@Input\s*\(\s*\{[^}]*required\s*:\s*true[^}]*\}\s*\)\s+title/],
    realWorldExample:
      'A reusable PageHeader component must always receive a title -- @Input({ required: true }) gives you a compile-time error if the parent forgets to pass it.',
    hints: ['Angular 16+ @Input({ required: true }) makes inputs mandatory'],
    tags: ['input', 'required', 'angular16'],
  },

  // ═══════════════════════════════════════════════════════════════
  // Common Patterns (17 new problems)
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'fe-ng-use-factory',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'hard',
    title: 'useFactory Provider',
    text: 'Configure a provider for the API_URL token that computes its value at runtime by reading environment.apiUrl. Use the provider strategy that runs a factory function.',
    setup:
      'The API URL depends on the environment (dev vs prod). Write a provider that dynamically resolves the value using a factory function.',
    setupCode: `class MyModule {}`,
    expected: 'Provider with useFactory',
    sample: `{ provide: API_URL, useFactory: () => environment.apiUrl }`,
    validPatterns: [/provide\s*:\s*API_URL[^}]*useFactory\s*:\s*\(\s*\)\s*=>/],
    realWorldExample:
      'An enterprise app points to different API servers in dev vs production -- useFactory dynamically resolves the API URL at runtime based on the current environment config.',
    hints: [
      'Provider objects can specify a function that runs at injection time to produce the value',
      'The factory function is an arrow function that returns the resolved value',
    ],
    tags: ['di', 'provider', 'usefactory'],
  },
  {
    id: 'fe-ng-use-value',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'easy',
    title: 'useValue Provider',
    text: 'Configure a provider that maps the BASE_URL token to the static string "https://api.example.com". Use the provider strategy for supplying a constant value.',
    setup:
      'You need to register a provider in an Angular module that gives a fixed URL string whenever BASE_URL is injected.',
    setupCode: `class MyModule {}`,
    expected: 'Provider with useValue',
    sample: `{ provide: BASE_URL, useValue: 'https://api.example.com' }`,
    validPatterns: [
      /provide\s*:\s*BASE_URL[^}]*useValue\s*:\s*['"]https:\/\/api\.example\.com['"]/,
    ],
    realWorldExample:
      'A simple app hardcodes its API base URL as a constant string injected everywhere -- useValue provides a fixed value without needing a factory function or class.',
    hints: [
      'Provider objects specify a token and a strategy for resolving the dependency',
      'For a static/constant value, use the property that directly supplies the value',
    ],
    tags: ['di', 'provider', 'usevalue'],
  },
  {
    id: 'fe-ng-injection-token',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'InjectionToken',
    text: 'Define a unique dependency injection token called "API_URL" that will hold a string value. This token will be used to provide a non-class dependency.',
    setup:
      'You need a way to inject a plain string (an API URL) into Angular services and components. Create a typed token for it.',
    setupCode: `const InjectionToken = class { constructor(desc: string) {} };`,
    expected: 'InjectionToken declaration',
    sample: `const API_URL = new InjectionToken<string>('API_URL');`,
    validPatterns: [
      /const\s+API_URL\s*=\s*new\s+InjectionToken\s*<\s*string\s*>\s*\(\s*['"]API_URL['"]\s*\)/,
    ],
    realWorldExample:
      "You cannot inject a plain string like an API URL by class type -- InjectionToken creates a unique, typed token so Angular's DI knows how to resolve non-class dependencies.",
    hints: [
      'Angular provides a class for creating tokens that represent non-class values',
      'The constructor takes a description string, and the class accepts a type parameter',
    ],
    tags: ['di', 'injection-token'],
  },
  {
    id: 'fe-ng-content-projection',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'easy',
    title: 'ng-content Projection',
    text: 'Write an Angular template with a <div class="card"> containing <ng-content></ng-content> for content projection.',
    setup: 'Write the template with ng-content.',
    setupCode: `const template = '';`,
    expected: 'Template with ng-content',
    sample: `<div class="card">
  <ng-content></ng-content>
</div>`,
    validPatterns: [/<ng-content\s*><\/ng-content>/, /<div[^>]*class\s*=\s*["']card["']/],
    editorLanguage: 'html',
    realWorldExample:
      'A reusable Card component in Angular Material accepts any content the parent passes between its tags -- ng-content is the slot mechanism that makes wrapper components flexible.',
    hints: ['ng-content acts like a slot where parent component can project content'],
    tags: ['content-projection', 'ng-content', 'template'],
  },
  {
    id: 'fe-ng-multi-slot-projection',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Multi-Slot Content Projection',
    text: 'Write a template with two ng-content: <ng-content select="[header]"></ng-content> and <ng-content select="[body]"></ng-content>.',
    setup: 'Write the template with named content slots.',
    setupCode: `const template = '';`,
    expected: 'Template with named ng-content slots',
    sample: `<ng-content select="[header]"></ng-content>
<ng-content select="[body]"></ng-content>`,
    validPatterns: [
      /<ng-content[^>]*select\s*=\s*["']\[header\]/,
      /<ng-content[^>]*select\s*=\s*["']\[body\]/,
    ],
    editorLanguage: 'html',
    realWorldExample:
      "A dialog component like Angular Material's mat-dialog-content has separate slots for the header, body, and footer -- multi-slot projection routes each piece to its correct location.",
    hints: ['Use select attribute on ng-content to create named slots'],
    tags: ['content-projection', 'multi-slot', 'template'],
  },
  {
    id: 'fe-ng-ng-container',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'easy',
    title: 'ng-container Grouping',
    text: 'Write an Angular template: <ng-container *ngIf="isLoggedIn"> wrapping a <p>Welcome</p> — no extra DOM element.',
    setup: 'Write the ng-container with *ngIf.',
    setupCode: `const template = '';`,
    expected: 'ng-container with *ngIf (no extra DOM)',
    sample: `<ng-container *ngIf="isLoggedIn">
  <p>Welcome</p>
</ng-container>`,
    validPatterns: [/<ng-container[^>]*\*ngIf\s*=\s*["']isLoggedIn["'][^>]*>/],
    editorLanguage: 'html',
    realWorldExample:
      'A navigation bar conditionally shows login/logout links without adding a wrapper div that breaks flexbox layout -- ng-container applies structural directives without extra DOM nodes.',
    hints: ['ng-container is a grouping element that does not render to the DOM'],
    tags: ['ng-container', 'structural', 'template'],
  },
  {
    id: 'fe-ng-ng-template',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'ng-template with else',
    text: 'Write a template: <p *ngIf="hasData; else noData">Data loaded</p> followed by <ng-template #noData><p>No data</p></ng-template>.',
    setup: 'Write the *ngIf with else referencing ng-template.',
    setupCode: `const template = '';`,
    expected: '*ngIf with else ng-template',
    sample: `<p *ngIf="hasData; else noData">Data loaded</p>
<ng-template #noData><p>No data</p></ng-template>`,
    validPatterns: [/\*ngIf\s*=\s*["']hasData\s*;\s*else\s+noData["']/, /<ng-template\s+#noData>/],
    editorLanguage: 'html',
    realWorldExample:
      'A dashboard shows a spinner while loading and switches to the data view once ready -- *ngIf with else provides clean conditional rendering with a fallback template.',
    hints: ['Use *ngIf="condition; else templateRef" with <ng-template #ref>'],
    tags: ['ngif', 'else', 'ng-template'],
  },
  {
    id: 'fe-ng-async-pipe',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'easy',
    title: 'Async Pipe',
    text: 'Display the value of an Observable called "data$" directly in the template, inside a paragraph element. Use the pipe that automatically handles subscribing and unsubscribing.',
    setup:
      'You have an Observable called data$ and want to display its emitted value in the template without manually subscribing in the component class.',
    setupCode: `const template = '';`,
    expected: 'Template with async pipe',
    sample: `<p>{{ data$ | async }}</p>`,
    validPatterns: [/\{\{\s*data\$\s*\|\s*async\s*\}\}/],
    editorLanguage: 'html',
    realWorldExample:
      'A GitHub-style notification bell shows the unread count from an Observable stream -- the async pipe subscribes in the template and auto-unsubscribes on destroy, preventing memory leaks.',
    hints: [
      'Angular has a built-in pipe that unwraps Observables and Promises in templates',
      'It manages the subscription lifecycle automatically',
    ],
    tags: ['async-pipe', 'rxjs', 'template'],
  },
  {
    id: 'fe-ng-custom-pipe',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Custom Pipe',
    text: "Write a @Pipe({ name: 'truncate' }) decorator followed by class TruncatePipe implements PipeTransform.",
    setup: 'Write the decorator and class declaration.',
    setupCode: `class TruncatePipe {}`,
    expected: '@Pipe decorator with PipeTransform',
    sample: `@Pipe({ name: 'truncate' })
class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number): string {
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}`,
    validPatterns: [
      /@Pipe\s*\(\s*\{[^}]*name\s*:\s*['"]truncate['"]/,
      /implements\s+PipeTransform/,
    ],
    realWorldExample:
      "Twitter/X truncates long tweet previews with an ellipsis -- a custom 'truncate' pipe encapsulates that logic so any template can use {{ text | truncate:140 }}.",
    hints: ['Custom pipes need @Pipe({ name }) and must implement PipeTransform.transform()'],
    tags: ['pipe', 'custom-pipe', 'transform'],
  },
  {
    id: 'fe-ng-pure-pipe',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'Impure Pipe',
    text: 'Create a pipe decorator for a filter pipe named "filter" that re-evaluates on every change detection cycle, not just when its input reference changes.',
    setup:
      'You need a pipe that runs its transform on every change detection cycle because it depends on mutable data. Configure the decorator accordingly.',
    setupCode: `class FilterPipe {}`,
    expected: '@Pipe with pure: false',
    sample: `@Pipe({ name: 'filter', pure: false })`,
    validPatterns: [/@Pipe\s*\(\s*\{[^}]*name\s*:\s*['"]filter['"][^}]*pure\s*:\s*false/],
    realWorldExample:
      'A live search filter pipe must re-evaluate when the array is mutated in place (e.g., items pushed) -- pure: false forces re-execution on every change detection cycle.',
    hints: [
      'By default, Angular pipes only re-run when the input reference changes',
      'There is a decorator property that controls whether the pipe runs on every cycle',
    ],
    tags: ['pipe', 'impure-pipe', 'performance'],
  },
  {
    id: 'fe-ng-ngswitch',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'ngSwitch Directive',
    text: 'Write an Angular template: a <div [ngSwitch]="status"> containing <p *ngSwitchCase="\'active\'">Active</p> and <p *ngSwitchDefault>Unknown</p>.',
    setup: 'Write the template with ngSwitch.',
    setupCode: `const template = '';`,
    expected: 'Template with [ngSwitch] and *ngSwitchCase',
    sample: `<div [ngSwitch]="status">
  <p *ngSwitchCase="'active'">Active</p>
  <p *ngSwitchDefault>Unknown</p>
</div>`,
    validPatterns: [
      /<div[^>]*\[ngSwitch\]\s*=\s*["']status["']/,
      /\*ngSwitchCase\s*=\s*["']'active'["']/,
      /\*ngSwitchDefault/,
    ],
    editorLanguage: 'html',
    realWorldExample:
      "An order tracking page displays different icons and text for 'pending', 'shipped', and 'delivered' statuses -- ngSwitch cleanly handles multiple discrete states.",
    hints: ['Use [ngSwitch], *ngSwitchCase, and *ngSwitchDefault together'],
    tags: ['ngswitch', 'conditional', 'template'],
  },
  {
    id: 'fe-ng-lazy-loading',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'hard',
    title: 'Lazy Loading Route',
    text: 'Configure a route for the "admin" path that lazy-loads the AdminModule from "./admin/admin.module" only when the user navigates to it, enabling code splitting.',
    setup:
      'You want the admin section to load on demand instead of at app startup. Write the route configuration that uses dynamic imports.',
    setupCode: `const routes = [];`,
    expected: 'Route with lazy-loaded module',
    sample: `{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }`,
    validPatterns: [
      /path\s*:\s*['"]admin['"]/,
      /loadChildren\s*:\s*\(\s*\)\s*=>\s*import\s*\(/,
      /\.then\s*\(\s*m\s*=>\s*m\.AdminModule\s*\)/,
    ],
    realWorldExample:
      'GitHub only loads the Settings module when you actually visit /settings -- lazy loading with loadChildren keeps the initial bundle small and speeds up the first page load.',
    hints: [
      'Route objects have a property for lazy-loading that takes a function returning a dynamic import',
      'Chain a .then() to extract the specific module from the import result',
    ],
    tags: ['routing', 'lazy-loading', 'module'],
  },
  {
    id: 'fe-ng-route-guard',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'hard',
    title: 'Functional Route Guard',
    text: 'Create a functional route guard called "authGuard" that prevents navigation to a route unless the user is logged in. Use inject() to get AuthService and call its isLoggedIn() method.',
    setup:
      'You need a route guard that checks authentication before allowing access. Use the modern functional guard syntax (Angular 14+) instead of a class-based guard.',
    setupCode: `class AuthService { isLoggedIn() { return true; } }`,
    expected: 'Functional canActivate guard',
    sample: `const authGuard: CanActivateFn = () => inject(AuthService).isLoggedIn();`,
    validPatterns: [/const\s+authGuard\s*:\s*CanActivateFn\s*=/, /inject\s*\(\s*AuthService\s*\)/],
    realWorldExample:
      'Visiting /dashboard on a banking app redirects unauthenticated users to /login -- a route guard checks your auth status before allowing navigation to protected pages.',
    hints: [
      'Functional guards are arrow functions typed with the appropriate Fn type',
      'Use the inject() function inside the guard to access services',
    ],
    tags: ['routing', 'guard', 'canactivate'],
  },
  {
    id: 'fe-ng-route-resolver',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'hard',
    title: 'Functional Route Resolver',
    text: 'Create a functional route resolver called "userResolver" that pre-fetches a User before navigation. It should extract the "id" from route params and call UserService.getUser() with it.',
    setup:
      'You want to load user data before a route activates. Write a functional resolver (Angular 14+) that reads the route parameter and fetches the user.',
    setupCode: `class UserService { getUser(id: string) { return {}; } }`,
    expected: 'Functional route resolver',
    sample: `const userResolver: ResolveFn<User> = (route) => inject(UserService).getUser(route.paramMap.get('id')!);`,
    validPatterns: [
      /const\s+userResolver\s*:\s*ResolveFn/,
      /inject\s*\(\s*UserService\s*\)\.getUser/,
    ],
    realWorldExample:
      'A GitHub profile page pre-fetches user data before rendering /user/:id -- a route resolver ensures the component receives data immediately, avoiding a loading flash.',
    hints: [
      'Functional resolvers are typed with ResolveFn<T> and receive the route as a parameter',
      'Use inject() to access services and route.paramMap to read URL parameters',
    ],
    tags: ['routing', 'resolver', 'data-fetching'],
  },
  {
    id: 'fe-ng-date-pipe',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'easy',
    title: 'Date Pipe',
    text: 'Display the "birthday" variable as a fully written-out date (e.g., "Friday, June 15, 2024") using an Angular built-in pipe with the "fullDate" format.',
    setup:
      'You have a Date value called "birthday" and want to display it in a human-readable full format inside a paragraph element.',
    setupCode: `const template = '';`,
    expected: 'Template with date pipe',
    sample: `<p>{{ birthday | date:'fullDate' }}</p>`,
    validPatterns: [/\{\{\s*birthday\s*\|\s*date\s*:\s*['"]fullDate['"]\s*\}\}/],
    editorLanguage: 'html',
    realWorldExample:
      "Facebook displays 'Friday, June 15, 2024' on event pages -- the date pipe formats raw Date objects into human-readable strings with locale support.",
    hints: [
      'Angular has a built-in pipe for formatting dates',
      'Pass the format string as an argument after the pipe name using a colon',
    ],
    tags: ['pipe', 'date', 'template'],
  },
  {
    id: 'fe-ng-currency-pipe',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'easy',
    title: 'Currency Pipe',
    text: 'Display the "price" variable formatted as US dollars (e.g., "$9.99") inside a span element using an Angular built-in pipe with the "USD" currency code.',
    setup:
      'You have a numeric price value that needs to be displayed with the US dollar symbol and proper formatting.',
    setupCode: `const template = '';`,
    expected: 'Template with currency pipe',
    sample: `<span>{{ price | currency:'USD' }}</span>`,
    validPatterns: [/\{\{\s*price\s*\|\s*currency\s*:\s*['"]USD['"]\s*\}\}/],
    editorLanguage: 'html',
    realWorldExample:
      "Amazon displays product prices as '$29.99' with proper currency formatting -- the currency pipe handles symbol placement, decimal formatting, and locale differences.",
    hints: [
      'Angular has a built-in pipe for formatting numbers as currency',
      'Pass the ISO currency code as an argument after the pipe name',
    ],
    tags: ['pipe', 'currency', 'template'],
  },
  {
    id: 'fe-ng-use-class',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'medium',
    title: 'useClass Provider',
    text: 'Configure a provider that substitutes ConsoleLoggerService whenever LoggerService is requested. Use the provider strategy for swapping an implementation class.',
    setup:
      'You want to replace the default LoggerService with ConsoleLoggerService throughout the app. Write the provider object.',
    setupCode: `class LoggerService {}\nclass ConsoleLoggerService {}`,
    expected: 'Provider with useClass',
    sample: `{ provide: LoggerService, useClass: ConsoleLoggerService }`,
    validPatterns: [/provide\s*:\s*LoggerService[^}]*useClass\s*:\s*ConsoleLoggerService/],
    realWorldExample:
      'In testing, you swap the real PaymentService with a MockPaymentService -- useClass lets you substitute any implementation class behind the same injection token.',
    hints: [
      'Provider objects specify a token and a resolution strategy',
      'For replacing one class with another, use the strategy that maps a token to an alternative class',
    ],
    tags: ['di', 'provider', 'useclass'],
  },

  // ═══════════════════════════════════════════════════════════════
  // Rendering (17 new problems)
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'fe-ng-ngfor-index',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'easy',
    title: '*ngFor with Index',
    text: 'Write an Angular template: a <li> with *ngFor="let item of items; let i = index" that displays "{{ i }}: {{ item }}".',
    setup: 'Write the <li> element with *ngFor and index.',
    setupCode: `const items = ['a', 'b', 'c'];`,
    expected: '*ngFor with index variable',
    sample: `<li *ngFor="let item of items; let i = index">{{ i }}: {{ item }}</li>`,
    validPatterns: [/\*ngFor\s*=\s*["']let\s+\w+\s+of\s+items\s*;\s*let\s+\w+\s*=\s*index["']/],
    editorLanguage: 'html',
    realWorldExample:
      "A numbered to-do list in Todoist shows '1. Buy groceries, 2. Call dentist' -- accessing the loop index in *ngFor lets you display position numbers alongside each item.",
    hints: ['Use "let i = index" to access the current loop index'],
    tags: ['ngfor', 'index', 'template'],
  },
  {
    id: 'fe-ng-ngfor-trackby',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'medium',
    title: '*ngFor with trackBy',
    text: 'Write an Angular template: a <div *ngFor="let user of users; trackBy: trackById"> with {{ user.name }}.',
    setup: 'Write the template with trackBy function reference.',
    setupCode: `const template = '';`,
    expected: '*ngFor with trackBy for performance',
    sample: `<div *ngFor="let user of users; trackBy: trackById">{{ user.name }}</div>`,
    validPatterns: [/\*ngFor\s*=\s*["']let\s+\w+\s+of\s+users\s*;\s*trackBy\s*:\s*trackById["']/],
    editorLanguage: 'html',
    realWorldExample:
      'A contacts list with 1,000 users on LinkedIn re-renders only changed items after a search update -- trackBy tells Angular to identify items by ID instead of re-creating every DOM element.',
    hints: ['trackBy helps Angular identify items and avoid unnecessary re-renders'],
    tags: ['ngfor', 'trackby', 'performance'],
  },
  {
    id: 'fe-ng-ngfor-first-last',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'medium',
    title: '*ngFor with first/last',
    text: 'Write an Angular template: a <div *ngFor="let item of items; let isFirst = first; let isLast = last" [class.first]="isFirst" [class.last]="isLast">.',
    setup: 'Write the template with first and last variables.',
    setupCode: `const template = '';`,
    expected: '*ngFor with first and last flags',
    sample: `<div *ngFor="let item of items; let isFirst = first; let isLast = last" [class.first]="isFirst" [class.last]="isLast">{{ item }}</div>`,
    validPatterns: [/let\s+\w+\s*=\s*first/, /let\s+\w+\s*=\s*last/],
    editorLanguage: 'html',
    realWorldExample:
      'A breadcrumb navigation adds a separator between items but not after the last one -- the first/last variables in *ngFor let you apply special styling to boundary items.',
    hints: ['*ngFor exposes first, last, even, odd boolean variables'],
    tags: ['ngfor', 'first', 'last', 'template'],
  },
  {
    id: 'fe-ng-ngif-as',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'medium',
    title: '*ngIf with as',
    text: 'Write an Angular template: <div *ngIf="user$ | async as user">{{ user.name }}</div> to unwrap and alias an Observable.',
    setup: 'Write the template with *ngIf + async pipe + as alias.',
    setupCode: `const template = '';`,
    expected: '*ngIf with async pipe and alias',
    sample: `<div *ngIf="user$ | async as user">{{ user.name }}</div>`,
    validPatterns: [/\*ngIf\s*=\s*["']user\$\s*\|\s*async\s+as\s+user["']/],
    editorLanguage: 'html',
    realWorldExample:
      "A user profile page unwraps the user$ Observable once and reuses the result across the template -- *ngIf with 'as' avoids duplicate subscriptions and provides a clean local variable.",
    hints: ['Combine *ngIf with async pipe and "as" to avoid multiple subscriptions'],
    tags: ['ngif', 'async', 'alias', 'template'],
  },
  {
    id: 'fe-ng-pipe-chain',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'Pipe Chaining',
    text: 'Display the "name" variable in a paragraph, first converting it to uppercase, then truncating it to the first 10 characters. Apply both transformations using pipes.',
    setup:
      'You need to transform a name string: make it uppercase, then limit to 10 characters. Use two built-in pipes chained together.',
    setupCode: `const template = '';`,
    expected: 'Template with chained pipes',
    sample: `<p>{{ name | uppercase | slice:0:10 }}</p>`,
    validPatterns: [/\{\{\s*name\s*\|\s*uppercase\s*\|\s*slice\s*:\s*0\s*:\s*10\s*\}\}/],
    editorLanguage: 'html',
    realWorldExample:
      "A user directory displays names as 'JOHN DOE...' by chaining uppercase and slice pipes -- pipe chaining composes transformations declaratively in the template.",
    hints: [
      'Multiple pipes can be applied in sequence using the pipe operator',
      'Each pipe receives the output of the previous one as its input',
    ],
    tags: ['pipe', 'chaining', 'template'],
  },
  {
    id: 'fe-ng-safe-navigation',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'Safe Navigation Operator',
    text: "Display the city from a user's address in a paragraph, but safely handle the case where user or address might be null/undefined without throwing errors.",
    setup:
      'A user object may not have an address, and the address may not have a city. Navigate the nested properties safely in the template.',
    setupCode: `const template = '';`,
    expected: 'Template with safe navigation operator',
    sample: `<p>{{ user?.address?.city }}</p>`,
    validPatterns: [/\{\{\s*user\?\.address\?\.city\s*\}\}/],
    editorLanguage: 'html',
    realWorldExample:
      'A LinkedIn profile page safely accesses user?.company?.name because not all users have a company listed -- the safe navigation operator prevents null reference errors in templates.',
    hints: [
      'Angular templates support an operator for safe property access on potentially null values',
      'Apply it at each level of the property chain that could be null',
    ],
    tags: ['safe-navigation', 'template', 'null-safe'],
  },
  {
    id: 'fe-ng-non-null-assertion',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'Non-Null Assertion in Template',
    text: 'Display user.name in a paragraph, but the "user" property is typed as possibly null. You are certain it will exist at render time. Tell the template compiler to trust you.',
    setup:
      'The user property is nullable but you know it will always have a value when the template renders. Use the assertion operator to suppress the null check.',
    setupCode: `const template = '';`,
    expected: 'Template with non-null assertion',
    sample: `<p>{{ user!.name }}</p>`,
    validPatterns: [/\{\{\s*user!\.name\s*\}\}/],
    editorLanguage: 'html',
    realWorldExample:
      'A route-guarded profile page knows the user is always loaded before rendering -- the non-null assertion tells the compiler to trust that the value exists, suppressing strict null warnings.',
    hints: [
      'Angular templates support an operator to assert a value is definitely not null',
      'Place the operator after the potentially null expression, before accessing its properties',
    ],
    tags: ['non-null', 'assertion', 'template'],
  },
  {
    id: 'fe-ng-component-inline-styles',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'Component Inline Styles',
    text: 'Write a @Component decorator with selector "app-styled" and styles: [":host { display: block; }"].',
    setup: 'Write the @Component decorator with inline styles.',
    setupCode: `class StyledComponent {}`,
    expected: '@Component with inline styles array',
    sample: `@Component({
  selector: 'app-styled',
  template: '',
  styles: [':host { display: block; }']
})`,
    validPatterns: [
      /@Component\s*\(\s*\{[^}]*styles\s*:\s*\[/,
      /:host\s*\{[^}]*display\s*:\s*block/,
    ],
    realWorldExample:
      "Each component in VS Code's web UI has its own scoped styles that cannot leak to other panels -- inline styles with :host let you style the component's root element in isolation.",
    hints: ['Component styles are encapsulated using ViewEncapsulation by default'],
    tags: ['component', 'styles', 'encapsulation'],
  },
  {
    id: 'fe-ng-view-encapsulation',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'hard',
    title: 'ViewEncapsulation.None',
    text: 'Write a @Component decorator with selector "app-global" and encapsulation: ViewEncapsulation.None to disable style scoping.',
    setup: 'Write the @Component decorator with encapsulation set.',
    setupCode: `class GlobalComponent {}`,
    expected: '@Component with ViewEncapsulation.None',
    sample: `@Component({
  selector: 'app-global',
  template: '',
  encapsulation: ViewEncapsulation.None
})`,
    validPatterns: [/@Component\s*\(\s*\{[^}]*encapsulation\s*:\s*ViewEncapsulation\.None/],
    realWorldExample:
      'A global theme component that sets base typography and colors for the entire app needs styles to escape component boundaries -- ViewEncapsulation.None makes styles global.',
    hints: ['ViewEncapsulation.None applies styles globally without scoping'],
    tags: ['component', 'encapsulation', 'styles'],
  },
  {
    id: 'fe-ng-ngfor-even-odd',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'medium',
    title: '*ngFor with even/odd',
    text: 'Write a template: <tr *ngFor="let row of rows; let isEven = even" [class.even-row]="isEven">.',
    setup: 'Write the template using even variable from *ngFor.',
    setupCode: `const template = '';`,
    expected: '*ngFor with even variable',
    sample: `<tr *ngFor="let row of rows; let isEven = even" [class.even-row]="isEven"><td>{{ row }}</td></tr>`,
    validPatterns: [/let\s+\w+\s*=\s*even/, /\[class\.even-row\]/],
    editorLanguage: 'html',
    realWorldExample:
      'Excel-style data tables alternate row background colors for readability -- the even/odd variables in *ngFor let you apply zebra-striping without custom logic.',
    hints: ['*ngFor exposes even and odd boolean variables for alternating styles'],
    tags: ['ngfor', 'even', 'odd', 'template'],
  },
  {
    id: 'fe-ng-component-template-url',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'Component with templateUrl',
    text: 'Write a @Component decorator with selector "app-page" and templateUrl: "./page.component.html".',
    setup: 'Write the @Component decorator with external template.',
    setupCode: `class PageComponent {}`,
    expected: '@Component with templateUrl',
    sample: `@Component({
  selector: 'app-page',
  templateUrl: './page.component.html'
})`,
    validPatterns: [/@Component\s*\(\s*\{[^}]*templateUrl\s*:\s*['"]\.\/page\.component\.html['"]/],
    realWorldExample:
      'Large components like a multi-section settings page keep their HTML in a separate file for maintainability -- templateUrl references an external .html file instead of inlining the template.',
    hints: ['Use templateUrl for external template files'],
    tags: ['component', 'templateurl'],
  },
  {
    id: 'fe-ng-ngtemplate-outlet',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'hard',
    title: 'ngTemplateOutlet',
    text: 'Write a template: <ng-container *ngTemplateOutlet="headerTemplate; context: { $implicit: title }"></ng-container>.',
    setup: 'Write the ng-container with ngTemplateOutlet and context.',
    setupCode: `const template = '';`,
    expected: 'ngTemplateOutlet with context',
    sample: `<ng-container *ngTemplateOutlet="headerTemplate; context: { $implicit: title }"></ng-container>`,
    validPatterns: [
      /\*ngTemplateOutlet\s*=\s*["']headerTemplate\s*;\s*context\s*:/,
      /\$implicit\s*:\s*title/,
    ],
    editorLanguage: 'html',
    realWorldExample:
      'A reusable data table component lets consumers pass in custom cell templates -- ngTemplateOutlet dynamically renders those templates with row data as context.',
    hints: ['ngTemplateOutlet renders a template with optional context data'],
    tags: ['ng-template', 'outlet', 'advanced'],
  },
  {
    id: 'fe-ng-json-pipe',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'easy',
    title: 'JSON Pipe',
    text: 'Display the "data" object as a formatted JSON string inside a preformatted text element. Use an Angular built-in pipe for serialization.',
    setup:
      'You have a JavaScript object called data and want to render its full structure in the template for debugging purposes.',
    setupCode: `const template = '';`,
    expected: 'Template with json pipe',
    sample: `<pre>{{ data | json }}</pre>`,
    validPatterns: [/\{\{\s*data\s*\|\s*json\s*\}\}/],
    editorLanguage: 'html',
    realWorldExample:
      'During development, you dump a complex API response object into a <pre> tag to inspect its shape -- the json pipe is the quickest way to visualize data structures in your template.',
    hints: [
      'Angular has a built-in pipe that serializes objects to their JSON string representation',
      'Wrap the output in a preformatted element for readability',
    ],
    tags: ['pipe', 'json', 'debug'],
  },
  {
    id: 'fe-ng-conditional-attribute',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'Conditional Attribute Binding',
    text: 'Write a template: <button [attr.disabled]="isDisabled ? \'\' : null">Submit</button> to conditionally add the disabled attribute.',
    setup: 'Write the button with conditional attribute binding.',
    setupCode: `const template = '';`,
    expected: 'Template with [attr.disabled] conditional binding',
    sample: `<button [attr.disabled]="isDisabled ? '' : null">Submit</button>`,
    validPatterns: [
      /<button[^>]*\[attr\.disabled\]\s*=\s*["']isDisabled\s*\?\s*['"]{2}\s*:\s*null["']/,
    ],
    editorLanguage: 'html',
    realWorldExample:
      "A checkout form disables the 'Place Order' button while payment is processing -- [attr.disabled] conditionally adds or removes the HTML attribute based on component state.",
    hints: ['Setting an attribute binding to null removes the attribute'],
    tags: ['attribute-binding', 'conditional', 'template'],
  },
  {
    id: 'fe-ng-i18n-attribute',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'medium',
    title: 'i18n Attribute',
    text: 'Write a template: <h1 i18n="site header|Main heading">Welcome to My App</h1> for internationalization.',
    setup: 'Write the element with i18n attribute.',
    setupCode: `const template = '';`,
    expected: 'Template with i18n attribute',
    sample: `<h1 i18n="site header|Main heading">Welcome to My App</h1>`,
    validPatterns: [/<h1[^>]*i18n\s*=\s*["'][^"']*["'][^>]*>Welcome/],
    editorLanguage: 'html',
    realWorldExample:
      "Google's products are translated into 100+ languages -- the i18n attribute marks strings for extraction so Angular can generate localized bundles for each supported locale.",
    hints: ['The i18n attribute marks text for Angular i18n extraction'],
    tags: ['i18n', 'internationalization', 'template'],
  },
  {
    id: 'fe-ng-dynamic-component',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'hard',
    title: 'Dynamic Component with ViewContainerRef',
    text: 'Write a method loadComponent() that calls this.vcRef.createComponent(MyComponent) to dynamically create a component.',
    setup: 'Write the full method.',
    setupCode: `class DynamicHost {}`,
    expected: 'ViewContainerRef.createComponent call',
    sample: `loadComponent() {
  this.vcRef.clear();
  this.vcRef.createComponent(MyComponent);
}`,
    validPatterns: [/this\.vcRef\.createComponent\s*\(\s*MyComponent\s*\)/],
    realWorldExample:
      'A plugin system like VS Code extensions dynamically loads UI panels at runtime -- ViewContainerRef.createComponent() instantiates components programmatically without declaring them in a template.',
    hints: ['ViewContainerRef.createComponent() dynamically instantiates components'],
    tags: ['dynamic-component', 'viewcontainerref', 'advanced'],
  },

  // ═══════════════════════════════════════════════════════════════
  // Data Fetching (17 new problems)
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'fe-ng-http-post',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'HttpClient POST Request',
    text: "Call http.post('/api/users', { name: 'Alice' }) and chain .subscribe() to log the response.",
    setup: 'Write the http.post() call with body and subscribe.',
    setupCode: `const http = { post: (url: string, body: any) => ({ subscribe: (fn: any) => fn({}) }) };`,
    expected: 'http.post() with body and subscribe',
    sample: `http.post('/api/users', { name: 'Alice' }).subscribe(data => {
  console.log(data);
});`,
    validPatterns: [/http\.post\s*\(\s*['"]\/api\/users['"]/, /\.subscribe\s*\(/],
    realWorldExample:
      'When you submit a new post on Reddit, the app sends a POST request with your title and content to the API -- http.post() is how Angular creates new server-side resources.',
    hints: ['http.post(url, body) sends data to the server'],
    tags: ['http', 'post', 'api'],
  },
  {
    id: 'fe-ng-http-headers',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'HttpHeaders',
    text: 'Create an HTTP headers object with an Authorization header set to "Bearer token123". Store it in a const called "headers".',
    setup:
      'You need to attach an auth token to outgoing HTTP requests. Build the headers object using the immutable API.',
    setupCode: `const HttpHeaders = class { set(key: string, value: string) { return this; } };`,
    expected: 'HttpHeaders with Authorization',
    sample: `const headers = new HttpHeaders().set('Authorization', 'Bearer token123');`,
    validPatterns: [
      /new\s+HttpHeaders\s*\(\s*\)\.set\s*\(\s*['"]Authorization['"]/,
      /Bearer\s+token123/,
    ],
    realWorldExample:
      "Every API call to GitHub's REST API requires an Authorization header with your personal access token -- HttpHeaders lets you attach auth tokens to outgoing requests.",
    hints: [
      "Angular's header class is immutable - methods return a new instance",
      'Create a new instance first, then chain method calls to add headers',
    ],
    tags: ['http', 'headers', 'auth'],
  },
  {
    id: 'fe-ng-http-params',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'HttpParams',
    text: 'Build a query parameters object with "page" set to "1" and "limit" set to "10". Store it in a const called "params".',
    setup:
      'You need to add pagination query parameters to an HTTP request. Construct the params using the immutable chaining API.',
    setupCode: `const HttpParams = class { set(key: string, value: string) { return this; } };`,
    expected: 'HttpParams with query parameters',
    sample: `const params = new HttpParams().set('page', '1').set('limit', '10');`,
    validPatterns: [
      /new\s+HttpParams\s*\(\s*\)\.set\s*\(\s*['"]page['"]/,
      /\.set\s*\(\s*['"]limit['"]/,
    ],
    realWorldExample:
      'Amazon search adds ?page=1&limit=10 to paginate product results -- HttpParams builds type-safe query strings without manual string concatenation.',
    hints: [
      "Angular's params class is immutable like HttpHeaders",
      'Chain method calls to add multiple parameters',
    ],
    tags: ['http', 'params', 'query'],
  },
  {
    id: 'fe-ng-http-interceptor',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'hard',
    title: 'HTTP Interceptor',
    text: 'Write an intercept method: intercept(req: HttpRequest<any>, next: HttpHandler) that clones the request with an auth header and calls next.handle(authReq).',
    setup: 'Write the full intercept method.',
    setupCode: `class AuthInterceptor {}`,
    expected: 'HTTP interceptor with cloned request',
    sample: `intercept(req: HttpRequest<any>, next: HttpHandler) {
  const authReq = req.clone({ setHeaders: { Authorization: 'Bearer token' } });
  return next.handle(authReq);
}`,
    validPatterns: [
      /intercept\s*\(\s*req\s*:\s*HttpRequest/,
      /req\.clone\s*\(/,
      /next\.handle\s*\(/,
    ],
    realWorldExample:
      'Every API call in a banking app needs an auth token -- an HTTP interceptor automatically attaches the Bearer token to every outgoing request without repeating code in each service.',
    hints: ['Interceptors clone the request to add headers, then pass to next.handle()'],
    tags: ['interceptor', 'http', 'auth'],
  },
  {
    id: 'fe-ng-rxjs-switchmap',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'RxJS switchMap',
    text: 'Transform the input$ observable so each emitted search term triggers an HTTP GET to "/api/search?q=" plus the term. If a new term arrives before the previous request completes, cancel the old request.',
    setup:
      'You have an input$ observable emitting search terms. Map each term to an HTTP request, but ensure only the latest request is active at a time.',
    setupCode: `const http = { get: (url: string) => ({ subscribe: (fn: any) => fn([]) }) };\nconst input$ = { pipe: (...args: any[]) => input$ };\nconst switchMap = (fn: any) => fn;`,
    expected: 'pipe() with switchMap() for search',
    sample: `input$.pipe(
  switchMap(term => http.get('/api/search?q=' + term))
)`,
    validPatterns: [/\.pipe\s*\([^)]*switchMap\s*\(/, /http\.get\s*\(/],
    realWorldExample:
      "Google's autocomplete cancels the previous search request each time you type a new character -- switchMap ensures only the latest API call is active, discarding stale results.",
    hints: [
      'RxJS has a flattening operator that cancels previous inner observables when new values arrive',
      'It maps each value to an inner observable and subscribes to only the latest one',
    ],
    tags: ['rxjs', 'switchmap', 'search'],
  },
  {
    id: 'fe-ng-rxjs-catcherror',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'RxJS catchError',
    text: 'Handle errors in the source$ observable by catching any error and returning an empty array as a fallback value so downstream subscribers still receive data.',
    setup:
      'An observable may fail. Add an error-handling operator that intercepts errors and substitutes a fallback observable emitting an empty array.',
    setupCode: `const source$ = { pipe: (...args: any[]) => source$ };\nconst catchError = (fn: any) => fn;\nconst of = (val: any) => val;`,
    expected: 'pipe() with catchError()',
    sample: `source$.pipe(
  catchError(err => of([]))
)`,
    validPatterns: [/\.pipe\s*\([^)]*catchError\s*\(/, /of\s*\(\s*\[\s*\]\s*\)/],
    realWorldExample:
      "If Spotify's recommendations API fails, the app shows an empty list instead of crashing -- catchError provides a graceful fallback so the UI stays functional.",
    hints: [
      'RxJS has an operator that intercepts errors in the stream',
      'The handler function must return a replacement observable (use the creation function for a single value)',
    ],
    tags: ['rxjs', 'catcherror', 'error-handling'],
  },
  {
    id: 'fe-ng-rxjs-retry',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'RxJS retry',
    text: 'Make a GET request to "/api/data" and automatically re-attempt the request up to 3 times if it fails.',
    setup:
      'HTTP requests can fail due to transient errors. Add an operator that automatically retries the request a specified number of times before giving up.',
    setupCode: `const http = { get: (url: string) => ({ pipe: (...args: any[]) => ({}) }) };\nconst retry = (count: number) => count;`,
    expected: 'http.get() with retry operator',
    sample: `http.get('/api/data').pipe(retry(3))`,
    validPatterns: [/http\.get\s*\([^)]*\)\.pipe\s*\(\s*retry\s*\(\s*3\s*\)\s*\)/],
    realWorldExample:
      'Flaky network connections on mobile cause intermittent API failures -- retry(3) automatically re-attempts the HTTP request up to 3 times before surfacing the error.',
    hints: [
      'RxJS has an operator that resubscribes to the source on error',
      'Pass the maximum number of retry attempts as an argument',
    ],
    tags: ['rxjs', 'retry', 'error-handling'],
  },
  {
    id: 'fe-ng-rxjs-debouncetime',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'easy',
    title: 'RxJS debounceTime',
    text: 'Apply an operator to the search$ observable that waits for a 300ms pause in emissions before passing through the latest value. This prevents firing on every keystroke.',
    setup:
      'You have a search$ observable that emits on every keystroke. Add an operator to wait until the user stops typing for 300ms before emitting.',
    setupCode: `const search$ = { pipe: (...args: any[]) => search$ };\nconst debounceTime = (ms: number) => ms;`,
    expected: 'pipe() with debounceTime()',
    sample: `search$.pipe(debounceTime(300))`,
    validPatterns: [/\.pipe\s*\(\s*debounceTime\s*\(\s*300\s*\)\s*\)/],
    realWorldExample:
      'Google Search waits until you pause typing before firing autocomplete suggestions -- debounceTime(300) prevents API calls on every single keystroke, reducing server load.',
    hints: [
      'RxJS has an operator that delays emissions until a specified quiet period has passed',
      'Use the pipe method to compose operators onto an observable',
    ],
    tags: ['rxjs', 'debouncetime', 'search'],
  },
  {
    id: 'fe-ng-rxjs-distinctuntilchanged',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'easy',
    title: 'RxJS distinctUntilChanged',
    text: 'Apply an operator to the input$ observable that suppresses consecutive duplicate values. If the same value is emitted twice in a row, only the first should pass through.',
    setup:
      'You have an input$ observable that may emit the same value multiple times in succession. Filter out consecutive duplicates.',
    setupCode: `const input$ = { pipe: (...args: any[]) => input$ };\nconst distinctUntilChanged = () => null;`,
    expected: 'pipe() with distinctUntilChanged()',
    sample: `input$.pipe(distinctUntilChanged())`,
    validPatterns: [/\.pipe\s*\(\s*distinctUntilChanged\s*\(\s*\)\s*\)/],
    realWorldExample:
      'If a user selects the same dropdown option twice in a row, there is no need to re-fetch data -- distinctUntilChanged skips duplicate emissions to avoid redundant work.',
    hints: [
      'RxJS has an operator that only emits when the current value differs from the previous one',
      'This operator takes no arguments for simple equality comparison',
    ],
    tags: ['rxjs', 'distinctuntilchanged', 'optimization'],
  },
  {
    id: 'fe-ng-rxjs-combinelatest',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'hard',
    title: 'RxJS combineLatest',
    text: 'Combine user$ and settings$ into a single stream that emits an object { user, settings } whenever either source emits a new value. Use the latest value from each.',
    setup:
      'You have two independent observables: user$ and settings$. Merge them so you get an object with both values, updating whenever either changes.',
    setupCode: `const user$ = { pipe: (...args: any[]) => user$ };\nconst settings$ = {};\nconst combineLatest = (arr: any[]) => ({ pipe: (...args: any[]) => ({}) });\nconst map = (fn: any) => fn;`,
    expected: 'combineLatest with destructured map',
    sample: `combineLatest([user$, settings$]).pipe(
  map(([user, settings]) => ({ user, settings }))
)`,
    validPatterns: [
      /combineLatest\s*\(\s*\[\s*user\$\s*,\s*settings\$\s*\]\s*\)/,
      /map\s*\(\s*\(\s*\[\s*user\s*,\s*settings\s*\]\s*\)/,
    ],
    realWorldExample:
      'A dashboard needs to display user info AND their settings together -- combineLatest merges both streams and updates the view whenever either source emits new data.',
    hints: [
      'RxJS has a creation function that emits an array of latest values when any source emits',
      'Pass an array of observables, then use map to reshape the output',
    ],
    tags: ['rxjs', 'combinelatest', 'composition'],
  },
  {
    id: 'fe-ng-rxjs-forkjoin',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'hard',
    title: 'RxJS forkJoin',
    text: 'Make two HTTP GET requests in parallel ("/api/users" and "/api/posts") and wait for both to complete before receiving the results as a single object with "users" and "posts" keys.',
    setup:
      'You need to fetch users and posts simultaneously and only proceed when both requests finish. Use the RxJS operator designed for parallel completion.',
    setupCode: `const http = { get: (url: string) => ({ subscribe: (fn: any) => fn({}) }) };\nconst forkJoin = (obj: any) => ({ subscribe: (fn: any) => fn({}) });`,
    expected: 'forkJoin for parallel HTTP requests',
    sample: `forkJoin({
  users: http.get('/api/users'),
  posts: http.get('/api/posts')
}).subscribe(results => {
  console.log(results);
});`,
    validPatterns: [
      /forkJoin\s*\(\s*\{/,
      /http\.get\s*\(\s*['"]\/api\/users['"]/,
      /http\.get\s*\(\s*['"]\/api\/posts['"]/,
    ],
    realWorldExample:
      "A Twitter/X profile page loads the user's tweets AND followers in parallel, rendering only after both finish -- forkJoin waits for all requests to complete before emitting.",
    hints: [
      'RxJS has a creation function that waits for all observables to complete',
      'Pass an object where each key maps to an observable for named results',
    ],
    tags: ['rxjs', 'forkjoin', 'parallel'],
  },
  {
    id: 'fe-ng-rxjs-subject',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'easy',
    title: 'RxJS Subject',
    text: 'Create an RxJS multicast observable of type string called "subject", then manually push the value "hello" into it.',
    setup:
      'You need an observable that you can both subscribe to and imperatively push values into. Create it and emit a string.',
    setupCode: `const Subject = class { next(val: any) {} subscribe(fn: any) {} };`,
    expected: 'Subject creation and emission',
    sample: `const subject = new Subject<string>();
subject.next('hello');`,
    validPatterns: [
      /new\s+Subject\s*<\s*string\s*>\s*\(\s*\)/,
      /subject\.next\s*\(\s*['"]hello['"]\s*\)/,
    ],
    realWorldExample:
      'A notification service in Slack pushes toast messages to any component listening -- a Subject lets you imperatively emit values that multiple subscribers receive.',
    hints: [
      'RxJS has a type that acts as both an observable and an observer',
      'Use the method that pushes a new value to all subscribers',
    ],
    tags: ['rxjs', 'subject', 'multicast'],
  },
  {
    id: 'fe-ng-rxjs-behaviorsubject',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'RxJS BehaviorSubject',
    text: 'Create a stateful observable called "count$" that holds a number, starts at 0, and always replays the latest value to new subscribers. Then read its current value synchronously.',
    setup:
      'You need an observable that remembers its most recent value and can provide it synchronously. Create it with initial value 0 and retrieve the current value.',
    setupCode: `const BehaviorSubject = class { constructor(val: any) {} getValue() { return 0; } next(val: any) {} };`,
    expected: 'BehaviorSubject with initial value',
    sample: `const count$ = new BehaviorSubject<number>(0);
count$.getValue();`,
    validPatterns: [/new\s+BehaviorSubject\s*<\s*number\s*>\s*\(\s*0\s*\)/, /\.getValue\s*\(\s*\)/],
    realWorldExample:
      'An auth service stores the current user in a BehaviorSubject so any component that subscribes immediately gets the latest user state, even if login happened earlier.',
    hints: [
      'RxJS has a variant of Subject that requires an initial value and remembers the latest emission',
      'It has a synchronous method to retrieve the current value without subscribing',
    ],
    tags: ['rxjs', 'behaviorsubject', 'state'],
  },
  {
    id: 'fe-ng-rxjs-mergemap',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'hard',
    title: 'RxJS mergeMap',
    text: 'For each ID emitted by ids$, make a concurrent GET request to "/api/item/" plus the ID. All requests should run in parallel without canceling previous ones.',
    setup:
      'You have an ids$ observable emitting item IDs. Map each to an HTTP request and subscribe to all of them concurrently.',
    setupCode: `const http = { get: (url: string) => ({ pipe: (...args: any[]) => ({}) }) };\nconst ids$ = { pipe: (...args: any[]) => ids$ };\nconst mergeMap = (fn: any) => fn;`,
    expected: 'pipe() with mergeMap() for concurrent fetching',
    sample: `ids$.pipe(
  mergeMap(id => http.get('/api/item/' + id))
)`,
    validPatterns: [/\.pipe\s*\([^)]*mergeMap\s*\(/, /http\.get\s*\(\s*['"]\/api\/item\//],
    realWorldExample:
      'A file uploader sends all selected files to the server simultaneously -- mergeMap makes concurrent HTTP requests for each file without canceling previous uploads.',
    hints: [
      'RxJS has a flattening operator that maintains all inner subscriptions concurrently',
      'Unlike the switching variant, this one does not cancel previous inner observables',
    ],
    tags: ['rxjs', 'mergemap', 'concurrent'],
  },
  {
    id: 'fe-ng-http-typed-response',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'easy',
    title: 'Typed HTTP Response',
    text: 'Make a GET request to "/api/users" that returns a typed response of User[]. Use the generic type parameter so TypeScript knows the response shape.',
    setup:
      'You want type safety on your HTTP response. The endpoint returns an array of User objects.',
    setupCode: `const http = { get: (url: string) => ({ subscribe: (fn: any) => fn([]) }) };`,
    expected: 'Typed http.get<T>()',
    sample: `http.get<User[]>('/api/users')`,
    validPatterns: [/http\.get\s*<\s*User\s*\[\s*\]\s*>\s*\(\s*['"]\/api\/users['"]\s*\)/],
    realWorldExample:
      'TypeScript autocompletion for user.name works only if the HTTP response is typed as User[] -- generic type parameters on http.get<T>() enable end-to-end type safety from API to template.',
    hints: [
      'The HTTP client methods accept a generic type parameter',
      'Place the type between angle brackets before the argument list',
    ],
    tags: ['http', 'typescript', 'typed'],
  },
  {
    id: 'fe-ng-rxjs-tap',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'easy',
    title: 'RxJS tap Operator',
    text: 'Add a side-effect operator to the data$ observable that logs "Received:" followed by each emitted value, without modifying the stream itself.',
    setup:
      'You want to debug an observable by logging each value as it passes through, without affecting downstream operators.',
    setupCode: `const data$ = { pipe: (...args: any[]) => data$ };\nconst tap = (fn: any) => fn;`,
    expected: 'pipe() with tap() for side effects',
    sample: `data$.pipe(tap(val => console.log('Received:', val)))`,
    validPatterns: [/\.pipe\s*\(\s*tap\s*\(\s*\w+\s*=>\s*console\.log/],
    realWorldExample:
      'When debugging why a search autocomplete fails, you insert tap(val => console.log(val)) into the pipeline to inspect values without altering the data flow.',
    hints: [
      'RxJS has an operator that performs side effects without transforming values',
      'It is commonly used for logging and debugging observable pipelines',
    ],
    tags: ['rxjs', 'tap', 'debug'],
  },
  {
    id: 'fe-ng-rxjs-filter',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'RxJS filter Operator',
    text: 'Use the filter and map operators to transform an array: keep only even numbers and double them.',
    setup: 'Mock pipe, filter, and map operators.',
    setupCode: `const pipe = (...fns) => (arr) => fns.reduce((a, fn) => fn(a), arr);\nconst filter = (pred) => (arr) => arr.filter(pred);\nconst map = (fn) => (arr) => arr.map(fn);\nconst numbers = [1, 2, 3, 4, 5, 6];`,
    expected: [4, 8, 12],
    sample: `pipe(filter(n => n % 2 === 0), map(n => n * 2))(numbers)`,
    realWorldExample:
      'An analytics dashboard filters raw event data to keep only click events, then transforms each into a display-friendly format -- filter + map is the fundamental data pipeline pattern.',
    hints: ['Pipe composes functions left to right', 'Filter evens, then double'],
    tags: ['rxjs', 'pipe', 'filter', 'map'],
  },
  {
    id: 'fe-ng-rxjs-takeuntil',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'medium',
    title: 'RxJS takeUntil Operator',
    text: 'Subscribe to data$ but automatically complete the subscription when this.destroy$ emits. Log each received value.',
    setup:
      'You have a data$ observable and a destroy$ Subject on the component. Use an operator that completes the subscription when the notifier emits.',
    setupCode: `const data$ = { pipe: (...args: any[]) => ({ subscribe: (fn: any) => fn(null) }) };\nconst takeUntil = (notifier: any) => notifier;`,
    expected: 'pipe() with takeUntil() for auto-unsubscribe',
    sample: `data$.pipe(takeUntil(this.destroy$)).subscribe(val => console.log(val));`,
    validPatterns: [/\.pipe\s*\(\s*takeUntil\s*\(\s*this\.destroy\$\s*\)\s*\)\.subscribe/],
    realWorldExample:
      'A real-time stock price subscription must stop when the user navigates away from the stocks page -- takeUntil(destroy$) automatically completes the subscription on component destroy.',
    hints: [
      'RxJS has an operator that completes a stream when another observable emits',
      'Pass the notifier observable (the component destroy signal) as the argument',
    ],
    tags: ['rxjs', 'takeuntil', 'unsubscribe'],
  },

  // ═══════════════════════════════════════════════════════════════
  // Forms & Validation (17 new problems)
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'fe-ng-formgroup',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Reactive FormGroup',
    text: "Create a FormGroup: const form = new FormGroup({ name: new FormControl(''), email: new FormControl('') });.",
    setup: 'Write the FormGroup creation.',
    setupCode: `const FormControl = class { constructor(val: any, validators?: any) {} };\nconst FormGroup = class { constructor(controls: any) {} };`,
    expected: 'FormGroup with multiple FormControls',
    sample: `const form = new FormGroup({
  name: new FormControl(''),
  email: new FormControl('')
});`,
    validPatterns: [
      /new\s+FormGroup\s*\(\s*\{/,
      /name\s*:\s*new\s+FormControl/,
      /email\s*:\s*new\s+FormControl/,
    ],
    realWorldExample:
      'A user registration form groups name, email, and password fields together -- FormGroup manages the collective value, validity, and dirty state of all its child controls.',
    hints: ['FormGroup groups multiple FormControls together'],
    tags: ['reactive-forms', 'formgroup'],
  },
  {
    id: 'fe-ng-formbuilder',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'FormBuilder Group',
    text: "Use FormBuilder: this.form = this.fb.group({ name: [''], email: ['', Validators.required] });.",
    setup: 'Write the FormBuilder group creation.',
    setupCode: `class MyComponent {}`,
    expected: 'FormBuilder.group() with validators',
    sample: `this.form = this.fb.group({
  name: [''],
  email: ['', Validators.required]
});`,
    validPatterns: [
      /this\.fb\.group\s*\(\s*\{/,
      /name\s*:\s*\[/,
      /email\s*:\s*\[[\s\S]*Validators\.required/,
    ],
    realWorldExample:
      "A complex checkout form with 15+ fields uses FormBuilder for concise setup -- fb.group() is shorthand that avoids repetitive 'new FormControl()' for every field.",
    hints: ['FormBuilder provides a shorthand for creating FormGroups'],
    tags: ['reactive-forms', 'formbuilder'],
  },
  {
    id: 'fe-ng-validators-required',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'easy',
    title: 'Required Validator',
    text: 'Create a form control called "name" with an empty initial value that must not be left blank. Apply the built-in required validation.',
    setup:
      'You need a FormControl that enforces the field is not empty. Pass the validation rule as the second constructor argument.',
    setupCode: `const Validators = { required: (c: any) => null };\nconst FormControl = class { constructor(val: any, validator?: any) {} };`,
    expected: 'FormControl with required validator',
    sample: `const name = new FormControl('', Validators.required);`,
    validPatterns: [/new\s+FormControl\s*\(\s*['"]{2}\s*,\s*Validators\.required\s*\)/],
    realWorldExample:
      'A Stripe payment form requires the cardholder name to be filled in -- Validators.required ensures the field cannot be submitted empty, showing an error state.',
    hints: [
      'The FormControl constructor takes the initial value first, then validators',
      'Angular provides built-in validators on a static class',
    ],
    tags: ['reactive-forms', 'validators', 'required'],
  },
  {
    id: 'fe-ng-validators-compose',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Multiple Validators',
    text: 'Create a FormControl with an empty initial value that must be both non-empty and at least 3 characters long. Apply both validations simultaneously.',
    setup:
      'You need a form control with two validation rules: it cannot be blank, and the value must be at least 3 characters. Pass multiple validators.',
    setupCode: `const Validators = { required: (c: any) => null, minLength: (n: number) => (c: any) => null };\nconst FormControl = class { constructor(val: any, validators?: any) {} };`,
    expected: 'FormControl with multiple validators',
    sample: `new FormControl('', [Validators.required, Validators.minLength(3)])`,
    validPatterns: [
      /new\s+FormControl\s*\(\s*['"]{2}\s*,\s*\[\s*Validators\.required\s*,\s*Validators\.minLength\s*\(\s*3\s*\)\s*\]/,
    ],
    realWorldExample:
      'A password field on GitHub signup must not be empty AND be at least 8 characters -- passing an array of validators enforces multiple rules on a single control.',
    hints: [
      'When you need multiple validators, pass them as an array',
      "Angular's built-in validators include required and a minimum length checker",
    ],
    tags: ['reactive-forms', 'validators', 'compose'],
  },
  {
    id: 'fe-ng-validators-pattern',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Pattern Validator',
    text: 'Create a FormControl with an empty initial value that validates the input matches exactly 10 digits (a phone number pattern). Use regex-based validation.',
    setup:
      'You need a form control for a phone field that only accepts exactly 10 numeric digits. Apply a pattern-based validator.',
    setupCode: `const Validators = { pattern: (p: string) => (c: any) => null };\nconst FormControl = class { constructor(val: any, validators?: any) {} };`,
    expected: 'FormControl with pattern validator',
    sample: `new FormControl('', Validators.pattern('^[0-9]{10}$'))`,
    validPatterns: [/new\s+FormControl\s*\([^)]*Validators\.pattern\s*\(\s*['"]\^?\[0-9\]/],
    realWorldExample:
      'A phone number field on an airline booking form only accepts exactly 10 digits -- Validators.pattern enforces format rules using a regular expression.',
    hints: [
      "Angular's built-in validators include one that accepts a regex string",
      'Use a regex that anchors the match and specifies exactly 10 digits',
    ],
    tags: ['reactive-forms', 'validators', 'pattern'],
  },
  {
    id: 'fe-ng-formarray',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'hard',
    title: 'FormArray',
    text: "Create a FormArray: const items = new FormArray([new FormControl('Item 1'), new FormControl('Item 2')]); and push a new control.",
    setup: 'Write the FormArray creation and push.',
    setupCode: `const FormControl = class { constructor(val: any) {} };\nconst FormArray = class { controls: any[] = []; constructor(ctrls: any[]) { this.controls = ctrls; } push(ctrl: any) { this.controls.push(ctrl); } };`,
    expected: 'FormArray with push',
    sample: `const items = new FormArray([new FormControl('Item 1'), new FormControl('Item 2')]);
items.push(new FormControl('Item 3'));`,
    validPatterns: [/new\s+FormArray\s*\(\s*\[/, /items\.push\s*\(\s*new\s+FormControl/],
    realWorldExample:
      'A recipe editor lets you dynamically add or remove ingredient rows -- FormArray manages a variable-length list of form controls that grow and shrink at runtime.',
    hints: ['FormArray manages a dynamic list of controls; use .push() to add'],
    tags: ['reactive-forms', 'formarray', 'dynamic'],
  },
  {
    id: 'fe-ng-form-template-binding',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Reactive Form Template Binding',
    text: 'Write a template: <form [formGroup]="myForm"><input formControlName="email" /></form>.',
    setup: 'Write the form template with reactive form binding.',
    setupCode: `const template = '';`,
    expected: 'Template with [formGroup] and formControlName',
    sample: `<form [formGroup]="myForm">
  <input formControlName="email" />
</form>`,
    validPatterns: [
      /<form[^>]*\[formGroup\]\s*=\s*["']myForm["']/,
      /formControlName\s*=\s*["']email["']/,
    ],
    editorLanguage: 'html',
    realWorldExample:
      'A login form connects its HTML inputs to the TypeScript FormGroup model -- [formGroup] binds the form element and formControlName maps each input to its control.',
    hints: ['Bind the form with [formGroup] and controls with formControlName'],
    tags: ['reactive-forms', 'template', 'binding'],
  },
  {
    id: 'fe-ng-form-error-display',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Form Error Display',
    text: 'Write a template: show <div class="error" *ngIf="myForm.get(\'email\')?.errors?.required">Email is required</div>.',
    setup: 'Write the conditional error message template.',
    setupCode: `const template = '';`,
    expected: 'Template with form error display',
    sample: `<div class="error" *ngIf="myForm.get('email')?.errors?.required">Email is required</div>`,
    validPatterns: [
      /\*ngIf\s*=\s*["']myForm\.get\(\s*['"]email['"]\s*\)\?\.errors\?\.required["']/,
    ],
    editorLanguage: 'html',
    realWorldExample:
      "A signup form shows 'Email is required' in red text under the email field when the user tabs away without filling it -- accessing .errors?.required on the control drives inline error messages.",
    hints: ['Access errors via formGroup.get(controlName)?.errors?.validatorName'],
    tags: ['reactive-forms', 'validation', 'errors'],
  },
  {
    id: 'fe-ng-custom-validator',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'hard',
    title: 'Custom Validator Function',
    text: 'Write a custom validator function that checks if a value is not "admin": function forbiddenName(control: AbstractControl) returning { forbiddenName: true } or null.',
    setup: 'Write the custom validator function.',
    setupCode: `const AbstractControl = class { value: any; };`,
    expected: 'Custom validator returning error object or null',
    sample: `function forbiddenName(control: AbstractControl) {
  return control.value === 'admin' ? { forbiddenName: true } : null;
}`,
    validPatterns: [
      /function\s+forbiddenName\s*\(\s*control/,
      /forbiddenName\s*:\s*true/,
      /:\s*null/,
    ],
    realWorldExample:
      "A user registration form rejects 'admin' as a username to prevent impersonation -- a custom validator function encapsulates that business rule and returns an error object or null.",
    hints: ['Custom validators return an error object { key: true } or null for valid'],
    tags: ['validators', 'custom', 'reactive-forms'],
  },
  {
    id: 'fe-ng-async-validator',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'hard',
    title: 'Async Validator',
    text: 'Write an async validator that returns an Observable: function uniqueEmail(control: AbstractControl) returning of(null) for valid or of({ emailTaken: true }) after a timer(1000).',
    setup: 'Write the async validator function.',
    setupCode: `class AbstractControl { value: any; }`,
    expected: 'Async validator returning Observable',
    sample: `function uniqueEmail(control: AbstractControl) {
  return timer(1000).pipe(
    map(() => control.value === 'taken@test.com' ? { emailTaken: true } : null)
  );
}`,
    validPatterns: [
      /function\s+uniqueEmail\s*\(\s*control/,
      /timer\s*\(\s*1000\s*\)/,
      /emailTaken\s*:\s*true/,
    ],
    realWorldExample:
      'GitHub checks if a repository name is already taken as you type -- an async validator makes a server call to verify uniqueness and returns a validation error if the name exists.',
    hints: ['Async validators return an Observable<ValidationErrors | null>'],
    tags: ['validators', 'async', 'reactive-forms'],
  },
  {
    id: 'fe-ng-form-value-changes',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'valueChanges Observable',
    text: 'Listen for changes on the "email" form control and log each new value. Access the control from this.form and subscribe to its value stream.',
    setup:
      'You need to react whenever the user types in the email field. Get the control from the FormGroup and subscribe to its observable of value changes.',
    setupCode: `class MyComponent {}`,
    expected: 'valueChanges subscription on form control',
    sample: `this.form.get('email')?.valueChanges.subscribe(value => console.log(value));`,
    validPatterns: [/this\.form\.get\s*\(\s*['"]email['"]\s*\)\?\.valueChanges\.subscribe/],
    realWorldExample:
      'A live search input on Airbnb updates results as you type -- valueChanges emits every keystroke as an Observable so you can debounce, switchMap, and fetch filtered results reactively.',
    hints: [
      'Use the FormGroup get() method to retrieve a specific control by name',
      'Each control exposes an observable property that emits on every value change',
    ],
    tags: ['reactive-forms', 'valuechanges', 'rxjs'],
  },
  {
    id: 'fe-ng-form-patchvalue',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'easy',
    title: 'patchValue on FormGroup',
    text: 'Update only the "name" field of a reactive form to "Alice" without having to provide values for every other control in the group.',
    setup:
      'You have a FormGroup with multiple fields but only want to update the name field. Use the method that allows partial updates.',
    setupCode: `class MyComponent {}`,
    expected: 'FormGroup patchValue call',
    sample: `this.form.patchValue({ name: 'Alice' });`,
    validPatterns: [/this\.form\.patchValue\s*\(\s*\{[^}]*name\s*:\s*['"]Alice['"]/],
    realWorldExample:
      "An 'Edit Profile' page pre-fills just the user's name from an API response without touching the email or bio fields -- patchValue updates a subset of form controls.",
    hints: [
      'FormGroup has two methods for setting values - one requires all fields, the other allows partial updates',
      'Call the partial update method on this.form with an object containing only the fields to change',
    ],
    tags: ['reactive-forms', 'patchvalue'],
  },
  {
    id: 'fe-ng-form-setvalue',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'easy',
    title: 'setValue on FormGroup',
    text: 'Set all values of a reactive form at once: name to "Alice" and email to "alice@test.com". Every control in the group must receive a value.',
    setup:
      'You need to replace all form values at once. Use the method that requires a value for every control in the FormGroup.',
    setupCode: `class MyComponent {}`,
    expected: 'FormGroup setValue call',
    sample: `this.form.setValue({ name: 'Alice', email: 'alice@test.com' });`,
    validPatterns: [/this\.form\.setValue\s*\(\s*\{[^}]*name\s*:\s*['"]Alice['"][^}]*email\s*:/],
    realWorldExample:
      'When loading a saved draft on a blogging platform, you restore the entire form (title, body, tags) from the server -- setValue replaces all controls at once and throws if any field is missing.',
    hints: [
      'FormGroup has a strict method that requires values for ALL controls',
      'It will throw if any control is missing from the provided object',
    ],
    tags: ['reactive-forms', 'setvalue'],
  },
  {
    id: 'fe-ng-form-reset',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'easy',
    title: 'Form Reset',
    text: 'Clear all values in a reactive form and restore it to its pristine, untouched initial state.',
    setup:
      'After form submission, you need to clear the form and reset all validation states. Call the appropriate method on this.form.',
    setupCode: `class MyComponent {}`,
    expected: 'FormGroup reset call',
    sample: `this.form.reset();`,
    validPatterns: [/this\.form\.reset\s*\(\s*\)/],
    realWorldExample:
      'After successfully submitting a contact form, the app clears all fields and removes validation errors so the user can submit another message -- reset() restores the form to its initial state.',
    hints: ['reset() clears all values and resets status to pristine/untouched'],
    tags: ['reactive-forms', 'reset'],
  },
  {
    id: 'fe-ng-form-status',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'easy',
    title: 'Form Status Check',
    text: 'Create a submit button that is automatically disabled when "myForm" is in an invalid state. Use property binding to control the disabled attribute.',
    setup:
      'You have a reactive form called myForm. The submit button should only be clickable when all form validations pass.',
    setupCode: `const template = '';`,
    expected: 'Template with form validity check',
    sample: `<button [disabled]="!myForm.valid">Submit</button>`,
    validPatterns: [/<button[^>]*\[disabled\]\s*=\s*["']!myForm\.valid["'][^>]*>/],
    editorLanguage: 'html',
    realWorldExample:
      "A Stripe checkout grays out the 'Pay Now' button until all card details pass validation -- binding [disabled] to !myForm.valid prevents submission of incomplete forms.",
    hints: [
      'FormGroup exposes boolean properties for its current validation state',
      "Bind the disabled property to the negation of the form's validity status",
    ],
    tags: ['reactive-forms', 'validation', 'template'],
  },
  {
    id: 'fe-ng-cross-field-validator',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'hard',
    title: 'Cross-Field Validator',
    text: 'Write a cross-field validator function passwordMatch(group: AbstractControl) that checks if "password" and "confirmPassword" controls match, returning { passwordMismatch: true } or null.',
    setup: 'Write the cross-field validator function.',
    setupCode: `const AbstractControl = class { value: any; get(name: string): any { return { value: '' }; } };`,
    expected: 'Cross-field validator comparing two controls',
    sample: `function passwordMatch(group: AbstractControl) {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordMismatch: true };
}`,
    validPatterns: [
      /function\s+passwordMatch\s*\(\s*group/,
      /group\.get\s*\(\s*['"]password['"]/,
      /group\.get\s*\(\s*['"]confirmPassword['"]/,
      /passwordMismatch\s*:\s*true/,
    ],
    realWorldExample:
      "Every password-change form on the web requires 'New Password' and 'Confirm Password' to match -- a cross-field validator compares two controls within the same FormGroup.",
    hints: ['Cross-field validators receive the FormGroup as the control parameter'],
    tags: ['validators', 'cross-field', 'reactive-forms'],
  },
  {
    id: 'fe-ng-template-driven-form',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'medium',
    title: 'Template-Driven Form',
    text: 'Write a template-driven form: <form #myForm="ngForm" (ngSubmit)="onSubmit(myForm)"> with an <input name="email" ngModel required />.',
    setup: 'Write the template-driven form template.',
    setupCode: `const template = '';`,
    expected: 'Template-driven form with ngForm and ngModel',
    sample: `<form #myForm="ngForm" (ngSubmit)="onSubmit(myForm)">
  <input name="email" ngModel required />
</form>`,
    validPatterns: [
      /#myForm\s*=\s*["']ngForm["']/,
      /\(ngSubmit\)\s*=\s*["']onSubmit\(myForm\)["']/,
      /ngModel/,
    ],
    editorLanguage: 'html',
    realWorldExample:
      "A simple newsletter signup with just an email field uses template-driven forms for minimal boilerplate -- ngModel and #ref='ngForm' handle validation and submission entirely in the template.",
    hints: ['Template-driven forms use #ref="ngForm", ngModel, and (ngSubmit)'],
    tags: ['template-driven', 'ngform', 'ngmodel'],
  },
];
