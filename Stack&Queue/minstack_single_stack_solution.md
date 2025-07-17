# 🧠 MinStack Problem — Efficient Solution Using One Stack (Tuple Approach)

## ✅ Approach: Stack of `[val, minSoFar]` Pairs

Instead of maintaining two stacks, we store **both the value and the minimum-so-far** as a pair in a single stack. This ensures constant time access to the current minimum.

---

### ✅ JavaScript Code

```javascript
var MinStack = function() {
    this.s = [];
};

MinStack.prototype.push = function(val) {
    if (this.s.length === 0) {
        this.s.push([val, val]);
    } else {
        let minVal = Math.min(val, this.s[this.s.length - 1][1]);
        this.s.push([val, minVal]);
    }
};

MinStack.prototype.pop = function() {
    this.s.pop();
};

MinStack.prototype.top = function() {
    return this.s[this.s.length - 1][0];
};

MinStack.prototype.getMin = function() {
    return this.s[this.s.length - 1][1];
};
```

---

### ✅ Dry Run Example

```js
let st = new MinStack();

st.push(5);    // s = [[5, 5]]
st.push(2);    // s = [[5, 5], [2, 2]]
st.push(4);    // s = [[5, 5], [2, 2], [4, 2]]
st.getMin();   // → 2
st.pop();      // s = [[5, 5], [2, 2]]
st.getMin();   // → 2
st.pop();      // s = [[5, 5]]
st.getMin();   // → 5
```

---

### ✅ Time & Space Complexity

| Operation     | Time Complexity | Space Complexity |
|---------------|------------------|-------------------|
| `push()`      | O(1)             | O(n)              |
| `pop()`       | O(1)             | O(n)              |
| `top()`       | O(1)             | O(n)              |
| `getMin()`    | O(1)             | O(n)              |

---

### ✅ Summary

This is an elegant and memory-efficient approach to solve the MinStack problem in **constant time per operation** without the need for an auxiliary stack or encoding tricks.