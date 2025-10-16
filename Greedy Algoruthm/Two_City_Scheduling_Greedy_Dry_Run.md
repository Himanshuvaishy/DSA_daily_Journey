# 🧩 Two City Scheduling — Greedy Approach (Deep Dry Run)

## Problem Statement
We have `2N` people, and each person `i` has two costs:
- `costA[i]`: cost to fly to **city A**
- `costB[i]`: cost to fly to **city B**

Goal → Send **N people to each city** such that the **total cost is minimum**.

---

## 💡 Greedy Intuition — “Relative Advantage”
Instead of choosing based on absolute costs, we check how much cheaper (or costlier) it is for each person to go to city A instead of city B.

We calculate:
```
diff[i] = costA[i] - costB[i]
```

- If `diff[i]` is **negative**, sending to **A** saves money.
- If `diff[i]` is **positive**, sending to **B** saves money.

---

## Example Input
```js
const costs = [
  [10, 200],  // Person 1
  [30, 20],   // Person 2
  [50, 50],   // Person 3
  [30, 100]   // Person 4
];
```

We must send **2 people to City A** and **2 to City B**.

---

## Step 1: Compute Differences

| Person | costA | costB | diff = A - B | Meaning |
|:-------|:------|:------|:--------------|:--------|
| 1 | 10 | 200 | **-190** | Much cheaper to go to A |
| 2 | 30 | 20 | **+10** | Cheaper to go to B |
| 3 | 50 | 50 | **0** | Equal cost |
| 4 | 30 | 100 | **-70** | Cheaper to go to A |

---

## Step 2: Sort by Difference (Ascending)

| Order | Person | costA | costB | diff |
|:------|:--------|:--------|:--------|:--------|
| 1️⃣ | Person 1 | 10 | 200 | -190 |
| 2️⃣ | Person 4 | 30 | 100 | -70 |
| 3️⃣ | Person 3 | 50 | 50 | 0 |
| 4️⃣ | Person 2 | 30 | 20 | +10 |

Reason: Most **A-preferred** first (negative diff), then **B-preferred** (positive diff).

---

## Step 3: Assign Cities

We have **4 people**, so:
- First 2 → **City A**
- Last 2 → **City B**

| Person | City | Cost |
|:--------|:------|:------|
| 1 | A | 10 |
| 4 | A | 30 |
| 3 | B | 50 |
| 2 | B | 20 |

---

## Step 4: Total Cost

```
Total = 10 + 30 + 50 + 20 = 110
```
✅ **Minimum total cost = 110**

---

## Step 5: Why This Works

- Each person’s `diff` shows how much we *save* by sending them to one city over the other.
- Sorting ensures we pick the **maximum total savings**:
  - Most A-beneficial → A
  - Most B-beneficial → B

No swap can improve this total — that’s why it’s optimal.

---

## Step 6: JS Code

```js
function twoCitySchedCost(costs) {
  // Step 1: Sort by difference (A - B)
  costs.sort((a, b) => (a[0] - a[1]) - (b[0] - b[1]));

  let total = 0;
  const N = costs.length / 2;

  // Step 2: Assign first half to A, second half to B
  for (let i = 0; i < N; i++) total += costs[i][0];
  for (let i = N; i < costs.length; i++) total += costs[i][1];

  return total;
}
```

---

## Complexity
| Operation | Time | Space |
|------------|-------|--------|
| Sorting | O(N log N) | O(1) |
| Summation | O(N) | O(1) |
| **Total** | **O(N log N)** | **O(1)** |

---

## 🧠 Summary
✅ Sort people by `(costA - costB)`  
✅ First half → City A, second half → City B  
✅ This gives the **minimum possible total cost**
