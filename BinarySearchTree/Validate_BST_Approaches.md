
# Validate Binary Search Tree (BST)

## Problem Statement
Given the root of a binary tree, determine if it is a valid **Binary Search Tree (BST)**.

### Definition of BST:
1. The left subtree of a node contains only nodes with keys **less than** the node's key.
2. The right subtree of a node contains only nodes with keys **greater than** the node's key.
3. Both the left and right subtrees must also be BSTs.

---

## Approach 1: Recursive (Using Min/Max Range)

### Idea:
- Pass down the valid range `(min, max)` for each node.
- Initially, the root can have any value `(-∞, +∞)`.
- For left child: valid range becomes `(min, node.val)`.
- For right child: valid range becomes `(node.val, max)`.

### Code (JavaScript):
```js
var isValidBST = function(root) {
    function helper(node, min, max) {
        if (!node) return true;

        if (node.val <= min || node.val >= max) return false;

        return helper(node.left, min, node.val) && helper(node.right, node.val, max);
    }

    return helper(root, -Infinity, Infinity);
};
```

### Complexity:
- **Time:** O(n), where `n` is number of nodes.
- **Space:** O(h), recursion stack (h = height of tree).

---

## Approach 2: Inorder Traversal (Recursive)

### Idea:
- Perform inorder traversal (Left → Root → Right).
- For a valid BST, inorder traversal should produce a **strictly increasing sequence**.
- Keep track of previous value, and check if current node is greater.

### Code (JavaScript):
```js
var isValidBST = function(root) {
    let prev = null;

    function inorder(node) {
        if (!node) return true;

        if (!inorder(node.left)) return false;

        if (prev !== null && node.val <= prev) return false;
        prev = node.val;

        return inorder(node.right);
    }

    return inorder(root);
};
```

### Complexity:
- **Time:** O(n)
- **Space:** O(h), recursion stack.

---

## Approach 3: Inorder Traversal (Iterative)

### Idea:
- Use a stack to simulate inorder traversal.
- Maintain `prev` value and ensure each new value is greater than the previous.

### Code (JavaScript):
```js
var isValidBST = function(root) {
    let stack = [];
    let prev = null;
    let curr = root;

    while (stack.length > 0 || curr !== null) {
        while (curr !== null) {
            stack.push(curr);
            curr = curr.left;
        }

        curr = stack.pop();
        if (prev !== null && curr.val <= prev) return false;
        prev = curr.val;

        curr = curr.right;
    }

    return true;
};
```

### Complexity:
- **Time:** O(n)
- **Space:** O(h), stack usage.

---

## Approach 4: Brute Force (Check Subtree)

### Idea:
- For each node:
  - Ensure all values in the left subtree are smaller.
  - Ensure all values in the right subtree are larger.
- Inefficient but helps in understanding.

### Code (JavaScript):
```js
var isValidBST = function(root) {
    function isSmaller(node, val) {
        if (!node) return true;
        if (node.val >= val) return false;
        return isSmaller(node.left, val) && isSmaller(node.right, val);
    }

    function isGreater(node, val) {
        if (!node) return true;
        if (node.val <= val) return false;
        return isGreater(node.left, val) && isGreater(node.right, val);
    }

    function validate(node) {
        if (!node) return true;
        if (!isSmaller(node.left, node.val) || !isGreater(node.right, node.val)) return false;
        return validate(node.left) && validate(node.right);
    }

    return validate(root);
};
```

### Complexity:
- **Time:** O(n^2) in worst case.
- **Space:** O(h).

---

## Conclusion
- **Best Approach:** Recursive Min/Max (Approach 1) or Inorder Traversal (Approach 2/3).
- Both run in **O(n) time** and **O(h) space**.
- Brute force is only for learning, not efficient.

---
