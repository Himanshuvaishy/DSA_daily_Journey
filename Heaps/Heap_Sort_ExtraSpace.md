# 📘 Heap Sort (Using Extra Space with MaxHeap)

## 📌 What is This Approach?

This version of Heap Sort uses a **MaxHeap data structure with extra
space** (priority queue style).\
Instead of sorting in-place, we: 1. Insert all elements into a MaxHeap.
2. Extract the maximum element repeatedly. 3. Store extracted elements
into a separate result array.

------------------------------------------------------------------------

## ✅ Why Use Extra Space?

-   **Easier to Understand:** Directly mimics how priority queues work.
-   **Good for Teaching & Debugging:** You can clearly see the MaxHeap
    operations.
-   **Practical in some systems:** When in-place modification is not
    allowed (e.g., read-only input array).

⚠️ Downside → Space Complexity increases from **O(1)** to **O(n)**.

------------------------------------------------------------------------

## ❌ Why Heap Sort is Unstable?

Heap Sort is **not stable** because during heapify operations, elements
with the **same value may get swapped** and lose their relative
ordering.

Example:

Input:

    [ (A, 2), (B, 2), (C, 1) ]

Correct stable sorted output (by value):

    [ (C, 1), (A, 2), (B, 2) ]

But Heap Sort may output:

    [ (C, 1), (B, 2), (A, 2) ]

Here, A and B both had value `2`, but their relative order changed.

------------------------------------------------------------------------

## 📟 JavaScript Implementation

``` javascript
class MaxHeap {
    constructor() {
        this.heap = [];
    }

    getLeftChildIndex(i) { return (2 * i) + 1; }
    getRightChildIndex(i) { return (2 * i) + 2; }
    getParentIndex(i) { return Math.floor((i - 1) / 2); }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    heapifyUp(i) {
        while (i > 0) {
            let parent = this.getParentIndex(i);
            if (this.heap[i] > this.heap[parent]) {
                [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
                i = parent;
            } else break;
        }
    }

    extractMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        let max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return max;
    }

    heapifyDown(i) {
        let largest = i;
        let left = this.getLeftChildIndex(i);
        let right = this.getRightChildIndex(i);

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

// Heap Sort using extra space
function heapSortExtraSpace(arr) {
    let heap = new MaxHeap();
    let result = [];

    // Step 1: Insert all elements into MaxHeap
    for (let val of arr) {
        heap.insert(val);
    }

    // Step 2: Extract max one by one and push into result
    while (heap.heap.length > 0) {
        result.unshift(heap.extractMax());  // insert at beginning (sorted order)
    }

    return result;
}

// Example
let arr = [10, 4, 5, 1, 3];
let sorted = heapSortExtraSpace(arr);
console.log("Sorted Array:", sorted); // [1, 3, 4, 5, 10]
```

------------------------------------------------------------------------

## 📝 Dry Run (Example: arr = \[10, 4, 5, 1, 3\])

### Step 1: Insert All Elements into MaxHeap

-   Insert 10 → heap = \[10\]
-   Insert 4 → heap = \[10, 4\]
-   Insert 5 → heap = \[10, 4, 5\]
-   Insert 1 → heap = \[10, 4, 5, 1\]
-   Insert 3 → heap = \[10, 4, 5, 1, 3\]

Final MaxHeap: `[10, 4, 5, 1, 3]`

### Step 2: Extract Max Repeatedly

-   Extract 10 → result = \[10\], heap = \[5, 4, 3, 1\]
-   Extract 5 → result = \[5, 10\], heap = \[4, 1, 3\]
-   Extract 4 → result = \[4, 5, 10\], heap = \[3, 1\]
-   Extract 3 → result = \[3, 4, 5, 10\], heap = \[1\]
-   Extract 1 → result = \[1, 3, 4, 5, 10\], heap = \[\]

✅ Final Sorted Array: `[1, 3, 4, 5, 10]`

------------------------------------------------------------------------

## ⏱️ Complexity Analysis

-   **Time Complexity:** O(n log n)\
-   **Space Complexity:** O(n) (because of extra `result` array)\
-   **Stable?:** ❌ Not stable

------------------------------------------------------------------------

## ✅ Key Takeaways

-   This approach is simpler conceptually (like Priority Queue
    sorting).\
-   Requires **extra space O(n)** unlike in-place Heap Sort.\
-   Heap Sort remains **unstable**, meaning equal elements may lose
    original order.
