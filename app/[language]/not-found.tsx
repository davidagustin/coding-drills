import Link from "next/link";
import { SUPPORTED_LANGUAGES, LANGUAGE_CONFIG } from "./config";

export default function LanguageNotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Language Not Found
        </h2>
        <p className="text-zinc-400 mb-8">
          The programming language you requested is not supported. Please choose
          from one of our available languages below.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const config = LANGUAGE_CONFIG[lang];
            return (
              <Link
                key={lang}
                href={`/${lang}`}
                className={`px-4 py-2 rounded-lg ${config.bgColor} ${config.color} ${config.borderColor} border hover:scale-105 transition-transform font-medium`}
              >
                {config.name}
              </Link>
            );
          })}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
