
# 🧮 Two Sum II - Input Array Is Sorted

## ✅ Problem Statement
Given a **sorted** array of integers `numbers` (in non-decreasing order) and an integer `target`, return the **indices** (1-based) of the two numbers such that they add up to `target`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

---

## 🧠 Intuition

The input array is sorted, so instead of using a brute-force approach or a hash map, we can use the **two-pointer** technique.  
This allows us to solve the problem efficiently in **linear time**.

---

## 🔍 Logic Behind the Two-Pointer Approach

### Step-by-Step:

1. Initialize two pointers:
   - `i = 0` (start of the array)
   - `j = numbers.length - 1` (end of the array)

2. Loop while `i < j`:
   - Calculate `sum = numbers[i] + numbers[j]`
   - If `sum > target`: move the right pointer left (`j--`)
   - If `sum < target`: move the left pointer right (`i++`)
   - If `sum === target`: return `[i + 1, j + 1]` (**1-based indexing**)

---

## 💻 Code (JavaScript)

```js
var twoSum = function(numbers, target) {
    let i = 0;
    let j = numbers.length - 1;

    while (i < j) {
        let sum = numbers[i] + numbers[j];

        if (sum > target) {
            --j; // Sum too large, move right pointer left
        } else if (sum < target) {
            ++i; // Sum too small, move left pointer right
        } else {
            return [i + 1, j + 1]; // Found the pair
        }
    }
};
```

---

## ⏱️ Time and Space Complexity

- **Time Complexity:** `O(n)` – Only one pass through the array with two pointers.
- **Space Complexity:** `O(1)` – No extra space used.

---

## 🧪 Example

```js
Input: numbers = [2, 7, 11, 15], target = 9
Output: [1, 2]
```

Explanation:
- `numbers[0] + numbers[1] = 2 + 7 = 9` → Match found!

---

## 🤔 Why Not Use Hash Map?

A hash map is useful when the array is **unsorted**.  
But since this array is **sorted**, the two-pointer technique is more **space-efficient** and **faster**.

---

## 📌 Summary

- Use two pointers because the array is sorted.
- Move pointers based on whether the current sum is too big or too small.
- Always return 1-based indices.
