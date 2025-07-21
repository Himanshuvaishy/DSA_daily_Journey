
# 🧠 Next Greater Element I – Step-by-Step Explanation

## ✅ Problem Statement

Given two arrays `nums1` and `nums2` where `nums1` is a subset of `nums2`, return an array of the next greater element for each element in `nums1` in `nums2`.

The next greater element for an element `x` in `nums2` is the first greater element to the right of `x`. If it doesn't exist, return -1.

---

## 🔍 Brute Force Approach (Nested Loops)

```javascript
function nextGreaterElement(nums1, nums2) {
    let result = [];

    for (let i = 0; i < nums1.length; i++) {
        let found = false;
        let nextGreater = -1;

        for (let j = 0; j < nums2.length; j++) {
            if (nums2[j] === nums1[i]) {
                found = true;
            } else if (found && nums2[j] > nums1[i]) {
                nextGreater = nums2[j];
                break;
            }
        }

        result.push(nextGreater);
    }

    return result;
}
```

### ⏱ Time Complexity:
- O(n * m), where `n` is length of `nums1` and `m` is length of `nums2`.
- For every element in `nums1`, we search through `nums2`.

### 🧠 Space Complexity:
- O(1) auxiliary space (excluding result array).

---

## ⚡ Optimized Approach using Stack

```javascript
function nextGreaterElement(nums1, nums2) {
    let nextGreaterMap = {};
    let stack = [];

    for (let i = nums2.length - 1; i >= 0; i--) {
        let num = nums2[i];

        while (stack.length > 0 && stack[stack.length - 1] <= num) {
            stack.pop();
        }

        nextGreaterMap[num] = stack.length === 0 ? -1 : stack[stack.length - 1];
        stack.push(num);
    }

    let result = [];
    for (let i = 0; i < nums1.length; i++) {
        result.push(nextGreaterMap[nums1[i]]);
    }

    return result;
}
```

### ⏱ Time Complexity:
- O(n + m), where `n` is length of `nums2`, and `m` is length of `nums1`.
- Each element is pushed and popped at most once from the stack.

### 🧠 Space Complexity:
- O(n) for the stack and the hash map.

---

## ❗ Why We Can't Change the Order of These Two Lines

```javascript
while (stack.length > 0 && stack[stack.length - 1] <= num) {
    stack.pop();
}
nextGreaterMap[num] = stack.length === 0 ? -1 : stack[stack.length - 1];
```

> These two lines must **not be reordered**. Why?
- If we assign `nextGreaterMap[num]` before popping from the stack, we may incorrectly assign a smaller or equal value as the "next greater" element.
- We must **clean the stack first**, ensuring only truly greater elements remain.
- Only then, we decide the `nextGreater` value from the top of the stack.

### 🚫 Incorrect Order Would Be:

```javascript
nextGreaterMap[num] = stack.length === 0 ? -1 : stack[stack.length - 1];
while (stack.length > 0 && stack[stack.length - 1] <= num) {
    stack.pop();
}
```

> This would result in assigning a wrong "next greater" before removing invalid elements.

---

## ✅ Summary

- Use the brute force approach to understand the basics.
- Use the stack-based approach to reduce time complexity.
- Always process the stack cleanup **before** assigning values from it.


Next Greater Element

For each element in the array, find the next element to the right which is greater than the current element. If none exists, return -1.

Next Smaller Element

For each element, find the next element to the right which is smaller than it. If none exists, return -1.

Previous Greater Element

For each element, find the closest element to the left which is greater than it. If none exists, return -1.

Previous Smaller Element

For each element, find the closest element to the left which is smaller than it. If none exists, return -1.
