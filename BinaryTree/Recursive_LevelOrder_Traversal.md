
# 🌳 Binary Tree Level Order Traversal (Recursive Approach)

## 📌 Problem
Perform **level order traversal** of a binary tree using **recursion**.

---

## ✅ Recursive Code

```javascript
var levelOrder = function(root) {
    if(!root) return [];
    let ans = [];
    let traversal = (curr, level) => {
        if(!ans[level]) ans[level] = [];
        ans[level].push(curr.val);
        curr.left && traversal(curr.left, level + 1);
        curr.right && traversal(curr.right, level + 1);
    }
    traversal(root, 0);
    return ans;
};
```

---

## 🧠 Intuition Behind Recursive Approach

1. **Each node belongs to a level** in the tree.
   - Root → Level 0  
   - Root’s children → Level 1  
   - Root’s grandchildren → Level 2 …

2. We use **recursion with an extra parameter `level`** to keep track of the current depth.

3. For every node visited:
   - If `ans[level]` does not exist → create a new array for that level.
   - Push the node’s value into `ans[level]`.

4. Recursive calls:
   - Traverse the left child with `level + 1`
   - Traverse the right child with `level + 1`

---

## 🔄 Dry Run Example

**Input Tree:**

```
        1
       /       2   3
     / \       4   5   6
```

**Steps:**

- Start: `traversal(1, 0)` → `ans[0] = [1]`
- Left child: `traversal(2, 1)` → `ans[1] = [2]`
- Left child: `traversal(4, 2)` → `ans[2] = [4]`
- Backtrack → Right child: `traversal(5, 2)` → `ans[2] = [4, 5]`
- Backtrack to root → Right child: `traversal(3, 1)` → `ans[1] = [2, 3]`
- Right child: `traversal(6, 2)` → `ans[2] = [4, 5, 6]`

**Final Output:**

```
[[1], [2, 3], [4, 5, 6]]
```

---

## 🧾 Stack & Depth Intuition

- Recursive function calls are stored in the **call stack**.
- At each depth level, the recursive call holds information about the current node and its level.
- When recursion backtracks, it returns to the previous state, allowing us to process siblings.

**Example:**  
Stack trace when visiting node `4`:

```
traversal(1,0)
 → traversal(2,1)
   → traversal(4,2)
```

After finishing node `4`, recursion **pops** back to `2`, then continues to node `5`.

---

## ⚠️ Why Check `if(!root) return [];`?

- If the root is `null`, without this check, calling `curr.val` would cause an error.
- Ensures we return an empty array safely.

---

## ✅ Key Takeaways

- `level` keeps track of **depth of node**.
- `ans[level]` ensures each level has a **separate array**.
- Stack (recursion) naturally explores depth-first, but by using `level`, we group nodes **level-wise**.

---

✨ Recursive Level Order Traversal is a **Depth-First Search (DFS)** with an extra `level` parameter to simulate **Breadth-First Search (BFS)** behavior!
