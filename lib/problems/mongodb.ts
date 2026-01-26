import type { Problem } from '../types';

/**
 * MongoDB problems for coding drills
 * Covers CRUD operations, Query Operators, Update Operators,
 * Aggregation Pipeline, Array Operations, Indexes, Text Search, and Geospatial queries
 */

export const mongodbProblems: Problem[] = [
  // ============================================================
  // BASIC FIND OPERATIONS (10 problems)
  // ============================================================
  {
    id: 'mongo-find-001',
    category: 'Query Operators',
    difficulty: 'easy',
    title: 'Find All Documents',
    text: 'Find all documents in the users collection.',
    setup: 'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25}
]);`,
    expected: [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ],
    sample: 'db.users.find()',
    hints: ['Use find() with no arguments to get all documents', 'find() returns a cursor'],
    validPatterns: [/db\.users\.find\s*\(\s*\)/i],
    tags: ['find', 'basic', 'crud'],
  },
  {
    id: 'mongo-find-002',
    category: 'Query Operators',
    difficulty: 'easy',
    title: 'Find by Field Value',
    text: 'Find all users where age equals 30.',
    setup: 'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25}
]);`,
    expected: [{ name: 'John', age: 30 }],
    sample: 'db.users.find({age: 30})',
    hints: ['Use find() with a query object', 'Match documents where age field equals 30'],
    validPatterns: [/db\.users\.find\s*\(\s*\{\s*age\s*:\s*30\s*\}\s*\)/i],
    tags: ['find', 'query', 'equality'],
  },
  {
    id: 'mongo-find-003',
    category: 'Query Operators',
    difficulty: 'easy',
    title: 'Find with Comparison Operator',
    text: 'Find all users where age is greater than 25.',
    setup: 'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25}
]);`,
    expected: [{ name: 'John', age: 30 }],
    sample: 'db.users.find({age: {$gt: 25}})',
    hints: ['Use $gt operator for greater than', 'Syntax: {field: {$gt: value}}'],
    validPatterns: [/db\.users\.find\s*\(\s*\{\s*age\s*:\s*\{\s*\$gt\s*:\s*25\s*\}\s*\}\s*\)/i],
    tags: ['find', 'query', 'comparison', '$gt'],
  },
  {
    id: 'mongo-find-004',
    category: 'Query Operators',
    difficulty: 'easy',
    title: 'Find with $in Operator',
    text: 'Find all users where age is either 25 or 30.',
    setup:
      'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}, {name: "Bob", age: 20}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25},
  {name: "Bob", age: 20}
]);`,
    expected: [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ],
    sample: 'db.users.find({age: {$in: [25, 30]}})',
    hints: [
      'Use $in operator to match any value in an array',
      'Syntax: {field: {$in: [value1, value2]}}',
    ],
    validPatterns: [
      /db\.users\.find\s*\(\s*\{\s*age\s*:\s*\{\s*\$in\s*:\s*\[\s*25\s*,\s*30\s*\]\s*\}\s*\}\s*\)/i,
    ],
    tags: ['find', 'query', '$in'],
  },
  {
    id: 'mongo-find-005',
    category: 'Query Operators',
    difficulty: 'easy',
    title: 'Find with $and Operator',
    text: 'Find all users where age is greater than 20 AND name equals "John".',
    setup: 'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25}
]);`,
    expected: [{ name: 'John', age: 30 }],
    sample: 'db.users.find({$and: [{age: {$gt: 20}}, {name: "John"}]})',
    hints: ['Use $and operator to combine multiple conditions', 'All conditions must be true'],
    validPatterns: [
      /db\.users\.find\s*\(\s*\{\s*\$and\s*:\s*\[/i,
      /\{\s*age\s*:\s*\{\s*\$gt\s*:\s*20\s*\}\s*\}/i,
      /\{\s*name\s*:\s*"John"\s*\}/i,
    ],
    tags: ['find', 'query', '$and'],
  },
  {
    id: 'mongo-find-006',
    category: 'Query Operators',
    difficulty: 'medium',
    title: 'Find with $or Operator',
    text: 'Find all users where age is less than 25 OR name equals "John".',
    setup:
      'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}, {name: "Bob", age: 20}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25},
  {name: "Bob", age: 20}
]);`,
    expected: [
      { name: 'John', age: 30 },
      { name: 'Bob', age: 20 },
    ],
    sample: 'db.users.find({$or: [{age: {$lt: 25}}, {name: "John"}]})',
    hints: ['Use $or operator to match any condition', 'At least one condition must be true'],
    validPatterns: [/db\.users\.find\s*\(\s*\{\s*\$or\s*:\s*\[/i],
    tags: ['find', 'query', '$or'],
  },
  {
    id: 'mongo-find-007',
    category: 'Query Operators',
    difficulty: 'easy',
    title: 'Find with Projection',
    text: 'Find all users but only return the name field.',
    setup: 'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25}
]);`,
    expected: [{ name: 'John' }, { name: 'Jane' }],
    sample: 'db.users.find({}, {name: 1, _id: 0})',
    hints: ['Second parameter to find() is projection', 'Use 1 to include, 0 to exclude fields'],
    validPatterns: [/db\.users\.find\s*\(\s*\{\s*\}\s*,\s*\{\s*name\s*:\s*1/i],
    tags: ['find', 'projection'],
  },
  {
    id: 'mongo-find-008',
    category: 'Query Operators',
    difficulty: 'easy',
    title: 'Find with Limit',
    text: 'Find the first 2 users.',
    setup: 'Collection: users with documents {name: "John"}, {name: "Jane"}, {name: "Bob"}',
    setupCode: `db.users.insertMany([
  {name: "John"},
  {name: "Jane"},
  {name: "Bob"}
]);`,
    expected: [{ name: 'John' }, { name: 'Jane' }],
    sample: 'db.users.find().limit(2)',
    hints: ['Use limit() to restrict number of results', 'Chain limit() after find()'],
    validPatterns: [/db\.users\.find\s*\(\s*\)\s*\.limit\s*\(\s*2\s*\)/i],
    tags: ['find', 'limit'],
  },
  {
    id: 'mongo-find-009',
    category: 'Query Operators',
    difficulty: 'easy',
    title: 'Find with Sort',
    text: 'Find all users sorted by age in ascending order.',
    setup: 'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25}
]);`,
    expected: [
      { name: 'Jane', age: 25 },
      { name: 'John', age: 30 },
    ],
    sample: 'db.users.find().sort({age: 1})',
    hints: ['Use sort() to order results', '1 for ascending, -1 for descending'],
    validPatterns: [/db\.users\.find\s*\(\s*\)\s*\.sort\s*\(\s*\{\s*age\s*:\s*1\s*\}\s*\)/i],
    tags: ['find', 'sort'],
  },
  {
    id: 'mongo-find-010',
    category: 'Query Operators',
    difficulty: 'medium',
    title: 'Find One Document',
    text: 'Find a single user where age is greater than 20.',
    setup: 'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25}
]);`,
    expected: { name: 'John', age: 30 },
    sample: 'db.users.findOne({age: {$gt: 20}})',
    hints: [
      'Use findOne() instead of find() for single document',
      'Returns first matching document',
    ],
    validPatterns: [/db\.users\.findOne\s*\(\s*\{\s*age\s*:\s*\{\s*\$gt\s*:\s*20\s*\}\s*\}\s*\)/i],
    tags: ['findOne', 'query'],
  },

  // ============================================================
  // INSERT OPERATIONS (5 problems)
  // ============================================================
  {
    id: 'mongo-insert-001',
    category: 'Insert Operations',
    difficulty: 'easy',
    title: 'Insert Single Document',
    text: 'Insert a single document into the users collection with name "Alice" and age 28.',
    setup: 'Collection: users (empty)',
    setupCode: 'db.users.deleteMany({});',
    expected: 'Inserted document with _id',
    sample: 'db.users.insertOne({name: "Alice", age: 28})',
    hints: ['Use insertOne() to insert a single document', 'Pass document as object'],
    validPatterns: [
      /db\.users\.insertOne\s*\(\s*\{\s*name\s*:\s*"Alice"\s*,\s*age\s*:\s*28\s*\}\s*\)/i,
    ],
    tags: ['insert', 'insertOne', 'crud'],
  },
  {
    id: 'mongo-insert-002',
    category: 'Insert Operations',
    difficulty: 'easy',
    title: 'Insert Multiple Documents',
    text: 'Insert multiple documents into the users collection.',
    setup: 'Collection: users (empty)',
    setupCode: 'db.users.deleteMany({});',
    expected: 'Inserted 2 documents',
    sample: 'db.users.insertMany([{name: "Alice", age: 28}, {name: "Bob", age: 32}])',
    hints: ['Use insertMany() to insert multiple documents', 'Pass array of documents'],
    validPatterns: [/db\.users\.insertMany\s*\(\s*\[/i],
    tags: ['insert', 'insertMany', 'crud'],
  },
  {
    id: 'mongo-insert-003',
    category: 'Insert Operations',
    difficulty: 'easy',
    title: 'Insert with Nested Object',
    text: 'Insert a user document with a nested address object containing city and zip.',
    setup: 'Collection: users (empty)',
    setupCode: 'db.users.deleteMany({});',
    expected: 'Inserted document with _id',
    sample: 'db.users.insertOne({name: "Alice", address: {city: "NYC", zip: "10001"}})',
    hints: [
      'Nested objects are created with object literals',
      'Use dot notation to access nested fields',
    ],
    validPatterns: [/db\.users\.insertOne\s*\(\s*\{\s*name\s*:\s*"Alice"\s*,\s*address\s*:\s*\{/i],
    tags: ['insert', 'nested', 'object'],
  },
  {
    id: 'mongo-insert-004',
    category: 'Insert Operations',
    difficulty: 'easy',
    title: 'Insert with Array Field',
    text: 'Insert a user document with a hobbies array field.',
    setup: 'Collection: users (empty)',
    setupCode: 'db.users.deleteMany({});',
    expected: 'Inserted document with _id',
    sample: 'db.users.insertOne({name: "Alice", hobbies: ["reading", "coding", "music"]})',
    hints: ['Arrays are created with square brackets', 'Can contain any data types'],
    validPatterns: [/db\.users\.insertOne\s*\(\s*\{\s*name\s*:\s*"Alice"\s*,\s*hobbies\s*:\s*\[/i],
    tags: ['insert', 'array'],
  },
  {
    id: 'mongo-insert-005',
    category: 'Insert Operations',
    difficulty: 'medium',
    title: 'Insert with Custom _id',
    text: 'Insert a document with a custom _id field value.',
    setup: 'Collection: users (empty)',
    setupCode: 'db.users.deleteMany({});',
    expected: 'Inserted document with _id: user123',
    sample: "db.users.insertOne({_id: 'user123', name: 'Alice', age: 28})",
    hints: ['You can specify _id field manually', '_id must be unique'],
    validPatterns: [/db\.users\.insertOne\s*\(\s*\{\s*_id\s*:/i],
    tags: ['insert', '_id'],
  },

  // ============================================================
  // UPDATE OPERATIONS (10 problems)
  // ============================================================
  {
    id: 'mongo-update-001',
    category: 'Update Operators',
    difficulty: 'easy',
    title: 'Update with $set',
    text: 'Update the age field to 31 for the user with name "John".',
    setup: 'Collection: users with document {name: "John", age: 30}',
    setupCode: `db.users.insertOne({name: "John", age: 30});`,
    expected: { acknowledged: true, modifiedCount: 1 },
    sample: 'db.users.updateOne({name: "John"}, {$set: {age: 31}})',
    hints: ['Use updateOne() to update a single document', 'Use $set operator to set field values'],
    validPatterns: [
      /db\.users\.updateOne\s*\(\s*\{\s*name\s*:\s*"John"\s*\}\s*,\s*\{\s*\$set\s*:\s*\{\s*age\s*:\s*31\s*\}\s*\}\s*\)/i,
    ],
    tags: ['update', 'updateOne', '$set'],
  },
  {
    id: 'mongo-update-002',
    category: 'Update Operators',
    difficulty: 'easy',
    title: 'Update Multiple Documents',
    text: 'Update age to 30 for all users where age is less than 25.',
    setup: 'Collection: users with documents {name: "John", age: 20}, {name: "Jane", age: 22}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 20},
  {name: "Jane", age: 22}
]);`,
    expected: { acknowledged: true, modifiedCount: 2 },
    sample: 'db.users.updateMany({age: {$lt: 25}}, {$set: {age: 30}})',
    hints: [
      'Use updateMany() to update multiple documents',
      'First parameter is query, second is update',
    ],
    validPatterns: [
      /db\.users\.updateMany\s*\(\s*\{\s*age\s*:\s*\{\s*\$lt\s*:\s*25\s*\}\s*\}\s*,\s*\{\s*\$set\s*:/i,
    ],
    tags: ['update', 'updateMany', '$set'],
  },
  {
    id: 'mongo-update-003',
    category: 'Update Operators',
    difficulty: 'easy',
    title: 'Increment Numeric Field',
    text: 'Increment the age field by 1 for the user with name "John".',
    setup: 'Collection: users with document {name: "John", age: 30}',
    setupCode: `db.users.insertOne({name: "John", age: 30});`,
    expected: { acknowledged: true, modifiedCount: 1 },
    sample: 'db.users.updateOne({name: "John"}, {$inc: {age: 1}})',
    hints: [
      'Use $inc operator to increment numeric values',
      'Can use negative numbers to decrement',
    ],
    validPatterns: [
      /db\.users\.updateOne\s*\(\s*\{\s*name\s*:\s*"John"\s*\}\s*,\s*\{\s*\$inc\s*:\s*\{\s*age\s*:\s*1\s*\}\s*\}\s*\)/i,
    ],
    tags: ['update', '$inc'],
  },
  {
    id: 'mongo-update-004',
    category: 'Update Operators',
    difficulty: 'easy',
    title: 'Add Element to Array',
    text: 'Add "swimming" to the hobbies array for the user with name "John".',
    setup: 'Collection: users with document {name: "John", hobbies: ["reading", "coding"]}',
    setupCode: `db.users.insertOne({name: "John", hobbies: ["reading", "coding"]});`,
    expected: { acknowledged: true, modifiedCount: 1 },
    sample: 'db.users.updateOne({name: "John"}, {$push: {hobbies: "swimming"}})',
    hints: ['Use $push to add element to array', 'Adds to end of array'],
    validPatterns: [
      /db\.users\.updateOne\s*\(\s*\{\s*name\s*:\s*"John"\s*\}\s*,\s*\{\s*\$push\s*:\s*\{\s*hobbies\s*:\s*"swimming"\s*\}\s*\}\s*\)/i,
    ],
    tags: ['update', '$push', 'array'],
  },
  {
    id: 'mongo-update-005',
    category: 'Update Operators',
    difficulty: 'easy',
    title: 'Remove Element from Array',
    text: 'Remove "coding" from the hobbies array for the user with name "John".',
    setup:
      'Collection: users with document {name: "John", hobbies: ["reading", "coding", "music"]}',
    setupCode: `db.users.insertOne({name: "John", hobbies: ["reading", "coding", "music"]});`,
    expected: { acknowledged: true, modifiedCount: 1 },
    sample: 'db.users.updateOne({name: "John"}, {$pull: {hobbies: "coding"}})',
    hints: ['Use $pull to remove element from array', 'Removes all matching values'],
    validPatterns: [
      /db\.users\.updateOne\s*\(\s*\{\s*name\s*:\s*"John"\s*\}\s*,\s*\{\s*\$pull\s*:\s*\{\s*hobbies\s*:\s*"coding"\s*\}\s*\}\s*\)/i,
    ],
    tags: ['update', '$pull', 'array'],
  },
  {
    id: 'mongo-update-006',
    category: 'Update Operators',
    difficulty: 'medium',
    title: 'Add to Array if Not Exists',
    text: 'Add "swimming" to hobbies array only if it does not already exist.',
    setup: 'Collection: users with document {name: "John", hobbies: ["reading", "coding"]}',
    setupCode: `db.users.insertOne({name: "John", hobbies: ["reading", "coding"]});`,
    expected: { acknowledged: true, modifiedCount: 1 },
    sample: 'db.users.updateOne({name: "John"}, {$addToSet: {hobbies: "swimming"}})',
    hints: ['Use $addToSet to add only if not exists', 'Prevents duplicates'],
    validPatterns: [
      /db\.users\.updateOne\s*\(\s*\{\s*name\s*:\s*"John"\s*\}\s*,\s*\{\s*\$addToSet\s*:\s*\{\s*hobbies\s*:\s*"swimming"\s*\}\s*\}\s*\)/i,
    ],
    tags: ['update', '$addToSet', 'array'],
  },
  {
    id: 'mongo-update-007',
    category: 'Update Operators',
    difficulty: 'medium',
    title: 'Update Nested Field',
    text: 'Update the city field inside the address object for user "John".',
    setup: 'Collection: users with document {name: "John", address: {city: "NYC", zip: "10001"}}',
    setupCode: `db.users.insertOne({name: "John", address: {city: "NYC", zip: "10001"}});`,
    expected: { acknowledged: true, modifiedCount: 1 },
    sample: 'db.users.updateOne({name: "John"}, {$set: {"address.city": "Boston"}})',
    hints: ['Use dot notation to update nested fields', 'Quote the field path with dots'],
    validPatterns: [
      /db\.users\.updateOne\s*\(\s*\{\s*name\s*:\s*"John"\s*\}\s*,\s*\{\s*\$set\s*:\s*\{\s*"address\.city"\s*:/i,
    ],
    tags: ['update', 'nested', 'dot-notation'],
  },
  {
    id: 'mongo-update-008',
    category: 'Update Operators',
    difficulty: 'medium',
    title: 'Remove Field',
    text: 'Remove the age field from the user with name "John".',
    setup: 'Collection: users with document {name: "John", age: 30, city: "NYC"}',
    setupCode: `db.users.insertOne({name: "John", age: 30, city: "NYC"});`,
    expected: { acknowledged: true, modifiedCount: 1 },
    sample: 'db.users.updateOne({name: "John"}, {$unset: {age: ""}})',
    hints: ['Use $unset to remove a field', 'Value can be empty string or 1'],
    validPatterns: [
      /db\.users\.updateOne\s*\(\s*\{\s*name\s*:\s*"John"\s*\}\s*,\s*\{\s*\$unset\s*:\s*\{\s*age\s*:/i,
    ],
    tags: ['update', '$unset'],
  },
  {
    id: 'mongo-update-009',
    category: 'Update Operators',
    difficulty: 'medium',
    title: 'Update with Upsert',
    text: 'Update user "John" age to 31, or insert if not exists.',
    setup: 'Collection: users (empty)',
    setupCode: 'db.users.deleteMany({});',
    expected: 'Upserted document',
    sample: 'db.users.updateOne({name: "John"}, {$set: {age: 31}}, {upsert: true})',
    hints: ['Use upsert option to insert if not found', 'Third parameter is options object'],
    validPatterns: [
      /db\.users\.updateOne\s*\(\s*\{\s*name\s*:\s*"John"\s*\}\s*,\s*\{\s*\$set\s*:/i,
      /upsert\s*:\s*true/i,
    ],
    tags: ['update', 'upsert'],
  },
  {
    id: 'mongo-update-010',
    category: 'Update Operators',
    difficulty: 'hard',
    title: 'Update Array Element',
    text: 'Update the first element in the scores array to 100 for user "John".',
    setup: 'Collection: users with document {name: "John", scores: [80, 90, 85]}',
    setupCode: `db.users.insertOne({name: "John", scores: [80, 90, 85]});`,
    expected: { acknowledged: true, modifiedCount: 1 },
    sample: 'db.users.updateOne({name: "John"}, {$set: {"scores.0": 100}})',
    hints: ['Use array index with dot notation', 'Array indices start at 0'],
    validPatterns: [
      /db\.users\.updateOne\s*\(\s*\{\s*name\s*:\s*"John"\s*\}\s*,\s*\{\s*\$set\s*:\s*\{\s*"scores\.0"\s*:\s*100\s*\}\s*\}\s*\)/i,
    ],
    tags: ['update', 'array', 'index'],
  },

  // ============================================================
  // DELETE OPERATIONS (5 problems)
  // ============================================================
  {
    id: 'mongo-delete-001',
    category: 'Delete Operations',
    difficulty: 'easy',
    title: 'Delete Single Document',
    text: 'Delete the user with name "John".',
    setup: 'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25}
]);`,
    expected: { acknowledged: true, deletedCount: 1 },
    sample: 'db.users.deleteOne({name: "John"})',
    hints: ['Use deleteOne() to delete a single document', 'Takes query object as parameter'],
    validPatterns: [/db\.users\.deleteOne\s*\(\s*\{\s*name\s*:\s*"John"\s*\}\s*\)/i],
    tags: ['delete', 'deleteOne', 'crud'],
  },
  {
    id: 'mongo-delete-002',
    category: 'Delete Operations',
    difficulty: 'easy',
    title: 'Delete Multiple Documents',
    text: 'Delete all users where age is less than 25.',
    setup:
      'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 20}, {name: "Bob", age: 22}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 20},
  {name: "Bob", age: 22}
]);`,
    expected: { acknowledged: true, deletedCount: 2 },
    sample: 'db.users.deleteMany({age: {$lt: 25}})',
    hints: [
      'Use deleteMany() to delete multiple documents',
      'Matches all documents meeting criteria',
    ],
    validPatterns: [
      /db\.users\.deleteMany\s*\(\s*\{\s*age\s*:\s*\{\s*\$lt\s*:\s*25\s*\}\s*\}\s*\)/i,
    ],
    tags: ['delete', 'deleteMany'],
  },
  {
    id: 'mongo-delete-003',
    category: 'Delete Operations',
    difficulty: 'easy',
    title: 'Delete All Documents',
    text: 'Delete all documents from the users collection.',
    setup: 'Collection: users with documents {name: "John"}, {name: "Jane"}',
    setupCode: `db.users.insertMany([
  {name: "John"},
  {name: "Jane"}
]);`,
    expected: { acknowledged: true, deletedCount: 2 },
    sample: 'db.users.deleteMany({})',
    hints: ['Use deleteMany() with empty query object', 'Deletes all documents in collection'],
    validPatterns: [/db\.users\.deleteMany\s*\(\s*\{\s*\}\s*\)/i],
    tags: ['delete', 'deleteMany'],
  },
  {
    id: 'mongo-delete-004',
    category: 'Delete Operations',
    difficulty: 'medium',
    title: 'Delete with Multiple Conditions',
    text: 'Delete users where age is greater than 30 OR name equals "Bob".',
    setup:
      'Collection: users with documents {name: "John", age: 35}, {name: "Jane", age: 25}, {name: "Bob", age: 20}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 35},
  {name: "Jane", age: 25},
  {name: "Bob", age: 20}
]);`,
    expected: { acknowledged: true, deletedCount: 2 },
    sample: 'db.users.deleteMany({$or: [{age: {$gt: 30}}, {name: "Bob"}]})',
    hints: ['Use $or operator in delete query', 'Matches documents meeting any condition'],
    validPatterns: [/db\.users\.deleteMany\s*\(\s*\{\s*\$or\s*:/i],
    tags: ['delete', '$or'],
  },
  {
    id: 'mongo-delete-005',
    category: 'Delete Operations',
    difficulty: 'hard',
    title: 'Delete Collection',
    text: 'Drop the entire users collection.',
    setup: 'Collection: users with documents',
    setupCode: `db.users.insertMany([
  {name: "John"},
  {name: "Jane"}
]);`,
    expected: true,
    sample: 'db.users.drop()',
    hints: ['Use drop() to remove entire collection', 'Returns true if successful'],
    validPatterns: [/db\.users\.drop\s*\(\s*\)/i],
    tags: ['delete', 'drop', 'collection'],
  },

  // ============================================================
  // ADVANCED QUERY OPERATORS (10 problems)
  // ============================================================
  {
    id: 'mongo-query-001',
    category: 'Query Operators',
    difficulty: 'medium',
    title: 'Find with $ne Operator',
    text: 'Find all users where age is not equal to 30.',
    setup:
      'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}, {name: "Bob", age: 35}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25},
  {name: "Bob", age: 35}
]);`,
    expected: [
      { name: 'Jane', age: 25 },
      { name: 'Bob', age: 35 },
    ],
    sample: 'db.users.find({age: {$ne: 30}})',
    hints: ['Use $ne for not equal', 'Syntax: {field: {$ne: value}}'],
    validPatterns: [/db\.users\.find\s*\(\s*\{\s*age\s*:\s*\{\s*\$ne\s*:\s*30\s*\}\s*\}\s*\)/i],
    tags: ['find', 'query', '$ne'],
  },
  {
    id: 'mongo-query-002',
    category: 'Query Operators',
    difficulty: 'medium',
    title: 'Find with Range Query',
    text: 'Find all users where age is between 25 and 35 (inclusive).',
    setup:
      'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}, {name: "Bob", age: 20}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25},
  {name: "Bob", age: 20}
]);`,
    expected: [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ],
    sample: 'db.users.find({age: {$gte: 25, $lte: 35}})',
    hints: [
      'Use $gte for greater than or equal',
      'Use $lte for less than or equal',
      'Combine in same object',
    ],
    validPatterns: [
      /db\.users\.find\s*\(\s*\{\s*age\s*:\s*\{\s*\$gte\s*:\s*25\s*,\s*\$lte\s*:\s*35\s*\}\s*\}\s*\)/i,
    ],
    tags: ['find', 'query', '$gte', '$lte'],
  },
  {
    id: 'mongo-query-003',
    category: 'Query Operators',
    difficulty: 'medium',
    title: 'Find with $exists',
    text: 'Find all users that have an email field.',
    setup:
      'Collection: users with documents {name: "John", email: "john@test.com"}, {name: "Jane"}',
    setupCode: `db.users.insertMany([
  {name: "John", email: "john@test.com"},
  {name: "Jane"}
]);`,
    expected: [{ name: 'John', email: 'john@test.com' }],
    sample: 'db.users.find({email: {$exists: true}})',
    hints: [
      'Use $exists to check field presence',
      'true checks field exists, false checks it does not',
    ],
    validPatterns: [
      /db\.users\.find\s*\(\s*\{\s*email\s*:\s*\{\s*\$exists\s*:\s*true\s*\}\s*\}\s*\)/i,
    ],
    tags: ['find', 'query', '$exists'],
  },
  {
    id: 'mongo-query-004',
    category: 'Query Operators',
    difficulty: 'medium',
    title: 'Find with $regex',
    text: 'Find all users where name starts with "J".',
    setup: 'Collection: users with documents {name: "John"}, {name: "Jane"}, {name: "Bob"}',
    setupCode: `db.users.insertMany([
  {name: "John"},
  {name: "Jane"},
  {name: "Bob"}
]);`,
    expected: [{ name: 'John' }, { name: 'Jane' }],
    sample: 'db.users.find({name: {$regex: /^J/}})',
    hints: [
      'Use $regex for pattern matching',
      '^ means start of string',
      'Can use regex literal or string',
    ],
    validPatterns: [/db\.users\.find\s*\(\s*\{\s*name\s*:\s*\{\s*\$regex\s*:/i],
    tags: ['find', 'query', '$regex'],
  },
  {
    id: 'mongo-query-005',
    category: 'Query Operators',
    difficulty: 'medium',
    title: 'Find with $nin',
    text: 'Find all users where age is not in [20, 25].',
    setup:
      'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}, {name: "Bob", age: 20}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25},
  {name: "Bob", age: 20}
]);`,
    expected: [{ name: 'John', age: 30 }],
    sample: 'db.users.find({age: {$nin: [20, 25]}})',
    hints: ['Use $nin for not in', 'Opposite of $in operator'],
    validPatterns: [/db\.users\.find\s*\(\s*\{\s*age\s*:\s*\{\s*\$nin\s*:\s*\[/i],
    tags: ['find', 'query', '$nin'],
  },
  {
    id: 'mongo-query-006',
    category: 'Query Operators',
    difficulty: 'hard',
    title: 'Find with $all',
    text: 'Find all users where hobbies array contains both "reading" and "coding".',
    setup:
      'Collection: users with documents {name: "John", hobbies: ["reading", "coding", "music"]}, {name: "Jane", hobbies: ["reading"]}',
    setupCode: `db.users.insertMany([
  {name: "John", hobbies: ["reading", "coding", "music"]},
  {name: "Jane", hobbies: ["reading"]}
]);`,
    expected: [{ name: 'John', hobbies: ['reading', 'coding', 'music'] }],
    sample: 'db.users.find({hobbies: {$all: ["reading", "coding"]}})',
    hints: [
      'Use $all to match arrays containing all specified values',
      'Array must contain all values in $all',
    ],
    validPatterns: [/db\.users\.find\s*\(\s*\{\s*hobbies\s*:\s*\{\s*\$all\s*:\s*\[/i],
    tags: ['find', 'query', '$all', 'array'],
  },
  {
    id: 'mongo-query-007',
    category: 'Query Operators',
    difficulty: 'medium',
    title: 'Find with $size',
    text: 'Find all users where hobbies array has exactly 3 elements.',
    setup:
      'Collection: users with documents {name: "John", hobbies: ["reading", "coding", "music"]}, {name: "Jane", hobbies: ["reading"]}',
    setupCode: `db.users.insertMany([
  {name: "John", hobbies: ["reading", "coding", "music"]},
  {name: "Jane", hobbies: ["reading"]}
]);`,
    expected: [{ name: 'John', hobbies: ['reading', 'coding', 'music'] }],
    sample: 'db.users.find({hobbies: {$size: 3}})',
    hints: ['Use $size to match array length', 'Must match exact size'],
    validPatterns: [
      /db\.users\.find\s*\(\s*\{\s*hobbies\s*:\s*\{\s*\$size\s*:\s*3\s*\}\s*\}\s*\)/i,
    ],
    tags: ['find', 'query', '$size', 'array'],
  },
  {
    id: 'mongo-query-008',
    category: 'Query Operators',
    difficulty: 'hard',
    title: 'Find with $elemMatch',
    text: 'Find all users where scores array contains an element greater than 90.',
    setup:
      'Collection: users with documents {name: "John", scores: [80, 95, 85]}, {name: "Jane", scores: [70, 75, 80]}',
    setupCode: `db.users.insertMany([
  {name: "John", scores: [80, 95, 85]},
  {name: "Jane", scores: [70, 75, 80]}
]);`,
    expected: [{ name: 'John', scores: [80, 95, 85] }],
    sample: 'db.users.find({scores: {$elemMatch: {$gt: 90}}})',
    hints: [
      'Use $elemMatch to query array elements',
      'Matches if at least one element meets criteria',
    ],
    validPatterns: [/db\.users\.find\s*\(\s*\{\s*scores\s*:\s*\{\s*\$elemMatch\s*:/i],
    tags: ['find', 'query', '$elemMatch', 'array'],
  },
  {
    id: 'mongo-query-009',
    category: 'Query Operators',
    difficulty: 'medium',
    title: 'Find with $type',
    text: 'Find all users where age field is a number type.',
    setup: 'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: "25"}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: "25"}
]);`,
    expected: [{ name: 'John', age: 30 }],
    sample: 'db.users.find({age: {$type: "number"}})',
    hints: [
      'Use $type to match by BSON type',
      'Common types: "number", "string", "object", "array"',
    ],
    validPatterns: [/db\.users\.find\s*\(\s*\{\s*age\s*:\s*\{\s*\$type\s*:/i],
    tags: ['find', 'query', '$type'],
  },
  {
    id: 'mongo-query-010',
    category: 'Query Operators',
    difficulty: 'hard',
    title: 'Find with $not',
    text: 'Find all users where age is not greater than 30.',
    setup:
      'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}, {name: "Bob", age: 35}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25},
  {name: "Bob", age: 35}
]);`,
    expected: [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ],
    sample: 'db.users.find({age: {$not: {$gt: 30}}})',
    hints: ['Use $not to negate a condition', 'Wraps another query operator'],
    validPatterns: [/db\.users\.find\s*\(\s*\{\s*age\s*:\s*\{\s*\$not\s*:/i],
    tags: ['find', 'query', '$not'],
  },

  // ============================================================
  // AGGREGATION PIPELINE (15 problems)
  // ============================================================
  {
    id: 'mongo-agg-001',
    category: 'Aggregation Pipeline',
    difficulty: 'easy',
    title: 'Basic $match Stage',
    text: 'Use aggregation to find all users where age is greater than 25.',
    setup:
      'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}, {name: "Bob", age: 20}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25},
  {name: "Bob", age: 20}
]);`,
    expected: [{ name: 'John', age: 30 }],
    sample: 'db.users.aggregate([{$match: {age: {$gt: 25}}}])',
    hints: ['Use aggregate() with pipeline array', '$match filters documents like find()'],
    validPatterns: [/db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$match\s*:/i],
    tags: ['aggregation', '$match'],
  },
  {
    id: 'mongo-agg-002',
    category: 'Aggregation Pipeline',
    difficulty: 'easy',
    title: 'Basic $project Stage',
    text: 'Use aggregation to return only name field from users.',
    setup: 'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25}
]);`,
    expected: [{ name: 'John' }, { name: 'Jane' }],
    sample: 'db.users.aggregate([{$project: {name: 1, _id: 0}}])',
    hints: ['Use $project to reshape documents', '1 to include, 0 to exclude fields'],
    validPatterns: [/db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$project\s*:/i],
    tags: ['aggregation', '$project'],
  },
  {
    id: 'mongo-agg-003',
    category: 'Aggregation Pipeline',
    difficulty: 'easy',
    title: 'Basic $group Stage',
    text: 'Group users by age and count how many in each group.',
    setup:
      'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 30}, {name: "Bob", age: 25}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 30},
  {name: "Bob", age: 25}
]);`,
    expected: [
      { _id: 30, count: 2 },
      { _id: 25, count: 1 },
    ],
    sample: 'db.users.aggregate([{$group: {_id: "$age", count: {$sum: 1}}}])',
    hints: ['Use $group to group documents', '_id is the grouping field', 'Use $sum to count'],
    validPatterns: [/db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$group\s*:/i, /\$sum\s*:\s*1/i],
    tags: ['aggregation', '$group', '$sum'],
  },
  {
    id: 'mongo-agg-004',
    category: 'Aggregation Pipeline',
    difficulty: 'medium',
    title: 'Aggregation with $sort',
    text: 'Find all users, project name and age, then sort by age descending.',
    setup: 'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25}
]);`,
    expected: [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ],
    sample: 'db.users.aggregate([{$project: {name: 1, age: 1, _id: 0}}, {$sort: {age: -1}}])',
    hints: ['Chain multiple stages in pipeline', '$sort uses -1 for descending, 1 for ascending'],
    validPatterns: [
      /db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$project\s*:/i,
      /\{\s*\$sort\s*:\s*\{\s*age\s*:\s*-1\s*\}\s*\}/i,
    ],
    tags: ['aggregation', '$sort'],
  },
  {
    id: 'mongo-agg-005',
    category: 'Aggregation Pipeline',
    difficulty: 'medium',
    title: 'Aggregation with $limit',
    text: 'Find all users, sort by age descending, and return only the top 2.',
    setup:
      'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}, {name: "Bob", age: 35}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25},
  {name: "Bob", age: 35}
]);`,
    expected: [
      { name: 'Bob', age: 35 },
      { name: 'John', age: 30 },
    ],
    sample: 'db.users.aggregate([{$sort: {age: -1}}, {$limit: 2}])',
    hints: ['Use $limit to restrict results', 'Place after $sort to get top N'],
    validPatterns: [
      /db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$sort\s*:/i,
      /\{\s*\$limit\s*:\s*2\s*\}/i,
    ],
    tags: ['aggregation', '$limit'],
  },
  {
    id: 'mongo-agg-006',
    category: 'Aggregation Pipeline',
    difficulty: 'medium',
    title: 'Aggregation with $sum',
    text: 'Calculate the total age of all users.',
    setup: 'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25}
]);`,
    expected: [{ totalAge: 55 }],
    sample: 'db.users.aggregate([{$group: {_id: null, totalAge: {$sum: "$age"}}}])',
    hints: ['Use _id: null to group all documents', '$sum can sum field values'],
    validPatterns: [
      /db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$group\s*:\s*\{\s*_id\s*:\s*null/i,
      /\$sum\s*:\s*"\$age"/i,
    ],
    tags: ['aggregation', '$group', '$sum'],
  },
  {
    id: 'mongo-agg-007',
    category: 'Aggregation Pipeline',
    difficulty: 'medium',
    title: 'Aggregation with $avg',
    text: 'Calculate the average age of all users.',
    setup:
      'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}, {name: "Bob", age: 35}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25},
  {name: "Bob", age: 35}
]);`,
    expected: [{ avgAge: 30 }],
    sample: 'db.users.aggregate([{$group: {_id: null, avgAge: {$avg: "$age"}}}])',
    hints: ['Use $avg to calculate average', 'Groups all documents with _id: null'],
    validPatterns: [
      /db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$group\s*:\s*\{\s*_id\s*:\s*null/i,
      /\$avg\s*:\s*"\$age"/i,
    ],
    tags: ['aggregation', '$group', '$avg'],
  },
  {
    id: 'mongo-agg-008',
    category: 'Aggregation Pipeline',
    difficulty: 'medium',
    title: 'Aggregation with $min and $max',
    text: 'Find the minimum and maximum age of all users.',
    setup:
      'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}, {name: "Bob", age: 35}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25},
  {name: "Bob", age: 35}
]);`,
    expected: [{ minAge: 25, maxAge: 35 }],
    sample:
      'db.users.aggregate([{$group: {_id: null, minAge: {$min: "$age"}, maxAge: {$max: "$age"}}}])',
    hints: ['Use $min to find minimum value', 'Use $max to find maximum value'],
    validPatterns: [
      /db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$group\s*:/i,
      /\$min\s*:\s*"\$age"/i,
      /\$max\s*:\s*"\$age"/i,
    ],
    tags: ['aggregation', '$group', '$min', '$max'],
  },
  {
    id: 'mongo-agg-009',
    category: 'Aggregation Pipeline',
    difficulty: 'hard',
    title: 'Aggregation with $lookup',
    text: 'Join users with orders collection to get user orders.',
    setup: 'Collections: users {_id: 1, name: "John"}, orders {userId: 1, product: "Book"}',
    setupCode: `db.users.insertOne({_id: 1, name: "John"});
db.orders.insertOne({userId: 1, product: "Book"});`,
    expected: [{ _id: 1, name: 'John', orders: [{ userId: 1, product: 'Book' }] }],
    sample:
      'db.users.aggregate([{$lookup: {from: "orders", localField: "_id", foreignField: "userId", as: "orders"}}])',
    hints: [
      'Use $lookup to join collections',
      'from: source collection, localField/foreignField: join keys, as: output array',
    ],
    validPatterns: [/db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$lookup\s*:/i, /from\s*:\s*"orders"/i],
    tags: ['aggregation', '$lookup', 'join'],
  },
  {
    id: 'mongo-agg-010',
    category: 'Aggregation Pipeline',
    difficulty: 'hard',
    title: 'Aggregation with $unwind',
    text: 'Unwind the hobbies array to create one document per hobby.',
    setup: 'Collection: users with document {name: "John", hobbies: ["reading", "coding"]}',
    setupCode: `db.users.insertOne({name: "John", hobbies: ["reading", "coding"]});`,
    expected: [
      { name: 'John', hobbies: 'reading' },
      { name: 'John', hobbies: 'coding' },
    ],
    sample: 'db.users.aggregate([{$unwind: "$hobbies"}])',
    hints: ['Use $unwind to deconstruct array', 'Creates one document per array element'],
    validPatterns: [
      /db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$unwind\s*:\s*"\$hobbies"\s*\}\s*\]\s*\)/i,
    ],
    tags: ['aggregation', '$unwind', 'array'],
  },
  {
    id: 'mongo-agg-011',
    category: 'Aggregation Pipeline',
    difficulty: 'hard',
    title: 'Aggregation with $addFields',
    text: 'Add a new field "isAdult" that is true if age >= 18.',
    setup: 'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 16}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 16}
]);`,
    expected: [
      { name: 'John', age: 30, isAdult: true },
      { name: 'Jane', age: 16, isAdult: false },
    ],
    sample: 'db.users.aggregate([{$addFields: {isAdult: {$gte: ["$age", 18]}}}])',
    hints: ['Use $addFields to add computed fields', 'Use $gte in expression to compare'],
    validPatterns: [/db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$addFields\s*:/i],
    tags: ['aggregation', '$addFields'],
  },
  {
    id: 'mongo-agg-012',
    category: 'Aggregation Pipeline',
    difficulty: 'hard',
    title: 'Aggregation with $cond',
    text: 'Add a "status" field: "senior" if age >= 65, "adult" if age >= 18, else "minor".',
    setup:
      'Collection: users with documents {name: "John", age: 70}, {name: "Jane", age: 25}, {name: "Bob", age: 15}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 70},
  {name: "Jane", age: 25},
  {name: "Bob", age: 15}
]);`,
    expected: [
      { name: 'John', age: 70, status: 'senior' },
      { name: 'Jane', age: 25, status: 'adult' },
      { name: 'Bob', age: 15, status: 'minor' },
    ],
    sample:
      'db.users.aggregate([{$addFields: {status: {$cond: {if: {$gte: ["$age", 65]}, then: "senior", else: {$cond: {if: {$gte: ["$age", 18]}, then: "adult", else: "minor"}}}}}}])',
    hints: [
      'Use $cond for conditional logic',
      'Nest $cond for multiple conditions',
      'if/then/else structure',
    ],
    validPatterns: [/db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$addFields\s*:/i, /\$cond\s*:/i],
    tags: ['aggregation', '$cond', '$addFields'],
  },
  {
    id: 'mongo-agg-013',
    category: 'Aggregation Pipeline',
    difficulty: 'medium',
    title: 'Aggregation with $count',
    text: 'Count how many users have age greater than 25.',
    setup:
      'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}, {name: "Bob", age: 20}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25},
  {name: "Bob", age: 20}
]);`,
    expected: [{ count: 1 }],
    sample: 'db.users.aggregate([{$match: {age: {$gt: 25}}}, {$count: "count"}])',
    hints: ['Use $count to count documents', 'Place after $match to count filtered results'],
    validPatterns: [
      /db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$match\s*:/i,
      /\{\s*\$count\s*:\s*"count"\s*\}/i,
    ],
    tags: ['aggregation', '$count'],
  },
  {
    id: 'mongo-agg-014',
    category: 'Aggregation Pipeline',
    difficulty: 'hard',
    title: 'Aggregation with $facet',
    text: 'Use $facet to get both count and average age in one aggregation.',
    setup: 'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25}
]);`,
    expected: [{ total: [{ count: 2 }], stats: [{ avgAge: 27.5 }] }],
    sample:
      'db.users.aggregate([{$facet: {total: [{$count: "count"}], stats: [{$group: {_id: null, avgAge: {$avg: "$age"}}}]}}])',
    hints: ['Use $facet to run multiple pipelines', 'Each key runs independent pipeline'],
    validPatterns: [/db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$facet\s*:/i],
    tags: ['aggregation', '$facet'],
  },
  {
    id: 'mongo-agg-015',
    category: 'Aggregation Pipeline',
    difficulty: 'hard',
    title: 'Aggregation with $group and $push',
    text: 'Group users by age and collect all names in each group.',
    setup:
      'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 30}, {name: "Bob", age: 25}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 30},
  {name: "Bob", age: 25}
]);`,
    expected: [
      { _id: 30, names: ['John', 'Jane'] },
      { _id: 25, names: ['Bob'] },
    ],
    sample: 'db.users.aggregate([{$group: {_id: "$age", names: {$push: "$name"}}}])',
    hints: ['Use $push to collect values into array', 'Groups documents and pushes field values'],
    validPatterns: [/db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$group\s*:/i, /\$push\s*:\s*"\$name"/i],
    tags: ['aggregation', '$group', '$push'],
  },

  // ============================================================
  // ARRAY QUERY OPERATORS (10 problems)
  // ============================================================
  {
    id: 'mongo-array-001',
    category: 'Array Operations',
    difficulty: 'easy',
    title: 'Find Document with Array Element',
    text: 'Find all users where hobbies array contains "reading".',
    setup:
      'Collection: users with documents {name: "John", hobbies: ["reading", "coding"]}, {name: "Jane", hobbies: ["music"]}',
    setupCode: `db.users.insertMany([
  {name: "John", hobbies: ["reading", "coding"]},
  {name: "Jane", hobbies: ["music"]}
]);`,
    expected: [{ name: 'John', hobbies: ['reading', 'coding'] }],
    sample: 'db.users.find({hobbies: "reading"})',
    hints: ['Query array field directly with value', 'Matches if array contains the value'],
    validPatterns: [/db\.users\.find\s*\(\s*\{\s*hobbies\s*:\s*"reading"\s*\}\s*\)/i],
    tags: ['find', 'array', 'query'],
  },
  {
    id: 'mongo-array-002',
    category: 'Array Operations',
    difficulty: 'medium',
    title: 'Find with Array Index',
    text: 'Find all users where the first element in hobbies array is "reading".',
    setup:
      'Collection: users with documents {name: "John", hobbies: ["reading", "coding"]}, {name: "Jane", hobbies: ["music", "reading"]}',
    setupCode: `db.users.insertMany([
  {name: "John", hobbies: ["reading", "coding"]},
  {name: "Jane", hobbies: ["music", "reading"]}
]);`,
    expected: [{ name: 'John', hobbies: ['reading', 'coding'] }],
    sample: 'db.users.find({"hobbies.0": "reading"})',
    hints: ['Use dot notation with index to query array element', 'Array indices start at 0'],
    validPatterns: [/db\.users\.find\s*\(\s*\{\s*"hobbies\.0"\s*:\s*"reading"\s*\}\s*\)/i],
    tags: ['find', 'array', 'index'],
  },
  {
    id: 'mongo-array-003',
    category: 'Array Operations',
    difficulty: 'medium',
    title: 'Find with $all Operator',
    text: 'Find all users where hobbies array contains both "reading" and "coding".',
    setup:
      'Collection: users with documents {name: "John", hobbies: ["reading", "coding", "music"]}, {name: "Jane", hobbies: ["reading"]}',
    setupCode: `db.users.insertMany([
  {name: "John", hobbies: ["reading", "coding", "music"]},
  {name: "Jane", hobbies: ["reading"]}
]);`,
    expected: [{ name: 'John', hobbies: ['reading', 'coding', 'music'] }],
    sample: 'db.users.find({hobbies: {$all: ["reading", "coding"]}})',
    hints: [
      'Use $all to match arrays containing all specified values',
      'All values must be present',
    ],
    validPatterns: [/db\.users\.find\s*\(\s*\{\s*hobbies\s*:\s*\{\s*\$all\s*:\s*\[/i],
    tags: ['find', 'array', '$all'],
  },
  {
    id: 'mongo-array-004',
    category: 'Array Operations',
    difficulty: 'medium',
    title: 'Update Array with $push',
    text: 'Add "swimming" to the end of hobbies array for user "John".',
    setup: 'Collection: users with document {name: "John", hobbies: ["reading", "coding"]}',
    setupCode: `db.users.insertOne({name: "John", hobbies: ["reading", "coding"]});`,
    expected: { acknowledged: true, modifiedCount: 1 },
    sample: 'db.users.updateOne({name: "John"}, {$push: {hobbies: "swimming"}})',
    hints: ['Use $push to add element to end of array', 'Adds single value or entire array'],
    validPatterns: [
      /db\.users\.updateOne\s*\(\s*\{\s*name\s*:\s*"John"\s*\}\s*,\s*\{\s*\$push\s*:\s*\{\s*hobbies\s*:\s*"swimming"\s*\}\s*\}\s*\)/i,
    ],
    tags: ['update', 'array', '$push'],
  },
  {
    id: 'mongo-array-005',
    category: 'Array Operations',
    difficulty: 'medium',
    title: 'Update Array with $pull',
    text: 'Remove "coding" from hobbies array for user "John".',
    setup:
      'Collection: users with document {name: "John", hobbies: ["reading", "coding", "music"]}',
    setupCode: `db.users.insertOne({name: "John", hobbies: ["reading", "coding", "music"]});`,
    expected: { acknowledged: true, modifiedCount: 1 },
    sample: 'db.users.updateOne({name: "John"}, {$pull: {hobbies: "coding"}})',
    hints: ['Use $pull to remove matching elements', 'Removes all occurrences of value'],
    validPatterns: [
      /db\.users\.updateOne\s*\(\s*\{\s*name\s*:\s*"John"\s*\}\s*,\s*\{\s*\$pull\s*:\s*\{\s*hobbies\s*:\s*"coding"\s*\}\s*\}\s*\)/i,
    ],
    tags: ['update', 'array', '$pull'],
  },
  {
    id: 'mongo-array-006',
    category: 'Array Operations',
    difficulty: 'medium',
    title: 'Update Array with $addToSet',
    text: 'Add "swimming" to hobbies array only if it does not already exist.',
    setup: 'Collection: users with document {name: "John", hobbies: ["reading", "coding"]}',
    setupCode: `db.users.insertOne({name: "John", hobbies: ["reading", "coding"]});`,
    expected: { acknowledged: true, modifiedCount: 1 },
    sample: 'db.users.updateOne({name: "John"}, {$addToSet: {hobbies: "swimming"}})',
    hints: ['Use $addToSet to add only if not exists', 'Prevents duplicate values'],
    validPatterns: [
      /db\.users\.updateOne\s*\(\s*\{\s*name\s*:\s*"John"\s*\}\s*,\s*\{\s*\$addToSet\s*:\s*\{\s*hobbies\s*:\s*"swimming"\s*\}\s*\}\s*\)/i,
    ],
    tags: ['update', 'array', '$addToSet'],
  },
  {
    id: 'mongo-array-007',
    category: 'Array Operations',
    difficulty: 'hard',
    title: 'Update Array Element by Index',
    text: 'Update the second element (index 1) in scores array to 100 for user "John".',
    setup: 'Collection: users with document {name: "John", scores: [80, 90, 85]}',
    setupCode: `db.users.insertOne({name: "John", scores: [80, 90, 85]});`,
    expected: { acknowledged: true, modifiedCount: 1 },
    sample: 'db.users.updateOne({name: "John"}, {$set: {"scores.1": 100}})',
    hints: ['Use dot notation with index to update array element', 'Array indices start at 0'],
    validPatterns: [
      /db\.users\.updateOne\s*\(\s*\{\s*name\s*:\s*"John"\s*\}\s*,\s*\{\s*\$set\s*:\s*\{\s*"scores\.1"\s*:\s*100\s*\}\s*\}\s*\)/i,
    ],
    tags: ['update', 'array', 'index'],
  },
  {
    id: 'mongo-array-008',
    category: 'Array Operations',
    difficulty: 'hard',
    title: 'Update Array with $pop',
    text: 'Remove the last element from hobbies array for user "John".',
    setup:
      'Collection: users with document {name: "John", hobbies: ["reading", "coding", "music"]}',
    setupCode: `db.users.insertOne({name: "John", hobbies: ["reading", "coding", "music"]});`,
    expected: { acknowledged: true, modifiedCount: 1 },
    sample: 'db.users.updateOne({name: "John"}, {$pop: {hobbies: 1}})',
    hints: [
      'Use $pop to remove first (1) or last (-1) element',
      '1 removes last, -1 removes first',
    ],
    validPatterns: [
      /db\.users\.updateOne\s*\(\s*\{\s*name\s*:\s*"John"\s*\}\s*,\s*\{\s*\$pop\s*:\s*\{\s*hobbies\s*:\s*1\s*\}\s*\}\s*\)/i,
    ],
    tags: ['update', 'array', '$pop'],
  },
  {
    id: 'mongo-array-009',
    category: 'Array Operations',
    difficulty: 'hard',
    title: 'Update Array with $pullAll',
    text: 'Remove both "reading" and "coding" from hobbies array for user "John".',
    setup:
      'Collection: users with document {name: "John", hobbies: ["reading", "coding", "music", "reading"]}',
    setupCode: `db.users.insertOne({name: "John", hobbies: ["reading", "coding", "music", "reading"]});`,
    expected: { acknowledged: true, modifiedCount: 1 },
    sample: 'db.users.updateOne({name: "John"}, {$pullAll: {hobbies: ["reading", "coding"]}})',
    hints: [
      'Use $pullAll to remove multiple values',
      'Removes all occurrences of all values in array',
    ],
    validPatterns: [
      /db\.users\.updateOne\s*\(\s*\{\s*name\s*:\s*"John"\s*\}\s*,\s*\{\s*\$pullAll\s*:\s*\{\s*hobbies\s*:\s*\[/i,
    ],
    tags: ['update', 'array', '$pullAll'],
  },
  {
    id: 'mongo-array-010',
    category: 'Array Operations',
    difficulty: 'hard',
    title: 'Query Nested Array Elements',
    text: 'Find all users where scores array contains an element greater than 90.',
    setup:
      'Collection: users with documents {name: "John", scores: [80, 95, 85]}, {name: "Jane", scores: [70, 75, 80]}',
    setupCode: `db.users.insertMany([
  {name: "John", scores: [80, 95, 85]},
  {name: "Jane", scores: [70, 75, 80]}
]);`,
    expected: [{ name: 'John', scores: [80, 95, 85] }],
    sample: 'db.users.find({scores: {$elemMatch: {$gt: 90}}})',
    hints: [
      'Use $elemMatch to query array elements',
      'Matches if at least one element meets criteria',
    ],
    validPatterns: [/db\.users\.find\s*\(\s*\{\s*scores\s*:\s*\{\s*\$elemMatch\s*:/i],
    tags: ['find', 'array', '$elemMatch'],
  },

  // ============================================================
  // TEXT SEARCH (5 problems)
  // ============================================================
  {
    id: 'mongo-text-001',
    category: 'Text Search',
    difficulty: 'medium',
    title: 'Create Text Index',
    text: 'Create a text index on the name field of users collection.',
    setup: 'Collection: users',
    setupCode: 'db.users.insertOne({name: "John"});',
    expected: 'Text index created',
    sample: 'db.users.createIndex({name: "text"})',
    hints: ['Use createIndex() to create index', 'Use "text" as value for text index'],
    validPatterns: [/db\.users\.createIndex\s*\(\s*\{\s*name\s*:\s*"text"\s*\}\s*\)/i],
    tags: ['index', 'text', 'createIndex'],
  },
  {
    id: 'mongo-text-002',
    category: 'Text Search',
    difficulty: 'medium',
    title: 'Text Search Query',
    text: 'Search for users where name field contains "John".',
    setup: 'Collection: users with text index on name, documents {name: "John"}, {name: "Jane"}',
    setupCode: `db.users.createIndex({name: "text"});
db.users.insertMany([
  {name: "John"},
  {name: "Jane"}
]);`,
    expected: [{ name: 'John' }],
    sample: 'db.users.find({$text: {$search: "John"}})',
    hints: ['Use $text operator for text search', '$search contains search terms'],
    validPatterns: [
      /db\.users\.find\s*\(\s*\{\s*\$text\s*:\s*\{\s*\$search\s*:\s*"John"\s*\}\s*\}\s*\)/i,
    ],
    tags: ['find', 'text', '$text'],
  },
  {
    id: 'mongo-text-003',
    category: 'Text Search',
    difficulty: 'hard',
    title: 'Text Search with Score',
    text: 'Search for "John" and return documents with text score.',
    setup: 'Collection: users with text index on name, document {name: "John"}',
    setupCode: `db.users.createIndex({name: "text"});
db.users.insertOne({name: "John"});`,
    expected: 'Document with text score',
    sample: 'db.users.find({$text: {$search: "John"}}, {score: {$meta: "textScore"}})',
    hints: ['Use $meta to include text score', 'Score indicates relevance'],
    validPatterns: [/db\.users\.find\s*\(\s*\{\s*\$text\s*:/i, /\$meta\s*:\s*"textScore"/i],
    tags: ['find', 'text', '$meta'],
  },
  {
    id: 'mongo-text-004',
    category: 'Text Search',
    difficulty: 'hard',
    title: 'Text Search with Multiple Fields',
    text: 'Create a text index on both name and description fields.',
    setup: 'Collection: users',
    setupCode: 'db.users.insertOne({name: "John", description: "Developer"});',
    expected: 'Text index created on multiple fields',
    sample: 'db.users.createIndex({name: "text", description: "text"})',
    hints: ['Include multiple fields in index object', 'All fields use "text" value'],
    validPatterns: [
      /db\.users\.createIndex\s*\(\s*\{\s*name\s*:\s*"text"\s*,\s*description\s*:\s*"text"\s*\}\s*\)/i,
    ],
    tags: ['index', 'text', 'multiple-fields'],
  },
  {
    id: 'mongo-text-005',
    category: 'Text Search',
    difficulty: 'hard',
    title: 'Text Search Exclude Term',
    text: 'Search for documents containing "John" but not "Jane".',
    setup:
      'Collection: users with text index, documents {name: "John"}, {name: "Jane"}, {name: "John Jane"}',
    setupCode: `db.users.createIndex({name: "text"});
db.users.insertMany([
  {name: "John"},
  {name: "Jane"},
  {name: "John Jane"}
]);`,
    expected: [{ name: 'John' }],
    sample: 'db.users.find({$text: {$search: "John -Jane"}})',
    hints: ['Use minus sign to exclude terms', 'Syntax: "term1 -term2"'],
    validPatterns: [/db\.users\.find\s*\(\s*\{\s*\$text\s*:\s*\{\s*\$search\s*:\s*"John\s+-Jane"/i],
    tags: ['find', 'text', 'exclude'],
  },

  // ============================================================
  // INDEX OPERATIONS (5 problems)
  // ============================================================
  {
    id: 'mongo-index-001',
    category: 'Index Operations',
    difficulty: 'easy',
    title: 'Create Single Field Index',
    text: 'Create an index on the age field of users collection.',
    setup: 'Collection: users',
    setupCode: 'db.users.insertOne({name: "John", age: 30});',
    expected: 'Index created',
    sample: 'db.users.createIndex({age: 1})',
    hints: ['Use createIndex() to create index', '1 for ascending, -1 for descending'],
    validPatterns: [/db\.users\.createIndex\s*\(\s*\{\s*age\s*:\s*1\s*\}\s*\)/i],
    tags: ['index', 'createIndex'],
  },
  {
    id: 'mongo-index-002',
    category: 'Index Operations',
    difficulty: 'easy',
    title: 'Create Compound Index',
    text: 'Create a compound index on name (ascending) and age (descending).',
    setup: 'Collection: users',
    setupCode: 'db.users.insertOne({name: "John", age: 30});',
    expected: 'Compound index created',
    sample: 'db.users.createIndex({name: 1, age: -1})',
    hints: ['Include multiple fields in index', 'Order matters for compound indexes'],
    validPatterns: [
      /db\.users\.createIndex\s*\(\s*\{\s*name\s*:\s*1\s*,\s*age\s*:\s*-1\s*\}\s*\)/i,
    ],
    tags: ['index', 'compound', 'createIndex'],
  },
  {
    id: 'mongo-index-003',
    category: 'Index Operations',
    difficulty: 'medium',
    title: 'List All Indexes',
    text: 'List all indexes on the users collection.',
    setup: 'Collection: users with indexes',
    setupCode: 'db.users.createIndex({name: 1});',
    expected: [
      { v: 2, key: { _id: 1 }, name: '_id_' },
      { v: 2, key: { name: 1 }, name: 'name_1' },
    ],
    sample: 'db.users.getIndexes()',
    hints: ['Use getIndexes() to list all indexes', 'Returns array of index definitions'],
    validPatterns: [/db\.users\.getIndexes\s*\(\s*\)/i],
    tags: ['index', 'getIndexes'],
  },
  {
    id: 'mongo-index-004',
    category: 'Index Operations',
    difficulty: 'medium',
    title: 'Drop Index',
    text: 'Drop the index on the age field.',
    setup: 'Collection: users with index on age',
    setupCode: 'db.users.createIndex({age: 1});',
    expected: { nIndexesWas: 2, ok: 1 },
    sample: 'db.users.dropIndex({age: 1})',
    hints: ['Use dropIndex() to remove index', 'Pass index specification or name'],
    validPatterns: [/db\.users\.dropIndex\s*\(\s*\{\s*age\s*:\s*1\s*\}\s*\)/i],
    tags: ['index', 'dropIndex'],
  },
  {
    id: 'mongo-index-005',
    category: 'Index Operations',
    difficulty: 'hard',
    title: 'Create Unique Index',
    text: 'Create a unique index on the email field.',
    setup: 'Collection: users',
    setupCode: 'db.users.insertOne({name: "John", email: "john@test.com"});',
    expected: 'Unique index created',
    sample: 'db.users.createIndex({email: 1}, {unique: true})',
    hints: ['Use options object as second parameter', 'Set unique: true for unique constraint'],
    validPatterns: [
      /db\.users\.createIndex\s*\(\s*\{\s*email\s*:\s*1\s*\}\s*,\s*\{\s*unique\s*:\s*true\s*\}\s*\)/i,
    ],
    tags: ['index', 'unique', 'createIndex'],
  },

  // ============================================================
  // GEOSPATIAL QUERIES (10 problems)
  // ============================================================
  {
    id: 'mongo-geo-001',
    category: 'Geospatial Queries',
    difficulty: 'medium',
    title: 'Create 2dsphere Index',
    text: 'Create a 2dsphere index on the location field of users collection.',
    setup: 'Collection: users',
    setupCode:
      'db.users.insertOne({name: "John", location: {type: "Point", coordinates: [-73.97, 40.77]});',
    expected: '2dsphere index created',
    sample: 'db.users.createIndex({location: "2dsphere"})',
    hints: ['Use "2dsphere" for geospatial index', 'Required for geospatial queries'],
    validPatterns: [/db\.users\.createIndex\s*\(\s*\{\s*location\s*:\s*"2dsphere"\s*\}\s*\)/i],
    tags: ['index', 'geospatial', '2dsphere'],
  },
  {
    id: 'mongo-geo-002',
    category: 'Geospatial Queries',
    difficulty: 'medium',
    title: 'Find Near Location',
    text: 'Find all users within 1000 meters of coordinates [-73.97, 40.77].',
    setup:
      'Collection: users with 2dsphere index, document {name: "John", location: {type: "Point", coordinates: [-73.97, 40.77]}}',
    setupCode: `db.users.createIndex({location: "2dsphere"});
db.users.insertOne({name: "John", location: {type: "Point", coordinates: [-73.97, 40.77]}});`,
    expected: [{ name: 'John', location: { type: 'Point', coordinates: [-73.97, 40.77] } }],
    sample:
      'db.users.find({location: {$near: {$geometry: {type: "Point", coordinates: [-73.97, 40.77]}, $maxDistance: 1000}}})',
    hints: [
      'Use $near for proximity search',
      '$geometry specifies center point',
      '$maxDistance in meters',
    ],
    validPatterns: [/db\.users\.find\s*\(\s*\{\s*location\s*:\s*\{\s*\$near\s*:/i],
    tags: ['find', 'geospatial', '$near'],
  },
  {
    id: 'mongo-geo-003',
    category: 'Geospatial Queries',
    difficulty: 'hard',
    title: 'Find Within Polygon',
    text: 'Find all users within a specified polygon area.',
    setup: 'Collection: users with 2dsphere index',
    setupCode: `db.users.createIndex({location: "2dsphere"});
db.users.insertOne({name: "John", location: {type: "Point", coordinates: [-73.97, 40.77]}});`,
    expected: [{ name: 'John', location: { type: 'Point', coordinates: [-73.97, 40.77] } }],
    sample:
      'db.users.find({location: {$geoWithin: {$geometry: {type: "Polygon", coordinates: [[[-74, 40], [-73, 40], [-73, 41], [-74, 41], [-74, 40]]]}}}}})',
    hints: [
      'Use $geoWithin to find points inside geometry',
      'Polygon coordinates must form closed ring',
    ],
    validPatterns: [/db\.users\.find\s*\(\s*\{\s*location\s*:\s*\{\s*\$geoWithin\s*:/i],
    tags: ['find', 'geospatial', '$geoWithin'],
  },
  {
    id: 'mongo-geo-004',
    category: 'Geospatial Queries',
    difficulty: 'hard',
    title: 'Find Intersecting Geometry',
    text: 'Find all users whose location intersects with a specified line.',
    setup: 'Collection: users with 2dsphere index',
    setupCode: `db.users.createIndex({location: "2dsphere"});
db.users.insertOne({name: "John", location: {type: "Point", coordinates: [-73.97, 40.77]}});`,
    expected: [{ name: 'John', location: { type: 'Point', coordinates: [-73.97, 40.77] } }],
    sample:
      'db.users.find({location: {$geoIntersects: {$geometry: {type: "LineString", coordinates: [[-74, 40], [-73, 41]]}}}}})',
    hints: ['Use $geoIntersects to find geometries that intersect', 'Works with any geometry type'],
    validPatterns: [/db\.users\.find\s*\(\s*\{\s*location\s*:\s*\{\s*\$geoIntersects\s*:/i],
    tags: ['find', 'geospatial', '$geoIntersects'],
  },
  {
    id: 'mongo-geo-005',
    category: 'Geospatial Queries',
    difficulty: 'medium',
    title: 'Create 2d Index',
    text: 'Create a 2d index on coordinates array [longitude, latitude].',
    setup: 'Collection: users',
    setupCode: 'db.users.insertOne({name: "John", coordinates: [-73.97, 40.77]});',
    expected: '2d index created',
    sample: 'db.users.createIndex({coordinates: "2d"})',
    hints: ['Use "2d" for flat coordinate pairs', 'Coordinates must be [longitude, latitude]'],
    validPatterns: [/db\.users\.createIndex\s*\(\s*\{\s*coordinates\s*:\s*"2d"\s*\}\s*\)/i],
    tags: ['index', 'geospatial', '2d'],
  },

  // ============================================================
  // DATE OPERATIONS (5 problems)
  // ============================================================
  {
    id: 'mongo-date-001',
    category: 'Date Operations',
    difficulty: 'easy',
    title: 'Find by Date Range',
    text: 'Find all users created between January 1, 2024 and January 31, 2024.',
    setup:
      'Collection: users with documents {name: "John", createdAt: ISODate("2024-01-15")}, {name: "Jane", createdAt: ISODate("2024-02-01")}',
    setupCode: `db.users.insertMany([
  {name: "John", createdAt: ISODate("2024-01-15")},
  {name: "Jane", createdAt: ISODate("2024-02-01")}
]);`,
    expected: 'Users created in January 2024',
    sample:
      'db.users.find({createdAt: {$gte: ISODate("2024-01-01"), $lte: ISODate("2024-01-31")}})',
    hints: ['Use ISODate() to create date objects', 'Use $gte and $lte for date ranges'],
    validPatterns: [
      /db\.users\.find\s*\(\s*\{\s*createdAt\s*:\s*\{\s*\$gte\s*:\s*ISODate/i,
      /\$lte\s*:\s*ISODate/i,
    ],
    tags: ['find', 'date', 'range'],
  },
  {
    id: 'mongo-date-002',
    category: 'Date Operations',
    difficulty: 'medium',
    title: 'Find Documents from Last 7 Days',
    text: 'Find all users created in the last 7 days.',
    setup: 'Collection: users with documents',
    setupCode: `db.users.insertOne({name: "John", createdAt: new Date()});`,
    expected: 'Users from last 7 days',
    sample: 'db.users.find({createdAt: {$gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)}})',
    hints: [
      'Use Date.now() for current timestamp',
      'Subtract milliseconds for past dates',
      '7 days = 7 * 24 * 60 * 60 * 1000 ms',
    ],
    validPatterns: [/db\.users\.find\s*\(\s*\{\s*createdAt\s*:\s*\{\s*\$gte\s*:\s*new\s+Date/i],
    tags: ['find', 'date', 'relative'],
  },
  {
    id: 'mongo-date-003',
    category: 'Date Operations',
    difficulty: 'medium',
    title: 'Aggregation with Date Grouping',
    text: 'Group users by year of creation and count documents in each year.',
    setup:
      'Collection: users with documents {name: "John", createdAt: ISODate("2024-01-15")}, {name: "Jane", createdAt: ISODate("2024-06-20")}, {name: "Bob", createdAt: ISODate("2023-12-01")}',
    setupCode: `db.users.insertMany([
  {name: "John", createdAt: ISODate("2024-01-15")},
  {name: "Jane", createdAt: ISODate("2024-06-20")},
  {name: "Bob", createdAt: ISODate("2023-12-01")}
]);`,
    expected: [
      { _id: 2024, count: 2 },
      { _id: 2023, count: 1 },
    ],
    sample: 'db.users.aggregate([{$group: {_id: {$year: "$createdAt"}, count: {$sum: 1}}}])',
    hints: ['Use $year to extract year from date', 'Group by year field'],
    validPatterns: [
      /db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$group\s*:/i,
      /\$year\s*:\s*"\$createdAt"/i,
    ],
    tags: ['aggregation', 'date', '$year'],
  },
  {
    id: 'mongo-date-004',
    category: 'Date Operations',
    difficulty: 'hard',
    title: 'Aggregation with Date Formatting',
    text: 'Add formatted date string field using $dateToString.',
    setup: 'Collection: users with document {name: "John", createdAt: ISODate("2024-01-15")}',
    setupCode: `db.users.insertOne({name: "John", createdAt: ISODate("2024-01-15")});`,
    expected: 'Document with formatted date string',
    sample:
      'db.users.aggregate([{$addFields: {dateStr: {$dateToString: {format: "%Y-%m-%d", date: "$createdAt"}}}}])',
    hints: ['Use $dateToString to format dates', 'format uses strftime-style format strings'],
    validPatterns: [
      /db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$addFields\s*:/i,
      /\$dateToString\s*:/i,
    ],
    tags: ['aggregation', 'date', '$dateToString'],
  },
  {
    id: 'mongo-date-005',
    category: 'Date Operations',
    difficulty: 'hard',
    title: 'Calculate Date Difference',
    text: 'Add a field showing days since creation using $subtract.',
    setup: 'Collection: users with document {name: "John", createdAt: ISODate("2024-01-01")}',
    setupCode: `db.users.insertOne({name: "John", createdAt: ISODate("2024-01-01")});`,
    expected: 'Document with daysSinceCreation field',
    sample:
      'db.users.aggregate([{$addFields: {daysSinceCreation: {$divide: [{$subtract: [new Date(), "$createdAt"]}, 1000 * 60 * 60 * 24]}}}])',
    hints: [
      'Use $subtract to get time difference in milliseconds',
      'Divide by milliseconds per day',
      '1000 * 60 * 60 * 24 = ms per day',
    ],
    validPatterns: [/db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$addFields\s*:/i, /\$subtract\s*:/i],
    tags: ['aggregation', 'date', '$subtract'],
  },

  // ============================================================
  // REPLACE OPERATIONS (5 problems)
  // ============================================================
  {
    id: 'mongo-replace-001',
    category: 'Replace Operations',
    difficulty: 'easy',
    title: 'Replace One Document',
    text: 'Replace the entire document for user "John" with new data.',
    setup: 'Collection: users with document {name: "John", age: 30}',
    setupCode: `db.users.insertOne({name: "John", age: 30});`,
    expected: { acknowledged: true, modifiedCount: 1 },
    sample: 'db.users.replaceOne({name: "John"}, {name: "John", age: 31, city: "NYC"})',
    hints: ['Use replaceOne() to replace entire document', 'Second parameter is new document'],
    validPatterns: [/db\.users\.replaceOne\s*\(\s*\{\s*name\s*:\s*"John"\s*\}\s*,\s*\{/i],
    tags: ['replace', 'replaceOne'],
  },
  {
    id: 'mongo-replace-002',
    category: 'Replace Operations',
    difficulty: 'medium',
    title: 'Replace with Upsert',
    text: 'Replace user "John" or insert if not exists.',
    setup: 'Collection: users (empty)',
    setupCode: 'db.users.deleteMany({});',
    expected: 'Upserted document',
    sample: 'db.users.replaceOne({name: "John"}, {name: "John", age: 30}, {upsert: true})',
    hints: ['Use upsert option to insert if not found', 'Third parameter is options object'],
    validPatterns: [
      /db\.users\.replaceOne\s*\(\s*\{\s*name\s*:\s*"John"\s*\}\s*,\s*\{/i,
      /upsert\s*:\s*true/i,
    ],
    tags: ['replace', 'upsert'],
  },
  {
    id: 'mongo-replace-003',
    category: 'Replace Operations',
    difficulty: 'hard',
    title: 'Find and Replace',
    text: 'Find user "John" and replace with new document, returning the original.',
    setup: 'Collection: users with document {name: "John", age: 30}',
    setupCode: `db.users.insertOne({name: "John", age: 30});`,
    expected: { name: 'John', age: 30 },
    sample:
      'db.users.findOneAndReplace({name: "John"}, {name: "John", age: 31}, {returnDocument: "before"})',
    hints: [
      'Use findOneAndReplace() for atomic operation',
      'returnDocument: "before" returns original, "after" returns new',
    ],
    validPatterns: [/db\.users\.findOneAndReplace\s*\(\s*\{\s*name\s*:\s*"John"\s*\}\s*,\s*\{/i],
    tags: ['replace', 'findOneAndReplace'],
  },
  {
    id: 'mongo-replace-004',
    category: 'Replace Operations',
    difficulty: 'hard',
    title: 'Find and Replace with Return New',
    text: 'Replace user "John" and return the new document.',
    setup: 'Collection: users with document {name: "John", age: 30}',
    setupCode: `db.users.insertOne({name: "John", age: 30});`,
    expected: { name: 'John', age: 31 },
    sample:
      'db.users.findOneAndReplace({name: "John"}, {name: "John", age: 31}, {returnDocument: "after"})',
    hints: ['Use returnDocument: "after" to get new document', 'Default is "before"'],
    validPatterns: [
      /db\.users\.findOneAndReplace\s*\(\s*\{\s*name\s*:\s*"John"\s*\}\s*,\s*\{/i,
      /returnDocument\s*:\s*"after"/i,
    ],
    tags: ['replace', 'findOneAndReplace'],
  },
  {
    id: 'mongo-replace-005',
    category: 'Replace Operations',
    difficulty: 'medium',
    title: 'Bulk Replace Operations',
    text: 'Replace multiple users in a single operation using bulkWrite.',
    setup: 'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 25}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 25}
]);`,
    expected: { acknowledged: true, modifiedCount: 2 },
    sample:
      'db.users.bulkWrite([{replaceOne: {filter: {name: "John"}, replacement: {name: "John", age: 31}}}, {replaceOne: {filter: {name: "Jane"}, replacement: {name: "Jane", age: 26}}}])',
    hints: ['Use bulkWrite() for multiple operations', 'Each operation is an object in array'],
    validPatterns: [/db\.users\.bulkWrite\s*\(\s*\[/i, /replaceOne\s*:/i],
    tags: ['replace', 'bulkWrite'],
  },

  // ============================================================
  // ADVANCED AGGREGATION (10 problems)
  // ============================================================
  {
    id: 'mongo-agg-016',
    category: 'Aggregation Pipeline',
    difficulty: 'hard',
    title: 'Aggregation with $filter',
    text: 'Filter scores array to only include values greater than 80.',
    setup: 'Collection: users with document {name: "John", scores: [80, 95, 70, 85]}',
    setupCode: `db.users.insertOne({name: "John", scores: [80, 95, 70, 85]});`,
    expected: [{ name: 'John', highScores: [95, 85] }],
    sample:
      'db.users.aggregate([{$project: {name: 1, highScores: {$filter: {input: "$scores", as: "score", cond: {$gt: ["$$score", 80]}}}}}])',
    hints: [
      'Use $filter to filter array elements',
      'input: array, as: variable name, cond: condition',
    ],
    validPatterns: [/db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$project\s*:/i, /\$filter\s*:/i],
    tags: ['aggregation', '$filter', 'array'],
  },
  {
    id: 'mongo-agg-017',
    category: 'Aggregation Pipeline',
    difficulty: 'hard',
    title: 'Aggregation with $map',
    text: 'Double all values in scores array.',
    setup: 'Collection: users with document {name: "John", scores: [10, 20, 30]}',
    setupCode: `db.users.insertOne({name: "John", scores: [10, 20, 30]});`,
    expected: [{ name: 'John', doubledScores: [20, 40, 60] }],
    sample:
      'db.users.aggregate([{$project: {name: 1, doubledScores: {$map: {input: "$scores", as: "score", in: {$multiply: ["$$score", 2]}}}}}])',
    hints: ['Use $map to transform array elements', 'in: expression to apply to each element'],
    validPatterns: [/db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$project\s*:/i, /\$map\s*:/i],
    tags: ['aggregation', '$map', 'array'],
  },
  {
    id: 'mongo-agg-018',
    category: 'Aggregation Pipeline',
    difficulty: 'hard',
    title: 'Aggregation with $reduce',
    text: 'Calculate sum of all scores in scores array.',
    setup: 'Collection: users with document {name: "John", scores: [10, 20, 30]}',
    setupCode: `db.users.insertOne({name: "John", scores: [10, 20, 30]});`,
    expected: [{ name: 'John', totalScore: 60 }],
    sample:
      'db.users.aggregate([{$project: {name: 1, totalScore: {$reduce: {input: "$scores", initialValue: 0, in: {$add: ["$$value", "$$this"]}}}}}])',
    hints: [
      'Use $reduce to accumulate array values',
      'initialValue: starting value, in: accumulation expression',
    ],
    validPatterns: [/db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$project\s*:/i, /\$reduce\s*:/i],
    tags: ['aggregation', '$reduce', 'array'],
  },
  {
    id: 'mongo-agg-019',
    category: 'Aggregation Pipeline',
    difficulty: 'hard',
    title: 'Aggregation with $bucket',
    text: 'Group users into age buckets: 0-25, 25-50, 50+.',
    setup:
      'Collection: users with documents {name: "John", age: 30}, {name: "Jane", age: 20}, {name: "Bob", age: 60}',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 20},
  {name: "Bob", age: 60}
]);`,
    expected: [
      { _id: 0, count: 1 },
      { _id: 25, count: 1 },
      { _id: 50, count: 1 },
    ],
    sample:
      'db.users.aggregate([{$bucket: {groupBy: "$age", boundaries: [0, 25, 50, 100], default: "other"}}])',
    hints: [
      'Use $bucket to group into ranges',
      'boundaries: array of bucket edges',
      'default: bucket for values outside boundaries',
    ],
    validPatterns: [/db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$bucket\s*:/i],
    tags: ['aggregation', '$bucket'],
  },
  {
    id: 'mongo-agg-020',
    category: 'Aggregation Pipeline',
    difficulty: 'hard',
    title: 'Aggregation with $merge',
    text: 'Group users by age and merge results into summary collection.',
    setup: 'Collection: users with documents',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 30}
]);`,
    expected: 'Results merged into summary collection',
    sample:
      'db.users.aggregate([{$group: {_id: "$age", count: {$sum: 1}}}, {$merge: {into: "ageSummary"}}])',
    hints: ['Use $merge to write results to collection', 'into: target collection name'],
    validPatterns: [
      /db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$group\s*:/i,
      /\{\s*\$merge\s*:\s*\{\s*into\s*:\s*"ageSummary"/i,
    ],
    tags: ['aggregation', '$merge'],
  },
  {
    id: 'mongo-agg-021',
    category: 'Aggregation Pipeline',
    difficulty: 'hard',
    title: 'Aggregation with $out',
    text: 'Group users by age and output to ageGroups collection.',
    setup: 'Collection: users with documents',
    setupCode: `db.users.insertMany([
  {name: "John", age: 30},
  {name: "Jane", age: 30}
]);`,
    expected: 'Results written to ageGroups collection',
    sample: 'db.users.aggregate([{$group: {_id: "$age", count: {$sum: 1}}}, {$out: "ageGroups"}])',
    hints: [
      'Use $out to write results to new collection',
      'Replaces existing collection if it exists',
    ],
    validPatterns: [
      /db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$group\s*:/i,
      /\{\s*\$out\s*:\s*"ageGroups"\s*\}/i,
    ],
    tags: ['aggregation', '$out'],
  },
  {
    id: 'mongo-agg-022',
    category: 'Aggregation Pipeline',
    difficulty: 'hard',
    title: 'Aggregation with $unionWith',
    text: 'Combine results from users and admins collections.',
    setup: 'Collections: users and admins',
    setupCode: `db.users.insertOne({name: "John", role: "user"});
db.admins.insertOne({name: "Admin", role: "admin"});`,
    expected: [
      { name: 'John', role: 'user' },
      { name: 'Admin', role: 'admin' },
    ],
    sample: 'db.users.aggregate([{$unionWith: {coll: "admins"}}])',
    hints: ['Use $unionWith to combine collections', 'coll: collection name to union with'],
    validPatterns: [/db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$unionWith\s*:/i],
    tags: ['aggregation', '$unionWith'],
  },
  {
    id: 'mongo-agg-023',
    category: 'Aggregation Pipeline',
    difficulty: 'hard',
    title: 'Aggregation with $graphLookup',
    text: 'Find all managers in hierarchy using recursive lookup.',
    setup: 'Collection: employees with manager references',
    setupCode: `db.employees.insertMany([
  {_id: 1, name: "CEO", managerId: null},
  {_id: 2, name: "Manager", managerId: 1},
  {_id: 3, name: "Employee", managerId: 2}
]);`,
    expected: 'Employee with all managers in hierarchy',
    sample:
      'db.employees.aggregate([{$match: {_id: 3}}, {$graphLookup: {from: "employees", startWith: "$managerId", connectFromField: "managerId", connectToField: "_id", as: "managers"}}])',
    hints: [
      'Use $graphLookup for recursive relationships',
      'startWith: starting value, connectFromField/connectToField: relationship fields',
    ],
    validPatterns: [/db\.employees\.aggregate\s*\(\s*\[\s*\{\s*\$match\s*:/i, /\$graphLookup\s*:/i],
    tags: ['aggregation', '$graphLookup'],
  },
  {
    id: 'mongo-agg-024',
    category: 'Aggregation Pipeline',
    difficulty: 'hard',
    title: 'Aggregation with $densify',
    text: 'Create missing time series data points between existing points.',
    setup: 'Collection: metrics with time series data',
    setupCode: `db.metrics.insertMany([
  {time: ISODate("2024-01-01"), value: 10},
  {time: ISODate("2024-01-03"), value: 20}
]);`,
    expected: 'Densified time series with interpolated points',
    sample:
      'db.metrics.aggregate([{$densify: {field: "time", range: {step: 1, unit: "day"}, partitionByFields: []}}])',
    hints: [
      'Use $densify to fill gaps in time series',
      'range: step size and unit',
      'partitionByFields: optional grouping',
    ],
    validPatterns: [/db\.metrics\.aggregate\s*\(\s*\[\s*\{\s*\$densify\s*:/i],
    tags: ['aggregation', '$densify'],
  },
  {
    id: 'mongo-agg-025',
    category: 'Aggregation Pipeline',
    difficulty: 'hard',
    title: 'Aggregation with $setWindowFields',
    text: 'Calculate running total of scores using window function.',
    setup:
      'Collection: users with documents {name: "John", score: 10}, {name: "Jane", score: 20}, {name: "Bob", score: 30}',
    setupCode: `db.users.insertMany([
  {name: "John", score: 10},
  {name: "Jane", score: 20},
  {name: "Bob", score: 30}
]);`,
    expected: [
      { name: 'John', score: 10, runningTotal: 10 },
      { name: 'Jane', score: 20, runningTotal: 30 },
      { name: 'Bob', score: 30, runningTotal: 60 },
    ],
    sample:
      'db.users.aggregate([{$setWindowFields: {sortBy: {name: 1}, output: {runningTotal: {$sum: "$score", window: {documents: ["unboundedPreceding", "current"]}}}}}}])',
    hints: [
      'Use $setWindowFields for window functions',
      'window: range of documents to include',
      'unboundedPreceding: from start',
    ],
    validPatterns: [/db\.users\.aggregate\s*\(\s*\[\s*\{\s*\$setWindowFields\s*:/i],
    tags: ['aggregation', '$setWindowFields'],
  },
];
