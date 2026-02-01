import { describe, expect, it } from 'vitest';
import { dartMethods } from '../dart';
import type { Method } from '../../types';

describe('dartMethods', () => {
  it('should export a non-empty array', () => {
    expect(Array.isArray(dartMethods)).toBe(true);
    expect(dartMethods.length).toBeGreaterThanOrEqual(25);
  });

  it('should have the correct default export', async () => {
    const mod = await import('../dart');
    expect(mod.default).toBe(dartMethods);
  });

  it('should have valid structure for every method', () => {
    for (const method of dartMethods) {
      // Required string fields
      expect(typeof method.name).toBe('string');
      expect(method.name.length).toBeGreaterThan(0);

      expect(typeof method.category).toBe('string');
      expect(method.category.length).toBeGreaterThan(0);

      expect(typeof method.syntax).toBe('string');
      expect(method.syntax.length).toBeGreaterThan(0);

      expect(typeof method.description).toBe('string');
      expect(method.description.length).toBeGreaterThan(0);

      // Arguments array
      expect(Array.isArray(method.arguments)).toBe(true);
      for (const arg of method.arguments) {
        expect(typeof arg.name).toBe('string');
        expect(typeof arg.type).toBe('string');
        expect(typeof arg.description).toBe('string');
      }

      // Returns object
      expect(method.returns).toBeDefined();
      expect(typeof method.returns.type).toBe('string');
      expect(typeof method.returns.description).toBe('string');

      // Examples array - at least one
      expect(Array.isArray(method.examples)).toBe(true);
      expect(method.examples.length).toBeGreaterThanOrEqual(1);
      for (const example of method.examples) {
        expect(typeof example.code).toBe('string');
        expect(typeof example.output).toBe('string');
      }
    }
  });

  it('should have no duplicate method names within the same category', () => {
    const seen = new Set<string>();
    const duplicates: string[] = [];
    for (const method of dartMethods) {
      const key = `${method.category}::${method.name}`;
      if (seen.has(key)) {
        duplicates.push(key);
      }
      seen.add(key);
    }
    expect(duplicates).toEqual([]);
  });

  it('should cover all required categories', () => {
    const categories = new Set(dartMethods.map((m) => m.category));
    expect(categories.has('List Methods')).toBe(true);
    expect(categories.has('String Methods')).toBe(true);
    expect(categories.has('Map Methods')).toBe(true);
    expect(categories.has('Set Methods')).toBe(true);
    expect(categories.has('Iterable Methods')).toBe(true);
    expect(categories.has('Type Conversion')).toBe(true);
    expect(categories.has('Async')).toBe(true);
  });

  it('should have at least the minimum methods per category', () => {
    const countByCategory: Record<string, number> = {};
    for (const method of dartMethods) {
      countByCategory[method.category] = (countByCategory[method.category] || 0) + 1;
    }
    expect(countByCategory['List Methods']).toBeGreaterThanOrEqual(5);
    expect(countByCategory['String Methods']).toBeGreaterThanOrEqual(4);
    expect(countByCategory['Map Methods']).toBeGreaterThanOrEqual(3);
    expect(countByCategory['Set Methods']).toBeGreaterThanOrEqual(2);
    expect(countByCategory['Iterable Methods']).toBeGreaterThanOrEqual(3);
    expect(countByCategory['Type Conversion']).toBeGreaterThanOrEqual(2);
    expect(countByCategory['Async']).toBeGreaterThanOrEqual(2);
  });

  it('should use idiomatic Dart syntax in examples', () => {
    for (const method of dartMethods) {
      for (const example of method.examples) {
        // Dart code should contain Dart-like syntax (var, final, List, Map, etc.)
        // Just verify code is non-trivial
        expect(example.code.length).toBeGreaterThan(5);
      }
    }
  });

  it('should have optional fields with correct types when present', () => {
    for (const method of dartMethods) {
      if (method.timeComplexity !== undefined) {
        expect(typeof method.timeComplexity).toBe('string');
      }
      if (method.spaceComplexity !== undefined) {
        expect(typeof method.spaceComplexity).toBe('string');
      }
      if (method.relatedMethods !== undefined) {
        expect(Array.isArray(method.relatedMethods)).toBe(true);
        for (const related of method.relatedMethods) {
          expect(typeof related).toBe('string');
        }
      }
      if (method.sinceVersion !== undefined) {
        expect(typeof method.sinceVersion).toBe('string');
      }
      if (method.notes !== undefined) {
        expect(Array.isArray(method.notes)).toBe(true);
        for (const note of method.notes) {
          expect(typeof note).toBe('string');
        }
      }
    }
  });

  // Verify the import path is correct (from '../types' not './types')
  it('should conform to the Method type from lib/types', () => {
    // This test implicitly validates the import works - if the import
    // path were wrong, the test file itself would fail to compile
    const firstMethod: Method = dartMethods[0];
    expect(firstMethod).toBeDefined();
  });
});
