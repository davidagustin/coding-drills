import { describe, expect, it } from 'vitest';
import { FRAMEWORK_CONFIG, FRAMEWORK_IDS, isValidFramework } from '../config';

describe('frontend-drills config', () => {
  describe('FRAMEWORK_IDS', () => {
    it('should include all four frameworks', () => {
      expect(FRAMEWORK_IDS).toHaveLength(4);
      expect(FRAMEWORK_IDS).toContain('native-js');
      expect(FRAMEWORK_IDS).toContain('react');
      expect(FRAMEWORK_IDS).toContain('angular');
      expect(FRAMEWORK_IDS).toContain('vue');
    });
  });

  describe('FRAMEWORK_CONFIG', () => {
    it('should have config for every framework id', () => {
      for (const id of FRAMEWORK_IDS) {
        expect(FRAMEWORK_CONFIG[id]).toBeDefined();
        expect(FRAMEWORK_CONFIG[id].id).toBe(id);
        expect(FRAMEWORK_CONFIG[id].name).toBeTruthy();
        expect(FRAMEWORK_CONFIG[id].shortName).toBeTruthy();
        expect(FRAMEWORK_CONFIG[id].color).toBeTruthy();
        expect(FRAMEWORK_CONFIG[id].bgColor).toBeTruthy();
        expect(FRAMEWORK_CONFIG[id].borderColor).toBeTruthy();
        expect(FRAMEWORK_CONFIG[id].description).toBeTruthy();
        expect(FRAMEWORK_CONFIG[id].docsUrl).toBeTruthy();
      }
    });

    it('should have unique names per framework', () => {
      const names = FRAMEWORK_IDS.map((id) => FRAMEWORK_CONFIG[id].name);
      const unique = new Set(names);
      expect(unique.size).toBe(names.length);
    });
  });

  describe('isValidFramework', () => {
    it('should return true for valid framework ids', () => {
      expect(isValidFramework('native-js')).toBe(true);
      expect(isValidFramework('react')).toBe(true);
      expect(isValidFramework('angular')).toBe(true);
      expect(isValidFramework('vue')).toBe(true);
    });

    it('should return false for invalid strings', () => {
      expect(isValidFramework('')).toBe(false);
      expect(isValidFramework('invalid')).toBe(false);
      expect(isValidFramework('React')).toBe(false);
      expect(isValidFramework('vuejs')).toBe(false);
      expect(isValidFramework('svelte')).toBe(false);
    });
  });
});
