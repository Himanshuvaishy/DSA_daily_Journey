
# 🧩 Palindrome Partitioning — Backtracking

## 📘 Problem Statement
Given a string `s`, partition it so that every substring of the partition is a **palindrome**.  
Return *all possible palindrome partitionings* of `s`.

### Example
```js
Input: s = "aab"
Output: [["a","a","b"], ["aa","b"]]
```

---

## 💡 Intuition
We need to split the string into substrings where each part is a palindrome.

**Steps to think:**
1. At each index, we can cut the string in multiple ways.
2. Check if the left part is a palindrome.
3. If yes → recurse on the remaining right part.
4. Backtrack once recursion returns.

> "Try every possible substring starting from `start`, and if it’s palindrome, explore further."

---

## 🧠 Backtracking Approach

We will use recursion with parameters:
- `start` → index to begin exploring substrings
- `path` → list of chosen palindrome substrings so far
- `result` → all valid partitions

---

## 💻 JavaScript Code

```js
var partition = function(s) {
    let result = [];

    const isPalindrome = (str, l, r) => {
        while (l < r) {
            if (str[l] !== str[r]) return false;
            l++;
            r--;
        }
        return true;
    };

    const backtrack = (start, path) => {
        if (start === s.length) {
            result.push([...path]);
            return;
        }

        for (let i = start; i < s.length; i++) {
            if (isPalindrome(s, start, i)) {
                path.push(s.slice(start, i + 1));  // choose substring
                backtrack(i + 1, path);            // recurse further
                path.pop();                        // backtrack
            }
        }
    };

    backtrack(0, []);
    return result;
};
```

---

## 🔍 Dry Run Example

**Input:** `s = "aab"`

| Step | start | i | substring | isPalindrome | path | Action |
|------|--------|---|------------|---------------|------|---------|
| 1 | 0 | 0 | "a" | ✅ | ["a"] | recurse(1) |
| 2 | 1 | 1 | "a" | ✅ | ["a","a"] | recurse(2) |
| 3 | 2 | 2 | "b" | ✅ | ["a","a","b"] | result.push |
| 🔙 | backtrack |  |  |  | ["a","a"] | pop |
| 4 | 1 | 2 | "ab" | ❌ |  | skip |
| 🔙 | backtrack |  |  |  | ["a"] | pop |
| 5 | 0 | 1 | "aa" | ✅ | ["aa"] | recurse(2) |
| 6 | 2 | 2 | "b" | ✅ | ["aa","b"] | result.push |

**Result:**  
```
[["a","a","b"], ["aa","b"]]
```

---

## 🌳 State Space Tree

```
             ""
        /                  "a"             "aa"
     /                    "a"                  "b"
   |
   "b"
```

---

## 🕒 Complexity Analysis

| Aspect | Complexity |
|--------|-------------|
| Time | O(2ⁿ × n) — Each index may split or not, plus palindrome check |
| Space | O(n) recursion depth + O(n²) substring storage |

---

## 🧩 Key Takeaways

| Concept | Description |
|----------|--------------|
| Approach | Backtracking with DFS |
| Key Idea | Partition string at every possible point |
| Core Check | Palindrome substring validation |
| Data Structure | Recursion + array path tracking |
| Useful For | String partitioning and recursion mastery |

---

## 🧠 Summary
- Explore all substrings recursively.
- Only continue recursion if substring is palindrome.
- Push completed paths when end of string is reached.
- Backtrack to explore alternative cuts.

---
