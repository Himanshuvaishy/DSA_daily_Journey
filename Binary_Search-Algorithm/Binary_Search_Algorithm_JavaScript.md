# 📚 Binary Search Algorithm (BSA) – Explained in JavaScript

Binary Search is an efficient algorithm used to find the position of a target value within a **sorted** array. It works by repeatedly dividing the search interval in half.

---

## ✅ When to Use Binary Search?

- The array must be **sorted** (ascending or descending).
- Works efficiently with large datasets (logarithmic time complexity).
- Ideal for searching in static data (not frequently changing).

---

## 🔍 How Binary Search Works

1. Set two pointers: `low = 0` and `high = arr.length - 1`.
2. Calculate `mid = Math.floor((low + high) / 2)`.
3. Compare the `arr[mid]` with the target:
   - If equal, return `mid`.
   - If target is greater, search the right half: `low = mid + 1`.
   - If target is smaller, search the left half: `high = mid - 1`.
4. Repeat until `low > high`.

---

## 🧠 Time & Space Complexity

- **Time Complexity**: `O(log n)`
- **Space Complexity**: `O(1)` (iterative version)

---

## 💻 JavaScript Code (Iterative Version)

```js
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) {
      return mid; // Found the target
    } else if (arr[mid] < target) {
      low = mid + 1; // Search right half
    } else {
      high = mid - 1; // Search left half
    }
  }

  return -1; // Target not found
}
```

---

## ✅ Example

```js
const numbers = [1, 3, 5, 7, 9, 11];
const target = 7;
const result = binarySearch(numbers, target);
console.log(result); // Output: 3
```

---

## ⚠️ Common Mistakes

- Not ensuring the array is **sorted**.
- Incorrect calculation of `mid` (e.g., overflow in other languages).
- Using binary search on unsorted or dynamic data structures like linked lists.

---

## 🔁 Recursive Version (Bonus)

```js
function binarySearchRecursive(arr, target, low = 0, high = arr.length - 1) {
  if (low > high) return -1;

  const mid = Math.floor((low + high) / 2);

  if (arr[mid] === target) return mid;
  else if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, high);
  else return binarySearchRecursive(arr, target, low, mid - 1);
}
```

---

## 🔚 Summary

Binary Search is a must-know algorithm for every developer. Mastering it opens the door to solving advanced problems like:
- First/Last occurrence of a number
- Binary search on answer (e.g., minimum capacity to ship packages)
- Search in rotated sorted arrays

Happy Coding 🚀
