# Maximum Product Subarray — Two Approaches

This document contains:

- Problem statement & constraints
- Two working approaches with intuition (Approach 1: Kadane-like tracking max/min; Approach 2: Two-way traversal)
- Detailed JavaScript implementations
- In-depth dry-runs for both approaches (step-by-step, showing intermediate variables)
- Complexity, edge-cases, and when to use each approach

---

## Problem
Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest product and return the product.

**Constraints:**
- `1 <= nums.length <= 2 * 10^4`
- `-10 <= nums[i] <= 10`
- The product of any subarray fits in a 32-bit integer.

**Examples**
- `nums = [2,3,-2,4]` → output `6` (subarray `[2,3]`)
- `nums = [-2,0,-1]` → output `0`

---

# Approach 1 — Track max and min ending at each index (Kadane-style)

### Intuition
Multiplying by a negative number flips the sign. So at each position we need **both** the best (maximum) product ending here and the worst (minimum) product ending here — because the minimum can become maximum after multiplying by a negative later.

Let:
- `maxProdSoFar` = maximum product of a subarray ending at current index
- `minProdSoFar` = minimum product of a subarray ending at current index
- `totalMax` = global maximum product seen so far

For each `current` value, the new `maxProdSoFar` is the maximum of:
- `current` (start new subarray here)
- `maxProdSoFar * current` (extend previous max)
- `minProdSoFar * current` (extend previous min — useful if current < 0)

Similarly, `minProdSoFar` is the minimum of the same three values.

This updates in O(1) per element and keeps constant space.

### JavaScript — implementation (Approach 1)
```javascript
var maxProductApproach1 = function(arr) {
  if (!arr || arr.length === 0) return 0;

  let maxProdSoFar = arr[0];
  let minProdSoFar = arr[0];
  let totalMax = arr[0];

  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    const prevMax = maxProdSoFar;

    maxProdSoFar = Math.max(current, prevMax * current, minProdSoFar * current);
    minProdSoFar = Math.min(current, prevMax * current, minProdSoFar * current);

    totalMax = Math.max(totalMax, maxProdSoFar);
  }

  return totalMax;
};
```

### In-depth dry-run (arr = [2, 3, -2, 4])
Start: `maxProdSoFar = 2`, `minProdSoFar = 2`, `totalMax = 2`

- i = 1, current = 3
  - prevMax = 2
  - candidates: [3, 2*3 = 6, 2*3 = 6]
  - maxProdSoFar = 6
  - minProdSoFar = 3
  - totalMax = max(2,6) = 6

  State: max=6, min=3, total=6

- i = 2, current = -2
  - prevMax = 6
  - candidates: [-2, 6*(-2) = -12, 3*(-2) = -6]
  - maxProdSoFar = -2
  - minProdSoFar = -12
  - totalMax = max(6, -2) = 6

  State: max=-2, min=-12, total=6

- i = 3, current = 4
  - prevMax = -2
  - candidates: [4, -2*4 = -8, -12*4 = -48]
  - maxProdSoFar = 4
  - minProdSoFar = -48
  - totalMax = max(6, 4) = 6

Final answer: **6**

### Why it works (proof sketch)
At each index `i`, any subarray that ends at `i` is either:
- just `arr[i]`, or
- `arr[i] * (some subarray ending at i-1)`.

We only need to know the best and worst product ending at `i-1` because multiplying by a negative can swap min↔max. By carrying both, we can compute correct best/worst ending at `i` in O(1).

Edge cases handled naturally: zeros reset intermediate products because `Math.max`/`Math.min` include `current` itself.

---

# Approach 2 — Two-way traversal (left-to-right and right-to-left)

### Intuition
Zeros break subarrays: any subarray crossing a zero has product zero. Between zeros, the product of the entire segment determines candidates for the max. A trick is to compute cumulative products from both left-to-right (LTR) and right-to-left (RTL) simultaneously. This helps because the maximum product subarray in a segment can be obtained from either direction when negatives are present.

Maintain two running products:
- `ltrProd` multiplies elements left→right
- `rtlProd` multiplies elements right→left

At each index `i`, update both products and track `finalMax = max(finalMax, ltrProd, rtlProd)`. If any running product becomes zero, reset it to `1` because zero kills the product and we can start a new subarray after the zero.

This single-pass (with dual multipliers) covers both directions of accumulation and finds the maximum product across all subarrays.

### JavaScript — implementation (Approach 2)
```javascript
var maxProductApproach2 = function(arr) {
  if (!arr || arr.length === 0) return 0;

  const n = arr.length;
  let ltrProd = 1, rtlProd = 1;
  let finalMax = -Infinity;

  for (let i = 0; i < n; i++) {
    ltrProd *= arr[i];
    rtlProd *= arr[n - i - 1];

    finalMax = Math.max(finalMax, ltrProd, rtlProd);

    if (ltrProd === 0) ltrProd = 1;
    if (rtlProd === 0) rtlProd = 1;
  }

  return finalMax;
};
```

### In-depth dry-run (arr = [2, 3, -2, 4])
Start: `ltrProd = 1`, `rtlProd = 1`, `finalMax = -Infinity`

- i = 0
  - ltrProd = 1 * 2 = 2
  - rtlProd = 1 * 4 = 4
  - finalMax = max(-Inf,2,4) = 4

- i = 1
  - ltrProd = 2 * 3 = 6
  - rtlProd = 4 * (-2) = -8
  - finalMax = max(4,6,-8) = 6

- i = 2
  - ltrProd = 6 * (-2) = -12
  - rtlProd = -8 * 3 = -24
  - finalMax = max(6, -12, -24) = 6

- i = 3
  - ltrProd = -12 * 4 = -48
  - rtlProd = -24 * 2 = -48
  - finalMax = max(6, -48, -48) = 6

Final answer: **6**

### Why it works (deeper intuition)
For any contiguous segment without zeros, the product of the whole segment equals the product of its prefix (LTR) and suffix (RTL) multiplications. If the number of negative elements in the segment is even, the product of the whole segment is positive and might be the maximum. If odd, removing a prefix up to the first negative or removing a suffix starting at the last negative yields a positive candidate — which will appear when scanning in the opposite direction. By scanning both directions we implicitly test those removals without extra bookkeeping.

Resetting on zero ensures we treat segments between zeros independently (zeros as breakers).

---

# Comparison: When to use which

- **Approach 1 (max/min per index)**
  - Robust and intuitive for handling negatives and zeros.
  - Easy to extend to return indices of the subarray if needed.
  - Constant space O(1). Recommended as the standard solution.

- **Approach 2 (two-way product)**
  - Very concise and fast in practice.
  - Works by implicitly checking reversed-prefix candidates.
  - Slightly trickier to extend to recover the subarray indices.
  - Also O(1) space.

Both are O(n) time.

---

# Edge Cases & Practical Notes

- Arrays containing zeros split the array into independent segments — both algorithms correctly handle zeros.
- Arrays of length 1 should return that element.
- All negative arrays: both handle correctly (Approach 1 naturally keeps max single element; Approach 2 will find the max through prefix/suffix checks).
- If you need the **subarray itself** (indices or slice), Approach 1 can be augmented easily by tracking start/end when `maxProdSoFar` is set to `current`.

---

# Recovering indices (Approach 1)
If you want to return the subarray producing the maximum product, track `currStart` whenever you reset `maxProdSoFar` to `current`. Update `bestStart` and `bestEnd` when `totalMax` changes.

```javascript
function maxProductWithIndices(arr) {
  if (!arr || arr.length === 0) return { max: 0, subarray: [] };

  let maxProdSoFar = arr[0];
  let minProdSoFar = arr[0];
  let totalMax = arr[0];

  let currStart = 0, bestStart = 0, bestEnd = 0;

  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];

    // if current itself is bigger than extending, start new subarray at i
    if (current > maxProdSoFar * current && current > minProdSoFar * current) {
      // starting new candidate subarray at i
      maxProdSoFar = current;
      minProdSoFar = current; // both equal current
      currStart = i;
    } else {
      const prevMax = maxProdSoFar;
      maxProdSoFar = Math.max(current, prevMax * current, minProdSoFar * current);
      minProdSoFar = Math.min(current, prevMax * current, minProdSoFar * current);
    }

    if (maxProdSoFar > totalMax) {
      totalMax = maxProdSoFar;
      bestStart = currStart;
      bestEnd = i;
    }
  }

  return { max: totalMax, subarray: arr.slice(bestStart, bestEnd + 1) };
}
```

*Note:* recovering indices with multiplication-based DP is trickier because `minProdSoFar` and `maxProdSoFar` come from different previous choices. The simple heuristic above works for many cases but careful bookkeeping is needed for correctness in all corner cases; sometimes it's easier to compute products and track indices explicitly for each candidate.

---

# Complexity
- Time: O(n) for both approaches
- Space: O(1) extra space

---

# Final notes
Approach 1 is the standard interview solution: clear, extendable, robust. Approach 2 is a neat trick — concise and often faster in practice — but less straightforward if you need to return indices.

---

*End of document.*

