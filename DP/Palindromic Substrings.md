
```js

# Palindromic Substrings

## Problem Statement
Given a string `s`, return the number of palindromic substrings in it.  
A string is a palindrome when it reads the same backward as forward.  
A substring is a contiguous sequence of characters within the string.

### Examples
- Input: s = "abc"  
  Output: 3  
  Explanation: Three palindromic strings: "a", "b", "c".

- Input: s = "aaa"  
  Output: 6  
  Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".

## Constraints
- 1 <= s.length <= 1000
- s consists of lowercase English letters.

## Why DP?
🚀 Summary Intuition in One Sentence

We use DP because larger palindromes depend entirely on knowing whether the smaller inner substring is a palindrome, and DP allows us to reuse that information efficiently instead of recomputing it. 

## Approach
We use a 2D DP table `dp[i][j]`, where `dp[i][j] = true` if substring `s[i..j]` is a palindrome.

- All single characters `s[i]` are palindromes → `dp[i][i] = true`.
- Check substrings of length 2 → if two consecutive characters are equal, mark as palindrome.
- For substrings length ≥ 3, `s[i..j]` is palindrome if:  
  - `s[i] == s[j]`  
  - `dp[i+1][j-1]` is true (inner substring is palindrome).
- Count all palindromic substrings while filling the table.
- Return the total count.

## Time & Space Complexity
- Time Complexity: O(n²)
- Space Complexity: O(n²)

## Dry Run (s = "aaa")
- Initialize `dp` 3x3 matrix
- Single character palindromes: dp[^0][^0], dp[^1][^1], dp[^2][^2] = true → count = 3
- Length 2 palindromes: dp[^0][^1], dp[^1][^2] = true → count = 5
- Length 3 palindrome: dp[^0][^2] = true → count = 6

Final dp matrix:  
```

[
[T, T, T],
[ , T, T],
[ ,  , T]
]

```

## Code Example (JavaScript)
```
```js

var countSubstrings = function(s) {
let n = s.length;
let dp = Array.from({ length: n }, () => Array(n).fill(null));
let ans = 0;

    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
        ++ans;
        if (i < n - 1 && s[i] === s[i + 1]) {
            dp[i][i + 1] = true;
            ++ans;
        }
    }
    for (let len = 3; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            let j = i + len - 1;
            if (s[i] === s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true;
                ++ans;
            }
        }
    }
    return ans;
    };

```

## Explanation of 2D Array Usage
- The 2D array `dp` represents substrings. `dp[i][j]` tells if the substring from index `i` to `j` is a palindrome.
- It is filled based on smaller substrings knowing whether their inner substrings are palindromic.
- This avoids repeated palindrome checks and helps count efficiently.

## Real-World Analogy
Checking a palindrome substring is like looking at a string in a mirror. If the ends match and the inner part is also palindromic, the whole substring is a palindrome.
```

If you want me to provide a direct file transfer or specific download link method for this file, please let me know your preferred platform or method!
<span style="display:none">[^3][^4][^5][^6][^7][^8][^9]</span>

