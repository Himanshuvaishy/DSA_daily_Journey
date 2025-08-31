
# Binary Tree Maximum Path Sum

## Problem Statement
Given a non-empty binary tree, find the maximum path sum.  
A path is defined as any sequence of nodes from some starting node to any node in the tree along the parent-child connections.  
The path must contain at least one node and does not need to go through the root.

### Example:
Input:
```
       -10
       /  \
     9    20
         /  \
        15   7
```
Output: `42`  
Explanation: The optimal path is `15 -> 20 -> 7` with sum `42`.

---

## Approach

We use **DFS (Depth First Search)** with recursion.  
At each node, we calculate two values:
1. **Maximum Gain**: The maximum path sum starting from the current node and extending down either the left or right subtree (but not both).  
   `max_gain(node) = node.val + max(0, left_gain, right_gain)`  
   - We take `0` if left/right path gives negative contribution.

2. **Path Sum Through Node**: The maximum path sum passing through the current node connecting both children.  
   `path_sum = node.val + max(0, left_gain) + max(0, right_gain)`

We keep track of a global variable `max_sum` to update the highest path sum found.

---

## Algorithm Steps
1. Initialize `max_sum = -∞`.
2. Define recursive function `max_gain(node)`:
   - If `node` is null, return `0`.
   - Recursively compute `left_gain` and `right_gain`.
   - Compute `path_sum` through the node.
   - Update `max_sum` if `path_sum` is greater.
   - Return the maximum gain including this node.
3. Call `max_gain(root)`.
4. Return `max_sum`.

---

## JavaScript Code

```javascript
var maxPathSum = function(root) {
    let maxSum = -Infinity;

    function maxGain(node) {
        if (!node) return 0;

        let leftGain = Math.max(maxGain(node.left), 0);
        let rightGain = Math.max(maxGain(node.right), 0);

        let pathSum = node.val + leftGain + rightGain;

        maxSum = Math.max(maxSum, pathSum);

        return node.val + Math.max(leftGain, rightGain);
    }

    maxGain(root);
    return maxSum;
};
```

---

## Dry Run

Tree Example:
```
       -10
       /  \
     9    20
         /  \
        15   7
```

1. Start at root `-10`:
   - Left child `9`: leftGain = 0, rightGain = 0 → maxGain(9) = 9.
   - Right child `20`: explore further.

2. Node `20`:
   - Left child `15`: gain = 15.
   - Right child `7`: gain = 7.
   - pathSum(20) = 20 + 15 + 7 = 42 → update `maxSum = 42`.
   - maxGain(20) = 20 + max(15, 7) = 35.

3. Back to root `-10`:
   - leftGain = 9, rightGain = 35.
   - pathSum(-10) = -10 + 9 + 35 = 34 (does not exceed 42).
   - maxGain(-10) = -10 + max(9, 35) = 25.

Final Answer: **42**

---

## Time & Space Complexity

- **Time Complexity:** O(n), where `n` is the number of nodes (each node is visited once).  
- **Space Complexity:** O(h), where `h` is the height of the tree (recursion stack). Worst case O(n) for skewed tree, O(log n) for balanced tree.
