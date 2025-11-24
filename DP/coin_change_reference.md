# Coin Change Problem - Reference

## Problem Statement
Given coins of various denominations and a total amount, find the minimum number of coins needed to make the amount. If impossible, return -1.

---

## Intuition & Explanation
- Try every possible coin at each step and recursively solve the smaller subproblem.
- Memoization (`dp`) prevents solving the same subproblem multiple times.
- The approach covers all possible coin combinations for the amount.

---

## Approach

- **Recursive (Top-Down + Memoization)**: Try each coin and recurse until base cases, memoizing the answer for each amount.
- **Brute-Force Recursive (No dp)**: Recursively branch for each coin without storing results. Leads to redundant computations and exponential time.

---

## Code Example (With dp - Optimized)

```js
var coinChange = function(coins, amount) {
    let n = coins.length;
    let dp = {};
    let fn = (remAmount) => {
        if (remAmount === 0) return 0;
        if (remAmount < 0) return -1;
        if (remAmount in dp) return dp[remAmount];
        let minCoins = Infinity;
        for (let i = 0; i < n; i++) {
            let res = fn(remAmount - coins[i]);
            if (res != -1) minCoins = Math.min(minCoins, 1 + res);
        }
        dp[remAmount] = (minCoins === Infinity) ? -1 : minCoins;
        return dp[remAmount];
    };
    return fn(amount);
};
```

---

## Code Example (Brute Force - No Memoization)

```js
function coinChangeBrute(coins, amount) {
    if (amount === 0) return 0;
    if (amount < 0) return -1;

    let minCoins = Infinity;
    for (let i = 0; i < coins.length; i++) {
        let res = coinChangeBrute(coins, amount - coins[i]);
        if (res !== -1) minCoins = Math.min(minCoins, 1 + res);
    }
    return minCoins === Infinity ? -1 : minCoins;
}
```

---

## Recursion Tree Visualization

For coins `[1,2,5]` and amount `5`:

```
fn(5)
├── fn(4) // coin 1
│   ├── fn(3)
│   │   ├── fn(2)
│   │   │   ├── fn(1)
│   │   │   │   ├── fn(0)
│   │   │   │   ├── fn(-1)
│   │   │   │   └── fn(-4)
│   │   │   ├── fn(-1)
│   │   │   └── fn(-4)
│   │   ├── fn(0)
│   │   └── fn(-3)
│   ├── fn(2)
│   └── fn(-1)
├── fn(3) // coin 2
│   ├── fn(2)
│   ├── fn(1)
│   └── fn(-2)
└── fn(0) // coin 5
```

---

## Why Greedy Does Not Work

- Greedy means always picking the largest coin that fits the remaining amount.
- This fails for many cases. Example: coins `[1, 3, 4]`, amount = `6`. Greedy picks `4, 1, 1` (3 coins), but optimal is `3, 3` (2 coins).
- Greedy only guarantees optimality if the denomination system is canonical (like standard US coins). In general, denominations can "trap" greedy in suboptimal paths.

---

## Dry Run Example

```markdown
coins = [1,2,5], amount = 5
fn(5): tries coin 1 (fn(4)), coin 2 (fn(3)), coin 5 (fn(0))
fn(0): returns 0
Result: minimum coins found among all paths is 1
```

---

## Complexity Analysis

- **Brute Force:** O(n^a) where a = amount; exponential time, very slow for large amount.
- **Memoized DP:** O(n * amount), much faster by caching results.

---

## Key Takeaways

- Use memoization to avoid recomputation and speed up recursion.
- Do **not** rely on greedy unless denomination system is special.
- Visual recursion tree helps map computation flow.

---
 # Generate a downloadable Markdown file with the recursion tree and memo notes





# Coin Change Problem - Recursion Tree and Memoization


***

## Step-by-Step Recursion Tree Exploration

```
Start: fn(5)

Try coin 1:
    Call fn(4)
    Inside fn(4):
        Try coin 1:
            Call fn(3)
            Inside fn(3):
                Try coin 1:
                    Call fn(2)
                    Inside fn(2):
                        Try coin 1:
                            Call fn(1)
                            Inside fn(1):
                                Try coin 1:
                                    Call fn(0)
                                        Base case reached, returns 0
                                Try coin 2:
                                    Call fn(-1)
                                        Invalid, returns -1
                                Try coin 5:
                                    Call fn(-4)
                                        Invalid, returns -1
                                Return 1 + min valid = 1 (for coin 1)
                        Back to fn(2), try coin 2:
                            Call fn(0)
                                Base case returns 0
                        Try coin 5 at fn(2):
                            Call fn(-3)
                                Invalid, returns -1
                        Return 1 + min valid = 1 (coin 2)
                    Back to fn(3), try coin 2:
                        Call fn(1) (already computed, use memo 1)
                    Try coin 5 at fn(3):
                        Call fn(-2)
                            Invalid, returns -1
                    Return 1 + min valid = 2
            Back to fn(4), try coin 2:
                Call fn(2) (memoized 1)
            Try coin 5 at fn(4):
                Call fn(-1)
                    Invalid, returns -1
            Return 1 + min valid = 2
    Back to fn(5), try coin 2:
        Call fn(3) (memoized 2)
    Try coin 5 at fn(5):
        Call fn(0)
            Base case returns 0
    Return 1 + min valid = 1
```

**Summary of Execution Order:**

- The first coin (1) branch is fully explored down to base cases before moving on to the second coin (2).
- After finishing the first coin, the second coin's branch is explored using cached results from memoization.
- Finally, the third coin (5) is tested, hitting the base case instantly.
- Thanks to memoization, repeated calls like `fn(1)` and `fn(2)` return instantly without recomputation.

***

## Recursion Tree (Summary)

```
C(5)
├─ 1 → C(4)
│  ├─ 1 → C(3)
│  │  ├─ 1 → C(2)
│  │  │  ├─ 1 → C(1)
│  │  │  │  ├─ 1 → C(0)
│  │  │  │  ├─ 2 → C(-1) [X, invalid]
│  │  │  │  └─ 5 → C(-4) [X, invalid]
│  │  │  ├─ 2 → C(0)
│  │  │  └─ 5 → C(-3) [X, invalid]
│  │  ├─ 2 → C(1)
│  │  └─ 5 → C(-2) [X, invalid]
│  ├─ 2 → C(2)
│  │  ├─ 1 → C(1)
│  │  ├─ 2 → C(0)
│  │  └─ 5 → C(-3) [X, invalid]
│  └─ 5 → C(-1) [X, invalid]
├─ 2 → C(3)
│  ├─ 1 → C(2)
│  │  ├─ 1 → C(1)
│  │  ├─ 2 → C(0)
│  │  └─ 5 → C(-3) [X, invalid]
│  ├─ 2 → C(1)
│  └─ 5 → C(-2) [X, invalid]
└─ 5 → C(0)
```

- `"C(x)"` means calling the recursive function with amount `x`
- Arrows labeled by coin values show choices at each depth
- `[X, invalid]` means negative amount (base case)
- Calls to `C(0)` are base cases where 0 coins are required

***

## Memoization Notes

- The memo/dp table stores results for each amount.
- For each amount, once computed, future calls are instantly returned instead of recalculated.
- This saves exponential recomputation and makes the algorithm efficient.

**Example:**


| Amount | dp value (min coins) |
| :-- | :-- |
| 0 | 0 |
| 1 | 1 |
| 2 | 1 |
| 3 | 2 |
| 4 | 2 |
| 5 | 1 |


***