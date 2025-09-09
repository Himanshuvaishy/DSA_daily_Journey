# Heap Operations: Extract & Peek (MinHeap & MaxHeap)

---

## 1. MinHeap Extract & Peek

### JavaScript Code

```js
class MinHeap {
    constructor() {
        this.heap = [1, 5, 20, 30, 10, 25, 40]; // Example MinHeap
    }

    getLeftChildIndex(i) { return (2 * i) + 1; }
    getRightChildIndex(i) { return (2 * i) + 2; }
    getParentIndex(i) { return Math.floor((i - 1) / 2); }

    // Peek: return smallest element
    peek() {
        return this.heap.length ? this.heap[0] : null;
    }

    // Extract: remove smallest element
    extract() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        let root = this.heap[0];
        this.heap[0] = this.heap.pop(); // Move last element to root
        this.heapifyDown(0);
        return root;
    }

    heapifyDown(i) {
        let left = this.getLeftChildIndex(i);
        let right = this.getRightChildIndex(i);
        let smallest = i;

        if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
            smallest = left;
        }
        if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
            smallest = right;
        }

        if (smallest !== i) {
            [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
            this.heapifyDown(smallest);
        }
    }
}

// ✅ Example usage
let minHeap = new MinHeap();
console.log("Peek:", minHeap.peek());    // 1
console.log("Extract:", minHeap.extract()); // removes 1
console.log("Heap after extract:", minHeap.heap);
```

---

### Dry Run (MinHeap Extract - Bigger Tree)

**Initial Heap:** `[1, 5, 20, 30, 10, 25, 40]`  

**Extract Min:**

1. Remove root `1` → Replace with last element → `[40, 5, 20, 30, 10, 25]`  
2. Compare root `40` with children `(5, 20)` → smallest is `5` → swap → `[5, 40, 20, 30, 10, 25]`  
3. Now at index `1`: Compare `40` with children `(30, 10)` → smallest is `10` → swap → `[5, 10, 20, 30, 40, 25]`  
4. Now at index `4`: no children → stop  

**Final Heap:** `[5, 10, 20, 30, 40, 25]`  
**Return Value:** `1`

---

## 2. MaxHeap Extract & Peek

### JavaScript Code

```js
class MaxHeap {
    constructor() {
        this.heap = [50, 30, 40, 10, 20, 35, 25]; // Example MaxHeap
    }

    getLeftChildIndex(i) { return (2 * i) + 1; }
    getRightChildIndex(i) { return (2 * i) + 2; }
    getParentIndex(i) { return Math.floor((i - 1) / 2); }

    // Peek: return largest element
    peek() {
        return this.heap.length ? this.heap[0] : null;
    }

    // Extract: remove largest element
    extract() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        let root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return root;
    }

    heapifyDown(i) {
        let left = this.getLeftChildIndex(i);
        let right = this.getRightChildIndex(i);
        let largest = i;

        if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
            largest = left;
        }
        if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
            largest = right;
        }

        if (largest !== i) {
            [this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]];
            this.heapifyDown(largest);
        }
    }
}

// ✅ Example usage
let maxHeap = new MaxHeap();
console.log("Peek:", maxHeap.peek());    // 50
console.log("Extract:", maxHeap.extract()); // removes 50
console.log("Heap after extract:", maxHeap.heap);
```

---

### Dry Run (MaxHeap Extract - Bigger Tree)

**Initial Heap:** `[50, 30, 40, 10, 20, 35, 25]`  

**Extract Max:**

1. Remove root `50` → Replace with last element → `[25, 30, 40, 10, 20, 35]`  
2. Compare root `25` with children `(30, 40)` → largest is `40` → swap → `[40, 30, 25, 10, 20, 35]`  
3. Now at index `2`: Compare `25` with children `(35)` → largest is `35` → swap → `[40, 30, 35, 10, 20, 25]`  
4. No more children → stop  

**Final Heap:** `[40, 30, 35, 10, 20, 25]`  
**Return Value:** `50`

---

## ✅ Summary
- **Peek:** O(1) → just return root  
- **Extract:** O(log n) → remove root + heapify down  
