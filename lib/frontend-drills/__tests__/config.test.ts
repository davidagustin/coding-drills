import { describe, expect, it } from 'vitest';
import { FRAMEWORK_CONFIG, FRAMEWORK_IDS, isValidFramework } from '../config';

describe('Frontend Drills - config', () => {
  describe('FRAMEWORK_IDS', () => {
    it('should contain exactly four framework ids', () => {
      expect(FRAMEWORK_IDS).toHaveLength(4);
      expect(FRAMEWORK_IDS).toContain('native-js');
      expect(FRAMEWORK_IDS).toContain('react');
      expect(FRAMEWORK_IDS).toContain('angular');
      expect(FRAMEWORK_IDS).toContain('vue');
    });

    it('should have only string elements', () => {
      for (const id of FRAMEWORK_IDS) {
        expect(typeof id).toBe('string');
        expect(id.length).toBeGreaterThan(0);
      }
    });
  });

  describe('FRAMEWORK_CONFIG', () => {
    it('should have config for every FRAMEWORK_ID', () => {
      for (const id of FRAMEWORK_IDS) {
        expect(FRAMEWORK_CONFIG[id]).toBeDefined();
        expect(FRAMEWORK_CONFIG[id].id).toBe(id);
      }
    });

    it('each config should have required fields', () => {
      for (const id of FRAMEWORK_IDS) {
        const config = FRAMEWORK_CONFIG[id];
        expect(config.name).toBeDefined();
        expect(typeof config.name).toBe('string');
        expect(config.shortName).toBeDefined();
        expect(config.color).toBeDefined();
        expect(config.bgColor).toBeDefined();
        expect(config.borderColor).toBeDefined();
        expect(config.hoverBg).toBeDefined();
        expect(config.icon).toBeDefined();
        expect(config.description).toBeDefined();
        expect(config.version).toBeDefined();
        expect(config.docsUrl).toBeDefined();
        expect(config.docsUrl.startsWith('http')).toBe(true);
      }
    });

    it('should have unique names per framework', () => {
      const names = FRAMEWORK_IDS.map((id) => FRAMEWORK_CONFIG[id].name);
      const unique = new Set(names);
      expect(unique.size).toBe(names.length);
    });
  });

  describe('isValidFramework', () => {
    it('should return true for each FRAMEWORK_ID', () => {
      for (const id of FRAMEWORK_IDS) {
        expect(isValidFramework(id)).toBe(true);
      }
    });

    it('should return false for invalid values', () => {
      expect(isValidFramework('')).toBe(false);
      expect(isValidFramework('reactjs')).toBe(false);
      expect(isValidFramework('svelte')).toBe(false);
      expect(isValidFramework('REACT')).toBe(false);
      expect(isValidFramework('vue3')).toBe(false);
      expect(isValidFramework('invalid-framework')).toBe(false);
    });

    it('should narrow type when true', () => {
      const value: string = 'react';
      if (isValidFramework(value)) {
        expect(value).toBe('react');
        expect(FRAMEWORK_CONFIG[value].name).toBe('React');
      }
    });
  });
});
