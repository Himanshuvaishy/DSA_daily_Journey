# Partition Equal Subset Sum — Full Guide  
Includes:  
✔ 3 Approaches (Brute Recursion, Top-down Memo, Bottom-up DP)  
✔ Detailed Dry Runs  
✔ Visual Recursion Trees (ASCII)  

---

# 📌 Problem  
Given array `nums`, return **true** if it can be partitioned into two subsets with equal sum.

Equivalent: check if **any subset sums to totalSum/2**.

---

# ---------------------------------------------------------
# ✅ Approach 1 — Pure Recursion (Brute Force)
# ---------------------------------------------------------

## 🔍 Intuition  
At each index `i`, we decide:

- **Take nums[i]** → subtract from remaining sum  
- **Skip nums[i]**

Explore *all* subsets → exponential complexity.

No memoization → many repeated states → TLE on LeetCode.

---

## 🧠 Code (Brute Force)
```javascript
function canPartition_recursive(nums) {
  let sum = nums.reduce((a,b)=>a+b,0);
  if (sum % 2) return false;

  let target = sum / 2;

  function dfs(i, rem) {
    if (rem === 0) return true;
    if (i >= nums.length || rem < 0) return false;

    // take
    if (dfs(i+1, rem - nums[i])) return true;

    // skip
    return dfs(i+1, rem);
  }

  return dfs(0, target);
}
```

---

## 📚 Dry Run Example: nums = [1, 5, 11, 5]  
Total = 22 → target = 11

Initial call: `dfs(0, 11)`

### 🔺 Visual Recursion Tree (Partial)

```
dfs(0,11)
├── take 1 → dfs(1,10)
│   ├── take 5 → dfs(2,5)
│   │   ├── take 11 → dfs(3,-6) ❌
│   │   └── take 5 → dfs(3,0) ✅ success
│   └── skip 5 → dfs(2,10)
└── skip 1 → dfs(1,11)
```

As soon as we hit `rem == 0`, recursion returns true.

---

## ❌ Why this approach TLE?
Because height ≈ n and branching ≈ 2 → **2ⁿ states**  
For n = 200 → impossible.

---

# ---------------------------------------------------------
# ✅ Approach 2 — Top-Down DP with Memo (AC on LeetCode)
# ---------------------------------------------------------

## 🎯 Intuition  
Use recursion structure from Approach 1, but **cache results** for state `(i, rem)`.

Memo reduces repeated calls → DP complexity.

### ✔ NO inner loop over `i = start..end`  
This is why your earlier code TLE’d — incorrect recursion shape.

Correct recursion = **only take or skip nums[i]**.

---

## 🧠 Code (Fast, LeetCode Accepted)
```javascript
function canPartition_topdown(nums) {
  let sum = nums.reduce((a,b)=>a+b,0);
  if (sum % 2) return false;

  let target = sum / 2;
  let memo = new Map(); // "i|rem" → boolean

  function dfs(i, rem) {
    if (rem === 0) return true;
    if (i >= nums.length || rem < 0) return false;

    const key = i + "|" + rem;
    if (memo.has(key)) return memo.get(key);

    // take
    if (dfs(i+1, rem - nums[i])) {
      memo.set(key, true);
      return true;
    }

    // skip
    let result = dfs(i+1, rem);
    memo.set(key, result);
    return result;
  }

  return dfs(0, target);
}
```

---

## 📚 Dry Run Example (with Memo)
nums = `[2, 3, 7, 8, 10]`  
sum = 30 → target = 15

### Tree (Pruned with Memo)
```
dfs(0,15)
├── dfs(1,13)
│   ├── dfs(2,10)
│   │   ├── dfs(3,3)
│   │   │   ├── dfs(4,-5) ❌
│   │   │   └── dfs(4,-7) ❌
│   │   │   memo["3|3"]=false
│   │   ├── dfs(3,2)
│   │   │   └── dfs(4,-8) ❌
│   │   │   memo["2|4"]=false
│   │   └── dfs(3,0) ✅ success
│   │       memo["10|2"]=true
│   ├── dfs(2,13) (skipped due to memo states)
│   memo["13|1"]=true
└── dfs(1,15)
memo["15|0"]=true
```

Once `"10|2"` becomes `true`, all states leading to it instantly return true.

---

## ⭐ Why this version passes?
- Only **n × target** possible states  
- Memo ensures each state computed once  
- No inner loop → correct subset DP tree  
- Efficient pruning

---

# ---------------------------------------------------------
# ✅ Approach 3 — Bottom-Up DP (1D DP) — Best for Interviews
# ---------------------------------------------------------

## 🎯 Intuition  
Classic subset-sum DP:

`dp[s] = true` if some subset makes sum `s`.

Process each number one-by-one and update dp from right to left.

---

## 🧠 Code (Fastest)
```javascript
function canPartition_bottomup(nums) {
  let sum = nums.reduce((a,b)=>a+b,0);
  if (sum % 2) return false;

  let target = sum / 2;
  let dp = new Array(target+1).fill(false);
  dp[0] = true;

  for (let num of nums) {
    for (let s = target; s >= num; s--) {
      if (dp[s - num]) dp[s] = true;
    }
  }
  return dp[target];
}
```

---

## 📚 Dry Run Example
nums = `[1, 5, 11, 5]`  
sum = 22 → target = 11

### DP Table (1D)

Initial:
```
dp = [T, F, F, F, F, F, F, F, F, F, F, F]
```

Process `1`:
```
dp[1] = dp[0] → T
```

Process `5`:
```
dp[6] = dp[1]
dp[5] = dp[0]
```

Process `11`:
```
dp[11] = dp[0] → T
```

✔ target reachable → return true.

---

# ---------------------------------------------------------
# 📊 Comparison Table
| Approach | Time | Space | Status |
|---------|-------|--------|--------|
| Brute Recursion | O(2ⁿ) | O(n) | ❌ TLE |
| Top-down Memo | O(n·target) | O(n·target) | ✔ Pass |
| Bottom-up DP (1D) | O(n·target) | O(target) | ⭐ Best |

---

# ---------------------------------------------------------
# 🎉 Final Summary  
- Your original approach TLEs because it **loops i=start..end** inside recursion.  
- Correct recursion = take or skip → memo works efficiently.  
- Bottom-up 1D DP is the fastest and most memory-efficient.

---

# END  
