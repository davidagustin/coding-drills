import type { CheatsheetData } from '../types';

export const angularCheatsheet: CheatsheetData = {
  framework: 'angular',
  title: 'Angular Cheatsheet',
  lastUpdated: '2026-02',
  sections: [
    // ─── OVERVIEW ──────────────────────────────────────────────────
    {
      id: 'overview',
      icon: '📋',
      title: 'Overview',
      description: 'What Angular is, its philosophy, and when to use it',
      content: [
        {
          type: 'text',
          content:
            'Angular is a batteries-included, opinionated, enterprise-ready platform for building large-scale web applications. Maintained by Google, it provides a complete solution out of the box: components, dependency injection, routing, forms, HTTP, testing utilities, and a powerful CLI. Angular uses TypeScript by default and leverages RxJS for reactive programming.',
        },
        {
          type: 'subheading',
          text: 'Philosophy & Design Principles',
        },
        {
          type: 'list',
          style: 'bullet',
          items: [
            'Batteries-included: routing, forms, HTTP, i18n, animations, and testing are all built in',
            'Opinionated: one canonical way to do things keeps large teams consistent',
            'Enterprise-ready: dependency injection, strong typing, and modular architecture scale to massive codebases',
            'TypeScript-first: decorators, interfaces, and generics are core to the developer experience',
            'Reactive by default: RxJS observables power HTTP, forms, router events, and async data flows',
            'Progressive: Signals (v16+) bring fine-grained reactivity without requiring RxJS for every use case',
          ],
        },
        {
          type: 'subheading',
          text: 'Angular vs AngularJS',
        },
        {
          type: 'warning',
          content:
            'Angular (versions 2+) is a complete rewrite of AngularJS (1.x). They share a name but are entirely different frameworks. AngularJS used JavaScript, two-way scope binding, and controllers. Angular uses TypeScript, components, dependency injection, and RxJS. AngularJS reached end-of-life in December 2021. All new projects should use Angular.',
        },
        {
          type: 'subheading',
          text: 'Mental Model',
        },
        {
          type: 'text',
          content:
            'Think of Angular as four pillars working together: Components define the UI, Dependency Injection wires services together, RxJS handles async data flows, and TypeScript enforces type safety across the entire application. Signals (v16+) add a fifth pillar for synchronous fine-grained reactivity.',
        },
        {
          type: 'code',
          language: 'text',
          title: 'Angular Mental Model',
          code: `Component Tree        Dependency Injection      RxJS / Signals
+-----------+         +---------------+          +----------------+
| AppComp   |  <--->  | Services      |  <--->   | Observables    |
|  +--Nav   |         |  AuthService  |          |  HTTP streams  |
|  +--Main  |         |  ApiService   |          |  Form values   |
|    +--List|         |  StateService |          |  Router events |
|    +--Form|         +---------------+          +----------------+
+-----------+                 |                          |
      |                       v                          v
      +---- TypeScript enforces types across all layers ---+`,
        },
        {
          type: 'subheading',
          text: 'When to Use Angular',
        },
        {
          type: 'list',
          style: 'bullet',
          items: [
            'Large enterprise applications with many developers and long lifespans',
            'Teams that benefit from strong conventions and an opinionated structure',
            'Projects that need built-in solutions for forms, HTTP, i18n, and routing',
            'Applications requiring robust dependency injection and testability',
            'When TypeScript-first development is a priority',
            'Consider React or Vue if you prefer flexibility, smaller bundles, or a less opinionated approach',
          ],
        },
        {
          type: 'subheading',
          text: 'Key Terminology',
        },
        {
          type: 'table',
          headers: ['Term', 'Description'],
          rows: [
            [
              'NgModule',
              'A class decorated with @NgModule that organizes related code into cohesive blocks (being replaced by standalone components)',
            ],
            [
              'Standalone Component',
              'A component that declares its own dependencies without needing an NgModule (Angular 14+, default in 17+)',
            ],
            [
              'Decorator',
              'A TypeScript function (e.g. @Component, @Injectable) that attaches metadata to a class',
            ],
            [
              'Zone.js',
              'Library that patches async APIs to trigger change detection automatically',
            ],
            [
              'Signals',
              'Fine-grained reactivity primitives (signal, computed, effect) introduced in Angular 16',
            ],
            [
              'Change Detection',
              'The mechanism Angular uses to synchronize the component tree with the DOM',
            ],
            [
              'Dependency Injection (DI)',
              'A design pattern where classes receive their dependencies from an external injector rather than creating them',
            ],
            [
              'RxJS',
              'Reactive Extensions for JavaScript: library for composing async and event-based programs using observables',
            ],
            [
              'Template Reference Variable',
              'A variable declared in a template with # that gives access to a DOM element or directive instance',
            ],
            [
              'Directive',
              'A class that adds behavior to elements: structural (*ngIf, *ngFor) or attribute ([ngClass], [ngStyle])',
            ],
            [
              'Pipe',
              'A class that transforms displayed values in templates (e.g. date, currency, uppercase)',
            ],
            [
              'Guard',
              'A service that controls navigation to/from routes (canActivate, canDeactivate, etc.)',
            ],
            [
              'Interceptor',
              'A service that intercepts and optionally transforms HTTP requests/responses',
            ],
            ['Resolver', 'A service that pre-fetches data before a route is activated'],
          ],
        },
        {
          type: 'tip',
          content:
            'Angular follows semantic versioning with major releases roughly every 6 months. Each major version is supported for 18 months. The Angular team prioritizes backward compatibility and provides automated migration schematics (ng update) for breaking changes.',
        },
      ],
    },

    // ─── CORE CONCEPTS ─────────────────────────────────────────────
    {
      id: 'core-concepts',
      icon: '🧠',
      title: 'Core Concepts',
      description: 'Components, templates, directives, pipes, signals, and change detection',
      content: [
        // --- Components ---
        {
          type: 'subheading',
          text: 'Components: Standalone vs NgModule',
        },
        {
          type: 'text',
          content:
            'Components are the fundamental building blocks of Angular UIs. Every component has a TypeScript class, a template, and optional styles. Since Angular 14, standalone components can declare their own imports without an NgModule. As of Angular 17, standalone is the default.',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Standalone Component (Angular 14+)',
          code: `@Component({
  selector: 'app-greeting',
  standalone: true,
  imports: [CommonModule],
  template: \\\`
    <h1>Hello, {{ name() }}!</h1>
    <p *ngIf="showAge">Age: {{ age() }}</p>
  \\\`,
  styles: [\\\`h1 { color: #1976d2; }\\\`],
})
export class GreetingComponent {
  name = input<string>('World');
  age = input<number>(0);
  showAge = true;
}`,
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'NgModule-based Component (Legacy)',
          code: `// greeting.component.ts
@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss'],
})
export class GreetingComponent {
  @Input() name = '';
  @Input() age = 0;
}

// greeting.module.ts
@NgModule({
  declarations: [GreetingComponent],
  imports: [CommonModule],
  exports: [GreetingComponent],
})
export class GreetingModule {}`,
        },
        {
          type: 'table',
          headers: ['Component Metadata', 'Purpose'],
          rows: [
            ['selector', 'CSS selector that identifies this component in templates'],
            ['template / templateUrl', 'Inline template string or path to external HTML file'],
            ['styles / styleUrls', 'Inline styles array or paths to external stylesheet files'],
            [
              'standalone',
              'Whether the component manages its own imports (true in Angular 17+ by default)',
            ],
            ['imports', 'Other components, directives, and pipes this standalone component uses'],
            ['providers', 'Services scoped to this component and its children'],
            ['changeDetection', 'Strategy: ChangeDetectionStrategy.Default or OnPush'],
            ['encapsulation', 'ViewEncapsulation.Emulated (default), None, or ShadowDom'],
            ['animations', 'Array of animation trigger definitions'],
            ['host', 'Map of host element properties, attributes, and event listeners'],
          ],
        },
        {
          type: 'tip',
          content:
            'Prefer standalone components for all new code. They simplify dependency management, improve tree-shaking, and are the future direction of Angular.',
        },

        // --- Template Syntax ---
        {
          type: 'subheading',
          text: 'Template Syntax Deep Dive',
        },
        {
          type: 'text',
          content:
            'Angular templates use a rich binding syntax to connect the DOM to component data. Understanding the different binding types is essential for productive Angular development.',
        },
        {
          type: 'table',
          headers: ['Syntax', 'Name', 'Direction', 'Example'],
          rows: [
            ['{{ expr }}', 'Interpolation', 'Component -> DOM', '{{ user.name }}'],
            ['[prop]="expr"', 'Property binding', 'Component -> DOM', '[src]="imageUrl"'],
            ['(event)="handler"', 'Event binding', 'DOM -> Component', '(click)="onClick()"'],
            ['[(prop)]="field"', 'Two-way binding', 'Both', '[(ngModel)]="name"'],
            [
              '[attr.name]="expr"',
              'Attribute binding',
              'Component -> DOM',
              '[attr.aria-label]="label"',
            ],
            [
              '[class.name]="expr"',
              'Class binding',
              'Component -> DOM',
              '[class.active]="isActive"',
            ],
            [
              '[style.prop]="expr"',
              'Style binding',
              'Component -> DOM',
              '[style.color]="textColor"',
            ],
            ['#ref', 'Template variable', 'Template-local', '#emailInput'],
          ],
        },
        {
          type: 'code',
          language: 'html',
          title: 'All Binding Types in Action',
          code: `<!-- Interpolation -->
<h1>{{ title }}</h1>
<p>{{ 1 + 1 }}</p>
<p>{{ getFullName() }}</p>

<!-- Property binding -->
<img [src]="user.avatarUrl" [alt]="user.name">
<button [disabled]="isSubmitting">Submit</button>
<app-child [data]="parentData"></app-child>

<!-- Event binding -->
<button (click)="save()">Save</button>
<input (keyup.enter)="onEnter()">
<form (ngSubmit)="onSubmit()">...</form>
<div (mouseover)="onHover($event)">Hover me</div>

<!-- Two-way binding -->
<input [(ngModel)]="searchQuery">

<!-- Attribute binding -->
<td [attr.colspan]="colSpan">Cell</td>
<button [attr.aria-expanded]="isOpen">Toggle</button>

<!-- Class binding -->
<div [class.highlighted]="isSelected">Item</div>
<div [ngClass]="{ active: isActive, disabled: isDisabled }">Box</div>

<!-- Style binding -->
<div [style.width.px]="boxWidth">Resizable</div>
<div [ngStyle]="{ 'font-size': fontSize + 'px' }">Text</div>

<!-- Template reference variable -->
<input #nameInput type="text">
<button (click)="greet(nameInput.value)">Greet</button>`,
        },

        // --- Structural Directives ---
        {
          type: 'subheading',
          text: 'Structural Directives',
        },
        {
          type: 'text',
          content:
            'Structural directives shape the DOM by adding, removing, or manipulating elements. The asterisk (*) is syntactic sugar that Angular expands into an <ng-template>. Angular 17 introduced a new built-in control flow syntax (@if, @for, @switch) that replaces *ngIf, *ngFor, and *ngSwitch.',
        },
        {
          type: 'code',
          language: 'html',
          title: 'Classic Structural Directives',
          code: `<!-- *ngIf with else -->
<div *ngIf="user; else noUser">
  Welcome, {{ user.name }}!
</div>
<ng-template #noUser>
  <p>Please log in.</p>
</ng-template>

<!-- *ngIf with as (unwrap observable) -->
<div *ngIf="user$ | async as user">
  {{ user.name }}
</div>

<!-- *ngFor with index, first, last, even, odd -->
<ul>
  <li *ngFor="let item of items; let i = index;
              let first = first; let last = last;
              trackBy: trackById">
    {{ i + 1 }}. {{ item.name }}
    <span *ngIf="first"> (first)</span>
    <span *ngIf="last"> (last)</span>
  </li>
</ul>

<!-- *ngSwitch -->
<div [ngSwitch]="status">
  <p *ngSwitchCase="'active'">Active</p>
  <p *ngSwitchCase="'inactive'">Inactive</p>
  <p *ngSwitchDefault>Unknown</p>
</div>`,
        },
        {
          type: 'code',
          language: 'html',
          title: 'New Control Flow (Angular 17+)',
          code: `<!-- @if / @else if / @else -->
@if (user) {
  <p>Welcome, {{ user.name }}!</p>
} @else if (isLoading) {
  <p>Loading...</p>
} @else {
  <p>Please log in.</p>
}

<!-- @for with track (required) -->
@for (item of items; track item.id; let i = $index) {
  <li>{{ i + 1 }}. {{ item.name }}</li>
} @empty {
  <li>No items found.</li>
}

<!-- @switch -->
@switch (status) {
  @case ('active') { <span class="green">Active</span> }
  @case ('inactive') { <span class="red">Inactive</span> }
  @default { <span>Unknown</span> }
}`,
        },
        {
          type: 'tip',
          content:
            'The new @if/@for/@switch control flow is faster than *ngIf/*ngFor because it avoids the overhead of directive instantiation. Use @for with a track expression (mandatory) for optimal performance. Migrate with: ng generate @angular/core:control-flow.',
        },

        // --- Pipes ---
        {
          type: 'subheading',
          text: 'Pipes',
        },
        {
          type: 'text',
          content:
            'Pipes transform displayed values in templates. Angular includes many built-in pipes, and you can create custom ones. Pipes can be chained. Pure pipes (default) only re-evaluate when their input reference changes. Impure pipes re-evaluate on every change detection cycle.',
        },
        {
          type: 'table',
          headers: ['Pipe', 'Purpose', 'Example'],
          rows: [
            ['date', 'Format dates', "{{ birthday | date:'longDate' }}"],
            ['currency', 'Format currency', "{{ price | currency:'USD' }}"],
            ['decimal', 'Format numbers', "{{ pi | number:'1.2-4' }}"],
            ['percent', 'Format as percentage', "{{ ratio | percent:'1.0-2' }}"],
            ['uppercase', 'Uppercase text', '{{ name | uppercase }}'],
            ['lowercase', 'Lowercase text', '{{ name | lowercase }}'],
            ['titlecase', 'Title Case text', '{{ name | titlecase }}'],
            ['slice', 'Subset of array/string', '{{ items | slice:0:5 }}'],
            ['json', 'JSON stringify', '{{ obj | json }}'],
            ['async', 'Unwrap Observable/Promise', '{{ data$ | async }}'],
            ['keyvalue', 'Iterate object entries', '*ngFor="let kv of map | keyvalue"'],
            ['i18nPlural', 'Pluralization', '{{ count | i18nPlural:pluralMap }}'],
          ],
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Custom Pipe',
          code: `@Pipe({
  name: 'truncate',
  standalone: true,
  // pure: true (default) -- only re-runs when input changes
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 50, trail = '...'): string {
    if (!value) return '';
    return value.length > limit
      ? value.substring(0, limit) + trail
      : value;
  }
}

// Usage: {{ longText | truncate:100:'---' }}`,
        },
        {
          type: 'warning',
          content:
            'Impure pipes (pure: false) run on every change detection cycle and can severely hurt performance. Avoid impure pipes in large lists. Use pure pipes or move logic to the component class.',
        },

        // --- Content Projection ---
        {
          type: 'subheading',
          text: 'Content Projection',
        },
        {
          type: 'text',
          content:
            'Content projection (transclusion) lets a parent component pass content into a child component using <ng-content>. Multi-slot projection uses CSS selectors to route different content to different slots.',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Multi-Slot Content Projection',
          code: `// card.component.ts
@Component({
  selector: 'app-card',
  standalone: true,
  template: \\\`
    <div class="card">
      <div class="card-header">
        <ng-content select="[card-header]"></ng-content>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
      <div class="card-footer">
        <ng-content select="[card-footer]"></ng-content>
      </div>
    </div>
  \\\`,
})
export class CardComponent {}

// Usage:
// <app-card>
//   <h2 card-header>Title</h2>
//   <p>This goes into the default slot (card-body).</p>
//   <button card-footer>Save</button>
// </app-card>`,
        },

        // --- ViewChild / ContentChild ---
        {
          type: 'subheading',
          text: 'ViewChild, ViewChildren, ContentChild, ContentChildren',
        },
        {
          type: 'text',
          content:
            "These decorators provide access to child elements and components. ViewChild/ViewChildren query the component's own template. ContentChild/ContentChildren query projected content.",
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'ViewChild and ContentChild',
          code: `@Component({
  selector: 'app-parent',
  template: \\\`
    <input #searchInput type="text">
    <app-child></app-child>
  \\\`,
})
export class ParentComponent implements AfterViewInit {
  // Query DOM element by template reference variable
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  // Query child component
  @ViewChild(ChildComponent) child!: ChildComponent;

  // Query all matching children
  @ViewChildren(ItemComponent) items!: QueryList<ItemComponent>;

  ngAfterViewInit() {
    this.searchInput.nativeElement.focus();
    console.log('Child count:', this.items.length);
    // QueryList emits on changes
    this.items.changes.subscribe(() => {
      console.log('Items changed:', this.items.length);
    });
  }
}

// ContentChild queries projected content
@Component({
  selector: 'app-tab-group',
  template: \\\`<ng-content></ng-content>\\\`,
})
export class TabGroupComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  ngAfterContentInit() {
    this.tabs.first.isActive = true;
  }
}`,
        },

        // --- Lifecycle Hooks ---
        {
          type: 'subheading',
          text: 'Component Lifecycle Hooks',
        },
        {
          type: 'text',
          content:
            "Angular calls lifecycle hook methods at specific moments in a component's life. They execute in a defined order. The most commonly used are ngOnInit, ngOnChanges, and ngOnDestroy.",
        },
        {
          type: 'table',
          headers: ['Hook', 'When Called', 'Common Use'],
          rows: [
            [
              'ngOnChanges',
              'Before ngOnInit and whenever an @Input property changes',
              'React to input changes, compare previous/current values',
            ],
            [
              'ngOnInit',
              'Once, after the first ngOnChanges',
              'Fetch data, initialize component state, set up subscriptions',
            ],
            [
              'ngDoCheck',
              'Every change detection run',
              'Custom change detection logic (use sparingly)',
            ],
            [
              'ngAfterContentInit',
              'Once, after projected content is initialized',
              'Access @ContentChild/@ContentChildren',
            ],
            [
              'ngAfterContentChecked',
              'After every check of projected content',
              'React to projected content changes',
            ],
            [
              'ngAfterViewInit',
              'Once, after the view and child views are initialized',
              'Access @ViewChild/@ViewChildren, DOM manipulation',
            ],
            [
              'ngAfterViewChecked',
              'After every check of the view and child views',
              'React to view changes (avoid expensive logic)',
            ],
            [
              'ngOnDestroy',
              'Just before the component is destroyed',
              'Unsubscribe observables, detach event handlers, clean up timers',
            ],
          ],
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Lifecycle Hooks Example',
          code: `@Component({ selector: 'app-lifecycle', template: '...' })
export class LifecycleComponent
  implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  @Input() data!: string;
  private destroy$ = new Subject<void>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      console.log(
        'data changed:',
        changes['data'].previousValue,
        '->',
        changes['data'].currentValue
      );
    }
  }

  ngOnInit() {
    // Component initialized -- fetch data, subscribe to stores
    this.dataService.getData().pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => this.processData(data));
  }

  ngAfterViewInit() {
    // DOM is ready -- safe to query ViewChild, measure elements
  }

  ngOnDestroy() {
    // Clean up -- unsubscribe, detach listeners
    this.destroy$.next();
    this.destroy$.complete();
  }
}`,
        },

        // --- Signals ---
        {
          type: 'subheading',
          text: 'Signals (Angular 16+)',
        },
        {
          type: 'text',
          content:
            "Signals are Angular's fine-grained reactivity primitives. They provide synchronous reactive state without requiring RxJS. A signal holds a value and notifies consumers when it changes. computed() derives values, effect() runs side effects. Angular 17+ adds signal-based inputs, outputs, and model.",
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Signals API',
          code: `import { signal, computed, effect } from '@angular/core';

// Writable signal
const count = signal(0);
console.log(count());      // 0
count.set(5);               // set new value
count.update(c => c + 1);   // update based on current value

// Computed signal (read-only, auto-tracks dependencies)
const doubleCount = computed(() => count() * 2);
console.log(doubleCount()); // 12

// Effect (runs side effects when dependencies change)
effect(() => {
  console.log('Count is now:', count());
  // Automatically re-runs when count changes
});`,
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Signal-Based Component (Angular 17+)',
          code: `@Component({
  selector: 'app-counter',
  standalone: true,
  template: \\\`
    <p>Count: {{ count() }}</p>
    <p>Double: {{ doubleCount() }}</p>
    <button (click)="increment()">+1</button>
    <button (click)="reset()">Reset</button>
  \\\`,
})
export class CounterComponent {
  // Signal-based input (replaces @Input decorator)
  initialValue = input<number>(0);

  // Signal-based output (replaces @Output + EventEmitter)
  countChanged = output<number>();

  // Two-way binding signal (replaces @Input + @Output pair)
  // Parent uses: <app-counter [(value)]="parentValue" />
  value = model<number>(0);

  // Internal state
  count = signal(0);

  // Derived state
  doubleCount = computed(() => this.count() * 2);

  constructor() {
    // effect runs whenever count changes
    effect(() => {
      this.countChanged.emit(this.count());
    });
  }

  increment() {
    this.count.update(c => c + 1);
  }

  reset() {
    this.count.set(this.initialValue());
  }
}`,
        },
        {
          type: 'tip',
          content:
            "Signals work naturally with OnPush change detection and are the foundation for Angular's zoneless future. Prefer signals for new component state. Use toSignal() and toObservable() to interop between signals and RxJS observables.",
        },

        // --- Change Detection ---
        {
          type: 'subheading',
          text: 'Change Detection',
        },
        {
          type: 'text',
          content:
            'Change detection is the process Angular uses to keep the DOM in sync with component state. By default (Default strategy), Angular checks every component in the tree after any async event. The OnPush strategy only checks a component when its inputs change by reference, an event handler fires within it, or an observable bound with the async pipe emits.',
        },
        {
          type: 'table',
          headers: ['Strategy', 'Behavior', 'When to Use'],
          rows: [
            [
              'Default',
              'Checks component on every change detection cycle',
              'Simple apps, prototyping, components with mutable data',
            ],
            [
              'OnPush',
              'Only checks when inputs change (by reference), events fire, or async pipe emits',
              'Performance-critical components, apps with immutable data patterns',
            ],
            [
              'Signals',
              'Fine-grained reactivity without zone.js; marks only affected views dirty',
              'New Angular 16+ code, future-proofing for zoneless Angular',
            ],
          ],
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'OnPush Change Detection',
          code: `@Component({
  selector: 'app-user-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \\\`
    <div class="card">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
      <p>Updated: {{ lastChecked$ | async }}</p>
    </div>
  \\\`,
})
export class UserCardComponent {
  @Input() user!: User; // Must pass new object reference to trigger check

  lastChecked$ = interval(1000).pipe(
    map(() => new Date().toLocaleTimeString())
  );

  constructor(private cdr: ChangeDetectorRef) {}

  // Manually trigger change detection if needed
  forceUpdate() {
    this.cdr.markForCheck();
  }
}`,
        },
        {
          type: 'warning',
          content:
            'With OnPush, mutating an object (e.g. user.name = "new") will NOT trigger a re-render. You must create a new object reference: this.user = { ...this.user, name: "new" }. Signals and immutable patterns work best with OnPush.',
        },
      ],
    },

    // ─── KEY APIS ──────────────────────────────────────────────────
    {
      id: 'key-apis',
      icon: '🔑',
      title: 'Key APIs',
      description: 'Decorators, signals, DI, HttpClient, Router, Forms, and RxJS',
      content: [
        // --- Decorators ---
        {
          type: 'subheading',
          text: 'Decorators Reference',
        },
        {
          type: 'table',
          headers: ['Decorator', 'Target', 'Purpose'],
          rows: [
            [
              '@Component',
              'Class',
              'Marks a class as an Angular component with template, styles, and metadata',
            ],
            ['@Directive', 'Class', 'Marks a class as a directive (attribute or structural)'],
            ['@Pipe', 'Class', 'Marks a class as a pipe for template value transformation'],
            ['@Injectable', 'Class', 'Marks a class as available for dependency injection'],
            [
              '@NgModule',
              'Class',
              'Defines a module that groups components, directives, pipes, and services',
            ],
            [
              '@Input',
              'Property',
              'Declares a property as an input that can be set by a parent component',
            ],
            [
              '@Output',
              'Property',
              'Declares a property as an output that emits events to the parent',
            ],
            [
              '@ViewChild',
              'Property',
              "Queries a single element or component in the component's template",
            ],
            [
              '@ViewChildren',
              'Property',
              'Queries all matching elements or components in the template',
            ],
            [
              '@ContentChild',
              'Property',
              'Queries a single element or component in projected content',
            ],
            [
              '@ContentChildren',
              'Property',
              'Queries all matching elements or components in projected content',
            ],
            [
              '@HostBinding',
              'Property',
              'Binds a host element property to a directive/component property',
            ],
            ['@HostListener', 'Method', 'Subscribes to a host element event'],
            [
              '@Optional',
              'Constructor param',
              'Marks a dependency as optional (null if not found)',
            ],
            ['@Self', 'Constructor param', 'Restricts DI lookup to the current injector only'],
            [
              '@SkipSelf',
              'Constructor param',
              'Skips the current injector, starts lookup from the parent',
            ],
            ['@Host', 'Constructor param', "Restricts DI lookup to the host component's injector"],
            [
              '@Inject',
              'Constructor param',
              'Specifies a custom token for injection (used with InjectionToken)',
            ],
          ],
        },

        // --- Signals API ---
        {
          type: 'subheading',
          text: 'Signals API Reference',
        },
        {
          type: 'table',
          headers: ['API', 'Type', 'Description'],
          rows: [
            [
              'signal(value)',
              'WritableSignal<T>',
              'Creates a writable signal with an initial value',
            ],
            [
              'computed(() => expr)',
              'Signal<T>',
              'Creates a read-only signal derived from other signals',
            ],
            [
              'effect(() => { ... })',
              'EffectRef',
              'Runs a side effect whenever its signal dependencies change',
            ],
            [
              'input<T>()',
              'InputSignal<T>',
              'Declares a signal-based component input (Angular 17+)',
            ],
            ['input.required<T>()', 'InputSignal<T>', 'Declares a required signal-based input'],
            [
              'output<T>()',
              'OutputEmitterRef<T>',
              'Declares a signal-based component output (Angular 17+)',
            ],
            ['model<T>()', 'ModelSignal<T>', 'Declares a two-way binding signal input/output pair'],
            [
              'linkedSignal(() => expr)',
              'WritableSignal<T>',
              'A writable signal that resets when a source signal changes (Angular 19+)',
            ],
            [
              'resource(options)',
              'Resource<T>',
              'Asynchronous data fetching tied to signals (Angular 19+)',
            ],
            ['toSignal(obs$)', 'Signal<T>', 'Converts an RxJS Observable to a Signal'],
            ['toObservable(sig)', 'Observable<T>', 'Converts a Signal to an RxJS Observable'],
          ],
        },

        // --- Dependency Injection ---
        {
          type: 'subheading',
          text: 'Dependency Injection Deep Dive',
        },
        {
          type: 'text',
          content:
            "Angular's DI system is hierarchical. Injectors form a tree that mirrors the component tree. Services can be provided at different levels: root (singleton), module, component, or directive. The DI system supports multiple provider types for maximum flexibility.",
        },
        {
          type: 'table',
          headers: ['Provider Type', 'Syntax', 'Use Case'],
          rows: [
            [
              'providedIn: "root"',
              '@Injectable({ providedIn: "root" })',
              'Application-wide singleton (tree-shakable)',
            ],
            [
              'providedIn: "any"',
              '@Injectable({ providedIn: "any" })',
              'One instance per lazy-loaded module boundary',
            ],
            [
              'useClass',
              '{ provide: Logger, useClass: FileLogger }',
              'Replace a service with a different implementation',
            ],
            [
              'useFactory',
              '{ provide: Config, useFactory: () => loadConfig() }',
              'Create instance with custom logic',
            ],
            [
              'useValue',
              '{ provide: API_URL, useValue: "https://api.example.com" }',
              'Provide a static value',
            ],
            [
              'useExisting',
              '{ provide: OldService, useExisting: NewService }',
              'Alias one token to another',
            ],
            [
              'InjectionToken',
              'new InjectionToken<string>("API_URL")',
              'Type-safe token for non-class dependencies',
            ],
            [
              'multi: true',
              '{ provide: VALIDATORS, useClass: CustomValidator, multi: true }',
              'Provide multiple values under one token',
            ],
          ],
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Advanced DI Patterns',
          code: `// InjectionToken for configuration
const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
const HTTP_INTERCEPTORS = new InjectionToken<HttpInterceptor[]>('HTTP_INTERCEPTORS');

// Factory provider with dependencies
const appConfig: ApplicationConfig = {
  providers: [
    { provide: API_BASE_URL, useValue: 'https://api.example.com' },
    {
      provide: UserService,
      useFactory: (http: HttpClient, url: string) => {
        return new UserService(http, url);
      },
      deps: [HttpClient, API_BASE_URL],
    },
    // Multi-provider: all interceptors collected into an array
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  ],
};

// inject() function (Angular 14+) -- alternative to constructor injection
@Component({ /* ... */ })
export class MyComponent {
  private userService = inject(UserService);
  private apiUrl = inject(API_BASE_URL);
  private router = inject(Router);
}`,
        },
        {
          type: 'tip',
          content:
            'The inject() function can be used in components, directives, pipes, and services. It provides a cleaner alternative to constructor injection and works well with standalone components. It must be called in the constructor or field initializer context.',
        },

        // --- HttpClient ---
        {
          type: 'subheading',
          text: 'HttpClient',
        },
        {
          type: 'text',
          content:
            "HttpClient is Angular's built-in HTTP service. It returns RxJS Observables, supports typed responses, interceptors, and progress events. Import provideHttpClient() in your application config.",
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'HttpClient CRUD Operations',
          code: `@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.example.com';

  // GET with typed response
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(\\\`\\\${this.baseUrl}/users\\\`);
  }

  // GET with query params
  searchUsers(query: string, page: number): Observable<User[]> {
    const params = new HttpParams()
      .set('q', query)
      .set('page', page.toString());
    return this.http.get<User[]>(\\\`\\\${this.baseUrl}/users\\\`, { params });
  }

  // POST
  createUser(user: CreateUserDto): Observable<User> {
    return this.http.post<User>(\\\`\\\${this.baseUrl}/users\\\`, user);
  }

  // PUT
  updateUser(id: number, user: UpdateUserDto): Observable<User> {
    return this.http.put<User>(\\\`\\\${this.baseUrl}/users/\\\${id}\\\`, user);
  }

  // DELETE
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(\\\`\\\${this.baseUrl}/users/\\\${id}\\\`);
  }

  // Error handling
  getUser(id: number): Observable<User> {
    return this.http.get<User>(\\\`\\\${this.baseUrl}/users/\\\${id}\\\`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'An error occurred';
    if (error.status === 0) {
      message = 'Network error: unable to reach server';
    } else {
      message = \\\`Server returned \\\${error.status}: \\\${error.message}\\\`;
    }
    console.error(message);
    return throwError(() => new Error(message));
  }
}`,
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'HTTP Interceptor (Functional, Angular 15+)',
          code: `// auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const cloned = req.clone({
      setHeaders: { Authorization: \\\`Bearer \\\${token}\\\` },
    });
    return next(cloned);
  }
  return next(req);
};

// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};`,
        },

        // --- Router ---
        {
          type: 'subheading',
          text: 'Router',
        },
        {
          type: 'text',
          content:
            'The Angular Router maps URL paths to components. It supports lazy loading, guards, resolvers, nested routes, and parameterized routes.',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Route Configuration',
          code: `// app.routes.ts
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },

  // Route with parameter
  { path: 'users/:id', component: UserDetailComponent },

  // Lazy-loaded route (standalone component)
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin.component').then(m => m.AdminComponent),
    canActivate: [authGuard],
  },

  // Lazy-loaded child routes
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
    canMatch: [roleGuard],
  },

  // Route with resolver
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    resolve: { product: productResolver },
  },

  // Redirect
  { path: 'home', redirectTo: '', pathMatch: 'full' },

  // Wildcard (404)
  { path: '**', component: NotFoundComponent },
];`,
        },
        {
          type: 'table',
          headers: ['Guard', 'Purpose', 'Return Type'],
          rows: [
            [
              'canActivate',
              'Controls whether a route can be activated',
              'boolean | UrlTree | Observable<boolean | UrlTree>',
            ],
            [
              'canDeactivate',
              'Controls whether the user can leave a route',
              'boolean | Observable<boolean>',
            ],
            [
              'canLoad',
              'Controls whether a lazy module can be loaded (deprecated, use canMatch)',
              'boolean | Observable<boolean>',
            ],
            [
              'canMatch',
              'Controls whether a route definition matches the URL (Angular 15+)',
              'boolean | UrlTree | Observable<boolean | UrlTree>',
            ],
            [
              'resolve',
              'Pre-fetches data before the route activates',
              'Observable<T> | Promise<T> | T',
            ],
            [
              'canActivateChild',
              'Controls whether child routes can be activated',
              'boolean | UrlTree | Observable<boolean | UrlTree>',
            ],
          ],
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Functional Guard (Angular 15+)',
          code: `// auth.guard.ts
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url },
  });
};

// role.guard.ts
export const roleGuard: CanMatchFn = (route) => {
  const auth = inject(AuthService);
  const requiredRole = route.data?.['role'] as string;
  return auth.hasRole(requiredRole);
};`,
        },

        // --- Forms ---
        {
          type: 'subheading',
          text: 'Forms: Template-Driven vs Reactive',
        },
        {
          type: 'text',
          content:
            'Angular offers two approaches to forms. Template-driven forms use directives (ngModel) in the template and are simpler for basic forms. Reactive forms use FormGroup/FormControl in the component class and are more powerful, testable, and suitable for complex forms.',
        },
        {
          type: 'table',
          headers: ['Feature', 'Template-Driven', 'Reactive'],
          rows: [
            ['Setup', 'FormsModule', 'ReactiveFormsModule'],
            ['Model', 'Directives in template', 'Component class (FormGroup, FormControl)'],
            ['Data flow', 'Async (through directives)', 'Sync (immediate access)'],
            ['Validation', 'Directive attributes', 'Functions in component class'],
            ['Testing', 'Requires DOM', 'Pure unit tests'],
            ['Dynamic forms', 'Difficult', 'Easy (FormArray, addControl)'],
            [
              'Best for',
              'Simple forms, prototyping',
              'Complex forms, dynamic fields, strong validation',
            ],
          ],
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Reactive Form with Validation',
          code: `@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \\\`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="name" placeholder="Name">
      <div *ngIf="form.get('name')?.errors?.['required']
                   && form.get('name')?.touched">
        Name is required.
      </div>

      <input formControlName="email" placeholder="Email">

      <div formGroupName="address">
        <input formControlName="street" placeholder="Street">
        <input formControlName="city" placeholder="City">
      </div>

      <div formArrayName="phones">
        <div *ngFor="let phone of phones.controls; let i = index">
          <input [formControlName]="i" placeholder="Phone">
          <button type="button" (click)="removePhone(i)">X</button>
        </div>
        <button type="button" (click)="addPhone()">Add Phone</button>
      </div>

      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  \\\`,
})
export class RegistrationComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    address: this.fb.group({
      street: [''],
      city: ['', Validators.required],
    }),
    phones: this.fb.array([this.fb.control('', Validators.pattern(/^\\d{10}$/))]),
  });

  get phones(): FormArray {
    return this.form.get('phones') as FormArray;
  }

  addPhone() {
    this.phones.push(this.fb.control('', Validators.pattern(/^\\d{10}$/)));
  }

  removePhone(index: number) {
    this.phones.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}`,
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Custom Validator (Sync & Async)',
          code: `// Sync validator
function forbiddenName(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

// Async validator (e.g., check if username is taken)
function uniqueUsername(
  userService: UserService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return userService.checkUsername(control.value).pipe(
      map(isTaken => (isTaken ? { usernameTaken: true } : null)),
      catchError(() => of(null))
    );
  };
}

// Usage
this.fb.group({
  username: [
    '',
    [Validators.required, forbiddenName(/admin/i)],  // sync
    [uniqueUsername(this.userService)],                // async
  ],
});`,
        },

        // --- RxJS ---
        {
          type: 'subheading',
          text: 'RxJS Operators Reference',
        },
        {
          type: 'text',
          content:
            'RxJS is a core dependency of Angular. Observables power HttpClient, Router events, reactive forms, and more. Understanding key operators is essential for effective Angular development.',
        },
        {
          type: 'table',
          headers: ['Operator', 'Category', 'Description'],
          rows: [
            ['map', 'Transformation', 'Transform each emitted value'],
            ['filter', 'Filtering', 'Only emit values that pass a predicate'],
            ['tap', 'Utility', 'Side effect without modifying the stream (logging, debugging)'],
            [
              'switchMap',
              'Higher-order',
              'Map to observable, cancel previous inner observable on new emission',
            ],
            [
              'mergeMap',
              'Higher-order',
              'Map to observable, run all inner observables concurrently',
            ],
            [
              'concatMap',
              'Higher-order',
              'Map to observable, queue inner observables (one at a time, in order)',
            ],
            [
              'exhaustMap',
              'Higher-order',
              'Map to observable, ignore new emissions until current inner completes',
            ],
            [
              'takeUntil',
              'Filtering',
              'Emit values until a notifier observable emits (used for unsubscribing)',
            ],
            [
              'takeUntilDestroyed',
              'Angular',
              'Emit values until the component/service is destroyed (Angular 16+)',
            ],
            [
              'distinctUntilChanged',
              'Filtering',
              'Only emit when value differs from the last emission',
            ],
            [
              'debounceTime',
              'Filtering',
              'Emit only after a specified time has passed without new emissions',
            ],
            ['throttleTime', 'Filtering', 'Emit first value, then ignore for a specified duration'],
            ['catchError', 'Error Handling', 'Catch errors and return a fallback observable'],
            ['retry', 'Error Handling', 'Re-subscribe to source on error, up to N times'],
            ['startWith', 'Combination', 'Prepend a value before the first emission'],
            [
              'withLatestFrom',
              'Combination',
              'Combine with the latest value from another observable on emission',
            ],
            [
              'combineLatest',
              'Creation',
              'Emit array of latest values whenever any input observable emits',
            ],
            [
              'forkJoin',
              'Creation',
              'Emit array of last values when all input observables complete',
            ],
            ['of', 'Creation', 'Create observable that emits specified values synchronously'],
            ['from', 'Creation', 'Create observable from array, promise, or iterable'],
            ['Subject', 'Subject', 'Multicast observable that is both observer and observable'],
            [
              'BehaviorSubject',
              'Subject',
              'Subject that holds a current value and emits it to new subscribers',
            ],
            [
              'ReplaySubject',
              'Subject',
              'Subject that replays N previous emissions to new subscribers',
            ],
            [
              'AsyncSubject',
              'Subject',
              'Subject that emits only the last value, only when it completes',
            ],
          ],
        },
        {
          type: 'tip',
          content:
            'Use switchMap for search/autocomplete (cancel stale requests), exhaustMap for form submissions (ignore duplicate clicks), concatMap for ordered operations (queue requests), and mergeMap for parallel independent operations.',
        },
      ],
    },

    // ─── COMMON PATTERNS ───────────────────────────────────────────
    {
      id: 'common-patterns',
      icon: '🔄',
      title: 'Common Patterns',
      description: 'Production-proven Angular patterns and best practices',
      content: [
        // --- Smart/Dumb Components ---
        {
          type: 'subheading',
          text: 'Smart/Dumb (Container/Presentational) Components',
        },
        {
          type: 'text',
          content:
            'Separate components into "smart" containers that manage state and logic, and "dumb" presentational components that receive data via inputs and emit events via outputs. This pattern improves testability, reusability, and makes OnPush change detection easy to apply.',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Container/Presentational Pattern',
          code: `// Smart container -- manages data, calls services
@Component({
  selector: 'app-user-list-page',
  standalone: true,
  imports: [UserListComponent, AsyncPipe],
  template: \\\`
    <app-user-list
      [users]="users$ | async"
      [loading]="loading()"
      (delete)="onDelete($event)"
      (select)="onSelect($event)"
    />
  \\\`,
})
export class UserListPageComponent {
  private userService = inject(UserService);
  users$ = this.userService.getUsers();
  loading = signal(false);

  onDelete(userId: number) {
    this.loading.set(true);
    this.userService.delete(userId).subscribe({
      next: () => this.loading.set(false),
      error: () => this.loading.set(false),
    });
  }

  onSelect(userId: number) {
    inject(Router).navigate(['/users', userId]);
  }
}

// Dumb presentational -- no services, pure inputs/outputs
@Component({
  selector: 'app-user-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: \\\`
    @if (loading) {
      <div class="spinner">Loading...</div>
    } @else {
      @for (user of users; track user.id) {
        <div class="user-card" (click)="select.emit(user.id)">
          <span>{{ user.name }}</span>
          <button (click)="delete.emit(user.id); $event.stopPropagation()">
            Delete
          </button>
        </div>
      } @empty {
        <p>No users found.</p>
      }
    }
  \\\`,
})
export class UserListComponent {
  @Input() users: User[] | null = [];
  @Input() loading = false;
  @Output() delete = new EventEmitter<number>();
  @Output() select = new EventEmitter<number>();
}`,
        },

        // --- Service with Subject State ---
        {
          type: 'subheading',
          text: 'Service-with-Subject State Management',
        },
        {
          type: 'text',
          content:
            'For medium-complexity state that does not warrant NgRx, a service with BehaviorSubjects (or signals) provides a simple, testable store. Expose state as observables and mutations as methods.',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'State Service Pattern',
          code: `interface AppState {
  user: User | null;
  notifications: Notification[];
  theme: 'light' | 'dark';
}

const initialState: AppState = {
  user: null,
  notifications: [],
  theme: 'light',
};

@Injectable({ providedIn: 'root' })
export class StateService {
  private state = new BehaviorSubject<AppState>(initialState);

  // Selectors (expose slices as observables)
  readonly user$ = this.state.pipe(
    map(s => s.user),
    distinctUntilChanged()
  );
  readonly notifications$ = this.state.pipe(
    map(s => s.notifications),
    distinctUntilChanged()
  );
  readonly theme$ = this.state.pipe(
    map(s => s.theme),
    distinctUntilChanged()
  );

  // Mutations
  setUser(user: User | null) {
    this.updateState({ user });
  }

  addNotification(notification: Notification) {
    const current = this.state.value;
    this.updateState({
      notifications: [...current.notifications, notification],
    });
  }

  toggleTheme() {
    const current = this.state.value;
    this.updateState({
      theme: current.theme === 'light' ? 'dark' : 'light',
    });
  }

  private updateState(partial: Partial<AppState>) {
    this.state.next({ ...this.state.value, ...partial });
  }
}`,
        },

        // --- HTTP Interceptor Patterns ---
        {
          type: 'subheading',
          text: 'HTTP Interceptor Patterns',
        },
        {
          type: 'text',
          content:
            'Interceptors are middleware for HTTP requests/responses. They can add auth headers, log requests, handle errors globally, show loading indicators, retry failed requests, and cache responses.',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Common Interceptors (Functional Style)',
          code: `// Error handling interceptor
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbar = inject(SnackbarService);
  const auth = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        auth.logout();
      } else if (error.status === 403) {
        snackbar.show('You do not have permission for this action');
      } else if (error.status >= 500) {
        snackbar.show('Server error. Please try again later.');
      }
      return throwError(() => error);
    })
  );
};

// Loading indicator interceptor
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);
  loading.show();

  return next(req).pipe(
    finalize(() => loading.hide())
  );
};

// Retry with exponential backoff
export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    retry({
      count: 3,
      delay: (error, retryCount) => {
        if (error.status < 500) return throwError(() => error);
        const delayMs = Math.pow(2, retryCount) * 1000;
        return timer(delayMs);
      },
    })
  );
};

// Register multiple interceptors
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        loadingInterceptor,
        retryInterceptor,
        errorInterceptor,
      ])
    ),
  ],
};`,
        },

        // --- Route Guards ---
        {
          type: 'subheading',
          text: 'Route Guard Patterns',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Auth, Role, and Unsaved Changes Guards',
          code: `// Auth guard -- redirect to login if not authenticated
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated()
    ? true
    : router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url },
      });
};

// Role guard -- check user has required role
export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const requiredRoles = route.data['roles'] as string[];

  return requiredRoles.some(role => auth.hasRole(role))
    ? true
    : inject(Router).createUrlTree(['/unauthorized']);
};

// Unsaved changes guard
export interface HasUnsavedChanges {
  hasUnsavedChanges(): boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (
  component
) => {
  if (component.hasUnsavedChanges()) {
    return confirm('You have unsaved changes. Leave anyway?');
  }
  return true;
};

// Route config
const routes: Routes = [
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'superadmin'] },
    loadComponent: () => import('./admin.component').then(m => m.AdminComponent),
  },
  {
    path: 'editor',
    component: EditorComponent,
    canDeactivate: [unsavedChangesGuard],
  },
];`,
        },

        // --- RxJS Patterns ---
        {
          type: 'subheading',
          text: 'RxJS Patterns',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Search with Debounce',
          code: `@Component({
  selector: 'app-search',
  template: \\\`
    <input [formControl]="searchControl" placeholder="Search...">
    @for (result of results(); track result.id) {
      <div>{{ result.name }}</div>
    }
  \\\`,
})
export class SearchComponent {
  private api = inject(ApiService);
  searchControl = new FormControl('');
  results = signal<SearchResult[]>([]);

  constructor() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(query => !!query && query.length >= 2),
      switchMap(query => this.api.search(query!).pipe(
        catchError(() => of([]))
      )),
      takeUntilDestroyed()
    ).subscribe(results => this.results.set(results));
  }
}`,
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Polling & Combining Streams',
          code: `// Polling: refresh data every 30 seconds
readonly data$ = timer(0, 30_000).pipe(
  switchMap(() => this.http.get<Data[]>('/api/data')),
  shareReplay(1)
);

// Combine multiple data sources
readonly viewModel$ = combineLatest({
  user: this.userService.currentUser$,
  settings: this.settingsService.settings$,
  notifications: this.notificationService.unread$,
}).pipe(
  map(({ user, settings, notifications }) => ({
    displayName: user.name,
    theme: settings.theme,
    unreadCount: notifications.length,
  }))
);

// Wait for all requests to complete
loadDashboard(): Observable<DashboardData> {
  return forkJoin({
    stats: this.http.get<Stats>('/api/stats'),
    recentOrders: this.http.get<Order[]>('/api/orders?limit=10'),
    topProducts: this.http.get<Product[]>('/api/products/top'),
  });
}`,
        },

        // --- Error Handling ---
        {
          type: 'subheading',
          text: 'Error Handling Patterns',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Global Error Handler',
          code: `// Global error handler
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private snackbar = inject(SnackbarService);
  private logger = inject(LoggingService);

  handleError(error: unknown): void {
    // Log to monitoring service
    this.logger.logError(error);

    // Show user-friendly message
    if (error instanceof HttpErrorResponse) {
      this.snackbar.show(\\\`Server error: \\\${error.status}\\\`);
    } else if (error instanceof Error) {
      this.snackbar.show('An unexpected error occurred.');
    }

    // Always log to console in development
    console.error('GlobalErrorHandler caught:', error);
  }
}

// Register in app config
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
};`,
        },

        // --- Lazy Loading ---
        {
          type: 'subheading',
          text: 'Lazy Loading',
        },
        {
          type: 'text',
          content:
            'Lazy loading splits your app into smaller bundles that load on demand. Routes, components, and even services can be lazy loaded. This dramatically improves initial load time for large applications.',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Lazy Loading Routes',
          code: `// Lazy load a standalone component
{
  path: 'settings',
  loadComponent: () =>
    import('./settings/settings.component')
      .then(m => m.SettingsComponent),
}

// Lazy load child routes
{
  path: 'admin',
  loadChildren: () =>
    import('./admin/admin.routes')
      .then(m => m.ADMIN_ROUTES),
}

// Preloading strategy: load lazy routes after initial load
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
};`,
        },

        // --- Custom Directives ---
        {
          type: 'subheading',
          text: 'Custom Directives',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Attribute and Structural Directives',
          code: `// Attribute directive: highlight on hover
@Directive({
  selector: '[appHighlight]',
  standalone: true,
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class HighlightDirective {
  private el = inject(ElementRef);
  @Input() appHighlight = 'yellow';

  onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.appHighlight;
  }

  onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
// Usage: <p appHighlight="cyan">Hover me!</p>

// Structural directive: render only for roles
@Directive({
  selector: '[appIfRole]',
  standalone: true,
})
export class IfRoleDirective {
  private auth = inject(AuthService);
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);
  private hasView = false;

  @Input() set appIfRole(role: string) {
    const hasRole = this.auth.hasRole(role);
    if (hasRole && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasRole && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
// Usage: <button *appIfRole="'admin'">Delete All</button>`,
        },

        // --- Destroy Pattern ---
        {
          type: 'subheading',
          text: 'Unsubscribe Patterns',
        },
        {
          type: 'text',
          content:
            'Failing to unsubscribe from observables causes memory leaks. Angular provides several patterns for safe cleanup.',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Unsubscribe Patterns',
          code: `// Pattern 1: takeUntilDestroyed (Angular 16+, recommended)
@Component({ /* ... */ })
export class ModernComponent {
  constructor() {
    this.dataService.getData().pipe(
      takeUntilDestroyed() // auto-unsubscribes on destroy
    ).subscribe(data => this.process(data));
  }
}

// Pattern 2: async pipe (auto-unsubscribes in template)
@Component({
  template: \\\`
    @if (data$ | async; as data) {
      <p>{{ data.value }}</p>
    }
  \\\`,
})
export class AsyncPipeComponent {
  data$ = this.service.getData();
}

// Pattern 3: DestroyRef (Angular 16+)
@Component({ /* ... */ })
export class DestroyRefComponent {
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    const sub = this.service.getData().subscribe(/*...*/);
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
}

// Pattern 4: Subject + takeUntil (classic)
@Component({ /* ... */ })
export class ClassicComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.service.getData().pipe(
      takeUntil(this.destroy$)
    ).subscribe(/*...*/);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`,
        },
        {
          type: 'tip',
          content:
            'Prefer takeUntilDestroyed() for new code -- it is the cleanest approach with no boilerplate. The async pipe is ideal when you only consume observables in templates. HttpClient observables that complete after a single emission (GET, POST, etc.) do not strictly need unsubscription, but it is a good practice.',
        },

        // --- OnPush Tips ---
        {
          type: 'subheading',
          text: 'OnPush Change Detection Strategy',
        },
        {
          type: 'list',
          style: 'numbered',
          items: [
            'Add changeDetection: ChangeDetectionStrategy.OnPush to every presentational component',
            'Use immutable data patterns: spread operator to create new references when data changes',
            'Use the async pipe in templates: it automatically calls markForCheck()',
            'Use Signals: they integrate natively with OnPush and mark views dirty automatically',
            'If you must mutate state, inject ChangeDetectorRef and call markForCheck() or detectChanges()',
            'Avoid calling methods in templates with Default strategy: they run on every CD cycle. With OnPush + Signals, this is less of a concern.',
          ],
        },

        // --- Resolver Pattern ---
        {
          type: 'subheading',
          text: 'Route Resolver Pattern',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Functional Resolver',
          code: `// product.resolver.ts
export const productResolver: ResolveFn<Product> = (route) => {
  const productService = inject(ProductService);
  const router = inject(Router);
  const id = Number(route.paramMap.get('id'));

  return productService.getById(id).pipe(
    catchError(() => {
      router.navigate(['/products']);
      return EMPTY;
    })
  );
};

// Route config
{ path: 'products/:id', component: ProductDetailComponent,
  resolve: { product: productResolver } }

// Component reads resolved data
@Component({ /* ... */ })
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  product = toSignal(
    this.route.data.pipe(map(data => data['product'] as Product))
  );
}`,
        },
      ],
    },

    // ─── CODE EXAMPLES ─────────────────────────────────────────────
    {
      id: 'code-examples',
      icon: '💻',
      title: 'Interactive Examples',
      description: 'Try editing these live Angular examples',
      content: [
        {
          type: 'interactive-code',
          language: 'typescript',
          title: 'Component with Input/Output',
          description:
            'A counter component demonstrating property binding and event emission using classic decorators.',
          defaultCode: `@Component({
  selector: 'app-counter',
  template: \\\`
    <div>
      <p>Count: {{ count }}</p>
      <button (click)="increment()">+1</button>
      <button (click)="countChange.emit(0)">Reset</button>
    </div>
  \\\`,
})
export class CounterComponent {
  @Input() count = 0;
  @Output() countChange = new EventEmitter<number>();

  increment() {
    this.countChange.emit(this.count + 1);
  }
}`,
        },
        {
          type: 'interactive-code',
          language: 'typescript',
          title: 'Service Injection',
          description:
            'A simple service injected into a component via Angular DI. Shows the injectable decorator and providedIn pattern.',
          defaultCode: `@Injectable({ providedIn: 'root' })
export class TodoService {
  private todos: string[] = [];

  add(todo: string) {
    this.todos = [...this.todos, todo];
  }

  getAll(): string[] {
    return this.todos;
  }

  remove(index: number) {
    this.todos = this.todos.filter((_, i) => i !== index);
  }
}`,
        },
        {
          type: 'interactive-code',
          language: 'html',
          title: 'Template Syntax',
          description: 'Angular template with structural directives, pipes, and bindings.',
          defaultCode: `<div class="user-list">
  <h2>{{ title }}</h2>

  <input
    [(ngModel)]="filterText"
    placeholder="Filter users..."
  />

  <ul>
    <li *ngFor="let user of users | filter:filterText; trackBy: trackById">
      <span [class.active]="user.isActive">
        {{ user.name | titlecase }}
      </span>
      <button (click)="removeUser(user.id)">Remove</button>
    </li>
  </ul>

  <p *ngIf="users.length === 0">No users found.</p>
</div>`,
        },
        {
          type: 'interactive-code',
          language: 'typescript',
          title: 'Reactive Form with Validation',
          description:
            'A registration form using reactive forms with nested form groups, form arrays, and built-in validators.',
          defaultCode: `@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: \\\`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label>
        Name:
        <input formControlName="name">
      </label>

      <label>
        Email:
        <input formControlName="email" type="email">
      </label>

      <fieldset formGroupName="address">
        <legend>Address</legend>
        <input formControlName="city" placeholder="City">
        <input formControlName="zip" placeholder="ZIP Code">
      </fieldset>

      <button type="submit" [disabled]="form.invalid">
        Register
      </button>
    </form>
  \\\`,
})
export class RegistrationComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    address: this.fb.group({
      city: ['', Validators.required],
      zip: ['', Validators.pattern(/^\\d{5}$/)],
    }),
  });

  onSubmit() {
    if (this.form.valid) {
      console.log('Form value:', this.form.value);
    }
  }
}`,
        },
        {
          type: 'interactive-code',
          language: 'typescript',
          title: 'Signal-Based Counter',
          description:
            'A counter using Angular Signals (v16+) with signal(), computed(), and effect().',
          defaultCode: `@Component({
  selector: 'app-signal-counter',
  standalone: true,
  template: \\\`
    <div>
      <h3>Signal Counter</h3>
      <p>Count: {{ count() }}</p>
      <p>Double: {{ doubleCount() }}</p>
      <p>Is Even: {{ isEven() ? 'Yes' : 'No' }}</p>

      <button (click)="increment()">+1</button>
      <button (click)="decrement()">-1</button>
      <button (click)="reset()">Reset</button>
    </div>
  \\\`,
})
export class SignalCounterComponent {
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);
  isEven = computed(() => this.count() % 2 === 0);

  constructor() {
    effect(() => {
      console.log('Count changed to:', this.count());
    });
  }

  increment() { this.count.update(c => c + 1); }
  decrement() { this.count.update(c => c - 1); }
  reset() { this.count.set(0); }
}`,
        },
        {
          type: 'interactive-code',
          language: 'typescript',
          title: 'HTTP Service with RxJS',
          description:
            'A service demonstrating HttpClient with typed responses, error handling, and RxJS operators.',
          defaultCode: `@Injectable({ providedIn: 'root' })
export class UserApiService {
  private http = inject(HttpClient);
  private baseUrl = '/api/users';

  // Cache the user list with shareReplay
  readonly users$ = this.http.get<User[]>(this.baseUrl).pipe(
    retry(2),
    shareReplay(1),
    catchError(error => {
      console.error('Failed to load users:', error);
      return of([]);
    })
  );

  getById(id: number): Observable<User> {
    return this.http.get<User>(\\\`\\\${this.baseUrl}/\\\${id}\\\`).pipe(
      catchError(() => {
        throw new Error(\\\`User \\\${id} not found\\\`);
      })
    );
  }

  search(query: string): Observable<User[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<User[]>(this.baseUrl, { params });
  }

  create(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(\\\`\\\${this.baseUrl}/\\\${id}\\\`);
  }
}`,
        },
      ],
    },

    // ─── ECOSYSTEM ─────────────────────────────────────────────────
    {
      id: 'ecosystem',
      icon: '🌐',
      title: 'Ecosystem & Tools',
      description: 'CLI commands, libraries, and tools in the Angular ecosystem',
      content: [
        // --- CLI Commands ---
        {
          type: 'subheading',
          text: 'Angular CLI Commands',
        },
        {
          type: 'table',
          headers: ['Command', 'Description', 'Common Flags'],
          rows: [
            [
              'ng new <name>',
              'Create a new Angular project',
              '--standalone --style=scss --routing',
            ],
            [
              'ng generate component <name>',
              'Generate a component',
              '--standalone --inline-template --skip-tests',
            ],
            ['ng generate service <name>', 'Generate a service', '--skip-tests'],
            ['ng generate pipe <name>', 'Generate a pipe', '--standalone'],
            ['ng generate directive <name>', 'Generate a directive', '--standalone'],
            ['ng generate guard <name>', 'Generate a route guard', '--functional'],
            ['ng generate interceptor <name>', 'Generate an HTTP interceptor', '--functional'],
            ['ng generate interface <name>', 'Generate a TypeScript interface', ''],
            ['ng generate enum <name>', 'Generate a TypeScript enum', ''],
            ['ng serve', 'Start dev server with live reload', '--port=4200 --open'],
            ['ng build', 'Build for production', '--configuration=production'],
            ['ng test', 'Run unit tests', '--watch --code-coverage'],
            ['ng lint', 'Run linter', '--fix'],
            ['ng add <package>', 'Add a library with schematics', 'ng add @angular/material'],
            [
              'ng update',
              'Update Angular and dependencies',
              'ng update @angular/core @angular/cli',
            ],
            ['ng e2e', 'Run end-to-end tests', ''],
          ],
        },
        {
          type: 'tip',
          content:
            'Use "ng generate" (or shorthand "ng g") to scaffold code with correct boilerplate. For example: "ng g c my-component" creates a standalone component with template, styles, and test file.',
        },

        // --- State Management ---
        {
          type: 'subheading',
          text: 'State Management',
        },
        {
          type: 'table',
          headers: ['Library', 'Approach', 'Best For'],
          rows: [
            [
              'NgRx Store',
              'Redux-inspired with actions, reducers, effects, and selectors',
              'Large apps with complex state, teams familiar with Redux patterns',
            ],
            [
              'NgRx SignalStore',
              'Signal-based, lightweight NgRx store (NgRx v17+)',
              'Modern Angular apps wanting NgRx ecosystem with signals',
            ],
            [
              'NGXS',
              'Redux-like with decorators and less boilerplate than NgRx',
              'Teams wanting structured state management with less ceremony',
            ],
            [
              'Elf',
              'Reactive state management built on RxJS',
              'Flexible, framework-agnostic state management',
            ],
            [
              'Akita',
              'Entity-based state management for Angular',
              'Apps with entity/collection patterns (predecessor to Elf)',
            ],
            [
              'Signal-based services',
              'Plain services using Angular signals for state',
              'Small-to-medium apps, simple state requirements',
            ],
            [
              'BehaviorSubject services',
              'Plain services using RxJS BehaviorSubjects',
              'Medium apps, teams comfortable with RxJS',
            ],
          ],
        },

        // --- UI Libraries ---
        {
          type: 'subheading',
          text: 'UI Component Libraries',
        },
        {
          type: 'table',
          headers: ['Library', 'Design System', 'Notes'],
          rows: [
            [
              'Angular Material',
              'Material Design (Google)',
              'Official library, deeply integrated with Angular CDK, maintained by Angular team',
            ],
            [
              'Angular CDK',
              'Unstyled primitives',
              'Behavior-only building blocks (drag-drop, overlays, virtual scroll, a11y) used by Material',
            ],
            [
              'PrimeNG',
              'PrimeFaces',
              '80+ components, rich feature set, themes, free and commercial versions',
            ],
            [
              'NG-ZORRO',
              'Ant Design',
              'Enterprise-focused, complete component set following Ant Design spec',
            ],
            ['Taiga UI', 'Custom', 'Modular, tree-shakable, well-documented, built on Angular CDK'],
            [
              'Spartan UI',
              'shadcn/ui inspired',
              'Headless + styled components inspired by shadcn/ui for Angular',
            ],
            [
              'Nebular',
              'Eva Design',
              'Auth, themes, and UI components for enterprise applications',
            ],
          ],
        },

        // --- Testing ---
        {
          type: 'subheading',
          text: 'Testing',
        },
        {
          type: 'table',
          headers: ['Tool', 'Type', 'Description'],
          rows: [
            [
              'Karma + Jasmine',
              'Unit (default)',
              'Angular CLI default test runner and assertion library (being phased out)',
            ],
            [
              'Jest',
              'Unit',
              'Fast, popular test framework; use @angular-builders/jest or jest-preset-angular',
            ],
            [
              'Vitest',
              'Unit',
              'Fast Vite-native test runner, gaining Angular support via analogjs/vitest-angular',
            ],
            [
              'Spectator',
              'Unit',
              'Simplifies Angular testing with a clean API, reduces boilerplate significantly',
            ],
            [
              'ng-mocks',
              'Unit',
              'Auto-mock Angular dependencies (components, directives, pipes, services)',
            ],
            [
              'Angular Testing Library',
              'Unit',
              '@testing-library/angular: test from user perspective, not implementation',
            ],
            [
              'Cypress',
              'E2E',
              'Popular end-to-end testing framework with great DX and time-travel debugging',
            ],
            ['Playwright', 'E2E', 'Cross-browser E2E testing by Microsoft, fast and reliable'],
            [
              'Storybook',
              'Component',
              'Develop and test UI components in isolation with interactive stories',
            ],
          ],
        },

        // --- SSR ---
        {
          type: 'subheading',
          text: 'Server-Side Rendering & Meta-Frameworks',
        },
        {
          type: 'table',
          headers: ['Tool', 'Description', 'Key Features'],
          rows: [
            [
              'Angular SSR (built-in)',
              'Official SSR support integrated into Angular CLI (v17+)',
              'Hydration, streaming, event replay, no separate package needed',
            ],
            [
              'Angular Universal',
              'Legacy SSR package (pre-v17)',
              'Server-side rendering, pre-rendering; now merged into @angular/ssr',
            ],
            [
              'Analog.js',
              'Full-stack meta-framework for Angular (like Next.js for React)',
              'File-based routing, API routes, SSR/SSG, Vite-powered, Markdown support',
            ],
          ],
        },

        // --- Dev Tools ---
        {
          type: 'subheading',
          text: 'Developer Tools',
        },
        {
          type: 'table',
          headers: ['Tool', 'Purpose', 'Notes'],
          rows: [
            [
              'Angular DevTools',
              'Chrome/Firefox extension for debugging',
              'Component tree, change detection profiling, dependency injection explorer',
            ],
            [
              'Compodoc',
              'Documentation generator',
              'Generates static documentation site from code comments and decorators',
            ],
            [
              'Storybook',
              'Component development environment',
              'Build and test components in isolation, visual regression testing',
            ],
            [
              'Angular ESLint',
              'Linting',
              'Replaces deprecated TSLint, provides Angular-specific lint rules',
            ],
            [
              'Nx Console',
              'IDE extension for Nx/Angular',
              'Visual UI for running generators, tasks, and understanding project graph',
            ],
            [
              'source-map-explorer',
              'Bundle analysis',
              'Visualize what contributes to bundle size, find optimization opportunities',
            ],
          ],
        },

        // --- Build Tools ---
        {
          type: 'subheading',
          text: 'Build Tools & Monorepo',
        },
        {
          type: 'table',
          headers: ['Tool', 'Description', 'Notes'],
          rows: [
            [
              'Angular CLI (esbuild)',
              'Default build system since Angular 17',
              'Uses esbuild + Vite for dev server, dramatically faster than Webpack',
            ],
            [
              'Nx',
              'Smart monorepo build system',
              'Computation caching, affected commands, project graph, supports Angular natively',
            ],
            [
              'Webpack (legacy)',
              'Previous default bundler',
              'Still available via @angular-devkit/build-angular:browser builder',
            ],
            [
              'Vite',
              'Next-generation frontend tooling',
              'Used by Angular CLI internally since v17 for dev server',
            ],
          ],
        },

        // --- i18n ---
        {
          type: 'subheading',
          text: 'Internationalization (i18n)',
        },
        {
          type: 'table',
          headers: ['Tool', 'Approach', 'Notes'],
          rows: [
            [
              'Angular i18n (built-in)',
              'Compile-time translation with i18n attributes',
              'Best performance (AOT), one build per locale, official solution',
            ],
            [
              'Transloco',
              'Runtime translation via service/pipe',
              'Lazy-load translations, switch languages at runtime, great DX, active maintenance',
            ],
            [
              'ngx-translate',
              'Runtime translation via service/pipe',
              'Popular but less maintained; consider Transloco for new projects',
            ],
          ],
        },

        {
          type: 'warning',
          content:
            'The Angular ecosystem evolves rapidly. Standalone components (v14+), signal-based reactivity (v16+), built-in control flow (v17+), and esbuild (v17+) represent major shifts. When evaluating third-party libraries, check compatibility with the latest Angular version and prefer actively maintained projects.',
        },

        {
          type: 'tip',
          content:
            'Start a new project with: ng new my-app --standalone --style=scss --ssr. This gives you standalone components, SCSS styling, and server-side rendering out of the box. Add Angular Material with: ng add @angular/material.',
        },
      ],
    },
  ],
};
