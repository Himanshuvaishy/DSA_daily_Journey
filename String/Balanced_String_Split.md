
# ⚖️ Balanced String Split (LeetCode 1221)

🔗 [Problem Link](https://leetcode.com/problems/split-a-string-in-balanced-strings/)

---

## 🧠 Problem Description

You are given a string `s` of **'L'** and **'R'** characters only.

A string is **balanced** if it has the same number of `'L'` and `'R'` characters.

**Goal:**  
Split the string into the **maximum number of balanced strings**.

Return the **maximum number** of balanced strings you can obtain.

---

### ✅ Example:

**Input:** `"RLRRLLRLRL"`  
**Output:** `4`  
**Explanation:**  
The balanced strings are: `"RL", "RRLL", "RL", "RL"`

---

## ✅ JavaScript Solution

```js
// LeetCode 1221 - Balanced String Split
var balancedStringSplit = function(s) {
    let balance = 0;
    let count = 0;

    for (let char of s) {
        if (char === 'R') balance++;
        else if (char === 'L') balance--;

        if (balance === 0) count++;
    }

    return count;
};
```

---

## ✅ Example Usage

```js
console.log(balancedStringSplit("RLRRLLRLRL")); // Output: 4
console.log(balancedStringSplit("RLLLLRRRLR")); // Output: 3
```
