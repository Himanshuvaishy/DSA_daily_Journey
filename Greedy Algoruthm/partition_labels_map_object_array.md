# Partition Labels — Three JS Implementations (Map, Object, Array)

## Overview
Partition Labels is a greedy string problem:

- **Input:** a string `s` (lowercase letters assumed).
- **Goal:** split `s` into as many parts as possible such that **each letter appears in only one part**. Return the **lengths** of those parts.

Example:

```text
s = "ababcbacadefegdehijhklij"
Output: [9, 7, 8]
// partitions: "ababcbaca" | "defegde" | "hijhklij"
```

---

## Core idea (same for all three implementations)
1. First pass: record the **last index** where each character appears.
2. Second pass: iterate the string while maintaining a window `[start, end]` that represents the current partition. For each character at index `i`, extend `end` to the character's recorded last index. When `i === end`, every character inside the window has its last occurrence within the window, so we can close the partition and record its length `end - start + 1`.

This greedy approach works because we only cut when we are guaranteed that no character in the current partition appears later.

---

## 1) Using `Map` (clean & explicit)
`Map` is ideal when you want clear intention and slightly safer key handling.

```js
/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabelsMap = function(s) {
  const lastIndex = new Map();

  // Step 1: Record last index of each character
  for (let i = 0; i < s.length; i++) {
    lastIndex.set(s[i], i);
  }

  const result = [];
  let start = 0;
  let end = 0;

  // Step 2: Traverse string and form partitions
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, lastIndex.get(s[i]));

    if (i === end) {
      result.push(end - start + 1);
      start = i + 1;
    }
  }

  return result;
};

// Example
console.log(partitionLabelsMap("ababcbacadefegdehijhklij")); // [9,7,8]
```

**Why `Map`?**
- Clear API: `set`, `get`, `has`.
- Good practice when keys might not be simple strings (or if you prefer explicit maps).

---

## 2) Using plain object `{}` (simple and common)
A plain object works fine for characters — it's concise and fast in practice.

```js
/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabelsObject = function(s) {
  const lastIndex = {}; // plain object

  // Step 1: Record last index of each character
  for (let i = 0; i < s.length; i++) {
    lastIndex[s[i]] = i;
  }

  const result = [];
  let start = 0;
  let end = 0;

  // Step 2: Traverse string
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, lastIndex[s[i]]);

    if (i === end) {
      result.push(end - start + 1);
      start = i + 1;
    }
  }

  return result;
};

// Example
console.log(partitionLabelsObject("ababcbacadefegdehijhklij")); // [9,7,8]
```

**Why an object?**
- Short and idiomatic for character keys.
- Slightly faster micro-benchmarks in some engines because of optimized string-keyed properties.

---

## 3) Using fixed-size array (fastest when letters are 'a'–'z')
When the input domain is fixed (lowercase English letters), an array of length `26` is a compact and fast option.

```js
/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabelsArray = function(s) {
  // index: 0 -> 'a', 1 -> 'b', ..., 25 -> 'z'
  const last = new Array(26).fill(0);
  const base = 'a'.charCodeAt(0);

  // Step 1: Record last index
  for (let i = 0; i < s.length; i++) {
    last[s.charCodeAt(i) - base] = i;
  }

  const result = [];
  let start = 0;
  let end = 0;

  // Step 2: Traverse string
  for (let i = 0; i < s.length; i++) {
    const idx = s.charCodeAt(i) - base;
    end = Math.max(end, last[idx]);

    if (i === end) {
      result.push(end - start + 1);
      start = i + 1;
    }
  }

  return result;
};

// Example
console.log(partitionLabelsArray("ababcbacadefegdehijhklij")); // [9,7,8]
```

**Why an array?**
- Constant-time index accesses and no hashing overhead.
- Very memory-efficient for small fixed alphabets.
- Use this when input is guaranteed lowercase letters.

---

## Dry run (short) — how the algorithm works, using the example

`s = "ababcbacadefegdehijhklij"` (indices 0..23)

1. First pass records last occurrences (example: `a -> 8`, `b -> 5`, `c -> 7`, `d -> 14`, `e -> 15`, ...).
2. Second pass: maintain `start = 0` and `end = 0`.
   - i=0: char 'a' → end = max(0, 8) = 8
   - continue until i reaches 8. When i===8 → close partition length `9` (0..8).
   - start = 9, continue: expand end to 15 by char 'e', then close at i===15 → length `7` (9..15).
   - final partition (16..23) → length `8`.

Result: `[9, 7, 8]`.

---

## Complexity
- **Time:** O(n) — two passes over the string (first to record last indices, second to create partitions). Sorting is not required here.
- **Space:**
  - `Map` / object version: O(1) extra (bounded by alphabet size — e.g. 26 for lowercase letters).
  - Array version: O(1) extra (26 slots) — smallest memory footprint.
  - Output array uses O(k) where k is number of partitions.

---

## Edge cases & notes
- Empty string `""` → return `[]`.
- All unique characters (e.g., `"abc"`) → each char is its own partition → `[1,1,1]`.
- If input can contain uppercase letters, digits, or Unicode, prefer `Map` or object. The array approach only works when you can map characters to a small fixed index safely.

---

## Quick tips for interviews
- Explain the idea of recording last indices, then scanning and expanding `end` — this is the main insight.
- Mention time and space complexity and justify why space is O(1) (alphabet-bounded).
- If interviewer asks for micro-optimizations, say that array is fastest for `a`–`z`, `Map` is clear and robust, and object is concise.

---

*Notes file generated by ChatGPT — study-friendly, with three code styles and explanations.*
