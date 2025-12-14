# Combination Sum — Master Backtracking File  
Includes all variants with explanations, JS code templates, and differences.

---

# 📌 VARIANT 1 — Combination Sum (Unlimited Reuse)

### Conditions:
- Candidates may repeat infinitely  
- No duplicates in final result  
- Order does not matter  

### Code:
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

### Key Points:
- Use `i` (same index) → allows reuse  
- Use `start` → avoids permutation duplicates  
- Prune if `sum > target`  

---

# 📌 VARIANT 2 — Combination Sum II (No Reuse + Handle Duplicates)

### Conditions:
- Each element used *at most once*  
- candidates[] may contain duplicates  
- Must avoid duplicate combinations  

### Code:
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
            if (i > start && candidates[i] === candidates[i - 1]) continue;

            path.push(candidates[i]);
            backtrack(i + 1, path, sum + candidates[i]); // no reuse
            path.pop();
        }
    }

    backtrack(0, [], 0);
    return result;
}
```

### Key Points:
- Sort first  
- Skip duplicates at the *same recursion level*:  
```
if(i > start && nums[i] === nums[i-1]) continue;
```
- Use `i+1` → ensures no reuse  

---

# 📌 VARIANT 3 — Combination Sum III (Use 1–9 range, choose k numbers)

### Conditions:
- Choose **k numbers**  
- Numbers range from **1 to 9**  
- Each number used once  
- Sum must equal target  

### Code:
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

### Key Points:
- No duplicates because numbers are unique  
- Must satisfy two conditions:  
  - `path.length === k`  
  - `sum === target`  

---

# 📌 Variant Comparison Table

| Variant | Duplicate Handling | Reuse Allowed? | Input Has Duplicates? | Index Move |
|--------|--------------------|----------------|------------------------|------------|
| Combination Sum | Not needed | YES | No | backtrack(i, …) |
| Combination Sum II | Skip duplicates | NO | Yes | backtrack(i+1, …) |
| Combination Sum III | Not needed | NO | Fixed (1–9) | backtrack(i+1, …) |

---

# 📌 Universal Backtracking Template (Final Form)

```
function backtrack(start, path, state) {
    if (goal reached) {
        save copy of path
    }

    for (i = start; i < limit; i++) {

        if (duplicate condition) continue;

        path.push(choice)
        backtrack(nextIndex, path, newState)
        path.pop()
    }
}
```

---

# 🎯 This master file covers:
✔ Combination Sum  
✔ Combination Sum II  
✔ Combination Sum III  
✔ All differences and logic  
✔ Clean JS templates  

If you want, I can also generate:
- PDF version  
- Interactive visualizer  
- A mega “Backtracking Bible” covering ALL problems  
