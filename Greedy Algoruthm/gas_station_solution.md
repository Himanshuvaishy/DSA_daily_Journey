# Gas Station — Solution, Explanation & Dry Run

## Problem
There are `n` gas stations along a circular route. The amount of gas at station `i` is `gas[i]`. It costs `cost[i]` gas to travel from station `i` to station `(i+1)` (next station clockwise). You start with an empty tank at one of the stations.

Return the starting gas station index if you can travel around the circuit once clockwise; otherwise return `-1`. If a solution exists, it is guaranteed to be unique.

---

## JavaScript solution (clean, O(n) greedy)

```javascript
var canCompleteCircuit = function (gas, cost) {
    let currGain = 0;   // current net gas from the current candidate start to this station
    let totalGain = 0;  // total net gas across all stations
    let ans = 0;        // current candidate start index

    for (let i = 0; i < gas.length; i++) {
        let gain = gas[i] - cost[i];
        currGain += gain;
        totalGain += gain;

        // if the running gain from candidate start becomes negative,
        // it means candidate cannot reach i+1, so try i+1 as new candidate
        if (currGain < 0) {
            ans = i + 1;
            currGain = 0; // reset running gain for the next candidate
        }
    }

    // If totalGain < 0, total gas < total cost -> impossible
    return totalGain < 0 ? -1 : ans;
};
```

---

## Full Explanation — step by step (easy language)

1. **What `gain` means:**
   - At each station `i`, compute `gain = gas[i] - cost[i]`.
   - `gain` is how much fuel you will have extra (if positive) or be short (if negative) after traveling from station `i` to station `i+1`.

2. **Two trackers:**
   - `currGain`: the net fuel if you started from the current candidate start (`ans`) and have traveled up to station `i`. This tells whether the candidate start can reach `i+1`.
   - `totalGain`: the net fuel if you sum gains for every station. If `totalGain < 0` after the full loop, the complete circuit is impossible.

3. **Candidate start logic:**
   - Initially assume `ans = 0` (start from station `0`). As you iterate, you accumulate `currGain`.
   - If `currGain` becomes negative at index `i`, starting from `ans` can't reach `i+1`. Also any start between `ans` and `i` will do worse, so they cannot be valid.
   - Therefore set `ans = i + 1` (try next station as candidate) and reset `currGain = 0`.

4. **Final decision:**
   - After the loop, if `totalGain < 0` return `-1` (no solution).
   - Otherwise `ans` is the unique valid starting station.

**Why this works (intuition):**
- If there is enough total gas to cover total cost, some start must work. When `currGain` goes negative at `i`, we know the current candidate can't reach `i+1`. Any start between the candidate and `i` would have even less fuel upon reaching `i+1` (they miss the earlier gains), so they also fail. This allows skipping them safely and trying `i+1`.

---

## Dry run (detailed traces)

### Example 1 — solution exists

**Input:**
- `gas = [1,2,3,4,5]`
- `cost = [3,4,5,1,2]`

**Gains:** `[-2, -2, -2, +3, +3]`

We track `(i, gain, currGain, totalGain, ans)`:

- Start: `currGain = 0`, `totalGain = 0`, `ans = 0`.

- i = 0: gain = -2
  - currGain = -2, totalGain = -2
  - currGain < 0 → ans = 1, currGain = 0

- i = 1: gain = -2
  - currGain = -2, totalGain = -4
  - currGain < 0 → ans = 2, currGain = 0

- i = 2: gain = -2
  - currGain = -2, totalGain = -6
  - currGain < 0 → ans = 3, currGain = 0

- i = 3: gain = +3
  - currGain = 3, totalGain = -3
  - currGain >= 0 → keep ans = 3

- i = 4: gain = +3
  - currGain = 6, totalGain = 0

End: `totalGain = 0` (>= 0) so return `ans = 3`.

**Meaning:** Starting at station 3 (0-based) you can complete the loop.

---

### Example 2 — no solution

**Input:**
- `gas = [2,3,4]`
- `cost = [3,4,3]`

**Gains:** `[-1, -1, +1]`

Trace:

- i = 0: gain = -1 → currGain = -1, totalGain = -1 → reset → ans = 1, currGain = 0
- i = 1: gain = -1 → currGain = -1, totalGain = -2 → reset → ans = 2, currGain = 0
- i = 2: gain = +1 → currGain = 1, totalGain = -1

End: `totalGain = -1 < 0` → return `-1`.

**Meaning:** total gas < total cost; impossible to complete the circuit.

---

## Complexity
- Time: `O(n)` — single pass through the arrays.
- Space: `O(1)` — constant extra memory.

---

## Edge cases & notes
- If `gas.length === 0`, you can return `-1` or handle as invalid input.
- The problem assumes `gas.length === cost.length`. If not, validate before using the algorithm.
- The indices are `0`-based in this implementation. If you need `1`-based answer, return `ans + 1` when `totalGain >= 0`.

---

## How to test quickly

Open a Node.js REPL or run a small script with the function and test arrays. Example tests:

```javascript
console.log(canCompleteCircuit([1,2,3,4,5], [3,4,5,1,2])); // 3
console.log(canCompleteCircuit([2,3,4], [3,4,3]));         // -1
console.log(canCompleteCircuit([5,1,2,3,4], [4,4,1,5,1])); // 4
```

---

If you want, I can also:
- Produce a downloadable `.md` file, `.pdf`, or a commented JavaScript file, or
- Convert the explanation to a shorter cheat-sheet version.

Which would you like next?

