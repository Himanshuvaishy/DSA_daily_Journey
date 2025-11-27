
# Longest Palindromic Substring

## Overview
This project provides a solution to find the longest palindromic substring within a given string using dynamic programming. A palindromic substring reads the same forwards and backwards.

## Features
- Uses a 2D DP table to track palindrome substrings efficiently.
- Handles palindromes of both odd and even lengths.
- Returns the longest palindromic substring, not just the length.

## Problem Statement
Given a string `s`, find the longest substring that is a palindrome.

## Approach
- Initialize a 2D boolean dp array where `dp[i][j]` is true if the substring `s[i..j]` is a palindrome.
- Fill base cases for substrings of length 1 and 2.
- Expand substring lengths from 3 to n and fill dp accordingly.
- Track the longest palindrome's start and end indices using an `ans` array.
- Return the substring from `ans[^0]` to `ans[^1]`.

## Code Example

```js

function longestPalindrome(s) {
let n = s.length;
if (n === 0) return "";

    let dp = Array.from({ length: n }, () => Array(n).fill(false));
    let ans = ;
    
    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
        if (i < n - 1 && s[i] === s[i + 1]) {
            dp[i][i + 1] = true;
            ans = [i, i + 1];
        }
    }
    
    for (let len = 3; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            let j = i + len - 1;
            if (s[i] === s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true;
                ans = [i, j];
            }
        }
    }
    return s.substring(ans, ans + 1);[^1]
    }

```

## Why use `ans = [0, 0]`?

- It initializes the longest palindrome boundaries to the first character.
- Ensures a valid palindrome result even if no longer palindromes exist.
- Efficiently tracks and updates the longest palindrome substring indices during DP computation.

## Time and Space Complexity
- Time: \(O(n^2)\) due to nested loops over substring lengths and start indices.
- Space: \(O(n^2)\) for the DP table.



