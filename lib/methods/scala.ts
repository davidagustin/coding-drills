import type { Method } from '../types';

export const scalaMethods: Method[] = [
  // ============================================================
  // List Methods
  // ============================================================
  {
    name: 'map',
    category: 'List Methods',
    syntax: 'list.map(f: A => B): List[B]',
    description: 'Builds a new collection by applying a function to all elements of this list.',
    arguments: [
      {
        name: 'f',
        type: 'A => B',
        description: 'The function to apply to each element',
      },
    ],
    returns: {
      type: 'List[B]',
      description: 'A new list resulting from applying the given function to each element',
    },
    examples: [
      {
        code: 'List(1, 2, 3).map(_ * 2)',
        output: 'List(2, 4, 6)',
        explanation: 'Doubles each element in the list',
      },
      {
        code: 'List("hello", "world").map(_.toUpperCase)',
        output: 'List("HELLO", "WORLD")',
        explanation: 'Converts each string to uppercase',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['flatMap', 'collect', 'foreach'],
    sinceVersion: '2.0',
    notes: ['Returns an empty list if called on an empty list'],
  },
  {
    name: 'filter',
    category: 'List Methods',
    syntax: 'list.filter(p: A => Boolean): List[A]',
    description: 'Selects all elements of this list which satisfy a predicate.',
    arguments: [
      {
        name: 'p',
        type: 'A => Boolean',
        description: 'The predicate used to test elements',
      },
    ],
    returns: {
      type: 'List[A]',
      description: 'A new list consisting of all elements that satisfy the given predicate',
    },
    examples: [
      {
        code: 'List(1, 2, 3, 4, 5).filter(_ > 3)',
        output: 'List(4, 5)',
        explanation: 'Keeps only elements greater than 3',
      },
      {
        code: 'List(1, 2, 3, 4).filter(_ % 2 == 0)',
        output: 'List(2, 4)',
        explanation: 'Keeps only even numbers',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['filterNot', 'collect', 'partition'],
    sinceVersion: '2.0',
  },
  {
    name: 'flatMap',
    category: 'List Methods',
    syntax: 'list.flatMap(f: A => IterableOnce[B]): List[B]',
    description:
      'Builds a new collection by applying a function to all elements and flattening the results.',
    arguments: [
      {
        name: 'f',
        type: 'A => IterableOnce[B]',
        description: 'The function to apply to each element, returning a collection',
      },
    ],
    returns: {
      type: 'List[B]',
      description: 'A new list resulting from applying the function and concatenating all results',
    },
    examples: [
      {
        code: 'List(1, 2, 3).flatMap(x => List(x, x * 10))',
        output: 'List(1, 10, 2, 20, 3, 30)',
        explanation: 'Each element produces a pair, then all pairs are flattened into one list',
      },
      {
        code: 'List("hello world", "foo bar").flatMap(_.split(" "))',
        output: 'List("hello", "world", "foo", "bar")',
        explanation: 'Splits each string and flattens the results',
      },
    ],
    timeComplexity: 'O(n * m) where m is the average size of each result collection',
    spaceComplexity: 'O(n * m)',
    relatedMethods: ['map', 'flatten', 'collect'],
    sinceVersion: '2.0',
    notes: ['Equivalent to list.map(f).flatten'],
  },
  {
    name: 'foldLeft',
    category: 'List Methods',
    syntax: 'list.foldLeft[B](z: B)(op: (B, A) => B): B',
    description:
      'Applies a binary operator to a start value and all elements of this list, going left to right.',
    arguments: [
      {
        name: 'z',
        type: 'B',
        description: 'The start value (zero element)',
      },
      {
        name: 'op',
        type: '(B, A) => B',
        description: 'The binary operator applied to the accumulator and each element',
      },
    ],
    returns: {
      type: 'B',
      description: 'The result of applying op between all elements with z as the initial value',
    },
    examples: [
      {
        code: 'List(1, 2, 3, 4).foldLeft(0)(_ + _)',
        output: '10',
        explanation: 'Sums all elements starting with 0: ((((0+1)+2)+3)+4)',
      },
      {
        code: 'List("a", "b", "c").foldLeft("")(_ + _)',
        output: '"abc"',
        explanation: 'Concatenates all strings from left to right',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['foldRight', 'reduce', 'reduceLeft'],
    sinceVersion: '2.0',
    notes: ['Also available via the /: operator syntax: (z /: list)(op)'],
  },
  {
    name: 'reduce',
    category: 'List Methods',
    syntax: 'list.reduce(op: (A, A) => A): A',
    description:
      'Reduces the elements of this collection using the specified associative binary operator.',
    arguments: [
      {
        name: 'op',
        type: '(A, A) => A',
        description: 'The binary operator used to combine elements',
      },
    ],
    returns: {
      type: 'A',
      description: 'The result of applying the operator between all elements',
    },
    examples: [
      {
        code: 'List(1, 2, 3, 4).reduce(_ + _)',
        output: '10',
        explanation: 'Sums all elements: 1 + 2 + 3 + 4',
      },
      {
        code: 'List(3, 1, 4, 1, 5).reduce(_ max _)',
        output: '5',
        explanation: 'Finds the maximum element using the max operator',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['reduceLeft', 'reduceRight', 'foldLeft', 'fold'],
    sinceVersion: '2.0',
    notes: ['Throws UnsupportedOperationException if the list is empty'],
  },
  {
    name: 'zip',
    category: 'List Methods',
    syntax: 'list.zip(that: Iterable[B]): List[(A, B)]',
    description:
      'Returns a list of pairs formed from this list and another iterable by combining corresponding elements.',
    arguments: [
      {
        name: 'that',
        type: 'Iterable[B]',
        description: 'The iterable providing the second half of each pair',
      },
    ],
    returns: {
      type: 'List[(A, B)]',
      description:
        'A new list containing pairs of corresponding elements. Length is the minimum of both collections.',
    },
    examples: [
      {
        code: 'List(1, 2, 3).zip(List("a", "b", "c"))',
        output: 'List((1,"a"), (2,"b"), (3,"c"))',
        explanation: 'Pairs each element with its corresponding element from the other list',
      },
      {
        code: 'List(1, 2, 3).zip(List("a", "b"))',
        output: 'List((1,"a"), (2,"b"))',
        explanation: 'Extra elements in the longer list are dropped',
      },
    ],
    timeComplexity: 'O(min(n, m))',
    spaceComplexity: 'O(min(n, m))',
    relatedMethods: ['zipWithIndex', 'unzip', 'zipAll'],
    sinceVersion: '2.0',
  },
  // ============================================================
  // String Methods
  // ============================================================
  {
    name: 'split',
    category: 'String Methods',
    syntax: 'str.split(regex: String): Array[String]',
    description: 'Splits this string around matches of the given regular expression.',
    arguments: [
      {
        name: 'regex',
        type: 'String',
        description: 'The delimiting regular expression',
      },
    ],
    returns: {
      type: 'Array[String]',
      description: 'An array of strings computed by splitting this string',
    },
    examples: [
      {
        code: '"hello world foo".split(" ")',
        output: 'Array("hello", "world", "foo")',
        explanation: 'Splits on spaces',
      },
      {
        code: '"one,two,three".split(",")',
        output: 'Array("one", "two", "three")',
        explanation: 'Splits on comma delimiter',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['mkString', 'trim'],
    notes: ['Uses Java regex under the hood; special regex characters must be escaped'],
  },
  {
    name: 'mkString',
    category: 'String Methods',
    syntax:
      'collection.mkString(sep: String): String | collection.mkString(start: String, sep: String, end: String): String',
    description:
      'Displays all elements of this collection in a string using a separator, with optional start and end strings.',
    arguments: [
      {
        name: 'start',
        type: 'String',
        description: 'The starting string',
        optional: true,
      },
      {
        name: 'sep',
        type: 'String',
        description: 'The separator string between elements',
      },
      {
        name: 'end',
        type: 'String',
        description: 'The ending string',
        optional: true,
      },
    ],
    returns: {
      type: 'String',
      description: 'A string representation of all elements joined with the separator',
    },
    examples: [
      {
        code: 'List(1, 2, 3).mkString(", ")',
        output: '"1, 2, 3"',
        explanation: 'Joins elements with comma and space',
      },
      {
        code: 'List(1, 2, 3).mkString("[", ", ", "]")',
        output: '"[1, 2, 3]"',
        explanation: 'Joins with start, separator, and end strings',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['toString', 'split'],
    sinceVersion: '2.0',
    notes: ['Available on all collections, not just strings'],
  },
  {
    name: 'trim',
    category: 'String Methods',
    syntax: 'str.trim: String',
    description: 'Returns a copy of the string with leading and trailing whitespace removed.',
    arguments: [],
    returns: {
      type: 'String',
      description: 'The string with whitespace trimmed from both ends',
    },
    examples: [
      {
        code: '"  hello  ".trim',
        output: '"hello"',
        explanation: 'Removes leading and trailing spaces',
      },
      {
        code: '"\\t\\nhello\\n\\t".trim',
        output: '"hello"',
        explanation: 'Removes tabs and newlines from both ends',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['strip', 'stripLeading', 'stripTrailing'],
    notes: ['Inherited from java.lang.String'],
  },
  {
    name: 'contains',
    category: 'String Methods',
    syntax: 'str.contains(s: CharSequence): Boolean',
    description: 'Tests whether this string contains the specified sequence of characters.',
    arguments: [
      {
        name: 's',
        type: 'CharSequence',
        description: 'The character sequence to search for',
      },
    ],
    returns: {
      type: 'Boolean',
      description: 'true if this string contains the specified sequence',
    },
    examples: [
      {
        code: '"hello world".contains("world")',
        output: 'true',
      },
      {
        code: '"hello world".contains("xyz")',
        output: 'false',
      },
    ],
    timeComplexity: 'O(n * m)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['startsWith', 'endsWith', 'indexOf'],
    notes: ['Case-sensitive comparison'],
  },
  // ============================================================
  // Map Methods
  // ============================================================
  {
    name: 'getOrElse',
    category: 'Map Methods',
    syntax: 'map.getOrElse(key: K, default: => V): V',
    description:
      'Returns the value associated with a key, or a default value if the key is not contained in the map.',
    arguments: [
      {
        name: 'key',
        type: 'K',
        description: 'The key to look up',
      },
      {
        name: 'default',
        type: '=> V',
        description:
          'A computation that yields a default value in case no binding for the key is found',
      },
    ],
    returns: {
      type: 'V',
      description: 'The value associated with the key if it exists, otherwise the default value',
    },
    examples: [
      {
        code: 'val m = Map("a" -> 1, "b" -> 2)\nm.getOrElse("a", 0)',
        output: '1',
        explanation: 'Key "a" exists, so its value 1 is returned',
      },
      {
        code: 'val m = Map("a" -> 1, "b" -> 2)\nm.getOrElse("c", 0)',
        output: '0',
        explanation: 'Key "c" does not exist, so the default value 0 is returned',
      },
    ],
    timeComplexity: 'O(1) for HashMap, O(log n) for TreeMap',
    spaceComplexity: 'O(1)',
    relatedMethods: ['get', 'apply', 'contains'],
    sinceVersion: '2.0',
    notes: ['The default parameter is by-name, so it is only evaluated if the key is missing'],
  },
  {
    name: 'updated',
    category: 'Map Methods',
    syntax: 'map.updated(key: K, value: V): Map[K, V]',
    description:
      'Creates a new map with an additional or updated key/value mapping. The original map is not modified.',
    arguments: [
      {
        name: 'key',
        type: 'K',
        description: 'The key to add or update',
      },
      {
        name: 'value',
        type: 'V',
        description: 'The value to associate with the key',
      },
    ],
    returns: {
      type: 'Map[K, V]',
      description: 'A new map containing the new key/value mapping',
    },
    examples: [
      {
        code: 'val m = Map("a" -> 1, "b" -> 2)\nm.updated("c", 3)',
        output: 'Map("a" -> 1, "b" -> 2, "c" -> 3)',
        explanation: 'Adds a new key-value pair to the map',
      },
      {
        code: 'val m = Map("a" -> 1, "b" -> 2)\nm.updated("a", 10)',
        output: 'Map("a" -> 10, "b" -> 2)',
        explanation: 'Updates the existing value for key "a"',
      },
    ],
    timeComplexity: 'O(1) for HashMap, O(log n) for TreeMap',
    spaceComplexity: 'O(n)',
    relatedMethods: ['removed', '+', '-'],
    sinceVersion: '2.0',
    notes: ['Also available via the + operator: map + ("c" -> 3)'],
  },
  {
    name: 'keys',
    category: 'Map Methods',
    syntax: 'map.keys: Iterable[K]',
    description: 'Returns an iterable containing all keys of this map.',
    arguments: [],
    returns: {
      type: 'Iterable[K]',
      description: 'An iterable containing all keys',
    },
    examples: [
      {
        code: 'Map("a" -> 1, "b" -> 2, "c" -> 3).keys',
        output: 'Set("a", "b", "c")',
        explanation: 'Returns all keys as an iterable',
      },
    ],
    timeComplexity: 'O(1) to create the view, O(n) to traverse',
    spaceComplexity: 'O(1)',
    relatedMethods: ['values', 'keySet', 'keysIterator'],
    sinceVersion: '2.0',
  },
  {
    name: 'filterKeys',
    category: 'Map Methods',
    syntax: 'map.view.filterKeys(p: K => Boolean): MapView[K, V]',
    description:
      'Filters this map by retaining only keys satisfying a predicate. Returns a lazy view in Scala 2.13+.',
    arguments: [
      {
        name: 'p',
        type: 'K => Boolean',
        description: 'The predicate used to test keys',
      },
    ],
    returns: {
      type: 'MapView[K, V]',
      description: 'A map view containing only entries whose keys satisfy the predicate',
    },
    examples: [
      {
        code: 'val m = Map("apple" -> 1, "banana" -> 2, "avocado" -> 3)\nm.view.filterKeys(_.startsWith("a")).toMap',
        output: 'Map("apple" -> 1, "avocado" -> 3)',
        explanation: 'Keeps only entries whose key starts with "a"',
      },
    ],
    timeComplexity: 'O(n) when materialized',
    spaceComplexity: 'O(n) when materialized',
    relatedMethods: ['filter', 'mapValues', 'keys'],
    sinceVersion: '2.13',
    notes: [
      'In Scala 2.13+, use .view.filterKeys instead of .filterKeys to avoid deprecation warnings',
    ],
  },
  // ============================================================
  // Set Methods
  // ============================================================
  {
    name: 'contains',
    category: 'Set Methods',
    syntax: 'set.contains(elem: A): Boolean',
    description: 'Tests whether this set contains a given value as an element.',
    arguments: [
      {
        name: 'elem',
        type: 'A',
        description: 'The element to test for membership',
      },
    ],
    returns: {
      type: 'Boolean',
      description: 'true if the set contains the element',
    },
    examples: [
      {
        code: 'Set(1, 2, 3).contains(2)',
        output: 'true',
      },
      {
        code: 'Set(1, 2, 3).contains(5)',
        output: 'false',
      },
    ],
    timeComplexity: 'O(1) for HashSet, O(log n) for TreeSet',
    spaceComplexity: 'O(1)',
    relatedMethods: ['apply', 'subsetOf', 'intersect'],
    sinceVersion: '2.0',
    notes: ['Also available via the apply method: set(2) is equivalent to set.contains(2)'],
  },
  {
    name: 'union',
    category: 'Set Methods',
    syntax: 'set1.union(set2: Set[A]): Set[A]',
    description:
      'Computes the union of this set and another set, returning all elements from both.',
    arguments: [
      {
        name: 'set2',
        type: 'Set[A]',
        description: 'The set to form the union with',
      },
    ],
    returns: {
      type: 'Set[A]',
      description: 'A set containing all elements from both sets',
    },
    examples: [
      {
        code: 'Set(1, 2, 3).union(Set(3, 4, 5))',
        output: 'Set(1, 2, 3, 4, 5)',
        explanation: 'Combines both sets, removing duplicates',
      },
    ],
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(n + m)',
    relatedMethods: ['intersect', 'diff', '++'],
    sinceVersion: '2.0',
    notes: ['Also available via the | or ++ operator'],
  },
  {
    name: 'intersect',
    category: 'Set Methods',
    syntax: 'set1.intersect(set2: Set[A]): Set[A]',
    description:
      'Computes the intersection of this set and another set, returning elements present in both.',
    arguments: [
      {
        name: 'set2',
        type: 'Set[A]',
        description: 'The set to intersect with',
      },
    ],
    returns: {
      type: 'Set[A]',
      description: 'A set containing only elements present in both sets',
    },
    examples: [
      {
        code: 'Set(1, 2, 3, 4).intersect(Set(3, 4, 5, 6))',
        output: 'Set(3, 4)',
        explanation: 'Returns only elements found in both sets',
      },
    ],
    timeComplexity: 'O(min(n, m))',
    spaceComplexity: 'O(min(n, m))',
    relatedMethods: ['union', 'diff', '&'],
    sinceVersion: '2.0',
    notes: ['Also available via the & operator'],
  },
  // ============================================================
  // Option Methods
  // ============================================================
  {
    name: 'getOrElse',
    category: 'Option Methods',
    syntax: 'option.getOrElse(default: => A): A',
    description:
      'Returns the option value if it is nonempty, otherwise returns the result of evaluating default.',
    arguments: [
      {
        name: 'default',
        type: '=> A',
        description: 'The default expression evaluated if the Option is None',
      },
    ],
    returns: {
      type: 'A',
      description: 'The contained value or the default',
    },
    examples: [
      {
        code: 'Some(42).getOrElse(0)',
        output: '42',
        explanation: 'Option is Some, so the contained value is returned',
      },
      {
        code: 'None.getOrElse(0)',
        output: '0',
        explanation: 'Option is None, so the default value is returned',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['orElse', 'fold', 'get'],
    sinceVersion: '2.0',
    notes: [
      'Preferred over .get which throws NoSuchElementException on None',
      'The default parameter is by-name and only evaluated when needed',
    ],
  },
  {
    name: 'map',
    category: 'Option Methods',
    syntax: 'option.map(f: A => B): Option[B]',
    description:
      'Returns a Some containing the result of applying f to this Option value if it is nonempty, otherwise returns None.',
    arguments: [
      {
        name: 'f',
        type: 'A => B',
        description: 'The function to apply',
      },
    ],
    returns: {
      type: 'Option[B]',
      description: 'Some(f(value)) if nonempty, None otherwise',
    },
    examples: [
      {
        code: 'Some(3).map(_ * 2)',
        output: 'Some(6)',
        explanation: 'Applies the doubling function to the contained value',
      },
      {
        code: 'val x: Option[Int] = None\nx.map(_ * 2)',
        output: 'None',
        explanation: 'None remains None after map',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['flatMap', 'fold', 'foreach'],
    sinceVersion: '2.0',
    notes: ['Allows safe transformation without explicit None checking'],
  },
  {
    name: 'flatMap',
    category: 'Option Methods',
    syntax: 'option.flatMap(f: A => Option[B]): Option[B]',
    description:
      'Returns the result of applying f to this Option value if it is nonempty, otherwise returns None. Avoids nested Options.',
    arguments: [
      {
        name: 'f',
        type: 'A => Option[B]',
        description: 'The function to apply, which returns an Option',
      },
    ],
    returns: {
      type: 'Option[B]',
      description: 'f(value) if nonempty, None otherwise',
    },
    examples: [
      {
        code: 'Some(5).flatMap(x => if (x > 0) Some(x * 2) else None)',
        output: 'Some(10)',
        explanation: 'The function returns Some(10), which is returned directly without wrapping',
      },
      {
        code: 'Some(-1).flatMap(x => if (x > 0) Some(x * 2) else None)',
        output: 'None',
        explanation: 'The function returns None for negative input',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['map', 'orElse', 'fold'],
    sinceVersion: '2.0',
    notes: ['Commonly used in for-comprehensions to chain optional computations'],
  },
  {
    name: 'fold',
    category: 'Option Methods',
    syntax: 'option.fold[B](ifEmpty: => B)(f: A => B): B',
    description:
      'Returns the result of applying f to the Option value if nonempty, or the value of ifEmpty otherwise.',
    arguments: [
      {
        name: 'ifEmpty',
        type: '=> B',
        description: 'The expression to evaluate if the Option is empty',
      },
      {
        name: 'f',
        type: 'A => B',
        description: 'The function to apply if the Option is nonempty',
      },
    ],
    returns: {
      type: 'B',
      description: 'The result of f applied to the value, or ifEmpty',
    },
    examples: [
      {
        code: 'Some(3).fold("empty")(x => s"value: $x")',
        output: '"value: 3"',
        explanation: 'Option is Some, so the function is applied to the value',
      },
      {
        code: 'val x: Option[Int] = None\nx.fold("empty")(x => s"value: $x")',
        output: '"empty"',
        explanation: 'Option is None, so the ifEmpty value is returned',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['map', 'getOrElse', 'match'],
    sinceVersion: '2.10',
    notes: [
      'Equivalent to option.map(f).getOrElse(ifEmpty) but avoids intermediate Option creation',
    ],
  },
  // ============================================================
  // Tuple & Pattern Matching
  // ============================================================
  {
    name: 'swap',
    category: 'Tuple & Pattern Matching',
    syntax: 'tuple2.swap: (T2, T1)',
    description:
      'Swaps the elements of a Tuple2, returning a new tuple with the elements in reverse order.',
    arguments: [],
    returns: {
      type: '(T2, T1)',
      description: 'A new tuple with the two elements swapped',
    },
    examples: [
      {
        code: '(1, "hello").swap',
        output: '("hello", 1)',
        explanation: 'Swaps the Int and String positions in the tuple',
      },
      {
        code: '("key", "value").swap',
        output: '("value", "key")',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['copy', '_1', '_2'],
    sinceVersion: '2.0',
    notes: ['Only available on Tuple2 (pairs)'],
  },
  {
    name: 'copy',
    category: 'Tuple & Pattern Matching',
    syntax: 'caseClass.copy(field1 = newVal, ...): CaseClass',
    description:
      'Creates a shallow copy of a case class instance, optionally replacing specified fields with new values.',
    arguments: [
      {
        name: 'fields',
        type: 'named parameters',
        description: 'Named parameters matching the case class fields to override',
        optional: true,
      },
    ],
    returns: {
      type: 'CaseClass',
      description: 'A new instance with the specified fields updated',
    },
    examples: [
      {
        code: 'case class Point(x: Int, y: Int)\nval p = Point(1, 2)\np.copy(x = 10)',
        output: 'Point(10, 2)',
        explanation: 'Creates a new Point with x changed to 10, y unchanged',
      },
      {
        code: 'case class User(name: String, age: Int)\nUser("Alice", 30).copy(age = 31)',
        output: 'User("Alice", 31)',
        explanation: 'Creates a new User with updated age',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['apply', 'unapply', 'productIterator'],
    sinceVersion: '2.8',
    notes: [
      'Automatically generated for all case classes',
      'Performs a shallow copy - mutable nested objects are shared',
    ],
  },
  {
    name: 'productIterator',
    category: 'Tuple & Pattern Matching',
    syntax: 'product.productIterator: Iterator[Any]',
    description: 'Returns an iterator over all the elements of this product (tuple or case class).',
    arguments: [],
    returns: {
      type: 'Iterator[Any]',
      description: 'An iterator over all elements of this product',
    },
    examples: [
      {
        code: '(1, "hello", true).productIterator.toList',
        output: 'List(1, "hello", true)',
        explanation: 'Iterates over all elements of the tuple',
      },
      {
        code: 'case class RGB(r: Int, g: Int, b: Int)\nRGB(255, 128, 0).productIterator.mkString(", ")',
        output: '"255, 128, 0"',
        explanation: 'Iterates over case class fields and joins them as a string',
      },
    ],
    timeComplexity: 'O(1) to create, O(n) to traverse',
    spaceComplexity: 'O(1)',
    relatedMethods: ['productArity', 'productElement'],
    sinceVersion: '2.8',
    notes: ['Available on all tuples and case classes via the Product trait'],
  },
  // ============================================================
  // Collection Utilities
  // ============================================================
  {
    name: 'groupBy',
    category: 'Collection Utilities',
    syntax: 'collection.groupBy(f: A => K): Map[K, Coll[A]]',
    description:
      'Partitions this collection into a map of collections according to a discriminator function.',
    arguments: [
      {
        name: 'f',
        type: 'A => K',
        description: 'The discriminator function that maps each element to a key',
      },
    ],
    returns: {
      type: 'Map[K, Coll[A]]',
      description: 'A map from keys to collections of elements that share that key',
    },
    examples: [
      {
        code: 'List(1, 2, 3, 4, 5).groupBy(_ % 2 == 0)',
        output: 'Map(false -> List(1, 3, 5), true -> List(2, 4))',
        explanation: 'Groups elements by whether they are even',
      },
      {
        code: 'List("apple", "avocado", "banana").groupBy(_.head)',
        output: 'Map(\'a\' -> List("apple", "avocado"), \'b\' -> List("banana"))',
        explanation: 'Groups strings by their first character',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['partition', 'groupMap', 'groupMapReduce'],
    sinceVersion: '2.0',
  },
  {
    name: 'partition',
    category: 'Collection Utilities',
    syntax: 'collection.partition(p: A => Boolean): (Coll[A], Coll[A])',
    description:
      'Splits this collection into a pair of collections: one with elements satisfying the predicate, and one with elements that do not.',
    arguments: [
      {
        name: 'p',
        type: 'A => Boolean',
        description: 'The predicate used to partition elements',
      },
    ],
    returns: {
      type: '(Coll[A], Coll[A])',
      description: 'A pair: (elements satisfying p, elements not satisfying p)',
    },
    examples: [
      {
        code: 'List(1, 2, 3, 4, 5).partition(_ % 2 == 0)',
        output: '(List(2, 4), List(1, 3, 5))',
        explanation: 'Splits into even and odd numbers',
      },
      {
        code: 'List("cat", "dog", "cow", "deer").partition(_.startsWith("c"))',
        output: '(List("cat", "cow"), List("dog", "deer"))',
        explanation: 'Splits by whether the string starts with "c"',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['filter', 'filterNot', 'span', 'groupBy'],
    sinceVersion: '2.0',
    notes: ['More efficient than calling filter and filterNot separately'],
  },
  {
    name: 'takeWhile',
    category: 'Collection Utilities',
    syntax: 'collection.takeWhile(p: A => Boolean): Coll[A]',
    description: 'Takes the longest prefix of elements that satisfy the predicate.',
    arguments: [
      {
        name: 'p',
        type: 'A => Boolean',
        description: 'The predicate used to test elements',
      },
    ],
    returns: {
      type: 'Coll[A]',
      description: 'The longest prefix of elements satisfying the predicate',
    },
    examples: [
      {
        code: 'List(1, 2, 3, 4, 1, 2).takeWhile(_ < 4)',
        output: 'List(1, 2, 3)',
        explanation: 'Takes elements while they are less than 4, stops at the first 4',
      },
      {
        code: 'List(2, 4, 6, 7, 8).takeWhile(_ % 2 == 0)',
        output: 'List(2, 4, 6)',
        explanation: 'Takes elements while they are even',
      },
    ],
    timeComplexity: 'O(n) in worst case',
    spaceComplexity: 'O(n) in worst case',
    relatedMethods: ['dropWhile', 'span', 'take', 'filter'],
    sinceVersion: '2.0',
  },
  {
    name: 'sortBy',
    category: 'Collection Utilities',
    syntax: 'collection.sortBy[B](f: A => B)(implicit ord: Ordering[B]): Coll[A]',
    description:
      'Sorts this collection according to a transformation function that maps each element to an Ordered value.',
    arguments: [
      {
        name: 'f',
        type: 'A => B',
        description: 'The transformation function that extracts the sort key',
      },
    ],
    returns: {
      type: 'Coll[A]',
      description: 'A new collection sorted by the extracted keys',
    },
    examples: [
      {
        code: 'List("banana", "fig", "apple").sortBy(_.length)',
        output: 'List("fig", "apple", "banana")',
        explanation: 'Sorts strings by their length',
      },
      {
        code: 'List((3, "c"), (1, "a"), (2, "b")).sortBy(_._1)',
        output: 'List((1, "a"), (2, "b"), (3, "c"))',
        explanation: 'Sorts tuples by their first element',
      },
    ],
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['sorted', 'sortWith', 'reverse'],
    sinceVersion: '2.0',
    notes: ['Uses TimSort algorithm under the hood via java.util.Arrays.sort'],
  },
  {
    name: 'distinct',
    category: 'Collection Utilities',
    syntax: 'collection.distinct: Coll[A]',
    description:
      'Selects all the elements of this collection ignoring duplicates. Preserves the order of first occurrence.',
    arguments: [],
    returns: {
      type: 'Coll[A]',
      description: 'A new collection without duplicate elements',
    },
    examples: [
      {
        code: 'List(1, 2, 2, 3, 3, 3, 1).distinct',
        output: 'List(1, 2, 3)',
        explanation: 'Removes duplicate elements, preserving first occurrence order',
      },
      {
        code: 'List("a", "b", "a", "c", "b").distinct',
        output: 'List("a", "b", "c")',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['distinctBy', 'toSet'],
    sinceVersion: '2.0',
    notes: ['Uses a HashSet internally to track seen elements'],
  },
  {
    name: 'collect',
    category: 'Collection Utilities',
    syntax: 'collection.collect(pf: PartialFunction[A, B]): Coll[B]',
    description:
      'Builds a new collection by applying a partial function to all elements on which the function is defined. Combines filter and map in a single step.',
    arguments: [
      {
        name: 'pf',
        type: 'PartialFunction[A, B]',
        description: 'The partial function applied to matching elements',
      },
    ],
    returns: {
      type: 'Coll[B]',
      description: 'A new collection with the results of applying the partial function',
    },
    examples: [
      {
        code: 'List(1, 2, 3, 4, 5).collect { case x if x % 2 == 0 => x * 10 }',
        output: 'List(20, 40)',
        explanation: 'Selects even numbers and multiplies them by 10 in one pass',
      },
      {
        code: 'val mixed: List[Any] = List(1, "hello", 2, "world")\nmixed.collect { case s: String => s.toUpperCase }',
        output: 'List("HELLO", "WORLD")',
        explanation: 'Extracts and transforms only String elements from a mixed list',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['map', 'filter', 'flatMap', 'collectFirst'],
    sinceVersion: '2.8',
    notes: [
      'More idiomatic than filter + map when using pattern matching',
      'Uses PartialFunction.isDefinedAt to test elements',
    ],
  },
  {
    name: 'sliding',
    category: 'Collection Utilities',
    syntax: 'collection.sliding(size: Int, step: Int = 1): Iterator[Coll[A]]',
    description: 'Groups elements into fixed-size blocks by passing a sliding window over them.',
    arguments: [
      {
        name: 'size',
        type: 'Int',
        description: 'The number of elements per group (window size)',
      },
      {
        name: 'step',
        type: 'Int',
        description: 'The step between each group start',
        optional: true,
        defaultValue: '1',
      },
    ],
    returns: {
      type: 'Iterator[Coll[A]]',
      description: 'An iterator producing collections of the specified window size',
    },
    examples: [
      {
        code: 'List(1, 2, 3, 4, 5).sliding(3).toList',
        output: 'List(List(1, 2, 3), List(2, 3, 4), List(3, 4, 5))',
        explanation: 'Creates windows of size 3 with step 1',
      },
      {
        code: 'List(1, 2, 3, 4, 5).sliding(2, 2).toList',
        output: 'List(List(1, 2), List(3, 4), List(5))',
        explanation: 'Creates windows of size 2 with step 2 (non-overlapping)',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(size) per window',
    relatedMethods: ['grouped', 'take', 'drop'],
    sinceVersion: '2.0',
    notes: [
      'The last window may be smaller than the specified size if there are not enough elements',
    ],
  },
];

export default scalaMethods;
