# 🧩 Sum of First n Numbers — Recursion Notes

## 1️⃣ Problem Statement
- **Given:** An integer `n`
- **Return:** The sum of all natural numbers from `1` to `n`
- **Constraints:** `n ≥ 0`

---

## 2️⃣ Intuition / Core Idea
- Break problem as: `sum(n) = n + sum(n-1)`
- Reduce problem size by 1 each step.
- Stop when `n = 0`.

---

## 3️⃣ Recurrence Relation
```
f(n) = n + f(n-1)
f(0) = 0
```

---

## 4️⃣ Recursive Approach (Top-Down)
```js
function sumN(n) {
    if (n === 0) return 0; 
    return n + sumN(n - 1);
}
```

**Time:** O(n)  
**Space:** O(n)

---

## 5️⃣ Recursion Tree
```
sum(4)
  -> 4 + sum(3)
           -> 3 + sum(2)
                   -> 2 + sum(1)
                           -> 1 + sum(0)
                                   -> 0
```

---

## 6️⃣ Dry Run (Example: n = 4)
```
sum(4)
 → 4 + sum(3)
        → 3 + sum(2)
                → 2 + sum(1)
                        → 1 + sum(0)
                                → 0
```

Final returns:
- sum(1) = 1  
- sum(2) = 3  
- sum(3) = 6  
- sum(4) = 10  

**Answer: 10**

---

## 7️⃣ Memoization Version
```js
function sumN(n, memo = {}) {
    if (n === 0) return 0;
    if (memo[n]) return memo[n];

    memo[n] = n + sumN(n - 1, memo);
    return memo[n];
}
```

---

## 8️⃣ Tabulation Version
```js
function sumN(n) {
    let dp = Array(n+1).fill(0);

    for (let i = 1; i <= n; i++) {
        dp[i] = dp[i-1] + i;
    }
    return dp[n];
}
```

---

## 9️⃣ Edge Cases
- n = 0 → return 0  
- Large n may cause stack overflow in recursion  

---

## 🔟 Comparison Table
| Method | Time | Space | Notes |
|--------|-------|--------|--------|
| Recursion | O(n) | O(n) | Simple |
| Memoization | O(n) | O(n) | Unnecessary here |
| Tabulation | O(n) | O(n) | Efficient |
| Formula | O(1) | O(1) | Best option: n*(n+1)/2 |

---

## 🎯 Summary
A classic example of recursion where each call reduces the problem until the base case `n=0`.
