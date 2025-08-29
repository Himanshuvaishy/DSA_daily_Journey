
# Lowest Common Ancestor (LCA) in a Binary Tree

---

## 📌 Problem Statement

Given a **binary tree**, and two distinct nodes `p` and `q`, find their **Lowest Common Ancestor (LCA)**.

👉 The **Lowest Common Ancestor** of two nodes is the **lowest (deepest) node** in the tree that has both `p` and `q` as descendants.

### Example

**Input:**

```
        3
       /       5   1
     / \ /     6  2 0  8
      /      7   4
```

`p = 5, q = 1` → Output: **3**

`p = 5, q = 4` → Output: **5**

---

## 🟠 Brute Force Approach

### Idea:
- For each node `p` and `q`, find the path from the **root** to the node.
- Compare both paths.
- The **last common node** in both paths is the LCA.

### Step-by-step:
1. Write a helper function to **find the path** from the root to a given node.
2. Store the path for `p` and `q`.
3. Iterate over both paths until they differ.
4. The last same node is the LCA.

### JavaScript Code

```js
function findPath(root, target, path) {
    if (!root) return false;

    path.push(root);

    if (root === target) return true;

    if (findPath(root.left, target, path) || findPath(root.right, target, path)) {
        return true;
    }

    path.pop();
    return false;
}

function lowestCommonAncestorBrute(root, p, q) {
    let path1 = [], path2 = [];

    findPath(root, p, path1);
    findPath(root, q, path2);

    let i = 0;
    while (i < path1.length && i < path2.length && path1[i] === path2[i]) {
        i++;
    }

    return path1[i - 1];
}
```

### Complexity
- **Time Complexity:** `O(N)` to find path for each node → `O(2N)` ≈ **O(N)**  
- **Space Complexity:** `O(N)` (storing paths)

---
```js
🔹 Approach Explanation

This version of Lowest Common Ancestor (LCA) works by doing a postorder traversal and counting how many of the target nodes (p and q) are found in the subtree of each node.

Key Idea:

Perform DFS traversal on each node.

For each node:

Recurse into left subtree and get how many target nodes (p, q) were found.

Recurse into right subtree and get how many target nodes (p, q) were found.

If the current node is p or q, increment the count.

If at any node the count = 2 → it means both nodes are found in that subtree, so that node is the LCA.

Use a global variable (lca) to store the first such node found.

🔹 Step-by-step Working

Start DFS traversal from root.

At each node:

Recurse on left child → returns number of p/q found in left.

Recurse on right child → returns number of p/q found in right.

Check if current node itself is p or q.

Add them up → total count for this node.

If count = 2 and lca is not already set, assign current node as lca.

Return count up the recursion chain.

At the end, lca will hold the answer.

🔹 Code (JavaScript)
var lowestCommonAncestor = function(root, p, q) {
    let lca = null;

    let traversal = (curr) => {
        if (!curr) return 0;

        let count = 0;

        // Left and right subtree counts
        let ansOnLeft = traversal(curr.left);
        let ansOnRight = traversal(curr.right);

        // If current node is one of p or q
        if (curr.val === p.val || curr.val === q.val) {
            ++count;
        }

        count = count + ansOnLeft + ansOnRight;

        // If both nodes are found under this subtree, mark LCA
        if (count === 2 && !lca) {
            lca = curr;
        }

        return count;
    };

    traversal(root);
    return lca;
};

🔎 Dry Run Example

Tree:

        3
       / \
      5   1
     / \
    6   2
       / \
      7   4


Find LCA(5, 4):

Start at 3.

Traverse left → go to node 5.

At 5:

Left = 6 → returns 0.

Right = 2.

At 2:

Left = 7 → returns 0.

Right = 4 → matches q, returns 1.

Total at 2 = 1 → return 1 to 5.

Back at 5:

Left = 0, Right = 1.

Node 5 matches p → +1.

Total = 2 → set LCA = 5.

Back at 3:

Left = 2, Right = traversal(1).

Doesn’t change LCA since already found.

✅ Final Answer: 5

🔹 Complexity

Time Complexity: O(N) (each node visited once)

Space Complexity: O(H) (recursion stack, where H is height of tree)

👉 This approach is slightly different but still optimal — instead of returning the node directly, it returns counts, and uses a global variable lca to store the result.

---

## 🟢 Optimal Approach 2(Recursive DFS)

### Why Optimal?
- Instead of storing paths, we directly use **DFS recursion**.
- At each node:
  - If the node is `p` or `q`, return it.
  - Recursively search in the left and right subtrees.
  - If both left and right return non-null, the current node is the **LCA**.

### Step-by-step:
1. If `root` is `null`, return `null`.
2. If `root` equals `p` or `q`, return `root`.
3. Recursively call on `left` and `right` subtrees.
4. If both return non-null → `root` is the LCA.
5. If only one is non-null, return that one.

### JavaScript Code

```js
function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) return root;

    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);

    if (left && right) return root;

    return left ? left : right;
}
```

---

## 🔎 Dry Run Example

Tree:
```
        3
       /       5   1
     /     6   2
       /       7   4
```

Find LCA(5, 4):

1. Start at root `3`.  
   - Left → call on node `5`.  
   - Right → call on node `1`.

2. At node `5`:  
   - Left → node `6` (returns `null`).  
   - Right → node `2`.

3. At node `2`:  
   - Left → node `7` (returns `null`).  
   - Right → node `4` (**matches `q`**) → returns `4`.

4. Back at node `5`:  
   - Left = `null`, Right = `4`.  
   - Current node is also `p = 5`.  
   - So return `5`.

5. Back at node `3`:  
   - Left = `5`, Right = `1`.  
   - Both not `null` → **LCA = 3**.

✅ Answer: **3**

---

## ⏱️ Complexity (Optimal Approach)

- **Time Complexity:** `O(N)` (each node visited once)  
- **Space Complexity:** `O(H)` (recursion stack, where `H` is tree height)

---

## 📖 Concept Explanation

### What is LCA in simple words?
The **Lowest Common Ancestor** is the **shared parent node** of two given nodes that is **deepest** in the tree.

Example:  
- In a family tree, the **LCA of two cousins** is their **grandparent**.

---

### Why do we use LCA?
- Helps answer ancestor-based queries in trees.
- Common in **hierarchical structures** (organization charts, file systems).

---

### Real-world Use Cases
1. **Genealogy / Family Trees:** Find the closest common ancestor of two people.
2. **Filesystem Management:** Lowest common directory of two file paths.
3. **Networking:** Find the closest shared router in a network tree.
4. **Company Hierarchy:** Find lowest common manager of two employees.

---

# ✅ Summary
- **Brute Force:** Find paths, compare → O(N) time, O(N) space.  
- **Optimal:** Recursive DFS → O(N) time, O(H) space.  
- **LCA is crucial** in solving many tree-related and hierarchical problems.
