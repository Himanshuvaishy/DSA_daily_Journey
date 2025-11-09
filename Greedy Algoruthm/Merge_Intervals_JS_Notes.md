
# 🧠 Merge Intervals using Greedy Algorithm (JavaScript Notes)

## 📝 1. Problem Statement
You are given an array of intervals where each interval is represented as [start, end].  
👉 Task: Merge all overlapping intervals and return a new array of non-overlapping intervals sorted by their start times.

---

## 💡 2. Example
**Input:**
```js
[[1,3], [2,6], [8,10], [15,18]]
```
**Output:**
```js
[[1,6], [8,10], [15,18]]
```
**Explanation:**  
- [1,3] and [2,6] overlap → merged to [1,6]  
- [8,10] and [15,18] don’t overlap → stay separate

---

## ⚙️ 3. Approach (Greedy)
1. **Sort** intervals by start time (so overlapping ones are next to each other).  
2. **Iterate** through each interval.  
3. If the current interval **overlaps** with the last one in result → merge them.  
4. Else → push as a new interval.

---

## 🧩 4. Step-by-Step Example
Input: `[[1,3], [2,6], [8,10], [15,18]]`

Sorted: `[ [1,3], [2,6], [8,10], [15,18] ]`

Process:
- Start with [1,3]
- Compare [2,6] → overlaps → merge → [1,6]
- Compare [8,10] → no overlap → add
- Compare [15,18] → no overlap → add

✅ Result: `[[1,6],[8,10],[15,18]]`

---

## 💻 5. Code (Explained Version)
```js
/**
 * Merge Overlapping Intervals (Greedy)
 * @param {number[][]} arr
 * @return {number[][]}
 */
function mergeIntervals(arr) {
  if (!arr || arr.length === 0) return [];

  // Step 1: Sort by start
  arr.sort((a, b) => a[0] - b[0]);

  // Step 2: Initialize result with first interval
  const merged = [arr[0]];

  // Step 3: Iterate and merge
  for (let i = 1; i < arr.length; i++) {
    const last = merged[merged.length - 1];
    const current = arr[i];

    if (current[0] <= last[1]) {
      // Overlaps → merge intervals
      last[1] = Math.max(last[1], current[1]);
    } else {
      // No overlap → push new interval
      merged.push(current);
    }
  }

  return merged;
}

// Example usage
console.log(mergeIntervals([[1,3],[2,6],[8,10],[15,18]])); // [[1,6],[8,10],[15,18]]
console.log(mergeIntervals([[1,4],[4,5]])); // [[1,5]]
```

---

## 💻 6. Your Code Version (Simplified)
```js
var merge = function(arr) {
    arr.sort((a, b) => (a[0] - b[0]));
    let ans = [arr[0]];
    for(let i = 1; i < arr.length; i++){
        if(arr[i][0] <= ans[ans.length - 1][1]){
            ans[ans.length-1][1] = Math.max(ans[ans.length-1][1], arr[i][1])
        } else {
            ans.push(arr[i]);
        }
    }
    return ans;
}
```

---

## 📊 7. Time & Space Complexity
| Operation | Complexity | Explanation |
|------------|-------------|-------------|
| Sorting | O(n log n) | Sorting intervals |
| Merging | O(n) | Single pass |
| **Total Time** | **O(n log n)** | Sorting dominates |
| **Space** | **O(n)** | For output array |

---

## ⚠️ 8. Edge Cases
1. Empty input → return `[]`
2. One interval → same interval
3. Touching intervals `[1,4]` and `[4,5]` → merged `[1,5]`
4. Unsorted input handled by sorting step

---

## 🧠 9. Summary
| Step | Action | Example |
|------|---------|----------|
| 1 | Sort intervals | [[1,3],[2,6],[8,10]] |
| 2 | Start with first interval | ans = [[1,3]] |
| 3 | Compare & merge overlaps | [[1,6],[8,10]] |
| 4 | Return merged list | ✅ [[1,6],[8,10],[15,18]] |
