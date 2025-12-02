# Longest Increasing Subsequence — Recursion, Recursion + DP, Bottom-Up DP

## 1. Pure Recursion (Brute Force)
### **Approach**
Explore every possibility by choosing for each index whether to **take** or **skip** the current number. Use `prevIndex` to ensure strict increasing.

### **Intuition**
- At each step, you branch into two choices.
- If current number is greater than last picked, you may take it.
- Otherwise, you must skip.
- This explores all subsequences → exponential.

### **Code (JavaScript)**
```javascript
function lengthOfLIS_recursive(nums) {
  const n = nums.length;

  function dfs(i, prevIndex) {
    if (i === n) return 0;

    let best = dfs(i + 1, prevIndex);

    if (prevIndex === -1 || nums[i] > nums[prevIndex]) {
      best = Math.max(best, 1 + dfs(i + 1, i));
    }
    return best;
  }

  return dfs(0, -1);
}
```

---

## 2. Recursion + DP (Top-Down Memoization)
### **Approach**
Same recursion, but use memoization to save results for state `(i, prevIndex)` so they are not recomputed.

### **Intuition**
- Many recursive calls revisit same `(i, prevIndex)`.
- Caching these states reduces complexity from `O(2^n)` → `O(n²)`.
- Use a 2D memo table indexed by `(i, prevIndex+1)`.

### **Code (JavaScript)**
```javascript
function lengthOfLIS_topdown(nums) {
  const n = nums.length;
  const memo = Array.from({ length: n }, () => new Array(n + 1).fill(-1));

  function dfs(i, prevIndex) {
    if (i === n) return 0;

    const p = prevIndex + 1;
    if (memo[i][p] !== -1) return memo[i][p];

    let best = dfs(i + 1, prevIndex);

    if (prevIndex === -1 || nums[i] > nums[prevIndex]) {
      best = Math.max(best, 1 + dfs(i + 1, i));
    }

    memo[i][p] = best;
    return best;
  }

  return dfs(0, -1);
}
```

---

## 3. Bottom-Up DP (Iterative O(n²))
### **Approach**
`dp[i] =` length of LIS ending at index `i`. Check all previous indexes `j < i` and extend when `nums[j] < nums[i]`.

### **Intuition**
- Every element alone forms LIS = 1.
- For each `i`, extend from all valid smaller previous elements.
- Fill dp iteratively from left to right.
- Answer is `max(dp[i])`.

### **Code (JavaScript)**
```javascript
function lengthOfLIS_bottomup(nums) {
  const n = nums.length;
  if (n === 0) return 0;

  const dp = new Array(n).fill(1);
  let best = 1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    best = Math.max(best, dp[i]);
  }

  return best;
}
```

---
