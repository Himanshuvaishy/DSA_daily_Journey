# Combination Sum III — Backtracking (Full Structure + Dry Run)

## 🧩 Problem  
Find all valid combinations of **k numbers** from **1 to 9**, where the sum equals `n`.  
Each number may be used **once**, and combinations must be **unique**.

Example:
```
k = 3, n = 7
Output: [ [1,2,4] ]
```

---

# 1️⃣ Backtracking Structure (Same Pattern You Use)

### **State**
- `path` → current combination  
- `sum` → current sum  
- `start` → next number to try (numbers are 1–9)

### **Goal**
```
if (path.length === k AND sum === target)
    save path
```

### **Choices**
Loop from `i = start` to `9`:
- choose `i`
- recurse with `i + 1` (cannot reuse numbers)
- pop to undo

### **Pruning**
- If `sum > target` → prune  
- If `path.length > k` → prune  

---

# 2️⃣ JavaScript Code

```js
function combinationSum3(k, target) {
    const result = [];

    function backtrack(start, path, sum) {
        if (sum === target && path.length === k) {
            result.push([...path]);
            return;
        }

        if (sum > target || path.length > k) return;

        for (let i = start; i <= 9; i++) {
            path.push(i);
            backtrack(i + 1, path, sum + i);
            path.pop();
        }
    }

    backtrack(1, [], 0);
    return result;
}
```

---

# 3️⃣ Dry Run (k=3, target=7)

### Call 0:
```
backtrack(1, [], 0)
```

Loop i = 1…9

---

## i = 1 → choose 1
```
path = [1], sum = 1
backtrack(2, [1], 1)
```

---

### Next Level
Loop i = 2…9

#### i = 2
```
path = [1,2], sum = 3
backtrack(3, [1,2], 3)
```

#### i = 3
```
path = [1,2,3], sum = 6
backtrack(4, [1,2,3], 6)
```

Next:
- i = 4 → sum = 10 > 7 → prune  
Return.

Pop → `[1,2]`

#### i = 4
```
path = [1,2,4], sum = 7 → MATCH!
```
Record:
```
[1,2,4]
```

Pop → `[1,2]`

Higher i give > 7 → prune

Return to `[1]`

---

## i = 3 (path=[1,3]) sum=4
Explores deeper:
- i=4 → sum = 8 >7 → prune  
- higher → prune

---

## i = 4 (path=[1,4]) sum=5  
- i=5 → sum=10 → prune  

Return.

---

## i = 2 → choose 2 (from top level)
```
path = [2], sum = 2
```
Next:
- i=3 → path=[2,3], sum=5  
  - i=4 → sum=9 prune  
- i=4 → sum=6  
  - i=5 → sum=11 prune  

No matches.

---

## i = 3 → choose 3
```
path=[3], sum=3
```
Same logic → no matches.

---

# ✔ Final Output
```
[
  [1,2,4]
]
```

---

# Key Takeaways
✔ Same backtracking template  
✔ No duplicates because we always move forward (`i+1`)  
✔ Strong pruning helps performance  
✔ Always push a *copy* of path  
