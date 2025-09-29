
# Backtracking: Subsets vs Permutations

This note covers two fundamental backtracking problems:
1. **Subsets (Power Set problem)**
2. **Permutations**

We’ll explain both in detail, including dry runs, key mechanics, and comparison.

---

## 🔹 Subset Problem

### Problem
Given an array, generate all possible subsets (the power set).

Example:  
Input: `[1,2,3]`  
Output:  
```
[[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]
```

### Code
```js
var subsets = function(arr) {
    let result = [];
    let n = arr.length;

    let backtrack = (path, start) => {
        result.push([...path]);  // Every path is a subset
        for (let i = start; i < n; i++) {
            path.push(arr[i]);
            backtrack(path, i + 1);  // Move forward only
            path.pop();
        }
    };

    backtrack([], 0);
    return result;
};
```

### Dry Run for [1,2,3]
1. `backtrack([],0)` → save `[]`
   - i=0 → `[1]`
     - save `[1]`
     - i=1 → `[1,2]` → `[1,2,3]`
     - i=2 → `[1,3]`
   - i=1 → `[2]`
     - save `[2]`
     - i=2 → `[2,3]`
   - i=2 → `[3]`

Final result:  
```
[[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
```

### Execution Tree (for [1,2,3])
```
[]
├─ [1]
│   ├─ [1,2]
│   │   └─ [1,2,3]
│   └─ [1,3]
├─ [2]
│   └─ [2,3]
└─ [3]
```

### Key Points
- Save **at every node** (since every path = subset).
- Use `start` to avoid picking left-side elements again.
- Total subsets = `2^n`.

---

## 🔹 Permutation Problem

### Problem
Generate all permutations of an array.

Example:  
Input: `[1,2,3]`  
Output:  
```
[[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
```

### Code
```js
var permute = function(arr) {
    let result = [];
    let n = arr.length;

    let backtrack = (path) => {
        if(path.length === n) {
            result.push([...path]);
            return;
        }
        for(let i = 0; i < n; i++) {
            if(!path.includes(arr[i])) {   // skip used
                path.push(arr[i]);
                backtrack(path);
                path.pop();
            }
        }
    };

    backtrack([]);
    return result;
};
```

### Dry Run for [1,2,3]
1. `backtrack([])`
   - i=0 → `[1]`
     - i=0 skip (1 used)
     - i=1 → `[1,2]`
       - i=2 → `[1,2,3]` ✅ save
     - i=2 → `[1,3]`
       - i=1 → `[1,3,2]` ✅ save
   - i=1 → `[2]`
     - → `[2,1,3]`, `[2,3,1]`
   - i=2 → `[3]`
     - → `[3,1,2]`, `[3,2,1]`

Final result:  
```
[[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
```

### Execution Tree (for [1,2,3])
```
[]
├─ [1]
│   ├─ [1,2]
│   │   └─ [1,2,3]
│   └─ [1,3]
│       └─ [1,3,2]
├─ [2]
│   ├─ [2,1]
│   │   └─ [2,1,3]
│   └─ [2,3]
│       └─ [2,3,1]
└─ [3]
    ├─ [3,1]
    │   └─ [3,1,2]
    └─ [3,2]
        └─ [3,2,1]
```

### Key Points
- Save only when `path.length === n`.
- Use `path.includes` to avoid reusing elements.
- Total permutations = `n!`.

---

## 🔹 Subset vs Permutation

| Feature             | Subsets                                | Permutations                            |
|---------------------|----------------------------------------|------------------------------------------|
| **Order matters?**  | ❌ No (`[1,2]` = `[2,1]`)               | ✅ Yes (`[1,2]` ≠ `[2,1]`)                |
| **When to save?**   | At **every node**                      | Only when `path.length == n`             |
| **Mechanism**       | Use `start` (move forward only)        | Use `path.includes` (skip already used)  |
| **# of results**    | `2^n` subsets                          | `n!` permutations                        |

### Example (n=3)
- **Subsets:** `[[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]`
- **Permutations:** `[[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]`

---

# 🔑 Key Takeaways
- Subsets = all possible selections (order irrelevant).  
- Permutations = all possible orderings (order matters).  
- Backtracking lets us systematically **try choices, recurse, and undo** to explore the entire search space.
