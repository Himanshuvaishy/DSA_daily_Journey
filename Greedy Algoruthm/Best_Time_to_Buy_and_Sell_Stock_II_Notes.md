# 💹 Best Time to Buy and Sell Stock II — Notes

## 🧩 Problem Statement
You are given an array `prices` where `prices[i]` represents the price of a stock on day `i`.  
You may complete **as many transactions as you like** (buy one and sell one share multiple times).  
However, you must **sell the stock before buying again**.

Return the **maximum profit** you can achieve.

---

## 🧠 Intuition
- If prices are rising, buy low and sell high repeatedly.  
- If prices drop, wait for the next low point to buy again.  
- The idea is to capture **every upward price movement**.

---

# 🥇 Approach 1 — Brute Force (Using Loops)

### 💡 Idea
Try all possible **buy-sell pairs** `(i < j)` and calculate profit for each.  
Track the maximum possible profit.

### ⚙️ Code (Single Transaction)
```js
function maxProfitBrute(prices) {
  let maxProfit = 0;

  for (let i = 0; i < prices.length - 1; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      if (prices[j] > prices[i]) {
        const profit = prices[j] - prices[i];
        if (profit > maxProfit) {
          maxProfit = profit;
        }
      }
    }
  }

  return maxProfit;
}
```

### ⏱️ Complexity
- **Time:** O(n²)
- **Space:** O(1)

### 🧮 Example Dry Run
Input: `prices = [7, 1, 5, 3, 6, 4]`

| Buy @ | Sell @ | Profit |
|--------|---------|---------|
| 7 | 1 | 0 |
| 1 | 5 | 4 |
| 3 | 6 | 3 |

✅ Max profit = 4 (from 1 → 5)

This works for **one transaction**, not multiple.

---

# 🥈 Approach 2 — Brute Force (Multi-Transaction Simulation)

### 💡 Idea
Use loops to simulate multiple buys and sells.  
Whenever we find a profit (price goes up), we buy and sell, then move forward.

### ⚙️ Code
```js
function maxProfitMultiBrute(prices) {
  let profit = 0;

  for (let i = 0; i < prices.length - 1; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      if (prices[j] > prices[i]) {
        profit += prices[j] - prices[i];
        i = j; // skip to next day after selling
        break;
      }
    }
  }

  return profit;
}
```

### 🧮 Example
`prices = [7, 1, 5, 3, 6, 4]`

| Step | Action | Profit |
|------|---------|--------|
| Buy @1, Sell @5 | +4 |
| Buy @3, Sell @6 | +3 |
✅ Total = 7

⏱️ **Time:** O(n²)

---

# 🥉 Approach 3 — Greedy Approach (Optimal)

### 💡 Intuition
Whenever there is an **increase** in price from day `i` to `i+1`,  
capture that profit (`prices[i+1] - prices[i]`).  
This works because multiple small profits add up to the same as one big profit.

### ⚙️ Code
```js
function maxProfitGreedy(prices) {
  let profit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }

  return profit;
}
```

### 🧮 Example Dry Run
`prices = [7, 1, 5, 3, 6, 4]`

| Day | Price | Change | Add Profit? | Total |
|------|--------|----------|--------------|--------|
| 0 | 7 | — | — | 0 |
| 1 | 1 | ↓ | No | 0 |
| 2 | 5 | ↑ +4 | Yes | 4 |
| 3 | 3 | ↓ | No | 4 |
| 4 | 6 | ↑ +3 | Yes | 7 |
| 5 | 4 | ↓ | No | 7 |

✅ Final Profit = **7**

---

## ⚙️ Complexity Comparison

| Approach | Time | Space | Type |
|-----------|-------|--------|------|
| Brute Force (1x) | O(n²) | O(1) | Nested loops |
| Brute Force (multi) | O(n²) | O(1) | Simulation |
| Greedy | O(n) | O(1) | Optimal |

---

## 🧠 Why Greedy Works
- Since you can make unlimited transactions, taking **every local increase** is optimal.
- Sum of local gains = total of global max profit.
- No future knowledge is needed; decisions are local and optimal.

---

## 🧾 Summary
| Concept | Description |
|----------|--------------|
| Strategy | Add every upward difference |
| Type | Greedy |
| Works for | Multiple transactions |
| Time | O(n) |
| Space | O(1) |
| Intuition | Capture every rise in price |

---

## 🧩 Test Cases

| Input | Output | Explanation |
|--------|---------|-------------|
| [7,1,5,3,6,4] | 7 | Buy@1 Sell@5, Buy@3 Sell@6 |
| [1,2,3,4,5] | 4 | Continuous increase |
| [7,6,4,3,1] | 0 | No profit possible |
| [2,1,2,0,1] | 2 | Two small profitable trades |

---

## 🧠 Key Takeaway
> In **Best Time to Buy and Sell Stock II**, the Greedy approach is both **simpler and optimal**, while brute force helps build understanding of the decision process.

