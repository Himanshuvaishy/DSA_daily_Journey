# 🧠 Min Stack Problem – Two Approaches with Detailed Explanation

## 🧩 Problem Statement:
Design a stack that supports:
- `push(x)`
- `pop()`
- `top()`
- `getMin()` → Retrieve the minimum element in constant time **O(1)**.

---

## ✅ Approach 1: Semi-Optimized Using Extra Stack (Only New Minimums)

### 💡 Idea:
We use two stacks:
- `stack`: for normal push/pop
- `minStack`: only stores new minimums encountered

### 🔧 Code:
```javascript
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val) {
    this.stack.push(val);
    if (
      this.minStack.length === 0 ||
      val <= this.getMin()
    ) {
      this.minStack.push(val);
    }
  }

  pop() {
    const popped = this.stack.pop();
    if (popped === this.getMin()) {
      this.minStack.pop();
    }
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}
```

---

### 🧪 Dry Run:

Input: `push(3), push(5), push(2), push(1), pop(), getMin()`

| Operation | Stack         | MinStack      | Notes                          |
|----------|---------------|---------------|--------------------------------|
| push(3)  | [3]           | [3]           | First min                      |
| push(5)  | [3, 5]        | [3]           | 5 > 3 → not pushed to minStack |
| push(2)  | [3, 5, 2]     | [3, 2]        | 2 < 3 → pushed                 |
| push(1)  | [3, 5, 2, 1]  | [3, 2, 1]     | 1 < 2 → pushed                 |
| pop()    | [3, 5, 2]     | [3, 2]        | 1 was min → popped             |
| getMin() | → returns 2   | [3, 2]        | Current min is 2              |

---

### 📊 Time & Space Complexity:
- `push`, `pop`, `top`, `getMin`: **O(1)**
- Extra space only for new minimums → space efficient

---

## 🚀 Approach 2: Fully Optimized (Mirror Min Stack)

### 💡 Idea:
Push a value to both stacks:
- `stack`: for values
- `minStack`: min of current value and top of minStack  
Always keep both stacks of same length.

### 🔧 Code:
```javascript
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val) {
    this.stack.push(val);
    const newMin = this.minStack.length === 0
      ? val
      : Math.min(val, this.getMin());
    this.minStack.push(newMin);
  }

  pop() {
    this.stack.pop();
    this.minStack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}
```

---

### 🧪 Dry Run:

Input: `push(3), push(5), push(2), push(1), pop(), getMin()`

| Operation | Stack         | MinStack      | Notes                         |
|----------|---------------|---------------|-------------------------------|
| push(3)  | [3]           | [3]           | First min                     |
| push(5)  | [3, 5]        | [3, 3]        | min(5, 3) → 3                 |
| push(2)  | [3, 5, 2]     | [3, 3, 2]     | min(2, 3) → 2                 |
| push(1)  | [3, 5, 2, 1]  | [3, 3, 2, 1]  | min(1, 2) → 1                 |
| pop()    | [3, 5, 2]     | [3, 3, 2]     | pop from both                 |
| getMin() | → returns 2   | [3, 3, 2]     | Top of minStack is 2         |

---

### 📊 Time & Space Complexity:
- `push`, `pop`, `top`, `getMin`: **O(1)**
- Extra space for each value (mirror of stack)

---

## 🔍 Comparison Summary

| Feature                     | Semi-Optimized           | Fully Optimized               |
|----------------------------|---------------------------|-------------------------------|
| Stack length == MinStack?  | ❌ No                      | ✅ Yes                        |
| MinStack stores redundant? | ❌ No (only new mins)      | ✅ Yes (always a value)       |
| Pop condition needed?      | ✅ Yes (check if min)      | ❌ No (always pop both)       |
| Simplicity in `getMin()`   | ✅ O(1)                    | ✅ O(1)                        |
| Simplicity in `push/pop()` | ❌ Conditional logic       | ✅ Cleaner, no if checks       |

---

## 🏁 Conclusion:
Both approaches work in **O(1)** time.  
- Use **Approach 1** if memory is a concern.  
- Use **Approach 2** for cleaner logic and consistent stack sizes.