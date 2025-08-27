# Invert Binary Tree

The **Invert Binary Tree** problem is a classic binary tree problem that asks us to "mirror" the binary tree by swapping every node’s left and right children.

---

## Problem Statement

Given the `root` of a binary tree, invert the tree, and return its root.

---

## Example

**Input Tree:**  
```
     4
    / \
   2   7
  / \ / \
 1  3 6  9
```

**Output Tree:**  
```
     4
    / \
   7   2
  / \ / \
 9  6 3  1
```

---

## Recursive Approach

### Code
```javascript
var invertTree = function(root) {
    if (root === null) return null;
    
    // Swap left and right
    let temp = root.left;
    root.left = root.right;
    root.right = temp;

    // Recursive calls
    invertTree(root.left);
    invertTree(root.right);

    return root;
};
```

---

### Recursive Call Stack Trace (Example Input)
```
invertTree(4)
 ├─ swap(2,7)
 ├─ invertTree(7)
 │   ├─ swap(9,6)
 │   ├─ invertTree(9) → null
 │   └─ invertTree(6) → null
 └─ invertTree(2)
     ├─ swap(3,1)
     ├─ invertTree(3) → null
     └─ invertTree(1) → null
```

---

### Dry Run (Recursive)
1. Start at root (4), swap left (2) and right (7).
2. Go to left (7), swap children (9, 6).
3. Go to left (9), no children → return.
4. Go to right (6), no children → return.
5. Return to (7) → done.
6. Go to right (2), swap children (3,1).
7. Go to left (3), no children → return.
8. Go to right (1), no children → return.
9. Done → return root.

**Final Tree (mirrored):**
```
     4
    / \
   7   2
  / \ / \
 9  6 3  1
```

---

## Iterative Approach (Using Queue / BFS)

### Code
```javascript
var invertTree = function(root) {
    if (root === null) return null;

    let queue = [root];

    while (queue.length > 0) {
        let node = queue.shift();

        // Swap children
        let temp = node.left;
        node.left = node.right;
        node.right = temp;

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }

    return root;
};
```

---

### Dry Run (Iterative - BFS)
Initial queue = [4]

1. Dequeue 4 → swap(2,7), enqueue(7,2)
   Queue = [7,2]

2. Dequeue 7 → swap(9,6), enqueue(9,6)
   Queue = [2,9,6]

3. Dequeue 2 → swap(3,1), enqueue(3,1)
   Queue = [9,6,3,1]

4. Dequeue 9 → no children.
   Queue = [6,3,1]

5. Dequeue 6 → no children.
   Queue = [3,1]

6. Dequeue 3 → no children.
   Queue = [1]

7. Dequeue 1 → no children.
   Queue = []

**Final Tree:**
```
     4
    / \
   7   2
  / \ / \
 9  6 3  1
```

---

## Key Takeaways
- **Recursive** → natural approach, simpler to write, but uses call stack (O(h) space).
- **Iterative (BFS/DFS)** → avoids recursion, explicit queue/stack, better control on memory.

**Time Complexity:** O(n) (visit every node once)  
**Space Complexity:**  
- Recursive → O(h), where h = height of tree  
- Iterative → O(n) in worst case (queue holds all nodes in a level)
