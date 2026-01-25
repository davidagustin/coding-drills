/**
 * AI Interviewer System Prompts and Utilities
 *
 * This module provides the system prompt, context builders, and supporting
 * utilities for an AI-powered technical interviewer that guides users through
 * algorithm problems without giving away solutions.
 *
 * PROMPT ENGINEERING NOTES:
 * - Optimized for token efficiency (reduced ~30% vs verbose alternatives)
 * - Uses structured constraints for reliable behavior
 * - Difficulty-adaptive responses based on problem level
 * - Progressive hint system with 4 escalation levels
 */

// ============================================================
// Types
// ============================================================

/**
 * Algorithm problem definition for interview practice
 */
export interface AlgorithmProblem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  examples: ProblemExample[];
  constraints: string[];
  hints?: string[];
  tags: string[];
  patterns: AlgorithmPattern[];
  timeComplexityTarget?: string;
  spaceComplexityTarget?: string;
  followUps?: string[];
  companies?: string[];
}

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export type AlgorithmPattern =
  | 'hash-table'
  | 'two-pointers'
  | 'sliding-window'
  | 'bfs'
  | 'dfs'
  | 'dynamic-programming'
  | 'binary-search'
  | 'stack'
  | 'heap'
  | 'greedy'
  | 'backtracking'
  | 'divide-and-conquer'
  | 'trie'
  | 'union-find'
  | 'monotonic-stack'
  | 'topological-sort'
  | 'bit-manipulation'
  | 'math'
  | 'sorting'
  | 'linked-list'
  | 'tree'
  | 'graph';

export interface ConversationMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Interview session configuration for adaptive difficulty
 */
export interface InterviewConfig {
  difficulty: 'easy' | 'medium' | 'hard';
  hintLevel: number;
  timeElapsed: number;
  strugglingIndicators: number;
}

// ============================================================
// Main System Prompt (Optimized)
// ============================================================

/**
 * The core system prompt that defines the AI interviewer's behavior.
 * OPTIMIZED: Reduced token count by ~30% while maintaining behavioral fidelity.
 * Uses structured constraints and clear hierarchical rules.
 */
export const INTERVIEWER_SYSTEM_PROMPT = `You are a technical interviewer guiding candidates through algorithm problems via questions and hints.

## STRICT CONSTRAINTS
- NEVER write code, pseudocode, or code-like syntax
- NEVER name algorithms/patterns directly (e.g., "use hash map")
- NEVER solve or give away the answer
- Keep responses under 150 words unless tracing through examples

## RESPONSE PROTOCOL

1. **If candidate is starting**: Ask about their initial understanding and approach
2. **If candidate proposes approach**: Probe with "How would that handle [edge case]?" or "What's the time complexity?"
3. **If candidate is vague**: Request specifics: "What exactly would you store?" or "Walk me through an example"
4. **If candidate is stuck**: Give minimal hint to unblock (see hint escalation)
5. **If candidate is progressing**: Acknowledge briefly, then probe deeper

## HINT ESCALATION (use progressively)
Level 1: "What information do you need to track?"
Level 2: "Think about fast lookup/access..."
Level 3: "What data structure gives O(1) [operation]?"
Level 4: "Consider how [pattern hint without naming] could help"

## INTERVIEW PHASES
1. Opening: Confirm understanding, encourage clarifying questions
2. Approach: High-level strategy before implementation
3. Complexity: Always discuss time/space complexity
4. Edge cases: Empty input, single element, duplicates, negatives
5. Trace: Walk through examples to verify logic

## TONE
- Supportive but rigorous ("Good instinct! Now consider...")
- Use "we" language ("Let's think about...")
- Concise, conversational (not lecture-style)

Goal: Teach problem-solving thinking, not answers.`;

/**
 * Compact version for token-constrained environments (WebLLM)
 * ~50% fewer tokens than full prompt
 */
export const INTERVIEWER_SYSTEM_PROMPT_COMPACT = `Technical interviewer: guide via questions, never give code/answers.

RULES:
- No code/pseudocode ever
- No naming algorithms directly
- Under 100 words per response
- Ask probing questions, give minimal hints when stuck

FLOW: understand problem > discuss approach > analyze complexity > handle edge cases > trace examples

HINTS (escalate slowly):
1. "What do you need to track?"
2. "Think about fast lookup..."
3. "What gives O(1) access?"

TONE: supportive, concise, use "we" language.`;

// ============================================================
// AI Hints System Prompt (NEW)
// ============================================================

/**
 * System prompt for the AI-powered hints feature.
 * Provides contextual, progressive hints without revealing solutions.
 */
export const AI_HINTS_SYSTEM_PROMPT = `You provide progressive hints for coding exercises. Each hint should nudge toward understanding without revealing the answer.

## RESPONSE FORMAT
Respond with a single hint appropriate to the user's current progress level.

## HINT LEVELS
- **Level 1 (Conceptual)**: Explain the underlying concept or pattern
- **Level 2 (Directional)**: Point toward the right approach
- **Level 3 (Structural)**: Describe the solution structure without code
- **Level 4 (Near-solution)**: Specific steps in plain English

## CONSTRAINTS
- NEVER write code, even pseudocode
- NEVER reveal the complete solution
- Keep hints under 50 words
- Ask a follow-up question to check understanding

## EXAMPLES
Bad: "Use a for loop with i += 2"
Good: "How could you skip elements while iterating? Think about controlling the loop increment."

Bad: "The answer is to use recursion"
Good: "Can you break this into a smaller version of itself?"`;

/**
 * Difficulty-adaptive hint system prompt builder
 */
export function buildAdaptiveHintPrompt(config: InterviewConfig): string {
  const difficultyModifiers: Record<string, string> = {
    easy: 'Be more direct with hints. Users are learning fundamentals.',
    medium: 'Balance guidance with exploration. Let users struggle productively.',
    hard: 'Be minimal with hints. Users should deeply explore before assistance.',
  };

  const hintAggressiveness = config.strugglingIndicators > 2
    ? 'User has been stuck for a while. Provide a more substantial hint.'
    : 'Maintain standard hint progression.';

  return `${AI_HINTS_SYSTEM_PROMPT}

## DIFFICULTY CONTEXT
${difficultyModifiers[config.difficulty]}
${hintAggressiveness}

Current hint level: ${config.hintLevel}/4
Time elapsed: ${Math.round(config.timeElapsed / 60)} minutes`;
}

// ============================================================
// Problem Context Builder
// ============================================================

/**
 * Creates a context string about the current problem to include in messages.
 * This provides the AI with necessary problem details while maintaining
 * the interviewer persona.
 */
export function createProblemContext(problem: AlgorithmProblem): string {
  const examplesText = problem.examples
    .map((ex, i) => {
      let text = `Example ${i + 1}:\n  Input: ${ex.input}\n  Output: ${ex.output}`;
      if (ex.explanation) {
        text += `\n  Explanation: ${ex.explanation}`;
      }
      return text;
    })
    .join('\n\n');

  const constraintsText = problem.constraints.map((c) => `- ${c}`).join('\n');

  const patternsForContext = problem.patterns
    .map((p) => PATTERN_DISPLAY_NAMES[p] || p)
    .join(', ');

  let context = `## Current Problem: ${problem.title}

**Difficulty**: ${problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}

**Problem Statement**:
${problem.description}

**Examples**:
${examplesText}

**Constraints**:
${constraintsText}`;

  if (problem.timeComplexityTarget) {
    context += `\n\n**Target Time Complexity**: ${problem.timeComplexityTarget}`;
  }

  if (problem.spaceComplexityTarget) {
    context += `\n**Target Space Complexity**: ${problem.spaceComplexityTarget}`;
  }

  // Include patterns for the AI's reference (not to reveal to user)
  context += `\n\n[INTERNAL - Do not reveal directly: Relevant patterns are ${patternsForContext}. Guide the candidate toward discovering these patterns through questions.]`;

  if (problem.hints && problem.hints.length > 0) {
    context += `\n\n[INTERNAL - Progressive hints to use if candidate is stuck:\n${problem.hints.map((h, i) => `${i + 1}. ${h}`).join('\n')}]`;
  }

  if (problem.followUps && problem.followUps.length > 0) {
    context += `\n\n[INTERNAL - Follow-up questions for advanced discussion:\n${problem.followUps.map((f) => `- ${f}`).join('\n')}]`;
  }

  return context;
}

// Pattern display names for context building
const PATTERN_DISPLAY_NAMES: Record<AlgorithmPattern, string> = {
  'hash-table': 'Hash Table / Hash Map',
  'two-pointers': 'Two Pointers',
  'sliding-window': 'Sliding Window',
  bfs: 'Breadth-First Search',
  dfs: 'Depth-First Search',
  'dynamic-programming': 'Dynamic Programming',
  'binary-search': 'Binary Search',
  stack: 'Stack',
  heap: 'Heap / Priority Queue',
  greedy: 'Greedy',
  backtracking: 'Backtracking',
  'divide-and-conquer': 'Divide and Conquer',
  trie: 'Trie',
  'union-find': 'Union-Find / Disjoint Set',
  'monotonic-stack': 'Monotonic Stack',
  'topological-sort': 'Topological Sort',
  'bit-manipulation': 'Bit Manipulation',
  math: 'Mathematical',
  sorting: 'Sorting',
  'linked-list': 'Linked List',
  tree: 'Tree',
  graph: 'Graph',
};

// ============================================================
// Pattern Recognition Guide
// ============================================================

/**
 * Guide for when to use each algorithmic pattern.
 * This helps the AI provide appropriate hints based on problem characteristics.
 */
export const PATTERN_RECOGNITION_GUIDE: Record<
  AlgorithmPattern,
  PatternGuide
> = {
  'hash-table': {
    pattern: 'hash-table',
    displayName: 'Hash Table / Hash Map',
    whenToUse: [
      'Need O(1) average lookup, insertion, or deletion',
      'Counting frequency of elements',
      'Finding duplicates or unique elements',
      'Need to map values to other values or indices',
      'Two Sum-style problems (finding complement)',
      'Grouping elements by some property',
    ],
    keyIndicators: [
      '"Find if exists" or "check for presence"',
      '"Count occurrences" or "frequency"',
      '"Group by" or "categorize"',
      'Need to avoid O(n) search in inner loop',
    ],
    commonMistakes: [
      'Forgetting hash collisions exist (rare but possible)',
      'Using when order matters (use LinkedHashMap/OrderedDict)',
      'Not considering the space trade-off',
    ],
    guidingQuestions: [
      'Is there information you need to look up quickly?',
      'What if you could check if you have seen a value before in constant time?',
      'Could you trade space for time here?',
      'What would you want to remember as you iterate through the input?',
    ],
  },

  'two-pointers': {
    pattern: 'two-pointers',
    displayName: 'Two Pointers',
    whenToUse: [
      'Sorted array or linked list problems',
      'Finding pairs that satisfy a condition',
      'Comparing elements from both ends',
      'Merging two sorted sequences',
      'Detecting cycles (fast/slow pointers)',
      'Palindrome checking',
      'Partitioning arrays',
    ],
    keyIndicators: [
      'Input is sorted or can be sorted',
      '"Find pair" or "find triplet"',
      '"Remove duplicates in-place"',
      'Need to compare or combine elements from different positions',
    ],
    commonMistakes: [
      'Not handling when pointers cross or meet',
      'Off-by-one errors at boundaries',
      'Forgetting to move both pointers in certain cases',
      'Using on unsorted data when sorting is required',
    ],
    guidingQuestions: [
      'If the array were sorted, how would that help?',
      'What if you looked at the problem from both ends?',
      'Could you use two indices moving toward each other?',
      'What information does the relative position of two elements give you?',
    ],
  },

  'sliding-window': {
    pattern: 'sliding-window',
    displayName: 'Sliding Window',
    whenToUse: [
      'Finding subarrays or substrings that satisfy a condition',
      'Maximum/minimum sum of fixed-size subarray',
      'Longest/shortest substring with certain properties',
      'Problems involving contiguous sequences',
      'String matching with character frequency',
    ],
    keyIndicators: [
      '"Contiguous subarray" or "substring"',
      '"Maximum/minimum length" of subarray',
      '"At most K" or "exactly K" distinct elements',
      'Fixed window size mentioned in problem',
    ],
    commonMistakes: [
      'Not knowing when to shrink vs expand the window',
      'Forgetting to update the answer when shrinking',
      'Incorrect handling of the window state (what is inside)',
      'Not handling the case when window becomes invalid',
    ],
    guidingQuestions: [
      'What if you maintained a "window" of consecutive elements?',
      'When would you need to expand or shrink this window?',
      'What information about the current window do you need to track?',
      'Could you avoid recalculating from scratch when the window moves?',
    ],
  },

  bfs: {
    pattern: 'bfs',
    displayName: 'Breadth-First Search',
    whenToUse: [
      'Finding shortest path in unweighted graph',
      'Level-order traversal of trees',
      'Finding minimum number of steps/moves',
      'Exploring all nodes at current depth before going deeper',
      'Multi-source shortest path problems',
      'Problems involving "spreading" or "infection"',
    ],
    keyIndicators: [
      '"Shortest path" or "minimum steps"',
      '"Level by level" or "layer by layer"',
      '"Nearest" or "closest"',
      'Grid-based movement problems',
    ],
    commonMistakes: [
      'Forgetting to mark nodes as visited before adding to queue',
      'Not tracking distance/level properly',
      'Using DFS when BFS is needed for shortest path',
      'Revisiting nodes (infinite loops)',
    ],
    guidingQuestions: [
      'Does the order in which you explore matter?',
      'What if you explored all neighbors before going deeper?',
      'How would you track how many "steps" you have taken?',
      'What data structure lets you process things in the order they were discovered?',
    ],
  },

  dfs: {
    pattern: 'dfs',
    displayName: 'Depth-First Search',
    whenToUse: [
      'Exhaustive search of all possibilities',
      'Finding all paths between two nodes',
      'Detecting cycles in graphs',
      'Topological sorting',
      'Connected components',
      'Tree traversals (preorder, inorder, postorder)',
      'Backtracking problems',
    ],
    keyIndicators: [
      '"Find all" or "generate all"',
      '"Any path" or "existence of path"',
      'Tree or graph traversal',
      'Problems requiring recursion/backtracking',
    ],
    commonMistakes: [
      'Forgetting to mark visited (causing infinite loops)',
      'Not backtracking state properly in recursive solutions',
      'Using when BFS would give better guarantees (shortest path)',
      'Stack overflow from deep recursion (consider iterative)',
    ],
    guidingQuestions: [
      'What if you explored one path completely before trying another?',
      'Could you break this into smaller subproblems?',
      'What choices do you have at each step?',
      'How would you backtrack if you reach a dead end?',
    ],
  },

  'dynamic-programming': {
    pattern: 'dynamic-programming',
    displayName: 'Dynamic Programming',
    whenToUse: [
      'Optimal substructure (optimal solution built from optimal sub-solutions)',
      'Overlapping subproblems (same subproblem solved multiple times)',
      'Counting number of ways',
      'Maximum/minimum optimization problems',
      'Problems with recursive nature but exponential brute force',
    ],
    keyIndicators: [
      '"Maximum/minimum" with constraints',
      '"Number of ways" or "count paths"',
      '"Can you reach" or "is it possible"',
      'Fibonacci-like patterns',
      'Choices at each step affect future choices',
    ],
    commonMistakes: [
      'Not identifying the right state variables',
      'Incorrect recurrence relation',
      'Not handling base cases properly',
      'Using when greedy would work (simpler)',
      'Wrong order of filling DP table',
    ],
    guidingQuestions: [
      'If you knew the answer for smaller inputs, could you build up to the full answer?',
      'What decisions do you make at each step?',
      'Are you solving the same subproblem multiple times?',
      'What is the "state" that captures everything you need to know at each point?',
    ],
  },

  'binary-search': {
    pattern: 'binary-search',
    displayName: 'Binary Search',
    whenToUse: [
      'Searching in sorted array',
      'Finding boundary (first/last occurrence)',
      'Search space can be halved based on condition',
      'Finding optimal value in monotonic function',
      'Problems where answer has "monotonic" property',
    ],
    keyIndicators: [
      'Sorted input',
      '"Search for" in sorted data',
      '"Minimum/maximum that satisfies condition"',
      'Large search space with monotonic property',
    ],
    commonMistakes: [
      'Off-by-one errors (left <= right vs left < right)',
      'Infinite loops (not moving left/right properly)',
      'Not handling empty input or single element',
      'Wrong midpoint calculation (overflow in some languages)',
    ],
    guidingQuestions: [
      'Is there a way to eliminate half the possibilities at once?',
      'If you check the middle, what does that tell you about each half?',
      'Is there a property that is true for all elements on one side and false on the other?',
      'What would you do if the search space was sorted?',
    ],
  },

  stack: {
    pattern: 'stack',
    displayName: 'Stack',
    whenToUse: [
      'Matching parentheses/brackets',
      'Next greater/smaller element',
      'Evaluating expressions',
      'Undo operations',
      'Parsing nested structures',
      'Maintaining monotonic sequence',
    ],
    keyIndicators: [
      '"Matching" or "balanced" parentheses',
      '"Next greater" or "previous smaller"',
      'Nested structures (HTML, JSON parsing)',
      'LIFO order is natural for the problem',
    ],
    commonMistakes: [
      'Popping from empty stack',
      'Not handling remaining elements in stack after processing',
      'Using wrong stack operations (check order)',
      'Forgetting stack stores indices vs values',
    ],
    guidingQuestions: [
      'What if you remembered elements in a "last-in, first-out" manner?',
      'When you see a closing bracket, what are you looking for?',
      'Could you keep track of elements you have not yet matched?',
      'What items can be "resolved" as you process new elements?',
    ],
  },

  heap: {
    pattern: 'heap',
    displayName: 'Heap / Priority Queue',
    whenToUse: [
      'Finding K largest/smallest elements',
      'Streaming data where you need to maintain top/bottom K',
      'Merging K sorted lists',
      'Scheduling based on priority',
      'Median from data stream',
      'Dijkstra shortest path',
    ],
    keyIndicators: [
      '"Top K" or "K largest/smallest"',
      '"Streaming" or "continuous input"',
      '"Merge sorted" lists or arrays',
      'Need quick access to min or max while adding elements',
    ],
    commonMistakes: [
      'Using wrong heap type (min vs max)',
      'Not understanding heap operations complexity',
      'Building heap from scratch when heapify is available',
      'Keeping too many elements (should maintain only K)',
    ],
    guidingQuestions: [
      'Do you need quick access to the minimum or maximum element?',
      'What if you could always efficiently find the smallest/largest?',
      'How many elements do you actually need to keep track of?',
      'When you add a new element, what comparison do you need to make?',
    ],
  },

  greedy: {
    pattern: 'greedy',
    displayName: 'Greedy',
    whenToUse: [
      'Locally optimal choice leads to globally optimal solution',
      'Interval scheduling problems',
      'Huffman coding and similar',
      'Activity selection',
      'Fractional knapsack',
      'When DP is overkill and greedy works',
    ],
    keyIndicators: [
      '"Maximum number of non-overlapping"',
      '"Minimum number of" something',
      'Sorting can help make optimal local choices',
      'Problem has "greedy choice property"',
    ],
    commonMistakes: [
      'Assuming greedy works without proof',
      'Wrong sorting criteria',
      'Not considering all cases where greedy fails',
      'Using greedy when DP is required',
    ],
    guidingQuestions: [
      'What is the "best" choice you can make right now?',
      'If you always pick the locally optimal option, does that work?',
      'What if you sorted the input by some property first?',
      'Can you prove that being greedy does not miss a better solution?',
    ],
  },

  backtracking: {
    pattern: 'backtracking',
    displayName: 'Backtracking',
    whenToUse: [
      'Generating all permutations or combinations',
      'Constraint satisfaction problems (Sudoku, N-Queens)',
      'Finding all solutions that satisfy constraints',
      'Problems with many choices and need to explore all',
      'Subset/combination sum problems',
    ],
    keyIndicators: [
      '"Generate all" or "find all"',
      '"All valid" combinations or permutations',
      'Puzzle-solving (Sudoku, crossword)',
      'Making choices and undoing them',
    ],
    commonMistakes: [
      'Not backtracking state properly (modifying global state)',
      'Missing base cases',
      'Not pruning invalid branches early',
      'Generating duplicates',
    ],
    guidingQuestions: [
      'What choices can you make at each step?',
      'How do you know when a path is invalid and you should backtrack?',
      'What state do you need to track and undo?',
      'Can you eliminate branches early if they cannot lead to valid solutions?',
    ],
  },

  'divide-and-conquer': {
    pattern: 'divide-and-conquer',
    displayName: 'Divide and Conquer',
    whenToUse: [
      'Problem can be split into independent subproblems',
      'Merge sort, quick sort',
      'Binary search variations',
      'Computing power, polynomial multiplication',
      'Closest pair of points',
    ],
    keyIndicators: [
      'Problem structure is recursive',
      'Subproblems are independent',
      'Combining subproblem solutions gives final answer',
      'Can reduce problem size by constant factor',
    ],
    commonMistakes: [
      'Not identifying proper base cases',
      'Inefficient combine step',
      'Not recognizing when subproblems overlap (use DP instead)',
      'Incorrect division of problem',
    ],
    guidingQuestions: [
      'Could you solve this for half the input and combine results?',
      'If you split the problem into smaller parts, how would you merge the answers?',
      'What is the smallest version of this problem you can solve directly?',
      'Are the subproblems independent of each other?',
    ],
  },

  trie: {
    pattern: 'trie',
    displayName: 'Trie',
    whenToUse: [
      'Prefix matching or autocomplete',
      'Dictionary word search',
      'Word games (Boggle, word search)',
      'IP routing (longest prefix matching)',
      'Storing and searching strings efficiently',
    ],
    keyIndicators: [
      '"Prefix" in problem statement',
      '"Autocomplete" or "type-ahead"',
      'Multiple string searches',
      '"Words starting with" queries',
    ],
    commonMistakes: [
      'Not marking end of word properly',
      'Memory overhead for sparse tries',
      'Using when hash map would suffice',
      'Not handling edge cases (empty string)',
    ],
    guidingQuestions: [
      'Are you searching for strings that share common prefixes?',
      'What if you could share storage for common prefixes?',
      'How could you organize strings to make prefix search efficient?',
      'What tree-like structure represents prefix relationships?',
    ],
  },

  'union-find': {
    pattern: 'union-find',
    displayName: 'Union-Find / Disjoint Set',
    whenToUse: [
      'Grouping elements into sets',
      'Finding connected components',
      'Detecting cycles in undirected graphs',
      'Kruskal minimum spanning tree',
      'Dynamic connectivity queries',
    ],
    keyIndicators: [
      '"Group" or "cluster" elements',
      '"Connected" or "same component"',
      'Merging sets together',
      'Many "are these connected?" queries',
    ],
    commonMistakes: [
      'Forgetting path compression or union by rank',
      'Using for directed graphs without modification',
      'Not initializing parent array correctly',
      'Using when simple BFS/DFS would work',
    ],
    guidingQuestions: [
      'Do you need to track which elements belong to the same group?',
      'Will you be merging groups together?',
      'Do you need to efficiently check if two elements are connected?',
      'How could you represent group membership efficiently?',
    ],
  },

  'monotonic-stack': {
    pattern: 'monotonic-stack',
    displayName: 'Monotonic Stack',
    whenToUse: [
      'Next greater/smaller element problems',
      'Stock span problems',
      'Largest rectangle in histogram',
      'Problems involving finding bounds for each element',
      'Maximum area problems',
    ],
    keyIndicators: [
      '"Next greater" or "next smaller"',
      '"Previous greater" or "previous smaller"',
      'Elements waiting for a "pair"',
      'Range maximum/minimum queries',
    ],
    commonMistakes: [
      'Wrong monotonic property (increasing vs decreasing)',
      'Not handling elements remaining in stack',
      'Storing wrong data (indices vs values)',
      'Not recognizing the pattern',
    ],
    guidingQuestions: [
      'For each element, what are you looking for to its left or right?',
      'What if you kept track of elements you have not yet found an answer for?',
      'In what order should you process elements to find the "next greater"?',
      'Which elements in your history become irrelevant when you see a new element?',
    ],
  },

  'topological-sort': {
    pattern: 'topological-sort',
    displayName: 'Topological Sort',
    whenToUse: [
      'Task scheduling with dependencies',
      'Course prerequisites',
      'Build order problems',
      'Detecting cycles in directed graphs',
      'Finding valid ordering with constraints',
    ],
    keyIndicators: [
      '"Prerequisites" or "dependencies"',
      '"Order" or "sequence" with constraints',
      '"Before/after" relationships',
      'Directed acyclic graph (DAG) processing',
    ],
    commonMistakes: [
      'Not detecting cycles (no valid ordering exists)',
      'Using on undirected graphs',
      'Wrong order of processing',
      'Not handling disconnected components',
    ],
    guidingQuestions: [
      'Are there dependency relationships between items?',
      'What items have no dependencies and can be processed first?',
      'How do you track when an item is ready to be processed?',
      'What happens if you detect a cycle?',
    ],
  },

  'bit-manipulation': {
    pattern: 'bit-manipulation',
    displayName: 'Bit Manipulation',
    whenToUse: [
      'Single number problems (XOR)',
      'Counting bits',
      'Power of 2 checks',
      'Subset generation using bitmasks',
      'Optimization of space using bits as flags',
    ],
    keyIndicators: [
      '"Single" or "unique" number among duplicates',
      '"Power of 2"',
      'Operations on binary representation',
      'Bitmask or flags',
    ],
    commonMistakes: [
      'Not understanding operator precedence',
      'Signed vs unsigned issues',
      'Overflow with shift operations',
      'Using when simpler solution exists',
    ],
    guidingQuestions: [
      'What happens when you XOR a number with itself?',
      'How are the numbers represented in binary?',
      'Could you use each bit position to represent something?',
      'What bit operation isolates a particular property?',
    ],
  },

  math: {
    pattern: 'math',
    displayName: 'Mathematical',
    whenToUse: [
      'Number theory problems (GCD, prime, factorial)',
      'Modular arithmetic',
      'Combinatorics (counting)',
      'Geometry calculations',
      'Mathematical patterns or formulas',
    ],
    keyIndicators: [
      '"Count" with mathematical formula available',
      'Prime numbers, divisors, factors',
      '"Modulo" in problem statement',
      'Geometric or arithmetic sequences',
    ],
    commonMistakes: [
      'Integer overflow',
      'Not using modular arithmetic when required',
      'Missing edge cases (0, 1, negative)',
      'Using iteration when formula exists',
    ],
    guidingQuestions: [
      'Is there a mathematical pattern or formula here?',
      'How would a mathematician approach this?',
      'Can you derive a closed-form solution?',
      'What mathematical properties does the input have?',
    ],
  },

  sorting: {
    pattern: 'sorting',
    displayName: 'Sorting',
    whenToUse: [
      'Problems that become easier with sorted input',
      'Meeting/interval scheduling',
      'Custom sort criteria needed',
      'K-th element problems',
      'Grouping similar elements',
    ],
    keyIndicators: [
      'Output depends on relative ordering',
      '"K-th largest/smallest"',
      'Intervals or ranges',
      'Grouping or clustering',
    ],
    commonMistakes: [
      'Wrong comparator function',
      'Not considering sort stability',
      'Using sort when partial sort (heap) would work',
      'Forgetting sort is O(n log n)',
    ],
    guidingQuestions: [
      'Would sorting the input make this easier?',
      'What property should you sort by?',
      'After sorting, what can you assume about adjacent elements?',
      'Is there a custom comparison you need?',
    ],
  },

  'linked-list': {
    pattern: 'linked-list',
    displayName: 'Linked List',
    whenToUse: [
      'In-place list manipulation',
      'Cycle detection',
      'Finding middle element',
      'Reversing lists',
      'Merging lists',
    ],
    keyIndicators: [
      'Input is a linked list',
      '"Reverse" a list',
      '"Find middle" or "find nth from end"',
      '"Detect cycle"',
    ],
    commonMistakes: [
      'Losing reference to head',
      'Null pointer errors',
      'Not handling empty list or single node',
      'Wrong pointer updates during reversal',
    ],
    guidingQuestions: [
      'What pointers do you need to keep track of?',
      'How do you traverse without losing your place?',
      'What happens at the boundaries (head, tail)?',
      'Could two pointers moving at different speeds help?',
    ],
  },

  tree: {
    pattern: 'tree',
    displayName: 'Tree',
    whenToUse: [
      'Hierarchical data traversal',
      'Binary search tree operations',
      'Finding LCA (lowest common ancestor)',
      'Path sum problems',
      'Tree construction/serialization',
    ],
    keyIndicators: [
      'Input is a tree structure',
      '"Depth" or "height" of tree',
      '"Path" from root to leaf',
      '"Ancestor" or "descendant"',
    ],
    commonMistakes: [
      'Forgetting null checks',
      'Not handling single node trees',
      'Confusing preorder/inorder/postorder',
      'Not considering unbalanced trees',
    ],
    guidingQuestions: [
      'What traversal order makes sense here?',
      'What information do you need from each subtree?',
      'Can you solve this recursively for left and right children?',
      'What is the base case when you reach a leaf or null?',
    ],
  },

  graph: {
    pattern: 'graph',
    displayName: 'Graph',
    whenToUse: [
      'Problems involving connections/relationships',
      'Network flow',
      'Shortest paths',
      'Connected components',
      'Cycle detection',
    ],
    keyIndicators: [
      '"Nodes" and "edges" or "vertices" and "connections"',
      '"Path" between two points',
      '"Connected" or "reachable"',
      'Adjacency relationship matters',
    ],
    commonMistakes: [
      'Not choosing right representation (matrix vs list)',
      'Forgetting to mark visited',
      'Not handling disconnected components',
      'Confusing directed vs undirected',
    ],
    guidingQuestions: [
      'How will you represent the connections?',
      'Do you need to visit every node or find a specific path?',
      'How do you avoid visiting the same node twice?',
      'Is this a directed or undirected relationship?',
    ],
  },
};

interface PatternGuide {
  pattern: AlgorithmPattern;
  displayName: string;
  whenToUse: string[];
  keyIndicators: string[];
  commonMistakes: string[];
  guidingQuestions: string[];
}

// ============================================================
// Conversation Starters
// ============================================================

/**
 * Ways the AI can start the interview conversation.
 * These maintain a natural, welcoming tone while setting expectations.
 */
export const CONVERSATION_STARTERS: string[] = [
  "Hi! I'll be your interviewer today. Take a moment to read through the problem carefully. Once you're ready, we can discuss your initial thoughts and any clarifying questions you might have.",

  "Welcome! Let's work through this problem together. Please read it over, and feel free to ask any clarifying questions before we dive into your approach.",

  "Hello! I'm here to help guide you through this problem. Take your time to understand it fully. When you're ready, let me know if anything about the problem statement is unclear.",

  "Thanks for joining! Go ahead and read the problem. I'm here to discuss your approach and help you think through it - just let me know when you're ready to start.",

  "Hey there! Let's tackle this problem step by step. First, take some time to read and understand it. What questions come to mind as you read through it?",

  "Good to meet you! Please read through the problem statement. A good first step is to make sure we understand exactly what's being asked. Any initial questions?",

  "Hi! Take a moment to read the problem carefully. I find it helps to think about what the inputs look like and what the expected outputs should be. Let me know when you want to discuss.",

  "Welcome to your practice session! Please review the problem. Before jumping into a solution, let's make sure we're clear on the requirements. Ready when you are.",
];

// ============================================================
// Hint Progressions
// ============================================================

/**
 * Increasingly specific hints for each pattern.
 * The AI should use these progressively when a candidate is stuck,
 * starting with the most general and moving to more specific.
 */
export const HINT_PROGRESSIONS: Record<AlgorithmPattern, HintProgression> = {
  'hash-table': {
    pattern: 'hash-table',
    hints: [
      {
        level: 1,
        hint: "Think about what information you need to remember as you process each element. Is there something you'd want to look up quickly?",
        context: 'Very general - just suggesting memory/lookup',
      },
      {
        level: 2,
        hint: 'What if you could check whether you have seen a particular value before in constant time? How would that help?',
        context: 'Suggesting O(1) lookup capability',
      },
      {
        level: 3,
        hint: 'Consider what data structure gives you O(1) average time for both insertion and lookup.',
        context: 'Pointing toward hash-based structure',
      },
      {
        level: 4,
        hint: 'A hash map (or dictionary/object in some languages) lets you store key-value pairs and access them in O(1) average time. What would you use as the key? What as the value?',
        context: 'Named the structure, asking about application',
      },
    ],
  },

  'two-pointers': {
    pattern: 'two-pointers',
    hints: [
      {
        level: 1,
        hint: 'Think about whether the order of elements matters. Could sorting help simplify the problem?',
        context: 'Suggesting sorted array might help',
      },
      {
        level: 2,
        hint: 'If the array were sorted, what information would you gain by looking at elements at both ends?',
        context: 'Suggesting looking at boundaries',
      },
      {
        level: 3,
        hint: 'What if you had two indices - one starting at the beginning and one at the end? Based on some condition, you could move one or the other.',
        context: 'Describing the two-pointer setup',
      },
      {
        level: 4,
        hint: 'Two pointers starting from opposite ends of a sorted array can help find pairs efficiently. When would you move the left pointer? When the right?',
        context: 'Named the technique, asking about movement logic',
      },
    ],
  },

  'sliding-window': {
    pattern: 'sliding-window',
    hints: [
      {
        level: 1,
        hint: "Notice that we're looking for a contiguous portion of the input. What changes when you move from one position to the next?",
        context: 'Highlighting contiguous nature',
      },
      {
        level: 2,
        hint: 'Instead of recalculating from scratch for each starting position, could you incrementally update as you move through the input?',
        context: 'Suggesting incremental update',
      },
      {
        level: 3,
        hint: 'Imagine a "window" that slides across your input. What would you add when expanding the window? What would you remove when shrinking it?',
        context: 'Describing the window concept',
      },
      {
        level: 4,
        hint: 'A sliding window approach maintains a window that expands and contracts. Track what you need about the current window, and decide when to shrink vs expand based on the problem constraints.',
        context: 'Named the technique with implementation guidance',
      },
    ],
  },

  bfs: {
    pattern: 'bfs',
    hints: [
      {
        level: 1,
        hint: "When you need to find the minimum number of steps or shortest path, think about how you'd explore systematically.",
        context: 'Connecting to shortest path',
      },
      {
        level: 2,
        hint: "What if you explored all options at 'distance 1' before any at 'distance 2'? How would that help find the minimum?",
        context: 'Suggesting level-by-level exploration',
      },
      {
        level: 3,
        hint: 'Consider using a queue to process elements in the order they were discovered. Add neighbors to the back, process from the front.',
        context: 'Suggesting queue-based processing',
      },
      {
        level: 4,
        hint: "BFS (breadth-first search) explores level by level using a queue. It's perfect for finding shortest paths in unweighted graphs. How would you track what you've already visited?",
        context: 'Named the technique with key details',
      },
    ],
  },

  dfs: {
    pattern: 'dfs',
    hints: [
      {
        level: 1,
        hint: 'This looks like a problem where you need to explore all possibilities. Think about how you could systematically try each option.',
        context: 'Suggesting exhaustive search',
      },
      {
        level: 2,
        hint: 'What if you followed one path completely before backtracking to try another? How would you structure that?',
        context: 'Suggesting depth-first exploration',
      },
      {
        level: 3,
        hint: 'Consider a recursive approach: make a choice, explore that path completely, then undo the choice and try the next option.',
        context: 'Describing recursive structure',
      },
      {
        level: 4,
        hint: "DFS (depth-first search) explores as deep as possible before backtracking. You can implement it recursively or with a stack. What's your base case?",
        context: 'Named the technique with implementation options',
      },
    ],
  },

  'dynamic-programming': {
    pattern: 'dynamic-programming',
    hints: [
      {
        level: 1,
        hint: 'Think about how you would solve this problem for smaller inputs. Is there a relationship between the answer for size N and size N-1?',
        context: 'Suggesting optimal substructure',
      },
      {
        level: 2,
        hint: 'If you try to solve this recursively, are there subproblems you end up solving multiple times? How could you avoid that redundancy?',
        context: 'Highlighting overlapping subproblems',
      },
      {
        level: 3,
        hint: "What 'state' captures everything you need to know at each decision point? Could you store and reuse results for each state?",
        context: 'Suggesting state representation',
      },
      {
        level: 4,
        hint: 'This is a dynamic programming problem. Define your state (what subproblem each entry represents), write the recurrence (how to compute each state from others), and identify base cases.',
        context: 'Named the technique with framework',
      },
    ],
  },

  'binary-search': {
    pattern: 'binary-search',
    hints: [
      {
        level: 1,
        hint: 'Is there a way to eliminate a large portion of the search space based on checking a single value?',
        context: 'Suggesting search space reduction',
      },
      {
        level: 2,
        hint: 'If you checked the middle element, what could you conclude about the left and right halves?',
        context: 'Suggesting midpoint check',
      },
      {
        level: 3,
        hint: 'Is there a monotonic property here - something that is false up to a point and then true (or vice versa)? Could you binary search on that boundary?',
        context: 'Connecting to boundary finding',
      },
      {
        level: 4,
        hint: 'Binary search can find a boundary in O(log n) time. Define your search space, check the midpoint, and eliminate the half that cannot contain your answer.',
        context: 'Named the technique with approach',
      },
    ],
  },

  stack: {
    pattern: 'stack',
    hints: [
      {
        level: 1,
        hint: 'As you process elements, think about which previous elements are still "relevant" and which become obsolete.',
        context: 'Suggesting tracking relevant history',
      },
      {
        level: 2,
        hint: 'What if you kept a collection where you could quickly access and remove the most recently added item?',
        context: 'Suggesting LIFO structure',
      },
      {
        level: 3,
        hint: "Consider using a stack. When you see a new element, what elements in the stack can now be 'resolved' or matched?",
        context: 'Named the structure, suggesting matching',
      },
      {
        level: 4,
        hint: "A stack maintains elements in LIFO order. Push elements that are waiting for a 'match', and pop when you find one. What exactly should you store - values, indices, or both?",
        context: 'Details about what to store',
      },
    ],
  },

  heap: {
    pattern: 'heap',
    hints: [
      {
        level: 1,
        hint: 'Do you always need to track all elements, or just the most important ones (largest, smallest)?',
        context: 'Suggesting partial tracking',
      },
      {
        level: 2,
        hint: 'What if you could always efficiently access the minimum or maximum element in your collection?',
        context: 'Suggesting efficient min/max access',
      },
      {
        level: 3,
        hint: 'A priority queue (or heap) lets you add elements and always retrieve the smallest (or largest) in O(log n) time. How many elements do you actually need to keep?',
        context: 'Named the structure with hint about size',
      },
      {
        level: 4,
        hint: 'Use a min-heap or max-heap depending on whether you need the smallest or largest. For "top K" problems, a heap of size K is usually enough. Think about what to do when you see a new element.',
        context: 'Specific guidance for common patterns',
      },
    ],
  },

  greedy: {
    pattern: 'greedy',
    hints: [
      {
        level: 1,
        hint: 'Is there an obvious "best" choice to make at each step? Would always making that choice lead to the optimal answer?',
        context: 'Suggesting local optimality',
      },
      {
        level: 2,
        hint: 'What if you sorted the input and processed items in a specific order? What sorting criteria might help?',
        context: 'Suggesting sorting as preprocessing',
      },
      {
        level: 3,
        hint: 'Try to identify a greedy strategy: a rule for making each choice that you can prove (or at least argue) leads to an optimal solution.',
        context: 'Asking for strategy articulation',
      },
      {
        level: 4,
        hint: 'A greedy approach makes locally optimal choices hoping they lead to a global optimum. Think about why the greedy choice does not exclude better solutions.',
        context: 'Named the technique with proof intuition',
      },
    ],
  },

  backtracking: {
    pattern: 'backtracking',
    hints: [
      {
        level: 1,
        hint: 'This problem asks for all possible solutions. Think about how you would systematically generate each one.',
        context: 'Recognizing exhaustive generation',
      },
      {
        level: 2,
        hint: 'At each step, you have choices to make. What if you tried one choice, explored completely, then undid it and tried the next?',
        context: 'Suggesting try-and-undo approach',
      },
      {
        level: 3,
        hint: 'Consider building solutions incrementally. When do you have a complete solution? When do you know a partial solution cannot lead anywhere valid?',
        context: 'Discussing completion and pruning',
      },
      {
        level: 4,
        hint: "Backtracking explores all possibilities by making choices, recursing, and undoing choices. Prune early when you detect an invalid path. What state do you need to track and 'undo'?",
        context: 'Named the technique with implementation focus',
      },
    ],
  },

  'divide-and-conquer': {
    pattern: 'divide-and-conquer',
    hints: [
      {
        level: 1,
        hint: 'Could you solve this for half the input and somehow combine the results?',
        context: 'Suggesting problem splitting',
      },
      {
        level: 2,
        hint: 'Think about splitting the problem into independent subproblems. What would be the smallest problem you can solve directly?',
        context: 'Asking about base case',
      },
      {
        level: 3,
        hint: 'If you had the solution for the left half and the right half, how would you combine them to get the full solution?',
        context: 'Focusing on the combine step',
      },
      {
        level: 4,
        hint: 'Divide and conquer splits the problem into subproblems, solves each recursively, and combines results. Define: how to divide, base case, and how to combine.',
        context: 'Named the technique with framework',
      },
    ],
  },

  trie: {
    pattern: 'trie',
    hints: [
      {
        level: 1,
        hint: 'Notice that many of these strings share common prefixes. How could you leverage that?',
        context: 'Highlighting prefix sharing',
      },
      {
        level: 2,
        hint: 'What if you could share storage for common prefixes of multiple strings?',
        context: 'Suggesting shared prefix storage',
      },
      {
        level: 3,
        hint: 'Consider a tree structure where each node represents a character, and paths from root represent strings. How would you search for a prefix?',
        context: 'Describing tree structure',
      },
      {
        level: 4,
        hint: "A trie (prefix tree) stores strings character by character, sharing common prefixes. Each node has children for next characters. You'll need to mark word endings.",
        context: 'Named the structure with details',
      },
    ],
  },

  'union-find': {
    pattern: 'union-find',
    hints: [
      {
        level: 1,
        hint: 'Think about grouping elements together. Two elements in the same group are "connected" somehow.',
        context: 'Suggesting grouping',
      },
      {
        level: 2,
        hint: 'You need to efficiently merge groups and check if two elements are in the same group. What structure could handle both?',
        context: 'Stating the requirements',
      },
      {
        level: 3,
        hint: 'What if each group had a representative element (a "parent"), and you could find it quickly? When merging groups, you just link their representatives.',
        context: 'Describing parent-based structure',
      },
      {
        level: 4,
        hint: "Union-Find (Disjoint Set Union) tracks groups with a parent array. 'Find' locates the group representative; 'Union' merges groups. Path compression and union by rank optimize it.",
        context: 'Named with optimization hints',
      },
    ],
  },

  'monotonic-stack': {
    pattern: 'monotonic-stack',
    hints: [
      {
        level: 1,
        hint: "For each element, you're looking for something specific to its left or right. Think about which elements are 'candidates' as you scan.",
        context: 'Highlighting the search pattern',
      },
      {
        level: 2,
        hint: 'As you process new elements, some previous elements become irrelevant. Which ones can you discard?',
        context: 'Suggesting element pruning',
      },
      {
        level: 3,
        hint: 'What if you maintained a stack where elements are always in increasing (or decreasing) order? When a new element violates this, some elements get their answer.',
        context: 'Describing monotonic property',
      },
      {
        level: 4,
        hint: "A monotonic stack maintains elements in sorted order. When you add a new element that breaks the monotonic property, you pop elements and they 'find their answer'. Track indices for position info.",
        context: 'Named with implementation details',
      },
    ],
  },

  'topological-sort': {
    pattern: 'topological-sort',
    hints: [
      {
        level: 1,
        hint: 'Think about dependencies: which items must come before others? Can you identify items with no prerequisites?',
        context: 'Highlighting dependency structure',
      },
      {
        level: 2,
        hint: 'What if you started with items that have no incoming dependencies? After processing them, what new items become available?',
        context: "Suggesting Kahn's algorithm approach",
      },
      {
        level: 3,
        hint: "Track how many dependencies each item has. When that count reaches zero, the item is ready. Use a queue to process ready items.",
        context: 'Describing indegree tracking',
      },
      {
        level: 4,
        hint: "Topological sort orders items respecting dependencies. Use Kahn's algorithm: track indegrees, start with zero-indegree nodes, reduce counts as you process. Cycle = impossible ordering.",
        context: 'Named with algorithm details',
      },
    ],
  },

  'bit-manipulation': {
    pattern: 'bit-manipulation',
    hints: [
      {
        level: 1,
        hint: 'Think about how the numbers are represented in binary. Are there patterns in the bits that could help?',
        context: 'Suggesting binary thinking',
      },
      {
        level: 2,
        hint: 'What happens when you XOR, AND, or OR numbers together? Do any of these operations have useful properties here?',
        context: 'Suggesting bit operations',
      },
      {
        level: 3,
        hint: 'Remember: XOR of a number with itself is 0, and XOR with 0 is the number itself. AND can mask bits. Shifts can multiply/divide by powers of 2.',
        context: 'Providing operation properties',
      },
      {
        level: 4,
        hint: 'Bit manipulation can often provide elegant O(n) solutions. XOR is particularly useful for finding unique elements. Think about what each bit position represents independently.',
        context: 'Named with application hints',
      },
    ],
  },

  math: {
    pattern: 'math',
    hints: [
      {
        level: 1,
        hint: "Before coding, think mathematically. Is there a formula or pattern that describes the answer?",
        context: 'Encouraging mathematical thinking',
      },
      {
        level: 2,
        hint: 'Try working out small examples by hand. Do you see a pattern emerging? Can you describe it mathematically?',
        context: 'Suggesting pattern finding',
      },
      {
        level: 3,
        hint: 'Consider properties like: divisibility, prime factorization, modular arithmetic, or combinatorial formulas. Which applies here?',
        context: 'Listing mathematical tools',
      },
      {
        level: 4,
        hint: "Sometimes the best algorithm is a mathematical formula. Think about whether you can compute the answer directly rather than simulating. Watch for integer overflow if numbers are large.",
        context: 'Direct computation suggestion with warning',
      },
    ],
  },

  sorting: {
    pattern: 'sorting',
    hints: [
      {
        level: 1,
        hint: 'What if the input were sorted? Would that make the problem easier?',
        context: 'Suggesting sorting could help',
      },
      {
        level: 2,
        hint: 'Think about what property you want to sort by. Is it a single value, or a combination?',
        context: 'Asking about sort key',
      },
      {
        level: 3,
        hint: "After sorting, adjacent elements have some relationship. What can you conclude about them? What becomes easier to find or compare?",
        context: 'Highlighting post-sort properties',
      },
      {
        level: 4,
        hint: "Sorting in O(n log n) is often a worthwhile preprocessing step. Consider custom comparators for complex criteria. Think about what the sorted order tells you.",
        context: 'Cost-benefit and custom sorting',
      },
    ],
  },

  'linked-list': {
    pattern: 'linked-list',
    hints: [
      {
        level: 1,
        hint: 'With linked lists, you only have access to next pointers. Think carefully about what references you need to maintain.',
        context: 'Highlighting access constraints',
      },
      {
        level: 2,
        hint: 'Drawing out the list and tracking pointers on paper often helps. What happens to each pointer at each step?',
        context: 'Suggesting visualization',
      },
      {
        level: 3,
        hint: "Consider using multiple pointers: one to track the current node, another to track the previous, and maybe a dummy head to simplify edge cases.",
        context: 'Suggesting pointer strategies',
      },
      {
        level: 4,
        hint: 'Common techniques: dummy/sentinel nodes, fast/slow pointers (for cycles or middle), and careful pointer reassignment. Always ask: what if the list is empty or has one node?',
        context: 'Named techniques with edge case warning',
      },
    ],
  },

  tree: {
    pattern: 'tree',
    hints: [
      {
        level: 1,
        hint: 'Trees are recursive structures. Can you think about solving this for a single node assuming you have solved it for its children?',
        context: 'Suggesting recursive thinking',
      },
      {
        level: 2,
        hint: 'What information do you need from each subtree? What do you return up to the parent?',
        context: 'Asking about recursive return values',
      },
      {
        level: 3,
        hint: 'Consider different traversal orders: preorder (node, left, right), inorder (left, node, right), postorder (left, right, node). Which is most natural for this problem?',
        context: 'Discussing traversal options',
      },
      {
        level: 4,
        hint: 'Tree problems often use recursive DFS. Define: base case (null or leaf), recursive case (combine results from children), and what to return/track. Some problems need info from both children before deciding.',
        context: 'Framework for tree recursion',
      },
    ],
  },

  graph: {
    pattern: 'graph',
    hints: [
      {
        level: 1,
        hint: 'First, think about how to represent the graph. Would an adjacency list or matrix be better here?',
        context: 'Asking about representation',
      },
      {
        level: 2,
        hint: "You need to visit nodes systematically. How will you ensure you don't visit the same node twice?",
        context: 'Highlighting visited tracking',
      },
      {
        level: 3,
        hint: 'Is this a shortest path problem (consider BFS), exhaustive search (consider DFS), or something involving components or cycles?',
        context: 'Categorizing the problem type',
      },
      {
        level: 4,
        hint: 'Graph problems typically use BFS (shortest path, level traversal) or DFS (all paths, cycles, components). Build an adjacency list, track visited nodes, and choose BFS vs DFS based on what you need.',
        context: 'Framework for graph problems',
      },
    ],
  },
};

interface HintProgression {
  pattern: AlgorithmPattern;
  hints: ProgressiveHint[];
}

interface ProgressiveHint {
  level: number;
  hint: string;
  context: string;
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Gets a random conversation starter
 */
export function getRandomConversationStarter(): string {
  const index = Math.floor(Math.random() * CONVERSATION_STARTERS.length);
  return CONVERSATION_STARTERS[index];
}

/**
 * Gets hints for a specific pattern at a given level
 */
export function getHintForPattern(
  pattern: AlgorithmPattern,
  level: number
): string | null {
  const progression = HINT_PROGRESSIONS[pattern];
  if (!progression) return null;

  const hint = progression.hints.find((h) => h.level === level);
  return hint?.hint ?? null;
}

/**
 * Gets the next available hint level for a pattern
 */
export function getNextHintLevel(
  pattern: AlgorithmPattern,
  currentLevel: number
): number | null {
  const progression = HINT_PROGRESSIONS[pattern];
  if (!progression) return null;

  const maxLevel = Math.max(...progression.hints.map((h) => h.level));
  if (currentLevel >= maxLevel) return null;

  return currentLevel + 1;
}

/**
 * Gets guiding questions for a pattern
 */
export function getGuidingQuestions(pattern: AlgorithmPattern): string[] {
  const guide = PATTERN_RECOGNITION_GUIDE[pattern];
  return guide?.guidingQuestions ?? [];
}

/**
 * Identifies potential patterns based on problem tags
 */
export function identifyPatternsFromTags(tags: string[]): AlgorithmPattern[] {
  const patterns: AlgorithmPattern[] = [];
  const tagSet = new Set(tags.map((t) => t.toLowerCase()));

  const tagToPattern: Record<string, AlgorithmPattern> = {
    'hash': 'hash-table',
    'hashmap': 'hash-table',
    'hash map': 'hash-table',
    'hashtable': 'hash-table',
    'dictionary': 'hash-table',
    'two pointers': 'two-pointers',
    'two-pointers': 'two-pointers',
    'sliding window': 'sliding-window',
    'sliding-window': 'sliding-window',
    'bfs': 'bfs',
    'breadth-first': 'bfs',
    'level order': 'bfs',
    'dfs': 'dfs',
    'depth-first': 'dfs',
    'recursion': 'dfs',
    'dp': 'dynamic-programming',
    'dynamic programming': 'dynamic-programming',
    'memoization': 'dynamic-programming',
    'binary search': 'binary-search',
    'binary-search': 'binary-search',
    'stack': 'stack',
    'heap': 'heap',
    'priority queue': 'heap',
    'greedy': 'greedy',
    'backtracking': 'backtracking',
    'divide and conquer': 'divide-and-conquer',
    'trie': 'trie',
    'prefix tree': 'trie',
    'union find': 'union-find',
    'union-find': 'union-find',
    'disjoint set': 'union-find',
    'monotonic stack': 'monotonic-stack',
    'monotonic-stack': 'monotonic-stack',
    'topological sort': 'topological-sort',
    'topological-sort': 'topological-sort',
    'bit': 'bit-manipulation',
    'bit manipulation': 'bit-manipulation',
    'bitwise': 'bit-manipulation',
    'math': 'math',
    'mathematical': 'math',
    'number theory': 'math',
    'sorting': 'sorting',
    'sort': 'sorting',
    'linked list': 'linked-list',
    'linked-list': 'linked-list',
    'tree': 'tree',
    'binary tree': 'tree',
    'bst': 'tree',
    'graph': 'graph',
    'network': 'graph',
  };

  for (const tag of tagSet) {
    const pattern = tagToPattern[tag];
    if (pattern && !patterns.includes(pattern)) {
      patterns.push(pattern);
    }
  }

  return patterns;
}

/**
 * Builds the full system message for starting an interview
 */
export function buildInterviewSystemMessage(problem: AlgorithmProblem): string {
  const problemContext = createProblemContext(problem);
  return `${INTERVIEWER_SYSTEM_PROMPT}\n\n---\n\n${problemContext}`;
}

/**
 * Creates a follow-up question based on the candidate's response type
 */
export function getFollowUpQuestion(
  responseType:
    | 'vague-approach'
    | 'missing-complexity'
    | 'no-edge-cases'
    | 'stuck'
    | 'good-progress'
): string {
  const followUps: Record<string, string[]> = {
    'vague-approach': [
      "That's a start. Can you be more specific about how you'd implement that step?",
      'I want to make sure I understand. Can you walk me through what happens with a concrete example?',
      "What data structure would you use for that, and why?",
      "Let's break that down further. What's the very first thing you'd do?",
    ],
    'missing-complexity': [
      "Good approach! Now, what's the time complexity of that solution?",
      'How does your solution scale as the input size grows?',
      "What's driving the time complexity - which part takes the most time?",
      'And the space complexity? What extra memory are you using?',
    ],
    'no-edge-cases': [
      'What happens if the input is empty?',
      'How does your solution handle duplicates?',
      'What if the input has only one element?',
      'Are there any inputs that might break your approach?',
    ],
    'stuck': [
      "Let's step back. What's the key insight we need here?",
      'What information would help you make progress?',
      "Is there a simpler version of this problem you could solve first?",
      'What patterns have you seen in similar problems?',
    ],
    'good-progress': [
      'Excellent! Shall we trace through an example to verify?',
      "Great thinking. Can you think of any follow-up questions an interviewer might ask?",
      'Nice! How would you modify this if the constraints changed?',
      "That's solid. Let's make sure it handles all the edge cases.",
    ],
  };

  const options = followUps[responseType] || followUps['vague-approach'];
  return options[Math.floor(Math.random() * options.length)];
}
