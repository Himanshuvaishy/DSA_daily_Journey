# 🧠 Stack Using One Queue – Two Approaches (Push-Rotate vs Pop-Rotate)

In this guide, we compare **two ways to implement a Stack using only one Queue**, both achieving LIFO behavior by rotating the queue, but at **different stages**.

---

## 📦 Stack Recap
- **Stack (LIFO)**: Last In, First Out
- **Queue (FIFO)**: First In, First Out

---

## ✅ Approach 1 – Rotate During `Push()` (Push-Rotated)

### 🔧 Thought Process:
- After every `push(x)`, rotate the queue so the new element comes to the front.
- This way, `pop()` and `top()` are fast (just return front).

### 🔢 Code:
```js
var MyStack = function () {
    this.q = [];
};

MyStack.prototype.push = function (x) {
    this.q.push(x);
    for (let i = 0; i < this.q.length - 1; i++) {
        this.q.push(this.q.shift());
    }
};

MyStack.prototype.pop = function () {
    return this.q.shift();
};

MyStack.prototype.top = function () {
    return this.q[0];
};

MyStack.prototype.empty = function () {
    return this.q.length === 0;
};
```

### ⏱️ Time Complexity:

| Operation | Time Complexity |
|-----------|------------------|
| `push()`  | O(n)              |
| `pop()`   | O(1)              |
| `top()`   | O(1)              |

---

## ✅ Approach 2 – Rotate During `pop()`/`top()` (Pop-Rotated – Your Version)

### 🔧 Thought Process:
- Push normally.
- When `pop()` or `top()` is called, rotate the queue to bring the last inserted element to the front.

### 🔢 Code:
```js
var MyStack = function () {
    this.q = [];
};

MyStack.prototype.push = function (x) {
    this.q.push(x);
};

MyStack.prototype.pop = function () {
    let n = this.q.length;
    for (let i = 0; i < n - 1; i++) {
        this.q.push(this.q.shift());
    }
    return this.q.shift();
};

MyStack.prototype.top = function () {
    let n = this.q.length;
    for (let i = 0; i < n - 1; i++) {
        this.q.push(this.q.shift());
    }
    let front = this.q.shift();
    this.q.push(front);
    return front;
};

MyStack.prototype.empty = function () {
    return this.q.length === 0;
};
```

### ⏱️ Time Complexity:

| Operation | Time Complexity |
|-----------|------------------|
| `push()`  | O(1)              |
| `pop()`   | O(n)              |
| `top()`   | O(n)              |

---

## ⚖️ Comparison Table

| Feature     | Push-Rotate               | Pop-Rotate (Your Version)     |
|-------------|---------------------------|-------------------------------|
| **Push**    | Costly (O(n))             | Fast (O(1))                   |
| **Pop**     | Fast (O(1))               | Costly (O(n))                 |
| **Top**     | Fast (O(1))               | Costly (O(n))                 |
| **When Rotation Happens** | During `push()`        | During `pop()` and `top()`     |

---

## 🎯 When to Use What?

| Use Case                          | Preferred Approach   |
|----------------------------------|----------------------|
| Frequent `pop()` and `top()`     | **Push-Rotate**      |
| Frequent `push()` operations     | **Pop-Rotate**       |

---

## 📌 Summary
Both versions **simulate a stack using just one queue**, and differ in **where the cost is paid** — either during `push()` or during `pop()`/`top()`.

Choose the approach based on what operations your app runs most frequently.