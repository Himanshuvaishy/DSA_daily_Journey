
# 3-Sum Problem

## Problem Statement
Given an integer array `nums`, return all **unique triplets** `[nums[i], nums[j], nums[k]]` such that:
- `i != j`, `i != k`, and `j != k`
- `nums[i] + nums[j] + nums[k] == 0`

The solution set must not contain duplicate triplets.

**Example:**
```
Input: nums = [-1, 0, 1, 2, -1, -4]
Output: [[-1, -1, 2], [-1, 0, 1]]
```

---

## Brute Force Approach

### Idea:
- Check all possible triplets `(i, j, k)` where `i < j < k`.
- If the sum is `0`, add it to a set (to avoid duplicates).
- Time Complexity: **O(n³)**
- Space Complexity: **O(n)** for storing results.

**Code:**
```javascript
var threeSumBruteForce = function(nums) {
    let result = new Set();
    nums.sort((a, b) => a - b);

    for (let i = 0; i < nums.length - 2; i++) {
        for (let j = i + 1; j < nums.length - 1; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                if (nums[i] + nums[j] + nums[k] === 0) {
                    result.add(JSON.stringify([nums[i], nums[j], nums[k]]));
                }
            }
        }
    }

    return Array.from(result).map(JSON.parse);
};
```

---

## Optimized Approach (Two-Pointer)

### Idea:
1. **Sort the array**.
2. Fix one number `nums[i]`.
3. Use **two pointers** (`left`, `right`) to find pairs that sum to `-nums[i]`.
4. Skip duplicates for both the first and second numbers.

**Time Complexity:** O(n²)  
**Space Complexity:** O(1) (ignoring result storage)

**Code:**
```javascript
var threeSum = function(nums) {
    nums.sort((a, b) => a - b);
    let result = [];

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);

                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;

                left++;
                right--;
            }
            else if (sum < 0) left++;
            else right--;
        }
    }

    return result;
};
```

---

## Dry Run Example

**Input:**
```
[-1, 0, 1, 2, -1, -4]
```

**Step 1 — Sort the array:**
```
[-4, -1, -1, 0, 1, 2]
```

**Step 2 — Iterate:**

- **i = 0 (-4)**:  
  left = 1 (-1), right = 5 (2) → sum = -3 → left++  
  ... no triplets found.

- **i = 1 (-1)**:  
  left = 2 (-1), right = 5 (2) → sum = 0 ✅ triplet: [-1, -1, 2]  
  Skip duplicates: left = 3, right = 4 → sum = 0 ✅ triplet: [-1, 0, 1]

- **i = 2 (-1)**:  
  Skip because it's a duplicate of nums[1].

**Output:**
```
[[-1, -1, 2], [-1, 0, 1]]
```

---

## Key Points to Remember:
- Sorting is crucial for removing duplicates easily.
- Always skip duplicates for `i`, `left`, and `right`.
- Two-pointer reduces time complexity from O(n³) → O(n²).
