# 🧩 Fibonacci Number — Recursion Notes

## 1️⃣ Problem Statement
- **Given:** An integer `n`
- **Return:** The `n`-th Fibonacci number  
- **Fibonacci definition:**
  ```
  F(0) = 0
  F(1) = 1
  F(n) = F(n-1) + F(n-2)
  ```

---

## 2️⃣ Intuition / Core Idea
- Fibonacci is naturally recursive because each term depends on the previous two.
- Recursive reduction:
  ```
  fib(n) = fib(n-1) + fib(n-2)
  ```
- Base cases:  
  - `fib(0) = 0`  
  - `fib(1) = 1`

---

## 3️⃣ Recurrence Relation
```
f(n) = f(n-1) + f(n-2)

Base cases:
f(0) = 0
f(1) = 1
```

---

## 4️⃣ Recursive Approach (Top-Down)
```js
function fib(n) {
    if (n === 0) return 0;   
    if (n === 1) return 1;   

    return fib(n - 1) + fib(n - 2);
}
```

**Time:** O(2ⁿ)  
**Space:** O(n)

---

## 5️⃣ Recursion Tree (n = 4)
```
             fib(4)
         /           \
     fib(3)         fib(2)
    /      \        /     \
fib(2)   fib(1)  fib(1)  fib(0)
 /   \
fib(1) fib(0)
```

---

## 6️⃣ Dry Run (n = 4)
```
fib(4) 
= fib(3) + fib(2)

fib(3)
= fib(2) + fib(1)
= (fib(1) + fib(0)) + 1
= (1 + 0) + 1
= 2

fib(2)
= fib(1) + fib(0)
= 1 + 0
= 1

fib(4) = 2 + 1 = 3
```

✔ Final Answer: **3**

---

## 7️⃣ Memoization Version
```js
function fib(n, memo = {}) {
    if (n === 0) return 0;
    if (n === 1) return 1;

    if (memo[n]) return memo[n];

    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}
```

**Time:** O(n)  
**Space:** O(n)

---

## 8️⃣ Tabulation Version
```js
function fib(n) {
    if (n === 0) return 0;

    let dp = Array(n + 1).fill(0);
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}
```

---

## 9️⃣ Edge Cases
- n = 0 → return 0  
- n = 1 → return 1  
- Large n → simple recursion becomes very slow  

---

## 🔟 Comparison Table
| Method        | Time     | Space     | Notes                              |
|---------------|----------|-----------|-------------------------------------|
| Recursion     | O(2ⁿ)    | O(n)      | Very slow due to repeated calls     |
| Memoization   | O(n)     | O(n)      | Best recursive version              |
| Tabulation    | O(n)     | O(1)/O(n) | Best practical solution             |

---

## 🎯 Summary
Fibonacci recursion is simple but inefficient without memoization. Memoized or tabulated solutions provide optimal performance while maintaining clarity.
