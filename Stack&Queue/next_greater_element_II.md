# 🧊 Next Greater Element II – Two Approaches (Brute Force + Stack)

---

## ❓ Problem Statement

Given a **circular array**, find the **next greater number** for every element. The next greater number of a number `x` is the first greater number to its **next** in the array, considering the circular nature. If it doesn't exist, return -1 for that number.

---

## 🧪 Example

**Input:** `nums = [1, 2, 1]`  
**Output:** `[2, -1, 2]`

Explanation:
- `1` → next greater is `2`
- `2` → no next greater (wraps around, `1` is smaller)
- `1` → next greater is `2` (from beginning)

---

## 💡 Approach 1: Brute Force

```js
var nextGreaterElements = function(nums) {
    let n = nums.length;
    let ans = Array(n).fill(-1);

    for (let i = 0; i < n; i++) {
        for (let j = 1; j < n; j++) {
            let circularIndex = (i + j) % n;
            if (nums[circularIndex] > nums[i]) {
                ans[i] = nums[circularIndex];
                break;
            }
        }
    }

    return ans;
};
```

### 🔍 Explanation:
- For every element at index `i`, we loop `j = 1 to n-1` to find the **next greater** element.
- We use `(i + j) % n` to simulate **circular** behavior.
- Break as soon as we find the first greater value.

### ⏱️ Time Complexity:
- Outer loop runs `n` times
- Inner loop runs up to `n` times → Worst case
- **O(n²)**

### 💾 Space Complexity:
- `O(n)` for output array

---

## ⚡ Approach 2: Optimized Stack Approach

```js
var nextGreaterElements = function(nums) {
    let arr = [...nums, ...nums]; // simulate circularity
    let n = arr.length;

    let ans = Array(n).fill(-1);
    let stack = [];

    stack.push(arr[n - 1]);

    for (let i = n - 2; i >= 0; i--) {
        while (stack.length) {
            let top = stack[stack.length - 1];

            if (arr[i] < top) {
                ans[i] = top;
                break;
            } else {
                stack.pop();
            }
        }
        stack.push(arr[i]);
    }

    return ans.slice(0, n / 2); // Get result only for original nums
};
```

### 🔍 Explanation:
- We **double the array** to simulate circularity.
- Traverse from **right to left**, using a **monotonic decreasing stack**.
- For each element:
  - Pop all smaller/equal elements from the stack.
  - If a larger one is found on top, that’s the **next greater**.
  - Push current element to stack.
- The result is taken from the first half of the answer (`n / 2` elements).

---

### ❓ Why `n / 2` Works Without `Math.floor`

We double the array, so:
```js
let arr = [...nums, ...nums]; // n = 2 * nums.length → always even
```
That makes `n / 2` always an integer.

> ✅ **No need to use `Math.floor(n / 2)`**, because `n` is always even.

---

### ⏱️ Time Complexity:
- Every element is **pushed and popped at most once**.
- Total: **O(n)** where `n = 2 * original length` → Still **O(n)**

### 💾 Space Complexity:
- Stack: O(n)
- Answer array: O(n)

---

## ✅ Summary

| Approach       | Time Complexity | Space Complexity | Notes |
|----------------|------------------|-------------------|-------|
| Brute Force    | O(n²)            | O(n)              | Simple but slow |
| Stack-Based    | O(n)             | O(n)              | Optimal |