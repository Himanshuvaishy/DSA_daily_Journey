
# Leetcode 658: Find K Closest Elements

## 🧠 Problem Summary

Given a **sorted** integer array `arr`, two integers `k` and `x`, return the **k closest integers** to `x` in the array. The result should also be sorted in ascending order.

---

## ✅ Approach 1: Linear Search (Naive)

### 🔧 Idea:

Slide a window of size `k` across the array and **choose the first window** that seems to have the smallest distance from `x`.

### Code:
```js
var findClosestElements = function(arr, k, x) {
    let start = 0;
    let end = arr.length - k;

    while (start < end) {
        if (Math.abs(x - arr[start]) > Math.abs(x - arr[start + k])) {
            start++;
        } else {
            break;
        }
    }

    return arr.slice(start, start + k);
};
```

### 📈 Time Complexity
- Time: **O(n - k)** in the worst case
- Space: **O(k)** for the result slice

### ⚠️ Why It Can Fail

This approach **greedily breaks** the loop when:
```js
Math.abs(x - arr[start]) <= Math.abs(x - arr[start + k])
```
But this does not guarantee that it’s the **globally best window**. There may be better windows further ahead.

### ❌ Example Where It Fails

```js
Input: arr = [1, 1, 1, 10, 10, 10], k = 1, x = 9
Output (Linear): [1]
Expected Output: [10]
```

At the start:
- `Math.abs(9 - arr[0]) = 8`
- `Math.abs(9 - arr[1]) = 8`

So it breaks early and returns the wrong result.

### ❗ Other Test Cases It Fails

| `arr`                      | `k` | `x` | Expected Output | Fails With Linear? |
|----------------------------|-----|-----|------------------|---------------------|
| `[1,1,1,10,10,10]`         | 1   | 9   | `[10]`           | ✅ Yes              |
| `[1,2,3,3,4]`              | 3   | 3   | `[2,3,3]`        | ❓ Tie-case issue   |
| `[1,2,3,4,5]`              | 4   | -1  | `[1,2,3,4]`      | ✅ Sometimes        |

---

## ✅ Approach 2: Binary Search (Efficient & Correct)

### 🔧 Idea:

Use binary search to find the **leftmost window** of size `k` where the elements are closest to `x`.

### Code:
```js
var findClosestElements = function(arr, k, x) {
    let start = 0;
    let end = arr.length - k;

    while (start < end) {
        let mid = Math.floor((start + end) / 2);

        if (Math.abs(x - arr[mid]) > Math.abs( arr[mid + k]-x)) {
            start = mid + 1;
        } else {
            end = mid;
        }
    }

    return arr.slice(start, start + k);
};
```

### 📈 Time Complexity
- Time: **O(log(n - k))**
- Space: **O(k)**

### ✅ Why This Works

Binary search efficiently finds the window with the minimum total distance to `x`, accounting for all edge cases.

### 🧾 Final Recommendation
Use **Binary Search** for both correctness and performance.
