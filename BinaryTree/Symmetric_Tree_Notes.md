
# 📘 Symmetric Tree (Recursive Approach)

---

## 🔹 Problem Statement  
Given the root of a binary tree, check whether it is a **mirror of itself** (i.e., symmetric around its center).

---

## 🔹 Intuition  
A tree is symmetric if **left subtree** is a mirror reflection of the **right subtree**.

So at every step:
- Compare node values → must be equal.  
- Compare:  
  - `left.left` with `right.right`  
  - `left.right` with `right.left`  

This naturally leads to **recursion**.

---

## 🔹 Recursive Approach  

### Steps
1. If both nodes are `null` → symmetric (`true`).
2. If only one is `null` → not symmetric (`false`).
3. If values don’t match → not symmetric (`false`).
4. Recursively check:
   - `isMirror(t1.left, t2.right)`  
   - `isMirror(t1.right, t2.left)`

---

## 🔹 JavaScript Code

```javascript
var isSymmetric = function(root) {
    if (!root) return true;

    function isMirror(t1, t2) {
        if (!t1 && !t2) return true;   // both null → symmetric
        if (!t1 || !t2) return false;  // one null → not symmetric
        return (t1.val === t2.val) &&
               isMirror(t1.left, t2.right) &&
               isMirror(t1.right, t2.left);
    }

    return isMirror(root.left, root.right);
};
```

---

## 🔹 Dry Run Example 1 (Symmetric Tree)

Tree:
```
        1
       /       2   2
     / \ /     3  4 4  3
```

### Call Stack Trace

```
Push isSymmetric(root)
 Push isMirror(2, 2)
   Push isMirror(3, 3)
     Push isMirror(null, null) → Pop true
     Push isMirror(null, null) → Pop true
   Pop isMirror(3, 3) = true
   Push isMirror(4, 4)
     Push isMirror(null, null) → Pop true
     Push isMirror(null, null) → Pop true
   Pop isMirror(4, 4) = true
 Pop isMirror(2, 2) = true
Pop isSymmetric(root) = true
```

✅ Final Answer = **true** (Tree is symmetric)

---

## 🔹 Dry Run Example 2 (Not Symmetric Tree)

Tree:
```
        1
       /       2   2
       \            3    3
```

### Call Stack Trace

```
Push isSymmetric(root)
 Push isMirror(2, 2)
   Push isMirror(null, 3)
   Pop  isMirror(null, 3) = false
 Pop isMirror(2, 2) = false
Pop isSymmetric(root) = false
```

❌ Final Answer = **false** (Tree is not symmetric)

---

## 🔹 Complexity Analysis  
- **Time Complexity:** `O(n)` → we visit each node once.  
- **Space Complexity:** `O(h)` → recursion stack (where `h` is height of tree).  
---

## 🔹 Iterative Approach (Using Queue)

### Intuition  
Instead of recursion, we can use a **queue** (BFS style) to check symmetry:
- Put the pair `(root.left, root.right)` into the queue.
- While queue is not empty:
  1. Pop a pair `(t1, t2)`.
  2. If both are `null` → continue.
  3. If one is `null` → return `false`.
  4. If values differ → return `false`.
  5. Push child pairs into queue in **mirror order**:
     - `(t1.left, t2.right)`
     - `(t1.right, t2.left)`

---

### 🔹 JavaScript Code

```javascript
var isSymmetric = function(root) {
    if (!root) return true;

    let queue = [];
    queue.push(root.left, root.right);

    while (queue.length > 0) {
        let t1 = queue.shift();
        let t2 = queue.shift();

        if (!t1 && !t2) continue;
        if (!t1 || !t2) return false;
        if (t1.val !== t2.val) return false;

        queue.push(t1.left, t2.right);
        queue.push(t1.right, t2.left);
    }

    return true;
};
🔹 Dry Run Example (Symmetric Tree)

Tree:

        1
       / \
      2   2
     / \ / \
    3  4 4  3


Queue trace:

Start: [(2, 2)]
Dequeue (2, 2) → values match
  Enqueue (3, 3), (4, 4)

Dequeue (3, 3) → values match
  Enqueue (null, null), (null, null)

Dequeue (4, 4) → values match
  Enqueue (null, null), (null, null)

Dequeue (null, null) → skip
Dequeue (null, null) → skip
Dequeue (null, null) → skip
Dequeue (null, null) → skip

Queue empty → return true


✅ Final Answer = true

🔹 Complexity Analysis

Time Complexity: O(n) → each node visited once.

Space Complexity: O(n) → queue can store all nodes at a level (worst case).
---
