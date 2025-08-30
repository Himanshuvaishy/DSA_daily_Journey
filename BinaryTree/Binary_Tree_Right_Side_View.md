# Binary Tree Right Side View

## Problem Statement

Given the root of a binary tree, return the values of the nodes you can
see ordered from **right to left**, when looking at the tree from the
**right side**.

### Example:

    Input: [1,2,3,null,5,null,4]
    Output: [1,3,4]

------------------------------------------------------------------------

## Approach 1: Iterative (BFS)

We use **level order traversal** but always prioritize the **right child
first**.

### Code (JavaScript)

``` javascript
var rightSideView = function(root) {
    if (!root) return [];
    let ans = [];
    let q = [root];
    while (q.length) {
        let levelSize = q.length;
        for (let i = 0; i < levelSize; i++) {
            let curr = q.shift();
            if (i === 0) {
                ans.push(curr.val);
            }
            if (curr.right) q.push(curr.right);
            if (curr.left) q.push(curr.left);
        }
    }
    return ans;
};
```

### Dry Run Example

For tree:

           1
         /   \
        2     3
         \     \
          5      4

-   Start with root = 1 → `ans = [1]`
-   Next level: right child `3` visited first → `ans = [1,3]`
-   Next level: right child `4` visited first → `ans = [1,3,4]`

Final Answer = `[1,3,4]`

------------------------------------------------------------------------

## Approach 2: Recursive (DFS)

We perform a **right-first DFS traversal** while keeping track of the
current depth.\
The first node we visit at each depth is the rightmost node.

### Code (JavaScript)

``` javascript
var rightSideView = function(root) {
    let ans = [];
    function dfs(node, depth) {
        if (!node) return;
        if (depth === ans.length) {
            ans.push(node.val);
        }
        dfs(node.right, depth + 1);
        dfs(node.left, depth + 1);
    }
    dfs(root, 0);
    return ans;
};
```

### Dry Run Example

For tree:

           1
         /   \
        2     3
         \     \
          5      4

-   Depth 0 → Visit 1 → `ans = [1]`
-   Depth 1 → Visit 3 first → `ans = [1,3]`
-   Depth 2 → Visit 4 first → `ans = [1,3,4]`

Final Answer = `[1,3,4]`

------------------------------------------------------------------------

## Time & Space Complexity

### Iterative (BFS):

-   **Time Complexity:** O(N), where N = number of nodes
-   **Space Complexity:** O(W), where W = maximum width of the tree

### Recursive (DFS):

-   **Time Complexity:** O(N)
-   **Space Complexity:** O(H), where H = height of the tree (worst case
    O(N), best case O(logN))

------------------------------------------------------------------------

✅ Both approaches give the same result.
