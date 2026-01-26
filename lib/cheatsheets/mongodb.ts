/**
 * MongoDB Cheatsheet
 *
 * Essential MongoDB operations and queries for coding interviews.
 * Covers CRUD operations, query operators, aggregation, and indexes.
 */

import type { CheatsheetEntry } from './types';

export const mongodbCheatsheet: CheatsheetEntry[] = [
  // ============================================
  // CRUD OPERATIONS
  // ============================================
  {
    name: 'find',
    category: 'collections',
    syntax: 'db.collection.find(query, projection)',
    description: 'Find documents matching query criteria',
    example: {
      code: 'db.users.find({age: {$gt: 25}})',
      output: 'Returns all users with age > 25',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    gotchas: ['Returns cursor, not array', 'Use projection to limit fields'],
    interviewTip: 'Use findOne() for single document, find() for multiple',
    priority: 'essential',
  },
  {
    name: 'insertOne',
    category: 'io',
    syntax: 'db.collection.insertOne(document)',
    description: 'Insert a single document into collection',
    example: {
      code: "db.users.insertOne({name: 'John', age: 30})",
      output: '{ acknowledged: true, insertedId: ObjectId(...) }',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: ['Auto-generates _id if not provided', 'Returns write result'],
    interviewTip: 'Use insertMany() for bulk inserts',
    priority: 'essential',
  },
  {
    name: 'updateOne',
    category: 'io',
    syntax: 'db.collection.updateOne(filter, update, options)',
    description: 'Update first document matching filter',
    example: {
      code: "db.users.updateOne({name: 'John'}, {$set: {age: 31}})",
      output: '{ acknowledged: true, modifiedCount: 1 }',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: ['Only updates first match', 'Use $set to update fields'],
    interviewTip: 'Use updateMany() to update all matching documents',
    priority: 'essential',
  },
  {
    name: 'deleteOne',
    category: 'io',
    syntax: 'db.collection.deleteOne(filter)',
    description: 'Delete first document matching filter',
    example: {
      code: "db.users.deleteOne({name: 'John'})",
      output: '{ acknowledged: true, deletedCount: 1 }',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: ['Only deletes first match', 'Returns deletion result'],
    interviewTip: 'Use deleteMany() to delete all matching documents',
    priority: 'essential',
  },
  // ============================================
  // QUERY OPERATORS
  // ============================================
  {
    name: '$gt, $gte',
    category: 'searching',
    syntax: '{field: {$gt: value}} or {field: {$gte: value}}',
    description: 'Greater than (>) or greater than or equal (>=)',
    example: {
      code: 'db.users.find({age: {$gt: 25, $lte: 65}})',
      output: 'Users with age between 26 and 65',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    gotchas: ['Can combine with $lt, $lte for ranges'],
    interviewTip: 'Use indexes on comparison fields for better performance',
    priority: 'essential',
  },
  {
    name: '$in, $nin',
    category: 'searching',
    syntax: '{field: {$in: [value1, value2]}} or {field: {$nin: [...]}}',
    description: 'Match any value in array (in) or not in array (nin)',
    example: {
      code: "db.users.find({status: {$in: ['active', 'pending']}})",
      output: 'Users with status active or pending',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    gotchas: ['$in is like SQL IN clause', '$nin is like NOT IN'],
    interviewTip: 'Use $in instead of multiple $or conditions',
    priority: 'essential',
  },
  {
    name: '$and, $or',
    category: 'searching',
    syntax: '{$and: [condition1, condition2]} or {$or: [condition1, condition2]}',
    description: 'Logical AND and OR operators',
    example: {
      code: "db.users.find({$or: [{age: {$lt: 18}}, {status: 'inactive'}]})",
      output: 'Users under 18 OR inactive',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    gotchas: ['$and is implicit in comma-separated conditions', '$or requires explicit array'],
    interviewTip: 'Use $and for complex conditions, $or for alternatives',
    priority: 'essential',
  },
  {
    name: '$regex',
    category: 'regex',
    syntax: '{field: {$regex: /pattern/, $options: "i"}}',
    description: 'Pattern matching with regular expressions',
    example: {
      code: "db.users.find({name: {$regex: /^J/, $options: 'i'}})",
      output: 'Users with names starting with J (case-insensitive)',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    gotchas: ['Case-sensitive by default', 'Use $options: "i" for case-insensitive'],
    interviewTip: 'Use text indexes for better full-text search performance',
    priority: 'common',
  },
  // ============================================
  // UPDATE OPERATORS
  // ============================================
  {
    name: '$set',
    category: 'io',
    syntax: '{$set: {field: value}}',
    description: 'Set field value (creates field if missing)',
    example: {
      code: "db.users.updateOne({_id: 1}, {$set: {age: 30, city: 'NYC'}})",
      output: 'Updates age and city fields',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: ['Creates field if it does not exist', 'Overwrites existing value'],
    interviewTip: 'Most common update operator, use for setting values',
    priority: 'essential',
  },
  {
    name: '$inc',
    category: 'io',
    syntax: '{$inc: {field: number}}',
    description: 'Increment numeric field by specified amount',
    example: {
      code: 'db.users.updateOne({_id: 1}, {$inc: {age: 1}})',
      output: 'Increments age by 1',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: ['Use negative number to decrement', 'Field must be numeric'],
    interviewTip: 'Atomic operation, perfect for counters and scores',
    priority: 'essential',
  },
  {
    name: '$push',
    category: 'arrays',
    syntax: '{$push: {arrayField: value}}',
    description: 'Add element to end of array',
    example: {
      code: "db.users.updateOne({_id: 1}, {$push: {hobbies: 'reading'}})",
      output: 'Adds "reading" to hobbies array',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: ['Creates array if field does not exist', 'Adds to end of array'],
    interviewTip: 'Use $addToSet to prevent duplicates',
    priority: 'essential',
  },
  {
    name: '$pull',
    category: 'arrays',
    syntax: '{$pull: {arrayField: value}}',
    description: 'Remove all occurrences of value from array',
    example: {
      code: "db.users.updateOne({_id: 1}, {$pull: {hobbies: 'reading'}})",
      output: 'Removes all "reading" from hobbies array',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    gotchas: ['Removes ALL matching values', 'Does nothing if value not found'],
    interviewTip: 'Use $pullAll to remove multiple values at once',
    priority: 'essential',
  },
  // ============================================
  // AGGREGATION
  // ============================================
  {
    name: '$match',
    category: 'searching',
    syntax: '{$match: {query}}',
    description: 'Filter documents (like WHERE in SQL)',
    example: {
      code: 'db.users.aggregate([{$match: {age: {$gt: 25}}}])',
      output: 'Filters users with age > 25',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    gotchas: ['Should be first stage when possible', 'Uses same query syntax as find()'],
    interviewTip: 'Place $match early in pipeline to reduce documents processed',
    priority: 'essential',
  },
  {
    name: '$group',
    category: 'collections',
    syntax: '{$group: {_id: "$field", alias: {$operator: "$field"}}}',
    description: 'Group documents and apply aggregation operators',
    example: {
      code: 'db.users.aggregate([{$group: {_id: "$city", count: {$sum: 1}}}])',
      output: 'Groups users by city and counts them',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k) where k is number of groups',
    gotchas: [
      '_id is required and defines grouping',
      'Use $sum, $avg, $min, $max for aggregations',
    ],
    interviewTip: 'Similar to SQL GROUP BY, essential for analytics queries',
    priority: 'essential',
  },
  {
    name: '$project',
    category: 'collections',
    syntax: '{$project: {field1: 1, field2: 0, newField: "$oldField"}}',
    description: 'Reshape documents, include/exclude fields, add computed fields',
    example: {
      code: 'db.users.aggregate([{$project: {name: 1, age: 1, _id: 0}}])',
      output: 'Returns only name and age fields',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    gotchas: ['1 to include, 0 to exclude', 'Cannot mix include/exclude except _id'],
    interviewTip: 'Use to reduce data transfer and add computed fields',
    priority: 'essential',
  },
  {
    name: '$sort',
    category: 'sorting',
    syntax: '{$sort: {field1: 1, field2: -1}}',
    description: 'Sort documents (1 = ascending, -1 = descending)',
    example: {
      code: 'db.users.aggregate([{$sort: {age: -1, name: 1}}])',
      output: 'Sorts by age descending, then name ascending',
    },
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    gotchas: ['1 for ascending, -1 for descending', 'Can sort by multiple fields'],
    interviewTip: 'Use indexes to optimize sorting operations',
    priority: 'essential',
  },
  {
    name: '$lookup',
    category: 'collections',
    syntax:
      '{$lookup: {from: "collection", localField: "field", foreignField: "field", as: "alias"}}',
    description: 'Left outer join with another collection',
    example: {
      code: 'db.orders.aggregate([{$lookup: {from: "users", localField: "userId", foreignField: "_id", as: "user"}}])',
      output: 'Joins orders with users collection',
    },
    timeComplexity: 'O(n * m)',
    spaceComplexity: 'O(n)',
    gotchas: ['Performs left outer join', 'Results in array field even for single match'],
    interviewTip: 'MongoDB equivalent of SQL JOIN, use for denormalized data',
    priority: 'common',
  },
  // ============================================
  // ARRAY OPERATORS
  // ============================================
  {
    name: '$elemMatch',
    category: 'arrays',
    syntax: '{arrayField: {$elemMatch: {condition}}}',
    description: 'Match documents where array contains element matching condition',
    example: {
      code: 'db.users.find({scores: {$elemMatch: {$gt: 90}}})',
      output: 'Users with at least one score > 90',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    gotchas: ['Matches if ANY element meets condition', 'Use for complex array queries'],
    interviewTip: 'Essential for querying nested array elements',
    priority: 'common',
  },
  {
    name: '$size',
    category: 'arrays',
    syntax: '{arrayField: {$size: number}}',
    description: 'Match arrays of exact size',
    example: {
      code: 'db.users.find({hobbies: {$size: 3}})',
      output: 'Users with exactly 3 hobbies',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    gotchas: ['Only matches exact size', 'Cannot use with range operators'],
    interviewTip: 'Use $expr with $size for range queries on array length',
    priority: 'useful',
  },
  // ============================================
  // INDEXES
  // ============================================
  {
    name: 'createIndex',
    category: 'searching',
    syntax: 'db.collection.createIndex({field: 1}, {options})',
    description: 'Create index on field(s) for faster queries',
    example: {
      code: 'db.users.createIndex({email: 1}, {unique: true})',
      output: 'Creates unique index on email field',
    },
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    gotchas: ['1 for ascending, -1 for descending', 'Unique option enforces uniqueness'],
    interviewTip: 'Index frequently queried fields, use compound indexes for multi-field queries',
    priority: 'common',
  },
  {
    name: 'text index',
    category: 'searching',
    syntax: 'db.collection.createIndex({field: "text"})',
    description: 'Create text index for full-text search',
    example: {
      code: "db.articles.createIndex({title: 'text', content: 'text'})",
      output: 'Creates text index on title and content',
    },
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    gotchas: ['Only one text index per collection', 'Use $text operator for searching'],
    interviewTip: 'Use for search functionality, supports relevance scoring',
    priority: 'useful',
  },
];
