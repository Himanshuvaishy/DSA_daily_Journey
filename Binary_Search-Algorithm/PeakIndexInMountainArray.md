
# 🏔️ Find Peak Index in Mountain Array

## 📘 Problem Statement

You are given a mountain array `arr`. Return the index of the **peak element**.

A **mountain array** is one that:
- Increases strictly up to a peak
- Then decreases strictly after

---

## ✅ Linear Search Approach

### 🔍 Idea:
Scan through the array and return the index where an element is greater than both its neighbors.

### 📄 Code:
```js
function peakIndexInMountainArray(arr) {
    for (let i = 1; i < arr.length - 1; i++) {
        if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
            return i;
        }
    }
    return -1;
}
```

### 💡 Why This Works:
In a mountain array, there's only one peak. When we find an element greater than both its neighbors, it must be the peak.

---

## ⚡ Binary Search Approach (Efficient)

### ⏱️ Time Complexity:
O(log n)

### 🎯 Core Logic:
Use binary search to find the peak by checking the direction of the slope.

- If `arr[mid] < arr[mid + 1]` → increasing slope → move right
- If `arr[mid] > arr[mid + 1]` → decreasing slope → move left (include mid)

### 📄 Code:
```js
function peakIndexInMountainArray(arr) {
    let l = 0;
    let r = arr.length - 1;

    while (l < r) {
        let mid = Math.floor((l + r) / 2);

        if (arr[mid] < arr[mid + 1]) {
            l = mid + 1;
        } else {
            r = mid;
        }
    }

    return l; // or r, both are same at the end
}
```

### 📌 Explanation of Conditions:

| Condition               | Meaning                        | What It Tells Us             | Action         |
|------------------------|--------------------------------|------------------------------|----------------|
| `arr[mid] < arr[mid+1]`| On the **increasing** slope    | Peak lies **right**          | `l = mid + 1`  |
| `arr[mid] > arr[mid+1]`| On the **decreasing** slope    | Peak lies **left or at mid** | `r = mid`      |

### 🔁 Why `while (l < r)`?

We are always narrowing the search range toward the peak. Loop ends when `l == r`, pointing to the peak index.

---

## 📝 Conclusion

- Linear search is simple but runs in O(n)
- Binary search is optimal for this problem and runs in O(log n)
