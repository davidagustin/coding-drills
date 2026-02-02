import { describe, expect, it } from 'vitest';
import { FRAMEWORK_CONFIG, FRAMEWORK_IDS, isValidFramework } from './config';

describe('frontend-drills/config', () => {
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
        expect(FRAMEWORK_CONFIG[id].description).toBeTruthy();
      }
    });
  });

  describe('isValidFramework', () => {
    it('should return true for valid framework ids', () => {
      expect(isValidFramework('native-js')).toBe(true);
      expect(isValidFramework('react')).toBe(true);
      expect(isValidFramework('angular')).toBe(true);
      expect(isValidFramework('vue')).toBe(true);
    });

    it('should return false for invalid values', () => {
      expect(isValidFramework('')).toBe(false);
      expect(isValidFramework('invalid')).toBe(false);
      expect(isValidFramework('React')).toBe(false);
      expect(isValidFramework('vuejs')).toBe(false);
    });
  });
});
