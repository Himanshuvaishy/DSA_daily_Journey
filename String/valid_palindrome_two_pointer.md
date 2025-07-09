# Valid Palindrome – Two Pointer Approach (In-place)

**LeetCode Problem**: [125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)  
**Difficulty**: Easy  
**Language**: JavaScript

---

## 📜 Problem Statement

Given a string `s`, return `true` if it is a **palindrome**, considering only **alphanumeric characters** and **ignoring cases**.

---

## ✅ Code (JavaScript – Optimal Two Pointer Approach)

```js
var isPalindrome = function(s) {
    s = s.toLowerCase();          // Step 1: Normalize (convert to lowercase)
    let i = 0;
    let j = s.length - 1;

    while (i < j) {
        // Step 2: Skip non-alphanumeric characters from the left
        if (!s[i].match(/[a-z0-9]/i)) {
            ++i;
        }

        // Step 3: Skip non-alphanumeric characters from the right
        else if (!s[j].match(/[a-z0-9]/i)) {
            --j;
        }

        // Step 4: If both are valid and equal, move inward
        else if (s[i] === s[j]) {
            ++i;
            --j;
        }

        // Step 5: Characters don’t match → not a palindrome
        else {
            return false;
        }
    }

    return true;  // All matched
};
```

---

## 🧠 Explanation

### Step-by-step:

1. **Convert to Lowercase**  
   Normalize the entire string to make comparison case-insensitive.

2. **Two Pointers**  
   Use `i` starting from the left and `j` from the right.

3. **Skip Non-Alphanumeric Characters**  
   Use regex `/[a-z0-9]/i` to skip anything that’s not a letter or digit.

4. **Compare Characters**  
   If characters match, move both pointers inward.  
   If they don’t, return false immediately.

5. **Return True**  
   If loop completes without mismatch, string is a palindrome.

---

## 🔁 Example Input:

```js
isPalindrome("A man, a plan, a canal: Panama") // returns true ✅

isPalindrome("race a car")                     // returns false ❌
```

---

## ⏱️ Time & Space Complexity:

| Metric           | Value | Reason |
|------------------|-------|--------|
| Time Complexity  | O(n)  | Each character visited at most once |
| Space Complexity | O(1)  | No extra string or array used |

---

## ✅ Why It's Efficient

- No new string creation like in `split + reverse`
- Operates in-place using two pointers
- Regex simplifies alphanumeric checking

---


