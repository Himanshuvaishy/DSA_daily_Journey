# 🧵 Implement `strStr()` - Substring Search Problem

## 📌 Problem Statement

Given two strings `needle` and `haystack`, return the index of the first occurrence of `needle` in `haystack`, or -1 if `needle` is not part of `haystack`.

---

## 🚪 What is a Fixed Sliding Window?

A **fixed sliding window** is a technique where we maintain a window of a constant size and move it through the data structure (like a string or array) to perform some operation.

### ✅ Where We Use It?
- Pattern searching problems (like this one)
- Subarray sum problems
- Longest substring with constraints
- Anagram search

---

## 🧠 Intuition

We use a window of size `needle.length` and slide it across `haystack`. For each window, we compare the substring with `needle`. If matched, we return the index.

---

## 🔎 Brute Force Approach

```javascript
var strStr = function(haystack, needle) {
    return haystack.indexOf(needle);  // Built-in
};
```

- ✅ Time: O(n × m)
- ✅ Space: O(1)

---

## 🪟 Sliding Window Approach (Manual)

```javascript
var strStr = function(haystack, needle) {
    let n = haystack.length;
    let m = needle.length;

    for (let i = 0; i <= n - m; i++) {
        let j = 0;
        for (; j < m; j++) {
            if (haystack[i + j] !== needle[j]) {
                break;
            }
        }
        if (j === m) return i;
    }

    return -1;
};
```

- ✅ Time: O(n × m)
- ✅ Space: O(1)

---

## 👬 Two Pointer Approach

```javascript
var strStr = function(haystack, needle) {
    let n = haystack.length;
    let m = needle.length;
    
    if (m === 0) return 0;

    for (let i = 0; i <= n - m; i++) {
        let match = true;
        for (let j = 0; j < m; j++) {
            if (haystack[i + j] !== needle[j]) {
                match = false;
                break;
            }
        }
        if (match) return i;
    }
    return -1;
};
```

- ✅ Time: O(n × m)
- ✅ Space: O(1)

---

## ✅ Summary Table

| Approach         | Time Complexity | Space Complexity | Notes                        |
|------------------|------------------|-------------------|------------------------------|
| Brute Force      | O(n × m)         | O(1)              | Uses built-in `.indexOf()`   |
| Sliding Window   | O(n × m)         | O(1)              | Manual check, character-by-character |
| Two Pointer      | O(n × m)         | O(1)              | Same as sliding window, but logic-focused |

---

Happy Coding! 🚀