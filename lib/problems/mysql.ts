import type { Problem } from '../types';

/**
 * MySQL problems for coding drills
 * Covers MySQL-specific functions and syntax including:
 * - String Functions (CONCAT_WS, SUBSTRING_INDEX, FIELD, FIND_IN_SET)
 * - Date Functions (DATE_FORMAT, STR_TO_DATE, TIMESTAMPDIFF)
 * - Control Flow (IF, CASE, IFNULL, NULLIF, COALESCE)
 * - JSON Functions (JSON_EXTRACT, JSON_ARRAY, JSON_OBJECT, JSON_CONTAINS)
 * - Window Functions (MySQL 8.0+)
 * - Full-Text Search (MATCH AGAINST, BOOLEAN MODE)
 * - User Variables (@variable syntax)
 * - GROUP_CONCAT
 * - INSERT ON DUPLICATE KEY UPDATE
 * - Index Hints
 */

export const mysqlProblems: Problem[] = [
  // ============================================================
  // STRING FUNCTIONS (10 problems)
  // ============================================================
  {
    id: 'mysql-string-001',
    category: 'String Functions',
    difficulty: 'easy',
    title: 'Concatenate with Separator',
    text: 'Use CONCAT_WS to join first_name, middle_name, and last_name with a space separator. The table has columns: id, first_name, middle_name, last_name.',
    setup: 'SELECT from employees table',
    setupCode:
      "CREATE TABLE employees (id INT, first_name VARCHAR(50), middle_name VARCHAR(50), last_name VARCHAR(50));\nINSERT INTO employees VALUES (1, 'John', 'Michael', 'Doe');",
    expected: 'John Michael Doe',
    sample: "SELECT CONCAT_WS(' ', first_name, middle_name, last_name) FROM employees;",
    hints: [
      'CONCAT_WS stands for Concatenate With Separator',
      'The first argument is the separator',
      'CONCAT_WS automatically skips NULL values',
    ],
    validPatterns: [
      /CONCAT_WS\s*\(\s*['"]\s+['"]\s*,\s*first_name\s*,\s*middle_name\s*,\s*last_name\s*\)/i,
    ],
    tags: ['string', 'concat', 'mysql-specific'],
  },
  {
    id: 'mysql-string-002',
    category: 'String Functions',
    difficulty: 'easy',
    title: 'Extract Domain from Email',
    text: "Use SUBSTRING_INDEX to extract the domain from an email address. The email column contains 'user@example.com'.",
    setup: 'SELECT from users table with email column',
    setupCode:
      "CREATE TABLE users (id INT, email VARCHAR(100));\nINSERT INTO users VALUES (1, 'user@example.com');",
    expected: 'example.com',
    sample: "SELECT SUBSTRING_INDEX(email, '@', -1) FROM users;",
    hints: [
      'SUBSTRING_INDEX returns substring before/after nth occurrence of delimiter',
      'Negative count means from the right side',
      'Count of -1 returns everything after the last @',
    ],
    validPatterns: [/SUBSTRING_INDEX\s*\(\s*email\s*,\s*['"]@['"]\s*,\s*-1\s*\)/i],
    tags: ['string', 'substring', 'mysql-specific'],
  },
  {
    id: 'mysql-string-003',
    category: 'String Functions',
    difficulty: 'medium',
    title: 'Extract Username from Email',
    text: "Use SUBSTRING_INDEX to extract just the username part from an email address 'john.doe@company.org'.",
    setup: 'SELECT from users table',
    setupCode:
      "CREATE TABLE users (id INT, email VARCHAR(100));\nINSERT INTO users VALUES (1, 'john.doe@company.org');",
    expected: 'john.doe',
    sample: "SELECT SUBSTRING_INDEX(email, '@', 1) FROM users;",
    hints: [
      'Use positive count to get substring before the delimiter',
      'Count of 1 returns everything before the first @',
    ],
    validPatterns: [/SUBSTRING_INDEX\s*\(\s*email\s*,\s*['"]@['"]\s*,\s*1\s*\)/i],
    tags: ['string', 'substring', 'mysql-specific'],
  },
  {
    id: 'mysql-string-004',
    category: 'String Functions',
    difficulty: 'medium',
    title: 'Find Position in Set',
    text: "Use FIELD to find the position of a status value in the order: 'pending', 'processing', 'shipped', 'delivered'. The status column contains 'shipped'.",
    setup: 'SELECT from orders table',
    setupCode:
      "CREATE TABLE orders (id INT, status VARCHAR(20));\nINSERT INTO orders VALUES (1, 'shipped');",
    expected: 3,
    sample: "SELECT FIELD(status, 'pending', 'processing', 'shipped', 'delivered') FROM orders;",
    hints: [
      'FIELD returns the index position of the first argument in the list',
      'Returns 0 if not found',
      'Position is 1-based, not 0-based',
    ],
    validPatterns: [
      /FIELD\s*\(\s*status\s*,\s*['"]pending['"]\s*,\s*['"]processing['"]\s*,\s*['"]shipped['"]\s*,\s*['"]delivered['"]\s*\)/i,
    ],
    tags: ['string', 'field', 'mysql-specific'],
  },
  {
    id: 'mysql-string-005',
    category: 'String Functions',
    difficulty: 'medium',
    title: 'Search in Comma-Separated List',
    text: "Use FIND_IN_SET to check if 'admin' exists in a comma-separated roles column containing 'user,editor,admin'.",
    setup: 'SELECT from users table with roles column',
    setupCode:
      "CREATE TABLE users (id INT, roles VARCHAR(100));\nINSERT INTO users VALUES (1, 'user,editor,admin');",
    expected: 3,
    sample: "SELECT FIND_IN_SET('admin', roles) FROM users;",
    hints: [
      'FIND_IN_SET searches for a string in a comma-separated list',
      'Returns the position (1-based) if found, 0 if not found',
      'Useful for denormalized data with CSV values',
    ],
    validPatterns: [/FIND_IN_SET\s*\(\s*['"]admin['"]\s*,\s*roles\s*\)/i],
    tags: ['string', 'find-in-set', 'mysql-specific'],
  },
  {
    id: 'mysql-string-006',
    category: 'String Functions',
    difficulty: 'hard',
    title: 'Extract Middle Part of Path',
    text: "Use SUBSTRING_INDEX twice to extract 'products' from the path '/api/v1/products/123'. Extract the 3rd segment.",
    setup: 'SELECT from requests table with path column',
    setupCode:
      "CREATE TABLE requests (id INT, path VARCHAR(200));\nINSERT INTO requests VALUES (1, '/api/v1/products/123');",
    expected: 'products',
    sample: "SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(path, '/', 4), '/', -1) FROM requests;",
    hints: [
      'Nest SUBSTRING_INDEX calls to extract middle segments',
      'First call gets up to the 4th slash',
      'Second call gets the last segment of that result',
    ],
    validPatterns: [
      /SUBSTRING_INDEX\s*\(\s*SUBSTRING_INDEX\s*\(\s*path\s*,\s*['"]\/['"]\s*,\s*4\s*\)\s*,\s*['"]\/['"]\s*,\s*-1\s*\)/i,
    ],
    tags: ['string', 'substring', 'nested', 'mysql-specific'],
  },
  {
    id: 'mysql-string-007',
    category: 'String Functions',
    difficulty: 'easy',
    title: 'Sort by Custom Order',
    text: "Use FIELD in ORDER BY to sort statuses in custom order: 'critical', 'high', 'medium', 'low'.",
    setup: 'SELECT from tickets table',
    setupCode:
      "CREATE TABLE tickets (id INT, priority VARCHAR(20));\nINSERT INTO tickets VALUES (1, 'low'), (2, 'critical'), (3, 'medium');",
    expected: 'critical, medium, low',
    sample:
      "SELECT priority FROM tickets ORDER BY FIELD(priority, 'critical', 'high', 'medium', 'low');",
    hints: [
      'FIELD can be used in ORDER BY for custom sorting',
      'Items not in the list get position 0 (sort first)',
    ],
    validPatterns: [
      /ORDER\s+BY\s+FIELD\s*\(\s*priority\s*,\s*['"]critical['"]\s*,\s*['"]high['"]\s*,\s*['"]medium['"]\s*,\s*['"]low['"]\s*\)/i,
    ],
    tags: ['string', 'field', 'order-by', 'mysql-specific'],
  },
  {
    id: 'mysql-string-008',
    category: 'String Functions',
    difficulty: 'medium',
    title: 'Filter by Comma-Separated Values',
    text: "Use FIND_IN_SET in WHERE clause to find all users who have the 'moderator' role in their comma-separated roles column.",
    setup: 'SELECT from users table',
    setupCode:
      "CREATE TABLE users (id INT, name VARCHAR(50), roles VARCHAR(100));\nINSERT INTO users VALUES (1, 'Alice', 'user,moderator'), (2, 'Bob', 'user'), (3, 'Carol', 'admin,moderator');",
    expected: 'Alice, Carol',
    sample: "SELECT name FROM users WHERE FIND_IN_SET('moderator', roles) > 0;",
    hints: [
      'FIND_IN_SET returns 0 when not found',
      'Use > 0 to filter for existence',
      'Can also use != 0 or just the truthy value',
    ],
    validPatterns: [
      /WHERE\s+FIND_IN_SET\s*\(\s*['"]moderator['"]\s*,\s*roles\s*\)\s*>\s*0/i,
      /WHERE\s+FIND_IN_SET\s*\(\s*['"]moderator['"]\s*,\s*roles\s*\)\s*!=\s*0/i,
      /WHERE\s+FIND_IN_SET\s*\(\s*['"]moderator['"]\s*,\s*roles\s*\)\s*<>\s*0/i,
    ],
    tags: ['string', 'find-in-set', 'where', 'mysql-specific'],
  },
  {
    id: 'mysql-string-009',
    category: 'String Functions',
    difficulty: 'hard',
    title: 'Count Items in CSV Column',
    text: "Count the number of tags in a comma-separated tags column. For 'php,mysql,javascript', return 3.",
    setup: 'SELECT from articles table',
    setupCode:
      "CREATE TABLE articles (id INT, tags VARCHAR(200));\nINSERT INTO articles VALUES (1, 'php,mysql,javascript');",
    expected: 3,
    sample: "SELECT LENGTH(tags) - LENGTH(REPLACE(tags, ',', '')) + 1 AS tag_count FROM articles;",
    hints: [
      'Count commas and add 1 to get the number of items',
      'Use LENGTH and REPLACE to count occurrences',
      'Handle empty strings separately if needed',
    ],
    validPatterns: [
      /LENGTH\s*\(\s*tags\s*\)\s*-\s*LENGTH\s*\(\s*REPLACE\s*\(\s*tags\s*,\s*['"],?['"]\s*,\s*['"]{2}\s*\)\s*\)\s*\+\s*1/i,
    ],
    tags: ['string', 'length', 'replace', 'counting', 'mysql-specific'],
  },
  {
    id: 'mysql-string-010',
    category: 'String Functions',
    difficulty: 'medium',
    title: 'Build Full Address with CONCAT_WS',
    text: 'Use CONCAT_WS to build a full address from street, city, state, zip columns, using ", " as separator. Handle NULL values gracefully.',
    setup: 'SELECT from addresses table',
    setupCode:
      "CREATE TABLE addresses (id INT, street VARCHAR(100), city VARCHAR(50), state VARCHAR(2), zip VARCHAR(10));\nINSERT INTO addresses VALUES (1, '123 Main St', 'Boston', 'MA', '02101');",
    expected: '123 Main St, Boston, MA, 02101',
    sample: "SELECT CONCAT_WS(', ', street, city, state, zip) FROM addresses;",
    hints: [
      'CONCAT_WS automatically handles NULL values by skipping them',
      'This is more robust than regular CONCAT which returns NULL if any value is NULL',
    ],
    validPatterns: [
      /CONCAT_WS\s*\(\s*['"],\s*['"]\s*,\s*street\s*,\s*city\s*,\s*state\s*,\s*zip\s*\)/i,
    ],
    tags: ['string', 'concat', 'null-handling', 'mysql-specific'],
  },

  // ============================================================
  // DATE FUNCTIONS (10 problems)
  // ============================================================
  {
    id: 'mysql-date-001',
    category: 'Date Functions',
    difficulty: 'easy',
    title: 'Format Date as Month Day, Year',
    text: "Use DATE_FORMAT to format a date as 'January 15, 2024' format.",
    setup: 'SELECT from events table with event_date column',
    setupCode:
      "CREATE TABLE events (id INT, event_date DATE);\nINSERT INTO events VALUES (1, '2024-01-15');",
    expected: 'January 15, 2024',
    sample: "SELECT DATE_FORMAT(event_date, '%M %d, %Y') FROM events;",
    hints: ['%M = full month name', '%d = day with leading zero', '%Y = 4-digit year'],
    validPatterns: [/DATE_FORMAT\s*\(\s*event_date\s*,\s*['"]%M\s+%d,\s+%Y['"]\s*\)/i],
    tags: ['date', 'format', 'mysql-specific'],
  },
  {
    id: 'mysql-date-002',
    category: 'Date Functions',
    difficulty: 'easy',
    title: 'Format Date as DD/MM/YYYY',
    text: 'Use DATE_FORMAT to display a date in European format (DD/MM/YYYY).',
    setup: 'SELECT from orders table with order_date column',
    setupCode:
      "CREATE TABLE orders (id INT, order_date DATE);\nINSERT INTO orders VALUES (1, '2024-03-25');",
    expected: '25/03/2024',
    sample: "SELECT DATE_FORMAT(order_date, '%d/%m/%Y') FROM orders;",
    hints: ['%d = day (01-31)', '%m = month (01-12)', '%Y = 4-digit year'],
    validPatterns: [/DATE_FORMAT\s*\(\s*order_date\s*,\s*['"]%d\/%m\/%Y['"]\s*\)/i],
    tags: ['date', 'format', 'mysql-specific'],
  },
  {
    id: 'mysql-date-003',
    category: 'Date Functions',
    difficulty: 'medium',
    title: 'Parse String to Date',
    text: "Use STR_TO_DATE to convert '15-Jan-2024' to a proper DATE.",
    setup: 'SELECT statement with string date',
    setupCode: "-- Input string: '15-Jan-2024'",
    expected: '2024-01-15',
    sample: "SELECT STR_TO_DATE('15-Jan-2024', '%d-%b-%Y');",
    hints: [
      '%b = abbreviated month name (Jan, Feb, etc.)',
      'STR_TO_DATE is the reverse of DATE_FORMAT',
    ],
    validPatterns: [/STR_TO_DATE\s*\(\s*['"]15-Jan-2024['"]\s*,\s*['"]%d-%b-%Y['"]\s*\)/i],
    tags: ['date', 'parse', 'conversion', 'mysql-specific'],
  },
  {
    id: 'mysql-date-004',
    category: 'Date Functions',
    difficulty: 'medium',
    title: 'Calculate Age in Years',
    text: 'Use TIMESTAMPDIFF to calculate the age in years from a birth_date column to current date.',
    setup: 'SELECT from users table with birth_date column',
    setupCode:
      "CREATE TABLE users (id INT, birth_date DATE);\nINSERT INTO users VALUES (1, '1990-06-15');",
    expected: '33 (or current age)',
    sample: 'SELECT TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) AS age FROM users;',
    hints: [
      'TIMESTAMPDIFF takes unit, start_date, end_date',
      'Unit can be YEAR, MONTH, DAY, HOUR, MINUTE, SECOND',
      'Use CURDATE() for current date',
    ],
    validPatterns: [
      /TIMESTAMPDIFF\s*\(\s*YEAR\s*,\s*birth_date\s*,\s*CURDATE\s*\(\s*\)\s*\)/i,
      /TIMESTAMPDIFF\s*\(\s*YEAR\s*,\s*birth_date\s*,\s*NOW\s*\(\s*\)\s*\)/i,
    ],
    tags: ['date', 'timestampdiff', 'age', 'mysql-specific'],
  },
  {
    id: 'mysql-date-005',
    category: 'Date Functions',
    difficulty: 'medium',
    title: 'Days Between Orders',
    text: 'Use TIMESTAMPDIFF to calculate the number of days between order_date and ship_date.',
    setup: 'SELECT from orders table',
    setupCode:
      "CREATE TABLE orders (id INT, order_date DATE, ship_date DATE);\nINSERT INTO orders VALUES (1, '2024-01-10', '2024-01-15');",
    expected: 5,
    sample: 'SELECT TIMESTAMPDIFF(DAY, order_date, ship_date) AS days_to_ship FROM orders;',
    hints: [
      'Use DAY as the unit for day differences',
      'Start date comes before end date in parameters',
    ],
    validPatterns: [/TIMESTAMPDIFF\s*\(\s*DAY\s*,\s*order_date\s*,\s*ship_date\s*\)/i],
    tags: ['date', 'timestampdiff', 'mysql-specific'],
  },
  {
    id: 'mysql-date-006',
    category: 'Date Functions',
    difficulty: 'hard',
    title: 'Format Time as 12-Hour Clock',
    text: "Use DATE_FORMAT to display a datetime as '03:45 PM' format.",
    setup: 'SELECT from events table with event_time column',
    setupCode:
      "CREATE TABLE events (id INT, event_time DATETIME);\nINSERT INTO events VALUES (1, '2024-01-15 15:45:00');",
    expected: '03:45 PM',
    sample: "SELECT DATE_FORMAT(event_time, '%h:%i %p') FROM events;",
    hints: ['%h = 12-hour format (01-12)', '%i = minutes (00-59)', '%p = AM or PM'],
    validPatterns: [/DATE_FORMAT\s*\(\s*event_time\s*,\s*['"]%h:%i\s*%p['"]\s*\)/i],
    tags: ['date', 'time', 'format', 'mysql-specific'],
  },
  {
    id: 'mysql-date-007',
    category: 'Date Functions',
    difficulty: 'easy',
    title: 'Extract Day of Week Name',
    text: 'Use DATE_FORMAT to get the full weekday name from a date.',
    setup: 'SELECT from events table',
    setupCode:
      "CREATE TABLE events (id INT, event_date DATE);\nINSERT INTO events VALUES (1, '2024-01-15');",
    expected: 'Monday',
    sample: "SELECT DATE_FORMAT(event_date, '%W') FROM events;",
    hints: ['%W = full weekday name', '%w = day of week (0=Sunday, 6=Saturday)'],
    validPatterns: [
      /DATE_FORMAT\s*\(\s*event_date\s*,\s*['"]%W['"]\s*\)/i,
      /DAYNAME\s*\(\s*event_date\s*\)/i,
    ],
    tags: ['date', 'weekday', 'format', 'mysql-specific'],
  },
  {
    id: 'mysql-date-008',
    category: 'Date Functions',
    difficulty: 'medium',
    title: 'Parse US Date Format',
    text: "Use STR_TO_DATE to convert '03/25/2024' (MM/DD/YYYY) to a DATE.",
    setup: 'SELECT statement',
    setupCode: "-- Input: '03/25/2024'",
    expected: '2024-03-25',
    sample: "SELECT STR_TO_DATE('03/25/2024', '%m/%d/%Y');",
    hints: ['Order of format specifiers must match the input string', '%m = month, %d = day'],
    validPatterns: [/STR_TO_DATE\s*\(\s*['"]03\/25\/2024['"]\s*,\s*['"]%m\/%d\/%Y['"]\s*\)/i],
    tags: ['date', 'parse', 'mysql-specific'],
  },
  {
    id: 'mysql-date-009',
    category: 'Date Functions',
    difficulty: 'hard',
    title: 'Calculate Months of Tenure',
    text: 'Use TIMESTAMPDIFF to calculate how many complete months an employee has worked from hire_date to today.',
    setup: 'SELECT from employees table',
    setupCode:
      "CREATE TABLE employees (id INT, hire_date DATE);\nINSERT INTO employees VALUES (1, '2022-06-15');",
    expected: '19 (varies by current date)',
    sample: 'SELECT TIMESTAMPDIFF(MONTH, hire_date, CURDATE()) AS months_worked FROM employees;',
    hints: ['MONTH unit counts complete months', 'Partial months are not counted'],
    validPatterns: [/TIMESTAMPDIFF\s*\(\s*MONTH\s*,\s*hire_date\s*,\s*CURDATE\s*\(\s*\)\s*\)/i],
    tags: ['date', 'timestampdiff', 'tenure', 'mysql-specific'],
  },
  {
    id: 'mysql-date-010',
    category: 'Date Functions',
    difficulty: 'medium',
    title: 'Format ISO Week Number',
    text: "Use DATE_FORMAT to display the ISO week number and year like 'Week 03 of 2024'.",
    setup: 'SELECT from logs table',
    setupCode:
      "CREATE TABLE logs (id INT, log_date DATE);\nINSERT INTO logs VALUES (1, '2024-01-15');",
    expected: 'Week 03 of 2024',
    sample: "SELECT DATE_FORMAT(log_date, 'Week %v of %x') FROM logs;",
    hints: [
      '%v = ISO week number (01-53)',
      '%x = ISO year for the week',
      'ISO weeks start on Monday',
    ],
    validPatterns: [/DATE_FORMAT\s*\(\s*log_date\s*,\s*['"]Week\s+%v\s+of\s+%x['"]\s*\)/i],
    tags: ['date', 'iso-week', 'format', 'mysql-specific'],
  },

  // ============================================================
  // CONTROL FLOW FUNCTIONS (8 problems)
  // ============================================================
  {
    id: 'mysql-control-001',
    category: 'Control Flow',
    difficulty: 'easy',
    title: 'Simple IF Expression',
    text: "Use IF() to return 'Active' if status = 1, otherwise 'Inactive'.",
    setup: 'SELECT from users table with status column',
    setupCode:
      "CREATE TABLE users (id INT, name VARCHAR(50), status INT);\nINSERT INTO users VALUES (1, 'John', 1);",
    expected: 'Active',
    sample: "SELECT IF(status = 1, 'Active', 'Inactive') FROM users;",
    hints: ['IF(condition, true_value, false_value)', 'Similar to ternary operator in programming'],
    validPatterns: [/IF\s*\(\s*status\s*=\s*1\s*,\s*['"]Active['"]\s*,\s*['"]Inactive['"]\s*\)/i],
    tags: ['control-flow', 'if', 'mysql-specific'],
  },
  {
    id: 'mysql-control-002',
    category: 'Control Flow',
    difficulty: 'easy',
    title: 'Handle NULL with IFNULL',
    text: "Use IFNULL to return 'N/A' when the phone column is NULL.",
    setup: 'SELECT from contacts table',
    setupCode:
      "CREATE TABLE contacts (id INT, name VARCHAR(50), phone VARCHAR(20));\nINSERT INTO contacts VALUES (1, 'John', NULL);",
    expected: 'N/A',
    sample: "SELECT IFNULL(phone, 'N/A') FROM contacts;",
    hints: [
      'IFNULL(expr1, expr2) returns expr2 if expr1 is NULL',
      'Simpler than COALESCE for two values',
    ],
    validPatterns: [/IFNULL\s*\(\s*phone\s*,\s*['"]N\/A['"]\s*\)/i],
    tags: ['control-flow', 'null', 'ifnull', 'mysql-specific'],
  },
  {
    id: 'mysql-control-003',
    category: 'Control Flow',
    difficulty: 'medium',
    title: 'NULLIF for Division Safety',
    text: 'Use NULLIF to safely divide total_sales by num_orders, avoiding division by zero.',
    setup: 'SELECT from metrics table',
    setupCode:
      'CREATE TABLE metrics (id INT, total_sales DECIMAL(10,2), num_orders INT);\nINSERT INTO metrics VALUES (1, 1000.00, 0);',
    expected: 'NULL (safe)',
    sample: 'SELECT total_sales / NULLIF(num_orders, 0) AS avg_order FROM metrics;',
    hints: [
      'NULLIF(expr1, expr2) returns NULL if expr1 = expr2',
      'Dividing by NULL returns NULL instead of error',
    ],
    validPatterns: [/NULLIF\s*\(\s*num_orders\s*,\s*0\s*\)/i],
    tags: ['control-flow', 'nullif', 'division', 'mysql-specific'],
  },
  {
    id: 'mysql-control-004',
    category: 'Control Flow',
    difficulty: 'medium',
    title: 'COALESCE Chain',
    text: 'Use COALESCE to return the first non-NULL value from mobile_phone, home_phone, work_phone, or "No phone".',
    setup: 'SELECT from contacts table',
    setupCode:
      "CREATE TABLE contacts (id INT, mobile_phone VARCHAR(20), home_phone VARCHAR(20), work_phone VARCHAR(20));\nINSERT INTO contacts VALUES (1, NULL, NULL, '555-0100');",
    expected: '555-0100',
    sample: "SELECT COALESCE(mobile_phone, home_phone, work_phone, 'No phone') FROM contacts;",
    hints: [
      'COALESCE returns the first non-NULL argument',
      'Can have any number of arguments',
      'Last argument can be a default value',
    ],
    validPatterns: [
      /COALESCE\s*\(\s*mobile_phone\s*,\s*home_phone\s*,\s*work_phone\s*,\s*['"]No phone['"]\s*\)/i,
    ],
    tags: ['control-flow', 'coalesce', 'null', 'mysql-specific'],
  },
  {
    id: 'mysql-control-005',
    category: 'Control Flow',
    difficulty: 'medium',
    title: 'CASE Expression for Grade',
    text: "Use CASE to convert numeric score to letter grade: >= 90 = 'A', >= 80 = 'B', >= 70 = 'C', >= 60 = 'D', else 'F'.",
    setup: 'SELECT from students table',
    setupCode:
      "CREATE TABLE students (id INT, name VARCHAR(50), score INT);\nINSERT INTO students VALUES (1, 'Alice', 85);",
    expected: 'B',
    sample:
      "SELECT CASE WHEN score >= 90 THEN 'A' WHEN score >= 80 THEN 'B' WHEN score >= 70 THEN 'C' WHEN score >= 60 THEN 'D' ELSE 'F' END FROM students;",
    hints: [
      'CASE WHEN condition THEN result ... ELSE default END',
      'Conditions are evaluated in order',
    ],
    validPatterns: [
      /CASE\s+WHEN\s+score\s*>=\s*90\s+THEN\s+['"]A['"]\s+WHEN\s+score\s*>=\s*80\s+THEN\s+['"]B['"]/i,
    ],
    tags: ['control-flow', 'case', 'mysql-specific'],
  },
  {
    id: 'mysql-control-006',
    category: 'Control Flow',
    difficulty: 'easy',
    title: 'Simple CASE Switch',
    text: "Use simple CASE syntax to convert status codes: 1 = 'Pending', 2 = 'Approved', 3 = 'Rejected'.",
    setup: 'SELECT from applications table',
    setupCode:
      'CREATE TABLE applications (id INT, status_code INT);\nINSERT INTO applications VALUES (1, 2);',
    expected: 'Approved',
    sample:
      "SELECT CASE status_code WHEN 1 THEN 'Pending' WHEN 2 THEN 'Approved' WHEN 3 THEN 'Rejected' END FROM applications;",
    hints: [
      'Simple CASE: CASE expression WHEN value THEN result',
      'Compares expression to each value',
    ],
    validPatterns: [
      /CASE\s+status_code\s+WHEN\s+1\s+THEN\s+['"]Pending['"]\s+WHEN\s+2\s+THEN\s+['"]Approved['"]\s+WHEN\s+3\s+THEN\s+['"]Rejected['"]/i,
    ],
    tags: ['control-flow', 'case', 'mysql-specific'],
  },
  {
    id: 'mysql-control-007',
    category: 'Control Flow',
    difficulty: 'hard',
    title: 'Nested IF for Category',
    text: "Use nested IF to categorize price: < 10 = 'Budget', < 50 = 'Standard', < 100 = 'Premium', else 'Luxury'.",
    setup: 'SELECT from products table',
    setupCode:
      "CREATE TABLE products (id INT, name VARCHAR(50), price DECIMAL(10,2));\nINSERT INTO products VALUES (1, 'Widget', 75.00);",
    expected: 'Premium',
    sample:
      "SELECT IF(price < 10, 'Budget', IF(price < 50, 'Standard', IF(price < 100, 'Premium', 'Luxury'))) FROM products;",
    hints: ['Nest IF() calls for multiple conditions', 'CASE is often cleaner for many conditions'],
    validPatterns: [/IF\s*\(\s*price\s*<\s*10\s*,\s*['"]Budget['"]\s*,\s*IF\s*\(/i],
    tags: ['control-flow', 'if', 'nested', 'mysql-specific'],
  },
  {
    id: 'mysql-control-008',
    category: 'Control Flow',
    difficulty: 'medium',
    title: 'COALESCE with Calculation',
    text: 'Use COALESCE to calculate total price as (quantity * COALESCE(discount_price, regular_price)).',
    setup: 'SELECT from order_items table',
    setupCode:
      'CREATE TABLE order_items (id INT, quantity INT, regular_price DECIMAL(10,2), discount_price DECIMAL(10,2));\nINSERT INTO order_items VALUES (1, 3, 100.00, 80.00);',
    expected: 240.0,
    sample: 'SELECT quantity * COALESCE(discount_price, regular_price) AS total FROM order_items;',
    hints: [
      'COALESCE picks the first non-NULL value',
      'Use discount_price if available, otherwise regular_price',
    ],
    validPatterns: [/quantity\s*\*\s*COALESCE\s*\(\s*discount_price\s*,\s*regular_price\s*\)/i],
    tags: ['control-flow', 'coalesce', 'calculation', 'mysql-specific'],
  },

  // ============================================================
  // JSON FUNCTIONS (10 problems)
  // ============================================================
  {
    id: 'mysql-json-001',
    category: 'JSON Functions',
    difficulty: 'easy',
    title: 'Extract JSON Value',
    text: 'Use JSON_EXTRACT to get the \'name\' field from a JSON column data = \'{"name": "John", "age": 30}\'.',
    setup: 'SELECT from profiles table with data JSON column',
    setupCode:
      'CREATE TABLE profiles (id INT, data JSON);\nINSERT INTO profiles VALUES (1, \'{"name": "John", "age": 30}\');',
    expected: '"John"',
    sample: "SELECT JSON_EXTRACT(data, '$.name') FROM profiles;",
    hints: [
      '$ represents the root of the JSON document',
      '$.key accesses a key at the root level',
      'Returns JSON-formatted result (with quotes for strings)',
    ],
    validPatterns: [
      /JSON_EXTRACT\s*\(\s*data\s*,\s*['"]?\$\.name['"]?\s*\)/i,
      /data\s*->\s*['"]?\$\.name['"]?/i,
    ],
    tags: ['json', 'extract', 'mysql-specific'],
  },
  {
    id: 'mysql-json-002',
    category: 'JSON Functions',
    difficulty: 'easy',
    title: 'JSON Arrow Operator',
    text: "Use the -> operator shorthand to extract 'email' from JSON column.",
    setup: 'SELECT from users table with info JSON column',
    setupCode:
      'CREATE TABLE users (id INT, info JSON);\nINSERT INTO users VALUES (1, \'{"email": "john@example.com"}\');',
    expected: '"john@example.com"',
    sample: "SELECT info->'$.email' FROM users;",
    hints: ['-> is shorthand for JSON_EXTRACT', 'MySQL 5.7+ supports this syntax'],
    validPatterns: [
      /info\s*->\s*['"]?\$\.email['"]?/i,
      /JSON_EXTRACT\s*\(\s*info\s*,\s*['"]?\$\.email['"]?\s*\)/i,
    ],
    tags: ['json', 'operator', 'mysql-specific'],
  },
  {
    id: 'mysql-json-003',
    category: 'JSON Functions',
    difficulty: 'medium',
    title: 'JSON Unquote Extraction',
    text: "Use ->> operator to extract 'city' as unquoted text from JSON column.",
    setup: 'SELECT from customers table',
    setupCode:
      'CREATE TABLE customers (id INT, address JSON);\nINSERT INTO customers VALUES (1, \'{"city": "Boston", "zip": "02101"}\');',
    expected: 'Boston',
    sample: "SELECT address->>'$.city' FROM customers;",
    hints: ['->> extracts and unquotes the value', 'Equivalent to JSON_UNQUOTE(JSON_EXTRACT(...))'],
    validPatterns: [
      /address\s*->>\s*['"]?\$\.city['"]?/i,
      /JSON_UNQUOTE\s*\(\s*JSON_EXTRACT\s*\(\s*address\s*,\s*['"]?\$\.city['"]?\s*\)\s*\)/i,
    ],
    tags: ['json', 'unquote', 'mysql-specific'],
  },
  {
    id: 'mysql-json-004',
    category: 'JSON Functions',
    difficulty: 'medium',
    title: 'Create JSON Object',
    text: "Use JSON_OBJECT to create a JSON object with keys 'id', 'name', 'active' from table columns.",
    setup: 'SELECT from users table',
    setupCode:
      "CREATE TABLE users (id INT, name VARCHAR(50), active BOOLEAN);\nINSERT INTO users VALUES (1, 'John', TRUE);",
    expected: '{"id": 1, "name": "John", "active": true}',
    sample: "SELECT JSON_OBJECT('id', id, 'name', name, 'active', active) FROM users;",
    hints: [
      "JSON_OBJECT('key1', value1, 'key2', value2, ...)",
      'Keys and values alternate in the argument list',
    ],
    validPatterns: [
      /JSON_OBJECT\s*\(\s*['"]id['"]\s*,\s*id\s*,\s*['"]name['"]\s*,\s*name\s*,\s*['"]active['"]\s*,\s*active\s*\)/i,
    ],
    tags: ['json', 'create', 'mysql-specific'],
  },
  {
    id: 'mysql-json-005',
    category: 'JSON Functions',
    difficulty: 'medium',
    title: 'Create JSON Array',
    text: 'Use JSON_ARRAY to create a JSON array from multiple column values.',
    setup: 'SELECT from products table',
    setupCode:
      "CREATE TABLE products (id INT, name VARCHAR(50), price DECIMAL(10,2), category VARCHAR(50));\nINSERT INTO products VALUES (1, 'Widget', 19.99, 'Electronics');",
    expected: '[1, "Widget", 19.99, "Electronics"]',
    sample: 'SELECT JSON_ARRAY(id, name, price, category) FROM products;',
    hints: [
      'JSON_ARRAY(val1, val2, ...) creates an array',
      'Values are converted to JSON types automatically',
    ],
    validPatterns: [/JSON_ARRAY\s*\(\s*id\s*,\s*name\s*,\s*price\s*,\s*category\s*\)/i],
    tags: ['json', 'array', 'mysql-specific'],
  },
  {
    id: 'mysql-json-006',
    category: 'JSON Functions',
    difficulty: 'medium',
    title: 'Check JSON Contains Value',
    text: "Use JSON_CONTAINS to check if a JSON array column 'tags' contains the value 'urgent'.",
    setup: 'SELECT from tickets table',
    setupCode:
      'CREATE TABLE tickets (id INT, tags JSON);\nINSERT INTO tickets VALUES (1, \'["support", "urgent", "billing"]\');',
    expected: 1,
    sample: 'SELECT JSON_CONTAINS(tags, \'"urgent"\') FROM tickets;',
    hints: [
      'Second argument must be valid JSON (quoted for strings)',
      'Returns 1 if contained, 0 if not',
    ],
    validPatterns: [/JSON_CONTAINS\s*\(\s*tags\s*,\s*['"]['"]?urgent['"]?['"]\s*\)/i],
    tags: ['json', 'contains', 'mysql-specific'],
  },
  {
    id: 'mysql-json-007',
    category: 'JSON Functions',
    difficulty: 'hard',
    title: 'Extract Nested JSON',
    text: 'Use JSON_EXTRACT to get the city from nested JSON: \'{"address": {"city": "Boston", "state": "MA"}}\'.',
    setup: 'SELECT from customers table',
    setupCode:
      'CREATE TABLE customers (id INT, data JSON);\nINSERT INTO customers VALUES (1, \'{"address": {"city": "Boston", "state": "MA"}}\');',
    expected: '"Boston"',
    sample: "SELECT JSON_EXTRACT(data, '$.address.city') FROM customers;",
    hints: [
      'Use dot notation for nested paths',
      '$.address.city navigates to address object then city key',
    ],
    validPatterns: [
      /JSON_EXTRACT\s*\(\s*data\s*,\s*['"]?\$\.address\.city['"]?\s*\)/i,
      /data\s*->\s*['"]?\$\.address\.city['"]?/i,
    ],
    tags: ['json', 'nested', 'mysql-specific'],
  },
  {
    id: 'mysql-json-008',
    category: 'JSON Functions',
    difficulty: 'hard',
    title: 'Extract Array Element',
    text: 'Use JSON_EXTRACT to get the second item (index 1) from JSON array \'["apple", "banana", "cherry"]\'.',
    setup: 'SELECT from baskets table',
    setupCode:
      'CREATE TABLE baskets (id INT, fruits JSON);\nINSERT INTO baskets VALUES (1, \'["apple", "banana", "cherry"]\');',
    expected: '"banana"',
    sample: "SELECT JSON_EXTRACT(fruits, '$[1]') FROM baskets;",
    hints: ['Use $[index] for array elements', 'Arrays are 0-indexed'],
    validPatterns: [
      /JSON_EXTRACT\s*\(\s*fruits\s*,\s*['"]?\$\[1\]['"]?\s*\)/i,
      /fruits\s*->\s*['"]?\$\[1\]['"]?/i,
    ],
    tags: ['json', 'array', 'index', 'mysql-specific'],
  },
  {
    id: 'mysql-json-009',
    category: 'JSON Functions',
    difficulty: 'hard',
    title: 'JSON Search for Key',
    text: "Use JSON_SEARCH to find the path to value 'premium' in JSON object.",
    setup: 'SELECT from subscriptions table',
    setupCode:
      'CREATE TABLE subscriptions (id INT, details JSON);\nINSERT INTO subscriptions VALUES (1, \'{"plan": "premium", "status": "active"}\');',
    expected: '"$.plan"',
    sample: "SELECT JSON_SEARCH(details, 'one', 'premium') FROM subscriptions;",
    hints: [
      'JSON_SEARCH returns the path to the value',
      "'one' returns first match, 'all' returns all matches",
    ],
    validPatterns: [/JSON_SEARCH\s*\(\s*details\s*,\s*['"]one['"]\s*,\s*['"]premium['"]\s*\)/i],
    tags: ['json', 'search', 'mysql-specific'],
  },
  {
    id: 'mysql-json-010',
    category: 'JSON Functions',
    difficulty: 'medium',
    title: 'JSON Array Length',
    text: "Use JSON_LENGTH to count the number of items in a JSON array column 'items'.",
    setup: 'SELECT from orders table',
    setupCode:
      'CREATE TABLE orders (id INT, items JSON);\nINSERT INTO orders VALUES (1, \'[{"sku": "A1"}, {"sku": "B2"}, {"sku": "C3"}]\');',
    expected: 3,
    sample: 'SELECT JSON_LENGTH(items) FROM orders;',
    hints: [
      'JSON_LENGTH returns number of elements in array',
      'For objects, returns number of keys',
    ],
    validPatterns: [/JSON_LENGTH\s*\(\s*items\s*\)/i],
    tags: ['json', 'length', 'mysql-specific'],
  },

  // ============================================================
  // WINDOW FUNCTIONS (8 problems)
  // ============================================================
  {
    id: 'mysql-window-001',
    category: 'Window Functions',
    difficulty: 'medium',
    title: 'Row Number by Department',
    text: 'Use ROW_NUMBER() to assign sequential numbers to employees within each department, ordered by salary descending.',
    setup: 'SELECT from employees table',
    setupCode:
      "CREATE TABLE employees (id INT, name VARCHAR(50), department VARCHAR(50), salary DECIMAL(10,2));\nINSERT INTO employees VALUES (1, 'Alice', 'Engineering', 90000);",
    expected: 'row_num = 1 for highest salary in each dept',
    sample:
      'SELECT name, department, salary, ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num FROM employees;',
    hints: [
      'PARTITION BY divides rows into groups',
      'ORDER BY determines the numbering order',
      'ROW_NUMBER() assigns unique sequential integers',
    ],
    validPatterns: [
      /ROW_NUMBER\s*\(\s*\)\s+OVER\s*\(\s*PARTITION\s+BY\s+department\s+ORDER\s+BY\s+salary\s+DESC\s*\)/i,
    ],
    tags: ['window', 'row-number', 'mysql-8', 'mysql-specific'],
  },
  {
    id: 'mysql-window-002',
    category: 'Window Functions',
    difficulty: 'medium',
    title: 'Rank with Ties',
    text: 'Use RANK() to rank products by sales, allowing for ties (same rank for equal values).',
    setup: 'SELECT from products table',
    setupCode:
      "CREATE TABLE products (id INT, name VARCHAR(50), sales INT);\nINSERT INTO products VALUES (1, 'A', 100), (2, 'B', 100), (3, 'C', 80);",
    expected: 'A=1, B=1, C=3',
    sample: 'SELECT name, sales, RANK() OVER (ORDER BY sales DESC) AS sales_rank FROM products;',
    hints: [
      'RANK() assigns same rank for equal values',
      'Leaves gaps after ties (1, 1, 3 not 1, 1, 2)',
    ],
    validPatterns: [/RANK\s*\(\s*\)\s+OVER\s*\(\s*ORDER\s+BY\s+sales\s+DESC\s*\)/i],
    tags: ['window', 'rank', 'mysql-8', 'mysql-specific'],
  },
  {
    id: 'mysql-window-003',
    category: 'Window Functions',
    difficulty: 'medium',
    title: 'Dense Rank',
    text: 'Use DENSE_RANK() to rank products without gaps after ties.',
    setup: 'SELECT from products table',
    setupCode:
      "CREATE TABLE products (id INT, name VARCHAR(50), sales INT);\nINSERT INTO products VALUES (1, 'A', 100), (2, 'B', 100), (3, 'C', 80);",
    expected: 'A=1, B=1, C=2',
    sample:
      'SELECT name, sales, DENSE_RANK() OVER (ORDER BY sales DESC) AS sales_rank FROM products;',
    hints: ['DENSE_RANK() does not leave gaps after ties', 'Results: 1, 1, 2 instead of 1, 1, 3'],
    validPatterns: [/DENSE_RANK\s*\(\s*\)\s+OVER\s*\(\s*ORDER\s+BY\s+sales\s+DESC\s*\)/i],
    tags: ['window', 'dense-rank', 'mysql-8', 'mysql-specific'],
  },
  {
    id: 'mysql-window-004',
    category: 'Window Functions',
    difficulty: 'hard',
    title: 'Running Total',
    text: 'Use SUM() as window function to calculate running total of order_amount ordered by order_date.',
    setup: 'SELECT from orders table',
    setupCode:
      "CREATE TABLE orders (id INT, order_date DATE, order_amount DECIMAL(10,2));\nINSERT INTO orders VALUES (1, '2024-01-01', 100.00), (2, '2024-01-02', 150.00);",
    expected: '100.00, 250.00',
    sample:
      'SELECT order_date, order_amount, SUM(order_amount) OVER (ORDER BY order_date) AS running_total FROM orders;',
    hints: [
      'Aggregate functions can be used as window functions',
      'ORDER BY without PARTITION BY creates running aggregates',
    ],
    validPatterns: [/SUM\s*\(\s*order_amount\s*\)\s+OVER\s*\(\s*ORDER\s+BY\s+order_date\s*\)/i],
    tags: ['window', 'sum', 'running-total', 'mysql-8', 'mysql-specific'],
  },
  {
    id: 'mysql-window-005',
    category: 'Window Functions',
    difficulty: 'hard',
    title: 'LAG - Previous Row Value',
    text: "Use LAG() to get the previous day's closing price for stock comparison.",
    setup: 'SELECT from stock_prices table',
    setupCode:
      "CREATE TABLE stock_prices (id INT, trade_date DATE, close_price DECIMAL(10,2));\nINSERT INTO stock_prices VALUES (1, '2024-01-01', 100.00), (2, '2024-01-02', 105.00);",
    expected: 'prev_close = NULL, 100.00',
    sample:
      'SELECT trade_date, close_price, LAG(close_price, 1) OVER (ORDER BY trade_date) AS prev_close FROM stock_prices;',
    hints: [
      'LAG(column, offset) gets value from previous rows',
      'Default offset is 1',
      'Returns NULL for first row',
    ],
    validPatterns: [
      /LAG\s*\(\s*close_price\s*(,\s*1)?\s*\)\s+OVER\s*\(\s*ORDER\s+BY\s+trade_date\s*\)/i,
    ],
    tags: ['window', 'lag', 'mysql-8', 'mysql-specific'],
  },
  {
    id: 'mysql-window-006',
    category: 'Window Functions',
    difficulty: 'hard',
    title: 'LEAD - Next Row Value',
    text: 'Use LEAD() to get the next scheduled appointment for each patient.',
    setup: 'SELECT from appointments table',
    setupCode:
      "CREATE TABLE appointments (id INT, patient_id INT, appt_date DATE);\nINSERT INTO appointments VALUES (1, 1, '2024-01-15'), (2, 1, '2024-02-15');",
    expected: 'next_appt = 2024-02-15, NULL',
    sample:
      'SELECT patient_id, appt_date, LEAD(appt_date, 1) OVER (PARTITION BY patient_id ORDER BY appt_date) AS next_appt FROM appointments;',
    hints: [
      'LEAD(column, offset) gets value from following rows',
      'PARTITION BY groups by patient for individual sequences',
    ],
    validPatterns: [
      /LEAD\s*\(\s*appt_date\s*(,\s*1)?\s*\)\s+OVER\s*\(\s*PARTITION\s+BY\s+patient_id\s+ORDER\s+BY\s+appt_date\s*\)/i,
    ],
    tags: ['window', 'lead', 'mysql-8', 'mysql-specific'],
  },
  {
    id: 'mysql-window-007',
    category: 'Window Functions',
    difficulty: 'medium',
    title: 'NTILE Distribution',
    text: 'Use NTILE(4) to divide products into 4 quartiles based on price.',
    setup: 'SELECT from products table',
    setupCode: 'CREATE TABLE products (id INT, name VARCHAR(50), price DECIMAL(10,2));',
    expected: 'Each product assigned to quartile 1-4',
    sample: 'SELECT name, price, NTILE(4) OVER (ORDER BY price) AS price_quartile FROM products;',
    hints: [
      'NTILE(n) divides rows into n roughly equal groups',
      'Useful for percentile/quartile analysis',
    ],
    validPatterns: [/NTILE\s*\(\s*4\s*\)\s+OVER\s*\(\s*ORDER\s+BY\s+price\s*\)/i],
    tags: ['window', 'ntile', 'mysql-8', 'mysql-specific'],
  },
  {
    id: 'mysql-window-008',
    category: 'Window Functions',
    difficulty: 'hard',
    title: 'Moving Average',
    text: 'Calculate a 3-day moving average of sales using window frame specification.',
    setup: 'SELECT from daily_sales table',
    setupCode: 'CREATE TABLE daily_sales (id INT, sale_date DATE, amount DECIMAL(10,2));',
    expected: 'Rolling 3-day average for each row',
    sample:
      'SELECT sale_date, amount, AVG(amount) OVER (ORDER BY sale_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg FROM daily_sales;',
    hints: ['ROWS BETWEEN defines the window frame', '2 PRECEDING AND CURRENT ROW = last 3 rows'],
    validPatterns: [
      /AVG\s*\(\s*amount\s*\)\s+OVER\s*\(\s*ORDER\s+BY\s+sale_date\s+ROWS\s+BETWEEN\s+2\s+PRECEDING\s+AND\s+CURRENT\s+ROW\s*\)/i,
    ],
    tags: ['window', 'moving-average', 'frame', 'mysql-8', 'mysql-specific'],
  },

  // ============================================================
  // FULL-TEXT SEARCH (5 problems)
  // ============================================================
  {
    id: 'mysql-fts-001',
    category: 'Full-Text Search',
    difficulty: 'medium',
    title: 'Basic Full-Text Search',
    text: "Use MATCH AGAINST to search for articles containing 'database optimization'.",
    setup: 'SELECT from articles table with FULLTEXT index on content',
    setupCode:
      "CREATE TABLE articles (id INT, title VARCHAR(200), content TEXT, FULLTEXT(content));\nINSERT INTO articles VALUES (1, 'DB Tips', 'database optimization techniques');",
    expected: 'Matching articles returned',
    sample: "SELECT * FROM articles WHERE MATCH(content) AGAINST('database optimization');",
    hints: [
      'MATCH AGAINST performs full-text search',
      'Requires FULLTEXT index on the column',
      'Natural language mode is default',
    ],
    validPatterns: [
      /MATCH\s*\(\s*content\s*\)\s+AGAINST\s*\(\s*['"]database\s+optimization['"]\s*\)/i,
    ],
    tags: ['fulltext', 'search', 'mysql-specific'],
  },
  {
    id: 'mysql-fts-002',
    category: 'Full-Text Search',
    difficulty: 'medium',
    title: 'Boolean Mode Search',
    text: "Use BOOLEAN MODE to find articles that must contain 'mysql' but not 'oracle'.",
    setup: 'SELECT from articles table with FULLTEXT index',
    setupCode: 'CREATE TABLE articles (id INT, content TEXT, FULLTEXT(content));',
    expected: 'Articles with mysql but not oracle',
    sample:
      "SELECT * FROM articles WHERE MATCH(content) AGAINST('+mysql -oracle' IN BOOLEAN MODE);",
    hints: [
      '+ means word must be present',
      '- means word must be absent',
      'IN BOOLEAN MODE enables operators',
    ],
    validPatterns: [
      /MATCH\s*\(\s*content\s*\)\s+AGAINST\s*\(\s*['"]\+mysql\s+-oracle['"]\s+IN\s+BOOLEAN\s+MODE\s*\)/i,
    ],
    tags: ['fulltext', 'boolean', 'mysql-specific'],
  },
  {
    id: 'mysql-fts-003',
    category: 'Full-Text Search',
    difficulty: 'hard',
    title: 'Relevance Score',
    text: 'Select articles and their relevance score for the search term, ordered by relevance.',
    setup: 'SELECT from articles table',
    setupCode:
      'CREATE TABLE articles (id INT, title VARCHAR(200), content TEXT, FULLTEXT(content));',
    expected: 'Articles with relevance score, highest first',
    sample:
      "SELECT title, MATCH(content) AGAINST('performance tuning') AS relevance FROM articles WHERE MATCH(content) AGAINST('performance tuning') ORDER BY relevance DESC;",
    hints: [
      'MATCH AGAINST returns a relevance score when used in SELECT',
      'Higher score = more relevant',
      'Need to repeat MATCH AGAINST in WHERE and SELECT',
    ],
    validPatterns: [/SELECT\s+.*MATCH\s*\(\s*content\s*\)\s+AGAINST\s*\(.*\)\s+AS\s+relevance/i],
    tags: ['fulltext', 'relevance', 'mysql-specific'],
  },
  {
    id: 'mysql-fts-004',
    category: 'Full-Text Search',
    difficulty: 'hard',
    title: 'Phrase Search',
    text: "Use Boolean mode to search for the exact phrase 'query optimization' using double quotes.",
    setup: 'SELECT from tutorials table',
    setupCode: 'CREATE TABLE tutorials (id INT, content TEXT, FULLTEXT(content));',
    expected: 'Only articles with exact phrase',
    sample:
      'SELECT * FROM tutorials WHERE MATCH(content) AGAINST(\'"query optimization"\' IN BOOLEAN MODE);',
    hints: [
      'Wrap phrase in double quotes for exact matching',
      'Outer quotes are SQL string delimiters',
      'Inner double quotes are for phrase matching',
    ],
    validPatterns: [
      /MATCH\s*\(\s*content\s*\)\s+AGAINST\s*\(\s*['"]['"]query\s+optimization['"]['"].*IN\s+BOOLEAN\s+MODE\s*\)/i,
    ],
    tags: ['fulltext', 'phrase', 'boolean', 'mysql-specific'],
  },
  {
    id: 'mysql-fts-005',
    category: 'Full-Text Search',
    difficulty: 'medium',
    title: 'Wildcard Search',
    text: "Use Boolean mode with * wildcard to find words starting with 'optim' (optimization, optimize, etc.).",
    setup: 'SELECT from articles table',
    setupCode: 'CREATE TABLE articles (id INT, content TEXT, FULLTEXT(content));',
    expected: 'Articles containing words starting with optim',
    sample: "SELECT * FROM articles WHERE MATCH(content) AGAINST('optim*' IN BOOLEAN MODE);",
    hints: [
      '* is a wildcard for any characters',
      'Only works as suffix (word*), not prefix (*word)',
      'Must use BOOLEAN MODE for wildcards',
    ],
    validPatterns: [
      /MATCH\s*\(\s*content\s*\)\s+AGAINST\s*\(\s*['"]optim\*['"]\s+IN\s+BOOLEAN\s+MODE\s*\)/i,
    ],
    tags: ['fulltext', 'wildcard', 'boolean', 'mysql-specific'],
  },

  // ============================================================
  // USER VARIABLES (4 problems)
  // ============================================================
  {
    id: 'mysql-var-001',
    category: 'User Variables',
    difficulty: 'easy',
    title: 'Set and Use Variable',
    text: 'Set a user variable @tax_rate to 0.08 and use it to calculate tax on price.',
    setup: 'SELECT from products table',
    setupCode:
      "CREATE TABLE products (id INT, name VARCHAR(50), price DECIMAL(10,2));\nINSERT INTO products VALUES (1, 'Widget', 100.00);",
    expected: 'tax = 8.00',
    sample: 'SET @tax_rate = 0.08;\nSELECT name, price, price * @tax_rate AS tax FROM products;',
    hints: [
      'User variables start with @',
      'SET @var = value assigns the value',
      'Variables persist for the session',
    ],
    validPatterns: [/SET\s+@tax_rate\s*=\s*0\.08/i, /@tax_rate/i],
    tags: ['variables', 'session', 'mysql-specific'],
  },
  {
    id: 'mysql-var-002',
    category: 'User Variables',
    difficulty: 'medium',
    title: 'Row Counter Variable',
    text: 'Use a user variable to create a row counter without ROW_NUMBER() (pre-MySQL 8.0 technique).',
    setup: 'SELECT from employees table',
    setupCode:
      "CREATE TABLE employees (id INT, name VARCHAR(50));\nINSERT INTO employees VALUES (1, 'Alice'), (2, 'Bob');",
    expected: 'row_num: 1, 2',
    sample: 'SET @row_num = 0;\nSELECT @row_num := @row_num + 1 AS row_num, name FROM employees;',
    hints: [
      ':= is the assignment operator in SELECT',
      'Variable is incremented for each row',
      'Pre-MySQL 8.0 technique for row numbering',
    ],
    validPatterns: [/@row_num\s*:=\s*@row_num\s*\+\s*1/i],
    tags: ['variables', 'row-number', 'legacy', 'mysql-specific'],
  },
  {
    id: 'mysql-var-003',
    category: 'User Variables',
    difficulty: 'hard',
    title: 'Capture Value in Variable',
    text: 'Capture the maximum salary into a variable and use it to find all employees with that salary.',
    setup: 'SELECT from employees table',
    setupCode: 'CREATE TABLE employees (id INT, name VARCHAR(50), salary DECIMAL(10,2));',
    expected: 'Employees with max salary',
    sample:
      'SELECT @max_salary := MAX(salary) FROM employees;\nSELECT name, salary FROM employees WHERE salary = @max_salary;',
    hints: [
      'First query captures the value',
      'Second query uses the variable',
      'Alternative to subquery approach',
    ],
    validPatterns: [/@max_salary\s*:=\s*MAX\s*\(\s*salary\s*\)/i],
    tags: ['variables', 'capture', 'mysql-specific'],
  },
  {
    id: 'mysql-var-004',
    category: 'User Variables',
    difficulty: 'medium',
    title: 'Variable in LIMIT',
    text: 'Set page size and page number variables for pagination.',
    setup: 'SELECT from products table',
    setupCode: 'CREATE TABLE products (id INT, name VARCHAR(50));',
    expected: 'Paginated results using variables',
    sample:
      "SET @page_size = 10;\nSET @page_num = 2;\nSET @offset = (@page_num - 1) * @page_size;\nPREPARE stmt FROM 'SELECT * FROM products LIMIT ?, ?';\nEXECUTE stmt USING @offset, @page_size;",
    hints: [
      'LIMIT does not accept variables directly',
      'Use PREPARE/EXECUTE for dynamic LIMIT',
      'Calculate offset from page number',
    ],
    validPatterns: [/PREPARE\s+\w+\s+FROM.*LIMIT\s*\?.*EXECUTE.*USING/is],
    tags: ['variables', 'pagination', 'prepared', 'mysql-specific'],
  },

  // ============================================================
  // GROUP_CONCAT (5 problems)
  // ============================================================
  {
    id: 'mysql-groupconcat-001',
    category: 'GROUP_CONCAT',
    difficulty: 'easy',
    title: 'Basic GROUP_CONCAT',
    text: 'Use GROUP_CONCAT to list all product names for each category.',
    setup: 'SELECT from products table',
    setupCode:
      "CREATE TABLE products (id INT, name VARCHAR(50), category VARCHAR(50));\nINSERT INTO products VALUES (1, 'Apple', 'Fruit'), (2, 'Banana', 'Fruit'), (3, 'Carrot', 'Vegetable');",
    expected: "Fruit: 'Apple,Banana', Vegetable: 'Carrot'",
    sample: 'SELECT category, GROUP_CONCAT(name) AS products FROM products GROUP BY category;',
    hints: [
      'GROUP_CONCAT aggregates string values',
      'Default separator is comma',
      'Must use with GROUP BY',
    ],
    validPatterns: [/GROUP_CONCAT\s*\(\s*name\s*\)/i],
    tags: ['group-concat', 'aggregate', 'mysql-specific'],
  },
  {
    id: 'mysql-groupconcat-002',
    category: 'GROUP_CONCAT',
    difficulty: 'medium',
    title: 'GROUP_CONCAT with Custom Separator',
    text: "Use GROUP_CONCAT with ' | ' as separator to list employee names by department.",
    setup: 'SELECT from employees table',
    setupCode: 'CREATE TABLE employees (id INT, name VARCHAR(50), department VARCHAR(50));',
    expected: "Engineering: 'Alice | Bob | Carol'",
    sample:
      "SELECT department, GROUP_CONCAT(name SEPARATOR ' | ') AS team FROM employees GROUP BY department;",
    hints: [
      "SEPARATOR 'custom' changes the delimiter",
      'Place SEPARATOR clause inside GROUP_CONCAT',
    ],
    validPatterns: [/GROUP_CONCAT\s*\(\s*name\s+SEPARATOR\s+['"] \| ['"]\s*\)/i],
    tags: ['group-concat', 'separator', 'mysql-specific'],
  },
  {
    id: 'mysql-groupconcat-003',
    category: 'GROUP_CONCAT',
    difficulty: 'medium',
    title: 'GROUP_CONCAT with ORDER BY',
    text: 'Use GROUP_CONCAT to list product names alphabetically within each category.',
    setup: 'SELECT from products table',
    setupCode: 'CREATE TABLE products (id INT, name VARCHAR(50), category VARCHAR(50));',
    expected: 'Names sorted alphabetically per category',
    sample:
      'SELECT category, GROUP_CONCAT(name ORDER BY name ASC) AS products FROM products GROUP BY category;',
    hints: ['ORDER BY goes inside GROUP_CONCAT', 'Controls order of concatenated values'],
    validPatterns: [/GROUP_CONCAT\s*\(\s*name\s+ORDER\s+BY\s+name(\s+ASC)?\s*\)/i],
    tags: ['group-concat', 'order', 'mysql-specific'],
  },
  {
    id: 'mysql-groupconcat-004',
    category: 'GROUP_CONCAT',
    difficulty: 'hard',
    title: 'GROUP_CONCAT with DISTINCT',
    text: 'Use GROUP_CONCAT with DISTINCT to list unique tags per article.',
    setup: 'SELECT from article_tags table',
    setupCode: 'CREATE TABLE article_tags (article_id INT, tag VARCHAR(50));',
    expected: 'Unique tags only, no duplicates',
    sample:
      'SELECT article_id, GROUP_CONCAT(DISTINCT tag ORDER BY tag) AS tags FROM article_tags GROUP BY article_id;',
    hints: ['DISTINCT removes duplicate values', 'Place DISTINCT after opening parenthesis'],
    validPatterns: [/GROUP_CONCAT\s*\(\s*DISTINCT\s+tag/i],
    tags: ['group-concat', 'distinct', 'mysql-specific'],
  },
  {
    id: 'mysql-groupconcat-005',
    category: 'GROUP_CONCAT',
    difficulty: 'hard',
    title: 'GROUP_CONCAT Complete Example',
    text: "Combine DISTINCT, ORDER BY, and custom SEPARATOR in GROUP_CONCAT to list unique product names by category, sorted, separated by ' - '.",
    setup: 'SELECT from products table',
    setupCode: 'CREATE TABLE products (id INT, name VARCHAR(50), category VARCHAR(50));',
    expected: 'Sorted unique names with custom separator',
    sample:
      "SELECT category, GROUP_CONCAT(DISTINCT name ORDER BY name SEPARATOR ' - ') AS products FROM products GROUP BY category;",
    hints: [
      'Order: DISTINCT, expression, ORDER BY, SEPARATOR',
      'All clauses go inside GROUP_CONCAT parentheses',
    ],
    validPatterns: [
      /GROUP_CONCAT\s*\(\s*DISTINCT\s+name\s+ORDER\s+BY\s+name(\s+ASC)?\s+SEPARATOR\s+['"]\s*-\s*['"]\s*\)/i,
    ],
    tags: ['group-concat', 'complete', 'mysql-specific'],
  },

  // ============================================================
  // INSERT ON DUPLICATE KEY UPDATE (4 problems)
  // ============================================================
  {
    id: 'mysql-upsert-001',
    category: 'INSERT ON DUPLICATE KEY',
    difficulty: 'medium',
    title: 'Basic Upsert',
    text: 'Use INSERT ON DUPLICATE KEY UPDATE to insert or update a user record. If email exists, update the name.',
    setup: 'INSERT into users table with unique email',
    setupCode:
      "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(100) UNIQUE, name VARCHAR(50));\nINSERT INTO users VALUES (1, 'john@example.com', 'John');",
    expected: 'Insert new or update existing',
    sample:
      "INSERT INTO users (email, name) VALUES ('john@example.com', 'John Doe') ON DUPLICATE KEY UPDATE name = VALUES(name);",
    hints: [
      'ON DUPLICATE KEY UPDATE runs on unique/primary key conflict',
      'VALUES(column) references the value from INSERT',
    ],
    validPatterns: [
      /INSERT\s+INTO\s+users.*ON\s+DUPLICATE\s+KEY\s+UPDATE\s+name\s*=\s*VALUES\s*\(\s*name\s*\)/i,
    ],
    tags: ['upsert', 'duplicate-key', 'mysql-specific'],
  },
  {
    id: 'mysql-upsert-002',
    category: 'INSERT ON DUPLICATE KEY',
    difficulty: 'medium',
    title: 'Increment Counter on Duplicate',
    text: 'Use INSERT ON DUPLICATE KEY UPDATE to increment a view_count when a page is visited again.',
    setup: 'INSERT into page_views table',
    setupCode:
      'CREATE TABLE page_views (page_url VARCHAR(200) PRIMARY KEY, view_count INT DEFAULT 1);',
    expected: 'Insert with count 1, or increment existing',
    sample:
      "INSERT INTO page_views (page_url, view_count) VALUES ('/home', 1) ON DUPLICATE KEY UPDATE view_count = view_count + 1;",
    hints: [
      'Reference the existing column value in UPDATE',
      'view_count + 1 adds to existing value',
    ],
    validPatterns: [/ON\s+DUPLICATE\s+KEY\s+UPDATE\s+view_count\s*=\s*view_count\s*\+\s*1/i],
    tags: ['upsert', 'counter', 'mysql-specific'],
  },
  {
    id: 'mysql-upsert-003',
    category: 'INSERT ON DUPLICATE KEY',
    difficulty: 'hard',
    title: 'Multiple Column Update',
    text: 'Use INSERT ON DUPLICATE KEY UPDATE to update multiple columns: last_login and login_count.',
    setup: 'INSERT into user_stats table',
    setupCode:
      'CREATE TABLE user_stats (user_id INT PRIMARY KEY, last_login DATETIME, login_count INT);',
    expected: 'Update both columns on conflict',
    sample:
      'INSERT INTO user_stats (user_id, last_login, login_count) VALUES (1, NOW(), 1) ON DUPLICATE KEY UPDATE last_login = NOW(), login_count = login_count + 1;',
    hints: ['Separate multiple column updates with commas', 'Can use NOW() for current timestamp'],
    validPatterns: [/ON\s+DUPLICATE\s+KEY\s+UPDATE\s+last_login\s*=.*,\s*login_count\s*=/i],
    tags: ['upsert', 'multiple-columns', 'mysql-specific'],
  },
  {
    id: 'mysql-upsert-004',
    category: 'INSERT ON DUPLICATE KEY',
    difficulty: 'hard',
    title: 'Conditional Update',
    text: 'Use INSERT ON DUPLICATE KEY UPDATE with IF to only update price if new price is lower.',
    setup: 'INSERT into products table',
    setupCode:
      'CREATE TABLE products (sku VARCHAR(20) PRIMARY KEY, name VARCHAR(100), price DECIMAL(10,2));',
    expected: 'Only update if new price is lower',
    sample:
      "INSERT INTO products (sku, name, price) VALUES ('ABC123', 'Widget', 19.99) ON DUPLICATE KEY UPDATE price = IF(VALUES(price) < price, VALUES(price), price);",
    hints: ['Use IF() to conditionally set the value', 'Compare VALUES(price) with existing price'],
    validPatterns: [
      /ON\s+DUPLICATE\s+KEY\s+UPDATE\s+price\s*=\s*IF\s*\(\s*VALUES\s*\(\s*price\s*\)\s*<\s*price/i,
    ],
    tags: ['upsert', 'conditional', 'mysql-specific'],
  },

  // ============================================================
  // INDEX HINTS (6 problems)
  // ============================================================
  {
    id: 'mysql-index-001',
    category: 'Index Hints',
    difficulty: 'medium',
    title: 'USE INDEX Hint',
    text: 'Use USE INDEX hint to suggest MySQL use the idx_status index for the query.',
    setup: 'SELECT from orders table with multiple indexes',
    setupCode:
      'CREATE TABLE orders (id INT PRIMARY KEY, status VARCHAR(20), order_date DATE, INDEX idx_status(status), INDEX idx_date(order_date));',
    expected: 'Query using idx_status index',
    sample: "SELECT * FROM orders USE INDEX (idx_status) WHERE status = 'pending';",
    hints: [
      'USE INDEX suggests which index to consider',
      'Goes after table name in FROM clause',
      'Optimizer may still choose differently',
    ],
    validPatterns: [/FROM\s+orders\s+USE\s+INDEX\s*\(\s*idx_status\s*\)/i],
    tags: ['index', 'hint', 'use-index', 'mysql-specific'],
  },
  {
    id: 'mysql-index-002',
    category: 'Index Hints',
    difficulty: 'medium',
    title: 'FORCE INDEX Hint',
    text: 'Use FORCE INDEX to force MySQL to use idx_customer_date index.',
    setup: 'SELECT from orders table',
    setupCode:
      'CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, order_date DATE, INDEX idx_customer_date(customer_id, order_date));',
    expected: 'Query forced to use specific index',
    sample: 'SELECT * FROM orders FORCE INDEX (idx_customer_date) WHERE customer_id = 100;',
    hints: [
      'FORCE INDEX is stronger than USE INDEX',
      'Forces optimizer to use index or do table scan',
      'Use when optimizer consistently picks wrong index',
    ],
    validPatterns: [/FROM\s+orders\s+FORCE\s+INDEX\s*\(\s*idx_customer_date\s*\)/i],
    tags: ['index', 'hint', 'force-index', 'mysql-specific'],
  },
  {
    id: 'mysql-index-003',
    category: 'Index Hints',
    difficulty: 'medium',
    title: 'IGNORE INDEX Hint',
    text: 'Use IGNORE INDEX to prevent MySQL from using the idx_status index.',
    setup: 'SELECT from orders table',
    setupCode:
      'CREATE TABLE orders (id INT PRIMARY KEY, status VARCHAR(20), amount DECIMAL(10,2), INDEX idx_status(status));',
    expected: 'Query avoiding idx_status index',
    sample:
      "SELECT * FROM orders IGNORE INDEX (idx_status) WHERE status = 'shipped' AND amount > 1000;",
    hints: [
      'IGNORE INDEX excludes index from consideration',
      'Useful when index hurts performance',
      'Can force table scan or other index use',
    ],
    validPatterns: [/FROM\s+orders\s+IGNORE\s+INDEX\s*\(\s*idx_status\s*\)/i],
    tags: ['index', 'hint', 'ignore-index', 'mysql-specific'],
  },
  {
    id: 'mysql-index-004',
    category: 'Index Hints',
    difficulty: 'hard',
    title: 'Multiple Index Hints',
    text: 'Use multiple indexes in a USE INDEX hint for a query with multiple conditions.',
    setup: 'SELECT from products table with multiple indexes',
    setupCode:
      'CREATE TABLE products (id INT PRIMARY KEY, category_id INT, price DECIMAL(10,2), INDEX idx_category(category_id), INDEX idx_price(price));',
    expected: 'Query suggesting multiple indexes',
    sample:
      'SELECT * FROM products USE INDEX (idx_category, idx_price) WHERE category_id = 5 AND price < 100;',
    hints: [
      'Separate multiple index names with commas',
      'Optimizer chooses among the listed indexes',
    ],
    validPatterns: [/USE\s+INDEX\s*\(\s*idx_category\s*,\s*idx_price\s*\)/i],
    tags: ['index', 'hint', 'multiple', 'mysql-specific'],
  },
  {
    id: 'mysql-index-005',
    category: 'Index Hints',
    difficulty: 'hard',
    title: 'Index Hint for JOIN',
    text: 'Use FORCE INDEX on a table in a JOIN to ensure the correct index is used.',
    setup: 'SELECT with JOIN between orders and customers',
    setupCode:
      'CREATE TABLE customers (id INT PRIMARY KEY, name VARCHAR(100));\nCREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, INDEX idx_customer(customer_id));',
    expected: 'Join using forced index',
    sample:
      'SELECT c.name, o.id FROM customers c JOIN orders o FORCE INDEX (idx_customer) ON c.id = o.customer_id;',
    hints: ['Place FORCE INDEX after table name/alias', 'Affects how JOIN is executed'],
    validPatterns: [/orders\s+\w*\s*FORCE\s+INDEX\s*\(\s*idx_customer\s*\)/i],
    tags: ['index', 'hint', 'join', 'mysql-specific'],
  },
  {
    id: 'mysql-index-006',
    category: 'Index Hints',
    difficulty: 'hard',
    title: 'Index Hint for ORDER BY',
    text: 'Use USE INDEX FOR ORDER BY to suggest an index for sorting.',
    setup: 'SELECT from products with ORDER BY',
    setupCode:
      'CREATE TABLE products (id INT PRIMARY KEY, name VARCHAR(100), created_at DATETIME, INDEX idx_created(created_at));',
    expected: 'Index used specifically for ORDER BY',
    sample:
      'SELECT * FROM products USE INDEX FOR ORDER BY (idx_created) WHERE name LIKE "A%" ORDER BY created_at;',
    hints: [
      'USE INDEX FOR ORDER BY specifies index for sorting',
      'Also available: FOR JOIN, FOR GROUP BY',
    ],
    validPatterns: [/USE\s+INDEX\s+FOR\s+ORDER\s+BY\s*\(\s*idx_created\s*\)/i],
    tags: ['index', 'hint', 'order-by', 'mysql-specific'],
  },
];
