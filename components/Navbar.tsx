'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

interface NavLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

interface NavbarProps {
  links?: NavLink[];
  showLanguageNav?: boolean;
  currentLanguage?: string;
}

export function Navbar({ links = [], showLanguageNav = false, currentLanguage }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname() ?? '/';

  // Track scroll position for enhanced styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Route change cleanup
    setIsMenuOpen(false);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`
        sticky top-0 z-50 w-full
        transition-all duration-300 ease-out
        ${
          isScrolled
            ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-border-subtle shadow-lg shadow-black/5'
            : 'bg-transparent border-b border-transparent'
        }
      `}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            {/* Logo Icon */}
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

            {/* Logo Text */}
            <span className="text-lg font-bold gradient-text hidden sm:block">Code Drills</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg
                  text-sm font-medium
                  transition-all duration-200
                  ${
                    isActiveLink(link.href)
                      ? 'text-text-primary bg-bg-elevated'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50'
                  }
                `}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`
                md:hidden p-2 rounded-lg
                bg-bg-elevated hover:bg-bg-overlay
                border border-border-subtle hover:border-border-default
                text-text-secondary hover:text-text-primary
                transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60
              `}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center gap-1">
                <span
                  className={`
                    block w-5 h-0.5 bg-current rounded-full
                    transition-all duration-300 ease-out
                    ${isMenuOpen ? 'rotate-45 translate-y-[3px]' : ''}
                  `}
                />
                <span
                  className={`
                    block w-5 h-0.5 bg-current rounded-full
                    transition-all duration-300 ease-out
                    ${isMenuOpen ? 'opacity-0' : ''}
                  `}
                />
                <span
                  className={`
                    block w-5 h-0.5 bg-current rounded-full
                    transition-all duration-300 ease-out
                    ${isMenuOpen ? '-rotate-45 -translate-y-[3px]' : ''}
                  `}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 top-16 z-40 md:hidden
          transition-all duration-300 ease-out
          ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Menu Content */}
        <div
          className={`
            absolute top-0 left-0 right-0
            bg-bg-surface/95 backdrop-blur-xl
            border-b border-border-subtle
            shadow-2xl shadow-black/20
            transform transition-all duration-300 ease-out
            ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}
          `}
        >
          <nav className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-col gap-1">
              {/* Home Link - always visible */}
              <Link
                href="/"
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  text-base font-medium
                  transition-all duration-200
                  ${
                    isActiveLink('/') && pathname === '/'
                      ? 'text-text-primary bg-bg-elevated'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50'
                  }
                `}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </Link>

              {/* Dynamic Links */}
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    text-base font-medium
                    transition-all duration-200
                    ${
                      isActiveLink(link.href)
                        ? 'text-text-primary bg-bg-elevated'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50'
                    }
                  `}
                >
                  {link.icon || (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  )}
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Current Language Badge (if applicable) */}
            {showLanguageNav && currentLanguage && (
              <div className="mt-4 pt-4 border-t border-border-subtle">
                <div className="px-4 py-2 text-sm text-text-muted">Current Language</div>
                <div className="px-4 py-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-text-primary font-medium capitalize">
                    {currentLanguage}
                  </span>
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
