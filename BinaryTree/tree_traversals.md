
# 🌳 Tree Traversals in Data Structures

Traversal = visiting **each node of the tree exactly once** in a specific order.

There are two major traversal categories:
1. **Depth-First Search (DFS):** Go deep before backtracking.
   - Preorder (Root → Left → Right)
   - Inorder (Left → Root → Right)
   - Postorder (Left → Right → Root)
2. **Breadth-First Search (BFS):** Level Order (visit nodes level by level).

---

## 1. Depth-First Traversals (DFS)

### a) Preorder (Root → Left → Right)
- Visit the root first, then left subtree, then right subtree.
- Useful for copying a tree.

### b) Inorder (Left → Root → Right)
- Visit left subtree, then root, then right.
- In Binary Search Tree (BST), it gives nodes in sorted order.

### c) Postorder (Left → Right → Root)
- Visit left, then right, and root last.
- Useful for deleting a tree (children removed before parent).

---

## 2. Breadth-First Traversal (BFS)

### Level Order
- Visit nodes level by level, left to right.
- Implemented using a **queue**.

---

# 🌟 Examples

## Example 1

```
        A
       / \
      B   C
     / \   \
    D   E    F
       / \
      G   H
```

- **Preorder:** A → B → D → E → G → H → C → F  
- **Inorder:** D → B → G → E → H → A → C → F  
- **Postorder:** D → G → H → E → B → F → C → A  
- **Level Order:** A → B → C → D → E → F → G → H  

---

## Example 2

```
            1
          /   \
         2     3
        / \   / \
       4   5  6   7
      / \      /
     8   9    10
```

- **Preorder:** 1 → 2 → 4 → 8 → 9 → 5 → 3 → 6 → 7 → 10  
- **Inorder:** 8 → 4 → 9 → 2 → 5 → 1 → 6 → 3 → 10 → 7  
- **Postorder:** 8 → 9 → 4 → 5 → 2 → 6 → 10 → 7 → 3 → 1  
- **Level Order:** 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10  

---

# 📝 Quick Recap
- **Preorder:** Root comes first (Pre).  
- **Inorder:** Root is in the middle.  
- **Postorder:** Root comes last (Post).  
- **Level Order:** Go level by level.

