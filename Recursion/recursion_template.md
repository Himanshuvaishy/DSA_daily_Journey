# 🧩 Recursion Problem Notes Template

## 1️⃣ Problem Statement
- Given:
- Return:
- Constraints:

---

## 2️⃣ Intuition / Core Idea
Explain in simple words:
- What decision is made at each step?
- What does the recursive function represent?
- How the problem reduces into subproblems?

---

## 3️⃣ Recurrence Relation
```
f(...) = ...
Base cases:
f(...) = ...
```

---

## 4️⃣ Recursive Approach (Top-Down)
```js
function solve(params) {
    // base case
    // recursive case
    // combine results
}
```

---

## 5️⃣ Recursion Tree
```
                f(...)
            /            \
        f(...)         f(...)
       /     \        /      \
```

---

## 6️⃣ Dry Run (Small Input)
Example:
```
call → return
call → return
```

---

## 7️⃣ Memoization Version (Top-Down DP)
```js
function solve(params) {
    let memo = {};

    function dfs(state) {
        if (state in memo) return memo[state];

        memo[state] = result;
        return memo[state];
    }

    return dfs(start);
}
```

---

## 8️⃣ Tabulation Version (Bottom-Up DP)
```js
let dp = Array(n+1).fill(0);

// base initialization

for (let i = 1; i <= n; i++) {
    // transition
}

return dp[n];
```

---

## 9️⃣ Edge Cases
- Smallest inputs
- Empty inputs
- Large values

---

## 🔟 Comparison Table
| Method | Time | Space | Notes |
|--------|-------|--------|--------|
| Recursion | Exponential | High | Slow but intuitive |
| Memoization | O(n) | O(n) | Fast |
| Tabulation | O(n) | O(1)/O(n) | Best iterative |

---

## 🎯 Summary
Short recap of the approach.
