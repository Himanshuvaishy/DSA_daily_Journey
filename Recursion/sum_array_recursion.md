# 🧩 Sum of All Numbers in an Array — Recursion Notes

## 1️⃣ Problem Statement
- **Given:** An array of integers `arr[]`
- **Return:** The sum of all elements using recursion
- **Constraints:** Array length ≥ 0

---

## 2️⃣ Intuition / Core Idea
- Break into subproblem: `arr[i] + sum(i+1)`
- Reduce problem size by increasing index.
- Stop when index reaches end.

---

## 3️⃣ Recurrence Relation
```
f(i) = arr[i] + f(i+1)
Base case:
f(n) = 0
```

---

## 4️⃣ Recursive Approach (Top-Down)
```js
function sumArray(arr, i = 0) {
    if (i === arr.length) return 0;
    return arr[i] + sumArray(arr, i + 1);
}
```

**Time:** O(n)  
**Space:** O(n)

---

## 5️⃣ Recursion Tree
```
sumArray(0)
 → arr[0] + sumArray(1)
          → arr[1] + sumArray(2)
                   → arr[2] + sumArray(3)
                             → 0
```

---

## 6️⃣ Dry Run (arr = [1,2,3])
```
sumArray(0) = 1 + sumArray(1)
sumArray(1) = 2 + sumArray(2)
sumArray(2) = 3 + sumArray(3)
sumArray(3) = 0
```

Returns:
- sumArray(2) = 3  
- sumArray(1) = 2 + 3 = 5  
- sumArray(0) = 1 + 5 = 6  

✔ Final Answer: **6**

---

## 7️⃣ Memoization Version
```js
function sumArray(arr, i = 0, memo = {}) {
    if (i === arr.length) return 0;
    if (memo[i]) return memo[i];
    memo[i] = arr[i] + sumArray(arr, i + 1, memo);
    return memo[i];
}
```

---

## 8️⃣ Tabulation Version
```js
function sumArray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}
```

---

## 9️⃣ Edge Cases
- Empty array → return 0  
- Very large array → recursion depth error possible  

---

## 🔟 Comparison Table

| Method       | Time  | Space | Notes                 |
|--------------|--------|--------|------------------------|
| Recursion    | O(n)  | O(n)  | Clean & simple         |
| Memoization  | O(n)  | O(n)  | Unnecessary here       |
| Tabulation   | O(n)  | O(1)  | Best practical method  |

---

## 🎯 Summary
A clean recursive solution that breaks the array sum problem into smaller `i+1` subproblems until the base case is reached.
