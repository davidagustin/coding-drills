'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { LanguageId } from '@/lib/types';
import { isValidLanguage } from '../config';

/**
 * Redirect pattern-quiz route to quiz with pattern-recognition type
 * This maintains backward compatibility while integrating into the main quiz page
 */
export default function PatternQuizRedirect() {
  const params = useParams();
  const router = useRouter();
  const languageParam = params?.language as string;
  const language: LanguageId = isValidLanguage(languageParam) ? languageParam : 'javascript';

  useEffect(() => {
    // Redirect to quiz page with pattern-recognition query param
    router.replace(`/${language}/quiz?type=pattern-recognition`);
  }, [language, router]);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-zinc-400">Redirecting to Quiz...</div>
    </div>
  );
}
