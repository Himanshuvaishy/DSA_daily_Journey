# 🍋 Lemonade Change — Notes (Greedy Algorithm)

## Problem (LeetCode 860)
You are a lemonade seller. Each lemonade costs **$5**. Customers arrive in order and pay with a bill of value **$5**, **$10**, or **$20**. You must provide the correct change to each customer immediately (before the next customer arrives).

Return `true` if you can give change to every customer, otherwise return `false`.

---

## Key Idea (Greedy Intuition)
You only need to track how many `$5` and `$10` bills you have at any time. When someone pays:
- If they pay `$5`, you keep it (no change needed).
- If they pay `$10`, you must give one `$5` as change.
- If they pay `$20`, you must give `$15` as change — and **greedily** prefer to give one `$10` and one `$5` (if possible) instead of three `$5`s. This preserves `$5` bills for future customers.

This local greedy choice (use a `$10` when possible for $20 change) is optimal: it preserves more `$5` bills which are the most flexible for giving change later.

---

## Approach 1 — Clear, explicit variables (`five`, `ten`)
Track counts with named variables `five` and `ten`. Check availability before decrementing.

### Algorithm
1. Initialize `five = 0`, `ten = 0`.
2. For each `bill` in `bills`:
   - If `bill === 5`: `five++`.
   - Else if `bill === 10`:
     - If `five === 0` → return `false`.
     - Else `five--`, `ten++`.
   - Else (bill === 20):
     - If `ten > 0` and `five > 0`: `ten--`, `five--`.
     - Else if `five >= 3`: `five -= 3`.
     - Else return `false`.
3. After processing all customers, return `true`.

### JavaScript Code
```js
var lemonadeChange = function(bills) {
  let five = 0, ten = 0;

  for (let bill of bills) {
    if (bill === 5) {
      five++;
    } else if (bill === 10) {
      if (five === 0) return false;
      five--;
      ten++;
    } else { // bill === 20
      if (ten > 0 && five > 0) {
        ten--;
        five--;
      } else if (five >= 3) {
        five -= 3;
      } else {
        return false;
      }
    }
  }

  return true;
};
```

### Dry run (detailed)
Example: `bills = [5, 5, 5, 10, 20]`

Initial: `five = 0`, `ten = 0`

1. bill = 5 → `five = 1`, `ten = 0`
2. bill = 5 → `five = 2`, `ten = 0`
3. bill = 5 → `five = 3`, `ten = 0`
4. bill = 10 → need one $5: `five = 2`, `ten = 1`
5. bill = 20 → prefer $10 + $5: `ten = 0`, `five = 1`

End: all customers satisfied → return `true`.

Edge case: `bills = [10, 5]`
1. bill = 10 → need one $5 but `five = 0` → return `false`.

---

## Approach 2 — Compact array wallet (`wallet[0]`, `wallet[1]`)
Functionally identical but uses a 2-element array `wallet` where `wallet[0]` = count of `$5`, `wallet[1]` = count of `$10`. This is a compact representation but slightly less explicit.

### JavaScript Code (your compact version)
```js
var lemonadeChange = function(bills) {
  let wallet = [0, 0]; // wallet[0] = $5 count, wallet[1] = $10 count

  for (let i = 0; i < bills.length; ++i) {
    if (bills[i] === 5) {
      wallet[0]++;
    } else if (bills[i] === 10) {
      wallet[1]++;
      wallet[0]--; // give one $5 as change
    } else { // bill === 20
      if (wallet[1] > 0) {
        wallet[1]--;
        wallet[0]--;
      } else {
        wallet[0] -= 3;
      }
    }
    if (wallet[0] < 0) return false; // not enough $5s
  }

  return true;
};
```

### Dry run (same example): `bills = [5, 5, 5, 10, 20]`
Start: `wallet = [0, 0]`

1. 5 → `[1, 0]`
2. 5 → `[2, 0]`
3. 5 → `[3, 0]`
4. 10 → increment `ten`, decrement `five` → `[2, 1]`
5. 20 → prefer 10+5: decrement both → `[1, 0]` → end `true`

Note: This version performs decrements first and checks `wallet[0] < 0` after; behaviour is identical for correct inputs, but explicit availability checks (as in Approach 1) can be clearer and safer.

---

## Why greedy is correct here
- The decision to use `10 + 5` for a $20 whenever possible is locally optimal: it preserves more $5 bills (the scarce resource needed to give change to $10 customers).
- If we ever cannot give change for a customer in sequence, there's no way to retroactively fix it by future transactions — so checking and failing immediately is correct.
- The state (counts of $5 and $10) fully summarizes everything needed to make the next decision.

---

## Complexity
- Time: **O(n)** — one pass over `bills`.
- Space: **O(1)** — constant extra space (two counters or a small array).

---

## Additional notes and pitfalls
- **Do not sort** the `bills` array. The order represents real-time arrival of customers; sorting would change the meaning of the input.
- Be careful with in-loop increments/decrements: always ensure you check availability (e.g., `five > 0`) before decrementing to avoid transient negative counts unless you immediately check and return.
- Use named variables (`five`, `ten`) in interviews for readability; the compact `wallet` array is fine in production if accompanied by comments.

---

## Test cases
- `[]` → `true` (no customers)
- `[5]` → `true`
- `[10]` → `false`
- `[5, 5, 10, 10, 20]` → `false`
- `[5, 5, 5, 10, 20]` → `true`
- `[5, 5, 5, 10, 10, 20, 20]` → simulate to check correctness

---

## TL;DR
Track counts of $5 and $10 bills, process customers in order, and for $20 bills prefer to give $10 + $5 when possible; otherwise give three $5s. Return false immediately if change cannot be made at any step. This greedy approach is optimal, simple, and runs in O(n) time.

