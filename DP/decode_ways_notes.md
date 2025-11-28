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

## Full Explanation (Markdown Notes)

### ✔ How decoding works
- A digit `1–9` → valid single letter.
- A pair `10–26` → valid double letter.
- `'0'` alone is **invalid**.

### ✔ DP Meaning
`dp[i]` = number of ways to decode substring `s[0…i-1]`

### ✔ Transitions
1. **Use 1 digit**  
   If `s[i-1]` != `'0'`  
   → `dp[i] += dp[i-1]`
2. **Use 2 digits**  
   If `10 ≤ s[i-2..i-1] ≤ 26`  
   → `dp[i] += dp[i-2]`

---

## Time Complexity
- **O(n)** — each index computed once.

## Space Complexity
- **O(n)** or **O(1)** if optimized.
