
# 🌳 DFS and BFS in Binary Trees

## 🔎 DFS (Depth First Search)
DFS explores a tree by going **as deep as possible** along a branch before backtracking.

### Types of DFS Traversals:
- **Preorder (Root → Left → Right):**
  Example: `A B D E C F`
- **Inorder (Left → Root → Right):**
  Example: `D B E A C F`
- **Postorder (Left → Right → Root):**
  Example: `D E B F C A`

### How DFS Works:
- **Uses a Stack (LIFO)**: Last In, First Out.
- Process:
  1. Push root node into stack.
  2. Pop the top node (current node).
  3. Process it and push its children (right first, then left so left is processed first).
  4. Repeat until stack is empty.

👉 Example DFS order: `[A, C, F, B, E, D]`

---

## 🌐 BFS (Breadth First Search)
BFS explores a tree **level by level**, exploring all nodes at the current level before moving deeper.

### BFS Traversals:
- **Level Order Traversal:**
  Example: `A B C D E F`
- **Zig-Zag Traversal:**
  Example: `A C B D E F`

### How BFS Works:
- **Uses a Queue (FIFO)**: First In, First Out.
- Process:
  1. Push root node into queue.
  2. Pop the front node (current node).
  3. Process it and push its children (left first, then right).
  4. Repeat until queue is empty.

👉 Example BFS order: `[A, B, C, D, E, F]`

---

## ⚖️ DFS vs BFS

| Feature              |BFS                                    | DFS                               |
|-----------------------|----------------------------------------|-------------------------------------|
| **Data Structure**    | Stack (LIFO)                           | Queue (FIFO)                        |
| **Exploration**       | Depth first (go deep before backtrack) | Level by level                  |
| **Memory Usage**      | Less for wide trees                    | More for wide  trees                |
| **Traversal Types**   | Preorder, Inorder, Postorder           | Level order, Zig-zag                |

---

## ❓ Why Stack in DFS?
- DFS needs to **go deep** and remember where it left off.
- Stack naturally supports **backtracking** with LIFO (last visited node is processed next).

## ❓ Why Queue in BFS?
- BFS needs to **explore level by level** in the same order they appear.
- Queue ensures **FIFO order**, so nodes are processed in the exact order they were discovered.

---

✅ With these traversal techniques, we can solve many binary tree problems like finding height, paths, levels, or searching specific nodes efficiently.
