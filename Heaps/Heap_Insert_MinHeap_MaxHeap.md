
# Heap Insert Operation (MinHeap & MaxHeap)

---

## 1. MinHeap Insert

### JavaScript Code

```js
class MinHeap {
    constructor() {
        this.heap = [5, 10, 20, 30]; // Initial MinHeap
    }

    getLeftChildIndex(i) { return (2 * i) + 1; }
    getRightChildIndex(i) { return (2 * i) + 2; }
    getParentIndex(i) { return Math.floor((i - 1) / 2); }

    insert(val) {
        this.heap.push(val); // Step 1: Insert at end
        let lastIndex = this.heap.length - 1;
        this.heapifyUp(lastIndex); // Step 2: Fix heap property
    }

    heapifyUp(i) {
        while (i > 0) {
            let parentIndex = this.getParentIndex(i);
            if (this.heap[i] < this.heap[parentIndex]) { // MinHeap condition
                [this.heap[i], this.heap[parentIndex]] =
                [this.heap[parentIndex], this.heap[i]];
                i = parentIndex;
            } else break;
        }
    }
}

let minHeap = new MinHeap();
minHeap.insert(1);
console.log("MinHeap:", minHeap.heap);
```

---

### Dry Run (MinHeap)

**Initial Heap:** `[5, 10, 20, 30]`  
**Insert Value:** `1`

1. Insert at end → `[5, 10, 20, 30, 1]`
2. Compare with parent → `1 < 10` → swap → `[5, 1, 20, 30, 10]`
3. Compare with new parent → `1 < 5` → swap → `[1, 5, 20, 30, 10]`

✅ **Final MinHeap:** `[1, 5, 20, 30, 10]`

---

## 2. MaxHeap Insert

### JavaScript Code

```js
class MaxHeap {
    constructor() {
        this.heap = [30, 20, 10, 5]; // Initial MaxHeap
    }

    getLeftChildIndex(i) { return (2 * i) + 1; }
    getRightChildIndex(i) { return (2 * i) + 2; }
    getParentIndex(i) { return Math.floor((i - 1) / 2); }

    insert(val) {
        this.heap.push(val); // Step 1: Insert at end
        let lastIndex = this.heap.length - 1;
        this.heapifyUp(lastIndex); // Step 2: Fix heap property
    }

    heapifyUp(i) {
        while (i > 0) {
            let parentIndex = this.getParentIndex(i);
            if (this.heap[i] > this.heap[parentIndex]) { // MaxHeap condition
                [this.heap[i], this.heap[parentIndex]] =
                [this.heap[parentIndex], this.heap[i]];
                i = parentIndex;
            } else break;
        }
    }
}

let maxHeap = new MaxHeap();
maxHeap.insert(50);
console.log("MaxHeap:", maxHeap.heap);
```

---

### Dry Run (MaxHeap)

**Initial Heap:** `[30, 20, 10, 5]`  
**Insert Value:** `50`

1. Insert at end → `[30, 20, 10, 5, 50]`
2. Compare with parent → `50 > 20` → swap → `[30, 50, 10, 5, 20]`
3. Compare with new parent → `50 > 30` → swap → `[50, 30, 10, 5, 20]`

✅ **Final MaxHeap:** `[50, 30, 10, 5, 20]`

---

## Key Difference:
- **MinHeap:** Parent ≤ Children → Smallest element always at root.  
- **MaxHeap:** Parent ≥ Children → Largest element always at root.  
