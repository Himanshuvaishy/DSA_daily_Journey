### 📌 Problem Statement
---
```js
**Given the roots of two binary trees p and q, write a function to check if they are the same.
Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.**

✅ Recursive Approach
Idea

Compare the current nodes of both trees.

If both are null → return true (empty trees are same).

If only one is null → return false.

If values are different → return false.

Recursively check:

Left subtree of both trees.

Right subtree of both trees.

If both left and right subtrees are same → return true.

Code (Recursive)
var isSameTree = function(p, q) {
    if (!p && !q) return true; // both null
    if (!p || !q) return false; // one null
    if (p.val !== q.val) return false; // different values
    
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

📌 Call Stack Trace (Example)
Example Input:
p:       1          q:       1
        / \                  / \
       2   3                2   3

Trace:

isSameTree(1,1)
→ values match → check left and right.

isSameTree(2,2)
→ values match → check left and right.

isSameTree(null, null) → true

isSameTree(null, null) → true
→ return true.

isSameTree(3,3)
→ values match → check left and right.

isSameTree(null, null) → true

isSameTree(null, null) → true
→ return true.

Final result → true.

✅ Iterative Approach (BFS using Queue)
Idea

Use a queue to compare nodes pair by pair.

Push (p, q) into queue.

While queue is not empty:

Pop a pair (node1, node2).

If both null → continue.

If only one is null → return false.

If values differ → return false.

Push (node1.left, node2.left) and (node1.right, node2.right) into queue.

If all comparisons pass → return true.

Code (Iterative)
var isSameTree = function(p, q) {
    let queue = [[p, q]];
    
    while (queue.length > 0) {
        let [node1, node2] = queue.shift();
        
        if (!node1 && !node2) continue;
        if (!node1 || !node2) return false;
        if (node1.val !== node2.val) return false;
        
        queue.push([node1.left, node2.left]);
        queue.push([node1.right, node2.right]);
    }
    return true;
};

📌 Dry Run (Iterative Example)
Example Input:
p:       1          q:       1
        / \                  / \
       2   3                2   3

Execution:

Queue: [(1,1)]

Pop (1,1) → values match → push (2,2), (3,3).

Queue: [(2,2), (3,3)]

Pop (2,2) → values match → push (null,null), (null,null).

Queue: [(3,3), (null,null), (null,null)]

Pop (3,3) → values match → push (null,null), (null,null).

Queue: [(null,null), (null,null), (null,null), (null,null)]

Each (null,null) → continue.

Queue empty → return true.

✅ Both approaches work. Recursive is simpler, iterative avoids stack overflow for deep trees.
---