# 🎯 Guess the Number Problem (Binary Search) — JavaScript

## 📘 Problem Statement

You are asked to guess a number between `1` and `n`. There's a feedback API `guess(num)` that returns:

- `-1` if the number is lower than the picked number
- `1` if the number is higher than the picked number
- `0` if the guess is correct

Your goal is to find the **exact number** using as few guesses as possible — using Binary Search logic.

---

## 💡 Binary Search Approach

```js
// Given API
// function guess(num): 
//   returns -1 if num is high, 1 if num is low, 0 if correct

var guessNumber = function(n) {
    let l = 1;
    let r = n;
    
    while (l <= r) {
        let mid = Math.floor(l + (r - l) / 2);  // avoids overflow
        const res = guess(mid);
        
        if (res === 0) {
            return mid;
        } else if (res < 0) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return -1; // Just a fallback (not expected if guess is guaranteed to succeed)
};

📌 Why while (l <= r) is used?
We use l <= r because:

We're trying to narrow down the range until we find the number.

The number can still lie at the boundary (i.e., l === r might be the correct number).

Exiting the loop before l === r might miss the correct value.

🔍 Visual Dry Run
Let's say the hidden number is 6, and n = 10.


Initial: l = 1, r = 10

→ mid = 5   → guess(5) = 1  → Too low → l = mid + 1 = 6

→ mid = 8   → guess(8) = -1 → Too high → r = mid - 1 = 7

→ mid = 6   → guess(6) = 0  → Found it! ✅
The loop stopped when l = 6 and r = 7, and mid = 6 was the answer.

🧠 Best Way to Calculate Mid

let mid = Math.floor(l + (r - l) / 2);
This prevents integer overflow, especially when n is large (like 2^31 - 1).
(l + r) / 2 can overflow in some languages, so this method is safer.

✅ Summary
Use binary search to reduce guesses from O(n) → O(log n)

Use l <= r to ensure no possible value is missed

Calculate mid using l + (r - l)/2 to avoid overflow

