
# 🧠 DSA String Problems - Solutions (JavaScript)

## ✅ 1. Reverse String II (LeetCode 541)

```js
// LeetCode 541 - Reverse String II
var reverseStr = function(s, k) {
    s = s.split("");
    for (let x = 0; x < s.length; x += 2 * k) {
        let n = Math.min(k, s.length - x);
        let mid = Math.floor(n / 2);
        for (let i = 0; i < mid; i++) {
            let temp = s[x + i];
            s[x + i] = s[x + n - 1 - i];
            s[x + n - 1 - i] = temp;
        }
    }
    return s.join("");
};
```

---

## ✅ 2. Check if a String is a Palindrome

```js
// Check if a String is a Palindrome
function isPalindrome(str) {
    const reversed = str.split('').reverse().join('');
    return str === reversed;
}

// Example usage:
console.log(isPalindrome("madam")); // true
console.log(isPalindrome("hello")); // false
```
