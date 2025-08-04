# 📘 Singly Linked List – Core Operations with Explanations

This document explains how to perform basic operations on a **Singly Linked List** in JavaScript, starting from an empty list (`size = 0`). Each operation includes detailed explanation and behavior of the `size` variable.

---

## 📌 Node Structure

```js
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
```

## 🧱 MyLinkedList Class Setup

```js
class MyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
}
```

---

## ➕ Add at Head

```js
MyLinkedList.prototype.addAtHead = function(val) {
  const newNode = new Node(val);
  newNode.next = this.head;
  this.head = newNode;
  this.size++;
};
```

✅ **Explanation**:  
- Insert node before current head.
- Update head pointer.
- Increase size.

---

## ➕ Add at Tail

```js
MyLinkedList.prototype.addAtTail = function(val) {
  const newNode = new Node(val);
  if (!this.head) {
    this.head = newNode;
  } else {
    let curr = this.head;
    while (curr.next) {
      curr = curr.next;
    }
    curr.next = newNode;
  }
  this.size++;
};
```

✅ **Explanation**:  
- Traverse to the last node.
- Insert new node after it.
- Increase size.

---

## ➕ Add at Index

```js
MyLinkedList.prototype.addAtIndex = function(index, val) {
  if (index < 0 || index > this.size) return;
  if (index === 0) return this.addAtHead(val);
  if (index === this.size) return this.addAtTail(val);
  
  const newNode = new Node(val);
  let curr = this.head;
  for (let i = 0; i < index - 1; i++) {
    curr = curr.next;
  }
  newNode.next = curr.next;
  curr.next = newNode;
  this.size++;
};
```

✅ **Why is `index === size` allowed?**  
Because it means inserting **at the end (tail)**.  
For a list with `size = 3`, valid insertion indices are: `0, 1, 2, 3`.

❌ **Why is `index > size` not allowed?**  
There's no node at that position to attach the new node to.

📌 **Visualization for `size = 3`**:

| Index | Where it inserts             |
|-------|------------------------------|
| 0     | Before first node (head)     |
| 1     | Between 1st and 2nd node     |
| 2     | Between 2nd and 3rd node     |
| 3     | After the last node (tail)   |

🧠 Total valid positions for insertion: `size + 1`.

---

## 🔍 Get Value at Index

```js
MyLinkedList.prototype.get = function(index) {
  if (index < 0 || index >= this.size) return -1;
  let curr = this.head;
  for (let i = 0; i < index; i++) {
    curr = curr.next;
  }
  return curr.val;
};
```

✅ **Explanation**:
- Traverse to the `index`-th node.
- Return the node’s value.

❗ **Only indices from `0` to `size - 1` are valid.**
- `get(size)` is invalid because it points beyond the current list.

---

## 📊 Summary

| Operation         | Valid Index Range     |
|------------------|-----------------------|
| `addAtIndex(i)`  | `0` to `size`         |
| `get(i)`         | `0` to `size - 1`     |
| `deleteAtIndex(i)`| `0` to `size - 1`     |

---

✅ This file includes explanations and visualizations for each major operation. Ideal for beginners learning how singly linked lists work in JavaScript.