import type { CheatsheetData } from '../types';

export const angularCheatsheet: CheatsheetData = {
  framework: 'angular',
  title: 'Angular Cheatsheet',
  lastUpdated: '2025-01',
  sections: [
    {
      id: 'overview',
      icon: '📋',
      title: 'Overview',
      description: 'What Angular is and how it works',
      content: [
        {
          type: 'text',
          content:
            'Angular is a full-featured, opinionated framework for building large-scale web applications. Maintained by Google. Uses TypeScript by default, provides dependency injection, a powerful template system, and a comprehensive CLI.',
        },
        {
          type: 'list',
          style: 'bullet',
          items: [
            'TypeScript-first with decorators and strong typing',
            'Component-based architecture with dependency injection',
            'Two-way data binding with template syntax',
            'Powerful CLI for scaffolding and building',
            'Built-in solutions for routing/forms/HTTP/testing',
          ],
        },
        {
          type: 'tip',
          content:
            'Angular is a framework, not just a library. It provides opinions on how to structure your entire application, which helps teams stay consistent at scale.',
        },
      ],
    },
    {
      id: 'core-concepts',
      icon: '🧠',
      title: 'Core Concepts',
      description: 'Components, templates, directives, and pipes',
      content: [
        {
          type: 'subheading',
          text: 'Components & Templates',
        },
        {
          type: 'text',
          content:
            "Angular components are TypeScript classes decorated with @Component. Templates use Angular's own syntax for bindings, directives, and pipes.",
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Basic Component',
          code: `@Component({
  selector: 'app-greeting',
  template: \`
    <h1>Hello, {{ name }}!</h1>
    <p>You are {{ age }} years old.</p>
  \`,
})
export class GreetingComponent {
  @Input() name = '';
  @Input() age = 0;
}`,
        },
        {
          type: 'subheading',
          text: 'Template Syntax',
        },
        {
          type: 'code',
          language: 'html',
          title: 'Template Bindings',
          code: `<!-- Interpolation -->
<p>{{ user.name }}</p>

<!-- Property binding -->
<img [src]="imageUrl" [alt]="imageAlt">

<!-- Event binding -->
<button (click)="onClick()">Click me</button>

<!-- Two-way binding -->
<input [(ngModel)]="searchQuery">

<!-- Structural directives -->
<div *ngIf="isVisible">Shown conditionally</div>
<li *ngFor="let item of items; trackBy: trackById">
  {{ item.name }}
</li>`,
        },
        {
          type: 'subheading',
          text: 'Pipes',
        },
        {
          type: 'text',
          content:
            'Pipes transform displayed values in templates. Angular provides built-in pipes and you can create custom ones.',
        },
        {
          type: 'code',
          language: 'html',
          title: 'Built-in Pipes',
          code: `{{ birthday | date:'longDate' }}
{{ price | currency:'USD' }}
{{ name | uppercase }}
{{ items | slice:0:5 }}
{{ data | json }}
{{ value | async }}`,
        },
        {
          type: 'warning',
          content:
            'Avoid impure pipes (pipes that depend on external state). They run on every change detection cycle and can hurt performance.',
        },
      ],
    },
    {
      id: 'key-apis',
      icon: '🔑',
      title: 'Key APIs',
      description: 'Essential decorators, services, and modules',
      content: [
        {
          type: 'table',
          headers: ['API', 'Purpose', 'Example'],
          rows: [
            ['@Component', 'Define a component', '@Component({ selector, template })'],
            ['@Injectable', 'Mark a class for DI', '@Injectable({ providedIn: "root" })'],
            [
              '@Input/@Output',
              'Component communication',
              '@Input() data; @Output() event = new EventEmitter()',
            ],
            ['HttpClient', 'HTTP requests', 'this.http.get<T>(url).subscribe(...)'],
            ['Router', 'Navigation', 'this.router.navigate(["/path"])'],
            ['FormBuilder', 'Reactive forms', 'this.fb.group({ name: ["", Validators.required] })'],
            [
              'Observable/Subject',
              'Reactive streams (RxJS)',
              'this.data$.pipe(map(...), filter(...))',
            ],
          ],
        },
        {
          type: 'subheading',
          text: 'Dependency Injection',
        },
        {
          type: 'text',
          content:
            "Angular's DI system automatically provides instances of services to components and other services. Declare a service with @Injectable and Angular handles the rest.",
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Service with DI',
          code: `@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }
}

@Component({ /* ... */ })
export class UserListComponent {
  users$ = this.userService.getUsers();

  constructor(private userService: UserService) {}
}`,
        },
        {
          type: 'tip',
          content:
            "Use `providedIn: 'root'` for singleton services. Angular tree-shakes unused services automatically.",
        },
      ],
    },
    {
      id: 'common-patterns',
      icon: '🔄',
      title: 'Common Patterns',
      description: 'Widely-used Angular patterns',
      content: [
        {
          type: 'subheading',
          text: 'Guards & Interceptors',
        },
        {
          type: 'text',
          content: 'Guards protect routes, interceptors modify HTTP requests/responses globally.',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Route Guard',
          code: `@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) return true;
    this.router.navigate(['/login']);
    return false;
  }
}`,
        },
        {
          type: 'subheading',
          text: 'Reactive Forms',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Reactive Form',
          code: `export class ProfileFormComponent {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    age: [null, [Validators.min(0), Validators.max(150)]],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}`,
        },
        {
          type: 'subheading',
          text: 'RxJS Operators',
        },
        {
          type: 'code',
          language: 'typescript',
          title: 'Common RxJS Patterns',
          code: `// Search with debounce
this.searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(query => this.api.search(query))
).subscribe(results => this.results = results);

// Combine multiple streams
combineLatest([this.user$, this.settings$]).pipe(
  map(([user, settings]) => ({ user, settings }))
).subscribe(data => this.viewModel = data);`,
        },
      ],
    },
    {
      id: 'code-examples',
      icon: '💻',
      title: 'Interactive Examples',
      description: 'Try editing these live examples',
      content: [
        {
          type: 'interactive-code',
          language: 'typescript',
          title: 'Component with Input/Output',
          description: 'A component demonstrating property binding and event emission.',
          defaultCode: `@Component({
  selector: 'app-counter',
  template: \`
    <div>
      <p>Count: {{ count }}</p>
      <button (click)="increment()">+1</button>
      <button (click)="countChange.emit(0)">Reset</button>
    </div>
  \`,
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
          description: 'A service injected into a component via Angular DI.',
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
          description: 'Angular template with structural directives and bindings.',
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
      ],
    },
    {
      id: 'ecosystem',
      icon: '🌐',
      title: 'Ecosystem & Tools',
      description: 'Popular libraries and tools in the Angular ecosystem',
      content: [
        {
          type: 'table',
          headers: ['Tool', 'Category', 'Description'],
          rows: [
            ['Angular CLI', 'Tooling', 'Official CLI for scaffolding, building, and testing'],
            ['NgRx', 'State Management', 'Reactive state management inspired by Redux'],
            ['Angular Material', 'UI Library', 'Official Material Design component library'],
            [
              'RxJS',
              'Reactive Programming',
              'Library for composing asynchronous and event-based programs',
            ],
            ['Nx', 'Monorepo', 'Build system and monorepo tools for Angular at scale'],
            ['Transloco', 'i18n', 'Internationalization library for Angular applications'],
            ['Angular Universal', 'SSR', 'Server-side rendering for Angular applications'],
            ['Karma + Jasmine', 'Testing', 'Default test runner and assertion library'],
          ],
        },
        {
          type: 'tip',
          content:
            'The Angular CLI is essential — use `ng generate` to scaffold components, services, pipes, and more with the correct boilerplate.',
        },
      ],
    },
  ],
};
