import type { Problem } from '../types';

/**
 * PostgreSQL-specific problems for coding drills
 * Covers JSON/JSONB, Arrays, CTEs, Window Functions, Full-Text Search,
 * Upsert, RETURNING clause, LATERAL joins, Range Types, and Advanced Aggregations
 */

export const postgresqlProblems: Problem[] = [
  // ============================================================
  // JSON/JSONB OPERATIONS (10 problems)
  // ============================================================
  {
    id: 'pg-json-001',
    category: 'JSON/JSONB',
    difficulty: 'easy',
    title: 'Extract JSON Text Value',
    text: 'Extract the "name" field as text from the JSONB column "data" in the users table',
    setup: 'Table: users (id, data JSONB) where data contains {"name": "John", "age": 30}',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, data JSONB);
INSERT INTO users (data) VALUES ('{"name": "John", "age": 30}');`,
    expected: 'John',
    sample: "SELECT data->>'name' FROM users;",
    hints: [
      'Use ->> to extract a JSON field as text',
      'The -> operator returns JSON, while ->> returns text',
    ],
    validPatterns: [/data\s*->>\s*'name'/i, /data\s*->\s*'name'\s*::text/i],
    tags: ['jsonb', 'extract', 'text'],
  },
  {
    id: 'pg-json-002',
    category: 'JSON/JSONB',
    difficulty: 'easy',
    title: 'Extract Nested JSON Value',
    text: 'Extract the "city" from nested "address" object in the JSONB data column',
    setup:
      'Table: users (id, data JSONB) where data contains {"name": "John", "address": {"city": "NYC", "zip": "10001"}}',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, data JSONB);
INSERT INTO users (data) VALUES ('{"name": "John", "address": {"city": "NYC", "zip": "10001"}}');`,
    expected: 'NYC',
    sample: "SELECT data->'address'->>'city' FROM users;",
    hints: [
      'Chain -> operators to navigate nested objects',
      'Use -> for intermediate objects, ->> for the final text value',
    ],
    validPatterns: [
      /data\s*->\s*'address'\s*->>\s*'city'/i,
      /data\s*#>>\s*'\{address,city\}'/i,
      /data\s*#>>\s*ARRAY\['address',\s*'city'\]/i,
    ],
    tags: ['jsonb', 'nested', 'extract'],
  },
  {
    id: 'pg-json-003',
    category: 'JSON/JSONB',
    difficulty: 'medium',
    title: 'JSONB Containment Query',
    text: 'Find all users where the data column contains {"active": true}',
    setup: 'Table: users (id, data JSONB) with various user records containing an "active" field',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, data JSONB);
INSERT INTO users (data) VALUES
  ('{"name": "John", "active": true}'),
  ('{"name": "Jane", "active": false}'),
  ('{"name": "Bob", "active": true}');`,
    expected: [
      { id: 1, data: { name: 'John', active: true } },
      { id: 3, data: { name: 'Bob', active: true } },
    ],
    sample: 'SELECT * FROM users WHERE data @> \'{"active": true}\';',
    hints: [
      'Use the @> containment operator',
      '@> checks if the left JSONB contains the right JSONB',
    ],
    validPatterns: [
      /data\s*@>\s*'\{"active":\s*true\}'/i,
      /data\s*@>\s*'{"active":\s*true}'::jsonb/i,
      /\(data\s*->>\s*'active'\)\s*::boolean\s*=\s*true/i,
    ],
    tags: ['jsonb', 'containment', 'filter'],
  },
  {
    id: 'pg-json-004',
    category: 'JSON/JSONB',
    difficulty: 'medium',
    title: 'Expand JSONB Array',
    text: 'Extract each tag from a JSONB array column as separate rows',
    setup:
      'Table: posts (id, tags JSONB) where tags is an array like ["sql", "postgres", "database"]',
    setupCode: `CREATE TABLE posts (id SERIAL PRIMARY KEY, tags JSONB);
INSERT INTO posts (tags) VALUES ('["sql", "postgres", "database"]');`,
    expected: ['sql', 'postgres', 'database'],
    sample: 'SELECT jsonb_array_elements_text(tags) AS tag FROM posts;',
    hints: [
      'Use jsonb_array_elements_text() to expand a JSONB array into rows',
      'This returns each array element as a text value',
    ],
    validPatterns: [
      /jsonb_array_elements_text\s*\(\s*tags\s*\)/i,
      /jsonb_array_elements\s*\(\s*tags\s*\)/i,
    ],
    tags: ['jsonb', 'array', 'expand'],
  },
  {
    id: 'pg-json-005',
    category: 'JSON/JSONB',
    difficulty: 'medium',
    title: 'JSONB Key Existence Check',
    text: 'Find all records where the JSONB data column has a "premium" key',
    setup: 'Table: users (id, data JSONB) with various fields in the data column',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, data JSONB);
INSERT INTO users (data) VALUES
  ('{"name": "John", "premium": true}'),
  ('{"name": "Jane"}'),
  ('{"name": "Bob", "premium": false}');`,
    expected: [
      { id: 1, data: { name: 'John', premium: true } },
      { id: 3, data: { name: 'Bob', premium: false } },
    ],
    sample: "SELECT * FROM users WHERE data ? 'premium';",
    hints: [
      'Use the ? operator to check for key existence',
      'This operator returns true if the key exists in the JSONB object',
    ],
    validPatterns: [/data\s*\?\s*'premium'/i, /jsonb_exists\s*\(\s*data\s*,\s*'premium'\s*\)/i],
    tags: ['jsonb', 'key-existence', 'filter'],
  },
  {
    id: 'pg-json-006',
    category: 'JSON/JSONB',
    difficulty: 'medium',
    title: 'Update JSONB Field',
    text: 'Update the "status" field in the JSONB data column to "active" for user id 1',
    setup:
      'Table: users (id, data JSONB) where data contains {"name": "John", "status": "pending"}',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, data JSONB);
INSERT INTO users (data) VALUES ('{"name": "John", "status": "pending"}');`,
    expected: { name: 'John', status: 'active' },
    sample: "UPDATE users SET data = jsonb_set(data, '{status}', '\"active\"') WHERE id = 1;",
    hints: [
      'Use jsonb_set() to update a specific path in JSONB',
      'The path is specified as a text array',
      'The new value must be valid JSONB',
    ],
    validPatterns: [
      /jsonb_set\s*\(\s*data\s*,\s*'\{status\}'\s*,\s*'"active"'/i,
      /data\s*\|\|\s*'\{"status":\s*"active"\}'/i,
    ],
    tags: ['jsonb', 'update', 'jsonb_set'],
  },
  {
    id: 'pg-json-007',
    category: 'JSON/JSONB',
    difficulty: 'hard',
    title: 'JSONB Path Query',
    text: 'Use jsonb_path_query to find all prices greater than 100 from a products JSONB array',
    setup:
      'Table: orders (id, items JSONB) where items is [{"name": "A", "price": 50}, {"name": "B", "price": 150}]',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, items JSONB);
INSERT INTO orders (items) VALUES ('[{"name": "A", "price": 50}, {"name": "B", "price": 150}, {"name": "C", "price": 200}]');`,
    expected: [150, 200],
    sample: "SELECT jsonb_path_query(items, '$[*].price ? (@ > 100)') FROM orders;",
    hints: [
      'Use jsonb_path_query() with SQL/JSON path language',
      '$[*] selects all array elements',
      '? (@ > 100) filters values greater than 100',
    ],
    validPatterns: [
      /jsonb_path_query\s*\(\s*items\s*,\s*'\$\[\*\]\.price\s*\?\s*\(@\s*>\s*100\)'/i,
      /jsonb_path_query_array\s*\(\s*items\s*,\s*'\$\[\*\]\.price\s*\?\s*\(@\s*>\s*100\)'/i,
    ],
    tags: ['jsonb', 'path-query', 'filter', 'advanced'],
  },
  {
    id: 'pg-json-008',
    category: 'JSON/JSONB',
    difficulty: 'easy',
    title: 'Build JSON Object',
    text: 'Create a JSON object with keys "id" and "name" from table columns',
    setup: 'Table: employees (id INTEGER, name TEXT)',
    setupCode: `CREATE TABLE employees (id INTEGER, name TEXT);
INSERT INTO employees VALUES (1, 'Alice'), (2, 'Bob');`,
    expected: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ],
    sample: "SELECT jsonb_build_object('id', id, 'name', name) FROM employees;",
    hints: [
      'Use jsonb_build_object() to create JSONB from key-value pairs',
      'Arguments alternate between keys and values',
    ],
    validPatterns: [
      /jsonb_build_object\s*\(\s*'id'\s*,\s*id\s*,\s*'name'\s*,\s*name\s*\)/i,
      /json_build_object\s*\(\s*'id'\s*,\s*id\s*,\s*'name'\s*,\s*name\s*\)/i,
      /row_to_json\s*\(\s*employees\s*\)/i,
    ],
    tags: ['jsonb', 'build', 'construct'],
  },
  {
    id: 'pg-json-009',
    category: 'JSON/JSONB',
    difficulty: 'hard',
    title: 'Aggregate to JSONB Array',
    text: 'Aggregate all employee names into a single JSONB array',
    setup: 'Table: employees (id INTEGER, name TEXT, department TEXT)',
    setupCode: `CREATE TABLE employees (id INTEGER, name TEXT, department TEXT);
INSERT INTO employees VALUES (1, 'Alice', 'Engineering'), (2, 'Bob', 'Engineering'), (3, 'Carol', 'Sales');`,
    expected: ['Alice', 'Bob', 'Carol'],
    sample: 'SELECT jsonb_agg(name) FROM employees;',
    hints: [
      'Use jsonb_agg() to aggregate values into a JSONB array',
      'This is similar to array_agg but produces JSONB output',
    ],
    validPatterns: [/jsonb_agg\s*\(\s*name\s*\)/i, /json_agg\s*\(\s*name\s*\)/i],
    tags: ['jsonb', 'aggregate', 'array'],
  },
  {
    id: 'pg-json-010',
    category: 'JSON/JSONB',
    difficulty: 'hard',
    title: 'JSONB Object Aggregation by Group',
    text: 'Create a JSONB object mapping department names to arrays of employee names',
    setup: 'Table: employees (id INTEGER, name TEXT, department TEXT)',
    setupCode: `CREATE TABLE employees (id INTEGER, name TEXT, department TEXT);
INSERT INTO employees VALUES (1, 'Alice', 'Engineering'), (2, 'Bob', 'Engineering'), (3, 'Carol', 'Sales');`,
    expected: { Engineering: ['Alice', 'Bob'], Sales: ['Carol'] },
    sample:
      'SELECT jsonb_object_agg(department, names) FROM (SELECT department, jsonb_agg(name) as names FROM employees GROUP BY department) sub;',
    hints: [
      'Use jsonb_object_agg() to create a JSONB object from key-value pairs',
      'First aggregate names by department, then aggregate into a single object',
    ],
    validPatterns: [/jsonb_object_agg\s*\(/i, /json_object_agg\s*\(/i],
    tags: ['jsonb', 'aggregate', 'grouping', 'advanced'],
  },

  // ============================================================
  // ARRAY OPERATIONS (8 problems)
  // ============================================================
  {
    id: 'pg-array-001',
    category: 'Array Operations',
    difficulty: 'easy',
    title: 'Check Value in Array with ANY',
    text: 'Find all products where the category array contains "electronics"',
    setup: 'Table: products (id, name TEXT, categories TEXT[])',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, categories TEXT[]);
INSERT INTO products (name, categories) VALUES
  ('Laptop', ARRAY['electronics', 'computers']),
  ('Chair', ARRAY['furniture', 'office']),
  ('Phone', ARRAY['electronics', 'mobile']);`,
    expected: [
      { id: 1, name: 'Laptop' },
      { id: 3, name: 'Phone' },
    ],
    sample: "SELECT id, name FROM products WHERE 'electronics' = ANY(categories);",
    hints: [
      'Use ANY() to check if a value exists in an array',
      'The syntax is: value = ANY(array_column)',
    ],
    validPatterns: [
      /'electronics'\s*=\s*ANY\s*\(\s*categories\s*\)/i,
      /categories\s*@>\s*ARRAY\['electronics'\]/i,
      /'electronics'\s*=\s*ANY\s*\(\s*categories\s*\)/i,
    ],
    tags: ['array', 'any', 'filter'],
  },
  {
    id: 'pg-array-002',
    category: 'Array Operations',
    difficulty: 'easy',
    title: 'Array Contains All Values',
    text: 'Find products that have ALL of these categories: electronics AND mobile',
    setup: 'Table: products (id, name TEXT, categories TEXT[])',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, categories TEXT[]);
INSERT INTO products (name, categories) VALUES
  ('Laptop', ARRAY['electronics', 'computers']),
  ('Phone', ARRAY['electronics', 'mobile']),
  ('Tablet', ARRAY['electronics', 'mobile', 'portable']);`,
    expected: [
      { id: 2, name: 'Phone' },
      { id: 3, name: 'Tablet' },
    ],
    sample: "SELECT id, name FROM products WHERE categories @> ARRAY['electronics', 'mobile'];",
    hints: [
      'Use the @> operator to check if array contains all specified values',
      'ARRAY[...] creates a PostgreSQL array literal',
    ],
    validPatterns: [
      /categories\s*@>\s*ARRAY\['electronics'\s*,\s*'mobile'\]/i,
      /categories\s*@>\s*'\{electronics,mobile\}'/i,
    ],
    tags: ['array', 'containment', 'filter'],
  },
  {
    id: 'pg-array-003',
    category: 'Array Operations',
    difficulty: 'medium',
    title: 'Expand Array to Rows with UNNEST',
    text: 'Expand the tags array column into individual rows',
    setup: 'Table: posts (id, title TEXT, tags TEXT[])',
    setupCode: `CREATE TABLE posts (id SERIAL PRIMARY KEY, title TEXT, tags TEXT[]);
INSERT INTO posts (title, tags) VALUES ('PostgreSQL Tips', ARRAY['sql', 'database', 'postgres']);`,
    expected: [
      { id: 1, title: 'PostgreSQL Tips', tag: 'sql' },
      { id: 1, title: 'PostgreSQL Tips', tag: 'database' },
      { id: 1, title: 'PostgreSQL Tips', tag: 'postgres' },
    ],
    sample: 'SELECT id, title, unnest(tags) AS tag FROM posts;',
    hints: [
      'UNNEST() expands an array into a set of rows',
      'Each array element becomes a separate row',
    ],
    validPatterns: [/unnest\s*\(\s*tags\s*\)/i, /LATERAL\s+unnest\s*\(\s*tags\s*\)/i],
    tags: ['array', 'unnest', 'expand'],
  },
  {
    id: 'pg-array-004',
    category: 'Array Operations',
    difficulty: 'medium',
    title: 'Aggregate Values into Array',
    text: 'Group employees by department and aggregate their names into an array',
    setup: 'Table: employees (id, name TEXT, department TEXT)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT);
INSERT INTO employees (name, department) VALUES
  ('Alice', 'Engineering'), ('Bob', 'Engineering'), ('Carol', 'Sales');`,
    expected: [
      { department: 'Engineering', employees: ['Alice', 'Bob'] },
      { department: 'Sales', employees: ['Carol'] },
    ],
    sample: 'SELECT department, array_agg(name) AS employees FROM employees GROUP BY department;',
    hints: [
      'Use array_agg() to aggregate values into an array',
      'Combine with GROUP BY for grouping',
    ],
    validPatterns: [/array_agg\s*\(\s*name\s*\)/i, /array_agg\s*\(\s*name\s+ORDER\s+BY/i],
    tags: ['array', 'aggregate', 'grouping'],
  },
  {
    id: 'pg-array-005',
    category: 'Array Operations',
    difficulty: 'medium',
    title: 'Array Overlap Check',
    text: 'Find products where categories overlap with ["electronics", "furniture"]',
    setup: 'Table: products (id, name TEXT, categories TEXT[])',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, categories TEXT[]);
INSERT INTO products (name, categories) VALUES
  ('Laptop', ARRAY['electronics', 'computers']),
  ('Book', ARRAY['education', 'reading']),
  ('Desk', ARRAY['furniture', 'office']);`,
    expected: [
      { id: 1, name: 'Laptop' },
      { id: 3, name: 'Desk' },
    ],
    sample: "SELECT id, name FROM products WHERE categories && ARRAY['electronics', 'furniture'];",
    hints: ['Use the && overlap operator', 'Returns true if arrays have any elements in common'],
    validPatterns: [/categories\s*&&\s*ARRAY\['electronics'\s*,\s*'furniture'\]/i],
    tags: ['array', 'overlap', 'filter'],
  },
  {
    id: 'pg-array-006',
    category: 'Array Operations',
    difficulty: 'easy',
    title: 'Get Array Length',
    text: 'Get the number of tags for each post',
    setup: 'Table: posts (id, title TEXT, tags TEXT[])',
    setupCode: `CREATE TABLE posts (id SERIAL PRIMARY KEY, title TEXT, tags TEXT[]);
INSERT INTO posts (title, tags) VALUES
  ('Post 1', ARRAY['sql', 'database']),
  ('Post 2', ARRAY['web', 'api', 'rest']);`,
    expected: [
      { id: 1, title: 'Post 1', tag_count: 2 },
      { id: 2, title: 'Post 2', tag_count: 3 },
    ],
    sample: 'SELECT id, title, array_length(tags, 1) AS tag_count FROM posts;',
    hints: [
      'Use array_length(array, dimension) to get array size',
      'For 1-dimensional arrays, use 1 as the dimension',
    ],
    validPatterns: [/array_length\s*\(\s*tags\s*,\s*1\s*\)/i, /cardinality\s*\(\s*tags\s*\)/i],
    tags: ['array', 'length', 'function'],
  },
  {
    id: 'pg-array-007',
    category: 'Array Operations',
    difficulty: 'hard',
    title: 'Array Position and Slice',
    text: 'Get the first 2 categories from the categories array',
    setup: 'Table: products (id, name TEXT, categories TEXT[])',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, categories TEXT[]);
INSERT INTO products (name, categories) VALUES ('Laptop', ARRAY['electronics', 'computers', 'tech', 'gadgets']);`,
    expected: ['electronics', 'computers'],
    sample: 'SELECT categories[1:2] FROM products;',
    hints: ['Use array slice notation [start:end]', 'PostgreSQL arrays are 1-indexed by default'],
    validPatterns: [/categories\s*\[\s*1\s*:\s*2\s*\]/i, /categories\s*\[\s*:\s*2\s*\]/i],
    tags: ['array', 'slice', 'index'],
  },
  {
    id: 'pg-array-008',
    category: 'Array Operations',
    difficulty: 'hard',
    title: 'Concatenate Arrays',
    text: 'Concatenate the old_tags and new_tags arrays into a single array',
    setup: 'Table: posts (id, old_tags TEXT[], new_tags TEXT[])',
    setupCode: `CREATE TABLE posts (id SERIAL PRIMARY KEY, old_tags TEXT[], new_tags TEXT[]);
INSERT INTO posts (old_tags, new_tags) VALUES (ARRAY['sql', 'db'], ARRAY['postgres', 'advanced']);`,
    expected: ['sql', 'db', 'postgres', 'advanced'],
    sample: 'SELECT old_tags || new_tags AS all_tags FROM posts;',
    hints: [
      'Use the || operator to concatenate arrays',
      'This works similarly to string concatenation',
    ],
    validPatterns: [
      /old_tags\s*\|\|\s*new_tags/i,
      /array_cat\s*\(\s*old_tags\s*,\s*new_tags\s*\)/i,
    ],
    tags: ['array', 'concatenate', 'combine'],
  },

  // ============================================================
  // CTEs - Common Table Expressions (7 problems)
  // ============================================================
  {
    id: 'pg-cte-001',
    category: 'CTEs',
    difficulty: 'easy',
    title: 'Basic CTE',
    text: 'Use a CTE to find employees with salary above the average salary',
    setup: 'Table: employees (id, name TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, salary NUMERIC);
INSERT INTO employees (name, salary) VALUES
  ('Alice', 50000), ('Bob', 75000), ('Carol', 60000), ('Dave', 90000);`,
    expected: [
      { name: 'Bob', salary: 75000 },
      { name: 'Dave', salary: 90000 },
    ],
    sample: `WITH avg_sal AS (
  SELECT AVG(salary) AS avg_salary FROM employees
)
SELECT name, salary FROM employees, avg_sal WHERE salary > avg_salary;`,
    hints: ['Use WITH clause to define a CTE', 'The CTE can be referenced in the main query'],
    validPatterns: [/WITH\s+\w+\s+AS\s*\(/i, /WITH\s+.*\s+SELECT\s+AVG\s*\(\s*salary\s*\)/i],
    tags: ['cte', 'with', 'subquery'],
  },
  {
    id: 'pg-cte-002',
    category: 'CTEs',
    difficulty: 'medium',
    title: 'Multiple CTEs',
    text: 'Use multiple CTEs to find departments where average salary exceeds company average',
    setup: 'Table: employees (id, name TEXT, department TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT, salary NUMERIC);
INSERT INTO employees (name, department, salary) VALUES
  ('Alice', 'Engineering', 80000), ('Bob', 'Engineering', 90000),
  ('Carol', 'Sales', 50000), ('Dave', 'Sales', 55000);`,
    expected: [{ department: 'Engineering', dept_avg: 85000 }],
    sample: `WITH company_avg AS (
  SELECT AVG(salary) AS avg_salary FROM employees
),
dept_avg AS (
  SELECT department, AVG(salary) AS dept_salary FROM employees GROUP BY department
)
SELECT department, dept_salary AS dept_avg
FROM dept_avg, company_avg
WHERE dept_salary > avg_salary;`,
    hints: [
      'Define multiple CTEs separated by commas',
      'Each CTE can reference previously defined CTEs',
    ],
    validPatterns: [/WITH\s+\w+\s+AS\s*\([^)]+\)\s*,\s*\w+\s+AS\s*\(/i],
    tags: ['cte', 'multiple', 'aggregate'],
  },
  {
    id: 'pg-cte-003',
    category: 'CTEs',
    difficulty: 'hard',
    title: 'Recursive CTE - Number Series',
    text: 'Generate numbers 1 through 10 using a recursive CTE',
    setup: 'No table needed - pure recursive generation',
    setupCode: '-- No setup needed',
    expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    sample: `WITH RECURSIVE nums AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM nums WHERE n < 10
)
SELECT n FROM nums;`,
    hints: [
      'Use WITH RECURSIVE for recursive CTEs',
      'Start with a base case, then define the recursive step',
      'UNION ALL combines the base case with recursive results',
    ],
    validPatterns: [/WITH\s+RECURSIVE\s+\w+\s+AS\s*\(/i, /UNION\s+ALL\s+SELECT\s+.*\+\s*1/i],
    tags: ['cte', 'recursive', 'generate-series'],
  },
  {
    id: 'pg-cte-004',
    category: 'CTEs',
    difficulty: 'hard',
    title: 'Recursive CTE - Hierarchy Traversal',
    text: 'Find all employees in the management chain starting from CEO (manager_id IS NULL)',
    setup: 'Table: employees (id, name TEXT, manager_id INTEGER)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, manager_id INTEGER);
INSERT INTO employees (name, manager_id) VALUES
  ('CEO', NULL), ('VP', 1), ('Director', 2), ('Manager', 3), ('Employee', 4);`,
    expected: [
      { id: 1, name: 'CEO', level: 0 },
      { id: 2, name: 'VP', level: 1 },
      { id: 3, name: 'Director', level: 2 },
      { id: 4, name: 'Manager', level: 3 },
      { id: 5, name: 'Employee', level: 4 },
    ],
    sample: `WITH RECURSIVE org_chart AS (
  SELECT id, name, 0 AS level FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, oc.level + 1
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart;`,
    hints: [
      'Start from the root (CEO where manager_id IS NULL)',
      'Recursively join employees to their managers',
      'Track the level/depth in the hierarchy',
    ],
    validPatterns: [
      /WITH\s+RECURSIVE\s+\w+\s+AS\s*\([^)]*manager_id\s+IS\s+NULL/i,
      /UNION\s+ALL\s+SELECT.*JOIN\s+\w+/i,
    ],
    tags: ['cte', 'recursive', 'hierarchy', 'tree'],
  },
  {
    id: 'pg-cte-005',
    category: 'CTEs',
    difficulty: 'medium',
    title: 'CTE with UPDATE',
    text: 'Use a CTE to update and return the old values of updated rows',
    setup: 'Table: products (id, name TEXT, price NUMERIC, updated_at TIMESTAMP)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, price NUMERIC, updated_at TIMESTAMP);
INSERT INTO products (name, price) VALUES ('Widget', 10.00), ('Gadget', 20.00);`,
    expected: [
      { id: 1, old_price: 10.0, new_price: 11.0 },
      { id: 2, old_price: 20.0, new_price: 22.0 },
    ],
    sample: `WITH updated AS (
  UPDATE products
  SET price = price * 1.10, updated_at = NOW()
  RETURNING id, price AS new_price
)
SELECT p.id, p.price AS old_price, u.new_price
FROM products p JOIN updated u ON p.id = u.id;`,
    hints: [
      'CTEs can contain data-modifying statements (INSERT, UPDATE, DELETE)',
      'Use RETURNING to capture the modified rows',
    ],
    validPatterns: [/WITH\s+\w+\s+AS\s*\(\s*UPDATE/i, /UPDATE.*RETURNING/i],
    tags: ['cte', 'update', 'returning'],
  },
  {
    id: 'pg-cte-006',
    category: 'CTEs',
    difficulty: 'hard',
    title: 'Recursive CTE - Path Building',
    text: 'Build the full path from root to each category in a category tree',
    setup: 'Table: categories (id, name TEXT, parent_id INTEGER)',
    setupCode: `CREATE TABLE categories (id SERIAL PRIMARY KEY, name TEXT, parent_id INTEGER);
INSERT INTO categories (name, parent_id) VALUES
  ('Electronics', NULL), ('Computers', 1), ('Laptops', 2), ('Gaming Laptops', 3);`,
    expected: [
      { id: 1, path: 'Electronics' },
      { id: 2, path: 'Electronics > Computers' },
      { id: 3, path: 'Electronics > Computers > Laptops' },
      { id: 4, path: 'Electronics > Computers > Laptops > Gaming Laptops' },
    ],
    sample: `WITH RECURSIVE cat_path AS (
  SELECT id, name, name AS path FROM categories WHERE parent_id IS NULL
  UNION ALL
  SELECT c.id, c.name, cp.path || ' > ' || c.name
  FROM categories c
  JOIN cat_path cp ON c.parent_id = cp.id
)
SELECT id, path FROM cat_path;`,
    hints: [
      'Use string concatenation to build the path',
      'Start from root categories (parent_id IS NULL)',
      'Accumulate the path in each recursive step',
    ],
    validPatterns: [/WITH\s+RECURSIVE.*\|\|.*\|\|/i, /path\s*\|\|\s*'.*'\s*\|\|\s*\w+\.name/i],
    tags: ['cte', 'recursive', 'path', 'tree'],
  },
  {
    id: 'pg-cte-007',
    category: 'CTEs',
    difficulty: 'hard',
    title: 'Recursive CTE - Graph Cycle Detection',
    text: 'Detect cycles in a directed graph represented as edges',
    setup: 'Table: edges (from_node INTEGER, to_node INTEGER)',
    setupCode: `CREATE TABLE edges (from_node INTEGER, to_node INTEGER);
INSERT INTO edges VALUES (1, 2), (2, 3), (3, 4), (4, 2);  -- cycle: 2->3->4->2`,
    expected: [{ has_cycle: true }],
    sample: `WITH RECURSIVE paths AS (
  SELECT from_node, to_node, ARRAY[from_node] AS path, false AS has_cycle
  FROM edges
  UNION ALL
  SELECT p.from_node, e.to_node, p.path || e.from_node,
         e.to_node = ANY(p.path)
  FROM paths p
  JOIN edges e ON p.to_node = e.from_node
  WHERE NOT p.has_cycle AND NOT e.from_node = ANY(p.path)
)
SELECT EXISTS(SELECT 1 FROM paths WHERE has_cycle) AS has_cycle;`,
    hints: [
      'Track visited nodes in an array',
      'Check if next node is already in the path (cycle)',
      'Use ANY() to check array membership',
    ],
    validPatterns: [/WITH\s+RECURSIVE.*ARRAY\[/i, /=\s*ANY\s*\(\s*\w+\.path\s*\)/i],
    tags: ['cte', 'recursive', 'graph', 'cycle-detection', 'advanced'],
  },

  // ============================================================
  // WINDOW FUNCTIONS (8 problems)
  // ============================================================
  {
    id: 'pg-window-001',
    category: 'Window Functions',
    difficulty: 'easy',
    title: 'Row Number Within Partition',
    text: 'Assign row numbers to employees within each department ordered by salary descending',
    setup: 'Table: employees (id, name TEXT, department TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT, salary NUMERIC);
INSERT INTO employees (name, department, salary) VALUES
  ('Alice', 'Engineering', 80000), ('Bob', 'Engineering', 90000),
  ('Carol', 'Sales', 50000), ('Dave', 'Sales', 55000);`,
    expected: [
      { name: 'Bob', department: 'Engineering', salary: 90000, rank: 1 },
      { name: 'Alice', department: 'Engineering', salary: 80000, rank: 2 },
      { name: 'Dave', department: 'Sales', salary: 55000, rank: 1 },
      { name: 'Carol', department: 'Sales', salary: 50000, rank: 2 },
    ],
    sample:
      'SELECT name, department, salary, ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rank FROM employees;',
    hints: [
      'Use ROW_NUMBER() with OVER clause',
      'PARTITION BY divides rows into groups',
      'ORDER BY within OVER determines row numbering order',
    ],
    validPatterns: [
      /ROW_NUMBER\s*\(\s*\)\s*OVER\s*\(\s*PARTITION\s+BY\s+department\s+ORDER\s+BY\s+salary\s+DESC\s*\)/i,
    ],
    tags: ['window', 'row_number', 'partition'],
  },
  {
    id: 'pg-window-002',
    category: 'Window Functions',
    difficulty: 'medium',
    title: 'Running Total',
    text: 'Calculate a running total of sales amount ordered by date',
    setup: 'Table: sales (id, sale_date DATE, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, sale_date DATE, amount NUMERIC);
INSERT INTO sales (sale_date, amount) VALUES
  ('2024-01-01', 100), ('2024-01-02', 150), ('2024-01-03', 200), ('2024-01-04', 50);`,
    expected: [
      { sale_date: '2024-01-01', amount: 100, running_total: 100 },
      { sale_date: '2024-01-02', amount: 150, running_total: 250 },
      { sale_date: '2024-01-03', amount: 200, running_total: 450 },
      { sale_date: '2024-01-04', amount: 50, running_total: 500 },
    ],
    sample:
      'SELECT sale_date, amount, SUM(amount) OVER (ORDER BY sale_date) AS running_total FROM sales;',
    hints: [
      'Use SUM() as a window function with OVER',
      'ORDER BY in the OVER clause creates cumulative behavior',
    ],
    validPatterns: [/SUM\s*\(\s*amount\s*\)\s*OVER\s*\(\s*ORDER\s+BY\s+sale_date\s*\)/i],
    tags: ['window', 'running-total', 'sum'],
  },
  {
    id: 'pg-window-003',
    category: 'Window Functions',
    difficulty: 'medium',
    title: 'LEAD and LAG Functions',
    text: 'Show each sale with the previous and next sale amounts',
    setup: 'Table: sales (id, sale_date DATE, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, sale_date DATE, amount NUMERIC);
INSERT INTO sales (sale_date, amount) VALUES
  ('2024-01-01', 100), ('2024-01-02', 150), ('2024-01-03', 200);`,
    expected: [
      { sale_date: '2024-01-01', amount: 100, prev_amount: null, next_amount: 150 },
      { sale_date: '2024-01-02', amount: 150, prev_amount: 100, next_amount: 200 },
      { sale_date: '2024-01-03', amount: 200, prev_amount: 150, next_amount: null },
    ],
    sample: `SELECT sale_date, amount,
  LAG(amount) OVER (ORDER BY sale_date) AS prev_amount,
  LEAD(amount) OVER (ORDER BY sale_date) AS next_amount
FROM sales;`,
    hints: [
      'LAG() gets the value from the previous row',
      'LEAD() gets the value from the next row',
      'Both require ORDER BY in the OVER clause',
    ],
    validPatterns: [
      /LAG\s*\(\s*amount\s*\)\s*OVER\s*\(\s*ORDER\s+BY/i,
      /LEAD\s*\(\s*amount\s*\)\s*OVER\s*\(\s*ORDER\s+BY/i,
    ],
    tags: ['window', 'lag', 'lead', 'offset'],
  },
  {
    id: 'pg-window-004',
    category: 'Window Functions',
    difficulty: 'medium',
    title: 'Percent Rank and NTILE',
    text: 'Calculate percent rank and quartile for each employee salary',
    setup: 'Table: employees (id, name TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, salary NUMERIC);
INSERT INTO employees (name, salary) VALUES
  ('A', 40000), ('B', 50000), ('C', 60000), ('D', 70000), ('E', 80000);`,
    expected: [
      { name: 'A', salary: 40000, pct_rank: 0.0, quartile: 1 },
      { name: 'B', salary: 50000, pct_rank: 0.25, quartile: 1 },
      { name: 'C', salary: 60000, pct_rank: 0.5, quartile: 2 },
      { name: 'D', salary: 70000, pct_rank: 0.75, quartile: 3 },
      { name: 'E', salary: 80000, pct_rank: 1.0, quartile: 4 },
    ],
    sample: `SELECT name, salary,
  PERCENT_RANK() OVER (ORDER BY salary) AS pct_rank,
  NTILE(4) OVER (ORDER BY salary) AS quartile
FROM employees;`,
    hints: [
      'PERCENT_RANK() returns relative rank as 0-1 value',
      'NTILE(n) divides rows into n equal groups',
    ],
    validPatterns: [
      /PERCENT_RANK\s*\(\s*\)\s*OVER\s*\(\s*ORDER\s+BY/i,
      /NTILE\s*\(\s*4\s*\)\s*OVER\s*\(\s*ORDER\s+BY/i,
    ],
    tags: ['window', 'percent_rank', 'ntile', 'quartile'],
  },
  {
    id: 'pg-window-005',
    category: 'Window Functions',
    difficulty: 'hard',
    title: 'Frame Specification - Moving Average',
    text: 'Calculate a 3-day moving average of sales (current day and 2 preceding)',
    setup: 'Table: sales (id, sale_date DATE, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, sale_date DATE, amount NUMERIC);
INSERT INTO sales (sale_date, amount) VALUES
  ('2024-01-01', 100), ('2024-01-02', 200), ('2024-01-03', 150),
  ('2024-01-04', 300), ('2024-01-05', 250);`,
    expected: [
      { sale_date: '2024-01-01', amount: 100, moving_avg: 100 },
      { sale_date: '2024-01-02', amount: 200, moving_avg: 150 },
      { sale_date: '2024-01-03', amount: 150, moving_avg: 150 },
      { sale_date: '2024-01-04', amount: 300, moving_avg: 216.67 },
      { sale_date: '2024-01-05', amount: 250, moving_avg: 233.33 },
    ],
    sample: `SELECT sale_date, amount,
  AVG(amount) OVER (ORDER BY sale_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg
FROM sales;`,
    hints: [
      'Use ROWS BETWEEN to specify the frame',
      '2 PRECEDING means 2 rows before the current row',
      'CURRENT ROW is the ending boundary',
    ],
    validPatterns: [
      /AVG\s*\(\s*amount\s*\)\s*OVER\s*\([^)]*ROWS\s+BETWEEN\s+2\s+PRECEDING\s+AND\s+CURRENT\s+ROW/i,
    ],
    tags: ['window', 'frame', 'moving-average', 'rows-between'],
  },
  {
    id: 'pg-window-006',
    category: 'Window Functions',
    difficulty: 'hard',
    title: 'FIRST_VALUE and LAST_VALUE',
    text: 'Show the highest and lowest salary within each department alongside each employee',
    setup: 'Table: employees (id, name TEXT, department TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT, salary NUMERIC);
INSERT INTO employees (name, department, salary) VALUES
  ('Alice', 'Engineering', 80000), ('Bob', 'Engineering', 90000), ('Carol', 'Engineering', 70000),
  ('Dave', 'Sales', 50000), ('Eve', 'Sales', 60000);`,
    expected: [
      { name: 'Carol', department: 'Engineering', salary: 70000, highest: 90000, lowest: 70000 },
      { name: 'Alice', department: 'Engineering', salary: 80000, highest: 90000, lowest: 70000 },
      { name: 'Bob', department: 'Engineering', salary: 90000, highest: 90000, lowest: 70000 },
    ],
    sample: `SELECT name, department, salary,
  FIRST_VALUE(salary) OVER w AS highest,
  LAST_VALUE(salary) OVER w AS lowest
FROM employees
WINDOW w AS (PARTITION BY department ORDER BY salary DESC
             ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING);`,
    hints: [
      'FIRST_VALUE gets the first value in the window frame',
      'LAST_VALUE needs a frame extending to UNBOUNDED FOLLOWING',
      'Use named window definition with WINDOW clause for reuse',
    ],
    validPatterns: [
      /FIRST_VALUE\s*\(\s*salary\s*\)\s*OVER/i,
      /LAST_VALUE\s*\(\s*salary\s*\)\s*OVER/i,
      /UNBOUNDED\s+FOLLOWING/i,
    ],
    tags: ['window', 'first_value', 'last_value', 'frame'],
  },
  {
    id: 'pg-window-007',
    category: 'Window Functions',
    difficulty: 'medium',
    title: 'DENSE_RANK vs RANK',
    text: 'Show both RANK and DENSE_RANK for employees by salary (with ties)',
    setup: 'Table: employees (id, name TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, salary NUMERIC);
INSERT INTO employees (name, salary) VALUES
  ('A', 50000), ('B', 60000), ('C', 60000), ('D', 70000);`,
    expected: [
      { name: 'D', salary: 70000, rank: 1, dense_rank: 1 },
      { name: 'B', salary: 60000, rank: 2, dense_rank: 2 },
      { name: 'C', salary: 60000, rank: 2, dense_rank: 2 },
      { name: 'A', salary: 50000, rank: 4, dense_rank: 3 },
    ],
    sample: `SELECT name, salary,
  RANK() OVER (ORDER BY salary DESC) AS rank,
  DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;`,
    hints: ['RANK() leaves gaps after ties (1,2,2,4)', 'DENSE_RANK() has no gaps (1,2,2,3)'],
    validPatterns: [
      /RANK\s*\(\s*\)\s*OVER\s*\(\s*ORDER\s+BY/i,
      /DENSE_RANK\s*\(\s*\)\s*OVER\s*\(\s*ORDER\s+BY/i,
    ],
    tags: ['window', 'rank', 'dense_rank', 'ties'],
  },
  {
    id: 'pg-window-008',
    category: 'Window Functions',
    difficulty: 'hard',
    title: 'Window Function with FILTER',
    text: 'Calculate both total sum and sum of only positive values in a window',
    setup: 'Table: transactions (id, amount NUMERIC)',
    setupCode: `CREATE TABLE transactions (id SERIAL PRIMARY KEY, amount NUMERIC);
INSERT INTO transactions (amount) VALUES (100), (-50), (200), (-30), (150);`,
    expected: [
      { id: 1, amount: 100, total: 100, positive_total: 100 },
      { id: 2, amount: -50, total: 50, positive_total: 100 },
      { id: 3, amount: 200, total: 250, positive_total: 300 },
    ],
    sample: `SELECT id, amount,
  SUM(amount) OVER (ORDER BY id) AS total,
  SUM(amount) FILTER (WHERE amount > 0) OVER (ORDER BY id) AS positive_total
FROM transactions;`,
    hints: [
      'FILTER clause can be used with window functions',
      'It filters which rows contribute to the aggregate',
    ],
    validPatterns: [/SUM\s*\(\s*amount\s*\)\s*FILTER\s*\(\s*WHERE\s+amount\s*>\s*0\s*\)\s*OVER/i],
    tags: ['window', 'filter', 'conditional-aggregate'],
  },

  // ============================================================
  // FULL-TEXT SEARCH (6 problems)
  // ============================================================
  {
    id: 'pg-fts-001',
    category: 'Full-Text Search',
    difficulty: 'easy',
    title: 'Basic Text Search',
    text: 'Find all articles containing the word "database"',
    setup: 'Table: articles (id, title TEXT, content TEXT)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, title TEXT, content TEXT);
INSERT INTO articles (title, content) VALUES
  ('PostgreSQL Guide', 'PostgreSQL is a powerful database system'),
  ('Web Development', 'Building modern web applications'),
  ('Database Design', 'Learn database normalization techniques');`,
    expected: [
      { id: 1, title: 'PostgreSQL Guide' },
      { id: 3, title: 'Database Design' },
    ],
    sample: "SELECT id, title FROM articles WHERE to_tsvector(content) @@ to_tsquery('database');",
    hints: [
      'to_tsvector() converts text to a searchable vector',
      'to_tsquery() creates a search query',
      '@@ is the text search match operator',
    ],
    validPatterns: [
      /to_tsvector\s*\(\s*content\s*\)\s*@@\s*to_tsquery\s*\(\s*'database'\s*\)/i,
      /to_tsvector\s*\(\s*'english'\s*,\s*content\s*\)\s*@@/i,
    ],
    tags: ['full-text', 'tsvector', 'tsquery', 'search'],
  },
  {
    id: 'pg-fts-002',
    category: 'Full-Text Search',
    difficulty: 'medium',
    title: 'Multiple Word Search with AND',
    text: 'Find articles containing both "postgresql" AND "database"',
    setup: 'Table: articles (id, title TEXT, content TEXT)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, title TEXT, content TEXT);
INSERT INTO articles (title, content) VALUES
  ('PostgreSQL Guide', 'PostgreSQL is a powerful database system'),
  ('MySQL Tutorial', 'MySQL is another database system'),
  ('PostgreSQL Basics', 'Learn PostgreSQL fundamentals');`,
    expected: [{ id: 1, title: 'PostgreSQL Guide' }],
    sample:
      "SELECT id, title FROM articles WHERE to_tsvector(content) @@ to_tsquery('postgresql & database');",
    hints: ['Use & for AND in tsquery', 'Both terms must be present for a match'],
    validPatterns: [
      /to_tsquery\s*\(\s*'postgresql\s*&\s*database'\s*\)/i,
      /plainto_tsquery.*postgresql.*database/i,
    ],
    tags: ['full-text', 'tsquery', 'boolean-search'],
  },
  {
    id: 'pg-fts-003',
    category: 'Full-Text Search',
    difficulty: 'medium',
    title: 'Search with OR and NOT',
    text: 'Find articles about "postgresql" OR "mysql" but NOT "deprecated"',
    setup: 'Table: articles (id, title TEXT, content TEXT)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, title TEXT, content TEXT);
INSERT INTO articles (title, content) VALUES
  ('PostgreSQL Guide', 'PostgreSQL is modern and powerful'),
  ('MySQL Legacy', 'MySQL deprecated features list'),
  ('MySQL Modern', 'MySQL 8 new features');`,
    expected: [
      { id: 1, title: 'PostgreSQL Guide' },
      { id: 3, title: 'MySQL Modern' },
    ],
    sample:
      "SELECT id, title FROM articles WHERE to_tsvector(content) @@ to_tsquery('(postgresql | mysql) & !deprecated');",
    hints: ['Use | for OR in tsquery', 'Use ! for NOT in tsquery', 'Parentheses group conditions'],
    validPatterns: [/to_tsquery\s*\(\s*'\(postgresql\s*\|\s*mysql\)\s*&\s*!deprecated'\s*\)/i],
    tags: ['full-text', 'tsquery', 'boolean-operators'],
  },
  {
    id: 'pg-fts-004',
    category: 'Full-Text Search',
    difficulty: 'medium',
    title: 'Search with Ranking',
    text: 'Search for "database" and order results by relevance using ts_rank',
    setup: 'Table: articles (id, title TEXT, content TEXT)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, title TEXT, content TEXT);
INSERT INTO articles (title, content) VALUES
  ('Database Tips', 'Database database database optimization'),
  ('Web Dev', 'Using a database in web apps'),
  ('Database Design', 'Database normalization and database indexing');`,
    expected: [
      { id: 1, title: 'Database Tips', rank: 0.09 },
      { id: 3, title: 'Database Design', rank: 0.06 },
      { id: 2, title: 'Web Dev', rank: 0.03 },
    ],
    sample: `SELECT id, title, ts_rank(to_tsvector(content), to_tsquery('database')) AS rank
FROM articles
WHERE to_tsvector(content) @@ to_tsquery('database')
ORDER BY rank DESC;`,
    hints: [
      'ts_rank() calculates relevance score',
      'Higher rank means more relevant',
      'Order by rank DESC for best matches first',
    ],
    validPatterns: [
      /ts_rank\s*\(\s*to_tsvector\s*\(\s*content\s*\)\s*,\s*to_tsquery/i,
      /ORDER\s+BY\s+rank\s+DESC/i,
    ],
    tags: ['full-text', 'ts_rank', 'relevance', 'ranking'],
  },
  {
    id: 'pg-fts-005',
    category: 'Full-Text Search',
    difficulty: 'hard',
    title: 'Phrase Search with Distance',
    text: 'Find articles where "postgresql" is within 2 words of "performance"',
    setup: 'Table: articles (id, title TEXT, content TEXT)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, title TEXT, content TEXT);
INSERT INTO articles (title, content) VALUES
  ('PG Perf', 'PostgreSQL offers great performance tuning'),
  ('PG Guide', 'PostgreSQL is a database with good performance'),
  ('PG Intro', 'Learn PostgreSQL basics today');`,
    expected: [{ id: 1, title: 'PG Perf' }],
    sample:
      "SELECT id, title FROM articles WHERE to_tsvector(content) @@ to_tsquery('postgresql <2> performance');",
    hints: [
      'Use <N> for proximity search (within N words)',
      '<-> means immediately adjacent',
      '<2> means within 2 words',
    ],
    validPatterns: [/to_tsquery\s*\(\s*'postgresql\s*<\d+>\s*performance'\s*\)/i],
    tags: ['full-text', 'phrase-search', 'proximity'],
  },
  {
    id: 'pg-fts-006',
    category: 'Full-Text Search',
    difficulty: 'hard',
    title: 'Headline Generation',
    text: 'Generate search result headlines with matched terms highlighted',
    setup: 'Table: articles (id, title TEXT, content TEXT)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, title TEXT, content TEXT);
INSERT INTO articles (title, content) VALUES
  ('DB Guide', 'PostgreSQL is a powerful relational database management system');`,
    expected: [
      {
        title: 'DB Guide',
        headline: 'PostgreSQL is a powerful relational <b>database</b> management system',
      },
    ],
    sample: `SELECT title, ts_headline(content, to_tsquery('database')) AS headline
FROM articles
WHERE to_tsvector(content) @@ to_tsquery('database');`,
    hints: [
      'ts_headline() highlights matching terms',
      'By default uses <b> tags for highlighting',
      'Options can customize the highlight markers',
    ],
    validPatterns: [
      /ts_headline\s*\(\s*content\s*,\s*to_tsquery\s*\(\s*'database'\s*\)\s*\)/i,
      /ts_headline\s*\(\s*'english'\s*,\s*content/i,
    ],
    tags: ['full-text', 'ts_headline', 'highlight'],
  },

  // ============================================================
  // UPSERT OPERATIONS (5 problems)
  // ============================================================
  {
    id: 'pg-upsert-001',
    category: 'Upsert',
    difficulty: 'easy',
    title: 'Basic ON CONFLICT DO NOTHING',
    text: 'Insert a new user, but do nothing if the email already exists',
    setup: 'Table: users (id SERIAL, email TEXT UNIQUE, name TEXT)',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT UNIQUE, name TEXT);
INSERT INTO users (email, name) VALUES ('john@example.com', 'John');`,
    expected: 'INSERT 0 0',
    sample:
      "INSERT INTO users (email, name) VALUES ('john@example.com', 'John Doe') ON CONFLICT (email) DO NOTHING;",
    hints: [
      'ON CONFLICT specifies the unique constraint',
      'DO NOTHING skips the insert if conflict occurs',
    ],
    validPatterns: [/INSERT\s+INTO\s+users.*ON\s+CONFLICT\s*\(\s*email\s*\)\s*DO\s+NOTHING/i],
    tags: ['upsert', 'on-conflict', 'do-nothing'],
  },
  {
    id: 'pg-upsert-002',
    category: 'Upsert',
    difficulty: 'medium',
    title: 'ON CONFLICT DO UPDATE',
    text: 'Insert or update user: if email exists, update the name',
    setup: 'Table: users (id SERIAL, email TEXT UNIQUE, name TEXT, updated_at TIMESTAMP)',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT UNIQUE, name TEXT, updated_at TIMESTAMP);
INSERT INTO users (email, name) VALUES ('john@example.com', 'John');`,
    expected: { email: 'john@example.com', name: 'John Updated' },
    sample: `INSERT INTO users (email, name, updated_at)
VALUES ('john@example.com', 'John Updated', NOW())
ON CONFLICT (email)
DO UPDATE SET name = EXCLUDED.name, updated_at = EXCLUDED.updated_at;`,
    hints: [
      'EXCLUDED refers to the row that would have been inserted',
      'DO UPDATE SET specifies which columns to update',
    ],
    validPatterns: [
      /ON\s+CONFLICT\s*\(\s*email\s*\)\s*DO\s+UPDATE\s+SET\s+name\s*=\s*EXCLUDED\.name/i,
    ],
    tags: ['upsert', 'on-conflict', 'do-update', 'excluded'],
  },
  {
    id: 'pg-upsert-003',
    category: 'Upsert',
    difficulty: 'medium',
    title: 'Upsert with WHERE Clause',
    text: 'Update only if the new updated_at is more recent than the existing one',
    setup: 'Table: records (id INTEGER PRIMARY KEY, data TEXT, updated_at TIMESTAMP)',
    setupCode: `CREATE TABLE records (id INTEGER PRIMARY KEY, data TEXT, updated_at TIMESTAMP);
INSERT INTO records VALUES (1, 'old data', '2024-01-01');`,
    expected: { id: 1, data: 'new data', updated_at: '2024-01-15' },
    sample: `INSERT INTO records (id, data, updated_at)
VALUES (1, 'new data', '2024-01-15')
ON CONFLICT (id)
DO UPDATE SET data = EXCLUDED.data, updated_at = EXCLUDED.updated_at
WHERE records.updated_at < EXCLUDED.updated_at;`,
    hints: [
      'Add WHERE clause to DO UPDATE for conditional updates',
      'Reference the existing row with the table name',
      'Reference the new values with EXCLUDED',
    ],
    validPatterns: [/DO\s+UPDATE\s+SET.*WHERE\s+records\.updated_at\s*<\s*EXCLUDED\.updated_at/i],
    tags: ['upsert', 'conditional-update', 'where'],
  },
  {
    id: 'pg-upsert-004',
    category: 'Upsert',
    difficulty: 'hard',
    title: 'Upsert with Increment',
    text: 'Insert page view or increment the count if the page already exists',
    setup:
      'Table: page_views (page_url TEXT PRIMARY KEY, view_count INTEGER, last_viewed TIMESTAMP)',
    setupCode: `CREATE TABLE page_views (page_url TEXT PRIMARY KEY, view_count INTEGER DEFAULT 1, last_viewed TIMESTAMP);
INSERT INTO page_views VALUES ('/home', 10, '2024-01-01');`,
    expected: { page_url: '/home', view_count: 11 },
    sample: `INSERT INTO page_views (page_url, view_count, last_viewed)
VALUES ('/home', 1, NOW())
ON CONFLICT (page_url)
DO UPDATE SET view_count = page_views.view_count + 1, last_viewed = NOW();`,
    hints: [
      'Reference the existing value to increment it',
      'Use table_name.column for the current value',
    ],
    validPatterns: [
      /DO\s+UPDATE\s+SET\s+view_count\s*=\s*page_views\.view_count\s*\+\s*1/i,
      /DO\s+UPDATE\s+SET\s+view_count\s*=\s*page_views\.view_count\s*\+\s*EXCLUDED\.view_count/i,
    ],
    tags: ['upsert', 'increment', 'counter'],
  },
  {
    id: 'pg-upsert-005',
    category: 'Upsert',
    difficulty: 'hard',
    title: 'Bulk Upsert with VALUES',
    text: 'Upsert multiple products at once, updating price if product exists',
    setup: 'Table: products (sku TEXT PRIMARY KEY, name TEXT, price NUMERIC)',
    setupCode: `CREATE TABLE products (sku TEXT PRIMARY KEY, name TEXT, price NUMERIC);
INSERT INTO products VALUES ('SKU001', 'Widget', 10.00);`,
    expected: [
      { sku: 'SKU001', name: 'Widget', price: 12.0 },
      { sku: 'SKU002', name: 'Gadget', price: 25.0 },
    ],
    sample: `INSERT INTO products (sku, name, price) VALUES
  ('SKU001', 'Widget', 12.00),
  ('SKU002', 'Gadget', 25.00)
ON CONFLICT (sku)
DO UPDATE SET price = EXCLUDED.price;`,
    hints: [
      'Multiple VALUES can be provided in one INSERT',
      'ON CONFLICT applies to each row individually',
    ],
    validPatterns: [/INSERT\s+INTO\s+products.*VALUES\s*\([^)]+\)\s*,\s*\([^)]+\).*ON\s+CONFLICT/i],
    tags: ['upsert', 'bulk', 'multiple-rows'],
  },

  // ============================================================
  // RETURNING CLAUSE (4 problems)
  // ============================================================
  {
    id: 'pg-returning-001',
    category: 'Returning Clause',
    difficulty: 'easy',
    title: 'INSERT with RETURNING',
    text: 'Insert a new user and return the generated id',
    setup: 'Table: users (id SERIAL PRIMARY KEY, name TEXT, email TEXT)',
    setupCode: 'CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT, email TEXT);',
    expected: { id: 1, name: 'Alice' },
    sample:
      "INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com') RETURNING id, name;",
    hints: [
      'RETURNING clause returns specified columns from inserted rows',
      'Useful for getting auto-generated values like SERIAL ids',
    ],
    validPatterns: [
      /INSERT\s+INTO\s+users.*VALUES.*RETURNING\s+id/i,
      /INSERT\s+INTO\s+users.*VALUES.*RETURNING\s+\*/i,
    ],
    tags: ['returning', 'insert', 'serial'],
  },
  {
    id: 'pg-returning-002',
    category: 'Returning Clause',
    difficulty: 'medium',
    title: 'UPDATE with RETURNING',
    text: 'Update product prices by 10% and return the old and new prices',
    setup: 'Table: products (id SERIAL, name TEXT, price NUMERIC)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, price NUMERIC);
INSERT INTO products (name, price) VALUES ('Widget', 100.00);`,
    expected: { id: 1, name: 'Widget', old_price: 100.0, new_price: 110.0 },
    sample: `UPDATE products
SET price = price * 1.10
RETURNING id, name, price - price/1.10 AS old_price, price AS new_price;`,
    hints: [
      'RETURNING can include expressions and calculations',
      'The returned values are from AFTER the update',
    ],
    validPatterns: [/UPDATE\s+products.*SET\s+price.*RETURNING/i],
    tags: ['returning', 'update', 'expression'],
  },
  {
    id: 'pg-returning-003',
    category: 'Returning Clause',
    difficulty: 'easy',
    title: 'DELETE with RETURNING',
    text: 'Delete inactive users and return the deleted records',
    setup: 'Table: users (id SERIAL, name TEXT, active BOOLEAN)',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT, active BOOLEAN);
INSERT INTO users (name, active) VALUES ('Alice', true), ('Bob', false), ('Carol', false);`,
    expected: [
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Carol' },
    ],
    sample: 'DELETE FROM users WHERE active = false RETURNING id, name;',
    hints: [
      'RETURNING with DELETE shows what was removed',
      'Useful for audit logging or cascading operations',
    ],
    validPatterns: [
      /DELETE\s+FROM\s+users\s+WHERE\s+active\s*=\s*false\s+RETURNING/i,
      /DELETE\s+FROM\s+users\s+WHERE\s+NOT\s+active\s+RETURNING/i,
    ],
    tags: ['returning', 'delete'],
  },
  {
    id: 'pg-returning-004',
    category: 'Returning Clause',
    difficulty: 'medium',
    title: 'RETURNING with Subquery',
    text: 'Insert an order and return it with the customer name from a join',
    setup: 'Tables: customers (id, name), orders (id SERIAL, customer_id, total)',
    setupCode: `CREATE TABLE customers (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE orders (id SERIAL PRIMARY KEY, customer_id INTEGER, total NUMERIC);
INSERT INTO customers (name) VALUES ('Alice');`,
    expected: { order_id: 1, customer_name: 'Alice', total: 99.99 },
    sample: `WITH new_order AS (
  INSERT INTO orders (customer_id, total) VALUES (1, 99.99) RETURNING *
)
SELECT new_order.id AS order_id, customers.name AS customer_name, new_order.total
FROM new_order JOIN customers ON new_order.customer_id = customers.id;`,
    hints: [
      'Use CTE to capture RETURNING output',
      'Then join with other tables for additional data',
    ],
    validPatterns: [/WITH\s+\w+\s+AS\s*\(\s*INSERT.*RETURNING\s*\*?\s*\)\s*SELECT/i],
    tags: ['returning', 'cte', 'join'],
  },

  // ============================================================
  // LATERAL JOINS (4 problems)
  // ============================================================
  {
    id: 'pg-lateral-001',
    category: 'Lateral Joins',
    difficulty: 'medium',
    title: 'Basic LATERAL Subquery',
    text: 'For each department, get the top 2 highest paid employees using LATERAL',
    setup: 'Table: employees (id, name TEXT, department TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT, salary NUMERIC);
INSERT INTO employees (name, department, salary) VALUES
  ('Alice', 'Engineering', 90000), ('Bob', 'Engineering', 80000), ('Carol', 'Engineering', 70000),
  ('Dave', 'Sales', 60000), ('Eve', 'Sales', 55000), ('Frank', 'Sales', 50000);`,
    expected: [
      { department: 'Engineering', name: 'Alice', salary: 90000 },
      { department: 'Engineering', name: 'Bob', salary: 80000 },
      { department: 'Sales', name: 'Dave', salary: 60000 },
      { department: 'Sales', name: 'Eve', salary: 55000 },
    ],
    sample: `SELECT DISTINCT d.department, e.name, e.salary
FROM (SELECT DISTINCT department FROM employees) d
CROSS JOIN LATERAL (
  SELECT name, salary FROM employees
  WHERE department = d.department
  ORDER BY salary DESC LIMIT 2
) e;`,
    hints: [
      'LATERAL allows the subquery to reference columns from preceding tables',
      'Use for top-N per group queries',
    ],
    validPatterns: [
      /CROSS\s+JOIN\s+LATERAL\s*\(/i,
      /,\s*LATERAL\s*\(/i,
      /LEFT\s+JOIN\s+LATERAL\s*\(/i,
    ],
    tags: ['lateral', 'top-n', 'subquery'],
  },
  {
    id: 'pg-lateral-002',
    category: 'Lateral Joins',
    difficulty: 'medium',
    title: 'LATERAL with Set-Returning Function',
    text: "Expand each user's array of roles into separate rows using LATERAL unnest",
    setup: 'Table: users (id, name TEXT, roles TEXT[])',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT, roles TEXT[]);
INSERT INTO users (name, roles) VALUES
  ('Alice', ARRAY['admin', 'user']),
  ('Bob', ARRAY['user']);`,
    expected: [
      { name: 'Alice', role: 'admin' },
      { name: 'Alice', role: 'user' },
      { name: 'Bob', role: 'user' },
    ],
    sample: `SELECT u.name, r.role
FROM users u
CROSS JOIN LATERAL unnest(u.roles) AS r(role);`,
    hints: [
      'LATERAL is implicit with set-returning functions',
      'unnest() with LATERAL expands arrays per row',
    ],
    validPatterns: [
      /CROSS\s+JOIN\s+LATERAL\s+unnest\s*\(/i,
      /,\s*LATERAL\s+unnest\s*\(/i,
      /,\s*unnest\s*\(\s*\w+\.roles\s*\)/i,
    ],
    tags: ['lateral', 'unnest', 'array'],
  },
  {
    id: 'pg-lateral-003',
    category: 'Lateral Joins',
    difficulty: 'hard',
    title: 'LATERAL with Aggregation',
    text: 'For each product, calculate running totals of sales in a LATERAL subquery',
    setup: 'Tables: products (id, name), sales (id, product_id, amount, sale_date)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE sales (id SERIAL PRIMARY KEY, product_id INTEGER, amount NUMERIC, sale_date DATE);
INSERT INTO products (name) VALUES ('Widget'), ('Gadget');
INSERT INTO sales (product_id, amount, sale_date) VALUES
  (1, 100, '2024-01-01'), (1, 150, '2024-01-02'), (2, 200, '2024-01-01');`,
    expected: [
      { product: 'Widget', total_sales: 250, sale_count: 2 },
      { product: 'Gadget', total_sales: 200, sale_count: 1 },
    ],
    sample: `SELECT p.name AS product, s.total_sales, s.sale_count
FROM products p
CROSS JOIN LATERAL (
  SELECT SUM(amount) AS total_sales, COUNT(*) AS sale_count
  FROM sales WHERE product_id = p.id
) s;`,
    hints: [
      'LATERAL subquery can contain aggregations',
      'Reference outer table columns in WHERE clause',
    ],
    validPatterns: [
      /CROSS\s+JOIN\s+LATERAL\s*\(\s*SELECT\s+.*SUM\s*\(/i,
      /LEFT\s+JOIN\s+LATERAL\s*\(\s*SELECT\s+.*SUM\s*\(/i,
    ],
    tags: ['lateral', 'aggregate', 'correlated'],
  },
  {
    id: 'pg-lateral-004',
    category: 'Lateral Joins',
    difficulty: 'hard',
    title: 'LATERAL with JSONB Expansion',
    text: 'Expand nested JSONB array and join with a reference table',
    setup:
      'Tables: orders (id, items JSONB), products (id, name TEXT). Items is [{"product_id": 1, "qty": 2}]',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE orders (id SERIAL PRIMARY KEY, items JSONB);
INSERT INTO products (name) VALUES ('Widget'), ('Gadget');
INSERT INTO orders (items) VALUES ('[{"product_id": 1, "qty": 2}, {"product_id": 2, "qty": 1}]');`,
    expected: [
      { order_id: 1, product_name: 'Widget', qty: 2 },
      { order_id: 1, product_name: 'Gadget', qty: 1 },
    ],
    sample: `SELECT o.id AS order_id, p.name AS product_name, (item->>'qty')::int AS qty
FROM orders o
CROSS JOIN LATERAL jsonb_array_elements(o.items) AS item
JOIN products p ON p.id = (item->>'product_id')::int;`,
    hints: [
      'Use LATERAL with jsonb_array_elements to expand JSONB arrays',
      'Cast JSON values to appropriate types for joins',
    ],
    validPatterns: [
      /CROSS\s+JOIN\s+LATERAL\s+jsonb_array_elements\s*\(/i,
      /,\s*LATERAL\s+jsonb_array_elements\s*\(/i,
    ],
    tags: ['lateral', 'jsonb', 'expand', 'join'],
  },

  // ============================================================
  // RANGE TYPES (5 problems)
  // ============================================================
  {
    id: 'pg-range-001',
    category: 'Range Types',
    difficulty: 'easy',
    title: 'Create Date Range',
    text: 'Create a date range for a project from 2024-01-01 to 2024-06-30',
    setup: 'Table: projects (id, name TEXT, duration DATERANGE)',
    setupCode: 'CREATE TABLE projects (id SERIAL PRIMARY KEY, name TEXT, duration DATERANGE);',
    expected: { name: 'Project A', duration: '[2024-01-01,2024-06-30]' },
    sample:
      "INSERT INTO projects (name, duration) VALUES ('Project A', '[2024-01-01, 2024-06-30]') RETURNING *;",
    hints: ['DATERANGE stores a range of dates', 'Use square brackets for inclusive bounds'],
    validPatterns: [
      /'\[2024-01-01\s*,\s*2024-06-30\]'/i,
      /daterange\s*\(\s*'2024-01-01'\s*,\s*'2024-06-30'/i,
    ],
    tags: ['range', 'daterange', 'create'],
  },
  {
    id: 'pg-range-002',
    category: 'Range Types',
    difficulty: 'medium',
    title: 'Check Range Overlap',
    text: 'Find all reservations that overlap with the date range 2024-03-01 to 2024-03-15',
    setup: 'Table: reservations (id, room_id INTEGER, dates DATERANGE)',
    setupCode: `CREATE TABLE reservations (id SERIAL PRIMARY KEY, room_id INTEGER, dates DATERANGE);
INSERT INTO reservations (room_id, dates) VALUES
  (1, '[2024-02-15, 2024-03-05]'),
  (2, '[2024-03-10, 2024-03-20]'),
  (3, '[2024-04-01, 2024-04-10]');`,
    expected: [
      { id: 1, room_id: 1 },
      { id: 2, room_id: 2 },
    ],
    sample:
      "SELECT id, room_id FROM reservations WHERE dates && '[2024-03-01, 2024-03-15]'::daterange;",
    hints: ['Use && operator to check for range overlap', 'Cast string to daterange type'],
    validPatterns: [
      /dates\s*&&\s*'\[2024-03-01\s*,\s*2024-03-15\]'::daterange/i,
      /dates\s*&&\s*daterange\s*\(/i,
    ],
    tags: ['range', 'overlap', 'daterange'],
  },
  {
    id: 'pg-range-003',
    category: 'Range Types',
    difficulty: 'medium',
    title: 'Check Value in Range',
    text: 'Find all schedules that include 2024-05-15 within their date range',
    setup: 'Table: schedules (id, event TEXT, dates DATERANGE)',
    setupCode: `CREATE TABLE schedules (id SERIAL PRIMARY KEY, event TEXT, dates DATERANGE);
INSERT INTO schedules (event, dates) VALUES
  ('Conference', '[2024-05-10, 2024-05-20]'),
  ('Workshop', '[2024-05-01, 2024-05-10]'),
  ('Meeting', '[2024-06-01, 2024-06-05]');`,
    expected: [{ id: 1, event: 'Conference' }],
    sample: "SELECT id, event FROM schedules WHERE dates @> '2024-05-15'::date;",
    hints: ['Use @> to check if range contains a value', 'Cast the date string to date type'],
    validPatterns: [/dates\s*@>\s*'2024-05-15'::date/i, /'2024-05-15'::date\s*<@\s*dates/i],
    tags: ['range', 'contains', 'daterange'],
  },
  {
    id: 'pg-range-004',
    category: 'Range Types',
    difficulty: 'hard',
    title: 'Integer Range with Exclusion',
    text: 'Create a constraint to prevent overlapping seat assignments using int4range',
    setup: 'Table: seat_assignments (id, event_id INTEGER, seats INT4RANGE)',
    setupCode: `CREATE TABLE seat_assignments (
  id SERIAL PRIMARY KEY,
  event_id INTEGER,
  seats INT4RANGE,
  EXCLUDE USING GIST (event_id WITH =, seats WITH &&)
);`,
    expected: 'Constraint prevents overlapping seat ranges for same event',
    sample: `-- The EXCLUDE constraint is already defined in setup
-- This insert will succeed:
INSERT INTO seat_assignments (event_id, seats) VALUES (1, '[1, 10)');
-- This will fail due to overlap:
-- INSERT INTO seat_assignments (event_id, seats) VALUES (1, '[5, 15)');`,
    hints: [
      'EXCLUDE USING GIST creates an exclusion constraint',
      'Prevents rows where conditions are all true',
      '&& checks for overlap, = checks for equality',
    ],
    validPatterns: [/EXCLUDE\s+USING\s+GIST\s*\(/i, /int4range\s*\(\s*\d+\s*,\s*\d+/i],
    tags: ['range', 'int4range', 'exclusion-constraint'],
  },
  {
    id: 'pg-range-005',
    category: 'Range Types',
    difficulty: 'hard',
    title: 'Range Functions - Intersection and Union',
    text: 'Find the intersection of two date ranges for overlapping availability',
    setup: 'Two date ranges representing availability windows',
    setupCode: `-- Availability windows:
-- Person A: 2024-03-01 to 2024-03-20
-- Person B: 2024-03-10 to 2024-03-25`,
    expected: '[2024-03-10,2024-03-20]',
    sample: `SELECT '[2024-03-01, 2024-03-20]'::daterange * '[2024-03-10, 2024-03-25]'::daterange AS overlap;`,
    hints: [
      'Use * operator for range intersection',
      'Use + operator for range union',
      'Intersection returns the overlapping portion',
    ],
    validPatterns: [/'\[.*\]'::daterange\s*\*\s*'\[.*\]'::daterange/i, /daterange_intersect\s*\(/i],
    tags: ['range', 'intersection', 'daterange'],
  },

  // ============================================================
  // ADVANCED AGGREGATIONS (6 problems)
  // ============================================================
  {
    id: 'pg-agg-001',
    category: 'Advanced Aggregations',
    difficulty: 'medium',
    title: 'Aggregate with FILTER',
    text: 'Count total employees and count only active employees in one query',
    setup: 'Table: employees (id, name TEXT, active BOOLEAN)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, active BOOLEAN);
INSERT INTO employees (name, active) VALUES
  ('Alice', true), ('Bob', false), ('Carol', true), ('Dave', true);`,
    expected: { total: 4, active_count: 3 },
    sample: `SELECT
  COUNT(*) AS total,
  COUNT(*) FILTER (WHERE active) AS active_count
FROM employees;`,
    hints: [
      'FILTER clause applies a condition to aggregate functions',
      'More readable than CASE WHEN inside COUNT',
    ],
    validPatterns: [/COUNT\s*\(\s*\*\s*\)\s*FILTER\s*\(\s*WHERE\s+active\s*\)/i],
    tags: ['aggregate', 'filter', 'conditional'],
  },
  {
    id: 'pg-agg-002',
    category: 'Advanced Aggregations',
    difficulty: 'medium',
    title: 'String Aggregation',
    text: 'Concatenate all employee names in each department with comma separator',
    setup: 'Table: employees (id, name TEXT, department TEXT)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT);
INSERT INTO employees (name, department) VALUES
  ('Alice', 'Engineering'), ('Bob', 'Engineering'), ('Carol', 'Sales');`,
    expected: [
      { department: 'Engineering', employees: 'Alice, Bob' },
      { department: 'Sales', employees: 'Carol' },
    ],
    sample: `SELECT department, string_agg(name, ', ' ORDER BY name) AS employees
FROM employees GROUP BY department;`,
    hints: [
      'string_agg() concatenates strings with a delimiter',
      'Can include ORDER BY inside the aggregate',
    ],
    validPatterns: [
      /string_agg\s*\(\s*name\s*,\s*',\s*'/i,
      /string_agg\s*\(\s*name\s*,\s*',\s*'\s*ORDER\s+BY/i,
    ],
    tags: ['aggregate', 'string_agg', 'concatenate'],
  },
  {
    id: 'pg-agg-003',
    category: 'Advanced Aggregations',
    difficulty: 'hard',
    title: 'Ordered-Set Aggregate - Percentile',
    text: 'Calculate the median (50th percentile) salary using WITHIN GROUP',
    setup: 'Table: employees (id, name TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, salary NUMERIC);
INSERT INTO employees (name, salary) VALUES
  ('A', 40000), ('B', 50000), ('C', 60000), ('D', 70000), ('E', 100000);`,
    expected: { median_salary: 60000 },
    sample: `SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY salary) AS median_salary
FROM employees;`,
    hints: [
      'percentile_cont() calculates continuous percentile',
      'WITHIN GROUP specifies the ordering for the calculation',
      '0.5 means 50th percentile (median)',
    ],
    validPatterns: [
      /percentile_cont\s*\(\s*0\.5\s*\)\s*WITHIN\s+GROUP\s*\(\s*ORDER\s+BY\s+salary\s*\)/i,
      /percentile_disc\s*\(\s*0\.5\s*\)\s*WITHIN\s+GROUP\s*\(\s*ORDER\s+BY\s+salary\s*\)/i,
    ],
    tags: ['aggregate', 'percentile', 'within-group', 'median'],
  },
  {
    id: 'pg-agg-004',
    category: 'Advanced Aggregations',
    difficulty: 'hard',
    title: 'Mode - Most Common Value',
    text: 'Find the most common department (mode) among employees',
    setup: 'Table: employees (id, name TEXT, department TEXT)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT);
INSERT INTO employees (name, department) VALUES
  ('A', 'Engineering'), ('B', 'Engineering'), ('C', 'Engineering'),
  ('D', 'Sales'), ('E', 'Sales'), ('F', 'HR');`,
    expected: { most_common_dept: 'Engineering' },
    sample: `SELECT mode() WITHIN GROUP (ORDER BY department) AS most_common_dept
FROM employees;`,
    hints: ['mode() returns the most frequent value', 'Uses WITHIN GROUP for ordering'],
    validPatterns: [/mode\s*\(\s*\)\s*WITHIN\s+GROUP\s*\(\s*ORDER\s+BY\s+department\s*\)/i],
    tags: ['aggregate', 'mode', 'within-group'],
  },
  {
    id: 'pg-agg-005',
    category: 'Advanced Aggregations',
    difficulty: 'medium',
    title: 'Array Aggregate with Ordering',
    text: 'Aggregate product names into an array ordered by price descending',
    setup: 'Table: products (id, name TEXT, price NUMERIC)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, price NUMERIC);
INSERT INTO products (name, price) VALUES
  ('Widget', 10), ('Gadget', 30), ('Tool', 20);`,
    expected: { products_by_price: ['Gadget', 'Tool', 'Widget'] },
    sample: `SELECT array_agg(name ORDER BY price DESC) AS products_by_price
FROM products;`,
    hints: ['array_agg() can include ORDER BY', 'This orders elements within the resulting array'],
    validPatterns: [/array_agg\s*\(\s*name\s+ORDER\s+BY\s+price\s+DESC\s*\)/i],
    tags: ['aggregate', 'array_agg', 'ordering'],
  },
  {
    id: 'pg-agg-006',
    category: 'Advanced Aggregations',
    difficulty: 'hard',
    title: 'GROUPING SETS',
    text: 'Generate subtotals for sales by product, by region, and grand total in one query',
    setup: 'Table: sales (id, product TEXT, region TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, product TEXT, region TEXT, amount NUMERIC);
INSERT INTO sales (product, region, amount) VALUES
  ('A', 'North', 100), ('A', 'South', 150), ('B', 'North', 200), ('B', 'South', 250);`,
    expected: [
      { product: 'A', region: null, total: 250 },
      { product: 'B', region: null, total: 450 },
      { product: null, region: 'North', total: 300 },
      { product: null, region: 'South', total: 400 },
      { product: null, region: null, total: 700 },
    ],
    sample: `SELECT product, region, SUM(amount) AS total
FROM sales
GROUP BY GROUPING SETS ((product), (region), ());`,
    hints: [
      'GROUPING SETS defines multiple grouping configurations',
      'Empty () represents grand total',
      'NULL indicates an aggregated dimension',
    ],
    validPatterns: [
      /GROUP\s+BY\s+GROUPING\s+SETS\s*\(\s*\(\s*product\s*\)\s*,\s*\(\s*region\s*\)\s*,\s*\(\s*\)\s*\)/i,
      /GROUP\s+BY\s+ROLLUP\s*\(/i,
      /GROUP\s+BY\s+CUBE\s*\(/i,
    ],
    tags: ['aggregate', 'grouping-sets', 'subtotals'],
  },

  // ========================================
  // BEGINNER FUNDAMENTALS
  // ========================================
  {
    id: 'pg-beginner-select-001',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'Select All Columns',
    text: 'Select all columns from the employees table.',
    setup: 'Table: employees (id SERIAL, name TEXT, department TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT, salary NUMERIC);
INSERT INTO employees (name, department, salary) VALUES ('Alice', 'Engineering', 75000), ('Bob', 'Sales', 55000);`,
    expected: 'All employee rows with all columns',
    sample: 'SELECT * FROM employees;',
    hints: ['Use * to select all columns', 'SELECT * retrieves every column in the table'],
    validPatterns: [/SELECT\s+\*\s+FROM\s+employees/i],
    tags: ['select', 'beginner', 'all-columns'],
  },
  {
    id: 'pg-beginner-select-002',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'Select Specific Columns',
    text: 'Select only the name and department columns from the employees table.',
    setup: 'Table: employees (id SERIAL, name TEXT, department TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT, salary NUMERIC);
INSERT INTO employees (name, department, salary) VALUES ('Alice', 'Engineering', 75000);`,
    expected: 'Employee names and departments',
    sample: 'SELECT name, department FROM employees;',
    hints: ['List column names separated by commas', 'Only the specified columns will be returned'],
    validPatterns: [/SELECT\s+name\s*,\s*department\s+FROM\s+employees/i],
    tags: ['select', 'beginner', 'specific-columns'],
  },
  {
    id: 'pg-beginner-select-003',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'Select with Column Alias',
    text: 'Select the name column and give it the alias "employee_name".',
    setup: 'Table: employees (id SERIAL, name TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, salary NUMERIC);
INSERT INTO employees (name, salary) VALUES ('Alice', 75000);`,
    expected: 'Names with column header "employee_name"',
    sample: 'SELECT name AS employee_name FROM employees;',
    hints: ['Use AS keyword to create an alias', 'Aliases rename columns in the result set'],
    validPatterns: [/SELECT\s+name\s+AS\s+employee_name\s+FROM\s+employees/i],
    tags: ['select', 'beginner', 'alias'],
  },
  {
    id: 'pg-beginner-select-004',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'Select Distinct Values',
    text: 'Select all unique department values from the employees table.',
    setup: 'Table: employees (id SERIAL, name TEXT, department TEXT)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT);
INSERT INTO employees (name, department) VALUES ('Alice', 'Engineering'), ('Bob', 'Engineering'), ('Carol', 'Sales');`,
    expected: 'Engineering, Sales',
    sample: 'SELECT DISTINCT department FROM employees;',
    hints: ['Use DISTINCT to remove duplicates', 'DISTINCT returns unique values only'],
    validPatterns: [/SELECT\s+DISTINCT\s+department\s+FROM\s+employees/i],
    tags: ['select', 'beginner', 'distinct'],
  },
  {
    id: 'pg-beginner-where-001',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'Where with Equality',
    text: 'Select all employees from the Engineering department.',
    setup: 'Table: employees (id SERIAL, name TEXT, department TEXT)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT);
INSERT INTO employees (name, department) VALUES ('Alice', 'Engineering'), ('Bob', 'Sales');`,
    expected: 'Alice',
    sample: "SELECT * FROM employees WHERE department = 'Engineering';",
    hints: ['Use WHERE to filter rows', 'String values need to be in single quotes'],
    validPatterns: [/SELECT\s+\*\s+FROM\s+employees\s+WHERE\s+department\s*=\s*'Engineering'/i],
    tags: ['where', 'beginner', 'equality'],
  },
  {
    id: 'pg-beginner-where-002',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'Where with Comparison Operator',
    text: 'Select all employees with a salary greater than 60000.',
    setup: 'Table: employees (id SERIAL, name TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, salary NUMERIC);
INSERT INTO employees (name, salary) VALUES ('Alice', 75000), ('Bob', 55000);`,
    expected: 'Alice',
    sample: 'SELECT * FROM employees WHERE salary > 60000;',
    hints: ['Use > for greater than comparison', 'Other operators: <, >=, <=, <>, !='],
    validPatterns: [/SELECT\s+\*\s+FROM\s+employees\s+WHERE\s+salary\s*>\s*60000/i],
    tags: ['where', 'beginner', 'comparison'],
  },
  {
    id: 'pg-beginner-where-003',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'Where with AND/OR',
    text: 'Select employees from Engineering department with salary greater than 70000.',
    setup: 'Table: employees (id SERIAL, name TEXT, department TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT, salary NUMERIC);
INSERT INTO employees (name, department, salary) VALUES ('Alice', 'Engineering', 75000), ('Bob', 'Engineering', 65000);`,
    expected: 'Alice',
    sample: "SELECT * FROM employees WHERE department = 'Engineering' AND salary > 70000;",
    hints: [
      'Use AND to combine conditions (both must be true)',
      'Use OR when either condition can be true',
    ],
    validPatterns: [/WHERE\s+department\s*=\s*'Engineering'\s+AND\s+salary\s*>\s*70000/i],
    tags: ['where', 'beginner', 'and-or'],
  },
  {
    id: 'pg-beginner-insert-001',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'Insert Single Row',
    text: 'Insert a new employee named "David" in the "Marketing" department with salary 60000.',
    setup: 'Table: employees (id SERIAL, name TEXT, department TEXT, salary NUMERIC)',
    setupCode:
      'CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT, salary NUMERIC);',
    expected: 'Row inserted successfully',
    sample:
      "INSERT INTO employees (name, department, salary) VALUES ('David', 'Marketing', 60000);",
    hints: [
      'Use INSERT INTO table (columns) VALUES (values)',
      'SERIAL columns auto-increment, no need to specify id',
    ],
    validPatterns: [/INSERT\s+INTO\s+employees.*VALUES.*'David'.*'Marketing'/i],
    tags: ['insert', 'beginner', 'single-row'],
  },
  {
    id: 'pg-beginner-insert-002',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'Insert Multiple Rows',
    text: 'Insert two new employees in a single INSERT statement.',
    setup: 'Table: employees (id SERIAL, name TEXT, department TEXT)',
    setupCode: 'CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT);',
    expected: '2 rows inserted',
    sample:
      "INSERT INTO employees (name, department) VALUES ('Eve', 'Engineering'), ('Frank', 'Sales');",
    hints: ['Separate multiple value sets with commas', 'Each set is enclosed in parentheses'],
    validPatterns: [/INSERT\s+INTO\s+employees.*VALUES\s*\([^)]+\)\s*,\s*\([^)]+\)/i],
    tags: ['insert', 'beginner', 'multiple-rows'],
  },
  {
    id: 'pg-beginner-update-001',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'Update with Where',
    text: 'Update the salary to 80000 for the employee named "Alice".',
    setup: 'Table: employees (id SERIAL, name TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, salary NUMERIC);
INSERT INTO employees (name, salary) VALUES ('Alice', 75000);`,
    expected: '1 row updated',
    sample: "UPDATE employees SET salary = 80000 WHERE name = 'Alice';",
    hints: [
      'Use UPDATE table SET column = value WHERE condition',
      'Always use WHERE to avoid updating all rows!',
    ],
    validPatterns: [/UPDATE\s+employees\s+SET\s+salary\s*=\s*80000\s+WHERE\s+name\s*=\s*'Alice'/i],
    tags: ['update', 'beginner', 'where'],
  },
  {
    id: 'pg-beginner-orderby-001',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'Simple ORDER BY Ascending',
    text: 'Select all employees ordered by name in ascending order (A to Z).',
    setup: 'Table: employees (id SERIAL, name TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, salary NUMERIC);
INSERT INTO employees (name, salary) VALUES ('Charlie', 60000), ('Alice', 75000), ('Bob', 55000);`,
    expected: 'Alice, Bob, Charlie',
    sample: 'SELECT * FROM employees ORDER BY name ASC;',
    hints: [
      'Use ORDER BY column_name to sort results',
      'ASC is the default order (ascending)',
      'You can omit ASC as it is the default',
    ],
    validPatterns: [/SELECT\s+\*\s+FROM\s+employees\s+ORDER\s+BY\s+name(\s+ASC)?/i],
    tags: ['select', 'beginner', 'order-by', 'ascending'],
  },
  {
    id: 'pg-beginner-orderby-002',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'ORDER BY Descending',
    text: 'Select all employees ordered by salary from highest to lowest.',
    setup: 'Table: employees (id SERIAL, name TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, salary NUMERIC);
INSERT INTO employees (name, salary) VALUES ('Alice', 75000), ('Bob', 55000), ('Carol', 90000);`,
    expected: 'Carol (90000), Alice (75000), Bob (55000)',
    sample: 'SELECT * FROM employees ORDER BY salary DESC;',
    hints: [
      'Use DESC for descending order (highest to lowest)',
      'DESC must be specified explicitly',
    ],
    validPatterns: [/SELECT\s+\*\s+FROM\s+employees\s+ORDER\s+BY\s+salary\s+DESC/i],
    tags: ['select', 'beginner', 'order-by', 'descending'],
  },
  {
    id: 'pg-beginner-limit-001',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'Basic LIMIT',
    text: 'Select the first 3 employees from the table.',
    setup: 'Table: employees (id SERIAL, name TEXT)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT);
INSERT INTO employees (name) VALUES ('Alice'), ('Bob'), ('Carol'), ('David'), ('Eve');`,
    expected: 'Alice, Bob, Carol',
    sample: 'SELECT * FROM employees LIMIT 3;',
    hints: [
      'Use LIMIT n to restrict the number of rows returned',
      'LIMIT is often used with ORDER BY for top-N queries',
    ],
    validPatterns: [/SELECT\s+\*\s+FROM\s+employees\s+LIMIT\s+3/i],
    tags: ['select', 'beginner', 'limit'],
  },
  {
    id: 'pg-beginner-limit-002',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'LIMIT with OFFSET',
    text: 'Select 3 employees starting from the 4th row (skip the first 3).',
    setup: 'Table: employees (id SERIAL, name TEXT)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT);
INSERT INTO employees (name) VALUES ('Alice'), ('Bob'), ('Carol'), ('David'), ('Eve'), ('Frank');`,
    expected: 'David, Eve, Frank',
    sample: 'SELECT * FROM employees LIMIT 3 OFFSET 3;',
    hints: [
      'OFFSET specifies how many rows to skip',
      'Useful for pagination (page 2 = LIMIT 10 OFFSET 10)',
      'PostgreSQL also supports OFFSET without LIMIT',
    ],
    validPatterns: [/SELECT\s+\*\s+FROM\s+employees\s+LIMIT\s+3\s+OFFSET\s+3/i],
    tags: ['select', 'beginner', 'limit', 'offset', 'pagination'],
  },
  {
    id: 'pg-beginner-count-001',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'COUNT All Rows',
    text: 'Count the total number of employees in the table.',
    setup: 'Table: employees (id SERIAL, name TEXT, department TEXT)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT);
INSERT INTO employees (name, department) VALUES ('Alice', 'Engineering'), ('Bob', 'Sales'), ('Carol', 'Engineering');`,
    expected: '3',
    sample: 'SELECT COUNT(*) FROM employees;',
    hints: [
      'COUNT(*) counts all rows including NULLs',
      'COUNT(column) counts non-NULL values in that column',
      'Use an alias for clarity: COUNT(*) AS total',
    ],
    validPatterns: [/SELECT\s+COUNT\s*\(\s*\*\s*\)\s+FROM\s+employees/i],
    tags: ['aggregate', 'beginner', 'count'],
  },
  {
    id: 'pg-beginner-delete-001',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'DELETE with WHERE',
    text: 'Delete the employee named "Bob" from the employees table.',
    setup: 'Table: employees (id SERIAL, name TEXT, department TEXT)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT);
INSERT INTO employees (name, department) VALUES ('Alice', 'Engineering'), ('Bob', 'Sales'), ('Carol', 'Engineering');`,
    expected: '1 row deleted',
    sample: "DELETE FROM employees WHERE name = 'Bob';",
    hints: [
      'Always use WHERE with DELETE to avoid deleting all rows!',
      'DELETE FROM table WHERE condition',
      'Without WHERE, all rows will be deleted',
    ],
    validPatterns: [/DELETE\s+FROM\s+employees\s+WHERE\s+name\s*=\s*'Bob'/i],
    tags: ['delete', 'beginner', 'where'],
  },
];
