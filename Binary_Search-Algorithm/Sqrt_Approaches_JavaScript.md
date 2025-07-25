# 📘 Finding Integer Square Root in JavaScript

This guide explains two approaches to finding the **integer square root** of a non-negative integer `x`, without using `Math.sqrt()`.

---

## 🔹 Problem Statement

Given a non-negative integer `x`, return the **integer part** of its square root. That is, return the largest integer `r` such that `r * r <= x`.

---

## ✅ 1. Linear Search Approach

### 🔍 How it works:
- Start from `1` and go up to `x`.
- Check for every number `i` whether `i*i <= x`.
- Stop when `i*i > x` and return `i - 1`.

### 🧠 Time Complexity:
- `O(√x)` — Less efficient for large `x`.

### 💻 JavaScript Code:

```js
var mySqrt = function(x) {
    if (x < 2) return x;

    for (let i = 1; i <= x; i++) {
        let sqrt = i * i;
        if (sqrt === x) return i;
        if (sqrt > x) return i - 1;
    }
};
```

---

## ✅ 2. Binary Search Approach (Efficient)

### 🔍 Idea:
Use binary search between `2` and `x/2` to find the integer square root.

### 💻 JavaScript Code:

```js
var mySqrt = function(x) {
    if (x < 2) return x;

    let l = 2;
    let r = Math.floor(x / 2);

    while (l <= r) {
        let m = Math.floor((l + r) / 2);
        if (m * m === x) return m;
        else if (m * m > x) {
            r = m - 1;
        } else {
            l = m + 1;
        }
    }

    return r;
};
```

---

### 📌 Why do we return `r` at the end?

At the end of the loop:
- `l > r`, so the loop breaks.
- `r` is the **largest number** for which `r * r <= x`.

If we return `l`, we might overshoot, since `l * l > x`.

---

### 📊 Visual Dry Run (x = 10)

```
Initial: l = 2, r = 5
1st Iteration:
  m = 3 → 3*3 = 9 < 10 → l = 4
2nd Iteration:
  m = 4 → 4*4 = 16 > 10 → r = 3

Loop ends: l = 4, r = 3 → return r = 3
```

✔️ `3 * 3 = 9` is valid  
✖️ `4 * 4 = 16` is too much

---

## 🧠 Best Way to Calculate `mid`

To avoid integer overflow (especially in languages like Java, C++, etc.), use:

```js
let mid = Math.floor(l + (r - l) / 2);
```

✅ In JavaScript, `Math.floor((l + r) / 2)` is acceptable because JS handles large numbers better.

---

## ⚖️ Comparison

| Approach       | Time Complexity | Space Complexity | Notes                            |
|----------------|------------------|------------------|----------------------------------|
| Linear Search  | O(√x)            | O(1)             | Simple but slow for large `x`    |
| Binary Search  | O(log x)         | O(1)             | Fast and efficient ✅            |

---

## 🏁 Conclusion

- Use **Binary Search** for efficiency.
- Always make sure to return `r`, not `l`, at the end of binary search in this case.
- Avoid overflow in other languages by computing `mid` as `l + (r - l) / 2`.

Happy Coding! 🚀
