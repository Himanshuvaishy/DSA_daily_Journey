# 🌳 Tree Data Structures (Introduction Notes)

---

## What is a Tree?

A **Tree** is a **non-linear**, **hierarchical** data structure.  
Unlike arrays or linked lists (which are linear), trees branch out like a family chart.

- **Non-linear:** Not just "next" or "previous", multiple directions possible.
- **Hierarchical:** Arranged in levels (parent → child → grandchild).

---

## Nodes, Parents, Children, and Cycles

- **Node:** A box of data (and links to children).
- **Parent:** The node directly above.
- **Child:** A node directly below a parent.
- **Root:** The top-most node (has no parent).
- **Leaf:** A node with no children.
- **Internal node:** A node with at least one child.

### No Cycles in Trees
- Each node (except root) has **exactly one parent**.  
- If a node had 2 parents, there would be multiple paths to the same node → **not a tree**.  
- Cycles (loops) are not allowed; if they exist, the structure becomes a **graph**, not a tree.

### Exactly One Path
Between any two nodes, there exists **exactly one simple path**.

---

## Why Do We Need Trees?

Not every type of data fits neatly into arrays or linked lists.  
Trees are useful when data is **nested** or **hierarchical**:

- **File systems** (folders inside folders)  
- **HTML DOM** (elements inside elements)  
- **Databases / indexes**  
- **Organization charts**  

---

## Types of Trees

1. **General Tree:** Any number of children per node.  
2. **Binary Tree:** At most **two** children per node (left and right).  
3. **Binary Search Tree (BST):** For each node → `left < root < right`.  
4. **Complete Binary Tree:** All levels are full, except possibly the last (filled left to right).  
5. **Full Binary Tree:** Every node has 0 or 2 children.  
6. **Perfect Binary Tree:** Full, and all leaves are at the same level.  
7. **Balanced Binary Tree:** Height kept close to `log(n)` (e.g., AVL, Red-Black trees).

---

## Tree Terminology

- **Root:** Top-most node.  
- **Edge:** Connection between parent and child.  
- **Parent / Child / Sibling:** Family relationships in the tree.  
- **Ancestor / Descendant:** Parent’s parent… / child’s child…  
- **Level (Depth):** Distance from root (root is depth 0).  
- **Height (of a node):** Longest downward path (in edges) to a leaf.  
- **Height (of tree):** Height of the root.  
- **Subtree:** Any node plus all nodes below it.  
- **Size:** Total number of nodes.  
- **Degree of a node:** Number of children it has.  

---

## Visualization

```
          (1)        ← root
         /   \
       (2)   (3)     ← children of 1 (siblings)
      /   \
    (4)   (5)        ← children of 2
```

- **Leaves:** 3, 4, 5  
- **Height(root 1):** Longest path down (1 → 2 → 4) = 2  
- **Depth(5):** Distance from root = 2  

---

## Tree Representation in JavaScript

### 1. Using Nodes & Pointers

```js
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;   // left child
    this.right = null;  // right child
  }
}

// Build a tree
const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);

console.log(root);
/*
      1
     / \
    2   3
   / \
  4   5
*/
```

### 2. Using Arrays (for Complete Binary Trees like Heaps)

- Store nodes level by level.  
- For node at index `i`:  
  - `left = 2*i + 1`  
  - `right = 2*i + 2`  
  - `parent = Math.floor((i - 1) / 2)`  

---

## Binary Search Tree (BST) Property (Preview)

- For each node:  
  - All values in **left subtree < node**  
  - All values in **right subtree > node**  
- Enables **fast searching** (average `O(log n)`).

---

## Balanced vs Perfect vs Complete (Quick Guide)

- **Perfect:** All levels full, all leaves at same depth.  
- **Complete:** All levels full except possibly the last, which is filled left to right.  
- **Balanced:** Height ≈ `log n` (kept small, not necessarily complete).  

---

## Tiny Self-Check

1. Can a node have two parents in a tree?  
   → ❌ No, only one parent allowed.  

2. Is there exactly one path between any two nodes?  
   → ✅ Yes.  

3. Are cycles allowed?  
   → ❌ No, that would make it a graph.  

---
