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
];
