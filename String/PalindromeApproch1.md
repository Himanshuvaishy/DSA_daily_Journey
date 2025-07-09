# Valid Palindrome – Approach 1: Extra Space

**LeetCode Problem**: [125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)  
**Difficulty**: Easy  
**Language**: JavaScript

---

## 📜 Problem Statement (Simplified):

Given a string `s`, return `true` if it is a **palindrome**, considering **only alphanumeric characters** and **ignoring cases**.

A **palindrome** reads the same forward and backward.

---

## 🧠 Approach 1: Using Extra Space

### ✅ Steps:

1. **Create a new string**:
   - Keep only **letters and digits**
   - Convert all letters to **lowercase**

2. **Check if it equals its reverse**:
   - If `clean === reverse(clean)`, return `true`
   - Otherwise, return `false`

---

## 💻 Code (JavaScript):

```js
var isPalindrome = function(s) {
    // Step 1: Keep only alphanumeric characters and convert to lowercase
    let clean = "";
    for (let char of s) {
        if (/[a-zA-Z0-9]/.test(char)) {
            clean += char.toLowerCase();
        }
    }

    // Step 2: Check if clean string is equal to its reverse
    let reversed = clean.split("").reverse().join("");
    return clean === reversed;
};


**Approch2**---------------

var isPalindrome = function (s) {
    s = s.toLowerCase(); // Make everything lowercase
    let filteredString = "";
    let rev = "";

    for (let i = 0; i < s.length; i++) {
        if (/[a-z0-9]/.test(s[i])) {
            filteredString += s[i];
            rev = s[i] + rev;
        }
    }

    return filteredString === rev;
};


_Approch3_---------------------------------

var isPalindrome = function (s) {
s = s.toLowerCase();
let filteredString = "";
let rev = "";
for (let i = 0; i < s.length; i++) {
    if (
    (s[i].charCodeAt() >= "a".charCodeAt() && s[i].charCodeAt() <= "z".charCodeAt()) ||
    (s[i].charCodeAt() >= "0".charCodeAt() && s[i].charCodeAt() <= "9".charCodeAt())
    ) {
    filteredString = filteredString + s[i];
    rev = s[i] + rev;
    }
}
return filteredString === rev;
};
