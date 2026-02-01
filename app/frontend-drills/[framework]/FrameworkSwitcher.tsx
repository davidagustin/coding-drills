'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FRAMEWORK_CONFIG, FRAMEWORK_IDS, type FrameworkId } from '@/lib/frontend-drills';

export function FrameworkSwitcher({ framework }: { framework: FrameworkId }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const config = FRAMEWORK_CONFIG[framework];

  // Close on outside click or Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = useCallback(
    (target: FrameworkId) => {
      if (target === framework) {
        setIsOpen(false);
        return;
      }
      // Replace current framework segment in the path
      // pathname is e.g. "/frontend-drills/react/drill" → "/frontend-drills/vue/drill"
      const newPath = pathname.replace(
        `/frontend-drills/${framework}`,
        `/frontend-drills/${target}`,
      );
      setIsOpen(false);
      router.push(newPath);
    },
    [framework, pathname, router],
  );

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgColor} ${config.borderColor} border cursor-pointer hover:opacity-80 transition-opacity`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Switch framework"
      >
        <span className={`text-sm font-bold ${config.color}`}>{config.icon}</span>
        <span className={`text-sm font-medium ${config.color}`}>{config.name}</span>
        {/* Chevron */}
        <svg
          className={`w-3 h-3 ${config.color} opacity-70 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          role="listbox"
          aria-label="Select framework"
          className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg z-50"
        >
          <div className="py-1">
            {FRAMEWORK_IDS.map((fwId) => {
              const fwConfig = FRAMEWORK_CONFIG[fwId];
              const isActive = fwId === framework;
              return (
                <button
                  key={fwId}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSelect(fwId)}
                  className={`w-full px-3 py-2 text-left text-sm flex items-center gap-3 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <span className={`font-bold ${fwConfig.color}`}>{fwConfig.icon}</span>
                  <span className="flex-1 font-medium">{fwConfig.name}</span>
                  {isActive && (
                    <svg
                      className="w-4 h-4 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
