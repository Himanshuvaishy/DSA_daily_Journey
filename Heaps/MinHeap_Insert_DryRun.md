
# MinHeap Insert Operation (with Dry Run)

## JavaScript Implementation

```js
class MinHeap {
    constructor() {
        this.heap = [5, 10, 20, 30]; // Initial heap
    }

    // Get child and parent indices
    getLeftChildIndex(i) { return (2 * i) + 1; }
    getRightChildIndex(i) { return (2 * i) + 2; }
    getParentIndex(i) { return Math.floor((i - 1) / 2); }

    // Insert a new value into the heap
    insert(val) {
        this.heap.push(val); // Step 1: Insert at end
        let lastIndex = this.heap.length - 1;
        this.heapifyUp(lastIndex); // Step 2: Restore heap property
    }

    // Heapify Up (Bubble Up)
    heapifyUp(i) {
        while (i > 0) {
            let parentIndex = this.getParentIndex(i);

            // If child < parent → swap
            if (this.heap[i] < this.heap[parentIndex]) {
                [this.heap[i], this.heap[parentIndex]] = 
                [this.heap[parentIndex], this.heap[i]];
                i = parentIndex; // Move up
            } else break;
        }
    }
}

// ✅ Example usage
let heap = new MinHeap();
heap.insert(1);
console.log(heap.heap);
```

---

## Dry Run

**Input:**
```
Initial heap = [5, 10, 20, 30]
Insert value = 1
```

**State Transitions:**

- **Step 1:** Call `insert(1)`  
  → Push 1 → `heap = [5, 10, 20, 30, 1]`  
  → `lastIndex = 4`

- **Step 2:** Call `heapifyUp(4)`  
  - `i = 4` → `parentIndex = 1`  
  - Compare `1 < 10` → ✅ Swap  
  - New heap → `[5, 1, 20, 30, 10]`  
  - Update `i = 1`

  - `i = 1` → `parentIndex = 0`  
  - Compare `1 < 5` → ✅ Swap  
  - New heap → `[1, 5, 20, 30, 10]`  
  - Update `i = 0`

  - Loop ends (`i = 0`)

---

## Final Output

```
Final heap = [1, 5, 20, 30, 10]
```
