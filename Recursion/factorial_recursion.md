# 🧩 Factorial of a Number — Recursion Notes

## 1️⃣ Problem Statement
- **Given:** A non‑negative integer `n`
- **Return:** `n!` (factorial of n)
- **Constraints:**  
  - `n ≥ 0`  
  - 0! = 1

---

## 2️⃣ Intuition / Core Idea
- Factorial means multiplying all numbers from `1` to `n`.
- Recursive pattern:
  ```
  n! = n × (n-1)!
  ```
- Reduce problem size by subtracting 1 each step.
- Base case: when `n = 0` → return 1.

---

## 3️⃣ Recurrence Relation
```
f(n) = n * f(n - 1)

Base case:
f(0) = 1
```

---

## 4️⃣ Recursive Approach (Top-Down)
```js
function factorial(n) {
    if (n === 0) return 1;   // base case
    return n * factorial(n - 1);
}
```

**Time:** O(n)  
**Space:** O(n) (recursive call stack)

---

## 5️⃣ Recursion Tree
Example: factorial(4)

```
factorial(4)
 → 4 * factorial(3)
        → 3 * factorial(2)
               → 2 * factorial(1)
                      → 1 * factorial(0)
                              → 1
```

---

## 6️⃣ Dry Run (n = 4)
```
factorial(4)
 = 4 * factorial(3)
 = 4 * (3 * factorial(2))
 = 4 * (3 * (2 * factorial(1)))
 = 4 * (3 * (2 * (1 * factorial(0))))
 = 4 * 3 * 2 * 1 * 1
 = 24
```

✔ Final Answer: **24**

---

## 7️⃣ Memoization Version (Not Needed but included)
```js
function factorial(n, memo = {}) {
    if (n === 0) return 1;
    if (memo[n]) return memo[n];

    memo[n] = n * factorial(n - 1, memo);
    return memo[n];
}
```

---

## 8️⃣ Tabulation Version (Bottom-Up)
```js
function factorial(n) {
    let dp = Array(n + 1).fill(1);

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] * i;
    }
    return dp[n];
}
```

---

## 9️⃣ Edge Cases
- n = 0 → return 1  
- n = 1 → return 1  
- Large n may cause recursion depth error  
- Factorial grows extremely fast → may exceed number limits

---

## 🔟 Comparison Table
| Method       | Time | Space | Notes                   |
|--------------|------|--------|--------------------------|
| Recursion    | O(n) | O(n)  | Clean mathematical form  |
| Memoization  | O(n) | O(n)  | Not useful here          |
| Tabulation   | O(n) | O(1)  | Best practical method    |

---

## 🎯 Summary
Factorial uses a direct recursive pattern where each call reduces `n` by 1 until the base case (`0! = 1`) is reached. Clean, simple, and a classic recursion example.
