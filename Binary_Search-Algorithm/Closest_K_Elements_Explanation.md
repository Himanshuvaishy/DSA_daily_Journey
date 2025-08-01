
# Closest K Elements – LeetCode Problem 658

## 🧠 Problem Statement:
Given a **sorted** array `arr`, two integers `k` and `x`, return the `k` closest integers to `x` in the array.

## ✅ Optimal Solution: Binary Search Approach (Passes All Test Cases)

```javascript
var findClosestElements = function(arr, k, x) {
    let l = 0;
    let r = arr.length - k;
    while (l < r) {
        let m = l + Math.floor((r - l) / 2);
        if ((arr[m + k] - x) < (x - arr[m])) {
            l = m + 1;
        } else {
            r = m;
        }
    }
    let ans = [];
    for (let i = l; i < l + k; i++) {
        ans.push(arr[i]);
    }
    return ans;
};
```

## 🔍 Dry Run: Input = [1, 2, 3, 4, 5], k = 4, x = 3

Binary search space is between index 0 and `arr.length - k`.  
We shift the window toward the side with elements closer to `x` using:
```js
if ((arr[m + k] - x) < (x - arr[m]))
```

This ensures **left bias** in case of a tie.

## ❌ Why Not Use `Math.abs()` in Comparison?

Using:
```js
if (Math.abs(x - arr[m]) > Math.abs(x - arr[m + k]))
```
**Fails in tie-breaker cases**.

### Example Case:
Input: `[1,1,1,10,10,10], k = 1, x = 9`  
With `Math.abs()`, you might wrongly pick `[1]` instead of `[10]`, because:
```js
Math.abs(9 - 1) = 8
Math.abs(9 - 10) = 1
```
But in some tie cases, `Math.abs()` hides direction and violates the rule of preferring **smaller values**.

## ✅ Why Direct Comparison Works?
```js
(arr[m + k] - x) < (x - arr[m])
```
Preserves direction:
- Left side distance: `(x - arr[m])`
- Right side distance: `(arr[m + k] - x)`

This way we **shift window correctly** and **prefer left elements** on tie.

## 🔄 Time Complexity:
- Binary Search: `O(log(n-k))`
- Collecting Result: `O(k)`  
**Overall:** `O(log(n-k) + k)`

---

## 🚫 Linear Search Approach (Inefficient & Fails Edge Cases)

```javascript
var findClosestElements = function(arr, k, x) {
    return arr.sort((a, b) => {
        const distA = Math.abs(a - x);
        const distB = Math.abs(b - x);
        if (distA === distB) return a - b;
        return distA - distB;
    }).slice(0, k).sort((a, b) => a - b);
};
```

### ❌ Why Avoid It?
- Time Complexity: `O(n log n)` due to sorting.
- Not efficient for large arrays.
- Can break sorting-based expectations of window selection.

---

## ✅ Recommendation:
Always use **binary search** on the window when array is sorted. It’s optimized and handles edge cases correctly.
