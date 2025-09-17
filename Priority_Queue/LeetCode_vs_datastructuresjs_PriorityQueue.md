# 📎 Priority Queue in JavaScript (LeetCode vs datastructures-js)

## 1. `@datastructures-js/priority-queue` Package

This is an **NPM package** you can install locally in Node.js or TypeScript projects.

It provides ready-to-use classes:

- `PriorityQueue` (generic, customizable with comparator)
- `MinPriorityQueue` (lowest priority value served first)
- `MaxPriorityQueue` (highest priority value served first)

### ✨ Supported Methods
- `enqueue(value, priority)` → Insert an item with priority
- `dequeue()` → Remove and return element with highest/lowest priority
- `peek()` / `front()` → Look at first item without removing
- `isEmpty()` → Check if queue is empty
- `size()` → Get number of elements
- Custom comparator support in `PriorityQueue`

### 🔧 Example Usage

```js
const {
  PriorityQueue,
  MinPriorityQueue,
  MaxPriorityQueue
} = require('@datastructures-js/priority-queue');

// Min priority queue
const minPQ = new MinPriorityQueue();
minPQ.enqueue('taskA', 5);
minPQ.enqueue('taskB', 1);
console.log(minPQ.dequeue());  // taskB (priority 1)

// Max priority queue
const maxPQ = new MaxPriorityQueue();
maxPQ.enqueue('taskA', 5);
maxPQ.enqueue('taskB', 1);
console.log(maxPQ.dequeue());  // taskA (priority 5)

// Generic PQ with comparator
const pq = new PriorityQueue((a, b) => a.priority - b.priority);
```

---

## 2. ❌ Limitation on LeetCode

- LeetCode **does not allow external npm packages** like `@datastructures-js/priority-queue`.
- You cannot use `require` or `import` in their JS runtime.
- Therefore: you **must implement your own MinHeap / MaxHeap** class for priority queue problems.

---

## 3. ✅ What to Do for LeetCode

- Keep a **Heap / PriorityQueue template** ready in JS that implements:
  - `enqueue(value, priority)`
  - `dequeue()`
  - `peek()`
  - `isEmpty()`
  - `size()`

- Use that template in place of the npm package.

---

## 4. Summary

| Feature | `@datastructures-js` | LeetCode |
|---------|----------------------|----------|
| Built-in PQ | ✅ Yes (MinPQ, MaxPQ, PQ) | ❌ No |
| Methods | enqueue, dequeue, peek, size, isEmpty | Must implement manually |
| Custom comparator | ✅ Supported | ✅ (if you implement PQ) |
| Usability | Node.js, TS projects | Only self-written code |

---

👉 Conclusion: Use `@datastructures-js/priority-queue` in **your own projects**, but always keep a **custom heap template** for solving problems on **LeetCode**.
