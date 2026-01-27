// System Design Problems Data File
// Comprehensive collection of 28 system design problems organized by category

export interface SystemDesignProblem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  description: string;
  keyComponents: string[];
  functionalRequirements: string[];
  nonFunctionalRequirements: string[];
  constraints: string[];
  estimationHints: string[];
  topics: string[];
}

export const systemDesignProblems: SystemDesignProblem[] = [
  // ==================== FUNDAMENTALS (3 problems) ====================
  {
    id: 'sd-001',
    title: 'Scale From Zero To Millions Of Users',
    difficulty: 'easy',
    category: 'Fundamentals',
    description:
      'Design a system that evolves from serving a single user to handling millions of concurrent users. Walk through the progression from a single-server setup to a distributed architecture, explaining what components you would add at each scaling milestone and why.',
    keyComponents: [
      'Load Balancer',
      'Web Servers',
      'Database (SQL/NoSQL)',
      'Cache Layer',
      'CDN',
      'Message Queue',
    ],
    functionalRequirements: [
      'Serve web content to users with low latency',
      'Handle user authentication and session management',
      'Support both read-heavy and write-heavy workloads',
      'Enable horizontal scaling of stateless application servers',
    ],
    nonFunctionalRequirements: [
      'Availability of 99.99% uptime',
      'Sub-200ms response time for the 95th percentile',
      'Linear horizontal scalability as user count grows',
    ],
    constraints: [
      'Start with a single server and scale progressively',
      'Budget increases proportionally with user growth',
      'Must support up to 10 million daily active users at peak',
    ],
    estimationHints: [
      'At 1M DAU with 10 requests/user/day, expect ~100 RPS average and ~1,000 RPS peak',
      'A single modern server can handle roughly 1,000-10,000 RPS depending on workload complexity',
    ],
    topics: ['horizontal-scaling', 'load-balancing', 'caching', 'database-replication', 'cdn'],
  },
  {
    id: 'sd-002',
    title: 'Back-of-the-envelope Estimation',
    difficulty: 'easy',
    category: 'Fundamentals',
    description:
      'Practice the discipline of making quick, rough calculations to evaluate system capacity and resource needs. Given a system scenario, produce order-of-magnitude estimates for QPS, storage, bandwidth, and memory requirements that guide architectural decisions.',
    keyComponents: [
      'QPS Calculator',
      'Storage Estimator',
      'Bandwidth Estimator',
      'Memory Estimator',
      'Network Capacity Planner',
    ],
    functionalRequirements: [
      'Estimate queries per second from daily active user counts',
      'Calculate storage needs from data volume and retention policies',
      'Determine bandwidth requirements from payload sizes and traffic volume',
      'Assess cache memory needs based on working set size and access patterns',
    ],
    nonFunctionalRequirements: [
      'Estimates should be within one order of magnitude of actual values',
      'Calculations must account for peak vs average load ratios',
      'Results should directly inform architecture decisions',
    ],
    constraints: [
      'Use powers of 2 and base-10 approximations for quick mental math',
      'Assume standard latency numbers (e.g., SSD read ~100us, network roundtrip ~150ms)',
      'Round aggressively to keep calculations tractable',
    ],
    estimationHints: [
      'Common reference: 1 day = ~100K seconds, so 1M requests/day = ~10 QPS average',
      'A single character is 1-2 bytes; a typical JSON API response is 1-10 KB; an image is 100KB-1MB',
    ],
    topics: ['capacity-planning', 'qps-estimation', 'storage-estimation', 'bandwidth-estimation'],
  },
  {
    id: 'sd-003',
    title: 'A Framework For System Design Interviews',
    difficulty: 'easy',
    category: 'Fundamentals',
    description:
      'Establish a repeatable four-step approach for tackling any system design question: understand requirements, propose a high-level design, dive into detailed design, and discuss trade-offs. This meta-problem trains the structured thinking process that interviewers value.',
    keyComponents: [
      'Requirements Gathering Template',
      'High-Level Architecture Diagram',
      'Detailed Component Design',
      'Trade-off Analysis Matrix',
      'API Design',
    ],
    functionalRequirements: [
      'Clarify functional scope by asking targeted questions in the first 5 minutes',
      'Produce a high-level architecture with all major components and data flows',
      'Deep-dive into 2-3 components with specific algorithms and data structures',
      'Articulate trade-offs for every major design decision',
      'Define clear API contracts between components',
    ],
    nonFunctionalRequirements: [
      'Complete the design within a 45-minute interview window',
      'Demonstrate breadth by covering all layers of the stack',
      'Show depth by going into implementation detail on at least one component',
    ],
    constraints: [
      'Time-boxed to a typical 45-minute interview session',
      'Must communicate design clearly using diagrams and structured explanations',
      'Should proactively address failure scenarios and bottlenecks',
    ],
    estimationHints: [
      'Spend roughly 5 min on requirements, 15 min on high-level design, 20 min on deep-dive, and 5 min on wrap-up',
      'Keep a mental checklist: storage, compute, network, caching, monitoring, and failure handling',
    ],
    topics: ['interview-framework', 'requirements-gathering', 'trade-off-analysis', 'api-design'],
  },

  // ==================== INFRASTRUCTURE (4 problems) ====================
  {
    id: 'sd-004',
    title: 'Design A Rate Limiter',
    difficulty: 'medium',
    category: 'Infrastructure',
    description:
      'Design a rate limiter that controls the number of requests a client can make to an API within a specified time window. The system should be distributed, handle high throughput, and support multiple rate limiting strategies such as fixed window, sliding window, and token bucket.',
    keyComponents: [
      'API Gateway',
      'Rate Limiting Algorithm Engine',
      'Distributed Cache (Redis)',
      'Rule Configuration Store',
      'Monitoring Dashboard',
    ],
    functionalRequirements: [
      'Throttle requests exceeding configured rate limits per client or IP',
      'Support multiple algorithms: token bucket, sliding window log, sliding window counter',
      'Return appropriate HTTP 429 headers with retry-after information',
      'Allow different rate limits for different API endpoints and user tiers',
    ],
    nonFunctionalRequirements: [
      'Add no more than 1-2ms of latency to each request',
      'Achieve high availability so the API remains accessible if the limiter fails',
      'Support at least 1 million rate limit checks per second',
      'Ensure consistency in distributed deployments to prevent limit bypass',
    ],
    constraints: [
      'Must work across multiple data centers with distributed state',
      'Handle clock skew and synchronization across nodes',
      'Support at least 100K unique client identifiers concurrently',
    ],
    estimationHints: [
      'At 1M RPS with a 60-second window, each client entry in Redis uses ~100 bytes, so 100K clients = ~10MB',
      'Redis can handle 100K+ operations/second per node, so a small cluster suffices for rate limit checks',
    ],
    topics: ['rate-limiting', 'distributed-cache', 'api-gateway', 'throttling', 'token-bucket'],
  },
  {
    id: 'sd-016',
    title: 'Proximity Service',
    difficulty: 'medium',
    category: 'Infrastructure',
    description:
      'Design a service that finds nearby businesses or points of interest given a user location and search radius. The system must efficiently index millions of locations and return results within milliseconds, supporting filters for business type, rating, and operating hours.',
    keyComponents: [
      'Geospatial Index (Geohash/Quadtree)',
      'Location Database',
      'Search API',
      'Cache Layer',
      'Business Data Store',
    ],
    functionalRequirements: [
      'Return businesses within a given radius of a latitude/longitude coordinate',
      'Support filtering by business type, rating, price range, and hours of operation',
      'Allow business owners to add, update, and remove their listing',
      'Rank results by relevance combining distance, rating, and popularity',
    ],
    nonFunctionalRequirements: [
      'Query latency under 100ms at the 99th percentile',
      'Support 5,000 queries per second at peak',
      'Tolerate eventual consistency for business data updates within 1 hour',
    ],
    constraints: [
      'Index up to 200 million business locations worldwide',
      'Search radius ranges from 500 meters to 50 kilometers',
      'Business data updates up to 10,000 per day',
    ],
    estimationHints: [
      '200M businesses at ~1KB each = ~200GB total data, fitting in a sharded database cluster',
      'Geohash with 6-character precision covers ~1.2km x 0.6km cells, suitable for most search radii',
    ],
    topics: ['geospatial-indexing', 'geohash', 'quadtree', 'location-based-services'],
  },
  {
    id: 'sd-018',
    title: 'Google Maps',
    difficulty: 'hard',
    category: 'Infrastructure',
    description:
      'Design a mapping and navigation system that provides real-time directions, traffic-aware routing, and rendered map tiles to millions of concurrent users. The system must process GPS telemetry from drivers, compute optimal routes using graph algorithms, and serve pre-rendered map tiles at multiple zoom levels.',
    keyComponents: [
      'Map Tile Rendering Service',
      'Routing Engine (Graph-based)',
      'Real-time Traffic Aggregator',
      'Geocoding Service',
      'GPS Telemetry Ingestion Pipeline',
      'CDN for Tile Distribution',
    ],
    functionalRequirements: [
      'Render and serve map tiles at multiple zoom levels for the entire world',
      'Compute optimal driving, walking, and transit routes between two points',
      'Incorporate real-time traffic data to adjust route recommendations dynamically',
      'Provide geocoding to convert addresses to coordinates and reverse geocoding',
      'Support ETA estimation that updates as users travel',
    ],
    nonFunctionalRequirements: [
      'Map tile load time under 200ms globally via CDN edge caching',
      'Route computation completes within 500ms for queries up to 500km',
      'Traffic data updates propagate to routing within 2 minutes',
      'System serves 100,000+ concurrent navigation sessions',
    ],
    constraints: [
      'Global road network graph has ~1 billion edges and ~500 million nodes',
      'Process GPS telemetry from 10 million active drivers simultaneously',
      'Pre-render map tiles at ~20 zoom levels covering the entire planet',
      'Total tile storage is on the order of tens of petabytes',
    ],
    estimationHints: [
      'The world road graph at full resolution is ~100GB compressed; hierarchical contraction reduces routing graph by 10x',
      'At zoom level 18, there are ~69 billion tiles (256x256 px); average tile is ~20KB, totaling ~1.4 PB of raw tile data',
      'With 10M active drivers sending GPS pings every 5 seconds, the ingestion rate is ~2M events/second',
    ],
    topics: ['graph-algorithms', 'map-tiling', 'real-time-traffic', 'geocoding', 'shortest-path'],
  },
  {
    id: 'sd-020',
    title: 'Metrics Monitoring and Alerting System',
    difficulty: 'medium',
    category: 'Infrastructure',
    description:
      'Design a system that collects, stores, and visualizes time-series metrics from thousands of servers and triggers alerts when metrics breach defined thresholds. The system must handle high write throughput for metric ingestion, support flexible queries for dashboards, and deliver alerts within seconds of threshold violations.',
    keyComponents: [
      'Metric Collection Agent',
      'Ingestion Pipeline (Kafka)',
      'Time-Series Database',
      'Query Engine',
      'Alerting Rule Evaluator',
      'Dashboard UI',
    ],
    functionalRequirements: [
      'Ingest metrics from application hosts via push or pull collection models',
      'Store time-series data with configurable retention and downsampling policies',
      'Support PromQL-like queries for building dashboards and ad-hoc exploration',
      'Evaluate alerting rules continuously and send notifications via email, Slack, or PagerDuty',
      'Allow users to define custom metrics, dashboards, and alert thresholds',
    ],
    nonFunctionalRequirements: [
      'Ingest up to 10 million data points per second',
      'Alerts fire within 30 seconds of a threshold breach',
      'Dashboard queries return within 2 seconds even over multi-day ranges',
      'Data durability of 99.999% with no metric loss during ingestion',
    ],
    constraints: [
      'Monitor 10,000 hosts each emitting 500 metrics at 10-second intervals',
      'Retain raw data for 30 days and downsampled data for 1 year',
      'Support up to 1,000 concurrent dashboard users',
    ],
    estimationHints: [
      '10K hosts x 500 metrics x 6 samples/min = 30M data points/min or 500K/sec at steady state',
      'Each data point (timestamp + value + tags) is ~50 bytes; at 500K/sec that is ~25MB/sec raw, ~2TB/day',
    ],
    topics: ['time-series-database', 'stream-processing', 'alerting', 'monitoring', 'dashboards'],
  },

  // ==================== DISTRIBUTED SYSTEMS (4 problems) ====================
  {
    id: 'sd-005',
    title: 'Design Consistent Hashing',
    difficulty: 'medium',
    category: 'Distributed Systems',
    description:
      'Design a consistent hashing mechanism that distributes data or requests across a dynamic set of servers. When servers are added or removed, only a minimal fraction of keys should be remapped. The system should handle hotspots through virtual nodes and support heterogeneous server capacities.',
    keyComponents: [
      'Hash Ring',
      'Virtual Nodes',
      'Node Manager',
      'Key Mapper',
      'Rebalancing Coordinator',
    ],
    functionalRequirements: [
      'Map any key to a server using a hash ring structure',
      'Add or remove servers with minimal key redistribution',
      'Support virtual nodes to ensure even data distribution',
      'Handle heterogeneous server capacities by assigning proportional virtual nodes',
    ],
    nonFunctionalRequirements: [
      'Key lookup completes in O(log N) time where N is the number of virtual nodes',
      'Adding or removing a node redistributes at most K/N keys on average',
      'Standard deviation of load across servers stays within 10% of the mean',
    ],
    constraints: [
      'Support up to 1,000 physical servers in the ring',
      'Each physical server maps to 100-200 virtual nodes for uniformity',
      'Must handle concurrent ring modifications safely',
    ],
    estimationHints: [
      'With 100 physical nodes and 150 virtual nodes each, the ring has 15,000 points; a sorted array + binary search is efficient',
      'When one of 100 nodes is removed, roughly 1% of keys need to remap, compared to ~99% with naive hashing',
    ],
    topics: ['consistent-hashing', 'virtual-nodes', 'load-balancing', 'distributed-systems'],
  },
  {
    id: 'sd-007',
    title: 'Design A Unique ID Generator In Distributed Systems',
    difficulty: 'medium',
    category: 'Distributed Systems',
    description:
      'Design a system that generates globally unique, roughly time-ordered IDs at high throughput across multiple data centers without coordination. The IDs should be 64-bit integers suitable for use as database primary keys and should be sortable by generation time.',
    keyComponents: [
      'ID Generation Service',
      'Timestamp Component',
      'Data Center / Machine ID Registry',
      'Sequence Counter',
      'Clock Synchronization (NTP)',
    ],
    functionalRequirements: [
      'Generate unique 64-bit IDs across all nodes without central coordination',
      'Ensure IDs are roughly sortable by creation time',
      'Support at least 10,000 unique IDs per second per node',
      'Handle clock drift gracefully without producing duplicates',
    ],
    nonFunctionalRequirements: [
      'ID generation latency under 1ms',
      'Zero collision probability across all nodes over the system lifetime',
      'System continues generating IDs even during partial network partitions',
    ],
    constraints: [
      'Deploy across up to 32 data centers with up to 1,024 machines per data center',
      'IDs must fit in a 64-bit integer for database compatibility',
      'Clock skew between nodes can be up to a few hundred milliseconds',
    ],
    estimationHints: [
      'Snowflake layout: 1 bit sign + 41 bits timestamp (69 years) + 10 bits machine ID (1024 machines) + 12 bits sequence (4096/ms)',
      'At 4096 IDs/ms per machine with 1024 machines, the theoretical max is ~4 billion IDs/second',
    ],
    topics: ['snowflake-id', 'distributed-id-generation', 'clock-synchronization', 'uuid'],
  },
  {
    id: 'sd-019',
    title: 'Distributed Message Queue',
    difficulty: 'hard',
    category: 'Distributed Systems',
    description:
      'Design a distributed message queue similar to Apache Kafka that supports publish-subscribe and point-to-point messaging patterns. The system must guarantee message ordering within partitions, provide at-least-once delivery semantics, and handle billions of messages per day with configurable retention.',
    keyComponents: [
      'Broker Cluster',
      'Topic / Partition Manager',
      'Producer Client Library',
      'Consumer Group Coordinator',
      'Replication Controller',
      'ZooKeeper / Metadata Store',
    ],
    functionalRequirements: [
      'Publish messages to named topics that are partitioned for parallelism',
      'Consume messages in order within each partition using consumer groups',
      'Replicate partitions across brokers for fault tolerance',
      'Support configurable retention policies (time-based and size-based)',
      'Allow consumers to replay messages from any offset',
    ],
    nonFunctionalRequirements: [
      'Sustain 1 million messages per second write throughput',
      'End-to-end latency under 10ms at the 99th percentile',
      'No message loss when fewer than half the replicas fail simultaneously',
      'Support thousands of topics and consumer groups concurrently',
    ],
    constraints: [
      'Cluster size ranges from 10 to 1,000 broker nodes',
      'Individual messages range from 100 bytes to 1 MB',
      'Retain messages for up to 7 days by default',
      'Handle up to 100,000 partitions across the cluster',
    ],
    estimationHints: [
      'At 1M msgs/sec with an average 1KB message, throughput is ~1GB/sec; 7-day retention = ~600TB of storage',
      'With a replication factor of 3, total storage triples to ~1.8PB; each broker needs multi-TB SSDs',
    ],
    topics: ['message-queue', 'pub-sub', 'partitioning', 'replication', 'consumer-groups'],
  },
  {
    id: 'sd-023',
    title: 'Distributed Email Service',
    difficulty: 'hard',
    category: 'Distributed Systems',
    description:
      'Design a scalable email service that handles sending, receiving, storing, and searching emails for hundreds of millions of users. The system must support SMTP for interoperability, store attachments efficiently, and provide fast full-text search across a user mailbox containing thousands of emails.',
    keyComponents: [
      'SMTP Gateway (Inbound/Outbound)',
      'Message Store (Blob + Metadata)',
      'Full-Text Search Index',
      'Attachment Storage (Object Store)',
      'Spam and Virus Filter Pipeline',
      'Push Notification Service',
    ],
    functionalRequirements: [
      'Send and receive emails via SMTP with support for attachments up to 25 MB',
      'Organize emails into folders, labels, and threads',
      'Provide full-text search across subject, body, sender, and attachment names',
      'Support push notifications for new email arrival on mobile and desktop',
      'Detect and filter spam and malicious attachments before delivery',
    ],
    nonFunctionalRequirements: [
      'Email delivery latency under 5 seconds for internal users and under 30 seconds for external routing',
      'Search returns results within 500ms for mailboxes with up to 100K emails',
      '99.99% availability with no email loss',
      'Support 1 billion stored emails with efficient archival for older messages',
    ],
    constraints: [
      'Serve 500 million user accounts with an average of 50 emails received per day',
      'Average email size is 50KB; 5% of emails have attachments averaging 2MB',
      'Retain all emails indefinitely by default with optional user-configured auto-delete',
      'Must interoperate with external SMTP servers following RFC 5321',
    ],
    estimationHints: [
      '500M users x 50 emails/day = 25B emails/day; at 50KB avg = ~1.25PB/day of email data',
      'Attachment storage: 5% of 25B emails with 2MB avg = 2.5PB/day; object storage with dedup helps significantly',
      'Full-text index for 100K emails per user at ~10KB index/email = ~1GB per user; inverted index with sharding required',
    ],
    topics: ['smtp', 'full-text-search', 'object-storage', 'spam-filtering', 'push-notifications'],
  },

  // ==================== DATA SYSTEMS (4 problems) ====================
  {
    id: 'sd-006',
    title: 'Design A Key-value Store',
    difficulty: 'medium',
    category: 'Data Systems',
    description:
      'Design a distributed key-value store that supports put and get operations with tunable consistency. The system should partition data across multiple nodes, replicate for fault tolerance, and handle node failures gracefully using techniques like consistent hashing, vector clocks, and gossip protocols.',
    keyComponents: [
      'Consistent Hash Ring',
      'Replication Manager',
      'Write-Ahead Log',
      'SSTable / LSM Tree',
      'Gossip Protocol',
      'Conflict Resolution (Vector Clocks)',
    ],
    functionalRequirements: [
      'Store and retrieve values by key with put(key, value) and get(key) operations',
      'Partition data across nodes using consistent hashing',
      'Replicate each key to N successor nodes for fault tolerance',
      'Allow tunable consistency via quorum reads and writes (R + W > N)',
    ],
    nonFunctionalRequirements: [
      'Read and write latency under 10ms at the 99th percentile',
      'Availability of 99.99% even during single-node failures',
      'Support up to 1 million operations per second across the cluster',
    ],
    constraints: [
      'Cluster size ranges from 10 to 500 nodes',
      'Key size up to 256 bytes; value size up to 1 MB',
      'Total data size up to 100 TB across the cluster',
      'Must handle network partitions using hinted handoff',
    ],
    estimationHints: [
      'With 100TB of data and a replication factor of 3, total storage is 300TB; across 100 nodes that is 3TB per node',
      'At 1M ops/sec across 100 nodes, each node handles ~10K ops/sec, well within SSD IOPS capacity',
    ],
    topics: ['key-value-store', 'consistent-hashing', 'replication', 'lsm-tree', 'gossip-protocol'],
  },
  {
    id: 'sd-015',
    title: 'Design Google Drive',
    difficulty: 'hard',
    category: 'Data Systems',
    description:
      'Design a cloud file storage and synchronization service that allows users to upload, download, and share files across devices. The system must handle large files efficiently using block-level deduplication and delta sync, maintain file version history, and resolve conflicts when the same file is edited on multiple devices offline.',
    keyComponents: [
      'Block Storage Service',
      'Metadata Database',
      'Sync Engine',
      'Notification Service (WebSocket)',
      'CDN for Downloads',
      'Deduplication Engine',
    ],
    functionalRequirements: [
      'Upload and download files of any type up to 15 GB',
      'Synchronize file changes across all linked devices in near-real-time',
      'Share files and folders with other users with configurable permissions',
      'Maintain version history for each file and support rollback',
      'Detect and resolve conflicts from concurrent offline edits',
    ],
    nonFunctionalRequirements: [
      'Upload throughput supports files up to 15 GB within 30 minutes on a fast connection',
      'Sync latency under 10 seconds for small file changes across devices',
      '99.999% data durability with no data loss',
      'Support 100 million registered users with 10 million daily active',
    ],
    constraints: [
      'Average user stores 5 GB of files; 100M users total ~500 PB of logical storage',
      'Block-level dedup and compression reduce physical storage by 30-50%',
      'Peak upload rate of 100K files per minute across all users',
      'Each file is split into 4 MB blocks for chunked upload and delta sync',
    ],
    estimationHints: [
      '100M users x 5GB avg = 500PB logical; with 40% dedup savings, physical storage is ~300PB',
      'Metadata per file is ~1KB; with 100 files per user average, metadata DB is ~10TB total',
      'Delta sync: for a 100MB file with a 1% change, only ~1MB of blocks need re-uploading',
    ],
    topics: ['file-sync', 'block-storage', 'deduplication', 'conflict-resolution', 'versioning'],
  },
  {
    id: 'sd-021',
    title: 'Ad Click Event Aggregation',
    difficulty: 'medium',
    category: 'Data Systems',
    description:
      'Design a real-time data pipeline that ingests billions of ad click events daily, aggregates them by multiple dimensions (advertiser, campaign, geography, time), and provides near-real-time analytics dashboards. The system must handle late-arriving events, ensure exactly-once counting semantics, and support both real-time and batch reconciliation.',
    keyComponents: [
      'Event Ingestion Service',
      'Stream Processing Engine (Flink/Spark)',
      'Aggregation Store (OLAP Database)',
      'Message Queue (Kafka)',
      'Batch Reconciliation Pipeline',
      'Dashboard API',
    ],
    functionalRequirements: [
      'Ingest ad click events with advertiser ID, campaign ID, timestamp, user info, and geo data',
      'Aggregate click counts by advertiser, campaign, time window, and geography in real-time',
      'Support querying aggregated data with flexible time ranges and dimension filters',
      'Handle late-arriving events by updating aggregations within a configurable watermark window',
      'Reconcile real-time counts with batch-computed ground truth daily',
    ],
    nonFunctionalRequirements: [
      'End-to-end aggregation latency under 1 minute from click to dashboard visibility',
      'Exactly-once counting to prevent over- or under-reporting ad spend',
      'System processes 10 billion events per day at peak',
      'Query latency under 1 second for standard dashboard queries',
    ],
    constraints: [
      'Peak click rate of 200,000 events per second during high-traffic hours',
      'Each click event is approximately 500 bytes including metadata',
      'Retain raw events for 30 days and aggregated data for 2 years',
      'Support 50,000 unique advertisers and 500,000 campaigns',
    ],
    estimationHints: [
      '10B events/day at 500 bytes = ~5TB/day of raw data; 30-day retention = 150TB',
      'At 200K events/sec, a Kafka cluster with 50 partitions handles ingestion; Flink processes with ~100 task slots',
    ],
    topics: [
      'stream-processing',
      'event-aggregation',
      'exactly-once-semantics',
      'olap',
      'lambda-architecture',
    ],
  },
  {
    id: 'sd-024',
    title: 'S3-like Object Storage',
    difficulty: 'hard',
    category: 'Data Systems',
    description:
      'Design a large-scale object storage service similar to Amazon S3 that stores arbitrary blobs (images, videos, backups) with high durability and availability. The system must support buckets and object keys, provide RESTful APIs for CRUD operations, and replicate data across availability zones for resilience.',
    keyComponents: [
      'API Gateway',
      'Metadata Service',
      'Data Placement Service',
      'Storage Nodes (Erasure-Coded)',
      'Replication Controller',
      'Garbage Collection Service',
    ],
    functionalRequirements: [
      'Create, list, and delete buckets as logical namespaces for objects',
      'Upload, download, and delete objects up to 5 TB in size via RESTful API',
      'Support multipart uploads for objects larger than 100 MB',
      'Provide object versioning and lifecycle management policies',
      'Generate pre-signed URLs for time-limited access to private objects',
    ],
    nonFunctionalRequirements: [
      '99.999999999% (11 nines) data durability per object per year',
      '99.99% availability for read and write operations',
      'First-byte latency under 200ms for objects up to 1 GB',
      'Support exabyte-scale total storage across the service',
    ],
    constraints: [
      'Store trillions of objects across millions of buckets',
      'Individual objects range from 1 byte to 5 TB',
      'Replicate or erasure-code each object across at least 3 availability zones',
      'Handle 100,000+ PUT and 1,000,000+ GET requests per second globally',
    ],
    estimationHints: [
      'Erasure coding (e.g., 8+4 Reed-Solomon) provides 11 nines durability with 1.5x storage overhead vs 3x for full replication',
      'Metadata for 1 trillion objects at ~500 bytes each = ~500TB of metadata; requires a distributed metadata store with sharding',
      'At 1M GET/sec with average 1MB objects, read bandwidth is ~1TB/sec, served from a fleet of thousands of storage nodes',
    ],
    topics: [
      'object-storage',
      'erasure-coding',
      'data-durability',
      'multipart-upload',
      'metadata-management',
    ],
  },

  // ==================== WEB SYSTEMS (6 problems) ====================
  {
    id: 'sd-008',
    title: 'Design A URL Shortener',
    difficulty: 'medium',
    category: 'Web Systems',
    description:
      'Design a URL shortening service like bit.ly that converts long URLs into short, unique aliases and redirects users seamlessly. The system must handle high read traffic for redirects, provide analytics on click counts, and ensure generated short URLs are unique and not easily guessable.',
    keyComponents: [
      'URL Generation Service',
      'Redirect Service',
      'Database (Key-Value Store)',
      'Cache Layer (Redis)',
      'Analytics Pipeline',
    ],
    functionalRequirements: [
      'Given a long URL, generate a unique short URL with a 7-character alphanumeric code',
      'Redirect users from the short URL to the original long URL with 301/302 responses',
      'Provide analytics including total clicks, referrers, and geographic distribution',
      'Allow custom aliases for short URLs',
      'Support optional expiration dates for short URLs',
    ],
    nonFunctionalRequirements: [
      'Redirect latency under 50ms at the 99th percentile',
      'System handles a 100:1 read-to-write ratio',
      '99.9% availability for the redirect service',
    ],
    constraints: [
      'Generate 100 million new short URLs per month',
      'Handle 10 billion redirects per month at peak',
      'Store URLs for up to 5 years by default',
      'Short URL codes must be 7 characters using [a-zA-Z0-9]',
    ],
    estimationHints: [
      '7-character codes with 62 possible characters yield 62^7 = ~3.5 trillion unique combinations',
      '100M URLs/month x 12 months x 5 years = 6B records; at ~500 bytes each = ~3TB total storage',
    ],
    topics: ['url-shortening', 'base62-encoding', 'caching', 'database-sharding', 'analytics'],
  },
  {
    id: 'sd-009',
    title: 'Design A Web Crawler',
    difficulty: 'medium',
    category: 'Web Systems',
    description:
      'Design a web crawler that systematically downloads and indexes web pages across the internet. The system must handle politeness policies (respecting robots.txt), avoid duplicate page downloads, prioritize important pages, and scale to crawl billions of pages within a reasonable time frame.',
    keyComponents: [
      'URL Frontier (Priority Queue)',
      'DNS Resolver Cache',
      'HTML Downloader Pool',
      'Content Deduplication (SimHash)',
      'URL Extractor and Normalizer',
      'Robots.txt Parser and Cache',
    ],
    functionalRequirements: [
      'Crawl web pages starting from seed URLs and discover new links recursively',
      'Respect robots.txt directives and per-domain crawl rate limits',
      'Detect and skip duplicate or near-duplicate content',
      'Prioritize URLs based on PageRank, freshness, and domain authority',
      'Store crawled content and metadata for downstream indexing',
    ],
    nonFunctionalRequirements: [
      'Crawl 1 billion pages per week across the internet',
      'Politeness: no more than 1 request per second per domain',
      'System tolerates individual crawler node failures without data loss',
      'Re-crawl important pages within 24 hours to maintain freshness',
    ],
    constraints: [
      'The internet has over 5 billion indexable pages',
      'Average web page size is 500 KB including resources',
      'Must handle dynamic JavaScript-rendered pages for key domains',
      'DNS resolution must be cached to avoid becoming a bottleneck',
    ],
    estimationHints: [
      '1B pages/week = ~1,650 pages/sec; at 500KB per page, download bandwidth is ~825MB/sec or ~6.6 Gbps',
      'Storing metadata for 1B pages at ~1KB each = ~1TB; full page content at 500KB avg (compressed to ~100KB) = ~100TB',
    ],
    topics: [
      'web-crawling',
      'url-frontier',
      'deduplication',
      'politeness-policy',
      'distributed-crawling',
    ],
  },
  {
    id: 'sd-010',
    title: 'Design A Notification System',
    difficulty: 'medium',
    category: 'Web Systems',
    description:
      'Design a notification system that delivers messages to users across multiple channels including push notifications, SMS, and email. The system must handle millions of notifications per day, support user preferences for channel and frequency, and ensure reliable delivery with retry logic.',
    keyComponents: [
      'Notification Service API',
      'Message Queue (per channel)',
      'Push Notification Provider (APNs/FCM)',
      'SMS Gateway (Twilio)',
      'Email Sender (SES/SendGrid)',
      'User Preference Store',
    ],
    functionalRequirements: [
      'Send notifications via push, SMS, and email channels based on event triggers',
      'Respect user preferences for notification channels, frequency caps, and quiet hours',
      'Support both immediate and scheduled notification delivery',
      'Provide delivery status tracking and analytics for each notification',
      'Allow users to opt-out of specific notification categories',
    ],
    nonFunctionalRequirements: [
      'Deliver push notifications within 5 seconds of triggering',
      'Process 10 million notifications per day with peak bursts of 1,000/second',
      'No duplicate delivery: exactly-once or at-most-once semantics depending on channel',
      '99.9% delivery success rate across all channels',
    ],
    constraints: [
      'Support 100 million registered users across iOS, Android, and web platforms',
      'Rate limit SMS to avoid carrier throttling (100 messages/second per phone number pool)',
      'Email sender reputation must be maintained to avoid spam classification',
    ],
    estimationHints: [
      '10M notifications/day across 3 channels = ~3.3M per channel/day or ~40/sec average per channel',
      'User preference store: 100M users x ~200 bytes = ~20GB, easily fits in a single database or cache',
    ],
    topics: [
      'push-notifications',
      'message-queue',
      'notification-channels',
      'rate-limiting',
      'delivery-tracking',
    ],
  },
  {
    id: 'sd-011',
    title: 'Design A News Feed System',
    difficulty: 'medium',
    category: 'Web Systems',
    description:
      'Design a news feed system similar to Facebook or Twitter that aggregates posts from friends or followed accounts and presents them in a personalized, ranked timeline. The system must balance between pre-computing feeds (fanout on write) and computing them on the fly (fanout on read) based on user activity levels.',
    keyComponents: [
      'Feed Generation Service',
      'Feed Cache',
      'Post Storage',
      'Social Graph Service',
      'Ranking and ML Model',
      'Fanout Service',
    ],
    functionalRequirements: [
      'Display a personalized feed of posts from friends and followed accounts',
      'Support posting text, images, and videos that appear in followers feeds',
      'Rank feed items by relevance using engagement signals and recency',
      'Support pagination with infinite scroll for feed consumption',
      'Allow users to like, comment, and share posts inline',
    ],
    nonFunctionalRequirements: [
      'Feed load time under 500ms for the first page',
      'New posts appear in followers feeds within 5 seconds',
      'System supports 500 million daily active users',
      'Feed generation handles the celebrity problem (users with millions of followers)',
    ],
    constraints: [
      'Average user follows 200 accounts and posts 2 times per day',
      'Celebrity accounts can have up to 100 million followers',
      'Feed shows the top 50 posts per page with infinite scroll',
      'Total daily post volume is ~1 billion posts across all users',
    ],
    estimationHints: [
      'Fanout on write: 1B posts x 200 avg followers = 200B feed writes/day; celebrities must use fanout on read instead',
      'Feed cache per user: 500 post IDs x 8 bytes = 4KB per user; 500M DAU = ~2TB of cached feeds in Redis',
    ],
    topics: ['news-feed', 'fanout', 'ranking', 'social-graph', 'caching'],
  },
  {
    id: 'sd-013',
    title: 'Design A Search Autocomplete System',
    difficulty: 'medium',
    category: 'Web Systems',
    description:
      'Design a search autocomplete (typeahead) system that suggests the top matching queries as users type each character. The system must return suggestions within 100ms, learn from user search behavior to improve suggestions over time, and handle hundreds of thousands of requests per second during peak hours.',
    keyComponents: [
      'Trie Data Structure',
      'Query Aggregation Service',
      'Ranking Engine',
      'Cache Layer',
      'Data Collection Pipeline',
    ],
    functionalRequirements: [
      'Return the top 5-10 query suggestions for each prefix typed by the user',
      'Rank suggestions by popularity, recency, and personalization signals',
      'Update suggestion rankings based on aggregated search query data',
      'Filter out offensive, dangerous, or legally restricted suggestions',
      'Support multi-language autocomplete with locale-specific suggestions',
    ],
    nonFunctionalRequirements: [
      'Response latency under 100ms at the 99th percentile',
      'Handle 100,000 autocomplete requests per second at peak',
      'Suggestion freshness: new trending queries appear within 15 minutes',
      'System remains available during trie rebuilds and updates',
    ],
    constraints: [
      'Vocabulary of 5 billion unique query strings aggregated from search logs',
      'Average query length is 20 characters; each keystroke triggers a request',
      'Daily search volume is 5 billion queries across all users',
      'Trie must be compact enough to fit in memory across a server cluster',
    ],
    estimationHints: [
      '5B unique queries at 20 chars avg = ~100GB of raw strings; a compressed trie reduces this to ~20-30GB, fitting in memory across a few servers',
      'At 100K RPS, each request traverses a trie path of avg depth 20; modern servers handle this easily with in-memory data',
    ],
    topics: ['trie', 'typeahead', 'ranking', 'data-aggregation', 'caching'],
  },
  {
    id: 'sd-022',
    title: 'Hotel Reservation System',
    difficulty: 'medium',
    category: 'Web Systems',
    description:
      'Design an online hotel reservation system that allows users to search for available rooms, view pricing, and make bookings with guaranteed inventory accuracy. The system must handle concurrent booking attempts for the same room without double-booking, support cancellations with refund policies, and integrate with multiple hotel property management systems.',
    keyComponents: [
      'Search and Availability Service',
      'Booking Service',
      'Inventory Management (Pessimistic/Optimistic Locking)',
      'Payment Integration',
      'Hotel Property Management API',
      'Notification Service',
    ],
    functionalRequirements: [
      'Search for available rooms by location, date range, guest count, and room type',
      'Display room details, pricing, amenities, and photos',
      'Process bookings with payment and send confirmation notifications',
      'Handle cancellations and modifications according to hotel policies',
      'Sync real-time inventory with hotel property management systems',
    ],
    nonFunctionalRequirements: [
      'Search results return within 2 seconds including availability checks',
      'No double-booking of the same room on overlapping dates',
      'System supports 50,000 concurrent booking sessions during peak travel periods',
      '99.99% availability for the booking workflow',
    ],
    constraints: [
      'Manage inventory for 500,000 hotels with an average of 100 rooms each',
      'Peak booking rate of 1,000 bookings per second during holiday seasons',
      'Search database covers 100 million room-nights of availability',
      'Payment processing must complete within 10 seconds',
    ],
    estimationHints: [
      '500K hotels x 100 rooms x 365 days = ~18B room-night records; at ~100 bytes each = ~1.8TB for the availability index',
      'At 1,000 bookings/sec, optimistic concurrency control with retry handles most conflicts; pessimistic locking used only for high-demand rooms',
    ],
    topics: [
      'booking-system',
      'concurrency-control',
      'inventory-management',
      'payment-integration',
      'search',
    ],
  },

  // ==================== REAL-TIME SYSTEMS (4 problems) ====================
  {
    id: 'sd-012',
    title: 'Design A Chat System',
    difficulty: 'medium',
    category: 'Real-time Systems',
    description:
      'Design a real-time chat application supporting one-on-one and group messaging, online presence indicators, and message history. The system must deliver messages with minimal latency, handle users going offline and coming back online, and store chat history for later retrieval.',
    keyComponents: [
      'WebSocket Gateway',
      'Message Routing Service',
      'Message Store (NoSQL)',
      'Presence Service',
      'Push Notification Fallback',
      'Group Management Service',
    ],
    functionalRequirements: [
      'Send and receive real-time one-on-one messages between users',
      'Create and manage group chats with up to 500 members',
      'Show online/offline/typing presence indicators for contacts',
      'Store and retrieve full message history with pagination',
      'Support message delivery receipts (sent, delivered, read)',
    ],
    nonFunctionalRequirements: [
      'Message delivery latency under 200ms for online recipients',
      'Support 50 million concurrent WebSocket connections',
      '99.99% message delivery reliability with at-least-once semantics',
      'Message ordering guaranteed within each conversation',
    ],
    constraints: [
      'Serve 500 million registered users with 50 million daily active',
      'Average user sends 40 messages per day',
      'Group chats support up to 500 members each',
      'Message size limit of 10 KB for text; attachments up to 100 MB via object storage',
    ],
    estimationHints: [
      '50M DAU x 40 msgs/day = 2B messages/day or ~23K messages/sec; each message at ~1KB = ~2TB/day of storage',
      '50M concurrent WebSocket connections require ~500 gateway servers at 100K connections each',
    ],
    topics: ['websocket', 'real-time-messaging', 'presence', 'message-ordering', 'group-chat'],
  },
  {
    id: 'sd-014',
    title: 'Design YouTube',
    difficulty: 'hard',
    category: 'Real-time Systems',
    description:
      'Design a video sharing platform that supports uploading, transcoding, storing, and streaming video content to millions of concurrent viewers. The system must transcode uploaded videos into multiple resolutions and formats, serve streams via adaptive bitrate, and recommend content using engagement signals.',
    keyComponents: [
      'Video Upload Service',
      'Transcoding Pipeline',
      'CDN for Video Delivery',
      'Metadata and Search Service',
      'Recommendation Engine',
      'Adaptive Bitrate Streaming (HLS/DASH)',
    ],
    functionalRequirements: [
      'Upload videos up to 12 hours in length and 256 GB in size',
      'Transcode each video into multiple resolutions (360p, 720p, 1080p, 4K) and codecs',
      'Stream videos with adaptive bitrate that adjusts to viewer bandwidth',
      'Display video metadata, comments, likes, and view counts',
      'Recommend related videos based on viewing history and engagement patterns',
    ],
    nonFunctionalRequirements: [
      'Video playback starts within 2 seconds of clicking play',
      'Support 1 million concurrent video streams globally',
      'Transcoding completes within 1 hour for a 1-hour video',
      '99.9% availability for the video streaming service',
    ],
    constraints: [
      'Receive 500 hours of new video uploads every minute',
      'Store over 1 billion videos with an average original size of 500 MB',
      'Each video is transcoded into 5 resolutions, tripling storage per video',
      'Peak bandwidth demand reaches multiple terabits per second globally',
    ],
    estimationHints: [
      '500 hrs/min of new video at 500MB/hr original = ~250GB/min uploaded; with 3x transcoding expansion = ~750GB/min or ~1PB/day',
      '1B videos x 500MB avg x 3x transcoding = ~1.5 exabytes total storage; CDN edge caching reduces origin load by 95%+',
      '1M concurrent streams at 5Mbps avg = 5Tbps total egress bandwidth',
    ],
    topics: ['video-streaming', 'transcoding', 'cdn', 'adaptive-bitrate', 'recommendation-engine'],
  },
  {
    id: 'sd-017',
    title: 'Nearby Friends',
    difficulty: 'medium',
    category: 'Real-time Systems',
    description:
      'Design a feature that shows users which of their friends are currently nearby in real-time. The system must continuously receive location updates from mobile clients, compute pairwise distances between friends, and push notifications when friends come within a configurable proximity radius.',
    keyComponents: [
      'Location Ingestion Service',
      'Geospatial Pub-Sub Channel',
      'Friend Graph Service',
      'Distance Computation Engine',
      'WebSocket/Push Gateway',
    ],
    functionalRequirements: [
      'Receive periodic location updates from opted-in users (every 30 seconds)',
      'Determine which friends are within a configurable distance (default 5 km)',
      'Display nearby friends on a map with approximate distance and last update time',
      'Push real-time notifications when a friend enters or leaves proximity',
      'Respect privacy settings allowing users to hide their location from specific friends',
    ],
    nonFunctionalRequirements: [
      'Nearby status updates propagate within 10 seconds of a location change',
      'Support 10 million simultaneously active users sharing location',
      'Battery-efficient: minimize GPS polling frequency on client devices',
      'Location data encrypted in transit and at rest with 24-hour auto-deletion',
    ],
    constraints: [
      'Average user has 400 friends; 10% are concurrently active = 40 relevant friends per check',
      '10M active users sending updates every 30 seconds = ~333K updates/second',
      'Proximity radius configurable from 500 meters to 50 km',
    ],
    estimationHints: [
      '333K location updates/sec with ~100 bytes per update = ~33MB/sec ingestion bandwidth',
      'Geohash-based pub-sub: partition users into geohash cells; only compare users in the same or adjacent cells to reduce computation from O(N^2) to O(N)',
    ],
    topics: [
      'real-time-location',
      'geospatial-pub-sub',
      'proximity-detection',
      'push-notifications',
    ],
  },
  {
    id: 'sd-025',
    title: 'Real-time Gaming Leaderboard',
    difficulty: 'medium',
    category: 'Real-time Systems',
    description:
      "Design a global leaderboard system for an online game that ranks millions of players by score in real-time. The system must support instant score updates, fast rank lookups, and display the top N players as well as a player's position and neighboring ranks. It should handle score spikes during tournaments and in-game events.",
    keyComponents: [
      'Score Ingestion Service',
      'Sorted Set Data Store (Redis)',
      'Leaderboard Query API',
      'Cache for Top-N Results',
      'Event-driven Rank Change Notifier',
    ],
    functionalRequirements: [
      'Update a player score and immediately reflect the new rank on the leaderboard',
      'Retrieve the top N players globally or within a specific region or friend group',
      "Fetch a player's current rank and the players immediately above and below",
      'Support multiple leaderboards (daily, weekly, all-time, per-game-mode)',
      'Reset periodic leaderboards on a schedule while archiving previous results',
    ],
    nonFunctionalRequirements: [
      'Score update and rank retrieval latency under 50ms',
      'Handle 100,000 score updates per second during peak tournament events',
      'Support 25 million players on a single leaderboard',
      'Consistent ranking: two players with the same score are ranked deterministically',
    ],
    constraints: [
      '25 million players per leaderboard',
      'Scores range from 0 to 10 billion (64-bit integers)',
      'Multiple concurrent leaderboards (up to 100 active at a time)',
      'Daily leaderboard reset at midnight UTC with full history archival',
    ],
    estimationHints: [
      'Redis sorted set with 25M members: each entry ~100 bytes (member + score) = ~2.5GB per leaderboard; 100 leaderboards = ~250GB total',
      'Redis ZADD and ZRANK are O(log N); at 25M entries, log2(25M) = ~25 operations, easily handled at 100K ops/sec',
    ],
    topics: ['sorted-set', 'real-time-ranking', 'redis', 'leaderboard', 'event-driven'],
  },

  // ==================== FINTECH (3 problems) ====================
  {
    id: 'sd-026',
    title: 'Payment System',
    difficulty: 'hard',
    category: 'Fintech',
    description:
      'Design a payment processing system that handles credit card transactions, bank transfers, and digital wallet payments for an e-commerce platform. The system must ensure exactly-once payment execution using idempotency keys, support multi-currency transactions, and comply with PCI DSS security standards while maintaining a complete audit trail.',
    keyComponents: [
      'Payment Gateway API',
      'Payment State Machine',
      'Idempotency Key Store',
      'Payment Service Provider (PSP) Integration',
      'Ledger / Double-Entry Bookkeeping',
      'Fraud Detection Engine',
    ],
    functionalRequirements: [
      'Process payments via credit card, debit card, bank transfer, and digital wallets',
      'Guarantee exactly-once payment execution through idempotency keys',
      'Support refunds, partial refunds, and chargebacks with proper ledger entries',
      'Handle multi-currency transactions with real-time exchange rate lookup',
      'Maintain a complete double-entry accounting ledger for reconciliation',
    ],
    nonFunctionalRequirements: [
      'Payment processing latency under 3 seconds end-to-end',
      '99.999% availability for the payment API (less than 5 minutes downtime per year)',
      'PCI DSS Level 1 compliance with encryption of all cardholder data',
      'Support 10,000 transactions per second at peak (e.g., flash sales)',
    ],
    constraints: [
      'Process 500 million transactions per month across 50 countries',
      'Support 30+ currencies with daily exchange rate updates',
      'Integrate with at least 5 payment service providers for redundancy',
      'Retain all transaction records for 7 years for regulatory compliance',
    ],
    estimationHints: [
      '500M transactions/month at ~2KB per record (including audit trail) = ~1TB/month; 7-year retention = ~84TB',
      'At 10K TPS peak, the payment state machine must handle concurrent state transitions; optimistic locking with retry on the idempotency key prevents double-charges',
      'Fraud detection model must evaluate within 100ms per transaction to keep total latency under 3 seconds',
    ],
    topics: [
      'payment-processing',
      'idempotency',
      'double-entry-ledger',
      'fraud-detection',
      'pci-compliance',
    ],
  },
  {
    id: 'sd-027',
    title: 'Digital Wallet',
    difficulty: 'medium',
    category: 'Fintech',
    description:
      'Design a digital wallet service that allows users to store funds, send money to other users, pay merchants, and view transaction history. The system must ensure balance consistency with no overdrafts, support concurrent transactions on the same account, and provide real-time balance updates across all user devices.',
    keyComponents: [
      'Wallet Service API',
      'Balance Ledger (ACID-compliant)',
      'Transaction Processor',
      'Event Sourcing Store',
      'Notification Service',
      'KYC / AML Compliance Module',
    ],
    functionalRequirements: [
      'Top up wallet balance from linked bank accounts or cards',
      'Send money to another user by phone number or email with instant transfer',
      'Pay merchants via QR code or in-app payment flow',
      'View complete transaction history with filtering and export',
      'Enforce daily and per-transaction spending limits based on KYC verification level',
    ],
    nonFunctionalRequirements: [
      'Balance updates reflect within 1 second across all devices',
      'Zero tolerance for negative balances or phantom money creation',
      'Transaction processing latency under 500ms for peer-to-peer transfers',
      '99.99% availability for the wallet service',
    ],
    constraints: [
      'Serve 50 million active wallet users',
      'Process 5 million transactions per day with peaks of 500 TPS',
      'Support 10 currencies with cross-currency transfers',
      'Comply with AML regulations requiring suspicious activity reporting',
    ],
    estimationHints: [
      '50M users with ~1KB balance/account metadata = ~50GB for the balance ledger; fits in a sharded relational database',
      '5M transactions/day at ~500 bytes each = ~2.5GB/day of transaction records; event sourcing log grows at this rate',
    ],
    topics: [
      'digital-wallet',
      'event-sourcing',
      'acid-transactions',
      'balance-consistency',
      'kyc-aml',
    ],
  },
  {
    id: 'sd-028',
    title: 'Stock Exchange',
    difficulty: 'hard',
    category: 'Fintech',
    description:
      'Design the core matching engine and supporting infrastructure for a stock exchange that processes buy and sell orders with sub-millisecond latency. The system must maintain a central limit order book for each security, match orders by price-time priority, and broadcast market data to subscribers in real-time while guaranteeing strict ordering and consistency.',
    keyComponents: [
      'Order Gateway',
      'Matching Engine (Order Book)',
      'Market Data Publisher',
      'Trade Confirmation Service',
      'Risk Management Engine',
      'Sequencer (Deterministic Ordering)',
    ],
    functionalRequirements: [
      'Accept limit and market orders for buy and sell sides',
      'Match orders using price-time priority within a central limit order book',
      'Broadcast real-time market data (quotes, trades, order book depth) to subscribers',
      'Support order modifications and cancellations before execution',
      'Generate trade confirmations and settlement instructions for matched orders',
    ],
    nonFunctionalRequirements: [
      'Order-to-acknowledgement latency under 100 microseconds',
      'Process 1 million orders per second for a single security',
      'Strict deterministic ordering: all participants see the same sequence of events',
      '99.999% availability during market hours with zero data loss',
    ],
    constraints: [
      'Trade 10,000 listed securities simultaneously',
      'Market operates 6.5 hours per day, 252 trading days per year',
      'Peak order rate occurs at market open and close (2-3x average)',
      'Regulatory requirement to retain all order and trade data for 7 years',
    ],
    estimationHints: [
      'At 1M orders/sec with ~200 bytes per order, the sequencer processes ~200MB/sec of order flow per security',
      'The matching engine must fit entirely in memory; a single order book with 1M price levels x 100 orders avg = ~20GB, typically much smaller in practice',
      'Market data fan-out: 100K subscribers receiving 100K updates/sec at 100 bytes each = ~10GB/sec of outbound bandwidth',
    ],
    topics: [
      'matching-engine',
      'order-book',
      'low-latency',
      'market-data',
      'deterministic-ordering',
    ],
  },
];

export function getSystemDesignProblemCount(): number {
  return systemDesignProblems.length;
}
