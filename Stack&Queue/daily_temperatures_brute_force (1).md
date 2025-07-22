
# 🧠 Brute Force Approach for Daily Temperatures

## 🔸 Problem Statement
Given a list of daily temperatures `temperatures`, return a list such that, for each day in the input, tells you how many days you would have to wait until a warmer temperature. If there is no future day for which this is possible, put `0` instead.

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

## ✅ Brute Force Approach with `found` flag

```javascript
var dailyTemperatures = function(temperatures) {
    let temp = [];
    let n = temperatures.length;

    for (let i = 0; i < n; i++) {
        let count = 0;
        let found = false;

        for (let j = i + 1; j < n; j++) {
            count++;

            if (temperatures[j] > temperatures[i]) {
                temp[i] = count;
                found = true;
                break;
            }
        }

        if (!found) {
            temp[i] = 0;
        }
    }

    return temp;
};
```

### 🧪 Time Complexity:
- Worst Case: **O(n²)** — nested loop for each element.
- Space Complexity: **O(n)** — result array of size `n`.

---

## ✅ Optimized Brute Force Without `found`

Since we initialize the answer array with `0`, we **don't need the `found` flag**.

```javascript
var dailyTemperatures = function(temperatures) {
    let n = temperatures.length;
    let answer = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        let count = 0;

        for (let j = i + 1; j < n; j++) {
            count++;
            if (temperatures[j] > temperatures[i]) {
                answer[i] = count;
                break;
            }
        }
    }

    return answer;
};
```

### ✅ Why we don't need `found` here?
- `answer[i]` is already `0` by default.
- If we don't find a warmer temperature, we **just do nothing**.
- If we find a warmer temperature, we **update it with `count`**.

### 🧪 Time Complexity:
- Worst Case: **O(n²)** — still a brute force approach.
- Space Complexity: **O(n)** — for the `answer` array.

---

## ⚠️ Why does it give TLE?
When the input array is very large (e.g., 10⁵ elements), the nested loop results in **10⁵ × 10⁵ = 10¹⁰ operations**, which is too slow for most online judges.

---

Next step: Let's move to the **Optimal Stack-Based Solution** to bring the time complexity to **O(n)**.
