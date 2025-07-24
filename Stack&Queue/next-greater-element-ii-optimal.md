
# 🧠 Next Greater Element II - Optimal Solution (Monotonic Stack + Circular Array)

## 🚀 Problem Statement

Given a **circular array** `nums`, return the **next greater number** for every element in the array.

The **next greater number** of a number `x` is the first **greater number** to its **traversal-right** in the array, which means:
- Traverse right from current position.
- If needed, **wrap around** (since it is circular).
- If no such number exists, return `-1`.

---

## ✅ Optimal Approach

### Code:

```javascript
var nextGreaterElements = function(arr) {
    let n = arr.length;
    let stack = [];
    let ans = Array(n).fill(-1);
    stack.push(arr[n-1]);

    for(let i=(2*n)-2; i >= 0; i--){
        while(stack.length){
            let top = stack[stack.length - 1];
            if(arr[i % n] < top){
                ans[i % n] = top;
                break;
            } else {
                stack.pop();
            }
        }
        stack.push(arr[i % n]);
    }
    return ans;
};
```

---

## 🔄 Handling the Circular Array

To handle the circular nature of the array:
- We **simulate two passes** over the array by iterating from `2n - 2` to `0` using modulo:

```js
for (let i = 2 * n - 2; i >= 0; i--) {
    let index = i % n;  // simulate wrap-around
}
```

This allows us to find the **next greater** even if it's **after wrapping** back to the beginning.

---

## 🧱 Monotonic Stack Explained

A **monotonic stack** is a stack that maintains a **monotonic (ordered)** structure:
- Either **increasing** or **decreasing** from bottom to top.

---

### 🔽 Monotonic Decreasing Stack (Used Here)

- Keeps elements in **decreasing order**.
- Top of stack is always the **largest**.
- Used to solve **Next Greater Element** problems.

#### 🛠 How It Works

1. Traverse from the **right** to the **left** (to maintain future elements in stack).
2. For each element:
   - Pop all elements from the stack **less than or equal** to it.
   - If stack is **not empty**, top is the **next greater element**.
   - Push current element to stack.

---

### 🔼 Monotonic Increasing Stack

- Keeps elements in **increasing order**.
- Top of stack is the **smallest**.
- Used in problems like **Next Smaller Element**.

---

## 🧠 Dry Run Example

```js
Input: [1, 2, 1]
```

### Step-by-step:

Extended length = 6 (simulate 2 rounds)

- i = 4 → arr[1] = 2 → stack = [1] → 2 > 1 → pop 1 → stack empty → push 2
- i = 3 → arr[0] = 1 → 1 < 2 → ans[0] = 2 → push 1
- i = 2 → arr[2] = 1 → 1 < 1 ❌ → pop 1 → 1 < 2 → ans[2] = 2
- ...

Final result: `[2, -1, 2]`

---

## 🕒 Time and Space Complexity

| Aspect             | Complexity         |
|--------------------|--------------------|
| Time Complexity    | **O(n)**           |
| Space Complexity   | **O(n)**           |

Because:
- Each element is **pushed and popped at most once** from the stack.
- We simulate **2n** iterations but only do **O(n)** work overall.

---

## ❓ Why We Don’t Need `Math.floor(n / 2)`

In the final return:
```js
return ans;
```

We're filling `ans` directly for `n` elements using `i % n`, so no slicing is needed.

But if you were doing:
```js
return ans.slice(0, n);
```

You **don't need to use `Math.floor(n/2)`** because:
- `n` is always an integer.
- Slicing handles that fine even if `n` is odd.

---

## 🏁 Summary

- We use a **monotonic decreasing stack** to efficiently find the next greater element.
- We **simulate circular behavior** by looping over the array twice with `i % n`.
- This approach gives us **O(n)** time complexity, which is optimal compared to the brute force **O(n²)**.
