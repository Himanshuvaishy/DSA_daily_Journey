# Sliding Window Maximum

We are solving the **Sliding Window Maximum** problem using **Brute Force** and **Deque Approach** with explanations and dry runs.

---

## Problem Statement
You are given an array of integers `nums` and a sliding window of size `k` which moves from the very left to the very right. You can only see the `k` numbers in the window. Return the max in each window.

Example:
```
nums = [1,3,-1,-3,5,3,6,7]
k = 3
Output: [3,3,5,5,6,7]
```

---

# 1️⃣ Brute Force Approach

### Idea
Check **every window** of size `k` and find its maximum by scanning all elements in that window.

### Algorithm
1. Loop `i` from `0` to `nums.length - k`.
2. For each window, find the max of `k` elements.
3. Push max into result array.

### JavaScript Code
```javascript
var maxSlidingWindow = function(nums, k) {
    let result = [];

    for (let i = 0; i <= nums.length - k; i++) {
        let maxVal = -Infinity;

        for (let j = i; j < i + k; j++) {
            if (nums[j] > maxVal) {
                maxVal = nums[j];
            }
        }

        result.push(maxVal);
    }

    return result;
};
```

### Dry Run Example
`nums = [1,3,-1,-3,5,3,6,7], k = 3`

| Window | Elements      | Max |
|--------|---------------|-----|
| 0-2    | 1,3,-1        | 3   |
| 1-3    | 3,-1,-3       | 3   |
| 2-4    | -1,-3,5       | 5   |
| 3-5    | -3,5,3        | 5   |
| 4-6    | 5,3,6         | 6   |
| 5-7    | 3,6,7         | 7   |

**Time Complexity:** O(n × k)  
**Space Complexity:** O(1) extra

---
---
# Sliding Window Maximum (Value-based Deque Approach)

## 📝 Idea

We maintain a **deque of values** (not indexes).

The deque is kept in **monotonic decreasing order**:

q[0] ≥ q[1] ≥ q[2] ≥ ...



- The **front (q[0])** always represents the **maximum** in the current window.  
- When sliding the window:
  - If the element leaving the window equals `q[0]`, we remove it (`q.shift()`).
  - Always pop **smaller values** from the back before adding a new element.

👉 This ensures we can get the **maximum of each window in O(1)** time.

---

## 🔑 Steps (Algorithm)

1. **Initialize:**
   - `res = []` → to store results.
   - `q = []` → our monotonic decreasing deque.
   - Two pointers: `i = 0` (window start), `j = 0` (window end).

2. **Iterate through the array with `j`:**
   - While `q` is not empty and `arr[j] > q[q.length - 1]`, remove from back (`q.pop()`).
   - Push `arr[j]` into `q`.

3. **Check if window size reached `k`:**
   - Append `q[0]` to result (max for this window).
   - If `arr[i] === q[0]`, remove it (`q.shift()`) since it’s leaving the window.
   - Slide window forward (`i++`).

4. Always expand window with (`j++`).

---

## 💻 JavaScript Code

```javascript
// Sliding Window Maximum - Value Based Deque
var maxSlidingWindow = function(arr, k) {
  let res = [];   // result array
  let q = [];     // deque (monotonic decreasing values)

  let i = 0, j = 0;

  while (j < arr.length) {

    // 1️⃣ Maintain decreasing order
    while (q.length > 0 && arr[j] > q[q.length - 1]) {
      q.pop();
    }

    // 2️⃣ Add current value
    q.push(arr[j]);

    // 3️⃣ If window has reached size k
    if (j >= k - 1) {
      // Front is maximum of current window
      res.push(q[0]);

      // 4️⃣ Remove outgoing element if it’s the max
      if (arr[i] === q[0]) {
        q.shift();
      }

      // Slide window
      i++;
    }

    // Expand window
    j++;
  }

  return res;
};
📊 Dry Run Example
Input:


arr = [1, 3, -1, -3, 5, 3, 6, 7], k = 3
Step by step:

Start: q = []

Add 1 → q = [1]

Add 3 → pop 1 (since 3 > 1) → q = [3]

Add -1 → q = [3, -1]

Window = [1,3,-1] → Max = 3 → res = [3]

Slide: remove 1 (not max, ignore) → q = [3, -1]

Add -3 → q = [3, -1, -3]

Window = [3,-1,-3] → Max = 3 → res = [3,3]

Slide: remove 3 (equals q[0]) → q = [-1, -3]

Add 5 → pop -3, pop -1 → q = [5]

Window = [-1,-3,5] → Max = 5 → res = [3,3,5]

Continue like this…

✅ Final result = [3, 3, 5, 5, 6, 7]

⏱ Complexity
Time Complexity: O(n)
Each element is pushed & popped at most once.

Space Complexity: O(k)
Deque holds at most k elements.