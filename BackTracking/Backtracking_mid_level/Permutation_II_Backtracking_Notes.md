# 🔢 Permutation II (Unique Permutations — Backtracking)

## 🧩 Problem Statement
Given a collection of numbers `nums` that might contain **duplicates**, return *all possible unique permutations* in any order.

### Example
```js
Input: nums = [1,1,2]
Output:
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]
```

---

## 🧠 Intuition

- This problem is similar to the normal permutation problem but includes **duplicates**.
- Without control, duplicate numbers would produce identical permutations.
- So we must **avoid choosing the same number twice at the same recursion level.**

✅ **Steps:**
1. Sort the array so duplicates are next to each other.
2. During each recursion level, skip a number if it’s the same as the previous one.

---

## 💻 JavaScript Solution (Using Slicing Approach)

```js
var permuteUnique = function(arr) {
    let result = [];
    arr.sort((a, b) => a - b); // sort to handle duplicates

    const backtrack = (path, choices) => {
        // base case: when the permutation is complete
        if (path.length === arr.length) {
            result.push([...path]);
            return;
        }

        for (let i = 0; i < choices.length; i++) {
            // skip duplicates on the same level
            if (i > 0 && choices[i] === choices[i - 1]) continue;

            // choose
            path.push(choices[i]);

            // explore with remaining elements
            const nextChoices = [...choices.slice(0, i), ...choices.slice(i + 1)];
            backtrack(path, nextChoices);

            // backtrack
            path.pop();
        }
    };

    backtrack([], arr);
    return result;
};
```

---

## 🔍 Dry Run

**Input:** `[1,1,2]`  
**Sorted:** `[1,1,2]`

| Step | Path | Choices | Action |
|------|------|----------|---------|
| 1 | [] | [1,1,2] | Choose 1 |
| 2 | [1] | [1,2] | Choose 1 |
| 3 | [1,1] | [2] | Choose 2 → ✅ Add [1,1,2] |
| 4 | Backtrack | [1] | Choose 2 → path=[1,2,1] → ✅ Add [1,2,1] |
| 5 | Backtrack | [] | Skip duplicate 1, Choose 2 → path=[2,1,1] → ✅ Add [2,1,1] |

**Final Result:**
```js
[[1,1,2], [1,2,1], [2,1,1]]
```

---

## 🌳 State Space Tree

```
          []
     /      |          1        1*        2
  / \                 /  1*  2              1   1*
  |   |             |    |
 2   1             1    1*
```
(* indicates duplicate skip)

---

## 🧮 Complexity Analysis

| Metric | Complexity |
|---------|-------------|
| Time | O(N! × N) — reduced by skipping duplicates |
| Space | O(N²) — due to recursion + array slicing |

---

## ⚖️ Comparison with Used-Array Approach

| Approach | Method | Pros | Cons |
|-----------|---------|------|------|
| **Used[] Array** | Track visited elements | Less memory overhead | Slightly more logic |
| **Slicing Array** | Shrink available choices | Easier to reason about | Higher memory (copies) |

---

## ✅ Summary

| Concept | Description |
|----------|--------------|
| Technique | Backtracking |
| Handles Duplicates | ✅ Yes (via sorting & skipping) |
| Key Idea | Skip same element at same recursion level |
| Space Optimization | Possible via `used[]` version |

---
**Author:** Generated with ❤️ by GPT‑5
