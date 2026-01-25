import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines clsx and tailwind-merge for optimal class name handling.
 * This is the standard pattern used in modern React + Tailwind apps.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
