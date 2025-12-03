# Partition Equal Subset Sum — Top-down (Map memo)  
**Solution:** Use recursion + memoization with a `Map` (key = `remS|start`) to avoid a large 2D table.

---

## Problem (short)
Given a positive-integer array `arr`, determine if it can be partitioned into two subsets with equal sums.

Equivalent: can we find a subset whose sum is `totalSum / 2`? If `totalSum` is odd → answer is `false`.

---

## Approach (what we do)
1. Compute `total = sum(arr)`.  
   - If `total % 2 !== 0` → return `false`.  
   - Else `target = total / 2`.
2. Use a top-down recursive search `fn(remS, start)`:
   - `remS` = remaining sum we need to reach (initially `target`).
   - `start` = next index in `arr` from which we can pick elements (initially `0`).
3. At each call:
   - If `remS === 0` → success, return `true`.
   - If `remS < 0` or `start >= arr.length` → fail, return `false`.
   - Otherwise try every index `i` from `start` to `arr.length - 1`:
     - If calling `fn(remS - arr[i], i + 1)` returns `true`, cache and return `true`.
4. Use a `Map` with string key `${remS}|${start}` to memoize results (`true/false`). Return the memoized value if present.

**Why Map instead of 2D array?**  
A naive 2D array `dp[remS][start]` allocates `(target+1) * n` entries which can be huge and wasteful. The Map stores only visited states, reducing memory and often time for sparse reachable states.

---

## Intuition (why it works)
- You attempt to build the target sum by choosing or skipping elements.  
- `start` ensures each element is used at most once and avoids duplicate subsets permutations.  
- Memoization prevents recomputing the same subproblem `(remS, start)` that can be reached via different paths — converting exponential recursion into pseudo-polynomial complexity `O(n * target)` in practice.
- Early exit: as soon as any branch reaches `remS === 0`, we return `true`.

---

## Code (JavaScript)
```javascript
function canPartition(arr) {
  let sum = arr.reduce((acc, curr) => acc + curr, 0);

  if (sum % 2) return false;
  const target = sum / 2;

  const memo = new Map(); // key: "remS|start" -> boolean

  function fn(remS, start) {
    if (remS === 0) return true;
    if (remS < 0 || start >= arr.length) return false;

    const key = remS + "|" + start;
    if (memo.has(key)) return memo.get(key);

    for (let i = start; i < arr.length; i++) {
      if (fn(remS - arr[i], i + 1)) {
        memo.set(key, true);
        return true;
      }
    }

    memo.set(key, false);
    return false;
  }

  return fn(target, 0);
}
```

---

## Complexity
- **Time:** In the worst case, number of distinct states ≈ `O(n * target)`. Each state loops over `i` from `start` onward, but memoization ensures each state computed once. So complexity is **pseudo-polynomial** `O(n * target)`.
- **Space:** `O(n * target)` for memo in worst case + recursion depth `O(n)`.

---

## Dry run — Example 1: `arr = [1, 5, 11, 5]`
- `sum = 22` → `target = 11`.
- Call `fn(11, 0)`.

We will show the important recursive calls and memo updates (format: `fn(remS, start)` → result):

1. `fn(11, 0)`:
   - key `"11|0"` not in memo.
   - Try `i = 0` (arr[0] = 1) → call `fn(10, 1)`.
2. `fn(10, 1)`:
   - `"10|1"` not in memo.
   - Try `i = 1` (5) → `fn(5, 2)`.
3. `fn(5, 2)`:
   - `"5|2"` not in memo.
   - Try `i = 2` (11) → `fn(-6, 3)` → returns `false` (remS < 0).
   - Try `i = 3` (5) → `fn(0, 4)` → returns `true` (remS === 0).
   - So `fn(5,2)` caches `"5|2" = true` and returns `true`.
4. Back to `fn(10,1)`: since `fn(5,2)` returned `true`, cache `"10|1" = true`, return `true`.
5. Back to `fn(11,0)`: since `fn(10,1)` returned `true`, cache `"11|0" = true`, return `true`.

Result: `true` (subset `[1,5,5]` sums to 11; other subset `[11]` sums to 11)

**Memo content after success (example snapshot):**
- `"5|2" -> true`
- `"10|1" -> true`
- `"11|0" -> true`

Because of early success, many other states are never explored.

---

## Dry run — Example 2: `arr = [1, 2, 3, 5]`
- `sum = 11` which is odd → function immediately returns `false`. No recursion needed.

---

## Dry run — Example 3 (more detailed): `arr = [2, 3, 7, 8, 10]`
- `sum = 30` → `target = 15`.
- `fn(15,0)`:

We expand key states (pruned to meaningful ones):

1. `fn(15,0)` tries:
   - i=0 (2) → `fn(13,1)`
2. `fn(13,1)`:
   - i=1 (3) → `fn(10,2)`
3. `fn(10,2)`:
   - i=2 (7) → `fn(3,3)`
4. `fn(3,3)`:
   - i=3 (8) → `fn(-5,4)` false
   - i=4 (10) → `fn(-7,5)` false
   - so `"3|3" -> false`
5. Back to `fn(10,2)`:
   - i=3 (8) → `fn(2,4)`
6. `fn(2,4)`:
   - i=4 (10) → `fn(-8,5)` false
   - so `"2|4" -> false`
7. Back to `fn(10,2)`:
   - i=4 (10) → `fn(0,5)` → true → `"10|2" -> true`
8. Back to `fn(13,1)` → since `"10|2" = true`, `"13|1" -> true`
9. Back to `fn(15,0)` → since `"13|1" = true`, `"15|0" -> true` → success

One found subset: `[2,3,10]` sums to 15.

---

## What the Map memo prevents
Without memoization, subproblems like `fn(10,2)` could be reached from multiple parents and recomputed. The Map ensures each `(remS,start)` computed once. In Example 3, once `"10|2"` is found `true`, any other path to `fn(10,2)` will return instantly.

---

## Tips & optimizations
1. **Sort descending (optional):** Sorting `arr` in descending order may make the recursion find large-success paths earlier and improve pruning (try bigger numbers first).
2. **Early check for single elements:** If any element is greater than `target`, you can skip or early-fail depending on logic.
3. **Iterative 1D DP for performance:** If `target` is small enough, the bottom-up 1D DP `dp[s]` (subset-sum) is faster and uses `O(target)` space.
4. **Use typed keys:** If worried about string key overhead, use a `Map` keyed by numbers using `remS * (n+1) + start` as a unique integer key (careful with overflow for huge targets).

---

## Final code block (copy-ready)
```javascript
function canPartition(arr) {
  let sum = arr.reduce((acc, curr) => acc + curr, 0);
  if (sum % 2) return false;
  const target = sum / 2;

  const memo = new Map();
  function fn(remS, start) {
    if (remS === 0) return true;
    if (remS < 0 || start >= arr.length) return false;

    const key = remS + "|" + start;
    if (memo.has(key)) return memo.get(key);

    for (let i = start; i < arr.length; i++) {
      if (fn(remS - arr[i], i + 1)) {
        memo.set(key, true);
        return true;
      }
    }
    memo.set(key, false);
    return false;
  }

  return fn(target, 0);
}
```

---
