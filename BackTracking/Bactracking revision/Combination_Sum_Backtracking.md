# Combination Sum — Backtracking (Full Structure + Dry Run)

## 1️⃣ Problem
Return all **unique combinations** of `candidates` where numbers may be chosen **unlimited times** and their sum equals `target`.

Example:
```
candidates = [2,3,6,7], target = 7
Output:
[
  [2,2,3],
  [7]
]
```

---

# 2️⃣ Backtracking Structure (Same Template Used for Subsets & Permutations)

### **State**
- `path` → current chosen numbers  
- `start` → index from which future choices begin  
- `sum` → current sum  

### **Goal**
When `sum === target`, push a copy of `path`.

### **Choices**
Loop from `i = start` to end:

- Pick candidates[i]
- Recurse with same index `i` (because reuse allowed)
- Backtrack via pop()

### **Pruning**
If `sum > target`, stop exploring.

---

# 3️⃣ JavaScript Code (Clean Template)

```js
function combinationSum(candidates, target) {
    const result = [];

    function backtrack(start, path, sum) {
        if (sum === target) {
            result.push([...path]);
            return;
        }
        if (sum > target) return;

        for (let i = start; i < candidates.length; i++) {
            path.push(candidates[i]);
            backtrack(i, path, sum + candidates[i]); // reuse allowed
            path.pop();
        }
    }

    backtrack(0, [], 0);
    return result;
}
```

---

# 4️⃣ Dry Run (Detailed)  
Using:  
```
candidates = [2,3,6,7], target = 7
```

---

# Call 0
```
backtrack(0, [], 0)
path = []
sum = 0
```

Loop i = 0..3

---

## i = 0 → choose 2
```
path = [2], sum = 2
backtrack(0, [2], 2)
```

---

# Call 1
```
backtrack(0, [2], 2)
```
Loop again from i = 0…

---

### i = 0 → choose 2 again
```
path = [2,2], sum = 4
backtrack(0, [2,2], 4)
```

---

# Call 2
Loop i = 0..3

### i = 0 → choose 2 (again)
Would make sum = 6 → allowed
```
path = [2,2,2], sum = 6
backtrack(0, [2,2,2], 6)
```

---

# Call 3
Loop:

### i = 0
Next sum = 8 → greater than 7 → prune  
Return.

### i = 1 → choose 3
Next sum = 9 → prune  
Return.

### i = 2 → choose 6
Next sum = 12 → prune  
Return.

### i = 3 → choose 7
Next sum = 13 → prune  
Return.

Backtrack → path = [2,2]

---

## Back to Call 2 (path=[2,2])
### i = 1 → choose 3
```
path = [2,2,3], sum = 7  → MATCH
```

Record:
```
result = [[2,2,3]]
```

Pop → path = [2,2]

---

### i = 2 → choose 6 → sum = 10 >7 → prune  
### i = 3 → choose 7 → sum = 11 → prune

Return → path = [2]

---

# Back to Call 1 (path=[2])

### i = 1 → choose 3
```
path = [2,3], sum = 5
backtrack(1, [2,3], 5)
```

Inside recursion:
- i=1 → 5+3 = 8 → prune  
- i=2 → 5+6 = 11 → prune  
- i=3 → 5+7 = 12 → prune  

Pop → path = [2]

---

### i = 2 → choose 6
6 < 7 but next choices exceed → prune  
Pop.

---

### i = 3 → choose 7
```
path = [7], sum = 7 MATCH
```

Record:
```
result = [[2,2,3], [7]]
```

Return.

---

# Final Output
```
[
  [2,2,3],
  [7]
]
```

---

# 5️⃣ Key Takeaways

### ✔ Use `i` in recursion (`backtrack(i, ...)`)
Because reuse is allowed.

### ✔ Use `start` to avoid permutations like [3,2] and [2,3]
We enforce non-decreasing index order.

### ✔ Prune early when sum exceeds target
Huge performance boost.

### ✔ Push copy of path (`[...path]`)
To avoid reference mutation.

---

If you'd like, I can also generate Combination Sum II or an interactive version.
