# 🔍 Find Minimum in Rotated Sorted Array

## 📘 Problem:
Given a **rotated sorted array** with no duplicate elements, find the **minimum element**.

---

## 🧠 Key Concept:
In a rotated sorted array:
- At least **one half is always sorted**
- The **minimum always lies in the unsorted half**
- If the array is **not rotated**, the first element is the smallest

---

## ✅ Approach 1: Brute Force (Linear Search)

**Idea**:  
Go through the entire array and keep track of the minimum.

```js
function findMin(arr) {
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) min = arr[i];
    }
    return min;
}
```

**Time Complexity**: `O(n)`  
**When to use**: Only for learning or small datasets.

---

## ✅ Approach 2: Binary Search using `a[l] > a[m]`

### 🔎 Condition:
```js
if (a[l] > a[m]) {
    r = m;
} else {
    l = m + 1;
}
```

**Why it works**:
- If the left value is greater than mid, then the left half is unsorted.
- The minimum lies in the unsorted part.

```js
function findMin(a) {
    let l = 0, r = a.length - 1;

    while (l < r) {
        let m = Math.floor((l + r) / 2);

        if (a[l] > a[m]) {
            r = m;
        } else {
            l = m + 1;
        }
    }

    return a[l];
}
```

**Edge Case**:  
❌ If array is already sorted, it doesn't exit early.

---

## ✅ Approach 3: Better Binary Search using `a[m] > a[r]`

### 🔎 Condition:
```js
if (a[m] > a[r]) {
    l = m + 1;
} else {
    r = m;
}
```

**Why it’s better**:
- Compares with the **rightmost element**, which handles sorted arrays more reliably.

---

## ✅ Bonus Optimization: Early Sorted Check

```js
if (a[l] < a[r]) return a[l];
```

**Why**:
- If the entire subarray is sorted, return the first element directly.

---

## ✅ Final Optimized Code (Best Practice)
```js
function findMin(a) {
    let l = 0, r = a.length - 1;

    while (l < r) {
        if (a[l] < a[r]) return a[l];

        let m = Math.floor((l + r) / 2);

        if (a[m] > a[r]) {
            l = m + 1;
        } else {
            r = m;
        }
    }

    return a[l];
}
```

---

## 🔍 Why Do We Return `a[l]` (or `a[r]`)?
- The loop exits when `l == r`, meaning only one element is left.
- That element is the **smallest**, since all others have been ruled out.

---

## 🧠 Comparison Table:

| Condition            | Meaning                              | Action      |
|----------------------|--------------------------------------|-------------|
| `a[l] < a[r]`        | Array (or subarray) is sorted        | Return `a[l]` |
| `a[l] > a[m]`        | Left part is unsorted                | `r = m`     |
| `a[m] > a[r]`        | Right part is unsorted               | `l = m + 1` |
| `a[m] <= a[r]`       | Min is at mid or in left part        | `r = m`     |

---

## ✅ Summary

- 🔸 Use binary search to get `O(log n)` time.
- 🔸 Compare with `a[r]` to reliably find the unsorted part.
- 🔸 Use early exit (`a[l] < a[r]`) to optimize sorted cases.
- 🔸 Always return `a[l]` or `a[r]` when loop exits (they are equal).