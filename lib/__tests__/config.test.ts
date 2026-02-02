import { describe, expect, it } from 'vitest';
import {
  getTrainingDescription,
  getTrainingLabel,
  isDatabaseLanguage,
  isValidLanguage,
  LANGUAGE_CONFIG,
  SUPPORTED_LANGUAGES,
} from '../../app/[language]/config';

describe('SUPPORTED_LANGUAGES', () => {
  it('should be a non-empty array', () => {
    expect(Array.isArray(SUPPORTED_LANGUAGES)).toBe(true);
    expect(SUPPORTED_LANGUAGES.length).toBeGreaterThan(0);
  });

  it('should contain expected programming languages', () => {
    expect(SUPPORTED_LANGUAGES).toContain('javascript');
    expect(SUPPORTED_LANGUAGES).toContain('typescript');
    expect(SUPPORTED_LANGUAGES).toContain('python');
    expect(SUPPORTED_LANGUAGES).toContain('java');
    expect(SUPPORTED_LANGUAGES).toContain('cpp');
    expect(SUPPORTED_LANGUAGES).toContain('go');
    expect(SUPPORTED_LANGUAGES).toContain('ruby');
    expect(SUPPORTED_LANGUAGES).toContain('c');
    expect(SUPPORTED_LANGUAGES).toContain('php');
    expect(SUPPORTED_LANGUAGES).toContain('kotlin');
  });

  it('should contain newer languages', () => {
    expect(SUPPORTED_LANGUAGES).toContain('rust');
    expect(SUPPORTED_LANGUAGES).toContain('swift');
    expect(SUPPORTED_LANGUAGES).toContain('scala');
    expect(SUPPORTED_LANGUAGES).toContain('r');
    expect(SUPPORTED_LANGUAGES).toContain('perl');
    expect(SUPPORTED_LANGUAGES).toContain('lua');
    expect(SUPPORTED_LANGUAGES).toContain('haskell');
    expect(SUPPORTED_LANGUAGES).toContain('elixir');
    expect(SUPPORTED_LANGUAGES).toContain('dart');
    expect(SUPPORTED_LANGUAGES).toContain('clojure');
  });

  it('should contain database languages', () => {
    expect(SUPPORTED_LANGUAGES).toContain('postgresql');
    expect(SUPPORTED_LANGUAGES).toContain('mysql');
    expect(SUPPORTED_LANGUAGES).toContain('mongodb');
  });
});

describe('LANGUAGE_CONFIG', () => {
  const requiredFields = [
    'name',
    'color',
    'bgColor',
    'borderColor',
    'hoverBg',
    'version',
    'docsUrl',
  ];

  it('should have a config entry for every supported language', () => {
    for (const lang of SUPPORTED_LANGUAGES) {
      expect(LANGUAGE_CONFIG).toHaveProperty(lang);
    }
  });

  it('should have all required fields for each language', () => {
    for (const lang of SUPPORTED_LANGUAGES) {
      const config = LANGUAGE_CONFIG[lang];
      for (const field of requiredFields) {
        expect(config).toHaveProperty(field);
        expect((config as Record<string, string>)[field]).toBeTruthy();
      }
    }
  });

  it('should have valid name strings', () => {
    expect(LANGUAGE_CONFIG.javascript.name).toBe('JavaScript');
    expect(LANGUAGE_CONFIG.typescript.name).toBe('TypeScript');
    expect(LANGUAGE_CONFIG.python.name).toBe('Python');
    expect(LANGUAGE_CONFIG.postgresql.name).toBe('PostgreSQL');
    expect(LANGUAGE_CONFIG.mysql.name).toBe('MySQL');
    expect(LANGUAGE_CONFIG.mongodb.name).toBe('MongoDB');
  });

  it('should have valid docsUrl for each language', () => {
    for (const lang of SUPPORTED_LANGUAGES) {
      const config = LANGUAGE_CONFIG[lang];
      expect(config.docsUrl).toMatch(/^https?:\/\//);
    }
  });
});

describe('isValidLanguage', () => {
  it('should return true for valid languages', () => {
    expect(isValidLanguage('javascript')).toBe(true);
    expect(isValidLanguage('typescript')).toBe(true);
    expect(isValidLanguage('python')).toBe(true);
    expect(isValidLanguage('postgresql')).toBe(true);
    expect(isValidLanguage('rust')).toBe(true);
  });

  it('should return false for invalid languages', () => {
    expect(isValidLanguage('invalid')).toBe(false);
    expect(isValidLanguage('')).toBe(false);
    expect(isValidLanguage('JAVASCRIPT')).toBe(false);
    expect(isValidLanguage('fortran')).toBe(false);
  });
});

describe('isDatabaseLanguage', () => {
  it('should return true for postgresql', () => {
    expect(isDatabaseLanguage('postgresql')).toBe(true);
  });

  it('should return true for mysql', () => {
    expect(isDatabaseLanguage('mysql')).toBe(true);
  });

  it('should return true for mongodb', () => {
    expect(isDatabaseLanguage('mongodb')).toBe(true);
  });

  it('should return false for javascript', () => {
    expect(isDatabaseLanguage('javascript')).toBe(false);
  });

  it('should return false for python', () => {
    expect(isDatabaseLanguage('python')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(isDatabaseLanguage('')).toBe(false);
  });
});

describe('getTrainingLabel', () => {
  it('should return "Query Training" for postgresql', () => {
    expect(getTrainingLabel('postgresql')).toBe('Query Training');
  });

  it('should return "Query Training" for mysql', () => {
    expect(getTrainingLabel('mysql')).toBe('Query Training');
  });

  it('should return "Query Training" for mongodb', () => {
    expect(getTrainingLabel('mongodb')).toBe('Query Training');
  });

  it('should return "Method Training" for javascript', () => {
    expect(getTrainingLabel('javascript')).toBe('Method Training');
  });

  it('should return "Method Training" for python', () => {
    expect(getTrainingLabel('python')).toBe('Method Training');
  });

  it('should return "Method Training" for unknown language', () => {
    expect(getTrainingLabel('unknown')).toBe('Method Training');
  });
});

describe('getTrainingDescription', () => {
  it('should return database description for postgresql', () => {
    const desc = getTrainingDescription('postgresql');
    expect(desc).toContain('queries');
    expect(desc).toContain('database');
  });

  it('should return database description for mysql', () => {
    const desc = getTrainingDescription('mysql');
    expect(desc).toContain('queries');
  });

  it('should return database description for mongodb', () => {
    const desc = getTrainingDescription('mongodb');
    expect(desc).toContain('database');
  });

  it('should return programming description for javascript', () => {
    const desc = getTrainingDescription('javascript');
    expect(desc).toContain('methods');
    expect(desc).toContain('patterns');
  });

  it('should return programming description for python', () => {
    const desc = getTrainingDescription('python');
    expect(desc).toContain('methods');
  });

  it('should return programming description for unknown language', () => {
    const desc = getTrainingDescription('unknown');
    expect(desc).toContain('methods');
  });
});
