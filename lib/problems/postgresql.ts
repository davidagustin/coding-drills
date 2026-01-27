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

  // ============================================================
  // NEW PROBLEMS - BATCH 1: JSON/JSONB EXTENDED (25 problems)
  // ============================================================
  {
    id: 'pg-json-100',
    category: 'JSON/JSONB',
    difficulty: 'easy',
    title: 'Extract JSON Array Element by Index',
    text: 'Extract the second element from a JSONB array stored in the items column',
    setup: 'Table: orders (id, items JSONB) where items is ["apple", "banana", "cherry"]',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, items JSONB);
INSERT INTO orders (items) VALUES ('["apple", "banana", "cherry"]');`,
    expected: 'banana',
    sample: 'SELECT items->>1 FROM orders;',
    hints: [
      'JSONB arrays are zero-indexed',
      'Use ->> with an integer to get array element as text',
    ],
    tags: ['jsonb', 'array', 'index'],
  },
  {
    id: 'pg-json-101',
    category: 'JSON/JSONB',
    difficulty: 'easy',
    title: 'Check if JSONB is an Array',
    text: 'Select only rows where the data column contains a JSONB array',
    setup: 'Table: mixed_data (id, data JSONB) with both objects and arrays',
    setupCode: `CREATE TABLE mixed_data (id SERIAL PRIMARY KEY, data JSONB);
INSERT INTO mixed_data (data) VALUES ('{"name": "test"}'), ('[1, 2, 3]'), ('{"arr": []}');`,
    expected: [{ id: 2, data: [1, 2, 3] }],
    sample: "SELECT * FROM mixed_data WHERE jsonb_typeof(data) = 'array';",
    hints: [
      'jsonb_typeof() returns the type of the top-level JSON value',
      'Possible types: object, array, string, number, boolean, null',
    ],
    tags: ['jsonb', 'typeof', 'filter'],
  },
  {
    id: 'pg-json-102',
    category: 'JSON/JSONB',
    difficulty: 'medium',
    title: 'Delete Key from JSONB',
    text: 'Remove the "password" key from the user data JSONB column',
    setup:
      'Table: users (id, data JSONB) where data contains {"name": "John", "password": "secret", "email": "john@test.com"}',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, data JSONB);
INSERT INTO users (data) VALUES ('{"name": "John", "password": "secret", "email": "john@test.com"}');`,
    expected: { name: 'John', email: 'john@test.com' },
    sample: "SELECT data - 'password' FROM users;",
    hints: [
      'Use the - operator to remove a key from JSONB',
      'This returns a new JSONB without the specified key',
    ],
    tags: ['jsonb', 'delete', 'key'],
  },
  {
    id: 'pg-json-103',
    category: 'JSON/JSONB',
    difficulty: 'medium',
    title: 'Delete Multiple Keys from JSONB',
    text: 'Remove both "password" and "internal_id" keys from user data',
    setup: 'Table: users (id, data JSONB)',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, data JSONB);
INSERT INTO users (data) VALUES ('{"name": "John", "password": "secret", "internal_id": 123, "email": "john@test.com"}');`,
    expected: { name: 'John', email: 'john@test.com' },
    sample: "SELECT data - '{password, internal_id}'::text[] FROM users;",
    hints: ['Use - with a text array to remove multiple keys', 'Cast the array literal to text[]'],
    tags: ['jsonb', 'delete', 'multiple-keys'],
  },
  {
    id: 'pg-json-104',
    category: 'JSON/JSONB',
    difficulty: 'medium',
    title: 'JSONB Pretty Print',
    text: 'Format the JSONB data with indentation for readability',
    setup: 'Table: configs (id, settings JSONB)',
    setupCode: `CREATE TABLE configs (id SERIAL PRIMARY KEY, settings JSONB);
INSERT INTO configs (settings) VALUES ('{"database": {"host": "localhost", "port": 5432}, "cache": {"enabled": true}}');`,
    expected:
      '{\n    "cache": {\n        "enabled": true\n    },\n    "database": {\n        "host": "localhost",\n        "port": 5432\n    }\n}',
    sample: 'SELECT jsonb_pretty(settings) FROM configs;',
    hints: [
      'jsonb_pretty() formats JSONB with indentation',
      'Useful for debugging and display purposes',
    ],
    tags: ['jsonb', 'pretty', 'format'],
  },
  {
    id: 'pg-json-105',
    category: 'JSON/JSONB',
    difficulty: 'medium',
    title: 'Merge Two JSONB Objects',
    text: 'Merge default settings with user settings, with user settings taking precedence',
    setup: 'Default: {"theme": "light", "lang": "en"}, User: {"theme": "dark"}',
    setupCode: `-- No table needed for this example`,
    expected: { theme: 'dark', lang: 'en' },
    sample: `SELECT '{"theme": "light", "lang": "en"}'::jsonb || '{"theme": "dark"}'::jsonb;`,
    hints: [
      'Use || to concatenate/merge JSONB objects',
      'Right-side values override left-side for duplicate keys',
    ],
    tags: ['jsonb', 'merge', 'concatenate'],
  },
  {
    id: 'pg-json-106',
    category: 'JSON/JSONB',
    difficulty: 'hard',
    title: 'JSONB Deep Merge with jsonb_set',
    text: 'Update a nested value without replacing the entire parent object',
    setup:
      'Table: configs (id, data JSONB) where data is {"server": {"host": "old.com", "port": 80}}',
    setupCode: `CREATE TABLE configs (id SERIAL PRIMARY KEY, data JSONB);
INSERT INTO configs (data) VALUES ('{"server": {"host": "old.com", "port": 80}}');`,
    expected: { server: { host: 'new.com', port: 80 } },
    sample:
      "UPDATE configs SET data = jsonb_set(data, '{server,host}', '\"new.com\"') RETURNING data;",
    hints: [
      'jsonb_set takes a path array for nested updates',
      'The path {server,host} targets data.server.host',
    ],
    tags: ['jsonb', 'jsonb_set', 'nested', 'update'],
  },
  {
    id: 'pg-json-107',
    category: 'JSON/JSONB',
    difficulty: 'hard',
    title: 'Add Element to JSONB Array',
    text: 'Append a new tag to the existing tags JSONB array',
    setup: 'Table: posts (id, tags JSONB) where tags is ["sql", "database"]',
    setupCode: `CREATE TABLE posts (id SERIAL PRIMARY KEY, tags JSONB);
INSERT INTO posts (tags) VALUES ('["sql", "database"]');`,
    expected: ['sql', 'database', 'postgres'],
    sample: 'UPDATE posts SET tags = tags || \'["postgres"]\'::jsonb RETURNING tags;',
    hints: ['Use || to append to JSONB arrays', 'The new element must also be a JSONB array'],
    tags: ['jsonb', 'array', 'append'],
  },
  {
    id: 'pg-json-108',
    category: 'JSON/JSONB',
    difficulty: 'medium',
    title: 'Get All JSONB Object Keys',
    text: 'Extract all keys from a JSONB object as a set of text values',
    setup: 'Table: products (id, attributes JSONB)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, attributes JSONB);
INSERT INTO products (attributes) VALUES ('{"color": "red", "size": "large", "weight": 100}');`,
    expected: ['color', 'size', 'weight'],
    sample: 'SELECT jsonb_object_keys(attributes) FROM products;',
    hints: [
      'jsonb_object_keys() returns a set of all keys',
      'Only works on JSONB objects, not arrays',
    ],
    tags: ['jsonb', 'keys', 'extract'],
  },
  {
    id: 'pg-json-109',
    category: 'JSON/JSONB',
    difficulty: 'hard',
    title: 'JSONB Key-Value Expansion',
    text: 'Expand a JSONB object into key-value pairs as rows',
    setup: 'Table: metrics (id, data JSONB) where data is {"cpu": 80, "memory": 60, "disk": 40}',
    setupCode: `CREATE TABLE metrics (id SERIAL PRIMARY KEY, data JSONB);
INSERT INTO metrics (data) VALUES ('{"cpu": 80, "memory": 60, "disk": 40}');`,
    expected: [
      { key: 'cpu', value: 80 },
      { key: 'memory', value: 60 },
      { key: 'disk', value: 40 },
    ],
    sample: 'SELECT key, value::int FROM metrics, jsonb_each_text(data) AS kv(key, value);',
    hints: [
      'jsonb_each() expands object to key-value rows',
      'jsonb_each_text() returns values as text',
    ],
    tags: ['jsonb', 'each', 'expand'],
  },
  {
    id: 'pg-json-110',
    category: 'JSON/JSONB',
    difficulty: 'medium',
    title: 'JSONB Array Length',
    text: 'Get the number of elements in a JSONB array',
    setup: 'Table: posts (id, tags JSONB)',
    setupCode: `CREATE TABLE posts (id SERIAL PRIMARY KEY, tags JSONB);
INSERT INTO posts (tags) VALUES ('["sql", "postgres", "database", "tutorial"]');`,
    expected: 4,
    sample: 'SELECT jsonb_array_length(tags) FROM posts;',
    hints: [
      'jsonb_array_length() returns the count of array elements',
      'Only works on JSONB arrays',
    ],
    tags: ['jsonb', 'array', 'length'],
  },
  {
    id: 'pg-json-111',
    category: 'JSON/JSONB',
    difficulty: 'hard',
    title: 'Build JSONB from Query Results',
    text: 'Create a JSONB array of objects from table rows',
    setup: 'Table: employees (id, name TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, salary NUMERIC);
INSERT INTO employees (name, salary) VALUES ('Alice', 50000), ('Bob', 60000);`,
    expected: [
      { name: 'Alice', salary: 50000 },
      { name: 'Bob', salary: 60000 },
    ],
    sample: "SELECT jsonb_agg(jsonb_build_object('name', name, 'salary', salary)) FROM employees;",
    hints: [
      'Combine jsonb_build_object with jsonb_agg',
      'jsonb_build_object creates each row object',
      'jsonb_agg aggregates into an array',
    ],
    tags: ['jsonb', 'build', 'aggregate'],
  },
  {
    id: 'pg-json-112',
    category: 'JSON/JSONB',
    difficulty: 'hard',
    title: 'Filter JSONB Array Elements',
    text: 'Select only items from a JSONB array where price > 50',
    setup:
      'Table: orders (id, items JSONB) where items is [{"name": "A", "price": 30}, {"name": "B", "price": 70}]',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, items JSONB);
INSERT INTO orders (items) VALUES ('[{"name": "A", "price": 30}, {"name": "B", "price": 70}, {"name": "C", "price": 100}]');`,
    expected: [
      { name: 'B', price: 70 },
      { name: 'C', price: 100 },
    ],
    sample: `SELECT jsonb_agg(elem) FROM orders, jsonb_array_elements(items) AS elem WHERE (elem->>'price')::int > 50;`,
    hints: [
      'Expand array with jsonb_array_elements',
      'Filter in WHERE clause',
      'Reaggregate with jsonb_agg',
    ],
    tags: ['jsonb', 'array', 'filter'],
  },
  {
    id: 'pg-json-113',
    category: 'JSON/JSONB',
    difficulty: 'medium',
    title: 'JSONB Existence - Any Key',
    text: 'Find records where data contains any of these keys: premium, vip, or enterprise',
    setup: 'Table: users (id, data JSONB)',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, data JSONB);
INSERT INTO users (data) VALUES ('{"name": "John", "premium": true}'), ('{"name": "Jane", "basic": true}'), ('{"name": "Bob", "vip": true}');`,
    expected: [{ id: 1 }, { id: 3 }],
    sample: "SELECT id FROM users WHERE data ?| array['premium', 'vip', 'enterprise'];",
    hints: ['?| checks if any of the keys exist', 'Pass keys as a text array'],
    tags: ['jsonb', 'existence', 'any-key'],
  },
  {
    id: 'pg-json-114',
    category: 'JSON/JSONB',
    difficulty: 'medium',
    title: 'JSONB Existence - All Keys',
    text: 'Find records where data contains both "name" AND "email" keys',
    setup: 'Table: users (id, data JSONB)',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, data JSONB);
INSERT INTO users (data) VALUES ('{"name": "John", "email": "john@test.com"}'), ('{"name": "Jane"}'), ('{"email": "bob@test.com"}');`,
    expected: [{ id: 1 }],
    sample: "SELECT id FROM users WHERE data ?& array['name', 'email'];",
    hints: ['?& checks if all specified keys exist', 'All keys must be present for a match'],
    tags: ['jsonb', 'existence', 'all-keys'],
  },
  {
    id: 'pg-json-115',
    category: 'JSON/JSONB',
    difficulty: 'hard',
    title: 'JSONB Path Query - Filter Objects',
    text: 'Use jsonb_path_query_array to find all items with quantity > 5',
    setup: 'Table: orders (id, items JSONB)',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, items JSONB);
INSERT INTO orders (items) VALUES ('[{"product": "A", "qty": 3}, {"product": "B", "qty": 10}, {"product": "C", "qty": 7}]');`,
    expected: [
      { product: 'B', qty: 10 },
      { product: 'C', qty: 7 },
    ],
    sample: "SELECT jsonb_path_query_array(items, '$[*] ? (@.qty > 5)') FROM orders;",
    hints: [
      'jsonb_path_query_array returns results as a JSONB array',
      '? (@.qty > 5) filters objects where qty > 5',
    ],
    tags: ['jsonb', 'path', 'filter'],
  },
  {
    id: 'pg-json-116',
    category: 'JSON/JSONB',
    difficulty: 'hard',
    title: 'JSONB Path - Extract Specific Fields',
    text: 'Extract only the product names from all items using JSON path',
    setup: 'Table: orders (id, items JSONB)',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, items JSONB);
INSERT INTO orders (items) VALUES ('[{"product": "Widget", "qty": 3}, {"product": "Gadget", "qty": 5}]');`,
    expected: ['Widget', 'Gadget'],
    sample: "SELECT jsonb_path_query_array(items, '$[*].product') FROM orders;",
    hints: [
      '$[*].product selects the product field from all array elements',
      'Returns as a JSONB array of values',
    ],
    tags: ['jsonb', 'path', 'extract'],
  },
  {
    id: 'pg-json-117',
    category: 'JSON/JSONB',
    difficulty: 'easy',
    title: 'Convert Row to JSON',
    text: 'Convert an entire table row to a JSON object',
    setup: 'Table: employees (id, name TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, salary NUMERIC);
INSERT INTO employees (name, salary) VALUES ('Alice', 50000);`,
    expected: { id: 1, name: 'Alice', salary: 50000 },
    sample: 'SELECT to_jsonb(employees) FROM employees;',
    hints: [
      'to_jsonb() converts any SQL value to JSONB',
      'When given a row, it creates an object with column names as keys',
    ],
    tags: ['jsonb', 'row', 'convert'],
  },
  {
    id: 'pg-json-118',
    category: 'JSON/JSONB',
    difficulty: 'medium',
    title: 'Strip Nulls from JSONB',
    text: 'Remove all null values from a JSONB object',
    setup: 'JSONB object with some null values',
    setupCode: `-- No table needed`,
    expected: { name: 'John', city: 'NYC' },
    sample: `SELECT jsonb_strip_nulls('{"name": "John", "age": null, "city": "NYC", "phone": null}'::jsonb);`,
    hints: [
      'jsonb_strip_nulls() removes all keys with null values',
      'Useful for cleaning up sparse data',
    ],
    tags: ['jsonb', 'nulls', 'clean'],
  },
  {
    id: 'pg-json-119',
    category: 'JSON/JSONB',
    difficulty: 'hard',
    title: 'JSONB Insert at Path',
    text: 'Insert a new key-value pair into a nested JSONB object',
    setup: 'Table: configs (id, data JSONB) with nested structure',
    setupCode: `CREATE TABLE configs (id SERIAL PRIMARY KEY, data JSONB);
INSERT INTO configs (data) VALUES ('{"server": {"host": "localhost"}}');`,
    expected: { server: { host: 'localhost', port: 5432 } },
    sample: "UPDATE configs SET data = jsonb_insert(data, '{server,port}', '5432') RETURNING data;",
    hints: [
      'jsonb_insert() adds a new key at the specified path',
      'Different from jsonb_set which replaces existing values',
    ],
    tags: ['jsonb', 'insert', 'nested'],
  },
  {
    id: 'pg-json-120',
    category: 'JSON/JSONB',
    difficulty: 'hard',
    title: 'JSONB Set with Create Missing',
    text: 'Set a nested value, creating parent objects if they do not exist',
    setup: 'Table: settings (id, data JSONB)',
    setupCode: `CREATE TABLE settings (id SERIAL PRIMARY KEY, data JSONB);
INSERT INTO settings (data) VALUES ('{}');`,
    expected: { notifications: { email: true } },
    sample:
      "UPDATE settings SET data = jsonb_set(data, '{notifications,email}', 'true', true) RETURNING data;",
    hints: [
      'The fourth parameter of jsonb_set creates missing parents',
      'Set to true to auto-create nested structure',
    ],
    tags: ['jsonb', 'set', 'create-missing'],
  },
  {
    id: 'pg-json-121',
    category: 'JSON/JSONB',
    difficulty: 'medium',
    title: 'JSONB Contains - Nested Object',
    text: 'Find users whose address contains city: "NYC"',
    setup: 'Table: users (id, data JSONB) with nested address objects',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, data JSONB);
INSERT INTO users (data) VALUES
  ('{"name": "John", "address": {"city": "NYC", "zip": "10001"}}'),
  ('{"name": "Jane", "address": {"city": "LA", "zip": "90001"}}');`,
    expected: [{ id: 1 }],
    sample: `SELECT id FROM users WHERE data @> '{"address": {"city": "NYC"}}';`,
    hints: [
      '@> containment works with nested structures',
      'The right side must match the nested structure',
    ],
    tags: ['jsonb', 'contains', 'nested'],
  },
  {
    id: 'pg-json-122',
    category: 'JSON/JSONB',
    difficulty: 'hard',
    title: 'JSONB Aggregation with Distinct',
    text: 'Aggregate unique tags from all posts into a single JSONB array',
    setup: 'Table: posts (id, tags JSONB) where tags are arrays',
    setupCode: `CREATE TABLE posts (id SERIAL PRIMARY KEY, tags JSONB);
INSERT INTO posts (tags) VALUES ('["sql", "postgres"]'), ('["postgres", "database"]'), ('["sql", "tutorial"]');`,
    expected: ['sql', 'postgres', 'database', 'tutorial'],
    sample: `SELECT jsonb_agg(DISTINCT tag) FROM posts, jsonb_array_elements_text(tags) AS tag;`,
    hints: [
      'Expand all arrays with jsonb_array_elements_text',
      'Use DISTINCT in jsonb_agg to remove duplicates',
    ],
    tags: ['jsonb', 'aggregate', 'distinct'],
  },
  {
    id: 'pg-json-123',
    category: 'JSON/JSONB',
    difficulty: 'hard',
    title: 'JSONB Transform - Map Function',
    text: 'Double all numeric values in a JSONB array',
    setup: 'JSONB array of numbers',
    setupCode: `-- No table needed`,
    expected: [2, 4, 6, 8, 10],
    sample: `SELECT jsonb_agg((elem::int * 2)::text::jsonb) FROM jsonb_array_elements('[1, 2, 3, 4, 5]'::jsonb) AS elem;`,
    hints: [
      'Expand array, transform each element, reaggregate',
      'Cast through text to maintain JSONB number type',
    ],
    tags: ['jsonb', 'transform', 'map'],
  },
  {
    id: 'pg-json-124',
    category: 'JSON/JSONB',
    difficulty: 'medium',
    title: 'JSONB Comparison',
    text: 'Find products where the specs JSONB exactly matches a given object',
    setup: 'Table: products (id, specs JSONB)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, specs JSONB);
INSERT INTO products (name, specs) VALUES
  ('Phone A', '{"color": "black", "storage": 128}'),
  ('Phone B', '{"color": "white", "storage": 128}'),
  ('Phone C', '{"color": "black", "storage": 128}');`,
    expected: [{ id: 1 }, { id: 3 }],
    sample: `SELECT id FROM products WHERE specs = '{"color": "black", "storage": 128}'::jsonb;`,
    hints: [
      'JSONB supports equality comparison',
      'Order of keys does not matter for JSONB equality',
    ],
    tags: ['jsonb', 'comparison', 'equality'],
  },

  // ============================================================
  // NEW PROBLEMS - BATCH 1: ARRAY OPERATIONS EXTENDED (25 problems)
  // ============================================================
  {
    id: 'pg-array-100',
    category: 'Array Operations',
    difficulty: 'easy',
    title: 'Create Array Literal',
    text: 'Insert a product with an array of colors: red, blue, green',
    setup: 'Table: products (id, name TEXT, colors TEXT[])',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, colors TEXT[]);`,
    expected: { name: 'Widget', colors: ['red', 'blue', 'green'] },
    sample:
      "INSERT INTO products (name, colors) VALUES ('Widget', ARRAY['red', 'blue', 'green']) RETURNING *;",
    hints: [
      'Use ARRAY[...] constructor to create arrays',
      'Elements are comma-separated within brackets',
    ],
    tags: ['array', 'create', 'literal'],
  },
  {
    id: 'pg-array-101',
    category: 'Array Operations',
    difficulty: 'easy',
    title: 'Array String Literal Syntax',
    text: 'Insert using curly brace array syntax',
    setup: 'Table: products (id, name TEXT, tags TEXT[])',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, tags TEXT[]);`,
    expected: { name: 'Gadget', tags: ['tech', 'new', 'sale'] },
    sample: `INSERT INTO products (name, tags) VALUES ('Gadget', '{tech, new, sale}') RETURNING *;`,
    hints: ['Alternative syntax uses curly braces as a string', 'PostgreSQL parses it as an array'],
    tags: ['array', 'create', 'syntax'],
  },
  {
    id: 'pg-array-102',
    category: 'Array Operations',
    difficulty: 'medium',
    title: 'Append to Array',
    text: 'Add "featured" to the existing tags array',
    setup: 'Table: products (id, tags TEXT[])',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, tags TEXT[]);
INSERT INTO products (tags) VALUES (ARRAY['sale', 'new']);`,
    expected: ['sale', 'new', 'featured'],
    sample: "UPDATE products SET tags = array_append(tags, 'featured') RETURNING tags;",
    hints: ['array_append() adds element to end of array', 'Alternative: tags || ARRAY[value]'],
    tags: ['array', 'append', 'modify'],
  },
  {
    id: 'pg-array-103',
    category: 'Array Operations',
    difficulty: 'medium',
    title: 'Prepend to Array',
    text: 'Add "priority" to the beginning of the tags array',
    setup: 'Table: products (id, tags TEXT[])',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, tags TEXT[]);
INSERT INTO products (tags) VALUES (ARRAY['sale', 'new']);`,
    expected: ['priority', 'sale', 'new'],
    sample: "UPDATE products SET tags = array_prepend('priority', tags) RETURNING tags;",
    hints: [
      'array_prepend() adds element to start of array',
      'Note the parameter order: element first, then array',
    ],
    tags: ['array', 'prepend', 'modify'],
  },
  {
    id: 'pg-array-104',
    category: 'Array Operations',
    difficulty: 'medium',
    title: 'Remove Element from Array',
    text: 'Remove all occurrences of "deprecated" from the tags array',
    setup: 'Table: products (id, tags TEXT[])',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, tags TEXT[]);
INSERT INTO products (tags) VALUES (ARRAY['active', 'deprecated', 'sale', 'deprecated']);`,
    expected: ['active', 'sale'],
    sample: "UPDATE products SET tags = array_remove(tags, 'deprecated') RETURNING tags;",
    hints: [
      'array_remove() removes all matching elements',
      'Returns a new array without the specified value',
    ],
    tags: ['array', 'remove', 'modify'],
  },
  {
    id: 'pg-array-105',
    category: 'Array Operations',
    difficulty: 'medium',
    title: 'Replace Array Element',
    text: 'Replace all occurrences of "old" with "new" in the tags array',
    setup: 'Table: products (id, tags TEXT[])',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, tags TEXT[]);
INSERT INTO products (tags) VALUES (ARRAY['old', 'featured', 'old']);`,
    expected: ['new', 'featured', 'new'],
    sample: "UPDATE products SET tags = array_replace(tags, 'old', 'new') RETURNING tags;",
    hints: ['array_replace() replaces all occurrences', 'Parameters: array, old_value, new_value'],
    tags: ['array', 'replace', 'modify'],
  },
  {
    id: 'pg-array-106',
    category: 'Array Operations',
    difficulty: 'easy',
    title: 'Array Element Access',
    text: 'Get the first tag from the tags array',
    setup: 'Table: products (id, tags TEXT[])',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, tags TEXT[]);
INSERT INTO products (tags) VALUES (ARRAY['featured', 'sale', 'new']);`,
    expected: 'featured',
    sample: 'SELECT tags[1] FROM products;',
    hints: ['PostgreSQL arrays are 1-indexed by default', 'Use square brackets with index number'],
    tags: ['array', 'access', 'index'],
  },
  {
    id: 'pg-array-107',
    category: 'Array Operations',
    difficulty: 'medium',
    title: 'Find Element Position in Array',
    text: 'Find the position of "sale" in the tags array',
    setup: 'Table: products (id, tags TEXT[])',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, tags TEXT[]);
INSERT INTO products (tags) VALUES (ARRAY['featured', 'sale', 'new']);`,
    expected: 2,
    sample: "SELECT array_position(tags, 'sale') FROM products;",
    hints: ['array_position() returns 1-based index', 'Returns NULL if element not found'],
    tags: ['array', 'position', 'search'],
  },
  {
    id: 'pg-array-108',
    category: 'Array Operations',
    difficulty: 'medium',
    title: 'Find All Positions in Array',
    text: 'Find all positions of "sale" in an array with duplicates',
    setup: 'Table: products (id, tags TEXT[])',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, tags TEXT[]);
INSERT INTO products (tags) VALUES (ARRAY['sale', 'featured', 'sale', 'new', 'sale']);`,
    expected: [1, 3, 5],
    sample: "SELECT array_positions(tags, 'sale') FROM products;",
    hints: [
      'array_positions() returns array of all matching indices',
      'Useful for arrays with duplicate values',
    ],
    tags: ['array', 'positions', 'search'],
  },
  {
    id: 'pg-array-109',
    category: 'Array Operations',
    difficulty: 'hard',
    title: 'Array Dimensions',
    text: 'Get the number of dimensions of a 2D array',
    setup: 'A 2D array representing a matrix',
    setupCode: `-- No table needed`,
    expected: 2,
    sample: 'SELECT array_ndims(ARRAY[[1,2,3],[4,5,6]]);',
    hints: [
      'array_ndims() returns the number of dimensions',
      '1D arrays return 1, 2D return 2, etc.',
    ],
    tags: ['array', 'dimensions', 'multidimensional'],
  },
  {
    id: 'pg-array-110',
    category: 'Array Operations',
    difficulty: 'hard',
    title: 'Array Lower and Upper Bounds',
    text: 'Get the lower and upper bounds of array indices',
    setup: 'Table with custom array bounds',
    setupCode: `-- No table needed`,
    expected: { lower: 1, upper: 5 },
    sample:
      "SELECT array_lower(ARRAY['a','b','c','d','e'], 1) as lower, array_upper(ARRAY['a','b','c','d','e'], 1) as upper;",
    hints: [
      'array_lower() gets the minimum index',
      'array_upper() gets the maximum index',
      'Second parameter is the dimension',
    ],
    tags: ['array', 'bounds', 'index'],
  },
  {
    id: 'pg-array-111',
    category: 'Array Operations',
    difficulty: 'medium',
    title: 'Array to String',
    text: 'Convert an array of tags to a comma-separated string',
    setup: 'Table: products (id, tags TEXT[])',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, tags TEXT[]);
INSERT INTO products (tags) VALUES (ARRAY['sql', 'postgres', 'database']);`,
    expected: 'sql, postgres, database',
    sample: "SELECT array_to_string(tags, ', ') FROM products;",
    hints: [
      'array_to_string() joins array elements with delimiter',
      'Similar to string join in other languages',
    ],
    tags: ['array', 'string', 'convert'],
  },
  {
    id: 'pg-array-112',
    category: 'Array Operations',
    difficulty: 'medium',
    title: 'String to Array',
    text: 'Convert a comma-separated string to an array',
    setup: 'A string of comma-separated values',
    setupCode: `-- No table needed`,
    expected: ['apple', 'banana', 'cherry'],
    sample: "SELECT string_to_array('apple,banana,cherry', ',');",
    hints: ['string_to_array() splits string by delimiter', 'Second parameter is the delimiter'],
    tags: ['array', 'string', 'convert'],
  },
  {
    id: 'pg-array-113',
    category: 'Array Operations',
    difficulty: 'hard',
    title: 'Unnest with Ordinality',
    text: 'Expand array to rows while keeping track of the original position',
    setup: 'Table: products (id, tags TEXT[])',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, tags TEXT[]);
INSERT INTO products (tags) VALUES (ARRAY['first', 'second', 'third']);`,
    expected: [
      { tag: 'first', position: 1 },
      { tag: 'second', position: 2 },
      { tag: 'third', position: 3 },
    ],
    sample: 'SELECT tag, position FROM products, unnest(tags) WITH ORDINALITY AS t(tag, position);',
    hints: [
      'WITH ORDINALITY adds a row number column',
      'Useful for preserving array order information',
    ],
    tags: ['array', 'unnest', 'ordinality'],
  },
  {
    id: 'pg-array-114',
    category: 'Array Operations',
    difficulty: 'hard',
    title: 'Parallel Unnest Multiple Arrays',
    text: 'Unnest two arrays in parallel (names and scores)',
    setup: 'Two parallel arrays representing student data',
    setupCode: `-- No table needed`,
    expected: [
      { name: 'Alice', score: 90 },
      { name: 'Bob', score: 85 },
      { name: 'Carol', score: 92 },
    ],
    sample:
      "SELECT * FROM unnest(ARRAY['Alice', 'Bob', 'Carol'], ARRAY[90, 85, 92]) AS t(name, score);",
    hints: ['unnest() can accept multiple arrays', 'Arrays are unpacked in parallel row by row'],
    tags: ['array', 'unnest', 'parallel'],
  },
  {
    id: 'pg-array-115',
    category: 'Array Operations',
    difficulty: 'medium',
    title: 'Array Distinct Elements',
    text: 'Get unique elements from an array with duplicates',
    setup: 'Table: logs (id, tags TEXT[])',
    setupCode: `CREATE TABLE logs (id SERIAL PRIMARY KEY, tags TEXT[]);
INSERT INTO logs (tags) VALUES (ARRAY['error', 'warning', 'error', 'info', 'warning']);`,
    expected: ['error', 'warning', 'info'],
    sample: 'SELECT ARRAY(SELECT DISTINCT unnest(tags)) FROM logs;',
    hints: [
      'Unnest, apply DISTINCT, then reaggregate',
      'ARRAY() constructor creates array from subquery',
    ],
    tags: ['array', 'distinct', 'unique'],
  },
  {
    id: 'pg-array-116',
    category: 'Array Operations',
    difficulty: 'hard',
    title: 'Array Intersection',
    text: 'Find common elements between two arrays',
    setup: 'Two arrays to intersect',
    setupCode: `-- No table needed`,
    expected: ['b', 'c'],
    sample:
      "SELECT ARRAY(SELECT unnest(ARRAY['a','b','c']) INTERSECT SELECT unnest(ARRAY['b','c','d']));",
    hints: ['Unnest both arrays and use INTERSECT', 'Reaggregate with ARRAY() constructor'],
    tags: ['array', 'intersection', 'set'],
  },
  {
    id: 'pg-array-117',
    category: 'Array Operations',
    difficulty: 'hard',
    title: 'Array Difference',
    text: 'Find elements in first array that are not in second array',
    setup: 'Two arrays to compare',
    setupCode: `-- No table needed`,
    expected: ['a'],
    sample:
      "SELECT ARRAY(SELECT unnest(ARRAY['a','b','c']) EXCEPT SELECT unnest(ARRAY['b','c','d']));",
    hints: [
      'Use EXCEPT to find elements only in first set',
      'Unnest both arrays before comparison',
    ],
    tags: ['array', 'difference', 'set'],
  },
  {
    id: 'pg-array-118',
    category: 'Array Operations',
    difficulty: 'medium',
    title: 'Check if Array is Empty',
    text: 'Find products with no tags (empty array)',
    setup: 'Table: products (id, tags TEXT[])',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, tags TEXT[]);
INSERT INTO products (name, tags) VALUES ('A', ARRAY['sale']), ('B', ARRAY[]::TEXT[]), ('C', NULL);`,
    expected: [{ id: 2, name: 'B' }],
    sample: "SELECT id, name FROM products WHERE tags = '{}';",
    hints: ['Empty array equals {} in PostgreSQL', 'NULL array is different from empty array'],
    tags: ['array', 'empty', 'check'],
  },
  {
    id: 'pg-array-119',
    category: 'Array Operations',
    difficulty: 'medium',
    title: 'Coalesce Empty Array',
    text: 'Return default tags if the tags array is empty or null',
    setup: 'Table: products (id, tags TEXT[])',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, tags TEXT[]);
INSERT INTO products (tags) VALUES (ARRAY['custom']), (NULL), (ARRAY[]::TEXT[]);`,
    expected: [['custom'], ['default'], ['default']],
    sample:
      "SELECT CASE WHEN tags IS NULL OR tags = '{}' THEN ARRAY['default'] ELSE tags END FROM products;",
    hints: ['Check for both NULL and empty array', 'COALESCE alone does not handle empty arrays'],
    tags: ['array', 'coalesce', 'default'],
  },
  {
    id: 'pg-array-120',
    category: 'Array Operations',
    difficulty: 'hard',
    title: 'Array Sort',
    text: 'Sort the elements within a tags array alphabetically',
    setup: 'Table: products (id, tags TEXT[])',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, tags TEXT[]);
INSERT INTO products (tags) VALUES (ARRAY['zebra', 'apple', 'mango']);`,
    expected: ['apple', 'mango', 'zebra'],
    sample: 'SELECT ARRAY(SELECT unnest(tags) ORDER BY 1) FROM products;',
    hints: ['Unnest, order, then reaggregate', 'ORDER BY 1 sorts by the first (and only) column'],
    tags: ['array', 'sort', 'order'],
  },
  {
    id: 'pg-array-121',
    category: 'Array Operations',
    difficulty: 'hard',
    title: 'Array Aggregate with Filter',
    text: 'Aggregate only non-null values into an array',
    setup: 'Table: survey (id, response TEXT)',
    setupCode: `CREATE TABLE survey (id SERIAL PRIMARY KEY, response TEXT);
INSERT INTO survey (response) VALUES ('yes'), (NULL), ('no'), (NULL), ('maybe');`,
    expected: ['yes', 'no', 'maybe'],
    sample: 'SELECT array_agg(response) FILTER (WHERE response IS NOT NULL) FROM survey;',
    hints: [
      'FILTER clause removes nulls before aggregation',
      'array_agg by default includes nulls',
    ],
    tags: ['array', 'aggregate', 'filter'],
  },
  {
    id: 'pg-array-122',
    category: 'Array Operations',
    difficulty: 'medium',
    title: 'Check Array Contains Value with ALL',
    text: 'Find products where ALL categories are in the allowed list',
    setup: 'Table: products (id, categories TEXT[])',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, categories TEXT[]);
INSERT INTO products (name, categories) VALUES
  ('A', ARRAY['electronics', 'gadgets']),
  ('B', ARRAY['electronics', 'forbidden']),
  ('C', ARRAY['gadgets']);`,
    expected: [{ id: 1 }, { id: 3 }],
    sample: "SELECT id FROM products WHERE categories <@ ARRAY['electronics', 'gadgets', 'tech'];",
    hints: [
      '<@ checks if array is contained by another',
      'All elements must be in the right-side array',
    ],
    tags: ['array', 'all', 'contained'],
  },
  {
    id: 'pg-array-123',
    category: 'Array Operations',
    difficulty: 'hard',
    title: 'Array Fill',
    text: 'Create an array of 5 zeros',
    setup: 'No table needed',
    setupCode: `-- No table needed`,
    expected: [0, 0, 0, 0, 0],
    sample: 'SELECT array_fill(0, ARRAY[5]);',
    hints: [
      'array_fill() creates array filled with value',
      'Second parameter specifies dimensions',
    ],
    tags: ['array', 'fill', 'create'],
  },
  {
    id: 'pg-array-124',
    category: 'Array Operations',
    difficulty: 'hard',
    title: 'Multidimensional Array Access',
    text: 'Access element at row 2, column 3 of a 2D array',
    setup: 'A 2D array representing a matrix',
    setupCode: `-- No table needed`,
    expected: 6,
    sample: 'SELECT (ARRAY[[1,2,3],[4,5,6]])[2][3];',
    hints: [
      'Use multiple bracket pairs for multi-dimensional access',
      'Each bracket specifies the index in that dimension',
    ],
    tags: ['array', 'multidimensional', 'access'],
  },

  // ============================================================
  // NEW PROBLEMS - BATCH 1: WINDOW FUNCTIONS EXTENDED (25 problems)
  // ============================================================
  {
    id: 'pg-window-100',
    category: 'Window Functions',
    difficulty: 'easy',
    title: 'Simple ROW_NUMBER',
    text: 'Assign sequential numbers to all employees ordered by hire date',
    setup: 'Table: employees (id, name TEXT, hire_date DATE)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, hire_date DATE);
INSERT INTO employees (name, hire_date) VALUES
  ('Alice', '2020-01-15'), ('Bob', '2019-06-01'), ('Carol', '2021-03-10');`,
    expected: [
      { name: 'Bob', row_num: 1 },
      { name: 'Alice', row_num: 2 },
      { name: 'Carol', row_num: 3 },
    ],
    sample: 'SELECT name, ROW_NUMBER() OVER (ORDER BY hire_date) AS row_num FROM employees;',
    hints: [
      'ROW_NUMBER() assigns unique sequential integers',
      'ORDER BY in OVER determines the numbering order',
    ],
    tags: ['window', 'row_number', 'basic'],
  },
  {
    id: 'pg-window-101',
    category: 'Window Functions',
    difficulty: 'medium',
    title: 'RANK with Ties',
    text: 'Rank products by price, with ties getting the same rank',
    setup: 'Table: products (id, name TEXT, price NUMERIC)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, price NUMERIC);
INSERT INTO products (name, price) VALUES ('A', 100), ('B', 100), ('C', 150), ('D', 150), ('E', 200);`,
    expected: [
      { name: 'A', rank: 1 },
      { name: 'B', rank: 1 },
      { name: 'C', rank: 3 },
      { name: 'D', rank: 3 },
      { name: 'E', rank: 5 },
    ],
    sample: 'SELECT name, RANK() OVER (ORDER BY price) AS rank FROM products;',
    hints: [
      'RANK() gives same rank to ties',
      'Leaves gaps in ranking after ties (1,1,3 not 1,1,2)',
    ],
    tags: ['window', 'rank', 'ties'],
  },
  {
    id: 'pg-window-102',
    category: 'Window Functions',
    difficulty: 'medium',
    title: 'DENSE_RANK without Gaps',
    text: 'Rank products by price without gaps in ranking numbers',
    setup: 'Table: products (id, name TEXT, price NUMERIC)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, price NUMERIC);
INSERT INTO products (name, price) VALUES ('A', 100), ('B', 100), ('C', 150), ('D', 200);`,
    expected: [
      { name: 'A', dense_rank: 1 },
      { name: 'B', dense_rank: 1 },
      { name: 'C', dense_rank: 2 },
      { name: 'D', dense_rank: 3 },
    ],
    sample: 'SELECT name, DENSE_RANK() OVER (ORDER BY price) AS dense_rank FROM products;',
    hints: ['DENSE_RANK() has no gaps after ties', 'Consecutive ranks even with tied values'],
    tags: ['window', 'dense_rank', 'ties'],
  },
  {
    id: 'pg-window-103',
    category: 'Window Functions',
    difficulty: 'medium',
    title: 'LAG with Default Value',
    text: 'Get previous sale amount, defaulting to 0 for the first row',
    setup: 'Table: sales (id, sale_date DATE, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, sale_date DATE, amount NUMERIC);
INSERT INTO sales (sale_date, amount) VALUES ('2024-01-01', 100), ('2024-01-02', 150), ('2024-01-03', 200);`,
    expected: [
      { sale_date: '2024-01-01', prev_amount: 0 },
      { sale_date: '2024-01-02', prev_amount: 100 },
      { sale_date: '2024-01-03', prev_amount: 150 },
    ],
    sample:
      'SELECT sale_date, LAG(amount, 1, 0) OVER (ORDER BY sale_date) AS prev_amount FROM sales;',
    hints: [
      'LAG accepts offset and default as parameters',
      'Second param is offset (1), third is default value',
    ],
    tags: ['window', 'lag', 'default'],
  },
  {
    id: 'pg-window-104',
    category: 'Window Functions',
    difficulty: 'medium',
    title: 'LEAD with Offset',
    text: 'Get the amount from 2 rows ahead',
    setup: 'Table: sales (id, sale_date DATE, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, sale_date DATE, amount NUMERIC);
INSERT INTO sales (sale_date, amount) VALUES
  ('2024-01-01', 100), ('2024-01-02', 150), ('2024-01-03', 200), ('2024-01-04', 250);`,
    expected: [
      { sale_date: '2024-01-01', amount_2_ahead: 200 },
      { sale_date: '2024-01-02', amount_2_ahead: 250 },
      { sale_date: '2024-01-03', amount_2_ahead: null },
      { sale_date: '2024-01-04', amount_2_ahead: null },
    ],
    sample:
      'SELECT sale_date, LEAD(amount, 2) OVER (ORDER BY sale_date) AS amount_2_ahead FROM sales;',
    hints: [
      'LEAD second parameter specifies how many rows ahead',
      'Returns NULL when offset goes beyond the partition',
    ],
    tags: ['window', 'lead', 'offset'],
  },
  {
    id: 'pg-window-105',
    category: 'Window Functions',
    difficulty: 'medium',
    title: 'Difference from Previous Row',
    text: 'Calculate the change in amount from the previous sale',
    setup: 'Table: sales (id, sale_date DATE, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, sale_date DATE, amount NUMERIC);
INSERT INTO sales (sale_date, amount) VALUES
  ('2024-01-01', 100), ('2024-01-02', 150), ('2024-01-03', 120);`,
    expected: [
      { sale_date: '2024-01-01', change: null },
      { sale_date: '2024-01-02', change: 50 },
      { sale_date: '2024-01-03', change: -30 },
    ],
    sample:
      'SELECT sale_date, amount - LAG(amount) OVER (ORDER BY sale_date) AS change FROM sales;',
    hints: ['Subtract LAG result from current value', 'First row has NULL as there is no previous'],
    tags: ['window', 'lag', 'difference'],
  },
  {
    id: 'pg-window-106',
    category: 'Window Functions',
    difficulty: 'hard',
    title: 'Percentage of Total',
    text: 'Calculate each sale as a percentage of total sales',
    setup: 'Table: sales (id, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, amount NUMERIC);
INSERT INTO sales (amount) VALUES (100), (200), (300), (400);`,
    expected: [
      { amount: 100, pct: 10 },
      { amount: 200, pct: 20 },
      { amount: 300, pct: 30 },
      { amount: 400, pct: 40 },
    ],
    sample: 'SELECT amount, ROUND(100.0 * amount / SUM(amount) OVER (), 0) AS pct FROM sales;',
    hints: [
      'SUM() OVER () with empty OVER gives total',
      'Divide each row by total, multiply by 100',
    ],
    tags: ['window', 'percentage', 'total'],
  },
  {
    id: 'pg-window-107',
    category: 'Window Functions',
    difficulty: 'hard',
    title: 'Percentage of Group Total',
    text: 'Calculate each sale as percentage of its department total',
    setup: 'Table: sales (id, department TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, department TEXT, amount NUMERIC);
INSERT INTO sales (department, amount) VALUES
  ('A', 100), ('A', 200), ('B', 150), ('B', 350);`,
    expected: [
      { department: 'A', amount: 100, pct_of_dept: 33.33 },
      { department: 'A', amount: 200, pct_of_dept: 66.67 },
      { department: 'B', amount: 150, pct_of_dept: 30 },
      { department: 'B', amount: 350, pct_of_dept: 70 },
    ],
    sample:
      'SELECT department, amount, ROUND(100.0 * amount / SUM(amount) OVER (PARTITION BY department), 2) AS pct_of_dept FROM sales;',
    hints: [
      'PARTITION BY limits the window to each department',
      'SUM with PARTITION BY gives department total',
    ],
    tags: ['window', 'percentage', 'partition'],
  },
  {
    id: 'pg-window-108',
    category: 'Window Functions',
    difficulty: 'hard',
    title: 'NTILE Distribution',
    text: 'Divide employees into 3 salary groups (terciles)',
    setup: 'Table: employees (id, name TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, salary NUMERIC);
INSERT INTO employees (name, salary) VALUES
  ('A', 30000), ('B', 40000), ('C', 50000), ('D', 60000), ('E', 70000), ('F', 80000);`,
    expected: [
      { name: 'A', tercile: 1 },
      { name: 'B', tercile: 1 },
      { name: 'C', tercile: 2 },
      { name: 'D', tercile: 2 },
      { name: 'E', tercile: 3 },
      { name: 'F', tercile: 3 },
    ],
    sample: 'SELECT name, NTILE(3) OVER (ORDER BY salary) AS tercile FROM employees;',
    hints: ['NTILE(n) divides rows into n roughly equal groups', 'Groups are numbered 1 through n'],
    tags: ['window', 'ntile', 'distribution'],
  },
  {
    id: 'pg-window-109',
    category: 'Window Functions',
    difficulty: 'hard',
    title: 'CUME_DIST - Cumulative Distribution',
    text: 'Calculate the cumulative distribution of salaries',
    setup: 'Table: employees (id, name TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, salary NUMERIC);
INSERT INTO employees (name, salary) VALUES ('A', 40000), ('B', 50000), ('C', 60000), ('D', 70000);`,
    expected: [
      { name: 'A', salary: 40000, cume_dist: 0.25 },
      { name: 'B', salary: 50000, cume_dist: 0.5 },
      { name: 'C', salary: 60000, cume_dist: 0.75 },
      { name: 'D', salary: 70000, cume_dist: 1.0 },
    ],
    sample: 'SELECT name, salary, CUME_DIST() OVER (ORDER BY salary) AS cume_dist FROM employees;',
    hints: [
      'CUME_DIST returns the relative position (0 to 1)',
      'Represents percentage of rows at or below current row',
    ],
    tags: ['window', 'cume_dist', 'distribution'],
  },
  {
    id: 'pg-window-110',
    category: 'Window Functions',
    difficulty: 'hard',
    title: 'NTH_VALUE Function',
    text: 'Get the 3rd highest salary in each department',
    setup: 'Table: employees (id, name TEXT, department TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT, salary NUMERIC);
INSERT INTO employees (name, department, salary) VALUES
  ('A', 'Eng', 90000), ('B', 'Eng', 80000), ('C', 'Eng', 70000), ('D', 'Eng', 60000),
  ('E', 'Sales', 55000), ('F', 'Sales', 50000), ('G', 'Sales', 45000);`,
    expected: [
      { department: 'Eng', third_highest: 70000 },
      { department: 'Sales', third_highest: 45000 },
    ],
    sample: `SELECT DISTINCT department,
  NTH_VALUE(salary, 3) OVER (PARTITION BY department ORDER BY salary DESC
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS third_highest
FROM employees;`,
    hints: ['NTH_VALUE gets the nth row value in the frame', 'Must specify frame to see all rows'],
    tags: ['window', 'nth_value', 'ranking'],
  },
  {
    id: 'pg-window-111',
    category: 'Window Functions',
    difficulty: 'medium',
    title: 'Count Within Partition',
    text: 'Show total employees per department alongside each employee',
    setup: 'Table: employees (id, name TEXT, department TEXT)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT);
INSERT INTO employees (name, department) VALUES
  ('Alice', 'Eng'), ('Bob', 'Eng'), ('Carol', 'Sales');`,
    expected: [
      { name: 'Alice', department: 'Eng', dept_count: 2 },
      { name: 'Bob', department: 'Eng', dept_count: 2 },
      { name: 'Carol', department: 'Sales', dept_count: 1 },
    ],
    sample:
      'SELECT name, department, COUNT(*) OVER (PARTITION BY department) AS dept_count FROM employees;',
    hints: [
      'COUNT(*) OVER with PARTITION BY counts per group',
      'Each row shows the count for its partition',
    ],
    tags: ['window', 'count', 'partition'],
  },
  {
    id: 'pg-window-112',
    category: 'Window Functions',
    difficulty: 'hard',
    title: 'Rows Between - Sum of Last 3',
    text: 'Calculate the sum of the current and previous 2 sales',
    setup: 'Table: sales (id, sale_date DATE, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, sale_date DATE, amount NUMERIC);
INSERT INTO sales (sale_date, amount) VALUES
  ('2024-01-01', 100), ('2024-01-02', 200), ('2024-01-03', 150),
  ('2024-01-04', 300), ('2024-01-05', 250);`,
    expected: [
      { sale_date: '2024-01-01', rolling_sum: 100 },
      { sale_date: '2024-01-02', rolling_sum: 300 },
      { sale_date: '2024-01-03', rolling_sum: 450 },
      { sale_date: '2024-01-04', rolling_sum: 650 },
      { sale_date: '2024-01-05', rolling_sum: 700 },
    ],
    sample: `SELECT sale_date, SUM(amount) OVER (ORDER BY sale_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS rolling_sum FROM sales;`,
    hints: ['ROWS BETWEEN defines the window frame', '2 PRECEDING means 2 rows before current'],
    tags: ['window', 'frame', 'rows-between'],
  },
  {
    id: 'pg-window-113',
    category: 'Window Functions',
    difficulty: 'hard',
    title: 'Range Between - Time-Based Window',
    text: 'Sum all sales within 2 days before the current sale',
    setup: 'Table: sales (id, sale_date DATE, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, sale_date DATE, amount NUMERIC);
INSERT INTO sales (sale_date, amount) VALUES
  ('2024-01-01', 100), ('2024-01-02', 200), ('2024-01-05', 150), ('2024-01-06', 300);`,
    expected: [
      { sale_date: '2024-01-01', sum_2_days: 100 },
      { sale_date: '2024-01-02', sum_2_days: 300 },
      { sale_date: '2024-01-05', sum_2_days: 150 },
      { sale_date: '2024-01-06', sum_2_days: 450 },
    ],
    sample: `SELECT sale_date, SUM(amount) OVER (ORDER BY sale_date RANGE BETWEEN INTERVAL '2 days' PRECEDING AND CURRENT ROW) AS sum_2_days FROM sales;`,
    hints: [
      'RANGE BETWEEN uses actual values not row count',
      'INTERVAL specifies time-based range',
    ],
    tags: ['window', 'frame', 'range-between'],
  },
  {
    id: 'pg-window-114',
    category: 'Window Functions',
    difficulty: 'medium',
    title: 'Named Window Definition',
    text: 'Use a named window to calculate multiple statistics efficiently',
    setup: 'Table: sales (id, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, amount NUMERIC);
INSERT INTO sales (amount) VALUES (100), (200), (150), (300);`,
    expected: [
      { amount: 100, running_sum: 100, running_avg: 100 },
      { amount: 200, running_sum: 300, running_avg: 150 },
      { amount: 150, running_sum: 450, running_avg: 150 },
      { amount: 300, running_sum: 750, running_avg: 187.5 },
    ],
    sample: `SELECT amount, SUM(amount) OVER w AS running_sum, AVG(amount) OVER w AS running_avg
FROM sales
WINDOW w AS (ORDER BY id);`,
    hints: [
      'WINDOW clause defines a named window',
      'Reference it with OVER w in multiple functions',
    ],
    tags: ['window', 'named', 'efficiency'],
  },
  {
    id: 'pg-window-115',
    category: 'Window Functions',
    difficulty: 'hard',
    title: 'Exclude Current Row from Frame',
    text: 'Calculate average salary excluding the current employee',
    setup: 'Table: employees (id, name TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, salary NUMERIC);
INSERT INTO employees (name, salary) VALUES ('A', 40000), ('B', 50000), ('C', 60000);`,
    expected: [
      { name: 'A', salary: 40000, avg_others: 55000 },
      { name: 'B', salary: 50000, avg_others: 50000 },
      { name: 'C', salary: 60000, avg_others: 45000 },
    ],
    sample: `SELECT name, salary, AVG(salary) OVER (ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING EXCLUDE CURRENT ROW) AS avg_others FROM employees;`,
    hints: [
      'EXCLUDE CURRENT ROW removes current row from frame',
      'Must specify explicit frame bounds to use EXCLUDE',
    ],
    tags: ['window', 'exclude', 'frame'],
  },
  {
    id: 'pg-window-116',
    category: 'Window Functions',
    difficulty: 'medium',
    title: 'Top N per Group with ROW_NUMBER',
    text: 'Get the top 2 products by sales in each category',
    setup: 'Table: products (id, category TEXT, name TEXT, sales NUMERIC)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, category TEXT, name TEXT, sales NUMERIC);
INSERT INTO products (category, name, sales) VALUES
  ('Electronics', 'Phone', 1000), ('Electronics', 'Laptop', 800), ('Electronics', 'Tablet', 600),
  ('Clothing', 'Shirt', 500), ('Clothing', 'Pants', 400), ('Clothing', 'Hat', 300);`,
    expected: [
      { category: 'Electronics', name: 'Phone' },
      { category: 'Electronics', name: 'Laptop' },
      { category: 'Clothing', name: 'Shirt' },
      { category: 'Clothing', name: 'Pants' },
    ],
    sample: `SELECT category, name FROM (
  SELECT category, name, ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC) AS rn
  FROM products
) sub WHERE rn <= 2;`,
    hints: [
      'Use ROW_NUMBER with PARTITION BY for per-group ranking',
      'Filter in outer query for top N',
    ],
    tags: ['window', 'row_number', 'top-n'],
  },
  {
    id: 'pg-window-117',
    category: 'Window Functions',
    difficulty: 'hard',
    title: 'Gaps and Islands - Identify Sequences',
    text: 'Identify consecutive sequences in data using row number difference',
    setup: 'Table: events (id, event_date DATE)',
    setupCode: `CREATE TABLE events (id SERIAL PRIMARY KEY, event_date DATE);
INSERT INTO events (event_date) VALUES
  ('2024-01-01'), ('2024-01-02'), ('2024-01-03'), ('2024-01-05'), ('2024-01-06');`,
    expected: [
      { event_date: '2024-01-01', group_id: 1 },
      { event_date: '2024-01-02', group_id: 1 },
      { event_date: '2024-01-03', group_id: 1 },
      { event_date: '2024-01-05', group_id: 2 },
      { event_date: '2024-01-06', group_id: 2 },
    ],
    sample: `SELECT event_date,
  event_date - ROW_NUMBER() OVER (ORDER BY event_date)::int AS group_id
FROM events;`,
    hints: [
      'Consecutive dates minus row numbers give same value',
      'Gaps create different group identifiers',
    ],
    tags: ['window', 'gaps-islands', 'sequences'],
  },
  {
    id: 'pg-window-118',
    category: 'Window Functions',
    difficulty: 'hard',
    title: 'Running Count of Distinct Values',
    text: 'Count distinct categories seen up to each row',
    setup: 'Table: sales (id, category TEXT)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, category TEXT);
INSERT INTO sales (category) VALUES ('A'), ('B'), ('A'), ('C'), ('B');`,
    expected: [
      { id: 1, category: 'A', distinct_so_far: 1 },
      { id: 2, category: 'B', distinct_so_far: 2 },
      { id: 3, category: 'A', distinct_so_far: 2 },
      { id: 4, category: 'C', distinct_so_far: 3 },
      { id: 5, category: 'B', distinct_so_far: 3 },
    ],
    sample: `SELECT id, category,
  (SELECT COUNT(DISTINCT s2.category) FROM sales s2 WHERE s2.id <= s1.id) AS distinct_so_far
FROM sales s1;`,
    hints: [
      'Window functions cannot directly do COUNT DISTINCT',
      'Use correlated subquery or DENSE_RANK approach',
    ],
    tags: ['window', 'distinct', 'running'],
  },
  {
    id: 'pg-window-119',
    category: 'Window Functions',
    difficulty: 'medium',
    title: 'Detect First Occurrence',
    text: 'Mark the first occurrence of each category with a flag',
    setup: 'Table: products (id, category TEXT, name TEXT)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, category TEXT, name TEXT);
INSERT INTO products (category, name) VALUES
  ('A', 'Product1'), ('B', 'Product2'), ('A', 'Product3'), ('C', 'Product4');`,
    expected: [
      { name: 'Product1', is_first: true },
      { name: 'Product2', is_first: true },
      { name: 'Product3', is_first: false },
      { name: 'Product4', is_first: true },
    ],
    sample: `SELECT name, ROW_NUMBER() OVER (PARTITION BY category ORDER BY id) = 1 AS is_first FROM products;`,
    hints: [
      'ROW_NUMBER = 1 indicates first in partition',
      'PARTITION BY category groups by category',
    ],
    tags: ['window', 'first', 'flag'],
  },
  {
    id: 'pg-window-120',
    category: 'Window Functions',
    difficulty: 'hard',
    title: 'Session Window - Group by Time Gap',
    text: 'Group events into sessions where gaps > 30 minutes start new session',
    setup: 'Table: events (id, event_time TIMESTAMP)',
    setupCode: `CREATE TABLE events (id SERIAL PRIMARY KEY, event_time TIMESTAMP);
INSERT INTO events (event_time) VALUES
  ('2024-01-01 10:00'), ('2024-01-01 10:15'), ('2024-01-01 10:20'),
  ('2024-01-01 11:00'), ('2024-01-01 11:10');`,
    expected: [
      { event_time: '2024-01-01 10:00', session_id: 1 },
      { event_time: '2024-01-01 10:15', session_id: 1 },
      { event_time: '2024-01-01 10:20', session_id: 1 },
      { event_time: '2024-01-01 11:00', session_id: 2 },
      { event_time: '2024-01-01 11:10', session_id: 2 },
    ],
    sample: `SELECT event_time, SUM(new_session) OVER (ORDER BY event_time) AS session_id
FROM (
  SELECT event_time,
    CASE WHEN event_time - LAG(event_time) OVER (ORDER BY event_time) > INTERVAL '30 minutes'
         OR LAG(event_time) OVER (ORDER BY event_time) IS NULL THEN 1 ELSE 0 END AS new_session
  FROM events
) sub;`,
    hints: ['Use LAG to find time difference from previous', 'Sum of flags creates session IDs'],
    tags: ['window', 'session', 'gaps'],
  },
  {
    id: 'pg-window-121',
    category: 'Window Functions',
    difficulty: 'medium',
    title: 'Median Using PERCENTILE_CONT',
    text: 'Calculate the median salary per department',
    setup: 'Table: employees (id, department TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, department TEXT, salary NUMERIC);
INSERT INTO employees (department, salary) VALUES
  ('Eng', 60000), ('Eng', 70000), ('Eng', 80000),
  ('Sales', 40000), ('Sales', 50000);`,
    expected: [
      { department: 'Eng', median: 70000 },
      { department: 'Sales', median: 45000 },
    ],
    sample: `SELECT DISTINCT department,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary) OVER (PARTITION BY department) AS median
FROM employees;`,
    hints: [
      'PERCENTILE_CONT can be used as window function',
      '0.5 gives the median (50th percentile)',
    ],
    tags: ['window', 'percentile', 'median'],
  },
  {
    id: 'pg-window-122',
    category: 'Window Functions',
    difficulty: 'hard',
    title: 'Cumulative Percentage',
    text: 'Calculate cumulative percentage of total sales',
    setup: 'Table: sales (id, product TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, product TEXT, amount NUMERIC);
INSERT INTO sales (product, amount) VALUES ('A', 100), ('B', 200), ('C', 300), ('D', 400);`,
    expected: [
      { product: 'D', cumulative_pct: 40 },
      { product: 'C', cumulative_pct: 70 },
      { product: 'B', cumulative_pct: 90 },
      { product: 'A', cumulative_pct: 100 },
    ],
    sample: `SELECT product,
  ROUND(100.0 * SUM(amount) OVER (ORDER BY amount DESC) / SUM(amount) OVER (), 0) AS cumulative_pct
FROM sales;`,
    hints: [
      'Running sum divided by total gives cumulative %',
      'Order by amount DESC for Pareto analysis',
    ],
    tags: ['window', 'cumulative', 'percentage'],
  },
  {
    id: 'pg-window-123',
    category: 'Window Functions',
    difficulty: 'medium',
    title: 'Row Comparison - Greater Than Average',
    text: 'Flag employees whose salary is above their department average',
    setup: 'Table: employees (id, name TEXT, department TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT, salary NUMERIC);
INSERT INTO employees (name, department, salary) VALUES
  ('A', 'Eng', 70000), ('B', 'Eng', 50000), ('C', 'Eng', 80000),
  ('D', 'Sales', 40000), ('E', 'Sales', 60000);`,
    expected: [
      { name: 'A', above_avg: true },
      { name: 'B', above_avg: false },
      { name: 'C', above_avg: true },
      { name: 'D', above_avg: false },
      { name: 'E', above_avg: true },
    ],
    sample: `SELECT name, salary > AVG(salary) OVER (PARTITION BY department) AS above_avg FROM employees;`,
    hints: [
      'Compare current row to window aggregate',
      'AVG with PARTITION BY gives department average',
    ],
    tags: ['window', 'comparison', 'average'],
  },
  {
    id: 'pg-window-124',
    category: 'Window Functions',
    difficulty: 'hard',
    title: 'MAX/MIN in Rolling Window',
    text: 'Find the maximum sale amount in the last 3 transactions',
    setup: 'Table: sales (id, sale_date DATE, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, sale_date DATE, amount NUMERIC);
INSERT INTO sales (sale_date, amount) VALUES
  ('2024-01-01', 100), ('2024-01-02', 200), ('2024-01-03', 150),
  ('2024-01-04', 50), ('2024-01-05', 300);`,
    expected: [
      { sale_date: '2024-01-01', rolling_max: 100 },
      { sale_date: '2024-01-02', rolling_max: 200 },
      { sale_date: '2024-01-03', rolling_max: 200 },
      { sale_date: '2024-01-04', rolling_max: 200 },
      { sale_date: '2024-01-05', rolling_max: 300 },
    ],
    sample: `SELECT sale_date, MAX(amount) OVER (ORDER BY sale_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS rolling_max FROM sales;`,
    hints: ['MAX/MIN work with window frames', 'ROWS BETWEEN defines the sliding window'],
    tags: ['window', 'max', 'rolling'],
  },

  // ============================================================
  // NEW PROBLEMS - BATCH 1: CTEs EXTENDED (25 problems)
  // ============================================================
  {
    id: 'pg-cte-100',
    category: 'CTEs',
    difficulty: 'easy',
    title: 'Simple CTE for Readability',
    text: 'Use a CTE to separate the filtering logic from the main query',
    setup: 'Table: orders (id, customer_id INTEGER, amount NUMERIC, status TEXT)',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, customer_id INTEGER, amount NUMERIC, status TEXT);
INSERT INTO orders (customer_id, amount, status) VALUES
  (1, 100, 'completed'), (1, 200, 'completed'), (2, 150, 'pending'), (2, 300, 'completed');`,
    expected: [
      { customer_id: 1, total: 300 },
      { customer_id: 2, total: 300 },
    ],
    sample: `WITH completed_orders AS (
  SELECT * FROM orders WHERE status = 'completed'
)
SELECT customer_id, SUM(amount) AS total FROM completed_orders GROUP BY customer_id;`,
    hints: ['CTEs improve query readability', 'Filter in CTE, aggregate in main query'],
    tags: ['cte', 'readability', 'filter'],
  },
  {
    id: 'pg-cte-101',
    category: 'CTEs',
    difficulty: 'medium',
    title: 'CTE Referencing Another CTE',
    text: 'Create a CTE that references a previously defined CTE',
    setup: 'Table: sales (id, product TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, product TEXT, amount NUMERIC);
INSERT INTO sales (product, amount) VALUES ('A', 100), ('B', 200), ('A', 150), ('C', 300);`,
    expected: [{ product: 'C' }],
    sample: `WITH product_totals AS (
  SELECT product, SUM(amount) AS total FROM sales GROUP BY product
),
avg_total AS (
  SELECT AVG(total) AS avg_amount FROM product_totals
)
SELECT product FROM product_totals, avg_total WHERE total > avg_amount;`,
    hints: ['Later CTEs can reference earlier ones', 'Build complex logic step by step'],
    tags: ['cte', 'chained', 'reference'],
  },
  {
    id: 'pg-cte-102',
    category: 'CTEs',
    difficulty: 'medium',
    title: 'CTE with INSERT',
    text: 'Use a CTE to insert data and capture the inserted rows',
    setup: 'Table: audit_log (id, action TEXT, timestamp TIMESTAMP)',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE audit_log (id SERIAL PRIMARY KEY, action TEXT, timestamp TIMESTAMP DEFAULT NOW());`,
    expected: { action: 'Created user: John' },
    sample: `WITH new_user AS (
  INSERT INTO users (name) VALUES ('John') RETURNING *
)
INSERT INTO audit_log (action) SELECT 'Created user: ' || name FROM new_user RETURNING action;`,
    hints: ['CTEs can contain INSERT with RETURNING', 'Use result to cascade to other tables'],
    tags: ['cte', 'insert', 'returning'],
  },
  {
    id: 'pg-cte-103',
    category: 'CTEs',
    difficulty: 'medium',
    title: 'CTE with DELETE',
    text: 'Delete old records and count how many were removed',
    setup: 'Table: sessions (id, created_at TIMESTAMP)',
    setupCode: `CREATE TABLE sessions (id SERIAL PRIMARY KEY, created_at TIMESTAMP);
INSERT INTO sessions (created_at) VALUES
  ('2024-01-01'), ('2024-01-15'), ('2024-06-01');`,
    expected: { deleted_count: 2 },
    sample: `WITH deleted AS (
  DELETE FROM sessions WHERE created_at < '2024-02-01' RETURNING *
)
SELECT COUNT(*) AS deleted_count FROM deleted;`,
    hints: [
      'DELETE with RETURNING captures deleted rows',
      'CTE allows further processing of deleted data',
    ],
    tags: ['cte', 'delete', 'count'],
  },
  {
    id: 'pg-cte-104',
    category: 'CTEs',
    difficulty: 'hard',
    title: 'Recursive CTE - Fibonacci Sequence',
    text: 'Generate the first 10 Fibonacci numbers using recursive CTE',
    setup: 'No table needed',
    setupCode: `-- No table needed`,
    expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34],
    sample: `WITH RECURSIVE fib AS (
  SELECT 0 AS n, 0 AS fib_n, 1 AS fib_next
  UNION ALL
  SELECT n + 1, fib_next, fib_n + fib_next FROM fib WHERE n < 9
)
SELECT fib_n FROM fib;`,
    hints: [
      'Track both current and next Fibonacci number',
      'Each iteration shifts the pair forward',
    ],
    tags: ['cte', 'recursive', 'fibonacci'],
  },
  {
    id: 'pg-cte-105',
    category: 'CTEs',
    difficulty: 'hard',
    title: 'Recursive CTE - Date Series',
    text: 'Generate all dates in January 2024 using recursive CTE',
    setup: 'No table needed',
    setupCode: `-- No table needed`,
    expected: '31 dates from 2024-01-01 to 2024-01-31',
    sample: `WITH RECURSIVE dates AS (
  SELECT '2024-01-01'::date AS d
  UNION ALL
  SELECT d + 1 FROM dates WHERE d < '2024-01-31'
)
SELECT d FROM dates;`,
    hints: [
      'Start with first date, add 1 each iteration',
      'Stop condition prevents infinite recursion',
    ],
    tags: ['cte', 'recursive', 'dates'],
  },
  {
    id: 'pg-cte-106',
    category: 'CTEs',
    difficulty: 'hard',
    title: 'Recursive CTE - Bill of Materials',
    text: 'Find all components needed to build a product (recursive BOM)',
    setup: 'Table: bom (parent_id INTEGER, child_id INTEGER, quantity INTEGER)',
    setupCode: `CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE bom (parent_id INTEGER, child_id INTEGER, quantity INTEGER);
INSERT INTO products VALUES (1, 'Car'), (2, 'Engine'), (3, 'Wheel'), (4, 'Piston'), (5, 'Tire');
INSERT INTO bom VALUES (1, 2, 1), (1, 3, 4), (2, 4, 4), (3, 5, 1);`,
    expected: [
      { component: 'Engine', qty: 1, level: 1 },
      { component: 'Wheel', qty: 4, level: 1 },
      { component: 'Piston', qty: 4, level: 2 },
      { component: 'Tire', qty: 1, level: 2 },
    ],
    sample: `WITH RECURSIVE parts AS (
  SELECT child_id, quantity, 1 AS level FROM bom WHERE parent_id = 1
  UNION ALL
  SELECT b.child_id, b.quantity, p.level + 1
  FROM bom b JOIN parts p ON b.parent_id = p.child_id
)
SELECT pr.name AS component, pa.quantity AS qty, pa.level FROM parts pa JOIN products pr ON pa.child_id = pr.id;`,
    hints: ['Start with direct children of the product', 'Recursively find children of children'],
    tags: ['cte', 'recursive', 'bom', 'hierarchy'],
  },
  {
    id: 'pg-cte-107',
    category: 'CTEs',
    difficulty: 'hard',
    title: 'Recursive CTE - Shortest Path',
    text: 'Find the shortest path between two nodes in a graph',
    setup: 'Table: edges (from_node INTEGER, to_node INTEGER)',
    setupCode: `CREATE TABLE edges (from_node INTEGER, to_node INTEGER);
INSERT INTO edges VALUES (1, 2), (2, 3), (3, 4), (1, 5), (5, 4);`,
    expected: { path: [1, 5, 4], length: 2 },
    sample: `WITH RECURSIVE paths AS (
  SELECT from_node, ARRAY[from_node, to_node] AS path, 1 AS length
  FROM edges WHERE from_node = 1
  UNION ALL
  SELECT p.from_node, p.path || e.to_node, p.length + 1
  FROM paths p JOIN edges e ON p.path[array_upper(p.path, 1)] = e.from_node
  WHERE NOT e.to_node = ANY(p.path)
)
SELECT path, length FROM paths WHERE path[array_upper(path, 1)] = 4 ORDER BY length LIMIT 1;`,
    hints: ['Track the path as an array', 'Prevent cycles by checking if node already in path'],
    tags: ['cte', 'recursive', 'graph', 'shortest-path'],
  },
  {
    id: 'pg-cte-108',
    category: 'CTEs',
    difficulty: 'medium',
    title: 'CTE MATERIALIZED',
    text: 'Force the CTE to be evaluated only once using MATERIALIZED',
    setup: 'Table: large_table (id, value INTEGER)',
    setupCode: `CREATE TABLE large_table (id SERIAL PRIMARY KEY, value INTEGER);
INSERT INTO large_table (value) SELECT generate_series(1, 1000);`,
    expected: 'CTE evaluated once, results reused',
    sample: `WITH stats AS MATERIALIZED (
  SELECT AVG(value) AS avg_val, STDDEV(value) AS stddev_val FROM large_table
)
SELECT * FROM large_table, stats WHERE value > avg_val + stddev_val;`,
    hints: [
      'MATERIALIZED forces CTE to be computed once',
      'Useful when CTE is referenced multiple times',
    ],
    tags: ['cte', 'materialized', 'optimization'],
  },
  {
    id: 'pg-cte-109',
    category: 'CTEs',
    difficulty: 'medium',
    title: 'CTE NOT MATERIALIZED',
    text: 'Allow the optimizer to inline the CTE using NOT MATERIALIZED',
    setup: 'Table: orders (id, amount NUMERIC)',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, amount NUMERIC);
INSERT INTO orders (amount) SELECT random() * 1000 FROM generate_series(1, 100);`,
    expected: 'CTE inlined for optimizer flexibility',
    sample: `WITH filtered AS NOT MATERIALIZED (
  SELECT * FROM orders WHERE amount > 500
)
SELECT * FROM filtered WHERE amount < 800;`,
    hints: ['NOT MATERIALIZED allows query optimization', 'Optimizer can push predicates into CTE'],
    tags: ['cte', 'not-materialized', 'optimization'],
  },
  {
    id: 'pg-cte-110',
    category: 'CTEs',
    difficulty: 'hard',
    title: 'Recursive CTE with Depth Limit',
    text: 'Traverse hierarchy but limit depth to 3 levels',
    setup: 'Table: categories (id, name TEXT, parent_id INTEGER)',
    setupCode: `CREATE TABLE categories (id SERIAL PRIMARY KEY, name TEXT, parent_id INTEGER);
INSERT INTO categories (name, parent_id) VALUES
  ('Root', NULL), ('L1A', 1), ('L1B', 1), ('L2A', 2), ('L2B', 2), ('L3A', 4);`,
    expected: 'Categories up to 3 levels deep',
    sample: `WITH RECURSIVE cat_tree AS (
  SELECT id, name, 1 AS depth FROM categories WHERE parent_id IS NULL
  UNION ALL
  SELECT c.id, c.name, ct.depth + 1
  FROM categories c JOIN cat_tree ct ON c.parent_id = ct.id
  WHERE ct.depth < 3
)
SELECT * FROM cat_tree;`,
    hints: ['Track depth in recursive CTE', 'Add WHERE clause to limit recursion depth'],
    tags: ['cte', 'recursive', 'depth-limit'],
  },
  {
    id: 'pg-cte-111',
    category: 'CTEs',
    difficulty: 'hard',
    title: 'Recursive CTE - Running Total',
    text: 'Calculate running balance for a bank account using recursive CTE',
    setup: 'Table: transactions (id, amount NUMERIC, trans_date DATE)',
    setupCode: `CREATE TABLE transactions (id SERIAL PRIMARY KEY, amount NUMERIC, trans_date DATE);
INSERT INTO transactions (amount, trans_date) VALUES
  (1000, '2024-01-01'), (-200, '2024-01-02'), (500, '2024-01-03'), (-100, '2024-01-04');`,
    expected: [
      { trans_date: '2024-01-01', balance: 1000 },
      { trans_date: '2024-01-02', balance: 800 },
      { trans_date: '2024-01-03', balance: 1300 },
      { trans_date: '2024-01-04', balance: 1200 },
    ],
    sample: `WITH RECURSIVE running AS (
  SELECT id, trans_date, amount, amount AS balance
  FROM transactions WHERE id = 1
  UNION ALL
  SELECT t.id, t.trans_date, t.amount, r.balance + t.amount
  FROM transactions t JOIN running r ON t.id = r.id + 1
)
SELECT trans_date, balance FROM running;`,
    hints: [
      'Start from first transaction',
      'Each iteration adds current amount to previous balance',
    ],
    tags: ['cte', 'recursive', 'running-total'],
  },
  {
    id: 'pg-cte-112',
    category: 'CTEs',
    difficulty: 'medium',
    title: 'CTE for Pivot Table',
    text: 'Use CTEs to create a pivot table of sales by quarter',
    setup: 'Table: sales (id, product TEXT, quarter INTEGER, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, product TEXT, quarter INTEGER, amount NUMERIC);
INSERT INTO sales (product, quarter, amount) VALUES
  ('A', 1, 100), ('A', 2, 150), ('A', 3, 200),
  ('B', 1, 80), ('B', 2, 120), ('B', 4, 180);`,
    expected: [
      { product: 'A', q1: 100, q2: 150, q3: 200, q4: null },
      { product: 'B', q1: 80, q2: 120, q3: null, q4: 180 },
    ],
    sample: `WITH quarterly AS (
  SELECT product,
    SUM(amount) FILTER (WHERE quarter = 1) AS q1,
    SUM(amount) FILTER (WHERE quarter = 2) AS q2,
    SUM(amount) FILTER (WHERE quarter = 3) AS q3,
    SUM(amount) FILTER (WHERE quarter = 4) AS q4
  FROM sales GROUP BY product
)
SELECT * FROM quarterly;`,
    hints: ['Use FILTER clause for conditional aggregation', 'Each column represents one quarter'],
    tags: ['cte', 'pivot', 'filter'],
  },
  {
    id: 'pg-cte-113',
    category: 'CTEs',
    difficulty: 'hard',
    title: 'Recursive CTE - Generate Permutations',
    text: 'Generate all permutations of array [1, 2, 3]',
    setup: 'No table needed',
    setupCode: `-- No table needed`,
    expected: [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ],
    sample: `WITH RECURSIVE perms AS (
  SELECT ARRAY[x] AS perm, ARRAY[x] AS used FROM unnest(ARRAY[1,2,3]) AS x
  UNION ALL
  SELECT p.perm || x, p.used || x
  FROM perms p, unnest(ARRAY[1,2,3]) AS x
  WHERE NOT x = ANY(p.used)
)
SELECT perm FROM perms WHERE array_length(perm, 1) = 3;`,
    hints: [
      'Build permutation by adding unused elements',
      'Track used elements to avoid duplicates',
    ],
    tags: ['cte', 'recursive', 'permutations'],
  },
  {
    id: 'pg-cte-114',
    category: 'CTEs',
    difficulty: 'medium',
    title: 'CTE with Window Function',
    text: 'Combine CTE with window function for ranking within groups',
    setup: 'Table: products (id, category TEXT, name TEXT, sales NUMERIC)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, category TEXT, name TEXT, sales NUMERIC);
INSERT INTO products (category, name, sales) VALUES
  ('A', 'P1', 100), ('A', 'P2', 200), ('B', 'P3', 150), ('B', 'P4', 300);`,
    expected: [
      { category: 'A', name: 'P2' },
      { category: 'B', name: 'P4' },
    ],
    sample: `WITH ranked AS (
  SELECT category, name, RANK() OVER (PARTITION BY category ORDER BY sales DESC) AS rnk
  FROM products
)
SELECT category, name FROM ranked WHERE rnk = 1;`,
    hints: ['Calculate rank in CTE', 'Filter for rank = 1 in main query'],
    tags: ['cte', 'window', 'rank'],
  },
  {
    id: 'pg-cte-115',
    category: 'CTEs',
    difficulty: 'hard',
    title: 'Recursive CTE - Transitive Closure',
    text: 'Find all nodes reachable from node 1 in a directed graph',
    setup: 'Table: edges (from_node INTEGER, to_node INTEGER)',
    setupCode: `CREATE TABLE edges (from_node INTEGER, to_node INTEGER);
INSERT INTO edges VALUES (1, 2), (2, 3), (3, 4), (2, 5), (5, 6);`,
    expected: [2, 3, 4, 5, 6],
    sample: `WITH RECURSIVE reachable AS (
  SELECT to_node FROM edges WHERE from_node = 1
  UNION
  SELECT e.to_node FROM edges e JOIN reachable r ON e.from_node = r.to_node
)
SELECT to_node FROM reachable;`,
    hints: [
      'UNION (not UNION ALL) avoids duplicates',
      'Finds all directly and indirectly reachable nodes',
    ],
    tags: ['cte', 'recursive', 'graph', 'reachability'],
  },
  {
    id: 'pg-cte-116',
    category: 'CTEs',
    difficulty: 'medium',
    title: 'CTE with UNION of Different Sources',
    text: 'Combine data from multiple tables into a unified view',
    setup: 'Tables: online_sales, store_sales',
    setupCode: `CREATE TABLE online_sales (id SERIAL, product TEXT, amount NUMERIC);
CREATE TABLE store_sales (id SERIAL, product TEXT, amount NUMERIC);
INSERT INTO online_sales (product, amount) VALUES ('A', 100), ('B', 200);
INSERT INTO store_sales (product, amount) VALUES ('A', 150), ('C', 300);`,
    expected: [
      { product: 'A', total: 250 },
      { product: 'B', total: 200 },
      { product: 'C', total: 300 },
    ],
    sample: `WITH all_sales AS (
  SELECT product, amount FROM online_sales
  UNION ALL
  SELECT product, amount FROM store_sales
)
SELECT product, SUM(amount) AS total FROM all_sales GROUP BY product;`,
    hints: ['UNION ALL combines all rows from both tables', 'Aggregate in the main query'],
    tags: ['cte', 'union', 'combine'],
  },
  {
    id: 'pg-cte-117',
    category: 'CTEs',
    difficulty: 'hard',
    title: 'Recursive CTE - Employee Total Compensation',
    text: 'Calculate total team compensation including all reports',
    setup: 'Table: employees (id, name TEXT, manager_id INTEGER, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, manager_id INTEGER, salary NUMERIC);
INSERT INTO employees (name, manager_id, salary) VALUES
  ('CEO', NULL, 200000), ('VP1', 1, 150000), ('VP2', 1, 150000),
  ('Mgr1', 2, 100000), ('Emp1', 4, 60000), ('Emp2', 4, 55000);`,
    expected: { name: 'CEO', team_total: 715000 },
    sample: `WITH RECURSIVE team AS (
  SELECT id, name, salary FROM employees WHERE id = 1
  UNION ALL
  SELECT e.id, e.name, e.salary FROM employees e JOIN team t ON e.manager_id = t.id
)
SELECT 'CEO' AS name, SUM(salary) AS team_total FROM team;`,
    hints: ['Recursively find all reports', 'Sum salaries of everyone in the hierarchy'],
    tags: ['cte', 'recursive', 'hierarchy', 'aggregate'],
  },
  {
    id: 'pg-cte-118',
    category: 'CTEs',
    difficulty: 'medium',
    title: 'CTE for Data Transformation',
    text: 'Use CTE to normalize inconsistent data before aggregation',
    setup: 'Table: raw_data (id, category TEXT, value NUMERIC)',
    setupCode: `CREATE TABLE raw_data (id SERIAL PRIMARY KEY, category TEXT, value NUMERIC);
INSERT INTO raw_data (category, value) VALUES ('cat_a', 100), ('CAT_A', 200), ('Cat_A', 150), ('cat_b', 300);`,
    expected: [
      { category: 'cat_a', total: 450 },
      { category: 'cat_b', total: 300 },
    ],
    sample: `WITH normalized AS (
  SELECT LOWER(category) AS category, value FROM raw_data
)
SELECT category, SUM(value) AS total FROM normalized GROUP BY category;`,
    hints: ['Transform data in CTE', 'Query transformed data in main select'],
    tags: ['cte', 'transform', 'normalize'],
  },
  {
    id: 'pg-cte-119',
    category: 'CTEs',
    difficulty: 'hard',
    title: 'Recursive CTE - Number Partitions',
    text: 'Generate all ways to partition number 4 into sums',
    setup: 'No table needed',
    setupCode: `-- No table needed`,
    expected: [[4], [3, 1], [2, 2], [2, 1, 1], [1, 1, 1, 1]],
    sample: `WITH RECURSIVE partitions AS (
  SELECT 4 AS remaining, ARRAY[]::int[] AS parts, 4 AS max_part
  UNION ALL
  SELECT remaining - x, parts || x, x
  FROM partitions, generate_series(1, LEAST(remaining, max_part)) AS x
  WHERE remaining > 0
)
SELECT parts FROM partitions WHERE remaining = 0;`,
    hints: [
      'Track remaining sum and maximum part allowed',
      'Generate series up to min of remaining and max_part',
    ],
    tags: ['cte', 'recursive', 'partitions', 'combinatorics'],
  },
  {
    id: 'pg-cte-120',
    category: 'CTEs',
    difficulty: 'medium',
    title: 'CTE with EXISTS Subquery',
    text: 'Find customers who have at least one completed order',
    setup: 'Tables: customers, orders',
    setupCode: `CREATE TABLE customers (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE orders (id SERIAL, customer_id INTEGER, status TEXT);
INSERT INTO customers (name) VALUES ('Alice'), ('Bob'), ('Carol');
INSERT INTO orders (customer_id, status) VALUES (1, 'completed'), (1, 'pending'), (2, 'pending');`,
    expected: [{ name: 'Alice' }],
    sample: `WITH completed AS (
  SELECT DISTINCT customer_id FROM orders WHERE status = 'completed'
)
SELECT c.name FROM customers c WHERE EXISTS (SELECT 1 FROM completed WHERE customer_id = c.id);`,
    hints: ['CTE identifies customers with completed orders', 'EXISTS checks for matching rows'],
    tags: ['cte', 'exists', 'subquery'],
  },
  {
    id: 'pg-cte-121',
    category: 'CTEs',
    difficulty: 'hard',
    title: 'Recursive CTE - Parse Nested Structure',
    text: 'Extract all leaf nodes from a nested category structure',
    setup: 'Table: categories (id, name TEXT, parent_id INTEGER)',
    setupCode: `CREATE TABLE categories (id SERIAL PRIMARY KEY, name TEXT, parent_id INTEGER);
INSERT INTO categories (name, parent_id) VALUES
  ('Root', NULL), ('Branch1', 1), ('Branch2', 1), ('Leaf1', 2), ('Leaf2', 2), ('Leaf3', 3);`,
    expected: ['Leaf1', 'Leaf2', 'Leaf3'],
    sample: `WITH RECURSIVE all_cats AS (
  SELECT id, name FROM categories WHERE parent_id IS NULL
  UNION ALL
  SELECT c.id, c.name FROM categories c JOIN all_cats a ON c.parent_id = a.id
)
SELECT name FROM all_cats WHERE NOT EXISTS (
  SELECT 1 FROM categories WHERE parent_id = all_cats.id
);`,
    hints: ['Leaf nodes have no children', 'Use NOT EXISTS to find nodes with no children'],
    tags: ['cte', 'recursive', 'leaf-nodes'],
  },
  {
    id: 'pg-cte-122',
    category: 'CTEs',
    difficulty: 'medium',
    title: 'CTE for Deduplication',
    text: 'Remove duplicate rows keeping the one with highest ID',
    setup: 'Table: entries (id, email TEXT, name TEXT)',
    setupCode: `CREATE TABLE entries (id SERIAL PRIMARY KEY, email TEXT, name TEXT);
INSERT INTO entries (email, name) VALUES
  ('a@test.com', 'Alice'), ('b@test.com', 'Bob'), ('a@test.com', 'Alice Updated');`,
    expected: [
      { email: 'a@test.com', name: 'Alice Updated' },
      { email: 'b@test.com', name: 'Bob' },
    ],
    sample: `WITH ranked AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY email ORDER BY id DESC) AS rn FROM entries
)
SELECT email, name FROM ranked WHERE rn = 1;`,
    hints: ['Use ROW_NUMBER to rank duplicates', 'Keep only the first (rn = 1)'],
    tags: ['cte', 'deduplication', 'row_number'],
  },
  {
    id: 'pg-cte-123',
    category: 'CTEs',
    difficulty: 'hard',
    title: 'Recursive CTE - Expand Ranges',
    text: 'Expand a range of consecutive integers into individual rows',
    setup: 'Table: ranges (start_num INTEGER, end_num INTEGER)',
    setupCode: `CREATE TABLE ranges (id SERIAL PRIMARY KEY, start_num INTEGER, end_num INTEGER);
INSERT INTO ranges (start_num, end_num) VALUES (1, 3), (10, 12);`,
    expected: [1, 2, 3, 10, 11, 12],
    sample: `WITH RECURSIVE expanded AS (
  SELECT id, start_num AS num, end_num FROM ranges
  UNION ALL
  SELECT id, num + 1, end_num FROM expanded WHERE num < end_num
)
SELECT num FROM expanded ORDER BY id, num;`,
    hints: ['Start with start_num for each range', 'Increment until reaching end_num'],
    tags: ['cte', 'recursive', 'expand', 'range'],
  },
  {
    id: 'pg-cte-124',
    category: 'CTEs',
    difficulty: 'medium',
    title: 'CTE for Complex Join Logic',
    text: 'Use CTEs to break down complex join into manageable parts',
    setup: 'Tables: orders, order_items, products',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, price NUMERIC);
CREATE TABLE orders (id SERIAL PRIMARY KEY, customer_id INTEGER);
CREATE TABLE order_items (id SERIAL, order_id INTEGER, product_id INTEGER, quantity INTEGER);
INSERT INTO products (name, price) VALUES ('A', 10), ('B', 20);
INSERT INTO orders (customer_id) VALUES (1), (2);
INSERT INTO order_items (order_id, product_id, quantity) VALUES (1, 1, 2), (1, 2, 1), (2, 1, 3);`,
    expected: [
      { order_id: 1, total: 40 },
      { order_id: 2, total: 30 },
    ],
    sample: `WITH item_totals AS (
  SELECT oi.order_id, SUM(oi.quantity * p.price) AS total
  FROM order_items oi JOIN products p ON oi.product_id = p.id
  GROUP BY oi.order_id
)
SELECT order_id, total FROM item_totals;`,
    hints: ['Calculate intermediate results in CTE', 'Main query becomes simpler and clearer'],
    tags: ['cte', 'join', 'organization'],
  },

  // ============================================================
  // NEW PROBLEMS - BATCH 2: FULL-TEXT SEARCH EXTENDED (25 problems)
  // ============================================================
  {
    id: 'pg-fts-100',
    category: 'Full-Text Search',
    difficulty: 'easy',
    title: 'Simple Word Search',
    text: 'Find all documents containing the word "postgresql"',
    setup: 'Table: documents (id, content TEXT)',
    setupCode: `CREATE TABLE documents (id SERIAL PRIMARY KEY, content TEXT);
INSERT INTO documents (content) VALUES
  ('PostgreSQL is a powerful database'),
  ('MySQL is another popular database'),
  ('PostgreSQL supports full-text search');`,
    expected: [{ id: 1 }, { id: 3 }],
    sample:
      "SELECT id FROM documents WHERE to_tsvector('english', content) @@ to_tsquery('postgresql');",
    hints: [
      'to_tsvector converts text to searchable format',
      '@@ is the text search match operator',
    ],
    tags: ['full-text', 'basic', 'search'],
  },
  {
    id: 'pg-fts-101',
    category: 'Full-Text Search',
    difficulty: 'easy',
    title: 'Plainto_tsquery for Simple Searches',
    text: 'Search using plain text input without special operators',
    setup: 'Table: articles (id, title TEXT, body TEXT)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, title TEXT, body TEXT);
INSERT INTO articles (title, body) VALUES
  ('Database Guide', 'Learn about database design patterns'),
  ('Web Development', 'Building modern web applications'),
  ('Database Optimization', 'Optimize your database queries');`,
    expected: [{ id: 1 }, { id: 3 }],
    sample:
      "SELECT id FROM articles WHERE to_tsvector(body) @@ plainto_tsquery('database patterns');",
    hints: [
      'plainto_tsquery converts plain text to tsquery',
      'Words are joined with AND by default',
    ],
    tags: ['full-text', 'plainto_tsquery', 'simple'],
  },
  {
    id: 'pg-fts-102',
    category: 'Full-Text Search',
    difficulty: 'medium',
    title: 'Websearch_to_tsquery for User Input',
    text: 'Use websearch syntax for user-friendly search queries',
    setup: 'Table: articles (id, content TEXT)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, content TEXT);
INSERT INTO articles (content) VALUES
  ('PostgreSQL database administration'),
  ('MySQL database management'),
  ('PostgreSQL performance tuning');`,
    expected: [{ id: 1 }, { id: 3 }],
    sample:
      "SELECT id FROM articles WHERE to_tsvector(content) @@ websearch_to_tsquery('postgresql -mysql');",
    hints: [
      'websearch_to_tsquery supports Google-like syntax',
      'Use - for NOT, quotes for phrases',
    ],
    tags: ['full-text', 'websearch', 'user-friendly'],
  },
  {
    id: 'pg-fts-103',
    category: 'Full-Text Search',
    difficulty: 'medium',
    title: 'Phrase Search with Adjacency',
    text: 'Find documents where "database" is immediately followed by "design"',
    setup: 'Table: articles (id, content TEXT)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, content TEXT);
INSERT INTO articles (content) VALUES
  ('Learn database design principles'),
  ('Database and design patterns'),
  ('Good database design matters');`,
    expected: [{ id: 1 }, { id: 3 }],
    sample:
      "SELECT id FROM articles WHERE to_tsvector(content) @@ to_tsquery('database <-> design');",
    hints: ['<-> means immediately adjacent', 'Phrase search requires words in exact order'],
    tags: ['full-text', 'phrase', 'adjacency'],
  },
  {
    id: 'pg-fts-104',
    category: 'Full-Text Search',
    difficulty: 'medium',
    title: 'Prefix Search with Wildcard',
    text: 'Find documents containing words starting with "data"',
    setup: 'Table: articles (id, content TEXT)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, content TEXT);
INSERT INTO articles (content) VALUES
  ('Database management systems'),
  ('Data science fundamentals'),
  ('Web development basics');`,
    expected: [{ id: 1 }, { id: 2 }],
    sample: "SELECT id FROM articles WHERE to_tsvector(content) @@ to_tsquery('data:*');",
    hints: [
      ':* suffix matches any word starting with prefix',
      'Useful for autocomplete functionality',
    ],
    tags: ['full-text', 'prefix', 'wildcard'],
  },
  {
    id: 'pg-fts-105',
    category: 'Full-Text Search',
    difficulty: 'medium',
    title: 'Search Multiple Columns',
    text: 'Search across both title and body columns with different weights',
    setup: 'Table: articles (id, title TEXT, body TEXT)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, title TEXT, body TEXT);
INSERT INTO articles (title, body) VALUES
  ('PostgreSQL Guide', 'Learn SQL basics'),
  ('SQL Basics', 'Introduction to PostgreSQL'),
  ('Web Development', 'Building applications');`,
    expected: [{ id: 1 }, { id: 2 }],
    sample: `SELECT id FROM articles
WHERE to_tsvector(title) || to_tsvector(body) @@ to_tsquery('postgresql');`,
    hints: ['Concatenate tsvectors with ||', 'Search applies to combined vector'],
    tags: ['full-text', 'multiple-columns', 'concatenate'],
  },
  {
    id: 'pg-fts-106',
    category: 'Full-Text Search',
    difficulty: 'hard',
    title: 'Weighted Text Search',
    text: 'Give title matches higher weight than body matches using setweight',
    setup: 'Table: articles (id, title TEXT, body TEXT)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, title TEXT, body TEXT);
INSERT INTO articles (title, body) VALUES
  ('PostgreSQL Guide', 'General database information'),
  ('Database Info', 'Learn PostgreSQL basics');`,
    expected: 'Article 1 ranks higher due to title match',
    sample: `SELECT id, ts_rank(
  setweight(to_tsvector(title), 'A') || setweight(to_tsvector(body), 'B'),
  to_tsquery('postgresql')
) AS rank
FROM articles WHERE to_tsvector(title || ' ' || body) @@ to_tsquery('postgresql')
ORDER BY rank DESC;`,
    hints: [
      'setweight assigns importance (A highest, D lowest)',
      'ts_rank considers weights in scoring',
    ],
    tags: ['full-text', 'weight', 'ranking'],
  },
  {
    id: 'pg-fts-107',
    category: 'Full-Text Search',
    difficulty: 'hard',
    title: 'ts_rank_cd - Cover Density Ranking',
    text: 'Use cover density ranking for better phrase proximity scoring',
    setup: 'Table: articles (id, content TEXT)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, content TEXT);
INSERT INTO articles (content) VALUES
  ('PostgreSQL database performance and database optimization'),
  ('Database performance tuning for PostgreSQL systems');`,
    expected: 'Article with closer matching words ranks higher',
    sample: `SELECT id, ts_rank_cd(to_tsvector(content), to_tsquery('postgresql & database')) AS rank
FROM articles WHERE to_tsvector(content) @@ to_tsquery('postgresql & database')
ORDER BY rank DESC;`,
    hints: ['ts_rank_cd considers proximity of matching terms', 'Better for multi-word queries'],
    tags: ['full-text', 'rank_cd', 'proximity'],
  },
  {
    id: 'pg-fts-108',
    category: 'Full-Text Search',
    difficulty: 'medium',
    title: 'Highlight with Custom Markers',
    text: 'Highlight search matches with custom HTML tags',
    setup: 'Table: articles (id, content TEXT)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, content TEXT);
INSERT INTO articles (content) VALUES ('PostgreSQL is a powerful database system');`,
    expected: '<mark>PostgreSQL</mark> is a powerful <mark>database</mark> system',
    sample: `SELECT ts_headline(content, to_tsquery('postgresql | database'),
  'StartSel=<mark>, StopSel=</mark>, MaxWords=50, MinWords=10')
FROM articles;`,
    hints: ['ts_headline accepts formatting options', 'StartSel/StopSel define highlight markers'],
    tags: ['full-text', 'headline', 'highlight'],
  },
  {
    id: 'pg-fts-109',
    category: 'Full-Text Search',
    difficulty: 'hard',
    title: 'Full-Text Index - GIN',
    text: 'Create a GIN index on a tsvector column for fast searching',
    setup: 'Table: articles with tsvector column',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, content TEXT, content_tsv TSVECTOR);
INSERT INTO articles (content) VALUES ('PostgreSQL full-text search');
UPDATE articles SET content_tsv = to_tsvector('english', content);`,
    expected: 'Index created for fast full-text search',
    sample: `CREATE INDEX idx_articles_content ON articles USING GIN (content_tsv);
-- Then search using the indexed column:
SELECT * FROM articles WHERE content_tsv @@ to_tsquery('postgresql');`,
    hints: [
      'GIN index is optimized for tsvector',
      'Store tsvector in column for better performance',
    ],
    tags: ['full-text', 'gin', 'index'],
  },
  {
    id: 'pg-fts-110',
    category: 'Full-Text Search',
    difficulty: 'hard',
    title: 'Trigger to Update tsvector',
    text: 'Create a trigger that automatically updates tsvector on insert/update',
    setup: 'Table: articles (id, title, body, search_vector TSVECTOR)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, title TEXT, body TEXT, search_vector TSVECTOR);`,
    expected: 'Trigger keeps search_vector in sync',
    sample: `CREATE OR REPLACE FUNCTION articles_search_trigger() RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
                       setweight(to_tsvector('english', COALESCE(NEW.body, '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_search_update BEFORE INSERT OR UPDATE ON articles
FOR EACH ROW EXECUTE FUNCTION articles_search_trigger();`,
    hints: ['Trigger function updates tsvector automatically', 'COALESCE handles NULL values'],
    tags: ['full-text', 'trigger', 'automatic'],
  },
  {
    id: 'pg-fts-111',
    category: 'Full-Text Search',
    difficulty: 'medium',
    title: 'Get Search Query Details',
    text: 'Display the parsed structure of a tsquery',
    setup: 'No table needed',
    setupCode: `-- No table needed`,
    expected: 'Shows how tsquery is parsed',
    sample: "SELECT to_tsquery('postgresql & (database | sql)');",
    hints: ['tsquery shows the parsed query structure', 'Useful for debugging search queries'],
    tags: ['full-text', 'tsquery', 'debug'],
  },
  {
    id: 'pg-fts-112',
    category: 'Full-Text Search',
    difficulty: 'medium',
    title: 'Get tsvector Lexemes',
    text: 'View the lexemes and positions in a tsvector',
    setup: 'No table needed',
    setupCode: `-- No table needed`,
    expected: 'Shows lexemes with positions',
    sample: "SELECT to_tsvector('english', 'The quick brown fox jumps over the lazy dog');",
    hints: ['tsvector shows normalized lexemes', 'Positions indicate word location'],
    tags: ['full-text', 'tsvector', 'lexemes'],
  },
  {
    id: 'pg-fts-113',
    category: 'Full-Text Search',
    difficulty: 'hard',
    title: 'Custom Text Search Configuration',
    text: 'Use a different language configuration for search',
    setup: 'Table: articles_fr (id, content TEXT) with French content',
    setupCode: `CREATE TABLE articles_fr (id SERIAL PRIMARY KEY, content TEXT);
INSERT INTO articles_fr (content) VALUES ('Les bases de donnees sont importantes');`,
    expected: 'French stemming applied',
    sample: "SELECT to_tsvector('french', content) FROM articles_fr;",
    hints: [
      'Different languages have different stemming rules',
      'PostgreSQL supports many language configurations',
    ],
    tags: ['full-text', 'language', 'configuration'],
  },
  {
    id: 'pg-fts-114',
    category: 'Full-Text Search',
    difficulty: 'hard',
    title: 'Querying with Negation',
    text: 'Find articles about databases but not MySQL',
    setup: 'Table: articles (id, content TEXT)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, content TEXT);
INSERT INTO articles (content) VALUES
  ('PostgreSQL database guide'),
  ('MySQL database tutorial'),
  ('Database design patterns');`,
    expected: [{ id: 1 }, { id: 3 }],
    sample:
      "SELECT id FROM articles WHERE to_tsvector(content) @@ to_tsquery('database & !mysql');",
    hints: ['! (exclamation) negates the following term', 'Match database but NOT mysql'],
    tags: ['full-text', 'negation', 'not'],
  },
  {
    id: 'pg-fts-115',
    category: 'Full-Text Search',
    difficulty: 'medium',
    title: 'Get Matching Lexemes',
    text: 'Extract which lexemes matched the query',
    setup: 'Table: articles (id, content TEXT)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, content TEXT);
INSERT INTO articles (content) VALUES ('PostgreSQL database optimization techniques');`,
    expected: 'List of matched lexemes',
    sample: `SELECT ts_debug('english', content) FROM articles;`,
    hints: [
      'ts_debug shows tokenization details',
      'Useful for understanding how text is processed',
    ],
    tags: ['full-text', 'debug', 'lexemes'],
  },
  {
    id: 'pg-fts-116',
    category: 'Full-Text Search',
    difficulty: 'hard',
    title: 'Phraseto_tsquery for Exact Phrases',
    text: 'Search for an exact phrase preserving word order',
    setup: 'Table: articles (id, content TEXT)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, content TEXT);
INSERT INTO articles (content) VALUES
  ('Full text search is powerful'),
  ('Search for full text capabilities'),
  ('Text search that is full featured');`,
    expected: [{ id: 1 }],
    sample:
      "SELECT id FROM articles WHERE to_tsvector(content) @@ phraseto_tsquery('full text search');",
    hints: ['phraseto_tsquery requires words in order', 'Uses <-> operator internally'],
    tags: ['full-text', 'phrase', 'exact'],
  },
  {
    id: 'pg-fts-117',
    category: 'Full-Text Search',
    difficulty: 'medium',
    title: 'Count Total Matches',
    text: 'Count how many times the search term appears in each document',
    setup: 'Table: articles (id, content TEXT)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, content TEXT);
INSERT INTO articles (content) VALUES
  ('Database database database'),
  ('Database design'),
  ('No matches here');`,
    expected: [
      { id: 1, count: 3 },
      { id: 2, count: 1 },
    ],
    sample: `SELECT id, ts_rank(to_tsvector(content), to_tsquery('database'), 32) * length(to_tsvector(content)::text) AS approx_count
FROM articles WHERE to_tsvector(content) @@ to_tsquery('database');`,
    hints: ['Flag 32 divides rank by document length', 'Approximate count based on term frequency'],
    tags: ['full-text', 'count', 'frequency'],
  },
  {
    id: 'pg-fts-118',
    category: 'Full-Text Search',
    difficulty: 'hard',
    title: 'Combined Full-Text and LIKE Search',
    text: 'Use full-text for relevance, LIKE for exact substring',
    setup: 'Table: products (id, name TEXT, description TEXT)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, description TEXT);
INSERT INTO products (name, description) VALUES
  ('PostgreSQL-Pro', 'Professional database tools'),
  ('DataPro', 'PostgreSQL management suite');`,
    expected: [{ id: 1 }],
    sample: `SELECT id FROM products
WHERE to_tsvector(description) @@ to_tsquery('postgresql')
AND name LIKE '%PostgreSQL%';`,
    hints: [
      'Combine full-text with other conditions',
      'Full-text for stemmed search, LIKE for exact',
    ],
    tags: ['full-text', 'like', 'combined'],
  },
  {
    id: 'pg-fts-119',
    category: 'Full-Text Search',
    difficulty: 'medium',
    title: 'Query Rewriting',
    text: 'Rewrite a tsquery to add synonyms',
    setup: 'No table needed',
    setupCode: `-- No table needed`,
    expected: 'Query expanded with synonyms',
    sample: `SELECT ts_rewrite(
  to_tsquery('postgresql'),
  'SELECT to_tsquery(''postgresql''), to_tsquery(''postgresql | postgres | pg'')'
);`,
    hints: ['ts_rewrite substitutes query terms', 'Useful for synonym expansion'],
    tags: ['full-text', 'rewrite', 'synonyms'],
  },
  {
    id: 'pg-fts-120',
    category: 'Full-Text Search',
    difficulty: 'hard',
    title: 'Numnode - Query Complexity',
    text: 'Get the number of lexemes in a tsquery for complexity analysis',
    setup: 'No table needed',
    setupCode: `-- No table needed`,
    expected: 3,
    sample: "SELECT numnode(to_tsquery('postgresql & database & optimization'));",
    hints: ['numnode counts nodes in tsquery tree', 'Useful for query complexity limits'],
    tags: ['full-text', 'numnode', 'complexity'],
  },
  {
    id: 'pg-fts-121',
    category: 'Full-Text Search',
    difficulty: 'medium',
    title: 'Strip Function for tsvector',
    text: 'Remove position information from tsvector',
    setup: 'No table needed',
    setupCode: `-- No table needed`,
    expected: 'tsvector without positions',
    sample: "SELECT strip(to_tsvector('PostgreSQL is great for databases'));",
    hints: ['strip removes position data', 'Reduces storage size'],
    tags: ['full-text', 'strip', 'optimize'],
  },
  {
    id: 'pg-fts-122',
    category: 'Full-Text Search',
    difficulty: 'hard',
    title: 'Partial Index for Full-Text',
    text: 'Create a partial index for published articles only',
    setup: 'Table: articles (id, content TEXT, status TEXT)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, content TEXT, status TEXT);
INSERT INTO articles (content, status) VALUES
  ('PostgreSQL guide', 'published'),
  ('Draft content', 'draft');`,
    expected: 'Index only covers published articles',
    sample: `CREATE INDEX idx_articles_published ON articles USING GIN (to_tsvector('english', content))
WHERE status = 'published';`,
    hints: ['Partial index with WHERE clause', 'Smaller index, faster for common queries'],
    tags: ['full-text', 'partial-index', 'optimization'],
  },
  {
    id: 'pg-fts-123',
    category: 'Full-Text Search',
    difficulty: 'hard',
    title: 'Highlight with Fragment Selection',
    text: 'Show only relevant fragments with MaxFragments option',
    setup: 'Table: articles (id, content TEXT)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, content TEXT);
INSERT INTO articles (content) VALUES ('PostgreSQL is great. It supports full-text search. Database queries are fast. PostgreSQL handles big data.');`,
    expected: 'Multiple highlighted fragments',
    sample: `SELECT ts_headline('english', content, to_tsquery('postgresql'),
  'MaxFragments=2, FragmentDelimiter=" ... "')
FROM articles;`,
    hints: ['MaxFragments controls number of snippets', 'FragmentDelimiter separates snippets'],
    tags: ['full-text', 'headline', 'fragments'],
  },
  {
    id: 'pg-fts-124',
    category: 'Full-Text Search',
    difficulty: 'medium',
    title: 'tsvector Concatenation',
    text: 'Combine multiple tsvectors with different weights',
    setup: 'Table: products (id, name TEXT, category TEXT, description TEXT)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, category TEXT, description TEXT);
INSERT INTO products (name, category, description) VALUES
  ('PostgreSQL Book', 'Database', 'Complete guide to PostgreSQL');`,
    expected: 'Combined weighted tsvector',
    sample: `SELECT setweight(to_tsvector(name), 'A') ||
       setweight(to_tsvector(category), 'B') ||
       setweight(to_tsvector(description), 'C') AS combined_tsv
FROM products;`,
    hints: ['Weight A is highest priority', 'Concatenation preserves weights'],
    tags: ['full-text', 'concatenate', 'weights'],
  },

  // ============================================================
  // NEW PROBLEMS - BATCH 2: AGGREGATE FUNCTIONS EXTENDED (25 problems)
  // ============================================================
  {
    id: 'pg-agg-100',
    category: 'Aggregate Functions',
    difficulty: 'easy',
    title: 'COUNT with DISTINCT',
    text: 'Count the number of unique categories in products',
    setup: 'Table: products (id, category TEXT)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, category TEXT);
INSERT INTO products (category) VALUES ('Electronics'), ('Clothing'), ('Electronics'), ('Books'), ('Clothing');`,
    expected: 3,
    sample: 'SELECT COUNT(DISTINCT category) FROM products;',
    hints: [
      'COUNT(DISTINCT column) counts unique values',
      'Different from COUNT(*) which counts all rows',
    ],
    tags: ['aggregate', 'count', 'distinct'],
  },
  {
    id: 'pg-agg-101',
    category: 'Aggregate Functions',
    difficulty: 'easy',
    title: 'SUM with NULL Handling',
    text: 'Calculate total sales, treating NULL as zero',
    setup: 'Table: sales (id, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, amount NUMERIC);
INSERT INTO sales (amount) VALUES (100), (NULL), (200), (NULL), (300);`,
    expected: 600,
    sample: 'SELECT COALESCE(SUM(amount), 0) FROM sales;',
    hints: ['SUM ignores NULL values', 'COALESCE handles case where all values are NULL'],
    tags: ['aggregate', 'sum', 'null'],
  },
  {
    id: 'pg-agg-102',
    category: 'Aggregate Functions',
    difficulty: 'medium',
    title: 'AVG with Precision',
    text: 'Calculate average price rounded to 2 decimal places',
    setup: 'Table: products (id, price NUMERIC)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, price NUMERIC);
INSERT INTO products (price) VALUES (10.50), (20.75), (15.25);`,
    expected: 15.5,
    sample: 'SELECT ROUND(AVG(price), 2) FROM products;',
    hints: [
      'ROUND(value, precision) rounds to specified decimals',
      'AVG returns the arithmetic mean',
    ],
    tags: ['aggregate', 'avg', 'round'],
  },
  {
    id: 'pg-agg-103',
    category: 'Aggregate Functions',
    difficulty: 'medium',
    title: 'MIN and MAX Together',
    text: 'Find the price range (min and max) of products in each category',
    setup: 'Table: products (id, category TEXT, price NUMERIC)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, category TEXT, price NUMERIC);
INSERT INTO products (category, price) VALUES
  ('Electronics', 100), ('Electronics', 500), ('Clothing', 25), ('Clothing', 75);`,
    expected: [
      { category: 'Electronics', min_price: 100, max_price: 500 },
      { category: 'Clothing', min_price: 25, max_price: 75 },
    ],
    sample:
      'SELECT category, MIN(price) AS min_price, MAX(price) AS max_price FROM products GROUP BY category;',
    hints: ['MIN and MAX can be used together', 'GROUP BY creates separate calculations per group'],
    tags: ['aggregate', 'min', 'max'],
  },
  {
    id: 'pg-agg-104',
    category: 'Aggregate Functions',
    difficulty: 'medium',
    title: 'STRING_AGG with Ordering',
    text: 'Concatenate employee names ordered alphabetically',
    setup: 'Table: employees (id, name TEXT, department TEXT)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT);
INSERT INTO employees (name, department) VALUES
  ('Charlie', 'Sales'), ('Alice', 'Sales'), ('Bob', 'Sales');`,
    expected: 'Alice, Bob, Charlie',
    sample:
      "SELECT STRING_AGG(name, ', ' ORDER BY name) FROM employees WHERE department = 'Sales';",
    hints: ['STRING_AGG can include ORDER BY', 'Ordering happens before concatenation'],
    tags: ['aggregate', 'string_agg', 'order'],
  },
  {
    id: 'pg-agg-105',
    category: 'Aggregate Functions',
    difficulty: 'medium',
    title: 'BOOL_AND and BOOL_OR',
    text: 'Check if all products are in stock and if any are on sale',
    setup: 'Table: products (id, in_stock BOOLEAN, on_sale BOOLEAN)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, in_stock BOOLEAN, on_sale BOOLEAN);
INSERT INTO products (in_stock, on_sale) VALUES (true, false), (true, true), (true, false);`,
    expected: { all_in_stock: true, any_on_sale: true },
    sample:
      'SELECT BOOL_AND(in_stock) AS all_in_stock, BOOL_OR(on_sale) AS any_on_sale FROM products;',
    hints: ['BOOL_AND returns true if ALL are true', 'BOOL_OR returns true if ANY is true'],
    tags: ['aggregate', 'bool_and', 'bool_or'],
  },
  {
    id: 'pg-agg-106',
    category: 'Aggregate Functions',
    difficulty: 'hard',
    title: 'FILTER Clause Multiple Conditions',
    text: 'Count orders by status in separate columns',
    setup: 'Table: orders (id, status TEXT)',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, status TEXT);
INSERT INTO orders (status) VALUES ('pending'), ('completed'), ('pending'), ('cancelled'), ('completed');`,
    expected: { pending: 2, completed: 2, cancelled: 1 },
    sample: `SELECT
  COUNT(*) FILTER (WHERE status = 'pending') AS pending,
  COUNT(*) FILTER (WHERE status = 'completed') AS completed,
  COUNT(*) FILTER (WHERE status = 'cancelled') AS cancelled
FROM orders;`,
    hints: ['FILTER clause conditions each aggregate', 'Cleaner than CASE WHEN inside COUNT'],
    tags: ['aggregate', 'filter', 'pivot'],
  },
  {
    id: 'pg-agg-107',
    category: 'Aggregate Functions',
    difficulty: 'hard',
    title: 'PERCENTILE_DISC vs PERCENTILE_CONT',
    text: 'Compare discrete and continuous percentile calculations',
    setup: 'Table: scores (id, score INTEGER)',
    setupCode: `CREATE TABLE scores (id SERIAL PRIMARY KEY, score INTEGER);
INSERT INTO scores (score) VALUES (10), (20), (30), (40), (50);`,
    expected: { discrete: 30, continuous: 30 },
    sample: `SELECT
  PERCENTILE_DISC(0.5) WITHIN GROUP (ORDER BY score) AS discrete,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY score) AS continuous
FROM scores;`,
    hints: [
      'PERCENTILE_DISC returns an actual value',
      'PERCENTILE_CONT interpolates between values',
    ],
    tags: ['aggregate', 'percentile', 'within-group'],
  },
  {
    id: 'pg-agg-108',
    category: 'Aggregate Functions',
    difficulty: 'medium',
    title: 'ARRAY_AGG with DISTINCT',
    text: 'Get unique tags across all posts as an array',
    setup: 'Table: posts (id, tag TEXT)',
    setupCode: `CREATE TABLE posts (id SERIAL PRIMARY KEY, tag TEXT);
INSERT INTO posts (tag) VALUES ('sql'), ('postgres'), ('sql'), ('database'), ('postgres');`,
    expected: ['sql', 'postgres', 'database'],
    sample: 'SELECT ARRAY_AGG(DISTINCT tag) FROM posts;',
    hints: [
      'DISTINCT removes duplicates before aggregation',
      'Order may not be preserved with DISTINCT',
    ],
    tags: ['aggregate', 'array_agg', 'distinct'],
  },
  {
    id: 'pg-agg-109',
    category: 'Aggregate Functions',
    difficulty: 'hard',
    title: 'Statistical Aggregates - Variance and StdDev',
    text: 'Calculate population and sample variance/stddev of salaries',
    setup: 'Table: employees (id, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, salary NUMERIC);
INSERT INTO employees (salary) VALUES (50000), (60000), (70000), (80000);`,
    expected: { var_pop: 125000000, var_samp: 166666666.67 },
    sample: `SELECT
  VAR_POP(salary) AS var_pop,
  VAR_SAMP(salary) AS var_samp,
  STDDEV_POP(salary) AS stddev_pop,
  STDDEV_SAMP(salary) AS stddev_samp
FROM employees;`,
    hints: ['POP variants use N in denominator', 'SAMP variants use N-1 (Bessel correction)'],
    tags: ['aggregate', 'variance', 'stddev'],
  },
  {
    id: 'pg-agg-110',
    category: 'Aggregate Functions',
    difficulty: 'hard',
    title: 'Correlation Coefficient',
    text: 'Calculate correlation between price and sales',
    setup: 'Table: products (id, price NUMERIC, sales INTEGER)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, price NUMERIC, sales INTEGER);
INSERT INTO products (price, sales) VALUES (10, 100), (20, 80), (30, 60), (40, 40);`,
    expected: -1,
    sample: 'SELECT CORR(price, sales) FROM products;',
    hints: [
      'CORR calculates Pearson correlation',
      'Returns -1 to 1 (negative to positive correlation)',
    ],
    tags: ['aggregate', 'correlation', 'statistics'],
  },
  {
    id: 'pg-agg-111',
    category: 'Aggregate Functions',
    difficulty: 'hard',
    title: 'Regression Functions',
    text: 'Calculate linear regression slope and intercept',
    setup: 'Table: data_points (x NUMERIC, y NUMERIC)',
    setupCode: `CREATE TABLE data_points (x NUMERIC, y NUMERIC);
INSERT INTO data_points (x, y) VALUES (1, 3), (2, 5), (3, 7), (4, 9);`,
    expected: { slope: 2, intercept: 1 },
    sample: `SELECT
  REGR_SLOPE(y, x) AS slope,
  REGR_INTERCEPT(y, x) AS intercept
FROM data_points;`,
    hints: ['REGR_SLOPE gives slope of best-fit line', 'REGR_INTERCEPT gives y-intercept'],
    tags: ['aggregate', 'regression', 'statistics'],
  },
  {
    id: 'pg-agg-112',
    category: 'Aggregate Functions',
    difficulty: 'medium',
    title: 'BIT_AND and BIT_OR',
    text: 'Perform bitwise AND and OR across all permission flags',
    setup: 'Table: permissions (id, flags INTEGER)',
    setupCode: `CREATE TABLE permissions (id SERIAL PRIMARY KEY, flags INTEGER);
INSERT INTO permissions (flags) VALUES (7), (5), (3);`,
    expected: { common_flags: 1, any_flag: 7 },
    sample: 'SELECT BIT_AND(flags) AS common_flags, BIT_OR(flags) AS any_flag FROM permissions;',
    hints: ['BIT_AND gives bits set in ALL values', 'BIT_OR gives bits set in ANY value'],
    tags: ['aggregate', 'bitwise', 'flags'],
  },
  {
    id: 'pg-agg-113',
    category: 'Aggregate Functions',
    difficulty: 'medium',
    title: 'EVERY - All True Check',
    text: 'Check if every order is shipped',
    setup: 'Table: orders (id, shipped BOOLEAN)',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, shipped BOOLEAN);
INSERT INTO orders (shipped) VALUES (true), (true), (false);`,
    expected: false,
    sample: 'SELECT EVERY(shipped) AS all_shipped FROM orders;',
    hints: ['EVERY is equivalent to BOOL_AND', 'Returns true only if all values are true'],
    tags: ['aggregate', 'every', 'boolean'],
  },
  {
    id: 'pg-agg-114',
    category: 'Aggregate Functions',
    difficulty: 'hard',
    title: 'XMLAGG - Aggregate to XML',
    text: 'Aggregate product names into an XML structure',
    setup: 'Table: products (id, name TEXT)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT);
INSERT INTO products (name) VALUES ('Widget'), ('Gadget'), ('Tool');`,
    expected: '<product>Widget</product><product>Gadget</product><product>Tool</product>',
    sample: 'SELECT XMLAGG(XMLELEMENT(NAME product, name)) FROM products;',
    hints: ['XMLAGG concatenates XML values', 'XMLELEMENT creates XML elements'],
    tags: ['aggregate', 'xml', 'xmlagg'],
  },
  {
    id: 'pg-agg-115',
    category: 'Aggregate Functions',
    difficulty: 'hard',
    title: 'Custom Aggregate with ORDER BY',
    text: 'First and last value in ordered aggregation',
    setup: 'Table: events (id, event_date DATE, event_name TEXT)',
    setupCode: `CREATE TABLE events (id SERIAL PRIMARY KEY, event_date DATE, event_name TEXT);
INSERT INTO events (event_date, event_name) VALUES
  ('2024-01-01', 'First'), ('2024-01-15', 'Middle'), ('2024-01-31', 'Last');`,
    expected: { first: 'First', last: 'Last' },
    sample: `SELECT
  (ARRAY_AGG(event_name ORDER BY event_date))[1] AS first,
  (ARRAY_AGG(event_name ORDER BY event_date DESC))[1] AS last
FROM events;`,
    hints: ['ARRAY_AGG with ORDER BY preserves order', 'Access first element with [1]'],
    tags: ['aggregate', 'array_agg', 'first-last'],
  },
  {
    id: 'pg-agg-116',
    category: 'Aggregate Functions',
    difficulty: 'medium',
    title: 'COUNT(*) vs COUNT(column)',
    text: 'Show the difference between COUNT(*) and COUNT(column)',
    setup: 'Table: users (id, email TEXT)',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT);
INSERT INTO users (email) VALUES ('a@test.com'), (NULL), ('b@test.com'), (NULL);`,
    expected: { total_rows: 4, non_null_emails: 2 },
    sample: 'SELECT COUNT(*) AS total_rows, COUNT(email) AS non_null_emails FROM users;',
    hints: ['COUNT(*) counts all rows', 'COUNT(column) counts non-NULL values only'],
    tags: ['aggregate', 'count', 'null'],
  },
  {
    id: 'pg-agg-117',
    category: 'Aggregate Functions',
    difficulty: 'hard',
    title: 'GROUPING SETS Multiple Dimensions',
    text: 'Generate subtotals by category, region, and grand total',
    setup: 'Table: sales (category TEXT, region TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, category TEXT, region TEXT, amount NUMERIC);
INSERT INTO sales (category, region, amount) VALUES
  ('A', 'North', 100), ('A', 'South', 150), ('B', 'North', 200), ('B', 'South', 250);`,
    expected: 'Multiple grouping levels in one query',
    sample: `SELECT category, region, SUM(amount) AS total
FROM sales
GROUP BY GROUPING SETS ((category, region), (category), (region), ());`,
    hints: ['Each grouping set is a separate GROUP BY', 'Empty () gives grand total'],
    tags: ['aggregate', 'grouping-sets', 'subtotals'],
  },
  {
    id: 'pg-agg-118',
    category: 'Aggregate Functions',
    difficulty: 'hard',
    title: 'ROLLUP for Hierarchical Totals',
    text: 'Generate hierarchical subtotals with ROLLUP',
    setup: 'Table: sales (year INTEGER, quarter INTEGER, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, year INTEGER, quarter INTEGER, amount NUMERIC);
INSERT INTO sales (year, quarter, amount) VALUES
  (2023, 1, 100), (2023, 2, 150), (2024, 1, 200), (2024, 2, 250);`,
    expected: 'Year totals, quarter totals, and grand total',
    sample: 'SELECT year, quarter, SUM(amount) FROM sales GROUP BY ROLLUP(year, quarter);',
    hints: ['ROLLUP creates hierarchical subtotals', 'Rolls up from right to left'],
    tags: ['aggregate', 'rollup', 'hierarchical'],
  },
  {
    id: 'pg-agg-119',
    category: 'Aggregate Functions',
    difficulty: 'hard',
    title: 'CUBE for All Combinations',
    text: 'Generate all possible subtotal combinations with CUBE',
    setup: 'Table: sales (category TEXT, region TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, category TEXT, region TEXT, amount NUMERIC);
INSERT INTO sales (category, region, amount) VALUES
  ('A', 'North', 100), ('A', 'South', 150), ('B', 'North', 200);`,
    expected: 'All combinations of category and region totals',
    sample: 'SELECT category, region, SUM(amount) FROM sales GROUP BY CUBE(category, region);',
    hints: ['CUBE generates all 2^n grouping combinations', 'More comprehensive than ROLLUP'],
    tags: ['aggregate', 'cube', 'combinations'],
  },
  {
    id: 'pg-agg-120',
    category: 'Aggregate Functions',
    difficulty: 'hard',
    title: 'GROUPING Function',
    text: 'Distinguish between NULL and aggregated rows using GROUPING',
    setup: 'Table: sales (category TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, category TEXT, amount NUMERIC);
INSERT INTO sales (category, amount) VALUES ('A', 100), ('A', 150), (NULL, 200);`,
    expected: 'GROUPING returns 1 for aggregated nulls, 0 for actual nulls',
    sample: `SELECT
  category,
  SUM(amount),
  GROUPING(category) AS is_total
FROM sales
GROUP BY ROLLUP(category);`,
    hints: [
      'GROUPING() returns 1 for super-aggregate rows',
      'Helps distinguish real NULLs from aggregation',
    ],
    tags: ['aggregate', 'grouping', 'rollup'],
  },
  {
    id: 'pg-agg-121',
    category: 'Aggregate Functions',
    difficulty: 'medium',
    title: 'Conditional SUM',
    text: 'Calculate total revenue and total refunds separately',
    setup: 'Table: transactions (id, type TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE transactions (id SERIAL PRIMARY KEY, type TEXT, amount NUMERIC);
INSERT INTO transactions (type, amount) VALUES
  ('sale', 100), ('refund', 30), ('sale', 200), ('refund', 50);`,
    expected: { revenue: 300, refunds: 80 },
    sample: `SELECT
  SUM(amount) FILTER (WHERE type = 'sale') AS revenue,
  SUM(amount) FILTER (WHERE type = 'refund') AS refunds
FROM transactions;`,
    hints: ['FILTER is cleaner than CASE WHEN', 'Each aggregate can have different filters'],
    tags: ['aggregate', 'sum', 'conditional'],
  },
  {
    id: 'pg-agg-122',
    category: 'Aggregate Functions',
    difficulty: 'medium',
    title: 'HAVING Clause with Aggregates',
    text: 'Find categories with more than 2 products',
    setup: 'Table: products (id, category TEXT)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, category TEXT);
INSERT INTO products (category) VALUES ('A'), ('A'), ('A'), ('B'), ('B'), ('C');`,
    expected: [{ category: 'A', count: 3 }],
    sample:
      'SELECT category, COUNT(*) AS count FROM products GROUP BY category HAVING COUNT(*) > 2;',
    hints: ['HAVING filters after aggregation', 'WHERE filters before aggregation'],
    tags: ['aggregate', 'having', 'filter'],
  },
  {
    id: 'pg-agg-123',
    category: 'Aggregate Functions',
    difficulty: 'hard',
    title: 'Aggregate with DISTINCT ON',
    text: 'Get the highest priced product in each category',
    setup: 'Table: products (id, category TEXT, name TEXT, price NUMERIC)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, category TEXT, name TEXT, price NUMERIC);
INSERT INTO products (category, name, price) VALUES
  ('Electronics', 'Phone', 500), ('Electronics', 'Laptop', 1000),
  ('Clothing', 'Shirt', 30), ('Clothing', 'Jacket', 100);`,
    expected: [
      { category: 'Electronics', name: 'Laptop' },
      { category: 'Clothing', name: 'Jacket' },
    ],
    sample:
      'SELECT DISTINCT ON (category) category, name, price FROM products ORDER BY category, price DESC;',
    hints: [
      'DISTINCT ON keeps first row per group',
      'ORDER BY must start with DISTINCT ON columns',
    ],
    tags: ['aggregate', 'distinct-on', 'top-per-group'],
  },
  {
    id: 'pg-agg-124',
    category: 'Aggregate Functions',
    difficulty: 'hard',
    title: 'Moving Average with Aggregate',
    text: 'Calculate 3-period moving average of sales',
    setup: 'Table: daily_sales (sale_date DATE, amount NUMERIC)',
    setupCode: `CREATE TABLE daily_sales (sale_date DATE, amount NUMERIC);
INSERT INTO daily_sales VALUES
  ('2024-01-01', 100), ('2024-01-02', 200), ('2024-01-03', 150),
  ('2024-01-04', 300), ('2024-01-05', 250);`,
    expected: 'Moving average for each day',
    sample: `SELECT sale_date, amount,
  AVG(amount) OVER (ORDER BY sale_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg
FROM daily_sales;`,
    hints: ['Use window function for moving averages', 'ROWS BETWEEN defines the window size'],
    tags: ['aggregate', 'moving-average', 'window'],
  },

  // ============================================================
  // NEW PROBLEMS - BATCH 2: DATE/TIME FUNCTIONS (25 problems)
  // ============================================================
  {
    id: 'pg-datetime-100',
    category: 'Date/Time',
    difficulty: 'easy',
    title: 'Get Current Date and Time',
    text: 'Retrieve the current date, time, and timestamp',
    setup: 'No table needed',
    setupCode: `-- No table needed`,
    expected: 'Current date, time, and timestamp',
    sample: 'SELECT CURRENT_DATE, CURRENT_TIME, CURRENT_TIMESTAMP;',
    hints: ['CURRENT_DATE returns date only', 'CURRENT_TIMESTAMP includes time and timezone'],
    tags: ['datetime', 'current', 'basic'],
  },
  {
    id: 'pg-datetime-101',
    category: 'Date/Time',
    difficulty: 'easy',
    title: 'DATE_TRUNC to Month',
    text: 'Truncate timestamps to the beginning of the month',
    setup: 'Table: events (id, event_time TIMESTAMP)',
    setupCode: `CREATE TABLE events (id SERIAL PRIMARY KEY, event_time TIMESTAMP);
INSERT INTO events (event_time) VALUES ('2024-01-15 14:30:00'), ('2024-02-20 09:15:00');`,
    expected: [{ month: '2024-01-01 00:00:00' }, { month: '2024-02-01 00:00:00' }],
    sample: "SELECT DATE_TRUNC('month', event_time) AS month FROM events;",
    hints: ['DATE_TRUNC truncates to specified precision', 'Returns timestamp at start of period'],
    tags: ['datetime', 'date_trunc', 'truncate'],
  },
  {
    id: 'pg-datetime-102',
    category: 'Date/Time',
    difficulty: 'easy',
    title: 'EXTRACT Year and Month',
    text: 'Extract the year and month from a timestamp',
    setup: 'Table: orders (id, order_date TIMESTAMP)',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, order_date TIMESTAMP);
INSERT INTO orders (order_date) VALUES ('2024-03-15 10:30:00');`,
    expected: { year: 2024, month: 3 },
    sample:
      'SELECT EXTRACT(YEAR FROM order_date) AS year, EXTRACT(MONTH FROM order_date) AS month FROM orders;',
    hints: ['EXTRACT gets a specific field from date/time', 'Returns numeric value'],
    tags: ['datetime', 'extract', 'fields'],
  },
  {
    id: 'pg-datetime-103',
    category: 'Date/Time',
    difficulty: 'medium',
    title: 'Age Between Dates',
    text: 'Calculate the age (time difference) between two dates',
    setup: 'Table: employees (id, hire_date DATE)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, hire_date DATE);
INSERT INTO employees (hire_date) VALUES ('2020-06-15');`,
    expected: 'Interval showing years, months, days',
    sample: 'SELECT AGE(CURRENT_DATE, hire_date) AS tenure FROM employees;',
    hints: ['AGE returns an interval', 'Shows years, months, and days difference'],
    tags: ['datetime', 'age', 'interval'],
  },
  {
    id: 'pg-datetime-104',
    category: 'Date/Time',
    difficulty: 'medium',
    title: 'Generate Date Series',
    text: 'Generate all dates in January 2024',
    setup: 'No table needed',
    setupCode: `-- No table needed`,
    expected: '31 dates from 2024-01-01 to 2024-01-31',
    sample:
      "SELECT generate_series('2024-01-01'::date, '2024-01-31'::date, '1 day')::date AS date;",
    hints: ['generate_series works with dates', 'Third parameter is the interval step'],
    tags: ['datetime', 'generate_series', 'dates'],
  },
  {
    id: 'pg-datetime-105',
    category: 'Date/Time',
    difficulty: 'medium',
    title: 'Generate Timestamp Series',
    text: 'Generate timestamps every hour for 24 hours',
    setup: 'No table needed',
    setupCode: `-- No table needed`,
    expected: '24 hourly timestamps',
    sample:
      "SELECT generate_series('2024-01-01 00:00'::timestamp, '2024-01-01 23:00'::timestamp, '1 hour') AS hour;",
    hints: ['Use interval for step size', 'Works with both dates and timestamps'],
    tags: ['datetime', 'generate_series', 'timestamps'],
  },
  {
    id: 'pg-datetime-106',
    category: 'Date/Time',
    difficulty: 'medium',
    title: 'Add Interval to Date',
    text: 'Add 3 months and 15 days to a date',
    setup: 'Table: subscriptions (id, start_date DATE)',
    setupCode: `CREATE TABLE subscriptions (id SERIAL PRIMARY KEY, start_date DATE);
INSERT INTO subscriptions (start_date) VALUES ('2024-01-01');`,
    expected: '2024-04-16',
    sample: "SELECT start_date + INTERVAL '3 months 15 days' AS end_date FROM subscriptions;",
    hints: ['INTERVAL can combine multiple units', 'Add directly to date or timestamp'],
    tags: ['datetime', 'interval', 'add'],
  },
  {
    id: 'pg-datetime-107',
    category: 'Date/Time',
    difficulty: 'medium',
    title: 'Day of Week',
    text: 'Get the day of week name for each event',
    setup: 'Table: events (id, event_date DATE)',
    setupCode: `CREATE TABLE events (id SERIAL PRIMARY KEY, event_date DATE);
INSERT INTO events (event_date) VALUES ('2024-01-01'), ('2024-01-02'), ('2024-01-03');`,
    expected: ['Monday', 'Tuesday', 'Wednesday'],
    sample: "SELECT TO_CHAR(event_date, 'Day') AS day_name FROM events;",
    hints: ['TO_CHAR formats date/time values', 'Day format gives day name'],
    tags: ['datetime', 'to_char', 'day-of-week'],
  },
  {
    id: 'pg-datetime-108',
    category: 'Date/Time',
    difficulty: 'medium',
    title: 'Week Number',
    text: 'Get the ISO week number for each date',
    setup: 'Table: events (id, event_date DATE)',
    setupCode: `CREATE TABLE events (id SERIAL PRIMARY KEY, event_date DATE);
INSERT INTO events (event_date) VALUES ('2024-01-01'), ('2024-01-15'), ('2024-02-01');`,
    expected: [{ week: 1 }, { week: 3 }, { week: 5 }],
    sample: 'SELECT EXTRACT(WEEK FROM event_date) AS week FROM events;',
    hints: ['WEEK extracts ISO week number', 'Week 1 contains the first Thursday'],
    tags: ['datetime', 'extract', 'week'],
  },
  {
    id: 'pg-datetime-109',
    category: 'Date/Time',
    difficulty: 'hard',
    title: 'Business Days Calculation',
    text: 'Count business days (Mon-Fri) between two dates',
    setup: 'Two dates to compare',
    setupCode: `-- No table needed`,
    expected: 22,
    sample: `SELECT COUNT(*) FROM generate_series('2024-01-01'::date, '2024-01-31'::date, '1 day') AS d
WHERE EXTRACT(DOW FROM d) NOT IN (0, 6);`,
    hints: ['DOW returns 0 for Sunday, 6 for Saturday', 'Filter out weekends'],
    tags: ['datetime', 'business-days', 'filter'],
  },
  {
    id: 'pg-datetime-110',
    category: 'Date/Time',
    difficulty: 'hard',
    title: 'Date Part Extraction',
    text: 'Extract epoch (Unix timestamp) from a timestamp',
    setup: 'Table: events (id, event_time TIMESTAMP)',
    setupCode: `CREATE TABLE events (id SERIAL PRIMARY KEY, event_time TIMESTAMP);
INSERT INTO events (event_time) VALUES ('2024-01-01 00:00:00');`,
    expected: 1704067200,
    sample: 'SELECT EXTRACT(EPOCH FROM event_time) AS unix_timestamp FROM events;',
    hints: ['EPOCH returns seconds since 1970-01-01', 'Useful for timestamp comparisons'],
    tags: ['datetime', 'epoch', 'unix'],
  },
  {
    id: 'pg-datetime-111',
    category: 'Date/Time',
    difficulty: 'medium',
    title: 'Convert Epoch to Timestamp',
    text: 'Convert Unix timestamp to PostgreSQL timestamp',
    setup: 'Unix timestamp value',
    setupCode: `-- No table needed`,
    expected: '2024-01-01 00:00:00',
    sample: 'SELECT TO_TIMESTAMP(1704067200);',
    hints: ['TO_TIMESTAMP converts epoch to timestamp', 'Returns timestamp with time zone'],
    tags: ['datetime', 'to_timestamp', 'convert'],
  },
  {
    id: 'pg-datetime-112',
    category: 'Date/Time',
    difficulty: 'medium',
    title: 'Format Timestamp',
    text: 'Format timestamp as "YYYY-MM-DD HH24:MI:SS"',
    setup: 'Table: events (id, event_time TIMESTAMP)',
    setupCode: `CREATE TABLE events (id SERIAL PRIMARY KEY, event_time TIMESTAMP);
INSERT INTO events (event_time) VALUES ('2024-03-15 14:30:45');`,
    expected: '2024-03-15 14:30:45',
    sample: "SELECT TO_CHAR(event_time, 'YYYY-MM-DD HH24:MI:SS') FROM events;",
    hints: ['TO_CHAR with format pattern', 'HH24 for 24-hour format'],
    tags: ['datetime', 'to_char', 'format'],
  },
  {
    id: 'pg-datetime-113',
    category: 'Date/Time',
    difficulty: 'hard',
    title: 'Timezone Conversion',
    text: 'Convert timestamp to different timezone',
    setup: 'Table: events (id, event_time TIMESTAMPTZ)',
    setupCode: `CREATE TABLE events (id SERIAL PRIMARY KEY, event_time TIMESTAMPTZ);
INSERT INTO events (event_time) VALUES ('2024-01-01 12:00:00 UTC');`,
    expected: '2024-01-01 07:00:00 EST',
    sample: "SELECT event_time AT TIME ZONE 'America/New_York' FROM events;",
    hints: ['AT TIME ZONE converts between timezones', 'Use IANA timezone names'],
    tags: ['datetime', 'timezone', 'convert'],
  },
  {
    id: 'pg-datetime-114',
    category: 'Date/Time',
    difficulty: 'medium',
    title: 'First Day of Month',
    text: 'Get the first day of the month for each date',
    setup: 'Table: events (id, event_date DATE)',
    setupCode: `CREATE TABLE events (id SERIAL PRIMARY KEY, event_date DATE);
INSERT INTO events (event_date) VALUES ('2024-01-15'), ('2024-02-20');`,
    expected: ['2024-01-01', '2024-02-01'],
    sample: "SELECT DATE_TRUNC('month', event_date)::date AS first_day FROM events;",
    hints: ['DATE_TRUNC to month gives first of month', 'Cast to date to remove time'],
    tags: ['datetime', 'date_trunc', 'first-day'],
  },
  {
    id: 'pg-datetime-115',
    category: 'Date/Time',
    difficulty: 'hard',
    title: 'Last Day of Month',
    text: 'Get the last day of the month for each date',
    setup: 'Table: events (id, event_date DATE)',
    setupCode: `CREATE TABLE events (id SERIAL PRIMARY KEY, event_date DATE);
INSERT INTO events (event_date) VALUES ('2024-01-15'), ('2024-02-20');`,
    expected: ['2024-01-31', '2024-02-29'],
    sample:
      "SELECT (DATE_TRUNC('month', event_date) + INTERVAL '1 month - 1 day')::date AS last_day FROM events;",
    hints: ['Add 1 month then subtract 1 day', 'Handles varying month lengths'],
    tags: ['datetime', 'last-day', 'month'],
  },
  {
    id: 'pg-datetime-116',
    category: 'Date/Time',
    difficulty: 'medium',
    title: 'Quarter Extraction',
    text: 'Get the quarter number for each date',
    setup: 'Table: sales (id, sale_date DATE)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, sale_date DATE);
INSERT INTO sales (sale_date) VALUES ('2024-01-15'), ('2024-04-20'), ('2024-07-10'), ('2024-10-05');`,
    expected: [1, 2, 3, 4],
    sample: 'SELECT EXTRACT(QUARTER FROM sale_date) AS quarter FROM sales;',
    hints: ['QUARTER returns 1-4', 'Q1: Jan-Mar, Q2: Apr-Jun, etc.'],
    tags: ['datetime', 'extract', 'quarter'],
  },
  {
    id: 'pg-datetime-117',
    category: 'Date/Time',
    difficulty: 'hard',
    title: 'Date Difference in Days',
    text: 'Calculate the exact number of days between two dates',
    setup: 'Table: projects (id, start_date DATE, end_date DATE)',
    setupCode: `CREATE TABLE projects (id SERIAL PRIMARY KEY, start_date DATE, end_date DATE);
INSERT INTO projects (start_date, end_date) VALUES ('2024-01-01', '2024-01-31');`,
    expected: 30,
    sample: 'SELECT end_date - start_date AS days_between FROM projects;',
    hints: ['Subtracting dates returns integer days', 'Direct subtraction for date types'],
    tags: ['datetime', 'difference', 'days'],
  },
  {
    id: 'pg-datetime-118',
    category: 'Date/Time',
    difficulty: 'hard',
    title: 'Interval Components',
    text: 'Extract years, months, and days from an interval',
    setup: 'An interval value',
    setupCode: `-- No table needed`,
    expected: { years: 2, months: 3, days: 15 },
    sample: `SELECT
  EXTRACT(YEAR FROM '2 years 3 months 15 days'::interval) AS years,
  EXTRACT(MONTH FROM '2 years 3 months 15 days'::interval) AS months,
  EXTRACT(DAY FROM '2 years 3 months 15 days'::interval) AS days;`,
    hints: ['EXTRACT works on intervals too', 'Gets individual components'],
    tags: ['datetime', 'interval', 'extract'],
  },
  {
    id: 'pg-datetime-119',
    category: 'Date/Time',
    difficulty: 'medium',
    title: 'MAKE_DATE Function',
    text: 'Create a date from separate year, month, day values',
    setup: 'Table: date_parts (year INTEGER, month INTEGER, day INTEGER)',
    setupCode: `CREATE TABLE date_parts (year INTEGER, month INTEGER, day INTEGER);
INSERT INTO date_parts VALUES (2024, 3, 15);`,
    expected: '2024-03-15',
    sample: 'SELECT MAKE_DATE(year, month, day) FROM date_parts;',
    hints: ['MAKE_DATE constructs date from parts', 'Validates that date is valid'],
    tags: ['datetime', 'make_date', 'construct'],
  },
  {
    id: 'pg-datetime-120',
    category: 'Date/Time',
    difficulty: 'hard',
    title: 'MAKE_TIMESTAMP Function',
    text: 'Create a timestamp from separate components',
    setup: 'Individual timestamp parts',
    setupCode: `-- No table needed`,
    expected: '2024-03-15 14:30:45',
    sample: 'SELECT MAKE_TIMESTAMP(2024, 3, 15, 14, 30, 45);',
    hints: [
      'MAKE_TIMESTAMP(year, month, day, hour, min, sec)',
      'Returns timestamp without timezone',
    ],
    tags: ['datetime', 'make_timestamp', 'construct'],
  },
  {
    id: 'pg-datetime-121',
    category: 'Date/Time',
    difficulty: 'medium',
    title: 'Overlapping Date Ranges',
    text: 'Check if two date ranges overlap',
    setup: 'Two date ranges',
    setupCode: `-- No table needed`,
    expected: true,
    sample: `SELECT (DATE '2024-01-01', DATE '2024-01-31') OVERLAPS (DATE '2024-01-15', DATE '2024-02-15') AS overlaps;`,
    hints: ['OVERLAPS checks for date range intersection', 'Works with dates and timestamps'],
    tags: ['datetime', 'overlaps', 'range'],
  },
  {
    id: 'pg-datetime-122',
    category: 'Date/Time',
    difficulty: 'hard',
    title: 'ISO Year and Week',
    text: 'Get ISO year and ISO week (handles year boundary correctly)',
    setup: 'Table: events (id, event_date DATE)',
    setupCode: `CREATE TABLE events (id SERIAL PRIMARY KEY, event_date DATE);
INSERT INTO events (event_date) VALUES ('2024-01-01'), ('2023-12-31');`,
    expected: 'ISO year may differ from calendar year at boundaries',
    sample: `SELECT event_date,
  EXTRACT(ISOYEAR FROM event_date) AS iso_year,
  EXTRACT(WEEK FROM event_date) AS iso_week
FROM events;`,
    hints: ['ISOYEAR gives ISO week-numbering year', 'Dec 31 might be week 1 of next year'],
    tags: ['datetime', 'isoyear', 'iso-week'],
  },
  {
    id: 'pg-datetime-123',
    category: 'Date/Time',
    difficulty: 'medium',
    title: 'Date Truncation Levels',
    text: 'Truncate timestamp to different precision levels',
    setup: 'A timestamp to truncate',
    setupCode: `-- No table needed`,
    expected: 'Various truncation levels',
    sample: `SELECT
  DATE_TRUNC('year', TIMESTAMP '2024-03-15 14:30:45') AS year,
  DATE_TRUNC('quarter', TIMESTAMP '2024-03-15 14:30:45') AS quarter,
  DATE_TRUNC('week', TIMESTAMP '2024-03-15 14:30:45') AS week,
  DATE_TRUNC('hour', TIMESTAMP '2024-03-15 14:30:45') AS hour;`,
    hints: ['DATE_TRUNC supports many precision levels', 'week starts on Monday (ISO standard)'],
    tags: ['datetime', 'date_trunc', 'precision'],
  },
  {
    id: 'pg-datetime-124',
    category: 'Date/Time',
    difficulty: 'hard',
    title: 'Time Bucket for Analytics',
    text: 'Group timestamps into 15-minute buckets',
    setup: 'Table: events (id, event_time TIMESTAMP)',
    setupCode: `CREATE TABLE events (id SERIAL PRIMARY KEY, event_time TIMESTAMP);
INSERT INTO events (event_time) VALUES
  ('2024-01-01 10:05:00'), ('2024-01-01 10:12:00'), ('2024-01-01 10:20:00');`,
    expected: 'Events grouped into 15-minute intervals',
    sample: `SELECT DATE_TRUNC('hour', event_time) +
  INTERVAL '15 min' * FLOOR(EXTRACT(MINUTE FROM event_time) / 15) AS bucket,
  COUNT(*)
FROM events GROUP BY 1;`,
    hints: ['Calculate bucket by flooring minutes', 'Useful for time-series analytics'],
    tags: ['datetime', 'bucket', 'analytics'],
  },

  // ============================================================
  // NEW PROBLEMS - BATCH 2: STRING FUNCTIONS (25 problems)
  // ============================================================
  {
    id: 'pg-string-100',
    category: 'String Functions',
    difficulty: 'easy',
    title: 'CONCAT Multiple Strings',
    text: 'Concatenate first name and last name with a space',
    setup: 'Table: users (id, first_name TEXT, last_name TEXT)',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT);
INSERT INTO users (first_name, last_name) VALUES ('John', 'Doe'), ('Jane', 'Smith');`,
    expected: ['John Doe', 'Jane Smith'],
    sample: "SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users;",
    hints: ['CONCAT joins multiple strings', 'Handles NULL by treating as empty string'],
    tags: ['string', 'concat', 'basic'],
  },
  {
    id: 'pg-string-101',
    category: 'String Functions',
    difficulty: 'easy',
    title: 'CONCAT_WS with Separator',
    text: 'Concatenate address parts with comma separator',
    setup: 'Table: addresses (city TEXT, state TEXT, country TEXT)',
    setupCode: `CREATE TABLE addresses (id SERIAL PRIMARY KEY, city TEXT, state TEXT, country TEXT);
INSERT INTO addresses (city, state, country) VALUES ('New York', 'NY', 'USA');`,
    expected: 'New York, NY, USA',
    sample: "SELECT CONCAT_WS(', ', city, state, country) FROM addresses;",
    hints: ['CONCAT_WS uses first arg as separator', 'Skips NULL values automatically'],
    tags: ['string', 'concat_ws', 'separator'],
  },
  {
    id: 'pg-string-102',
    category: 'String Functions',
    difficulty: 'easy',
    title: 'UPPER and LOWER',
    text: 'Convert name to uppercase and email to lowercase',
    setup: 'Table: users (name TEXT, email TEXT)',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT, email TEXT);
INSERT INTO users (name, email) VALUES ('John Doe', 'John.Doe@Example.COM');`,
    expected: { name: 'JOHN DOE', email: 'john.doe@example.com' },
    sample: 'SELECT UPPER(name), LOWER(email) FROM users;',
    hints: ['UPPER converts to uppercase', 'LOWER converts to lowercase'],
    tags: ['string', 'upper', 'lower'],
  },
  {
    id: 'pg-string-103',
    category: 'String Functions',
    difficulty: 'easy',
    title: 'INITCAP - Title Case',
    text: 'Convert text to title case (capitalize first letter of each word)',
    setup: 'Table: articles (title TEXT)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, title TEXT);
INSERT INTO articles (title) VALUES ('hello world'), ('POSTGRESQL DATABASE');`,
    expected: ['Hello World', 'Postgresql Database'],
    sample: 'SELECT INITCAP(title) FROM articles;',
    hints: ['INITCAP capitalizes first letter of each word', 'Lowercases the rest'],
    tags: ['string', 'initcap', 'title-case'],
  },
  {
    id: 'pg-string-104',
    category: 'String Functions',
    difficulty: 'medium',
    title: 'SPLIT_PART Function',
    text: 'Extract the domain from an email address',
    setup: 'Table: users (email TEXT)',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT);
INSERT INTO users (email) VALUES ('john@example.com'), ('jane@company.org');`,
    expected: ['example.com', 'company.org'],
    sample: "SELECT SPLIT_PART(email, '@', 2) AS domain FROM users;",
    hints: [
      'SPLIT_PART splits by delimiter and gets nth part',
      'Parts are numbered starting from 1',
    ],
    tags: ['string', 'split_part', 'extract'],
  },
  {
    id: 'pg-string-105',
    category: 'String Functions',
    difficulty: 'medium',
    title: 'LEFT and RIGHT Functions',
    text: 'Get the first 3 and last 4 characters of a product code',
    setup: 'Table: products (code TEXT)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, code TEXT);
INSERT INTO products (code) VALUES ('ABC-1234'), ('XYZ-5678');`,
    expected: [{ prefix: 'ABC', suffix: '1234' }],
    sample: 'SELECT LEFT(code, 3) AS prefix, RIGHT(code, 4) AS suffix FROM products;',
    hints: ['LEFT gets n characters from start', 'RIGHT gets n characters from end'],
    tags: ['string', 'left', 'right'],
  },
  {
    id: 'pg-string-106',
    category: 'String Functions',
    difficulty: 'medium',
    title: 'SUBSTRING with Position',
    text: 'Extract characters 5-8 from a string',
    setup: 'Table: codes (code TEXT)',
    setupCode: `CREATE TABLE codes (id SERIAL PRIMARY KEY, code TEXT);
INSERT INTO codes (code) VALUES ('ABCD1234EFGH');`,
    expected: '1234',
    sample: 'SELECT SUBSTRING(code FROM 5 FOR 4) FROM codes;',
    hints: ['SUBSTRING(string FROM start FOR length)', 'Position starts at 1'],
    tags: ['string', 'substring', 'extract'],
  },
  {
    id: 'pg-string-107',
    category: 'String Functions',
    difficulty: 'medium',
    title: 'POSITION - Find Substring',
    text: 'Find the position of "@" in an email',
    setup: 'Table: users (email TEXT)',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT);
INSERT INTO users (email) VALUES ('john@example.com');`,
    expected: 5,
    sample: "SELECT POSITION('@' IN email) FROM users;",
    hints: ['POSITION returns 1-based index', 'Returns 0 if not found'],
    tags: ['string', 'position', 'find'],
  },
  {
    id: 'pg-string-108',
    category: 'String Functions',
    difficulty: 'medium',
    title: 'REPLACE Function',
    text: 'Replace all spaces with underscores in a string',
    setup: 'Table: files (name TEXT)',
    setupCode: `CREATE TABLE files (id SERIAL PRIMARY KEY, name TEXT);
INSERT INTO files (name) VALUES ('my file name.txt');`,
    expected: 'my_file_name.txt',
    sample: "SELECT REPLACE(name, ' ', '_') FROM files;",
    hints: ['REPLACE(string, from, to)', 'Replaces all occurrences'],
    tags: ['string', 'replace', 'substitute'],
  },
  {
    id: 'pg-string-109',
    category: 'String Functions',
    difficulty: 'hard',
    title: 'REGEXP_REPLACE',
    text: 'Remove all non-alphanumeric characters from a string',
    setup: 'Table: data (text_value TEXT)',
    setupCode: `CREATE TABLE data (id SERIAL PRIMARY KEY, text_value TEXT);
INSERT INTO data (text_value) VALUES ('Hello, World! 123');`,
    expected: 'HelloWorld123',
    sample: "SELECT REGEXP_REPLACE(text_value, '[^a-zA-Z0-9]', '', 'g') FROM data;",
    hints: ['REGEXP_REPLACE uses regex patterns', 'g flag replaces all occurrences'],
    tags: ['string', 'regexp_replace', 'regex'],
  },
  {
    id: 'pg-string-110',
    category: 'String Functions',
    difficulty: 'hard',
    title: 'REGEXP_MATCHES - Extract Pattern',
    text: 'Extract all numbers from a string',
    setup: 'Table: data (text_value TEXT)',
    setupCode: `CREATE TABLE data (id SERIAL PRIMARY KEY, text_value TEXT);
INSERT INTO data (text_value) VALUES ('Order 123 has 45 items');`,
    expected: ['123', '45'],
    sample: "SELECT REGEXP_MATCHES(text_value, '\\d+', 'g') FROM data;",
    hints: ['REGEXP_MATCHES returns array of matches', 'g flag returns all matches as rows'],
    tags: ['string', 'regexp_matches', 'extract'],
  },
  {
    id: 'pg-string-111',
    category: 'String Functions',
    difficulty: 'medium',
    title: 'TRIM Functions',
    text: 'Remove leading/trailing whitespace and specific characters',
    setup: 'Table: data (value TEXT)',
    setupCode: `CREATE TABLE data (id SERIAL PRIMARY KEY, value TEXT);
INSERT INTO data (value) VALUES ('  hello  '), ('***text***');`,
    expected: ['hello', 'text'],
    sample: `SELECT TRIM(value), TRIM(BOTH '*' FROM value) FROM data;`,
    hints: ['TRIM removes whitespace by default', 'Can specify characters to remove'],
    tags: ['string', 'trim', 'clean'],
  },
  {
    id: 'pg-string-112',
    category: 'String Functions',
    difficulty: 'medium',
    title: 'LTRIM and RTRIM',
    text: 'Remove leading zeros from a string',
    setup: 'Table: codes (code TEXT)',
    setupCode: `CREATE TABLE codes (id SERIAL PRIMARY KEY, code TEXT);
INSERT INTO codes (code) VALUES ('000123'), ('007890');`,
    expected: ['123', '7890'],
    sample: "SELECT LTRIM(code, '0') FROM codes;",
    hints: ['LTRIM removes from left side', 'RTRIM removes from right side'],
    tags: ['string', 'ltrim', 'rtrim'],
  },
  {
    id: 'pg-string-113',
    category: 'String Functions',
    difficulty: 'medium',
    title: 'LPAD and RPAD',
    text: 'Pad a number with leading zeros to 6 characters',
    setup: 'Table: orders (order_num INTEGER)',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, order_num INTEGER);
INSERT INTO orders (order_num) VALUES (123), (45), (6789);`,
    expected: ['000123', '000045', '006789'],
    sample: "SELECT LPAD(order_num::text, 6, '0') FROM orders;",
    hints: ['LPAD pads on the left', 'First convert integer to text'],
    tags: ['string', 'lpad', 'padding'],
  },
  {
    id: 'pg-string-114',
    category: 'String Functions',
    difficulty: 'easy',
    title: 'LENGTH and CHAR_LENGTH',
    text: 'Get the length of a string in characters',
    setup: 'Table: texts (content TEXT)',
    setupCode: `CREATE TABLE texts (id SERIAL PRIMARY KEY, content TEXT);
INSERT INTO texts (content) VALUES ('Hello'), ('World!');`,
    expected: [5, 6],
    sample: 'SELECT LENGTH(content) FROM texts;',
    hints: ['LENGTH returns character count', 'CHAR_LENGTH is an alias'],
    tags: ['string', 'length', 'count'],
  },
  {
    id: 'pg-string-115',
    category: 'String Functions',
    difficulty: 'medium',
    title: 'REPEAT Function',
    text: 'Repeat a string multiple times',
    setup: 'No table needed',
    setupCode: `-- No table needed`,
    expected: '***',
    sample: "SELECT REPEAT('*', 3);",
    hints: ['REPEAT(string, n) repeats n times', 'Useful for generating patterns'],
    tags: ['string', 'repeat', 'generate'],
  },
  {
    id: 'pg-string-116',
    category: 'String Functions',
    difficulty: 'medium',
    title: 'REVERSE Function',
    text: 'Reverse a string',
    setup: 'Table: words (word TEXT)',
    setupCode: `CREATE TABLE words (id SERIAL PRIMARY KEY, word TEXT);
INSERT INTO words (word) VALUES ('hello'), ('world');`,
    expected: ['olleh', 'dlrow'],
    sample: 'SELECT REVERSE(word) FROM words;',
    hints: ['REVERSE reverses character order', 'Works on any string'],
    tags: ['string', 'reverse', 'transform'],
  },
  {
    id: 'pg-string-117',
    category: 'String Functions',
    difficulty: 'hard',
    title: 'STRING_TO_ARRAY',
    text: 'Split a comma-separated string into an array',
    setup: 'Table: data (tags TEXT)',
    setupCode: `CREATE TABLE data (id SERIAL PRIMARY KEY, tags TEXT);
INSERT INTO data (tags) VALUES ('sql,postgres,database');`,
    expected: ['sql', 'postgres', 'database'],
    sample: "SELECT STRING_TO_ARRAY(tags, ',') FROM data;",
    hints: ['STRING_TO_ARRAY splits by delimiter', 'Returns a TEXT array'],
    tags: ['string', 'string_to_array', 'split'],
  },
  {
    id: 'pg-string-118',
    category: 'String Functions',
    difficulty: 'medium',
    title: 'ARRAY_TO_STRING',
    text: 'Convert an array back to a string with custom separator',
    setup: 'Table: data (tags TEXT[])',
    setupCode: `CREATE TABLE data (id SERIAL PRIMARY KEY, tags TEXT[]);
INSERT INTO data (tags) VALUES (ARRAY['sql', 'postgres', 'database']);`,
    expected: 'sql | postgres | database',
    sample: "SELECT ARRAY_TO_STRING(tags, ' | ') FROM data;",
    hints: ['ARRAY_TO_STRING joins with separator', 'Opposite of STRING_TO_ARRAY'],
    tags: ['string', 'array_to_string', 'join'],
  },
  {
    id: 'pg-string-119',
    category: 'String Functions',
    difficulty: 'hard',
    title: 'REGEXP_SPLIT_TO_ARRAY',
    text: 'Split a string by regex pattern (multiple delimiters)',
    setup: 'Table: data (text_value TEXT)',
    setupCode: `CREATE TABLE data (id SERIAL PRIMARY KEY, text_value TEXT);
INSERT INTO data (text_value) VALUES ('apple,banana;cherry orange');`,
    expected: ['apple', 'banana', 'cherry', 'orange'],
    sample: "SELECT REGEXP_SPLIT_TO_ARRAY(text_value, '[,; ]+') FROM data;",
    hints: [
      'REGEXP_SPLIT_TO_ARRAY uses regex as delimiter',
      '[,; ]+ matches comma, semicolon, or space',
    ],
    tags: ['string', 'regexp_split', 'array'],
  },
  {
    id: 'pg-string-120',
    category: 'String Functions',
    difficulty: 'hard',
    title: 'TRANSLATE Function',
    text: 'Replace multiple characters at once',
    setup: 'Table: data (text_value TEXT)',
    setupCode: `CREATE TABLE data (id SERIAL PRIMARY KEY, text_value TEXT);
INSERT INTO data (text_value) VALUES ('Hello World');`,
    expected: 'He110 W0r1d',
    sample: "SELECT TRANSLATE(text_value, 'loOL', '100L') FROM data;",
    hints: ['TRANSLATE replaces characters 1-to-1', 'Second and third args map characters'],
    tags: ['string', 'translate', 'replace'],
  },
  {
    id: 'pg-string-121',
    category: 'String Functions',
    difficulty: 'medium',
    title: 'OVERLAY Function',
    text: 'Replace part of a string with another string',
    setup: 'Table: data (text_value TEXT)',
    setupCode: `CREATE TABLE data (id SERIAL PRIMARY KEY, text_value TEXT);
INSERT INTO data (text_value) VALUES ('Hello World');`,
    expected: 'Hello PostgreSQL',
    sample: "SELECT OVERLAY(text_value PLACING 'PostgreSQL' FROM 7) FROM data;",
    hints: ['OVERLAY replaces substring at position', 'Can specify length to replace'],
    tags: ['string', 'overlay', 'replace'],
  },
  {
    id: 'pg-string-122',
    category: 'String Functions',
    difficulty: 'hard',
    title: 'FORMAT Function',
    text: 'Format a string with placeholders',
    setup: 'Table: users (name TEXT, age INTEGER)',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT, age INTEGER);
INSERT INTO users (name, age) VALUES ('John', 30);`,
    expected: 'User John is 30 years old',
    sample: "SELECT FORMAT('User %s is %s years old', name, age) FROM users;",
    hints: ['FORMAT uses %s for string placeholders', 'Similar to printf in other languages'],
    tags: ['string', 'format', 'template'],
  },
  {
    id: 'pg-string-123',
    category: 'String Functions',
    difficulty: 'medium',
    title: 'QUOTE_IDENT and QUOTE_LITERAL',
    text: 'Safely quote identifiers and literals for dynamic SQL',
    setup: 'Values that need quoting',
    setupCode: `-- No table needed`,
    expected: 'Safely quoted strings',
    sample: `SELECT QUOTE_IDENT('table name'), QUOTE_LITERAL('it''s a test');`,
    hints: [
      'QUOTE_IDENT quotes identifiers (table/column names)',
      'QUOTE_LITERAL quotes string values',
    ],
    tags: ['string', 'quote', 'dynamic-sql'],
  },
  {
    id: 'pg-string-124',
    category: 'String Functions',
    difficulty: 'hard',
    title: 'ENCODE and DECODE',
    text: 'Encode binary data to base64 and decode back',
    setup: 'Binary data to encode',
    setupCode: `-- No table needed`,
    expected: 'SGVsbG8gV29ybGQ=',
    sample: "SELECT ENCODE('Hello World'::bytea, 'base64');",
    hints: ['ENCODE converts bytea to text', 'Supports base64, hex, escape formats'],
    tags: ['string', 'encode', 'base64'],
  },

  // ============================================================
  // NEW PROBLEMS - BATCH 3: SUBQUERIES (25 problems)
  // ============================================================
  {
    id: 'pg-subq-100',
    category: 'Subqueries',
    difficulty: 'easy',
    title: 'Simple Scalar Subquery',
    text: 'Find employees earning more than the average salary',
    setup: 'Table: employees (id, name TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, salary NUMERIC);
INSERT INTO employees (name, salary) VALUES ('Alice', 50000), ('Bob', 60000), ('Carol', 70000), ('Dave', 40000);`,
    expected: [{ name: 'Bob' }, { name: 'Carol' }],
    sample: 'SELECT name FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);',
    hints: ['Scalar subquery returns single value', 'Use in comparison operators'],
    tags: ['subquery', 'scalar', 'comparison'],
  },
  {
    id: 'pg-subq-101',
    category: 'Subqueries',
    difficulty: 'easy',
    title: 'IN Subquery',
    text: 'Find customers who have placed orders',
    setup: 'Tables: customers, orders',
    setupCode: `CREATE TABLE customers (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE orders (id SERIAL, customer_id INTEGER);
INSERT INTO customers (name) VALUES ('Alice'), ('Bob'), ('Carol');
INSERT INTO orders (customer_id) VALUES (1), (1), (3);`,
    expected: [{ name: 'Alice' }, { name: 'Carol' }],
    sample: 'SELECT name FROM customers WHERE id IN (SELECT customer_id FROM orders);',
    hints: ['IN checks if value exists in subquery result', 'Subquery returns a list of values'],
    tags: ['subquery', 'in', 'membership'],
  },
  {
    id: 'pg-subq-102',
    category: 'Subqueries',
    difficulty: 'easy',
    title: 'NOT IN Subquery',
    text: 'Find customers who have never placed an order',
    setup: 'Tables: customers, orders',
    setupCode: `CREATE TABLE customers (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE orders (id SERIAL, customer_id INTEGER);
INSERT INTO customers (name) VALUES ('Alice'), ('Bob'), ('Carol');
INSERT INTO orders (customer_id) VALUES (1), (3);`,
    expected: [{ name: 'Bob' }],
    sample: 'SELECT name FROM customers WHERE id NOT IN (SELECT customer_id FROM orders);',
    hints: ['NOT IN excludes values found in subquery', 'Be careful with NULLs in NOT IN'],
    tags: ['subquery', 'not-in', 'exclusion'],
  },
  {
    id: 'pg-subq-103',
    category: 'Subqueries',
    difficulty: 'medium',
    title: 'EXISTS Subquery',
    text: 'Find customers who have at least one order',
    setup: 'Tables: customers, orders',
    setupCode: `CREATE TABLE customers (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE orders (id SERIAL, customer_id INTEGER);
INSERT INTO customers (name) VALUES ('Alice'), ('Bob'), ('Carol');
INSERT INTO orders (customer_id) VALUES (1), (1), (3);`,
    expected: [{ name: 'Alice' }, { name: 'Carol' }],
    sample:
      'SELECT name FROM customers c WHERE EXISTS (SELECT 1 FROM orders WHERE customer_id = c.id);',
    hints: [
      'EXISTS returns true if subquery has any rows',
      'More efficient than IN for large datasets',
    ],
    tags: ['subquery', 'exists', 'correlated'],
  },
  {
    id: 'pg-subq-104',
    category: 'Subqueries',
    difficulty: 'medium',
    title: 'NOT EXISTS Subquery',
    text: 'Find products with no sales',
    setup: 'Tables: products, sales',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE sales (id SERIAL, product_id INTEGER);
INSERT INTO products (name) VALUES ('Widget'), ('Gadget'), ('Tool');
INSERT INTO sales (product_id) VALUES (1), (1), (3);`,
    expected: [{ name: 'Gadget' }],
    sample:
      'SELECT name FROM products p WHERE NOT EXISTS (SELECT 1 FROM sales WHERE product_id = p.id);',
    hints: [
      'NOT EXISTS returns true if subquery has no rows',
      'Handles NULLs correctly unlike NOT IN',
    ],
    tags: ['subquery', 'not-exists', 'correlated'],
  },
  {
    id: 'pg-subq-105',
    category: 'Subqueries',
    difficulty: 'medium',
    title: 'Correlated Subquery',
    text: 'Find the highest salary in each department using correlated subquery',
    setup: 'Table: employees (id, name TEXT, department TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT, salary NUMERIC);
INSERT INTO employees (name, department, salary) VALUES
  ('Alice', 'Eng', 80000), ('Bob', 'Eng', 90000), ('Carol', 'Sales', 60000), ('Dave', 'Sales', 70000);`,
    expected: [{ name: 'Bob' }, { name: 'Dave' }],
    sample: `SELECT name FROM employees e1
WHERE salary = (SELECT MAX(salary) FROM employees e2 WHERE e2.department = e1.department);`,
    hints: ['Correlated subquery references outer query', 'Executed once per row of outer query'],
    tags: ['subquery', 'correlated', 'max-per-group'],
  },
  {
    id: 'pg-subq-106',
    category: 'Subqueries',
    difficulty: 'hard',
    title: 'ALL Comparison',
    text: 'Find employees earning more than ALL employees in Sales department',
    setup: 'Table: employees (id, name TEXT, department TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT, salary NUMERIC);
INSERT INTO employees (name, department, salary) VALUES
  ('Alice', 'Eng', 80000), ('Bob', 'Eng', 90000), ('Carol', 'Sales', 60000), ('Dave', 'Sales', 50000);`,
    expected: [{ name: 'Alice' }, { name: 'Bob' }],
    sample:
      "SELECT name FROM employees WHERE salary > ALL (SELECT salary FROM employees WHERE department = 'Sales');",
    hints: [
      'ALL requires comparison true for all subquery values',
      '> ALL means greater than the maximum',
    ],
    tags: ['subquery', 'all', 'comparison'],
  },
  {
    id: 'pg-subq-107',
    category: 'Subqueries',
    difficulty: 'medium',
    title: 'ANY/SOME Comparison',
    text: 'Find employees earning more than ANY employee in Sales',
    setup: 'Table: employees (id, name TEXT, department TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT, salary NUMERIC);
INSERT INTO employees (name, department, salary) VALUES
  ('Alice', 'Eng', 55000), ('Bob', 'Eng', 45000), ('Carol', 'Sales', 60000), ('Dave', 'Sales', 50000);`,
    expected: [{ name: 'Alice' }],
    sample:
      "SELECT name FROM employees WHERE department = 'Eng' AND salary > ANY (SELECT salary FROM employees WHERE department = 'Sales');",
    hints: [
      'ANY requires comparison true for at least one value',
      '> ANY means greater than the minimum',
    ],
    tags: ['subquery', 'any', 'comparison'],
  },
  {
    id: 'pg-subq-108',
    category: 'Subqueries',
    difficulty: 'hard',
    title: 'Subquery in FROM Clause',
    text: 'Calculate average of department averages (derived table)',
    setup: 'Table: employees (id, name TEXT, department TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT, salary NUMERIC);
INSERT INTO employees (name, department, salary) VALUES
  ('A', 'Eng', 80000), ('B', 'Eng', 90000), ('C', 'Sales', 50000), ('D', 'Sales', 60000);`,
    expected: 70000,
    sample: `SELECT AVG(dept_avg) FROM (SELECT department, AVG(salary) AS dept_avg FROM employees GROUP BY department) AS dept_averages;`,
    hints: ['Subquery in FROM creates derived table', 'Must have an alias'],
    tags: ['subquery', 'derived-table', 'from'],
  },
  {
    id: 'pg-subq-109',
    category: 'Subqueries',
    difficulty: 'hard',
    title: 'LATERAL Join',
    text: 'Get top 2 orders for each customer using LATERAL',
    setup: 'Tables: customers, orders',
    setupCode: `CREATE TABLE customers (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE orders (id SERIAL, customer_id INTEGER, amount NUMERIC, order_date DATE);
INSERT INTO customers (name) VALUES ('Alice'), ('Bob');
INSERT INTO orders (customer_id, amount, order_date) VALUES
  (1, 100, '2024-01-01'), (1, 200, '2024-01-02'), (1, 150, '2024-01-03'),
  (2, 300, '2024-01-01'), (2, 250, '2024-01-02');`,
    expected: 'Top 2 orders per customer',
    sample: `SELECT c.name, o.amount FROM customers c
CROSS JOIN LATERAL (
  SELECT amount FROM orders WHERE customer_id = c.id ORDER BY amount DESC LIMIT 2
) o;`,
    hints: [
      'LATERAL allows subquery to reference outer table',
      'Essential for top-N per group queries',
    ],
    tags: ['subquery', 'lateral', 'top-n'],
  },
  {
    id: 'pg-subq-110',
    category: 'Subqueries',
    difficulty: 'medium',
    title: 'Subquery in SELECT',
    text: 'Show each employee with their department average salary',
    setup: 'Table: employees (id, name TEXT, department TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT, salary NUMERIC);
INSERT INTO employees (name, department, salary) VALUES
  ('Alice', 'Eng', 80000), ('Bob', 'Eng', 90000), ('Carol', 'Sales', 60000);`,
    expected: 'Each employee with department average',
    sample: `SELECT name, salary,
  (SELECT AVG(salary) FROM employees e2 WHERE e2.department = e1.department) AS dept_avg
FROM employees e1;`,
    hints: ['Scalar subquery can appear in SELECT list', 'Correlated to get value per row'],
    tags: ['subquery', 'select', 'scalar'],
  },
  {
    id: 'pg-subq-111',
    category: 'Subqueries',
    difficulty: 'hard',
    title: 'Multiple Column Subquery',
    text: 'Find employees with the same department and salary as any manager',
    setup: 'Tables: employees, managers',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT, salary NUMERIC);
CREATE TABLE managers (id SERIAL, department TEXT, salary NUMERIC);
INSERT INTO employees (name, department, salary) VALUES
  ('Alice', 'Eng', 80000), ('Bob', 'Eng', 90000), ('Carol', 'Sales', 70000);
INSERT INTO managers (department, salary) VALUES ('Eng', 90000), ('Sales', 60000);`,
    expected: [{ name: 'Bob' }],
    sample:
      'SELECT name FROM employees WHERE (department, salary) IN (SELECT department, salary FROM managers);',
    hints: ['Row constructor (col1, col2) for multi-column comparison', 'Both columns must match'],
    tags: ['subquery', 'multi-column', 'in'],
  },
  {
    id: 'pg-subq-112',
    category: 'Subqueries',
    difficulty: 'hard',
    title: 'Subquery with HAVING',
    text: 'Find departments with above-average headcount',
    setup: 'Table: employees (id, department TEXT)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, department TEXT);
INSERT INTO employees (department) VALUES ('Eng'), ('Eng'), ('Eng'), ('Sales'), ('HR');`,
    expected: [{ department: 'Eng' }],
    sample: `SELECT department, COUNT(*) FROM employees
GROUP BY department
HAVING COUNT(*) > (SELECT AVG(cnt) FROM (SELECT COUNT(*) AS cnt FROM employees GROUP BY department) sub);`,
    hints: [
      'Subquery in HAVING for aggregate comparison',
      'Compare group aggregate to overall statistic',
    ],
    tags: ['subquery', 'having', 'aggregate'],
  },
  {
    id: 'pg-subq-113',
    category: 'Subqueries',
    difficulty: 'medium',
    title: 'Self-Referencing Subquery',
    text: 'Find employees who earn more than their manager',
    setup: 'Table: employees (id, name TEXT, salary NUMERIC, manager_id INTEGER)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, salary NUMERIC, manager_id INTEGER);
INSERT INTO employees (name, salary, manager_id) VALUES
  ('CEO', 150000, NULL), ('Manager', 100000, 1), ('Worker1', 110000, 2), ('Worker2', 80000, 2);`,
    expected: [{ name: 'Worker1' }],
    sample: `SELECT e.name FROM employees e
WHERE e.salary > (SELECT salary FROM employees WHERE id = e.manager_id);`,
    hints: ['Self-join via correlated subquery', 'Compare employee salary to manager salary'],
    tags: ['subquery', 'self-reference', 'hierarchy'],
  },
  {
    id: 'pg-subq-114',
    category: 'Subqueries',
    difficulty: 'hard',
    title: 'Subquery for Running Comparison',
    text: 'Find days where sales exceeded all previous days',
    setup: 'Table: daily_sales (sale_date DATE, amount NUMERIC)',
    setupCode: `CREATE TABLE daily_sales (sale_date DATE, amount NUMERIC);
INSERT INTO daily_sales VALUES ('2024-01-01', 100), ('2024-01-02', 150), ('2024-01-03', 120), ('2024-01-04', 200);`,
    expected: [
      { sale_date: '2024-01-01' },
      { sale_date: '2024-01-02' },
      { sale_date: '2024-01-04' },
    ],
    sample: `SELECT sale_date FROM daily_sales d1
WHERE amount > ALL (SELECT amount FROM daily_sales d2 WHERE d2.sale_date < d1.sale_date);`,
    hints: ['ALL comparison with empty set is always true', 'First day always qualifies'],
    tags: ['subquery', 'all', 'running'],
  },
  {
    id: 'pg-subq-115',
    category: 'Subqueries',
    difficulty: 'medium',
    title: 'Subquery with DISTINCT',
    text: 'Find products ordered by at least 3 different customers',
    setup: 'Tables: products, orders',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE orders (id SERIAL, product_id INTEGER, customer_id INTEGER);
INSERT INTO products (name) VALUES ('Widget'), ('Gadget');
INSERT INTO orders (product_id, customer_id) VALUES (1,1), (1,2), (1,3), (1,1), (2,1), (2,2);`,
    expected: [{ name: 'Widget' }],
    sample: `SELECT name FROM products p
WHERE (SELECT COUNT(DISTINCT customer_id) FROM orders WHERE product_id = p.id) >= 3;`,
    hints: ['COUNT DISTINCT in subquery', 'Correlated to count per product'],
    tags: ['subquery', 'distinct', 'count'],
  },
  {
    id: 'pg-subq-116',
    category: 'Subqueries',
    difficulty: 'hard',
    title: 'Nested Subqueries',
    text: 'Find employees in the department with the highest total salary',
    setup: 'Table: employees (id, name TEXT, department TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, department TEXT, salary NUMERIC);
INSERT INTO employees (name, department, salary) VALUES
  ('A', 'Eng', 80000), ('B', 'Eng', 90000), ('C', 'Sales', 50000);`,
    expected: [{ name: 'A' }, { name: 'B' }],
    sample: `SELECT name FROM employees WHERE department = (
  SELECT department FROM employees GROUP BY department ORDER BY SUM(salary) DESC LIMIT 1
);`,
    hints: ['Inner subquery finds top department', 'Outer query filters employees'],
    tags: ['subquery', 'nested', 'aggregate'],
  },
  {
    id: 'pg-subq-117',
    category: 'Subqueries',
    difficulty: 'hard',
    title: 'Subquery with UPDATE',
    text: 'Update product prices to match competitor prices',
    setup: 'Tables: products, competitor_prices',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, price NUMERIC);
CREATE TABLE competitor_prices (product_name TEXT, price NUMERIC);
INSERT INTO products (name, price) VALUES ('Widget', 100), ('Gadget', 200);
INSERT INTO competitor_prices VALUES ('Widget', 90), ('Gadget', 180);`,
    expected: 'Prices updated from competitor data',
    sample: `UPDATE products p SET price = (
  SELECT cp.price FROM competitor_prices cp WHERE cp.product_name = p.name
) WHERE EXISTS (SELECT 1 FROM competitor_prices WHERE product_name = p.name);`,
    hints: ['Subquery in SET clause for update value', 'EXISTS in WHERE ensures match exists'],
    tags: ['subquery', 'update', 'correlated'],
  },
  {
    id: 'pg-subq-118',
    category: 'Subqueries',
    difficulty: 'medium',
    title: 'Subquery with DELETE',
    text: 'Delete orders from customers who have not logged in',
    setup: 'Tables: customers, orders',
    setupCode: `CREATE TABLE customers (id SERIAL PRIMARY KEY, name TEXT, last_login DATE);
CREATE TABLE orders (id SERIAL, customer_id INTEGER);
INSERT INTO customers (name, last_login) VALUES ('Alice', '2024-01-01'), ('Bob', NULL);
INSERT INTO orders (customer_id) VALUES (1), (2), (2);`,
    expected: 'Orders deleted for inactive customers',
    sample:
      'DELETE FROM orders WHERE customer_id IN (SELECT id FROM customers WHERE last_login IS NULL);',
    hints: [
      'IN subquery identifies which rows to delete',
      'Subquery returns customer IDs to remove',
    ],
    tags: ['subquery', 'delete', 'in'],
  },
  {
    id: 'pg-subq-119',
    category: 'Subqueries',
    difficulty: 'hard',
    title: 'Subquery with INSERT',
    text: 'Insert summary records from detailed data',
    setup: 'Tables: daily_sales, monthly_summary',
    setupCode: `CREATE TABLE daily_sales (sale_date DATE, amount NUMERIC);
CREATE TABLE monthly_summary (month DATE, total NUMERIC);
INSERT INTO daily_sales VALUES ('2024-01-01', 100), ('2024-01-15', 200), ('2024-02-01', 150);`,
    expected: 'Monthly totals inserted',
    sample: `INSERT INTO monthly_summary (month, total)
SELECT DATE_TRUNC('month', sale_date)::date, SUM(amount)
FROM daily_sales GROUP BY DATE_TRUNC('month', sale_date);`,
    hints: ['INSERT ... SELECT inserts from query results', 'Subquery can include aggregation'],
    tags: ['subquery', 'insert', 'aggregate'],
  },
  {
    id: 'pg-subq-120',
    category: 'Subqueries',
    difficulty: 'hard',
    title: 'LATERAL with Generate Series',
    text: 'Generate rows for each item with quantity',
    setup: 'Table: items (name TEXT, quantity INTEGER)',
    setupCode: `CREATE TABLE items (id SERIAL PRIMARY KEY, name TEXT, quantity INTEGER);
INSERT INTO items (name, quantity) VALUES ('Apple', 3), ('Banana', 2);`,
    expected: 'One row per unit of each item',
    sample: `SELECT i.name, g.n FROM items i
CROSS JOIN LATERAL generate_series(1, i.quantity) AS g(n);`,
    hints: [
      'LATERAL allows generate_series to use table column',
      'Generates variable number of rows per item',
    ],
    tags: ['subquery', 'lateral', 'generate_series'],
  },
  {
    id: 'pg-subq-121',
    category: 'Subqueries',
    difficulty: 'medium',
    title: 'Subquery for Percentage',
    text: 'Show each category sales as percentage of total',
    setup: 'Table: sales (category TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, category TEXT, amount NUMERIC);
INSERT INTO sales (category, amount) VALUES ('A', 100), ('A', 200), ('B', 300), ('B', 400);`,
    expected: [
      { category: 'A', pct: 30 },
      { category: 'B', pct: 70 },
    ],
    sample: `SELECT category, ROUND(100.0 * SUM(amount) / (SELECT SUM(amount) FROM sales), 0) AS pct
FROM sales GROUP BY category;`,
    hints: [
      'Total in subquery for percentage calculation',
      'Subquery executes once for whole query',
    ],
    tags: ['subquery', 'percentage', 'scalar'],
  },
  {
    id: 'pg-subq-122',
    category: 'Subqueries',
    difficulty: 'hard',
    title: 'Anti-Join with NOT EXISTS',
    text: 'Find categories with no products',
    setup: 'Tables: categories, products',
    setupCode: `CREATE TABLE categories (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE products (id SERIAL, category_id INTEGER, name TEXT);
INSERT INTO categories (name) VALUES ('Electronics'), ('Clothing'), ('Books');
INSERT INTO products (category_id, name) VALUES (1, 'Phone'), (1, 'Laptop');`,
    expected: [{ name: 'Clothing' }, { name: 'Books' }],
    sample:
      'SELECT name FROM categories c WHERE NOT EXISTS (SELECT 1 FROM products WHERE category_id = c.id);',
    hints: ['NOT EXISTS for anti-join pattern', 'More NULL-safe than NOT IN'],
    tags: ['subquery', 'anti-join', 'not-exists'],
  },
  {
    id: 'pg-subq-123',
    category: 'Subqueries',
    difficulty: 'hard',
    title: 'Semi-Join with EXISTS',
    text: 'Find authors who have written best-sellers',
    setup: 'Tables: authors, books',
    setupCode: `CREATE TABLE authors (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE books (id SERIAL, author_id INTEGER, is_bestseller BOOLEAN);
INSERT INTO authors (name) VALUES ('Author A'), ('Author B'), ('Author C');
INSERT INTO books (author_id, is_bestseller) VALUES (1, true), (1, false), (2, false);`,
    expected: [{ name: 'Author A' }],
    sample:
      'SELECT name FROM authors a WHERE EXISTS (SELECT 1 FROM books WHERE author_id = a.id AND is_bestseller);',
    hints: ['EXISTS for semi-join pattern', 'More efficient than IN for this case'],
    tags: ['subquery', 'semi-join', 'exists'],
  },
  {
    id: 'pg-subq-124',
    category: 'Subqueries',
    difficulty: 'hard',
    title: 'LEFT JOIN LATERAL',
    text: 'Get latest order for each customer, including customers with no orders',
    setup: 'Tables: customers, orders',
    setupCode: `CREATE TABLE customers (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE orders (id SERIAL, customer_id INTEGER, order_date DATE);
INSERT INTO customers (name) VALUES ('Alice'), ('Bob'), ('Carol');
INSERT INTO orders (customer_id, order_date) VALUES (1, '2024-01-01'), (1, '2024-01-15'), (3, '2024-01-10');`,
    expected: 'All customers with their latest order (or NULL)',
    sample: `SELECT c.name, o.order_date FROM customers c
LEFT JOIN LATERAL (
  SELECT order_date FROM orders WHERE customer_id = c.id ORDER BY order_date DESC LIMIT 1
) o ON true;`,
    hints: [
      'LEFT JOIN LATERAL keeps customers without orders',
      'ON true is required for unconditional join',
    ],
    tags: ['subquery', 'lateral', 'left-join'],
  },

  // ============================================================
  // NEW PROBLEMS - BATCH 3: CASE EXPRESSIONS (25 problems)
  // ============================================================
  {
    id: 'pg-case-100',
    category: 'CASE Expressions',
    difficulty: 'easy',
    title: 'Simple CASE Expression',
    text: 'Categorize products by type code (1=Electronics, 2=Clothing, 3=Food)',
    setup: 'Table: products (id, name TEXT, type_code INTEGER)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, type_code INTEGER);
INSERT INTO products (name, type_code) VALUES ('Phone', 1), ('Shirt', 2), ('Apple', 3);`,
    expected: ['Electronics', 'Clothing', 'Food'],
    sample: `SELECT name, CASE type_code
  WHEN 1 THEN 'Electronics'
  WHEN 2 THEN 'Clothing'
  WHEN 3 THEN 'Food'
  ELSE 'Other'
END AS category FROM products;`,
    hints: ['Simple CASE compares expression to values', 'ELSE handles unmatched cases'],
    tags: ['case', 'simple', 'mapping'],
  },
  {
    id: 'pg-case-101',
    category: 'CASE Expressions',
    difficulty: 'easy',
    title: 'Searched CASE Expression',
    text: 'Categorize salaries as Low, Medium, or High',
    setup: 'Table: employees (id, name TEXT, salary NUMERIC)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, name TEXT, salary NUMERIC);
INSERT INTO employees (name, salary) VALUES ('Alice', 30000), ('Bob', 60000), ('Carol', 90000);`,
    expected: [
      { name: 'Alice', level: 'Low' },
      { name: 'Bob', level: 'Medium' },
      { name: 'Carol', level: 'High' },
    ],
    sample: `SELECT name, CASE
  WHEN salary < 40000 THEN 'Low'
  WHEN salary < 80000 THEN 'Medium'
  ELSE 'High'
END AS level FROM employees;`,
    hints: ['Searched CASE evaluates conditions in order', 'First true condition wins'],
    tags: ['case', 'searched', 'ranges'],
  },
  {
    id: 'pg-case-102',
    category: 'CASE Expressions',
    difficulty: 'medium',
    title: 'CASE in ORDER BY',
    text: 'Sort by status with custom order: pending, processing, completed',
    setup: 'Table: orders (id, status TEXT)',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, status TEXT);
INSERT INTO orders (status) VALUES ('completed'), ('pending'), ('processing'), ('pending');`,
    expected: 'Orders sorted by custom status priority',
    sample: `SELECT * FROM orders ORDER BY CASE status
  WHEN 'pending' THEN 1
  WHEN 'processing' THEN 2
  WHEN 'completed' THEN 3
END;`,
    hints: ['CASE in ORDER BY for custom sorting', 'Map values to sort priority numbers'],
    tags: ['case', 'order-by', 'custom-sort'],
  },
  {
    id: 'pg-case-103',
    category: 'CASE Expressions',
    difficulty: 'medium',
    title: 'CASE with Aggregate - Pivot',
    text: 'Pivot order counts by status into columns',
    setup: 'Table: orders (id, status TEXT)',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, status TEXT);
INSERT INTO orders (status) VALUES ('pending'), ('completed'), ('pending'), ('completed'), ('cancelled');`,
    expected: { pending: 2, completed: 2, cancelled: 1 },
    sample: `SELECT
  SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending,
  SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed,
  SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled
FROM orders;`,
    hints: ['CASE inside aggregate for conditional counting', 'Creates pivot table columns'],
    tags: ['case', 'pivot', 'aggregate'],
  },
  {
    id: 'pg-case-104',
    category: 'CASE Expressions',
    difficulty: 'medium',
    title: 'CASE for NULL Handling',
    text: 'Display "N/A" for NULL values, otherwise show the value',
    setup: 'Table: products (id, description TEXT)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, description TEXT);
INSERT INTO products (name, description) VALUES ('Widget', 'A great widget'), ('Gadget', NULL);`,
    expected: [{ description: 'A great widget' }, { description: 'N/A' }],
    sample: `SELECT CASE WHEN description IS NULL THEN 'N/A' ELSE description END AS description FROM products;`,
    hints: ['CASE can check for NULL with IS NULL', 'Alternative to COALESCE for custom handling'],
    tags: ['case', 'null', 'handling'],
  },
  {
    id: 'pg-case-105',
    category: 'CASE Expressions',
    difficulty: 'medium',
    title: 'CASE in WHERE Clause',
    text: 'Filter orders based on a parameter that might be ALL',
    setup: 'Table: orders (id, status TEXT)',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, status TEXT);
INSERT INTO orders (status) VALUES ('pending'), ('completed'), ('cancelled');`,
    expected: 'Filtered orders based on parameter',
    sample: `-- With status_filter = 'pending' or 'ALL'
SELECT * FROM orders WHERE CASE WHEN 'ALL' = 'ALL' THEN true ELSE status = 'ALL' END;`,
    hints: ['CASE in WHERE for dynamic filtering', 'Return true to include all rows'],
    tags: ['case', 'where', 'dynamic'],
  },
  {
    id: 'pg-case-106',
    category: 'CASE Expressions',
    difficulty: 'hard',
    title: 'CASE with Multiple Conditions',
    text: 'Determine shipping priority based on multiple factors',
    setup: 'Table: orders (id, is_premium BOOLEAN, amount NUMERIC, is_express BOOLEAN)',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, is_premium BOOLEAN, amount NUMERIC, is_express BOOLEAN);
INSERT INTO orders (is_premium, amount, is_express) VALUES
  (true, 1000, true), (false, 500, true), (true, 100, false), (false, 50, false);`,
    expected: ['Highest', 'High', 'Medium', 'Standard'],
    sample: `SELECT CASE
  WHEN is_premium AND is_express THEN 'Highest'
  WHEN is_express OR amount > 200 THEN 'High'
  WHEN is_premium THEN 'Medium'
  ELSE 'Standard'
END AS priority FROM orders;`,
    hints: ['Combine multiple conditions with AND/OR', 'Order matters - first match wins'],
    tags: ['case', 'multiple-conditions', 'priority'],
  },
  {
    id: 'pg-case-107',
    category: 'CASE Expressions',
    difficulty: 'medium',
    title: 'CASE in UPDATE',
    text: 'Update prices with different discounts by category',
    setup: 'Table: products (id, category TEXT, price NUMERIC)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, category TEXT, price NUMERIC);
INSERT INTO products (category, price) VALUES ('Electronics', 100), ('Clothing', 50), ('Food', 20);`,
    expected: 'Prices updated with category-specific discounts',
    sample: `UPDATE products SET price = price * CASE category
  WHEN 'Electronics' THEN 0.9  -- 10% off
  WHEN 'Clothing' THEN 0.8     -- 20% off
  ELSE 0.95                     -- 5% off
END;`,
    hints: ['CASE in SET clause for conditional updates', 'Multiply for percentage discounts'],
    tags: ['case', 'update', 'conditional'],
  },
  {
    id: 'pg-case-108',
    category: 'CASE Expressions',
    difficulty: 'easy',
    title: 'Boolean to Yes/No',
    text: 'Convert boolean to Yes/No text',
    setup: 'Table: features (id, name TEXT, enabled BOOLEAN)',
    setupCode: `CREATE TABLE features (id SERIAL PRIMARY KEY, name TEXT, enabled BOOLEAN);
INSERT INTO features (name, enabled) VALUES ('Feature A', true), ('Feature B', false);`,
    expected: [{ status: 'Yes' }, { status: 'No' }],
    sample: `SELECT name, CASE WHEN enabled THEN 'Yes' ELSE 'No' END AS status FROM features;`,
    hints: ['Simple boolean conversion', 'THEN and ELSE for true/false branches'],
    tags: ['case', 'boolean', 'convert'],
  },
  {
    id: 'pg-case-109',
    category: 'CASE Expressions',
    difficulty: 'hard',
    title: 'CASE for Division Safety',
    text: 'Calculate ratio safely avoiding division by zero',
    setup: 'Table: metrics (id, numerator NUMERIC, denominator NUMERIC)',
    setupCode: `CREATE TABLE metrics (id SERIAL PRIMARY KEY, numerator NUMERIC, denominator NUMERIC);
INSERT INTO metrics (numerator, denominator) VALUES (100, 20), (50, 0), (75, 25);`,
    expected: [{ ratio: 5 }, { ratio: null }, { ratio: 3 }],
    sample: `SELECT CASE WHEN denominator = 0 THEN NULL ELSE numerator / denominator END AS ratio FROM metrics;`,
    hints: ['Check for zero before division', 'Return NULL or default for invalid division'],
    tags: ['case', 'division', 'safety'],
  },
  {
    id: 'pg-case-110',
    category: 'CASE Expressions',
    difficulty: 'medium',
    title: 'Nested CASE Expressions',
    text: 'Determine discount tier based on customer type and order amount',
    setup: 'Table: orders (id, customer_type TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, customer_type TEXT, amount NUMERIC);
INSERT INTO orders (customer_type, amount) VALUES ('premium', 500), ('premium', 100), ('regular', 500), ('regular', 100);`,
    expected: ['20%', '10%', '10%', '5%'],
    sample: `SELECT CASE customer_type
  WHEN 'premium' THEN CASE WHEN amount >= 200 THEN '20%' ELSE '10%' END
  ELSE CASE WHEN amount >= 200 THEN '10%' ELSE '5%' END
END AS discount FROM orders;`,
    hints: ['CASE can be nested for complex logic', 'Outer CASE for type, inner for amount'],
    tags: ['case', 'nested', 'complex'],
  },
  {
    id: 'pg-case-111',
    category: 'CASE Expressions',
    difficulty: 'medium',
    title: 'CASE with Date Ranges',
    text: 'Categorize orders by age: Today, This Week, This Month, Older',
    setup: 'Table: orders (id, order_date DATE)',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, order_date DATE);
INSERT INTO orders (order_date) VALUES (CURRENT_DATE), (CURRENT_DATE - 3), (CURRENT_DATE - 15), (CURRENT_DATE - 45);`,
    expected: ['Today', 'This Week', 'This Month', 'Older'],
    sample: `SELECT CASE
  WHEN order_date = CURRENT_DATE THEN 'Today'
  WHEN order_date >= CURRENT_DATE - 7 THEN 'This Week'
  WHEN order_date >= CURRENT_DATE - 30 THEN 'This Month'
  ELSE 'Older'
END AS age FROM orders;`,
    hints: ['Use date arithmetic for ranges', 'CURRENT_DATE for today reference'],
    tags: ['case', 'date', 'ranges'],
  },
  {
    id: 'pg-case-112',
    category: 'CASE Expressions',
    difficulty: 'hard',
    title: 'CASE for Percentile Buckets',
    text: 'Assign percentile bucket labels (Top 10%, Top 25%, etc)',
    setup: 'Table: students (id, score NUMERIC)',
    setupCode: `CREATE TABLE students (id SERIAL PRIMARY KEY, name TEXT, score NUMERIC);
INSERT INTO students (name, score) VALUES ('A', 95), ('B', 85), ('C', 75), ('D', 65), ('E', 55);`,
    expected: 'Percentile bucket for each student',
    sample: `SELECT name, score, CASE
  WHEN score >= (SELECT PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY score) FROM students) THEN 'Top 10%'
  WHEN score >= (SELECT PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY score) FROM students) THEN 'Top 25%'
  WHEN score >= (SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY score) FROM students) THEN 'Top 50%'
  ELSE 'Bottom 50%'
END AS bucket FROM students;`,
    hints: ['Subqueries calculate percentile thresholds', 'CASE assigns bucket based on score'],
    tags: ['case', 'percentile', 'bucket'],
  },
  {
    id: 'pg-case-113',
    category: 'CASE Expressions',
    difficulty: 'easy',
    title: 'CASE with COALESCE Alternative',
    text: 'Show first non-null value from multiple columns',
    setup: 'Table: contacts (id, phone TEXT, mobile TEXT, email TEXT)',
    setupCode: `CREATE TABLE contacts (id SERIAL PRIMARY KEY, phone TEXT, mobile TEXT, email TEXT);
INSERT INTO contacts (phone, mobile, email) VALUES (NULL, '555-0001', 'a@test.com'), ('555-0002', NULL, NULL);`,
    expected: ['555-0001', '555-0002'],
    sample: `SELECT CASE
  WHEN phone IS NOT NULL THEN phone
  WHEN mobile IS NOT NULL THEN mobile
  ELSE email
END AS primary_contact FROM contacts;`,
    hints: ['CASE can mimic COALESCE behavior', 'Useful when you need custom priority'],
    tags: ['case', 'coalesce', 'priority'],
  },
  {
    id: 'pg-case-114',
    category: 'CASE Expressions',
    difficulty: 'medium',
    title: 'CASE for Data Cleaning',
    text: 'Normalize inconsistent status values',
    setup: 'Table: orders (id, status TEXT)',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, status TEXT);
INSERT INTO orders (status) VALUES ('ACTIVE'), ('active'), ('Active'), ('inactive'), ('INACTIVE');`,
    expected: ['Active', 'Active', 'Active', 'Inactive', 'Inactive'],
    sample: `SELECT CASE LOWER(status)
  WHEN 'active' THEN 'Active'
  WHEN 'inactive' THEN 'Inactive'
  ELSE status
END AS normalized_status FROM orders;`,
    hints: ['LOWER for case-insensitive comparison', 'Normalize to consistent format'],
    tags: ['case', 'normalize', 'clean'],
  },
  {
    id: 'pg-case-115',
    category: 'CASE Expressions',
    difficulty: 'hard',
    title: 'CASE in GROUP BY',
    text: 'Group products by price range buckets',
    setup: 'Table: products (id, name TEXT, price NUMERIC)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, price NUMERIC);
INSERT INTO products (name, price) VALUES ('A', 10), ('B', 50), ('C', 150), ('D', 75), ('E', 200);`,
    expected: [
      { bucket: 'Under $50', count: 1 },
      { bucket: '$50-$100', count: 2 },
      { bucket: 'Over $100', count: 2 },
    ],
    sample: `SELECT CASE
  WHEN price < 50 THEN 'Under $50'
  WHEN price <= 100 THEN '$50-$100'
  ELSE 'Over $100'
END AS bucket, COUNT(*) FROM products GROUP BY 1;`,
    hints: ['CASE can be used in GROUP BY', 'Reference by position (1) in GROUP BY'],
    tags: ['case', 'group-by', 'bucket'],
  },
  {
    id: 'pg-case-116',
    category: 'CASE Expressions',
    difficulty: 'medium',
    title: 'CASE with COUNT FILTER Alternative',
    text: 'Count by category using CASE (pre-9.4 compatible)',
    setup: 'Table: products (id, category TEXT)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, category TEXT);
INSERT INTO products (category) VALUES ('A'), ('A'), ('B'), ('C'), ('A');`,
    expected: { a: 3, b: 1, c: 1 },
    sample: `SELECT
  COUNT(CASE WHEN category = 'A' THEN 1 END) AS a,
  COUNT(CASE WHEN category = 'B' THEN 1 END) AS b,
  COUNT(CASE WHEN category = 'C' THEN 1 END) AS c
FROM products;`,
    hints: ['COUNT ignores NULL values', 'CASE returns NULL when no ELSE and no match'],
    tags: ['case', 'count', 'filter'],
  },
  {
    id: 'pg-case-117',
    category: 'CASE Expressions',
    difficulty: 'hard',
    title: 'CASE for Conditional Join',
    text: 'Join to different tables based on record type',
    setup: 'Tables: records, type_a_details, type_b_details',
    setupCode: `CREATE TABLE records (id SERIAL PRIMARY KEY, record_type TEXT, detail_id INTEGER);
CREATE TABLE type_a_details (id INTEGER, description TEXT);
CREATE TABLE type_b_details (id INTEGER, description TEXT);
INSERT INTO records (record_type, detail_id) VALUES ('A', 1), ('B', 1);
INSERT INTO type_a_details VALUES (1, 'Type A Detail');
INSERT INTO type_b_details VALUES (1, 'Type B Detail');`,
    expected: 'Different details based on record type',
    sample: `SELECT r.id, CASE r.record_type
  WHEN 'A' THEN a.description
  WHEN 'B' THEN b.description
END AS description
FROM records r
LEFT JOIN type_a_details a ON r.record_type = 'A' AND r.detail_id = a.id
LEFT JOIN type_b_details b ON r.record_type = 'B' AND r.detail_id = b.id;`,
    hints: ['Conditional join conditions', 'CASE selects which join result to use'],
    tags: ['case', 'join', 'conditional'],
  },
  {
    id: 'pg-case-118',
    category: 'CASE Expressions',
    difficulty: 'easy',
    title: 'CASE for Sign Display',
    text: 'Display value change as Increase, Decrease, or No Change',
    setup: 'Table: changes (id, old_value NUMERIC, new_value NUMERIC)',
    setupCode: `CREATE TABLE changes (id SERIAL PRIMARY KEY, old_value NUMERIC, new_value NUMERIC);
INSERT INTO changes (old_value, new_value) VALUES (100, 150), (100, 50), (100, 100);`,
    expected: ['Increase', 'Decrease', 'No Change'],
    sample: `SELECT CASE
  WHEN new_value > old_value THEN 'Increase'
  WHEN new_value < old_value THEN 'Decrease'
  ELSE 'No Change'
END AS change_type FROM changes;`,
    hints: ['Compare values to determine direction', 'ELSE handles equality case'],
    tags: ['case', 'comparison', 'display'],
  },
  {
    id: 'pg-case-119',
    category: 'CASE Expressions',
    difficulty: 'medium',
    title: 'CASE for Fiscal Year',
    text: 'Determine fiscal year (starts in April) from a date',
    setup: 'Table: transactions (id, trans_date DATE)',
    setupCode: `CREATE TABLE transactions (id SERIAL PRIMARY KEY, trans_date DATE);
INSERT INTO transactions (trans_date) VALUES ('2024-03-15'), ('2024-04-15'), ('2024-12-15');`,
    expected: ['FY2023', 'FY2024', 'FY2024'],
    sample: `SELECT CASE
  WHEN EXTRACT(MONTH FROM trans_date) < 4 THEN 'FY' || (EXTRACT(YEAR FROM trans_date) - 1)
  ELSE 'FY' || EXTRACT(YEAR FROM trans_date)
END AS fiscal_year FROM transactions;`,
    hints: ['Fiscal year logic based on month', 'Concatenate to create FY label'],
    tags: ['case', 'fiscal-year', 'date'],
  },
  {
    id: 'pg-case-120',
    category: 'CASE Expressions',
    difficulty: 'hard',
    title: 'CASE with Window Function',
    text: 'Assign medal (Gold/Silver/Bronze) based on ranking',
    setup: 'Table: athletes (id, name TEXT, score NUMERIC)',
    setupCode: `CREATE TABLE athletes (id SERIAL PRIMARY KEY, name TEXT, score NUMERIC);
INSERT INTO athletes (name, score) VALUES ('A', 100), ('B', 95), ('C', 90), ('D', 85);`,
    expected: [
      { name: 'A', medal: 'Gold' },
      { name: 'B', medal: 'Silver' },
      { name: 'C', medal: 'Bronze' },
      { name: 'D', medal: null },
    ],
    sample: `SELECT name, CASE RANK() OVER (ORDER BY score DESC)
  WHEN 1 THEN 'Gold'
  WHEN 2 THEN 'Silver'
  WHEN 3 THEN 'Bronze'
  ELSE NULL
END AS medal FROM athletes;`,
    hints: ['Window function inside CASE', 'Rank determines medal assignment'],
    tags: ['case', 'window', 'ranking'],
  },
  {
    id: 'pg-case-121',
    category: 'CASE Expressions',
    difficulty: 'medium',
    title: 'CASE for Bitwise Flags',
    text: 'Check permission flags using bitwise operations',
    setup: 'Table: users (id, permissions INTEGER) - 1=read, 2=write, 4=delete',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT, permissions INTEGER);
INSERT INTO users (name, permissions) VALUES ('Admin', 7), ('Editor', 3), ('Viewer', 1);`,
    expected: 'Permission description for each user',
    sample: `SELECT name, CASE
  WHEN permissions & 4 = 4 THEN 'Full Access'
  WHEN permissions & 2 = 2 THEN 'Read/Write'
  WHEN permissions & 1 = 1 THEN 'Read Only'
  ELSE 'No Access'
END AS access_level FROM users;`,
    hints: ['Bitwise AND to check flags', '& operator for bitwise comparison'],
    tags: ['case', 'bitwise', 'permissions'],
  },
  {
    id: 'pg-case-122',
    category: 'CASE Expressions',
    difficulty: 'hard',
    title: 'CASE for Running State',
    text: 'Track cumulative state changes in order processing',
    setup: 'Table: events (id, order_id INTEGER, event_type TEXT)',
    setupCode: `CREATE TABLE events (id SERIAL PRIMARY KEY, order_id INTEGER, event_type TEXT);
INSERT INTO events (order_id, event_type) VALUES (1, 'created'), (1, 'paid'), (1, 'shipped'), (2, 'created'), (2, 'cancelled');`,
    expected: 'Final state for each order',
    sample: `SELECT order_id, CASE
  WHEN bool_or(event_type = 'cancelled') THEN 'Cancelled'
  WHEN bool_or(event_type = 'shipped') THEN 'Shipped'
  WHEN bool_or(event_type = 'paid') THEN 'Paid'
  ELSE 'Created'
END AS status FROM events GROUP BY order_id;`,
    hints: ['BOOL_OR checks if any row matches', 'Priority order in CASE'],
    tags: ['case', 'state', 'aggregate'],
  },
  {
    id: 'pg-case-123',
    category: 'CASE Expressions',
    difficulty: 'medium',
    title: 'CASE with BETWEEN',
    text: 'Categorize ages into groups',
    setup: 'Table: people (id, name TEXT, age INTEGER)',
    setupCode: `CREATE TABLE people (id SERIAL PRIMARY KEY, name TEXT, age INTEGER);
INSERT INTO people (name, age) VALUES ('Alice', 15), ('Bob', 25), ('Carol', 45), ('Dave', 65);`,
    expected: ['Teen', 'Young Adult', 'Adult', 'Senior'],
    sample: `SELECT name, CASE
  WHEN age BETWEEN 13 AND 19 THEN 'Teen'
  WHEN age BETWEEN 20 AND 35 THEN 'Young Adult'
  WHEN age BETWEEN 36 AND 55 THEN 'Adult'
  ELSE 'Senior'
END AS age_group FROM people;`,
    hints: ['BETWEEN is inclusive on both ends', 'Cleaner than separate >= and <= conditions'],
    tags: ['case', 'between', 'ranges'],
  },
  {
    id: 'pg-case-124',
    category: 'CASE Expressions',
    difficulty: 'hard',
    title: 'CASE for Recursive Status',
    text: 'Determine overall status based on child statuses',
    setup: 'Table: tasks (id, parent_id INTEGER, status TEXT)',
    setupCode: `CREATE TABLE tasks (id SERIAL PRIMARY KEY, parent_id INTEGER, status TEXT);
INSERT INTO tasks (parent_id, status) VALUES (NULL, 'parent'), (1, 'completed'), (1, 'pending'), (1, 'completed');`,
    expected: 'Parent status based on children',
    sample: `SELECT parent_id, CASE
  WHEN bool_and(status = 'completed') THEN 'All Complete'
  WHEN bool_or(status = 'pending') THEN 'In Progress'
  WHEN bool_or(status = 'failed') THEN 'Has Failures'
  ELSE 'Unknown'
END AS overall_status
FROM tasks WHERE parent_id IS NOT NULL GROUP BY parent_id;`,
    hints: [
      'BOOL_AND and BOOL_OR for child status aggregation',
      'Determine parent status from children',
    ],
    tags: ['case', 'aggregate', 'status'],
  },

  // ============================================================
  // NEW PROBLEMS - BATCH 3: COALESCE/NULLIF (25 problems)
  // ============================================================
  {
    id: 'pg-null-100',
    category: 'COALESCE/NULLIF',
    difficulty: 'easy',
    title: 'Basic COALESCE',
    text: 'Return phone number or "No phone" if NULL',
    setup: 'Table: contacts (id, name TEXT, phone TEXT)',
    setupCode: `CREATE TABLE contacts (id SERIAL PRIMARY KEY, name TEXT, phone TEXT);
INSERT INTO contacts (name, phone) VALUES ('Alice', '555-0001'), ('Bob', NULL);`,
    expected: ['555-0001', 'No phone'],
    sample: "SELECT name, COALESCE(phone, 'No phone') AS phone FROM contacts;",
    hints: ['COALESCE returns first non-NULL argument', 'Useful for default values'],
    tags: ['coalesce', 'null', 'default'],
  },
  {
    id: 'pg-null-101',
    category: 'COALESCE/NULLIF',
    difficulty: 'easy',
    title: 'COALESCE with Multiple Arguments',
    text: 'Get primary contact: phone, then mobile, then email',
    setup: 'Table: contacts (id, phone TEXT, mobile TEXT, email TEXT)',
    setupCode: `CREATE TABLE contacts (id SERIAL PRIMARY KEY, phone TEXT, mobile TEXT, email TEXT);
INSERT INTO contacts (phone, mobile, email) VALUES (NULL, '555-0001', 'a@test.com'), (NULL, NULL, 'b@test.com');`,
    expected: ['555-0001', 'b@test.com'],
    sample: 'SELECT COALESCE(phone, mobile, email) AS primary_contact FROM contacts;',
    hints: ['COALESCE accepts multiple arguments', 'Returns first non-NULL in order'],
    tags: ['coalesce', 'priority', 'fallback'],
  },
  {
    id: 'pg-null-102',
    category: 'COALESCE/NULLIF',
    difficulty: 'easy',
    title: 'Basic NULLIF',
    text: 'Convert empty string to NULL',
    setup: 'Table: users (id, nickname TEXT)',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT, nickname TEXT);
INSERT INTO users (name, nickname) VALUES ('Alice', 'Ali'), ('Bob', '');`,
    expected: ['Ali', null],
    sample: "SELECT NULLIF(nickname, '') FROM users;",
    hints: [
      'NULLIF returns NULL if arguments are equal',
      'Useful for treating empty strings as NULL',
    ],
    tags: ['nullif', 'empty-string', 'convert'],
  },
  {
    id: 'pg-null-103',
    category: 'COALESCE/NULLIF',
    difficulty: 'medium',
    title: 'NULLIF to Prevent Division by Zero',
    text: 'Safely calculate average by preventing division by zero',
    setup: 'Table: stats (id, total NUMERIC, count INTEGER)',
    setupCode: `CREATE TABLE stats (id SERIAL PRIMARY KEY, total NUMERIC, count INTEGER);
INSERT INTO stats (total, count) VALUES (100, 5), (50, 0), (75, 3);`,
    expected: [20, null, 25],
    sample: 'SELECT total / NULLIF(count, 0) AS average FROM stats;',
    hints: [
      'NULLIF(count, 0) returns NULL when count is 0',
      'Division by NULL returns NULL instead of error',
    ],
    tags: ['nullif', 'division', 'safety'],
  },
  {
    id: 'pg-null-104',
    category: 'COALESCE/NULLIF',
    difficulty: 'medium',
    title: 'COALESCE in Aggregation',
    text: 'Sum values treating NULL as 0',
    setup: 'Table: sales (id, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, amount NUMERIC);
INSERT INTO sales (amount) VALUES (100), (NULL), (200);`,
    expected: 300,
    sample: 'SELECT SUM(COALESCE(amount, 0)) FROM sales;',
    hints: [
      'COALESCE converts NULL to 0 before sum',
      'Note: SUM already ignores NULLs, but useful for other cases',
    ],
    tags: ['coalesce', 'aggregate', 'sum'],
  },
  {
    id: 'pg-null-105',
    category: 'COALESCE/NULLIF',
    difficulty: 'medium',
    title: 'COALESCE with Subquery',
    text: 'Use default value from another table if NULL',
    setup: 'Tables: products, defaults',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, price NUMERIC);
CREATE TABLE defaults (default_price NUMERIC);
INSERT INTO products (name, price) VALUES ('Widget', 100), ('Gadget', NULL);
INSERT INTO defaults VALUES (50);`,
    expected: [100, 50],
    sample:
      'SELECT name, COALESCE(price, (SELECT default_price FROM defaults)) AS price FROM products;',
    hints: [
      'Subquery can provide default value',
      'COALESCE evaluates subquery only if first arg is NULL',
    ],
    tags: ['coalesce', 'subquery', 'default'],
  },
  {
    id: 'pg-null-106',
    category: 'COALESCE/NULLIF',
    difficulty: 'medium',
    title: 'NULLIF for Data Cleaning',
    text: 'Convert placeholder values (-1, 0) to NULL',
    setup: 'Table: measurements (id, value INTEGER)',
    setupCode: `CREATE TABLE measurements (id SERIAL PRIMARY KEY, value INTEGER);
INSERT INTO measurements (value) VALUES (100), (-1), (50), (0), (75);`,
    expected: [100, null, 50, null, 75],
    sample: 'SELECT NULLIF(NULLIF(value, -1), 0) FROM measurements;',
    hints: ['Chain NULLIF for multiple placeholder values', 'Each NULLIF handles one value'],
    tags: ['nullif', 'clean', 'placeholder'],
  },
  {
    id: 'pg-null-107',
    category: 'COALESCE/NULLIF',
    difficulty: 'hard',
    title: 'COALESCE in JOIN',
    text: 'Full outer join with combined values',
    setup: 'Tables: table_a, table_b',
    setupCode: `CREATE TABLE table_a (id INTEGER, value TEXT);
CREATE TABLE table_b (id INTEGER, value TEXT);
INSERT INTO table_a VALUES (1, 'A1'), (2, 'A2');
INSERT INTO table_b VALUES (2, 'B2'), (3, 'B3');`,
    expected: [
      { id: 1, value: 'A1' },
      { id: 2, value: 'A2 / B2' },
      { id: 3, value: 'B3' },
    ],
    sample: `SELECT COALESCE(a.id, b.id) AS id,
  COALESCE(a.value || ' / ' || b.value, a.value, b.value) AS value
FROM table_a a FULL OUTER JOIN table_b b ON a.id = b.id;`,
    hints: ['COALESCE combines values from both sides', 'Handle cases where one side is NULL'],
    tags: ['coalesce', 'join', 'full-outer'],
  },
  {
    id: 'pg-null-108',
    category: 'COALESCE/NULLIF',
    difficulty: 'easy',
    title: 'NULL-safe Comparison',
    text: 'Compare values where either might be NULL',
    setup: 'Table: data (id, value1 INTEGER, value2 INTEGER)',
    setupCode: `CREATE TABLE data (id SERIAL PRIMARY KEY, value1 INTEGER, value2 INTEGER);
INSERT INTO data (value1, value2) VALUES (1, 1), (1, 2), (NULL, NULL), (1, NULL);`,
    expected: 'Rows where values match including NULLs',
    sample: 'SELECT * FROM data WHERE value1 IS NOT DISTINCT FROM value2;',
    hints: [
      'IS NOT DISTINCT FROM treats NULLs as equal',
      'Alternative: COALESCE both to same sentinel value',
    ],
    tags: ['null', 'comparison', 'distinct-from'],
  },
  {
    id: 'pg-null-109',
    category: 'COALESCE/NULLIF',
    difficulty: 'medium',
    title: 'COALESCE with Date',
    text: 'Use current date if no specific date provided',
    setup: 'Table: events (id, scheduled_date DATE)',
    setupCode: `CREATE TABLE events (id SERIAL PRIMARY KEY, name TEXT, scheduled_date DATE);
INSERT INTO events (name, scheduled_date) VALUES ('Event A', '2024-06-15'), ('Event B', NULL);`,
    expected: 'Scheduled or current date',
    sample: 'SELECT name, COALESCE(scheduled_date, CURRENT_DATE) AS date FROM events;',
    hints: ['CURRENT_DATE as default for NULL dates', 'Works with any date/time types'],
    tags: ['coalesce', 'date', 'default'],
  },
  {
    id: 'pg-null-110',
    category: 'COALESCE/NULLIF',
    difficulty: 'hard',
    title: 'NULLIF in CASE Alternative',
    text: 'Simplify CASE WHEN value = x THEN NULL ELSE value END',
    setup: 'Table: data (id, status TEXT)',
    setupCode: `CREATE TABLE data (id SERIAL PRIMARY KEY, status TEXT);
INSERT INTO data (status) VALUES ('active'), ('unknown'), ('inactive');`,
    expected: ['active', null, 'inactive'],
    sample: "SELECT NULLIF(status, 'unknown') FROM data;",
    hints: [
      'NULLIF is shorthand for specific CASE pattern',
      'Cleaner for single value to NULL conversion',
    ],
    tags: ['nullif', 'case', 'simplify'],
  },
  {
    id: 'pg-null-111',
    category: 'COALESCE/NULLIF',
    difficulty: 'medium',
    title: 'COALESCE with JSON',
    text: 'Get JSON value or default if key missing',
    setup: 'Table: configs (id, settings JSONB)',
    setupCode: `CREATE TABLE configs (id SERIAL PRIMARY KEY, settings JSONB);
INSERT INTO configs (settings) VALUES ('{"theme": "dark"}'), ('{}');`,
    expected: ['dark', 'light'],
    sample: "SELECT COALESCE(settings->>'theme', 'light') AS theme FROM configs;",
    hints: ['->> returns NULL if key missing', 'COALESCE provides default'],
    tags: ['coalesce', 'json', 'default'],
  },
  {
    id: 'pg-null-112',
    category: 'COALESCE/NULLIF',
    difficulty: 'medium',
    title: 'Count NULL vs Non-NULL',
    text: 'Count NULL and non-NULL values separately',
    setup: 'Table: data (id, value TEXT)',
    setupCode: `CREATE TABLE data (id SERIAL PRIMARY KEY, value TEXT);
INSERT INTO data (value) VALUES ('a'), (NULL), ('b'), (NULL), ('c');`,
    expected: { non_null: 3, is_null: 2 },
    sample: 'SELECT COUNT(value) AS non_null, COUNT(*) - COUNT(value) AS is_null FROM data;',
    hints: ['COUNT(column) excludes NULLs', 'COUNT(*) counts all rows'],
    tags: ['null', 'count', 'aggregate'],
  },
  {
    id: 'pg-null-113',
    category: 'COALESCE/NULLIF',
    difficulty: 'hard',
    title: 'COALESCE for Optional Relationship',
    text: 'Show product with category name or "Uncategorized"',
    setup: 'Tables: products, categories',
    setupCode: `CREATE TABLE categories (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, category_id INTEGER);
INSERT INTO categories (name) VALUES ('Electronics');
INSERT INTO products (name, category_id) VALUES ('Phone', 1), ('Gadget', NULL);`,
    expected: [
      { product: 'Phone', category: 'Electronics' },
      { product: 'Gadget', category: 'Uncategorized' },
    ],
    sample: `SELECT p.name AS product, COALESCE(c.name, 'Uncategorized') AS category
FROM products p LEFT JOIN categories c ON p.category_id = c.id;`,
    hints: [
      'LEFT JOIN returns NULL for non-matching rows',
      'COALESCE provides fallback for missing category',
    ],
    tags: ['coalesce', 'join', 'optional'],
  },
  {
    id: 'pg-null-114',
    category: 'COALESCE/NULLIF',
    difficulty: 'easy',
    title: 'Boolean COALESCE',
    text: 'Treat NULL boolean as false',
    setup: 'Table: features (id, enabled BOOLEAN)',
    setupCode: `CREATE TABLE features (id SERIAL PRIMARY KEY, name TEXT, enabled BOOLEAN);
INSERT INTO features (name, enabled) VALUES ('Feature A', true), ('Feature B', NULL), ('Feature C', false);`,
    expected: [true, false, false],
    sample: 'SELECT COALESCE(enabled, false) AS is_enabled FROM features;',
    hints: ['NULL boolean often means false by default', 'COALESCE makes this explicit'],
    tags: ['coalesce', 'boolean', 'default'],
  },
  {
    id: 'pg-null-115',
    category: 'COALESCE/NULLIF',
    difficulty: 'medium',
    title: 'NULLIF with Strings',
    text: 'Convert "N/A" and "n/a" to NULL',
    setup: 'Table: data (id, value TEXT)',
    setupCode: `CREATE TABLE data (id SERIAL PRIMARY KEY, value TEXT);
INSERT INTO data (value) VALUES ('valid'), ('N/A'), ('n/a'), ('another');`,
    expected: ['valid', null, null, 'another'],
    sample: "SELECT NULLIF(UPPER(value), 'N/A') AS clean_value FROM data;",
    hints: ['UPPER normalizes case before comparison', 'NULLIF then converts matches to NULL'],
    tags: ['nullif', 'string', 'normalize'],
  },
  {
    id: 'pg-null-116',
    category: 'COALESCE/NULLIF',
    difficulty: 'hard',
    title: 'COALESCE in Update',
    text: 'Update only non-NULL values, keep existing otherwise',
    setup: 'Table: users (id, name TEXT, email TEXT)',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT, email TEXT);
INSERT INTO users (name, email) VALUES ('Alice', 'alice@old.com');`,
    expected: 'Name updated, email kept',
    sample: `UPDATE users SET
  name = COALESCE('New Name', name),
  email = COALESCE(NULL, email)
WHERE id = 1;`,
    hints: ['COALESCE preserves existing value if new is NULL', 'Useful for partial updates'],
    tags: ['coalesce', 'update', 'partial'],
  },
  {
    id: 'pg-null-117',
    category: 'COALESCE/NULLIF',
    difficulty: 'medium',
    title: 'GREATEST and LEAST with NULL',
    text: 'Find max value ignoring NULLs',
    setup: 'Table: scores (id, score1 INTEGER, score2 INTEGER, score3 INTEGER)',
    setupCode: `CREATE TABLE scores (id SERIAL PRIMARY KEY, score1 INTEGER, score2 INTEGER, score3 INTEGER);
INSERT INTO scores (score1, score2, score3) VALUES (80, NULL, 90), (NULL, 75, 85);`,
    expected: [90, 85],
    sample:
      'SELECT GREATEST(COALESCE(score1, 0), COALESCE(score2, 0), COALESCE(score3, 0)) FROM scores;',
    hints: ['GREATEST returns NULL if any arg is NULL', 'COALESCE each value to handle NULLs'],
    tags: ['coalesce', 'greatest', 'null'],
  },
  {
    id: 'pg-null-118',
    category: 'COALESCE/NULLIF',
    difficulty: 'hard',
    title: 'NULLIF for Rate Limiting',
    text: 'Calculate rate only if enough time passed',
    setup: 'Table: metrics (id, events INTEGER, seconds INTEGER)',
    setupCode: `CREATE TABLE metrics (id SERIAL PRIMARY KEY, events INTEGER, seconds INTEGER);
INSERT INTO metrics (events, seconds) VALUES (100, 60), (50, 0), (200, 120);`,
    expected: [1.67, null, 1.67],
    sample: 'SELECT ROUND(events::numeric / NULLIF(seconds, 0), 2) AS rate FROM metrics;',
    hints: ['NULLIF prevents division by zero', 'Returns NULL for invalid rate calculation'],
    tags: ['nullif', 'rate', 'division'],
  },
  {
    id: 'pg-null-119',
    category: 'COALESCE/NULLIF',
    difficulty: 'medium',
    title: 'String Concatenation with NULLs',
    text: 'Build full address handling NULL components',
    setup: 'Table: addresses (street TEXT, city TEXT, state TEXT)',
    setupCode: `CREATE TABLE addresses (id SERIAL PRIMARY KEY, street TEXT, city TEXT, state TEXT);
INSERT INTO addresses (street, city, state) VALUES ('123 Main', 'NYC', 'NY'), (NULL, 'LA', 'CA');`,
    expected: ['123 Main, NYC, NY', 'LA, CA'],
    sample: "SELECT CONCAT_WS(', ', street, city, state) AS full_address FROM addresses;",
    hints: ['CONCAT_WS skips NULL values', 'No need for COALESCE with CONCAT_WS'],
    tags: ['null', 'concat', 'string'],
  },
  {
    id: 'pg-null-120',
    category: 'COALESCE/NULLIF',
    difficulty: 'hard',
    title: 'COALESCE with LAG',
    text: 'Fill NULL with previous non-NULL value',
    setup: 'Table: readings (timestamp TIMESTAMP, value NUMERIC)',
    setupCode: `CREATE TABLE readings (ts TIMESTAMP, value NUMERIC);
INSERT INTO readings VALUES ('2024-01-01 10:00', 100), ('2024-01-01 11:00', NULL), ('2024-01-01 12:00', 150);`,
    expected: [100, 100, 150],
    sample: `SELECT ts, COALESCE(value, LAG(value) OVER (ORDER BY ts)) AS filled_value FROM readings;`,
    hints: ['LAG gets previous row value', 'COALESCE fills NULL with previous'],
    tags: ['coalesce', 'lag', 'fill'],
  },
  {
    id: 'pg-null-121',
    category: 'COALESCE/NULLIF',
    difficulty: 'medium',
    title: 'IS NULL vs = NULL',
    text: 'Demonstrate correct NULL checking',
    setup: 'Table: data (id, value TEXT)',
    setupCode: `CREATE TABLE data (id SERIAL PRIMARY KEY, value TEXT);
INSERT INTO data (value) VALUES ('a'), (NULL), ('b');`,
    expected: 'Only IS NULL finds NULL rows',
    sample: `SELECT
  (SELECT COUNT(*) FROM data WHERE value = NULL) AS wrong_way,
  (SELECT COUNT(*) FROM data WHERE value IS NULL) AS correct_way;`,
    hints: ['NULL = NULL is NULL, not true', 'Always use IS NULL or IS NOT NULL'],
    tags: ['null', 'is-null', 'comparison'],
  },
  {
    id: 'pg-null-122',
    category: 'COALESCE/NULLIF',
    difficulty: 'hard',
    title: 'COALESCE in Recursive CTE',
    text: 'Calculate running total with NULL handling',
    setup: 'Table: transactions (id, amount NUMERIC)',
    setupCode: `CREATE TABLE transactions (id SERIAL PRIMARY KEY, amount NUMERIC);
INSERT INTO transactions (amount) VALUES (100), (NULL), (50), (NULL), (75);`,
    expected: 'Running total treating NULL as 0',
    sample: `WITH RECURSIVE running AS (
  SELECT id, COALESCE(amount, 0) AS amount, COALESCE(amount, 0) AS total FROM transactions WHERE id = 1
  UNION ALL
  SELECT t.id, COALESCE(t.amount, 0), r.total + COALESCE(t.amount, 0)
  FROM transactions t JOIN running r ON t.id = r.id + 1
)
SELECT * FROM running;`,
    hints: ['COALESCE in recursive calculation', 'Treat NULL amounts as 0 for running total'],
    tags: ['coalesce', 'recursive', 'running-total'],
  },
  {
    id: 'pg-null-123',
    category: 'COALESCE/NULLIF',
    difficulty: 'medium',
    title: 'NULLIF for Data Validation',
    text: 'Return NULL if value is negative (invalid)',
    setup: 'Table: quantities (id, qty INTEGER)',
    setupCode: `CREATE TABLE quantities (id SERIAL PRIMARY KEY, qty INTEGER);
INSERT INTO quantities (qty) VALUES (10), (-5), (20), (-1);`,
    expected: [10, null, 20, null],
    sample: 'SELECT CASE WHEN qty < 0 THEN NULL ELSE qty END FROM quantities;',
    hints: [
      'Validate data by converting invalid to NULL',
      'Could also use NULLIF for specific invalid values',
    ],
    tags: ['null', 'validation', 'case'],
  },
  {
    id: 'pg-null-124',
    category: 'COALESCE/NULLIF',
    difficulty: 'hard',
    title: 'COALESCE Chain for Defaults',
    text: 'Apply user, group, then system defaults in order',
    setup: 'Tables with hierarchical settings',
    setupCode: `CREATE TABLE user_settings (user_id INTEGER, setting_value TEXT);
CREATE TABLE group_settings (group_id INTEGER, setting_value TEXT);
CREATE TABLE system_settings (setting_value TEXT);
INSERT INTO user_settings VALUES (1, NULL), (2, 'user_value');
INSERT INTO group_settings VALUES (1, 'group_value');
INSERT INTO system_settings VALUES ('system_default');`,
    expected: ['group_value', 'user_value'],
    sample: `SELECT COALESCE(
  u.setting_value,
  g.setting_value,
  s.setting_value
) AS effective_setting
FROM user_settings u
LEFT JOIN group_settings g ON u.user_id = g.group_id
CROSS JOIN system_settings s;`,
    hints: ['COALESCE checks in order: user, group, system', 'First non-NULL wins'],
    tags: ['coalesce', 'hierarchy', 'defaults'],
  },

  // ============================================================
  // NEW PROBLEMS - BATCH 4: DISTINCT ON (20 problems)
  // ============================================================
  {
    id: 'pg-distinct-100',
    category: 'DISTINCT ON',
    difficulty: 'easy',
    title: 'Basic DISTINCT ON',
    text: 'Get the first order for each customer (by order date)',
    setup: 'Table: orders (id, customer_id INTEGER, order_date DATE)',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, customer_id INTEGER, order_date DATE, amount NUMERIC);
INSERT INTO orders (customer_id, order_date, amount) VALUES
  (1, '2024-01-01', 100), (1, '2024-01-15', 200), (2, '2024-01-05', 150), (2, '2024-01-20', 300);`,
    expected: [
      { customer_id: 1, order_date: '2024-01-01' },
      { customer_id: 2, order_date: '2024-01-05' },
    ],
    sample:
      'SELECT DISTINCT ON (customer_id) customer_id, order_date, amount FROM orders ORDER BY customer_id, order_date;',
    hints: [
      'DISTINCT ON keeps first row per group',
      'ORDER BY must start with DISTINCT ON columns',
    ],
    tags: ['distinct-on', 'first', 'per-group'],
  },
  {
    id: 'pg-distinct-101',
    category: 'DISTINCT ON',
    difficulty: 'medium',
    title: 'DISTINCT ON - Latest Record',
    text: 'Get the most recent order for each customer',
    setup: 'Table: orders (id, customer_id INTEGER, order_date DATE, amount NUMERIC)',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, customer_id INTEGER, order_date DATE, amount NUMERIC);
INSERT INTO orders (customer_id, order_date, amount) VALUES
  (1, '2024-01-01', 100), (1, '2024-01-15', 200), (2, '2024-01-05', 150);`,
    expected: [
      { customer_id: 1, order_date: '2024-01-15' },
      { customer_id: 2, order_date: '2024-01-05' },
    ],
    sample:
      'SELECT DISTINCT ON (customer_id) customer_id, order_date, amount FROM orders ORDER BY customer_id, order_date DESC;',
    hints: ['DESC in ORDER BY gets the latest', 'DISTINCT ON takes the first after ordering'],
    tags: ['distinct-on', 'latest', 'desc'],
  },
  {
    id: 'pg-distinct-102',
    category: 'DISTINCT ON',
    difficulty: 'medium',
    title: 'DISTINCT ON - Highest Value',
    text: 'Get the highest priced product in each category',
    setup: 'Table: products (id, category TEXT, name TEXT, price NUMERIC)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, category TEXT, name TEXT, price NUMERIC);
INSERT INTO products (category, name, price) VALUES
  ('Electronics', 'Phone', 500), ('Electronics', 'Laptop', 1000),
  ('Clothing', 'Shirt', 30), ('Clothing', 'Jacket', 100);`,
    expected: [
      { category: 'Clothing', name: 'Jacket' },
      { category: 'Electronics', name: 'Laptop' },
    ],
    sample:
      'SELECT DISTINCT ON (category) category, name, price FROM products ORDER BY category, price DESC;',
    hints: ['Order by price DESC to get highest first', 'DISTINCT ON then takes that first row'],
    tags: ['distinct-on', 'max', 'per-group'],
  },
  {
    id: 'pg-distinct-103',
    category: 'DISTINCT ON',
    difficulty: 'medium',
    title: 'DISTINCT ON with Multiple Columns',
    text: 'Get the first sale for each product in each region',
    setup: 'Table: sales (id, product_id INTEGER, region TEXT, sale_date DATE)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, product_id INTEGER, region TEXT, sale_date DATE);
INSERT INTO sales (product_id, region, sale_date) VALUES
  (1, 'North', '2024-01-01'), (1, 'North', '2024-01-15'), (1, 'South', '2024-01-05'), (2, 'North', '2024-01-10');`,
    expected: 'First sale per product per region',
    sample:
      'SELECT DISTINCT ON (product_id, region) product_id, region, sale_date FROM sales ORDER BY product_id, region, sale_date;',
    hints: ['Multiple columns in DISTINCT ON', 'Each unique combination gets one row'],
    tags: ['distinct-on', 'multiple-columns', 'composite'],
  },
  {
    id: 'pg-distinct-104',
    category: 'DISTINCT ON',
    difficulty: 'hard',
    title: 'DISTINCT ON vs Window Function',
    text: 'Compare DISTINCT ON with ROW_NUMBER approach',
    setup: 'Table: events (id, user_id INTEGER, event_time TIMESTAMP)',
    setupCode: `CREATE TABLE events (id SERIAL PRIMARY KEY, user_id INTEGER, event_time TIMESTAMP);
INSERT INTO events (user_id, event_time) VALUES
  (1, '2024-01-01 10:00'), (1, '2024-01-01 11:00'), (2, '2024-01-01 09:00');`,
    expected: 'Latest event per user using both methods',
    sample: `-- DISTINCT ON method (simpler):
SELECT DISTINCT ON (user_id) user_id, event_time FROM events ORDER BY user_id, event_time DESC;

-- Window function method (more flexible):
SELECT user_id, event_time FROM (
  SELECT user_id, event_time, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY event_time DESC) AS rn
  FROM events
) sub WHERE rn = 1;`,
    hints: ['DISTINCT ON is PostgreSQL-specific but simpler', 'Window functions are more portable'],
    tags: ['distinct-on', 'window', 'comparison'],
  },
  {
    id: 'pg-distinct-105',
    category: 'DISTINCT ON',
    difficulty: 'medium',
    title: 'DISTINCT ON with NULL Handling',
    text: 'Get first non-NULL value per group',
    setup: 'Table: readings (id, sensor_id INTEGER, value NUMERIC)',
    setupCode: `CREATE TABLE readings (id SERIAL PRIMARY KEY, sensor_id INTEGER, value NUMERIC, read_time TIMESTAMP);
INSERT INTO readings (sensor_id, value, read_time) VALUES
  (1, NULL, '2024-01-01 10:00'), (1, 25, '2024-01-01 11:00'), (2, 30, '2024-01-01 10:00');`,
    expected: 'First non-NULL reading per sensor',
    sample: `SELECT DISTINCT ON (sensor_id) sensor_id, value, read_time
FROM readings WHERE value IS NOT NULL ORDER BY sensor_id, read_time;`,
    hints: ['Filter out NULLs before DISTINCT ON', 'Or use NULLS LAST in ordering'],
    tags: ['distinct-on', 'null', 'filter'],
  },
  {
    id: 'pg-distinct-106',
    category: 'DISTINCT ON',
    difficulty: 'hard',
    title: 'DISTINCT ON for Deduplication',
    text: 'Keep most recent record for each email (dedup by email)',
    setup: 'Table: users (id, email TEXT, name TEXT, updated_at TIMESTAMP)',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT, name TEXT, updated_at TIMESTAMP);
INSERT INTO users (email, name, updated_at) VALUES
  ('a@test.com', 'Alice Old', '2024-01-01'), ('a@test.com', 'Alice New', '2024-01-15'),
  ('b@test.com', 'Bob', '2024-01-10');`,
    expected: [
      { email: 'a@test.com', name: 'Alice New' },
      { email: 'b@test.com', name: 'Bob' },
    ],
    sample:
      'SELECT DISTINCT ON (email) email, name, updated_at FROM users ORDER BY email, updated_at DESC;',
    hints: ['DISTINCT ON for deduplication keeps one per key', 'ORDER BY DESC keeps the newest'],
    tags: ['distinct-on', 'dedup', 'latest'],
  },
  {
    id: 'pg-distinct-107',
    category: 'DISTINCT ON',
    difficulty: 'medium',
    title: 'DISTINCT ON with Aggregate-like Result',
    text: 'Get customer with their first and last order amount',
    setup: 'Table: orders (id, customer_id INTEGER, order_date DATE, amount NUMERIC)',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, customer_id INTEGER, order_date DATE, amount NUMERIC);
INSERT INTO orders (customer_id, order_date, amount) VALUES
  (1, '2024-01-01', 100), (1, '2024-01-15', 200), (1, '2024-01-30', 150);`,
    expected: 'First amount and last amount per customer',
    sample: `SELECT
  first_order.customer_id,
  first_order.amount AS first_amount,
  last_order.amount AS last_amount
FROM (SELECT DISTINCT ON (customer_id) customer_id, amount FROM orders ORDER BY customer_id, order_date) first_order
JOIN (SELECT DISTINCT ON (customer_id) customer_id, amount FROM orders ORDER BY customer_id, order_date DESC) last_order
ON first_order.customer_id = last_order.customer_id;`,
    hints: ['Use two DISTINCT ON queries and join', 'One ASC for first, one DESC for last'],
    tags: ['distinct-on', 'first-last', 'join'],
  },
  {
    id: 'pg-distinct-108',
    category: 'DISTINCT ON',
    difficulty: 'easy',
    title: 'DISTINCT ON Simple Example',
    text: 'Get one representative product per category',
    setup: 'Table: products (id, category TEXT, name TEXT)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, category TEXT, name TEXT);
INSERT INTO products (category, name) VALUES
  ('A', 'Product 1'), ('A', 'Product 2'), ('B', 'Product 3'), ('B', 'Product 4');`,
    expected: 'One product per category',
    sample: 'SELECT DISTINCT ON (category) category, name FROM products ORDER BY category, name;',
    hints: ['Gets first row per category after ordering', 'Simple deduplication by category'],
    tags: ['distinct-on', 'basic', 'representative'],
  },
  {
    id: 'pg-distinct-109',
    category: 'DISTINCT ON',
    difficulty: 'hard',
    title: 'DISTINCT ON with Subquery',
    text: 'Get top product per category, but only categories with 3+ products',
    setup: 'Table: products (id, category TEXT, sales NUMERIC)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, category TEXT, name TEXT, sales NUMERIC);
INSERT INTO products (category, name, sales) VALUES
  ('A', 'P1', 100), ('A', 'P2', 200), ('A', 'P3', 150),
  ('B', 'P4', 300), ('B', 'P5', 250), ('B', 'P6', 100), ('B', 'P7', 50),
  ('C', 'P8', 500), ('C', 'P9', 400);`,
    expected: 'Top product only from categories with 3+ products',
    sample: `SELECT DISTINCT ON (category) category, name, sales
FROM products
WHERE category IN (SELECT category FROM products GROUP BY category HAVING COUNT(*) >= 3)
ORDER BY category, sales DESC;`,
    hints: ['Subquery filters categories first', 'DISTINCT ON then gets top per filtered category'],
    tags: ['distinct-on', 'subquery', 'filter'],
  },
  {
    id: 'pg-distinct-110',
    category: 'DISTINCT ON',
    difficulty: 'medium',
    title: 'DISTINCT ON with LIMIT',
    text: 'Get top 3 categories by their best product sales',
    setup: 'Table: products (id, category TEXT, sales NUMERIC)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, category TEXT, sales NUMERIC);
INSERT INTO products (category, sales) VALUES
  ('A', 100), ('A', 200), ('B', 300), ('B', 250), ('C', 150), ('C', 400), ('D', 50);`,
    expected: 'Top 3 categories with their best selling product',
    sample: `SELECT * FROM (
  SELECT DISTINCT ON (category) category, sales FROM products ORDER BY category, sales DESC
) top_per_category ORDER BY sales DESC LIMIT 3;`,
    hints: ['DISTINCT ON first, then ORDER and LIMIT', 'Wrap in subquery for final ordering'],
    tags: ['distinct-on', 'limit', 'top-n'],
  },
  {
    id: 'pg-distinct-111',
    category: 'DISTINCT ON',
    difficulty: 'hard',
    title: 'DISTINCT ON for Gap Filling',
    text: 'Get the last known value before each timestamp',
    setup: 'Table: sensor_data (timestamp TIMESTAMP, value NUMERIC)',
    setupCode: `CREATE TABLE sensor_data (ts TIMESTAMP, value NUMERIC);
INSERT INTO sensor_data VALUES ('2024-01-01 10:00', 100), ('2024-01-01 12:00', 150), ('2024-01-01 15:00', 200);`,
    expected: 'Last known value as of a given time',
    sample: `SELECT DISTINCT ON (target.ts) target.ts, sensor_data.value AS last_known_value
FROM (SELECT generate_series('2024-01-01 09:00'::timestamp, '2024-01-01 16:00', '1 hour') AS ts) target
LEFT JOIN sensor_data ON sensor_data.ts <= target.ts
ORDER BY target.ts, sensor_data.ts DESC;`,
    hints: [
      'Join on ts <= target to get all prior values',
      'DISTINCT ON with DESC takes the most recent prior',
    ],
    tags: ['distinct-on', 'gap-fill', 'time-series'],
  },
  {
    id: 'pg-distinct-112',
    category: 'DISTINCT ON',
    difficulty: 'medium',
    title: 'DISTINCT ON with Tie-breaker',
    text: 'Get best product per category, using name as tie-breaker',
    setup: 'Table: products (id, category TEXT, name TEXT, rating NUMERIC)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, category TEXT, name TEXT, rating NUMERIC);
INSERT INTO products (category, name, rating) VALUES
  ('A', 'Zebra', 5), ('A', 'Apple', 5), ('B', 'Banana', 4), ('B', 'Cherry', 4);`,
    expected: 'Highest rated, alphabetically first on ties',
    sample:
      'SELECT DISTINCT ON (category) category, name, rating FROM products ORDER BY category, rating DESC, name;',
    hints: [
      'Multiple ORDER BY columns for tie-breaking',
      'Rating DESC first, then name ASC for ties',
    ],
    tags: ['distinct-on', 'tie-breaker', 'order'],
  },
  {
    id: 'pg-distinct-113',
    category: 'DISTINCT ON',
    difficulty: 'easy',
    title: 'DISTINCT ON vs GROUP BY',
    text: 'Show why DISTINCT ON is needed when GROUP BY is not enough',
    setup: 'Table: events (id, user_id INTEGER, event_name TEXT, event_time TIMESTAMP)',
    setupCode: `CREATE TABLE events (id SERIAL PRIMARY KEY, user_id INTEGER, event_name TEXT, event_time TIMESTAMP);
INSERT INTO events (user_id, event_name, event_time) VALUES
  (1, 'Login', '2024-01-01 10:00'), (1, 'Purchase', '2024-01-01 11:00'),
  (2, 'Login', '2024-01-01 09:00'), (2, 'View', '2024-01-01 10:00');`,
    expected: 'First event per user with event details',
    sample: `-- GROUP BY cannot easily get the event_name of the first event
-- DISTINCT ON solves this:
SELECT DISTINCT ON (user_id) user_id, event_name, event_time FROM events ORDER BY user_id, event_time;`,
    hints: [
      'GROUP BY only gives aggregate or grouped columns',
      'DISTINCT ON gives all columns of the selected row',
    ],
    tags: ['distinct-on', 'group-by', 'comparison'],
  },
  {
    id: 'pg-distinct-114',
    category: 'DISTINCT ON',
    difficulty: 'hard',
    title: 'DISTINCT ON for Change Detection',
    text: 'Get rows where value changed from previous (per entity)',
    setup: 'Table: status_log (id, entity_id INTEGER, status TEXT, logged_at TIMESTAMP)',
    setupCode: `CREATE TABLE status_log (id SERIAL PRIMARY KEY, entity_id INTEGER, status TEXT, logged_at TIMESTAMP);
INSERT INTO status_log (entity_id, status, logged_at) VALUES
  (1, 'active', '2024-01-01'), (1, 'active', '2024-01-02'), (1, 'inactive', '2024-01-03'),
  (2, 'active', '2024-01-01'), (2, 'inactive', '2024-01-02');`,
    expected: 'First occurrence of each status per entity',
    sample: `SELECT DISTINCT ON (entity_id, status) entity_id, status, logged_at
FROM status_log ORDER BY entity_id, status, logged_at;`,
    hints: [
      'DISTINCT ON (entity_id, status) gets first occurrence of each status',
      'Useful for tracking when statuses first appeared',
    ],
    tags: ['distinct-on', 'change', 'first-occurrence'],
  },
  {
    id: 'pg-distinct-115',
    category: 'DISTINCT ON',
    difficulty: 'medium',
    title: 'DISTINCT ON in CTE',
    text: 'Use DISTINCT ON within a CTE for further processing',
    setup: 'Table: orders (id, customer_id INTEGER, order_date DATE, amount NUMERIC)',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, customer_id INTEGER, order_date DATE, amount NUMERIC);
INSERT INTO orders (customer_id, order_date, amount) VALUES
  (1, '2024-01-01', 100), (1, '2024-01-15', 200), (2, '2024-01-05', 300);`,
    expected: 'Latest orders with additional processing',
    sample: `WITH latest_orders AS (
  SELECT DISTINCT ON (customer_id) customer_id, order_date, amount
  FROM orders ORDER BY customer_id, order_date DESC
)
SELECT customer_id, amount, amount * 1.1 AS with_tax FROM latest_orders;`,
    hints: ['DISTINCT ON in CTE for reusability', 'Further process the deduplicated results'],
    tags: ['distinct-on', 'cte', 'processing'],
  },
  {
    id: 'pg-distinct-116',
    category: 'DISTINCT ON',
    difficulty: 'hard',
    title: 'DISTINCT ON with Conditional Selection',
    text: 'Get preferred contact method per user (email > phone > mail)',
    setup: 'Table: contacts (id, user_id INTEGER, contact_type TEXT, value TEXT)',
    setupCode: `CREATE TABLE contacts (id SERIAL PRIMARY KEY, user_id INTEGER, contact_type TEXT, value TEXT);
INSERT INTO contacts (user_id, contact_type, value) VALUES
  (1, 'phone', '555-0001'), (1, 'email', 'a@test.com'), (1, 'mail', '123 St'),
  (2, 'phone', '555-0002'), (2, 'mail', '456 Ave');`,
    expected: 'Best contact per user based on priority',
    sample: `SELECT DISTINCT ON (user_id) user_id, contact_type, value
FROM contacts
ORDER BY user_id, CASE contact_type WHEN 'email' THEN 1 WHEN 'phone' THEN 2 ELSE 3 END;`,
    hints: ['CASE in ORDER BY sets priority', 'DISTINCT ON picks the first (highest priority)'],
    tags: ['distinct-on', 'priority', 'case'],
  },
  {
    id: 'pg-distinct-117',
    category: 'DISTINCT ON',
    difficulty: 'medium',
    title: 'DISTINCT ON for Sampling',
    text: 'Get one random product per category',
    setup: 'Table: products (id, category TEXT, name TEXT)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, category TEXT, name TEXT);
INSERT INTO products (category, name) VALUES
  ('A', 'P1'), ('A', 'P2'), ('A', 'P3'), ('B', 'P4'), ('B', 'P5');`,
    expected: 'One random product per category',
    sample:
      'SELECT DISTINCT ON (category) category, name FROM products ORDER BY category, RANDOM();',
    hints: [
      'ORDER BY RANDOM() for random selection',
      'DISTINCT ON takes the first (randomly selected)',
    ],
    tags: ['distinct-on', 'random', 'sample'],
  },
  {
    id: 'pg-distinct-118',
    category: 'DISTINCT ON',
    difficulty: 'hard',
    title: 'DISTINCT ON with Self Join',
    text: 'Find products that are the best seller AND most recent in their category',
    setup: 'Table: products (id, category TEXT, name TEXT, sales NUMERIC, created_at DATE)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, category TEXT, name TEXT, sales NUMERIC, created_at DATE);
INSERT INTO products (category, name, sales, created_at) VALUES
  ('A', 'Old Best', 100, '2024-01-01'), ('A', 'New Good', 80, '2024-01-15'),
  ('B', 'Recent Best', 200, '2024-01-10'), ('B', 'Old', 150, '2024-01-01');`,
    expected: 'Products that are both best seller and most recent',
    sample: `SELECT best.category, best.name FROM
  (SELECT DISTINCT ON (category) category, name FROM products ORDER BY category, sales DESC) best
JOIN
  (SELECT DISTINCT ON (category) category, name FROM products ORDER BY category, created_at DESC) recent
ON best.category = recent.category AND best.name = recent.name;`,
    hints: ['Two DISTINCT ON queries with different orderings', 'Join to find intersection'],
    tags: ['distinct-on', 'self-join', 'intersection'],
  },
  {
    id: 'pg-distinct-119',
    category: 'DISTINCT ON',
    difficulty: 'medium',
    title: 'DISTINCT ON for Audit Trail',
    text: 'Get the current (latest) value for each setting',
    setup: 'Table: settings_history (id, setting_name TEXT, value TEXT, changed_at TIMESTAMP)',
    setupCode: `CREATE TABLE settings_history (id SERIAL PRIMARY KEY, setting_name TEXT, value TEXT, changed_at TIMESTAMP);
INSERT INTO settings_history (setting_name, value, changed_at) VALUES
  ('theme', 'light', '2024-01-01'), ('theme', 'dark', '2024-01-15'),
  ('lang', 'en', '2024-01-01'), ('lang', 'es', '2024-01-10'), ('lang', 'en', '2024-01-20');`,
    expected: [
      { setting_name: 'theme', value: 'dark' },
      { setting_name: 'lang', value: 'en' },
    ],
    sample:
      'SELECT DISTINCT ON (setting_name) setting_name, value FROM settings_history ORDER BY setting_name, changed_at DESC;',
    hints: ['Audit table pattern with timestamps', 'DISTINCT ON gets current value'],
    tags: ['distinct-on', 'audit', 'current-value'],
  },

  // ============================================================
  // NEW PROBLEMS - BATCH 4: GROUPING SETS (20 problems)
  // ============================================================
  {
    id: 'pg-group-100',
    category: 'GROUPING SETS',
    difficulty: 'medium',
    title: 'Basic GROUPING SETS',
    text: 'Get subtotals by category, by region, and grand total',
    setup: 'Table: sales (category TEXT, region TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, category TEXT, region TEXT, amount NUMERIC);
INSERT INTO sales (category, region, amount) VALUES
  ('A', 'North', 100), ('A', 'South', 150), ('B', 'North', 200), ('B', 'South', 250);`,
    expected: 'Multiple grouping levels in one result',
    sample:
      'SELECT category, region, SUM(amount) FROM sales GROUP BY GROUPING SETS ((category), (region), ());',
    hints: ['Each grouping set is a separate aggregation', 'Empty () gives grand total'],
    tags: ['grouping-sets', 'subtotals', 'aggregate'],
  },
  {
    id: 'pg-group-101',
    category: 'GROUPING SETS',
    difficulty: 'medium',
    title: 'ROLLUP for Hierarchical Subtotals',
    text: 'Create hierarchical subtotals: year > quarter > total',
    setup: 'Table: sales (year INTEGER, quarter INTEGER, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, year INTEGER, quarter INTEGER, amount NUMERIC);
INSERT INTO sales (year, quarter, amount) VALUES
  (2023, 1, 100), (2023, 2, 150), (2024, 1, 200), (2024, 2, 250);`,
    expected: 'Year totals, year-quarter totals, and grand total',
    sample: 'SELECT year, quarter, SUM(amount) FROM sales GROUP BY ROLLUP(year, quarter);',
    hints: [
      'ROLLUP creates hierarchical groupings',
      'Equivalent to GROUPING SETS ((year,quarter), (year), ())',
    ],
    tags: ['grouping-sets', 'rollup', 'hierarchical'],
  },
  {
    id: 'pg-group-102',
    category: 'GROUPING SETS',
    difficulty: 'medium',
    title: 'CUBE for All Combinations',
    text: 'Generate all possible subtotal combinations',
    setup: 'Table: sales (product TEXT, region TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, product TEXT, region TEXT, amount NUMERIC);
INSERT INTO sales (product, region, amount) VALUES
  ('A', 'North', 100), ('A', 'South', 150), ('B', 'North', 200);`,
    expected: 'All 2^n grouping combinations',
    sample: 'SELECT product, region, SUM(amount) FROM sales GROUP BY CUBE(product, region);',
    hints: ['CUBE generates all combinations', 'For 2 columns: (p,r), (p), (r), ()'],
    tags: ['grouping-sets', 'cube', 'combinations'],
  },
  {
    id: 'pg-group-103',
    category: 'GROUPING SETS',
    difficulty: 'hard',
    title: 'GROUPING Function',
    text: 'Distinguish real NULLs from aggregated NULLs',
    setup: 'Table: sales (category TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, category TEXT, amount NUMERIC);
INSERT INTO sales (category, amount) VALUES ('A', 100), ('A', 150), (NULL, 200);`,
    expected: 'GROUPING(category) = 1 for subtotal rows',
    sample: `SELECT category, SUM(amount),
  GROUPING(category) AS is_subtotal
FROM sales GROUP BY ROLLUP(category);`,
    hints: [
      'GROUPING() returns 1 for aggregated/subtotal rows',
      'Returns 0 for regular grouped rows',
    ],
    tags: ['grouping-sets', 'grouping', 'null'],
  },
  {
    id: 'pg-group-104',
    category: 'GROUPING SETS',
    difficulty: 'hard',
    title: 'GROUPING_ID for Multiple Columns',
    text: 'Get a bitmask indicating which columns are aggregated',
    setup: 'Table: sales (category TEXT, region TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, category TEXT, region TEXT, amount NUMERIC);
INSERT INTO sales (category, region, amount) VALUES ('A', 'North', 100), ('B', 'South', 200);`,
    expected: 'Bitmask: 0=both grouped, 1=region agg, 2=category agg, 3=both agg',
    sample: `SELECT category, region, SUM(amount),
  GROUPING(category, region) AS grouping_id
FROM sales GROUP BY CUBE(category, region);`,
    hints: [
      'GROUPING with multiple args returns bitmask',
      'Each bit represents one columns aggregation state',
    ],
    tags: ['grouping-sets', 'grouping-id', 'bitmask'],
  },
  {
    id: 'pg-group-105',
    category: 'GROUPING SETS',
    difficulty: 'medium',
    title: 'ROLLUP vs CUBE Comparison',
    text: 'Show the difference between ROLLUP and CUBE output',
    setup: 'Table: sales (year INTEGER, product TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, year INTEGER, product TEXT, amount NUMERIC);
INSERT INTO sales (year, product, amount) VALUES (2023, 'A', 100), (2023, 'B', 150), (2024, 'A', 200);`,
    expected: 'ROLLUP: 5 rows, CUBE: 9 rows',
    sample: `-- ROLLUP (hierarchical):
SELECT year, product, SUM(amount) FROM sales GROUP BY ROLLUP(year, product);
-- CUBE (all combinations):
SELECT year, product, SUM(amount) FROM sales GROUP BY CUBE(year, product);`,
    hints: ['ROLLUP: year+product, year, total', 'CUBE: year+product, year, product, total'],
    tags: ['grouping-sets', 'rollup', 'cube', 'comparison'],
  },
  {
    id: 'pg-group-106',
    category: 'GROUPING SETS',
    difficulty: 'hard',
    title: 'Mixed GROUPING SETS',
    text: 'Combine regular columns with ROLLUP',
    setup: 'Table: sales (year INTEGER, quarter INTEGER, region TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, year INTEGER, quarter INTEGER, region TEXT, amount NUMERIC);
INSERT INTO sales (year, quarter, region, amount) VALUES
  (2023, 1, 'North', 100), (2023, 2, 'North', 150), (2024, 1, 'South', 200);`,
    expected: 'Region always grouped, year-quarter rolled up',
    sample:
      'SELECT region, year, quarter, SUM(amount) FROM sales GROUP BY region, ROLLUP(year, quarter);',
    hints: ['Combine regular GROUP BY with ROLLUP', 'ROLLUP applies within each region'],
    tags: ['grouping-sets', 'mixed', 'rollup'],
  },
  {
    id: 'pg-group-107',
    category: 'GROUPING SETS',
    difficulty: 'hard',
    title: 'Label Subtotal Rows',
    text: 'Show "Total" label for aggregated dimension values',
    setup: 'Table: sales (category TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, category TEXT, amount NUMERIC);
INSERT INTO sales (category, amount) VALUES ('A', 100), ('B', 200);`,
    expected: 'Category shows "Total" for grand total row',
    sample: `SELECT
  CASE WHEN GROUPING(category) = 1 THEN 'Total' ELSE category END AS category,
  SUM(amount)
FROM sales GROUP BY ROLLUP(category);`,
    hints: ['Use CASE with GROUPING() to label subtotals', 'Replace NULL with meaningful label'],
    tags: ['grouping-sets', 'label', 'case'],
  },
  {
    id: 'pg-group-108',
    category: 'GROUPING SETS',
    difficulty: 'medium',
    title: 'Partial ROLLUP',
    text: 'ROLLUP on only some columns in GROUP BY',
    setup: 'Table: sales (store TEXT, product TEXT, month INTEGER, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, store TEXT, product TEXT, month INTEGER, amount NUMERIC);
INSERT INTO sales (store, product, month, amount) VALUES
  ('S1', 'A', 1, 100), ('S1', 'A', 2, 150), ('S1', 'B', 1, 200);`,
    expected: 'Store always grouped, product-month rolled up',
    sample:
      'SELECT store, product, month, SUM(amount) FROM sales GROUP BY store, ROLLUP(product, month);',
    hints: ['Only columns in ROLLUP are rolled up', 'store remains in every grouping'],
    tags: ['grouping-sets', 'partial', 'rollup'],
  },
  {
    id: 'pg-group-109',
    category: 'GROUPING SETS',
    difficulty: 'hard',
    title: 'Multiple ROLLUPs',
    text: 'Combine two independent ROLLUP hierarchies',
    setup:
      'Table: sales (category TEXT, subcategory TEXT, region TEXT, subregion TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, category TEXT, subcategory TEXT, region TEXT, subregion TEXT, amount NUMERIC);
INSERT INTO sales (category, subcategory, region, subregion, amount) VALUES
  ('Cat1', 'Sub1', 'North', 'N1', 100), ('Cat1', 'Sub2', 'South', 'S1', 200);`,
    expected: 'Independent rollups for product and region hierarchies',
    sample:
      'SELECT category, subcategory, region, subregion, SUM(amount) FROM sales GROUP BY ROLLUP(category, subcategory), ROLLUP(region, subregion);',
    hints: [
      'Multiple ROLLUPs create cross-product of groupings',
      'Each hierarchy rolls up independently',
    ],
    tags: ['grouping-sets', 'multiple', 'rollup'],
  },
  {
    id: 'pg-group-110',
    category: 'GROUPING SETS',
    difficulty: 'medium',
    title: 'GROUPING SETS with Filtering',
    text: 'Filter results to show only subtotal rows',
    setup: 'Table: sales (category TEXT, region TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, category TEXT, region TEXT, amount NUMERIC);
INSERT INTO sales (category, region, amount) VALUES ('A', 'North', 100), ('A', 'South', 150), ('B', 'North', 200);`,
    expected: 'Only category subtotals and grand total',
    sample: `SELECT category, region, SUM(amount) FROM sales
GROUP BY CUBE(category, region)
HAVING GROUPING(region) = 1;`,
    hints: [
      'HAVING with GROUPING() filters aggregation levels',
      'GROUPING(region) = 1 means region is aggregated',
    ],
    tags: ['grouping-sets', 'filter', 'having'],
  },
  {
    id: 'pg-group-111',
    category: 'GROUPING SETS',
    difficulty: 'hard',
    title: 'Percentage of Total with GROUPING SETS',
    text: 'Calculate each category as percentage of total using GROUPING SETS',
    setup: 'Table: sales (category TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, category TEXT, amount NUMERIC);
INSERT INTO sales (category, amount) VALUES ('A', 100), ('A', 150), ('B', 200), ('B', 250);`,
    expected: 'Category percentages of grand total',
    sample: `WITH totals AS (
  SELECT category, SUM(amount) AS cat_total,
    GROUPING(category) AS is_total
  FROM sales GROUP BY ROLLUP(category)
)
SELECT category, cat_total,
  ROUND(100.0 * cat_total / (SELECT cat_total FROM totals WHERE is_total = 1), 1) AS pct
FROM totals WHERE is_total = 0;`,
    hints: [
      'Use ROLLUP to get both category and total',
      'Join or subquery to calculate percentage',
    ],
    tags: ['grouping-sets', 'percentage', 'total'],
  },
  {
    id: 'pg-group-112',
    category: 'GROUPING SETS',
    difficulty: 'medium',
    title: 'Explicit GROUPING SETS',
    text: 'Define exact grouping combinations (not all like CUBE)',
    setup: 'Table: sales (year INTEGER, quarter INTEGER, region TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, year INTEGER, quarter INTEGER, region TEXT, amount NUMERIC);
INSERT INTO sales (year, quarter, region, amount) VALUES
  (2023, 1, 'North', 100), (2024, 2, 'South', 200);`,
    expected: 'Only specified groupings, not all combinations',
    sample: `SELECT year, quarter, region, SUM(amount)
FROM sales
GROUP BY GROUPING SETS ((year, region), (quarter), ());`,
    hints: [
      'Explicit grouping sets for precise control',
      'Only listed combinations appear in result',
    ],
    tags: ['grouping-sets', 'explicit', 'custom'],
  },
  {
    id: 'pg-group-113',
    category: 'GROUPING SETS',
    difficulty: 'hard',
    title: 'Ordering GROUPING SETS Results',
    text: 'Sort results with subtotals at the end of each group',
    setup: 'Table: sales (category TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, category TEXT, amount NUMERIC);
INSERT INTO sales (category, amount) VALUES ('A', 100), ('A', 150), ('B', 200);`,
    expected: 'Category totals after detail rows',
    sample: `SELECT category, SUM(amount)
FROM sales GROUP BY ROLLUP(category)
ORDER BY GROUPING(category), category;`,
    hints: ['ORDER BY GROUPING() puts subtotals last', 'GROUPING() = 0 for detail, 1 for subtotal'],
    tags: ['grouping-sets', 'order', 'subtotals'],
  },
  {
    id: 'pg-group-114',
    category: 'GROUPING SETS',
    difficulty: 'medium',
    title: 'Count at Each Level',
    text: 'Show count along with sum at each grouping level',
    setup: 'Table: orders (category TEXT, region TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, category TEXT, region TEXT, amount NUMERIC);
INSERT INTO orders (category, region, amount) VALUES
  ('A', 'North', 100), ('A', 'South', 150), ('B', 'North', 200);`,
    expected: 'Count and sum at category and total levels',
    sample: 'SELECT category, COUNT(*), SUM(amount) FROM orders GROUP BY ROLLUP(category);',
    hints: [
      'Multiple aggregates work with GROUPING SETS',
      'Each aggregate calculated at each level',
    ],
    tags: ['grouping-sets', 'count', 'multiple'],
  },
  {
    id: 'pg-group-115',
    category: 'GROUPING SETS',
    difficulty: 'hard',
    title: 'GROUPING SETS with Window Functions',
    text: 'Combine grouping sets with running totals',
    setup: 'Table: sales (date DATE, category TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, sale_date DATE, category TEXT, amount NUMERIC);
INSERT INTO sales (sale_date, category, amount) VALUES
  ('2024-01-01', 'A', 100), ('2024-01-02', 'A', 150), ('2024-01-01', 'B', 200);`,
    expected: 'Subtotals with running totals within each grouping',
    sample: `SELECT sale_date, category, SUM(amount) AS daily_sum,
  SUM(SUM(amount)) OVER (ORDER BY sale_date) AS running_total
FROM sales GROUP BY GROUPING SETS ((sale_date, category), (sale_date));`,
    hints: ['Window function applied after GROUP BY', 'Running total across grouping set results'],
    tags: ['grouping-sets', 'window', 'running-total'],
  },
  {
    id: 'pg-group-116',
    category: 'GROUPING SETS',
    difficulty: 'medium',
    title: 'Composite Grouping',
    text: 'Treat multiple columns as a single grouping unit',
    setup: 'Table: sales (category TEXT, subcategory TEXT, region TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, category TEXT, subcategory TEXT, region TEXT, amount NUMERIC);
INSERT INTO sales (category, subcategory, region, amount) VALUES
  ('A', 'A1', 'North', 100), ('A', 'A2', 'South', 150);`,
    expected: 'Category-subcategory treated as unit',
    sample:
      'SELECT category, subcategory, region, SUM(amount) FROM sales GROUP BY ROLLUP((category, subcategory), region);',
    hints: [
      'Double parentheses create composite grouping',
      'category+subcategory roll up together',
    ],
    tags: ['grouping-sets', 'composite', 'parentheses'],
  },
  {
    id: 'pg-group-117',
    category: 'GROUPING SETS',
    difficulty: 'hard',
    title: 'Cross-Tab Report with CUBE',
    text: 'Create a cross-tab (pivot) with row and column totals',
    setup: 'Table: sales (product TEXT, region TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, product TEXT, region TEXT, amount NUMERIC);
INSERT INTO sales (product, region, amount) VALUES
  ('A', 'North', 100), ('A', 'South', 150), ('B', 'North', 200), ('B', 'South', 250);`,
    expected: 'Cross-tab with all marginal totals',
    sample: `SELECT
  COALESCE(product, 'Total') AS product,
  SUM(CASE WHEN region = 'North' THEN amount END) AS north,
  SUM(CASE WHEN region = 'South' THEN amount END) AS south,
  SUM(amount) AS total
FROM sales
GROUP BY ROLLUP(product);`,
    hints: ['Combine ROLLUP with CASE for pivot', 'COALESCE labels the total row'],
    tags: ['grouping-sets', 'crosstab', 'pivot'],
  },
  {
    id: 'pg-group-118',
    category: 'GROUPING SETS',
    difficulty: 'medium',
    title: 'Empty GROUPING SET',
    text: 'Include grand total using empty grouping set',
    setup: 'Table: sales (category TEXT, amount NUMERIC)',
    setupCode: `CREATE TABLE sales (id SERIAL PRIMARY KEY, category TEXT, amount NUMERIC);
INSERT INTO sales (category, amount) VALUES ('A', 100), ('B', 200);`,
    expected: 'Category totals plus grand total',
    sample: 'SELECT category, SUM(amount) FROM sales GROUP BY GROUPING SETS ((category), ());',
    hints: ['Empty () means no grouping = grand total', 'Explicit alternative to ROLLUP'],
    tags: ['grouping-sets', 'empty', 'grand-total'],
  },
  {
    id: 'pg-group-119',
    category: 'GROUPING SETS',
    difficulty: 'hard',
    title: 'GROUPING SETS Performance',
    text: 'Understand when GROUPING SETS is more efficient than UNION ALL',
    setup: 'Large table scenario',
    setupCode: `-- Conceptual example for performance comparison`,
    expected: 'GROUPING SETS scans table once vs multiple times',
    sample: `-- GROUPING SETS (single scan):
SELECT category, region, SUM(amount) FROM sales GROUP BY GROUPING SETS ((category), (region), ());

-- Equivalent UNION ALL (multiple scans):
SELECT category, NULL as region, SUM(amount) FROM sales GROUP BY category
UNION ALL
SELECT NULL, region, SUM(amount) FROM sales GROUP BY region
UNION ALL
SELECT NULL, NULL, SUM(amount) FROM sales;`,
    hints: ['GROUPING SETS reads table once', 'UNION ALL requires multiple passes'],
    tags: ['grouping-sets', 'performance', 'union-all'],
  },

  // ============================================================
  // NEW PROBLEMS - BATCH 4: RANGE TYPES EXTENDED (15 problems)
  // ============================================================
  {
    id: 'pg-range-100',
    category: 'Range Types',
    difficulty: 'easy',
    title: 'Create Integer Range',
    text: 'Create an int4range representing numbers 1-10',
    setup: 'No table needed',
    setupCode: `-- No table needed`,
    expected: '[1,11)',
    sample: 'SELECT int4range(1, 11);',
    hints: [
      'int4range(lower, upper) creates range',
      'Default is [) - inclusive lower, exclusive upper',
    ],
    tags: ['range', 'int4range', 'create'],
  },
  {
    id: 'pg-range-101',
    category: 'Range Types',
    difficulty: 'medium',
    title: 'Range Bounds',
    text: 'Create ranges with different bound types (inclusive/exclusive)',
    setup: 'No table needed',
    setupCode: `-- No table needed`,
    expected: 'Different range notations',
    sample: `SELECT
  int4range(1, 10, '[]') AS closed,  -- [1,10]
  int4range(1, 10, '[)') AS half_open,  -- [1,10)
  int4range(1, 10, '()') AS open;  -- (1,10)`,
    hints: ['Third parameter specifies bounds', '[]=inclusive, ()=exclusive'],
    tags: ['range', 'bounds', 'inclusive-exclusive'],
  },
  {
    id: 'pg-range-102',
    category: 'Range Types',
    difficulty: 'medium',
    title: 'Range Contains Value',
    text: 'Check if a date falls within a date range',
    setup: 'Table: events (id, name TEXT, dates DATERANGE)',
    setupCode: `CREATE TABLE events (id SERIAL PRIMARY KEY, name TEXT, dates DATERANGE);
INSERT INTO events (name, dates) VALUES ('Conference', '[2024-06-01, 2024-06-05]');`,
    expected: true,
    sample: "SELECT dates @> '2024-06-03'::date FROM events;",
    hints: ['@> checks if range contains element', 'Cast the value to appropriate type'],
    tags: ['range', 'contains', 'element'],
  },
  {
    id: 'pg-range-103',
    category: 'Range Types',
    difficulty: 'medium',
    title: 'Range Contains Range',
    text: 'Check if one range completely contains another',
    setup: 'Table: schedules (id, available TSRANGE, requested TSRANGE)',
    setupCode: `CREATE TABLE schedules (id SERIAL PRIMARY KEY, available TSRANGE, requested TSRANGE);
INSERT INTO schedules (available, requested) VALUES
  ('[2024-01-01 09:00, 2024-01-01 17:00)', '[2024-01-01 10:00, 2024-01-01 12:00)');`,
    expected: true,
    sample: 'SELECT available @> requested FROM schedules;',
    hints: [
      '@> works for range-contains-range too',
      'Entire requested range must be within available',
    ],
    tags: ['range', 'contains', 'range'],
  },
  {
    id: 'pg-range-104',
    category: 'Range Types',
    difficulty: 'medium',
    title: 'Range Overlap Check',
    text: 'Find all reservations that overlap with a given date range',
    setup: 'Table: reservations (id, dates DATERANGE)',
    setupCode: `CREATE TABLE reservations (id SERIAL PRIMARY KEY, room TEXT, dates DATERANGE);
INSERT INTO reservations (room, dates) VALUES
  ('A', '[2024-06-01, 2024-06-05]'), ('B', '[2024-06-10, 2024-06-15]'), ('C', '[2024-06-03, 2024-06-08]');`,
    expected: [{ room: 'A' }, { room: 'C' }],
    sample: "SELECT room FROM reservations WHERE dates && '[2024-06-02, 2024-06-04]'::daterange;",
    hints: ['&& checks for any overlap', 'True if ranges share any points'],
    tags: ['range', 'overlap', 'filter'],
  },
  {
    id: 'pg-range-105',
    category: 'Range Types',
    difficulty: 'hard',
    title: 'Range Intersection',
    text: 'Find the overlapping portion of two ranges',
    setup: 'Two overlapping date ranges',
    setupCode: `-- No table needed`,
    expected: '[2024-06-03,2024-06-05]',
    sample: "SELECT '[2024-06-01, 2024-06-05]'::daterange * '[2024-06-03, 2024-06-10]'::daterange;",
    hints: ['* operator calculates intersection', 'Returns empty range if no overlap'],
    tags: ['range', 'intersection', 'operator'],
  },
  {
    id: 'pg-range-106',
    category: 'Range Types',
    difficulty: 'hard',
    title: 'Range Union',
    text: 'Combine adjacent or overlapping ranges',
    setup: 'Two adjacent date ranges',
    setupCode: `-- No table needed`,
    expected: '[2024-06-01,2024-06-10]',
    sample: "SELECT '[2024-06-01, 2024-06-05]'::daterange + '[2024-06-05, 2024-06-10]'::daterange;",
    hints: ['+ operator for union', 'Ranges must be adjacent or overlapping'],
    tags: ['range', 'union', 'operator'],
  },
  {
    id: 'pg-range-107',
    category: 'Range Types',
    difficulty: 'medium',
    title: 'Extract Range Bounds',
    text: 'Get the lower and upper bounds of a range',
    setup: 'Table: projects (id, duration DATERANGE)',
    setupCode: `CREATE TABLE projects (id SERIAL PRIMARY KEY, name TEXT, duration DATERANGE);
INSERT INTO projects (name, duration) VALUES ('Project A', '[2024-01-01, 2024-06-30]');`,
    expected: { start: '2024-01-01', end: '2024-06-30' },
    sample: 'SELECT LOWER(duration) AS start, UPPER(duration) AS end FROM projects;',
    hints: ['LOWER() extracts lower bound', 'UPPER() extracts upper bound'],
    tags: ['range', 'bounds', 'extract'],
  },
  {
    id: 'pg-range-108',
    category: 'Range Types',
    difficulty: 'hard',
    title: 'Exclusion Constraint',
    text: 'Prevent overlapping room reservations',
    setup: 'Table with exclusion constraint',
    setupCode: `CREATE TABLE room_reservations (
  id SERIAL PRIMARY KEY,
  room_id INTEGER,
  dates DATERANGE,
  EXCLUDE USING GIST (room_id WITH =, dates WITH &&)
);`,
    expected: 'Overlapping reservations for same room are rejected',
    sample: `INSERT INTO room_reservations (room_id, dates) VALUES (1, '[2024-06-01, 2024-06-05]');
-- This would fail:
-- INSERT INTO room_reservations (room_id, dates) VALUES (1, '[2024-06-03, 2024-06-08]');`,
    hints: ['EXCLUDE constraint prevents overlaps', 'WITH = for equality, WITH && for overlap'],
    tags: ['range', 'exclusion', 'constraint'],
  },
  {
    id: 'pg-range-109',
    category: 'Range Types',
    difficulty: 'medium',
    title: 'Check if Range is Empty',
    text: 'Determine if a range contains no values',
    setup: 'Various range examples',
    setupCode: `-- No table needed`,
    expected: [false, true],
    sample: "SELECT ISEMPTY('[1,10]'::int4range), ISEMPTY('empty'::int4range);",
    hints: ['ISEMPTY() returns true for empty ranges', 'Empty range has no values'],
    tags: ['range', 'empty', 'check'],
  },
  {
    id: 'pg-range-110',
    category: 'Range Types',
    difficulty: 'hard',
    title: 'Timestamp Range with Timezone',
    text: 'Work with timestamp ranges including timezone',
    setup: 'Table with TSTZRANGE',
    setupCode: `CREATE TABLE meetings (id SERIAL PRIMARY KEY, title TEXT, time_slot TSTZRANGE);
INSERT INTO meetings (title, time_slot) VALUES
  ('Team Sync', '[2024-06-01 10:00:00 UTC, 2024-06-01 11:00:00 UTC)');`,
    expected: 'Timezone-aware range operations',
    sample: `SELECT * FROM meetings
WHERE time_slot @> '2024-06-01 06:30:00 America/New_York'::timestamptz;`,
    hints: ['TSTZRANGE stores timestamps with timezone', 'Comparisons account for timezone'],
    tags: ['range', 'tstzrange', 'timezone'],
  },
  {
    id: 'pg-range-111',
    category: 'Range Types',
    difficulty: 'hard',
    title: 'Range Difference',
    text: 'Subtract one range from another',
    setup: 'Two overlapping ranges',
    setupCode: `-- No table needed`,
    expected: '[1,3)',
    sample: "SELECT '[1,10)'::int4range - '[3,7)'::int4range;",
    hints: ['- operator for difference', 'Result may be split if hole in middle'],
    tags: ['range', 'difference', 'operator'],
  },
  {
    id: 'pg-range-112',
    category: 'Range Types',
    difficulty: 'medium',
    title: 'Range Adjacency',
    text: 'Check if two ranges are adjacent (no gap or overlap)',
    setup: 'Adjacent date ranges',
    setupCode: `-- No table needed`,
    expected: true,
    sample:
      "SELECT '[2024-01-01, 2024-01-10)'::daterange -|- '[2024-01-10, 2024-01-20)'::daterange;",
    hints: ['-|- checks adjacency', 'Ranges touch but do not overlap'],
    tags: ['range', 'adjacent', 'check'],
  },
  {
    id: 'pg-range-113',
    category: 'Range Types',
    difficulty: 'hard',
    title: 'Aggregate Ranges',
    text: 'Merge multiple ranges into their union',
    setup: 'Table with multiple ranges to merge',
    setupCode: `CREATE TABLE segments (id SERIAL PRIMARY KEY, segment INT4RANGE);
INSERT INTO segments (segment) VALUES ('[1,5)'), ('[3,8)'), ('[10,15)');`,
    expected: 'Merged/aggregated ranges',
    sample: 'SELECT RANGE_AGG(segment) FROM segments;',
    hints: ['RANGE_AGG aggregates ranges', 'Merges overlapping/adjacent into multirange'],
    tags: ['range', 'aggregate', 'merge'],
  },
  {
    id: 'pg-range-114',
    category: 'Range Types',
    difficulty: 'hard',
    title: 'Multirange Type',
    text: 'Work with multiple disjoint ranges as one value',
    setup: 'Multirange example',
    setupCode: `-- No table needed`,
    expected: 'Multiple disjoint ranges',
    sample: `SELECT '{[1,5), [10,15)}'::int4multirange;
SELECT 7 <@ '{[1,5), [10,15)}'::int4multirange;  -- false
SELECT 12 <@ '{[1,5), [10,15)}'::int4multirange;  -- true`,
    hints: ['Multirange holds multiple disjoint ranges', 'Containment checks all ranges'],
    tags: ['range', 'multirange', 'disjoint'],
  },

  // ============================================================
  // NEW PROBLEMS - BATCH 4: INDEXES (20 problems)
  // ============================================================
  {
    id: 'pg-idx-100',
    category: 'Indexes',
    difficulty: 'easy',
    title: 'Create Basic B-tree Index',
    text: 'Create an index on the email column for faster lookups',
    setup: 'Table: users (id, email TEXT)',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT, name TEXT);`,
    expected: 'B-tree index created',
    sample: 'CREATE INDEX idx_users_email ON users (email);',
    hints: ['B-tree is the default index type', 'Good for equality and range queries'],
    tags: ['index', 'btree', 'create'],
  },
  {
    id: 'pg-idx-101',
    category: 'Indexes',
    difficulty: 'easy',
    title: 'Create Unique Index',
    text: 'Create a unique index to enforce email uniqueness',
    setup: 'Table: users (id, email TEXT)',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT);`,
    expected: 'Unique index enforces constraint',
    sample: 'CREATE UNIQUE INDEX idx_users_email_unique ON users (email);',
    hints: ['UNIQUE index prevents duplicates', 'Also speeds up lookups'],
    tags: ['index', 'unique', 'constraint'],
  },
  {
    id: 'pg-idx-102',
    category: 'Indexes',
    difficulty: 'medium',
    title: 'Create Partial Index',
    text: 'Create an index only for active users',
    setup: 'Table: users (id, email TEXT, active BOOLEAN)',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT, active BOOLEAN);`,
    expected: 'Partial index on active users only',
    sample: 'CREATE INDEX idx_active_users ON users (email) WHERE active = true;',
    hints: ['WHERE clause creates partial index', 'Smaller index, faster for filtered queries'],
    tags: ['index', 'partial', 'filter'],
  },
  {
    id: 'pg-idx-103',
    category: 'Indexes',
    difficulty: 'medium',
    title: 'Create Multi-column Index',
    text: 'Create an index on (department, hire_date) for filtered sorting',
    setup: 'Table: employees (id, department TEXT, hire_date DATE)',
    setupCode: `CREATE TABLE employees (id SERIAL PRIMARY KEY, department TEXT, hire_date DATE);`,
    expected: 'Composite index created',
    sample: 'CREATE INDEX idx_emp_dept_date ON employees (department, hire_date);',
    hints: ['Column order matters for queries', 'Leftmost prefix rule applies'],
    tags: ['index', 'composite', 'multi-column'],
  },
  {
    id: 'pg-idx-104',
    category: 'Indexes',
    difficulty: 'medium',
    title: 'Create Expression Index',
    text: 'Create an index on LOWER(email) for case-insensitive search',
    setup: 'Table: users (id, email TEXT)',
    setupCode: `CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT);`,
    expected: 'Expression index for case-insensitive lookup',
    sample: 'CREATE INDEX idx_users_email_lower ON users (LOWER(email));',
    hints: ['Expression index indexes computed values', 'Query must use same expression'],
    tags: ['index', 'expression', 'function'],
  },
  {
    id: 'pg-idx-105',
    category: 'Indexes',
    difficulty: 'hard',
    title: 'Create Covering Index',
    text: 'Create an index that includes all needed columns',
    setup: 'Table: orders (id, customer_id INTEGER, status TEXT, total NUMERIC)',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, customer_id INTEGER, status TEXT, total NUMERIC);`,
    expected: 'Covering index for index-only scans',
    sample: 'CREATE INDEX idx_orders_covering ON orders (customer_id) INCLUDE (status, total);',
    hints: ['INCLUDE adds non-key columns', 'Enables index-only scans'],
    tags: ['index', 'covering', 'include'],
  },
  {
    id: 'pg-idx-106',
    category: 'Indexes',
    difficulty: 'medium',
    title: 'Create GIN Index for Arrays',
    text: 'Create a GIN index for efficient array containment queries',
    setup: 'Table: products (id, tags TEXT[])',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, tags TEXT[]);`,
    expected: 'GIN index for array operations',
    sample: 'CREATE INDEX idx_products_tags ON products USING GIN (tags);',
    hints: ['GIN is optimized for multi-valued types', 'Good for @>, &&, <@ operators'],
    tags: ['index', 'gin', 'array'],
  },
  {
    id: 'pg-idx-107',
    category: 'Indexes',
    difficulty: 'medium',
    title: 'Create GIN Index for JSONB',
    text: 'Create a GIN index for JSONB containment queries',
    setup: 'Table: documents (id, data JSONB)',
    setupCode: `CREATE TABLE documents (id SERIAL PRIMARY KEY, data JSONB);`,
    expected: 'GIN index for JSONB queries',
    sample: 'CREATE INDEX idx_documents_data ON documents USING GIN (data);',
    hints: ['GIN supports @>, ?, ?|, ?& operators', 'Consider jsonb_path_ops for @> only'],
    tags: ['index', 'gin', 'jsonb'],
  },
  {
    id: 'pg-idx-108',
    category: 'Indexes',
    difficulty: 'hard',
    title: 'Create GiST Index for Range',
    text: 'Create a GiST index for range overlap queries',
    setup: 'Table: reservations (id, dates DATERANGE)',
    setupCode: `CREATE TABLE reservations (id SERIAL PRIMARY KEY, room TEXT, dates DATERANGE);`,
    expected: 'GiST index for range operations',
    sample: 'CREATE INDEX idx_reservations_dates ON reservations USING GIST (dates);',
    hints: ['GiST supports range operators', 'Required for exclusion constraints'],
    tags: ['index', 'gist', 'range'],
  },
  {
    id: 'pg-idx-109',
    category: 'Indexes',
    difficulty: 'hard',
    title: 'Create Full-Text Search Index',
    text: 'Create a GIN index for full-text search',
    setup: 'Table: articles (id, content TEXT)',
    setupCode: `CREATE TABLE articles (id SERIAL PRIMARY KEY, title TEXT, content TEXT);`,
    expected: 'Index for full-text search',
    sample: `CREATE INDEX idx_articles_fts ON articles
USING GIN (to_tsvector('english', content));`,
    hints: ['GIN on tsvector for fast FTS', 'Language must match query language'],
    tags: ['index', 'gin', 'fts'],
  },
  {
    id: 'pg-idx-110',
    category: 'Indexes',
    difficulty: 'medium',
    title: 'Create Index with Specific Order',
    text: 'Create an index with DESC ordering for sorted queries',
    setup: 'Table: events (id, event_time TIMESTAMP)',
    setupCode: `CREATE TABLE events (id SERIAL PRIMARY KEY, event_time TIMESTAMP);`,
    expected: 'Index optimized for descending order',
    sample: 'CREATE INDEX idx_events_time_desc ON events (event_time DESC);',
    hints: ['DESC index for ORDER BY DESC queries', 'Can combine with NULLS FIRST/LAST'],
    tags: ['index', 'order', 'desc'],
  },
  {
    id: 'pg-idx-111',
    category: 'Indexes',
    difficulty: 'easy',
    title: 'Drop Index',
    text: 'Remove an unused or redundant index',
    setup: 'Existing index to drop',
    setupCode: `CREATE TABLE test (id INT, value TEXT);
CREATE INDEX idx_test ON test (value);`,
    expected: 'Index removed',
    sample: 'DROP INDEX idx_test;',
    hints: ['DROP INDEX removes the index', 'Use IF EXISTS to avoid errors'],
    tags: ['index', 'drop', 'remove'],
  },
  {
    id: 'pg-idx-112',
    category: 'Indexes',
    difficulty: 'hard',
    title: 'Create Index Concurrently',
    text: 'Create an index without blocking writes',
    setup: 'Large table needing index',
    setupCode: `CREATE TABLE large_table (id SERIAL PRIMARY KEY, data TEXT);`,
    expected: 'Index built without blocking',
    sample: 'CREATE INDEX CONCURRENTLY idx_large_data ON large_table (data);',
    hints: ['CONCURRENTLY avoids write locks', 'Takes longer, cannot be in transaction'],
    tags: ['index', 'concurrent', 'online'],
  },
  {
    id: 'pg-idx-113',
    category: 'Indexes',
    difficulty: 'medium',
    title: 'Reindex Table',
    text: 'Rebuild all indexes on a table',
    setup: 'Table with bloated indexes',
    setupCode: `CREATE TABLE data (id SERIAL PRIMARY KEY, value TEXT);
CREATE INDEX idx_data ON data (value);`,
    expected: 'Indexes rebuilt',
    sample: 'REINDEX TABLE data;',
    hints: ['REINDEX rebuilds indexes', 'Removes bloat from updates/deletes'],
    tags: ['index', 'reindex', 'maintenance'],
  },
  {
    id: 'pg-idx-114',
    category: 'Indexes',
    difficulty: 'hard',
    title: 'Create BRIN Index',
    text: 'Create a BRIN index for large time-series table',
    setup: 'Table: logs (id, log_time TIMESTAMP) - data ordered by time',
    setupCode: `CREATE TABLE logs (id SERIAL PRIMARY KEY, log_time TIMESTAMP, message TEXT);`,
    expected: 'BRIN index for ordered data',
    sample: 'CREATE INDEX idx_logs_time_brin ON logs USING BRIN (log_time);',
    hints: ['BRIN is tiny but requires correlation', 'Best when data is naturally ordered'],
    tags: ['index', 'brin', 'time-series'],
  },
  {
    id: 'pg-idx-115',
    category: 'Indexes',
    difficulty: 'medium',
    title: 'Check Index Usage',
    text: 'Query to see if an index is being used',
    setup: 'Existing table with indexes',
    setupCode: `-- Using pg_stat_user_indexes`,
    expected: 'Index usage statistics',
    sample: `SELECT schemaname, relname, indexrelname, idx_scan, idx_tup_read
FROM pg_stat_user_indexes
WHERE relname = 'your_table'
ORDER BY idx_scan;`,
    hints: ['pg_stat_user_indexes tracks usage', 'Low idx_scan means unused index'],
    tags: ['index', 'statistics', 'monitoring'],
  },
  {
    id: 'pg-idx-116',
    category: 'Indexes',
    difficulty: 'hard',
    title: 'Partial Unique Index',
    text: 'Create unique constraint only for active records',
    setup: 'Table: subscriptions (id, email TEXT, active BOOLEAN)',
    setupCode: `CREATE TABLE subscriptions (id SERIAL PRIMARY KEY, email TEXT, active BOOLEAN);`,
    expected: 'Unique email only among active subscriptions',
    sample: 'CREATE UNIQUE INDEX idx_active_email ON subscriptions (email) WHERE active = true;',
    hints: ['Partial + unique for conditional uniqueness', 'Allows duplicate emails if inactive'],
    tags: ['index', 'partial', 'unique'],
  },
  {
    id: 'pg-idx-117',
    category: 'Indexes',
    difficulty: 'medium',
    title: 'Index Size',
    text: 'Check the size of an index',
    setup: 'Existing index',
    setupCode: `-- Using pg_relation_size`,
    expected: 'Index size in bytes',
    sample: `SELECT pg_size_pretty(pg_relation_size('idx_users_email'));`,
    hints: ['pg_relation_size returns bytes', 'pg_size_pretty formats nicely'],
    tags: ['index', 'size', 'monitoring'],
  },
  {
    id: 'pg-idx-118',
    category: 'Indexes',
    difficulty: 'hard',
    title: 'GIN Index with Operator Class',
    text: 'Create GIN index with specific operator class for JSONB',
    setup: 'Table: documents (id, data JSONB)',
    setupCode: `CREATE TABLE documents (id SERIAL PRIMARY KEY, data JSONB);`,
    expected: 'Optimized GIN for containment only',
    sample: 'CREATE INDEX idx_docs_data ON documents USING GIN (data jsonb_path_ops);',
    hints: ['jsonb_path_ops is smaller and faster', 'Only supports @> operator'],
    tags: ['index', 'gin', 'opclass'],
  },
  {
    id: 'pg-idx-119',
    category: 'Indexes',
    difficulty: 'medium',
    title: 'Index on Expression with COALESCE',
    text: 'Create index treating NULL as specific value',
    setup: 'Table: products (id, category TEXT)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, category TEXT);`,
    expected: 'Index that groups NULLs with default',
    sample: "CREATE INDEX idx_products_cat ON products (COALESCE(category, 'Uncategorized'));",
    hints: ['COALESCE in index handles NULLs', 'Query must use same expression'],
    tags: ['index', 'expression', 'coalesce'],
  },

  // ============================================================
  // NEW PROBLEMS - BATCH 4: TRANSACTIONS (20 problems)
  // ============================================================
  {
    id: 'pg-tx-100',
    category: 'Transactions',
    difficulty: 'easy',
    title: 'Basic Transaction',
    text: 'Wrap multiple statements in a transaction',
    setup: 'Table: accounts (id, balance NUMERIC)',
    setupCode: `CREATE TABLE accounts (id SERIAL PRIMARY KEY, name TEXT, balance NUMERIC);
INSERT INTO accounts (name, balance) VALUES ('Alice', 1000), ('Bob', 1000);`,
    expected: 'Both updates succeed or both fail',
    sample: `BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE name = 'Alice';
UPDATE accounts SET balance = balance + 100 WHERE name = 'Bob';
COMMIT;`,
    hints: ['BEGIN starts transaction', 'COMMIT makes changes permanent'],
    tags: ['transaction', 'begin', 'commit'],
  },
  {
    id: 'pg-tx-101',
    category: 'Transactions',
    difficulty: 'easy',
    title: 'Transaction Rollback',
    text: 'Undo changes if something goes wrong',
    setup: 'Table: accounts (id, balance NUMERIC)',
    setupCode: `CREATE TABLE accounts (id SERIAL PRIMARY KEY, name TEXT, balance NUMERIC);
INSERT INTO accounts (name, balance) VALUES ('Alice', 1000);`,
    expected: 'Changes are undone',
    sample: `BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE name = 'Alice';
-- Oops, wrong amount!
ROLLBACK;
-- Alice still has 1000`,
    hints: ['ROLLBACK undoes all changes since BEGIN', 'Use when error detected'],
    tags: ['transaction', 'rollback', 'undo'],
  },
  {
    id: 'pg-tx-102',
    category: 'Transactions',
    difficulty: 'medium',
    title: 'SAVEPOINT for Partial Rollback',
    text: 'Create savepoint to rollback only part of transaction',
    setup: 'Table: orders (id, status TEXT)',
    setupCode: `CREATE TABLE orders (id SERIAL PRIMARY KEY, item TEXT, status TEXT DEFAULT 'pending');`,
    expected: 'Partial rollback to savepoint',
    sample: `BEGIN;
INSERT INTO orders (item) VALUES ('Item 1');
SAVEPOINT sp1;
INSERT INTO orders (item) VALUES ('Item 2');
-- Rollback only Item 2:
ROLLBACK TO SAVEPOINT sp1;
COMMIT;
-- Only Item 1 is committed`,
    hints: ['SAVEPOINT creates restore point', 'ROLLBACK TO undoes to that point'],
    tags: ['transaction', 'savepoint', 'partial'],
  },
  {
    id: 'pg-tx-103',
    category: 'Transactions',
    difficulty: 'medium',
    title: 'Release SAVEPOINT',
    text: 'Remove a savepoint when no longer needed',
    setup: 'Active transaction with savepoint',
    setupCode: `-- In active transaction`,
    expected: 'Savepoint removed',
    sample: `BEGIN;
INSERT INTO orders (item) VALUES ('Item 1');
SAVEPOINT sp1;
INSERT INTO orders (item) VALUES ('Item 2');
-- All good, release savepoint:
RELEASE SAVEPOINT sp1;
COMMIT;`,
    hints: ['RELEASE removes savepoint', 'Frees resources, keeps changes'],
    tags: ['transaction', 'savepoint', 'release'],
  },
  {
    id: 'pg-tx-104',
    category: 'Transactions',
    difficulty: 'hard',
    title: 'Isolation Level - Read Committed',
    text: 'Understand default isolation level behavior',
    setup: 'Table: counters (id, value INTEGER)',
    setupCode: `CREATE TABLE counters (id SERIAL PRIMARY KEY, value INTEGER);
INSERT INTO counters (value) VALUES (0);`,
    expected: 'Each read sees committed data',
    sample: `-- Session 1:
BEGIN;
SELECT value FROM counters;  -- Sees 0
-- Session 2 commits: UPDATE counters SET value = 1;
SELECT value FROM counters;  -- Sees 1 (committed)
COMMIT;`,
    hints: ['Read Committed is PostgreSQL default', 'Each statement sees latest committed data'],
    tags: ['transaction', 'isolation', 'read-committed'],
  },
  {
    id: 'pg-tx-105',
    category: 'Transactions',
    difficulty: 'hard',
    title: 'Isolation Level - Repeatable Read',
    text: 'Prevent non-repeatable reads with stronger isolation',
    setup: 'Table: inventory (id, quantity INTEGER)',
    setupCode: `CREATE TABLE inventory (id SERIAL PRIMARY KEY, item TEXT, quantity INTEGER);
INSERT INTO inventory (item, quantity) VALUES ('Widget', 100);`,
    expected: 'Same query returns same result in transaction',
    sample: `BEGIN ISOLATION LEVEL REPEATABLE READ;
SELECT quantity FROM inventory WHERE item = 'Widget';  -- 100
-- Another transaction commits: UPDATE inventory SET quantity = 50;
SELECT quantity FROM inventory WHERE item = 'Widget';  -- Still 100
COMMIT;`,
    hints: [
      'REPEATABLE READ uses snapshot from transaction start',
      'Prevents non-repeatable reads',
    ],
    tags: ['transaction', 'isolation', 'repeatable-read'],
  },
  {
    id: 'pg-tx-106',
    category: 'Transactions',
    difficulty: 'hard',
    title: 'Isolation Level - Serializable',
    text: 'Strictest isolation - transactions appear serial',
    setup: 'Table for serializable example',
    setupCode: `CREATE TABLE seats (id SERIAL PRIMARY KEY, booked BOOLEAN DEFAULT false);
INSERT INTO seats (booked) SELECT false FROM generate_series(1, 100);`,
    expected: 'Conflicts cause serialization failure',
    sample: `BEGIN ISOLATION LEVEL SERIALIZABLE;
SELECT COUNT(*) FROM seats WHERE NOT booked;  -- Check availability
UPDATE seats SET booked = true WHERE id = 1;
COMMIT;  -- May fail if conflicting concurrent transaction`,
    hints: ['SERIALIZABLE may throw serialization_failure', 'Application must retry on failure'],
    tags: ['transaction', 'isolation', 'serializable'],
  },
  {
    id: 'pg-tx-107',
    category: 'Transactions',
    difficulty: 'medium',
    title: 'SET TRANSACTION',
    text: 'Set transaction characteristics after BEGIN',
    setup: 'Any table',
    setupCode: `CREATE TABLE data (id SERIAL PRIMARY KEY, value TEXT);`,
    expected: 'Transaction configured after start',
    sample: `BEGIN;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SET TRANSACTION READ ONLY;
SELECT * FROM data;
COMMIT;`,
    hints: ['SET TRANSACTION modifies current transaction', 'Must be before any queries'],
    tags: ['transaction', 'set', 'configuration'],
  },
  {
    id: 'pg-tx-108',
    category: 'Transactions',
    difficulty: 'medium',
    title: 'Read Only Transaction',
    text: 'Create a transaction that cannot modify data',
    setup: 'Table: reports (id, data TEXT)',
    setupCode: `CREATE TABLE reports (id SERIAL PRIMARY KEY, data TEXT);
INSERT INTO reports (data) VALUES ('Report 1');`,
    expected: 'Writes are rejected',
    sample: `BEGIN READ ONLY;
SELECT * FROM reports;  -- Works
-- UPDATE reports SET data = 'Modified';  -- Would error
COMMIT;`,
    hints: ['READ ONLY prevents modifications', 'Good for reporting queries'],
    tags: ['transaction', 'read-only', 'safety'],
  },
  {
    id: 'pg-tx-109',
    category: 'Transactions',
    difficulty: 'hard',
    title: 'Deferrable Transaction',
    text: 'Create a deferrable serializable transaction',
    setup: 'Large table for reporting',
    setupCode: `-- Large table scenario`,
    expected: 'Transaction waits for safe execution point',
    sample: `BEGIN ISOLATION LEVEL SERIALIZABLE READ ONLY DEFERRABLE;
-- Long-running report query that waits for safe snapshot
SELECT * FROM large_table;
COMMIT;`,
    hints: ['DEFERRABLE waits for non-blocking moment', 'Only for SERIALIZABLE READ ONLY'],
    tags: ['transaction', 'deferrable', 'serializable'],
  },
  {
    id: 'pg-tx-110',
    category: 'Transactions',
    difficulty: 'medium',
    title: 'Row-Level Locking - FOR UPDATE',
    text: 'Lock rows for update to prevent concurrent modification',
    setup: 'Table: inventory (id, quantity INTEGER)',
    setupCode: `CREATE TABLE inventory (id SERIAL PRIMARY KEY, item TEXT, quantity INTEGER);
INSERT INTO inventory (item, quantity) VALUES ('Widget', 100);`,
    expected: 'Row locked until transaction ends',
    sample: `BEGIN;
SELECT * FROM inventory WHERE item = 'Widget' FOR UPDATE;
-- Row is now locked
UPDATE inventory SET quantity = quantity - 10 WHERE item = 'Widget';
COMMIT;`,
    hints: ['FOR UPDATE locks selected rows', 'Other transactions wait or skip'],
    tags: ['transaction', 'lock', 'for-update'],
  },
  {
    id: 'pg-tx-111',
    category: 'Transactions',
    difficulty: 'hard',
    title: 'FOR UPDATE SKIP LOCKED',
    text: 'Skip locked rows instead of waiting',
    setup: 'Table: jobs (id, status TEXT)',
    setupCode: `CREATE TABLE jobs (id SERIAL PRIMARY KEY, status TEXT DEFAULT 'pending');
INSERT INTO jobs (status) SELECT 'pending' FROM generate_series(1, 10);`,
    expected: 'Workers process different jobs',
    sample: `BEGIN;
SELECT * FROM jobs WHERE status = 'pending' LIMIT 1 FOR UPDATE SKIP LOCKED;
-- Process the job...
UPDATE jobs SET status = 'completed' WHERE id = ?;
COMMIT;`,
    hints: ['SKIP LOCKED for job queue pattern', 'Multiple workers get different rows'],
    tags: ['transaction', 'lock', 'skip-locked'],
  },
  {
    id: 'pg-tx-112',
    category: 'Transactions',
    difficulty: 'medium',
    title: 'FOR SHARE Lock',
    text: 'Allow concurrent reads but block updates',
    setup: 'Table: products (id, price NUMERIC)',
    setupCode: `CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, price NUMERIC);
INSERT INTO products (name, price) VALUES ('Widget', 100);`,
    expected: 'Share lock allows multiple readers',
    sample: `BEGIN;
SELECT * FROM products WHERE name = 'Widget' FOR SHARE;
-- Other transactions can read but not update this row
COMMIT;`,
    hints: ['FOR SHARE is less restrictive than FOR UPDATE', 'Allows concurrent reads'],
    tags: ['transaction', 'lock', 'for-share'],
  },
  {
    id: 'pg-tx-113',
    category: 'Transactions',
    difficulty: 'hard',
    title: 'Advisory Locks',
    text: 'Use application-level locks independent of tables',
    setup: 'No specific table needed',
    setupCode: `-- Application-level locking`,
    expected: 'Custom locking for application logic',
    sample: `-- Session 1:
SELECT pg_advisory_lock(12345);
-- Do exclusive work...
SELECT pg_advisory_unlock(12345);

-- Session 2 waits at pg_advisory_lock(12345) until released`,
    hints: ['Advisory locks are application-defined', 'Not tied to specific rows/tables'],
    tags: ['transaction', 'advisory-lock', 'application'],
  },
  {
    id: 'pg-tx-114',
    category: 'Transactions',
    difficulty: 'hard',
    title: 'Try Advisory Lock',
    text: 'Attempt to acquire lock without blocking',
    setup: 'No specific table needed',
    setupCode: `-- Non-blocking advisory lock`,
    expected: 'Returns false if lock unavailable',
    sample: `-- Try to acquire lock:
SELECT pg_try_advisory_lock(12345);  -- Returns true/false
-- If true, do work then:
SELECT pg_advisory_unlock(12345);`,
    hints: ['pg_try_advisory_lock returns immediately', 'Returns false if lock not available'],
    tags: ['transaction', 'advisory-lock', 'try'],
  },
  {
    id: 'pg-tx-115',
    category: 'Transactions',
    difficulty: 'medium',
    title: 'LOCK TABLE',
    text: 'Lock an entire table',
    setup: 'Table: critical_data (id, value TEXT)',
    setupCode: `CREATE TABLE critical_data (id SERIAL PRIMARY KEY, value TEXT);`,
    expected: 'Table locked for exclusive access',
    sample: `BEGIN;
LOCK TABLE critical_data IN EXCLUSIVE MODE;
-- Full table locked for modifications
UPDATE critical_data SET value = 'updated';
COMMIT;`,
    hints: ['LOCK TABLE for table-level locks', 'Different modes: SHARE, EXCLUSIVE, etc.'],
    tags: ['transaction', 'lock', 'table'],
  },
  {
    id: 'pg-tx-116',
    category: 'Transactions',
    difficulty: 'hard',
    title: 'Deadlock Handling',
    text: 'Understand and handle deadlocks',
    setup: 'Tables with potential for deadlock',
    setupCode: `CREATE TABLE table_a (id INT PRIMARY KEY, value TEXT);
CREATE TABLE table_b (id INT PRIMARY KEY, value TEXT);
INSERT INTO table_a VALUES (1, 'a');
INSERT INTO table_b VALUES (1, 'b');`,
    expected: 'One transaction aborted on deadlock',
    sample: `-- Session 1:
BEGIN;
UPDATE table_a SET value = 'a1' WHERE id = 1;
-- Wait for session 2...
UPDATE table_b SET value = 'b1' WHERE id = 1;  -- Deadlock!

-- Session 2:
BEGIN;
UPDATE table_b SET value = 'b2' WHERE id = 1;
UPDATE table_a SET value = 'a2' WHERE id = 1;  -- Deadlock!

-- PostgreSQL detects and aborts one transaction`,
    hints: ['PostgreSQL auto-detects deadlocks', 'One transaction is aborted'],
    tags: ['transaction', 'deadlock', 'handling'],
  },
  {
    id: 'pg-tx-117',
    category: 'Transactions',
    difficulty: 'medium',
    title: 'NOWAIT Option',
    text: 'Fail immediately instead of waiting for lock',
    setup: 'Table: resources (id, status TEXT)',
    setupCode: `CREATE TABLE resources (id SERIAL PRIMARY KEY, status TEXT);
INSERT INTO resources (status) VALUES ('available');`,
    expected: 'Error if row already locked',
    sample: `BEGIN;
SELECT * FROM resources WHERE id = 1 FOR UPDATE NOWAIT;
-- Immediately fails if row is locked by another transaction
COMMIT;`,
    hints: ['NOWAIT raises error instead of waiting', 'Good for immediate feedback'],
    tags: ['transaction', 'lock', 'nowait'],
  },
  {
    id: 'pg-tx-118',
    category: 'Transactions',
    difficulty: 'hard',
    title: 'Two-Phase Commit Prepare',
    text: 'Prepare a transaction for two-phase commit',
    setup: 'Distributed transaction scenario',
    setupCode: `CREATE TABLE distributed_data (id SERIAL PRIMARY KEY, value TEXT);`,
    expected: 'Transaction prepared for later commit',
    sample: `BEGIN;
INSERT INTO distributed_data (value) VALUES ('prepared');
PREPARE TRANSACTION 'tx_001';
-- Later:
COMMIT PREPARED 'tx_001';
-- Or: ROLLBACK PREPARED 'tx_001';`,
    hints: [
      'PREPARE TRANSACTION for distributed commits',
      'Requires max_prepared_transactions > 0',
    ],
    tags: ['transaction', '2pc', 'distributed'],
  },
  {
    id: 'pg-tx-119',
    category: 'Transactions',
    difficulty: 'medium',
    title: 'Transaction Status Check',
    text: 'Check current transaction status',
    setup: 'Any active transaction',
    setupCode: `-- In psql or application`,
    expected: 'Transaction status information',
    sample: `SELECT txid_current();  -- Current transaction ID
SELECT txid_status(txid_current());  -- committed, aborted, or in progress`,
    hints: ['txid_current() returns transaction ID', 'Useful for debugging and monitoring'],
    tags: ['transaction', 'status', 'monitoring'],
  },
];
