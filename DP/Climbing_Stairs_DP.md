# 🧗‍♂️ Climbing Stairs — Dynamic Programming (Complete Notes)

## 📌 Problem Statement
You are climbing a staircase with **n steps**.  
You can take either **1 step** or **2 steps** at a time.

**Find:**  
How many **distinct ways** can you reach the top?

---

# 🧠 Intuition
To reach step **n**, you must come from:

- Step **n - 1** → taking 1 step  
- Step **n - 2** → taking 2 steps  

So the total number of ways:

```
ways(n) = ways(n-1) + ways(n-2)
```

This is the **Fibonacci pattern**.

---

# 🎯 Base Cases

- `n = 1` → **1 way**  
- `n = 2` → **2 ways**: (1+1), (2)

---

# ❌ Brute Force Recursion (Exponential Time)

```js
var climbStairs = function(n) {
    if (n <= 2) return n;
    return climbStairs(n - 1) + climbStairs(n - 2);
};
```

### ❗ Time Complexity: **O(2^n)**  
Not usable for big inputs.

---

# ✔️ Top-Down Approach (DP + Memoization)

```js
let store = {};

var climbStairs = function(n) {
    if (n <= 2) return n;

    if (!store[n]) {
        store[n] = climbStairs(n - 1) + climbStairs(n - 2);
    }

    return store[n];
};
```

### ✔️ Time: **O(n)**  
### ✔️ Space: **O(n)** (recursion + memo)

---

# ✔️ Bottom-Up DP (Tabulation)

```js
var climbStairs = function(n) {
    if (n <= 2) return n;

    let dp = [0, 1, 2];

    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
};
```

### ✔️ Time: **O(n)**  
### ✔️ Space: **O(n)**

---

# 💎 Space Optimized DP (Best Method)

We only need last two values:

```js
var climbStairs = function(n) {
    if (n <= 2) return n;

    let prev2 = 1; // ways to step 1
    let prev1 = 2; // ways to step 2

    for (let i = 3; i <= n; i++) {
        let curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }

    return prev1;
};
```

### ✔️ Time: **O(n)**  
### ✔️ Space: **O(1)** (Best)

---

# 📝 Dry Run (n = 5)

| Step (i) | prev2 | prev1 | curr |
|----------|--------|--------|--------|
| Start | 1 | 2 | — |
| 3 | 2 | 3 | 3 |
| 4 | 3 | 5 | 5 |
| 5 | 5 | 8 | 8 |

**Final Answer: 8 ways**

---

# 🧾 Summary Table

| Approach | Time | Space | Notes |
|----------|-------|--------|--------|
| Recursion | O(2^n) | O(n) | Too slow |
| Memoization | O(n) | O(n) | Efficient |
| Tabulation | O(n) | O(n) | Clean iterative |
| Space Optimized DP | O(n) | O(1) | ⭐ Best solution |

---

# 🎉 Final Thoughts
Climbing Stairs is the best introduction to DP because:

- It teaches the idea of **subproblems**
- It shows the power of storing results
- It forms the foundation of many future DP problems (House Robber, Min Cost Climbing Stairs, etc.)

---
