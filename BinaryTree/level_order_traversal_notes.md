# Level Order Traversal of a Binary Tree

## Problem Statement
We need to perform **Level Order Traversal** on a binary tree.  
That means we visit the nodes level by level, from left to right.

---

## Code Implementation (JavaScript)

```javascript
var levelOrder = function (root) {
    if (!root) return [];   // ✅ Handle empty tree case

    let q = [];
    q.push(root);
    let ans = [];

    while (q.length > 0) {
        let levelArr = [];       // stores nodes of current level
        let levelSize = q.length; // number of nodes at this level

        for (let i = 0; i < levelSize; i++) {
            let curr = q.shift();

            if (curr.left != null) q.push(curr.left);
            if (curr.right != null) q.push(curr.right);

            levelArr.push(curr.val);
        }
        ans.push(levelArr); // push current level into answer
    }

    return ans;
};
```

---

## Why do we use `levelSize`?
- At each level of the tree, we only want to process **all nodes in that level**.  
- `levelSize = q.length` ensures we only iterate for the nodes currently in the queue (which belong to the same level).  
- If we don’t use `levelSize`, we may accidentally mix nodes from the next level with the current one.

---

## Why do we use `levelArr`?
- `levelArr` temporarily stores all nodes of the current level.  
- After finishing one level, we **push `levelArr` into `ans`**.  
- This way, the result contains each level separately like:  
  ```
  [[1], [2, 3], [4, 5, 6, 7]]
  ```

---

## What happens if we don’t write `if (!root) return [];`?
- If `root = null` and we skip this check:  
  - We still push `null` into the queue: `q = [null]`.  
  - First iteration: `curr = q.shift() = null`.  
  - Then: `curr.left` → ❌ **Error: Cannot read properties of null (reading 'left')**.  
- That’s why we must handle the empty tree at the start.

---

## Example Dry Run

Tree:
```
        1
       / \
      2   3
     / \   \
    4   5    6
```

Step by step:
1. Start → `q = [1]`
2. Level 1 → process [1] → push children [2, 3] → `ans = [[1]]`
3. Level 2 → process [2, 3] → push children [4, 5, 6] → `ans = [[1], [2, 3]]`
4. Level 3 → process [4, 5, 6] → no children → `ans = [[1], [2, 3], [4, 5, 6]]`
5. Queue empty → stop.

Final Output:
```
[[1], [2, 3], [4, 5, 6]]
```

---

## Time & Space Complexity

- **Time Complexity**: `O(N)` → we visit each node once.  
- **Space Complexity**: `O(N)` → in the worst case, the queue can hold all nodes of the last level.

---
