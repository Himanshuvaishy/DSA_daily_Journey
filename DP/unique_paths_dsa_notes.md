# Unique Paths — DSA Notes

## 📝 Problem Statement
A robot is placed at the **top-left (0,0)** of an `m × n` grid. It can move **only Right or Down**.

Goal: Reach **bottom‑right (m‑1, n‑1)**.

Return the **number of unique paths** possible.

---

## 🎯 Constraints
- Only **right** or **down** moves allowed.
- Grid size: `1 ≤ m, n ≤ 100` (LeetCode constraints allow O(m·n) DP)
- Answer ≤ `2 × 10^9`.

---

# Approach 1 — Recursion + Memoization (Top‑Down DP)
### Intuition
From any cell `(x, y)` you have **two choices**:
- Go **up** to `(x‑1, y)` (reverse thinking)
- Go **left** to `(x, y‑1)`

We reach the target when we land at `(0,0)`.

### Base Cases
- `(0,0)` ⇒ **1 path** (we reached start)
- Out of bounds `(x < 0 or y < 0)` ⇒ **0 paths**

### Memo
Use a `dp[x][y]` table to store computed results.

---

## ✅ JavaScript Code — Top‑Down (Memoization)
```js
var uniquePaths = function (m, n) {
    let dp = Array.from({ length: m }, () => Array(n).fill(-1));

    let fn = (x, y) => {
        if (x === 0 && y === 0) return 1;
        if (x < 0 || y < 0) return 0;

        if (dp[x][y] !== -1) return dp[x][y];

        return (dp[x][y] = fn(x - 1, y) + fn(x, y - 1));
    };

    return fn(m - 1, n - 1);
};
```

### Time Complexity
`O(m × n)` — each state computed once.

### Space Complexity
`O(m × n)` memo + recursion stack.

---

# Approach 2 — Tabulation (Bottom‑Up DP)
### Idea
Build a DP grid where:
- `dp[i][0] = 1` → only DOWN moves possible in first column.
- `dp[0][j] = 1` → only RIGHT moves possible in first row.
- For every cell:
```
dp[i][j] = paths from top + paths from left
         = dp[i-1][j] + dp[i][j-1]
```

---

## ✅ JavaScript Code — Bottom‑Up (Tabulation)
```js
var uniquePaths = function(m, n) {
    let dp = Array.from({ length: m }, () => Array(n).fill(0));

    for (let i = 0; i < m; i++) dp[i][0] = 1;
    for (let j = 0; j < n; j++) dp[0][j] = 1;

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    return dp[m-1][n-1];
};
```

### Time Complexity
`O(m × n)`

### Space Complexity
`O(m × n)`

---

# Summary
| Approach | Logic | Time | Space |
|---------|--------|-------|--------|
| **Top‑Down + Memo** | Recursively explore paths, cache results | O(m·n) | O(m·n) |
| **Bottom‑Up DP** | Build table from (0,0) to target | O(m·n) | O(m·n) |

---

If you want, I can also add:
- A **1D DP optimization** version
- A **combinatorics formula approach** (nCr)
- ASCII dry‑run diagrams for both methods

