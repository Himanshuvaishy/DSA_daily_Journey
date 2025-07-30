# Find First and Last Position of Element in Sorted Array

## 🧠 Problem Statement

Given an array of integers `nums` sorted in non-decreasing order, find the starting and ending position of a given `target` value. If the target is not found in the array, return `[-1, -1]`.

You must write an algorithm with **O(log n)** runtime complexity.

---

## ✅ Approach 1: Using Two Binary Searches with Two Conditions

We perform two binary searches:

- One for the **first occurrence** (left bound)
- One for the **last occurrence** (right bound)

### 🔹 Why Two Loops?

Using two loops makes the logic cleaner. We “play safe” by separating responsibilities.

### 🔹 Code

```js
var searchRange = function(arr, target) {
    let l = 0;
    let r = arr.length - 1;
    let ans = [-1, -1];

    // First Binary Search - Find First Occurrence
    while (l < r) {
        let m = l + Math.floor((r - l) / 2);
        if (arr[m] < target) l = m + 1;
        else r = m;
    }

    if (arr[l] === target) ans[0] = l;

    // Second Binary Search - Find Last Occurrence
    l = 0;
    r = arr.length - 1;

    while (l < r) {
        let m = l + Math.ceil((r - l) / 2);
        if (arr[m] > target) r = m - 1;
        else l = m;
    }

    if (arr[l] === target) ans[1] = l;

    return ans;
};
```

### 🔸 Why `Math.floor` in First Search?

To **bias left** when two middle values exist. Ensures we don’t skip earlier occurrence.

### 🔸 Why `Math.ceil` in Second Search?

To **bias right** during mid calculation. Ensures we don’t get stuck in infinite loop or skip the last occurrence.

---

## ✅ Approach 2: Using Three Conditions in Both Searches

Use all three conditions: `<`, `>`, and `==` to track and move appropriately.

### 🔹 Code

```js
var searchRange = function(arr, target) {
    let first = -1;
    let last = -1;

    // First Binary Search: Find First Occurrence
    let l = 0, r = arr.length - 1;
    while (l <= r) {
        let mid = Math.floor((l + r) / 2);
        if (arr[mid] === target) {
            first = mid;
            r = mid - 1;
        } else if (arr[mid] < target) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }

    // Second Binary Search: Find Last Occurrence
    l = 0;
    r = arr.length - 1;
    while (l <= r) {
        let mid = Math.floor((l + r) / 2);
        if (arr[mid] === target) {
            last = mid;
            l = mid + 1;
        } else if (arr[mid] < target) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }

    return [first, last];
};
```

### 🔸 Why This Works

- `==` condition is used to update the answer and search further.
- `Math.floor` is safe when using full range binary search (`l <= r`).
- It gives clarity and control over how we bias towards left or right bounds.

---

## 📌 Examples

```js
searchRange([5, 7, 7, 8, 8, 10], 8); // [3, 4]
searchRange([5, 7, 7, 8, 8, 10], 6); // [-1, -1]
```

---

## 📚 Conclusion

- Use `floor` to bias **left**, and `ceil` to bias **right**.
- Using two loops with minimal conditions is clean.
- Using all three conditions gives more control.
- Both methods are **O(log n)** and valid.

---

## ✅ Optimized Approach Using Binary Search (Without Storing `mid`)

We do **two binary searches**:
1. One to find the **first occurrence** (biased to left)
2. One to find the **last occurrence** (biased to right)

We don’t store `mid` when we find `nums[mid] == target` because we want to continue the search to make sure we're at the **first or last position**.

---

### 🔸 First Occurrence

```js
while (l <= r) {
    let mid = Math.floor((l + r) / 2);
    if (nums[mid] < target) {
        l = mid + 1;
    } else {
        r = mid - 1;
    }
}
```

- If `nums[mid] == target`, we **still go left** to find the first occurrence.
- This ensures `l` ends up pointing to the first instance of the target.

---

### 🔸 Last Occurrence

```js
while (l <= r) {
    let mid = Math.floor((l + r) / 2);
    if (nums[mid] <= target) {
        l = mid + 1;
    } else {
        r = mid - 1;
    }
}
```

- If `nums[mid] == target`, we **go right** to find the last occurrence.
- When the loop ends, `r` will point to the last instance.

---

## 🧠 Why Not Store `mid` Directly?

- If we store `mid` the moment we find `target`, we might **miss an earlier or later occurrence**.
- Continuing the search allows us to find the **true boundary indices**.

---

## ✅ Final JavaScript Code

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    const result = [-1, -1];

    // First occurrence (bias left)
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        let mid = Math.floor((l + r) / 2);
        if (nums[mid] < target) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    if (l >= nums.length || nums[l] !== target) return result;
    result[0] = l;

    // Last occurrence (bias right)
    r = nums.length - 1;
    while (l <= r) {
        let mid = Math.floor((l + r) / 2);
        if (nums[mid] <= target) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    result[1] = r;

    return result;
};
```

---

## 🧠 Time and Space Complexity

- **Time Complexity:** `O(log n)` — Two binary searches
- **Space Complexity:** `O(1)` — Constant extra space

---

## ✅ Summary

| Step             | Bias      | Result Stored At |
|------------------|-----------|------------------|
| First Occurrence | Left side | `l`              |
| Last Occurrence  | Right side| `r`              |

This approach is **efficient** and ensures you get the **exact range** of the target in the array.


/// linear approch 

var searchRange = function(nums, target) {
    let first = -1;
    let last = -1;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) {
            if (first === -1) first = i;
            last = i;
        }
    }

    return [first, last];
};
