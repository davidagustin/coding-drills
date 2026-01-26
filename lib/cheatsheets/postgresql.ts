/**
 * PostgreSQL Cheatsheet
 *
 * Essential PostgreSQL SQL operations and queries for coding interviews.
 * Covers SELECT, INSERT, UPDATE, DELETE, JOINs, and advanced features.
 */

import type { CheatsheetEntry } from './types';

export const postgresqlCheatsheet: CheatsheetEntry[] = [
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
    gotchas: ['ASC is default (ascending)', 'NULLs sort last by default'],
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
  {
    name: 'RIGHT JOIN',
    category: 'collections',
    syntax: 'SELECT * FROM table1 RIGHT JOIN table2 ON table1.id = table2.id',
    description: 'Return all rows from right table, NULLs for non-matching left table rows',
    example: {
      code: 'SELECT u.name, o.total FROM users u RIGHT JOIN orders o ON u.id = o.user_id',
      output: 'All orders with user names (NULL if user deleted)',
    },
    timeComplexity: 'O(n * m)',
    spaceComplexity: 'O(n)',
    gotchas: ['Less common than LEFT JOIN', 'Can be rewritten as LEFT JOIN with reversed tables'],
    interviewTip: 'Rarely used, prefer LEFT JOIN for readability',
    priority: 'common',
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
    interviewTip: 'Use RETURNING clause to get inserted data',
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
    interviewTip: 'Use WHERE to avoid updating all rows, use RETURNING to see updated data',
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
  // ADVANCED FEATURES
  // ============================================
  {
    name: 'Window Functions',
    category: 'collections',
    syntax: 'SELECT column, aggregate() OVER (PARTITION BY col ORDER BY col) FROM table',
    description: 'Perform calculations across set of rows related to current row',
    example: {
      code: 'SELECT name, salary, RANK() OVER (PARTITION BY department ORDER BY salary DESC) FROM employees',
      output: 'Ranks employees by salary within each department',
    },
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    gotchas: ['OVER clause defines window', 'Common functions: RANK, ROW_NUMBER, LAG, LEAD'],
    interviewTip: 'Powerful for analytics, similar to MongoDB $setWindowFields',
    priority: 'common',
  },
  {
    name: 'CTE (WITH)',
    category: 'collections',
    syntax: 'WITH cte AS (SELECT ...) SELECT * FROM cte',
    description: 'Common Table Expression - temporary named result set',
    example: {
      code: "WITH active_users AS (SELECT * FROM users WHERE status = 'active') SELECT COUNT(*) FROM active_users",
      output: 'Counts active users using CTE',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    gotchas: ['CTE exists only for the query', 'Can reference multiple CTEs'],
    interviewTip: 'Use for complex queries, improves readability, can be recursive',
    priority: 'common',
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
  {
    name: 'UNION',
    category: 'collections',
    syntax: 'SELECT ... UNION SELECT ...',
    description: 'Combine results of multiple SELECT statements, removing duplicates',
    example: {
      code: 'SELECT name FROM users UNION SELECT name FROM admins',
      output: 'All unique names from both tables',
    },
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    gotchas: ['UNION removes duplicates', 'UNION ALL keeps duplicates and is faster'],
    interviewTip: 'Use UNION ALL when duplicates are acceptable for better performance',
    priority: 'useful',
  },
];
