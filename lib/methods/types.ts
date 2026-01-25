/**
 * Core type definitions for the methods reference system
 */

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type Category =
  | 'array'
  | 'string'
  | 'object'
  | 'number'
  | 'date'
  | 'math'
  | 'regex'
  | 'async'
  | 'utility'
  | 'collection'
  | 'functional'
  | 'io'
  | 'type';

export interface MethodArgument {
  name: string;
  type: string;
  description: string;
  optional?: boolean;
  defaultValue?: string;
}

export interface MethodReturnValue {
  type: string;
  description: string;
}

export interface MethodExample {
  title?: string;
  code: string;
  output: string;
  explanation?: string;
}

export interface MethodReference {
  id: string;
  name: string;
  category: Category;
  difficulty: Difficulty;
  syntax: string;
  briefDescription: string;
  fullDescription: string;
  arguments: MethodArgument[];
  returnValue: MethodReturnValue;
  examples: MethodExample[];
  relatedMethods?: string[];
  tips?: string[];
  commonMistakes?: string[];
  sinceVersion?: string;
}

export interface LanguageConfig {
  id: string;
  name: string;
  icon: string;
  categories: Category[];
  methods: MethodReference[];
}

export const CATEGORY_LABELS: Record<Category, string> = {
  array: 'Array',
  string: 'String',
  object: 'Object',
  number: 'Number',
  date: 'Date & Time',
  math: 'Math',
  regex: 'Regular Expressions',
  async: 'Async/Promises',
  utility: 'Utility',
  collection: 'Collections',
  functional: 'Functional',
  io: 'Input/Output',
  type: 'Type Checking',
};

export const CATEGORY_COLORS: Record<Category, string> = {
  array: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  string: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  object: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  number: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  date: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  math: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  regex: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  async: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  utility: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  collection: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
  functional: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
  io: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  type: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200',
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  beginner: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  intermediate: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  advanced: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
};
