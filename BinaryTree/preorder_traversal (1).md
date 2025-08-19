# Binary Tree Preorder Traversal in JavaScript

This document explains **Preorder Traversal** of a binary tree using:

1. **Recursive Approach**
2. **Iterative Approach (using stack)**

---

## 🌳 Preorder Traversal Rule
Order of visiting nodes:  
**Root → Left → Right**

Example Tree:
```
       1
      / \
     2   3
    / \
   4   5
```

Preorder Output: **1, 2, 4, 5, 3**

---

## 1. Recursive Approach

```javascript
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function preorderRecursive(root) {
  if (root === null) return [];
  
  let result = [];
  
  function traverse(node) {
    if (node === null) return;
    result.push(node.val);      // Root
    traverse(node.left);        // Left
    traverse(node.right);       // Right
  }
  
  traverse(root);
  return result;
}

// Example usage
let root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

console.log(preorderRecursive(root)); // [1, 2, 4, 5, 3]
```

### ✅ Time Complexity
- **O(n)** → Each node is visited once.  
- **O(h)** space (for recursion stack), where *h* = height of tree.

---

## 2. Iterative Approach (Using Stack)

```javascript
function preorderIterative(root) {
  if (root === null) return [];
  
  let stack = [root];
  let result = [];
  
  while (stack.length > 0) {
    let node = stack.pop();
    result.push(node.val);      // Root
    
    // ⚠️ Push right first so that left is processed first
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  
  return result;
}

// Example usage
console.log(preorderIterative(root)); // [1, 2, 4, 5, 3]
```

### ✅ Time Complexity
- **O(n)** → Each node is pushed and popped once.  
- **O(n)** space (stack may hold all nodes in skewed tree).

---

## ❓ Why do we push **Right Child First**?
In preorder, we must process **Root → Left → Right**.  
Since a **stack is LIFO (Last In, First Out)**:
- If we push **right child first**, then **left child** will be on top of stack.  
- This ensures the **left child is processed before the right child**, maintaining preorder order.

---

## 📌 Final Notes
- Recursive approach is simpler but uses function call stack.  
- Iterative approach avoids recursion but explicitly uses a stack.  
