/**
 * Redis Cheatsheet
 *
 * Essential Redis commands and operations for coding interviews.
 * Covers strings, lists, hashes, sets, sorted sets, and key management.
 */

import type { CheatsheetEntry } from './types';

export const redisCheatsheet: CheatsheetEntry[] = [
  // ============================================
  // STRING OPERATIONS
  // ============================================
  {
    name: 'SET',
    category: 'collections',
    syntax: 'SET key value [EX seconds] [NX|XX]',
    description: 'Set a key-value pair with optional expiration and conditions',
    example: {
      code: 'SET session abc123 EX 3600 NX',
      output: 'OK (if key did not exist)',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: [
      'NX = only if not exists',
      'XX = only if exists',
      'EX for seconds, PX for milliseconds',
    ],
    interviewTip: 'SET with NX is commonly used for distributed locks',
    priority: 'essential',
  },
  {
    name: 'GET',
    category: 'collections',
    syntax: 'GET key',
    description: 'Retrieve the value of a key',
    example: {
      code: 'GET session',
      output: '"abc123"',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: ['Returns nil if key does not exist', 'Only works with string values'],
    interviewTip: 'Most basic operation, always O(1) in Redis',
    priority: 'essential',
  },
  {
    name: 'INCR / INCRBY',
    category: 'math',
    syntax: 'INCR key | INCRBY key increment',
    description: 'Atomically increment a numeric value',
    example: {
      code: 'INCR page_views\nINCRBY score 50',
      output: '1\n50',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: [
      'Creates key with 0 if not exists',
      'Atomic operation',
      'Value must be integer string',
    ],
    interviewTip: 'Perfect for counters, rate limiters, and atomic updates',
    priority: 'essential',
  },
  {
    name: 'MSET / MGET',
    category: 'collections',
    syntax: 'MSET k1 v1 k2 v2 | MGET k1 k2',
    description: 'Set or get multiple keys atomically',
    example: {
      code: 'MSET a 1 b 2 c 3\nMGET a b c',
      output: 'OK\n["1", "2", "3"]',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    gotchas: ['MSET is atomic', 'MGET returns nil for missing keys', 'Reduces network round trips'],
    interviewTip: 'Batch operations improve performance by reducing network latency',
    priority: 'common',
  },
  // ============================================
  // LIST OPERATIONS
  // ============================================
  {
    name: 'LPUSH / RPUSH',
    category: 'collections',
    syntax: 'LPUSH key value [value ...] | RPUSH key value [value ...]',
    description: 'Push elements to the head (L) or tail (R) of a list',
    example: {
      code: 'LPUSH queue job1 job2\nRPUSH queue job3',
      output: '2\n3',
    },
    timeComplexity: 'O(1) per element',
    spaceComplexity: 'O(n)',
    gotchas: [
      'Creates list if not exists',
      'Returns new list length',
      'LPUSH reverses order when pushing multiple',
    ],
    interviewTip: 'Lists are perfect for queues (LPUSH + RPOP) and stacks (LPUSH + LPOP)',
    priority: 'essential',
  },
  {
    name: 'LPOP / RPOP',
    category: 'collections',
    syntax: 'LPOP key [count] | RPOP key [count]',
    description: 'Remove and return elements from list head or tail',
    example: {
      code: 'LPOP queue\nRPOP queue 2',
      output: '"job2"\n["job3", "job1"]',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: ['Returns nil if list is empty', 'Count parameter returns array'],
    interviewTip: 'Use BRPOP/BLPOP for blocking versions (message queues)',
    priority: 'essential',
  },
  {
    name: 'LRANGE',
    category: 'collections',
    syntax: 'LRANGE key start stop',
    description: 'Get a range of elements from a list',
    example: {
      code: 'LRANGE mylist 0 -1',
      output: '["a", "b", "c", "d"]',
    },
    timeComplexity: 'O(s+n) where s is start offset and n is range',
    spaceComplexity: 'O(n)',
    gotchas: ['-1 means last element', 'Both indices are inclusive', 'Empty array if out of range'],
    interviewTip: 'LRANGE 0 -1 returns all elements, useful for debugging',
    priority: 'essential',
  },
  // ============================================
  // HASH OPERATIONS
  // ============================================
  {
    name: 'HSET / HGET',
    category: 'collections',
    syntax: 'HSET key field value [field value ...] | HGET key field',
    description: 'Set or get hash field values',
    example: {
      code: 'HSET user:1 name Alice age 30\nHGET user:1 name',
      output: '2\n"Alice"',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: [
      'HSET can set multiple fields',
      'Returns number of new fields',
      'HGET returns nil if missing',
    ],
    interviewTip: 'Hashes are ideal for storing objects, more memory efficient than separate keys',
    priority: 'essential',
  },
  {
    name: 'HGETALL',
    category: 'collections',
    syntax: 'HGETALL key',
    description: 'Get all fields and values of a hash',
    example: {
      code: 'HGETALL user:1',
      output: '["name", "Alice", "age", "30"]',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    gotchas: ['Returns flat array of field-value pairs', 'Use HSCAN for large hashes'],
    interviewTip: 'Avoid on large hashes in production, use HSCAN instead',
    priority: 'essential',
  },
  {
    name: 'HINCRBY',
    category: 'math',
    syntax: 'HINCRBY key field increment',
    description: 'Atomically increment a hash field',
    example: {
      code: 'HINCRBY article:1 views 1',
      output: '101',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: [
      'Creates field with 0 if not exists',
      'Works with integers only',
      'Use HINCRBYFLOAT for floats',
    ],
    interviewTip: 'Perfect for per-object counters like view counts or scores',
    priority: 'common',
  },
  // ============================================
  // SET OPERATIONS
  // ============================================
  {
    name: 'SADD / SMEMBERS',
    category: 'collections',
    syntax: 'SADD key member [member ...] | SMEMBERS key',
    description: 'Add members to a set or get all members',
    example: {
      code: 'SADD tags redis database nosql\nSMEMBERS tags',
      output: '3\n["redis", "database", "nosql"]',
    },
    timeComplexity: 'O(1) for SADD, O(n) for SMEMBERS',
    spaceComplexity: 'O(n)',
    gotchas: ['Duplicates are ignored', 'Order is not guaranteed', 'Use SSCAN for large sets'],
    interviewTip: 'Sets are perfect for tags, unique visitors, and membership tests',
    priority: 'essential',
  },
  {
    name: 'SISMEMBER',
    category: 'searching',
    syntax: 'SISMEMBER key member',
    description: 'Check if a member exists in a set',
    example: {
      code: 'SISMEMBER tags redis',
      output: '1 (true)',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: ['Returns 1 or 0', 'SMISMEMBER checks multiple members'],
    interviewTip: "O(1) membership test is one of Redis sets' main advantages",
    priority: 'essential',
  },
  {
    name: 'SUNION / SINTER / SDIFF',
    category: 'collections',
    syntax: 'SUNION key1 key2 | SINTER key1 key2 | SDIFF key1 key2',
    description: 'Set operations: union, intersection, difference',
    example: {
      code: 'SADD s1 a b c\nSADD s2 b c d\nSINTER s1 s2',
      output: '["b", "c"]',
    },
    timeComplexity: 'O(n*m) where n and m are set sizes',
    spaceComplexity: 'O(n)',
    gotchas: [
      'SDIFF returns elements in first set not in others',
      'Use SUNIONSTORE to save results',
    ],
    interviewTip: 'Great for finding common friends, shared interests, etc.',
    priority: 'common',
  },
  // ============================================
  // SORTED SET OPERATIONS
  // ============================================
  {
    name: 'ZADD',
    category: 'collections',
    syntax: 'ZADD key [NX|XX] score member [score member ...]',
    description: 'Add members with scores to a sorted set',
    example: {
      code: 'ZADD leaderboard 100 alice 200 bob 150 charlie',
      output: '3',
    },
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(n)',
    gotchas: [
      'Sorted by score ascending',
      'NX = only add new, XX = only update',
      'Ties sorted alphabetically',
    ],
    interviewTip: 'Sorted sets are perfect for leaderboards, rankings, and priority queues',
    priority: 'essential',
  },
  {
    name: 'ZRANGE / ZREVRANGE',
    category: 'collections',
    syntax: 'ZRANGE key start stop [WITHSCORES] | ZREVRANGE key start stop [WITHSCORES]',
    description: 'Get members by rank (ZREVRANGE for high-to-low)',
    example: {
      code: 'ZREVRANGE leaderboard 0 2 WITHSCORES',
      output: '["bob", "200", "charlie", "150", "alice", "100"]',
    },
    timeComplexity: 'O(log n + m) where m is result size',
    spaceComplexity: 'O(m)',
    gotchas: ['-1 means last element', 'WITHSCORES includes scores in output'],
    interviewTip: 'ZREVRANGE 0 9 gives top 10 in a leaderboard',
    priority: 'essential',
  },
  {
    name: 'ZSCORE / ZRANK',
    category: 'searching',
    syntax: 'ZSCORE key member | ZRANK key member',
    description: 'Get score or rank of a member',
    example: {
      code: 'ZSCORE leaderboard alice\nZRANK leaderboard alice',
      output: '"100"\n0',
    },
    timeComplexity: 'O(1) for ZSCORE, O(log n) for ZRANK',
    spaceComplexity: 'O(1)',
    gotchas: [
      'ZRANK is 0-based',
      'Use ZREVRANK for descending rank',
      'Returns nil if member not found',
    ],
    interviewTip: 'ZREVRANK + 1 gives position on a leaderboard',
    priority: 'essential',
  },
  {
    name: 'ZINCRBY',
    category: 'math',
    syntax: 'ZINCRBY key increment member',
    description: 'Increment the score of a sorted set member',
    example: {
      code: 'ZINCRBY leaderboard 50 alice',
      output: '"150"',
    },
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    gotchas: ['Creates member with score 0 if not exists', 'Negative increment decreases score'],
    interviewTip: 'Use for updating scores in real-time leaderboards',
    priority: 'common',
  },
  // ============================================
  // KEY MANAGEMENT
  // ============================================
  {
    name: 'DEL / EXISTS',
    category: 'collections',
    syntax: 'DEL key [key ...] | EXISTS key [key ...]',
    description: 'Delete keys or check existence',
    example: {
      code: 'DEL temp_key\nEXISTS user:1 user:2',
      output: '1\n2',
    },
    timeComplexity: 'O(1) per key',
    spaceComplexity: 'O(1)',
    gotchas: [
      'DEL returns count of deleted keys',
      'EXISTS returns count of existing keys',
      'Use UNLINK for async delete',
    ],
    interviewTip: 'UNLINK is non-blocking alternative to DEL for large keys',
    priority: 'essential',
  },
  {
    name: 'EXPIRE / TTL',
    category: 'collections',
    syntax: 'EXPIRE key seconds | TTL key',
    description: 'Set key expiration or check remaining time',
    example: {
      code: 'EXPIRE session 3600\nTTL session',
      output: '1\n3600',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    gotchas: [
      'TTL returns -1 if no expiration, -2 if key missing',
      'PEXPIRE/PTTL for milliseconds',
    ],
    interviewTip: 'Essential for caching with automatic expiration',
    priority: 'essential',
  },
  {
    name: 'KEYS / SCAN',
    category: 'searching',
    syntax: 'KEYS pattern | SCAN cursor [MATCH pattern] [COUNT count]',
    description: 'Find keys by pattern (SCAN is non-blocking)',
    example: {
      code: 'KEYS user:*\nSCAN 0 MATCH user:* COUNT 100',
      output: '["user:1", "user:2"]\n["42", ["user:1", "user:2"]]',
    },
    timeComplexity: 'O(n) for KEYS, O(1) per SCAN call',
    spaceComplexity: 'O(n)',
    gotchas: [
      'KEYS blocks server, avoid in production',
      'SCAN returns cursor for next iteration',
      'Use 0 cursor to start',
    ],
    interviewTip: 'Always use SCAN in production, KEYS is only for debugging',
    priority: 'common',
  },
  // ============================================
  // TRANSACTIONS
  // ============================================
  {
    name: 'MULTI / EXEC',
    category: 'collections',
    syntax: 'MULTI ... commands ... EXEC',
    description: 'Execute commands atomically as a transaction',
    example: {
      code: 'MULTI\nSET balance 100\nINCRBY balance 50\nEXEC',
      output: '["OK", "150"]',
    },
    timeComplexity: 'O(n) where n is number of commands',
    spaceComplexity: 'O(n)',
    gotchas: [
      'Commands are queued until EXEC',
      'No rollback on individual command failure',
      'Use DISCARD to abort',
    ],
    interviewTip: 'WATCH + MULTI + EXEC provides optimistic locking (CAS)',
    priority: 'common',
  },
  // ============================================
  // PUB/SUB
  // ============================================
  {
    name: 'PUBLISH / SUBSCRIBE',
    category: 'collections',
    syntax: 'PUBLISH channel message | SUBSCRIBE channel [channel ...]',
    description: 'Publish messages to channels or subscribe to receive them',
    example: {
      code: 'SUBSCRIBE notifications\nPUBLISH notifications "New message"',
      output: 'Subscriber receives: ["message", "notifications", "New message"]',
    },
    timeComplexity: 'O(n+m) where n is clients and m is patterns',
    spaceComplexity: 'O(n)',
    gotchas: [
      'Messages are not persisted',
      'Subscriber misses messages sent before subscribing',
      'Use Streams for persistence',
    ],
    interviewTip: 'Pub/Sub is fire-and-forget, use Streams for reliable messaging',
    priority: 'common',
  },
];
