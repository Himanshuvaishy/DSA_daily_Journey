# 📚 Stack and Queue – Summary

Today, we learned and understood two important linear data structures: **Stack** and **Queue**.

---

## 📦 Stack (LIFO - Last In First Out)

### ✅ Characteristics:
- Only one end is accessible (top).
- Operations happen at the top.

### ✅ Common Operations:
| Operation | Description             | Time Complexity |
|-----------|-------------------------|------------------|
| `push()`  | Insert at top           | O(1)             |
| `pop()`   | Remove from top         | O(1)             |
| `peek()`  | View top element        | O(1)             |
| `isEmpty()`| Check if stack is empty| O(1)             |

### ✅ Real-World Examples:
- Undo feature in text editors
- Call stack in recursion
- Balancing parentheses
- Browser back button

---

## 🚦 Queue (FIFO - First In First Out)

### ✅ Characteristics:
- Insert at rear (enqueue)
- Remove from front (dequeue)

### ✅ Common Operations:
| Operation     | Description              | Time Complexity |
|---------------|--------------------------|------------------|
| `enqueue()`   | Insert at rear           | O(1)             |
| `dequeue()`   | Remove from front        | O(1)             |
| `peek()`      | View front element       | O(1)             |
| `isEmpty()`   | Check if queue is empty  | O(1)             |

### ✅ Real-World Examples:
- Print queue
- Task scheduler
- Order processing
- BFS (Breadth-First Search) in graphs

---

## 🧠 Key Differences

| Feature     | Stack              | Queue               |
|-------------|--------------------|---------------------|
| Access      | Only top           | Front (dequeue), Rear (enqueue) |
| Order       | LIFO               | FIFO                |
| Use Case    | Backtracking       | Processing items in order |

---

✅ We also discussed how to:
- Implement stack and queue using **JavaScript arrays**
- Understand their behavior via **real-world analogies**
- Compare with arrays: Arrays are general-purpose, stack/queue enforce specific rules.


✅ Implement Stack and Queue using JavaScript arrays
You can use push/pop for stack and push/shift for queue.

js
Copy
Edit
// Stack
let stack = [];
stack.push(10);
stack.pop();

// Queue
let queue = [];
queue.push(10);
queue.shift();
✅ Understand their behavior using real-world analogies

Stack = plate pile – you always take the top one first.

Queue = line at a ticket counter – first person gets served first.

✅ Compare with arrays

Arrays are general-purpose and allow random access and many types of operations.

Stack/Queue enforce specific rules:

Stack: LIFO (Last In First Out)

Queue: FIFO (First In First Out)

These structures help write cleaner, more predictable code for specific scenarios.

