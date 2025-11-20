# Min Cost Climbing Stairs — Complete Notes

## Problem Statement
You are given an integer array `cost` where `cost[i]` is the cost of `i`ᵗʰ step on a staircase.  
Once you pay the cost, you can either climb **one** or **two** steps.  
You may **either start** from step index `0` or step index `1`.  
Return the **minimum cost** to reach the top of the floor (i.e., just beyond the last index).

---

## Approach (Core Idea)
**Subproblem definition:**  
Let `dp[i]` = **minimum cost to reach step `i`** (where `i` means *standing before step `i`*).  

**Base Case:**  
```
dp[0] = 0
dp[1] = 0
```

**Transition relation:**  
To reach `i`, you could:
- Come from `i-1`: cost = `dp[i-1] + cost[i-1]`
- Come from `i-2`: cost = `dp[i-2] + cost[i-2]`

So:
```
dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])
```

Answer = `dp[n]`

---

## 1) Brute Force Recursion (No DP)
```js
function solve(i, cost, n) {
    if (i >= n) return 0;
    return cost[i] + Math.min(solve(i+1, cost, n), solve(i+2, cost, n));
}

function minCostClimbingStairs(cost) {
    const n = cost.length;
    return Math.min(solve(0, cost, n), solve(1, cost, n));
}
```

---

## 2) Top-Down DP (Memoization)
```js
function minCostClimbingStairs(cost) {
  const n = cost.length;
  const memo = new Array(n).fill(-1);

  function f(i) {
    if (i >= n) return 0;
    if (memo[i] !== -1) return memo[i];

    const bestNext = Math.min(f(i + 1), f(i + 2));
    memo[i] = cost[i] + bestNext;
    return memo[i];
  }

  return Math.min(f(0), f(1));
}

```

---

## 3) Bottom-Up DP (Tabulation)
```js
function minCostClimbingStairs(cost) {
    const n = cost.length;
    const dp = Array(n+1).fill(0);

    dp[0] = 0;
    dp[1] = 0;

    for (let i = 2; i <= n; i++) {
        dp[i] = Math.min(dp[i-1] + cost[i-1],
                         dp[i-2] + cost[i-2]);
    }
    return dp[n];
}
```

---

## 4) Space Optimized DP
```js
function minCostClimbingStairs(cost) {
    const n = cost.length;
    let prev2 = 0;
    let prev1 = 0;

    for (let i = 2; i <= n; i++) {
        let curr = Math.min(prev1 + cost[i-1],
                            prev2 + cost[i-2]);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}
```

---
