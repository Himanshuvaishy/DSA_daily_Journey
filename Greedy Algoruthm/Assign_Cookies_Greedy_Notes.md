# 🍪 Assign Cookies — Greedy Algorithm (Full Notes)

## 🧩 Problem Statement

There are `N` children and `M` cookies.  
- Each child `i` has a **greed factor** `g[i]` — the *minimum* cookie size they need to be satisfied.  
- Each cookie `j` has a **size** `s[j]`.  

Each child can get **at most one cookie**, and each cookie can be given to **only one child**.  
Goal → **Maximize the number of satisfied children.**

---

## 💡 Intuition — “Smallest Sufficient Cookie”

We want to satisfy as many children as possible.  
So we start by satisfying the **least greedy** child first (smallest `g[i]`)  
using the **smallest available** cookie that can satisfy them.

> If a cookie is too small for the current child, it’ll also be too small for all others (since they are greedier).

Hence we move greedily — smallest child first, smallest cookie first.

---

## 🧠 Greedy Steps

1. Sort both arrays in ascending order.
   ```js
   g.sort((a, b) => a - b);
   s.sort((a, b) => a - b);
   ```

2. Use two pointers:
   - `i` → current child (greed)
   - `j` → current cookie (size)

3. While both are in range:
   - If `s[j] >= g[i]`, cookie satisfies child → `i++` and `j++`
   - Else cookie too small → `j++` only

4. Result = number of satisfied children = `i`

---

## 🧮 Example Dry Run

### Input:
```js
g = [1, 2, 3];
s = [1, 1];
```

### Step 1 — Sort
```
g = [1, 2, 3]
s = [1, 1]
```

### Step 2 — Initialize
`i = 0`, `j = 0`

| Step | g[i] | s[j] | Comparison | Action | i | j | Satisfied |
|------|------|------|-------------|---------|---|---|------------|
| 1 | 1 | 1 | 1 ≤ 1 | Give cookie → move both | 1 | 1 | 1 |
| 2 | 2 | 1 | 1 < 2 | Too small → next cookie | 1 | 2 | 1 |
| End | — | — | — | No cookies left | — | — | ✅ **1 child** |

✅ **Final Answer = 1**

---

## 💻 Code (JavaScript)

```js
var findContentChildren = function(g, s) {
    g.sort((a, b) => a - b); // sort greed factors
    s.sort((a, b) => a - b); // sort cookies

    let i = 0; // child index
    let j = 0; // cookie index

    while (i < g.length && j < s.length) {
        if (s[j] >= g[i]) {
            // Cookie satisfies this child
            i++;
        }
        j++; // Move to next cookie
    }

    return i; // number of satisfied children
};
```

---

## 🧠 Intuition Summary

| Concept | Explanation |
|----------|--------------|
| Strategy | Always satisfy the least greedy child first |
| Why | Prevent wasting large cookies on small greed children |
| Result | Maximum number of satisfied children |

---

## ⚙️ Complexity

| Operation | Time | Space |
|------------|-------|--------|
| Sorting | O(n log n) | O(1) |
| Traversal | O(n + m) | O(1) |
| **Total** | **O(n log n)** | **O(1)** |

---

## 🧩 Example 2

### Input
```js
g = [10, 9, 8, 7];
s = [5, 6, 7, 8];
```
### Output
```
2
```

**Dry Run:**
- Sort → g = [7, 8, 9, 10], s = [5, 6, 7, 8]
- (7,5) → too small
- (7,6) → too small
- (7,7) → ✅ satisfied
- (8,8) → ✅ satisfied

✅ **Result = 2**

---

## 🎯 Summary

- Sort greed and cookies
- Use smallest cookie that can satisfy the least greedy child
- Move pointers greedily
- Output count of satisfied children

This simple **Greedy approach** guarantees **maximum satisfaction** efficiently.
