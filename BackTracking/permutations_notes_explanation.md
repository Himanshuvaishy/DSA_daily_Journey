# 📘 Backtracking Notes: Permutations

We explored **Permutations** using backtracking, step by step.

------------------------------------------------------------------------

## 1️⃣ Problem Definition: Permutations

-   Given an array of distinct numbers, return *all possible orderings*
    (permutations).

-   Example:\
    Input: `[1,2,3]`\
    Output:

        [1,2,3], [1,3,2], 
        [2,1,3], [2,3,1], 
        [3,1,2], [3,2,1]

------------------------------------------------------------------------

## 2️⃣ Brute Force Idea

-   Generate **all possible sequences** (n\^n possibilities).\
-   Then filter out invalid ones (with duplicates).\
-   This is inefficient.

------------------------------------------------------------------------

## 3️⃣ Optimal Backtracking Solution

``` js
let result = [];
let n = arr.length;

let backtrack = (path) => {
    if(path.length === n){
        result.push([...path]);  // store one valid permutation
        return;
    }

    for(let i=0; i<n; i++){
        if(!path.includes(arr[i])){   // ensure no duplicates
            path.push(arr[i]);
            backtrack(path);
            path.pop();
        }
    }
};

backtrack([]);
return result;
```

### Time Complexity:

-   **O(n × n!)**
    -   There are n! permutations.\
    -   Each permutation requires O(n) work (copying path).

------------------------------------------------------------------------

## 4️⃣ Why `if(!path.includes(arr[i]))`?

-   In permutations, each element must appear **exactly once**.\
-   `path.includes(arr[i])` checks if the element is already used.\
-   If yes → skip.\
-   This prevents duplicates like `[1,1,2]`.\
-   It **prunes** the recursion tree.

------------------------------------------------------------------------

## 5️⃣ Dry Run Example: arr = \[1,2,3\]

### Start

    path = []
    result = []

### Step by step

1.  Pick `1` → path=\[1\]
    -   i=0 → skip (1 already used)\
    -   i=1 → pick `2` → path=\[1,2\]
        -   i=2 → pick `3` → path=\[1,2,3\] ✔ save\
    -   i=2 → pick `3` → path=\[1,3\]
        -   i=1 → pick `2` → path=\[1,3,2\] ✔ save\
2.  Pick `2` → path=\[2\]
    -   i=0 → pick `1` → path=\[2,1\]
        -   i=2 → pick `3` → path=\[2,1,3\] ✔ save\
    -   i=2 → pick `3` → path=\[2,3\]
        -   i=0 → pick `1` → path=\[2,3,1\] ✔ save\
3.  Pick `3` → path=\[3\]
    -   i=0 → pick `1` → path=\[3,1\]
        -   i=1 → pick `2` → path=\[3,1,2\] ✔ save\
    -   i=1 → pick `2` → path=\[3,2\]
        -   i=0 → pick `1` → path=\[3,2,1\] ✔ save

✔ = valid permutation saved\
❌ = skipped because element already in path

------------------------------------------------------------------------

## 6️⃣ Execution Tree

    backtrack([])
     ├─ pick 1 → [1]
     │    ├─ i=0 → skip (1 already in path)
     │    ├─ i=1 → pick 2 → [1,2]
     │    │    ├─ i=0 → skip
     │    │    ├─ i=1 → skip
     │    │    └─ i=2 → pick 3 → [1,2,3] ✔
     │    └─ i=2 → pick 3 → [1,3]
     │         ├─ i=0 → skip
     │         ├─ i=1 → pick 2 → [1,3,2] ✔
     │         └─ i=2 → skip
     ├─ pick 2 → [2]
     │    ├─ i=0 → pick 1 → [2,1]
     │    │    └─ i=2 → pick 3 → [2,1,3] ✔
     │    ├─ i=1 → skip
     │    └─ i=2 → pick 3 → [2,3]
     │         └─ i=0 → pick 1 → [2,3,1] ✔
     └─ pick 3 → [3]
          ├─ i=0 → pick 1 → [3,1]
          │    └─ i=1 → pick 2 → [3,1,2] ✔
          ├─ i=1 → pick 2 → [3,2]
          │    └─ i=0 → pick 1 → [3,2,1] ✔
          └─ i=2 → skip

------------------------------------------------------------------------

# 📊 Subset vs Combination vs Permutation

### 1. Subsets

-   Any selection of elements (order doesn't matter, any size allowed).\
-   Example: `[1,2]` from `[1,2,3]`.\
-   Formula (number of subsets): `2^n`.

------------------------------------------------------------------------

### 2. Combinations

-   Selection of **r elements** (order doesn't matter).\
-   Example: Choosing 2 from \[1,2,3\] → `[1,2], [1,3], [2,3]`.\
-   Formula: `nCr = n! / (r!(n-r)!)`

------------------------------------------------------------------------

### 3. Permutations

-   Arrangement of **r elements** (order matters).\
-   Example: Picking 2 from \[1,2,3\] →
    `[1,2], [2,1], [1,3], [3,1], [2,3], [3,2]`.\
-   Formula: `nPr = n! / (n-r)!`\
-   For all elements (r=n): `n!`

------------------------------------------------------------------------

# ✅ Summary

-   **Subsets** → all possible selections (2\^n).\
-   **Combinations** → choose r elements, order doesn't matter (nCr).\
-   **Permutations** → choose r elements, order matters (nPr).\
-   Backtracking efficiently explores all valid states by recursion +
    undo (pop).
