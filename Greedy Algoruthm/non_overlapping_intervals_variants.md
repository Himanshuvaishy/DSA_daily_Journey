# Non-overlapping Intervals (LeetCode 435) — Notes & Code Variants

**Problem:** Given `intervals = [[start, end], ...]`, return the **minimum number of intervals** to remove so that the remaining intervals do not overlap. Touching intervals (e.g. `[1,2]` and `[2,3]`) are **non-overlapping**.

---

## ✅ Core Idea (Greedy)
To minimize removals, **maximize the number of intervals you keep**. The optimal greedy strategy is to always keep the interval that **ends earliest** (it leaves the most room for future intervals).

Main steps:
1. Sort intervals by their end time (`end` ascending).
2. Scan left to right, keep an interval if its `start >= lastEnd` (no overlap). Otherwise, remove it.

This yields `O(n log n)` time (sorting) and `O(1)` extra space.

---

## 1) Your Compact Version (sort by end, count removals)
This is short and easy to remember.

```js
var eraseOverlapIntervals = function(arr) {
  arr.sort((a, b) => a[1] - b[1]);
  let removeCount = 0;
  let k = -Infinity; // end time of last kept interval

  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] < k) {
      ++removeCount; // overlap -> remove current
    } else {
      k = arr[i][1]; // keep current -> update last kept end
    }
  }

  return removeCount;
};
```

**Why it works:** Sorting by `end` ensures the first interval you encounter finishes as early as possible. If an interval's start `< k`, it overlaps the previously kept one (which ends at `k`) and should be removed.

**Complexity:** `O(n log n)` time, `O(1)` extra space.

---

## 2) Alternative (count keeps then compute removals)
Equivalent logic but counts how many intervals we keep.

```js
var eraseOverlapIntervals = function(intervals) {
  if (!intervals || intervals.length === 0) return 0;

  intervals.sort((a, b) => a[1] - b[1]);
  let keep = 0;
  let lastEnd = -Infinity;

  for (const [start, end] of intervals) {
    if (start >= lastEnd) {
      keep++;
      lastEnd = end;
    }
  }

  return intervals.length - keep;
};
```

**Note:** semantically same as (1). Use whichever style you prefer.

---

## 3) Variant: Sort by start, remove overlapping by keeping smaller end
This variant sorts by `start` and when an overlap occurs, removes the interval with the **larger end** (so we keep the interval that ends earlier among the conflicting pair). It is equally correct but slightly more involved in implementation.

```js
var eraseOverlapIntervals_sortByStart = function(intervals) {
  if (!intervals || intervals.length === 0) return 0;

  intervals.sort((a, b) => a[0] - b[0]); // sort by start
  let remove = 0;
  let prev = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    const curr = intervals[i];
    if (curr[0] < prev[1]) {
      // overlap -> remove the one with larger end
      remove++;
      if (curr[1] < prev[1]) {
        prev = curr; // keep current (smaller end)
      }
      // else keep prev
    } else {
      // no overlap
      prev = curr;
    }
  }

  return remove;
};
```

**When to use:** Useful if you'd rather reason about starts, or when you also need to return which intervals are removed/kept with minimal changes.

---

## 4) Variant: Return the kept intervals (instead of count)
If you want the actual list of intervals that remain non-overlapping:

```js
function keepNonOverlapping(intervals) {
  if (!intervals || intervals.length === 0) return [];
  intervals.sort((a,b) => a[1] - b[1]);

  const kept = [];
  let lastEnd = -Infinity;

  for (const iv of intervals) {
    if (iv[0] >= lastEnd) {
      kept.push(iv);
      lastEnd = iv[1];
    }
  }

  return kept;
}
```

Then `minRemovals = intervals.length - keepNonOverlapping(intervals).length`.

---

## 5) Dry run (example)
```
arr = [[1,2], [2,3], [3,4], [1,3]]
```
Sorted by end: `[[1,2],[2,3],[1,3],[3,4]]`.
Using your code (1):
- k=-Inf, remove=0
- [1,2]: 1< -Inf? no → keep, k=2
- [2,3]: 2<2? no → keep, k=3
- [1,3]: 1<3? yes → remove++, remove=1
- [3,4]: 3<3? no → keep, k=4
Return `1` (correct).

---

## 6) Edge cases & notes
- Empty input → return 0.
- Single interval → return 0.
- Intervals with equal ends: sorting stable but either equal-end order works.
- Touching intervals are allowed (we use `start >= lastEnd` / `start < lastEnd` checks accordingly).
- If intervals might be unsorted and you need to preserve original indices, sort with index pairs.

---

## 7) Complexity summary
- Time: **O(n log n)** (sorting dominates)
- Space: **O(1)** extra (not counting sort), or **O(n)** if your language's sort is not in-place.

---

## 8) Quick interview tips
- State the greedy idea: "choose the interval that ends earliest" and why it’s optimal.
- Mention complexity and touching-case handling (`>=` vs `>`).
- Offer both end-based sort (preferred) and start-based sort (alternate) solutions.

---

*Done — study-friendly notes with your code, my alternative, and useful variants.*
