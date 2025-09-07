
# Heap - Array Representation and Operations

## Array Representation of Heap
Heaps are usually represented using **arrays** instead of pointer-based structures because of their compact and efficient nature.

- **MinHeap Representation** (using Level Order Traversal):
  - `arr[0] = smallest element`
  - Accessing smallest element → **O(1)**  
  - Example: `heap[0]` gives the minimum element in a MinHeap.

- **MaxHeap Representation**:
  - `heap[0] = maximum element`
  - Accessing maximum element → **O(1)**

---

## Binary Tree Representation using Array
Instead of using nodes and pointers, we map tree levels to array indices.

### For index starting at **1**:
- `left = 2 * i`
- `right = 2 * i + 1`
- `parent = i / 2`

### For index starting at **0** (commonly used in programming):
- `left = 2 * i + 1`
- `right = 2 * i + 2`
- `parent = (i - 1) / 2`

---

## Example of Array Representation

Min Heap `[5, 10, 20, 30, 40]`:

```
        5
       /       10    20
    /    30    40
```

- `arr[0] = 5` (root = smallest element)
- Children of `5` are at indices `1` and `2` → 10 and 20.
- Children of `10` are at indices `3` and `4` → 30 and 40.

---

## Operations in Heap

### 1. Insert
- Always insert at the end of the array (last level, leftmost available spot).
- Then apply **Heapify-Up**:
  - Compare with parent.
  - Swap until the **Heap Property** is satisfied.

Rules:
- Must remain a **Complete Binary Tree**.
- Parent ≤ Children (Min Heap) or Parent ≥ Children (Max Heap).

---

### 2. Extract / Delete
- Always extract (remove) from the **root**:
  - In **MinHeap**: root = minimum element.
  - In **MaxHeap**: root = maximum element.
- Replace root with the **last element**.
- Apply **Heapify-Down** to restore heap property.

---

### 3. Peek
- Simply return the root element.
- **O(1)** time complexity.

---

## Heapify

**Heapify** is the process of maintaining the **heap property** after insertion or deletion.

- **Heapify-Up (Bubble Up)**:
  - Used during **insertion**.
  - Compare inserted element with parent → Swap if smaller (for MinHeap).  
  - Repeat until heap property is restored.

- **Heapify-Down (Bubble Down)**:
  - Used during **deletion (extract root)**.
  - Replace root with last element.
  - Compare with children → Swap with smaller child (for MinHeap).  
  - Repeat until heap property is restored.

---

## Example: Insertion with Heapify-Up

Insert elements into MinHeap: [10, 20, 5]

1. Start: `[]`
2. Insert 10 → `[10]`
3. Insert 20 → `[10, 20]`
4. Insert 5 → `[10, 20, 5]` → Heapify-Up (5 < 10) → `[5, 20, 10]`

Tree:
```
      5
     /    20   10
```

✅ Heapify-Up ensures MinHeap property.

---

## Example: Extraction with Heapify-Down

MinHeap = `[5, 20, 10]`

1. Extract root (5). Replace with last element → `[10, 20]`
2. Heapify-Down: Compare 10 with 20 → Already satisfies MinHeap.

Result: `[10, 20]`

Tree:
```
     10
    /
  20
```

✅ Heapify-Down ensures MinHeap property.
