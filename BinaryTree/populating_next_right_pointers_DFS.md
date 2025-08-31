# Populating Next Right Pointers in Each Node

## Problem Statement

You are given a **perfect binary tree** where all leaves are on the same
level, and every parent has two children.\
The binary tree node has the following structure:

``` js
class Node {
  constructor(val, left = null, right = null, next = null) {
    this.val = val;
    this.left = left;
    this.right = right;
    this.next = next;
  }
}
```

The task is to connect each node's `next` pointer to its right
neighbor.\
If there is no right neighbor, the `next` pointer should be set to
`null`.

------------------------------------------------------------------------

## Approach: DFS (Depth-First Search)

We use DFS recursion to connect the child nodes.

### Steps:

1.  If the current node has a left child:
    -   Connect `node.left.next = node.right`
2.  If the current node has a `next`:
    -   Connect `node.right.next = node.next.left`
3.  Recursively connect the **left subtree** and the **right subtree**.

This ensures that all connections are built **top-down**.

------------------------------------------------------------------------

## JavaScript Code

``` js
var connect = function(root) {
    if (!root) return null;

    function dfs(node) {
        if (!node || !node.left || !node.right) return;

        // Step 1: Connect left -> right
        node.left.next = node.right;

        // Step 2: Connect right -> next.left (if exists)
        if (node.next) {
            node.right.next = node.next.left;
        }

        // Step 3: Recurse for left and right subtrees
        dfs(node.left);
        dfs(node.right);
    }

    dfs(root);
    return root;
};
```

------------------------------------------------------------------------

## Dry Run Example

### Input Tree:

            1
          /   \
         2     3
        / \   / \
       4   5  6   7

### Step-by-step DFS execution:

1.  Start at node `1`:
    -   Connect `2.next = 3`
    -   Since `1.next` is null → no connection for `3.right`
2.  Move to node `2`:
    -   Connect `4.next = 5`
    -   Connect `5.next = 6` (via `2.next.left`)
3.  Move to node `3`:
    -   Connect `6.next = 7`
    -   `3.next` is null → no further connection
4.  DFS completes.

### Final Connections:

    Level 1: 1 → null
    Level 2: 2 → 3 → null
    Level 3: 4 → 5 → 6 → 7 → null

------------------------------------------------------------------------

## Complexity Analysis

-   **Time Complexity:** `O(N)`\
    Each node is visited once.

-   **Space Complexity:** `O(H)`\
    Recursive stack space, where `H` is the height of the tree.\
    For a perfect binary tree, `H = log N`.

------------------------------------------------------------------------

✅ Using DFS ensures connections are established in one pass, without
extra space (unlike BFS which uses a queue).
