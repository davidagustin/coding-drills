'use client';

import { useParams } from 'next/navigation';
import { PatternQuizContent } from '@/components/PatternQuizContent';
import type { LanguageId } from '@/lib/types';
import { isValidLanguage } from '../config';

export default function LanguagePatternQuizPage() {
  const params = useParams();
  const languageParam = params?.language as string;
  const language: LanguageId = (
    isValidLanguage(languageParam) ? languageParam : 'javascript'
  ) as LanguageId;

  return <PatternQuizContent backHref={`/${language}`} />;
}
