# Combination Sum II — Backtracking (Handles Duplicates)

## 1️⃣ Problem  
Given a list `candidates` (may contain duplicates) and a target sum, return all **unique** combinations where each number is used **at most once**, and the sum equals `target`.

Example:
```
candidates = [10,1,2,7,6,1,5], target = 8
Output:
[
  [1,1,6],
  [1,2,5],
  [1,7],
  [2,6]
]
```

---

# 2️⃣ Key Differences From Combination Sum I
| Feature | Combination Sum I | Combination Sum II |
|--------|-------------------|---------------------|
| Duplicates allowed? | Yes | Yes |
| Can reuse same number? | Yes | **No** |
| Must skip duplicate combinations? | No | **Yes** |
| Skip rule needed? | No | **Yes → identical logic as Subsets II** |

---

# 3️⃣ Backtracking Structure (Same Style You Use)

### **State**
- `path` → current partial combination  
- `start` → index for next choices  
- `sum` → current sum  

### **Goal**
If `sum === target`, push a copy of `path`.

### **Choices**
Loop over candidates **starting from `i = start`**:
- Skip duplicates:
```js
if (i > start && candidates[i] === candidates[i - 1]) continue;
```
- Choose: push candidates[i]  
- Explore: recurse with `i + 1` (no reuse allowed)  
- Unchoose: pop  

### **Pruning**
If `sum > target` → stop exploring  
(Optional but recommended)

---

# 4️⃣ JavaScript Code (Clean Template)

```js
function combinationSum2(candidates, target) {
    candidates.sort((a, b) => a - b);
    const result = [];

    function backtrack(start, path, sum) {
        if (sum === target) {
            result.push([...path]);
            return;
        }
        if (sum > target) return;

        for (let i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] === candidates[i - 1]) continue; // skip duplicates

            path.push(candidates[i]);
            backtrack(i + 1, path, sum + candidates[i]); // i+1 because no reuse
            path.pop();
        }
    }

    backtrack(0, [], 0);
    return result;
}
```

---

# 5️⃣ Dry Run (Step-by-Step)  
Using:
```
candidates = [10,1,2,7,6,1,5], target = 8
```
After sorting:
```
[1,1,2,5,6,7,10]
```

---

## Call 0: `backtrack(0, [], 0)`
result = `[ [] ]` (initial snapshot)

Loop i = 0..6

---

### i = 0 → choose 1
```
path = [1], sum = 1
backtrack(1, [1], 1)
```

---

## Call 1: `start=1, path=[1], sum=1`

### i = 1 → choose 1  
(no skip because i == start)
```
path = [1,1], sum = 2
backtrack(2, [1,1], 2)
```

---

## Call 2: `start=2, path=[1,1]`

### i = 2 → choose 2  
```
path = [1,1,2], sum = 4
backtrack(3, [1,1,2], 4)
```

### Next i's produce:
- i=3 → 4+5 = 9 (stop)
- i=4 → 4+6 = 10 (stop)
→ return

Pop → `[1,1]`

---

### i = 3 → choose 5  
```
path = [1,1,5], sum = 6
backtrack(4, [...], 6)
```
Next:
- i=4 → 6+6 =12 stop
- i=5 → 6+7 =13 stop  
Return

---

### i = 4 → choose 6  
```
path = [1,1,6], sum = 7
```
Next:
- i=5 → 7+7=14 stop  
Return

---

### i = 5 → choose 7  
```
path = [1,1,7], sum = 8 → MATCH!
```
Record:
```
[1,1,6]
```
Pop → `[1,1]` → return

---

Backtrack to Call 1: now `path=[1]`

---

## Continue Call 1

### i = 2 → choose 2
```
path = [1,2], sum = 3
```
Explore…

### i = 3 → choose 5
```
path = [1,2,5], sum = 8 → MATCH!
```
Record:
```
[1,2,5]
```

---

### i = 4 → choose 6  
3+6=9 stop  
### i = 5 → choose 7  
3+7=10 stop

Return

---

### i = 3 → choose 5  
```
path = [1,5], sum = 6
```
Next:
- i = 4 → 6+6=12 stop  
- i = 5 → 6+7=13 stop  

---

### i = 4 → choose 6  
```
path=[1,6], sum=7
```
Next:
- i=5 → 7+7 = 14 stop  

Return

---

### i = 5 → choose 7
```
path=[1,7], sum=8 → MATCH
```
Record:
```
[1,7]
```

---

Back to Call 0.

---

## At top-level skip logic triggers:

### i = 1  
`i > start && candidates[1] === candidates[0]`  
→ `1 > 0 && 1 === 1` → **skip**

This prevents duplicate subsets beginning with the second `1`.

---

### i = 2 → choose 2
Explore…

Combination:
```
[2,6] → matches
```

---

### i = 3 → choose 5  
Explore…

No valid sums

---

### i = 4 → choose 6  
sum=6 → next gives >8 except i=2 earlier  

---

### i = 5 → choose 7  
sum = 7 → cannot add more → no match

---

Final result:
```
[
  [1,1,6],
  [1,2,5],
  [1,7],
  [2,6]
]
```

---

# 6️⃣ Key Takeaways

### ✔ Sort array → required for detecting duplicates  
### ✔ Skip rule (same as Subsets II):
```js
if (i > start && nums[i] === nums[i-1]) continue;
```
→ Prevents duplicate combinations  

### ✔ Use `i + 1` in recursion  
→ Each element is used **only once**

### ✔ Use pruning (`sum > target`)  
→ Makes search much faster

---

If you'd like, I can generate:
- Combination Sum II **interactive call-stack diagram**
- Combination Sum II + dry-run for **your custom input**
- Combination Sum III (k numbers)
