# Maximum Subarray — Kadane, Top‑Down & Bottom‑Up

This single-page `.md` contains:

- Intuition and why Kadane works
- **Bottom-up (Kadane)** JavaScript implementation
- **Top-down (memoized)** JavaScript implementation (DP-style recursive)
- A compact dry-run (tabular) for the example: `[-2,1,-3,4,-1,2,1,-5,4]`
- Complexity, tradeoffs, and practical tips

---

## 1. Quick recap / intuition
A subarray ending at index `i` either:
- extends the best subarray ending at `i-1` (if that helps), or
- starts fresh at `i` (if the previous sum hurts).

So for the *best ending at i* (`curr[i]`):
```
curr[i] = max(arr[i], arr[i] + curr[i-1])
```
The global answer is `max(curr[i])` across all `i`.

Kadane implements this iteratively with O(1) extra space.

---

## 2. Bottom‑Up (Kadane) — JavaScript
```javascript
// Easy-to-read simple Kadane version
function maxSubArray(arr) {
    let currSum = arr[0];
    let maxSum = arr[0];

    for (let i = 1; i < arr.length; i++) {
        currSum = Math.max(currSum + arr[i], arr[i]);
        maxSum = Math.max(currSum, maxSum);
    }

    return maxSum;
}
```

```javascript
// Kadane's algorithm (iterative, bottom-up)
function maxSubarrayKadane(arr) {
  if (arr.length === 0) return 0; // or -Infinity depending on problem

  let currSum = arr[0];
  let maxSum = arr[0];

  for (let i = 1; i < arr.length; i++) {
    // extend previous or start new here
    currSum = Math.max(currSum + arr[i], arr[i]);
    // update global max
    maxSum = Math.max(maxSum, currSum);
  }

  return maxSum;
}

// Example:
// console.log(maxSubarrayKadane([-2,1,-3,4,-1,2,1,-5,4])); // 6
```

**Notes:**
- O(n) time, O(1) space.
- Works in a single left-to-right pass.

---

## 3. Top‑Down (Memoized Recursive DP) — JavaScript

We can express the same recurrence recursively. Let `bestEnd(i)` = maximum subarray sum **that ends at index i**. Then:

```
bestEnd(i) = max(arr[i], arr[i] + bestEnd(i-1))
```
with base `bestEnd(0) = arr[0]`.

Compute `bestEnd(i)` via recursion with memoization, then take the maximum across all `i`.

```javascript
// Top-down memoized version
function maxSubarrayTopDown(arr) {
  const n = arr.length;
  if (n === 0) return 0;

  const memo = new Array(n).fill(null); // memo[i] stores bestEnd(i)

  function bestEnd(i) {
    if (memo[i] !== null) return memo[i];
    if (i === 0) return (memo[0] = arr[0]);

    // compute best ending at i using best ending at i-1
    const val = Math.max(arr[i], arr[i] + bestEnd(i - 1));
    memo[i] = val;
    return val;
  }

  let globalMax = -Infinity;
  for (let i = 0; i < n; i++) {
    globalMax = Math.max(globalMax, bestEnd(i));
  }
  return globalMax;
}

// Example:
// console.log(maxSubarrayTopDown([-2,1,-3,4,-1,2,1,-5,4])); // 6
```

**Notes:**
- Same recurrence as Kadane, but computed top-down.
- Time O(n) (each `bestEnd(i)` computed once), space O(n) for memo and recursion (if you inline recursion it will use O(n) call stack unless converted to iterative).
- Typically slower in practice in JS due to recursion overhead; useful to show the DP structure.

---

## 4. Dry‑run (GIF‑style frames -> Tabular) — example `[-2,1,-3,4,-1,2,1,-5,4]`
We’ll show iteration values for Kadane (bottom-up). For each `i` we show `arr[i]`, decision, `currSum`, and `maxSum`.

| i | arr[i] | currSum decision                 | currSum | maxSum |
|---:|:------:|:--------------------------------|--------:|-------:|
| 0 |  -2   | start: currSum = -2              | -2     | -2     |
| 1 |   1   | max(-2+1, 1) = 1 (start new)     | 1      | 1      |
| 2 |  -3   | max(1-3, -3) = -2 (extend)       | -2     | 1      |
| 3 |   4   | max(-2+4, 4) = 4 (start new)     | 4      | 4      |
| 4 |  -1   | max(4-1, -1) = 3 (extend)        | 3      | 4      |
| 5 |   2   | max(3+2, 2) = 5 (extend)         | 5      | 5      |
| 6 |   1   | max(5+1, 1) = 6 (extend)         | 6      | 6      |
| 7 |  -5   | max(6-5, -5) = 1 (extend)        | 1      | 6      |
| 8 |   4   | max(1+4, 4) = 5 (extend)         | 5      | 6      |

Final answer: **6** (subarray `[4,-1,2,1]`).

---

## 5. Complexity & Tradeoffs

- **Time:** O(n) for both Kadane and the memoized top-down (each index processed once).
- **Space:** Kadane O(1). Top‑Down O(n) for memo (and potentially recursion stack).
- **When to use which:**
  - Use Kadane in production: simplest, fastest, constant extra memory.
  - Use top-down when you want to illustrate DP recurrence or when combining with other recursive logic.

---

## 6. Practical tips & edge cases

- If the array may be empty, decide what to return (0 or `-Infinity`) based on the problem statement.
- If all numbers are negative, Kadane still works: it will pick the single largest element.
- If you need to **recover the subarray indices**, track the start index when you decide to start a new subarray (where `currSum` was set to `arr[i]`).

---

### 7. Recovering subarray example (Kadane, JS)
Below is the version where you **also return the actual maximum subarray**, not just the sum.

```javascript
function maxSubArrayWithIndices(arr) {
  if (arr.length === 0) return { maxSum: 0, subarray: [] };

  let currSum = arr[0];
  let maxSum = arr[0];

  let currStart = 0;
  let bestStart = 0;
  let bestEnd = 0;

  for (let i = 1; i < arr.length; i++) {
    // Should we start a new subarray at i?
    if (arr[i] > currSum + arr[i]) {
      currSum = arr[i];
      currStart = i;
    } else {
      currSum += arr[i];
    }

    // Update global best
    if (currSum > maxSum) {
      maxSum = currSum;
      bestStart = currStart;
      bestEnd = i;
    }
  }

  return {
    maxSum,
    subarray: arr.slice(bestStart, bestEnd + 1)
  };
}
```

```javascript
function kadaneWithIndices(arr) {
  if (arr.length === 0) return { max: 0, start: -1, end: -1 };

  let currSum = arr[0], maxSum = arr[0];
  let currStart = 0, bestStart = 0, bestEnd = 0;

  for (let i = 1; i < arr.length; i++) {
    if (currSum + arr[i] < arr[i]) {
      // start new
      currSum = arr[i];
      currStart = i;
    } else {
      currSum += arr[i];
    }

    if (currSum > maxSum) {
      maxSum = currSum;
      bestStart = currStart;
      bestEnd = i;
    }
  }

  return { max: maxSum, start: bestStart, end: bestEnd };
}

// Example:
// console.log(kadaneWithIndices([-2,1,-3,4,-1,2,1,-5,4]));
// => { max: 6, start: 3, end: 6 }
```

---


