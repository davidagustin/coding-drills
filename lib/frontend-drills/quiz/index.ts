import type { FrameworkId, FrontendQuizQuestion } from '../types';
import { angularQuizQuestions } from './angular';
import { nativeJsQuizQuestions } from './native-js';
import { reactQuizQuestions } from './react';
import { vueQuizQuestions } from './vue';

export const quizQuestionsByFramework: Record<FrameworkId, FrontendQuizQuestion[]> = {
  'native-js': nativeJsQuizQuestions,
  react: reactQuizQuestions,
  angular: angularQuizQuestions,
  vue: vueQuizQuestions,
};

export function getQuizQuestions(framework: FrameworkId): FrontendQuizQuestion[] {
  return quizQuestionsByFramework[framework] || [];
}

export function getQuizQuestionCount(framework: FrameworkId): number {
  return getQuizQuestions(framework).length;
}

export function getTotalQuizQuestionCount(): number {
  return Object.values(quizQuestionsByFramework).reduce((sum, qs) => sum + qs.length, 0);
}
