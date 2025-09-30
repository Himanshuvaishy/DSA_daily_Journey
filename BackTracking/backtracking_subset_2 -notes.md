
# 📘 Backtracking Notes: Subsets, Permutations, Combinations & Subset II

---

## 🔹 Subset I (Basic Subsets)

### Problem
Generate all possible subsets (power set) of a given array.

### Approach
- Use backtracking with a `start` index to avoid picking elements to the left.
- At every call, push the current `path` to result.
- Loop from `start` to end, recursively exploring.

### Code
```js
var subsets = function(nums) {
    let result = [];
    let backtrack = (path, start) => {
        result.push([...path]);
        for(let i = start; i < nums.length; i++) {
            path.push(nums[i]);
            backtrack(path, i+1);
            path.pop();
        }
    }
    backtrack([], 0);
    return result;
};
```

### Dry Run (nums = [1,2])
```
[]
[1]
[1,2]
[2]
```

---

## 🔹 Subset II (Subsets with Duplicates)

### Problem
Same as subsets, but array may contain duplicates. Avoid duplicate subsets.

### Brute Force
- Generate all subsets, use a Set to remove duplicates.

### Optimal Approach
1. Sort input array.
2. Skip duplicates during loop:  
   `if(i > start && nums[i] == nums[i-1]) continue;`

### Code
```js
var subsetsWithDup = function(nums) {
    nums.sort((a,b) => a-b);
    let result = [];
    let backtrack = (path, start) => {
        result.push([...path]);
        for(let i = start; i < nums.length; i++) {
            if(i > start && nums[i] === nums[i-1]) continue;
            path.push(nums[i]);
            backtrack(path, i+1);
            path.pop();
        }
    }
    backtrack([], 0);
    return result;
};
```

### Dry Run (nums = [1,2,2])
Execution Tree:
```
backtrack([],0)
 ├── [1]
 │    ├── [1,2]
 │    │    ├── [1,2,2]
 │    └── skip duplicate second 2
 ├── [2]
 │    ├── [2,2]
 └── skip duplicate second 2
```

Output:
```
[[], [1], [1,2], [1,2,2], [2], [2,2]]
```

---

## 🔹 Combinations

### Problem
Pick `k` numbers out of `n` (1 to n).

### Code
```js
var combine = function(n, k) {
    let result = [];
    let backtrack = (path, start) => {
        if(path.length == k) {
            result.push([...path]);
            return;
        }
        for(let i = start; i <= n; i++) {
            path.push(i);
            backtrack(path, i+1);
            path.pop();
        }
    }
    backtrack([], 1);
    return result;
};
```

### Example (n=4, k=2)
```
[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]
```

---

## 🔹 Permutations

### Problem
Generate all possible arrangements of array elements.

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

### Key Difference
- **Subset**: Each element can be picked or skipped → 2^n subsets.
- **Permutation**: Each element must appear once per path, order matters → n! permutations.
- **Combination**: Pick k out of n without order → nCk.

### Example
nums = [1,2,3]

Subsets → `[[], [1], [2], [3], [1,2], [2,3], [1,3], [1,2,3]]`  
Permutations → `[[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]`  
Combinations (n=4, k=2) → `[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]`  

---

## 📊 Complexity Comparison

| Problem       | Time Complexity     | # of Results |
|---------------|---------------------|--------------|
| Subsets       | O(2^n)              | 2^n          |
| Subset II     | O(2^n) (skip dups)  | ≤ 2^n        |
| Permutations  | O(n * n!)           | n!           |
| Combinations  | O(nCk)              | nCk          |

---

## ✅ Formulas Recap
- Subset count = `2^n`
- Permutations count = `n!`
- Combinations count = `nCk = n! / (k!(n-k)!)`
