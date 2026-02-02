import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CodeBlock } from '../components/CodeBlock';

const meta = {
  title: 'Code/CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0f' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

// JavaScript code
export const JavaScript: Story = {
  args: {
    language: 'javascript',
    showLineNumbers: true,
    code: `const fetchUsers = async () => {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    return data.filter(user => user.isActive);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
};

// Usage
const activeUsers = await fetchUsers();
console.log(\`Found \${activeUsers.length} active users\`);`,
  },
};

// TypeScript code with interfaces and generics
export const TypeScript: Story = {
  args: {
    language: 'typescript',
    showLineNumbers: true,
    code: `interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

type UserRole = 'admin' | 'editor' | 'viewer';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  readonly createdAt: Date;
}

async function getUser(id: string): Promise<ApiResponse<User>> {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error(\`HTTP error: \${response.status}\`);
  }
  return response.json() as Promise<ApiResponse<User>>;
}

export default getUser;`,
  },
};

// Python code
export const Python: Story = {
  args: {
    language: 'python',
    showLineNumbers: true,
    code: `from typing import List, Optional
from dataclasses import dataclass

@dataclass
class TreeNode:
    val: int
    left: Optional['TreeNode'] = None
    right: Optional['TreeNode'] = None

def inorder_traversal(root: Optional[TreeNode]) -> List[int]:
    """Perform an inorder traversal of a binary tree."""
    if root is None:
        return []

    result = []
    result.extend(inorder_traversal(root.left))
    result.append(root.val)
    result.extend(inorder_traversal(root.right))
    return result

# Build a sample tree
root = TreeNode(4,
    left=TreeNode(2, TreeNode(1), TreeNode(3)),
    right=TreeNode(6, TreeNode(5), TreeNode(7))
)

print(inorder_traversal(root))  # [1, 2, 3, 4, 5, 6, 7]`,
  },
};

// CSS code
export const CSS: Story = {
  args: {
    language: 'css',
    showLineNumbers: true,
    code: `.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4);
}

.card__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #e2e8f0;
}

@media (max-width: 768px) {
  .card {
    padding: 1rem;
  }
}`,
  },
};

// HTML code
export const HTML: Story = {
  args: {
    language: 'html',
    showLineNumbers: true,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Coding Drills</title>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <header class="navbar">
    <nav aria-label="Main navigation">
      <a href="/" class="logo">Coding Drills</a>
      <ul class="nav-links">
        <li><a href="/quiz">Quiz</a></li>
        <li><a href="/drill">Drill</a></li>
        <li><a href="/reference">Reference</a></li>
      </ul>
    </nav>
  </header>
  <main id="app"></main>
  <script src="/main.js" type="module"></script>
</body>
</html>`,
  },
};

// With line numbers visible
export const WithLineNumbers: Story = {
  args: {
    language: 'javascript',
    showLineNumbers: true,
    code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}`,
  },
};

// Without line numbers
export const WithoutLineNumbers: Story = {
  args: {
    language: 'javascript',
    showLineNumbers: false,
    code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}`,
  },
};

// Long code block with many lines
export const LongCode: Story = {
  args: {
    language: 'typescript',
    showLineNumbers: true,
    code: `/**
 * A priority queue implementation using a binary min-heap.
 * Supports insert, extractMin, and peek operations.
 */
class PriorityQueue<T> {
  private heap: { value: T; priority: number }[] = [];

  get size(): number {
    return this.heap.length;
  }

  get isEmpty(): boolean {
    return this.heap.length === 0;
  }

  insert(value: T, priority: number): void {
    this.heap.push({ value, priority });
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin(): T | undefined {
    if (this.isEmpty) return undefined;

    const min = this.heap[0];
    const last = this.heap.pop()!;

    if (!this.isEmpty) {
      this.heap[0] = last;
      this.sinkDown(0);
    }

    return min.value;
  }

  peek(): T | undefined {
    return this.isEmpty ? undefined : this.heap[0].value;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].priority <= this.heap[index].priority) break;
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
    }
  }

  private sinkDown(index: number): void {
    const length = this.heap.length;
    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (left < length && this.heap[left].priority < this.heap[smallest].priority) {
        smallest = left;
      }
      if (right < length && this.heap[right].priority < this.heap[smallest].priority) {
        smallest = right;
      }
      if (smallest === index) break;

      [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
      index = smallest;
    }
  }
}

// Usage
const pq = new PriorityQueue<string>();
pq.insert('low priority task', 10);
pq.insert('urgent task', 1);
pq.insert('medium task', 5);

console.log(pq.extractMin()); // "urgent task"
console.log(pq.extractMin()); // "medium task"
console.log(pq.size);         // 1`,
  },
};

// Short single-line code
export const ShortCode: Story = {
  args: {
    language: 'javascript',
    showLineNumbers: true,
    code: `const sum = (a, b) => a + b;`,
  },
};

// Go language
export const Go: Story = {
  args: {
    language: 'go',
    showLineNumbers: true,
    code: `package main

import (
	"fmt"
	"sync"
)

func mergeSort(arr []int) []int {
	if len(arr) <= 1 {
		return arr
	}

	mid := len(arr) / 2
	var left, right []int
	var wg sync.WaitGroup
	wg.Add(2)

	go func() {
		defer wg.Done()
		left = mergeSort(arr[:mid])
	}()

	go func() {
		defer wg.Done()
		right = mergeSort(arr[mid:])
	}()

	wg.Wait()
	return merge(left, right)
}

func merge(left, right []int) []int {
	result := make([]int, 0, len(left)+len(right))
	i, j := 0, 0

	for i < len(left) && j < len(right) {
		if left[i] <= right[j] {
			result = append(result, left[i])
			i++
		} else {
			result = append(result, right[j])
			j++
		}
	}

	result = append(result, left[i:]...)
	result = append(result, right[j:]...)
	return result
}

func main() {
	arr := []int{38, 27, 43, 3, 9, 82, 10}
	sorted := mergeSort(arr)
	fmt.Println(sorted)
}`,
  },
};

// Rust language
export const Rust: Story = {
  args: {
    language: 'rust',
    showLineNumbers: true,
    code: `use std::collections::HashMap;

fn two_sum(nums: &[i32], target: i32) -> Option<(usize, usize)> {
    let mut map: HashMap<i32, usize> = HashMap::new();

    for (i, &num) in nums.iter().enumerate() {
        let complement = target - num;
        if let Some(&j) = map.get(&complement) {
            return Some((j, i));
        }
        map.insert(num, i);
    }

    None
}

fn main() {
    let nums = vec![2, 7, 11, 15];
    let target = 9;

    match two_sum(&nums, target) {
        Some((i, j)) => println!("Indices: ({}, {})", i, j),
        None => println!("No solution found"),
    }
}`,
  },
};

// Java language
export const Java: Story = {
  args: {
    language: 'java',
    showLineNumbers: true,
    code: `import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class StudentGradeAnalyzer {
    private final List<Student> students;

    public StudentGradeAnalyzer(List<Student> students) {
        this.students = new ArrayList<>(students);
    }

    public List<Student> getHonorRoll() {
        return students.stream()
            .filter(s -> s.getGpa() >= 3.5)
            .sorted((a, b) -> Double.compare(b.getGpa(), a.getGpa()))
            .collect(Collectors.toList());
    }

    public double getClassAverage() {
        return students.stream()
            .mapToDouble(Student::getGpa)
            .average()
            .orElse(0.0);
    }

    public static void main(String[] args) {
        var analyzer = new StudentGradeAnalyzer(List.of(
            new Student("Alice", 3.8),
            new Student("Bob", 3.2),
            new Student("Carol", 3.9)
        ));
        System.out.println("Honor Roll: " + analyzer.getHonorRoll());
        System.out.printf("Class Average: %.2f%n", analyzer.getClassAverage());
    }
}`,
  },
};

// All supported languages overview
export const AllLanguages: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div>
        <p className="text-xs text-zinc-500 mb-2">JavaScript</p>
        <CodeBlock
          language="javascript"
          showLineNumbers={true}
          code={`const greet = (name) => \`Hello, \${name}!\`;
console.log(greet('World'));`}
        />
      </div>
      <div>
        <p className="text-xs text-zinc-500 mb-2">TypeScript</p>
        <CodeBlock
          language="typescript"
          showLineNumbers={true}
          code={`interface Props { name: string; age?: number; }
const User = ({ name, age = 0 }: Props) => name;`}
        />
      </div>
      <div>
        <p className="text-xs text-zinc-500 mb-2">Python</p>
        <CodeBlock
          language="python"
          showLineNumbers={true}
          code={`def fibonacci(n: int) -> list[int]:
    a, b = 0, 1
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result`}
        />
      </div>
      <div>
        <p className="text-xs text-zinc-500 mb-2">Go</p>
        <CodeBlock
          language="go"
          showLineNumbers={true}
          code={`func reverse(s string) string {
    runes := []rune(s)
    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
        runes[i], runes[j] = runes[j], runes[i]
    }
    return string(runes)
}`}
        />
      </div>
      <div>
        <p className="text-xs text-zinc-500 mb-2">Rust</p>
        <CodeBlock
          language="rust"
          showLineNumbers={true}
          code={`fn is_palindrome(s: &str) -> bool {
    let chars: Vec<char> = s.chars().collect();
    let len = chars.len();
    for i in 0..len / 2 {
        if chars[i] != chars[len - 1 - i] {
            return false;
        }
    }
    true
}`}
        />
      </div>
      <div>
        <p className="text-xs text-zinc-500 mb-2">Java</p>
        <CodeBlock
          language="java"
          showLineNumbers={true}
          code={`public static int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`}
        />
      </div>
    </div>
  ),
};

// Line numbers comparison
export const LineNumbersComparison: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div>
        <p className="text-xs text-zinc-500 mb-2">With line numbers</p>
        <CodeBlock
          language="javascript"
          showLineNumbers={true}
          code={`function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x <= pivot);
  const right = arr.slice(1).filter(x => x > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}`}
        />
      </div>
      <div>
        <p className="text-xs text-zinc-500 mb-2">Without line numbers</p>
        <CodeBlock
          language="javascript"
          showLineNumbers={false}
          code={`function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x <= pivot);
  const right = arr.slice(1).filter(x => x > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}`}
        />
      </div>
    </div>
  ),
};
