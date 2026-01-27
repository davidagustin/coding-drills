// Exercise types for algorithm and traversal drills

export type ExerciseCategory =
  | 'traversal'
  | 'iteration-patterns'
  | 'recursion'
  | 'combinatorics'
  | 'searching'
  | 'data-structures'
  | 'memoization'
  | 'utilities';

export type ExerciseDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Exercise {
  id: string;
  title: string;
  category: ExerciseCategory;
  difficulty: ExerciseDifficulty;
  description: string;
  explanation?: string; // Long-form educational content shown in Learn tab
  instructions: string[];
  starterCode: string;
  solutionCode: string;
  testCases: ExerciseTestCase[];
  hints: string[];
  concepts: string[];
  timeLimit?: number; // in seconds
}

export interface ExerciseTestCase {
  input: unknown;
  expected: unknown;
  description: string;
}

export interface ExerciseProgress {
  exerciseId: string;
  completed: boolean;
  attempts: number;
  bestTime?: number;
  lastAttempt?: string;
}

export interface ExerciseSession {
  language: string;
  exercises: ExerciseProgress[];
  totalCompleted: number;
  totalTime: number;
}

// Category display configuration
export const EXERCISE_CATEGORIES: Record<
  ExerciseCategory,
  {
    name: string;
    icon: string;
    description: string;
  }
> = {
  combinatorics: {
    name: 'Combinatorics',
    icon: 'generate',
    description: 'Generate permutations, combinations, subsets, and cartesian products',
  },
  memoization: {
    name: 'Memoization & Caching',
    icon: 'cache',
    description: 'Cache results, debounce, throttle, and optimize with memoization',
  },
  utilities: {
    name: 'Array Utilities',
    icon: 'utility',
    description: 'Chunk, zip, partition, group, and transform arrays',
  },
  traversal: {
    name: 'Tree & Graph Traversal',
    icon: 'tree',
    description: 'BFS, DFS, and graph navigation patterns you can reuse',
  },
  'iteration-patterns': {
    name: 'Iteration Patterns',
    icon: 'loop',
    description: 'Sliding windows, two pointers, and iteration control',
  },
  recursion: {
    name: 'Recursion',
    icon: 'recursion',
    description: 'Recursive patterns for trees, backtracking, and divide-conquer',
  },
  searching: {
    name: 'Search & Sort',
    icon: 'search',
    description: 'Binary search, merge sorted, and comparison utilities',
  },
  'data-structures': {
    name: 'Data Structures',
    icon: 'structure',
    description: 'Stacks, queues, heaps, tries, and union-find implementations',
  },
};

export const DIFFICULTY_CONFIG: Record<
  ExerciseDifficulty,
  {
    name: string;
    color: string;
    bgColor: string;
    points: number;
  }
> = {
  beginner: {
    name: 'Beginner',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    points: 10,
  },
  intermediate: {
    name: 'Intermediate',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    points: 25,
  },
  advanced: {
    name: 'Advanced',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    points: 50,
  },
};
