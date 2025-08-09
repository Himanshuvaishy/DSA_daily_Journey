
# 🪣 Container With Most Water

This problem is a classic two-pointer problem from the array category.

## 🧩 Problem Statement

Given `n` non-negative integers `height[0]`, `height[1]`, ..., `height[n-1]` where each represents a point at coordinate `(i, height[i])`, find two lines that, together with the x-axis, form a container that holds the most water.

---

## ❌ Brute Force Approach

### 🧠 Logic

- Try every possible pair of lines `(i, j)` where `i < j`
- Calculate area: `min(height[i], height[j]) * (j - i)`
- Track the maximum area

### 🕒 Time Complexity

- `O(n^2)` — Too slow for large arrays

### ✅ Code

```js
var maxArea = function(height) {
    let max = 0;
    for (let i = 0; i < height.length; i++) {
        for (let j = i + 1; j < height.length; j++) {
            let area = Math.min(height[i], height[j]) * (j - i);
            max = Math.max(max, area);
        }
    }
    return max;
};
```

---

## ✅ Optimized Two Pointer Approach

### 🧠 Intuition

- Start with two pointers: one at start and one at end of the array
- At each step:
  - Calculate the area between the two lines
  - Move the **shorter** line inward to try and find a taller line (might improve area)
- Why not move the taller line? Because the height is still limited by the shorter one, and width decreases

### 🕒 Time Complexity

- `O(n)` — Much faster

### ✅ Code

```js
var maxArea = function(height) {
    let max = 0;
    let i = 0;
    let j = height.length - 1;

    while (i < j) {
        const area = Math.min(height[i], height[j]) * (j - i);
        max = Math.max(max, area);

        if (height[i] < height[j]) {
            i++;
        } else {
            j--;
        }
    }

    return max;
};
```

---

## 🔁 Summary

- Brute Force: Try all pairs — slow (`O(n^2)`)
- Two Pointers: Shrink from the shorter side — fast (`O(n)`)
- Key Idea: Water is limited by the **shorter line** × **distance between lines**

Happy Learning 🚀

❓ Can we use a for loop in place of while (i < j)?
Yes... technically, we can.

But in this case, it’s not ideal. Here's why:

🤔 Why while (i < j) is preferred:
In the two-pointer approach:

i and j are both changing based on a condition

Sometimes you increment i, sometimes you decrement j, but never both

So a while loop gives you full control over pointer movement

🛑 Problem with using a for loop:
A for loop is structured like this:

js
Copy
Edit
for (let i = 0; i < j; i++) {
    // ...
}
But this assumes:

i increases every time, which violates our strategy

You don’t get to update i and j independently inside the loop cleanly

It becomes messy or buggy (like in your earlier attempt)

✅ Summary:
Loop Type	Use When	Suitable Here?
for	One pointer, simple steps (i++)	❌ No
while	Multiple pointers, custom movement	✅ Yes

🧪 Tip:
If both pointers move based on conditions → use while.
If only one index moves in a simple pattern → use for.


