# 🔍 Search in Rotated Sorted Array

This document explains the solution for the classic Leetcode problem **"Search in Rotated Sorted Array"** using Binary Search.

## 🧠 Problem Statement

You are given a **rotated sorted array** and a **target** value. Your task is to return the **index** of the target if it exists in the array, otherwise return -1.

A rotated sorted array is a sorted array that has been rotated some number of times.

**Example:**  
Input: `arr = [4,5,6,7,0,1,2]`, `target = 0`  
Output: `4` (because `0` is at index 4)

---

## ✅ Code

```js
var search = function(arr, target) {
    let l = 0;
    let r = arr.length - 1;
    while (l <= r) {
        let m = l + Math.floor((r - l) / 2);
        if (target === arr[m]) {
            return m;
        }
        
        if (arr[l] <= arr[m]) {
            // Left half is sorted
            if (target >= arr[l] && target < arr[m]) {
                r = m - 1;
            } else {
                l = m + 1;
            }
        } else {
            // Right half is sorted
            if (target > arr[m] && target <= arr[r]) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
    }
    return -1;
};
```

---

## 🧾 Explanation

We use a modified **Binary Search**. The trick is to figure out whether the **left or right half** of the array is **sorted**, and then check if the **target lies in the sorted half**.

### 🔄 Step-by-step:

1. **Calculate mid index**: `m = l + Math.floor((r - l)/2)`
2. **Check if mid is target** → if yes, return `m`
3. If left half `arr[l] <= arr[m]` is sorted:
   - Check if target lies between `arr[l]` and `arr[m-1]`.
   - If yes, move `r = m - 1`, else move `l = m + 1`
4. Else (right half is sorted):
   - Check if target lies between `arr[m+1]` and `arr[r]`
   - If yes, move `l = m + 1`, else move `r = m - 1`
5. If not found, return -1

---

## ❓ Why `l <= r` in the loop?

This condition ensures we don't miss the last element. Binary search works with narrowing intervals, and `l == r` is a valid case where the target might still be found.

---

## 📌 Dry Run Example

### Input:
```js
arr = [6,7,8,1,2,3,4], target = 2
```

- `l = 0`, `r = 6`, `m = 3` → `arr[m] = 1`
- Right half `[1,2,3,4]` is sorted.
- Target `2` lies in `[1..4]`, so move `l = m + 1 = 4`
- New `m = 5`, `arr[m] = 3`
- Target `2 < 3`, move `r = m - 1 = 4`
- Now `l = 4`, `r = 4`, `m = 4`, `arr[m] = 2` → Target found 🎯

---

## ✅ Time Complexity

- **O(log n)** in all cases due to Binary Search.

---

## 🔚 Conclusion

This is an efficient Binary Search approach that handles rotated sorted arrays by **identifying which half is sorted** and narrowing the search space accordingly.