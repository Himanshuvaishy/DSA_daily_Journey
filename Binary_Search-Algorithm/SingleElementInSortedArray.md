
# 🧠 Single Element in a Sorted Array – Solutions & Explanations

Given a **sorted array** where every element appears **exactly twice** except one element which appears only **once**, find that single element in **O(log n)** time (preferred).

---

## ✅ Example:

```
Input:  [1,1,2,2,3,3,4,8,8]
Output: 4
```

---

## ✅ Approach 1: Linear Scan

### 🔸 Intuition:

Since the array is sorted and elements appear in pairs, we can simply check elements in pairs using a loop.

### ✅ Code:

```js
function singleNonDuplicate(nums) {
    for (let i = 0; i < nums.length - 1; i += 2) {
        if (nums[i] !== nums[i + 1]) {
            return nums[i];
        }
    }
    return nums[nums.length - 1];
}
```

### ⏱ Time: O(n)  
### 📦 Space: O(1)

---

## ✅ Approach 2: Using Hashmap

### 🔸 Intuition:

Count how many times each number appears. The one with count `1` is your answer.

### ✅ Code:

```js
function singleNonDuplicate(nums) {
    const map = new Map();
    for (let num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }
    for (let [key, value] of map.entries()) {
        if (value === 1) return key;
    }
}
```

### ⏱ Time: O(n)  
### 📦 Space: O(n)

---

## ✅ Approach 3: Binary Search (Optimized)

### 🔸 Intuition:

- Before the single element: every first element of the pair is at **even** index.
- After the single element: the first of the pair appears at **odd** index.

Use this pattern to decide whether to move `left` or `right`.

### ✅ Code:

```js
function singleNonDuplicate(nums) {
    let left = 0, right = nums.length - 1;
    
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (mid % 2 === 1) mid--; // ensure mid is even

        if (nums[mid] === nums[mid + 1]) {
            // valid pair, move right
            left = mid + 2;
        } else {
            // pair broken, move left
            right = mid;
        }
    }
    return nums[left];
}
```

### 🧠 Why mid should be even?
Because we check mid with mid+1. So mid should be at the start of a pair.

### ⏱ Time: O(log n)  
### 📦 Space: O(1)

---

## 🔁 Visual Example

```
Index:    0  1  2  3  4  5  6  7  8
Array:   [1, 1, 2, 2, 3, 4, 4, 5, 5]
                          ↑ Single element is 3
```

### Step-by-step:
- left = 0, right = 8 → mid = 4 (even)
- nums[4] = 3, nums[5] = 4 → not equal → go left → right = mid
- left = 0, right = 4 → mid = 2 → nums[2] = 2 = nums[3] → move right
- left = 4, right = 4 → done! nums[4] = 3

---

## ✅ Summary:

| Approach        | Time     | Space    | Best For             |
|----------------|----------|----------|-----------------------|
| Linear          | O(n)     | O(1)     | Quick and simple      |
| HashMap         | O(n)     | O(n)     | When unsorted allowed |
| Binary Search   | O(log n) | O(1)     | Optimal & preferred   |

---

Feel free to explore each version and understand the pattern of indexes. Binary Search saves time significantly in large arrays.
