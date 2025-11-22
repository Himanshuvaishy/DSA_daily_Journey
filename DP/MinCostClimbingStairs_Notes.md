 ```js
Min Cost Climbing Stairs — Complete Notes

----------------------------------------------------
1. Problem Statement
----------------------------------------------------
You're given an array cost where cost[i] is the cost of stepping on stair i.
You can climb either 1 or 2 steps after paying the cost.
You may start at step 0 or step 1.
Goal: Find the minimum cost to reach the top (beyond the last index).

----------------------------------------------------
2. Top-Down (Memoized Recursion) — Core Intuition
----------------------------------------------------
• Start with the MAIN problem → f(0) or f(1)
• Recursively explore the subproblems only when needed.
• Memo array prevents recomputation.
• "If I'm standing on step i, what's the cheapest way to reach the top?"

Definition:
f(i) = cost[i] + min(f(i+1), f(i+2))
Base:
If i >= n → return 0

Final answer:
min(f(0), f(1))

----------------------------------------------------
3. Bottom-Up (Tabulation) — Core Intuition
----------------------------------------------------
• Build dp array from smallest to largest.
• dp[i] = minimum cost to stand BEFORE step i.
• dp[0] = dp[1] = 0 (starting points are free).

Transition:
dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])
Final answer:
dp[n]

----------------------------------------------------
4. Recursion Stack Example (cost = [10, 15, 20])
----------------------------------------------------
f(0)
  ↳ f(1)
      ↳ f(2)
          ↳ f(3) = 0
          ↳ f(4) = 0
      memo[2] = 20
      ↳ f(3) = 0
  memo[1] = 15
  ↳ f(2) = 20 (memo)
memo[0] = 25

Final result:
min(f(0), f(1)) = min(25, 15) = 15

----------------------------------------------------
5. Top-Down Code (Memoization)
----------------------------------------------------
function minCostClimbingStairs(cost) {
  const n = cost.length;
  const memo = new Array(n).fill(-1);

  function f(i) {
    if (i >= n) return 0;
    if (memo[i] !== -1) return memo[i];

    const bestNext = Math.min(f(i+1), f(i+2));
    memo[i] = cost[i] + bestNext;
    return memo[i];
  }

  return Math.min(f(0), f(1));
}

----------------------------------------------------
6. Bottom-Up Code (Tabulation)
----------------------------------------------------
function minCostClimbingStairs(cost) {
  const n = cost.length;
  const dp = new Array(n+1).fill(0);

  dp[0] = 0;
  dp[1] = 0;

  for (let i = 2; i <= n; i++) {
    dp[i] = Math.min(dp[i-1] + cost[i-1],
                     dp[i-2] + cost[i-2]);
  }

  return dp[n];
}

----------------------------------------------------
7. Space Optimized Code
----------------------------------------------------
function minCostClimbingStairs(cost) {
  const n = cost.length;
  let prev2 = 0;
  let prev1 = 0;

  for (let i = 2; i <= n; i++) {
    const curr = Math.min(prev1 + cost[i-1],
                          prev2 + cost[i-2]);
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}

----------------------------------------------------
8. Summary
----------------------------------------------------
Top-Down:
• Start from main problem → compute subproblems only when required.

Bottom-Up:
• Start from small subproblems → build solution step-by-step.

Both use the same recurrence but in opposite directions.
