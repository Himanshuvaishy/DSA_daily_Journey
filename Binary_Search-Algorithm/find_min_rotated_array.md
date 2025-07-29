# 🔍 Finding the Minimum in a Rotated Sorted Array

This document explains **two different binary search approaches** to find the minimum element in a rotated sorted array. Both are efficient and widely accepted, but differ in their logic and implementation.

---

## ✅ Approach 1: Standard Binary Search (`l < r`)

### 🔧 Key Idea:

Use the property of a rotated sorted array: **the unsorted half always contains the minimum element**.

### explaination of key idea

🔑 Key Idea:
In a rotated sorted array, one half is always sorted.
That means:
➡️ The minimum element must lie in the unsorted half.

So during binary search:

If the left half is sorted, the minimum is in the right half.

If the right half is sorted, the minimum is in the left half.

📘 Example:
Let’s take this rotated sorted array:

arr = [5, 6, 7, 0, 1, 2, 4]
This is a rotation of a sorted array [0, 1, 2, 4, 5, 6, 7]

💡 Step-by-Step using Binary Search
Initialize:

l = 0, r = 6 (index range)
🔁 First Iteration:
mid = 0 + Math.floor((6 - 0) / 2) = 3

arr[mid] = 0

Now check:

arr[l] = 5

arr[r] = 4

➡️ Is the subarray from l to r sorted?
arr[l] > arr[r] → ❌ Not sorted
Now, check if arr[mid] < arr[mid - 1]
→ arr[3] = 0, arr[2] = 7 → ✅ Yes → 0 is the minimum

So we return 0.

📌 Why "Unsorted half has the minimum"?
Because a sorted portion (like [5,6,7] or [0,1,2,4]) means all elements are in increasing order, and the smallest one is at the beginning of that subarray.

But the rotation point (where the array "breaks") causes a drop in value, and that drop is where the minimum is.

🔁 Another Example:
ini
Copy
Edit
arr = [7, 8, 9, 1, 2, 3, 4, 5, 6]
Left = [7, 8, 9] is sorted

Right = [1, 2, 3, 4, 5, 6] is also sorted

But if the left side is sorted and arr[mid] > arr[r], it means the minimum is on the right.

✅ Summary:
Always check which side is sorted.

The unsorted side must contain the rotation point and hence the minimum element.

Use that to move l and r in binary search.

### 🔄 Steps:

1. Initialize two pointers: `l = 0`, `r = arr.length - 1`.
2. While `l < r`:
   - Compute `mid = l + Math.floor((r - l) / 2)`
   - If `arr[mid] > arr[r]`, the minimum lies in the **right half** → `l = mid + 1`
   - Else, the minimum lies in the **left half including mid** → `r = mid`
3. Return `arr[l]` (or `arr[r]`, both are equal at this point).

### 💻 Code (JavaScript):

```js
function findMin(arr) {
  let l = 0,
    r = arr.length - 1;

  while (l < r) {
    let mid = l + Math.floor((r - l) / 2);
    if (arr[mid] > arr[r]) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return arr[l];
}
```

### ✅ Why use `l < r` instead of `l <= r`?

Using `l <= r` may cause an **infinite loop** when updating only one side (e.g. `r = mid`) because `mid` can equal `r`, keeping the values the same. This eventually leads to **TLE (Time Limit Exceeded)**.

---

## ✅ Approach 2: Pivot Detection (`l <= r` with Early Return)

### 🔧 Key Idea:

Try to **detect the exact pivot point** (minimum element) by checking conditions at `mid` and its neighbors.

### 🔄 Steps:

1. Initialize `l = 0`, `r = arr.length - 1`
2. While `l <= r`:
   - If subarray is already sorted → return `arr[l]`
   - Compute `mid = l + Math.floor((r - l) / 2)`
   - If `arr[mid] < arr[mid - 1]` → pivot found → return `arr[mid]`
   - If `arr[l] > arr[mid]` → pivot lies in left half → `r = mid - 1`
   - Else → pivot lies in right half → `l = mid + 1`

### 💻 Code (JavaScript):

```js
function findMin(arr) {
  let l = 0,
    r = arr.length - 1;

  while (l <= r) {
    if (arr[l] <= arr[r]) return arr[l];

    let mid = l + Math.floor((r - l) / 2);

    if (mid > 0 && arr[mid] < arr[mid - 1]) {
      return arr[mid];
    }

    if (arr[l] > arr[mid]) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
}
```

### using same approch enhance loop ```

var findMin = function(arr) {
let l=0;
let r=arr.length-1;

    while (l < r) {
        if (arr[l] <= arr[r]) return arr[l];

        let mid = l + Math.floor((r - l) / 2);

        if (mid > 0 && arr[mid] < arr[mid - 1]) {
            return arr[mid];
        }

        if (arr[l] > arr[mid]) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }

return arr[l];

    }

---

## 📊 Comparison of Both Approaches

| Feature                 | Approach 1: Standard (`l < r`) | Approach 2: Pivot Detection (`l <= r`) |
| ----------------------- | ------------------------------ | -------------------------------------- |
| Simplicity              | ✅ Easier                      | ❌ Slightly complex                    |
| Loop condition          | `l < r`                        | `l <= r` with early return             |
| Handles sorted input    | ✅ Yes                         | ✅ Yes with condition check            |
| Direct pivot check      | ❌ No                          | ✅ Yes                                 |
| May risk TLE if misused | ❌ No                          | ⚠️ If not careful with updates         |

---

Choose the one that fits your understanding and requirement! Both are efficient: **Time Complexity = O(log n)**.
