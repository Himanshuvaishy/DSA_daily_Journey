
# 🌳 Zigzag Level Order Traversal of Binary Tree

## 📌 Problem Statement
Given the `root` of a binary tree, return the **zigzag level order traversal** of its nodes' values.  
(From left to right, then right to left for the next level, and alternate between).

### Example
Input Tree:
```
        1
       /       2   3
     / \       4   5   6
```
Output:
```
[[1], [3, 2], [4, 5, 6]]
```

---

## ✅ Approach 1: Iterative (BFS)
We use a **queue** for level order traversal.  
- Keep a flag `leftToRight` that flips after each level.  
- For each level, insert elements into a temporary array in the correct order.  

### Code (JavaScript)
```js
var zigzagLevelOrder = function(root) {
    if (!root) return [];

    let result = [];
    let queue = [root];
    let leftToRight = true;

    while (queue.length > 0) {
        let size = queue.length;
        let level = [];

        for (let i = 0; i < size; i++) {
            let node = queue.shift();
            if (leftToRight) {
                level.push(node.val);
            } else {
                level.unshift(node.val);
            }
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(level);
        leftToRight = !leftToRight;
    }

    return result;
};
```

---

## ✅ Approach 2: Recursive (DFS)
We use recursion with depth tracking.  
- If `depth` is even, append left-to-right.  
- If `depth` is odd, insert right-to-left.  

### Code (JavaScript)
```js
var zigzagLevelOrder = function(root) {
    let result = [];

    const dfs = (node, depth) => {
        if (!node) return;

        if (result.length === depth) {
            result.push([]);
        }

        if (depth % 2 === 0) {
            result[depth].push(node.val);
        } else {
            result[depth].unshift(node.val);
        }

        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
    };

    dfs(root, 0);
    return result;
};
```

---

## 🔎 Dry Run Example (Iterative)

Tree:
```
        1
       /       2   3
     / \       4   5   6
```

### Step-by-step
1. Start with queue = `[1]`, leftToRight = true  
   → Process level → `[1]`  
   → queue = `[2, 3]`  
   → Result = `[[1]]`

2. queue = `[2, 3]`, leftToRight = false  
   → Process → `[3, 2]`  
   → queue = `[4, 5, 6]`  
   → Result = `[[1], [3, 2]]`

3. queue = `[4, 5, 6]`, leftToRight = true  
   → Process → `[4, 5, 6]`  
   → queue = `[]`  
   → Result = `[[1], [3, 2], [4, 5, 6]]`

✅ Final Answer = `[[1], [3, 2], [4, 5, 6]]`

---

## 🔎 Dry Run Example (Recursive)

DFS Traversal Order:  
- Visit (1, depth=0) → result = `[[1]]`  
- Visit (2, depth=1) → result = `[[1], [2]]`  
- Visit (4, depth=2) → result = `[[1], [2], [4]]`  
- Visit (5, depth=2) → result = `[[1], [2], [4,5]]`  
- Visit (3, depth=1) → result = `[[1], [3,2], [4,5]]`  
- Visit (6, depth=2) → result = `[[1], [3,2], [4,5,6]]`  

✅ Final Answer = `[[1], [3, 2], [4, 5, 6]]`

---

## ⏱️ Complexity Analysis
- **Time Complexity:** `O(N)` (each node visited once).  
- **Space Complexity:**  
  - Iterative: `O(N)` for queue.  
  - Recursive: `O(H)` recursion stack (H = height of tree).
