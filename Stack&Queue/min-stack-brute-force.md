# 🧮 Min Stack - Brute Force Approach (No Indexing Used)

## ✅ Problem:
Design a stack that supports `push`, `pop`, `top`, and retrieving the minimum element in constant or optimal time.

---

## 💡 Brute-Force Approach (Without Indexing)

This approach uses **only valid stack operations** (`push`, `pop`, `peek/top`) — no random access like `stack[i]` is allowed.

### 🔧 Key Idea:
- Use an **extra temporary stack**.
- **Pop all elements**, find the minimum while storing popped elements in the temp stack.
- Then **push back** all elements to restore the original stack.
- This ensures stack behavior is respected (LIFO).

---

## ✅ JavaScript Implementation

```
class MinStack {
  constructor() {
    this.stack = [];
  }

  // Push element onto the stack
  push(x) {
    this.stack.push(x);
  }

  // Remove the top element
  pop() {
    return this.stack.pop();
  }

  // Peek the top element
  top() {
    return this.stack[this.stack.length - 1];
  }

  // Get the minimum element using brute-force (only pop/push/peek allowed)
  getMin() {
    let tempStack = [];
    let min = Infinity;

    // Pop elements and find minimum
    while (this.stack.length) {
      let top = this.stack.pop();
      min = Math.min(min, top);
      tempStack.push(top);
    }

    // Push elements back into the main stack
    while (tempStack.length) {
      this.stack.push(tempStack.pop());
    }

    return min;
  }
}
```

---

## 🧪 Example Usage

```
const minStack = new MinStack();

minStack.push(5);
minStack.push(3);
minStack.push(7);
minStack.push(2);

console.log(minStack.getMin()); // 2
minStack.pop();                 // removes 2
console.log(minStack.getMin()); // 3
console.log(minStack.top());    // 7
```

---

## ⏱️ Time & Space Complexity

| Operation | Time Complexity | Space Complexity |
|-----------|------------------|------------------|
| push      | O(1)             | O(1)             |
| pop       | O(1)             | O(1)             |
| top       | O(1)             | O(1)             |
| getMin    | O(n)             | O(n) (extra stack) |

---

## 🔁 Summary
This brute-force solution **respects the stack structure** and uses a temporary stack to find the minimum without violating LIFO rules.