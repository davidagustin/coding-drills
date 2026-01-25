"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  autoGenerate?: boolean;
  className?: string;
  maxItems?: number;
}

// Language display names mapping
const LANGUAGE_NAMES: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  java: "Java",
  cpp: "C++",
  csharp: "C#",
  go: "Go",
  ruby: "Ruby",
  c: "C",
};

// Mode display names mapping
const MODE_NAMES: Record<string, string> = {
  drill: "Drill Mode",
  quiz: "Quiz Mode",
  reference: "Reference",
};

function formatSegment(segment: string): string {
  // Check for known mappings first
  if (LANGUAGE_NAMES[segment]) {
    return LANGUAGE_NAMES[segment];
  }
  if (MODE_NAMES[segment]) {
    return MODE_NAMES[segment];
  }

  // Default: capitalize and replace hyphens with spaces
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function Breadcrumb({
  items,
  autoGenerate = true,
  className = "",
  maxItems = 4,
}: BreadcrumbProps) {
  const pathname = usePathname();

  // Auto-generate breadcrumb items from pathname if not provided
  const breadcrumbItems: BreadcrumbItem[] = items || (() => {
    if (!autoGenerate) return [];

    const segments = pathname.split("/").filter(Boolean);
    const generatedItems: BreadcrumbItem[] = [
      { label: "Home", href: "/" },
    ];

    segments.forEach((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const isLast = index === segments.length - 1;

      generatedItems.push({
        label: formatSegment(segment),
        href: isLast ? undefined : href,
      });
    });

    return generatedItems;
  })();

  // Handle truncation for mobile
  const displayItems = (() => {
    if (breadcrumbItems.length <= maxItems) {
      return breadcrumbItems;
    }

    // Keep first, add ellipsis, keep last (maxItems - 2) items
    const first = breadcrumbItems[0];
    const lastItems = breadcrumbItems.slice(-(maxItems - 2));

    return [
      first,
      { label: "...", href: undefined },
      ...lastItems,
    ];
  })();

  if (displayItems.length === 0) {
    return null;
  }

  return (
    <nav
      className={`flex items-center ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-1 sm:gap-2 flex-wrap">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.label === "...";

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-1 sm:gap-2"
            >
              {/* Separator */}
              {index > 0 && (
                <svg
                  className="w-4 h-4 text-text-muted flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}

              {/* Breadcrumb Item */}
              {isEllipsis ? (
                <span className="text-text-muted px-1">...</span>
              ) : item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-1.5
                    text-sm font-medium
                    transition-all duration-200
                    text-text-secondary hover:text-text-primary
                    px-2 py-1 -mx-2 -my-1 rounded-md
                    hover:bg-bg-elevated/50
                    truncate max-w-[120px] sm:max-w-[200px]
                  `}
                  title={item.label}
                >
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </Link>
              ) : (
                <span
                  className={`
                    flex items-center gap-1.5
                    text-sm font-medium
                    ${isLast ? "text-text-primary" : "text-text-muted"}
                    truncate max-w-[120px] sm:max-w-[200px]
                  `}
                  title={item.label}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
