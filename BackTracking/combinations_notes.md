# Combinations Problem (n choose k)

## Problem Statement
Given two integers `n` and `k`, return all possible combinations of `k` numbers chosen from `1..n`.

**Example:**  
Input: `n=4, k=2`  
Output:  
```
[[1,2],[1,3],[1,4],[2,3],[3,4]]
```

---

## 1. Brute Force Approach

### Idea
- Generate **all subsets** of `[1..n]` (the power set).
- Keep only those subsets whose length = `k`.

### Complexity
- Generating subsets → `O(2^n)` possibilities.
- Filtering for size `k` adds extra work.
- Overall: **Exponential** time.

### JavaScript Code
```js
var combineBrute = function(n, k) {
    let nums = Array.from({length: n}, (_, i) => i + 1);
    let result = [];

    function generateSubsets(index, path) {
        if (index === nums.length) {
            if (path.length === k) {
                result.push([...path]);
            }
            return;
        }

        // Choice 1: include nums[index]
        path.push(nums[index]);
        generateSubsets(index + 1, path);
        path.pop();

        // Choice 2: skip nums[index]
        generateSubsets(index + 1, path);
    }

    generateSubsets(0, []);
    return result;
};
```

---

## 2. Optimal Approach (Backtracking)

### Idea
- Build combinations of exactly `k` length directly.
- At each step, decide whether to include the current number.
- Stop exploring when `path.length == k`.

### Complexity
- Generates exactly `C(n, k)` combinations.
- Time Complexity: **O(C(n,k) * k)** (each combination of length `k` requires building and copying path).
- Space Complexity: **O(k)** recursion depth (ignoring output).

### JavaScript Code
```js
var combine = function(n, k) {
    let result = [];

    function backtrack(start, path) {
        if (path.length === k) {
            result.push([...path]);
            return;
        }

        for (let i = start; i <= n; i++) {
            path.push(i);           // choose
            backtrack(i + 1, path); // recurse
            path.pop();             // backtrack
        }
    }

    backtrack(1, []);
    return result;
};
```

---

## 3. Dry Run Example (n=4, k=2)

### Call: backtrack(1, [])
- Loop i=1..4

#### i=1 → path=[1]
- Call backtrack(2, [1])
  - Loop i=2..4

  **i=2 → path=[1,2]**
  - length==2 → result=[[1,2]]
  - pop → path=[1]

  **i=3 → path=[1,3]**
  - length==2 → result=[[1,2],[1,3]]
  - pop → path=[1]

  **i=4 → path=[1,4]**
  - length==2 → result=[[1,2],[1,3],[1,4]]
  - pop → path=[1]

- Done with loop for start=2 → pop → path=[]

#### i=2 → path=[2]
- Call backtrack(3,[2])
  - Loop i=3..4

  **i=3 → path=[2,3]**
  - length==2 → result+= [2,3]
  - pop

  **i=4 → path=[2,4]**
  - length==2 → result+= [2,4]
  - pop

- Done with loop → path=[]

#### i=3 → path=[3]
- Call backtrack(4,[3])
  - Loop i=4

  **i=4 → path=[3,4]**
  - length==2 → result+= [3,4]
  - pop

- Done with loop → path=[]

#### i=4 → path=[4]
- Call backtrack(5,[4]) → immediately returns (loop empty).

---

## 4. Flow Diagram (Execution Tree for n=4,k=2)

```
backtrack(1, [])
 ├─ i=1 → [1]
 │    ├─ i=2 → [1,2] ✔
 │    ├─ i=3 → [1,3] ✔
 │    └─ i=4 → [1,4] ✔
 ├─ i=2 → [2]
 │    ├─ i=3 → [2,3] ✔
 │    └─ i=4 → [2,4] ✔
 ├─ i=3 → [3]
 │    └─ i=4 → [3,4] ✔
 └─ i=4 → [4]
      (no more choices)
```

✔ = valid combination found.

---

## 🔑 Key Difference Recap

- **Brute Force:** Explore all subsets (`2^n`) and filter → wasteful.  
- **Optimal Backtracking:** Explore only paths of length `k`.  
- Much faster and more memory efficient for large `n`.  
