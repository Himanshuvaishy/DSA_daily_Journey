# Reverse String II – Time & Space Complexity Explained

**Problem**: [LeetCode 541 – Reverse String II](https://leetcode.com/problems/reverse-string-ii/)

**Language**: JavaScript

---

_var reverseStr = function(s, k) {
    // Convert the string to an array for in-place modification
    s = s.split("");

    // Iterate in steps of 2k
    for (let x = 0; x < s.length; x += 2 * k) {
        // Get the actual number of characters to reverse (in case less than k remain)
        let n = Math.min(k, s.length - x);
        let mid = Math.floor(n / 2);

        // Reverse the first k characters in-place using two-pointer logic
        for (let i = 0; i < mid; i++) {
            let temp = s[x + i];
            s[x + i] = s[x + n - 1 - i];
            s[x + n - 1 - i] = temp;
        }
    }

    // Join the array back into a string and return it
    return s.join("");
};_


## ✅ Problem Summary

Given a string `s` and integer `k`, reverse the first `k` characters for every `2k` characters counting from the start of the string.

---

## ⏱️ Time Complexity: O(n)

### 🔍 Why?

We loop through the string in steps of `2k`:

```javascript
for (let x = 0; x < s.length; x += 2 * k) { 
    let n = Math.min(k, s.length - x);
    let mid = Math.floor(n / 2);
    for (let i = 0; i < mid; i++) {
        // Swap logic
    }
}
```

### Generalization:

- Total characters in string = `n`
- You jump by `2k` each time ⇒ number of chunks = `n / (2k)`
- Each chunk: reverse up to `k` characters = `k/2` swaps

### Total Work:

```
(n / 2k) × k = n / 2 = O(n)
```

✅ So total operations are **linear**, not quadratic.

---

## ❌ Why It’s Not O(n²)?

- In O(n²), every element is nested in a full loop.
- But here, each character is reversed **only once** or **not at all**.

So even though it’s a nested loop, the total character operations are still **just `n`**.

---

## 💾 Space Complexity

### In JavaScript:
- Strings are immutable ⇒ we use `.split()` and `.join()`
- That creates new arrays/strings ⇒ O(n) extra space

### In C++/Java:
- Use `char[]` to modify in-place ⇒ no new data created
- ✅ Space complexity = O(1)

---

## 🔄 Visual Example

**Input**: `"abcdefghijklmnopqrst"`, `k = 5`

| Chunk | Characters     | Action     |
|-------|----------------|------------|
| 1     | a b c d e      | reversed   |
| 2     | f g h i j      | untouched  |
| 3     | k l m n o      | reversed   |
| 4     | p q r s t      | untouched  |

➡️ Each character is reversed at most once → **O(n)**

---

## ✅ Final Summary

| Complexity Type | Value | Why? |
|------------------|--------|------|
| Time             | O(n)   | Each character processed once |
| Space (JS)       | O(n)   | Due to split/join              |
| Space (C++/Java) | O(1)   | In-place with mutable char[]   |

---


