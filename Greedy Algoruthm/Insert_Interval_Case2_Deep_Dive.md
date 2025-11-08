# Insert Interval — Deep Dive on Case 2 (Overlapping & Greedy Merge)

**What this note contains**
- Quick problem recap and the full greedy algorithm (one-pass).  
- A deep, beginner-friendly explanation of **Case 2 — overlapping intervals**, with intuition.  
- Step-by-step examples with clear ASCII timeline diagrams that show how `newInterval` *expands* as we merge.  
- Complete JavaScript implementation and dry runs.  
- Summary and interview tips.

---

## Problem recap (short)
You are given a list of **non-overlapping** intervals sorted by start time, `intervals`, and a `newInterval`. Insert `newInterval` into `intervals` so that the result remains sorted and non-overlapping (merge overlapping intervals).

Example:
```
intervals = [[1,3],[6,9]]
newInterval = [2,5]
Output: [[1,5],[6,9]]
```

---

## Greedy one-pass algorithm (full view)
1. Initialize result array `res = []` and index `i = 0`.
2. Add all intervals that end **before** `newInterval` starts:
   ```js
   while (i < intervals.length && intervals[i][1] < newInterval[0]) {
     res.push(intervals[i]);
     i++;
   }
   ```
3. **Merge overlapping intervals** (Case 2):
   ```js
   while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
     newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
     newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
     i++;
   }
   res.push(newInterval);
   ```
4. Add the remaining intervals (those that start after the merged interval):
   ```js
   while (i < intervals.length) {
     res.push(intervals[i]);
     i++;
   }
   ```

That's it — a single linear scan, `O(n)` time.

---

## Focus: Case 2 — Why merge *immediately* when overlap is detected?

**Short answer:** Because once intervals overlap, they represent one continuous time range — merging them immediately is correct and avoids revisiting intervals later. Any future overlapping interval will only extend this merged range, never split it. So merging now is a locally optimal choice that leads to a globally correct result.

### Intuition in plain language
- Intervals are like painted segments on a number line.
- If two paint strokes overlap, they form a single painted block.
- When you detect an overlap between `newInterval` and the current interval, they **must** be part of the same final block — so combine them at once.
- If subsequent intervals connect to that block, you'll extend it; if they don't, you'll finish merging and append the block to the answer.

---

## Visual timeline diagrams (ASCII) — watch the expansion

### Example A
```
intervals = [[1,2], [3,5], [6,7], [8,10], [12,16]]
newInterval = [4,8]
```

Initial picture (aligned roughly):

```
Time:   1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
        |-------|   |---------| |-----| |-------|  |-----|
ints:     [1,2]   [3,5]      [6,7]   [8,10]      [12,16]
newInt:            [4,8]
```

**Walkthrough**:

1. `[1,2]` ends before new start → append:
   `res = [[1,2]]`

2. See `[3,5]` — check overlap?
   - Condition: `3 <= 8` → yes overlap
   - Merge: newInterval becomes `[min(4,3), max(8,5)] = [3,8]`

   Diagram after merge:
```
Time:   1 2 3 4 5 6 7 8 9 10 11 12 ...
        |-------|   [=======MERGED======]  |-----|
ints:     [1,2]   [3,5] [6,7] [8,10]       [12,16]
newInt:           [3,8] (after merging with [3,5])
```

3. Next `[6,7]` → `6 <= 8` → overlap → merge:
   newInterval stays `[3,8]` (max(8,7)=8)

4. Next `[8,10]` → `8 <= 8` → overlap (touching counts) → merge:
   newInterval becomes `[3,10]`

5. Next `[12,16]` → `12 > 10` → no overlap → stop merging and push `[3,10]`.

Final result: `[[1,2],[3,10],[12,16]]`

---

### Example B (overlap starts immediately)
```
intervals = [[1,5]]
newInterval = [2,3]
```

Visual:
```
Time: 1 2 3 4 5
ints: [1-----------5]
new:    [2-3]
```

- When we reach `[1,5]`, condition `1 <= 3` → overlap → merged interval = `[min(1,2), max(5,3)] = [1,5]` (unchanged)
- Push `[1,5]` → final `[[1,5]]`

---

## Why merging now is always safe (proof sketch)
- Suppose interval A overlaps newInterval B. Their union is a single interval C = [min(A.start, B.start), max(A.end, B.end)].
- Any later interval D that overlaps either A or B must overlap C because C covers both A and B. Thus merging A and B first and then merging D into C is equivalent to merging all three at once later. The order doesn't matter; the union is the same. So performing the merge immediately is a valid greedy step.

---

## Full JavaScript code (one-pass greedy)
```js
function insertInterval(intervals, newInterval) {
  const res = [];
  let i = 0, n = intervals.length;

  // 1) Add intervals that come before newInterval
  while (i < n && intervals[i][1] < newInterval[0]) {
    res.push(intervals[i]);
    i++;
  }

  // 2) Merge overlapping intervals with newInterval
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  res.push([newInterval[0], newInterval[1]]);

  // 3) Add remaining intervals
  while (i < n) {
    res.push(intervals[i]);
    i++;
  }

  return res;
}
```

---

## Detailed dry run with console-style steps

Input:
```
intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]]
newInterval = [4,8]
```

Console trace (imaginary):
```
i=0, interval=[1,2], 2 < 4 -> push [1,2]
i=1, interval=[3,5], 3 <= 8 -> overlap -> merge -> newInterval becomes [3,8]
i=2, interval=[6,7], 6 <= 8 -> overlap -> merge -> newInterval stays [3,8]
i=3, interval=[8,10], 8 <= 8 -> overlap -> merge -> newInterval becomes [3,10]
i=4, interval=[12,16], 12 > 10 -> stop merging, push merged [3,10]
append remaining [12,16]
result = [[1,2],[3,10],[12,16]]
```

---

## Interview tips & common pitfalls
- **Do not sort** the intervals again — input is already sorted by start time.
- **Remember to handle "touching" intervals**: decide if `[1,2]` and `[2,3]` should merge based on problem definition (common versions treat touching as overlap; this code uses `<=` so they will merge).
- **Be careful to push a *copy* of newInterval** if you don't want to mutate input arrays in-place.
- **Edge cases**: empty `intervals` (return `[newInterval]`), `newInterval` entirely before or after all intervals, `newInterval` encloses all intervals.

---

## TL;DR (one-liner)
When you detect overlap, merge immediately and keep expanding the merged interval while overlaps continue. This greedy action is safe and optimal because the union of overlapping intervals is independent of the order in which individual overlaps are merged.

---
