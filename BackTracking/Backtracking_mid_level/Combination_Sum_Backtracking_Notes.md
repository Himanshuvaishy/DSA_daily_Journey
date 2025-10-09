
# 🧩 Combination Sum — Backtracking Explained

## 📘 Problem Definition

> Given an array of distinct integers `candidates` and a target integer `target`, return all unique combinations of candidates where the chosen numbers sum to target. You may reuse the same number any number of times.

---

### 🔹 Example

```js
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
```

**Explanation:**
- 2 + 2 + 3 = 7  
- 7 = 7  

Both combinations are valid.

---

## ⚙️ Key Observations

| Rule | Explanation |
|------|--------------|
| All numbers are **distinct** | No duplicates to handle |
| We can **reuse elements** | That’s why recursion keeps same index `i` |
| **Order doesn’t matter** | `[2,3,2]` = `[2,2,3]` |
| Need **all unique combinations** | Controlled by recursion start index |

---

## 🧠 Intuition

Think of it as a **tree of choices**:

At each step, for every number, you can:
1. Include it → and continue (since reuse is allowed)
2. Skip it → move to the next number

We explore all paths that reach the `target` sum.

If the sum exceeds target → stop (prune branch).

If the sum equals target → store that path.

---

## 🧩 JavaScript Solution (Approach 1)

```js
var combinationSum = function(candidates, target) {
    const result = [];

    function backtrack(start, path, sum) {
        // ✅ Base Case
        if (sum === target) {
            result.push([...path]);
            return;
        }
        if (sum > target) return; // overshoot → stop

        for (let i = start; i < candidates.length; i++) {
            path.push(candidates[i]);               // choose
            backtrack(i, path, sum + candidates[i]); // reuse → i (not i+1)
            path.pop();                             // backtrack
        }
    }

    backtrack(0, [], 0);
    return result;
};
```

---

## 🧩 JavaScript Solution (Approach 2 — Using Remaining Sum)

A slightly optimized and intuitive version using remaining sum tracking:

```js
var combinationSum = function (arr, target) {
    let result = [];

    let backtrack = (remainingSum, path, start) => {
        if (remainingSum === 0) result.push([...path]);
        if (remainingSum <= 0) return;

        for (let i = start; i < arr.length; i++) {
            path.push(arr[i]);
            backtrack(remainingSum - arr[i], path, i); // i → reuse
            path.pop();
        }
    }

    backtrack(target, [], 0);
    return result;
};
```

### 💡 Why this works:
Instead of tracking total `sum`, we track how much is left (`remainingSum`).
When `remainingSum` hits 0 → we found a valid combination.

---

## 🧮 Step-by-Step Dry Run

Input:
```js
candidates = [2,3,6,7]
target = 7
```

---

### Step 1
`backtrack(0, [], 0)` → loop starts

- pick 2 → call `backtrack(0, [2], 2)`
- pick 3 → call `backtrack(1, [3], 3)`
- pick 6 → call `backtrack(2, [6], 6)`
- pick 7 → call `backtrack(3, [7], 7)` ✅ Found → `[7]`

---

### Step 2 — Exploring `[2]`
`path = [2]`, `sum = 2`

loop again from `i = 0`
- pick 2 → `[2,2]` → call `backtrack(0, [2,2], 4)`
- pick 3 → `[2,3]` → call `backtrack(1, [2,3], 5)`

---

### Step 3 — Exploring `[2,2]`
`path = [2,2]`, `sum = 4`

- pick 2 → `[2,2,2]` → sum = 6
- pick 3 → `[2,2,3]` → sum = 7 ✅ Found!

Add `[2,2,3]`

---

### Step 4 — Backtrack

Remove last element each time, explore next options.

At end:
```
Result = [
  [2,2,3],
  [7]
]
```

---

## 🌳 State Space Tree (Simplified)

```
[]
├── 2
│   ├── 2
│   │   ├── 2 ❌ sum=8
│   │   └── 3 ✅ [2,2,3]
│   ├── 3 ❌ sum>target
│   ├── 6 ❌
│   └── 7 ❌
├── 3
│   ├── 3 ❌
│   ├── 6 ❌
│   └── 7 ❌
├── 6 ❌
└── 7 ✅ [7]
```

---

## 🧭 Intuition Recap

| Concept | Meaning |
|----------|----------|
| Same index reuse | Because elements can be repeated |
| Stop on overshoot | When sum > target |
| Include every valid path | When sum == target |
| Use recursion depth to control flow | Each call explores a unique path |
| Backtrack | Undo choice to explore new ones |

---

## ✅ Final Output

```js
[[2,2,3], [7]]
```

---

## 🧩 Time Complexity (Rough)

O(2^N) — because we explore all possible combinations,
but pruning (`sum > target`) helps cut off branches early.

---

## 📘 Summary

- Backtracking is used to **explore all combinations**.
- We **reuse** elements by keeping index same.
- We **avoid overshoot** using base conditions.
- Every recursive path builds a potential combination.
- Backtrack ensures we **undo and explore** other possibilities.

---

> 💡 Key takeaway: Backtracking is a tree search — we choose, explore, and unchoose to find all valid solutions.
