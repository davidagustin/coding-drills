import { describe, expect, it } from 'vitest';
import { getAllFlashcards, getAvailableCategories, getSourceCardCount } from '../adapters';
import type { FlashcardSource } from '../types';

// ── getAllFlashcards ─────────────────────────────────────────────

describe('getAllFlashcards', () => {
  describe('method source', () => {
    it('should return cards with method: prefix', () => {
      const cards = getAllFlashcards({ sources: ['method'], language: 'javascript' });
      expect(cards.length).toBeGreaterThan(0);
      for (const card of cards) {
        expect(card.id).toMatch(/^method:/);
      }
    });

    it('should have source: method', () => {
      const cards = getAllFlashcards({ sources: ['method'], language: 'javascript' });
      for (const card of cards) {
        expect(card.source).toBe('method');
      }
    });

    it('should have front with prompt, code, and badge', () => {
      const cards = getAllFlashcards({ sources: ['method'], language: 'javascript' });
      for (const card of cards) {
        expect(card.front.prompt).toBeTruthy();
        expect(typeof card.front.prompt).toBe('string');
        expect(card.front.code).toBeTruthy();
        expect(typeof card.front.code).toBe('string');
        expect(card.front.badge).toBeTruthy();
        expect(typeof card.front.badge).toBe('string');
      }
    });

    it('should have back with answer', () => {
      const cards = getAllFlashcards({ sources: ['method'], language: 'javascript' });
      for (const card of cards) {
        expect(card.back.answer).toBeTruthy();
        expect(typeof card.back.answer).toBe('string');
      }
    });

    it('should have difficulty and category', () => {
      const cards = getAllFlashcards({ sources: ['method'], language: 'javascript' });
      for (const card of cards) {
        expect(card.difficulty).toMatch(/^(easy|medium|hard)$/);
        expect(card.category).toBeTruthy();
        expect(typeof card.category).toBe('string');
      }
    });

    it('should return non-empty array', () => {
      const cards = getAllFlashcards({ sources: ['method'], language: 'javascript' });
      expect(cards.length).toBeGreaterThan(0);
    });
  });

  describe('method cards should not reveal answers', () => {
    it('should not include the method name in front.code', () => {
      const cards = getAllFlashcards({ sources: ['method'], language: 'javascript' });
      for (const card of cards) {
        if (card.front.code) {
          // The front code should not contain .methodName( which gives away the answer
          const marker = `.${card.back.answer}(`;
          expect(card.front.code).not.toContain(marker);
        }
      }
    });

    it('should not have front.detail (description reveals the answer)', () => {
      const cards = getAllFlashcards({ sources: ['method'], language: 'javascript' });
      for (const card of cards) {
        expect(card.front.detail).toBeUndefined();
      }
    });

    it('should still have the answer in back.answer', () => {
      const cards = getAllFlashcards({ sources: ['method'], language: 'javascript' });
      for (const card of cards) {
        expect(card.back.answer).toBeTruthy();
        expect(card.back.answer.length).toBeGreaterThan(0);
      }
    });

    it('should still have explanation in back', () => {
      const cards = getAllFlashcards({ sources: ['method'], language: 'javascript' });
      for (const card of cards) {
        expect(card.back.explanation).toBeTruthy();
      }
    });

    it('should show input and output in front.code when example exists', () => {
      const cards = getAllFlashcards({ sources: ['method'], language: 'javascript' });
      const withCode = cards.filter((c) => c.front.code);
      expect(withCode.length).toBeGreaterThan(0);
      for (const card of withCode) {
        expect(card.front.code).toContain('// Input');
        expect(card.front.code).toContain('// Output');
      }
    });
  });

  describe('time-complexity source', () => {
    it('should return cards with time-complexity: prefix', () => {
      const cards = getAllFlashcards({ sources: ['time-complexity'] });
      expect(cards.length).toBeGreaterThan(0);
      for (const card of cards) {
        expect(card.id).toMatch(/^time-complexity:/);
      }
    });

    it('should have source: time-complexity', () => {
      const cards = getAllFlashcards({ sources: ['time-complexity'] });
      for (const card of cards) {
        expect(card.source).toBe('time-complexity');
      }
    });

    it('should have front prompt containing "time complexity"', () => {
      const cards = getAllFlashcards({ sources: ['time-complexity'] });
      for (const card of cards) {
        expect(card.front.prompt.toLowerCase()).toContain('time');
        expect(card.front.prompt.toLowerCase()).toContain('complexity');
      }
    });

    it('should have back answer as Big-O notation', () => {
      const cards = getAllFlashcards({ sources: ['time-complexity'] });
      for (const card of cards) {
        expect(card.back.answer).toMatch(/^O\(.+\)$/);
      }
    });
  });

  describe('space-complexity source', () => {
    it('should return cards with space-complexity: prefix', () => {
      const cards = getAllFlashcards({ sources: ['space-complexity'] });
      expect(cards.length).toBeGreaterThan(0);
      for (const card of cards) {
        expect(card.id).toMatch(/^space-complexity:/);
      }
    });

    it('should have front prompt containing "space complexity"', () => {
      const cards = getAllFlashcards({ sources: ['space-complexity'] });
      for (const card of cards) {
        expect(card.front.prompt.toLowerCase()).toContain('space');
        expect(card.front.prompt.toLowerCase()).toContain('complexity');
      }
    });
  });

  describe('pattern source', () => {
    it('should return cards with pattern: prefix', () => {
      const cards = getAllFlashcards({ sources: ['pattern'] });
      expect(cards.length).toBeGreaterThan(0);
      for (const card of cards) {
        expect(card.id).toMatch(/^pattern:/);
      }
    });

    it('should have source: pattern', () => {
      const cards = getAllFlashcards({ sources: ['pattern'] });
      for (const card of cards) {
        expect(card.source).toBe('pattern');
      }
    });
  });

  describe('frontend source', () => {
    it('should return cards with frontend: prefix', () => {
      const cards = getAllFlashcards({ sources: ['frontend'], framework: 'react' });
      expect(cards.length).toBeGreaterThan(0);
      for (const card of cards) {
        expect(card.id).toMatch(/^frontend:/);
      }
    });

    it('should have source: frontend', () => {
      const cards = getAllFlashcards({ sources: ['frontend'], framework: 'react' });
      for (const card of cards) {
        expect(card.source).toBe('frontend');
      }
    });

    it('should return non-empty array', () => {
      const cards = getAllFlashcards({ sources: ['frontend'], framework: 'react' });
      expect(cards.length).toBeGreaterThan(0);
    });
  });

  describe('multiple sources', () => {
    it('should return cards from both method and pattern sources', () => {
      const cards = getAllFlashcards({
        sources: ['method', 'pattern'],
        language: 'javascript',
      });

      const methodCards = cards.filter((c) => c.source === 'method');
      const patternCards = cards.filter((c) => c.source === 'pattern');

      expect(methodCards.length).toBeGreaterThan(0);
      expect(patternCards.length).toBeGreaterThan(0);
      expect(cards.length).toBe(methodCards.length + patternCards.length);
    });

    it('should have total equal to sum of individual source counts', () => {
      const methodOnly = getAllFlashcards({
        sources: ['method'],
        language: 'javascript',
      });
      const patternOnly = getAllFlashcards({ sources: ['pattern'] });
      const both = getAllFlashcards({
        sources: ['method', 'pattern'],
        language: 'javascript',
      });

      expect(both.length).toBe(methodOnly.length + patternOnly.length);
    });
  });

  describe('ID uniqueness', () => {
    it('should have unique IDs across all sources combined', () => {
      const all = getAllFlashcards({
        sources: ['method', 'time-complexity', 'space-complexity', 'pattern'],
        language: 'javascript',
      });

      const ids = all.map((c) => c.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('category filtering', () => {
    it('should filter by categories', () => {
      const allCards = getAllFlashcards({
        sources: ['method'],
        language: 'javascript',
      });

      // Get a category that exists
      const sampleCategory = allCards[0]?.category;
      if (!sampleCategory) {
        throw new Error('No cards found for method source');
      }

      const filtered = getAllFlashcards({
        sources: ['method'],
        language: 'javascript',
        categories: [sampleCategory],
      });

      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered.length).toBeLessThanOrEqual(allCards.length);

      for (const card of filtered) {
        expect(card.category).toBe(sampleCategory);
      }
    });

    it('should return fewer cards than unfiltered when filtering by category', () => {
      const allCards = getAllFlashcards({
        sources: ['method'],
        language: 'javascript',
      });

      // Get all unique categories
      const categories = [...new Set(allCards.map((c) => c.category))];

      // If there's more than one category, filtering should reduce count
      if (categories.length > 1) {
        const filtered = getAllFlashcards({
          sources: ['method'],
          language: 'javascript',
          categories: [categories[0]],
        });

        expect(filtered.length).toBeLessThan(allCards.length);
      }
    });
  });

  describe('difficulty filtering', () => {
    it('should filter by difficulty', () => {
      const allCards = getAllFlashcards({
        sources: ['method'],
        language: 'javascript',
      });

      const filtered = getAllFlashcards({
        sources: ['method'],
        language: 'javascript',
        difficulties: ['easy'],
      });

      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered.length).toBeLessThanOrEqual(allCards.length);

      for (const card of filtered) {
        expect(card.difficulty).toBe('easy');
      }
    });
  });

  describe('empty sources', () => {
    it('should return empty array when sources is empty', () => {
      const cards = getAllFlashcards({ sources: [] });
      expect(cards).toEqual([]);
    });
  });

  describe('flashcard shape validation', () => {
    it('should have valid flashcard interface for all sources', () => {
      const sources: FlashcardSource[] = [
        'method',
        'time-complexity',
        'space-complexity',
        'pattern',
        'frontend',
      ];

      for (const source of sources) {
        const cards = getAllFlashcards({
          sources: [source],
          language: 'javascript',
          framework: 'react',
        });

        for (const card of cards) {
          // id
          expect(typeof card.id).toBe('string');
          expect(card.id.length).toBeGreaterThan(0);

          // source
          expect(sources).toContain(card.source);

          // front.prompt
          expect(typeof card.front.prompt).toBe('string');
          expect(card.front.prompt.length).toBeGreaterThan(0);

          // front.badge
          expect(typeof card.front.badge).toBe('string');

          // back.answer
          expect(typeof card.back.answer).toBe('string');
          expect(card.back.answer.length).toBeGreaterThan(0);

          // difficulty
          expect(['easy', 'medium', 'hard']).toContain(card.difficulty);

          // category
          expect(typeof card.category).toBe('string');
          expect(card.category.length).toBeGreaterThan(0);
        }
      }
    });
  });
});

// ── getAvailableCategories ───────────────────────────────────────

describe('getAvailableCategories', () => {
  it('should return non-empty array for method source', () => {
    const categories = getAvailableCategories('method', { language: 'javascript' });
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });

  it('should return non-empty array for time-complexity source', () => {
    const categories = getAvailableCategories('time-complexity');
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });

  it('should return non-empty array for space-complexity source', () => {
    const categories = getAvailableCategories('space-complexity');
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });

  it('should return non-empty array for pattern source', () => {
    const categories = getAvailableCategories('pattern');
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });

  it('should return non-empty array for frontend source', () => {
    const categories = getAvailableCategories('frontend', { framework: 'react' });
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });

  it('should return strings for all sources', () => {
    const sources: FlashcardSource[] = [
      'method',
      'time-complexity',
      'space-complexity',
      'pattern',
      'frontend',
    ];

    for (const source of sources) {
      const categories = getAvailableCategories(source, {
        language: 'javascript',
        framework: 'react',
      });

      for (const category of categories) {
        expect(typeof category).toBe('string');
        expect(category.length).toBeGreaterThan(0);
      }
    }
  });
});

// ── getSourceCardCount ───────────────────────────────────────────

describe('getSourceCardCount', () => {
  it('should return positive number for method source', () => {
    const count = getSourceCardCount('method', { language: 'javascript' });
    expect(count).toBeGreaterThan(0);
  });

  it('should return positive number for time-complexity source', () => {
    const count = getSourceCardCount('time-complexity');
    expect(count).toBeGreaterThan(0);
  });

  it('should return positive number for space-complexity source', () => {
    const count = getSourceCardCount('space-complexity');
    expect(count).toBeGreaterThan(0);
  });

  it('should return positive number for pattern source', () => {
    const count = getSourceCardCount('pattern');
    expect(count).toBeGreaterThan(0);
  });

  it('should return positive number for frontend source', () => {
    const count = getSourceCardCount('frontend', { framework: 'react' });
    expect(count).toBeGreaterThan(0);
  });

  it('should match getAllFlashcards length for method source', () => {
    const count = getSourceCardCount('method', { language: 'javascript' });
    const cards = getAllFlashcards({ sources: ['method'], language: 'javascript' });
    expect(count).toBe(cards.length);
  });

  it('should match getAllFlashcards length for time-complexity source', () => {
    const count = getSourceCardCount('time-complexity');
    const cards = getAllFlashcards({ sources: ['time-complexity'] });
    expect(count).toBe(cards.length);
  });

  it('should match getAllFlashcards length for space-complexity source', () => {
    const count = getSourceCardCount('space-complexity');
    const cards = getAllFlashcards({ sources: ['space-complexity'] });
    expect(count).toBe(cards.length);
  });

  it('should match getAllFlashcards length for pattern source', () => {
    const count = getSourceCardCount('pattern');
    const cards = getAllFlashcards({ sources: ['pattern'] });
    expect(count).toBe(cards.length);
  });

  it('should match getAllFlashcards length for frontend source', () => {
    const count = getSourceCardCount('frontend', { framework: 'react' });
    const cards = getAllFlashcards({ sources: ['frontend'], framework: 'react' });
    expect(count).toBe(cards.length);
  });
});
