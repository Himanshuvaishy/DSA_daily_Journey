# Decode Ways – Complete Notes

## Visual Diagram (ASCII)
```
           s = "226"
               |
        -----------------
        |               |
     take 1          take 2
      "26"             "6"
     /   \              |
  take1  take2       take1
   "6"     ""          ""
    |       |           |
   take1   1 way       1 way
    ""      
    |
   1 way

Total ways = 3
```

## Tabular Dry Run (s = "226")

| Substring | Step | Explanation | Ways |
|-----------|------|-------------|------|
| "226" | 1-digit → "26" | valid | ? |
| "226" | 2-digit → "6" | valid (22) | ? |
| "26" | 1-digit → "6" | valid | ? |
| "26" | 2-digit → "" | valid (26) | 1 |
| "6" | 1-digit → "" | valid | 1 |
| "" | base case | return 1 | 1 |

Final: 2 + 1 = **3**

---

## Bottom-Up DP Version

```js
var numDecodings = function(s) {
    let n = s.length;
    let dp = Array(n + 1).fill(0);

    dp[0] = 1; // empty string

    dp[1] = s[0] === "0" ? 0 : 1;

    for (let i = 2; i <= n; i++) {
        let one = Number(s.substring(i - 1, i));
        let two = Number(s.substring(i - 2, i));

        if (one >= 1 && one <= 9) dp[i] += dp[i - 1];
        if (two >= 10 && two <= 26) dp[i] += dp[i - 2];
    }

    return dp[n];
};
```

---

## Recursion (Pure) — Explanation & Code

### ✳️ Idea
Try every valid choice at each step:
- If the next single digit is valid (`'1'–'9'`), recurse on the rest.
- If the next two digits form a valid number (`10–26`), recurse skipping two digits.

Pure recursion explores all paths and **recomputes subproblems**, leading to exponential time.

### ❗ When to use
Good for understanding the problem or small inputs. For larger inputs, it will TLE.

### 🔁 Code (pure recursion)
```js
var numDecodingsRec = function(s) {
    function dfs(i) {
        // i is current index in s
        if (i === s.length) return 1;     // reached the end -> 1 way
        if (s[i] === '0') return 0;       // can't decode a leading 0

        // take one digit
        let ways = dfs(i + 1);

        // take two digits if valid
        if (i + 1 < s.length) {
            const two = Number(s.substring(i, i + 2));
            if (two >= 10 && two <= 26) ways += dfs(i + 2);
        }
        return ways;
    }
    return dfs(0);
};
```

### 🔍 Complexity
- Time: **O(2^n)** in worst case (exponential).
- Space: **O(n)** recursion stack.

---

## Recursion + Memo (Top-Down DP) — Explanation & Code

### ✳️ Idea
Add memoization (cache) to the recursion to avoid recomputing the same index/subproblem. Store results keyed by index (or substring). This makes each index computed once.

### ✅ Why memo by index is better than substring
Using indices (`i`) avoids creating substrings repeatedly (which costs O(n) each). Index-based memo yields **O(n)** time and **O(n)** space more cleanly.

### 🔁 Code (recursion + dp)
```js
var numDecodingsTopDown = function(s) {
    const n = s.length;
    const memo = new Array(n).fill(-1); // -1 means uncomputed

    function dfs(i) {
        if (i === n) return 1;
        if (s[i] === '0') return 0;
        if (memo[i] !== -1) return memo[i];

        let ways = dfs(i + 1);

        if (i + 1 < n) {
            const two = Number(s.substring(i, i + 2));
            if (two >= 10 && two <= 26) ways += dfs(i + 2);
        }

        memo[i] = ways;
        return ways;
    }

    return dfs(0);
};
```

### 🔍 Complexity
- Time: **O(n)** — each index `i` (0..n-1) computed once.
- Space: **O(n)** — recursion stack + memo array.

---

## Full Explanation (Markdown Notes)

### ✔ How decoding works
- A digit `1–9` → valid single letter.
- A pair `10–26` → valid double letter.
- `'0'` alone is **invalid**.

### ✔ DP Meaning
`dp[i]` = number of ways to decode substring `s[0…i-1]` (bottom-up), or `memo[i]` = number of ways from index `i` to end (top-down).

### ✔ Transitions
1. **Use 1 digit**  
   If `s[i-1]` != `'0'`  
   → `dp[i] += dp[i-1]` (bottom-up)  
   or `ways += dfs(i+1)` (top-down)
2. **Use 2 digits**  
   If `10 ≤ s[i-2..i-1] ≤ 26`  
   → `dp[i] += dp[i-2]` (bottom-up)  
   or `ways += dfs(i+2)` (top-down)

---

## Time Complexity
- **Pure Recursion:** O(2^n) (exponential)
- **Top-Down (Memo):** O(n)
- **Bottom-Up:** O(n)

*Note:* using substring operations adds hidden O(n) cost per substring; index-based memo avoids that overhead.

## Space Complexity
- **Recursion:** O(n) stack
- **Memo / DP array:** O(n)

---

## Summary (Quick)
- Start with recursion to understand the branching.
- Add memo (top-down) to make it efficient.
- Or use bottom-up DP for iterative clarity.
- Use index-based memoization to avoid substring overhead.
