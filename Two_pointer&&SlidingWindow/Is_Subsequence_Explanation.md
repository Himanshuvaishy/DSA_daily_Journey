
# Is Subsequence Problem

### 📘 Problem Statement

> Given two strings `s` and `t`, return `true` if `s` is a subsequence of `t`, or `false` otherwise.

A **subsequence** of a string is a new string formed from the original string by deleting some (can be none) of the characters **without disturbing the relative positions** of the remaining characters.

For example:
- `"ace"` is a subsequence of `"abcde"`
- `"aec"` is **not** a subsequence of `"abcde"`

---

## 🔍 Intuition

We want to go through string `t`, trying to find each character of string `s`, one by one, **in order**.

- If we find a match, we move to the next character in `s`
- If we go through all of `t` and have found all characters in `s`, then `s` is a subsequence of `t`
- Order matters, but other characters in `t` can be skipped

---

## 🧠 Brute Force Approach

```js
function isSubsequence(s, t) {
    let sIndex = 0;
    let tIndex = 0;

    while (sIndex < s.length && tIndex < t.length) {
        if (s[sIndex] === t[tIndex]) {
            sIndex++;
        }
        tIndex++;
    }

    return sIndex === s.length;
}
```

### ✅ Time Complexity:
- O(n) where n = length of `t` (in worst case we traverse all of `t`)

### ✅ Space Complexity:
- O(1)

---

## ❓ What If There Are Duplicate Characters in `t`?

**Yes, it's allowed.** We only need to match the characters of `s` **in the same order**, not exactly one-to-one.

### Example 1:
```
s = "abc"
t = "aabbcc"
✔️ This is valid. The order is preserved.
```

### Example 2:
```
s = "abc"
t = "aaacbb"
❌ Invalid, because 'c' comes before the second 'b'
```

> Matching stops as soon as the expected next character is not found in the correct order.

---

## 🚫 Why Not Just Check if s.length == matchedCount?

Because characters must appear in the same relative order. If we randomly match without order, the result would be incorrect.

```js
s = "abc"
t = "cbabc"

// Here we might find all characters, but not in order
```

So just having all characters is not enough; the **order** must be maintained.

---

## 📝 Final Notes

- Duplicates in `t` do not matter
- Always traverse `t` left to right
- Matching stops if the current character of `s` isn't found in order

---

### 🧪 Test Cases

```js
console.log(isSubsequence("abc", "ahbgdc"));  // true
console.log(isSubsequence("axc", "ahbgdc"));  // false
console.log(isSubsequence("abc", "aabbcc"));  // true
console.log(isSubsequence("abc", "aaacbb"));  // false
```

---

**End of Explanation**
