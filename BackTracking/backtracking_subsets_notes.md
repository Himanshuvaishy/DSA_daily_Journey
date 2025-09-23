# Backtracking: Subsets (Power Set) Notes

## 1. Introduction
- **Backtracking** is a recursive algorithmic technique to solve problems incrementally.
- At each step, you try a partial solution, and if it violates constraints, you backtrack (undo) and try another.
- Used for problems like subsets, combinations, permutations, N-Queens, subset sum, etc.
- **Approach:** Try a choice → work? → continue → if not, undo (backtrack).

---

## 2. Problem: Subsets / Power Set
- Given an array `arr`, generate all possible subsets.
- Total subsets: `2^n` (for array of length n).

### 2.1 Brute Force: Bitmask Enumeration
```js
function subsetsBitmask(nums) {
  const n = nums.length;
  const res = [];

  for (let mask = 0; mask < (1 << n); mask++) {
    const cur = [];
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) cur.push(nums[i]);
    }
    res.push(cur);
  }
  return res;
}
```
- **Time complexity:** O(n * 2^n)
- **Space complexity:** O(n * 2^n)

### 2.2 Optimal / Backtracking Approach
**Steps:**
1. Start with empty subset `[]` (path).
2. Add current path to result.
3. Loop through elements starting from `start` index.
4. Include element, recurse with next index.
5. Backtrack by removing last element.
6. Continue until all combinations are generated.

```js
var subsets = function(arr) { 
    let result = []; 
    let backtrack = (path, start) => { 
        result.push([...path]); 
        for(let i = start; i < arr.length; i++){ 
            path.push(arr[i]); 
            backtrack(path, i+1); 
            path.pop(); 
        } 
    } 
    backtrack([], 0); 
    return result; 
};
```

**Example:** `arr = [1,2,3]` → Output: `[ [], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3] ]`

---

## 3. Dry Run / Call Stack Visualization
- **Call Stack** grows with recursion, shrinks when returning.
- **Path** is the current subset being built.
- `push` adds an element; `pop` backtracks.

**Trace Table:**
```js
Start: backtrack([],0)
Stack: [ [] ]
Path: []

Loop i=0 → push(1)
Call backtrack([1],1)
Stack: [ [], [1] ]
Path: [1]

  Loop i=1 → push(2)
  Call backtrack([1,2],2)
  Stack: [ [], [1], [1,2] ]
  Path: [1,2]

      Loop i=2 → push(3)
      Call backtrack([1,2,3],3)
      Stack: [ [], [1], [1,2], [1,2,3] ]
      Path: [1,2,3]
      → Add [1,2,3] to result
      Loop ends → return
      Pop 3 → Path = [1,2]

  Back to [1,2] → loop ends
  Pop 2 → Path = [1]

  Next i=2 → push(3)
  Call backtrack([1,3],3)
  Stack: [ [], [1], [1,3] ]
  Path: [1,3]
  → Add [1,3] to result
  Loop ends → return
  Pop 3 → Path = [1]

Back to [1] → loop ends
Pop 1 → Path = []

Next i=1 → push(2)
Call backtrack([2],2)
Stack: [ [], [2] ]
Path: [2]
→ Add [2] to result

  Loop i=2 → push(3)
  Call backtrack([2,3],3)
  Stack: [ [], [2], [2,3] ]
  Path: [2,3]
  → Add [2,3] to result
  Loop ends → return
  Pop 3 → Path = [2]

Back to [2] → loop ends
Pop 2 → Path = []

Next i=2 → push(3)
Call backtrack([3],3)
Stack: [ [], [3] ]
Path: [3]
→ Add [3] to result
Loop ends → return
Pop 3 → Path = []

Done! Final result:
[ [], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3] ]

**Final Result:** `[ [], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3] ]`

---

## 4. Key Points
- Backtracking explores **all possibilities** but **prunes invalid paths early**.
- At each recursion level, **loop index** controls which elements are tried next.
- `pop()` is essential to undo choices and continue exploring other branches.
- Produces subsets in **depth-first order**.

---

## 5. Summary
1. Start with empty path.
2. Add current path to result.
3. Loop from `start` index to end.
4. Include element → recurse → backtrack.
5. Continue until all subsets are explored.

This is the **easiest and most visualizable method** for generating subsets using backtracking.