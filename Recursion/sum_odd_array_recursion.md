# 🧩 Sum of Odd Numbers in an Array — Recursion Notes

## 1️⃣ Problem Statement
- **Given:** An array of integers `arr[]`
- **Return:** Sum of only odd numbers using recursion  
- **Constraints:** Array length ≥ 0

---

## 2️⃣ Intuition / Core Idea
- Move through array using index `i`.
- If `arr[i]` is odd → include it.
- Else → skip.
- Reduce problem by calling recursion on `i + 1`.
- Base case: when index reaches array length.

---

## 3️⃣ Recurrence Relation
```
f(i) = (arr[i] if odd else 0) + f(i+1)

Base case:
f(n) = 0
```

---

## 4️⃣ Recursive Approach (Top-Down)
```js
function sumOdd(arr, i = 0) {
    if (i === arr.length) return 0;

    let curr = (arr[i] % 2 !== 0) ? arr[i] : 0;
    return curr + sumOdd(arr, i + 1);
}
```

**Time:** O(n)  
**Space:** O(n)

---

## 5️⃣ Recursion Tree
Example array: [1, 2, 3]
```
sumOdd(0)
 → 1 + sumOdd(1)
        → 0 + sumOdd(2)
               → 3 + sumOdd(3)
                         → 0
```

---

## 6️⃣ Dry Run (arr = [1, 2, 3, 4, 5])
```
i=0 → 1 (odd) → 1 + sumOdd(1)
i=1 → 2 (even) → 0 + sumOdd(2)
i=2 → 3 (odd) → 3 + sumOdd(3)
i=3 → 4 (even) → 0 + sumOdd(4)
i=4 → 5 (odd) → 5 + sumOdd(5)
i=5 → end → 0
```

Working backwards:
- sumOdd(4) = 5  
- sumOdd(3) = 0 + 5 = 5  
- sumOdd(2) = 3 + 5 = 8  
- sumOdd(1) = 0 + 8 = 8  
- sumOdd(0) = 1 + 8 = **9**

**Final Answer: 9**

---

## 7️⃣ Memoization Version
```js
function sumOdd(arr, i = 0, memo = {}) {
    if (i === arr.length) return 0;
    if (memo[i]) return memo[i];

    let curr = (arr[i] % 2 !== 0) ? arr[i] : 0;
    memo[i] = curr + sumOdd(arr, i + 1, memo);

    return memo[i];
}
```

---

## 8️⃣ Tabulation Version
```js
function sumOdd(arr) {
    let sum = 0;
    for (let num of arr) {
        if (num % 2 !== 0) sum += num;
    }
    return sum;
}
```

---

## 9️⃣ Edge Cases
- Empty array → return 0  
- All even numbers → return 0  
- Negative odd numbers count as odd  

---

## 🔟 Comparison Table
| Method       | Time | Space | Notes                     |
|--------------|------|--------|----------------------------|
| Recursion    | O(n) | O(n)  | Clean recursive logic      |
| Memoization  | O(n) | O(n)  | Not necessary here         |
| Tabulation   | O(n) | O(1)  | Best practical solution    |

---

## 🎯 Summary
The recursion iterates through the array and accumulates only the odd numbers, reducing the problem into smaller `i+1` calls until the base case is reached.
