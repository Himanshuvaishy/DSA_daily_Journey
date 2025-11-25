

# create .md file

Below is your ready-to-download markdown notes file, including student Q\&A, detailed explanation, example dry run, and more.
Copy this into a file named `coin_change_bottom_up_notes.md`:

***

# Coin Change Problem – Bottom-Up Iterative DP Approach


***

## Problem Statement

> **Given:**

- An array `coins` of coin denominations
- An integer `amount` (target value)

> **Task:**
Find the minimum number of coins to make up `amount`.
If not possible, return `-1`.

***

## Why Bottom-Up DP? (Student Questions)

**Q: Why not recursion or greedy?**

- Recursion repeats work and is inefficient for large `amount` (exponential time/memory)
- Greedy works only for special denominations (e.g., US coins); fails for arbitrary sets
- Bottom-Up DP ensures all subproblems solved only once, so it's efficient and always correct

**Q: What is bottom-up?**

- Build answers for all values of `amount` from 0 up to target
- Always use previously solved (smaller) problems to solve bigger ones

**Q: Does order of coins matter?**

- No. The algorithm checks all coins for every sub-amount and picks the best option.

**Q: How do we handle unreachable amounts?**

- Any `dp[x]` that stays at Infinity is unreachable; return `-1`.

***

## Approach (Step By Step)

1. Create an array `dp` of length `amount+1`
    - Set `dp[^0] = 0` (zero coins needed for zero amount)
    - All others = Infinity
2. For `rem` from 1 to `amount`:
    - For every coin `c`:
        - If `rem - c >= 0`, set
`dp[rem] = min(dp[rem], 1 + dp[rem-c])`
3. At end, if `dp[amount] === Infinity`, return -1; otherwise, return `dp[amount]`

***

## Example Dry Run

**Input:**
`coins = [1, 2, 5], amount = 11`

**Process:**

```
Initialize: dp = [0, ∞, ∞, ∞, ∞, ∞, ∞, ∞, ∞, ∞, ∞, ∞]
rem = 1: coin=1? dp[^1]=1, others skipped → [0, 1, ∞,...]
rem = 2: coin=1? dp[^2]=2; coin=2? dp[^2]=1 → [0, 1, 1,...]
rem = 5: coin=5? dp[^5]=1 → [..., 1, ...]
Continue until rem=11:
Final: dp = [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3]
```

Output: `dp[^11]=3` (uses coins `[5, 5, 1]`)

***

## Common Student Questions \& Solutions

### Q: Why use Infinity initially?

- Flags as unreachable until a valid coin combo fills it


### Q: What if all coins > amount?

- They’re skipped at every step; base case handles dp=0


### Q: How do we get actual coin choices?

- You can store “last coin used” for each dp update if you want to reconstruct choices


### Q: Time/space complexity?

- Time: O(n × amount), Space: O(amount)

***

## JavaScript Code

```js
var coinChange = function(coins, amount) {
    let dp = new Array(amount + 1).fill(Infinity);
    dp[^0] = 0;
    for (let rem = 1; rem <= amount; rem++) {
        for (let coin of coins) {
            if (rem - coin >= 0) {
                dp[rem] = Math.min(dp[rem], 1 + dp[rem - coin]);
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
};
```


***

## Key Takeaways

- DP approach guarantees optimality for all cases (not just canonical denominations)
- Bottom-up works efficiently because every possible sub-amount is pre-computed
- Handles arbitrary coin values and amounts up to practical limits (usually up to 10^4)
- Easily extendable to track solution combinations

***
 