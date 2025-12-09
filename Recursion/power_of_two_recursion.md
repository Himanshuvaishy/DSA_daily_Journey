# 🧩 Power of Two — Recursion Notes

## 1️⃣ Problem Statement
- **Given:** An integer `n`
- **Return:** `2^n` (2 raised to the power n)
- **Constraints:**  
  - `n ≥ 0`  
  - Use recursion

---

## 2️⃣ Intuition / Core Idea
- Power of two grows by doubling.
- Recursive pattern:  
  ```
  2^n = 2 * 2^(n-1)
  ```
- Reduce problem size by subtracting 1.
- Base case: `2^0 = 1`.

---

## 3️⃣ Recurrence Relation
```
f(n) = 2 * f(n - 1)
f(0) = 1
```

---

## 4️⃣ Recursive Approach (Top-Down)
```js
function powerOfTwo(n) {
    if (n === 0) return 1;        
    return 2 * powerOfTwo(n - 1);
}
```

**Time:** O(n)  
**Space:** O(n)

---

## 5️⃣ Recursion Tree
Example: n = 4
```
powerOfTwo(4)
 → 2 * powerOfTwo(3)
       → 2 * powerOfTwo(2)
              → 2 * powerOfTwo(1)
                     → 2 * powerOfTwo(0)
                           → 1
```

---

## 6️⃣ Dry Run (n = 4)
```
powerOfTwo(4)
 = 2 * powerOfTwo(3)
 = 2 * (2 * powerOfTwo(2))
 = 2 * (2 * (2 * powerOfTwo(1)))
 = 2 * (2 * (2 * (2 * powerOfTwo(0))))
 = 2 * 2 * 2 * 2 * 1
 = 16
```

✔ Final Answer: **16**

---

## 7️⃣ Memoization Version
```js
function powerOfTwo(n, memo = {}) {
    if (n === 0) return 1;
    if (memo[n]) return memo[n];

    memo[n] = 2 * powerOfTwo(n - 1, memo);
    return memo[n];
}
```

---

## 8️⃣ Tabulation Version
```js
function powerOfTwo(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= 2;
    }
    return result;
}
```

---

## 9️⃣ Edge Cases
- n = 0 → return 1  
- n = 1 → return 2  
- Large n may cause overflow  

---

## 🔟 Comparison Table
| Method       | Time | Space | Notes                     |
|--------------|------|--------|----------------------------|
| Recursion    | O(n) | O(n)  | Simple & clear             |
| Memoization  | O(n) | O(n)  | Not useful here            |
| Tabulation   | O(n) | O(1)  | Best practical approach    |

---

## 🎯 Summary
A classic recursion example where exponent decreases by 1 each step until reaching the base case.
