import { describe, expect, it } from 'vitest';
import { checkRequiredPatterns, validateDrillAnswer } from './codeValidator';

describe('codeValidator', () => {
  describe('checkRequiredPatterns', () => {
    it('should return null if no patterns provided', () => {
      const result = checkRequiredPatterns('code', undefined, '');
      expect(result).toBe(null);
    });

    it('should return error if pattern not matched', () => {
      const patterns = [/required/];
      const result = checkRequiredPatterns('code', patterns, '');
      expect(result?.success).toBe(false);
      expect(result?.error).toContain('expected method or pattern');
    });

    it('should return null if pattern matches', () => {
      const patterns = [/required/];
      const result = checkRequiredPatterns('required code', patterns, '');
      expect(result).toBe(null);
    });
  });

  describe('validateDrillAnswer', () => {
    it('should validate simple arithmetic', () => {
      // validateDrillAnswer(language, setupCode, userAnswer, expectedOutput, sampleSolution, validPatterns)
      const result = validateDrillAnswer('javascript', '', 'return 1 + 1;', 2, 'return 2;');
      expect(result.success).toBe(true);
    });

    it('should reject incorrect result', () => {
      const result = validateDrillAnswer('javascript', '', 'return 1 + 2;', 2, 'return 2;');
      expect(result.success).toBe(false);
    });
  });
});
