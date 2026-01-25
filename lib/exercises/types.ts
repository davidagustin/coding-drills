// Exercise types for algorithm and traversal drills

export type ExerciseCategory =
  | 'traversal'
  | 'iteration-patterns'
  | 'recursion'
  | 'generation'
  | 'searching'
  | 'data-structures';

export type ExerciseDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Exercise {
  id: string;
  title: string;
  category: ExerciseCategory;
  difficulty: ExerciseDifficulty;
  description: string;
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
export const EXERCISE_CATEGORIES: Record<ExerciseCategory, {
  name: string;
  icon: string;
  description: string;
}> = {
  'traversal': {
    name: 'Tree & Graph Traversal',
    icon: 'tree',
    description: 'Master DFS, BFS, and graph navigation patterns'
  },
  'iteration-patterns': {
    name: 'Iteration Patterns',
    icon: 'loop',
    description: 'Control loops with skip patterns, step sizes, and conditions'
  },
  'recursion': {
    name: 'Recursion',
    icon: 'recursion',
    description: 'Solve problems using recursive function calls'
  },
  'generation': {
    name: 'Generation Algorithms',
    icon: 'generate',
    description: 'Generate sequences, primes, and mathematical patterns'
  },
  'searching': {
    name: 'Searching',
    icon: 'search',
    description: 'Find elements using linear, binary, and other search methods'
  },
  'data-structures': {
    name: 'Data Structures',
    icon: 'structure',
    description: 'Work with arrays, linked lists, stacks, and queues'
  }
};

export const DIFFICULTY_CONFIG: Record<ExerciseDifficulty, {
  name: string;
  color: string;
  bgColor: string;
  points: number;
}> = {
  beginner: {
    name: 'Beginner',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    points: 10
  },
  intermediate: {
    name: 'Intermediate',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    points: 25
  },
  advanced: {
    name: 'Advanced',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    points: 50
  }
};
