# 🧩 isPowerOfTwo — Recursion Notes

## 1️⃣ Problem Statement
- **Given:** An integer `n`
- **Return:** `true` if `n` is a power of 2, otherwise `false`
- **Constraints:**  
  - `n > 0`  
  - Use recursion  

---

## 2️⃣ Intuition / Core Idea
A number is a power of two if it keeps dividing by 2 until it becomes **1** without leaving a remainder.

Example:  
```
16 → 8 → 4 → 2 → 1 → true
12 → 6 → 3 → false
```

---

## 3️⃣ Recurrence Relation
```
f(n) = f(n / 2)          if n % 2 == 0
Base Cases:
f(1) = true
f(n < 1 or n % 2 != 0) = false
```

---

## 4️⃣ Recursive Approach (Top-Down)
```js
function isPowerOfTwo(n) {
    if (n === 1) return true;
    if (n < 1 || n % 2 !== 0) return false;

    return isPowerOfTwo(n / 2);
}
```

**Time:** O(log n)  
**Space:** O(log n)

---

## 5️⃣ Recursion Tree  
Example: n = 16
```
isPowerOfTwo(16)
 → isPowerOfTwo(8)
       → isPowerOfTwo(4)
             → isPowerOfTwo(2)
                   → isPowerOfTwo(1)
                         → true
```

---

## 6️⃣ Dry Run (n = 12)
```
isPowerOfTwo(12)
 → 12 % 2 == 0 → continue  
isPowerOfTwo(6)
 → 6 % 2 == 0 → continue  
isPowerOfTwo(3)
 → 3 % 2 != 0 → false
```

✔ Final Answer: **false**

---

## 7️⃣ Memoization Version (Unnecessary but included)
```js
function isPowerOfTwo(n, memo = {}) {
    if (n === 1) return true;
    if (n < 1 || n % 2 !== 0) return false;

    if (memo[n]) return memo[n];

    memo[n] = isPowerOfTwo(n / 2, memo);
    return memo[n];
}
```

---

## 8️⃣ Tabulation Version (Not ideal)
```js
function isPowerOfTwo(n) {
    if (n < 1) return false;

    while (n !== 1) {
        if (n % 2 !== 0) return false;
        n = n / 2;
    }
    return true;
}
```

---

## 9️⃣ Edge Cases
- n = 1 → true  
- n = 0 or negative → false  
- Very large n → recursion still efficient (log n depth)

---

## 🔟 Comparison Table
| Method       | Time     | Space     | Notes                         |
|--------------|----------|-----------|--------------------------------|
| Recursion    | O(log n) | O(log n) | Clean and readable             |
| Memoization  | O(log n) | O(log n) | No benefit here                |
| Tabulation   | O(log n) | O(1)     | Best practical approach        |

---

## 🎯 Summary
The algorithm divides `n` by 2 recursively until reaching 1. If at any point a remainder appears, the number is not a power of two.

