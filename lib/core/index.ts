/**
 * Core Module Index
 *
 * This module provides the foundational types and constants for the entire
 * data layer. Import from here for:
 * - Type definitions
 * - Constants and configuration
 *
 * Architecture Pattern: Barrel Export
 * - Centralizes exports for clean imports
 * - Prevents deep import paths
 * - Makes refactoring easier
 */

// Export all constants
export * from './constants';
// Export all types
export * from './types';
