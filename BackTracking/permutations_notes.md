# Permutations Problem

## Problem Statement
Given an array of distinct integers, return all possible permutations.

**Example:**
Input: `[1,2,3]`
Output:
```
[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

---

## 1. Brute Force Approach

### Idea
- Generate all possible orderings by swapping every element with every other element recursively.
- Backtrack after exploring each choice.

### Complexity
- Time Complexity: `O(n!)` (n choices for first, n-1 for second, etc.)
- Space Complexity: `O(n)` recursion depth.

### JavaScript Code
```js
var permuteBrute = function(nums) {
    let result = [];
    function backtrack(path, used) {
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            path.push(nums[i]);
            used[i] = true;
            backtrack(path, used);
            path.pop();
            used[i] = false;
        }
    }
    backtrack([], Array(nums.length).fill(false));
    return result;
};
```

---

## 2. Optimal Backtracking Approach (Path + Includes Check)

### Idea
- Build permutations using a path array.
- At each step, pick elements not yet in the path.
- Add completed path when its length equals n.

### Complexity
- Time Complexity: `O(n!)`
- Space Complexity: `O(n)` recursion depth.

### JavaScript Code
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
            if(!path.includes(arr[i])) {
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

---

## 3. Dry Run Example (arr = [1,2,3])

- Start: backtrack([])
  - path=[]

1. Pick 1 → path=[1], call backtrack([1])
   - Pick 2 → path=[1,2], call backtrack([1,2])
     - Pick 3 → path=[1,2,3] ✔ add to result, pop 3
     - Backtrack → path=[1,2], pick 1 (already in path) → skip
   - Pop 2 → path=[1]
   - Pick 3 → path=[1,3], continue similarly
2. Pop 1 → path=[]
3. Pick 2 → path=[2], continue recursion
4. Pick 3 → path=[3], continue recursion

✔ Each completed path of length 3 is added to result.

---

## 4. Flow Diagram (Execution Tree)
```
backtrack([])
 ├─ pick 1 → [1]
 │    ├─ pick 2 → [1,2]
 │    │    └─ pick 3 → [1,2,3] ✔
 │    └─ pick 3 → [1,3]
 │         └─ pick 2 → [1,3,2] ✔
 ├─ pick 2 → [2]
 │    ├─ pick 1 → [2,1]
 │    │    └─ pick 3 → [2,1,3] ✔
 │    └─ pick 3 → [2,3]
 │         └─ pick 1 → [2,3,1] ✔
 └─ pick 3 → [3]
      ├─ pick 1 → [3,1]
      │    └─ pick 2 → [3,1,2] ✔
      └─ pick 2 → [3,2]
           └─ pick 1 → [3,2,1] ✔
```
✔ = permutation generated

