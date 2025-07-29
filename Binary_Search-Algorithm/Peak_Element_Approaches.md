
# 🧠 Peak Element Problem – All Approaches Explained

A **peak element** is an element that is **greater than or equal to its neighbors**.

Example:  
Input: `[1, 3, 20, 4, 1, 0]`  
Output: `2` (Because 20 is greater than 3 and 4)

---

## ✅ Linear Search Approach

### 🔹 Code:

```js
function findPeakElement(nums) {
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        if (i === 0 && nums[i] >= nums[i + 1]) {
            return i;
        }
        if (i === n - 1 && nums[i] >= nums[i - 1]) {
            return i;
        }
        if (i > 0 && i < n - 1 && nums[i] >= nums[i - 1] && nums[i] >= nums[i + 1]) {
            return i;
        }
    }

    return -1;
}
```

### 🔹 Time Complexity:
- **O(n)**

### 🔹 Why it works?
- You just check three conditions using `if`:
  - If `i === 0` → check right neighbor
  - If `i === n - 1` → check left neighbor
  - Else → check both left and right neighbors

---

## ✅ Binary Search Approach

### 🔹 Code:

```js
function findPeakElement(nums) {
    let l = 0;
    let r = nums.length - 1;

    while (l < r) {
        let mid = l + Math.floor((r - l) / 2);

        if (nums[mid] > nums[mid + 1]) {
            r = mid; // Move to left half
        } else {
            l = mid + 1; // Move to right half
        }
    }

    return l; // or return r; both are same here
}
```

### 🔹 Time Complexity:
- **O(log n)**

### 🔹 Why `while (l < r)` and not `l <= r`?
- When using `l <= r`, we must add extra checks to prevent infinite loop or TLE (Time Limit Exceeded).
- Using `l < r` makes the loop stop at one element when `l == r`, which is the peak.

### 🔹 How It Works:
- Always moves in the direction of the higher slope to ensure we don't miss a peak.
- Works even on unsorted arrays because it uses **relative neighbor comparison**, not absolute values.

---

## ❓ If We Need the **Largest Peak**

Binary search **cannot guarantee** the largest peak because it returns **any one peak**, not necessarily the max.

For the **largest peak**, use **linear search** and compare all elements.

---

## 🔍 Summary Table

| Approach       | Time     | Space | Finds Any Peak? | Finds Largest Peak? | Notes                       |
|----------------|----------|--------|------------------|----------------------|-----------------------------|
| Linear Search  | O(n)     | O(1)   | ✅                | ✅                   | Simple and accurate         |
| Binary Search  | O(log n) | O(1)   | ✅                | ❌                   | Optimized but not maximal   |

---

✅ Use **linear** if you need the largest.  
✅ Use **binary** for any one peak in **log time**.
