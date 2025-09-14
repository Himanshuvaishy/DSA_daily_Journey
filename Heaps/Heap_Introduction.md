
# Heap - Introduction

## What is a Heap?
A **Heap** is a special tree-based data structure that satisfies the **Heap Property**:

- **Max Heap**: Every parent node has a value greater than or equal to its children. The largest element is at the root.
- **Min Heap**: Every parent node has a value smaller than or equal to its children. The smallest element is at the root.

👉 All Heaps are **Complete Binary Trees**.

---

## What is a Complete Binary Tree?
A **Complete Binary Tree** is one in which, during level order traversal, there are no missing nodes.

- All levels are completely filled except possibly the last, which is filled from left to right.
- Nodes at the last level are as far left as possible.

### Example:
- Level 0 → 1 node  
- Level 1 → 2 nodes  
- Level 2 → 4 nodes  
- Level 3 → 8 nodes  

This ensures compact and efficient storage in an array.

---

## What is a Full Binary Tree?
- Every full binary tree is always a complete binary tree.  
- At every level, all the nodes are present.  
- You must fill all nodes at each level before moving to the next.

---

## Why do we use Heap?
- To implement **Priority Queues**
- For efficient **min/max retrieval**
- Useful in graph algorithms (**Dijkstra, Prim**)
- To solve problems like **kth largest/smallest elements**
- **Heap Sort** algorithm

---

## Where do we use Heap?
- **Operating Systems** (task scheduling, process priority)  
- **Graph Algorithms** (shortest path, minimum spanning tree)  
- **Memory Management** (dynamic allocation)  
- **Data Stream problems** (finding median, top-k elements)  

---

## Types of Heap

### Min Heap
- The value of each parent is <= its children.  
- Root contains the smallest element.

### Max Heap
- The value of each parent is >= its children.  
- Root contains the largest element.

---

## Advantages of Heap
- **Max Heap**:
  - Get largest element in **O(1)** (always at root).  
- **Min Heap**:
  - Get smallest element in **O(1)**.  
- Insert → **O(log n)**  
- Delete → **O(log n)**  
- Heap Sort → **O(n log n)**  

---

## Disadvantages of Heap
- Slightly tricky to implement from scratch.  
- Not as flexible as other data structures like balanced BSTs.  

---

## Important Points to Remember
- All Heaps are **Complete Binary Trees**.  
- Heap property ensures efficient access to min/max.  
- Storage is usually done in **arrays** (not linked structure).  

---

## Practice Question
**Which one is Complete Binary Tree or Not?**  
(Think of examples and check if they satisfy the "complete" property.)
.