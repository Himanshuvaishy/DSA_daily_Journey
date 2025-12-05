# Coin Change II — DSA Notes

## Problem statement
You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.

Return the number of **combinations** that make up that amount. If that amount of money cannot be made up by any combination of the coins, return `0`.

You may assume you have an infinite number of each kind of coin. The answer fits in a signed 32-bit integer.

**Constraints**
- `1 <= coins.length <= 300`
- `1 <= coins[i] <= 5000` (all unique)
- `0 <= amount <= 5000`

---

## Examples
- **Example 1**
  - Input: `amount = 5`, `coins = [1,2,5]`
  - Output: `4`
  - Explanation: combinations: `[5]`, `[2,2,1]`, `[2,1,1,1]`, `[1,1,1,1,1]`

- **Example 2**
  - Input: `amount = 3`, `coins = [2]`
  - Output: `0`

- **Example 3**
  - Input: `amount = 10`, `coins = [10]`
  - Output: `1`

---

# Approaches
We'll cover two common approaches:
1. **Recursion + Memoization (Top-down DP)** — the approach you provided.
2. **Tabulation (Bottom-up DP)** — iterative; includes both 2D and optimized 1D versions.

### Notation & idea
Let `n = coins.length`. We want the number of ways to form `amount` using unlimited coins. A key observation is that to *avoid counting duplicates* in different orders, we iterate coins in a fixed order and only allow taking coins from the current index onward.

---

## Approach 1 — Recursion + Memoization (Top-down)
**Idea**
Define `fn(rem, i)` = number of ways to make `rem` using coins starting from index `i` (i.e., `coins[i], coins[i+1], ...`).

**Recurrence**
- Base cases:
  - if `rem == 0` → return `1` (we formed exact amount)
  - if `rem < 0` → return `0` (invalid)
  - if `i == n` and `rem > 0` → return `0` (no coins left)
- Otherwise:
  - Try every coin index `j` from `i` to `n-1` and sum contributions: `ways += fn(rem - coins[j], j)` (use `j`, not `j+1`, since coin `j` can be reused).

**Memo**
Use `dp[rem][i]` to store computed results. Dimensions: `(amount+1) x n`.

**Time Complexity**: `O(amount * n)` — each state `(rem, i)` is computed once and the inner loop across coins contributes in total to that bound.

**Space Complexity**: `O(amount * n)` for memo + recursion stack (stack depth ≤ amount / smallest coin in worst case).

### JavaScript (top-down)
```javascript
var change = function(amount, coins) {
  const n = coins.length;
  const dp = Array.from({length: amount + 1}, () => Array(n).fill(-1));

  const fn = (rem, start) => {
    if (rem === 0) return 1;
    if (rem < 0) return 0;
    if (start >= n) return 0;
    if (dp[rem][start] !== -1) return dp[rem][start];

    let combinations = 0;
    for (let i = start; i < n; i++) {
      combinations += fn(rem - coins[i], i);
    }
    dp[rem][start] = combinations;
    return combinations;
  };

  return fn(amount, 0);
};
```

### Python (top-down)
```python
from functools import lru_cache

def change(amount, coins):
    n = len(coins)

    @lru_cache(None)
    def fn(rem, i):
        if rem == 0:
            return 1
        if rem < 0 or i == n:
            return 0
        total = 0
        for j in range(i, n):
            total += fn(rem - coins[j], j)
        return total

    return fn(amount, 0)
```

### Dry run (top-down) — `amount = 5`, `coins = [1,2,5]`
> The full step-by-step dry run for recursion is long; the main idea:
- Call `fn(5,0)`.
- `fn(5,0)` tries coin 1 → `fn(4,0)`; coin 2 → `fn(3,1)`; coin 5 → `fn(0,2)` (gives 1).
- Recursively the memo table is filled (states like `dp[1][0]=1`, `dp[2][0]=2`, `dp[3][0]=2`, `dp[4][0]=3`, `dp[5][0]=4`).
- Final result `4` (combinations shown in examples).

(Your provided dry run already shows the recursion tree and memoized returns — that is correct and complete.)

---

## Approach 2 — Tabulation (Bottom-up DP)
We can construct a DP table iteratively. There are two common tabulation styles:

### 2D Tabulation (amount × coins)
Let `dp[i][j]` = number of ways to make amount `i` using the first `j` coin types (commonly `j` ranges `0..n`). We'll use `j` to denote the number of coins considered (or coin index offset) — careful with indexing.

A convenient formulation uses `dp[amt]` updated for each coin (1D), but first let's see a clear 2D table for intuition.

**2D formulation**
- `dp[0][j] = 1` for all `j` (1 way to make 0: choose nothing).
- `dp[amt][0] = 0` for `amt > 0` (0 coins → can't make positive amt).

Transition when considering coin `c = coins[j-1]` (if we index `j` as number of coins used):
```
dp[amt][j] = dp[amt][j-1]        // ways without using coin j-1
if amt >= c:
  dp[amt][j] += dp[amt - c][j]  // ways that use coin j-1 at least once
```
Note that the second term uses `j` again (because we can reuse the same coin unlimited times).

Time complexity: `O(amount * n)` and space: `O(amount * n)` for 2D.

### 1D Optimized Tabulation (space O(amount)) — preferred
We can compress the j dimension by iterating coins in the outer loop and maintaining a 1D array `dp[0..amount]` where `dp[amt]` means "ways to make `amt` using coins processed so far".

**Initialization**
- `dp[0] = 1` (1 way to make 0)
- `dp[amt>0] = 0`

**Outer loop** over each coin `c`:
- For `amt` from `c` to `amount` (in increasing order):
  - `dp[amt] += dp[amt - c]`

Why increasing order? Because when you update `dp[amt]` using `dp[amt - c]` which is already updated for the current coin, you allow using the same coin multiple times. Iterating `amt` from small to large avoids double counting permutations across different coin orders because we process coins one by one.

**Time Complexity**: `O(amount * n)`
**Space Complexity**: `O(amount)`

### JavaScript (1D tabulation)
```javascript
var change = function(amount, coins) {
  const dp = Array(amount + 1).fill(0);
  dp[0] = 1;

  for (let c of coins) {
    for (let amt = c; amt <= amount; amt++) {
      dp[amt] += dp[amt - c];
    }
  }

  return dp[amount];
};
```

### Python (1D tabulation)
```python
def change(amount, coins):
    dp = [0] * (amount + 1)
    dp[0] = 1
    for c in coins:
        for amt in range(c, amount + 1):
            dp[amt] += dp[amt - c]
    return dp[amount]
```

### Dry run (tabulation, 1D) — `amount = 5`, `coins = [1,2,5]`
Start: `dp = [1,0,0,0,0,0]`  (indices 0..5)

Process coin `1`:
- amt=1 → `dp[1] += dp[0]` → `dp[1]=1`
- amt=2 → `dp[2] += dp[1]` → `dp[2]=1`
- amt=3 → `dp[3] += dp[2]` → `dp[3]=1`
- amt=4 → `dp[4] += dp[3]` → `dp[4]=1`
- amt=5 → `dp[5] += dp[4]` → `dp[5]=1`
Now `dp = [1,1,1,1,1,1]` (only using `1`s)

Process coin `2`:
- amt=2 → `dp[2] += dp[0]` → `dp[2]=1+1=2`  (combinations: `1+1`, `2`)
- amt=3 → `dp[3] += dp[1]` → `dp[3]=1+1=2`  (`1+1+1`, `1+2`)
- amt=4 → `dp[4] += dp[2]` → `dp[4]=1+2=3`  (`1+1+1+1`, `1+1+2`, `2+2`)
- amt=5 → `dp[5] += dp[3]` → `dp[5]=1+2=3`  (`1+1+1+1+1`, `1+1+1+2`, `1+2+2`)
Now `dp = [1,1,2,2,3,3]`

Process coin `5`:
- amt=5 → `dp[5] += dp[0]` → `dp[5] = 3 + 1 = 4`  (adds combination `[5]`)
Final `dp = [1,1,2,2,3,4]`

Answer `dp[5] = 4` (matches examples).

---

## Which approach to choose?
- **Small constraints / easier to reason:** use top-down with memo.
- **Production / cleaner and fastest in practice:** 1D tabulation (iterating coins outer, amounts inner ascending).
- **Memory-limited environment:** use 1D tabulation — `O(amount)` space.

---

## Common pitfalls & tips
- If you swap loop order (iterating amounts in outer loop and coins inside) you risk counting permutations rather than combinations.
- When using 1D DP, iterate `amt` from `coin` to `amount` **in increasing order** so that `dp[amt - coin]` for the same coin has been updated to reflect using that coin multiple times.
- Always initialize `dp[0] = 1`.
- For top-down memoization, a `dp` table sized `(amount+1) x n` is safe. You can also use `lru_cache` with `(rem, i)` tuple keys in Python.

---

## Time & Space summary
- **Time:** `O(amount * n)` for both tabulation and memoization.
- **Space:**
  - Top-down dp: `O(amount * n)` (memo) + recursion stack.
  - 2D tabulation: `O(amount * n)`.
  - 1D optimized tabulation: `O(amount)`.

---

## Variants and follow-ups
- **Count permutations instead of combinations**: change the loop order — iterate amount outer and coins inner (or adapt recurrence) — you'll count ordered sequences.
- **Bounded coin supply**: convert to a bounded-knapsack variant (maintain counts or expand items) or use group knapsack techniques.

---

## Quick checklist to debug wrong answers
- Is `dp[0]` set to `1`?
- Are you accidentally counting ordered sequences (permutations) instead of combinations?
- For 1D DP, are you iterating amounts in increasing order per coin?
- If using top-down, are you caching by both `rem` and `start` (or `i`)?

---

If you'd like, I can:
- Export this note as a downloadable **Markdown** or **PDF** file,
- Add the **2D tabulation** table drawn step-by-step as ASCII rows for the dry run,
- Provide runnable snippets for **Java**, **C++**, or other languages.

