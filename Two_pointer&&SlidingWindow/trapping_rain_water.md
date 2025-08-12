# Trapping Rain Water

## Problem Statement
Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it is able to trap after raining.

**Example:**
```
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
```
---

## Intuition
The water trapped on top of a bar depends on the **minimum of the tallest bar to its left and the tallest bar to its right**, minus the height of the bar itself.

**Formula:**
```
water[i] = min(max_left[i], max_right[i]) - height[i]
```

---

## 1️⃣ Brute Force Approach (O(n²))

### Logic
For each element:
1. Find the maximum height to the left.
2. Find the maximum height to the right.
3. Take the minimum of both and subtract the current height.
4. Add to total water.

### Code
```javascript
var trap = function(height) {
    let totalWater = 0;
    let n = height.length;

    for (let i = 0; i < n; i++) {
        let leftMax = 0, rightMax = 0;

        // Find left max
        for (let l = 0; l <= i; l++) {
            leftMax = Math.max(leftMax, height[l]);
        }

        // Find right max
        for (let r = i; r < n; r++) {
            rightMax = Math.max(rightMax, height[r]);
        }

        totalWater += Math.min(leftMax, rightMax) - height[i];
    }

    return totalWater;
};
```

---

## 2️⃣ Optimized Prefix/Suffix Approach (O(n) Time, O(n) Space)

### Logic
1. Precompute `leftMax[i]` for each index.
2. Precompute `rightMax[i]` for each index.
3. Water trapped at index `i` = `min(leftMax[i], rightMax[i]) - height[i]`.

### Code
```javascript
var trap = function(height) {
    let n = height.length;
    let leftMax = new Array(n);
    let rightMax = new Array(n);
    let totalWater = 0;

    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i-1], height[i]);
    }

    rightMax[n-1] = height[n-1];
    for (let i = n-2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i+1], height[i]);
    }

    for (let i = 0; i < n; i++) {
        totalWater += Math.min(leftMax[i], rightMax[i]) - height[i];
    }

    return totalWater;
};
```

---

## 3️⃣ Two Pointer Approach (O(n) Time, O(1) Space)

### Logic
- Use two pointers (`left` and `right`) starting from both ends.
- Track `leftMax` and `rightMax` while moving pointers inward.
- Move the pointer with the **smaller max** because the water trapped depends on the smaller boundary.

### Code
```javascript
var trap = function(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0, totalWater = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                totalWater += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                totalWater += rightMax - height[right];
            }
            right--;
        }
    }
    return totalWater;
};
```

---

## Dry Run Example (Two Pointer Approach)

**Example:**
```
height = [0,1,0,2,1,0,1,3,2,1,2,1]
```

**Step-by-step:**
| left | right | leftMax | rightMax | height[left] | height[right] | Water Added | Total |
|------|-------|---------|----------|--------------|---------------|-------------|-------|
| 0    | 11    | 0       | 0        | 0            | 1             | 0           | 0     |
| 1    | 11    | 1       | 0        | 1            | 1             | 0           | 0     |
| 2    | 11    | 1       | 1        | 0            | 1             | 1           | 1     |
| 3    | 11    | 2       | 1        | 2            | 1             | 0           | 1     |
| 3    | 10    | 2       | 2        | 2            | 2             | 0           | 1     |
| 3    | 9     | 2       | 2        | 2            | 1             | 1           | 2     |
| 3    | 8     | 2       | 2        | 2            | 2             | 0           | 2     |
| 3    | 7     | 2       | 3        | 2            | 3             | 0           | 2     |
| 4    | 7     | 2       | 3        | 1            | 3             | 1           | 3     |
| 5    | 7     | 2       | 3        | 0            | 3             | 2           | 5     |
| 6    | 7     | 2       | 3        | 1            | 3             | 1           | 6     |

Final **Total Water = 6**.

---

✅ **Key Takeaways:**
- Brute Force → Simple but slow (O(n²)).
- Prefix/Suffix Arrays → O(n) time but uses extra space.
- Two Pointers → Best option with O(n) time and O(1) space.

