import { describe, expect, it } from 'vitest';
import { FRAMEWORK_CONFIG, FRAMEWORK_IDS, type FrameworkId, isValidFramework } from '../config';

describe('frontend-drills config', () => {
  describe('FRAMEWORK_IDS', () => {
    it('includes all four frameworks', () => {
      expect(FRAMEWORK_IDS).toHaveLength(4);
      expect(FRAMEWORK_IDS).toContain('native-js');
      expect(FRAMEWORK_IDS).toContain('react');
      expect(FRAMEWORK_IDS).toContain('angular');
      expect(FRAMEWORK_IDS).toContain('vue');
    });

    it('has no duplicates', () => {
      const set = new Set(FRAMEWORK_IDS);
      expect(set.size).toBe(FRAMEWORK_IDS.length);
    });
  });

  describe('FRAMEWORK_CONFIG', () => {
    it('has config for every framework id', () => {
      for (const id of FRAMEWORK_IDS) {
        expect(FRAMEWORK_CONFIG[id]).toBeDefined();
        expect(FRAMEWORK_CONFIG[id].id).toBe(id);
      }
    });

    it('each config has required fields', () => {
      for (const id of FRAMEWORK_IDS) {
        const config = FRAMEWORK_CONFIG[id as FrameworkId];
        expect(config.name).toBeTruthy();
        expect(config.shortName).toBeTruthy();
        expect(config.description).toBeTruthy();
        expect(config.docsUrl).toMatch(/^https?:\/\//);
        expect(config.color).toBeTruthy();
        expect(config.bgColor).toBeTruthy();
        expect(config.borderColor).toBeTruthy();
      }
    });

    it('native-js has expected name', () => {
      expect(FRAMEWORK_CONFIG['native-js'].name).toBe('Native JavaScript');
    });

    it('react has expected name and icon', () => {
      expect(FRAMEWORK_CONFIG.react.name).toBe('React');
      expect(FRAMEWORK_CONFIG.react.icon).toBe('⚛');
    });
  });

  describe('isValidFramework', () => {
    it('returns true for all valid framework ids', () => {
      expect(isValidFramework('native-js')).toBe(true);
      expect(isValidFramework('react')).toBe(true);
      expect(isValidFramework('angular')).toBe(true);
      expect(isValidFramework('vue')).toBe(true);
    });

    it('returns false for invalid strings', () => {
      expect(isValidFramework('')).toBe(false);
      expect(isValidFramework('invalid')).toBe(false);
      expect(isValidFramework('reactjs')).toBe(false);
      expect(isValidFramework('REACT')).toBe(false);
      expect(isValidFramework('vue3')).toBe(false);
    });

    it('returns false for non-string-like values', () => {
      expect(isValidFramework(null as unknown as string)).toBe(false);
      expect(isValidFramework(undefined as unknown as string)).toBe(false);
      expect(isValidFramework(123 as unknown as string)).toBe(false);
    });
  });
});
