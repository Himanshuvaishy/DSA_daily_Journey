```js 
 
House Robber Problem — Full Explanation (Top-Down + Bottom-Up)

----------------------------------------------------
1. Problem Statement
----------------------------------------------------
You are a professional robber and want to rob houses along a street.
Each house has money, but you cannot rob two adjacent houses (police alert).
Given nums[i] = money in house i, return the maximum money you can rob.

----------------------------------------------------
2. Intuition
----------------------------------------------------
At each house i, you have two choices:
1. Rob this house → nums[i] + best from i-2
2. Skip this house → best from i-1

So:
best[i] = max(nums[i] + best[i-2], best[i-1])

----------------------------------------------------
3. Top-Down (Memoized Recursion)
----------------------------------------------------
Recurrence:
f(i) = max(nums[i] + f(i+2), f(i+1))
Base case: if i >= n → 0

Code:
function rob(nums) {
  const n = nums.length;
  const memo = new Array(n).fill(-1);

  function f(i) {
    if (i >= n) return 0;
    if (memo[i] !== -1) return memo[i];
    memo[i] = Math.max(nums[i] + f(i+2), f(i+1));
    return memo[i];
  }
  return f(0);
}

----------------------------------------------------
4. Bottom-Up DP (Tabulation)
----------------------------------------------------
dp[i] = max(nums[i] + dp[i-2], dp[i-1])

Base:
dp[0] = nums[0]
dp[1] = max(nums[0], nums[1])

Code:
function rob(nums) {
  const n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];

  const dp = [];
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(nums[i] + dp[i-2], dp[i-1]);
  }
  return dp[n-1];
}

----------------------------------------------------
5. Space Optimized Approach (Best)
----------------------------------------------------
Use two variables instead of dp array:
prev2 = dp[i-2]
prev1 = dp[i-1]

Code:
function rob(nums) {
  const n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];

  let prev2 = nums[0];
  let prev1 = Math.max(nums[0], nums[1]);

  for (let i = 2; i < n; i++) {
    const curr = Math.max(nums[i] + prev2, prev1);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}

----------------------------------------------------
6. Example
----------------------------------------------------
nums = [2, 7, 9, 3, 1]

i | nums[i] | best
0 |   2     | 2
1 |   7     | 7
2 |   9     | 11  (9 + 2)
3 |   3     | 11  (skip)
4 |   1     | 12  (1 + 11)

Final answer = 12

----------------------------------------------------
7. Summary Table
----------------------------------------------------
Approach         Time    Space     Notes
Top-Down         O(n)    O(n)      Recursion + memo
Bottom-Up        O(n)    O(n)      dp array
Space Optimized  O(n)    O(1)      Best approach
