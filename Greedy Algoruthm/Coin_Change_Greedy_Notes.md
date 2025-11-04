# 💰 Coin Change Problem — Greedy Approach

## 🧩 Problem Statement

Given an amount of `n` rupees and an unlimited supply of coins or notes of denominations `{1, 2, 5, 10}`,  
find the **minimum number of coins** required to make up the amount `n = 18`.

---

## 💡 Intuition — “Pick the Largest First”

We always pick the **largest possible coin** that does not exceed the remaining amount.

Because for canonical denominations (like Indian currency),  
choosing the biggest denomination always leads to the **minimum number of coins**.

### Why It Works
Each smaller denomination divides the next larger denomination evenly —  
so larger coins never block optimal smaller combinations later.

---

## 🧠 Greedy Algorithm

1. Sort the coin denominations in **descending order**.
2. Initialize `count = 0`.
3. While the amount is greater than `0`:
   - Pick the **largest coin** ≤ amount.
   - Subtract it from amount.
   - Increment count.
4. Repeat until amount = 0.

---

## 🧮 Example Dry Run

**Input:**  
`denominations = [10, 5, 2, 1]`  
`amount = 18`

| Step | Remaining | Coin Picked | Count | Reason |
|------|------------|-------------|--------|--------|
| 1 | 18 | 10 | 1 | 10 ≤ 18 (maximum possible) |
| 2 | 8 | 5 | 2 | 5 ≤ 8 |
| 3 | 3 | 2 | 3 | 2 ≤ 3 |
| 4 | 1 | 1 | 4 | 1 ≤ 1 |

✅ **Result:** Minimum coins = **4**  
✅ **Coins used:** [10, 5, 2, 1]

---

## 💻 JavaScript Code

```js
function minCoins(amount, coins) {
    // Sort coins descending (largest first)
    coins.sort((a, b) => b - a);

    let count = 0;
    let result = [];

    for (let coin of coins) {
        while (amount >= coin) {
            amount -= coin;
            count++;
            result.push(coin);
        }
    }

    console.log("Coins used:", result);
    return count;
}

let amount = 18;
let coins = [1, 2, 5, 10];
console.log("Minimum coins:", minCoins(amount, coins));
```

### 🧾 Output:
```
Coins used: [10, 5, 2, 1]
Minimum coins: 4
```

---

## ⚙️ Complexity Analysis

| Operation | Time Complexity | Space Complexity |
|------------|------------------|------------------|
| Sorting | O(k log k) | O(1) |
| Iteration | O(n / min(coin)) | O(1) |
| **Overall** | **O(k log k)** | **O(1)** |

Where `k` = number of coin types.

---

## 🧠 Intuition Recap

| Concept | Explanation |
|----------|--------------|
| Strategy | Always take the largest coin possible |
| Why | Larger coins reduce total number needed |
| Works for | Canonical systems (like Indian/US currency) |

---

## 🧩 Example 2

**Amount = 27, Denominations = [1, 2, 5, 10]**

| Step | Remaining | Coin Picked | Coins So Far |
|------|------------|--------------|---------------|
| 1 | 27 | 10 | [10] |
| 2 | 17 | 10 | [10, 10] |
| 3 | 7 | 5 | [10, 10, 5] |
| 4 | 2 | 2 | [10, 10, 5, 2] |
| ✅ | 0 | — | [10, 10, 5, 2] |

✅ **Minimum Coins = 4**

---

## 🎯 Summary

- Sort coins descending.  
- Pick largest possible coin each step.  
- Works optimally for standard denominations.  
- Fast, simple, and effective.

---
