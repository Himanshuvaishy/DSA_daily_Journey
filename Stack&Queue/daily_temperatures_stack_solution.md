# Daily Temperatures Problem - Optimized Stack-Based Solution

## ✅ Problem Statement

Given a list of daily temperatures, return a list such that, for each day, tells you how many days you would have to wait until a warmer temperature. If there is no future day for which this is possible, put `0` instead.

---

## ✅ Optimized Stack-Based Solution (JavaScript)

```javascript
var dailyTemperatures = function (arr) {
    let stack = [];                         // Stack to store indices
    let n = arr.length;
    let ans = Array(n).fill(0);             // Pre-fill answer with 0 for all days

    stack.push(n - 1);                      // Push the last day's index

    for (let i = n - 2; i >= 0; i--) {      // Traverse backwards
        while (stack.length) {
            let top = stack[stack.length - 1];

            if (arr[i] >= arr[top]) {       // If current temp is >= temp at stack top
                stack.pop();                // Pop because it's not a warmer day
            } else {
                ans[i] = top - i;           // Found the next warmer day
                break;
            }
        }

        stack.push(i);                      // Push current day's index
    }

    return ans;
};
```

---

## 🔍 Step-by-Step Explanation

### Input
```js
arr = [73, 74, 75, 71, 69, 72, 76, 73]
```

- We process from the end of the array, moving backwards.
- We use a stack to keep track of indices of temperatures in decreasing order.
- For each temperature, we pop all smaller or equal values from the stack.
- The first higher value found on top of the stack gives us the number of days to wait.

### Dry Run for Example `[73, 74, 75, 71, 69, 72, 76, 73]`

| Index | Temp | Stack State     | Action Taken                              | ans[]        |
|-------|------|------------------|-------------------------------------------|--------------|
| 7     | 73   | []               | Push index 7                               | [ , , , , , , , 0] |
| 6     | 76   | [7]              | 76 > 73 → Pop(7), Push(6)                  | [ , , , , , , 0, 0] |
| 5     | 72   | [6]              | 72 < 76 → ans[5] = 6 - 5 = 1               | [ , , , , , 1, 0, 0] |
| 4     | 69   | [6, 5]           | 69 < 72 → ans[4] = 5 - 4 = 1               | [ , , , , 1, 1, 0, 0] |
| 3     | 71   | [6, 5, 4]        | Pop(4), 71 > 69 → ans[3] = 5 - 3 = 2       | [ , , , 2, 1, 1, 0, 0] |
| 2     | 75   | [6, 5, 3]        | 75 < 76 → ans[2] = 6 - 2 = 4               | [ , , 4, 2, 1, 1, 0, 0] |
| 1     | 74   | [6, 2]           | 74 < 75 → ans[1] = 2 - 1 = 1               | [ , 1, 4, 2, 1, 1, 0, 0] |
| 0     | 73   | [6, 2, 1]        | 73 < 74 → ans[0] = 1 - 0 = 1               | [1, 1, 4, 2, 1, 1, 0, 0] |

---

## ✅ Final Answer
```js
[1, 1, 4, 2, 1, 1, 0, 0]
```

---

## ✅ Time and Space Complexity

| Complexity     | Value                         |
|----------------|-------------------------------|
| Time           | O(n) → Each index is pushed and popped once |
| Space          | O(n) → Stack may hold up to `n` indices in worst case |


🔍 Time Complexity Analysis: O(n)
Although we use a for loop and a while loop, the algorithm remains linear because:

Each index is pushed to the stack only once.

Each index is popped from the stack at most once.

Therefore, the total number of stack operations (push + pop) is at most 2n, which is O(n).

💭 Intuition
For each day, we look for the next warmer day by checking the top of the stack.

If the current temperature is less than the temperature at the stack's top, we calculate the number of days and store it in the ans array.

If it’s greater than or equal, we pop from the stack until we find a warmer day or the stack becomes empty.

Once finished, we push the current index onto the stack.

🧠 Space Complexity: O(n)
ans[]: stores the answer → O(n)

stack[]: stores indices → O(n) in worst case

🔁 Comparison With Brute Force Approach
Approach	Time Complexity	Space Complexity	Description
Brute Force	O(n²)	O(n)	For each day, checks every next day
Stack-Based	O(n)	O(n)	Each element is pushed and popped at most once

✅ Final Thoughts
Even though the solution uses a nested loop structure (for with inner while), the number of total operations is still bounded by 2n. This is a classic example of amortized time complexity, and it’s what makes this solution optimal and efficient.

This is a great pattern to remember for problems involving:

"Next Greater Element"

"Previous Smaller Element"

Monotonic Stack

