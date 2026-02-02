import type { FrontendQuizQuestion } from '../types';

export const angularQuizQuestions: FrontendQuizQuestion[] = [
  {
    id: 'ng-q1',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'easy',
    question: 'What is the purpose of decorators in Angular?',
    codeSnippet: `@Component({
  selector: 'app-example',
  templateUrl: './example.component.html'
})`,
    options: [
      'To attach metadata to classes, properties, and methods for Angular to understand their purpose',
      'To improve performance',
      'To add CSS styling',
      'To enable TypeScript compilation',
    ],
    correctAnswer:
      'To attach metadata to classes, properties, and methods for Angular to understand their purpose',
    explanation:
      'Decorators (@Component, @Injectable, @Input, etc.) are functions that add metadata to classes, properties, and methods. This metadata tells Angular how to process and use those elements.',
  },
  {
    id: 'ng-q2',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'hard',
    question: "What is Angular's change detection strategy and how does it work?",
    options: [
      'Angular checks component tree from top to bottom, comparing current and previous values to detect changes',
      'Angular only checks components that emit events',
      'Angular uses Virtual DOM like React',
      'Change detection is manual and must be triggered explicitly',
    ],
    correctAnswer:
      'Angular checks component tree from top to bottom, comparing current and previous values to detect changes',
    explanation:
      'By default, Angular uses Default change detection, checking every component from root to leaves. OnPush strategy only checks when inputs change or events fire, improving performance.',
  },
  {
    id: 'ng-q3',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What is the difference between ngOnInit and constructor in Angular components?',
    options: [
      'Constructor is for dependency injection, ngOnInit is for initialization logic after inputs are set',
      'ngOnInit runs before constructor',
      'Constructor is for templates, ngOnInit is for services',
      'They are identical, ngOnInit is just a convention',
    ],
    correctAnswer:
      'Constructor is for dependency injection, ngOnInit is for initialization logic after inputs are set',
    explanation:
      'Constructor is called when the class is instantiated (before Angular sets up the component). ngOnInit is a lifecycle hook called after the first change detection cycle, when @Input properties are initialized.',
  },
  {
    id: 'ng-q4',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What is dependency injection in Angular and why is it used?',
    codeSnippet: `constructor(private userService: UserService) {}`,
    options: [
      'A design pattern where dependencies are provided to a class rather than created by it, enabling modularity and testing',
      'A way to inject HTML into components',
      'A method for importing modules',
      'A technique for lazy loading',
    ],
    correctAnswer:
      'A design pattern where dependencies are provided to a class rather than created by it, enabling modularity and testing',
    explanation:
      'Dependency Injection (DI) provides dependencies to classes via constructors rather than having them create dependencies themselves. This makes code more modular, testable, and maintainable.',
  },
  {
    id: 'ng-q5',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'What is the difference between Observables and Promises in Angular?',
    options: [
      'Observables are lazy, cancelable, and can emit multiple values over time; Promises are eager and emit a single value',
      'Promises are faster than Observables',
      'Observables are deprecated in favor of Promises',
      'Promises can be canceled, Observables cannot',
    ],
    correctAnswer:
      'Observables are lazy, cancelable, and can emit multiple values over time; Promises are eager and emit a single value',
    explanation:
      "Observables (from RxJS) are lazy (don't execute until subscribed), support cancellation (unsubscribe), and can emit multiple values. Promises execute immediately and resolve once with a single value.",
  },
  {
    id: 'ng-q6',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'What does the * prefix mean in Angular template syntax?',
    codeSnippet: `<div *ngIf="isVisible">Content</div>`,
    options: [
      'It denotes a structural directive that modifies the DOM structure',
      'It makes the directive run faster',
      'It indicates a required attribute',
      'It marks a deprecated feature',
    ],
    correctAnswer: 'It denotes a structural directive that modifies the DOM structure',
    explanation:
      "The * prefix is syntactic sugar for structural directives (*ngIf, *ngFor, *ngSwitch) that add, remove, or manipulate DOM elements. It's shorthand for <ng-template>.",
  },
  {
    id: 'ng-q7',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'What is the difference between Reactive Forms and Template-driven Forms?',
    options: [
      'Reactive Forms use explicit FormControl/FormGroup in the component class, Template-driven Forms use ngModel directives in templates',
      'Reactive Forms are faster than Template-driven Forms',
      'Template-driven Forms are type-safe, Reactive Forms are not',
      "Reactive Forms don't support validation",
    ],
    correctAnswer:
      'Reactive Forms use explicit FormControl/FormGroup in the component class, Template-driven Forms use ngModel directives in templates',
    explanation:
      'Reactive Forms provide direct access to form models in the component class (more explicit, testable, scalable). Template-driven Forms use directives like ngModel in templates (simpler for basic forms).',
  },
  {
    id: 'ng-q8',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'What is the order of Angular lifecycle hooks?',
    options: [
      'constructor → ngOnChanges → ngOnInit → ngDoCheck → ngAfterContentInit → ngAfterContentChecked → ngAfterViewInit → ngAfterViewChecked → ngOnDestroy',
      'constructor → ngOnInit → ngOnChanges → ngOnDestroy',
      'ngOnInit → constructor → ngAfterViewInit → ngOnDestroy',
      'All lifecycle hooks run simultaneously',
    ],
    correctAnswer:
      'constructor → ngOnChanges → ngOnInit → ngDoCheck → ngAfterContentInit → ngAfterContentChecked → ngAfterViewInit → ngAfterViewChecked → ngOnDestroy',
    explanation:
      'Angular lifecycle hooks execute in a specific order: constructor (not a hook) → ngOnChanges (when inputs change) → ngOnInit (once after first ngOnChanges) → change detection hooks → view hooks → ngOnDestroy (cleanup).',
  },
  {
    id: 'ng-q9',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What is the purpose of ChangeDetectionStrategy.OnPush?',
    codeSnippet: `@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})`,
    options: [
      'To optimize performance by only checking for changes when inputs change or events fire',
      'To disable change detection entirely',
      'To make change detection run more frequently',
      'To enable two-way data binding',
    ],
    correctAnswer:
      'To optimize performance by only checking for changes when inputs change or events fire',
    explanation:
      'OnPush change detection strategy skips checking a component unless its @Input references change, an event fires within the component, or an observable emits. This significantly improves performance for large apps.',
  },
  {
    id: 'ng-q10',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'easy',
    question: 'What is the @Injectable() decorator used for?',
    codeSnippet: `@Injectable({
  providedIn: 'root'
})
export class DataService {}`,
    options: [
      'To mark a class as available for dependency injection',
      'To make a class injectable into templates',
      'To enable HTTP requests',
      'To create lazy-loaded modules',
    ],
    correctAnswer: 'To mark a class as available for dependency injection',
    explanation:
      "@Injectable() marks a class as available to be injected as a dependency. providedIn: 'root' makes it a singleton available application-wide. Services must have this decorator to be injected.",
  },
  // ─── Batch 1: ng-q11 – ng-q35 ─────────────────────────────────
  {
    id: 'ng-q11',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'What is the correct syntax for binding a click event in an Angular template?',
    codeSnippet: `<button ???="onClick()">Click me</button>`,
    options: ['(click)', 'on-click', '@click', 'bind-click'],
    correctAnswer: '(click)',
    explanation:
      'Angular uses parentheses () for event binding. (click)="onClick()" binds the DOM click event to the component method onClick(). The on- prefix is an alternative canonical form but parentheses are the standard syntax.',
  },
  {
    id: 'ng-q12',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'What does a template reference variable do in Angular?',
    codeSnippet: `<input #nameInput type="text">
<button (click)="greet(nameInput.value)">Greet</button>`,
    options: [
      'It creates a reference to a DOM element or directive that can be used elsewhere in the template',
      'It declares a component-level variable',
      'It creates a two-way binding to the input value',
      'It registers the element for form validation',
    ],
    correctAnswer:
      'It creates a reference to a DOM element or directive that can be used elsewhere in the template',
    explanation:
      'Template reference variables (declared with #) give you a reference to a DOM element, component, or directive within the template. You can use them to access element properties or call component methods directly in the template.',
  },
  {
    id: 'ng-q13',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'What does the @HostListener decorator do?',
    codeSnippet: `@HostListener('window:resize', ['$event'])
onResize(event: Event) {
  this.width = (event.target as Window).innerWidth;
}`,
    options: [
      'It listens for events on the host element or window and calls the decorated method when the event fires',
      'It creates a new event emitter on the host element',
      'It prevents the default behavior of the event',
      'It delegates event handling to a child component',
    ],
    correctAnswer:
      'It listens for events on the host element or window and calls the decorated method when the event fires',
    explanation:
      '@HostListener binds a DOM event to a method in a directive or component. It can listen on the host element itself or on global targets like window or document. The second argument maps event data to method parameters.',
  },
  {
    id: 'ng-q14',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'What is the purpose of @HostBinding in Angular?',
    codeSnippet: `@HostBinding('class.active') isActive = false;
@HostBinding('style.color') textColor = 'blue';`,
    options: [
      'It binds a class property to a host element property, attribute, or class',
      'It creates a two-way binding between host and child',
      'It binds the component to a specific DOM node',
      'It creates an event listener on the host element',
    ],
    correctAnswer: 'It binds a class property to a host element property, attribute, or class',
    explanation:
      '@HostBinding lets you set properties on the host element of a directive or component. You can bind to attributes, classes, styles, or properties of the host element from within the directive/component class.',
  },
  {
    id: 'ng-q15',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'hard',
    question: 'Why should you prefer Renderer2 over direct DOM manipulation in Angular?',
    codeSnippet: `constructor(private renderer: Renderer2, private el: ElementRef) {}

ngOnInit() {
  // Option A:
  this.renderer.addClass(this.el.nativeElement, 'highlight');
  // Option B:
  this.el.nativeElement.classList.add('highlight');
}`,
    options: [
      'Renderer2 provides an abstraction layer that works across platforms (server-side rendering, web workers) and is safer against XSS',
      'Renderer2 is faster because it batches DOM updates',
      'Direct DOM manipulation is deprecated in Angular',
      'Renderer2 automatically triggers change detection after DOM updates',
    ],
    correctAnswer:
      'Renderer2 provides an abstraction layer that works across platforms (server-side rendering, web workers) and is safer against XSS',
    explanation:
      "Renderer2 abstracts DOM operations so your code works in environments without direct DOM access (e.g., Angular Universal for SSR, web workers). Direct nativeElement access bypasses Angular's security and platform abstractions.",
  },
  {
    id: 'ng-q16',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'What does @ViewChild do and when is its result available?',
    codeSnippet: `@ViewChild('myInput') inputRef!: ElementRef;

ngAfterViewInit() {
  this.inputRef.nativeElement.focus();
}`,
    options: [
      "It queries for a child element or directive in the component's view template, available after ngAfterViewInit",
      'It queries for projected content, available after ngAfterContentInit',
      'It creates a reference to any element in the entire application',
      'It queries for a child element, available immediately in the constructor',
    ],
    correctAnswer:
      "It queries for a child element or directive in the component's view template, available after ngAfterViewInit",
    explanation:
      "@ViewChild queries for the first matching element or directive in the component's template. The reference is populated after the view is initialized (ngAfterViewInit). Before that, the reference is undefined.",
  },
  {
    id: 'ng-q17',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'What is the difference between @ViewChild and @ContentChild?',
    options: [
      "@ViewChild queries elements in the component's own template; @ContentChild queries elements projected via ng-content",
      '@ViewChild is for components, @ContentChild is for directives',
      '@ContentChild is deprecated in favor of @ViewChild',
      '@ViewChild works only with native elements, @ContentChild works with components',
    ],
    correctAnswer:
      "@ViewChild queries elements in the component's own template; @ContentChild queries elements projected via ng-content",
    explanation:
      "@ViewChild targets elements defined in the component's own template. @ContentChild targets elements projected into the component through <ng-content>. They have different lifecycle timing: AfterViewInit vs AfterContentInit.",
  },
  {
    id: 'ng-q18',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'hard',
    question: 'How does Angular handle DOM sanitization for security?',
    codeSnippet: `// In template:
<div [innerHTML]="userContent"></div>

// In component:
constructor(private sanitizer: DomSanitizer) {}
trustedHtml = this.sanitizer.bypassSecurityTrustHtml(rawHtml);`,
    options: [
      'Angular automatically sanitizes values bound to DOM properties like innerHTML, and DomSanitizer can bypass this for trusted content',
      'Angular does not sanitize any DOM values by default',
      'All DOM manipulation is blocked unless you use Renderer2',
      'Sanitization only applies to template-driven forms',
    ],
    correctAnswer:
      'Angular automatically sanitizes values bound to DOM properties like innerHTML, and DomSanitizer can bypass this for trusted content',
    explanation:
      "Angular's built-in sanitization removes potentially dangerous content (scripts, unsafe URLs) from values bound to the DOM. DomSanitizer.bypassSecurityTrustHtml() can override this for content you explicitly trust, but should be used with caution.",
  },
  {
    id: 'ng-q19',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'What is the correct syntax for two-way data binding in Angular?',
    codeSnippet: `<input ???="name" placeholder="Enter name">
<p>Hello, {{ name }}</p>`,
    options: ['[(ngModel)]', '[ngModel]', '(ngModel)', 'ngModel'],
    correctAnswer: '[(ngModel)]',
    explanation:
      'Two-way binding in Angular uses the "banana in a box" syntax [(ngModel)]. It combines property binding [ngModel] (data flowing in) and event binding (ngModelChange) (data flowing out) into a single notation.',
  },
  {
    id: 'ng-q20',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'How do you emit a custom event from a child component in Angular?',
    codeSnippet: `// Child component
@Output() itemSelected = new EventEmitter<string>();

selectItem(name: string) {
  this.itemSelected.emit(name);
}

// Parent template
<child-comp (itemSelected)="onSelect($event)"></child-comp>`,
    options: [
      'Use @Output() with EventEmitter to emit events, and bind to them with parentheses in the parent template',
      'Use @Input() to send events from child to parent',
      'Use a shared service with BehaviorSubject',
      'Call the parent method directly using @ViewChild',
    ],
    correctAnswer:
      'Use @Output() with EventEmitter to emit events, and bind to them with parentheses in the parent template',
    explanation:
      '@Output() declares an event that a child component can emit. EventEmitter is the class used to create the event. The parent binds to the event using () syntax and receives the payload via $event.',
  },
  {
    id: 'ng-q21',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    question: 'When does the ngOnInit lifecycle hook fire?',
    options: [
      'Once, after the first ngOnChanges and after Angular has initialized all input properties',
      'Every time the component receives new input values',
      'Immediately when the constructor is called',
      'After every change detection cycle',
    ],
    correctAnswer:
      'Once, after the first ngOnChanges and after Angular has initialized all input properties',
    explanation:
      'ngOnInit fires exactly once after the first ngOnChanges cycle. This is the ideal place for initialization logic that depends on @Input() values, as they are guaranteed to be populated at this point.',
  },
  {
    id: 'ng-q22',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What is the purpose of ngOnChanges and what argument does it receive?',
    codeSnippet: `ngOnChanges(changes: SimpleChanges) {
  if (changes['userId'] && !changes['userId'].firstChange) {
    this.loadUser(changes['userId'].currentValue);
  }
}`,
    options: [
      'It is called whenever an @Input() property changes, receiving a SimpleChanges object with current and previous values',
      'It is called on every change detection cycle regardless of input changes',
      'It only fires once when the component is initialized',
      "It is called when the component's internal state changes",
    ],
    correctAnswer:
      'It is called whenever an @Input() property changes, receiving a SimpleChanges object with current and previous values',
    explanation:
      'ngOnChanges is called before ngOnInit and every time one or more @Input() properties change. The SimpleChanges object contains the previous and current values of each changed input, plus a firstChange boolean.',
  },
  {
    id: 'ng-q23',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'What is ngDoCheck and when should you use it?',
    codeSnippet: `ngDoCheck() {
  const change = this.differ.diff(this.items);
  if (change) {
    change.forEachAddedItem(r => console.log('Added', r.item));
  }
}`,
    options: [
      "It runs on every change detection cycle and is used to detect changes that Angular's default change detection cannot catch, like deep object mutations",
      'It replaces ngOnChanges for all input property tracking',
      'It is called only when the component is first initialized',
      'It runs only when OnPush change detection is enabled',
    ],
    correctAnswer:
      "It runs on every change detection cycle and is used to detect changes that Angular's default change detection cannot catch, like deep object mutations",
    explanation:
      'ngDoCheck is invoked on every change detection run. It allows you to implement custom change detection logic for cases Angular cannot detect automatically, such as deep mutations in objects or arrays. Use it sparingly due to performance implications.',
  },
  {
    id: 'ng-q24',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What is the difference between ngAfterViewInit and ngAfterContentInit?',
    options: [
      "ngAfterContentInit fires after projected content (ng-content) is initialized; ngAfterViewInit fires after the component's own view and child views are initialized",
      'ngAfterViewInit fires first, then ngAfterContentInit',
      'They are identical but ngAfterContentInit is deprecated',
      'ngAfterViewInit is for services, ngAfterContentInit is for templates',
    ],
    correctAnswer:
      "ngAfterContentInit fires after projected content (ng-content) is initialized; ngAfterViewInit fires after the component's own view and child views are initialized",
    explanation:
      "ngAfterContentInit fires after Angular projects external content into the component's <ng-content>. ngAfterViewInit fires after the component's view and its child views are fully initialized. Content hooks fire before view hooks.",
  },
  {
    id: 'ng-q25',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    question: 'What should you do in ngOnDestroy?',
    codeSnippet: `ngOnDestroy() {
  this.subscription.unsubscribe();
  clearInterval(this.timerId);
}`,
    options: [
      'Clean up subscriptions, timers, event listeners, and other resources to prevent memory leaks',
      'Save the component state to local storage',
      'Trigger a final change detection cycle',
      'Remove the component from the DOM manually',
    ],
    correctAnswer:
      'Clean up subscriptions, timers, event listeners, and other resources to prevent memory leaks',
    explanation:
      'ngOnDestroy is called just before Angular destroys the component. Use it to unsubscribe from observables, detach event handlers, clear timers, and release resources. Failing to clean up can cause memory leaks.',
  },
  {
    id: 'ng-q26',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: "How does Angular's change detection mechanism work with zone.js?",
    options: [
      'Zone.js monkey-patches async APIs (setTimeout, Promises, event listeners) so Angular is notified when async operations complete and can trigger change detection',
      "Zone.js replaces the browser event loop entirely with Angular's own implementation",
      'Zone.js only works with RxJS observables, not native Promises',
      'Zone.js compiles templates at runtime to detect changes',
    ],
    correctAnswer:
      'Zone.js monkey-patches async APIs (setTimeout, Promises, event listeners) so Angular is notified when async operations complete and can trigger change detection',
    explanation:
      'Zone.js intercepts asynchronous operations by patching browser APIs. When an async operation completes, zone.js notifies Angular, which then runs change detection. This is why Angular can automatically update the view after async operations without manual triggers.',
  },
  {
    id: 'ng-q27',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What are Angular signals and how do they differ from traditional change detection?',
    codeSnippet: `count = signal(0);
doubleCount = computed(() => this.count() * 2);

increment() {
  this.count.update(v => v + 1);
}`,
    options: [
      'Signals are reactive primitives that track dependencies and notify consumers when values change, enabling fine-grained reactivity without zone.js',
      'Signals are just wrappers around RxJS BehaviorSubjects',
      'Signals replace all lifecycle hooks in Angular',
      'Signals only work with OnPush change detection strategy',
    ],
    correctAnswer:
      'Signals are reactive primitives that track dependencies and notify consumers when values change, enabling fine-grained reactivity without zone.js',
    explanation:
      'Angular signals provide fine-grained reactivity. A signal holds a value and automatically tracks where it is read. When the value changes, only the specific consumers are updated. This enables more efficient updates than zone.js-based change detection.',
  },
  {
    id: 'ng-q28',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'What is the purpose of computed() in Angular signals?',
    codeSnippet: `firstName = signal('John');
lastName = signal('Doe');
fullName = computed(() => \`\${this.firstName()} \${this.lastName()}\`);`,
    options: [
      'It creates a derived signal that automatically recalculates when any of its dependent signals change',
      'It caches the result of an expensive function permanently',
      'It creates a writable signal that can be set directly',
      'It triggers a side effect whenever a signal changes',
    ],
    correctAnswer:
      'It creates a derived signal that automatically recalculates when any of its dependent signals change',
    explanation:
      'computed() creates a read-only signal whose value is derived from other signals. Angular automatically tracks which signals are read inside the computed function and recalculates only when those dependencies change. The result is memoized.',
  },
  {
    id: 'ng-q29',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: "How does Angular's dependency injection hierarchy work?",
    codeSnippet: `// Root level
@Injectable({ providedIn: 'root' })
export class GlobalService {}

// Component level
@Component({
  providers: [LocalService]
})
export class MyComponent {}`,
    options: [
      'Angular creates an injector tree mirroring the component tree; child injectors inherit from parent injectors, and each level can override providers',
      'All services are always singletons regardless of where they are provided',
      'Component-level providers are shared across all components',
      'The DI hierarchy is flat; there is no parent-child relationship',
    ],
    correctAnswer:
      'Angular creates an injector tree mirroring the component tree; child injectors inherit from parent injectors, and each level can override providers',
    explanation:
      "Angular's DI system creates a hierarchy of injectors. The root injector is at the top, followed by module-level and component-level injectors. When a dependency is requested, Angular walks up the injector tree until it finds a provider.",
  },
  {
    id: 'ng-q30',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'easy',
    question: "What does providedIn: 'root' mean for an Angular service?",
    options: [
      "The service is available application-wide as a singleton without needing to add it to any module's providers array",
      'The service is only available in the root component',
      'The service is provided in every lazy-loaded module separately',
      'The service must be manually registered in AppModule',
    ],
    correctAnswer:
      "The service is available application-wide as a singleton without needing to add it to any module's providers array",
    explanation:
      "providedIn: 'root' tells Angular to provide the service at the root injector level. This makes it a singleton available everywhere in the application and enables tree-shaking (unused services are removed from the bundle).",
  },
  {
    id: 'ng-q31',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'hard',
    question:
      'What are the differences between useFactory, useValue, and useClass in Angular providers?',
    codeSnippet: `providers: [
  { provide: API_URL, useValue: 'https://api.example.com' },
  { provide: Logger, useClass: BetterLogger },
  { provide: DataService, useFactory: (http: HttpClient) =>
    new DataService(http, environment.apiUrl), deps: [HttpClient] }
]`,
    options: [
      'useValue provides a static value, useClass provides an alternative class, and useFactory provides a function that creates the dependency with custom logic',
      'They all do the same thing but with different syntax',
      'useFactory is for async providers, useClass is for sync, useValue is for primitives only',
      'useClass creates multiple instances, useValue creates singletons, useFactory creates lazy instances',
    ],
    correctAnswer:
      'useValue provides a static value, useClass provides an alternative class, and useFactory provides a function that creates the dependency with custom logic',
    explanation:
      'useValue injects a literal value (string, object, etc.). useClass substitutes one class for another. useFactory calls a function to create the dependency, allowing complex initialization logic with injected dependencies specified via deps.',
  },
  {
    id: 'ng-q32',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What is the difference between Angular modules and standalone components?',
    codeSnippet: `// Module approach
@NgModule({
  declarations: [MyComponent],
  imports: [CommonModule],
})
export class MyModule {}

// Standalone approach
@Component({
  standalone: true,
  imports: [CommonModule],
})
export class MyComponent {}`,
    options: [
      'Standalone components declare their own dependencies via imports without needing an NgModule, simplifying the architecture',
      'Standalone components cannot use services or dependency injection',
      'Modules are required for lazy loading; standalone components cannot be lazy-loaded',
      'Standalone components are only supported in Angular testing environments',
    ],
    correctAnswer:
      'Standalone components declare their own dependencies via imports without needing an NgModule, simplifying the architecture',
    explanation:
      'Standalone components (Angular 14+) can declare their imports directly in the @Component decorator, eliminating the need for NgModules. They can be lazy-loaded, use DI, and compose with other standalone or module-based components.',
  },
  {
    id: 'ng-q33',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What are Angular interceptors used for?',
    codeSnippet: `@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.token)
    });
    return next.handle(authReq);
  }
}`,
    options: [
      'To intercept and transform HTTP requests and responses globally, such as adding auth headers or handling errors',
      'To intercept route navigation and prevent unauthorized access',
      'To intercept component lifecycle events',
      'To intercept and modify template rendering',
    ],
    correctAnswer:
      'To intercept and transform HTTP requests and responses globally, such as adding auth headers or handling errors',
    explanation:
      'HTTP interceptors sit between HttpClient and the server. They can modify outgoing requests (add headers, transform body) and incoming responses (handle errors, cache, log). Multiple interceptors form a chain processed in order.',
  },
  {
    id: 'ng-q34',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'easy',
    question: 'What is the difference between structural and attribute directives in Angular?',
    codeSnippet: `<!-- Structural directive -->
<div *ngIf="isVisible">Shown conditionally</div>

<!-- Attribute directive -->
<div [ngClass]="{'active': isActive}">Styled conditionally</div>`,
    options: [
      'Structural directives change the DOM layout by adding/removing elements; attribute directives change the appearance or behavior of existing elements',
      'Structural directives are faster than attribute directives',
      'Attribute directives can only be used on native HTML elements',
      'Structural directives are deprecated in favor of attribute directives',
    ],
    correctAnswer:
      'Structural directives change the DOM layout by adding/removing elements; attribute directives change the appearance or behavior of existing elements',
    explanation:
      'Structural directives (prefixed with *) alter the DOM structure by adding, removing, or replacing elements (e.g., *ngIf, *ngFor). Attribute directives change the appearance, behavior, or properties of existing elements (e.g., ngClass, ngStyle).',
  },
  {
    id: 'ng-q35',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What is the difference between pure and impure pipes in Angular?',
    codeSnippet: `@Pipe({ name: 'filter', pure: false })
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string) {
    return items.filter(item => item.name.includes(searchText));
  }
}`,
    options: [
      'Pure pipes only re-execute when the input reference changes; impure pipes re-execute on every change detection cycle',
      'Pure pipes are faster because they run asynchronously',
      'Impure pipes cannot accept parameters',
      'Pure pipes are deprecated; all new pipes should be impure',
    ],
    correctAnswer:
      'Pure pipes only re-execute when the input reference changes; impure pipes re-execute on every change detection cycle',
    explanation:
      'Pure pipes (default) only run when Angular detects a pure change to the input (primitive value change or object reference change). Impure pipes (pure: false) run on every change detection cycle, which is useful for filtering arrays but can be expensive.',
  },
  // ─── Batch 2: ng-q36 – ng-q60 ─────────────────────────────────
  {
    id: 'ng-q36',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'What is the purpose of the async pipe in Angular templates?',
    codeSnippet: `<div *ngIf="user$ | async as user">
  {{ user.name }}
</div>`,
    options: [
      'It subscribes to an Observable or Promise and returns the latest emitted value, automatically unsubscribing on destroy',
      'It makes synchronous code run asynchronously',
      'It delays the rendering of the template',
      'It converts template expressions to Promises',
    ],
    correctAnswer:
      'It subscribes to an Observable or Promise and returns the latest emitted value, automatically unsubscribing on destroy',
    explanation:
      'The async pipe subscribes to an Observable or Promise, returns the latest value, and automatically handles unsubscription when the component is destroyed. This prevents memory leaks and reduces boilerplate subscription management.',
  },
  {
    id: 'ng-q37',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'Why is trackBy important when using *ngFor?',
    codeSnippet: `<li *ngFor="let item of items; trackBy: trackById">
  {{ item.name }}
</li>

trackById(index: number, item: Item): number {
  return item.id;
}`,
    options: [
      'It helps Angular identify which items changed, were added, or removed, avoiding unnecessary DOM re-creation',
      'It sorts the list by the tracked property',
      'It filters out duplicate items from the list',
      'It enables two-way binding on each list item',
    ],
    correctAnswer:
      'It helps Angular identify which items changed, were added, or removed, avoiding unnecessary DOM re-creation',
    explanation:
      'Without trackBy, Angular destroys and recreates all DOM elements when the array reference changes. With trackBy, Angular can track items by a unique identifier and only update the DOM elements that actually changed, significantly improving performance.',
  },
  {
    id: 'ng-q38',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What is the difference between ng-template, ng-container, and ng-content?',
    options: [
      'ng-template defines a template that is not rendered by default; ng-container is a grouping element that does not create a DOM node; ng-content is a placeholder for projected content',
      'They are all interchangeable and serve the same purpose',
      'ng-template renders immediately, ng-container renders lazily, ng-content renders on demand',
      'ng-content is for structural directives, ng-template is for content projection, ng-container is deprecated',
    ],
    correctAnswer:
      'ng-template defines a template that is not rendered by default; ng-container is a grouping element that does not create a DOM node; ng-content is a placeholder for projected content',
    explanation:
      '<ng-template> holds template fragments rendered programmatically or by structural directives. <ng-container> groups elements without adding extra DOM nodes. <ng-content> is a slot for content projection from parent to child components.',
  },
  {
    id: 'ng-q39',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'hard',
    question: 'What are the three view encapsulation modes in Angular?',
    codeSnippet: `@Component({
  encapsulation: ViewEncapsulation.ShadowDom
})`,
    options: [
      'Emulated (default, scoped CSS via attributes), ShadowDom (native Shadow DOM), and None (global CSS with no scoping)',
      'Scoped, Global, and Isolated',
      'Module, Component, and Element',
      'Strict, Loose, and None',
    ],
    correctAnswer:
      'Emulated (default, scoped CSS via attributes), ShadowDom (native Shadow DOM), and None (global CSS with no scoping)',
    explanation:
      'Emulated (default) adds unique attributes to elements and scoped CSS selectors. ShadowDom uses native browser Shadow DOM for true encapsulation. None applies styles globally without any scoping, affecting the entire application.',
  },
  {
    id: 'ng-q40',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'hard',
    question: 'What is the difference between markForCheck() and detectChanges()?',
    codeSnippet: `constructor(private cdr: ChangeDetectorRef) {}

// Option A
this.cdr.markForCheck();
// Option B
this.cdr.detectChanges();`,
    options: [
      'markForCheck() marks the component and ancestors as dirty for the next change detection cycle; detectChanges() immediately runs change detection on the component and its children',
      'markForCheck() runs change detection synchronously; detectChanges() schedules it for later',
      'They are identical; markForCheck() is just an alias for detectChanges()',
      'detectChanges() only works with Default strategy; markForCheck() only works with OnPush',
    ],
    correctAnswer:
      'markForCheck() marks the component and ancestors as dirty for the next change detection cycle; detectChanges() immediately runs change detection on the component and its children',
    explanation:
      'markForCheck() flags the component and its ancestors for checking during the next change detection cycle (useful with OnPush). detectChanges() triggers change detection immediately for the component and its descendants, useful for manual control.',
  },
  {
    id: 'ng-q41',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'What is property binding in Angular templates?',
    codeSnippet: `<img [src]="imageUrl" [alt]="imageDescription">
<button [disabled]="isLoading">Submit</button>`,
    options: [
      'Square brackets bind a component property to a DOM element property, updating it when the value changes',
      'Square brackets create two-way bindings between component and DOM',
      'Square brackets are used only for CSS class bindings',
      'Square brackets trigger events on the element',
    ],
    correctAnswer:
      'Square brackets bind a component property to a DOM element property, updating it when the value changes',
    explanation:
      'Property binding ([property]="expression") sets a DOM element property to the value of a component expression. Angular evaluates the expression and updates the property whenever change detection runs. It is one-way: component to view.',
  },
  {
    id: 'ng-q42',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'How do you style the host element of an Angular component?',
    codeSnippet: `:host {
  display: block;
  border: 1px solid #ccc;
}

:host(.active) {
  border-color: blue;
}

:host-context(.dark-theme) {
  background: #333;
}`,
    options: [
      ":host selects the component's host element, :host(.class) matches when the host has that class, and :host-context(.class) matches when an ancestor has that class",
      ':host applies styles to all child elements, not the host',
      ':host-context only works with Shadow DOM encapsulation',
      ':host is deprecated; use component selectors in global styles instead',
    ],
    correctAnswer:
      ":host selects the component's host element, :host(.class) matches when the host has that class, and :host-context(.class) matches when an ancestor has that class",
    explanation:
      ':host targets the component element itself. :host(.class) conditionally styles the host when it has a specific class. :host-context(.class) conditionally styles the host when any ancestor has a specific class. All work with emulated and Shadow DOM encapsulation.',
  },
  {
    id: 'ng-q43',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'hard',
    question:
      "How does zone.js interact with Angular's change detection and what is zoneless Angular?",
    options: [
      'Zone.js auto-triggers change detection after async operations; zoneless Angular uses signals to trigger fine-grained updates without zone.js overhead',
      'Zone.js is required for Angular to function and cannot be removed',
      'Zoneless Angular uses Web Workers to handle change detection',
      'Zone.js only handles HTTP requests; all other async events are handled natively',
    ],
    correctAnswer:
      'Zone.js auto-triggers change detection after async operations; zoneless Angular uses signals to trigger fine-grained updates without zone.js overhead',
    explanation:
      'Zone.js patches async APIs to auto-trigger change detection, which can cause unnecessary checks. Zoneless Angular (experimental) removes zone.js and relies on signals to precisely notify Angular which parts of the UI need updating, improving performance.',
  },
  {
    id: 'ng-q44',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'easy',
    question: 'How do you make an HTTP GET request in Angular?',
    codeSnippet: `constructor(private http: HttpClient) {}

getUsers() {
  return this.http.get<User[]>('/api/users');
}`,
    options: [
      'Inject HttpClient and call its get() method, which returns an Observable of the response',
      'Use the built-in fetch() function wrapped in a service',
      'Import axios and use it directly in components',
      "Use XMLHttpRequest with Angular's RequestFactory",
    ],
    correctAnswer:
      'Inject HttpClient and call its get() method, which returns an Observable of the response',
    explanation:
      "Angular's HttpClient (from @angular/common/http) provides typed HTTP methods that return Observables. The get<T>() method makes a GET request and the generic parameter types the response. The request is lazy and only fires when subscribed.",
  },
  {
    id: 'ng-q45',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'What is the difference between switchMap, mergeMap, concatMap, and exhaustMap?',
    codeSnippet: `// Search with type-ahead
this.searchInput.valueChanges.pipe(
  debounceTime(300),
  switchMap(term => this.searchService.search(term))
).subscribe(results => this.results = results);`,
    options: [
      'switchMap cancels previous inner observables; mergeMap runs all concurrently; concatMap queues them sequentially; exhaustMap ignores new emissions until current completes',
      'They all behave the same but have different names for readability',
      'switchMap is for HTTP, mergeMap is for WebSockets, concatMap is for timers, exhaustMap is for events',
      'switchMap runs synchronously, the others run asynchronously',
    ],
    correctAnswer:
      'switchMap cancels previous inner observables; mergeMap runs all concurrently; concatMap queues them sequentially; exhaustMap ignores new emissions until current completes',
    explanation:
      'switchMap unsubscribes from the previous inner observable when a new value arrives (ideal for search). mergeMap subscribes to all concurrently. concatMap waits for each to complete before subscribing to the next. exhaustMap ignores new values while one is active.',
  },
  {
    id: 'ng-q46',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'How do you handle HTTP errors in Angular?',
    codeSnippet: `this.http.get<User[]>('/api/users').pipe(
  catchError(error => {
    console.error('Request failed:', error.message);
    return of([]);
  })
).subscribe(users => this.users = users);`,
    options: [
      'Use the catchError RxJS operator to intercept errors in the Observable pipeline and return a fallback value or re-throw',
      'Wrap the subscribe call in a try-catch block',
      'Use the .catch() method directly on HttpClient',
      "Errors are automatically handled by Angular's error handler",
    ],
    correctAnswer:
      'Use the catchError RxJS operator to intercept errors in the Observable pipeline and return a fallback value or re-throw',
    explanation:
      'catchError intercepts errors in the Observable stream. It can return a fallback Observable (like of([]) for an empty array) to keep the stream alive, or re-throw using throwError. You can also use the error callback in subscribe() but catchError is more composable.',
  },
  {
    id: 'ng-q47',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'hard',
    question: 'How do you implement retry logic for failed HTTP requests?',
    codeSnippet: `this.http.get('/api/data').pipe(
  retry({ count: 3, delay: (error, retryCount) =>
    timer(retryCount * 1000)
  }),
  catchError(err => {
    return throwError(() => new Error('Failed after 3 retries'));
  })
);`,
    options: [
      'Use the retry or retryWhen operator to automatically re-subscribe to the failed Observable with optional delay and count configuration',
      'Call the HTTP method again manually inside the error callback',
      'Angular automatically retries failed requests three times by default',
      'Use an interceptor that creates a retry loop with setTimeout',
    ],
    correctAnswer:
      'Use the retry or retryWhen operator to automatically re-subscribe to the failed Observable with optional delay and count configuration',
    explanation:
      'The retry operator re-subscribes to the source Observable when an error occurs. You can configure the count (max retries) and delay (backoff strategy). This is declarative and composable, integrating cleanly with other RxJS operators.',
  },
  {
    id: 'ng-q48',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'How do you add authentication headers to all HTTP requests using an interceptor?',
    codeSnippet: `export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();
  const authReq = req.clone({
    setHeaders: { Authorization: \`Bearer \${token}\` }
  });
  return next(authReq);
};`,
    options: [
      'Create a functional or class-based interceptor that clones the request with the auth header and passes it to the next handler',
      'Modify the original request object directly before sending',
      'Set a global header on the HttpClient instance',
      'Add the header in every component that makes HTTP requests',
    ],
    correctAnswer:
      'Create a functional or class-based interceptor that clones the request with the auth header and passes it to the next handler',
    explanation:
      'HTTP interceptors modify requests by cloning them (requests are immutable) and adding headers. Functional interceptors (Angular 15+) use inject() for dependencies. The interceptor is registered globally and applies to all HttpClient requests.',
  },
  {
    id: 'ng-q49',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'hard',
    question: 'How do you cache HTTP responses using shareReplay?',
    codeSnippet: `private config$ = this.http.get<Config>('/api/config').pipe(
  shareReplay({ bufferSize: 1, refCount: true })
);

getConfig(): Observable<Config> {
  return this.config$;
}`,
    options: [
      'shareReplay multicasts the Observable and replays the last N emissions to new subscribers, with refCount controlling auto-unsubscription when all subscribers leave',
      'shareReplay creates a deep copy of the response for each subscriber',
      'shareReplay only works with POST requests',
      'shareReplay stores the response in localStorage automatically',
    ],
    correctAnswer:
      'shareReplay multicasts the Observable and replays the last N emissions to new subscribers, with refCount controlling auto-unsubscription when all subscribers leave',
    explanation:
      'shareReplay({ bufferSize: 1, refCount: true }) caches the latest HTTP response and shares it with all subscribers. New subscribers receive the cached value immediately. refCount: true ensures the source is unsubscribed when all subscribers unsubscribe, preventing memory leaks.',
  },
  {
    id: 'ng-q50',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'How do you implement polling (periodic data fetching) in Angular?',
    codeSnippet: `this.data$ = timer(0, 5000).pipe(
  switchMap(() => this.http.get<Data>('/api/data')),
  retry(3),
  share()
);`,
    options: [
      'Use timer or interval to create a periodic Observable, then switchMap to the HTTP request on each tick',
      'Use setInterval inside ngOnInit and make HTTP calls in the callback',
      "Angular's HttpClient has a built-in poll() method",
      'Use a recursive setTimeout in the subscribe callback',
    ],
    correctAnswer:
      'Use timer or interval to create a periodic Observable, then switchMap to the HTTP request on each tick',
    explanation:
      'timer(0, 5000) emits immediately then every 5 seconds. switchMap cancels any pending request before starting a new one. This is cleaner than setInterval because it integrates with RxJS error handling, retry, and automatic cleanup on unsubscribe.',
  },
  {
    id: 'ng-q51',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'easy',
    question: 'How do you create a basic reactive form in Angular?',
    codeSnippet: `form = this.fb.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
});

constructor(private fb: FormBuilder) {}`,
    options: [
      'Inject FormBuilder and use its group() method to create a FormGroup with FormControls and validators',
      'Use ngModel with [(ngModel)] in the template and FormsModule',
      'Create form controls directly in the HTML template without any TypeScript',
      'Use document.forms to access form data natively',
    ],
    correctAnswer:
      'Inject FormBuilder and use its group() method to create a FormGroup with FormControls and validators',
    explanation:
      'FormBuilder simplifies creating reactive forms. The group() method creates a FormGroup, each key becomes a FormControl. The array syntax [defaultValue, validatorsOrOptions] sets initial values and validators. Requires ReactiveFormsModule.',
  },
  {
    id: 'ng-q52',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'How do you use FormArray for dynamic form fields?',
    codeSnippet: `form = this.fb.group({
  name: [''],
  phones: this.fb.array([this.fb.control('')])
});

addPhone() {
  (this.form.get('phones') as FormArray).push(this.fb.control(''));
}

removePhone(index: number) {
  (this.form.get('phones') as FormArray).removeAt(index);
}`,
    options: [
      'FormArray manages a dynamic list of FormControls or FormGroups that can be added to or removed at runtime',
      'FormArray is only for displaying static arrays of data',
      'FormArray automatically generates input fields in the template',
      'FormArray is deprecated; use multiple FormGroups instead',
    ],
    correctAnswer:
      'FormArray manages a dynamic list of FormControls or FormGroups that can be added to or removed at runtime',
    explanation:
      'FormArray is used when the number of form controls is dynamic (e.g., phone numbers, addresses). You can push() new controls, removeAt() existing ones, and iterate over them with *ngFor in the template using the controls property.',
  },
  {
    id: 'ng-q53',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'How do you create nested FormGroups?',
    codeSnippet: `form = this.fb.group({
  personal: this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  }),
  address: this.fb.group({
    street: [''],
    city: [''],
    zip: ['', Validators.pattern(/^\\d{5}$/)],
  }),
});`,
    options: [
      'Nest fb.group() calls inside a parent fb.group() to create hierarchical form structures with their own validation',
      'Use dot notation in control names like "personal.firstName"',
      'Nested forms require separate FormBuilder instances',
      'Angular does not support nested form groups natively',
    ],
    correctAnswer:
      'Nest fb.group() calls inside a parent fb.group() to create hierarchical form structures with their own validation',
    explanation:
      'FormGroups can be nested to represent complex data structures. Each nested group can have its own validators. In templates, use formGroupName directive to bind to nested groups and formControlName for their controls.',
  },
  {
    id: 'ng-q54',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'hard',
    question: 'How do you create a custom validator in Angular reactive forms?',
    codeSnippet: `function forbiddenName(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

// Usage
name: ['', [Validators.required, forbiddenName(/admin/i)]]`,
    options: [
      'A custom validator is a function that takes an AbstractControl and returns a ValidationErrors object if invalid, or null if valid',
      'Custom validators must extend a base Validator class',
      'Custom validators are defined as Angular services with @Injectable()',
      'Custom validators can only be used with template-driven forms',
    ],
    correctAnswer:
      'A custom validator is a function that takes an AbstractControl and returns a ValidationErrors object if invalid, or null if valid',
    explanation:
      'Custom validators are functions conforming to the ValidatorFn interface: they receive an AbstractControl and return null (valid) or a ValidationErrors object (invalid). Factory functions can create parameterized validators. They work with both reactive and template-driven forms.',
  },
  {
    id: 'ng-q55',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'hard',
    question: 'How do you create an async validator in Angular?',
    codeSnippet: `function uniqueUsername(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return userService.checkUsername(control.value).pipe(
      map(exists => exists ? { usernameTaken: true } : null),
      catchError(() => of(null))
    );
  };
}

// Usage
username: ['', [Validators.required], [uniqueUsername(this.userService)]]`,
    options: [
      'An async validator returns an Observable or Promise of ValidationErrors or null, and is passed as the third argument to FormControl',
      'Async validators are regular validators wrapped in setTimeout',
      'Async validators run before synchronous validators',
      'Async validators must be registered globally in the AppModule',
    ],
    correctAnswer:
      'An async validator returns an Observable or Promise of ValidationErrors or null, and is passed as the third argument to FormControl',
    explanation:
      'Async validators conform to AsyncValidatorFn, returning an Observable<ValidationErrors | null> or Promise. They are passed as the third argument in the FormControl constructor (after sync validators). Angular waits for all sync validators to pass before running async validators.',
  },
  {
    id: 'ng-q56',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'hard',
    question: 'How do you implement cross-field validation in Angular?',
    codeSnippet: `const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordMismatch: true };
};

form = this.fb.group({
  password: ['', Validators.required],
  confirmPassword: ['', Validators.required],
}, { validators: passwordMatchValidator });`,
    options: [
      'Apply a validator to the parent FormGroup that compares values of multiple child controls',
      'Add the same validator to both individual controls',
      'Use ngModelGroup in the template for cross-field validation',
      'Cross-field validation is only possible with custom directives',
    ],
    correctAnswer:
      'Apply a validator to the parent FormGroup that compares values of multiple child controls',
    explanation:
      'Cross-field validators are applied at the FormGroup level via the validators option. The validator receives the FormGroup as its argument and can access child controls via get(). Errors are set on the group, not individual controls.',
  },
  {
    id: 'ng-q57',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'What are the different form status values in Angular?',
    codeSnippet: `<form [formGroup]="form">
  <div *ngIf="form.status === 'INVALID'">Fix errors</div>
  <div *ngIf="form.status === 'PENDING'">Validating...</div>
  <button [disabled]="form.status !== 'VALID'">Submit</button>
</form>`,
    options: [
      'VALID (all validators pass), INVALID (any validator fails), PENDING (async validators running), and DISABLED (control is disabled)',
      'VALID, INVALID, and ERROR',
      'OK, FAIL, and LOADING',
      'CLEAN, DIRTY, TOUCHED, and UNTOUCHED',
    ],
    correctAnswer:
      'VALID (all validators pass), INVALID (any validator fails), PENDING (async validators running), and DISABLED (control is disabled)',
    explanation:
      'Angular forms have four statuses: VALID, INVALID, PENDING (while async validators run), and DISABLED. These apply to FormControls, FormGroups, and FormArrays. Separate from status, controls also track dirty/pristine and touched/untouched states.',
  },
  {
    id: 'ng-q58',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'What does the updateOn option do in Angular reactive forms?',
    codeSnippet: `name = new FormControl('', {
  validators: [Validators.required, Validators.minLength(3)],
  updateOn: 'blur'
});

form = this.fb.group({
  email: ['']
}, { updateOn: 'submit' });`,
    options: [
      'It controls when the form value and validity are updated: on every change (default), on blur, or on form submit',
      'It determines when the form is submitted to the server',
      'It controls when the form is reset',
      'It sets the debounce time for form value changes',
    ],
    correctAnswer:
      'It controls when the form value and validity are updated: on every change (default), on blur, or on form submit',
    explanation:
      'updateOn configures when Angular updates the form model and runs validators. "change" (default) updates on every keystroke. "blur" updates when the field loses focus. "submit" updates only when the form is submitted. This reduces validation noise and improves performance.',
  },
  {
    id: 'ng-q59',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'hard',
    question: 'How do you use @ViewChildren to query multiple elements?',
    codeSnippet: `@ViewChildren('listItem') items!: QueryList<ElementRef>;

ngAfterViewInit() {
  this.items.changes.subscribe(() => {
    console.log('Items changed:', this.items.length);
  });
}`,
    options: [
      'ViewChildren returns a QueryList that updates dynamically as elements are added/removed, and emits changes via its changes Observable',
      'ViewChildren returns a static array that never updates after initialization',
      'ViewChildren can only query component instances, not native elements',
      'ViewChildren queries are resolved in the constructor',
    ],
    correctAnswer:
      'ViewChildren returns a QueryList that updates dynamically as elements are added/removed, and emits changes via its changes Observable',
    explanation:
      '@ViewChildren queries all matching elements in the template and returns a QueryList. Unlike static arrays, QueryList updates automatically when the DOM changes (e.g., *ngFor adds items) and notifies via its changes Observable.',
  },
  {
    id: 'ng-q60',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'How do you pass the event object in Angular event bindings?',
    codeSnippet: `<input (keyup)="onKey($event)">
<button (click)="onClick($event)">Click</button>`,
    options: [
      'Use $event as the argument in the template expression to access the native DOM event object',
      'The event object is automatically available as a variable called "event" in the handler',
      'You must import the Event class from @angular/core',
      'Use event.target in the template directly without passing it to the handler',
    ],
    correctAnswer:
      'Use $event as the argument in the template expression to access the native DOM event object',
    explanation:
      'Angular exposes the DOM event object as $event in template statements. You pass it to the handler method to access event properties like target.value, preventDefault(), etc. For custom events via @Output(), $event contains the emitted payload.',
  },
  // ─── Batch 3: ng-q61 – ng-q86 ─────────────────────────────────
  {
    id: 'ng-q61',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'What are Angular route guards and what types are available?',
    codeSnippet: `export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  if (auth.isLoggedIn()) return true;
  return inject(Router).createUrlTree(['/login']);
};

// Route config
{ path: 'admin', canActivate: [authGuard], component: AdminComponent }`,
    options: [
      'Guards control route access: CanActivate (before activation), CanDeactivate (before leaving), Resolve (pre-fetch data), CanMatch (before loading), and CanActivateChild (for child routes)',
      'Guards only prevent navigation; they cannot redirect to other routes',
      'There are only two types: CanActivate and CanDeactivate',
      'Guards are deprecated in favor of interceptors for route protection',
    ],
    correctAnswer:
      'Guards control route access: CanActivate (before activation), CanDeactivate (before leaving), Resolve (pre-fetch data), CanMatch (before loading), and CanActivateChild (for child routes)',
    explanation:
      'Angular provides several guard types: CanActivate checks before entering, CanDeactivate checks before leaving (e.g., unsaved changes), Resolve pre-fetches data, CanMatch determines if a route should be considered, and CanActivateChild protects child routes.',
  },
  {
    id: 'ng-q62',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What is a resolver in Angular routing?',
    codeSnippet: `export const userResolver: ResolveFn<User> = (route) => {
  return inject(UserService).getUser(route.paramMap.get('id')!);
};

// Route config
{ path: 'user/:id', resolve: { user: userResolver }, component: UserComponent }

// In component
constructor(private route: ActivatedRoute) {
  this.user = this.route.snapshot.data['user'];
}`,
    options: [
      'A resolver pre-fetches data before the route is activated, making it available in the component via ActivatedRoute.data',
      'A resolver validates route parameters before navigation',
      'A resolver caches all route data in memory',
      'A resolver only works with lazy-loaded modules',
    ],
    correctAnswer:
      'A resolver pre-fetches data before the route is activated, making it available in the component via ActivatedRoute.data',
    explanation:
      'Resolvers fetch data before a route activates, ensuring the component has the required data when it renders. The resolved data is available via ActivatedRoute.snapshot.data or the data Observable. Navigation waits until the resolver completes.',
  },
  {
    id: 'ng-q63',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'easy',
    question: 'How do parent and child components communicate in Angular?',
    options: [
      '@Input() passes data from parent to child; @Output() with EventEmitter sends events from child to parent',
      'Components can only communicate through a shared service',
      'Parent components directly access child properties via class inheritance',
      'Angular uses a global event bus for all component communication',
    ],
    correctAnswer:
      '@Input() passes data from parent to child; @Output() with EventEmitter sends events from child to parent',
    explanation:
      '@Input() binds a parent property to a child property (parent-to-child). @Output() paired with EventEmitter lets the child emit events that the parent listens to (child-to-parent). For unrelated components, shared services with Observables are the standard approach.',
  },
  {
    id: 'ng-q64',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'How do you create a custom structural directive in Angular?',
    codeSnippet: `@Directive({ selector: '[appUnless]' })
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}
}`,
    options: [
      'Inject TemplateRef and ViewContainerRef, then use createEmbeddedView() to add or clear() to remove the template from the DOM',
      'Extend the NgIf directive and override its behavior',
      'Use Renderer2 to add/remove DOM elements directly',
      'Create a component with an ng-content slot and conditionally show/hide it',
    ],
    correctAnswer:
      'Inject TemplateRef and ViewContainerRef, then use createEmbeddedView() to add or clear() to remove the template from the DOM',
    explanation:
      'Custom structural directives receive TemplateRef (the template to render) and ViewContainerRef (where to render it). createEmbeddedView() stamps the template into the DOM, and clear() removes it. The @Input setter reacts to condition changes.',
  },
  {
    id: 'ng-q65',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'medium',
    question: "What happens during Angular's default change detection cycle?",
    options: [
      'Angular traverses the entire component tree from root to leaves, checking every binding in every component for changes',
      'Angular only checks components that have pending events',
      'Angular diffs a virtual DOM against the real DOM',
      'Angular checks only the component that triggered the change',
    ],
    correctAnswer:
      'Angular traverses the entire component tree from root to leaves, checking every binding in every component for changes',
    explanation:
      'With the default change detection strategy, Angular walks the entire component tree from root downward on every detection cycle. It compares the current value of each binding against its previous value and updates the DOM if they differ.',
  },
  {
    id: 'ng-q66',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'What is interpolation in Angular templates?',
    codeSnippet: `<h1>Welcome, {{ user.name | uppercase }}</h1>
<p>Total: {{ price * quantity | currency }}</p>`,
    options: [
      'Double curly braces {{ }} embed component expressions into the template, converting the result to a string for display',
      'Double curly braces create two-way bindings',
      'Interpolation only works with string variables',
      'Interpolation triggers a new change detection cycle for each expression',
    ],
    correctAnswer:
      'Double curly braces {{ }} embed component expressions into the template, converting the result to a string for display',
    explanation:
      'Interpolation ({{ expression }}) evaluates the expression in the component context and inserts the string result into the DOM. It supports pipes (|) for formatting. It is one-way binding (component to view) and updates on change detection.',
  },
  {
    id: 'ng-q67',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'hard',
    question: 'How does ng-content select specific projected content?',
    codeSnippet: `<!-- Card component template -->
<div class="card">
  <div class="header">
    <ng-content select="[card-header]"></ng-content>
  </div>
  <div class="body">
    <ng-content></ng-content>
  </div>
  <div class="footer">
    <ng-content select=".card-footer"></ng-content>
  </div>
</div>

<!-- Usage -->
<app-card>
  <h2 card-header>Title</h2>
  <p>Body content</p>
  <div class="card-footer">Footer</div>
</app-card>`,
    options: [
      'The select attribute on ng-content uses CSS selectors to match specific projected elements to specific slots',
      'ng-content can only project all content into a single slot',
      'select uses Angular-specific query syntax, not CSS selectors',
      'Multiple ng-content elements are not supported in one component',
    ],
    correctAnswer:
      'The select attribute on ng-content uses CSS selectors to match specific projected elements to specific slots',
    explanation:
      'ng-content with select uses CSS selectors (attributes, classes, element names) to route projected content to specific slots. An ng-content without select acts as a catch-all for unmatched content. This enables multi-slot content projection.',
  },
  {
    id: 'ng-q68',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What is the purpose of ng-container in Angular?',
    codeSnippet: `<!-- Without ng-container (adds an extra div) -->
<div *ngIf="show">
  <span *ngFor="let item of items">{{ item }}</span>
</div>

<!-- With ng-container (no extra DOM element) -->
<ng-container *ngIf="show">
  <span *ngFor="let item of items">{{ item }}</span>
</ng-container>`,
    options: [
      'ng-container is a grouping element that does not add an extra DOM node, useful for applying structural directives without wrapper elements',
      'ng-container creates a Shadow DOM boundary',
      'ng-container lazy-loads its content',
      'ng-container is the same as a div but with Angular-specific styling',
    ],
    correctAnswer:
      'ng-container is a grouping element that does not add an extra DOM node, useful for applying structural directives without wrapper elements',
    explanation:
      '<ng-container> lets you apply structural directives without introducing an extra DOM element. It is rendered as a comment in the DOM. This is useful when you need *ngIf or *ngFor without affecting your CSS layout or DOM structure.',
  },
  {
    id: 'ng-q69',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'What is the effect() function in Angular signals and when should you use it?',
    codeSnippet: `count = signal(0);

constructor() {
  effect(() => {
    console.log('Count changed:', this.count());
    localStorage.setItem('count', this.count().toString());
  });
}`,
    options: [
      'effect() creates a side effect that runs automatically whenever any signal it reads changes, useful for logging, persistence, or DOM manipulation',
      'effect() is the same as computed() but for async operations',
      'effect() replaces ngOnChanges for all input tracking',
      'effect() runs once during initialization and never again',
    ],
    correctAnswer:
      'effect() creates a side effect that runs automatically whenever any signal it reads changes, useful for logging, persistence, or DOM manipulation',
    explanation:
      'effect() registers a callback that re-runs whenever any signal read inside it changes. Unlike computed(), it does not return a value -- it performs side effects like logging, API calls, or syncing to localStorage. It runs in an injection context by default.',
  },
  {
    id: 'ng-q70',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    question: 'What is the difference between signal.set() and signal.update()?',
    codeSnippet: `count = signal(0);

// Set to a specific value
this.count.set(5);

// Update based on current value
this.count.update(current => current + 1);`,
    options: [
      'set() replaces the value directly; update() takes a function that receives the current value and returns the new value',
      'set() is synchronous and update() is asynchronous',
      'set() triggers change detection but update() does not',
      'update() validates the new value while set() does not',
    ],
    correctAnswer:
      'set() replaces the value directly; update() takes a function that receives the current value and returns the new value',
    explanation:
      "signal.set(newValue) directly replaces the signal value. signal.update(fn) passes the current value to a callback and uses the return value as the new value. update() is preferred when the new value depends on the current one, similar to React's setState with a callback.",
  },
  {
    id: 'ng-q71',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question:
      "How does Angular's OnPush change detection interact with Observables and the async pipe?",
    codeSnippet: `@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`<div>{{ data$ | async }}</div>\`
})
export class MyComponent {
  data$ = this.http.get('/api/data');
}`,
    options: [
      'The async pipe automatically calls markForCheck() when the Observable emits, triggering change detection even with OnPush',
      'OnPush components cannot use Observables; they must convert to Promises',
      'The async pipe does not work with OnPush and requires manual change detection',
      'OnPush ignores all Observable emissions by default',
    ],
    correctAnswer:
      'The async pipe automatically calls markForCheck() when the Observable emits, triggering change detection even with OnPush',
    explanation:
      'The async pipe internally calls ChangeDetectorRef.markForCheck() whenever the Observable emits a new value. This makes it work seamlessly with OnPush components, as it properly marks the component for checking in the next change detection cycle.',
  },
  {
    id: 'ng-q72',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'easy',
    question: "What HTTP methods are available on Angular's HttpClient?",
    options: [
      'get(), post(), put(), patch(), delete(), head(), options(), and jsonp()',
      'Only get() and post() are available; others require raw XMLHttpRequest',
      'fetch(), send(), and request()',
      'get(), post(), and put() only',
    ],
    correctAnswer: 'get(), post(), put(), patch(), delete(), head(), options(), and jsonp()',
    explanation:
      "Angular's HttpClient provides typed methods for all standard HTTP verbs plus jsonp(). Each returns an Observable. The generic request() method supports custom HTTP methods. All methods accept options for headers, params, response type, etc.",
  },
  {
    id: 'ng-q73',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'How do you pass query parameters with HttpClient?',
    codeSnippet: `// Using HttpParams
const params = new HttpParams()
  .set('page', '1')
  .set('limit', '10')
  .set('sort', 'name');

this.http.get('/api/users', { params });

// Or inline
this.http.get('/api/users', {
  params: { page: '1', limit: '10' }
});`,
    options: [
      'Pass an HttpParams object or a plain object to the params option of the HTTP method',
      'Append query parameters manually to the URL string',
      'Use a special QueryBuilder service from @angular/common',
      'Query parameters are set globally in the HttpClientModule configuration',
    ],
    correctAnswer:
      'Pass an HttpParams object or a plain object to the params option of the HTTP method',
    explanation:
      'HttpClient accepts query parameters via the params option. You can use HttpParams (immutable, chainable) or a simple key-value object. HttpParams supports appending multiple values for the same key via append().',
  },
  {
    id: 'ng-q74',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'hard',
    question: 'How do you test HTTP requests in Angular using HttpClientTestingModule?',
    codeSnippet: `it('should fetch users', () => {
  const mockUsers = [{ id: 1, name: 'Alice' }];

  service.getUsers().subscribe(users => {
    expect(users).toEqual(mockUsers);
  });

  const req = httpMock.expectOne('/api/users');
  expect(req.request.method).toBe('GET');
  req.flush(mockUsers);
});`,
    options: [
      'Use HttpClientTestingModule and HttpTestingController to intercept requests, assert on them, and flush mock responses',
      'Mock the HttpClient class directly with jasmine.createSpyObj',
      'Use a real HTTP server in test mode',
      'Angular tests cannot verify HTTP requests',
    ],
    correctAnswer:
      'Use HttpClientTestingModule and HttpTestingController to intercept requests, assert on them, and flush mock responses',
    explanation:
      'HttpClientTestingModule replaces HttpClient with a testing backend. HttpTestingController.expectOne() verifies exactly one request was made to a URL. flush() provides a mock response. verify() at the end ensures no unexpected requests remain.',
  },
  {
    id: 'ng-q75',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'medium',
    question:
      'What is the difference between using subscribe() and the async pipe for handling Observables?',
    codeSnippet: `// Manual subscription
ngOnInit() {
  this.sub = this.dataService.getData().subscribe(
    data => this.data = data
  );
}
ngOnDestroy() { this.sub.unsubscribe(); }

// Async pipe
// template: {{ data$ | async }}
data$ = this.dataService.getData();`,
    options: [
      'The async pipe handles subscription and unsubscription automatically; manual subscribe requires explicit unsubscription in ngOnDestroy to prevent memory leaks',
      'subscribe() is faster than the async pipe',
      'The async pipe cannot handle errors from Observables',
      'subscribe() and async pipe behave identically in all cases',
    ],
    correctAnswer:
      'The async pipe handles subscription and unsubscription automatically; manual subscribe requires explicit unsubscription in ngOnDestroy to prevent memory leaks',
    explanation:
      'The async pipe is preferred because it automatically subscribes when the component renders and unsubscribes when it is destroyed. Manual subscription requires storing the subscription and calling unsubscribe() in ngOnDestroy. Forgetting to unsubscribe causes memory leaks.',
  },
  {
    id: 'ng-q76',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'easy',
    question: 'What does HttpClient.get() return and when does the request actually fire?',
    options: [
      'It returns a cold Observable; the HTTP request only fires when something subscribes to it',
      'It returns a Promise that fires immediately',
      'It returns a hot Observable that fires immediately on creation',
      'It returns the response data directly as a synchronous value',
    ],
    correctAnswer:
      'It returns a cold Observable; the HTTP request only fires when something subscribes to it',
    explanation:
      'HttpClient methods return cold Observables, meaning the HTTP request is not sent until subscribe() is called (or the async pipe subscribes in the template). Each new subscription creates a new HTTP request. This is a key difference from Promises, which execute eagerly.',
  },
  {
    id: 'ng-q77',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'easy',
    question: 'What is the difference between ReactiveFormsModule and FormsModule?',
    options: [
      'ReactiveFormsModule provides FormControl, FormGroup, and FormBuilder for programmatic forms; FormsModule provides ngModel for template-driven forms',
      'ReactiveFormsModule is for Angular 2+, FormsModule is for AngularJS only',
      'FormsModule supports validation, ReactiveFormsModule does not',
      'They provide the same functionality and are interchangeable',
    ],
    correctAnswer:
      'ReactiveFormsModule provides FormControl, FormGroup, and FormBuilder for programmatic forms; FormsModule provides ngModel for template-driven forms',
    explanation:
      'ReactiveFormsModule is for reactive forms: form model is defined in TypeScript with explicit FormControl/FormGroup objects. FormsModule is for template-driven forms: model is defined in the template with ngModel directives. Reactive forms are more scalable and testable.',
  },
  {
    id: 'ng-q78',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'easy',
    question: 'How do you display validation errors in Angular reactive forms?',
    codeSnippet: `<input formControlName="email">
<div *ngIf="form.get('email')?.hasError('required') && form.get('email')?.touched">
  Email is required.
</div>
<div *ngIf="form.get('email')?.hasError('email')">
  Please enter a valid email.
</div>`,
    options: [
      'Check for specific errors using hasError() on the control, typically combined with touched or dirty state to avoid showing errors immediately',
      'Angular automatically displays validation error messages below inputs',
      'Use a special <error> element that Angular provides',
      'Validation errors can only be displayed using a custom pipe',
    ],
    correctAnswer:
      'Check for specific errors using hasError() on the control, typically combined with touched or dirty state to avoid showing errors immediately',
    explanation:
      'Use control.hasError("validatorName") to check for specific validation errors. Combine with control.touched or control.dirty to show errors only after user interaction. The errors object (control.errors) contains all current validation errors.',
  },
  {
    id: 'ng-q79',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'How do you build dynamic forms in Angular?',
    codeSnippet: `buildForm(fields: FieldConfig[]) {
  const group: Record<string, FormControl> = {};
  fields.forEach(field => {
    group[field.name] = new FormControl(
      field.defaultValue,
      field.validators
    );
  });
  this.form = new FormGroup(group);
}`,
    options: [
      'Programmatically create FormControls and FormGroups based on a configuration array or JSON schema at runtime',
      'Use *ngFor with ngModel to create template-driven form fields dynamically',
      'Angular does not support dynamic form generation',
      'Use Web Components inside Angular forms for dynamic fields',
    ],
    correctAnswer:
      'Programmatically create FormControls and FormGroups based on a configuration array or JSON schema at runtime',
    explanation:
      'Dynamic forms are built by iterating over a configuration (array of field definitions) and creating FormControls programmatically. Each config entry specifies the control name, type, default value, and validators. The template uses *ngFor to render the corresponding inputs.',
  },
  {
    id: 'ng-q80',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'easy',
    question: 'What is the purpose of Angular pipes?',
    codeSnippet: `<p>{{ birthday | date:'fullDate' | uppercase }}</p>
<p>{{ price | currency:'USD':'symbol':'1.2-2' }}</p>
<p>{{ longText | slice:0:100 }}...</p>`,
    options: [
      'Pipes transform displayed values in templates without modifying the underlying data, and can be chained',
      'Pipes send data between components like Unix pipes',
      'Pipes are used for HTTP request/response transformation',
      'Pipes replace Angular services for data transformation',
    ],
    correctAnswer:
      'Pipes transform displayed values in templates without modifying the underlying data, and can be chained',
    explanation:
      'Pipes transform data for display in templates. Built-in pipes include date, currency, uppercase, lowercase, slice, json, and async. Custom pipes implement PipeTransform. Pipes can be chained (the output of one feeds the next) and accept parameters after colons.',
  },
  {
    id: 'ng-q81',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'How does lazy loading work in Angular?',
    codeSnippet: `const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component')
      .then(m => m.AdminComponent)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/routes')
      .then(m => m.DASHBOARD_ROUTES)
  }
];`,
    options: [
      'Lazy loading defers loading of route modules/components until the user navigates to them, reducing the initial bundle size',
      'Lazy loading pre-loads all routes in the background after the app starts',
      'Lazy loading only works with NgModules, not standalone components',
      'Lazy loading delays the rendering of components but loads all code upfront',
    ],
    correctAnswer:
      'Lazy loading defers loading of route modules/components until the user navigates to them, reducing the initial bundle size',
    explanation:
      'Lazy loading uses dynamic import() to split code into separate bundles loaded on demand when a route is activated. loadComponent lazy-loads standalone components; loadChildren lazy-loads modules or route arrays. This significantly reduces initial load time.',
  },
  {
    id: 'ng-q82',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'How do you implement a custom attribute directive in Angular?',
    codeSnippet: `@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
  @Input() appHighlight = 'yellow';
  @Input() defaultColor = '';

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight || this.defaultColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

  constructor(private el: ElementRef) {}
}`,
    options: [
      'Create a class with @Directive, inject ElementRef for DOM access, use @HostListener for events, and @Input for configuration',
      'Extend the HTMLElement class and register it as a custom element',
      'Use @Component without a template to create attribute directives',
      'Attribute directives can only be created using the Angular CLI generator and cannot be written manually',
    ],
    correctAnswer:
      'Create a class with @Directive, inject ElementRef for DOM access, use @HostListener for events, and @Input for configuration',
    explanation:
      'Custom attribute directives use the @Directive decorator with a CSS selector (typically an attribute). ElementRef provides access to the host DOM element. @HostListener responds to events, and @Input receives configuration from the template.',
  },
  {
    id: 'ng-q83',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'easy',
    question: 'What does *ngFor do in Angular?',
    codeSnippet: `<ul>
  <li *ngFor="let user of users; let i = index; let odd = odd"
      [class.highlight]="odd">
    {{ i + 1 }}. {{ user.name }}
  </li>
</ul>`,
    options: [
      'It repeats the host element for each item in a collection, providing local variables like index, first, last, even, and odd',
      'It creates a for loop in the component class',
      'It conditionally shows elements based on a numeric range',
      'It only works with arrays of strings, not objects',
    ],
    correctAnswer:
      'It repeats the host element for each item in a collection, providing local variables like index, first, last, even, and odd',
    explanation:
      '*ngFor is a structural directive that iterates over a collection and renders the element for each item. It exports local variables: index (position), first/last (boolean), even/odd (boolean), and count (total items).',
  },
  {
    id: 'ng-q84',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'medium',
    question: "How does Angular's ngSwitch structural directive work?",
    codeSnippet: `<div [ngSwitch]="status">
  <p *ngSwitchCase="'active'">User is active</p>
  <p *ngSwitchCase="'inactive'">User is inactive</p>
  <p *ngSwitchCase="'pending'">Awaiting verification</p>
  <p *ngSwitchDefault>Unknown status</p>
</div>`,
    options: [
      '[ngSwitch] evaluates an expression, *ngSwitchCase renders the matching case, and *ngSwitchDefault renders when no case matches',
      'ngSwitch works like a JavaScript switch with fall-through behavior',
      'All switch cases are rendered simultaneously and hidden with CSS',
      'ngSwitch only works with numeric values',
    ],
    correctAnswer:
      '[ngSwitch] evaluates an expression, *ngSwitchCase renders the matching case, and *ngSwitchDefault renders when no case matches',
    explanation:
      '[ngSwitch] is an attribute directive that evaluates the expression. *ngSwitchCase is a structural directive that conditionally includes the element when its value matches. *ngSwitchDefault renders if no case matches. Unlike JavaScript switch, there is no fall-through.',
  },
  {
    id: 'ng-q85',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'How do you listen for keyboard events with specific key combinations in Angular?',
    codeSnippet: `<input (keydown.control.enter)="submit()"
       (keydown.escape)="cancel()"
       (keyup.shift.tab)="focusPrevious()">`,
    options: [
      'Angular supports pseudo-event syntax like keydown.key and keydown.modifier.key to listen for specific keys and combinations',
      'You must check event.key manually in every keyboard event handler',
      'Angular requires a special KeyboardModule to handle key events',
      'Key combinations only work with @HostListener, not template event bindings',
    ],
    correctAnswer:
      'Angular supports pseudo-event syntax like keydown.key and keydown.modifier.key to listen for specific keys and combinations',
    explanation:
      'Angular extends event binding with pseudo-events for keyboard events. You can specify key names (keydown.enter, keyup.escape) and modifiers (keydown.control.s, keydown.shift.tab). This eliminates manual key checking in handlers and makes templates more declarative.',
  },
  {
    id: 'ng-q86',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'hard',
    question:
      'How do you safely access the DOM using ElementRef and why is direct nativeElement access discouraged?',
    codeSnippet: `// Discouraged
constructor(private el: ElementRef) {
  this.el.nativeElement.style.color = 'red';
}

// Preferred
constructor(
  private el: ElementRef,
  private renderer: Renderer2
) {
  this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
}`,
    options: [
      "Direct nativeElement access bypasses Angular's rendering abstraction, breaking SSR and security; Renderer2 provides a safe platform-agnostic API",
      'nativeElement is slower than Renderer2 due to browser reflow',
      'ElementRef is deprecated and should never be used',
      'Direct DOM access only fails in development mode, not production',
    ],
    correctAnswer:
      "Direct nativeElement access bypasses Angular's rendering abstraction, breaking SSR and security; Renderer2 provides a safe platform-agnostic API",
    explanation:
      'ElementRef.nativeElement gives direct DOM access, which breaks in non-browser environments (SSR, web workers) and can expose XSS vulnerabilities. Renderer2 abstracts DOM operations for platform independence and security. Use ElementRef only for reading, not modifying.',
  },
  // ─── Batch 4: ng-q87 – ng-q112 ─────────────────────────────────
  {
    id: 'ng-q87',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    question: 'What is the purpose of ngAfterViewChecked?',
    options: [
      "It is called after Angular checks the component's view and child views during every change detection cycle",
      'It is called once after the view is initialized',
      'It replaces ngDoCheck for view-level changes',
      'It fires only when the view is destroyed',
    ],
    correctAnswer:
      "It is called after Angular checks the component's view and child views during every change detection cycle",
    explanation:
      "ngAfterViewChecked runs after every change detection cycle checks the component's view bindings. It fires frequently, so avoid expensive operations inside it. Use it for logic that depends on the view being fully updated, like measuring DOM elements.",
  },
  {
    id: 'ng-q88',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'medium',
    question: 'How do you use the takeUntilDestroyed operator for automatic unsubscription?',
    codeSnippet: `import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({...})
export class MyComponent {
  constructor() {
    this.dataService.getData().pipe(
      takeUntilDestroyed()
    ).subscribe(data => this.data = data);
  }
}`,
    options: [
      'takeUntilDestroyed() automatically completes the Observable when the component is destroyed, replacing manual unsubscription in ngOnDestroy',
      'takeUntilDestroyed() prevents the component from being destroyed while the Observable is active',
      'takeUntilDestroyed() caches the last emitted value for use after destruction',
      'takeUntilDestroyed() only works with HttpClient Observables',
    ],
    correctAnswer:
      'takeUntilDestroyed() automatically completes the Observable when the component is destroyed, replacing manual unsubscription in ngOnDestroy',
    explanation:
      'takeUntilDestroyed() (Angular 16+) leverages the DestroyRef injection token to automatically unsubscribe when the component or service is destroyed. When called without arguments, it must be used in an injection context (constructor or field initializer).',
  },
  {
    id: 'ng-q89',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'hard',
    question: 'What triggers change detection in an OnPush component?',
    options: [
      'An @Input() reference changes, a DOM event fires within the component, an Observable bound via async pipe emits, or markForCheck()/detectChanges() is called explicitly',
      'Only when @Input() references change; nothing else triggers it',
      'Any variable assignment in the component class triggers it',
      'OnPush components check on every browser animation frame',
    ],
    correctAnswer:
      'An @Input() reference changes, a DOM event fires within the component, an Observable bound via async pipe emits, or markForCheck()/detectChanges() is called explicitly',
    explanation:
      'OnPush components skip change detection unless: (1) an @Input reference changes (not mutation), (2) a DOM event originates from the component or its children, (3) the async pipe receives a new emission (calls markForCheck internally), or (4) manual CD triggers are used.',
  },
  {
    id: 'ng-q90',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What is the difference between forRoot() and forChild() in Angular modules?',
    codeSnippet: `// App module
RouterModule.forRoot(appRoutes)

// Feature module
RouterModule.forChild(featureRoutes)`,
    options: [
      'forRoot() registers providers and configuration at the application root level (singleton); forChild() registers routes without creating new service instances',
      'forRoot() is for production, forChild() is for testing',
      'forRoot() loads synchronously, forChild() loads lazily',
      'They are interchangeable; both can be used in any module',
    ],
    correctAnswer:
      'forRoot() registers providers and configuration at the application root level (singleton); forChild() registers routes without creating new service instances',
    explanation:
      'forRoot() is called once in AppModule to set up singleton services (like Router). forChild() is used in feature modules to register additional routes without creating duplicate service instances. This convention applies to RouterModule and other libraries.',
  },
  {
    id: 'ng-q91',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'easy',
    question: 'What are Angular services primarily used for?',
    options: [
      'To encapsulate reusable business logic, data access, and state management that can be shared across components via dependency injection',
      'To define the visual layout and styling of components',
      'To handle routing and navigation exclusively',
      'To compile TypeScript into JavaScript at build time',
    ],
    correctAnswer:
      'To encapsulate reusable business logic, data access, and state management that can be shared across components via dependency injection',
    explanation:
      'Services are classes that contain logic not tied to a specific view. They handle data fetching, business rules, state management, logging, and more. Components inject services to stay lean and focused on presentation. Services promote reuse and testability.',
  },
  {
    id: 'ng-q92',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'How do you use InjectionToken for non-class dependencies in Angular?',
    codeSnippet: `export const API_CONFIG = new InjectionToken<ApiConfig>('api.config', {
  providedIn: 'root',
  factory: () => ({
    baseUrl: 'https://api.example.com',
    timeout: 5000
  })
});

// Injection
constructor(@Inject(API_CONFIG) private config: ApiConfig) {}`,
    options: [
      'InjectionToken creates a unique token for non-class values (strings, objects, interfaces) that cannot be used as DI keys directly',
      'InjectionToken is only needed for string values, not objects',
      'InjectionToken replaces @Injectable() for all services',
      'InjectionToken is deprecated in favor of providedIn on classes',
    ],
    correctAnswer:
      'InjectionToken creates a unique token for non-class values (strings, objects, interfaces) that cannot be used as DI keys directly',
    explanation:
      'TypeScript interfaces are erased at runtime, so they cannot be DI tokens. InjectionToken creates a unique, runtime-available token for injecting configuration objects, string values, or factory results. The factory option provides a default value with tree-shaking support.',
  },
  {
    id: 'ng-q93',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'How does component communication work through a shared service?',
    codeSnippet: `@Injectable({ providedIn: 'root' })
export class MessageService {
  private messageSubject = new Subject<string>();
  message$ = this.messageSubject.asObservable();

  sendMessage(msg: string) {
    this.messageSubject.next(msg);
  }
}

// Component A (sender)
this.messageService.sendMessage('Hello!');

// Component B (receiver)
this.messageService.message$.subscribe(msg => this.message = msg);`,
    options: [
      'A shared service uses an RxJS Subject or BehaviorSubject as an event bus, allowing any component to send or receive messages regardless of their relationship in the component tree',
      'Shared services can only communicate between parent and child components',
      'The service must be recreated for each component that uses it',
      'Shared service communication is synchronous only',
    ],
    correctAnswer:
      'A shared service uses an RxJS Subject or BehaviorSubject as an event bus, allowing any component to send or receive messages regardless of their relationship in the component tree',
    explanation:
      'Shared services with Subjects enable communication between components that are not directly related (e.g., siblings, deeply nested). The service acts as a mediator. BehaviorSubject provides the latest value to new subscribers; Subject does not.',
  },
  {
    id: 'ng-q94',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'hard',
    question: 'What is the new control flow syntax in Angular 17+?',
    codeSnippet: `@if (user) {
  <h1>Welcome, {{ user.name }}</h1>
} @else {
  <h1>Please log in</h1>
}

@for (item of items; track item.id) {
  <li>{{ item.name }}</li>
} @empty {
  <li>No items found</li>
}

@switch (status) {
  @case ('active') { <span>Active</span> }
  @case ('inactive') { <span>Inactive</span> }
  @default { <span>Unknown</span> }
}`,
    options: [
      'Angular 17 introduced built-in @if, @for, @switch blocks that replace *ngIf, *ngFor, *ngSwitch with better performance and developer experience',
      'This is JSX syntax that Angular adopted from React',
      'This syntax only works in inline templates, not external HTML files',
      'The @ prefix is just syntactic sugar that compiles to the same *ng directives',
    ],
    correctAnswer:
      'Angular 17 introduced built-in @if, @for, @switch blocks that replace *ngIf, *ngFor, *ngSwitch with better performance and developer experience',
    explanation:
      "Angular 17's built-in control flow (@if, @for, @switch) provides better type narrowing, mandatory track for @for (improving performance), @empty blocks, and deferred loading with @defer. They are built into the template compiler and do not require CommonModule imports.",
  },
  {
    id: 'ng-q95',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What is @defer in Angular and how does it improve performance?',
    codeSnippet: `@defer (on viewport) {
  <app-heavy-chart [data]="chartData" />
} @placeholder {
  <div>Chart loading area</div>
} @loading (minimum 500ms) {
  <app-spinner />
} @error {
  <p>Failed to load chart</p>
}`,
    options: [
      '@defer lazily loads components and their dependencies when a trigger condition is met (viewport, interaction, timer, idle), with placeholder, loading, and error states',
      '@defer only delays rendering but loads all JavaScript upfront',
      '@defer is an alternative to lazy-loaded routes for page-level code splitting',
      '@defer requires a separate build configuration to enable',
    ],
    correctAnswer:
      '@defer lazily loads components and their dependencies when a trigger condition is met (viewport, interaction, timer, idle), with placeholder, loading, and error states',
    explanation:
      '@defer (Angular 17+) enables component-level lazy loading. The component code is not loaded until the trigger fires. Triggers include viewport visibility, user interaction, timer, and browser idle. @placeholder, @loading, and @error provide UX during the loading lifecycle.',
  },
  {
    id: 'ng-q96',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'easy',
    question:
      'What is the difference between [class.name] and [ngClass] for conditional CSS classes?',
    codeSnippet: `<!-- Single class binding -->
<div [class.active]="isActive">Single class</div>

<!-- Multiple class binding -->
<div [ngClass]="{'active': isActive, 'disabled': isDisabled, 'large': size === 'lg'}">
  Multiple classes
</div>`,
    options: [
      '[class.name] toggles a single CSS class based on a boolean; [ngClass] can apply multiple classes based on an object, array, or string',
      '[class.name] is faster and should always be used instead of [ngClass]',
      '[ngClass] can only accept strings, not objects',
      '[class.name] and [ngClass] cannot be used on the same element',
    ],
    correctAnswer:
      '[class.name] toggles a single CSS class based on a boolean; [ngClass] can apply multiple classes based on an object, array, or string',
    explanation:
      '[class.name]="condition" is a simple binding that adds/removes a single class. [ngClass] is more flexible, accepting an object (keys are class names, values are conditions), an array of class names, or a string of space-separated classes.',
  },
  {
    id: 'ng-q97',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'hard',
    question: 'How do you implement an interceptor that caches GET requests?',
    codeSnippet: `const cache = new Map<string, HttpResponse<unknown>>();

export const cachingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') return next(req);

  const cached = cache.get(req.urlWithParams);
  if (cached) return of(cached.clone());

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        cache.set(req.urlWithParams, event.clone());
      }
    })
  );
};`,
    options: [
      'Create an interceptor that stores HttpResponse objects in a Map and returns cached responses for repeated GET requests',
      "Angular's HttpClient has built-in caching via the cache: true option",
      "Use the browser's Cache API directly inside the interceptor",
      'Caching interceptors only work with class-based interceptors, not functional ones',
    ],
    correctAnswer:
      'Create an interceptor that stores HttpResponse objects in a Map and returns cached responses for repeated GET requests',
    explanation:
      'A caching interceptor checks a Map for a cached response before forwarding the request. On cache miss, it forwards the request and stores the response. Cloning ensures cached responses are not consumed. Production implementations should add cache invalidation and TTL logic.',
  },
  {
    id: 'ng-q98',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'How do you cancel an HTTP request in Angular?',
    codeSnippet: `private searchSubscription?: Subscription;

onSearch(term: string) {
  this.searchSubscription?.unsubscribe();
  this.searchSubscription = this.http.get(\`/api/search?q=\${term}\`)
    .subscribe(results => this.results = results);
}

// Or with switchMap (auto-cancels previous)
searchTerm$.pipe(
  switchMap(term => this.http.get(\`/api/search?q=\${term}\`))
).subscribe(results => this.results = results);`,
    options: [
      'Unsubscribe from the Observable to abort the HTTP request, or use switchMap which automatically cancels the previous inner Observable',
      'Call the abort() method on the HttpClient instance',
      'HTTP requests in Angular cannot be cancelled once started',
      'Use the AbortController API from the Fetch specification',
    ],
    correctAnswer:
      'Unsubscribe from the Observable to abort the HTTP request, or use switchMap which automatically cancels the previous inner Observable',
    explanation:
      'Since HttpClient returns Observables, unsubscribing cancels the underlying XMLHttpRequest. switchMap automatically unsubscribes from the previous inner Observable before subscribing to the new one, making it ideal for search-as-you-type scenarios.',
  },
  {
    id: 'ng-q99',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'easy',
    question: 'What is the purpose of the observe option in HttpClient?',
    codeSnippet: `// Default: only the body
this.http.get<User[]>('/api/users');

// Full response with headers and status
this.http.get<User[]>('/api/users', { observe: 'response' });

// All events (progress, sent, response)
this.http.get('/api/upload', { observe: 'events' });`,
    options: [
      'The observe option controls what part of the HTTP response the Observable emits: body (default), the full response, or all HTTP events including progress',
      'observe enables server-sent events (SSE) for real-time updates',
      'observe determines the HTTP method to use',
      'observe only works with POST requests for monitoring upload progress',
    ],
    correctAnswer:
      'The observe option controls what part of the HTTP response the Observable emits: body (default), the full response, or all HTTP events including progress',
    explanation:
      'By default, HttpClient emits just the response body. observe: "response" gives the full HttpResponse with headers and status. observe: "events" emits all HttpEvents including upload/download progress events, useful for file upload progress bars.',
  },
  {
    id: 'ng-q100',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'hard',
    question: 'How do you implement a ControlValueAccessor for a custom form control?',
    codeSnippet: `@Component({
  selector: 'app-star-rating',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StarRatingComponent),
    multi: true
  }]
})
export class StarRatingComponent implements ControlValueAccessor {
  value = 0;
  onChange: (value: number) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: number) { this.value = value; }
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouched = fn; }

  rate(stars: number) {
    this.value = stars;
    this.onChange(stars);
    this.onTouched();
  }
}`,
    options: [
      'Implement the ControlValueAccessor interface and provide NG_VALUE_ACCESSOR so the custom component works with formControlName, formControl, and ngModel',
      'Extend FormControl class and override its methods',
      'Use @Input() and @Output() to manually sync with the parent form',
      'Custom form controls are not supported in Angular reactive forms',
    ],
    correctAnswer:
      'Implement the ControlValueAccessor interface and provide NG_VALUE_ACCESSOR so the custom component works with formControlName, formControl, and ngModel',
    explanation:
      "ControlValueAccessor bridges custom UI components with Angular's forms API. writeValue() updates the view, registerOnChange/registerOnTouched() connect callbacks. Providing NG_VALUE_ACCESSOR with multi:true registers the component as a form control. forwardRef handles class declaration ordering.",
  },
  {
    id: 'ng-q101',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'What are the dirty, pristine, touched, and untouched states of a form control?',
    codeSnippet: `<input formControlName="name">
<div *ngIf="form.get('name')?.dirty">Field has been modified</div>
<div *ngIf="form.get('name')?.touched && form.get('name')?.invalid">
  Please fix errors before continuing
</div>`,
    options: [
      'dirty means the user has changed the value; pristine means unchanged. touched means the control has lost focus; untouched means it has not',
      'dirty and touched are identical; pristine and untouched are identical',
      'dirty means the field has errors; pristine means it is valid',
      'touched means the value has been set programmatically',
    ],
    correctAnswer:
      'dirty means the user has changed the value; pristine means unchanged. touched means the control has lost focus; untouched means it has not',
    explanation:
      'dirty/pristine track whether the user has changed the value (dirty = changed, pristine = unchanged). touched/untouched track whether the control has lost focus (touched = blurred, untouched = never blurred). These states help determine when to show validation messages.',
  },
  {
    id: 'ng-q102',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'easy',
    question: 'How do you reset a reactive form in Angular?',
    codeSnippet: `// Reset to empty values
this.form.reset();

// Reset with specific values
this.form.reset({
  name: 'Default Name',
  email: ''
});

// Reset a single control
this.form.get('name')?.reset('Default Name');`,
    options: [
      'Call reset() on the FormGroup or FormControl to set values back to initial state and reset dirty/touched/validity states',
      'Set each control value to empty string manually',
      'Recreate the FormGroup with FormBuilder',
      'Call form.clear() to remove all controls and values',
    ],
    correctAnswer:
      'Call reset() on the FormGroup or FormControl to set values back to initial state and reset dirty/touched/validity states',
    explanation:
      'reset() sets the control value to the provided value (or null/empty if none), and resets the status to pristine and untouched. This is cleaner than manually clearing each field because it also resets all form state flags and triggers validators.',
  },
  {
    id: 'ng-q103',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'easy',
    question: 'What is attribute binding in Angular and how does it differ from property binding?',
    codeSnippet: `<!-- Property binding (sets DOM property) -->
<input [value]="name">

<!-- Attribute binding (sets HTML attribute) -->
<td [attr.colspan]="columns">Content</td>
<button [attr.aria-label]="label">Click</button>`,
    options: [
      'Property binding sets DOM properties; attribute binding (attr.) sets HTML attributes, needed for attributes without corresponding DOM properties like colspan and ARIA',
      'They are identical; attr. is just an optional prefix',
      'Attribute binding is faster because it bypasses the DOM',
      'Property binding only works on native elements; attribute binding works on components',
    ],
    correctAnswer:
      'Property binding sets DOM properties; attribute binding (attr.) sets HTML attributes, needed for attributes without corresponding DOM properties like colspan and ARIA',
    explanation:
      'DOM properties and HTML attributes are different. Most attributes have corresponding properties, but some (like colspan, ARIA attributes, SVG attributes) do not. Use [attr.name] to bind to HTML attributes directly when no DOM property exists.',
  },
  {
    id: 'ng-q104',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'medium',
    question: 'How do you prevent default event behavior and stop event propagation in Angular?',
    codeSnippet: `<!-- Method 1: In the handler -->
<a (click)="onLinkClick($event)">
onLinkClick(event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
}

<!-- Method 2: Return false -->
<form (submit)="onSubmit(); false">`,
    options: [
      'Call event.preventDefault() and event.stopPropagation() on the $event object, or return false from the template statement to prevent default',
      'Use the .prevent and .stop modifiers on the event binding',
      'Angular automatically prevents default behavior on all events',
      'Use a @HostListener with the prevent option set to true',
    ],
    correctAnswer:
      'Call event.preventDefault() and event.stopPropagation() on the $event object, or return false from the template statement to prevent default',
    explanation:
      'Pass $event to the handler and call preventDefault()/stopPropagation() on it. Alternatively, returning false from a template statement calls preventDefault() on the event. Angular does not have built-in event modifiers like Vue (.prevent, .stop).',
  },
  {
    id: 'ng-q105',
    framework: 'angular',
    category: 'State & Lifecycle',
    difficulty: 'easy',
    question: 'Can you use multiple lifecycle hooks in the same component?',
    codeSnippet: `@Component({...})
export class UserComponent implements OnInit, OnChanges, OnDestroy {
  ngOnChanges(changes: SimpleChanges) { /* react to inputs */ }
  ngOnInit() { /* initialize */ }
  ngOnDestroy() { /* cleanup */ }
}`,
    options: [
      'Yes, a component can implement any number of lifecycle hook interfaces, and Angular calls each hook method at the appropriate time',
      'No, each component can only implement one lifecycle hook',
      'Only two lifecycle hooks can be used at the same time',
      'Multiple hooks are allowed but only the last one defined will execute',
    ],
    correctAnswer:
      'Yes, a component can implement any number of lifecycle hook interfaces, and Angular calls each hook method at the appropriate time',
    explanation:
      'Components can implement all lifecycle hooks simultaneously. Angular calls each hook at its defined time in the lifecycle. The interfaces (OnInit, OnChanges, etc.) are optional in TypeScript but recommended for type safety and clarity.',
  },
  {
    id: 'ng-q106',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'medium',
    question: 'What is content projection in Angular and how is it implemented?',
    codeSnippet: `<!-- Card component template -->
<div class="card">
  <ng-content></ng-content>
</div>

<!-- Usage -->
<app-card>
  <h2>Title</h2>
  <p>This content is projected into the card.</p>
</app-card>`,
    options: [
      'Content projection inserts external content into a component using <ng-content>, similar to slots in Web Components',
      'Content projection copies the child component template into the parent',
      'Content projection is the same as using *ngTemplateOutlet',
      'Content projection only works with text nodes, not HTML elements',
    ],
    correctAnswer:
      'Content projection inserts external content into a component using <ng-content>, similar to slots in Web Components',
    explanation:
      'Content projection allows a parent to pass template content into a child component. <ng-content> acts as a slot where the projected content appears. This enables creating reusable wrapper components (cards, modals, tabs) without coupling to specific content.',
  },
  {
    id: 'ng-q107',
    framework: 'angular',
    category: 'Rendering',
    difficulty: 'medium',
    question: 'What is the purpose of ngTemplateOutlet?',
    codeSnippet: `<ng-template #itemTemplate let-item let-idx="index">
  <span>{{ idx }}: {{ item.name }}</span>
</ng-template>

<ng-container *ngFor="let item of items; let i = index">
  <ng-container *ngTemplateOutlet="itemTemplate;
    context: { $implicit: item, index: i }">
  </ng-container>
</ng-container>`,
    options: [
      'ngTemplateOutlet renders an ng-template dynamically with a given context, enabling reusable template fragments',
      'ngTemplateOutlet sends templates to child components',
      'ngTemplateOutlet is used only for content projection',
      'ngTemplateOutlet compiles templates at runtime from strings',
    ],
    correctAnswer:
      'ngTemplateOutlet renders an ng-template dynamically with a given context, enabling reusable template fragments',
    explanation:
      '*ngTemplateOutlet stamps an <ng-template> into the DOM with a context object. $implicit provides the default let variable, and named properties are accessed via let-name="property". This enables reusable template blocks and template-as-input patterns.',
  },
  {
    id: 'ng-q108',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'hard',
    question: 'How do you use RxJS combineLatest and forkJoin for parallel requests?',
    codeSnippet: `// forkJoin: completes when ALL observables complete
forkJoin({
  users: this.http.get<User[]>('/api/users'),
  roles: this.http.get<Role[]>('/api/roles')
}).subscribe(({ users, roles }) => {
  this.users = users;
  this.roles = roles;
});

// combineLatest: emits when ANY observable emits (after all have emitted at least once)
combineLatest([this.route.params, this.route.queryParams])
  .subscribe(([params, query]) => this.load(params, query));`,
    options: [
      'forkJoin waits for all Observables to complete and emits their last values; combineLatest emits whenever any source emits after all have emitted at least once',
      'forkJoin and combineLatest are identical operators with different names',
      'forkJoin runs requests sequentially; combineLatest runs them in parallel',
      'combineLatest only works with two Observables maximum',
    ],
    correctAnswer:
      'forkJoin waits for all Observables to complete and emits their last values; combineLatest emits whenever any source emits after all have emitted at least once',
    explanation:
      'forkJoin is like Promise.all: it subscribes to all sources in parallel and emits once when all complete, giving their final values. combineLatest emits every time any source emits (after all have emitted at least once), making it ideal for streams that emit multiple values.',
  },
  {
    id: 'ng-q109',
    framework: 'angular',
    category: 'DOM & Events',
    difficulty: 'hard',
    question: 'How do you use Renderer2 to dynamically create and manipulate DOM elements?',
    codeSnippet: `constructor(
  private renderer: Renderer2,
  private el: ElementRef
) {}

addTooltip(text: string) {
  const tooltip = this.renderer.createElement('div');
  this.renderer.addClass(tooltip, 'tooltip');
  const textNode = this.renderer.createText(text);
  this.renderer.appendChild(tooltip, textNode);
  this.renderer.appendChild(this.el.nativeElement, tooltip);
  this.renderer.listen(tooltip, 'click', () => {
    this.renderer.removeChild(this.el.nativeElement, tooltip);
  });
}`,
    options: [
      'Renderer2 provides createElement, appendChild, removeChild, addClass, setAttribute, setStyle, and listen methods for platform-safe DOM manipulation',
      'Renderer2 can only modify existing elements, not create new ones',
      'Renderer2 is only needed for SVG elements',
      'Renderer2 batches DOM operations for virtual DOM diffing',
    ],
    correctAnswer:
      'Renderer2 provides createElement, appendChild, removeChild, addClass, setAttribute, setStyle, and listen methods for platform-safe DOM manipulation',
    explanation:
      'Renderer2 is the platform-agnostic DOM manipulation API. createElement creates elements, appendChild/removeChild manage hierarchy, addClass/removeClass manage classes, setAttribute/setStyle set attributes and styles, and listen attaches event handlers. All operations are safe for SSR.',
  },
  {
    id: 'ng-q110',
    framework: 'angular',
    category: 'Common Patterns',
    difficulty: 'hard',
    question: 'What is the multi provider pattern in Angular?',
    codeSnippet: `providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
]`,
    options: [
      'multi: true allows multiple providers for the same token, collecting all values into an array rather than overriding each other',
      'multi: true creates multiple instances of the same service',
      'multi: true enables the service to run on multiple threads',
      'multi: true is only valid for HTTP interceptors and cannot be used elsewhere',
    ],
    correctAnswer:
      'multi: true allows multiple providers for the same token, collecting all values into an array rather than overriding each other',
    explanation:
      'Normally, a second provider for the same token replaces the first. With multi: true, all providers are collected into an array. This is used for extensible systems like HTTP_INTERCEPTORS, APP_INITIALIZER, and NG_VALIDATORS where multiple implementations should coexist.',
  },
  {
    id: 'ng-q111',
    framework: 'angular',
    category: 'Data Fetching',
    difficulty: 'medium',
    question: 'How do you handle loading states when fetching data in Angular?',
    codeSnippet: `loading = signal(false);
error = signal<string | null>(null);
users = signal<User[]>([]);

loadUsers() {
  this.loading.set(true);
  this.error.set(null);
  this.http.get<User[]>('/api/users').pipe(
    finalize(() => this.loading.set(false))
  ).subscribe({
    next: (data) => this.users.set(data),
    error: (err) => this.error.set(err.message)
  });
}`,
    options: [
      'Track loading and error states using signals or component properties, set loading to true before the request, and use finalize() to reset it when the Observable completes or errors',
      'Angular automatically manages loading states for all HTTP requests',
      'Use the HttpClient loadingState option to enable automatic loading tracking',
      'Loading states should only be managed in route resolvers, not in components',
    ],
    correctAnswer:
      'Track loading and error states using signals or component properties, set loading to true before the request, and use finalize() to reset it when the Observable completes or errors',
    explanation:
      'Loading state management is manual in Angular. Set a loading flag before the request, use finalize() (runs on both completion and error) to clear it. Handle errors in the error callback. Signals make the state reactive. The async pipe with *ngIf can also manage loading patterns.',
  },
  {
    id: 'ng-q112',
    framework: 'angular',
    category: 'Forms & Validation',
    difficulty: 'medium',
    question: 'How do you listen for value changes on a reactive form control?',
    codeSnippet: `this.form.get('search')?.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.searchService.search(term))
).subscribe(results => this.results = results);

this.form.statusChanges.subscribe(status => {
  console.log('Form status:', status);
});`,
    options: [
      'Use the valueChanges and statusChanges Observables on FormControl or FormGroup to reactively respond to changes',
      'Use (ngModelChange) event binding on each input element',
      'Poll the form value using setInterval in ngOnInit',
      'Override the setValue method on the FormControl to intercept changes',
    ],
    correctAnswer:
      'Use the valueChanges and statusChanges Observables on FormControl or FormGroup to reactively respond to changes',
    explanation:
      'Every AbstractControl (FormControl, FormGroup, FormArray) exposes valueChanges and statusChanges Observables. valueChanges emits the new value whenever it changes. statusChanges emits VALID, INVALID, PENDING, or DISABLED. These integrate naturally with RxJS operators for debounce, filtering, etc.',
  },
];
