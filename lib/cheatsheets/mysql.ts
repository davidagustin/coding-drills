/**
 * MySQL Cheatsheet
 *
 * Essential MySQL SQL operations and queries for coding interviews.
 * Covers SELECT, INSERT, UPDATE, DELETE, JOINs, and MySQL-specific features.
 */

import type { CheatsheetEntry } from './types';

export const mysqlCheatsheet: CheatsheetEntry[] = [
  // ============================================
  // SELECT QUERIES
  // ============================================
  {
    name: 'SELECT',
    category: 'collections',
    syntax: 'SELECT column1, column2 FROM table WHERE condition',
    description: 'Retrieve data from table with optional filtering',
    example: {
      code: 'SELECT name, age FROM users WHERE age > 25',
      output: 'Returns name and age for users older than 25',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    gotchas: ['Use * to select all columns', 'WHERE clause filters rows'],
    interviewTip: 'Most common SQL operation, master WHERE, ORDER BY, LIMIT',
    priority: 'essential',
  },
  {
    name: 'DISTINCT',
    category: 'collections',
    syntax: 'SELECT DISTINCT column FROM table',
    description: 'Return unique values, removing duplicates',
    example: {
      code: 'SELECT DISTINCT city FROM users',
      output: 'Returns unique city names',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k) where k is unique values',
    gotchas: ['Can use multiple columns', 'NULL is considered distinct'],
    interviewTip: 'Use for finding unique values, often combined with COUNT',
    priority: 'essential',
  },
  {
    name: 'ORDER BY',
    category: 'sorting',
    syntax: 'SELECT * FROM table ORDER BY column1 ASC, column2 DESC',
    description: 'Sort results by one or more columns',
    example: {
      code: 'SELECT * FROM users ORDER BY age DESC, name ASC',
      output: 'Sorts by age descending, then name ascending',
    },
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    gotchas: ['ASC is default (ascending)', 'NULLs sort first by default'],
    interviewTip: 'Use indexes to optimize sorting, can sort by multiple columns',
    priority: 'essential',
  },
  {
    name: 'LIMIT / OFFSET',
    category: 'collections',
    syntax: 'SELECT * FROM table LIMIT n OFFSET m',
    description: 'Limit number of rows returned, skip first m rows',
    example: {
      code: 'SELECT * FROM users ORDER BY id LIMIT 10 OFFSET 20',
      output: 'Returns rows 21-30 (pagination)',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k) where k is limit',
    gotchas: ['OFFSET can be slow on large datasets', 'Use for pagination'],
    interviewTip: 'Use cursor-based pagination with WHERE id > last_id for better performance',
    priority: 'essential',
  },
  // ============================================
  // AGGREGATION
  // ============================================
  {
    name: 'GROUP BY',
    category: 'collections',
    syntax: 'SELECT column, aggregate(column) FROM table GROUP BY column',
    description: 'Group rows by column values and apply aggregate functions',
    example: {
      code: 'SELECT city, COUNT(*) FROM users GROUP BY city',
      output: 'Counts users per city',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k) where k is groups',
    gotchas: ['All non-aggregated columns must be in GROUP BY', 'Use HAVING to filter groups'],
    interviewTip: 'Essential for analytics, similar to MongoDB $group',
    priority: 'essential',
  },
  {
    name: 'HAVING',
    category: 'searching',
    syntax: 'SELECT ... GROUP BY ... HAVING condition',
    description: 'Filter groups after aggregation (WHERE filters before)',
    example: {
      code: 'SELECT city, COUNT(*) FROM users GROUP BY city HAVING COUNT(*) > 10',
      output: 'Cities with more than 10 users',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k)',
    gotchas: ['HAVING filters groups, WHERE filters rows', 'Can use aggregate functions'],
    interviewTip: 'Use HAVING for conditions on aggregated data',
    priority: 'essential',
  },
  {
    name: 'COUNT, SUM, AVG, MIN, MAX',
    category: 'math',
    syntax: 'SELECT COUNT(*), SUM(column), AVG(column), MIN(column), MAX(column) FROM table',
    description: 'Aggregate functions for counting, summing, averaging, finding min/max',
    example: {
      code: 'SELECT COUNT(*), AVG(age), MAX(age) FROM users',
      output: 'Total count, average age, and maximum age',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    gotchas: ['COUNT(*) counts all rows', 'COUNT(column) counts non-NULL values'],
    interviewTip: 'Most common aggregate functions, essential for reporting queries',
    priority: 'essential',
  },
  // ============================================
  // JOINS
  // ============================================
  {
    name: 'INNER JOIN',
    category: 'collections',
    syntax: 'SELECT * FROM table1 INNER JOIN table2 ON table1.id = table2.id',
    description: 'Return rows where join condition matches in both tables',
    example: {
      code: 'SELECT u.name, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id',
      output: 'Users with their orders (excludes users without orders)',
    },
    timeComplexity: 'O(n * m)',
    spaceComplexity: 'O(n)',
    gotchas: ['Only returns matching rows', 'Use table aliases for readability'],
    interviewTip: 'Most common join type, use indexes on join columns',
    priority: 'essential',
  },
  {
    name: 'LEFT JOIN',
    category: 'collections',
    syntax: 'SELECT * FROM table1 LEFT JOIN table2 ON table1.id = table2.id',
    description: 'Return all rows from left table, NULLs for non-matching right table rows',
    example: {
      code: 'SELECT u.name, o.total FROM users u LEFT JOIN orders o ON u.id = o.user_id',
      output: 'All users with their orders (NULL if no orders)',
    },
    timeComplexity: 'O(n * m)',
    spaceComplexity: 'O(n)',
    gotchas: ['Returns all left table rows', 'Right table columns NULL if no match'],
    interviewTip: 'Use when you need all records from one table regardless of matches',
    priority: 'essential',
  },
  // ============================================
  // INSERT, UPDATE, DELETE
  // ============================================
  {
    name: 'INSERT',
    category: 'io',
    syntax: 'INSERT INTO table (col1, col2) VALUES (val1, val2)',
    description: 'Insert new row(s) into table',
    example: {
      code: "INSERT INTO users (name, age) VALUES ('John', 30), ('Jane', 25)",
      output: 'Inserts two new users',
    },
    timeComplexity: 'O(1) per row',
    spaceComplexity: 'O(1)',
    gotchas: ['Can insert multiple rows with one statement', 'Returns number of rows inserted'],
    interviewTip: 'Use INSERT IGNORE or ON DUPLICATE KEY UPDATE for conflict handling',
    priority: 'essential',
  },
  {
    name: 'UPDATE',
    category: 'io',
    syntax: 'UPDATE table SET column = value WHERE condition',
    description: 'Update existing rows matching condition',
    example: {
      code: "UPDATE users SET age = 31 WHERE name = 'John'",
      output: 'Updates age for user named John',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    gotchas: ['Always use WHERE clause', 'Returns number of rows updated'],
    interviewTip: 'Use WHERE to avoid updating all rows, use LIMIT for safety',
    priority: 'essential',
  },
  {
    name: 'DELETE',
    category: 'io',
    syntax: 'DELETE FROM table WHERE condition',
    description: 'Delete rows matching condition',
    example: {
      code: 'DELETE FROM users WHERE age < 18',
      output: 'Deletes all users under 18',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    gotchas: ['Always use WHERE clause', 'Returns number of rows deleted'],
    interviewTip: 'Use transactions for safety, consider soft deletes with status flags',
    priority: 'essential',
  },
  // ============================================
  // MYSQL-SPECIFIC FEATURES
  // ============================================
  {
    name: 'LIKE',
    category: 'regex',
    syntax: "SELECT * FROM table WHERE column LIKE 'pattern'",
    description: 'Pattern matching with wildcards (% for any, _ for single char)',
    example: {
      code: "SELECT * FROM users WHERE name LIKE 'J%'",
      output: 'Users with names starting with J',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    gotchas: [
      '% matches any sequence',
      '_ matches single character',
      'Case-insensitive by default',
    ],
    interviewTip: 'Use for text search, consider FULLTEXT indexes for better performance',
    priority: 'essential',
  },
  {
    name: 'FULLTEXT Search',
    category: 'searching',
    syntax: "SELECT * FROM table WHERE MATCH(column) AGAINST('search term')",
    description: 'Full-text search on text columns with relevance ranking',
    example: {
      code: "SELECT * FROM articles WHERE MATCH(title, content) AGAINST('database optimization')",
      output: 'Articles matching search terms, ranked by relevance',
    },
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    gotchas: ['Requires FULLTEXT index', 'Only works with MyISAM or InnoDB'],
    interviewTip: 'Use for search functionality, supports boolean mode and relevance scoring',
    priority: 'common',
  },
  {
    name: 'ON DUPLICATE KEY UPDATE',
    category: 'io',
    syntax: 'INSERT INTO table VALUES (...) ON DUPLICATE KEY UPDATE column = value',
    description: 'Insert or update if duplicate key exists (upsert)',
    example: {
      code: "INSERT INTO users (id, name) VALUES (1, 'John') ON DUPLICATE KEY UPDATE name = 'John'",
      output: 'Inserts if id not exists, updates if exists',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: ['Requires unique key or primary key', 'MySQL-specific feature'],
    interviewTip: 'Useful for upsert operations, avoids separate SELECT then INSERT/UPDATE',
    priority: 'common',
  },
  {
    name: 'REPLACE',
    category: 'io',
    syntax: 'REPLACE INTO table VALUES (...)',
    description: 'Insert or replace row if duplicate key exists',
    example: {
      code: "REPLACE INTO users (id, name, age) VALUES (1, 'John', 30)",
      output: 'Inserts new or replaces existing row with same id',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: ['Deletes then inserts if duplicate', 'Requires unique key'],
    interviewTip: 'Similar to ON DUPLICATE KEY UPDATE but replaces entire row',
    priority: 'useful',
  },
  {
    name: 'EXISTS',
    category: 'searching',
    syntax: 'SELECT * FROM table1 WHERE EXISTS (SELECT 1 FROM table2 WHERE condition)',
    description: 'Check if subquery returns any rows',
    example: {
      code: 'SELECT * FROM users u WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id)',
      output: 'Users who have placed at least one order',
    },
    timeComplexity: 'O(n * m)',
    spaceComplexity: 'O(1)',
    gotchas: ['Returns true if subquery has rows', 'Often faster than IN for large datasets'],
    interviewTip: 'Use instead of IN when checking existence, stops at first match',
    priority: 'common',
  },
];
