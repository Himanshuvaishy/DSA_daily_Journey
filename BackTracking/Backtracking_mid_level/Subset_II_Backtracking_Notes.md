
# Subset II Problem (Backtracking) — Detailed Notes

## 🧩 Problem Statement
Given an integer array `nums` that may contain **duplicates**, return *all possible subsets (the power set)* — but **without duplicate subsets**.

### Example
```js
Input: nums = [1, 2, 2]
Output: [[], [1], [1,2], [1,2,2], [2], [2,2]]
```

---

## 🧠 Concept
This is a variation of the normal **Subset problem**, but since `nums` can have duplicates, we must skip repeated subsets.

---

## ⚙️ Approach (Backtracking)
1. **Sort the array** → ensures duplicates are adjacent.
2. Use **backtracking** to explore subsets.
3. At each step:
   - Add the current subset (`path`) to results.
   - Iterate through elements starting from `start` index.
   - **Skip duplicates** using:
     ```js
     if (i > start && nums[i] === nums[i - 1]) continue;
     ```
4. **Backtrack** after each recursive call (remove the last added element).

---

## 💻 JavaScript Code
```js
function subsetsWithDup(nums) {
  nums.sort((a, b) => a - b);  // Sort to handle duplicates
  const result = [];

  function backtrack(start, path) {
    result.push([...path]); // Add copy of current subset
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) continue; // Skip duplicate
      path.push(nums[i]); // Choose
      backtrack(i + 1, path); // Explore further
      path.pop(); // Undo (Backtrack)
    }
  }

  backtrack(0, []);
  return result;
}

console.log(subsetsWithDup([1, 2, 2]));
```

### ✅ Output
```
[[], [1], [1,2], [1,2,2], [2], [2,2]]
```

---

## 🔍 Deep Dry Run (Step-by-Step with Indices)

### Initial Call
```
nums = [1,2,2]
result = []
backtrack(0, [])
```

### Execution Trace

| Call | start | path (before loop) | i | nums[i] | Action | Result Added |
|------|--------|--------------------|---|----------|---------|---------------|
| 1 | 0 | [] | 0 | 1 | push(1), recurse → | [] |
| 2 | 1 | [1] | 1 | 2 | push(2), recurse → | [1] |
| 3 | 2 | [1,2] | 2 | 2 | push(2), recurse → | [1,2] |
| 4 | 3 | [1,2,2] | - | - | return | [1,2,2] |
| ← | - | backtrack to [1,2] | - | - | pop() | - |
| ← | - | backtrack to [1] | 2 | 2 | skip duplicate | - |
| ← | - | backtrack to [] | 1 | 2 | push(2), recurse → | [2] |
| 5 | 2 | [2] | 2 | 2 | push(2), recurse → | [2,2] |
| 6 | 3 | [2,2] | - | - | return | - |
| ← | - | backtrack to [2] | - | - | pop() | - |
| ← | - | backtrack to [] | 2 | 2 | skip duplicate | - |

### ✅ Final Result
```
[[], [1], [1,2], [1,2,2], [2], [2,2]]
```

---

## 🌳 State Space Tree Visualization

```
[] 
 ├── [1]
 │    ├── [1,2]
 │    │     └── [1,2,2]
 │    └── (skip duplicate)
 ├── [2]
 │    └── [2,2]
 └── (skip duplicate)
```

---

## 🧠 Key Takeaways

| Concept | Explanation |
|----------|--------------|
| **Backtracking** | Explore all possibilities recursively while undoing choices. |
| **Sorting** | Makes duplicates adjacent, easier to skip. |
| **Duplicate Skip Rule** | `if (i > start && nums[i] === nums[i-1]) continue;` |
| **start index** | Controls where to start looping to avoid reusing earlier elements. |
| **Time Complexity** | O(2^n) — all subsets explored. |
| **Space Complexity** | O(n) recursion stack depth. |

---

## 🧾 Summary Flow

```
[] 
 ├── [1]
 │    ├── [1,2]
 │    │     └── [1,2,2]
 │    └── skip duplicate
 ├── [2]
 │    └── [2,2]
 └── skip duplicate
```

---

## 🧩 Comparison: Subset I vs Subset II

| Feature | Subset I | Subset II |
|----------|-----------|------------|
| Duplicates in input | No | Yes |
| Sorting needed | Optional | Required |
| Skip condition | Not needed | `if (i > start && nums[i] === nums[i-1]) continue;` |
| Result uniqueness | Automatic | Must handle manually |
| Example input | [1,2,3] | [1,2,2] |
| Example output | All subsets | Unique subsets only |

---

## ✅ Final Result Recap
```
[[], [1], [1,2], [1,2,2], [2], [2,2]]
```

---

*Created by ChatGPT (GPT-5) — Detailed Dry Run + Explanation + Visualization*
