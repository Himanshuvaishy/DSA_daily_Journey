
# Daily Temperatures - Brute Force Approach

## 🧠 Problem Description

Given a list of daily temperatures `temperatures`, return a list such that, for each day in the input, 
tells you how many days you would have to wait until a warmer temperature. 
If there is no future day for which this is possible, put `0` instead.

---

## ✅ Brute Force Code (Basic Version)

```javascript
var dailyTemperatures = function(temperatures) {
    let temp = [];
    let n = temperatures.length;

    for (let i = 0; i < n; i++) {
        let count = 0;
        let found = false;

        for (let j = i + 1; j < n; j++) {
            if (temperatures[j] > temperatures[i]) {
                count++;
                temp[i] = count;
                found = true;
                break;
            }
            count++;
        }

        if (!found) {
            temp[i] = 0;
        }
    }

    return temp;
};
```
var dailyTemperatures = function(temperatures) {
    let n = temperatures.length;
    let answer = new Array(n).fill(0);  // Default all to 0

    for (let i = 0; i < n; i++) {
        let count = 0;

        for (let j = i + 1; j < n; j++) {
            count++;  // Count days until warmer temperature
            if (temperatures[j] > temperatures[i]) {
                answer[i] = count;
                break;  // Stop once we find the warmer day
            }
        }
        // No need to set answer[i] = 0, it's already 0
    }

    return answer;
};

---

## 🧪 Dry Run

Input:
```javascript
temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
```

### Step-by-step Explanation:

| i | temperatures[i] | First Warmer Day | Count (Days to wait) |
|---|------------------|------------------|-----------------------|
| 0 | 73               | 74 (day 1)       | 1                     |
| 1 | 74               | 75 (day 2)       | 1                     |
| 2 | 75               | 76 (day 6)       | 4                     |
| 3 | 71               | 72 (day 5)       | 2                     |
| 4 | 69               | 72 (day 5)       | 1                     |
| 5 | 72               | 76 (day 6)       | 1                     |
| 6 | 76               | -                | 0                     |
| 7 | 73               | -                | 0                     |

Output:
```javascript
[1, 1, 4, 2, 1, 1, 0, 0]
```

---

## ❗ Why Time Limit Exceeded?

### Time Complexity:
- Outer loop runs `n` times
- Inner loop can run up to `n` times in worst case
- Total operations: **O(n^2)**

### Example:
If `n = 100000` → Possible operations = 10^10  
Most online judges allow about **10^7 to 10^8 operations max**, so this is too slow.

---

## ⚠️ Limitation

- This brute force approach works correctly for small inputs.
- It fails for large inputs due to inefficiency.
- We need a more optimized approach for big test cases.

---

## ⏭️ Next Step

We will now implement the optimal approach using a **Monotonic Stack** which reduces time complexity to **O(n)**.

