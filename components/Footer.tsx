import Link from 'next/link';

interface FooterProps {
  className?: string;
  showFullFooter?: boolean;
}

export function Footer({ className = '', showFullFooter = true }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`
        border-t border-border-subtle
        bg-bg-primary/50 backdrop-blur-sm
        ${className}
      `}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {showFullFooter && (
          <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center gap-2 group">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  <svg
                    className="relative w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <span className="text-lg font-bold gradient-text">Code Drills</span>
              </Link>
              <p className="text-sm text-text-muted max-w-xs">
                Master programming methods through focused practice. Build muscle memory for the
                code patterns you use every day.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                Languages
              </h3>
              <ul className="space-y-2">
                {[
                  { name: 'JavaScript', slug: 'javascript' },
                  { name: 'TypeScript', slug: 'typescript' },
                  { name: 'Python', slug: 'python' },
                  { name: 'Java', slug: 'java' },
                ].map((lang) => (
                  <li key={lang.slug}>
                    <Link
                      href={`/${lang.slug}`}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                    >
                      {lang.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                Connect
              </h3>
              <div className="flex items-center gap-4">
                {/* GitHub Link */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    p-2 rounded-lg
                    bg-bg-elevated hover:bg-bg-overlay
                    border border-border-subtle hover:border-border-default
                    text-text-secondary hover:text-text-primary
                    transition-all duration-200
                    group
                  "
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                    />
                  </svg>
                </a>

                {/* Twitter/X Link */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    p-2 rounded-lg
                    bg-bg-elevated hover:bg-bg-overlay
                    border border-border-subtle hover:border-border-default
                    text-text-secondary hover:text-text-primary
                    transition-all duration-200
                    group
                  "
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div
          className={`
            py-4 flex flex-col sm:flex-row items-center justify-between gap-4
            ${showFullFooter ? 'border-t border-border-subtle/50' : ''}
          `}
        >
          {/* Copyright */}
          <p className="text-sm text-text-muted">
            &copy; {currentYear} Code Drills. All rights reserved.
          </p>

          {/* Made with love */}
          <p className="text-sm text-text-muted flex items-center gap-1.5">
            Made with
            <span className="text-red-500 animate-pulse inline-block">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
            and Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
